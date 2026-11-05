// Super dico SQL — catégorie « Conversion » (étape 1, 05/11/2026). Format : docs/dico.md.
// Résultats calculés avec SQLite sur docs/base-exemple.sql (CONVERT 103 / 112 -> strftime, TRY_CAST -> test GLOB
// puis CAST) : script de contrôle verif.py (scratchpad dico). CAST(… AS decimal(10,2)) recalculé en décimal exact
// (Python) ; FORMAT 'MMMM yyyy' en fr-FR (noms de mois .NET : mars, avril) calculé à la main, deux fois.
// Sources (vérifiées le 05/11/2026) :
// - SQL Server, learn.microsoft.com/sql/t-sql/functions : cast-and-convert-transact-sql (styles 103, 112, 120 ;
//   numeric -> int coupe ; int -> varchar trop court = '*'), try-cast-transact-sql, try-convert-transact-sql,
//   format-transact-sql (.NET CLR, non déterministe, culture), data-types/data-type-precedence-transact-sql.
// - Snowflake, docs.snowflake.com/en/sql-reference : functions/cast (:: ; vers un entier, arrondit), functions/try_cast
//   (texte seulement), functions-conversion (TRY_TO_NUMBER, TRY_TO_DATE), functions/to_date (format), functions/to_char
//   (MMMM = mois en toutes lettres, en anglais), sql-format-models. Pas de CONVERT ni de FORMAT (guide SnowConvert :
//   CONVERT à style -> TO_DATE / TO_VARCHAR).
// - MySQL 8, dev.mysql.com/doc/refman/8.0/en : cast-functions.html (CAST : SIGNED, UNSIGNED, DECIMAL, CHAR, DATE… ;
//   pas de INT ni de VARCHAR ; CONVERT(expr, type) sans style), type-conversion.html (texte non numérique -> 0 et
//   avertissement), date-and-time-functions.html (DATE_FORMAT %d %m %Y %M, STR_TO_DATE), string-functions.html
//   (FORMAT(X, D[, locale])).
// docs.snowflake.com et dev.mysql.com n'étaient pas joignables depuis la session : vérifiés par extraits de recherche.
LEARNSQL.dico = (LEARNSQL.dico || []).concat([
  {
    id: "cast",
    nom: "CAST",
    type: "fonction",
    categorie: "Conversion",
    definition: "Convertit une valeur vers un autre type : texte, nombre entier, décimal, date…",
    moteurs: {
      sqlserver: "`CAST(x AS decimal(10,2))`, `CAST(x AS varchar(20))` ; vers `int`, il coupe les décimales",
      snowflake: "`CAST(x AS NUMBER(10,2))` ou `x::NUMBER(10,2)` ; vers un entier, il arrondit",
      mysql: "`CAST(x AS DECIMAL(10,2))`, `CAST(x AS CHAR)`, `CAST(x AS SIGNED)` (il arrondit) : pas de `AS INT` ni de `AS VARCHAR`"
    },
    noms: ["::"],
    exemple: "-- TTC des commandes EDI, en décimal exact\nSELECT num_cde, montant_ht,\n       CAST(montant_ht * 1.2 AS decimal(10,2)) AS montant_ttc\nFROM commande\nWHERE canal = 'EDI';",
    resultat: [["num_cde", "montant_ht", "montant_ttc"], ["CDE-1001", "4780.00", "5736.00"], ["CDE-1003", "2385.00", "2862.00"], ["CDE-1007", "7950.00", "9540.00"]],
    piege: "`CAST(12.7 AS int)` donne 12 sur SQL Server (il coupe), mais 13 sur Snowflake (il arrondit, comme `AS SIGNED` sur MySQL) : un montant migré change sans erreur. Arrondis toi-même avant : `CAST(ROUND(x, 0) AS int)` donne 13 partout (MySQL : `AS SIGNED`).",
    motsCles: ["convertir", "conversion", "type", "transformer", "changer", "entier", "décimal", "texte", "nombre", "varchar", "int", "typer", "caster", "numérique"],
    voirAussi: ["convert", "try-cast", "round", "format"],
    module: "m03"
  },
  {
    id: "convert",
    nom: "CONVERT",
    type: "fonction",
    categorie: "Conversion",
    definition: "Convertit une valeur vers un autre type ; un style dit comment écrire ou lire une date.",
    moteurs: {
      sqlserver: "`CONVERT(varchar(10), d, 103)` → jj/mm/aaaa ; `112` → AAAAMMJJ ; `120` → AAAA-MM-JJ hh:mi:ss",
      snowflake: "Pas de CONVERT : `TO_CHAR(d, 'DD/MM/YYYY')` pour écrire, `TO_DATE(texte, 'DD/MM/YYYY')` pour lire",
      mysql: "`CONVERT(x, type)` existe, sans style : `DATE_FORMAT(d, '%d/%m/%Y')` pour écrire, `STR_TO_DATE(texte, '%d/%m/%Y')` pour lire"
    },
    noms: ["TO_CHAR", "TO_VARCHAR", "TO_DATE", "STR_TO_DATE", "DATE_FORMAT"],
    exemple: "SELECT num_cde, date_cde,\n       CONVERT(varchar(10), date_cde, 103) AS date_fr,\n       CONVERT(varchar(8), date_cde, 112) AS date_edi\nFROM commande\nWHERE canal = 'EDI';",
    exemples: {
      snowflake: "SELECT num_cde, date_cde,\n       TO_CHAR(date_cde, 'DD/MM/YYYY') AS date_fr,\n       TO_CHAR(date_cde, 'YYYYMMDD') AS date_edi\nFROM commande\nWHERE canal = 'EDI';",
      mysql: "SELECT num_cde, date_cde,\n       DATE_FORMAT(date_cde, '%d/%m/%Y') AS date_fr,\n       DATE_FORMAT(date_cde, '%Y%m%d') AS date_edi\nFROM commande\nWHERE canal = 'EDI';"
    },
    resultat: [["num_cde", "date_cde", "date_fr", "date_edi"], ["CDE-1001", "2026-03-02", "02/03/2026", "20260302"], ["CDE-1003", "2026-03-09", "09/03/2026", "20260309"], ["CDE-1007", "2026-04-07", "07/04/2026", "20260407"]],
    piege: "Pour lire un texte, donne aussi le style : `CONVERT(date, '22/10/2026', 103)`. Sans lui, la lecture dépend de la langue du serveur : en anglais, '22/10/2026' veut dire mois 22, et la requête plante.",
    motsCles: ["convertir", "style", "format", "date", "texte", "103", "112", "120", "français", "lire", "écrire", "edi", "aaaammjj", "jour", "mois"],
    voirAussi: ["cast", "format", "try-cast", "datefromparts"],
    module: "m03"
  },
  {
    id: "try-cast",
    nom: "TRY_CAST",
    type: "fonction",
    categorie: "Conversion",
    definition: "Convertit comme CAST, mais renvoie NULL au lieu de planter quand c'est impossible.",
    moteurs: {
      sqlserver: "`TRY_CAST(x AS int)` ; avec un style : `TRY_CONVERT(date, x, 103)`",
      snowflake: "`TRY_CAST(x AS NUMBER)`, sur un texte seulement ; aussi `TRY_TO_NUMBER`, `TRY_TO_DATE`",
      mysql: "Pas de TRY_CAST : dans un SELECT, `CAST('F' AS SIGNED)` rend 0 avec un avertissement, sans planter (dans un INSERT : erreur, par défaut) ; teste avant avec `REGEXP`"
    },
    noms: ["TRY_CONVERT", "TRY_TO_NUMBER", "TRY_TO_DATE"],
    exemple: "-- Le numéro après le tiret ; NULL si ce n'est pas un nombre\nSELECT code,\n       TRY_CAST(SUBSTRING(code, CHARINDEX('-', code) + 1, 10) AS int)\n         AS numero\nFROM article\nWHERE famille IN ('CHIMIE', 'ACCESSOIRE');",
    exemples: {
      mysql: "SELECT code,\n       CASE WHEN SUBSTRING_INDEX(code, '-', -1) REGEXP '^[0-9]+$'\n            THEN CAST(SUBSTRING_INDEX(code, '-', -1) AS SIGNED)\n       END AS numero\nFROM article\nWHERE famille IN ('CHIMIE', 'ACCESSOIRE');"
    },
    resultat: [["code", "numero"], ["CHL-5", 5], ["CHL-25", 25], ["PH-5", 5], ["EPU-F", null], ["BACHE8", null]],
    piege: "CAST s'arrête sur la première valeur impossible : un import EDI de 10 000 lignes bloqué par un 'F'. Avec TRY_CAST, liste plutôt les rejets : `WHERE TRY_CAST(x AS int) IS NULL AND x IS NOT NULL`.",
    motsCles: ["convertir", "erreur", "planter", "contrôle", "import", "valider", "numérique", "nombre", "vérifier", "rejets", "try", "isnumeric", "données", "douteuses", "nettoyer"],
    voirAussi: ["cast", "convert", "replace", "is-null"],
    module: "m03"
  },
  {
    id: "format",
    nom: "FORMAT",
    type: "fonction",
    categorie: "Conversion",
    definition: "Met en forme un nombre ou une date en texte, pour l'affichage : séparateurs, décimales, mois en lettres.",
    moteurs: {
      sqlserver: "`FORMAT(x, 'N2', 'fr-FR')`, `FORMAT(d, 'MMMM yyyy', 'fr-FR')` ; lent : il passe par .NET",
      snowflake: "Pas de FORMAT : `TO_CHAR(valeur, 'modèle')`, par exemple `TO_CHAR(d, 'MMMM YYYY')` (mois en anglais)",
      mysql: "`FORMAT(x, 2)` pour un nombre (1,234.50) ; pour une date : `DATE_FORMAT(d, '%M %Y')`"
    },
    noms: ["TO_CHAR", "TO_VARCHAR", "DATE_FORMAT"],
    exemple: "SELECT num_cde, date_cde,\n       FORMAT(date_cde, 'MMMM yyyy', 'fr-FR') AS mois_fr\nFROM commande\nWHERE canal = 'EDI';",
    exemples: {
      snowflake: "SELECT num_cde, date_cde,\n       TO_CHAR(date_cde, 'MMMM YYYY') AS mois_fr\nFROM commande\nWHERE canal = 'EDI';",
      mysql: "SELECT num_cde, date_cde,\n       DATE_FORMAT(date_cde, '%M %Y') AS mois_fr\nFROM commande\nWHERE canal = 'EDI';"
    },
    resultat: [["num_cde", "date_cde", "mois_fr"], ["CDE-1001", "2026-03-02", "mars 2026"], ["CDE-1003", "2026-03-09", "mars 2026"], ["CDE-1007", "2026-04-07", "avril 2026"]],
    piege: "FORMAT passe par .NET, hors du moteur : très lent sur un million de lignes, formate plutôt dans Power BI. Attention aussi : `MM` = mois mais `mm` = minutes ; et Snowflake et MySQL écrivent « March 2026 ».",
    motsCles: ["formater", "mise", "forme", "affichage", "afficher", "séparateur", "milliers", "décimales", "mois", "lettres", "euros", "présentation", "culture", "lisible", "monnaie"],
    voirAussi: ["convert", "cast", "lpad", "round"],
    module: "m03"
  }
]);
