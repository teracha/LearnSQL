LEARNSQL.cours.m14 = {
  intro: "Snowflake n'est pas un SQL Server dans le cloud. Le stockage et le calcul sont séparés, il n'y a pas d'index, et on paie le temps de calcul. Comprendre ça change la façon d'écrire et d'optimiser.",
  sections: [
    {
      titre: "L'architecture : stockage et calcul séparés",
      exemple: "USE WAREHOUSE WH_REPORTING;   -- le « moteur » qui calcule\nUSE DATABASE PROD;\nUSE SCHEMA VENTES;",
      points: [
        "Stockage : les données, en colonnes, compressées. Payé au volume.",
        "Calcul : les virtual warehouses (entrepôts virtuels). Payés à la seconde quand ils tournent.",
        "Plusieurs warehouses peuvent lire les mêmes données sans se gêner (ETL et Power BI séparés).",
        "Cloud services : connexion, optimisation, métadonnées, sécurité."
      ],
      retenir: "Données d'un côté, calcul de l'autre. On paie le calcul quand il tourne."
    },
    {
      titre: "Les warehouses et les coûts",
      exemple: "CREATE WAREHOUSE WH_ETL\n  WAREHOUSE_SIZE = 'SMALL'\n  AUTO_SUSPEND = 60      -- s'arrête après 60 s sans requête\n  AUTO_RESUME = TRUE;",
      points: [
        "Tailles XS, S, M, L… Chaque taille double la puissance ET le coût par heure.",
        "Facturation à la seconde, avec 60 secondes minimum à chaque démarrage.",
        "AUTO_SUSPEND court = pas de crédits gaspillés.",
        "Requête lourde et lente : augmenter la taille (scale up).",
        "Beaucoup d'utilisateurs en même temps : multi-cluster (scale out)."
      ],
      retenir: "Gros calcul = taille plus grande. Beaucoup d'utilisateurs = plus de clusters."
    },
    {
      titre: "Micro-partitions et pruning",
      exemple: "-- Snowflake lit seulement les micro-partitions qui peuvent contenir 2026\nSELECT SUM(montant)\nFROM commande\nWHERE date_cde >= '2026-01-01';",
      points: [
        "Les tables sont découpées automatiquement en micro-partitions (50 à 500 Mo non compressés).",
        "Pour chaque partition, Snowflake connaît le min et le max de chaque colonne.",
        "Pruning : il saute les partitions qui ne peuvent pas contenir le résultat.",
        "Pas d'index à créer ni à maintenir.",
        "Très grosses tables mal triées : une clé de clustering améliore le pruning (mais coûte des crédits).",
        "Stockage en colonnes : `SELECT *` lit toutes les colonnes. Liste celles dont tu as besoin."
      ],
      retenir: "Filtre sur des colonnes « rangées » (dates de chargement) = moins de données lues."
    },
    {
      titre: "Les caches",
      exemple: "-- 1re exécution : 12 s\n-- 2e exécution identique, données inchangées : quasi instantané (cache de résultat)",
      points: [
        "Cache de résultat : même requête, mêmes données → résultat réutilisé pendant 24 h, sans warehouse.",
        "Cache local du warehouse : données déjà lues, gardées tant qu'il tourne.",
        "Suspendre un warehouse vide son cache local.",
        "Pour mesurer une vraie performance : attention au cache."
      ],
      retenir: "Une 2e exécution rapide ne prouve rien : c'est peut-être le cache."
    },
    {
      titre: "Time Travel, UNDROP et clonage",
      exemple: "-- La table il y a 5 minutes\nSELECT * FROM commande AT (OFFSET => -60*5);\n\n-- Avant une requête précise\nSELECT * FROM commande BEFORE (STATEMENT => '01b2…');\n\nUNDROP TABLE commande;\n\n-- Copie instantanée, sans dupliquer le stockage\nCREATE TABLE commande_test CLONE commande;",
      points: [
        "Time Travel : lire une table telle qu'elle était dans le passé.",
        "Durée par défaut : 1 jour. Jusqu'à 90 jours en édition Enterprise.",
        "UPDATE raté ? Recrée les données depuis Time Travel.",
        "Fail-safe : 7 jours de plus, mais accessible seulement par le support Snowflake.",
        "CLONE : copie « zéro copie », instantanée. Parfait pour tester."
      ],
      retenir: "Erreur de manipulation : Time Travel. Besoin d'un bac à sable : CLONE."
    },
    {
      titre: "Les données semi-structurées : VARIANT",
      exemple: "-- doc = {\"client\":{\"nom\":\"Dupont\"},\"lignes\":[{\"art\":\"A1\",\"qte\":2}]}\nSELECT\n  t.doc:client.nom::STRING AS client,\n  l.value:art::STRING      AS article,\n  l.value:qte::NUMBER      AS qte\nFROM commandes_json t,\n     LATERAL FLATTEN(input => t.doc:lignes) l;",
      points: [
        "VARIANT stocke du JSON (ou XML, Avro, Parquet) tel quel.",
        "`:` pour naviguer, `::` pour convertir le type.",
        "`FLATTEN` transforme un tableau JSON en lignes.",
        "Les noms de clés JSON tiennent compte de la casse."
      ],
      retenir: "JSON : col:chemin::TYPE, et FLATTEN pour les tableaux."
    },
    {
      titre: "Charger et automatiser",
      exemple: "COPY INTO stg_commande\nFROM @stage_edi/commandes/\nFILE_FORMAT = (TYPE = CSV FIELD_DELIMITER = ';' SKIP_HEADER = 1);",
      points: [
        "Stage : l'endroit où sont déposés les fichiers (interne ou S3 / Azure).",
        "`COPY INTO` charge les fichiers. Un fichier déjà chargé n'est pas rechargé.",
        "Snowpipe : chargement automatique dès l'arrivée d'un fichier.",
        "Streams : capturer les changements d'une table (CDC).",
        "Tasks : planifier des requêtes (comme l'Agent SQL Server)."
      ],
      retenir: "Fichiers → stage → COPY INTO. Automatisation : Snowpipe, Streams, Tasks."
    }
  ],
  differences: [
    ["Index", "Oui", "Non (micro-partitions)"],
    ["Coût", "Licence / serveur", "Crédits à la seconde + stockage"],
    ["Revenir en arrière", "Sauvegardes", "Time Travel, UNDROP"],
    ["Copie de test", "Restauration de base", "`CLONE` (instantané)"],
    ["JSON", "`OPENJSON`, `JSON_VALUE`", "`VARIANT`, `:`, `FLATTEN`"],
    ["Contraintes PK / FK", "Appliquées", "Non appliquées"]
  ]
};
