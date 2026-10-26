LEARNSQL.questions.m08 = [
  {
    id: "m08-q01", dialecte: "Standard",
    q: "Quelle est la grande différence entre SUM(montant) avec GROUP BY et SUM(montant) OVER (…) ?",
    choix: [
      "Aucune",
      "GROUP BY fusionne les lignes ; OVER garde chaque ligne et ajoute le calcul à côté",
      "OVER est plus lent, toujours",
      "GROUP BY garde les lignes"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Avec OVER, on a le détail ET le total sur la même ligne.",
      "Non.",
      "Non. C'est l'inverse."
    ],
    retenir: "GROUP BY réduit. OVER garde les lignes."
  },
  {
    id: "m08-q02", dialecte: "Standard",
    q: "Que contient la colonne total ?",
    code: "SELECT num_cde, montant,\n       SUM(montant) OVER () AS total\nFROM commande;",
    choix: ["Le montant de la ligne", "Le total de toutes les commandes, répété sur chaque ligne", "Le cumul", "NULL"],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. OVER () = la fenêtre est toute la table (après WHERE).",
      "Non. Pas de ORDER BY : pas de cumul.",
      "Non."
    ],
    retenir: "OVER () = tout le résultat."
  },
  {
    id: "m08-q03", dialecte: "Standard",
    q: "Comment afficher, pour chaque commande, sa part (en %) dans le total ?",
    choixCode: true,
    choix: [
      "montant / SUM(montant) * 100",
      "montant * 100.0 / SUM(montant) OVER ()",
      "montant * 100 / COUNT(*)",
      "PERCENT(montant)"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Sans OVER, SUM est un agrégat : erreur (montant non groupé).",
      "Oui. Le total est calculé par la fenêtre ; 100.0 évite la division entière.",
      "Non.",
      "Non."
    ],
    retenir: "Part du total : x * 100.0 / SUM(x) OVER ()."
  },
  {
    id: "m08-q04", dialecte: "Standard",
    q: "Que fait PARTITION BY client_id dans SUM(montant) OVER (PARTITION BY client_id) ?",
    choix: [
      "Trie par client",
      "Calcule une somme séparée pour chaque client, affichée sur chacune de ses lignes",
      "Supprime les doublons",
      "Groupe les lignes"
    ],
    bonne: 1,
    pourquoi: [
      "Non. PARTITION BY ne trie pas.",
      "Oui. Comme un GROUP BY, mais les lignes restent.",
      "Non.",
      "Non. Les lignes ne sont pas fusionnées."
    ],
    retenir: "PARTITION BY = « par … », sans fusionner."
  },
  {
    id: "m08-q05", dialecte: "Standard",
    q: "Comment afficher la part de chaque commande dans le CA de SON client ?",
    choixCode: true,
    choix: [
      "montant * 100.0 / SUM(montant) OVER ()",
      "montant * 100.0 / SUM(montant) OVER (PARTITION BY client_id)",
      "montant * 100.0 / SUM(montant) OVER (ORDER BY client_id)",
      "montant / client_id"
    ],
    bonne: 1,
    pourquoi: [
      "Non. C'est la part dans le total général.",
      "Oui. Le dénominateur est le total du client.",
      "Non. ORDER BY ferait un cumul.",
      "Non."
    ],
    retenir: "Part dans le groupe : PARTITION BY groupe."
  },
  {
    id: "m08-q06", dialecte: "Standard",
    q: "Que change l'ajout de ORDER BY date_cde dans SUM(montant) OVER (ORDER BY date_cde) ?",
    choix: [
      "Rien",
      "La somme devient un cumul : chaque ligne additionne les lignes jusqu'à elle",
      "Le résultat est trié",
      "Erreur"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Avec ORDER BY, la fenêtre va « du début jusqu'à la ligne courante ».",
      "Non. L'ORDER BY de la fenêtre ne trie pas l'affichage.",
      "Non."
    ],
    retenir: "ORDER BY dans OVER = calcul cumulatif."
  },
  {
    id: "m08-q07", dialecte: "Standard",
    q: "Le ORDER BY à l'intérieur d'un OVER trie-t-il le résultat affiché ?",
    choix: ["Oui", "Non : il faut un ORDER BY à la fin de la requête", "Seulement avec ROW_NUMBER", "Seulement sur Snowflake"],
    bonne: 1,
    pourquoi: [
      "Non. Il sert seulement au calcul de la fenêtre.",
      "Oui. Le résultat est souvent trié par hasard, mais rien ne le garantit.",
      "Non.",
      "Non."
    ],
    retenir: "ORDER BY de la fenêtre ≠ ORDER BY du résultat."
  },
  {
    id: "m08-q08", dialecte: "Standard",
    q: "Comment calculer un CA cumulé qui repart à zéro chaque année ?",
    choixCode: true,
    choix: [
      "SUM(ca) OVER (ORDER BY mois)",
      "SUM(ca) OVER (PARTITION BY annee ORDER BY mois ROWS UNBOUNDED PRECEDING)",
      "SUM(ca) OVER (PARTITION BY mois)",
      "SUM(ca) GROUP BY annee"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Le cumul continue d'une année à l'autre.",
      "Oui. Un cumul par année, dans l'ordre des mois.",
      "Non. Pas de cumul.",
      "Non."
    ],
    retenir: "Cumul qui repart à zéro : PARTITION BY + ORDER BY."
  },
  {
    id: "m08-q09", dialecte: "Standard",
    q: "Valeurs de CA triées : 500, 300, 300, 100. Que donne ROW_NUMBER() OVER (ORDER BY ca DESC) ?",
    choix: ["1, 2, 2, 4", "1, 2, 3, 4", "1, 2, 2, 3", "4, 3, 2, 1"],
    bonne: 1,
    pourquoi: [
      "Non. C'est RANK.",
      "Oui. Un numéro unique par ligne, même pour les ex aequo (ordre entre eux arbitraire).",
      "Non. C'est DENSE_RANK.",
      "Non."
    ],
    retenir: "ROW_NUMBER : toujours unique."
  },
  {
    id: "m08-q10", dialecte: "Standard",
    q: "Valeurs de CA triées : 500, 300, 300, 100. Que donne RANK() OVER (ORDER BY ca DESC) ?",
    choix: ["1, 2, 3, 4", "1, 2, 2, 4", "1, 2, 2, 3", "1, 1, 2, 3"],
    bonne: 1,
    pourquoi: [
      "Non. C'est ROW_NUMBER.",
      "Oui. Ex aequo au même rang, puis un trou (pas de 3).",
      "Non. C'est DENSE_RANK.",
      "Non."
    ],
    retenir: "RANK : ex aequo, puis trou."
  },
  {
    id: "m08-q11", dialecte: "Standard",
    q: "Valeurs de CA triées : 500, 300, 300, 100. Que donne DENSE_RANK() OVER (ORDER BY ca DESC) ?",
    choix: ["1, 2, 3, 4", "1, 2, 2, 4", "1, 2, 2, 3", "1, 1, 1, 2"],
    bonne: 2,
    pourquoi: [
      "Non.",
      "Non. C'est RANK.",
      "Oui. Ex aequo au même rang, sans trou.",
      "Non."
    ],
    retenir: "DENSE_RANK : ex aequo, sans trou."
  },
  {
    id: "m08-q12", dialecte: "Standard",
    q: "Tu veux les commerciaux classés dans les 3 premiers montants DIFFÉRENTS (ex aequo compris). Quelle fonction ?",
    choix: ["ROW_NUMBER() <= 3", "RANK() <= 3", "DENSE_RANK() <= 3", "NTILE(3)"],
    bonne: 2,
    pourquoi: [
      "Non. Exactement 3 lignes : des ex aequo seraient coupés.",
      "Non. Après des ex aequo, le rang 3 peut manquer.",
      "Oui. Les 3 premières valeurs distinctes, avec tous les ex aequo.",
      "Non."
    ],
    retenir: "Top 3 des valeurs : DENSE_RANK."
  },
  {
    id: "m08-q13", dialecte: "Standard",
    q: "ROW_NUMBER() OVER (ORDER BY date_cde) : deux commandes ont la même date. Leur numéro est-il stable d'une exécution à l'autre ?",
    choix: ["Oui", "Non, pas garanti : ajoute un critère de départage (ex. id)", "Oui si la table a un index", "Erreur"],
    bonne: 1,
    pourquoi: [
      "Non. Entre ex aequo, l'ordre est arbitraire.",
      "Oui. ORDER BY date_cde, id : numéros stables et reproductibles.",
      "Non. Toujours pas garanti.",
      "Non."
    ],
    retenir: "ROW_NUMBER stable = ORDER BY unique (ajoute l'id)."
  },
  {
    id: "m08-q14", dialecte: "Standard",
    q: "10 clients. Que donne NTILE(4) OVER (ORDER BY ca DESC) en tailles de groupes ?",
    choix: ["4, 4, 2", "3, 3, 2, 2", "2, 2, 3, 3", "2, 2, 2, 4"],
    bonne: 1,
    pourquoi: [
      "Non. 4 groupes sont demandés.",
      "Oui. 10 / 4 = 2 reste 2 : les 2 premiers groupes ont une ligne de plus.",
      "Non. Les plus gros groupes viennent en premier.",
      "Non."
    ],
    retenir: "NTILE(n) : n groupes presque égaux, les premiers un peu plus gros."
  },
  {
    id: "m08-q15", dialecte: "Standard",
    q: "À quoi sert NTILE(4) OVER (ORDER BY ca DESC) dans une analyse clients ?",
    choix: [
      "À compter les clients",
      "À découper les clients en quartiles (25 % les plus gros = groupe 1…)",
      "À trouver les doublons",
      "À calculer une moyenne"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Segmentation rapide en tranches de taille égale (en nombre de clients).",
      "Non.",
      "Non."
    ],
    retenir: "NTILE = découpage en tranches égales en nombre de lignes."
  },
  {
    id: "m08-q16", dialecte: "Standard",
    q: "Que renvoie LAG(ca) OVER (ORDER BY mois) ?",
    choix: ["Le CA du mois suivant", "Le CA du mois précédent", "Le CA cumulé", "Le CA moyen"],
    bonne: 1,
    pourquoi: [
      "Non. C'est LEAD.",
      "Oui. LAG = la valeur de la ligne d'avant.",
      "Non.",
      "Non."
    ],
    retenir: "LAG = avant. LEAD = après."
  },
  {
    id: "m08-q17", dialecte: "Standard",
    q: "Que vaut LAG(ca) sur la toute première ligne ?",
    choix: ["0", "NULL", "Le CA de la dernière ligne", "Une erreur"],
    bonne: 1,
    pourquoi: [
      "Non. Sauf si on le demande.",
      "Oui. Pas de ligne avant. LAG(ca, 1, 0) donne 0 par défaut.",
      "Non.",
      "Non."
    ],
    retenir: "LAG / LEAD hors limites = NULL (ou la valeur par défaut donnée)."
  },
  {
    id: "m08-q18", dialecte: "Standard",
    q: "Que fait LAG(ca, 1, 0) OVER (ORDER BY mois) ?",
    choix: [
      "Décale de 0 ligne",
      "CA du mois précédent ; 0 s'il n'y en a pas",
      "CA du mois précédent multiplié par 0",
      "Erreur"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Le 2e paramètre (1) est le décalage.",
      "Oui. LAG(expression, décalage, valeur_par_défaut).",
      "Non.",
      "Non."
    ],
    retenir: "LAG(x, n, défaut)."
  },
  {
    id: "m08-q19", dialecte: "Standard",
    q: "Comment calculer l'évolution en % du CA par rapport au mois précédent ?",
    choixCode: true,
    choix: [
      "(ca - LAG(ca) OVER (ORDER BY mois)) * 100.0 / NULLIF(LAG(ca) OVER (ORDER BY mois), 0)",
      "ca * 100 / LAG(ca)",
      "LAG(ca) - ca",
      "ca / mois"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Écart / valeur précédente. NULLIF évite la division par zéro, 100.0 la division entière.",
      "Non. LAG sans OVER : erreur. Et ce n'est pas une évolution.",
      "Non. Écart en valeur, et à l'envers.",
      "Non."
    ],
    retenir: "Évolution % = (x - LAG(x)) * 100.0 / NULLIF(LAG(x), 0)."
  },
  {
    id: "m08-q20", dialecte: "Standard",
    q: "Tu compares chaque mois au même mois de l'année précédente avec LAG(ca, 12). Quelle condition doit être vraie ?",
    choix: [
      "Aucune",
      "Aucun mois ne doit manquer dans les données (sinon LAG(…, 12) remonte trop loin)",
      "Il faut 12 clients",
      "Il faut un index"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. LAG compte des LIGNES, pas des mois. Un mois sans vente décale tout. Pars d'un calendrier complet (LEFT JOIN).",
      "Non.",
      "Non."
    ],
    retenir: "LAG compte des lignes : bouche les trous avec un calendrier."
  },
  {
    id: "m08-q21", dialecte: "Standard",
    q: "Comment comparer chaque commande à la commande précédente DU MÊME client ?",
    choixCode: true,
    choix: [
      "LAG(montant) OVER (ORDER BY date_cde)",
      "LAG(montant) OVER (PARTITION BY client_id ORDER BY date_cde)",
      "LAG(montant) OVER (PARTITION BY date_cde)",
      "LAG(client_id)"
    ],
    bonne: 1,
    pourquoi: [
      "Non. La commande précédente peut être celle d'un autre client.",
      "Oui. Le LAG reste dans les lignes du client.",
      "Non.",
      "Non."
    ],
    retenir: "LAG par entité : PARTITION BY entité."
  },
  {
    id: "m08-q22", dialecte: "SQL Server",
    q: "Comment calculer le nombre de jours entre une commande et la commande précédente du même client ?",
    choixCode: true,
    choix: [
      "DATEDIFF(day, LAG(date_cde) OVER (PARTITION BY client_id ORDER BY date_cde), date_cde)",
      "DATEDIFF(day, date_cde, date_cde)",
      "LAG(DATEDIFF(day, date_cde))",
      "date_cde - 1"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. NULL pour la 1re commande de chaque client.",
      "Non. Toujours 0.",
      "Non.",
      "Non."
    ],
    retenir: "Délai entre événements : DATEDIFF(LAG(date), date)."
  },
  {
    id: "m08-q23", dialecte: "Standard",
    q: "Comment repérer la DERNIÈRE commande de chaque client avec LEAD ?",
    choix: [
      "LEAD(date_cde) = date_cde",
      "LEAD(date_cde) OVER (PARTITION BY client_id ORDER BY date_cde) IS NULL",
      "LEAD(date_cde) > 0",
      "Impossible avec LEAD"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Pas de commande suivante = c'est la dernière.",
      "Non.",
      "Non."
    ],
    retenir: "LEAD(…) IS NULL = dernière ligne de la partition."
  },
  {
    id: "m08-q24", dialecte: "Standard",
    q: "Que donne FIRST_VALUE(date_cde) OVER (PARTITION BY client_id ORDER BY date_cde) ?",
    choix: ["La dernière commande", "La date de 1re commande du client, sur chaque ligne", "La date de la ligne", "NULL"],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. La première valeur de la fenêtre, dans l'ordre demandé.",
      "Non.",
      "Non."
    ],
    retenir: "FIRST_VALUE = 1re valeur de la fenêtre."
  },
  {
    id: "m08-q25", dialecte: "SQL Server",
    q: "LAST_VALUE(date_cde) OVER (PARTITION BY client_id ORDER BY date_cde) renvoie la date de la ligne elle-même. Pourquoi ?",
    choix: [
      "Bug",
      "Le cadre par défaut s'arrête à la ligne courante : la « dernière » de la fenêtre, c'est elle",
      "Il faut DESC",
      "LAST_VALUE n'existe pas"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Précise le cadre : ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING. Ou FIRST_VALUE avec ORDER BY … DESC.",
      "Non. Ce serait une autre solution, mais pas l'explication.",
      "Non."
    ],
    retenir: "LAST_VALUE : précise le cadre jusqu'à UNBOUNDED FOLLOWING."
  },
  {
    id: "m08-q26", dialecte: "Standard",
    q: "Sans précision, quel est le cadre d'une fenêtre qui a un ORDER BY (SQL Server, norme) ?",
    choixCode: true,
    choix: [
      "ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING",
      "RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW",
      "ROWS BETWEEN 1 PRECEDING AND CURRENT ROW",
      "Toute la table"
    ],
    bonne: 1,
    pourquoi: [
      "Non. C'est le cas sans ORDER BY.",
      "Oui. Du début jusqu'à la ligne courante, ex aequo compris (RANGE).",
      "Non.",
      "Non."
    ],
    retenir: "Avec ORDER BY, cadre par défaut = RANGE … CURRENT ROW."
  },
  {
    id: "m08-q27", dialecte: "Standard",
    q: "Deux ventes ont la même date (100 € et 50 €). Avec SUM(montant) OVER (ORDER BY date_vente) (cadre par défaut), que vaut le cumul sur ces deux lignes ?",
    choix: [
      "Différent sur chaque ligne (… + 100, puis … + 150)",
      "Le même sur les deux lignes : RANGE additionne tous les ex aequo d'un coup",
      "NULL",
      "Une erreur"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Ce serait avec ROWS.",
      "Oui. Surprise fréquente. Utilise ROWS UNBOUNDED PRECEDING (avec un critère de départage).",
      "Non.",
      "Non."
    ],
    retenir: "Cumul ligne à ligne : ROWS, pas le RANGE par défaut."
  },
  {
    id: "m08-q28", dialecte: "Standard",
    q: "Quel cadre donne une moyenne mobile sur 3 mois (le mois en cours et les 2 précédents) ?",
    choixCode: true,
    choix: [
      "ROWS BETWEEN 3 PRECEDING AND CURRENT ROW",
      "ROWS BETWEEN 2 PRECEDING AND CURRENT ROW",
      "ROWS BETWEEN CURRENT ROW AND 2 FOLLOWING",
      "RANGE 3"
    ],
    bonne: 1,
    pourquoi: [
      "Non. 4 lignes au total.",
      "Oui. 2 avant + la ligne courante = 3 mois.",
      "Non. Les mois suivants.",
      "Non."
    ],
    retenir: "Moyenne mobile sur n : ROWS BETWEEN n-1 PRECEDING AND CURRENT ROW."
  },
  {
    id: "m08-q29", dialecte: "Standard",
    q: "Moyenne mobile 7 jours avec ROWS BETWEEN 6 PRECEDING AND CURRENT ROW. Certains jours n'ont aucune vente (pas de ligne). Problème ?",
    choix: [
      "Aucun",
      "La fenêtre prend 7 LIGNES, donc peut couvrir plus de 7 jours. Il faut un calendrier complet",
      "Erreur",
      "Les jours vides comptent pour 0 automatiquement"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. LEFT JOIN depuis le calendrier + COALESCE(ca, 0), puis la fenêtre.",
      "Non.",
      "Non. Une ligne absente n'est pas un 0."
    ],
    retenir: "ROWS compte des lignes, pas des jours."
  },
  {
    id: "m08-q30", dialecte: "SQL Server",
    q: "Sur SQL Server, RANGE BETWEEN 7 PRECEDING AND CURRENT ROW est-il accepté ?",
    choix: ["Oui", "Non : avec RANGE, SQL Server accepte seulement UNBOUNDED et CURRENT ROW", "Oui avec des dates", "Seulement avec PARTITION BY"],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Pour un décalage en nombre, utilise ROWS (et un calendrier complet).",
      "Non.",
      "Non."
    ],
    retenir: "SQL Server : RANGE limité à UNBOUNDED / CURRENT ROW."
  },
  {
    id: "m08-q31", dialecte: "Standard",
    q: "Quel cadre donne une moyenne « centrée » (mois précédent, mois en cours, mois suivant) ?",
    choixCode: true,
    choix: [
      "ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING",
      "ROWS BETWEEN 2 PRECEDING AND CURRENT ROW",
      "ROWS UNBOUNDED PRECEDING",
      "ROWS BETWEEN CURRENT ROW AND 2 FOLLOWING"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Une ligne avant, une après, plus la courante.",
      "Non. Pas centré.",
      "Non. Cumul.",
      "Non."
    ],
    retenir: "FOLLOWING = lignes après la courante."
  },
  {
    id: "m08-q32", dialecte: "Standard",
    q: "Comment obtenir le CA cumulé AVANT la commande en cours (sans l'inclure) ?",
    choixCode: true,
    choix: [
      "ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW",
      "ROWS BETWEEN UNBOUNDED PRECEDING AND 1 PRECEDING",
      "ROWS BETWEEN CURRENT ROW AND UNBOUNDED FOLLOWING",
      "ROWS 1 PRECEDING"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Inclut la ligne courante.",
      "Oui. Du début jusqu'à la ligne d'avant. NULL pour la 1re ligne.",
      "Non.",
      "Non. Seulement la ligne d'avant et la courante."
    ],
    retenir: "« Avant moi » : … AND 1 PRECEDING."
  },
  {
    id: "m08-q33", dialecte: "Standard",
    q: "Que donne MAX(ca) OVER (ORDER BY mois ROWS UNBOUNDED PRECEDING) ?",
    choix: [
      "Le CA maximum de toute la période, partout",
      "Le record de CA atteint jusqu'à ce mois (plus haut historique à date)",
      "Le CA du mois",
      "Une erreur"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Ce serait OVER ().",
      "Oui. Un maximum « courant ». Utile pour repérer les nouveaux records (ca = record).",
      "Non.",
      "Non."
    ],
    retenir: "MAX cumulatif = record à date."
  },
  {
    id: "m08-q34", dialecte: "Standard",
    q: "Que donne COUNT(*) OVER (PARTITION BY client_id) ?",
    choix: [
      "Le numéro de la ligne",
      "Le nombre de commandes du client, affiché sur chacune de ses lignes",
      "Le nombre total de clients",
      "1"
    ],
    bonne: 1,
    pourquoi: [
      "Non. C'est ROW_NUMBER.",
      "Oui. Pratique pour filtrer ensuite (ex. clients avec une seule commande).",
      "Non.",
      "Non."
    ],
    retenir: "COUNT(*) OVER (PARTITION BY x) = taille du groupe."
  },
  {
    id: "m08-q35", dialecte: "Standard",
    q: "Comment afficher TOUTES les colonnes des factures en double (même numéro), pas seulement les numéros ?",
    choix: [
      "GROUP BY num_facture HAVING COUNT(*) > 1",
      "Calculer COUNT(*) OVER (PARTITION BY num_facture) AS nb dans une CTE, puis WHERE nb > 1",
      "SELECT DISTINCT *",
      "ROW_NUMBER() = 1"
    ],
    bonne: 1,
    pourquoi: [
      "Non. On perd le détail des lignes.",
      "Oui. Chaque ligne garde ses colonnes et connaît la taille de son groupe.",
      "Non.",
      "Non. Garde une ligne par numéro."
    ],
    retenir: "Voir le détail des doublons : COUNT(*) OVER (PARTITION BY clé)."
  },
  {
    id: "m08-q36", dialecte: "SQL Server",
    q: "Que donne SELECT * FROM commande WHERE ROW_NUMBER() OVER (ORDER BY id) = 1; ?",
    choix: ["La 1re commande", "Erreur : les fonctions de fenêtrage ne sont pas autorisées dans WHERE", "Toutes les commandes", "0 ligne"],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Elles sont permises seulement dans SELECT et ORDER BY. Passe par une CTE.",
      "Non.",
      "Non."
    ],
    retenir: "Fenêtre : SELECT et ORDER BY seulement (SQL Server)."
  },
  {
    id: "m08-q37", dialecte: "SQL Server",
    q: "Peut-on utiliser une fonction de fenêtrage dans HAVING sur SQL Server ?",
    choix: ["Oui", "Non", "Seulement RANK", "Seulement avec GROUP BY"],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui, c'est interdit. Même règle que WHERE : passe par un niveau au-dessus.",
      "Non.",
      "Non."
    ],
    retenir: "Pas de fenêtre dans WHERE, GROUP BY ni HAVING."
  },
  {
    id: "m08-q38", dialecte: "Snowflake",
    q: "Sur Snowflake, quelle clause filtre directement sur une fonction de fenêtrage ?",
    choixCode: true,
    choix: ["WHERE", "HAVING", "QUALIFY", "FILTER"],
    bonne: 2,
    pourquoi: [
      "Non.",
      "Non.",
      "Oui. Elle s'écrit après HAVING. Ex. QUALIFY ROW_NUMBER() OVER (…) = 1.",
      "Non."
    ],
    retenir: "Snowflake : QUALIFY."
  },
  {
    id: "m08-q39", dialecte: "Snowflake",
    q: "Sur Snowflake, quelle requête garde la commande la plus récente de chaque client ?",
    choixCode: true,
    choix: [
      "SELECT * FROM commande QUALIFY ROW_NUMBER() OVER (PARTITION BY client_id ORDER BY date_cde DESC) = 1",
      "SELECT * FROM commande WHERE date_cde = MAX(date_cde)",
      "SELECT * FROM commande GROUP BY client_id",
      "SELECT TOP 1 * FROM commande"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Une ligne par client, sans CTE.",
      "Non. Agrégat dans WHERE.",
      "Non.",
      "Non. Une seule ligne au total."
    ],
    retenir: "Dernière ligne par groupe sur Snowflake : QUALIFY ROW_NUMBER() = 1."
  },
  {
    id: "m08-q40", dialecte: "Standard",
    q: "Dans quel ordre logique les fonctions de fenêtrage sont-elles calculées ?",
    choix: [
      "Avant WHERE",
      "Après WHERE, GROUP BY et HAVING, au moment du SELECT",
      "Après ORDER BY",
      "Avant FROM"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Sinon on pourrait les filtrer dans WHERE.",
      "Oui. Elles voient les lignes déjà filtrées et regroupées.",
      "Non.",
      "Non."
    ],
    retenir: "FROM → WHERE → GROUP BY → HAVING → fenêtres (SELECT) → ORDER BY."
  },
  {
    id: "m08-q41", dialecte: "Standard",
    q: "Une requête a WHERE annee = 2026 et SUM(montant) OVER (). Que calcule la fenêtre ?",
    choix: ["Le total de toutes les années", "Le total de 2026 seulement", "Une erreur", "Le cumul"],
    bonne: 1,
    pourquoi: [
      "Non. Le WHERE a déjà retiré les autres années.",
      "Oui. La fenêtre travaille sur les lignes restantes après le WHERE.",
      "Non.",
      "Non."
    ],
    retenir: "Les fenêtres voient seulement les lignes qui ont passé le WHERE."
  },
  {
    id: "m08-q42", dialecte: "Standard",
    q: "Peut-on écrire SUM(SUM(montant)) OVER () dans une requête GROUP BY client_id ?",
    choix: [
      "Non, agrégat imbriqué interdit",
      "Oui : le SUM intérieur est le total du client, le SUM … OVER () fait le total de ces totaux",
      "Oui, mais le résultat est faux",
      "Seulement sur Snowflake"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Ici, c'est permis : la fenêtre s'applique APRÈS le GROUP BY.",
      "Oui. Parfait pour la part de chaque client : SUM(montant) * 100.0 / SUM(SUM(montant)) OVER ().",
      "Non.",
      "Non."
    ],
    retenir: "Avec GROUP BY : fenêtre sur des agrégats = SUM(SUM(x)) OVER ()."
  },
  {
    id: "m08-q43", dialecte: "Standard",
    q: "Comment classer les clients par CA, dans une requête GROUP BY client_id ?",
    choixCode: true,
    choix: [
      "RANK() OVER (ORDER BY SUM(montant) DESC)",
      "RANK(SUM(montant))",
      "ORDER BY RANK()",
      "SUM(RANK())"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. On classe sur l'agrégat, calculé avant la fenêtre.",
      "Non.",
      "Non.",
      "Non."
    ],
    retenir: "Classement d'agrégats : RANK() OVER (ORDER BY SUM(x) DESC)."
  },
  {
    id: "m08-q44", dialecte: "Standard",
    q: "Analyse ABC des articles : comment calculer le % cumulé du CA, du plus gros article au plus petit ?",
    choixCode: true,
    choix: [
      "SUM(ca) OVER (ORDER BY ca DESC ROWS UNBOUNDED PRECEDING) * 100.0 / SUM(ca) OVER ()",
      "ca * 100.0 / SUM(ca) OVER ()",
      "RANK() OVER (ORDER BY ca)",
      "AVG(ca) OVER ()"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Cumul décroissant / total. Classe A jusqu'à 80 %, B jusqu'à 95 %, C ensuite.",
      "Non. Part individuelle, pas cumulée.",
      "Non.",
      "Non."
    ],
    retenir: "ABC / Pareto : % cumulé décroissant."
  },
  {
    id: "m08-q45", dialecte: "Standard",
    q: "Une table de mouvements de stock contient +entrées et -sorties. Comment obtenir le stock après chaque mouvement ?",
    choixCode: true,
    choix: [
      "SUM(qte) OVER (PARTITION BY article ORDER BY date_mvt, id ROWS UNBOUNDED PRECEDING)",
      "SUM(qte) GROUP BY article",
      "LAG(qte)",
      "MAX(qte) OVER ()"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Cumul des mouvements signés, par article, dans l'ordre. L'id départage les mouvements du même instant.",
      "Non. Seulement le stock final.",
      "Non.",
      "Non."
    ],
    retenir: "Solde courant = cumul des mouvements signés."
  },
  {
    id: "m08-q46", dialecte: "Standard",
    q: "Comment afficher, sur chaque ligne, la date de première commande du client ?",
    choixCode: true,
    choix: [
      "MIN(date_cde) OVER (PARTITION BY client_id)",
      "MIN(date_cde)",
      "FIRST(date_cde)",
      "LAG(date_cde)"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Le minimum du client, répété sur ses lignes. (FIRST_VALUE marche aussi.)",
      "Non. Sans OVER ni GROUP BY : erreur.",
      "Non.",
      "Non."
    ],
    retenir: "Info du groupe sur chaque ligne : agrégat OVER (PARTITION BY)."
  },
  {
    id: "m08-q47", dialecte: "Standard",
    q: "Comment repérer les lignes où le prix d'un article a changé par rapport à la ligne précédente ?",
    choixCode: true,
    choix: [
      "WHERE prix <> LAG(prix) OVER (…)",
      "Calculer LAG(prix) OVER (PARTITION BY article ORDER BY date_effet) AS prix_prec dans une CTE, puis WHERE prix <> prix_prec OR prix_prec IS NULL",
      "GROUP BY prix",
      "DISTINCT prix"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Fenêtre interdite dans WHERE (SQL Server).",
      "Oui. On compare à la valeur précédente. La 1re ligne (prix_prec NULL) est un « début ».",
      "Non.",
      "Non."
    ],
    retenir: "Détecter un changement : LAG puis comparaison, au niveau du dessus."
  },
  {
    id: "m08-q48", dialecte: "Standard",
    q: "Comment repérer les clients perdus (dernière commande il y a plus d'un an) avec une fenêtre ?",
    choix: [
      "LAG(date_cde) > 365",
      "Garder les lignes où LEAD(date_cde) OVER (PARTITION BY client_id ORDER BY date_cde) IS NULL, puis tester date_cde < il y a un an",
      "RANK() = 1",
      "NTILE(12)"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. On isole la dernière commande, puis on regarde son âge. (MAX + GROUP BY marche aussi.)",
      "Non.",
      "Non."
    ],
    retenir: "Dernière commande = LEAD IS NULL (ou ROW_NUMBER DESC = 1)."
  },
  {
    id: "m08-q49", dialecte: "SQL Server",
    q: "Comment numéroter des lignes sans ordre particulier sur SQL Server (ORDER BY est obligatoire dans ROW_NUMBER) ?",
    choixCode: true,
    choix: [
      "ROW_NUMBER() OVER ()",
      "ROW_NUMBER() OVER (ORDER BY (SELECT NULL))",
      "ROW_NUMBER()",
      "IDENTITY()"
    ],
    bonne: 1,
    pourquoi: [
      "Non. SQL Server exige ORDER BY pour ROW_NUMBER.",
      "Oui. Astuce : un ORDER BY sur une constante. Numérotation arbitraire, mais sans tri coûteux.",
      "Non.",
      "Non. IDENTITY() s'utilise seulement avec SELECT INTO."
    ],
    retenir: "Numéroter sans ordre : ORDER BY (SELECT NULL)."
  },
  {
    id: "m08-q50", dialecte: "Standard",
    q: "Une requête trie sur une fenêtre : ORDER BY RANK() OVER (ORDER BY ca DESC). Est-ce valide ?",
    choix: ["Oui", "Non", "Seulement dans une CTE", "Seulement sur Snowflake"],
    bonne: 0,
    pourquoi: [
      "Oui. Les fenêtres sont permises dans ORDER BY.",
      "Non.",
      "Non.",
      "Non."
    ],
    retenir: "Fenêtre permise dans SELECT et ORDER BY."
  },
  {
    id: "m08-q51", dialecte: "SQL Server",
    q: "Que donne COUNT(DISTINCT article_id) OVER (PARTITION BY client_id) sur SQL Server ?",
    choix: ["Le nombre d'articles distincts du client", "Erreur : DISTINCT n'est pas permis avec OVER", "Le nombre de lignes", "NULL"],
    bonne: 1,
    pourquoi: [
      "Non sur SQL Server. (Snowflake l'accepte, sans ORDER BY dans la fenêtre.)",
      "Oui. Astuce : DENSE_RANK() OVER (PARTITION BY client_id ORDER BY article_id) + DENSE_RANK() OVER (… ORDER BY article_id DESC) - 1.",
      "Non.",
      "Non."
    ],
    retenir: "SQL Server : pas de COUNT(DISTINCT) OVER. Astuce des deux DENSE_RANK."
  },
  {
    id: "m08-q52", dialecte: "Snowflake",
    q: "Sur Snowflake, COUNT(DISTINCT article_id) OVER (PARTITION BY client_id) est-il accepté ?",
    choix: ["Oui", "Non", "Seulement avec ORDER BY dans la fenêtre", "Seulement avec QUALIFY"],
    bonne: 0,
    pourquoi: [
      "Oui. Snowflake l'accepte tant que la fenêtre n'a pas d'ORDER BY.",
      "Non.",
      "Non. C'est justement sans ORDER BY.",
      "Non."
    ],
    retenir: "Snowflake : COUNT(DISTINCT) OVER (PARTITION BY …) possible."
  },
  {
    id: "m08-q53", dialecte: "SQL Server",
    q: "Que donne UPDATE commande SET rang = ROW_NUMBER() OVER (ORDER BY date_cde); ?",
    choix: ["Les rangs sont mis à jour", "Erreur : fenêtre interdite dans SET. Passe par une CTE", "Tous les rangs valent 1", "Rien"],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. WITH x AS (SELECT rang, ROW_NUMBER() OVER (ORDER BY date_cde) AS rn FROM commande) UPDATE x SET rang = rn;",
      "Non.",
      "Non."
    ],
    retenir: "Écrire un résultat de fenêtre : CTE puis UPDATE de la CTE."
  },
  {
    id: "m08-q54", dialecte: "SQL Server",
    q: "Que donne SELECT SUM(ROW_NUMBER() OVER (ORDER BY id)) FROM t; ?",
    choix: ["La somme des numéros", "Erreur : fenêtre interdite dans un agrégat", "Le nombre de lignes", "NULL"],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Calcule la fenêtre dans une CTE, puis agrège au niveau du dessus.",
      "Non.",
      "Non."
    ],
    retenir: "Pas d'agrégat sur une fenêtre au même niveau : CTE."
  },
  {
    id: "m08-q55", dialecte: "Standard",
    q: "Tu veux le rang des clients selon leur évolution (CA - CA de l'an dernier, calculé avec LAG). Comment faire ?",
    choix: [
      "RANK() OVER (ORDER BY ca - LAG(ca) OVER (…))",
      "Calculer LAG dans une 1re CTE, puis RANK() sur la colonne obtenue dans une 2e étape",
      "C'est impossible",
      "Utiliser GROUP BY"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Fenêtre dans une fenêtre : interdit.",
      "Oui. Une fenêtre par étape.",
      "Non.",
      "Non."
    ],
    retenir: "Fenêtre sur un résultat de fenêtre : deux étapes."
  },
  {
    id: "m08-q56", dialecte: "Standard",
    q: "SELECT DISTINCT client_id, SUM(montant) OVER (PARTITION BY client_id) FROM commande. Est-ce une bonne idée ?",
    choix: [
      "Oui, c'est la meilleure méthode",
      "Le résultat est juste, mais GROUP BY client_id fait la même chose plus simplement et plus vite",
      "C'est une erreur",
      "Le résultat est faux"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. On calcule sur chaque ligne, puis on supprime les doublons : du travail en trop.",
      "Non.",
      "Non."
    ],
    retenir: "Une ligne par groupe = GROUP BY. Fenêtre = garder le détail."
  },
  {
    id: "m08-q57", dialecte: "SQL Server",
    q: "Jours de production : 1, 2, 3, 6, 7 octobre. Comment regrouper les jours CONSÉCUTIFS (îlots) ?",
    choixCode: true,
    choix: [
      "GROUP BY jour",
      "GROUP BY DATEADD(day, -ROW_NUMBER() OVER (ORDER BY jour), jour), calculé d'abord dans une CTE",
      "GROUP BY MONTH(jour)",
      "GROUP BY LAG(jour)"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Un groupe par jour.",
      "Oui. Jour - numéro de ligne reste constant tant que les jours se suivent. Ce « marqueur » identifie chaque îlot.",
      "Non.",
      "Non."
    ],
    retenir: "Îlots de dates consécutives : date - ROW_NUMBER = clé de groupe."
  },
  {
    id: "m08-q58", dialecte: "SQL Server",
    q: "Avec la clé d'îlot calculée (date - ROW_NUMBER), comment obtenir le début, la fin et la durée de chaque période d'arrêt machine ?",
    choixCode: true,
    choix: [
      "SELECT MIN(jour), MAX(jour), COUNT(*) FROM x GROUP BY cle_ilot",
      "SELECT jour FROM x ORDER BY cle_ilot",
      "SELECT DISTINCT cle_ilot",
      "SELECT SUM(jour)"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Un îlot = un groupe : début, fin, nombre de jours.",
      "Non.",
      "Non.",
      "Non."
    ],
    retenir: "Îlots : GROUP BY clé → MIN, MAX, COUNT."
  },
  {
    id: "m08-q59", dialecte: "Standard",
    q: "Une machine a un statut par heure (MARCHE / ARRET). Comment regrouper les heures consécutives de même statut ?",
    choixCode: true,
    choix: [
      "GROUP BY statut",
      "Clé = ROW_NUMBER() OVER (ORDER BY heure) - ROW_NUMBER() OVER (PARTITION BY statut ORDER BY heure), puis GROUP BY statut, clé",
      "GROUP BY heure",
      "DISTINCT statut"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Toutes les périodes ARRET seraient fusionnées.",
      "Oui. La différence des deux numérotations est constante dans une même séquence.",
      "Non.",
      "Non."
    ],
    retenir: "Îlots de valeurs : différence de deux ROW_NUMBER."
  },
  {
    id: "m08-q60", dialecte: "Snowflake",
    q: "Sur Snowflake, quelle fonction numérote les séquences, en augmentant chaque fois que le statut change ?",
    choixCode: true,
    choix: [
      "CONDITIONAL_CHANGE_EVENT(statut) OVER (ORDER BY heure)",
      "CHANGE_COUNT(statut)",
      "LAG(statut)",
      "DENSE_RANK(statut)"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Le compteur augmente à chaque changement de valeur : c'est directement la clé d'îlot.",
      "Non.",
      "Non. Donne la valeur précédente, pas un numéro de séquence.",
      "Non."
    ],
    retenir: "Snowflake : CONDITIONAL_CHANGE_EVENT pour les îlots."
  },
  {
    id: "m08-q61", dialecte: "Snowflake",
    q: "Sur Snowflake, comment numéroter des « sessions » (nouvelle session si plus de 30 min d'inactivité) ?",
    choixCode: true,
    choix: [
      "CONDITIONAL_TRUE_EVENT(DATEDIFF('minute', LAG(ts) OVER (ORDER BY ts), ts) > 30) OVER (ORDER BY ts)",
      "NTILE(30)",
      "ROW_NUMBER() / 30",
      "GROUP BY ts"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Le compteur augmente chaque fois que la condition est vraie. (La condition est souvent calculée dans une étape avant.)",
      "Non.",
      "Non.",
      "Non."
    ],
    retenir: "Snowflake : CONDITIONAL_TRUE_EVENT(condition) = compteur d'événements."
  },
  {
    id: "m08-q62", dialecte: "SQL Server",
    q: "Sur SQL Server, comment numéroter des sessions (pause > 30 min = nouvelle session) ?",
    choix: [
      "Un curseur",
      "1) drapeau = CASE WHEN DATEDIFF(minute, LAG(ts) OVER (ORDER BY ts), ts) > 30 THEN 1 ELSE 0 END ; 2) session = SUM(drapeau) OVER (ORDER BY ts ROWS UNBOUNDED PRECEDING)",
      "NTILE",
      "GROUP BY DATEPART(minute, ts)"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Lent et inutile.",
      "Oui. Le cumul des drapeaux « nouvelle session » donne un numéro de session.",
      "Non.",
      "Non."
    ],
    retenir: "Numéroter des événements : drapeau 0/1, puis SUM cumulatif."
  },
  {
    id: "m08-q63", dialecte: "Snowflake",
    q: "Un relevé de prix a des trous (NULL). Sur Snowflake, comment reprendre le dernier prix connu ?",
    choixCode: true,
    choix: [
      "LAG(prix) IGNORE NULLS OVER (PARTITION BY article ORDER BY jour)",
      "COALESCE(prix, 0)",
      "MAX(prix) OVER ()",
      "LEAD(prix)"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. IGNORE NULLS saute les NULL pour trouver la dernière vraie valeur. Combine avec COALESCE(prix, …).",
      "Non. Un prix à 0 est faux.",
      "Non.",
      "Non. Valeur suivante."
    ],
    retenir: "Prolonger la dernière valeur : IGNORE NULLS."
  },
  {
    id: "m08-q64", dialecte: "SQL Server",
    q: "Sur SQL Server 2022, comment reprendre la dernière valeur non NULL ?",
    choixCode: true,
    choix: [
      "LAST_VALUE(prix) IGNORE NULLS OVER (PARTITION BY article ORDER BY jour ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW)",
      "ISNULL(prix, LAG(prix))",
      "MAX(prix)",
      "C'est impossible"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Nouveauté de SQL Server 2022 : IGNORE NULLS sur FIRST_VALUE / LAST_VALUE.",
      "Non. LAG ne regarde qu'une ligne en arrière : deux NULL de suite et ça échoue.",
      "Non.",
      "Non."
    ],
    retenir: "SQL Server 2022 : LAST_VALUE … IGNORE NULLS."
  },
  {
    id: "m08-q65", dialecte: "SQL Server",
    q: "Avant SQL Server 2022, quelle astuce prolonge la dernière valeur connue ?",
    choix: [
      "Impossible",
      "grp = COUNT(prix) OVER (ORDER BY jour ROWS UNBOUNDED PRECEDING) ; puis MAX(prix) OVER (PARTITION BY grp)",
      "SUM(prix) OVER ()",
      "LAG(prix, 2)"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. COUNT(prix) n'augmente que sur les valeurs non NULL : les NULL restent dans le groupe de la dernière valeur.",
      "Non.",
      "Non."
    ],
    retenir: "Remplir vers le bas : COUNT cumulatif = groupe, puis MAX du groupe."
  },
  {
    id: "m08-q66", dialecte: "Standard",
    q: "Que mesure PERCENT_RANK() OVER (ORDER BY ca) ?",
    choix: [
      "La part du CA",
      "La position relative dans le classement, de 0 (premier) à 1 (dernier)",
      "Le nombre de lignes",
      "Le CA en %"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. (rang - 1) / (nombre de lignes - 1).",
      "Non.",
      "Non."
    ],
    retenir: "PERCENT_RANK = position relative entre 0 et 1."
  },
  {
    id: "m08-q67", dialecte: "Standard",
    q: "Que mesure CUME_DIST() OVER (ORDER BY ca) ?",
    choix: [
      "La proportion de lignes dont le CA est inférieur ou égal à celui de la ligne",
      "Le CA cumulé",
      "L'écart-type",
      "Le rang"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Ex. 0,8 = 80 % des clients font un CA inférieur ou égal.",
      "Non. Ce serait SUM OVER.",
      "Non.",
      "Non."
    ],
    retenir: "CUME_DIST = part des lignes ≤ la ligne courante."
  },
  {
    id: "m08-q68", dialecte: "SQL Server",
    q: "Sur SQL Server, comment afficher la médiane des commandes de chaque client sur chaque ligne ?",
    choixCode: true,
    choix: [
      "MEDIAN(montant) OVER (PARTITION BY client_id)",
      "PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY montant) OVER (PARTITION BY client_id)",
      "AVG(montant) OVER (PARTITION BY client_id)",
      "NTILE(2)"
    ],
    bonne: 1,
    pourquoi: [
      "Non. MEDIAN n'existe pas sur SQL Server.",
      "Oui. Fonction de distribution : WITHIN GROUP pour l'ordre, OVER pour le groupe.",
      "Non. Moyenne.",
      "Non."
    ],
    retenir: "Médiane SQL Server : PERCENTILE_CONT(0.5) … OVER."
  },
  {
    id: "m08-q69", dialecte: "Snowflake",
    q: "Sur Snowflake, comment afficher la médiane par client sur chaque ligne ?",
    choixCode: true,
    choix: [
      "MEDIAN(montant) OVER (PARTITION BY client_id)",
      "PERCENTILE(montant)",
      "AVG(montant)",
      "MID(montant)"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. MEDIAN existe comme agrégat et comme fenêtre.",
      "Non.",
      "Non.",
      "Non."
    ],
    retenir: "Snowflake : MEDIAN(x) OVER (…)."
  },
  {
    id: "m08-q70", dialecte: "Snowflake",
    q: "Sur Snowflake, que fait RATIO_TO_REPORT(ca) OVER (PARTITION BY region) ?",
    choix: [
      "Le rang du CA",
      "La part du CA de la ligne dans le total de sa région (entre 0 et 1)",
      "Le CA cumulé",
      "Un rapport PDF"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Raccourci de ca / SUM(ca) OVER (PARTITION BY region).",
      "Non.",
      "Non."
    ],
    retenir: "Snowflake : RATIO_TO_REPORT = part dans le total."
  },
  {
    id: "m08-q71", dialecte: "SQL Server",
    q: "Sur SQL Server 2022, à quoi sert la clause WINDOW ?",
    code: "SELECT client_id, montant,\n  SUM(montant) OVER w AS cumul,\n  AVG(montant) OVER w AS moy\nFROM commande\nWINDOW w AS (PARTITION BY client_id ORDER BY date_cde);",
    choix: [
      "À créer une vue",
      "À nommer une fenêtre une seule fois et la réutiliser dans plusieurs fonctions",
      "À filtrer les fenêtres",
      "Rien, c'est une erreur"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Moins de répétition, moins d'erreurs de copier-coller.",
      "Non. Ce serait QUALIFY (Snowflake).",
      "Non. Valide depuis SQL Server 2022."
    ],
    retenir: "WINDOW w AS (…) : fenêtre nommée, réutilisable."
  },
  {
    id: "m08-q72", dialecte: "SQL Server",
    q: "Quel index aide le plus ROW_NUMBER() OVER (PARTITION BY client_id ORDER BY date_cde) ?",
    choixCode: true,
    choix: [
      "Un index sur date_cde seul",
      "Un index sur (client_id, date_cde), avec INCLUDE des colonnes affichées",
      "Un index sur montant",
      "Aucun index ne peut aider"
    ],
    bonne: 1,
    pourquoi: [
      "Non. L'ordre doit d'abord être par client.",
      "Oui. Les lignes arrivent déjà dans l'ordre : pas de tri coûteux. On appelle ça un index « POC » (Partition, Order, Covering).",
      "Non.",
      "Non."
    ],
    retenir: "Fenêtre rapide : index (PARTITION BY, ORDER BY) INCLUDE (…)."
  },
  {
    id: "m08-q73", dialecte: "SQL Server",
    q: "Le plan d'une requête avec fenêtre montre un gros opérateur Sort. Pourquoi ?",
    choix: [
      "À cause du ORDER BY final seulement",
      "La fenêtre a besoin des lignes triées par PARTITION BY + ORDER BY ; sans index adapté, SQL Server trie",
      "C'est un bug",
      "Les fenêtres trient toujours tout deux fois"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Pas seulement.",
      "Oui. Un index sur ces colonnes supprime souvent ce tri.",
      "Non.",
      "Non."
    ],
    retenir: "Sort avant une fenêtre = index manquant sur (partition, ordre)."
  },
  {
    id: "m08-q74", dialecte: "SQL Server",
    q: "Sur SQL Server, pourquoi préciser ROWS plutôt que laisser RANGE (par défaut) pour un cumul ?",
    choix: [
      "Pour le style",
      "ROWS donne un cumul ligne à ligne (pas de regroupement des ex aequo) et il est généralement plus rapide",
      "RANGE est interdit",
      "ROWS trie le résultat"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. RANGE peut utiliser une table de travail sur disque ; ROWS travaille en mémoire.",
      "Non.",
      "Non."
    ],
    retenir: "Cumul : ROWS UNBOUNDED PRECEDING, explicitement."
  },
  {
    id: "m08-q75", dialecte: "Standard",
    q: "Que renvoie LEAD(statut, 2) OVER (ORDER BY date_evt) ?",
    choix: ["Le statut 2 lignes avant", "Le statut 2 lignes après", "Le 2e statut de la table", "Le statut multiplié par 2"],
    bonne: 1,
    pourquoi: [
      "Non. Ce serait LAG(statut, 2).",
      "Oui. Le 2e paramètre est le décalage.",
      "Non.",
      "Non."
    ],
    retenir: "LEAD(x, n) = n lignes plus loin."
  },
  {
    id: "m08-q76", dialecte: "Standard",
    q: "Avec LAG(montant) OVER (PARTITION BY client_id ORDER BY date_cde), que vaut LAG sur la 1re commande de CHAQUE client ?",
    choix: ["La dernière commande du client précédent", "NULL", "0", "Le montant lui-même"],
    bonne: 1,
    pourquoi: [
      "Non. La partition l'en empêche.",
      "Oui. LAG ne sort jamais de sa partition.",
      "Non. Sauf valeur par défaut.",
      "Non."
    ],
    retenir: "LAG / LEAD restent dans leur partition."
  },
  {
    id: "m08-q77", dialecte: "SQL Server",
    q: "Sur SQL Server, avec ROW_NUMBER() OVER (ORDER BY date_livraison), où sont numérotées les lignes sans date (NULL) ?",
    choix: ["À la fin", "Au début", "Elles sont exclues", "Au hasard"],
    bonne: 1,
    pourquoi: [
      "Non. Ce serait le cas sur Snowflake.",
      "Oui. NULL = plus petite valeur sur SQL Server. Gère-les : ORDER BY CASE WHEN d IS NULL THEN 1 ELSE 0 END, d.",
      "Non.",
      "Non."
    ],
    retenir: "Les NULL suivent la règle de tri du moteur, aussi dans OVER."
  },
  {
    id: "m08-q78", dialecte: "Standard",
    q: "Comment donner un numéro de groupe à chaque client (1 pour le 1er client, 2 pour le 2e…) sur toutes ses lignes ?",
    choixCode: true,
    choix: [
      "ROW_NUMBER() OVER (ORDER BY client_id)",
      "DENSE_RANK() OVER (ORDER BY client_id)",
      "RANK() OVER (PARTITION BY client_id)",
      "COUNT(*) OVER ()"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Un numéro différent par ligne.",
      "Oui. Toutes les lignes du même client ont le même numéro, sans trou.",
      "Non. Toujours 1.",
      "Non."
    ],
    retenir: "Numéro de groupe : DENSE_RANK() OVER (ORDER BY clé)."
  },
  {
    id: "m08-q79", dialecte: "Standard",
    q: "Une table client_import contient plusieurs versions du même client (date_maj différente). Comment garder la version la plus récente ?",
    choixCode: true,
    choix: [
      "SELECT DISTINCT * FROM client_import",
      "ROW_NUMBER() OVER (PARTITION BY code_client ORDER BY date_maj DESC) = 1 (via CTE ou QUALIFY)",
      "MAX(date_maj) seul",
      "GROUP BY code_client"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Les versions sont différentes : rien n'est supprimé.",
      "Oui. Dédoublonnage classique d'un flux d'import.",
      "Non. On perd les autres colonnes.",
      "Non. Les autres colonnes ne sont pas groupées."
    ],
    retenir: "Garder la dernière version : ROW_NUMBER … ORDER BY date DESC = 1."
  },
  {
    id: "m08-q80", dialecte: "Standard",
    q: "Comment afficher l'écart de chaque commande avec la moyenne de son client ?",
    choixCode: true,
    choix: [
      "montant - AVG(montant) OVER (PARTITION BY client_id)",
      "montant - AVG(montant)",
      "AVG(montant - montant)",
      "montant - LAG(montant)"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Positif = au-dessus de sa moyenne habituelle.",
      "Non. Erreur sans GROUP BY.",
      "Non.",
      "Non. Écart avec la précédente."
    ],
    retenir: "Écart à la moyenne du groupe : x - AVG(x) OVER (PARTITION BY …)."
  },
  {
    id: "m08-q81", dialecte: "Standard",
    q: "Comment classer les commerciaux par CA DANS chaque mois ?",
    choixCode: true,
    choix: [
      "RANK() OVER (ORDER BY ca DESC)",
      "RANK() OVER (PARTITION BY mois ORDER BY ca DESC)",
      "RANK() OVER (PARTITION BY commercial ORDER BY mois)",
      "NTILE(12)"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Classement global, tous mois mélangés.",
      "Oui. Un classement qui repart à 1 chaque mois.",
      "Non. Ça classe les mois de chaque commercial.",
      "Non."
    ],
    retenir: "« Par … » = PARTITION BY. « Selon … » = ORDER BY."
  },
  {
    id: "m08-q82", dialecte: "Standard",
    q: "Tu veux le meilleur vendeur de chaque mois, en gardant les ex aequo. Quel filtre ?",
    choix: ["ROW_NUMBER() = 1", "RANK() = 1", "NTILE(1) = 1", "LAG() IS NULL"],
    bonne: 1,
    pourquoi: [
      "Non. Un seul vendeur, même en cas d'égalité.",
      "Oui. Tous les vendeurs à égalité au 1er rang.",
      "Non. Tout le monde.",
      "Non."
    ],
    retenir: "Avec ex aequo : RANK = 1. Sans : ROW_NUMBER = 1."
  },
  {
    id: "m08-q83", dialecte: "Standard",
    q: "Comment afficher en même temps la part d'un article dans sa famille ET dans le total ?",
    choixCode: true,
    choix: [
      "ca / SUM(ca) OVER (PARTITION BY famille) AS part_famille, ca / SUM(ca) OVER () AS part_totale",
      "Deux requêtes séparées",
      "ca / SUM(ca) GROUP BY famille",
      "Impossible"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Plusieurs fenêtres différentes dans le même SELECT, aucun problème.",
      "Non. Possible, mais inutile.",
      "Non.",
      "Non."
    ],
    retenir: "Plusieurs fenêtres différentes dans un même SELECT : permis."
  },
  {
    id: "m08-q84", dialecte: "Standard",
    q: "COUNT(*) OVER (ORDER BY date_cde ROWS UNBOUNDED PRECEDING) donne le même résultat que…",
    choix: ["COUNT(*)", "ROW_NUMBER() OVER (ORDER BY date_cde)", "RANK()", "NTILE"],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Un compteur qui augmente de 1 à chaque ligne.",
      "Non. RANK gère les ex aequo autrement.",
      "Non."
    ],
    retenir: "Comptage cumulatif ligne à ligne = ROW_NUMBER."
  },
  {
    id: "m08-q85", dialecte: "Standard",
    q: "Comment afficher, mois par mois, le nombre CUMULÉ de clients différents depuis le début ?",
    choix: [
      "COUNT(DISTINCT client_id) OVER (ORDER BY mois)",
      "Marquer la 1re commande de chaque client (ROW_NUMBER par client = 1), puis faire la somme cumulée de ces marques par mois",
      "COUNT(*) OVER (ORDER BY mois)",
      "DENSE_RANK()"
    ],
    bonne: 1,
    pourquoi: [
      "Non. DISTINCT avec ORDER BY dans OVER n'est pas permis.",
      "Oui. Chaque client est compté une fois, le mois de son arrivée.",
      "Non. Compte les commandes.",
      "Non."
    ],
    retenir: "Cumul de distincts : compter les « premières fois », puis cumuler."
  },
  {
    id: "m08-q86", dialecte: "Standard",
    q: "Sur SQL Server, peut-on écrire STRING_AGG(code, ',') OVER (PARTITION BY cde_id) ?",
    choix: ["Oui", "Non : STRING_AGG n'est pas une fonction de fenêtrage sur SQL Server", "Oui avec ORDER BY", "Seulement en 2022"],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Fais un GROUP BY dans une sous-requête puis une jointure. (Snowflake, lui, accepte LISTAGG … OVER.)",
      "Non.",
      "Non."
    ],
    retenir: "Concaténer par fenêtre : LISTAGG OVER (Snowflake) ; GROUP BY + jointure (SQL Server)."
  },
  {
    id: "m08-q87", dialecte: "Standard",
    q: "Comment détecter les trous de plus d'une heure dans la réception des messages EDI ?",
    choixCode: true,
    choix: [
      "Calculer DATEDIFF(minute, LAG(recu_le) OVER (ORDER BY recu_le), recu_le), puis garder > 60",
      "COUNT(*) par heure",
      "MAX(recu_le) - MIN(recu_le)",
      "GROUP BY recu_le"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Écart avec le message précédent : au-delà de 60 min, alerte.",
      "Non. Une heure sans message n'aurait pas de ligne : invisible.",
      "Non. Durée totale seulement.",
      "Non."
    ],
    retenir: "Surveiller un flux : écart avec LAG."
  },
  {
    id: "m08-q88", dialecte: "Standard",
    q: "Comment calculer, pour chaque article, l'évolution de prix entre le premier et le dernier relevé de l'année ?",
    choixCode: true,
    choix: [
      "LAST_VALUE(prix) OVER (PARTITION BY article ORDER BY jour ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING) - FIRST_VALUE(prix) OVER (PARTITION BY article ORDER BY jour)",
      "MAX(prix) - MIN(prix)",
      "LAG(prix) - prix",
      "SUM(prix)"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Dernier relevé (cadre complet !) moins premier relevé.",
      "Non. Plus haut moins plus bas : pas forcément le début et la fin.",
      "Non. Écart avec la veille.",
      "Non."
    ],
    retenir: "Début / fin de période : FIRST_VALUE et LAST_VALUE (cadre complet)."
  },
  {
    id: "m08-q89", dialecte: "Standard",
    q: "Dans une requête GROUP BY annee, mois, comment afficher la part de chaque mois dans son année ?",
    choixCode: true,
    choix: [
      "SUM(ca) * 100.0 / SUM(SUM(ca)) OVER (PARTITION BY annee)",
      "SUM(ca) * 100.0 / SUM(ca)",
      "ca / annee",
      "SUM(ca) OVER (PARTITION BY mois)"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Le SUM intérieur = CA du mois ; la fenêtre = total de l'année.",
      "Non. Toujours 100 %.",
      "Non.",
      "Non."
    ],
    retenir: "Part dans le groupe supérieur : SUM(SUM(x)) OVER (PARTITION BY niveau_supérieur)."
  },
  {
    id: "m08-q90", dialecte: "Standard",
    q: "Comment calculer le CA glissant sur 12 mois (à partir d'une table complète de CA mensuel) ?",
    choixCode: true,
    choix: [
      "SUM(ca) OVER (ORDER BY mois ROWS BETWEEN 11 PRECEDING AND CURRENT ROW)",
      "SUM(ca) OVER (ORDER BY mois ROWS BETWEEN 12 PRECEDING AND CURRENT ROW)",
      "SUM(ca) OVER (PARTITION BY annee)",
      "SUM(ca) OVER ()"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. 11 mois avant + le mois en cours = 12 mois.",
      "Non. 13 mois.",
      "Non. CA de l'année civile.",
      "Non."
    ],
    retenir: "Glissant sur n périodes : n-1 PRECEDING."
  },
  {
    id: "m08-q91", dialecte: "Standard",
    q: "Échéancier d'un client : comment afficher le « reste à payer » après chaque échéance ?",
    choixCode: true,
    choix: [
      "SUM(montant) OVER (PARTITION BY client ORDER BY echeance ROWS BETWEEN 1 FOLLOWING AND UNBOUNDED FOLLOWING)",
      "SUM(montant) OVER ()",
      "LAG(montant)",
      "MAX(montant)"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. La somme des échéances SUIVANTES. NULL après la dernière : COALESCE(…, 0).",
      "Non.",
      "Non.",
      "Non."
    ],
    retenir: "Cumul « restant » : cadre tourné vers FOLLOWING."
  },
  {
    id: "m08-q92", dialecte: "Standard",
    q: "Comment voir si un client a gagné ou perdu des places dans le classement d'un mois à l'autre ?",
    choix: [
      "RANK() deux fois dans la même expression",
      "Calculer le rang par mois (RANK … PARTITION BY mois), puis LAG(rang) OVER (PARTITION BY client ORDER BY mois) à l'étape suivante",
      "NTILE",
      "COUNT(*)"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Deux étapes : le rang, puis la comparaison avec le rang précédent.",
      "Non.",
      "Non."
    ],
    retenir: "Évolution d'un rang : RANK, puis LAG du rang."
  },
  {
    id: "m08-q93", dialecte: "Standard",
    q: "Une vue calcule ROW_NUMBER() OVER (ORDER BY date_cde) AS rn. Tu filtres la vue avec WHERE client_id = 42. Les rn sont-ils 1, 2, 3… ?",
    choix: [
      "Oui",
      "Non : la numérotation a été faite sur TOUTES les commandes, avant ton filtre. Les rn du client 42 ont des trous",
      "Erreur",
      "Ça dépend de l'index"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Filtrer avant ou après une fenêtre change le résultat. Ajoute PARTITION BY client_id si tu veux une numérotation par client.",
      "Non.",
      "Non."
    ],
    retenir: "Filtre avant ou après une fenêtre : résultats différents."
  },
  {
    id: "m08-q94", dialecte: "Standard",
    q: "Comment repérer les clients qui n'ont passé qu'UNE seule commande, en gardant le détail de cette commande ?",
    choixCode: true,
    choix: [
      "COUNT(*) OVER (PARTITION BY client_id) AS nb dans une CTE, puis WHERE nb = 1",
      "ROW_NUMBER() = 1",
      "RANK() = 1",
      "GROUP BY client_id"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. On connaît la taille du groupe sur chaque ligne.",
      "Non. La 1re commande de TOUS les clients.",
      "Non.",
      "Non. On perd le détail."
    ],
    retenir: "Filtrer selon la taille du groupe : COUNT(*) OVER (PARTITION BY)."
  },
  {
    id: "m08-q95", dialecte: "Standard",
    q: "NTILE(10) découpe 1 000 clients en 10 groupes de 100. Le groupe 1 représente-t-il 10 % du CA ?",
    choix: [
      "Oui",
      "Non : NTILE découpe en NOMBRE de clients, pas en CA. Le 1er décile peut faire 60 % du CA",
      "Oui, si on trie par CA",
      "Erreur"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Pour des tranches de CA, utilise le % cumulé (analyse ABC).",
      "Non. Même trié, chaque groupe a 100 clients, pas 10 % du CA.",
      "Non."
    ],
    retenir: "NTILE = parts égales en lignes. % cumulé = parts en valeur."
  },
  {
    id: "m08-q96", dialecte: "Standard",
    q: "Comment afficher « Hausse », « Baisse » ou « Stable » par rapport au mois précédent ?",
    choixCode: true,
    choix: [
      "CASE WHEN ca > LAG(ca) OVER (ORDER BY mois) THEN 'Hausse' WHEN ca < LAG(ca) OVER (ORDER BY mois) THEN 'Baisse' ELSE 'Stable' END",
      "IF ca > LAG(ca)",
      "SIGN(ca)",
      "RANK(ca)"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Attention : le 1er mois (LAG NULL) tombe dans « Stable ». Ajoute un cas WHEN LAG(…) IS NULL.",
      "Non.",
      "Non.",
      "Non."
    ],
    retenir: "CASE + LAG pour qualifier une évolution. Pense au 1er cas (NULL)."
  },
  {
    id: "m08-q97", dialecte: "Standard",
    q: "Une requête utilise 5 fenêtres avec 5 PARTITION BY / ORDER BY différents. Quel impact ?",
    choix: [
      "Aucun",
      "Chaque ordre différent peut demander un tri : plus de travail. Regroupe les fenêtres qui partagent le même OVER",
      "Erreur au-delà de 3",
      "Elles sont fusionnées en une"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Les fenêtres identiques sont calculées ensemble ; les différentes multiplient les tris.",
      "Non.",
      "Non."
    ],
    retenir: "Mêmes OVER = un seul tri. OVER différents = plusieurs tris."
  },
  {
    id: "m08-q98", dialecte: "Snowflake",
    q: "Sur Snowflake, une requête avec fenêtre sur 2 milliards de lignes « déborde sur disque » (spilling) dans le Query Profile. Que faire ?",
    choix: [
      "Créer un index",
      "Réduire les données avant la fenêtre (filtre, colonnes utiles) ou prendre un warehouse plus grand",
      "Ajouter NOLOCK",
      "Rien"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Pas d'index sur Snowflake.",
      "Oui. La mémoire ne suffit pas : moins de données, ou plus de mémoire.",
      "Non.",
      "Non. Le débordement ralentit fortement."
    ],
    retenir: "Spilling = mémoire insuffisante : filtrer tôt ou warehouse plus grand."
  },
  {
    id: "m08-q99", dialecte: "Standard",
    q: "SUM(montant) OVER (ORDER BY date_cde ROWS UNBOUNDED PRECEDING) : plusieurs commandes ont la même date. Le cumul est-il reproductible ?",
    choix: [
      "Oui",
      "Le total final oui, mais les cumuls intermédiaires entre ex aequo peuvent changer d'une exécution à l'autre. Ajoute un départage (id)",
      "Non, le total change",
      "Erreur"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Pas ligne par ligne.",
      "Oui. ORDER BY date_cde, id : ordre unique, cumul stable.",
      "Non.",
      "Non."
    ],
    retenir: "Cumul stable = ORDER BY unique dans OVER."
  },
  {
    id: "m08-q100", dialecte: "Standard",
    q: "Quand choisir une fonction de fenêtrage plutôt que GROUP BY ?",
    choix: [
      "Toujours",
      "Quand tu as besoin du détail ET d'une information de groupe (total, rang, précédent, cumul) sur la même ligne",
      "Jamais",
      "Seulement sur Snowflake"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Pour une ligne par groupe, GROUP BY est plus simple.",
      "Oui. Résumé = GROUP BY. Détail + contexte = fenêtre.",
      "Non.",
      "Non."
    ],
    retenir: "Résumé : GROUP BY. Détail + contexte : OVER."
  }
];
