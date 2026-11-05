// Super dico SQL — catégorie « Snowflake » (étape 2, 05/11/2026). Format : docs/dico.md.
// Exemples écrits pour Snowflake (WAREHOUSE, Time Travel, UNDROP, STAGE : « exemple » ; CLONE, VARIANT, FLATTEN,
// COPY INTO : « exemples.snowflake », avec l'équivalent SQL Server dans « exemple »). Résultats calculés avec SQLite sur
// docs/base-exemple.sql (Time Travel : état d'avant l'UPDATE = la base ; UNDROP : COUNT(*) ; CLONE : copie par CREATE
// TABLE AS ; JSON : json_extract et json_each) et relancés sur un vrai serveur MySQL 8.0.46 (copie ventes_a : CLONE,
// VARIANT, FLATTEN, LOAD DATA) : scripts verif_a.py et mysql_a.py (scratchpad dico/a). Le message JSON des fiches
// VARIANT et FLATTEN reprend la commande CDE-1007 de la base (la base n'a pas de colonne JSON).
// Sources (vérifiées le 05/11/2026) :
// - Snowflake, docs.snowflake.com : user-guide/warehouses-overview et cost-understanding-compute (facturation à la seconde,
//   60 s minimum à chaque démarrage, tailles X-Small à 6X-Large, crédits doublés à chaque taille),
//   sql-reference/sql/create-warehouse (AUTO_SUSPEND 600 s par défaut, 0 ou NULL = jamais ; AUTO_RESUME), message
//   « No active warehouse selected in the current session » (aides Fivetran, Retool) ; constructs/at-before (OFFSET,
//   TIMESTAMP, STATEMENT ; erreur hors rétention), parameters (DATA_RETENTION_TIME_IN_DAYS : 1 par défaut, 0 à 90 en
//   Enterprise), sql/undrop-table (échec si le nom existe déjà), user-guide/data-time-travel ; sql/create-clone (clone sans
//   l'historique de chargement : fichiers rechargeables), user-guide/querying-semistructured (deux-points, noms de clés
//   sensibles à la casse, VARIANT affiché avec guillemets, conversion ::), functions/flatten (INPUT, OUTER => TRUE, VALUE),
//   sql/copy-into-table (métadonnées de chargement 64 jours, FORCE, ON_ERROR = ABORT_STATEMENT par défaut, PURGE),
//   sql/put (pas depuis une feuille Snowsight), user-guide/querying-stage ($1, $2…), sql/remove,
//   user-guide/cost-understanding-data-storage (fichiers des stages internes facturés comme stockage).
// - SQL Server, learn.microsoft.com : relational-databases/tables/temporal (2016+, FOR SYSTEM_TIME AS OF, heure UTC),
//   t-sql/queries/select-into-clause-transact-sql (ni index, ni contraintes copiés), t-sql/functions/json-value-transact-sql
//   (nvarchar(4000)), t-sql/functions/openjson-transact-sql (2016+, niveau 130, WITH), t-sql/data-types/json-data-type
//   (type json : SQL Server 2025), t-sql/statements/bulk-insert-transact-sql (FORMAT = 'CSV' en 2017+, chemin vu par le
//   serveur, FIRSTROW, clés primaires toujours contrôlées).
// - MySQL 8, dev.mysql.com/doc/refman/8.0/en : json.html (-> et ->>), json-table-functions.html (JSON_TABLE),
//   load-data.html et secure_file_priv, create-table-like.html. Testé sur le serveur : ->> refusé sur une variable
//   (d'où la CTE), -> garde les guillemets, clé '$.Cde' = NULL, JSON_TABLE sur un tableau vide = 0 ligne (gardée avec
//   LEFT JOIN … ON TRUE), LOAD DATA (IGNORE 1 LINES ; relancé : erreur 1062 avec clé primaire, doublons sans clé ;
//   fichier hors secure_file_priv : erreur 1290 ; LOCAL désactivé : erreur 3948).
// docs.snowflake.com n'était pas joignable depuis la session : vérifié par extraits de recherche.
LEARNSQL.dico = (LEARNSQL.dico || []).concat([
  {
    id: "warehouse",
    nom: "WAREHOUSE",
    type: "mot-clé",
    categorie: "Snowflake",
    definition: "La puissance de calcul de Snowflake : elle exécute les requêtes et se paie à la seconde.",
    moteurs: {
      sqlserver: "Pas de warehouse : la puissance de calcul est celle du serveur (processeurs, mémoire), partagée par toutes les requêtes",
      snowflake: "`USE WAREHOUSE wh_rapport;` choisit le calcul de la session ; tailles XS à 6XL, chaque taille double la puissance et le prix ; payé à la seconde, 60 s minimum à chaque démarrage",
      mysql: "Pas de warehouse : la puissance de calcul est celle du serveur MySQL"
    },
    noms: ["USE WAREHOUSE", "CREATE WAREHOUSE", "VIRTUAL WAREHOUSE", "AUTO_SUSPEND"],
    exemple: "CREATE WAREHOUSE wh_rapport\n  WAREHOUSE_SIZE = 'XSMALL' AUTO_SUSPEND = 60 AUTO_RESUME = TRUE;\nUSE WAREHOUSE wh_rapport;\nSELECT statut, COUNT(*) AS nb_cdes FROM commande GROUP BY statut;",
    resultat: "wh_rapport calcule le SELECT, s'arrête seul après 60 s sans requête, et redémarre à la requête suivante : tu paies au moins 1 minute à chaque démarrage, puis à la seconde.",
    piege: "Exemple écrit pour Snowflake. Sans warehouse actif, la requête plante (« No active warehouse selected in the current session ») ; et avec `AUTO_SUSPEND = 0`, un warehouse oublié ne s'arrête jamais et brûle des crédits toute la nuit.",
    motsCles: ["warehouse", "entrepôt", "calcul", "puissance", "crédits", "coût", "facture", "payer", "taille", "serveur", "cluster", "suspendre", "démarrer", "compute", "performance", "virtuel"],
    voirAussi: ["copy-into", "time-travel", "cluster-by"],
    module: "m14"
  },
  {
    id: "time-travel",
    nom: "Time Travel (AT, BEFORE)",
    type: "mot-clé",
    categorie: "Snowflake",
    definition: "Lit une table telle qu'elle était dans le passé, par exemple juste avant une erreur.",
    moteurs: {
      sqlserver: "Pas de Time Travel : une table temporelle (2016+, `SYSTEM_VERSIONING = ON`) se lit avec `FOR SYSTEM_TIME AS OF '2026-04-07 08:00'` (heure UTC) ; sinon, restaurer une sauvegarde",
      snowflake: "`FROM t AT (OFFSET => -3600)`, `AT (TIMESTAMP => …)` ou `BEFORE (STATEMENT => 'id de requête')` ; 1 jour par défaut, jusqu'à 90 jours (édition Enterprise)",
      mysql: "Pas de Time Travel : restaurer une sauvegarde, puis rejouer le journal binaire (binlog)"
    },
    noms: ["TIME TRAVEL", "AT", "BEFORE", "FOR SYSTEM_TIME", "DATA_RETENTION_TIME_IN_DAYS"],
    exemple: "-- La table telle qu'elle était il y a 1 heure, avant un UPDATE raté\nSELECT num_cde, statut\nFROM commande AT (OFFSET => -3600)\nWHERE canal = 'EDI'\nORDER BY num_cde;",
    resultat: [["num_cde", "statut"], ["CDE-1001", "LIVREE"], ["CDE-1003", "LIVREE"], ["CDE-1007", "EN_COURS"]],
    piege: "Exemple écrit pour Snowflake. Un UPDATE raté vendredi, vu lundi : avec 1 jour de rétention (le défaut), il est trop tard ; règle `DATA_RETENTION_TIME_IN_DAYS` sur les tables importantes avant l'incident.",
    motsCles: ["passé", "historique", "revenir", "annuler", "erreur", "restaurer", "récupérer", "hier", "ancienne version", "time travel", "voyage dans le temps", "update raté", "retour arrière", "état", "rétention", "avant"],
    voirAussi: ["undrop", "clone", "update"],
    module: "m14"
  },
  {
    id: "undrop",
    nom: "UNDROP",
    type: "mot-clé",
    categorie: "Snowflake",
    definition: "Fait revenir une table, un schéma ou une base supprimés par erreur.",
    moteurs: {
      sqlserver: "Pas de UNDROP : restaurer une sauvegarde de la base",
      snowflake: "`UNDROP TABLE t;` (aussi `SCHEMA`, `DATABASE`), tant que la rétention Time Travel n'est pas finie (1 jour par défaut)",
      mysql: "Pas de UNDROP : restaurer une sauvegarde"
    },
    noms: ["UNDROP TABLE", "UNDROP SCHEMA", "UNDROP DATABASE"],
    exemple: "DROP TABLE flux_edi;      -- supprimée par erreur\nUNDROP TABLE flux_edi;    -- elle revient, avec ses lignes\nSELECT COUNT(*) AS nb_flux FROM flux_edi;",
    resultat: [["nb_flux"], [6]],
    piege: "Exemple écrit pour Snowflake. Après un `CREATE OR REPLACE TABLE flux_edi`, UNDROP échoue car le nom est pris : renomme d'abord la nouvelle table (`ALTER TABLE flux_edi RENAME TO flux_edi_vide`), puis lance UNDROP.",
    motsCles: ["restaurer", "récupérer", "supprimée", "effacée", "drop", "annuler", "erreur", "revenir", "table perdue", "corbeille", "undelete", "rétablir", "réparer"],
    voirAussi: ["time-travel", "clone", "drop-table"],
    module: "m14"
  },
  {
    id: "clone",
    nom: "CLONE",
    type: "mot-clé",
    categorie: "Snowflake",
    definition: "Crée en un instant une copie d'une table, d'un schéma ou d'une base, sans recopier les données.",
    moteurs: {
      sqlserver: "Pas de CLONE : `SELECT * INTO copie FROM t` recopie vraiment les données (temps, place), sans clé primaire ni index",
      snowflake: "`CREATE TABLE copie CLONE t;` instantané, sans doubler le stockage ; aussi dans le passé : `CLONE t AT (OFFSET => -3600)`",
      mysql: "Pas de CLONE : `CREATE TABLE copie LIKE t;` puis `INSERT INTO copie SELECT * FROM t;` (vraie copie, clé primaire gardée)"
    },
    noms: ["CREATE TABLE CLONE", "ZERO-COPY CLONE"],
    exemple: "SELECT * INTO commande_test FROM commande;   -- vraie copie\nUPDATE commande_test SET statut = 'LIVREE' WHERE statut = 'EN_COURS';\nSELECT (SELECT COUNT(*) FROM commande WHERE statut = 'EN_COURS') AS en_cours_origine,\n       (SELECT COUNT(*) FROM commande_test WHERE statut = 'EN_COURS') AS en_cours_copie;",
    exemples: {
      snowflake: "CREATE TABLE commande_test CLONE commande;   -- copie instantanée\nUPDATE commande_test SET statut = 'LIVREE' WHERE statut = 'EN_COURS';\nSELECT (SELECT COUNT(*) FROM commande WHERE statut = 'EN_COURS') AS en_cours_origine,\n       (SELECT COUNT(*) FROM commande_test WHERE statut = 'EN_COURS') AS en_cours_copie;",
      mysql: "CREATE TABLE commande_test LIKE commande;\nINSERT INTO commande_test SELECT * FROM commande;\nUPDATE commande_test SET statut = 'LIVREE' WHERE statut = 'EN_COURS';\nSELECT (SELECT COUNT(*) FROM commande WHERE statut = 'EN_COURS') AS en_cours_origine,\n       (SELECT COUNT(*) FROM commande_test WHERE statut = 'EN_COURS') AS en_cours_copie;"
    },
    resultat: [["en_cours_origine", "en_cours_copie"], [3, 0]],
    piege: "Le clone n'a pas l'historique de chargement de la table d'origine : un `COPY INTO` relancé sur le clone recharge des fichiers déjà chargés, et crée des doublons. Pour tester un chargement, vide d'abord le clone (`TRUNCATE TABLE`).",
    motsCles: ["copie", "copier", "dupliquer", "test", "tester", "bac à sable", "sandbox", "environnement", "recette", "instantané", "zéro copie", "clone", "cloner", "sauvegarde", "dev"],
    voirAussi: ["time-travel", "undrop", "copy-into", "create-table"],
    module: "m14"
  },
  {
    id: "variant",
    nom: "VARIANT",
    type: "mot-clé",
    categorie: "Snowflake",
    definition: "Type Snowflake qui garde un document JSON tel quel et permet de lire ses champs.",
    moteurs: {
      sqlserver: "Pas de VARIANT : le JSON reste du texte (`nvarchar`), lu avec `JSON_VALUE(doc, '$.client.code')` ; type `json` natif en 2025",
      snowflake: "`VARIANT` ; `PARSE_JSON(texte)` le crée ; on lit avec `doc:client.code::STRING` (`:` pour descendre, `::` pour le type)",
      mysql: "Pas de VARIANT : type `JSON` ; on lit avec `doc ->> '$.client.code'` (`->` garde les guillemets)"
    },
    noms: ["PARSE_JSON", "JSON", "JSON_VALUE", "->>", "JSON_EXTRACT"],
    exemple: "WITH flux AS (SELECT N'{\"cde\": \"CDE-1007\", \"client\": {\"code\": \"C001\"},\n  \"lignes\": [{\"art\": \"CHL-5\", \"qte\": 150}, {\"art\": \"FIL-14\", \"qte\": 5}]}' AS doc)\nSELECT JSON_VALUE(doc, '$.cde') AS cde,\n       JSON_VALUE(doc, '$.client.code') AS client,\n       JSON_VALUE(doc, '$.lignes[0].qte') AS qte_1\nFROM flux;",
    exemples: {
      snowflake: "WITH flux AS (SELECT PARSE_JSON('{\"cde\": \"CDE-1007\", \"client\": {\"code\": \"C001\"},\n  \"lignes\": [{\"art\": \"CHL-5\", \"qte\": 150}, {\"art\": \"FIL-14\", \"qte\": 5}]}') AS doc)\nSELECT doc:cde::STRING AS cde,\n       doc:client.code::STRING AS client,\n       doc:lignes[0].qte::NUMBER AS qte_1\nFROM flux;",
      mysql: "WITH flux AS (SELECT CAST('{\"cde\": \"CDE-1007\", \"client\": {\"code\": \"C001\"},\n  \"lignes\": [{\"art\": \"CHL-5\", \"qte\": 150}, {\"art\": \"FIL-14\", \"qte\": 5}]}' AS JSON) AS doc)\nSELECT doc ->> '$.cde' AS cde,\n       doc ->> '$.client.code' AS client,\n       doc ->> '$.lignes[0].qte' AS qte_1\nFROM flux;"
    },
    resultat: [["cde", "client", "qte_1"], ["CDE-1007", "C001", "150"]],
    piege: "Les noms de clés tiennent compte de la casse : `doc:Cde` renvoie NULL, sans erreur. Et sans `::STRING`, Snowflake affiche `\"CDE-1007\"` avec ses guillemets (MySQL aussi, avec `->`) : convertis toujours.",
    motsCles: ["json", "semi-structuré", "document", "champ", "clé", "extraire", "parse", "deux-points", "chemin", "objet", "tableau", "api", "variant", "xml", "message", "lire"],
    voirAussi: ["flatten", "cast", "copy-into"],
    module: "m14"
  },
  {
    id: "flatten",
    nom: "FLATTEN",
    type: "fonction",
    categorie: "Snowflake",
    definition: "Transforme un tableau JSON en lignes : une ligne par élément du tableau.",
    moteurs: {
      sqlserver: "Pas de FLATTEN : `CROSS APPLY OPENJSON(doc, '$.lignes') WITH (…)` (2016+)",
      snowflake: "`FROM t, LATERAL FLATTEN(input => t.doc:lignes) l`, puis `l.value:art::STRING`",
      mysql: "Pas de FLATTEN : `JSON_TABLE(doc, '$.lignes[*]' COLUMNS (…))`"
    },
    noms: ["LATERAL FLATTEN", "OPENJSON", "JSON_TABLE"],
    exemple: "WITH flux AS (SELECT N'{\"cde\": \"CDE-1007\", \"client\": {\"code\": \"C001\"},\n  \"lignes\": [{\"art\": \"CHL-5\", \"qte\": 150}, {\"art\": \"FIL-14\", \"qte\": 5}]}' AS doc)\nSELECT JSON_VALUE(f.doc, '$.cde') AS cde, l.article, l.qte\nFROM flux AS f\nCROSS APPLY OPENJSON(f.doc, '$.lignes')\n  WITH (article varchar(10) '$.art', qte int '$.qte') AS l;",
    exemples: {
      snowflake: "WITH flux AS (SELECT PARSE_JSON('{\"cde\": \"CDE-1007\", \"client\": {\"code\": \"C001\"},\n  \"lignes\": [{\"art\": \"CHL-5\", \"qte\": 150}, {\"art\": \"FIL-14\", \"qte\": 5}]}') AS doc)\nSELECT f.doc:cde::STRING AS cde,\n       l.value:art::STRING AS article,\n       l.value:qte::NUMBER AS qte\nFROM flux AS f, LATERAL FLATTEN(input => f.doc:lignes) l;",
      mysql: "WITH flux AS (SELECT CAST('{\"cde\": \"CDE-1007\", \"client\": {\"code\": \"C001\"},\n  \"lignes\": [{\"art\": \"CHL-5\", \"qte\": 150}, {\"art\": \"FIL-14\", \"qte\": 5}]}' AS JSON) AS doc)\nSELECT f.doc ->> '$.cde' AS cde, l.article, l.qte\nFROM flux AS f,\n     JSON_TABLE(f.doc, '$.lignes[*]'\n       COLUMNS (article VARCHAR(10) PATH '$.art', qte INT PATH '$.qte')) AS l;"
    },
    resultat: [["cde", "article", "qte"], ["CDE-1007", "CHL-5", 150], ["CDE-1007", "FIL-14", 5]],
    piege: "Une commande dont le tableau `lignes` est vide disparaît du résultat, sans erreur, comme avec un INNER JOIN. Pour la garder : `FLATTEN(input => …, OUTER => TRUE)` (SQL Server : `OUTER APPLY` ; MySQL : `LEFT JOIN JSON_TABLE(…) ON TRUE`).",
    motsCles: ["json", "tableau", "array", "lignes", "déplier", "éclater", "exploser", "dérouler", "éléments", "liste", "openjson", "json_table", "lateral", "détail", "unnest"],
    voirAussi: ["variant", "cross-apply", "string-split", "left-join"],
    module: "m14"
  },
  {
    id: "copy-into",
    nom: "COPY INTO",
    type: "mot-clé",
    categorie: "Snowflake",
    definition: "Charge les fichiers d'un stage (CSV, JSON, Parquet) dans une table Snowflake.",
    moteurs: {
      sqlserver: "Pas de COPY INTO : `BULK INSERT t FROM 'chemin' WITH (FORMAT = 'CSV', …)` ; le chemin est vu par le serveur, pas par ton poste",
      snowflake: "`COPY INTO t FROM @stage/dossier/ FILE_FORMAT = (…)` ; un fichier déjà chargé (64 jours) est sauté ; une erreur dans un fichier arrête tout (`ON_ERROR`)",
      mysql: "Pas de COPY INTO : `LOAD DATA INFILE '…' INTO TABLE t` ; le fichier doit être dans le dossier `secure_file_priv` du serveur"
    },
    noms: ["BULK INSERT", "LOAD DATA INFILE", "FILE_FORMAT"],
    exemple: "BULK INSERT commande\nFROM 'D:\\edi\\commandes.csv'\nWITH (FORMAT = 'CSV', FIELDTERMINATOR = ';', FIRSTROW = 2);",
    exemples: {
      snowflake: "COPY INTO commande\nFROM @stage_edi/commandes/\nFILE_FORMAT = (TYPE = CSV FIELD_DELIMITER = ';' SKIP_HEADER = 1);",
      mysql: "LOAD DATA INFILE '/var/lib/mysql-files/commandes.csv'\nINTO TABLE commande\nFIELDS TERMINATED BY ';'\nIGNORE 1 LINES;"
    },
    resultat: "Les lignes du fichier CSV (champs séparés par des points-virgules, sans la ligne d'en-tête) sont ajoutées à la table commande.",
    piege: "Relancés, BULK INSERT et LOAD DATA rechargent le fichier : doublons, ou erreur de clé en double. COPY INTO, lui, saute les fichiers déjà chargés depuis 64 jours, sauf avec `FORCE = TRUE`.",
    motsCles: ["charger", "chargement", "importer", "import", "fichier", "csv", "intégrer", "injecter", "bulk", "load", "copy", "stage", "snowpipe", "ingestion", "alimenter", "edi"],
    voirAussi: ["stage", "variant", "clone", "insert"],
    module: "m14"
  },
  {
    id: "stage",
    nom: "STAGE",
    type: "mot-clé",
    categorie: "Snowflake",
    definition: "Zone de dépôt des fichiers dans Snowflake, d'où COPY INTO les charge dans les tables.",
    moteurs: {
      sqlserver: "Pas de stage : le fichier est lu sur un disque ou un partage vu par le serveur (`BULK INSERT`, `OPENROWSET(BULK …)`)",
      snowflake: "`CREATE STAGE nom` (interne) ou `… URL = 's3://…'` (externe) ; `@nom` le désigne ; `@~` : ton stage perso ; `@%table` : celui d'une table",
      mysql: "Pas de stage : le fichier doit être dans le dossier `secure_file_priv` du serveur"
    },
    noms: ["CREATE STAGE", "PUT", "REMOVE", "@~", "@%"],
    exemple: "CREATE STAGE stage_edi\n  FILE_FORMAT = (TYPE = CSV FIELD_DELIMITER = ';' SKIP_HEADER = 1);\nPUT file://C:\\edi\\commandes.csv @stage_edi/commandes/;  -- Snowflake CLI, pas une feuille Snowsight\nLIST @stage_edi/commandes/;\nSELECT $1, $2, $3 FROM @stage_edi/commandes/ LIMIT 5;",
    resultat: "LIST montre le fichier déposé (nom, taille, date) ; le SELECT lit ses 3 premières colonnes sans rien charger.",
    piege: "Exemple écrit pour Snowflake. Les fichiers restent dans le stage après le COPY INTO et sont facturés comme du stockage : ajoute `PURGE = TRUE` au COPY, ou nettoie avec `REMOVE @stage_edi/commandes/`.",
    motsCles: ["dépôt", "déposer", "fichier", "fichiers", "zone", "s3", "azure", "blob", "put", "upload", "envoyer", "list", "remove", "dossier", "stockage", "externe", "interne"],
    voirAussi: ["copy-into", "variant", "warehouse"],
    module: "m14"
  }
]);
