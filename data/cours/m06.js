// Parcours SQL — Cours complet du module m06 « Sous-requêtes et CTE » (12/11/2026), écrit à partir de sa fiche de
// révision (data/fiches/m06.js, l'ancien cours court) et des 100 questions (data/m06-sous-requetes.js).
// Squelette du modèle m02 v2 : Exemple (qui MONTRE le piège) → Résultat → « Ce qui se passe » → « Pourquoi » → « Le
// piège » (l'erreur vue en entreprise) → « Le bon réflexe » → « SQL Server / Snowflake » ou « Et aussi » → À retenir.
// Chaque mot technique est expliqué à sa première apparition.
// Base d'exemple : docs/base-exemple.sql, avec la table `nomenclature` (7 lignes) ajoutée pour ce cours le 12/11/2026 :
// kit filtration collectivité sur 3 niveaux, et kit couverture saisi en boucle (KIT-COUV ↔ BACHE8).
// Résultats recalculés avec SQLite (scratchpad cours-complets/m06 : verif.py, et verif_cours.py qui rejoue les exemples
// tels qu'écrits ; DATEADD → date(j, '+1 day'), CAST decimal(5,2) → ROUND(x, 2), WITH → WITH RECURSIVE) : commandes des
// 2 fiches Piscines Dumont avec IN (3 lignes ; la sous-requête rend bien 2 id) ; dernière commande des 5 PRO français
// (Camping Les Flots → NULL) ; colonne empruntée `code IN (SELECT code FROM ligne_cde)` → les 8 articles (7 vendus en
// vrai) ; clients avec une commande livrée (EXISTS et IN : 3 ; JOIN : 4 lignes, AquaBleu 2 fois ; EXISTS sans lien : 7) ;
// articles jamais commandés par AquaBleu (POMP-1, ROB-X, EPU-F ; piège `<>` : ROB-X, FIL-14, CHL-5, EPU-F) ; part du CA
// hors annulées (15115.00 → 83.54, 2580.00 → 14.26, 318.00 → 1.76, 79.80 → 0.44) ; plus grosse commande par client
// (ROW_NUMBER : 4 lignes, CDE-1006 gagne au départage ; jointure sur MAX et RANK : 5 lignes) ; explosion de KIT-COLL
// (FIL-14 2, POMP-1 1, SABLE-25 12, VANNE-6V 2, JOINT-V 4 ; niveaux 1, 1, 2, 2, 3) ; KIT-COUV avec garde-fou < 10 : 10
// lignes en boucle, sans garde-fou : ne s'arrête pas (lecture coupée à 150 niveaux) ; série d'octobre avec `< '31'` :
// 31 jours (avec <= : jusqu'au 1er novembre) ; calendrier 2026 : 365 lignes, 364 niveaux récursifs (MAXRECURSION).
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
// Relecture testeur (12/11/2026, scratchpad cours-complets/relecture-m06 : recalcul.py, changements.txt) : 39 requêtes
// SQLite, 0 écart. Corrigés : S1 pas de sous-requête dans GROUP BY (q80) ; S2 Snowflake ne garantit la corrélée que
// dans le WHERE et si elle rend une ligne à coup sûr (agrégat) (user-guide/querying-subqueries, udf-sql-troubleshooting) ;
// formes : « ligne de commande » (S4), racine (S7), INSERT OVERWRITE (S6), organigramme (S7), WITH imbriqué (DU).
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
        "Le piège : elle marche des mois, puis plante quand une 2e ligne arrive (un 2e taux de TVA). Et vide, elle vaut NULL, pas 0 : `SET ca = (SELECT SUM(…))` met NULL aux clients sans commande.",
        "Le bon réflexe : IN si plusieurs valeurs sont possibles. Sinon, garantis une ligne : une clé unique (`code = 'C002'`), un agrégat (MAX, SUM) ou `TOP (1)` avec `ORDER BY`. Et `COALESCE(…, 0)` pour le cas vide.",
        "Et aussi : sans lien avec la ligne, elle est calculée une fois. Elle va partout où va une valeur (sauf GROUP BY), jusque dans HAVING (un CA client face à la moyenne des CA)."
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
        "SQL Server / Snowflake : Snowflake ne garantit la corrélée que dans le WHERE, avec un agrégat ; sinon, « Unsupported subquery type ». Réécris en jointure, ou en fenêtrage (m08) : `AVG(montant_ht) OVER (PARTITION BY client_id)` met la moyenne du client sur chaque ligne."
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
        "Ce qui se passe : 3 articles. Pour chacun, le moteur ne trouve aucune commande d'AquaBleu qui le contient : NOT EXISTS est vrai. La pompe sort aussi : personne ne l'a commandée.",
        "Pourquoi : « jamais » porte sur tout l'historique. `client_id <> 1` juge une ligne à la fois : il garde un article dès qu'un autre client l'a commandé, même si AquaBleu l'a commandé aussi.",
        "Le piège : NOT IN. Un seul NULL dans la liste, et il rend 0 ligne, sans erreur (module m02). Et une clé NULL ne trouve jamais de partenaire : `NULL IN (…)` n'est jamais vrai, EXISTS non plus.",
        "Le bon réflexe : NOT EXISTS pour « jamais », « sans », « pas encore ». Commandes livrées sans facture : `NOT EXISTS (SELECT 1 FROM dbo.facture AS f WHERE f.cde_id = co.id)`. « A mais jamais B » : EXISTS AND NOT EXISTS.",
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
        "Et aussi : chaque colonne a un nom (`AS ca`, ou une liste en tête : `WITH t (a, b)`), la table dérivée un alias (`AS t`), et pas d'ORDER BY dedans sans TOP. Snowflake accepte un alias dans le WHERE : moins d'étapes."
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
        "Le piège : une jointure sur `MAX(montant_ht)` garde les ex aequo (à égalité) : Piscines Dumont sort 2 fois ; RANK aussi. Sans 2e critère, ROW_NUMBER choisit au hasard : le rapport peut changer d'un jour à l'autre.",
        "Le bon réflexe : CTE + ROW_NUMBER + départage, puis `rn = 1` ; `rn <= 3` pour le top 3. Dédoublonner un import : `WITH d AS (…) DELETE FROM d WHERE rn > 1`, après un SELECT de contrôle.",
        "SQL Server / Snowflake : Snowflake filtre sans étape, `QUALIFY ROW_NUMBER() OVER (…) = 1` (le WHERE des fenêtres). Il ne supprime pas à travers une CTE : on réécrit la table, `INSERT OVERWRITE INTO t SELECT * FROM t QUALIFY … = 1`."
      ],
      retenir: "Une ligne par groupe : CTE + ROW_NUMBER avec un départage, puis `rn = 1`. MAX et RANK gardent les ex aequo."
    },
    {
      titre: "La CTE récursive : exploser une nomenclature",
      exemple: "WITH eclate (composant, qte, niveau) AS (          -- Snowflake : WITH RECURSIVE\n  SELECT composant, qte, 1                         -- l'ancre : sous la racine\n  FROM dbo.nomenclature WHERE compose = 'KIT-COLL'\n  UNION ALL\n  SELECT n.composant, e.qte * n.qte, e.niveau + 1  -- descend d'un niveau\n  FROM dbo.nomenclature AS n JOIN eclate AS e ON n.compose = e.composant\n  WHERE e.niveau < 10                              -- garde-fou\n)\nSELECT composant, qte, niveau FROM eclate ORDER BY niveau, composant;\n-- Piège : lancée sur KIT-COUV (saisi en boucle) sans garde-fou : erreur 530",
      resultat: [["composant", "qte", "niveau"], ["FIL-14", 2, 1], ["POMP-1", 1, 1], ["SABLE-25", 12, 2], ["VANNE-6V", 2, 2], ["JOINT-V", 4, 3]],
      points: [
        "Ce qui se passe : les 5 composants du kit, leur quantité pour 1 kit et leur niveau. 2 filtres × 6 sacs = 12 sacs de sable ; 2 vannes × 2 joints = 4 joints (niveau 3).",
        "Pourquoi : une CTE récursive (qui se relit elle-même) a deux parties, empilées par UNION ALL : l'ancre prend ce qui est sous la racine (le kit), puis la partie récursive descend d'un niveau par tour, jusqu'à ne plus rien trouver.",
        "Le piège : une boucle dans les données. Une ligne saisie à l'envers dit que BACHE8 contient KIT-COUV, qui contient BACHE8. SQL Server s'arrête à 100 niveaux (erreur 530) ; Snowflake tourne, et se facture, jusqu'au délai maximum.",
        "Le bon réflexe : un compteur garde-fou (`1` dans l'ancre, puis `e.niveau + 1` et `WHERE e.niveau < 10`), et des quantités multipliées, jamais additionnées. Plus de 100 niveaux voulus : `OPTION (MAXRECURSION 400)` ; `MAXRECURSION 0` enlève toute limite.",
        "Et aussi : un organigramme se parcourt pareil. Pour descendre, l'ancre prend le chef (`manager_id IS NULL`), puis `ON s.manager_id = r.id`. Pour remonter, l'ancre prend un salarié, puis `ON s.id = r.manager_id`."
      ],
      retenir: "Récursive = ancre UNION ALL partie récursive, un niveau par tour. Quantités multipliées ; toujours un garde-fou."
    },
    {
      titre: "Détails utiles",
      points: [
        "Garder un résultat : `WITH … SELECT … INTO #t FROM …` crée une table temporaire, calculée une fois ; jointe souvent, indexe-la. Elle disparaît en fin de procédure ou de session. Pour quelques lignes : `DECLARE @t TABLE`.",
        "Une vue (une requête enregistrée dans la base) est permanente et partagée ; une CTE vit le temps d'une requête. Une vue peut contenir un WITH ; mais pas de WITH dans un WITH.",
        "Le dernier prix ET sa date : `OUTER APPLY (SELECT TOP (1) … ORDER BY date_effet DESC)`, en une lecture. APPLY lit une table du même FROM, ce que refuse une table dérivée. Snowflake : `LATERAL`, sans LIMIT dedans (QUALIFY).",
        "Une série de jours : ancre = le 1er jour, puis `DATEADD(day, 1, jour)` tant que `jour < '20261031'` (l'arrêt teste la valeur AVANT l'ajout). Sinon : `GENERATE_SERIES` (SQL Server 2022), `GENERATOR(ROWCOUNT => n)` (Snowflake), ou une table calendrier.",
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
