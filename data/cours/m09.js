// Parcours SQL — Cours complet du module m09 « Modifier les données », version 1 (12/11/2026).
// Écrit à partir de la fiche de révision (data/fiches/m09.js, l'ancien cours court) et des 100 « retenir » de
// data/m09-modifier.js. Squelette validé par l'élève (m02 v2) : Exemple (qui MONTRE le piège) → Résultat → « Ce qui se
// passe » → « Pourquoi » → « Le piège » → « Le bon réflexe » → « SQL Server / Snowflake » ou « Et aussi » → À retenir.
// Un exemple qui modifie montre la table APRÈS, ou le nombre de lignes touchées. Chaque vérification part d'une base
// fraîche (docs/base-exemple.sql rechargé) : la base d'exemple ne change pas pour les autres cours.
// Résultats vérifiés avec SQLite 3.45 (scratchpad cours-complets/m09 : verif.py, 53 contrôles, 0 écart ; rejouer.py rejoue
// les 4 tableaux affichés, 0 écart) : INSERT sans liste (6 valeurs pour 7 colonnes : erreur, rien inséré) puis avec liste
// (C008, C009, siren NULL) ; INSERT … SELECT range par position (nom et ville inversés, sans erreur) ; +10 % sur la chimie
// (43.89, 174.90, 26.95 ; 3 lignes ; sans WHERE : 8) ; CASE sans ELSE sur prix_tarif NOT NULL : erreur, rien de modifié ;
// SET a = b, b = a échange ; UPDATE … FROM avec CHL-5 en double (2 articles touchés ; CHL-5 à 41.50 ou 42.90 ; PH-5 à
// 25.90) ; DELETE des lignes des commandes annulées (1 ligne : n° 6, FIL-14, 549.00 ; la commande d'abord : refus de la clé
// étrangère ; sans contrôle des clés : 1 orpheline) ; USING sans le lien : 11 lignes ; purge des flux de mars (4 lignes, 1 à
// 4 ; restent 5 et 6) ; MERGE de l'inventaire de Lyon, calculé deux fois (UPDATE puis INSERT à la main ; INSERT … ON
// CONFLICT DO UPDATE) : (1, 1, 55), (5, 1, 10), les 14 autres lignes intactes ; BY SOURCE DELETE sans borne : 14 lignes
// (dont 8 à Toulouse et Nantes), limité au dépôt 1 : 6 ; OUTPUT (SELECT avant + RETURNING après) : CDE-1005, 1006, 1007
// de EN_COURS à LIVREE ; sous-requête dans le SET : C005 et C007 à NULL ; jointure interne : 5 clients touchés.
// À la main, deux fois (sans équivalent SQLite) : 39.90 × 1.10 = 43.8900, rangé en decimal(10,2) sans arrondi à faire ;
// @@ROWCOUNT = 4 < 1 000 ; numéros d'erreur SQL Server 213, 547 et 8672 (pages d'erreurs ci-dessous).
// Sources (lues le 12/11/2026). learn.microsoft.com/sql (sql-server-ver17) : t-sql/statements/insert-transact-sql (liste
// des colonnes, DEFAULT ou NULL ; INSERT … SELECT … ORDER BY : ordre des IDENTITY garanti, pas celui des lignes) ;
// t-sql/queries/table-value-constructor-transact-sql (1 000 lignes au plus dans INSERT … VALUES, erreur 10738) ;
// t-sql/queries/update-transact-sql (UPDATE alias SET … FROM … JOIN ; « results … are undefined » si plusieurs valeurs) ;
// t-sql/statements/delete-transact-sql (DELETE alias FROM … JOIN ; TOP sans ordre ; une ligne refusée annule tout) ;
// t-sql/statements/truncate-table-transact-sql (refusé si une clé étrangère référence la table ; IDENTITY remis à la
// graine ; annulable dans une transaction ; pas de trigger) ; t-sql/statements/merge-transact-sql (`;` obligatoire, erreur
// 10713 ; plusieurs lignes source pour une ligne cible : erreur ; NOT MATCHED BY SOURCE ; HOLDLOCK ; pas de constante sur
// la cible dans le ON, filtrer dans le WHEN ; @@ROWCOUNT = total ; OUTPUT $action) ; relational-databases/errors-events
// 0 à 999 (213, 515, 547) et 8000 à 8999 (8672) ; t-sql/queries/output-clause-transact-sql (inserted / deleted ; ordre
// non garanti ; sans INTO, aucun trigger actif sur la cible ; table d'OUTPUT INTO sans trigger, clé étrangère ni CHECK) ;
// t-sql/functions/scope-identity-transact-sql, identity-transact-sql, rowcount-transact-sql ; t-sql/statements/
// create-table-transact-sql-identity-property (trous) ; t-sql/functions/update-trigger-functions-transact-sql (trigger
// lancé même si la valeur ne change pas) ; troubleshoot/sql/…/resolve-blocking-problems-caused-lock-escalation et
// relational-databases/sql-server-transaction-locking-and-row-versioning-guide (escalade à 5 000 verrous ; DELETE TOP en
// boucle). docs.snowflake.com, pages lues avec curl (« .md ») : sql-reference/sql/insert (OVERWRITE ; VALUES : 200 000
// lignes) ; sql/insert-multi-table ; sql/update (UPDATE … SET … FROM … WHERE ; pas de nom de table devant la colonne du
// SET ; ERROR_ON_NONDETERMINISTIC_UPDATE = FALSE par défaut : une ligne au hasard) ; sql/delete (USING ; l'historique de
// chargement reste) ; sql/truncate-table (efface l'historique de chargement) ; sql/merge (WHEN MATCHED / NOT MATCHED, pas
// de BY SOURCE ; doublon : erreur si ERROR_ON_NONDETERMINISTIC_MERGE = TRUE, le défaut, sinon une ligne non définie ;
// rend des comptes) ; sql-reference/parameters (défauts de ces deux paramètres ; AUTOCOMMIT) ; constructs/at-before
// (BEFORE (STATEMENT => LAST_QUERY_ID())) ; constructs/changes ; constructs/values (alias des colonnes) ; transactions
// (verrous des DML) ; migrations/snowconvert-docs/translation-references/transact/transact-dmls (alias sur la cible d'un
// UPDATE ou d'un DELETE ; OUTPUT et TOP non pris en charge).
// Faits déjà vérifiés (consignes, nov. 2026) : Snowflake ne vérifie ni PRIMARY KEY, ni UNIQUE, ni FOREIGN KEY ; grosses
// purges : lots de moins de 5 000 lignes (DELETE TOP (1000)).
// Couverture des 100 « retenir » : scratchpad cours-complets/m09/couverture.txt. Notions testées par une seule question,
// laissées à leur explication (règle 6 du plan) : DEFAULT dans VALUES (q07), IDENTITY_INSERT (q08), « would be truncated »
// (q11), INSERT … EXEC (q13), TRUNCATE et ROLLBACK (q37), vue sur deux tables (q65), colonne calculée (q66), rowversion
// (q67), DEFAULT VALUES (q68), violation de clé primaire (q69), IGNORE_DUP_KEY (q70), « quirky update » (q72), ON UPDATE
// CASCADE (q73), dédoublonnage par EXISTS (q74), SEQUENCE (q90), = NULL (q94), dates AAAAMMJJ (q95) ; transactions et
// verrous (autocommit q58, XACT_ABORT q60, transaction ouverte q61, UPDLOCK q86, verrouillage optimiste q87) : module m11.
// Relecture testeur (12/11/2026, scratchpad cours-complets/relecture-m09) : résultats recalculés à part (40 contrôles
// SQLite, 0 écart) ; 6 corrections (changements.txt) : « partenaire » -> « tarif » (S3), « oublie le lien » -> « sans le
// lien » (S4), Snowflake sans verrou par ligne (S5, sources sql-reference/transactions et user-guide/tables-hybrid),
// « ancien statut » (S7), « (SQL Server) » sur l'ordre des numéros (user-guide/querying-sequences) et sur la sous-requête
// corrélée du SET (user-guide/querying-subqueries) dans Détails utiles.
LEARNSQL.cours.m09 = {
  intro: "Cette nuit, le flux EDI des tarifs a mis à jour les articles de Divalto : sais-tu combien, et avec quel prix ? `INSERT`, `UPDATE`, `DELETE` et `MERGE` écrivent dans la base. Une erreur ici abîme les données, souvent sans message. Ce module montre les pièges vus en entreprise (WHERE oublié, tarif en double, purge qui bloque l'ERP) et le réflexe qui les évite : vérifier avant d'écrire.",
  sections: [
    {
      titre: "INSERT : nommer les colonnes, toujours",
      exemple: "-- Piège : sans liste, 6 valeurs pour 7 colonnes : erreur 213\nINSERT INTO dbo.client VALUES (8, 'C008', 'Spa Azur', 'Toulon', 'FR', 'PRO');\n\n-- Juste : la liste des colonnes\nINSERT INTO dbo.client (id, code, nom, ville, pays, type)\nVALUES (8, 'C008', 'Spa Azur', 'Toulon', 'FR', 'PRO'),\n       (9, 'C009', 'Piscinas Lopez', NULL, 'ES', 'PRO');",
      resultat: [["code", "nom", "ville", "pays", "siren"], ["C008", "Spa Azur", "Toulon", "FR", null], ["C009", "Piscinas Lopez", null, "ES", null]],
      points: [
        "Ce qui se passe : la 1re requête plante sans rien insérer : il manque le siren. La 2e crée les 2 clients ; le siren, absent de la liste, vaut NULL (une case vide).",
        "Pourquoi : sans liste, le moteur range les valeurs dans l'ordre des colonnes de la table. Avec la liste, chaque valeur va dans la colonne nommée ; une colonne absente prend sa valeur par défaut (`DEFAULT`), sinon NULL.",
        "Le piège : l'INSERT sans liste, ou `INSERT … SELECT *`, qui marche depuis des années. Une colonne s'ajoute : il plante. Deux colonnes du même type inversées : il les remplit à l'envers, sans erreur.",
        "Le bon réflexe : la liste, toujours, aussi dans `INSERT … SELECT` (insérer le résultat d'une requête), qui range par position, pas par nom, comme `UNION` (m07). Une colonne NOT NULL (obligatoire) sans DEFAULT doit y être.",
        "SQL Server / Snowflake : même écriture. `INSERT … VALUES` : 1 000 lignes au plus sur SQL Server, 200 000 sur Snowflake. Au-delà, charge un fichier : `BULK INSERT`, ou `COPY INTO` sur Snowflake."
      ],
      retenir: "INSERT : toujours la liste des colonnes. Absente, une colonne prend son DEFAULT, sinon NULL ; INSERT … SELECT range par position."
    },
    {
      titre: "UPDATE et DELETE : le SELECT d'abord",
      exemple: "-- 1. Le SELECT : quelles lignes ? combien ?\nSELECT code, prix_tarif, prix_tarif * 1.10 AS nouveau\nFROM dbo.article\nWHERE famille = 'CHIMIE';\n-- 2. Le même WHERE sous l'UPDATE : 3 lignes attendues\nUPDATE dbo.article\nSET prix_tarif = prix_tarif * 1.10\nWHERE famille = 'CHIMIE';\n-- Piège : sans WHERE, les 8 articles prennent +10 %",
      resultat: [["code", "prix_tarif"], ["CHL-5", "43.89"], ["CHL-25", "174.90"], ["PH-5", "26.95"]],
      points: [
        "Ce qui se passe : le SELECT montre les 3 articles de chimie et leur futur prix. L'UPDATE, avec le même WHERE, en modifie 3 : le compte attendu. Le tableau les montre après.",
        "Pourquoi : `UPDATE` et `DELETE` touchent toutes les lignes que garde le WHERE. Sans WHERE, toute la table, sans erreur ni question. Et 0 ligne touchée n'est pas une erreur non plus : à toi de compter.",
        "Le piège : le WHERE oublié, ou laissé hors de la sélection. Tu surlignes `UPDATE … SET` sans la ligne du WHERE, F5 : SSMS n'exécute que le texte surligné, et les 8 articles prennent +10 %.",
        "Le bon réflexe : écris le SELECT, compte, puis garde le même WHERE sous l'UPDATE. En production, ouvre une transaction (un bloc validé par COMMIT ou annulé par ROLLBACK : m11) et lis `@@ROWCOUNT` (les lignes touchées) juste après.",
        "Et aussi : le SET calcule tout avec les valeurs d'avant (`SET a = b, b = a` échange). Un CASE sans ELSE met NULL aux lignes oubliées : prix effacés, ou erreur sur une colonne NOT NULL comme `prix_tarif`."
      ],
      retenir: "Le SELECT d'abord, le même WHERE ensuite, le nombre de lignes contrôlé. Sans WHERE, UPDATE et DELETE touchent toute la table."
    },
    {
      titre: "UPDATE avec une jointure : une source unique",
      exemple: "-- Tarif EDI reçu : CHL-5 y est deux fois\nUPDATE a\nSET a.prix_tarif = t.prix\nFROM dbo.article AS a\nJOIN (VALUES ('CHL-5', 41.50), ('CHL-5', 42.90), ('PH-5', 25.90))\n     AS t(code, prix) ON t.code = a.code;\n-- Snowflake : UPDATE VENTES.ARTICLE a SET prix_tarif = t.prix\n--   FROM (VALUES …) AS t(code, prix) WHERE t.code = a.code;",
      resultat: "Aucune erreur. PH-5 passe à 25.90 ; CHL-5 prend 41.50 ou 42.90, au hasard.",
      points: [
        "Ce qui se passe : pas d'erreur, pas d'alerte. CHL-5 trouve deux lignes de tarif et en garde une : laquelle, personne ne le sait, et cela peut changer d'une exécution à l'autre.",
        "Pourquoi : `UPDATE a … FROM … JOIN` modifie chaque article qui trouve un tarif, et seulement eux. Un article ne prend qu'une valeur : face à deux lignes, le moteur en garde une, sans prévenir (« résultat indéfini », dit Microsoft).",
        "Le piège : un tarif en double dans le fichier, et le prix de vente devient une loterie. Rien ne plante : on le découvre sur une facture contestée.",
        "Le bon réflexe : avant l'UPDATE, `SELECT code … GROUP BY code HAVING COUNT(*) > 1` doit rendre 0 ligne. Sinon, garde une ligne par code (la plus récente : ROW_NUMBER, m06). Un total à recopier : agrège d'abord, puis joins.",
        "SQL Server / Snowflake : Snowflake met le lien dans le WHERE, sans alias devant la colonne du SET. Un doublon n'y plante pas non plus, sauf si le paramètre `ERROR_ON_NONDETERMINISTIC_UPDATE` vaut TRUE."
      ],
      retenir: "UPDATE avec jointure : une seule ligne source par ligne cible, sinon une valeur au hasard, sans erreur. Contrôle les doublons avant."
    },
    {
      titre: "DELETE : la jointure et les clés étrangères",
      exemple: "-- Supprimer les lignes (ligne_cde) des commandes annulées : CDE-1004\nDELETE l\nFROM dbo.ligne_cde AS l\nJOIN dbo.commande AS c ON c.id = l.cde_id\nWHERE c.statut = 'ANNULEE';\n-- Snowflake : DELETE FROM VENTES.LIGNE_CDE l USING VENTES.COMMANDE c\n--   WHERE c.id = l.cde_id AND c.statut = 'ANNULEE';\n-- Piège : supprimer d'abord la commande : erreur 547",
      resultat: "1 ligne supprimée : la n° 6 de ligne_cde (1 filtre FIL-14, 549.00). CDE-1004 reste, sans ligne.",
      points: [
        "Ce qui se passe : la seule ligne de `ligne_cde` liée à CDE-1004 part. `DELETE l` dit quelle table perd des lignes : celle de l'alias `l`. La jointure choisit seulement lesquelles.",
        "Pourquoi : `ligne_cde.cde_id` est une clé étrangère (une colonne qui pointe vers une commande). Tant qu'une ligne de `ligne_cde` pointe vers CDE-1004, SQL Server refuse de supprimer la commande : erreur 547. Les enfants d'abord, puis le parent.",
        "Le piège : `ON DELETE CASCADE` sur la clé : supprimer un client efface toutes ses commandes, sans prévenir. Et Snowflake ne vérifie pas les clés étrangères : le DELETE du parent passe, et laisse des lignes orphelines (sans parent).",
        "Le bon réflexe : dans un ERP, désactive plutôt que supprimer (`actif = 0`, la suppression logique) : l'historique reste ; une vue filtre `actif = 1` pour les rapports. Orphelines à purger : `NOT EXISTS` vers le parent (m06).",
        "SQL Server / Snowflake : avec `USING`, sans le lien `c.id = l.cde_id`, toute la table part dès qu'une commande est annulée. Sur SQL Server, une clé étrangère sans index ralentit le DELETE du parent."
      ],
      retenir: "DELETE alias FROM … JOIN (SQL Server), DELETE … USING (Snowflake). Les enfants avant le parent ; dans un ERP, désactive."
    },
    {
      titre: "Vider ou purger : TRUNCATE, ou DELETE par lots",
      exemple: "-- Purge des flux de mars, par lots de 1 000 lignes\nWHILE 1 = 1\nBEGIN\n  DELETE TOP (1000) FROM dbo.flux_edi\n  WHERE date_recu < '20260401';\n  IF @@ROWCOUNT < 1000 BREAK;   -- dernier lot : on sort\nEND;",
      resultat: "1 tour : 4 flux supprimés (1 à 4, de mars). @@ROWCOUNT vaut 4, moins que 1 000 : la boucle s'arrête.",
      points: [
        "Ce qui se passe : ici, un tour suffit. Sur 500 000 lignes, ce serait 500 petits DELETE ; une pause entre deux (`WAITFOR DELAY '00:00:01'`) laisse travailler l'ERP.",
        "Pourquoi : SQL Server pose un verrou (un « occupé ») sur chaque ligne supprimée. Au-delà de 5 000 verrous sur une table, il les remplace par un seul, sur toute la table : l'escalade. Un lot de 1 000 reste dessous.",
        "Le piège : un seul DELETE de 500 000 lignes en journée : table bloquée, journal (où SQL Server note chaque modification) qui gonfle. Un UPDATE par lots doit exclure ce qui est fait (`WHERE statut <> 'X'`), sinon il tourne sans fin.",
        "Le bon réflexe : pour vider une table de chargement, `TRUNCATE TABLE` : très rapide, et la table reste (`DROP` la détruit). Le compteur IDENTITY (la numérotation automatique) repart au départ. Refusé si une clé étrangère pointe vers elle, même si la table fille est vide.",
        "SQL Server / Snowflake : Snowflake n'a pas de TOP dans un DELETE, ni de verrou par ligne : pas d'escalade, un seul DELETE. Son TRUNCATE efface aussi l'historique de chargement : `COPY INTO` rechargera les mêmes fichiers ; après un DELETE, non."
      ],
      retenir: "Grosse purge : lots de moins de 5 000 lignes. Tout vider : TRUNCATE, refusé si une clé étrangère pointe vers la table."
    },
    {
      titre: "MERGE : synchroniser une table avec une source",
      exemple: "-- Inventaire de Lyon : CHL-5 compté 55, POMP-1 trouvée : 10\nMERGE INTO dbo.stock_depot AS s\nUSING (VALUES (1, 1, 55), (5, 1, 10)) AS inv(article_id, depot_id, qte)\n   ON s.article_id = inv.article_id AND s.depot_id = inv.depot_id\nWHEN MATCHED AND s.qte <> inv.qte THEN\n     UPDATE SET qte = inv.qte\nWHEN NOT MATCHED THEN\n     INSERT (article_id, depot_id, qte) VALUES (inv.article_id, inv.depot_id, inv.qte);\n-- Piège : CHL-5 deux fois dans la source : erreur 8672",
      resultat: [["article_id", "depot_id", "qte"], [1, 1, 55], [5, 1, 10]],
      points: [
        "Ce qui se passe : CHL-5 existe à Lyon, avec une autre quantité : 60 devient 55. POMP-1 n'y est pas : une ligne est créée. Les 14 autres stocks ne bougent pas.",
        "Pourquoi : MERGE joint la source (l'inventaire) à la cible (la table) par le ON. Trouvé des deux côtés : `WHEN MATCHED`, mise à jour. Seulement dans la source : `WHEN NOT MATCHED`, insertion. C'est l'« upsert », en une instruction.",
        "Le piège : une ligne source en double, CHL-5 compté deux fois. SQL Server refuse tout le MERGE : erreur 8672. Snowflake aussi, par défaut ; avec `ERROR_ON_NONDETERMINISTIC_MERGE = FALSE`, il prend une des deux lignes, au hasard.",
        "Le bon réflexe : dédoublonne la source avant (GROUP BY, ou ROW_NUMBER = 1), et écarte les clés NULL : elles ne trouvent jamais la cible et s'insèrent à chaque passage. Sur SQL Server, le `;` final est obligatoire.",
        "SQL Server / Snowflake : `WHEN NOT MATCHED BY SOURCE THEN DELETE` (SQL Server seul) efface ce qui manque dans la source : ici 14 stocks, Toulouse et Nantes compris ! Seulement avec une source complète, et limité au dépôt (`AND s.depot_id = 1`). Snowflake : DELETE à part."
      ],
      retenir: "MERGE : MATCHED = existe, NOT MATCHED = nouveau. Une seule ligne source par clé ; BY SOURCE DELETE seulement avec une source complète."
    },
    {
      titre: "OUTPUT : voir ce qui a changé",
      exemple: "-- Commandes en cours livrées : la trace avant / après\nUPDATE dbo.commande\nSET statut = 'LIVREE'\nOUTPUT deleted.num_cde, deleted.statut AS avant, inserted.statut AS apres\nWHERE statut = 'EN_COURS';\n-- Snowflake : pas d'OUTPUT ; l'UPDATE rend « number of rows updated : 3 »",
      resultat: [["num_cde", "avant", "apres"], ["CDE-1005", "EN_COURS", "LIVREE"], ["CDE-1006", "EN_COURS", "LIVREE"], ["CDE-1007", "EN_COURS", "LIVREE"]],
      points: [
        "Ce qui se passe : une ligne par commande modifiée, avec son statut d'avant et d'après : les 3 commandes en cours passent à LIVREE. L'ordre des lignes rendues n'est pas garanti.",
        "Pourquoi : pendant l'instruction, SQL Server tient deux tables cachées : `deleted` (les lignes avant) et `inserted` (après). Un INSERT n'a que `inserted`, un DELETE que `deleted`, un UPDATE les deux. Un trigger (code lancé à chaque modification) lit les mêmes.",
        "Le piège : tracer après coup : l'UPDATE, puis un INSERT dans une table d'historique qui relit la table. L'ancien statut est déjà perdu. Et un trigger, lancé une fois pour 50 lignes, qui lit une seule ligne d'`inserted` en rate 49.",
        "Le bon réflexe : `OUTPUT … INTO historique` garde la trace dans la même instruction (`INTO` obligatoire si la table a un trigger). `DELETE … OUTPUT deleted.* INTO archive` archive et purge d'un coup. Dans un MERGE, `OUTPUT $action` dit, pour chaque ligne, INSERT, UPDATE ou DELETE.",
        "SQL Server / Snowflake : sur Snowflake, sans OUTPUT, l'avant se lit par un SELECT avant, ou par Time Travel (relire la table dans le passé) : `FROM commande BEFORE (STATEMENT => LAST_QUERY_ID())`, la table juste avant ta dernière requête."
      ],
      retenir: "OUTPUT : deleted = avant, inserted = après, dans la même instruction. Snowflake rend des comptes ; l'avant se relit par Time Travel."
    },
    {
      titre: "Détails utiles",
      points: [
        "L'id créé : `SCOPE_IDENTITY()`, pas `@@IDENTITY` (faussé par un trigger) ; pour 200 lignes, `OUTPUT inserted.id`. IDENTITY a des trous : jamais pour numéroter des factures. `INSERT … SELECT … ORDER BY` fixe l'ordre des numéros (SQL Server), pas celui de la relecture (m01).",
        "Ne réécris que ce qui change : une valeur identique entre quand même dans `@@ROWCOUNT` et déclenche les triggers. `WHERE c.ville IS DISTINCT FROM s.ville` compte NULL comme une valeur (SQL Server 2022, Snowflake) ; `<>` rate le passage de NULL à Lyon.",
        "`SET derniere_cde = (SELECT MAX(…) …)` met NULL aux clients sans commande (SQL Server) ; une jointure interne ne les touche pas.",
        "Upsert sans MERGE : UPDATE des lignes existantes, puis `INSERT … WHERE NOT EXISTS`, dans une transaction : relançable sans doublon (idempotent). Deux sessions, même clé : `MERGE … WITH (HOLDLOCK)`, qui garde le verrou jusqu'au bout.",
        "Flux EDI de la nuit : table de chargement, contrôles (formats, doublons, références), rejets tracés avec leur motif, puis MERGE. Une table des fichiers déjà chargés évite de charger deux fois le même.",
        "Snowflake : `INSERT OVERWRITE` vide puis remplit d'un coup ; `INSERT ALL` ou `FIRST` remplit plusieurs tables en une lecture. Écris par lots ; un UPDATE réécrit chaque micro-partition (bloc de stockage) touchée."
      ],
      retenir: "Avant une correction en masse : la bonne base, un script relu, une copie datée (`SELECT * INTO`, ou `CLONE` sur Snowflake), une transaction, le compte contrôlé."
    }
  ],
  differences: [
    ["UPDATE avec jointure", "`UPDATE a … FROM … JOIN`", "`UPDATE … FROM … WHERE`"],
    ["DELETE avec jointure", "`DELETE a FROM … JOIN`", "`DELETE … USING`"],
    ["Doublon dans un MERGE", "Erreur 8672", "Erreur par défaut"],
    ["`MERGE … BY SOURCE`", "Oui", "Non : DELETE à part"],
    ["Voir avant / après", "`OUTPUT deleted / inserted`", "Time Travel `BEFORE`"],
    ["Grosse purge", "Lots `DELETE TOP (n)`", "Un seul `DELETE`"],
    ["Clé étrangère au DELETE", "Vérifiée", "Non vérifiée (table standard)"],
    ["Lignes par `INSERT … VALUES`", "1 000", "200 000"],
    ["Vider puis remplir", "`TRUNCATE` + `INSERT`", "`INSERT OVERWRITE`"],
    ["Erreur déjà validée", "Sauvegarde ou copie datée", "Time Travel"]
  ]
};
