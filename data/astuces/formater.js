// Astuces SQL, famille « Formater » (docs/astuces.md). Chaque résultat est vérifié sur docs/base-exemple.sql.
// Sources (lues le 13/11/2026) :
// - SQL Server, learn.microsoft.com/sql/t-sql/functions : format (culture, .NET, HH = 24 h, hh = 12 h), cast-and-convert
//   (styles 103, 108, 112 ; numeric → numeric arrondit ; vers bigint/int coupe), round (garde decimal(p, s)), avg
//   (decimal(38, max(s, 6))), concat-ws (2017+), logical-functions-iif, datepart.
// - Snowflake, docs.snowflake.com/en/sql-reference : sql-format-models (FM, 0, 9, « , » des milliers, « . » toujours un
//   point), functions/to_char, functions/translate, functions/round (échelle = celle demandée), functions/cast (arrondit),
//   date-time-input-output (DD, MM, YYYY, HH24, MI ; DATE_OUTPUT_FORMAT), functions/to_date (un texte fait d'un entier =
//   des secondes depuis 1970), functions/initcap (séparateurs par défaut : pas l'apostrophe), functions/iff,
//   functions/hour-minute-second, functions/lpad.
// - MySQL 8.4, dev.mysql.com/doc/refman/8.4/en : string-functions (FORMAT(X, D) « #,###.## », LPAD, CONCAT_WS),
//   mathematical-functions (ROUND : DECIMAL à D décimales), date-and-time-functions (DATE_FORMAT %d %m %Y %H %i,
//   STR_TO_DATE, HOUR), flow-control-functions (IF), cast-functions (SIGNED, CHAR, DECIMAL).
LEARNSQL.astuces = (LEARNSQL.astuces || []).concat([
  {
    id: "montant-2-decimales",
    titre: "Afficher un montant avec 2 décimales",
    famille: "Formater",
    besoins: ["arrondir un montant à 2 chiffres après la virgule", "afficher une moyenne avec seulement 2 décimales", "enlever les décimales en trop d'un calcul"],
    essais: ["mon prix moyen sort avec 6 chiffres apres la virgule", "2 decimales pour un montant", "arrondir au centime pres"],
    moteurs: {
      sqlserver: "`CAST(x AS DECIMAL(10,2))` : arrondit et garde 2 décimales ; `ROUND(x, 2)` arrondit, mais garde le type de départ (5038.330000)",
      snowflake: "`ROUND(x, 2)` ou `x::NUMBER(10,2)` : 2 décimales ; en texte : `TO_CHAR(x, 'FM999999990.00')`",
      mysql: "`ROUND(x, 2)` ou `CAST(x AS DECIMAL(10,2))` ; `FORMAT(x, 2)` ajoute en plus des virgules de milliers (texte)"
    },
    exemple: "-- Le panier moyen de chaque canal\nSELECT canal,\n       ROUND(AVG(montant_ht), 2) AS avec_round,\n       CAST(AVG(montant_ht) AS DECIMAL(10,2)) AS avec_cast\nFROM commande\nGROUP BY canal\nORDER BY canal;",
    exemples: {
      snowflake: "-- Le panier moyen de chaque canal\nSELECT canal,\n       ROUND(AVG(montant_ht), 2) AS avec_round,\n       AVG(montant_ht)::NUMBER(10,2) AS avec_cast\nFROM commande\nGROUP BY canal\nORDER BY canal;"
    },
    resultat: [["canal", "avec_round", "avec_cast"], ["EDI", "5038.330000", "5038.33"], ["TEL", "562.600000", "562.60"], ["WEB", "919.500000", "919.50"]],
    piege: "Sur SQL Server, `ROUND(x, 2)` arrondit mais garde le type de départ : la moyenne s'affiche 5038.330000. `CAST(… AS DECIMAL(10,2))` arrondit et ne garde que 2 décimales ; sur Snowflake et MySQL, ROUND suffit.",
    pratique: "Pour Power BI, envoie un DECIMAL, pas un texte : il se trie et s'additionne. Le format d'affichage (2 décimales, symbole €) se règle ensuite dans Power BI.",
    motsCles: ["décimales", "2 décimales", "arrondir", "arrondi", "virgule", "chiffres après la virgule", "montant", "prix", "centimes", "moyenne", "précision"],
    voirAussi: ["round", "cast", "avg", "format", "types-nombre", "decimal"]
  },
  {
    id: "montant-francais",
    titre: "Écrire un montant à la française (1 234,50)",
    famille: "Formater",
    besoins: ["afficher un montant avec un espace pour les milliers et une virgule", "écrire 4780 sous la forme 4 780,00", "un séparateur de milliers à la française"],
    essais: ["mettre des espaces entre les milliers", "format monetaire francais", "ecrire 1 234,56 comme en france"],
    moteurs: {
      sqlserver: "`FORMAT(x, 'N2', 'fr-FR')` donne 4 780,00 ; l'espace des milliers y est un espace insécable",
      snowflake: "Pas de format français : `TRANSLATE(TO_CHAR(x, 'FM999,999,990.00'), ',.', ' ,')` échange les virgules et les points",
      mysql: "`FORMAT(x, 2)` donne 4,780.00 : remplace d'abord les virgules, puis les points : `REPLACE(REPLACE(FORMAT(x, 2), ',', ' '), '.', ',')`"
    },
    exemple: "SELECT num_cde, montant_ht,\n       FORMAT(montant_ht, 'N2', 'fr-FR') AS montant_fr\nFROM commande\nWHERE id IN (1, 7, 8)\nORDER BY id;",
    exemples: {
      snowflake: "SELECT num_cde, montant_ht,\n       TRANSLATE(TO_CHAR(montant_ht, 'FM999,999,990.00'), ',.', ' ,') AS montant_fr\nFROM commande\nWHERE id IN (1, 7, 8)\nORDER BY id;",
      mysql: "SELECT num_cde, montant_ht,\n       REPLACE(REPLACE(FORMAT(montant_ht, 2), ',', ' '), '.', ',') AS montant_fr\nFROM commande\nWHERE id IN (1, 7, 8)\nORDER BY id;"
    },
    resultat: [["num_cde", "montant_ht", "montant_fr"], ["CDE-1001", "4780.00", "4 780,00"], ["CDE-1007", "7950.00", "7 950,00"], ["CDE-1008", "79.80", "79,80"]],
    piege: "Le résultat est du texte : il ne s'additionne plus, et le tri suit les caractères ('2 385,00' passe avant '318,00'). Formate seulement à la fin, pour l'affichage.",
    pratique: "Pour Power BI ou Excel, envoie le nombre : le format français se règle dans l'outil. Ce texte sert pour un libellé, un mail ou un PDF ; FORMAT est lent sur des millions de lignes.",
    motsCles: ["milliers", "séparateur de milliers", "espace", "virgule", "français", "à la française", "montant", "lisible", "euros", "format monétaire", "formater"],
    voirAussi: ["format", "replace", "convert", "cast"]
  },
  {
    id: "virgule-excel",
    titre: "Mettre une virgule à la place du point (export Excel)",
    famille: "Formater",
    besoins: ["exporter des montants avec une virgule pour Excel", "remplacer le point décimal par une virgule", "Excel ne reconnaît pas mes nombres avec un point"],
    essais: ["excel prend mes montants pour du texte", "separateur decimal virgule dans un csv", "point en virgule pour un fichier excel francais"],
    moteurs: {
      sqlserver: "`REPLACE(CAST(x AS VARCHAR(20)), '.', ',')`",
      snowflake: "`REPLACE(TO_CHAR(x, 'FM999999990.00'), '.', ',')`",
      mysql: "`REPLACE(CAST(x AS CHAR), '.', ',')`"
    },
    exemple: "-- Une ligne de CSV (séparateur ;) pour un Excel en français\nSELECT CONCAT(num_cde, ';', REPLACE(CAST(montant_ht AS VARCHAR(20)), '.', ',')) AS ligne_csv\nFROM commande\nWHERE id IN (1, 5, 8)\nORDER BY id;",
    exemples: {
      snowflake: "-- Une ligne de CSV (séparateur ;) pour un Excel en français\nSELECT num_cde || ';' || REPLACE(TO_CHAR(montant_ht, 'FM999999990.00'), '.', ',') AS ligne_csv\nFROM commande\nWHERE id IN (1, 5, 8)\nORDER BY id;",
      mysql: "-- Une ligne de CSV (séparateur ;) pour un Excel en français\nSELECT CONCAT(num_cde, ';', REPLACE(CAST(montant_ht AS CHAR), '.', ',')) AS ligne_csv\nFROM commande\nWHERE id IN (1, 5, 8)\nORDER BY id;"
    },
    resultat: [["ligne_csv"], ["CDE-1001;4780,00"], ["CDE-1005;318,00"], ["CDE-1008;79,80"]],
    piege: "Avec la virgule comme séparateur de colonnes, la virgule décimale coupe chaque montant en deux colonnes. Pour un Excel en français, sépare les colonnes par un point-virgule.",
    pratique: "Si le fichier part vers un autre système (EDI, ERP, API), garde le point : la virgule n'aide qu'un humain qui ouvre le fichier dans un Excel en français.",
    motsCles: ["virgule", "point", "décimal", "séparateur décimal", "excel", "csv", "export", "point-virgule", "montant", "fichier", "français"],
    voirAussi: ["replace", "cast", "concat", "concat-ws"]
  },
  {
    id: "date-francaise",
    titre: "Écrire une date en JJ/MM/AAAA",
    famille: "Formater",
    besoins: ["afficher une date au format français jour/mois/année", "transformer 2026-03-02 en 02/03/2026", "une date en texte avec des barres obliques"],
    essais: ["date format francais dd/mm/yyyy", "convertir une date en texte jj/mm/aaaa", "mettre la date dans le bon sens pour un courrier"],
    moteurs: {
      sqlserver: "`CONVERT(VARCHAR(10), d, 103)` ; ou `FORMAT(d, 'dd/MM/yyyy')`, plus lent (MM en majuscules : mm = minutes)",
      snowflake: "`TO_CHAR(d, 'DD/MM/YYYY')`",
      mysql: "`DATE_FORMAT(d, '%d/%m/%Y')`"
    },
    exemple: "SELECT num_fact, date_fact,\n       CONVERT(VARCHAR(10), date_fact, 103) AS date_fr\nFROM facture\nORDER BY id;",
    exemples: {
      snowflake: "SELECT num_fact, date_fact,\n       TO_CHAR(date_fact, 'DD/MM/YYYY') AS date_fr\nFROM facture\nORDER BY id;",
      mysql: "SELECT num_fact, date_fact,\n       DATE_FORMAT(date_fact, '%d/%m/%Y') AS date_fr\nFROM facture\nORDER BY id;"
    },
    resultat: [["num_fact", "date_fact", "date_fr"], ["FA-2026-0301", "2026-03-03", "03/03/2026"], ["FA-2026-0302", "2026-03-06", "06/03/2026"], ["FA-2026-0303", "2026-03-10", "10/03/2026"], ["FA-2026-0401", "2026-04-11", "11/04/2026"]],
    piege: "Le texte JJ/MM/AAAA se trie mal : '02/04/2026' passe avant '10/03/2026'. Trie sur la vraie date (`ORDER BY date_fact`), et formate seulement à l'affichage.",
    pratique: "Sur Snowflake, le format d'affichage des dates se règle pour toute la session : `ALTER SESSION SET DATE_OUTPUT_FORMAT = 'DD/MM/YYYY';`. Les colonnes restent de vraies dates.",
    motsCles: ["date", "jj/mm/aaaa", "dd/mm/yyyy", "date française", "103", "jour", "mois", "année", "texte", "barres", "courrier"],
    voirAussi: ["convert", "format", "date", "order-by"]
  },
  {
    id: "date-aaaammjj",
    titre: "Écrire ou lire une date AAAAMMJJ (EDI)",
    famille: "Formater",
    besoins: ["écrire une date au format AAAAMMJJ pour un fichier EDI", "transformer le texte 20260302 en vraie date", "une date sans séparateur pour un flux"],
    essais: ["date edifact 102 ccyymmdd", "convertir yyyymmdd en date", "lire une date 20260315 recue dans un fichier"],
    moteurs: {
      sqlserver: "Écrire : `CONVERT(VARCHAR(8), d, 112)` ; lire : `CONVERT(DATE, '20260302', 112)`",
      snowflake: "Écrire : `TO_CHAR(d, 'YYYYMMDD')` ; lire : `TO_DATE('20260302', 'YYYYMMDD')`",
      mysql: "Écrire : `DATE_FORMAT(d, '%Y%m%d')` ; lire : `STR_TO_DATE('20260302', '%Y%m%d')`"
    },
    exemple: "-- La date de réception, pour un segment DTM (format 102)\nSELECT id, date_recu,\n       CONVERT(VARCHAR(8), date_recu, 112) AS date_102\nFROM flux_edi\nWHERE type = 'ORDERS'\nORDER BY id;",
    exemples: {
      snowflake: "-- La date de réception, pour un segment DTM (format 102)\nSELECT id, date_recu,\n       TO_CHAR(date_recu, 'YYYYMMDD') AS date_102\nFROM flux_edi\nWHERE type = 'ORDERS'\nORDER BY id;",
      mysql: "-- La date de réception, pour un segment DTM (format 102)\nSELECT id, date_recu,\n       DATE_FORMAT(date_recu, '%Y%m%d') AS date_102\nFROM flux_edi\nWHERE type = 'ORDERS'\nORDER BY id;"
    },
    resultat: [["id", "date_recu", "date_102"], [1, "2026-03-02 06:10:00", "20260302"], [2, "2026-03-09 06:12:00", "20260309"], [3, "2026-03-16 06:05:00", "20260316"], [5, "2026-04-07 06:08:00", "20260407"]],
    piege: "Pour lire, donne toujours le format : sans lui, Snowflake prend '20260302' pour un nombre de secondes depuis 1970, et `TO_DATE('20260302')` rend le 23/08/1970, sans erreur.",
    pratique: "En EDIFACT, le segment DTM dit le format de sa date : 102 = AAAAMMJJ, 203 = AAAAMMJJHHMM. Lis ce code avant de convertir la valeur.",
    motsCles: ["aaaammjj", "yyyymmdd", "edi", "edifact", "dtm", "102", "112", "sans séparateur", "date", "lire", "écrire", "convertir"],
    voirAussi: ["convert", "cast", "try-cast", "format", "date"]
  },
  {
    id: "heure-hh-mm",
    titre: "Écrire une heure en HH:MM",
    famille: "Formater",
    besoins: ["afficher seulement l'heure et les minutes", "garder HH:MM d'une date avec heure", "l'heure de réception d'un flux au format 06:10"],
    essais: ["heure sans les secondes", "transformer un timestamp en hh:mm", "afficher l'heure sur 24 h"],
    moteurs: {
      sqlserver: "`CONVERT(VARCHAR(5), d, 108)` (108 = HH:mm:ss sur 24 h, coupé à 5 caractères) ; ou `FORMAT(d, 'HH:mm')`",
      snowflake: "`TO_CHAR(d, 'HH24:MI')`",
      mysql: "`DATE_FORMAT(d, '%H:%i')`"
    },
    exemple: "SELECT id, type, date_recu,\n       CONVERT(VARCHAR(5), date_recu, 108) AS heure\nFROM flux_edi\nWHERE id >= 4\nORDER BY id;",
    exemples: {
      snowflake: "SELECT id, type, date_recu,\n       TO_CHAR(date_recu, 'HH24:MI') AS heure\nFROM flux_edi\nWHERE id >= 4\nORDER BY id;",
      mysql: "SELECT id, type, date_recu,\n       DATE_FORMAT(date_recu, '%H:%i') AS heure\nFROM flux_edi\nWHERE id >= 4\nORDER BY id;"
    },
    resultat: [["id", "type", "date_recu", "heure"], [4, "INVOIC", "2026-03-03 18:00:00", "18:00"], [5, "ORDERS", "2026-04-07 06:08:00", "06:08"], [6, "DESADV", "2026-04-08 17:30:00", "17:30"]],
    piege: "Les lettres changent d'un moteur à l'autre : dans FORMAT, `hh` donne 06:00 pour 18 h (heures sur 12) et `mm` les minutes ; Snowflake écrit `HH24:MI` ; MySQL `%H:%i` (`%M` y donne le nom du mois).",
    pratique: "Pour suivre les flux EDI par heure d'arrivée, garde un nombre : `DATEPART(hour, date_recu)` sur SQL Server, `HOUR(date_recu)` sur Snowflake et MySQL, puis groupe dessus.",
    motsCles: ["heure", "minutes", "hh:mm", "horaire", "sans secondes", "24 h", "108", "temps", "datetime", "timestamp", "réception"],
    voirAussi: ["convert", "format", "datepart", "datetime2"]
  },
  {
    id: "pourcentage",
    titre: "Afficher un taux en pourcentage (10,0 %)",
    famille: "Formater",
    besoins: ["afficher un taux de remise en pourcentage", "transformer 0,125 en 12,5 %", "un pourcentage avec une décimale et le signe %"],
    essais: ["taux en pourcent avec une decimale", "ajouter le signe pourcent a un ratio", "afficher la remise en pour cent"],
    moteurs: {
      sqlserver: "`CONCAT(CAST(100.0 * x AS DECIMAL(5,1)), ' %')` ; à la française : `FORMAT(x, 'P1', 'fr-FR')` (P multiplie déjà par 100)",
      snowflake: "`ROUND(100 * x, 1) || ' %'`",
      mysql: "`CONCAT(ROUND(100 * x, 1), ' %')`"
    },
    exemple: "-- Le taux de remise de chaque ligne : (tarif - prix négocié) / tarif\nSELECT a.code, a.prix_tarif, l.prix_unit,\n       CONCAT(CAST(100.0 * (a.prix_tarif - l.prix_unit) / a.prix_tarif AS DECIMAL(5,1)), ' %') AS remise\nFROM ligne_cde AS l\nJOIN article AS a ON a.id = l.article_id\nWHERE l.cde_id IN (1, 3)\nORDER BY l.id;",
    exemples: {
      snowflake: "-- Le taux de remise de chaque ligne : (tarif - prix négocié) / tarif\nSELECT a.code, a.prix_tarif, l.prix_unit,\n       ROUND(100 * (a.prix_tarif - l.prix_unit) / a.prix_tarif, 1) || ' %' AS remise\nFROM ligne_cde AS l\nJOIN article AS a ON a.id = l.article_id\nWHERE l.cde_id IN (1, 3)\nORDER BY l.id;",
      mysql: "-- Le taux de remise de chaque ligne : (tarif - prix négocié) / tarif\nSELECT a.code, a.prix_tarif, l.prix_unit,\n       CONCAT(ROUND(100 * (a.prix_tarif - l.prix_unit) / a.prix_tarif, 1), ' %') AS remise\nFROM ligne_cde AS l\nJOIN article AS a ON a.id = l.article_id\nWHERE l.cde_id IN (1, 3)\nORDER BY l.id;"
    },
    resultat: [["code", "prix_tarif", "prix_unit", "remise"], ["CHL-5", "39.90", "35.90", "10.0 %"], ["CHL-25", "159.00", "119.00", "25.2 %"], ["PH-5", "24.50", "22.50", "8.2 %"], ["BACHE8", "149.00", "126.00", "15.4 %"]],
    piege: "Avec des entiers (un COUNT), SQL Server coupe la division : `100 * 3 / 8` donne 37, pas 37,5 ; écris `100.0`. Et `FORMAT(x, 'P1')` multiplie déjà par 100 : donne-lui 0.125, pas 12.5.",
    pratique: "Pour Power BI, envoie le taux en nombre (0.100) et choisis le format « Pourcentage » dans Power BI : un texte « 10,0 % » ne se trie et ne se calcule plus.",
    motsCles: ["pourcentage", "pourcent", "pour cent", "taux", "remise", "ratio", "signe", "symbole", "décimale", "multiplier par 100", "arrondi"],
    voirAussi: ["division", "round", "cast", "concat", "format"]
  },
  {
    id: "oui-non",
    titre: "Traduire un 1 / 0 en Oui / Non",
    famille: "Formater",
    besoins: ["transformer 1 et 0 en Oui et Non", "afficher Oui si la facture est payée", "un booléen lisible dans un export"],
    essais: ["true false en oui non", "remplacer 1 par oui et 0 par non", "vrai faux en clair pour le client"],
    moteurs: {
      sqlserver: "`CASE WHEN x = 1 THEN 'Oui' ELSE 'Non' END`, ou `IIF(x = 1, 'Oui', 'Non')`",
      snowflake: "`IFF(x, 'Oui', 'Non')` pour un BOOLEAN, ou `CASE WHEN … END`",
      mysql: "`IF(x, 'Oui', 'Non')`, ou `CASE WHEN … END`"
    },
    exemple: "SELECT num_fact, statut,\n       CASE WHEN statut = 'PAYEE' THEN 'Oui' ELSE 'Non' END AS payee\nFROM facture\nORDER BY id;",
    resultat: [["num_fact", "statut", "payee"], ["FA-2026-0301", "PAYEE", "Oui"], ["FA-2026-0302", "PAYEE", "Oui"], ["FA-2026-0303", "RETARD", "Non"], ["FA-2026-0401", "EMISE", "Non"]],
    piege: "Avec `ELSE 'Non'`, une valeur NULL (inconnue) devient « Non » sans prévenir. Traite les trois cas : `WHEN x = 1 THEN 'Oui' WHEN x = 0 THEN 'Non' ELSE '?' END`.",
    pratique: "Filtre toujours sur la vraie valeur (`WHERE actif = 1`), jamais sur le texte affiché : le libellé peut changer (« Oui », « O », « Yes ») d'un rapport à l'autre.",
    motsCles: ["oui", "non", "booléen", "vrai", "faux", "1 ou 0", "bit", "drapeau", "lisible", "true", "false", "payée"],
    voirAussi: ["case", "iif", "bit", "boolean", "coalesce"]
  },
  {
    id: "majuscule-initiale",
    titre: "Mettre une majuscule au début des mots",
    famille: "Formater",
    besoins: ["mettre la première lettre en majuscule et le reste en minuscules", "transformer CHIMIE en Chimie", "une majuscule au début de chaque mot"],
    essais: ["initcap sur sql server", "premiere lettre en capitale", "des noms tout en majuscules a remettre propres"],
    moteurs: {
      sqlserver: "Pas de INITCAP : `UPPER(LEFT(x, 1)) + LOWER(SUBSTRING(x, 2, LEN(x)))` (le premier mot seulement)",
      snowflake: "`INITCAP(x)` : chaque mot ; la 1re lettre seule : `INITCAP(x, '')`",
      mysql: "Pas de INITCAP : `CONCAT(UPPER(LEFT(x, 1)), LOWER(SUBSTRING(x, 2)))` (le premier mot seulement)"
    },
    exemple: "SELECT DISTINCT famille,\n       UPPER(LEFT(famille, 1)) + LOWER(SUBSTRING(famille, 2, LEN(famille))) AS famille_propre\nFROM article\nORDER BY famille;",
    exemples: {
      snowflake: "SELECT DISTINCT famille,\n       INITCAP(famille) AS famille_propre\nFROM article\nORDER BY famille;",
      mysql: "SELECT DISTINCT famille,\n       CONCAT(UPPER(LEFT(famille, 1)), LOWER(SUBSTRING(famille, 2))) AS famille_propre\nFROM article\nORDER BY famille;"
    },
    resultat: [["famille", "famille_propre"], ["ACCESSOIRE", "Accessoire"], ["CHIMIE", "Chimie"], ["FILTRATION", "Filtration"], ["ROBOT", "Robot"]],
    piege: "Le reste du mot passe en minuscules : 'SARL AQUABLEU' devient 'Sarl Aquableu', et les sigles sont perdus. Sur Snowflake, INITCAP coupe aussi au tiret ('SAINT-ETIENNE' → 'Saint-Etienne'), pas à l'apostrophe (\"L'ISLE\" → \"L'isle\").",
    pratique: "Ne change pas la donnée de l'ERP pour l'affichage : fais-le dans la requête du rapport ou de l'export (courrier, étiquette). Les recherches et les jointures restent sur le code, pas sur le nom.",
    motsCles: ["majuscule", "première lettre", "capitale", "minuscules", "nom propre", "casse", "début", "chaque mot", "proper", "propre"],
    voirAussi: ["upper-lower", "left", "substring", "concat"]
  },
  {
    id: "montant-largeur-fixe",
    titre: "Écrire un montant sans virgule sur une largeur fixe",
    famille: "Formater",
    besoins: ["écrire un montant sur 12 positions sans virgule avec des zéros devant", "4780,00 doit donner 000000478000", "un montant en centimes pour un fichier plat"],
    essais: ["fichier banque : montant cadre a droite avec des zeros", "montant sur 15 caracteres avec decimales implicites", "montant en centimes cadre a droite sur 12 caracteres"],
    moteurs: {
      sqlserver: "`RIGHT('000000000000' + CAST(CAST(x * 100 AS BIGINT) AS VARCHAR(12)), 12)`",
      snowflake: "`LPAD(TO_VARCHAR(ROUND(x * 100)), 12, '0')`",
      mysql: "`LPAD(CAST(x * 100 AS SIGNED), 12, '0')`"
    },
    exemple: "-- Montant HT sur 12 positions, 2 décimales sous-entendues\nSELECT num_cde, montant_ht,\n       RIGHT('000000000000' + CAST(CAST(montant_ht * 100 AS BIGINT) AS VARCHAR(12)), 12) AS montant_12\nFROM commande\nWHERE id IN (1, 5, 8)\nORDER BY id;",
    exemples: {
      snowflake: "-- Montant HT sur 12 positions, 2 décimales sous-entendues\nSELECT num_cde, montant_ht,\n       LPAD(TO_VARCHAR(ROUND(montant_ht * 100)), 12, '0') AS montant_12\nFROM commande\nWHERE id IN (1, 5, 8)\nORDER BY id;",
      mysql: "-- Montant HT sur 12 positions, 2 décimales sous-entendues\nSELECT num_cde, montant_ht,\n       LPAD(CAST(montant_ht * 100 AS SIGNED), 12, '0') AS montant_12\nFROM commande\nWHERE id IN (1, 5, 8)\nORDER BY id;"
    },
    resultat: [["num_cde", "montant_ht", "montant_12"], ["CDE-1001", "4780.00", "000000478000"], ["CDE-1005", "318.00", "000000031800"], ["CDE-1008", "79.80", "000000007980"]],
    piege: "Un avoir (montant négatif) donne '0000000-7980' : le signe tombe au milieu de la zone. Traite-le à part : `ABS(montant)` dans la zone, et le signe (ou un code avoir) dans sa propre zone.",
    pratique: "Lis la spécification du fichier : largeur, nombre de décimales sous-entendues (souvent 2), place du signe. Puis contrôle la longueur de chaque ligne : une zone trop longue décale toutes les suivantes.",
    motsCles: ["largeur fixe", "zéros", "centimes", "sans virgule", "décimales implicites", "montant", "positions", "fichier plat", "banque", "cadrer à droite", "edi", "sous-entendues"],
    voirAussi: ["lpad", "right", "cast", "round"]
  },
  {
    id: "numero-lisible",
    titre: "Mettre des espaces dans un numéro (SIREN, téléphone)",
    famille: "Formater",
    besoins: ["afficher un SIREN en 3 blocs de 3 chiffres", "écrire 512345678 sous la forme 512 345 678", "un numéro de téléphone avec un espace tous les 2 chiffres"],
    essais: ["siren lisible avec des espaces", "formater un numero de telephone 04 78 12 34 56", "couper un numero en groupes de chiffres pour un courrier"],
    moteurs: {
      sqlserver: "`CONCAT_WS(' ', SUBSTRING(siren, 1, 3), SUBSTRING(siren, 4, 3), SUBSTRING(siren, 7, 3))` (2017+)",
      snowflake: "Même écriture : `CONCAT_WS(' ', SUBSTRING(siren, 1, 3), …)`",
      mysql: "Même écriture : `CONCAT_WS(' ', SUBSTRING(siren, 1, 3), …)`"
    },
    exemple: "SELECT code, siren,\n       CONCAT_WS(' ', SUBSTRING(siren, 1, 3),\n                      SUBSTRING(siren, 4, 3),\n                      SUBSTRING(siren, 7, 3)) AS siren_lisible\nFROM client\nWHERE siren IS NOT NULL AND id <= 4\nORDER BY id;",
    resultat: [["code", "siren", "siren_lisible"], ["C001", "512345678", "512 345 678"], ["C002", "423456789", "423 456 789"], ["C004", "334567890", "334 567 890"]],
    piege: "N'enregistre pas ce texte dans la table : `WHERE siren = '512345678'` ne trouverait plus le client. Les espaces servent seulement à l'affichage (courrier, PDF, étiquette).",
    pratique: "Pour un téléphone de 10 chiffres, même méthode en 5 morceaux de 2 : `CONCAT_WS(' ', SUBSTRING(tel, 1, 2), SUBSTRING(tel, 3, 2), …)` donne 04 78 12 34 56.",
    motsCles: ["espaces", "siren", "siret", "téléphone", "lisible", "groupes", "blocs", "chiffres", "numéro", "séparer", "par 3", "affichage"],
    voirAussi: ["concat-ws", "substring", "stuff", "left"]
  }
]);
