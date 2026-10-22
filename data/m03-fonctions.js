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
  }
];
