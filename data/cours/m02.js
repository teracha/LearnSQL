// Parcours SQL — Fiche de cours du module m02 « Filtrer et gérer NULL », nouveau format (docs/plan-sql.md, règles 1 à 9 :
// une idée par point, 1 ou 2 phrases, 25 mots et 3 accents graves au plus ; 7 sections + « Détails utiles » ; carte
// mentale « differences » de 10 lignes, cellules de 1 à 4 mots).
// Fond : WHERE et ses opérateurs (=, <>, IN, BETWEEN), AND / OR / NOT et la priorité (parenthèses, De Morgan), NULL et
// la logique à trois valeurs (IS NULL, = NULL, <> et NOT qui excluent, VRAI OR inconnu, FAUX AND inconnu), le piège
// NOT IN + NULL et la parade NOT EXISTS (module m06), COALESCE / ISNULL / NVL, IS DISTINCT FROM, NULLIF (division par
// zéro, ordre des conditions non garanti), le texte vide, les dates (plage [début, fin) plutôt que BETWEEN sur un
// DATETIME, colonne nue : index SQL Server et pruning Snowflake, module m12 ; date du jour), LIKE (%, _, classes SQL
// Server, ESCAPE, REGEXP_LIKE, ILIKE), la casse et la collation (CI / CS, AI / AS, COLLATE) contre la comparaison exacte
// de Snowflake, les espaces de fin, la conversion implicite NVARCHAR / VARCHAR et N'…'. « Détails utiles » : agrégat
// interdit dans WHERE (HAVING, module m04, ou sous-requête scalaire), WHERE 1 = 1 / 1 = 0, ALL / ANY, validité et
// chevauchement de périodes, TRY_CAST et ISNUMERIC, nombres en texte et FLOAT, égalité NULL compris avant SQL Server
// 2022, EOMONTH / CAST AS time / CAST AS date SARGable.
// Base d'exemple : docs/base-exemple.sql. Chaque résultat a été recalculé avec SQLite (dates '20260301' vérifiées sous
// la forme '2026-03-01' ; casse et espaces de fin : SQLite compare exactement, comme Snowflake, et COLLATE NOCASE joue
// la collation CI de SQL Server) : piège AND / OR (3 lignes, dont AquaBleu en GD), clients sans SIREN (2), commandes
// sans flux EDI (NOT IN : 0 ligne ; NOT EXISTS : 5), flux ORDERS avec COALESCE / NULLIF (4), commandes livrées de mars
// (3), articles CHL (2), nom = 'aquableu' (0 ligne en comparaison exacte, 1 sans casse).
// Couverture : les 100 « retenir » de data/m02-filtres.js ont servi de liste de contrôle (règle 6) : 86 sont dans un
// point, un exemple, un retenir ou une ligne de « differences » (dont 2 par déduction : borne NULL dans BETWEEN,
// COALESCE dans un filtre) ; les 14 autres sont des notions rares testées par une seule question (PATINDEX, NOT BETWEEN,
// BETWEEN sur texte, longue liste IN, OPTION (RECOMPILE), ISNULL inutile, IN () vide, NOT x IN, STARTSWITH, OR → UNION,
// DATENAME, apostrophe doublée (vue en m01), ANSI_NULLS OFF, LEN / LENGTH), laissées à l'explication de la question.
// Sources vérifiées : learn.microsoft.com (= (String comparison) : 'abc' = 'abc ' sauf dans LIKE ; LIKE : %, _, [ ],
// [^ ], [_], ESCAPE ; Search condition : priorité NOT > AND > OR, ordre d'évaluation des opérateurs logiques laissé à
// l'optimiseur ; IS [NOT] DISTINCT FROM : SQL Server 2022 (16.x) ; NULL and UNKNOWN, IS NULL, = (Equals) et ANSI_NULLS ;
// Collation and Unicode support : CI / CS, AI / AS, French_CI_AS collation par défaut pour le français ; Data type
// precedence : nvarchar avant varchar ; nchar and nvarchar : préfixe N ; COALESCE : ISNULL à deux arguments ; CASE :
// ordre des WHEN garanti pour les expressions scalaires). docs.snowflake.com (Collation support : comparaison sensible
// à la casse et espaces de fin comptés par défaut ; LIKE / ILIKE / LIKE ANY / ILIKE ANY : jokers % et _, ESCAPE sans
// caractère par défaut ; EQUAL_NULL et IS [NOT] DISTINCT FROM ; NVL / IFNULL / COALESCE ; CURRENT_DATE, DATE_TRUNC ;
// pruning des micro-partitions).
LEARNSQL.cours.m02 = {
  intro: "Ton rapport « commandes sans flux EDI » revient vide ce matin : données enfin propres, ou filtre piégé ? Un `NOT IN` qui croise un seul NULL, un `AND` qui passe avant le `OR`, une casse que SQL Server ignorait et que Snowflake compte : le filtre ne plante pas, il se tait. Ce module t'apprend à écrire un `WHERE` qui garde exactement les lignes voulues, à raisonner avec NULL (vrai, faux, inconnu), et à filtrer dates et textes sans perdre l'index.",
  sections: [
    {
      titre: "WHERE, AND et OR : garder les lignes vraies",
      exemple: "-- Voulu : les piscinistes (PRO) de Lyon ou de Grenoble\nSELECT code, nom, ville, type\nFROM dbo.client\nWHERE ville = 'Lyon' OR ville = 'Grenoble' AND type = 'PRO';",
      resultat: [["code", "nom", "ville", "type"], ["C001", "AquaBleu", "Lyon", "GD"], ["C002", "Piscines Dumont", "Grenoble", "PRO"], ["C006", "Piscines Dumont", "Lyon", "PRO"]],
      points: [
        "Le moteur lit `FROM`, puis teste chaque ligne avec `WHERE` : il garde celles où la condition est VRAIE. Fausse ou inconnue (NULL) : la ligne sort.",
        "Tu compares avec =, <> (ou !=), <, <=, > et >=. `ville IN ('Lyon', 'Grenoble')` est un raccourci pour deux égalités reliées par OR.",
        "`BETWEEN 1000 AND 3000` inclut ses deux bornes. Petite borne d'abord : `BETWEEN 3000 AND 1000` renvoie 0 ligne, sans erreur.",
        "AND passe avant OR : le moteur lit « Lyon, ou bien (Grenoble et PRO) », et AquaBleu (GD) entre. Mélange de AND et OR : mets des parenthèses.",
        "NOT porte seulement sur la condition qui le suit. `NOT (A OR B)` vaut `NOT A AND NOT B`, soit `pays NOT IN ('FR', 'BE')`."
      ],
      retenir: "WHERE garde les lignes vraies ; priorité NOT, puis AND, puis OR : dès que tu mélanges AND et OR, mets des parenthèses."
    },
    {
      titre: "NULL : l'inconnu n'est ni vrai ni faux",
      exemple: "-- Fiches à nettoyer : les clients sans SIREN\nSELECT code, nom, pays\nFROM dbo.client\nWHERE siren IS NULL;",
      resultat: [["code", "nom", "pays"], ["C003", "Bleu Lagon", "FR"], ["C005", "Pool & Garden", "CH"]],
      points: [
        "NULL veut dire « inconnu » : ni 0, ni texte vide. Toute comparaison avec lui donne « inconnu », même `NULL = NULL`, et seul « vrai » passe le WHERE.",
        "`siren = NULL` renvoie 0 ligne, sans erreur, comme `siren <> NULL`. Écris `IS NULL` ou IS NOT NULL : c'est le seul test qui marche.",
        "`ville <> 'Lyon'` exclut aussi Camping Les Flots (ville NULL) : 2 Lyon + 4 autres font 6 clients, pas 7. Ajoute `OR ville IS NULL`.",
        "NOT n'inverse pas l'inconnu : `NOT (ville = 'Lyon')`, `ville NOT LIKE 'L%'` ou `NOT IN` laissent la ligne NULL dehors, comme <>.",
        "Mais VRAI OR inconnu = VRAI, et FAUX AND inconnu = FAUX : `pays = 'FR' OR ville = 'Lyon'` garde Camping Les Flots. Le NULL ne bloque pas toujours."
      ],
      retenir: "NULL se teste avec IS NULL ou IS NOT NULL : =, <>, LIKE et NOT laissent l'inconnu dehors, sans erreur."
    },
    {
      titre: "NOT IN et NULL : le résultat vide",
      exemple: "-- Piège : 0 ligne, car le flux 3 (rejeté) a un cde_id NULL\nSELECT num_cde FROM dbo.commande\nWHERE id NOT IN (SELECT cde_id FROM dbo.flux_edi);\n\n-- Juste (résultat ci-dessous) : les 5 commandes sans flux EDI\nSELECT c.num_cde, c.canal\nFROM dbo.commande AS c\nWHERE NOT EXISTS (SELECT 1 FROM dbo.flux_edi AS f\n                  WHERE f.cde_id = c.id);",
      resultat: [["num_cde", "canal"], ["CDE-1002", "TEL"], ["CDE-1004", "WEB"], ["CDE-1005", "TEL"], ["CDE-1006", "WEB"], ["CDE-1008", "TEL"]],
      points: [
        "`NOT IN (1, 3, NULL, 7)` vaut `<> 1 AND <> 3 AND <> NULL …` : un NULL rend la liste inconnue, et le résultat est vide, sans erreur.",
        "Le piège frappe les contrôles « sans » : commandes sans flux, clients sans commande. Le rapport est vide, tout semble en ordre, et personne ne vérifie.",
        "`IN` avec un NULL dans la liste reste sans danger : une égalité vraie suffit. Mais `IN ('Lyon', NULL)` ne trouve pas les villes NULL.",
        "Deux parades existent : `NOT EXISTS` avec une sous-requête corrélée (module m06), ou `WHERE cde_id IS NOT NULL` dans la sous-requête du NOT IN.",
        "`IN` et `EXISTS` ne dupliquent jamais une ligne, même si la sous-requête renvoie trois fois le client 1. Une jointure (module m05), elle, les multiplie."
      ],
      retenir: "Un seul NULL dans la liste vide un NOT IN, sans erreur : écris NOT EXISTS, ou exclus les NULL de la sous-requête."
    },
    {
      titre: "COALESCE et NULLIF : remplacer ou fabriquer un NULL",
      exemple: "-- Flux ORDERS : un motif lisible, une alerte seulement sur les rejets\nSELECT id, COALESCE(motif, 'Aucun') AS motif,\n       NULLIF(statut, 'OK')        AS alerte\nFROM dbo.flux_edi\nWHERE type = 'ORDERS';",
      resultat: [["id", "motif", "alerte"], [1, "Aucun", null], [2, "Aucun", null], [3, "EAN inconnu", "REJET"], [5, "Aucun", null]],
      points: [
        "`COALESCE(a, b, c)` renvoie la première valeur non NULL : standard, portable, plusieurs arguments. `ISNULL` (SQL Server), `NVL` ou IFNULL (Snowflake) n'en prennent que deux.",
        "`ancien <> nouveau` rate un changement de prix quand l'un des deux est NULL. `IS DISTINCT FROM` traite NULL comme une valeur (Snowflake, SQL Server 2022+).",
        "`NULLIF(a, b)` renvoie NULL quand a = b. `montant / NULLIF(qte, 0)` donne NULL au lieu de l'erreur « division par zéro ».",
        "`qte <> 0 AND montant / qte > 5` ne protège pas : l'optimiseur choisit l'ordre des conditions. Protège le calcul par NULLIF ou CASE, pas par l'ordre.",
        "Un texte vide n'est pas NULL. Pour attraper NULL, vide et blancs d'un import EDI en un test : `NULLIF(TRIM(ref), '') IS NULL`."
      ],
      retenir: "COALESCE remplace un NULL, NULLIF en fabrique un : `montant / NULLIF(qte, 0)` évite la division par zéro."
    },
    {
      titre: "Les dates : une plage, la colonne nue",
      exemple: "-- Commandes livrées en mars 2026 : du 1er mars inclus au 1er avril exclu\nSELECT num_cde, date_cde, montant_ht\nFROM dbo.commande\nWHERE statut = 'LIVREE'\n  AND date_cde >= '20260301'\n  AND date_cde <  '20260401';",
      resultat: [["num_cde", "date_cde", "montant_ht"], ["CDE-1001", "2026-03-02", "4780.00"], ["CDE-1002", "2026-03-05", "1290.00"], ["CDE-1003", "2026-03-09", "2385.00"]],
      points: [
        "`BETWEEN '20260301' AND '20260331'` suffit sur une DATE. Sur un DATETIME, '20260331' signifie le 31 à minuit : la commande du 31 à 14 h disparaît.",
        "La plage `>= début AND < lendemain de la fin` marche avec ou sans heure. « Hier » s'écrit de hier 00:00 inclus à aujourd'hui 00:00 exclu.",
        "`YEAR(date_cde) = 2026` enveloppe la colonne : SQL Server lit toute la table au lieu de chercher dans l'index, Snowflake saute moins de micro-partitions (module m12).",
        "Mets le calcul côté valeur : `date_cde >= DATEADD(day, -30, GETDATE())` pour les 30 derniers jours, `montant_ht > 1200 / 1.2` plutôt que `montant_ht * 1.2 > 1200`.",
        "La date du jour s'écrit `CAST(GETDATE() AS date)` (SQL Server) ou `CURRENT_DATE` (Snowflake). Un TIMESTAMP comparé à une DATE l'est à minuit."
      ],
      retenir: "Période : `>= début AND < lendemain de la fin`, la colonne nue, le calcul du côté de la valeur."
    },
    {
      titre: "LIKE : chercher un motif dans un texte",
      exemple: "-- Articles dont le code commence par CHL\nSELECT code, libelle, prix_tarif\nFROM dbo.article\nWHERE code LIKE 'CHL%';",
      resultat: [["code", "libelle", "prix_tarif"], ["CHL-5", "Chlore lent 5 kg", "39.90"], ["CHL-25", "Chlore lent 25 kg", "159.00"]],
      points: [
        "`%` remplace 0 à n caractères, `_` exactement un : `'CHL-_'` trouve CHL-5, pas CHL-25. Un NULL ne passe ni LIKE ni NOT LIKE.",
        "Un début connu, `LIKE 'CHL%'`, profite de l'index comme un dictionnaire ; écris-le plutôt que `LEFT(code, 3) = 'CHL'`. `'%CHL%'` ou CHARINDEX lisent toute la table.",
        "SQL Server accepte des classes, une par caractère : `[AB]` A ou B, `[0-9]` un chiffre, `[^0-9]` tout sauf un chiffre, [_] un vrai souligné.",
        "Snowflake n'a pas de classes : `ESCAPE` pour un vrai % ou _ (`LIKE '%50!%%' ESCAPE '!'`, valable sur les deux moteurs), `REGEXP_LIKE` pour valider un format.",
        "Snowflake tient compte de la casse dans LIKE : `ILIKE 'chl%'` l'ignore, même sans joker (égalité sans casse). `ILIKE ANY ('chl%', 'ph%')` teste plusieurs motifs."
      ],
      retenir: "% remplace plusieurs caractères, _ un seul ; un début connu profite de l'index, un % devant lit toute la table."
    },
    {
      titre: "Casse, espaces et texte : deux moteurs, deux règles",
      exemple: "SELECT code, nom\nFROM dbo.client\nWHERE nom = 'aquableu';   -- en minuscules",
      resultat: "SQL Server (collation French_CI_AS, sans casse) : 1 ligne, C001 AquaBleu. Snowflake : aucune ligne, la casse compte.",
      points: [
        "SQL Server suit la collation de la colonne, souvent French_CI_AS : CI ignore la casse (CS la compte), AS compte les accents (AI les ignore).",
        "En CI, `UPPER(nom) = 'DUPONT'` est inutile et empêche l'index : connais ta collation. Pour une recherche sensible ponctuelle : `nom = 'dupont' COLLATE French_CS_AS`.",
        "Snowflake compare exactement, par défaut : 'aquableu' n'est pas 'AquaBleu'. Utilise `ILIKE`, ou `UPPER` des deux côtés, et vérifie tes filtres à la migration.",
        "Les espaces de fin : SQL Server les ignore dans `=` ('abc' = 'abc  ', '   ' = ''), Snowflake les compte. Migration : `TRIM`, et `TRIM(ref) = ''` pour les blancs.",
        "Un paramètre `N'C001'` (NVARCHAR) sur une colonne VARCHAR convertit toute la colonne : l'index sert mal. Aligne les types ; `N'…'` reste utile pour l'Unicode (Ł, ő)."
      ],
      retenir: "SQL Server compare selon sa collation, souvent sans casse et sans espaces de fin ; Snowflake compare exactement : TRIM, UPPER ou ILIKE."
    },
    {
      titre: "Détails utiles",
      points: [
        "WHERE travaille ligne par ligne, avant les groupes : `montant_ht > AVG(montant_ht)` plante. Écris HAVING (module m04) ou une sous-requête scalaire, `> (SELECT AVG(montant_ht) FROM dbo.commande)`.",
        "`WHERE 1 = 1` est toujours vrai : pratique quand un programme ajoute des `AND`. `WHERE 1 = 0` avec SELECT INTO copie une structure sans ligne.",
        "`> ALL (…)` veut dire plus grand que le maximum, > ANY plus grand que le minimum, = ANY vaut IN. Liste vide : > ALL garde toutes les lignes.",
        "Tarif valide à `@d` : `debut <= @d AND (fin IS NULL OR fin >= @d)`. Chevauchement de deux périodes : `debut1 <= fin2 AND debut2 <= fin1`.",
        "Contrôle d'import : `TRY_CAST(qte_txt AS int) IS NULL AND qte_txt IS NOT NULL` trouve les valeurs non numériques. ISNUMERIC accepte '$' : préfère TRY_CAST.",
        "Des nombres rangés en texte se comparent caractère par caractère : '99' > '100' est vrai. Convertis avant de comparer, et jamais d'égalité stricte sur un FLOAT.",
        "Égalité NULL compris avant SQL Server 2022 : `a = b OR (a IS NULL AND b IS NULL)`. `COALESCE(a, '') = COALESCE(b, '')` confond NULL et vide.",
        "Fin de mois : `date_cde = EOMONTH(date_cde)` ; heure seule : `CAST(date_cde AS time)`. Exception : `CAST(date_cde AS date) = …` reste SARGable sur SQL Server, vérifie le plan."
      ]
    }
  ],
  differences: [
    ["Casse dans `=` et LIKE", "Selon la collation", "Exacte"],
    ["LIKE sans casse", "Selon la collation (CI)", "`ILIKE`, `ILIKE ANY`"],
    ["Espaces de fin dans `=`", "Ignorés", "Comptés (`TRIM`)"],
    ["Classes `[AB]` dans LIKE", "Oui", "Non : `REGEXP_LIKE`"],
    ["Remplacer NULL", "`ISNULL`, `COALESCE`", "`NVL`, `IFNULL`, `COALESCE`"],
    ["Égal, NULL compris", "`IS DISTINCT FROM` (2022+)", "`EQUAL_NULL`, `IS DISTINCT FROM`"],
    ["Date du jour", "`CAST(GETDATE() AS date)`", "`CURRENT_DATE`"],
    ["1er janvier de l'année", "`DATEFROMPARTS(YEAR(GETDATE()), 1, 1)`", "`DATE_TRUNC('year', CURRENT_DATE)`"],
    ["Booléen", "`BIT` : `actif = 1`", "`BOOLEAN` : `WHERE actif`"],
    ["IN sur deux colonnes", "Non : `EXISTS`", "Oui"]
  ]
};
