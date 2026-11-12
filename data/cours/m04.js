// Parcours SQL — Cours complet du module m04 « Agrégats et GROUP BY », version 1 (12/11/2026).
// Écrit à partir de la fiche de révision (data/fiches/m04.js, l'ancien cours court) et des 100 « retenir » de
// data/m04-agregats.js. Squelette validé par l'élève (m02 v2) : Exemple (qui MONTRE le piège) → Résultat → « Ce qui se
// passe » → « Pourquoi » → « Le piège » (l'erreur vue en entreprise) → « Le bon réflexe » → « SQL Server / Snowflake »
// ou « Et aussi » → À retenir. Chaque mot technique est expliqué à sa première apparition.
// Résultats recalculés avec SQLite sur docs/base-exemple.sql (script : scratchpad cours-complets/m04/verif.py) :
// COUNT sur client (7, 5, 4) ; mois sans commande (0, NULL) ; CA par mois hors annulées (3 / 8455.00, 4 / 9637.80) ;
// SIREN en double sans WHERE (NULL : 2 / C003, 423456789 : 2 / C002) ; agrégation conditionnelle (4 clients, nb_edi_faux
// = 2 pour le client 2) ; prix moyen de CHL-5 (37.18 en moyenne simple, 36.02 pondéré : 9293.00 / 258) ; jointure
// commande × ligne_cde (AquaBleu 30230.00 au lieu de 15115.00 ; SUM(DISTINCT) : 1290.00 au client 2) ; LEFT JOIN
// (Pool & Garden : COUNT(*) = 1, COUNT(co.id) = 0) ; ROLLUP (statut, motif) des flux ORDERS (5 lignes, émulé par
// UNION ALL, GROUPING calculé à la main). Calculés à la main, deux fois : AVG(10, 20, NULL) = 15 ; moyenne des moyennes
// 75 / 60 ; PERCENTILE_CONT(0.5) de 10, 20, 30, 40 = 25, PERCENTILE_DISC = 20 ; 3 × ROUND(0.333, 2) = 0.99,
// ROUND(0.999, 2) = 1.00.
// Notions testées par une seule question, laissées à leur explication (règle 6 de docs/plan-sql.md) : COUNT(DISTINCT a, b)
// (q46), UNPIVOT et CROSS APPLY (q62), MODE (q63), signe des avoirs (q75), SUM d'un TIME (q87), DATEPART(hour) (q88),
// COUNT(*) instantané sur Snowflake (q94), tranches FLOOR (q95), index columnstore (q100), HAVING sans GROUP BY (q34),
// ordre des colonnes du GROUP BY (q40), SUM(a + b) et NULL (q38), WHERE ou HAVING sur des avoirs (q74), aucune ligne
// avec GROUP BY sur du vide (q33), libellé d'un groupe NULL (q73), doublon sur plusieurs colonnes (q76), constante
// ou colonne groupée non affichée (q82, q83).
// Sources (vérifiées le 12/11/2026) : learn.microsoft.com/sql/t-sql : functions/aggregate-functions-transact-sql (NULL
// ignorés sauf COUNT(*)), functions/count-transact-sql (int, Msg 8115, COUNT_BIG, une seule expression après DISTINCT),
// functions/sum-transact-sql et functions/avg-transact-sql (int -> int ; bit refusé ; AVG decimal -> decimal(38, max(s,6))),
// data-types/bit-transact-sql (SUM, AVG, MIN, MAX refusent bit), queries/select-group-by-transact-sql (alias interdit ;
// NULL = un seul groupe ; GROUP BY ne trie pas ; ROLLUP, CUBE, GROUPING SETS ; GROUP BY ALL à la Snowflake : Fabric
// seulement), queries/select-having-transact-sql, functions/grouping-transact-sql (1 = ligne de total ; SELECT, HAVING,
// ORDER BY), functions/percentile-cont-transact-sql (OVER obligatoire hors Fabric), functions/median-transact-sql et
// functions/any-value-transact-sql (Fabric seulement), functions/string-agg-transact-sql (2017+, varchar(8000)),
// functions/approx-count-distinct-transact-sql (2019+), functions/datetrunc-transact-sql (2022+).
// docs.snowflake.com/en/sql-reference (par extraits de recherche, le site n'est pas joignable) : functions/avg (entier ->
// décimales), functions/count_if, functions/booland_agg, functions/any_value, functions/median, constructs/group-by
// (GROUP BY ALL, alias), constructs/having (alias), functions/listagg.
// Relecture testeur (12/11/2026) : 33 résultats recalculés avec SQLite, 0 écart. COUNT_IF : la doc Snowflake
// (functions/count_if) annonce NULL quand aucune ligne ne vérifie la condition, d'où « (sa doc : NULL si zéro) » ;
// « Toutes les lignes livrées ? » devient « Toutes les commandes livrées ? » (référence ambiguë) ; « DISTINCT ne sert à
// rien » seulement sur les mêmes colonnes (SELECT DISTINCT COUNT(*) … GROUP BY client_id dédoublonne bien, cf. q48).
LEARNSQL.cours.m04 = {
  intro: "Ton rapport Power BI donne 30 230 € de commandes à AquaBleu, Divalto 15 115 € : qui a raison ? Un agrégat (une fonction qui résume des lignes en une valeur : SUM, COUNT, AVG) calcule un total par client ou par mois. Il plante rarement : il saute les cases vides, ou additionne deux fois une ligne copiée, en silence. Ce module montre ces pièges, et comment les éviter.",
  sections: [
    {
      titre: "COUNT, SUM, AVG : les cases vides ne comptent pas",
      exemple: "SELECT COUNT(*)              AS nb_fiches,\n       COUNT(siren)          AS avec_siren,\n       COUNT(DISTINCT siren) AS societes\nFROM dbo.client;\n\n-- Piège : le 1er mai, aucune commande du mois → 0 et NULL\nSELECT COUNT(*) AS nb_cdes, SUM(montant_ht) AS ca\nFROM dbo.commande WHERE date_cde >= '20260501';   -- Snowflake : '2026-05-01'",
      resultat: [["nb_fiches", "avec_siren", "societes"], [7, 5, 4]],
      regle: "Un agrégat résume un ensemble de lignes en une seule valeur : un nombre, un total, une moyenne. Il saute les cases vides (NULL) : une case vide ne vaut pas zéro, elle ne compte pas. Seule exception, `COUNT(*)` compte toutes les lignes. Sur un ensemble vide, COUNT rend 0, mais SUM, AVG, MIN et MAX rendent NULL. Dans un rapport, `COALESCE(SUM(x), 0)` affiche donc 0 au lieu de NULL.",
      points: [
        "Ce qui se passe : 7 fiches, 5 SIREN, mais 4 sociétés : les 2 agences Piscines Dumont ont le même SIREN. Sur un mois encore vide, la 2e requête rend 0 et NULL (une case vide).",
        "Pourquoi : `COUNT(siren)` compte les valeurs renseignées, `COUNT(DISTINCT siren)` les valeurs différentes.",
        "Le piège : le 1er du mois, le rapport affiche un CA vide, et `ca - SUM(avoirs)` devient NULL. La moyenne de 10, 20 et NULL vaut 15, pas 10 : le NULL n'est pas un zéro.",
        "Le bon réflexe : `COALESCE(SUM(montant_ht), 0)` dans les rapports (COALESCE remplace un NULL, m02). `AVG(COALESCE(note, 0))` seulement si le métier dit qu'une absence vaut 0. COUNT ne rend jamais NULL : 0 sur du vide.",
        "Et aussi : clients actifs = `COUNT(DISTINCT client_id)`. `COUNT(1)` vaut `COUNT(*)`, même vitesse. MIN et MAX marchent aussi sur les textes et les dates : `MAX(date_cde)` = la dernière date."
      ],
      retenir: "COUNT(*) compte les lignes, COUNT(col) les valeurs renseignées. Les agrégats sautent les NULL ; SUM de rien = NULL : COALESCE(SUM(x), 0)."
    },
    {
      titre: "GROUP BY : une ligne par groupe",
      exemple: "-- Piège : GROUP BY MONTH(date_cde) seul mêlerait mars 2025 et mars 2026\nSELECT YEAR(date_cde) AS annee, MONTH(date_cde) AS mois,\n       COUNT(*) AS nb_cdes, SUM(montant_ht) AS ca\nFROM dbo.commande\nWHERE statut <> 'ANNULEE'\nGROUP BY YEAR(date_cde), MONTH(date_cde)\nORDER BY annee, mois;",
      resultat: [["annee", "mois", "nb_cdes", "ca"], [2026, 3, 3, "8455.00"], [2026, 4, 4, "9637.80"]],
      regle: "GROUP BY range les lignes en groupes : les lignes qui ont les mêmes valeurs dans ses colonnes vont ensemble. Le résultat compte une ligne par groupe, et chaque agrégat y donne sa valeur. Toute colonne du SELECT est donc groupée ou agrégée : sinon, le moteur ne saurait pas quelle valeur afficher. Attention : le numéro du mois seul (de 1 à 12) mélange les années. Pour un rapport mensuel, l'année doit faire partie du groupe.",
      points: [
        "Ce qui se passe : les 7 commandes non annulées donnent 2 lignes, une par mois. ORDER BY trie : GROUP BY seul ne garantit aucun ordre.",
        "Pourquoi : `SELECT client_id, canal … GROUP BY client_id` plante : le client 2 a deux canaux, lequel afficher ?",
        "Le piège : `GROUP BY MONTH(date_cde)` seul. Sur deux ans d'historique, mars 2025 et mars 2026 tombent dans le même groupe « 3 » : le rapport mensuel additionne deux années, sans erreur.",
        "Le bon réflexe : groupe par année et mois, ou par le 1er du mois : `DATETRUNC(month, date_cde)` (SQL Server 2022), `DATE_TRUNC('month', date_cde)` (Snowflake). Par jour, sur un DATETIME (date + heure) : `CAST(date_cde AS date)`.",
        "SQL Server / Snowflake : SQL Server lit GROUP BY avant SELECT : l'alias `annee` y est inconnu, répète l'expression. Snowflake accepte l'alias, `GROUP BY ALL` (toutes les colonnes non agrégées), et `ANY_VALUE(nom)` pour une valeur du groupe ; SQL Server écrit `MAX(nom)`."
      ],
      retenir: "Chaque colonne du SELECT est groupée ou agrégée. Par mois = par année ET mois ; sur SQL Server, l'expression entière, pas l'alias."
    },
    {
      titre: "WHERE ou HAVING : avant ou après les groupes",
      exemple: "-- SIREN en double : une société, plusieurs fiches\n-- Piège : il manque WHERE siren IS NOT NULL\nSELECT siren, COUNT(*) AS nb_fiches, MIN(code) AS code_garde\nFROM dbo.client\nGROUP BY siren\nHAVING COUNT(*) > 1\nORDER BY siren;",
      resultat: [["siren", "nb_fiches", "code_garde"], [null, 2, "C003"], ["423456789", 2, "C002"]],
      regle: "WHERE et HAVING filtrent tous les deux, mais pas les mêmes choses. WHERE choisit les lignes à regrouper ; HAVING choisit les groupes à garder, d'après leurs agrégats. Un test sur un agrégat, comme `COUNT(*) > 1`, va donc dans HAVING. Le reste se filtre dans WHERE, le plus tôt possible. Attention au groupe NULL : il réunit toutes les cases vides, qui n'ont souvent rien en commun. Écarte-le dès le WHERE, avec `IS NOT NULL`, quand ce n'est pas un vrai groupe.",
      points: [
        "Ce qui se passe : 2 groupes ont plus d'une fiche. 423456789 : les 2 agences Piscines Dumont, un vrai doublon. Le groupe NULL : Bleu Lagon et Pool & Garden, deux clients sans SIREN, pas un doublon.",
        "Pourquoi : WHERE juge chaque ligne, avant que les groupes existent. HAVING juge chaque groupe, une fois COUNT calculé. Et GROUP BY met tous les NULL dans un seul groupe : deux cases vides y sont pareilles.",
        "Le piège : la liste part à l'ADV, qui fusionne Bleu Lagon et Pool & Garden, deux clients différents. Autre erreur : un agrégat dans WHERE (`WHERE COUNT(*) > 1`) plante, car WHERE passe avant le comptage.",
        "Le bon réflexe : `WHERE siren IS NOT NULL`, avant de grouper. Une condition sur les lignes (statut, date) va dans WHERE : moins de lignes à grouper. HAVING sert aux conditions sur un agrégat. `MIN(code)` désigne la fiche à garder.",
        "Et aussi : nouveaux clients 2026 = `HAVING MIN(date_cde) >= '20260101'`, sans WHERE sur la date, qui rendrait « nouveaux » tous les clients de l'année. Présents en 2025 et 2026 : WHERE sur ces 2 années, puis `HAVING COUNT(DISTINCT YEAR(date_cde)) = 2`."
      ],
      retenir: "WHERE filtre les lignes avant le regroupement, HAVING filtre les groupes après. Les NULL forment un seul groupe : écarte-les si besoin."
    },
    {
      titre: "L'agrégation conditionnelle : un CASE dans l'agrégat",
      exemple: "SELECT client_id,\n       SUM(CASE WHEN statut = 'LIVREE'   THEN montant_ht ELSE 0 END) AS ca_livre,\n       SUM(CASE WHEN statut = 'EN_COURS' THEN montant_ht ELSE 0 END) AS ca_en_cours,\n       COUNT(CASE WHEN canal = 'EDI' THEN 1 END)                     AS nb_edi,\n       COUNT(CASE WHEN canal = 'EDI' THEN 1 ELSE 0 END)              AS nb_edi_faux\nFROM dbo.commande\nWHERE statut <> 'ANNULEE'\nGROUP BY client_id\nORDER BY client_id;",
      resultat: [["client_id", "ca_livre", "ca_en_cours", "nb_edi", "nb_edi_faux"], [1, "7165.00", "7950.00", 3, 3], [2, "1290.00", "1290.00", 0, 2], [4, "0.00", "318.00", 0, 1], [6, "79.80", "0.00", 0, 1]],
      regle: "L'agrégation conditionnelle met une condition dans l'agrégat, avec un CASE (un « si… alors »). Chaque ligne n'apporte sa valeur que si la condition est vraie. On calcule ainsi plusieurs totaux côte à côte, un par condition, en une seule lecture de la table. Le piège tient au ELSE : COUNT compte aussi les 0, il ne saute que les NULL. Un COUNT conditionnel s'écrit donc sans ELSE.",
      points: [
        "Ce qui se passe : une ligne par client, une colonne par statut : AquaBleu (client 1) a 7 165 € livrés et 7 950 € en cours. `nb_edi_faux` donne 2 commandes EDI au client 2, qui n'en a aucune.",
        "Pourquoi : le CASE (le « si… alors », m03) tourne sur chaque ligne, avant l'agrégat : il rend le montant ou 0, puis SUM additionne. COUNT compte toute valeur non NULL : le 0 du ELSE compte.",
        "Le piège : `COUNT(CASE … THEN 1 ELSE 0 END)` compte toutes les lignes. Ton indicateur « commandes EDI » vaut le nombre total de commandes, sans erreur, dans chaque rapport.",
        "Le bon réflexe : avec COUNT, pas de ELSE (NULL n'est pas compté) ; avec SUM, `ELSE 0`. La part de commandes EDI : `AVG(CASE WHEN canal = 'EDI' THEN 1.0 ELSE 0 END)`, où 1.0 évite la division entière.",
        "SQL Server / Snowflake : Snowflake a `COUNT_IF(canal = 'EDI')` (sa doc : NULL si aucune ligne ne compte). « Toutes les commandes livrées ? » : `MIN(CASE … THEN 1 ELSE 0 END) = 1` ; « au moins une » : MAX. Snowflake : `BOOLAND_AGG`, `BOOLOR_AGG` sur un BOOLEAN (vrai / faux)."
      ],
      retenir: "SUM(CASE WHEN … THEN x ELSE 0 END) : une colonne par condition, en une seule lecture. Avec COUNT : THEN 1, sans ELSE."
    },
    {
      titre: "Moyennes et ratios : divise les totaux, à la fin",
      exemple: "-- Chlore 5 kg (article 1) : 3 lignes de 100, 8 et 150 seaux\nSELECT CAST(AVG(prix_unit) AS decimal(10,2))       AS prix_moyen_faux,\n       CAST(SUM(qte * prix_unit) / NULLIF(SUM(qte), 0)\n            AS decimal(10,2))                       AS prix_moyen_pondere\nFROM dbo.ligne_cde\nWHERE article_id = 1;",
      resultat: [["prix_moyen_faux", "prix_moyen_pondere"], ["37.18", "36.02"]],
      regle: "AVG donne le même poids à chaque ligne, petite ou grosse. Or un prix moyen ou un taux doivent tenir compte des quantités ou des montants. Ils se calculent donc en divisant une somme par une autre somme. La moyenne des moyennes tombe dans le même piège : un petit groupe y pèse autant qu'un gros. La division se fait en dernier, total par total. Sur SQL Server, AVG ou une division d'entiers coupe les décimales : on multiplie par 1.0.",
      points: [
        "Ce qui se passe : la moyenne des 3 prix donne 37,18 € ; le vrai prix moyen, pondéré par les quantités, 36,02 €. Dans AVG, les 8 seaux à 39,75 € pèsent autant que les 150 seaux à 35,90 €.",
        "Pourquoi : un prix moyen pondéré (comme le PMP du stock) = montant total / quantité totale. Un taux de marge = `SUM(marge) / SUM(ca)`.",
        "Le piège : la moyenne des moyennes. Région A : 2 commandes de 100 € en moyenne ; région B : 8 de 50 €. Le rapport affiche (100 + 50) / 2 = 75 € ; le vrai panier moyen vaut 600 / 10 = 60 €.",
        "Le bon réflexe : garde les sommes (SUM, COUNT) jusqu'au bout, et divise à la fin. `NULLIF(SUM(qte), 0)` (NULLIF fabrique un NULL, m02) évite la division par zéro. Valeurs extrêmes : regarde la médiane (la valeur du milieu).",
        "SQL Server / Snowflake : sur SQL Server, AVG d'un entier rend un entier : 1 et 2 donnent 1. Écris `AVG(qte * 1.0)`, et `COUNT(*) * 1.0 / COUNT(DISTINCT cde_id)` (lignes par commande). Snowflake garde les décimales : 1.5."
      ],
      retenir: "Moyenne ou taux = somme / somme, à la fin, jamais la moyenne des moyennes. Sur SQL Server : × 1.0 contre la division entière."
    },
    {
      titre: "Après une jointure : les lignes copiées gonflent les sommes",
      exemple: "-- Piège : le montant de la commande se répète sur chaque ligne\nSELECT co.client_id, COUNT(*) AS nb_lignes, COUNT(DISTINCT co.id) AS nb_cdes,\n       SUM(co.montant_ht)         AS ca_faux,\n       SUM(li.qte * li.prix_unit) AS ca_juste\nFROM dbo.commande AS co\nJOIN dbo.ligne_cde AS li ON li.cde_id = co.id\nWHERE co.statut <> 'ANNULEE'\nGROUP BY co.client_id\nORDER BY co.client_id;",
      resultat: [["client_id", "nb_lignes", "nb_cdes", "ca_faux", "ca_juste"], [1, 6, 3, "30230.00", "15115.00"], [2, 2, 2, "2580.00", "2580.00"], [4, 1, 1, "318.00", "318.00"], [6, 1, 1, "79.80", "79.80"]],
      regle: "Une jointure 1-N, comme une commande et ses lignes, répète le côté 1 sur chaque ligne du côté N. Pour un agrégat, ces copies sont des lignes comme les autres. Demande-toi donc à quel grain (le niveau de détail d'une ligne) chaque valeur est écrite, et additionne-la à ce grain. DISTINCT aide à compter, avec `COUNT(DISTINCT clé)`. Mais `SUM(DISTINCT)` ne répare pas une somme : il efface aussi deux montants égaux, mais vrais.",
      points: [
        "Ce qui se passe : AquaBleu affiche 30 230 € au lieu de 15 115 €. Ses 3 commandes ont 2 lignes chacune : la jointure (le lien entre deux tables, m05) répète leur montant sur chaque ligne. Les autres clients tombent juste.",
        "Pourquoi : SUM additionne toutes les copies ; COUNT(*) compte les lignes, pas les commandes.",
        "Le piège : réparer avec DISTINCT. `SUM(DISTINCT co.montant_ht)` rend bien 15 115 € à AquaBleu, mais 1 290 € au client 2 : ses deux commandes valent 1 290 €, DISTINCT en efface une.",
        "Le bon réflexe : additionne au bon grain (le niveau de détail d'une ligne) : `SUM(li.qte * li.prix_unit)` pour les lignes, ou le montant des commandes sans jointure. Compte les commandes avec `COUNT(DISTINCT co.id)`.",
        "Et aussi : un LEFT JOIN (qui garde les clients sans commande) leur donne une ligne de NULL : Pool & Garden compte 1 avec `COUNT(*)`, 0 avec `COUNT(co.id)`. Pour afficher les zéros, pars de la table client."
      ],
      retenir: "Une jointure 1-N copie le côté 1 : additionne au bon grain, compte avec COUNT(DISTINCT clé), et ne répare jamais avec SUM(DISTINCT)."
    },
    {
      titre: "Sous-totaux : ROLLUP et GROUPING()",
      exemple: "-- Flux ORDERS par statut et motif, sous-totaux et total\nSELECT statut, motif, GROUPING(motif) AS est_total, COUNT(*) AS nb_flux\nFROM dbo.flux_edi\nWHERE type = 'ORDERS'\nGROUP BY ROLLUP (statut, motif)\nORDER BY GROUPING(statut), statut, GROUPING(motif), motif;",
      resultat: [["statut", "motif", "est_total", "nb_flux"], ["OK", null, 0, 3], ["OK", null, 1, 3], ["REJET", "EAN inconnu", 0, 1], ["REJET", null, 1, 1], [null, null, 1, 4]],
      regle: "ROLLUP ajoute au détail des sous-totaux et un total général, en une seule requête. Il lit ses colonnes comme une hiérarchie. `ROLLUP (a, b)` donne le détail par a et b, un sous-total par a, puis le total général. Sur une ligne de total, la colonne totalisée vaut NULL, comme une vraie case vide. IS NULL et COALESCE confondent donc les deux. Seul `GROUPING(col)` les distingue : il vaut 1 sur une ligne de total, 0 sur le détail.",
      points: [
        "Ce qui se passe : le détail, un sous-total par statut, puis le total des 4 flux. Les 2 premières lignes se ressemblent : la 1re, ce sont les 3 flux OK sans motif ; la 2e, leur sous-total.",
        "Pourquoi : `ROLLUP (statut, motif)` calcule le détail, puis remonte d'un cran : total par statut, puis total général.",
        "Le piège : avec ROLLUP, `COALESCE(motif, 'Sous-total')` pour l'affichage. Les 3 flux OK sans motif deviennent eux aussi « Sous-total » : le rapport montre deux sous-totaux OK, et le détail disparaît.",
        "Le bon réflexe : le libellé avec GROUPING, `CASE WHEN GROUPING(motif) = 1 THEN 'Sous-total' ELSE motif END`. Pour ranger chaque total après son détail, trie sur GROUPING, comme dans l'exemple.",
        "Et aussi : `GROUPING SETS ((statut), (type))` calcule seulement les regroupements listés, en une requête. `CUBE (statut, type)` calcule toutes les combinaisons, plus le total. Même écriture sur SQL Server et Snowflake."
      ],
      retenir: "ROLLUP = détail + sous-totaux + total général. Une ligne de total a des NULL : repère-la avec GROUPING(col) = 1, jamais avec IS NULL."
    },
    {
      titre: "Détails utiles",
      points: [
        "Une liste dans une case : `STRING_AGG(num_cde, ', ') WITHIN GROUP (ORDER BY num_cde)` (SQL Server 2017+), `LISTAGG` sur Snowflake. STRING_AGG refuse DISTINCT (LISTAGG l'accepte), et plante au-delà de 8 000 octets : `CAST(num_cde AS varchar(max))`.",
        "Le détail et le total côte à côte : `SUM(montant_ht) OVER (PARTITION BY client_id)` ajoute le total du client sur chaque ligne (fonction de fenêtrage, m08). « La dernière commande de chaque client », « le top 3 par région » : ROW_NUMBER, qui numérote les lignes.",
        "Le meilleur client : `ORDER BY SUM(montant_ht) DESC` puis `TOP (1) WITH TIES` ; ORDER BY accepte un agrégat absent du SELECT. SQL Server refuse `MAX(SUM(…))` : fais d'abord les sommes dans une sous-requête (une requête dans la requête).",
        "Sans agrégat, GROUP BY fait comme DISTINCT : DISTINCT pour dédoublonner, GROUP BY pour calculer. Ensemble, sur les mêmes colonnes : DISTINCT ne sert à rien.",
        "Médiane : `MEDIAN(x)` sur Snowflake ; `PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY x) OVER (…)` sur SQL Server, qui exige OVER. Sur 10, 20, 30, 40 : CONT donne 25, PERCENTILE_DISC une vraie valeur, 20. Écart-type : STDEV, STDDEV sur Snowflake.",
        "SQL Server : un total INT plante au-delà de 2,1 milliards : `SUM(CAST(qte AS bigint))`, et `COUNT_BIG(*)` pour compter. SUM, AVG, MIN et MAX refusent le BIT : `SUM(CAST(actif AS int))`. Gros volumes : `APPROX_COUNT_DISTINCT` estime vite (2019+, Snowflake).",
        "Un stock ou un solde ne s'additionne pas dans le temps : prends le dernier mois, ou la moyenne. Des lignes « Total » importées d'Excel doublent le CA : filtre-les avant d'agréger.",
        "Arrondir chaque ligne puis sommer, ou arrondir la somme : 3 × 0,333 donne 0,99 ou 1,00 ; suis la règle de ta compta. `PIVOT` (lignes → colonnes, SQL Server) exige une liste de colonnes en dur ; si elle varie, pivote dans Power BI."
      ],
      retenir: "Une liste : STRING_AGG ou LISTAGG. Le détail avec le total : OVER. Une valeur typique malgré les extrêmes : la médiane."
    }
  ],
  differences: [
    ["Alias dans GROUP BY", "Interdit", "Accepté"],
    ["Grouper sans tout lister", "Impossible", "`GROUP BY ALL`"],
    ["Une valeur du groupe", "`MAX(nom)`", "`ANY_VALUE(nom)`"],
    ["Grouper par mois", "`DATETRUNC(month, d)` (2022+)", "`DATE_TRUNC('month', d)`"],
    ["AVG d'un entier", "Entier (coupé)", "Décimal"],
    ["Compter si…", "`SUM(CASE … END)`", "`COUNT_IF(…)`"],
    ["Toutes vraies ?", "`MIN(CASE …) = 1`", "`BOOLAND_AGG`"],
    ["Liste en texte", "`STRING_AGG`", "`LISTAGG`"],
    ["Médiane", "`PERCENTILE_CONT` + `OVER`", "`MEDIAN`"],
    ["Écart-type", "`STDEV`", "`STDDEV`"]
  ]
};
