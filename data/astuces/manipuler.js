// Astuces SQL, famille « Manipuler » (docs/astuces.md). Chaque résultat est vérifié sur docs/base-exemple.sql.
LEARNSQL.astuces = (LEARNSQL.astuces || []).concat([
  {
    id: "liste-dans-une-case",
    titre: "Mettre les valeurs de plusieurs lignes dans une seule case",
    famille: "Manipuler",
    besoins: ["mettre les numéros de commande d'un client dans une seule case, séparés par des virgules", "concaténer les valeurs de plusieurs lignes en une liste", "une ligne par client avec la liste de ses commandes", "les codes articles de chaque commande sur une seule ligne"],
    essais: ["liste des commandes sur une seule ligne avec des virgules", "concatener plusieurs lignes dans une colonne", "group_concat", "listagg"],
    moteurs: {
      sqlserver: "`STRING_AGG(num_cde, ', ') WITHIN GROUP (ORDER BY num_cde)` (2017+) ; pas de `DISTINCT` dedans",
      snowflake: "`LISTAGG(num_cde, ', ') WITHIN GROUP (ORDER BY num_cde)` ; `LISTAGG(DISTINCT …)` est accepté",
      mysql: "`GROUP_CONCAT(num_cde ORDER BY num_cde SEPARATOR ', ')` ; coupé à 1 024 octets par défaut (`group_concat_max_len`)"
    },
    exemple: "SELECT cl.code, cl.nom,\n       STRING_AGG(co.num_cde, ', ') WITHIN GROUP (ORDER BY co.num_cde) AS commandes\nFROM client AS cl\nJOIN commande AS co ON co.client_id = cl.id\nWHERE co.statut <> 'ANNULEE'\nGROUP BY cl.code, cl.nom\nORDER BY cl.code;",
    exemples: {
      snowflake: "SELECT cl.code, cl.nom,\n       LISTAGG(co.num_cde, ', ') WITHIN GROUP (ORDER BY co.num_cde) AS commandes\nFROM client AS cl\nJOIN commande AS co ON co.client_id = cl.id\nWHERE co.statut <> 'ANNULEE'\nGROUP BY cl.code, cl.nom\nORDER BY cl.code;",
      mysql: "SELECT cl.code, cl.nom,\n       GROUP_CONCAT(co.num_cde ORDER BY co.num_cde SEPARATOR ', ') AS commandes\nFROM client AS cl\nJOIN commande AS co ON co.client_id = cl.id\nWHERE co.statut <> 'ANNULEE'\nGROUP BY cl.code, cl.nom\nORDER BY cl.code;"
    },
    resultat: [["code", "nom", "commandes"], ["C001", "AquaBleu", "CDE-1001, CDE-1003, CDE-1007"], ["C002", "Piscines Dumont", "CDE-1002, CDE-1006"], ["C004", "Hydro Sud", "CDE-1005"], ["C006", "Piscines Dumont", "CDE-1008"]],
    piege: "Sans `ORDER BY` dans la fonction, l'ordre de la liste peut changer d'une exécution à l'autre : un fichier comparé chaque jour montre de faux écarts. Et SQL Server s'arrête en erreur au-delà de 8 000 octets : écris `STRING_AGG(CAST(num_cde AS varchar(max)), ', ')`.",
    pratique: "Pour un export CSV ou Excel, choisis un séparateur absent des valeurs, comme « | » : une virgule dans un libellé fausse le découpage à la relecture.",
    motsCles: ["liste", "concaténer", "regrouper", "virgule", "séparateur", "une seule ligne", "cellule", "string_agg", "listagg", "group_concat"],
    voirAussi: ["string-agg", "group-by", "concat"]
  },
  {
    id: "liste-en-lignes",
    titre: "Découper une liste en lignes",
    famille: "Manipuler",
    besoins: ["découper un texte « C001;C002;C003 » en une ligne par code", "transformer une liste séparée par des points-virgules en lignes", "une ligne par valeur à partir d'une seule case", "faire un split de texte en lignes"],
    essais: ["split d une chaine en plusieurs lignes", "eclater une liste de codes", "string_split", "couper une chaine a chaque point virgule"],
    moteurs: {
      sqlserver: "`SELECT value FROM STRING_SPLIT(liste, ';')` (2016+) ; séparateur d'un seul caractère ; le rang du morceau : 3e argument `1`, colonne `ordinal` (2022+)",
      snowflake: "`SELECT value FROM TABLE(SPLIT_TO_TABLE(liste, ';'))` ; le rang du morceau : colonne `index`",
      mysql: "Pas de fonction pour ça : `JSON_TABLE` sur la liste changée en tableau JSON (voir l'exemple)"
    },
    exemple: "-- Une liste de codes collée depuis Excel (ou reçue en paramètre)\nSELECT a.code, a.libelle, a.stock\nFROM STRING_SPLIT('CHL-5;PH-5;ROB-X', ';') AS s\nJOIN article AS a ON a.code = TRIM(s.value)\nORDER BY a.code;",
    exemples: {
      snowflake: "SELECT a.code, a.libelle, a.stock\nFROM TABLE(SPLIT_TO_TABLE('CHL-5;PH-5;ROB-X', ';')) AS s\nJOIN article AS a ON a.code = TRIM(s.value)\nORDER BY a.code;",
      mysql: "SELECT a.code, a.libelle, a.stock\nFROM JSON_TABLE(CONCAT('[\"', REPLACE('CHL-5;PH-5;ROB-X', ';', '\",\"'), '\"]'),\n                '$[*]' COLUMNS (v VARCHAR(20) PATH '$')) AS s\nJOIN article AS a ON a.code = TRIM(s.v)\nORDER BY a.code;"
    },
    resultat: [["code", "libelle", "stock"], ["CHL-5", "Chlore lent 5 kg", 120], ["PH-5", "pH moins 5 kg", 80], ["ROB-X", "Robot électrique X", 5]],
    piege: "SQL Server ne garantit pas l'ordre des morceaux : pour « le 2e code de la liste », demande le rang (`ordinal`, 2022+). Et un espace après le séparateur ('C001; C002') fait rater la jointure : `TRIM` sur chaque morceau.",
    pratique: "Deux séparateurs collés (« ;; ») donnent un morceau vide, à filtrer. Pour découper la colonne d'une table : `CROSS APPLY STRING_SPLIT(t.liste, ';')` sur SQL Server, `, LATERAL SPLIT_TO_TABLE(t.liste, ';')` sur Snowflake.",
    motsCles: ["découper", "séparer", "split", "liste", "point-virgule", "éclater", "en lignes", "chaîne", "plusieurs lignes", "paramètre"],
    voirAussi: ["string-split", "trim", "cross-apply", "in"]
  },
  {
    id: "lignes-en-colonnes",
    titre: "Mettre des lignes en colonnes (pivot)",
    famille: "Manipuler",
    besoins: ["afficher le stock de chaque dépôt dans sa propre colonne", "transformer des lignes en colonnes", "faire un tableau croisé comme dans Excel", "une colonne par mois"],
    essais: ["pivot", "une colonne par depot", "tableau croise dynamique en sql", "passer les mois en colonnes"],
    moteurs: {
      sqlserver: "`SUM(CASE WHEN depot_id = 1 THEN qte ELSE 0 END) AS lyon`, une colonne par valeur ; ou `PIVOT (SUM(qte) FOR depot_id IN ([1], [2], [3]))`",
      snowflake: "Même `SUM(CASE …)` ; ou `PIVOT (SUM(qte) FOR depot_id IN (ANY ORDER BY depot_id))` : la liste des valeurs se fait seule",
      mysql: "Pas de PIVOT : `SUM(CASE WHEN depot_id = 1 THEN qte ELSE 0 END) AS lyon`, une colonne par valeur"
    },
    exemple: "SELECT a.code,\n       SUM(CASE WHEN s.depot_id = 1 THEN s.qte ELSE 0 END) AS lyon,\n       SUM(CASE WHEN s.depot_id = 2 THEN s.qte ELSE 0 END) AS toulouse,\n       SUM(CASE WHEN s.depot_id = 3 THEN s.qte ELSE 0 END) AS nantes\nFROM article AS a\nLEFT JOIN stock_depot AS s ON s.article_id = a.id\nWHERE a.famille IN ('CHIMIE', 'FILTRATION')\nGROUP BY a.code\nORDER BY a.code;",
    resultat: [["code", "lyon", "toulouse", "nantes"], ["CHL-25", 25, 15, 0], ["CHL-5", 60, 40, 20], ["FIL-14", 8, 4, 0], ["PH-5", 50, 0, 30], ["POMP-1", 0, 0, 0]],
    piege: "La liste des colonnes est écrite en dur : un 4e dépôt créé demain n'apparaît nulle part, sans erreur. Et avec un `JOIN` simple, POMP-1 (aucun stock) disparaît : le `LEFT JOIN` la garde, à 0.",
    pratique: "Pour Excel ou Power BI, laisse plutôt l'outil pivoter (tableau croisé, matrice) : ses colonnes suivent les données. Garde le pivot SQL pour un format figé, comme un fichier pour un partenaire.",
    motsCles: ["pivot", "lignes en colonnes", "colonnes", "tableau croisé", "transposer", "croiser", "matrice", "une colonne par", "sum case", "dépôt"],
    voirAussi: ["case", "sum", "group-by", "left-join"]
  },
  {
    id: "colonnes-en-lignes",
    titre: "Mettre des colonnes en lignes (unpivot)",
    famille: "Manipuler",
    besoins: ["transformer des colonnes en lignes", "transformer les colonnes de mois d'un fichier Excel en lignes", "une ligne par dépôt au lieu d'une colonne par dépôt", "dépivoter un tableau"],
    essais: ["unpivot", "passer des colonnes en lignes", "depivoter les colonnes janvier fevrier mars", "remettre un tableau croise a plat"],
    moteurs: {
      sqlserver: "`CROSS APPLY (VALUES ('Lyon', lyon), ('Toulouse', toulouse)) AS v (depot, qte)` ; ou `UNPIVOT`, qui saute les NULL",
      snowflake: "`UNPIVOT INCLUDE NULLS (qte FOR depot IN (lyon, toulouse, nantes))` ; sans `INCLUDE NULLS`, les NULL sautent",
      mysql: "Pas d'UNPIVOT : un `SELECT` par colonne, reliés par `UNION ALL`"
    },
    exemple: "-- p : un fichier reçu avec une colonne par dépôt (fabriqué ici depuis stock_depot)\nWITH p AS (\n  SELECT article_id,\n         SUM(CASE WHEN depot_id = 1 THEN qte END) AS lyon,\n         SUM(CASE WHEN depot_id = 2 THEN qte END) AS toulouse,\n         SUM(CASE WHEN depot_id = 3 THEN qte END) AS nantes\n  FROM stock_depot\n  GROUP BY article_id\n)\nSELECT p.article_id, v.depot, v.qte\nFROM p\nCROSS APPLY (VALUES ('Lyon', p.lyon), ('Toulouse', p.toulouse),\n                    ('Nantes', p.nantes)) AS v (depot, qte)\nWHERE p.article_id = 3\nORDER BY v.depot;",
    exemples: {
      snowflake: "WITH p AS (\n  SELECT article_id,\n         SUM(CASE WHEN depot_id = 1 THEN qte END) AS lyon,\n         SUM(CASE WHEN depot_id = 2 THEN qte END) AS toulouse,\n         SUM(CASE WHEN depot_id = 3 THEN qte END) AS nantes\n  FROM stock_depot\n  GROUP BY article_id\n)\nSELECT article_id, depot, qte\nFROM p\n  UNPIVOT INCLUDE NULLS (qte FOR depot IN (lyon, toulouse, nantes))\nWHERE article_id = 3\nORDER BY depot;",
      mysql: "WITH p AS (\n  SELECT article_id,\n         SUM(CASE WHEN depot_id = 1 THEN qte END) AS lyon,\n         SUM(CASE WHEN depot_id = 2 THEN qte END) AS toulouse,\n         SUM(CASE WHEN depot_id = 3 THEN qte END) AS nantes\n  FROM stock_depot\n  GROUP BY article_id\n)\nSELECT article_id, 'Lyon' AS depot, lyon AS qte FROM p WHERE article_id = 3\nUNION ALL\nSELECT article_id, 'Toulouse', toulouse FROM p WHERE article_id = 3\nUNION ALL\nSELECT article_id, 'Nantes', nantes FROM p WHERE article_id = 3\nORDER BY depot;"
    },
    resultat: [["article_id", "depot", "qte"], [3, "Lyon", 50], [3, "Nantes", 30], [3, "Toulouse", null]],
    piege: "`UNPIVOT` saute les cases vides : Toulouse disparaît, sans erreur, et un contrôle « 3 dépôts par article » échoue. `CROSS APPLY (VALUES …)` les garde ; sur Snowflake, `INCLUDE NULLS`, et le nom sort en majuscules (TOULOUSE).",
    pratique: "Une ligne par mois se filtre, se trie et se cumule ; douze colonnes de mois, non. Dépivote un fichier Excel avant de le charger dans l'entrepôt ou dans Power BI.",
    motsCles: ["unpivot", "dépivoter", "colonnes en lignes", "mettre à plat", "transposer", "mois", "excel", "cross apply", "values", "union all"],
    voirAussi: ["cross-apply", "union-all", "case"]
  },
  {
    id: "numeroter-les-lignes",
    titre: "Numéroter les lignes (1, 2, 3…)",
    famille: "Manipuler",
    besoins: ["numéroter les lignes de chaque commande", "un numéro de ligne qui repart à 1 pour chaque commande", "ajouter un compteur dans le résultat"],
    essais: ["numero de ligne par commande pour le fichier edi", "rownum", "compteur qui recommence a 1", "row number"],
    moteurs: {
      sqlserver: "`ROW_NUMBER() OVER (PARTITION BY cde_id ORDER BY id)` ; `ORDER BY` obligatoire",
      snowflake: "`ROW_NUMBER() OVER (PARTITION BY cde_id ORDER BY id)` (même écriture)",
      mysql: "`ROW_NUMBER() OVER (PARTITION BY cde_id ORDER BY id)` (MySQL 8.0 et plus)"
    },
    exemple: "SELECT co.num_cde,\n       ROW_NUMBER() OVER (PARTITION BY li.cde_id ORDER BY li.id) AS num_ligne,\n       a.code, li.qte\nFROM ligne_cde AS li\nJOIN commande AS co ON co.id = li.cde_id\nJOIN article AS a ON a.id = li.article_id\nWHERE li.cde_id IN (1, 3)\nORDER BY co.num_cde, num_ligne;",
    resultat: [["num_cde", "num_ligne", "code", "qte"], ["CDE-1001", 1, "CHL-5", 100], ["CDE-1001", 2, "CHL-25", 10], ["CDE-1003", 1, "PH-5", 50], ["CDE-1003", 2, "BACHE8", 10]],
    piege: "Le numéro suit l'`ORDER BY` du `OVER`, pas l'ordre affiché : avec un tri à égalité, il change d'une exécution à l'autre. Termine le tri par une colonne unique, comme l'id.",
    pratique: "Dans un message EDIFACT, le segment LIN porte un numéro de ligne, en général de 1 à n dans chaque commande : `PARTITION BY` la commande, tri sur l'ordre de saisie (l'id de la ligne).",
    motsCles: ["numéroter", "numéro de ligne", "compteur", "row_number", "rownum", "1 2 3", "séquence", "repartir à 1", "par commande", "rang"],
    voirAussi: ["row-number", "over", "rank"]
  },
  {
    id: "top-n-par-groupe",
    titre: "Garder les N premiers de chaque groupe",
    famille: "Manipuler",
    besoins: ["les 2 plus grosses commandes de chaque client", "le top 3 des articles de chaque famille", "garder les N premières lignes par groupe", "les meilleurs clients de chaque région"],
    essais: ["top 3 par client", "les deux meilleures ventes de chaque famille", "limiter a n lignes par categorie", "classement par categorie et garder les premiers"],
    moteurs: {
      sqlserver: "`ROW_NUMBER() OVER (PARTITION BY client_id ORDER BY montant_ht DESC, id DESC) AS rn` dans une CTE, puis `WHERE rn <= 2`",
      snowflake: "En une requête : `QUALIFY ROW_NUMBER() OVER (PARTITION BY client_id ORDER BY montant_ht DESC, id DESC) <= 2`",
      mysql: "Comme SQL Server (8.0 et plus) : CTE, puis `WHERE rn <= 2` ; pas de `QUALIFY`"
    },
    exemple: "WITH r AS (\n  SELECT client_id, num_cde, montant_ht,\n         ROW_NUMBER() OVER (PARTITION BY client_id\n                            ORDER BY montant_ht DESC, id DESC) AS rn\n  FROM commande\n  WHERE client_id IN (1, 2)\n)\nSELECT client_id, num_cde, montant_ht, rn\nFROM r\nWHERE rn <= 2\nORDER BY client_id, rn;",
    exemples: {
      snowflake: "SELECT client_id, num_cde, montant_ht,\n       ROW_NUMBER() OVER (PARTITION BY client_id\n                          ORDER BY montant_ht DESC, id DESC) AS rn\nFROM commande\nWHERE client_id IN (1, 2)\nQUALIFY rn <= 2\nORDER BY client_id, rn;"
    },
    resultat: [["client_id", "num_cde", "montant_ht", "rn"], [1, "CDE-1007", "7950.00", 1], [1, "CDE-1001", "4780.00", 2], [2, "CDE-1006", "1290.00", 1], [2, "CDE-1002", "1290.00", 2]],
    piege: "`TOP (2)` ou `LIMIT 2` gardent 2 lignes en tout, pas 2 par client. Et à égalité (les deux commandes à 1 290 €), ROW_NUMBER tranche au hasard sans départage : ajoute `id DESC`, ou prends `RANK()` pour garder tous les ex aequo.",
    pratique: "Filtre la période et le statut dans la CTE, avant de numéroter : le classement se fait alors sur les seules lignes gardées, comme pour un « top 3 du mois ».",
    motsCles: ["top", "premiers", "meilleurs", "par groupe", "plus gros", "classement", "n premiers", "top n", "row_number", "qualify"],
    voirAussi: ["row-number", "qualify", "rank", "with-cte", "top"]
  },
  {
    id: "garder-la-plus-recente",
    titre: "Dédoublonner en gardant la ligne la plus récente",
    famille: "Manipuler",
    besoins: ["garder seulement le dernier flux reçu de chaque type", "supprimer les doublons d'un import en gardant la ligne la plus récente", "la dernière commande de chaque client"],
    essais: ["dedoublonner un import en gardant le plus recent", "derniere version de chaque enregistrement", "garder la derniere date par cle", "commande recue deux fois ne garder que la derniere"],
    moteurs: {
      sqlserver: "`ROW_NUMBER() OVER (PARTITION BY type ORDER BY date_recu DESC, id DESC) AS rn` dans une CTE, puis `WHERE rn = 1`",
      snowflake: "En une requête : `QUALIFY ROW_NUMBER() OVER (PARTITION BY type ORDER BY date_recu DESC, id DESC) = 1`",
      mysql: "Comme SQL Server : CTE avec `ROW_NUMBER()` (8.0 et plus), puis `WHERE rn = 1`"
    },
    exemple: "WITH r AS (\n  SELECT type, id, date_recu, statut,\n         ROW_NUMBER() OVER (PARTITION BY type\n                            ORDER BY date_recu DESC, id DESC) AS rn\n  FROM flux_edi\n)\nSELECT type, id, date_recu, statut\nFROM r\nWHERE rn = 1\nORDER BY type;",
    exemples: {
      snowflake: "SELECT type, id, date_recu, statut\nFROM flux_edi\nQUALIFY ROW_NUMBER() OVER (PARTITION BY type\n                           ORDER BY date_recu DESC, id DESC) = 1\nORDER BY type;"
    },
    resultat: [["type", "id", "date_recu", "statut"], ["DESADV", 6, "2026-04-08 17:30:00", "REJET"], ["INVOIC", 4, "2026-03-03 18:00:00", "OK"], ["ORDERS", 5, "2026-04-07 06:08:00", "OK"]],
    piege: "`DISTINCT` ne retire que des lignes identiques en tout : deux versions d'un flux, reçues à des heures différentes, restent deux lignes. Et `MAX(date_recu)` donne la date sans le reste de la ligne : il faut ROW_NUMBER.",
    pratique: "Après le SELECT, supprime les anciennes versions. SQL Server : `WITH d AS (…) DELETE FROM d WHERE rn > 1`. Snowflake réécrit la table : `INSERT OVERWRITE INTO t SELECT * FROM t QUALIFY … = 1`.",
    motsCles: ["dédoublonner", "doublons", "plus récent", "dernier", "dernière version", "garder une ligne", "supprimer les doublons", "par clé", "row_number", "qualify"],
    voirAussi: ["row-number", "qualify", "with-cte", "distinct", "delete"]
  },
  {
    id: "total-cumule",
    titre: "Faire un total cumulé",
    famille: "Manipuler",
    besoins: ["calculer le chiffre d'affaires cumulé facture après facture", "un cumul des montants ligne par ligne", "un solde progressif"],
    essais: ["running total", "somme cumulee des factures", "cumul depuis le debut de l annee", "cumul progressif des ventes"],
    moteurs: {
      sqlserver: "`SUM(montant_ht) OVER (ORDER BY date_fact, id ROWS UNBOUNDED PRECEDING)`",
      snowflake: "`SUM(montant_ht) OVER (ORDER BY date_fact, id ROWS UNBOUNDED PRECEDING)` (même écriture)",
      mysql: "`SUM(montant_ht) OVER (ORDER BY date_fact, id ROWS UNBOUNDED PRECEDING)` (MySQL 8.0 et plus)"
    },
    exemple: "SELECT num_fact, date_fact, montant_ht,\n       SUM(montant_ht) OVER (ORDER BY date_fact, id\n                             ROWS UNBOUNDED PRECEDING) AS cumul\nFROM facture\nORDER BY date_fact, id;",
    resultat: [["num_fact", "date_fact", "montant_ht", "cumul"], ["FA-2026-0301", "2026-03-03", "4780.00", "4780.00"], ["FA-2026-0302", "2026-03-06", "1290.00", "6070.00"], ["FA-2026-0303", "2026-03-10", "2385.00", "8455.00"], ["FA-2026-0401", "2026-04-11", "79.80", "8534.80"]],
    piege: "Sans `ROWS`, le cadre par défaut (`RANGE`) donne le même cumul à deux factures du même jour, additionnées d'un coup. Écris `ROWS UNBOUNDED PRECEDING`, avec un tri unique : la date, puis l'id.",
    pratique: "Pour un cumul qui repart à zéro chaque année (le CA depuis le 1er janvier), ajoute `PARTITION BY YEAR(date_fact)` dans le `OVER`. Pour un cumul par client : `PARTITION BY client_id`.",
    motsCles: ["cumul", "cumulé", "total cumulé", "progressif", "running total", "solde", "somme", "au fil de l'eau", "sum over", "depuis le début"],
    voirAussi: ["cumul", "over", "cadre-rows", "sum"]
  },
  {
    id: "ligne-precedente",
    titre: "Comparer une ligne à la précédente",
    famille: "Manipuler",
    besoins: ["comparer chaque ligne avec la ligne d'avant", "calculer l'écart avec la valeur précédente", "le nombre de jours depuis le flux précédent"],
    essais: ["difference avec la ligne d avant", "lag", "evolution par rapport au mois precedent", "valeur de la ligne suivante"],
    moteurs: {
      sqlserver: "`LAG(date_recu) OVER (PARTITION BY partenaire ORDER BY date_recu)` ; la ligne d'après : `LEAD`",
      snowflake: "`LAG(…) OVER (…)` et `LEAD`, même écriture",
      mysql: "`LAG(…) OVER (…)` et `LEAD`, même écriture (MySQL 8.0 et plus)"
    },
    exemple: "SELECT id, date_recu,\n       LAG(date_recu) OVER (PARTITION BY partenaire ORDER BY date_recu) AS flux_avant,\n       DATEDIFF(day,\n                LAG(date_recu) OVER (PARTITION BY partenaire ORDER BY date_recu),\n                date_recu) AS jours\nFROM flux_edi\nWHERE type = 'ORDERS'\nORDER BY date_recu;",
    exemples: {
      mysql: "SELECT id, date_recu,\n       LAG(date_recu) OVER (PARTITION BY partenaire ORDER BY date_recu) AS flux_avant,\n       DATEDIFF(date_recu,\n                LAG(date_recu) OVER (PARTITION BY partenaire ORDER BY date_recu)) AS jours\nFROM flux_edi\nWHERE type = 'ORDERS'\nORDER BY date_recu;"
    },
    resultat: [["id", "date_recu", "flux_avant", "jours"], [1, "2026-03-02 06:10:00", null, null], [2, "2026-03-09 06:12:00", "2026-03-02 06:10:00", 7], [3, "2026-03-16 06:05:00", "2026-03-09 06:12:00", 7], [5, "2026-04-07 06:08:00", "2026-03-16 06:05:00", 22]],
    piege: "LAG compte des lignes, pas des mois : un mois sans vente n'a pas de ligne, et « le mois d'avant » devient celui d'il y a deux mois (pars d'un calendrier complet). Et la 1re ligne n'a pas de précédente : NULL, à prévoir dans les calculs.",
    pratique: "Pour surveiller un flux EDI régulier, compare l'écart au rythme habituel : ici une commande par semaine, puis 22 jours de silence. Une alerte sur `jours > 10` signale un flux bloqué ou un client perdu.",
    motsCles: ["précédent", "ligne d'avant", "lag", "lead", "suivant", "se suivent", "écart", "évolution", "variation", "comparer", "délai", "mois précédent"],
    voirAussi: ["lag-lead", "datediff", "over"]
  },
  {
    id: "part-du-total",
    titre: "Calculer la part de chaque ligne dans le total (%)",
    famille: "Manipuler",
    besoins: ["calculer le pourcentage de chaque famille dans le total", "la part de chaque client dans le chiffre d'affaires", "afficher un pourcentage du total sur chaque ligne"],
    essais: ["pourcentage par rapport au total", "poids de chaque famille en %", "repartition en pourcentage", "ratio sur le total general"],
    moteurs: {
      sqlserver: "`100.0 * SUM(x) / SUM(SUM(x)) OVER ()` avec un `GROUP BY` ; sans groupe : `100.0 * x / SUM(x) OVER ()`",
      snowflake: "Même écriture ; ou `RATIO_TO_REPORT(x) OVER ()`, qui rend une part entre 0 et 1",
      mysql: "Même écriture (MySQL 8.0 et plus)"
    },
    exemple: "-- Valeur du stock au prix tarif, par famille\nSELECT famille,\n       SUM(prix_tarif * stock) AS valeur,\n       CAST(100.0 * SUM(prix_tarif * stock) / SUM(SUM(prix_tarif * stock)) OVER ()\n            AS decimal(5,2)) AS part_pct\nFROM article\nGROUP BY famille\nORDER BY valeur DESC;",
    resultat: [["famille", "valeur", "part_pct"], ["CHIMIE", "13108.00", "40.51"], ["FILTRATION", "6588.00", "20.36"], ["ROBOT", "6450.00", "19.93"], ["ACCESSOIRE", "6215.00", "19.21"]],
    piege: "Arrondis, les pourcentages ne font pas toujours 100 : ici, 40,51 + 20,36 + 19,93 + 19,21 = 100,01, et ce n'est pas une erreur. Et sur SQL Server, écris `100.0 *` : avec des entiers, la division coupe les décimales.",
    pratique: "Dans Power BI, importe les montants, pas le pourcentage tout fait : une part calculée en SQL ne bouge plus quand tu filtres le rapport. Une mesure, elle, se recalcule.",
    motsCles: ["pourcentage", "part", "%", "total", "ratio", "poids", "répartition", "proportion", "sum over", "ratio_to_report"],
    voirAussi: ["over", "sum", "group-by", "round"]
  },
  {
    id: "ligne-de-total",
    titre: "Ajouter une ligne de total en bas du résultat",
    famille: "Manipuler",
    besoins: ["ajouter une ligne Total à la fin d'un export", "afficher les sous-totaux et le total général", "un total en bas du tableau, comme dans Excel"],
    essais: ["ligne total general en bas", "rollup", "sous total par statut", "with rollup"],
    moteurs: {
      sqlserver: "`GROUP BY ROLLUP (statut)` ; la ligne de total : `GROUPING(statut) = 1`",
      snowflake: "`GROUP BY ROLLUP (statut)` (même écriture) ; la ligne de total : `GROUPING(statut) = 1`",
      mysql: "`GROUP BY statut WITH ROLLUP` ; la ligne de total : `GROUPING(statut) = 1`"
    },
    exemple: "SELECT CASE WHEN GROUPING(statut) = 1 THEN 'Total' ELSE statut END AS ligne,\n       COUNT(*) AS nb, SUM(montant_ht) AS montant\nFROM commande\nGROUP BY ROLLUP (statut)\nORDER BY GROUPING(statut), statut;",
    exemples: {
      mysql: "SELECT CASE WHEN GROUPING(statut) = 1 THEN 'Total' ELSE statut END AS ligne,\n       COUNT(*) AS nb, SUM(montant_ht) AS montant\nFROM commande\nGROUP BY statut WITH ROLLUP\nORDER BY GROUPING(statut), statut;"
    },
    resultat: [["ligne", "nb", "montant"], ["ANNULEE", 1, "549.00"], ["EN_COURS", 3, "9558.00"], ["LIVREE", 4, "8534.80"], ["Total", 8, "18641.80"]],
    piege: "Sur la ligne de total, la colonne groupée vaut NULL : `COALESCE(statut, 'Total')` renommerait aussi un vrai statut vide. Repère la ligne de total avec `GROUPING(statut) = 1`.",
    pratique: "N'envoie pas la ligne de total dans Power BI ou dans un tableau croisé Excel : l'outil calcule ses propres totaux, et ce montant serait compté deux fois. Garde ROLLUP pour un export figé.",
    motsCles: ["total", "total général", "sous-total", "rollup", "ligne de total", "en bas", "grouping", "récapitulatif", "with rollup", "somme finale"],
    voirAussi: ["rollup", "group-by", "case", "sum"]
  },
  {
    id: "lire-un-json",
    titre: "Lire un champ dans un JSON",
    famille: "Manipuler",
    besoins: ["lire le numéro de commande dans un message JSON", "extraire une valeur d'un JSON en SQL", "récupérer le code client dans un JSON reçu d'une API"],
    essais: ["json_value", "extraire un champ json", "lire la reponse json d une api", "parser du json"],
    moteurs: {
      sqlserver: "`JSON_VALUE(doc, '$.client.code')` (2016+) : rend un texte ; un tableau : `CROSS APPLY OPENJSON`",
      snowflake: "`doc:client.code::STRING` sur un VARIANT ; depuis un texte : `PARSE_JSON(texte):client.code::STRING`",
      mysql: "`JSON_VALUE(doc, '$.client.code')` (8.0.21+) ; ou `doc ->> '$.client.code'` sur une colonne JSON"
    },
    exemple: "-- Deux messages reçus en JSON (du texte), lus comme une table\nWITH m AS (\n  SELECT '{\"num_cde\":\"CDE-1002\",\"client\":{\"code\":\"C002\"},\"lignes\":[{\"art\":\"ROB-X\",\"qte\":1}]}' AS doc\n  UNION ALL\n  SELECT '{\"num_cde\":\"CDE-1007\",\"client\":{\"code\":\"C001\"},\"lignes\":[{\"art\":\"CHL-5\",\"qte\":150},{\"art\":\"FIL-14\",\"qte\":5}]}'\n)\nSELECT JSON_VALUE(doc, '$.num_cde')       AS num_cde,\n       JSON_VALUE(doc, '$.client.code')   AS client,\n       JSON_VALUE(doc, '$.lignes[0].art') AS article_1\nFROM m\nORDER BY num_cde;",
    exemples: {
      snowflake: "WITH m AS (\n  SELECT PARSE_JSON('{\"num_cde\":\"CDE-1002\",\"client\":{\"code\":\"C002\"},\"lignes\":[{\"art\":\"ROB-X\",\"qte\":1}]}') AS doc\n  UNION ALL\n  SELECT PARSE_JSON('{\"num_cde\":\"CDE-1007\",\"client\":{\"code\":\"C001\"},\"lignes\":[{\"art\":\"CHL-5\",\"qte\":150},{\"art\":\"FIL-14\",\"qte\":5}]}')\n)\nSELECT doc:num_cde::STRING       AS num_cde,\n       doc:client.code::STRING   AS client,\n       doc:lignes[0].art::STRING AS article_1\nFROM m\nORDER BY num_cde;"
    },
    resultat: [["num_cde", "client", "article_1"], ["CDE-1002", "C002", "ROB-X"], ["CDE-1007", "C001", "CHL-5"]],
    piege: "Une clé mal écrite (`$.Client.code`, avec une majuscule) ne trouve rien et rend NULL, sans erreur : les clés comptent la casse. Sur SQL Server, `'strict $.client.code'` donne une erreur à la place.",
    pratique: "Un tableau JSON (les lignes d'une commande) se lit avec une ligne SQL par élément : `CROSS APPLY OPENJSON` sur SQL Server, `LATERAL FLATTEN` sur Snowflake, `JSON_TABLE` sur MySQL.",
    motsCles: ["json", "extraire", "champ", "clé", "api", "message", "json_value", "variant", "parse_json", "lire", "chemin"],
    voirAussi: ["variant", "flatten", "cross-apply"]
  }
]);
