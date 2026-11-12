// Super dico SQL — catégorie « Transactions » (étape 2, 05/11/2026). Format : docs/dico.md.
// Résultats calculés avec SQLite sur docs/base-exemple.sql (copie en mémoire pour chaque modification), et chaque
// exemple MySQL rejoué sur un vrai serveur MySQL 8.0.46 (copie de la base, InnoDB, mode strict, deux sessions pour les
// lectures pendant une modification) : scripts de contrôle du dossier scratchpad dico/d. Ce que SQLite ne sait pas faire
// (@@TRANCOUNT, XACT_ABORT, NOLOCK) : calculé à la main, deux fois.
// Sources (vérifiées le 05/11/2026) :
// - SQL Server, learn.microsoft.com/sql : t-sql/language-elements/begin-transaction-, commit-transaction-,
//   rollback-transaction-, save-transaction-transact-sql (@@TRANCOUNT, COMMIT intérieur sans effet, ROLLBACK jusqu'au
//   1er BEGIN, point de sauvegarde), t-sql/functions/trancount-transact-sql, t-sql/statements/
//   set-transaction-isolation-level-transact-sql (le niveau reste actif pour la connexion ; SNAPSHOT demande
//   ALLOW_SNAPSHOT_ISOLATION ; READ_COMMITTED_SNAPSHOT actif par défaut sur Azure SQL Database), t-sql/queries/
//   hints-transact-sql-table (NOLOCK = READUNCOMMITTED : données jamais validées, lignes vues deux fois ou pas du tout),
//   t-sql/statements/set-xact-abort-transact-sql (OFF par défaut : souvent, seule l'instruction en erreur est annulée),
//   relational-databases/sql-server-transaction-locking-and-row-versioning-guide (autocommit, imbrication),
//   relational-databases/errors-events/database-engine-events-and-errors-0-to-999 (erreur 266, gravité 16).
// - Snowflake, docs.snowflake.com : sql-reference/transactions (BEGIN = START TRANSACTION ; un BEGIN dans une
//   transaction ouverte est ignoré ; un ordre DDL fait un COMMIT implicite ; une instruction en erreur est annulée seule
//   et la transaction reste ouverte), sql-reference/sql/begin, sql-reference/snowflake-scripting/begin (BEGIN … END est
//   un bloc : BEGIN TRANSACTION pour une transaction), sql-reference/functions/current_transaction (et la référence
//   Snowpark : NULL sans transaction), user-guide/tables-iceberg-transactions (READ COMMITTED seulement),
//   sql-reference/constraints-overview (NOT NULL appliqué). Pas de point de sauvegarde : sql-reference/
//   commands-transaction (liste officielle : BEGIN, COMMIT, DESCRIBE TRANSACTION, ROLLBACK, SHOW LOCKS, SHOW TRANSACTIONS),
//   sql/rollback (ROLLBACK [ WORK ], sans TO SAVEPOINT), et SnowConvert pour Oracle (MSCEWI3111 : « Snowflake supports
//   neither SAVEPOINTS… »).
// - MySQL 8.0, dev.mysql.com/doc/refman/8.0/en : commit.html (START TRANSACTION, BEGIN), begin-end.html (dans une
//   procédure, BEGIN ouvre un bloc), implicit-commit.html (DDL, TRUNCATE, BEGIN et START TRANSACTION valident ; pas
//   CREATE TEMPORARY TABLE), savepoint.html, set-transaction.html (sans SESSION : la prochaine transaction seulement),
//   innodb-consistent-read.html (REPEATABLE READ par défaut ; un SELECT simple ne pose pas de verrou).
// docs.snowflake.com et dev.mysql.com n'étaient pas joignables depuis la session : vérifiés par extraits de recherche
// (et, pour MySQL, sur le serveur réel).
LEARNSQL.dico = (LEARNSQL.dico || []).concat([
  {
    id: "begin-transaction",
    nom: "BEGIN TRANSACTION",
    type: "mot-clé",
    categorie: "Transactions",
    definition: "Ouvre une transaction : les modifications qui suivent seront validées ensemble, ou annulées ensemble.",
    moteurs: {
      sqlserver: "`BEGIN TRAN` (ou `BEGIN TRANSACTION`) ; sans lui, chaque instruction est validée seule, tout de suite (autocommit)",
      snowflake: "`BEGIN`, `BEGIN TRANSACTION` ou `START TRANSACTION` ; dans un bloc Snowflake Scripting, écris `BEGIN TRANSACTION` (`BEGIN` seul y ouvre un bloc)",
      mysql: "`START TRANSACTION`, ou `BEGIN` ; dans une procédure, seulement `START TRANSACTION` (`BEGIN` y ouvre un bloc)"
    },
    noms: ["BEGIN TRAN", "BEGIN", "START TRANSACTION", "BEGIN WORK"],
    exemple: "BEGIN TRAN;\n  UPDATE commande SET statut = 'LIVREE' WHERE num_cde = 'CDE-1005';\n  INSERT INTO facture (id, num_fact, cde_id, date_fact, montant_ht, statut)\n  VALUES (5, 'FA-2026-0402', 5, '2026-04-15', 318.00, 'EMISE');\nCOMMIT;",
    exemples: {
      snowflake: "BEGIN TRANSACTION;\n  UPDATE commande SET statut = 'LIVREE' WHERE num_cde = 'CDE-1005';\n  INSERT INTO facture (id, num_fact, cde_id, date_fact, montant_ht, statut)\n  VALUES (5, 'FA-2026-0402', 5, '2026-04-15', 318.00, 'EMISE');\nCOMMIT;",
      mysql: "START TRANSACTION;\n  UPDATE commande SET statut = 'LIVREE' WHERE num_cde = 'CDE-1005';\n  INSERT INTO facture (id, num_fact, cde_id, date_fact, montant_ht, statut)\n  VALUES (5, 'FA-2026-0402', 5, '2026-04-15', 318.00, 'EMISE');\nCOMMIT;"
    },
    resultat: [["num_cde", "statut", "num_fact", "montant_ht"], ["CDE-1005", "LIVREE", "FA-2026-0402", "318.00"]],
    piege: "Une transaction ouverte puis oubliée (pas de COMMIT) garde ses verrous : l'ERP attend, les utilisateurs sont bloqués. Termine toujours par `COMMIT` ou `ROLLBACK`, et garde la transaction courte : jamais d'attente d'un clic dedans.",
    pratique: "L'ERP est bloqué par une transaction oubliée ? `DBCC OPENTRAN;` (SQL Server, droit db_owner) montre la plus ancienne transaction ouverte de la base : sa session (SPID) et son heure de début.",
    motsCles: ["transaction", "commencer", "démarrer", "ouvrir", "début", "begin", "begin tran", "start transaction", "autocommit", "tout ou rien", "plusieurs modifications", "atomique", "acid", "regrouper"],
    voirAussi: ["commit", "rollback", "savepoint", "try-catch", "xact-abort", "begin-end"],
    module: "m11"
  },
  {
    id: "commit",
    nom: "COMMIT",
    type: "mot-clé",
    categorie: "Transactions",
    definition: "Valide la transaction : ses modifications deviennent définitives, et visibles par les autres utilisateurs.",
    moteurs: {
      sqlserver: "`COMMIT` (ou `COMMIT TRAN`) ; avec deux `BEGIN TRAN` ouverts, il faut deux COMMIT : le premier ne valide rien",
      snowflake: "`COMMIT` ; attention, un ordre de structure (`CREATE`, `ALTER`, `DROP`…) fait aussi un COMMIT, sans prévenir",
      mysql: "`COMMIT` ; attention, un ordre de structure (`CREATE TABLE`, `ALTER`, `TRUNCATE`…) fait aussi un COMMIT, sans prévenir"
    },
    noms: ["COMMIT TRAN", "COMMIT TRANSACTION", "COMMIT WORK"],
    exemple: "BEGIN TRAN;\n  UPDATE commande SET statut = 'LIVREE'\n  WHERE num_cde IN ('CDE-1005', 'CDE-1006');\nCOMMIT;   -- définitif, et visible par tous",
    exemples: {
      snowflake: "BEGIN TRANSACTION;\n  UPDATE commande SET statut = 'LIVREE'\n  WHERE num_cde IN ('CDE-1005', 'CDE-1006');\nCOMMIT;   -- définitif, et visible par tous",
      mysql: "START TRANSACTION;\n  UPDATE commande SET statut = 'LIVREE'\n  WHERE num_cde IN ('CDE-1005', 'CDE-1006');\nCOMMIT;   -- définitif, et visible par tous"
    },
    resultat: "2 lignes modifiées : CDE-1005 et CDE-1006 passent à LIVREE, pour de bon.",
    piege: "Avant le COMMIT, les autres ne voient pas tes changements, ou attendent tes verrous : un COMMIT oublié dans SSMS bloque l'ERP. Après le COMMIT, plus de retour arrière : seule une sauvegarde (ou le Time Travel de Snowflake) rattrape une erreur.",
    pratique: "Par défaut, les 3 moteurs valident chaque instruction seule (autocommit). Mais une session réglée autrement par l'outil (MySQL `autocommit = 0`, SQL Server `IMPLICIT_TRANSACTIONS ON`, Snowflake `AUTOCOMMIT = FALSE`) attend ton COMMIT, même après un simple UPDATE.",
    motsCles: ["valider", "validation", "confirmer", "enregistrer", "définitif", "terminer", "fin", "transaction", "commit", "visible", "appliquer"],
    voirAussi: ["begin-transaction", "rollback", "trancount", "time-travel"],
    module: "m11"
  },
  {
    id: "rollback",
    nom: "ROLLBACK",
    type: "mot-clé",
    categorie: "Transactions",
    definition: "Annule toutes les modifications de la transaction en cours : les données reviennent comme avant.",
    moteurs: {
      sqlserver: "`ROLLBACK` (ou `ROLLBACK TRAN`) : annule tout depuis le premier `BEGIN TRAN` ; un `CREATE TABLE` fait dans la transaction est annulé aussi",
      snowflake: "`ROLLBACK` ; un ordre de structure (`CREATE`, `ALTER`…) a déjà validé tout ce qui le précède : ça ne s'annule plus",
      mysql: "`ROLLBACK` ; un ordre de structure (`CREATE TABLE`, `TRUNCATE`…) a déjà validé tout ce qui le précède : ça ne s'annule plus"
    },
    noms: ["ROLLBACK TRAN", "ROLLBACK TRANSACTION", "ROLLBACK WORK"],
    exemple: "BEGIN TRAN;\n  DELETE FROM facture WHERE statut = 'PAYEE';\n  -- Oups : ce n'étaient pas les bonnes factures\nROLLBACK;\nSELECT COUNT(*) AS nb_factures FROM facture;",
    exemples: {
      snowflake: "BEGIN TRANSACTION;\n  DELETE FROM facture WHERE statut = 'PAYEE';\n  -- Oups : ce n'étaient pas les bonnes factures\nROLLBACK;\nSELECT COUNT(*) AS nb_factures FROM facture;",
      mysql: "START TRANSACTION;\n  DELETE FROM facture WHERE statut = 'PAYEE';\n  -- Oups : ce n'étaient pas les bonnes factures\nROLLBACK;\nSELECT COUNT(*) AS nb_factures FROM facture;"
    },
    resultat: [["nb_factures"], [4]],
    piege: "Sur MySQL et Snowflake, un ordre de structure au milieu (`CREATE TABLE`, ou `TRUNCATE` sur MySQL) valide tout ce qui précède : avec un `CREATE TABLE` avant le `ROLLBACK`, il ne resterait ici que 2 factures. Garde ces ordres hors des transactions de données.",
    pratique: "Pour essayer un UPDATE sur la vraie base sans risque : ouvre une transaction, lance l'UPDATE, regarde le résultat avec un SELECT, puis `ROLLBACK`. Tu vois l'effet, rien ne change. Fais-le vite : les lignes restent verrouillées.",
    motsCles: ["annuler", "annulation", "défaire", "revenir en arrière", "retour", "erreur", "oups", "transaction", "rollback", "tester", "corriger", "effacer", "restaurer"],
    voirAussi: ["begin-transaction", "commit", "savepoint", "xact-abort", "truncate", "time-travel"],
    module: "m11"
  },
  {
    id: "savepoint",
    nom: "SAVE TRANSACTION",
    type: "mot-clé",
    categorie: "Transactions",
    definition: "Pose un point de retour dans une transaction, pour annuler seulement ce qui suit ce point.",
    moteurs: {
      sqlserver: "`SAVE TRAN nom_point;` puis `ROLLBACK TRAN nom_point;` : la transaction reste ouverte",
      snowflake: "Pas de point de sauvegarde : `ROLLBACK` annule toute la transaction ; découpe plutôt en deux transactions",
      mysql: "`SAVEPOINT nom_point;` puis `ROLLBACK TO SAVEPOINT nom_point;` : la transaction reste ouverte"
    },
    noms: ["SAVEPOINT", "SAVE TRAN", "ROLLBACK TO", "ROLLBACK TO SAVEPOINT", "RELEASE SAVEPOINT"],
    exemple: "BEGIN TRAN;\n  UPDATE commande SET statut = 'LIVREE' WHERE num_cde = 'CDE-1005';\n  SAVE TRAN avant_facture;\n  INSERT INTO facture (id, num_fact, cde_id, date_fact, montant_ht, statut)\n  VALUES (5, 'FA-2026-0402', 5, '2026-04-15', 318.00, 'EMISE');\n  ROLLBACK TRAN avant_facture;   -- annule seulement la facture\nCOMMIT;",
    exemples: {
      snowflake: "-- Pas de point de sauvegarde : deux transactions séparées\nBEGIN TRANSACTION;\n  UPDATE commande SET statut = 'LIVREE' WHERE num_cde = 'CDE-1005';\nCOMMIT;\nBEGIN TRANSACTION;\n  INSERT INTO facture (id, num_fact, cde_id, date_fact, montant_ht, statut)\n  VALUES (5, 'FA-2026-0402', 5, '2026-04-15', 318.00, 'EMISE');\nROLLBACK;   -- annule seulement la facture",
      mysql: "START TRANSACTION;\n  UPDATE commande SET statut = 'LIVREE' WHERE num_cde = 'CDE-1005';\n  SAVEPOINT avant_facture;\n  INSERT INTO facture (id, num_fact, cde_id, date_fact, montant_ht, statut)\n  VALUES (5, 'FA-2026-0402', 5, '2026-04-15', 318.00, 'EMISE');\n  ROLLBACK TO SAVEPOINT avant_facture;   -- annule seulement la facture\nCOMMIT;"
    },
    resultat: "CDE-1005 passe bien à LIVREE, mais la facture FA-2026-0402 n'existe pas : seul le travail fait après le point est annulé.",
    piege: "Sur SQL Server, `ROLLBACK` sans nom de point annule TOUTE la transaction, pas seulement depuis le point. Et `ROLLBACK TRAN point` ne ferme rien : sans `COMMIT` (ou `ROLLBACK`) ensuite, la transaction reste ouverte et garde ses verrous.",
    pratique: "Sur SQL Server, dans une procédure appelée pendant une transaction, pose un point au début (`SAVE TRAN debut_proc`) : en cas d'erreur, `ROLLBACK TRAN debut_proc` n'annule que son travail, si `XACT_STATE()` vaut 1. L'appelant garde le sien.",
    motsCles: ["point de sauvegarde", "savepoint", "annuler une partie", "partiel", "partie", "retour", "intermédiaire", "étape", "repère", "transaction", "rollback to", "save tran"],
    voirAussi: ["rollback", "begin-transaction", "trancount", "try-catch"],
    module: "m11"
  },
  {
    id: "isolation",
    nom: "SET TRANSACTION ISOLATION LEVEL",
    type: "mot-clé",
    categorie: "Transactions",
    definition: "Choisit ce qu'une transaction voit des modifications des autres, et si elle doit les attendre.",
    moteurs: {
      sqlserver: "`SET TRANSACTION ISOLATION LEVEL READ COMMITTED` (défaut) ; aussi `READ UNCOMMITTED`, `REPEATABLE READ`, `SNAPSHOT`, `SERIALIZABLE` ; reste actif pour la session",
      snowflake: "Un seul niveau : READ COMMITTED (chaque instruction voit ce qui était validé à son départ) ; pas de SET TRANSACTION",
      mysql: "Défaut : REPEATABLE READ ; `SET SESSION TRANSACTION ISOLATION LEVEL READ COMMITTED` ; sans `SESSION`, ne vaut que pour la prochaine transaction"
    },
    noms: ["ISOLATION LEVEL", "READ COMMITTED", "REPEATABLE READ", "SNAPSHOT", "SERIALIZABLE", "READ_COMMITTED_SNAPSHOT", "RCSI"],
    exemple: "SET TRANSACTION ISOLATION LEVEL SNAPSHOT;   -- base : ALLOW_SNAPSHOT_ISOLATION ON\nBEGIN TRAN;\n  SELECT COUNT(*) AS nb_livrees, SUM(montant_ht) AS ca_livre\n  FROM commande WHERE statut = 'LIVREE';\n  -- … les SELECT suivants voient la même photo des données\nCOMMIT;",
    exemples: {
      snowflake: "-- Pas de SET TRANSACTION : toujours READ COMMITTED\nBEGIN TRANSACTION;\n  SELECT COUNT(*) AS nb_livrees, SUM(montant_ht) AS ca_livre\n  FROM commande WHERE statut = 'LIVREE';\n  -- … chaque SELECT suivant voit ce qui est validé à son départ\nCOMMIT;",
      mysql: "SET TRANSACTION ISOLATION LEVEL REPEATABLE READ;   -- la prochaine transaction seulement\nSTART TRANSACTION;\n  SELECT COUNT(*) AS nb_livrees, SUM(montant_ht) AS ca_livre\n  FROM commande WHERE statut = 'LIVREE';\n  -- … les SELECT suivants voient la même photo des données\nCOMMIT;"
    },
    resultat: [["nb_livrees", "ca_livre"], [4, "8534.80"]],
    piege: "Monter en SERIALIZABLE « pour être tranquille » multiplie les blocages et les deadlocks sur l'ERP. Pour lire sans bloquer ni être bloqué, préfère SNAPSHOT ou RCSI (à valider avec l'éditeur), et souviens-toi que MySQL est en REPEATABLE READ par défaut, pas en READ COMMITTED.",
    pratique: "Pour savoir si ta base SQL Server lit sans bloquer : `SELECT name, is_read_committed_snapshot_on, snapshot_isolation_state_desc FROM sys.databases;` (1 = RCSI actif). Sur MySQL, `SELECT @@transaction_isolation;` donne ton niveau.",
    motsCles: ["isolation", "niveau", "niveau d'isolation", "verrou", "bloquer", "blocage", "cohérence", "photo", "concurrence", "attendre", "snapshot", "serializable", "repeatable", "fantôme", "rapport", "lecture"],
    voirAussi: ["nolock", "begin-transaction", "commit", "time-travel"],
    module: "m11"
  },
  {
    id: "nolock",
    nom: "NOLOCK",
    type: "mot-clé",
    categorie: "Transactions",
    definition: "Lit une table sans attendre les verrous, quitte à lire des données pas encore validées : une lecture sale.",
    moteurs: {
      sqlserver: "`FROM commande WITH (NOLOCK)` pour une table, ou `SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED` pour toute la session",
      snowflake: "Pas de NOLOCK ni de lecture sale : une lecture n'attend pas une écriture, elle lit la dernière version validée",
      mysql: "Pas de NOLOCK : `SET SESSION TRANSACTION ISOLATION LEVEL READ UNCOMMITTED` ; inutile en général, car un SELECT simple n'attend pas les écritures"
    },
    noms: ["WITH (NOLOCK)", "READ UNCOMMITTED", "READUNCOMMITTED"],
    exemple: "-- Session 1 : BEGIN TRAN; UPDATE commande SET montant_ht = 0 WHERE num_cde = 'CDE-1007';\n--             (pas encore validé)\n-- Session 2 :\nSELECT SUM(montant_ht) AS ca_en_cours\nFROM commande WITH (NOLOCK)\nWHERE statut = 'EN_COURS';",
    exemples: {
      snowflake: "-- Session 1 : BEGIN TRANSACTION; UPDATE commande SET montant_ht = 0 WHERE num_cde = 'CDE-1007';\n--             (pas encore validé)\n-- Session 2 : pas de NOLOCK, et pas d'attente\nSELECT SUM(montant_ht) AS ca_en_cours\nFROM commande\nWHERE statut = 'EN_COURS';",
      mysql: "-- Session 1 : START TRANSACTION; UPDATE commande SET montant_ht = 0 WHERE num_cde = 'CDE-1007';\n--             (pas encore validé)\n-- Session 2 :\nSET SESSION TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;\nSELECT SUM(montant_ht) AS ca_en_cours\nFROM commande WHERE statut = 'EN_COURS';"
    },
    resultat: [["ca_en_cours"], ["1608.00"]],
    piege: "Ce 1608.00 n'a peut-être jamais existé : si la session 1 annule, le vrai total reste 9558.00 (c'est ce que lisent Snowflake, et MySQL par défaut). NOLOCK peut aussi sauter ou doubler des lignes : jamais pour des chiffres qui servent à facturer, payer ou décider.",
    pratique: "Cherche les NOLOCK cachés : une vue ou une procédure qui en contient les passe à tous les rapports qui l'utilisent. `SELECT OBJECT_NAME(object_id) FROM sys.sql_modules WHERE definition LIKE '%NOLOCK%';` les liste (SQL Server).",
    motsCles: ["lecture sale", "dirty read", "sans verrou", "verrou", "bloquer", "blocage", "attendre", "rapide", "accélérer", "lent", "non validé", "read uncommitted", "nolock", "lire"],
    voirAussi: ["isolation", "begin-transaction", "rollback"],
    module: "m11"
  },
  {
    id: "xact-abort",
    nom: "SET XACT_ABORT",
    type: "mot-clé",
    categorie: "Transactions",
    definition: "Fait annuler toute la transaction dès la première erreur, au lieu de continuer avec la suite.",
    moteurs: {
      sqlserver: "`SET XACT_ABORT ON;` en tête de script ou de procédure ; sans lui (OFF, le défaut), beaucoup d'erreurs n'annulent que l'instruction fautive",
      snowflake: "Pas de XACT_ABORT : `ALTER SESSION SET TRANSACTION_ABORT_ON_ERROR = TRUE;` annule toute la transaction à la première erreur ; par défaut (FALSE), seule l'instruction en erreur est annulée ; dans un bloc, fais le `ROLLBACK` dans `EXCEPTION`",
      mysql: "Pas de XACT_ABORT : l'instruction en erreur est annulée seule, la transaction reste ouverte ; dans une procédure, `DECLARE EXIT HANDLER FOR SQLEXCEPTION` + `ROLLBACK`"
    },
    noms: ["XACT_ABORT", "XACT_ABORT ON"],
    exemple: "SET XACT_ABORT ON;\nBEGIN TRAN;\n  UPDATE commande SET statut = 'LIVREE' WHERE num_cde = 'CDE-1005';\n  INSERT INTO facture (id, num_fact, cde_id, date_fact, statut)   -- montant_ht oublié\n  VALUES (5, 'FA-2026-0402', 5, '2026-04-15', 'EMISE');\nCOMMIT;",
    exemples: {
      snowflake: "BEGIN TRANSACTION;\n  UPDATE commande SET statut = 'LIVREE' WHERE num_cde = 'CDE-1005';\n  INSERT INTO facture (id, num_fact, cde_id, date_fact, statut)   -- montant_ht oublié : erreur\n  VALUES (5, 'FA-2026-0402', 5, '2026-04-15', 'EMISE');\nROLLBACK;   -- pas automatique : à faire soi-même",
      mysql: "START TRANSACTION;\n  UPDATE commande SET statut = 'LIVREE' WHERE num_cde = 'CDE-1005';\n  INSERT INTO facture (id, num_fact, cde_id, date_fact, statut)   -- montant_ht oublié : erreur 1364\n  VALUES (5, 'FA-2026-0402', 5, '2026-04-15', 'EMISE');\nROLLBACK;   -- pas automatique : à faire soi-même"
    },
    resultat: "L'INSERT plante (montant_ht est obligatoire) : avec XACT_ABORT ON, toute la transaction est annulée, et CDE-1005 reste EN_COURS, sans facture.",
    piege: "Sans XACT_ABORT ON, seul l'INSERT est annulé : le COMMIT valide CDE-1005 à LIVREE sans facture, et personne n'est prévenu. MySQL et Snowflake font pareil par défaut : prévois toi-même le `ROLLBACK` (handler MySQL, bloc `EXCEPTION` Snowflake).",
    pratique: "Pour modifier une table d'un serveur lié (linked server) dans une transaction, `SET XACT_ABORT ON` est obligatoire avec la plupart des fournisseurs OLE DB, dont celui de SQL Server.",
    motsCles: ["erreur", "annuler", "automatique", "transaction", "xact_abort", "abort", "arrêter", "incohérent", "moitié", "à moitié", "sécurité", "procédure", "plante", "rollback automatique"],
    voirAussi: ["try-catch", "rollback", "begin-transaction", "throw"],
    module: "m11"
  },
  {
    id: "trancount",
    nom: "@@TRANCOUNT",
    type: "fonction",
    categorie: "Transactions",
    definition: "Donne le nombre de BEGIN TRAN encore ouverts dans la session : 0 veut dire aucune transaction.",
    moteurs: {
      sqlserver: "`@@TRANCOUNT` : +1 à chaque `BEGIN TRAN`, -1 à chaque `COMMIT`, retour à 0 après un `ROLLBACK`",
      snowflake: "Pas de @@TRANCOUNT : `SELECT CURRENT_TRANSACTION();` donne le numéro de la transaction ouverte, ou NULL ; un 2e `BEGIN` est ignoré",
      mysql: "Pas de @@TRANCOUNT ni de transaction imbriquée : un 2e `START TRANSACTION` valide d'abord la transaction en cours"
    },
    noms: ["TRANCOUNT", "CURRENT_TRANSACTION"],
    exemple: "BEGIN TRAN;\n  UPDATE commande SET statut = 'LIVREE' WHERE num_cde = 'CDE-1005';\n  BEGIN TRAN;      -- ouvert par une procédure appelée\n  COMMIT;          -- ne valide rien : le compteur passe de 2 à 1\n  SELECT @@TRANCOUNT AS niveau;\nROLLBACK;          -- annule tout, l'UPDATE aussi : retour à 0",
    exemples: {
      snowflake: "BEGIN TRANSACTION;\n  UPDATE commande SET statut = 'LIVREE' WHERE num_cde = 'CDE-1005';\n  BEGIN TRANSACTION;   -- ignoré : pas d'imbrication\n  SELECT CURRENT_TRANSACTION() AS id_transaction;   -- un numéro, pas un niveau\nROLLBACK;              -- annule l'UPDATE",
      mysql: "START TRANSACTION;\n  UPDATE commande SET statut = 'LIVREE' WHERE num_cde = 'CDE-1005';\n  START TRANSACTION;   -- valide d'abord l'UPDATE (COMMIT implicite) !\nROLLBACK;              -- n'annule plus rien : CDE-1005 reste LIVREE"
    },
    resultat: [["niveau"], [1]],
    piege: "Un `ROLLBACK` dans une procédure appelée annule aussi le travail de l'appelant (erreur 266 : le compteur n'est plus le même). Dans un CATCH, écris `IF @@TRANCOUNT > 0 ROLLBACK;` : un ROLLBACK sans transaction ouverte plante, et cache la vraie erreur.",
    pratique: "Avant de fermer une fenêtre SSMS ou de partir en pause, lance `SELECT @@TRANCOUNT;` : plus de 0, une transaction est encore ouverte et bloque peut-être l'ERP. Finis-la par `COMMIT` ou `ROLLBACK`.",
    motsCles: ["transaction ouverte", "combien", "compteur", "niveau", "imbriquée", "imbrication", "en cours", "oubliée", "vérifier", "trancount", "ouverte", "nombre de transactions"],
    voirAussi: ["begin-transaction", "commit", "rollback", "try-catch", "savepoint"],
    module: "m11"
  }
]);
