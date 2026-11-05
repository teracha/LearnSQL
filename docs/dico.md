# Le super dico SQL

Une page du site (`#/dico`, ouverte à tous, sans compte) qui répond à deux usages :
1. **Une question en langage normal** : « chercher un caractère dans un texte », « enlever les espaces », même avec
   des fautes (« carreceete »). Le dico propose les fiches les plus proches, de la meilleure à la moins bonne.
2. **Un nom** : « COALESCE », « LOCATE », « ORDER BY ». Le dico ouvre la fiche.

Un sélecteur choisit le moteur : **Tous · SQL Server · Snowflake · MySQL**. Chaque fiche donne la syntaxe de chaque
moteur, ou l'équivalent quand la fonction n'existe pas sur l'un d'eux.

Étapes (chacune validée par l'élève avant la suivante) :
1. La page, la recherche, le sélecteur, et environ 45 fiches (fonctions et mots-clés des modules m01 à m03).
2. Tout le contenu (fonctions et mots-clés des 16 modules SQL), et les fiches « erreur » (message ou numéro
   d'erreur → cause → correction).
3. Les fiches perso de l'élève (privées, enregistrées dans son compte : Supabase, comme la progression).

## Les fichiers

`data/dico/<catégorie>.js`, un fichier par catégorie, chargé dans `index.html` avant `js/app.js` :

```js
LEARNSQL.dico = (LEARNSQL.dico || []).concat([
  { ... une fiche ... },
  { ... }
]);
```

Catégories (le nom du fichier en minuscules, sans accent) : Requête (`requete.js`), Filtres (`filtres.js`),
NULL (`null.js`), Texte (`texte.js`), Dates (`dates.js`), Conversion (`conversion.js`), Nombres (`nombres.js`),
Logique (`logique.js`) ; étape 2 : Agrégats (`agregats.js`), Jointures (`jointures.js`), Sous-requêtes
(`sous-requetes.js`), Ensembles (`ensembles.js`), Fenêtrage (`fenetrage.js`), Modifier (`modifier.js`), Tables et
types (`tables.js`), Transactions (`transactions.js`), Index (`index.js`), Programmation (`programmation.js`),
Snowflake (`snowflake.js`) ; plus tard : Erreurs.

## Le format d'une fiche

```js
{
  id: "charindex",                 // unique dans tout le dico : minuscules, chiffres, tirets
  nom: "CHARINDEX",                // le nom affiché : celui de SQL Server s'il existe, sinon le plus courant
  type: "fonction",                // "fonction" | "mot-clé" | "erreur"
  categorie: "Texte",              // une des catégories ci-dessus
  definition: "Donne la position d'un caractère, ou d'un texte, dans un autre texte.",
  moteurs: {                       // les 3 moteurs, toujours ; une phrase courte chacun, le code entre accents graves
    sqlserver: "`CHARINDEX(cherché, texte)`",
    snowflake: "`POSITION(cherché, texte)`, ou `CHARINDEX(cherché, texte)`",
    mysql: "Pas de CHARINDEX : `LOCATE(cherché, texte)`"
  },
  noms: ["POSITION", "LOCATE", "INSTR"],   // les autres noms de la même chose : la recherche les trouve
  exemple: "SELECT code, CHARINDEX('-', code) AS tiret\nFROM article\nWHERE famille = 'CHIMIE';",
  exemples: {                      // facultatif : seulement quand l'écriture diffère sur un moteur
    snowflake: "SELECT code, POSITION('-', code) AS tiret\nFROM article\nWHERE famille = 'CHIMIE';",
    mysql: "SELECT code, LOCATE('-', code) AS tiret\nFROM article\nWHERE famille = 'CHIMIE';"
  },
  resultat: [["code", "tiret"], ["CHL-5", 4], ["CHL-25", 4], ["PH-5", 3]],
  piege: "Renvoie 0 quand le caractère est absent : `LEFT(code, CHARINDEX('-', code) - 1)` plante alors. Protège avec `NULLIF(…, 0)`.",
  motsCles: ["chercher", "rechercher", "trouver", "position", "caractère", "lettre", "où", "place", "contient", "tiret"],
  voirAussi: ["like", "substring", "left"],   // des id d'autres fiches
  module: "m03"                    // le module du cours qui en parle, s'il y en a un
}
```

Une fiche « erreur » (étape 2) ajoute `codes` (par exemple `["Msg 207", "ERROR 1054"]`), et son `definition` dit le
message ; `exemple` montre la requête qui provoque l'erreur, `resultat` le message, `piege` la cause, et un champ
`correction` dit quoi écrire.

## Les règles d'écriture

1. **La définition** : une phrase, 20 mots au plus, des mots simples, sans jargon (élève dyslexique et TDAH).
2. **Les moteurs** : les trois, toujours. SQL Server 2019 et plus (dire « 2022+ » quand c'est récent), Snowflake,
   MySQL 8. Quand la fonction n'existe pas : « Pas de X : `Y(…)` ». Quand le comportement diffère (NULL, casse,
   arrondi), le dire en quelques mots.
3. **L'exemple** : sur la base d'exemple `docs/base-exemple.sql` (le négociant en piscines), tables écrites **sans
   schéma** (`article`, pas `dbo.article`), 2 à 6 lignes, la forme SQL Server ; `exemples.snowflake` et
   `exemples.mysql` seulement quand l'écriture change. Un mot-clé seul (AND, AS…) peut avoir un exemple court.
4. **Le résultat** : un petit tableau (1re ligne = en-têtes, 1 à 5 lignes de données), calculé sur la base
   d'exemple et **vérifié avec SQLite** ; montants en texte à 2 décimales (`"4780.00"`), `null` pour NULL. Si le
   résultat diffère selon le moteur, montrer celui de SQL Server et le dire dans le piège.
5. **Le piège** : une ou deux phrases, l'erreur vue en entreprise et son effet, puis le bon réflexe.
6. **Les mots-clés de recherche** : 8 à 20 par fiche. Ce qu'un élève taperait pour trouver cette fiche : des verbes
   (chercher, trouver, enlever, couper, remplacer, compter, arrondir, ajouter…), des noms (caractère, lettre, espace,
   date, mois, virgule…), les noms anglais ou d'autres moteurs. Sans se soucier des accents ni du pluriel : la
   recherche les ignore.
7. **Vérité** : chaque syntaxe et chaque comportement vérifiés dans la documentation officielle (learn.microsoft.com,
   docs.snowflake.com, dev.mysql.com). Si c'est incertain : « à vérifier sur ta version », ou rien.
8. Les fiches ne contredisent ni les cours ni les questions du parcours SQL ; si un désaccord apparaît, le signaler.

## La recherche (dans `js/app.js`)

Sans IA, sans service externe, dans le navigateur :
- la question est mise en minuscules, sans accents, coupée en mots ; les mots vides (« je », « veux », « une »,
  « sur »…) sont retirés ; chaque mot est réduit à sa racine (« recherche », « rechercher » → « recherch ») ;
- chaque fiche est notée : nom ou autre nom exact (très fort), début du nom, mot-clé exact, mot-clé proche
  (une ou deux lettres de différence, ou même squelette de consonnes : « carreceete » ≈ « caractère »), mot de la
  définition ;
- les fiches les mieux notées s'affichent ; si aucune ne passe le seuil, les plus proches quand même, avec un message.
