// Parcours SQL — Cours complet du module m08 « Fonctions de fenêtrage », version 1 (12/11/2026).
// Écrit à partir de la fiche de révision (data/fiches/m08.js, l'ancien cours court) et des 100 « retenir » de
// data/m08-fenetrage.js. Squelette validé par l'élève (m02 v2) : Exemple (qui MONTRE le piège) → Résultat → « Ce qui se
// passe » → « Pourquoi » → « Le piège » (l'erreur vue en entreprise) → « Le bon réflexe » → « SQL Server / Snowflake »
// ou « Et aussi » → À retenir. Chaque mot technique est expliqué à sa première apparition. Renvoie aux cours publiés au
// lieu de les réexpliquer : m01 (ordre d'exécution), m03 (division entière), m04 (GROUP BY, doublons de SIREN), m05
// (calendrier en LEFT JOIN), m06 (CTE, ROW_NUMBER puis rn = 1, parts du CA).
// Résultats recalculés avec SQLite 3.45 sur docs/base-exemple.sql (scratchpad cours-complets/m08 : verif_cours.py rejoue
// les 7 exemples TELS QU'ÉCRITS ; DATEDIFF → julianday, CAST decimal → ROUND, '20260401' → '2026-04-01' ; 30 lignes,
// 0 écart ; plus 17 requêtes pour les chiffres des points) : total et part par client (31.62, 15.78, 52.60, 50.00 ;
// total_client additionné : 45345) ; rangs hors EDI (ROW_NUMBER 1 à 5 ; RANK 1, 1, 3, 4, 5 ; DENSE_RANK 1, 1, 2, 3, 4 ;
// rang = 1 : 2 lignes ; NTILE(4) sur 10 lignes : 3, 3, 2, 2) ; doublons de SIREN (C002, C006 ; sans IS NOT NULL : C003 et
// C005 en plus) ; vue numérotée puis filtrée sur AquaBleu (1, 3, 7 ; filtrée avant : 1, 2, 3) ; LAG du montant et jours
// (NULL, 7, 29 ; NULL, 29 ; sans PARTITION BY, CDE-1002 face à CDE-1001) ; cumul par défaut et ROWS (2580 deux fois ;
// 1290 puis 2580) ; moyenne mobile d'avril (318, 804, 3186, 3106.60) et LAST_VALUE (la ligne courante ; avec le cadre
// complet, CDE-1008 partout, comme Snowflake sans cadre) ; part et rang des clients (83.54, 14.26, 1.76, 0.44 : les
// parts de m06).
// Faits vérifiés dans la doc, faute d'équivalent SQLite : erreurs 4108 et 4109 de SQL Server (SQLite refuse aussi :
// « misuse of window function ») ; SUM(montant_ht) OVER () dans un GROUP BY refusé par SQL Server (SQLite l'accepte) ;
// LAST_VALUE sans cadre sur Snowflake.
// Sources (lues le 12/11/2026) : learn.microsoft.com/sql : t-sql/queries/select-over-clause-transact-sql (avec ORDER BY,
// cadre par défaut RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW ; RANGE sans n PRECEDING ni n FOLLOWING ; pas de
// DISTINCT avec OVER ; NULL = plus petite valeur ; exemple C : les NULL forment une partition ; index (PARTITION BY puis
// ORDER BY) INCLUDE), t-sql/functions/last-value-transact-sql (exemple A : la ligne courante et ses ex aequo ; IGNORE
// NULLS 2022+), lag-transact-sql et lead-transact-sql (décalage 1, défaut NULL, IGNORE NULLS 2022+),
// row-number-transact-sql (ORDER BY obligatoire ; ordre non garanti entre ex aequo), ntile-transact-sql (les groupes
// plus gros d'abord), string-agg-transact-sql (pas d'OVER), relational-databases/errors-events/
// database-engine-events-and-errors-4000-to-4999 (4108, 4109), t-sql/queries/select-window-transact-sql (WINDOW, 2022,
// niveau 160), t-sql/queries/select-qualify-clause-transact-sql (QUALIFY : Fabric seulement, pas SQL Server).
// docs.snowflake.com/en (pages lues en .md avec curl) : sql-reference/functions-window-syntax (SUM, COUNT, MIN, MAX :
// RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW par défaut ; FIRST_VALUE, LAST_VALUE, NTH_VALUE : toute la fenêtre,
// écart avec la norme ANSI ; RANGE avec n PRECEDING ou un INTERVAL), functions/last_value, functions/lag (IGNORE NULLS,
// valeur par défaut), functions/count (COUNT(DISTINCT) OVER accepté, même avec ORDER BY sur une colonne),
// constructs/qualify (après les fenêtres, alias du SELECT), functions/median, functions/listagg, functions/ratio_to_report,
// functions/conditional_change_event, functions/conditional_true_event (LAG et LEAD permis dans la condition),
// functions/datediff (unité sans guillemets), user-guide/performance-query-warehouse-memory (débordement sur disque :
// warehouse plus grand ou lots plus petits).
// Notions testées par une seule question, laissées à leur explication (règle 6 de docs/plan-sql.md) : « avant moi »
// 1 PRECEDING (q32), MAX cumulatif (q33), détecter un changement (q47), ORDER BY (SELECT NULL) (q49), UPDATE à travers
// une CTE (q53), WINDOW (q71), NULL dans le tri (q77, vu en m01), DENSE_RANK comme numéro de groupe (q78), écart à la
// moyenne du groupe (q80), COUNT cumulé = ROW_NUMBER (q84), cumul de valeurs distinctes (q85). Couverture des 100
// « retenir » : scratchpad cours-complets/m08/couverture.txt.
// Questions à corriger, signalées au superviseur : q51, q52, q85 (Snowflake accepte COUNT(DISTINCT x) OVER (… ORDER BY …)
// sur une seule colonne : docs.snowflake.com functions/count).
// Relecture testeur (12/11/2026, scratchpad cours-complets/relecture-m08 : outils/recalcul.py, outils/points.py,
// changements.txt) : 7 exemples (30 lignes) et 42 requêtes SQLite, 0 écart. Corrigés : S2 NTILE « presque égaux en
// lignes » (3, 3, 2, 2 ; ntile-transact-sql) ; S3 m04 « une ligne par SIREN » ; S5 cumuls « peuvent changer » (q99) ;
// S6 `RANGE BETWEEN 6 PRECEDING` (colonne DATE : n = jours ; TIMESTAMP : INTERVAL obligatoire ; window-syntax,
// data-types-datetime) ; DU astuce « DENSE_RANK croissant + décroissant - 1 ». NULL d'un PARTITION BY = une partition :
// OVER exemple C (SQL Server), functions/max et functions/min (Snowflake). MEDIAN et QUALIFY T-SQL : Fabric seulement.
LEARNSQL.cours.m08 = {
  intro: "Ton rapport Power BI doit montrer chaque commande avec le total de son client, son rang et l'écart avec la précédente : combien de requêtes ? Une seule. Une fonction de fenêtrage (`OVER`) calcule sur un groupe de lignes sans les fusionner, au contraire de `GROUP BY`. Ce module montre ses pièges silencieux : ex aequo tirés au sort, cumul qui saute, « dernière » valeur fausse.",
  sections: [
    {
      titre: "OVER : le détail et le total sur la même ligne",
      exemple: "-- Chaque commande, le total de son client et sa part\nSELECT client_id, num_cde, montant_ht,\n       SUM(montant_ht) OVER (PARTITION BY client_id) AS total_client,\n       CAST(100.0 * montant_ht / SUM(montant_ht) OVER (PARTITION BY client_id)\n            AS decimal(5,2)) AS part_pct\nFROM dbo.commande\nWHERE client_id IN (1, 2)\nORDER BY client_id, num_cde;",
      resultat: [["client_id", "num_cde", "montant_ht", "total_client", "part_pct"], [1, "CDE-1001", "4780.00", "15115.00", "31.62"], [1, "CDE-1003", "2385.00", "15115.00", "15.78"], [1, "CDE-1007", "7950.00", "15115.00", "52.60"], [2, "CDE-1002", "1290.00", "2580.00", "50.00"], [2, "CDE-1006", "1290.00", "2580.00", "50.00"]],
      regle: "Pour chaque ligne, une fonction de fenêtrage (`OVER`) regarde un groupe de lignes : sa fenêtre. Elle y calcule un total, un rang ou une moyenne, et pose le résultat sur la ligne. Au contraire de GROUP BY, rien n'est fusionné : on garde le détail, avec son contexte à côté. `PARTITION BY` fait une fenêtre « par … » : par client, par mois ; `OVER ()`, vide, prend tout le résultat. Attention : un total de groupe se répète sur chaque ligne ; additionner cette colonne le compte plusieurs fois.",
      points: [
        "Ce qui se passe : les 5 commandes restent, chacune avec le total de son client : 15 115 € pour AquaBleu, 2 580 € pour Piscines Dumont (client 2). CDE-1007 pèse 52,60 % du CA d'AquaBleu.",
        "Pourquoi : `PARTITION BY client_id` fait une fenêtre (un groupe de lignes) par client, comme GROUP BY (m04), mais sans fusionner. GROUP BY rendrait 2 lignes, sans `num_cde` ; OVER garde chaque ligne.",
        "Le piège : `total_client` se répète sur les 3 commandes d'AquaBleu : si Power BI l'additionne, il affiche 45 345 € au lieu de 15 115 €. Avec `OVER ()`, vide, la part porte sur tout le résultat, pas sur le client.",
        "Le bon réflexe : une ligne par groupe : GROUP BY ; le détail et le total : OVER. Dans Power BI, n'additionne pas une colonne de fenêtre. Sur des entiers, `100.0 *` évite la division entière (m03).",
        "SQL Server / Snowflake : même écriture. Snowflake donne aussi la part, entre 0 et 1, avec `RATIO_TO_REPORT(montant_ht) OVER (…)`."
      ],
      retenir: "GROUP BY fusionne les lignes ; OVER les garde et ajoute le calcul du groupe. PARTITION BY = « par … »."
    },
    {
      titre: "ROW_NUMBER, RANK, DENSE_RANK : les ex aequo",
      exemple: "-- Commandes hors EDI, dont 2 ex aequo à 1 290 €\nSELECT num_cde, montant_ht,\n       ROW_NUMBER() OVER (ORDER BY montant_ht DESC, id DESC) AS rn,\n       RANK()       OVER (ORDER BY montant_ht DESC) AS rang,\n       DENSE_RANK() OVER (ORDER BY montant_ht DESC) AS rang_dense\nFROM dbo.commande\nWHERE canal <> 'EDI'\nORDER BY rn;\n-- Piège : sans id DESC, le n° 1 est tiré au sort",
      resultat: [["num_cde", "montant_ht", "rn", "rang", "rang_dense"], ["CDE-1006", "1290.00", 1, 1, 1], ["CDE-1002", "1290.00", 2, 1, 1], ["CDE-1004", "549.00", 3, 3, 2], ["CDE-1005", "318.00", 4, 4, 3], ["CDE-1008", "79.80", 5, 5, 4]],
      regle: "ROW_NUMBER, RANK et DENSE_RANK numérotent les lignes selon l'ORDER BY de la fenêtre. Ils ne diffèrent que s'il y a des ex aequo, des lignes à égalité dans ce tri. On choisit alors selon le besoin : une ligne par numéro (ROW_NUMBER), ou les ex aequo au même rang (RANK, DENSE_RANK). Pour une seule ligne, le tri doit être unique : ajoute un départage, comme l'id. Sinon, ROW_NUMBER tire au sort entre les ex aequo, et le résultat peut changer d'une exécution à l'autre.",
      points: [
        "Ce qui se passe : CDE-1006 et CDE-1002 valent 1 290 €. ROW_NUMBER les numérote 1 et 2 ; RANK, 1 et 1, puis saute à 3 ; DENSE_RANK, 1 et 1, puis 2, sans trou.",
        "Pourquoi : ROW_NUMBER donne un numéro unique ; RANK, le même rang aux ex aequo, puis il saute les places prises ; DENSE_RANK compte les valeurs différentes.",
        "Le piège : sans départage, ROW_NUMBER tire au sort entre ex aequo : CDE-1002 est n° 1 un jour, n° 2 le lendemain. Et `rang = 1` rend 2 lignes : le total de « la meilleure commande » double.",
        "Le bon réflexe : une seule ligne : ROW_NUMBER, avec un départage unique (l'id). Tous les ex aequo : RANK. Les 3 plus gros montants différents, ex aequo compris : `DENSE_RANK() <= 3`.",
        "Et aussi : `NTILE(4) OVER (ORDER BY …)` découpe en 4 groupes presque égaux en lignes (quartiles) : 10 lignes donnent 3, 3, 2, 2. L'ORDER BY de la fenêtre ne trie pas l'affichage : garde un ORDER BY final."
      ],
      retenir: "ROW_NUMBER : unique, avec un départage. RANK : ex aequo, puis un trou. DENSE_RANK : ex aequo, sans trou."
    },
    {
      titre: "Filtrer sur une fenêtre : une étape au-dessus",
      exemple: "-- Piège : WHERE COUNT(*) OVER (…) > 1 plante (erreur 4108)\n-- Juste : les doublons, avec leur détail\nWITH c AS (SELECT code, nom, ville, COUNT(*) OVER (PARTITION BY siren) AS nb\n           FROM dbo.client\n           WHERE siren IS NOT NULL)   -- sinon, les 2 SIREN NULL font une paire\nSELECT code, nom, ville, nb FROM c WHERE nb > 1 ORDER BY code;",
      resultat: [["code", "nom", "ville", "nb"], ["C002", "Piscines Dumont", "Grenoble", 2], ["C006", "Piscines Dumont", "Lyon", 2]],
      regle: "Une fenêtre se calcule au SELECT, après le WHERE, le GROUP BY et le HAVING. Le WHERE ne peut donc pas la lire : elle n'existe pas encore. Pour filtrer sur son résultat, il faut une étape de plus. Une CTE (une requête nommée, avec `WITH`) calcule la fenêtre ; la requête du dessus filtre ensuite. Avant le calcul, un filtre retire des lignes à la fenêtre ; après, il laisse le calcul intact. Sur Snowflake, `QUALIFY` fait ce filtre en une seule requête.",
      points: [
        "Ce qui se passe : la fenêtre dans le WHERE plante. La CTE compte les fiches de chaque SIREN (`nb`) : les 2 Piscines Dumont sortent, avec leur ville. Le GROUP BY de m04 rendait une ligne par SIREN.",
        "Pourquoi : c'est l'ordre de calcul de m01. La CTE (m06), une étape au-dessus, lit `nb` comme une colonne.",
        "Le piège : une fenêtre ne voit que les lignes gardées par le WHERE de sa requête. Une vue numérote les 8 commandes par date ; filtrée ensuite sur AquaBleu, elle rend 1, 3, 7, pas 1, 2, 3.",
        "Le bon réflexe : « la dernière commande de chaque client » : `ROW_NUMBER() OVER (PARTITION BY client_id ORDER BY date_cde DESC, id DESC)`, puis `rn = 1` au-dessus (m06). Le top 3 : `rn <= 3` ; avec les ex aequo : RANK.",
        "SQL Server / Snowflake : Snowflake a `QUALIFY`, le WHERE des fenêtres, qui lit l'alias : `QUALIFY nb > 1`, sans étape. SQL Server n'a pas QUALIFY : une fenêtre n'y va que dans le SELECT ou l'ORDER BY."
      ],
      retenir: "Une fenêtre se calcule au SELECT, jamais dans le WHERE. Filtre-la au-dessus : CTE puis WHERE (SQL Server), QUALIFY (Snowflake)."
    },
    {
      titre: "LAG et LEAD : la ligne d'avant, la ligne d'après",
      exemple: "-- Chaque commande, face à la précédente du client\nSELECT client_id, num_cde, montant_ht,\n       LAG(montant_ht) OVER (PARTITION BY client_id ORDER BY date_cde) AS cde_avant,\n       DATEDIFF(day, LAG(date_cde) OVER (PARTITION BY client_id ORDER BY date_cde),\n                date_cde) AS jours\nFROM dbo.commande\nWHERE client_id IN (1, 2)\nORDER BY client_id, date_cde;",
      resultat: [["client_id", "num_cde", "montant_ht", "cde_avant", "jours"], [1, "CDE-1001", "4780.00", null, null], [1, "CDE-1003", "2385.00", "4780.00", 7], [1, "CDE-1007", "7950.00", "2385.00", 29], [2, "CDE-1002", "1290.00", null, null], [2, "CDE-1006", "1290.00", "1290.00", 29]],
      regle: "LAG lit une valeur sur la ligne d'avant, LEAD sur celle d'après, selon l'ORDER BY de la fenêtre. On s'en sert pour comparer une ligne à sa voisine : une hausse de prix, un délai entre deux commandes. Avec PARTITION BY, la voisine est toujours prise dans le même groupe. Au bord du groupe, elle n'existe pas : LAG et LEAD rendent NULL, ou la valeur par défaut donnée. Tout calcul qui suit doit prévoir ce cas.",
      points: [
        "Ce qui se passe : chaque commande voit le montant de la précédente du même client, et les jours écoulés depuis. La 1re commande de chaque client n'a pas de précédente : NULL.",
        "Pourquoi : avec `PARTITION BY client_id`, LAG et LEAD ne sortent jamais du client.",
        "Le piège : sans PARTITION BY, CDE-1002 serait comparée à CDE-1001, une commande d'AquaBleu. Et le NULL de la 1re ligne : un CASE « Hausse / Baisse » avec `ELSE 'Stable'` la classe « Stable », à tort.",
        "Le bon réflexe : `LAG(montant_ht, 1, 0)` : décalage d'1 ligne, 0 au lieu de NULL. Évolution en % : `(x - LAG(x) OVER (…)) * 100.0 / NULLIF(LAG(x) OVER (…), 0)`. `LEAD(date_cde) … IS NULL`, testé au-dessus, repère la dernière commande.",
        "Et aussi : LAG compte des lignes, pas des mois. `LAG(ca, 12)` ne donne le même mois l'an dernier que si aucun mois ne manque : pars d'un calendrier complet (LEFT JOIN, m05)."
      ],
      retenir: "LAG = la ligne d'avant, LEAD = celle d'après, sans sortir de la partition. 1re ligne : NULL, ou la valeur par défaut."
    },
    {
      titre: "Le cumul : ROWS, pas le cadre par défaut",
      exemple: "-- Pareto : CA cumulé, de la plus grosse commande à la plus petite\nSELECT num_cde, montant_ht,\n       SUM(montant_ht) OVER (ORDER BY montant_ht DESC) AS cumul_defaut,\n       SUM(montant_ht) OVER (ORDER BY montant_ht DESC, id DESC\n                             ROWS UNBOUNDED PRECEDING) AS cumul_rows\nFROM dbo.commande\nWHERE canal <> 'EDI'\nORDER BY montant_ht DESC, id DESC;",
      resultat: [["num_cde", "montant_ht", "cumul_defaut", "cumul_rows"], ["CDE-1006", "1290.00", "2580.00", "1290.00"], ["CDE-1002", "1290.00", "2580.00", "2580.00"], ["CDE-1004", "549.00", "3129.00", "3129.00"], ["CDE-1005", "318.00", "3447.00", "3447.00"], ["CDE-1008", "79.80", "3526.80", "3526.80"]],
      regle: "Un cumul additionne tout ce qui précède la ligne, et la ligne elle-même : un CA cumulé, un solde de stock. Il s'écrit avec SUM et un ORDER BY dans OVER. Le cadre (les lignes qui entrent dans le calcul) décide alors du résultat. Celui par défaut traite les ex aequo ensemble : ils reçoivent tous le même cumul, d'un coup. `ROWS UNBOUNDED PRECEDING`, lui, avance d'une ligne à la fois. Avec un tri unique, comme la date puis l'id, le cumul ne change plus d'une exécution à l'autre.",
      points: [
        "Ce qui se passe : dans `cumul_defaut`, CDE-1006 affiche déjà 2 580 € : les deux ex aequo sont cumulés d'un coup. `cumul_rows` monte ligne par ligne : 1 290, puis 2 580.",
        "Pourquoi : sans cadre écrit, le moteur prend `RANGE … CURRENT ROW` : la ligne et ses ex aequo.",
        "Le piège : un solde de stock cumulé par date, avec deux mouvements le même jour : les deux lignes affichent le solde du soir. Avec ROWS sans départage, les cumuls entre ex aequo peuvent changer d'une exécution à l'autre.",
        "Le bon réflexe : `ROWS UNBOUNDED PRECEDING` (du début à la ligne courante), avec un ORDER BY unique (`date_mvt, id`). Un cumul qui repart à zéro chaque année, ou par article : ajoute `PARTITION BY`.",
        "Et aussi : même défaut (RANGE) sur SQL Server et Snowflake. Analyse ABC : ce cumul × 100.0 / `SUM(montant_ht) OVER ()` donne le % cumulé ; classe A jusqu'à 80 %."
      ],
      retenir: "Un cumul : ROWS UNBOUNDED PRECEDING et un départage. Le cadre par défaut (RANGE) cumule les ex aequo d'un coup."
    },
    {
      titre: "Le cadre : moyenne mobile et LAST_VALUE",
      exemple: "-- Les commandes d'avril\nSELECT num_cde, montant_ht,\n       AVG(montant_ht) OVER (ORDER BY date_cde\n                             ROWS BETWEEN 2 PRECEDING AND CURRENT ROW) AS moy_3,\n       LAST_VALUE(num_cde) OVER (ORDER BY date_cde) AS derniere\nFROM dbo.commande\nWHERE date_cde >= '20260401'   -- Snowflake : '2026-04-01'\nORDER BY date_cde;\n-- Résultat SQL Server ; Snowflake : CDE-1008 partout",
      resultat: [["num_cde", "montant_ht", "moy_3", "derniere"], ["CDE-1005", "318.00", "318.00", "CDE-1005"], ["CDE-1006", "1290.00", "804.00", "CDE-1006"], ["CDE-1007", "7950.00", "3186.00", "CDE-1007"], ["CDE-1008", "79.80", "3106.60", "CDE-1008"]],
      regle: "Le cadre prend des lignes avant la ligne courante (`PRECEDING`), après elle (`FOLLOWING`), ou jusqu'au bout de la fenêtre (`UNBOUNDED`). Un cadre qui glisse avec la ligne, comme « les 2 d'avant et elle-même », fait une moyenne mobile. Sans cadre écrit, chaque moteur applique son défaut. Pour LAST_VALUE, ce défaut n'est pas le même sur SQL Server et sur Snowflake. La règle : écris toujours le cadre, et pour la vraie dernière valeur, va jusqu'au bout de la fenêtre.",
      points: [
        "Ce qui se passe : `moy_3` fait la moyenne de la ligne et des 2 d'avant ; pour CDE-1007 : (318 + 1 290 + 7 950) / 3 = 3 186 €. Sur SQL Server, `derniere` répète la commande de la ligne : seule la dernière voit CDE-1008.",
        "Pourquoi : le cadre choisit les lignes du calcul : ici, les 2 d'avant et la ligne courante. Sans cadre écrit, SQL Server s'arrête à la ligne courante (et ses ex aequo) : la « dernière », c'est elle.",
        "Le piège : migrée sur Snowflake, la même requête rend CDE-1008 partout, sans erreur : sans cadre, Snowflake prend toute la fenêtre pour FIRST_VALUE et LAST_VALUE. Deux moteurs, deux résultats.",
        "Le bon réflexe : écris toujours le cadre. Dernière valeur : `ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING`, ou FIRST_VALUE avec `ORDER BY date_cde DESC`. Moyenne sur 7 jours : `6 PRECEDING`, sur un calendrier complet (un jour sans vente n'a pas de ligne).",
        "Et aussi : `ROWS BETWEEN 1 FOLLOWING AND UNBOUNDED FOLLOWING` prend les lignes d'après (un reste à payer). Un cadre en jours, pas en lignes : `RANGE BETWEEN 6 PRECEDING …` marche sur Snowflake (colonne DATE) ; SQL Server le refuse."
      ],
      retenir: "Écris toujours le cadre. LAST_VALUE sans cadre : la ligne courante sur SQL Server, toute la fenêtre sur Snowflake."
    },
    {
      titre: "Fenêtres et GROUP BY : part et rang des clients",
      exemple: "-- CA, part et rang de chaque client, en une requête\nSELECT client_id, SUM(montant_ht) AS ca,\n       CAST(100.0 * SUM(montant_ht) / SUM(SUM(montant_ht)) OVER ()\n            AS decimal(5,2)) AS part_pct,\n       RANK() OVER (ORDER BY SUM(montant_ht) DESC) AS rang\nFROM dbo.commande\nWHERE statut <> 'ANNULEE'\nGROUP BY client_id\nORDER BY rang;",
      resultat: [["client_id", "ca", "part_pct", "rang"], [1, "15115.00", "83.54", 1], [2, "2580.00", "14.26", 2], [4, "318.00", "1.76", 3], [6, "79.80", "0.44", 4]],
      regle: "Avec un GROUP BY, les fenêtres passent après le regroupement : elles voient une ligne par groupe. Elles ne lisent donc que ce que le GROUP BY rend : les colonnes groupées et les agrégats (SUM, COUNT…). Le total de tous les groupes s'écrit ainsi `SUM(SUM(x)) OVER ()` : une somme de sommes. À l'inverse, une fenêtre ne peut entrer ni dans un agrégat, ni dans une autre fenêtre. Il faut alors deux étapes.",
      points: [
        "Ce qui se passe : une ligne par client, avec sa part du CA et son rang : AquaBleu pèse 83,54 %, 1er. Ce sont les parts de m06, sans CTE.",
        "Pourquoi : les fenêtres passent après le GROUP BY : elles voient les 4 lignes de clients. `SUM(montant_ht)` est le CA d'un client ; `SUM(SUM(montant_ht)) OVER ()` additionne ces 4 CA. RANK classe sur l'agrégat.",
        "Le piège : `SUM(montant_ht) OVER ()` seul plante ici, car `montant_ht` n'est ni groupé ni agrégé. Une fenêtre dans un agrégat, ou dans une autre fenêtre (`SUM(ROW_NUMBER() OVER (…))`), plante aussi (erreur 4109).",
        "Le bon réflexe : sur des groupes, enveloppe l'agrégat : `SUM(SUM(ca)) OVER (PARTITION BY annee)` met le total de l'année sur chaque mois. Une fenêtre sur une fenêtre : deux étapes, une CTE par fenêtre.",
        "Et aussi : classer dans chaque mois : `RANK() OVER (PARTITION BY mois ORDER BY SUM(montant_ht) DESC)`. Puis, à l'étape suivante, `LAG(rang)` dit qui gagne des places."
      ],
      retenir: "Les fenêtres passent après le GROUP BY : `SUM(SUM(x)) OVER ()` = le total des groupes. Une fenêtre sur une fenêtre : deux étapes."
    },
    {
      titre: "Détails utiles",
      points: [
        "Des jours consécutifs (îlots) : `DATEADD(day, -ROW_NUMBER() OVER (ORDER BY jour), jour)` reste constant tant que les jours se suivent. À l'étape suivante, `GROUP BY` dessus : début (MIN), fin (MAX), durée (COUNT).",
        "Des séries de même statut : deux ROW_NUMBER soustraits (`ORDER BY heure`, et `PARTITION BY statut ORDER BY heure`). Des sessions (une pause de plus de 30 min en ouvre une) : un drapeau 1 / 0 avec LAG, puis son SUM cumulé. Snowflake : `CONDITIONAL_CHANGE_EVENT`, `CONDITIONAL_TRUE_EVENT`.",
        "Le dernier prix connu, pour les jours vides : `COALESCE(prix, LAG(prix) IGNORE NULLS OVER (…))` (Snowflake, SQL Server 2022). Avant 2022 : `COUNT(prix)` cumulé fait un groupe par prix connu, puis `MAX(prix)` par groupe.",
        "Médiane par client : `PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY montant_ht) OVER (PARTITION BY client_id)` sur SQL Server, `MEDIAN(montant_ht) OVER (…)` sur Snowflake. `PERCENT_RANK` : la position, de 0 à 1 ; `CUME_DIST` : la part des lignes ≤ la ligne.",
        "Refusés dans OVER sur SQL Server, acceptés sur Snowflake : `COUNT(DISTINCT x)` (astuce SQL Server : DENSE_RANK croissant + décroissant - 1) et la concaténation, `LISTAGG … OVER` (SQL Server : GROUP BY, puis jointure).",
        "Vitesse (SQL Server) : un index sur (colonnes du PARTITION BY, puis de l'ORDER BY) INCLUDE (colonnes lues) évite souvent le tri du plan. Snowflake qui déborde sur disque : filtre avant, ou un warehouse plus grand."
      ],
      retenir: "Îlots, sessions, dernière valeur connue : une fenêtre par étape, puis GROUP BY ou filtre au-dessus."
    }
  ],
  differences: [
    ["Filtrer une fenêtre", "CTE, puis `WHERE`", "`QUALIFY`"],
    ["`LAST_VALUE` sans cadre", "Jusqu'à la ligne courante", "Toute la fenêtre"],
    ["`RANGE` + `n PRECEDING`", "Refusé", "Accepté"],
    ["`COUNT(DISTINCT x) OVER`", "Refusé", "Accepté"],
    ["Part du total", "`x / SUM(x) OVER ()`", "`RATIO_TO_REPORT(x)`"],
    ["Médiane en fenêtre", "`PERCENTILE_CONT(0.5)` + `OVER`", "`MEDIAN(x) OVER`"],
    ["Concaténer en fenêtre", "Impossible", "`LISTAGG … OVER`"],
    ["Îlots de valeurs", "Deux `ROW_NUMBER`", "`CONDITIONAL_CHANGE_EVENT`"],
    ["Dernière valeur connue", "`IGNORE NULLS` (2022+)", "`IGNORE NULLS`"]
  ]
};
