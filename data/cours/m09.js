LEARNSQL.cours.m09 = {
  intro: "INSERT, UPDATE, DELETE et MERGE modifient les données. Une erreur ici ne se voit pas seulement dans un rapport : elle abîme la base. Règle d'or : vérifie avant d'écrire.",
  sections: [
    {
      titre: "INSERT : ajouter des lignes",
      exemple: "INSERT INTO dbo.client (code, nom, pays)\nVALUES ('C001', 'Piscines Dupont', 'FR'),\n       ('C002', 'Aqua Lyon', 'FR');\n\nINSERT INTO dbo.client_archive (code, nom, pays)\nSELECT code, nom, pays\nFROM dbo.client\nWHERE actif = 0;",
      points: [
        "Liste TOUJOURS les colonnes cibles. Sinon, une colonne ajoutée casse tout.",
        "`INSERT … SELECT` copie le résultat d'une requête.",
        "Colonnes non listées : valeur DEFAULT, ou NULL.",
        "SQL Server : `SCOPE_IDENTITY()` donne l'id auto généré. (`@@IDENTITY` peut être faussé par un trigger.)"
      ],
      retenir: "INSERT INTO table (colonnes) : toujours avec la liste des colonnes."
    },
    {
      titre: "UPDATE : modifier",
      exemple: "-- 1. D'abord, vérifier\nSELECT * FROM dbo.article WHERE famille = 'LINER';\n\n-- 2. Puis modifier\nBEGIN TRAN;\nUPDATE dbo.article\nSET prix = prix * 1.05\nWHERE famille = 'LINER';\n-- vérifier le nombre de lignes, puis COMMIT ou ROLLBACK",
      points: [
        "Sans WHERE, TOUTES les lignes sont modifiées.",
        "Écris d'abord le SELECT avec le même WHERE.",
        "Travaille dans une transaction : tu peux annuler (ROLLBACK).",
        "Toutes les expressions du SET utilisent les valeurs d'AVANT la modification."
      ],
      retenir: "SELECT avant UPDATE. Transaction pour pouvoir annuler."
    },
    {
      titre: "UPDATE avec une jointure",
      exemple: "-- SQL Server\nUPDATE a\nSET a.prix = s.nouveau_prix\nFROM dbo.article a\nJOIN stg.tarif s ON s.code = a.code;\n\n-- Snowflake\nUPDATE article a\nSET prix = s.nouveau_prix\nFROM tarif s\nWHERE s.code = a.code;",
      points: [
        "On met à jour une table à partir d'une autre.",
        "Si la source a plusieurs lignes pour une même cible : résultat imprévisible.",
        "Vérifie l'unicité de la clé dans la source avant."
      ],
      retenir: "UPDATE … FROM : la source doit être unique sur la clé de jointure."
    },
    {
      titre: "DELETE et TRUNCATE",
      exemple: "DELETE FROM dbo.log_edi\nWHERE date_log < DATEADD(month, -6, GETDATE());\n\nTRUNCATE TABLE stg.import_edi;   -- vide toute la table",
      points: [
        "`DELETE` supprime des lignes choisies. Il est journalisé ligne par ligne.",
        "`TRUNCATE` vide toute la table, très vite. Pas de WHERE.",
        "SQL Server : TRUNCATE remet le compteur IDENTITY à zéro.",
        "TRUNCATE est refusé si une clé étrangère pointe vers la table.",
        "Gros DELETE : par lots (`DELETE TOP (10000) … ` en boucle) pour ne pas bloquer."
      ],
      retenir: "DELETE = lignes choisies. TRUNCATE = tout, vite."
    },
    {
      titre: "MERGE : insérer ou mettre à jour",
      exemple: "MERGE dbo.article AS cible\nUSING stg.article AS src\n   ON cible.code = src.code\nWHEN MATCHED AND cible.prix <> src.prix THEN\n   UPDATE SET prix = src.prix\nWHEN NOT MATCHED BY TARGET THEN\n   INSERT (code, libelle, prix) VALUES (src.code, src.libelle, src.prix)\nWHEN NOT MATCHED BY SOURCE THEN\n   DELETE;",
      points: [
        "Un seul ordre pour synchroniser une table avec une source.",
        "SQL Server : MERGE doit finir par `;`.",
        "Doublons dans la source = erreur (même ligne cible modifiée deux fois).",
        "`NOT MATCHED BY SOURCE` (SQL Server) supprime ce qui n'est plus dans la source. Attention !",
        "Snowflake : MERGE existe aussi, sans `BY SOURCE`."
      ],
      retenir: "MERGE = upsert. Source sans doublon, sinon erreur."
    },
    {
      titre: "OUTPUT : voir ce qui a changé (SQL Server)",
      exemple: "UPDATE dbo.commande\nSET statut = 'FACTUREE'\nOUTPUT deleted.statut AS avant, inserted.statut AS apres, inserted.num_cde\nWHERE statut = 'LIVREE';",
      points: [
        "`inserted` = la ligne après, `deleted` = la ligne avant.",
        "Pratique pour journaliser, ou récupérer des id générés.",
        "Snowflake n'a pas OUTPUT. Il renvoie le nombre de lignes modifiées."
      ],
      retenir: "OUTPUT inserted / deleted : la trace des modifications (SQL Server)."
    }
  ],
  differences: [
    ["UPDATE avec jointure", "`UPDATE a SET … FROM a JOIN b`", "`UPDATE a SET … FROM b WHERE …`"],
    ["Clause OUTPUT", "Oui", "Non"],
    ["MERGE … NOT MATCHED BY SOURCE", "Oui", "Non"],
    ["Annuler une erreur", "Transaction / sauvegarde", "Transaction ou Time Travel"]
  ]
};
