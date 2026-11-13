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
// Ajouts du 13/11/2026 (famille « Convertir un type » du tableau « Tous les types de données », docs/dico.md) : famille
// et apercu sur CAST, CONVERT, TRY_CAST, FORMAT ; nouvelles fiches ::, TO_CHAR, TO_NUMBER, TO_DATE, PARSE, conversion
// implicite. Vérifiés avec SQLite (scratchpad types-astuces/nombres/verif/verif.py), le VRAI serveur MySQL 8.0.46 de la
// session (nombres/mysql/t05 et t08) et, pour SQL Server et Snowflake, la documentation lue le 13/11/2026 :
// - learn.microsoft.com/sql/t-sql : functions/parse-transact-sql et try-parse-transact-sql (USING culture, .NET, nombres
//   et dates seulement, langue de la session sans USING), functions/format-transact-sql (formats personnalisés .NET),
//   data-types/data-type-precedence-transact-sql (le type le plus bas est converti), data-types/
//   data-type-conversion-database-engine ('1' + int = 2 ; texte non numérique : Msg 245), errors-events (245).
// - docs.snowflake.com/en/sql-reference (lu en .md) : data-type-conversion (:: plus prioritaire que * et que le moins ;
//   17 || '76' = '1776' ; COALESCE('17', 1) = 17 ; texte changé en nombre = NUMBER(18,5)), functions/cast,
//   functions/to_char et sql-format-models (FM ; une place gardée pour le signe ; # si trop de chiffres ; point
//   décimal seulement), functions/to_decimal (précision 38 et échelle 0 par défaut : TO_NUMBER('12.3456') = 12),
//   functions/try_to_decimal, functions/to_date (un texte d'entier = des secondes depuis 1970), functions/to_timestamp.
// - dev.mysql.com/doc/refman/8.4/en : type-conversion.html (texte comparé à un nombre : en DOUBLE ; c3 = 0 trouve tous
//   les textes), cast-functions.html, date-and-time-functions.html (STR_TO_DATE : NULL et avertissement si le texte ne
//   colle pas). MySQL n'a pas `::` (erreur 1064, essayé sur le serveur).
LEARNSQL.dico = (LEARNSQL.dico || []).concat([
  {
    id: "cast",
    nom: "CAST",
    type: "fonction",
    categorie: "Conversion",
    famille: "Convertir un type",
    apercu: { sqlserver: "CAST(x AS type) ; vers INT : coupe", snowflake: "CAST ou :: ; vers INT : arrondit", mysql: "CAST(x AS SIGNED) : arrondit" },
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
    pratique: "Donne toujours une longueur : sur SQL Server, `CAST(x AS varchar)` coupe à 30 caractères, sans erreur, et `DECLARE @v varchar` n'en garde qu'un seul.",
    motsCles: ["convertir", "conversion", "type", "transformer", "changer", "entier", "décimal", "texte", "nombre", "varchar", "int", "typer", "caster", "numérique"],
    voirAussi: ["convert", "try-cast", "round", "format"],
    module: "m03"
  },
  {
    id: "convert",
    nom: "CONVERT",
    type: "fonction",
    categorie: "Conversion",
    famille: "Convertir un type",
    apercu: { sqlserver: "CONVERT(type, x, style)", snowflake: "— (TO_CHAR, TO_DATE)", mysql: "CONVERT(x, type), sans style" },
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
    pratique: "Sur SQL Server, pour un horodatage ISO 8601 (fichiers XML, JSON, API), écris `CONVERT(varchar(19), date_recu, 126)` : il donne '2026-04-07T06:08:00', avec le T entre la date et l'heure.",
    motsCles: ["convertir", "style", "format", "date", "texte", "103", "112", "120", "français", "lire", "écrire", "edi", "aaaammjj", "jour", "mois"],
    voirAussi: ["cast", "format", "try-cast", "datefromparts"],
    module: "m03"
  },
  {
    id: "try-cast",
    nom: "TRY_CAST",
    type: "fonction",
    categorie: "Conversion",
    famille: "Convertir un type",
    apercu: { sqlserver: "TRY_CAST, TRY_CONVERT : NULL", snowflake: "TRY_CAST : sur un texte seulement", mysql: "— (0 et un avertissement)" },
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
    pratique: "Sur SQL Server, ne valide pas un import avec `ISNUMERIC` : il dit 1 pour '-', '+' ou '$', qui ne sont pas des nombres. Teste plutôt `TRY_CAST(x AS decimal(18,2)) IS NOT NULL`.",
    motsCles: ["convertir", "erreur", "planter", "contrôle", "import", "valider", "numérique", "nombre", "vérifier", "rejets", "try", "isnumeric", "données", "douteuses", "nettoyer"],
    voirAussi: ["cast", "convert", "replace", "is-null"],
    module: "m03"
  },
  {
    id: "format",
    nom: "FORMAT",
    type: "fonction",
    categorie: "Conversion",
    famille: "Convertir un type",
    apercu: { sqlserver: "FORMAT(x, 'N2', 'fr-FR') : lent", snowflake: "— (TO_CHAR)", mysql: "FORMAT(x, 2) ; DATE_FORMAT" },
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
    pratique: "Sur MySQL, pour des mois en français, règle d'abord la session : `SET lc_time_names = 'fr_FR';`. Ensuite, `DATE_FORMAT(d, '%M %Y')` donne « mars 2026 » au lieu de « March 2026 ».",
    motsCles: ["formater", "mise", "forme", "affichage", "afficher", "séparateur", "milliers", "décimales", "mois", "lettres", "euros", "présentation", "culture", "lisible", "monnaie"],
    voirAussi: ["convert", "cast", "lpad", "round"],
    module: "m03"
  },
  {
    id: "deux-points",
    nom: "::",
    type: "mot-clé",
    categorie: "Conversion",
    famille: "Convertir un type",
    apercu: { sqlserver: "— (CAST)", snowflake: "x::type, avant les calculs", mysql: "— (CAST)" },
    definition: "L'écriture courte de CAST sur Snowflake : valeur::type convertit la valeur dans ce type.",
    moteurs: {
      sqlserver: "Pas de `::` pour convertir : `CAST(x AS DECIMAL(10,2))`",
      snowflake: "`x::NUMBER(10,2)`, `'2026-04-07'::DATE` : comme `CAST`, mais `::` passe avant les autres opérateurs",
      mysql: "Pas de `::` (erreur de syntaxe) : `CAST(x AS DECIMAL(10,2))`"
    },
    noms: [],
    exemple: "-- Montant de ligne en texte, pour une étiquette\nSELECT id, CAST(qte * prix_unit AS VARCHAR(20)) + ' EUR' AS montant_txt\nFROM ligne_cde\nWHERE cde_id = 1;",
    exemples: {
      snowflake: "-- Les parenthèses : tout le calcul passe en texte\nSELECT id, (qte * prix_unit)::VARCHAR || ' EUR' AS montant_txt\nFROM ligne_cde\nWHERE cde_id = 1;",
      mysql: "-- Pas de :: : CAST, ou CONCAT qui convertit seul\nSELECT id, CONCAT(CAST(qte * prix_unit AS CHAR), ' EUR') AS montant_txt\nFROM ligne_cde\nWHERE cde_id = 1;"
    },
    resultat: [["id", "montant_txt"], [1, "3590.00 EUR"], [2, "1190.00 EUR"]],
    piege: "`::` passe avant le calcul : `qte * prix_unit::VARCHAR` ne convertit que prix_unit, pas le résultat de la multiplication. Mets des parenthèses : `(qte * prix_unit)::VARCHAR`.",
    pratique: "`::` suit les règles de CAST : `'12.7'::INT` donne 13, car Snowflake arrondit. Pour un script qui doit aussi tourner sur SQL Server ou MySQL, écris plutôt `CAST(… AS …)` : ils ne connaissent pas `::`.",
    motsCles: ["deux points", "double deux-points", "convertir", "conversion", "cast", "caster", "typer", "raccourci", "opérateur", "snowflake"],
    voirAussi: ["cast", "try-cast", "to-number", "conversion-implicite"],
    module: "m03"
  },
  {
    id: "to-char",
    nom: "TO_CHAR",
    type: "fonction",
    categorie: "Conversion",
    famille: "Convertir un type",
    apercu: { sqlserver: "— (FORMAT, CONVERT)", snowflake: "TO_CHAR(x, 'modèle')", mysql: "— (LPAD, DATE_FORMAT)" },
    definition: "Transforme un nombre ou une date en texte, selon un modèle : zéros devant, séparateurs, décimales.",
    moteurs: {
      sqlserver: "Pas de TO_CHAR : `FORMAT(x, '0000000.00', 'en-US')` pour un nombre, `CONVERT(VARCHAR(10), d, 103)` pour une date",
      snowflake: "`TO_CHAR(x, 'FM0000000.00')`, `TO_CHAR(d, 'DD/MM/YYYY')` ; `TO_VARCHAR` est la même fonction",
      mysql: "Pas de TO_CHAR : `LPAD(x, 10, '0')`, `FORMAT(x, 2)` (4,780.00) ; pour une date, `DATE_FORMAT(d, '%d/%m/%Y')`"
    },
    noms: ["TO_VARCHAR"],
    exemple: "-- Montant sur 10 caractères, zéros devant, pour un fichier à longueur fixe\nSELECT num_cde, montant_ht,\n       FORMAT(montant_ht, '0000000.00', 'en-US') AS montant_10\nFROM commande\nWHERE canal = 'EDI';",
    exemples: {
      snowflake: "-- Montant sur 10 caractères, zéros devant, pour un fichier à longueur fixe\nSELECT num_cde, montant_ht,\n       TO_CHAR(montant_ht, 'FM0000000.00') AS montant_10\nFROM commande\nWHERE canal = 'EDI';",
      mysql: "-- Montant sur 10 caractères, zéros devant, pour un fichier à longueur fixe\nSELECT num_cde, montant_ht,\n       LPAD(montant_ht, 10, '0') AS montant_10\nFROM commande\nWHERE canal = 'EDI';"
    },
    resultat: [["num_cde", "montant_ht", "montant_10"], ["CDE-1001", "4780.00", "0004780.00"], ["CDE-1003", "2385.00", "0002385.00"], ["CDE-1007", "7950.00", "0007950.00"]],
    piege: "Sans FM, TO_CHAR garde une place pour le signe : `TO_CHAR(4780, '000000')` donne ' 004780', avec une espace devant, et toute la ligne du fichier se décale d'un caractère. Écris 'FM000000'.",
    pratique: "Si le nombre a plus de chiffres que le modèle, TO_CHAR écrit des # à la place, sans erreur. Avant d'envoyer un fichier à longueur fixe, vérifie `MAX(montant_ht)`.",
    motsCles: ["to_char", "to_varchar", "nombre en texte", "écrire un nombre", "zéros", "modèle", "fichier plat", "séparateur", "fm", "snowflake"],
    voirAussi: ["format", "convert", "lpad", "to-number", "zerofill"],
    module: "m03"
  },
  {
    id: "to-number",
    nom: "TO_NUMBER",
    type: "fonction",
    categorie: "Conversion",
    famille: "Convertir un type",
    apercu: { sqlserver: "— (CAST AS DECIMAL)", snowflake: "TO_NUMBER(x, précision, échelle)", mysql: "— (CAST AS DECIMAL)" },
    definition: "Transforme un texte en nombre exact ; on lui donne la précision, l'échelle, et parfois un modèle.",
    moteurs: {
      sqlserver: "Pas de TO_NUMBER : `CAST(x AS DECIMAL(10,2))`, ou `TRY_CAST` ; pour une virgule française, `PARSE`",
      snowflake: "`TO_NUMBER(x, 10, 2)` ; avec un modèle : `TO_NUMBER('1,290.00', '9,999.99', 10, 2)` ; synonymes : `TO_DECIMAL`, `TO_NUMERIC`",
      mysql: "Pas de TO_NUMBER : `CAST(x AS DECIMAL(10,2))` ; dans un SELECT, '35,90' donne 35.00, avec un simple avertissement"
    },
    noms: ["TO_DECIMAL", "TO_NUMERIC"],
    exemple: "-- Lignes EDI chargées en texte (segments QTY et PRI)\nCREATE TABLE edi_ligne (ref VARCHAR(10), qte_txt VARCHAR(15), prix_txt VARCHAR(15));\nINSERT INTO edi_ligne VALUES ('CHL-5', '100', '35.90'), ('CHL-25', '10', '119.00');\nSELECT ref, CAST(qte_txt AS INT) * CAST(prix_txt AS DECIMAL(10,2)) AS montant\nFROM edi_ligne;",
    exemples: {
      snowflake: "-- Lignes EDI chargées en texte (segments QTY et PRI)\nCREATE TABLE edi_ligne (ref VARCHAR(10), qte_txt VARCHAR(15), prix_txt VARCHAR(15));\nINSERT INTO edi_ligne VALUES ('CHL-5', '100', '35.90'), ('CHL-25', '10', '119.00');\nSELECT ref, TO_NUMBER(qte_txt) * TO_NUMBER(prix_txt, 10, 2) AS montant\nFROM edi_ligne;",
      mysql: "-- Lignes EDI chargées en texte (segments QTY et PRI)\nCREATE TABLE edi_ligne (ref VARCHAR(10), qte_txt VARCHAR(15), prix_txt VARCHAR(15));\nINSERT INTO edi_ligne VALUES ('CHL-5', '100', '35.90'), ('CHL-25', '10', '119.00');\nSELECT ref, CAST(qte_txt AS SIGNED) * CAST(prix_txt AS DECIMAL(10,2)) AS montant\nFROM edi_ligne;"
    },
    resultat: [["ref", "montant"], ["CHL-5", "3590.00"], ["CHL-25", "1190.00"]],
    piege: "Sans précision ni échelle, `TO_NUMBER('35.90')` rend un `NUMBER(38,0)` : 36, et la ligne vaut 3 600 au lieu de 3 590, sans erreur. Donne toujours l'échelle : `TO_NUMBER(prix_txt, 10, 2)`.",
    pratique: "Snowflake ne lit que le point décimal : pour '35,90', remplace d'abord la virgule, `TO_NUMBER(REPLACE(prix_txt, ',', '.'), 10, 2)`. Et `TRY_TO_NUMBER` rend NULL au lieu de planter sur une valeur illisible.",
    motsCles: ["to_number", "to_decimal", "texte en nombre", "convertir en nombre", "lire un nombre", "import", "chargement", "échelle", "virgule", "point", "prix", "snowflake"],
    voirAussi: ["try-cast", "cast", "parse", "decimal", "to-char"]
  },
  {
    id: "to-date",
    nom: "TO_DATE",
    type: "fonction",
    categorie: "Conversion",
    famille: "Convertir un type",
    apercu: { sqlserver: "— (CONVERT(DATE, x, 112))", snowflake: "TO_DATE(x, 'format')", mysql: "STR_TO_DATE(x, '%d/%m/%Y')" },
    definition: "Lit un texte et le transforme en date (ou en date et heure), selon le format qu'on lui donne.",
    moteurs: {
      sqlserver: "Pas de TO_DATE : `CONVERT(DATE, x, 112)` (AAAAMMJJ), `CONVERT(DATE, x, 103)` (jj/mm/aaaa) ; `TRY_CONVERT` si le texte est douteux",
      snowflake: "`TO_DATE(x, 'YYYYMMDD')`, `TO_TIMESTAMP(x, 'YYYY-MM-DD HH24:MI:SS')` ; `TRY_TO_DATE` rend NULL au lieu de planter",
      mysql: "`STR_TO_DATE(x, '%Y%m%d')`, `STR_TO_DATE(x, '%d/%m/%Y %H:%i')` ; un texte qui ne colle pas au format donne NULL"
    },
    noms: ["TO_TIMESTAMP", "STR_TO_DATE", "TO_TIMESTAMP_NTZ"],
    exemple: "-- Dates d'en-tête EDI reçues en texte AAAAMMJJ\nCREATE TABLE edi_entete (num_cde VARCHAR(10), date_txt VARCHAR(8));\nINSERT INTO edi_entete VALUES ('CDE-1001', '20260302'), ('CDE-1003', '20260309'), ('CDE-1007', '20260407');\nSELECT num_cde, date_txt, CONVERT(DATE, date_txt, 112) AS date_cde\nFROM edi_entete;",
    exemples: {
      snowflake: "-- Dates d'en-tête EDI reçues en texte AAAAMMJJ\nCREATE TABLE edi_entete (num_cde VARCHAR(10), date_txt VARCHAR(8));\nINSERT INTO edi_entete VALUES ('CDE-1001', '20260302'), ('CDE-1003', '20260309'), ('CDE-1007', '20260407');\nSELECT num_cde, date_txt, TO_DATE(date_txt, 'YYYYMMDD') AS date_cde\nFROM edi_entete;",
      mysql: "-- Dates d'en-tête EDI reçues en texte AAAAMMJJ\nCREATE TABLE edi_entete (num_cde VARCHAR(10), date_txt VARCHAR(8));\nINSERT INTO edi_entete VALUES ('CDE-1001', '20260302'), ('CDE-1003', '20260309'), ('CDE-1007', '20260407');\nSELECT num_cde, date_txt, STR_TO_DATE(date_txt, '%Y%m%d') AS date_cde\nFROM edi_entete;"
    },
    resultat: [["num_cde", "date_txt", "date_cde"], ["CDE-1001", "20260302", "2026-03-02"], ["CDE-1003", "20260309", "2026-03-09"], ["CDE-1007", "20260407", "2026-04-07"]],
    piege: "Sur Snowflake, `TO_DATE('20260302')` sans format ne plante pas : il lit des secondes depuis 1970 et donne le 23/08/1970. Donne toujours le format : `TO_DATE(date_txt, 'YYYYMMDD')`.",
    pratique: "Sur MySQL, `STR_TO_DATE` rend NULL, avec un simple avertissement, quand le texte ne colle pas au format ('2026-04-07' lu avec '%d/%m/%Y'). Après un import, compte les dates restées vides.",
    motsCles: ["to_date", "to_timestamp", "str_to_date", "texte en date", "convertir en date", "lire une date", "aaaammjj", "format de date", "edi", "import", "date", "heure"],
    voirAussi: ["convert", "try-cast", "types-date", "parse", "datefromparts"],
    module: "m03"
  },
  {
    id: "parse",
    nom: "PARSE",
    type: "fonction",
    categorie: "Conversion",
    famille: "Convertir un type",
    apercu: { sqlserver: "PARSE(x AS type USING culture)", snowflake: "— (TO_NUMBER, TO_DATE)", mysql: "— (CAST, STR_TO_DATE)" },
    definition: "Convertit en nombre ou en date un texte écrit à la façon d'un pays : virgule décimale, mois en lettres.",
    moteurs: {
      sqlserver: "`PARSE(x AS DECIMAL(10,2) USING 'fr-FR')` ; `TRY_PARSE` rend NULL au lieu de planter ; passe par .NET : lent",
      snowflake: "Pas de PARSE : `TO_NUMBER(REPLACE(x, ',', '.'), 10, 2)`, `TO_DATE(x, 'DD/MM/YYYY')`",
      mysql: "Pas de PARSE : `CAST(REPLACE(x, ',', '.') AS DECIMAL(10,2))`, `STR_TO_DATE(x, '%d/%m/%Y')`"
    },
    noms: ["TRY_PARSE"],
    exemple: "-- Tarif fournisseur reçu en texte, à la française\nCREATE TABLE import_tarif (code VARCHAR(10), prix_txt VARCHAR(20));\nINSERT INTO import_tarif VALUES ('CHL-5', '41,50'), ('PH-5', '25,9'), ('EPU-F', 'N/A');\nSELECT code, prix_txt, TRY_PARSE(prix_txt AS DECIMAL(10,2) USING 'fr-FR') AS prix\nFROM import_tarif;",
    exemples: {
      snowflake: "-- Tarif fournisseur reçu en texte, à la française\nCREATE TABLE import_tarif (code VARCHAR(10), prix_txt VARCHAR(20));\nINSERT INTO import_tarif VALUES ('CHL-5', '41,50'), ('PH-5', '25,9'), ('EPU-F', 'N/A');\nSELECT code, prix_txt, TRY_TO_NUMBER(REPLACE(prix_txt, ',', '.'), 10, 2) AS prix\nFROM import_tarif;",
      mysql: "-- Tarif fournisseur reçu en texte, à la française\nCREATE TABLE import_tarif (code VARCHAR(10), prix_txt VARCHAR(20));\nINSERT INTO import_tarif VALUES ('CHL-5', '41,50'), ('PH-5', '25,9'), ('EPU-F', 'N/A');\nSELECT code, prix_txt,\n       CASE WHEN prix_txt REGEXP '^[0-9]+(,[0-9]+)?$'\n            THEN CAST(REPLACE(prix_txt, ',', '.') AS DECIMAL(10,2)) END AS prix\nFROM import_tarif;"
    },
    resultat: [["code", "prix_txt", "prix"], ["CHL-5", "41,50", "41.50"], ["PH-5", "25,9", "25.90"], ["EPU-F", "N/A", null]],
    piege: "PARSE plante sur la première valeur illisible ('N/A') ; TRY_PARSE rend NULL. Et sans `USING`, il suit la langue de la session : '07/04/2026' devient le 7 avril en français, le 4 juillet en anglais.",
    pratique: "PARSE passe par .NET, hors du moteur : lent sur un gros import. Garde-le pour les formats difficiles (mois en lettres, symbole €) ; sinon, `REPLACE(x, ',', '.')` puis `TRY_CAST`.",
    motsCles: ["parse", "try_parse", "culture", "fr-fr", "virgule décimale", "à la française", "texte en nombre", "texte en date", "langue", "import", "excel", "fichier"],
    voirAussi: ["try-cast", "convert", "to-number", "to-date", "format"]
  },
  {
    id: "conversion-implicite",
    nom: "Conversion implicite",
    type: "mot-clé",
    categorie: "Conversion",
    famille: "Convertir un type",
    apercu: { sqlserver: "priorité : INT avant VARCHAR", snowflake: "selon l'opération ; texte → NUMBER(18,5)", mysql: "texte et nombre : comparés en DOUBLE" },
    definition: "Quand deux types différents se rencontrent, le moteur en convertit un tout seul, sans le dire.",
    moteurs: {
      sqlserver: "Le type de plus haute priorité gagne : INT passe avant VARCHAR, donc `'10' + 5` = 15, et `code = 5` convertit toute la colonne code",
      snowflake: "Selon l'opération : `17 || '76'` donne '1776', `COALESCE('17', 1)` donne 17 ; un texte changé en nombre devient un `NUMBER(18,5)`",
      mysql: "Un texte comparé à un nombre : les deux deviennent des nombres à virgule ; 'CHL-5' = 0 est vrai, avec un avertissement"
    },
    noms: ["priorité des types", "data type precedence", "CONVERT_IMPLICIT", "coercion"],
    exemple: "-- siren est un CHAR(9) : un code, pas un nombre\nSELECT code, nom, siren\nFROM client\nWHERE siren = 423456789;",
    resultat: [["code", "nom", "siren"], ["C002", "Piscines Dumont", "423456789"], ["C006", "Piscines Dumont", "423456789"]],
    piege: "SQL Server convertit la colonne, pas la valeur : chaque SIREN devient un INT, l'index sur siren ne sert plus, et un seul SIREN avec une lettre fait planter la requête (Msg 245). Écris la valeur dans le type de la colonne : `siren = '423456789'`.",
    pratique: "Dans un plan d'exécution SQL Server, `CONVERT_IMPLICIT` sur une colonne signale ce piège. Aligne le type de la valeur ou du paramètre sur la colonne : `N'…'` seulement pour une colonne NVARCHAR.",
    motsCles: ["conversion implicite", "implicite", "automatique", "priorité", "priorité des types", "convert_implicit", "texte et nombre", "comparer", "type différent", "245", "index", "coercion", "precedence"],
    voirAussi: ["cast", "concat", "plan-execution", "try-cast", "types-texte"],
    module: "m03"
  }
]);
