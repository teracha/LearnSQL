// Parcours SQL — Cours complet du module m10 « Tables, types et contraintes », version 1 (12/11/2026).
// Écrit à partir de la fiche de révision (data/fiches/m10.js, l'ancien cours court) et des 100 « retenir » de
// data/m10-tables.js. Squelette validé par l'élève (m02 v2) : Exemple (qui MONTRE le piège) → Résultat → « Ce qui se
// passe » → « Pourquoi » → « Le piège » (l'erreur vue en entreprise) → « Le bon réflexe » → « SQL Server / Snowflake »
// ou « Et aussi » → À retenir. Chaque mot technique est expliqué à sa première apparition. Les types eux-mêmes (DECIMAL
// et FLOAT, dates en texte, NVARCHAR) sont enseignés en m03 : ce cours renvoie vers lui et parle du CHOIX d'un type.
// Résultats vérifiés avec SQLite sur docs/base-exemple.sql (script : scratchpad cours-complets/m10/verif.py, 35 essais,
// chaque essai sur une base neuve) : longueur de 'BL-2026-0042-R' (14) ; CAST('01000' AS INTEGER) = 1000 ; client sans
// ville (C007) ; ADD COLUMN devise NOT NULL DEFAULT 'EUR' (8 commandes en EUR ; NULL écrit en toutes lettres refusé) ;
// avoir en doublon refusé par UNIQUE ; doublons de SIREN (NULL : C003 / C005, 423456789 : C002 / C006 ; 7 codes
// différents) ; ligne pour la commande 99 refusée (PRAGMA foreign_keys = ON ; 11 lignes ; flux 3 à cde_id NULL ;
// suppression de la commande 1 refusée) ; sans contrôle, l'orpheline entre (NOT EXISTS la trouve ; somme des lignes
// 19000.80, en INNER JOIN 18641.80) ; CHECK ck_flux_motif (6 flux conformes, flux 5 en REJET sans motif refusé ; CHECK
// (qte > 0) accepte NULL) ; copie par CREATE TABLE AS SELECT (7 lignes, doublon de l'id 1 accepté : 8 lignes ; refusé sur
// client). Vérifié à la main, deux fois, d'après la documentation (SQLite fait autrement) : le trou d'IDENTITY (un INSERT
// refusé consomme l'id 2, l'avoir suivant reçoit 3 ; SQLite rend le numéro) ; deux NULL bloquent UNIQUE sur SQL Server
// (SQLite en accepte plusieurs) ; refus d'ALTER COLUMN ville NOT NULL ; messages et numéros d'erreur SQL Server.
// Couverture des 100 « retenir » : scratchpad cours-complets/m10/couverture.txt. Laissées à l'explication de leur
// question (une seule question chacune, règle 6 de docs/plan-sql.md) : plages des entiers (q02), CHAR et ses espaces
// (q06), DATETIME qui arrondit (q13), DATETIMEOFFSET (q14), GUID en clé cluster (q16), DBCC CHECKIDENT (q36), colonne
// calculée (q38), colonne ajoutée à la fin (q41), schémas (q48, vus en m01), SCHEMABINDING (q50), SECURE VIEW (q53),
// WITH CHECK OPTION (q56), collation par colonne (q57), centimes en entier (q61), clé date AAAAMMJJ (q63, m15), Time
// Travel et CLUSTER BY (q68, q69, m14), partitionnement, compression, heap (q71 à q73), prix à 4 décimales (q76),
// pourcentages (q77), table de chargement en texte (q78), IF COL_LENGTH (q81), noms et commentaires (q84, q85), clé
// étrangère entre deux bases (q86), contrainte ou index UNIQUE (q89), hiérarchie (q93), références circulaires (q94),
// table temporelle (q95), TEXT / NTEXT (q97).
// Sources (lues le 12/11/2026) :
// - learn.microsoft.com/sql : t-sql/statements/create-table-transact-sql-identity-property (pas d'unicité garantie ;
//   trous : redémarrage, INSERT en échec ou annulé), relational-databases/tables/unique-constraints-and-check-constraints
//   (un seul NULL par colonne UNIQUE ; existant vérifié ; CHECK refuse le FAUX, NULL passe), relational-databases/
//   errors-events/mssqlserver-1505-database-engine-error (NULL égaux pour un index unique ; 1505 ne cite que le 1er
//   doublon ; GROUP BY … HAVING pour tous les voir), relational-databases/tables/primary-and-foreign-key-constraints (PK :
//   index unique, cluster par défaut, colonnes NOT NULL ; FK : pas d'index ; NO ACTION, CASCADE, SET NULL),
//   relational-databases/tables/create-foreign-key-relationships (FK vers PK ou UNIQUE ; NULL accepté ; même base
//   seulement), t-sql/statements/alter-table-transact-sql et alter-table-column-definition-transact-sql (colonne NOT NULL
//   ajoutée : DEFAULT ou table vide, lignes existantes remplies ; WITH VALUES ; ALTER COLUMN NOT NULL refusé s'il reste
//   des NULL ; « ANSI_NULL defaults are always on for ALTER COLUMN » ; colonnes ajoutées à la fin ; WITH CHECK par défaut
//   pour une contrainte neuve, WITH NOCHECK pour une contrainte réactivée, ignorée par l'optimiseur),
//   alter-table-table-constraint-transact-sql (le CHECK ne lit pas une autre table), create-table-transact-sql
//   (nullabilité selon les réglages de session : toujours écrire NULL ou NOT NULL ; le nom de la contrainte apparaît dans
//   l'erreur ; pas de IF NOT EXISTS), create-default-transact-sql (NULL écrit : pas de DEFAULT), queries/
//   select-into-clause-transact-sql (nom, type, nullabilité, IDENTITY ; ni index, ni contrainte, ni trigger),
//   statements/truncate-table-transact-sql (IDENTITY remis au départ ; refusé si une FK la référence ; annulable),
//   statements/drop-table-transact-sql et relational-databases/tables/delete-tables-database-engine (IF EXISTS 2016+ ;
//   refusé si une FK la référence), statements/bulk-insert-transact-sql et tools/bcp/bcp-utility (sans CHECK_CONSTRAINTS :
//   CHECK et FK ignorés, marqués non fiables ; UNIQUE, PK, NOT NULL toujours vérifiés), relational-databases/tables/
//   disable-foreign-key-constraints-with-insert-and-update-statements (is_not_trusted, WITH CHECK CHECK CONSTRAINT),
//   data-types/datetime2-transact-sql, functions/date-and-time-data-types-and-functions-transact-sql et data-types/
//   rowversion-transact-sql (timestamp = rowversion, pas une date), system-stored-procedures/sp-refreshview-transact-sql et
//   statements/create-view-transact-sql (vue non liée au schéma : sp_refreshview), data-types/json-data-type (type json :
//   SQL Server 2025, GA) et relational-databases/json/store-json-documents-in-sql-tables (sinon NVARCHAR + ISJSON).
// - docs.snowflake.com/en (lu en .md avec curl) : sql-reference/constraints et constraints-overview (tables standard :
//   NOT NULL et CHECK appliqués, PK / UNIQUE / FK non ; utiles aux outils BI ; RELY ; CHECK : NULL passe, ENABLE
//   NOVALIDATE sur une table existante, COPY INTO et création d'un pipe en échec), sql/create-table-constraint,
//   release-notes/2026/10_12 (CHECK sur tables standard : GA en avril 2026), sql/create-table (AUTOINCREMENT = IDENTITY,
//   NOORDER ; OR REPLACE = DROP puis CREATE ; IF NOT EXISTS ; CTAS ; LIKE), sql/create-sequence (pas de garantie sans
//   trou), parameters (NOORDER_SEQUENCE_AS_DEFAULT = TRUE ; TIMESTAMP_TYPE_MAPPING = TIMESTAMP_NTZ), data-types-numeric
//   (INT = NUMBER(38,0)), data-types-text (VARCHAR Unicode ; longueur sans effet sur la vitesse), data-types-datetime
//   (TIMESTAMP = NTZ par défaut ; DATETIME = NTZ), sql/alter-table-column (SET NOT NULL refusé s'il reste des NULL ; SET
//   DATA TYPE : agrandir un texte, pas changer de type), sql/alter-table (RENAME COLUMN ; DEFAULT remplit l'existant),
//   sql/truncate-table, sql/drop-table et sql/undrop-table (Time Travel), user-guide/tables-temp-transient,
//   user-guide/search-optimization/secondary-indexes et release-notes/2026/other/2026-10-26-secondary-indexes-ga (index
//   secondaires : tables standard, Enterprise, payants, recherches très sélectives ; pas de CREATE UNIQUE INDEX).
// Relecture testeur (12/11/2026) : résultats refaits avec SQLite (base neuve à chaque essai) : tous conformes.
// Corrigé : factures et avoirs, « suite chronologique et continue » (CGI, annexe II, art. 242 nonies A, I-7°) ; CHECK
// « ne voit que sa ligne » (q87) ; TRANSIENT reste après la session (q46) ; SELECT INTO : pas les contraintes (q43) ;
// Snowflake : agrandir un texte, pas changer de type (q96) ; « sans erreur », « sans alerte » (Snowflake répond) ;
// DEFAULT : un UPDATE « ne le recalcule pas » (UPDATE … SET col = DEFAULT existe) ; « le total de ligne_cde ».
LEARNSQL.cours.m10 = {
  intro: "Dans ta base, un camping n'a pas de ville et deux fiches Piscines Dumont ont le même SIREN : erreur de saisie, ou cas normal ? Une table bien construite refuse seule les erreurs : un type juste par colonne, des clés, des contraintes (des règles vérifiées à chaque écriture). Encore faut-il poser les bonnes ; et Snowflake ne vérifie pas tout : un flux EDI peut s'y charger deux fois.",
  sections: [
    {
      titre: "CREATE TABLE : un type juste pour chaque colonne",
      exemple: "CREATE TABLE dbo.livraison (\n  id          INT           NOT NULL,\n  num_bl      VARCHAR(12)   NOT NULL,  -- un code : du texte\n  cde_id      INT           NOT NULL,\n  date_prevue DATE          NOT NULL,\n  expedie_le  DATETIME2(0)  NULL,\n  poids_kg    DECIMAL(9,3)  NOT NULL,\n  port_ht     DECIMAL(18,2) NOT NULL   -- de l'argent : jamais FLOAT\n);\nINSERT INTO dbo.livraison (id, num_bl, cde_id, date_prevue, poids_kg, port_ht)\nVALUES (1, 'BL-2026-0042-R', 7, '20260408', 412.5, 85);",
      resultat: "Table créée, vide. L'INSERT est refusé (« String or binary data would be truncated ») : 'BL-2026-0042-R' fait 14 caractères pour 12.",
      points: [
        "Ce qui se passe : chaque colonne a un nom, un type, et `NULL` ou `NOT NULL` (case vide permise ou non). Le numéro de BL dépasse ses 12 caractères : le type l'a refusé.",
        "Pourquoi : le type dit ce que la colonne accepte. `DECIMAL(9,3)` garde exactement 9 chiffres, dont 3 décimales ; `DATE` refuse un 31 février ; `VARCHAR(12)`, un 13e caractère. En `VARCHAR(MAX)`, tout entrerait.",
        "Le piège : typer « pour être tranquille ». Un montant en FLOAT dérive de quelques centimes (m03), une date en texte trie mal, un code postal en nombre perd son zéro : 01000 devient 1000.",
        "Le bon réflexe : un code en texte (`CHAR(9)`, longueur fixe, pour un SIREN), l'argent en `DECIMAL(18,2)`, une quantité au mètre en `DECIMAL(12,3)`, un jour en `DATE`, un horodatage en `DATETIME2(0)`, pas `DATETIME`. Table qui grossit vite : id en `BIGINT`.",
        "SQL Server / Snowflake : Snowflake range tout entier en `NUMBER(38,0)` ; son `VARCHAR` est déjà Unicode, comme `NVARCHAR` ; sa longueur contrôle, sans changer la vitesse. `TIMESTAMP` y vaut `TIMESTAMP_NTZ` (sans fuseau) par défaut ; sur SQL Server, ce n'est pas une date."
      ],
      retenir: "Le type est le premier contrôle : un code en texte, l'argent en DECIMAL, un jour en DATE, une longueur juste."
    },
    {
      titre: "NOT NULL et DEFAULT : rendre une valeur obligatoire",
      exemple: "-- 1. Rendre la ville obligatoire\nALTER TABLE dbo.client ALTER COLUMN ville VARCHAR(40) NOT NULL;\n\n-- 2. Une devise obligatoire, sur une table déjà remplie\nALTER TABLE dbo.commande ADD devise CHAR(3) NOT NULL\n  CONSTRAINT df_commande_devise DEFAULT 'EUR';",
      resultat: "1 : refusé, Camping Les Flots (C007) n'a pas de ville. 2 : réussi, les 8 commandes reçoivent EUR.",
      points: [
        "Ce qui se passe : le 1er ordre échoue, une ligne a déjà une ville vide. Le 2e marche : `DEFAULT` (la valeur mise quand l'INSERT n'en donne pas) remplit aussi les 8 commandes déjà là.",
        "Pourquoi : `NOT NULL` interdit la case vide, à chaque INSERT et UPDATE. Une colonne `NOT NULL` ajoutée à une table pleine doit remplir les lignes existantes : sans DEFAULT, SQL Server refuse.",
        "Le piège : DEFAULT ne joue qu'à l'INSERT, quand la colonne est absente. Un `NULL` écrit en toutes lettres n'est pas remplacé, et un UPDATE ne le recalcule pas : `modifie_le DEFAULT SYSDATETIME()` reste figé.",
        "Le bon réflexe : `NOT NULL` dès que le métier exige la valeur, et toujours `NULL` ou `NOT NULL` écrit (sinon, la connexion décide). Avant de durcir, corrige les vides : `UPDATE … WHERE ville IS NULL`.",
        "SQL Server / Snowflake : Snowflake vérifie NOT NULL aussi : `ALTER COLUMN ville SET NOT NULL`, refusé s'il reste des NULL. Sur SQL Server, `ALTER COLUMN ville VARCHAR(80)` sans `NOT NULL` rend la colonne facultative : réécris la définition complète."
      ],
      retenir: "NOT NULL pour tout ce que le métier exige ; DEFAULT ne joue qu'à l'INSERT. Colonne NOT NULL ajoutée à une table pleine : DEFAULT obligatoire."
    },
    {
      titre: "Clé primaire et IDENTITY : un numéro par ligne, avec des trous",
      exemple: "CREATE TABLE dbo.avoir (\n  id         INT IDENTITY(1,1) NOT NULL,  -- numéro automatique\n  num_avoir  VARCHAR(12)   NOT NULL,      -- le numéro légal\n  montant_ht DECIMAL(18,2) NOT NULL,\n  CONSTRAINT pk_avoir PRIMARY KEY (id),\n  CONSTRAINT uq_avoir_num UNIQUE (num_avoir));\nINSERT INTO dbo.avoir (num_avoir, montant_ht) VALUES ('AV-2026-001', 159.00);\nINSERT INTO dbo.avoir (num_avoir, montant_ht) VALUES ('AV-2026-001', 35.90);  -- doublon\nINSERT INTO dbo.avoir (num_avoir, montant_ht) VALUES ('AV-2026-002', 35.90);\nSELECT id, num_avoir, montant_ht FROM dbo.avoir;",
      resultat: [["id", "num_avoir", "montant_ht"], [1, "AV-2026-001", "159.00"], [3, "AV-2026-002", "35.90"]],
      points: [
        "Ce qui se passe : le 2e avoir est refusé (erreur 2627), son numéro existe déjà. Mais il a consommé l'id 2 : l'avoir suivant reçoit 3. `IDENTITY(1,1)` (départ 1, pas de 1) numérote seul.",
        "Pourquoi : la clé primaire (PRIMARY KEY) identifie chaque ligne : unique, jamais NULL. Une clé technique (un numéro sans sens métier) ne change jamais ; un code client ou un SIRET peut changer. Le numéro métier reste à côté, sous `UNIQUE`.",
        "Le piège : compter sur IDENTITY pour une suite sans trou. Un INSERT refusé ou annulé (ROLLBACK) perd son numéro ; un redémarrage peut sauter un bloc. Or factures et avoirs exigent une suite chronologique et continue.",
        "Le bon réflexe : une clé technique en PRIMARY KEY, `UNIQUE` sur la clé métier. Clé sur deux colonnes : `PRIMARY KEY (article_id, depot_id)`, comme `stock_depot`. Nomme chaque contrainte (`pk_`, `uq_`, `fk_`, `ck_`, `df_`) : l'erreur cite ce nom.",
        "SQL Server / Snowflake : Snowflake écrit `AUTOINCREMENT` (ou `IDENTITY`), ou une séquence (un compteur à part, `seq.NEXTVAL`) : numéros uniques, pas forcément dans l'ordre. Et il ne vérifie ni la clé primaire ni `UNIQUE` : le 2e AV-2026-001 entrerait."
      ],
      retenir: "Clé primaire technique (IDENTITY) + UNIQUE sur le numéro métier. IDENTITY laisse des trous : jamais pour une numérotation légale."
    },
    {
      titre: "UNIQUE : chercher les doublons avant de poser la règle",
      exemple: "-- Avant : ALTER TABLE dbo.client ADD CONSTRAINT uq_client_siren UNIQUE (siren);\n-- Quelles lignes bloqueraient ?\nSELECT siren, COUNT(*) AS nb, MIN(code) AS code_1, MAX(code) AS code_2\nFROM dbo.client\nGROUP BY siren\nHAVING COUNT(*) > 1\nORDER BY siren;",
      resultat: [["siren", "nb", "code_1", "code_2"], [null, 2, "C003", "C005"], ["423456789", 2, "C002", "C006"]],
      points: [
        "Ce qui se passe : deux groupes bloquent. Deux clients n'ont pas de SIREN (C003, C005), et les 2 agences Piscines Dumont partagent le même. L'`ALTER TABLE` serait refusé (erreur 1505), en citant un seul doublon.",
        "Pourquoi : UNIQUE interdit deux valeurs égales, et là, SQL Server compte deux NULL comme égaux. Pour plusieurs NULL : un index (la table des matières d'une table) unique filtré, `CREATE UNIQUE INDEX ux_client_siren ON dbo.client (siren) WHERE siren IS NOT NULL`.",
        "Le piège : forcer les données pour que la règle passe. Ici, la règle est fausse : deux agences d'une société ont le même SIREN ; c'est le SIRET (le numéro d'établissement) qui est unique.",
        "Le bon réflexe : avant tout UNIQUE ou PRIMARY KEY, cette requête : elle liste tous les doublons d'un coup. Puis choisis : nettoyer les données ou changer de clé. `UNIQUE (code)` passe : 7 codes différents.",
        "SQL Server / Snowflake : Snowflake laisse déclarer UNIQUE et PRIMARY KEY, sans les vérifier : les doublons entrent. Cette requête devient ton contrôle après chaque chargement. Déclare quand même les clés : les outils BI les lisent."
      ],
      retenir: "Avant UNIQUE : GROUP BY … HAVING COUNT(*) > 1. SQL Server n'accepte qu'un NULL (index filtré pour plusieurs) ; Snowflake ne vérifie pas UNIQUE."
    },
    {
      titre: "FOREIGN KEY : pas de ligne pour une commande inconnue",
      exemple: "-- Dans la définition de dbo.ligne_cde :\n--   CONSTRAINT fk_ligne_cde_commande FOREIGN KEY (cde_id) REFERENCES dbo.commande (id)\n-- Une ligne pour la commande 99, qui n'existe pas\nINSERT INTO dbo.ligne_cde (id, cde_id, article_id, qte, prix_unit)\nVALUES (12, 99, 1, 10, 35.90);",
      resultat: "SQL Server : refusé, erreur 547 (conflit avec la contrainte FOREIGN KEY) ; la table garde ses 11 lignes. Snowflake : la ligne entre, orpheline (sans commande).",
      points: [
        "Ce qui se passe : `cde_id` est une clé étrangère (une colonne qui pointe vers la clé d'une autre table) : la commande 99 n'existe pas, refusé. Le flux EDI 3, à `cde_id` NULL, est accepté : NULL passe.",
        "Pourquoi : la clé étrangère pointe vers une PRIMARY KEY ou une colonne UNIQUE du parent, et joue dans les deux sens : supprimer la commande 1, qui a des lignes, est refusé aussi (`NO ACTION`, réglage par défaut).",
        "Le piège : sur Snowflake, l'orpheline entre sans erreur. Le total de `ligne_cde` donne alors 19 000,80 €, le même total en `INNER JOIN` sur `commande`, 18 641,80 € : deux rapports Power BI qui ne collent plus.",
        "Le bon réflexe : sur Snowflake, cherche les orphelins après chaque chargement avec `NOT EXISTS` (m06). Sur SQL Server, cherche-les avant d'ajouter une clé étrangère : sinon l'`ALTER TABLE` échoue. Référence obligatoire : clé étrangère et `NOT NULL`.",
        "Et aussi : `ON DELETE CASCADE` supprime les lignes avec leur commande, `ON DELETE SET NULL` vide la référence. À réserver aux cas voulus : une cascade efface de l'historique."
      ],
      retenir: "Une clé étrangère refuse l'orphelin et laisse passer NULL. Snowflake ne la vérifie pas : cherche les orphelins avec NOT EXISTS."
    },
    {
      titre: "CHECK : une règle sur chaque ligne",
      exemple: "-- Règle EDI : un flux rejeté doit avoir un motif\nALTER TABLE dbo.flux_edi ADD CONSTRAINT ck_flux_motif\n  CHECK (statut = 'OK' OR motif IS NOT NULL);\n\nUPDATE dbo.flux_edi SET statut = 'REJET' WHERE id = 5;",
      resultat: "Contrainte ajoutée : les 6 flux la respectent. L'UPDATE est refusé (erreur 547, conflit avec la contrainte CHECK) : le flux 5 serait rejeté sans motif.",
      points: [
        "Ce qui se passe : le moteur vérifie d'abord les 6 flux déjà là, puis chaque INSERT et UPDATE : le flux 5 en REJET sans motif est refusé. Ce CHECK compare deux colonnes de la ligne.",
        "Pourquoi : un CHECK refuse seulement quand sa condition est fausse. Avec NULL, elle est « inconnue » (m02) : la ligne passe. `CHECK (qte > 0)` accepte donc une quantité vide ; ajoute `NOT NULL`.",
        "Le piège : des statuts saisis à la main. 'LIVREE', 'Livrée' et 'LIVRE' cohabitent, et le rapport par statut se coupe en trois. `CHECK (statut IN ('LIVREE', 'EN_COURS', 'ANNULEE'))` l'aurait empêché.",
        "Le bon réflexe : un CHECK pour les valeurs permises et la cohérence de la ligne (`date_echeance >= date_fact`). Il ne voit que sa ligne : « ce client existe-t-il ? » relève d'une clé étrangère, « est-il actif ? » d'une requête.",
        "SQL Server / Snowflake : Snowflake vérifie CHECK depuis avril 2026 ; ajouté à une table existante, il s'écrit `ENABLE NOVALIDATE` (l'existant n'est pas vérifié). Pour l'instant, `COPY INTO` et Snowpipe échouent sur une table qui a un CHECK."
      ],
      retenir: "CHECK refuse seulement le faux : NULL passe. Snowflake le vérifie, mais COPY INTO échoue sur une table qui en a un."
    },
    {
      titre: "Copier, vider, supprimer : SELECT INTO, TRUNCATE, DROP",
      exemple: "-- Copie de sécurité avant une correction\nSELECT * INTO dbo.client_sauv FROM dbo.client;   -- Snowflake : CREATE TABLE … AS SELECT\n\n-- Pas de clé primaire dans la copie : ce doublon passe\nINSERT INTO dbo.client_sauv (id, code, nom, pays, type)\nVALUES (1, 'C001', 'AquaBleu', 'FR', 'GD');",
      resultat: "7 lignes copiées, puis 1 ajoutée : 8 lignes, dont deux id 1. Sur dbo.client, le même INSERT est refusé (erreur 2627, clé primaire).",
      points: [
        "Ce qui se passe : `SELECT … INTO` crée la table et la remplit : colonnes, types, NOT NULL et IDENTITY suivent. Mais ni clé primaire, ni index, ni contrainte : le doublon entre.",
        "Pourquoi : SELECT INTO copie un résultat de requête, pas une définition de table. Bien pour une sauvegarde datée avant un UPDATE de masse (m09) ; une vraie table : `CREATE TABLE` complet, puis `INSERT … SELECT`.",
        "Le piège : sur Snowflake, `CREATE OR REPLACE TABLE` fait un DROP puis un CREATE. Relancé en production, le script de déploiement recrée la table vide, sans alerte ni erreur.",
        "Le bon réflexe : des scripts relançables sans perte. `DROP TABLE IF EXISTS` pour une table de travail ; sinon `CREATE TABLE IF NOT EXISTS` (Snowflake) ou `IF OBJECT_ID('dbo.t') IS NULL` (SQL Server), puis `ALTER TABLE` pour la suite.",
        "SQL Server / Snowflake : `TRUNCATE TABLE` vide tout, sans WHERE ; `DROP TABLE` supprime aussi la structure. SQL Server refuse les deux si une clé étrangère pointe vers la table, et TRUNCATE y remet IDENTITY au départ. Snowflake a `UNDROP TABLE` (Time Travel)."
      ],
      retenir: "SELECT INTO copie les lignes, pas les contraintes. TRUNCATE vide, DROP supprime, CREATE OR REPLACE recrée vide : scripts avec IF (NOT) EXISTS."
    },
    {
      titre: "Détails utiles",
      points: [
        "Tables temporaires : `#t` vit le temps de ta session, `##t` est partagée (à éviter). Snowflake : `TEMPORARY` (session) ; `TRANSIENT` reste, sans Fail-safe (les 7 jours de secours) : moins chère, pour un chargement.",
        "Une vue (une requête enregistrée sous un nom) ne stocke rien et peut cacher une colonne (salaire). Créée avec `SELECT *`, elle garde ses colonnes de départ (rafraîchir : `sp_refreshview`). Vue indexée ou matérialisée : résultat stocké.",
        "Index : module m12. SQL Server en crée pour la clé primaire (cluster par défaut) et UNIQUE, pas pour une clé étrangère. Snowflake : index secondaires depuis octobre 2026 (Enterprise, payants), jamais uniques, pour les recherches très sélectives.",
        "Renommer : `sp_rename` (SQL Server), `RENAME COLUMN … TO …` (Snowflake) ; les vues et rapports qui citent l'ancien nom cassent. Réduire `VARCHAR(100)` en `VARCHAR(20)` : vérifie `MAX(LEN(col))` avant. Snowflake peut agrandir un texte, pas changer son type.",
        "Gros chargement : `NOCHECK CONSTRAINT ALL`, ou `BULK INSERT` sans `CHECK_CONSTRAINTS`, ignore clés étrangères et CHECK. Revalide par `WITH CHECK CHECK CONSTRAINT ALL`, sinon elles restent « non fiables » (l'existant n'est pas vérifié).",
        "Une valeur par case : une liste 'A12;B45' ou des colonnes `adresse_2`, `adresse_3` cachent une table enfant. Du JSON : type `json` sur SQL Server 2025, sinon `NVARCHAR(MAX)` avec `CHECK (ISJSON(doc) = 1)` ; `VARIANT` sur Snowflake (m14)."
      ],
      retenir: "Après un chargement en masse, revalide les contraintes WITH CHECK."
    }
  ],
  differences: [
    ["PRIMARY KEY, UNIQUE", "Vérifiées", "Déclarées, non vérifiées"],
    ["FOREIGN KEY", "Vérifiée", "Déclarée, non vérifiée"],
    ["NOT NULL, CHECK", "Vérifiés", "Vérifiés (CHECK : avril 2026)"],
    ["Numéro automatique", "`IDENTITY(1,1)`", "`AUTOINCREMENT`, séquence"],
    ["Entier", "`INT`, `BIGINT`", "`NUMBER(38,0)`"],
    ["Texte Unicode", "`NVARCHAR(n)`", "`VARCHAR` (toujours)"],
    ["Date et heure", "`DATETIME2(0)`", "`TIMESTAMP_NTZ`"],
    ["Copier une table", "`SELECT … INTO`", "`CREATE TABLE … AS`"],
    ["Créer si absente", "`IF OBJECT_ID(…) IS NULL`", "`IF NOT EXISTS`"],
    ["Chargement et CHECK", "`BULK INSERT` : ignoré", "`COPY INTO` : échoue"]
  ]
};
