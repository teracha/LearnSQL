// Parcours SQL — Cours complet du module m07 « Opérateurs ensemblistes », version 1 (12/11/2026).
// Écrit à partir de la fiche de révision data/fiches/m07.js (l'ancien cours court), au format de docs/plan-sql.md.
// Squelette des modèles m01, m02, m03 : Exemple (qui MONTRE le piège quand il y en a un) → Résultat → « Ce qui se
// passe » → « Pourquoi » → « Le piège » → « Le bon réflexe » → « SQL Server / Snowflake » ou « Et aussi » → À retenir.
// Résultats recalculés avec SQLite sur docs/base-exemple.sql (TOP vérifié avec LIMIT ; parenthèses autour d'un SELECT
// composé remplacées par une sous-requête ; scripts scratchpad cours-complets/m07/verif.py et verif2.py) : pièces
// d'AquaBleu (5 lignes) ; CA facturé + en cours par client (UNION : client 2 à 1290.00 ; UNION ALL : 2580.00) ; nom et
// ville inversés (2 lignes) ; top 2 par statut (4 lignes) ; Lyon EXCEPT Nantes (2, 4, 6), INTERSECT (1, 3, 7, 8), l'autre
// sens (0 ligne), avec qte (plus rien de commun), A INTERSECT A sur stock_depot (7 articles) ; NOT IN (0 ligne) et EXCEPT
// (2, 4, 5, 6, 8) ; client comparé à lui-même (jointure : C007 ; EXCEPT : 0 ligne) ; rapprochement commandes / factures
// dans les deux sens (4 lignes ; sans les parenthèses : 0 ligne).
// Couverture : les 60 « retenir » du module (60 questions : module volontairement limité, voir data/m07-ensemblistes.js).
// Sources (vérifiées le 12/11/2026) : learn.microsoft.com/sql/t-sql : language-elements/set-operators-union-transact-sql
// (même nombre et même ordre de colonnes, types compatibles, type du résultat par priorité des types et par longueur, INTO
// dans la 1re requête, ORDER BY seulement à la fin), language-elements/set-operators-except-and-intersect-transact-sql
// (lignes distinctes, deux NULL égaux, noms de la requête de gauche, collations, priorité : parenthèses, puis INTERSECT,
// puis EXCEPT et UNION de gauche à droite ; pas de ALL), queries/select-order-by-clause-transact-sql (ORDER BY à la fin ;
// OFFSET / FETCH seulement sur la requête finale), queries/top-transact-sql (TOP + UNION ALL : le TOP passe avant le tri
// final ; recette des tables dérivées), statements/create-view-transact-sql (vues partitionnées : CHECK actifs et fiables).
// docs.snowflake.com (non joignable depuis la session : extraits de recherche) : sql-reference/operators-query (MINUS =
// EXCEPT ; INTERSECT d'abord, puis gauche à droite ; UNION [ALL] BY NAME ; ORDER BY et LIMIT sur le résultat ; VARCHAR face
// à un nombre : erreur 100038), constructs/limit (ORDER BY d'une sous-requête), constructs/with (CTE récursive : UNION ALL,
// liste des colonnes obligatoire), functions/hash ; guides SnowConvert (ni INTERSECT ALL ni MINUS ALL).
// Notions rares testées par une seule question : « Détails utiles » ou explication de la question (règle 6).
LEARNSQL.cours.m07 = {
  intro: "Après la reprise des clients dans Snowflake, on te demande : « Les deux tables sont-elles identiques ? » Quelle requête écris-tu ? Les opérateurs ensemblistes travaillent sur des résultats entiers : `UNION ALL` les empile, `INTERSECT` garde le commun, `EXCEPT` garde le manquant. Ce module donne leurs règles, et deux erreurs vues en entreprise : un `UNION` qui fusionne de vraies ventes et fait baisser le CA, et un contrôle fait dans un seul sens qui annonce « 0 écart » à tort.",
  sections: [
    {
      titre: "UNION ALL : empiler deux résultats",
      exemple: "-- Toutes les pièces d'AquaBleu (client 1) : commandes et factures, par date\nSELECT 'Commande' AS piece, num_cde AS numero, date_cde AS date_piece, montant_ht\nFROM dbo.commande\nWHERE client_id = 1\nUNION ALL\nSELECT 'Facture', f.num_fact, f.date_fact, f.montant_ht\nFROM dbo.facture AS f JOIN dbo.commande AS c ON c.id = f.cde_id\nWHERE c.client_id = 1\nORDER BY date_piece;",
      resultat: [["piece", "numero", "date_piece", "montant_ht"], ["Commande", "CDE-1001", "2026-03-02", "4780.00"], ["Facture", "FA-2026-0301", "2026-03-03", "4780.00"], ["Commande", "CDE-1003", "2026-03-09", "2385.00"], ["Facture", "FA-2026-0303", "2026-03-10", "2385.00"], ["Commande", "CDE-1007", "2026-04-07", "7950.00"]],
      points: [
        "Ce qui se passe : 5 lignes, les 3 commandes d'AquaBleu et ses 2 factures, rangées dans les mêmes colonnes et triées par date. La colonne `piece` est une constante (le même texte sur chaque ligne d'une partie) : elle dit d'où vient la ligne.",
        "Pourquoi : `UNION ALL` pose les lignes de la 2e requête sous celles de la 1re, sans rien retirer. Les noms du résultat (`numero`, `date_piece`) viennent de la 1re requête : les alias de la 2e sont ignorés.",
        "Le piège : empiler les clients de deux sociétés (deux dossiers Divalto) sans colonne source. Le même code client existe des deux côtés : impossible de savoir qui est qui, et le rapport Power BI additionne deux clients différents.",
        "Le bon réflexe : une constante par partie (`'Commande'` et `'Facture'`, ou `'SOC1'` et `'SOC2'`). C'est la base d'une vue qui réunit une table et son archive (`commande` + `commande_archive`), ou les sociétés d'un groupe.",
        "Et aussi : un seul `ORDER BY`, tout à la fin. Il trie toutes les lignes, avec les noms de la 1re requête (section 4)."
      ],
      retenir: "UNION ALL empile tout, sans rien retirer. Une colonne constante par partie dit d'où vient chaque ligne."
    },
    {
      titre: "UNION : les doublons disparaissent, même les vrais",
      exemple: "-- Voulu : CA facturé + commandes en cours, par client\nSELECT client_id, SUM(montant_ht) AS total\nFROM (SELECT c.client_id, f.montant_ht\n      FROM dbo.facture AS f JOIN dbo.commande AS c ON c.id = f.cde_id\n      UNION                 -- piège : il fallait UNION ALL\n      SELECT client_id, montant_ht\n      FROM dbo.commande WHERE statut = 'EN_COURS') AS t\nGROUP BY client_id\nORDER BY client_id;",
      resultat: [["client_id", "total"], [1, "15115.00"], [2, "1290.00"], [4, "318.00"], [6, "79.80"]],
      points: [
        "Ce qui se passe : Piscines Dumont (client 2) totalise 1 290 €, au lieu de 2 580 €. Sa facture FA-2026-0302 et sa commande en cours CDE-1006 donnent la même ligne : client 2, 1 290 €. `UNION` n'en a gardé qu'une.",
        "Pourquoi : `UNION` = `UNION ALL` + `DISTINCT`. Il compare des lignes entières et retire tous les doublons, même ceux d'une seule partie. Pour les trouver, il doit comparer toutes les lignes (un tri ou un hachage) : du travail en plus.",
        "Le piège : sur des faits (ventes, factures, mouvements de stock), deux lignes identiques peuvent être vraies. `UNION` les fusionne sans erreur, et le CA baisse. Un `DISTINCT` dans chaque partie ne sert à rien : `UNION` dédoublonne déjà.",
        "Le bon réflexe : `UNION ALL` par défaut ; ici, il donne bien 2 580 €. `UNION` seulement pour une liste de valeurs uniques, par exemple les codes clients connus de l'ERP ou de l'EDI.",
        "Et aussi : CA net = factures moins avoirs. Empile les avoirs avec le signe moins (`SELECT client_id, -montant FROM avoir`), puis fais un seul `GROUP BY`. Une jointure facture-avoir multiplierait les lignes, et les sommes (m05)."
      ],
      retenir: "UNION ALL par défaut. UNION fusionne aussi les vraies lignes égales : garde-le pour les listes de valeurs uniques."
    },
    {
      titre: "Les colonnes : par position, jamais par nom",
      exemple: "-- La 2e partie, copiée d'une autre requête, a nom et ville inversés\nSELECT nom, ville FROM dbo.client WHERE type = 'GD'\nUNION ALL\nSELECT ville, nom FROM dbo.client WHERE pays = 'CH'\nORDER BY nom;",
      resultat: [["nom", "ville"], ["AquaBleu", "Lyon"], ["Genève", "Pool & Garden"]],
      points: [
        "Ce qui se passe : « Genève » arrive dans la colonne `nom`, et « Pool & Garden » dans `ville`. Aucune erreur : les deux colonnes sont du texte, et le moteur ne regarde pas leurs noms.",
        "Pourquoi : une union associe les colonnes par position, la 1re avec la 1re, la 2e avec la 2e. Il faut le même nombre de colonnes et des types compatibles. Le résultat prend le type le plus large : `VARCHAR(5)` et `VARCHAR(50)` donnent `VARCHAR(50)` ; `INT` et `DECIMAL`, `DECIMAL`.",
        "Le piège : `SELECT *` dans une vue `UNION ALL`. Le jour où une table gagne une colonne, la vue plante (nombre de colonnes différent) ou décale tout. Et un texte face à un nombre plante : `SELECT 1 UNION ALL SELECT 'A'` veut lire 'A' comme un nombre.",
        "Le bon réflexe : liste les colonnes, dans le même ordre et du même type, dans chaque partie. Colonne absente d'un côté : `NULL AS libelle`. Type à aligner : `CAST(id AS varchar(10))`. `INTERSECT` et `EXCEPT` suivent les mêmes règles.",
        "SQL Server / Snowflake : entre deux bases SQL Server de collations différentes (la règle de comparaison des textes, m02), l'union plante sur un « collation conflict » : ajoute `COLLATE` sur la colonne. Snowflake sait associer par nom : `UNION ALL BY NAME`."
      ],
      retenir: "Les colonnes s'associent par position : même nombre, même ordre, types compatibles. Jamais de SELECT * dans une union."
    },
    {
      titre: "ORDER BY et TOP : un seul tri, à la fin",
      exemple: "-- Piège : SELECT TOP (2) … UNION ALL SELECT TOP (2) … ORDER BY … : 2 lignes quelconques par partie\n-- Juste : les 2 plus grosses commandes livrées + les 2 plus grosses en cours\nSELECT num_cde, statut, montant_ht\nFROM (SELECT TOP (2) num_cde, statut, montant_ht FROM dbo.commande\n      WHERE statut = 'LIVREE' ORDER BY montant_ht DESC) AS l\nUNION ALL\nSELECT num_cde, statut, montant_ht\nFROM (SELECT TOP (2) num_cde, statut, montant_ht FROM dbo.commande\n      WHERE statut = 'EN_COURS' ORDER BY montant_ht DESC) AS e\nORDER BY montant_ht DESC;",
      resultat: [["num_cde", "statut", "montant_ht"], ["CDE-1007", "EN_COURS", "7950.00"], ["CDE-1001", "LIVREE", "4780.00"], ["CDE-1003", "LIVREE", "2385.00"], ["CDE-1006", "EN_COURS", "1290.00"]],
      points: [
        "Ce qui se passe : les 2 plus grosses commandes de chaque statut, puis un seul tri sur les 4 lignes. Chaque `TOP` est enfermé dans une table dérivée (une requête dans le `FROM`, nommée ici `l` ou `e`), avec son propre `ORDER BY`.",
        "Pourquoi : dans une union, `ORDER BY` trie le résultat complet. Il vient une seule fois, après la dernière partie, avec les noms de la 1re. Placé avant `UNION ALL` : erreur de syntaxe. Et sans lui, rien ne garantit que A sort avant B.",
        "Le piège : `TOP (2)` écrit directement dans chaque partie, avec l'`ORDER BY` à la fin. Pas d'erreur, mais chaque `TOP` passe avant le tri final : il prend 2 commandes quelconques. Même surprise avec `WHERE` : il ne filtre que sa partie.",
        "Le bon réflexe : une table dérivée par `TOP`. Un filtre commun : un `WHERE` dans chaque partie, ou un seul autour (`WITH u AS (…) SELECT … FROM u WHERE …`). A avant B : une colonne `1 AS ordre` dans A, `2` dans B, puis `ORDER BY ordre`.",
        "SQL Server / Snowflake : pour limiter tout le résultat, SQL Server écrit `OFFSET 0 ROWS FETCH NEXT 3 ROWS ONLY` après l'`ORDER BY` final, Snowflake écrit `LIMIT 3`. Un top par partie : la même sous-requête, avec `LIMIT` sur Snowflake."
      ],
      retenir: "Un seul ORDER BY, à la fin, avec les noms de la 1re partie. Un TOP par partie : une table dérivée chacune."
    },
    {
      titre: "INTERSECT et EXCEPT : le commun et le manquant",
      exemple: "-- Réassort : les articles stockés à Lyon (dépôt 1), absents de Nantes (dépôt 3)\nSELECT article_id FROM dbo.stock_depot WHERE depot_id = 1\nEXCEPT\nSELECT article_id FROM dbo.stock_depot WHERE depot_id = 3\nORDER BY article_id;\n-- Dans l'autre sens (dépôt 3 EXCEPT dépôt 1) : 0 ligne",
      resultat: [["article_id"], [2], [4], [6]],
      points: [
        "Ce qui se passe : 3 articles sont à Lyon et pas à Nantes : CHL-25, FIL-14 et ROB-X. `EXCEPT` garde les lignes de la 1re requête absentes de la 2e. Avec `INTERSECT` à la place, on garde celles des deux côtés : 1, 3, 7 et 8.",
        "Pourquoi : les deux comparent des lignes entières et rendent un résultat sans doublon. `stock_depot` a une ligne par article et par dépôt ; mise des deux côtés d'un `INTERSECT`, elle n'en rend que 7, une par article. Et `A EXCEPT A` est toujours vide.",
        "Le piège : le sens compte. Nantes `EXCEPT` Lyon renvoie 0 ligne : tout ce qui est à Nantes est aussi à Lyon. Un contrôle écrit à l'envers dit « rien à signaler », et l'anomalie passe.",
        "Le bon réflexe : dis la question en français d'abord : « dans A, pas dans B » s'écrit `A EXCEPT B`. Et mets seulement les colonnes qui doivent être égales : avec `qte` en plus, `INTERSECT` ne trouve plus rien de commun.",
        "SQL Server / Snowflake : Snowflake accepte aussi `MINUS` (le mot d'Oracle), qui fait la même chose qu'`EXCEPT`. SQL Server n'a ni `EXCEPT ALL` ni `INTERSECT ALL` : les doublons partent toujours."
      ],
      retenir: "A EXCEPT B : dans A, pas dans B ; INTERSECT : des deux côtés. Les deux dédoublonnent, et le sens d'EXCEPT compte."
    },
    {
      titre: "EXCEPT et NULL : deux cases vides sont égales",
      exemple: "-- Piège (m02) : 0 ligne, car le flux 3 (rejeté) a un cde_id NULL\nSELECT id FROM dbo.commande\nWHERE id NOT IN (SELECT cde_id FROM dbo.flux_edi);\n-- Juste : les commandes sans aucun flux EDI (résultat ci-dessous)\nSELECT id FROM dbo.commande\nEXCEPT\nSELECT cde_id FROM dbo.flux_edi\nORDER BY id;",
      resultat: [["id"], [2], [4], [5], [6], [8]],
      points: [
        "Ce qui se passe : `EXCEPT` trouve les 5 commandes sans flux EDI. `NOT IN` pose la même question et renvoie 0 ligne : un seul NULL dans la liste suffit à tout bloquer (m02). `EXCEPT` n'a pas ce piège.",
        "Pourquoi : pour `UNION`, `INTERSECT` et `EXCEPT`, deux NULL sont « pareils », comme pour `DISTINCT`. Le NULL du flux 3 est une valeur comme une autre : aucune commande ne l'a, il ne bloque rien. Avec `=`, NULL = NULL reste inconnu.",
        "Le piège : comparer deux tables avec une jointure, un `=` par colonne. Une ligne dont la ville est NULL ne retrouve pas sa jumelle, et sort en « écart ». Compare `client` à elle-même : la jointure signale Camping Les Flots, `EXCEPT` ne signale rien.",
        "Le bon réflexe : `EXCEPT` pour comparer des lignes entières. Mais il ne rend que les colonnes comparées : pour afficher le numéro ou le client, repasse par `NOT EXISTS` (module m06) ou par une jointure.",
        "Et aussi : `EXCEPT` compare toute la ligne ; `NOT EXISTS` compare ce que tu écris dans son `WHERE`, souvent la clé. Sur la clé, tu trouves les absents ; sur toutes les colonnes, les absents et les modifiés."
      ],
      retenir: "Pour UNION, INTERSECT et EXCEPT, NULL = NULL : EXCEPT n'a pas le piège de NOT IN."
    },
    {
      titre: "Comparer deux tables : EXCEPT dans les deux sens",
      exemple: "-- Rapprochement commandes / factures (n° de commande + montant), dans les deux sens\n(SELECT id, montant_ht FROM dbo.commande\n EXCEPT\n SELECT cde_id, montant_ht FROM dbo.facture)\nUNION ALL\n(SELECT cde_id, montant_ht FROM dbo.facture\n EXCEPT\n SELECT id, montant_ht FROM dbo.commande)\nORDER BY id;   -- sans les parenthèses : 0 ligne",
      resultat: [["id", "montant_ht"], [4, "549.00"], [5, "318.00"], [6, "1290.00"], [7, "7950.00"]],
      points: [
        "Ce qui se passe : 4 écarts, tous dans le 1er sens : la commande annulée et les 3 en cours, sans facture. Le 2e sens ne trouve rien : chaque facture reprend le montant de sa commande.",
        "Pourquoi : `A EXCEPT B` ne voit que les lignes de A : ce que B a en plus lui échappe. Le 2e sens seul aurait dit « 0 écart ». Et `EXCEPT` dédoublonne : une ligne chargée deux fois ne fait pas d'écart. Compare aussi les `COUNT(*)`.",
        "Le piège : sans les parenthèses, le moteur lit de gauche à droite : ((commande EXCEPT facture) UNION ALL facture) EXCEPT commande. Le dernier `EXCEPT` efface tout : 0 ligne, « aucun écart ». Seul `INTERSECT` passe avant `UNION` et `EXCEPT`.",
        "Le bon réflexe : des parenthèses, et une colonne qui dit le sens (`'sans facture' AS ecart`), écrite des deux côtés de chaque `EXCEPT`. Pour compter les écarts : `SELECT COUNT(*) FROM (… EXCEPT …) AS d`.",
        "SQL Server / Snowflake : le même contrôle peut répondre autrement. SQL Server compare selon la collation : en French_CI_AS, 'LYON' = 'Lyon', et les espaces de fin ne comptent pas. Snowflake compare exactement : il voit ces écarts (m02)."
      ],
      retenir: "Comparer deux tables : EXCEPT dans les deux sens, entre parenthèses, puis les COUNT(*) des deux tables."
    },
    {
      titre: "Détails utiles",
      points: [
        "Simuler un `FULL OUTER JOIN` : `A LEFT JOIN B`, puis `UNION ALL` des lignes de B sans correspondance (`NOT EXISTS`). Pas `UNION` avec un `RIGHT JOIN` : il fusionnerait aussi de vraies lignes égales, et coûte un tri.",
        "Rapprochement ERP / EDI : les codes d'un seul côté s'écrivent `(A UNION B) EXCEPT (A INTERSECT B)`. Pour un statut par code (« ERP seul », « EDI seul », « Les deux ») en une requête : `FULL OUTER JOIN` puis `CASE` sur les NULL (m05).",
        "Chargement incrémental : `stg EXCEPT cible` donne les lignes nouvelles ou modifiées. Sur 50 millions de lignes et 80 colonnes, compare plutôt la clé et une empreinte (hash) calculée au chargement : `HASHBYTES` sur SQL Server, `HASH` sur Snowflake.",
        "CTE récursive (m06) : l'ancre et la partie récursive se relient par `UNION ALL`, obligatoire. Snowflake exige en plus la liste des colonnes : `WITH RECURSIVE arbre (id, parent_id) AS (…)`.",
        "`GROUP BY GROUPING SETS ((famille), (depot_id))` donne deux `GROUP BY` empilés, comme un `UNION ALL`, mais en une seule lecture de la table (m04).",
        "Dépivoter 12 colonnes de mois (SQL Server) : `CROSS APPLY (VALUES …)` lit la table une fois ; 12 `SELECT` reliés par `UNION ALL` la lisent 12 fois.",
        "Charger deux sources d'un coup : `INSERT INTO cible (code, nom) SELECT … UNION ALL SELECT …`. Copier une union dans une table : `SELECT … INTO #t` dans la 1re partie (SQL Server), `CREATE TABLE t AS SELECT …` (Snowflake).",
        "Vue partitionnée (SQL Server) : une vue `UNION ALL` sur `vente_2024`, `vente_2025` et `vente_2026`, avec un `CHECK` sur l'année dans chaque table. `WHERE annee = 2026` ne lit que `vente_2026`, si les `CHECK` sont actifs et fiables."
      ],
      retenir: "UNION ALL sert partout où l'on empile : récursion, chargement, archives."
    }
  ],
  differences: [
    ["A sans B", "`EXCEPT`", "`EXCEPT` ou `MINUS`"],
    ["Colonnes associées par nom", "Impossible", "`UNION ALL BY NAME`"],
    ["Un TOP par partie", "Table dérivée + `TOP`", "Sous-requête + `LIMIT`"],
    ["Limiter tout le résultat", "`OFFSET … FETCH` final", "`LIMIT` final"],
    ["Casse dans `EXCEPT`", "Selon la collation", "Exacte"],
    ["Copier le résultat", "`SELECT … INTO`", "`CREATE TABLE … AS`"],
    ["Empreinte d'une ligne", "`HASHBYTES`", "`HASH`"],
    ["CTE récursive", "Colonnes facultatives", "Colonnes obligatoires"]
  ]
};
