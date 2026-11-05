// Super dico SQL — catégorie « Tables » (étape 2, 05/11/2026). Format : docs/dico.md.
// Vérification : SQLite en mémoire (une copie neuve de docs/base-exemple.sql par fiche) et le VRAI serveur MySQL 8.0.46
// de la session (copie ventes_c, rechargée avant chaque essai, client en utf8mb4) : scripts verif_c.py et mysql/*.sql
// (scratchpad dico/c). Ce que SQLite ne sait pas faire (ALTER COLUMN, ADD CONSTRAINT, DECIMAL) : MySQL réel + calcul à
// la main (Python Decimal). SQL Server et Snowflake : documentation seulement (pas de serveur).
// Sources (vérifiées le 05/11/2026) :
// - SQL Server, learn.microsoft.com/sql : t-sql/statements/create-table-transact-sql (pas de IF NOT EXISTS ; ordre libre
//   de DEFAULT et des contraintes ; tables temporaires # et ## ; nullabilité par défaut), alter-table-transact-sql
//   (« ANSI_NULL defaults are always on for ALTER COLUMN; if not specified, the column is nullable » ; NOT NULL ajouté =
//   DEFAULT obligatoire ; WITH VALUES), alter-table-column-definition-transact-sql, drop-table-transact-sql (IF EXISTS
//   2016+, refusé si une FK pointe vers la table ; DROP et CREATE de la même table : pas dans le même lot),
//   create-view-transact-sql (premier ordre du lot, OR ALTER 2016 SP1,
//   ORDER BY seulement avec TOP / OFFSET, sans ordre garanti), create-table-transact-sql-identity-property (trous),
//   functions/scope-identity-transact-sql, relational-databases/tables/unique-constraints-and-check-constraints (un seul
//   NULL dans un UNIQUE ; NULL passe le CHECK), data-types/char-and-varchar-transact-sql (sans n : 1, ou 30 dans CAST),
//   decimal-and-numeric-transact-sql (précision 18, échelle 0 par défaut ; arrondi), datetime-transact-sql (arrondi
//   .000/.003/.007), rowversion-transact-sql (timestamp = rowversion, pas une date), bit-transact-sql,
//   alter-database-scoped-configuration (message 2628 en compatibilité 150+, sinon 8152), errors-events 0-999 et
//   1000-1999 (515, 547, 273, 1033),
//   3000-3999 (3726), replication/mssql-eng002627 (2627).
// - Snowflake, docs.snowflake.com/en : sql-reference/constraints (seuls NOT NULL et CHECK appliqués sur une table
//   standard ; PK, UNIQUE, FK appliquées sur une table hybride), sql/create-table-constraint (CHECK : ENABLE VALIDATE
//   seulement pour une table neuve, NOVALIDATE ne vérifie pas l'existant), release-notes/2026/10_12 (CHECK sur tables
//   standard : disponible depuis avril 2026), sql/create-table (IF NOT EXISTS et OR REPLACE exclusifs ; AUTOINCREMENT /
//   IDENTITY, ORDER / NOORDER), release-notes/bcr-bundles/2024_01/bcr-1483 (NOORDER par défaut), sql/alter-table-column
//   (SET DATA TYPE : seulement agrandir ; SET NOT NULL refusé s'il reste des NULL), sql/alter-table (ADD COLUMN … DEFAULT
//   remplit les lignes existantes), sql/drop-table (CASCADE / RESTRICT),
//   sql/undrop, sql-reference/transactions (un DDL valide la transaction), sql/create-view (ORDER BY déconseillé),
//   user-guide/tables-temp-transient (session ; masque la table permanente du même nom), data-types-text (VARCHAR
//   Unicode, sans longueur = maximum, CHAR sans espaces), data-types-numeric (NUMBER(38,0)), data-types-datetime
//   (DATETIME = TIMESTAMP_NTZ ; TIMESTAMP = NTZ par défaut), data-types-logical.
// - MySQL 8, dev.mysql.com/doc/refman/8.0/en : create-table-foreign-keys.html et ansi-diff-foreign-keys.html (REFERENCES
//   collé à la colonne : ignoré en 8.0 ; appliqué depuis 9.0.0, notes de version news-9-0-0),
//   create-table-check-constraints.html (CHECK appliqué depuis 8.0.16), create-view.html
//   (ORDER BY ignoré si la requête qui lit la vue a le sien), temporary-table-problems.html (« Can't reopen table »),
//   numeric-type-syntax.html (BOOLEAN = TINYINT(1) ; DECIMAL = DECIMAL(10,0)), floating-point-types.html,
//   datetime.html (TIMESTAMP : UTC et 2038), implicit-commit.html.
// docs.snowflake.com et dev.mysql.com n'étaient pas joignables depuis la session : vérifiés par extraits de recherche,
// et chaque ligne MySQL a été testée sur le serveur.
LEARNSQL.dico = (LEARNSQL.dico || []).concat([
  {
    id: "create-table",
    nom: "CREATE TABLE",
    type: "mot-clé",
    categorie: "Tables",
    definition: "Crée une nouvelle table : ses colonnes, leur type, et les règles que les lignes devront respecter.",
    moteurs: {
      sqlserver: "`CREATE TABLE t (col type NOT NULL, …)` ; pas de `IF NOT EXISTS` : `IF OBJECT_ID('t') IS NULL CREATE TABLE …`",
      snowflake: "`CREATE TABLE IF NOT EXISTS t (…)` ; `CREATE OR REPLACE TABLE` remplace la table : ses lignes sont perdues",
      mysql: "`CREATE TABLE IF NOT EXISTS t (…)` ; la clé étrangère s'écrit à part : `FOREIGN KEY (col) REFERENCES t2 (id)`"
    },
    noms: ["CREATE TABLE IF NOT EXISTS", "CREATE OR REPLACE TABLE", "CREATE TABLE AS SELECT", "CTAS"],
    exemple: "CREATE TABLE remise_client (\n  client_id INT          NOT NULL,\n  famille   VARCHAR(12)  NOT NULL,\n  taux      DECIMAL(5,2) NOT NULL DEFAULT 0 CHECK (taux BETWEEN 0 AND 100),\n  PRIMARY KEY (client_id, famille),\n  FOREIGN KEY (client_id) REFERENCES client (id)\n);\nINSERT INTO remise_client VALUES (2, 'CHIMIE', 150);",
    resultat: "Table créée ; l'insertion d'une remise de 150 % est refusée par le CHECK (Msg 547) : la table reste vide.",
    piege: "Sur Snowflake, `CREATE OR REPLACE TABLE` sur une table qui existe la recrée vide, sans prévenir : seul Time Travel rattrape les lignes. Pour un script relançable, écris `CREATE TABLE IF NOT EXISTS` (SQL Server : `IF OBJECT_ID(…) IS NULL`), puis fais évoluer la table avec `ALTER TABLE`.",
    motsCles: ["créer", "nouvelle", "colonnes", "structure", "définir", "création", "ddl", "contraintes", "fabriquer", "champs", "modèle", "ctas", "construire"],
    voirAussi: ["alter-table", "drop-table", "primary-key", "foreign-key", "check", "default", "table-temporaire"],
    module: "m10"
  },
  {
    id: "alter-table",
    nom: "ALTER TABLE",
    type: "mot-clé",
    categorie: "Tables",
    definition: "Modifie une table qui existe déjà : ajouter une colonne, changer un type, ajouter une contrainte.",
    moteurs: {
      sqlserver: "`ALTER TABLE t ADD col type NULL` ; changer un type : `ALTER TABLE t ALTER COLUMN col VARCHAR(80) NOT NULL`",
      snowflake: "`ALTER TABLE t ADD COLUMN col type` ; `ALTER COLUMN col SET DATA TYPE VARCHAR(80)` : surtout agrandir, pas changer de type",
      mysql: "`ALTER TABLE t ADD col type NULL` ; changer un type : `ALTER TABLE t MODIFY col VARCHAR(80) NOT NULL`"
    },
    noms: ["ADD COLUMN", "ALTER COLUMN", "MODIFY", "SET DATA TYPE", "DROP COLUMN", "RENAME COLUMN"],
    exemple: "-- Le code EAN des flux EDI, et un libellé plus long\nALTER TABLE article ADD ean CHAR(13) NULL;\nALTER TABLE article ALTER COLUMN libelle VARCHAR(80) NOT NULL;",
    exemples: {
      snowflake: "-- Le code EAN des flux EDI, et un libellé plus long\nALTER TABLE article ADD COLUMN ean CHAR(13);\nALTER TABLE article ALTER COLUMN libelle SET DATA TYPE VARCHAR(80);",
      mysql: "-- Le code EAN des flux EDI, et un libellé plus long\nALTER TABLE article ADD ean CHAR(13) NULL;\nALTER TABLE article MODIFY libelle VARCHAR(80) NOT NULL;"
    },
    resultat: "Les 8 articles ont une nouvelle colonne ean, vide (NULL) ; libelle accepte 80 caractères et reste obligatoire.",
    piege: "Sur SQL Server, `ALTER COLUMN libelle VARCHAR(80)` sans `NOT NULL` rend la colonne facultative, sans message. MySQL fait pareil avec `MODIFY`, et perd aussi le `DEFAULT` : réécris toujours la définition complète de la colonne.",
    motsCles: ["modifier", "ajouter", "colonne", "changer", "type", "agrandir", "allonger", "renommer", "supprimer colonne", "structure", "évoluer", "champ", "longueur", "add", "modify"],
    voirAussi: ["create-table", "drop-table", "not-null", "default", "types-texte"],
    module: "m10"
  },
  {
    id: "drop-table",
    nom: "DROP TABLE",
    type: "mot-clé",
    categorie: "Tables",
    definition: "Supprime une table entière : sa structure et toutes ses lignes.",
    moteurs: {
      sqlserver: "`DROP TABLE IF EXISTS t` (2016+) ; refusé si une clé étrangère pointe vers la table (Msg 3726)",
      snowflake: "`DROP TABLE IF EXISTS t` ; récupérable pendant la durée du Time Travel : `UNDROP TABLE t`",
      mysql: "`DROP TABLE IF EXISTS t` ; valide aussi la transaction en cours : pas de retour arrière"
    },
    noms: ["DROP TABLE IF EXISTS"],
    exemple: "-- Script de chargement relançable\nDROP TABLE IF EXISTS import_tarif;\nGO   -- DROP et CREATE de la même table : deux lots\nCREATE TABLE import_tarif (code VARCHAR(10), prix_txt VARCHAR(20));",
    exemples: {
      snowflake: "-- Script de chargement relançable\nDROP TABLE IF EXISTS import_tarif;\nCREATE TABLE import_tarif (code VARCHAR(10), prix_txt VARCHAR(20));",
      mysql: "-- Script de chargement relançable\nDROP TABLE IF EXISTS import_tarif;\nCREATE TABLE import_tarif (code VARCHAR(10), prix_txt VARCHAR(20));"
    },
    resultat: "Relancé 10 fois, le script ne plante jamais : la 1re fois, `IF EXISTS` saute la suppression ; ensuite, il efface l'ancienne table et ses lignes avant de la recréer.",
    piege: "Sur SQL Server et MySQL, un `DROP TABLE` validé n'a ni corbeille ni retour arrière : seule une sauvegarde rend les lignes (Snowflake, lui, a `UNDROP TABLE`). Avant un script de nettoyage, vérifie sur quelle base tu es connecté.",
    motsCles: ["supprimer", "supprimer une table", "effacer", "détruire", "drop", "if exists", "nettoyer", "relançable", "script", "jeter", "disparaître", "corbeille", "ménage"],
    voirAussi: ["create-table", "truncate", "undrop", "alter-table"],
    module: "m10"
  },
  {
    id: "primary-key",
    nom: "PRIMARY KEY",
    type: "mot-clé",
    categorie: "Tables",
    definition: "Identifie chaque ligne de façon unique : pas de doublon, pas de NULL.",
    moteurs: {
      sqlserver: "`CONSTRAINT pk_t PRIMARY KEY (col1, col2)` : appliquée ; crée un index cluster par défaut",
      snowflake: "`PRIMARY KEY (col)` déclarée, mais pas vérifiée : les doublons entrent (les tables hybrides, elles, la vérifient)",
      mysql: "`PRIMARY KEY (col1, col2)` : appliquée ; la table est rangée selon elle (InnoDB) ; son nom est toujours PRIMARY"
    },
    noms: ["clé primaire", "PK"],
    exemple: "CREATE TABLE stock_mini (\n  article_id INT NOT NULL,\n  depot_id   INT NOT NULL,\n  qte_mini   INT NOT NULL,\n  CONSTRAINT pk_stock_mini PRIMARY KEY (article_id, depot_id)\n);\nINSERT INTO stock_mini VALUES (1, 1, 20), (1, 2, 10), (1, 1, 30);",
    resultat: "Refusé (Msg 2627) : le couple article 1 / dépôt 1 arrive deux fois. Aucune des 3 lignes n'entre.",
    piege: "Sur Snowflake, la même clé ne bloque rien : les 3 lignes entrent, et le stock mini de l'article 1 au dépôt 1 existe en double. Contrôle les doublons toi-même après chaque chargement (`GROUP BY … HAVING COUNT(*) > 1`).",
    motsCles: ["clé primaire", "pk", "identifiant", "doublon", "identifier", "ligne", "clé", "composée", "id", "contrainte", "unicité", "unique"],
    voirAussi: ["unique", "foreign-key", "identity", "create-index", "having"],
    module: "m10"
  },
  {
    id: "foreign-key",
    nom: "FOREIGN KEY",
    type: "mot-clé",
    categorie: "Tables",
    definition: "Oblige une valeur à exister dans une autre table : pas de commande pour un client inconnu.",
    moteurs: {
      sqlserver: "`CONSTRAINT fk_x FOREIGN KEY (client_id) REFERENCES client (id)` : appliquée ; `ON DELETE CASCADE` en option",
      snowflake: "Même écriture, mais déclarée seulement : rien n'est vérifié (les tables hybrides, elles, la vérifient)",
      mysql: "`FOREIGN KEY (client_id) REFERENCES client (id)` : appliquée ; un `REFERENCES` collé à la colonne est ignoré sans message (MySQL 8)"
    },
    noms: ["clé étrangère", "FK", "REFERENCES"],
    exemple: "CREATE TABLE adresse_livraison (\n  id        INT PRIMARY KEY,\n  client_id INT NOT NULL,\n  ville     VARCHAR(40) NOT NULL,\n  CONSTRAINT fk_adresse_client FOREIGN KEY (client_id) REFERENCES client (id)\n);\nINSERT INTO adresse_livraison VALUES (1, 99, 'Nice');",
    resultat: "Refusé (Msg 547) : le client 99 n'existe pas dans client.",
    piege: "Sur Snowflake, la même table accepte l'adresse du client 99 : la clé n'est qu'une étiquette. Un rapport en `INNER JOIN client` perd ensuite ces lignes sans erreur : cherche les orphelins après chaque chargement (`NOT EXISTS`).",
    motsCles: ["clé étrangère", "fk", "référence", "lien", "relation", "orphelin", "parent", "enfant", "intégrité", "cascade", "relier", "client inconnu", "exister"],
    voirAussi: ["primary-key", "create-table", "exists", "left-join", "delete"],
    module: "m10"
  },
  {
    id: "unique",
    nom: "UNIQUE",
    type: "mot-clé",
    categorie: "Tables",
    definition: "Interdit les doublons dans une colonne, comme un numéro de facture ou un code client.",
    moteurs: {
      sqlserver: "`CONSTRAINT uq_x UNIQUE (col)` : appliquée ; un seul NULL accepté ; plusieurs NULL : index unique filtré `WHERE col IS NOT NULL`",
      snowflake: "`UNIQUE (col)` déclarée, mais pas vérifiée : les doublons entrent (les tables hybrides, elles, la vérifient)",
      mysql: "`CONSTRAINT uq_x UNIQUE (col)` : appliquée ; plusieurs NULL acceptés"
    },
    noms: ["UNIQUE INDEX", "UNIQUE KEY"],
    exemple: "ALTER TABLE client ADD CONSTRAINT uq_client_code UNIQUE (code);\nINSERT INTO client (id, code, nom, pays, type)\nVALUES (8, 'C002', 'Aqua Nord', 'FR', 'PRO');",
    resultat: "Contrainte ajoutée (les 7 codes sont tous différents) ; le nouveau client est refusé (Msg 2627) : le code C002 existe déjà.",
    piege: "Sur `siren`, la même contrainte échoue : les deux agences Piscines Dumont ont le même SIREN, et SQL Server refuse aussi deux NULL (C003, C005). Vérifie d'abord les doublons ; pour « unique quand c'est rempli » : `CREATE UNIQUE INDEX … WHERE siren IS NOT NULL`.",
    motsCles: ["doublon", "unicité", "interdire", "numéro", "code", "clé métier", "double", "deux fois", "même valeur", "contrainte", "uq", "siren"],
    voirAussi: ["primary-key", "create-index", "check", "not-null"],
    module: "m10"
  },
  {
    id: "check",
    nom: "CHECK",
    type: "mot-clé",
    categorie: "Tables",
    definition: "Pose une règle sur les valeurs d'une ligne : une valeur qui ne la respecte pas est refusée.",
    moteurs: {
      sqlserver: "`CONSTRAINT ck_x CHECK (statut IN ('A', 'B'))` : appliqué, et les lignes déjà là sont vérifiées",
      snowflake: "`CONSTRAINT ck_x CHECK (…)` : appliqué depuis avril 2026 ; ajouté à une table pleine, il ne vérifie pas l'existant (`ENABLE NOVALIDATE`)",
      mysql: "`CONSTRAINT ck_x CHECK (…)` : appliqué depuis MySQL 8.0.16 (avant, accepté puis ignoré)"
    },
    noms: [],
    exemple: "ALTER TABLE commande ADD CONSTRAINT ck_commande_statut\n  CHECK (statut IN ('LIVREE', 'EN_COURS', 'ANNULEE'));\nUPDATE commande SET statut = 'LIVRE' WHERE num_cde = 'CDE-1005';",
    exemples: {
      snowflake: "-- Table déjà remplie : les lignes déjà là ne sont pas vérifiées\nALTER TABLE commande ADD CONSTRAINT ck_commande_statut\n  CHECK (statut IN ('LIVREE', 'EN_COURS', 'ANNULEE')) ENABLE NOVALIDATE;\nUPDATE commande SET statut = 'LIVRE' WHERE num_cde = 'CDE-1005';"
    },
    resultat: "Contrainte ajoutée (les 8 commandes la respectent) ; l'UPDATE vers 'LIVRE', une faute de frappe, est refusé (Msg 547).",
    piege: "Un CHECK laisse passer NULL : `CHECK (qte > 0)` accepte une quantité vide, car NULL > 0 n'est pas « faux ». Ajoute `NOT NULL` sur la colonne quand la valeur est obligatoire.",
    motsCles: ["règle", "contrôle", "valider", "vérifier", "valeurs autorisées", "interdire", "contrainte", "condition", "refuser", "plage", "statut", "ck", "validation", "faute de frappe"],
    voirAussi: ["not-null", "default", "unique", "foreign-key", "in"],
    module: "m10"
  },
  {
    id: "default",
    nom: "DEFAULT",
    type: "mot-clé",
    categorie: "Tables",
    definition: "Donne une valeur automatique à une colonne quand l'INSERT ne la fournit pas.",
    moteurs: {
      sqlserver: "`col type NOT NULL CONSTRAINT df_x DEFAULT 1` ; une fonction marche aussi : `DEFAULT SYSDATETIME()`",
      snowflake: "`col type NOT NULL DEFAULT 1` : même écriture, sans `CONSTRAINT df_…`",
      mysql: "`col type NOT NULL DEFAULT 1` ; une expression se met entre parenthèses : `DEFAULT (CURRENT_DATE)`"
    },
    noms: ["valeur par défaut"],
    exemple: "CREATE TABLE relance (\n  fact_id INT         NOT NULL,\n  niveau  INT         NOT NULL DEFAULT 1,\n  statut  VARCHAR(10) NOT NULL DEFAULT 'A_ENVOYER'\n);\nINSERT INTO relance (fact_id) VALUES (3);\nINSERT INTO relance (fact_id, niveau, statut) VALUES (3, 2, NULL);",
    resultat: "1re relance de la facture 3 : niveau 1 et statut A_ENVOYER (les DEFAULT). La 2e est refusée (Msg 515) : un NULL écrit en toutes lettres n'est pas remplacé par le DEFAULT.",
    piege: "Le DEFAULT ne joue qu'à l'INSERT : un UPDATE ne le recalcule jamais (une colonne `modifie_le` reste figée). Et sur SQL Server, une colonne qui accepte NULL, ajoutée avec un DEFAULT, reste vide sur les lignes existantes : ajoute `WITH VALUES` (MySQL et Snowflake, eux, les remplissent).",
    motsCles: ["valeur par défaut", "automatique", "remplir", "préremplir", "initialiser", "omis", "oublié", "date du jour", "valeur initiale", "colonne", "insert", "auto"],
    voirAussi: ["not-null", "create-table", "alter-table", "insert", "coalesce"],
    module: "m10"
  },
  {
    id: "not-null",
    nom: "NOT NULL",
    type: "mot-clé",
    categorie: "Tables",
    definition: "Rend une colonne obligatoire : une ligne sans valeur dans cette colonne est refusée.",
    moteurs: {
      sqlserver: "`col type NOT NULL` ; colonne existante : `ALTER TABLE t ALTER COLUMN col type NOT NULL` (refusé s'il reste des NULL)",
      snowflake: "`col type NOT NULL`, toujours appliqué ; colonne existante : `ALTER TABLE t ALTER COLUMN col SET NOT NULL` (refusé s'il reste des NULL)",
      mysql: "`col type NOT NULL` ; colonne existante : `ALTER TABLE t MODIFY col type NOT NULL` (refusé s'il reste des NULL)"
    },
    noms: ["SET NOT NULL"],
    exemple: "-- Rendre la ville obligatoire\nALTER TABLE client ALTER COLUMN ville VARCHAR(40) NOT NULL;",
    exemples: {
      snowflake: "-- Rendre la ville obligatoire\nALTER TABLE client ALTER COLUMN ville SET NOT NULL;",
      mysql: "-- Rendre la ville obligatoire\nALTER TABLE client MODIFY ville VARCHAR(40) NOT NULL;"
    },
    resultat: "Refusé : le client C007 (Camping Les Flots) n'a pas de ville ; la colonne reste facultative.",
    piege: "Une colonne écrite sans `NULL` ni `NOT NULL` accepte NULL (sur SQL Server, selon les réglages de la connexion) : un import EDI peut alors créer des clients sans ville. Écris toujours l'un ou l'autre, et corrige les vides (`UPDATE … WHERE ville IS NULL`) avant de passer en NOT NULL.",
    motsCles: ["obligatoire", "vide", "null", "interdire", "requis", "remplir", "manquant", "renseigné", "saisie", "facultatif", "absent", "non nul"],
    voirAussi: ["default", "check", "is-null", "coalesce", "alter-table"],
    module: "m10"
  },
  {
    id: "identity",
    nom: "IDENTITY",
    type: "mot-clé",
    categorie: "Tables",
    definition: "Donne automatiquement un numéro à chaque nouvelle ligne, pour la clé technique.",
    moteurs: {
      sqlserver: "`id INT IDENTITY(1,1)` (départ, pas) ; le numéro créé : `SCOPE_IDENTITY()` ; ou une `SEQUENCE` (`NEXT VALUE FOR`)",
      snowflake: "`id INT AUTOINCREMENT` ou `IDENTITY(1,1)` ; ou une `SEQUENCE` (`seq.NEXTVAL`) ; numéros uniques, pas forcément dans l'ordre (NOORDER par défaut)",
      mysql: "`id INT AUTO_INCREMENT PRIMARY KEY` (la colonne doit être une clé) ; le numéro créé : `LAST_INSERT_ID()`"
    },
    noms: ["AUTO_INCREMENT", "AUTOINCREMENT", "SEQUENCE", "NEXTVAL", "SCOPE_IDENTITY", "LAST_INSERT_ID", "auto-incrément"],
    exemple: "CREATE TABLE import_tarif (\n  id         INT IDENTITY(1,1) PRIMARY KEY,\n  code       VARCHAR(10)   NOT NULL,\n  prix_tarif DECIMAL(10,2) NOT NULL\n);\nINSERT INTO import_tarif (code, prix_tarif)\nVALUES ('CHL-5', 41.50), ('PH-5', 25.90);",
    exemples: {
      snowflake: "CREATE TABLE import_tarif (\n  id         INT AUTOINCREMENT PRIMARY KEY,\n  code       VARCHAR(10)   NOT NULL,\n  prix_tarif DECIMAL(10,2) NOT NULL\n);\nINSERT INTO import_tarif (code, prix_tarif)\nVALUES ('CHL-5', 41.50), ('PH-5', 25.90);",
      mysql: "CREATE TABLE import_tarif (\n  id         INT AUTO_INCREMENT PRIMARY KEY,\n  code       VARCHAR(10)   NOT NULL,\n  prix_tarif DECIMAL(10,2) NOT NULL\n);\nINSERT INTO import_tarif (code, prix_tarif)\nVALUES ('CHL-5', 41.50), ('PH-5', 25.90);"
    },
    resultat: [["id", "code", "prix_tarif"], [1, "CHL-5", "41.50"], [2, "PH-5", "25.90"]],
    piege: "Les numéros ont des trous : un INSERT annulé (ROLLBACK) consomme quand même son numéro, et SQL Server peut sauter un bloc après un redémarrage. Ne t'en sers jamais pour une numérotation légale de factures sans trou : garde un numéro métier à part, avec UNIQUE.",
    motsCles: ["auto-incrément", "numéro", "compteur", "automatique", "séquence", "clé technique", "incrémenter", "numéroter", "id", "identifiant", "autoincrement", "auto_increment", "trou", "suivant"],
    voirAussi: ["primary-key", "unique", "create-table", "insert", "rollback"],
    module: "m10"
  },
  {
    id: "create-view",
    nom: "CREATE VIEW",
    type: "mot-clé",
    categorie: "Tables",
    definition: "Enregistre une requête sous un nom : on la lit ensuite comme une table.",
    moteurs: {
      sqlserver: "`CREATE OR ALTER VIEW v AS SELECT …` (2016 SP1+) ; seule instruction de son lot : `GO` avant et après",
      snowflake: "`CREATE OR REPLACE VIEW v AS SELECT …` ; `SECURE VIEW` cache sa définition",
      mysql: "`CREATE OR REPLACE VIEW v AS SELECT …`"
    },
    noms: ["VIEW", "vue", "CREATE OR ALTER VIEW", "CREATE OR REPLACE VIEW"],
    exemple: "CREATE VIEW v_cde_en_cours AS\nSELECT c.num_cde, cl.nom, c.date_cde, c.montant_ht\nFROM commande AS c\nJOIN client AS cl ON cl.id = c.client_id\nWHERE c.statut = 'EN_COURS';\nGO\nSELECT num_cde, nom, montant_ht FROM v_cde_en_cours ORDER BY date_cde;",
    exemples: {
      snowflake: "CREATE VIEW v_cde_en_cours AS\nSELECT c.num_cde, cl.nom, c.date_cde, c.montant_ht\nFROM commande AS c\nJOIN client AS cl ON cl.id = c.client_id\nWHERE c.statut = 'EN_COURS';\nSELECT num_cde, nom, montant_ht FROM v_cde_en_cours ORDER BY date_cde;",
      mysql: "CREATE VIEW v_cde_en_cours AS\nSELECT c.num_cde, cl.nom, c.date_cde, c.montant_ht\nFROM commande AS c\nJOIN client AS cl ON cl.id = c.client_id\nWHERE c.statut = 'EN_COURS';\nSELECT num_cde, nom, montant_ht FROM v_cde_en_cours ORDER BY date_cde;"
    },
    resultat: [["num_cde", "nom", "montant_ht"], ["CDE-1005", "Hydro Sud", "318.00"], ["CDE-1006", "Piscines Dumont", "1290.00"], ["CDE-1007", "AquaBleu", "7950.00"]],
    piege: "SQL Server refuse `ORDER BY` dans une vue (Msg 1033), sauf avec `TOP` ; et `TOP 100 PERCENT … ORDER BY` passe, mais l'ordre n'est pas garanti à la lecture. Mets le tri dans la requête qui lit la vue, comme ici.",
    motsCles: ["vue", "requête enregistrée", "sauvegarder", "réutiliser", "simplifier", "masquer", "colonnes", "sécurité", "virtuelle", "nommer", "enregistrer", "fenêtre"],
    voirAussi: ["select", "order-by", "top", "inner-join", "create-table"],
    module: "m10"
  },
  {
    id: "table-temporaire",
    nom: "Table temporaire (#t)",
    type: "mot-clé",
    categorie: "Tables",
    definition: "Crée une table de travail, visible par ta seule session et supprimée à la fin de celle-ci.",
    moteurs: {
      sqlserver: "`#t` : ta session seulement ; `##t` : toutes les sessions ; vite fait : `SELECT … INTO #t FROM …`",
      snowflake: "`CREATE TEMPORARY TABLE t (…)` ou `… AS SELECT …` ; `TRANSIENT` : une table qui reste, sans Fail-safe",
      mysql: "`CREATE TEMPORARY TABLE t (…)` ou `… AS SELECT …` ; une seule fois par requête (pas d'auto-jointure)"
    },
    noms: ["#temp", "##temp", "TEMPORARY TABLE", "CREATE TEMPORARY TABLE", "SELECT INTO", "TRANSIENT"],
    exemple: "SELECT num_cde, client_id, montant_ht\nINTO #cde_ouverte\nFROM commande\nWHERE statut = 'EN_COURS';\nSELECT * FROM #cde_ouverte ORDER BY num_cde;",
    exemples: {
      snowflake: "CREATE TEMPORARY TABLE cde_ouverte AS\nSELECT num_cde, client_id, montant_ht\nFROM commande\nWHERE statut = 'EN_COURS';\nSELECT * FROM cde_ouverte ORDER BY num_cde;",
      mysql: "CREATE TEMPORARY TABLE cde_ouverte AS\nSELECT num_cde, client_id, montant_ht\nFROM commande\nWHERE statut = 'EN_COURS';\nSELECT * FROM cde_ouverte ORDER BY num_cde;"
    },
    resultat: [["num_cde", "client_id", "montant_ht"], ["CDE-1005", 4, "318.00"], ["CDE-1006", 2, "1290.00"], ["CDE-1007", 1, "7950.00"]],
    piege: "`#cde_ouverte` vit jusqu'à la fin de ta session : relancer le script dans la même fenêtre SSMS plante (« There is already an object named », Msg 2714). Commence par `DROP TABLE IF EXISTS #cde_ouverte;`.",
    motsCles: ["temporaire", "temp", "travail", "intermédiaire", "session", "dièse", "provisoire", "stocker", "étape", "tempdb", "brouillon", "résultat intermédiaire"],
    voirAussi: ["create-table", "drop-table", "with-cte", "insert-select", "declare"],
    module: "m10"
  },
  {
    id: "types-texte",
    nom: "VARCHAR / NVARCHAR / CHAR",
    type: "mot-clé",
    categorie: "Tables",
    definition: "Stockent du texte : longueur variable (VARCHAR), fixe (CHAR), ou tous les alphabets (NVARCHAR).",
    moteurs: {
      sqlserver: "`VARCHAR(n)`, `CHAR(n)` (complété par des espaces), `NVARCHAR(n)` pour l'Unicode ; sans n : 1 caractère (30 dans un CAST)",
      snowflake: "`VARCHAR(n)`, toujours Unicode ; `STRING` et `TEXT` = VARCHAR ; sans n : 16 777 216 caractères, sans perte de vitesse ; `CHAR` n'ajoute pas d'espaces",
      mysql: "`VARCHAR(n)` (n obligatoire), `CHAR(n)`, `TEXT` ; en utf8mb4 (par défaut), n compte des caractères, accents compris"
    },
    noms: ["VARCHAR", "NVARCHAR", "CHAR", "NCHAR", "STRING", "TEXT", "VARCHAR(MAX)", "utf8mb4", "type de données"],
    exemple: "-- code est un VARCHAR(10)\nINSERT INTO client (id, code, nom, pays, type)\nVALUES (8, 'C008-LYON-NORD', 'Aqua Nord', 'FR', 'PRO');",
    resultat: "Refusé (Msg 2628) : 'C008-LYON-NORD' fait 14 caractères pour un code de 10 ; SQL Server montre la valeur coupée, 'C008-LYON-' (base en compatibilité 140 ou moins : Msg 8152, sans ce détail).",
    piege: "`VARCHAR` sans longueur garde 1 seul caractère sur SQL Server : `DECLARE @code VARCHAR = 'CHL-25'` donne 'C', sans erreur (et `CAST(x AS VARCHAR)` coupe à 30). Écris toujours la longueur : `VARCHAR(20)`.",
    motsCles: ["texte", "chaîne", "caractères", "longueur", "unicode", "accents", "taille", "alphabet", "tronqué", "trop long", "string", "libellé", "utf8", "type"],
    voirAussi: ["len", "cast", "trim", "types-nombre", "alter-table"],
    module: "m10"
  },
  {
    id: "types-nombre",
    nom: "INT / DECIMAL / FLOAT",
    type: "mot-clé",
    categorie: "Tables",
    definition: "Stockent des nombres : entiers (INT), exacts avec décimales (DECIMAL), ou approchés (FLOAT).",
    moteurs: {
      sqlserver: "`INT` (± 2,1 milliards), `BIGINT`, `DECIMAL(p,s)` (sans précision : `DECIMAL(18,0)`), `FLOAT` approché",
      snowflake: "`NUMBER(p,s)` ; `INT`, `BIGINT`, `DECIMAL` = NUMBER (sans précision : `NUMBER(38,0)`) ; `FLOAT` approché",
      mysql: "`INT`, `BIGINT`, `DECIMAL(p,s)` (sans précision : `DECIMAL(10,0)`) ; `FLOAT` sur 4 octets (7 chiffres), `DOUBLE` sur 8"
    },
    noms: ["INT", "BIGINT", "SMALLINT", "DECIMAL", "NUMERIC", "NUMBER", "FLOAT", "DOUBLE", "REAL", "MONEY", "type de données"],
    exemple: "SELECT code, prix_tarif,\n       CAST(prix_tarif AS DECIMAL) AS sans_echelle,\n       CAST(prix_tarif AS DECIMAL(10,2)) AS avec_echelle\nFROM article\nWHERE famille = 'ACCESSOIRE';",
    resultat: [["code", "prix_tarif", "sans_echelle", "avec_echelle"], ["EPU-F", "19.90", "20", "19.90"], ["BACHE8", "149.00", "149", "149.00"]],
    piege: "`DECIMAL` sans précision ni échelle garde 0 décimale sur les 3 moteurs : 19.90 devient 20, sans erreur. Écris toujours `DECIMAL(10,2)` ; et pour l'argent, jamais FLOAT : 0.1 + 0.2 n'y vaut pas 0.3.",
    motsCles: ["nombre", "entier", "décimal", "décimales", "virgule", "précision", "échelle", "montant", "argent", "prix", "arrondi", "approché", "numérique", "chiffres", "centimes", "type"],
    voirAussi: ["cast", "round", "division", "types-texte", "sum"],
    module: "m10"
  },
  {
    id: "types-date",
    nom: "DATE / DATETIME2 / TIMESTAMP",
    type: "mot-clé",
    categorie: "Tables",
    definition: "Stockent une date seule (DATE), ou une date avec l'heure (DATETIME2, TIMESTAMP).",
    moteurs: {
      sqlserver: "`DATE` ; date + heure : `DATETIME2(0)` (à la seconde), plutôt que `DATETIME` (arrondi au 1/300 s) ; avec fuseau : `DATETIMEOFFSET`",
      snowflake: "`DATE` ; `TIMESTAMP_NTZ` (sans fuseau, = `DATETIME`), `TIMESTAMP_LTZ` (fuseau de la session), `TIMESTAMP_TZ` (avec décalage) ; `TIMESTAMP` seul = NTZ par défaut",
      mysql: "`DATE`, `DATETIME` (sans fuseau) ; `TIMESTAMP` : converti selon le fuseau de la session, et limité à 2038"
    },
    noms: ["DATE", "DATETIME", "DATETIME2", "DATETIMEOFFSET", "TIMESTAMP", "TIMESTAMP_NTZ", "TIMESTAMP_LTZ", "TIMESTAMP_TZ", "SMALLDATETIME", "type de données"],
    exemple: "CREATE TABLE livraison (\n  cde_id      INT          NOT NULL,\n  date_prevue DATE         NOT NULL,\n  expedie_le  DATETIME2(0) NULL\n);\nINSERT INTO livraison VALUES (7, '2026-04-08', '2026-04-08 17:30:00');",
    exemples: {
      snowflake: "CREATE TABLE livraison (\n  cde_id      INT              NOT NULL,\n  date_prevue DATE             NOT NULL,\n  expedie_le  TIMESTAMP_NTZ(0)\n);\nINSERT INTO livraison VALUES (7, '2026-04-08', '2026-04-08 17:30:00');",
      mysql: "CREATE TABLE livraison (\n  cde_id      INT      NOT NULL,\n  date_prevue DATE     NOT NULL,\n  expedie_le  DATETIME NULL\n);\nINSERT INTO livraison VALUES (7, '2026-04-08', '2026-04-08 17:30:00');"
    },
    resultat: [["cde_id", "date_prevue", "expedie_le"], [7, "2026-04-08", "2026-04-08 17:30:00"]],
    piege: "Sur SQL Server, `TIMESTAMP` n'est pas une date : c'est un compteur de version de ligne (rowversion). Une table recopiée de Snowflake ou de MySQL avec `TIMESTAMP` refuse alors tes dates (Msg 273) : écris `DATETIME2`.",
    motsCles: ["date", "heure", "horodatage", "jour", "temps", "fuseau", "seconde", "calendrier", "moment", "utc", "2038", "type", "timezone"],
    voirAussi: ["getdate", "current-date", "cast", "dateadd", "datediff"],
    module: "m10"
  },
  {
    id: "type-booleen",
    nom: "BIT / BOOLEAN",
    type: "mot-clé",
    categorie: "Tables",
    definition: "Stocke un oui / non : 1 ou 0 (BIT) sur SQL Server, TRUE ou FALSE (BOOLEAN) ailleurs.",
    moteurs: {
      sqlserver: "`BIT` : 1, 0 ou NULL ; pas de mot-clé TRUE : `WHERE actif = 1`",
      snowflake: "`BOOLEAN` : TRUE, FALSE ou NULL ; filtre : `WHERE actif` ou `WHERE NOT actif`",
      mysql: "`BOOLEAN` = `TINYINT(1)` : TRUE vaut 1, FALSE vaut 0, mais 2 est accepté sans erreur"
    },
    noms: ["BIT", "BOOLEAN", "BOOL", "TINYINT(1)", "TRUE", "FALSE", "type de données"],
    exemple: "CREATE TABLE partenaire_edi (\n  code  VARCHAR(10) NOT NULL PRIMARY KEY,\n  actif BIT         NOT NULL DEFAULT 1\n);\nINSERT INTO partenaire_edi (code) VALUES ('AQUABLEU'), ('DUMONT');\nUPDATE partenaire_edi SET actif = 0 WHERE code = 'DUMONT';\nSELECT code, actif FROM partenaire_edi ORDER BY code;",
    exemples: {
      snowflake: "CREATE TABLE partenaire_edi (\n  code  VARCHAR(10) NOT NULL PRIMARY KEY,\n  actif BOOLEAN     NOT NULL DEFAULT TRUE\n);\nINSERT INTO partenaire_edi (code) VALUES ('AQUABLEU'), ('DUMONT');\nUPDATE partenaire_edi SET actif = FALSE WHERE code = 'DUMONT';\nSELECT code, actif FROM partenaire_edi ORDER BY code;",
      mysql: "CREATE TABLE partenaire_edi (\n  code  VARCHAR(10) NOT NULL PRIMARY KEY,\n  actif BOOLEAN     NOT NULL DEFAULT TRUE\n);\nINSERT INTO partenaire_edi (code) VALUES ('AQUABLEU'), ('DUMONT');\nUPDATE partenaire_edi SET actif = FALSE WHERE code = 'DUMONT';\nSELECT code, actif FROM partenaire_edi ORDER BY code;"
    },
    resultat: [["code", "actif"], ["AQUABLEU", 1], ["DUMONT", 0]],
    piege: "Sans `NOT NULL`, la colonne a trois états : `WHERE actif = 0` oublie les lignes à NULL, et le compte des partenaires inactifs est faux. Sur Snowflake, la même requête affiche TRUE et FALSE au lieu de 1 et 0.",
    motsCles: ["booléen", "oui", "non", "vrai", "faux", "actif", "inactif", "drapeau", "flag", "case à cocher", "indicateur", "logique", "0 ou 1", "type"],
    voirAussi: ["case", "iif", "where", "default", "not-null"],
    module: "m10"
  }
]);
