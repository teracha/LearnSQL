// Super dico SQL — catégorie « Texte » (étape 1, 05/11/2026). Format : docs/dico.md.
// Résultats calculés avec SQLite sur docs/base-exemple.sql (CHARINDEX -> instr(texte, cherché), LEN -> length,
// LEFT / RIGHT / SUBSTRING -> substr, + -> ||, STRING_SPLIT -> CTE récursive, STUFF et RIGHT('00000' + …) recalculés
// aussi en Python) : script de contrôle verif.py (scratchpad dico).
// Sources (vérifiées le 05/11/2026) :
// - SQL Server, learn.microsoft.com/sql/t-sql/functions : len (espaces de fin exclus), left et right (n négatif =
//   erreur), substring (début < 1 ; longueur facultative en 2025), charindex (0 si absent, collation), replace
//   (collation), upper, lower, trim (2017 ; LEADING / TRAILING en 2022, niveau 160), ltrim / rtrim, concat (NULL = vide),
//   concat-ws (2017, NULL sautés), string-split (2016, niveau 130 ; enable_ordinal en 2022 ; ordre non garanti), stuff ;
//   language-elements/string-concatenation-pipes-transact-sql (|| en SQL Server 2025).
// - Snowflake, docs.snowflake.com/en/sql-reference/functions : length (alias LEN, espaces comptés), left, right,
//   substr (début négatif = depuis la fin, 0 = 1), charindex et position (0 si absent), replace (3e argument facultatif,
//   casse exacte), upper, lower, initcap, trim / ltrim / rtrim (espaces seulement par défaut), concat et concat_ws
//   (un NULL -> NULL), split_part, split_to_table (colonnes SEQ, INDEX, VALUE), insert, lpad / rpad (coupe si trop long).
// - MySQL 8, dev.mysql.com/doc/refman/8.0/en/string-functions.html : CHAR_LENGTH (caractères) / LENGTH (octets),
//   SUBSTRING (0 = vide, négatif = depuis la fin), LOCATE(cherché, texte) / INSTR(texte, cherché), REPLACE (casse
//   toujours exacte), UCASE / LCASE, TRIM([LEADING | TRAILING | BOTH] x FROM t), CONCAT et CONCAT_WS (NULL), SUBSTRING_INDEX,
//   INSERT, LPAD (coupe si trop long) ; logical-operators.html (|| = OU par défaut).
// docs.snowflake.com et dev.mysql.com n'étaient pas joignables depuis la session : vérifiés par extraits de recherche.
LEARNSQL.dico = (LEARNSQL.dico || []).concat([
  {
    id: "len",
    nom: "LEN",
    type: "fonction",
    categorie: "Texte",
    definition: "Compte le nombre de caractères d'un texte.",
    moteurs: {
      sqlserver: "`LEN(texte)` : ne compte pas les espaces de fin",
      snowflake: "`LENGTH(texte)` ou `LEN(texte)` : compte les espaces de fin",
      mysql: "Pas de LEN : `CHAR_LENGTH(texte)` ; `LENGTH` y compte des octets (é = 2)"
    },
    noms: ["LENGTH", "CHAR_LENGTH", "CHARACTER_LENGTH"],
    exemple: "-- Contrôle : un SIREN a 9 chiffres\nSELECT code, siren, LEN(siren) AS longueur\nFROM client\nWHERE pays = 'FR' AND type = 'PRO';",
    exemples: {
      mysql: "-- Contrôle : un SIREN a 9 chiffres\nSELECT code, siren, CHAR_LENGTH(siren) AS longueur\nFROM client\nWHERE pays = 'FR' AND type = 'PRO';"
    },
    resultat: [["code", "siren", "longueur"], ["C002", "423456789", 9], ["C003", null, null], ["C004", "334567890", 9], ["C006", "423456789", 9], ["C007", "245678901", 9]],
    piege: "SQL Server ignore les espaces de fin : `LEN('C001  ')` vaut 4, Snowflake dit 6 ; un contrôle de champ EDI à longueur fixe ne voit donc pas ces espaces. Sur MySQL, `LENGTH('Genève')` vaut 7 (des octets) : compte avec `CHAR_LENGTH`.",
    pratique: "Avant un export vers un champ limité (35 caractères pour un nom de partenaire en EDIFACT), liste les noms trop longs : `WHERE LEN(nom) > 35` ; MySQL : `CHAR_LENGTH(nom) > 35`.",
    motsCles: ["longueur", "taille", "compter", "caractères", "nombre", "lettres", "combien", "long", "length", "espaces", "contrôle", "chiffres", "octets", "courte"],
    voirAussi: ["trim", "left", "substring", "lpad"],
    module: "m03"
  },
  {
    id: "left",
    nom: "LEFT",
    type: "fonction",
    categorie: "Texte",
    definition: "Garde les n premiers caractères d'un texte, en partant de la gauche.",
    moteurs: {
      sqlserver: "`LEFT(texte, n)` ; un n négatif plante",
      snowflake: "`LEFT(texte, n)`, comme `SUBSTR(texte, 1, n)`",
      mysql: "`LEFT(texte, n)`"
    },
    noms: [],
    exemple: "SELECT code, LEFT(code, 3) AS prefixe\nFROM article\nWHERE famille = 'CHIMIE';",
    resultat: [["code", "prefixe"], ["CHL-5", "CHL"], ["CHL-25", "CHL"], ["PH-5", "PH-"]],
    piege: "Une longueur fixe trahit dès que les codes varient : `LEFT(code, 3)` donne 'PH-' pour PH-5. Coupe plutôt au tiret, avec CHARINDEX protégé par NULLIF : `LEFT(code, NULLIF(CHARINDEX('-', code), 0) - 1)`.",
    pratique: "Pour un total par classe de comptes (6 = charges, 7 = produits), groupe sur le premier chiffre : `SELECT LEFT(compte, 1) AS classe, SUM(montant) … GROUP BY LEFT(compte, 1)`.",
    motsCles: ["gauche", "début", "premiers", "caractères", "couper", "extraire", "préfixe", "garder", "tronquer", "lettres", "commence", "raccourcir", "racine"],
    voirAussi: ["right", "substring", "charindex", "like"],
    module: "m03"
  },
  {
    id: "right",
    nom: "RIGHT",
    type: "fonction",
    categorie: "Texte",
    definition: "Garde les n derniers caractères d'un texte, en partant de la droite.",
    moteurs: {
      sqlserver: "`RIGHT(texte, n)` ; un n négatif plante",
      snowflake: "`RIGHT(texte, n)`",
      mysql: "`RIGHT(texte, n)`"
    },
    noms: [],
    exemple: "SELECT num_fact, RIGHT(num_fact, 4) AS numero\nFROM facture;",
    resultat: [["num_fact", "numero"], ["FA-2026-0301", "0301"], ["FA-2026-0302", "0302"], ["FA-2026-0303", "0303"], ["FA-2026-0401", "0401"]],
    piege: "Sur SQL Server, une colonne CHAR(n) est complétée par des espaces : `RIGHT(ref, 4)` peut ne rendre que des blancs. Enlève-les d'abord : `RIGHT(RTRIM(ref), 4)`.",
    pratique: "Pour masquer un IBAN dans un rapport, n'affiche que la fin : `CONCAT('**** ', RIGHT(iban, 4))` marche sur les 3 moteurs.",
    motsCles: ["droite", "fin", "derniers", "caractères", "couper", "extraire", "suffixe", "garder", "numéro", "terminaison", "chiffres", "lettres", "queue"],
    voirAussi: ["left", "substring", "trim", "lpad"],
    module: "m03"
  },
  {
    id: "substring",
    nom: "SUBSTRING",
    type: "fonction",
    categorie: "Texte",
    definition: "Extrait un morceau d'un texte : à partir d'une position, sur un nombre de caractères donné.",
    moteurs: {
      sqlserver: "`SUBSTRING(texte, début, longueur)` ; longueur facultative en 2025+",
      snowflake: "`SUBSTR(texte, début, longueur)` ou `SUBSTRING` ; un début négatif compte depuis la fin",
      mysql: "`SUBSTRING(texte, début, longueur)`, `SUBSTR` ou `MID` ; un début négatif compte depuis la fin"
    },
    noms: ["SUBSTR", "MID"],
    exemple: "SELECT num_fact,\n       SUBSTRING(num_fact, 4, 4) AS annee,\n       SUBSTRING(num_fact, 9, 2) AS mois\nFROM facture;",
    resultat: [["num_fact", "annee", "mois"], ["FA-2026-0301", "2026", "03"], ["FA-2026-0302", "2026", "03"], ["FA-2026-0303", "2026", "03"], ["FA-2026-0401", "2026", "04"]],
    piege: "Les positions commencent à 1. Avec 0, chaque moteur fait autre chose : `SUBSTRING('CHL-25', 0, 3)` donne 'CH' sur SQL Server, 'CHL' sur Snowflake et '' (vide) sur MySQL.",
    pratique: "Pour lire un fichier à positions fixes chargé ligne par ligne, découpe chaque champ à sa place : `SUBSTRING(ligne, 1, 10)` pour le code client, `SUBSTRING(ligne, 11, 8)` pour la date.",
    motsCles: ["extraire", "morceau", "partie", "couper", "milieu", "position", "caractères", "découper", "portion", "mid", "substr", "tranche", "isoler", "sous-chaîne"],
    voirAussi: ["left", "right", "charindex", "string-split"],
    module: "m03"
  },
  {
    id: "charindex",
    nom: "CHARINDEX",
    type: "fonction",
    categorie: "Texte",
    definition: "Donne la position d'un caractère, ou d'un texte, dans un autre texte.",
    moteurs: {
      sqlserver: "`CHARINDEX(cherché, texte)` : 0 si absent",
      snowflake: "`POSITION(cherché, texte)`, ou `CHARINDEX(cherché, texte)` : 0 si absent",
      mysql: "Pas de CHARINDEX : `LOCATE(cherché, texte)` ; `INSTR(texte, cherché)` inverse l'ordre"
    },
    noms: ["POSITION", "LOCATE", "INSTR"],
    exemple: "SELECT code, CHARINDEX('-', code) AS tiret\nFROM article\nWHERE famille IN ('CHIMIE', 'ACCESSOIRE');",
    exemples: {
      snowflake: "SELECT code, POSITION('-', code) AS tiret\nFROM article\nWHERE famille IN ('CHIMIE', 'ACCESSOIRE');",
      mysql: "SELECT code, LOCATE('-', code) AS tiret\nFROM article\nWHERE famille IN ('CHIMIE', 'ACCESSOIRE');"
    },
    resultat: [["code", "tiret"], ["CHL-5", 4], ["CHL-25", 4], ["PH-5", 3], ["EPU-F", 4], ["BACHE8", 0]],
    piege: "Renvoie 0 quand le caractère est absent (BACHE8) : `LEFT(code, CHARINDEX('-', code) - 1)` plante alors sur SQL Server. Protège avec `NULLIF(CHARINDEX('-', code), 0)`.",
    pratique: "Pour trouver le 2e tiret, cherche à partir du 1er : `CHARINDEX('-', num_fact, CHARINDEX('-', num_fact) + 1)` donne 8 pour 'FA-2026-0301'. Ce 3e argument (point de départ) existe aussi dans `LOCATE` de MySQL.",
    motsCles: ["chercher", "rechercher", "trouver", "position", "caractère", "lettre", "où", "place", "contient", "tiret", "emplacement", "rang", "index", "indexof"],
    voirAussi: ["like", "substring", "left", "nullif"],
    module: "m03"
  },
  {
    id: "replace",
    nom: "REPLACE",
    type: "fonction",
    categorie: "Texte",
    definition: "Remplace partout, dans un texte, un morceau par un autre.",
    moteurs: {
      sqlserver: "`REPLACE(texte, ancien, nouveau)` ; la casse suit la collation",
      snowflake: "`REPLACE(texte, ancien, nouveau)` ; casse exacte ; sans 3e argument, il supprime",
      mysql: "`REPLACE(texte, ancien, nouveau)` ; casse toujours exacte, même avec une collation sans casse"
    },
    noms: [],
    exemple: "SELECT code, REPLACE(code, '-', '') AS code_edi\nFROM article\nWHERE famille = 'CHIMIE';",
    resultat: [["code", "code_edi"], ["CHL-5", "CHL5"], ["CHL-25", "CHL25"], ["PH-5", "PH5"]],
    piege: "Sur '1 234,50', remplacer seulement la virgule donne '1 234.50', que TRY_CAST refuse (NULL). Enlève d'abord l'espace des milliers, puis la virgule : `REPLACE(REPLACE(m, ' ', ''), ',', '.')`.",
    pratique: "Pour changer plusieurs caractères d'un coup, `TRANSLATE(date_txt, '/.', '--')` remplace chaque caractère par celui de même place : '01/03/2026' et '01.03.2026' deviennent '01-03-2026'. SQL Server 2017+ et Snowflake ; pas sur MySQL.",
    motsCles: ["remplacer", "substituer", "changer", "enlever", "supprimer", "caractère", "virgule", "point", "nettoyer", "corriger", "translate", "échanger", "modifier", "retirer"],
    voirAussi: ["trim", "stuff", "try-cast", "upper-lower"],
    module: "m03"
  },
  {
    id: "upper-lower",
    nom: "UPPER, LOWER",
    type: "fonction",
    categorie: "Texte",
    definition: "Met un texte tout en majuscules (UPPER) ou tout en minuscules (LOWER).",
    moteurs: {
      sqlserver: "`UPPER(texte)`, `LOWER(texte)`",
      snowflake: "`UPPER(texte)`, `LOWER(texte)` ; `INITCAP` met une majuscule au début de chaque mot",
      mysql: "`UPPER(texte)`, `LOWER(texte)`, ou leurs synonymes `UCASE`, `LCASE`"
    },
    noms: ["UPPER", "LOWER", "UCASE", "LCASE"],
    exemple: "SELECT code, nom, UPPER(nom) AS nom_edi\nFROM client\nWHERE pays = 'CH' OR type = 'GD';",
    resultat: [["code", "nom", "nom_edi"], ["C001", "AquaBleu", "AQUABLEU"], ["C005", "Pool & Garden", "POOL & GARDEN"]],
    piege: "Sur SQL Server, la colonne est souvent déjà sans casse (collation `_CI_`) : `WHERE UPPER(nom) = 'AQUABLEU'` ne sert à rien et empêche l'index. Sur Snowflake, la casse compte : là, UPPER ou ILIKE est nécessaire.",
    pratique: "Normalise les codes une seule fois, au chargement de l'import : `INSERT … SELECT UPPER(TRIM(code)) …`. Les requêtes qui lisent ensuite la table n'ont plus besoin de convertir.",
    motsCles: ["majuscules", "minuscules", "casse", "capitales", "convertir", "maj", "ucase", "lcase", "lettres", "texte", "uppercase", "lowercase", "initcap", "minuscule"],
    voirAussi: ["ilike", "like", "trim", "replace"],
    module: "m03"
  },
  {
    id: "trim",
    nom: "TRIM",
    type: "fonction",
    categorie: "Texte",
    definition: "Enlève les espaces au début et à la fin d'un texte.",
    moteurs: {
      sqlserver: "`TRIM(texte)` (2017+), avant : `LTRIM(RTRIM(texte))` ; d'autres caractères : `TRIM('0' FROM texte)`",
      snowflake: "`TRIM(texte)` ; d'autres caractères : `TRIM(texte, '0')`, ou `LTRIM(texte, '0')` pour le début seul",
      mysql: "`TRIM(texte)` ; d'autres caractères : `TRIM('0' FROM texte)`, ou `TRIM(LEADING '0' FROM texte)` pour le début seul"
    },
    noms: ["LTRIM", "RTRIM"],
    exemple: "-- Un code reçu avec des espaces autour (test sans table)\nSELECT '[' + TRIM('  C001 ') + ']' AS avec_trim,\n       '[' + RTRIM('  C001 ') + ']' AS avec_rtrim;",
    exemples: {
      snowflake: "-- Un code reçu avec des espaces autour (test sans table)\nSELECT '[' || TRIM('  C001 ') || ']' AS avec_trim,\n       '[' || RTRIM('  C001 ') || ']' AS avec_rtrim;",
      mysql: "-- Un code reçu avec des espaces autour (test sans table)\nSELECT CONCAT('[', TRIM('  C001 '), ']') AS avec_trim,\n       CONCAT('[', RTRIM('  C001 '), ']') AS avec_rtrim;"
    },
    resultat: [["avec_trim", "avec_rtrim"], ["[C001]", "[  C001]"]],
    piege: "TRIM n'enlève que l'espace simple : une tabulation, un retour à la ligne ou l'espace insécable d'Excel restent, et la comparaison échoue sans erreur. Enlève-les d'abord, par exemple `REPLACE(x, CHAR(9), '')` pour la tabulation.",
    pratique: "Pour lister les codes reçus avec des espaces autour : `WHERE code <> TRIM(code)` sur Snowflake et MySQL (collation par défaut). Sur SQL Server, `<>` ignore les espaces de fin : compare `DATALENGTH(code) <> DATALENGTH(TRIM(code))` (pas sur un CHAR).",
    motsCles: ["espaces", "enlever", "supprimer", "nettoyer", "blancs", "début", "fin", "retirer", "ltrim", "rtrim", "zéros", "propre", "nettoyage", "rogner"],
    voirAussi: ["replace", "len", "nullif", "upper-lower"],
    module: "m03"
  },
  {
    id: "concat",
    nom: "CONCAT",
    type: "fonction",
    categorie: "Texte",
    definition: "Colle plusieurs textes bout à bout pour n'en faire qu'un.",
    moteurs: {
      sqlserver: "`CONCAT(a, b, …)` : un NULL devient vide ; `a + b` : un NULL rend tout NULL ; `||` en 2025+",
      snowflake: "`CONCAT(a, b, …)` ou `a || b` : un seul NULL rend tout NULL",
      mysql: "`CONCAT(a, b, …)` : un seul NULL rend tout NULL ; `||` y veut dire OU, pas « coller » (sauf mode `PIPES_AS_CONCAT`)"
    },
    noms: ["||", "+"],
    exemple: "SELECT ville,\n       CONCAT(nom, ' (', ville, ')') AS etiquette\nFROM client\nWHERE pays = 'FR' AND type = 'PRO';",
    resultat: [["ville", "etiquette"], ["Grenoble", "Piscines Dumont (Grenoble)"], ["Nice", "Bleu Lagon (Nice)"], ["Montpellier", "Hydro Sud (Montpellier)"], ["Lyon", "Piscines Dumont (Lyon)"], [null, "Camping Les Flots ()"]],
    piege: "Sur Snowflake et MySQL, un seul NULL rend tout le texte NULL : la dernière étiquette (Camping Les Flots, ville vide) sort vide. Pour un code qui marche partout : `CONCAT(nom, ' (', COALESCE(ville, ''), ')')`.",
    pratique: "CONCAT convertit seul les nombres en texte : `CONCAT('Stock : ', stock)` marche sur les 3 moteurs. Avec `+`, SQL Server tente une addition et plante (« Conversion failed »).",
    motsCles: ["coller", "concaténer", "concaténation", "assembler", "joindre", "fusionner", "ajouter", "plus", "pipe", "étiquette", "combiner", "chaîne", "accoler", "texte", "regrouper"],
    voirAussi: ["concat-ws", "coalesce", "cast", "lpad"],
    module: "m03"
  },
  {
    id: "concat-ws",
    nom: "CONCAT_WS",
    type: "fonction",
    categorie: "Texte",
    definition: "Colle plusieurs textes en mettant le même séparateur entre chacun.",
    moteurs: {
      sqlserver: "`CONCAT_WS(';', a, b, …)` (2017+) : saute les NULL",
      snowflake: "`CONCAT_WS(';', a, b, …)` : un seul NULL rend tout NULL",
      mysql: "`CONCAT_WS(';', a, b, …)` : saute les NULL, comme SQL Server"
    },
    noms: [],
    exemple: "-- Une ligne de fichier CSV par client\nSELECT CONCAT_WS(';', code, nom, ville, siren) AS ligne_csv\nFROM client\nWHERE pays = 'FR' AND type = 'PRO';",
    resultat: [["ligne_csv"], ["C002;Piscines Dumont;Grenoble;423456789"], ["C003;Bleu Lagon;Nice"], ["C004;Hydro Sud;Montpellier;334567890"], ["C006;Piscines Dumont;Lyon;423456789"], ["C007;Camping Les Flots;245678901"]],
    piege: "Sauter un NULL décale les colonnes du CSV : C007 n'a plus que 3 champs, et son SIREN tombe dans la colonne ville. Garde la place vide avec `COALESCE(ville, '')` (sur Snowflake, un NULL rend même toute la ligne NULL).",
    pratique: "Pour une clé de rapprochement sur deux colonnes, mets un séparateur : `CONCAT_WS('|', cde_id, article_id)`. Sans lui, 1 et 23 donnent '123', comme 12 et 3 : deux lignes différentes se confondent.",
    motsCles: ["séparateur", "coller", "concaténer", "csv", "point-virgule", "virgule", "liste", "export", "assembler", "ligne", "délimiteur", "fichier", "joindre", "separator"],
    voirAussi: ["concat", "coalesce", "string-split"],
    module: "m03"
  },
  {
    id: "string-split",
    nom: "STRING_SPLIT",
    type: "fonction",
    categorie: "Texte",
    definition: "Coupe un texte à chaque séparateur pour en tirer les morceaux.",
    moteurs: {
      sqlserver: "`STRING_SPLIT(texte, '-')` : une ligne par morceau ; avec leur numéro : `STRING_SPLIT(texte, '-', 1)` (2022+)",
      snowflake: "`SPLIT_PART(texte, '-', 2)` : le 2e morceau ; une ligne par morceau : `SPLIT_TO_TABLE`",
      mysql: "Pas de STRING_SPLIT : `SUBSTRING_INDEX(texte, '-', 2)` garde tout ce qui est avant le 2e séparateur"
    },
    noms: ["SPLIT_PART", "SPLIT_TO_TABLE", "SUBSTRING_INDEX"],
    exemple: "SELECT f.num_fact, s.value AS morceau\nFROM facture AS f\nCROSS APPLY STRING_SPLIT(f.num_fact, '-') AS s\nWHERE f.statut = 'RETARD';",
    exemples: {
      snowflake: "SELECT f.num_fact, s.value AS morceau\nFROM facture AS f,\n     LATERAL SPLIT_TO_TABLE(f.num_fact, '-') AS s\nWHERE f.statut = 'RETARD';",
      mysql: "-- Pas de fonction qui découpe en lignes : un morceau par colonne\nSELECT num_fact,\n       SUBSTRING_INDEX(num_fact, '-', 1) AS morceau_1,\n       SUBSTRING_INDEX(SUBSTRING_INDEX(num_fact, '-', 2), '-', -1) AS morceau_2\nFROM facture\nWHERE statut = 'RETARD';"
    },
    resultat: [["num_fact", "morceau"], ["FA-2026-0303", "FA"], ["FA-2026-0303", "2026"], ["FA-2026-0303", "0303"]],
    piege: "STRING_SPLIT ne garantit pas l'ordre des morceaux : pour prendre « le 2e », ajoute le 3e argument `1` et filtre sur la colonne `ordinal` (2022+). Sur Snowflake, `SPLIT_PART(num_fact, '-', 2)` donne directement '2026'.",
    pratique: "Sur SQL Server, découpe un paramètre de rapport reçu en un seul texte ('C001; C002') pour filtrer : `WHERE code IN (SELECT TRIM(value) FROM STRING_SPLIT(@liste, ';'))`. TRIM enlève l'espace après chaque point-virgule.",
    motsCles: ["découper", "couper", "séparer", "séparateur", "morceaux", "split", "éclater", "liste", "point-virgule", "partie", "segment", "diviser", "lignes", "délimiteur", "tableau"],
    voirAussi: ["substring", "charindex", "concat-ws"],
    module: "m03"
  },
  {
    id: "stuff",
    nom: "STUFF",
    type: "fonction",
    categorie: "Texte",
    definition: "Insère un texte à une position donnée, en supprimant ou non des caractères à cet endroit.",
    moteurs: {
      sqlserver: "`STUFF(texte, début, nb_à_supprimer, à_insérer)`",
      snowflake: "Pas de STUFF : `INSERT(texte, début, nb_à_supprimer, à_insérer)`",
      mysql: "Pas de STUFF : `INSERT(texte, début, nb_à_supprimer, à_insérer)`"
    },
    noms: ["INSERT"],
    exemple: "-- SIREN lisible : 512345678 → 512 345 678\nSELECT code, siren,\n       STUFF(STUFF(siren, 7, 0, ' '), 4, 0, ' ') AS siren_lisible\nFROM client\nWHERE siren IS NOT NULL;",
    exemples: {
      snowflake: "-- SIREN lisible : 512345678 → 512 345 678\nSELECT code, siren,\n       INSERT(INSERT(siren, 7, 0, ' '), 4, 0, ' ') AS siren_lisible\nFROM client\nWHERE siren IS NOT NULL;",
      mysql: "-- SIREN lisible : 512345678 → 512 345 678\nSELECT code, siren,\n       INSERT(INSERT(siren, 7, 0, ' '), 4, 0, ' ') AS siren_lisible\nFROM client\nWHERE siren IS NOT NULL;"
    },
    resultat: [["code", "siren", "siren_lisible"], ["C001", "512345678", "512 345 678"], ["C002", "423456789", "423 456 789"], ["C004", "334567890", "334 567 890"], ["C006", "423456789", "423 456 789"], ["C007", "245678901", "245 678 901"]],
    piege: "Chaque insertion décale les positions qui suivent : insère d'abord le plus à droite (7), puis le plus à gauche (4). Dans l'autre ordre, on obtient '512 34 5678'.",
    pratique: "Dans un vieux code SQL Server, `STUFF((SELECT ',' + code … FOR XML PATH('')), 1, 1, '')` colle une liste : STUFF y retire la 1re virgule. Depuis 2017, `STRING_AGG(code, ',')` fait ce travail, plus lisiblement.",
    motsCles: ["insérer", "ajouter", "position", "caractère", "séparateur", "remplacer", "supprimer", "milieu", "espace", "intercaler", "glisser", "formater", "mettre", "deux-points"],
    voirAussi: ["replace", "substring", "lpad", "concat"],
    module: "m03"
  },
  {
    id: "lpad",
    nom: "LPAD",
    type: "fonction",
    categorie: "Texte",
    definition: "Complète un texte à gauche, avec un caractère choisi, jusqu'à une longueur donnée.",
    moteurs: {
      sqlserver: "Pas de LPAD : `RIGHT('00000' + CAST(n AS varchar(10)), 5)`",
      snowflake: "`LPAD(texte, 5, '0')` ; à droite : `RPAD`",
      mysql: "`LPAD(texte, 5, '0')` ; à droite : `RPAD`"
    },
    noms: ["RPAD"],
    exemple: "-- Stock sur 5 chiffres, pour un fichier à longueur fixe\nSELECT code, stock,\n       RIGHT('00000' + CAST(stock AS varchar(10)), 5) AS stock_fixe\nFROM article\nWHERE famille IN ('FILTRATION', 'ROBOT');",
    exemples: {
      snowflake: "-- Stock sur 5 chiffres, pour un fichier à longueur fixe\nSELECT code, stock,\n       LPAD(TO_VARCHAR(stock), 5, '0') AS stock_fixe\nFROM article\nWHERE famille IN ('FILTRATION', 'ROBOT');",
      mysql: "-- Stock sur 5 chiffres, pour un fichier à longueur fixe\nSELECT code, stock,\n       LPAD(stock, 5, '0') AS stock_fixe\nFROM article\nWHERE famille IN ('FILTRATION', 'ROBOT');"
    },
    resultat: [["code", "stock", "stock_fixe"], ["FIL-14", 12, "00012"], ["POMP-1", 0, "00000"], ["ROB-X", 5, "00005"]],
    piege: "Trop long, le texte est coupé sans erreur : 123456 sur 5 chiffres donne '23456' avec RIGHT, et '12345' avec LPAD. Vérifie la longueur avant (`LEN`), sinon le fichier EDI part avec un faux chiffre.",
    pratique: "Pour un fichier à longueur fixe, complète aussi les textes à droite : `RPAD(nom, 35, ' ')` sur Snowflake et MySQL ; sur SQL Server, `CAST(nom AS char(35))` ajoute les espaces de fin.",
    motsCles: ["compléter", "zéros", "remplir", "gauche", "longueur", "fixe", "padding", "aligner", "format", "rpad", "devant", "chiffres", "code", "pad", "replicate"],
    voirAussi: ["right", "format", "cast", "len"],
    module: "m03"
  }
]);
