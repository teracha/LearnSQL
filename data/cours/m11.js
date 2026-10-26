LEARNSQL.cours.m11 = {
  intro: "Une transaction regroupe plusieurs modifications en un seul bloc : tout réussit, ou tout est annulé. Les verrous protègent les données quand plusieurs personnes travaillent en même temps. Ils expliquent aussi les blocages de l'ERP.",
  sections: [
    {
      titre: "Le principe : tout ou rien",
      exemple: "BEGIN TRAN;\n  UPDATE dbo.stock SET qte = qte - 5 WHERE article = 'POMPE-01';\n  INSERT INTO dbo.mouvement (article, qte, sens) VALUES ('POMPE-01', 5, 'S');\nCOMMIT;   -- ou ROLLBACK pour tout annuler",
      points: [
        "Sans transaction, chaque instruction est validée seule (autocommit).",
        "`COMMIT` valide. `ROLLBACK` annule tout depuis BEGIN.",
        "ACID : Atomicité (tout ou rien), Cohérence, Isolation, Durabilité.",
        "Une transaction ouverte et oubliée garde ses verrous : elle bloque les autres !"
      ],
      retenir: "BEGIN … COMMIT : tout ou rien. Ne laisse jamais une transaction ouverte."
    },
    {
      titre: "Gérer les erreurs dans une transaction",
      exemple: "SET XACT_ABORT ON;\nBEGIN TRY\n  BEGIN TRAN;\n    UPDATE …;\n    INSERT …;\n  COMMIT;\nEND TRY\nBEGIN CATCH\n  IF @@TRANCOUNT > 0 ROLLBACK;\n  THROW;   -- renvoie l'erreur\nEND CATCH;",
      points: [
        "Par défaut, une erreur n'annule pas toujours la transaction. Piège !",
        "`SET XACT_ABORT ON` : toute erreur annule la transaction.",
        "`@@TRANCOUNT` : nombre de transactions ouvertes.",
        "Transactions imbriquées : un ROLLBACK annule TOUT, pas seulement la dernière."
      ],
      retenir: "XACT_ABORT ON + TRY / CATCH + ROLLBACK : le trio de sécurité."
    },
    {
      titre: "Les verrous et les blocages",
      exemple: "-- Session 1\nBEGIN TRAN;\nUPDATE dbo.client SET ville = 'Lyon' WHERE id = 1;\n-- (pas de COMMIT)\n\n-- Session 2 : attend…\nSELECT * FROM dbo.client WHERE id = 1;",
      points: [
        "Écrire pose un verrou exclusif : les autres attendent.",
        "Lire (en READ COMMITTED classique) pose un verrou partagé, très court.",
        "Blocage = une session attend qu'une autre libère son verrou.",
        "Voir qui bloque : `sys.dm_exec_requests` (colonne `blocking_session_id`) ou `sp_who2`.",
        "Transactions courtes = moins de blocages."
      ],
      retenir: "Un blocage n'est pas une erreur : c'est une attente. Cherche la transaction ouverte."
    },
    {
      titre: "Le deadlock (interblocage)",
      exemple: "-- Session 1 : verrouille A, puis veut B\n-- Session 2 : verrouille B, puis veut A\n-- → chacune attend l'autre : SQL Server en tue une (erreur 1205)",
      points: [
        "Deux sessions s'attendent mutuellement.",
        "SQL Server choisit une « victime » et annule sa transaction.",
        "Prévention : accéder aux tables toujours dans le même ordre.",
        "Garder les transactions courtes, avec de bons index.",
        "Côté application : relancer la transaction victime."
      ],
      retenir: "Deadlock : même ordre d'accès aux tables, transactions courtes."
    },
    {
      titre: "Les niveaux d'isolation",
      exemple: "SET TRANSACTION ISOLATION LEVEL READ COMMITTED;   -- défaut SQL Server\nSELECT * FROM dbo.commande WITH (NOLOCK);          -- = READ UNCOMMITTED",
      points: [
        "READ UNCOMMITTED / `NOLOCK` : lit des données non validées. Peut aussi rater ou doubler des lignes !",
        "READ COMMITTED : défaut. Lit seulement ce qui est validé.",
        "RCSI / SNAPSHOT : lit une version validée, sans bloquer les écritures. Défaut sur Azure SQL.",
        "REPEATABLE READ, SERIALIZABLE : plus sûrs, mais plus de blocages.",
        "Snowflake : un seul niveau, READ COMMITTED. Les lectures ne bloquent jamais."
      ],
      retenir: "NOLOCK n'est pas un accélérateur gratuit : il peut donner des résultats faux."
    }
  ],
  differences: [
    ["Niveaux d'isolation", "Plusieurs (READ COMMITTED par défaut)", "READ COMMITTED seulement"],
    ["Lecture bloquée par une écriture", "Oui (sauf RCSI / SNAPSHOT)", "Non"],
    ["Début de transaction", "`BEGIN TRAN`", "`BEGIN` / `BEGIN TRANSACTION`"],
    ["Annuler après COMMIT", "Restauration de sauvegarde", "Time Travel"]
  ]
};
