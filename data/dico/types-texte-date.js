// Dico SQL, catégorie « Types de données » (2/2) : textes, binaires, listes de valeurs (ENUM, SET), dates et heures,
// semi-structurés (JSON…), autres types (docs/dico.md, « Types de données »). 32 fiches, écrites le 13/11/2026.
// Vérification : SQLite (base d'exemple neuve à chaque essai) et Python (fuseaux de 2026, distances), 24 essais ;
// MySQL 8.0.46 réel (copie de la base, mode strict par défaut, utf8mb4_0900_ai_ci) : chaque exemple MySQL et chaque fait
// MySQL des fiches. SQL Server et Snowflake : pas de serveur, résultats tirés de la documentation et refaits à la main,
// deux fois. Notes, scripts et pages lues : scratchpad types-astuces/textes-dates (notes.md, verif/, mysql/, sources/).
// Sources (lues le 13/11/2026) :
// - SQL Server, learn.microsoft.com/en-us/sql : t-sql/data-types/ data-types-transact-sql, char-and-varchar-transact-sql
//   (n en octets, 1 à 8 000 ; MAX = 2 Go ; sans n : 1, ou 30 dans CAST ; UTF-8 depuis 2019), nchar-and-nvarchar-transact-sql
//   (1 à 4 000 ; préfixe N), ntext-text-and-image-transact-sql (obsolètes), binary-and-varbinary-transact-sql (zéros à
//   droite), date-transact-sql, time-transact-sql, datetime-transact-sql (1753 ; arrondi .000/.003/.007),
//   datetime2-transact-sql, smalldatetime-transact-sql (2079-06-06 ; 29,998 s), datetimeoffset-transact-sql (-14:00 à
//   +14:00 ; comparé en UTC ; décalage perdu vers datetime2), rowversion-transact-sql, uniqueidentifier-transact-sql,
//   json-data-type (2025 ; objet ou tableau ; 1re clé en double gardée), sql-variant-transact-sql (8 016 octets),
//   hierarchyid-data-type-method-reference (892 octets), vector-data-type (2025 ; 1 998 dimensions) ; t-sql/xml/
//   xml-transact-sql et value-method-xml-data-type ([1]) ; t-sql/spatial-geography/ spatial-types-geography,
//   point-geography-data-type (latitude d'abord, à l'inverse du WKT), stdistance-geography-data-type (mètres) ;
//   t-sql/language-elements/ string-comparison-assignment ('abc' = 'abc '), like-transact-sql (paramètre CHAR) ;
//   t-sql/statements/ set-ansi-padding-transact-sql, create-index-transact-sql (pas de MAX en clé) ; t-sql/queries/
//   at-time-zone-transact-sql ; t-sql/functions/ date-and-time-data-types-and-functions-transact-sql, json-value (4 000
//   caractères), json-object (NULL ON NULL), json-array (2022), newsequentialid, sysutcdatetime, vector-distance ;
//   relational-databases/ collations/collation-and-unicode-support (UTF-8), hierarchical-data-sql-server,
//   vectors/vectors-sql-server (type GA en 2025, index en préversion) ; azure/azure-sql/managed-instance/
//   timezones-overview ('Romance Standard Time' = Paris).
// - Snowflake, docs.snowflake.com/en (lu en .md) : sql-reference/ intro-summary-data-types, data-types-text (VARCHAR :
//   16 777 216 sans longueur, 128 Mo au plus ; CHAR sans espaces ; BINARY : 8 Mo par défaut, 64 Mo au plus),
//   data-types-unsupported (BLOB, CLOB, ENUM), binary-input-output (HEX par défaut), collation (pas de trim par défaut),
//   data-types-datetime (TIME, TIMESTAMP_* : 0 à 9 ; NTZ, LTZ, TZ ; TZ garde le décalage, pas le fuseau), parameters
//   (TIMESTAMP_TYPE_MAPPING = TIMESTAMP_NTZ ; TIMEZONE = America/Los_Angeles), functions/to_date (chiffres = secondes),
//   functions/convert_timezone, data-types-semistructured (128 Mo), functions/ parse_json (clé en double refusée),
//   object_construct (paire NULL omise, ordre non gardé), array_agg (ordre imprévisible sans WITHIN GROUP),
//   array_contains, is_null_value, parse_xml, xmlget (numéro à partir de 0), sha2_binary, st_makepoint (longitude
//   d'abord), st_distance (mètres), data-types-geospatial, data-types-vector (4 096), functions-vector, data-types-uuid ;
//   user-guide/ semistructured-considerations (null JSON), data-engineering/row-timestamps ; release-notes/
//   bcr-bundles/2025_03/bcr-1942 (nouvelles tailles ; BINARY non agrandissable), sql-improvements-2026 (UUID : janvier
//   2026), 2026/other/2026-02-18-row-timestamps (GA).
// - MySQL, dev.mysql.com/doc/refman/8.4/en : string-type-syntax, char (NO PAD : espaces de fin comptés), charset-national
//   (NCHAR = utf8mb3), binary-varbinary, blob, enum, set, storage-requirements, datetime, time, year, fractional-seconds
//   (0 à 6, 0 par défaut), timestamp-initialization, time-zone-support, json, spatial-types, gis-wkt-functions
//   (axis-order), miscellaneous-functions (UUID_TO_BIN) ; refman/9.5/en/vector.html et relnotes/mysql/9.0/en/news-9-0-0
//   (VECTOR en 9.0 ; DISTANCE() réservée à HeatWave).
LEARNSQL.dico = (LEARNSQL.dico || []).concat([
  // ---------- Textes ----------
  {
    id: "char",
    nom: "CHAR",
    type: "type",
    categorie: "Types de données",
    famille: "Textes",
    definition: "Un texte de longueur fixe, pour un code qui a toujours le même nombre de caractères.",
    moteurs: {
      sqlserver: "`CHAR(n)`, n de 1 à 8 000 octets ; complété par des espaces ; sans n : 1 (30 dans un `CAST`)",
      snowflake: "`CHAR(n)` est un `VARCHAR(n)` : aucun espace n'est ajouté ; sans n : `CHAR(1)`",
      mysql: "`CHAR(n)`, n de 0 à 255 caractères ; complété à l'écriture, espaces de fin retirés à la lecture"
    },
    apercu: { sqlserver: "Fixe, 1 à 8 000 octets", snowflake: "= VARCHAR, sans espaces ajoutés", mysql: "Fixe, 0 à 255 caractères" },
    noms: ["CHARACTER"],
    exemple: "-- Le code article recopié dans un CHAR(8)\nSELECT code, DATALENGTH(code) AS octets,\n       DATALENGTH(CAST(code AS CHAR(8))) AS octets_char8\nFROM article\nWHERE famille = 'CHIMIE';",
    exemples: {
      snowflake: "-- Le code article recopié dans un CHAR(8)\nSELECT code, OCTET_LENGTH(code) AS octets,\n       OCTET_LENGTH(CAST(code AS CHAR(8))) AS octets_char8\nFROM article\nWHERE famille = 'CHIMIE';",
      mysql: "-- Le code article recopié dans un CHAR(8)\nSELECT code, LENGTH(code) AS octets,\n       LENGTH(CAST(code AS CHAR(8))) AS octets_char8\nFROM article\nWHERE famille = 'CHIMIE';"
    },
    resultat: [["code", "octets", "octets_char8"], ["CHL-5", 5, 8], ["CHL-25", 6, 8], ["PH-5", 4, 8]],
    piege: "Résultat de SQL Server : Snowflake et MySQL n'ajoutent pas d'espaces et renvoient 5, 6 et 4. Sur SQL Server, ces espaces entrent dans un motif : avec `@ref CHAR(10)`, `LIKE @ref + '%'` ne trouve rien ; écris `RTRIM(@ref) + '%'`.",
    pratique: "Pour un fichier à largeur fixe (banque, ancien EDI), complète toi-même : `RPAD(code, 10, ' ')` sur Snowflake et MySQL ; sur SQL Server, `CAST(code AS CHAR(10))` suffit.",
    motsCles: ["longueur fixe", "taille fixe", "code", "code pays", "devise", "espaces", "complété", "caractères", "alphanumérique", "char", "fixe"],
    voirAussi: ["varchar", "nchar", "len", "trim", "lpad"],
    module: "m10"
  },
  {
    id: "varchar",
    nom: "VARCHAR",
    type: "type",
    categorie: "Types de données",
    famille: "Textes",
    definition: "Un texte de longueur variable, jusqu'à une taille maximale choisie : le type courant des libellés et des codes.",
    moteurs: {
      sqlserver: "`VARCHAR(n)`, n de 1 à 8 000 octets ; `VARCHAR(MAX)` jusqu'à 2 Go ; sans n : 1 (30 dans un `CAST`)",
      snowflake: "`VARCHAR(n)`, toujours Unicode ; sans n : 16 777 216 caractères ; au plus 128 Mo ; `STRING` et `TEXT` = VARCHAR",
      mysql: "`VARCHAR(n)`, n obligatoire, en caractères ; 65 535 octets pour toute la ligne, donc 16 383 caractères au plus en utf8mb4"
    },
    apercu: { sqlserver: "8 000 octets ; MAX : 2 Go", snowflake: "Unicode, jusqu'à 128 Mo", mysql: "n obligatoire ; 65 535 octets max" },
    noms: ["VARCHAR(MAX)", "STRING", "CHARACTER VARYING", "CHAR VARYING", "VARCHAR2"],
    exemple: "-- Un code client reçu avec un espace en trop à la fin\nSELECT COUNT(*) AS trouve\nFROM client\nWHERE code = 'C001 ';",
    resultat: [["trouve"], [1]],
    piege: "Résultat de SQL Server, qui ignore les espaces de fin pour comparer ; Snowflake et MySQL 8 en tiennent compte et renvoient 0, sans erreur. Nettoie les codes reçus avec `TRIM` avant de comparer.",
    pratique: "Sur SQL Server, `VARCHAR(MAX)` ne peut pas être une clé d'index : garde-le pour les longs textes (commentaires, messages bruts) et donne une vraie longueur aux codes et aux libellés.",
    motsCles: ["texte", "chaîne", "string", "libellé", "taille variable", "caractères", "varchar max", "taille", "alphanumérique", "espaces", "chaîne de caractères", "varchar"],
    voirAussi: ["char", "nvarchar", "text", "len", "trim", "types-texte"],
    module: "m10"
  },
  {
    id: "nchar",
    nom: "NCHAR",
    type: "type",
    categorie: "Types de données",
    famille: "Textes",
    definition: "Un texte Unicode de longueur fixe : tous les alphabets, complété par des espaces jusqu'à sa taille.",
    moteurs: {
      sqlserver: "`NCHAR(n)`, n de 1 à 4 000 ; 2 octets par caractère courant ; complété par des espaces",
      snowflake: "`NCHAR(n)` = `VARCHAR(n)` : tout texte Snowflake est déjà Unicode ; aucun espace ajouté",
      mysql: "`NCHAR(n)` = `CHAR(n)` en jeu utf8mb3 (avertissement 3720) ; préfère `CHAR(n)` en utf8mb4"
    },
    apercu: { sqlserver: "Unicode fixe, 4 000 max", snowflake: "= VARCHAR (déjà Unicode)", mysql: "= CHAR en utf8mb3" },
    noms: ["NATIONAL CHAR", "NATIONAL CHARACTER"],
    exemple: "-- Le code pays, en CHAR puis en NCHAR\nSELECT code, pays, DATALENGTH(pays) AS octets_char,\n       DATALENGTH(CAST(pays AS NCHAR(2))) AS octets_nchar\nFROM client\nWHERE id IN (1, 5);",
    exemples: {
      snowflake: "-- Le code pays, en CHAR puis en NCHAR\nSELECT code, pays, OCTET_LENGTH(pays) AS octets_char,\n       OCTET_LENGTH(CAST(pays AS NCHAR(2))) AS octets_nchar\nFROM client\nWHERE id IN (1, 5);",
      mysql: "-- Le code pays, en CHAR puis en NCHAR\nSELECT code, pays, LENGTH(pays) AS octets_char,\n       LENGTH(CAST(pays AS NCHAR(2))) AS octets_nchar\nFROM client\nWHERE id IN (1, 5);"
    },
    resultat: [["code", "pays", "octets_char", "octets_nchar"], ["C001", "FR", 2, 4], ["C005", "CH", 2, 4]],
    piege: "Pour un code en lettres latines (pays, devise), NCHAR double la place sur SQL Server, 4 octets au lieu de 2 : `CHAR(2)` suffit. Snowflake et MySQL n'utilisent ici qu'un octet par lettre (2 et 2).",
    pratique: "Sur MySQL, NCHAR crée une colonne utf8mb3 : un emoji y est refusé (« Incorrect string value »). Écris `CHAR(n)` tout court : utf8mb4, le jeu par défaut, accepte tout.",
    motsCles: ["unicode", "taille fixe", "unicode fixe", "alphabet", "caractères étrangers", "national", "accents", "2 octets", "nchar", "étranger"],
    voirAussi: ["nvarchar", "char", "len"]
  },
  {
    id: "nvarchar",
    nom: "NVARCHAR",
    type: "type",
    categorie: "Types de données",
    famille: "Textes",
    definition: "Un texte Unicode de longueur variable : il garde tous les alphabets (polonais, grec, chinois…).",
    moteurs: {
      sqlserver: "`NVARCHAR(n)`, n de 1 à 4 000 ; `NVARCHAR(MAX)` jusqu'à 2 Go ; 2 octets par caractère courant ; constante `N'…'`",
      snowflake: "Inutile : `VARCHAR` est déjà Unicode (UTF-8) ; `NVARCHAR` n'y est qu'un synonyme",
      mysql: "`VARCHAR` en utf8mb4, le jeu par défaut ; `NVARCHAR` donne de l'utf8mb3, à éviter"
    },
    apercu: { sqlserver: "Unicode, 4 000 ou MAX", snowflake: "= VARCHAR (déjà Unicode)", mysql: "Synonyme utf8mb3 ; préfère utf8mb4" },
    noms: ["NVARCHAR(MAX)", "NATIONAL VARCHAR", "NATIONAL CHARACTER VARYING"],
    exemple: "-- Le nom du client, en VARCHAR puis en NVARCHAR\nSELECT nom, DATALENGTH(nom) AS octets_varchar,\n       DATALENGTH(CAST(nom AS NVARCHAR(60))) AS octets_nvarchar\nFROM client\nWHERE id IN (1, 5);",
    exemples: {
      snowflake: "-- Résultat : 8 et 13 octets dans les deux colonnes (UTF-8)\nSELECT nom, OCTET_LENGTH(nom) AS octets_varchar,\n       OCTET_LENGTH(CAST(nom AS NVARCHAR(60))) AS octets_nvarchar\nFROM client\nWHERE id IN (1, 5);",
      mysql: "-- Pas de CAST AS NVARCHAR : NCHAR. Résultat : 8 et 13 octets partout\nSELECT nom, LENGTH(nom) AS octets_varchar,\n       LENGTH(CAST(nom AS NCHAR(60))) AS octets_nvarchar\nFROM client\nWHERE id IN (1, 5);"
    },
    resultat: [["nom", "octets_varchar", "octets_nvarchar"], ["AquaBleu", 8, 16], ["Pool & Garden", 13, 26]],
    piege: "Une colonne NVARCHAR ne suffit pas : sans le N, `'Łódź'` passe d'abord par la page de codes de la base et perd ses lettres, sans erreur. Écris `N'Łódź'`, et déclare tes paramètres en NVARCHAR.",
    pratique: "Sur SQL Server 2019+, une collation `_UTF8` rend VARCHAR Unicode, plus léger pour du texte latin. Mais n y compte des octets : 'Épuisette' prend 10 octets pour 9 lettres.",
    motsCles: ["unicode", "texte unicode", "accents", "alphabet", "caractères étrangers", "polonais", "étranger", "national", "utf8", "utf-8", "n devant", "nvarchar max", "chinois"],
    voirAussi: ["varchar", "nchar", "types-texte", "cast"],
    module: "m03"
  },
  {
    id: "text",
    nom: "TEXT",
    type: "type",
    categorie: "Types de données",
    famille: "Textes",
    definition: "Un texte très long, comme un commentaire ou un message EDI brut ; son sens change selon le moteur.",
    moteurs: {
      sqlserver: "`TEXT` et `NTEXT` (2 Go) sont obsolètes : remplace-les par `VARCHAR(MAX)` et `NVARCHAR(MAX)`",
      snowflake: "`TEXT` est un simple synonyme de `VARCHAR`",
      mysql: "`TINYTEXT` (255 octets), `TEXT` (65 535 octets), `MEDIUMTEXT` (16 Mo), `LONGTEXT` (4 Go) ; un index ne prend que le début (préfixe)"
    },
    apercu: { sqlserver: "Obsolète : VARCHAR(MAX)", snowflake: "= VARCHAR", mysql: "TINYTEXT à LONGTEXT (4 Go)" },
    noms: ["TINYTEXT", "MEDIUMTEXT", "LONGTEXT", "NTEXT", "CLOB"],
    exemple: "-- Le contenu brut de chaque message EDI reçu\nCREATE TABLE message_brut (\n  flux_id INT          NOT NULL,\n  contenu VARCHAR(MAX) NOT NULL\n);",
    exemples: {
      snowflake: "-- Le contenu brut de chaque message EDI reçu\nCREATE TABLE message_brut (\n  flux_id INT     NOT NULL,\n  contenu VARCHAR NOT NULL   -- ou TEXT : c'est pareil\n);",
      mysql: "-- Le contenu brut de chaque message EDI reçu\nCREATE TABLE message_brut (\n  flux_id INT        NOT NULL,\n  contenu MEDIUMTEXT NOT NULL   -- 16 Mo ; TEXT s'arrête à 64 Ko\n);"
    },
    piege: "Sur MySQL, `TEXT` s'arrête à 65 535 octets : un gros message EDI est refusé (« Data too long »), et en utf8mb4 un « é » compte pour 2 octets. Prends `MEDIUMTEXT` (16 Mo).",
    pratique: "Sur SQL Server, migre une vieille colonne `TEXT` ou `NTEXT` en `VARCHAR(MAX)` ou `NVARCHAR(MAX)` : seules quelques fonctions (`SUBSTRING`, `PATINDEX`, `DATALENGTH`) acceptent ces anciens types.",
    motsCles: ["texte long", "commentaire", "message", "gros texte", "longtext", "mediumtext", "clob", "texte libre", "observations", "memo", "ntext", "tinytext"],
    voirAussi: ["varchar", "nvarchar", "blob"],
    module: "m10"
  },
  // ---------- Binaires ----------
  {
    id: "binary",
    nom: "BINARY",
    type: "type",
    categorie: "Types de données",
    famille: "Binaires",
    definition: "Des octets bruts de longueur fixe, pas du texte : une empreinte, un identifiant binaire.",
    moteurs: {
      sqlserver: "`BINARY(n)`, n de 1 à 8 000 octets ; complété à droite par des zéros (0x00)",
      snowflake: "`BINARY(n)` : longueur variable, rien n'est ajouté ; 8 Mo sans longueur, 64 Mo au plus",
      mysql: "`BINARY(n)`, n de 0 à 255 octets ; complété par des 0x00, qui restent à la lecture"
    },
    apercu: { sqlserver: "Fixe, 1 à 8 000 octets", snowflake: "Variable, jusqu'à 64 Mo", mysql: "Fixe, 0 à 255 octets" },
    exemple: "-- Le code PH-5 écrit en octets (affichés en hexadécimal)\nSELECT code,\n       CAST(code AS VARBINARY(8)) AS en_varbinary,\n       CAST(code AS BINARY(8))    AS en_binary\nFROM article\nWHERE id = 3;",
    exemples: {
      snowflake: "-- Un seul type binaire, sans complément ; affiché en hexadécimal\nSELECT code,\n       TO_BINARY(code, 'UTF-8') AS en_binary\nFROM article\nWHERE id = 3;",
      mysql: "-- HEX() affiche les octets\nSELECT code,\n       HEX(CAST(code AS BINARY))    AS en_varbinary,\n       HEX(CAST(code AS BINARY(8))) AS en_binary\nFROM article\nWHERE id = 3;"
    },
    resultat: [["code", "en_varbinary", "en_binary"], ["PH-5", "0x50482D35", "0x50482D3500000000"]],
    piege: "Sur Snowflake, `TO_BINARY('PH-5')` lit le texte comme de l'hexadécimal et plante (« isn't a legal hex-encoded string ») : écris `TO_BINARY(code, 'UTF-8')`. Et son BINARY ne complète jamais : il affiche 50482D35.",
    pratique: "Une empreinte SHA-256 fait toujours 32 octets : range-la en `BINARY(32)`, pas en texte de 64 caractères. `HASHBYTES('SHA2_256', x)` sur SQL Server, `SHA2_BINARY(x, 256)` sur Snowflake, `UNHEX(SHA2(x, 256))` sur MySQL.",
    motsCles: ["binaire", "octets", "hexadécimal", "hex", "empreinte", "hash", "sha", "taille fixe", "0x", "bytes", "données brutes"],
    voirAussi: ["varbinary", "blob", "cast", "uniqueidentifier"]
  },
  {
    id: "varbinary",
    nom: "VARBINARY",
    type: "type",
    categorie: "Types de données",
    famille: "Binaires",
    definition: "Des octets bruts de longueur variable : un fichier (PDF, image), une empreinte, une valeur chiffrée.",
    moteurs: {
      sqlserver: "`VARBINARY(n)`, n de 1 à 8 000 ; `VARBINARY(MAX)` jusqu'à 2 Go, qui remplace l'ancien `IMAGE`",
      snowflake: "`VARBINARY` = `BINARY` : 8 Mo sans longueur, 64 Mo au plus avec `BINARY(67108864)`",
      mysql: "`VARBINARY(n)`, n obligatoire, limité par les 65 535 octets de la ligne ; au-delà : `BLOB`"
    },
    apercu: { sqlserver: "8 000 octets ; MAX : 2 Go", snowflake: "= BINARY, 64 Mo max", mysql: "65 535 octets max ; puis BLOB" },
    noms: ["VARBINARY(MAX)", "BINARY VARYING"],
    exemple: "-- Les factures PDF, rangées telles quelles\nCREATE TABLE facture_pdf (\n  facture_id INT            NOT NULL,\n  fichier    VARBINARY(MAX) NOT NULL\n);",
    exemples: {
      snowflake: "-- Les factures PDF, rangées telles quelles\nCREATE TABLE facture_pdf (\n  facture_id INT              NOT NULL,\n  fichier    BINARY(67108864) NOT NULL   -- 64 Mo ; sans longueur : 8 Mo\n);",
      mysql: "-- Les factures PDF, rangées telles quelles\nCREATE TABLE facture_pdf (\n  facture_id INT      NOT NULL,\n  fichier    LONGBLOB NOT NULL   -- VARBINARY s'arrête à 64 Ko\n);"
    },
    piege: "Sur Snowflake, `BINARY` sans longueur s'arrête à 8 Mo, et on ne peut pas l'agrandir ensuite : un gros PDF sera refusé. Déclare `BINARY(67108864)` (64 Mo) dès la création de la table.",
    pratique: "Sur SQL Server, `VARBINARY` sans longueur vaut 1 octet dans une déclaration et 30 dans un `CAST`, comme VARCHAR : écris toujours la taille, ou `MAX`.",
    motsCles: ["binaire", "fichier", "pdf", "image", "document", "pièce jointe", "octets", "varbinary max", "stocker un fichier", "scan", "photo", "chiffré"],
    voirAussi: ["binary", "blob", "varchar"]
  },
  {
    id: "blob",
    nom: "BLOB",
    type: "type",
    categorie: "Types de données",
    famille: "Binaires",
    definition: "Un grand objet binaire : un fichier entier (PDF, photo, scan) rangé dans une colonne.",
    moteurs: {
      sqlserver: "Pas de BLOB : `VARBINARY(MAX)` (2 Go) ; l'ancien `IMAGE` est obsolète",
      snowflake: "Pas de BLOB : `BINARY` (64 Mo au plus)",
      mysql: "`TINYBLOB` (255 octets), `BLOB` (64 Ko), `MEDIUMBLOB` (16 Mo), `LONGBLOB` (4 Go)"
    },
    apercu: { sqlserver: "— (VARBINARY(MAX), 2 Go)", snowflake: "— (BINARY, 64 Mo)", mysql: "TINYBLOB à LONGBLOB (4 Go)" },
    noms: ["TINYBLOB", "MEDIUMBLOB", "LONGBLOB", "IMAGE", "LOB"],
    exemple: "-- La photo de chaque article du catalogue\nCREATE TABLE photo_article (\n  article_id INT            NOT NULL,\n  photo      VARBINARY(MAX) NOT NULL\n);",
    exemples: {
      snowflake: "-- La photo de chaque article du catalogue\nCREATE TABLE photo_article (\n  article_id INT              NOT NULL,\n  photo      BINARY(67108864) NOT NULL\n);",
      mysql: "-- La photo de chaque article du catalogue\nCREATE TABLE photo_article (\n  article_id INT        NOT NULL,\n  photo      MEDIUMBLOB NOT NULL   -- 16 Mo\n);"
    },
    piege: "Sur MySQL, `BLOB` tout court s'arrête à 64 Ko : une photo plus lourde est refusée (« Data too long »). Prends `MEDIUMBLOB` (16 Mo), ou `LONGBLOB`.",
    pratique: "Sur SQL Server, une vieille colonne `IMAGE` se migre en `VARBINARY(MAX)` : IMAGE est obsolète, comme TEXT et NTEXT, et Microsoft annonce son retrait.",
    motsCles: ["blob", "fichier", "image", "photo", "pdf", "pièce jointe", "longblob", "mediumblob", "gros fichier", "binaire", "document", "lob"],
    voirAussi: ["varbinary", "binary", "text"]
  },
  // ---------- Listes de valeurs ----------
  {
    id: "enum",
    nom: "ENUM",
    type: "type",
    categorie: "Types de données",
    famille: "Listes de valeurs",
    definition: "Une colonne qui n'accepte qu'une valeur d'une liste écrite dans la table, comme un statut.",
    moteurs: {
      sqlserver: "Pas d'ENUM : `VARCHAR` + `CHECK (statut IN ('EN_COURS', 'LIVREE', 'ANNULEE'))`, ou une table de référence",
      snowflake: "Pas d'ENUM : `VARCHAR` + `CHECK` (appliqué depuis avril 2026 ; pour l'instant, `COPY INTO` échoue sur une table qui en a un), ou une table de référence",
      mysql: "`ENUM('EN_COURS', 'LIVREE', 'ANNULEE')` : 65 535 valeurs au plus, 1 ou 2 octets ; valeur hors liste refusée en mode strict"
    },
    apercu: { sqlserver: "— (CHECK ou table de référence)", snowflake: "— (CHECK ou table de référence)", mysql: "65 535 valeurs, tri par rang" },
    exemple: "-- Les commandes par statut, triées (statut est un VARCHAR)\nSELECT statut, COUNT(*) AS nb\nFROM commande\nGROUP BY statut\nORDER BY statut;",
    exemples: {
      mysql: "-- statut devient un ENUM\nALTER TABLE commande MODIFY statut ENUM('EN_COURS', 'LIVREE', 'ANNULEE') NOT NULL;\nSELECT statut, COUNT(*) AS nb\nFROM commande\nGROUP BY statut\nORDER BY statut;"
    },
    resultat: [["statut", "nb"], ["ANNULEE", 1], ["EN_COURS", 3], ["LIVREE", 4]],
    piege: "Avec l'ENUM, MySQL trie dans l'ordre de la liste, pas de l'alphabet : EN_COURS (3), LIVREE (4), puis ANNULEE (1). Pour l'alphabet : `ORDER BY CAST(statut AS CHAR)`.",
    pratique: "Un nouveau statut (« FACTUREE ») oblige à modifier la table : `ALTER TABLE … MODIFY` sur MySQL. Une table de référence des statuts s'enrichit par un simple INSERT, sur les 3 moteurs.",
    motsCles: ["liste de choix", "liste de valeurs", "valeurs permises", "valeurs autorisées", "statut", "choix", "énumération", "enum", "menu déroulant", "une valeur parmi", "liste fermée"],
    voirAussi: ["set", "check", "foreign-key", "order-by"]
  },
  {
    id: "set",
    nom: "SET",
    type: "type",
    categorie: "Types de données",
    famille: "Listes de valeurs",
    definition: "Une colonne MySQL qui garde zéro, une ou plusieurs valeurs d'une liste, séparées par des virgules.",
    moteurs: {
      sqlserver: "Pas de SET : une table de liaison (une ligne par valeur), ou une colonne `BIT` par valeur",
      snowflake: "Pas de SET : une table de liaison, ou un `ARRAY` (test : `ARRAY_CONTAINS`)",
      mysql: "`SET('EDI', 'WEB', 'TEL')` : 64 valeurs au plus, 1 à 8 octets ; chercher : `FIND_IN_SET('EDI', canaux) > 0`"
    },
    apercu: { sqlserver: "— (table de liaison)", snowflake: "— (table de liaison, ARRAY)", mysql: "64 valeurs, 1 à 8 octets" },
    noms: ["FIND_IN_SET"],
    exemple: "-- MySQL seulement : les canaux de vente de chaque client\nCREATE TABLE client_canal (code VARCHAR(10) NOT NULL,\n  canaux SET('EDI', 'WEB', 'TEL') NOT NULL);\nINSERT INTO client_canal VALUES ('C001', 'EDI'), ('C002', 'TEL,WEB');\nSELECT code, canaux, FIND_IN_SET('WEB', canaux) > 0 AS vend_web\nFROM client_canal;",
    resultat: [["code", "canaux", "vend_web"], ["C001", "EDI", 0], ["C002", "WEB,TEL", 1]],
    piege: "MySQL range les valeurs dans l'ordre de la liste : 'TEL,WEB' devient 'WEB,TEL'. Et `canaux LIKE '%WEB%'` trouverait aussi une autre valeur qui contient WEB (« WEBSHOP ») : cherche avec `FIND_IN_SET`.",
    pratique: "Pour Power BI ou une migration, une table de liaison (client, canal), une ligne par canal, se filtre et se compte bien mieux qu'une liste dans une case.",
    motsCles: ["plusieurs valeurs", "choix multiple", "liste de choix", "cases à cocher", "set", "find_in_set", "plusieurs choix", "valeurs séparées par des virgules", "multi-valeurs", "options"],
    voirAussi: ["enum", "array", "string-split", "check"]
  },
  // ---------- Dates et heures ----------
  {
    id: "date",
    nom: "DATE",
    type: "type",
    categorie: "Types de données",
    famille: "Dates et heures",
    definition: "Une date seule, sans heure : le jour, le mois et l'année.",
    moteurs: {
      sqlserver: "`DATE` : du 0001-01-01 au 9999-12-31, 3 octets ; constante sûre : `'20260408'`",
      snowflake: "`DATE` : années 1582 à 9999 conseillées ; constante : `'2026-04-08'`",
      mysql: "`DATE` : du 1000-01-01 au 9999-12-31, 3 octets ; date impossible (30 février) refusée en mode strict"
    },
    apercu: { sqlserver: "An 1 à 9999, 3 octets", snowflake: "1582 à 9999 conseillé", mysql: "1000 à 9999, 3 octets" },
    exemple: "-- Les commandes passées depuis le 1er avril 2026\nSELECT num_cde, date_cde\nFROM commande\nWHERE date_cde >= '20260401';",
    exemples: {
      snowflake: "-- Les commandes passées depuis le 1er avril 2026\nSELECT num_cde, date_cde\nFROM commande\nWHERE date_cde >= '2026-04-01';",
      mysql: "-- Les commandes passées depuis le 1er avril 2026\nSELECT num_cde, date_cde\nFROM commande\nWHERE date_cde >= '2026-04-01';"
    },
    resultat: [["num_cde", "date_cde"], ["CDE-1005", "2026-04-01"], ["CDE-1006", "2026-04-03"], ["CDE-1007", "2026-04-07"], ["CDE-1008", "2026-04-10"]],
    piege: "Copiée sur Snowflake, la constante `'20260401'` est lue comme 20 260 401 secondes depuis 1970 (le 23 août 1970) : le filtre garde les 8 commandes, sans erreur. Écris `'2026-04-01'` sur Snowflake.",
    pratique: "Une date sans heure se range en `DATE`, pas en date avec heure : `WHERE date_cde = '20260401'` marche alors sans souci d'heure. Sur SQL Server, elle prend 3 octets au lieu de 8.",
    motsCles: ["date", "date seule", "sans heure", "date sans heure", "type date", "calendrier", "échéance", "date de livraison", "jj/mm/aaaa", "aaaa-mm-jj"],
    voirAussi: ["datetime2", "current-date", "dateadd", "datefromparts", "convert"],
    module: "m03"
  },
  {
    id: "time",
    nom: "TIME",
    type: "type",
    categorie: "Types de données",
    famille: "Dates et heures",
    definition: "Une heure de la journée, sans date : les heures, les minutes et les secondes.",
    moteurs: {
      sqlserver: "`TIME(n)` : 00:00:00 à 23:59:59.9999999 ; n de 0 à 7 décimales (7 par défaut), 3 à 5 octets",
      snowflake: "`TIME(n)` : 00:00:00 à 23:59:59.999999999 ; n de 0 à 9 (9 par défaut) ; sans fuseau",
      mysql: "`TIME(n)` : de -838:59:59 à 838:59:59, car c'est aussi une durée ; n de 0 à 6 (0 par défaut)"
    },
    apercu: { sqlserver: "0 à 7 décimales (100 ns)", snowflake: "0 à 9 décimales (ns)", mysql: "± 838 h : aussi une durée" },
    exemple: "-- L'heure de réception des commandes EDI d'AquaBleu\nSELECT id, CAST(date_recu AS TIME(0)) AS heure\nFROM flux_edi\nWHERE partenaire = 'AquaBleu' AND type = 'ORDERS';",
    resultat: [["id", "heure"], [1, "06:10:00"], [2, "06:12:00"], [3, "06:05:00"], [5, "06:08:00"]],
    piege: "Une durée n'est pas une heure : sur SQL Server et Snowflake, TIME s'arrête à 23:59:59, et une attente de 26 h est refusée. Compte la durée en minutes : `DATEDIFF(minute, debut, fin)`.",
    pratique: "Sur MySQL, une heure écrite sans deux-points est lue comme une durée : '1112' donne 00:11:12, pas 11:12. Dans tes fichiers, exige le format 'hh:mm:ss'.",
    motsCles: ["heure", "horaire", "heure seule", "créneau", "heure de réception", "sans date", "heure de la journée", "hh:mm:ss", "durée", "time", "type heure"],
    voirAussi: ["datetime2", "datediff", "datepart", "date"],
    module: "m02"
  },
  {
    id: "datetime",
    nom: "DATETIME",
    type: "type",
    categorie: "Types de données",
    famille: "Dates et heures",
    definition: "Une date et une heure dans une seule colonne ; sa précision et ses limites changent selon le moteur.",
    moteurs: {
      sqlserver: "`DATETIME` : 1753 à 9999, 8 octets, arrondi à .000, .003 ou .007 seconde ; type ancien, préfère `DATETIME2`",
      snowflake: "`DATETIME` = `TIMESTAMP_NTZ` : sans fuseau, jusqu'à la nanoseconde",
      mysql: "`DATETIME(n)` : 1000 à 9999, sans fuseau ; n de 0 à 6 décimales, 0 par défaut (arrondi à la seconde)"
    },
    apercu: { sqlserver: "1753 à 9999, arrondi 1/300 s", snowflake: "= TIMESTAMP_NTZ", mysql: "1000 à 9999 ; défaut : seconde" },
    exemple: "-- La fin de journée, écrite au millième\nSELECT CAST('20261031 23:59:59.999' AS DATETIME)     AS en_datetime,\n       CAST('20261031 23:59:59.999' AS DATETIME2(3)) AS en_datetime2;",
    exemples: {
      snowflake: "-- La fin de journée, écrite au millième\nSELECT CAST('2026-10-31 23:59:59.999' AS DATETIME) AS en_datetime;",
      mysql: "-- La fin de journée, écrite au millième\nSELECT CAST('2026-10-31 23:59:59.999' AS DATETIME)    AS en_datetime,\n       CAST('2026-10-31 23:59:59.999' AS DATETIME(3)) AS en_datetime3;"
    },
    resultat: [["en_datetime", "en_datetime2"], ["2026-11-01 00:00:00.000", "2026-10-31 23:59:59.999"]],
    piege: "Arrondi au lendemain, sans erreur : `BETWEEN '20261001' AND '20261031 23:59:59.999'` prend aussi les commandes du 1er novembre à minuit. MySQL arrondit pareil un DATETIME sans décimale (Snowflake garde .999) : filtre avec `>= '20261001' AND < '20261101'`.",
    pratique: "Pour un nouvel horodatage sur SQL Server, prends `DATETIME2(0)` (à la seconde, 6 octets) ou `DATETIME2(3)` (au millième, 7 octets) : plus précis et plus léger que DATETIME (8 octets).",
    motsCles: ["date et heure", "date avec heure", "horodatage", "heure", "arrondi", "millisecondes", "fin de journée", "23:59:59", "datetime", "date heure", "moment"],
    voirAussi: ["datetime2", "smalldatetime", "between", "timestamp-ntz", "getdate"],
    module: "m10"
  },
  {
    id: "datetime2",
    nom: "DATETIME2",
    type: "type",
    categorie: "Types de données",
    famille: "Dates et heures",
    definition: "La date avec l'heure moderne de SQL Server : de l'an 1 à 9999, avec la précision choisie.",
    moteurs: {
      sqlserver: "`DATETIME2(n)` : 0001 à 9999, n de 0 à 7 décimales (7 par défaut), 6 à 8 octets ; sans fuseau",
      snowflake: "Pas de DATETIME2 : `TIMESTAMP_NTZ(n)`, n de 0 à 9",
      mysql: "Pas de DATETIME2 : `DATETIME(n)`, n de 0 à 6"
    },
    apercu: { sqlserver: "Précision 0 à 7, sans fuseau", snowflake: "— (TIMESTAMP_NTZ)", mysql: "— (DATETIME(n))" },
    exemple: "-- L'heure de deux flux : 7 décimales par défaut, ou à la seconde\nSELECT id, CAST(date_recu AS DATETIME2)    AS par_defaut,\n           CAST(date_recu AS DATETIME2(0)) AS a_la_seconde\nFROM flux_edi\nWHERE id IN (1, 6);",
    exemples: {
      snowflake: "-- L'équivalent : TIMESTAMP_NTZ (résultat : la colonne a_la_seconde)\nSELECT id, CAST(date_recu AS TIMESTAMP_NTZ(0)) AS a_la_seconde\nFROM flux_edi\nWHERE id IN (1, 6);",
      mysql: "-- L'équivalent : DATETIME, 0 décimale par défaut (résultat : a_la_seconde)\nSELECT id, CAST(date_recu AS DATETIME) AS a_la_seconde\nFROM flux_edi\nWHERE id IN (1, 6);"
    },
    resultat: [["id", "par_defaut", "a_la_seconde"], [1, "2026-03-02 06:10:00.0000000", "2026-03-02 06:10:00"], [6, "2026-04-08 17:30:00.0000000", "2026-04-08 17:30:00"]],
    piege: "Sans précision, `DATETIME2` vaut `DATETIME2(7)` : 7 décimales à l'affichage et dans les exports, et 8 octets par valeur. Pour un horodatage de flux, `DATETIME2(0)` (6 octets) suffit.",
    pratique: "Horodate tes flux avec `SYSUTCDATETIME()` (l'heure UTC, en DATETIME2) plutôt qu'avec `GETDATE()` (l'heure du serveur, en DATETIME) ; convertis à l'affichage avec `AT TIME ZONE`.",
    motsCles: ["date et heure", "horodatage", "précision", "date heure moderne", "nanosecondes", "décimales", "secondes", "date avec heure", "heure précise", "datetime2"],
    voirAussi: ["datetime", "datetimeoffset", "timestamp-ntz", "getdate", "types-date"],
    module: "m10"
  },
  {
    id: "smalldatetime",
    nom: "SMALLDATETIME",
    type: "type",
    categorie: "Types de données",
    famille: "Dates et heures",
    definition: "Une date avec l'heure à la minute près, de 1900 à 2079 : un ancien type de SQL Server.",
    moteurs: {
      sqlserver: "`SMALLDATETIME` : 1900-01-01 à 2079-06-06, 4 octets ; secondes arrondies à la minute (29,998 s en dessous, 29,999 s au-dessus)",
      snowflake: "Pas de SMALLDATETIME : `TIMESTAMP_NTZ(0)`, ou `DATE_TRUNC('minute', ts)` pour couper",
      mysql: "Pas de SMALLDATETIME : `DATETIME` (à la seconde)"
    },
    apercu: { sqlserver: "1900 à 2079, à la minute", snowflake: "— (TIMESTAMP_NTZ(0))", mysql: "— (DATETIME)" },
    exemple: "-- SQL Server : deux heures de flux, à 29 et à 30 secondes\nSELECT CAST('20260408 17:30:29' AS SMALLDATETIME) AS a_29_s,\n       CAST('20260408 17:30:30' AS SMALLDATETIME) AS a_30_s;",
    resultat: [["a_29_s", "a_30_s"], ["2026-04-08 17:30:00", "2026-04-08 17:31:00"]],
    piege: "SMALLDATETIME s'arrête au 6 juin 2079 : une date de fin « sans limite » comme '9999-12-31', courante pour une fin de validité, est refusée (erreur de dépassement).",
    pratique: "Pour une nouvelle colonne, Microsoft conseille `DATETIME2` : `DATETIME2(0)` va à la seconde, sur 6 octets, de l'an 1 à 9999.",
    motsCles: ["date à la minute", "minute", "smalldatetime", "petite date", "2079", "date heure", "arrondi minute", "rendez-vous", "heure de livraison"],
    voirAussi: ["datetime", "datetime2", "date"]
  },
  {
    id: "datetimeoffset",
    nom: "DATETIMEOFFSET",
    type: "type",
    categorie: "Types de données",
    famille: "Dates et heures",
    definition: "Une date avec l'heure et son décalage par rapport à l'heure universelle (UTC), par exemple +02:00.",
    moteurs: {
      sqlserver: "`DATETIMEOFFSET(n)` : 0001 à 9999, décalage de -14:00 à +14:00, 8 à 10 octets ; comparé et trié en UTC",
      snowflake: "Pas de DATETIMEOFFSET : `TIMESTAMP_TZ`, qui garde aussi le décalage",
      mysql: "Pas de type avec décalage : `DATETIME` en UTC ; `CONVERT_TZ()` pour l'heure locale"
    },
    apercu: { sqlserver: "Décalage −14:00 à +14:00", snowflake: "— (TIMESTAMP_TZ)", mysql: "— (DATETIME en UTC)" },
    exemple: "-- Les heures de réception (en UTC), vues à l'heure de Paris\nSELECT id, CAST(date_recu AS DATETIME2(0)) AT TIME ZONE 'UTC'\n             AT TIME ZONE 'Romance Standard Time' AS heure_paris\nFROM flux_edi\nWHERE id IN (1, 6);",
    exemples: {
      snowflake: "-- Heures de Paris, sans le décalage : 2026-03-02 07:10:00.000…\nSELECT id, CONVERT_TIMEZONE('UTC', 'Europe/Paris', date_recu) AS heure_paris\nFROM flux_edi\nWHERE id IN (1, 6);",
      mysql: "-- Tables de fuseaux chargées : 2026-03-02 07:10:00… ; sinon NULL\nSELECT id, CONVERT_TZ(date_recu, '+00:00', 'Europe/Paris') AS heure_paris\nFROM flux_edi\nWHERE id IN (1, 6);"
    },
    resultat: [["id", "heure_paris"], [1, "2026-03-02 07:10:00 +01:00"], [6, "2026-04-08 19:30:00 +02:00"]],
    piege: "Un `CAST` vers `DATETIME2` jette le décalage sans convertir : '17:30 +02:00' devient 17:30, pas 15:30 UTC. Pour passer en UTC, écris d'abord `AT TIME ZONE 'UTC'`.",
    pratique: "Sur MySQL, `CONVERT_TZ(d, '+00:00', 'Europe/Paris')` renvoie NULL tant que les tables de fuseaux ne sont pas chargées ; avec des décalages chiffrés ('+01:00'), il marche toujours, mais sans heure d'été.",
    motsCles: ["fuseau horaire", "fuseau", "décalage", "utc", "heure d'été", "heure locale", "timezone", "international", "offset", "heure universelle", "at time zone", "paris"],
    voirAussi: ["datetime2", "timestamp-tz", "getdate", "types-date"],
    module: "m10"
  },
  {
    id: "timestamp",
    nom: "TIMESTAMP",
    type: "type",
    categorie: "Types de données",
    famille: "Dates et heures",
    definition: "Un mot piège : une date avec l'heure sur Snowflake et MySQL, mais un compteur de version sur SQL Server.",
    moteurs: {
      sqlserver: "`TIMESTAMP` = `ROWVERSION` : un numéro de version de ligne sur 8 octets, pas une date (ce nom est obsolète)",
      snowflake: "`TIMESTAMP` : un alias, `TIMESTAMP_NTZ` par défaut, choisi par le paramètre `TIMESTAMP_TYPE_MAPPING`",
      mysql: "`TIMESTAMP(n)` : rangé en UTC, montré au fuseau de la session ; du 1970-01-01 00:00:01 au 2038-01-19 03:14:07 UTC"
    },
    apercu: { sqlserver: "= ROWVERSION, pas une date", snowflake: "Alias, TIMESTAMP_NTZ par défaut", mysql: "UTC, de 1970 à 2038" },
    noms: ["TIMESTAMP_TYPE_MAPPING"],
    exemple: "-- La même table, créée sur les 3 moteurs\nCREATE TABLE flux_recu (id INT NOT NULL, recu_le TIMESTAMP);\nINSERT INTO flux_recu (id, recu_le) VALUES (1, '2026-04-08 17:30:00');",
    resultat: "SQL Server : INSERT refusé (Msg 273, on ne peut pas écrire dans une colonne timestamp). Snowflake et MySQL : la ligne entre, avec 2026-04-08 17:30:00.",
    piege: "Une table recopiée de MySQL ou de Snowflake vers SQL Server garde son `TIMESTAMP` et refuse tes dates : écris `DATETIME2(0)`. Sur Snowflake, `TIMESTAMP_TYPE_MAPPING` ne change que les colonnes créées ensuite.",
    pratique: "Sur MySQL, TIMESTAMP s'arrête au 19 janvier 2038 : une fin de contrat lointaine est refusée. Garde-le pour l'horodatage technique ; une date métier va en `DATETIME`.",
    motsCles: ["timestamp", "horodatage", "date et heure", "2038", "rowversion", "msg 273", "timestamp_type_mapping", "heure de création", "date heure", "piège", "version de ligne"],
    voirAussi: ["rowversion", "timestamp-ntz", "datetime2", "datetime", "types-date"],
    module: "m10"
  },
  {
    id: "timestamp-ntz",
    nom: "TIMESTAMP_NTZ",
    type: "type",
    categorie: "Types de données",
    famille: "Dates et heures",
    definition: "Un horodatage Snowflake sans fuseau : la date et l'heure sont gardées telles qu'elles sont écrites.",
    moteurs: {
      sqlserver: "Pas de TIMESTAMP_NTZ : `DATETIME2(n)`, sans fuseau",
      snowflake: "`TIMESTAMP_NTZ(n)`, n de 0 à 9 (9 par défaut) ; = `DATETIME` ; le sens de `TIMESTAMP` par défaut ; un décalage saisi est ignoré",
      mysql: "Pas de TIMESTAMP_NTZ : `DATETIME(n)`, sans fuseau"
    },
    apercu: { sqlserver: "— (DATETIME2)", snowflake: "Sans fuseau ; défaut de TIMESTAMP", mysql: "— (DATETIME)" },
    noms: ["TIMESTAMPNTZ", "TIMESTAMP WITHOUT TIME ZONE"],
    exemple: "-- Snowflake : deux heures saisies, avec et sans décalage\nCREATE TABLE reception (id INT, recu_le TIMESTAMP_NTZ);\nINSERT INTO reception VALUES (1, '2026-04-08 17:30:00'), (2, '2026-04-08 17:30:00 +02:00');\nSELECT id, recu_le FROM reception ORDER BY id;",
    resultat: [["id", "recu_le"], [1, "2026-04-08 17:30:00.000"], [2, "2026-04-08 17:30:00.000"]],
    piege: "Le décalage saisi est jeté, sans conversion : '17:30 +02:00' est rangé 17:30, pas 15:30 UTC. Des flux de plusieurs pays deviennent incomparables : convertis-les d'abord en UTC (`CONVERT_TIMEZONE`), ou prends `TIMESTAMP_TZ`.",
    pratique: "C'est l'équivalent exact d'un `DATETIME2` (SQL Server) ou d'un `DATETIME` (MySQL) : une table copiée vers Snowflake garde ses heures, quel que soit le fuseau de la session.",
    motsCles: ["ntz", "sans fuseau", "no time zone", "horodatage", "date et heure", "heure locale", "heure murale", "timestamp_ntz", "datetime snowflake", "wallclock"],
    voirAussi: ["timestamp", "timestamp-ltz", "timestamp-tz", "datetime2", "types-date"],
    module: "m03"
  },
  {
    id: "timestamp-ltz",
    nom: "TIMESTAMP_LTZ",
    type: "type",
    categorie: "Types de données",
    famille: "Dates et heures",
    definition: "Un horodatage Snowflake rangé en UTC, puis affiché dans le fuseau horaire de la session.",
    moteurs: {
      sqlserver: "Pas de TIMESTAMP_LTZ : `DATETIMEOFFSET`, ou `DATETIME2` en UTC puis `AT TIME ZONE` à l'affichage",
      snowflake: "`TIMESTAMP_LTZ(n)` : rangé en UTC, montré au fuseau du paramètre `TIMEZONE` (America/Los_Angeles par défaut)",
      mysql: "Pas de TIMESTAMP_LTZ : le `TIMESTAMP` de MySQL fait pareil (UTC, fuseau `time_zone` de la session)"
    },
    apercu: { sqlserver: "— (DATETIMEOFFSET + AT TIME ZONE)", snowflake: "UTC, montré au fuseau session", mysql: "— (TIMESTAMP : UTC, fuseau session)" },
    noms: ["TIMESTAMPLTZ", "TIMESTAMP WITH LOCAL TIME ZONE"],
    exemple: "-- Snowflake : un flux reçu à 15 h 30 UTC, lu depuis Paris\nCREATE TABLE reception_ltz (id INT, recu_le TIMESTAMP_LTZ);\nINSERT INTO reception_ltz VALUES (6, '2026-04-08 15:30:00 +00:00');\nALTER SESSION SET TIMEZONE = 'Europe/Paris';\nSELECT id, recu_le, HOUR(recu_le) AS heure FROM reception_ltz;",
    resultat: [["id", "recu_le", "heure"], [6, "2026-04-08 17:30:00.000 +0200", 17]],
    piege: "Le même rapport change d'heures selon la session qui le lance : le fuseau par défaut est America/Los_Angeles (Californie). Fixe `TIMEZONE` au début du script, ou une fois pour ton utilisateur.",
    pratique: "Pour des horodatages techniques (chargements, journaux), LTZ est pratique : tout est rangé en UTC, donc les comparaisons restent justes, et chacun lit son heure locale.",
    motsCles: ["ltz", "fuseau de la session", "heure locale", "local time zone", "timestamp_ltz", "utc", "fuseau horaire", "timezone", "alter session", "horodatage", "los angeles"],
    voirAussi: ["timestamp-ntz", "timestamp-tz", "timestamp", "getdate"],
    module: "m03"
  },
  {
    id: "timestamp-tz",
    nom: "TIMESTAMP_TZ",
    type: "type",
    categorie: "Types de données",
    famille: "Dates et heures",
    definition: "Un horodatage Snowflake qui garde, pour chaque valeur, son décalage par rapport à UTC (+02:00…).",
    moteurs: {
      sqlserver: "Pas de TIMESTAMP_TZ : `DATETIMEOFFSET(n)` fait la même chose",
      snowflake: "`TIMESTAMP_TZ(n)` : UTC + le décalage de chaque valeur ; sans décalage saisi, celui de la session ; comparé en UTC",
      mysql: "Pas de type avec décalage : un `DATETIME` en UTC, plus une colonne pour le fuseau d'origine"
    },
    apercu: { sqlserver: "— (DATETIMEOFFSET)", snowflake: "UTC + décalage de la valeur", mysql: "— (DATETIME UTC + fuseau)" },
    noms: ["TIMESTAMPTZ", "TIMESTAMP WITH TIME ZONE"],
    exemple: "-- Snowflake : une échéance à 6 mois, partie d'une heure d'hiver à Paris\nSELECT '2026-01-15 12:00:00 +01:00'::TIMESTAMP_TZ AS depart,\n       DATEADD(month, 6, '2026-01-15 12:00:00 +01:00'::TIMESTAMP_TZ) AS a_6_mois;",
    resultat: [["depart", "a_6_mois"], ["2026-01-15 12:00:00.000 +0100", "2026-07-15 12:00:00.000 +0100"]],
    piege: "TIMESTAMP_TZ garde le décalage, pas le fuseau : 6 mois plus tard, il reste +01:00 alors que Paris est à +02:00 en juillet. Pour l'heure locale juste, recalcule avec `CONVERT_TIMEZONE('Europe/Paris', …)`.",
    pratique: "Deux valeurs sont égales si elles désignent le même instant UTC : '17:30 +02:00' = '16:30 +01:00' est vrai. Pratique pour repérer un même flux reçu de deux pays.",
    motsCles: ["tz", "fuseau", "décalage", "time zone", "timestamp_tz", "offset", "heure d'été", "international", "utc", "fuseau horaire", "avec fuseau"],
    voirAussi: ["datetimeoffset", "timestamp-ntz", "timestamp-ltz", "timestamp"],
    module: "m03"
  },
  {
    id: "year",
    nom: "YEAR",
    type: "type",
    categorie: "Types de données",
    famille: "Dates et heures",
    definition: "Une année seule, sur 1 octet, de 1901 à 2155 : un type propre à MySQL.",
    moteurs: {
      sqlserver: "Pas de YEAR : `SMALLINT`, ou une `DATE` au 1er janvier ; `YEAR(d)` est une fonction",
      snowflake: "Pas de YEAR : `NUMBER(4,0)`, ou une `DATE` ; `YEAR(d)` est une fonction",
      mysql: "`YEAR` : 1901 à 2155 (et 0000), 1 octet ; `YEAR(4)` est obsolète, `YEAR(2)` refusé"
    },
    apercu: { sqlserver: "— (SMALLINT ou DATE)", snowflake: "— (NUMBER ou DATE)", mysql: "1901 à 2155, 1 octet" },
    exemple: "-- MySQL seulement : des fins de contrat saisies sur 2 chiffres\nCREATE TABLE contrat (num VARCHAR(10) NOT NULL, annee_fin YEAR NOT NULL);\nINSERT INTO contrat VALUES ('CT-1', '2069'), ('CT-2', '69'), ('CT-3', '70');\nSELECT num, annee_fin FROM contrat;",
    resultat: [["num", "annee_fin"], ["CT-1", 2069], ["CT-2", 2069], ["CT-3", 1970]],
    piege: "Une année sur 2 chiffres est devinée : 69 donne 2069, mais 70 donne 1970. Et 0 (un nombre) donne 0000, '0' (un texte) donne 2000 : exige 4 chiffres dans tes fichiers.",
    pratique: "Pour un exercice comptable ou un millésime, une colonne `annee SMALLINT` marche sur les 3 moteurs (Snowflake : NUMBER) ; YEAR n'existe que sur MySQL et s'arrête à 2155.",
    motsCles: ["année", "annee", "an", "année seule", "millésime", "exercice", "year", "4 chiffres", "2 chiffres", "type année"],
    voirAussi: ["date", "datepart"]
  },
  // ---------- Semi-structurés ----------
  {
    id: "json",
    nom: "JSON",
    type: "type",
    categorie: "Types de données",
    famille: "Semi-structurés",
    definition: "Un document JSON, des clés et des valeurs entre accolades, rangé dans une colonne et lu par chemin.",
    moteurs: {
      sqlserver: "Type `json` depuis SQL Server 2025 (objet ou tableau, 2 Go au plus) ; avant : `NVARCHAR(MAX)` + `CHECK (ISJSON(doc) = 1)`",
      snowflake: "Pas de type JSON : `VARIANT`, rempli par `PARSE_JSON(texte)`, lu par `doc:client::STRING`",
      mysql: "`JSON` : validé à l'écriture (erreur 3140 sinon), taille limitée par `max_allowed_packet` ; lu par `doc ->> '$.client'`"
    },
    apercu: { sqlserver: "json (2025) ; avant NVARCHAR(MAX)", snowflake: "— (VARIANT)", mysql: "JSON validé à l'écriture" },
    noms: ["ISJSON"],
    exemple: "-- SQL Server 2025 : les messages EDI reçus en JSON\nCREATE TABLE message_json (flux_id INT NOT NULL, doc JSON NOT NULL);\nINSERT INTO message_json VALUES (5, '{\"cde\": \"CDE-1007\", \"client\": \"C001\"}');\nSELECT flux_id, JSON_VALUE(doc, '$.cde') AS cde FROM message_json;",
    exemples: {
      snowflake: "CREATE TABLE message_json (flux_id INT NOT NULL, doc VARIANT NOT NULL);\nINSERT INTO message_json\n  SELECT 5, PARSE_JSON('{\"cde\": \"CDE-1007\", \"client\": \"C001\"}');\nSELECT flux_id, doc:cde::STRING AS cde FROM message_json;",
      mysql: "CREATE TABLE message_json (flux_id INT NOT NULL, doc JSON NOT NULL);\nINSERT INTO message_json VALUES (5, '{\"cde\": \"CDE-1007\", \"client\": \"C001\"}');\nSELECT flux_id, doc ->> '$.cde' AS cde FROM message_json;"
    },
    resultat: [["flux_id", "cde"], [5, "CDE-1007"]],
    piege: "Une clé en double (`{\"cde\": \"A\", \"cde\": \"B\"}`) donne trois résultats : le type json de SQL Server garde la 1re valeur, MySQL la dernière, et `PARSE_JSON` de Snowflake refuse le message. Contrôle tes flux à l'entrée.",
    pratique: "Sur SQL Server, `JSON_VALUE` renvoie au plus 4 000 caractères : au-delà, il rend NULL sans erreur (mode lax). Pour un long texte, lis-le avec `OPENJSON`.",
    motsCles: ["document", "api", "message", "clé valeur", "semi-structuré", "flux json", "json", "stocker du json", "isjson", "json_value", "web service", "type json"],
    voirAussi: ["type-variant", "variant", "flatten", "xml", "check"],
    module: "m10"
  },
  {
    id: "xml",
    nom: "XML",
    type: "type",
    categorie: "Types de données",
    famille: "Semi-structurés",
    definition: "Un document XML, avec ses balises ouvrantes et fermantes, rangé dans une colonne et lu avec des chemins.",
    moteurs: {
      sqlserver: "`XML` : 2 Go au plus ; lu par `doc.value('(/DESADV/cde)[1]', 'varchar(10)')`, `.nodes()`, `.exist()`",
      snowflake: "Pas de type XML : `PARSE_XML(texte)` donne un `OBJECT` (dans un `VARIANT`), lu avec `XMLGET` et `GET(…, '$')`",
      mysql: "Pas de type XML : du texte (`TEXT`), lu avec `ExtractValue(doc, '/DESADV/cde')`"
    },
    apercu: { sqlserver: "XML natif, 2 Go max", snowflake: "— (VARIANT via PARSE_XML)", mysql: "— (TEXT + ExtractValue)" },
    noms: ["PARSE_XML", "XMLGET", "EXTRACTVALUE"],
    exemple: "-- Un avis d'expédition (DESADV) reçu en XML\nDECLARE @msg XML = '<DESADV><cde>CDE-1007</cde><ligne art=\"CHL-5\" qte=\"150\"/></DESADV>';\nSELECT @msg.value('(/DESADV/cde)[1]', 'varchar(10)')  AS cde,\n       @msg.value('(/DESADV/ligne/@qte)[1]', 'int')    AS qte;",
    exemples: {
      snowflake: "-- Un avis d'expédition (DESADV) reçu en XML\nSELECT GET(XMLGET(doc, 'cde'), '$')::STRING  AS cde,\n       GET(XMLGET(doc, 'ligne'), '@qte')::INT AS qte\nFROM (SELECT PARSE_XML('<DESADV><cde>CDE-1007</cde><ligne art=\"CHL-5\" qte=\"150\"/></DESADV>') AS doc);",
      mysql: "-- Un avis d'expédition (DESADV) reçu en XML\nSET @msg = '<DESADV><cde>CDE-1007</cde><ligne art=\"CHL-5\" qte=\"150\"/></DESADV>';\nSELECT ExtractValue(@msg, '/DESADV/cde')        AS cde,\n       ExtractValue(@msg, '/DESADV/ligne/@qte') AS qte;"
    },
    resultat: [["cde", "qte"], ["CDE-1007", 150]],
    piege: "Les balises tiennent compte de la casse : `/desadv/cde` ne trouve rien, sans erreur (NULL sur SQL Server, texte vide sur MySQL). Et sans `[1]`, `.value()` plante sur SQL Server : il veut une seule valeur.",
    pratique: "Sur Snowflake, `XMLGET(doc, 'ligne', 1)` donne la 2e ligne : le numéro commence à 0. Sur SQL Server, `(/DESADV/ligne)[1]` vise la 1re.",
    motsCles: ["xml", "balise", "balises", "document xml", "xquery", "xpath", "chemin", "attribut", "message", "parse_xml", "extractvalue", "edi xml"],
    voirAussi: ["json", "type-variant", "object"]
  },
  {
    id: "type-variant",
    nom: "VARIANT",
    type: "type",
    categorie: "Types de données",
    famille: "Semi-structurés",
    definition: "Le type Snowflake qui accepte n'importe quelle valeur : nombre, texte, date, objet ou tableau JSON.",
    moteurs: {
      sqlserver: "Pas de VARIANT : `json` (2025) ou `NVARCHAR(MAX)` pour du JSON ; `SQL_VARIANT` pour une valeur simple",
      snowflake: "`VARIANT` : 128 Mo au plus ; garde la valeur et son type (`TYPEOF(v)`) ; reçoit le JSON chargé tel quel",
      mysql: "Pas de VARIANT : `JSON`"
    },
    apercu: { sqlserver: "— (json, SQL_VARIANT)", snowflake: "Toute valeur, 128 Mo max", mysql: "— (JSON)" },
    noms: ["TO_VARIANT", "IS_NULL_VALUE"],
    exemple: "-- Snowflake : un accusé de réception EDI dont le motif vaut null\nSELECT doc:motif IS NULL          AS null_sql,\n       IS_NULL_VALUE(doc:motif)   AS null_json,\n       doc:motif::STRING IS NULL  AS vide_apres_cast\nFROM (SELECT PARSE_JSON('{\"flux\": 5, \"motif\": null}') AS doc);",
    resultat: [["null_sql", "null_json", "vide_apres_cast"], ["FALSE", "TRUE", "TRUE"]],
    piege: "Un `null` JSON n'est pas un NULL SQL : `WHERE doc:motif IS NULL` oublie les messages où `\"motif\": null`, sans erreur. Teste `doc:motif::STRING IS NULL`, qui attrape les deux cas.",
    pratique: "Une date dans un VARIANT est rangée en texte : convertis-la (`doc:date_recu::TIMESTAMP_NTZ`) avant de calculer un écart ou de filtrer une période.",
    motsCles: ["variant", "json", "semi-structuré", "n'importe quel type", "type libre", "null json", "parse_json", "snowflake json", "typeof", "valeur", "document"],
    voirAussi: ["variant", "object", "array", "json", "flatten"],
    module: "m14"
  },
  {
    id: "object",
    nom: "OBJECT",
    type: "type",
    categorie: "Types de données",
    famille: "Semi-structurés",
    definition: "Un objet Snowflake : des paires clé-valeur, comme un objet JSON entre accolades.",
    moteurs: {
      sqlserver: "Pas de type OBJECT : un objet JSON (`json` en 2025, ou `NVARCHAR(MAX)`), créé par `JSON_OBJECT()` (2022+)",
      snowflake: "`OBJECT` : clés en texte, valeurs `VARIANT`, 128 Mo au plus ; `OBJECT_CONSTRUCT(…)` ou `{…}` ; `OBJECT(cle TYPE, …)` typé",
      mysql: "Pas de type OBJECT : un objet dans une colonne `JSON`, créé par `JSON_OBJECT()`"
    },
    apercu: { sqlserver: "— (JSON_OBJECT, 2022+)", snowflake: "Clé-valeur, 128 Mo max", mysql: "— (JSON_OBJECT dans un JSON)" },
    noms: ["OBJECT_CONSTRUCT", "JSON_OBJECT"],
    exemple: "-- La fiche client en objet JSON, pour une API (C007 n'a pas de ville)\nSELECT JSON_OBJECT('code': code, 'ville': ville) AS doc\nFROM client\nWHERE id = 7;",
    exemples: {
      snowflake: "-- La fiche client en objet JSON, pour une API (C007 n'a pas de ville)\nSELECT OBJECT_CONSTRUCT('code', code, 'ville', ville) AS doc\nFROM client\nWHERE id = 7;",
      mysql: "-- La fiche client en objet JSON, pour une API (C007 n'a pas de ville)\nSELECT JSON_OBJECT('code', code, 'ville', ville) AS doc\nFROM client\nWHERE id = 7;"
    },
    resultat: [["doc"], ["{\"code\":\"C007\",\"ville\":null}"]],
    piege: "Sur Snowflake, `OBJECT_CONSTRUCT` supprime la paire dont la valeur est NULL : le partenaire reçoit `{\"code\": \"C007\"}`, sans « ville ». Pour la garder à null : `OBJECT_CONSTRUCT_KEEP_NULL`.",
    pratique: "Snowflake et MySQL ne gardent pas l'ordre de saisie des clés : ne compte jamais sur la position d'une clé dans un objet, lis-la toujours par son nom.",
    motsCles: ["objet", "object", "clé valeur", "objet json", "accolades", "object_construct", "json_object", "dictionnaire", "construire un json", "api", "paires"],
    voirAussi: ["type-variant", "array", "json", "variant"],
    module: "m14"
  },
  {
    id: "array",
    nom: "ARRAY",
    type: "type",
    categorie: "Types de données",
    famille: "Semi-structurés",
    definition: "Une liste ordonnée de valeurs dans une seule case, comme un tableau JSON entre crochets.",
    moteurs: {
      sqlserver: "Pas de type ARRAY : un tableau JSON, créé par `JSON_ARRAY()` (2022+), lu par `OPENJSON`",
      snowflake: "`ARRAY` : éléments `VARIANT`, numérotés à partir de 0 ; `ARRAY(NUMBER)` typé ; `ARRAY_AGG`, `ARRAY_CONTAINS`, `FLATTEN`",
      mysql: "Pas de type ARRAY : un tableau dans une colonne `JSON` (`JSON_ARRAYAGG`, et `JSON_TABLE` pour le lire)"
    },
    apercu: { sqlserver: "— (tableau JSON)", snowflake: "Liste VARIANT, index dès 0", mysql: "— (tableau JSON)" },
    noms: ["ARRAY_AGG", "ARRAY_CONSTRUCT", "ARRAY_CONTAINS"],
    exemple: "-- Snowflake : les articles de chaque commande EDI, dans une seule case\nSELECT c.num_cde, ARRAY_AGG(a.code) WITHIN GROUP (ORDER BY a.code) AS articles\nFROM commande c JOIN ligne_cde l ON l.cde_id = c.id\n  JOIN article a ON a.id = l.article_id\nWHERE c.canal = 'EDI'\nGROUP BY c.num_cde ORDER BY c.num_cde;",
    resultat: [["num_cde", "articles"], ["CDE-1001", "[\"CHL-25\", \"CHL-5\"]"], ["CDE-1003", "[\"BACHE8\", \"PH-5\"]"], ["CDE-1007", "[\"CHL-5\", \"FIL-14\"]"]],
    piege: "Un tableau se lit à partir de 0 : `articles[0]` est le 1er article. Et sans `WITHIN GROUP (ORDER BY …)`, `ARRAY_AGG` range les éléments dans un ordre imprévisible.",
    pratique: "Pour savoir si une commande contient un article, `ARRAY_CONTAINS('CHL-5'::VARIANT, articles)` évite de déplier le tableau avec FLATTEN ; le `::VARIANT` est obligatoire pour un texte.",
    motsCles: ["tableau", "array", "tableau json", "liste", "crochets", "plusieurs valeurs", "array_agg", "liste dans une case", "éléments", "collection", "array_contains"],
    voirAussi: ["flatten", "object", "type-variant", "string-agg"],
    module: "m14"
  },
  // ---------- Autres types ----------
  {
    id: "uniqueidentifier",
    nom: "UNIQUEIDENTIFIER",
    type: "type",
    categorie: "Types de données",
    famille: "Autres types",
    definition: "Un identifiant unique universel (GUID ou UUID) de 16 octets, écrit en 36 caractères avec ses tirets.",
    moteurs: {
      sqlserver: "`UNIQUEIDENTIFIER` : 16 octets ; `NEWID()` (au hasard) ou `NEWSEQUENTIALID()` (croissant, en DEFAULT seulement)",
      snowflake: "Type `UUID` depuis janvier 2026 (avant : `VARCHAR(36)`) ; `UUID_STRING()` en crée un",
      mysql: "Pas de type UUID : `BINARY(16)` avec `UUID_TO_BIN(UUID())`, ou `CHAR(36)`"
    },
    apercu: { sqlserver: "16 octets, NEWID()", snowflake: "UUID (2026) ; avant VARCHAR(36)", mysql: "— (BINARY(16) ou CHAR(36))" },
    noms: ["UUID", "GUID", "NEWID", "UUID_STRING", "UUID_TO_BIN"],
    exemple: "-- Un identifiant unique pour chaque message envoyé au partenaire\nCREATE TABLE envoi_edi (\n  id     UNIQUEIDENTIFIER NOT NULL DEFAULT NEWSEQUENTIALID(),\n  cde_id INT              NOT NULL\n);",
    exemples: {
      snowflake: "-- Un identifiant unique pour chaque message envoyé au partenaire\nCREATE TABLE envoi_edi (\n  id     UUID DEFAULT UUID_STRING() NOT NULL,\n  cde_id INT NOT NULL\n);",
      mysql: "-- Un identifiant unique pour chaque message envoyé au partenaire\nCREATE TABLE envoi_edi (\n  id     BINARY(16) NOT NULL DEFAULT (UUID_TO_BIN(UUID(), 1)),\n  cde_id INT        NOT NULL\n);"
    },
    piege: "Un GUID au hasard (`NEWID()`) en clé d'index cluster fragmente la table : chaque ligne tombe au milieu. Prends `NEWSEQUENTIALID()`, ou garde un `INT IDENTITY` en clé et le GUID à côté.",
    pratique: "Sur MySQL, range le UUID en `BINARY(16)` avec `UUID_TO_BIN(u, 1)` : 16 octets au lieu de 36, et le 1 met la partie qui change vite à la fin, pour un index qui grandit dans l'ordre.",
    motsCles: ["guid", "uuid", "identifiant unique", "newid", "uniqueidentifier", "clé unique", "identifiant universel", "uuid_string", "id aléatoire", "16 octets", "36 caractères", "clé technique"],
    voirAussi: ["identity", "primary-key", "binary", "create-index"],
    module: "m10"
  },
  {
    id: "rowversion",
    nom: "ROWVERSION",
    type: "type",
    categorie: "Types de données",
    famille: "Autres types",
    definition: "Un numéro que SQL Server change tout seul à chaque modification de la ligne ; ce n'est pas une date.",
    moteurs: {
      sqlserver: "`ROWVERSION` (ancien nom : `TIMESTAMP`) : 8 octets, une seule par table ; changé à chaque INSERT et UPDATE de la ligne",
      snowflake: "Pas de ROWVERSION : `ROW_TIMESTAMP = TRUE` sur la table (2026), lu par `METADATA$ROW_LAST_COMMIT_TIME` ; ou un stream",
      mysql: "Pas de ROWVERSION : `DATETIME(6) DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`"
    },
    apercu: { sqlserver: "8 octets, auto à chaque modif", snowflake: "— (ROW_TIMESTAMP, stream)", mysql: "— (ON UPDATE CURRENT_TIMESTAMP)" },
    noms: ["@@DBTS"],
    exemple: "-- SQL Server : les commandes modifiées depuis le dernier chargement\nALTER TABLE commande ADD version_ligne ROWVERSION;\nDECLARE @derniere BINARY(8) = 0x00000000000007D3;   -- notée au chargement d'hier\nSELECT num_cde, statut FROM commande WHERE version_ligne > @derniere;",
    exemples: {
      snowflake: "-- L'équivalent : l'heure de validation de chaque ligne\nALTER TABLE commande SET ROW_TIMESTAMP = TRUE;\nSELECT num_cde, statut FROM commande\nWHERE METADATA$ROW_LAST_COMMIT_TIME > '2026-04-10 00:00:00';",
      mysql: "-- L'équivalent : une colonne mise à jour par MySQL\nALTER TABLE commande ADD modifie_le DATETIME(6) NOT NULL\n  DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6);\nSELECT num_cde, statut FROM commande WHERE modifie_le > '2026-04-10 00:00:00';"
    },
    piege: "La version change à chaque UPDATE, même sans vrai changement (`SET statut = statut`) : ne la prends jamais comme clé. Et ce n'est pas une date : impossible d'en tirer l'heure de la modification.",
    pratique: "Pour un chargement incrémental (ERP vers Snowflake), garde la plus haute version lue, puis ne prends que les lignes au-dessus la fois suivante : même un UPDATE fait hors de l'ERP est vu.",
    motsCles: ["rowversion", "version de ligne", "ligne modifiée", "modification", "incrémental", "chargement incrémental", "timestamp sql server", "delta", "dbts", "concurrence", "changements", "cdc"],
    voirAussi: ["timestamp", "update", "merge"]
  },
  {
    id: "geography",
    nom: "GEOGRAPHY / GEOMETRY",
    type: "type",
    categorie: "Types de données",
    famille: "Autres types",
    definition: "Des points, des lignes et des zones sur la Terre (GEOGRAPHY) ou sur un plan (GEOMETRY) : adresses, tournées, distances.",
    moteurs: {
      sqlserver: "`GEOGRAPHY` (latitude, longitude) et `GEOMETRY` (plan) ; `geography::Point(lat, long, 4326)`, `.STDistance()` en mètres",
      snowflake: "`GEOGRAPHY` (WGS 84) et `GEOMETRY`, 64 Mo au plus ; `ST_MAKEPOINT(longitude, latitude)`, `ST_DISTANCE` en mètres",
      mysql: "`GEOMETRY`, `POINT`, `POLYGON`… avec un SRID (4326 pour la Terre) ; `ST_Distance_Sphere` en mètres"
    },
    apercu: { sqlserver: "GEOGRAPHY et GEOMETRY", snowflake: "GEOGRAPHY et GEOMETRY, 64 Mo", mysql: "GEOMETRY, POINT… (SRID 4326)" },
    noms: ["GEOGRAPHY", "GEOMETRY", "POINT", "POLYGON", "ST_DISTANCE", "ST_MAKEPOINT", "SRID"],
    exemple: "-- Distance à vol d'oiseau : dépôt de Lyon → client de Grenoble (C002)\nDECLARE @lyon     GEOGRAPHY = geography::Point(45.7640, 4.8357, 4326);\nDECLARE @grenoble GEOGRAPHY = geography::Point(45.1885, 5.7245, 4326);\nSELECT ROUND(@lyon.STDistance(@grenoble) / 1000, 0) AS km;",
    exemples: {
      snowflake: "-- Distance à vol d'oiseau : dépôt de Lyon → client de Grenoble (C002)\nSELECT ROUND(ST_DISTANCE(ST_MAKEPOINT(4.8357, 45.7640),\n                         ST_MAKEPOINT(5.7245, 45.1885)) / 1000, 0) AS km;",
      mysql: "-- Distance à vol d'oiseau : dépôt de Lyon → client de Grenoble (C002)\nSELECT ROUND(ST_Distance_Sphere(POINT(4.8357, 45.7640),\n                                POINT(5.7245, 45.1885)) / 1000, 0) AS km;"
    },
    resultat: "Environ 94 km à vol d'oiseau, sur les 3 moteurs.",
    piege: "L'ordre des coordonnées change : `geography::Point(lat, long, …)` prend la latitude d'abord, mais `'POINT(long lat)'` (WKT) et `ST_MAKEPOINT(long, lat)` la longitude ; MySQL en SRID 4326 lit 'POINT(lat long)'. Une inversion envoie le client à des milliers de km, sans erreur.",
    pratique: "Une distance à vol d'oiseau n'est pas une distance par la route : pour une tournée de livraison, elle sert à trier ou à filtrer (clients à moins de 50 km), pas à facturer le transport.",
    motsCles: ["géographie", "carte", "gps", "latitude", "longitude", "distance", "point", "coordonnées", "kilomètres", "géolocalisation", "spatial", "tournée", "adresse"],
    voirAussi: ["vector", "round"]
  },
  {
    id: "vector",
    nom: "VECTOR",
    type: "type",
    categorie: "Types de données",
    famille: "Autres types",
    definition: "Une liste de nombres qui décrit un texte ou une image, pour trouver les plus ressemblants (IA).",
    moteurs: {
      sqlserver: "`VECTOR(n)` depuis SQL Server 2025 : jusqu'à 1 998 nombres (float32) ; `VECTOR_DISTANCE()` ; index vectoriels en préversion",
      snowflake: "`VECTOR(FLOAT, n)` ou `VECTOR(INT, n)`, n jusqu'à 4 096 ; `VECTOR_COSINE_SIMILARITY()`, `AI_EMBED()`",
      mysql: "Pas en MySQL 8.4 : `VECTOR(n)` arrive en 9.0 (16 383 nombres) ; la fonction `DISTANCE()` reste réservée à HeatWave"
    },
    apercu: { sqlserver: "2025 : 1 998 dimensions", snowflake: "Jusqu'à 4 096 dimensions", mysql: "— (8.4) ; VECTOR en 9.0+" },
    noms: ["VECTOR_DISTANCE", "VECTOR_COSINE_SIMILARITY", "EMBEDDING"],
    exemple: "-- SQL Server 2025 : deux libellés d'articles déjà changés en vecteurs (3 nombres ici)\nDECLARE @a VECTOR(3) = '[0.1, 2, 30]';\nDECLARE @b VECTOR(3) = '[0.1, 2, 29]';\nSELECT VECTOR_DISTANCE('cosine', @a, @b) AS distance;",
    exemples: {
      snowflake: "-- Les mêmes vecteurs : Snowflake donne la ressemblance (1 = identiques)\nSELECT VECTOR_COSINE_SIMILARITY([0.1, 2, 30]::VECTOR(FLOAT, 3),\n                                [0.1, 2, 29]::VECTOR(FLOAT, 3)) AS ressemblance;",
      mysql: "-- MySQL 8.4 : pas de type VECTOR\n-- (MySQL 9 : VECTOR(3), mais DISTANCE() seulement sur HeatWave)"
    },
    resultat: "Une distance cosinus très proche de 0 : les deux vecteurs se ressemblent presque tout à fait. Snowflake donne la ressemblance, très proche de 1.",
    piege: "Un vecteur ne se compare pas avec `=` ou `<` : sur Snowflake, `v1 < v2` compare les octets, sans aucun sens. Mesure la ressemblance avec une fonction de distance, entre vecteurs faits par le même modèle.",
    pratique: "Usage de terrain : retrouver l'article du catalogue le plus proche d'un libellé fournisseur mal écrit. Le libellé devient un vecteur (`AI_EMBED` sur Snowflake), puis on garde la plus petite distance.",
    motsCles: ["vecteur", "vector", "ia", "intelligence artificielle", "embedding", "similarité", "ressemblance", "recherche sémantique", "distance", "rag", "dimensions", "plongement"],
    voirAussi: ["geography", "array"]
  },
  {
    id: "sql-variant",
    nom: "SQL_VARIANT",
    type: "type",
    categorie: "Types de données",
    famille: "Autres types",
    definition: "Une colonne SQL Server qui accepte des valeurs de types différents d'une ligne à l'autre.",
    moteurs: {
      sqlserver: "`SQL_VARIANT` : 8 016 octets au plus ; ni `VARCHAR(MAX)`, ni `XML` ; `SQL_VARIANT_PROPERTY(v, 'BaseType')` donne le type",
      snowflake: "Pas de SQL_VARIANT : `VARIANT`, plus large (JSON compris)",
      mysql: "Pas d'équivalent : une colonne texte, plus une colonne qui dit le type"
    },
    apercu: { sqlserver: "Types mêlés, 8 016 octets", snowflake: "— (VARIANT)", mysql: "— (texte + colonne type)" },
    noms: ["SQL_VARIANT_PROPERTY"],
    exemple: "-- SQL Server : une table de paramètres, chaque valeur garde son type\nCREATE TABLE parametre (code VARCHAR(30) NOT NULL, valeur SQL_VARIANT);\nINSERT INTO parametre VALUES ('TAUX_TVA', CAST(20.0 AS DECIMAL(4,1)));\nINSERT INTO parametre VALUES ('DEPOT_DEFAUT', 'Lyon');\nSELECT code, valeur, SQL_VARIANT_PROPERTY(valeur, 'BaseType') AS type_reel FROM parametre;",
    resultat: [["code", "valeur", "type_reel"], ["TAUX_TVA", "20.0", "decimal"], ["DEPOT_DEFAUT", "Lyon", "varchar"]],
    piege: "Pour calculer, il faut d'abord convertir : `valeur * 2` plante, `CAST(valeur AS DECIMAL(4,1)) * 2` marche. Et certains pilotes ODBC renvoient ce type en binaire, illisible.",
    pratique: "Réserve-le aux tables de paramètres. Pour des données métier, une colonne par type reste plus simple à contrôler (CHECK, NOT NULL) et à lire.",
    motsCles: ["sql_variant", "type variable", "plusieurs types", "type libre", "paramètre", "table de paramètres", "basetype", "variant sql server", "type mixte"],
    voirAussi: ["type-variant", "cast"]
  },
  {
    id: "hierarchyid",
    nom: "HIERARCHYID",
    type: "type",
    categorie: "Types de données",
    famille: "Autres types",
    definition: "La place d'une ligne dans un arbre (nomenclature, organigramme), codée comme un chemin : /1/2/.",
    moteurs: {
      sqlserver: "`HIERARCHYID` : chemin compact (892 octets au plus) ; `GetLevel()`, `GetAncestor()`, `IsDescendantOf()`, `ToString()`",
      snowflake: "Pas de HIERARCHYID : une colonne parent + une CTE récursive, ou `CONNECT BY`",
      mysql: "Pas de HIERARCHYID : une colonne parent + une CTE récursive (`WITH RECURSIVE`)"
    },
    apercu: { sqlserver: "Chemin d'arbre, 892 octets max", snowflake: "— (parent + CTE récursive)", mysql: "— (parent + CTE récursive)" },
    noms: ["GETANCESTOR", "ISDESCENDANTOF"],
    exemple: "-- SQL Server : le kit filtration en chemins (/1/ = FIL-14, /1/2/ = VANNE-6V)\nDECLARE @filtre HIERARCHYID = '/1/', @vanne HIERARCHYID = '/1/2/';\nSELECT @vanne.GetLevel()                 AS niveau_vanne,\n       @vanne.IsDescendantOf(@filtre)    AS dans_le_filtre,\n       @vanne.GetAncestor(1).ToString()  AS parent;",
    resultat: [["niveau_vanne", "dans_le_filtre", "parent"], [2, 1, "/1/"]],
    piege: "Rien ne vérifie l'arbre : supprimer le filtre /1/ laisse la vanne /1/2/ orpheline, sans erreur, et deux lignes peuvent avoir le même chemin. Ajoute un `UNIQUE` et contrôle les enfants avant de supprimer.",
    pratique: "Pour une nomenclature qui bouge souvent, une colonne parent et une CTE récursive (comme la table `nomenclature`) restent plus simples et marchent sur les 3 moteurs ; HIERARCHYID brille pour lire vite un sous-arbre entier.",
    motsCles: ["hierarchyid", "niveau", "ancêtre", "descendant", "arborescence", "getancestor", "isdescendantof", "chemin", "getlevel", "position hiérarchique"],
    voirAussi: ["cte-recursive", "with-cte"]
  }
]);
