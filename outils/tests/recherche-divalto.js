// Recherche de l'onglet Divalto du super dico : la vraie recherche de js/app.js (chercherDico(question, "divalto"), code
// pris entre « var DICO_MOTS_VIDES » et « function dicoMoteur »), sur les vraies fiches de data/dico/*.js.
// 1. Les 123 questions de l'expert Divalto (recherche-divalto.txt, 09/11/2026) : la fiche attendue au rang 1, sauf un
//    rang maximal donné en 3e valeur pour un cas ambigu (avec sa raison en commentaire ; aucun pour l'instant).
// 2. Les exemples du texte d'aide de l'onglet, des mots tapés seuls, des fautes de frappe et des noms de champs.
// 3. « PINO » : la fiche du champ, puis les tables qui ont ce champ ; et jamais une fiche SQL dans l'onglet Divalto.
// Usage (depuis la racine du dépôt) : node outils/tests/recherche-divalto.js [-v]   (-v : affiche aussi les réussites)
// Dernière ligne : « N échec(s) sur 123 » (les questions de l'expert) ; code de sortie 1 s'il y a un échec, où que ce soit.
var fs = require('fs'), path = require('path'), vm = require('vm');
var racine = path.join(__dirname, '..', '..');
var bavard = process.argv.indexOf('-v') >= 0;
var app = fs.readFileSync(path.join(racine, 'js', 'app.js'), 'utf8');
var debut = app.indexOf('  var DICO_MOTS_VIDES = {};'), fin = app.indexOf('  function dicoMoteur()');
if (debut < 0 || fin < 0) { console.log('code de recherche introuvable dans js/app.js'); process.exit(1); }
var ctx = { LEARNSQL: {}, DATA: {} };
vm.createContext(ctx);
fs.readdirSync(path.join(racine, 'data', 'dico')).filter(function (f) { return /\.js$/.test(f); }).forEach(function (f) {
  vm.runInContext(fs.readFileSync(path.join(racine, 'data', 'dico', f), 'utf8'), ctx);
});
ctx.DATA.dico = ctx.LEARNSQL.dico;
vm.runInContext(app.slice(debut, fin) + '\nthis.chercherDico = chercherDico;', ctx);
var parId = {};
ctx.DATA.dico.forEach(function (f) { if (f.domaine === 'divalto') parId[f.id] = f; });
function chercher(q) { return ctx.chercherDico(q, 'divalto'); }

// 1. [question, id attendu, rang maximal (1 si absent)]
var QUESTIONS = [
  // Les tables des pièces
  ["table des lignes de commande", "dv-mouv"],
  ["lignes de facture", "dv-mouv"],
  ["quantité livrée sur une ligne de commande", "dv-mouv"],
  ["MOUV", "dv-mouv"],
  ["en-tête de commande", "dv-ent"],
  ["entete de piece", "dv-ent"],
  ["ENT", "dv-ent"],
  ["où est le stock d'un article par emplacement et par lot", "dv-mvtl"],
  ["ventilation des lignes", "dv-mvtl"],
  ["réservations de stock", "dv-mres"],
  ["adresse de livraison saisie sur la pièce", "dv-ead"],
  ["bon de préparation", "dv-bpent"],
  ["échéances multiples d'une facture", "dv-eec"],
  ["lignes du bon de preparation quantité préparée", "dv-bpdet"],
  // Tiers et dossier
  ["fiche client", "dv-cli"],
  ["table des fournisseurs", "dv-fou"],
  // Cas difficile : la faute « fourniseur » est proche du nom FOURNISSEUR_V (bonus de nom), la fiche FOU n'a pas ce nom.
  ["fiche fourniseur", "dv-fou"],
  ["qualification des prospects", "dv-pro"],
  ["représentant commission", "dv-vrp"],
  ["tiers interne", "dv-tia"],
  ["adresses du client", "dv-t1"],
  ["contacts d'un client", "dv-t2"],
  ["iban du fournisseur", "dv-t3"],
  ["paramètres du dossier valorisation du stock", "dv-soc"],
  ["table des établissements", "dv-ets"],
  // Articles, tarifs, stats
  ["table des articles", "dv-art"],
  ["cout moyen pondéré de la sous-référence", "dv-sart"],
  ["libellé complémentaire et traduction de l'article", "dv-lart"],
  ["stock d'alerte et stock de sécurité", "dv-rso"],
  ["emplacement implicite de l'article par dépôt", "dv-artdepo"],
  ["référence de l'article chez le client", "dv-rcl"],
  ["référence fournisseur et délai fournisseur", "dv-rfo"],
  ["code EAN multiples", "dv-sartean"],
  ["prix de vente tarif", "dv-tar"],
  ["remise client", "dv-tre"],
  ["prix d'achat fournisseur", "dv-tfo"],
  ["statistiques de vente par mois", "dv-sta"],
  ["taux de rotation des articles", "dv-stb"],
  ["rang du client en chiffre d'affaires", "dv-stc"],
  ["déclaration d'échanges de biens", "dv-tva-deb"],
  // Affaires, contrats, achats, inventaire
  ["affaire chef de projet", "dv-prjap"],
  ["projet avant-vente motif de perte", "dv-prjav"],
  ["contrats de maintenance", "dv-ceacontrat"],
  ["calendrier des échéances du contrat", "dv-contratcal"],
  ["préparation des factures contrat", "dv-contratprefa"],
  ["sites des clients", "dv-site"],
  ["demande d'achat", "dv-daoent"],
  ["inventaire date d'arrêté", "dv-invent"],
  // Tables communes Txxx
  ["tables communes dossier 999", "dv-txxx"],
  ["table des tables", "dv-t000"],
  ["mode de règlement 45 jours fin de mois", "dv-t006"],
  ["famille statistique article", "dv-t012"],
  ["table des dépôts", "dv-t017"],
  ["table des codes opération", "dv-t020"],
  ["nature de produit acheté fabriqué", "dv-t036"],
  ["taux de TVA", "dv-t085"],
  ["régime TVA des tiers", "dv-t086"],
  ["régions états provinces", "dv-t099"],
  // Comptabilité
  ["écritures comptables", "dv-c8"],
  ["ecritures comptabls grand livre", "dv-c8"],
  ["ventilation analytique", "dv-cx"],
  ["échéancier client règlement", "dv-cp"],
  ["ventilation TVA à déclarer", "dv-ctax"],
  ["plan comptable", "dv-c3"],
  ["journaux comptables", "dv-c4"],
  ["axes analytiques hiérarchie", "dv-c5"],
  ["soldes des comptes migration x12", "dv-cs"],
  // Production et affaires industrielles
  ["en-tête des ordres de fabrication", "dv-bf"],
  ["composants d'une ligne d'OF", "dv-bg"],
  ["nomenclature composants quantité de structure", "dv-bb"],
  ["gamme de fabrication temps de préparation", "dv-bc"],
  ["éléments d'affaire arborescence", "dv-gpaelem"],
  ["temps passés sur les affaires", "dv-afrtps"],
  ["statut maître élément d'affaire", "dv-gatelemst"],
  // Autres tables
  ["utilisateurs login", "dv-muser"],
  ["table des fichiers joints", "dv-mjoint"],
  ["rendez-vous et tâches CRM", "dv-evttiers"],
  ["notes de frais", "dv-ndfent"],
  ["historique des modifications pour l'audit", "dv-mtrctrace"],
  ["tickets de caisse point de vente", "dv-pvt"],
  ["stock WMS contenant", "dv-wmvtl"],
  ["chiffre d'affaires de l'année dernière base BI", "dv-f-facture-vente-ligne"],
  // Champs
  ["numéro de pièce", "dv-pino"],
  ["PINO", "dv-pino"],
  ["type de tiers client fournisseur", "dv-ticod"],
  ["type de pièce devis commande facture", "dv-picod"],
  ["code dossier", "dv-dos"],
  ["référence article sous-référence", "dv-ref"],
  ["champs CE code enregistrement", "dv-ce"],
  ["état de la pièce active périmée", "dv-ce4"],
  ["numéro d'enregistrement d'une ligne de pièce", "dv-enrno"],
  ["lien ligne ventilation", "dv-enrno"],
  ["sens entrée sortie débit crédit", "dv-sens"],
  ["ticket de réservation", "dv-ticketres"],
  ["délai de livraison demandé accepté reporté", "dv-deldt"],
  ["qui a modifié la pièce", "dv-user-trace"],
  ["date de fin de validité", "dv-hsdt"],
  ["champ tableau colonne 0001", "dv-champ-tableau"],
  ["oui non 1 2 booléen", "dv-oui-non"],
  ["centrale d'achat", "dv-tiersgrp"],
  ["axes analytiques de la pièce", "dv-axe"],
  // Vues SQL
  ["vue SQL des articles", "dv-article-v"],
  ["comment trouver la vue qu'il me faut", "dv-vues-sql"],
  ["clé pour relier les vues dans Power BI", "dv-cle"],
  ["identifiant technique ENT_ID", "dv-id"],
  ["vue des lignes de commandes de vente", "dv-commande-vente-mouv-v"],
  ["vue fournisseurs power bi", "dv-fournisseur-v"],
  ["accès odata excel", "dv-action-materiel-v"],
  // Requêtes Dataviz
  ["top 10 clients chiffre d'affaires", "dv-rq-top10-clients-ca"],
  ["articles les plus vendus du mois", "dv-rq-articles-plus-vendus"],
  ["articles à faible rotation surstock", "dv-rq-articles-moins-sortis"],
  ["commandes d'achat en attente de réception", "dv-rq-commandes-achat-attente"],
  ["BL non facturés", "dv-rq-bl-non-factures"],
  ["analyse commande client couverture", "dv-rq-analyse-commande-client"],
  ["ratio heures réalisées heures prévues affaire", "dv-rq-ratio-activite-affaire"],
  ["OF à venir sans réservations complètes", "dv-rq-of-sans-reservations"],
  ["incohérences de réservations sur les affaires", "dv-rq-incoherences-reservations-affaires"],
  ["commandes fournisseur en retard à relancer", "dv-rq-commandes-achat-relancer"],
  ["articles bloquants goulots", "dv-rq-top-articles-bloquants"],
  ["soldes intermédiaires de gestion marge commerciale", "dv-rq-sig"],
  ["répartition analytique camembert", "dv-rq-repartition-analytique"],
  ["CA des contrats par famille", "dv-rq-ca-contrats-famille"],
  ["état des contrats actifs du client", "dv-rq-contrats-actifs-client"],
];

// 2. Même format.
var AUTRES = [
  // Le texte d'aide de l'onglet : « lignes de commande », « MOUV », « PINO ».
  ["lignes de commande", "dv-mouv"], ["MOUV", "dv-mouv"], ["PINO", "dv-pino"],
  // Un mot tapé seul : la table qui le porte (ENT pour une pièce), pas une requête Dataviz ni une vue.
  ["commande", "dv-ent"], ["facture", "dv-ent"], ["devis", "dv-ent"], ["tarif", "dv-tar"], ["écriture", "dv-c8"],
  ["utilisateur", "dv-muser"],
  // Des fautes de frappe : une lettre en moins ou en trop, deux lettres inversées (« clinet »).
  ["fourniseur", "dv-fou"], ["clinet", "dv-cli"], ["fiche clinet", "dv-cli"], ["artcile", "dv-art"],
  ["mouvment", "dv-mouv"], ["inventiare", "dv-invent"], ["lignes de comande", "dv-mouv"],
  // Un nom de champ : un code (SREF1, dans les noms de la fiche REF) ; un mot courant (« référence ») ne donne pas une vue.
  ["SREF1", "dv-ref"], ["référence", "dv-ref"]
];

function rejouer(liste, titre) {
  var echecs = 0;
  liste.forEach(function (a) {
    if (!parId[a[1]]) { echecs++; console.log('ÉCHEC ' + JSON.stringify(a[0]) + ' : la fiche ' + a[1] + ' n\'existe pas'); return; }
    var res = chercher(a[0]), max = a[2] || 1;
    var rang = res.map(function (r) { return r.fiche.id; }).indexOf(a[1]) + 1, ok = rang > 0 && rang <= max;
    if (!ok) echecs++;
    if (!ok || bavard) console.log((ok ? 'ok    ' : 'ÉCHEC ') + JSON.stringify(a[0]) + ' → ' + a[1] + ' rang ' + (rang || '-') +
      (max > 1 ? ' (≤ ' + max + ')' : '') + ' : ' + res.slice(0, 3).map(function (r) { return r.fiche.id + ' ' + r.score; }).join(', '));
  });
  console.log(titre + ' : ' + echecs + ' échec(s) sur ' + liste.length);
  return echecs;
}
var autres = rejouer(AUTRES, 'aide, mots seuls, fautes, champs');

// 3. « PINO » : la fiche du champ d'abord, puis 3 tables qui ont un champ PINO.
var pino = chercher('PINO').slice(0, 4).map(function (r) { return r.fiche; });
var avecPino = function (f) { return (f.champs || []).some(function (c) { return /(^|[^A-Z0-9_])PINO([^A-Z0-9_]|$)/.test(c[0]); }); };
if (pino[0].id !== 'dv-pino' || !pino.slice(1).every(avecPino)) {
  autres++; console.log('ÉCHEC « PINO » : ' + pino.map(function (f) { return f.id; }).join(', '));
}
// Une recherche Divalto ne donne jamais une fiche SQL ; l'onglet SQL ne donne jamais une fiche Divalto.
var melange = ['COALESCE', 'jointure', 'MOUV', 'commande', 'PINO'].filter(function (q) {
  return chercher(q).some(function (r) { return r.fiche.domaine !== 'divalto'; }) ||
    ctx.chercherDico(q).some(function (r) { return r.fiche.domaine === 'divalto'; });
});
if (melange.length) { autres++; console.log('ÉCHEC fiches SQL et Divalto mêlées pour : ' + melange.join(', ')); }

var echecs = rejouer(QUESTIONS, 'questions de l\'expert');
console.log(echecs + ' échec(s) sur ' + QUESTIONS.length + (autres ? ' (et ' + autres + ' autre(s) échec(s) plus haut)' : ''));
process.exitCode = echecs || autres ? 1 : 0;
