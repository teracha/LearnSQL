// Traduire une requête SQL en pseudo-code français (spécification : docs/traducteur.md).
// Sans IA, sans bibliothèque, sans appel réseau : tout se passe dans le navigateur.
// 1. le lecteur coupe le texte en jetons ; 2. l'analyse construit l'arbre de chaque instruction ;
// 3. la traduction écrit les étapes dans l'ordre où SQL les calcule, avec les notes « À savoir ».
// Fonction pure LEARNSQL.traduire(texte) → { lignes, notes, fiches, erreurs, texte }. Testable avec node.
(function (racine) {
  "use strict";

  var L = racine.LEARNSQL = racine.LEARNSQL || {};

  // ---------- Petits outils ----------
  function ensemble(t) { var o = {}; t.split(" ").forEach(function (m) { if (m) o[m] = true; }); return o; }
  function finitPar(t, s) { return t.length >= s.length && t.slice(t.length - s.length) === s; }
  // « a », « a et b », « a, b et c »
  function enumerer(l, mot) {
    mot = mot || "et";
    if (l.length <= 1) return l.join("");
    return l.slice(0, -1).join(", ") + " " + mot + " " + l[l.length - 1];
  }
  function ordinal(n) { return n === 1 ? "1re" : n + "e"; }
  function majuscule(t) { return t.charAt(0).toUpperCase() + t.slice(1); }

  // ---------- 1. Le lecteur : texte → jetons ----------
  // Jeton : { t: type, v: texte d'origine, h: mot en majuscules, d / f : position, nl : retour à la ligne avant, esp : blanc avant }
  // Types : mot, nom ([x], `x`, "x"), texte ('x', N'x', $$x$$), nombre, param (?, :p, $1), op, inconnu (/*! … */), fin.
  function estLettre(c) {
    if ((c >= "a" && c <= "z") || (c >= "A" && c <= "Z") || c === "_") return true;
    var n = c.charCodeAt(0);
    return n >= 0xC0 && n !== 0xD7 && n !== 0xF7 && !(n >= 0x2000 && n <= 0x2BFF) && !(n >= 0x3000 && n <= 0x303F) && n !== 0xFEFF;
  }
  function estChiffre(c) { return c >= "0" && c <= "9"; }
  function estSuite(c) { return c !== "" && (estLettre(c) || estChiffre(c) || c === "$" || c === "@" || c === "#"); }
  function estBlanc(c) { return c === " " || c === "\t" || c === "\r" || c === "\n" || c === "\f" || c === "\v" || c === " " || c === "﻿"; }
  function estHexa(c) { return c !== "" && /[0-9a-fA-F]/.test(c); }

  var OPS = ["<=>", "->>", "<>", "!=", "<=", ">=", "!<", "!>", "||", "&&", "::", ":=", "=>", "->", "+=", "-=", "*=", "/=", "%=", "&=", "|=", "^="];

  // opt.mysql : « -- » suivi d'un blanc seulement, "…" = un texte ; opt.antislash : \' dans un texte.
  function lireJetons(src, opt) {
    var J = [], i = 0, n = src.length, nl = true, esp = true, delim = ";";
    var info = { commentaires: 0, diese: false, delimiter: false, accents: false };
    function pousse(t, d, f, x) {
      var v = src.slice(d, f);
      var j = { t: t, v: v, h: t === "mot" ? v.toUpperCase() : (t === "op" ? v : ""), d: d, f: f, nl: nl, esp: esp };
      if (x) j.x = x;
      J.push(j); nl = false; esp = false;
    }
    function fin(erreur) {
      J.push({ t: "fin", v: "", h: "", d: erreur ? erreur.d : n, f: erreur ? erreur.d : n, nl: true, esp: true });
      return { jetons: J, erreur: erreur || null, info: info };
    }
    while (i < n) {
      var c = src.charAt(i), c2 = src.charAt(i + 1), d, k;
      // DELIMITER // (client MySQL), au début d'une ligne
      if (nl && (c === "d" || c === "D")) {
        var md = /^delimiter[ \t]+(\S+)[ \t]*(?:\r?\n|$)/i.exec(src.slice(i, i + 60));
        if (md) { delim = md[1]; info.delimiter = true; i += md[0].length; nl = true; esp = true; continue; }
      }
      if (delim !== ";" && src.substr(i, delim.length) === delim) {
        pousse("op", i, i + delim.length); J[J.length - 1].v = ";"; J[J.length - 1].h = ";";
        i += delim.length; continue;
      }
      if (c === "\n") { nl = true; esp = true; i++; continue; }
      if (estBlanc(c)) { esp = true; i++; continue; }
      // commentaires : -- et // jusqu'à la fin de la ligne, # (MySQL), /* … */ (emboîtés sur SQL Server)
      if ((c === "-" && c2 === "-" && !(opt.mysql && i + 2 < n && !estBlanc(src.charAt(i + 2)))) || (c === "/" && c2 === "/") ||
          (c === "#" && !estLettre(c2) && !estChiffre(c2) && c2 !== "#" && c2 !== "@" && c2 !== "$")) {
        if (c === "#") info.diese = true;
        while (i < n && src.charAt(i) !== "\n") i++;
        esp = true; info.commentaires++; continue;
      }
      if (c === "/" && c2 === "*") {
        if (src.charAt(i + 2) === "!") {                  // MySQL /*! … */ : du code exécuté, pas un commentaire
          k = src.indexOf("*/", i + 3);
          if (k < 0) return fin({ d: i, quoi: "commentaire" });
          pousse("inconnu", i, k + 2); i = k + 2; continue;
        }
        var prof = 0; k = i;
        while (k < n) {
          if (src.charAt(k) === "/" && src.charAt(k + 1) === "*") { prof++; k += 2; }
          else if (src.charAt(k) === "*" && src.charAt(k + 1) === "/") { prof--; k += 2; if (prof === 0) break; }
          else k++;
        }
        if (prof !== 0) {                                  // emboîtement jamais fermé : MySQL et Snowflake ne l'emboîtent pas
          k = src.indexOf("*/", i + 2);
          if (k < 0) return fin({ d: i, quoi: "commentaire" });
          k += 2;
        }
        if (src.slice(i, k).indexOf("\n") >= 0) nl = true;
        esp = true; info.commentaires++; i = k; continue;
      }
      // textes : 'x' (avec ''), N'x', X'…', B'…', $$x$$
      if (c === "'" || ((c === "N" || c === "n" || c === "X" || c === "x" || c === "B" || c === "b") && c2 === "'")) {
        d = i; i += c === "'" ? 1 : 2;
        var ferme = false;
        while (i < n) {
          var ch = src.charAt(i);
          if (ch === "\\" && opt.antislash) { i += 2; continue; }
          if (ch === "'") { if (src.charAt(i + 1) === "'") { i += 2; continue; } i++; ferme = true; break; }
          i++;
        }
        if (!ferme) return fin({ d: d, quoi: "texte" });
        pousse("texte", d, i); continue;
      }
      if (c === "$" && c2 === "$") {
        k = src.indexOf("$$", i + 2);
        if (k < 0) return fin({ d: i, quoi: "dollar" });
        pousse("texte", i, k + 2, "dollar"); i = k + 2; continue;
      }
      // noms entre [crochets], "guillemets" (un texte sur MySQL), `accents graves`
      if (c === "[" || c === "\"" || c === "`") {
        var f2 = c === "[" ? "]" : c, ok = false;
        d = i; i++;
        while (i < n) {
          var c3 = src.charAt(i);
          if (c3 === f2) { if (src.charAt(i + 1) === f2) { i += 2; continue; } i++; ok = true; break; }
          if (c === "[" && c3 === "\n") break;
          i++;
        }
        if (!ok) return fin({ d: d, quoi: c === "[" ? "crochet" : c === "`" ? "accent" : "guillemet" });
        if (c === "`") info.accents = true;
        pousse(c === "\"" && opt.mysql ? "texte" : "nom", d, i); continue;
      }
      // nombres : 12, 1.5, .5, 1e-3, 0x1F
      var prec = J[J.length - 1];
      if (estChiffre(c) || (c === "." && estChiffre(c2) && !(prec && !esp && (prec.t === "mot" || prec.t === "nom")))) {
        d = i;
        if (c === "0" && (c2 === "x" || c2 === "X") && estHexa(src.charAt(i + 2))) { i += 2; while (i < n && estHexa(src.charAt(i))) i++; }
        else {
          while (i < n && estChiffre(src.charAt(i))) i++;
          if (src.charAt(i) === "." && src.charAt(i + 1) !== ".") { i++; while (i < n && estChiffre(src.charAt(i))) i++; }
          var e = src.charAt(i), e2 = src.charAt(i + 1);
          if ((e === "e" || e === "E") && (estChiffre(e2) || ((e2 === "+" || e2 === "-") && estChiffre(src.charAt(i + 2))))) {
            i += 2; while (i < n && estChiffre(src.charAt(i))) i++;
          }
        }
        if (i < n && estLettre(src.charAt(i))) { while (i < n && estSuite(src.charAt(i))) i++; pousse("mot", d, i); continue; }
        pousse("nombre", d, i); continue;
      }
      // mots : noms, mots-clés, @variable, @@ROWCOUNT, #temp, $action ; @stage/chemin (Snowflake)
      if (estLettre(c) || c === "@" || c === "#" || (c === "$" && estLettre(c2))) {
        d = i; i++;
        if (c === "@" && (c2 === "~" || c2 === "%")) i++;
        while (i < n && estSuite(src.charAt(i))) i++;
        if (c === "@" && c2 !== "@") while (src.charAt(i) === "/") { i++; while (i < n && (estSuite(src.charAt(i)) || src.charAt(i) === "." || src.charAt(i) === "-")) i++; }
        pousse("mot", d, i); continue;
      }
      // paramètres : ?, $1, :nom (mais col:champ est un chemin Snowflake)
      if (c === "?") { pousse("param", i, i + 1); i++; continue; }
      if (c === "$" && estChiffre(c2)) { d = i; i++; while (i < n && estChiffre(src.charAt(i))) i++; pousse("param", d, i); continue; }
      if (c === ":" && c2 !== ":" && c2 !== "=" && estLettre(c2)) {
        var colle = prec && !esp && (prec.t === "mot" || prec.t === "nom" || prec.v === ")" || prec.v === "]");
        if (!colle) { d = i; i++; while (i < n && estSuite(src.charAt(i))) i++; pousse("param", d, i); continue; }
      }
      var op = null;
      for (k = 0; k < OPS.length; k++) if (src.substr(i, OPS[k].length) === OPS[k]) { op = OPS[k]; break; }
      if (!op) op = c;
      pousse("op", i, i + op.length); i += op.length;
    }
    return fin(null);
  }

  // ---------- 2. L'analyse : jetons → arbre ----------
  // Mots qui commencent une instruction (pour couper un script sans « ; »).
  var DEBUTS = ensemble("SELECT WITH INSERT UPDATE DELETE MERGE TRUNCATE CREATE ALTER DROP UNDROP DECLARE SET IF WHILE BEGIN START " +
    "COMMIT ROLLBACK SAVE SAVEPOINT RELEASE THROW RAISERROR SIGNAL RESIGNAL EXEC EXECUTE CALL PRINT RETURN BREAK CONTINUE " +
    "LEAVE ITERATE OPEN FETCH CLOSE DEALLOCATE USE WAITFOR REPLACE VALUES LET GRANT REVOKE DENY GOTO");
  // Instructions SQL réelles que le traducteur ne sait pas encore traduire.
  var NON_TRADUITES = ensemble("GRANT REVOKE DENY BACKUP RESTORE DBCC BULK SHOW DESCRIBE DESC EXPLAIN ANALYZE OPTIMIZE LOCK " +
    "UNLOCK RENAME COMMENT PUT GET LIST REMOVE COPY CHECKPOINT KILL RECONFIGURE REVERT ENABLE DISABLE GOTO LOAD HANDLER FLUSH " +
    "PURGE RESET INSTALL UNINSTALL CHECKSUM REPAIR CACHE PREPARE SHUTDOWN REFRESH VACUUM UPSERT SETUSER " +
    "LOOP REPEAT FOR CASE RAISE");
  // Mots qui ne peuvent pas être un alias écrit sans AS.
  var RESERVES = ensemble("SELECT FROM WHERE GROUP HAVING ORDER BY UNION ALL EXCEPT INTERSECT MINUS JOIN INNER LEFT RIGHT FULL " +
    "CROSS OUTER ON USING NATURAL APPLY LATERAL STRAIGHT_JOIN WINDOW QUALIFY LIMIT OFFSET FETCH INTO VALUES VALUE SET UPDATE " +
    "DELETE INSERT MERGE WITH AS AND OR NOT IS IN LIKE ILIKE RLIKE REGEXP BETWEEN CASE WHEN THEN ELSE END EXISTS TOP DISTINCT " +
    "CREATE DROP ALTER TRUNCATE DECLARE IF WHILE BEGIN COMMIT ROLLBACK RETURN EXEC EXECUTE PRINT GO USE OPEN CLOSE DEALLOCATE " +
    "THROW RAISERROR BREAK CONTINUE GRANT REVOKE OPTION FOR PIVOT UNPIVOT OUTPUT RETURNING MATCHED TABLESAMPLE SAMPLE START " +
    "CALL REPLACE SAVE WAITFOR GOTO ELSEIF ELSIF LOOP DO UNTIL LET CONNECT ESCAPE COLLATE OVER PARTITION NULL ASC DESC " +
    "FORCE IGNORE SIGNAL MATCH_RECOGNIZE");
  // Mots qui ne peuvent pas commencer une expression.
  var PAS_EXPRESSION = ensemble("FROM WHERE GROUP ORDER HAVING UNION EXCEPT INTERSECT MINUS JOIN INNER OUTER CROSS ON THEN " +
    "ELSE END WHEN AND OR AS BY INTO SET LIMIT OFFSET FETCH QUALIFY WINDOW SELECT INSERT UPDATE DELETE MERGE DECLARE IS IN " +
    "LIKE BETWEEN DISTINCT TOP ASC DESC USING NATURAL APPLY WITH OVER GO CREATE DROP ALTER TRUNCATE BEGIN COMMIT ROLLBACK " +
    "PRINT RETURN EXEC EXECUTE OPTION FOR ESCAPE");
  var COMPARAISONS = ensemble("= <> != < > <= >= !< !> <=>");
  var ADDITIFS = ensemble("+ - || & | ^");
  var AFFECTATIONS = ensemble("= := += -= *= /= %= &= |= ^=");
  var SANS_PARENTHESES = ensemble("CURRENT_DATE CURRENT_TIMESTAMP CURRENT_TIME LOCALTIMESTAMP LOCALTIME CURRENT_USER " +
    "SESSION_USER SYSTEM_USER CURRENT_ROLE");
  var TYPES_SQL = ensemble("VARCHAR NVARCHAR CHAR NCHAR VARBINARY BINARY INT INTEGER BIGINT SMALLINT TINYINT DECIMAL NUMERIC " +
    "FLOAT REAL MONEY SMALLMONEY BIT DATE DATETIME DATETIME2 SMALLDATETIME DATETIMEOFFSET TIME UNIQUEIDENTIFIER XML TEXT " +
    "NTEXT SQL_VARIANT IMAGE SIGNED UNSIGNED DOUBLE NUMBER STRING TIMESTAMP BOOLEAN JSON");
  var INDICES_TABLE = ensemble("NOLOCK READUNCOMMITTED UPDLOCK HOLDLOCK ROWLOCK TABLOCK TABLOCKX PAGLOCK NOWAIT READPAST " +
    "XLOCK SERIALIZABLE REPEATABLEREAD READCOMMITTED READCOMMITTEDLOCK INDEX FORCESEEK FORCESCAN NOEXPAND SNAPSHOT " +
    "KEEPIDENTITY KEEPDEFAULTS IGNORE_CONSTRAINTS IGNORE_TRIGGERS");
  var UNITES_INTERVALLE = ensemble("MICROSECOND SECOND MINUTE HOUR DAY WEEK MONTH QUARTER YEAR SECOND_MICROSECOND " +
    "MINUTE_MICROSECOND MINUTE_SECOND HOUR_MICROSECOND HOUR_SECOND HOUR_MINUTE DAY_MICROSECOND DAY_SECOND DAY_MINUTE " +
    "DAY_HOUR YEAR_MONTH DAYS MONTHS YEARS HOURS MINUTES SECONDS WEEKS");
  var OPTIONS_SET = ensemble("NOCOUNT XACT_ABORT ANSI_NULLS QUOTED_IDENTIFIER ANSI_WARNINGS ANSI_PADDING ANSI_NULL_DFLT_ON " +
    "ANSI_DEFAULTS ARITHABORT ARITHIGNORE CONCAT_NULL_YIELDS_NULL NUMERIC_ROUNDABORT DATEFORMAT DATEFIRST LANGUAGE ROWCOUNT " +
    "STATISTICS SHOWPLAN_XML SHOWPLAN_TEXT SHOWPLAN_ALL NOEXEC PARSEONLY FMTONLY IDENTITY_INSERT DEADLOCK_PRIORITY " +
    "LOCK_TIMEOUT IMPLICIT_TRANSACTIONS CURSOR_CLOSE_ON_COMMIT TEXTSIZE NAMES CONTEXT_INFO FORCEPLAN QUERY_GOVERNOR_COST_LIMIT");

  function analyser(J, src) {
    var i = 0, pas = 0, MAXPAS = J.length * 80 + 5000, prof = 0;
    var variables = {};          // noms déclarés (DECLARE) : un INTO x vise alors une variable
    var points = {};             // points de sauvegarde (SAVE TRAN x)

    function jt(k) { return J[Math.min(i + (k || 0), J.length - 1)]; }
    function h(k) { var x = jt(k); return x.t === "mot" || x.t === "op" ? x.h : ""; }
    function est(m) { return h() === m; }
    function estMots(l) { for (var k = 0; k < l.length; k++) if (h(k) !== l[k]) return false; return true; }
    function prendre(m) { if (h() === m) { i++; return true; } return false; }
    function prendreMots(l) { if (estMots(l)) { i += l.length; return true; } return false; }
    function echec(m, k) { throw { lecture: true, i: k === undefined ? i : k, msg: m }; }
    function inconnu(k) { throw { lecture: true, inconnu: true, i: k === undefined ? i : k }; }
    function exiger(m) { if (!prendre(m)) echec("« " + m + " » attendu"); }
    function exigerMots(l) { if (!prendreMots(l)) echec("« " + l.join(" ") + " » attendu"); }
    function garde() { if (++pas > MAXPAS) echec("trop long"); }
    function avance() { garde(); var x = J[i]; if (x.t !== "fin") i++; return x; }
    function texte(d, f) { return f > d ? src.slice(J[d].d, J[f - 1].f) : ""; }
    function estFin() { return jt().t === "fin"; }
    function estGo(k) {
      k = k || 0;
      var x = jt(k);
      if (x.t !== "mot" || x.h !== "GO" || !x.nl) return false;
      var y = jt(k + 1);
      if (y.t === "fin" || y.nl || (y.t === "op" && y.v === ";")) return true;
      return y.t === "nombre" && (jt(k + 2).t === "fin" || jt(k + 2).nl);
    }
    function profond(fn) {
      if (++prof > 150) { prof--; echec("trop imbriquée"); }
      try { return fn(); } finally { prof--; }
    }
    function ident() {
      var x = jt();
      if (x.t === "mot" || x.t === "nom") { avance(); return x.v; }
      echec("nom attendu");
    }
    // a, a.b, base.schema.table, base..table, #temp, @t
    function nomQualifie() {
      var d = i, x = jt();
      if (x.t !== "mot" && x.t !== "nom") echec("nom attendu");
      if (x.t === "mot" && RESERVES[x.h]) echec("nom attendu");
      avance();
      var parts = [x.v];
      for (;;) {
        garde();
        if (!est(".")) break;
        var y = jt(1);
        if (y.t === "mot" || y.t === "nom") { i += 2; parts.push(y.v); continue; }
        if (y.t === "op" && y.v === ".") { i += 1; parts.push(""); continue; }
        break;
      }
      return { texte: texte(d, i), parts: parts, court: parts[parts.length - 1] };
    }

    // --- Expressions ---
    function expr() {
      return profond(function () { var d = i, e = ou(); if (!e.src) e.src = texte(d, i); return e; });
    }
    function ou() {
      var d = i, g = et(), termes = null;
      for (;;) {
        garde();
        if (est("OR")) { avance(); (termes = termes || [g]).push(et()); continue; }
        if (est("XOR")) { avance(); if (termes) { g = { t: "ou", termes: termes }; termes = null; } g = { t: "xor", g: g, d: et() }; continue; }
        break;
      }
      var r = termes ? { t: "ou", termes: termes } : g;
      if (!r.src) r.src = texte(d, i);
      return r;
    }
    function et() {
      var d = i, g = non(), termes = null;
      while (est("AND") || est("&&")) { garde(); avance(); (termes = termes || [g]).push(non()); }
      var r = termes ? { t: "et", termes: termes } : g;
      if (!r.src) r.src = texte(d, i);
      return r;
    }
    function non() {
      var d = i;
      if (est("NOT") || (est("!") && jt().t === "op")) { garde(); avance(); var n = { t: "non", e: non() }; n.src = texte(d, i); return n; }
      return predicat();
    }
    function predicat() {
      var d0 = i, g = addition();
      for (;;) {
        if (g.src === undefined) g.src = texte(d0, i);
        garde();
        var x = h(), neg = false;
        if (COMPARAISONS[x] && jt().t === "op") {
          avance();
          if ((est("ANY") || est("ALL") || est("SOME")) && h(1) === "(") {
            var q = avance().h; avance();
            if (!debutRequete()) echec("SELECT attendu");
            var rq = requeteComplete(); exiger(")");
            g = { t: "quant", op: x, q: q, g: g, req: rq };
            continue;
          }
          g = { t: "cmp", op: x, g: g, d: addition() };
          continue;
        }
        if (x === "IS") {
          avance();
          neg = prendre("NOT");
          if (prendre("NULL")) g = { t: "isnull", e: g, non: neg };
          else if (est("TRUE") || est("FALSE") || est("UNKNOWN")) g = { t: "isbool", e: g, val: avance().h, non: neg };
          else if (prendreMots(["DISTINCT", "FROM"])) g = { t: "distinctde", g: g, d: addition(), non: neg };
          else echec("NULL attendu après IS");
          continue;
        }
        if (x === "NOT" && /^(IN|LIKE|ILIKE|RLIKE|REGEXP|BETWEEN|SIMILAR)$/.test(h(1))) { avance(); neg = true; x = h(); }
        if (x === "IN") { avance(); g = suiteIn(g, neg); continue; }
        if (x === "BETWEEN") {
          avance();
          var a = addition(); exiger("AND");
          g = { t: "between", e: g, a: a, b: addition(), non: neg };
          continue;
        }
        if (x === "LIKE" || x === "ILIKE" || x === "RLIKE" || x === "REGEXP") {
          avance();
          var lk = { t: "like", op: x, e: g, non: neg };
          if ((est("ANY") || est("ALL") || est("SOME")) && h(1) === "(") {
            lk.quant = avance().h; avance();
            lk.liste = [expr()]; while (prendre(",")) lk.liste.push(expr());
            exiger(")");
          } else lk.motif = addition();
          if (prendre("ESCAPE")) lk.esc = addition();
          g = lk;
          continue;
        }
        if (x === "SIMILAR") inconnu();
        if (neg) echec("IN, LIKE ou BETWEEN attendu après NOT");
        break;
      }
      if (g.src === undefined) g.src = texte(d0, i);
      return g;
    }
    function suiteIn(g, neg) {
      exiger("(");
      if (debutRequete()) { var r = requeteComplete(); exiger(")"); return { t: "in", e: g, req: r, non: neg }; }
      var l = [];
      if (!est(")")) { l.push(expr()); while (prendre(",")) l.push(expr()); }
      exiger(")");
      return { t: "in", e: g, liste: l, non: neg };
    }
    function addition() {
      var d = i, g = multiplication();
      for (;;) {
        garde();
        var x = jt();
        if (x.t === "op" && ADDITIFS[x.v]) { avance(); g = { t: "arith", op: x.v, g: g, d: multiplication() }; }
        else break;
      }
      if (!g.src) g.src = texte(d, i);
      return g;
    }
    function multiplication() {
      var g = unaire();
      for (;;) {
        garde();
        var x = jt();
        if ((x.t === "op" && (x.v === "*" || x.v === "/" || x.v === "%")) || (x.t === "mot" && (x.h === "DIV" || x.h === "MOD") && jt(1).t !== "op")) {
          avance(); g = { t: "arith", op: x.t === "op" ? x.v : x.h, g: g, d: unaire() };
        } else break;
      }
      return g;
    }
    function unaire() {
      var x = jt();
      if (x.t === "op" && (x.v === "-" || x.v === "+" || x.v === "~")) { avance(); return { t: "unaire", op: x.v, e: unaire() }; }
      var d = i, e = postfixe(primaire());
      if (!e.src) e.src = texte(d, i);
      return e;
    }
    function postfixe(e) {
      for (;;) {
        garde();
        var x = jt();
        if (x.t === "op" && x.v === "::") { avance(); e = { t: "cast", e: e, type: typeDonnee(), forme: "::" }; continue; }
        if (x.t === "op" && x.v === ":" && !x.esp && (jt(1).t === "mot" || jt(1).t === "nom")) { avance(); e = { t: "chemin", e: e, chemin: cheminJson() }; continue; }
        if (x.t === "nom" && x.v.charAt(0) === "[" && !x.esp && e.t === "chemin") { avance(); e.chemin += x.v; continue; }
        if (x.t === "mot" && x.h === "COLLATE") { avance(); e = { t: "collate", e: e, c: avance().v }; continue; }
        if (x.t === "mot" && x.h === "AT" && h(1) === "TIME" && h(2) === "ZONE") { i += 3; e = { t: "atz", e: e, z: postfixe(primaire()) }; continue; }
        if (x.t === "op" && (x.v === "->" || x.v === "->>")) { avance(); e = { t: "json", op: x.v, e: e, chemin: primaire() }; continue; }
        // méthode XML de SQL Server : (…).value('.', 'NVARCHAR(MAX)')
        if (x.t === "op" && x.v === "." && jt(1).t === "mot" && h(2) === "(" && (e.t === "sousreq" || e.t === "col" || e.t === "var")) {
          avance(); var m = avance().v; avance();
          var args = []; if (!est(")")) { do { garde(); args.push(expr()); } while (prendre(",")); }
          exiger(")");
          e = { t: "methode", e: e, nom: m.toUpperCase(), args: args };
          continue;
        }
        break;
      }
      return e;
    }
    function cheminJson() {
      var d = i;
      avance();
      for (;;) {
        garde();
        var y = jt();
        if (y.t === "op" && y.v === "." && !y.esp && (jt(1).t === "mot" || jt(1).t === "nom")) { i += 2; continue; }
        if (y.t === "nom" && y.v.charAt(0) === "[" && !y.esp) { avance(); continue; }
        break;
      }
      return texte(d, i);
    }
    function primaire() {
      garde();
      var x = jt(), d = i;
      if (x.t === "nombre") { avance(); return { t: "nombre", v: x.v }; }
      if (x.t === "texte") { avance(); return { t: "texte", v: x.v, dollar: x.x === "dollar" }; }
      if (x.t === "param") { avance(); return { t: "param", v: x.v }; }
      if (x.t === "inconnu") inconnu();
      if (x.t === "fin") echec("expression attendue");
      if (x.t === "op") {
        if (x.v === "(") {
          avance();
          if (debutRequete()) { var r = requeteComplete(); exiger(")"); return { t: "sousreq", req: r }; }
          var e = expr();
          if (est(",")) { var l = [e]; while (prendre(",")) l.push(expr()); exiger(")"); return { t: "tuple", liste: l }; }
          exiger(")");
          e.paren = true;
          return e;
        }
        if (x.v === "*") { avance(); return { t: "etoile" }; }
        echec("expression attendue");
      }
      if (x.t === "mot") {
        var m = x.h, suite = h(1);
        if (m === "NULL") { avance(); return { t: "null" }; }
        if (m === "TRUE" || m === "FALSE") { avance(); return { t: "bool", v: m }; }
        if (m === "DEFAULT" && suite !== "(") { avance(); return { t: "defaut" }; }
        if (m === "CASE") return cas();
        if (m === "EXISTS" && suite === "(") { i += 2; var rq = requeteComplete(); exiger(")"); return { t: "exists", req: rq }; }
        if ((m === "CAST" || m === "TRY_CAST") && suite === "(") {
          i += 2;
          var ce = expr(); exiger("AS"); var ty = typeDonnee(); exiger(")");
          return { t: "cast", e: ce, type: ty, essai: m === "TRY_CAST", forme: m };
        }
        if ((m === "CONVERT" || m === "TRY_CONVERT") && suite === "(") return convertir();
        if (m === "INTERVAL" && jt(1).t !== "op") return intervalle();
        if ((m === "DATE" || m === "TIMESTAMP" || m === "TIME") && jt(1).t === "texte") { i += 2; return { t: "texte", v: texte(d, i), type: m }; }
        if (m === "NEXT" && suite === "VALUE" && h(2) === "FOR") { i += 3; var sq = nomQualifie(); return { t: "fn", nom: "NEXT VALUE FOR", args: [{ t: "col", v: sq.texte, parts: sq.parts }], src: texte(d, i) }; }
        if (SANS_PARENTHESES[m] && suite !== "(" && suite !== ".") { avance(); return { t: "fn", nom: m, args: [], src: x.v }; }
        if (PAS_EXPRESSION[m] && suite !== "(") echec("expression attendue");
        if (x.v.charAt(0) === "@" && suite !== ".") { avance(); return { t: "var", v: x.v }; }
      }
      return nomOuAppel();
    }
    function nomOuAppel() {
      var d = i, x = jt();
      if (x.t !== "mot" && x.t !== "nom") echec("expression attendue");
      avance();
      var parts = [x.v];
      for (;;) {
        garde();
        if (!est(".")) break;
        var y = jt(1);
        if (y.t === "op" && y.v === "*") { i += 2; return { t: "etoile", table: texte(d, i - 2) }; }
        if (y.t === "mot" || y.t === "nom") { i += 2; parts.push(y.v); continue; }
        if (y.t === "op" && y.v === ".") { i += 1; parts.push(""); continue; }
        if (y.t === "param" && /^\$\d+$/.test(y.v)) { i += 2; return { t: "param", v: texte(d, i) }; }
        break;
      }
      if (est("(")) return appel(d, parts);
      return { t: "col", v: texte(d, i), parts: parts };
    }
    function appel(d, parts) {
      var brut = texte(d, i), haut = parts.length === 1 ? parts[0].toUpperCase() : brut.toUpperCase();
      exiger("(");
      var f = { t: "fn", nom: haut, args: [] };
      if (haut === "EXTRACT") {
        var u = avance(); exiger("FROM");
        f.args = [{ t: "unite", v: u.v }, expr()];
      } else if (haut === "TRIM" && /^(BOTH|LEADING|TRAILING)$/.test(h())) {
        f.cote = avance().h;
        if (!est("FROM")) f.chars = expr();
        exiger("FROM");
        f.args = [expr()];
      } else if (!est(")")) {
        if (prendre("DISTINCT")) f.distinct = true;
        else if (est("ALL") && h(1) !== ")" && h(1) !== ",") avance();
        if (est("*") && h(1) === ")") { avance(); f.etoile = true; }
        else {
          for (;;) {
            garde();
            if ((jt().t === "mot" || jt().t === "nom") && h(1) === "=>") { var cle = avance().v; avance(); f.args.push({ t: "nomme", cle: cle.toUpperCase(), e: expr() }); }
            else f.args.push(expr());
            if (haut === "TRIM" && prendre("FROM")) { f.chars = f.args.pop(); f.args.push(expr()); }
            if (haut === "POSITION" && prendre("IN")) f.args.push(expr());
            if ((haut === "SUBSTRING" || haut === "SUBSTR") && prendre("FROM")) { f.args.push(expr()); if (prendre("FOR")) f.args.push(expr()); }
            if (estMots(["ORDER", "BY"])) { i += 2; f.triInterne = listeTri(); }
            if (prendre("SEPARATOR")) f.separateur = expr();
            if ((est("IGNORE") || est("RESPECT")) && h(1) === "NULLS") { f.nulls = avance().h; avance(); }
            if (!prendre(",")) break;
          }
        }
      }
      exiger(")");
      if (estMots(["WITHIN", "GROUP"])) { i += 2; exiger("("); exigerMots(["ORDER", "BY"]); f.dansGroupe = listeTri(); exiger(")"); }
      if ((est("IGNORE") || est("RESPECT")) && h(1) === "NULLS") { f.nulls = avance().h; avance(); }
      if (est("FILTER") && h(1) === "(") { i += 2; exiger("WHERE"); f.filtre = expr(); exiger(")"); }
      if (est("OVER")) { avance(); f.over = fenetre(); }
      f.src = texte(d, i);
      return f;
    }
    function convertir() {
      var m = avance().h; avance();
      var x = jt();
      if (x.t === "mot" && TYPES_SQL[x.h] && (h(1) === "," || h(1) === "(")) {      // SQL Server : CONVERT(type, x [, style])
        var ty = typeDonnee(); exiger(",");
        var e = expr(), style = null;
        if (prendre(",")) style = expr();
        exiger(")");
        return { t: "cast", e: e, type: ty, essai: m === "TRY_CONVERT", forme: m, style: style };
      }
      var e2 = expr();
      if (prendre("USING")) { var cs = avance().v; exiger(")"); return { t: "fn", nom: "CONVERT USING", args: [e2], jeu: cs, src: "CONVERT" }; }
      exiger(",");
      if (jt().t === "mot" && TYPES_SQL[h()]) { var ty2 = typeDonnee(); exiger(")"); return { t: "cast", e: e2, type: ty2, forme: "CONVERT" }; }
      var args = [e2, expr()]; while (prendre(",")) args.push(expr());
      exiger(")");
      return { t: "fn", nom: m, args: args, src: m + "(…)" };
    }
    function typeDonnee() {
      var d = i, x = jt();
      if (x.t !== "mot" && x.t !== "nom") echec("type attendu");
      avance();
      var nom = x.t === "mot" ? x.h : x.v;
      if (nom === "DOUBLE" && est("PRECISION")) avance();
      else if ((nom === "CHARACTER" || nom === "CHAR") && est("VARYING")) { avance(); nom = "VARCHAR"; }
      else if (nom === "NATIONAL" && (est("CHAR") || est("CHARACTER"))) { avance(); nom = "NCHAR"; if (prendre("VARYING")) nom = "NVARCHAR"; }
      else if ((nom === "SIGNED" || nom === "UNSIGNED") && (est("INT") || est("INTEGER"))) avance();
      while (est(".") && (jt(1).t === "mot" || jt(1).t === "nom")) { i += 2; nom = texte(d, i).toUpperCase(); }
      var args = [];
      if (est("(")) {
        avance();
        if (!est(")")) {
          do {
            garde();
            var a = jt();
            if (a.t === "fin" || (a.t === "op" && a.v !== "-")) echec("taille attendue");
            avance(); args.push(a.h || a.v);
            if (est("CHAR") || est("BYTE")) avance();
          } while (prendre(","));
        }
        exiger(")");
      }
      if (est("UNSIGNED") || est("ZEROFILL")) avance();
      if ((nom.indexOf("TIMESTAMP") === 0 || nom === "TIME") && (estMots(["WITH", "TIME", "ZONE"]) || estMots(["WITHOUT", "TIME", "ZONE"]))) i += 3;
      return { nom: nom, args: args, texte: texte(d, i) };
    }
    function intervalle() {
      avance();
      var e = unaire(), u = null;
      if (jt().t === "mot" && UNITES_INTERVALLE[h()]) u = avance().h;
      return { t: "intervalle", e: e, unite: u };
    }
    function cas() {
      avance();
      var c = { t: "case", quand: [] };
      if (!est("WHEN")) c.sujet = expr();
      while (est("WHEN")) { garde(); avance(); var si = expr(); exiger("THEN"); c.quand.push({ si: si, alors: expr() }); }
      if (!c.quand.length) echec("WHEN attendu");
      if (prendre("ELSE")) c.sinon = expr();
      exiger("END");
      return c;
    }
    function fenetre() {
      if ((jt().t === "mot" || jt().t === "nom") && !est("(")) return { nom: avance().v };
      exiger("(");
      var w = {};
      if ((jt().t === "mot" || jt().t === "nom") && !/^(PARTITION|ORDER|ROWS|RANGE|GROUPS)$/.test(h())) w.base = avance().v;
      if (prendreMots(["PARTITION", "BY"])) { w.partition = [expr()]; while (prendre(",")) w.partition.push(expr()); }
      if (prendreMots(["ORDER", "BY"])) w.tri = listeTri();
      if (est("ROWS") || est("RANGE") || est("GROUPS")) w.cadre = cadre();
      exiger(")");
      return w;
    }
    function cadre() {
      var c = { type: avance().h };
      if (prendre("BETWEEN")) { c.debut = borne(); exiger("AND"); c.fin = borne(); }
      else { c.debut = borne(); c.fin = { courant: true }; }
      if (prendre("EXCLUDE")) { while (!est(")") && !estFin()) avance(); }
      return c;
    }
    function borne() {
      if (prendreMots(["UNBOUNDED", "PRECEDING"])) return { illimite: true, sens: "avant" };
      if (prendreMots(["UNBOUNDED", "FOLLOWING"])) return { illimite: true, sens: "apres" };
      if (prendreMots(["CURRENT", "ROW"])) return { courant: true };
      var n = addition();
      if (prendre("PRECEDING")) return { n: n, sens: "avant" };
      if (prendre("FOLLOWING")) return { n: n, sens: "apres" };
      echec("PRECEDING ou FOLLOWING attendu");
    }
    function listeTri() {
      var l = [];
      do {
        garde();
        var s = { e: expr(), sens: "ASC" };
        if (prendre("ASC")) s.ecrit = true; else if (prendre("DESC")) { s.sens = "DESC"; s.ecrit = true; }
        if (prendreMots(["NULLS", "FIRST"])) s.nulls = "FIRST"; else if (prendreMots(["NULLS", "LAST"])) s.nulls = "LAST";
        l.push(s);
      } while (prendre(","));
      return l;
    }

    // --- Requêtes ---
    function debutRequete() {
      var k = 0;
      while (h(k) === "(" && jt(k).t === "op") k++;
      return h(k) === "SELECT" || h(k) === "WITH";
    }
    function requeteComplete() {
      return profond(function () {
        var r = { t: "requete", d: i };
        if (est("WITH")) r.avec = ctes();
        r.corps = operations();
        finRequete(r);
        r.f = i;
        return r;
      });
    }
    // UNION, EXCEPT, MINUS : de gauche à droite ; INTERSECT passe avant.
    function operations() {
      var g = intersection();
      for (;;) {
        garde();
        if (!(est("UNION") || est("EXCEPT") || est("MINUS"))) break;
        var n = { t: "ensemble", op: avance().h, g: g };
        if (prendre("ALL")) n.tout = true; else prendre("DISTINCT");
        if (prendreMots(["BY", "NAME"])) n.parNom = true;
        n.d = intersection();
        g = n;
      }
      return g;
    }
    function intersection() {
      var g = blocSelect();
      for (;;) {
        garde();
        if (!est("INTERSECT")) break;
        avance();
        var n = { t: "ensemble", op: "INTERSECT", g: g };
        if (prendre("ALL")) n.tout = true; else prendre("DISTINCT");
        n.d = blocSelect();
        g = n;
      }
      return g;
    }
    function blocSelect() {
      if (est("(")) { avance(); var r = requeteComplete(); exiger(")"); r.paren = true; return r; }
      if (est("SELECT")) return select();
      if (est("VALUES")) { avance(); return { t: "valeurs", lignes: lignesValeurs() }; }
      echec("SELECT attendu");
    }
    function select() {
      var s = { t: "select", d: i };
      exiger("SELECT");
      for (;;) {
        garde();
        if (est("DISTINCT") || est("DISTINCTROW")) { avance(); s.distinct = true; continue; }
        if (est("ALL") && h(1) !== "," && h(1) !== "FROM") { avance(); continue; }
        if (est("TOP")) { avance(); s.top = top(); continue; }
        if (/^(SQL_CALC_FOUND_ROWS|SQL_NO_CACHE|SQL_CACHE|HIGH_PRIORITY|STRAIGHT_JOIN|SQL_SMALL_RESULT|SQL_BIG_RESULT|SQL_BUFFER_RESULT)$/.test(h())) { avance(); continue; }
        break;
      }
      s.colonnes = colonnes();
      if (prendre("INTO")) s.into = cibleInto();
      if (prendre("FROM")) s.from = sources();
      if (prendre("WHERE")) s.where = expr();
      if (prendreMots(["GROUP", "BY"])) s.groupe = groupeBy();
      if (prendre("HAVING")) s.having = expr();
      if (prendre("WINDOW")) { s.fenetres = []; do { garde(); var nw = ident(); exiger("AS"); s.fenetres.push({ nom: nw, w: fenetre() }); } while (prendre(",")); }
      if (prendre("QUALIFY")) s.qualify = expr();
      s.f = i;
      return s;
    }
    function top() {
      var r = {};
      if (est("(")) { avance(); r.n = expr(); exiger(")"); }
      else {
        var x = jt();
        if (x.t === "nombre" || x.t === "param") { avance(); r.n = { t: x.t, v: x.v }; }
        else if (x.t === "mot" && x.v.charAt(0) === "@") { avance(); r.n = { t: "var", v: x.v }; }
        else echec("nombre attendu après TOP");
      }
      if (prendre("PERCENT")) r.pourcent = true;
      if (prendreMots(["WITH", "TIES"])) r.exaequo = true;
      return r;
    }
    function aliasPossible() {
      var x = jt();
      if (x.t === "nom" || x.t === "texte") return x.t === "nom" || x.v.charAt(0) === "'" || x.v.charAt(0) === "\"";
      return x.t === "mot" && !RESERVES[x.h] && x.v.charAt(0) !== "@" && !estGo();
    }
    function colonnes() {
      var l = [];
      do {
        garde();
        var c = { d: i }, x = jt();
        if (x.t === "mot" && x.v.charAt(0) === "@" && x.v.charAt(1) !== "@" && AFFECTATIONS[h(1)] && jt(1).t === "op") {
          avance(); c.variable = x.v; c.op = avance().v; c.e = expr();
        } else if ((x.t === "nom" || (x.t === "mot" && !RESERVES[x.h] && x.v.charAt(0) !== "@")) && h(1) === "=" && jt(1).t === "op") {
          i += 2; c.alias = x.v; c.e = expr(); c.formeEgal = true;
        } else {
          c.e = expr();
          if (prendre("AS")) {
            var a = jt();
            if (a.t === "mot" || a.t === "nom" || a.t === "texte") { avance(); c.alias = a.v; } else echec("nom attendu après AS");
          } else if (aliasPossible()) c.alias = avance().v;
          if (c.e.t === "etoile" && (est("EXCLUDE") || est("EXCEPT")) && h(1) === "(") {
            i += 2; c.sauf = [ident()]; while (prendre(",")) c.sauf.push(ident()); exiger(")");
          }
        }
        c.f = i;
        c.src = texte(c.d, c.f);
        l.push(c);
      } while (prendre(","));
      return l;
    }
    function cibleInto() {
      var x = jt();
      if ((x.t === "mot" && x.v.charAt(0) === "@") || x.t === "param" || (x.t === "mot" && variables[x.h])) {
        var vars = [avance().v];
        while (prendre(",")) vars.push(avance().v);
        return { variables: vars };
      }
      if (est("OUTFILE") || est("DUMPFILE")) {
        avance(); var fic = avance().v;
        while (!estFin() && !est("FROM") && !est(";")) avance();
        return { fichier: fic };
      }
      return { table: nomQualifie() };
    }
    function sources() {
      var l = [source()];
      while (est(",")) { garde(); avance(); var s = source(); s.virgule = true; l.push(s); }
      return l;
    }
    function source() {
      var s = { premiere: sourcePrimaire(), jointures: [] };
      for (;;) { garde(); var j = jointure(); if (!j) break; s.jointures.push(j); }
      return s;
    }
    function jointure() {
      var type = null, naturel = false;
      if (est("NATURAL")) { avance(); naturel = true; }
      if (est("JOIN")) type = "INNER";
      else if (est("INNER")) { avance(); type = "INNER"; }
      else if ((est("LEFT") || est("RIGHT") || est("FULL")) && (h(1) === "JOIN" || h(1) === "OUTER" || /^(HASH|MERGE|LOOP|REMOTE)$/.test(h(1)))) { type = avance().h; prendre("OUTER"); }
      else if (est("CROSS") && h(1) === "JOIN") { avance(); type = "CROSS"; }
      else if ((est("CROSS") || est("OUTER")) && h(1) === "APPLY") { var ta = avance().h + " APPLY"; avance(); return { type: ta, source: sourcePrimaire() }; }
      else if (est("STRAIGHT_JOIN")) { avance(); var sj = { type: "INNER", source: sourcePrimaire() }; if (prendre("ON")) sj.on = expr(); return sj; }
      if (!type) { if (naturel) echec("JOIN attendu"); return null; }
      if (/^(HASH|MERGE|LOOP|REMOTE)$/.test(h())) avance();
      exiger("JOIN");
      var j = { type: type, naturel: naturel, source: sourcePrimaire() };
      if (prendre("ON")) j.on = expr();
      else if (prendre("USING")) { exiger("("); j.using = [ident()]; while (prendre(",")) j.using.push(ident()); exiger(")"); }
      return j;
    }
    function parentheseIndice() { return est("(") && jt(1).t === "mot" && INDICES_TABLE[h(1)] && (h(2) === ")" || h(2) === "," || h(2) === "("); }
    function aliasSourcePossible() {
      var x = jt();
      if (x.t === "nom") return true;
      if (x.t !== "mot" || RESERVES[x.h] || x.v.charAt(0) === "@" || estGo()) return false;
      if ((x.h === "AT" || x.h === "BEFORE" || x.h === "CHANGES") && h(1) === "(") return false;
      return true;
    }
    function sauterParentheses() {        // ( … ) équilibrées
      exiger("(");
      var p = 1;
      while (p > 0 && !estFin()) { garde(); var y = avance(); if (y.t === "op" && y.v === "(") p++; else if (y.t === "op" && y.v === ")") p--; }
    }
    function sourcePrimaire() {
      garde();
      var s = { d: i };
      if (prendre("LATERAL")) s.lateral = true;
      var x = jt();
      if (x.t === "op" && x.v === "(") {
        if (debutRequete()) { avance(); s.req = requeteComplete(); exiger(")"); }
        else if (h(1) === "VALUES") { i += 2; s.valeurs = lignesValeurs(); exiger(")"); }
        else { avance(); s.groupe = sources(); exiger(")"); }
      } else if (x.t === "mot" && x.h === "TABLE" && h(1) === "(") {
        i += 2; s.fonction = expr(); exiger(")");
      } else if (x.t === "mot" || x.t === "nom") {
        var d0 = i, nq = nomQualifie();
        if (est("(") && x.v.charAt(0) !== "@" && !parentheseIndice()) { i = d0; s.fonction = nomOuAppel(); }
        else s.table = nq;
      } else echec("table attendue");
      for (;;) {
        garde();
        if ((est("AT") || est("BEFORE")) && h(1) === "(") {
          var tt = { genre: avance().h }; avance();
          tt.cle = avance().h; exiger("=>"); tt.e = expr(); exiger(")");
          s.voyage = tt; continue;
        }
        if (est("CHANGES") && h(1) === "(") inconnu();
        if (estMots(["FOR", "SYSTEM_TIME"])) { i += 2; if (prendreMots(["AS", "OF"])) { s.temporel = addition(); continue; } inconnu(); }
        break;
      }
      if (s.fonction && s.fonction.t === "fn" && s.fonction.nom === "OPENJSON" && est("WITH") && h(1) === "(") {
        i += 2;
        s.schemaJson = [];
        do {
          garde();
          var cj = { nom: ident(), type: typeDonnee() };
          if (jt().t === "texte") cj.chemin = avance().v;
          if (prendreMots(["AS", "JSON"])) cj.json = true;
          s.schemaJson.push(cj);
        } while (prendre(","));
        exiger(")");
      }
      if (prendre("AS")) {
        var a = jt();
        if (a.t === "mot" || a.t === "nom" || a.t === "texte") { avance(); s.alias = a.v; } else echec("nom attendu après AS");
      } else if (aliasSourcePossible()) s.alias = avance().v;
      if (est("(") && !parentheseIndice() && (s.req || s.valeurs || s.fonction)) { avance(); s.colonnes = [ident()]; while (prendre(",")) s.colonnes.push(ident()); exiger(")"); }
      if ((est("WITH") && h(1) === "(" && INDICES_TABLE[h(2)]) || parentheseIndice()) {
        prendre("WITH");
        var dI = i; sauterParentheses();
        s.indices = texte(dI, i).toUpperCase();
      }
      while ((est("USE") || est("FORCE") || est("IGNORE")) && (h(1) === "INDEX" || h(1) === "KEY")) {
        i += 2;
        if (prendre("FOR")) { avance(); prendre("BY"); }
        sauterParentheses();
      }
      if (est("PIVOT") || est("UNPIVOT") || est("MATCH_RECOGNIZE") || est("TABLESAMPLE") || (est("SAMPLE") && h(1) === "(")) inconnu();
      s.f = i;
      return s;
    }
    function lignesValeurs() {             // après VALUES : (…), (…)
      var lignes = [];
      do {
        garde();
        prendre("ROW");
        exiger("(");
        var l = [];
        if (!est(")")) { do { garde(); l.push(expr()); } while (prendre(",")); }
        exiger(")");
        lignes.push(l);
      } while (prendre(","));
      return lignes;
    }
    function finClause(k) {
      var x = jt(k);
      return x.t === "fin" || (x.t === "op" && (x.v === ";" || x.v === ")")) || (x.t === "mot" && RESERVES[x.h]);
    }
    function groupeBy() {
      var g = { elements: [] };
      if (est("ALL") && finClause(1)) { avance(); g.tout = true; return g; }
      if (est("ALL")) inconnu();
      do {
        garde();
        if ((est("ROLLUP") || est("CUBE")) && h(1) === "(") {
          var k = avance().h; avance();
          var l = [];
          if (!est(")")) { do { garde(); l.push(expr()); } while (prendre(",")); }
          exiger(")");
          g.elements.push({ t: k, liste: l });
        } else if (estMots(["GROUPING", "SETS"])) {
          i += 2; exiger("(");
          var sets = [];
          do {
            garde();
            if (est("(") && h(1) === ")") { i += 2; sets.push([]); }
            else if ((est("ROLLUP") || est("CUBE")) && h(1) === "(") inconnu();
            else { var e = expr(); sets.push(e.t === "tuple" ? e.liste : [e]); }
          } while (prendre(","));
          exiger(")");
          g.elements.push({ t: "SETS", sets: sets });
        } else if (est("(") && h(1) === ")") { i += 2; g.elements.push({ t: "SETS", sets: [[]] }); }
        else g.elements.push({ t: "expr", e: expr() });
      } while (prendre(","));
      if (prendreMots(["WITH", "ROLLUP"])) g.avecRollup = true;
      else if (prendreMots(["WITH", "CUBE"])) g.avecCube = true;
      return g;
    }
    function finRequete(r) {
      if (prendreMots(["ORDER", "BY"])) r.tri = listeTri();
      if (prendre("LIMIT")) {
        var a = expr();
        if (prendre(",")) r.limite = { saut: a, n: expr(), virgule: true };
        else { r.limite = { n: a }; if (prendre("OFFSET")) r.limite.saut = expr(); }
      }
      if (prendre("OFFSET")) {
        r.limite = r.limite || {};
        r.limite.saut = expr();
        if (!prendre("ROWS")) prendre("ROW");
      }
      if (prendre("FETCH")) {
        if (!prendre("FIRST")) prendre("NEXT");
        r.limite = r.limite || {};
        r.limite.n = est("ROW") || est("ROWS") ? { t: "nombre", v: "1" } : expr();
        if (prendre("PERCENT")) r.limite.pourcent = true;
        if (!prendre("ROWS")) prendre("ROW");
        if (!prendre("ONLY") && prendreMots(["WITH", "TIES"])) r.limite.exaequo = true;
        r.limite.fetch = true;
      }
      if (prendre("INTO")) r.into = cibleInto();
      if (est("FOR") && (h(1) === "XML" || h(1) === "JSON" || h(1) === "BROWSE")) {
        avance();
        var genre = avance().h, d = i, p = 0;
        while (!estFin()) {
          garde();
          var x = jt();
          if (x.t === "op" && x.v === "(") p++;
          else if (x.t === "op" && x.v === ")") { if (p === 0) break; p--; }
          else if (p === 0 && ((x.t === "op" && x.v === ";") || (x.t === "mot" && (x.nl && DEBUTS[x.h] || /^(UNION|EXCEPT|INTERSECT|ORDER|OPTION)$/.test(x.h))))) break;
          avance();
        }
        r.pour = { genre: genre, texte: texte(d, i) };
      }
      if (est("FOR") && (h(1) === "UPDATE" || h(1) === "SHARE")) {
        i += 2; r.verrou = true;
        if (prendre("OF")) { nomQualifie(); while (prendre(",")) nomQualifie(); }
        prendre("NOWAIT"); prendreMots(["SKIP", "LOCKED"]);
      }
      if (prendreMots(["LOCK", "IN", "SHARE", "MODE"])) r.verrou = true;
      if (est("OPTION") && h(1) === "(") { avance(); var dO = i; sauterParentheses(); r.options = texte(dO + 1, i - 1); }
    }
    function ctes() {
      exiger("WITH");
      var rec = prendre("RECURSIVE"), l = [];
      do {
        garde();
        var c = { nom: ident(), recursif: rec };
        if (est("(")) { avance(); c.colonnes = [ident()]; while (prendre(",")) c.colonnes.push(ident()); exiger(")"); }
        exiger("AS");
        if (!prendre("MATERIALIZED")) prendreMots(["NOT", "MATERIALIZED"]);
        exiger("(");
        c.req = requeteComplete();
        exiger(")");
        l.push(c);
      } while (prendre(","));
      return l;
    }

    // --- Instructions ---
    // Le mot k commence-t-il vraiment une instruction ? (« WITH ( », « START WITH » sont des clauses, pas des instructions)
    function debutPlausible(k) {
      var x = jt(k), s1 = jt(k + 1);
      if (x.h === "WITH") return s1.h === "RECURSIVE" || s1.t === "nom" || (s1.t === "mot" && !RESERVES[s1.h]);
      if (x.h === "START") return s1.h === "TRANSACTION";
      if (x.h === "SET") return s1.t === "mot" || s1.t === "nom" || s1.t === "param";
      if (x.h === "VALUES") return s1.t === "op" && s1.v === "(";
      if (x.h === "FETCH") return s1.t === "mot" || s1.t === "nom";
      return true;
    }
    function finInstructionOk() {
      var x = jt();
      if (x.t === "fin" || (x.t === "inconnu" && x.nl)) return true;
      if (x.t === "op" && (x.v === ";" || (x.v === "(" && debutRequete()))) return true;
      if (x.t === "mot" && DEBUTS[x.h]) return debutPlausible(0);
      if (x.t === "mot" && /^(END|ELSE|ELSEIF|ELSIF|WHEN|EXCEPTION|UNTIL)$/.test(x.h)) return true;
      return estGo();
    }
    function instructionSure(dansBloc) {
      var d = i;
      try {
        var s = instruction();
        if (!finInstructionOk()) { if (jt().t === "inconnu" || (jt().t === "mot" && DEBUTS[h()])) inconnu(); echec("fin de l'instruction attendue"); }
        return s;
      } catch (e) {
        if (!e || !e.lecture) throw e;
        var err = { t: "erreur", inconnu: !!e.inconnu, i: Math.max(e.i, d), d: d };
        err.surFin = J[Math.min(err.i, J.length - 1)].t === "fin";
        err.message = messageErreur(err);
        resynchroniser(d, dansBloc || e.inconnu);
        err.f = i;
        return err;
      }
    }
    // Après une erreur : aller au « ; » suivant (ou au GO, ou à la fin). Dans un bloc, ou après une instruction
    // inconnue : aussi au début d'une ligne qui commence une autre instruction.
    function resynchroniser(d, souple) {
      if (i <= d) i = d + 1;
      if (i > J.length - 1) i = J.length - 1;
      var p = 0;
      while (!estFin()) {
        garde();
        var x = jt();
        if (x.t === "op" && x.v === "(") p++;
        else if (x.t === "op" && x.v === ")") { if (p > 0) p--; }
        else if (p === 0 && x.t === "op" && x.v === ";") { avance(); return; }
        if (estGo()) return;
        if (souple && p === 0 && x.nl && x.t === "mot" && ((DEBUTS[x.h] && !/^(SELECT|WITH|VALUES)$/.test(x.h)) || x.h === "END" || x.h === "ELSE")) return;
        avance();
      }
    }
    function extrait(k) {
      var fin = J[k].d + 200;
      for (var m = k + 1; m < J.length; m++) if (J[m].t === "op" && J[m].v === ";") { fin = Math.min(fin, J[m].d); break; }
      return court(src.slice(J[k].d, fin), 60);
    }
    function messageErreur(err) {
      var k = Math.min(err.i, J.length - 1);
      if (err.inconnu) return "Je ne sais pas encore traduire : " + extrait(J[k].t === "fin" ? err.d : k);
      var finTexte = J[k].t === "fin" || (J[k].t === "op" && J[k].v === ";");
      if (!finTexte) return "Je n'arrive pas à lire la requête à partir de : " + extrait(k);
      var ouvertes = [];
      for (var x = err.d; x < k; x++) {
        if (J[x].t === "op" && J[x].v === "(") ouvertes.push(x);
        else if (J[x].t === "op" && J[x].v === ")") ouvertes.pop();
      }
      if (ouvertes.length) return "Je n'arrive pas à lire la requête à partir de : " + extrait(ouvertes[ouvertes.length - 1]) + " (une parenthèse ouverte n'est jamais fermée)";
      var debut = J[Math.min(err.d, J.length - 1)].d, fin = J[Math.max(k - 1, 0)].f, t = compact(src.slice(debut, Math.max(fin, debut)));
      return "Je n'arrive pas à lire la requête à partir de : la fin " + (J[k].t === "fin" ? "du texte" : "de l'instruction") +
        " (la requête s'arrête trop tôt, après « " + (t.length > 40 ? "…" + t.slice(-40) : t) + " »)";
    }
    function bloc(arret) {
      var l = [];
      while (!estFin() && !arret()) {
        garde();
        if (prendre(";")) continue;
        if (estGo()) break;
        l.push(instructionSure(true));
      }
      return l;
    }
    function instruction() {
      garde();
      var d = i, x = jt(), m = h(), s = null;
      if (x.t === "inconnu") inconnu();
      if (x.t === "op" && x.v === "(" && debutRequete()) s = requeteComplete();
      else if (x.t !== "mot") echec("instruction attendue");
      else if (h(1) === ":=" ) { var cib = avance().v; avance(); s = { t: "set", affs: [{ cible: cib, op: "=", val: expr() }] }; }
      else switch (m) {
        case "SELECT": case "VALUES": s = requeteComplete(); break;
        case "WITH": s = instrAvec(); break;
        case "INSERT": s = instrInsert(false); break;
        case "REPLACE": if (h(1) === "INTO" || jt(1).t === "mot" || jt(1).t === "nom") s = instrInsert(true); else echec("instruction attendue"); break;
        case "UPDATE": s = instrUpdate(); break;
        case "DELETE": s = instrDelete(); break;
        case "MERGE": s = instrMerge(); break;
        case "TRUNCATE": avance(); prendre("TABLE"); s = { t: "truncate", siExiste: prendreMots(["IF", "EXISTS"]) }; s.table = nomQualifie().texte; break;
        case "CREATE": s = instrCreate(); break;
        case "ALTER": s = instrAlter(); break;
        case "DROP": s = instrDrop(); break;
        case "UNDROP": avance(); s = { t: "undrop", objet: avance().h }; s.nom = nomQualifie().texte; break;
        case "DECLARE": s = instrDeclare(); break;
        case "SET": s = instrSet(); break;
        case "LET": avance(); s = instrLet(); break;
        case "IF": s = instrIf(); break;
        case "WHILE": s = instrWhile(); break;
        case "BEGIN": s = instrBegin(); break;
        case "START":
          if (h(1) !== "TRANSACTION") echec("instruction attendue");
          i += 2;
          while (/^(READ|ONLY|WRITE|WITH|CONSISTENT|SNAPSHOT)$/.test(h()) || est(",")) avance();
          s = { t: "tran", action: "debut" }; break;
        case "COMMIT": case "ROLLBACK": s = instrFinTran(); break;
        case "SAVE": case "SAVEPOINT": case "RELEASE": s = instrPoint(); break;
        case "THROW": s = instrThrow(); break;
        case "RAISERROR": s = instrRaiserror(); break;
        case "SIGNAL": case "RESIGNAL": s = instrSignal(); break;
        case "EXEC": case "EXECUTE": case "CALL": s = instrExec(); break;
        case "PRINT": avance(); s = { t: "print", e: expr() }; break;
        case "RETURN": s = instrReturn(); break;
        case "BREAK": case "LEAVE": avance(); if (jt().t === "mot" && !jt().nl && !DEBUTS[h()]) avance(); s = { t: "sortir" }; break;
        case "CONTINUE": case "ITERATE": avance(); if (jt().t === "mot" && !jt().nl && !DEBUTS[h()]) avance(); s = { t: "suivant" }; break;
        case "OPEN": avance(); s = { t: "curseur", action: "ouvrir", nom: ident() }; break;
        case "CLOSE": avance(); s = { t: "curseur", action: "fermer", nom: ident() }; break;
        case "DEALLOCATE": avance(); if (prendre("PREPARE")) { s = { t: "curseur", action: "liberer-prep", nom: ident() }; break; } s = { t: "curseur", action: "liberer", nom: ident() }; break;
        case "FETCH": s = instrFetch(); break;
        case "USE": s = instrUse(); break;
        case "WAITFOR": avance(); s = { t: "attendre", genre: avance().h, e: expr() }; break;
        default:
          if (NON_TRADUITES[m]) inconnu();
          echec("instruction attendue");
      }
      s.d = d; s.f = i;
      return s;
    }
    function instrAvec() {
      var d = i, avec = ctes(), s;
      if (est("SELECT") || est("(") || est("VALUES")) { s = { t: "requete", d: d, avec: avec }; s.corps = operations(); finRequete(s); return s; }
      if (est("INSERT")) s = instrInsert(false);
      else if (est("UPDATE")) s = instrUpdate();
      else if (est("DELETE")) s = instrDelete();
      else if (est("MERGE")) s = instrMerge();
      else echec("SELECT attendu après WITH");
      s.avec = avec;
      return s;
    }
    function colsEntreParentheses() {
      exiger("(");
      var l = [];
      do {
        garde();
        l.push(ident());
        if (est("(") && jt(1).t === "nombre") { i += 2; exiger(")"); }
        if (!prendre("ASC")) prendre("DESC");
      } while (prendre(","));
      exiger(")");
      return l;
    }
    function sortieOutput() {
      avance();
      var o = { colonnes: colonnes() };
      if (prendre("INTO")) { o.into = nomQualifie().texte; if (est("(")) o.intoCols = colsEntreParentheses(); }
      return o;
    }
    function affectations() {
      var l = [];
      do {
        garde();
        if (est("(")) inconnu();
        var nq = nomQualifie(), op = jt();
        if (op.t !== "op" || !AFFECTATIONS[op.v] || op.v === ":=") echec("= attendu");
        avance();
        l.push({ cible: nq.texte, op: op.v, val: expr() });
      } while (prendre(","));
      return l;
    }
    function instrInsert(remplacer) {
      avance();
      var s = { t: "insert", remplacer: remplacer };
      for (;;) {
        garde();
        if (est("IGNORE")) { avance(); s.ignorer = true; continue; }
        if (est("LOW_PRIORITY") || est("DELAYED") || est("HIGH_PRIORITY")) { avance(); continue; }
        break;
      }
      if (prendre("OVERWRITE")) s.ecraser = true;
      if ((est("ALL") || est("FIRST")) && !remplacer) inconnu();
      if (prendre("TOP")) s.top = top();
      prendre("INTO");
      s.table = nomQualifie();
      if (est("WITH") && h(1) === "(") { avance(); sauterParentheses(); }
      if (est("(") && !debutRequete()) s.colonnes = colsEntreParentheses();
      if (est("OUTPUT")) s.output = sortieOutput();
      if (prendre("VALUES") || prendre("VALUE")) {
        s.lignes = lignesValeurs();
        if (prendre("AS")) { s.aliasLignes = ident(); if (est("(")) s.colsAlias = colsEntreParentheses(); }
      }
      else if (prendreMots(["DEFAULT", "VALUES"])) s.defaut = true;
      else if (debutRequete()) s.req = requeteComplete();
      else if (prendre("SET")) s.set = affectations();
      else if (est("EXEC") || est("EXECUTE")) s.exec = instrExec();
      else echec("VALUES ou SELECT attendu");
      if (prendreMots(["ON", "DUPLICATE", "KEY", "UPDATE"])) s.doublon = affectations();
      return s;
    }
    function instrUpdate() {
      avance();
      var s = { t: "update" };
      while (est("LOW_PRIORITY") || est("IGNORE")) avance();
      if (prendre("TOP")) s.top = top();
      s.cible = source();
      exiger("SET");
      s.set = affectations();
      if (est("OUTPUT")) s.output = sortieOutput();
      if (prendre("FROM")) s.from = sources();
      if (prendre("WHERE")) { if (prendreMots(["CURRENT", "OF"])) s.courant = ident(); else s.where = expr(); }
      if (prendreMots(["ORDER", "BY"])) s.tri = listeTri();
      if (prendre("LIMIT")) s.limite = { n: expr() };
      if (est("OPTION") && h(1) === "(") { avance(); sauterParentheses(); }
      return s;
    }
    function instrDelete() {
      avance();
      var s = { t: "delete" };
      while (est("LOW_PRIORITY") || est("QUICK") || est("IGNORE")) avance();
      if (prendre("TOP")) s.top = top();
      if (prendre("FROM")) {
        s.cible = sourcePrimaire();
        if (est(",")) { s.cibles = [s.cible.table ? s.cible.table.texte : "?"]; while (prendre(",")) s.cibles.push(nomQualifie().texte); }
      } else {
        s.cibles = [];
        do { garde(); var nq = nomQualifie(); if (est(".") && h(1) === "*") i += 2; s.cibles.push(nq.texte); } while (prendre(","));
        exiger("FROM");
        s.from = sources();
      }
      if (est("OUTPUT")) s.output = sortieOutput();
      if (!s.from) { if (prendre("FROM")) s.from = sources(); else if (prendre("USING")) s.using = sources(); }
      if (est("OUTPUT")) s.output = sortieOutput();
      if (prendre("WHERE")) { if (prendreMots(["CURRENT", "OF"])) s.courant = ident(); else s.where = expr(); }
      if (prendreMots(["ORDER", "BY"])) s.tri = listeTri();
      if (prendre("LIMIT")) s.limite = { n: expr() };
      if (est("OPTION") && h(1) === "(") { avance(); sauterParentheses(); }
      return s;
    }
    function instrMerge() {
      avance();
      var s = { t: "merge", quand: [] };
      if (prendre("TOP")) s.top = top();
      prendre("INTO");
      s.cible = sourcePrimaire();
      exiger("USING");
      s.source = sourcePrimaire();
      exiger("ON");
      s.on = expr();
      while (est("WHEN")) {
        garde(); avance();
        var w = {};
        if (prendre("MATCHED")) w.genre = "existe";
        else {
          exiger("NOT"); exiger("MATCHED"); w.genre = "absent";
          if (prendreMots(["BY", "SOURCE"])) w.genre = "absentSource"; else prendreMots(["BY", "TARGET"]);
        }
        if (prendre("AND")) w.cond = expr();
        exiger("THEN");
        if (prendre("DELETE")) w.action = "supprimer";
        else if (prendre("UPDATE")) { exiger("SET"); w.action = "modifier"; w.set = affectations(); }
        else if (prendre("INSERT")) {
          w.action = "ajouter";
          if (est("(")) w.colonnes = colsEntreParentheses();
          if (prendreMots(["DEFAULT", "VALUES"])) w.defaut = true;
          else { exiger("VALUES"); w.valeurs = lignesValeurs()[0]; }
        }
        else echec("DELETE, UPDATE ou INSERT attendu");
        s.quand.push(w);
      }
      if (est("OUTPUT")) s.output = sortieOutput();
      if (est("OPTION") && h(1) === "(") { avance(); sauterParentheses(); }
      return s;
    }
    // Saute la fin d'une instruction qu'on ne détaille pas (options de table…), sans dépasser l'instruction suivante.
    function sauterOptions(arret) {
      var p = 0;
      while (!estFin()) {
        garde();
        var x = jt();
        if (p === 0 && arret && arret()) return;
        if (x.t === "op" && x.v === "(") p++;
        else if (x.t === "op" && x.v === ")") { if (p === 0) return; p--; }
        else if (p === 0 && x.t === "op" && x.v === ";") return;
        else if (p === 0 && estGo()) return;
        else if (p === 0 && x.nl && x.t === "mot" && DEBUTS[x.h] && !(x.h === "WITH" && h(1) === "(")) return;
        avance();
      }
    }
    function instrCreate() {
      avance();
      var s = { mods: [] };
      if (prendreMots(["OR", "REPLACE"])) s.ouRemplacer = true;
      else if (prendreMots(["OR", "ALTER"])) s.ouModifier = true;
      for (;;) {
        garde();
        if (/^(TEMPORARY|TEMP|TRANSIENT|VOLATILE|SECURE|MATERIALIZED|UNIQUE|CLUSTERED|NONCLUSTERED|RECURSIVE|LOCAL|GLOBAL|COLUMNSTORE)$/.test(h())) { s.mods.push(avance().h); continue; }
        if ((est("DEFINER") || est("ALGORITHM")) && h(1) === "=") { i += 3; if (est("@")) i += 2; continue; }
        if (estMots(["SQL", "SECURITY"])) { i += 3; continue; }
        break;
      }
      if (est("TABLE")) return createTable(s);
      if (est("VIEW")) return createView(s);
      if (est("PROCEDURE") || est("PROC")) return createRoutine(s, "procedure");
      if (est("FUNCTION")) return createRoutine(s, "fonction");
      if (est("INDEX")) return createIndex(s);
      if (est("SCHEMA") || est("DATABASE") || est("SEQUENCE")) {
        s.t = "create-objet"; s.objet = avance().h;
        s.siAbsent = prendreMots(["IF", "NOT", "EXISTS"]);
        s.nom = nomQualifie().texte;
        sauterOptions();
        return s;
      }
      inconnu();
    }
    function createTable(s) {
      avance();
      s.t = "create-table";
      s.siAbsent = prendreMots(["IF", "NOT", "EXISTS"]);
      s.nom = nomQualifie().texte;
      if (prendre("LIKE")) { s.comme = nomQualifie().texte; return s; }
      if (prendre("CLONE")) {
        s.clone = nomQualifie().texte;
        if ((est("AT") || est("BEFORE")) && h(1) === "(") { avance(); sauterParentheses(); s.cloneVoyage = true; }
        return s;
      }
      if (est("(") && !debutRequete()) s.colonnes = definitionTable();
      sauterOptions(function () { return est("AS") || (est("SELECT") || (est("(") && debutRequete())); });
      if (prendre("AS") || debutRequete()) { s.req = requeteComplete(); sauterOptions(); }
      return s;
    }
    function definitionTable() {
      exiger("(");
      var l = [];
      do {
        garde();
        if (/^(CONSTRAINT|PRIMARY|FOREIGN|UNIQUE|CHECK|INDEX|KEY|FULLTEXT)$/.test(h())) l.push(contrainteTable());
        else l.push(definitionColonne());
      } while (prendre(","));
      exiger(")");
      return l;
    }
    function definitionColonne() {
      var c = { t: "colonne", nom: ident() };
      if (est("AS") && !TYPES_SQL[h(1)]) { avance(); c.calcul = expr(); prendre("PERSISTED"); }
      else c.type = typeDonnee();
      for (;;) {
        garde();
        if (prendreMots(["NOT", "NULL"])) { c.obligatoire = true; continue; }
        if (prendre("NULL")) { c.nullable = true; continue; }
        if (prendre("CONSTRAINT")) { ident(); continue; }
        if (prendreMots(["PRIMARY", "KEY"])) { c.cle = true; if (!prendre("CLUSTERED")) prendre("NONCLUSTERED"); if (!prendre("ASC")) prendre("DESC"); continue; }
        if (prendre("UNIQUE")) { c.unique = true; prendre("KEY"); if (!prendre("CLUSTERED")) prendre("NONCLUSTERED"); continue; }
        if (prendre("DEFAULT")) { c.defaut = unaire(); continue; }
        if (est("IDENTITY") || est("AUTO_INCREMENT") || est("AUTOINCREMENT")) {
          avance(); c.auto = true;
          if (est("(")) { avance(); c.autoDebut = avance().v; if (prendre(",")) c.autoPas = avance().v; exiger(")"); }
          if (prendre("START")) { c.autoDebut = avance().v; if (prendre("INCREMENT")) c.autoPas = avance().v; }
          continue;
        }
        if (prendre("REFERENCES")) { c.ref = nomQualifie().texte; if (est("(")) c.refCols = colsEntreParentheses(); actionsRef(c); continue; }
        if (prendre("CHECK")) { exiger("("); c.check = expr(); exiger(")"); continue; }
        if (prendre("COLLATE")) { avance(); continue; }
        if (prendre("COMMENT")) { prendre("="); avance(); continue; }
        if (est("GENERATED") || (est("AS") && h(1) === "(")) { avance(); while (!est("(") && !estFin() && !est(",") && !est(")")) avance(); if (est("(")) sauterParentheses(); prendre("STORED"); prendre("VIRTUAL"); continue; }
        if (estMots(["ON", "UPDATE"])) { i += 2; avance(); if (est("(") && h(1) === ")") i += 2; continue; }
        if (estMots(["CHARACTER", "SET"])) { i += 3; continue; }
        if (/^(UNSIGNED|SPARSE|ROWGUIDCOL|FILESTREAM|PERSISTED|ZEROFILL)$/.test(h())) { avance(); continue; }
        break;
      }
      return c;
    }
    function actionsRef(c) {
      for (;;) {
        garde();
        if (prendreMots(["ON", "DELETE"])) { c.surSuppr = lireAction(); continue; }
        if (prendreMots(["ON", "UPDATE"])) { c.surModif = lireAction(); continue; }
        if (prendreMots(["NOT", "FOR", "REPLICATION"])) continue;
        break;
      }
    }
    function lireAction() {
      if (prendre("CASCADE")) return "CASCADE";
      if (prendreMots(["SET", "NULL"])) return "SET NULL";
      if (prendreMots(["SET", "DEFAULT"])) return "SET DEFAULT";
      if (prendreMots(["NO", "ACTION"])) return "NO ACTION";
      if (prendre("RESTRICT")) return "RESTRICT";
      echec("action attendue");
    }
    function contrainteTable() {
      var c = { t: "contrainte" };
      if (prendre("CONSTRAINT")) c.nom = ident();
      if (prendreMots(["PRIMARY", "KEY"])) { c.genre = "cle"; if (!prendre("CLUSTERED")) prendre("NONCLUSTERED"); c.cols = colsEntreParentheses(); }
      else if (prendreMots(["FOREIGN", "KEY"])) {
        c.genre = "etrangere"; c.cols = colsEntreParentheses();
        exiger("REFERENCES"); c.ref = nomQualifie().texte;
        if (est("(")) c.refCols = colsEntreParentheses();
        actionsRef(c);
      }
      else if (prendre("UNIQUE")) {
        c.genre = "unique";
        if (!prendre("KEY")) prendre("INDEX");
        if (!prendre("CLUSTERED")) prendre("NONCLUSTERED");
        if (!est("(")) ident();
        c.cols = colsEntreParentheses();
      }
      else if (prendre("CHECK")) { c.genre = "check"; exiger("("); c.check = expr(); exiger(")"); }
      else if (est("INDEX") || est("KEY") || est("FULLTEXT")) { avance(); if (!prendre("KEY")) prendre("INDEX"); c.genre = "index"; if (!est("(")) c.nomIndex = ident(); c.cols = colsEntreParentheses(); }
      else echec("contrainte attendue");
      if (est("WITH") && h(1) === "(") { avance(); sauterParentheses(); }
      if (est("ON") && h(1) !== "DELETE" && h(1) !== "UPDATE") { avance(); avance(); }
      return c;
    }
    function createView(s) {
      avance();
      s.t = "create-view";
      s.siAbsent = prendreMots(["IF", "NOT", "EXISTS"]);
      s.nom = nomQualifie().texte;
      if (est("(")) s.colonnes = colsEntreParentheses();
      while (!est("AS") && !estFin()) { garde(); avance(); }
      exiger("AS");
      s.req = requeteComplete();
      if (prendreMots(["WITH", "CHECK", "OPTION"])) s.verifie = true;
      return s;
    }
    function parametres() {
      var l = [], par = prendre("(");
      if (par && prendre(")")) return l;
      if (!par && !(jt().t === "mot" && jt().v.charAt(0) === "@")) return l;
      do {
        garde();
        var p = {};
        if (est("IN") || est("OUT") || est("INOUT")) p.mode = avance().h;
        p.nom = ident();
        prendre("AS");
        p.type = typeDonnee();
        prendre("VARYING");
        if (prendre("=") || prendre("DEFAULT")) p.defaut = unaire();
        for (;;) {
          garde();
          if (prendre("OUTPUT") || prendre("OUT")) { p.sortie = true; continue; }
          if (prendre("READONLY")) continue;
          if (prendreMots(["NOT", "NULL"])) continue;
          break;
        }
        l.push(p);
      } while (prendre(","));
      if (par) exiger(")");
      return l;
    }
    function typeRetour() {
      if (jt().t === "mot" && jt().v.charAt(0) === "@" && h(1) === "TABLE") { var v = avance().v; avance(); return { variable: v, colonnes: definitionTable() }; }
      if (est("TABLE")) { avance(); return { table: true, colonnes: est("(") ? definitionTable() : null }; }
      var t = typeDonnee();
      prendreMots(["NOT", "NULL"]);
      return { type: t };
    }
    // Procédure ou fonction. T-SQL : le corps va jusqu'au GO (ou la fin du texte). MySQL : une seule instruction
    // (souvent BEGIN … END). Snowflake : AS $$ … $$ (le corps est un texte).
    function createRoutine(s, genre) {
      avance();
      s.t = "create-routine"; s.genre = genre;
      s.nom = nomQualifie().texte;
      s.params = parametres();
      for (;;) {
        garde();
        if (estFin() || est("AS") || est("BEGIN") || estGo() || est(";")) break;
        if (est("RETURN") && genre === "fonction") break;
        if (prendre("RETURNS")) { s.retour = typeRetour(); continue; }
        if (prendre("LANGUAGE")) { s.langage = avance().h; continue; }
        if (estMots(["EXECUTE", "AS"])) { i += 3; continue; }
        if (est("WITH") && h(1) !== "(") { avance(); while (jt().t === "mot" && !est("AS") && !est("BEGIN")) { if (estMots(["EXECUTE", "AS"])) { i += 3; } else avance(); if (!prendre(",")) break; } continue; }
        avance();
      }
      var as = prendre("AS");
      if (as && jt().t === "texte") { s.corpsTexte = avance(); return s; }
      if (as && !s.retour && !s.langage) { s.lot = true; s.corps = bloc(function () { return false; }); return s; }   // T-SQL
      if (as && genre === "fonction" && s.retour && !s.langage) { s.lot = true; s.corps = bloc(function () { return false; }); return s; }
      s.corps = [instructionSure(true)];
      return s;
    }
    function createIndex(s) {
      avance();
      s.t = "create-index";
      s.siAbsent = prendreMots(["IF", "NOT", "EXISTS"]);
      s.nom = ident();
      exiger("ON");
      s.table = nomQualifie().texte;
      s.cols = colsEntreParentheses();
      if (prendre("INCLUDE")) s.inclus = colsEntreParentheses();
      if (prendre("WHERE")) s.where = expr();
      sauterOptions();
      return s;
    }
    function instrAlter() {
      avance();
      if (est("TABLE")) return alterTable();
      if (est("PROCEDURE") || est("PROC") || est("FUNCTION")) { var s = { mods: [], alter: true }; return createRoutine(s, est("FUNCTION") ? "fonction" : "procedure"); }
      if (est("VIEW")) { var v = { mods: [], alter: true }; return createView(v); }
      inconnu();
    }
    function alterTable() {
      avance();
      var s = { t: "alter-table", actions: [] };
      prendreMots(["IF", "EXISTS"]);
      s.nom = nomQualifie().texte;
      if (est("WITH") && (h(1) === "CHECK" || h(1) === "NOCHECK")) i += 2;
      do {
        garde();
        var a = {};
        if (prendre("ADD")) {
          prendre("COLUMN");
          if (/^(CONSTRAINT|PRIMARY|FOREIGN|UNIQUE|CHECK|INDEX|KEY)$/.test(h())) { a.genre = "ajout-contrainte"; a.c = contrainteTable(); }
          else { a.genre = "ajout-colonne"; a.c = definitionColonne(); }
        } else if (prendre("DROP")) {
          if (prendre("COLUMN")) { prendreMots(["IF", "EXISTS"]); a.genre = "retrait-colonne"; a.nom = ident(); }
          else if (prendre("CONSTRAINT")) { prendreMots(["IF", "EXISTS"]); a.genre = "retrait-contrainte"; a.nom = ident(); }
          else if (prendreMots(["PRIMARY", "KEY"])) a.genre = "retrait-cle";
          else if (est("INDEX") || est("KEY") || est("FOREIGN")) inconnu();
          else { a.genre = "retrait-colonne"; a.nom = ident(); }
        } else if (prendre("ALTER") || prendre("MODIFY")) {
          prendre("COLUMN");
          a.genre = "modif-colonne"; a.nom = ident();
          if (prendreMots(["SET", "DATA", "TYPE"]) || prendre("TYPE")) a.type = typeDonnee();
          else if (prendreMots(["SET", "NOT", "NULL"])) a.obligatoire = true;
          else if (prendreMots(["DROP", "NOT", "NULL"])) a.nullable = true;
          else if (prendreMots(["SET", "DEFAULT"])) a.defaut = unaire();
          else if (prendreMots(["DROP", "DEFAULT"])) a.sansDefaut = true;
          else { a.type = typeDonnee(); if (prendreMots(["NOT", "NULL"])) a.obligatoire = true; else if (prendre("NULL")) a.nullable = true; }
        } else if (prendre("RENAME")) {
          if (prendre("COLUMN")) { a.genre = "renommer-colonne"; a.nom = ident(); exiger("TO"); a.nouveau = ident(); }
          else { if (!prendre("TO")) prendre("AS"); a.genre = "renommer-table"; a.nouveau = nomQualifie().texte; }
        } else inconnu();
        s.actions.push(a);
      } while (prendre(","));
      return s;
    }
    function instrDrop() {
      avance();
      var s = { t: "drop", temporaire: prendre("TEMPORARY") };
      if (!/^(TABLE|VIEW|PROCEDURE|PROC|FUNCTION|INDEX|SCHEMA|DATABASE|SEQUENCE|TRIGGER|STAGE)$/.test(h())) inconnu();
      s.objet = avance().h;
      s.siExiste = prendreMots(["IF", "EXISTS"]);
      s.noms = [nomQualifie().texte];
      while (prendre(",")) s.noms.push(nomQualifie().texte);
      if (s.objet === "INDEX" && prendre("ON")) s.surTable = nomQualifie().texte;
      if (!prendre("CASCADE")) prendre("RESTRICT");
      return s;
    }
    function instrDeclare() {
      avance();
      var vars = [];
      for (;;) {
        garde();
        if ((est("CONTINUE") || est("EXIT") || est("UNDO")) && h(1) === "HANDLER") {
          var gh = avance().h; avance(); exiger("FOR");
          var conds = [];
          do { garde(); var dc = i; if (prendre("SQLSTATE")) { prendre("VALUE"); avance(); } else if (!prendreMots(["NOT", "FOUND"])) avance(); conds.push(texte(dc, i)); } while (prendre(","));
          return { t: "handler", genre: gh, conds: conds, action: instructionSure(true) };
        }
        var x = jt();
        if (x.t !== "mot" && x.t !== "nom") echec("nom de variable attendu");
        avance();
        var noms = [x.v];
        while (est(",") && jt(1).t === "mot" && jt(1).v.charAt(0) !== "@" && !TYPES_SQL[h(1)]) { avance(); noms.push(avance().v); }   // MySQL : DECLARE a, b INT
        noms.forEach(function (nv) { variables[nv.toUpperCase()] = true; });
        var dO = i;
        while (/^(INSENSITIVE|SCROLL|NO|CURSOR|LOCAL|GLOBAL|FORWARD_ONLY|STATIC|KEYSET|DYNAMIC|FAST_FORWARD|READ_ONLY|SCROLL_LOCKS|OPTIMISTIC|TYPE_WARNING|SENSITIVE|ASENSITIVE)$/.test(h())) avance();
        if (texte(dO, i).toUpperCase().indexOf("CURSOR") >= 0) {
          var options = texte(dO, i).replace(/\s+/g, " ").replace(/^CURSOR\s*|\s*CURSOR$/i, "").replace(/\bCURSOR\b/i, "").trim();
          exiger("FOR");
          var rq = requeteComplete();
          if (est("FOR") && (h(1) === "UPDATE" || h(1) === "READ")) { i += 2; prendre("ONLY"); if (prendre("OF")) { ident(); while (prendre(",")) ident(); } }
          return { t: "declare", vars: [{ nom: x.v, curseur: rq, options: options }] };
        }
        i = dO;
        prendre("AS");
        var v = { nom: noms.join(", "), plusieurs: noms.length > 1 };
        if (prendre("TABLE")) v.table = definitionTable();
        else if (est("RESULTSET") || est("EXCEPTION")) inconnu();
        else {
          v.type = typeDonnee();
          if (prendre("=") || prendre("DEFAULT") || prendre(":=")) v.init = expr();
        }
        vars.push(v);
        if (prendre(",")) continue;
        // Snowflake : DECLARE a INT; b INT; BEGIN … (une section de déclarations)
        if (est(";") && jt(1).t === "mot" && jt(1).v.charAt(0) !== "@" && !DEBUTS[h(1)] && h(1) !== "END" && (jt(2).t === "mot" || jt(2).t === "nom")) { avance(); continue; }
        break;
      }
      return { t: "declare", vars: vars };
    }
    function instrSet() {
      avance();
      if (estMots(["TRANSACTION", "ISOLATION", "LEVEL"]) || ((est("SESSION") || est("GLOBAL")) && h(1) === "TRANSACTION")) {
        if (!prendre("SESSION")) prendre("GLOBAL");
        exigerMots(["TRANSACTION", "ISOLATION", "LEVEL"]);
        var dn = i;
        while (/^(READ|UNCOMMITTED|COMMITTED|REPEATABLE|SNAPSHOT|SERIALIZABLE)$/.test(h())) avance();
        return { t: "isolation", niveau: texte(dn, i).toUpperCase().replace(/\s+/g, " ") };
      }
      var x = jt();
      if (x.t === "mot" && OPTIONS_SET[x.h]) {
        var nom = avance().h, dv = i;
        while (!estFin() && !est(";") && !estGo() && !(jt().nl && jt().t === "mot" && DEBUTS[h()])) { garde(); avance(); }
        return { t: "option", nom: nom, valeur: texte(dv, i).replace(/\s+/g, " ") };
      }
      var reglage = false;
      if (est("SESSION") || est("GLOBAL") || est("LOCAL") || est("PERSIST")) { avance(); reglage = true; }
      var affs = [];
      do {
        garde();
        var d = i, c = jt();
        if (c.t !== "mot" && c.t !== "nom" && c.t !== "param") echec("variable attendue");
        avance();
        while (est(".") && (jt(1).t === "mot" || jt(1).t === "nom")) i += 2;
        var cible = texte(d, i), op = jt();
        if (op.t !== "op" || !AFFECTATIONS[op.v]) echec("= attendu");
        avance();
        var estVar = cible.charAt(0) === "@" || cible.charAt(0) === ":" || variables[cible.toUpperCase()];
        affs.push({ cible: cible, op: op.v, val: expr(), reglage: reglage || !estVar });
      } while (prendre(","));
      return { t: "set", affs: affs };
    }
    function instrLet() {
      var nom = ident();
      variables[nom.toUpperCase()] = true;
      if (est("CURSOR") || est("RESULTSET")) inconnu();
      var v = { nom: nom };
      if (!est(":=") && !est("DEFAULT") && !est("=")) v.type = typeDonnee();
      if (prendre(":=") || prendre("DEFAULT") || prendre("=")) v.init = expr();
      return { t: "declare", vars: [v], let: true };
    }
    function instrIf() {
      avance();
      var cond = expr();
      if (prendre("THEN")) {                                 // MySQL, Snowflake : IF … THEN … ELSEIF … ELSE … END IF
        var arret = function () { return est("ELSEIF") || est("ELSIF") || est("ELSE") || estMots(["END", "IF"]); };
        var branches = [{ si: cond, alors: bloc(arret) }], sinon = null;
        while (est("ELSEIF") || est("ELSIF")) { garde(); avance(); var c2 = expr(); exiger("THEN"); branches.push({ si: c2, alors: bloc(arret) }); }
        if (prendre("ELSE")) sinon = bloc(function () { return estMots(["END", "IF"]); });
        exigerMots(["END", "IF"]);
        return { t: "si", branches: branches, sinon: sinon };
      }
      var alors = instructionSure(true), k = i;
      while (prendre(";")) { garde(); }
      var sinon2 = null;
      if (prendre("ELSE")) sinon2 = [instructionSure(true)]; else i = k;
      return { t: "si", branches: [{ si: cond, alors: [alors] }], sinon: sinon2 };
    }
    function instrWhile() {
      avance();
      var cond = expr();
      if (prendre("DO") || prendre("LOOP")) {
        var corps = bloc(function () { return estMots(["END", "WHILE"]) || estMots(["END", "LOOP"]); });
        if (!prendreMots(["END", "WHILE"])) exigerMots(["END", "LOOP"]);
        return { t: "tantque", cond: cond, corps: corps };
      }
      return { t: "tantque", cond: cond, corps: [instructionSure(true)] };
    }
    function instrBegin() {
      avance();
      if (est("TRAN") || est("TRANSACTION") || est("WORK")) {
        avance();
        var nomT = (jt().t === "nom" || (jt().t === "mot" && !jt().nl && !RESERVES[h()] && !DEBUTS[h()])) ? avance().v : null;
        if (prendreMots(["WITH", "MARK"]) && jt().t === "texte") avance();
        return { t: "tran", action: "debut", nom: nomT };
      }
      if (est("DISTRIBUTED")) { avance(); if (!prendre("TRAN")) prendre("TRANSACTION"); return { t: "tran", action: "debut" }; }
      if (prendre("TRY")) {
        var essai = bloc(function () { return estMots(["END", "TRY"]); });
        exigerMots(["END", "TRY"]);
        while (prendre(";")) { garde(); }
        exigerMots(["BEGIN", "CATCH"]);
        var capture = bloc(function () { return estMots(["END", "CATCH"]); });
        exigerMots(["END", "CATCH"]);
        return { t: "try", essai: essai, capture: capture };
      }
      if (est(";") || estFin() || estGo()) return { t: "tran", action: "debut" };   // BEGIN; (MySQL, Snowflake)
      prendre("ATOMIC");
      var corps = bloc(function () { return est("END") || est("EXCEPTION"); }), exc = null;
      if (prendre("EXCEPTION")) {
        exc = [];
        while (est("WHEN")) {
          garde(); avance();
          var conds = [];
          do { garde(); conds.push(avance().v); } while (prendre("OR"));
          exiger("THEN");
          exc.push({ conds: conds, corps: bloc(function () { return est("WHEN") || est("END"); }) });
        }
      }
      exiger("END");
      return { t: "bloc", corps: corps, exceptions: exc };
    }
    function instrFinTran() {
      var m = avance().h, s = { t: "tran", action: m === "COMMIT" ? "valider" : "annuler" };
      if (est("TRAN") || est("TRANSACTION") || est("WORK")) avance();
      if (m === "ROLLBACK" && prendre("TO")) { prendre("SAVEPOINT"); s.point = ident(); return s; }
      if (jt().t === "nom" || (jt().t === "mot" && !jt().nl && !RESERVES[h()] && !DEBUTS[h()] && h() !== "AND")) {
        s.nom = avance().v;
        if (m === "ROLLBACK" && points[s.nom.toUpperCase()]) { s.point = s.nom; s.nom = null; }
      }
      if (prendre("AND")) { prendre("NO"); prendre("CHAIN"); }
      prendre("RELEASE");
      return s;
    }
    function instrPoint() {
      var m = avance().h;
      if (m === "SAVE") { if (!prendre("TRAN")) prendre("TRANSACTION"); var n1 = ident(); points[n1.toUpperCase()] = true; return { t: "point", action: "poser", nom: n1 }; }
      if (m === "SAVEPOINT") { var n2 = ident(); points[n2.toUpperCase()] = true; return { t: "point", action: "poser", nom: n2 }; }
      exiger("SAVEPOINT");
      return { t: "point", action: "oublier", nom: ident() };
    }
    function instrThrow() {
      avance();
      if (est(";") || estFin() || estGo() || (jt().t === "mot" && (DEBUTS[h()] || h() === "END"))) return { t: "throw" };
      var n = expr(); exiger(","); var m = expr(); exiger(",");
      return { t: "throw", num: n, msg: m, etat: expr() };
    }
    function instrRaiserror() {
      avance();
      var par = prendre("("), args = [expr()];
      while (prendre(",")) args.push(expr());
      if (par) exiger(")");
      var opts = [];
      if (prendre("WITH")) { do { garde(); opts.push(avance().h); } while (prendre(",")); }
      return { t: "raiserror", args: args, options: opts };
    }
    function instrSignal() {
      avance();
      var s = { t: "signal" };
      if (prendre("SQLSTATE")) { prendre("VALUE"); s.etat = avance().v; } else if (jt().t !== "op") s.etat = avance().v;
      if (prendre("SET")) {
        do { garde(); var k = avance().h; exiger("="); var v = expr(); if (k === "MESSAGE_TEXT") s.msg = v; } while (prendre(","));
      }
      return s;
    }
    function argumentPossible() {
      var x = jt();
      if (x.t === "fin" || (x.t === "op" && x.v !== "-" && x.v !== "(") || estGo()) return false;
      if (x.t === "mot" && x.v.charAt(0) === "@") return true;
      if (x.t === "mot" && (RESERVES[x.h] || DEBUTS[x.h]) && x.h !== "NULL" && x.h !== "DEFAULT") return false;
      if (x.nl && x.t === "mot") return false;
      return true;
    }
    function argumentExec() {
      var a = {};
      if (jt().t === "mot" && jt().v.charAt(0) === "@" && h(1) === "=") { a.nom = avance().v; avance(); }
      a.e = expr();
      if (prendre("OUTPUT") || prendre("OUT")) a.sortie = true;
      prendre("READONLY");
      return a;
    }
    function instrExec() {
      var mot = avance().h;
      if (mot === "EXECUTE" && prendre("IMMEDIATE")) {
        var ei = { t: "exec", dynamique: true, sql: expr() };
        if (prendre("USING")) { if (est("(")) sauterParentheses(); else { expr(); while (prendre(",")) expr(); } }
        return ei;
      }
      if (est("(")) {
        avance(); var e = expr(); exiger(")");
        if (prendre("AT")) avance();
        return { t: "exec", dynamique: true, sql: e };
      }
      var retour = null;
      if (jt().t === "mot" && jt().v.charAt(0) === "@" && h(1) === "=") { retour = avance().v; avance(); }
      var s = { t: "exec", nom: nomQualifie(), args: [], retour: retour, appel: mot };
      if (est("(")) {
        avance();
        if (!est(")")) { do { garde(); s.args.push(argumentExec()); } while (prendre(",")); }
        exiger(")");
      } else if (mot !== "CALL" && argumentPossible()) {
        do { garde(); s.args.push(argumentExec()); } while (prendre(","));
      }
      if (prendreMots(["WITH", "RECOMPILE"])) s.recompile = true;
      if (prendre("USING")) { s.using = [expr()]; while (prendre(",")) s.using.push(expr()); }
      return s;
    }
    function instrReturn() {
      avance();
      if (est("SELECT") || est("WITH")) return { t: "return", req: requeteComplete() };
      if (est(";") || estFin() || estGo() || (jt().t === "mot" && (DEBUTS[h()] || h() === "END") && h(1) !== "(")) return { t: "return" };
      return { t: "return", e: expr() };
    }
    function instrFetch() {
      avance();
      var sens = "NEXT";
      if (/^(NEXT|PRIOR|FIRST|LAST)$/.test(h())) sens = avance().h;
      else if (est("ABSOLUTE") || est("RELATIVE")) { sens = avance().h + " " + avance().v; }
      prendre("FROM"); prendre("GLOBAL");
      var s = { t: "curseur", action: "lire", nom: ident(), sens: sens, into: [] };
      if (prendre("INTO")) { do { garde(); s.into.push(avance().v); } while (prendre(",")); }
      return s;
    }
    function instrUse() {
      avance();
      var genre = null;
      if (/^(WAREHOUSE|DATABASE|SCHEMA|ROLE)$/.test(h())) genre = avance().h;
      else if (estMots(["SECONDARY", "ROLES"])) { i += 2; genre = "ROLES"; }
      return { t: "use", genre: genre, nom: nomQualifie().texte };
    }

    // --- Le script : des lots (séparés par GO), chacun avec ses instructions ---
    function programme() {
      var lots = [{ instrs: [] }];
      while (!estFin()) {
        garde();
        if (prendre(";")) continue;
        if (estGo()) {
          avance();
          var lot = lots[lots.length - 1];
          lot.go = true;
          if (jt().t === "nombre" && !jt().nl) lot.fois = avance().v;
          lots.push({ instrs: [] });
          continue;
        }
        lots[lots.length - 1].instrs.push(instructionSure(false));
      }
      return lots;
    }
    return programme();
  }

  // ---------- 3. La traduction : arbre → pseudo-code ----------
  // Une expression traduite : { t: texte, g: genre (m, f, mp, fp), p: phrase en mots, s: simple (nom, valeur) }.
  function C(t) { return { t: t, g: "m", s: true }; }                 // du code tel quel : un nom, une valeur
  function K(t) { return { t: t, g: "m" }; }                            // un calcul écrit en symboles (a + b)
  function P(t, g) { return { t: t, g: g || "m", p: true }; }           // une phrase en mots
  function emb(r) { return r.s ? r.t : "(" + r.t + ")"; }              // dans une phrase : entre parenthèses si composé
  function pluriel(g) { return g === "mp" || g === "fp"; }
  function accord(adj, g) {
    if (!g || g === "m") return adj;
    var e = /e$/.test(adj), s = /s$/.test(adj);
    if (g === "f") return e ? adj : adj + "e";
    if (g === "mp") return /al$/.test(adj) ? adj.slice(0, -2) + "aux" : s ? adj : adj + "s";
    return (e ? adj : adj + "e") + "s";
  }
  function vb(sg, pl, g) { return pluriel(g) ? pl : sg; }
  // « à », « de », « que » devant une expression traduite, avec au, du, des, d', qu'.
  function prep(p, r) {
    var t = r.t;
    if (r.p) {
      if (p === "à") { if (/^le /.test(t)) return "au " + t.slice(3); if (/^les /.test(t)) return "aux " + t.slice(4); }
      if (p === "de") { if (/^le /.test(t)) return "du " + t.slice(3); if (/^les /.test(t)) return "des " + t.slice(4); if (/^[aeiouyhéèêàâîôû]/i.test(t)) return "d'" + t; }
      if (p === "que" && /^[aeiouyéèêàâîôû]/i.test(t)) return "qu'" + t;
    }
    return p + " " + t;
  }
  // Le texte d'un littéral 'abc' ou N'abc' (sans les apostrophes), ou null.
  function valeurTexte(e) {
    if (!e || e.t !== "texte" || e.dollar || e.type) return null;
    var m = /^[NnXxBb]?'([\s\S]*)'$/.exec(e.v);
    return m ? m[1].replace(/''/g, "'") : null;
  }
  function valeurNombre(e) {
    if (!e) return null;
    if (e.t === "nombre") return parseFloat(e.v);
    if (e.t === "unaire" && e.op === "-" && e.e.t === "nombre") return -parseFloat(e.e.v);
    if (e.paren && e.t !== "arith") return null;
    return null;
  }
  // Un calcul fait seulement de nombres (-60*30) : sa valeur, sinon null.
  function calculConstant(e) {
    if (!e) return null;
    if (e.t === "nombre") return parseFloat(e.v);
    if (e.t === "unaire") { var v = calculConstant(e.e); return v === null ? null : e.op === "-" ? -v : v; }
    if (e.t === "arith" && /^[-+*\/]$/.test(e.op)) {
      var a = calculConstant(e.g), b = calculConstant(e.d);
      if (a === null || b === null) return null;
      return e.op === "+" ? a + b : e.op === "-" ? a - b : e.op === "*" ? a * b : b ? a / b : null;
    }
    return null;
  }

  var UNITES = {}, CANON = {};
  [["an", "ans", "m", "YEAR", "YEAR YY YYYY YEARS YR YRS YYY"], ["trimestre", "trimestres", "m", "QUARTER", "QUARTER QQ Q QTR QTRS QUARTERS"],
   ["mois", "mois", "m", "MONTH", "MONTH MM MON MONS MONTHS"], ["semaine", "semaines", "f", "WEEK", "WEEK WK WW WEEKS WEEKOFYEAR WOY WY"],
   ["jour", "jours", "m", "DAY", "DAY DD D DAYS DAYOFMONTH"], ["jour", "jours", "m", "DAYOFYEAR", "DAYOFYEAR DY DOY"],
   ["jour", "jours", "m", "WEEKDAY", "WEEKDAY DW DOW DAYOFWEEK"], ["heure", "heures", "f", "HOUR", "HOUR HH H HR HOURS HRS"],
   ["minute", "minutes", "f", "MINUTE", "MINUTE MI N MIN MINUTES MINS"], ["seconde", "secondes", "f", "SECOND", "SECOND SS S SEC SECONDS SECS"],
   ["milliseconde", "millisecondes", "f", "MILLISECOND", "MILLISECOND MS MSEC MILLISECONDS"],
   ["microseconde", "microsecondes", "f", "MICROSECOND", "MICROSECOND MCS US USEC MICROSECONDS"],
   ["nanoseconde", "nanosecondes", "f", "NANOSECOND", "NANOSECOND NS NSEC NANOSECONDS"],
   ["semaine", "semaines", "f", "ISO_WEEK", "ISO_WEEK ISOWK ISOWW WEEKISO"]].forEach(function (u) {
    u[4].split(" ").forEach(function (k) { UNITES[k] = { sg: u[0], pl: u[1], g: u[2] }; CANON[k] = u[3]; });
  });
  var UNITES_AMBIGUES = { M: "m (mois sur SQL Server, minute sur Snowflake)", Y: "y (jour de l'année sur SQL Server, année sur Snowflake)",
    W: "w (jour de la semaine sur SQL Server, semaine sur Snowflake)" };
  var PARTIES = { YEAR: "l'année", QUARTER: "le trimestre (1 à 4)", MONTH: "le mois (1 à 12)", DAYOFYEAR: "le numéro du jour dans l'année",
    DAY: "le jour du mois", WEEK: "le numéro de la semaine", ISO_WEEK: "le numéro de la semaine ISO",
    WEEKDAY: "le numéro du jour de la semaine", HOUR: "l'heure", MINUTE: "la minute", SECOND: "la seconde",
    MILLISECOND: "la milliseconde", MICROSECOND: "la microseconde", NANOSECOND: "la nanoseconde" };
  var DEBUTS_PARTIE = { YEAR: "au début de l'année (le 1er janvier)", QUARTER: "au début du trimestre", MONTH: "au début du mois (le 1er jour)",
    WEEK: "au début de la semaine", DAY: "au début du jour (0 h 00)", HOUR: "au début de l'heure", MINUTE: "au début de la minute",
    SECOND: "au début de la seconde" };
  var AMBIGUES_PAR_MOTEUR = { tsql: { M: "MONTH", Y: "DAYOFYEAR", W: "WEEKDAY" }, snowflake: { M: "MINUTE", Y: "YEAR", W: "WEEK" } };
  function lireUnite(nd, moteur) {
    var v = String((nd && (nd.v || nd.src)) || "").replace(/^'|'$/g, "").toUpperCase();
    if (AMBIGUES_PAR_MOTEUR[moteur] && AMBIGUES_PAR_MOTEUR[moteur][v]) v = AMBIGUES_PAR_MOTEUR[moteur][v];
    return { cle: CANON[v] || null, u: UNITES[v] || null, ambigu: UNITES_AMBIGUES[v] || null, brut: v };
  }
  function nombreUnites(n, u) {          // « 30 jours », « 1 jour », « @n jours »
    if (!u.u) return n + " " + (u.ambigu || u.brut);
    return n + " " + (n === "1" || n === "-1" ? u.u.sg : u.u.pl);
  }

  function typeEnMots(ty) {
    var b = ty.nom, a = ty.args || [];
    if (/^(INT|INTEGER|SIGNED|MEDIUMINT|INT4|INT8|BYTEINT)$/.test(b)) return "nombre entier";
    if (b === "BIGINT") return "grand nombre entier";
    if (b === "SMALLINT" || b === "TINYINT") return "petit nombre entier";
    if (b === "UNSIGNED") return "nombre entier positif";
    if (/^(DECIMAL|NUMERIC|NUMBER|DEC)$/.test(b)) {
      if (a.length === 2) return a[1] === "0" ? "nombre entier de " + a[0] + " chiffres au plus" : "nombre décimal de " + a[0] + " chiffres, dont " + a[1] + " après la virgule";
      return a.length === 1 ? "nombre de " + a[0] + " chiffres, sans décimale" : "nombre sans décimale (taille par défaut)";
    }
    if (/^(FLOAT|REAL|DOUBLE|DOUBLE PRECISION|FLOAT4|FLOAT8)$/.test(b)) return "nombre à virgule flottante (valeur approchée)";
    if (b === "MONEY" || b === "SMALLMONEY") return "montant (4 décimales)";
    if (/^(VARCHAR|NVARCHAR|STRING|TEXT|NTEXT|VARCHAR2|LONGTEXT|MEDIUMTEXT|TINYTEXT|CLOB)$/.test(b)) return a[0] === "MAX" ? "texte long" : a[0] ? "texte de " + a[0] + " caractères au plus" : "texte";
    if (/^(CHAR|NCHAR|CHARACTER)$/.test(b)) return a[0] ? "texte de " + a[0] + " caractères exactement (complété par des espaces)" : "texte d'un caractère";
    if (b === "DATE") return "date";
    if (/^(DATETIME|DATETIME2|SMALLDATETIME|TIMESTAMP|TIMESTAMP_NTZ|TIMESTAMP_LTZ|TIMESTAMP_TZ|DATETIMEOFFSET)$/.test(b)) return "date et heure";
    if (b === "TIME") return "heure";
    if (/^(BIT|BOOLEAN|BOOL)$/.test(b)) return "vrai ou faux";
    if (b === "UNIQUEIDENTIFIER") return "identifiant unique (GUID)";
    if (b === "VARIANT") return "valeur semi-structurée (JSON)";
    if (b === "OBJECT") return "objet JSON";
    if (b === "ARRAY") return "tableau";
    if (/BINARY|IMAGE|BLOB/.test(b)) return "données binaires";
    return null;
  }
  function typeTexte(ty) { var m = typeEnMots(ty); return m ? m + " (" + ty.texte + ")" : ty.texte; }
  var STYLES = { 1: "mm/jj/aa", 101: "mm/jj/aaaa", 2: "aa.mm.jj", 102: "aaaa.mm.jj", 3: "jj/mm/aa", 103: "jj/mm/aaaa", 4: "jj.mm.aa",
    104: "jj.mm.aaaa", 5: "jj-mm-aa", 105: "jj-mm-aaaa", 108: "hh:mi:ss", 112: "aaaammjj", 23: "aaaa-mm-jj", 120: "aaaa-mm-jj hh:mi:ss",
    121: "aaaa-mm-jj hh:mi:ss.mmm", 126: "aaaa-mm-jjThh:mi:ss (ISO 8601)" };
  var FORMATS_MYSQL = { d: "jj", e: "j", m: "mm", c: "m", Y: "aaaa", y: "aa", H: "hh", k: "h", i: "mi", s: "ss", S: "ss", T: "hh:mi:ss",
    M: "nom du mois", b: "mois abrégé", W: "nom du jour", a: "jour abrégé", p: "AM/PM", f: "microsecondes" };
  function formatMysql(t) {
    if (t === null) return null;
    var ok = true, r = t.replace(/%(.)/g, function (m, c) { if (FORMATS_MYSQL[c]) return FORMATS_MYSQL[c]; if (c === "%") return "%"; ok = false; return m; });
    return ok ? r : null;
  }

  // Une phrase par fonction (docs/traducteur.md). f : l'appel ; a : ses arguments (a.n, a.t(k) texte à insérer,
  // a.r(k) traduction, a.texte(k) valeur d'un 'texte', a.nb(k) valeur d'un nombre) ; c : outils (c.cond, c.tri, c.unite).
  // Renvoie null si l'écriture n'est pas celle attendue : la fonction est alors écrite telle quelle.
  var FN = {};
  function def(noms, fn) { noms.split(" ").forEach(function (n) { FN[n] = fn; }); }
  function n1(f) { return f.args.length === 1; }

  def("COUNT COUNT_BIG", function (f, a) {
    if (f.etoile || (a.n === 1 && (f.args[0].t === "etoile" || f.args[0].t === "nombre" || f.args[0].t === "texte") && !f.distinct)) return P("le nombre de lignes");
    if (a.n !== 1) return null;
    if (f.distinct) return P("le nombre de valeurs différentes de " + a.t(0) + " (sans compter les vides)");
    return P("le nombre de " + a.t(0) + " non vides");
  });
  def("COUNT_IF", function (f, a, c) { return n1(f) ? P("le nombre de lignes où " + c.cond(f.args[0])) : null; });
  def("SUM", function (f, a) { return n1(f) ? P((f.distinct ? "la somme des valeurs différentes de " : "la somme de ") + a.t(0), "f") : null; });
  def("AVG", function (f, a) { return n1(f) ? P((f.distinct ? "la moyenne des valeurs différentes de " : "la moyenne de ") + a.t(0), "f") : null; });
  def("MIN", function (f, a) { return n1(f) ? P("la plus petite valeur de " + a.t(0), "f") : null; });
  def("MAX", function (f, a) { return n1(f) ? P("la plus grande valeur de " + a.t(0), "f") : null; });
  def("MEDIAN", function (f, a) { return n1(f) ? P("la médiane de " + a.t(0), "f") : null; });
  def("STDEV STDDEV STDDEV_SAMP STDEVP STDDEV_POP", function (f, a) { return n1(f) ? P("l'écart type de " + a.t(0)) : null; });
  def("VAR VARIANCE VAR_SAMP VARP VAR_POP", function (f, a) { return n1(f) ? P("la variance de " + a.t(0), "f") : null; });
  def("ANY_VALUE", function (f, a) { return n1(f) ? P("une valeur de " + a.t(0) + ", n'importe laquelle", "f") : null; });
  def("APPROX_COUNT_DISTINCT", function (f, a) { return n1(f) ? P("le nombre approché de valeurs différentes de " + a.t(0)) : null; });
  def("ARRAY_AGG", function (f, a, c) { return n1(f) ? P("la liste (tableau) des valeurs " + (f.distinct ? "différentes " : "") + "de " + a.t(0) + c.ordre(f), "f") : null; });
  def("STRING_AGG LISTAGG GROUP_CONCAT", function (f, a, c) {
    if (a.n < 1) return null;
    var vals = f.args, sep = null;
    if (f.nom === "GROUP_CONCAT") sep = f.separateur ? c.tx(f.separateur).t : "','";
    else if (a.n === 2) { sep = a.t(1); vals = [f.args[0]]; }
    else if (a.n > 2) return null;
    else sep = f.nom === "LISTAGG" ? null : null;
    var liste = vals.map(function (v) { return emb(c.tx(v)); });
    var suite = (sep ? "séparées par " + sep : "") + c.ordre(f);
    return P("les valeurs " + (f.distinct ? "différentes " : "") + "de " + enumerer(liste) + " collées en un seul texte" +
      (suite ? " ; " + suite.replace(/^, /, "") : "") + " ; vide (NULL) s'il n'y a aucune valeur", "fp");
  });
  def("GROUPING", function (f, a) { return n1(f) ? P("1 si la ligne est un sous-total où " + a.t(0) + " n'est pas détaillé (vide), sinon 0") : null; });
  def("MAX_BY MIN_BY", function (f, a) { return a.n === 2 ? P("la valeur de " + a.t(0) + " sur la ligne où " + a.t(1) + " est " + (f.nom === "MAX_BY" ? "le plus grand" : "le plus petit"), "f") : null; });
  def("PERCENTILE_CONT PERCENTILE_DISC", function (f, a, c) {
    if (a.n !== 1 || !f.dansGroupe) return null;
    return P("la valeur au centile " + a.t(0) + " de " + emb(c.tx(f.dansGroupe[0].e)) + (f.nom === "PERCENTILE_CONT" ? " (calculée entre deux valeurs si besoin)" : " (une valeur qui existe)"), "f");
  });

  def("COALESCE", function (f, a) {
    if (a.n === 2) return P(a.t(0) + ", ou " + a.t(1) + " si " + a.t(0) + " est vide", a.r(0).g);
    return a.n > 2 ? P("la première valeur non vide parmi " + enumerer(f.args.map(function (x, k) { return a.t(k); })), "f") : null;
  });
  def("ISNULL", function (f, a) {
    if (a.n === 2) return P(a.t(0) + ", ou " + a.t(1) + " si " + a.t(0) + " est vide", a.r(0).g);
    return a.n === 1 ? P("1 si " + a.t(0) + " est vide (NULL), sinon 0") : null;
  });
  def("IFNULL NVL", function (f, a) { return a.n === 2 ? P(a.t(0) + ", ou " + a.t(1) + " si " + a.t(0) + " est vide", a.r(0).g) : null; });
  def("NVL2", function (f, a) { return a.n === 3 ? P(a.t(1) + " si " + a.t(0) + " a une valeur, sinon " + a.t(2)) : null; });
  def("NULLIF", function (f, a) { return a.n === 2 ? P(a.t(0) + ", ou vide (NULL) si " + a.t(0) + " est égal à " + a.t(1), a.r(0).g) : null; });
  def("ZEROIFNULL", function (f, a) { return n1(f) ? P(a.t(0) + ", ou 0 si " + a.t(0) + " est vide") : null; });
  def("NULLIFZERO", function (f, a) { return n1(f) ? P(a.t(0) + ", ou vide (NULL) si " + a.t(0) + " vaut 0") : null; });
  def("EQUAL_NULL", function (f, a) { return a.n === 2 ? P(a.t(0) + " est égal à " + a.t(1) + " (deux NULL comptent comme égaux)") : null; });
  def("IIF IFF IF", function (f, a, c) {
    return a.n === 3 ? P(a.t(1) + " si " + c.cond(f.args[0]) + ", sinon " + a.t(2) + " (même quand le test donne NULL)") : null;
  });
  def("DECODE", function (f, a) {
    if (a.n < 3) return null;
    var l = [];
    for (var k = 1; k + 1 < a.n; k += 2) l.push("si " + a.t(0) + " est égal à " + a.t(k) + " alors " + a.t(k + 1));
    return P("selon " + a.t(0) + " : " + l.join(" ; ") + " ; sinon " + (a.n % 2 === 0 ? a.t(a.n - 1) : "vide (NULL)") + " (ici, NULL est égal à NULL)");
  });
  def("GREATEST", function (f, a) { return a.n >= 2 ? P("la plus grande valeur parmi " + enumerer(f.args.map(function (x, k) { return a.t(k); })), "f") : null; });
  def("LEAST", function (f, a) { return a.n >= 2 ? P("la plus petite valeur parmi " + enumerer(f.args.map(function (x, k) { return a.t(k); })), "f") : null; });
  def("CHOOSE", function (f, a) { return a.n >= 2 ? P("la valeur numéro " + a.t(0) + " parmi " + enumerer(f.args.slice(1).map(function (x, k) { return a.t(k + 1); })), "f") : null; });

  def("LEN", function (f, a) { return n1(f) ? P("le nombre de caractères de " + a.t(0) + " (sans les espaces de la fin)") : null; });
  def("LENGTH", function (f, a, c) {
    if (!n1(f)) return null;
    return P("la longueur de " + a.t(0) + (c.moteur === "mysql" ? " en octets (un caractère accentué compte pour 2)" : c.moteur ? " en caractères" : " (en caractères ; sur MySQL, en octets)"), "f");
  });
  def("CHAR_LENGTH CHARACTER_LENGTH", function (f, a) { return n1(f) ? P("le nombre de caractères de " + a.t(0)) : null; });
  def("DATALENGTH OCTET_LENGTH", function (f, a) { return n1(f) ? P("la taille de " + a.t(0) + " en octets", "f") : null; });
  def("LEFT", function (f, a) { return a.n === 2 ? P("les " + a.t(1) + " premiers caractères de " + a.t(0), "mp") : null; });
  def("RIGHT", function (f, a) { return a.n === 2 ? P("les " + a.t(1) + " derniers caractères de " + a.t(0), "mp") : null; });
  def("SUBSTRING SUBSTR MID", function (f, a) {
    if (a.n === 3) return P(a.t(2) + " caractères de " + a.t(0) + ", à partir du caractère " + a.t(1), "mp");
    return a.n === 2 ? P(a.t(0) + " à partir du caractère " + a.t(1)) : null;
  });
  def("CHARINDEX LOCATE", function (f, a) {
    if (a.n < 2 || a.n > 3) return null;
    return P("la position de " + a.t(0) + " dans " + a.t(1) + " (0 si absent)" + (a.n === 3 ? ", en cherchant à partir du caractère " + a.t(2) : ""), "f");
  });
  def("POSITION", function (f, a) { return a.n === 2 ? P("la position de " + a.t(0) + " dans " + a.t(1) + " (0 si absent)", "f") : null; });
  def("INSTR", function (f, a) { return a.n === 2 ? P("la position de " + a.t(1) + " dans " + a.t(0) + " (0 si absent)", "f") : null; });
  def("PATINDEX", function (f, a) { return a.n === 2 ? P("la position du modèle " + a.t(0) + " dans " + a.t(1) + " (0 si absent)", "f") : null; });
  def("REPLACE", function (f, a) { return a.n === 3 ? P(a.t(0) + " en remplaçant " + a.t(1) + " par " + a.t(2)) : a.n === 2 ? P(a.t(0) + " sans les " + a.t(1)) : null; });
  def("UPPER UCASE", function (f, a) { return n1(f) ? P(a.t(0) + " en majuscules") : null; });
  def("LOWER LCASE", function (f, a) { return n1(f) ? P(a.t(0) + " en minuscules") : null; });
  def("TRIM LTRIM RTRIM", function (f, a, c) {
    if (a.n < 1 || a.n > 2) return null;
    var cote = f.cote || (f.nom === "LTRIM" ? "LEADING" : f.nom === "RTRIM" ? "TRAILING" : "BOTH");
    var ou = cote === "LEADING" ? "au début" : cote === "TRAILING" ? "à la fin" : "au début et à la fin";
    var ch = f.chars ? c.tx(f.chars).t : a.n === 2 ? a.t(1) : null;
    return P(a.t(0) + " sans les " + (ch ? "caractères " + ch : "espaces") + " " + ou);
  });
  def("CONCAT", function (f, a, c) {
    if (a.n < 2) return null;
    var l = enumerer(f.args.map(function (x, k) { return a.t(k); }));
    if (!c.moteur) return P(l + " collés ; avec un NULL : SQL Server le compte comme '', MySQL et Snowflake rendent NULL", "mp");
    return P(l + " collés (" + (c.moteur === "tsql" ? "un NULL compte comme ''" : "NULL si une des valeurs est NULL") + ")", "mp");
  });
  def("CONCAT_WS", function (f, a, c) {
    if (a.n < 3) return null;
    var l = enumerer(f.args.slice(1).map(function (x, k) { return a.t(k + 1); })) + " collés, séparés par " + a.t(0);
    if (!c.moteur) return P(l + " ; avec un NULL : SQL Server et MySQL le sautent, Snowflake rend NULL", "mp");
    return P(l + " (" + (c.moteur === "snowflake" ? "NULL si une des valeurs est NULL" : "les NULL sont sautés") + ")", "mp");
  });
  def("SPLIT_PART", function (f, a) { return a.n === 3 ? P("le morceau n° " + a.t(2) + " de " + a.t(0) + ", coupé à chaque " + a.t(1)) : null; });
  def("STUFF INSERT", function (f, a) {
    if (a.n !== 4) return null;
    if (a.nb(1) === 1 && a.texte(3) === "") return P(a.t(0) + (a.nb(2) === 1 ? " sans son premier caractère" : " sans ses " + a.t(2) + " premiers caractères"));
    return P(a.t(0) + ", où " + a.t(2) + " caractères à partir du caractère " + a.t(1) + " sont remplacés par " + a.t(3));
  });
  def("LPAD RPAD", function (f, a) { return a.n >= 2 ? P(a.t(0) + " complété " + (f.nom === "LPAD" ? "à gauche" : "à droite") + (a.n === 3 ? " par " + a.t(2) : " par des espaces") + " jusqu'à " + a.t(1) + " caractères") : null; });
  def("REPLICATE REPEAT", function (f, a) { return a.n === 2 ? P(a.t(0) + " répété " + a.t(1) + " fois") : null; });
  def("REVERSE", function (f, a) { return n1(f) ? P(a.t(0) + " écrit à l'envers") : null; });
  def("SPACE", function (f, a) { return n1(f) ? P(a.t(0) + " espaces", "mp") : null; });
  def("INITCAP", function (f, a) { return n1(f) ? P(a.t(0) + " avec une majuscule au début de chaque mot") : null; });
  def("QUOTENAME", function (f, a) { return a.n >= 1 ? P(a.t(0) + " entre crochets [ ]") : null; });
  def("ASCII UNICODE", function (f, a) { return n1(f) ? P("le code du premier caractère de " + a.t(0)) : null; });
  def("CHAR NCHAR CHR", function (f, a) { return n1(f) ? P("le caractère de code " + a.t(0)) : null; });
  def("TRANSLATE", function (f, a) { return a.n === 3 ? P(a.t(0) + ", où chaque caractère de " + a.t(1) + " est remplacé par celui de " + a.t(2) + " à la même place") : null; });
  def("FORMAT", function (f, a) { return a.n >= 2 ? P(a.t(0) + " mis en forme avec le modèle " + a.t(1) + (a.n === 3 ? " (culture " + a.t(2) + ")" : "")) : null; });
  def("TO_CHAR TO_VARCHAR", function (f, a) { return n1(f) ? P(a.t(0) + " converti en texte", a.r(0).g) : a.n === 2 ? P(a.t(0) + " écrit en texte avec le modèle " + a.t(1)) : null; });
  def("DATE_FORMAT", function (f, a) {
    if (a.n !== 2) return null;
    var m = formatMysql(a.texte(1));
    return P(a.t(0) + " écrit en texte au format " + (m ? m + " (" + a.t(1) + ")" : a.t(1)));
  });
  def("STR", function (f, a) { return a.n >= 1 ? P(a.t(0) + " écrit en texte") : null; });
  def("REGEXP_REPLACE", function (f, a) { return a.n >= 3 ? P(a.t(0) + " en remplaçant ce qui correspond à l'expression régulière " + a.t(1) + " par " + a.t(2)) : null; });
  def("REGEXP_SUBSTR", function (f, a) { return a.n >= 2 ? P("le morceau de " + a.t(0) + " qui correspond à l'expression régulière " + a.t(1)) : null; });
  def("REGEXP_LIKE", function (f, a) { return a.n >= 2 ? P(a.t(0) + " correspond à l'expression régulière " + a.t(1)) : null; });
  def("REGEXP_COUNT", function (f, a) { return a.n >= 2 ? P("le nombre de fois où l'expression régulière " + a.t(1) + " apparaît dans " + a.t(0)) : null; });
  def("CONTAINS", function (f, a) { return a.n === 2 ? P(a.t(0) + " contient " + a.t(1)) : null; });
  def("STARTSWITH", function (f, a) { return a.n === 2 ? P(a.t(0) + " commence par " + a.t(1)) : null; });
  def("ENDSWITH", function (f, a) { return a.n === 2 ? P(a.t(0) + " finit par " + a.t(1)) : null; });
  def("SOUNDEX", function (f, a) { return n1(f) ? P("le code phonétique de " + a.t(0)) : null; });

  def("GETDATE SYSDATETIME CURRENT_TIMESTAMP NOW SYSDATE LOCALTIMESTAMP SYSTIMESTAMP", function (f, a) { return a.n <= 1 ? P("la date et l'heure de maintenant", "f") : null; });
  def("GETUTCDATE SYSUTCDATETIME UTC_TIMESTAMP", function () { return P("la date et l'heure de maintenant, en UTC", "f"); });
  def("CURRENT_DATE CURDATE UTC_DATE", function () { return P("la date du jour", "f"); });
  def("CURRENT_TIME CURTIME LOCALTIME", function () { return P("l'heure de maintenant", "f"); });
  function plusMoins(d, nNode, u, c, moins) {
    var v = valeurNombre(nNode), nt;
    if (v !== null) { if (v < 0) { moins = !moins; v = -v; } nt = String(v); }
    else if (nNode.t === "unaire" && nNode.op === "-") { moins = !moins; nt = emb(c.tx(nNode.e)); }
    else nt = emb(c.tx(nNode));
    return P(emb(d) + (moins ? " moins " : " plus ") + nombreUnites(nt, u), d.g);
  }
  def("DATEADD TIMESTAMPADD", function (f, a, c) { return a.n === 3 ? plusMoins(a.r(2), f.args[1], lireUnite(f.args[0], c.moteur), c, false) : null; });
  def("ADD_MONTHS", function (f, a, c) { return a.n === 2 ? plusMoins(a.r(0), f.args[1], lireUnite({ v: "MONTH" }), c, false) : null; });
  def("DATE_ADD DATE_SUB ADDDATE SUBDATE", function (f, a, c) {
    if (a.n !== 2) return null;
    var moins = f.nom === "DATE_SUB" || f.nom === "SUBDATE", iv = f.args[1];
    if (iv.t === "intervalle") return plusMoins(a.r(0), iv.e, lireUnite({ v: iv.unite || "DAY" }), c, moins);
    return plusMoins(a.r(0), iv, lireUnite({ v: "DAY" }), c, moins);
  });
  def("DATEDIFF DATEDIFF_BIG", function (f, a, c) {
    if (a.n === 2) return P("le nombre de jours de " + a.t(1) + " à " + a.t(0));          // MySQL : DATEDIFF(fin, début)
    if (a.n !== 3) return null;
    var u = lireUnite(f.args[0], c.moteur);
    var nom = u.u ? u.u.pl : (u.ambigu || u.brut);
    var r = "le nombre de " + nom + " de " + a.t(1) + " à " + a.t(2);
    if (u.cle && u.cle !== "DAY" && u.cle !== "DAYOFYEAR" && u.cle !== "WEEKDAY") r += " (on compte les changements de " + u.u.sg + ", pas les " + u.u.pl + " entiers)";
    return P(r);
  });
  def("TIMESTAMPDIFF", function (f, a) {
    if (a.n !== 3) return null;
    var u = lireUnite(f.args[0]);
    if (!u.u) return null;
    return P("le nombre de " + u.u.pl + " " + accord("complet", u.u.g === "f" ? "fp" : "mp") + " de " + a.t(1) + " à " + a.t(2));
  });
  function partieDe(part, d) {
    var u = lireUnite(part), ph = u.cle && PARTIES[u.cle];
    if (!ph) return null;
    if (u.cle === "WEEKDAY") ph += " (il dépend du réglage DATEFIRST sur SQL Server)";
    return P(ph.replace(/ \(.*$/, "") + " " + prep("de", d) + (/\(/.test(ph) ? " " + ph.replace(/^[^(]*/, "") : ""), /^la /.test(ph) || /^l'(année|heure)/.test(ph) ? "f" : "m");
  }
  def("DATEPART DATE_PART EXTRACT", function (f, a, c) {
    if (a.n !== 2) return null;
    if (f.nom === "DATEPART" && lireUnite(f.args[0], c.moteur).cle === "WEEK")
      return P("le numéro de semaine " + prep("de", a.r(1)) + " ; la semaine du 1er janvier est la semaine 1 ; le 1er jour de la semaine dépend du réglage DATEFIRST" +
        " ; ce n'est pas la semaine ISO utilisée en France (pour elle : DATEPART(ISO_WEEK, …))");
    return partieDe(f.args[0], a.r(1));
  });
  def("DATENAME", function (f, a) {
    if (a.n !== 2) return null;
    var u = lireUnite(f.args[0]);
    if (u.cle === "MONTH") return P("le nom du mois " + prep("de", a.r(1)));
    if (u.cle === "WEEKDAY") return P("le nom du jour " + prep("de", a.r(1)));
    return partieDe(f.args[0], a.r(1));
  });
  def("YEAR", function (f, a) { return n1(f) ? P("l'année " + prep("de", a.r(0)), "f") : null; });
  def("MONTH", function (f, a) { return n1(f) ? P("le mois " + prep("de", a.r(0)) + " (1 à 12)") : null; });
  def("DAY DAYOFMONTH", function (f, a) { return n1(f) ? P("le jour du mois " + prep("de", a.r(0))) : null; });
  def("QUARTER", function (f, a) { return n1(f) ? P("le trimestre " + prep("de", a.r(0)) + " (1 à 4)") : null; });
  def("WEEK WEEKOFYEAR", function (f, a) { return a.n >= 1 ? P("le numéro de la semaine " + prep("de", a.r(0))) : null; });
  def("DAYOFWEEK", function (f, a) { return n1(f) ? P("le numéro du jour de la semaine " + prep("de", a.r(0)) + " (sur MySQL : 1 = dimanche)") : null; });
  def("DAYOFYEAR", function (f, a) { return n1(f) ? P("le numéro du jour dans l'année " + prep("de", a.r(0))) : null; });
  def("HOUR", function (f, a) { return n1(f) ? P("l'heure " + prep("de", a.r(0)), "f") : null; });
  def("MINUTE", function (f, a) { return n1(f) ? P("la minute " + prep("de", a.r(0)), "f") : null; });
  def("SECOND", function (f, a) { return n1(f) ? P("la seconde " + prep("de", a.r(0)), "f") : null; });
  def("DAYNAME", function (f, a) { return n1(f) ? P("le nom du jour " + prep("de", a.r(0))) : null; });
  def("MONTHNAME", function (f, a) { return n1(f) ? P("le nom du mois " + prep("de", a.r(0))) : null; });
  def("EOMONTH LAST_DAY", function (f, a) {
    if (n1(f)) return P("le dernier jour du mois " + prep("de", a.r(0)));
    return f.nom === "EOMONTH" && a.n === 2 ? P("le dernier jour du mois " + prep("de", a.r(0)) + ", décalé de " + a.t(1) + " mois") : null;
  });
  def("DATEFROMPARTS DATE_FROM_PARTS", function (f, a) { return a.n === 3 ? P("la date du jour " + a.t(2) + ", mois " + a.t(1) + ", année " + a.t(0), "f") : null; });
  def("MAKEDATE", function (f, a) { return a.n === 2 ? P("la date du jour n° " + a.t(1) + " de l'année " + a.t(0), "f") : null; });
  def("DATETRUNC DATE_TRUNC", function (f, a) {
    if (a.n !== 2) return null;
    var u = lireUnite(f.args[0]), ph = u.cle && DEBUTS_PARTIE[u.cle];
    return ph ? P(emb(a.r(1)) + " " + accord("ramené", a.r(1).g) + " " + ph, a.r(1).g) : null;
  });
  def("TRUNC TRUNCATE", function (f, a) {
    if (a.n === 2 && f.args[1].t === "texte") {
      var u = lireUnite(f.args[1]), ph = u.cle && DEBUTS_PARTIE[u.cle];
      if (ph) return P(emb(a.r(0)) + " " + accord("ramené", a.r(0).g) + " " + ph, a.r(0).g);
    }
    if (n1(f)) return P(a.t(0) + " sans ses décimales (coupé, pas arrondi)");
    var d = a.nb(1);
    return a.n === 2 ? P(emb(a.r(0)) + " " + accord("tronqué", a.r(0).g) + " à " + a.t(1) + (d === 1 ? " décimale" : " décimales") + " (sans arrondir)", a.r(0).g) : null;
  });
  def("TO_DATE STR_TO_DATE TRY_TO_DATE DATE", function (f, a) {
    if (a.n < 1 || a.n > 2) return null;
    if (f.nom === "DATE" && a.n === 1) return P("la date " + prep("de", a.r(0)) + " (sans l'heure)", "f");
    var m = f.nom === "STR_TO_DATE" ? formatMysql(a.texte(1)) : null;
    return P(emb(a.r(0)) + " " + accord("converti", a.r(0).g) + " en date" + (a.n === 2 ? " (modèle " + (m ? m + ", " : "") + a.t(1) + ")" : "") + (f.nom === "TRY_TO_DATE" ? ", ou vide (NULL) si c'est impossible" : ""), a.r(0).g);
  });
  def("TO_TIMESTAMP TO_TIMESTAMP_NTZ TO_TIMESTAMP_LTZ TO_TIMESTAMP_TZ TRY_TO_TIMESTAMP", function (f, a) { return a.n >= 1 ? P(emb(a.r(0)) + " converti en date et heure" + (f.nom.indexOf("TRY") === 0 ? ", ou vide (NULL) si c'est impossible" : "")) : null; });
  def("TO_NUMBER TO_DECIMAL TO_NUMERIC TRY_TO_NUMBER TRY_TO_DECIMAL TRY_TO_NUMERIC", function (f, a) { return a.n >= 1 ? P(emb(a.r(0)) + " converti en nombre" + (f.nom.indexOf("TRY") === 0 ? ", ou vide (NULL) si c'est impossible" : "")) : null; });
  def("TO_BOOLEAN", function (f, a) { return n1(f) ? P(emb(a.r(0)) + " converti en vrai ou faux") : null; });
  def("PARSE_JSON TRY_PARSE_JSON", function (f, a) { return n1(f) ? P(a.t(0) + " lu comme un document JSON" + (f.nom === "TRY_PARSE_JSON" ? ", ou vide (NULL) si ce n'est pas du JSON" : "")) : null; });
  def("ISDATE", function (f, a) { return n1(f) ? P("1 si " + a.t(0) + " est une date valide, sinon 0") : null; });
  def("ISNUMERIC", function (f, a) { return n1(f) ? P("1 si " + a.t(0) + " peut être lu comme un nombre, sinon 0") : null; });
  def("ISJSON", function (f, a) { return n1(f) ? P("1 si " + a.t(0) + " est un JSON valide, sinon 0") : null; });

  def("ROUND", function (f, a) {
    if (a.n < 1 || a.n > 3) return null;
    var x = a.r(0), d = a.n >= 2 ? a.nb(1) : 0;
    if (a.n === 3 && a.nb(2) !== 0) return P(emb(x) + " " + accord("tronqué", x.g) + " à " + a.t(1) + " décimales (sans arrondir)", x.g);
    var ou;
    if (d === null) ou = "à " + a.t(1) + " décimales";
    else if (d === 0) ou = "à l'entier";
    else if (d > 0) ou = "à " + d + (d === 1 ? " décimale" : " décimales");
    else ou = d === -1 ? "à la dizaine" : d === -2 ? "à la centaine" : d === -3 ? "au millier" : "à " + d + " décimales";
    return P(emb(x) + " " + accord("arrondi", x.g) + " " + ou, x.g);
  });
  def("CEILING CEIL", function (f, a) { return n1(f) ? P(emb(a.r(0)) + " " + accord("arrondi", a.r(0).g) + " à l'entier supérieur", a.r(0).g) : null; });
  def("FLOOR", function (f, a) { return n1(f) ? P(emb(a.r(0)) + " " + accord("arrondi", a.r(0).g) + " à l'entier inférieur", a.r(0).g) : null; });
  def("ABS", function (f, a) { return n1(f) ? P("la valeur absolue de " + a.t(0) + " (sans le signe moins)", "f") : null; });
  def("SIGN", function (f, a) { return n1(f) ? P("le signe de " + a.t(0) + " (-1, 0 ou 1)") : null; });
  def("POWER POW", function (f, a) { return a.n === 2 ? P(a.t(0) + " puissance " + a.t(1)) : null; });
  def("SQRT", function (f, a) { return n1(f) ? P("la racine carrée de " + a.t(0), "f") : null; });
  def("SQUARE", function (f, a) { return n1(f) ? P(a.t(0) + " au carré") : null; });
  def("MOD", function (f, a) { return a.n === 2 ? P("le reste de la division de " + a.t(0) + " par " + a.t(1)) : null; });
  def("DIV0", function (f, a) { return a.n === 2 ? P(a.t(0) + " divisé par " + a.t(1) + ", ou 0 si " + a.t(1) + " vaut 0") : null; });
  def("DIV0NULL", function (f, a) { return a.n === 2 ? P(a.t(0) + " divisé par " + a.t(1) + ", ou 0 si " + a.t(1) + " vaut 0 ou est vide") : null; });
  def("RAND RANDOM", function () { return P("un nombre au hasard"); });
  def("NEWID UUID UUID_STRING NEWSEQUENTIALID", function () { return P("un nouvel identifiant unique (GUID)"); });
  def("PI", function () { return P("le nombre pi"); });

  def("SCOPE_IDENTITY", function () { return P("le dernier numéro automatique (IDENTITY) créé ici"); });
  def("IDENT_CURRENT", function (f, a) { return n1(f) ? P("le dernier numéro automatique de la table " + a.t(0)) : null; });
  def("LAST_INSERT_ID", function () { return P("le dernier numéro automatique (AUTO_INCREMENT) créé"); });
  def("ROW_COUNT", function () { return P("le nombre de lignes touchées par l'instruction d'avant"); });
  def("ERROR_MESSAGE", function () { return P("le message de l'erreur attrapée"); });
  def("ERROR_NUMBER", function () { return P("le numéro de l'erreur attrapée"); });
  def("ERROR_LINE", function () { return P("la ligne où l'erreur a eu lieu", "f"); });
  def("ERROR_PROCEDURE", function () { return P("la procédure où l'erreur a eu lieu", "f"); });
  def("ERROR_SEVERITY", function () { return P("la gravité de l'erreur attrapée", "f"); });
  def("ERROR_STATE", function () { return P("l'état de l'erreur attrapée"); });
  def("XACT_STATE", function () { return P("l'état de la transaction (1 : valide, -1 : à annuler, 0 : aucune)"); });
  def("OBJECT_ID", function (f, a) { return a.n >= 1 ? P("le numéro de l'objet " + a.t(0) + " (vide s'il n'existe pas)") : null; });
  def("DB_NAME DATABASE CURRENT_DATABASE", function (f, a) { return a.n === 0 ? P("le nom de la base en cours") : null; });
  def("USER_NAME SUSER_SNAME SUSER_NAME CURRENT_USER SESSION_USER SYSTEM_USER USER", function (f, a) { return a.n === 0 ? P("le nom de l'utilisateur connecté") : null; });
  def("HOST_NAME", function () { return P("le nom de l'ordinateur qui envoie la requête"); });
  def("JSON_VALUE JSON_EXTRACT JSON_EXTRACT_PATH_TEXT GET_PATH", function (f, a) { return a.n === 2 ? P("le champ " + a.t(1) + " du document JSON " + a.t(0)) : null; });
  def("JSON_QUERY", function (f, a) { return a.n === 2 ? P("le morceau " + a.t(1) + " (objet ou tableau) du document JSON " + a.t(0)) : null; });
  def("JSON_UNQUOTE", function (f, a) { return n1(f) ? P(a.t(0) + " sans ses guillemets JSON") : null; });
  def("ARRAY_SIZE", function (f, a) { return n1(f) ? P("le nombre d'éléments du tableau " + a.t(0)) : null; });
  def("HASHBYTES MD5 SHA1 SHA2 HASH CHECKSUM BINARY_CHECKSUM", function (f, a) { return a.n >= 1 ? P("une empreinte (hash) de " + enumerer(f.args.map(function (x, k) { return a.t(k); })), "f") : null; });
  def("NEXT VALUE FOR", function (f, a) { return P("le prochain numéro de la séquence " + a.t(0)); });
  def("CONVERT USING", function (f, a) { return P(a.t(0) + " converti dans le jeu de caractères " + f.jeu); });
  def("VALUES", function (f) { return n1(f) ? C("la valeur qu'on voulait ajouter (" + compact(f.src) + ")") : null; });

  var AGREGATS = ensemble("COUNT COUNT_BIG COUNT_IF SUM AVG MIN MAX STRING_AGG LISTAGG GROUP_CONCAT ARRAY_AGG MEDIAN STDEV STDDEV " +
    "STDDEV_SAMP STDEVP STDDEV_POP VAR VARIANCE VAR_SAMP VARP VAR_POP ANY_VALUE APPROX_COUNT_DISTINCT GROUPING GROUPING_ID MAX_BY " +
    "MIN_BY PERCENTILE_CONT PERCENTILE_DISC BIT_AND BIT_OR BIT_XOR BOOL_AND BOOL_OR CHECKSUM_AGG JSON_ARRAYAGG JSON_OBJECTAGG OBJECT_AGG MODE");
  var FN_CONDITIONS = ensemble("REGEXP_LIKE CONTAINS STARTSWITH ENDSWITH EQUAL_NULL ARRAY_CONTAINS");
  var MC = { type: "mot-clé" }, FO = { type: "fonction" };

  // Parcourt un arbre (objets et tableaux), sans descendre dans les sous-requêtes si dedans === false.
  function parcourir(n, f, dedans) {
    if (!n || typeof n !== "object") return;
    if (Array.isArray(n)) { for (var k = 0; k < n.length; k++) parcourir(n[k], f, dedans); return; }
    if (f(n) === false) return;
    for (var c in n) {
      if (!Object.prototype.hasOwnProperty.call(n, c) || c === "_parent" || c === "src") continue;
      if (!dedans && (c === "req") && n.t !== "requete") continue;
      var v = n[c];
      if (v && typeof v === "object") parcourir(v, f, dedans);
    }
  }
  function contient(e, test) { var oui = false; parcourir(e, function (x) { if (oui) return false; if (test(x)) { oui = true; return false; } }, false); return oui; }
  function contientFenetre(e) { return contient(e, function (x) { return x.t === "fn" && !!x.over; }); }
  function contientAgregat(e) { return contient(e, function (x) { return x.t === "fn" && !x.over && AGREGATS[x.nom]; }); }
  function cleNom(n) { return String(n || "").replace(/^[\[`"]|[\]`"]$/g, "").toUpperCase(); }
  function compact(t) { return String(t || "").replace(/\s+/g, " ").trim(); }
  function court(t, n) { t = compact(t); n = n || 70; return t.length > n ? t.slice(0, n).replace(/\s+\S*$/, "") + "…" : t; }
  function CODE(t) { return "\u0002" + court(t, 80) + "\u0003"; }

  var indexDicoCache = null, indexDicoTaille = -1;
  function indexDico() {
    var fiches = L.dico || [];
    if (indexDicoCache && indexDicoTaille === fiches.length) return indexDicoCache;
    var ix = {};
    fiches.forEach(function (f) {
      [f.nom].concat(f.noms || []).forEach(function (n) {
        var k = compact(n).toUpperCase();
        (ix[k] = ix[k] || []).push(f);
      });
    });
    indexDicoCache = ix; indexDicoTaille = fiches.length;
    return ix;
  }

  function traduction(lots, src, marques) {
    var lignes = [], notes = {}, fiches = [], fichesVues = {};
    var etiquette = "";          // l'instruction en cours, pour les notes d'un script
    var pileCte = [];            // les CTE visibles
    var enRecursion = null;      // la CTE récursive en cours
    var dejaGuillemets = false;
    var pileCond = [];           // où l'on est dans une condition : ET, OU, NOT, CASE (pour le texte de la note 1)
    var nolockDit = false;       // NOLOCK n'est expliqué qu'une fois par instruction
    var procedures = {};         // les procédures créées dans le texte : leurs paramètres (pour EXEC)

    function ligne(niv, verbe, texte, genre) {
      lignes.push({ niveau: Math.max(0, Math.min(niv, 12)), verbe: verbe || "", texte: String(texte || "").replace(/\u0004/g, " ").replace(/\u0005/g, ", "), genre: genre || "" });
    }
    function note(num, texte) {
      var n = notes[num];
      if (!n) n = notes[num] = { num: num, texte: texte.replace(/\u0004/g, " ").replace(/\u0005/g, ", "), ou: [] };
      if (etiquette && n.ou.indexOf(etiquette) < 0) n.ou.push(etiquette);
    }
    // Lien vers une fiche du dico, reconnue par son nom ou un de ses noms (filtre : type ou catégorie).
    function lien(nom, filtre) {
      var l = indexDico()[compact(nom).toUpperCase()];
      if (!l) return;
      for (var k = 0; k < l.length; k++) {
        var f = l[k];
        if (filtre && filtre.type && f.type !== filtre.type) continue;
        if (filtre && filtre.categorie && f.categorie !== filtre.categorie) continue;
        if (!fichesVues[f.id]) { fichesVues[f.id] = true; fiches.push({ id: f.id, nom: f.nom }); }
        return;
      }
    }
    function cteDe(nom) {
      var k = cleNom(nom);
      for (var x = pileCte.length - 1; x >= 0; x--) if (pileCte[x].cle === k) return pileCte[x];
      return null;
    }
    function nomAffichage(p) {
      if (p.alias) return p.alias;
      if (p.table) return p.table.court;
      return "le bloc";
    }
    function ctxNouveau(base, plus) {
      var c = { portee: base.portee || [], instr: base.instr || "select", alias: base.alias || null, sous: base.sous || [], nbSous: 0, stage: base.stage };
      c.compteur = base.compteur || { n: 0 };
      for (var k in plus) if (Object.prototype.hasOwnProperty.call(plus, k)) c[k] = plus[k];
      return c;
    }

    // --- Expressions ---
    function sousRequete(req, ctx, opts) {
      var k = ctx.sous.length;
      ctx.sous.push({ req: req, opts: opts || {} });
      return "\u0001" + k + "\u0001";
    }
    // Une sous-requête faite d'un seul agrégat sur une table (WHERE permis, sans GROUP BY) : dite en une ligne.
    function agregatSimple(req, ctx) {
      var c = req && req.corps;
      if (!c || c.t !== "select" || req.avec || req.tri || req.limite || c.top || c.groupe || c.having || c.distinct || c.qualify || c.into || c.colonnes.length !== 1) return null;
      if (!c.from || c.from.length !== 1 || c.from[0].jointures.length) return null;
      var p = c.from[0].premiere, e = c.colonnes[0].e;
      if (!p.table || p.indices || p.temporel || p.voyage || cteDe(p.table.texte) || /^[@#]/.test(p.table.texte)) return null;
      if (e.t !== "fn" || e.over || !AGREGATS[e.nom] || e.filtre || contient(e, function (x) { return x !== e && x.t === "fn" && AGREGATS[x.nom]; })) return null;
      if (c.where && contient(c.where, function (x) { return !!x.req; })) return null;
      var portee = (ctx.portee || []).concat([cleNom(nomAffichage(p))]);
      var ct = ctxNouveau({ portee: portee, instr: "select" }, { filtre: "where", sous: ctx.sous, compteur: ctx.compteur });
      var nomT = p.table.texte + (p.alias && cleNom(p.alias) !== cleNom(p.table.court) ? " (appelée " + p.alias + ")" : "");
      lien("Sous-requête", MC);
      var ou = c.where ? cond(c.where, ct) : null, ph;
      if (/^COUNT(_BIG)?$/.test(e.nom) && (e.etoile || (e.args.length === 1 && e.args[0].t === "nombre"))) { lien("COUNT", FO); ph = "le nombre de lignes de " + nomT + (ou ? " où " + ou : ""); }
      else ph = tx(e, ctxNouveau({ portee: portee, instr: "select" }, { sous: ctx.sous, compteur: ctx.compteur })).t + (ou ? "\u0004parmi les lignes de " + nomT + " où " + ou : " sur toute la table " + nomT);
      if (ou && /^le nombre de lignes/.test(ph)) ph = ph.replace(" où ", "\u0004où ");
      var cor = correlation(req, ctx.portee);
      if (cor.length) ph += "\u0004(refaite pour chaque ligne de " + (cor[0].split(".").slice(0, -1).join(".") || "la requête du dessus") + ")";
      else if (ctx.colonnes) ph += " (une seule valeur, la même sur chaque ligne)";
      return ph;
    }
    // « le résultat de la sous-requête » : ce qui arrive s'il n'y a aucune ligne, ou plusieurs (seulement si c'est possible).
    function valeurSous(req) {
      var c = req.corps, agr = c && c.t === "select" && !c.groupe && c.colonnes.length >= 1 && c.colonnes.every(function (x) { return contientAgregat(x.e) && !contientFenetre(x.e); });
      var une = (c && c.top && valeurNombre(c.top.n) === 1) || (req.limite && req.limite.n && valeurNombre(req.limite.n) === 1);
      if (agr && !c.having) return "le résultat de la sous-requête ";
      return "le résultat de la sous-requête (" + (agr || une ? "NULL si elle ne renvoie aucune ligne" : "NULL si elle ne renvoie aucune ligne ; erreur si elle en renvoie plusieurs") + ") ";
    }
    function dansListe(r) { return r.p && /[,;:]/.test(r.t) ? "(" + r.t + ")" : r.t; }
    function sujet(r) { return r.p && /[,;]| si | ou /.test(r.t) ? "(" + r.t + ")" : r.t; }
    function objet(r) { return r.p && /[,;]| si | ou /.test(r.t) ? { t: "(" + r.t + ")", g: r.g, s: true } : r; }
    function colonneNue(e) { return e && e.t === "col" ? e.v : null; }
    function estColonne(e) { return e && (e.t === "col" || e.t === "var" || e.t === "param"); }
    function filtreLignes(ctx) { return ctx.filtre === "where" || ctx.filtre === "having" || ctx.filtre === "qualify"; }
    function filtreNote7(ctx) { return filtreLignes(ctx) || ctx.filtre === "matched"; }
    // Note 7 : une condition « négative » écarte aussi les lignes où la colonne est vide (NULL).
    function note7(ctx, col, e, col2) {
      if (ctx.filtre === "matched") {
        var m = ctx.merge || {}, cols = [col].concat(col2 && col2 !== col ? [col2] : []);
        var cib = cols.filter(function (c) { return m.cible && cleNom(c.split(".")[0]) === m.cible && c.indexOf(".") > 0; })[0] || cols[0];
        var remplie = m.action === "mise à jour" && (m.colonnes || []).some(function (c) { return cleNom(c) === cleNom(cib) || cleNom(c) === cleNom(cib.split(".").pop()); });
        note(7, CODE(m.clause + " " + compact(e.src || col)) + " : si " + cols.join(" ou ") + " est vide (NULL), le test n'est pas vrai et la ligne n'est pas " +
          (m.action || "mise à jour") + (remplie ? " (un " + cib.split(".").pop() + " vide dans la cible n'est jamais rempli)" : "") + ". Pour " + (remplie ? "le remplir" : "la traiter quand même") +
          ", ajoute " + CODE("OR " + cib + " IS NULL") + ".");
        return;
      }
      var qui = ctx.filtre === "having" ? "les groupes où " + col + " est vide (NULL) sont écartés aussi" :
        ctx.instr === "update" ? "les lignes où " + col + " est vide (NULL) ne sont pas modifiées non plus" :
        ctx.instr === "delete" ? "les lignes où " + col + " est vide (NULL) ne sont pas supprimées non plus" :
        "les lignes où " + col + " est vide (NULL) sont écartées aussi";
      note(7, CODE(e.src || col) + " : " + qui + ". NULL n'est ni égal ni différent d'une valeur.");
    }
    // Note 1 : « = NULL » n'est jamais vrai. Ce qui en découle dépend de sa place : seule (ou dans les ET), dans un OU, dans un CASE.
    function sansMarques(t) { return court(String(t).replace(/\u0001\d+\u0001/g, "la sous-requête").replace(/\u0004/g, " ").replace(/\u0005/g, ", "), 140); }
    function note1(e, x, op, ctx) {
      var debut = CODE(e.src || (x + " = NULL")) + " n'est jamais vrai : NULL n'est égal à rien, même pas à NULL. ";
      var fin = "Écris " + CODE(x + (op === "=" ? " IS NULL" : " IS NOT NULL")) + ".";
      var k = pileCond.length - 1;
      while (k >= 0 && pileCond[k].t === "et") k--;
      var f = k >= 0 ? pileCond[k] : null, filtre = ctx.filtre, instrC = ctx.instr;
      var groupes = filtre === "having", modif = filtre === "where" && (instrC === "update" || instrC === "delete");
      if (!f) {
        var ici = filtre === "where" ? (instrC === "update" ? "aucune ligne n'est modifiée" : instrC === "delete" ? "aucune ligne n'est supprimée" : "le WHERE ne laisse sortir aucune ligne") :
          filtre === "having" ? "le HAVING ne laisse sortir aucun groupe" : filtre === "qualify" ? "le QUALIFY ne laisse sortir aucune ligne" :
          filtre === "on" ? "la jointure ne trouve aucune correspondance" : filtre === "matched" ? "cette clause WHEN ne s'applique jamais" : "";
        note(1, debut + (ici ? "Ici, " + ici + ". " : "") + fin);
        return;
      }
      if (f.t === "cas") { note(1, debut + "Ici, cette branche du CASE n'est jamais choisie. " + fin); return; }
      if (f.t !== "ou") { note(1, debut + fin); return; }
      var idx = f.idx, direct = k === pileCond.length - 1, racine = f.racine && (filtreLignes(ctx) || filtre === "on");
      f.attente.push(function () {
        var autres = f.textes.filter(function (t, j) { return j !== idx; }).map(sansMarques).join(" ou ");
        var partie = direct ? "cette partie du OU" : "la partie " + sansMarques(f.textes[idx]);
        var t;
        if (racine && filtre !== "on") t = partie + (groupes ? " ne garde aucun groupe" : modif ? " n'est jamais vraie" : " ne garde aucune ligne") + (direct ? " ; " : " : ") +
          (groupes ? "seuls sortent les groupes où " : instrC === "update" && modif ? "seules sont modifiées les lignes où " : instrC === "delete" && modif ? "seules sont supprimées les lignes où " :
            "seules sortent les lignes où ") + autres;
        else t = partie + " n'est jamais vraie" + (direct ? " ; " : " : ") + "le OU revient à " + autres;
        note(1, debut + "Ici, " + t + ". " + fin);
      });
    }
    function txCmp(e, ctx, neg, eNon) {
      var op = e.op, g = e.g, d = e.d;
      if (g.t === "var" && /^@@FETCH_STATUS$/i.test(g.v) && d.t === "nombre" && d.v === "0") {
        lien("@@FETCH_STATUS");
        if (op === "=") return P("la dernière lecture du curseur a réussi (@@FETCH_STATUS = 0)");
        if (op === "<>" || op === "!=") return P("la dernière lecture du curseur a échoué ou est arrivée au bout (@@FETCH_STATUS <> 0)");
      }
      var nulD = d.t === "null", nulG = g.t === "null";
      if ((nulD || nulG) && /^(=|<>|!=)$/.test(op) && !neg) note1(e, compact((nulD ? g : d).src || "x"), op, ctx);
      if (filtreNote7(ctx) && ((op === "<>" || op === "!=") !== !!neg) && !nulD && !nulG) {
        var col = colonneNue(g) || colonneNue(d);
        if (col) note7(ctx, col, neg ? eNon : e, colonneNue(g) && colonneNue(d) ? colonneNue(d) : null);
      }
      var a = nulG ? C("NULL") : tx(g, ctx), b = nulD ? C("NULL") : objet(tx(d, ctx));
      if (d.t === "col" && d.v.charAt(0) === "\"" && !marques.mysql && !marques.moteur && !dejaGuillemets) {
        dejaGuillemets = true;
        b = C(b.t + " (sur MySQL : un texte ; sur SQL Server et Snowflake : un nom de colonne)");
      }
      if (ctx.compact && op === "=" && estColonne(g) && estColonne(d)) {
        var q1 = g.parts && g.parts.length > 1 ? g.parts[g.parts.length - 2] : null, q2 = d.parts && d.parts.length > 1 ? d.parts[d.parts.length - 2] : null;
        return K(a.t + " = " + b.t + (ctx.filtre === "where" && q1 && q2 && cleNom(q1) !== cleNom(q2) ? " (le lien entre " + q1 + " et " + q2 + ")" : ""));
      }
      if (op === "<=>") lien("<=>");
      var gg = a.g, ph;
      if (neg) {
        // NOT (x = …) : dit à la forme négative
        var nf = { "=": ["n'est pas", "ne sont pas", "égal", "à"], "<>": ["est", "sont", "égal", "à"], "!=": ["est", "sont", "égal", "à"],
          ">": ["n'est pas", "ne sont pas", "plus grand", "que"], "<": ["n'est pas", "ne sont pas", "plus petit", "que"],
          ">=": ["est", "sont", "plus petit", "que"], "<=": ["est", "sont", "plus grand", "que"] }[op];
        return P(sujet(a) + " " + vb(nf[0], nf[1], gg) + " " + accord(nf[2], gg) + " " + prep(nf[3], b));
      }
      switch (op) {
        case "=": ph = vb("est", "sont", gg) + " " + accord("égal", gg) + " " + prep("à", b); break;
        case "<>": case "!=": ph = vb("est", "sont", gg) + " " + accord("différent", gg) + " " + prep("de", b); break;
        case ">": ph = vb("est", "sont", gg) + " " + accord("plus grand", gg) + " " + prep("que", b); break;
        case "<": ph = vb("est", "sont", gg) + " " + accord("plus petit", gg) + " " + prep("que", b); break;
        case ">=": ph = vb("vaut", "valent", gg) + " au moins " + b.t; break;
        case "<=": ph = vb("vaut", "valent", gg) + " au plus " + b.t; break;
        case "!<": ph = vb("n'est", "ne sont", gg) + " pas " + accord("plus petit", gg) + " " + prep("que", b); break;
        case "!>": ph = vb("n'est", "ne sont", gg) + " pas " + accord("plus grand", gg) + " " + prep("que", b); break;
        default: ph = vb("est", "sont", gg) + " " + accord("égal", gg) + " " + prep("à", b) + " (deux NULL comptent comme égaux)";
      }
      return P(sujet(a) + " " + ph);
    }
    // Décrit un modèle de LIKE : morceaux de texte et jokers.
    function decrireMotif(m, mysql, esc) {
      var pieces = [], lit = "", k = 0, crochet = false, classes = !mysql && marques.moteur !== "snowflake";
      function pousseLit() { if (lit) { pieces.push({ lit: lit }); lit = ""; } }
      while (k < m.length) {
        var c = m.charAt(k);
        if (((c === "\\" && mysql && !esc) || (esc && c === esc)) && k + 1 < m.length) { lit += m.charAt(k + 1); k += 2; continue; }
        if (c === "%") { pousseLit(); pieces.push({ j: "n'importe quel texte" }); k++; continue; }
        if (c === "_") { pousseLit(); pieces.push({ j: "un caractère quelconque" }); k++; continue; }
        if (c === "[" && classes) {
          var f = m.indexOf("]", k + 2);
          if (f > k) {
            var cont = m.slice(k + 1, f), neg = cont.charAt(0) === "^";
            if (neg) cont = cont.slice(1);
            if (cont.length === 1 && !neg) { lit += cont; k = f + 1; continue; }
            pousseLit(); crochet = true;
            var r = /^(.)-(.)$/.exec(cont);
            pieces.push({ j: r ? "un caractère " + (neg ? "qui n'est pas " : "") + "entre " + r[1] + " et " + r[2] :
              "un caractère " + (neg ? "qui n'est pas " : "") + "parmi " + cont.split("").join(", ") });
            k = f + 1; continue;
          }
        }
        lit += c; k++;
      }
      pousseLit();
      var jokers = pieces.filter(function (p) { return p.j; });
      var n = pieces.length;
      if (!crochet && n === 2 && pieces[0].lit !== undefined && pieces[1].j === "n'importe quel texte") return { genre: "debut", lit: pieces[0].lit };
      if (!crochet && n === 2 && pieces[0].j === "n'importe quel texte" && pieces[1].lit !== undefined) return { genre: "fin", lit: pieces[1].lit };
      if (!crochet && n === 3 && pieces[0].j === "n'importe quel texte" && pieces[1].lit !== undefined && pieces[2].j === "n'importe quel texte") return { genre: "contient", lit: pieces[1].lit };
      if (!jokers.length) return { genre: "exact", lit: lit || m };
      var mots = pieces.map(function (p) { return p.j || "'" + p.lit + "'"; });
      return { genre: "modele", texte: (mots.length > 1 ? mots.slice(0, -1).join(", ") + ", puis " + mots[mots.length - 1] : mots[0]) +
        (crochet && !marques.moteur ? " ; […] : sur SQL Server seulement ; ailleurs, [ est un caractère normal" : "") };
    }
    function txLike(e, ctx) {
      var a = tx(e.e, ctx), s = sujet(a), g = a.g, neg = e.non;
      lien(e.op === "ILIKE" ? (neg ? "NOT ILIKE" : "ILIKE") : neg ? "NOT LIKE" : "LIKE", MC);
      if (neg && filtreNote7(ctx) && colonneNue(e.e)) note7(ctx, e.e.v, e);
      var sans = e.op === "ILIKE" ? " (sans tenir compte des majuscules)" : "";
      if (e.op === "RLIKE" || e.op === "REGEXP") return P(s + " " + (neg ? vb("ne correspond pas", "ne correspondent pas", g) : vb("correspond", "correspondent", g)) + " à l'expression régulière " + tx(e.motif, ctx).t);
      if (e.liste) {
        var l = e.liste.map(function (x) { return tx(x, ctx).t; }).join(", ");
        return P(s + " " + (neg ? vb("ne ressemble à aucun", "ne ressemblent à aucun", g) : vb("ressemble à au moins un", "ressemblent à au moins un", g)) + " des modèles " + l + sans);
      }
      var m = valeurTexte(e.motif), esc = e.esc ? valeurTexte(e.esc) : null;
      if (m !== null && (!e.esc || (esc && esc.length === 1))) {
        var dm = decrireMotif(m, marques.mysql, esc), q = function (t) { return "'" + t + "'"; };
        if (dm.genre === "debut") return P(s + " " + (neg ? vb("ne commence pas", "ne commencent pas", g) : vb("commence", "commencent", g)) + " par " + q(dm.lit) + sans);
        if (dm.genre === "fin") return P(s + " " + (neg ? vb("ne finit pas", "ne finissent pas", g) : vb("finit", "finissent", g)) + " par " + q(dm.lit) + sans);
        if (dm.genre === "contient") return P(s + " " + (neg ? vb("ne contient pas", "ne contiennent pas", g) : vb("contient", "contiennent", g)) + " " + q(dm.lit) + sans);
        if (dm.genre === "exact") return P(s + " " + (neg ? vb("n'est pas", "ne sont pas", g) : vb("est", "sont", g)) + " exactement " + q(dm.lit) + " (un LIKE sans joker)" + sans);
        return P(s + " " + (neg ? vb("ne ressemble pas", "ne ressemblent pas", g) : vb("ressemble", "ressemblent", g)) + " au modèle " + e.motif.v + " : " + dm.texte + sans);
      }
      return P(s + " " + (neg ? vb("ne ressemble pas", "ne ressemblent pas", g) : vb("ressemble", "ressemblent", g)) + " au modèle " + tx(e.motif, ctx).t +
        " (% = n'importe quel texte, même vide ; _ = un seul caractère quelconque" + (e.esc ? " ; le caractère qui suit " + tx(e.esc, ctx).t + " est pris tel quel" : "") + ")" + sans);
    }
    function txIn(e, ctx) {
      var a = tx(e.e, ctx), s = sujet(a), g = a.g;
      lien(e.non ? "NOT IN" : "IN", MC);
      if (e.req) {
        if (e.non && !sansNull(e.req)) note(2, CODE("NOT IN (sous-requête)") + " : si la sous-requête renvoie un seul NULL, aucune ligne ne sort. Préfère " + CODE("NOT EXISTS") + ".");
        return P(s + " " + (e.non ? vb("ne fait pas", "ne font pas", g) : vb("fait", "font", g)) + " partie du résultat de " + sousRequete(e.req, ctx));
      }
      var vals = e.liste.map(function (v) { return v.t === "null" ? "NULL" : tx(v, ctx).t; });
      if (e.non && e.liste.some(function (v) { return v.t === "null"; })) note(1, CODE("NOT IN (…, NULL)") + " n'est jamais vrai à cause du NULL de la liste : NULL n'est égal à rien. Aucune ligne ne passe ce test.");
      if (e.non && filtreNote7(ctx) && colonneNue(e.e) && !e.liste.some(function (v) { return v.t === "null"; })) note7(ctx, e.e.v, e);
      if (!e.non) return P(s + " " + vb("vaut", "valent", g) + " " + (vals.length > 6 ? "une de ces " + vals.length + " valeurs : " + vals.join(", ") : enumerer(vals, "ou")));
      return P(s + " " + vb("ne vaut", "ne valent", g) + " " + (vals.length === 1 ? "pas " + vals[0] : "ni " + vals.join(", ni ")));
    }
    // La sous-requête écarte-t-elle déjà les NULL de la colonne qu'elle renvoie (WHERE x IS NOT NULL) ?
    function sansNull(req) {
      var c = req && req.corps;
      if (!c || c.t !== "select" || c.colonnes.length !== 1 || c.colonnes[0].e.t !== "col" || !c.where) return false;
      var v = cleNom(c.colonnes[0].e.v), oui = false;
      (function plat(x) {
        if (x.t === "et") x.termes.forEach(plat);
        else if (x.t === "isnull" && x.non && x.e.t === "col" && cleNom(x.e.v) === v) oui = true;
      })(c.where);
      return oui;
    }
    function txBetween(e, ctx) {
      var a = tx(e.e, ctx), b1 = objet(tx(e.a, ctx)), b2 = objet(tx(e.b, ctx)), g = a.g;
      lien(e.non ? "NOT BETWEEN" : "BETWEEN", MC);
      if (e.non && filtreNote7(ctx) && colonneNue(e.e)) note7(ctx, e.e.v, e);
      var hb = valeurTexte(e.b), md = hb && /^(\d{4})-?(\d{2})-?(\d{2})$/.exec(hb);
      if (md && !e.non) {
        var jour = parseInt(md[3], 10);
        note(10, CODE("BETWEEN … AND " + e.b.v) + " : si la colonne contient aussi l'heure, " + e.b.v + " veut dire le " +
          (jour === 1 ? "1er" : jour) + " à 0 h 00 : la journée du " + (jour === 1 ? "1er" : jour) + " est presque exclue.");
      }
      if (e.non) return P(sujet(a) + " " + vb("est", "sont", g) + " " + accord("plus petit", g) + " " + prep("que", b1) + " ou " + accord("plus grand", g) + " " + prep("que", b2) +
        (b1.s && b2.s ? " (" + b1.t + " et " + b2.t + " sont exclus)" : " (les deux bornes sont exclues)"));
      return P(sujet(a) + " " + vb("est", "sont", g) + " entre " + b1.t + " et " + b2.t + " (bornes comprises)");
    }
    function txVar(v) {
      var h = v.toUpperCase();
      if (h === "@@ROWCOUNT") { lien("@@ROWCOUNT"); return P("le nombre de lignes touchées par l'instruction d'avant (@@ROWCOUNT)"); }
      if (h === "@@TRANCOUNT") { lien("@@TRANCOUNT"); return P("le nombre de transactions ouvertes (@@TRANCOUNT)"); }
      if (h === "@@FETCH_STATUS") { lien("@@FETCH_STATUS"); return P("le résultat de la dernière lecture du curseur (@@FETCH_STATUS : 0 = réussie)"); }
      if (h === "@@ERROR") return P("le numéro de la dernière erreur (@@ERROR, 0 s'il n'y en a pas)");
      if (h === "@@IDENTITY") return P("le dernier numéro automatique créé (@@IDENTITY)");
      return C(v);
    }
    function txIntervalle(e, ctx) {
      var n = valeurNombre(e.e), t = valeurTexte(e.e);
      if (e.unite) return C(nombreUnites(n !== null ? String(n) : t !== null ? t : emb(tx(e.e, ctx)), lireUnite({ v: e.unite })));
      var m = t && /^\s*(-?\d+)\s*([a-zA-Z]+)\s*$/.exec(t);
      if (m && lireUnite({ v: m[2] }).u) return C(nombreUnites(m[1], lireUnite({ v: m[2] })));
      return C("INTERVAL " + (t !== null ? e.e.v : tx(e.e, ctx).t));
    }
    function txArith(e, ctx) {
      if (e.op === "||") {
        note(8, CODE("||") + " colle des textes sur Snowflake et sur SQL Server 2025 et plus (erreur sur les versions d'avant). Sur MySQL, c'est " +
          "un OU logique (sauf réglage " + CODE("PIPES_AS_CONCAT") + ") : utilise " + CODE("CONCAT") + ".");
        lien("||", FO);
        var morceaux = [];
        (function plat(x) { if (x.t === "arith" && x.op === "||" && !x.paren) { plat(x.g); plat(x.d); } else morceaux.push(emb(tx(x, ctx))); })(e);
        if (marques.mysql) return P("un OU logique entre " + enumerer(morceaux) + " ; sur MySQL, || vaut 1 ou 0, pas un texte");
        return P(enumerer(morceaux) + " collés (||) ; NULL si une des valeurs est NULL", "mp");
      }
      if (e.op === "+" && !marques.mysql) {
        // SQL Server : 'texte' + x colle les textes (« suivi de »)
        var bouts = [];
        (function plat(x) { if (x.t === "arith" && x.op === "+" && !x.paren) { plat(x.g); plat(x.d); } else bouts.push(x); })(e);
        if (bouts.some(function (x) { return x.t === "texte"; })) return P(bouts.map(function (x) {
          if (x.t === "cast" && /CHAR|TEXT|STRING/.test(x.type.nom)) return emb(tx(x.e, ctx)) + " (converti en texte, " + x.type.texte + ")";
          return emb(tx(x, ctx));
        }).join(" suivi de "));
      }
      var a = tx(e.g, ctx), b = tx(e.d, ctx);
      if (e.op === "%" || e.op === "MOD") { lien("%", MC); return P("le reste de la division de " + emb(a) + " par " + emb(b)); }
      if (e.op === "DIV") return P("le quotient entier de " + emb(a) + " par " + emb(b));
      if (e.op === "/") lien("/", MC);
      function cote(r, n) { return n.paren || r.p ? "(" + r.t + ")" : r.t; }
      return K(cote(a, e.g) + " " + e.op + " " + cote(b, e.d));
    }
    function txCast(e, ctx) {
      if (e.type.nom === "DATE" && e.e.t === "fn" && /^(GETDATE|SYSDATETIME|CURRENT_TIMESTAMP|NOW|GETUTCDATE|SYSDATE|LOCALTIMESTAMP)$/.test(e.e.nom)) {
        lien(e.e.nom, FO);
        return P("la date du jour (aujourd'hui à 0 h 00)", "f");
      }
      var r = tx(e.e, ctx), t = typeTexte(e.type);
      if (e.forme === "::") lien("::", FO); else lien(e.forme === "TRY_CAST" || e.forme === "TRY_CONVERT" ? e.forme : e.forme === "CONVERT" ? "CONVERT" : "CAST", FO);
      lien(e.type.nom, { categorie: "Tables" });
      var st = "";
      if (e.style) { var sv = valeurNombre(e.style); st = " (style " + tx(e.style, ctx).t + (sv !== null && STYLES[sv] ? " : " + STYLES[sv] : "") + ")"; }
      if (e.e.t === "chemin") return P(r.t + ", " + accord("converti", r.g) + " en " + t + st, r.g);
      return P(emb(r) + " " + accord("converti", r.g) + " en " + t + st + (e.essai ? ", ou vide (NULL) si la conversion échoue" : ""), r.g);
    }
    function partiesCas(e, ctx) {
      var l = [], cc = ctxNouveau(ctx, { filtre: null, sous: ctx.sous, compteur: ctx.compteur });
      cc.sous = ctx.sous;
      var s = e.sujet ? tx(e.sujet, ctx) : null;
      e.quand.forEach(function (w, k) {
        var si;
        if (s) {
          if (w.si.t === "null") note(1, CODE("CASE " + compact(e.sujet.src) + " WHEN NULL") + " compare " + compact(e.sujet.src) +
            " = NULL, ce qui n'est jamais vrai : cette branche n'est jamais choisie. Écris " + CODE("CASE WHEN " + compact(e.sujet.src) + " IS NULL THEN …") + ".");
          si = sujet(s) + " " + vb("est", "sont", s.g) + " " + accord("égal", s.g) + " " + prep("à", w.si.t === "null" ? C("NULL") : objet(tx(w.si, ctx)));
        } else { pileCond.push({ t: "cas" }); si = cond(w.si, cc); pileCond.pop(); }
        l.push((k ? "sinon si " : "si ") + si + " alors " + tx(w.alors, ctx).t);
      });
      l.push("sinon : " + (e.sinon ? tx(e.sinon, ctx).t : "vide (NULL)"));
      return l;
    }
    function teteCas(e, ctx) { return (e.sujet ? "selon " + tx(e.sujet, ctx).t : "selon le cas") + (e.quand.length > 1 ? " (le premier cas vrai gagne)" : ""); }
    function txCas(e, ctx) { lien("CASE", MC); return P(teteCas(e, ctx) + " : " + partiesCas(e, ctx).join(" ; ")); }
    // TRY_CAST(x AS T), TRY_CONVERT, TRY_TO_NUMBER… : « x converti en T, ou vide si c'est impossible » → pour IS NULL / IS NOT NULL.
    var ESSAIS = { TRY_TO_NUMBER: "nombre", TRY_TO_DECIMAL: "nombre", TRY_TO_NUMERIC: "nombre", TRY_TO_DOUBLE: "nombre", TRY_TO_DATE: "date",
      TRY_TO_TIME: "heure", TRY_TO_TIMESTAMP: "date et heure", TRY_TO_TIMESTAMP_NTZ: "date et heure", TRY_TO_TIMESTAMP_LTZ: "date et heure",
      TRY_TO_TIMESTAMP_TZ: "date et heure", TRY_TO_BOOLEAN: "vrai ou faux" };
    function conversionEssai(x, ctx) {
      if (x.t === "cast" && x.essai) { lien(x.forme === "TRY_CONVERT" ? "TRY_CONVERT" : "TRY_CAST", FO); return { de: tx(x.e, ctx), en: typeTexte(x.type) }; }
      if (x.t === "fn" && !x.over && ESSAIS[x.nom] && x.args.length >= 1) { lien(x.nom, FO); return { de: tx(x.args[0], ctx), en: ESSAIS[x.nom] }; }
      return null;
    }
    function txChemin(e, ctx) {
      var b = tx(e.e, ctx);
      lien("VARIANT");
      return P("le champ " + e.chemin + " du JSON " + b.t);
    }
    function txParam(v, ctx) {
      if (v === "?") return P("le paramètre ? (valeur donnée à l'exécution)");
      if (v.charAt(0) === ":") return P("le paramètre " + v + " (valeur donnée à l'exécution)");
      var m = /\$(\d+)$/.exec(v);
      if (m && ctx.stage) return P("la " + ordinal(parseInt(m[1], 10)) + " colonne du fichier (" + v + ")", "f");
      return C(v);
    }
    function fonction(f, ctx) {
      if (f._etiquette && f !== ctx.racine) return C(f._etiquette);
      if (f.over) return txFenetre(f, ctx);
      lien(f.nom, FO);
      var F = FN[f.nom], r = null;
      if (F) {
        var memo = [];
        var a = {
          n: f.args.length,
          r: function (k) { return memo[k] || (memo[k] = tx(f.args[k], ctx)); },
          t: function (k) { return emb(a.r(k)); },
          texte: function (k) { return valeurTexte(f.args[k]); },
          nb: function (k) { return valeurNombre(f.args[k]); }
        };
        r = F(f, a, {
          tx: function (n) { return tx(n, ctx); },
          cond: function (n) { return cond(n, ctxNouveau(ctx, { filtre: null, sous: ctx.sous, compteur: ctx.compteur })); },
          ordre: function (x) { var l = x.dansGroupe || x.triInterne; return l ? ", triées par " + triTexte(l, ctx) : ""; },
          moteur: marques.moteur
        });
      }
      if (!r) return C(compact(f.src || f.nom));
      if (f.filtre) r = P(r.t + ", seulement pour les lignes où " + cond(f.filtre, ctx), r.g);
      return r;
    }
    // --- Fonctions de fenêtre (OVER) : un calcul sur chaque ligne, sans regrouper ---
    function decrireBorne(b) {
      if (b.courant) return "la ligne courante";
      if (b.illimite) return b.sens === "avant" ? "le début" : "la fin";
      var n = valeurNombre(b.n), nt = n !== null ? String(n) : emb(tx(b.n, ctxSimple()));
      return (n === 1 ? "la ligne" : "les " + nt + " lignes") + (b.sens === "avant" ? " d'avant" : " d'après");
    }
    function decrireCadre(c, partition) {
      var d = c.debut, f = c.fin, quoi = partition ? " du groupe" : "";
      var valeurs = c.type === "RANGE" ? " (en valeurs de tri, pas en lignes)" : c.type === "GROUPS" ? " (par groupes d'ex aequo)" : "";
      if (d.illimite && d.sens === "avant" && f.courant) return c.type === "ROWS" ? "ligne par ligne, du début" + quoi + " jusqu'à la ligne courante" :
        "du début" + quoi + " jusqu'à la ligne courante ; les lignes qui ont la même valeur de tri sont comptées ensemble (même résultat)";
      if (d.illimite && d.sens === "avant" && f.illimite && f.sens === "apres") return "sur tout " + (partition ? "le groupe" : "le résultat") + ", du début à la fin";
      if (!d.illimite && !d.courant && d.sens === "avant" && f.courant) return "sur la ligne courante et " + decrireBorne(d) + valeurs;
      if (d.courant && !f.illimite && !f.courant && f.sens === "apres") return "sur la ligne courante et " + decrireBorne(f) + valeurs;
      if (d.courant && f.illimite) return "de la ligne courante jusqu'à la fin" + quoi + valeurs;
      if (d.courant && f.courant) return "sur la ligne courante seulement";
      return prep("de", P(decrireBorne(d))) + " " + prep("à", P(decrireBorne(f))) + valeurs;
    }
    // Un nom de colonne n'a pas de genre : « la même date_cde », mais « la même valeur de montant_ht ».
    function valeurDe(x) { return /(^|[._])(date|dt|heure)/i.test(x) ? x : "valeur de " + x; }
    function valeursDe(x) { return /(^|[._])(date|dt|heure)/i.test(x) ? x : "valeurs de " + x; }
    // Le nom d'un calcul de fenêtre écrit sans nom (dans QUALIFY), et le mot pour y renvoyer ensuite (« ce numéro »).
    var NOMS_CALCULS = { ROW_NUMBER: ["numéro", "ce"], RANK: ["rang", "ce"], DENSE_RANK: ["rang", "ce"], NTILE: ["tranche", "cette"],
      PERCENT_RANK: ["rang en %", "ce"], CUME_DIST: ["part", "cette"], LAG: ["valeur d'avant", "cette"], LEAD: ["valeur d'après", "cette"],
      FIRST_VALUE: ["première valeur", "cette"], LAST_VALUE: ["dernière valeur", "cette"], NTH_VALUE: ["valeur", "cette"],
      SUM: ["total", "ce"], AVG: ["moyenne", "cette"], COUNT: ["nombre", "ce"], MIN: ["minimum", "ce"], MAX: ["maximum", "ce"] };
    // Note 13 : ROW_NUMBER sur un tri qui peut avoir des ex aequo.
    function note13(f, w) {
      if (f.nom !== "ROW_NUMBER" || w.nom) return;
      if (!w.tri) {
        note(13, CODE("ROW_NUMBER() OVER (" + (w.partition ? "PARTITION BY …" : "") + ")") + " sans ORDER BY : les numéros sont donnés dans un ordre non garanti " +
          "(il peut changer d'une fois à l'autre).");
        return;
      }
      var der = w.tri[w.tri.length - 1].e;
      if (nomCol(der) === "ID") return;
      var q = der.t === "col" && der.parts.length > 1 ? der.parts.slice(0, der.parts.length - 1).join(".") + "." : "";
      var groupe = !w.partition ? "" : w.partition.length === 1 ? " d'un même groupe (" + compact(w.partition[0].src) + ")" : " d'un même groupe";
      var meme = w.tri.length === 1 ? "la même " + valeurDe(compact(w.tri[0].e.src)) : "les mêmes valeurs de tri";
      note(13, CODE("ROW_NUMBER() … ORDER BY " + w.tri.map(function (k) { return compact(k.e.src) + (k.sens === "DESC" ? " DESC" : ""); }).join(", ")) +
        " : si deux lignes" + groupe + " ont " + meme + ", celle qui reçoit le n° 1 n'est pas garantie (le résultat peut changer d'une fois à l'autre). " +
        "Ajoute une colonne unique au tri, par exemple " + q + "id.");
    }
    // Une fonction de fenêtre en morceaux : ce qui est calculé (base, prec), la fenêtre (part, ordre), le cadre, des lignes de détail.
    function fenetreMorceaux(f, ctx) {
      lien("OVER", MC);
      var w = f.over, nom = f.nom, m = { base: "", prec: "", g: "m", part: "", ordre: "", cadre: "", details: [], special: false };
      var agregat = !!AGREGATS[nom], valeur = /^(FIRST_VALUE|LAST_VALUE|NTH_VALUE)$/.test(nom);
      var A = function (k) { return f.args[k] ? emb(tx(f.args[k], ctx)) : "?"; };
      switch (nom) {
        case "ROW_NUMBER": m.base = "le numéro de la ligne (1, 2, 3…)"; break;
        case "RANK": m.base = "le rang"; m.prec = " ; les ex aequo ont le même rang, puis un trou (1, 2, 2, 4)"; break;
        case "DENSE_RANK": m.base = "le rang sans trou (1, 2, 2, 3)"; break;
        case "NTILE": m.base = "le numéro de la tranche, sur " + A(0) + " tranches de taille presque égale"; break;
        case "PERCENT_RANK": m.base = "le rang en pourcentage (de 0 à 1)"; break;
        case "CUME_DIST": m.base = "la part des lignes placées avant elle ou ex aequo (de 0 à 1)"; m.g = "f"; break;
        case "LAG": case "LEAD":
          var n = f.args.length > 1 ? valeurNombre(f.args[1]) : 1, nt = f.args.length > 1 ? (n !== null ? String(n) : A(1)) : "1";
          m.base = "la valeur de " + A(0) + " sur " + (nt === "1" ? "la ligne " + (nom === "LAG" ? "d'avant" : "d'après") : nt + " lignes " + (nom === "LAG" ? "avant" : "après"));
          m.prec = f.args.length > 2 ? ", ou " + A(2) + " s'il n'y en a pas" : " (vide s'il n'y en a pas)";
          m.g = "f"; break;
        case "FIRST_VALUE": m.base = "la première valeur de " + A(0); m.g = "f"; break;
        case "LAST_VALUE": m.base = "la dernière valeur de " + A(0); m.g = "f"; break;
        case "NTH_VALUE": m.base = "la valeur n° " + A(1) + " de " + A(0); m.g = "f"; break;
        case "RATIO_TO_REPORT": m.base = "la part de " + A(0) + " dans le total"; m.g = "f"; break;
        default:
          if (!agregat) { lien(nom, FO); return null; }
          var r0 = fonction({ t: "fn", nom: nom, args: f.args, distinct: f.distinct, etoile: f.etoile, separateur: f.separateur,
            triInterne: f.triInterne, dansGroupe: f.dansGroupe, src: f.src }, ctx);
          m.base = r0.t; m.g = r0.g;
          if (nom === "SUM") lien("SUM OVER", FO);
      }
      lien(nom, FO);
      if (f.nulls === "IGNORE") m.prec += " (en sautant les vides : IGNORE NULLS)";
      if (w.partition) {
        lien("PARTITION BY");
        m.part = "dans chaque groupe de " + (w.partition.length === 1 ? tx(w.partition[0], ctx).t : enumerer(w.partition.map(function (e) { return dansListe(tx(e, ctx)); })));
      }
      if (w.nom) m.part = "(fenêtre " + w.nom + ")";
      if (w.tri) m.ordre = "en triant par " + triTexte(w.tri, ctx);
      var cumul = nom === "SUM" && (!w.cadre ? !!w.tri : w.cadre.debut.illimite && w.cadre.debut.sens === "avant" && w.cadre.fin.courant);
      if (cumul) { m.base = m.base.replace(/^la somme de /, "le cumul de "); m.g = "m"; }
      if (agregat || valeur) {
        if (w.cadre) { lien("ROWS BETWEEN"); m.cadre = ", " + decrireCadre(w.cadre, !!w.partition); }
        else if (w.tri && agregat) m.cadre = ", du début" + (w.partition ? " du groupe" : "") + " jusqu'à la ligne courante ; les lignes qui ont la même " +
          (w.tri.length === 1 ? valeurDe(tx(w.tri[0].e, ctx).t) : "valeur de tri") + " sont comptées ensemble (même résultat)";
        else if (w.tri && (nom === "LAST_VALUE" || nom === "NTH_VALUE")) {
          // Sans cadre écrit, la fenêtre dépend du moteur : on la décrit, sans dire « dans chaque groupe ».
          var nn = nom === "NTH_VALUE" ? valeurNombre(f.args[1]) : null;
          m.special = true;
          m.base = A(0) + " de la " + (nom === "LAST_VALUE" ? "dernière" : nn !== null && nn >= 1 ? ordinal(nn) : "n° " + A(1)) + " ligne de la fenêtre";
          m.details.push("fenêtre : " + [m.part, m.ordre].filter(Boolean).join(", "));
          m.details.push("sans cadre écrit : du début" + (w.partition ? " du groupe" : "") + " jusqu'à la ligne courante (" + (nom === "LAST_VALUE" ? "SQL Server, MySQL" : "MySQL") +
            ") ; " + (w.partition ? "tout le groupe" : "toutes les lignes") + " (Snowflake)");
          if (nom === "LAST_VALUE") note(9, CODE("LAST_VALUE … OVER (… ORDER BY …)") + " sans cadre écrit : sur SQL Server et MySQL, la fenêtre s'arrête à la dernière " +
            "ligne qui a la même valeur de tri que la ligne courante (souvent la ligne elle-même). Snowflake prend toute la fenêtre. Pour la vraie dernière valeur, écris " +
            CODE("ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING") + ".");
          else if (nn === null || nn > 1) note(9, CODE("NTH_VALUE(" + compact(f.args[0] ? f.args[0].src : "?") + ", " + compact(f.args[1] ? f.args[1].src : "?") + ") … ORDER BY …") +
            " sans cadre écrit : sur MySQL, la fenêtre s'arrête à la ligne courante : sur " + (nn === 2 ? "la 1re ligne" : nn !== null ? "les " + (nn - 1) + " premières lignes" : "les premières lignes") +
            (w.partition ? " de chaque groupe" : "") + ", le résultat est vide (NULL). Snowflake prend toute la fenêtre. Pour regarder tout le groupe, écris " +
            CODE("ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING") + ".");
        }
        else if (!w.tri && !w.partition) m.cadre = " sur toutes les lignes";
      } else if (!w.partition && !w.tri) m.cadre = " sur toutes les lignes";
      note13(f, w);
      return m;
    }
    function fenetreEnLigne(m) {
      if (m.special) return m.base + " (" + m.details.join(" ; ") + ")";
      return m.base + (m.part ? " " + m.part : "") + (m.ordre ? ", " + m.ordre : "") + m.cadre + m.prec;
    }
    function txFenetre(f, ctx) {
      var m = fenetreMorceaux(f, ctx);
      return m ? P(fenetreEnLigne(m), m.g) : C(compact(f.src));
    }
    // Une définition de fenêtre : une ligne si elle est courte ; sinon une idée par ligne (la fenêtre, le tri, le cadre).
    function lignesFenetre(nom, m, commun) {
      var deux = m.prec.replace(/^ ; /, " : ");
      if (commun) return { t: nom + " = " + m.base + m.cadre.replace(/^, sur /, " sur ") + deux, sous: [] };
      var une = nom + " = " + fenetreEnLigne(m);
      if (!m.special && une.replace(/\u0001\d+\u0001/g, "").length <= 120) return { t: une, sous: [] };
      return { t: nom + " = " + m.base + deux, sous: m.special ? m.details : [m.part, m.ordre, m.cadre.replace(/^,? /, "")].filter(Boolean) };
    }
    function triTexte(l, ctx) {
      return l.map(function (s, k) {
        return (k ? "puis par " : "") + dansListe(tx(s.e, ctx)) + " " + (s.sens === "DESC" ? "du plus grand au plus petit" : "du plus petit au plus grand") +
          (s.nulls ? (s.nulls === "FIRST" ? " (les vides en premier)" : " (les vides en dernier)") : "");
      }).join(", ");
    }
    function tx(e, ctx) {
      if (!e) return C("?");
      switch (e.t) {
        case "col":
          if (ctx.doublon && e.parts) {
            var qd = e.parts.length > 1 ? cleNom(e.parts[e.parts.length - 2]) : null;
            if (qd && qd === ctx.doublon.alias) return C("la valeur qu'on voulait ajouter pour " + e.parts[e.parts.length - 1] + " (" + e.v + ")");
            if (!qd || qd === ctx.doublon.table) return C("la valeur actuelle de " + e.v);
          }
          if (ctx.developper && ctx.alias && e.parts && e.parts.length === 1) {
            var it = ctx.alias[cleNom(e.v)];
            if (it && !it.enCours) {
              it.enCours = true;
              var dv = tx(it.c.e, ctxNouveau(ctx, { developper: false, sous: ctx.sous, compteur: ctx.compteur }));
              it.enCours = false;
              return P(e.v + " (c'est-à-dire " + dv.t + ")", "m");
            }
          }
          return C(e.v);
        case "nombre": return C(e.v);
        case "texte": return C(e.v);
        case "param": return txParam(e.v, ctx);
        case "var": return txVar(e.v);
        case "null": return C("vide (NULL)");
        case "bool": return C(e.v === "TRUE" ? "vrai" : "faux");
        case "defaut": return P("la valeur par défaut", "f");
        case "unite": return C(e.v);
        case "etoile": return P(e.table ? "toutes les colonnes de " + e.table : "toutes les colonnes", "fp");
        case "arith": return txArith(e, ctx);
        case "unaire": var u = tx(e.e, ctx); return K(e.op + (u.s ? u.t : "(" + u.t + ")"));
        case "fn": return fonction(e, ctx);
        case "cast": return txCast(e, ctx);
        case "case": return txCas(e, ctx);
        case "sousreq": var ag = agregatSimple(e.req, ctx); return P(ag || "le résultat de " + sousRequete(e.req, ctx));
        case "tuple": return K("(" + e.liste.map(function (x) { return tx(x, ctx).t; }).join(", ") + ")");
        case "intervalle": return txIntervalle(e, ctx);
        case "chemin": return txChemin(e, ctx);
        case "json": return P("le champ " + tx(e.chemin, ctx).t + " du JSON " + tx(e.e, ctx).t + (e.op === "->>" ? " (en texte)" : ""));
        case "collate": var cr = tx(e.e, ctx); return P(cr.t + " (comparé avec la collation " + e.c + ")", cr.g);
        case "atz": return P(emb(tx(e.e, ctx)) + " à l'heure de " + tx(e.z, ctx).t);
        case "methode": return e.nom === "VALUE" ? P(tx(e.e, ctx).t + " (lu comme du texte)") : C(compact(e.src || e.nom));
        case "nomme": return C(e.cle + " => " + tx(e.e, ctx).t);
        case "cmp": return txCmp(e, ctx);
        case "in": return txIn(e, ctx);
        case "between": return txBetween(e, ctx);
        case "like": return txLike(e, ctx);
        case "isnull":
          lien(e.non ? "IS NOT NULL" : "IS NULL", MC);
          var cv = conversionEssai(e.e, ctx);
          if (cv) {
            var cg = cv.de.g, conv = " être " + accord("converti", cg) + " en " + cv.en;
            return P(sujet(cv.de) + " " + (e.non ? vb("peut", "peuvent", cg) + conv : vb("ne peut pas", "ne peuvent pas", cg) + conv + ", ou " + vb("est", "sont", cg) + " " + accord("vide", cg) + " (NULL)"));
          }
          var ir = tx(e.e, ctx);
          return P(sujet(ir) + (e.non ? " " + vb("a", "ont", ir.g) + " une valeur (pas NULL)" : " " + vb("est", "sont", ir.g) + " " + accord("vide", ir.g) + " (NULL)"));
        case "isbool":
          var br = tx(e.e, ctx), bv = e.val === "TRUE" ? "vrai" : e.val === "FALSE" ? "faux" : "inconnu (NULL)";
          return P(sujet(br) + (e.non ? " " + vb("n'est pas", "ne sont pas", br.g) + " " : " " + vb("est", "sont", br.g) + " ") + bv);
        case "distinctde":
          lien("IS DISTINCT FROM", MC);
          var da = tx(e.g, ctx), db = objet(tx(e.d, ctx)), colD = colonneNue(e.g) || colonneNue(e.d);
          if (e.non) return P(sujet(da) + " " + vb("est", "sont", da.g) + " " + accord("égal", da.g) + " " + prep("à", db) + " (vide compte comme une valeur : deux vides sont égaux)");
          return P(sujet(da) + " " + vb("est", "sont", da.g) + " " + accord("différent", da.g) + " " + prep("de", db) + " (vide compte comme une valeur" +
            (filtreLignes(ctx) && colD && e.d.t !== "col" && e.d.t !== "null" ? " : une ligne où " + colD + " est vide sort)" : ")"));
        case "exists":
          lien("EXISTS", MC);
          return P("il existe au moins une ligne dans " + sousRequete(e.req, ctx, { exists: true }));
        case "quant":
          lien("ANY", MC);
          var qa = tx(e.g, ctx), tous = e.q === "ALL", qg = qa.g;
          var adj = { "=": "égal", "<>": "différent", "!=": "différent", ">": "plus grand", "<": "plus petit", ">=": "plus grand ou égal", "<=": "plus petit ou égal" }[e.op] || "égal";
          var pr = /égal$/.test(adj) || adj === "différent" ? (adj === "différent" ? "de" : "à") : "que";
          var cible = tous ? "toutes les valeurs de " : "au moins une des valeurs de ";
          return P(sujet(qa) + " " + vb("est", "sont", qg) + " " + accord(adj, qg) + " " + prep(pr, P(cible + sousRequete(e.req, ctx))));
        case "et": case "ou": case "non": case "xor": return P(cond(e, ctx));
      }
      return C(compact(e.src || "?"));
    }
    // Une condition en mots. ET passe avant OU : le vrai regroupement est montré entre parenthèses.
    function cond(e, ctx) {
      if (e.t === "et" || e.t === "ou") return morceauxCond(e, ctx).join(" " + (e.t === "et" ? "et" : "ou") + " ");
      if (e.t === "non") {
        lien("NOT", MC);
        var x = e.e;
        if (x.t === "exists") { lien("NOT EXISTS", MC); return "il n'existe aucune ligne dans " + sousRequete(x.req, ctx, { exists: true }); }
        if (x.t === "cmp" && /^(=|<>|!=|<|>|<=|>=)$/.test(x.op) && x.g.t !== "null" && x.d.t !== "null") return txCmp(x, ctx, true, e).t;
        if ((x.t === "in" || x.t === "like" || x.t === "between") && !x.non) {
          var y = {};
          for (var k in x) if (Object.prototype.hasOwnProperty.call(x, k)) y[k] = x[k];
          y.non = true; y.src = e.src;
          return tx(y, ctx).t;
        }
        pileCond.push({ t: "non" });
        var rn = "pas (" + cond(x, ctx) + ")";
        pileCond.pop();
        return rn;
      }
      if (e.t === "xor") return "soit " + cond(e.g, ctx) + ", soit " + cond(e.d, ctx) + " (pas les deux)";
      if (e.t === "bool") return e.v === "TRUE" ? "toujours vrai" : "jamais vrai";
      var r = tx(e, ctx);
      if (/^(col|var|param|chemin|cast)$/.test(e.t) || (e.t === "fn" && !FN_CONDITIONS[e.nom])) return sujet(r) + " " + vb("est", "sont", r.g) + " vrai";
      return r.t;
    }
    function morceauxCond(e, ctx) {
      lien(e.t === "et" ? "AND" : "OR", MC);
      if (e.t === "ou" && e.termes.some(function (x) { return x.t === "et" && !x.paren; }))
        note(6, CODE("AND") + " et " + CODE("OR") + " mélangés sans parenthèses : ET passe avant OU. Le pseudo-code montre le vrai regroupement, entre parenthèses.");
      var cadre = { t: e.t, idx: 0, textes: [], attente: [], racine: pileCond.every(function (f) { return f.t === "et"; }) };
      pileCond.push(cadre);
      var r = e.termes.map(function (x, k) {
        cadre.idx = k;
        var t = cond(x, ctx);
        t = (e.t === "et" && (x.t === "ou" || x.t === "xor")) || (e.t === "ou" && x.t === "et") ? "(" + t + ")" : t;
        cadre.textes.push(t);
        return t;
      });
      pileCond.pop();
      cadre.attente.forEach(function (f) { f(); });
      return r;
    }
    function condLignes(e, ctx) {
      if (e.t !== "et" && e.t !== "ou") return [cond(e, ctx)];
      var m = morceauxCond(e, ctx), mot = e.t === "et" ? "et" : "ou";
      var une = m.join(" " + mot + " ");
      if (une.replace(/\u0001\d+\u0001/g, "").length <= 98 && m.length <= 2) return [une];
      return m.map(function (t, k) { return k ? mot + " " + t : t; });
    }

    // --- Lignes avec sous-requêtes : « … fait partie du résultat de : » puis le bloc décalé ---
    // Les morceaux d'un texte coupé à ses « ; », hors parenthèses et hors textes entre apostrophes.
    function morceauxPointVirgule(t) {
      var l = [], prof = 0, dans = false, d = 0;
      for (var k = 0; k < t.length; k++) {
        var c = t.charAt(k);
        if (c === "'") {
          // un texte SQL commence après un blanc ou une parenthèse ; l'apostrophe de « jusqu'à » est collée à une lettre
          if (!dans) dans = k === 0 || !/[A-Za-z0-9_\u00C0-\u017F]/.test(t.charAt(k - 1));
          else if (t.charAt(k + 1) === "'") k++;
          else dans = false;
        }
        else if (!dans && (c === "(" || c === "[")) prof++;
        else if (!dans && (c === ")" || c === "]")) prof = Math.max(0, prof - 1);
        else if (!dans && !prof && c === ";" && t.charAt(k - 1) === " " && t.charAt(k + 1) === " ") { l.push(t.slice(d, k - 1)); d = k + 2; }
        else if (!dans && !prof && (c === "\u0004" || c === "\u0005")) { l.push(t.slice(d, k)); d = k + 1; }
      }
      l.push(t.slice(d));
      return l;
    }
    function emettre(niv, verbe, texte, ctx) {
      var re = /\u0001(\d+)\u0001/g, ks = [], m;
      while ((m = re.exec(texte))) ks.push(parseInt(m[1], 10));
      if (!ks.length) {
        // Une idée par ligne : au-delà de 120 caractères, les morceaux séparés par « ; » passent sur des sous-lignes.
        var mx = (verbe ? verbe + " " : "") + texte.replace(/\u0004/g, " ").replace(/\u0005/g, ", "), parts = mx.length > 120 ? morceauxPointVirgule(texte) : [texte];
        if (parts.length > 1 && parts.every(function (x) { return x.length >= 12; })) {
          ligne(niv, verbe, parts[0]);
          parts.slice(1).forEach(function (x) { ligne(niv + 1, "", x); });
        } else ligne(niv, verbe, texte);
        return;
      }
      var marque = "\u0001" + ks[0] + "\u0001";
      if (ks.length === 1 && finitPar(texte, marque)) {
        ligne(niv, verbe, texte.slice(0, texte.length - marque.length).replace(/\s+$/, "") + " :");
        blocSous(ctx.sous[ks[0]], niv + 1, ctx);
        return;
      }
      var noms = {};
      ks.forEach(function (k) { noms[k] = ++ctx.compteur.n; });
      ligne(niv, verbe, texte.replace(/\u0001(\d+)\u0001/g, function (x, k) { return "la sous-requête " + noms[k]; }));
      ks.forEach(function (k) { ligne(niv + 1, "", "sous-requête " + noms[k] + " :"); blocSous(ctx.sous[k], niv + 2, ctx); });
    }
    function nomsDefinis(req) {
      var n = {};
      parcourir(req, function (x) {
        if (x.premiere || x.source || x.table || x.alias) {
          [x.premiere, x.source, x].forEach(function (p) { if (p && (p.table || p.alias)) n[cleNom(p.alias || (p.table && p.table.court))] = true; });
        }
      }, true);
      return n;
    }
    // Les colonnes d'une requête du dessus utilisées dans une sous-requête (sous-requête corrélée).
    function correlation(req, portee) {
      if (!portee || !portee.length) return [];
      var dedans = nomsDefinis(req), vus = {}, l = [];
      parcourir(req, function (x) {
        if (x.t === "col" && x.parts && x.parts.length >= 2) {
          var q = cleNom(x.parts[x.parts.length - 2]);
          if (!dedans[q] && portee.indexOf(q) >= 0 && !vus[x.v]) { vus[x.v] = true; l.push(x.v); }
        }
      }, true);
      return l.slice(0, 3);
    }
    function blocSous(s, niv, ctx) {
      if (!s) return;
      lien("Sous-requête", MC);
      var cor = correlation(s.req, ctx.portee);
      if (cor.length) ligne(niv, "", "(refaite pour chaque ligne de la requête du dessus : elle utilise " + enumerer(cor) + ")");
      requete(s.req, niv, { portee: ctx.portee, exists: s.opts.exists, instr: "select" });
    }

    // --- Les tables ---
    function decrireVoyage(v) {
      if (!v) return "";
      lien("Time Travel (AT, BEFORE)");
      var c = calculConstant(v.e);
      if (v.cle === "OFFSET") {
        var s = c !== null ? Math.abs(c) : null;
        return ", telle qu'elle était il y a " + (s !== null ? s + " secondes" + (s >= 120 && s % 60 === 0 ? " (" + s / 60 + " minutes)" : "") : compact(v.e.src) + " secondes") + " (Time Travel)";
      }
      if (v.cle === "TIMESTAMP") return ", telle qu'elle était à " + compact(v.e.src) + " (Time Travel)";
      if (v.cle === "STATEMENT") return ", telle qu'elle était " + (v.genre === "BEFORE" ? "juste avant" : "au moment de") + " la requête " + compact(v.e.src) + " (Time Travel)";
      return ", à un moment passé : " + v.cle + " " + compact(v.e.src) + " (Time Travel)";
    }
    function argNomme(f, cle) { for (var k = 0; k < f.args.length; k++) if (f.args[k].t === "nomme" && f.args[k].cle === cle) return f.args[k].e; return null; }
    function decrire(p, portee, opts) {
      var d = { texte: "", bloc: null, apres: [] };
      var nomP = nomAffichage(p);
      if (p.alias || p.table) portee.push(cleNom(nomP));
      var appelee = p.alias ? " (appelée " + p.alias + ")" : "";
      if (p.table) {
        var t = p.table.texte, cte = cteDe(t);
        if (p.alias && cleNom(p.alias) === cleNom(p.table.court)) appelee = "";
        if (cte && p.table.parts.length === 1) {
          lien("WITH (CTE)", MC);
          d.texte = enRecursion === cte.cle ? "« " + t + " » (" + (p.alias && appelee ? "appelée " + p.alias + " : " : "") + "les lignes trouvées au tour d'avant)" :
            "le résultat « " + t + " » (préparé plus haut" + (p.alias && appelee ? ", appelé " + p.alias : "") + ")";
        }
        else if (/^##/.test(t)) { lien("#temp"); d.texte = "la table temporaire globale " + t + appelee; }
        else if (/^#/.test(t)) { lien("#temp"); d.texte = "la table temporaire " + t + appelee; }
        else if (/^@/.test(t)) d.texte = opts.variablesTable && opts.variablesTable[cleNom(t)] ? "la variable table " + t + appelee :
          opts.stage ? "les fichiers du stage " + t + appelee.replace("appelée", "appelés") : t + appelee + " (une variable table sur SQL Server, des fichiers d'un stage sur Snowflake)";
        else d.texte = "la table " + t + appelee;
        d.texte += decrireVoyage(p.voyage);
        if (p.temporel) d.texte += ", telle qu'elle était à " + compact(p.temporel.src) + " (table temporelle)";
        if (p.indices) {
          if (/NOLOCK|READUNCOMMITTED/.test(p.indices)) {
            lien("NOLOCK");
            if (nolockDit) d.texte += ", lue elle aussi avec NOLOCK";
            else { d.texte += ", lue avec NOLOCK"; d.apres.push("NOLOCK : la table est lue sans attendre les verrous ; elle peut lire des changements pas encore validés"); }
            nolockDit = true;
          }
          else d.texte += ", avec l'indication " + p.indices;
        }
        return d;
      }
      if (p.req) {
        d.texte = "le résultat de la sous-requête" + appelee + (p.colonnes ? ", colonnes " + p.colonnes.join(", ") : "");
        d.bloc = function (niv) { requete(p.req, niv, { portee: portee.slice(), instr: "select" }); };
        return d;
      }
      if (p.valeurs) {
        d.texte = "les lignes écrites dans la requête" + appelee + (p.colonnes ? ", colonnes " + p.colonnes.join(", ") : "");
        d.bloc = function (niv) { lignesValeurs(p.valeurs, niv, ctxNouveau({ portee: portee }, {})); };
        return d;
      }
      if (p.fonction) {
        var f = p.fonction.t === "fn" ? p.fonction : null, ctx = ctxNouveau({ portee: portee }, {});
        if (f && f.nom === "FLATTEN") {
          lien("LATERAL FLATTEN");
          var input = argNomme(f, "INPUT") || (f.args[0] && f.args[0].t !== "nomme" ? f.args[0] : null);
          var outer = argNomme(f, "OUTER"), avecOuter = outer && /TRUE/i.test(outer.src || "");
          var nm = p.alias || "FLATTEN";
          d.texte = "les éléments du tableau " + (input ? compact(input.src) : "?") + " (FLATTEN" + (p.alias ? ", appelés " + p.alias : "") + ")";
          d.apres.push("une ligne par élément : " + nm + ".value = l'élément, " + nm + ".index = sa position");
          d.apres.push(avecOuter ? "une ligne dont le tableau est vide ou absent reste quand même (" + nm + ".value vide), grâce à OUTER => TRUE" :
            "une ligne dont le tableau est vide ou absent disparaît (pas de OUTER => TRUE)");
          d.flatten = true;
          return d;
        }
        if (f && f.nom === "STRING_SPLIT" && f.args.length >= 2) {
          lien("STRING_SPLIT", FO);
          d.texte = "les morceaux de " + emb(tx(f.args[0], ctx)) + ", coupé à chaque " + tx(f.args[1], ctx).t + " (une ligne par morceau, colonne value)" + appelee;
          return d;
        }
        if (f && f.nom === "OPENJSON" && f.args.length) {
          lien("OPENJSON");
          d.texte = "les éléments du JSON " + emb(tx(f.args[0], ctx)) + (f.args[1] ? ", au chemin " + tx(f.args[1], ctx).t : "") + " (OPENJSON" + (p.alias ? ", appelés " + p.alias : "") + ")";
          if (p.schemaJson) {
            d.apres.push("une ligne par élément, lue avec les colonnes :");
            p.schemaJson.forEach(function (c) {
              d.apres.push({ t: c.nom + " : " + typeTexte(c.type) + (c.chemin ? ", pris dans " + c.chemin : "") + (c.json ? " (gardé en JSON)" : ""), n: 1 });
            });
          } else d.apres.push("une ligne par élément (colonnes key, value et type)");
          return d;
        }
        d.texte = "le résultat de la fonction " + compact(p.fonction.src || "?") + appelee;
        return d;
      }
      if (p.groupe) {
        d.texte = "le groupe de tables" + appelee;
        d.bloc = function (niv) { fromTrad(p.groupe, niv, portee, opts); };
        return d;
      }
      d.texte = "?";
      return d;
    }
    function lignesValeurs(lv, niv, ctx) {
      lv.slice(0, 5).forEach(function (l) { emettre(niv, "", "(" + l.map(function (v) { return tx(v, ctx).t; }).join(", ") + ")", ctx); });
      if (lv.length > 5) ligne(niv, "", "… et " + (lv.length - 5) + " autres lignes");
    }
    function apresLignes(d, niv) { d.apres.forEach(function (t) { ligne(niv + 1 + (t.n || 0), "", t.t || t); }); }
    function sourceLigne(p, niv, verbe, portee, opts) {
      var d = decrire(p, portee, opts);
      ligne(niv, verbe, d.texte + (d.bloc ? " :" : ""));
      if (d.bloc) d.bloc(niv + 1);
      apresLignes(d, niv);
    }
    // --- Les relations entre tables : recherche par la clé, ou une ligne vers plusieurs ---
    function qualifCol(e) { return e && e.t === "col" && e.parts.length >= 2 ? cleNom(e.parts[e.parts.length - 2]) : null; }
    function nomCol(e) { return e && e.t === "col" ? cleNom(e.parts[e.parts.length - 1]) : null; }
    function egalites(c) {
      var l = [];
      (function plat(e) { if (!e) return; if (e.t === "et") e.termes.forEach(plat); else if (e.t === "cmp" && e.op === "=" && e.g.t === "col" && e.d.t === "col") l.push(e); })(c);
      return l;
    }
    // Une sous-requête regroupée par la colonne du ON : une seule ligne par valeur.
    function sourceUnique(p, on) {
      var r = p.req && p.req.corps;
      if (!r || r.t !== "select" || !r.groupe || r.groupe.tout || r.groupe.elements.length !== 1 || r.groupe.elements[0].t !== "expr") return false;
      var g = nomCol(r.groupe.elements[0].e), b = cleNom(p.alias || "");
      return egalites(on).some(function (e) { return (qualifCol(e.g) === b && nomCol(e.g) === g) || (qualifCol(e.d) === b && nomCol(e.d) === g); });
    }
    // « cle » : la ligne de b est cherchée par sa clé (au plus une) ; « 1n » : b porte la clé d'une table déjà prise
    // (chaque ligne de celle-ci peut sortir plusieurs fois) ; « ? » : on ne sait pas.
    function relation(j, avant) {
      var p = j.source, b = cleNom(nomAffichage(p)), r = { rel: "?", parent: null };
      if (!j.on) return r;
      if (p.req && sourceUnique(p, j.on)) { r.rel = "cle"; return r; }
      egalites(j.on).forEach(function (e) {
        [[e.g, e.d], [e.d, e.g]].forEach(function (c) {
          var qb = qualifCol(c[0]), qa = qualifCol(c[1]);
          if (qb !== b || !qa || qa === b || avant.indexOf(qa) < 0) return;
          if (nomCol(c[0]) === "ID") r.rel = "cle";
          else if (nomCol(c[1]) === "ID" && r.rel !== "cle") { r.rel = "1n"; r.parent = c[1].parts[c[1].parts.length - 2]; }
        });
      });
      return r;
    }
    // LEFT JOIN b … WHERE b.x IS NULL (x dans le ON, ou x = id) : on cherche ce qui manque (anti-jointure).
    function antiJointures(from, where) {
      var r = {};
      if (!from || !where) return r;
      var termes = [];
      (function plat(e) { if (e.t === "et") e.termes.forEach(plat); else termes.push(e); })(where);
      from.forEach(function (src) {
        src.jointures.forEach(function (j) {
          if (j.type !== "LEFT" || !j.on) return;
          var b = cleNom(nomAffichage(j.source)), cols = {};
          parcourir(j.on, function (x) { if (x.t === "col" && qualifCol(x) === b) cols[nomCol(x)] = true; }, false);
          termes.forEach(function (t) {
            if (t.t === "isnull" && !t.non && qualifCol(t.e) === b && (cols[nomCol(t.e)] || nomCol(t.e) === "ID"))
              r[b] = { gauche: from.length === 1 && src.jointures.length === 1 ? nomAffichage(src.premiere) : null, droite: nomAffichage(j.source), terme: t };
          });
        });
      });
      return r;
    }
    // Ce qu'on sait des jointures d'un FROM : les tables du côté facultatif (LEFT / RIGHT), et les liens « une ligne
    // de A pour plusieurs lignes de B » (B.x = A.id) qui peuvent gonfler un total.
    function infosJointures(from, where) {
      var r = { vides: {}, tables: {}, unN: [] };
      if (!from) return r;
      function ajouterUnN(e) {
        [[e.g, e.d], [e.d, e.g]].forEach(function (c) {
          var qa = qualifCol(c[0]), qb = qualifCol(c[1]);
          if (qa && qb && qa !== qb && nomCol(c[0]) === "ID" && nomCol(c[1]) !== "ID") r.unN.push({ un: qa, n: qb });
        });
      }
      from.forEach(function (src) {
        [src.premiere].concat(src.jointures.map(function (j) { return j.source; })).forEach(function (p) {
          r.tables[cleNom(nomAffichage(p))] = { alias: nomAffichage(p), table: p.table ? p.table.texte : nomAffichage(p) };
        });
        var avant = [src.premiere];
        src.jointures.forEach(function (j) {
          var n = cleNom(nomAffichage(j.source));
          if (j.type === "LEFT") r.vides[n] = { genre: "LEFT", j: j, garde: avant.length === 1 && from.length === 1 ? nomAffichage(avant[0]) : null };
          if (j.type === "RIGHT") avant.forEach(function (a) { r.vides[cleNom(nomAffichage(a))] = { genre: "RIGHT", j: j, garde: nomAffichage(j.source) }; });
          if (j.on && !(j.source.req && sourceUnique(j.source, j.on))) egalites(j.on).forEach(ajouterUnN);
          avant.push(j.source);
        });
      });
      if (from.length > 1 && where) egalites(where).forEach(ajouterUnN);
      return r;
    }
    // Le regroupement ne porte que sur le côté gardé d'un LEFT JOIN (pour les notes 12 et « vide, pas 0 »).
    function groupeCoteGarde(s, infos) {
      if (!s.groupe || s.groupe.tout || !Object.keys(infos.vides).length) return false;
      var ok = true;
      parcourir(s.groupe, function (x) { if (x.t === "col") { var q = qualifCol(x); if (!q || infos.vides[q]) ok = false; } }, false);
      return ok;
    }
    function videDe(f, infos) {     // l'agrégat f porte-t-il sur une seule table du côté facultatif ? → sa description
      var q = {}, k;
      parcourir(f.args, function (x) { if (x.t === "col") q[qualifCol(x) || "?"] = true; }, false);
      k = Object.keys(q);
      return k.length === 1 && infos.vides[k[0]] ? infos.vides[k[0]] : null;
    }
    function nomTable(x) { return x.table && cleNom(x.table) !== cleNom(x.alias) ? x.table + " (" + x.alias + ")" : x.alias; }
    function notesJointures(s, items, infos) {
      var groupesQ = {};
      if (s.groupe) parcourir(s.groupe, function (x) { if (x.t === "col" && qualifCol(x)) groupesQ[qualifCol(x)] = true; }, false);
      // Note 11 : un agrégat sur la table A, après une jointure où B porte la clé de A : un total gonflé.
      items.forEach(function (it) {
        if (it.fen || it.c.variable) return;
        parcourir(it.c.e, function (x) {
          if (x.t !== "fn" || x.over || x.distinct || x.etoile || x.args.length !== 1 || !/^(SUM|AVG|COUNT|COUNT_BIG)$/.test(x.nom)) return;
          var q = {}, col = null;
          parcourir(x.args[0], function (y) { if (y.t === "col") { q[qualifCol(y) || "?"] = true; col = col || y; } }, false);
          var k = Object.keys(q);
          if (k.length !== 1 || k[0] === "?") return false;
          infos.unN.forEach(function (r) {
            if (r.un !== k[0] || groupesQ[r.n]) return;
            var nn = infos.tables[r.n] || { alias: r.n, table: r.n }, aa = infos.tables[r.un] || { alias: r.un, table: r.un }, c = col.parts[col.parts.length - 1];
            var effet = x.nom === "SUM" ? "son " + c + " est compté plusieurs fois (total gonflé). Fais la somme avant la jointure, ou additionne une colonne de " + nn.alias :
              x.nom === "AVG" ? "son " + c + " pèse plusieurs fois dans la moyenne (moyenne faussée). Fais la moyenne avant la jointure" :
              "elle est comptée plusieurs fois (nombre gonflé). Pour compter chaque ligne de " + aa.alias + " une seule fois, écris " + CODE("COUNT(DISTINCT " + aa.alias + ".id)");
            note(11, CODE(x.src) + " après la jointure avec " + nn.table + " : si une ligne de la table " + nomTable(aa) + " correspond à plusieurs lignes de la table " + nomTable(nn) + ", " + effet + ".");
          });
          return false;
        }, false);
      });
      // Note 12 : COUNT(*) regroupé par le côté gardé d'un LEFT JOIN compte 1 pour une ligne sans correspondance.
      if (groupeCoteGarde(s, infos) && items.some(function (it) {
        return !it.fen && contient(it.c.e, function (x) { return x.t === "fn" && !x.over && /^COUNT(_BIG)?$/.test(x.nom) && (x.etoile || (x.args.length === 1 && x.args[0].t === "nombre")); });
      })) {
        var b = Object.keys(infos.vides)[0], v = infos.vides[b], nb = infos.tables[b] || { alias: b, table: b }, colB = null;
        parcourir(v.j.on, function (x) { if (!colB && x.t === "col" && qualifCol(x) === b) colB = x.v; }, false);
        var jt = v.j.source.table ? v.j.source.table.texte : nomAffichage(v.j.source), g = v.garde ? infos.tables[cleNom(v.garde)] : null;
        note(12, CODE("COUNT(*)") + " après " + CODE(v.genre + " JOIN " + jt) + " : une ligne de " + (g ? nomTable(g) : "la table gardée") + " sans ligne dans " + nomTable(nb) +
          " garde une ligne (avec les colonnes de " + nb.alias + " vides), donc elle compte 1, pas 0. Pour ne compter que les lignes de " + nb.alias + ", écris " +
          CODE("COUNT(" + (colB || nb.alias + ".id") + ")") + ".");
      }
    }
    function fromTrad(liste, niv, portee, opts, dml) {
      var avant = [];
      liste.forEach(function (src, k) {
        var p = src.premiere;
        if (k === 0) sourceLigne(p, niv, dml ? dml.verbeSource || "PRENDRE" : "PRENDRE", portee, opts);
        else {
          var lat = p.lateral || (p.fonction && p.fonction.t === "fn" && p.fonction.nom === "FLATTEN");
          var d = decrire(p, portee, opts);
          if (lat) {
            ligne(niv, "RELIER", "pour chaque ligne, " + d.texte + (d.bloc ? ", calculé avec cette ligne" : ""));
            if (!d.flatten) ligne(niv + 1, "", "une ligne pour laquelle ce bloc ne renvoie rien disparaît");
            if (d.bloc) { ligne(niv + 1, "", "sous-requête" + (p.alias ? " " + p.alias : "") + " :"); d.bloc(niv + 2); }
            apresLignes(d, niv);
          } else {
            ligne(niv, "RELIER", d.texte + " : toutes les combinaisons (virgule)" + (d.bloc ? " :" : ""));
            if (d.bloc) d.bloc(niv + 1);
            ligne(niv + 1, "", "chaque ligne déjà prise avec chaque ligne de " + nomAffichage(p) + " ; le lien entre les tables est dans le WHERE");
          }
        }
        var gauche = k === 0 && liste.length === 1 ? nomAffichage(p) : null;
        avant.push(cleNom(nomAffichage(p)));
        src.jointures.forEach(function (j, kj) {
          jointureLigne(j, niv, portee, opts, kj === 0 ? gauche : null, dml, avant);
          avant.push(cleNom(nomAffichage(j.source)));
        });
      });
    }
    var NOMS_JOINTURES = { INNER: "INNER JOIN", LEFT: "LEFT JOIN", RIGHT: "RIGHT JOIN", FULL: "FULL OUTER JOIN", CROSS: "CROSS JOIN" };
    function jointureLigne(j, niv, portee, opts, gauche, dml, avant) {
      var p = j.source, droite = nomAffichage(p);
      if (j.type === "CROSS APPLY" || j.type === "OUTER APPLY") {
        lien(j.type, MC);
        var da = decrire(p, portee, opts);
        ligne(niv, "RELIER", "pour chaque ligne, " + da.texte + (da.bloc ? ", calculé avec cette ligne" : ""));
        var regle = j.type === "CROSS APPLY" ? "une ligne pour laquelle ce bloc ne renvoie rien disparaît" :
          "une ligne pour laquelle ce bloc ne renvoie rien reste, avec des colonnes vides (NULL)";
        if (da.bloc) { ligne(niv + 1, "", regle); ligne(niv + 1, "", "sous-requête" + (p.alias ? " " + p.alias : "") + " :"); da.bloc(niv + 2); }
        else { apresLignes(da, niv); ligne(niv + 1, "", regle); }
        return;
      }
      lien(NOMS_JOINTURES[j.type], MC);
      if (j.naturel) lien("NATURAL JOIN");
      if (j.using) lien("USING", MC);
      var d = decrire(p, portee, opts);
      var ctx = ctxNouveau({ portee: portee, instr: opts.instr || "select" }, { compact: true, filtre: "on" });
      var quand = j.on && j.on.t === "bool" ? (j.on.v === "TRUE" ? ", sans condition (ON TRUE)" : ", jamais (ON FALSE)") : j.on ? ", quand " + cond(j.on, ctx) : j.using ? ", quand " + enumerer(j.using) + (j.using.length > 1 ? " sont égales" : " est égale") + " des deux côtés" :
        j.naturel ? ", quand toutes les colonnes de même nom sont égales" : "";
      if (p.lateral && d.bloc) { emettre(niv, "RELIER", "pour chaque ligne, " + d.texte + quand, ctx); }
      else emettre(niv, "RELIER", d.texte + quand, ctx);
      if (d.bloc) { ligne(niv + 1, "", "sous-requête" + (p.alias ? " " + p.alias : "") + " :"); d.bloc(niv + 2); }
      apresLignes(d, niv);
      // La répétition des lignes : seulement là où elle peut changer un résultat (jointure d'une ligne vers plusieurs).
      var rel = relation(j, avant || []), repete = null;
      if (!(opts.antis && opts.antis[cleNom(droite)])) {
        if (rel.rel === "1n") repete = "chaque ligne de " + rel.parent + " sort une fois pour chaque ligne de " + droite + " qui correspond";
        else if (rel.rel === "?" && opts.agregats) repete = "si une ligne " + (gauche ? "de " + gauche : "déjà prise") + " a plusieurs correspondances dans " + droite + ", elle sort une fois pour chacune";
      }
      switch (j.type) {
        case "INNER":
          if (!j.on && !j.using && !j.naturel) { ligne(niv + 1, "", "toutes les combinaisons (pas de condition ON)"); break; }
          if (dml) {
            ligne(niv + 1, "", "seulement les lignes qui ont une correspondance : une ligne de " + dml.cible + " sans correspondance n'est pas " + dml.participe);
            if (dml.participe === "modifiée" && rel.rel !== "cle") {
              ligne(niv + 1, "", "une ligne de " + dml.cible + " qui a plusieurs correspondances n'est modifiée qu'une fois :");
              ligne(niv + 2, "", "avec les valeurs d'une seule d'entre elles, prise au hasard");
            }
            break;
          }
          ligne(niv + 1, "", "seulement les lignes qui ont une correspondance");
          if (repete) ligne(niv + 1, "", repete);
          break;
        case "LEFT":
          ligne(niv + 1, "", "toutes les lignes " + (gauche ? "de " + gauche : "déjà prises") + ", même sans correspondance (les colonnes de " + droite + " sont alors vides : NULL)");
          if (repete) ligne(niv + 1, "", repete);
          break;
        case "RIGHT":
          ligne(niv + 1, "", "toutes les lignes de " + droite + ", même sans correspondance (les colonnes " + (gauche ? "de " + gauche : "de l'autre côté") + " sont alors vides : NULL)");
          if (repete) ligne(niv + 1, "", repete);
          break;
        case "FULL":
          ligne(niv + 1, "", "toutes les lignes des deux côtés, même sans correspondance (les colonnes de l'autre côté sont alors vides : NULL)");
          if (repete) ligne(niv + 1, "", repete);
          break;
        case "CROSS":
          ligne(niv + 1, "", "toutes les combinaisons : chaque ligne avec chaque ligne de " + droite);
          break;
      }
    }
    // Note 3 : LEFT JOIN b, puis une condition sur b dans le WHERE qui ne peut pas être vraie quand b est vide.
    function note3(from, where) {
      var vides = {}, qui = {};
      from.forEach(function (src) {
        var avant = [src.premiere];
        src.jointures.forEach(function (j) {
          var n = cleNom(nomAffichage(j.source));
          if (j.type === "LEFT") { vides[n] = "LEFT"; qui[n] = nomAffichage(j.source); }
          if (j.type === "RIGHT") avant.forEach(function (a) { var k = cleNom(nomAffichage(a)); vides[k] = "RIGHT"; qui[k] = nomAffichage(a); });
          avant.push(j.source);
        });
      });
      var termes = [];
      (function plat(e) { if (e.t === "et") e.termes.forEach(plat); else termes.push(e); })(where);
      function qualif(e) { return e && e.t === "col" && e.parts.length >= 2 ? cleNom(e.parts[e.parts.length - 2]) : null; }
      for (var k = 0; k < termes.length; k++) {
        var t = termes[k], q = null;
        if (t.t === "cmp" && t.d.t !== "null" && t.g.t !== "null") q = vides[qualif(t.g)] ? qualif(t.g) : vides[qualif(t.d)] ? qualif(t.d) : null;
        else if (t.t === "like" || t.t === "in" || t.t === "between") q = vides[qualif(t.e)] ? qualif(t.e) : null;
        else if (t.t === "isnull" && t.non) q = vides[qualif(t.e)] ? qualif(t.e) : null;
        if (!q) continue;
        var genre = vides[q];
        if (t.t === "isnull") note(3, CODE(genre + " JOIN") + " puis, dans le WHERE, " + CODE(t.src) + " : il ne reste que les lignes qui ont une correspondance. " +
          "C'est un JOIN simple écrit autrement : écris JOIN.");
        else note(3, CODE(genre + " JOIN") + " puis, dans le WHERE, " + CODE(t.src) + " : les lignes sans correspondance (où " + qui[q] +
          " est vide) disparaissent, la jointure agit comme un JOIN simple. Pour les garder, mets cette condition dans le ON.");
        return;
      }
    }

    // --- Une requête SELECT, dans l'ordre de calcul ---
    function nomItem(it) { return it.c.alias || (it.c.e.t === "col" ? it.c.e.v : compact(it.c.src)); }
    function definition(it, ctx) {
      var r = tx(it.c.e, ctxNouveau(ctx, { racine: it.c.e, sous: ctx.sous, compteur: ctx.compteur }));
      it.defini = true;
      return it.c.alias ? it.c.alias + " = " + r.t : r.t;
    }
    function selectTrad(s, niv, opts) {
      lien("SELECT", MC);
      var portee = (opts.portee || []).slice();
      var items = s.colonnes.map(function (c, k) {
        return { c: c, k: k + 1, simple: c.e.t === "col" || c.e.t === "etoile", fen: contientFenetre(c.e), aggr: contientAgregat(c.e) };
      });
      items.forEach(function (it) {
        if (!it.c.alias || it.c.e.t !== "fn" || !(it.fen || it.aggr)) return;
        var cle = compact(it.c.e.src);
        items.forEach(function (autre) {
          if (autre === it) return;
          parcourir(autre.c.e, function (x) { if (x.t === "fn" && x !== autre.c.e && compact(x.src) === cle) { x._etiquette = it.c.alias; return false; } }, false);
        });
      });
      var aliasSel = {};
      items.forEach(function (it) {
        if (it.c.alias && !it.simple && !it.c.variable) {
          var a = cleNom(it.c.alias), propre = false;
          parcourir(it.c.e, function (x) { if (x.t === "col" && cleNom(x.parts[x.parts.length - 1]) === a) propre = true; }, false);
          if (!propre) aliasSel[a] = it;
        }
      });
      var stage = false;
      if (s.from) parcourir(s.from, function (x) { if (x.table && /^@/.test(x.table.texte) && !(opts.variablesTable && opts.variablesTable[cleNom(x.table.texte)])) stage = true; }, false);
      var antis = antiJointures(s.from, s.where), infos = infosJointures(s.from, s.where);
      var o2 = { portee: portee, instr: opts.instr, exists: opts.exists, stage: stage || opts.stage, variablesTable: opts.variablesTable,
        antis: antis, agregats: !!s.groupe || items.some(function (it) { return it.aggr; }) };
      if (s.from && !(s.from.length === 1 && !s.from[0].jointures.length && s.from[0].premiere.table && /^DUAL$/i.test(s.from[0].premiere.table.texte))) {
        lien("FROM", MC);
        fromTrad(s.from, niv, portee, o2);
      }
      var base = { portee: portee, instr: opts.instr || "select", alias: aliasSel, stage: o2.stage, infos: infos,
        uneLigne: !s.groupe && items.some(function (it) { return it.aggr && !it.fen; }) };
      if (s.where) {
        lien("WHERE", MC);
        var cw = ctxNouveau(base, { filtre: "where", developper: true });
        if (s.from && s.from.length > 1) cw.compact = true;
        etapeCondition(niv, "GARDER", "les lignes où", s.where, cw);
        if (s.from) note3(s.from, s.where);
        var ka = Object.keys(antis);
        if (ka.length) ligne(niv + 1, "", "→ il ne reste que les lignes " + (antis[ka[0]].gauche ? "de " + antis[ka[0]].gauche : "déjà prises") +
          " qui n'ont aucune correspondance dans " + antis[ka[0]].droite);
        else sensRang(s.where, null, s.from, niv + 1, false);
      }
      if (s.from) notesJointures(s, items, infos);
      if (s.groupe || items.some(function (it) { return it.aggr && !it.fen; }) || (s.having && contientAgregat(s.having))) regrouper(s, items, niv, base);
      if (s.having) { lien("HAVING", MC); etapeCondition(niv, "GARDER", "les groupes où", s.having, ctxNouveau(base, { filtre: "having", developper: true })); }
      var fq = [];
      if (s.qualify) parcourir(s.qualify, function (x) { if (x.t === "fn" && x.over) { fq.push(x); return false; } }, false);
      if (items.some(function (it) { return it.fen; }) || fq.length) calculer(items, fq, niv, base, s);
      if (s.qualify) {
        lien("QUALIFY", MC);
        etapeCondition(niv, "GARDER", "les lignes où", s.qualify, ctxNouveau(base, { filtre: "qualify", developper: true }), " (QUALIFY, après le calcul)");
        sensRang(s.qualify, items, null, niv + 1, false);
      }
      afficher(items, niv, base, opts);
      if (s.distinct) { lien("DISTINCT", MC); ligne(niv, "ENLEVER", "les lignes en double"); }
      return { colonnes: items };
    }
    function etapeCondition(niv, verbe, debut, e, ctx, suffixe) {
      var l = condLignes(e, ctx);
      if (l.length === 1) { emettre(niv, verbe, debut + " " + l[0] + (suffixe || ""), ctx); return; }
      ligne(niv, verbe, debut + (suffixe || "") + " :");
      l.forEach(function (t) { emettre(niv + 1, "", t, ctx); });
    }
    // Le sens d'un filtre sur un numéro de ligne (rn = 1, rn <= 3, rn > 1) : quelles lignes restent.
    function fenetreDe(e, items, from) {
      if (e.t === "fn" && e.over) return /^(ROW_NUMBER|RANK|DENSE_RANK)$/.test(e.nom) && e.over.tri && !e.over.nom ? e : null;
      if (e.t !== "col") return null;
      var n = nomCol(e), r = null;
      function dans(cols) { (cols || []).forEach(function (c) { if (!r && c.alias && cleNom(c.alias) === n && c.e.t === "fn" && c.e.over) r = c.e; }); }
      if (items) dans(items.map(function (it) { return it.c; }));
      if (!r && from) from.forEach(function (src) {
        [src.premiere].concat(src.jointures.map(function (j) { return j.source; })).forEach(function (p) {
          var cte = p.table && p.table.parts.length === 1 ? cteDe(p.table.texte) : null, req = p.req || (cte ? cte.cte.req : null);
          if (req && req.corps && req.corps.t === "select") dans(req.corps.colonnes);
        });
      });
      return r && /^(ROW_NUMBER|RANK|DENSE_RANK)$/.test(r.nom) && r.over.tri && !r.over.nom ? r : null;
    }
    function sensRang(e, items, from, niv, supprime) {
      var termes = [];
      (function plat(x) { if (x.t === "et") x.termes.forEach(plat); else termes.push(x); })(e);
      for (var k = 0; k < termes.length; k++) {
        var t = termes[k];
        if (t.t !== "cmp") continue;
        var op = t.op, g = t.g, d = t.d;
        if (valeurNombre(g) !== null && valeurNombre(d) === null) { var x = g; g = d; d = x; op = { "<": ">", ">": "<", "<=": ">=", ">=": "<=" }[op] || op; }
        var n = valeurNombre(d), f = n !== null && n === Math.floor(n) ? fenetreDe(g, items, from) : null;
        if (!f) continue;
        var garde = op === "=" && n === 1 ? 1 : op === "<=" && n >= 1 ? n : op === "<" && n >= 2 ? n - 1 : 0;
        var sauf = (op === ">" && n === 1) || (op === ">=" && n === 2) || ((op === "<>" || op === "!=") && n === 1);
        if (!garde && !sauf) continue;
        var w = f.over, cs = ctxSimple(), cle = w.tri[0], quoi = dansListe(tx(cle.e, cs)), plus = cle.sens === "DESC" ? "grand" : "petit";
        var groupe = !w.partition ? "" : w.partition.length === 1 ? " de chaque groupe de " + dansListe(tx(w.partition[0], cs)) : " de chaque groupe";
        var la = "la plus " + plus + "e " + valeurDe(quoi), les = "les plus " + plus + "es " + valeursDe(quoi), txt;
        if (sauf) txt = supprime ? "il reste la 1re ligne" + groupe + " : celle qui a " + la : "toutes les lignes sauf la 1re" + groupe + " (celle qui a " + la + ")";
        else if (f.nom !== "ROW_NUMBER") txt = "les lignes " + (garde === 1 ? "au 1er rang" : "des " + garde + " premiers rangs") + groupe + " : celles qui ont " +
          (garde === 1 ? la : les) + " (ex aequo compris)";
        else txt = garde === 1 ? "la 1re ligne" + groupe + " : celle qui a " + la : "les " + garde + " premières lignes" + groupe + " : celles qui ont " + les;
        ligne(niv, "", "→ " + txt);
        return;
      }
    }
    function produit(a, b) { var r = []; a.forEach(function (x) { b.forEach(function (y) { r.push(x.concat(y)); }); }); return r; }
    function sousEnsembles(l) {
      var r = [];
      for (var m = (1 << l.length) - 1; m >= 0; m--) r.push(l.filter(function (x, k) { return m & (1 << (l.length - 1 - k)); }));
      return r.sort(function (a, b) { return b.length - a.length; });
    }
    function regrouper(s, items, niv, base) {
      var ctx = ctxNouveau(base, { developper: true }), g = s.groupe, tete, plusieurs = false, toutCols = null;
      if (!g) tete = "toutes les lignes en un seul groupe (une seule ligne de résultat)";
      else {
        lien("GROUP BY", MC);
        var elt = function (e) {
          var n = valeurNombre(e);
          if (e.t === "nombre" && n >= 1 && n <= items.length && n === Math.floor(n)) return "la " + ordinal(n) + " colonne affichée (" + nomItem(items[n - 1]) + ")";
          return dansListe(tx(e, ctx));
        };
        if (g.tout) {
          lien("GROUP BY ALL");
          toutCols = items.filter(function (it) { return !it.aggr && !it.fen && !it.c.variable; }).map(function (it) {
            return it.c.alias && !it.simple ? it.c.alias + " (c'est-à-dire " + tx(it.c.e, ctx).t + ")" : nomItem(it);
          });
          tete = "par toutes les colonnes affichées qui ne sont pas des calculs de groupe : " + enumerer(toutCols);
        } else {
          var listes = [[]];
          g.elements.forEach(function (el) {
            var choix;
            if (el.t === "expr") choix = [[elt(el.e)]];
            else if (el.t === "ROLLUP") { lien("ROLLUP"); var l1 = el.liste.map(elt); choix = []; for (var k = l1.length; k >= 0; k--) choix.push(l1.slice(0, k)); }
            else if (el.t === "CUBE") { lien("CUBE"); choix = sousEnsembles(el.liste.map(elt)); }
            else { lien("GROUPING SETS"); choix = el.sets.map(function (st) { return st.map(elt); }); }
            listes = produit(listes, choix);
          });
          if (g.avecRollup || g.avecCube) {
            lien(g.avecRollup ? "WITH ROLLUP" : "CUBE");
            var tous = listes[0];
            if (g.avecRollup) { listes = []; for (var k2 = tous.length; k2 >= 0; k2--) listes.push(tous.slice(0, k2)); }
            else listes = sousEnsembles(tous);
          }
          plusieurs = listes.length > 1;
          var premier = listes[0];
          if (!plusieurs) tete = "par " + enumerer(premier);
          else if (premier.length && listes.slice(1).every(function (st) { return st.every(function (x) { return premier.indexOf(x) >= 0; }); })) {
            tete = "par " + enumerer(premier) + listes.slice(1).map(function (st) {
              if (!st.length) return ", plus un total général";
              var manque = premier.filter(function (x) { return st.indexOf(x) < 0; });
              return ", plus un sous-total par " + enumerer(st) + " (sans détailler " + enumerer(manque) + ")";
            }).join("");
          } else tete = "plusieurs fois, puis assembler les résultats : " + listes.map(function (st) { return st.length ? "par " + enumerer(st) : "tout ensemble (total général)"; }).join(" ; ");
        }
      }
      if (toutCols && tete.replace(/\u0001\d+\u0001/g, "").length > 110) {
        ligne(niv, "REGROUPER", "par toutes les colonnes affichées qui ne sont pas des calculs de groupe :");
        toutCols.forEach(function (c) { emettre(niv + 1, "", c, ctx); });
      } else emettre(niv, "REGROUPER", tete, ctx);
      var calc = items.filter(function (it) { return it.aggr && !it.fen && !it.c.variable; });
      if (calc.length) {
        var c2 = ctxNouveau(base, {}), pour = g ? "pour chaque groupe" : "pour ce groupe";
        var gardeOk = base.infos && groupeCoteGarde(s, base.infos);
        var defs = calc.map(function (it) {
          var d = definition(it, c2), e = it.c.e, v = gardeOk && e.t === "fn" && !e.over && /^(SUM|AVG|MIN|MAX)$/.test(e.nom) ? videDe(e, base.infos) : null;
          if (v) d += " (vide" + (/^(SUM|AVG)$/.test(e.nom) ? ", pas 0," : "") + " pour une ligne " + (v.garde ? "de " + v.garde + " " : "") + "sans correspondance)";
          return d;
        });
        if (defs.length === 1) emettre(niv + 1, "", pour + " : " + defs[0], c2);
        else { ligne(niv + 1, "", pour + " :"); defs.forEach(function (d) { emettre(niv + 2, "", d, c2); }); }
      }
      if (plusieurs) ligne(niv + 1, "", "dans les lignes de sous-total et de total, les colonnes qui ne sont pas regroupées sont vides (NULL)");
    }
    function calculer(items, fq, niv, base, s) {
      var ctx = ctxNouveau(base, {}), defs = [], pris = {};
      items.forEach(function (it) { if (it.c.alias) pris[cleNom(it.c.alias)] = true; });
      items.filter(function (it) { return it.fen && !it.c.variable; }).forEach(function (it) {
        var e = it.c.e, m = e.t === "fn" && e.over ? fenetreMorceaux(e, ctx) : null;
        if (m) { it.defini = true; defs.push({ nom: it.c.alias || compact(it.c.src), m: m }); }
        else defs.push({ texte: definition(it, ctx) });
      });
      // Un calcul écrit seulement dans QUALIFY : il prend le nom de sa fonction (« numéro », « rang »), puis on y renvoie (« ce numéro »).
      var cq = ctxNouveau(base, { developper: true, sous: ctx.sous, compteur: ctx.compteur });
      fq.forEach(function (f) {
        var meme = items.filter(function (it) { return it.c.alias && compact(it.c.e.src) === compact(f.src); })[0];
        if (meme) { f._etiquette = meme.c.alias; return; }
        var nc = NOMS_CALCULS[f.nom] || ["calcul", "ce"], nomC = nc[0], k = 2;
        while (pris[cleNom(nomC)]) nomC = nc[0] + " " + (k++);
        pris[cleNom(nomC)] = true;
        var m = fenetreMorceaux(f, cq);
        defs.push(m ? { nom: nomC, m: m } : { texte: nomC + " = " + tx(f, cq).t });
        f._etiquette = nc[1] + " " + nomC;
      });
      // Une fenêtre commune à tous les calculs : écrite une seule fois, dans la ligne CALCULER.
      var str = defs.filter(function (d) { return d.m; }), cle0 = str.length ? str[0].m.part + "|" + str[0].m.ordre : "";
      var commun = str.length >= 2 && str.length === defs.length && (str[0].m.part || str[0].m.ordre) &&
        str.every(function (d) { return !d.m.special && d.m.part + "|" + d.m.ordre === cle0; }) ? str[0].m : null;
      var regroupee = "";
      if (s && s.groupe) {
        var g = s.groupe;
        regroupee = g.tout || g.elements.some(function (el) { return el.t !== "expr"; }) ? " regroupée" :
          " regroupée (une par " + enumerer(g.elements.map(function (el) { return dansListe(tx(el.e, ctx)); })) + ")";
      } else if (base.uneLigne) regroupee = " regroupée";
      var fen = commun ? [commun.part, commun.ordre].filter(Boolean).join(", ") : "", tete = "sur chaque ligne" + regroupee + ", sans regrouper";
      var l = defs.map(function (d) { return d.m ? lignesFenetre(d.nom, d.m, !!commun) : { t: d.texte, sous: [] }; });
      if (fen && (tete + ", " + fen).length + 2 <= 120) tete += ", " + fen;
      else if (fen) l.unshift({ t: "pour tous ces calculs : " + fen, sous: [] });
      if (l.length === 1 && !l[0].sous.length && ("CALCULER " + tete + " : " + l[0].t).replace(/\u0001\d+\u0001/g, "").length <= 120) {
        emettre(niv, "CALCULER", tete + " : " + l[0].t, ctx);
        return;
      }
      ligne(niv, "CALCULER", tete + " :");
      l.forEach(function (x) { emettre(niv + 1, "", x.t, ctx); x.sous.forEach(function (y) { emettre(niv + 2, "", y, ctx); }); });
    }
    function afficher(items, niv, base, opts) {
      if (opts.exists) return;                       // EXISTS : ce que liste le SELECT ne compte pas
      var ctx = ctxNouveau(base, { colonnes: true });
      var aff = items.filter(function (it) { return it.c.variable; });
      if (aff.length) {
        lien("SELECT @var =");
        aff.forEach(function (it) {
          var v = tx(it.c.e, ctx), op = it.c.op;
          var val = op === "=" || op === ":=" ? v : K(it.c.variable + " " + op.charAt(0) + " " + emb(v));
          emettre(niv, "RANGER", "dans " + it.c.variable + " " + (val.p ? val.t : "la valeur " + val.t), ctx);
        });
        var vs = enumerer(aff.map(function (it) { return it.c.variable; }));
        if (!base.uneLigne) {
          ligne(niv + 1, "", "si plusieurs lignes : la valeur de la dernière ligne lue (sans ORDER BY : n'importe laquelle)");
          ligne(niv + 1, "", "si aucune ligne : " + vs + (aff.length > 1 ? " gardent leur" : " garde son") + " ancienne valeur");
        }
        return;
      }
      // 2e partie d'un UNION ou d'un RÉPÉTER : les colonnes prennent les noms de la 1re partie.
      if (opts.noms && opts.noms.length === items.length && !items.some(function (it) { return it.c.e.t === "etoile"; })) {
        var autre = items.some(function (it, k) { var e = it.c.e; return e.t !== "col" || cleNom(e.parts[e.parts.length - 1]) !== cleNom(opts.noms[k]); });
        if (autre) {
          emettre(niv, "AFFICHER", opts.noms.join(", ") + " (les noms viennent " + opts.nomsDe + ")", ctx);
          items.forEach(function (it, k) { emettre(niv + 1, "", opts.noms[k] + " = " + (it.defini && it.c.alias ? it.c.alias : tx(it.c.e, ctx).t), ctx); });
          return;
        }
      }
      var noms = [], defs = [], cas = [];
      items.forEach(function (it) {
        var e = it.c.e;
        if (e.t === "etoile") { noms.push((e.table ? "toutes les colonnes de " + e.table : "toutes les colonnes") + (it.c.sauf ? " sauf " + enumerer(it.c.sauf) : "")); return; }
        if (it.defini) { noms.push(it.c.alias || tx(e, ctxNouveau(ctx, { racine: e, sous: ctx.sous, compteur: ctx.compteur })).t); return; }
        if (e.t === "col") { noms.push(e.v + (it.c.alias && cleNom(it.c.alias) !== cleNom(e.parts[e.parts.length - 1]) ? " (appelée " + it.c.alias + ")" : "")); return; }
        if (!it.c.alias) { noms.push(tx(e, ctx).t); return; }
        noms.push(it.c.alias);
        if (e.t === "case" && (e.quand.length >= 2 || compact(e.src).length > 80)) cas.push(it);
        else defs.push(it.c.alias + " = " + tx(e, ctx).t);
      });
      if (noms.length > 1 && noms.some(function (n) { return /[,;]/.test(n.replace(/\u0001\d+\u0001/g, "")); })) {
        ligne(niv, "AFFICHER", ":");
        noms.forEach(function (n) { emettre(niv + 1, "", n, ctx); });
      } else emettre(niv, "AFFICHER", noms.join(", "), ctx);
      defs.forEach(function (d) { emettre(niv + 1, "", d, ctx); });
      cas.forEach(function (it) {
        lien("CASE", MC);
        ligne(niv + 1, "", it.c.alias + " = " + teteCas(it.c.e, ctx) + " :");
        partiesCas(it.c.e, ctx).forEach(function (t) { emettre(niv + 2, "", t, ctx); });
      });
    }
    function trier(tri, niv, info, opts, tout) {
      if (!tri || opts.exists) return;
      lien("ORDER BY", MC);
      var ctx = ctxNouveau({ portee: opts.portee || [], instr: "select" }, {});
      var cols = info && info.colonnes;
      var parts = tri.map(function (s, k) {
        var n = valeurNombre(s.e), quoi;
        if (s.e.t === "nombre" && cols && n >= 1 && n <= cols.length && n === Math.floor(n)) quoi = "la " + ordinal(n) + " colonne affichée (" + nomItem(cols[n - 1]) + ")";
        else quoi = dansListe(tx(s.e, ctx));
        if (s.nulls) lien("NULLS FIRST");
        return (k ? "puis par " : "") + quoi + ", " + (s.sens === "DESC" ? "du plus grand au plus petit" : "du plus petit au plus grand") +
          (s.nulls ? (s.nulls === "FIRST" ? " (les vides en premier)" : " (les vides en dernier)") : "");
      });
      emettre(niv, "TRIER", (tout ? "le tout par " : "par ") + parts.join(", "), ctx);
    }
    function texteNombre(n) { var ctx = ctxNouveau({}, {}); return n.t === "nombre" || n.t === "var" || n.t === "param" ? n.v : tx(n, ctx).t; }
    function limiter(top, limite, aTri, niv, opts) {
      var n = null, saut = null, pourcent = false, exaequo = false, mot = null;
      if (top) { n = top.n; pourcent = top.pourcent; exaequo = top.exaequo; mot = "TOP"; lien("TOP", MC); if (exaequo) lien("WITH TIES"); }
      if (limite) {
        if (limite.n) { n = limite.n; mot = limite.fetch ? "FETCH" : "LIMIT"; }
        saut = limite.saut || null;
        pourcent = pourcent || limite.pourcent; exaequo = exaequo || limite.exaequo;
        lien(limite.fetch || (saut && !limite.virgule && !limite.n) ? "OFFSET" : "LIMIT");
        if (!mot) mot = "OFFSET";
      }
      if (!n && !saut) return;
      if (saut) { lien("OFFSET"); var st = texteNombre(saut); ligne(niv, "SAUTER", st === "1" ? "la première ligne" : "les " + st + " premières lignes"); }
      if (n) {
        var nt = texteNombre(n), ph;
        if (pourcent) ph = nt + " % des lignes (arrondi au nombre entier supérieur)";
        else if (saut) ph = nt === "1" ? "la ligne suivante" : "les " + nt + " lignes suivantes";
        else ph = nt === "1" ? "la première ligne" : "les " + nt + " premières lignes";
        if (exaequo) ph += ", plus celles ex aequo avec la dernière gardée (même valeur de tri) ; il peut en sortir plus de " + nt;
        emettre(niv, "GARDER", ph, ctxSimple());
      }
      if (!aTri && !opts.exists) note(5, CODE(mot) + " sans ORDER BY : les lignes gardées ne sont pas choisies dans un ordre garanti ; elles peuvent changer d'une fois à l'autre.");
    }
    function intoTrad(into, niv) {
      if (!into) return;
      if (into.table) {
        lien("SELECT INTO", { categorie: "Modifier" });
        var t = into.table.texte;
        if (/^#/.test(t)) lien("#temp");
        ligne(niv, "CRÉER", (/^##/.test(t) ? "la table temporaire globale " : /^#/.test(t) ? "la table temporaire " : "la table ") + t +
          " avec ce résultat (une nouvelle table : erreur si elle existe déjà)");
      } else if (into.variables) {
        lien("SET @variable");
        ligne(niv, "RANGER", "le résultat dans " + enumerer(into.variables) + " (aucune table n'est créée ; il faut une seule ligne de résultat)");
      } else if (into.fichier) ligne(niv, "ÉCRIRE", "le résultat dans le fichier " + into.fichier + " (INTO OUTFILE)");
    }
    function requete(r, niv, opts) {
      opts = opts || {};
      var pile = pileCte.length, c = r.corps;
      if (r.avec) preparer(r.avec, niv, opts);
      var info = null;
      if (c.t === "select") {
        info = selectTrad(c, niv, opts);
        trier(r.tri, niv, info, opts, false);
        limiter(c.top, r.limite, !!r.tri, niv, opts);
      } else {
        if (c.t === "ensemble") info = { colonnes: ensembleTrad(c, niv, opts) };
        else if (c.t === "requete") requete(c, niv, opts);
        else if (c.t === "valeurs") { ligne(niv, "PRENDRE", "les lignes écrites dans la requête :"); lignesValeurs(c.lignes, niv + 1, ctxNouveau({}, {})); }
        trier(r.tri, niv, info, opts, true);
        limiter(null, r.limite, !!r.tri, niv, opts);
      }
      if (r.pour) {
        if (r.pour.genre === "XML") ligne(niv, "COLLER", "toutes les lignes en un seul texte XML (FOR XML " + compact(r.pour.texte) + ")");
        else ligne(niv, "ÉCRIRE", "le résultat en " + r.pour.genre + " (FOR " + r.pour.genre + " " + compact(r.pour.texte) + ")");
      }
      if (r.options) ligne(niv, "", "(options de la requête : " + compact(r.options) + ")");
      intoTrad((c.t === "select" && c.into) || r.into, niv);
      pileCte.length = pile;
    }
    // Les noms des colonnes d'un résultat (null si une colonne n'a pas de nom).
    function nomsResultat(cols) {
      if (!cols) return null;
      var l = cols.map(function (it) { return it.c.alias || (it.c.e.t === "col" ? it.c.e.parts[it.c.e.parts.length - 1] : null); });
      return l.every(function (x) { return x; }) ? l : null;
    }
    function avecNoms(opts, noms, de) {
      var o = {};
      for (var k in opts) if (Object.prototype.hasOwnProperty.call(opts, k)) o[k] = opts[k];
      o.noms = noms; o.nomsDe = de;
      return o;
    }
    function brancheTrad(f, niv, opts) {
      if (f.t === "select") { var info = selectTrad(f, niv, opts); limiter(f.top, null, false, niv, opts); intoTrad(f.into, niv); return info.colonnes; }
      if (f.t === "requete") { requete(f, niv, opts); return null; }
      if (f.t === "valeurs") { ligne(niv, "PRENDRE", "les lignes écrites dans la requête :"); lignesValeurs(f.lignes, niv + 1, ctxNouveau({}, {})); }
      return null;
    }
    function ensembleTrad(e, niv, opts) {
      var feuilles = [], internes = [], premieres = null;
      (function voir(n, parent) {
        n._parent = parent;
        if (n.t === "ensemble") { voir(n.g, n); voir(n.d, n); internes.push(n); }
        else { feuilles.push(n); n._num = feuilles.length; }
      })(e, null);
      var premNoms = null;
      feuilles.forEach(function (f, k) {
        ligne(niv, "REQUÊTE " + (k + 1), ":");
        var cols = brancheTrad(f, niv + 1, k && premNoms ? avecNoms(opts, premNoms, "de la requête 1") : opts);
        if (!k) { premieres = cols; premNoms = nomsResultat(cols); }
      });
      internes.forEach(function (n, k) { n._etape = k; });
      var lettre = 0;
      internes.forEach(function (n) { if (n._parent && n._parent._etape !== n._etape + 1) n._nom = "le résultat " + "ABCDEFGHIJKLMNOP".charAt(lettre++); });
      var avecNull = false;
      internes.forEach(function (n) {
        function ref(x) { return P(x.t === "ensemble" ? (x._nom || "ce résultat") : "la requête " + x._num); }
        var X = ref(n.g), Y = ref(n.d), op = n.op, v, t;
        lien(op === "UNION" && n.tout ? "UNION ALL" : op, MC);
        if (!n.tout) avecNull = true;
        if (op === "UNION") { v = "ASSEMBLER"; t = "les lignes " + prep("de", X) + " et " + prep("de", Y) + (n.tout ? ", à la suite : les doublons restent (UNION ALL)" : ", sans les lignes en double (UNION)"); }
        else if (op === "INTERSECT") { v = "GARDER"; t = "les lignes présentes à la fois dans " + X.t + " et dans " + Y.t + (n.tout ? ", doublons compris (INTERSECT ALL)" : ", sans doublons (INTERSECT)"); }
        else { v = "GARDER"; t = "les lignes " + prep("de", X) + " qui ne sont pas dans " + Y.t + (n.tout ? ", doublons compris (" + op + " ALL)" : ", sans doublons (" + op + (op === "MINUS" ? ", comme EXCEPT" : "") + ")"); }
        if (op === "INTERSECT" && n._parent && n._parent.op !== "INTERSECT" && n._parent.d === n && !n.paren) t += " ; INTERSECT est calculé avant " + n._parent.op;
        if (n.parNom) t += " ; les colonnes sont associées par leur nom (BY NAME)";
        if (n._nom) t += " → " + n._nom.replace(/^le /, "");
        emettre(niv, v, t, ctxSimple());
      });
      if (avecNull) ligne(niv + 1, "", "(pour repérer les doublons, deux NULL comptent comme égaux)");
      return premieres;
    }
    function citeSoiMeme(n, cle) {
      return contientSource(n, function (p) { return p.table && p.table.parts.length === 1 && cleNom(p.table.court) === cle; });
    }
    function contientSource(n, test) { var oui = false; parcourir(n, function (x) { if (oui) return false; if ((x.table || x.req || x.fonction) && x.d !== undefined && test(x)) { oui = true; return false; } }, true); return oui; }
    function preparer(liste, niv, opts) {
      lien("WITH (CTE)", MC);
      liste.forEach(function (c) {
        var cle = cleNom(c.nom), cols = c.colonnes ? " (colonnes " + c.colonnes.join(", ") + ")" : "";
        pileCte.push({ cle: cle, cte: c });
        var corps = c.req.corps;
        if (citeSoiMeme(c.req, cle) && corps.t === "ensemble") {
          lien("CTE récursive");
          ligne(niv, "PRÉPARER", "« " + c.nom + " »" + cols + " : une requête récursive (elle se cite elle-même" + (c.recursif ? "" : ", même sans le mot RECURSIVE") + ") :");
          var branches = [], ops = [];
          (function plat(n) { if (n.t === "ensemble" && (n.op === "UNION")) { plat(n.g); ops.push(n.tout); plat(n.d); } else branches.push(n); })(corps);
          var depart = branches.filter(function (b) { return !citeSoiMeme(b, cle); }), rep = branches.filter(function (b) { return citeSoiMeme(b, cle); });
          ligne(niv + 1, "DÉPART", ":");
          var nomsDepart = c.colonnes ? c.colonnes.slice() : null, nomsDe = c.colonnes ? "de la liste de « " + c.nom + " »" : "du DÉPART";
          depart.forEach(function (b, k) {
            if (depart.length > 1) ligne(niv + 2, "", "partie " + (k + 1) + " :");
            var cols = brancheTrad(b, niv + 2 + (depart.length > 1 ? 1 : 0), opts);
            if (!nomsDepart) nomsDepart = nomsResultat(cols);
          });
          ligne(niv + 1, "RÉPÉTER", "tant que de nouvelles lignes arrivent (« " + c.nom + " » = les lignes trouvées au tour d'avant) :");
          var avant = enRecursion;
          enRecursion = cle;
          rep.forEach(function (b, k) {
            if (rep.length > 1) ligne(niv + 2, "", "partie " + (k + 1) + " :");
            brancheTrad(b, niv + 2 + (rep.length > 1 ? 1 : 0), nomsDepart ? avecNoms(opts, nomsDepart, nomsDe) : opts);
          });
          enRecursion = avant;
          var tousAll = ops.every(function (x) { return x; });
          ligne(niv + 1, "EMPILER", "les lignes du départ et de tous les tours" + (tousAll ? " (UNION ALL : les doublons restent)" : " (UNION : sans les lignes en double)"));
        } else {
          ligne(niv, "PRÉPARER", "« " + c.nom + " »" + cols + " :");
          requete(c.req, niv + 1, opts);
        }
      });
    }

    // --- Les instructions qui modifient ---
    function affsTexte(l, ctx) {
      return l.map(function (a) {
        var v = tx(a.val, ctx);
        return a.cible + " = " + (a.op === "=" || a.op === ":=" ? v.t : a.cible + " " + a.op.charAt(0) + " " + emb(v));
      });
    }
    function mettre(l, niv, ctx, verbe) {
      var t = affsTexte(l, ctx), une = t.join(", ");
      if (une.replace(/\u0001\d+\u0001/g, "").length <= 100) { emettre(niv, verbe || "METTRE", une, ctx); return; }
      ligne(niv, verbe || "METTRE", ":");
      t.forEach(function (x) { emettre(niv + 1, "", x, ctx); });
    }
    function sortie(o, niv, ctx) {
      if (!o) return;
      lien("OUTPUT");
      var cols = o.colonnes.map(function (c) { return c.alias ? c.alias + " = " + tx(c.e, ctx).t : tx(c.e, ctx).t; });
      ligne(niv, "RENVOYER", "pour chaque ligne touchée : " + cols.join(", ") + " (inserted = la nouvelle valeur, deleted = l'ancienne)" +
        (o.into ? " ; rangé dans " + o.into + (o.intoCols ? " (" + o.intoCols.join(", ") + ")" : "") : ""));
    }
    function trouverSource(liste, nom) {
      var k = cleNom(nom), r = null;
      (liste || []).forEach(function (src) {
        [src.premiere].concat(src.jointures.map(function (j) { return j.source; })).forEach(function (p) {
          if (!r && (cleNom(p.alias) === k || (p.table && (cleNom(p.table.court) === k || cleNom(p.table.texte) === k)))) r = p;
        });
      });
      return r;
    }
    function dmlFrom(liste, cible, niv, portee, opts, dml) {
      var avant = cible ? [cleNom(nomAffichage(cible))] : [];
      liste.forEach(function (src, k) {
        if (src.premiere !== cible) avant.push(cleNom(nomAffichage(src.premiere)));
        if (src.premiere !== cible) {
          var d = decrire(src.premiere, portee, opts);
          ligne(niv, "RELIER", d.texte + (k || cible ? " : toutes les combinaisons ; le lien est dans le WHERE" : "") + (d.bloc ? " :" : ""));
          if (d.bloc) d.bloc(niv + 1);
          apresLignes(d, niv);
        }
        src.jointures.forEach(function (j) { if (j.source !== cible) jointureLigne(j, niv, portee, opts, null, dml, avant); avant.push(cleNom(nomAffichage(j.source))); });
      });
    }
    function quantite(s) {
      var n = s.top ? texteNombre(s.top.n) : s.limite ? texteNombre(s.limite.n) : null;
      if (n === null) return "";
      return "au plus " + n + (s.top && s.top.pourcent ? " % des lignes de " : n === "1" ? " ligne de " : " lignes de ");
    }
    function apresDml(s, niv, ctx, quoi, verbeMot, participe) {
      if (s.where) etapeCondition(niv + 1, "", "seulement les lignes où", s.where, ctx);
      if (s.courant) ligne(niv + 1, "", "seulement la ligne où se trouve le curseur " + s.courant + " (WHERE CURRENT OF)");
      if (s.tri) ligne(niv + 1, "", "en prenant les lignes dans cet ordre : " + triTexte(s.tri, ctx));
      if ((s.top || s.limite) && !s.tri)
        note(5, CODE(s.top ? verbeMot + " TOP (" + texteNombre(s.top.n) + ")" : verbeMot + " … LIMIT " + texteNombre(s.limite.n)) +
          " : les lignes " + participe + " sont prises sans ordre garanti" + (s.top ? " (on ne peut pas écrire d'ORDER BY ici)" : " (pas d'ORDER BY)") + ".");
    }
    function updateTrad(s, niv) {
      lien("UPDATE", MC);
      if (s.avec) preparer(s.avec, niv, {});
      var portee = [], opts = { instr: "update" }, ctx = ctxNouveau({ portee: portee, instr: "update" }, { filtre: "where" });
      var c0 = s.cible.premiere, nomC = nomAffichage(c0);
      var def = s.from ? trouverSource(s.from, c0.table ? c0.table.texte : nomC) : null;
      var tout = !s.where && !s.from && !s.cible.jointures.length && !s.top && !s.limite && !s.courant;
      var d = decrire(def || c0, portee, opts), cible = nomAffichage(def || c0);
      ligne(niv, "MODIFIER", (tout ? "toutes les lignes de " : quantite(s)) + d.texte);
      var dml = { cible: cible, participe: "modifiée" };
      if (s.cible.jointures.length) {
        lien("UPDATE JOIN");
        var avant = [cleNom(nomAffichage(c0))];
        s.cible.jointures.forEach(function (j) { jointureLigne(j, niv + 1, portee, opts, null, dml, avant); avant.push(cleNom(nomAffichage(j.source))); });
      }
      if (s.from) { lien("UPDATE FROM"); dmlFrom(s.from, def, niv + 1, portee, opts, dml); }
      apresDml(s, niv, ctx, "", "UPDATE", "modifiées");
      if (s.from && (s.from.length > 1 || s.from[0].jointures.length) || s.cible.jointures.length)
        ligne(niv + 1, "", "les autres tables ne sont pas modifiées : seules des lignes de " + cible + " changent");
      mettre(s.set, niv, ctxNouveau({ portee: portee, instr: "update" }, {}));
      if (tout) note(4, CODE("UPDATE") + " sans WHERE : toutes les lignes de la table " + (c0.table ? c0.table.texte : nomC) + " sont modifiées.");
      sortie(s.output, niv, ctx);
    }
    function tableSousCte(c) {
      var r = c.req, cps = r.corps;
      if (cps.t === "select" && cps.from && cps.from.length === 1 && !cps.from[0].jointures.length && cps.from[0].premiere.table) return cps.from[0].premiere.table.texte;
      return null;
    }
    function deleteTrad(s, niv) {
      lien("DELETE", MC);
      if (s.avec) preparer(s.avec, niv, {});
      var portee = [], opts = { instr: "delete" }, ctx = ctxNouveau({ portee: portee, instr: "delete" }, { filtre: "where" });
      var nomC = s.cibles ? s.cibles[0] : nomAffichage(s.cible);
      var liste = s.from || null, def = liste ? trouverSource(liste, nomC) : null;
      var tout = !s.where && !s.from && !s.using && !s.top && !s.limite && !s.courant;
      var quoi = tout ? "toutes les lignes de " : quantite(s) || "des lignes de ";
      var cte = !def && s.cible && s.cible.table && s.cible.table.parts.length === 1 ? cteDe(s.cible.table.texte) : null;
      if (cte) {
        var sous = tableSousCte(cte.cte);
        ligne(niv, "SUPPRIMER", quoi + "« " + s.cible.table.texte + " » : ce sont les lignes de " + (sous ? "la table " + sous : "la table sous « " + s.cible.table.texte + " »") + " qui sont supprimées");
      } else {
        var d = decrire(def || s.cible || { table: { texte: nomC, court: nomC, parts: [nomC] } }, portee, opts);
        ligne(niv, "SUPPRIMER", quoi + d.texte + (s.cibles && s.cibles.length > 1 ? ", et des lignes de " + enumerer(s.cibles.slice(1)) : ""));
      }
      var dml = { cible: def ? nomAffichage(def) : nomC, participe: "supprimée" };
      if (liste) { lien("DELETE FROM"); dmlFrom(liste, def, niv + 1, portee, opts, dml); }
      if (s.using) { lien("DELETE USING"); dmlFrom(s.using, null, niv + 1, portee, opts, dml); }
      apresDml(s, niv, ctx, quoi, "DELETE", "supprimées");
      if (s.where && cte) sensRang(s.where, null, [{ premiere: s.cible, jointures: [] }], niv + 2, true);
      if ((liste && liste.some(function (src) { return src.jointures.length || src !== liste[0]; })) || s.using)
        ligne(niv + 1, "", "les autres tables ne sont pas touchées : seules des lignes de " + (s.cibles ? enumerer(s.cibles) : nomC) + " sont supprimées");
      if (tout) note(4, CODE("DELETE") + " sans WHERE : toutes les lignes de la table " + nomC + " sont supprimées (la table reste, vide).");
      sortie(s.output, niv, ctx);
    }
    function insertTrad(s, niv) {
      if (s.avec) preparer(s.avec, niv, {});
      lien(s.req ? "INSERT … SELECT" : "INSERT", MC);
      var t = s.table.texte, cols = s.colonnes ? " (colonnes " + s.colonnes.join(", ") + ")" : "";
      var ctx = ctxNouveau({ portee: [], instr: "insert" }, {});
      var dans = (/^#/.test(t) ? "dans la table temporaire " : "dans la table ") + t + cols;
      if (/^#/.test(t)) lien("#temp");
      var verbe = "AJOUTER", top = s.top ? "au plus " + texteNombre(s.top.n) + " lignes " : "";
      if (s.ecraser) ligne(niv, "VIDER", "la table " + t + " (INSERT OVERWRITE), puis :");
      if (s.lignes) {
        var n = s.lignes.length;
        ligne(niv, verbe, (n === 1 ? "1 ligne " : n + " lignes ") + dans + " :");
        lignesValeurs(s.lignes, niv + 1, ctx);
      } else if (s.req) {
        ligne(niv, verbe, top + dans + " le résultat de :");
        requete(s.req, niv + 1, { instr: "insert" });
        if (s.colonnes) ligne(niv + 1, "", "dans l'ordre : la 1re colonne affichée va dans " + s.colonnes[0] +
          (s.colonnes.length > 1 ? ", la 2e dans " + s.colonnes[1] + (s.colonnes.length > 2 ? ", et ainsi de suite" : "") : ""));
      } else if (s.defaut) ligne(niv, verbe, "1 ligne " + dans + ", avec les valeurs par défaut");
      else if (s.set) emettre(niv, verbe, "1 ligne " + dans + " : " + affsTexte(s.set, ctx).join(", "), ctx);
      else if (s.exec) { ligne(niv, verbe, dans + " le résultat de :"); instr(s.exec, niv + 1); }
      if (s.remplacer) {
        ligne(niv + 1, "", "REPLACE : si une ligne avec la même clé (primaire ou UNIQUE) existe déjà :");
        ligne(niv + 2, "", "elle est d'abord SUPPRIMÉE, puis la nouvelle est ajoutée");
        ligne(niv + 2, "", "les colonnes non citées prennent leur valeur par défaut (ce n'est pas une modification)");
      }
      if (s.ignorer) {
        ligne(niv + 1, "", "INSERT IGNORE :");
        ligne(niv + 2, "", "une ligne qui ferait un doublon de clé est sautée, sans erreur");
        ligne(niv + 2, "", "une valeur invalide est ajustée (texte trop long coupé) avec un simple avertissement");
      }
      if (s.doublon) {
        lien("ON DUPLICATE KEY UPDATE");
        ligne(niv + 1, "", "ON DUPLICATE KEY UPDATE : si une ligne avec la même clé primaire, ou la même valeur d'un index UNIQUE, existe déjà :");
        ligne(niv + 2, "", "ne pas l'ajouter, mais MODIFIER la ligne existante :");
        mettre(s.doublon, niv + 3, ctxNouveau({ portee: [], instr: "insert" }, { doublon: { table: cleNom(s.table.court || t), alias: s.aliasLignes ? cleNom(s.aliasLignes) : null } }));
      }
      if (s.top) note(5, CODE("INSERT TOP (" + texteNombre(s.top.n) + ")") + " : les lignes ajoutées sont prises sans ordre garanti (on ne peut pas écrire d'ORDER BY ici).");
      sortie(s.output, niv, ctx);
    }
    function mergeTrad(s, niv) {
      lien("MERGE", MC);
      if (s.avec) preparer(s.avec, niv, {});
      var portee = [], opts = { instr: "merge" };
      var dc = decrire(s.cible, portee, opts), ds = decrire(s.source, portee, opts);
      var ctx = ctxNouveau({ portee: portee, instr: "merge" }, { compact: true, filtre: "on" });
      function role(p, d, nom) {
        if (p.table) return nom + " " + d.texte.replace(/^la table /, "");
        return p.alias && d.texte.indexOf("(appelée " + p.alias + ")") >= 0 ? d.texte.replace("(appelée " + p.alias + ")", "(appelée " + p.alias + ", " + nom + ")") : d.texte + " (" + nom + ")";
      }
      var tete = role(s.source, ds, "la source") + " dans " + role(s.cible, dc, "la cible"), lienM = "en reliant quand " + cond(s.on, ctx);
      if (("FUSIONNER " + tete + ", " + lienM).replace(/\u0001\d+\u0001/g, "").length <= 120) emettre(niv, "FUSIONNER", tete + ", " + lienM, ctx);
      else { ligne(niv, "FUSIONNER", tete); emettre(niv + 1, "", lienM, ctx); }
      if (ds.bloc) { ligne(niv + 1, "", "la source :"); ds.bloc(niv + 2); }
      ligne(niv + 1, "", "les cas WHEN sont testés dans l'ordre : le premier qui convient s'applique");
      var vus = {}, modifie = false;
      s.quand.forEach(function (w) {
        var clause = w.genre === "existe" ? "WHEN MATCHED AND" : w.genre === "absent" ? "WHEN NOT MATCHED AND" : "WHEN NOT MATCHED BY SOURCE AND";
        var participe = w.action === "supprimer" ? "supprimée" : w.action === "modifier" ? "mise à jour" : "ajoutée";
        var cx = ctxNouveau({ portee: portee, instr: "merge" }, { filtre: "matched", merge: { clause: clause, action: participe, cible: cleNom(nomAffichage(s.cible)),
          colonnes: (w.set || []).map(function (a) { return a.cible; }) } }), si, verbe, act;
        si = w.genre === "existe" ? "si la ligne de la source a une correspondance dans la cible" :
          w.genre === "absent" ? "si la ligne de la source n'a pas de correspondance dans la cible" : "si une ligne de la cible n'a pas de correspondance dans la source";
        if (vus[w.genre]) si = "sinon, " + si;
        vus[w.genre] = true;
        if (w.genre === "existe") modifie = true;
        if (w.cond) si += ", et que " + cond(w.cond, cx);
        if (w.action === "supprimer") { verbe = "SUPPRIMER"; act = "cette ligne de la cible"; }
        else if (w.action === "modifier") { verbe = "METTRE"; act = affsTexte(w.set, cx).join(", "); }
        else {
          verbe = "AJOUTER";
          act = "une ligne dans la cible" + (w.colonnes ? " (" + w.colonnes.join(", ") + ")" : "") +
            (w.defaut ? ", avec les valeurs par défaut" : (w.colonnes && w.colonnes.length > 2 ? "\u0004" : " ") + "avec (" + (w.valeurs || []).map(function (v) { return tx(v, cx).t; }).join(", ") + ")");
        }
        if ((si + " : " + verbe + " " + act).replace(/\u0001\d+\u0001/g, "").length <= 120) emettre(niv + 1, "", si + " : " + verbe + " " + act, cx);
        else { emettre(niv + 1, "", si + " :", cx); emettre(niv + 2, verbe, act, cx); }
        if (w.genre === "absentSource" && w.action === "supprimer") ligne(niv + 2, "", "attention : si la source est partielle (un fichier, un client…), les autres lignes de la cible sont supprimées");
      });
      if (!vus.absentSource) ligne(niv + 1, "", "les lignes de la cible absentes de la source ne changent pas");
      if (modifie) {
        ligne(niv + 1, "", "si plusieurs lignes de la source correspondent à la même ligne de la cible");
        ligne(niv + 2, "", "et qu'une clause WHEN MATCHED doit la modifier ou la supprimer : erreur (réglages par défaut)");
      }
      if (s.top) note(5, CODE("MERGE TOP (" + texteNombre(s.top.n) + ")") + " : les lignes touchées sont prises sans ordre garanti.");
      sortie(s.output, niv, ctx);
    }

    // --- Créer, modifier, supprimer des objets ---
    function actionsTexte(c) {
      var l = [];
      [["surSuppr", "supprimée"], ["surModif", "modifiée"]].forEach(function (x) {
        var a = c[x[0]];
        if (!a) return;
        if (a === "CASCADE") l.push("si la ligne visée est " + x[1] + ", cette ligne l'est aussi (CASCADE)");
        else if (a === "SET NULL") l.push("si la ligne visée est " + x[1] + ", cette colonne est vidée (SET NULL)");
        else if (a === "SET DEFAULT") l.push("si la ligne visée est " + x[1] + ", cette colonne reprend sa valeur par défaut");
        else l.push("la ligne visée ne peut pas être " + x[1] + " tant qu'elle est utilisée (" + a + ")");
      });
      return l.length ? " ; " + l.join(" ; ") : "";
    }
    function colonneTexte(c, ctx) {
      var l = [];
      if (c.calcul) l.push("calculée : " + tx(c.calcul, ctx).t);
      else { l.push(typeTexte(c.type)); lien(c.type.nom, { categorie: "Tables" }); }
      if (c.cle) { l.push("clé primaire"); lien("PRIMARY KEY"); }
      if (c.obligatoire) { l.push("obligatoire (NOT NULL)"); lien("NOT NULL"); }
      if (c.unique) { l.push("valeur unique"); lien("UNIQUE"); }
      if (c.auto) {
        var pas = c.autoPas ? String(c.autoPas) : "1";
        l.push("numéro automatique" + (c.autoDebut ? " (commence à " + c.autoDebut + ", " + (pas.charAt(0) === "-" ? pas : "+" + pas) + " à chaque ligne)" : ""));
        lien("IDENTITY");
      }
      var t = c.nom + " : " + l.join(", ");
      if (c.defaut) { t += " ; par défaut : " + tx(c.defaut, ctx).t; lien("DEFAULT"); }
      if (c.check) { t += " ; règle : " + cond(c.check, ctx); lien("CHECK"); }
      if (c.ref) {
        lien("FOREIGN KEY");
        var vide = !c.obligatoire && !c.cle, dans = "doit exister dans " + c.ref + (c.refCols ? " (" + c.refCols.join(", ") + ")" : "") + " (clé étrangère)";
        t += " ; " + (vide ? "s'il est rempli, il " + dans + " ; vide (NULL) permis" : dans) + actionsTexte(c);
      }
      return t;
    }
    function contrainteTexte(c, ctx) {
      var n = c.nom ? " (" + c.nom + ")" : "";
      if (c.genre === "cle") { lien("PRIMARY KEY"); return "clé primaire" + n + " : " + enumerer(c.cols) + (c.cols.length > 1 ? " ensemble" : "") + " (jamais deux fois la même valeur, jamais vide)"; }
      if (c.genre === "etrangere") { lien("FOREIGN KEY"); return "clé étrangère" + n + " : " + enumerer(c.cols) + " doit exister dans " + c.ref + (c.refCols ? " (" + c.refCols.join(", ") + ")" : "") + actionsTexte(c); }
      if (c.genre === "unique") { lien("UNIQUE"); return "valeur unique" + n + " pour " + enumerer(c.cols) + (c.cols.length > 1 ? " ensemble" : ""); }
      if (c.genre === "check") { lien("CHECK"); return "règle" + n + " : " + cond(c.check, ctx); }
      return "index" + (c.nomIndex ? " " + c.nomIndex : "") + " sur " + enumerer(c.cols);
    }
    function objetCree(s, nom, genreF) {
      var m = s.mods || [];
      var temp = m.indexOf("TEMPORARY") >= 0 || m.indexOf("TEMP") >= 0 || m.indexOf("VOLATILE") >= 0;
      return (temp ? "la table temporaire " : m.indexOf("TRANSIENT") >= 0 ? "la table transitoire (sans protection Fail-safe) " : genreF) + nom;
    }
    function ouAutre(s, f) { return s.ouModifier ? " (ou " + (f ? "la " : "le ") + "modifier si " + (f ? "elle" : "il") + " existe)" : s.ouRemplacer ? " (ou " + (f ? "la " : "le ") + "remplacer si " + (f ? "elle" : "il") + " existe)" : ""; }
    function createTrad(s, niv) {
      var ctx = ctxNouveau({ portee: [], instr: "create" }, {});
      if (s.t === "create-table") {
        lien("CREATE TABLE", MC);
        if (s.req) lien("CREATE TABLE AS SELECT", MC);
        var nomT = objetCree(s, s.nom, "la table "), si = s.siAbsent ? " (si elle n'existe pas déjà)" : "";
        if (/^#/.test(s.nom)) { lien("#temp"); nomT = "la table temporaire " + s.nom; }
        var remplace = "si elle existe déjà, elle est REMPLACÉE : l'ancienne table et toutes ses lignes disparaissent";
        if (s.comme) ligne(niv, "CRÉER", nomT + si + ", avec la même structure que " + s.comme + " (sans les lignes)");
        else if (s.clone) { lien("CLONE"); ligne(niv, "CRÉER", nomT + si + ", copie de " + s.clone + (s.cloneVoyage ? " telle qu'elle était à un moment passé" : "") + " (CLONE : sans recopier les données sur le disque)"); }
        else if (s.req && s.ouRemplacer) {
          ligne(niv, "CRÉER", nomT + si + " avec le résultat de la requête ci-dessous");
          ligne(niv + 1, "", remplace);
          ligne(niv + 1, "", "la requête :");
          requete(s.req, niv + 2, { instr: "select" });
        } else if (s.req) {
          ligne(niv, "CRÉER", nomT + si + " avec le résultat de :");
          requete(s.req, niv + 1, { instr: "select" });
        } else {
          ligne(niv, "CRÉER", nomT + si + (s.colonnes ? ", avec les colonnes :" : ""));
          if (s.ouRemplacer) ligne(niv + 1, "", remplace);
          (s.colonnes || []).forEach(function (c) { emettre(niv + 1, "", c.t === "colonne" ? colonneTexte(c, ctx) : "règle : " + contrainteTexte(c, ctx), ctx); });
        }
        return;
      }
      if (s.t === "create-view") {
        lien("CREATE VIEW", MC);
        ligne(niv, s.alter ? "MODIFIER" : "CRÉER", "la vue " + s.nom + ouAutre(s, true) + (s.colonnes ? " (colonnes " + s.colonnes.join(", ") + ")" : "") + ", qui donne le résultat de :");
        requete(s.req, niv + 1, { instr: "select" });
        if (s.verifie) ligne(niv + 1, "", "WITH CHECK OPTION : une ligne ajoutée ou modifiée par la vue doit rester visible dans la vue");
        return;
      }
      if (s.t === "create-index") {
        lien("CREATE INDEX", MC);
        var u = (s.mods || []).indexOf("UNIQUE") >= 0;
        ligne(niv, "CRÉER", "l'index " + s.nom + " sur la table " + s.table + " (colonnes " + s.cols.join(", ") + ")" + (u ? " : deux lignes ne peuvent pas avoir les mêmes valeurs" : ""));
        if (s.inclus) { lien("INCLUDE"); ligne(niv + 1, "", "colonnes recopiées dans l'index (INCLUDE) : " + s.inclus.join(", ")); }
        if (s.where) etapeCondition(niv + 1, "", "seulement les lignes où", s.where, ctx);
        return;
      }
      if (s.t === "create-objet") {
        var genres = { SCHEMA: "le schéma ", DATABASE: "la base ", SEQUENCE: "la séquence " };
        ligne(niv, "CRÉER", genres[s.objet] + s.nom + (s.siAbsent ? " (s'il n'existe pas déjà)" : ""));
        return;
      }
      // procédure ou fonction
      var proc = s.genre === "procedure";
      lien(proc ? "CREATE PROCEDURE" : "CREATE FUNCTION", MC);
      ligne(niv, s.alter ? "MODIFIER" : "CRÉER", (proc ? "la procédure " : "la fonction ") + s.nom + ouAutre(s, true));
      if (s.params.length) ligne(niv + 1, "", s.params.length === 1 ? "son paramètre :" : "ses " + s.params.length + " paramètres :");
      s.params.forEach(function (p) {
        emettre(niv + 2, "", p.nom + " : " + typeTexte(p.type) + (p.defaut ? ", " + tx(p.defaut, ctx).t + " par défaut" : "") +
          (p.sortie || p.mode === "OUT" || p.mode === "INOUT" ? "\u0005en sortie (" + (p.mode || "OUTPUT") + " : la valeur revient à l'appelant)" : ""), ctx);
      });
      if (s.retour) {
        var rt = s.retour;
        ligne(niv + 1, "", "elle renvoie : " + (rt.type ? typeTexte(rt.type) : rt.variable ? "la variable table " + rt.variable : "une table"));
      }
      if (s.corpsTexte) { corpsTexteTrad(s, niv + 1); return; }
      if (!s.corps) return;
      ligne(niv + 1, "", "ce qu'elle fait" + (s.lot ? " (jusqu'au GO suivant, ou jusqu'à la fin du texte)" : "") + " :");
      var corps = s.corps.length === 1 && s.corps[0].t === "bloc" && !s.corps[0].exceptions ? s.corps[0].corps : s.corps;
      corps.forEach(function (st) { instr(st, niv + 2); });
      if (s.lot && s.corps.length > 1) {
        var der = s.corps[s.corps.length - 1];
        if (der.t === "exec" && der.nom && cleNom(der.nom.texte) === cleNom(s.nom))
        { ligne(niv + 1, "", "attention : sans GO, l'EXEC " + der.nom.texte + " fait partie de la procédure (elle s'appelle elle-même)");
          ligne(niv + 1, "", "ce script crée la procédure, il ne l'exécute pas"); }
        else if (s.corps[0].t === "bloc") ligne(niv + 1, "", "attention : sans GO après END, les instructions suivantes font aussi partie de la procédure");
      }
    }
    // Snowflake : le corps est un texte ($$ … $$) : on le traduit à son tour.
    function corpsTexteTrad(s, niv) {
      var v = s.corpsTexte.v, inner = s.corpsTexte.x === "dollar" ? v.slice(2, -2) : v.replace(/^'|'$/g, "").replace(/''/g, "'");
      var lu = lireJetons(inner, {});
      if (lu.erreur) { ligne(niv, "", "Je ne sais pas encore traduire : " + court(inner, 60), "inconnu"); return; }
      if (s.genre === "fonction" && !/^\s*(select|with|begin|declare|let|return)\b/i.test(inner)) {
        try {
          var lotsE = analyser(lu.jetons, inner);
          var st = lotsE[0] && lotsE[0].instrs[0];
          if (st && st.t !== "erreur") { ligne(niv, "", "ce qu'elle fait :"); lotsE.forEach(function (l) { l.instrs.forEach(function (x) { instr(x, niv + 1); }); }); return; }
        } catch (e) { /* un calcul seul : voir plus bas */ }
        ligne(niv, "", "elle renvoie le calcul : " + compact(inner));
        return;
      }
      var lots2 = analyser(lu.jetons, inner);
      ligne(niv, "", "ce qu'elle fait :");
      lots2.forEach(function (l) { l.instrs.forEach(function (x) { instr(x, niv + 1); }); });
    }
    function alterTrad(s, niv) {
      lien("ALTER TABLE", MC);
      var ctx = ctxNouveau({ portee: [], instr: "create" }, {});
      ligne(niv, "MODIFIER", "la structure de la table " + s.nom + " :");
      s.actions.forEach(function (a) {
        var t;
        switch (a.genre) {
          case "ajout-colonne": t = "ajouter la colonne " + colonneTexte(a.c, ctx); break;
          case "ajout-contrainte": t = "ajouter la règle : " + contrainteTexte(a.c, ctx); break;
          case "retrait-colonne": t = "enlever la colonne " + a.nom + " (et ses valeurs)"; break;
          case "retrait-contrainte": t = "enlever la règle " + a.nom; break;
          case "retrait-cle": t = "enlever la clé primaire"; break;
          case "modif-colonne": t = "changer la colonne " + a.nom + (a.type ? " : " + typeTexte(a.type) : "") + (a.obligatoire ? ", obligatoire (NOT NULL)" : "") +
            (a.nullable ? ", peut être vide (NULL)" : "") + (a.defaut ? ", par défaut : " + tx(a.defaut, ctx).t : "") + (a.sansDefaut ? ", sans valeur par défaut" : ""); break;
          case "renommer-colonne": t = "renommer la colonne " + a.nom + " en " + a.nouveau; break;
          default: t = "renommer la table en " + a.nouveau;
        }
        ligne(niv + 1, "", t);
      });
    }
    var OBJETS = { TABLE: ["la table ", " (sa structure et toutes ses lignes)", "f"], VIEW: ["la vue ", "", "f"], PROCEDURE: ["la procédure ", "", "f"],
      PROC: ["la procédure ", "", "f"], FUNCTION: ["la fonction ", "", "f"], INDEX: ["l'index ", "", "m"], SCHEMA: ["le schéma ", " (et ce qu'il contient)", "m"],
      DATABASE: ["la base ", " (et tout ce qu'elle contient)", "f"], SEQUENCE: ["la séquence ", "", "f"], TRIGGER: ["le déclencheur ", "", "m"], STAGE: ["le stage ", "", "m"] };
    function dropTrad(s, niv) {
      if (s.objet === "TABLE") lien("DROP TABLE", MC);
      var o = OBJETS[s.objet] || ["l'objet ", "", "m"];
      ligne(niv, "SUPPRIMER", s.noms.map(function (n) { return (s.temporaire ? "la table temporaire " : o[0]) + n; }).join(", ") + (s.surTable ? " de la table " + s.surTable : "") + o[1] +
        (s.siExiste ? (o[2] === "f" ? ", si elle existe" : ", s'il existe") : ""));
    }

    // --- T-SQL et programmation ---
    function ctxSimple() { return ctxNouveau({ portee: [], instr: "select" }, {}); }
    function instrCorps(st, niv) {
      if (st.t === "bloc" && !st.exceptions) { lien("BEGIN", { categorie: "Programmation" }); st.corps.forEach(function (x) { instr(x, niv); }); }
      else instr(st, niv);
    }
    function declareTrad(s, niv) {
      lien(s.let ? "LET" : "DECLARE", { categorie: "Programmation" });
      var ctx = ctxSimple(), v0 = s.vars[0];
      if (s.vars.length === 1 && v0.curseur) {
        lien("DECLARE CURSOR");
        ligne(niv, "DÉCLARER", "le curseur " + v0.nom + (v0.options ? " (" + v0.options + ")" : "") + ", qui parcourt une à une les lignes du résultat de :");
        requete(v0.curseur, niv + 1, { instr: "select" });
        return;
      }
      function texteVar(v) {
        var maintenant = v.init && v.init.t === "fn" && /^(GETDATE|SYSDATETIME|CURRENT_TIMESTAMP|NOW|SYSDATE)$/.test(v.init.nom);
        var ag = v.init && v.init.t === "sousreq" ? agregatSimple(v.init.req, ctx) : null;
        var init = !v.init ? ", vide (NULL) au départ" : ag ? ", qui vaut au départ " + ag : v.init.t === "sousreq" ? ", qui vaut au départ " + valeurSous(v.init.req) + sousRequete(v.init.req, ctx) :
          maintenant && v.type && v.type.nom === "DATE" ? ", qui vaut au départ la date du jour (le type DATE garde la date, sans l'heure)" :
          ", qui vaut au départ " + tx(v.init, ctx).t;
        return v.nom + " : " + typeTexte(v.type) + init;
      }
      if (s.vars.length === 1 && v0.table) {
        lien("DECLARE @");
        ligne(niv, "DÉCLARER", "la variable table " + v0.nom + ", avec les colonnes :");
        v0.table.forEach(function (c) { ligne(niv + 1, "", c.t === "colonne" ? colonneTexte(c, ctx) : "règle : " + contrainteTexte(c, ctx)); });
        return;
      }
      if (s.vars.length === 1) { emettre(niv, "DÉCLARER", (v0.plusieurs ? "les variables " : "la variable ") + texteVar(v0), ctx); return; }
      ligne(niv, "DÉCLARER", "les variables :");
      s.vars.forEach(function (v) {
        if (v.table) { ligne(niv + 1, "", v.nom + " : une variable table"); return; }
        emettre(niv + 1, "", texteVar(v), ctx);
      });
    }
    function setTrad(s, niv) {
      s.affs.forEach(function (a) {
        var ctx = ctxSimple();
        if (a.reglage) { emettre(niv, "RÉGLER", a.cible + " = " + tx(a.val, ctx).t, ctx); return; }
        lien("SET @variable");
        if (a.val.t === "sousreq" && (a.op === "=" || a.op === ":=")) {
          var ag = agregatSimple(a.val.req, ctx);
          emettre(niv, "METTRE", "dans " + a.cible + " " + (ag || valeurSous(a.val.req) + sousRequete(a.val.req, ctx)), ctx);
          return;
        }
        var v = tx(a.val, ctx), val = a.op === "=" || a.op === ":=" ? v : K(a.cible + " " + a.op.charAt(0) + " " + emb(v));
        var t = "dans " + a.cible + " " + (val.p ? val.t : "la valeur " + val.t), sql = valeurTexte(a.val);
        if (sql !== null && /^\s*(select|insert|update|delete|merge|with|exec|execute|create|drop|alter|truncate)\b/i.test(sql)) t += " ; c'est un texte qui contient une requête : elle n'est pas exécutée ici";
        emettre(niv, "METTRE", t, ctx);
      });
    }
    function optionTrad(s, niv) {
      var v = s.valeur, on = /\bON\b/i.test(v), t;
      switch (s.nom) {
        case "NOCOUNT": t = on ? "ne pas envoyer le message « n lignes traitées » après chaque instruction (SET NOCOUNT ON)" : "envoyer de nouveau le message « n lignes traitées » (SET NOCOUNT OFF)"; break;
        case "XACT_ABORT": lien("SET XACT_ABORT"); t = on ? "à la première erreur d'exécution, annuler toute la transaction en cours et arrêter (SET XACT_ABORT ON)" : "une erreur n'annule pas forcément toute la transaction (SET XACT_ABORT OFF)"; break;
        case "IDENTITY_INSERT": t = (on ? "permettre" : "ne plus permettre") + " d'écrire soi-même les numéros automatiques de la table " + v.replace(/\s+(ON|OFF)\s*$/i, "") + " (SET IDENTITY_INSERT)"; break;
        case "ROWCOUNT": t = /^0$/.test(v) ? "plus de limite au nombre de lignes (SET ROWCOUNT 0)" : "arrêter chaque instruction après " + v + " lignes (SET ROWCOUNT)"; break;
        case "DATEFORMAT": t = "lire les dates écrites en texte dans l'ordre " + v + " (SET DATEFORMAT)"; break;
        case "DATEFIRST": t = "le premier jour de la semaine : " + v + " (1 = lundi, 7 = dimanche)"; break;
        case "LANGUAGE": t = "la langue de la session : " + v + " (noms des mois, ordre des dates)"; break;
        case "ANSI_NULLS": t = on ? "comparer NULL selon la norme : = NULL n'est jamais vrai (SET ANSI_NULLS ON)" : "réglage obsolète : = NULL devient vrai pour une valeur NULL (SET ANSI_NULLS OFF)"; break;
        case "NAMES": t = "le jeu de caractères de la connexion : " + v; break;
        default: t = "l'option " + s.nom + " : " + v + " (SET " + s.nom + ")";
      }
      ligne(niv, "RÉGLER", /^(le |la |l'|plus )/.test(t) ? t : ": " + t);
    }
    var NIVEAUX = { "READ UNCOMMITTED": "lire aussi les changements pas encore validés", "READ COMMITTED": "lire seulement ce qui est validé",
      "REPEATABLE READ": "les lignes déjà lues ne peuvent pas changer avant la fin de la transaction", "SNAPSHOT": "lire une photo des données prise au début de la transaction",
      "SERIALIZABLE": "comme si les transactions passaient l'une après l'autre" };
    function teteCondition(niv, verbe, e, ctx, debut) {
      var c = condLignes(e, ctx);
      if (c.length === 1) { var t = (debut ? debut + " " : "") + c[0]; emettre(niv, verbe, t.replace(/^tant que il/, "tant qu'il"), ctx); return; }
      ligne(niv, verbe, (debut ? debut + " " : "") + ":");
      c.forEach(function (t) { emettre(niv + 1, "", t, ctx); });
    }
    function siTrad(s, niv) {
      lien("IF", { categorie: "Programmation" });
      var branches = s.branches.slice(), sinon = s.sinon;
      while (sinon && sinon.length === 1 && sinon[0].t === "si") { branches = branches.concat(sinon[0].branches); sinon = sinon[0].sinon; }
      branches.forEach(function (b, k) {
        teteCondition(niv, k ? "SINON SI" : "SI", b.si, ctxSimple());
        ligne(niv, "ALORS", ":");
        b.alors.forEach(function (st) { instrCorps(st, niv + 1); });
      });
      if (sinon) { ligne(niv, "SINON", ":"); sinon.forEach(function (st) { instrCorps(st, niv + 1); }); }
    }
    function raiserrorTrad(s, niv) {
      lien("RAISERROR");
      var ctx = ctxSimple(), a = s.args, msg = tx(a[0], ctx).t, grav = valeurNombre(a[1]);
      var params = a.slice(3).map(function (x) { return tx(x, ctx).t; });
      var rempl = params.length && /%[ds]/.test(msg) ? " (" + (msg.match(/%[a-z]/g) || []).join(", ") + " remplacé par " + enumerer(params) + ")" : "";
      var vite = s.options.indexOf("NOWAIT") >= 0 ? " ; affiché tout de suite (WITH NOWAIT)" : "";
      if (grav !== null && grav <= 10) emettre(niv, "ÉCRIRE", "le message " + msg + rempl + " : gravité " + grav + " ; un simple message d'information, pas une erreur ; rien ne s'arrête" + vite, ctx);
      else if (grav !== null && grav <= 19) emettre(niv, "SIGNALER", "l'erreur " + msg + rempl + " (gravité " + grav + ") : dans un TRY, on passe au CATCH" + vite, ctx);
      else if (grav !== null) emettre(niv, "SIGNALER", "l'erreur grave " + msg + rempl + " (gravité " + grav + ") : la connexion est coupée", ctx);
      else emettre(niv, "SIGNALER", "le message " + msg + rempl + " (gravité " + (a[1] ? tx(a[1], ctx).t : "?") + ")" + vite, ctx);
    }
    function execTrad(s, niv) {
      var ctx = ctxSimple();
      if (s.dynamique) {
        lien("EXEC (@sql)");
        var t0 = s.sql.t === "var" ? "contenu dans " + s.sql.v : tx(s.sql, ctx).t;
        emettre(niv, "EXÉCUTER", "le texte " + t0 + " comme une requête (SQL dynamique : le texte n'est lu qu'à ce moment)", ctx);
        return;
      }
      var nom = s.nom.texte;
      if (cleNom(s.nom.court) === "SP_EXECUTESQL") {
        lien("sp_executesql");
        var a0 = s.args[0], t = "le texte " + (a0 ? (a0.e.t === "var" ? "contenu dans " + a0.e.v : tx(a0.e, ctx).t) : "?") + " comme une requête (SQL dynamique, sp_executesql)";
        var vals = s.args.slice(2).map(function (x) { return (x.nom ? x.nom + " = " : "") + tx(x.e, ctx).t + (x.sortie ? " (en sortie)" : ""); });
        if (vals.length) t += ", avec " + (vals.length === 1 ? "le paramètre " : "les paramètres ") + vals.join(", ");
        emettre(niv, "EXÉCUTER", t, ctx);
        var defs = s.args[1] ? valeurTexte(s.args[1].e) : null;
        if (defs) ligne(niv + 1, "", "paramètres déclarés pour ce texte : " + defs);
        ligne(niv + 1, "", "le texte n'est lu et exécuté qu'à ce moment");
        return;
      }
      lien(s.appel === "CALL" ? "CALL" : "EXEC");
      var args = s.args.map(function (x) {
        var v = tx(x.e, ctx).t;
        return (x.nom ? x.nom + " = " : "") + v + (x.sortie ? " (en sortie : la valeur revient dans " + v + ")" : "");
      });
      emettre(niv, "EXÉCUTER", "la procédure " + nom + (args.length ? ", avec " + args.join(", ") : "") + (s.retour ? ", et RANGER son code retour dans " + s.retour : ""), ctx);
      // La procédure est créée plus haut dans le texte : dire quels paramètres ne sont pas donnés.
      var params = procedures[cleNom(nom)];
      if (!params) return;
      var donnes = {};
      s.args.forEach(function (x, k) { if (x.nom) donnes[cleNom(x.nom)] = true; else if (params[k]) donnes[cleNom(params[k].nom)] = true; });
      params.forEach(function (pr) {
        if (donnes[cleNom(pr.nom)]) return;
        if (pr.defaut) ligne(niv + 1, "", pr.nom + " n'est pas donné : il vaut " + tx(pr.defaut, ctx).t + " (sa valeur par défaut)");
        else if (!pr.sortie) ligne(niv + 1, "", pr.nom + " n'est pas donné et n'a pas de valeur par défaut : erreur");
      });
    }
    var SENS_LECTURE = { NEXT: "la ligne suivante", PRIOR: "la ligne précédente", FIRST: "la première ligne", LAST: "la dernière ligne" };
    function instr(s, niv) {
      var ctx;
      switch (s.t) {
        case "requete": requete(s, niv, { instr: "select" }); return;
        case "insert": insertTrad(s, niv); return;
        case "update": updateTrad(s, niv); return;
        case "delete": deleteTrad(s, niv); return;
        case "merge": mergeTrad(s, niv); return;
        case "truncate": lien("TRUNCATE TABLE", MC); emettre(niv, "VIDER", "la table " + s.table + (s.siExiste ? " (si elle existe)" : "") + " : toutes ses lignes sont supprimées d'un coup, sans condition possible ; la table reste (vide)", ctxSimple()); return;
        case "create-table": case "create-view": case "create-index": case "create-objet": case "create-routine": createTrad(s, niv); return;
        case "alter-table": alterTrad(s, niv); return;
        case "drop": dropTrad(s, niv); return;
        case "undrop": lien("UNDROP"); ligne(niv, "RÉCUPÉRER", (OBJETS[s.objet] || ["l'objet "])[0] + s.nom + " supprimée (UNDROP, grâce au Time Travel)"); return;
        case "declare": declareTrad(s, niv); return;
        case "set": setTrad(s, niv); return;
        case "option": optionTrad(s, niv); return;
        case "isolation": lien("SET TRANSACTION ISOLATION LEVEL"); ligne(niv, "RÉGLER", "le niveau d'isolation des transactions : " + s.niveau + (NIVEAUX[s.niveau] ? " (" + NIVEAUX[s.niveau] + ")" : "")); return;
        case "si": siTrad(s, niv); return;
        case "tantque":
          lien("WHILE");
          ctx = ctxSimple();
          var lc = condLignes(s.cond, ctx), une = lc.length === 1 && !/\u0001/.test(lc[0]);
          if (une) ligne(niv, "RÉPÉTER", ("tant que " + lc[0]).replace(/^que il/, "qu'il").replace(/^tant que il/, "tant qu'il") + " :");
          else { teteCondition(niv, "RÉPÉTER", s.cond, ctx, "tant que"); ligne(niv, "FAIRE", ":"); }
          s.corps.forEach(function (st) { instrCorps(st, niv + 1); });
          return;
        case "bloc":
          lien("BEGIN", { categorie: "Programmation" });
          if (!s.exceptions) { s.corps.forEach(function (st) { instr(st, niv); }); return; }
          lien("EXCEPTION");
          ligne(niv, "ESSAYER", ":");
          s.corps.forEach(function (st) { instr(st, niv + 1); });
          s.exceptions.forEach(function (x) {
            ligne(niv, "EN CAS D'ERREUR", (x.conds.join(" ou ").toUpperCase() === "OTHER" ? "" : "(" + x.conds.join(" ou ") + ") ") + ":");
            x.corps.forEach(function (st) { instr(st, niv + 1); });
          });
          return;
        case "try":
          lien("BEGIN TRY");
          ligne(niv, "ESSAYER", ":");
          s.essai.forEach(function (st) { instr(st, niv + 1); });
          ligne(niv, "EN CAS D'ERREUR", ":");
          s.capture.forEach(function (st) { instr(st, niv + 1); });
          return;
        case "tran":
          if (s.action === "debut") { lien("BEGIN TRANSACTION"); ligne(niv, "COMMENCER", "une transaction" + (s.nom ? " (appelée " + s.nom + ")" : "") + " : les changements qui suivent seront validés ou annulés ensemble"); }
          else if (s.action === "valider") { lien("COMMIT"); ligne(niv, "VALIDER", "la transaction : les changements deviennent définitifs (COMMIT)"); }
          else if (s.point) { lien("ROLLBACK TO"); ligne(niv, "REVENIR", "au point de sauvegarde " + s.point + " : les changements faits depuis ce point sont annulés"); }
          else { lien("ROLLBACK"); ligne(niv, "ANNULER", "la transaction : tous les changements depuis son début sont défaits (ROLLBACK)"); }
          return;
        case "point":
          lien("SAVE TRANSACTION");
          if (s.action === "poser") ligne(niv, "POSER", "le point de sauvegarde " + s.nom + " (on pourra y revenir avec ROLLBACK)");
          else ligne(niv, "OUBLIER", "le point de sauvegarde " + s.nom);
          return;
        case "throw":
          lien("THROW");
          if (!s.num) { ligne(niv, "RELANCER", "l'erreur attrapée (THROW) : elle remonte à l'appelant et le traitement s'arrête"); return; }
          ctx = ctxSimple();
          emettre(niv, "ARRÊTER", "avec l'erreur n° " + tx(s.num, ctx).t + " : " + tx(s.msg, ctx).t + " (THROW) : le traitement s'arrête", ctx);
          return;
        case "raiserror": raiserrorTrad(s, niv); return;
        case "signal":
          lien("SIGNAL");
          ligne(niv, "ARRÊTER", "avec l'erreur SQLSTATE " + (s.etat || "?") + (s.msg ? " : " + tx(s.msg, ctxSimple()).t : "") + " (SIGNAL) : le traitement s'arrête");
          return;
        case "exec": execTrad(s, niv); return;
        case "print": lien("PRINT"); ctx = ctxSimple(); emettre(niv, "ÉCRIRE", "le message " + tx(s.e, ctx).t, ctx); return;
        case "return":
          if (s.req) { ligne(niv, "RENVOYER", "le résultat de :"); requete(s.req, niv + 1, { instr: "select" }); return; }
          if (s.e) { ctx = ctxSimple(); emettre(niv, "RENVOYER", tx(s.e, ctx).t, ctx); return; }
          ligne(niv, "SORTIR", "tout de suite (RETURN) : la suite n'est pas exécutée");
          return;
        case "sortir": lien("BREAK"); ligne(niv, "SORTIR", "de la boucle (BREAK)"); return;
        case "suivant": lien("CONTINUE"); ligne(niv, "PASSER", "au tour suivant de la boucle (CONTINUE)"); return;
        case "curseur":
          lien("DECLARE CURSOR");
          if (s.action === "ouvrir") ligne(niv, "OUVRIR", "le curseur " + s.nom + " (sa requête est lancée)");
          else if (s.action === "lire") ligne(niv, "LIRE", (SENS_LECTURE[s.sens] || "la ligne " + s.sens) + " du curseur " + s.nom + (s.into.length ? ", et la ranger dans " + enumerer(s.into) : ""));
          else if (s.action === "fermer") ligne(niv, "FERMER", "le curseur " + s.nom);
          else if (s.action === "liberer") ligne(niv, "LIBÉRER", "le curseur " + s.nom + " (il n'existe plus)");
          else ligne(niv, "LIBÉRER", "la requête préparée " + s.nom);
          return;
        case "use":
          if (s.genre === "WAREHOUSE") { lien("USE WAREHOUSE"); ligne(niv, "UTILISER", "l'entrepôt de calcul (warehouse) " + s.nom); }
          else if (s.genre === "ROLE") ligne(niv, "PRENDRE", "le rôle " + s.nom);
          else if (s.genre === "ROLES") ligne(niv, "UTILISER", "les rôles secondaires " + s.nom);
          else if (s.genre === "SCHEMA") ligne(niv, "UTILISER", "le schéma " + s.nom + " (les noms sans schéma visent celui-ci)");
          else ligne(niv, "UTILISER", "la base " + s.nom + " (les noms sans base visent celle-ci)");
          return;
        case "attendre": ctx = ctxSimple(); ligne(niv, "ATTENDRE", (s.genre === "TIME" ? "jusqu'à " : "pendant ") + tx(s.e, ctx).t + " (WAITFOR " + s.genre + ")"); return;
        case "handler":
          lien("DECLARE HANDLER");
          ligne(niv, "PRÉVOIR", "en cas de " + s.conds.join(" ou ") + " : faire ceci, puis " + (s.genre === "CONTINUE" ? "continuer" : "sortir du bloc") + " :");
          instr(s.action, niv + 1);
          return;
        case "erreur": ligne(niv, "", s.message, s.inconnu ? "inconnu" : "erreur"); return;
      }
      ligne(niv, "", "Je ne sais pas encore traduire : " + s.t, "inconnu");
    }

    // --- Le script : lots (GO), puis instructions ---
    var nonVides = lots.filter(function (l) { return l.instrs.length; });
    var parLots = nonVides.length > 1 || nonVides.some(function (l) { return l.fois; });
    // Une variable n'existe que dans son lot : la signaler si elle est déclarée dans un autre lot seulement.
    function variablesDuLot(lot) {
      var dec = {}, util = [];
      parcourir(lot.instrs, function (x) {
        if (x.t === "declare") x.vars.forEach(function (v) { dec[cleNom(v.nom)] = true; });
        if (x.t === "create-routine") x.params.forEach(function (pr) { dec[cleNom(pr.nom)] = true; });
        if (x.t === "var" && x.v.charAt(1) !== "@") util.push(x.v);
        if (x.t === "set") x.affs.forEach(function (a) { if (a.cible.charAt(0) === "@" && a.cible.charAt(1) !== "@") util.push(a.cible); });
      }, true);
      return { dec: dec, util: util };
    }
    var varsLots = parLots ? nonVides.map(variablesDuLot) : [];
    parcourir(lots, function (x) { if (x.t === "create-routine" && x.genre === "procedure" && x.params) procedures[cleNom(x.nom)] = x.params; }, true);
    nonVides.forEach(function (lot, kl) {
      var nivLot = 0, plus = lot.instrs.length > 1;
      if (parLots) {
        ligne(0, "LOT " + (kl + 1), (lot.fois ? "(exécuté " + lot.fois + " fois : GO " + lot.fois + ") " : "") + ":"); nivLot = 1;
        var vl = varsLots[kl], vues = {}, perdues = [];
        vl.util.forEach(function (v) {
          var k = cleNom(v);
          if (vl.dec[k] || vues[k]) return;
          vues[k] = true;
          if (varsLots.some(function (o, j) { return j !== kl && o.dec[k]; })) perdues.push(v);
        });
        if (perdues.length) ligne(1, "", "attention : " + enumerer(perdues) + (perdues.length > 1 ? " sont déclarées" : " est déclarée") +
          " dans un autre lot : une variable n'existe que dans son lot, ici elle n'existe pas (erreur)", "attention");
      }
      lot.instrs.forEach(function (s, k) {
        etiquette = (parLots ? "lot " + (kl + 1) + (plus ? ", " : "") : "") + (plus ? "instruction " + (k + 1) : "");
        nolockDit = false;
        var niv = nivLot;
        if (plus) { ligne(nivLot, "INSTRUCTION " + (k + 1), ":"); niv = nivLot + 1; }
        instr(s, niv);
      });
    });
    var plusieurs = lignes.some(function (l) { return /^(INSTRUCTION|LOT) /.test(l.verbe); });
    var listeNotes = Object.keys(notes).map(Number).sort(function (a, b) { return a - b; }).map(function (k) {
      var n = notes[k], t = (plusieurs && n.ou.length ? majuscule(enumerer(n.ou)) + " : " : "") + n.texte;
      var morceaux = [];
      t.split("\u0002").forEach(function (x, i) {
        if (!i) { if (x) morceaux.push({ code: false, t: x }); return; }
        var p = x.split("\u0003");
        morceaux.push({ code: true, t: p[0] });
        if (p[1]) morceaux.push({ code: false, t: p[1] });
      });
      return { num: n.num, texte: t.replace(/\u0002|\u0003/g, "`"), morceaux: morceaux };
    });
    return { lignes: lignes, notes: listeNotes, fiches: fiches };
  }

  // ---------- 4. La fonction publique ----------
  function marquesMysql(lu, texte) {
    if (lu.info.accents || lu.info.diese || lu.info.delimiter || texte.indexOf("`") >= 0 || /(^|\n)[ \t]*#[ \t]/.test(texte)) return true;
    var J = lu.jetons;
    for (var k = 0; k < J.length - 1; k++) {
      var x = J[k], y = J[k + 1];
      if (x.t !== "mot") continue;
      if (/^(IFNULL|DATE_FORMAT|GROUP_CONCAT|STR_TO_DATE|CURDATE)$/.test(x.h) && y.v === "(") return true;
      if (x.h === "AUTO_INCREMENT") return true;
      if (x.h === "LIMIT" && y.t === "nombre" && J[k + 2] && J[k + 2].v === "," && J[k + 3] && J[k + 3].t === "nombre") return true;
      if ((x.h === "ON" && y.h === "DUPLICATE") || (x.h === "INSERT" && y.h === "IGNORE") || (x.h === "REPLACE" && y.h === "INTO")) return true;
    }
    return false;
  }
  // SQL Server ou Snowflake : reconnu à des marques sûres (sinon null, et les remarques citent les moteurs).
  var MARQUES_TSQL = ensemble("NOLOCK PRINT RAISERROR NOCOUNT GO APPLY EOMONTH ISNULL TRY_CONVERT DATETIME2 SYSDATETIME OUTPUT IDENTITY_INSERT XACT_ABORT DEALLOCATE");
  var MARQUES_SNOWFLAKE = ensemble("QUALIFY IFF FLATTEN VARIANT TIMESTAMP_NTZ TIMESTAMP_LTZ TIMESTAMP_TZ PARSE_JSON TRY_PARSE_JSON ILIKE WAREHOUSE TRANSIENT " +
    "UNDROP CLONE ZEROIFNULL NULLIFZERO DIV0 EQUAL_NULL OBJECT_CONSTRUCT TRY_TO_NUMBER TRY_TO_DATE TRY_TO_TIMESTAMP RESULT_SCAN");
  var AVANT_STAGE = ensemble("FROM JOIN INTO LIST LS PUT GET REMOVE RM USING STAGE");
  function moteurReconnu(lu, mysql) {
    if (mysql) return "mysql";
    var J = lu.jetons, ts = false, sf = false;
    for (var k = 0; k < J.length; k++) {
      var x = J[k], av = J[k - 1] || {};
      if (x.t === "mot") {
        if (MARQUES_TSQL[x.h] || /^@@/.test(x.v) || (/^#[A-Za-z_]/.test(x.v))) ts = true;
        else if (x.v.charAt(0) === "@" && !(av.t === "mot" && AVANT_STAGE[av.h])) ts = true;
        if (MARQUES_SNOWFLAKE[x.h]) sf = true;
      } else if (x.t === "nom" && x.v.charAt(0) === "[") ts = true;
      else if (x.t === "op" && (x.v === "::" || (x.v === ":" && !x.esp && (av.t === "mot" || av.t === "nom")))) sf = true;
      else if (x.t === "texte" && x.x === "dollar") sf = true;
    }
    return ts && !sf ? "tsql" : sf && !ts ? "snowflake" : null;
  }
  var RIEN = "Rien à traduire : colle une requête SQL.";
  var PAS_SQL = "Je n'arrive pas à lire la requête : ce texte ne ressemble pas à du SQL. Une requête commence par SELECT, WITH, INSERT, UPDATE, DELETE…";
  var MESSAGES_LECTURE = { texte: "un texte entre apostrophes n'est jamais fermé", dollar: "un texte $$ … $$ n'est jamais fermé",
    commentaire: "un commentaire /* … */ n'est jamais fermé", crochet: "un crochet [ n'est jamais fermé",
    guillemet: "un guillemet \" n'est jamais fermé", accent: "un accent grave ` n'est jamais fermé" };
  function enTexte(r) {
    var t = r.lignes.map(function (l) {
      return new Array(l.niveau + 1).join("    ") + (l.verbe ? l.verbe + (l.texte ? " " + l.texte : "") : l.texte);
    }).join("\n");
    if (r.notes.length) t += "\n\nÀ savoir :\n" + r.notes.map(function (n) { return "- " + n.texte; }).join("\n");
    return t;
  }
  function resultatMessage(m, genre) {
    return { lignes: genre ? [{ niveau: 0, verbe: "", texte: m, genre: genre }] : [], notes: [], fiches: [], erreurs: [m], texte: m, vide: !genre };
  }
  function traduireTexte(texte) {
    if (!/\S/.test(texte)) return resultatMessage(RIEN);
    var lu = lireJetons(texte, {}), mysql = marquesMysql(lu, texte);
    if (mysql) lu = lireJetons(texte, { mysql: true, antislash: true });
    else if (lu.erreur && lu.erreur.quoi === "texte" && texte.indexOf("\\'") >= 0) {
      var lu2 = lireJetons(texte, { antislash: true });
      if (!lu2.erreur) lu = lu2;
    }
    if (lu.jetons.length === 1 && !lu.erreur) return resultatMessage(RIEN);
    var lots = lu.jetons.length > 1 ? analyser(lu.jetons, texte) : [{ instrs: [] }];
    // Du texte qui n'est pas du SQL (plusieurs morceaux illisibles, et pas un mot de SQL au début) : un seul message.
    var tous = [], j0 = lu.jetons[0];
    lots.forEach(function (l) { tous = tous.concat(l.instrs); });
    if ((tous.length + (lu.erreur ? 1 : 0)) >= 2 && tous.every(function (x) { return x.t === "erreur"; }) &&
        !(j0.t === "op" && j0.v === "(") && !(j0.t === "mot" && (DEBUTS[j0.h] || NON_TRADUITES[j0.h] || j0.h === "GO"))) return resultatMessage(PAS_SQL, "erreur");
    if (lu.erreur) {
      var m = "Je n'arrive pas à lire la requête à partir de : " + court(texte.slice(lu.erreur.d, lu.erreur.d + 200), 60) + " (" + MESSAGES_LECTURE[lu.erreur.quoi] + ")";
      var ins = lots[lots.length - 1].instrs, der = ins[ins.length - 1];
      if (der && der.t === "erreur" && der.surFin) { der.message = m; der.inconnu = false; }
      else ins.push({ t: "erreur", message: m });
    }
    var r = traduction(lots, texte, { mysql: mysql, moteur: moteurReconnu(lu, mysql) });
    r.erreurs = r.lignes.filter(function (l) { return l.genre === "erreur" || l.genre === "inconnu"; }).map(function (l) { return l.texte; });
    r.texte = enTexte(r);
    return r;
  }
  L.traduireInterne = { lireJetons: lireJetons, analyser: analyser };   // pour les tests et la mise au point
  L.traduire = function (texte) {
    try {
      return traduireTexte(String(texte === undefined || texte === null ? "" : texte));
    } catch (e) {
      if (L.traduireDebug) throw e;
      return resultatMessage("Je ne sais pas encore traduire : " + court(String(texte || ""), 60), "inconnu");
    }
  };
})(typeof window !== "undefined" ? window : this);
