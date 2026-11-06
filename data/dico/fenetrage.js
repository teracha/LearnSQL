// Super dico SQL — catégorie « Fenêtrage » (étape 2, 05/11/2026). Format : docs/dico.md.
// Résultats calculés avec SQLite sur docs/base-exemple.sql (fonctions de fenêtrage natives, même cadre par défaut que la
// norme) : script verif_b.py (scratchpad dico/b). Chaque exemple rejoué sur le vrai serveur MySQL 8.0.46 de la session
// (base ventes, sans la modifier) : script verif_mysql_b.py. QUALIFY : SQLite et MySQL ne l'ont pas ; résultat vérifié
// avec la forme sous-requête (SQL Server, MySQL).
// Sources (vérifiées le 05/11/2026) :
// - SQL Server, learn.microsoft.com/sql/t-sql : queries/select-over-clause-transact-sql (avec ORDER BY et sans ROWS /
//   RANGE : RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW ; RANGE sans « n PRECEDING » ; pas de DISTINCT avec OVER),
//   functions/row-number-transact-sql (ORDER BY obligatoire, ordre non garanti entre ex aequo), rank-transact-sql,
//   ntile-transact-sql (les groupes plus gros d'abord), lag-transact-sql et lead-transact-sql (IGNORE NULLS : 2022+),
//   last-value-transact-sql (cadre par défaut jusqu'à la ligne courante, IGNORE NULLS : 2022+).
// - Snowflake, docs.snowflake.com/en/sql-reference : functions-window-syntax (SUM, COUNT, MIN, MAX : cadre par défaut
//   RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW, comme la norme ; RANGE avec un écart en nombre ou en INTERVAL),
//   functions/first_value et functions/last_value (sans cadre : toute la fenêtre, ROWS BETWEEN UNBOUNDED PRECEDING AND
//   UNBOUNDED FOLLOWING, écart avec la norme ANSI), functions/row_number (ORDER BY obligatoire), functions/lag (IGNORE
//   NULLS), constructs/qualify (après les fenêtres, avant ORDER BY).
// - MySQL 8, dev.mysql.com/doc/refman/8.0/en : window-functions-usage.html, window-function-descriptions.html,
//   window-functions-frames.html ; testé sur le serveur : fenêtre dans WHERE refusée (erreur 3593), QUALIFY refusé
//   (1064), IGNORE NULLS et COUNT(DISTINCT) OVER refusés (1235), RANGE BETWEEN INTERVAL 7 DAY PRECEDING accepté,
//   LAST_VALUE sans cadre = ligne courante, ROW_NUMBER sans ORDER BY accepté.
// docs.snowflake.com et dev.mysql.com n'étaient pas joignables depuis la session : Snowflake vérifié par extraits de
// recherche, MySQL par le serveur réel.
LEARNSQL.dico = (LEARNSQL.dico || []).concat([
  {
    id: "over",
    nom: "OVER",
    type: "mot-clé",
    categorie: "Fenêtrage",
    definition: "Calcule sur un groupe de lignes (total, rang, moyenne) sans les regrouper : chaque ligne garde son détail.",
    moteurs: {
      sqlserver: "`fonction(…) OVER ([PARTITION BY …] [ORDER BY …])` ; `OVER ()` : toutes les lignes du résultat",
      snowflake: "Même écriture",
      mysql: "Même écriture (MySQL 8.0 et plus)"
    },
    noms: ["PARTITION BY", "OVER ()", "fonction de fenêtrage", "window function"],
    exemple: "SELECT num_cde, client_id, montant_ht,\n       SUM(montant_ht) OVER (PARTITION BY client_id) AS total_client\nFROM commande\nWHERE client_id IN (1, 2)\nORDER BY client_id, num_cde;",
    resultat: [["num_cde", "client_id", "montant_ht", "total_client"], ["CDE-1001", 1, "4780.00", "15115.00"], ["CDE-1003", 1, "2385.00", "15115.00"], ["CDE-1007", 1, "7950.00", "15115.00"], ["CDE-1002", 2, "1290.00", "2580.00"], ["CDE-1006", 2, "1290.00", "2580.00"]],
    piege: "Un `ORDER BY` dans le `OVER` change le calcul : `SUM(montant_ht) OVER (PARTITION BY client_id ORDER BY date_cde)` donne un cumul (4780, 7165, 15115), et non plus le total du client. Pour un total, laisse le `OVER` sans `ORDER BY`.",
    pratique: "Pour la part de chaque ligne dans le total (poids d'un client dans le chiffre d'affaires), divise par la somme de toute la fenêtre : `100.0 * montant_ht / SUM(montant_ht) OVER ()`.",
    motsCles: ["fenêtre", "fenêtrage", "partition", "total", "groupe", "détail", "garder", "lignes", "regrouper", "window", "analytique", "pourcentage", "part", "sous-total"],
    voirAussi: ["row-number", "cumul", "cadre-rows", "group-by", "sum"],
    module: "m08"
  },
  {
    id: "row-number",
    nom: "ROW_NUMBER",
    type: "fonction",
    categorie: "Fenêtrage",
    definition: "Donne un numéro à chaque ligne, dans l'ordre choisi, en repartant à 1 dans chaque groupe.",
    moteurs: {
      sqlserver: "`ROW_NUMBER() OVER ([PARTITION BY …] ORDER BY …)` ; `ORDER BY` obligatoire ; filtre `rn = 1` dans une sous-requête ou une CTE",
      snowflake: "Même écriture ; filtre direct : `QUALIFY ROW_NUMBER() OVER (…) = 1`",
      mysql: "Même écriture (8.0 et plus ; `ORDER BY` facultatif) ; pas de `QUALIFY` : sous-requête"
    },
    noms: [],
    exemple: "-- La dernière commande de chaque client\nSELECT client_id, num_cde, date_cde\nFROM (SELECT client_id, num_cde, date_cde,\n             ROW_NUMBER() OVER (PARTITION BY client_id\n                                ORDER BY date_cde DESC) AS rn\n      FROM commande) AS t\nWHERE rn = 1\nORDER BY client_id;",
    exemples: {
      snowflake: "-- La dernière commande de chaque client\nSELECT client_id, num_cde, date_cde\nFROM commande\nQUALIFY ROW_NUMBER() OVER (PARTITION BY client_id\n                           ORDER BY date_cde DESC) = 1\nORDER BY client_id;"
    },
    resultat: [["client_id", "num_cde", "date_cde"], [1, "CDE-1007", "2026-04-07"], [2, "CDE-1006", "2026-04-03"], [3, "CDE-1004", "2026-03-12"], [4, "CDE-1005", "2026-04-01"], [6, "CDE-1008", "2026-04-10"]],
    piege: "Si deux commandes d'un client ont la même date, `ROW_NUMBER` en garde une au hasard, et pas toujours la même d'une exécution à l'autre. Ajoute un départage unique : `ORDER BY date_cde DESC, id DESC`.",
    pratique: "Pour repérer les doublons d'une table d'import (même commande reçue deux fois), numérote chaque groupe avec `ROW_NUMBER() OVER (PARTITION BY num_cde ORDER BY id)` : les lignes où le numéro dépasse 1 sont les doublons.",
    motsCles: ["numéroter", "numéro", "dernière commande par client", "dernier", "première", "récente", "dédoublonner", "doublons", "garder", "groupe", "rn", "séquence", "compteur", "ligne", "ordre"],
    voirAussi: ["rank", "qualify", "over", "ntile", "with-cte"],
    module: "m08"
  },
  {
    id: "rank",
    nom: "RANK, DENSE_RANK",
    type: "fonction",
    categorie: "Fenêtrage",
    definition: "Classe les lignes : les ex aequo ont le même rang ; RANK laisse ensuite un trou, DENSE_RANK non.",
    moteurs: {
      sqlserver: "`RANK() OVER (ORDER BY …)` donne 1, 1, 3 ; `DENSE_RANK()` donne 1, 1, 2 ; `ORDER BY` obligatoire",
      snowflake: "Même écriture",
      mysql: "Même écriture (8.0 et plus)"
    },
    noms: ["RANK", "DENSE_RANK"],
    exemple: "-- Les commandes téléphone et web, classées par montant\nSELECT num_cde, montant_ht,\n       RANK()       OVER (ORDER BY montant_ht DESC) AS rang,\n       DENSE_RANK() OVER (ORDER BY montant_ht DESC) AS rang_dense\nFROM commande\nWHERE canal IN ('TEL', 'WEB')\nORDER BY rang, num_cde;",
    resultat: [["num_cde", "montant_ht", "rang", "rang_dense"], ["CDE-1002", "1290.00", 1, 1], ["CDE-1006", "1290.00", 1, 1], ["CDE-1004", "549.00", 3, 2], ["CDE-1005", "318.00", 4, 3], ["CDE-1008", "79.80", 5, 4]],
    piege: "Pour « la plus grosse commande », `rang = 1` rend ici 2 lignes (CDE-1002 et CDE-1006, ex aequo à 1 290 €) : un rapport qui attend une seule ligne double son total. Une seule ligne voulue : `ROW_NUMBER`, avec un départage.",
    pratique: "Pour un top clients par chiffre d'affaires, classe directement le total du `GROUP BY` : `RANK() OVER (ORDER BY SUM(montant_ht) DESC)`, dans la même requête, sans sous-requête.",
    motsCles: ["classer", "classement", "rang", "position", "aequo", "égalité", "podium", "palmarès", "meilleurs", "top", "trou", "dense", "ranking", "premier", "places"],
    voirAussi: ["row-number", "ntile", "over", "top"],
    module: "m08"
  },
  {
    id: "lag-lead",
    nom: "LAG, LEAD",
    type: "fonction",
    categorie: "Fenêtrage",
    definition: "Lit la valeur de la ligne d'avant (LAG) ou de la ligne d'après (LEAD), dans l'ordre choisi.",
    moteurs: {
      sqlserver: "`LAG(col [, n [, défaut]]) OVER ([PARTITION BY …] ORDER BY …)` ; `LEAD` : même écriture, vers l'après ; `IGNORE NULLS` en 2022+",
      snowflake: "Même écriture ; `IGNORE NULLS` saute les valeurs vides",
      mysql: "Même écriture (8.0 et plus) ; pas de `IGNORE NULLS`"
    },
    noms: ["LAG", "LEAD"],
    exemple: "-- Écart avec la commande précédente du même client\nSELECT num_cde, montant_ht,\n       montant_ht - LAG(montant_ht) OVER (PARTITION BY client_id\n                                          ORDER BY date_cde) AS ecart\nFROM commande\nWHERE client_id IN (1, 2)\nORDER BY client_id, date_cde;",
    resultat: [["num_cde", "montant_ht", "ecart"], ["CDE-1001", "4780.00", null], ["CDE-1003", "2385.00", "-2395.00"], ["CDE-1007", "7950.00", "5565.00"], ["CDE-1002", "1290.00", null], ["CDE-1006", "1290.00", "0.00"]],
    piege: "Sans `PARTITION BY client_id`, LAG prend la commande d'avant, même d'un autre client : CDE-1002 serait comparée à une commande d'AquaBleu. Et la 1re commande de chaque client donne NULL : `LAG(montant_ht, 1, 0)` met 0 à la place.",
    pratique: "Pour trouver les trous d'une numérotation (factures, numéros de message EDI), compare chaque numéro au suivant : `LEAD(num) OVER (ORDER BY num) - num > 1` signale un trou juste après.",
    motsCles: ["précédent", "ligne précédente", "suivant", "suivante", "avant", "après", "écart", "évolution", "variation", "comparer", "différence", "lag", "lead", "veille", "décalage"],
    voirAussi: ["over", "first-value", "datediff", "row-number"],
    module: "m08"
  },
  {
    id: "first-value",
    nom: "FIRST_VALUE, LAST_VALUE",
    type: "fonction",
    categorie: "Fenêtrage",
    definition: "Renvoie la première (FIRST_VALUE) ou la dernière (LAST_VALUE) valeur de la fenêtre, sur chaque ligne.",
    moteurs: {
      sqlserver: "`FIRST_VALUE(col) OVER (… ORDER BY …)` ; LAST_VALUE a besoin du cadre complet (`… AND UNBOUNDED FOLLOWING`) ; `IGNORE NULLS` en 2022+",
      snowflake: "Même écriture ; sans cadre écrit, la fenêtre est entière : LAST_VALUE rend bien la dernière valeur",
      mysql: "Même écriture, et même piège que SQL Server : écris le cadre complet"
    },
    noms: ["FIRST_VALUE", "LAST_VALUE", "NTH_VALUE"],
    exemple: "SELECT num_cde, date_cde,\n       FIRST_VALUE(num_cde) OVER (ORDER BY date_cde) AS premiere,\n       LAST_VALUE(num_cde)  OVER (ORDER BY date_cde) AS sans_cadre,\n       LAST_VALUE(num_cde)  OVER (ORDER BY date_cde\n         ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING) AS avec_cadre\nFROM commande\nWHERE client_id = 1\nORDER BY date_cde;",
    resultat: [["num_cde", "date_cde", "premiere", "sans_cadre", "avec_cadre"], ["CDE-1001", "2026-03-02", "CDE-1001", "CDE-1001", "CDE-1007"], ["CDE-1003", "2026-03-09", "CDE-1001", "CDE-1003", "CDE-1007"], ["CDE-1007", "2026-04-07", "CDE-1001", "CDE-1007", "CDE-1007"]],
    piege: "Sans cadre écrit, SQL Server et MySQL s'arrêtent à la ligne courante : `sans_cadre` répète la commande de la ligne, pas la dernière (Snowflake, lui, rend CDE-1007 partout). Écris toujours `ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING`.",
    pratique: "Pour le stock d'ouverture et de clôture de chaque mois : `FIRST_VALUE(qte) OVER (PARTITION BY mois ORDER BY jour)` donne l'ouverture ; avec `ORDER BY jour DESC`, la clôture. Pas de cadre à écrire.",
    motsCles: ["premier", "première", "dernier", "dernière", "valeur", "début", "fin", "initial", "final", "cadre", "fenêtre", "first", "last", "ouverture", "clôture"],
    voirAussi: ["cadre-rows", "lag-lead", "over", "min-max"],
    module: "m08"
  },
  {
    id: "cumul",
    nom: "Cumul (SUM OVER)",
    type: "fonction",
    categorie: "Fenêtrage",
    definition: "Additionne les montants ligne après ligne, dans l'ordre choisi : un total qui grandit à chaque ligne.",
    moteurs: {
      sqlserver: "`SUM(col) OVER ([PARTITION BY …] ORDER BY … ROWS UNBOUNDED PRECEDING)`",
      snowflake: "Même écriture",
      mysql: "Même écriture (MySQL 8.0 et plus)"
    },
    noms: ["SUM OVER"],
    exemple: "-- Le chiffre d'affaires facturé, cumulé facture après facture\nSELECT num_fact, date_fact, montant_ht,\n       SUM(montant_ht) OVER (ORDER BY date_fact\n                             ROWS UNBOUNDED PRECEDING) AS cumul\nFROM facture\nORDER BY date_fact;",
    resultat: [["num_fact", "date_fact", "montant_ht", "cumul"], ["FA-2026-0301", "2026-03-03", "4780.00", "4780.00"], ["FA-2026-0302", "2026-03-06", "1290.00", "6070.00"], ["FA-2026-0303", "2026-03-10", "2385.00", "8455.00"], ["FA-2026-0401", "2026-04-11", "79.80", "8534.80"]],
    piege: "Sans `ROWS`, le cadre par défaut est `RANGE` sur les 3 moteurs : deux factures du même jour reçoivent le même cumul, additionnées d'un coup. Écris `ROWS UNBOUNDED PRECEDING`, avec un tri unique (`ORDER BY date_fact, id`).",
    pratique: "Pour le solde progressif d'un compte (grand livre), cumule `SUM(debit - credit) OVER (PARTITION BY compte ORDER BY date_ecr, id ROWS UNBOUNDED PRECEDING)` : le solde repart de zéro à chaque compte.",
    motsCles: ["cumul", "cumulatif", "total cumulé", "somme cumulée", "running total", "progressif", "additionner", "solde", "courant", "depuis", "début", "chiffre d'affaires", "ca"],
    voirAussi: ["cadre-rows", "over", "sum", "lag-lead"],
    module: "m08"
  },
  {
    id: "ntile",
    nom: "NTILE",
    type: "fonction",
    categorie: "Fenêtrage",
    definition: "Découpe les lignes triées en n groupes de même taille (en nombre de lignes) : tiers, quartiles, déciles.",
    moteurs: {
      sqlserver: "`NTILE(n) OVER ([PARTITION BY …] ORDER BY …)` ; s'il reste des lignes, les premiers groupes en ont une de plus",
      snowflake: "Même écriture",
      mysql: "Même écriture (8.0 et plus)"
    },
    noms: [],
    exemple: "SELECT num_cde, montant_ht,\n       NTILE(3) OVER (ORDER BY montant_ht DESC) AS tranche\nFROM commande\nWHERE canal IN ('TEL', 'WEB')\nORDER BY tranche, num_cde;",
    resultat: [["num_cde", "montant_ht", "tranche"], ["CDE-1002", "1290.00", 1], ["CDE-1006", "1290.00", 1], ["CDE-1004", "549.00", 2], ["CDE-1005", "318.00", 2], ["CDE-1008", "79.80", 3]],
    piege: "NTILE coupe en parts égales en nombre de lignes, pas en valeur : le groupe 1 d'un `NTILE(10)` contient 10 % des clients, pas 10 % du chiffre d'affaires. Pour une analyse ABC, calcule un cumul en %.",
    pratique: "Pour lire les tranches dans un rapport, affiche leurs bornes : calcule le `NTILE` dans une sous-requête, puis `MIN(montant_ht)` et `MAX(montant_ht)` avec `GROUP BY tranche`.",
    motsCles: ["découper", "tranches", "groupes", "quartile", "quartiles", "décile", "déciles", "tiers", "segmenter", "répartir", "percentile", "parts", "segmentation", "classes", "ntile"],
    voirAussi: ["rank", "row-number", "cumul", "over"],
    module: "m08"
  },
  {
    id: "qualify",
    nom: "QUALIFY",
    type: "mot-clé",
    categorie: "Fenêtrage",
    definition: "Filtre les lignes sur le résultat d'une fonction de fenêtrage : un WHERE qui passe après la fenêtre.",
    moteurs: {
      sqlserver: "Pas de QUALIFY : calcule la fenêtre dans une sous-requête (ou une CTE), puis filtre avec `WHERE`",
      snowflake: "`QUALIFY condition`, après `WHERE`, `GROUP BY` et `HAVING`, avant `ORDER BY`",
      mysql: "Pas de QUALIFY : sous-requête (ou CTE), puis `WHERE`"
    },
    noms: [],
    exemple: "-- Les commandes des clients qui ont commandé au moins 2 fois\nSELECT num_cde, client_id, montant_ht\nFROM (SELECT num_cde, client_id, montant_ht,\n             COUNT(*) OVER (PARTITION BY client_id) AS nb\n      FROM commande) AS t\nWHERE nb >= 2\nORDER BY client_id, num_cde;",
    exemples: {
      snowflake: "-- Les commandes des clients qui ont commandé au moins 2 fois\nSELECT num_cde, client_id, montant_ht\nFROM commande\nQUALIFY COUNT(*) OVER (PARTITION BY client_id) >= 2\nORDER BY client_id, num_cde;"
    },
    resultat: [["num_cde", "client_id", "montant_ht"], ["CDE-1001", 1, "4780.00"], ["CDE-1003", 1, "2385.00"], ["CDE-1007", 1, "7950.00"], ["CDE-1002", 2, "1290.00"], ["CDE-1006", 2, "1290.00"]],
    piege: "Une requête Snowflake avec `QUALIFY`, copiée telle quelle sur SQL Server ou MySQL, plante (erreur de syntaxe). Et `WHERE COUNT(*) OVER (…) >= 2` plante aussi : la fenêtre est calculée après le `WHERE`, d'où la sous-requête.",
    pratique: "Sur SQL Server, l'équivalent le plus court de `QUALIFY ROW_NUMBER() … = 1` : `SELECT TOP (1) WITH TIES … ORDER BY ROW_NUMBER() OVER (PARTITION BY client_id ORDER BY date_cde DESC)`. Une ligne par client, sans sous-requête.",
    motsCles: ["filtrer", "filtre", "fenêtre", "fenêtrage", "garder", "dernière", "dédoublonner", "snowflake", "where", "après", "rang", "qualify", "condition"],
    voirAussi: ["row-number", "over", "having", "sous-requete", "with-cte"],
    module: "m08"
  },
  {
    id: "cadre-rows",
    nom: "ROWS BETWEEN",
    type: "mot-clé",
    categorie: "Fenêtrage",
    definition: "Dit quelles lignes entrent dans le calcul d'une fenêtre : depuis le début, ou seulement les n lignes d'avant.",
    moteurs: {
      sqlserver: "`ROWS BETWEEN 2 PRECEDING AND CURRENT ROW` ; sans cadre écrit (avec `ORDER BY`) : `RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW` ; `RANGE` n'accepte pas `n PRECEDING`",
      snowflake: "Même écriture ; `RANGE` accepte aussi un écart en valeur : un nombre, ou `INTERVAL '3 days'` sur une date",
      mysql: "Même écriture ; `RANGE` accepte aussi un écart en valeur : `RANGE BETWEEN INTERVAL 7 DAY PRECEDING AND CURRENT ROW`"
    },
    noms: ["ROWS", "RANGE", "UNBOUNDED PRECEDING", "CURRENT ROW", "FOLLOWING", "window frame"],
    exemple: "-- Cumul des commandes téléphone et web, de la plus grosse à la plus petite\nSELECT num_cde, montant_ht,\n       SUM(montant_ht) OVER (ORDER BY montant_ht DESC) AS cadre_par_defaut,\n       SUM(montant_ht) OVER (ORDER BY montant_ht DESC, num_cde\n                             ROWS UNBOUNDED PRECEDING) AS avec_rows\nFROM commande\nWHERE canal IN ('TEL', 'WEB')\nORDER BY montant_ht DESC, num_cde;",
    resultat: [["num_cde", "montant_ht", "cadre_par_defaut", "avec_rows"], ["CDE-1002", "1290.00", "2580.00", "1290.00"], ["CDE-1006", "1290.00", "2580.00", "2580.00"], ["CDE-1004", "549.00", "3129.00", "3129.00"], ["CDE-1005", "318.00", "3447.00", "3447.00"], ["CDE-1008", "79.80", "3526.80", "3526.80"]],
    piege: "`ROWS BETWEEN 6 PRECEDING AND CURRENT ROW` prend 7 lignes, pas 7 jours : s'il manque des jours sans vente, ta « moyenne sur 7 jours » couvre plus d'une semaine. Bouche les trous avec un calendrier, ou (MySQL, Snowflake) écris un `RANGE` sur un intervalle de dates.",
    pratique: "Pour un chiffre d'affaires sur 12 mois glissants, les 11 premiers mois cumulent moins de 12 mois. Repère-les avec `COUNT(*) OVER (ORDER BY mois ROWS BETWEEN 11 PRECEDING AND CURRENT ROW)` : moins de 12, total partiel.",
    motsCles: ["cadre", "fenêtre", "glissant", "glissante", "mobile", "moyenne", "précédentes", "lignes", "preceding", "following", "unbounded", "range", "rows", "frame", "période"],
    voirAussi: ["cumul", "first-value", "over", "lag-lead"],
    module: "m08"
  }
]);
