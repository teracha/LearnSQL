// Parcours SQL — Cours complet du module m06 « Sous-requêtes et CTE » (12/11/2026), écrit à partir de sa fiche de
// révision (data/fiches/m06.js, l'ancien cours court) et des 100 questions (data/m06-sous-requetes.js).
// Squelette du modèle m02 v2 : Exemple (qui MONTRE le piège) → Résultat → « Ce qui se passe » → « Pourquoi » → « Le
// piège » (l'erreur vue en entreprise) → « Le bon réflexe » → « SQL Server / Snowflake » ou « Et aussi » → À retenir.
// Chaque mot technique est expliqué à sa première apparition.
// Base d'exemple : docs/base-exemple.sql. Résultats recalculés avec SQLite (scratchpad cours-complets/m06/verif.py ;
// DATEADD → date(j, '+1 day'), CAST decimal(5,2) → ROUND(x, 2)) : commandes des 2 fiches Piscines Dumont avec IN
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
// sous-requête interdite dans GROUP BY (q80), Left Semi Join dans le plan (q65, q66 : résumés dans « Détails utiles »).
LEARNSQL.cours.m06 = {
  intro: "Ton contrôle « commandes livrées sans facture » tient-il en une requête, ou en trois exports collés dans Excel ? Une sous-requête (une requête entre parenthèses, dans une autre) pose la question d'un coup. Une CTE (un `WITH`) découpe un calcul en étapes nommées, lisibles de haut en bas. Ce module montre où placer chacune, et leurs pièges : la sous-requête qui plante le jour où une 2e ligne arrive, la colonne prise dans la mauvaise table sans erreur, le « jamais » mal écrit, la récursion sans fin.",
  sections: [
    {
      titre: "La sous-requête scalaire : une seule valeur",
      exemple: "-- Voulu : les commandes de Piscines Dumont (2 fiches : 2 agences)\n-- Piège : erreur 512, la sous-requête rend 2 id\nSELECT num_cde FROM dbo.commande\nWHERE client_id = (SELECT id FROM dbo.client WHERE nom = 'Piscines Dumont');\n\n-- Juste : IN accepte une liste (résultat ci-dessous)\nSELECT num_cde, client_id, montant_ht\nFROM dbo.commande\nWHERE client_id IN (SELECT id FROM dbo.client WHERE nom = 'Piscines Dumont');",
      resultat: [["num_cde", "client_id", "montant_ht"], ["CDE-1002", 2, "1290.00"], ["CDE-1006", 2, "1290.00"], ["CDE-1008", 6, "79.80"]],
      points: [
        "Ce qui se passe : la 1re requête plante : « Subquery returned more than 1 value » (erreur 512). La 2e renvoie les 3 commandes des deux agences.",
        "Pourquoi : après `=` ou `>`, la sous-requête doit rendre une seule valeur (1 ligne, 1 colonne) : on la dit scalaire. `(SELECT AVG(montant_ht) FROM dbo.commande)` en rend une. Le nom « Piscines Dumont » en rend deux, et le moteur refuse de choisir.",
        "Le piège : la requête marche des mois, puis plante le jour où une 2e ligne arrive : une 2e agence, un 2e taux de TVA. Et une sous-requête qui ne trouve rien vaut NULL, pas 0 : `SET ca = (SELECT SUM(…) …)` met NULL aux clients sans commande.",
        "Le bon réflexe : IN quand plusieurs valeurs sont possibles. Sinon, garantis une seule ligne : une clé unique (`code = 'C002'`), un agrégat (MAX, SUM), ou `TOP (1)` avec `ORDER BY`. Pour le cas vide : `COALESCE((SELECT SUM(…) …), 0)`.",
        "Et aussi : sans lien avec la ligne en cours, elle est calculée une fois : la même moyenne sur chaque ligne. Elle va partout où va une valeur, jusque dans HAVING (le CA d'un client face à la moyenne des CA). Snowflake suit la même règle."
      ],
      retenir: "Après `=`, une sous-requête rend une seule valeur, sinon erreur ; si elle ne trouve rien, elle vaut NULL. Plusieurs valeurs possibles : IN."
    },
    {
      titre: "La sous-requête corrélée : une valeur par ligne",
      exemple: "-- La dernière commande de chaque pisciniste français (résultat ci-dessous)\nSELECT cl.code, cl.nom,\n       (SELECT MAX(co.date_cde) FROM dbo.commande AS co\n        WHERE co.client_id = cl.id) AS derniere_cde\nFROM dbo.client AS cl\nWHERE cl.pays = 'FR' AND cl.type = 'PRO';\n\n-- Piège : ligne_cde n'a pas de colonne code… et aucune erreur\nSELECT code FROM dbo.article\nWHERE code IN (SELECT code FROM dbo.ligne_cde);   -- les 8 articles sortent",
      resultat: [["code", "nom", "derniere_cde"], ["C002", "Piscines Dumont", "2026-04-03"], ["C003", "Bleu Lagon", "2026-03-12"], ["C004", "Hydro Sud", "2026-04-01"], ["C006", "Piscines Dumont", "2026-04-10"], ["C007", "Camping Les Flots", null]],
      points: [
        "Ce qui se passe : une date par client, chacun la sienne. Camping Les Flots n'a jamais commandé : sa case est NULL, mais il reste dans la liste. La 2e requête rend les 8 articles, même la pompe jamais vendue.",
        "Pourquoi : la sous-requête lit `cl.id`, une colonne de la requête du dessus : elle est corrélée (liée à la ligne en cours). En logique, elle est recalculée pour chaque client. Une colonne qu'elle ne trouve pas chez elle, le moteur va la chercher au-dessus.",
        "Le piège : la 2e requête. `ligne_cde` n'a pas de colonne `code` : le moteur prend celle d'`article` et teste « mon code est dans (mon code, mon code…) », toujours vrai. Pas d'erreur, et un rapport faux.",
        "Le bon réflexe : préfixe chaque colonne par son alias, surtout dans une sous-requête : `l.code` donne une vraie erreur (nom de colonne non valide). Sur un gros volume, un `LEFT JOIN` vers `(SELECT client_id, MAX(date_cde) … GROUP BY client_id)` donne la même réponse en une lecture.",
        "SQL Server / Snowflake : Snowflake ne garantit la sous-requête corrélée que dans le WHERE. Ailleurs, il peut répondre « Unsupported subquery type » : réécris avec une jointure, ou une fonction de fenêtrage (un calcul sur un groupe qui garde chaque ligne, module m08)."
      ],
      retenir: "Corrélée = elle lit une colonne du dessus et change à chaque ligne. Préfixe toutes les colonnes : une colonne oubliée se lie toute seule."
    },
    {
      titre: "EXISTS et IN : « au moins un », sans doublon",
      exemple: "-- Les clients qui ont au moins une commande livrée\nSELECT cl.code, cl.nom, cl.ville\nFROM dbo.client AS cl\nWHERE EXISTS (SELECT 1\n              FROM dbo.commande AS co\n              WHERE co.client_id = cl.id\n                AND co.statut = 'LIVREE');\n-- Piège : un JOIN dbo.commande à la place du EXISTS sort AquaBleu 2 fois",
      resultat: [["code", "nom", "ville"], ["C001", "AquaBleu", "Lyon"], ["C002", "Piscines Dumont", "Grenoble"], ["C006", "Piscines Dumont", "Lyon"]],
      points: [
        "Ce qui se passe : 3 clients, chacun une fois. AquaBleu a 2 commandes livrées, mais il ne sort qu'une fois. Avec un JOIN, il sortirait 2 fois, et un DISTINCT ajouté cacherait le souci.",
        "Pourquoi : EXISTS répond à « y a-t-il au moins une ligne ? ». Le moteur s'arrête à la 1re commande trouvée : une seule suffit pour dire oui. Il ne lit pas le SELECT : `SELECT 1` est une habitude, `SELECT *` fait pareil.",
        "Le piège : oublier le lien `co.client_id = cl.id`. La sous-requête ne dépend plus du client : dès qu'une commande livrée existe quelque part, EXISTS est vrai pour les 7 clients. Pas d'erreur, et une liste fausse.",
        "Le bon réflexe : pour « ceux qui ont au moins un… », EXISTS ou IN : `cl.id IN (SELECT client_id FROM dbo.commande WHERE statut = 'LIVREE')`. Ni JOIN + DISTINCT, ni `COUNT(*) > 0`, qui compte tout pour rien. Un DISTINCT dans le IN ne sert à rien.",
        "SQL Server / Snowflake : le IN de SQL Server compare une seule colonne ; pour deux, EXISTS (Snowflake accepte `(a, b) IN (SELECT …)`). Un drapeau `CASE WHEN EXISTS (…) THEN 'Actif' ELSE 'Inactif' END` marche sur SQL Server ; Snowflake n'accepte l'EXISTS lié que dans le WHERE."
      ],
      retenir: "EXISTS = « au moins une ligne ? » : il s'arrête à la première et ne crée aucun doublon. Sans le lien vers la ligne du dessus, il dit oui à tout le monde."
    },
    {
      titre: "NOT EXISTS : « jamais » et « sans »",
      exemple: "-- Les articles qu'AquaBleu (client 1) n'a JAMAIS commandés\nSELECT a.code, a.libelle\nFROM dbo.article AS a\nWHERE NOT EXISTS (SELECT 1\n                  FROM dbo.ligne_cde AS l\n                  JOIN dbo.commande AS co ON co.id = l.cde_id\n                  WHERE l.article_id = a.id AND co.client_id = 1);\n-- Piège : JOIN … WHERE co.client_id <> 1 rend les articles commandés\n-- par un AUTRE client : CHL-5 et FIL-14 sortent, POMP-1 manque",
      resultat: [["code", "libelle"], ["POMP-1", "Pompe 1 CV"], ["ROB-X", "Robot électrique X"], ["EPU-F", "Épuisette de fond"]],
      points: [
        "Ce qui se passe : 3 articles. Pour chacun, le moteur cherche une ligne de commande d'AquaBleu ; il n'en trouve aucune, donc NOT EXISTS est vrai. La pompe sort aussi : personne ne l'a jamais commandée.",
        "Pourquoi : « jamais » porte sur tout l'historique, pas sur une ligne. `client_id <> 1` juge une ligne à la fois : il garde un article dès qu'un autre client l'a commandé, même si AquaBleu l'a commandé aussi.",
        "Le piège : NOT IN. Un seul NULL dans la liste, et il rend 0 ligne, sans erreur (module m02 : le flux EDI rejeté, sans commande). Et une clé NULL ne trouve jamais de partenaire : `NULL IN (…)` n'est jamais vrai, EXISTS non plus.",
        "Le bon réflexe : NOT EXISTS pour « jamais », « sans », « pas encore ». Contrôle de fin de mois : les commandes livrées sans facture, `NOT EXISTS (SELECT 1 FROM dbo.facture AS f WHERE f.cde_id = co.id)`. « A mais jamais B » : un EXISTS, AND un NOT EXISTS.",
        "Et aussi : un import relançable n'insère que les codes absents : `INSERT … SELECT … FROM stg_article AS s WHERE NOT EXISTS (SELECT 1 FROM dbo.article AS a WHERE a.code = s.code)`. Relancé, il n'ajoute rien."
      ],
      retenir: "« Jamais », « sans », « pas encore » : NOT EXISTS, qui juge tout l'historique, sans le piège du NULL de NOT IN. Ni `<>`, ni NOT IN."
    },
    {
      titre: "Table dérivée et CTE : un nom pour chaque étape",
      exemple: "WITH ca_client AS (                 -- étape 1 : le CA de chaque client\n  SELECT client_id, SUM(montant_ht) AS ca\n  FROM dbo.commande\n  WHERE statut <> 'ANNULEE'\n  GROUP BY client_id\n),\ntotal AS (SELECT SUM(ca) AS ca_total FROM ca_client)   -- étape 2 : lit l'étape 1\nSELECT cc.client_id, cc.ca,\n       CAST(100 * cc.ca / t.ca_total AS decimal(5,2)) AS part_pct\nFROM ca_client AS cc CROSS JOIN total AS t;",
      resultat: [["client_id", "ca", "part_pct"], [1, "15115.00", "83.54"], [2, "2580.00", "14.26"], [4, "318.00", "1.76"], [6, "79.80", "0.44"]],
      points: [
        "Ce qui se passe : 4 clients et leur part du CA ; AquaBleu (client 1) pèse 83,54 %. L'étape 1 calcule le CA de chaque client, l'étape 2 additionne ces CA, la requête finale divise l'un par l'autre.",
        "Pourquoi : une CTE (une requête à qui `WITH` donne un nom) se lit ensuite comme une table. Elle permet ce qu'une seule requête refuse : additionner des totaux, filtrer sur un alias. La table dérivée, `FROM (SELECT …) AS t`, fait pareil, écrite au milieu.",
        "Le piège : une CTE n'est pas un cache. Citée deux fois, SQL Server la calcule deux fois, et elle disparaît après l'instruction qui la suit. Sur SQL Server, l'instruction d'avant doit finir par `;`, sinon WITH plante (erreur 319) : d'où le `;WITH`.",
        "Le bon réflexe : un seul WITH, des étapes séparées par des virgules ; chacune lit celles d'avant. Pour déboguer, finis par `SELECT * FROM ca_client` : tu vérifies chaque étape. Un gros résultat relu plusieurs fois : une table temporaire `#t` (Détails utiles).",
        "Et aussi : chaque colonne doit avoir un nom (`AS ca`) ; une table dérivée, un alias (`AS t`) ; pas d'ORDER BY dedans sans TOP, le tri va dans la requête finale. Snowflake accepte un alias dans le WHERE : il a moins besoin d'étapes que SQL Server."
      ],
      retenir: "Une CTE = une étape avec un nom, lue de haut en bas : un seul WITH, des virgules, un `;` devant sur SQL Server. Elle vit le temps d'une instruction, sans garder son résultat."
    },
    {
      titre: "CTE et ROW_NUMBER : une ligne par groupe",
      exemple: "-- La plus grosse commande de chaque client : une seule, même à égalité\nWITH r AS (\n  SELECT client_id, num_cde, montant_ht,\n         ROW_NUMBER() OVER (PARTITION BY client_id\n                            ORDER BY montant_ht DESC, id DESC) AS rn\n  FROM dbo.commande\n  WHERE statut <> 'ANNULEE'\n)\nSELECT client_id, num_cde, montant_ht FROM r WHERE rn = 1;",
      resultat: [["client_id", "num_cde", "montant_ht"], [1, "CDE-1007", "7950.00"], [2, "CDE-1006", "1290.00"], [4, "CDE-1005", "318.00"], [6, "CDE-1008", "79.80"]],
      points: [
        "Ce qui se passe : une ligne par client. Piscines Dumont (client 2) a deux commandes à 1 290 € : le 2e critère, `id DESC`, les départage, et CDE-1006 gagne. La commande annulée de Bleu Lagon est écartée avant.",
        "Pourquoi : ROW_NUMBER numérote les lignes de chaque client (`PARTITION BY`) dans l'ordre demandé. Il est calculé au SELECT, donc après le WHERE : pour filtrer sur `rn = 1`, il faut une étape au-dessus.",
        "Le piège : une jointure sur `MAX(montant_ht)` garde les ex aequo (les lignes à égalité) : Piscines Dumont sort 2 fois. RANK aussi : il donne 1 aux deux. Et sans 2e critère, ROW_NUMBER choisit au hasard : le rapport change d'un jour à l'autre.",
        "Le bon réflexe : CTE + ROW_NUMBER + un critère de départage, puis `rn = 1`. `rn <= 3` donne le top 3 de chaque client. `rn > 1` désigne les doublons : `WITH d AS (…) DELETE FROM d WHERE rn > 1` dédoublonne un import, après un SELECT de contrôle.",
        "SQL Server / Snowflake : Snowflake filtre sans étape : `QUALIFY ROW_NUMBER() OVER (…) = 1` (QUALIFY = le WHERE des fenêtres). Il ne supprime pas à travers une CTE : on réécrit la table, `INSERT OVERWRITE INTO t SELECT * FROM t QUALIFY … = 1`."
      ],
      retenir: "Une ligne par groupe : CTE + ROW_NUMBER avec un critère de départage, puis `rn = 1`. La jointure sur MAX et RANK gardent les ex aequo."
    },
    {
      titre: "La CTE récursive : une série de jours, un arbre",
      exemple: "-- Un jour par ligne, du 1er au 5 avril (Snowflake : WITH RECURSIVE, '2026-04-01')\nWITH jours (jour) AS (\n  SELECT CAST('20260401' AS date)            -- l'ancre : le départ\n  UNION ALL\n  SELECT DATEADD(day, 1, jour) FROM jours     -- la partie récursive : + 1 jour\n  WHERE jour < '20260405'                     -- l'arrêt\n)\nSELECT j.jour, COUNT(co.id) AS nb_cde\nFROM jours AS j LEFT JOIN dbo.commande AS co ON co.date_cde = j.jour\nGROUP BY j.jour ORDER BY j.jour;",
      resultat: [["jour", "nb_cde"], ["2026-04-01", 1], ["2026-04-02", 0], ["2026-04-03", 1], ["2026-04-04", 0], ["2026-04-05", 0]],
      points: [
        "Ce qui se passe : une ligne par jour, même sans commande (0), grâce au LEFT JOIN. Le dernier tour part du 4 et ajoute le 5 : l'arrêt porte sur la valeur AVANT l'ajout. Avec `<=`, le tour du 5 ajouterait le 6.",
        "Pourquoi : une CTE récursive (qui se relit elle-même) a deux parties, empilées par UNION ALL. L'ancre donne la 1re ligne. La partie récursive repart des lignes du tour d'avant ; le moteur s'arrête quand elle ne trouve plus rien.",
        "Le piège : des données en boucle (A contient B, B contient A), ou un arrêt oublié. SQL Server s'arrête à 100 niveaux, sur l'erreur 530 ; Snowflake tourne, et se facture, jusqu'au délai maximum de la requête.",
        "Le bon réflexe : un compteur garde-fou, `1 AS niveau` dans l'ancre, puis `niveau + 1` et `WHERE niveau < 20`. Un calendrier d'un an dépasse 100 niveaux : `OPTION (MAXRECURSION 400)` en fin de requête. `MAXRECURSION 0` enlève toute limite : jamais sans garde-fou.",
        "Et aussi : un arbre se parcourt pareil. L'ancre prend la racine (le PDG : `manager_id IS NULL`) ; la partie récursive joint la table à la CTE : `ON s.manager_id = r.id` pour descendre, `ON s.id = r.manager_id` pour monter. Nomenclature : 4 panneaux × 6 vis = 24 vis par kit."
      ],
      retenir: "Récursive = ancre UNION ALL partie récursive, jusqu'à ce que plus rien de nouveau n'arrive. Toujours un arrêt et un garde-fou : 100 niveaux au plus sur SQL Server."
    },
    {
      titre: "Détails utiles",
      points: [
        "Garder un résultat : `WITH … SELECT … INTO #t FROM …` crée une table temporaire, calculée une fois, avec ses statistiques. Jointe souvent, indexe-la (un index : la table des matières de la table). Elle disparaît à la fin de la procédure, ou de la session.",
        "La variable table (`DECLARE @t TABLE`) n'a pas de statistiques : l'optimiseur (le module qui choisit le plan) sous-estime ses lignes. Bien pour quelques lignes ; pour du volume, `#t`.",
        "Une vue (une requête enregistrée dans la base) est permanente et partagée ; une CTE vit le temps d'une requête. Une vue peut contenir un WITH ; un WITH ne peut pas en contenir un autre : enchaîne les étapes.",
        "Le dernier prix ET sa date : `OUTER APPLY (SELECT TOP (1) … ORDER BY date_effet DESC)` rend plusieurs colonnes en une lecture. Une table dérivée ne peut pas lire une autre table du même FROM : c'est le rôle d'APPLY (Snowflake : `LATERAL`).",
        "Générer des lignes sans récursion : `GENERATE_SERIES(1, 100)` sur SQL Server 2022 (niveau de compatibilité 160) ; `TABLE(GENERATOR(ROWCOUNT => 365))`, numéroté par `ROW_NUMBER()`, sur Snowflake. Le plus simple reste une vraie table calendrier.",
        "Afficher un arbre dans l'ordre : construis un chemin (`CAST(nom AS varchar(1000))` dans l'ancre, le même CAST à chaque ajout) et trie dessus. Même type et même longueur des deux côtés, sinon SQL Server refuse.",
        "Partie récursive sur SQL Server : ni LEFT JOIN, ni GROUP BY, TOP, DISTINCT ou agrégat ; récursion d'abord, calculs ensuite. Indexe la colonne parent. Snowflake parcourt aussi un arbre avec `START WITH … CONNECT BY … PRIOR`.",
        "Dans le plan d'exécution (le chemin choisi par le moteur), IN et EXISTS deviennent une semi-jointure (une jointure sans doublon), NOT EXISTS une anti-semi-jointure. Une sous-requête n'est pas plus lente par nature : écris clair, le plan tranche."
      ],
      retenir: "EXISTS pour « existe-t-il ? », CTE pour des étapes lisibles, `#t` pour un gros résultat relu, vue pour une logique partagée."
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
