# Mots réservés

Demandé par l'élève (novembre 2026) : « Crée une section mots-clés réservés à SQL, que ce soit en termes de colonnes, de
tables ou de bases. Comme ça, ça permet d'avoir une liste de termes à ne pas utiliser dans les noms de tables, etc. »
Ses choix : un outil à part dans la zone Outils, en 3 parties (vérifier un nom, les pièges fréquents, la liste complète),
pour les 3 moteurs du site : SQL Server, Snowflake, MySQL.

## La page

- Un outil de la section Outils (`docs/outils.md`), sujet SQL (`outils-sql`) : id `mots-reserves`, titre « Mots
  réservés », lien `#/mots-reserves`. Mêmes droits que le dico et les astuces : public sans compte ; un compte connecté
  suit le droit outil `mots-reserves` (page Équipe, « Droits des outils »), sinon « Outil réservé ».
- En haut : une phrase qui dit pourquoi (un nom réservé fait planter la requête, ou oblige à l'entourer partout), « Aller
  à » (les pièges, la liste : la page défile, l'adresse ne change pas), et le sélecteur de moteur du dico (Tous · SQL
  Server · Snowflake · MySQL ; le même choix, gardé dans `learnsql-dico-moteur`). Il règle les 3 parties.
- **1. Vérifier un nom.** L'élève tape un nom ; il peut l'entourer de `[ ]`, `" "` ou `` ` ` `` : on les retire, avec
  les espaces autour. Le résultat suit la frappe (pas de bouton) ; un nom vide n'affiche rien. Le nom tapé reste en
  mémoire le temps de l'onglet (jamais dans le navigateur ni dans l'adresse).
  - **Le verdict**, en tête, sur les moteurs affichés : « À éviter » (refusé tel quel sur un moteur : réservé ou
    limité, ou un nom hors des règles : à entourer, ou trop long), « Possible, mais à éviter » (permis aujourd'hui
    partout, mais futur sur SQL Server ou mot-clé de MySQL : `date`, `value`, `status`), « Libre ».
    Une phrase dit pourquoi (« Réservé sur SQL Server, Snowflake et MySQL. », « À entourer partout sur Snowflake : une
    lettre accentuée « é ». »). Un lecteur d'écran entend le verdict seul (`#mr-annonce`, `role="status"`).
  - **Quoi écrire à la place** : pour un piège (`pieges.js`), « À la place : … », « On le choisit pour : » (`pourquoi` :
    pourquoi on choisit ce nom, pas un défaut) et « Conseil : ». Sinon, pour un nom hors des règles, « Plutôt :
    nom_client » (le même nom en minuscules, sans accents, des _ entre les mots), seulement s'il est libre et permis sur
    les moteurs affichés. Sinon, pour un mot réservé, limité ou futur, un conseil général (ajouter un mot qui précise :
    `date_commande` plutôt que `date`).
  - **Un bloc par moteur affiché** : Statut (le mot de `liste.js` et son sens ; pour Snowflake, `noteSnowflake`), Règle
    (« oui », ou « non » et pourquoi : trop long, un espace, une lettre accentuée, un signe interdit, il commence par un
    chiffre ou par un signe, il n'a que des chiffres, il ressemble à un nombre ; puis la `regle` du moteur), Écris-le
    (le nom tel quel, l'écriture entourée `echapper` et `echapperTexte`, ou, trop long : « Impossible, même entouré :
    raccourcis-le »). Un moteur seul : les statuts des autres moteurs en une ligne (« Sur les autres moteurs : … »).
  - Dessous, repliées : « Les règles d'un nom, moteur par moteur » (`regle`, `longueurMax`, `casse`, `echapperTexte`,
    `source`).
- **2. Les pièges fréquents** : une carte par piège, dans l'ordre de `pieges.js` : le mot, ses statuts sur les moteurs
  affichés (lus dans `liste.js`), « On le choisit pour : » (`pourquoi`), « À la place : », « Conseil : ».
- **3. La liste complète** : le nombre de mots, une légende (réservé, futur, limité, mot-clé, — : libre), les lettres
  (A, B, C… : la page va à la lettre), un tableau Mot | un moteur par colonne affichée, de A à Z. Un mot y est s'il est
  réservé, futur ou limité sur un des moteurs affichés ; la case « Afficher aussi les mots-clés permis (MySQL) » ajoute
  les mots-clés (cachée quand MySQL n'est pas affiché). Un mot « limité » sur Snowflake a sa note sur une ligne en
  dessous. Sous le tableau : les sources (les 3 pages officielles, dans un nouvel onglet) et leur date (`sources.date`).
- **Téléphone (390 px)** : rien ne déborde ; le tableau tient en largeur (une pastille par moteur, un mot long se coupe
  après un _) ; plus étroit (320 px), il défile dans son cadre, la colonne « Mot » reste visible, avec l'aide « Fais
  glisser le tableau… ».
- Code : bloc « Mots réservés » de `js/app.js` (`pageMotsReserves` ; `nomMR`, `raisonsMR`, `ecritureMR`, `analyseMR`,
  `verdictMR`, `resultatMR`, `piegesMR`, `listeMR`, `sourcesMR`), styles `.mr-…` de `css/style.css`.

## Les fichiers

Trois fichiers de données, chargés dans `index.html` (`data/reserves/`).

### `liste.js` : les mots réservés (FICHIER GÉNÉRÉ, ne pas le modifier à la main)

```js
LEARNSQL.motsReserves = {
  sources: { sqlserver: "https://…", snowflake: "https://…", mysql: "https://…", date: "2026-11-16" },
  mots: {
    "ORDER": { sqlserver: "réservé", snowflake: "réservé", noteSnowflake: "Réservé par la norme ANSI.", mysql: "réservé" },
    …
  }
};
```

Les statuts (un moteur absent = le mot est libre sur ce moteur) :

| Moteur | Statut | Sens | Page |
|---|---|---|---|
| SQL Server | `réservé` | refusé tel quel comme nom : à entourer | à éviter |
| SQL Server | `futur` | permis aujourd'hui, peut devenir réservé (« future keywords ») | possible, mais à éviter |
| Snowflake | `réservé` | refusé tel quel : à entourer | à éviter |
| Snowflake | `limité` | interdit dans certains emplois, dits par `noteSnowflake` : à entourer | à éviter |
| MySQL 8.4 | `réservé` | refusé tel quel (« (R) » de la page) : à entourer | à éviter |
| MySQL 8.4 | `mot-clé` | un mot-clé, mais permis comme nom sans guillemets | possible, mais à éviter |

`noteSnowflake` (seulement avec un statut Snowflake) : le commentaire de la page Snowflake, en français.

### `regles.js` : les règles d'un nom (l'expert)

`LEARNSQL.motsRegles = { sqlserver: {…}, snowflake: {…}, mysql: {…} }`, pour chaque moteur :
- `longueurMax` : le nombre de caractères permis (un nom plus long est refusé, même entouré) ;
- `motif` : une expression régulière ES5 d'un nom écrit sans guillemets, lue par `new RegExp(motif)`, sans option (ni
  `\p{…}`, ni `(?<…)`, qui datent de 2018) ; avec `^` et `$` ;
- `regle` : la même règle en mots simples (affichée quand un nom ne la suit pas) ;
- `echapper` : le modèle pour l'écrire quand même : `{nom}` = le nom tapé, `{NOM}` = en majuscules (`[{nom}]`,
  `"{NOM}"`, `` `{nom}` ``). Le signe fermant, s'il est dans le nom, est doublé (`a]b` → `[a]]b]`) ;
- `echapperTexte`, `casse` : des phrases (le code entre accents graves) ; `source` : la page officielle (https).

### `pieges.js` : les pièges fréquents (l'expert)

```js
LEARNSQL.motsPieges = [
  { mot: "ORDER", pourquoi: "…", aLaPlace: ["num_cde", "ordre_tri"], conseil: "…" }
];
```

`mot` en MAJUSCULES, unique ; `pourquoi` : pourquoi on le choisit sans y penser (une phrase, affichée « On le choisit
pour : ») ; `aLaPlace` : 1 à 4 noms (minuscules, mots séparés par _), chacun permis tel quel sur les 3 moteurs et
réservé nulle part ; `conseil` : facultatif, une phrase. Les statuts ne se répètent pas : ils viennent de `liste.js`.

## Régénérer `liste.js`

Quand une des 3 pages officielles change (nouvelle version d'un moteur) :

1. Télécharger les 3 pages dans un dossier neuf et vide (commandes en tête de `outils/mots-reserves/extraire.py`) :
   ```sh
   mkdir pages-mots
   curl -sSL -o pages-mots/sqlserver.html https://learn.microsoft.com/en-us/sql/t-sql/language-elements/reserved-keywords-transact-sql
   curl -sS  -o pages-mots/snowflake.md   https://docs.snowflake.com/en/sql-reference/reserved-keywords.md
   curl -sSL -o pages-mots/mysql.html     https://dev.mysql.com/doc/refman/8.4/en/keywords.html
   ```
2. Lancer le script avec la date du jour (AAAA-MM-JJ, ici le 16/11/2026) :
   `python3 -I outils/mots-reserves/extraire.py pages-mots 2026-11-16 > data/reserves/liste.js`.
   Il dit combien de mots il a trouvés par moteur. Il s'arrête si une page a changé de forme (« repère introuvable »,
   « commentaire inconnu, à traduire », « Listes trop courtes ») : adapter le script, jamais `liste.js` à la main.
3. `node outils/verifier.js` (0 erreur), `outils/tests/mots-reserves.js` (les nombres attendus sont lus dans les
   données : rien à changer dans le test), puis supprimer le dossier `pages-mots`.
4. Un mot de `pieges.js` ou de `aLaPlace` qui change de statut : le vérificateur le dit.

## Les contrôles et les tests

- `node outils/verifier.js` (section « Mots réservés ») : les 3 fichiers chargés dans `index.html`. `liste.js` : les
  sources (3 adresses https, une date AAAA-MM-JJ), des mots en MAJUSCULES, les statuts permis par moteur (tableau
  plus haut), `noteSnowflake` seulement avec un statut Snowflake (alerte : un mot sans statut). `regles.js` : les 3
  moteurs, `longueurMax` un nombre entier, `motif` une expression régulière valide et ES5, qui accepte « client » et
  refuse « nom client », `echapper` avec `{nom}` ou `{NOM}`, `regle` et `echapperTexte`, `source` en https (alerte : un
  champ inconnu). `pieges.js` : `mot` en MAJUSCULES et unique (alerte : absent de `liste.js`), `pourquoi` (alerte au-delà
  de 30 mots, comme `conseil`), 1 à 4 `aLaPlace` en minuscules et _, sans doublon, chacun permis par les 3 `motif`, assez
  court, réservé, futur ou limité nulle part (alerte : un mot-clé MySQL). Le lien `mots-reserves` de
  `data/outils/sujets.js` mène à `#/mots-reserves`. La ligne « mots réservés » donne les nombres par moteur ; la ligne
  « total » dit combien de mots réservés (la liste complète) et de pièges.
- `outils/tests/mots-reserves.js` (navigateur, dans `lancer.sh`) : la carte sur la page Outils sans compte ; « order »
  (réservé sur les 3 moteurs, « À éviter », l'écriture entourée de chaque moteur) ; « [order] », "order", `order` : la
  même chose ; « statut » : libre ; « nom client » : à entourer (un espace), « Plutôt : nom_client » ; 129 caractères :
  trop long pour SQL Server ; d'autres raisons (accent, chiffre en tête, signe interdit, signe fermant doublé) ; un nom
  vide : rien ; le sélecteur de moteur ; les vrais pièges, puis des pièges d'essai injectés dans la page ; la liste
  complète (nombre de mots, A à Z, une lettre, la case MySQL, un moteur seul, la note d'un mot limité, les sources, les
  règles) ; 390 px et 320 px sans débordement ; aucune erreur JavaScript. Les attendus sont lus dans les données.
- Les droits (l'outil réservé à un groupe, toute la section réservée, sans compte, admin) : `outils/tests/outils.js`.
