// Parcours SQL — Fiche de cours du module m03 « Fonctions, CASE et types », version 2 (04/11/2026).
// Fond : les fonctions transforment une valeur sur chaque ligne, et le TYPE de la valeur décide du résultat (entier,
// décimal, flottant, texte, date). Squelette du modèle m02 v2 : Exemple (qui MONTRE le piège) → Résultat → « Ce qui se
// passe » → « Pourquoi » → « Le piège » (l'erreur vue en entreprise) → « Le bon réflexe » → « SQL Server / Snowflake »
// ou « Et aussi » → À retenir. Chaque mot technique est expliqué à sa première apparition.
// Base d'exemple : docs/base-exemple.sql (commande, ligne_cde, article, client, facture). Résultats recalculés avec
// SQLite (scratchpad cours-sql/m03/verif.py) : CASE sans ELSE sur les commandes du 9/03 au 3/04 (4 lignes, CDE-1004
// → NULL) ; palettes qte / 10 des commandes 5, 7, 8 (8 → 0, 150 → 15, 5 → 0, 4 → 0 ; CEILING(qte / 10.0) : 1, 15, 1, 1) ;
// TTC des 3 commandes EDI (5736.00, 2862.00, 9540.00) ; 0.1 + 0.2 = 0.3 en double IEEE : faux ; découpe des 5 codes
// CHIMIE + ACCESSOIRE (tiret 4, 4, 3, 4, 0) ; étiquettes des 5 PRO français (Camping Les Flots : NULL avec +, « () » avec
// CONCAT) ; factures au 30/04/2026 (échéance +30 j ; âges 58, 55, 51, 19 ; mois 3, 3, 3, 4) ; tri texte jj/mm/aaaa des 4
// commandes non livrées (12/03 en dernier). Calculés à la main, deux fois, faute d'équivalent SQLite : TRY_CAST (F,
// BACHE8 → NULL ; CAST plante), LEFT(code, -1) → erreur, CEILING → decimal(p, 0) donc « 1 », DATEDIFF(year, 31/12, 01/01)
// = 1, DATEADD(month, 1, 31/01) = 28/02, ROUND(1234.567, -2) = 1200, CAST('2026-03-12' AS datetime) en français = 3/12.
// Couverture des 100 « retenir » : carte dans scratchpad cours-sql/m03/couverture.txt. Les notions testées par une seule
// question (INITCAP, REVERSE + CHARINDEX, REPLICATE, TRANSLATE, CHAR(13), ASCII, DATALENGTH, REPLACE et
// collation, REGEXP_REPLACE, DATEDIFF_BIG, TRY_PARSE, NVL2, ZEROIFNULL, GREATEST, CHOOSE, ADD_MONTHS, LTRIM(x, '0'))
// restent à l'explication de la question (règle 6 du plan).
// Sources (vérifiées le 04/11/2026) : learn.microsoft.com/sql/t-sql : language-elements/divide-transact-sql (entier /
// entier tronqué), language-elements/case-transact-sql (premier WHEN vrai, NULL sans ELSE, type de plus haute priorité),
// functions/concat-transact-sql (NULL → texte vide), language-elements/string-concatenation-transact-sql et
// data-types/data-type-conversion-database-engine ('1' + int = 2, 'texte' + int = erreur 245), data-types/
// data-type-precedence-transact-sql, functions/cast-and-convert-transact-sql (styles 103, 112, 120 ; numeric → int
// tronque, numeric → numeric arrondit ; erreur de dépassement), data-types/float-and-real-transact-sql (approché, pas
// pour la finance ni pour =), data-types/datetime-transact-sql et statements/set-dateformat-transact-sql (format
// numérique aaaa-mm-jj soumis à DATEFORMAT pour datetime ; ydm non supporté pour date), functions/datediff-transact-sql
// (frontières franchies), functions/dateadd-transact-sql (dernier jour du mois), functions/eomonth-transact-sql,
// functions/datefromparts-transact-sql, functions/datetrunc-transact-sql (2022), functions/ceiling-transact-sql
// (decimal(p,s) → decimal(p,0)), functions/round-transact-sql (longueur négative, 3e argument tronque),
// functions/len-transact-sql (espaces de fin exclus), functions/try-cast-transact-sql, functions/isnull-transact-sql
// (type du 1er argument), language-elements/coalesce-transact-sql (sous-requête évaluée deux fois),
// functions/format-transact-sql (.NET, non déterministe), relational-databases/user-defined-functions/
// deterministic-and-nondeterministic-functions. docs.snowflake.com/en/sql-reference : operators-arithmetic (division :
// 6 décimales, 7/2 = 3.5, TRUNC pour couper), functions/concat (NULL si un argument est NULL), functions/cast (`::`,
// arrondit si l'échelle est trop petite), functions/round (demi vers l'extérieur), functions/try_cast (texte seulement),
// functions/iff, functions/datediff (frontières, pas d'arrondi), functions/charindex, functions/substr, functions/left,
// functions/last_day, functions/to_char (DD, MM, YYYY, MI), functions/current_timestamp (GETDATE est un alias),
// data-types-numeric (FLOAT approché, NUMBER exact).
// Relecture testeur (04/11/2026) : la constante '20260312' est propre à SQL Server (Snowflake : TO_DATE lit une chaîne de
// chiffres comme des secondes depuis 1970, docs.snowflake.com functions/to_date) ; LEN existe aussi sur Snowflake (alias de
// LENGTH, espaces de fin comptés : functions/length) ; GETDATE est un alias de CURRENT_TIMESTAMP sur Snowflake
// (functions/current_timestamp) ; âge aligné sur q59 ; STUFF (q38, q63) et STRING_SPLIT / SPLIT_PART (q35, q36) ajoutés dans
// « Détails utiles » (règle 6 : notion testée par plusieurs questions).
LEARNSQL.cours.m03 = {
  intro: "Ton rapport Power BI compte 0 palette pour 8 cartons, et une commande annulée tombe dans « (vide) » : bug, ou type piégé ? Une fonction transforme une valeur sur chaque ligne : couper un texte, calculer une échéance, convertir un montant. Mais chaque valeur a un type (entier, décimal, texte, date) qui décide du résultat, sans message d'erreur. Ce module montre ces pièges et le réflexe qui les évite.",
  sections: [
    {
      titre: "CASE : le « si… alors » qui s'arrête au premier vrai",
      exemple: "-- Voulu : un statut lisible ; le cas ANNULEE a été oublié\nSELECT num_cde, statut,\n       CASE statut\n            WHEN 'LIVREE'   THEN 'Livrée'\n            WHEN 'EN_COURS' THEN 'En cours'\n       END AS etat\nFROM dbo.commande\nWHERE date_cde >= '20260309' AND date_cde < '20260404';",
      resultat: [["num_cde", "statut", "etat"], ["CDE-1003", "LIVREE", "Livrée"], ["CDE-1004", "ANNULEE", null], ["CDE-1005", "EN_COURS", "En cours"], ["CDE-1006", "EN_COURS", "En cours"]],
      regle: "`CASE` choisit une valeur selon des conditions : c'est le « si… alors… sinon » de SQL. Il lit les `WHEN` dans l'ordre et s'arrête au premier vrai ; les suivants ne comptent plus. Si aucun n'est vrai, il rend la valeur du `ELSE`, ou NULL s'il n'y a pas de `ELSE`. On range donc les cas du plus précis au plus général, et on prévoit toujours un dernier recours, le `ELSE`.",
      points: [
        "Ce qui se passe : CDE-1004 affiche NULL (une case vide, « inconnu »). Son statut ANNULEE n'est dans aucun WHEN, et sans ELSE le moteur ne choisit rien à ta place.",
        "Pourquoi : `CASE statut WHEN 'LIVREE'` compare avec un égal ; `CASE WHEN montant_ht >= 2000` accepte toute condition.",
        "Le piège : dans Power BI, la commande annulée tombe dans « (vide) » et sort des totaux par état. L'ordre aussi : `WHEN montant_ht >= 500 THEN 'Moyenne' WHEN montant_ht >= 2000 THEN 'Grosse'` ne donne jamais « Grosse ».",
        "Le bon réflexe : toujours un ELSE (`ELSE 'Autre'`), et les WHEN du plus strict au plus large. Case vide : `CASE WHEN statut IS NULL`, jamais `CASE statut WHEN NULL` : un égal avec NULL n'est jamais vrai (m02).",
        "SQL Server / Snowflake : raccourci à une condition : `IIF(qte > 0, 'OK', 'KO')` sur SQL Server, `IFF` sur Snowflake ; CASE marche partout. Les branches doivent avoir un type compatible : `THEN 'N/A' ELSE stock` (un entier) plante."
      ],
      retenir: "Premier WHEN vrai gagnant : du plus strict au plus large, et toujours un ELSE, sinon NULL."
    },
    {
      titre: "Entier divisé par entier : les décimales disparaissent",
      exemple: "-- Voulu : des palettes de 10 cartons, commandes 5, 7 et 8\nSELECT id, qte,\n       qte / 10            AS palettes,      -- entier / entier : comme 7 / 2 = 3\n       CEILING(qte / 10.0) AS palettes_ok\nFROM dbo.ligne_cde\nWHERE cde_id IN (5, 7, 8);",
      resultat: [["id", "qte", "palettes", "palettes_ok"], [7, 8, 0, 1], [9, 150, 15, 15], [10, 5, 0, 1], [11, 4, 0, 1]],
      regle: "Sur SQL Server, le type d'un résultat suit le type des nombres du calcul. Un entier divisé par un entier donne donc un entier. Tout ce qui suit la virgule est perdu, sans arrondi ni message. Une remise, un taux ou un nombre de palettes peuvent ainsi tomber à 0. Pour garder les décimales, il suffit qu'un des deux nombres soit décimal : `10.0`, ou un `CAST` (une conversion de type). Snowflake, lui, garde les décimales : la même division donne deux résultats différents selon le moteur.",
      points: [
        "Ce qui se passe : 8 cartons donnent 0 palette, 5 cartons aussi ; seule la ligne de 150 tombe juste. `palettes_ok` dit 1 : il faut bien une palette pour 8 cartons.",
        "Pourquoi : `qte` est un INT (nombre entier) et 10 aussi. 7 / 2 = 3, 8 / 10 = 0, 15 / 100 = 0.",
        "Le piège : une remise `montant_ht * (taux / 100)` avec un taux entier vaut 0 : elle disparaît du devis. Un taux `livre / commande * 100` ne vaut que 0 ou 100.",
        "Le bon réflexe : glisse un décimal dans le calcul : `qte / 10.0`, `montant_ht * 15.0 / 100`, ou `CAST(qte AS decimal(10,2))` (CAST convertit vers un type). Puis arrondis : CEILING vers le haut, FLOOR vers le bas, `ROUND(x, 2)`.",
        "SQL Server / Snowflake : Snowflake renvoie 3.5 pour 7 / 2 : sa division garde des décimales. Une requête migrée change donc ses chiffres sans prévenir. Pour couper sur Snowflake : `TRUNC(7 / 2)`."
      ],
      retenir: "INT / INT = INT sur SQL Server : écris 10.0 ou CAST pour garder les décimales ; Snowflake les garde."
    },
    {
      titre: "DECIMAL ou FLOAT : l'argent veut un type exact",
      exemple: "-- Piège : en FLOAT, 0,1 + 0,2 ≠ 0,3\nSELECT CASE WHEN CAST(0.1 AS float) + CAST(0.2 AS float) = 0.3\n            THEN 'égal' ELSE 'différent' END AS test;   -- différent\n\n-- Juste : TTC des commandes EDI, en DECIMAL\nSELECT num_cde, montant_ht,\n       CAST(montant_ht * 1.2 AS decimal(10,2)) AS montant_ttc\nFROM dbo.commande\nWHERE canal = 'EDI';",
      resultat: [["num_cde", "montant_ht", "montant_ttc"], ["CDE-1001", "4780.00", "5736.00"], ["CDE-1003", "2385.00", "2862.00"], ["CDE-1007", "7950.00", "9540.00"]],
      regle: "Un nombre à virgule peut être exact ou approché. `DECIMAL` (Snowflake : `NUMBER`) est exact : il garde les chiffres écrits, avec un nombre fixe de décimales. `FLOAT` est approché : il garde une valeur très proche, mais pas toujours égale. L'écart est minuscule, mais il s'accumule dans les totaux, et un test d'égalité peut répondre « différent ». L'argent va donc en `DECIMAL`, jamais en `FLOAT`. Une conversion peut aussi changer un nombre : vers un entier, SQL Server coupe, Snowflake arrondit.",
      points: [
        "Ce qui se passe : le test répond « différent » : en FLOAT, 0,1 + 0,2 vaut 0,30000000000000004. Le TTC, lui, tombe juste : 4 780,00 × 1,2 = 5 736,00.",
        "Pourquoi : FLOAT (nombre à virgule flottante) stocke les nombres en binaire, de façon approchée, comme 1/3 s'écrit 0,333… sans fin. `DECIMAL(10,2)` (10 chiffres, 2 après la virgule) stocke exactement ce que tu écris ; CAST fixe 2 décimales.",
        "Le piège : un total de factures en FLOAT qui s'écarte du grand livre de quelques centimes, un filtre `= 0.3` qui ne trouve rien.",
        "Le bon réflexe : l'argent en `DECIMAL(18,2)` (Snowflake : NUMBER), jamais FLOAT, ni MONEY (type monétaire de SQL Server), limité à 4 décimales dans ses calculs. Fixe le type des calculs avec CAST, comme le TTC.",
        "Et aussi : `CAST(12.7 AS int)` coupe : 12 sur SQL Server ; Snowflake arrondit : 13. `CAST(1234.5678 AS decimal(6,2))` arrondit à 1234.57 ; trop de chiffres avant la virgule : erreur de dépassement. INT s'arrête à 2,1 milliards ; au-delà, BIGINT."
      ],
      retenir: "Argent = DECIMAL(18,2), jamais FLOAT. CAST vers INT coupe sur SQL Server, arrondit sur Snowflake."
    },
    {
      titre: "Découper un texte : LEFT, SUBSTRING, CHARINDEX et TRY_CAST",
      exemple: "-- Voulu : le préfixe avant le tiret (CHL-25 → CHL) et le numéro, en nombre\n-- Piège : LEFT(code, CHARINDEX('-', code) - 1) plante sur BACHE8\nSELECT code,\n       CHARINDEX('-', code) AS tiret,\n       LEFT(code, NULLIF(CHARINDEX('-', code), 0) - 1) AS prefixe,\n       TRY_CAST(SUBSTRING(code, CHARINDEX('-', code) + 1, 10) AS int) AS numero\nFROM dbo.article\nWHERE famille IN ('CHIMIE', 'ACCESSOIRE');",
      resultat: [["code", "tiret", "prefixe", "numero"], ["CHL-5", 4, "CHL", 5], ["CHL-25", 4, "CHL", 25], ["PH-5", 3, "PH", 5], ["EPU-F", 4, "EPU", null], ["BACHE8", 0, null, null]],
      regle: "Pour découper un texte, il faut savoir où couper. En SQL, on compte les caractères à partir de 1, pas de 0. Si les morceaux n'ont pas toujours la même longueur, une position fixe se trompe : on cherche plutôt le séparateur (`CHARINDEX`). Restent deux cas : le séparateur absent, ou un morceau qui n'est pas un nombre. Sans précaution, une seule ligne arrête alors toute la requête. On prévoit donc ces cas, pour obtenir NULL au lieu d'une erreur (`NULLIF`, `TRY_CAST`).",
      points: [
        "Ce qui se passe : CHARINDEX donne la position du tiret : 4 pour CHL-25, 0 pour BACHE8 (aucun tiret). LEFT garde le début, SUBSTRING coupe depuis une position, TRY_CAST rend un nombre, ou NULL (F, BACHE8).",
        "Pourquoi : les positions commencent à 1 : `SUBSTRING(texte, début, longueur)` ; une longueur trop grande va jusqu'à la fin. Les positions fixes trahissent quand la longueur varie : `LEFT(code, 3)` donne 'PH-' pour PH-5 ; CHARINDEX trouve le tiret partout.",
        "Le piège : sans NULLIF, LEFT reçoit -1 pour BACHE8 et la requête s'arrête. Même chose avec `CAST(... AS int)` sur 'F' : un import EDI de 10 000 lignes bloqué par une valeur.",
        "Le bon réflexe : `NULLIF(CHARINDEX('-', code), 0)` transforme le 0 en NULL (m02), et LEFT(code, NULL) renvoie NULL sans erreur. Données douteuses : TRY_CAST, puis `WHERE … IS NULL` pour lister les rejets, sans bloquer l'import.",
        "SQL Server / Snowflake : `LEN('abc  ')` donne 3 sur SQL Server, qui ignore les espaces de fin, mais 5 sur Snowflake, où LEN et LENGTH les comptent. Les autres fonctions de cette section existent sur les deux ; Snowflake ajoute `'25'::INT` pour convertir."
      ],
      retenir: "Positions à partir de 1 ; CHARINDEX peut rendre 0, protège-le avec NULLIF ; TRY_CAST rend NULL au lieu de planter."
    },
    {
      titre: "Coller des textes : + ou CONCAT, et la case vide",
      exemple: "-- Voulu : « nom (ville) » sur l'étiquette des piscinistes français\nSELECT ville,\n       nom + ' (' + ville + ')'       AS avec_plus,\n       CONCAT(nom, ' (', ville, ')')  AS avec_concat\nFROM dbo.client\nWHERE pays = 'FR' AND type = 'PRO';",
      resultat: [["ville", "avec_plus", "avec_concat"], ["Grenoble", "Piscines Dumont (Grenoble)", "Piscines Dumont (Grenoble)"], ["Nice", "Bleu Lagon (Nice)", "Bleu Lagon (Nice)"], ["Montpellier", "Hydro Sud (Montpellier)", "Hydro Sud (Montpellier)"], ["Lyon", "Piscines Dumont (Lyon)", "Piscines Dumont (Lyon)"], [null, null, "Camping Les Flots ()"]],
      regle: "Coller des textes bute sur deux obstacles : la case vide et le nombre. Une case vide (NULL) est un inconnu : collée à du texte, elle peut rendre tout le résultat vide. Un nombre n'est pas un texte : avec `+`, SQL Server veut calculer au lieu de coller. `CONCAT` règle ces deux cas sur SQL Server ; sur Snowflake, la case vide reste un piège. Le plus sûr, sur les deux moteurs : décider soi-même par quoi remplacer une case vide, avec `COALESCE`.",
      points: [
        "Ce qui se passe : quatre étiquettes correctes. Pour Camping Les Flots, ville NULL, `+` rend toute l'étiquette NULL ; CONCAT garde le nom et laisse la parenthèse vide.",
        "Pourquoi : `+` colle deux textes, mais NULL (inconnu) contamine tout : inconnu suivi de « Lyon » reste inconnu. CONCAT remplace chaque NULL par un texte vide et convertit les nombres : `CONCAT('Cde ', 42)` donne 'Cde 42'.",
        "Le piège : `'Cde ' + 42` plante. Avec `+`, le nombre est prioritaire : SQL Server essaie de lire 'Cde ' comme un nombre. De même, `'10' + 5` donne 15, pas '105'. Et une étiquette EDI à moitié NULL ne se voit qu'à l'expédition.",
        "Le bon réflexe : CONCAT pour coller, ou `COALESCE(ville, '')` pour choisir le remplaçant. Nettoie avant de comparer : TRIM enlève les espaces aux deux bouts (SQL Server 2017+), `REPLACE(montant_txt, ',', '.')` avant TRY_CAST, UPPER ou LOWER pour la casse.",
        "SQL Server / Snowflake : sur Snowflake, CONCAT et `||` (coller) renvoient NULL dès qu'un morceau est NULL : COALESCE obligatoire. `FORMAT(montant_ht, 'N2', 'fr-FR')` met en forme pour l'affichage, mais passe par .NET (hors du moteur) : lent sur des millions de lignes."
      ],
      retenir: "`+` avec NULL donne NULL ; CONCAT convertit et ignore les NULL sur SQL Server, pas sur Snowflake."
    },
    {
      titre: "Dates : DATEADD ajoute, DATEDIFF compte des frontières",
      exemple: "-- Piège : DATEDIFF compte des frontières, pas des durées\nSELECT DATEDIFF(year, '20251231', '20260101') AS annees;   -- 1, pour un jour d'écart\n\n-- Juste : échéance à 30 jours, âge au 30/04/2026 (date d'arrêté)\nSELECT num_fact, date_fact,\n       DATEADD(day, 30, date_fact)          AS echeance,\n       DATEDIFF(day, date_fact, '20260430') AS age_jours,\n       MONTH(date_fact)                     AS mois\nFROM dbo.facture;",
      resultat: [["num_fact", "date_fact", "echeance", "age_jours", "mois"], ["FA-2026-0301", "2026-03-03", "2026-04-02", 58, 3], ["FA-2026-0302", "2026-03-06", "2026-04-05", 55, 3], ["FA-2026-0303", "2026-03-10", "2026-04-09", 51, 3], ["FA-2026-0401", "2026-04-11", "2026-05-11", 19, 4]],
      regle: "`DATEADD` déplace une date, vers l'avant ou vers l'arrière, d'un nombre de jours, de mois ou d'années. `DATEDIFF` ne mesure pas une durée : il compte combien de fois l'unité choisie (jour, mois, année) change entre deux dates. Avec une grande unité, le résultat trompe : un seul jour d'écart peut compter pour un an. Pour un écart juste, on compte donc en jours. Les mois n'ont pas tous 31 jours. Un mois ajouté au 31 tombe ainsi sur le dernier jour du mois suivant, s'il est plus court.",
      points: [
        "Ce qui se passe : `DATEADD(day, 30, date_fact)` donne l'échéance ; un nombre négatif retire. `DATEDIFF(day, …)` compte les jours jusqu'à l'arrêté : la facture en retard a 51 jours. MONTH extrait le mois.",
        "Pourquoi : `DATEDIFF(unité, début, fin)` compte les frontières de l'unité franchies. Du 31/12 au 01/01, l'année change une fois : 1, pour un jour d'écart. En mois, du 31/01 au 01/02 : 1 aussi.",
        "Le piège : `DATEDIFF(year, naissance, GETDATE())` donne un an de trop avant l'anniversaire. Et `DATEADD(month, 1, '20260131')` donne le 28 février : une échéance au 31 glisse.",
        "Le bon réflexe : un retard se compte en jours ; un âge : DATEDIFF(year) moins 1 si l'anniversaire n'est pas passé. Fin de mois : `EOMONTH(d)` ; premier jour : `DATEADD(day, 1, EOMONTH(d, -1))`, ou `DATETRUNC(month, d)` (SQL Server 2022). `DATEFROMPARTS(2026, 4, 30)` refuse le 30 février.",
        "SQL Server / Snowflake : l'instant présent : `GETDATE()` sur SQL Server, `CURRENT_TIMESTAMP` sur Snowflake, qui accepte aussi GETDATE() ; CURRENT_DATE pour la date seule. DATEADD, DATEDIFF, MONTH et YEAR s'écrivent pareil ; fin de mois `LAST_DAY(d)`, début `DATE_TRUNC('month', d)`."
      ],
      retenir: "DATEDIFF compte des frontières, pas des durées : compte en jours. DATEADD ajoute ou retire ; EOMONTH / LAST_DAY : fin de mois."
    },
    {
      titre: "Une date en texte : le tri ment et la lecture s'inverse",
      exemple: "-- Piège : dates exportées en texte jj/mm/aaaa : le tri suit les caractères\nSELECT num_cde, statut,\n       CONVERT(varchar(10), date_cde, 103) AS date_txt\nFROM dbo.commande\nWHERE statut <> 'LIVREE'\nORDER BY date_txt;",
      resultat: [["num_cde", "statut", "date_txt"], ["CDE-1005", "EN_COURS", "01/04/2026"], ["CDE-1006", "EN_COURS", "03/04/2026"], ["CDE-1007", "EN_COURS", "07/04/2026"], ["CDE-1004", "ANNULEE", "12/03/2026"]],
      regle: "Une date et le texte qui lui ressemble ne se comportent pas pareil. Le texte se trie caractère par caractère, donc mal dès qu'il commence par le jour. Sa lecture dépend aussi du moteur et de la langue : le jour et le mois peuvent s'inverser, sans erreur. On garde donc le vrai type date ; le texte vient au dernier moment, pour un fichier ou un affichage. Pour convertir dans un sens ou dans l'autre, on donne toujours le format.",
      points: [
        "Ce qui se passe : la commande du 12 mars arrive en dernier, après celles d'avril. Le tri compare les caractères un par un : « 0 » vient avant « 1 », donc 01/04 passe avant 12/03.",
        "Pourquoi : un texte n'est pas une date : le moteur n'y voit que des caractères. `CONVERT(varchar(10), date_cde, 103)` fabrique le texte jj/mm/aaaa (style 103, français) ; 112 donne AAAAMMJJ (fichiers EDI), 120 AAAA-MM-JJ hh:mi:ss, lisible et triable.",
        "Le piège : la lecture à l'envers. Sur un serveur en français, `CAST('2026-03-12' AS datetime)` donne le 3 décembre : pour l'ancien type DATETIME, ce format suit la langue. Et '22/10/2026' plante sur un serveur anglais (mois 22).",
        "Le bon réflexe : garde le type DATE jusqu'au bout ; Power BI formate. Sur SQL Server, écris les constantes en 'AAAAMMJJ' : lu pareil dans toutes les langues. Pour lire un texte, dis son format : `CONVERT(date, '22/10/2026', 103)`, ou TRY_CONVERT si douteux.",
        "SQL Server / Snowflake : Snowflake attend '2026-03-12' ; '20260312' y devient des secondes depuis 1970, sans erreur. Sinon `TO_DATE('22/10/2026', 'DD/MM/YYYY')` ; `TO_CHAR(d, 'YYYYMMDD')` dans l'autre sens. Les lettres piègent : minutes = MI sur Snowflake, mm dans FORMAT (SQL Server) ; MM = le mois partout."
      ],
      retenir: "Une date reste une DATE : en texte, tri et lecture mentent. 'AAAAMMJJ' pour les constantes SQL Server ; CONVERT avec style, TO_DATE avec format."
    },
    {
      titre: "Détails utiles",
      points: [
        "Compléter 42 en '000042' : `RIGHT('000000' + CAST(42 AS varchar(6)), 6)` sur SQL Server, `LPAD('42', 6, '0')` sur Snowflake. Un code (SIRET, EAN) reste en texte : en nombre, il perd ses zéros.",
        "`varchar` sans longueur vaut 1 caractère dans une variable (DECLARE) et 30 dans un CAST : écris toujours la longueur. Caractères étrangers (Łódź) : `NVARCHAR` et `N'texte'` sur SQL Server ; Snowflake est déjà en Unicode (tous les alphabets).",
        "Découper : `STRING_SPLIT(txt, ';')` donne une ligne par morceau (SQL Server), `SPLIT_PART(txt, ';', 2)` le 2e morceau (Snowflake). Insérer : `STUFF('1430', 3, 0, ':')` donne '14:30', prêt pour CAST en TIME.",
        "Trimestre : `DATEPART(quarter, d)` ; semaine française = ISO (norme internationale) : `DATEPART(iso_week, d)`, `WEEKISO` sur Snowflake. `DATEPART(weekday, d)` dépend du réglage DATEFIRST : ne code pas « lundi = 1 » en dur. Jours ouvrés : une table calendrier.",
        "Horodate tes flux en UTC (le temps universel, `SYSUTCDATETIME()`) et convertis seulement à l'affichage : `AT TIME ZONE` sur SQL Server, `CONVERT_TIMEZONE` sur Snowflake. Snowflake a trois types d'horodatage : NTZ (sans fuseau), LTZ (fuseau de la session), TZ (fuseau stocké).",
        "Arrondis : `ROUND(x, -2)` arrondit à la centaine ; `ROUND(x, 2, 1)` coupe sans arrondir sur SQL Server, `TRUNC(x, 2)` sur Snowflake ; `FLOOR(-2.5)` donne -3, gare aux avoirs.",
        "ISNULL prend le type du premier argument et peut couper le second ; COALESCE est plus sûr, sauf devant une sous-requête (requête dans la requête, m02), évaluée deux fois.",
        "Une fonction déterministe rend toujours le même résultat pour la même entrée (UPPER, DATEADD) et peut servir dans un index ; GETDATE, NEWID (identifiant unique), RAND et FORMAT ne le sont pas. Ligne changée ? Compare des empreintes (`HASHBYTES`, SHA2)."
      ],
      retenir: "Un code reste en texte, une longueur s'écrit toujours, un flux s'horodate en UTC."
    }
  ],
  differences: [
    ["7 / 2", "3 : entier", "3.5"],
    ["Si… alors court", "`IIF`", "`IFF`"],
    ["CONCAT avec NULL", "NULL ignoré", "Résultat NULL"],
    ["Longueur d'un texte", "`LEN` : espaces fin ignorés", "`LEN`, `LENGTH` : comptés"],
    ["Constante date", "`'20260312'` (AAAAMMJJ)", "`'2026-03-12'`"],
    ["`CAST(12.7 AS int)`", "12 : coupe", "13 : arrondit"],
    ["Texte → date", "`CONVERT(date, x, 103)`", "`TO_DATE(x, 'DD/MM/YYYY')`"],
    ["Date → texte", "`CONVERT(varchar(8), d, 112)`", "`TO_CHAR(d, 'YYYYMMDD')`"],
    ["Fin de mois", "`EOMONTH(d)`", "`LAST_DAY(d)`"],
    ["1er du mois", "`DATETRUNC(month, d)` (2022+)", "`DATE_TRUNC('month', d)`"]
  ]
};
