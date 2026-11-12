// Parcours SQL — Cours complet du module m06 « Sous-requêtes et CTE » (12/11/2026), écrit à partir de sa fiche de
// révision (data/fiches/m06.js, l'ancien cours court) et des 100 questions (data/m06-sous-requetes.js).
// Squelette du modèle m02 v2 : Exemple (qui MONTRE le piège) → Résultat → « Ce qui se passe » → « Pourquoi » → « Le
// piège » (l'erreur vue en entreprise) → « Le bon réflexe » → « SQL Server / Snowflake » ou « Et aussi » → À retenir.
// Chaque mot technique est expliqué à sa première apparition.
// Base d'exemple : docs/base-exemple.sql. Résultats recalculés avec SQLite (scratchpad cours-complets/m06 : verif.py, et
// verif_cours.py qui rejoue les exemples tels qu'écrits ; DATEADD → date(j, '+1 day'), CAST decimal(5,2) → ROUND(x, 2))
// : commandes des 2 fiches Piscines Dumont avec IN
// (3 lignes ; la sous-requête rend bien 2 id) ; dernière commande des 5 PRO français (Camping Les Flots → NULL) ;
// colonne empruntée `code IN (SELECT code FROM ligne_cde)` → les 8 articles (7 vendus en vrai) ; clients avec une
// commande livrée (EXISTS et IN : 3 ; JOIN : 4 lignes, AquaBleu 2 fois ; EXISTS sans lien : 7) ; articles jamais
// commandés par AquaBleu (POMP-1, ROB-X, EPU-F ; piège `<>` : ROB-X, FIL-14, CHL-5, EPU-F) ; part du CA hors annulées
// (15115.00 → 83.54, 2580.00 → 14.26, 318.00 → 1.76, 79.80 → 0.44) ; plus grosse commande par client (ROW_NUMBER : 4
// lignes, CDE-1006 gagne au départage ; jointure sur MAX et RANK : 5 lignes) ; jours du 1er au 5 avril (1, 0, 1, 0, 0 ;
// avec <= : jusqu'au 6) ; calendrier 2026 : 365 lignes, 364 niveaux récursifs (au-delà de 100 : MAXRECURSION).
// Faits sans équivalent SQLite, vérifiés à la main et dans la doc : erreur 512 (SQLite prend la 1re ligne), types SQL
// Server du calcul de part (decimal(38,2) puis decimal(38,6), CAST arrondit à 2 décimales).
// Sources (vérifiées le 12/11/2026) : learn.microsoft.com/sql : relational-databases/performance/subqueries (scalaire,
// colonne non trouvée cherchée dans la requête extérieure « without error », EXISTS, ORDER BY seulement avec TOP),
// t-sql/queries/with-common-table-expression-transact-sql (CTE non matérialisée, ré-exécutée à chaque référence ; `;`
// avant WITH ; pas de WITH imbriqué ; ORDER BY seulement avec TOP ou OFFSET ; ancre UNION ALL partie récursive, mêmes
// types ; interdits de la partie récursive ; MAXRECURSION 0 à 32767, 100 par défaut ; WITH dans une vue), errors-events
// 0 à 999 (512, 530, 319, 144, 467) et 1000 à 1999 (1033), t-sql/functions/generate-series-transact-sql (2022, niveau
// 160), t-sql/statements/create-table-transact-sql (durée de vie des #tables), t-sql/language-elements/
// declare-local-variable-transact-sql (variable table sans statistiques). docs.snowflake.com (par extraits de
// recherche, le site n'étant pas joignable) : user-guide/querying-subqueries (corrélée garantie seulement dans WHERE ;
// plus d'une ligne = erreur), sql-reference/operators-subquery (EXISTS corrélé : WHERE seulement), sql-reference/
// constructs/with et user-guide/queries-cte (RECURSIVE conseillé, liste de colonnes obligatoire, UNION ALL, boucle
// jusqu'à STATEMENT_TIMEOUT_IN_SECONDS), constructs/connect-by, functions/generator et seq1 (ROW_NUMBER sans trou).
// Faits déjà vérifiés sur le site (consignes, nov. 2026) : Snowflake refuse LIMIT dans une sous-requête liée (LATERAL).
// Notions testées par une seule question, laissées à l'explication de la question (règle 6) : sous-requête dans ORDER BY
// (q79), « tous les… » par division (q90), cumul par sous-requête corrélée (q93), UPDATE à travers une CTE (q36),
// sous-requête interdite dans GROUP BY (q80), DISTINCT inutile dans un IN (q88), plan de NOT IN (q66), contrôle
// en-tête / lignes par SUM corrélée (q98). Couverture des 100 « retenir » : scratchpad cours-complets/m06/couverture.txt.
LEARNSQL.cours.m06 = {
  intro: "Ton contrôle « commandes livrées sans facture » tient-il en une requête, ou en trois exports collés dans Excel ? Une sous-requête (une requête entre parenthèses, dans une autre) pose la question d'un coup ; une CTE (un `WITH`) découpe le calcul en étapes nommées. Ce module montre leurs pièges : la sous-requête qui plante un jour, la colonne prise dans la mauvaise table, le « jamais » mal écrit, la récursion sans fin.",
  sections: [
    {
      titre: "La sous-requête scalaire : une seule valeur",
      exemple: "-- Piège : erreur 512, 2 fiches « Piscines Dumont » (2 agences) = 2 id\nSELECT num_cde FROM dbo.commande\nWHERE client_id = (SELECT id FROM dbo.client WHERE nom = 'Piscines Dumont');\n\n-- Juste : IN accepte une liste (résultat ci-dessous)\nSELECT num_cde, client_id, montant_ht\nFROM dbo.commande\nWHERE client_id IN (SELECT id FROM dbo.client WHERE nom = 'Piscines Dumont');",
      resultat: [["num_cde", "client_id", "montant_ht"], ["CDE-1002", 2, "1290.00"], ["CDE-1006", 2, "1290.00"], ["CDE-1008", 6, "79.80"]],
      points: [
        "Ce qui se passe : la 1re requête plante : « Subquery returned more than 1 value » (erreur 512). La 2e renvoie les 3 commandes des deux agences.",
        "Pourquoi : après `=` ou `>`, la sous-requête doit rendre une seule valeur : on la dit scalaire. `(SELECT AVG(montant_ht) FROM dbo.commande)` en rend une ; « Piscines Dumont » en rend deux, et le moteur refuse de choisir.",
        "Le piège : la requête marche des mois, puis plante quand une 2e ligne arrive (un 2e taux de TVA). Et une sous-requête vide vaut NULL, pas 0 : `SET ca = (SELECT SUM(…))` met NULL aux clients sans commande.",
        "Le bon réflexe : IN si plusieurs valeurs sont possibles. Sinon, garantis une ligne : une clé unique (`code = 'C002'`), un agrégat (MAX, SUM) ou `TOP (1)` avec `ORDER BY`. Et `COALESCE(…, 0)` pour le cas vide.",
        "Et aussi : sans lien avec la ligne, elle est calculée une fois. Elle va partout où va une valeur, jusque dans HAVING (un CA client face à la moyenne des CA)."
      ],
      retenir: "Après `=`, une sous-requête rend une seule valeur, sinon erreur ; vide, elle vaut NULL. Plusieurs valeurs : IN."
    },
    {
      titre: "La sous-requête corrélée : une valeur par ligne",
      exemple: "-- La dernière commande de chaque pisciniste français (résultat ci-dessous)\nSELECT cl.code, cl.nom,\n       (SELECT MAX(co.date_cde) FROM dbo.commande AS co\n        WHERE co.client_id = cl.id) AS derniere_cde\nFROM dbo.client AS cl\nWHERE cl.pays = 'FR' AND cl.type = 'PRO';\n\n-- Piège : ligne_cde n'a pas de colonne code, et pourtant pas d'erreur\nSELECT code FROM dbo.article\nWHERE code IN (SELECT code FROM dbo.ligne_cde);",
      resultat: [["code", "nom", "derniere_cde"], ["C002", "Piscines Dumont", "2026-04-03"], ["C003", "Bleu Lagon", "2026-03-12"], ["C004", "Hydro Sud", "2026-04-01"], ["C006", "Piscines Dumont", "2026-04-10"], ["C007", "Camping Les Flots", null]],
      points: [
        "Ce qui se passe : chaque client a sa date ; Camping Les Flots, sans commande, a NULL mais reste dans la liste. La 2e requête rend les 8 articles, même la pompe jamais vendue.",
        "Pourquoi : la sous-requête lit `cl.id`, une colonne du dessus : elle est corrélée (liée à la ligne en cours), recalculée en logique pour chaque client. Si une colonne manque dans sa table, le moteur la cherche au-dessus.",
        "Le piège : la 2e requête. Sans colonne `code` dans `ligne_cde`, le moteur prend celle d'`article` et teste « mon code est dans (mon code…) » : toujours vrai. Pas d'erreur, un rapport faux.",
        "Le bon réflexe : préfixe chaque colonne par l'alias de sa table : avec `l.code`, l'oubli donne une vraie erreur. Sur un gros volume, un `LEFT JOIN` vers une sous-requête groupée répond pareil, en une lecture.",
        "SQL Server / Snowflake : Snowflake ne garantit la corrélée que dans le WHERE ; ailleurs, il répond parfois « Unsupported subquery type ». Réécris avec une jointure, ou une fonction de fenêtrage (module m08) : `AVG(montant_ht) OVER (PARTITION BY client_id)` pose la moyenne du client sur chaque ligne."
      ],
      retenir: "Corrélée = elle lit une colonne du dessus, donc change à chaque ligne. Préfixe toutes les colonnes."
    },
    {
      titre: "EXISTS et IN : « au moins un », sans doublon",
      exemple: "-- Les clients qui ont au moins une commande livrée\nSELECT cl.code, cl.nom, cl.ville\nFROM dbo.client AS cl\nWHERE EXISTS (SELECT 1 FROM dbo.commande AS co\n              WHERE co.client_id = cl.id\n                AND co.statut = 'LIVREE');\n-- Piège : un JOIN dbo.commande à la place sort AquaBleu 2 fois",
      resultat: [["code", "nom", "ville"], ["C001", "AquaBleu", "Lyon"], ["C002", "Piscines Dumont", "Grenoble"], ["C006", "Piscines Dumont", "Lyon"]],
      points: [
        "Ce qui se passe : 3 clients, chacun une fois. AquaBleu a 2 commandes livrées, mais sort une fois. Un JOIN le sortirait 2 fois.",
        "Pourquoi : EXISTS demande « y a-t-il au moins une ligne ? » et s'arrête à la 1re trouvée. Il ne lit pas le SELECT : `SELECT 1` est une habitude, `SELECT *` fait pareil.",
        "Le piège : oublier le lien `co.client_id = cl.id`. La sous-requête ne dépend plus du client : une commande livrée quelque part, et EXISTS est vrai pour les 7 clients, sans erreur.",
        "Le bon réflexe : EXISTS ou IN (`cl.id IN (SELECT client_id …)`) pour « ceux qui ont au moins un… ». Ni JOIN + DISTINCT, ni `COUNT(*) > 0`, qui compte tout pour rien.",
        "SQL Server / Snowflake : `CASE WHEN EXISTS (…) THEN 'Actif' ELSE 'Inactif' END` marche sur SQL Server ; Snowflake n'accepte l'EXISTS lié que dans le WHERE. Le IN de SQL Server compare une seule colonne : pour deux, EXISTS."
      ],
      retenir: "EXISTS = « au moins une ligne ? », sans doublon. Toujours avec le lien vers la ligne du dessus."
    },
    {
      titre: "NOT EXISTS : « jamais » et « sans »",
      exemple: "-- Les articles qu'AquaBleu (client 1) n'a JAMAIS commandés\nSELECT a.code, a.libelle\nFROM dbo.article AS a\nWHERE NOT EXISTS (SELECT 1\n                  FROM dbo.ligne_cde AS l\n                  JOIN dbo.commande AS co ON co.id = l.cde_id\n                  WHERE l.article_id = a.id AND co.client_id = 1);\n-- Piège : JOIN … WHERE co.client_id <> 1 sort CHL-5 et FIL-14, oublie POMP-1",
      resultat: [["code", "libelle"], ["POMP-1", "Pompe 1 CV"], ["ROB-X", "Robot électrique X"], ["EPU-F", "Épuisette de fond"]],
      points: [
        "Ce qui se passe : 3 articles. Pour chacun, le moteur cherche une ligne de commande d'AquaBleu et n'en trouve pas : NOT EXISTS est vrai. La pompe sort aussi : personne ne l'a commandée.",
        "Pourquoi : « jamais » porte sur tout l'historique. `client_id <> 1` juge une ligne à la fois : il garde un article dès qu'un autre client l'a commandé, même si AquaBleu l'a commandé aussi.",
        "Le piège : NOT IN. Un seul NULL dans la liste, et il rend 0 ligne, sans erreur (module m02). Et une clé NULL ne trouve jamais de partenaire : `NULL IN (…)` n'est jamais vrai, EXISTS non plus.",
        "Le bon réflexe : NOT EXISTS pour « jamais », « sans », « pas encore ». Les commandes livrées sans facture : `NOT EXISTS (SELECT 1 FROM dbo.facture AS f WHERE f.cde_id = co.id)`. « A mais jamais B » : EXISTS AND NOT EXISTS.",
        "Et aussi : un import relançable : `INSERT … SELECT … FROM stg_article AS s WHERE NOT EXISTS (… a.code = s.code)`. Il n'insère que les codes absents ; relancé, il n'ajoute rien."
      ],
      retenir: "« Jamais », « sans » : NOT EXISTS. Ni `<>`, qui juge une seule ligne, ni NOT IN, piégé par un NULL."
    },
    {
      titre: "Table dérivée et CTE : un nom pour chaque étape",
      exemple: "WITH ca_client AS (               -- étape 1 : le CA de chaque client\n  SELECT client_id, SUM(montant_ht) AS ca\n  FROM dbo.commande WHERE statut <> 'ANNULEE'\n  GROUP BY client_id\n),\ntotal AS (SELECT SUM(ca) AS ca_total FROM ca_client)   -- étape 2 : lit l'étape 1\nSELECT cc.client_id, cc.ca,\n       CAST(100 * cc.ca / t.ca_total AS decimal(5,2)) AS part_pct\nFROM ca_client AS cc CROSS JOIN total AS t;   -- 2e lecture de ca_client",
      resultat: [["client_id", "ca", "part_pct"], [1, "15115.00", "83.54"], [2, "2580.00", "14.26"], [4, "318.00", "1.76"], [6, "79.80", "0.44"]],
      points: [
        "Ce qui se passe : la part de chaque client dans le CA ; AquaBleu pèse 83,54 %. L'étape 1 calcule le CA par client, l'étape 2 les additionne, la requête finale divise.",
        "Pourquoi : une CTE (une requête nommée par `WITH`) se lit ensuite comme une table : on y filtre un alias, on y additionne des totaux. La table dérivée, `FROM (SELECT …) AS t`, fait pareil, au milieu.",
        "Le piège : une CTE n'est pas un cache. Citée deux fois, comme ici, SQL Server la calcule deux fois ; elle meurt avec l'instruction qui la suit. Sur SQL Server, l'instruction d'avant doit finir par `;`, sinon WITH plante : d'où le `;WITH`.",
        "Le bon réflexe : un seul WITH, des étapes séparées par des virgules ; chacune lit celles d'avant. Pour déboguer, finis par `SELECT * FROM ca_client`. Un gros résultat relu souvent : une table temporaire `#t`.",
        "Et aussi : chaque colonne a un nom (`AS ca`, ou une liste en tête : `WITH ca_client (client_id, ca) AS`), la table dérivée un alias (`AS t`), et pas d'ORDER BY dedans sans TOP. Snowflake accepte un alias dans le WHERE : moins d'étapes."
      ],
      retenir: "CTE = une étape nommée, lue de haut en bas : un WITH, des virgules, `;` devant. Pas un cache."
    },
    {
      titre: "CTE et ROW_NUMBER : une ligne par groupe",
      exemple: "-- La plus grosse commande de chaque client : une seule, même à égalité\nWITH r AS (\n  SELECT client_id, num_cde, montant_ht,\n         ROW_NUMBER() OVER (PARTITION BY client_id\n                            ORDER BY montant_ht DESC, id DESC) AS rn\n  FROM dbo.commande\n  WHERE statut <> 'ANNULEE'\n)\nSELECT client_id, num_cde, montant_ht FROM r WHERE rn = 1;",
      resultat: [["client_id", "num_cde", "montant_ht"], [1, "CDE-1007", "7950.00"], [2, "CDE-1006", "1290.00"], [4, "CDE-1005", "318.00"], [6, "CDE-1008", "79.80"]],
      points: [
        "Ce qui se passe : une ligne par client. Piscines Dumont (client 2) a deux commandes à 1 290 € : le 2e critère, `id DESC`, les départage ; CDE-1006 gagne.",
        "Pourquoi : ROW_NUMBER numérote les lignes de chaque client (`PARTITION BY`) dans l'ordre demandé. Il est calculé au SELECT, après le WHERE : pour filtrer `rn = 1`, il faut une étape au-dessus.",
        "Le piège : une jointure sur `MAX(montant_ht)` garde les ex aequo (à égalité) : Piscines Dumont sort 2 fois ; RANK aussi. Sans 2e critère, ROW_NUMBER choisit au hasard : le rapport varie d'un jour à l'autre.",
        "Le bon réflexe : CTE + ROW_NUMBER + départage, puis `rn = 1` ; `rn <= 3` pour le top 3. Dédoublonner un import : `WITH d AS (…) DELETE FROM d WHERE rn > 1`, après un SELECT de contrôle.",
        "SQL Server / Snowflake : Snowflake filtre sans étape, `QUALIFY ROW_NUMBER() OVER (…) = 1` (le WHERE des fenêtres). Il ne supprime pas à travers une CTE : `INSERT OVERWRITE INTO t SELECT * FROM t QUALIFY … = 1`."
      ],
      retenir: "Une ligne par groupe : CTE + ROW_NUMBER avec un départage, puis `rn = 1`. MAX et RANK gardent les ex aequo."
    },
    {
      titre: "La CTE récursive : une série de jours, un arbre",
      exemple: "-- Un jour par ligne, du 1er au 5 avril (Snowflake : WITH RECURSIVE, '2026-04-01')\nWITH jours (jour) AS (\n  SELECT CAST('20260401' AS date)            -- l'ancre\n  UNION ALL\n  SELECT DATEADD(day, 1, jour) FROM jours     -- la partie récursive\n  WHERE jour < '20260405'                     -- l'arrêt\n)\nSELECT j.jour, COUNT(co.id) AS nb_cde\nFROM jours AS j LEFT JOIN dbo.commande AS co ON co.date_cde = j.jour\nGROUP BY j.jour ORDER BY j.jour;",
      resultat: [["jour", "nb_cde"], ["2026-04-01", 1], ["2026-04-02", 0], ["2026-04-03", 1], ["2026-04-04", 0], ["2026-04-05", 0]],
      points: [
        "Ce qui se passe : une ligne par jour, même sans commande (0), grâce au LEFT JOIN. Le dernier tour part du 4 et ajoute le 5 : l'arrêt teste la valeur AVANT l'ajout (avec `<=`, on irait au 6).",
        "Pourquoi : une CTE récursive (qui se relit elle-même) a deux parties, empilées par UNION ALL. L'ancre donne la 1re ligne ; la partie récursive repart du tour d'avant, jusqu'à ne plus rien trouver.",
        "Le piège : un arrêt oublié, ou des données en boucle (A contient B, B contient A). SQL Server s'arrête à 100 niveaux, sur l'erreur 530 ; Snowflake tourne, et se facture, jusqu'au délai maximum.",
        "Le bon réflexe : un compteur garde-fou : `1 AS niveau`, puis `niveau + 1` et `WHERE niveau < 20`. Un calendrier d'un an : `OPTION (MAXRECURSION 400)` en fin de requête. `MAXRECURSION 0` enlève toute limite : garde le compteur.",
        "Et aussi : un arbre se parcourt pareil : l'ancre prend la racine (`manager_id IS NULL`), la partie récursive descend (`ON s.manager_id = r.id`) ou monte (`ON s.id = r.manager_id`). Nomenclature : on multiplie les quantités, 4 panneaux × 6 vis = 24 vis."
      ],
      retenir: "Récursive = ancre UNION ALL partie récursive. Toujours un arrêt et un garde-fou ; SQL Server : 100 niveaux au plus."
    },
    {
      titre: "Détails utiles",
      points: [
        "Garder un résultat : `WITH … SELECT … INTO #t FROM …` crée une table temporaire, calculée une fois ; jointe souvent, indexe-la. Elle disparaît en fin de procédure ou de session. Pour quelques lignes : `DECLARE @t TABLE`.",
        "Une vue (une requête enregistrée dans la base) est permanente et partagée ; une CTE vit le temps d'une requête. Une vue peut contenir un WITH ; un WITH, pas un autre.",
        "Le dernier prix ET sa date, en une lecture : `OUTER APPLY (SELECT TOP (1) … ORDER BY date_effet DESC)`. Une table dérivée ne peut pas lire une autre table du même FROM ; APPLY, si. Snowflake : `LATERAL`, sans LIMIT dedans, donc QUALIFY.",
        "Des lignes sans récursion : `GENERATE_SERIES(1, 100)` (SQL Server 2022, niveau de compatibilité 160) ; Snowflake : `TABLE(GENERATOR(ROWCOUNT => 365))` + `ROW_NUMBER()`. Plus simple : une table calendrier.",
        "Afficher un arbre : construis un chemin, `CAST(nom AS varchar(1000))` dans l'ancre et à chaque ajout, puis trie dessus. Même type, même longueur des deux côtés, sinon erreur.",
        "Récursion sur SQL Server : UNION ALL obligatoire ; dans la partie récursive, ni LEFT JOIN, ni GROUP BY, TOP, DISTINCT ou agrégat. Indexe la colonne parent. Snowflake a aussi `START WITH … CONNECT BY … PRIOR`.",
        "Dans le plan d'exécution (le chemin choisi par le moteur), IN et EXISTS deviennent une semi-jointure, sans doublon. Sous-requête, jointure, CTE : souvent le même plan ; écris clair."
      ],
      retenir: "EXISTS pour « existe-t-il ? », CTE pour des étapes, `#t` pour un gros résultat relu, vue pour une logique partagée."
    }
  ],
  differences: [
    ["`;` devant `WITH`", "Exigé après une instruction", "Pas exigé"],
    ["Alias dans `WHERE`", "Refusé : une étape", "Accepté"],
    ["Corrélée dans `SELECT`", "Acceptée", "Pas garantie"],
    ["`EXISTS` lié dans `SELECT`", "`CASE WHEN EXISTS`", "Refusé"],
    ["Filtrer un `ROW_NUMBER`", "Étape, puis `WHERE`", "`QUALIFY`"],
    ["Dédoublonner une table", "`DELETE` via CTE", "`INSERT OVERWRITE … QUALIFY`"],
    ["Sous-requête liée au `FROM`", "`CROSS APPLY`", "`LATERAL`"],
    ["CTE récursive", "`WITH` seul", "`WITH RECURSIVE` + colonnes"],
    ["Boucle sans fin", "Erreur à 100 niveaux", "Tourne jusqu'au délai"],
    ["Générer des lignes", "`GENERATE_SERIES` (2022)", "`GENERATOR(ROWCOUNT => n)`"]
  ]
};
