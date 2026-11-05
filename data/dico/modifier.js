// Super dico SQL — catégorie « Modifier » (étape 2, 05/11/2026). Format : docs/dico.md.
// Chaque instruction est jouée sur une copie de docs/base-exemple.sql : SQLite en mémoire (script verif_b.py, scratchpad
// dico/b) et copie MySQL 8.0.46 « ventes_b » du serveur de la session, rechargée avant chaque essai (verif_mysql_b.py ;
// la base partagée « ventes » n'est jamais modifiée). Ce que SQLite n'a pas est refait à la main, deux fois :
// TRUNCATE (= DELETE sans WHERE), MERGE (= INSERT … ON CONFLICT DO UPDATE, puis simulation en Python),
// OUTPUT (SELECT avant + RETURNING après, puis Python).
// Sources (vérifiées le 05/11/2026) :
// - SQL Server, learn.microsoft.com/sql/t-sql : statements/insert-transact-sql, queries/table-value-constructor-transact-sql
//   (1 000 lignes au plus dans INSERT … VALUES, erreur 10738), queries/update-transact-sql (UPDATE alias SET … FROM … JOIN ;
//   résultat indéfini si la jointure donne plusieurs lignes source), statements/delete-transact-sql,
//   statements/truncate-table-transact-sql (refusé si une clé étrangère référence la table ; IDENTITY remis au départ ;
//   annulable dans une transaction), statements/merge-transact-sql (`;` obligatoire, erreur 10713 ; erreur si une ligne
//   cible est touchée deux fois ; NOT MATCHED BY SOURCE ; @@ROWCOUNT = total), queries/output-clause-transact-sql
//   (inserted / deleted, $action, erreur 334 avec un trigger sans INTO, ordre non garanti), errors-events (4712).
// - Snowflake, docs.snowflake.com/en/sql-reference : sql/insert (OVERWRITE vide la table avant, dans la transaction),
//   sql/insert-multi-table (INSERT ALL / FIRST), sql/update (UPDATE … SET … FROM … WHERE ;
//   ERROR_ON_NONDETERMINISTIC_UPDATE = FALSE par défaut), sql/delete (DELETE … USING), sql/truncate-table (efface aussi
//   l'historique de chargement), sql/merge (MERGE INTO … USING … ON … WHEN [NOT] MATCHED ; pas de BY SOURCE ;
//   ERROR_ON_NONDETERMINISTIC_MERGE = TRUE par défaut, user-guide/admin-account-management), constraints-overview
//   (clés primaire, unique, étrangère non vérifiées sur une table standard ; NOT NULL vérifié). Pas de clause OUTPUT ni
//   RETURNING dans la syntaxe de INSERT, UPDATE, DELETE, MERGE : ils rendent le nombre de lignes.
// - MySQL 8, dev.mysql.com/doc/refman/8.0/en : insert.html, insert-select.html, insert-on-duplicate.html (alias de ligne
//   8.0.19+, VALUES() déprécié, 1 ligne ajoutée = 1, 1 ligne modifiée = 2), update.html (UPDATE t1 JOIN t2 … SET),
//   delete.html, truncate-table.html et implicit-commit.html, information-functions.html (LAST_INSERT_ID) ; testé sur
//   ventes_b : UPDATE … FROM refusé (1064), sql_safe_updates (1175), TRUNCATE puis ROLLBACK = table toujours vide,
//   TRUNCATE d'une table référencée refusé (1701, même si l'autre table est vide), MERGE, OUTPUT et RETURNING refusés
//   (1064), SELECT … INTO nouvelle_table refusé (1327), INSERT … SELECT relancé = erreur 1062 et aucune ligne ajoutée,
//   doublon dans un ON DUPLICATE KEY UPDATE = la dernière valeur gagne, sans erreur.
// docs.snowflake.com et dev.mysql.com n'étaient pas joignables depuis la session : Snowflake vérifié par extraits de
// recherche, MySQL par le serveur réel.
LEARNSQL.dico = (LEARNSQL.dico || []).concat([
  {
    id: "insert",
    nom: "INSERT",
    type: "mot-clé",
    categorie: "Modifier",
    definition: "Ajoute une ou plusieurs lignes dans une table, avec les valeurs écrites dans la requête.",
    moteurs: {
      sqlserver: "`INSERT INTO t (col1, col2) VALUES (…), (…)` ; 1 000 lignes au plus par `VALUES`",
      snowflake: "Même écriture ; sur une table standard, la clé primaire n'est pas vérifiée : un doublon passe sans erreur",
      mysql: "Même écriture"
    },
    noms: ["INSERT INTO"],
    exemple: "INSERT INTO client (id, code, nom, ville, pays, type)\nVALUES (8, 'C008', 'Piscines Martin', 'Toulon', 'FR', 'PRO'),\n       (9, 'C009', 'Aqua Center', NULL, 'BE', 'PRO');",
    resultat: [["code", "nom", "ville", "pays", "siren"], ["C008", "Piscines Martin", "Toulon", "FR", null], ["C009", "Aqua Center", null, "BE", null]],
    piege: "Sans la liste des colonnes, `INSERT INTO client VALUES (…)` dépend de l'ordre des colonnes de la table : le jour où une colonne s'ajoute, l'INSERT plante, ou range les valeurs au mauvais endroit. Liste toujours les colonnes : celles qui manquent prennent leur valeur par défaut, ou NULL (ici, le siren).",
    motsCles: ["ajouter", "insérer", "créer", "nouvelle", "nouveau", "ajouter une ligne", "enregistrement", "saisir", "values", "insert", "into", "remplir", "alimenter", "écrire"],
    voirAussi: ["insert-select", "update", "default", "identity", "output"],
    module: "m09"
  },
  {
    id: "insert-select",
    nom: "INSERT … SELECT",
    type: "mot-clé",
    categorie: "Modifier",
    definition: "Ajoute dans une table existante toutes les lignes renvoyées par une requête SELECT.",
    moteurs: {
      sqlserver: "`INSERT INTO t (cols) SELECT … FROM …` ; pour créer la table en même temps : `SELECT … INTO nouvelle FROM …`",
      snowflake: "Même écriture ; `INSERT OVERWRITE INTO t SELECT …` vide la table avant ; créer et remplir : `CREATE TABLE t AS SELECT …`",
      mysql: "Même écriture ; pas de `SELECT … INTO nouvelle` : `CREATE TABLE t AS SELECT …`"
    },
    noms: ["INSERT INTO SELECT", "SELECT INTO", "INSERT OVERWRITE", "CREATE TABLE AS SELECT"],
    exemple: "-- Une ligne de stock à 0 à Nantes pour les articles qui n'y sont pas\nINSERT INTO stock_depot (article_id, depot_id, qte)\nSELECT a.id, 3, 0\nFROM article AS a\nWHERE NOT EXISTS (SELECT 1 FROM stock_depot AS s\n                  WHERE s.article_id = a.id AND s.depot_id = 3);",
    resultat: "4 lignes ajoutées : CHL-25, FIL-14, POMP-1 et ROB-X ont maintenant une ligne à 0 à Nantes. Relancé, l'INSERT n'ajoute plus rien.",
    piege: "Relancé sans le `NOT EXISTS`, l'INSERT reprend les mêmes articles : SQL Server et MySQL refusent tout (clé primaire en double), et Snowflake, qui ne vérifie pas la clé primaire, crée des doublons sans rien dire. Écris tes INSERT … SELECT pour qu'ils puissent être relancés.",
    motsCles: ["copier", "recopier", "ajouter", "insérer", "archiver", "archive", "transférer", "alimenter", "charger", "remplir", "relancer", "select", "into", "overwrite", "dupliquer"],
    voirAussi: ["insert", "exists", "merge", "create-table", "primary-key"],
    module: "m09"
  },
  {
    id: "update",
    nom: "UPDATE",
    type: "mot-clé",
    categorie: "Modifier",
    definition: "Modifie la valeur de colonnes dans les lignes choisies par le WHERE ; sans WHERE, dans toutes les lignes.",
    moteurs: {
      sqlserver: "`UPDATE t SET col = … WHERE …` ; avec jointure : `UPDATE c SET … FROM commande AS c JOIN client AS cl ON …`",
      snowflake: "`UPDATE t SET … WHERE …` ; avec jointure : `UPDATE commande SET … FROM client WHERE client.id = commande.client_id`",
      mysql: "`UPDATE t SET … WHERE …` ; avec jointure : `UPDATE commande AS c JOIN client AS cl ON … SET …` (pas de `FROM`)"
    },
    noms: ["UPDATE FROM", "UPDATE JOIN", "SET"],
    exemple: "UPDATE commande\nSET statut = 'LIVREE'\nWHERE statut = 'EN_COURS';",
    resultat: "3 lignes modifiées : CDE-1005, CDE-1006 et CDE-1007 passent à LIVREE.",
    piege: "Sans `WHERE`, les 8 commandes passent à LIVREE, même l'annulée, sans aucun message d'alerte. Écris d'abord le `SELECT` avec le même `WHERE`, puis lance l'UPDATE dans une transaction (`BEGIN TRAN`, vérifier, puis `COMMIT`).",
    motsCles: ["modifier", "changer", "corriger", "mettre à jour", "maj", "remplacer", "statut", "valeur", "set", "update", "rectifier", "passer", "masse", "jointure"],
    voirAussi: ["where", "begin-transaction", "merge", "output", "delete", "rowcount"],
    module: "m09"
  },
  {
    id: "delete",
    nom: "DELETE",
    type: "mot-clé",
    categorie: "Modifier",
    definition: "Supprime les lignes choisies par le WHERE ; sans WHERE, toutes les lignes de la table.",
    moteurs: {
      sqlserver: "`DELETE FROM t WHERE …` ; avec jointure : `DELETE l FROM ligne_cde AS l JOIN commande AS c ON …`",
      snowflake: "`DELETE FROM t WHERE …` ; avec jointure : `DELETE FROM ligne_cde USING commande WHERE commande.id = ligne_cde.cde_id AND …`",
      mysql: "`DELETE FROM t WHERE …` ; avec jointure : comme SQL Server, `DELETE l FROM ligne_cde AS l JOIN commande AS c ON …`"
    },
    noms: ["DELETE FROM", "DELETE USING"],
    exemple: "-- Purge des flux EDI rejetés (déjà retraités)\nDELETE FROM flux_edi\nWHERE statut = 'REJET';",
    resultat: "2 lignes supprimées : le flux 3 (ORDERS, « EAN inconnu ») et le flux 6 (DESADV, « Quantité ≠ commande »).",
    piege: "Sans `WHERE`, `DELETE FROM flux_edi` vide toute la table, sans demander de confirmation. Écris d'abord `SELECT * FROM flux_edi WHERE …`, vérifie le nombre de lignes, puis remplace `SELECT *` par `DELETE`, dans une transaction.",
    motsCles: ["supprimer", "effacer", "enlever", "retirer", "purger", "purge", "nettoyer", "vider", "supprimer des lignes", "delete", "suppression", "détruire", "jointure", "using"],
    voirAussi: ["truncate", "where", "begin-transaction", "update", "foreign-key"],
    module: "m09"
  },
  {
    id: "truncate",
    nom: "TRUNCATE TABLE",
    type: "mot-clé",
    categorie: "Modifier",
    definition: "Vide toute une table d'un coup, très vite, en gardant la table et ses colonnes.",
    moteurs: {
      sqlserver: "`TRUNCATE TABLE t` ; pas de `WHERE` ; remet le compteur IDENTITY au départ ; annulable dans une transaction",
      snowflake: "`TRUNCATE TABLE t` ; efface aussi l'historique de chargement : `COPY INTO` pourra recharger les mêmes fichiers",
      mysql: "`TRUNCATE TABLE t` ; valide tout de suite (COMMIT implicite) : pas de `ROLLBACK` possible ; remet AUTO_INCREMENT au départ"
    },
    noms: ["TRUNCATE"],
    exemple: "-- Vider la table avant le chargement de la nuit\nTRUNCATE TABLE flux_edi;",
    resultat: "flux_edi est vide (0 ligne) ; la table et ses colonnes restent en place.",
    piege: "TRUNCATE est refusé sur une table qu'une clé étrangère référence, même si l'autre table est vide : `TRUNCATE TABLE commande` plante (SQL Server : erreur 4712 ; MySQL : erreur 1701). Réserve-le aux tables de chargement ; pour une table métier, écris `DELETE`.",
    motsCles: ["vider", "purger", "effacer", "tout", "rapide", "réinitialiser", "remettre", "zéro", "chargement", "staging", "truncate", "compteur", "identity"],
    voirAussi: ["delete", "drop-table", "copy-into", "identity", "foreign-key"],
    module: "m09"
  },
  {
    id: "merge",
    nom: "MERGE",
    type: "mot-clé",
    categorie: "Modifier",
    definition: "Synchronise une table avec une source en un seul ordre : met à jour ce qui existe, ajoute ce qui manque.",
    moteurs: {
      sqlserver: "`MERGE INTO cible USING source ON … WHEN MATCHED THEN UPDATE … WHEN NOT MATCHED THEN INSERT … ;` (le `;` final est obligatoire) ; en plus : `WHEN NOT MATCHED BY SOURCE`",
      snowflake: "`MERGE INTO … USING … ON …`, avec les mêmes `WHEN` ; pas de `BY SOURCE`",
      mysql: "Pas de MERGE : `INSERT … ON DUPLICATE KEY UPDATE`, sur une clé primaire ou unique ; une ligne modifiée y compte pour 2 dans le nombre de lignes"
    },
    noms: ["upsert", "ON DUPLICATE KEY UPDATE"],
    exemple: "MERGE INTO stock_depot\nUSING (SELECT 1 AS article_id, 1 AS depot_id, 55 AS qte\n       UNION ALL SELECT 5, 1, 10) AS src\n   ON stock_depot.article_id = src.article_id\n  AND stock_depot.depot_id = src.depot_id\nWHEN MATCHED THEN UPDATE SET qte = src.qte\nWHEN NOT MATCHED THEN INSERT (article_id, depot_id, qte)\n                      VALUES (src.article_id, src.depot_id, src.qte);",
    exemples: {
      mysql: "INSERT INTO stock_depot (article_id, depot_id, qte)\nVALUES (1, 1, 55), (5, 1, 10) AS src\nON DUPLICATE KEY UPDATE qte = src.qte;"
    },
    resultat: "Inventaire de Lyon : 1 ligne modifiée (CHL-5 : 60 → 55) et 1 ligne ajoutée (POMP-1 : 10).",
    piege: "Deux lignes source pour le même article et le même dépôt : SQL Server et Snowflake plantent (la même ligne cible serait modifiée deux fois), MySQL garde la dernière sans rien dire. Dédoublonne la source avant le MERGE (`GROUP BY` ou `ROW_NUMBER`).",
    motsCles: ["fusionner", "synchroniser", "upsert", "insérer", "mettre", "jour", "existe", "sinon", "ajouter", "merge", "matched", "duplicate", "synchroniser deux tables", "intégration", "flux"],
    voirAussi: ["insert", "update", "insert-select", "output", "row-number"],
    module: "m09"
  },
  {
    id: "output",
    nom: "OUTPUT",
    type: "mot-clé",
    categorie: "Modifier",
    definition: "Renvoie les lignes touchées par un INSERT, un UPDATE ou un DELETE, avec leurs valeurs avant et après.",
    moteurs: {
      sqlserver: "`OUTPUT deleted.col, inserted.col` (avant, après) ; `OUTPUT … INTO journal` pour les garder ; `$action` dans un MERGE",
      snowflake: "Pas d'équivalent direct : l'instruction rend seulement le nombre de lignes ; relis-les avec un `SELECT` (Time Travel pour l'état d'avant)",
      mysql: "Pas de OUTPUT ni de RETURNING : un `SELECT` avant ; l'id auto du dernier INSERT : `LAST_INSERT_ID()`"
    },
    noms: ["inserted", "deleted", "RETURNING", "OUTPUT INTO", "LAST_INSERT_ID", "$action"],
    exemple: "UPDATE commande\nSET statut = 'LIVREE'\nOUTPUT deleted.num_cde, deleted.statut AS avant, inserted.statut AS apres\nWHERE statut = 'EN_COURS';",
    exemples: {
      snowflake: "-- Pas d'OUTPUT : lire les lignes avant de les modifier\nSELECT num_cde, statut FROM commande WHERE statut = 'EN_COURS';\nUPDATE commande SET statut = 'LIVREE' WHERE statut = 'EN_COURS';",
      mysql: "-- Pas d'OUTPUT : lire les lignes avant de les modifier\nSELECT num_cde, statut FROM commande WHERE statut = 'EN_COURS';\nUPDATE commande SET statut = 'LIVREE' WHERE statut = 'EN_COURS';"
    },
    resultat: [["num_cde", "avant", "apres"], ["CDE-1005", "EN_COURS", "LIVREE"], ["CDE-1006", "EN_COURS", "LIVREE"], ["CDE-1007", "EN_COURS", "LIVREE"]],
    piege: "Sur une table qui a un trigger, `OUTPUT` sans `INTO` plante (erreur 334) : écris `OUTPUT … INTO` une table de journal. Et sur MySQL, après un INSERT de 3 lignes, `LAST_INSERT_ID()` donne l'id de la 1re ligne, pas de la dernière.",
    motsCles: ["récupérer", "retour", "renvoyer", "avant", "après", "journal", "tracer", "historique", "trace", "inserted", "deleted", "returning", "généré", "audit", "modifiées", "id"],
    voirAussi: ["update", "merge", "insert", "identity", "rowcount", "time-travel"],
    module: "m09"
  }
]);
