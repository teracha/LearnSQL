LEARNSQL.questions.m03 = [
  {
    id: "m03-q01", dialecte: "SQL Server",
    q: "Sur SQL Server, que renvoie SELECT 7 / 2; ?",
    choix: [
      "3.5",
      "3",
      "4",
      "Une erreur"
    ],
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
    choix: [
      "'A'",
      "'B'",
      "'C'",
      "'A' et 'B'"
    ],
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
    choix: [
      "0",
      "Une chaîne vide ''",
      "NULL",
      "Une erreur"
    ],
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
    choix: [
      "'Cde-' et 'Cde-'",
      "NULL et 'Cde-'",
      "NULL et NULL",
      "'Cde-' et NULL"
    ],
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
    choix: [
      "0",
      "1",
      "0.003",
      "-1"
    ],
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
    choix: [
      "'22/10/2026'",
      "'10/22/2026'",
      "'2026-10-22'",
      "'20261022'"
    ],
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
    choix: [
      "3",
      "6",
      "0",
      "NULL"
    ],
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
    choix: [
      "99999.99",
      "999.99",
      "99.999",
      "5.2"
    ],
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
    choix: [
      "'DIF'",
      "'EDI'",
      "'EDIF'",
      "'FACT'"
    ],
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
    choix: [
      "3",
      "4",
      "5",
      "0"
    ],
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
    choix: [
      "LTRIM(x)",
      "RTRIM(x)",
      "TRIM(x)",
      "REPLACE(x, ' ', '')"
    ],
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
    choix: [
      "2026-02-01",
      "2026-02-28",
      "2026-03-01",
      "2026-02-10"
    ],
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
    choix: [
      "'vide'",
      "'rempli'",
      "NULL",
      "Une erreur"
    ],
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
    choix: [
      "IIF(qte > 0, 'OK', 'KO')",
      "IFF(qte > 0, 'OK', 'KO')",
      "IF(qte > 0, 'OK', 'KO')",
      "DECODE(qte > 0)"
    ],
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
    choix: [
      "12.34",
      "12.35",
      "12.3",
      "12"
    ],
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
    choix: [
      "3",
      "2",
      "2.5",
      "Une erreur"
    ],
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
    choix: [
      "FLOAT",
      "DECIMAL(18,2)",
      "VARCHAR(20)",
      "INT"
    ],
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
    choix: [
      "'CDE2026'",
      "'C'",
      "NULL",
      "Une erreur de troncature"
    ],
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
    choix: [
      "'105'",
      "15",
      "Une erreur",
      "NULL"
    ],
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
      "Oui, toujours, quelle que soit la langue",
      "Non, ça dépend du réglage DATEFIRST",
      "Non, le lundi vaut toujours 2 sur SQL Server",
      "Oui, mais seulement sur une base en français"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Le 1er jour de la semaine est un réglage.",
      "Oui. SET DATEFIRST (lié à la langue) fixe le 1er jour de la semaine. En anglais (US), la semaine commence le dimanche : le lundi vaut 2. En français, il vaut 1.",
      "Non. Ce n'est vrai qu'avec le réglage US.",
      "Non. C'est le réglage DATEFIRST de la session qui décide, pas la base."
    ],
    retenir: "Jour de la semaine : le résultat dépend de DATEFIRST. Ne le code pas en dur."
  },
  {
    id: "m03-q29", dialecte: "SQL Server",
    q: "Que renvoie le SELECT ?",
    code: "DECLARE @c char(2) = NULL;\nSELECT ISNULL(@c, 'ABCD');",
    choix: [
      "'ABCD'",
      "'AB'",
      "NULL",
      "Une erreur"
    ],
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
  },
  {
    id: "m03-q31", dialecte: "Snowflake",
    q: "Sur Snowflake, que renvoie INITCAP('jean dupont') ?",
    choix: [
      "'JEAN DUPONT'",
      "'Jean Dupont'",
      "'Jean dupont'",
      "'jean dupont'"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Ce serait UPPER.",
      "Oui. INITCAP met une majuscule au début de chaque mot. SQL Server n'a pas d'équivalent direct.",
      "Non. Chaque mot reçoit sa majuscule.",
      "Non. INITCAP change le texte : il ne le renvoie pas tel quel."
    ],
    retenir: "Snowflake : INITCAP pour « Première Lettre En Majuscule »."
  },
  {
    id: "m03-q32", dialecte: "SQL Server",
    q: "Comment extraire le département ('69') du code postal '69110' ?",
    choixCode: true,
    choix: [
      "LEFT(cp, 2)",
      "RIGHT(cp, 2)",
      "SUBSTRING(cp, 2, 2)",
      "CHARINDEX('69', cp)"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Les 2 premiers caractères. (Attention à la Corse : '2A', '2B', et aux DOM : 3 chiffres.)",
      "Non. Ça donne '10'.",
      "Non. Ça donne '91'.",
      "Non. Ça donne une position."
    ],
    retenir: "LEFT(texte, n) = les n premiers caractères."
  },
  {
    id: "m03-q33", dialecte: "SQL Server",
    q: "Que renvoie RIGHT('FAC-2026-0042', 4) ?",
    choix: [
      "'FAC-'",
      "'0042'",
      "'2026'",
      "'42'"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Ce serait LEFT.",
      "Oui. Les 4 derniers caractères.",
      "Non. '2026' est au milieu : RIGHT prend la fin.",
      "Non. On prend 4 caractères, zéros compris."
    ],
    retenir: "RIGHT(texte, n) = les n derniers caractères."
  },
  {
    id: "m03-q34", dialecte: "SQL Server",
    q: "Comment récupérer l'extension après le DERNIER point de 'export.edi.txt' ?",
    choixCode: true,
    choix: [
      "SUBSTRING(f, CHARINDEX('.', f) + 1, 10)",
      "RIGHT(f, CHARINDEX('.', REVERSE(f)) - 1)",
      "RIGHT(f, 3)",
      "REPLACE(f, '.', '')"
    ],
    bonne: 1,
    pourquoi: [
      "Non. CHARINDEX trouve le PREMIER point : on obtient 'edi.txt'.",
      "Oui. On retourne le texte, on cherche le 1er point (= le dernier de l'original), puis on prend la fin.",
      "Non. Faux si l'extension n'a pas 3 lettres (.xlsx).",
      "Non. Ça enlève les points."
    ],
    retenir: "Dernière occurrence : astuce REVERSE + CHARINDEX."
  },
  {
    id: "m03-q35", dialecte: "Snowflake",
    q: "Sur Snowflake, que renvoie SPLIT_PART('CDE;CLIENT;MONTANT', ';', 2) ?",
    choix: [
      "'CDE'",
      "'CLIENT'",
      "'MONTANT'",
      "Un tableau"
    ],
    bonne: 1,
    pourquoi: [
      "Non. C'est la 1re partie.",
      "Oui. On découpe sur ; et on prend la 2e partie. Pratique pour les lignes EDI ou CSV.",
      "Non. C'est la 3e partie.",
      "Non. SPLIT renvoie un tableau. SPLIT_PART renvoie un texte."
    ],
    retenir: "Snowflake : SPLIT_PART(texte, séparateur, n)."
  },
  {
    id: "m03-q36", dialecte: "SQL Server",
    q: "Sur SQL Server, que renvoie SELECT value FROM STRING_SPLIT('A;B;C', ';') ?",
    choix: [
      "Une ligne : 'A;B;C'",
      "3 lignes : A, B, C",
      "Une ligne : 'ABC'",
      "Une erreur"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Le texte est découpé.",
      "Oui. STRING_SPLIT est une fonction table : une ligne par morceau. L'ordre n'est garanti qu'avec le 3e paramètre (SQL Server 2022).",
      "Non. STRING_SPLIT découpe en plusieurs lignes, il ne colle pas les morceaux.",
      "Non. Disponible depuis SQL Server 2016."
    ],
    retenir: "STRING_SPLIT = un texte → plusieurs lignes."
  },
  {
    id: "m03-q37", dialecte: "SQL Server",
    q: "Que renvoie REPLICATE('0', 3) ?",
    choix: [
      "'0'",
      "'000'",
      "0",
      "'3'"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Le '0' est répété 3 fois.",
      "Oui. REPLICATE répète un texte n fois. (Snowflake : REPEAT.)",
      "Non. Le résultat est un texte.",
      "Non. 3 est le nombre de répétitions, pas le résultat."
    ],
    retenir: "REPLICATE (SQL Server) / REPEAT (Snowflake)."
  },
  {
    id: "m03-q38", dialecte: "SQL Server",
    q: "Que renvoie STUFF('ABCDEF', 2, 3, 'X') ?",
    choix: [
      "'AXBCDEF'",
      "'AXEF'",
      "'ABCXEF'",
      "'XDEF'"
    ],
    bonne: 1,
    pourquoi: [
      "Non. STUFF supprime avant d'insérer.",
      "Oui. À partir de la position 2, on supprime 3 caractères (BCD), puis on insère 'X'.",
      "Non. On commence à la position 2, donc juste après le A.",
      "Non. Le A (position 1) est gardé."
    ],
    retenir: "STUFF(texte, début, nb_à_supprimer, à_insérer)."
  },
  {
    id: "m03-q39", dialecte: "SQL Server + Snowflake",
    q: "Que renvoie TRANSLATE('12-05/2026', '-/', '..') ?",
    choix: [
      "'12.05.2026'",
      "'12-05/2026'",
      "'1205.2026'",
      "Une erreur"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. TRANSLATE remplace chaque caractère de la 2e liste par celui de même position dans la 3e. Un seul appel au lieu de deux REPLACE.",
      "Non. TRANSLATE remplace bien les - et les /.",
      "Non. Le - est remplacé par un point, pas supprimé.",
      "Non. Disponible sur SQL Server 2017+ et Snowflake."
    ],
    retenir: "TRANSLATE : remplacer plusieurs caractères en une fois."
  },
  {
    id: "m03-q40", dialecte: "SQL Server + Snowflake",
    q: "Que renvoie CONCAT_WS(';', 'A', NULL, 'C') ?",
    choix: [
      "'A;C' sur SQL Server et sur Snowflake",
      "'A;C' sur SQL Server, NULL sur Snowflake",
      "NULL sur SQL Server et sur Snowflake",
      "'A;;C' sur SQL Server, NULL sur Snowflake"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Snowflake renvoie NULL dès qu'un argument est NULL.",
      "Oui. SQL Server ignore les NULL. Snowflake : enveloppe chaque valeur dans COALESCE (et gère le séparateur).",
      "Non. SQL Server ignore les NULL.",
      "Non. SQL Server ignore les NULL : pas de double séparateur."
    ],
    retenir: "CONCAT_WS + NULL : ignoré par SQL Server, fatal sur Snowflake."
  },
  {
    id: "m03-q41", dialecte: "SQL Server",
    q: "Un export CSV est cassé : des libellés contiennent des retours à la ligne. Comment les enlever ?",
    choixCode: true,
    choix: [
      "REPLACE(libelle, CHAR(13) + CHAR(10), ' ')",
      "REPLACE(REPLACE(libelle, CHAR(13), ' '), CHAR(10), ' ')",
      "REPLACE(REPLACE(libelle, CHAR(9), ' '), CHAR(32), ' ')",
      "TRIM(REPLACE(libelle, CHAR(13), ''))"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Ne remplace que la paire CR + LF : un saut de ligne seul (CHAR(10)) reste.",
      "Oui. CHAR(13) = retour chariot, CHAR(10) = saut de ligne. On les remplace par un espace.",
      "Non. CHAR(9) = tabulation, CHAR(32) = espace : les retours à la ligne restent.",
      "Non. Les sauts de ligne CHAR(10) restent."
    ],
    retenir: "Caractères invisibles : CHAR(13), CHAR(10), CHAR(9) (tabulation)."
  },
  {
    id: "m03-q42", dialecte: "SQL Server + Snowflake",
    q: "Que renvoie ASCII('A') ?",
    choix: [
      "1",
      "65",
      "'A'",
      "97"
    ],
    bonne: 1,
    pourquoi: [
      "Non. 1 serait une position, pas un code de caractère.",
      "Oui. Le code du caractère. Utile pour repérer un caractère invisible dans une donnée.",
      "Non. ASCII renvoie un nombre.",
      "Non. 97, c'est 'a' minuscule."
    ],
    retenir: "ASCII(c) = code du caractère. CHAR(n) = l'inverse."
  },
  {
    id: "m03-q43", dialecte: "SQL Server",
    q: "Que renvoie DATALENGTH(N'abc') ?",
    choix: [
      "3",
      "6",
      "4",
      "NULL"
    ],
    bonne: 1,
    pourquoi: [
      "Non. C'est LEN, le nombre de caractères.",
      "Oui. NVARCHAR utilise 2 octets par caractère : 3 × 2 = 6.",
      "Non. 3 caractères × 2 octets = 6, pas 4.",
      "Non. N'abc' n'est pas NULL : DATALENGTH donne une taille."
    ],
    retenir: "NVARCHAR = 2 octets par caractère (en général)."
  },
  {
    id: "m03-q44", dialecte: "Standard",
    q: "Que renvoie LEN(NULL) ?",
    choix: [
      "0",
      "NULL",
      "4",
      "Une erreur"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Une valeur inconnue n'a pas une longueur de 0.",
      "Oui. Presque toutes les fonctions renvoient NULL quand on leur donne NULL.",
      "Non. Ce n'est pas le mot « NULL ».",
      "Non. LEN accepte NULL : il renvoie NULL."
    ],
    retenir: "Fonction(NULL) = NULL, sauf exceptions (COALESCE, CONCAT sur SQL Server…)."
  },
  {
    id: "m03-q45", dialecte: "SQL Server + Snowflake",
    q: "Que renvoie la longueur de 'abc  ' (2 espaces à la fin) ?",
    choix: [
      "3 partout",
      "LEN = 3 sur SQL Server ; LENGTH = 5 sur Snowflake",
      "5 partout",
      "LEN = 5 sur SQL Server ; LENGTH = 3 sur Snowflake"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Snowflake compte les espaces.",
      "Oui. SQL Server ignore les espaces de fin dans LEN. Snowflake les compte.",
      "Non. SQL Server ne les compte pas avec LEN.",
      "Non. C'est l'inverse."
    ],
    retenir: "Espaces de fin : LEN les ignore (SQL Server), LENGTH les compte (Snowflake)."
  },
  {
    id: "m03-q46", dialecte: "SQL Server",
    q: "Collation CI (insensible à la casse). Que renvoie REPLACE('Aa', 'a', 'x') ?",
    choix: [
      "'Ax'",
      "'xx'",
      "'Aa'",
      "'xa'"
    ],
    bonne: 1,
    pourquoi: [
      "Non sur SQL Server en CI. (Oui sur Snowflake, sensible à la casse.)",
      "Oui. REPLACE suit la collation : en CI, 'A' et 'a' sont « égaux », les deux sont remplacés.",
      "Non. Le 'a' est bien remplacé.",
      "Non. C'est l'inverse : en CI, les deux lettres sont remplacées."
    ],
    retenir: "REPLACE suit la collation sur SQL Server."
  },
  {
    id: "m03-q47", dialecte: "Snowflake",
    q: "Sur Snowflake, comment garder seulement les chiffres d'un numéro de téléphone ('04 78-12.34.56') ?",
    choixCode: true,
    choix: [
      "REPLACE(tel, ' ', '')",
      "REGEXP_REPLACE(tel, '[^0-9]', '')",
      "TRIM(tel)",
      "TRANSLATE(tel, '0123456789', '')"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Les tirets et points restent.",
      "Oui. On remplace tout ce qui n'est pas un chiffre par rien.",
      "Non. TRIM n'agit qu'aux extrémités.",
      "Non. Ça supprimerait plutôt les chiffres."
    ],
    retenir: "Nettoyage puissant : REGEXP_REPLACE (Snowflake)."
  },
  {
    id: "m03-q48", dialecte: "SQL Server",
    q: "Que penser de FORMAT(montant, 'N2', 'fr-FR') dans une requête de 5 millions de lignes ?",
    choix: [
      "Parfait : FORMAT est rapide et pratique",
      "Lent, et renvoie du texte : formate dans l'outil",
      "Erreur : la culture 'fr-FR' n'existe pas sur SQL Server",
      "Il arrondit à l'entier : les centimes sont perdus"
    ],
    bonne: 1,
    pourquoi: [
      "Non. FORMAT passe par .NET : très lent sur de gros volumes.",
      "Oui. FORMAT passe par .NET : très lent sur des millions de lignes. Et un texte ne se trie plus comme un nombre. Laisse Power BI ou Excel formater.",
      "Non. La culture 'fr-FR' existe.",
      "Non. N2 = 2 décimales."
    ],
    retenir: "FORMAT : pour l'affichage final seulement, et pas sur des millions de lignes."
  },
  {
    id: "m03-q49", dialecte: "SQL Server",
    q: "Quelle fonction renvoie la date et l'heure en UTC (temps universel) ?",
    choixCode: true,
    choix: [
      "GETDATE()",
      "SYSUTCDATETIME()",
      "SYSDATETIME()",
      "CURRENT_TIMESTAMP"
    ],
    bonne: 1,
    pourquoi: [
      "Non. GETDATE donne l'heure locale du serveur.",
      "Oui. SYSUTCDATETIME (précis) ou GETUTCDATE. Idéal pour horodater des flux entre pays.",
      "Non. Heure locale, en plus précis.",
      "Non. Équivalent de GETDATE : heure locale."
    ],
    retenir: "Horodatage de flux : UTC (SYSUTCDATETIME)."
  },
  {
    id: "m03-q50", dialecte: "SQL Server",
    q: "Une date est stockée en UTC. Comment l'afficher à l'heure de Paris (heure d'été comprise) ?",
    choixCode: true,
    choix: [
      "d AT TIME ZONE 'Romance Standard Time' AT TIME ZONE 'UTC'",
      "d AT TIME ZONE 'UTC' AT TIME ZONE 'Romance Standard Time'",
      "SWITCHOFFSET(CAST(d AS datetimeoffset), '+01:00')",
      "DATEADD(hour, 1, d) AT TIME ZONE 'Romance Standard Time'"
    ],
    bonne: 1,
    pourquoi: [
      "Non. C'est l'inverse : on dit que d est à l'heure de Paris, puis on le convertit en UTC.",
      "Oui. On dit d'abord que d est en UTC, puis on convertit vers le fuseau de Paris (nom Windows). L'heure d'été est gérée.",
      "Non. Décalage fixe de +1 h : faux pendant l'heure d'été (+2 h).",
      "Non. On ajoute 1 h à la main, puis on colle le fuseau : faux en été."
    ],
    retenir: "Fuseaux horaires : AT TIME ZONE (SQL Server 2016+)."
  },
  {
    id: "m03-q51", dialecte: "Snowflake",
    q: "Sur Snowflake, comment convertir un horodatage UTC (sans fuseau) en heure de Paris ?",
    choixCode: true,
    choix: [
      "CONVERT_TIMEZONE('UTC', 'Europe/Paris', ts)",
      "CONVERT_TIMEZONE('Europe/Paris', 'UTC', ts)",
      "ts AT TIME ZONE 'Europe/Paris'",
      "TO_TIMESTAMP_TZ(ts, 'Europe/Paris')"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Fuseau source, fuseau cible, valeur. L'heure d'été est gérée.",
      "Non. C'est l'inverse : de Paris vers UTC.",
      "Non. Ce n'est pas la syntaxe Snowflake.",
      "Non. TO_TIMESTAMP_TZ ne convertit pas d'un fuseau à l'autre : son 2e argument est un format."
    ],
    retenir: "Snowflake : CONVERT_TIMEZONE(source, cible, ts)."
  },
  {
    id: "m03-q52", dialecte: "Snowflake",
    q: "Sur Snowflake, que veut dire TIMESTAMP_NTZ ?",
    choix: [
      "Horodatage sans fuseau horaire (« No Time Zone »)",
      "Horodatage en UTC obligatoire",
      "Horodatage avec le fuseau de la session",
      "Horodatage en nanosecondes"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. La valeur est stockée telle quelle, sans fuseau. LTZ = fuseau de la session, TZ = fuseau stocké avec la valeur.",
      "Non. Rien n'oblige à l'UTC : c'est une convention à respecter soi-même.",
      "Non. C'est TIMESTAMP_LTZ.",
      "Non. NTZ veut dire « No Time Zone », rien à voir avec la précision."
    ],
    retenir: "Snowflake : NTZ (sans fuseau), LTZ (session), TZ (fuseau stocké)."
  },
  {
    id: "m03-q53", dialecte: "SQL Server",
    q: "Que renvoie DATEPART(quarter, '20260815') ?",
    choix: [
      "2",
      "3",
      "8",
      "15"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Le 2e trimestre va d'avril à juin.",
      "Oui. Août est dans le 3e trimestre (juillet à septembre).",
      "Non. 8, c'est le mois.",
      "Non. 15, c'est le jour."
    ],
    retenir: "DATEPART(quarter, d) = trimestre (1 à 4)."
  },
  {
    id: "m03-q54", dialecte: "SQL Server",
    q: "En France, on compte les semaines selon la norme ISO. Quelle fonction utiliser sur SQL Server ?",
    choixCode: true,
    choix: [
      "DATEPART(week, d)",
      "DATEPART(iso_week, d)",
      "WEEK(d)",
      "DATENAME(week, d)"
    ],
    bonne: 1,
    pourquoi: [
      "Non. week suit la règle américaine (semaine du 1er janvier = semaine 1). Résultat différent en début et fin d'année.",
      "Oui. iso_week : semaines du lundi au dimanche, semaine 1 = celle du 1er jeudi de l'année.",
      "Non. WEEK n'existe pas sur SQL Server.",
      "Non. Même règle que week."
    ],
    retenir: "Semaine française = ISO : DATEPART(iso_week, d)."
  },
  {
    id: "m03-q55", dialecte: "Snowflake",
    q: "Sur Snowflake, quelle fonction donne le numéro de semaine ISO ?",
    choixCode: true,
    choix: [
      "WEEKISO(d)",
      "ISO_WEEK(d)",
      "DATEPART(iso, d)",
      "WEEKNUM(d)"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. WEEKISO suit la norme ISO, comme en France. (WEEK dépend d'un paramètre de session.)",
      "Non. Cette fonction n'existe pas.",
      "Non. DATEPART est du SQL Server ; Snowflake utilise WEEKISO.",
      "Non. C'est Excel."
    ],
    retenir: "Snowflake : WEEKISO(d)."
  },
  {
    id: "m03-q56", dialecte: "SQL Server",
    q: "Que renvoie DATEFROMPARTS(2026, 2, 30) ?",
    choix: [
      "2026-03-02",
      "2026-02-28",
      "Une erreur",
      "NULL"
    ],
    bonne: 2,
    pourquoi: [
      "Non. SQL Server ne « déborde » pas sur le mois suivant.",
      "Non. Pas de correction automatique.",
      "Oui. Le 30 février n'existe pas : erreur.",
      "Non. Ce serait le cas d'une fonction TRY_."
    ],
    retenir: "DATEFROMPARTS refuse les dates impossibles."
  },
  {
    id: "m03-q57", dialecte: "SQL Server",
    q: "Que renvoie DATEADD(month, 1, '20260131') ?",
    choix: [
      "2026-03-03",
      "2026-02-28",
      "2026-02-31",
      "Une erreur"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Pas de débordement.",
      "Oui. Le 31 février n'existe pas : SQL Server prend le dernier jour de février.",
      "Non. Date impossible.",
      "Non. SQL Server ajuste au dernier jour du mois, sans erreur."
    ],
    retenir: "DATEADD(month) ajuste au dernier jour du mois si besoin. Attention aux échéances."
  },
  {
    id: "m03-q58", dialecte: "SQL Server",
    q: "Que renvoie DATEDIFF(month, '20260131', '20260201') ?",
    choix: [
      "0",
      "1",
      "0.03",
      "-1"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Un seul jour d'écart, mais…",
      "Oui. On passe de janvier à février : une frontière de mois franchie.",
      "Non. DATEDIFF renvoie un entier.",
      "Non. La 2e date est après la 1re : le résultat est positif."
    ],
    retenir: "DATEDIFF compte les frontières, pas les durées."
  },
  {
    id: "m03-q59", dialecte: "SQL Server",
    q: "Quelle expression donne l'âge exact (en années révolues) au jour @d ?",
    choixCode: true,
    choix: [
      "DATEDIFF(year, naissance, @d) - CASE WHEN DATEADD(year, DATEDIFF(year, naissance, @d), naissance) < @d THEN 1 ELSE 0 END",
      "DATEDIFF(year, naissance, @d) - CASE WHEN DATEADD(year, DATEDIFF(year, naissance, @d), naissance) > @d THEN 1 ELSE 0 END",
      "DATEDIFF(day, naissance, @d) / 365",
      "YEAR(@d) - YEAR(naissance)"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Le test est inversé : on retire 1 quand l'anniversaire est déjà passé.",
      "Oui. On retire 1 si l'anniversaire de l'année n'est pas encore arrivé.",
      "Non. Faux à cause des années bissextiles.",
      "Non. Même erreur que DATEDIFF(year) : l'anniversaire n'est peut-être pas passé."
    ],
    retenir: "Âge / ancienneté : corrige DATEDIFF(year) si la date anniversaire n'est pas passée."
  },
  {
    id: "m03-q60", dialecte: "SQL Server",
    q: "DATEDIFF(millisecond, d1, d2) renvoie une erreur de dépassement sur un écart d'un mois. Pourquoi ?",
    choix: [
      "Les millisecondes ne sont pas gérées par DATEDIFF",
      "Un INT est trop petit : DATEDIFF_BIG",
      "Il faut DATEADD pour les petites unités",
      "Une des deux dates est NULL, d'où l'erreur"
    ],
    bonne: 1,
    pourquoi: [
      "Non. millisecond est une unité valide.",
      "Oui. DATEDIFF renvoie un INT, qui dépasse après environ 24 jours en millisecondes. DATEDIFF_BIG renvoie un BIGINT.",
      "Non. DATEADD ajoute une durée, il ne calcule pas un écart.",
      "Non. Avec NULL, le résultat serait NULL, pas une erreur."
    ],
    retenir: "Grands écarts en petites unités : DATEDIFF_BIG."
  },
  {
    id: "m03-q61", dialecte: "Snowflake",
    q: "Un fichier EDI donne la date '20261026'. Comment la convertir en DATE sur Snowflake ?",
    choixCode: true,
    choix: [
      "TO_DATE('20261026', 'YYYYMMDD')",
      "CONVERT(date, '20261026', 112)",
      "DATE('20261026')",
      "CAST('20261026' AS DATE FORMAT)"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. On donne le format exact.",
      "Non. Syntaxe SQL Server.",
      "Non. Le format n'est pas précisé : risque d'erreur.",
      "Non. Syntaxe invalide."
    ],
    retenir: "Snowflake : TO_DATE(texte, 'format')."
  },
  {
    id: "m03-q62", dialecte: "SQL Server",
    q: "Sur SQL Server, CAST('20261026' AS date) fonctionne-t-il ?",
    choix: [
      "Oui, toujours",
      "Non, il faut CONVERT",
      "Seulement en anglais",
      "Non, il faut des tirets"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Le format AAAAMMJJ est compris quelle que soit la langue.",
      "Non. CAST suffit pour ce format.",
      "Non. Ce format ne dépend pas de la langue.",
      "Non. Les tirets ne sont pas nécessaires : AAAAMMJJ est le format le plus sûr."
    ],
    retenir: "'AAAAMMJJ' : le format de date sûr sur SQL Server."
  },
  {
    id: "m03-q63", dialecte: "SQL Server",
    q: "Un champ EDI contient l'heure '1430' (HHMM). Comment obtenir un TIME sur SQL Server ?",
    choixCode: true,
    choix: [
      "CAST('1430' AS time)",
      "CAST(STUFF('1430', 3, 0, ':') AS time)",
      "CONVERT(time, '1430', 112)",
      "TIME('1430')"
    ],
    bonne: 1,
    pourquoi: [
      "Non. '1430' n'est pas un format d'heure reconnu.",
      "Oui. STUFF insère ':' en position 3 : '14:30', puis conversion.",
      "Non. 112 est un style de date.",
      "Non. TIME n'est pas une fonction."
    ],
    retenir: "STUFF pour insérer un séparateur avant une conversion."
  },
  {
    id: "m03-q64", dialecte: "SQL Server",
    q: "Tu dois envoyer une date au format AAAAMMJJ dans un fichier EDI. Quelle expression ?",
    choixCode: true,
    choix: [
      "CONVERT(varchar(8), d, 112)",
      "CONVERT(varchar(10), d, 103)",
      "CAST(d AS varchar)",
      "FORMAT(d, 'dd/MM/yyyy')"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Style 112 = AAAAMMJJ (format ISO court).",
      "Non. 103 = jj/mm/aaaa.",
      "Non. Le format dépend des réglages.",
      "Non. Format français, et lent."
    ],
    retenir: "CONVERT styles utiles : 112 (AAAAMMJJ), 103 (jj/mm/aaaa), 120 (AAAA-MM-JJ hh:mi:ss)."
  },
  {
    id: "m03-q65", dialecte: "SQL Server",
    q: "Que donne CONVERT(varchar(19), d, 120) pour le 26/10/2026 à 14:05:09 ?",
    choix: [
      "'26/10/2026 14:05:09'",
      "'2026-10-26 14:05:09'",
      "'20261026'",
      "'Oct 26 2026 2:05PM'"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Ce serait un style français.",
      "Oui. Style 120 = format ODBC, AAAA-MM-JJ hh:mi:ss, en 24 h.",
      "Non. C'est le style 112.",
      "Non. C'est le style par défaut (100)."
    ],
    retenir: "Style 120 : horodatage lisible et triable."
  },
  {
    id: "m03-q66", dialecte: "SQL Server",
    q: "Que renvoie TRY_CONVERT(date, '31/02/2026', 103) ?",
    choix: [
      "2026-02-28",
      "2026-03-03",
      "NULL",
      "Une erreur"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Pas de correction automatique.",
      "Non. TRY_CONVERT ne déborde pas sur mars : il renvoie NULL.",
      "Oui. Le 31 février n'existe pas : TRY_CONVERT renvoie NULL au lieu de planter.",
      "Non. Ce serait CONVERT."
    ],
    retenir: "TRY_CONVERT / TRY_CAST : NULL au lieu d'une erreur."
  },
  {
    id: "m03-q67", dialecte: "SQL Server",
    q: "Que renvoie TRY_PARSE('1234,50' AS decimal(10,2) USING 'fr-FR') ?",
    choix: [
      "123450",
      "1234.50",
      "NULL",
      "Une erreur"
    ],
    bonne: 1,
    pourquoi: [
      "Non. La virgule est comprise comme séparateur décimal en français.",
      "Oui. PARSE comprend les formats d'une culture. Mais il est lent (passe par .NET).",
      "Non. La conversion réussit.",
      "Non. TRY_PARSE ne plante pas : au pire, il renvoie NULL."
    ],
    retenir: "TRY_PARSE … USING 'fr-FR' : pratique, mais lent sur de gros volumes."
  },
  {
    id: "m03-q68", dialecte: "SQL Server",
    q: "Que renvoie CONCAT('Cde ', 42) ?",
    choix: [
      "'Cde 42'",
      "Une erreur",
      "42",
      "NULL"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. CONCAT convertit tout en texte. Pas besoin de CAST.",
      "Non. C'est + qui pose problème.",
      "Non. Le texte 'Cde ' est gardé.",
      "Non. Aucune valeur n'est NULL ; et CONCAT ignore les NULL."
    ],
    retenir: "CONCAT convertit automatiquement en texte."
  },
  {
    id: "m03-q69", dialecte: "SQL Server",
    q: "Que renvoie SELECT 'Cde ' + 42; sur SQL Server ?",
    choix: [
      "'Cde 42' : le nombre est collé au texte",
      "Une erreur de conversion",
      "42 : le texte est simplement ignoré",
      "NULL, car les types sont différents"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Avec +, l'entier est prioritaire.",
      "Oui. Avec +, l'entier est prioritaire : SQL Server essaie de transformer 'Cde ' en nombre. Utilise CONCAT, ou CAST(42 AS varchar(10)).",
      "Non. SQL Server n'ignore pas le texte : il essaie de le convertir.",
      "Non. Il y a une erreur, pas un NULL."
    ],
    retenir: "Texte + nombre avec + : risque d'erreur. CONCAT est plus sûr."
  },
  {
    id: "m03-q70", dialecte: "SQL Server",
    q: "Que renvoie CAST(1234.5678 AS decimal(6,2)) ?",
    choix: [
      "1234.56",
      "1234.57",
      "1234.5678",
      "Une erreur"
    ],
    bonne: 1,
    pourquoi: [
      "Non. SQL Server arrondit, il ne tronque pas, vers un DECIMAL.",
      "Oui. Arrondi à 2 décimales.",
      "Non. Seulement 2 décimales.",
      "Non. 6 chiffres dont 2 décimales : 1234.57 tient."
    ],
    retenir: "CAST vers DECIMAL : arrondi. CAST vers INT : troncature (SQL Server)."
  },
  {
    id: "m03-q71", dialecte: "SQL Server",
    q: "Que renvoie CAST(123456.78 AS decimal(5,2)) ?",
    choix: [
      "123.45 (coupé à 5 chiffres)",
      "999.99 (la valeur maximale)",
      "Une erreur de dépassement",
      "NULL, car la valeur ne tient pas"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Pas de coupure silencieuse.",
      "Non. Pas de valeur maximale de remplacement.",
      "Oui. DECIMAL(5,2) va jusqu'à 999.99. 123456.78 ne tient pas.",
      "Non. TRY_CAST renverrait NULL, mais pas CAST."
    ],
    retenir: "Trop de chiffres avant la virgule = erreur de dépassement."
  },
  {
    id: "m03-q72", dialecte: "SQL Server",
    q: "Que renvoie ROUND(1234.567, -2) ?",
    choix: [
      "1234.57",
      "1200.000",
      "1234.000",
      "1300.000"
    ],
    bonne: 1,
    pourquoi: [
      "Non. -2 n'est pas 2 décimales.",
      "Oui. Une longueur négative arrondit avant la virgule : aux centaines.",
      "Non. Ça serait un arrondi à l'unité, pas aux centaines.",
      "Non. 34 arrondi aux centaines donne 00."
    ],
    retenir: "ROUND(x, -2) = arrondi à la centaine."
  },
  {
    id: "m03-q73", dialecte: "SQL Server",
    q: "Que renvoie ROUND(12.345, 2, 1) sur SQL Server ?",
    choix: [
      "12.35",
      "12.34",
      "12",
      "Une erreur"
    ],
    bonne: 1,
    pourquoi: [
      "Non. C'est l'arrondi normal.",
      "Oui. Le 3e paramètre à 1 demande une troncature : on coupe sans arrondir.",
      "Non. On garde 2 décimales, on coupe juste après.",
      "Non. Le 3e paramètre existe sur SQL Server."
    ],
    retenir: "ROUND(x, n, 1) = tronquer (SQL Server). Snowflake : TRUNC(x, n)."
  },
  {
    id: "m03-q74", dialecte: "Snowflake",
    q: "Sur Snowflake, que renvoie TRUNC(12.345, 2) ?",
    choix: [
      "12.35",
      "12.34",
      "12",
      "Une erreur"
    ],
    bonne: 1,
    pourquoi: [
      "Non. TRUNC ne fait pas d'arrondi.",
      "Oui. On coupe après 2 décimales.",
      "Non. On garde 2 décimales.",
      "Non. TRUNC avec des décimales existe sur Snowflake."
    ],
    retenir: "Snowflake : TRUNC(nombre, n) coupe sans arrondir."
  },
  {
    id: "m03-q75", dialecte: "Standard",
    q: "Que renvoie FLOOR(-2.5) ?",
    choix: [
      "-2",
      "-3",
      "2",
      "-2.5"
    ],
    bonne: 1,
    pourquoi: [
      "Non. -2 est plus grand que -2.5.",
      "Oui. FLOOR donne l'entier juste en dessous. Pour un nombre négatif, c'est -3.",
      "Non. Le signe moins est gardé.",
      "Non. FLOOR renvoie un entier."
    ],
    retenir: "FLOOR = vers le bas, CEILING = vers le haut. Attention aux négatifs (avoirs)."
  },
  {
    id: "m03-q76", dialecte: "SQL Server",
    q: "Pourquoi éviter le type MONEY de SQL Server pour les calculs ?",
    choix: [
      "Il prend trop de place sur le disque",
      "Ses 4 décimales faussent certains calculs",
      "Il n'accepte pas le symbole de l'euro",
      "Il est réservé aux applications bancaires"
    ],
    bonne: 1,
    pourquoi: [
      "Non. 8 octets, comme un BIGINT.",
      "Oui. Les résultats intermédiaires (divisions, calculs en chaîne) sont arrondis à 4 décimales. DECIMAL avec une précision choisie est plus sûr.",
      "Non. Le type ne connaît pas les devises.",
      "Non. N'importe qui peut l'utiliser."
    ],
    retenir: "Montants : DECIMAL plutôt que MONEY."
  },
  {
    id: "m03-q77", dialecte: "SQL Server",
    q: "Que donne SELECT 2147483647 + 1; ?",
    choix: [
      "2147483648, sans problème",
      "Une erreur de dépassement (INT)",
      "0, le compteur repart à zéro",
      "-2147483648, le nombre « boucle »"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Le résultat ne tient pas dans un INT.",
      "Oui. 2 147 483 647 est le plus grand INT. Pour plus grand : BIGINT.",
      "Non. SQL Server ne repart pas à zéro : il signale l'erreur.",
      "Non. SQL Server ne « boucle » pas : il signale l'erreur."
    ],
    retenir: "INT max ≈ 2,1 milliards. Au-delà : BIGINT."
  },
  {
    id: "m03-q78", dialecte: "SQL Server",
    q: "Que se passe-t-il quand stock vaut NULL ?",
    code: "SELECT CASE WHEN stock IS NULL THEN 'N/A' ELSE stock END\nFROM article;   -- stock est un INT",
    choix: [
      "Ça affiche 'N/A' pour les stocks inconnus",
      "Erreur : 'N/A' n'est pas un INT",
      "Ça affiche NULL, car 'N/A' est ignoré",
      "Ça affiche 0 à la place de 'N/A'"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Un CASE n'a qu'un seul type de résultat.",
      "Oui. Un CASE n'a qu'un type de résultat : le plus fort (INT) l'emporte. Écris ELSE CAST(stock AS varchar(10)).",
      "Non. Il y a une erreur.",
      "Non. Il y a une erreur."
    ],
    retenir: "Toutes les branches d'un CASE doivent être du même type."
  },
  {
    id: "m03-q79", dialecte: "SQL Server",
    q: "Que donne COALESCE(qte, 'inconnu') quand qte (INT) vaut NULL ?",
    choix: [
      "'inconnu'",
      "Erreur de conversion",
      "NULL, car qte est NULL",
      "0, la valeur par défaut d'un INT"
    ],
    bonne: 1,
    pourquoi: [
      "Non. COALESCE renvoie le type le plus fort de ses arguments : INT.",
      "Oui. 'inconnu' doit devenir un INT : impossible. Convertis qte en texte d'abord.",
      "Non. COALESCE essaie bien de remplacer le NULL : c'est là que ça plante.",
      "Non. Un INT n'a pas de valeur par défaut ici."
    ],
    retenir: "COALESCE : arguments de types compatibles."
  },
  {
    id: "m03-q80", dialecte: "Snowflake",
    q: "Sur Snowflake, que renvoie NVL2(date_livraison, 'Livrée', 'En attente') ?",
    choix: [
      "'Livrée' si date_livraison est remplie, sinon 'En attente'",
      "date_livraison si elle est remplie",
      "'En attente' si date_livraison est remplie",
      "Une erreur"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. NVL2(x, si_non_null, si_null). Raccourci d'un CASE WHEN x IS NOT NULL.",
      "Non. Ce serait NVL / COALESCE.",
      "Non. C'est l'inverse.",
      "Non. NVL2 existe sur Snowflake."
    ],
    retenir: "Snowflake : NVL2(x, valeur_si_rempli, valeur_si_null)."
  },
  {
    id: "m03-q81", dialecte: "Snowflake",
    q: "Sur Snowflake, quelle fonction remplace NULL par 0 ?",
    choixCode: true,
    choix: [
      "ZEROIFNULL(x)",
      "NULLIFZERO(x)",
      "ISZERO(x)",
      "NULLTOZERO(x)"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Équivalent de COALESCE(x, 0).",
      "Non. NULLIFZERO fait l'inverse : 0 devient NULL (pratique contre la division par zéro).",
      "Non. Cette fonction n'existe pas.",
      "Non. Cette fonction n'existe pas."
    ],
    retenir: "Snowflake : ZEROIFNULL et NULLIFZERO."
  },
  {
    id: "m03-q82", dialecte: "SQL Server + Snowflake",
    q: "Que renvoie GREATEST(10, NULL, 30) ?",
    choix: [
      "30 sur SQL Server 2022 et sur Snowflake",
      "30 sur SQL Server 2022, NULL sur Snowflake",
      "NULL sur SQL Server 2022 et sur Snowflake",
      "NULL sur SQL Server 2022, 30 sur Snowflake"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Snowflake renvoie NULL dès qu'un argument est NULL.",
      "Oui. SQL Server 2022 ignore les NULL. Snowflake non : protège avec COALESCE.",
      "Non. SQL Server ignore les NULL.",
      "Non. C'est l'inverse."
    ],
    retenir: "GREATEST / LEAST + NULL : ignoré (SQL Server), contagieux (Snowflake)."
  },
  {
    id: "m03-q83", dialecte: "SQL Server",
    q: "Que renvoie CHOOSE(2, 'Bronze', 'Argent', 'Or') ?",
    choix: [
      "'Bronze'",
      "'Argent'",
      "'Or'",
      "2"
    ],
    bonne: 1,
    pourquoi: [
      "Non. L'index commence à 1.",
      "Oui. CHOOSE prend la valeur à la position donnée.",
      "Non. 'Or' est en position 3.",
      "Non. 2 est l'index : CHOOSE renvoie la valeur à cette place."
    ],
    retenir: "CHOOSE(n, a, b, c) : la n-ième valeur (à partir de 1)."
  },
  {
    id: "m03-q84", dialecte: "SQL Server + Snowflake",
    q: "Tu veux détecter si une ligne a changé entre deux chargements, sans comparer 30 colonnes une par une. Quelle technique ?",
    choix: [
      "Comparer la longueur totale des colonnes",
      "Comparer une empreinte (hash) des colonnes",
      "Comparer les id des lignes entre les deux chargements",
      "Comparer les dates de création des lignes"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Deux valeurs différentes peuvent avoir la même longueur.",
      "Oui. HASHBYTES('SHA2_256', …) sur SQL Server, SHA2() ou HASH() sur Snowflake. Même empreinte = mêmes données (en pratique). Pense à gérer les NULL et les séparateurs dans la concaténation.",
      "Non. L'id ne change pas quand les données changent.",
      "Non. La date de création ne change pas quand on modifie la ligne."
    ],
    retenir: "Détection de changement : comparer des empreintes (hash)."
  },
  {
    id: "m03-q85", dialecte: "SQL Server + Snowflake",
    q: "Comment générer un identifiant unique (GUID) ?",
    choix: [
      "NEWID() sur SQL Server, UUID_STRING() sur Snowflake",
      "RAND() sur SQL Server, RANDOM() sur Snowflake",
      "ROW_NUMBER() sur SQL Server et sur Snowflake",
      "UUID_STRING() sur SQL Server, NEWID() sur Snowflake"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Une nouvelle valeur unique à chaque appel, sur chaque ligne.",
      "Non. Un nombre aléatoire n'est pas garanti unique.",
      "Non. ROW_NUMBER n'est unique que dans la requête.",
      "Non. C'est l'inverse."
    ],
    retenir: "GUID : NEWID() (SQL Server), UUID_STRING() (Snowflake)."
  },
  {
    id: "m03-q86", dialecte: "Standard",
    q: "Un SIRET '00123456700018' est converti en BIGINT. Que se passe-t-il ?",
    choix: [
      "Rien : le SIRET reste le même",
      "Les zéros du début disparaissent",
      "Erreur : le nombre est trop grand",
      "Il devient NULL, car il commence par 0"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Le code est abîmé.",
      "Oui. On obtient 123456700018 : un nombre n'a pas de zéros devant. Les identifiants (SIRET, code postal, EAN) se stockent en texte.",
      "Non. Il tient dans un BIGINT. La conversion marche… et c'est le problème.",
      "Non. La conversion réussit."
    ],
    retenir: "Un code n'est pas un nombre : stocke-le en texte."
  },
  {
    id: "m03-q87", dialecte: "Snowflake",
    q: "Sur Snowflake, comment écrire une date au format AAAAMMJJ ?",
    choixCode: true,
    choix: [
      "TO_VARCHAR(d, 'YYYYMMDD')",
      "CONVERT(varchar, d, 112)",
      "FORMAT(d, 'yyyyMMdd')",
      "CAST(d AS 'YYYYMMDD')"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. TO_VARCHAR (ou TO_CHAR) avec un format.",
      "Non. Syntaxe SQL Server.",
      "Non. FORMAT n'existe pas sur Snowflake.",
      "Non. CAST ne prend pas de format."
    ],
    retenir: "Snowflake : TO_VARCHAR / TO_CHAR(date, 'format')."
  },
  {
    id: "m03-q88", dialecte: "Snowflake",
    q: "Sur Snowflake, quel format affiche l'heure et les minutes (ex. 14:05) ?",
    choixCode: true,
    choix: [
      "'HH24:MI'",
      "'HH:MM'",
      "'hh:mm'",
      "'H:M'"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. HH24 = heures sur 24 h, MI = minutes.",
      "Non. MM = le MOIS. Tu obtiendrais 14:10 en octobre.",
      "Non. Même problème : mm = mois.",
      "Non. H et M seuls ne sont pas des formats Snowflake valides pour ça."
    ],
    retenir: "Snowflake : MI = minutes, MM = mois."
  },
  {
    id: "m03-q89", dialecte: "SQL Server",
    q: "Sur SQL Server, FORMAT(d, 'dd/mm/yyyy') affiche '26/05/2026' pour le 26 octobre à 14:05. Pourquoi ?",
    choix: [
      "Un bug de SQL Server avec les dates",
      "mm = minutes ; le mois s'écrit MM",
      "La date stockée en base est fausse",
      "Il manque la culture 'fr-FR'"
    ],
    bonne: 1,
    pourquoi: [
      "Non. C'est le comportement normal.",
      "Oui. En format .NET, mm = minutes. Écris 'dd/MM/yyyy' : MM majuscules pour le mois. Piège inverse de Snowflake !",
      "Non. 05 = les minutes.",
      "Non. La culture ne change pas ce code."
    ],
    retenir: "FORMAT (SQL Server) : MM = mois, mm = minutes."
  },
  {
    id: "m03-q90", dialecte: "SQL Server",
    q: "Que renvoie EOMONTH('20261026', -1) ?",
    choix: [
      "2026-10-31",
      "2026-09-30",
      "2026-10-25",
      "2026-11-30"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Ce serait EOMONTH sans 2e paramètre.",
      "Oui. Le 2e paramètre décale le mois : -1 = fin du mois précédent.",
      "Non. EOMONTH renvoie toujours une fin de mois.",
      "Non. Ce serait +1."
    ],
    retenir: "EOMONTH(d, n) : fin du mois décalé de n mois."
  },
  {
    id: "m03-q91", dialecte: "SQL Server",
    q: "Que donne DATEADD(day, 1, EOMONTH(d, -1)) ?",
    choix: [
      "Le dernier jour du mois",
      "Le 1er jour du mois de d",
      "Le lendemain de d",
      "Le 1er jour du mois suivant"
    ],
    bonne: 1,
    pourquoi: [
      "Non. On ajoute 1 jour à la fin du mois PRÉCÉDENT.",
      "Oui. Fin du mois précédent + 1 jour = 1er du mois. Astuce classique avant SQL Server 2022.",
      "Non. On part de la fin du mois précédent, pas de d.",
      "Non. EOMONTH(d, -1) recule d'un mois, il n'avance pas."
    ],
    retenir: "1er du mois = lendemain de la fin du mois précédent."
  },
  {
    id: "m03-q92", dialecte: "SQL Server",
    q: "Sur SQL Server 2022, quelle fonction ramène une date au 1er jour de son mois ?",
    choixCode: true,
    choix: [
      "DATETRUNC(month, d)",
      "DATE_TRUNC('month', d)",
      "TRUNC(d, 'MM')",
      "MONTHSTART(d)"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Nouvelle fonction de SQL Server 2022 (sans _).",
      "Non. C'est la syntaxe Snowflake (avec _).",
      "Non. Syntaxe Oracle.",
      "Non. Cette fonction n'existe pas."
    ],
    retenir: "DATETRUNC (SQL Server 2022) / DATE_TRUNC (Snowflake)."
  },
  {
    id: "m03-q93", dialecte: "Standard",
    q: "Comment compter les jours ouvrés (sans week-ends ni jours fériés) entre deux dates ?",
    choix: [
      "DATEDIFF(weekday, d1, d2), qui saute les week-ends",
      "Avec une table calendrier et un COUNT",
      "DATEDIFF(day, d1, d2) * 5 / 7, arrondi",
      "Impossible en SQL, il faut Excel"
    ],
    bonne: 1,
    pourquoi: [
      "Non. weekday compte des jours, sans sauter les week-ends ni les fériés.",
      "Oui. La table calendrier (une ligne par jour, avec une colonne est_ouvre) gère aussi les fériés et les ponts.",
      "Non. Approximation fausse.",
      "Non. Une table calendrier le fait très bien."
    ],
    retenir: "Jours ouvrés : table calendrier."
  },
  {
    id: "m03-q94", dialecte: "Snowflake",
    q: "Sur Snowflake, que renvoie ADD_MONTHS('2026-02-28'::DATE, 1) ?",
    choix: [
      "2026-03-28",
      "2026-03-31",
      "2026-03-01",
      "Une erreur"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Ce serait DATEADD(month, 1, …).",
      "Oui. ADD_MONTHS garde la « fin de mois » : le 28 février est le dernier jour, le résultat est le dernier jour de mars.",
      "Non. ADD_MONTHS reste en mars, au dernier jour.",
      "Non. ADD_MONTHS fonctionne sur cette date."
    ],
    retenir: "Snowflake : ADD_MONTHS conserve la fin de mois, DATEADD non."
  },
  {
    id: "m03-q95", dialecte: "Standard",
    q: "Un fichier donne '1.234,50' (format français avec séparateur de milliers). Comment obtenir '1234.50' avant conversion ?",
    choixCode: true,
    choix: [
      "REPLACE(REPLACE(x, ',', '.'), '.', '')",
      "REPLACE(REPLACE(x, '.', ''), ',', '.')",
      "REPLACE(REPLACE(x, '.', ','), ',', '.')",
      "REPLACE(x, '.', '')"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Mauvais ordre : la virgule devient un point, puis tous les points sont supprimés : '123450'.",
      "Oui. D'abord on enlève les points des milliers, ensuite la virgule devient un point. L'ordre compte !",
      "Non. Les points deviennent des virgules, puis toutes les virgules des points : '1.234.50'.",
      "Non. Il reste la virgule : '1234,50'."
    ],
    retenir: "Format français : enlever les milliers, puis virgule → point."
  },
  {
    id: "m03-q96", dialecte: "Snowflake",
    q: "Sur Snowflake, comment enlever les zéros au début de '000123' ?",
    choixCode: true,
    choix: [
      "LTRIM('000123', '0')",
      "TRIM('000123')",
      "REPLACE('000123', '0', '')",
      "LEFT('000123', 3)"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. LTRIM accepte les caractères à retirer. (SQL Server 2022 aussi.)",
      "Non. TRIM enlève les espaces par défaut.",
      "Non. Ça enlèverait aussi les zéros au milieu : '1020' → '12'.",
      "Non. Ça garde les 3 premiers caractères : '000'."
    ],
    retenir: "LTRIM(texte, '0') : enlever les zéros de tête."
  },
  {
    id: "m03-q97", dialecte: "SQL Server",
    q: "Que renvoie SUBSTRING('ABC', 2, 10) ?",
    choix: [
      "Une erreur",
      "'BC'",
      "'BC' suivi d'espaces",
      "NULL"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Demander plus que la longueur n'est pas une erreur.",
      "Oui. On prend ce qui existe à partir de la position 2.",
      "Non. Pas d'espaces ajoutés.",
      "Non. Le texte existe à la position 2 : le résultat n'est pas NULL."
    ],
    retenir: "SUBSTRING trop long = on prend jusqu'à la fin."
  },
  {
    id: "m03-q98", dialecte: "SQL Server",
    q: "Pour 'PISCINE' (sans tiret), que donne LEFT(code, CHARINDEX('-', code) - 1) ?",
    choix: [
      "'PISCINE' : tout le texte",
      "'' : un texte vide, sans erreur",
      "Une erreur : longueur négative",
      "NULL, car le tiret est absent"
    ],
    bonne: 2,
    pourquoi: [
      "Non. LEFT reçoit -1 : ce n'est pas valide.",
      "Non. LEFT reçoit -1 : ce n'est pas valide.",
      "Oui. CHARINDEX vaut 0, donc LEFT(code, -1) : erreur. Protège : CASE WHEN CHARINDEX(…) > 0 …",
      "Non. Il y a une erreur."
    ],
    retenir: "CHARINDEX peut renvoyer 0 : protège les LEFT / SUBSTRING qui l'utilisent."
  },
  {
    id: "m03-q99", dialecte: "Standard",
    q: "Avant d'insérer des données importées, tu veux que les textes vides deviennent NULL. Quelle expression ?",
    choixCode: true,
    choix: [
      "COALESCE(x, '')",
      "NULLIF(TRIM(x), '')",
      "ISNULL(x, NULL)",
      "CASE WHEN x IS NULL THEN '' END"
    ],
    bonne: 1,
    pourquoi: [
      "Non. C'est l'inverse : NULL devient vide.",
      "Oui. Vide ou blanc → NULL. Les données sont plus propres.",
      "Non. Ne change rien.",
      "Non. C'est l'inverse : NULL devient vide, et le reste devient NULL."
    ],
    retenir: "Vide → NULL : NULLIF(TRIM(x), '')."
  },
  {
    id: "m03-q100", dialecte: "SQL Server",
    q: "Pourquoi COALESCE((SELECT … sous-requête lourde …), 0) peut-il être plus lent que prévu sur SQL Server ?",
    choix: [
      "COALESCE est toujours plus lent qu'ISNULL",
      "La sous-requête peut s'exécuter deux fois",
      "Le 0 force un parcours complet de la table",
      "Aucune différence avec ISNULL, jamais"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Pas sur des colonnes simples.",
      "Oui. COALESCE est transformé en CASE : CASE WHEN (sous-requête) IS NOT NULL THEN (sous-requête) ELSE 0 END. ISNULL n'a pas ce défaut.",
      "Non. Le 0 n'a aucun effet sur la lecture.",
      "Non. Il y a une différence avec une sous-requête."
    ],
    retenir: "COALESCE + sous-requête : risque de double exécution. ISNULL ou variable."
  }
];
