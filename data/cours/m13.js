// Parcours SQL — Cours complet du module m13 « Programmer en T-SQL », version 1 (12/11/2026).
// Écrit à partir de la fiche de révision (data/fiches/m13.js, l'ancien cours court) et des 100 « retenir » de
// data/m13-tsql.js. Squelette validé par l'élève (m02 v2) : Exemple (qui MONTRE le piège) → Résultat → « Ce qui se
// passe » → « Pourquoi » → « Le piège » (l'erreur vue en entreprise) → « Le bon réflexe » → « SQL Server / Snowflake »
// ou « Et aussi » → À retenir. Chaque mot technique est expliqué à sa première apparition. TRY / CATCH, XACT_ABORT,
// THROW; et @@TRANCOUNT sont enseignés en m11 : ce cours part de là (journal, erreurs maison, RETURN contre THROW). Les
// anti-patterns (curseurs, fonctions scalaires) : m16, réécrit en même temps ; ici, l'essentiel et un renvoi.
// Exemples sur docs/base-exemple.sql, sans table ni ligne ajoutée : la base n'a pas de table de journal, le journal de la
// section 4 est donc une variable table (c'est le sujet de la section) ; le flux EDI rejeté n° 3 et les 2 fiches
// « Piscines Dumont » portent les pièges.
// Résultats vérifiés avec SQLite sur une base fraîche à chaque essai (scratchpad cours-complets/m13 : verif.py,
// 21 contrôles, et rejouer.py, qui relit les résultats TELS QU'ÉCRITS dans ce fichier, 11 contrôles ; 0 écart) :
// 2 fiches « Piscines Dumont » (ids 2 et 6), 0 « Piscine Dumont », sous-requête vide = NULL ; 2 flux REJET, purge des
// flux de mars = 4 lignes (1 à 4, dont le rejet n° 3) ; 2 rejets AquaBleu ; ROLLBACK : 3 commandes EN_COURS
// (CDE-1005 à 1007) et 2 flux REJET (3, 6) restaurés, journal simulé hors transaction (3, 2), table temporaire vidée ;
// CA des 5 piscinistes français hors annulées (2580.00, NULL, 318.00, 79.80, NULL) ; injection : texte collé
// 7 lignes, paramètre 0 ligne, « x'; DELETE FROM flux_edi; -- » vide la table des flux (aucune clé étrangère vers
// elle) ; Snowflake 'Rejets : 2'.
// Sans équivalent SQLite, vérifié à la main, deux fois, et dans la documentation : SELECT @v sur 2 lignes (une des
// deux, la dernière lue) ou 0 ligne (inchangée) ; SET @v = (sous-requête) : erreur 512 ou NULL ; @n1 NULL sans OUTPUT
// à l'appel ; variable table intacte après ROLLBACK ; @@ROWCOUNT lu dans l'INSERT qui suit l'UPDATE (3 puis 2) ;
// chaîne dynamique « … WHERE nom = 'AquaBleu' OR 1 = 1 --' » ; 'Rejets : ' || 2 sur Snowflake.
// Sources (lues le 12/11/2026). learn.microsoft.com/sql (sql-server-ver17) : t-sql/language-elements/
// select-local-variable-transact-sql (plusieurs valeurs : la dernière rendue ; aucune ligne : valeur gardée ; sous-requête
// vide : NULL ; concaténer dans une variable : STRING_AGG), set-local-variable-transact-sql (NULL après DECLARE ; une
// variable ne remplace pas un nom d'objet), declare-local-variable-transact-sql (portée = le lot ; variable table sans
// statistiques, prudence au-delà de 100 lignes, compilation différée en 2019), errors-events 0 à 999 (512),
// t-sql/data-types/table-transact-sql (« transaction rollbacks don't affect them » ; créée dans tempdb ; pas de SELECT
// INTO ; invisible du SQL dynamique), t-sql/statements/create-table-transact-sql (#table d'une procédure : supprimée à sa
// fin, visible des procédures appelées), create-procedure-transact-sql (OR ALTER depuis 2016 SP1 ; éviter sp_ ; pas de
// fonction en valeur de paramètre), alter-procedure-transact-sql (« does not change permissions »),
// relational-databases/stored-procedures/specify-parameters (2 100 paramètres ; défaut = facultatif ; noms à l'appel ;
// OUTPUT des deux côtés), return-data-from-a-stored-procedure (« No error is returned » sans OUTPUT à l'appel ; signaler
// un échec par une erreur, pas par un code retour), execute-a-stored-procedure (sp_ = procédures système),
// t-sql/language-elements/return-transact-sql, throw-transact-sql (numéro de 50 000 à 2 147 483 647 ; « ; » avant
// THROW ; gravité 16 ; THROW seul dans un CATCH ; THROW respecte XACT_ABORT, pas RAISERROR), try-catch-transact-sql
// (gravité > 10 ; erreurs de compilation et de résolution de nom du même niveau non attrapées ; fonctions ERROR_* ;
// interdit dans une fonction), if-else-transact-sql (« Unless a statement block is used … only one Transact-SQL
// statement »), while-transact-sql (BREAK, CONTINUE), raiserror-transact-sql (NOWAIT ; gravité 10 ou moins sans CATCH),
// t-sql/functions/rowcount-transact-sql (SELECT @v = col FROM t : lignes lues), fetch-status-transact-sql,
// declare-cursor-transact-sql (LOCAL, FAST_FORWARD), set-nocount-transact-sql, relational-databases/user-defined-functions/
// create-user-defined-functions-database-engine (rien ne change l'état de la base ; ni TRY / CATCH, ni #table, ni SQL
// dynamique ; NEWID et RAND interdits, erreur 443 ; MSTVF estimée à 100 lignes depuis 2014, exécution entrelacée en
// 2017), user-defined-functions (GETDATE permis), scalar-udf-inlining (appel ligne par ligne, sans parallélisme ;
// inlining en 2019, niveau 150 ; WHILE absent des constructions permises ; GETDATE, variable table, CTE l'empêchent ;
// is_inlineable), system-stored-procedures/sp-executesql-transact-sql (paramètres ; variables de l'appelant invisibles ;
// plan réutilisé), security/sql-injection (apostrophe fermée, « -- » ; QUOTENAME pour un nom), connect/ado-net/sql/
// writing-secure-dynamic-sql et t-sql/statements/execute-as-clause-transact-sql (le SQL dynamique casse le chaînage de
// propriété ; CALLER par défaut), sp-getapplock-transact-sql, sp-add-jobstep-transact-sql (retry), use-table-valued-
// parameters (READONLY), functions/openjson-transact-sql (niveau 130).
// docs.snowflake.com, pages lues avec curl (« .md ») : developer-guide/snowflake-scripting/blocks, variables (DECLARE,
// LET, :=, deux-points dans le SQL, SELECT … INTO : une seule ligne), exceptions (EXCEPTION (-20000 à -20999), RAISE,
// RAISE; relance, WHEN OTHER, SQLCODE / SQLERRM / SQLSTATE, journal en table), return (RETURN TABLE), developer-guide/
// stored-procedure/stored-procedures-snowflake-scripting (arguments IN / OUT ; exemple WHERE id = :id ; table temporaire
// limitée à la procédure), sql-reference/sql/create-procedure (RETURNS obligatoire ; LANGUAGE SQL ; EXECUTE AS OWNER par
// défaut ; CREATE OR ALTER PROCEDURE existe), sql/call, sql/execute-immediate (USING), sql/create-task (créée suspendue ;
// sans WAREHOUSE = serverless ; AFTER ; SYSTEM$STREAM_HAS_DATA), sql/create-table (TEMPORARY = la session),
// sql-reference/transactions (transactions dans une procédure), sql-reference-snowflake-scripting (pas de PRINT),
// developer-guide/logging-tracing/logging-snowflake-scripting (SYSTEM$LOG), functions/current_timestamp (GETDATE alias),
// constructs/top_n (TOP n = LIMIT n).
// Couverture des 100 « retenir » : scratchpad cours-complets/m13/couverture.txt. Laissées à l'explication de leur
// question (une seule question chacune, règle 6 de docs/plan-sql.md) : erreur de compilation et CATCH (q23), paramètre
// table (q29), OPENJSON (q30), WAITFOR (q44, vu en m09), xp_cmdshell (q48), GOTO (q51), SELECT INTO contre CREATE TABLE
// #t (q53, vu en m10), un seul SELECT pour un outil (q57), INSERT … EXEC (q58), synonyme (q59), STRING_AGG (q64, vu
// en m04), OPTION (RECOMPILE) (q65, m12), EXECUTE AS (q66), SQLCMD (q67), déboguer par étapes (q69), FOR … IN
// curseur (q79), fonction Snowflake AS 'expression' (q85), langages des procédures (q86), RETURNS TABLE (q87),
// transaction dans une procédure Snowflake (q89, vu en m11), variable de session $v (q90), écrire standard (q92), coût
// fixe par instruction (q94), revue de code (q95).
LEARNSQL.cours.m13 = {
  intro: "Ta procédure d'intégration EDI tourne la nuit dans l'Agent SQL (le planificateur de SQL Server) : si elle échoue, qui le sait le matin ? T-SQL ajoute au SQL des variables, des conditions, des boucles et des procédures stockées (des traitements enregistrés dans la base). Ce module montre les pièges silencieux : une variable qui garde l'ancienne valeur, un IF qui protège une seule ligne, un journal effacé par le ROLLBACK, l'injection SQL (du code glissé dans une saisie).",
  sections: [
    {
      titre: "Les variables : SET ou SELECT",
      exemple: "DECLARE @a INT = 0, @b INT = 0;\n-- Nom mal écrit : aucune fiche\nSELECT @a = id FROM dbo.client WHERE nom = 'Piscine Dumont';\nSET @b = (SELECT id FROM dbo.client WHERE nom = 'Piscine Dumont');\n-- 2 fiches à ce nom (2 agences)\nSELECT @a = id FROM dbo.client WHERE nom = 'Piscines Dumont';\nSET @b = (SELECT id FROM dbo.client WHERE nom = 'Piscines Dumont');",
      resultat: [["cas", "SELECT @a = id …", "SET @b = (SELECT …)"], ["0 ligne", "inchangée : 0", null], ["2 lignes", "2 ou 6, sans erreur", "erreur 512"]],
      points: [
        "Ce qui se passe : sans fiche, SELECT laisse @a intact (sa valeur d'avant) ; SET met NULL. Avec 2 fiches, SELECT garde l'id de l'une, sans rien dire ; SET s'arrête sur l'erreur 512 (« plus d'une valeur »).",
        "Pourquoi : `SELECT @a = id FROM …` prend la valeur de la dernière ligne rendue, dans un ordre non garanti ; sans ligne, rien n'est affecté. `SET @b = (sous-requête)` attend une seule valeur : vide, c'est NULL.",
        "Le piège : une boucle sur les lignes d'un fichier EDI. Le client mal écrit garde l'id du client d'avant : la commande part chez le mauvais client, sans aucune erreur.",
        "Le bon réflexe : une valeur attendue, `SET` avec sous-requête, puis `IF @b IS NULL THROW …` (section 3). Après un SELECT, contrôle `@@ROWCOUNT` (le nombre de lignes lues) : il doit valoir 1.",
        "Et aussi : SET remplit une variable, SELECT plusieurs d'un coup (`SELECT @a = …, @b = …`). `DECLARE @n INT;` vaut NULL, et `@n + 1` aussi : initialise. Une variable vit jusqu'au `GO`, la fin du lot."
      ],
      retenir: "Une valeur attendue : SET avec sous-requête (NULL si rien, erreur si plusieurs). SELECT @v = … garde l'ancienne valeur ou une ligne au hasard."
    },
    {
      titre: "IF et WHILE : toujours BEGIN … END",
      exemple: "-- Voulu : purger les flux de mars s'il ne reste aucun rejet\nIF NOT EXISTS (SELECT 1 FROM dbo.flux_edi WHERE statut = 'REJET')\n    PRINT 'Aucun rejet : purge des flux de mars';\n    DELETE FROM dbo.flux_edi WHERE date_recu < '20260401';",
      resultat: "Il reste 2 rejets : pas de PRINT. Mais le DELETE s'exécute : 4 flux de mars supprimés, dont le rejet n° 3.",
      points: [
        "Ce qui se passe : il reste 2 flux rejetés, la condition est fausse. Mais le DELETE n'est pas dans le IF : il part quand même, avec le flux 3 (EAN inconnu), pas encore corrigé.",
        "Pourquoi : sans `BEGIN … END`, un IF ne commande que l'instruction qui le suit. Le décalage de la ligne ne compte pas : le moteur lit des instructions, pas une mise en page. Même règle pour ELSE et WHILE.",
        "Le piège : le correctif d'urgence, une 2e ligne ajoutée sous un IF qui n'en avait qu'une. Elle tourne à chaque passage, sans erreur : le rejet EDI disparaît, et le client relance.",
        "Le bon réflexe : `IF … BEGIN … END`, toujours, même pour une ligne. `IF EXISTS` s'arrête à la 1re ligne trouvée (m06). IF choisit des instructions ; dans une requête, c'est CASE qui choisit une valeur (m03).",
        "Et aussi : `WHILE` répète tant que sa condition est vraie : fais-la avancer (`SET @i += 1`), sinon elle ne finit jamais. BREAK sort, CONTINUE passe au tour suivant. Ligne par ligne, c'est lent (m16) ; une purge se fait par lots (m09)."
      ],
      retenir: "IF et WHILE ne commandent qu'une instruction : BEGIN … END, toujours. Une boucle doit avancer ; une requête sur l'ensemble vaut mieux."
    },
    {
      titre: "La procédure stockée : paramètres, OUTPUT, RETURN",
      exemple: "CREATE OR ALTER PROCEDURE dbo.p_nb_rejets\n  @partenaire VARCHAR(40),\n  @nb         INT OUTPUT\nAS\nBEGIN\n  SET NOCOUNT ON;\n  SET @nb = (SELECT COUNT(*) FROM dbo.flux_edi\n             WHERE partenaire = @partenaire AND statut = 'REJET');\nEND;\nGO\nDECLARE @n1 INT, @n2 INT;\nEXEC dbo.p_nb_rejets @partenaire = 'AquaBleu', @nb = @n1;          -- OUTPUT oublié\nEXEC dbo.p_nb_rejets @partenaire = 'AquaBleu', @nb = @n2 OUTPUT;\nSELECT @n1 AS sans_output, @n2 AS avec_output;",
      resultat: [["sans_output", "avec_output"], [null, 2]],
      points: [
        "Ce qui se passe : la procédure tourne deux fois, sans erreur. Sans le mot OUTPUT à l'appel, la valeur ne revient pas : @n1 reste NULL. Avec OUTPUT, @n2 reçoit 2 (les rejets d'AquaBleu).",
        "Pourquoi : OUTPUT s'écrit des deux côtés, procédure et appel. `RETURN` sort de la procédure avec un code entier (0 = succès), lu par `EXEC @code = dbo.p_…` : jamais un texte, un montant ou des lignes.",
        "Le piège : signaler un échec par `RETURN -1`. L'appelant lit rarement ce code : le job de nuit de l'Agent SQL affiche « réussi ». THROW, lui, arrête tout, et l'erreur se voit.",
        "Le bon réflexe : `CREATE OR ALTER` (relançable, droits gardés), `SET NOCOUNT ON` en 1re ligne (pas de messages « n lignes affectées », qui gênent les outils), paramètres typés, nommés à l'appel, validés : `IF @partenaire IS NULL THROW 50001, 'Partenaire obligatoire', 1;`.",
        "Et aussi : un paramètre facultatif a une valeur par défaut : `@depuis DATE = NULL`. THROW maison : numéro de 50 000 ou plus, `;` à la fin de l'instruction d'avant. Pas de préfixe `sp_` (procédures système)."
      ],
      retenir: "Procédure : CREATE OR ALTER, SET NOCOUNT ON, paramètres typés et nommés, OUTPUT des deux côtés. Un échec : THROW, pas RETURN."
    },
    {
      titre: "Le journal de traitement : ce qui survit au ROLLBACK",
      exemple: "DECLARE @journal TABLE (etape VARCHAR(30), nb INT);\nBEGIN TRAN;\nUPDATE dbo.commande SET statut = 'LIVREE' WHERE statut = 'EN_COURS';\nINSERT INTO @journal VALUES ('Commandes livrées', @@ROWCOUNT);\nUPDATE dbo.flux_edi SET statut = 'OK', motif = NULL WHERE statut = 'REJET';\nINSERT INTO @journal VALUES ('Flux remis OK', @@ROWCOUNT);\nROLLBACK;                         -- comme dans un CATCH (m11)\nSELECT etape, nb FROM @journal;   -- le journal reste",
      resultat: [["etape", "nb"], ["Commandes livrées", 3], ["Flux remis OK", 2]],
      points: [
        "Ce qui se passe : ROLLBACK annule les deux UPDATE : CDE-1005 à CDE-1007 restent EN_COURS, les flux 3 et 6 restent REJET. Mais @journal garde ses 2 lignes : on sait ce que le traitement avait fait.",
        "Pourquoi : une variable table (`DECLARE @t TABLE`) reste hors de la transaction : ROLLBACK ne la touche pas. Une table temporaire `#t` (table de travail, effacée en fin de procédure ou de session) suit la transaction : elle serait vidée.",
        "Le piège : écrire dans le journal permanent pendant la transaction. Le ROLLBACK efface la ligne avec le reste : la nuit a échoué, et le journal ne dit rien.",
        "Le bon réflexe : dans le CATCH, `ROLLBACK` d'abord, puis l'INSERT dans le journal permanent (`ERROR_NUMBER()`, `ERROR_MESSAGE()`, `ERROR_LINE()`, les lignes de @journal), puis `THROW;` (m11). Un journal dit quoi, quand, combien, et le résultat.",
        "Et aussi : la variable table pour quelques lignes ; au-delà d'une centaine, `#t`, avec index et statistiques (ce que le moteur sait de son contenu, pour choisir son plan). Une `#t` se voit dans les procédures appelées."
      ],
      retenir: "Dans le CATCH : ROLLBACK, puis journal, puis THROW. La variable table survit au ROLLBACK, pas la #table, faite pour les gros volumes."
    },
    {
      titre: "Les fonctions : scalaire ou table en ligne",
      exemple: "-- Fonction scalaire : une valeur, appelée pour chaque client\nCREATE OR ALTER FUNCTION dbo.f_ca (@client_id INT)\nRETURNS DECIMAL(12,2) AS\nBEGIN\n  RETURN (SELECT SUM(montant_ht) FROM dbo.commande\n          WHERE client_id = @client_id AND statut <> 'ANNULEE');\nEND;\nGO\nSELECT code, nom, dbo.f_ca(id) AS ca\nFROM dbo.client WHERE pays = 'FR' AND type = 'PRO' ORDER BY code;",
      resultat: [["code", "nom", "ca"], ["C002", "Piscines Dumont", "2580.00"], ["C003", "Bleu Lagon", null], ["C004", "Hydro Sud", "318.00"], ["C006", "Piscines Dumont", "79.80"], ["C007", "Camping Les Flots", null]],
      points: [
        "Ce qui se passe : un chiffre d'affaires par pisciniste ; NULL pour Bleu Lagon (commande annulée) et Camping Les Flots (aucune commande). Le résultat est juste, mais la fonction peut refaire sa requête pour chaque client.",
        "Pourquoi : une fonction scalaire est une boîte noire pour l'optimiseur (la partie du moteur qui choisit le plan). Il l'appelle ligne par ligne, sans parallélisme (un seul processeur) : 100 000 clients, 100 000 requêtes.",
        "Le piège : rapide en test, très lent en production. SQL Server 2019 (niveau de compatibilité 150) déplie souvent la fonction dans la requête, c'est l'inlining ; mais un GETDATE(), un WHILE ou une variable table l'empêchent.",
        "Le bon réflexe : une fonction table en ligne, `RETURNS TABLE AS RETURN (SELECT …)`, appelée par `CROSS APPLY` : le moteur la déplie comme une vue. Évite la multi-instructions (`RETURNS @t TABLE … BEGIN … END`) : il devine mal son nombre de lignes.",
        "Et aussi : une fonction ne modifie aucune donnée (une procédure, si). Ni TRY / CATCH, ni #table, ni NEWID() ; GETDATE() est permis. `is_inlineable` (vue `sys.sql_modules`) dit si elle peut être dépliée. Anti-patterns : m16."
      ],
      retenir: "Fonction scalaire = une requête par ligne, sauf inlining (2019 et plus). Préfère la fonction table en ligne, appelée par CROSS APPLY."
    },
    {
      titre: "Le SQL dynamique : les valeurs en paramètres",
      exemple: "DECLARE @nom VARCHAR(60) = 'AquaBleu'' OR 1 = 1 --';   -- saisie piégée\n-- Piège : la valeur collée dans le texte\nDECLARE @sql NVARCHAR(MAX) =\n  N'SELECT code, nom FROM dbo.client WHERE nom = ''' + @nom + N'''';\nEXEC (@sql);\n-- Juste : la valeur passée en paramètre\nEXEC sp_executesql N'SELECT code, nom FROM dbo.client WHERE nom = @n',\n                   N'@n VARCHAR(60)', @n = @nom;",
      resultat: "EXEC (@sql) : 7 lignes, tous les clients. sp_executesql : 0 ligne, aucun client ne porte ce nom.",
      points: [
        "Ce qui se passe : la saisie ferme l'apostrophe, ajoute `OR 1 = 1` (toujours vrai) et met la fin en commentaire (`--`) : la requête change, 7 clients sortent. En paramètre, c'est un simple nom : 0 ligne.",
        "Pourquoi : `EXEC (@sql)` exécute le texte tel quel. `sp_executesql` sépare le code (le 1er texte) des valeurs (déclarées dans le 2e) : une valeur n'est jamais lue comme du code. Et le plan est réutilisé.",
        "Le piège : l'injection SQL. Saisie dans un portail ou lue dans un fichier EDI, la valeur `x'; DELETE FROM dbo.flux_edi; --` viderait la table des flux. sp_executesql ne protège rien si la valeur est collée dans son texte.",
        "Le bon réflexe : les valeurs toujours en paramètres. Un nom de table ne peut pas l'être : `QUOTENAME(@table)` l'entoure de crochets, une liste blanche (les noms permis) le contrôle. Pour déboguer : `PRINT @sql` avant d'exécuter.",
        "Et aussi : le SQL dynamique tourne à part : il ne voit pas les variables de la procédure (passe-les en paramètres), et une `#t` créée dedans disparaît à la fin (crée-la avant). L'appelant doit avoir le droit sur la table."
      ],
      retenir: "SQL dynamique : sp_executesql et des paramètres, jamais une valeur collée dans le texte. Un nom d'objet : QUOTENAME et une liste blanche."
    },
    {
      titre: "Snowflake Scripting : même logique, autre syntaxe",
      exemple: "CREATE OR REPLACE PROCEDURE VENTES.P_NB_REJETS(partenaire VARCHAR)\nRETURNS VARCHAR LANGUAGE SQL AS\n$$\nDECLARE\n  nb INTEGER DEFAULT 0;\nBEGIN\n  SELECT COUNT(*) INTO :nb FROM VENTES.FLUX_EDI\n  WHERE partenaire = :partenaire AND statut = 'REJET';\n  RETURN 'Rejets : ' || nb;\nEXCEPTION\n  WHEN OTHER THEN RETURN 'Erreur : ' || SQLERRM;   -- piège : l'erreur est avalée\nEND;\n$$;\nCALL VENTES.P_NB_REJETS('AquaBleu');",
      resultat: "CALL rend 'Rejets : 2'. Une erreur deviendrait un texte rendu : l'appel « réussirait » quand même.",
      points: [
        "Ce qui se passe : CALL lance la procédure, qui rend 'Rejets : 2'. Le bloc a trois parties, entre deux `$$` : DECLARE (les variables), BEGIN (le corps), EXCEPTION (les erreurs). RETURNS est obligatoire.",
        "Pourquoi : pas de @ sur Snowflake. Dans une instruction SQL, `:nb` et `:partenaire` (avec deux-points) désignent la variable et l'argument ; `partenaire` seul, c'est la colonne. Dans le corps, `LET n := 5;` déclare et affecte.",
        "Le piège : `WHEN OTHER THEN RETURN …` avale l'erreur, comme un CATCH sans THROW. La TASK (la tâche planifiée de Snowflake) voit un appel réussi : personne n'apprend que le contrôle a échoué.",
        "Le bon réflexe : dans EXCEPTION, écris dans une table de journal (Snowflake n'a pas de PRINT), puis `RAISE;` relance la même erreur. Erreur métier : `DECLARE e EXCEPTION (-20001, 'Période invalide');` puis `RAISE e;`. SQLERRM donne le message.",
        "SQL Server / Snowflake : ni #table ni variable table, mais `CREATE TEMPORARY TABLE` ou un RESULTSET (un résultat de requête gardé en variable). SQL dynamique : `EXECUTE IMMEDIATE … USING`. Par défaut, la procédure a les droits de son propriétaire."
      ],
      retenir: "Snowflake : bloc DECLARE / BEGIN / EXCEPTION / END entre $$, variables sans @ (:nom dans le SQL), CALL pour lancer, RAISE; pour relancer."
    },
    {
      titre: "Détails utiles",
      points: [
        "Curseur (une boucle sur les lignes d'une requête) : `DECLARE c CURSOR LOCAL FAST_FORWARD FOR SELECT …`, OPEN, FETCH NEXT tant que `@@FETCH_STATUS = 0` (ligne lue), CLOSE, DEALLOCATE. Seulement pour une action unitaire : un fichier par client (m16).",
        "Planifier : un job de l'Agent SQL, une alerte par mail en cas d'échec, des tentatives automatiques si la procédure se relance sans doublon (idempotente). Un seul traitement à la fois : `sp_getapplock`.",
        "Snowflake planifie avec une TASK, créée suspendue : `ALTER TASK … RESUME`. `AFTER` enchaîne les tasks ; sans warehouse, elle est serverless (facturée à l'usage) ; un STREAM lui donne les seules lignes changées.",
        "Suivre un long traitement : PRINT arrive en retard (mémoire tampon) ; `RAISERROR('Étape 2', 0, 1) WITH NOWAIT` s'affiche tout de suite. Gravité 10 ou moins : un simple message, sans CATCH ; THROW lève en 16.",
        "Code pro : un nom verbe + objet (`p_integrer_commandes_edi`), une procédure par rôle, un en-tête (objectif, paramètres, effets, règles), les valeurs métier dans une table de paramètres, le script dans Git, des tests rejouables."
      ],
      retenir: "Une procédure pro : typée, ensembliste, protégée (TRY / CATCH, THROW), tracée (journal) et versionnée (Git)."
    }
  ],
  differences: [
    ["Variable", "`@nom`", "`nom`, `:nom` en SQL"],
    ["Affecter", "`SET @v = …`", "`v := …`, `LET`"],
    ["Lancer une procédure", "`EXEC`", "`CALL`"],
    ["Corps d'une procédure", "`AS BEGIN … END`", "`AS $$ … $$`"],
    ["Attraper une erreur", "`TRY / CATCH`", "`EXCEPTION WHEN …`"],
    ["Lever, relancer", "`THROW`, `THROW;`", "`RAISE e`, `RAISE;`"],
    ["SQL dynamique", "`sp_executesql`", "`EXECUTE IMMEDIATE … USING`"],
    ["Table de travail", "`#t`, `@t`", "`TEMPORARY TABLE`, RESULTSET"],
    ["Droits par défaut", "Appelant (chaînage)", "Propriétaire (`OWNER`)"],
    ["Planifier", "Agent SQL", "TASK"]
  ]
};
