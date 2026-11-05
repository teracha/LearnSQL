// Super dico SQL — catégorie « Index » (étape 2, 05/11/2026). Format : docs/dico.md.
// Vérification : SQLite en mémoire (copie neuve de docs/base-exemple.sql ; EXPLAIN QUERY PLAN) et le VRAI serveur
// MySQL 8.0.46 de la session (copie ventes_c rechargée avant chaque essai) : EXPLAIN, EXPLAIN ANALYZE, ANALYZE TABLE,
// « Using index » ; scripts verif_c.py et mysql/*.sql (scratchpad dico/c). SQL Server et Snowflake : documentation.
// Le plan de SQL Server n'est pas mesuré : sans index sur client_id (une clé étrangère ne crée pas d'index sur SQL
// Server), le seul chemin est le parcours de l'index cluster de la clé primaire (Clustered Index Scan).
// Sources (vérifiées le 05/11/2026) :
// - SQL Server, learn.microsoft.com/sql : t-sql/statements/create-index-transact-sql (NONCLUSTERED par défaut ; INCLUDE
//   = colonnes non clés, index non cluster seulement), relational-databases/indexes/create-indexes-with-included-columns
//   (index couvrant), create-table-transact-sql (INDEX … CLUSTERED dans CREATE TABLE, 2014+), alter-table-table-
//   constraint (une clé étrangère ne crée pas d'index), relational-databases/performance/display-the-estimated-
//   execution-plan et display-an-actual-execution-plan, ssms keyboard shortcuts (Ctrl + L, Ctrl + M),
//   t-sql/statements/set-showplan-xml-transact-sql (n'exécute pas) et set-statistics-xml-transact-sql (exécute),
//   t-sql/statements/update-statistics-transact-sql, relational-databases/statistics/statistics (AUTO_UPDATE_STATISTICS
//   ON par défaut, seuil dynamique), system-stored-procedures/sp-updatestats-transact-sql.
// - Snowflake, docs.snowflake.com/en : user-guide/tables-clustering-keys (CLUSTER BY, tables de plusieurs To, colonne
//   très variée : une expression comme TO_DATE), user-guide/tables-auto-reclustering (crédits serverless),
//   sql/alter-table (CLUSTER BY, DROP CLUSTERING KEY, SUSPEND / RESUME RECLUSTER),
//   functions/system_clustering_information, user-guide/tables-clustering-micropartitions (métadonnées tenues seules),
//   sql/explain (compile sans exécuter ; TABULAR, JSON, TEXT), sql/create-index et user-guide/tables-hybrid-index
//   (index et INCLUDE : tables hybrides seulement).
// - MySQL 8, dev.mysql.com/doc/refman/8.0/en : create-index.html, innodb-index-types.html (la clé primaire est l'index
//   cluster ; chaque index secondaire contient la clé primaire), explain.html (EXPLAIN ANALYZE : 8.0.18+),
//   analyze-table.html (UPDATE HISTOGRAM), innodb-persistent-stats.html (recalcul après 10 % de lignes changées).
// docs.snowflake.com et dev.mysql.com n'étaient pas joignables depuis la session : vérifiés par extraits de recherche.
LEARNSQL.dico = (LEARNSQL.dico || []).concat([
  {
    id: "create-index",
    nom: "CREATE INDEX",
    type: "mot-clé",
    categorie: "Index",
    definition: "Crée un index : une liste triée qui aide le moteur à trouver vite les lignes, sans tout lire.",
    moteurs: {
      sqlserver: "`CREATE [CLUSTERED | NONCLUSTERED] INDEX ix ON t (col1, col2)` ; non cluster par défaut ; un seul index cluster par table",
      snowflake: "Pas d'index sur les tables standard : micro-partitions et pruning ; très grosse table : `CLUSTER BY` (`CREATE INDEX` : tables hybrides seulement)",
      mysql: "`CREATE INDEX ix ON t (col1, col2)` ; pas de mot CLUSTERED : la table est rangée selon sa clé primaire"
    },
    noms: ["CLUSTERED INDEX", "NONCLUSTERED INDEX", "index cluster", "CREATE UNIQUE INDEX"],
    exemple: "CREATE NONCLUSTERED INDEX ix_commande_client_date\n  ON commande (client_id, date_cde);\nSELECT num_cde, date_cde\nFROM commande\nWHERE client_id = 1 AND date_cde >= '2026-03-05';",
    exemples: {
      snowflake: "-- Pas d'index à créer : le pruning des micro-partitions fait le travail\nSELECT num_cde, date_cde\nFROM commande\nWHERE client_id = 1 AND date_cde >= '2026-03-05';",
      mysql: "CREATE INDEX ix_commande_client_date\n  ON commande (client_id, date_cde);\nSELECT num_cde, date_cde\nFROM commande\nWHERE client_id = 1 AND date_cde >= '2026-03-05';"
    },
    resultat: "Index créé. La recherche peut aller droit aux 2 commandes du client 1 depuis le 05/03 (CDE-1003, CDE-1007) ; MySQL le confirme : `key = ix_commande_client_date`, `rows = 2`.",
    piege: "L'ordre des colonnes compte : cet index sert `WHERE client_id = …` (seul ou avec la date), pas `WHERE date_cde >= …` seul (MySQL : `type = ALL`, toute la table). Et chaque index ralentit les INSERT, UPDATE et DELETE : garde ceux qui servent vraiment.",
    motsCles: ["index", "accélérer", "performance", "rapide", "lent", "recherche", "optimiser", "cluster", "non cluster", "seek", "lenteur", "vitesse", "colonne", "trier"],
    voirAussi: ["include", "plan-execution", "statistiques", "cluster-by", "primary-key"],
    module: "m12"
  },
  {
    id: "include",
    nom: "INCLUDE",
    type: "mot-clé",
    categorie: "Index",
    definition: "Ajoute des colonnes en bout d'index pour qu'une requête y trouve tout, sans relire la table.",
    moteurs: {
      sqlserver: "`CREATE INDEX ix ON t (col_cherchée) INCLUDE (col_affichée, …)` : index non cluster seulement",
      snowflake: "Pas d'index sur les tables standard, donc pas d'INCLUDE ; les tables hybrides ont `CREATE INDEX … INCLUDE (…)`",
      mysql: "Pas d'INCLUDE : mets les colonnes en fin de clé, `CREATE INDEX ix ON t (client_id, date_cde, montant_ht)`"
    },
    noms: ["index couvrant", "covering index"],
    exemple: "CREATE NONCLUSTERED INDEX ix_commande_client\n  ON commande (client_id)\n  INCLUDE (date_cde, montant_ht);\nSELECT date_cde, montant_ht FROM commande WHERE client_id = 2;",
    exemples: {
      snowflake: "-- Pas d'index sur une table standard : rien à créer\nSELECT date_cde, montant_ht FROM commande WHERE client_id = 2;",
      mysql: "CREATE INDEX ix_commande_client\n  ON commande (client_id, date_cde, montant_ht);\nSELECT date_cde, montant_ht FROM commande WHERE client_id = 2;"
    },
    resultat: "Index créé : les 2 commandes du client 2 (05/03 et 03/04, 1290.00 chacune) se lisent dans l'index seul, sans retour à la table (MySQL : « Using index »).",
    piege: "Ajoute une colonne au SELECT (ici `num_cde`) et l'index ne couvre plus : chaque ligne trouvée repart chercher le reste dans la table (Key Lookup), et MySQL perd son « Using index ». Liste seulement les colonnes utiles : un `SELECT *` n'est presque jamais couvert.",
    motsCles: ["index couvrant", "couvrir", "key lookup", "lookup", "colonnes", "inclure", "ajouter", "performance", "lectures", "accélérer", "covering", "aller-retour"],
    voirAussi: ["create-index", "plan-execution", "select"],
    module: "m12"
  },
  {
    id: "plan-execution",
    nom: "Plan d'exécution",
    type: "mot-clé",
    categorie: "Index",
    definition: "Montre comment le moteur exécute ta requête : index utilisé ou table lue en entier, nombre de lignes.",
    moteurs: {
      sqlserver: "SSMS : Ctrl + L = plan estimé (sans exécuter), Ctrl + M = plan réel ; en SQL : `SET SHOWPLAN_XML ON` (estimé), `SET STATISTICS XML ON` (réel)",
      snowflake: "`EXPLAIN SELECT …` : le plan, sans exécuter ; après exécution : le Query Profile (Snowsight)",
      mysql: "`EXPLAIN SELECT …` : plan estimé ; `EXPLAIN ANALYZE SELECT …` (8.0.18+) : exécute et donne le réel"
    },
    noms: ["EXPLAIN", "EXPLAIN ANALYZE", "SHOWPLAN", "SET SHOWPLAN_XML", "SET STATISTICS XML", "Query Profile", "plan estimé", "plan réel"],
    exemple: "-- SSMS : Ctrl + L (plan estimé) ou Ctrl + M (plan réel), puis exécuter\nSELECT num_cde, date_cde\nFROM commande\nWHERE client_id = 1;",
    exemples: {
      snowflake: "EXPLAIN\nSELECT num_cde, date_cde\nFROM commande\nWHERE client_id = 1;",
      mysql: "EXPLAIN\nSELECT num_cde, date_cde\nFROM commande\nWHERE client_id = 1;"
    },
    resultat: "Toute la table est lue pour garder 3 commandes : Clustered Index Scan sur SQL Server, `type = ALL` et `rows = 8` sur MySQL. Aucun index ne sert le filtre sur client_id.",
    piege: "Le plan estimé devine le nombre de lignes : ici, MySQL en prévoit 1 après le filtre, il y en a 3 (`EXPLAIN ANALYZE`). Sur une grosse table, un tel écart donne un mauvais plan : compare toujours l'estimé et le réel.",
    motsCles: ["plan", "exécution", "explain", "lent", "lenteur", "performance", "optimiser", "estimé", "réel", "scan", "seek", "analyser", "diagnostic", "pourquoi lent", "query profile"],
    voirAussi: ["create-index", "include", "statistiques", "cluster-by"],
    module: "m12"
  },
  {
    id: "statistiques",
    nom: "UPDATE STATISTICS",
    type: "mot-clé",
    categorie: "Index",
    definition: "Recalcule la répartition des valeurs d'une table, qui sert au moteur pour choisir son plan.",
    moteurs: {
      sqlserver: "`UPDATE STATISTICS t` (`WITH FULLSCAN` : toutes les lignes) ; toute la base : `EXEC sp_updatestats` ; mises à jour auto par défaut, après assez de modifications",
      snowflake: "Pas de commande : Snowflake tient seul à jour, pour chaque micro-partition, le min et le max de chaque colonne",
      mysql: "`ANALYZE TABLE t` ; histogramme d'une colonne : `ANALYZE TABLE t UPDATE HISTOGRAM ON col` ; recalcul auto après 10 % de lignes changées"
    },
    noms: ["ANALYZE TABLE", "sp_updatestats", "UPDATE HISTOGRAM", "FULLSCAN", "statistiques"],
    exemple: "-- Après le chargement de nuit des commandes\nUPDATE STATISTICS commande WITH FULLSCAN;",
    exemples: {
      snowflake: "-- Rien à lancer : les statistiques se tiennent à jour seules\n-- (min et max de chaque colonne, par micro-partition)",
      mysql: "-- Après le chargement de nuit des commandes\nANALYZE TABLE commande;"
    },
    resultat: "Statistiques de commande recalculées en lisant toutes les lignes : les prochains plans partent de chiffres à jour (MySQL répond `status OK`).",
    piege: "Juste après un gros chargement, les statistiques ne sont pas encore à jour : une requête rapide hier devient lente, avec un plan prévu pour 1 ligne qui en traite des millions. Lance `UPDATE STATISTICS` à la fin du chargement, avant les rapports.",
    motsCles: ["statistiques", "stats", "histogramme", "répartition", "estimation", "mettre à jour", "recalculer", "optimiseur", "lent", "chargement", "analyze", "fullscan", "cardinalité", "plan"],
    voirAussi: ["plan-execution", "create-index", "cluster-by"],
    module: "m12"
  },
  {
    id: "cluster-by",
    nom: "CLUSTER BY",
    type: "mot-clé",
    categorie: "Index",
    definition: "Range une très grosse table Snowflake selon des colonnes, pour lire moins de micro-partitions.",
    moteurs: {
      sqlserver: "Pas de CLUSTER BY : l'équivalent est l'index cluster, `CREATE CLUSTERED INDEX cx ON t (col)` (un seul par table)",
      snowflake: "`ALTER TABLE t CLUSTER BY (col)` ou `CREATE TABLE … CLUSTER BY (col)` ; rangement en tâche de fond, payé en crédits ; `DROP CLUSTERING KEY` pour l'enlever",
      mysql: "Pas de CLUSTER BY : InnoDB range toujours la table selon sa clé primaire"
    },
    noms: ["clé de clustering", "clustering key", "DROP CLUSTERING KEY", "SYSTEM$CLUSTERING_INFORMATION", "reclustering"],
    exemple: "-- Pas de CLUSTER BY : l'index cluster range la table (commande a déjà le sien, sur id)\nCREATE TABLE commande_histo (\n  id       INT  NOT NULL PRIMARY KEY NONCLUSTERED,\n  date_cde DATE NOT NULL,\n  INDEX cx_commande_histo CLUSTERED (date_cde)\n);",
    exemples: {
      snowflake: "ALTER TABLE commande CLUSTER BY (date_cde);\n-- Les dates se chevauchent-elles moins d'une micro-partition à l'autre ?\nSELECT SYSTEM$CLUSTERING_INFORMATION('commande', '(date_cde)');",
      mysql: "-- Pas de CLUSTER BY : la table est rangée selon sa clé primaire\nCREATE TABLE commande_histo (\n  id       INT  NOT NULL,\n  date_cde DATE NOT NULL,\n  PRIMARY KEY (date_cde, id)\n);"
    },
    resultat: "Table créée : ses lignes sont rangées par date_cde, pas par id. Sur Snowflake, `CLUSTER BY` fait ce rangement en tâche de fond, sur les micro-partitions.",
    piege: "Sur Snowflake, une clé de clustering se paie en crédits, à chaque réorganisation : sur une petite table, ou sur un horodatage à la seconde, tu paies pour rien. Réserve-la aux tables de plusieurs To filtrées sur les mêmes colonnes, et range sur la date plutôt que l'heure : `CLUSTER BY (TO_DATE(date_recu))`.",
    motsCles: ["clustering", "clé de clustering", "micro-partitions", "pruning", "ranger", "trier", "grosse table", "crédits", "élaguer", "partition", "réorganiser", "regrouper", "performance", "snowflake"],
    voirAussi: ["create-index", "warehouse", "plan-execution", "statistiques"],
    module: "m14"
  }
]);
