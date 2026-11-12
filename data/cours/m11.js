// Parcours SQL — Cours complet du module m11 « Transactions et verrous », version 1 (12/11/2026).
// Écrit à partir de la fiche de révision (data/fiches/m11.js, l'ancien cours court) et des 100 « retenir » de
// data/m11-transactions.js. Squelette validé par l'élève (m02 v2) : Exemple (qui MONTRE le piège) → Résultat → « Ce qui se
// passe » → « Pourquoi » → « Le piège » (l'erreur vue en entreprise) → « Le bon réflexe » → « SQL Server / Snowflake »
// ou « Et aussi » → À retenir. Chaque mot technique est expliqué à sa première apparition. Module de concurrence : un
// exemple à 2 sessions a pour résultat une phrase (ce que voit chaque session, le message d'erreur).
// Résultats vérifiés avec SQLite sur docs/base-exemple.sql (scratchpad cours-complets/m11 : verif.py, et verif_cours.py
// qui rejoue les exemples tels qu'écrits ; une session pour ROLLBACK, COMMIT et les nombres de lignes, deux connexions en
// mode WAL pour « la dernière version validée », comme RCSI et Snowflake) : transfert de 20 CHL-5 Lyon → Nantes (pendant :
// 40, 40, 40 ; après ROLLBACK : 60, 40, 20) ; commande EDI CDE-1009 avec l'article 99 inconnu (sans protection : en-tête à
// 289.00 validé sans sa ligne ; avec ROLLBACK : aucune trace) ; CDE-1007 et flux 6 après ROLLBACK (EN_COURS, REJET) ;
// recalcul des tarifs (8 lignes ; l'autre session lit 39.90) ; deadlock (les 4 UPDATE touchent 1 ligne chacun) ; stock
// CHL-5 pendant le transfert (lecture sale : 100 ; version validée : 120) ; réservation de 5 ROB-X (piège : les deux
// lisent 5, stock final 0 ; juste : 1 ligne puis 0 ligne). Sans équivalent SQLite (attente, deadlock, NOLOCK, XACT_ABORT,
// @@TRANCOUNT, erreurs 547, 266, 1205, 1222, 3960) : la documentation ci-dessous.
// Sources (vérifiées le 12/11/2026) : learn.microsoft.com/sql : t-sql/statements/set-xact-abort-transact-sql (OFF : souvent
// seule l'instruction fautive est annulée, exemple d'une erreur de clé étrangère puis COMMIT ; ON par défaut dans un
// trigger), t-sql/language-elements/try-catch-transact-sql (le CATCH ne renvoie pas l'erreur à l'appelant),
// t-sql/functions/xact-state-transact-sql (1, 0, -1), t-sql/language-elements/commit-transaction- et
// rollback-transaction-transact-sql (COMMIT intérieur : -1 au compteur ; ROLLBACK jusqu'au 1er BEGIN, @@TRANCOUNT à 0 ;
// point de sauvegarde), errors-events 0 à 999 (266, gravité 16) et 1000 à 1999 (1065, 1222),
// t-sql/statements/set-transaction-isolation-level-transact-sql (READ COMMITTED par défaut ; READ_COMMITTED_SNAPSHOT OFF
// par défaut sur SQL Server, ON sur Azure SQL Database ; SNAPSHOT = photo de la transaction ; READ UNCOMMITTED = NOLOCK),
// t-sql/queries/hints-transact-sql-table (NOLOCK : données jamais validées, lignes vues deux fois ou pas du tout ; Sch-S
// et Sch-M), relational-databases/sql-server-transaction-locking-and-row-versioning-guide (autocommit, S, U, X, escalade
// à 5 000 verrous d'une instruction sur une table, lectures manquées ou doublées, mise à jour perdue, UPDATE sous RCSI par
// verrous U, conflit 3960, version store dans tempdb ou dans la base avec ADR, LOCK_TIMEOUT -1 et erreur 1222),
// relational-databases/sql-server-deadlocks-guide (recherche toutes les 5 s, victime la moins coûteuse à annuler sauf
// DEADLOCK_PRIORITY, erreur 1205, relance après une pause, system_health), t-sql/statements/set-implicit-transactions-
// transact-sql, troubleshoot/sql/database-engine/performance/understand-resolve-blocking (blocking_session_id, transaction
// oubliée, ROLLBACK aussi long que le travail, rare avec ADR), t-sql/database-console-commands/dbcc-opentran-transact-sql,
// t-sql/language-elements/kill-transact-sql, relational-databases/sequence-numbers (numéros perdus au ROLLBACK).
// docs.snowflake.com (lu avec curl, pages .md) : sql-reference/transactions (BEGIN ignoré si une transaction est ouverte ;
// DDL = COMMIT implicite ; AUTOCOMMIT TRUE par défaut ; une instruction en erreur est annulée seule, la transaction reste
// ouverte et COMMIT valide le reste ; READ COMMITTED seulement, au départ de chaque instruction ; UPDATE, DELETE et MERGE
// se bloquent en général entre eux, INSERT et COPY rarement ; LOCK_TIMEOUT ; deadlock : l'instruction la plus récente est
// annulée, la transaction reste ouverte ; SHOW LOCKS, SHOW TRANSACTIONS, SYSTEM$ABORT_TRANSACTION), sql-reference/sql/begin
// (START TRANSACTION), sql-reference/parameters (LOCK_TIMEOUT 43200 s ; TRANSACTION_ABORT_ON_ERROR, FALSE par défaut :
// TRUE annule la transaction à la première erreur ; TRANSACTION_DEFAULT_ISOLATION_LEVEL : READ COMMITTED seul),
// user-guide/querying-sequences (pas de garantie sans trou), user-guide/data-time-travel (1 jour par défaut).
// Couverture des 100 « retenir » : scratchpad cours-complets/m11/couverture.txt. Laissées à l'explication de leur
// question (une seule question, règle 6 de docs/plan-sql.md) : version store dans tempdb (q22), verrous d'intention (q32),
// READPAST (q45), TABLOCK (q46), DELAYED_DURABILITY (q58), portée du SET et des indicateurs (q59, q60), activation de
// RCSI (q66), attentes LCK_M_* (q69), blocked process report (q70), clé étrangère sans index (q74), ROWLOCK / PAGLOCK
// (q75), LOCK_ESCALATION (q76, q77), pessimiste ou optimiste (q79), MSDTC (q82), réplica lisible (q91), NOLOCK sur la
// cible d'un UPDATE (q92).
LEARNSQL.cours.m11 = {
  intro: "Ton intégration EDI de la nuit plante au milieu d'une commande : que reste-t-il dans Divalto ? Et pourquoi la saisie « tourne » quand le recalcul des tarifs déborde le matin ? Tout tient dans la transaction (un bloc d'instructions validé ou annulé en entier) et ses verrous (ses réservations de lignes). Ce module t'évite la commande à moitié enregistrée, le traitement qui bloque les saisies et le rapport `NOLOCK` aux chiffres faux.",
  sections: [
    {
      titre: "Tout ou rien : BEGIN TRAN, COMMIT, ROLLBACK",
      exemple: "-- 20 sacs CHL-5 de Lyon (dépôt 1) vers Nantes (dépôt 3)\nBEGIN TRAN;\nUPDATE dbo.stock_depot SET qte = qte - 20 WHERE article_id = 1 AND depot_id = 1;\nUPDATE dbo.stock_depot SET qte = qte + 20 WHERE article_id = 1 AND depot_id = 3;\nSELECT depot_id, qte FROM dbo.stock_depot\nWHERE article_id = 1 ORDER BY depot_id;\nROLLBACK;   -- annule tout ; COMMIT aurait tout validé",
      resultat: [["depot_id", "qte pendant", "qte après ROLLBACK"], [1, 40, 60], [2, 40, 40], [3, 40, 20]],
      points: [
        "Ce qui se passe : pendant la transaction, la session voit son transfert, 40 sacs partout. Après `ROLLBACK`, tout revient comme avant. Un `COMMIT` aurait validé les deux UPDATE ensemble.",
        "Pourquoi : sans `BEGIN TRAN`, SQL Server est en autocommit : chaque instruction est validée seule, dès qu'elle finit. La transaction fait des deux UPDATE un seul bloc : le A d'ACID (Atomicité, Cohérence, Isolation, Durabilité).",
        "Le piège : le transfert sans transaction. Le traitement s'arrête entre les deux UPDATE : 20 sacs quittent Lyon sans arriver à Nantes. Même chose pour une commande EDI enregistrée sans ses lignes.",
        "Le bon réflexe : `BEGIN TRAN` … `COMMIT` autour de ce qui va ensemble, rien de plus. Un COMMIT confirmé est durable (le D) : écrit dans le journal des modifications (log) avant la réponse, il survit à une panne.",
        "SQL Server / Snowflake : Snowflake écrit `BEGIN` ou `START TRANSACTION`, puis `COMMIT` ou `ROLLBACK`, lui aussi en autocommit. Sans autocommit (`IMPLICIT_TRANSACTIONS ON` sur SQL Server, `AUTOCOMMIT = FALSE` sur Snowflake), tout attend ton COMMIT."
      ],
      retenir: "Une transaction, c'est tout ou rien : COMMIT valide, ROLLBACK annule. Sans BEGIN TRAN, chaque instruction est validée seule."
    },
    {
      titre: "Une erreur au milieu : la transaction continue",
      exemple: "SET XACT_ABORT ON;   -- sans lui ni TRY : l'en-tête serait validé seul\nBEGIN TRY\n  BEGIN TRAN;\n    INSERT INTO dbo.commande (id, num_cde, client_id, date_cde, statut, canal, montant_ht)\n    VALUES (9, 'CDE-1009', 1, '20260414', 'EN_COURS', 'EDI', 289.00);\n    INSERT INTO dbo.ligne_cde (id, cde_id, article_id, qte, prix_unit)\n    VALUES (12, 9, 99, 2, 144.50);   -- l'article 99 n'existe pas\n  COMMIT;\nEND TRY\nBEGIN CATCH\n  IF @@TRANCOUNT > 0 ROLLBACK;\n  THROW;   -- l'erreur remonte\nEND CATCH;",
      resultat: "Sans protection : erreur 547, puis COMMIT de l'en-tête seul. Avec ce modèle : tout est annulé, et l'erreur remonte.",
      points: [
        "Ce qui se passe : la clé étrangère (le lien obligatoire vers `article`) refuse la ligne : erreur 547. Le moteur saute dans le CATCH, le bloc de secours du TRY : il annule tout, puis `THROW` renvoie l'erreur.",
        "Pourquoi : par défaut, une erreur de contrainte (doublon, clé étrangère) n'annule que l'instruction fautive ; la suite s'exécute, COMMIT compris. `SET XACT_ABORT ON` change la règle : une erreur annule toute la transaction.",
        "Le piège : un CATCH sans `THROW` « avale » l'erreur : le traitement EDI croit l'intégration réussie, et le flux n'est jamais rejeté. Pire : un `COMMIT` dans le CATCH valide la commande à moitié.",
        "Le bon réflexe : ce modèle dans chaque procédure qui modifie. `IF @@TRANCOUNT > 0` (une transaction est ouverte) évite un ROLLBACK sans transaction. Dans le CATCH, `XACT_STATE() = -1` signale une transaction condamnée : seul ROLLBACK passe.",
        "SQL Server / Snowflake : Snowflake aussi n'annule que l'instruction en erreur, et COMMIT valide le reste. `ALTER SESSION SET TRANSACTION_ABORT_ON_ERROR = TRUE` y annule toute la transaction dès la première erreur."
      ],
      retenir: "Une erreur n'annule pas la transaction : XACT_ABORT ON, TRY / CATCH avec ROLLBACK, puis THROW."
    },
    {
      titre: "Transactions imbriquées : ROLLBACK annule tout",
      exemple: "BEGIN TRAN;                             -- @@TRANCOUNT = 1\nUPDATE dbo.commande SET statut = 'LIVREE' WHERE id = 7;\n  BEGIN TRAN;                           -- 2 : une procédure appelée\n  UPDATE dbo.flux_edi SET statut = 'OK', motif = NULL WHERE id = 6;\n  COMMIT;                               -- 1 : ne valide rien\nROLLBACK;                               -- 0 : tout est annulé\nSELECT c.statut AS statut_cde, f.statut AS statut_flux\nFROM dbo.commande AS c JOIN dbo.flux_edi AS f ON f.cde_id = c.id\nWHERE f.id = 6;",
      resultat: [["statut_cde", "statut_flux"], ["EN_COURS", "REJET"]],
      points: [
        "Ce qui se passe : CDE-1007 reste EN_COURS et son avis d'expédition (flux 6) reste REJET. Le COMMIT intérieur n'a rien validé : il a fait passer `@@TRANCOUNT`, le compteur de transactions, de 2 à 1.",
        "Pourquoi : SQL Server n'a pas de transaction dans la transaction. `BEGIN TRAN` ajoute 1, `COMMIT` retire 1 : seul le dernier COMMIT, de 1 à 0, valide. `ROLLBACK` annule tout et remet le compteur à 0.",
        "Le piège : une procédure appelée dans une transaction fait son propre ROLLBACK. Elle annule aussi le travail de l'appelant, qui reçoit l'erreur 266 : le compteur a changé pendant l'appel.",
        "Le bon réflexe : pour n'annuler qu'une partie, un point de sauvegarde : `SAVE TRANSACTION p1;`, puis `ROLLBACK TRANSACTION p1;` ; la transaction reste ouverte. Une procédure appelée pose son point au lieu d'ouvrir sa transaction.",
        "SQL Server / Snowflake : SQL Server annule aussi un `CREATE TABLE` fait dans la transaction (un DDL, un ordre de structure). Snowflake valide la transaction à chaque DDL et ignore un 2e `BEGIN` ; pas de point de sauvegarde."
      ],
      retenir: "Seul le dernier COMMIT valide ; ROLLBACK annule tout, SAVE TRANSACTION une partie. Snowflake : un DDL valide la transaction."
    },
    {
      titre: "Les verrous : une écriture fait attendre les autres",
      exemple: "-- Session 1, 7 h 50 : recalcul des tarifs, pas encore validé\nBEGIN TRAN;\nUPDATE dbo.article SET prix_tarif = prix_tarif * 1.03;   -- 8 lignes ici, des milliers chez toi\n\n-- Session 2, 8 h 05 : la saisie lit le tarif\nSELECT code, prix_tarif FROM dbo.article WHERE code = 'CHL-5';",
      resultat: "Session 2 : rien ne s'affiche ; elle attend la fin de la session 1. Snowflake lirait tout de suite 39.90, le prix validé.",
      points: [
        "Ce qui se passe : la saisie « tourne », sans message, jusqu'à la fin de la session 1. SQL Server attend sans limite par défaut ; `SET LOCK_TIMEOUT 5000` coupe l'attente après 5 secondes (erreur 1222).",
        "Pourquoi : écrire pose un verrou exclusif (X, une réservation) jusqu'à la fin de la transaction ; lire demande un verrou partagé (S), incompatible avec X. Au-delà de 5 000 verrous, une instruction verrouille toute la table (l'escalade).",
        "Le piège : la transaction qui dure. Un `BEGIN TRAN` oublié dans SSMS, un écran qui attend un clic « Valider », un traitement de nuit qui déborde sur 8 h : les saisies se figent.",
        "Le bon réflexe : transactions courtes, gros traitements par lots (m09) hors des heures de saisie. Qui bloque ? La colonne `blocking_session_id` de `sys.dm_exec_requests` ; `DBCC OPENTRAN` donne la plus vieille transaction ouverte.",
        "SQL Server / Snowflake : Snowflake ne bloque jamais une lecture, mais deux UPDATE, DELETE ou MERGE sur une même table s'attendent en général, jusqu'à `LOCK_TIMEOUT` (12 heures par défaut). `SHOW LOCKS` montre qui bloque."
      ],
      retenir: "Une écriture bloque jusqu'au COMMIT : transactions courtes, gros traitements par lots hors des heures de saisie."
    },
    {
      titre: "Le deadlock : deux sessions qui s'attendent",
      exemple: "-- Session 1 (EDI) : l'article, puis son stock\nBEGIN TRAN;\nUPDATE dbo.article     SET stock = stock - 1 WHERE id = 6;\nUPDATE dbo.stock_depot SET qte = qte - 1 WHERE article_id = 6 AND depot_id = 1;\n-- Session 2, en même temps : l'ordre inverse\nBEGIN TRAN;\nUPDATE dbo.stock_depot SET qte = qte + 1 WHERE article_id = 6 AND depot_id = 1;\nUPDATE dbo.article     SET stock = stock + 1 WHERE id = 6;",
      resultat: "Chacune attend l'autre. Après quelques secondes, SQL Server annule l'une, la victime (erreur 1205) ; l'autre finit normalement.",
      points: [
        "Ce qui se passe : la session 1 tient l'article ROB-X, la session 2 son stock à Lyon ; chacune attend ce que l'autre tient. Aucune ne peut finir : c'est un interblocage (deadlock).",
        "Pourquoi : un blocage finit quand l'autre valide ; un deadlock, jamais. SQL Server cherche ces cycles toutes les 5 secondes et annule la transaction la moins coûteuse à défaire.",
        "Le piège : la victime est peut-être l'intégration EDI. Si le programme ignore l'erreur 1205, la commande n'est jamais intégrée, et personne ne le voit avant la relance du client.",
        "Le bon réflexe : le même ordre partout (l'article, puis le stock), des transactions courtes, de bons index (moins de lignes verrouillées). Dans le CATCH, si `ERROR_NUMBER() = 1205`, attendre un peu et relancer, trois fois au plus.",
        "SQL Server / Snowflake : `SET DEADLOCK_PRIORITY LOW` désigne un traitement de nuit comme victime ; le journal `system_health` garde le schéma des derniers deadlocks. Snowflake n'annule que l'instruction victime : la transaction reste ouverte."
      ],
      retenir: "Deadlock : deux sessions s'attendent, l'une est annulée (erreur 1205). Même ordre d'accès, transactions courtes, relance sur 1205."
    },
    {
      titre: "Lire pendant une écriture : NOLOCK ou RCSI",
      exemple: "-- Session 1 : le transfert de la section 1, à mi-chemin\nBEGIN TRAN;\nUPDATE dbo.stock_depot SET qte = qte - 20 WHERE article_id = 1 AND depot_id = 1;\n\n-- Session 2 : le rapport de stock, en NOLOCK\nSELECT SUM(qte) AS stock_chl5\nFROM dbo.stock_depot WITH (NOLOCK)\nWHERE article_id = 1;",
      resultat: [["la session 2 lit en…", "stock_chl5"], ["READ COMMITTED (défaut)", "attend"], ["NOLOCK", 100], ["RCSI", 120], ["Snowflake", 120]],
      points: [
        "Ce qui se passe : le vrai stock est de 120 sacs, dont 20 « en route ». Selon le niveau d'isolation (ce qu'une lecture voit des écritures en cours), le rapport attend, lit 100 ou 120.",
        "Pourquoi : READ COMMITTED, le défaut, ne lit que du validé : il attend le verrou. `NOLOCK` lit le non validé, sans verrou : une lecture sale. RCSI, une option de la base, lit la dernière version validée.",
        "Le piège : `NOLOCK` partout dans les rapports, « pour aller vite ». Ici, 20 sacs disparaissent ; si la session 1 annule, ce chiffre n'a jamais existé. `NOLOCK` peut aussi sauter ou doubler une ligne qui bouge.",
        "Le bon réflexe : RCSI (`ALTER DATABASE … SET READ_COMMITTED_SNAPSHOT ON`) plutôt que `NOLOCK`, à tester avec l'éditeur de l'ERP. Un rapport en plusieurs SELECT : `SNAPSHOT` (la même photo pour toute la transaction), ou une copie figée, comme un entrepôt.",
        "SQL Server / Snowflake : Snowflake n'a qu'un niveau, READ COMMITTED : chaque requête lit ce qui était validé à son départ, sans attendre. Azure SQL Database active RCSI par défaut."
      ],
      retenir: "NOLOCK lit du non validé : jamais pour des chiffres qui comptent. Pour ne plus attendre : RCSI, comme Snowflake."
    },
    {
      titre: "Lire, puis écrire : la mise à jour perdue",
      exemple: "-- 2 sessions à la fois : réserver 5 ROB-X (stock 5)\nDECLARE @stock int = (SELECT stock FROM dbo.article WHERE code = 'ROB-X');\nIF @stock >= 5   -- les deux lisent 5…\n  UPDATE dbo.article SET stock = @stock - 5 WHERE code = 'ROB-X';   -- …et écrivent 0\n\n-- Juste :\nUPDATE dbo.article SET stock = stock - 5\nWHERE code = 'ROB-X' AND stock >= 5;   -- 2e session : 0 ligne",
      resultat: "Piège : stock 0, mais 10 robots promis pour 5. Juste : la 2e session trouve 0 et ne modifie rien.",
      points: [
        "Ce qui se passe : en deux temps, les deux sessions lisent 5 et écrivent 0. En une instruction, la 2e trouve 0 : `@@ROWCOUNT` (les lignes touchées) vaut 0, réservation refusée.",
        "Pourquoi : entre le SELECT et l'UPDATE, l'autre session lit la même valeur : le verrou de lecture est déjà rendu. C'est la mise à jour perdue. Un seul UPDATE garde la ligne verrouillée du test à l'écriture.",
        "Le piège : un numéro de facture par `MAX(num) + 1` : deux factures au même numéro. Ou « IF NOT EXISTS, puis INSERT » contre les doublons : deux sessions passent le test ensemble.",
        "Le bon réflexe : un compteur, `UPDATE … SET n = n + 1 OUTPUT inserted.n` ; un doublon, une contrainte UNIQUE. Lire pour modifier ensuite : `WITH (UPDLOCK)` réserve la ligne dès la lecture, jusqu'au COMMIT, et évite aussi un deadlock.",
        "SQL Server / Snowflake : les deux ont des SEQUENCE (des générateurs de numéros) : uniques, mais avec des trous possibles, après un ROLLBACK par exemple. Factures sans trou : une table compteur, mise à jour dans la transaction de la facture."
      ],
      retenir: "Lire puis écrire en deux fois perd des mises à jour : test et calcul dans l'UPDATE, ou UPDLOCK."
    },
    {
      titre: "Détails utiles",
      points: [
        "Gros volumes : des lots de moins de 5 000 lignes (m09), un COMMIT par lot. Note le dernier lot dans la même transaction : après une panne, tu repars de là.",
        "Relire une ligne dans une transaction peut rendre une autre valeur (lecture non répétable) ou de nouvelles lignes (fantômes). `REPEATABLE READ` garde les verrous de lecture ; `SERIALIZABLE` (ou `HOLDLOCK`) verrouille aussi la plage lue.",
        "`SNAPSHOT` : `ALLOW_SNAPSHOT_ISOLATION ON` sur la base, puis `SET TRANSACTION ISOLATION LEVEL SNAPSHOT`. Deux sessions modifient la même ligne : la 2e reçoit l'erreur 3960, à relancer.",
        "Une transaction ouverte des heures fait grossir le journal. `KILL 87` coupe sa session et l'annule : ROLLBACK parfois aussi long que le travail fait. Snowflake : `SYSTEM$ABORT_TRANSACTION(id)`, id lu dans `SHOW TRANSACTIONS`.",
        "`TRUNCATE TABLE` et `ALTER TABLE` demandent un verrou de structure (Sch-M) : une simple lecture les fait attendre. Index reconstruit en journée : `WITH (ONLINE = ON)`, en édition Enterprise ou sur Azure.",
        "Un trigger (un code lancé à chaque modification de la table) tourne dans la même transaction : son erreur annule l'instruction, sa lenteur rallonge les verrous.",
        "Après le COMMIT, plus de ROLLBACK : SQL Server repart d'une sauvegarde ; Snowflake relit l'avant avec Time Travel, 1 jour par défaut (m14)."
      ],
      retenir: "Gros traitements : lots courts, hors des heures de saisie. Après COMMIT : sauvegarde ou Time Travel."
    }
  ],
  differences: [
    ["Ouvrir une transaction", "`BEGIN TRAN`", "`BEGIN` / `START TRANSACTION`"],
    ["Tout annuler à l'erreur", "`SET XACT_ABORT ON`", "`TRANSACTION_ABORT_ON_ERROR`"],
    ["DDL dans la transaction", "Annulé par ROLLBACK", "COMMIT implicite"],
    ["Niveaux d'isolation", "Cinq, défaut READ COMMITTED", "READ COMMITTED seul"],
    ["Lecture pendant une écriture", "Attend, sauf RCSI / SNAPSHOT", "Jamais bloquée"],
    ["Lecture sale", "`NOLOCK`", "Impossible"],
    ["Attente d'un verrou", "Sans limite (-1)", "12 h (`LOCK_TIMEOUT`)"],
    ["Victime d'un deadlock", "Transaction annulée (1205)", "Instruction annulée"],
    ["Voir qui bloque", "`sys.dm_exec_requests`", "`SHOW LOCKS`"],
    ["Annuler après COMMIT", "Sauvegarde", "Time Travel"]
  ]
};
