// Recherche des Conseils d'architecte (docs/architecte.md) : la vraie recherche de js/app.js (chercherDico(question,
// "architecte"), code pris entre « var DICO_MOTS_VIDES » et « function dicoMoteur », comme recherche-astuces.js).
// 1. La recherche elle-même, sur des situations d'essai écrites ici (pas sur le site) : des situations voisines (je crée
//    une table, un index, une vue, une base, une table pour un import ; j'insère, je mets à jour, je supprime des lignes ;
//    j'importe un fichier, j'exécute un script depuis un fichier…), les mêmes règles qu'en 2 ; quelques phrases de plus
//    (un mot seul, la phrase de l'exemple de la page) ; une phrase sans rapport ne trouve rien ; les situations, les
//    astuces et le dico ne se mêlent pas.
// 2. Les vraies situations de data/architecte/*.js : pour chaque situation, chaque phrase de `besoins` la trouve au rang
//    1, chaque phrase de `essais` dans les 3 premières.
// Usage (depuis la racine du dépôt) : node outils/tests/recherche-architecte.js [-v]   (-v : affiche aussi les réussites)
// Dernière ligne : « N échec(s) sur M » (M : les phrases des vraies situations) ; code de sortie 1 s'il y a un échec, où
// que ce soit.
var fs = require('fs'), path = require('path'), vm = require('vm');
var racine = path.join(__dirname, '..', '..');
var bavard = process.argv.indexOf('-v') >= 0;
var app = fs.readFileSync(path.join(racine, 'js', 'app.js'), 'utf8');
var debut = app.indexOf('  var DICO_MOTS_VIDES = {};'), fin = app.indexOf('  function dicoMoteur()');
if (debut < 0 || fin < 0) { console.log('code de recherche introuvable dans js/app.js'); process.exit(1); }

// Un contexte : le code de recherche, les fiches du dico, les astuces, et des situations (les vraies, ou celles d'essai).
function contexte(situations) {
  var ctx = { LEARNSQL: {}, DATA: {} };
  vm.createContext(ctx);
  ['dico', 'astuces', 'architecte'].forEach(function (d) {
    var dossier = path.join(racine, 'data', d);
    if (!fs.existsSync(dossier)) return;
    fs.readdirSync(dossier).filter(function (f) { return /\.js$/.test(f); }).sort().forEach(function (f) {
      vm.runInContext(fs.readFileSync(path.join(dossier, f), 'utf8'), ctx, { filename: f });
    });
  });
  ctx.DATA.dico = ctx.LEARNSQL.dico;
  ctx.DATA.astuces = ctx.LEARNSQL.astuces || [];
  ctx.DATA.architecte = situations || ctx.LEARNSQL.architecte || [];
  vm.runInContext(app.slice(debut, fin) + '\nthis.chercherDico = chercherDico;', ctx);
  return ctx;
}

// Rejoue les besoins (rang 1) et les essais (rang 3 au plus) de chaque situation ; renvoie [échecs, phrases].
function rejouer(ctx, titre) {
  var echecs = 0, total = 0;
  ctx.DATA.architecte.forEach(function (s) {
    [['besoins', 1], ['essais', 3]].forEach(function (x) {
      (s[x[0]] || []).forEach(function (q) {
        total++;
        var res = ctx.chercherDico(q, 'architecte'), rang = res.map(function (r) { return r.fiche.id; }).indexOf(s.id) + 1;
        var ok = rang > 0 && rang <= x[1];
        if (!ok) echecs++;
        if (!ok || bavard) console.log((ok ? 'ok    ' : 'ÉCHEC ') + x[0].slice(0, -1) + ' ' + JSON.stringify(q) + ' → ' + s.id + ' rang ' +
          (rang || '-') + ' (' + (x[1] === 1 ? '1' : '≤ 3') + ') : ' + res.slice(0, 3).map(function (r) { return r.fiche.id + ' ' + r.score; }).join(', '));
      });
    });
  });
  console.log(titre + ' : ' + echecs + ' échec(s) sur ' + total);
  return [echecs, total];
}

// 1. Des situations d'essai (même format que data/architecte ; seuls les champs lus par la recherche sont remplis :
// titre, famille, résumé, besoins, essais, mots-clés, questions).
function sit(id, titre, famille, resume, besoins, essais, motsCles, questions) {
  return { id: id, titre: titre, famille: famille, resume: resume, besoins: besoins, essais: essais, motsCles: motsCles,
    etapes: [{ titre: 'Les questions', questions: questions.map(function (q, i) { return { id: 'q' + i, q: q }; }) }] };
}
var ESSAI = [
  sit('creer-table', 'Je crée une table', 'Concevoir',
    "Les questions à te poser avant d'écrire `CREATE TABLE` : ce que contient une ligne, la clé, les types, les règles, les noms.",
    ['je crée une table', 'créer une nouvelle table dans la base', 'comment bien concevoir une table', 'les questions à se poser avant un create table'],
    ['je dois faire une table pour stocker les commandes edi', 'bonne pratique creation table sql', 'modéliser une table proprement'],
    ['create table', 'nouvelle table', 'conception', 'modéliser', 'structure', 'clé primaire', 'colonnes', 'contraintes', 'not null', 'bonnes pratiques'],
    ['Que représente UNE ligne de la table ?', 'Quelles colonnes rendent une ligne unique ?', 'Quel type pour chaque colonne ?',
      'Chaque colonne peut-elle rester vide (NULL) ?']),
  sit('table-import', 'Je crée une table pour recevoir un import', 'Concevoir',
    "Une table de chargement : tout en texte, la trace du fichier, le contrôle avant l'intégration.",
    ['je crée une table pour recevoir un import', 'une table de chargement pour un fichier', 'table de staging avant intégration dans divalto'],
    ['table tampon pour les fichiers edi', "stocker les lignes brutes d'un csv", 'zone de transit import'],
    ['staging', 'chargement', 'tampon', 'brut', 'transit', 'stg', 'intégration', 'zone de transit'],
    ['Faut-il tout garder en texte au chargement ?', "Comment retrouver le fichier d'où vient chaque ligne ?", 'Que faire des lignes rejetées ?']),
  sit('creer-index', 'Je crée un index', 'Concevoir', "Avant `CREATE INDEX` : la requête à aider, les colonnes, l'ordre, le coût sur les écritures.",
    ['je crée un index', 'ajouter un index sur une colonne', 'quelles colonnes indexer'],
    ['accelerer une recherche avec un index', 'index cluster ou non cluster', 'mon index ne sert pas'],
    ['index', 'create index', 'cluster', 'colonnes incluses', 'include', 'indexer', 'recherche'],
    ['Quelle requête cet index doit-il aider ?', 'Dans quel ordre mettre les colonnes ?', "Combien d'écritures cet index va-t-il ralentir ?"]),
  sit('creer-vue', 'Je crée une vue', 'Concevoir', 'Avant `CREATE VIEW` : à quoi sert la vue, qui la lit, ses colonnes, ses droits.',
    ['je crée une vue', 'faire une vue pour power bi', 'quand utiliser une vue'],
    ['create view pour un rapport', 'cacher des colonnes avec une vue', 'vue sur plusieurs tables'],
    ['vue', 'view', 'create view', 'rapport', 'masquer', 'cacher', 'simplifier'],
    ['Qui va lire cette vue ?', 'La vue doit-elle cacher des colonnes ?', 'Faut-il un ORDER BY dans la vue ?']),
  sit('creer-base', 'Je crée une base de données', 'Concevoir', 'Avant `CREATE DATABASE` : son rôle, sa collation, sa taille, ses sauvegardes, ses droits.',
    ['je crée une base de données', 'créer une nouvelle base', 'nouvelle database pour un projet'],
    ['create database', 'quelle collation choisir pour une base', 'une base pour les flux edi'],
    ['base', 'database', 'create database', 'collation', 'base de données', 'environnement'],
    ['À quoi sert cette base ?', 'Quelle collation choisir ?', 'Qui sauvegarde la base ?']),
  sit('cle-primaire', 'Je choisis la clé primaire', 'Concevoir', 'Clé métier ou numéro technique, une ou plusieurs colonnes, `IDENTITY` ou séquence.',
    ['je choisis la clé primaire', 'quelle clé primaire pour ma table', 'clé métier ou clé technique'],
    ['primary key identity ou sequence', 'cle primaire composee de deux colonnes', 'id auto increment'],
    ['clé primaire', 'primary key', 'identity', 'séquence', 'auto increment', 'clé métier', 'clé technique', 'identifiant'],
    ['La clé peut-elle changer ?', 'Une colonne ou plusieurs ?', 'IDENTITY ou séquence ?']),
  sit('inserer', "J'insère des lignes", 'Écrire et charger', 'Avant `INSERT` : la liste des colonnes, les doublons, les valeurs par défaut, le volume.',
    ["j'insère des lignes", 'ajouter des lignes dans une table', 'insert into depuis une autre table'],
    ['inserer des donnees en masse', 'insert select', 'ajouter une commande dans la table'],
    ['insert', 'insérer', 'ajouter', 'insert into', 'values', 'nouvelles lignes'],
    ['As-tu écrit la liste des colonnes ?', 'La ligne existe-t-elle déjà ?', 'Combien de lignes à la fois ?']),
  sit('mettre-a-jour', 'Je mets à jour des lignes', 'Écrire et charger', 'Avant `UPDATE` : le filtre, le nombre de lignes touchées, la sauvegarde, la transaction.',
    ['je mets à jour des lignes', 'modifier des valeurs dans une table', 'faire un update'],
    ['update avec jointure', 'changer le statut des commandes', 'corriger un prix en masse'],
    ['update', 'modifier', 'mettre à jour', 'set', 'changer', 'corriger'],
    ['Combien de lignes le filtre touche-t-il ?', 'As-tu gardé les anciennes valeurs ?', 'Le WHERE est-il le bon ?']),
  sit('supprimer', 'Je supprime des lignes', 'Écrire et charger', 'Avant `DELETE` : le filtre, les lignes liées, la sauvegarde, les gros volumes.',
    ['je supprime des lignes', "effacer des lignes d'une table", 'faire un delete'],
    ['delete avec un where', 'purger les vieilles commandes', 'vider une table'],
    ['delete', 'supprimer', 'effacer', 'purge', 'purger', 'truncate', 'vider'],
    ['Combien de lignes vont partir ?', "Des lignes d'autres tables pointent-elles vers elles ?", 'Faut-il supprimer par lots ?']),
  sit('importer-fichier', "J'importe un fichier (CSV, Excel, EDI)", 'Écrire et charger',
    'Avant de charger un fichier : son format, son encodage, ses séparateurs, les rejets.',
    ["j'importe un fichier", 'charger un fichier csv dans une table', 'importer un fichier excel'],
    ["bulk insert d'un csv", 'integrer un fichier edi', 'lire un fichier plat'],
    ['import', 'importer', 'csv', 'excel', 'bulk insert', 'encodage', 'séparateur', 'fichier plat'],
    ["Quel est l'encodage du fichier ?", 'Quel séparateur entre les champs ?', 'Que faire des lignes en erreur ?']),
  sit('script-fichier', "J'exécute un script SQL depuis un fichier", 'Écrire et charger',
    "Avant de lancer un fichier .sql : la base visée, les lots GO, l'arrêt sur erreur, la trace.",
    ["j'exécute un script sql depuis un fichier", 'lancer un fichier sql', 'exécuter un script avec sqlcmd'],
    ['executer un .sql en ligne de commande', 'script de deploiement', 'snowsql -f'],
    ['script', 'sqlcmd', 'snowsql', 'go', 'ligne de commande', 'exécuter', 'lancer'],
    ['Le script vise-t-il la bonne base ?', "Le script s'arrête-t-il à la première erreur ?", 'Peut-on le relancer sans dégât ?']),
  sit('requete-lente', 'Ma requête est lente', 'Exploiter', 'Avant de réécrire : mesurer, lire le plan, chercher les index et les conversions cachées.',
    ['ma requête est lente', 'accélérer une requête', 'la requête met trop de temps'],
    ['optimiser une requete sql', "plan d'execution", 'ça rame'],
    ['lent', 'lenteur', 'performance', 'optimiser', 'plan', 'rame', 'accélérer'],
    ['Combien de temps prend-elle, et combien de lignes lit-elle ?', "Que dit le plan d'exécution ?", "Une fonction empêche-t-elle l'index de servir ?"]),
  sit('doublons', "Je cherche ou j'enlève des doublons", 'Interroger', "Trouver les doublons, garder la bonne ligne, et empêcher qu'ils reviennent.",
    ['je cherche des doublons', "enlever les doublons d'une table", 'garder une seule ligne par client'],
    ['dedoublonner', 'lignes en double', 'row_number pour supprimer les doublons'],
    ['doublon', 'double', 'dédoublonner', 'row_number', 'distinct', 'en double'],
    ["Qu'est-ce qu'un doublon ici ?", 'Quelle ligne garder ?', "Comment empêcher qu'ils reviennent ?"]),
  sit('droits', 'Je donne des droits', 'Exploiter', 'Avant `GRANT` : à un rôle, le moins possible, sur un schéma, et la trace.',
    ['je donne des droits', 'donner accès à une table', 'faire un grant'],
    ['permission en lecture seule', 'creer un role pour power bi', 'qui a acces a la base'],
    ['grant', 'droits', 'rôle', 'permission', 'accès', 'lecture seule', 'revoke'],
    ['À qui donner le droit : une personne ou un rôle ?', 'Lecture ou écriture ?', 'Sur une table ou sur un schéma ?']),
  sit('mettre-en-prod', 'Je mets un script en production', 'Exploiter', 'Avant la mise en production : la recette, la sauvegarde, le retour arrière.',
    ['je mets un script en production', 'déployer en prod', 'passer un script en production'],
    ["mise en prod d'une procedure", 'livrer un script', 'checklist avant deploiement'],
    ['production', 'prod', 'déploiement', 'déployer', 'livraison', 'recette', 'retour arrière', 'mise en production'],
    ['Le script a-t-il tourné en recette ?', 'Comment revenir en arrière ?', 'Qui prévenir avant ?']),
  sit('ecrire-valeur', "J'écris une valeur dans une requête", 'Écrire et charger',
    'Une date, un texte, un nombre écrits dans le SQL : le bon format, sans conversion cachée.',
    ["j'écris une valeur dans une requête", 'écrire une date dans un where', 'mettre un texte avec une apostrophe'],
    ["format d'une date en dur", 'guillemet simple dans un texte', 'valeur en dur dans le code'],
    ['valeur', 'littéral', 'apostrophe', 'guillemet', 'en dur', 'date', 'format'],
    ['La date est-elle écrite sans ambiguïté ?', 'Le texte contient-il une apostrophe ?', 'Le nombre a-t-il le bon séparateur décimal ?'])
];
var essai = contexte(ESSAI);
var autres = rejouer(essai, "situations d'essai (" + ESSAI.length + ')')[0];
// Des recherches de plus : un mot seul, la phrase d'exemple de la page (« je crée une table pour les commandes EDI »).
[['je crée une table pour les commandes EDI', 'creer-table'], ['quelles questions me poser avant de créer une table', 'creer-table'],
 ['index', 'creer-index'], ['grant', 'droits'], ['doublons', 'doublons'], ['lente', 'requete-lente'], ['sqlcmd', 'script-fichier'],
 ['je mets à jour le statut des commandes', 'mettre-a-jour'], ['TRUNCATE', 'supprimer']].forEach(function (x) {
  var res = essai.chercherDico(x[0], 'architecte');
  if (!res.length || res[0].fiche.id !== x[1]) {
    autres++;
    console.log('ÉCHEC « ' + x[0] + ' » → ' + x[1] + ' : ' + res.slice(0, 3).map(function (r) { return r.fiche.id + ' ' + r.score; }).join(', '));
  } else if (bavard) console.log('ok    « ' + x[0] + ' » → ' + x[1] + ' ' + res[0].score);
});
['zzqxw', '', '   '].forEach(function (q) {
  var res = essai.chercherDico(q, 'architecte');
  if (res.length) { autres++; console.log('ÉCHEC « ' + q + ' » ne devrait rien trouver : ' + res.map(function (r) { return r.fiche.id; }).join(', ')); }
});
// Les situations, les astuces et le dico ne se mêlent pas : une situation a des étapes, une astuce ou une fiche n'en a pas.
var mele = ['je crée une table', 'coalesce', 'zéros devant', 'enlever les doublons', 'index', 'premier jour du mois'].filter(function (q) {
  return essai.chercherDico(q, 'architecte').some(function (r) { return !r.fiche.etapes; }) ||
    essai.chercherDico(q, 'astuces').some(function (r) { return r.fiche.etapes; }) ||
    essai.chercherDico(q).some(function (r) { return r.fiche.etapes; });
});
if (mele.length) { autres++; console.log('ÉCHEC situations, astuces et fiches du dico mêlées pour : ' + mele.join(', ')); }

// 2. Les vraies situations.
var vraies = contexte(null);
if (!vraies.DATA.architecte.length) console.log('(aucune situation dans data/architecte)');
var r = rejouer(vraies, 'vraies situations (' + vraies.DATA.architecte.length + ')');
console.log(r[0] + ' échec(s) sur ' + r[1] + (autres ? ' (et ' + autres + ' autre(s) échec(s) plus haut)' : ''));
process.exitCode = r[0] || autres ? 1 : 0;
