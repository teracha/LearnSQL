LEARNSQL.questions.m03 = [
  {
    id: "m03-q01", dialecte: "SQL Server",
    q: "Sur SQL Server, que renvoie SELECT 7 / 2; ?",
    choix: ["3.5", "3", "4", "Une erreur"],
    bonne: 1,
    pourquoi: [
      "Non sur SQL Server. (Oui sur Snowflake, qui renvoie un décimal.)",
      "Oui. Entier divisé par entier = entier. La partie décimale est coupée.",
      "Non. Il n'y a pas d'arrondi, juste une coupure.",
      "Non. C'est valide."
    ],
    retenir: "SQL Server : 7 / 2 = 3. Écris 7 / 2.0 ou CAST pour avoir 3.5."
  },
  {
    id: "m03-q02", dialecte: "Standard",
    q: "Pour un client avec ca = 8000, que renvoie ce CASE ?",
    code: "CASE\n  WHEN ca > 1000 THEN 'B'\n  WHEN ca > 5000 THEN 'A'\n  ELSE 'C'\nEND",
    choix: ["'A'", "'B'", "'C'", "'A' et 'B'"],
    bonne: 1,
    pourquoi: [
      "Non. Le moteur s'arrête avant d'arriver à ce test.",
      "Oui. CASE prend la première condition vraie. 8000 > 1000 est vrai, donc 'B'. Le test > 5000 n'est jamais lu.",
      "Non. Une condition est vraie avant le ELSE.",
      "Non. CASE renvoie toujours une seule valeur."
    ],
    retenir: "CASE s'arrête à la première condition vraie. Mets les conditions les plus strictes en premier."
  },
  {
    id: "m03-q03", dialecte: "Standard",
    q: "Que renvoie un CASE sans ELSE quand aucune condition n'est vraie ?",
    choix: ["0", "Une chaîne vide ''", "NULL", "Une erreur"],
    bonne: 2,
    pourquoi: [
      "Non. Le moteur ne choisit pas de valeur à ta place.",
      "Non. Pas de chaîne vide par défaut.",
      "Oui. Sans ELSE, le résultat est NULL.",
      "Non. C'est valide, mais le NULL peut surprendre."
    ],
    retenir: "Écris toujours un ELSE. Sinon tu obtiens NULL."
  },
  {
    id: "m03-q04", dialecte: "SQL Server",
    q: "Sur SQL Server, que renvoie cette requête ?",
    code: "SELECT 'Cde-' + NULL,\n       CONCAT('Cde-', NULL);",
    choix: ["'Cde-' et 'Cde-'", "NULL et 'Cde-'", "NULL et NULL", "'Cde-' et NULL"],
    bonne: 1,
    pourquoi: [
      "Non. Avec +, un NULL rend tout le résultat NULL.",
      "Oui. + avec NULL donne NULL. CONCAT, sur SQL Server, remplace NULL par ''.",
      "Non sur SQL Server. (Mais oui sur Snowflake : là-bas, CONCAT renvoie aussi NULL.)",
      "Non. C'est l'inverse."
    ],
    retenir: "SQL Server : CONCAT ignore les NULL, + non. Snowflake : les deux donnent NULL → utilise COALESCE."
  },
  {
    id: "m03-q05", dialecte: "SQL Server",
    q: "Tu reçois le texte '22/10/2026' (format français). Comment le convertir en date sur SQL Server ?",
    choixCode: true,
    choix: [
      "CAST('22/10/2026' AS date)",
      "CONVERT(date, '22/10/2026', 103)",
      "TO_DATE('22/10/2026', 'DD/MM/YYYY')",
      "DATE('22/10/2026')"
    ],
    bonne: 1,
    pourquoi: [
      "Non. CAST ne connaît pas le format. Le résultat dépend des réglages de langue : risque d'erreur.",
      "Oui. Le style 103 veut dire jj/mm/aaaa. Le résultat ne dépend pas des réglages.",
      "Non sur SQL Server. C'est la bonne syntaxe sur Snowflake (et Oracle).",
      "Non. Cette fonction n'existe pas sur SQL Server."
    ],
    retenir: "SQL Server : CONVERT(date, texte, 103). Snowflake : TO_DATE(texte, 'DD/MM/YYYY')."
  },
  {
    id: "m03-q06", dialecte: "SQL Server + Snowflake",
    q: "Une colonne texte contient des montants, parfois mal saisis ('12,5', 'N/A'). Que fait TRY_CAST(montant AS decimal(10,2)) sur une valeur invalide ?",
    choix: [
      "Il plante toute la requête",
      "Il renvoie 0",
      "Il renvoie NULL",
      "Il garde le texte tel quel"
    ],
    bonne: 2,
    pourquoi: [
      "Non. C'est ce que fait CAST. TRY_CAST est fait pour éviter ça.",
      "Non. 0 serait une fausse valeur.",
      "Oui. TRY_CAST renvoie NULL si la conversion échoue. Pratique pour trouver les valeurs à corriger.",
      "Non. Une colonne a un seul type : elle ne peut pas mélanger texte et nombre."
    ],
    retenir: "TRY_CAST : NULL au lieu d'une erreur. Idéal pour contrôler des données importées (EDI, fichiers)."
  },
  {
    id: "m03-q07", dialecte: "SQL Server + Snowflake",
    q: "Que renvoie DATEDIFF(year, '2025-12-31', '2026-01-01') ?",
    choix: ["0", "1", "0.003", "-1"],
    bonne: 1,
    pourquoi: [
      "Non. Pourtant il n'y a qu'un jour d'écart…",
      "Oui. DATEDIFF compte les frontières franchies. On passe du 31/12 au 01/01 : 1 changement d'année.",
      "Non. DATEDIFF renvoie un entier.",
      "Non. La 2e date est après la 1re : le résultat est positif."
    ],
    retenir: "DATEDIFF compte les passages de frontière, pas les durées réelles. Attention pour calculer un âge."
  },
  {
    id: "m03-q08", dialecte: "SQL Server",
    q: "Ton serveur est en français (SET LANGUAGE French). Quel format de date en texte est sûr pour un DATETIME ?",
    choixCode: true,
    choix: ["'22/10/2026'", "'10/22/2026'", "'2026-10-22'", "'20261022'"],
    bonne: 3,
    pourquoi: [
      "Non. Ça dépend de la langue du serveur.",
      "Non. Format américain : faux en français.",
      "Non. Piège : pour un DATETIME, en français, SQL Server peut lire aaaa-jj-mm. Le 22e mois → erreur.",
      "Oui. Le format aaaammjj est lu pareil quelle que soit la langue."
    ],
    retenir: "SQL Server : écris tes dates en 'AAAAMMJJ'. Toujours fiable."
  },
  {
    id: "m03-q09", dialecte: "SQL Server",
    q: "Que renvoie LEN('abc   ') (avec 3 espaces à la fin) sur SQL Server ?",
    choix: ["3", "6", "0", "NULL"],
    bonne: 0,
    pourquoi: [
      "Oui. LEN ignore les espaces de fin. DATALENGTH, lui, compte les octets réels.",
      "Non. C'est ce que compterait DATALENGTH pour un varchar.",
      "Non. Le texte n'est pas vide.",
      "Non. Le texte n'est pas NULL."
    ],
    retenir: "LEN ignore les espaces de fin. Utile à savoir pour les champs EDI à longueur fixe."
  },
  {
    id: "m03-q10", dialecte: "Standard",
    q: "Quelle est la plus grande valeur possible pour une colonne DECIMAL(5,2) ?",
    choix: ["99999.99", "999.99", "99.999", "5.2"],
    bonne: 1,
    pourquoi: [
      "Non. Ça ferait 7 chiffres au total.",
      "Oui. 5 chiffres au total, dont 2 après la virgule. Donc 3 avant.",
      "Non. Ça ferait 3 chiffres après la virgule.",
      "Non. (5,2) décrit la taille, pas une valeur."
    ],
    retenir: "DECIMAL(p, s) : p chiffres au total, s après la virgule."
  },
  {
    id: "m03-q11", dialecte: "SQL Server",
    q: "Que renvoie SUBSTRING('EDIFACT', 1, 3) ?",
    choix: ["'DIF'", "'EDI'", "'EDIF'", "'FACT'"],
    bonne: 1,
    pourquoi: [
      "Non. En SQL, on commence à compter à 1, pas à 0.",
      "Oui. On part du 1er caractère et on en prend 3.",
      "Non. On prend 3 caractères, pas 4.",
      "Non. Ce serait SUBSTRING('EDIFACT', 4, 4) ou RIGHT('EDIFACT', 4)."
    ],
    retenir: "SUBSTRING(texte, début, longueur). Le 1er caractère est à la position 1."
  },
  {
    id: "m03-q12", dialecte: "SQL Server + Snowflake",
    q: "Que renvoie CHARINDEX('-', 'CDE-2026') ?",
    choix: ["3", "4", "5", "0"],
    bonne: 1,
    pourquoi: [
      "Non. C, D, E occupent les positions 1 à 3.",
      "Oui. Le tiret est le 4e caractère. Si rien n'est trouvé, CHARINDEX renvoie 0.",
      "Non. 5 est la position du 2.",
      "Non. 0 veut dire « non trouvé ». Or le tiret est présent."
    ],
    retenir: "CHARINDEX(cherché, texte) = position (à partir de 1), ou 0 si absent."
  },
  {
    id: "m03-q13", dialecte: "SQL Server + Snowflake",
    q: "Quelle fonction enlève les espaces au début ET à la fin d'un texte ?",
    choixCode: true,
    choix: ["LTRIM(x)", "RTRIM(x)", "TRIM(x)", "REPLACE(x, ' ', '')"],
    bonne: 2,
    pourquoi: [
      "Non. LTRIM enlève seulement à gauche (au début).",
      "Non. RTRIM enlève seulement à droite (à la fin).",
      "Oui. TRIM enlève des deux côtés. SQL Server 2017+ et Snowflake.",
      "Non. REPLACE enlève TOUS les espaces, même au milieu : 'LE BON' devient 'LEBON'."
    ],
    retenir: "TRIM = début + fin. Avant SQL Server 2017 : LTRIM(RTRIM(x))."
  },
  {
    id: "m03-q14", dialecte: "Standard",
    q: "Un fichier contient le montant '12,5' (virgule française). Que faire avant de le convertir en nombre ?",
    choixCode: true,
    choix: [
      "REPLACE(montant, ',', '.')",
      "TRIM(montant, ',')",
      "UPPER(montant)",
      "Rien, la conversion gère la virgule"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. SQL attend un point comme séparateur décimal. Ensuite : TRY_CAST(… AS decimal(10,2)).",
      "Non. Ça enlèverait la virgule : '125', et le montant serait faux.",
      "Non. La casse n'a rien à voir.",
      "Non. CAST('12,5' AS decimal) échoue."
    ],
    retenir: "Montant avec virgule : REPLACE(',', '.') puis TRY_CAST."
  },
  {
    id: "m03-q15", dialecte: "SQL Server",
    q: "Tu veux afficher 42 sous la forme '000042'. Quelle expression ne marche PAS sur SQL Server ?",
    choixCode: true,
    choix: [
      "RIGHT('000000' + CAST(42 AS varchar(6)), 6)",
      "FORMAT(42, '000000')",
      "LPAD('42', 6, '0')",
      "RIGHT(REPLICATE('0', 6) + '42', 6)"
    ],
    bonne: 2,
    pourquoi: [
      "Non, celle-ci marche. C'est la méthode classique.",
      "Non, celle-ci marche. Mais FORMAT est lent sur de gros volumes.",
      "Oui. LPAD n'existe pas sur SQL Server. C'est la bonne fonction sur Snowflake.",
      "Non, celle-ci marche aussi."
    ],
    retenir: "Compléter avec des zéros : RIGHT('000000' + …, 6) sur SQL Server, LPAD sur Snowflake."
  },
  {
    id: "m03-q16", dialecte: "SQL Server + Snowflake",
    q: "La facture est payable à 30 jours. Comment calculer la date d'échéance ?",
    choixCode: true,
    choix: [
      "date_facture + '30 days'",
      "DATEADD(day, 30, date_facture)",
      "DATEDIFF(day, 30, date_facture)",
      "date_facture * 30"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Ce n'est pas une syntaxe valide sur ces moteurs.",
      "Oui. DATEADD(unité, nombre, date). Marche sur SQL Server et Snowflake.",
      "Non. DATEDIFF calcule un écart, il n'ajoute rien.",
      "Non. On ne multiplie pas une date."
    ],
    retenir: "DATEADD(day, n, date) ajoute n jours. n négatif = retirer."
  },
  {
    id: "m03-q17", dialecte: "SQL Server",
    q: "Sur SQL Server, que renvoie EOMONTH('20260210') ?",
    choix: ["2026-02-01", "2026-02-28", "2026-03-01", "2026-02-10"],
    bonne: 1,
    pourquoi: [
      "Non. C'est le 1er jour du mois.",
      "Oui. EOMONTH = End Of Month : dernier jour du mois. (Snowflake : LAST_DAY.)",
      "Non. C'est le lendemain de la fin du mois.",
      "Non. C'est la date de départ."
    ],
    retenir: "Fin de mois : EOMONTH sur SQL Server, LAST_DAY sur Snowflake."
  },
  {
    id: "m03-q18", dialecte: "Snowflake",
    q: "Sur Snowflake, comment obtenir le 1er jour du mois d'une date ?",
    choixCode: true,
    choix: [
      "DATE_TRUNC('month', date_cde)",
      "EOMONTH(date_cde)",
      "MONTH(date_cde)",
      "DATEADD(month, 1, date_cde)"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. DATE_TRUNC coupe la date au mois. (SQL Server 2022+ : DATETRUNC(month, d).)",
      "Non. EOMONTH donne la fin du mois, et n'existe pas sur Snowflake.",
      "Non. MONTH renvoie le numéro du mois (ex. 10), pas une date.",
      "Non. Ça ajoute un mois."
    ],
    retenir: "1er jour du mois : DATE_TRUNC('month', d) sur Snowflake, DATETRUNC(month, d) sur SQL Server 2022+."
  },
  {
    id: "m03-q19", dialecte: "Standard",
    q: "statut vaut NULL. Que renvoie ce CASE ?",
    code: "CASE statut\n  WHEN NULL THEN 'vide'\n  ELSE 'rempli'\nEND",
    choix: ["'vide'", "'rempli'", "NULL", "Une erreur"],
    bonne: 1,
    pourquoi: [
      "Non. Le CASE simple compare avec = : NULL = NULL n'est jamais vrai.",
      "Oui. Le WHEN NULL ne marche jamais. Écris CASE WHEN statut IS NULL THEN 'vide' …",
      "Non. Il y a un ELSE, donc pas de NULL.",
      "Non. C'est valide, mais ça ne fait pas ce qu'on croit."
    ],
    retenir: "Pour tester NULL dans un CASE : CASE WHEN col IS NULL, jamais CASE col WHEN NULL."
  },
  {
    id: "m03-q20", dialecte: "SQL Server + Snowflake",
    q: "Sur SQL Server, on écrit IIF(qte > 0, 'OK', 'KO'). Quel est l'équivalent sur Snowflake ?",
    choixCode: true,
    choix: ["IIF(qte > 0, 'OK', 'KO')", "IFF(qte > 0, 'OK', 'KO')", "IF(qte > 0, 'OK', 'KO')", "DECODE(qte > 0)"],
    bonne: 1,
    pourquoi: [
      "Non. IIF n'existe pas sur Snowflake.",
      "Oui. Snowflake écrit IFF (deux F). Piège classique. CASE WHEN marche partout.",
      "Non. IF n'est pas une fonction sur ces moteurs.",
      "Non. DECODE existe sur Snowflake, mais avec une autre syntaxe."
    ],
    retenir: "IIF (SQL Server) / IFF (Snowflake). Pour du code portable : CASE WHEN."
  },
  {
    id: "m03-q21", dialecte: "Standard",
    q: "Que renvoie ROUND(12.345, 2) ?",
    choix: ["12.34", "12.35", "12.3", "12"],
    bonne: 1,
    pourquoi: [
      "Non. Ce serait une troncature, pas un arrondi.",
      "Oui. On garde 2 décimales. Le 5 qui suit fait monter : 12.35. (SQL Server peut afficher 12.350.)",
      "Non. Ça, c'est 1 décimale.",
      "Non. Ça, c'est 0 décimale."
    ],
    retenir: "ROUND(nombre, n) arrondit à n décimales."
  },
  {
    id: "m03-q22", dialecte: "SQL Server",
    q: "25 cartons, 10 cartons par palette. Sur SQL Server, que renvoie CEILING(25 / 10) ?",
    choix: ["3", "2", "2.5", "Une erreur"],
    bonne: 1,
    pourquoi: [
      "Non. C'est ce qu'on veut… mais 25 / 10 donne d'abord 2 (division entière).",
      "Oui. 25 / 10 = 2 sur SQL Server. CEILING(2) = 2. Écris CEILING(25 / 10.0) pour obtenir 3.",
      "Non. CEILING renvoie un entier. Et la division donne déjà 2.",
      "Non. C'est valide."
    ],
    retenir: "Arrondi au-dessus : CEILING(a / 10.0). Attention à la division entière."
  },
  {
    id: "m03-q23", dialecte: "Standard",
    q: "Quel type choisir pour stocker des montants en euros ?",
    choixCode: true,
    choix: ["FLOAT", "DECIMAL(18,2)", "VARCHAR(20)", "INT"],
    bonne: 1,
    pourquoi: [
      "Non. FLOAT est approximatif : 0.1 + 0.2 ne donne pas exactement 0.3. Les écarts comptables arrivent vite.",
      "Oui. DECIMAL est exact. 18 chiffres dont 2 après la virgule : largement suffisant.",
      "Non. Impossible de calculer, trier ou contrôler un texte correctement.",
      "Non. Tu perds les centimes. (Sauf si tu stockes tout en centimes, ce qui est rare.)"
    ],
    retenir: "Argent = DECIMAL (ou NUMBER sur Snowflake). Jamais FLOAT."
  },
  {
    id: "m03-q24", dialecte: "SQL Server",
    q: "Sur SQL Server, tu veux enregistrer la ville polonaise 'Łódź' sans perdre les accents. Que faut-il ?",
    choix: [
      "Une colonne VARCHAR, c'est suffisant",
      "Une colonne NVARCHAR, et le texte écrit N'Łódź'",
      "Une colonne CHAR",
      "Une colonne TEXT"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Avec une collation française, VARCHAR remplace Ł par ? ou par une autre lettre.",
      "Oui. NVARCHAR stocke l'Unicode. Le N devant le texte dit que la valeur est en Unicode.",
      "Non. CHAR a le même problème que VARCHAR, avec une longueur fixe en plus.",
      "Non. TEXT est obsolète et ne règle pas l'Unicode."
    ],
    retenir: "Caractères étrangers : NVARCHAR + N'texte'. (Snowflake : tout est déjà Unicode.)"
  },
  {
    id: "m03-q25", dialecte: "SQL Server",
    q: "Que renvoie le SELECT ?",
    code: "DECLARE @ref varchar;\nSET @ref = 'CDE2026';\nSELECT @ref;",
    choix: ["'CDE2026'", "'C'", "NULL", "Une erreur de troncature"],
    bonne: 1,
    pourquoi: [
      "Non. La variable est trop courte.",
      "Oui. Dans un DECLARE, varchar sans longueur veut dire varchar(1). Le texte est coupé, sans erreur.",
      "Non. Il y a bien une valeur.",
      "Non. Piège : SQL Server coupe en silence."
    ],
    retenir: "Précise toujours la longueur : varchar(20). Sans longueur : 1 dans un DECLARE, 30 dans un CAST."
  },
  {
    id: "m03-q26", dialecte: "SQL Server",
    q: "Sur SQL Server, que renvoie SELECT '10' + 5; ?",
    choix: ["'105'", "15", "Une erreur", "NULL"],
    bonne: 1,
    pourquoi: [
      "Non. Il n'y aurait concaténation que si les deux valeurs étaient du texte.",
      "Oui. L'entier est prioritaire : '10' est converti en 10. Avec 'abc' + 5, ce serait une erreur.",
      "Non. '10' se convertit bien en nombre.",
      "Non. Aucune valeur n'est NULL."
    ],
    retenir: "Mélange texte + nombre : SQL Server convertit vers le nombre. Utilise CONCAT pour coller du texte."
  },
  {
    id: "m03-q27", dialecte: "SQL Server",
    q: "Sur SQL Server, comment afficher une date au format jj/mm/aaaa ?",
    choixCode: true,
    choix: [
      "CONVERT(varchar(10), date_cde, 103)",
      "CAST(date_cde AS 'dd/mm/yyyy')",
      "TO_CHAR(date_cde, 'DD/MM/YYYY')",
      "DATE_FORMAT(date_cde, '%d/%m/%Y')"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Style 103 = jj/mm/aaaa. (FORMAT(date_cde, 'dd/MM/yyyy') marche aussi, mais il est plus lent.)",
      "Non. CAST n'accepte pas de format.",
      "Non sur SQL Server. C'est la syntaxe de Snowflake.",
      "Non. C'est la syntaxe de MySQL."
    ],
    retenir: "Date vers texte : CONVERT(…, 103) sur SQL Server, TO_CHAR sur Snowflake. Formate plutôt dans Power BI."
  },
  {
    id: "m03-q28", dialecte: "SQL Server",
    q: "DATEPART(weekday, date) renvoie-t-il toujours 1 pour un lundi ?",
    choix: [
      "Oui, toujours",
      "Non, ça dépend du réglage SET DATEFIRST (et donc de la langue)",
      "Non, le lundi vaut toujours 2",
      "Oui, mais seulement en français"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Le 1er jour de la semaine est un réglage.",
      "Oui. En anglais (US), la semaine commence le dimanche. Le lundi vaut alors 2. En français, il vaut 1.",
      "Non. Ce n'est vrai qu'avec le réglage US.",
      "Non. « Seulement en français » est trop fort : c'est le réglage DATEFIRST qui décide."
    ],
    retenir: "Jour de la semaine : le résultat dépend de DATEFIRST. Ne le code pas en dur."
  },
  {
    id: "m03-q29", dialecte: "SQL Server",
    q: "Que renvoie le SELECT ?",
    code: "DECLARE @c char(2) = NULL;\nSELECT ISNULL(@c, 'ABCD');",
    choix: ["'ABCD'", "'AB'", "NULL", "Une erreur"],
    bonne: 1,
    pourquoi: [
      "Non. Piège : ISNULL prend le type du 1er argument, ici char(2).",
      "Oui. 'ABCD' est coupé à 2 caractères. COALESCE n'a pas ce défaut.",
      "Non. ISNULL a bien remplacé le NULL.",
      "Non. La troncature se fait sans erreur."
    ],
    retenir: "ISNULL prend le type du 1er argument et peut couper la valeur. COALESCE est plus sûr."
  },
  {
    id: "m03-q30", dialecte: "SQL Server + Snowflake",
    q: "Que donne CAST(12.789 AS INT) ?",
    choix: [
      "12 partout",
      "13 partout",
      "12 sur SQL Server, 13 sur Snowflake",
      "13 sur SQL Server, 12 sur Snowflake"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Snowflake arrondit.",
      "Non. SQL Server coupe les décimales.",
      "Oui. SQL Server tronque, Snowflake arrondit. Écart fréquent pendant une migration.",
      "Non. C'est l'inverse."
    ],
    retenir: "CAST en entier : SQL Server coupe, Snowflake arrondit. Utilise ROUND ou FLOOR pour être explicite."
  }
];
