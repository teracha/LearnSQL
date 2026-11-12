// Parcours SQL — Cours complet du module m05 « Les jointures », version 1 (12/11/2026).
// Écrit à partir de la fiche de révision (data/fiches/m05.js, l'ancien cours court) et des 100 « retenir » de
// data/m05-jointures.js. Squelette validé par l'élève (m02 v2) : Exemple (qui MONTRE le piège) → Résultat → « Ce qui se
// passe » → « Pourquoi » → « Le piège » (l'erreur vue en entreprise) → « Le bon réflexe » → « SQL Server / Snowflake »
// ou « Et aussi » → À retenir. Chaque mot technique est expliqué à sa première apparition.
// Résultats recalculés avec SQLite 3.45 sur docs/base-exemple.sql (script : scratchpad cours-complets/m05/verif.py, 72
// requêtes, 0 écart) : INNER flux_edi → commande (5 flux sur 6, le flux 3 rejeté disparaît ; ON co.id = f.id relie le
// flux 3 à CDE-1003) ; LEFT JOIN des 5 PRO français et de leurs commandes EN_COURS (5 lignes ; filtre dans le WHERE : 2
// lignes ; avec OR co.statut IS NULL : 3) ; anti-jointure (C005, C007 ; sans commande depuis le 1er avril : + C003 ;
// test sur f.motif : 9 lignes au lieu de 5, CDE-1001, 1003 et 1007 à tort) ; FULL OUTER JOIN commandes EDI ↔ flux
// ORDERS (4 lignes, flux 3 « Manque ERP » ; table commande entière filtrée après la jointure : 3 lignes) ; deux tables
// filles (CDE-1001 : 9560.00 et 4 flux au lieu de 4780.00 et 2 ; CDE-1003 : 2 flux au lieu d'1 ; COUNT(*) 3 → 6 → 10) ;
// CROSS JOIN article × dépôt (24 couples ; CHL-25 : Lyon 25, Toulouse 15, Nantes 0) ; tranches VALUES (5, 5, 10 % ;
// BETWEEN 0-1000 / 1000-5000 : 2 tranches pour 1 000 ; 0-999 / 1000-4999 : aucune pour 999,50) ; auto-jointure SIREN
// (C002-C006 ; avec <> : 2 lignes ; SIREN NULL : aucune paire). Calculés à la main : 10 000 × 10 000 = 100 millions ;
// ERP 100 / EDI 98 / 95 communes : 95 + 5 + 3 = 103.
// Couverture : chaque notion testée par plusieurs questions a sa section ou son point (carte : rapport de l'expert).
// Laissées à l'explication de leur question (une seule question chacune, règle 6 de docs/plan-sql.md) : LEFT OUTER
// (q32), chemin des clés (q33), parenthèses dans un LEFT (q38), EXCEPT (q47, module m07), LEFT + IS NOT NULL (q48),
// libellé par langue (q52), élimination de jointure (q56), identifiant plutôt que libellé (q58), membre « Inconnu »
// (q60), fonction table et APPLY (q67), *= (q70), filtre dans une sous-requête (q76), table de liaison (q78),
// sous-requête agrégée (q79), CTE récursive (q80, m06), LAG et cumul (q85, q86, m08), indices de jointure (q88),
// OPENQUERY (q90), IS NOT DISTINCT FROM (q08, vu en m02).
// Sources (vérifiées le 12/11/2026) : learn.microsoft.com/sql : t-sql/queries/from-transact-sql (INNER par défaut,
// OUTER facultatif, ON accepte tout prédicat, filtre ON ou WHERE : même résultat en INNER, différent en OUTER ; CROSS
// JOIN = ancienne écriture sans WHERE ; CROSS / OUTER APPLY ; table dérivée VALUES … AS t(a, b) ; noms en 3 et 4
// parties ; ni USING ni NATURAL), relational-databases/performance/joins (Nested Loops, Merge, Hash),
// t-sql/queries/hints-transact-sql-join (dernier recours),
// relational-databases/tables/primary-and-foreign-key-constraints (une clé étrangère ne crée pas d'index),
// t-sql/statements/set-showplan-all-transact-sql (avertissement MISSING JOIN PREDICATE) et
// relational-databases/event-classes/missing-join-predicate-event-class ; le plan graphique de SSMS l'affiche « No Join
// Predicate » (attribut XML NoJoinPredicate ; SQLServerCentral, Brent Ozar : relecture du 12/11/2026),
// t-sql/language-elements/string-comparison-assignment (espaces de fin ignorés par =),
// t-sql/data-types/data-type-precedence-transact-sql (int passe avant varchar : le texte est converti),
// t-sql/statements/collation-precedence-transact-sql (conflit de collation, COLLATE),
// t-sql/functions/string-split-transact-sql (colonne value), t-sql/queries/is-distinct-from-transact-sql (2022).
// docs.snowflake.com (par extraits de recherche, le site n'est pas joignable) : sql-reference/constructs/join (USING et
// sa liste de colonnes, NATURAL JOIN), sql-reference/collation (casse et espaces de fin comptés par défaut),
// user-guide/ui-query-profile (« exploding joins », débordement sur disque), sql-reference/functions/split_to_table,
// user-guide/tables-hybrid-index (index des tables hybrides, dont un par clé étrangère),
// user-guide/search-optimization/secondary-indexes et release-notes/2026/other/2026-10-26-secondary-indexes-ga (relecture : index
// secondaires sur les tables standard, en GA depuis le 26/10/2026, pour les recherches très sélectives : d'où S8.P8 et la
// ligne « Accélérer une jointure » de la carte), sql-reference/identifiers (base.schéma.objet).
// Faits déjà vérifiés (consignes de novembre 2026) : Snowflake refuse LIMIT dans une sous-requête liée (LATERAL), top N
// avec QUALIFY.
LEARNSQL.cours.m05 = {
  intro: "Ton rapport EDI annonce 9 560 € pour CDE-1001, qui en vaut 4 780 €, et ton suivi des flux ne montre aucune commande rejetée : bug, ou jointure piégée ? Une jointure relie deux tables, comme les flux EDI et leurs commandes. Mal choisie, elle perd des lignes ou les double, sans erreur. Ce module montre ce que chaque jointure garde, et comment éviter ces pièges.",
  sections: [
    {
      titre: "INNER JOIN : seulement ce qui correspond des deux côtés",
      exemple: "-- Suivi EDI : chaque flux et sa commande\nSELECT f.id, f.type, f.statut, co.num_cde\nFROM dbo.flux_edi AS f\nINNER JOIN dbo.commande AS co ON co.id = f.cde_id\nORDER BY f.id;",
      resultat: [["id", "type", "statut", "num_cde"], [1, "ORDERS", "OK", "CDE-1001"], [2, "ORDERS", "OK", "CDE-1003"], [4, "INVOIC", "OK", "CDE-1001"], [5, "ORDERS", "OK", "CDE-1007"], [6, "DESADV", "REJET", "CDE-1007"]],
      points: [
        "Ce qui se passe : 5 flux sur 6. Le flux 3, une commande AquaBleu rejetée, a disparu : son `cde_id` est NULL (une case vide), il ne pointe vers aucune commande.",
        "Pourquoi : `cde_id` est une clé étrangère : elle pointe vers l'`id` d'une autre table. Le moteur garde les couples (flux, commande) où le ON est vrai ; or NULL n'est égal à rien.",
        "Le piège : le suivi EDI perd la commande rejetée, sans erreur. Un ON faux ne plante pas non plus : `ON co.id = f.id` relie le flux 3 à CDE-1003, sans rapport.",
        "Le bon réflexe : INNER pour « présent des deux côtés » (un article vendu au moins une fois), sinon LEFT. `JOIN` seul = `INNER JOIN`. Préfixe chaque colonne par l'alias de sa table (`co.id`) : sinon, « nom de colonne ambigu ».",
        "SQL Server / Snowflake : SQL Server ignore les espaces de fin, et souvent la casse (selon la collation, la règle de comparaison des textes). Snowflake compare exactement, par défaut : 'abc12' ≠ 'ABC12', 'A1 ' ≠ 'A1'. Après une migration : `UPPER` et `TRIM` au chargement."
      ],
      retenir: "INNER JOIN garde les couples qui correspondent. Sans partenaire, ou avec une clé NULL, la ligne disparaît sans erreur."
    },
    {
      titre: "LEFT JOIN : garder toute la table de gauche",
      exemple: "-- Tous les piscinistes français, et leurs commandes en cours\nSELECT cl.code, cl.nom, co.num_cde\nFROM dbo.client AS cl\nLEFT JOIN dbo.commande AS co\n       ON co.client_id = cl.id\n      AND co.statut = 'EN_COURS'      -- filtre de droite\nWHERE cl.type = 'PRO' AND cl.pays = 'FR'\nORDER BY cl.code;\n-- Piège : le filtre de droite dans le WHERE → 2 lignes",
      resultat: [["code", "nom", "num_cde"], ["C002", "Piscines Dumont", "CDE-1006"], ["C003", "Bleu Lagon", null], ["C004", "Hydro Sud", "CDE-1005"], ["C006", "Piscines Dumont", null], ["C007", "Camping Les Flots", null]],
      points: [
        "Ce qui se passe : les 5 piscinistes français restent ; 3 n'ont pas de commande en cours, d'où NULL. Avec le filtre dans le WHERE, seuls C002 et C004 restent.",
        "Pourquoi : LEFT JOIN garde chaque ligne de gauche (la table du FROM) ; sans partenaire, les colonnes de droite valent NULL. Le WHERE passe après : `NULL = 'EN_COURS'` est inconnu, la ligne sort, le LEFT redevient un INNER.",
        "Le piège : ajouter `OR co.statut IS NULL` dans le WHERE ne répare pas. Bleu Lagon a une commande, annulée : son statut n'est pas NULL, sa ligne sort. Le carnet de commandes par client perd des clients.",
        "Le bon réflexe : le filtre de droite dans le ON, celui de gauche (type, pays) dans le WHERE. Dans le ON, un filtre de gauche ne retire rien : un LEFT JOIN garde toute la gauche.",
        "Et aussi : `A RIGHT JOIN B` = `B LEFT JOIN A` : écris des LEFT. Pour un INNER, l'ordre des tables et ON ou WHERE ne changent rien. Après un LEFT, un INNER JOIN depuis la table de droite (commande → lignes) l'annule : enchaîne des LEFT."
      ],
      retenir: "LEFT JOIN garde toute la gauche ; le filtre de la table de droite va dans le ON, sinon le LEFT redevient un INNER."
    },
    {
      titre: "Trouver ce qui manque : l'anti-jointure",
      exemple: "-- Les clients qui n'ont jamais commandé\nSELECT cl.code, cl.nom\nFROM dbo.client AS cl\nLEFT JOIN dbo.commande AS co ON co.client_id = cl.id\nWHERE co.id IS NULL;\n\n-- Même résultat, plus direct\nSELECT cl.code, cl.nom\nFROM dbo.client AS cl\nWHERE NOT EXISTS (SELECT 1 FROM dbo.commande AS co\n                  WHERE co.client_id = cl.id);",
      resultat: [["code", "nom"], ["C005", "Pool & Garden"], ["C007", "Camping Les Flots"]],
      points: [
        "Ce qui se passe : les 2 clients sans commande. Les deux requêtes donnent la même liste : c'est une anti-jointure, qui garde les lignes sans partenaire.",
        "Pourquoi : le LEFT JOIN garde tous les clients ; sans commande, `co.id` vaut NULL, et `IS NULL` ne garde qu'eux. NOT EXISTS garde le client quand aucune commande ne pointe vers lui (une sous-requête, une requête dans la requête : m06).",
        "Le piège : tester une colonne qui peut être vide quand la ligne existe. « Commandes sans flux » avec `WHERE f.motif IS NULL` : le motif est vide aussi pour un flux accepté ; CDE-1001, CDE-1003 et CDE-1007 sortent à tort.",
        "Le bon réflexe : teste la clé de droite (`f.id`), jamais vide quand la ligne existe. « Sans commande depuis le 1er avril » : la période dans le ON (`AND co.date_cde >= '20260401'`), puis `co.id IS NULL` ; Bleu Lagon, qui a commandé en mars, s'ajoute.",
        "Et aussi : « au moins une commande », sans doublon : `WHERE EXISTS (…)`. Un INNER JOIN sortirait AquaBleu 3 fois, une par commande."
      ],
      retenir: "Ce qui manque : LEFT JOIN + IS NULL sur la clé de droite, ou NOT EXISTS. Ce qui existe, sans doublon : EXISTS."
    },
    {
      titre: "FULL OUTER JOIN : rapprocher l'ERP et l'EDI",
      exemple: "-- Commandes EDI de l'ERP ↔ flux ORDERS reçus\nWITH erp AS (SELECT id, num_cde FROM dbo.commande WHERE canal = 'EDI'),\n     edi AS (SELECT id, cde_id FROM dbo.flux_edi WHERE type = 'ORDERS')\nSELECT e.num_cde, d.id AS flux,\n       CASE WHEN e.id IS NULL THEN 'Manque ERP'\n            WHEN d.id IS NULL THEN 'Manque EDI'\n            ELSE 'OK' END AS etat\nFROM erp AS e\nFULL OUTER JOIN edi AS d ON d.cde_id = e.id\nORDER BY flux;",
      resultat: [["num_cde", "flux", "etat"], ["CDE-1001", 1, "OK"], ["CDE-1003", 2, "OK"], [null, 3, "Manque ERP"], ["CDE-1007", 5, "OK"]],
      points: [
        "Ce qui se passe : 3 commandes ont leur flux. Le flux 3, rejeté, n'a pas de commande : « Manque ERP ». Une commande EDI sans flux sortirait « Manque EDI ».",
        "Pourquoi : FULL OUTER JOIN garde les lignes des deux côtés ; le côté absent vaut NULL. ERP 100, EDI 98, 95 communes : 95 + 5 + 3 = 103 lignes, dont 5 absentes de l'EDI et 3 de l'ERP.",
        "Le piège : filtrer un seul côté après la jointure. Joins toute la table commande, puis `WHERE co.canal = 'EDI'` : le flux 3, sans commande, disparaît. Le rapprochement dit « tout va bien ».",
        "Le bon réflexe : filtre chaque côté avant de joindre, ici avec `WITH` (une CTE, une requête nommée, m06). Pour une clé toujours remplie : `COALESCE(e.num, d.num)`, la première valeur non vide.",
        "Et aussi : les écarts de montant s'ajoutent aux manquants : `OR e.montant <> d.montant`. Stock d'hier contre aujourd'hui : `COALESCE(auj.qte, 0) - COALESCE(hier.qte, 0)`, sinon un article nouveau donne NULL."
      ],
      retenir: "Rapprocher deux sources : FULL OUTER JOIN, un état par CASE, et chaque côté filtré avant la jointure."
    },
    {
      titre: "Les doublons qui gonflent les sommes",
      exemple: "-- Par commande EDI : montant des lignes et nombre de flux\nSELECT co.num_cde,\n       SUM(li.qte * li.prix_unit) AS montant,\n       COUNT(f.id)                AS nb_flux\nFROM dbo.commande AS co\nJOIN dbo.ligne_cde AS li ON li.cde_id = co.id\nJOIN dbo.flux_edi  AS f  ON f.cde_id = co.id\nWHERE co.canal = 'EDI'\nGROUP BY co.num_cde\nORDER BY co.num_cde;",
      resultat: [["num_cde", "montant", "nb_flux"], ["CDE-1001", "9560.00", 4], ["CDE-1003", "2385.00", 2], ["CDE-1007", "15900.00", 4]],
      points: [
        "Ce qui se passe : CDE-1001 affiche 9 560 € et 4 flux, pour 4 780 € et 2 flux réels. CDE-1003 a le bon montant, mais 2 flux au lieu d'un. Aucune erreur.",
        "Pourquoi : une jointure 1-N (une commande, N lignes) répète la commande N fois. Lignes et flux, deux tables filles, pointent vers la commande : la jointure forme tous les couples (ligne, flux), 2 × 2 = 4 pour CDE-1001.",
        "Le piège : le rapport multiplie le montant de chaque commande à plusieurs flux. Même effet avec les commandes et les paiements d'un client. DISTINCT ne répare pas : il cache.",
        "Le bon réflexe : agrège chaque table fille avant de joindre : `JOIN (SELECT cde_id, COUNT(*) AS nb_flux FROM dbo.flux_edi GROUP BY cde_id) AS f`. Fais de même pour les lignes : CDE-1001 retrouve 4 780 € et 2 flux.",
        "Et aussi : sur une table de référence, `GROUP BY cle HAVING COUNT(*) > 1` doit être vide ; le ON couvre toute la clé (`societe` ET `num_cde`). Ajoute une jointure à la fois, avec un `COUNT(*)` : ici 3, 6, puis 10 lignes."
      ],
      retenir: "Deux tables filles, ou une clé en double, multiplient les lignes : agrège avant de joindre, et compte à chaque jointure."
    },
    {
      titre: "CROSS JOIN : toutes les combinaisons, voulues ou non",
      exemple: "-- Le chlore 25 kg dans chaque dépôt, zéros compris\nSELECT a.code, d.nom AS depot, COALESCE(s.qte, 0) AS qte\nFROM dbo.article AS a\nCROSS JOIN dbo.depot AS d\nLEFT JOIN dbo.stock_depot AS s\n       ON s.article_id = a.id AND s.depot_id = d.id\nWHERE a.code = 'CHL-25'\nORDER BY d.id;",
      resultat: [["code", "depot", "qte"], ["CHL-25", "Lyon", 25], ["CHL-25", "Toulouse", 15], ["CHL-25", "Nantes", 0]],
      points: [
        "Ce qui se passe : les 3 dépôts sortent, Nantes à 0. Le stock n'a aucune ligne pour ce chlore à Nantes : en partant de la table stock_depot, Nantes disparaîtrait.",
        "Pourquoi : CROSS JOIN associe chaque article à chaque dépôt, sans condition : 8 × 3 = 24 couples. Le LEFT JOIN y accroche le stock quand il existe ; COALESCE remplace le NULL par 0.",
        "Le piège : le produit cartésien (tout avec tout) involontaire. `FROM a, b` sans condition ou `ON 1 = 1` : 10 000 × 10 000 = 100 millions de lignes. Le plan d'exécution (le chemin choisi par le moteur) avertit : « No Join Predicate ».",
        "Le bon réflexe : pour montrer ce qui n'existe pas (un jour sans vente, un dépôt vide), pars de la liste complète : une table calendrier, ou une grille CROSS JOIN. Puis LEFT JOIN vers les ventes, et `COALESCE(SUM(…), 0)`.",
        "Et aussi : une date avec heure se joint au calendrier par `CAST(date_cde AS date)` ; deux dates (commande, livraison) demandent deux jointures, deux alias."
      ],
      retenir: "CROSS JOIN = chaque ligne avec chaque ligne. Voulu, il construit la grille complète ; oublié, il multiplie tout."
    },
    {
      titre: "Le ON accepte toute condition : tranches et auto-jointure",
      exemple: "-- Remise par tranche, bornes [mini ; maxi[\nSELECT co.num_cde, co.montant_ht, t.remise\nFROM dbo.commande AS co\nJOIN (VALUES (0, 1000, 0), (1000, 5000, 5), (5000, 100000, 10))\n       AS t(mini, maxi, remise)\n  ON co.montant_ht >= t.mini AND co.montant_ht < t.maxi\nWHERE co.client_id = 1\nORDER BY co.id;",
      resultat: [["num_cde", "montant_ht", "remise"], ["CDE-1001", "4780.00", 5], ["CDE-1003", "2385.00", 5], ["CDE-1007", "7950.00", 10]],
      points: [
        "Ce qui se passe : chaque commande d'AquaBleu trouve sa tranche : 5 % pour 4 780 € et 2 385 €, 10 % pour 7 950 €. `VALUES` écrit une petite table dans la requête.",
        "Pourquoi : le ON est une condition comme une autre (`=`, `<`, `BETWEEN`…). Le moteur garde chaque couple (commande, tranche) où elle est vraie : une jointure « non-équi », sans égalité.",
        "Le piège : des tranches mal bornées. Avec `BETWEEN 0 AND 1000` puis `BETWEEN 1000 AND 5000`, 1 000 € tombe dans deux tranches : doublée. Avec 0-999 et 1000-4999, 999,50 € ne tombe nulle part : perdue.",
        "Le bon réflexe : des bornes [mini ; maxi[ (`>= mini AND < maxi`), sans trou ni chevauchement. Même règle pour un tarif daté ou une fiche client historisée (une ligne par version) : la clé ET `date >= debut AND date < fin`.",
        "Et aussi : une table jointe à elle-même (auto-jointure) prend deux alias : `client AS a JOIN client AS b ON b.siren = a.siren AND a.id < b.id` trouve le doublon C002-C006. Avec `<>`, chaque paire sortirait deux fois."
      ],
      retenir: "Le ON accepte toute condition : des bornes [mini ; maxi[ pour les tranches, deux alias pour une auto-jointure."
    },
    {
      titre: "Détails utiles",
      points: [
        "`CROSS APPLY` (SQL Server) lance une sous-requête par ligne de gauche : avec `TOP (1) … ORDER BY date_cde DESC`, la dernière commande de chaque client. `OUTER APPLY` garde aussi les clients sans commande, comme un LEFT JOIN.",
        "Snowflake n'a pas d'APPLY mais `LATERAL`, qui refuse `LIMIT` dans une sous-requête liée à la ligne. La dernière commande par client : `QUALIFY ROW_NUMBER() OVER (PARTITION BY client_id ORDER BY date_cde DESC) = 1` (m08).",
        "Une liste 'A1;B2;C3' dans une colonne : `CROSS APPLY STRING_SPLIT(codes, ';')`, puis la jointure sur `value` (Snowflake : `LATERAL SPLIT_TO_TABLE`). Un tableau JSON : `LATERAL FLATTEN` ; un champ : `doc:client_id::NUMBER`.",
        "Snowflake accepte `JOIN … USING (societe, num_cde)` (colonnes de même nom), pas SQL Server. `NATURAL JOIN` joint sur toutes les colonnes de même nom, même `date_maj` : à éviter.",
        "Des clés du même type et du même format : avec `VARCHAR = INT`, SQL Server convertit le texte, plante sur 'A12' et perd l'index (la table des matières de la table) ; '0042' n'égale pas '42'. Pas de fonction autour : `LEFT(a.code, 6)` perd aussi l'index.",
        "Autre base du même serveur : `Divalto.dbo.client` (base.schéma.table). Si les collations diffèrent : « Cannot resolve the collation conflict » ; ajoute `COLLATE French_CI_AS` dans le ON. Snowflake : `BASE.SCHEMA.TABLE`.",
        "Plans SQL Server : Nested Loops (petite entrée, index en face), Merge Join (entrées triées), Hash Match (gros volumes). Une clé étrangère ne crée pas d'index : indexe-la. `OR` ou `LIKE '%…%'` dans le ON : lent.",
        "Sur Snowflake, un index ne soigne pas une grosse jointure : il sert aux recherches très sélectives. Lis le Query Profile (le plan d'exécution détaillé) : lignes qui explosent, débordement sur disque. Puis filtre tôt."
      ],
      retenir: "Des clés du même type, du même format, sans fonction autour : la jointure reste juste et rapide."
    }
  ],
  differences: [
    ["Comparer deux clés texte", "Selon la collation", "Exacte"],
    ["Espaces de fin", "Ignorés", "Comptés"],
    ["`JOIN … USING (col)`", "Non", "Oui"],
    ["`NATURAL JOIN`", "Non", "Oui, à éviter"],
    ["Sous-requête par ligne", "`CROSS` / `OUTER APPLY`", "`LATERAL`"],
    ["Dernière ligne par groupe", "`APPLY` + `TOP (1)`", "`QUALIFY ROW_NUMBER()`"],
    ["Liste en lignes", "`STRING_SPLIT`", "`SPLIT_TO_TABLE`"],
    ["Accélérer une jointure", "Index sur la clé", "Filtrer tôt"],
    ["Jointure lente", "Plan d'exécution", "Query Profile"]
  ]
};
