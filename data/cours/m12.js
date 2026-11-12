// Parcours SQL — Cours complet du module m12 « Index et performance SQL Server », version 1 (12/11/2026).
// Écrit à partir de la fiche de révision (data/fiches/m12.js, l'ancien cours court) et des 100 « retenir » de
// data/m12-index.js. Squelette validé par l'élève (m02 v2) : Exemple (qui MONTRE le piège) → Résultat → « Ce qui se
// passe » → « Pourquoi » → « Le piège » (l'erreur vue en entreprise) → « Le bon réflexe » → « SQL Server / Snowflake »
// ou « Et aussi » → À retenir. Chaque mot technique est expliqué à sa première apparition. Module de performance : la
// base d'exemple (8 commandes) est trop petite pour mesurer ; l'intro demande d'imaginer 5 millions de lignes. Le
// résultat donne donc les lignes rendues (calculées sur la base) et le plan attendu sur une grosse table (Index Seek,
// Index Scan, Key Lookup), vérifié sur la documentation, jamais mesuré.
// Résultats vérifiés avec SQLite sur docs/base-exemple.sql (scratchpad cours-complets/m12/scripts/verif_cours.py rejoue
// les exemples tels qu'écrits, base neuve par section) : entrées de l'index client_id pour les clients 1 et 2 ((1,1),
// (1,3), (1,7), (2,2), (2,6)) ; commandes du client 2 (CDE-1002, CDE-1006) ; SELECT * du client 2 (mêmes 2 lignes) ;
// avril 2026 par MONTH/YEAR et par plage (CDE-1005 à 1008, 4 lignes chacune) ; SIREN 512345678 converti en nombre
// (AquaBleu) ; EN_COURS depuis le 02/04 (CDE-1006, 1007) et date seule (CDE-1006, 1007, 1008) ; procédure : client 6
// (CDE-1008), client 1 (CDE-1001, 1003, 1007) ; INSERT de CDE-1009 accepté (9 commandes). 12 résultats en tout.
// Mécanisme illustré avec SQLite (EXPLAIN QUERY PLAN, scripts/plans_sqlite.py) : SEARCH avec l'index pour la plage de
// dates, l'égalité + plage sur (statut, date_cde), LIKE 'CHL%' ; SCAN pour MONTH()/strftime sur la colonne, LIKE
// '%CHL%', substr(code,…), la date seule sur (statut, date_cde) ; « COVERING INDEX » quand l'index couvre. Ce n'est PAS
// le plan de SQL Server : une illustration. La conversion implicite ne s'illustre pas avec SQLite, qui convertit la
// constante (affinité de la colonne) ; SQL Server convertit la colonne (priorité des types : int passe avant char).
// Sources (lues le 12/11/2026) :
// - learn.microsoft.com/sql : relational-databases/sql-server-index-design-guide (cluster = la table, un seul par table,
//   heap ; clé cluster étroite, unique, croissante, stable, copiée dans chaque non cluster ; GUID 16 octets, page splits ;
//   PRIMARY KEY cluster par défaut ; INCLUDE au niveau feuille, non cluster seulement ; MAX en INCLUDE, jamais en clé ;
//   index couvrant, pas trop large ; SARGable ; colonne du prédicat en tête ; index utile si la requête porte sur la 1re
//   colonne ; ORDER BY servi par l'index : pas de Sort ; sur-indexation = écritures lentes et blocages ; index filtré :
//   petit, statistiques filtrées, mis à jour seulement pour ses lignes), relational-databases/
//   post-migration-validation-and-optimization-guide (non SARGable : conversion implicite et CONVERT_IMPLICIT, calcul sur
//   la colonne, fonction, LIKE '%…' ; paramètres du type de la colonne ; colonne calculée PERSISTED indexée ; sniffing et
//   ses remèdes RECOMPILE, OPTIMIZE FOR, variable locale, OPTIMIZE FOR UNKNOWN ; fonction table multi-instructions :
//   estimation fixe), relational-databases/showplan-logical-and-physical-operators-reference (Index Seek, Seek Predicate
//   et Predicate ; Index Scan ; Key Lookup toujours avec Nested Loops, à couvrir s'il s'exécute beaucoup ; plan lu de
//   droite à gauche ; TOP arrête le scan), ssdt/analyze-script-performance (de droite à gauche, de haut en bas),
//   relational-databases/query-processing-architecture-guide (parameter sniffing ; RECOMPILE : compilation à chaque
//   exécution ; variable locale : densité moyenne ; petite table : scan), relational-databases/statistics/statistics
//   (histogramme de 200 marches au plus ; seuil de mise à jour automatique ; _WA ; variable locale inconnue),
//   relational-databases/performance/cardinality-estimation-sql-server (estimateur 120 : valeurs au-delà de
//   l'histogramme), relational-databases/performance/parameter-sensitive-plan-optimization et t-sql/statements/
//   alter-database-transact-sql-compatibility-level (2022, niveau 160 : plusieurs plans par requête paramétrée),
//   relational-databases/performance/monitoring-performance-by-using-the-query-store et query-store-usage-scenarios
//   (forcer un plan ; actif par défaut depuis 2022), t-sql/statements/set-statistics-io-transact-sql et
//   relational-databases/reading-pages (lectures logiques en mémoire, physiques sur disque), relational-databases/
//   indexes/columnstore-indexes-overview (analytique, jusqu'à 10 fois ; rowstore pour chercher une valeur),
//   relational-databases/indexes/tune-nonclustered-missing-index-suggestions (une requête, pas d'ordre de colonnes, pas
//   de coût pesé ; égalités avant inégalités), relational-databases/system-dynamic-management-views/
//   sys-dm-db-index-usage-stats (seeks, scans, lookups, updates ; remis à zéro au démarrage), relational-databases/
//   indexes/create-filtered-indexes, relational-databases/indexes/indexes-on-computed-columns, relational-databases/
//   indexes/reorganize-and-rebuild-indexes (fragmentation : gros scans ; REBUILD = statistiques FULLSCAN ; souvent,
//   UPDATE STATISTICS suffit), t-sql/statements/create-index-transact-sql (taille de clé 900 / 1 700 octets),
//   relational-databases/system-stored-procedures/sp-executesql-transact-sql (plan réutilisé), relational-databases/
//   security/sql-injection, relational-databases/performance/intelligent-query-processing (fonctions scalaires
//   intégrées en 2019), system-dynamic-management-views/sys-dm-os-wait-stats (PAGEIOLATCH, RESOURCE_SEMAPHORE, CXPACKET),
//   t-sql/database-console-commands/dbcc-dropcleanbuffers-transact-sql, t-sql/data-types/data-type-precedence-transact-sql,
//   ssms/sql-server-management-studio-keyboard-shortcuts (Ctrl + M : plan réel).
// - docs.snowflake.com/en (lu en .md avec curl) : user-guide/tables-clustering-micropartitions (50 à 500 Mo non
//   compressés, ordre du chargement, plage de valeurs de chaque colonne, élagage, colonnes stockées à part),
//   user-guide/tables-clustering-keys (tables de plusieurs To, crédits), user-guide/search-optimization/secondary-indexes
//   et release-notes/2026/other/2026-10-26-secondary-indexes-ga (GA le 26/10/2026, Enterprise, recherches très
//   sélectives, INCLUDE, l'ordre des clés compte, une fonction non dérivable du min/max se met dans l'index : UPPER),
//   user-guide/search-optimization-service (entretien payé), user-guide/performance-query-storage (clustering : édition
//   Standard), user-guide/ui-snowsight-activity (Query Profile : Partitions scanned et Partitions total),
//   sql-reference/sql-all (aucune commande UPDATE STATISTICS).
// Couverture des 100 « retenir » : scratchpad cours-complets/m12/couverture.txt. Laissées à l'explication de leur
// question (une seule question chacune, règle 6 de docs/plan-sql.md) : <> et NOT (q17), index filtré et paramètre
// (q21), Stream Aggregate (q43), spill (q44), FILLFACTOR (q48), OPTIMIZE_FOR_SEQUENTIAL_KEY (q50), vue indexée (q55),
// full-text (q56), OR (q57), seuil de parallélisme (q60), niveau de compatibilité (q67), vues imbriquées (q68), types
// trop larges (q72), _WA_Sys_ (q73), colonnes corrélées (q74), FULLSCAN (q75), UNIQUE et CHECK fiables (q79, q80),
// partitions (q81), heap : forwarded records et DELETE (q82, q83), coût estimé (q85), DISTINCT (q88, vu en m01), tempdb
// (q96), batch mode (q98), Adaptive Join (q99).
// Signalé au superviseur : q77 (« ne peut-on pas » : SQL Server crée l'index avec un avertissement, puis refuse les
// lignes trop longues ; t-sql/statements/create-index-transact-sql, « Index key size »).
LEARNSQL.cours.m12 = {
  intro: "Ton rapport Power BI « commandes par client » met 40 secondes depuis la reprise de 5 ans d'historique Divalto. Index manquant, ou requête qui l'empêche de servir ? Un index, c'est la table des matières de la table : il évite de tout lire, mais se paie à chaque écriture. Ce module t'apprend à lire le plan d'exécution (le chemin choisi par le moteur), au lieu d'ajouter un index qui ralentit l'import EDI. Ici, `commande` a 8 lignes : pour les plans, imagine-la avec 5 millions.",
  sections: [
    {
      titre: "Cluster ou non cluster : la table, ou sa table des matières",
      exemple: "-- La clé primaire range déjà dbo.commande par id : l'index cluster (m10)\nCREATE NONCLUSTERED INDEX ix_commande_client\n  ON dbo.commande (client_id);\n\nSELECT client_id, id FROM dbo.commande\nWHERE client_id <= 2\nORDER BY client_id, id;",
      resultat: [["client_id", "id"], [1, 1], [1, 3], [1, 7], [2, 2], [2, 6]],
      points: [
        "Ce qui se passe : ces 5 lignes sont le début de l'index : chaque client, puis l'id de ses commandes. La requête ne lit que l'index : tout y est, déjà trié.",
        "Pourquoi : l'index cluster EST la table, rangée selon sa clé : un seul par table, comme un dictionnaire n'a qu'un ordre. Un non cluster est une liste triée à part ; chaque entrée garde la clé cluster (`id`) pour retrouver la ligne.",
        "Le piège : une clé cluster large ou aléatoire, copiée dans chaque index non cluster. Un GUID (`NEWID()`, 16 octets tirés au hasard) alourdit tout, et chaque insertion tombe au milieu : des pages coupées en deux, la fragmentation.",
        "Le bon réflexe : une clé cluster étroite, unique, stable et croissante : un `INT` `IDENTITY`. Le numéro métier (`num_cde`) prend un index `UNIQUE` non cluster. Sans index cluster, la table est un tas (heap) : bon pour un chargement.",
        "SQL Server / Snowflake : pas d'index cluster sur Snowflake. Il range les lignes dans l'ordre du chargement, en micro-partitions (blocs de 50 à 500 Mo), avec le min et le max de chaque colonne (m14)."
      ],
      retenir: "Cluster = la table rangée selon sa clé, un seul par table. Non cluster = une table des matières à part, qui pointe vers la clé cluster."
    },
    {
      titre: "Lire le plan : Seek, Scan et Key Lookup",
      exemple: "SET STATISTICS IO ON;          -- pages lues : onglet Messages\nSELECT num_cde, montant_ht     -- Ctrl + M : plan réel\nFROM dbo.commande\nWHERE client_id = 2;",
      resultat: "2 lignes : CDE-1002 et CDE-1006. Plan, de droite à gauche : Index Seek sur ix_commande_client, puis un Key Lookup par ligne, dans une boucle (Nested Loops).",
      points: [
        "Ce qui se passe : l'Index Seek descend droit au client 2, comme dans un dictionnaire. Mais `num_cde` et `montant_ht` ne sont pas dans l'index : pour chaque ligne trouvée, le Key Lookup va les lire dans la table.",
        "Pourquoi : l'optimiseur (le module qui choisit le plan) estime le nombre de lignes. Peu de lignes (un filtre sélectif) : Seek et quelques allers-retours. Beaucoup : les lookups coûtent plus que tout lire, il choisit un Scan, la lecture complète.",
        "Le piège : « Scan = lent, Seek = rapide ». Un Scan est normal sur une petite table, ou pour 30 % des lignes. Le vrai signal : un Scan de millions de lignes pour en garder 3, ou 200 000 Key Lookup.",
        "Le bon réflexe : juge avec `STATISTICS IO`. Les lectures logiques (pages lues en mémoire) mesurent le travail ; la durée varie avec le cache et la charge. Mesure avant, change une seule chose, mesure après.",
        "Et aussi : un gros agrégat (le CA par mois sur 500 millions de lignes) lit tout. Un index columnstore, rangé par colonne et compressé, rend ce Scan rapide, mais pas la lecture d'une commande ; Snowflake stocke tout en colonnes."
      ],
      retenir: "Seek = accès direct, Scan = tout lire, Key Lookup = retour à la table pour les colonnes manquantes. Juge un plan avec les lectures logiques."
    },
    {
      titre: "L'index couvrant : INCLUDE supprime le Key Lookup",
      exemple: "CREATE NONCLUSTERED INDEX ix_commande_client_couvrant\n  ON dbo.commande (client_id)\n  INCLUDE (num_cde, montant_ht);\n\nSELECT num_cde, montant_ht FROM dbo.commande WHERE client_id = 2;\nSELECT *                   FROM dbo.commande WHERE client_id = 2;",
      resultat: "Mêmes 2 commandes. 1re requête : Index Seek seul, l'index la couvre. 2e : le Key Lookup revient (`date_cde`, `statut`, `canal`).",
      points: [
        "Ce qui se passe : la 1re requête trouve tout dans l'index : `client_id` pour chercher, `num_cde` et `montant_ht` en INCLUDE. Elle ne touche plus la table. `SELECT *` veut toutes les colonnes : aucun index ne les a.",
        "Pourquoi : la clé de l'index est triée : elle sert à chercher et à trier (WHERE, JOIN, ORDER BY). INCLUDE ajoute des colonnes en bout d'index, sans tri : elles voyagent avec l'entrée.",
        "Le piège : `SELECT *` dans une vue ou un rapport Power BI : les lookups ou le Scan reviennent. L'excès inverse : 25 colonnes en INCLUDE, une copie de la table à tenir à jour à chaque écriture.",
        "Le bon réflexe : filtres et tris dans la clé, colonnes affichées en INCLUDE, et seulement celles qui servent. Un index proche existe ? Ajoute-lui une colonne en INCLUDE plutôt que d'en créer un autre.",
        "SQL Server / Snowflake : un texte long (`VARCHAR(MAX)`) peut aller en INCLUDE, jamais dans la clé. Les index secondaires de Snowflake ont aussi INCLUDE (édition Enterprise, depuis octobre 2026), pour les recherches très sélectives."
      ],
      retenir: "Clé = chercher et trier ; INCLUDE = transporter. Un index qui contient toutes les colonnes de la requête la couvre : plus de Key Lookup."
    },
    {
      titre: "SARGable : laisse la colonne nue",
      exemple: "-- Index : (date_cde) INCLUDE (num_cde) ; (siren) sur client\nSELECT num_cde FROM dbo.commande\nWHERE MONTH(date_cde) = 4 AND YEAR(date_cde) = 2026;      -- 1\nSELECT num_cde FROM dbo.commande\nWHERE date_cde >= '20260401' AND date_cde < '20260501';   -- 2\nSELECT nom FROM dbo.client WHERE siren = 512345678;       -- 3 : SIREN en texte",
      resultat: [["requête", "lignes", "plan sur une grosse table"], ["1 : fonctions", "CDE-1005 à 1008", "Index Scan : tout l'index"], ["2 : colonne nue", "les mêmes 4", "Index Seek : avril seul"], ["3 : un nombre", "AquaBleu", "Scan, CONVERT_IMPLICIT"]],
      points: [
        "Ce qui se passe : 1 et 2 rendent les 4 commandes d'avril. Sur 5 millions de lignes, la 1 lit tout l'index, la 2 va droit à avril. La 3 trouve AquaBleu en convertissant chaque SIREN en nombre.",
        "Pourquoi : l'index est trié sur `date_cde`, pas sur `MONTH(date_cde)` : pour connaître le mois, le moteur doit le calculer sur chaque ligne. Une condition qui peut suivre l'ordre de l'index est dite SARGable (utilisable pour chercher).",
        "Le piège : la fonction cachée, sans erreur : `ISNULL(statut, '') = 'OK'`, `montant_ht * 1.2 > 1000`, `LIKE '%CHL%'` (m02), ou une conversion implicite (le moteur change le type seul), comme un paramètre `NVARCHAR` contre un `VARCHAR`. Le plan avertit : `CONVERT_IMPLICIT`.",
        "Le bon réflexe : la colonne nue, le calcul du côté de la valeur : une plage de dates, `montant_ht > 1000 / 1.2`, `siren = '512345678'`, des paramètres du type de la colonne. Fonction inévitable : une colonne calculée stockée (`PERSISTED`), indexée.",
        "SQL Server / Snowflake : même réflexe. Snowflake saute les micro-partitions grâce au min et au max de chaque colonne, et `UPPER(nom)` l'en empêche souvent. Vérifie dans le Query Profile (son plan détaillé) : partitions lues sur le total."
      ],
      retenir: "Colonne filtrée nue : ni fonction, ni calcul, ni conversion. Sinon le moteur lit tout l'index au lieu d'y chercher."
    },
    {
      titre: "Index composé : l'ordre des colonnes compte",
      exemple: "CREATE NONCLUSTERED INDEX ix_commande_statut_date\n  ON dbo.commande (statut, date_cde) INCLUDE (num_cde);\n\nSELECT num_cde FROM dbo.commande\nWHERE statut = 'EN_COURS' AND date_cde >= '20260402';   -- 1\nSELECT num_cde FROM dbo.commande\nWHERE date_cde >= '20260402';                           -- 2",
      resultat: [["requête", "lignes", "plan (cet index seul)"], ["1 : statut et date", "CDE-1006, CDE-1007", "Index Seek : EN_COURS, puis la plage"], ["2 : date seule", "CDE-1006, 1007, 1008", "Index Scan : tout l'index"]],
      points: [
        "Ce qui se passe : l'index est trié par statut, puis par date, comme un annuaire par nom, puis prénom. Avec le statut, le Seek saute aux EN_COURS et lit leurs dates ; sans lui, les dates sont éparpillées.",
        "Pourquoi : un index composé (sur plusieurs colonnes) sert à partir de sa 1re colonne : pour A, ou A et B, pas pour B seul. Après une plage (`>=`), les colonnes suivantes ne guident plus la recherche.",
        "Le piège : l'index `(date_cde, statut)` pour la requête 1. Le Seek lit toutes les commandes depuis le 2 avril, tous statuts mêlés, et teste le statut ligne par ligne : le « Predicate », à côté du « Seek Predicate ».",
        "Le bon réflexe : les colonnes filtrées par égalité d'abord, la plage ensuite. Pour un tri, un index dans l'ordre de l'`ORDER BY` évite le tri (opérateur Sort) : `TOP (10) … ORDER BY date_cde DESC` lit 10 entrées et s'arrête.",
        "Et aussi : `(client_id)` à côté de `(client_id, date_cde)` fait souvent doublon : le second sert aux mêmes recherches. Les index secondaires de Snowflake suivent la même règle : la 1re clé élague le mieux."
      ],
      retenir: "Index (A, B) : sert pour A, ou A et B, pas pour B seul. Les égalités d'abord, la plage en dernier."
    },
    {
      titre: "Statistiques et parameter sniffing : quand l'estimation se trompe",
      exemple: "-- Seul index : (client_id), sans INCLUDE\nCREATE PROCEDURE dbo.cdes_client @client INT AS\n  SELECT num_cde, montant_ht FROM dbo.commande\n  WHERE client_id = @client;\nGO\nEXEC dbo.cdes_client @client = 6;   -- 1er appel : le plan naît ici\nEXEC dbo.cdes_client @client = 1;   -- AquaBleu : même plan",
      resultat: "Client 6 : 1 ligne (CDE-1008). Client 1 : 3 lignes (CDE-1001, 1003, 1007), avec le plan calculé pour le client 6.",
      points: [
        "Ce qui se passe : au 1er appel, SQL Server « renifle » (sniffing) la valeur 6, estime 1 ligne, choisit Seek + Key Lookup et garde ce plan. Le client 1 le reçoit : pour 2 millions de commandes AquaBleu, 2 millions d'allers-retours.",
        "Pourquoi : pour estimer, l'optimiseur lit les statistiques : un histogramme de la répartition des valeurs. Elles se mettent à jour seules, mais après assez de modifications : les commandes de la nuit peuvent y manquer.",
        "Le piège : la procédure rapide le matin, lente l'après-midi, sans nouvelles données : son plan a été recalculé pour un client atypique. Le signe, dans le plan réel : 1 ligne estimée, 2 millions réelles.",
        "Le bon réflexe : `UPDATE STATISTICS dbo.commande` après un gros chargement. Contre le sniffing : `OPTION (RECOMPILE)` (un plan par appel, payé en CPU), `OPTIMIZE FOR` (le plan d'une valeur choisie), ou le bon plan forcé dans le Query Store (l'historique des plans).",
        "SQL Server / Snowflake : depuis SQL Server 2022 (niveau de compatibilité 160), une requête peut garder plusieurs plans selon la valeur. Snowflake n'a pas d'`UPDATE STATISTICS` : ses métadonnées (min et max par micro-partition) se tiennent seules."
      ],
      retenir: "Plan lent = souvent une estimation fausse : compare estimé et réel. Statistiques à jour ; contre le sniffing : RECOMPILE, OPTIMIZE FOR, Query Store."
    },
    {
      titre: "Chaque index se paie : garde ceux qui servent",
      exemple: "-- Les 4 index de ce cours : (client_id) ; (client_id) INCLUDE (…) ;\n-- (date_cde) INCLUDE (…) ; (statut, date_cde) INCLUDE (…)\nINSERT INTO dbo.commande (id, num_cde, client_id, date_cde, statut, canal, montant_ht)\nVALUES (9, 'CDE-1009', 4, '20260414', 'EN_COURS', 'EDI', 318.00);",
      resultat: "1 ligne insérée, 5 structures écrites : la table (l'index cluster) et ses 4 index, dont deux ont la même clé.",
      points: [
        "Ce qui se passe : une commande, cinq écritures ; une intégration EDI de 10 000 commandes en fait 50 000. Et `(client_id)` seul fait doublon : l'index couvrant a la même clé.",
        "Pourquoi : chaque index est une copie triée de quelques colonnes. INSERT, DELETE, et tout UPDATE d'une colonne indexée doivent la tenir à jour. Trop d'index ralentit les écritures et peut créer des blocages (m11).",
        "Le piège : créer tels quels les « index manquants » affichés en vert par SSMS. Chacun ne voit qu'une requête, sans ordre de colonnes ni coût d'écriture : un an après, 12 index, et l'import de nuit déborde.",
        "Le bon réflexe : `sys.dm_db_index_usage_stats` compte, par index, les lectures (seeks, scans, lookups) et les écritures (updates). 0 lecture, beaucoup d'écritures : à supprimer, après vérification (contrainte UNIQUE, clôture annuelle). Compteurs remis à zéro au redémarrage.",
        "SQL Server / Snowflake : un index filtré (`… WHERE statut = 'EN_COURS'`) ne range que les commandes en cours : petit, mis à jour pour elles seules. Sur Snowflake, index secondaire et clé de clustering (`CLUSTER BY`) s'entretiennent en crédits (m14)."
      ],
      retenir: "Un index se paie à chaque écriture : pas d'index « au cas où ». Mesure leur usage, supprime les doublons et les inutiles."
    },
    {
      titre: "Détails utiles",
      points: [
        "Fragmentation (pages en désordre ou à moitié vides) : elle gêne surtout les gros scans. `REORGANIZE` est léger, `REBUILD` refait l'index et ses statistiques ; souvent, `UPDATE STATISTICS` seul suffit.",
        "SQL dynamique : `sp_executesql` avec des paramètres, plutôt qu'`EXEC` d'une chaîne où les valeurs sont collées. Le plan est réutilisé, et l'injection SQL évitée.",
        "Une variable locale (`DECLARE @d date = @param`) cache sa valeur à l'optimiseur : estimation moyenne pour tous. `OPTIMIZE FOR UNKNOWN` fait pareil, exprès.",
        "Fonctions : une scalaire maison tourne une fois par ligne (SQL Server 2019 en intègre certaines) ; une table multi-instructions a souvent une estimation fixe. Préfère la fonction table inline, un seul `RETURN (SELECT …)`.",
        "1re exécution en 20 s, 2e en 2 s : les pages sont restées en mémoire. Ne vide ce cache (`DBCC DROPCLEANBUFFERS`) que sur un serveur de test.",
        "Attentes du serveur : `PAGEIOLATCH` = lectures disque ; `RESOURCE_SEMAPHORE` = attente de mémoire pour trier ou hacher, souvent mal estimée ; `CXPACKET` = parallélisme, un symptôme et non une cause.",
        "Méthode : les plus gros consommateurs d'abord (Query Store, `sys.dm_exec_query_stats`), des volumes réalistes en test, une modification à la fois, une mesure avant et après."
      ],
      retenir: "Mesure, comprends, corrige la cause, mesure encore : pas de réglage sans chiffre avant et après."
    }
  ],
  differences: [
    ["Ranger la table", "Index cluster (un seul)", "Micro-partitions, `CLUSTER BY`"],
    ["Index secondaire", "Non cluster", "Enterprise, très sélectif"],
    ["Coût d'un index", "Écritures plus lentes", "Crédits d'entretien"],
    ["Filtre avec fonction", "Scan, index inutilisé", "Élagage souvent perdu"],
    ["Gros agrégat", "Index columnstore", "Stockage en colonnes"],
    ["Statistiques", "`UPDATE STATISTICS`", "Tenues seules"],
    ["Voir le plan", "Plan réel (Ctrl + M)", "Query Profile"],
    ["Mesurer l'effort", "Lectures logiques", "Partitions lues / total"]
  ]
};
