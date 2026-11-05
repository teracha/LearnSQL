// Super dico SQL — catégorie « Sous-requêtes » (étape 2, 05/11/2026). Format : docs/dico.md.
// Résultats calculés avec SQLite sur docs/base-exemple.sql (script verif_b.py, scratchpad dico/b), puis rejoués sur le
// vrai serveur MySQL 8.0.46 de la session (base ventes, sans la modifier) : script verif_mysql_b.py.
// ANY / ALL : SQLite ne les connaît pas ; résultat calculé avec MAX dans SQLite, puis à la main en Python ; ALL exécuté
// tel quel sur MySQL. CTE récursive : SQLite avec date(jour, '+1 day') à la place de DATEADD.
// Sources (vérifiées le 05/11/2026) :
// - SQL Server, learn.microsoft.com/sql : relational-databases/performance/subqueries (types de sous-requêtes, ORDER BY
//   seulement avec TOP, ANY / ALL / EXISTS), t-sql/language-elements/all-transact-sql, some-any-transact-sql
//   (SOME = ANY), in-transact-sql (NULL avec NOT IN), t-sql/queries/with-common-table-expression-transact-sql (`;` avant
//   WITH, MAXRECURSION de 0 à 32767, 100 par défaut, UNION ALL entre l'ancre et la partie récursive, mêmes types),
//   recursive-common-table-expression-transact-sql, errors-events 0 à 999 (erreurs 319, 512, 530).
//   Désaccord dans la doc Microsoft : search-condition-transact-sql dit que ALL vaut FALSE si la sous-requête est vide,
//   all-transact-sql dit l'inverse : ce cas n'est pas utilisé dans la fiche.
// - Snowflake, docs.snowflake.com : user-guide/querying-subqueries (sous-requête corrélée prévue dans WHERE seulement),
//   sql-reference/operators-subquery (ALL / ANY : WHERE seulement, pas avec OR ; EXISTS corrélé : WHERE seulement),
//   sql-reference/constructs/with (RECURSIVE facultatif mais conseillé ; liste de colonnes obligatoire pour une CTE
//   récursive ; UNION ALL ; une boucle tourne jusqu'au STATEMENT_TIMEOUT_IN_SECONDS).
// - MySQL 8, dev.mysql.com/doc/refman/8.0/en : subqueries.html, any-in-some-subqueries.html, all-subqueries.html,
//   exists-and-not-exists-subqueries.html, with.html (WITH RECURSIVE obligatoire, cte_max_recursion_depth = 1000) ;
//   chaque point testé sur le serveur : erreurs 1242, 1248, 1146 (CTE récursive sans RECURSIVE), 3636 (après 1001
//   itérations), `> ALL (10, 20)` refusé (erreur 1064), NOT IN + NULL = 0 ligne.
// docs.snowflake.com et dev.mysql.com n'étaient pas joignables depuis la session : Snowflake vérifié par extraits de
// recherche, MySQL par le serveur réel.
LEARNSQL.dico = (LEARNSQL.dico || []).concat([
  {
    id: "sous-requete",
    nom: "Sous-requête",
    type: "mot-clé",
    categorie: "Sous-requêtes",
    definition: "Une requête entre parenthèses, écrite dans une autre requête : dans le WHERE, le FROM ou le SELECT.",
    moteurs: {
      sqlserver: "`WHERE col > (SELECT AVG(col) FROM t)` ; dans `FROM`, un alias est obligatoire : `(SELECT …) AS t`",
      snowflake: "Même écriture ; une sous-requête corrélée n'est prévue que dans le `WHERE` (ou après `LATERAL`) : ailleurs, passe par une jointure",
      mysql: "Même écriture ; dans `FROM`, alias obligatoire aussi"
    },
    noms: ["subquery", "sous-requête corrélée", "table dérivée", "requête imbriquée"],
    exemple: "-- Les commandes au-dessus de la moyenne\nSELECT num_cde, montant_ht\nFROM commande\nWHERE montant_ht > (SELECT AVG(montant_ht) FROM commande);",
    resultat: [["num_cde", "montant_ht"], ["CDE-1001", "4780.00"], ["CDE-1003", "2385.00"], ["CDE-1007", "7950.00"]],
    piege: "Après `=` ou `>`, la sous-requête doit rendre une seule valeur : le jour où elle en rend deux, la requête plante (« Subquery returned more than 1 value »). Utilise `IN`, ou garantis une seule ligne (`MAX`, `TOP (1)`).",
    motsCles: ["sous-requête", "imbriquée", "imbriquer", "intérieur", "moyenne", "comparer", "parenthèses", "corrélée", "dérivée", "subquery", "scalaire", "nested", "calcul", "dépasse"],
    voirAussi: ["exists", "any-all", "with-cte", "in", "where"],
    module: "m06"
  },
  {
    id: "exists",
    nom: "EXISTS",
    type: "mot-clé",
    categorie: "Sous-requêtes",
    definition: "Teste s'il existe au moins une ligne liée ; NOT EXISTS teste qu'il n'y en a aucune.",
    moteurs: {
      sqlserver: "`WHERE [NOT] EXISTS (SELECT 1 FROM t2 WHERE t2.cle = t1.cle)` ; ce que liste le `SELECT` ne compte pas",
      snowflake: "Même écriture ; un `EXISTS` corrélé n'est permis que dans le `WHERE`",
      mysql: "Même écriture"
    },
    noms: ["NOT EXISTS"],
    exemple: "-- Les commandes sans aucun flux EDI\nSELECT c.num_cde, c.canal\nFROM commande AS c\nWHERE NOT EXISTS (SELECT 1 FROM flux_edi AS f\n                  WHERE f.cde_id = c.id);",
    resultat: [["num_cde", "canal"], ["CDE-1002", "TEL"], ["CDE-1004", "WEB"], ["CDE-1005", "TEL"], ["CDE-1006", "WEB"], ["CDE-1008", "TEL"]],
    piege: "`WHERE id NOT IN (SELECT cde_id FROM flux_edi)` renvoie 0 ligne, sans erreur : le flux 3 a un `cde_id` vide (NULL), et un seul NULL suffit. `NOT EXISTS` n'a pas ce piège : prends-le pour chaque recherche « sans flux », « sans facture ».",
    motsCles: ["existe", "client sans commande", "aucun", "commande sans flux", "absent", "manquant", "jamais", "orphelin", "présence", "absence", "anti-jointure", "vérifier", "lié", "lien", "correspondance"],
    voirAussi: ["in", "sous-requete", "any-all", "left-join", "is-null"],
    module: "m06"
  },
  {
    id: "any-all",
    nom: "ANY, ALL",
    type: "mot-clé",
    categorie: "Sous-requêtes",
    definition: "Compare une valeur à toute la liste d'une sous-requête : à au moins une (ANY), ou à toutes (ALL).",
    moteurs: {
      sqlserver: "`col > ALL (SELECT …)` : plus grand que le maximum ; `col > ANY (SELECT …)` : plus grand que le minimum ; `SOME` = `ANY`",
      snowflake: "`col > ALL (SELECT …)`, `ANY` : seulement dans le `WHERE`, et pas à côté d'un `OR`",
      mysql: "Même écriture (`SOME` = `ANY`) ; toujours une sous-requête : `> ALL (10, 20)` plante"
    },
    noms: ["ANY", "ALL", "SOME"],
    exemple: "-- Les articles plus chers que TOUS les produits chimiques\nSELECT code, famille, prix_tarif\nFROM article\nWHERE prix_tarif > ALL (SELECT prix_tarif FROM article\n                        WHERE famille = 'CHIMIE');",
    resultat: [["code", "famille", "prix_tarif"], ["FIL-14", "FILTRATION", "549.00"], ["POMP-1", "FILTRATION", "389.00"], ["ROB-X", "ROBOT", "1290.00"]],
    piege: "`id <> ANY (SELECT cde_id FROM flux_edi)` ne veut pas dire « absent de la liste » : c'est vrai dès qu'une valeur diffère, et les 8 commandes sortent. Pour « absent », écris `NOT EXISTS`.",
    motsCles: ["tous", "toutes", "chacun", "moins", "quelconque", "comparer", "comparaison", "maximum", "minimum", "supérieur", "inférieur", "some", "any", "all", "ensemble", "plus grand que tous"],
    voirAussi: ["sous-requete", "exists", "in", "min-max"],
    module: "m06"
  },
  {
    id: "with-cte",
    nom: "WITH (CTE)",
    type: "mot-clé",
    categorie: "Sous-requêtes",
    definition: "Donne un nom à une sous-requête, écrite en tête avec WITH, pour lire la requête étape par étape.",
    moteurs: {
      sqlserver: "`WITH nom AS (SELECT …) SELECT … FROM nom` ; l'instruction d'avant doit finir par `;` (d'où `;WITH`)",
      snowflake: "Même écriture ; pas de règle spéciale du `;` devant `WITH`",
      mysql: "Même écriture (MySQL 8.0 et plus)"
    },
    noms: ["CTE", ";WITH", "Common Table Expression", "WITH AS"],
    exemple: "WITH ca_client AS (\n  SELECT client_id, SUM(montant_ht) AS ca\n  FROM commande\n  GROUP BY client_id\n)\nSELECT client_id, ca\nFROM ca_client\nWHERE ca > 1000;",
    resultat: [["client_id", "ca"], [1, "15115.00"], [2, "2580.00"]],
    piege: "Sur SQL Server, si l'instruction d'avant ne finit pas par `;`, le `WITH` plante (erreur 319, « Incorrect syntax near the keyword 'with' »). Et une CTE n'est pas un cache : elle ne vit que pour la requête qui suit, et SQL Server peut la recalculer à chaque fois qu'elle est citée.",
    motsCles: ["cte", "with", "étape", "nom", "nommer", "lisible", "lisibilité", "découper", "intermédiaire", "temporaire", "réutiliser", "point-virgule", "common", "expression"],
    voirAussi: ["sous-requete", "cte-recursive", "table-temporaire", "create-view"],
    module: "m06"
  },
  {
    id: "cte-recursive",
    nom: "CTE récursive",
    type: "mot-clé",
    categorie: "Sous-requêtes",
    definition: "Une CTE qui se relit elle-même, niveau par niveau : pour parcourir une hiérarchie ou créer une suite de dates.",
    moteurs: {
      sqlserver: "`WITH` seul, sans `RECURSIVE` ; l'ancre, `UNION ALL`, puis la partie récursive ; 100 niveaux au plus, sinon `OPTION (MAXRECURSION 0)`",
      snowflake: "`WITH RECURSIVE nom (colonnes) AS (…)` : la liste des colonnes est obligatoire ; une boucle sans fin tourne, et coûte, jusqu'au délai maximum de la requête",
      mysql: "`WITH RECURSIVE` obligatoire ; 1 000 niveaux au plus (`cte_max_recursion_depth`)"
    },
    noms: ["WITH RECURSIVE", "MAXRECURSION", "CONNECT BY"],
    exemple: "WITH jours (jour) AS (\n  SELECT CAST('20260401' AS date)\n  UNION ALL\n  SELECT DATEADD(day, 1, jour) FROM jours WHERE jour < '20260405'\n)\nSELECT j.jour, COUNT(c.id) AS nb_cde\nFROM jours AS j LEFT JOIN commande AS c ON c.date_cde = j.jour\nGROUP BY j.jour ORDER BY j.jour;",
    exemples: {
      snowflake: "WITH RECURSIVE jours (jour) AS (\n  SELECT '2026-04-01'::DATE\n  UNION ALL\n  SELECT DATEADD(day, 1, jour) FROM jours WHERE jour < '2026-04-05'\n)\nSELECT j.jour, COUNT(c.id) AS nb_cde\nFROM jours AS j LEFT JOIN commande AS c ON c.date_cde = j.jour\nGROUP BY j.jour ORDER BY j.jour;",
      mysql: "WITH RECURSIVE jours (jour) AS (\n  SELECT CAST('2026-04-01' AS DATE)\n  UNION ALL\n  SELECT jour + INTERVAL 1 DAY FROM jours WHERE jour < '2026-04-05'\n)\nSELECT j.jour, COUNT(c.id) AS nb_cde\nFROM jours AS j LEFT JOIN commande AS c ON c.date_cde = j.jour\nGROUP BY j.jour ORDER BY j.jour;"
    },
    resultat: [["jour", "nb_cde"], ["2026-04-01", 1], ["2026-04-02", 0], ["2026-04-03", 1], ["2026-04-04", 0], ["2026-04-05", 0]],
    piege: "Sur SQL Server, la récursion s'arrête à 100 niveaux : un calendrier de 365 jours plante (« The maximum recursion 100 has been exhausted »). Ajoute `OPTION (MAXRECURSION 400)` à la fin, et garde toujours une condition d'arrêt (`WHERE jour < …`).",
    motsCles: ["récursif", "récursive", "récursion", "hiérarchie", "arbre", "parent", "nomenclature", "organigramme", "niveaux", "boucle", "calendrier", "série", "générer", "jours", "maxrecursion", "hiérarchique"],
    voirAussi: ["with-cte", "union-all", "dateadd", "left-join"],
    module: "m06"
  }
]);
