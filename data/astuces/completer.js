// Astuces SQL, famille « Compléter » (docs/astuces.md). Chaque résultat est vérifié sur docs/base-exemple.sql.
// Sources (lues le 13/11/2026) :
// - SQL Server, learn.microsoft.com/sql/t-sql/functions : space, replicate (coupe à 8 000 octets hors MAX, négatif =
//   NULL), datalength, len (espaces de fin non comptés), cast-and-convert (vers char : coupé), lag (IGNORE NULLS 2022+),
//   generate-series (2022, niveau 160), coalesce, nullif, trim (2017+), avg (decimal(38, 6)).
// - Snowflake, docs.snowflake.com/en/sql-reference : functions/rpad (espace par défaut, coupe si trop long),
//   data-types-text (CHAR sans espaces ajoutés), functions/lag (IGNORE NULLS), functions/generator et seq1 (ROW_NUMBER
//   pour une suite sans trou), functions/repeat, functions/space, functions/zeroifnull, functions/nvl.
// - MySQL 8.4, dev.mysql.com/doc/refman/8.4/en : string-functions (RPAD, REPEAT, SPACE, LPAD), char (espaces de fin
//   d'un CHAR retirés à la lecture), window-function-descriptions (IGNORE NULLS : erreur), with (WITH RECURSIVE,
//   cte_max_recursion_depth = 1000).
LEARNSQL.astuces = (LEARNSQL.astuces || []).concat([
  {
    id: "zeros-devant",
    titre: "Compléter un numéro avec des zéros devant",
    famille: "Compléter",
    besoins: ["sortir un numéro client avec des zéros devant", "un numéro de facture sur 8 chiffres avec des zéros à gauche", "transformer 42 en 000042", "l'attribut ZEROFILL"],
    essais: ["je voudrais un numero de facture sur 8 caractere avec des 0", "remplir à gauche avec des zéros", "zerofill"],
    moteurs: {
      sqlserver: "`RIGHT('000000' + CAST(id AS VARCHAR(10)), 6)`, ou `FORMAT(id, 'D6')` (plus lent sur beaucoup de lignes)",
      snowflake: "`LPAD(id::VARCHAR, 6, '0')`",
      mysql: "`LPAD(id, 6, '0')` ; l'attribut `ZEROFILL` est obsolète depuis MySQL 8.0.17"
    },
    exemple: "SELECT num_cde,\n       RIGHT('000000' + CAST(id AS VARCHAR(10)), 6) AS num_6\nFROM commande\nWHERE id <= 3\nORDER BY id;",
    exemples: {
      snowflake: "SELECT num_cde, LPAD(id::VARCHAR, 6, '0') AS num_6\nFROM commande\nWHERE id <= 3\nORDER BY id;",
      mysql: "SELECT num_cde, LPAD(id, 6, '0') AS num_6\nFROM commande\nWHERE id <= 3\nORDER BY id;"
    },
    resultat: [["num_cde", "num_6"], ["CDE-1001", "000001"], ["CDE-1002", "000002"], ["CDE-1003", "000003"]],
    piege: "Un nombre plus long que la largeur est coupé, sans erreur : `RIGHT` garde la fin du nombre, `LPAD` en garde le début. Choisis une largeur assez grande, et contrôle la longueur.",
    pratique: "Garde le numéro en nombre dans la table, et ajoute les zéros seulement à l'affichage ou à l'export (fichier EDI, étiquette) : un nombre se trie et se compare bien.",
    motsCles: ["zéro", "ajouter", "0", "compléter", "gauche", "devant", "remplir", "code", "longueur fixe", "numéro", "chiffres", "caractères"],
    voirAussi: ["lpad", "right", "format", "cast", "zerofill"]
  },
  {
    id: "espaces-a-droite",
    titre: "Compléter un texte avec des espaces à droite",
    famille: "Compléter",
    besoins: ["compléter un nom avec des espaces jusqu'à 20 caractères", "une zone de texte à largeur fixe pour un fichier plat", "aligner un libellé à gauche sur une longueur fixe", "la fonction RPAD"],
    essais: ["comment faire un rpad en t-sql", "fichier positionnel : texte cale a gauche sur 35 caracteres", "remplir avec des blancs a droite"],
    moteurs: {
      sqlserver: "`LEFT(nom + SPACE(20), 20)`, ou `CAST(nom AS CHAR(20))` ; les deux coupent un texte trop long",
      snowflake: "`RPAD(nom, 20, ' ')` ; `CAST(nom AS CHAR(20))` n'ajoute aucun espace sur Snowflake",
      mysql: "`RPAD(nom, 20, ' ')` ; une colonne `CHAR` perd ses espaces de fin quand on la lit"
    },
    exemple: "-- Le nom sur 20 caractères, pour un fichier à largeur fixe\n-- DATALENGTH : LEN ne compte pas les espaces de fin\nSELECT code,\n       LEFT(nom + SPACE(20), 20) AS nom_20,\n       DATALENGTH(LEFT(nom + SPACE(20), 20)) AS longueur\nFROM client\nWHERE id IN (1, 4, 7)\nORDER BY id;",
    exemples: {
      snowflake: "-- Le nom sur 20 caractères, pour un fichier à largeur fixe\nSELECT code,\n       RPAD(nom, 20, ' ') AS nom_20,\n       LENGTH(RPAD(nom, 20, ' ')) AS longueur\nFROM client\nWHERE id IN (1, 4, 7)\nORDER BY id;",
      mysql: "-- Le nom sur 20 caractères, pour un fichier à largeur fixe\nSELECT code,\n       RPAD(nom, 20, ' ') AS nom_20,\n       CHAR_LENGTH(RPAD(nom, 20, ' ')) AS longueur\nFROM client\nWHERE id IN (1, 4, 7)\nORDER BY id;"
    },
    resultat: [["code", "nom_20", "longueur"], ["C001", "AquaBleu            ", 20], ["C004", "Hydro Sud           ", 20], ["C007", "Camping Les Flots   ", 20]],
    piege: "Un texte plus long que la zone est coupé sans erreur : sur 10 caractères, 'Camping Les Flots' devient 'Camping Le'. Et sur SQL Server, `LEN` ne voit pas les espaces de fin : contrôle la largeur avec `DATALENGTH` (il compte des octets).",
    pratique: "Construis chaque ligne du fichier en collant les zones dans l'ordre de la spécification (code, nom, ville…), puis contrôle la longueur totale de la ligne : une zone trop courte décale toutes les suivantes.",
    motsCles: ["espaces", "droite", "compléter", "blancs", "largeur fixe", "fichier plat", "positionnel", "aligner", "longueur", "remplir", "zone", "cadrer à gauche"],
    voirAussi: ["lpad", "len", "cast", "types-texte", "char"]
  },
  {
    id: "remplacer-vide",
    titre: "Remplacer une case vide par une valeur",
    famille: "Compléter",
    besoins: ["remplacer les NULL par une valeur par défaut", "afficher « À compléter » quand la ville est vide", "mettre 0 à la place de NULL"],
    essais: ["si le champ est null mettre inconnu", "valeur par defaut quand il n'y a rien", "remplacer null par zero"],
    moteurs: {
      sqlserver: "`COALESCE(ville, 'À compléter')` ; vide ou NULL : `COALESCE(NULLIF(TRIM(ville), ''), 'À compléter')`",
      snowflake: "`COALESCE(ville, 'À compléter')`, ou `NVL(ville, …)` ; pour un nombre : `ZEROIFNULL(x)`",
      mysql: "`COALESCE(ville, 'À compléter')`, ou `IFNULL(ville, …)`"
    },
    exemple: "SELECT code, nom,\n       COALESCE(NULLIF(TRIM(ville), ''), 'À compléter') AS ville\nFROM client\nWHERE id >= 5\nORDER BY id;",
    resultat: [["code", "nom", "ville"], ["C005", "Pool & Garden", "Genève"], ["C006", "Piscines Dumont", "Lyon"], ["C007", "Camping Les Flots", "À compléter"]],
    piege: "Un texte vide ('') n'est pas NULL : `COALESCE` le laisse passer, et la case reste blanche dans l'export. `NULLIF(TRIM(ville), '')` change d'abord le vide (ou les espaces seuls) en NULL.",
    pratique: "Dans Power BI, une case NULL tombe dans « (vide) » : remplace-la dans la requête par un libellé clair (« Non renseigné ») pour qu'elle reste visible, triable et filtrable.",
    motsCles: ["vide", "null", "remplacer", "défaut", "valeur par défaut", "case vide", "manquant", "zéro", "inconnu", "rien", "secours", "ifnull"],
    voirAussi: ["coalesce", "isnull", "nullif", "trim", "is-null"]
  },
  {
    id: "zero-sans-commande",
    titre: "Afficher 0 pour les clients sans commande",
    famille: "Compléter",
    besoins: ["afficher tous les clients même ceux qui n'ont pas de commande", "compter zéro commande au lieu de perdre le client", "un total à 0 pour les articles jamais vendus"],
    essais: ["les clients sans vente doivent apparaitre avec zero", "compter zero quand il n'y a aucune ligne", "garder les clients qui n ont rien commande"],
    moteurs: {
      sqlserver: "`FROM client LEFT JOIN commande …`, puis `COUNT(c.id)` et `COALESCE(SUM(c.montant_ht), 0)`",
      snowflake: "Même écriture : `LEFT JOIN`, `COUNT(c.id)`, `COALESCE(SUM(…), 0)`",
      mysql: "Même écriture : `LEFT JOIN`, `COUNT(c.id)`, `COALESCE(SUM(…), 0)`"
    },
    exemple: "SELECT cl.code, cl.nom,\n       COUNT(c.id) AS nb_cde,\n       COALESCE(SUM(c.montant_ht), 0) AS ca_ht\nFROM client AS cl\nLEFT JOIN commande AS c ON c.client_id = cl.id\nWHERE cl.id >= 4\nGROUP BY cl.code, cl.nom\nORDER BY cl.code;",
    resultat: [["code", "nom", "nb_cde", "ca_ht"], ["C004", "Hydro Sud", 1, "318.00"], ["C005", "Pool & Garden", 0, "0.00"], ["C006", "Piscines Dumont", 1, "79.80"], ["C007", "Camping Les Flots", 0, "0.00"]],
    piege: "`COUNT(*)` compte la ligne vide créée par le LEFT JOIN : Pool & Garden aurait 1 commande. Compte une colonne de la table de droite : `COUNT(c.id)`.",
    pratique: "Un filtre sur les commandes (période, statut) va dans le `ON`, pas dans le `WHERE` : dans le WHERE, il élimine les clients sans commande, et le LEFT JOIN redevient un INNER JOIN.",
    motsCles: ["zéro", "sans commande", "sans vente", "aucune commande", "tous les clients", "client", "jamais vendu", "apparaître", "compter", "client absent", "garder", "vide"],
    voirAussi: ["left-join", "count", "coalesce", "group-by"]
  },
  {
    id: "combinaisons-manquantes",
    titre: "Créer les combinaisons manquantes (chaque article dans chaque dépôt)",
    famille: "Compléter",
    besoins: ["avoir une ligne pour chaque article dans chaque dépôt", "afficher un stock à 0 dans les dépôts où l'article n'est pas", "créer toutes les combinaisons de deux listes"],
    essais: ["chaque produit pour chaque magasin meme sans stock", "grille article x depot avec des zeros", "produit cartesien des articles et des depots"],
    moteurs: {
      sqlserver: "`FROM article CROSS JOIN depot`, puis `LEFT JOIN stock_depot` sur les deux clés, et `COALESCE(s.qte, 0)`",
      snowflake: "Même écriture : `CROSS JOIN`, `LEFT JOIN`, `COALESCE(s.qte, 0)`",
      mysql: "Même écriture : `CROSS JOIN`, `LEFT JOIN`, `COALESCE(s.qte, 0)`"
    },
    exemple: "SELECT a.code, d.nom AS depot, COALESCE(s.qte, 0) AS qte\nFROM article AS a\nCROSS JOIN depot AS d\nLEFT JOIN stock_depot AS s\n       ON s.article_id = a.id AND s.depot_id = d.id\nWHERE a.code = 'PH-5'\nORDER BY d.id;",
    resultat: [["code", "depot", "qte"], ["PH-5", "Lyon", 50], ["PH-5", "Toulouse", 0], ["PH-5", "Nantes", 30]],
    piege: "Le `ON` du LEFT JOIN doit porter sur l'article ET sur le dépôt : avec l'article seul, chaque stock se répète dans les 3 dépôts. Et un `WHERE s.qte > 0` refait disparaître les zéros.",
    pratique: "Même méthode pour un tableau Power BI sans trou (mois × client, ventes à 0 visibles) : croise la liste des mois avec celle des clients, puis LEFT JOIN sur les ventes.",
    motsCles: ["combinaisons", "toutes les combinaisons", "chaque", "grille", "dépôt", "article", "stock", "manquant", "zéro", "croiser", "matrice", "cartésien"],
    voirAussi: ["cross-join", "left-join", "coalesce"]
  },
  {
    id: "jours-manquants",
    titre: "Créer les jours manquants d'une période",
    famille: "Compléter",
    besoins: ["avoir une ligne par jour même sans commande", "générer une ligne pour chaque jour de la période", "garder les jours sans vente dans le résultat", "tous les jours du mois, même sans vente"],
    essais: ["creer un calendrier en sql", "toutes les dates d'un mois meme vides", "les jours sans commande manquent dans mon graphique"],
    moteurs: {
      sqlserver: "CTE récursive avec `DATEADD(day, 1, jour)` (`OPTION (MAXRECURSION 400)` au-delà de 100 jours) ; 2022+ (niveau 160) : `GENERATE_SERIES(0, 29)`",
      snowflake: "`TABLE(GENERATOR(ROWCOUNT => 30))` et `ROW_NUMBER() OVER (ORDER BY SEQ4()) - 1` jours, ou une CTE récursive",
      mysql: "`WITH RECURSIVE` et `jour + INTERVAL 1 DAY` (1 000 niveaux au plus par défaut)"
    },
    exemple: "WITH jours (jour) AS (\n  SELECT CAST('20260401' AS date)\n  UNION ALL\n  SELECT DATEADD(day, 1, jour) FROM jours WHERE jour < '20260404'\n)\nSELECT j.jour, COALESCE(SUM(c.montant_ht), 0) AS ca_ht\nFROM jours AS j\nLEFT JOIN commande AS c ON c.date_cde = j.jour\nGROUP BY j.jour\nORDER BY j.jour;",
    exemples: {
      snowflake: "WITH jours AS (\n  SELECT DATEADD(day, ROW_NUMBER() OVER (ORDER BY SEQ4()) - 1,\n                 '2026-04-01'::DATE) AS jour\n  FROM TABLE(GENERATOR(ROWCOUNT => 4))\n)\nSELECT j.jour, COALESCE(SUM(c.montant_ht), 0) AS ca_ht\nFROM jours AS j\nLEFT JOIN commande AS c ON c.date_cde = j.jour\nGROUP BY j.jour\nORDER BY j.jour;",
      mysql: "WITH RECURSIVE jours (jour) AS (\n  SELECT CAST('2026-04-01' AS DATE)\n  UNION ALL\n  SELECT jour + INTERVAL 1 DAY FROM jours WHERE jour < '2026-04-04'\n)\nSELECT j.jour, COALESCE(SUM(c.montant_ht), 0) AS ca_ht\nFROM jours AS j\nLEFT JOIN commande AS c ON c.date_cde = j.jour\nGROUP BY j.jour\nORDER BY j.jour;"
    },
    resultat: [["jour", "ca_ht"], ["2026-04-01", "318.00"], ["2026-04-02", "0.00"], ["2026-04-03", "1290.00"], ["2026-04-04", "0.00"]],
    piege: "Sur SQL Server, la récursion s'arrête à 100 niveaux : un mois passe, une année plante (« maximum recursion 100 »). Ajoute `OPTION (MAXRECURSION 400)` à la fin de la requête, ou prends `GENERATE_SERIES` (2022+, niveau 160).",
    pratique: "Pour des mois au lieu de jours, pars du 1er du mois et ajoute `DATEADD(month, 1, mois)` (MySQL : `mois + INTERVAL 1 MONTH`) : le graphique Power BI montre alors aussi les mois sans vente.",
    motsCles: ["jours", "dates", "calendrier", "générer", "jours manquants", "toutes les dates", "manque", "mois", "période", "chaque jour", "graphique", "trous"],
    voirAussi: ["cte-recursive", "dateadd", "left-join", "coalesce", "with-cte"]
  },
  {
    id: "derniere-valeur-connue",
    titre: "Reprendre la dernière valeur connue (remplir vers le bas)",
    famille: "Compléter",
    besoins: ["remplir les cases vides avec la valeur de la ligne du dessus", "reprendre le dernier prix connu pour les jours sans prix", "recopier vers le bas comme dans Excel"],
    essais: ["fill down en sql", "combler les trous avec la derniere valeur non nulle", "reporter la valeur precedente quand c'est null"],
    moteurs: {
      sqlserver: "2022+ : `COALESCE(x, LAG(x) IGNORE NULLS OVER (ORDER BY …))` ; avant : `COUNT(x) OVER (ORDER BY …)` fait un groupe, puis `MAX(x) OVER (PARTITION BY groupe)`",
      snowflake: "`COALESCE(x, LAG(x) IGNORE NULLS OVER (ORDER BY …))`",
      mysql: "Pas de `IGNORE NULLS` (erreur) : `COUNT(x) OVER (ORDER BY …)` fait un groupe, puis `MAX(x) OVER (PARTITION BY groupe)`"
    },
    exemple: "-- Chaque jour, la dernière commande reçue (SQL Server 2022+)\nWITH jours (jour) AS (\n  SELECT CAST('20260401' AS date)\n  UNION ALL\n  SELECT DATEADD(day, 1, jour) FROM jours WHERE jour < '20260404'\n)\nSELECT j.jour, c.num_cde,\n       COALESCE(c.num_cde,\n                LAG(c.num_cde) IGNORE NULLS\n                  OVER (ORDER BY j.jour)) AS derniere_cde\nFROM jours AS j\nLEFT JOIN commande AS c ON c.date_cde = j.jour\nORDER BY j.jour;",
    exemples: {
      snowflake: "-- Chaque jour, la dernière commande reçue\nWITH RECURSIVE jours (jour) AS (\n  SELECT '2026-04-01'::DATE\n  UNION ALL\n  SELECT DATEADD(day, 1, jour) FROM jours WHERE jour < '2026-04-04'\n)\nSELECT j.jour, c.num_cde,\n       COALESCE(c.num_cde,\n                LAG(c.num_cde) IGNORE NULLS\n                  OVER (ORDER BY j.jour)) AS derniere_cde\nFROM jours AS j\nLEFT JOIN commande AS c ON c.date_cde = j.jour\nORDER BY j.jour;",
      mysql: "-- Chaque jour, la dernière commande reçue (sans IGNORE NULLS)\nWITH RECURSIVE jours (jour) AS (\n  SELECT CAST('2026-04-01' AS DATE)\n  UNION ALL\n  SELECT jour + INTERVAL 1 DAY FROM jours WHERE jour < '2026-04-04'\n),\nt AS (\n  SELECT j.jour, c.num_cde,\n         COUNT(c.num_cde) OVER (ORDER BY j.jour) AS groupe\n  FROM jours AS j\n  LEFT JOIN commande AS c ON c.date_cde = j.jour\n)\nSELECT jour, num_cde,\n       MAX(num_cde) OVER (PARTITION BY groupe) AS derniere_cde\nFROM t\nORDER BY jour;"
    },
    resultat: [["jour", "num_cde", "derniere_cde"], ["2026-04-01", "CDE-1005", "CDE-1005"], ["2026-04-02", null, "CDE-1005"], ["2026-04-03", "CDE-1006", "CDE-1006"], ["2026-04-04", null, "CDE-1006"]],
    piege: "« La ligne du dessus » n'existe que par un ORDER BY : une table SQL n'a pas d'ordre. Trie sur une vraie colonne (date, numéro de ligne), et ajoute `PARTITION BY article` pour ne pas reprendre la valeur d'un autre article.",
    pratique: "Pour un fichier Excel où le client n'est écrit que sur la 1re ligne de chaque bloc, garde le numéro de ligne du fichier à l'import : c'est lui qui servira d'ORDER BY.",
    motsCles: ["dernière valeur", "valeur précédente", "remplir", "vers le bas", "trous", "recopier", "fill down", "ligne du dessus", "combler", "dernier connu", "null"],
    voirAussi: ["lag-lead", "first-value", "coalesce", "over", "cte-recursive"]
  },
  {
    id: "prochain-numero",
    titre: "Trouver le prochain numéro libre",
    famille: "Compléter",
    besoins: ["trouver le prochain code client à créer", "prendre le plus grand numéro et ajouter 1", "le prochain numéro libre de chaque mois"],
    essais: ["quel est le prochain numero disponible", "max + 1 pour creer un nouveau code", "dernier numero utilise plus un"],
    moteurs: {
      sqlserver: "`MAX(CAST(RIGHT(num, 2) AS INT)) + 1`, puis les zéros devant : `RIGHT('00' + CAST(… AS VARCHAR(10)), 2)`",
      snowflake: "`MAX(RIGHT(num, 2)::INT) + 1`, puis `LPAD((…)::VARCHAR, 2, '0')`",
      mysql: "`MAX(CAST(RIGHT(num, 2) AS UNSIGNED)) + 1`, puis `LPAD(…, 2, '0')`"
    },
    exemple: "-- Factures FA-AAAA-MMnn : le prochain numéro de chaque mois\nWITH s AS (\n  SELECT LEFT(num_fact, 10) AS serie,\n         MAX(CAST(RIGHT(num_fact, 2) AS INT)) AS dernier_num\n  FROM facture\n  GROUP BY LEFT(num_fact, 10)\n)\nSELECT serie, dernier_num,\n       serie + RIGHT('00' + CAST(dernier_num + 1 AS VARCHAR(10)), 2)\n         AS prochain\nFROM s\nORDER BY serie;",
    exemples: {
      snowflake: "-- Factures FA-AAAA-MMnn : le prochain numéro de chaque mois\nWITH s AS (\n  SELECT LEFT(num_fact, 10) AS serie,\n         MAX(RIGHT(num_fact, 2)::INT) AS dernier_num\n  FROM facture\n  GROUP BY LEFT(num_fact, 10)\n)\nSELECT serie, dernier_num,\n       serie || LPAD((dernier_num + 1)::VARCHAR, 2, '0') AS prochain\nFROM s\nORDER BY serie;",
      mysql: "-- Factures FA-AAAA-MMnn : le prochain numéro de chaque mois\nWITH s AS (\n  SELECT LEFT(num_fact, 10) AS serie,\n         MAX(CAST(RIGHT(num_fact, 2) AS UNSIGNED)) AS dernier_num\n  FROM facture\n  GROUP BY LEFT(num_fact, 10)\n)\nSELECT serie, dernier_num,\n       CONCAT(serie, LPAD(dernier_num + 1, 2, '0')) AS prochain\nFROM s\nORDER BY serie;"
    },
    resultat: [["serie", "dernier_num", "prochain"], ["FA-2026-03", 3, "FA-2026-0304"], ["FA-2026-04", 1, "FA-2026-0402"]],
    piege: "`MAX` sur un texte compare caractère par caractère : il donne 'C999' plutôt que 'C1000' ('9' > '1'), et le « prochain » existe déjà. Prends le MAX du nombre extrait (`CAST`), pas du texte.",
    pratique: "Deux imports en même temps prennent le même numéro : laisse l'ERP numéroter. Une séquence (`SEQUENCE`) peut sauter des numéros : bien pour un code client, jamais pour une facture. MAX + 1 suffit pour un fichier de création.",
    motsCles: ["prochain", "suivant", "numéro libre", "disponible", "plus grand", "max", "plus un", "nouveau code", "dernier numéro", "compteur", "incrémenter"],
    voirAussi: ["min-max", "identity", "lpad", "cast", "right"]
  },
  {
    id: "repeter-caractere",
    titre: "Répéter un caractère plusieurs fois",
    famille: "Compléter",
    besoins: ["écrire 30 tirets pour faire une ligne", "remplir une zone réservée de 10 espaces dans un fichier", "répéter un texte n fois", "la fonction REPLICATE"],
    essais: ["replicate sur snowflake", "faire une barre d'etoiles selon la quantite", "mettre le meme caractere 20 fois de suite"],
    moteurs: {
      sqlserver: "`REPLICATE('-', 30)` ; des espaces : `SPACE(10)`",
      snowflake: "`REPEAT('-', 30)` ; des espaces : `SPACE(10)`",
      mysql: "`REPEAT('-', 30)` ; des espaces : `SPACE(10)`"
    },
    exemple: "-- Une petite barre : une étoile par tranche de 10 en stock\nSELECT code, stock,\n       REPLICATE('*', stock / 10) AS barre\nFROM article\nWHERE famille = 'CHIMIE'\nORDER BY id;",
    exemples: {
      snowflake: "-- Une petite barre : une étoile par tranche de 10 en stock\nSELECT code, stock,\n       REPEAT('*', FLOOR(stock / 10)) AS barre\nFROM article\nWHERE famille = 'CHIMIE'\nORDER BY id;",
      mysql: "-- Une petite barre : une étoile par tranche de 10 en stock\nSELECT code, stock,\n       REPEAT('*', stock DIV 10) AS barre\nFROM article\nWHERE famille = 'CHIMIE'\nORDER BY id;"
    },
    resultat: [["code", "stock", "barre"], ["CHL-5", 120, "************"], ["CHL-25", 40, "****"], ["PH-5", 80, "********"]],
    piege: "Sur SQL Server, `REPLICATE` coupe le résultat à 8 000 octets sans erreur, sauf sur un `VARCHAR(MAX)` : `REPLICATE(CAST('-' AS VARCHAR(MAX)), 10000)`. Et un nombre de fois négatif donne NULL.",
    pratique: "Dans un fichier à largeur fixe, une zone « réservée » (filler) se remplit avec `SPACE(n)`, ou `REPLICATE('0', n)` pour une zone de chiffres (REPEAT sur Snowflake et MySQL) : les zones suivantes restent à leur place.",
    motsCles: ["répéter", "fois", "caractère", "tirets", "étoiles", "espaces", "remplissage", "filler", "ligne", "barre", "zone réservée"],
    voirAussi: ["lpad", "concat", "len"]
  }
]);
