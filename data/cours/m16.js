LEARNSQL.cours.m16 = {
  intro: "Une requête qui marche n'est pas forcément une bonne requête. Elle doit aussi être lisible, rapide, sûre et maintenable par quelqu'un d'autre. Ici, les réflexes d'un senior.",
  sections: [
    {
      titre: "Écrire lisible",
      exemple: "SELECT\n    c.code        AS code_client,\n    c.nom         AS nom_client,\n    SUM(l.montant) AS ca_2026\nFROM dbo.client AS c\nINNER JOIN dbo.commande AS co ON co.client_id = c.id\nINNER JOIN dbo.ligne_cde AS l ON l.cde_id = co.id\nWHERE co.date_cde >= '20260101'\n  AND co.date_cde <  '20270101'\nGROUP BY c.code, c.nom;",
      points: [
        "Une clause par ligne, une colonne par ligne.",
        "Mots-clés en majuscules, alias parlants (`c`, `co`, `l` ou mieux, `cli`, `cde`).",
        "Préfixe chaque colonne par son alias de table.",
        "Commente le POURQUOI (règle métier), pas le QUOI.",
        "Préfixe le schéma : `dbo.client`."
      ],
      retenir: "Écris pour la personne qui lira ton code dans 6 mois. Peut-être toi."
    },
    {
      titre: "Penser « ensemble », pas « ligne par ligne »",
      exemple: "-- ✘ Curseur : 50 000 UPDATE un par un\n-- ✔ Une seule requête\nUPDATE a\nSET a.prix = a.prix * t.coef\nFROM dbo.article a\nJOIN dbo.tarif_hausse t ON t.famille = a.famille;",
      points: [
        "Les curseurs et boucles WHILE traitent une ligne à la fois : très lent.",
        "Une requête sur l'ensemble est presque toujours plus rapide et plus simple.",
        "Curseur acceptable : traitements administratifs, appels de procédure par élément, petits volumes."
      ],
      retenir: "Avant d'écrire un curseur, cherche la requête ensembliste."
    },
    {
      titre: "Les anti-patterns de performance",
      exemple: "SELECT *                                -- ✘ colonnes inutiles\nFROM dbo.commande WITH (NOLOCK)          -- ✘ lectures fausses possibles\nWHERE YEAR(date_cde) = 2026              -- ✘ index inutilisable\n  AND dbo.f_statut(id) = 'OK'            -- ✘ fonction scalaire par ligne\n  AND code_client = 12345;               -- ✘ conversion implicite",
      points: [
        "`SELECT *` : plus de lectures, pas d'index couvrant, casse si la table change.",
        "`NOLOCK` partout : lectures non validées, lignes ratées ou doublées.",
        "Fonction sur une colonne filtrée : scan.",
        "Fonction scalaire dans SELECT ou WHERE : exécutée pour chaque ligne.",
        "Types différents : conversion implicite.",
        "`COUNT(*) > 0` pour tester l'existence : préfère `EXISTS`."
      ],
      retenir: "Colonnes listées, colonnes nues, mêmes types, EXISTS."
    },
    {
      titre: "Les anti-patterns de logique",
      exemple: "SELECT DISTINCT c.nom, SUM(...)   -- ✘ DISTINCT pour cacher des doublons de jointure\n...\nWHERE statut IN ('A','B','C')      -- ✘ valeurs en dur, à maintenir à 15 endroits\n...\nWHERE id NOT IN (SELECT ...)      -- ✘ piège du NULL",
      points: [
        "DISTINCT « pour que ça marche » : cherche plutôt d'où viennent les doublons.",
        "Valeurs en dur : mets-les dans une table de paramètres.",
        "`NOT IN` avec sous-requête : remplace par `NOT EXISTS`.",
        "LEFT JOIN + filtre de droite dans WHERE : LEFT JOIN annulé.",
        "Moyenne de moyennes, SUM après jointure 1-N : chiffres faux."
      ],
      retenir: "Un résultat juste par hasard est un bug qui attend son heure."
    },
    {
      titre: "Modifier les données en sécurité",
      exemple: "BEGIN TRAN;\n\nUPDATE dbo.facture SET statut = 'ANNULEE'\nWHERE num_facture = 'F2026-0042';\n\nIF @@ROWCOUNT <> 1\n    ROLLBACK;\nELSE\n    COMMIT;",
      points: [
        "Toujours un SELECT avec le même WHERE avant UPDATE ou DELETE.",
        "Une transaction, et un contrôle du nombre de lignes touchées.",
        "En production : un script relu, testé sur une copie, avec un plan de retour arrière.",
        "Jamais de modification « à la main » sans trace : script + ticket."
      ],
      retenir: "SELECT d'abord, transaction ensuite, contrôle avant COMMIT."
    },
    {
      titre: "Des scripts maintenables",
      exemple: "CREATE OR ALTER VIEW dbo.v_ca_client AS ...;\nDROP TABLE IF EXISTS stg.tmp_import;\n\n-- Fichier : 2026-10-26_ajout_colonne_devise.sql\n-- Ticket  : SI-1234",
      points: [
        "Scripts relançables (idempotents) : `CREATE OR ALTER`, `IF EXISTS`, `DROP … IF EXISTS`.",
        "Scripts versionnés dans Git, avec un nom daté et une référence de ticket.",
        "Conventions de nommage écrites et partagées (`v_` vues, `p_` procédures, `stg.` tables de chargement…).",
        "Une procédure = une responsabilité. Pas de procédure de 2 000 lignes.",
        "Documente les règles métier près du code."
      ],
      retenir: "Relançable, versionné, nommé, documenté."
    },
    {
      titre: "Réflexes Snowflake",
      exemple: "ALTER WAREHOUSE WH_ADHOC SET AUTO_SUSPEND = 60;\n\nSELECT code, libelle      -- colonnes utiles seulement : stockage en colonnes\nFROM article\nWHERE date_maj >= DATEADD(day, -7, CURRENT_DATE);",
      points: [
        "Chaque seconde de warehouse se paie : AUTO_SUSPEND court.",
        "Un warehouse par usage (ETL, BI, exploration) pour suivre les coûts.",
        "Liste les colonnes : Snowflake ne lit que les colonnes demandées.",
        "Les contraintes ne sont pas appliquées : écris des contrôles de qualité (doublons, orphelins).",
        "Consulte le Query Profile avant d'agrandir un warehouse."
      ],
      retenir: "Sur Snowflake, une mauvaise requête coûte de l'argent, pas seulement du temps."
    }
  ],
  differences: [
    ["Script relançable", "`CREATE OR ALTER`, `DROP … IF EXISTS`", "`CREATE OR REPLACE`, `IF NOT EXISTS`"],
    ["Coût d'une requête lente", "Temps, blocages", "Crédits facturés"],
    ["Contrôle qualité", "Contraintes + requêtes", "Requêtes de contrôle (contraintes non appliquées)"]
  ]
};
