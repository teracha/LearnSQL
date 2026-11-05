// Super dico SQL — catégorie « Nombres » (étape 1, 05/11/2026). Format : docs/dico.md.
// Résultats calculés avec SQLite sur docs/base-exemple.sql (entier / entier coupe dans SQLite comme sur SQL Server ;
// ROUND(x, -2) -> round(x / 100.0) * 100, recalculé aussi en décimal exact) : script de contrôle verif.py (scratchpad dico).
// Échelles affichées comme sur SQL Server : qte / 10.0 = decimal(17,6) -> 0.800000 ; CEILING et FLOOR sur un décimal
// renvoient une échelle 0 -> 1, 2385, -80.
// Sources (vérifiées le 05/11/2026) :
// - SQL Server, learn.microsoft.com/sql/t-sql : functions/round-transact-sql (longueur négative, 3e argument = couper,
//   demi vers l'extérieur), functions/ceiling-transact-sql, functions/floor-transact-sql, language-elements/
//   modulo-transact-sql, language-elements/divide-transact-sql (entier / entier = entier), data-types/
//   precision-scale-and-length-transact-sql (échelle d'une division).
// - Snowflake, docs.snowflake.com/en/sql-reference : functions/round (HALF_AWAY_FROM_ZERO par défaut), functions/trunc,
//   functions/ceil et functions/floor (échelle facultative), functions/mod, operators-arithmetic (7 / 2 = 3.5 ; division
//   par zéro = erreur), functions/div0.
// - MySQL 8, dev.mysql.com/doc/refman/8.0/en : mathematical-functions.html (ROUND, TRUNCATE, CEILING / CEIL, FLOOR,
//   MOD(N, 0) = NULL), arithmetic-functions.html (/ garde 4 décimales de plus, DIV = division entière, division par
//   zéro = NULL), precision-math-rounding.html.
// docs.snowflake.com et dev.mysql.com n'étaient pas joignables depuis la session : vérifiés par extraits de recherche.
LEARNSQL.dico = (LEARNSQL.dico || []).concat([
  {
    id: "round",
    nom: "ROUND",
    type: "fonction",
    categorie: "Nombres",
    definition: "Arrondit un nombre à n chiffres après la virgule ; n négatif arrondit aux dizaines, aux centaines…",
    moteurs: {
      sqlserver: "`ROUND(x, 2)` ; `ROUND(x, 2, 1)` coupe au lieu d'arrondir",
      snowflake: "`ROUND(x, 2)` ; pour couper : `TRUNC(x, 2)`",
      mysql: "`ROUND(x, 2)` ; pour couper : `TRUNCATE(x, 2)`"
    },
    noms: ["TRUNC", "TRUNCATE"],
    exemple: "SELECT num_cde, montant_ht,\n       ROUND(montant_ht, -2) AS a_la_centaine\nFROM commande\nWHERE canal = 'EDI';",
    resultat: [["num_cde", "montant_ht", "a_la_centaine"], ["CDE-1001", "4780.00", "4800.00"], ["CDE-1003", "2385.00", "2400.00"], ["CDE-1007", "7950.00", "8000.00"]],
    piege: "Arrondir chaque ligne puis additionner ne donne pas toujours l'arrondi du total : la facture EDI et la compta diffèrent de quelques centimes. Décide où tu arrondis (ligne ou total), et calcule en DECIMAL, jamais en FLOAT.",
    motsCles: ["arrondir", "arrondi", "décimales", "virgule", "chiffres", "centaine", "dizaine", "tronquer", "couper", "précision", "centimes", "montant", "trunc", "approximation"],
    voirAussi: ["ceiling", "floor", "cast", "division"],
    module: "m03"
  },
  {
    id: "ceiling",
    nom: "CEILING",
    type: "fonction",
    categorie: "Nombres",
    definition: "Arrondit un nombre à l'entier supérieur : 0,2 donne 1.",
    moteurs: {
      sqlserver: "`CEILING(x)`",
      snowflake: "`CEIL(x)` ; au dixième : `CEIL(x, 1)`",
      mysql: "`CEILING(x)` ou `CEIL(x)`"
    },
    noms: ["CEIL"],
    exemple: "-- Palettes de 10 cartons : 8 cartons = 1 palette\nSELECT id, qte, CEILING(qte / 10.0) AS palettes\nFROM ligne_cde\nWHERE cde_id IN (5, 7, 8);",
    exemples: {
      snowflake: "-- Palettes de 10 cartons : 8 cartons = 1 palette\nSELECT id, qte, CEIL(qte / 10) AS palettes\nFROM ligne_cde\nWHERE cde_id IN (5, 7, 8);"
    },
    resultat: [["id", "qte", "palettes"], [7, 8, 1], [9, 150, 15], [10, 5, 1], [11, 4, 1]],
    piege: "`CEILING(qte / 10)` sur deux entiers donne 0 palette pour 8 cartons sur SQL Server : la division a déjà coupé avant l'arrondi. Écris `qte / 10.0`.",
    motsCles: ["arrondir", "supérieur", "haut", "plafond", "entier", "au-dessus", "excès", "palettes", "colis", "ceil", "cartons", "majorer", "monter"],
    voirAussi: ["floor", "round", "division", "modulo"],
    module: "m03"
  },
  {
    id: "floor",
    nom: "FLOOR",
    type: "fonction",
    categorie: "Nombres",
    definition: "Arrondit un nombre à l'entier inférieur : 2,9 donne 2, et -2,5 donne -3.",
    moteurs: {
      sqlserver: "`FLOOR(x)`",
      snowflake: "`FLOOR(x)` ; au dixième : `FLOOR(x, 1)`",
      mysql: "`FLOOR(x)`"
    },
    noms: [],
    exemple: "SELECT num_fact, montant_ht,\n       FLOOR(montant_ht) AS plancher,\n       FLOOR(-montant_ht) AS plancher_avoir\nFROM facture\nWHERE statut <> 'PAYEE';",
    resultat: [["num_fact", "montant_ht", "plancher", "plancher_avoir"], ["FA-2026-0303", "2385.00", 2385, -2385], ["FA-2026-0401", "79.80", 79, -80]],
    piege: "Sur un avoir (montant négatif), FLOOR descend : `FLOOR(-79.80)` donne -80, pas -79. Pour couper les décimales sans changer de sens : `ROUND(x, 0, 1)` sur SQL Server, `TRUNC(x)` sur Snowflake, `TRUNCATE(x, 0)` sur MySQL.",
    motsCles: ["arrondir", "inférieur", "bas", "plancher", "entier", "dessous", "défaut", "négatif", "avoir", "partie", "descendre", "minorer", "tronquer", "complets"],
    voirAussi: ["ceiling", "round", "division", "modulo"],
    module: "m03"
  },
  {
    id: "modulo",
    nom: "% (modulo)",
    type: "mot-clé",
    categorie: "Nombres",
    definition: "Donne le reste d'une division entière : 10 % 3 vaut 1.",
    moteurs: {
      sqlserver: "`a % b`",
      snowflake: "`a % b` ou `MOD(a, b)`",
      mysql: "`a % b`, `MOD(a, b)` ou `a MOD b` ; un reste par zéro donne NULL"
    },
    noms: ["%", "MOD", "modulo"],
    exemple: "-- Palettes de 10 : combien de pleines, combien de cartons en plus\nSELECT id, qte,\n       qte / 10 AS palettes_pleines,\n       qte % 10 AS cartons_en_plus\nFROM ligne_cde\nWHERE cde_id IN (5, 7, 8);",
    exemples: {
      snowflake: "-- Palettes de 10 : combien de pleines, combien de cartons en plus\nSELECT id, qte,\n       TRUNC(qte / 10) AS palettes_pleines,\n       MOD(qte, 10) AS cartons_en_plus\nFROM ligne_cde\nWHERE cde_id IN (5, 7, 8);",
      mysql: "-- Palettes de 10 : combien de pleines, combien de cartons en plus\nSELECT id, qte,\n       qte DIV 10 AS palettes_pleines,\n       qte % 10 AS cartons_en_plus\nFROM ligne_cde\nWHERE cde_id IN (5, 7, 8);"
    },
    resultat: [["id", "qte", "palettes_pleines", "cartons_en_plus"], [7, 8, 0, 8], [9, 150, 15, 0], [10, 5, 0, 5], [11, 4, 0, 4]],
    piege: "Sur SQL Server, le reste garde le signe du premier nombre : `-7 % 3` vaut -1, pas 2. Pour tester « impair », écris `x % 2 <> 0`, jamais `x % 2 = 1`.",
    motsCles: ["reste", "division", "pair", "impair", "cycle", "multiple", "divisible", "lots", "répartir", "alterner", "paquets", "entière", "mod"],
    voirAussi: ["division", "floor", "ceiling", "round"],
    module: "m01"
  },
  {
    id: "division",
    nom: "Division /",
    type: "mot-clé",
    categorie: "Nombres",
    definition: "Divise un nombre par un autre ; entre deux entiers, SQL Server coupe les décimales.",
    moteurs: {
      sqlserver: "`a / b` : entier / entier = entier (7 / 2 = 3) ; écris `7 / 2.0` ; par zéro : erreur",
      snowflake: "`a / b` garde les décimales (7 / 2 = 3.5) ; par zéro : erreur, sauf avec `DIV0(a, b)`, qui rend 0",
      mysql: "`a / b` garde les décimales (3.5000) ; division entière : `7 DIV 2` ; par zéro : NULL"
    },
    noms: ["/", "DIV", "DIV0"],
    exemple: "-- Palettes de 10 cartons\nSELECT id, qte,\n       qte / 10 AS palettes,\n       qte / 10.0 AS palettes_exact\nFROM ligne_cde\nWHERE cde_id IN (5, 7, 8);",
    resultat: [["id", "qte", "palettes", "palettes_exact"], [7, 8, 0, "0.800000"], [9, 150, 15, "15.000000"], [10, 5, 0, "0.500000"], [11, 4, 0, "0.400000"]],
    piege: "Sur SQL Server, 8 cartons / 10 = 0 palette : entier divisé par entier coupe les décimales, sans erreur. Écris `qte / 10.0` ; Snowflake et MySQL donnent déjà 0.8, donc une requête migrée change ses chiffres.",
    motsCles: ["diviser", "division", "quotient", "entier", "décimales", "virgule", "ratio", "taux", "pourcentage", "moyenne", "partager", "div", "zéro", "fraction"],
    voirAussi: ["modulo", "ceiling", "nullif", "cast", "round"],
    module: "m03"
  }
]);
