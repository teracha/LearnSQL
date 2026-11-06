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
        if (c === "@" && c2 !== "@") while (src.charAt(i) === "/" && (estSuite(src.charAt(i + 1)) || src.charAt(i + 1) === ".")) { i++; while (i < n && (estSuite(src.charAt(i)) || src.charAt(i) === ".")) i++; }
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
    "PURGE RESET INSTALL UNINSTALL CHECKSUM REPAIR CACHE PREPARE SHUTDOWN REFRESH VACUUM UPSERT ROLLUP SETUSER " +
    "EXECUTE_AS LABEL LOOP REPEAT FOR CASE");
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
      var g = et(), termes = null;
      for (;;) {
        garde();
        if (est("OR")) { avance(); (termes = termes || [g]).push(et()); continue; }
        if (est("XOR")) { avance(); if (termes) { g = { t: "ou", termes: termes }; termes = null; } g = { t: "xor", g: g, d: et() }; continue; }
        break;
      }
      return termes ? { t: "ou", termes: termes } : g;
    }
    function et() {
      var g = non(), termes = null;
      while (est("AND") || est("&&")) { garde(); avance(); (termes = termes || [g]).push(non()); }
      return termes ? { t: "et", termes: termes } : g;
    }
    function non() {
      if (est("NOT") || (est("!") && jt().t === "op")) { garde(); avance(); return { t: "non", e: non() }; }
      return predicat();
    }
    function predicat() {
      var g = addition();
      for (;;) {
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
