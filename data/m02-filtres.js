LEARNSQL.questions.m02 = [
  {
    id: "m02-q01", dialecte: "Standard",
    q: "Que renvoie cette requête ?",
    code: "SELECT *\nFROM commande\nWHERE date_livraison = NULL;",
    choix: [
      "Les commandes sans date de livraison",
      "Aucune ligne",
      "Toutes les commandes",
      "Une erreur de syntaxe"
    ],
    bonne: 1,
    pourquoi: [
      "Non. C'est ce qu'on voulait, mais ce n'est pas ce qu'on obtient.",
      "Oui. Comparer avec NULL donne « inconnu », jamais « vrai ». Aucune ligne ne passe. Il faut écrire IS NULL.",
      "Non. Le filtre élimine tout.",
      "Non. La syntaxe est valide. C'est la logique qui est fausse."
    ],
    retenir: "NULL se teste avec IS NULL ou IS NOT NULL. Jamais avec = ou <>."
  },
  {
    id: "m02-q02", dialecte: "Standard",
    q: "La sous-requête renvoie (1, 2, NULL). Que renvoie la requête ?",
    code: "SELECT *\nFROM client\nWHERE id NOT IN (SELECT client_id FROM commande);",
    choix: [
      "Les clients sans commande",
      "Aucune ligne",
      "Tous les clients",
      "Une erreur"
    ],
    bonne: 1,
    pourquoi: [
      "Non. C'est le but, mais le NULL casse tout.",
      "Oui. NOT IN (1, 2, NULL) veut dire id <> 1 AND id <> 2 AND id <> NULL. Le dernier test est « inconnu ». Donc rien ne passe.",
      "Non. Le NULL bloque toutes les lignes.",
      "Non. Pas d'erreur. C'est un piège silencieux."
    ],
    retenir: "Avec NOT IN, un seul NULL vide le résultat. Préfère NOT EXISTS."
  },
  {
    id: "m02-q03", dialecte: "Standard",
    q: "Quelles lignes garde ce filtre ?",
    code: "WHERE pays = 'FR'\n   OR pays = 'BE'\n  AND ca > 1000",
    choix: [
      "FR et BE, si ca > 1000",
      "Tous les FR + les BE avec ca > 1000",
      "Seulement les BE avec ca > 1000",
      "Erreur : il manque des parenthèses"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Pour ça il faut des parenthèses : (pays = 'FR' OR pays = 'BE') AND ca > 1000.",
      "Oui. AND passe avant OR. Le moteur lit : pays = 'FR' OR (pays = 'BE' AND ca > 1000).",
      "Non. Les lignes FR passent toutes, grâce au OR.",
      "Non. C'est valide. Mais mets toujours des parenthèses pour être clair."
    ],
    retenir: "AND est prioritaire sur OR. Mélange AND et OR ? Mets des parenthèses."
  },
  {
    id: "m02-q04", dialecte: "Standard",
    q: "WHERE quantite BETWEEN 10 AND 20 garde-t-il les lignes avec 10 et 20 ?",
    choix: ["Oui, les deux", "Non, aucune des deux", "Seulement 10", "Seulement 20"],
    bonne: 0,
    pourquoi: [
      "Oui. BETWEEN inclut les deux bornes : quantite >= 10 AND quantite <= 20.",
      "Non. Les bornes sont incluses.",
      "Non. Les deux bornes sont incluses.",
      "Non. Les deux bornes sont incluses."
    ],
    retenir: "BETWEEN a AND b = >= a AND <= b. Bornes incluses."
  },
  {
    id: "m02-q05", dialecte: "SQL Server",
    q: "date_cde est un DATETIME. Tu veux toutes les commandes de janvier 2026. Quel filtre est fiable ?",
    choixCode: true,
    choix: [
      "WHERE date_cde BETWEEN '20260101' AND '20260131'",
      "WHERE date_cde >= '20260101' AND date_cde < '20260201'",
      "WHERE date_cde LIKE '2026-01%'",
      "WHERE date_cde = '202601'"
    ],
    bonne: 1,
    pourquoi: [
      "Non. '20260131' veut dire le 31 à 00:00:00. Une commande du 31 à 14h est perdue.",
      "Oui. On prend tout ce qui est avant le 1er février. Ça marche quelle que soit l'heure.",
      "Non. LIKE sur une date force une conversion en texte. Lent et dépend du format.",
      "Non. Ce n'est pas une date valide."
    ],
    retenir: "Période sur une date avec heure : >= début AND < lendemain de la fin."
  },
  {
    id: "m02-q06", dialecte: "Standard",
    q: "Quelle valeur correspond à LIKE 'PI_C%' ?",
    choix: ["PIC", "PISCINE", "PISSCINE", "SPISCINE"],
    bonne: 1,
    pourquoi: [
      "Non. _ veut dire « exactement 1 caractère ». Il faut au moins 4 caractères.",
      "Oui. P, I, puis 1 caractère (S), puis C, puis n'importe quoi (INE).",
      "Non. Le 4e caractère est S, pas C.",
      "Non. Le motif commence par PI. Ici, ça commence par S."
    ],
    retenir: "LIKE : % = 0 à n caractères. _ = exactement 1 caractère."
  },
  {
    id: "m02-q07", dialecte: "SQL Server + Snowflake",
    q: "La table contient le nom 'DUPONT'. La requête WHERE nom = 'dupont' le trouve-t-elle ?",
    choix: [
      "Oui, partout",
      "Non, nulle part",
      "Oui sur SQL Server (collation par défaut), non sur Snowflake",
      "Non sur SQL Server, oui sur Snowflake"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Snowflake compare en tenant compte de la casse.",
      "Non. SQL Server ignore la casse avec sa collation par défaut (ex. French_CI_AS, CI = Case Insensitive).",
      "Oui. SQL Server dépend de la collation, souvent CI. Snowflake est sensible à la casse par défaut. Utilise UPPER() ou ILIKE sur Snowflake.",
      "Non. C'est l'inverse."
    ],
    retenir: "Casse : SQL Server dépend de la collation (souvent CI). Snowflake est sensible à la casse."
  },
  {
    id: "m02-q08", dialecte: "Standard",
    q: "Quelle fonction remplace un NULL, est standard SQL et accepte plus de 2 valeurs ?",
    choix: ["ISNULL", "NVL", "COALESCE", "IFNULL"],
    bonne: 2,
    pourquoi: [
      "Non. ISNULL est propre à SQL Server et prend 2 arguments seulement.",
      "Non. NVL vient d'Oracle (Snowflake l'accepte). 2 arguments seulement.",
      "Oui. COALESCE(a, b, c, …) renvoie la première valeur non NULL. Marche sur SQL Server et Snowflake.",
      "Non. IFNULL existe sur Snowflake et MySQL, pas sur SQL Server. 2 arguments."
    ],
    retenir: "COALESCE : standard, portable, plusieurs arguments."
  },
  {
    id: "m02-q09", dialecte: "Standard",
    q: "La colonne statut contient 3 lignes : 'A', 'X', NULL. Combien de lignes renvoie ce filtre ?",
    code: "WHERE statut <> 'X'",
    choix: ["0", "1", "2", "3"],
    bonne: 1,
    pourquoi: [
      "Non. La ligne 'A' passe le test.",
      "Oui. Seule 'A' passe. NULL <> 'X' donne « inconnu », donc la ligne NULL est éliminée.",
      "Non. La ligne NULL ne passe pas : <> avec NULL n'est jamais vrai.",
      "Non. La ligne 'X' est bien exclue."
    ],
    retenir: "Un filtre <> exclut aussi les NULL. Pour les garder : OR statut IS NULL."
  },
  {
    id: "m02-q10", dialecte: "SQL Server",
    q: "Un index existe sur date_cde. Quel filtre permet à SQL Server d'utiliser cet index efficacement ?",
    choixCode: true,
    choix: [
      "WHERE YEAR(date_cde) = 2026",
      "WHERE CONVERT(char(4), date_cde, 112) = '2026'",
      "WHERE date_cde >= '20260101' AND date_cde < '20270101'",
      "WHERE DATEPART(year, date_cde) = 2026"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Une fonction autour de la colonne empêche la recherche dans l'index (seek). SQL Server doit tout lire.",
      "Non. Même problème : la colonne est transformée.",
      "Oui. La colonne est laissée « nue ». SQL Server peut faire un Index Seek. On dit que le filtre est « SARGable ».",
      "Non. DATEPART est une fonction sur la colonne : même problème que YEAR."
    ],
    retenir: "Ne mets pas de fonction autour d'une colonne filtrée. Transforme plutôt la valeur."
  }
];
