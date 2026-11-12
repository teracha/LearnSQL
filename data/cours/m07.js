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
// Relecture testeur (12/11/2026) : S4 « top 2 de chaque partie » (ANNULEE n'y est pas) ; S4 et carte « table
// dérivée + LIMIT » (docs.snowflake.com constructs/order-by : sous-requête du FROM avec ORDER BY + LIMIT) ; S5 : ni SQL
// Server ni Snowflake n'ont EXCEPT ALL / INTERSECT ALL (guides SnowConvert) ; S6 : jointure testée sur code, nom, ville
// (sur toutes les colonnes : 3 écarts, les 2 SIREN NULL en plus ; SQLite) ; S1 « ajoute … à celles de la 1re » (q18).
LEARNSQL.cours.m07 = {
  intro: "Après la reprise des clients dans Snowflake, on te demande : « Les deux tables sont-elles identiques ? » Quelle requête écris-tu ? `UNION ALL` empile deux résultats, `INTERSECT` garde le commun, `EXCEPT` le manquant. Ce module t'évite deux erreurs vues en entreprise : un `UNION` qui fusionne de vraies ventes, et un contrôle fait dans un seul sens qui annonce « 0 écart ».",
  sections: [
    {
      titre: "UNION ALL : empiler deux résultats",
      exemple: "-- Les pièces d'AquaBleu (client 1) : commandes et factures, par date\nSELECT 'Commande' AS piece, num_cde AS numero, date_cde AS date_piece, montant_ht\nFROM dbo.commande\nWHERE client_id = 1\nUNION ALL\nSELECT 'Facture', f.num_fact, f.date_fact, f.montant_ht\nFROM dbo.facture AS f JOIN dbo.commande AS c ON c.id = f.cde_id\nWHERE c.client_id = 1\nORDER BY date_piece;",
      resultat: [["piece", "numero", "date_piece", "montant_ht"], ["Commande", "CDE-1001", "2026-03-02", "4780.00"], ["Facture", "FA-2026-0301", "2026-03-03", "4780.00"], ["Commande", "CDE-1003", "2026-03-09", "2385.00"], ["Facture", "FA-2026-0303", "2026-03-10", "2385.00"], ["Commande", "CDE-1007", "2026-04-07", "7950.00"]],
      points: [
        "Ce qui se passe : les 3 commandes d'AquaBleu et ses 2 factures, par date, dans les mêmes colonnes. La constante `piece` (le même texte sur toute la partie) dit d'où vient la ligne.",
        "Pourquoi : `UNION ALL` ajoute les lignes de la 2e requête à celles de la 1re, sans rien retirer. Les noms des colonnes viennent de la 1re ; ceux de la 2e sont ignorés.",
        "Le piège : empiler deux sociétés (deux dossiers Divalto) sans colonne source. Le même code client existe des deux côtés : Power BI additionne deux clients différents.",
        "Le bon réflexe : une constante par partie (`'Commande'`, `'Facture'` ou `'SOC1'`, `'SOC2'`). C'est la base d'une vue qui réunit une table et son archive, ou les sociétés d'un groupe.",
        "Et aussi : un seul `ORDER BY`, à la fin, pour toutes les lignes (section 4)."
      ],
      retenir: "UNION ALL empile tout, sans rien retirer. Une colonne constante par partie dit d'où vient chaque ligne."
    },
    {
      titre: "UNION : les doublons disparaissent, même les vrais",
      exemple: "-- Voulu : CA facturé + commandes en cours, par client\nSELECT client_id, SUM(montant_ht) AS total\nFROM (SELECT c.client_id, f.montant_ht\n      FROM dbo.facture AS f JOIN dbo.commande AS c ON c.id = f.cde_id\n      UNION                 -- piège : il fallait UNION ALL\n      SELECT client_id, montant_ht\n      FROM dbo.commande WHERE statut = 'EN_COURS') AS t\nGROUP BY client_id\nORDER BY client_id;",
      resultat: [["client_id", "total"], [1, "15115.00"], [2, "1290.00"], [4, "318.00"], [6, "79.80"]],
      points: [
        "Ce qui se passe : 1 290 € pour Piscines Dumont (client 2), au lieu de 2 580 €. Sa facture FA-2026-0302 et sa commande CDE-1006 font la même ligne : `UNION` n'en garde qu'une.",
        "Pourquoi : `UNION` = `UNION ALL` + `DISTINCT` : il retire tous les doublons, même ceux d'une seule partie. Pour les trouver, il trie ou hache tout le résultat (range chaque ligne par empreinte) : c'est plus lent.",
        "Le piège : sur des faits (ventes, factures, stock), deux lignes identiques peuvent être vraies. `UNION` les fusionne sans erreur, et le CA baisse. Un `DISTINCT` dans chaque partie ne sert à rien.",
        "Le bon réflexe : `UNION ALL` par défaut (ici : 2 580 €). `UNION` seulement pour une liste de valeurs uniques, comme les codes clients de l'ERP ou de l'EDI.",
        "Et aussi : pour le CA net, empile les avoirs avec le signe moins (`-montant`), puis un seul `GROUP BY`. Une jointure facture-avoir multiplierait les sommes (m05)."
      ],
      retenir: "UNION ALL par défaut. UNION fusionne aussi les vraies lignes égales : réserve-le aux listes de valeurs uniques."
    },
    {
      titre: "Les colonnes : par position, jamais par nom",
      exemple: "-- La 2e partie, copiée d'une autre requête, a nom et ville inversés\nSELECT nom, ville FROM dbo.client WHERE type = 'GD'\nUNION ALL\nSELECT ville, nom FROM dbo.client WHERE pays = 'CH'\nORDER BY nom;",
      resultat: [["nom", "ville"], ["AquaBleu", "Lyon"], ["Genève", "Pool & Garden"]],
      points: [
        "Ce qui se passe : « Genève » arrive dans `nom`, « Pool & Garden » dans `ville`. Aucune erreur : ce sont deux textes, et le moteur ne lit pas les noms.",
        "Pourquoi : une union associe les colonnes par position. Il faut le même nombre de colonnes et des types compatibles ; le résultat prend le plus large : `VARCHAR(50)` plutôt que `VARCHAR(5)`, `DECIMAL` plutôt qu'`INT`.",
        "Le piège : `SELECT *` dans une vue `UNION ALL` : si une table gagne une colonne, la vue plante ou décale tout. Et `SELECT 1 UNION ALL SELECT 'A'` plante : le nombre l'emporte, et 'A' n'en est pas un.",
        "Le bon réflexe : liste les colonnes, même ordre, même type, dans chaque partie. Colonne absente : `NULL AS libelle` ; type à aligner : `CAST(id AS varchar(10))`. Mêmes règles pour `INTERSECT` et `EXCEPT`.",
        "SQL Server / Snowflake : deux bases SQL Server de collations différentes (règles de comparaison des textes) font planter l'union : ajoute `COLLATE`. Snowflake sait associer par nom : `UNION ALL BY NAME`."
      ],
      retenir: "Les colonnes s'associent par position : même nombre, même ordre, types compatibles. Jamais de SELECT * dans une union."
    },
    {
      titre: "ORDER BY et TOP : un seul tri, à la fin",
      exemple: "-- Piège : TOP (2) directement dans chaque partie = 2 lignes quelconques\n-- Juste : top 2 des livrées + top 2 des en cours\nSELECT num_cde, statut, montant_ht\nFROM (SELECT TOP (2) num_cde, statut, montant_ht FROM dbo.commande\n      WHERE statut = 'LIVREE' ORDER BY montant_ht DESC) AS l\nUNION ALL\nSELECT num_cde, statut, montant_ht\nFROM (SELECT TOP (2) num_cde, statut, montant_ht FROM dbo.commande\n      WHERE statut = 'EN_COURS' ORDER BY montant_ht DESC) AS e\nORDER BY montant_ht DESC;",
      resultat: [["num_cde", "statut", "montant_ht"], ["CDE-1007", "EN_COURS", "7950.00"], ["CDE-1001", "LIVREE", "4780.00"], ["CDE-1003", "LIVREE", "2385.00"], ["CDE-1006", "EN_COURS", "1290.00"]],
      points: [
        "Ce qui se passe : le top 2 de chaque partie, puis un tri sur les 4 lignes. Chaque `TOP` vit dans une table dérivée (une requête dans le `FROM`), avec son `ORDER BY`.",
        "Pourquoi : dans une union, `ORDER BY` trie le résultat complet : une seule fois, à la fin, avec les noms de la 1re partie. Placé avant `UNION ALL` : erreur de syntaxe.",
        "Le piège : `TOP (2)` dans chaque partie, `ORDER BY` à la fin : pas d'erreur, mais les `TOP` passent avant le tri et prennent 2 commandes quelconques. Et un `WHERE` ne filtre que sa partie.",
        "Le bon réflexe : une table dérivée par `TOP`, un `WHERE` dans chaque partie. Sans tri, A ne sort pas forcément avant B : `1 AS ordre` dans A, `2` dans B, puis `ORDER BY ordre`.",
        "SQL Server / Snowflake : limiter tout le résultat : `OFFSET 0 ROWS FETCH NEXT 3 ROWS ONLY` après l'`ORDER BY` final (SQL Server), `LIMIT 3` (Snowflake). Un top par partie : table dérivée avec `LIMIT`."
      ],
      retenir: "Un seul ORDER BY, à la fin, avec les noms de la 1re partie ; un TOP par partie : une table dérivée."
    },
    {
      titre: "INTERSECT et EXCEPT : le commun et le manquant",
      exemple: "-- Réassort : articles stockés à Lyon (dépôt 1), absents de Nantes (dépôt 3)\nSELECT article_id FROM dbo.stock_depot WHERE depot_id = 1\nEXCEPT\nSELECT article_id FROM dbo.stock_depot WHERE depot_id = 3\nORDER BY article_id;\n-- Dans l'autre sens (dépôt 3 EXCEPT dépôt 1) : 0 ligne",
      resultat: [["article_id"], [2], [4], [6]],
      points: [
        "Ce qui se passe : les articles 2, 4 et 6 (CHL-25, FIL-14, ROB-X) sont à Lyon, pas à Nantes. `EXCEPT` garde les lignes de la 1re requête absentes de la 2e ; `INTERSECT`, celles des deux côtés.",
        "Pourquoi : les deux comparent des lignes entières et rendent un résultat sans doublon : `A INTERSECT A` revient à un `DISTINCT`, et `A EXCEPT A` est toujours vide.",
        "Le piège : le sens compte. Nantes `EXCEPT` Lyon renvoie 0 ligne : tout ce qui est à Nantes est aussi à Lyon. Un contrôle écrit à l'envers dit « rien à signaler ».",
        "Le bon réflexe : dis d'abord la question : « dans A, pas dans B » s'écrit `A EXCEPT B`. Ne mets que les colonnes qui doivent être égales : avec `qte` en plus, plus rien n'est commun.",
        "SQL Server / Snowflake : Snowflake accepte aussi `MINUS` (le mot d'Oracle), synonyme d'`EXCEPT`. Aucun des deux n'a `EXCEPT ALL` ni `INTERSECT ALL` : les doublons partent toujours."
      ],
      retenir: "A EXCEPT B : dans A, pas dans B. INTERSECT : des deux côtés. Sans doublon, et le sens d'EXCEPT compte."
    },
    {
      titre: "EXCEPT et NULL : deux cases vides sont égales",
      exemple: "-- Piège (m02) : 0 ligne, car le flux 3 (rejeté) a un cde_id NULL\nSELECT id FROM dbo.commande\nWHERE id NOT IN (SELECT cde_id FROM dbo.flux_edi);\n-- Juste : les commandes sans flux EDI (résultat ci-dessous)\nSELECT id FROM dbo.commande\nEXCEPT\nSELECT cde_id FROM dbo.flux_edi\nORDER BY id;",
      resultat: [["id"], [2], [4], [5], [6], [8]],
      points: [
        "Ce qui se passe : `EXCEPT` trouve les 5 commandes sans flux EDI ; `NOT IN` renvoie 0 ligne, car un NULL dans la liste bloque tout (m02).",
        "Pourquoi : pour `UNION`, `INTERSECT` et `EXCEPT`, deux NULL sont « pareils », comme pour `DISTINCT`. Le NULL du flux 3 est une simple valeur : il ne bloque rien. Avec `=`, NULL = NULL reste inconnu.",
        "Le piège : comparer deux tables par jointure (un `=` par colonne) : une ville NULL ne retrouve pas sa jumelle. Testée sur `client` contre elle-même (code, nom, ville), la jointure voit un écart (Camping Les Flots) ; `EXCEPT`, aucun.",
        "Le bon réflexe : `EXCEPT` pour comparer des lignes entières. Il ne rend que les colonnes comparées : pour afficher le client ou le montant, passe par `NOT EXISTS` (m06) ou une jointure.",
        "Et aussi : sur la clé seule (`EXCEPT` ou `NOT EXISTS`), tu trouves les absents ; sur toutes les colonnes, les absents et les modifiés."
      ],
      retenir: "Pour UNION, INTERSECT et EXCEPT, NULL = NULL : EXCEPT n'a pas le piège de NOT IN."
    },
    {
      titre: "Comparer deux tables : EXCEPT dans les deux sens",
      exemple: "-- Rapprochement commandes / factures (n° + montant), dans les deux sens\n(SELECT id, montant_ht FROM dbo.commande\n EXCEPT\n SELECT cde_id, montant_ht FROM dbo.facture)\nUNION ALL\n(SELECT cde_id, montant_ht FROM dbo.facture\n EXCEPT\n SELECT id, montant_ht FROM dbo.commande)\nORDER BY id;   -- sans les parenthèses : 0 ligne",
      resultat: [["id", "montant_ht"], [4, "549.00"], [5, "318.00"], [6, "1290.00"], [7, "7950.00"]],
      points: [
        "Ce qui se passe : 4 écarts, tous dans le 1er sens : l'annulée et les 3 commandes en cours, sans facture. Le 2e sens est vide : chaque facture a le bon montant.",
        "Pourquoi : `A EXCEPT B` ne voit que les lignes de A : le 2e sens seul aurait dit « 0 écart ». Et `EXCEPT` dédoublonne : une ligne chargée deux fois passe inaperçue. Compare aussi les `COUNT(*)`.",
        "Le piège : sans parenthèses, le moteur lit de gauche à droite : `((commande EXCEPT facture) UNION ALL facture) EXCEPT commande`. Le dernier `EXCEPT` efface tout. Seul `INTERSECT` passe avant `UNION` et `EXCEPT`.",
        "Le bon réflexe : des parenthèses, et une colonne qui dit le sens (`'sans facture' AS ecart`), la même des deux côtés de l'`EXCEPT`. Compter : `SELECT COUNT(*) FROM (… EXCEPT …) AS d`.",
        "SQL Server / Snowflake : SQL Server compare selon la collation : en French_CI_AS, 'LYON' = 'Lyon', espaces de fin ignorés. Snowflake compare exactement : le même contrôle y trouve des écarts (m02)."
      ],
      retenir: "Deux tables identiques ? EXCEPT dans les deux sens, entre parenthèses, plus les COUNT(*)."
    },
    {
      titre: "Détails utiles",
      points: [
        "`FULL OUTER JOIN` simulé : `A LEFT JOIN B`, puis `UNION ALL` des lignes de B sans correspondance (`NOT EXISTS`). Avec `UNION`, de vraies lignes égales fusionneraient.",
        "Codes d'un seul côté (ERP ou EDI) : `(A UNION B) EXCEPT (A INTERSECT B)`. Statut par code (« ERP seul », « Les deux »…) : `FULL OUTER JOIN` + `CASE` (m05).",
        "Chargement incrémental : les lignes nouvelles ou modifiées de la table de chargement, c'est `stg EXCEPT cible`. Très grosse table : compare la clé et une empreinte (hash) calculée au chargement : `HASHBYTES` (SQL Server), `HASH` (Snowflake).",
        "CTE récursive (m06) : ancre et partie récursive se relient par `UNION ALL`. Snowflake exige la liste des colonnes : `WITH RECURSIVE arbre (id, parent_id) AS (…)`.",
        "`GROUPING SETS ((famille), (depot_id))` : deux `GROUP BY` empilés comme par `UNION ALL`, en une seule lecture (m04).",
        "Passer 12 colonnes de mois en lignes (SQL Server) : `CROSS APPLY (VALUES …)` lit la table une fois ; 12 `SELECT` en `UNION ALL`, 12 fois.",
        "Charger deux sources : `INSERT INTO cible (code, nom) SELECT … UNION ALL SELECT …`. Copier une union : `SELECT … INTO #t` dans la 1re partie (SQL Server), `CREATE TABLE t AS …` (Snowflake).",
        "Vue partitionnée (SQL Server) : `vente_2024`, `vente_2025`, `vente_2026` en `UNION ALL`, chacune avec un `CHECK` (une règle imposée aux lignes) sur l'année : `WHERE annee = 2026` ne lit que `vente_2026`."
      ],
      retenir: "UNION ALL sert partout où l'on empile : récursion, chargement, archives."
    }
  ],
  differences: [
    ["A sans B", "`EXCEPT`", "`EXCEPT` ou `MINUS`"],
    ["Colonnes associées par nom", "Impossible", "`UNION ALL BY NAME`"],
    ["Un TOP par partie", "Table dérivée + `TOP`", "Table dérivée + `LIMIT`"],
    ["Limiter tout le résultat", "`OFFSET … FETCH` final", "`LIMIT` final"],
    ["Casse dans `EXCEPT`", "Selon la collation", "Exacte"],
    ["Copier le résultat", "`SELECT … INTO`", "`CREATE TABLE … AS`"],
    ["Empreinte d'une ligne", "`HASHBYTES`", "`HASH`"],
    ["CTE récursive", "Colonnes facultatives", "Colonnes obligatoires"]
  ]
};
