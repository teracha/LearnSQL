// Astuces SQL, famille « Nettoyer du texte » (docs/astuces.md). Chaque résultat est vérifié sur docs/base-exemple.sql.
// Sources (lues le 13/11/2026) :
// - SQL Server, learn.microsoft.com/sql/t-sql : functions/trim (2017+ ; LEADING / TRAILING : 2022, niveau 160),
//   functions/ltrim et rtrim (2e argument : 2022, niveau 160 ; des caractères, pas un mot), functions/translate (2017+ ;
//   listes de même longueur, sinon erreur ; un caractère n'est remplacé qu'une fois), functions/replace (suit la
//   collation), functions/regexp-replace (SQL Server 2025, syntaxe RE2), functions/patindex, functions/unicode,
//   functions/nchar, functions/char (9, 10, 13), functions/len, functions/charindex, functions/left (longueur négative =
//   erreur), language-elements/string-comparison-assignment (`=` ignore les espaces de fin).
// - Snowflake, docs.snowflake.com/en/sql-reference : functions/trim, ltrim (des caractères, en n'importe quel ordre),
//   functions/translate (sans correspondant : supprimé ; collation ignorée), functions/regexp_replace et functions-regexp,
//   functions/split_part (morceau absent : ''), functions/unicode, functions/chr (CHAR = CHR, code Unicode),
//   functions/regexp_instr, collation (pas de « trim » par défaut : les espaces de fin comptent), data-types-text.
// - MySQL 8.4, dev.mysql.com/doc/refman/8.4/en : string-functions (TRIM(LEADING texte FROM …) enlève le texte entier,
//   REPLACE sensible à la casse, SUBSTRING_INDEX, HEX, CHAR_LENGTH), regexp (REGEXP_REPLACE, ICU), string-literals (\r \n
//   \t), charset-introducer (_utf8mb4 X'C2A0'), charset-unicode-sets (utf8mb4_0900_ai_ci : NO PAD, espaces de fin
//   comptés) ; SUBSTRING_INDEX sans séparateur rend le texte entier (code source 8.4, item_strfunc.cc).
LEARNSQL.astuces = (LEARNSQL.astuces || []).concat([
  {
    id: "espaces-debut-fin",
    titre: "Enlever les espaces au début et à la fin",
    famille: "Nettoyer du texte",
    besoins: ["supprimer les espaces qui entourent un code", "nettoyer un code reçu avec des blancs autour", "enlever les espaces en trop d'un import"],
    essais: ["un espace en fin de code casse ma jointure", "virer les blancs autour du texte", "nettoyer les espaces parasites d'un champ"],
    moteurs: {
      sqlserver: "`TRIM(x)` (2017+) ; avant : `LTRIM(RTRIM(x))`",
      snowflake: "`TRIM(x)` ; d'un seul côté : `LTRIM(x)`, `RTRIM(x)`",
      mysql: "`TRIM(x)` ; d'un seul côté : `LTRIM(x)`, `RTRIM(x)`"
    },
    exemple: "-- Des codes clients reçus dans un fichier, avec des espaces autour\nWITH recu AS (\n  SELECT '  C001' AS code UNION ALL\n  SELECT 'C002  ' UNION ALL\n  SELECT ' C004 '\n)\nSELECT '[' + r.code + ']' AS code_recu, c.nom\nFROM recu AS r\nJOIN client AS c ON c.code = TRIM(r.code)\nORDER BY c.code;",
    exemples: {
      snowflake: "-- Des codes clients reçus dans un fichier, avec des espaces autour\nWITH recu AS (\n  SELECT '  C001' AS code UNION ALL\n  SELECT 'C002  ' UNION ALL\n  SELECT ' C004 '\n)\nSELECT '[' || r.code || ']' AS code_recu, c.nom\nFROM recu AS r\nJOIN client AS c ON c.code = TRIM(r.code)\nORDER BY c.code;",
      mysql: "-- Des codes clients reçus dans un fichier, avec des espaces autour\nWITH recu AS (\n  SELECT '  C001' AS code UNION ALL\n  SELECT 'C002  ' UNION ALL\n  SELECT ' C004 '\n)\nSELECT CONCAT('[', r.code, ']') AS code_recu, c.nom\nFROM recu AS r\nJOIN client AS c ON c.code = TRIM(r.code)\nORDER BY c.code;"
    },
    resultat: [["code_recu", "nom"], ["[  C001]", "AquaBleu"], ["[C002  ]", "Piscines Dumont"], ["[ C004 ]", "Hydro Sud"]],
    piege: "Sur SQL Server, `=` ignore les espaces de fin : 'C002  ' = 'C002' est vrai, mais faux sur Snowflake et sur MySQL 8. Les espaces de début, eux, font échouer la jointure partout.",
    pratique: "Nettoie une seule fois, à l'import : `TRIM` dans l'`INSERT … SELECT`, ou un `UPDATE … SET code = TRIM(code)`. Un TRIM dans le ON de chaque jointure empêche l'index de servir.",
    motsCles: ["trim", "espaces", "début", "fin", "blancs", "autour", "entourent", "parasites", "enlever", "supprimer", "nettoyer", "jointure"],
    voirAussi: ["trim", "len", "replace", "varchar", "inner-join"]
  },
  {
    id: "espaces-en-double",
    titre: "Remplacer les espaces en double par un seul",
    famille: "Nettoyer du texte",
    besoins: ["supprimer les doubles espaces au milieu d'un nom", "réduire plusieurs espaces à un seul", "nettoyer un libellé qui a des espaces en trop entre les mots"],
    essais: ["deux espaces entre les mots", "supprimer les espaces multiples", "trop de blancs au milieu du texte"],
    moteurs: {
      sqlserver: "2025+ : `REGEXP_REPLACE(x, ' {2,}', ' ')` ; avant : `REPLACE(REPLACE(REPLACE(x, ' ', '<>'), '><', ''), '<>', ' ')`",
      snowflake: "`REGEXP_REPLACE(x, ' {2,}', ' ')`",
      mysql: "`REGEXP_REPLACE(x, ' {2,}', ' ')` (8.0+)"
    },
    exemple: "-- Des noms saisis avec des espaces en trop au milieu\nWITH saisie AS (\n  SELECT 'Piscines   Dumont' AS nom UNION ALL\n  SELECT 'Hydro  Sud'\n),\npropre AS (\n  SELECT nom,\n         REPLACE(REPLACE(REPLACE(nom, ' ', '<>'), '><', ''), '<>', ' ')\n           AS nom_propre\n  FROM saisie\n)\nSELECT nom_propre, LEN(nom) AS lg_avant, LEN(nom_propre) AS lg_apres\nFROM propre\nORDER BY lg_avant DESC;",
    exemples: {
      snowflake: "-- Des noms saisis avec des espaces en trop au milieu\nWITH saisie AS (\n  SELECT 'Piscines   Dumont' AS nom UNION ALL\n  SELECT 'Hydro  Sud'\n),\npropre AS (\n  SELECT nom, REGEXP_REPLACE(nom, ' {2,}', ' ') AS nom_propre\n  FROM saisie\n)\nSELECT nom_propre,\n       LENGTH(nom) AS lg_avant, LENGTH(nom_propre) AS lg_apres\nFROM propre\nORDER BY lg_avant DESC;",
      mysql: "-- Des noms saisis avec des espaces en trop au milieu\nWITH saisie AS (\n  SELECT 'Piscines   Dumont' AS nom UNION ALL\n  SELECT 'Hydro  Sud'\n),\npropre AS (\n  SELECT nom, REGEXP_REPLACE(nom, ' {2,}', ' ') AS nom_propre\n  FROM saisie\n)\nSELECT nom_propre,\n       CHAR_LENGTH(nom) AS lg_avant, CHAR_LENGTH(nom_propre) AS lg_apres\nFROM propre\nORDER BY lg_avant DESC;"
    },
    resultat: [["nom_propre", "lg_avant", "lg_apres"], ["Piscines Dumont", 17, 15], ["Hydro Sud", 10, 9]],
    piege: "Ces recettes ne voient que l'espace simple : une tabulation ou un espace insécable entre deux mots reste en place. Et le truc des 3 REPLACE suppose que le texte ne contient ni `<` ni `>`.",
    pratique: "Enchaîne les deux nettoyages : `TRIM` pour les bouts, puis les espaces en double au milieu. Fais-le une fois, à l'import des noms (clients, articles), avant de chercher les doublons.",
    motsCles: ["espaces", "double", "doubles espaces", "espaces multiples", "plusieurs espaces", "un seul", "milieu", "entre les mots", "réduire", "nettoyer", "blancs", "compacter"],
    voirAussi: ["replace", "trim", "len"]
  },
  {
    id: "retours-ligne",
    titre: "Enlever les retours à la ligne et les tabulations",
    famille: "Nettoyer du texte",
    besoins: ["supprimer les sauts de ligne dans un libellé", "un export CSV cassé par des retours à la ligne", "enlever les tabulations d'un texte"],
    essais: ["retour chariot char(13) a enlever", "mon fichier csv est decale a cause des passages a la ligne", "remplacer les sauts de ligne par un espace"],
    moteurs: {
      sqlserver: "`REPLACE(REPLACE(REPLACE(x, CHAR(13), ''), CHAR(10), ' '), CHAR(9), ' ')` (13 = retour chariot, 10 = saut de ligne, 9 = tabulation)",
      snowflake: "Même écriture avec `CHAR(13)`, `CHAR(10)`, `CHAR(9)` ; ou `'\\r'`, `'\\n'`, `'\\t'` dans le texte",
      mysql: "`REPLACE(REPLACE(REPLACE(x, '\\r', ''), '\\n', ' '), '\\t', ' ')`"
    },
    exemple: "-- Deux libellés reçus : un retour à la ligne, une tabulation\nWITH recu AS (\n  SELECT 'Filtre à sable' + CHAR(13) + CHAR(10) + '14 m3/h' AS libelle\n  UNION ALL\n  SELECT 'Pompe' + CHAR(9) + '1 CV'\n)\nSELECT a.code, a.libelle\nFROM recu AS r\nJOIN article AS a\n  ON a.libelle = REPLACE(REPLACE(REPLACE(r.libelle,\n                   CHAR(13), ''), CHAR(10), ' '), CHAR(9), ' ')\nORDER BY a.code;",
    exemples: {
      snowflake: "-- Deux libellés reçus : un retour à la ligne, une tabulation\nWITH recu AS (\n  SELECT 'Filtre à sable' || CHAR(13) || CHAR(10) || '14 m3/h'\n         AS libelle\n  UNION ALL\n  SELECT 'Pompe' || CHAR(9) || '1 CV'\n)\nSELECT a.code, a.libelle\nFROM recu AS r\nJOIN article AS a\n  ON a.libelle = REPLACE(REPLACE(REPLACE(r.libelle,\n                   CHAR(13), ''), CHAR(10), ' '), CHAR(9), ' ')\nORDER BY a.code;",
      mysql: "-- Deux libellés reçus : un retour à la ligne, une tabulation\nWITH recu AS (\n  SELECT CONCAT('Filtre à sable', '\\r\\n', '14 m3/h') AS libelle\n  UNION ALL\n  SELECT CONCAT('Pompe', '\\t', '1 CV')\n)\nSELECT a.code, a.libelle\nFROM recu AS r\nJOIN article AS a\n  ON a.libelle = REPLACE(REPLACE(REPLACE(r.libelle,\n                   '\\r', ''), '\\n', ' '), '\\t', ' ')\nORDER BY a.code;"
    },
    resultat: [["code", "libelle"], ["FIL-14", "Filtre à sable 14 m3/h"], ["POMP-1", "Pompe 1 CV"]],
    piege: "Un retour à la ligne Windows, c'est deux caractères (CHAR(13) puis CHAR(10)) : remplacés chacun par un espace, ils en laissent deux. Enlève CHAR(13), puis remplace CHAR(10) par un espace.",
    pratique: "Une cellule Excel coupée avec Alt+Entrée ne contient que CHAR(10). Avant un export CSV, nettoie aussi le point-virgule et les guillemets du texte : sinon les colonnes se décalent.",
    motsCles: ["retour à la ligne", "saut de ligne", "retour chariot", "tabulation", "crlf", "csv", "invisible", "enlever", "supprimer", "excel", "alt entrée", "ligne cassée"],
    voirAussi: ["replace", "trim", "concat-ws"]
  },
  {
    id: "garder-chiffres",
    titre: "Garder seulement les chiffres (téléphone, SIRET)",
    famille: "Nettoyer du texte",
    besoins: ["enlever tout ce qui n'est pas un chiffre", "nettoyer un numéro de téléphone saisi avec des points et des tirets", "garder les chiffres d'un SIRET tapé avec des espaces"],
    essais: ["supprimer la ponctuation d'un numero de tel", "uniquement des chiffres dans le champ telephone", "ne garder que les chiffres d'un siret"],
    moteurs: {
      sqlserver: "2025+ : `REGEXP_REPLACE(x, '[^0-9]', '')` ; avant : `REPLACE(TRANSLATE(x, ' .-/', '####'), '#', '')` (seulement les caractères listés)",
      snowflake: "`REGEXP_REPLACE(x, '[^0-9]', '')`",
      mysql: "`REGEXP_REPLACE(x, '[^0-9]', '')` (8.0+)"
    },
    exemple: "-- Des téléphones saisis à la main dans la fiche client\nWITH saisie AS (\n  SELECT '04 78 12 34 56' AS tel UNION ALL\n  SELECT '04.78.12.34.56' UNION ALL\n  SELECT '04-78-12/34-56'\n)\nSELECT tel, REPLACE(TRANSLATE(tel, ' .-/', '####'), '#', '') AS chiffres\nFROM saisie;",
    exemples: {
      snowflake: "-- Des téléphones saisis à la main dans la fiche client\nWITH saisie AS (\n  SELECT '04 78 12 34 56' AS tel UNION ALL\n  SELECT '04.78.12.34.56' UNION ALL\n  SELECT '04-78-12/34-56'\n)\nSELECT tel, REGEXP_REPLACE(tel, '[^0-9]', '') AS chiffres\nFROM saisie;",
      mysql: "-- Des téléphones saisis à la main dans la fiche client\nWITH saisie AS (\n  SELECT '04 78 12 34 56' AS tel UNION ALL\n  SELECT '04.78.12.34.56' UNION ALL\n  SELECT '04-78-12/34-56'\n)\nSELECT tel, REGEXP_REPLACE(tel, '[^0-9]', '') AS chiffres\nFROM saisie;"
    },
    resultat: [["tel", "chiffres"], ["04 78 12 34 56", "0478123456"], ["04.78.12.34.56", "0478123456"], ["04-78-12/34-56", "0478123456"]],
    piege: "Garde le résultat en texte : en nombre (INT), 0478123456 perd son zéro de tête et devient 478123456. Sur SQL Server avant 2025, TRANSLATE n'enlève que les caractères listés : une lettre oubliée reste.",
    pratique: "Après le nettoyage, contrôle la longueur : 10 chiffres pour un téléphone français, 9 pour un SIREN, 14 pour un SIRET. Les autres lignes sont à corriger à la main.",
    motsCles: ["chiffres", "seulement", "numérique", "téléphone", "siret", "siren", "lettres", "ponctuation", "enlever", "nettoyer", "numéro", "garder"],
    voirAussi: ["replace", "len", "try-cast", "varchar"]
  },
  {
    id: "enlever-accents",
    titre: "Enlever les accents",
    famille: "Nettoyer du texte",
    besoins: ["remplacer é par e et à par a", "un libellé sans accents pour un fichier EDI", "supprimer les accents d'un texte"],
    essais: ["caracteres accentues a convertir", "e accent aigu en e simple", "texte sans accent pour l edifact"],
    moteurs: {
      sqlserver: "`TRANSLATE(x COLLATE Latin1_General_BIN2, 'àâäéèêëîïôöùûüÿç', 'aaaeeeeiioouuuyc')` (2017+) ; ajoute les majuscules (À, É…) aux deux listes",
      snowflake: "`TRANSLATE(x, 'àâäéèêëîïôöùûüÿç', 'aaaeeeeiioouuuyc')` ; ajoute les majuscules (À, É…) aux deux listes",
      mysql: "Pas de TRANSLATE : un `REPLACE` par lettre, `REPLACE(REPLACE(x, 'é', 'e'), 'è', 'e')…` (REPLACE respecte toujours la casse)"
    },
    exemple: "-- BIN2 : comparer lettre par lettre (É n'est pas é)\nSELECT code, libelle,\n       TRANSLATE(libelle COLLATE Latin1_General_BIN2,\n                 'àâäéèêëîïôöùûüÿçÀÂÄÉÈÊËÎÏÔÖÙÛÜŸÇ',\n                 'aaaeeeeiioouuuycAAAEEEEIIOOUUUYC') AS libelle_edi\nFROM article\nWHERE id IN (6, 7, 8)\nORDER BY id;",
    exemples: {
      snowflake: "SELECT code, libelle,\n       TRANSLATE(libelle,\n                 'àâäéèêëîïôöùûüÿçÀÂÄÉÈÊËÎÏÔÖÙÛÜŸÇ',\n                 'aaaeeeeiioouuuycAAAEEEEIIOOUUUYC') AS libelle_edi\nFROM article\nWHERE id IN (6, 7, 8)\nORDER BY id;",
      mysql: "-- Un REPLACE par lettre : complète la liste selon tes données\nSELECT code, libelle,\n       REPLACE(REPLACE(REPLACE(REPLACE(libelle,\n         'é', 'e'), 'É', 'E'), 'â', 'a'), 'à', 'a') AS libelle_edi\nFROM article\nWHERE id IN (6, 7, 8)\nORDER BY id;"
    },
    resultat: [["code", "libelle", "libelle_edi"], ["ROB-X", "Robot électrique X", "Robot electrique X"], ["EPU-F", "Épuisette de fond", "Epuisette de fond"], ["BACHE8", "Bâche à bulles 8 x 4 m", "Bache a bulles 8 x 4 m"]],
    piege: "Une lettre absente des listes passe telle quelle : pense aux majuscules (É, À) ; œ devient « oe » avec un REPLACE de plus. Sur SQL Server, les deux listes doivent avoir la même longueur, sinon erreur.",
    pratique: "En EDIFACT, le jeu de caractères UNOA (le plus strict) n'accepte que des majuscules sans accent : ajoute `UPPER` après TRANSLATE. Demande à ton partenaire son jeu (UNOA, UNOB, UNOC).",
    motsCles: ["accents", "accentués", "accent aigu", "sans accent", "caractères spéciaux", "enlever", "supprimer", "edi", "edifact", "unoa", "ascii", "lettres"],
    voirAussi: ["replace", "collate", "upper-lower", "nvarchar"]
  },
  {
    id: "enlever-prefixe",
    titre: "Enlever un préfixe (CDE-, FA-)",
    famille: "Nettoyer du texte",
    besoins: ["enlever CDE- devant le numéro de commande", "garder le numéro sans son préfixe", "supprimer le début fixe d'un code"],
    essais: ["retirer les 4 premiers caracteres d'un code", "numero de commande sans le cde-", "virer le prefixe d'une reference"],
    moteurs: {
      sqlserver: "`SUBSTRING(x, 5, 50)` si `x LIKE 'CDE-%'` (5 = longueur du préfixe + 1) ; `REPLACE(x, 'CDE-', '')` enlève aussi un « CDE- » au milieu",
      snowflake: "`REGEXP_REPLACE(x, '^CDE-', '')` : seulement au début",
      mysql: "`TRIM(LEADING 'CDE-' FROM x)` : enlève bien le mot entier au début"
    },
    exemple: "SELECT num_cde,\n       CASE WHEN num_cde LIKE 'CDE-%'\n            THEN SUBSTRING(num_cde, 5, 50)\n            ELSE num_cde END AS numero\nFROM commande\nWHERE id <= 3\nORDER BY id;",
    exemples: {
      snowflake: "SELECT num_cde,\n       REGEXP_REPLACE(num_cde, '^CDE-', '') AS numero\nFROM commande\nWHERE id <= 3\nORDER BY id;",
      mysql: "SELECT num_cde,\n       TRIM(LEADING 'CDE-' FROM num_cde) AS numero\nFROM commande\nWHERE id <= 3\nORDER BY id;"
    },
    resultat: [["num_cde", "numero"], ["CDE-1001", "1001"], ["CDE-1002", "1002"], ["CDE-1003", "1003"]],
    piege: "Sur SQL Server 2022 et Snowflake, `LTRIM(x, 'CDE-')` enlève chaque lettre C, D, E et - du début, pas le mot : 'CDE-E12' devient '12'. MySQL, lui, enlève bien le mot entier avec `TRIM(LEADING …)`.",
    pratique: "Pour joindre ce numéro à une colonne numérique de l'ERP, convertis-le avec `TRY_CAST(… AS INT)` (SQL Server, Snowflake) : un reste qui n'est pas un nombre donne NULL au lieu de planter.",
    motsCles: ["préfixe", "début", "enlever", "supprimer", "retirer", "premiers caractères", "référence", "code", "devant", "commande", "cde"],
    voirAussi: ["substring", "like", "replace", "trim", "try-cast"]
  },
  {
    id: "couper-au-tiret",
    titre: "Couper un code en deux autour d'un tiret",
    famille: "Nettoyer du texte",
    besoins: ["séparer CHL-25 en CHL et 25", "prendre ce qui est avant le tiret", "récupérer la partie après le tiret"],
    essais: ["split d'une reference sur le -", "decouper un code en deux colonnes", "avant et apres le separateur"],
    moteurs: {
      sqlserver: "Avant : `LEFT(code, CHARINDEX('-', code) - 1)` ; après : `SUBSTRING(code, CHARINDEX('-', code) + 1, 50)`",
      snowflake: "`SPLIT_PART(code, '-', 1)` et `SPLIT_PART(code, '-', 2)`",
      mysql: "`SUBSTRING_INDEX(code, '-', 1)` et `SUBSTRING_INDEX(code, '-', -1)`"
    },
    exemple: "SELECT code,\n       LEFT(code, CHARINDEX('-', code) - 1) AS avant,\n       SUBSTRING(code, CHARINDEX('-', code) + 1, 50) AS apres\nFROM article\nWHERE famille = 'CHIMIE'\nORDER BY id;",
    exemples: {
      snowflake: "SELECT code,\n       SPLIT_PART(code, '-', 1) AS avant,\n       SPLIT_PART(code, '-', 2) AS apres\nFROM article\nWHERE famille = 'CHIMIE'\nORDER BY id;",
      mysql: "SELECT code,\n       SUBSTRING_INDEX(code, '-', 1) AS avant,\n       SUBSTRING_INDEX(code, '-', -1) AS apres\nFROM article\nWHERE famille = 'CHIMIE'\nORDER BY id;"
    },
    resultat: [["code", "avant", "apres"], ["CHL-5", "CHL", "5"], ["CHL-25", "CHL", "25"], ["PH-5", "PH", "5"]],
    piege: "Un code sans tiret (BACHE8) : SQL Server plante sur `LEFT(code, -1)`, Snowflake rend '' pour la 2e partie, MySQL rend le code entier des deux côtés. Filtre avec `LIKE '%-%'`, ou protège avec `NULLIF(CHARINDEX('-', code), 0)`.",
    pratique: "Pour le morceau après le dernier tiret (FA-2026-0301 → 0301) : `SPLIT_PART(x, '-', -1)` sur Snowflake, `SUBSTRING_INDEX(x, '-', -1)` sur MySQL, `RIGHT(x, CHARINDEX('-', REVERSE(x)) - 1)` sur SQL Server.",
    motsCles: ["couper", "tiret", "séparer", "découper", "avant", "après", "deux parties", "séparateur", "split", "morceau", "colonnes", "référence"],
    voirAussi: ["charindex", "left", "substring", "string-split", "nullif"]
  },
  {
    id: "remplacer-plusieurs",
    titre: "Remplacer plusieurs caractères d'un coup",
    famille: "Nettoyer du texte",
    besoins: ["remplacer les espaces et les barres par des tirets bas", "changer plusieurs caractères en une seule fois", "éviter d'enchaîner les REPLACE", "la fonction TRANSLATE"],
    essais: ["translate en sql server", "plusieurs replace imbriques", "remplacer / et espace par _ pour un nom de fichier"],
    moteurs: {
      sqlserver: "`TRANSLATE(x, ' /', '__')` (2017+) : chaque caractère de la 2e liste devient celui de même place dans la 3e",
      snowflake: "`TRANSLATE(x, ' /', '__')` ; un caractère sans correspondant dans la 3e liste est supprimé",
      mysql: "Pas de TRANSLATE : `REPLACE(REPLACE(x, ' ', '_'), '/', '_')`"
    },
    exemple: "-- Un nom de fichier par article : ni espace, ni /\nSELECT code,\n       TRANSLATE(libelle, ' /', '__') AS nom_fichier\nFROM article\nWHERE id IN (4, 5, 6)\nORDER BY id;",
    exemples: {
      mysql: "-- Un nom de fichier par article : ni espace, ni /\nSELECT code,\n       REPLACE(REPLACE(libelle, ' ', '_'), '/', '_') AS nom_fichier\nFROM article\nWHERE id IN (4, 5, 6)\nORDER BY id;"
    },
    resultat: [["code", "nom_fichier"], ["FIL-14", "Filtre_à_sable_14_m3_h"], ["POMP-1", "Pompe_1_CV"], ["ROB-X", "Robot_électrique_X"]],
    piege: "Des REPLACE enchaînés peuvent remplacer deux fois (a → b, puis b → c change aussi les anciens a) ; TRANSLATE change chaque caractère une seule fois. Sur SQL Server, ses deux listes doivent avoir la même longueur.",
    pratique: "Pour supprimer des caractères avec TRANSLATE sur SQL Server, remplace-les par un témoin, puis enlève le témoin : `REPLACE(TRANSLATE(tel, ' .-', '###'), '#', '')` donne 0478123456.",
    motsCles: ["translate", "plusieurs caractères", "d'un coup", "en une fois", "remplacer", "imbriqués", "changer", "substituer", "nom de fichier", "barre", "tiret bas", "underscore"],
    voirAussi: ["replace", "stuff", "upper-lower"]
  },
  {
    id: "caracteres-invisibles",
    titre: "Repérer les caractères invisibles (espace insécable)",
    famille: "Nettoyer du texte",
    besoins: ["comprendre pourquoi deux codes qui semblent identiques ne sont pas égaux", "voir le code d'un caractère invisible", "repérer un espace insécable copié depuis Excel"],
    essais: ["ma jointure ne trouve rien alors que les codes sont pareils", "caractere bizarre invisible dans un champ", "espace insecable char 160"],
    moteurs: {
      sqlserver: "`UNICODE(RIGHT(x, 1))` : le code du dernier caractère (160 = espace insécable, 9 = tabulation) ; à comparer avec `LEN(x)`",
      snowflake: "`UNICODE(RIGHT(x, 1))` et `LENGTH(x)` ; le 1er caractère hors de l'ASCII imprimable : `REGEXP_INSTR(x, '[^ -~]')`",
      mysql: "`HEX(x)` montre les octets (C2A0 = espace insécable, 09 = tabulation) ; et `CHAR_LENGTH(x)`"
    },
    exemple: "-- Des codes collés depuis Excel, qui ne trouvent pas leur client\nWITH recu AS (\n  SELECT 'C001' + NCHAR(160) AS code   -- espace insécable\n  UNION ALL\n  SELECT 'C002' + CHAR(9)              -- tabulation\n)\nSELECT LEFT(code, 4) AS debut, LEN(code) AS longueur,\n       UNICODE(RIGHT(code, 1)) AS code_dernier\nFROM recu;",
    exemples: {
      snowflake: "-- Des codes collés depuis Excel, qui ne trouvent pas leur client\nWITH recu AS (\n  SELECT 'C001' || CHR(160) AS code   -- espace insécable\n  UNION ALL\n  SELECT 'C002' || CHR(9)             -- tabulation\n)\nSELECT LEFT(code, 4) AS debut, LENGTH(code) AS longueur,\n       UNICODE(RIGHT(code, 1)) AS code_dernier\nFROM recu;",
      mysql: "-- Des codes collés depuis Excel, qui ne trouvent pas leur client\nWITH recu AS (\n  SELECT CONCAT('C001', _utf8mb4 X'C2A0') AS code   -- espace insécable\n  UNION ALL\n  SELECT CONCAT('C002', '\\t')                       -- tabulation\n)\nSELECT LEFT(code, 4) AS debut, CHAR_LENGTH(code) AS longueur,\n       HEX(RIGHT(code, 1)) AS octets_dernier   -- C2A0, puis 09\nFROM recu;"
    },
    resultat: [["debut", "longueur", "code_dernier"], ["C001", 5, 160], ["C002", 5, 9]],
    piege: "TRIM n'enlève ni l'espace insécable ni la tabulation, et l'écran ne les montre pas : `WHERE code = 'C001'` échoue sans erreur. Enlève-les avec REPLACE : `REPLACE(code, NCHAR(160), '')` sur SQL Server, `CHR(160)` sur Snowflake.",
    pratique: "Les codes à connaître : 32 = espace normal, 160 = espace insécable (Excel, PDF, web), 9 = tabulation, 10 et 13 = retour à la ligne. Un autre code bizarre se cherche dans une table Unicode.",
    motsCles: ["invisible", "caractère", "espace insécable", "160", "code", "tabulation", "bizarre", "excel", "repérer", "identiques", "pareils", "jointure"],
    voirAussi: ["len", "trim", "replace", "right"]
  },
  {
    id: "enlever-zeros-devant",
    titre: "Enlever les zéros devant un code",
    famille: "Nettoyer du texte",
    besoins: ["transformer 000123 en 123", "enlever les zéros au début d'un numéro", "comparer un code reçu avec des zéros à un code sans zéros"],
    essais: ["virer les 0 non significatifs", "le code article arrive avec des zeros en trop au debut", "virer les zeros de tete d'un code"],
    moteurs: {
      sqlserver: "2022+ (niveau 160) : `LTRIM(x, '0')` ; avant : `SUBSTRING(x, PATINDEX('%[^0]%', x + '.'), LEN(x))` (la position du 1er caractère qui n'est pas un 0)",
      snowflake: "`LTRIM(x, '0')`",
      mysql: "`TRIM(LEADING '0' FROM x)`"
    },
    exemple: "-- Le numéro de facture du mois, sans ses zéros de tête\nWITH f AS (\n  SELECT num_fact, RIGHT(num_fact, 4) AS num_4\n  FROM facture\n)\nSELECT num_fact, num_4,\n       SUBSTRING(num_4, PATINDEX('%[^0]%', num_4 + '.'), 4)\n         AS sans_zeros\nFROM f\nORDER BY num_fact;",
    exemples: {
      snowflake: "-- Le numéro de facture du mois, sans ses zéros de tête\nSELECT num_fact, RIGHT(num_fact, 4) AS num_4,\n       LTRIM(RIGHT(num_fact, 4), '0') AS sans_zeros\nFROM facture\nORDER BY num_fact;",
      mysql: "-- Le numéro de facture du mois, sans ses zéros de tête\nSELECT num_fact, RIGHT(num_fact, 4) AS num_4,\n       TRIM(LEADING '0' FROM RIGHT(num_fact, 4)) AS sans_zeros\nFROM facture\nORDER BY num_fact;"
    },
    resultat: [["num_fact", "num_4", "sans_zeros"], ["FA-2026-0301", "0301", "301"], ["FA-2026-0302", "0302", "302"], ["FA-2026-0303", "0303", "303"], ["FA-2026-0401", "0401", "401"]],
    piege: "Un code fait seulement de zéros devient vide : '0000' donne '' ; garde '0' avec un `CASE`. Et sur SQL Server et Snowflake, `CAST(x AS INT)`, autre façon d'enlever les zéros, plante dès qu'une lettre traîne dans le code.",
    pratique: "Pour rapprocher un code EDI (avec zéros) d'un code ERP (sans zéros), mets les deux sous la même forme, une fois à l'import. Une conversion dans le ON empêche l'index de servir.",
    motsCles: ["zéros", "zéros devant", "zéros de tête", "enlever", "supprimer", "retirer", "non significatifs", "inutiles", "début", "code", "numéro", "edi"],
    voirAussi: ["trim", "cast", "try-cast", "lpad", "substring"]
  }
]);
