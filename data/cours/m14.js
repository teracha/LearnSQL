// Parcours SQL — Cours complet du module m14 « Spécificités Snowflake », version 1 (12/11/2026).
// Écrit à partir de la fiche de révision (data/fiches/m14.js, l'ancien cours court) et des 100 « retenir » de
// data/m14-snowflake.js. Squelette validé par l'élève (m02 v2) : Exemple (qui MONTRE le piège) → Résultat → « Ce qui se
// passe » → « Pourquoi » → « Le piège » (vécu de la migration : la facture qui grimpe, le rapport Power BI lent, le
// chargement qui échoue) → « Le bon réflexe » → « SQL Server / Snowflake » ou « Et aussi » → À retenir. Chaque mot
// technique est expliqué à sa première apparition. Module Snowflake : les exemples sont écrits pour Snowflake
// (VENTES.COMMANDE) et les en-têtes de résultat sont en MAJUSCULES, comme Snowflake les rend ; un résultat qui dépend du
// service (crédits, cache, chargement) est une phrase, vérifiée dans la documentation. Renvois aux cours publiés, sans
// les répéter : casse des noms (m01), comparaisons de textes (m02), contraintes et CREATE OR REPLACE (m10).
// Résultats vérifiés avec SQLite sur docs/base-exemple.sql (scratchpad cours-complets/m14 : node extraire.js, puis
// python3 -I verif.py ; requêtes traduites à la main, PARSE_JSON et FLATTEN → json_extract et json_each) : commandes par
// statut (ANNULEE 1 549.00, EN_COURS 3 9558.00, LIVREE 4 8534.80) ; commandes d'avril (4 lignes) et le piège à
// sous-requête (MIN(date_cde) des EN_COURS = 2026-04-01 : même résultat) ; CDE-1007 EN_COURS ; la table avant l'UPDATE
// (3 EN_COURS ; l'UPDATE sans WHERE touche 8 lignes) ; le JSON du flux 1 (CDE-1001 : CHL-5 100, CHL-25 10, comme les
// lignes 1 et 2 de ligne_cde ; clé « Lignes » : 0 ligne) ; 8 commandes dans le fichier du jour. À la main, deux fois :
// 60 s de travail + 600 s d'attente = 11 minutes payées par rafraîchissement ; OFFSET -300 = 5 minutes ; 90 jours de
// rétention et une réécriture par nuit = 90 versions (relecture : + 7 jours de Fail-safe = 97 versions payées).
// Couverture des 100 « retenir » : scratchpad cours-complets/m14/couverture.txt. Laissées à l'explication de leur question
// (une seule question chacune, règle 6) : débordement sur disque (q22, vu en m05 et m08), opérateur le plus coûteux (q23),
// @~ et @% (q35), export par COPY INTO @stage (q41), rôles rattachés à SYSADMIN et rôles d'accès (q54, q55), IP autorisées
// (q62), Marketplace (q65), INFORMATION_SCHEMA (q66), RESULT_SCAN (q70), DirectQuery pré-agrégé (q76), collation 'en-ci'
// (q77, m02), table externe (q78), région (q80), chiffrement (q81), ELT et couches (q85, q86), TIMESTAMP_LTZ (q87, m03),
// Snowpark (q89), taille et compression des fichiers (q90, q91), PURGE (q92), COPY avec SELECT (q93), SELECT $1 FROM
// @stage (q94), TABLE_STORAGE_METRICS (q96).
// Sources (lues le 12/11/2026) :
// - docs.snowflake.com/en, pages lues avec curl en .md : user-guide/intro-key-concepts (3 couches ; warehouses
//   indépendants), user-guide/warehouses-overview (crédits par heure, Gen1 : XS 1, S 2, M 4… ; seconde, 60 s minimum à
//   chaque démarrage ; multi-cluster = Enterprise ; file d'attente), user-guide/warehouses-considerations (scale up, scale
//   out ; cache du warehouse vidé à l'arrêt), user-guide/cost-understanding-compute et cost-understanding-overall
//   (serverless : Search Optimization, Snowpipe ; 60 s facturées à chaque reprise), sql-reference/sql/create-warehouse
//   (AUTO_SUSPEND 600 par défaut, AUTO_RESUME TRUE, XSMALL), user-guide/resource-monitors (quota, NOTIFY et SUSPEND,
//   mensuel par défaut, warehouses seulement), user-guide/performance-query-warehouse-cache (BI : 10 minutes au moins avant
//   l'arrêt ; tâches : arrêt immédiat), user-guide/tables-clustering-micropartitions (50 à 500 Mo avant compression ; plage
//   de valeurs par colonne ; ordre de chargement ; pas d'élagage sur une sous-requête), user-guide/tables-clustering-keys
//   (plusieurs To, requêtes sélectives, table peu modifiée ; coût), user-guide/tables-auto-reclustering (crédits
//   serverless, sans warehouse ; Optima Clustering pour les tables rangées depuis le 01/09/2026),
//   functions/system_clustering_information, user-guide/search-optimization-service (Enterprise ; maintenance payée),
//   user-guide/search-optimization/secondary-indexes, sql/show-indexes-standard-tables et release-notes/2026/other/
//   2026-10-26-secondary-indexes-ga (CREATE INDEX … INCLUDE sur une table standard ; jamais unique ; recherches très
//   sélectives), user-guide/ui-snowsight-activity (Partitions scanned / total ; Metadata-based Result sans warehouse),
//   user-guide/querying-persisted-results (24 h, jusqu'à 31 jours ; texte identique, casse comprise ; droits ; RANDOM),
//   parameters (USE_CACHED_RESULT ; STATEMENT_TIMEOUT_IN_SECONDS 172800 ; DATA_RETENTION_TIME_IN_DAYS),
//   user-guide/data-time-travel (1 jour, 90 en Enterprise ; AT, BEFORE ; UNDROP échoue si le nom existe),
//   user-guide/data-failsafe (7 jours, support seul), sql/undrop-table, user-guide/tables-temp-transient (TRANSIENT sans
//   Fail-safe), sql/create-clone (aucun stockage avant modification ; pas d'historique de chargement),
//   user-guide/querying-semistructured (`:`, `.`, `::` ; VARIANT affiché entre guillemets ; noms d'éléments sensibles à la
//   casse), functions/flatten (OUTER FALSE : la ligne sans tableau disparaît), functions/parse_json, try_parse_json,
//   object_construct, sql/copy-into-table (ON_ERROR : ABORT_STATEMENT, SKIP_FILE pour Snowpipe ; FORCE ; VALIDATION_MODE ;
//   LOADED ; « Copy executed with 0 files processed. »), user-guide/data-load-considerations-load (64 jours),
//   sql/truncate-table (historique de chargement effacé), user-guide/data-load-snowpipe-intro (serverless),
//   user-guide/data-load-local-file-system-create-stage, sql-reference/constraints-overview (CHECK : COPY INTO échoue),
//   sql-reference/identifiers-syntax (MAJUSCULES), user-guide/streams-intro (avance seulement par un DML validé),
//   user-guide/tasks-intro, sql/create-dynamic-table, sql-reference/account-usage (1 an, environ 2 h de retard),
//   user-guide/security-access-control-overview, user-guide/security-row-intro (Enterprise).
// - learn.microsoft.com : power-bi/connect-data/desktop-directquery-about (DirectQuery : chaque visuel et chaque
//   interaction relancent des requêtes ; Import par défaut), sql/t-sql/statements/set-result-set-caching-transact-sql (le
//   cache de résultat existe sur Azure Synapse, pas sur SQL Server).
// Relu le 12/11/2026 (testeur, pages lues en .md) : XSMALL = 1 crédit/h en Gen1 seulement ; créé sans GENERATION, un
// warehouse est Gen2 (sql/create-warehouse ; release-notes/bcr-bundles/2026_03/bcr-2250, bundle généralisé en juin 2026),
// tarif dans la table de consommation (PDF bloqué ici). Fail-safe facturé : 97 versions (user-guide/data-cdp-storage-costs).
// LIMIT : top-K pruning (user-guide/querying-top-k-pruning-optimization). Un stream garde un repère, pas les données
// (user-guide/streams-intro). JSON : type json de SQL Server 2025 (learn.microsoft.com, json-data-type), comme m10.
LEARNSQL.cours.m14 = {
  intro: "Après la migration, la facture Snowflake grimpe et un rapport Power BI rame : faut-il réécrire la requête, ou changer un réglage ? Snowflake n'est pas un SQL Server dans le cloud : le calcul se loue à la seconde, les tables se rangent en blocs, le passé se relit. Ce module montre ce qui change, pour ne plus payer de vieux réflexes SQL Server.",
  sections: [
    {
      titre: "Le warehouse : du calcul loué à la seconde",
      exemple: "-- Pour les rafraîchissements Power BI (Import, toutes les 30 min)\nCREATE WAREHOUSE WH_REFRESH\n  WAREHOUSE_SIZE = XSMALL   -- la plus petite : 1 crédit/h (1re génération)\n  AUTO_SUSPEND = 60         -- arrêt après 60 s sans requête (défaut : 600)\n  AUTO_RESUME = TRUE;       -- repart seul à la requête suivante\nUSE WAREHOUSE WH_REFRESH;\nSELECT statut, COUNT(*) AS nb, SUM(montant_ht) AS ca\nFROM VENTES.COMMANDE GROUP BY statut ORDER BY statut;",
      resultat: [["STATUT", "NB", "CA"], ["ANNULEE", 1, "549.00"], ["EN_COURS", 3, "9558.00"], ["LIVREE", 4, "8534.80"]],
      regle: "Sur Snowflake, les données et le calcul sont séparés. Le calcul se fait dans un warehouse : des serveurs qui démarrent et s'arrêtent à la demande. On le paie à la seconde, tant qu'il tourne, qu'il travaille ou qu'il attende. Arrêté, il ne coûte rien. La facture suit donc sa taille et le temps où il tourne. La règle : un warehouse par usage, à la bonne taille, avec un arrêt automatique réglé sur le rythme de ses requêtes.",
      points: [
        "Ce qui se passe : `WH_REFRESH` calcule ; les commandes restent dans le stockage. Un warehouse (un groupe de serveurs de calcul) ne stocke aucune table : `WH_ETL` charge la même table sans gêner le rapport.",
        "Pourquoi : trois couches séparées. Le stockage se paie au volume ; le calcul, en crédits (l'unité de facture), à la seconde quand un warehouse tourne, 60 s minimum par démarrage ; les services cloud gèrent connexions et droits.",
        "Le piège : la facture qui grimpe. Avec le défaut (600 s), un rafraîchissement d'une minute toutes les 30 minutes paie environ 11 minutes : 1 de travail, 10 d'attente. En DirectQuery, chaque clic Power BI relance des requêtes.",
        "Le bon réflexe : un warehouse par usage (chargements, rafraîchissements, analystes), avec sa taille et son arrêt ; tu vois qui consomme. Un resource monitor (un quota mensuel de crédits) alerte, puis suspend.",
        "Et aussi : pour une requête trop lente, la taille au-dessus (scale up) double puissance et crédits. Pour des requêtes en attente (« queued ») à 9 h : plusieurs clusters, des copies du warehouse (multi-cluster, édition Enterprise). Gen2 (2e génération, par défaut) : autre tarif."
      ],
      retenir: "Calcul payé à la seconde, 60 s minimum par démarrage : un warehouse par usage, un arrêt automatique réglé sur l'usage."
    },
    {
      titre: "Les micro-partitions : lire moins de blocs",
      exemple: "-- Rapport Power BI : commandes depuis avril\nSELECT num_cde, date_cde, montant_ht      -- 3 colonnes lues, pas toutes\nFROM VENTES.COMMANDE\nWHERE date_cde >= '2026-04-01'            -- une valeur : les blocs de mars sont sautés\nORDER BY date_cde;\n-- Piège : même résultat, mais aucun bloc sauté :\n-- WHERE date_cde >= (SELECT MIN(date_cde) FROM VENTES.COMMANDE\n--                    WHERE statut = 'EN_COURS')",
      resultat: [["NUM_CDE", "DATE_CDE", "MONTANT_HT"], ["CDE-1005", "2026-04-01", "318.00"], ["CDE-1006", "2026-04-03", "1290.00"], ["CDE-1007", "2026-04-07", "7950.00"], ["CDE-1008", "2026-04-10", "79.80"]],
      regle: "Snowflake découpe chaque table en micro-partitions : des blocs, rangés par colonne. Pour chaque bloc, il note le minimum et le maximum de chaque colonne. Avant de lire, il compare le filtre à ces bornes et saute les blocs qui ne peuvent pas répondre : c'est l'élagage. L'élagage marche le mieux sur une colonne qui suit l'ordre de chargement, souvent la date. Compare cette colonne à une valeur fixe, pas à une sous-requête. Et cite seulement les colonnes utiles : les autres ne sont pas lues.",
      points: [
        "Ce qui se passe : les 4 commandes depuis avril. Sur une vraie table, Snowflake ne lit que les micro-partitions (blocs de 50 à 500 Mo avant compression, rangés par colonne) qui peuvent contenir avril.",
        "Pourquoi : un bloc dont le maximum est en mars est sauté sans être lu : c'est l'élagage (pruning).",
        "Le piège : le rapport Power BI lent. Le Query Profile (le plan détaillé) affiche « Partitions scanned 9 800 / total 10 000 » : presque tout est lu. Causes : un filtre sur une colonne éparpillée, ou une sous-requête dans le filtre.",
        "Le bon réflexe : filtre avec une valeur écrite, ou calculée avant, sur la colonne qui suit l'ordre de chargement (souvent la date). Liste tes colonnes : Snowflake ne lit que celles-là. `LIMIT` ne garantit pas de lire moins.",
        "SQL Server / Snowflake : ni index cluster à créer, ni statistiques à recalculer : Snowflake range dans l'ordre d'arrivée et tient seul ses métadonnées. `SELECT COUNT(*)` sans filtre s'y lit, sans passer par un warehouse."
      ],
      retenir: "Snowflake saute les blocs que le filtre exclut : une valeur fixe, sur la colonne de chargement, et les seules colonnes utiles."
    },
    {
      titre: "Ranger ou indexer : utile, mais payant",
      exemple: "-- Table de 4 To filtrée par date : mesurer, puis ranger\nSELECT SYSTEM$CLUSTERING_INFORMATION('VENTES.COMMANDE', '(date_cde)');\nALTER TABLE VENTES.COMMANDE CLUSTER BY (date_cde);\n\n-- Une commande parmi des milliards (Enterprise, octobre 2026)\nCREATE INDEX ix_cde_num ON VENTES.COMMANDE (num_cde) INCLUDE (statut);\nSELECT num_cde, statut FROM VENTES.COMMANDE WHERE num_cde = 'CDE-1007';",
      resultat: "CDE-1007, EN_COURS, avec ou sans index : ranger et indexer changent la vitesse et la facture, jamais le résultat.",
      regle: "L'élagage saute peu de blocs quand les valeurs cherchées sont éparpillées dans toute la table. L'ordre de chargement range la table gratuitement, souvent par date. Pour un autre filtre fréquent, une clé de clustering (`CLUSTER BY`) garde la table rangée selon ce filtre. Pour retrouver quelques lignes parmi des milliards, un index secondaire indique les bons blocs. Snowflake entretient les deux en fond, et ce travail se paie en crédits, surtout si la table change souvent. Réserve-les aux très grosses tables, et mesure le gain.",
      points: [
        "Ce qui se passe : la fonction mesure le rangement par date (sa profondeur moyenne : combien de blocs se chevauchent ; petite, c'est bien rangé). `CLUSTER BY` (une clé de clustering) maintient ce rangement. L'index secondaire sait dans quels blocs est CDE-1007.",
        "Pourquoi : chargée chaque jour, une table est rangée par date, gratuitement. Mais un client a des commandes dans presque tous les blocs : filtré sur lui, presque rien n'est sauté. Les UPDATE, eux, dérangent les dates.",
        "Le piège : la facture qui grimpe sans requête. Le reclassement automatique (Automatic Clustering) et la Search Optimization (recherches très sélectives, index compris) tournent en fond, en crédits serverless (calcul géré par Snowflake). Plus la table change, plus ça coûte.",
        "Le bon réflexe : une clé de clustering seulement sur une très grosse table (plusieurs To), filtrée souvent sur les mêmes colonnes, peu modifiée ; un index pour retrouver quelques lignes. Mesure avant et après : partitions lues, crédits.",
        "SQL Server / Snowflake : ne recopie pas tes index SQL Server. Snowflake n'a ni index cluster ni non cluster ; ses index secondaires (édition Enterprise) ne sont jamais uniques et ne servent pas aux gros agrégats."
      ],
      retenir: "L'ordre de chargement range gratuitement ; CLUSTER BY et les index se paient en crédits : très grosses tables, recherches très sélectives."
    },
    {
      titre: "Les caches : une 2e exécution rapide ne prouve rien",
      exemple: "-- 9 h 00 : le warehouse calcule\nSELECT client_id, SUM(montant_ht) AS ca FROM VENTES.COMMANDE GROUP BY client_id;\n-- 9 h 05 : même texte, mêmes données : résultat repris\n-- 9 h 06 : la même en minuscules : recalcul complet\nALTER SESSION SET USE_CACHED_RESULT = FALSE;   -- pour mesurer",
      resultat: "9 h 05 : réponse quasi instantanée, sans calcul. 9 h 06 : calcul complet, pour la même question.",
      regle: "Snowflake garde deux caches, des copies qui évitent de refaire un travail. Le cache de résultat garde la réponse d'une requête, et peut la rendre sans calcul quand la même requête revient. Le cache du warehouse garde les données déjà lues, tant qu'il tourne : l'arrêter le vide. Le temps d'une requête dépend donc de ce qui est en cache, pas seulement de son écriture. Pour juger une requête, mesure-la sans le cache de résultat.",
      points: [
        "Ce qui se passe : à 9 h 05, Snowflake reprend le résultat de 9 h 00 : c'est le cache de résultat (une réponse gardée). À 9 h 06, le texte diffère : autre requête.",
        "Pourquoi : un résultat est gardé 24 h (chaque réutilisation relance 24 h, 31 jours au plus). Il peut resservir si le texte est identique, les données inchangées, le rôle autorisé ; jamais avec `RANDOM` ou `CURRENT_TIMESTAMP`.",
        "Le piège : « J'ai optimisé : de 40 s à 1 s. » C'était le cache. À l'inverse, le rapport rapide hier rame à 8 h : le chargement de la nuit a changé les données.",
        "Le bon réflexe : pour mesurer, coupe le cache de résultat (`USE_CACHED_RESULT = FALSE`) et compare les partitions lues, plus fiables que le temps.",
        "Et aussi : Snowflake conseille 10 minutes au moins avant l'arrêt pour des analystes Power BI, l'arrêt immédiat pour une tâche planifiée."
      ],
      retenir: "Même texte, mêmes données : le résultat revient du cache, 24 h. Une 2e exécution rapide ne prouve rien : mesure sans le cache."
    },
    {
      titre: "Time Travel, UNDROP et CLONE : revenir en arrière",
      exemple: "-- 10 h 02 : UPDATE sans WHERE, les 8 commandes passent en LIVREE\nUPDATE VENTES.COMMANDE SET statut = 'LIVREE';\n-- 10 h 05 : la table juste avant cet UPDATE (id lu dans l'historique)\nSELECT num_cde, statut\nFROM VENTES.COMMANDE BEFORE (STATEMENT => '01bf3c4e-…')\nWHERE statut = 'EN_COURS'\nORDER BY num_cde;",
      resultat: [["NUM_CDE", "STATUT"], ["CDE-1005", "EN_COURS"], ["CDE-1006", "EN_COURS"], ["CDE-1007", "EN_COURS"]],
      regle: "Sur Snowflake, une erreur validée se répare sans sauvegarde, pendant la rétention (la durée de garde des anciennes versions). Le Time Travel relit la table telle qu'elle était, avec `AT` ou `BEFORE`. `CLONE` copie cet état passé dans une table à part : on répare depuis cette copie. `UNDROP` rend une table supprimée, si son nom est libre. Mais chaque version gardée se paie en stockage : pour une table rechargée chaque nuit, une rétention courte suffit.",
      points: [
        "Ce qui se passe : la table relue juste avant l'UPDATE : les 3 commandes en cours réapparaissent. C'est le Time Travel (relire le passé) ; `AT (OFFSET => -300)` lit la table d'il y a 5 minutes.",
        "Pourquoi : un UPDATE n'écrase pas un bloc : il en écrit un nouveau et garde l'ancien. Rétention (durée de garde) : 1 jour par défaut, 90 au plus en Enterprise ; puis 7 jours de Fail-safe (un filet de secours), via le support.",
        "Le piège : `CREATE OR REPLACE TABLE` (m10) écrase la table, et `UNDROP TABLE` (qui rend une table supprimée) échoue : le nom est pris. Et 90 jours de rétention sur une table rechargée chaque nuit : 97 versions payées, Fail-safe compris.",
        "Le bon réflexe : renomme la nouvelle table, puis `UNDROP TABLE VENTES.COMMANDE`. Pour réparer, clone l'avant : `CREATE TABLE VENTES.COMMANDE_AVANT CLONE VENTES.COMMANDE BEFORE (STATEMENT => '01bf3c4e-…')`. Table rechargée : rétention courte, ou TRANSIENT (sans Fail-safe).",
        "SQL Server / Snowflake : SQL Server repart d'une sauvegarde, longue à restaurer. CLONE copie une table ou une base sans dupliquer les données (« zéro copie ») : bac à sable idéal, mais sans l'historique de chargement (COPY INTO y recharge les fichiers)."
      ],
      retenir: "Une erreur : relis l'avant avec AT ou BEFORE, répare avec CLONE ou UNDROP, dans la rétention (1 jour par défaut)."
    },
    {
      titre: "Le JSON : VARIANT, deux-points et FLATTEN",
      exemple: "-- Le flux ORDERS n° 1 d'AquaBleu, converti en JSON par l'outil EDI\nWITH f AS (SELECT PARSE_JSON('{\"num_cde\":\"CDE-1001\",\"lignes\":[\n  {\"art\":\"CHL-5\",\"qte\":100},{\"art\":\"CHL-25\",\"qte\":10}]}') AS doc)\nSELECT f.doc:num_cde::STRING AS num_cde,\n       l.value:art::STRING   AS article,\n       l.value:qte::NUMBER   AS qte\nFROM f, LATERAL FLATTEN(input => f.doc:lignes) l\nORDER BY qte DESC;\n-- Piège : f.doc:Lignes (L majuscule) : 0 ligne, sans erreur",
      resultat: [["NUM_CDE", "ARTICLE", "QTE"], ["CDE-1001", "CHL-5", 100], ["CDE-1001", "CHL-25", 10]],
      regle: "Sur Snowflake, un document JSON se range entier dans une colonne, et se lit directement en SQL. On suit un chemin jusqu'à la valeur, puis on la convertit dans un vrai type : sinon, elle reste du JSON. Un tableau du document devient des lignes avec `LATERAL FLATTEN`. Dans un chemin, une majuscule compte : une clé mal écrite ne trouve rien, sans erreur. Contrôle donc les documents qui ne sortent aucune ligne.",
      points: [
        "Ce qui se passe : une ligne SQL par ligne de commande. `:` entre dans le JSON, `.` descend d'un niveau, `::` convertit. FLATTEN déplie le tableau `lignes` ; `value` contient chaque élément.",
        "Pourquoi : VARIANT est le type qui garde un JSON tel quel, et `:` rend toujours du VARIANT. Sans `::STRING`, Power BI reçoit \"CDE-1001\", entre guillemets : convertis tout ce que tu extrais.",
        "Le piège : les clés comptent la casse, à l'inverse des noms de colonnes. Un partenaire envoie \"Lignes\" au lieu de \"lignes\" : FLATTEN ne trouve rien et la commande sort du résultat, sans erreur : une commande EDI perdue.",
        "Le bon réflexe : `OUTER => TRUE` dans FLATTEN garde la commande, avec des cases vides à contrôler. PARSE_JSON change un texte en VARIANT ; `TRY_PARSE_JSON` rend NULL au lieu de planter sur un texte mal formé.",
        "SQL Server / Snowflake : SQL Server lit le JSON avec `JSON_VALUE(doc, '$.num_cde')`, et `CROSS APPLY OPENJSON` pour un tableau. Snowflake fabrique aussi du JSON : `OBJECT_CONSTRUCT`, `ARRAY_AGG`."
      ],
      retenir: "JSON : col:chemin::TYPE, LATERAL FLATTEN pour un tableau, des clés sensibles à la casse : contrôle les commandes sans ligne."
    },
    {
      titre: "Charger des fichiers : stage, COPY INTO, Snowpipe",
      exemple: "-- Les commandes EDI du jour, en CSV dans un stage (une zone de fichiers)\nCOPY INTO VENTES.STG_COMMANDE\nFROM @EDI.STAGE_EDI/orders/\nFILE_FORMAT = (FORMAT_NAME = 'EDI.FF_CSV_FR')   -- séparateur ;, en-tête, dates\nON_ERROR = ABORT_STATEMENT;                      -- le défaut, écrit pour être vu\n-- Test sans charger : VALIDATION_MODE = RETURN_ERRORS",
      resultat: "Un 31/02 dans le fichier : échec, 0 ligne chargée. Corrigé : orders_0412.csv chargé (LOADED, 8 lignes). Relancé : « Copy executed with 0 files processed. »",
      regle: "Un fichier se dépose d'abord dans un stage (une zone de fichiers), puis `COPY INTO` le copie dans une table. Snowpipe fait ce travail seul, à l'arrivée de chaque fichier. Snowflake garde la trace de chaque fichier chargé, pour ne pas le charger deux fois. Par défaut, `COPY INTO` échoue en entier dès qu'une ligne est fausse : on teste donc le fichier avant. Et Snowflake ne bloque pas les doublons : on contrôle la table après.",
      points: [
        "Ce qui se passe : COPY INTO lit les fichiers du stage (interne à Snowflake, ou externe : S3, Azure) et remplit la table. Il retient chaque fichier chargé 64 jours : relancé, il le saute.",
        "Pourquoi : `ON_ERROR = ABORT_STATEMENT`, le défaut de COPY, arrête tout à la première ligne fausse. `CONTINUE` saute les lignes en erreur, `SKIP_FILE` le fichier. Snowpipe (le chargement automatique à l'arrivée d'un fichier) saute le fichier, par défaut.",
        "Le piège : le chargement qui échoue la nuit, et le rapport du matin sans les commandes du jour. Un CHECK sur la table (m10) fait aussi échouer COPY INTO. Et après un `TRUNCATE`, les fichiers déjà chargés se rechargent.",
        "Le bon réflexe : teste avant, avec `VALIDATION_MODE`. Charge dans une table brute, contrôle, puis insère dans la table métier. `METADATA$FILENAME` garde le nom du fichier, pour retrouver la ligne EDI fautive.",
        "SQL Server / Snowflake : chargé deux fois, un fichier bute sur la clé primaire de SQL Server. Snowflake ne vérifie ni clé primaire ni étrangère (m10) : avec `FORCE = TRUE`, les doublons entrent. Contrôle-les après chaque chargement."
      ],
      retenir: "Fichiers → stage → COPY INTO : chaque fichier est chargé une fois, et une erreur arrête tout par défaut. Teste avec VALIDATION_MODE."
    },
    {
      titre: "Détails utiles",
      points: [
        "Droits : on les donne à des rôles, puis les rôles aux personnes. Lire une table demande `USAGE` sur la base et le schéma, plus `SELECT` ; `ON FUTURE TABLES` couvre les tables à venir.",
        "Rôles système : SYSADMIN crée les objets, SECURITYADMIN donne les droits, ACCOUNTADMIN gère le compte (rarement, avec double authentification). Un objet appartient au rôle actif à sa création.",
        "Données sensibles (Enterprise) : une MASKING POLICY masque une colonne (l'IBAN) selon le rôle ; une ROW ACCESS POLICY filtre les lignes (la région du commercial).",
        "Facture : `SNOWFLAKE.ACCOUNT_USAGE` garde 1 an (environ 2 h de retard) : `QUERY_HISTORY`, `WAREHOUSE_METERING_HISTORY`. `ALTER SESSION SET QUERY_TAG = 'rapport_ventes'` étiquette les requêtes d'un rapport.",
        "Une requête sans fin tourne jusqu'à 2 jours (`STATEMENT_TIMEOUT_IN_SECONDS`) : mets 1 heure sur le warehouse des analystes. Sans warehouse : « No active warehouse selected ».",
        "Noms : sans guillemets, Snowflake les met en MAJUSCULES (Power BI voit `NUM_CDE`) ; créé entre guillemets par un outil, `\"num_cde\"` s'écrit ensuite toujours ainsi (m01).",
        "Automatiser : un STREAM donne les changements d'une table jusqu'à ce qu'un DML validé (INSERT, MERGE) les consomme ; une TASK planifie une requête, comme l'Agent SQL Server ; une dynamic table se rafraîchit seule.",
        "Partager : le Secure Data Sharing ouvre tes données à un distributeur, sans copie ; sans compte Snowflake, un reader account, dont tu paies le calcul."
      ],
      retenir: "Droits par rôles, facture suivie dans ACCOUNT_USAGE, requêtes bornées par un délai."
    }
  ],
  differences: [
    ["Payer le calcul", "Serveur, licence", "Warehouse, à la seconde"],
    ["Accélérer un filtre", "Index", "Élagage des micro-partitions"],
    ["Ranger une table", "Index cluster", "`CLUSTER BY` (payant)"],
    ["Recherche très sélective", "Index non cluster", "Index secondaire (Enterprise)"],
    ["Requête répétée", "Recalculée", "Cache de résultat"],
    ["Annuler une erreur validée", "Restaurer une sauvegarde", "Time Travel, `UNDROP`"],
    ["Copie de test", "Restauration", "`CLONE` zéro copie"],
    ["Lire du JSON", "`OPENJSON`, `JSON_VALUE`", "`VARIANT`, `:`, `FLATTEN`"],
    ["Charger un fichier", "`BULK INSERT`", "Stage, `COPY INTO`"],
    ["Clés primaire, étrangère", "Vérifiées", "Non vérifiées"]
  ]
};
