# Parcours SQL : les cours, nouvelle version

Les 16 modules SQL (m01 à m16) ont chacun 100 questions, validées. Leurs cours (`data/cours/mXX.js`), eux, étaient
des fiches mémo : 400 à 750 mots, des points télégraphiques, souvent sans le résultat de la requête, sans lien avec le
métier de l'élève. Ils sont réécrits un par un, dans le format ci-dessous. Le premier : m01 (test, validé par l'élève).

## La base d'exemple (`docs/base-exemple.sql`)

Tous les cours SQL utilisent la même petite base : le négociant en équipement de piscines du parcours Chef de projet
(3 dépôts, ERP Divalto, clients EDI de la grande distribution dont AquaBleu). Tables : `client` (7), `article` (8),
`commande` (8), `ligne_cde` (11), `facture` (4), `flux_edi` (6), `depot` (3), `stock_depot` (16).
- Les chiffres sont petits et vérifiables de tête ; les résultats des exemples se calculent sur ces données, et se
  vérifient avec SQLite (commande dans l'en-tête du fichier .sql ; `TOP` se vérifie avec `LIMIT`).
- Les pièges sont dans les données : une ville `NULL` (Camping Les Flots), 2 fiches « Piscines Dumont » (2 agences),
  2 SIREN manquants, 2 commandes au même montant (ex aequo), 2 clients sans commande, une commande annulée sans facture,
  un article en rupture, 2 flux EDI rejetés.
- Noms : SQL Server écrit `dbo.client` ; Snowflake écrit `VENTES.CLIENT` (majuscules). Un cours écrit la forme SQL Server
  dans ses exemples, et dit la forme Snowflake quand elle diffère.
- On n'ajoute pas de table ni de ligne pour un seul exemple : si un cas manque, on le propose au superviseur, qui met à
  jour le fichier .sql et cette page.

## Le format d'un cours (`LEARNSQL.cours.mXX`)

```js
LEARNSQL.cours.m01 = {
  intro: "Une question sur le vécu de l'élève, puis pourquoi ce thème compte, en 3 ou 4 phrases.",
  sections: [
    {
      titre: "Une idée, dite simplement",
      exemple: "SELECT ...\nFROM dbo.client ...",            // du SQL sur la base d'exemple, 3 à 10 lignes
      resultat: [["nom", "ville"], ["AquaBleu", "Lyon"], ["Bleu Lagon", "Nice"]],  // tableau : en-têtes, puis 2 à 5 lignes
      points: ["Phrase complète, une idée.", "..."],         // 3 à 5 points
      retenir: "La règle, en une phrase."
    }
  ],
  differences: [["Sujet", "SQL Server", "Snowflake"]]        // les écarts entre les deux moteurs, en une ligne chacun
};
```

Règles :
1. **L'intro ouvre sur le vécu** de l'élève (une question : ses requêtes sur Divalto, ses flux EDI, son entrepôt
   Snowflake et ses rapports Power BI, sa démat fiscale), puis dit ce que le thème évite : une erreur vue en entreprise.
2. **5 à 7 sections**, une idée par section, titre court. Dans chaque section : **l'exemple d'abord** (du SQL sur la base
   d'exemple, qui se lit seul), **puis le résultat** (un tableau de 2 à 5 lignes, ou une phrase quand le résultat est un
   message d'erreur ou un nombre), **puis 3 à 5 points**, **puis le retenir**.
3. **Chaque point est une phrase complète** (un sujet, un verbe), de 25 mots au plus. Un point dit : ce qui se passe,
   ou pourquoi, ou l'erreur classique (avec son effet : un montant faux dans Power BI, une commande EDI perdue), ou
   l'écart SQL Server / Snowflake. Les accents graves servent aux mots-clés et aux noms (`ORDER BY`, `dbo.client`), pas
   à des phrases entières.
4. **Le résultat est juste** : il est calculé sur la base d'exemple et vérifié (SQLite). Les `NULL` s'écrivent `null`
   dans le tableau (JavaScript), le site les affiche en italique. Les montants gardent 2 décimales (`"4780.00"` en texte,
   pour l'affichage).
5. **1 300 à 1 450 mots** au total (intro, titres, exemples, résultats, points, retenir), 3 à 5 points par section.
6. **Chaque notion testée par les 100 questions du module est dans le cours** (règle 10 du parcours Chef de projet) : un
   point, un exemple ou une ligne du tableau `differences`. La liste des « retenir » des questions sert de liste de
   contrôle. Les détails rares vont dans le tableau `differences` ou dans un point, pas dans une section à part.
7. **Les écarts SQL Server / Snowflake** sont dits là où ils comptent (dans la section) et repris dans le tableau
   `differences`. Quand une règle n'est pas sûre, le cours le dit (« à vérifier sur ta version »).
8. Phrases courtes, mots simples, un seul sujet par section ; jamais de référence au handicap de l'élève dans le texte.
9. Le cours ne contredit aucune question du module ; une question fausse se signale au superviseur, elle ne se corrige
   pas en changeant le cours.

## Circuit de réécriture d'un cours
expert-sql (écrit le cours, vérifie chaque résultat avec SQLite, contrôle la couverture des 100 « retenir ») →
testeur (vérité technique SQL Server et Snowflake, résultats recalculés, couverture, forme pour l'élève) → superviseur
(`node outils/verifier.js`, tests du site, commit) → l'élève lit et dit.
