# Les Astuces SQL

Demandé par l'élève (novembre 2026) : « rajoute dans la zone Outils une zone astuces pour SQL […] un dico astuces : avec
une petite phrase où je dirais « j'aimerais bien sortir un numéro client », tu me dis « tiens, tu peux faire comme ça » ;
ça permet de compléter avec des zéros, des choses comme ça. »

## La page

- Un outil de la section Outils (`docs/outils.md`), sujet SQL (`outils-sql`) : id `astuces`, titre « Astuces SQL », lien
  `#/astuces`. Mêmes droits que le dico : public sans compte ; un compte connecté suit le droit outil `astuces` (page
  Équipe, « Droits des outils »), sinon « Outil réservé ». Les liens vers le dico (« Voir aussi », « cherche dans le
  dico ») suivent le droit du dico.
- `#/astuces` : une zone de recherche (« Ex. : sortir un numéro client avec des zéros devant ») et le sélecteur de moteur
  du dico (Tous · SQL Server · Snowflake · MySQL ; le même choix, gardé dans `learnsql-dico-moteur`).
  - **Avec une phrase** : les astuces les plus proches, de la meilleure à la moins bonne (8 au plus), chacune avec sa
    solution pour le moteur choisi. Rien de sûr : « Pas d'astuce sûre pour « … ». Les plus proches : » (3 au plus).
    Rien du tout : « Aucune astuce ne correspond. Essaie d'autres mots, ou cherche dans le dico. » ; le lien ouvre le
    dico (onglet SQL) avec la même phrase.
  - **Sans phrase** : toutes les astuces, rangées par famille (ordre ci-dessous), une par ligne.
- `#/astuces/<id>` : le titre, la famille, « La solution » (du moteur choisi, ou des 3), l'exemple (celui du moteur choisi
  quand l'écriture diffère), le résultat (tableau), le piège, « En pratique », « Voir aussi dans le dico » (des fiches du
  dico SQL, `#/dico/<id>`). « Nouvelle recherche » revient à la recherche, avec la phrase.
- Code : bloc « Astuces SQL » de `js/app.js` (`pageAstuces`, `resultatsAstuces`, `pageAstuce`) ; le corps d'une astuce
  est celui d'une fiche du dico (`corpsFiche`).

## Les fichiers

`data/astuces/<famille>.js`, chargés dans `index.html`, un fichier par famille :

```js
LEARNSQL.astuces = (LEARNSQL.astuces || []).concat([
  { ... une astuce ... }
]);
```

Les familles, dans l'ordre de la page : Compléter (`completer.js`), Formater (`formater.js`), Nettoyer du texte
(`nettoyer.js`), Manipuler (`manipuler.js`), Dates utiles (`dates.js`), Contrôler les données (`controler.js`).
Même liste dans `js/app.js` (`ASTUCES_FAMILLES`) et `outils/verifier.js`.

## Le format d'une astuce

Modèle : `zeros-devant` dans `data/astuces/completer.js`.

```js
{
  id: "zeros-devant",              // unique parmi les astuces : minuscules, chiffres, tirets
  titre: "Compléter un numéro avec des zéros devant",   // le besoin, commence par un verbe, mots simples
  famille: "Compléter",            // une des 6 familles
  besoins: ["…", "…"],             // 2 à 4 phrases que l'élève pourrait taper ; la recherche les compare à sa phrase
  essais: ["…", "…"],              // 2 à 4 AUTRES façons de le dire (fautes, sans accent, mots de métier) : pour le test
  moteurs: { sqlserver: "…", snowflake: "…", mysql: "…" },   // la solution sur chaque moteur, le code entre accents graves
  exemple: "…",                    // du SQL sur la base d'exemple, forme SQL Server
  exemples: { snowflake: "…", mysql: "…" },   // facultatif : quand l'écriture diffère
  resultat: [["…"], ["…"]],        // facultatif : en-têtes puis 2 à 5 lignes, vérifié
  piege: "…",                      // le piège, en 1 ou 2 phrases
  pratique: "…",                   // facultatif : le conseil du terrain (ERP, EDI, Power BI, Excel), 40 mots au plus
  motsCles: ["…"],                 // 6 à 12 mots que l'élève taperait
  voirAussi: ["lpad", "right"]     // des id de fiches du DICO SQL (pas d'astuces)
}
```

Les règles d'écriture sont celles du dico (`docs/dico.md`) : mots simples, exemple sur `docs/base-exemple.sql` (tables
sans schéma), résultat vérifié avec SQLite, chaque syntaxe vérifiée dans la documentation officielle des 3 moteurs, pas
de contradiction avec les cours. En plus :
- `besoins` : ce que l'élève taperait vraiment, chacun différent des autres astuces (le test le contrôle) ;
- `essais` : jamais affichés ; une autre façon de dire le même besoin, pas une copie d'un besoin ;
- une fonction écrite entre accents graves dans `moteurs` (`LPAD(…)`, `ZEROFILL`) est trouvée par la recherche : pas
  besoin de la répéter dans `motsCles`.

## La recherche

La même que le dico (`docs/dico.md`, « La recherche ») : `chercherDico(question, "astuces")` dans le bloc « Super dico »
de `js/app.js`, sur `LEARNSQL.astuces`, avec ses réglages (`DICO_REGLAGES.astuces`). Sans IA, dans le navigateur.
- La phrase est mise en minuscules, sans accents, coupée en mots ; les mots vides du dico sont retirés, et quelques
  autres, vides dans une phrase de besoin (« bien », « sortir », « afficher », « obtenir »…) ; chaque mot est réduit à
  sa racine.
- Chaque astuce est notée :
  - ses mots-clés, comme une fiche du dico, plus les fonctions de ses solutions (`LPAD`, `RIGHT`, `ZEROFILL`… : les mots
    en majuscules du code, sauf AS, AND, NULL, SELECT…) ;
  - les mots du texte de ses solutions et de sa famille (comme la définition d'une fiche), la famille entière comme une
    expression ;
  - surtout, sa **ressemblance** avec la phrase : le plus proche de ses besoins (son titre compte comme un besoin) ; la
    part des mots en commun (2 × communs / (mots de la phrase + mots du besoin)), au carré, × 300 points. Une phrase
    identique à un besoin a tous les points ; un seul mot en commun, peu (les mots-clés s'en chargent). Fautes tolérées :
    une à partir de 5 lettres, deux à partir de 7, le même squelette de consonnes (pour deux mots de longueur proche),
    ou le même début (5 lettres au moins : « meilleures » et « meilleurs » n'ont pas la même racine). Le même début vaut
    aussi pour les mots-clés des astuces (réglage `debut` ; le dico ne l'a pas) ;
  - un besoin (ou le titre) **tapé tel quel**, aux accents, majuscules et signes près : + 1 000 points, comme le nom
    d'une fiche tapé tel quel dans le dico. Deux astuces ne doivent donc pas avoir le même besoin (le vérificateur le
    signale).
- Une astuce à 25 points ou plus s'affiche (8 au plus) ; sinon, les 3 plus proches avec « Pas d'astuce sûre ».
- La recherche du dico SQL et du dico Divalto ne change pas (mêmes résultats, mêmes scores).

## Les contrôles et les tests

- `node outils/verifier.js` (section « Astuces SQL ») : chaque fichier chargé dans `index.html` ; ids uniques ; famille
  connue (et rangée dans son fichier : alerte sinon) ; titre ; 2 à 4 `besoins` (alerte si une autre astuce a le même
  besoin ou le même titre) ; 2 à 4 `essais` (alerte si un essai répète un besoin) ; `moteurs` = 3 textes ; `exemple` ; `exemples` (snowflake, mysql) ; `resultat` au format des cours
  (alerte hors de 2 à 5 lignes) ; `piege` ; `pratique` (alerte au-delà de 40 mots) ; 6 à 12 `motsCles` ; chaque
  `voirAussi` = une fiche du dico SQL qui existe ; un champ inconnu = une alerte. La ligne « total » dit combien d'astuces.
- `node outils/tests/recherche-astuces.js` : pour chaque astuce, chaque phrase de `besoins` la trouve au rang 1, chaque
  phrase de `essais` dans les 3 premières. Avant, la recherche elle-même sur 14 astuces d'essai écrites dans le test
  (besoins proches d'une astuce à l'autre), une phrase sans rapport (rien), les astuces et le dico qui ne se mêlent pas.
  Dernière ligne : « N échec(s) sur M ».
- `outils/tests/astuces.js` (navigateur, dans `lancer.sh`) : la carte sur la page Outils sans compte, la liste par
  famille, la recherche (« numéro client avec des zéros devant » → `zeros-devant` en 1er), le sélecteur de moteur, la
  page d'une astuce (solution, exemple du moteur, résultat, piège, « En pratique », liens vers le dico), « Nouvelle
  recherche », aucune réponse (le lien garde la phrase), une réponse peu sûre, 390 px sans débordement, aucune erreur
  JavaScript. Les droits (astuces réservées, dico réservé) : `outils/tests/outils.js`.
