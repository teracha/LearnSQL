// Recherche des Astuces SQL (docs/astuces.md) : la vraie recherche de js/app.js (chercherDico(question, "astuces"), code
// pris entre « var DICO_MOTS_VIDES » et « function dicoMoteur », comme outils/tests/recherche-divalto.js).
// 1. La recherche elle-même, sur des astuces d'essai écrites ici (pas sur le site) : des besoins proches d'une astuce à
//    l'autre (premier ou dernier jour du mois, espaces devant ou derrière…), les mêmes règles qu'en 2 ; une phrase sans
//    rapport ne trouve rien ; les astuces et le dico ne se mêlent pas.
// 2. Les vraies astuces de data/astuces/*.js : pour chaque astuce, chaque phrase de `besoins` la trouve au rang 1, chaque
//    phrase de `essais` dans les 3 premières.
// Usage (depuis la racine du dépôt) : node outils/tests/recherche-astuces.js [-v]   (-v : affiche aussi les réussites)
// Dernière ligne : « N échec(s) sur M » (M : les phrases des vraies astuces) ; code de sortie 1 s'il y a un échec, où que ce soit.
var fs = require('fs'), path = require('path'), vm = require('vm');
var racine = path.join(__dirname, '..', '..');
var bavard = process.argv.indexOf('-v') >= 0;
var app = fs.readFileSync(path.join(racine, 'js', 'app.js'), 'utf8');
var debut = app.indexOf('  var DICO_MOTS_VIDES = {};'), fin = app.indexOf('  function dicoMoteur()');
if (debut < 0 || fin < 0) { console.log('code de recherche introuvable dans js/app.js'); process.exit(1); }

// Un contexte : le code de recherche, les fiches du dico, et des astuces (les vraies, ou celles d'essai).
function contexte(astuces) {
  var ctx = { LEARNSQL: {}, DATA: {} };
  vm.createContext(ctx);
  ['dico', 'astuces'].forEach(function (d) {
    fs.readdirSync(path.join(racine, 'data', d)).filter(function (f) { return /\.js$/.test(f); }).sort().forEach(function (f) {
      vm.runInContext(fs.readFileSync(path.join(racine, 'data', d, f), 'utf8'), ctx);
    });
  });
  ctx.DATA.dico = ctx.LEARNSQL.dico;
  ctx.DATA.astuces = astuces || ctx.LEARNSQL.astuces || [];
  vm.runInContext(app.slice(debut, fin) + '\nthis.chercherDico = chercherDico;', ctx);
  return ctx;
}

// Rejoue les besoins (rang 1) et les essais (rang 3 au plus) de chaque astuce ; renvoie [échecs, phrases].
function rejouer(ctx, titre) {
  var echecs = 0, total = 0;
  ctx.DATA.astuces.forEach(function (a) {
    [['besoins', 1], ['essais', 3]].forEach(function (x) {
      (a[x[0]] || []).forEach(function (q) {
        total++;
        var res = ctx.chercherDico(q, 'astuces'), rang = res.map(function (r) { return r.fiche.id; }).indexOf(a.id) + 1;
        var ok = rang > 0 && rang <= x[1];
        if (!ok) echecs++;
        if (!ok || bavard) console.log((ok ? 'ok    ' : 'ÉCHEC ') + x[0].slice(0, -1) + ' ' + JSON.stringify(q) + ' → ' + a.id + ' rang ' +
          (rang || '-') + ' (' + (x[1] === 1 ? '1' : '≤ 3') + ') : ' + res.slice(0, 3).map(function (r) { return r.fiche.id + ' ' + r.score; }).join(', '));
      });
    });
  });
  console.log(titre + ' : ' + echecs + ' échec(s) sur ' + total);
  return [echecs, total];
}

// 1. Des astuces d'essai (même format que data/astuces ; seuls les champs lus par la recherche comptent ici).
var ESSAI = [
  { id: 'zeros-devant', titre: 'Compléter un numéro avec des zéros devant', famille: 'Compléter',
    besoins: ['sortir un numéro client avec des zéros devant', 'un numéro sur 6 chiffres avec des zéros à gauche', 'transformer 42 en 000042'],
    essais: ['je voudrais un numero de facture sur 8 caractere avec des 0', 'remplir à gauche avec des zéros', 'zerofill'],
    moteurs: { sqlserver: "`RIGHT('000000' + CAST(id AS VARCHAR(6)), 6)`, ou `FORMAT(id, 'D6')`", snowflake: "`LPAD(id::VARCHAR, 6, '0')`",
      mysql: "`LPAD(id, 6, '0')` ; l'attribut `ZEROFILL` est obsolète depuis MySQL 8.0.17" },
    motsCles: ['zéro', 'zeros', '0', 'compléter', 'gauche', 'devant', 'padding', 'largeur', 'longueur fixe', 'numéro', 'code', 'format'] },
  { id: 'espaces-droite', titre: 'Compléter un code avec des espaces à droite', famille: 'Compléter',
    besoins: ['compléter un code avec des espaces à droite', 'un libellé sur 30 caractères pour un fichier à largeur fixe'],
    essais: ['remplir a droite avec des blancs', 'rpad'],
    moteurs: { sqlserver: '`LEFT(code + SPACE(10), 10)`', snowflake: "`RPAD(code, 10, ' ')`", mysql: "`RPAD(code, 10, ' ')`" },
    motsCles: ['espace', 'droite', 'compléter', 'largeur fixe', 'blanc', 'fichier', 'longueur'] },
  { id: 'null-par-zero', titre: 'Remplacer un NULL par 0', famille: 'Compléter',
    besoins: ['remplacer les valeurs vides par zéro', 'afficher 0 quand le montant est NULL'],
    essais: ['mettre 0 a la place de null', 'isnull par defaut'],
    moteurs: { sqlserver: '`ISNULL(montant, 0)` ou `COALESCE(montant, 0)`', snowflake: '`COALESCE(montant, 0)` ou `NVL(montant, 0)`',
      mysql: '`IFNULL(montant, 0)` ou `COALESCE(montant, 0)`' },
    motsCles: ['null', 'vide', 'zéro', 'remplacer', 'défaut', 'valeur', 'manquant'] },
  { id: 'montant-2-decimales', titre: 'Afficher un montant avec 2 décimales', famille: 'Formater',
    besoins: ['afficher un montant avec deux décimales', "arrondir un prix à 2 chiffres après la virgule pour l'affichage"],
    essais: ['format monétaire 2 decimales', 'montant avec des centimes'],
    moteurs: { sqlserver: "`FORMAT(montant, 'N2')` ou `CAST(montant AS DECIMAL(10,2))`", snowflake: "`TO_CHAR(montant, '999990.00')`", mysql: '`FORMAT(montant, 2)`' },
    motsCles: ['montant', 'décimales', 'virgule', 'centimes', 'prix', 'arrondi', 'format'] },
  { id: 'date-francaise', titre: 'Écrire une date en JJ/MM/AAAA', famille: 'Formater',
    besoins: ['écrire une date au format français', 'afficher la date en jour/mois/année'],
    essais: ['date en jj/mm/aaaa', 'convertir une date en texte francais'],
    moteurs: { sqlserver: "`CONVERT(VARCHAR(10), date_cde, 103)` ou `FORMAT(date_cde, 'dd/MM/yyyy')`", snowflake: "`TO_CHAR(date_cde, 'DD/MM/YYYY')`",
      mysql: "`DATE_FORMAT(date_cde, '%d/%m/%Y')`" },
    motsCles: ['date', 'format', 'français', 'jour', 'mois', 'année', '103', 'texte'] },
  { id: 'enlever-espaces', titre: 'Enlever les espaces au début et à la fin', famille: 'Nettoyer du texte',
    besoins: ["enlever les espaces autour d'un libellé", 'supprimer les blancs avant et après le texte'],
    essais: ['trim', "nettoyer les espaces en trop d'un code client"],
    moteurs: { sqlserver: '`TRIM(libelle)` (2017+) ou `LTRIM(RTRIM(libelle))`', snowflake: '`TRIM(libelle)`', mysql: '`TRIM(libelle)`' },
    motsCles: ['espace', 'blanc', 'enlever', 'supprimer', 'nettoyer', 'début', 'fin', 'trim'] },
  { id: 'retours-ligne', titre: "Enlever les retours à la ligne d'un texte", famille: 'Nettoyer du texte',
    besoins: ['enlever les retours à la ligne dans un commentaire', 'supprimer les sauts de ligne avant un export CSV'],
    essais: ['remplacer CHAR(13) et CHAR(10)', 'texte sur plusieurs lignes dans excel'],
    moteurs: { sqlserver: "`REPLACE(REPLACE(txt, CHAR(13), ''), CHAR(10), ' ')`", snowflake: "`REPLACE(REPLACE(txt, CHR(13), ''), CHR(10), ' ')`",
      mysql: "`REPLACE(REPLACE(txt, CHAR(13), ''), CHAR(10), ' ')`" },
    motsCles: ['retour', 'ligne', 'saut', 'entrée', 'csv', 'export', 'char(13)', 'nettoyer'] },
  { id: 'avant-tiret', titre: 'Garder le texte avant un tiret', famille: 'Manipuler',
    besoins: ["garder la partie avant le tiret d'un code article", 'couper un texte au premier tiret'],
    essais: ["extraire le prefixe d'une reference", 'tout ce qui est a gauche du -'],
    moteurs: { sqlserver: "`LEFT(code, CHARINDEX('-', code) - 1)`", snowflake: "`SPLIT_PART(code, '-', 1)`", mysql: "`SUBSTRING_INDEX(code, '-', 1)`" },
    motsCles: ['tiret', 'avant', 'couper', 'extraire', 'partie', 'gauche', 'séparateur', 'préfixe'] },
  { id: 'concatener', titre: 'Coller deux colonnes avec un séparateur', famille: 'Manipuler',
    besoins: ['coller le code et le nom du client avec un tiret', 'assembler plusieurs colonnes en une seule'],
    essais: ['concatener nom prenom', 'mettre bout a bout deux champs'],
    moteurs: { sqlserver: "`CONCAT_WS(' - ', code, nom)`", snowflake: "`CONCAT_WS(' - ', code, nom)`", mysql: "`CONCAT_WS(' - ', code, nom)`" },
    motsCles: ['coller', 'assembler', 'concaténer', 'joindre', 'séparateur', 'colonnes', 'bout à bout'] },
  { id: 'premier-jour-mois', titre: 'Trouver le premier jour du mois', famille: 'Dates utiles',
    besoins: ["trouver le premier jour du mois d'une date", 'le 1er du mois de la commande'],
    essais: ['debut du mois', 'date du premier jour du mois en cours'],
    moteurs: { sqlserver: '`DATEFROMPARTS(YEAR(d), MONTH(d), 1)`', snowflake: "`DATE_TRUNC('month', d)`", mysql: "`DATE_FORMAT(d, '%Y-%m-01')`" },
    motsCles: ['premier', 'jour', 'mois', 'début', '1er', 'date'] },
  { id: 'dernier-jour-mois', titre: 'Trouver le dernier jour du mois', famille: 'Dates utiles',
    besoins: ["trouver le dernier jour du mois d'une date", 'la fin du mois pour une échéance'],
    essais: ['fin de mois', 'date du dernier jour du mois en cours'],
    moteurs: { sqlserver: '`EOMONTH(d)`', snowflake: '`LAST_DAY(d)`', mysql: '`LAST_DAY(d)`' },
    motsCles: ['dernier', 'jour', 'mois', 'fin', 'échéance', 'date'] },
  { id: 'age-annees', titre: 'Calculer un âge en années', famille: 'Dates utiles',
    besoins: ["calculer l'âge d'un client en années", "le nombre d'années entre deux dates"],
    essais: ['anciennete en annee', 'age a partir de la date de naissance'],
    moteurs: { sqlserver: "`DATEDIFF(YEAR, d1, d2)` (compte les passages d'année : à corriger)", snowflake: '`DATEDIFF(year, d1, d2)`', mysql: '`TIMESTAMPDIFF(YEAR, d1, d2)`' },
    motsCles: ['âge', 'années', 'ancienneté', 'différence', 'naissance', 'entre'] },
  { id: 'verifier-nombre', titre: "Vérifier qu'un texte est un nombre", famille: 'Contrôler les données',
    besoins: ["vérifier qu'une colonne texte contient bien un nombre", 'trouver les codes qui ne sont pas numériques'],
    essais: ['isnumeric', 'controle des montants mal saisis dans un import'],
    moteurs: { sqlserver: '`TRY_CAST(x AS INT) IS NULL`', snowflake: '`TRY_TO_NUMBER(x) IS NULL`', mysql: "`x NOT REGEXP '^[0-9]+$'`" },
    motsCles: ['nombre', 'numérique', 'vérifier', 'contrôle', 'import', 'texte', 'chiffres', 'isnumeric'] },
  { id: 'doublons', titre: 'Trouver les doublons', famille: 'Contrôler les données',
    besoins: ['trouver les clients en double', 'repérer les lignes en double dans une table'],
    essais: ['doublon sur le code', 'mêmes valeurs plusieurs fois'],
    moteurs: { sqlserver: '`GROUP BY code HAVING COUNT(*) > 1`', snowflake: '`GROUP BY code HAVING COUNT(*) > 1`', mysql: '`GROUP BY code HAVING COUNT(*) > 1`' },
    motsCles: ['doublon', 'double', 'plusieurs', 'deux fois', 'unique', 'contrôle', 'compter'] }
];
var essai = contexte(ESSAI);
var autres = rejouer(essai, 'astuces d\'essai')[0];
// Des recherches de plus : la fonction d'une solution (un mot-clé), une phrase sans rapport, une question vide.
[['LPAD', 'zeros-devant'], ['eomonth', 'dernier-jour-mois'], ['concat_ws', 'concatener'],
 ["j'aimerais bien sortir un numéro client", 'zeros-devant']].forEach(function (x) {
  var res = essai.chercherDico(x[0], 'astuces');
  if (!res.length || res[0].fiche.id !== x[1]) { autres++; console.log('ÉCHEC « ' + x[0] + ' » → ' + x[1] + ' : ' + res.slice(0, 3).map(function (r) { return r.fiche.id + ' ' + r.score; }).join(', ')); }
});
['zzqxw', '', '   '].forEach(function (q) {
  var res = essai.chercherDico(q, 'astuces');
  if (res.length) { autres++; console.log('ÉCHEC « ' + q + ' » ne devrait rien trouver : ' + res.map(function (r) { return r.fiche.id; }).join(', ')); }
});
// Les astuces et le dico ne se mêlent pas : une astuce n'est jamais une fiche du dico, et l'inverse.
var mele = ['coalesce', 'zéros devant', 'LPAD', 'enlever les espaces', 'premier jour du mois'].filter(function (q) {
  return essai.chercherDico(q, 'astuces').some(function (r) { return !r.fiche.titre || r.fiche.nom; }) ||
    essai.chercherDico(q).some(function (r) { return r.fiche.titre && !r.fiche.nom; });
});
if (mele.length) { autres++; console.log('ÉCHEC astuces et fiches du dico mêlées pour : ' + mele.join(', ')); }

// 2. Les vraies astuces.
var vraies = contexte(null);
if (!vraies.DATA.astuces.length) console.log('(aucune astuce dans data/astuces)');
var r = rejouer(vraies, 'vraies astuces (' + vraies.DATA.astuces.length + ')');
console.log(r[0] + ' échec(s) sur ' + r[1] + (autres ? ' (et ' + autres + ' autre(s) échec(s) plus haut)' : ''));
process.exitCode = r[0] || autres ? 1 : 0;
