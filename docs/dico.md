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
  pratique: "Pour tester si un libellé contient un mot, `CHARINDEX('EDI', libelle) > 0` fait comme `LIKE '%EDI%'`.",
                                   // le conseil pratique : affiché sous le piège, titre « En pratique »
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
9. **Le conseil pratique** (`pratique`, demandé par l'élève) : une ou deux phrases, 40 mots au plus. Soit un usage
   concret au travail (ERP, EDI, compta, stock, import de fichiers, contrôle de données), soit une donnée utile (une
   limite, une valeur par défaut, une astuce de performance). Il ne répète ni le piège, ni l'exemple. Il est vrai sur
   les 3 moteurs, ou il dit lequel (« Sur Snowflake, … »). Vérifié comme le reste (règle 7).

## La recherche (dans `js/app.js`)

Sans IA, sans service externe, dans le navigateur :
- la question est mise en minuscules, sans accents, coupée en mots ; les mots vides (« je », « veux », « une »,
  « sur »…) sont retirés ; chaque mot est réduit à sa racine (« recherche », « rechercher » → « recherch ») ;
- chaque fiche est notée : nom ou autre nom exact (très fort), début du nom, mot-clé exact, mot-clé proche
  (une ou deux lettres de différence, ou même squelette de consonnes : « carreceete » ≈ « caractère »), mot de la
  définition ;
- les fiches les mieux notées s'affichent ; si aucune ne passe le seuil, les plus proches quand même, avec un message.
- la recherche ne cherche que dans l'onglet choisi (SQL ou Divalto), avec ses propres poids. L'onglet SQL garde la
  recherche ci-dessus. L'onglet Divalto a des réglages en plus (`DICO_REGLAGES` dans `js/app.js`) :
  - le nom d'un champ compte, moins que le nom de la fiche (« PINO » : la fiche du champ, puis les tables qui l'ont) ;
    seulement un code, pas un mot courant comme « référence » ; une case « DOS / TICOD » compte pour chaque champ ;
  - un mot tapé seul (« commande ») donne d'abord la table (ENT), puis le champ, avant les vues et les requêtes ;
  - une faute sur un nom entier (« fiche fourniseur », « clinet ») ou sur un mot-clé de plusieurs mots est tolérée ;
  - test : `node outils/tests/recherche-divalto.js` (les 123 questions de l'expert, chacune au rang 1).

## Le dico Divalto

Demandé par l'élève : un second domaine du dico, sur l'ERP Divalto 10.13 (tables, champs, vues SQL, requêtes Dataviz).

- **Deux onglets** en haut de `#/dico` : « SQL » (le dico ci-dessus, par défaut) et « Divalto ». La recherche et le
  parcours par catégorie se font dans l'onglet choisi : les fiches Divalto ne se mêlent pas aux fiches SQL. L'onglet
  choisi est gardé dans le navigateur (`learnsql-dico-domaine`).
- **Droits** : l'onglet Divalto suit la règle du parcours Divalto (`accesOK(["divalto"])` dans `js/app.js`) : pas
  d'onglet sans compte, ni pour un compte qui n'a pas le parcours. C'est un masquage d'écran, comme pour les parcours.
  Le dico lui-même (fiches comprises) suit le droit outil `dico` pour un compte connecté (`docs/outils.md`, « Les
  droits des outils ») ; sans compte, il reste public.
- **Source unique** : la base documentaire `/home/user/divalto_10` (dépôt `teracha/Divalto_10`), en **lecture
  seule**. Pas de page = pas de fiche. Chaque fiche a sa source (titre et lien « Page source » du fichier .md).
- Fichier : `data/dico/divalto.js`, même enveloppe que les autres (`LEARNSQL.dico = (LEARNSQL.dico || []).concat([…])`).

### Le format d'une fiche Divalto

```js
{
  id: "dv-mouv",                   // préfixe « dv- » pour tout le dico Divalto
  nom: "MOUV",                     // le nom exact de la table, du champ ou de la vue ; le titre pour une requête
  type: "table",                   // "table" | "champ" | "vue" | "requête"
  domaine: "divalto",              // obligatoire : c'est lui qui range la fiche dans l'onglet Divalto
  categorie: "Tables Divalto",     // "Tables Divalto" | "Champs Divalto" | "Vues Divalto" | "Requêtes Dataviz"
  definition: "Les lignes des pièces commerciales : une ligne par article d'une commande, d'un BL ou d'une facture.",
  noms: ["mouvements"],            // facultatif : d'autres noms de la même chose
  champs: [["CDNO", "le numéro de commande"], ["REF", "la référence de l'article"]],  // tables et vues : SEULEMENT les
                                   // champs que la doc décrit, avec le sens qu'elle leur donne
  liens: ["ENT : l'en-tête ; MOUV.CDNO = ENT.PINO pour une commande, même DOS et TICOD"],  // facultatif, s'il est dans la doc
  indicateurs: ["Client", "Chiffre d'affaires"],   // requêtes Dataviz : ce que la requête affiche
  regles: ["Basé sur les factures de vente (C, CPV)"],  // requêtes Dataviz : les règles de gestion de la doc
  exemple: "SELECT …",             // facultatif : SQL Server ; tiré de la doc, ou écrit avec ce qu'elle décrit
  piege: "…",                      // facultatif : seulement s'il s'appuie sur la doc
  pratique: "…",                   // facultatif (règle 9) : seulement s'il s'appuie sur la doc
  motsCles: ["ligne", "lignes de commande", "detail", "article", "piece"],  // 8 à 20 : ce que l'élève taperait
  voirAussi: ["dv-ent", "inner-join"],   // des id du dico Divalto ou du dico SQL
  source: { titre: "…", url: "https://divalto.atlassian.net/wiki/…" },  // obligatoire (ou sources: [ … ], 1 à 3)
  version: "…"                     // facultatif : si deux pages se contredisent (ancienne version), le dire
}
```

Pas de champ `moteurs` : Divalto tourne sur SQL Server. La fiche affiche les champs (tableau), les liens, les
indicateurs et règles (requêtes), l'exemple, le piège, le conseil pratique, « Voir aussi » et le lien vers la source.

### Les règles d'écriture Divalto
1. Tout vient de la doc : nom de table, champ, valeur codée (« C » pour client…), lien entre tables. Jamais deviné.
2. La définition : une phrase, 20 mots au plus, mots simples (règle 1 du dico SQL).
3. Une table n'a une fiche que si la doc dit ce qu'elle contient. Un champ a sa propre fiche s'il revient dans
   plusieurs tables ou plusieurs pages (clé de pièce, type de tiers, dossier…).
4. Un exemple SQL n'utilise que des tables, champs et liens décrits dans la doc.
5. Si la doc a plusieurs versions qui se contredisent, la fiche suit la 10.13 et le dit dans `version`.
