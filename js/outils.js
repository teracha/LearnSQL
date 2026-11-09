// Moteur des outils (docs/outils.md) : sans DOM, sans eval ni new Function, sans bibliothèque.
// - lire(formule) : un petit lecteur d'expressions (+ − × ÷, parenthèses, comparaisons, et, ou, non, noms de colonnes,
//   nombres, textes entre guillemets, vide, aujourdhui, nb("A")). evaluer(arbre, contexte) le calcule ; excel(arbre,
//   refs) écrit la formule Excel qui calcule la même chose ; typer(arbre, env) contrôle les types (vérificateur).
// - Les calculs d'un document : colonnes calculées, niveaux, alertes, totaux (suivi).
// - Le contrôle d'un document (fichier ouvert, exemple d'une définition) : examiner, lireFichier.
// - Les sorties : texte simple et HTML mis en forme (Copier, Imprimer), classeur Excel (.xlsx : le XML minimal d'un
//   classeur, dans un zip « stocké » avec CRC32).
// Règles communes au site et à Excel (cases vides) : dans une somme ou une différence, un nombre saisi vide compte pour 0 ;
// dans un produit, un quotient ou avec une date, une case vide donne un calcul vide, et une alerte dit quelle case manque ;
// une comparaison avec une case vide est fausse ; une case vide se teste avec « vide ».
// Utilisé par js/app.js (bloc « Outils »), outils/verifier.js et outils/tests/outils-moteur.js.
(function () {
  "use strict";
  var L = window.LEARNSQL = window.LEARNSQL || {};

  var FORMAT_FICHIER = "learnsql-outil";
  var MAX = { lignes: 300, texte: 2000, texteLong: 5000, nom: 120, colonnes: 40, items: 100 };
  var LIGNES_MODELE = 30;    // Excel : lignes du modèle vide
  var LIGNES_EN_PLUS = 10;   // Excel : lignes vides (avec leurs formules) sous un document, pour continuer dans Excel
  var MOTS_RESERVES = ["et", "ou", "non", "vide", "aujourdhui", "nb"];
  var COULEURS = ["ok", "attention", "ko", "neutre"];
  var TYPES_CHAMP = ["texte", "texte-long", "nombre", "date", "choix", "calcul"];
  var TYPES_RUBRIQUE = ["texte", "texte-long", "nombre", "date", "choix", "liste", "tableau"];
  var CALCULS_TOTAL = ["nombre", "somme", "moyenne", "min", "max"];

  // ---------- Valeurs : vide, nombres, dates ----------
  var EPOQUE = Date.UTC(1899, 11, 30);   // le jour 0 d'Excel : une date = un nombre de jours depuis le 30/12/1899
  var jourFixe = null;                     // tests : « aujourdhui » fixé

  function estVide(v) {
    if (v === null || v === undefined) return true;
    if (typeof v === "string") return !v.trim();
    if (typeof v === "number") return !isFinite(v);
    if (Array.isArray(v)) return v.every(estVide);
    if (typeof v === "object") return Object.keys(v).every(function (k) { return estVide(v[k]); });
    return false;
  }

  // "12,5", "12.5", 12.5 → 12.5 ; sinon null.
  function lireNombre(v) {
    if (typeof v === "number") return isFinite(v) ? v : null;
    if (typeof v !== "string") return null;
    var t = v.replace(/[\s\u00a0\u202f]/g, "").replace(",", ".");
    if (!/^[-+]?(\d+(\.\d*)?|\.\d+)$/.test(t)) return null;
    var n = Number(t);
    return isFinite(n) ? n : null;
  }
  // Évite les restes du calcul en virgule flottante (0,1 + 0,2 = 0,3).
  function arrondi(n) { return parseFloat(n.toPrecision(15)); }

  // 2,5 → « 2,5 » ; 2250 → « 2 250 » (espace insécable entre les milliers, comme pour un montant) ; 2 décimales au plus.
  function fmtNombre(n) {
    if (typeof n !== "number" || !isFinite(n)) return "";
    var r = Math.round(n * 100) / 100, signe = r < 0 ? "-" : "", a = Math.abs(r);
    var ent = Math.floor(a), dec = Math.round((a - ent) * 100), s = String(ent);
    if (ent >= 1000) s = s.replace(/\B(?=(\d{3})+(?!\d))/g, "\u00a0");
    if (dec) s += "," + (dec < 10 ? "0" + dec : String(dec).replace(/0$/, ""));
    return signe + s;
  }

  function deux(n) { return n < 10 ? "0" + n : String(n); }
  // "2027-03-15" → 46461 (le numéro du jour pour Excel), ou null si la date n'existe pas.
  function jour(iso) {
    var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(typeof iso === "string" ? iso : "");
    if (!m) return null;
    var a = +m[1], mo = +m[2], j = +m[3], t = Date.UTC(a, mo - 1, j), d = new Date(t);
    if (a < 1901 || d.getUTCFullYear() !== a || d.getUTCMonth() !== mo - 1 || d.getUTCDate() !== j) return null;
    return Math.round((t - EPOQUE) / 864e5);
  }
  function isoDuJour(n) {
    var d = new Date(EPOQUE + n * 864e5);
    return d.getUTCFullYear() + "-" + deux(d.getUTCMonth() + 1) + "-" + deux(d.getUTCDate());
  }
  function aujourdhui() {
    if (jourFixe !== null) return jourFixe;
    var d = new Date();
    return Math.round((Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) - EPOQUE) / 864e5);
  }
  function dateFr(iso) {
    var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(typeof iso === "string" ? iso : "");
    return m ? m[3] + "/" + m[2] + "/" + m[1] : "";
  }

  // La position d'une valeur dans une liste de choix (3 ou "3", « ouvert » ou « Ouvert »), ou -1.
  function indexValeur(valeurs, v) {
    if (estVide(v)) return -1;
    var t = String(v).trim(), k;
    for (k = 0; k < valeurs.length; k++) if (String(valeurs[k]) === t) return k;
    for (k = 0; k < valeurs.length; k++) if (String(valeurs[k]).toLowerCase() === t.toLowerCase()) return k;
    return -1;
  }
  // Le texte d'une option : « 3 · Forte » (valeur et libellé), ou la valeur seule.
  function texteChoix(col, k) {
    return String(col.valeurs[k]) + (col.libelles && col.libelles[k] ? " · " + col.libelles[k] : "");
  }

  // ---------- Le lecteur d'expressions ----------
  function erreur(message, texte, pos) {
    var e = new Error(message + (texte !== undefined ? " (formule « " + texte + " »" + (pos >= 0 ? ", position " + (pos + 1) : "") + ")" : ""));
    e.position = pos;
    return e;
  }

  // Lettres d'un nom de colonne : a-z, chiffres, _ et lettres accentuées (pas × ni ÷, qui sont des opérateurs).
  function decouper(texte) {
    var s = String(texte), i = 0, jetons = [], m;
    while (i < s.length) {
      var c = s.charAt(i), debut = i, reste = s.slice(i);
      if (/\s/.test(c)) { i++; continue; }
      if ((m = /^[0-9]+(\.[0-9]+)?/.exec(reste))) { jetons.push({ t: "nombre", v: Number(m[0]), pos: debut }); i += m[0].length; continue; }
      if (c === '"') {
        var fin = s.indexOf('"', i + 1);
        if (fin < 0) throw erreur("Guillemet fermant manquant", texte, debut);
        jetons.push({ t: "texte", v: s.slice(i + 1, fin), pos: debut }); i = fin + 1; continue;
      }
      if ((m = /^aujourd['\u2019]?hui(?![A-Za-z0-9_\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u024F])/i.exec(reste))) { jetons.push({ t: "aujourdhui", pos: debut }); i += m[0].length; continue; }
      if ((m = /^[A-Za-z_\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u024F][A-Za-z0-9_\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u024F]*/.exec(reste))) {
        var bas = m[0].toLowerCase();
        jetons.push(bas === "et" || bas === "ou" || bas === "non" || bas === "vide" ? { t: bas, pos: debut } : { t: "nom", v: m[0], pos: debut });
        i += m[0].length; continue;
      }
      var deuxCar = s.substr(i, 2);
      if (deuxCar === "<=" || deuxCar === ">=" || deuxCar === "<>" || deuxCar === "!=") {
        jetons.push({ t: "cmp", v: deuxCar === "!=" ? "<>" : deuxCar, pos: debut }); i += 2; continue;
      }
      var cmp = { "<": "<", ">": ">", "=": "=", "\u2264": "<=", "\u2265": ">=", "\u2260": "<>" }[c];
      if (cmp) { jetons.push({ t: "cmp", v: cmp, pos: debut }); i++; continue; }
      var op = { "+": "+", "-": "-", "\u2212": "-", "*": "*", "\u00d7": "*", "/": "/", "\u00f7": "/" }[c];
      if (op) { jetons.push({ t: "op", v: op, pos: debut }); i++; continue; }
      if (c === "(" || c === ")" || c === ",") { jetons.push({ t: c, pos: debut }); i++; continue; }
      throw erreur("Caractère inconnu « " + c + " »", texte, debut);
    }
    return jetons;
  }

  function nomJeton(j) {
    return j.t === "nombre" ? String(j.v) : j.t === "texte" ? '"' + j.v + '"' : j.t === "nom" || j.t === "cmp" || j.t === "op" ? j.v : j.t;
  }

  // Grammaire (de la priorité la plus faible à la plus forte) :
  // ou → et → non → comparaison (a = b, a vide, a non vide) → + − → × ÷ → − unaire → nombre, "texte", nom, ( … ),
  // nb("A") (matrice : les cases de la ligne qui valent A), abs(x) (la valeur sans son signe : un écart de ± 14 jours)
  function lire(texte) {
    var jetons = decouper(texte), k = 0;
    if (!jetons.length) throw erreur("Formule vide", texte, -1);
    function voir() { return jetons[k] || { t: "fin", pos: String(texte).length }; }
    function ou() { var a = et(); while (voir().t === "ou") { k++; a = { t: "ou", a: a, b: et() }; } return a; }
    function et() { var a = non(); while (voir().t === "et") { k++; a = { t: "et", a: a, b: non() }; } return a; }
    function non() { if (voir().t === "non") { k++; return { t: "non", a: non() }; } return comparaison(); }
    function comparaison() {
      var a = somme(), j = voir();
      if (j.t === "vide") { k++; return { t: "vide", a: a, non: false }; }
      if (j.t === "non" && (jetons[k + 1] || {}).t === "vide") { k += 2; return { t: "vide", a: a, non: true }; }
      if (j.t === "cmp") { k++; return { t: "cmp", op: j.v, a: a, b: somme() }; }
      return a;
    }
    function somme() {
      var a = produit();
      while (voir().t === "op" && (voir().v === "+" || voir().v === "-")) { var op = voir().v; k++; a = { t: "op", op: op, a: a, b: produit() }; }
      return a;
    }
    function produit() {
      var a = unaire();
      while (voir().t === "op" && (voir().v === "*" || voir().v === "/")) { var op = voir().v; k++; a = { t: "op", op: op, a: a, b: unaire() }; }
      return a;
    }
    function unaire() {
      var j = voir();
      if (j.t === "op" && j.v === "-") { k++; return { t: "neg", a: unaire() }; }
      if (j.t === "op" && j.v === "+") { k++; return unaire(); }
      return primaire();
    }
    function primaire() {
      var j = voir();
      if (j.t === "nombre") { k++; return { t: "nombre", v: j.v }; }
      if (j.t === "texte") { k++; return { t: "texte", v: j.v }; }
      if (j.t === "aujourdhui") { k++; return { t: "aujourdhui" }; }
      if (j.t === "(") {
        k++;
        var e = ou();
        if (voir().t !== ")") throw erreur("Parenthèse fermante manquante", texte, voir().pos);
        k++;
        return e;
      }
      if (j.t === "nom") {
        k++;
        if (voir().t !== "(") return { t: "col", nom: j.v };
        var fn = j.v.toLowerCase();
        if (fn !== "nb" && fn !== "abs") throw erreur("Fonction inconnue « " + j.v + " » (seules nb et abs existent)", texte, j.pos);
        k++;
        var args = [];
        if (voir().t !== ")") { args.push(ou()); while (voir().t === ",") { k++; args.push(ou()); } }
        if (voir().t !== ")") throw erreur("Parenthèse fermante manquante après " + fn + "(", texte, voir().pos);
        k++;
        if (args.length !== 1) throw erreur(fn + "(…) prend une seule valeur", texte, j.pos);
        if (fn === "nb" && args[0].t !== "texte" && args[0].t !== "nombre") throw erreur("nb(…) prend une seule valeur, par exemple nb(\"A\")", texte, j.pos);
        return { t: "fn", nom: fn, args: args };
      }
      if (j.t === "fin") throw erreur("Formule incomplète : il manque une valeur à la fin", texte, j.pos);
      throw erreur("« " + nomJeton(j) + " » inattendu", texte, j.pos);
    }
    var arbre = ou();
    if (k < jetons.length) throw erreur("« " + nomJeton(voir()) + " » en trop", texte, voir().pos);
    return arbre;
  }

  var cacheArbres = {};
  function arbre(texte) {
    var cle = "#" + texte;
    if (!Object.prototype.hasOwnProperty.call(cacheArbres, cle)) cacheArbres[cle] = lire(texte);
    return cacheArbres[cle];
  }

  // Les noms de colonnes cités par une expression, sans doublon, dans l'ordre.
  function citees(n, liste) {
    liste = liste || [];
    if (!n) return liste;
    if (n.t === "col" && liste.indexOf(n.nom) < 0) liste.push(n.nom);
    if (n.a) citees(n.a, liste);
    if (n.b) citees(n.b, liste);
    (n.args || []).forEach(function (x) { citees(x, liste); });
    return liste;
  }
  function aCalcul(n) {
    return !!n && (n.t === "op" || n.t === "neg" || (n.t === "fn" && n.nom === "abs") || aCalcul(n.a) || aCalcul(n.b) || (n.args || []).some(aCalcul));
  }
  function aDivision(n) { return !!n && ((n.t === "op" && n.op === "/") || aDivision(n.a) || aDivision(n.b)); }
  function aplatir(n, t) { return n.t === t ? aplatir(n.a, t).concat(aplatir(n.b, t)) : [n]; }

  // ---------- Calculer une expression ----------
  // ctx.valeur(nom) : la valeur d'une colonne (nombre, texte, liste) ou null si elle est vide ; ctx.nb(v) : matrice.
  function evaluer(n, ctx) {
    var x;
    switch (n.t) {
      case "nombre": case "texte": return n.v;
      case "aujourdhui": return typeof ctx.aujourdhui === "number" ? ctx.aujourdhui : aujourdhui();
      case "col": x = ctx.valeur(n.nom); return estVide(x) ? null : typeof x === "string" ? x.trim() : x;
      case "neg": x = evaluer(n.a, ctx); return typeof x === "number" ? -x : null;
      case "op":
        if (n.op === "+" || n.op === "-") return calcul(n.op, terme(n.a, ctx), terme(n.b, ctx));
        return calcul(n.op, evaluer(n.a, ctx), evaluer(n.b, ctx));
      case "cmp": return comparer(n.op, evaluer(n.a, ctx), evaluer(n.b, ctx));
      case "et": return vrai(evaluer(n.a, ctx)) && vrai(evaluer(n.b, ctx));
      case "ou": return vrai(evaluer(n.a, ctx)) || vrai(evaluer(n.b, ctx));
      case "non": return !vrai(evaluer(n.a, ctx));
      case "vide": x = n.a.t === "col" ? ctx.valeur(n.a.nom) : evaluer(n.a, ctx); return n.non ? !estVide(x) : estVide(x);
      case "fn":
        if (n.nom === "abs") { x = evaluer(n.args[0], ctx); return typeof x === "number" ? Math.abs(x) : null; }
        return ctx.nb ? ctx.nb(n.args[0].v) : 0;
    }
    return null;
  }
  // Un terme d'une somme ou d'une différence : un nombre saisi vide y compte pour 0 (ctx.souple(nom) le dit).
  function terme(n, ctx) {
    var x = evaluer(n, ctx);
    return x === null && estTermeSouple(n, ctx.souple) ? 0 : x;
  }
  function estTermeSouple(n, souple) {
    return !!souple && ((n.t === "col" && souple(n.nom)) || (n.t === "neg" && estTermeSouple(n.a, souple)));
  }
  // Une colonne ou une rubrique « souple » : un nombre saisi (nombre, ou choix de nombres). Les dates, les calculs et
  // les totaux ne le sont pas : vides, le calcul qui les lit est vide.
  function estSouple(c) {
    return !!c && (c.type === "nombre" || (c.type === "choix" && (c.valeurs || []).length > 0 &&
      c.valeurs.every(function (v) { return typeof v === "number"; })));
  }
  function jamais() { return false; }
  // Les noms dont une case vide rend l'expression vide (ou une comparaison fausse) : tous, sauf un nombre saisi qui est
  // un terme d'une somme ou d'une différence (il compte alors pour 0). souple(nom) : ce nombre saisi ; terme : la place.
  function strictes(n, souple, terme_, liste) {
    liste = liste || [];
    if (!n) return liste;
    switch (n.t) {
      case "col": if (!(terme_ && souple(n.nom)) && liste.indexOf(n.nom) < 0) liste.push(n.nom); return liste;
      case "neg": return strictes(n.a, souple, terme_, liste);
      case "op": var t = n.op === "+" || n.op === "-"; strictes(n.a, souple, t, liste); return strictes(n.b, souple, t, liste);
      case "fn": if (n.nom === "abs") strictes(n.args[0], souple, false, liste); return liste;
      case "cmp": strictes(n.a, souple, false, liste); return strictes(n.b, souple, false, liste);
    }
    return liste;
  }
  function vrai(v) { return v === true || (typeof v === "number" && v !== 0); }
  function calcul(op, a, b) {
    if (typeof a !== "number" || typeof b !== "number") return null;
    if (op === "/" && b === 0) return null;
    var r = op === "+" ? a + b : op === "-" ? a - b : op === "*" ? a * b : a / b;
    return isFinite(r) ? arrondi(r) : null;
  }
  // Une case vide rend la comparaison fausse. Les textes se comparent sans tenir compte des majuscules (comme Excel).
  function comparer(op, a, b) {
    if (a === null || b === null || a === undefined || b === undefined) return false;
    if (typeof a === "string" && typeof b === "string") { a = a.toLowerCase(); b = b.toLowerCase(); }
    else if (typeof a !== "number" || typeof b !== "number") return op === "<>";
    switch (op) {
      case "=": return a === b;
      case "<>": return a !== b;
      case "<": return a < b;
      case "<=": return a <= b;
      case ">": return a > b;
      case ">=": return a >= b;
    }
    return false;
  }

  // ---------- Contrôler les types (vérificateur) ----------
  // env.colonnes : nom → { type: "nombre" | "texte" | "liste" | "tableau", valeurs?: [...] } ; env.nb : les valeurs
  // permises dans nb(…) (matrice). Renvoie "nombre", "texte" ou "condition", ou lève une erreur en français.
  function typer(n, env, texte) {
    var a, b, c;
    function attendre(t, voulu, quoi) { if (t !== voulu) throw erreur(quoi, texte); }
    switch (n.t) {
      case "nombre": case "aujourdhui": return "nombre";
      case "texte": return "texte";
      case "col":
        c = env.colonnes[n.nom];
        if (!c) throw erreur("Colonne inconnue « " + n.nom + " »", texte);
        if (c.type === "liste" || c.type === "tableau") throw erreur("« " + n.nom + " » s'emploie seulement avec vide ou non vide", texte);
        return c.type;
      case "neg": attendre(typer(n.a, env, texte), "nombre", "Un signe moins devant un texte"); return "nombre";
      case "op":
        attendre(typer(n.a, env, texte), "nombre", "Un calcul (+ − × ÷) sur un texte ou une condition");
        attendre(typer(n.b, env, texte), "nombre", "Un calcul (+ − × ÷) sur un texte ou une condition");
        return "nombre";
      case "cmp":
        a = typer(n.a, env, texte); b = typer(n.b, env, texte);
        if (a === "condition" || b === "condition") throw erreur("On ne compare pas des conditions : utilise et, ou", texte);
        if (a !== b) throw erreur("Comparaison entre un nombre et un texte", texte);
        if (n.op === "=" || n.op === "<>") { valeurPermise(n.a, n.b, env, texte); valeurPermise(n.b, n.a, env, texte); }
        return "condition";
      case "et": case "ou":
        attendre(typer(n.a, env, texte), "condition", "« " + n.t + " » relie deux conditions (ex. note >= 6 " + n.t + " action vide)");
        attendre(typer(n.b, env, texte), "condition", "« " + n.t + " » relie deux conditions (ex. note >= 6 " + n.t + " action vide)");
        return "condition";
      case "non": attendre(typer(n.a, env, texte), "condition", "« non » s'emploie devant une condition"); return "condition";
      case "vide":
        if (n.a.t !== "col") throw erreur("« vide » s'emploie après un nom de colonne (ex. action vide)", texte);
        if (!env.colonnes[n.a.nom]) throw erreur("Colonne inconnue « " + n.a.nom + " »", texte);
        return "condition";
      case "fn":
        if (n.nom === "abs") { attendre(typer(n.args[0], env, texte), "nombre", "abs(…) prend un nombre"); return "nombre"; }
        if (!env.nb) throw erreur("nb(…) s'emploie seulement dans une matrice", texte);
        if (indexValeur(env.nb, n.args[0].v) < 0) throw erreur("nb(" + JSON.stringify(n.args[0].v) + ") : la valeur n'est pas dans la liste (" + env.nb.join(", ") + ")", texte);
        return "nombre";
    }
    throw erreur("Expression inconnue", texte);
  }
  // statut = "Ouvrt" : un texte comparé à une colonne de choix doit être une de ses valeurs.
  function valeurPermise(col, lit, env, texte) {
    if (col.t !== "col" || (lit.t !== "texte" && lit.t !== "nombre")) return;
    var c = env.colonnes[col.nom];
    if (c && c.valeurs && indexValeur(c.valeurs, lit.v) < 0) {
      throw erreur("« " + lit.v + " » n'est pas une valeur de " + col.nom + " (" + c.valeurs.join(", ") + ")", texte);
    }
  }

  // ---------- Écrire la formule Excel ----------
  // refs.cellule(nom) : la cellule d'une colonne sur la ligne (« B2 »), ou toute la colonne (« B2:B31 ») ;
  // refs.nb(v) : la formule qui compte les cases de la ligne égales à v (matrice).
  // Dans le fichier, les fonctions sont en anglais avec des virgules : Excel en français affiche SI(…; …).
  function nombreXml(n) { return String(n); }
  function texteFormule(t) { return '"' + String(t).replace(/"/g, '""') + '"'; }

  // Les colonnes à tester avant une comparaison : une case vide la rend fausse (Excel, lui, dirait "" > 6 vrai).
  // Pas un nombre saisi qui est le terme d'une somme (vide = 0, dans Excel aussi). Inutile pour colonne = "texte" (une
  // case vide n'est jamais égale à un texte non vide).
  function gardes(n, refs) {
    var lit = function (x) { return x.t === "texte" && x.v.trim() !== ""; };
    if (n.op === "=" && ((lit(n.a) && n.b.t === "col") || (lit(n.b) && n.a.t === "col"))) return [];
    return strictes(n, refs.souple || jamais, false);
  }
  function siVide(noms, refs) {
    var l = noms.map(function (c) { return refs.cellule(c) + '=""'; });
    return l.length > 1 ? "OR(" + l.join(",") + ")" : l[0];
  }

  function ecrireX(n, refs) {
    var a, b, pr;
    switch (n.t) {
      case "nombre": return { f: nombreXml(n.v), p: 9 };
      case "texte": return { f: texteFormule(n.v), p: 9 };
      case "aujourdhui": return { f: "TODAY()", p: 9 };
      case "col": return { f: refs.cellule(n.nom), p: 9 };
      case "fn": return { f: n.nom === "abs" ? "ABS(" + ecrireX(n.args[0], refs).f + ")" : refs.nb(n.args[0].v), p: 9 };
      case "neg": a = ecrireX(n.a, refs); return { f: "-" + (a.p < 9 ? "(" + a.f + ")" : a.f), p: 6 };
      case "op":
        pr = n.op === "+" || n.op === "-" ? 3 : 4;
        a = ecrireX(n.a, refs); b = ecrireX(n.b, refs);
        return { f: (a.p < pr ? "(" + a.f + ")" : a.f) + n.op +
          (b.p < pr || b.p === 6 || (b.p === pr && (n.op === "-" || n.op === "/")) ? "(" + b.f + ")" : b.f), p: pr };
      case "cmp":
        var g = gardes(n, refs), expr = ecrireX(n.a, refs).f + n.op + ecrireX(n.b, refs).f;
        if (aDivision(n)) expr = "IFERROR(" + expr + ",FALSE)";   // une division par zéro : la comparaison est fausse
        // SI(case vide ; FAUX ; comparaison) : SI ne calcule que la branche choisie (pas d'erreur #VALEUR!).
        return g.length ? { f: "IF(" + siVide(g, refs) + ",FALSE," + expr + ")", p: 9 } : { f: expr, p: aDivision(n) ? 9 : 1 };
      case "et": case "ou":
        return { f: (n.t === "et" ? "AND(" : "OR(") + aplatir(n, n.t).map(function (x) { return ecrireX(x, refs).f; }).join(",") + ")", p: 9 };
      case "non": return { f: "NOT(" + ecrireX(n.a, refs).f + ")", p: 9 };
      case "vide": return { f: refs.cellule(n.a.nom) + (n.non ? '<>""' : '=""'), p: 1 };
    }
    throw new Error("Expression non traduisible en Excel");
  }
  function excel(n, refs) { return ecrireX(n, refs).f; }

  // La même condition, sur toutes les lignes d'un coup (dans une formule matricielle) : chaque ligne donne 0 ou 1.
  function excelPlage(n, refs) {
    switch (n.t) {
      case "et": return "(" + aplatir(n, "et").map(function (x) { return excelPlage(x, refs); }).join("*") + ")";
      case "ou": return "((" + aplatir(n, "ou").map(function (x) { return excelPlage(x, refs); }).join("+") + ")>0)";
      case "non": return "(1-" + excelPlage(n.a, refs) + ")";
      case "vide": return "(" + refs.cellule(n.a.nom) + (n.non ? '<>""' : '=""') + ")";
      case "cmp":
        var expr = ecrireX(n.a, refs).f + n.op + ecrireX(n.b, refs).f;
        expr = aCalcul(n) ? "IFERROR(" + expr + ",FALSE)" : "(" + expr + ")";
        var g = gardes(n, refs).map(function (c) { return "(" + refs.cellule(c) + '<>"")'; });
        return g.length ? "(" + g.join("*") + "*" + expr + ")" : expr;
    }
    throw new Error("Condition non traduisible en Excel");
  }

  // ---------- Les calculs d'un document ----------
  function ligneDef(t) { return t.ligne && t.ligne.titre ? t.ligne : { titre: "Ligne", pluriel: "Lignes" }; }
  function pluriel(o, n) { return n + " " + (n > 1 ? o.pluriel || o.titre + "s" : o.titre).toLowerCase(); }
  function saisies(cols) { return cols.filter(function (c) { return c.type !== "calcul"; }); }

  function valeurSaisie(c, v) {
    if (v === undefined || v === null || v === "") return null;
    if (c.type === "date") return jour(v);
    if (c.type === "nombre") return lireNombre(v);
    if (typeof v === "string") return v.trim() ? v.trim() : null;
    return typeof v === "number" && isFinite(v) ? v : null;
  }
  // Le contexte d'une ligne de tableau : ses colonnes (les calculées se calculent à la demande, une seule fois), puis
  // celles du parent : les rubriques du document (un tableau d'un document lit sa tolérance, son plafond…) et la date
  // du jour (« aujourdhui » ; pour un exemple, la date de l'exemple).
  var AUCUNE = [];   // pas de rubriques : un outil « tableau »
  function contexteBase(auj) { return { aujourdhui: auj, rubriques: AUCUNE, souple: jamais, valeur: function () { return null; } }; }
  function contexteLigne(cols, ligne, parent) {
    var parId = {}, memo = {}, enCours = {};
    cols.forEach(function (c) { parId[c.id] = c; });
    var ctx = { aujourdhui: parent ? parent.aujourdhui : undefined, souple: function (nom) {
      return parId[nom] ? estSouple(parId[nom]) : !!(parent && parent.souple && parent.souple(nom));
    }, valeur: function (nom) {
      var c = parId[nom];
      if (!c) return parent ? parent.valeur(nom) : null;
      if (c.type !== "calcul") return valeurSaisie(c, ligne ? ligne[nom] : null);
      if (Object.prototype.hasOwnProperty.call(memo, nom)) return memo[nom];
      if (enCours[nom]) return null;   // boucle (refusée par le vérificateur)
      enCours[nom] = true;
      var r = null;
      try { r = evaluer(arbre(c.formule), ctx); } catch (e) { r = null; }
      enCours[nom] = false;
      memo[nom] = typeof r === "number" && isFinite(r) ? r : null;
      return memo[nom];
    } };
    return ctx;
  }
  // Le niveau d'un nombre (colonne, ou total) : le 1er dont la borne tient (max : jusqu'à max compris ; sous : en
  // dessous de sous, strictement) ; le dernier peut être sans borne.
  function niveau(col, v) {
    if (!col.niveaux || typeof v !== "number") return null;
    for (var k = 0; k < col.niveaux.length; k++) {
      var nv = col.niveaux[k];
      if (nv.sous !== undefined ? v < nv.sous : nv.max === undefined || v <= nv.max) return nv;
    }
    return null;
  }
  // La couleur d'un choix (couleurs: ["neutre", "ok", "ko"], une par valeur), ou "".
  function couleurChoix(c, v) {
    var k = c.couleurs ? indexValeur(c.valeurs, v) : -1;
    return k >= 0 && c.couleurs[k] ? c.couleurs[k] : "";
  }
  // Les valeurs calculées d'une ligne, leurs niveaux, et les couleurs de ses choix. Une ligne vide n'a pas de calcul.
  function calculerLigne(cols, ligne, parent) {
    var ctx = contexteLigne(cols, ligne, parent), r = { valeurs: {}, niveaux: {}, couleurs: {} }, rempli = ligneRemplie(cols, ligne);
    cols.forEach(function (c) {
      if (c.type === "calcul") r.valeurs[c.id] = rempli ? ctx.valeur(c.id) : null;
      if (c.niveaux) r.niveaux[c.id] = niveau(c, c.type === "calcul" ? r.valeurs[c.id] : valeurSaisie(c, ligne[c.id]));
      if (c.couleurs) r.couleurs[c.id] = couleurChoix(c, ligne[c.id]);
    });
    return r;
  }
  // Une ligne compte (alertes, totaux) si une de ses cases est remplie, autrement que par sa valeur par défaut.
  function parDefaut(c, v) { return c.defaut !== undefined && String(v).trim().toLowerCase() === String(c.defaut).toLowerCase(); }
  function ligneRemplie(cols, ligne) {
    return !!ligne && saisies(cols).some(function (c) { return !estVide(ligne[c.id]) && !parDefaut(c, ligne[c.id]); });
  }
  // La même règle dans Excel : un nombre, 0 si la ligne est vide. cellule(c) : « B2 », ou « B2:B31 » pour toute la colonne.
  function existeX(entrees, cellule, plage) {
    var sans = entrees.filter(function (c) { return c.defaut === undefined; }), avec = entrees.filter(function (c) { return c.defaut !== undefined; });
    var lit = function (c) { return typeof c.defaut === "number" ? nombreXml(c.defaut) : texteFormule(c.defaut); };
    if (plage) return "((" + sans.map(function (c) { return cellule(c) + '<>""'; }).concat(avec.map(function (c) {
      return "(" + cellule(c) + '<>"")*(' + cellule(c) + "<>" + lit(c) + ")";
    })).join(")+(") + ")>0)";
    return (sans.length ? ["COUNTA(" + sans.map(cellule).join(",") + ")"] : []).concat(avec.map(function (c) {
      return "(" + cellule(c) + '<>"")*(' + cellule(c) + "<>" + lit(c) + ")";
    })).join("+");
  }
  function condition(texte, ctx) {
    try { return vrai(evaluer(arbre(texte), ctx)); } catch (e) { return false; }
  }
  // « Risque 6 (« Pic de commandes EDI… ») » : le nom de la ligne et le début de son premier texte.
  function extrait(t) {
    t = String(t || "").replace(/\s+/g, " ").trim();
    return t ? " (« " + (t.length > 40 ? t.slice(0, 38).replace(/\s+\S*$/, "").replace(/[\s,;:.]+$/, "") + "…" : t) + " »)" : "";
  }
  function premierTexte(cols, ligne) {
    for (var k = 0; k < cols.length; k++) {
      var c = cols[k];
      if ((c.type === "texte" || c.type === "texte-long") && !estVide(ligne[c.id])) return ligne[c.id];
    }
    return "";
  }
  // « « Quantité » est vide, donc pas de « Total (€) » sur cette ligne, ni dans les totaux. » : les cases qui, vides,
  // rendent un calcul vide (un produit, un quotient, une date, un autre calcul vide), réunies en un seul message par
  // ligne. Une case n'y est pas quand une alerte du tableau qui teste « case vide » le dit déjà (sauf).
  // { cases: [{ nom, sauf: [conditions] }] (colonnes, puis rubriques du document : 5 au plus, vérificateur),
  //   messages: [texte] } : messages[m], le message des cases vides m (m = la somme des 2^k des cases k vides).
  var MAX_CASES_VIDES = 5;
  var cacheIncompletes = [];
  function incompletes(t, rubriques) {
    rubriques = rubriques || AUCUNE;
    for (var q = 0; q < cacheIncompletes.length; q++) if (cacheIncompletes[q].t === t && cacheIncompletes[q].r === rubriques) return cacheIncompletes[q].v;
    var parId = {}, rubId = {}, memo = {}, parSaisie = {}, cases = [], messages = [""];
    t.colonnes.forEach(function (c) { parId[c.id] = c; });
    rubriques.forEach(function (r) { rubId[r.id] = r; });
    var souple = function (nom) { return estSouple(parId[nom] || rubId[nom]); };
    var saisie = function (nom) {
      var x = parId[nom] || rubId[nom];
      return !!x && x.type !== "calcul" && x.type !== "liste" && x.type !== "tableau";
    };
    function bloquantes(id, vus) {
      if (memo[id]) return memo[id];
      if (vus[id]) return [];
      vus[id] = true;
      var out = [];
      strictes(arbre(parId[id].formule), souple, false).forEach(function (m) {
        var l = parId[m] && parId[m].type === "calcul" ? bloquantes(m, vus) : saisie(m) ? [m] : [];
        l.forEach(function (x) { if (out.indexOf(x) < 0) out.push(x); });
      });
      return (memo[id] = out);
    }
    t.colonnes.forEach(function (c) {
      if (c.type === "calcul") bloquantes(c.id, {}).forEach(function (m) { (parSaisie[m] = parSaisie[m] || []).push(c.id); });
    });
    t.colonnes.map(function (c) { return c.id; }).concat(rubriques.map(function (r) { return r.id; })).forEach(function (m) {
      if (parSaisie[m] && (parId[m] || rubId[m])) cases.push({ nom: m, titre: (parId[m] || rubId[m]).titre, calculs: parSaisie[m],
        sauf: (t.alertes || []).filter(function (a) { return testeVide(arbre(a.si), m); }).map(function (a) { return a.si; }) });
    });
    var trop = cases.length > MAX_CASES_VIDES;   // refusé par le vérificateur
    if (trop) cases = cases.slice(0, MAX_CASES_VIDES);
    for (var masque = 1; masque < 1 << cases.length; masque++) {
      var vides = cases.filter(function (x, k) { return masque & 1 << k; }), calcs = [];
      t.colonnes.forEach(function (c) {
        if (vides.some(function (x) { return x.calculs.indexOf(c.id) >= 0; })) calcs.push(c.id);
      });
      var compte = (t.totaux || []).some(function (tot) {
        return calcs.indexOf(tot.colonne) >= 0 || (!!tot.si && citees(arbre(tot.si)).some(function (k) { return calcs.indexOf(k) >= 0; }));
      });
      messages.push(listeEt(vides.map(function (x) { return "« " + x.titre + " »"; })) + (vides.length > 1 ? " sont vides" : " est vide") +
        ", donc pas " + listeDe(calcs.map(function (k) { return parId[k].titre; })) + " sur cette ligne" + (compte ? ", ni dans les totaux." : "."));
    }
    var v = { cases: cases, messages: messages, trop: trop };
    cacheIncompletes.push({ t: t, r: rubriques, v: v });
    return v;
  }
  // La condition teste-t-elle « nom vide » ?
  function testeVide(n, nom) {
    if (!n) return false;
    if (n.t === "vide") return !n.non && n.a.t === "col" && n.a.nom === nom;
    return testeVide(n.a, nom) || testeVide(n.b, nom);
  }
  // « de « Total (€) » », « d'« Écart » ni de « Reste » » ; « « A », « B » et « C » ».
  function de(titre) { return (/^[aeiouyhàâäéèêëîïôöûü]/i.test(titre) ? "d'« " : "de « ") + titre + " »"; }
  function listeDe(titres) {
    var l = titres.map(de);
    return l.length > 1 ? l.slice(0, -1).join(", ") + " ni " + l[l.length - 1] : l[0];
  }
  function listeEt(l) { return l.length > 1 ? l.slice(0, -1).join(", ") + " et " + l[l.length - 1] : l[0]; }
  // Le message des cases vides d'une ligne remplie, ou "".
  function messageIncomplet(t, ctx, parent) {
    var inc = incompletes(t, parent && parent.rubriques), masque = 0;
    inc.cases.forEach(function (x, k) {
      if (ctx.valeur(x.nom) === null && !x.sauf.some(function (si) { return condition(si, ctx); })) masque += 1 << k;
    });
    return inc.messages[masque];
  }
  // Les messages d'alerte d'une ligne de tableau (une ligne vide n'a pas d'alerte) : ceux du tableau, puis les cases vides.
  function alertesLigne(t, ligne, parent) {
    if (!ligneRemplie(t.colonnes, ligne)) return [];
    var ctx = contexteLigne(t.colonnes, ligne, parent);
    var res = (t.alertes || []).filter(function (a) { return condition(a.si, ctx); }).map(function (a) { return a.message; });
    var m = messageIncomplet(t, ctx, parent);
    if (m) res.push(m);
    return res;
  }
  function totalTableau(t, tot, lignes, parent) {
    var vals = [], nb = 0;
    lignes.forEach(function (l) {
      if (!ligneRemplie(t.colonnes, l)) return;
      var ctx = contexteLigne(t.colonnes, l, parent);
      if (tot.si && !condition(tot.si, ctx)) return;
      nb++;
      if (tot.colonne) { var v = ctx.valeur(tot.colonne); if (typeof v === "number") vals.push(v); }
    });
    if (tot.calcul === "nombre") return nb;
    if (tot.calcul === "somme") return arrondi(vals.reduce(function (s, v) { return s + v; }, 0));
    if (!vals.length) return null;
    if (tot.calcul === "moyenne") return arrondi(vals.reduce(function (s, v) { return s + v; }, 0) / vals.length);
    return tot.calcul === "min" ? Math.min.apply(null, vals) : Math.max.apply(null, vals);
  }
  // t : une définition de type tableau, ou une rubrique « tableau » (colonnes, alertes, totaux, ligne).
  function suiviTableau(t, lignes, rubrique, res, parent) {
    var nomL = ligneDef(t).titre;
    lignes.forEach(function (l, i) {
      alertesLigne(t, l, parent).forEach(function (m) {
        res.alertes.push({ rubrique: rubrique, ligne: i, message: m, texte: nomL + " " + (i + 1) + extrait(premierTexte(t.colonnes, l)) + " : " + m });
      });
    });
    (t.totaux || []).forEach(function (tot) {
      var v = totalTableau(t, tot, lignes, parent);
      res.totaux.push({ rubrique: rubrique, id: tot.id, libelle: tot.libelle, valeur: v, niveau: niveau(tot, v), texte: v === null ? "—" : fmtNombre(v) });
    });
  }
  function contexteMatrice(ligne) {
    return { valeur: function () { return null; }, nb: function (v) {
      return (ligne.cases || []).filter(function (x) { return !estVide(x) && String(x).toLowerCase() === String(v).toLowerCase(); }).length;
    } };
  }
  function alertesMatrice(def, ligne) {
    if (estVide(ligne)) return [];
    var ctx = contexteMatrice(ligne);
    return (def.alertes || []).filter(function (a) { return condition(a.si, ctx); }).map(function (a) { return a.message; });
  }
  // Le contexte d'un document : ses rubriques (une liste ou un tableau ne se teste qu'avec « vide »), et les totaux de
  // ses tableaux qui ont un id (« total_atterrissage > plafond »).
  function contexteDocument(def, contenu, auj) {
    var rub = {}, tot = {}, memo = {};
    def.rubriques.forEach(function (r) {
      rub[r.id] = r;
      if (r.type === "tableau") (r.totaux || []).forEach(function (t) { if (t.id) tot[t.id] = { r: r, t: t }; });
    });
    var ctx = { aujourdhui: auj, rubriques: def.rubriques, souple: function (nom) { return estSouple(rub[nom]); }, valeur: function (nom) {
      var r = rub[nom], v = (contenu.rubriques || {})[nom], x = tot[nom];
      if (r) return r.type === "liste" || r.type === "tableau" ? (Array.isArray(v) ? v : []) : valeurSaisie(r, v);
      if (!x) return null;
      if (!Object.prototype.hasOwnProperty.call(memo, nom)) memo[nom] = totalTableau(x.r, x.t, (contenu.rubriques || {})[x.r.id] || [], ctx);
      return memo[nom];
    } };
    return ctx;
  }
  // Le parent des lignes : les rubriques du document (pour ses tableaux), ou seulement la date du jour.
  function parentDe(def, contenu, auj) { return def.type === "document" ? contexteDocument(def, contenu, auj) : contexteBase(auj); }
  // Tout ce qui s'affiche sous un document : { alertes: [{ rubrique, ligne, message, texte }], totaux: [...] }.
  // rubrique = "" pour un tableau ou une matrice, l'id d'une rubrique « tableau », ou null (alerte du document).
  // auj : la date du jour à prendre (l'exemple a la sienne) ; sans elle, aujourd'hui.
  function suivi(def, contenu, auj) {
    var res = { alertes: [], totaux: [] };
    if (def.type === "tableau") suiviTableau(def, contenu.lignes || [], "", res, contexteBase(auj));
    else if (def.type === "matrice") {
      var nomL = ligneDef(def).titre;
      (contenu.lignes || []).forEach(function (l, i) {
        alertesMatrice(def, l).forEach(function (m) {
          res.alertes.push({ rubrique: "", ligne: i, message: m, texte: nomL + " " + (i + 1) + extrait(l.nom) + " : " + m });
        });
      });
    } else {
      var ctx = contexteDocument(def, contenu, auj);
      (def.alertes || []).forEach(function (a) {
        if (condition(a.si, ctx)) res.alertes.push({ rubrique: null, ligne: -1, message: a.message, texte: a.message });
      });
      def.rubriques.forEach(function (r) {
        if (r.type === "tableau") suiviTableau(r, (contenu.rubriques || {})[r.id] || [], r.id, res, ctx);
      });
    }
    return res;
  }
  function aDesAlertes(def) {
    return (def.alertes || []).length > 0 || (def.rubriques || []).some(function (r) { return (r.alertes || []).length > 0; });
  }

  // ---------- Documents : vide, exemple, contrôle ----------
  // Une ligne neuve : chaque colonne vide, ou sa valeur par défaut (defaut: "Ouvert").
  function ligneVide(cols) { var l = {}; saisies(cols).forEach(function (c) { l[c.id] = c.defaut !== undefined ? c.defaut : ""; }); return l; }
  // Les lignes d'un tableau neuf : celles du modèle (modele: [{ axe: "Délai" }, …]), ou une ligne vide.
  function lignesDepart(t) {
    if (!t.modele || !t.modele.length) return [ligneVide(t.colonnes)];
    return t.modele.map(function (m) {
      var l = ligneVide(t.colonnes);
      Object.keys(m || {}).forEach(function (k) { if (Object.prototype.hasOwnProperty.call(l, k)) l[k] = m[k]; });
      return l;
    });
  }
  function contenuVide(def) {
    if (def.type === "tableau") return { lignes: lignesDepart(def) };
    if (def.type === "matrice") return { colonnes: ["", ""], lignes: [{ nom: "", cases: ["", ""] }] };
    var r = {};
    def.rubriques.forEach(function (x) {
      r[x.id] = x.type === "liste" ? [""] : x.type === "tableau" ? lignesDepart(x) : x.defaut !== undefined ? x.defaut : "";
    });
    return { rubriques: r };
  }
  function copie(o) { return JSON.parse(JSON.stringify(o)); }
  function contenuExemple(def) {
    if (!def.exemple) return contenuVide(def);
    var e = copie(def.exemple);
    delete e.nom;
    delete e.date;   // la date à laquelle l'exemple se lit (alertes « date passée »)
    return examiner(def, e).contenu || contenuVide(def);
  }

  // Une valeur saisie, remise au propre ; chaque correction est notée dans pb (« ligne 2, Probabilité : … »).
  function nettoyerValeur(c, v, ou, pb) {
    if (v === undefined || v === null || v === "") return "";
    var k;
    switch (c.type) {
      case "texte": case "texte-long":
        if (typeof v === "number" && isFinite(v)) { pb.push(ou + " : écrire le texte entre guillemets"); v = String(v); }
        if (typeof v !== "string") { pb.push(ou + " : un texte est attendu"); return ""; }
        var max = c.type === "texte" ? MAX.texte : MAX.texteLong;
        if (v.length > max) { pb.push(ou + " : texte trop long, coupé à " + max + " caractères"); v = v.slice(0, max); }
        return v;
      case "nombre":
        var n = lireNombre(v);
        if (n === null) { pb.push(ou + " : « " + v + " » n'est pas un nombre"); return ""; }
        if (typeof v !== "number") pb.push(ou + " : écrire le nombre sans guillemets");
        return n;
      case "date":
        if (typeof v === "string" && jour(v) !== null) return v;
        pb.push(ou + " : « " + v + " » n'est pas une date (AAAA-MM-JJ)");
        return "";
      case "choix":
        k = indexValeur(c.valeurs, v);
        if (k < 0) { pb.push(ou + " : « " + v + " » n'est pas une valeur permise (" + c.valeurs.join(", ") + ")"); return ""; }
        if (v !== c.valeurs[k]) pb.push(ou + " : écrire " + JSON.stringify(c.valeurs[k]));
        return c.valeurs[k];
    }
    pb.push(ou + " : type inconnu");
    return "";
  }
  function examinerLignes(cols, lignes, ou, pb) {
    if (lignes === undefined || lignes === null) return [];
    if (!Array.isArray(lignes)) { pb.push(ou + "les lignes ne sont pas une liste"); return null; }
    if (lignes.length > MAX.lignes) { pb.push(ou + "plus de " + MAX.lignes + " lignes, la fin est coupée (" + (lignes.length - MAX.lignes) + " en trop)"); lignes = lignes.slice(0, MAX.lignes); }
    var parId = {}, res = [];
    cols.forEach(function (c) { parId[c.id] = c; });
    lignes.forEach(function (l, i) {
      var lieu = ou + "ligne " + (i + 1);
      if (!l || typeof l !== "object" || Array.isArray(l)) { pb.push(lieu + " : ce n'est pas une ligne"); return; }
      Object.keys(l).forEach(function (k) {
        if (!parId[k]) pb.push(lieu + " : colonne inconnue « " + k + " »");
        else if (parId[k].type === "calcul") pb.push(lieu + " : « " + k + " » est calculée, elle ne se remplit pas");
      });
      var propre = {};
      saisies(cols).forEach(function (c) { propre[c.id] = nettoyerValeur(c, l[c.id], lieu + ", " + c.titre, pb); });
      res.push(propre);
    });
    return res;
  }
  function examinerTexte(v, ou, pb, max) {
    if (v === undefined || v === null) return "";
    if (typeof v !== "string") { pb.push(ou + " : un texte est attendu"); return typeof v === "number" ? String(v) : ""; }
    if (v.length > max) { pb.push(ou + " : texte trop long, coupé"); return v.slice(0, max); }
    return v;
  }
  // Contrôle un contenu (fichier ouvert, document gardé, exemple d'une définition) : { contenu, problemes }.
  // contenu = null si la forme est inutilisable ; sinon un contenu propre (les valeurs fausses sont vidées).
  function examiner(def, contenu) {
    var pb = [];
    if (!contenu || typeof contenu !== "object" || Array.isArray(contenu)) return { contenu: null, problemes: ["Le contenu n'est pas un objet."] };
    var permis = def.type === "tableau" ? ["lignes"] : def.type === "matrice" ? ["colonnes", "lignes"] : ["rubriques"];
    Object.keys(contenu).forEach(function (k) { if (permis.indexOf(k) < 0) pb.push("clé inconnue « " + k + " »"); });
    if (def.type === "tableau") {
      var lignes = examinerLignes(def.colonnes, contenu.lignes, "", pb);
      return { contenu: lignes ? { lignes: lignes } : null, problemes: pb };
    }
    if (def.type === "matrice") {
      var cols = contenu.colonnes === undefined ? [] : contenu.colonnes, ls = contenu.lignes === undefined ? [] : contenu.lignes;
      if (!Array.isArray(cols) || !Array.isArray(ls)) return { contenu: null, problemes: pb.concat(["colonnes et lignes : des listes"]) };
      if (cols.length > MAX.colonnes) { pb.push("plus de " + MAX.colonnes + " " + (def.colonne.pluriel || def.colonne.titre + "s").toLowerCase() + ", la fin est coupée (" + (cols.length - MAX.colonnes) + " en trop)"); cols = cols.slice(0, MAX.colonnes); }
      if (ls.length > MAX.lignes) { pb.push("plus de " + MAX.lignes + " lignes, la fin est coupée (" + (ls.length - MAX.lignes) + " en trop)"); ls = ls.slice(0, MAX.lignes); }
      cols = cols.map(function (n, k) { return examinerTexte(n, "colonne " + (k + 1), pb, MAX.nom); });
      var choix = { type: "choix", valeurs: def.valeurs };
      var lignesM = [];
      ls.forEach(function (l, i) {
        var lieu = "ligne " + (i + 1);
        if (!l || typeof l !== "object" || Array.isArray(l)) { pb.push(lieu + " : ce n'est pas une ligne"); return; }
        Object.keys(l).forEach(function (k) { if (k !== "nom" && k !== "cases") pb.push(lieu + " : clé inconnue « " + k + " »"); });
        var cases = Array.isArray(l.cases) ? l.cases : [];
        if (l.cases !== undefined && !Array.isArray(l.cases)) pb.push(lieu + " : les cases ne sont pas une liste");
        if (cases.length > cols.length) pb.push(lieu + " : " + cases.length + " cases pour " + cols.length + " colonnes");
        lignesM.push({
          nom: examinerTexte(l.nom, lieu, pb, MAX.nom),
          cases: cols.map(function (n, k) { return nettoyerValeur(choix, cases[k], lieu + ", colonne " + (k + 1), pb); })
        });
      });
      return { contenu: { colonnes: cols, lignes: lignesM }, problemes: pb };
    }
    var rub = contenu.rubriques === undefined ? {} : contenu.rubriques;
    if (!rub || typeof rub !== "object" || Array.isArray(rub)) return { contenu: null, problemes: pb.concat(["rubriques : un objet { id: valeur }"]) };
    var parId = {}, res = {}, casse = false;
    def.rubriques.forEach(function (r) { parId[r.id] = r; });
    Object.keys(rub).forEach(function (k) { if (!parId[k]) pb.push("rubrique inconnue « " + k + " »"); });
    def.rubriques.forEach(function (r) {
      var v = rub[r.id];
      if (r.type === "tableau") {
        var t = examinerLignes(r.colonnes, v, r.titre + ", ", pb);
        if (!t) casse = true;
        res[r.id] = t || [];
      } else if (r.type === "liste") {
        if (v !== undefined && !Array.isArray(v)) { pb.push(r.titre + " : une liste de textes est attendue"); v = []; }
        if ((v || []).length > MAX.items) { pb.push(r.titre + " : plus de " + MAX.items + " lignes, la fin est coupée"); v = v.slice(0, MAX.items); }
        res[r.id] = v.map(function (x, k) { return examinerTexte(x, r.titre + " " + (k + 1), pb, MAX.texte); });
      } else res[r.id] = nettoyerValeur(r, v, r.titre, pb);
    });
    return { contenu: casse ? null : { rubriques: res }, problemes: pb };
  }

  // Un fichier « Enregistrer dans un fichier » : JSON, un document par fichier.
  function fichier(def, doc) {
    return JSON.stringify({ format: FORMAT_FICHIER, version: 1, outil: def.id, titre: def.titre, nom: doc.nom || "",
      enregistre: new Date().toISOString(), contenu: doc.contenu }, null, 2);
  }
  // « Ouvrir un fichier » : ne lève jamais d'erreur. { ok, message } ou { ok: true, doc: { nom, contenu }, corrections,
  // problemes, annonce } (annonce : le message à montrer, voir annonceOuverture).
  function lireFichier(texte, def, toutes) {
    var d;
    try { d = JSON.parse(String(texte).replace(/^\uFEFF/, "")); } catch (e) { d = undefined; }
    if (d === undefined) return { ok: false, message: "Ce fichier n'est pas un document des outils LearnSQL (il n'est pas au bon format)." };
    if (!d || typeof d !== "object" || d.format !== FORMAT_FICHIER) return { ok: false, message: "Ce fichier n'est pas un document des outils LearnSQL." };
    if (d.outil !== def.id) {
      var autre = (toutes || []).filter(function (x) { return x.id === d.outil; })[0];
      return { ok: false, autre: autre ? autre.id : null, message: autre ? "Ce fichier est un document de l'outil « " + autre.titre + " » : ouvre-le depuis cet outil." :
        "Ce fichier vient d'un outil inconnu." };
    }
    if (d.version !== 1) return { ok: false, message: "Ce fichier vient d'une version inconnue des outils" +
      (typeof d.version === "number" && isFinite(d.version) ? " (version " + d.version + ")" : "") + " : il ne peut pas être ouvert ici." };
    var r = examiner(def, d.contenu);
    if (!r.contenu) return { ok: false, message: "Ce fichier est abîmé : son contenu ne peut pas être lu." };
    var nom = typeof d.nom === "string" ? d.nom.replace(/\s+/g, " ").trim() : "";
    if (nom.length > MAX.nom) { r.problemes.unshift("nom trop long, coupé à " + MAX.nom + " caractères"); nom = nom.slice(0, MAX.nom).trim(); }
    nom = nom || "Sans nom";
    return { ok: true, doc: { nom: nom, contenu: r.contenu }, corrections: r.problemes.length, problemes: r.problemes,
      annonce: annonceOuverture("Fichier ouvert : « " + nom + " ».", r.problemes) };
  }
  // Un message et la liste de ce qui a été corrigé ou coupé (5 points au plus) : { texte, details: [...] }.
  function annonceOuverture(texte, problemes) {
    var d = problemes.slice(0, 5).map(function (p) { return p.charAt(0).toUpperCase() + p.slice(1) + "."; });
    if (problemes.length > 5) d.push("Et " + pluriel({ titre: "autre correction", pluriel: "autres corrections" }, problemes.length - 5) + ".");
    return { texte: texte + (problemes.length ? " Ce qui a été corrigé ou coupé :" : ""), details: d };
  }

  // « 6 risques », « 5 livrables · 10 personnes », « 4 rubriques remplies sur 6 ».
  function resumeDocument(def, c) {
    if (def.type === "tableau") return pluriel(ligneDef(def), (c.lignes || []).filter(function (l) { return ligneRemplie(def.colonnes, l); }).length);
    if (def.type === "matrice") return pluriel(ligneDef(def), (c.lignes || []).filter(function (l) { return !estVide(l); }).length) + " · " +
      pluriel(def.colonne, (c.colonnes || []).filter(function (n) { return !estVide(n); }).length);
    var rempli = def.rubriques.filter(function (r) { return !estVide((c.rubriques || {})[r.id]); }).length;
    return rempli + " rubrique" + (rempli > 1 ? "s remplies" : " remplie") + " sur " + def.rubriques.length;
  }

  // ---------- Texte simple et HTML mis en forme (Copier, Imprimer) ----------
  // Le texte d'une valeur : « 3 · Forte », « 15/03/2027 », « 2,5 » ; calcul : « 6 · Priorité ».
  function texteValeur(c, v) {
    if (estVide(v)) return "";
    switch (c.type) {
      case "date": return dateFr(v);
      case "nombre": var n = lireNombre(v); return n === null ? String(v) : fmtNombre(n);
      case "choix": var k = indexValeur(c.valeurs, v); return k >= 0 ? texteChoix(c, k) : String(v);
      case "liste": return v.filter(function (x) { return !estVide(x); }).join(" ; ");
    }
    return String(v);
  }
  function texteCalcul(c, calc) {
    var v = calc.valeurs[c.id], nv = calc.niveaux[c.id];
    return v === null || v === undefined ? "" : fmtNombre(v) + (nv ? " · " + nv.libelle : "");
  }
  function texteCellule(c, ligne, calc) {
    if (c.type === "calcul") return texteCalcul(c, calc);
    var t = texteValeur(c, ligne[c.id]), nv = calc.niveaux[c.id];
    return t && nv ? t + " · " + nv.libelle : t;
  }
  function lignesTexteTableau(t, lignes, sortie, parent) {
    var nomL = ligneDef(t).titre;
    lignes.forEach(function (l, i) {
      if (!ligneRemplie(t.colonnes, l)) return;
      var calc = calculerLigne(t.colonnes, l, parent);
      sortie.push("", nomL + " " + (i + 1));
      t.colonnes.forEach(function (c) {
        var v = texteCellule(c, l, calc);
        if (v) sortie.push("- " + c.titre + " : " + v.replace(/\s*\n\s*/g, " / "));
      });
    });
  }
  function texteTotal(x) { return x.texte + (x.niveau ? " · " + x.niveau.libelle : ""); }
  function texteSuivi(s, rubrique, sortie, aide) {
    var t = s.totaux.filter(function (x) { return x.rubrique === rubrique; });
    if (t.length) { sortie.push("", "Totaux"); t.forEach(function (x) { sortie.push("- " + x.libelle + " : " + texteTotal(x)); }); }
    if (t.length && aide) sortie.push(aide);
  }
  // doc = { nom, contenu, aujourdhui (facultatif : la date de l'exemple) }
  function texteDocument(def, doc) {
    var c = doc.contenu, s = suivi(def, c, doc.aujourdhui), nom = String(doc.nom || "").trim(), o = [def.titre + (nom ? " : " + nom : "")];
    var parent = parentDe(def, c, doc.aujourdhui);
    if (def.type === "tableau") {
      lignesTexteTableau(def, c.lignes, o, parent);
      if (o.length === 1) o.push("", "Aucune ligne remplie.");
      texteSuivi(s, "", o, def.aideTotaux);
    } else if (def.type === "matrice") {
      c.lignes.forEach(function (l, i) {
        if (estVide(l)) return;
        o.push("", l.nom || ligneDef(def).titre + " " + (i + 1));
        def.valeurs.forEach(function (v, k) {
          var qui = [];
          c.colonnes.forEach(function (n, j) { if (String(l.cases[j]) === String(v)) qui.push(n || def.colonne.titre + " " + (j + 1)); });
          if (qui.length) o.push("- " + texteChoix(def, k) + " : " + qui.join(", "));
        });
      });
    } else {
      def.rubriques.forEach(function (r) {
        var v = c.rubriques[r.id];
        if (r.type === "liste") {
          o.push("", r.titre);
          var items = v.filter(function (x) { return !estVide(x); });
          if (items.length) items.forEach(function (x) { o.push("- " + x.replace(/\s*\n\s*/g, " / ")); });
          else o.push("- —");
        } else if (r.type === "tableau") {
          o.push("", r.titre);
          lignesTexteTableau(r, v, o, parent);
          if (!v.some(function (l) { return ligneRemplie(r.colonnes, l); })) o.push("- —");
          texteSuivi(s, r.id, o, r.aideTotaux);
        } else if (!estVide(v)) o.push((r.type === "texte-long" ? "\n" : "") + r.titre + " : " + texteValeur(r, v));
      });
    }
    if (s.alertes.length) { o.push("", "Alertes"); s.alertes.forEach(function (a) { o.push("- " + a.texte); }); }
    return o.join("\n").replace(/\n{3,}/g, "\n\n") + "\n";
  }

  function escH(t) {
    return String(t).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; });
  }
  function escHL(t) { return escH(t).replace(/\r?\n/g, "<br>"); }
  // Styles écrits dans chaque balise : Word et les messageries ignorent les feuilles de style.
  var H = {
    doc: "font-family:Calibri,Arial,sans-serif;font-size:11pt;line-height:1.35;color:#000000;background:#ffffff",
    h1: "font-size:16pt;margin:0 0 2pt;page-break-after:avoid;break-after:avoid",
    sous: "font-size:11pt;margin:0 0 10pt;color:#444444",
    h2: "font-size:12.5pt;margin:12pt 0 4pt;page-break-after:avoid;break-after:avoid",
    titreP: "margin:4pt 0;page-break-after:avoid;break-after:avoid",
    table: "border-collapse:collapse;width:100%;font-size:10pt",
    th: "border:1px solid #8c8c8c;background:#eeeeee;padding:4px 6px;text-align:left;vertical-align:bottom",
    td: "border:1px solid #8c8c8c;padding:4px 6px;text-align:left;vertical-align:top",
    centre: "border:1px solid #8c8c8c;padding:4px 6px;text-align:center;vertical-align:top;font-weight:bold",
    p: "margin:4pt 0",
    ul: "margin:2pt 0 6pt;padding-left:18pt",
    alertes: "margin:10pt 0 0;padding:4pt 8pt;border-left:3pt solid #b3261e;background:#fbe7e5",
    niveau: { ok: "background:#e3f4ea;color:#1f5e3a", attention: "background:#fff1d6;color:#7a4a00", ko: "background:#fbe7e5;color:#8c1d18", neutre: "background:#eeeeee;color:#333333" }
  };
  function badgeH(nv) {
    return nv ? ' <span style="padding:0 4pt;font-weight:bold;' + (H.niveau[nv.couleur] || H.niveau.neutre) + '">' + escH(nv.libelle) + "</span>" : "";
  }
  // Un choix qui a une couleur : son mot, sur sa couleur.
  function choixH(texte, couleur) {
    return couleur ? '<span style="padding:0 4pt;font-weight:bold;' + (H.niveau[couleur] || H.niveau.neutre) + '">' + escH(texte) + "</span>" : escHL(texte);
  }
  function htmlTableauDoc(t, lignes, parent) {
    var cols = t.colonnes;
    var h = '<table style="' + H.table + '"><thead><tr><th style="' + H.th + '">N°</th>' +
      cols.map(function (c) { return '<th style="' + H.th + '">' + escH(c.titre) + "</th>"; }).join("") + "</tr></thead><tbody>";
    lignes.forEach(function (l, i) {
      if (!ligneRemplie(cols, l)) return;
      var calc = calculerLigne(cols, l, parent);
      h += '<tr><td style="' + H.td + '">' + (i + 1) + "</td>" + cols.map(function (c) {
        if (c.type === "calcul") { var v = calc.valeurs[c.id]; return '<td style="' + H.td + '">' + (v === null ? "" : escH(fmtNombre(v)) + badgeH(calc.niveaux[c.id])) + "</td>"; }
        return '<td style="' + H.td + '">' + choixH(texteValeur(c, l[c.id]), calc.couleurs[c.id]) + badgeH(calc.niveaux[c.id]) + "</td>";
      }).join("") + "</tr>";
    });
    h += "</tbody></table>";
    if (!lignes.some(function (l) { return ligneRemplie(cols, l); })) h = '<p style="' + H.p + '">Aucune ligne remplie.</p>';
    return h;
  }
  function htmlTotaux(s, rubrique, aide) {
    var t = s.totaux.filter(function (x) { return x.rubrique === rubrique; });
    return t.length ? '<p style="' + H.titreP + '"><strong>Totaux</strong></p><ul style="' + H.ul + '">' +
      t.map(function (x) { return "<li>" + escH(x.libelle) + " : <strong>" + escH(x.texte) + "</strong>" + badgeH(x.niveau) + "</li>"; }).join("") + "</ul>" +
      (aide ? '<p style="' + H.p + ';color:#444444">' + escH(aide) + "</p>" : "") : "";
  }
  // doc = { nom, contenu, aujourdhui (facultatif : la date de l'exemple) }
  function htmlDocument(def, doc) {
    var c = doc.contenu, s = suivi(def, c, doc.aujourdhui), parent = parentDe(def, c, doc.aujourdhui), nom = String(doc.nom || "").trim();
    var h = '<div style="' + H.doc + '"><h1 style="' + H.h1 + '">' + escH(def.titre) + "</h1>" +
      (nom ? '<p style="' + H.sous + '">' + escH(nom) + "</p>" : "");
    if (def.type === "tableau") h += htmlTableauDoc(def, c.lignes, parent) + htmlTotaux(s, "", def.aideTotaux);
    else if (def.type === "matrice") {
      h += '<p style="' + H.p + '">' + def.valeurs.map(function (v, k) { return "<strong>" + escH(v) + "</strong> = " + escH(def.libelles ? def.libelles[k] : v); }).join(" · ") + "</p>" +
        '<table style="' + H.table + '"><thead><tr><th style="' + H.th + '">' + escH(ligneDef(def).titre) + "</th>" +
        c.colonnes.map(function (n, k) { return '<th style="' + H.th + '">' + escH(n || def.colonne.titre + " " + (k + 1)) + "</th>"; }).join("") + "</tr></thead><tbody>" +
        c.lignes.filter(function (l) { return !estVide(l); }).map(function (l) {
          return '<tr><td style="' + H.td + '">' + escH(l.nom) + "</td>" + c.colonnes.map(function (n, k) { return '<td style="' + H.centre + '">' + escH(l.cases[k] || "") + "</td>"; }).join("") + "</tr>";
        }).join("") + "</tbody></table>";
    } else {
      def.rubriques.forEach(function (r) {
        var v = c.rubriques[r.id];
        if (r.type === "liste") {
          var items = v.filter(function (x) { return !estVide(x); });
          h += '<h2 style="' + H.h2 + '">' + escH(r.titre) + "</h2>" + (items.length ? '<ul style="' + H.ul + '">' + items.map(function (x) { return "<li>" + escHL(x) + "</li>"; }).join("") + "</ul>" : '<p style="' + H.p + '">—</p>');
        } else if (r.type === "tableau") h += '<h2 style="' + H.h2 + '">' + escH(r.titre) + "</h2>" + htmlTableauDoc(r, v, parent) + htmlTotaux(s, r.id, r.aideTotaux);
        else if (r.type === "texte-long") h += '<p style="' + H.p + ';page-break-inside:avoid;break-inside:avoid"><strong>' + escH(r.titre) + "</strong><br>" + (estVide(v) ? "—" : escHL(v)) + "</p>";
        else h += '<p style="' + H.p + '"><strong>' + escH(r.titre) + " :</strong> " + (estVide(v) ? "—" : choixH(texteValeur(r, v), couleurChoix(r, v))) + "</p>";
      });
    }
    if (s.alertes.length) h += '<div style="' + H.alertes + '"><p style="' + H.titreP + '"><strong>Alertes</strong></p><ul style="' + H.ul + '">' +
      s.alertes.map(function (a) { return "<li>" + escH(a.texte) + "</li>"; }).join("") + "</ul></div>";
    return h + "</div>";
  }

  // ---------- Le classeur Excel (le modèle : feuilles, cellules, formules) ----------
  function lettre(n) { var s = ""; while (n > 0) { var m = (n - 1) % 26; s = String.fromCharCode(65 + m) + s; n = Math.floor((n - 1) / 26); } return s; }
  function nomFeuille(t, pris) {
    var n = String(t).replace(/[\[\]:*?\/\\]/g, " ").replace(/^'+|'+$/g, "").replace(/\s+/g, " ").trim().slice(0, 31) || "Feuille";
    var base = n, k = 2;
    while (pris.some(function (x) { return x.toLowerCase() === n.toLowerCase(); })) { var suf = " (" + k++ + ")"; n = base.slice(0, 31 - suf.length) + suf; }
    pris.push(n);
    return n;
  }
  function largeurExcel(c) {
    if (c.largeur) return c.largeur;
    switch (c.type) {
      case "texte-long": return 45;
      case "texte": return 22;
      case "date": return 13;
      case "nombre": case "calcul": return 11;
      case "choix": return Math.max(11, Math.min(30, 3 + Math.max.apply(null, c.valeurs.map(function (v, k) { return texteChoix(c, k).length; }))));
    }
    return 16;
  }
  function celluleSaisie(c, v) {
    if (estVide(v)) return null;
    if (c.type === "date") { var j = jour(v); return j === null ? null : { t: "date", v: j }; }
    if (c.type === "nombre") { var n = lireNombre(v); return n === null ? null : { t: "nombre", v: n, s: "haut" }; }
    if (c.type === "choix") return typeof v === "number" ? { t: "nombre", v: v, s: "haut" } : { t: "texte", v: String(v), s: "haut" };
    return { t: "texte", v: String(v), s: "long" };
  }
  function aideChoix(c) {
    var leg = c.libelles ? c.valeurs.map(function (v, k) { return v + " = " + c.libelles[k]; }).join(", ") : "";
    return [c.aide || "", leg].filter(Boolean).join(" ");
  }
  function excelNiveau(c, cellule) {
    var f = '""';
    for (var k = c.niveaux.length - 1; k >= 0; k--) {
      var nv = c.niveaux[k];
      f = nv.sous !== undefined ? "IF(" + cellule + "<" + nombreXml(nv.sous) + "," + texteFormule(nv.libelle) + "," + f + ")" :
        nv.max === undefined ? texteFormule(nv.libelle) : "IF(" + cellule + "<=" + nombreXml(nv.max) + "," + texteFormule(nv.libelle) + "," + f + ")";
    }
    return "IF(" + cellule + '="","",' + f + ")";
  }
  // SI(case stricte vide ; "" ; calcul). Un nombre saisi, terme d'une somme, compte pour 0 (Excel aussi) : la formule
  // ne vaut alors "" que si la ligne est vide (existe = 0), comme sur le site. refs.ligne(nom) : la colonne de la ligne.
  function excelCalcul(c, refs, existe) {
    var n = arbre(c.formule), f = excel(n, refs), s = strictes(n, refs.souple || jamais, false);
    if (aDivision(n)) f = "IFERROR(" + f + ',"")';
    if (s.length) f = "IF(" + siVide(s, refs) + ',"",' + f + ")";
    // Une case stricte de la ligne, sans valeur par défaut, est vide quand la ligne est vide : la garde suffit alors.
    var garde = s.some(function (m) { var x = refs.ligne ? refs.ligne(m) : null; return !!x && (x.type === "calcul" || x.defaut === undefined); });
    return existe && !garde ? "IF(" + existe + '=0,"",' + f + ")" : f;
  }
  // Les messages d'alerte d'une ligne, réunis : SUPPRESPACE(SI(…;"Message 1 ";"")&SI(…;"Message 2 ";"")), puis celui
  // des cases vides : CHOISIR(1 + (B2="")*1 + (C2="")*2 ; "" ; "« B » est vide…" ; "« C » est vide…" ; "« B » et « C »…").
  function excelAlertes(alertes, refs, existe, inc) {
    var plus = alertes.length + (inc && inc.cases.length ? 1 : 0) > 1, fin = plus ? " " : "";
    var morceaux = alertes.map(function (a) { return "IF(" + excel(arbre(a.si), refs) + "," + texteFormule(a.message + fin) + ',"")'; });
    if (inc && inc.cases.length) morceaux.push("CHOOSE(1+" + inc.cases.map(function (x, k) {
      var si = refs.cellule(x.nom) + '=""';
      if (x.sauf.length) si = "AND(" + [si].concat(x.sauf.map(function (c) { return "NOT(" + excel(arbre(c), refs) + ")"; })).join(",") + ")";
      return "(" + si + ")*" + (1 << k);
    }).join("+") + "," + inc.messages.map(function (m) { return texteFormule(m ? m + fin : ""); }).join(",") + ")");
    return "IF(" + existe + '=0,"",' + (morceaux.length > 1 ? "TRIM(" + morceaux.join("&") + ")" : morceaux[0]) + ")";
  }

  // Une feuille pour un tableau : l'en-tête en ligne 1 (gras, figé), une ligne Excel par ligne du document, puis des
  // lignes vides avec leurs formules, et les totaux en dessous. Une colonne calculée garde sa formule ; un niveau devient
  // une colonne « Niveau : … » (mot + couleur) ; les alertes, une colonne « Alertes ». Le modèle vide reprend les lignes
  // déjà écrites (modele). parent : le contexte du document (pour les valeurs calculées) ; ext : une rubrique du
  // document → sa cellule sur la 1re feuille (« 'Rapport du COPIL et météo'!$B$6 »), pour une formule qui la lit.
  function feuilleTableau(t, nom, lignes, modele, parent, ext) {
    var cols = t.colonnes, sortie = [], lettreDe = {}, inc = incompletes(t, parent && parent.rubriques);
    cols.forEach(function (c) {
      sortie.push({ sorte: "col", col: c });
      if (c.niveaux) sortie.push({ sorte: "niveau", col: c });
    });
    if ((t.alertes || []).length || inc.cases.length) sortie.push({ sorte: "alertes" });
    sortie.forEach(function (s, i) { s.l = lettre(i + 1); if (s.sorte === "col") lettreDe[s.col.id] = s.l; });
    if (modele) lignes = (t.modele || []).slice();
    var nb = modele ? Math.max(LIGNES_MODELE, lignes.length + LIGNES_EN_PLUS) : Math.max(LIGNES_MODELE - LIGNES_EN_PLUS, lignes.length) + LIGNES_EN_PLUS;
    var prem = 2, der = prem + nb - 1, entrees = saisies(cols);
    var f = { nom: nom, figer: 1, paysage: true, lignes: [], listes: [], aides: [], couleurs: [],
      largeurs: sortie.map(function (s) { return s.sorte === "col" ? largeurExcel(s.col) : s.sorte === "niveau" ? 16 : 40; }) };
    f.lignes.push(sortie.map(function (s) {
      return { t: "texte", s: "entete", v: s.sorte === "col" ? s.col.titre : s.sorte === "niveau" ? "Niveau : " + s.col.titre : "Alertes" };
    }));
    for (var r = prem; r <= der; r++) f.lignes.push(ligneTableau(t, sortie, lettreDe, entrees, r, lignes[r - prem] || null, parent, ext, inc));
    sortie.forEach(function (s) {
      var plage = s.l + prem + ":" + s.l + der;
      if (s.sorte === "niveau") f.couleurs.push({ plage: plage, regles: s.col.niveaux.map(function (nv) { return { egal: nv.libelle, couleur: nv.couleur }; }) });
      if (s.sorte !== "col") return;
      if (s.col.couleurs) f.couleurs.push({ plage: plage, regles: reglesCouleurs(s.col) });
      if (s.col.type === "choix") f.listes.push({ plage: plage, valeurs: s.col.valeurs, titre: s.col.titre, aide: aideChoix(s.col) });
      else if (s.col.aide && s.col.type !== "calcul") f.aides.push({ plage: plage, titre: s.col.titre, aide: s.col.aide });
    });
    if ((t.totaux || []).length) {
      var res = { alertes: [], totaux: [] };
      suiviTableau(t, lignes, "", res, parent);
      f.lignes.push([]);
      f.lignes.push([{ t: "texte", v: "Totaux", s: "gras" }]);
      t.totaux.forEach(function (tot, k) {
        var x = excelTotal(tot, lettreDe, entrees, prem, der, ext, soupleDe(t, parent)), v = res.totaux[k].valeur, n = f.lignes.length + 1;
        var cellules = [{ t: "texte", v: tot.libelle, s: "gras" }, { t: "formule", f: x.f, tableau: x.tableau, v: v === null ? "" : v }];
        if (tot.niveaux) {
          cellules.push({ t: "formule", s: "haut", f: excelNiveau(tot, "B" + n), v: res.totaux[k].niveau ? res.totaux[k].niveau.libelle : "" });
          f.couleurs.push({ plage: "C" + n, regles: tot.niveaux.map(function (nv) { return { egal: nv.libelle, couleur: nv.couleur }; }) });
        }
        f.lignes.push(cellules);
      });
      if (t.aideTotaux) f.lignes.push([{ t: "texte", v: t.aideTotaux }]);
    }
    return f;
  }
  function reglesCouleurs(c) {
    return c.valeurs.map(function (v, k) { return { egal: v, couleur: c.couleurs[k] }; }).filter(function (x) { return x.couleur; });
  }
  // Nombre saisi (vide = 0 dans une somme) : une colonne du tableau, ou une rubrique du document.
  function soupleDe(t, parent) {
    return function (nom) {
      var c = t.colonnes.filter(function (x) { return x.id === nom; })[0];
      return c ? estSouple(c) : !!(parent && parent.souple && parent.souple(nom));
    };
  }
  function ligneTableau(t, sortie, lettreDe, entrees, r, ligne, parent, ext, inc) {
    var refs = { cellule: function (nom) { return lettreDe[nom] ? lettreDe[nom] + r : (ext || {})[nom] || nom; }, souple: soupleDe(t, parent),
      ligne: function (nom) { return t.colonnes.filter(function (x) { return x.id === nom; })[0] || null; } };
    var existe = existeX(entrees, function (c) { return lettreDe[c.id] + r; }, false);
    var calc = ligne ? calculerLigne(t.colonnes, ligne, parent) : { valeurs: {}, niveaux: {}, couleurs: {} };
    return sortie.map(function (s) {
      if (s.sorte === "alertes") return { t: "formule", s: "long", f: excelAlertes(t.alertes || [], refs, existe, inc), v: ligne ? alertesLigne(t, ligne, parent).join(" ") : "" };
      var c = s.col;
      if (s.sorte === "niveau") {
        var nv = calc.niveaux[c.id];
        return { t: "formule", s: "haut", f: excelNiveau(c, lettreDe[c.id] + r), v: nv ? nv.libelle : "" };
      }
      if (c.type === "calcul") { var v = calc.valeurs[c.id]; return { t: "formule", s: "haut", f: excelCalcul(c, refs, existe), v: v === null || v === undefined ? "" : v }; }
      return ligne ? celluleSaisie(c, ligne[c.id]) : null;
    });
  }
  function excelTotal(tot, lettreDe, entrees, prem, der, ext, souple) {
    var plage = function (nom) { return lettreDe[nom] ? lettreDe[nom] + prem + ":" + lettreDe[nom] + der : (ext || {})[nom] || nom; };
    var existe = existeX(entrees, function (c) { return plage(c.id); }, true);
    var cond = tot.si ? excelPlage(arbre(tot.si), { cellule: plage, souple: souple }) + "*" + existe : existe;
    var x = tot.colonne ? plage(tot.colonne) : "";
    switch (tot.calcul) {
      case "nombre": return { f: "SUM(" + cond + "*1)", tableau: true };
      case "somme": return tot.si ? { f: "SUM(IF(" + cond + "," + x + "))", tableau: true } : { f: "SUM(" + x + ")" };
      case "moyenne": return tot.si ? { f: "IFERROR(AVERAGE(IF(" + cond + "*(" + x + '<>""),' + x + ')),"")', tableau: true } : { f: "IFERROR(AVERAGE(" + x + '),"")' };
    }
    var F = tot.calcul === "min" ? "MIN" : "MAX";
    return tot.si ? { f: "IF(SUM(" + cond + "*(" + x + '<>""))=0,"",' + F + "(IF(" + cond + "*(" + x + '<>""),' + x + ")))", tableau: true } :
      { f: "IF(COUNT(" + x + ')=0,"",' + F + "(" + x + "))" };
  }

  function feuilleMatrice(def, nom, c, modele) {
    var cols = !modele && c.colonnes.length ? c.colonnes.map(function (n, k) { return n || def.colonne.titre + " " + (k + 1); }) :
      [1, 2, 3, 4, 5, 6].map(function (k) { return def.colonne.titre + " " + k; });
    var lignes = modele ? [] : c.lignes, nbC = cols.length, derL = lettre(1 + nbC), alerte = (def.alertes || []).length > 0;
    var nb = modele ? 20 : Math.max(10, lignes.length) + LIGNES_EN_PLUS, prem = 2, der = prem + nb - 1;
    var f = { nom: nom, figer: 1, paysage: true, lignes: [], listes: [], aides: [], couleurs: [],
      largeurs: [36].concat(cols.map(function () { return 14; })).concat(alerte ? [40] : []) };
    f.lignes.push([{ t: "texte", v: def.ligne.titre, s: "entete" }].concat(cols.map(function (n) { return { t: "texte", v: n, s: "entete" }; }))
      .concat(alerte ? [{ t: "texte", v: "Alertes", s: "entete" }] : []));
    for (var r = prem; r <= der; r++) f.lignes.push(ligneMatrice(def, lignes[r - prem] || null, r, nbC, derL, alerte));
    f.listes.push({ plage: "B" + prem + ":" + derL + der, valeurs: def.valeurs, titre: def.colonne.titre, aide: aideChoix(def) });
    f.aides.push({ plage: "A" + prem + ":A" + der, titre: def.ligne.titre, aide: def.ligne.aide || "" });
    f.lignes.push([]);
    if (def.aides) def.valeurs.forEach(function (v, k) {
      f.lignes.push([{ t: "texte", v: v + " = " + (def.libelles ? def.libelles[k] : v) + " : " + def.aides[k] }]);
    });
    else f.lignes.push([{ t: "texte", v: def.valeurs.map(function (v, k) { return v + " = " + (def.libelles ? def.libelles[k] : v); }).join(" · ") }]);
    return f;
  }
  function ligneMatrice(def, ligne, r, nbC, derL, alerte) {
    var cells = [ligne && !estVide(ligne.nom) ? { t: "texte", v: ligne.nom, s: "long" } : null];
    for (var k = 0; k < nbC; k++) {
      var v = ligne ? ligne.cases[k] : "";
      cells.push(estVide(v) ? null : typeof v === "number" ? { t: "nombre", v: v, s: "centre" } : { t: "texte", v: String(v), s: "centre" });
    }
    if (alerte) {
      var refs = { cellule: function () { return "A" + r; }, nb: function (v) { return "COUNTIF(B" + r + ":" + derL + r + "," + (typeof v === "number" ? nombreXml(v) : texteFormule(v)) + ")"; } };
      cells.push({ t: "formule", s: "long", f: excelAlertes(def.alertes, refs, "COUNTA(A" + r + ":" + derL + r + ")"),
        v: ligne ? alertesMatrice(def, ligne).join(" ") : "" });
    }
    return cells;
  }

  // Un document : une feuille pour ses rubriques (en texte ; le modèle vide garde les valeurs par défaut), puis une
  // feuille par rubrique « tableau ». Une formule d'un tableau qui lit une rubrique pointe sur sa cellule (1re feuille).
  function feuillesDocument(def, c, modele, pris, auj) {
    var f = { nom: nomFeuille(def.titre, pris), largeurs: [28, 90], lignes: [], listes: [], aides: [], couleurs: [] };
    var tableaux = def.rubriques.filter(function (r) { return r.type === "tableau"; }).map(function (r) {
      return { r: r, nom: nomFeuille(r.titre, pris) };
    });
    var nomTab = {}, ext = {}, feuille = "'" + f.nom.replace(/'/g, "''") + "'!";
    var base = modele ? contenuVide(def) : { rubriques: c.rubriques };
    tableaux.forEach(function (x) { nomTab[x.r.id] = x.nom; });
    f.lignes.push([{ t: "texte", v: def.titre, s: "titre" }]);
    if (!modele && String(c.nom || "").trim()) f.lignes.push([{ t: "texte", v: String(c.nom).trim() }]);
    f.lignes.push([]);
    def.rubriques.forEach(function (r) {
      var v = base.rubriques[r.id], titre = { t: "texte", v: r.titre, s: "gras" }, n = f.lignes.length + 1;
      if (r.type === "liste") {
        var items = modele ? ["", "", ""] : v.filter(function (x) { return !estVide(x); });
        if (!items.length) items = [""];
        items.forEach(function (x, k) { f.lignes.push([k ? null : titre, x ? { t: "texte", v: x, s: "long" } : null]); });
        if (r.aide) f.aides.push({ plage: "B" + n + ":B" + (n + items.length - 1), titre: r.titre, aide: r.aide });
      } else if (r.type === "tableau") {
        f.lignes.push([titre, { t: "texte", v: "Voir la feuille « " + nomTab[r.id] + " ».", s: "long" }]);
      } else {
        ext[r.id] = feuille + "$B$" + n;
        f.lignes.push([titre, celluleSaisie(r, v)]);
        if (r.couleurs) f.couleurs.push({ plage: "B" + n, regles: reglesCouleurs(r) });
        if (r.type === "choix") f.listes.push({ plage: "B" + n, valeurs: r.valeurs, titre: r.titre, aide: aideChoix(r) });
        else if (r.aide) f.aides.push({ plage: "B" + n, titre: r.titre, aide: r.aide });
      }
    });
    // Les alertes du document (pas celles d'une ligne : leur colonne « Alertes » se recalcule) : du texte, figé à l'export.
    if (!modele && (def.alertes || []).length) {
      var jourExport = aujourdhui(), al = suivi(def, base, auj).alertes.filter(function (a) { return a.rubrique === null; });
      f.lignes.push([]);
      f.lignes.push([{ t: "texte", v: "Alertes du document", s: "gras" }, { t: "texte", s: "long", v: "Export du " + dateFr(isoDuJour(jourExport)) +
        (typeof auj === "number" && auj !== jourExport ? ", situation au " + dateFr(isoDuJour(auj)) : "") + " : ce texte ne se recalcule pas dans Excel." }]);
      (al.length ? al.map(function (a) { return a.texte; }) : ["Aucune alerte."]).forEach(function (t) { f.lignes.push([null, { t: "texte", v: t, s: "long" }]); });
    }
    var parent = contexteDocument(def, base, auj);
    return [f].concat(tableaux.map(function (x) { return feuilleTableau(x.r, x.nom, modele ? [] : c.rubriques[x.r.id], modele, parent, ext); }));
  }

  // Le classeur d'un outil : doc = { nom, contenu, aujourdhui (facultatif) } ; sans doc, le modèle vide.
  function classeur(def, doc) {
    var modele = !doc, pris = [], c = doc ? doc.contenu : null, auj = doc ? doc.aujourdhui : undefined;
    if (def.type === "tableau") return { feuilles: [feuilleTableau(def, nomFeuille(def.titre, pris), modele ? [] : c.lignes, modele, contexteBase(auj))] };
    if (def.type === "matrice") return { feuilles: [feuilleMatrice(def, nomFeuille(def.titre, pris), c, modele)] };
    return { feuilles: feuillesDocument(def, modele ? null : { nom: doc.nom, rubriques: c.rubriques }, modele, pris, auj) };
  }

  // ---------- L'écrivain xlsx : le XML minimal d'un classeur ----------
  var NS = "http://schemas.openxmlformats.org/spreadsheetml/2006/main";
  var NS_R = "http://schemas.openxmlformats.org/officeDocument/2006/relationships";
  var NS_PKG = "http://schemas.openxmlformats.org/package/2006/relationships";
  var TETE = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n';
  var STYLE = { normal: 0, entete: 1, long: 2, date: 3, titre: 4, gras: 5, haut: 6, centre: 7 };
  var DXF = { ok: 0, attention: 1, ko: 2, neutre: 3 };
  var STYLES = TETE + '<styleSheet xmlns="' + NS + '">' +
    '<fonts count="3"><font><sz val="11"/><name val="Calibri"/><family val="2"/></font>' +
    '<font><b/><sz val="11"/><name val="Calibri"/><family val="2"/></font>' +
    '<font><b/><sz val="14"/><name val="Calibri"/><family val="2"/></font></fonts>' +
    '<fills count="3"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill>' +
    '<fill><patternFill patternType="solid"><fgColor rgb="FFE7E6E6"/><bgColor indexed="64"/></patternFill></fill></fills>' +
    '<borders count="2"><border><left/><right/><top/><bottom/><diagonal/></border>' +
    '<border><left/><right/><top/><bottom style="thin"><color rgb="FF808080"/></bottom><diagonal/></border></borders>' +
    '<cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs>' +
    '<cellXfs count="8">' +
    '<xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/>' +
    '<xf numFmtId="0" fontId="1" fillId="2" borderId="1" xfId="0" applyFont="1" applyFill="1" applyBorder="1" applyAlignment="1"><alignment vertical="center" wrapText="1"/></xf>' +
    '<xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0" applyAlignment="1"><alignment vertical="top" wrapText="1"/></xf>' +
    '<xf numFmtId="14" fontId="0" fillId="0" borderId="0" xfId="0" applyNumberFormat="1" applyAlignment="1"><alignment vertical="top"/></xf>' +
    '<xf numFmtId="0" fontId="2" fillId="0" borderId="0" xfId="0" applyFont="1"/>' +
    '<xf numFmtId="0" fontId="1" fillId="0" borderId="0" xfId="0" applyFont="1" applyAlignment="1"><alignment vertical="top" wrapText="1"/></xf>' +
    '<xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0" applyAlignment="1"><alignment vertical="top"/></xf>' +
    '<xf numFmtId="0" fontId="1" fillId="0" borderId="0" xfId="0" applyFont="1" applyAlignment="1"><alignment horizontal="center" vertical="top"/></xf>' +
    '</cellXfs><cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles>' +
    '<dxfs count="4">' +
    '<dxf><font><color rgb="FF006100"/></font><fill><patternFill><bgColor rgb="FFC6EFCE"/></patternFill></fill></dxf>' +
    '<dxf><font><color rgb="FF9C5700"/></font><fill><patternFill><bgColor rgb="FFFFEB9C"/></patternFill></fill></dxf>' +
    '<dxf><font><color rgb="FF9C0006"/></font><fill><patternFill><bgColor rgb="FFFFC7CE"/></patternFill></fill></dxf>' +
    '<dxf><font><color rgb="FF404040"/></font><fill><patternFill><bgColor rgb="FFEDEDED"/></patternFill></fill></dxf>' +
    '</dxfs><tableStyles count="0"/></styleSheet>';

  // Un texte sûr pour le XML : sans caractères de contrôle ni moitiés de caractères (sinon le fichier serait abîmé).
  function propre(t) {
    var s = String(t).replace(/\r\n?/g, "\n"), r = "";
    for (var i = 0; i < s.length; i++) {
      var c = s.charCodeAt(i);
      if (c >= 0xD800 && c <= 0xDBFF) {
        var d = s.charCodeAt(i + 1);
        if (d >= 0xDC00 && d <= 0xDFFF) { r += s.charAt(i) + s.charAt(i + 1); i++; }
        continue;
      }
      if ((c >= 0xDC00 && c <= 0xDFFF) || (c < 0x20 && c !== 9 && c !== 10) || c === 0xFFFE || c === 0xFFFF) continue;
      r += s.charAt(i);
    }
    return r;
  }
  function escX(t) {   // le texte d'une balise
    return propre(t).replace(/[&<>]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]; });
  }
  function escA(t) {   // la valeur d'un attribut, entre guillemets
    return escX(t).replace(/"/g, "&quot;");
  }
  function texteX(t) {
    t = propre(t);
    return "<t" + (/^\s|\s$|\n/.test(t) ? ' xml:space="preserve"' : "") + ">" + escX(t) + "</t>";
  }
  function celluleX(c, ref, sansCache) {
    if (!c) return "";
    var s = c.s ? ' s="' + STYLE[c.s] + '"' : "";
    if (c.t === "nombre") return '<c r="' + ref + '"' + s + "><v>" + nombreXml(c.v) + "</v></c>";
    if (c.t === "date") return '<c r="' + ref + '" s="' + STYLE.date + '"><v>' + c.v + "</v></c>";
    if (c.t === "texte") return '<c r="' + ref + '"' + s + ' t="inlineStr"><is>' + texteX(c.v) + "</is></c>";
    var f = c.tableau ? '<f t="array" ref="' + ref + '">' + escX(c.f) + "</f>" : "<f>" + escX(c.f) + "</f>";
    if (sansCache) return '<c r="' + ref + '"' + s + ">" + f + "</c>";
    if (typeof c.v === "number") return '<c r="' + ref + '"' + s + ">" + f + "<v>" + nombreXml(c.v) + "</v></c>";
    return '<c r="' + ref + '"' + s + ' t="str">' + f + "<v>" + escX(c.v === undefined || c.v === null ? "" : c.v) + "</v></c>";
  }
  function coupe(t, n) { t = propre(t); return t.length > n ? t.slice(0, n - 1) + "…" : t; }
  // Les valeurs d'une liste déroulante, écrites dans la formule ("1,2,3") : sans virgule ni guillemet, 255 caractères au plus.
  function listeX(valeurs) {
    var t = valeurs.map(String).join(",");
    return valeurs.some(function (v) { return /[,"]/.test(String(v)); }) || t.length > 253 ? null : '"' + t + '"';
  }
  function feuilleX(f, index, options) {
    var nbCol = Math.max(1, f.lignes.reduce(function (m, l) { return Math.max(m, l.length); }, 0)), x = [TETE + '<worksheet xmlns="' + NS + '">'];
    if (f.paysage) x.push('<sheetPr><pageSetUpPr fitToPage="1"/></sheetPr>');
    x.push('<dimension ref="A1:' + lettre(nbCol) + Math.max(1, f.lignes.length) + '"/>');
    x.push('<sheetViews><sheetView workbookViewId="0"' + (index === 0 ? ' tabSelected="1"' : "") + ">" +
      (f.figer ? '<pane ySplit="' + f.figer + '" topLeftCell="A' + (f.figer + 1) + '" activePane="bottomLeft" state="frozen"/>' +
        '<selection pane="bottomLeft" activeCell="A' + (f.figer + 1) + '" sqref="A' + (f.figer + 1) + '"/>' : "") + "</sheetView></sheetViews>");
    x.push('<sheetFormatPr defaultRowHeight="15"/>');
    if (f.largeurs && f.largeurs.length) x.push("<cols>" + f.largeurs.map(function (w, k) {
      return '<col min="' + (k + 1) + '" max="' + (k + 1) + '" width="' + w + '" customWidth="1"/>';
    }).join("") + "</cols>");
    x.push("<sheetData>");
    f.lignes.forEach(function (l, i) {
      var cells = l.map(function (c, k) { return celluleX(c, lettre(k + 1) + (i + 1), options.sansCache); }).join("");
      if (cells) x.push('<row r="' + (i + 1) + '">' + cells + "</row>");
    });
    x.push("</sheetData>");
    var priorite = 1;
    (f.couleurs || []).forEach(function (cf) {
      x.push('<conditionalFormatting sqref="' + cf.plage + '">' + cf.regles.map(function (rg) {
        return '<cfRule type="cellIs" dxfId="' + (DXF[rg.couleur] === undefined ? DXF.neutre : DXF[rg.couleur]) + '" priority="' + priorite++ +
          '" operator="equal"><formula>' + escX(typeof rg.egal === "number" ? nombreXml(rg.egal) : texteFormule(rg.egal)) + "</formula></cfRule>";
      }).join("") + "</conditionalFormatting>");
    });
    var valid = [];
    (f.listes || []).forEach(function (li) {
      var liste = listeX(li.valeurs), aide = coupe(li.aide || "", 250);
      valid.push("<dataValidation" + (liste ? ' type="list" allowBlank="1" showErrorMessage="1" errorTitle="Valeur non prévue" error="Choisis une valeur dans la liste."' : ' allowBlank="1"') +
        (aide ? ' showInputMessage="1" promptTitle="' + escA(coupe(li.titre, 32)) + '" prompt="' + escA(aide) + '"' : "") + ' sqref="' + li.plage + '"' +
        (liste ? "><formula1>" + escX(liste) + "</formula1></dataValidation>" : "/>"));
    });
    (f.aides || []).forEach(function (a) {
      if (!a.aide) return;
      valid.push('<dataValidation allowBlank="1" showInputMessage="1" promptTitle="' + escA(coupe(a.titre, 32)) + '" prompt="' + escA(coupe(a.aide, 250)) + '" sqref="' + a.plage + '"/>');
    });
    if (valid.length) x.push('<dataValidations count="' + valid.length + '">' + valid.join("") + "</dataValidations>");
    x.push('<pageMargins left="0.5" right="0.5" top="0.6" bottom="0.6" header="0.3" footer="0.3"/>');
    if (f.paysage) x.push('<pageSetup paperSize="9" orientation="landscape" fitToWidth="1" fitToHeight="0"/>');
    x.push("</worksheet>");
    return x.join("");
  }
  // classeur → les octets d'un .xlsx. options.sansCache : formules sans valeur calculée (tests : Excel ou LibreOffice
  // doivent alors tout calculer eux-mêmes) ; options.date : la date des fichiers du zip.
  function xlsx(cl, options) {
    options = options || {};
    var fs = cl.feuilles, fichiers = [];
    fichiers.push({ nom: "[Content_Types].xml", texte: TETE + '<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">' +
      '<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>' +
      '<Default Extension="xml" ContentType="application/xml"/>' +
      '<Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>' +
      '<Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>' +
      fs.map(function (f, i) { return '<Override PartName="/xl/worksheets/sheet' + (i + 1) + '.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>'; }).join("") +
      "</Types>" });
    fichiers.push({ nom: "_rels/.rels", texte: TETE + '<Relationships xmlns="' + NS_PKG + '">' +
      '<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>' });
    fichiers.push({ nom: "xl/workbook.xml", texte: TETE + '<workbook xmlns="' + NS + '" xmlns:r="' + NS_R + '">' +
      '<bookViews><workbookView activeTab="0"/></bookViews><sheets>' +
      fs.map(function (f, i) { return '<sheet name="' + escA(f.nom) + '" sheetId="' + (i + 1) + '" r:id="rId' + (i + 1) + '"/>'; }).join("") +
      '</sheets><calcPr fullCalcOnLoad="1"/></workbook>' });
    fichiers.push({ nom: "xl/_rels/workbook.xml.rels", texte: TETE + '<Relationships xmlns="' + NS_PKG + '">' +
      fs.map(function (f, i) { return '<Relationship Id="rId' + (i + 1) + '" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet' + (i + 1) + '.xml"/>'; }).join("") +
      '<Relationship Id="rId' + (fs.length + 1) + '" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/></Relationships>' });
    fichiers.push({ nom: "xl/styles.xml", texte: STYLES });
    fs.forEach(function (f, i) { fichiers.push({ nom: "xl/worksheets/sheet" + (i + 1) + ".xml", texte: feuilleX(f, i, options) }); });
    return zip(fichiers.map(function (f) { return { nom: f.nom, octets: utf8(f.texte) }; }), options.date);
  }

  // ---------- Zip « stocké » (sans compression), CRC32, UTF-8 ----------
  var TABLE_CRC = null;
  function crc32(o) {
    if (!TABLE_CRC) {
      TABLE_CRC = [];
      for (var n = 0; n < 256; n++) { var c = n; for (var k = 0; k < 8; k++) c = c & 1 ? 0xEDB88320 ^ (c >>> 1) : c >>> 1; TABLE_CRC[n] = c >>> 0; }
    }
    var crc = 0xFFFFFFFF;
    for (var i = 0; i < o.length; i++) crc = TABLE_CRC[(crc ^ o[i]) & 255] ^ (crc >>> 8);
    return (crc ^ 0xFFFFFFFF) >>> 0;
  }
  function utf8(t) {
    var s = String(t), o = [];
    for (var i = 0; i < s.length; i++) {
      var c = s.charCodeAt(i);
      if (c >= 0xD800 && c <= 0xDBFF && i + 1 < s.length) {
        var d = s.charCodeAt(i + 1);
        if (d >= 0xDC00 && d <= 0xDFFF) { c = 0x10000 + ((c - 0xD800) << 10) + (d - 0xDC00); i++; }
      }
      if (c < 0x80) o.push(c);
      else if (c < 0x800) o.push(0xC0 | (c >> 6), 0x80 | (c & 63));
      else if (c < 0x10000) o.push(0xE0 | (c >> 12), 0x80 | ((c >> 6) & 63), 0x80 | (c & 63));
      else o.push(0xF0 | (c >> 18), 0x80 | ((c >> 12) & 63), 0x80 | ((c >> 6) & 63), 0x80 | (c & 63));
    }
    return new Uint8Array(o);
  }
  function mot16(t, p, v) { t[p] = v & 255; t[p + 1] = (v >>> 8) & 255; }
  function mot32(t, p, v) { t[p] = v & 255; t[p + 1] = (v >>> 8) & 255; t[p + 2] = (v >>> 16) & 255; t[p + 3] = (v >>> 24) & 255; }
  // fichiers : [{ nom, octets: Uint8Array }] → les octets du zip (méthode 0 « stocké », comme le permet le format).
  function zip(fichiers, date) {
    var d = date || new Date();
    var heure = (d.getHours() << 11) | (d.getMinutes() << 5) | Math.floor(d.getSeconds() / 2);
    var jourZip = ((Math.max(1980, d.getFullYear()) - 1980) << 9) | ((d.getMonth() + 1) << 5) | d.getDate();
    var morceaux = [], central = [], pos = 0;
    fichiers.forEach(function (f) {
      var nom = utf8(f.nom), data = f.octets, crc = crc32(data);
      var loc = new Uint8Array(30 + nom.length);
      mot32(loc, 0, 0x04034b50); mot16(loc, 4, 20); mot16(loc, 6, 0); mot16(loc, 8, 0);
      mot16(loc, 10, heure); mot16(loc, 12, jourZip); mot32(loc, 14, crc); mot32(loc, 18, data.length); mot32(loc, 22, data.length);
      mot16(loc, 26, nom.length); mot16(loc, 28, 0); loc.set(nom, 30);
      var cen = new Uint8Array(46 + nom.length);
      mot32(cen, 0, 0x02014b50); mot16(cen, 4, 20); mot16(cen, 6, 20); mot16(cen, 8, 0); mot16(cen, 10, 0);
      mot16(cen, 12, heure); mot16(cen, 14, jourZip); mot32(cen, 16, crc); mot32(cen, 20, data.length); mot32(cen, 24, data.length);
      mot16(cen, 28, nom.length); mot16(cen, 30, 0); mot16(cen, 32, 0); mot16(cen, 34, 0); mot16(cen, 36, 0); mot32(cen, 38, 0);
      mot32(cen, 42, pos); cen.set(nom, 46);
      morceaux.push(loc, data);
      central.push(cen);
      pos += loc.length + data.length;
    });
    var tailleCentral = central.reduce(function (s, c) { return s + c.length; }, 0);
    var fin = new Uint8Array(22);
    mot32(fin, 0, 0x06054b50); mot16(fin, 4, 0); mot16(fin, 6, 0); mot16(fin, 8, fichiers.length); mot16(fin, 10, fichiers.length);
    mot32(fin, 12, tailleCentral); mot32(fin, 16, pos); mot16(fin, 20, 0);
    var tout = new Uint8Array(pos + tailleCentral + 22), p = 0;
    morceaux.concat(central, [fin]).forEach(function (m) { tout.set(m, p); p += m.length; });
    return tout;
  }

  L.outilsMoteur = {
    FORMAT_FICHIER: FORMAT_FICHIER, MAX: MAX, MOTS_RESERVES: MOTS_RESERVES, COULEURS: COULEURS, TYPES_CHAMP: TYPES_CHAMP,
    TYPES_RUBRIQUE: TYPES_RUBRIQUE, CALCULS_TOTAL: CALCULS_TOTAL,
    // valeurs
    estVide: estVide, lireNombre: lireNombre, fmtNombre: fmtNombre, jour: jour, isoDuJour: isoDuJour, dateFr: dateFr,
    indexValeur: indexValeur, texteChoix: texteChoix, texteValeur: texteValeur, texteCalcul: texteCalcul,
    fixerAujourdhui: function (n) { jourFixe = n === undefined ? null : n; },
    // expressions
    lire: lire, evaluer: evaluer, excel: excel, excelPlage: excelPlage, typer: typer, citees: citees,
    // documents
    calculerLigne: calculerLigne, ligneRemplie: ligneRemplie, ligneVide: ligneVide, suivi: suivi, aDesAlertes: aDesAlertes,
    contexteDocument: contexteDocument, contexteBase: contexteBase, parentDe: parentDe, couleurChoix: couleurChoix,
    contenuVide: contenuVide, contenuExemple: contenuExemple, examiner: examiner, fichier: fichier, lireFichier: lireFichier,
    resumeDocument: resumeDocument, annonceOuverture: annonceOuverture, incompletes: incompletes, strictes: strictes, estSouple: estSouple, MAX_CASES_VIDES: MAX_CASES_VIDES, pluriel: pluriel, ligneDef: ligneDef,
    // sorties
    texteDocument: texteDocument, htmlDocument: htmlDocument, classeur: classeur, xlsx: xlsx, zip: zip, crc32: crc32, utf8: utf8,
    lettre: lettre
  };
})();
