LEARNSQL.cours.m12 = {
  intro: "Un index, c'est comme l'index d'un livre : il évite de tout lire pour trouver une page. Bien choisi, il divise un temps de réponse par 100. Mal choisi, il ralentit les écritures pour rien.",
  sections: [
    {
      titre: "Index cluster et index non cluster",
      exemple: "-- La table est rangée physiquement par id\nCREATE CLUSTERED INDEX cx_commande ON dbo.commande (id);\n\n-- Un « annuaire » à part, trié par client\nCREATE NONCLUSTERED INDEX ix_commande_client\n  ON dbo.commande (client_id, date_cde)\n  INCLUDE (montant);",
      points: [
        "Index cluster : la table ELLE-MÊME est triée selon la clé. Un seul par table.",
        "La clé primaire crée un index cluster par défaut.",
        "Bonne clé cluster : étroite, unique, croissante (ex. un id IDENTITY).",
        "Table sans index cluster = « heap » (tas).",
        "Index non cluster : structure à part, avec la clé + un pointeur vers la ligne.",
        "`INCLUDE` : ajoute des colonnes en bout d'index, pour éviter d'aller lire la table."
      ],
      retenir: "Cluster = l'ordre de la table. Non cluster = un annuaire à côté."
    },
    {
      titre: "Seek, Scan et Key Lookup",
      exemple: "SET STATISTICS IO ON;\nSELECT montant FROM dbo.commande WHERE client_id = 42;\n-- Regarde « lectures logiques » dans l'onglet Messages",
      points: [
        "Index Seek : on va directement aux bonnes lignes. Rapide.",
        "Index / Table Scan : on lit tout. Normal pour de petites tables ou de gros volumes demandés.",
        "Key Lookup : l'index trouve la ligne, mais il manque des colonnes → aller-retour dans la table. Coûteux en masse.",
        "Index « couvrant » : contient toutes les colonnes utiles (clé + INCLUDE). Pas de lookup.",
        "`SET STATISTICS IO ON` : le nombre de lectures logiques est la vraie mesure de l'effort."
      ],
      retenir: "Seek = rapide. Beaucoup de Key Lookup = ajoute un INCLUDE."
    },
    {
      titre: "L'ordre des colonnes dans l'index",
      exemple: "-- Index sur (client_id, date_cde)\nWHERE client_id = 42 AND date_cde >= '20260101'   -- Seek ✔\nWHERE client_id = 42                              -- Seek ✔\nWHERE date_cde >= '20260101'                      -- Scan ✘",
      points: [
        "Un index composé est trié par la 1re colonne, puis par la 2e…",
        "Il sert si le filtre utilise le début de la clé (comme un annuaire : nom, puis prénom).",
        "Mets en premier les colonnes filtrées par égalité, puis celles filtrées par plage."
      ],
      retenir: "Index (A, B) : utile pour A, ou A + B. Pas pour B seul."
    },
    {
      titre: "Les requêtes qui empêchent l'index (non SARGable)",
      exemple: "WHERE YEAR(date_cde) = 2026            -- ✘ fonction sur la colonne\nWHERE code_client = 12345              -- ✘ si code_client est VARCHAR\nWHERE nom LIKE '%DUP%'                  -- ✘ joker au début\nWHERE ISNULL(statut, '') = 'OK'         -- ✘ fonction\n\nWHERE date_cde >= '20260101' AND date_cde < '20270101'  -- ✔",
      points: [
        "Fonction sur la colonne = l'index ne peut pas être parcouru par recherche.",
        "Conversion implicite (types différents) = même effet. Visible dans le plan (avertissement jaune).",
        "Joker `%` au début d'un LIKE = scan.",
        "Un OR entre deux colonnes différentes est souvent mal optimisé."
      ],
      retenir: "Laisse la colonne « nue » dans le WHERE."
    },
    {
      titre: "Le plan d'exécution",
      exemple: "-- SSMS : Ctrl + M (plan réel), puis exécuter\n-- Lire de droite à gauche, de haut en bas\n-- Comparer « lignes estimées » et « lignes réelles »",
      points: [
        "Le plan montre COMMENT le moteur exécute ta requête.",
        "Les flèches épaisses = beaucoup de lignes.",
        "Grosse différence estimé / réel = statistiques fausses ou mauvais plan.",
        "Les « index manquants » proposés par SSMS : des pistes, pas des ordres. Ne les crée pas tous."
      ],
      retenir: "Estimé très différent du réel = cherche du côté des statistiques."
    },
    {
      titre: "Statistiques et parameter sniffing",
      exemple: "UPDATE STATISTICS dbo.commande;\n\n-- Plan recalculé à chaque appel\nSELECT … WHERE client_id = @client\nOPTION (RECOMPILE);",
      points: [
        "Les statistiques décrivent la répartition des valeurs. L'optimiseur s'en sert pour estimer.",
        "Statistiques périmées (après un gros chargement) = mauvais plans.",
        "Parameter sniffing : le plan est calculé pour le 1er paramètre reçu, puis réutilisé.",
        "Si ce 1er paramètre était atypique (un très gros client), le plan est mauvais pour les autres.",
        "Remèdes : `OPTION (RECOMPILE)`, `OPTIMIZE FOR`, ou revoir la requête."
      ],
      retenir: "Requête rapide un jour, lente le lendemain : pense statistiques et parameter sniffing."
    },
    {
      titre: "Le coût des index",
      exemple: "-- Chaque INSERT dans commande met aussi à jour tous ses index\n-- 12 index sur une table d'import EDI = chargement lent",
      points: [
        "Chaque index ralentit INSERT, UPDATE et DELETE.",
        "Supprime les index jamais utilisés (`sys.dm_db_index_usage_stats`).",
        "Évite les index en double (même début de clé).",
        "Snowflake n'a pas d'index : il utilise les micro-partitions (module 14)."
      ],
      retenir: "Un index se paie à chaque écriture. Garde ceux qui servent."
    }
  ],
  differences: [
    ["Index", "Cluster, non cluster, columnstore…", "Pas d'index (micro-partitions + pruning)"],
    ["Optimiser un filtre fréquent", "Créer un index", "Clé de clustering (très grosses tables)"],
    ["Voir le plan", "Plan d'exécution SSMS", "Query Profile"]
  ]
};
