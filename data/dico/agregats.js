// Super dico SQL — catégorie « Agrégats » (étape 2, 05/11/2026). Format : docs/dico.md.
// Résultats calculés avec SQLite sur docs/base-exemple.sql (ROLLUP -> GROUP BY + UNION ALL de la ligne de total,
// STRING_AGG -> group_concat(… ORDER BY …)) et relancés sur un vrai serveur MySQL 8.0.46 (copie ventes_a) :
// scripts verif_a.py et mysql_a.py (scratchpad dico/a).
// Sources (vérifiées le 05/11/2026) :
// - SQL Server, learn.microsoft.com/sql/t-sql : functions/count-transact-sql (int ; Msg 8115 au-delà de 2 147 483 647 ;
//   COUNT_BIG en bigint ; une seule expression après DISTINCT), functions/sum-transact-sql et functions/avg-transact-sql
//   (types rendus : int -> int ; decimal(p, s) -> decimal(38, s) pour SUM, decimal(38, max(s, 6)) pour AVG ; AVG divise
//   par le nombre de valeurs non NULL), functions/aggregate-functions-transact-sql (NULL ignorés, sauf COUNT(*)),
//   queries/select-group-by-transact-sql (alias interdit dans GROUP BY ; ROLLUP, CUBE, GROUPING SETS ; WITH ROLLUP gardé
//   pour compatibilité ; GROUP BY ne trie pas ; GROUP BY ALL à la Snowflake : Fabric seulement),
//   queries/select-clause-transact-sql (alias interdit dans WHERE, GROUP BY, HAVING), functions/string-agg-transact-sql
//   (2017+, WITHIN GROUP, varchar(1..8000) -> varchar(8000), exemples en CONVERT(NVARCHAR(MAX), …)).
// - Snowflake, docs.snowflake.com/en/sql-reference : functions/count (DISTINCT sur plusieurs colonnes),
//   functions/count_if, functions/max_by, constructs/group-by (GROUP BY ALL, alias), constructs/having (alias permis),
//   constructs/group-by-rollup, group-by-cube, group-by-grouping-sets, functions/grouping, functions/listagg
//   (séparateur vide par défaut, ordre imprévisible sans WITHIN GROUP).
// - MySQL 8, dev.mysql.com/doc/refman/8.0/en : aggregate-functions.html (COUNT(DISTINCT a, b) ; SUM et AVG rendent un
//   DECIMAL ; GROUP_CONCAT coupé à group_concat_max_len = 1024), group-by-handling.html (ONLY_FULL_GROUP_BY),
//   group-by-modifiers.html (WITH ROLLUP ; GROUPING() en 8.0.1 ; ORDER BY avec ROLLUP en 8.0.12). Testé sur le serveur :
//   erreur 1055 hors GROUP BY, valeur au hasard sans ONLY_FULL_GROUP_BY, alias accepté dans GROUP BY et HAVING,
//   ROLLUP (…), CUBE et GROUPING SETS refusés (erreur 1064), avertissement 1260 quand GROUP_CONCAT coupe.
// docs.snowflake.com n'était pas joignable depuis la session : vérifié par extraits de recherche.
LEARNSQL.dico = (LEARNSQL.dico || []).concat([
  {
    id: "count",
    nom: "COUNT",
    type: "fonction",
    categorie: "Agrégats",
    definition: "Compte les lignes, ou les valeurs non NULL d'une colonne.",
    moteurs: {
      sqlserver: "`COUNT(*)` : les lignes ; `COUNT(col)` : les valeurs non NULL ; `COUNT(DISTINCT col)` : les valeurs différentes ; plus de 2,1 milliards : `COUNT_BIG(*)`",
      snowflake: "Même écriture ; en plus `COUNT(DISTINCT a, b)` (les couples différents) et `COUNT_IF(condition)`",
      mysql: "Même écriture ; `COUNT(DISTINCT a, b)` marche aussi"
    },
    noms: ["COUNT(*)", "COUNT DISTINCT", "COUNT_BIG", "COUNT_IF"],
    exemple: "SELECT COUNT(*) AS nb_clients,\n       COUNT(siren) AS avec_siren,\n       COUNT(DISTINCT siren) AS siren_differents\nFROM client;",
    resultat: [["nb_clients", "avec_siren", "siren_differents"], [7, 5, 4]],
    piege: "Après un `LEFT JOIN`, `COUNT(*)` compte 1 pour un client sans commande : Pool & Garden sort avec 1 commande au lieu de 0. Compte la clé de droite, `COUNT(co.id)`, qui ignore les NULL.",
    motsCles: ["compter", "nombre", "combien", "lignes", "comptage", "count", "distinct", "différents", "valeurs", "dénombrer", "nb", "vides", "remplies", "total", "enregistrements", "compter les lignes"],
    voirAussi: ["sum", "group-by", "distinct", "left-join", "is-null"],
    module: "m04"
  },
  {
    id: "sum",
    nom: "SUM",
    type: "fonction",
    categorie: "Agrégats",
    definition: "Additionne les valeurs d'une colonne pour faire un total ; les NULL sont ignorés.",
    moteurs: {
      sqlserver: "`SUM(col)` ; sur une colonne INT, le total reste un INT : au-delà de 2,1 milliards, erreur ; écris `SUM(CAST(col AS bigint))`",
      snowflake: "`SUM(col)` (même écriture)",
      mysql: "`SUM(col)` ; sur des entiers, le total est un DECIMAL : pas de dépassement"
    },
    noms: [],
    exemple: "SELECT canal, SUM(montant_ht) AS ca_ht\nFROM commande\nWHERE statut <> 'ANNULEE'\nGROUP BY canal\nORDER BY canal;",
    resultat: [["canal", "ca_ht"], ["EDI", "15115.00"], ["TEL", "1687.80"], ["WEB", "1290.00"]],
    piege: "Après une jointure 1-N (`commande` puis `ligne_cde`), `SUM(co.montant_ht)` compte chaque commande une fois par ligne : CDE-1001 vaut 9560.00 au lieu de 4780.00. Additionne le détail, `SUM(li.qte * li.prix_unit)`, ou agrège avant de joindre.",
    motsCles: ["additionner", "somme", "total", "totaliser", "cumuler", "montant", "chiffre d'affaires", "ht", "addition", "sum", "sommer", "argent", "euros"],
    voirAussi: ["count", "avg", "group-by", "inner-join", "coalesce"],
    module: "m04"
  },
  {
    id: "avg",
    nom: "AVG",
    type: "fonction",
    categorie: "Agrégats",
    definition: "Calcule la moyenne des valeurs d'une colonne ; les NULL ne comptent pas.",
    moteurs: {
      sqlserver: "`AVG(col)` ; sur une colonne entière, la moyenne est coupée en entier (150 et 5 donnent 77) : écris `AVG(col * 1.0)`",
      snowflake: "`AVG(col)` ; sur des entiers, garde les décimales (150 et 5 donnent 77,5)",
      mysql: "`AVG(col)` ; sur des entiers, garde les décimales (150 et 5 donnent 77,5)"
    },
    noms: [],
    exemple: "-- Montant moyen : par facture, ou par commande ?\nSELECT AVG(f.montant_ht) AS moy_factures,\n       AVG(COALESCE(f.montant_ht, 0)) AS moy_commandes\nFROM commande AS co\nLEFT JOIN facture AS f ON f.cde_id = co.id;",
    resultat: [["moy_factures", "moy_commandes"], ["2133.700000", "1066.850000"]],
    piege: "« Montant moyen facturé par commande » avec `AVG(f.montant_ht)` : les 4 commandes sans facture (NULL) ne comptent pas, et la moyenne double (2133.70 au lieu de 1066.85). Si une absence vaut 0, écris `AVG(COALESCE(f.montant_ht, 0))`.",
    motsCles: ["moyenne", "moyen", "panier", "average", "avg", "milieu", "répartir", "diviser", "décimales", "entier", "mean", "prix moyen", "ratio"],
    voirAussi: ["sum", "count", "coalesce", "division", "cast"],
    module: "m04"
  },
  {
    id: "min-max",
    nom: "MIN, MAX",
    type: "fonction",
    categorie: "Agrégats",
    definition: "Donne la plus petite (MIN) ou la plus grande (MAX) valeur d'une colonne.",
    moteurs: {
      sqlserver: "`MIN(col)`, `MAX(col)` : nombres, dates, et textes (ordre alphabétique) ; les NULL sont ignorés",
      snowflake: "Même écriture ; en plus `MAX_BY(num_cde, date_cde)` : la commande de la date la plus récente",
      mysql: "Même écriture"
    },
    noms: ["MIN", "MAX", "MAX_BY", "MIN_BY"],
    exemple: "SELECT client_id,\n       MIN(date_cde) AS premiere_cde,\n       MAX(date_cde) AS derniere_cde\nFROM commande\nGROUP BY client_id\nORDER BY client_id;",
    resultat: [["client_id", "premiere_cde", "derniere_cde"], [1, "2026-03-02", "2026-04-07"], [2, "2026-03-05", "2026-04-03"], [3, "2026-03-12", "2026-03-12"], [4, "2026-04-01", "2026-04-01"], [6, "2026-04-10", "2026-04-10"]],
    piege: "Sur une date rangée en texte au format JJ/MM/AAAA (fichier EDI, import Excel), `MAX` compare des caractères : '31/03/2026' passe devant '01/04/2026'. Convertis d'abord en date, `MAX(CONVERT(date, col, 103))`.",
    motsCles: ["minimum", "maximum", "plus petit", "plus grand", "premier", "dernier", "première", "dernière", "date", "récent", "ancien", "min", "max", "extrême", "plus haut", "plus bas"],
    voirAussi: ["group-by", "order-by", "convert", "row-number"],
    module: "m04"
  },
  {
    id: "group-by",
    nom: "GROUP BY",
    type: "mot-clé",
    categorie: "Agrégats",
    definition: "Regroupe les lignes qui ont la même valeur, pour calculer un total ou un nombre par groupe.",
    moteurs: {
      sqlserver: "`GROUP BY col1, col2` ; chaque colonne du SELECT est groupée ou dans un agrégat, sinon erreur ; pas d'alias dans le `GROUP BY`",
      snowflake: "Même règle ; l'alias est accepté, et `GROUP BY ALL` groupe sur toutes les colonnes non agrégées du SELECT",
      mysql: "Même règle avec `ONLY_FULL_GROUP_BY` (actif par défaut en MySQL 8) ; l'alias est accepté"
    },
    noms: ["GROUP BY ALL", "ONLY_FULL_GROUP_BY"],
    exemple: "SELECT statut, COUNT(*) AS nb_cdes, SUM(montant_ht) AS total_ht\nFROM commande\nGROUP BY statut\nORDER BY statut;",
    resultat: [["statut", "nb_cdes", "total_ht"], ["ANNULEE", 1, "549.00"], ["EN_COURS", 3, "9558.00"], ["LIVREE", 4, "8534.80"]],
    piege: "`SELECT client_id, statut, COUNT(*) … GROUP BY client_id` plante sur SQL Server, Snowflake et MySQL 8 : `statut` n'est ni groupé ni agrégé. Sans `ONLY_FULL_GROUP_BY` (ancien MySQL, ou mode retiré), la requête passe et affiche un statut pris au hasard : ajoute la colonne au `GROUP BY`, ou agrège-la.",
    motsCles: ["regrouper", "grouper", "groupe", "chaque", "agréger", "agrégat", "group", "regroupement", "synthèse", "résumé", "ventiler", "ventilation", "par client", "par statut", "par mois", "catégorie"],
    voirAussi: ["having", "count", "sum", "rollup", "distinct"],
    module: "m04"
  },
  {
    id: "having",
    nom: "HAVING",
    type: "mot-clé",
    categorie: "Agrégats",
    definition: "Filtre les groupes après le GROUP BY, sur le résultat d'un calcul (total, nombre).",
    moteurs: {
      sqlserver: "`GROUP BY … HAVING SUM(col) > 2000` ; pas d'alias : répète le calcul",
      snowflake: "Même écriture ; l'alias est accepté : `HAVING ca > 2000`",
      mysql: "Même écriture ; l'alias est accepté : `HAVING ca > 2000`"
    },
    noms: [],
    exemple: "SELECT client_id, COUNT(*) AS nb_cdes, SUM(montant_ht) AS ca\nFROM commande\nWHERE statut <> 'ANNULEE'\nGROUP BY client_id\nHAVING SUM(montant_ht) > 2000\nORDER BY client_id;",
    resultat: [["client_id", "nb_cdes", "ca"], [1, 3, "15115.00"], [2, 2, "2580.00"]],
    piege: "`WHERE montant_ht > 2000` garde les grosses commandes, pas les gros clients : Piscines Dumont (2 commandes de 1290.00, soit 2580.00) disparaît. Une condition sur un total va dans le `HAVING` ; un agrégat dans le `WHERE` plante.",
    motsCles: ["filtrer", "groupe", "total", "condition", "après", "agrégat", "doublons", "having", "seuil", "supérieur", "plus de", "au moins", "filtre", "regroupement", "trouver les doublons"],
    voirAussi: ["group-by", "where", "count", "sum"],
    module: "m04"
  },
  {
    id: "rollup",
    nom: "ROLLUP",
    type: "mot-clé",
    categorie: "Agrégats",
    definition: "Ajoute au GROUP BY des lignes de sous-total et une ligne de total général.",
    moteurs: {
      sqlserver: "`GROUP BY ROLLUP (a, b)` : sous-totaux par a, puis total général ; aussi `CUBE (a, b)` et `GROUPING SETS ((a), (b))`",
      snowflake: "Même écriture : `ROLLUP`, `CUBE`, `GROUPING SETS`, et `GROUPING(col)`",
      mysql: "Pas de `ROLLUP (…)` : `GROUP BY a, b WITH ROLLUP` ; pas de CUBE ni de GROUPING SETS ; `GROUPING(col)` existe"
    },
    noms: ["CUBE", "GROUPING SETS", "GROUPING", "WITH ROLLUP", "GROUPING_ID"],
    exemple: "SELECT canal, SUM(montant_ht) AS total_ht,\n       GROUPING(canal) AS est_total\nFROM commande\nWHERE statut <> 'ANNULEE'\nGROUP BY ROLLUP (canal)\nORDER BY est_total, canal;",
    exemples: {
      mysql: "SELECT canal, SUM(montant_ht) AS total_ht,\n       GROUPING(canal) AS est_total\nFROM commande\nWHERE statut <> 'ANNULEE'\nGROUP BY canal WITH ROLLUP\nORDER BY est_total, canal;"
    },
    resultat: [["canal", "total_ht", "est_total"], ["EDI", "15115.00", 0], ["TEL", "1687.80", 0], ["WEB", "1290.00", 0], [null, "18092.80", 1]],
    piege: "Sur la ligne de total, `canal` vaut NULL, comme un vrai canal vide : un rapport qui remplace les NULL mélange les deux. Teste `GROUPING(canal) = 1` pour écrire « Total » : `CASE WHEN GROUPING(canal) = 1 THEN 'Total' ELSE canal END`.",
    motsCles: ["sous-total", "sous-totaux", "total général", "totaux", "rollup", "cube", "grouping", "synthèse", "récapitulatif", "rapport", "tableau croisé", "hiérarchie", "niveaux", "grand total"],
    voirAussi: ["group-by", "sum", "case", "coalesce"],
    module: "m04"
  },
  {
    id: "string-agg",
    nom: "STRING_AGG",
    type: "fonction",
    categorie: "Agrégats",
    definition: "Colle les valeurs de plusieurs lignes dans un seul texte, avec un séparateur.",
    moteurs: {
      sqlserver: "`STRING_AGG(col, ', ') WITHIN GROUP (ORDER BY col)` (2017+) ; liste longue : `STRING_AGG(CAST(col AS varchar(max)), ', ')`",
      snowflake: "`LISTAGG(col, ', ') WITHIN GROUP (ORDER BY col)` ; sans séparateur, les valeurs sont collées",
      mysql: "`GROUP_CONCAT(col ORDER BY col SEPARATOR ', ')` ; séparateur par défaut : la virgule seule"
    },
    noms: ["LISTAGG", "GROUP_CONCAT", "WITHIN GROUP"],
    exemple: "SELECT client_id,\n       STRING_AGG(num_cde, ', ') WITHIN GROUP (ORDER BY num_cde) AS commandes\nFROM commande\nGROUP BY client_id\nORDER BY client_id;",
    exemples: {
      snowflake: "SELECT client_id,\n       LISTAGG(num_cde, ', ') WITHIN GROUP (ORDER BY num_cde) AS commandes\nFROM commande\nGROUP BY client_id\nORDER BY client_id;",
      mysql: "SELECT client_id,\n       GROUP_CONCAT(num_cde ORDER BY num_cde SEPARATOR ', ') AS commandes\nFROM commande\nGROUP BY client_id\nORDER BY client_id;"
    },
    resultat: [["client_id", "commandes"], [1, "CDE-1001, CDE-1003, CDE-1007"], [2, "CDE-1002, CDE-1006"], [3, "CDE-1004"], [4, "CDE-1005"], [6, "CDE-1008"]],
    piege: "Sans `WITHIN GROUP (ORDER BY …)`, l'ordre de la liste peut changer d'une exécution à l'autre : un fichier ou un contrôle qui compare ces textes se met à varier. Et MySQL coupe `GROUP_CONCAT` à 1024 caractères par défaut, avec un simple avertissement : monte `group_concat_max_len`.",
    motsCles: ["concaténer", "liste", "virgule", "séparateur", "coller", "assembler", "regrouper", "texte", "listagg", "group_concat", "plusieurs lignes", "une seule ligne", "csv", "agréger", "chaîne"],
    voirAussi: ["group-by", "string-split", "concat", "concat-ws"],
    module: "m04"
  }
]);
