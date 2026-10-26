LEARNSQL.cours.m13 = {
  intro: "T-SQL, c'est le SQL de SQL Server avec des variables, des conditions, des boucles et des procédures. Il sert à automatiser : imports EDI, traitements de nuit, contrôles.",
  sections: [
    {
      titre: "Les variables",
      exemple: "DECLARE @date_debut DATE = '20260101';\nDECLARE @nb INT;\n\nSET @nb = (SELECT COUNT(*) FROM dbo.commande WHERE date_cde >= @date_debut);\nSELECT @nb AS nb_commandes;",
      points: [
        "`DECLARE @nom type` : toujours préciser la longueur (`VARCHAR(20)`).",
        "`SET @v = (sous-requête)` : erreur si plusieurs lignes, NULL si aucune.",
        "`SELECT @v = col FROM …` : plusieurs lignes → garde la dernière, sans erreur. Aucune ligne → la variable ne change pas.",
        "Une variable n'existe que dans son lot (jusqu'au `GO`)."
      ],
      retenir: "SET avec sous-requête = plus sûr que SELECT @v = …"
    },
    {
      titre: "IF, WHILE, BEGIN … END",
      exemple: "IF EXISTS (SELECT 1 FROM stg.import_edi WHERE statut = 'ERREUR')\nBEGIN\n  PRINT 'Des lignes sont en erreur';\nEND\nELSE\nBEGIN\n  PRINT 'Import OK';\nEND;",
      points: [
        "`BEGIN … END` regroupe plusieurs instructions.",
        "`WHILE` boucle tant qu'une condition est vraie (pense à `BREAK`).",
        "Les boucles ligne par ligne sont lentes. Préfère une seule requête sur l'ensemble des lignes."
      ],
      retenir: "Pense « ensemble de lignes », pas « ligne par ligne »."
    },
    {
      titre: "Les procédures stockées",
      exemple: "CREATE OR ALTER PROCEDURE dbo.p_ca_client\n  @client_id INT,\n  @annee     INT,\n  @ca        DECIMAL(18,2) OUTPUT\nAS\nBEGIN\n  SET NOCOUNT ON;\n  SELECT @ca = SUM(montant)\n  FROM dbo.commande\n  WHERE client_id = @client_id AND annee = @annee;\nEND;\n\nDECLARE @r DECIMAL(18,2);\nEXEC dbo.p_ca_client @client_id = 42, @annee = 2026, @ca = @r OUTPUT;",
      points: [
        "Une procédure = un traitement stocké, avec des paramètres.",
        "`CREATE OR ALTER` (2016 SP1+) : le script se relance sans erreur.",
        "`SET NOCOUNT ON` : supprime les messages « n lignes affectées ».",
        "Paramètres `OUTPUT` : pour renvoyer une valeur.",
        "Appelle avec des paramètres nommés : plus lisible, plus sûr."
      ],
      retenir: "CREATE OR ALTER + SET NOCOUNT ON + paramètres nommés."
    },
    {
      titre: "TRY / CATCH et les erreurs",
      exemple: "BEGIN TRY\n  BEGIN TRAN;\n    EXEC dbo.p_integrer_commandes;\n  COMMIT;\nEND TRY\nBEGIN CATCH\n  IF @@TRANCOUNT > 0 ROLLBACK;\n  INSERT INTO dbo.log_erreur (message, ligne, date_err)\n  VALUES (ERROR_MESSAGE(), ERROR_LINE(), SYSDATETIME());\n  THROW;\nEND CATCH;",
      points: [
        "TRY : le code normal. CATCH : ce qu'on fait en cas d'erreur.",
        "`ERROR_MESSAGE()`, `ERROR_NUMBER()`, `ERROR_LINE()` : détails de l'erreur.",
        "`THROW;` dans CATCH : renvoie l'erreur d'origine à l'appelant.",
        "`THROW 50001, 'Message', 1;` : lever ta propre erreur.",
        "Ne « mange » pas les erreurs : log + THROW."
      ],
      retenir: "CATCH : ROLLBACK, journaliser, puis THROW."
    },
    {
      titre: "Les fonctions",
      exemple: "-- Fonction table « inline » : rapide\nCREATE OR ALTER FUNCTION dbo.f_cdes_client (@client_id INT)\nRETURNS TABLE\nAS RETURN (\n  SELECT num_cde, montant FROM dbo.commande WHERE client_id = @client_id\n);\n\nSELECT * FROM dbo.f_cdes_client(42);",
      points: [
        "Fonction scalaire : renvoie une valeur. Appelée sur chaque ligne → souvent lente (améliorée en SQL Server 2019+).",
        "Fonction table inline (un seul SELECT) : traitée comme une vue paramétrée. Rapide.",
        "Fonction table multi-instructions : estimations faibles, souvent lente.",
        "Une fonction ne peut pas modifier les données."
      ],
      retenir: "Préfère les fonctions table inline aux fonctions scalaires."
    },
    {
      titre: "Le SQL dynamique",
      exemple: "DECLARE @sql NVARCHAR(MAX) =\n  N'SELECT * FROM ' + QUOTENAME(@schema) + N'.' + QUOTENAME(@table) +\n  N' WHERE date_cde >= @d';\n\nEXEC sp_executesql @sql, N'@d DATE', @d = @date_debut;",
      points: [
        "Construire une requête en texte, puis l'exécuter.",
        "Concaténer une valeur saisie = injection SQL possible.",
        "Les valeurs : en paramètres avec `sp_executesql`.",
        "Les noms d'objets : protégés par `QUOTENAME`.",
        "Plus difficile à lire et à déboguer : à utiliser seulement si nécessaire."
      ],
      retenir: "SQL dynamique : sp_executesql + paramètres + QUOTENAME. Jamais de concaténation de valeurs."
    },
    {
      titre: "Et sur Snowflake ?",
      exemple: "CREATE OR REPLACE PROCEDURE p_purge(nb_jours INT)\nRETURNS VARCHAR\nLANGUAGE SQL\nAS\n$$\nBEGIN\n  DELETE FROM log_edi WHERE date_log < DATEADD(day, -:nb_jours, CURRENT_DATE);\n  RETURN 'OK';\nEND;\n$$;",
      points: [
        "Snowflake Scripting : `BEGIN … END`, variables, IF, boucles, exceptions.",
        "Procédures en SQL, JavaScript ou Python.",
        "Dans le code SQL d'une procédure, une variable s'écrit `:nom`.",
        "Planification : les TASKS de Snowflake (au lieu de l'Agent SQL Server)."
      ],
      retenir: "Même logique, syntaxe différente. Snowflake : Scripting + TASKS."
    }
  ],
  differences: [
    ["Variable", "`@nom`", "`nom` (`:nom` dans le SQL)"],
    ["Procédure", "`CREATE OR ALTER PROCEDURE`", "`CREATE OR REPLACE PROCEDURE … $$ … $$`"],
    ["Gestion d'erreur", "`TRY / CATCH`, `THROW`", "`EXCEPTION WHEN …`"],
    ["SQL dynamique", "`sp_executesql`", "`EXECUTE IMMEDIATE`"],
    ["Planification", "Agent SQL Server", "TASK"]
  ]
};
