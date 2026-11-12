# Parcours SQL : les cours, nouvelle version

Les 16 modules SQL (m01 à m16) ont chacun 100 questions, validées. Leurs cours (`data/cours/mXX.js`), eux, étaient
des fiches mémo : 400 à 750 mots, des points télégraphiques, souvent sans le résultat de la requête, sans lien avec le
métier de l'élève. Ils sont réécrits un par un, dans le format ci-dessous. Modèle : m02 (version 2, squelette « Ce qui se passe / Pourquoi / Le piège / Le bon réflexe »).
Le cours court remplacé devient la fiche de révision du module (`data/fiches/mXX.js`, même format, page `#/fiche/mXX`).

## La base d'exemple (`docs/base-exemple.sql`)

Tous les cours SQL utilisent la même petite base : le négociant en équipement de piscines du parcours Chef de projet
(3 dépôts, ERP Divalto, clients EDI de la grande distribution dont AquaBleu). Tables : `client` (7), `article` (8),
`commande` (8), `ligne_cde` (11), `facture` (4), `flux_edi` (6), `depot` (3), `stock_depot` (15), `nomenclature` (7).
- Les chiffres sont petits et vérifiables de tête ; les résultats des exemples se calculent sur ces données, et se
  vérifient avec SQLite (commande dans l'en-tête du fichier .sql ; `TOP` se vérifie avec `LIMIT`).
- Les pièges sont dans les données : une ville `NULL` (Camping Les Flots), 2 fiches « Piscines Dumont » (2 agences),
  2 SIREN manquants, 2 commandes au même montant (ex aequo), 2 clients sans commande, une commande annulée sans facture,
  un article en rupture, 2 flux EDI rejetés, une boucle dans la nomenclature (KIT-HIV ↔ BACHE8, ligne saisie à l'envers).
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
2. **6 à 8 sections**, une idée par section, titre court. Dans chaque section : **l'exemple d'abord** (du SQL sur la base
   d'exemple, qui se lit seul), **puis le résultat** (un tableau de 2 à 5 lignes, ou une phrase quand le résultat est un
   message d'erreur ou un nombre), **puis 3 à 5 points**, **puis le retenir**.
3. **Chaque section suit le même squelette**, et chaque point commence par son étiquette :
   « Ce qui se passe : » (lire le résultat), « Pourquoi : » (le mécanisme, avec des mots simples), « Le piège : »
   (l'erreur vue en entreprise et son effet : un rapport Power BI faux, une commande EDI perdue), « Le bon réflexe : »
   (ce qu'on écrit à la place), puis, s'il y a lieu, « SQL Server / Snowflake : » ou « Et aussi : ». Un point = une
   étiquette, 2 ou 3 phrases courtes, 45 mots au plus. **L'exemple montre le piège** quand la section en a un (la
   requête fausse et ce qu'elle renvoie), pas seulement le cas qui marche. **Chaque mot technique est expliqué à sa
   première apparition**, entre parenthèses, en mots simples (collation = la règle de comparaison des textes ;
   sous-requête = une requête dans la requête ; index = la table des matières de la table). Les accents graves servent
   aux mots-clés et aux noms, pas à des phrases entières.
4. **Le résultat est juste** : il est calculé sur la base d'exemple et vérifié (SQLite). Les `NULL` s'écrivent `null`
   dans le tableau (JavaScript), le site les affiche en italique. Les montants gardent 2 décimales (`"4780.00"` en texte,
   pour l'affichage).
5. **1 600 à 2 100 mots** au total (intro, titres, exemples, résultats, points, retenir), 6 à 8 sections, 4 ou 5
   points par section. La dernière section peut être « Détails utiles » : jusqu'à 8 points courts, un par notion rare, sans
   exemple ni résultat ; c'est là que vont les notions qu'on ne veut pas enseigner en profondeur.
6. **Le cours enseigne les notions principales** du module : celles que plusieurs questions testent, et celles qu'on
   utilise toutes les semaines. La liste des « retenir » des questions sert de liste de contrôle pour ne rien oublier
   d'important. Une notion rare, testée par une seule question (un mot-clé d'outil, une variante exotique), n'a pas à
   être dans le cours : l'explication de la question suffit. Les détails utiles mais secondaires vont dans la section
   « Détails utiles » (8 points au plus), jamais dans une section à part ni dans le tableau de fin.
7. **Les écarts SQL Server / Snowflake** sont dits là où ils comptent (dans la section) et repris dans le tableau
   `differences`, qui est la **carte mentale de fin** du cours : **6 à 10 lignes**, les écarts qui comptent vraiment,
   **une différence par ligne, des cellules de 1 à 4 mots** (un mot-clé, une expression), jamais une phrase ni une
   liste. Ce qui ne tient pas dans la carte mentale n'y va pas. Quand une règle n'est pas sûre, le cours le dit
   (« à vérifier sur ta version »).
8. Phrases courtes, mots simples, un seul sujet par section ; jamais de référence au handicap de l'élève dans le texte.
9. Le cours ne contredit aucune question du module ; une question fausse se signale au superviseur, elle ne se corrige
   pas en changeant le cours.

## Circuit de réécriture d'un cours
expert-sql (écrit le cours, vérifie chaque résultat avec SQLite, contrôle la couverture des 100 « retenir ») →
testeur (vérité technique SQL Server et Snowflake, résultats recalculés, couverture, forme pour l'élève) → superviseur
(`node outils/verifier.js`, tests du site, commit) → l'élève lit et dit.
