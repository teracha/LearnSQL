// Parcours SQL — Fiche de cours du module m01 « Les bases du SELECT », nouveau format (docs/plan-sql.md).
// Fond : SELECT et FROM (colonnes, *, alias de table, schéma, noms en 2, 3 ou 4 parties), l'ordre d'exécution logique
// (FROM → WHERE → GROUP BY → HAVING → SELECT → DISTINCT → ORDER BY → TOP / LIMIT, portée des alias, plan d'exécution),
// ORDER BY (ASC par défaut, plusieurs critères, NULL selon le moteur, CASE, expression, position à éviter, vue), TOP /
// LIMIT / OFFSET-FETCH (WITH TIES, PERCENT, variable, pagination par clé), DISTINCT (ligne entière, un seul NULL, tri
// limité aux colonnes affichées, COUNT), l'écriture des valeurs et des noms (apostrophes, crochets et guillemets, casse
// Snowflake, collation, types, commentaires, point-virgule), les calculs (priorités, %, NULL, concaténation), SELECT sans
// FROM, VALUES, la structure d'une table. Les détails rares (SELECT INTO / CTAS, sp_help / DESCRIBE, GO, USE, @@VERSION,
// NEWID / RANDOM / SAMPLE, ::, EXCLUDE) sont dans un point ou dans le tableau « differences ».
// Base d'exemple : docs/base-exemple.sql (client, article, commande, ligne_cde, facture, flux_edi, depot, stock_depot).
// Chaque résultat a été recalculé avec SQLite (TOP vérifié avec LIMIT ; les ex aequo de TOP (4) WITH TIES à la main) :
// facture (4 lignes) ; totaux par client hors annulées > 1 300 (15 115,00 et 2 580,00) ; tri des PRO français par ville,
// NULL en tête (SQL Server) ; TOP (4) WITH TIES = 5 lignes (deux commandes à 1 290,00) ; DISTINCT type + statut des flux
// (4 couples) ; clients sans SIREN (2) ; SELECT sans FROM (20, 1, NULL, CDE-1001).
// Couverture : les 100 « retenir » des questions m01 (data/m01-bases.js) sont chacun dans un point, un exemple, un
// retenir ou une ligne du tableau « differences » (carte de couverture dans le rapport de rédaction).
// Sources vérifiées (02/11/2026) : learn.microsoft.com (SELECT - ORDER BY clause : NULL = plus petite valeur, OFFSET /
// FETCH, DISTINCT et ORDER BY, vue et ORDER BY ; TOP : PERCENT arrondi au-dessus, WITH TIES exige ORDER BY, parenthèses ;
// = (String comparison) : 'abc' = 'abc ' ; SELECT clause : DISTINCT et NULL, alias.*). docs.snowflake.com (ORDER BY :
// NULL plus grand par défaut, NULLS FIRST / LAST ; TOP <n> = LIMIT ; LIMIT / FETCH ; SAMPLE ; Identifier requirements :
// sans guillemets → MAJUSCULES ; comparaison de chaînes : les espaces de fin comptent).
LEARNSQL.cours.m01 = {
  intro: "Une commande EDI d'AquaBleu n'est pas facturée dans Divalto : par quelle requête commences-tu ? Un `SELECT` sur la table des commandes, trié par date, limité aux dernières lignes. Ce module pose cette base : lire, trier, limiter, et surtout l'ordre dans lequel le moteur exécute ta requête. C'est ce qui évite un rapport Power BI faux parce que l'ordre n'était pas garanti, ou un `SELECT *` qui casse une intégration le jour où une colonne s'ajoute.",
  sections: [
    {
      titre: "Lire une table : SELECT et FROM",
      exemple: "SELECT f.num_fact, f.montant_ht, f.statut\nFROM dbo.facture AS f;",
      resultat: [["num_fact", "montant_ht", "statut"], ["FA-2026-0301", "4780.00", "PAYEE"], ["FA-2026-0302", "1290.00", "PAYEE"], ["FA-2026-0303", "2385.00", "RETARD"], ["FA-2026-0401", "79.80", "EMISE"]],
      points: [
        "Le moteur lit `FROM` d'abord. Écris le schéma, `dbo.facture`, car `stg.facture` peut exister aussi. Nom complet `Ventes.dbo.facture`. Une 4e partie devant lit un serveur lié.",
        "`SELECT nom ville` (virgule oubliée) renomme `nom` en `ville` sans erreur : écris toujours `AS`. Une virgule avant `FROM` plante : mets-les en début de ligne.",
        "Les colonnes sortent dans l'ordre du `SELECT`. Donne un alias à chaque calcul : une vue l'exige, comme elle exige des noms uniques (deux `id` : erreur).",
        "`SELECT *` sert à explorer (Snowflake : `* EXCLUDE (siren)` retire une colonne). En production, une colonne ajoutée casse la vue, le rapport Power BI, le flux EDI.",
        "`AS f` pose un alias de table (`AS` facultatif). Ensuite `facture.statut` n'est plus reconnu : `f.statut` partout. `f.*` (une seule table) ou `*, calcul` sont permis."
      ],
      retenir: "Liste tes colonnes, préfixe le schéma, écris AS, pose un alias de table court et utilise-le partout."
    },
    {
      titre: "L'ordre d'exécution : le moteur ne lit pas comme toi",
      exemple: "/* 5 */ SELECT client_id, SUM(montant_ht) AS total\n/* 1 */ FROM dbo.commande\n/* 2 */ WHERE statut <> 'ANNULEE'\n/* 3 */ GROUP BY client_id\n/* 4 */ HAVING SUM(montant_ht) > 1300\n/* 6 */ ORDER BY total DESC;",
      resultat: [["client_id", "total"], [1, "15115.00"], [2, "2580.00"]],
      points: [
        "Tu écris `SELECT` d'abord ; le moteur le traite presque en dernier. Ici `GROUP BY` fait une ligne par client, `SUM` additionne, `HAVING` filtre (module m04).",
        "L'alias `total` naît au `SELECT`. `WHERE`, `GROUP BY` et `HAVING` passent avant : sur SQL Server, `HAVING total > 1300` donne « nom de colonne non valide ».",
        "Seul `ORDER BY` passe après `SELECT` et voit l'alias. Mais `ORDER BY total * 2` échoue sur SQL Server : l'alias seul, jamais dans un calcul.",
        "Snowflake est plus souple : l'alias marche dans `WHERE`, `GROUP BY`, `HAVING`, et plus loin dans le même `SELECT` (`qte * prix_unit AS montant, montant * 0.2`).",
        "`JOIN … ON` (module m05) appartient au `FROM`, avant `WHERE`. Après `SELECT` : `DISTINCT`, `ORDER BY`, puis `TOP` ou `LIMIT`. Le plan d'exécution montre le travail réel."
      ],
      retenir: "Ordre logique FROM → WHERE → GROUP BY → HAVING → SELECT → DISTINCT → ORDER BY → TOP / LIMIT : l'alias du SELECT n'existe donc, sur SQL Server, que dans ORDER BY."
    },
    {
      titre: "Trier avec ORDER BY",
      exemple: "SELECT nom, ville\nFROM dbo.client\nWHERE pays = 'FR' AND type = 'PRO'\nORDER BY ville;",
      resultat: [["nom", "ville"], ["Camping Les Flots", null], ["Piscines Dumont", "Grenoble"], ["Piscines Dumont", "Lyon"], ["Hydro Sud", "Montpellier"], ["Bleu Lagon", "Nice"]],
      points: [
        "Sans `ORDER BY`, aucun ordre n'est garanti, même s'il « a l'air » bon : un rapport Power BI change le jour où le plan change.",
        "`ORDER BY ville` = `ORDER BY ville ASC`. Avec `ORDER BY pays, montant_ht DESC`, le 2e critère départage seulement les lignes du même pays.",
        "SQL Server met `NULL` en tête en `ASC`, en fin en `DESC` (plus petite valeur). Snowflake fait l'inverse par défaut ; `NULLS FIRST` / `NULLS LAST` forcent.",
        "`ORDER BY` accepte une expression : `CASE WHEN ville IS NULL THEN 1 ELSE 0 END, ville` met les `NULL` en fin, ou « urgentes d'abord ».",
        "`ORDER BY 2` (2e colonne) : erreur si elle manque, piège si le `SELECT` change. Des codes texte sortent `'1', '10', '2'` : `CAST(code AS int)`."
      ],
      retenir: "Un seul ORDER BY, sur des noms de colonnes, dans la requête finale (jamais dans une vue ni dans un chargement) : sans lui, aucun ordre."
    },
    {
      titre: "Limiter : TOP, LIMIT et la pagination",
      exemple: "SELECT TOP (4) WITH TIES num_cde, montant_ht\nFROM dbo.commande\nORDER BY montant_ht DESC;",
      resultat: [["num_cde", "montant_ht"], ["CDE-1007", "7950.00"], ["CDE-1001", "4780.00"], ["CDE-1003", "2385.00"], ["CDE-1002", "1290.00"], ["CDE-1006", "1290.00"]],
      points: [
        "`TOP (4)` s'applique après le tri : les 4 plus grosses commandes. Avec une variable, `TOP (@n)`, les parenthèses sont obligatoires. `TOP (10) PERCENT` arrondit au-dessus.",
        "Snowflake écrit `LIMIT 4` tout à la fin, après `ORDER BY`, et accepte `TOP 4`. Sans tri, lignes quelconques. `LIMIT` n'existe pas sur SQL Server.",
        "`WITH TIES` garde les ex aequo de la dernière place : ici 5 lignes, deux commandes à 1 290. Sans `ORDER BY`, il échoue.",
        "Pagination : `ORDER BY id OFFSET 20 ROWS FETCH NEXT 10 ROWS ONLY` donne les lignes 21 à 30 (`FETCH` facultatif). Snowflake : `LIMIT 10 OFFSET 20`.",
        "À la page 5 000, `OFFSET` relit tout ce qui précède : lent. Pagine par clé, `WHERE id > @dernier_id ORDER BY id`, avec `TOP (10)`."
      ],
      retenir: "TOP ou LIMIT, toujours avec ORDER BY. Les plus récentes : ORDER BY date_cde DESC puis TOP (1), la ligne entière, pas seulement MAX. Avec WITH TIES : tout le dernier jour."
    },
    {
      titre: "DISTINCT : des lignes entières uniques",
      exemple: "SELECT DISTINCT type, statut\nFROM dbo.flux_edi\nORDER BY type, statut;",
      resultat: [["type", "statut"], ["DESADV", "REJET"], ["INVOIC", "OK"], ["ORDERS", "OK"], ["ORDERS", "REJET"]],
      points: [
        "`DISTINCT` compare la ligne entière du `SELECT`, pas la première colonne : `ORDERS` sort deux fois, car son statut diffère (`OK`, `REJET`).",
        "Les `NULL` sont égaux entre eux pour `DISTINCT` : une seule ligne. Sur SQL Server, `'ABC'` et `'ABC '` aussi (espaces de fin ignorés). Snowflake les distingue.",
        "Avec `DISTINCT`, `ORDER BY` n'accepte que des colonnes du `SELECT` : par `motif`, SQL Server refuse (quel motif pour un couple ?). Sans `DISTINCT`, c'est permis.",
        "`DISTINCT` sur une clé unique (`id`) ne retire rien et coûte du temps. `SELECT DISTINCT COUNT(*)` compte tout ; pour compter des valeurs : `COUNT(DISTINCT statut)`.",
        "Avec `TOP`, l'ordre est imposé : `SELECT DISTINCT TOP (3) …`. Des doublons après une jointure ? Cherche la cause (plusieurs lignes par commande) avant d'ajouter `DISTINCT`."
      ],
      retenir: "DISTINCT compare des lignes entières, garde un seul NULL, et le tri ne porte que sur les colonnes affichées."
    },
    {
      titre: "Écrire les valeurs et les noms",
      exemple: "-- Fiches à nettoyer : les clients sans SIREN\nSELECT code, nom AS [Nom client], 'À saisir par l''ADV' AS action\nFROM dbo.client\nWHERE siren IS NULL;",
      resultat: [["code", "Nom client", "action"], ["C003", "Bleu Lagon", "À saisir par l'ADV"], ["C005", "Pool & Garden", "À saisir par l'ADV"]],
      points: [
        "Un texte va entre apostrophes simples. L'apostrophe dedans se double : `'l''ADV'`. Une constante du `SELECT` se répète sur chaque ligne, comme `action` ci-dessus.",
        "Compare avec le type de la colonne : `code_postal = 69110` convertit la colonne en entier et plante sur `'2A004'`. `'2026-03-02'` reste un texte : `CAST(… AS date)`.",
        "Nom spécial (espace, mot réservé comme `order`) : `[Nom client]` sur SQL Server, `\"Nom client\"` sur Snowflake. `[dbo].[client]` = `dbo.client`. Mieux : `nom_client`, sans espace.",
        "Snowflake met un nom sans guillemets en MAJUSCULES (`NOM`), sauf `AS \"nom\"`. Avec guillemets, la casse devient obligatoire : `\"client\"` ≠ `client`. Ne mélange pas les deux.",
        "Mots-clés en MAJUSCULES ou non, mise en forme libre : profite-en. `--` commente jusqu'à la fin de la ligne, `/* … */` plusieurs. Un `;` finit chaque instruction, obligatoire avant `WITH`."
      ],
      retenir: "Texte entre apostrophes (doublée dedans), nom spécial entre [ ] ou \" \", et toujours une valeur du type de la colonne."
    },
    {
      titre: "Calculer, tester, explorer",
      exemple: "SELECT 10 + 5 * 2      AS calcul,\n       10 % 3          AS reste,\n       39.90 * NULL    AS vide,\n       'CDE-' + '1001' AS num_cde;   -- Snowflake : 'CDE-' || '1001'",
      resultat: [["calcul", "reste", "vide", "num_cde"], [20, 1, null, "CDE-1001"]],
      points: [
        "`SELECT` sans `FROM` renvoie une ligne : idéal pour tester une expression avant de l'écrire dans une vraie requête (`SELECT GETDATE();`).",
        "`*` et `/` passent avant `+` et `-` : `10 + 5 * 2` = 20. Mets des parenthèses. `%` donne le reste de la division : une ligne sur deux, un lot sur n.",
        "Tout calcul avec `NULL` donne `NULL` : un montant vide dans Power BI vient souvent d'une quantité manquante. `COALESCE(qte, 0)` si c'est voulu.",
        "Concaténer : `+` sur SQL Server, `||` sur Snowflake, où `+` tente une addition et plante sur `'CDE-'`. `CONCAT()` marche sur les deux.",
        "La structure d'une table : `INFORMATION_SCHEMA.COLUMNS` partout, `sp_help` (SQL Server), `DESCRIBE TABLE` (Snowflake). Une table en dur : `FROM (VALUES (1, 'FR'), (2, 'BE')) AS t(id, pays)`."
      ],
      retenir: "Teste sans FROM. NULL contamine tout calcul. Pour garder un résultat : SELECT INTO (SQL Server) ou CREATE TABLE AS SELECT (Snowflake) crée, INSERT INTO … SELECT ajoute."
    }
  ],
  differences: [
    ["Nom d'une table", "`dbo.client` : schéma.table ; `Ventes.dbo.client` : base.schéma.table ; une 4e partie devant = serveur lié", "`VENTES.CLIENT` : schéma.table dans la base courante ; `PROD.VENTES.CLIENT` en entier"],
    ["Limiter, paginer", "`TOP (n)` juste après `SELECT` ; `OFFSET m ROWS FETCH NEXT n ROWS ONLY` (`FETCH` facultatif)", "`LIMIT n` tout à la fin (`TOP n` accepté) ; `LIMIT n OFFSET m` (ou `OFFSET … FETCH`)"],
    ["Alias du `SELECT` ailleurs que dans `ORDER BY`", "Erreur dans `WHERE`, `GROUP BY`, `HAVING` et dans le même `SELECT` : répète le calcul, ou passe par une CTE", "Accepté partout (et même dans la suite du `SELECT`)"],
    ["`NULL` dans `ORDER BY`", "Plus petite valeur : en tête en `ASC`, en fin en `DESC` ; `CASE WHEN col IS NULL THEN 1 ELSE 0 END, col` pour les mettre à la fin", "Plus grande valeur par défaut (paramètre `DEFAULT_NULL_ORDERING`) : en fin en `ASC` ; `NULLS FIRST` / `NULLS LAST` après le sens du tri"],
    ["Nom spécial, casse des noms", "`[Code Client]` ; casse selon la collation de la base (`CS` : casse exacte)", "`\"Code Client\"` ; MAJUSCULES sans guillemets, casse exacte avec guillemets"],
    ["Concaténer, convertir", "`'CDE-' + num_cde` ; `CAST(x AS date)`", "`'CDE-' || num_cde` (`+` additionne) ; `x::DATE` ou `CAST` ; `CONCAT()` sur les deux"],
    ["Créer une table depuis une requête", "`SELECT … INTO t FROM …` (erreur si `t` existe ; `INSERT INTO t SELECT …` ajoute)", "`CREATE TABLE t AS SELECT …` (CTAS)"],
    ["Structure d'une table", "`sp_help`, `TOP (0)`, `INFORMATION_SCHEMA.COLUMNS`", "`DESCRIBE TABLE`, `LIMIT 0`, `INFORMATION_SCHEMA.COLUMNS` (noms en MAJUSCULES)"],
    ["Base courante, version, lots", "`USE Ventes` ; `DB_NAME()` ; `@@VERSION` ; `GO` sépare les lots de SSMS (une variable ne le traverse pas)", "`USE DATABASE`, `USE SCHEMA` ; `CURRENT_DATABASE()` ; `CURRENT_VERSION()` ; pas de `GO`"],
    ["Hasard, échantillon", "`TOP (5) … ORDER BY NEWID()` (`NEWID()` change à chaque ligne ; `RAND()` et `GETDATE()`, évalués une fois par instruction, valent pareil sur toutes)", "`ORDER BY RANDOM() LIMIT 5` ; `SAMPLE (5 ROWS)` ; `SAMPLE (10)` = 10 %"]
  ]
};
