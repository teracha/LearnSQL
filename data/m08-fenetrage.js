LEARNSQL.questions.m08 = [
  {
    id: "m08-q01", dialecte: "Standard",
    q: "Quelle est la grande différence entre SUM(montant) avec GROUP BY et SUM(montant) OVER (…) ?",
    choix: [
      "Aucune, c'est la même chose écrite autrement",
      "GROUP BY fusionne les lignes, OVER les garde",
      "OVER est toujours plus lent que GROUP BY",
      "GROUP BY garde les lignes, OVER les fusionne"
    ],
    bonne: 1,
    pourquoi: [
      "Non. GROUP BY donne une ligne par groupe ; OVER garde toutes les lignes.",
      "Oui. Avec OVER, on a le détail ET le total sur la même ligne.",
      "Non. Pas toujours : ça dépend des données et des index.",
      "Non. C'est l'inverse."
    ],
    retenir: "GROUP BY réduit. OVER garde les lignes."
  },
  {
    id: "m08-q02", dialecte: "Standard",
    q: "Que contient la colonne total ?",
    code: "SELECT num_cde, montant,\n       SUM(montant) OVER () AS total\nFROM commande;",
    choix: [
      "Le montant de la commande de la ligne",
      "Le total général, sur chaque ligne",
      "Le cumul des montants jusqu'à la ligne",
      "NULL, car la fenêtre OVER () est vide"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Ce serait la colonne montant elle-même.",
      "Oui. Le total de toutes les commandes, répété sur chaque ligne. OVER () = la fenêtre est tout le résultat (après WHERE).",
      "Non. Pas de ORDER BY : pas de cumul.",
      "Non. OVER () = tout le résultat."
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
      "Non. Diviser par le nombre de lignes ne donne pas une part du total.",
      "Non. Cette fonction n'existe pas."
    ],
    retenir: "Part du total : x * 100.0 / SUM(x) OVER ()."
  },
  {
    id: "m08-q04", dialecte: "Standard",
    q: "Que fait PARTITION BY client_id dans SUM(montant) OVER (PARTITION BY client_id) ?",
    choix: [
      "Il trie les lignes par client_id",
      "Une somme par client, sur chacune de ses lignes",
      "Il supprime les doublons de client_id",
      "Il fusionne les lignes de chaque client"
    ],
    bonne: 1,
    pourquoi: [
      "Non. PARTITION BY ne trie pas.",
      "Oui. Comme un GROUP BY, mais les lignes restent.",
      "Non. Toutes les lignes restent, doublons compris.",
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
      "Non. Diviser par un identifiant n'a aucun sens."
    ],
    retenir: "Part dans le groupe : PARTITION BY groupe."
  },
  {
    id: "m08-q06", dialecte: "Standard",
    q: "Que change l'ajout de ORDER BY date_cde dans SUM(montant) OVER (ORDER BY date_cde) ?",
    choix: [
      "Rien, l'ordre n'a pas d'effet sur SUM",
      "La somme devient un cumul",
      "Le résultat affiché est trié par date",
      "Erreur : ORDER BY interdit dans OVER"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Avec ORDER BY, SUM devient un cumul.",
      "Oui. Chaque ligne additionne les lignes jusqu'à elle : avec ORDER BY, la fenêtre va « du début jusqu'à la ligne courante ».",
      "Non. L'ORDER BY de la fenêtre ne trie pas l'affichage.",
      "Non. ORDER BY est permis dans OVER."
    ],
    retenir: "ORDER BY dans OVER = calcul cumulatif."
  },
  {
    id: "m08-q07", dialecte: "Standard",
    q: "Le ORDER BY à l'intérieur d'un OVER trie-t-il le résultat affiché ?",
    choix: [
      "Oui, il trie aussi le résultat",
      "Non : il faut un ORDER BY final",
      "Seulement quand on utilise ROW_NUMBER",
      "Oui, mais seulement sur Snowflake"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Il sert seulement au calcul de la fenêtre.",
      "Oui. Il sert seulement au calcul de la fenêtre. Le résultat est souvent trié par hasard, mais rien ne le garantit : ajoute un ORDER BY à la fin de la requête.",
      "Non. La règle est la même pour toutes les fonctions.",
      "Non. Même règle sur Snowflake."
    ],
    retenir: "ORDER BY de la fenêtre ≠ ORDER BY du résultat."
  },
  {
    id: "m08-q08", dialecte: "Standard",
    q: "Comment calculer un CA cumulé qui repart à zéro chaque année ?",
    choixCode: true,
    choix: [
      "SUM(ca) OVER (ORDER BY annee, mois ROWS UNBOUNDED PRECEDING)",
      "SUM(ca) OVER (PARTITION BY annee ORDER BY mois ROWS UNBOUNDED PRECEDING)",
      "SUM(ca) OVER (PARTITION BY annee, mois ORDER BY mois ROWS UNBOUNDED PRECEDING)",
      "SUM(ca) OVER (PARTITION BY mois ORDER BY annee ROWS UNBOUNDED PRECEDING)"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Le cumul continue d'une année à l'autre.",
      "Oui. Un cumul par année, dans l'ordre des mois.",
      "Non. Une partition par mois : le « cumul » ne contient que le mois lui-même.",
      "Non. Cumule le même mois d'année en année."
    ],
    retenir: "Cumul qui repart à zéro : PARTITION BY + ORDER BY."
  },
  {
    id: "m08-q09", dialecte: "Standard",
    q: "Valeurs de CA triées : 500, 300, 300, 100. Que donne ROW_NUMBER() OVER (ORDER BY ca DESC) ?",
    choix: [
      "1, 2, 2, 4",
      "1, 2, 3, 4",
      "1, 2, 2, 3",
      "4, 3, 2, 1"
    ],
    bonne: 1,
    pourquoi: [
      "Non. C'est RANK.",
      "Oui. Un numéro unique par ligne, même pour les ex aequo (ordre entre eux arbitraire).",
      "Non. C'est DENSE_RANK.",
      "Non. On trie par CA décroissant : le plus gros a le numéro 1."
    ],
    retenir: "ROW_NUMBER : toujours unique."
  },
  {
    id: "m08-q10", dialecte: "Standard",
    q: "Valeurs de CA triées : 500, 300, 300, 100. Que donne RANK() OVER (ORDER BY ca DESC) ?",
    choix: [
      "1, 2, 3, 4",
      "1, 2, 2, 4",
      "1, 2, 2, 3",
      "1, 1, 2, 3"
    ],
    bonne: 1,
    pourquoi: [
      "Non. C'est ROW_NUMBER.",
      "Oui. Ex aequo au même rang, puis un trou (pas de 3).",
      "Non. C'est DENSE_RANK.",
      "Non. 500 et 300 sont différents : ils n'ont pas le même rang."
    ],
    retenir: "RANK : ex aequo, puis trou."
  },
  {
    id: "m08-q11", dialecte: "Standard",
    q: "Valeurs de CA triées : 500, 300, 300, 100. Que donne DENSE_RANK() OVER (ORDER BY ca DESC) ?",
    choix: [
      "1, 2, 3, 4",
      "1, 2, 2, 4",
      "1, 2, 2, 3",
      "1, 1, 1, 2"
    ],
    bonne: 2,
    pourquoi: [
      "Non. C'est ROW_NUMBER.",
      "Non. C'est RANK.",
      "Oui. Ex aequo au même rang, sans trou.",
      "Non. 500 et 300 sont différents : ils n'ont pas le même rang."
    ],
    retenir: "DENSE_RANK : ex aequo, sans trou."
  },
  {
    id: "m08-q12", dialecte: "Standard",
    q: "Tu veux les commerciaux classés dans les 3 premiers montants DIFFÉRENTS (ex aequo compris). Quelle fonction ?",
    choix: [
      "ROW_NUMBER() <= 3",
      "RANK() <= 3",
      "DENSE_RANK() <= 3",
      "NTILE(3)"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Exactement 3 lignes : des ex aequo seraient coupés.",
      "Non. Après des ex aequo, le rang 3 peut manquer.",
      "Oui. Les 3 premières valeurs distinctes, avec tous les ex aequo.",
      "Non. NTILE découpe en 3 groupes de même taille, il ne classe pas."
    ],
    retenir: "Top 3 des valeurs : DENSE_RANK."
  },
  {
    id: "m08-q13", dialecte: "Standard",
    q: "ROW_NUMBER() OVER (ORDER BY date_cde) : deux commandes ont la même date. Leur numéro est-il stable d'une exécution à l'autre ?",
    choix: [
      "Oui, toujours le même numéro partout",
      "Non : ajoute un départage (id)",
      "Oui, si la table a un index sur la date",
      "Erreur : la date doit être unique"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Entre ex aequo, l'ordre est arbitraire.",
      "Oui. Entre ex aequo, l'ordre est arbitraire. ORDER BY date_cde, id : numéros stables et reproductibles.",
      "Non. Toujours pas garanti.",
      "Non. Les dates en double sont permises."
    ],
    retenir: "ROW_NUMBER stable = ORDER BY unique (ajoute l'id)."
  },
  {
    id: "m08-q14", dialecte: "Standard",
    q: "10 clients. Que donne NTILE(4) OVER (ORDER BY ca DESC) en tailles de groupes ?",
    choix: [
      "4, 4, 2",
      "3, 3, 2, 2",
      "2, 2, 3, 3",
      "2, 2, 2, 4"
    ],
    bonne: 1,
    pourquoi: [
      "Non. 4 groupes sont demandés.",
      "Oui. 10 / 4 = 2 reste 2 : les 2 premiers groupes ont une ligne de plus.",
      "Non. Les plus gros groupes viennent en premier.",
      "Non. Les lignes en plus vont aux premiers groupes."
    ],
    retenir: "NTILE(n) : n groupes presque égaux, les premiers un peu plus gros."
  },
  {
    id: "m08-q15", dialecte: "Standard",
    q: "À quoi sert NTILE(4) OVER (ORDER BY ca DESC) dans une analyse clients ?",
    choix: [
      "À compter les clients par tranche",
      "À découper en quartiles",
      "À trouver les clients en double",
      "À calculer le CA moyen par client"
    ],
    bonne: 1,
    pourquoi: [
      "Non. NTILE donne un numéro de groupe, pas un comptage.",
      "Oui. Les 25 % les plus gros = groupe 1, etc. Segmentation rapide en tranches de taille égale (en nombre de clients).",
      "Non. NTILE ne cherche pas les doublons.",
      "Non. NTILE ne calcule pas de moyenne."
    ],
    retenir: "NTILE = découpage en tranches égales en nombre de lignes."
  },
  {
    id: "m08-q16", dialecte: "Standard",
    q: "Que renvoie LAG(ca) OVER (ORDER BY mois) ?",
    choix: [
      "Le CA du mois suivant",
      "Le CA du mois précédent",
      "Le CA cumulé",
      "Le CA moyen"
    ],
    bonne: 1,
    pourquoi: [
      "Non. C'est LEAD.",
      "Oui. LAG = la valeur de la ligne d'avant.",
      "Non. Ce serait SUM(ca) OVER (ORDER BY mois).",
      "Non. Ce serait AVG(ca) OVER (…)."
    ],
    retenir: "LAG = avant. LEAD = après."
  },
  {
    id: "m08-q17", dialecte: "Standard",
    q: "Que vaut LAG(ca) sur la toute première ligne ?",
    choix: [
      "0",
      "NULL",
      "Le CA de la dernière ligne",
      "Une erreur"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Sauf si on le demande.",
      "Oui. Pas de ligne avant. LAG(ca, 1, 0) donne 0 par défaut.",
      "Non. LAG ne revient pas au début : il donne NULL.",
      "Non. LAG renvoie NULL, sans erreur."
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
      "Non. Le 0 est la valeur par défaut, pas un multiplicateur.",
      "Non. Ces 3 paramètres sont valides."
    ],
    retenir: "LAG(x, n, défaut)."
  },
  {
    id: "m08-q19", dialecte: "Standard",
    q: "Comment calculer l'évolution en % du CA par rapport au mois précédent ?",
    choixCode: true,
    choix: [
      "(ca - LAG(ca) OVER (ORDER BY mois)) * 100.0 / NULLIF(LAG(ca) OVER (ORDER BY mois), 0)",
      "(LAG(ca) OVER (ORDER BY mois) - ca) * 100.0 / NULLIF(LAG(ca) OVER (ORDER BY mois), 0)",
      "(ca - LAG(ca) OVER (ORDER BY mois)) * 100.0 / NULLIF(ca, 0)",
      "(ca - LAG(ca) OVER (ORDER BY mois)) * 100 / LAG(ca) OVER (ORDER BY mois)"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Écart / valeur précédente. NULLIF évite la division par zéro, 100.0 la division entière.",
      "Non. Écart à l'envers : une hausse apparaît en négatif.",
      "Non. On divise par le mois courant, pas par le mois précédent.",
      "Non. Pas de protection contre la division par zéro, et risque de division entière."
    ],
    retenir: "Évolution % = (x - LAG(x)) * 100.0 / NULLIF(LAG(x), 0)."
  },
  {
    id: "m08-q20", dialecte: "Standard",
    q: "Tu compares chaque mois au même mois de l'année précédente avec LAG(ca, 12). Quelle condition doit être vraie ?",
    choix: [
      "Aucune, LAG sait compter les mois",
      "Aucun mois ne doit manquer",
      "Il faut au moins 12 clients",
      "Il faut un index sur la colonne mois"
    ],
    bonne: 1,
    pourquoi: [
      "Non. LAG compte des lignes, pas des mois.",
      "Oui. LAG compte des LIGNES, pas des mois. Un mois sans vente décale tout : LAG(…, 12) remonte trop loin. Pars d'un calendrier complet (LEFT JOIN).",
      "Non. Le nombre de clients ne joue pas.",
      "Non. Un index ne change pas le résultat."
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
      "Non. Ça groupe par date, pas par client.",
      "Non. Ça donne le client précédent, pas sa commande."
    ],
    retenir: "LAG par entité : PARTITION BY entité."
  },
  {
    id: "m08-q22", dialecte: "SQL Server",
    q: "Comment calculer le nombre de jours entre une commande et la commande précédente du même client ?",
    choixCode: true,
    choix: [
      "DATEDIFF(day, LAG(date_cde) OVER (PARTITION BY client_id ORDER BY date_cde), date_cde)",
      "DATEDIFF(day, date_cde, LAG(date_cde) OVER (PARTITION BY client_id ORDER BY date_cde))",
      "DATEDIFF(day, LAG(date_cde) OVER (ORDER BY date_cde), date_cde)",
      "DATEDIFF(day, LEAD(date_cde) OVER (PARTITION BY client_id ORDER BY date_cde), date_cde)"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. NULL pour la 1re commande de chaque client.",
      "Non. Ordre des dates inversé : les délais sont négatifs.",
      "Non. Sans PARTITION BY : on compare à la commande précédente de N'IMPORTE QUEL client.",
      "Non. LEAD prend la commande SUIVANTE : délais négatifs, décalés."
    ],
    retenir: "Délai entre événements : DATEDIFF(LAG(date), date)."
  },
  {
    id: "m08-q23", dialecte: "Standard",
    q: "Comment repérer la DERNIÈRE commande de chaque client avec LEAD ?",
    choix: [
      "LEAD(date_cde) OVER (PARTITION BY client_id ORDER BY date_cde) = date_cde",
      "LEAD(date_cde) OVER (PARTITION BY client_id ORDER BY date_cde) IS NULL",
      "LAG(date_cde) OVER (PARTITION BY client_id ORDER BY date_cde) IS NULL",
      "LEAD(date_cde) OVER (ORDER BY date_cde) IS NULL"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Ça repère deux commandes le même jour, pas la dernière.",
      "Oui. Pas de commande suivante = c'est la dernière.",
      "Non. LAG IS NULL = la PREMIÈRE commande.",
      "Non. Sans PARTITION BY : seule la dernière commande de toute la table."
    ],
    retenir: "LEAD(…) IS NULL = dernière ligne de la partition."
  },
  {
    id: "m08-q24", dialecte: "Standard",
    q: "Que donne FIRST_VALUE(date_cde) OVER (PARTITION BY client_id ORDER BY date_cde) ?",
    choix: [
      "La date de la dernière commande du client",
      "La date de 1re commande",
      "La date de la ligne elle-même",
      "NULL pour toutes les lignes sauf une"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Trié par date croissante, la première est la plus ancienne.",
      "Oui. La date de 1re commande du client, sur chaque ligne : la première valeur de la fenêtre, dans l'ordre demandé.",
      "Non. FIRST_VALUE renvoie la première de la fenêtre.",
      "Non. La valeur est répétée sur toutes les lignes du client."
    ],
    retenir: "FIRST_VALUE = 1re valeur de la fenêtre."
  },
  {
    id: "m08-q25", dialecte: "SQL Server",
    q: "LAST_VALUE(date_cde) OVER (PARTITION BY client_id ORDER BY date_cde) renvoie la date de la ligne elle-même. Pourquoi ?",
    choix: [
      "LAST_VALUE ignore le PARTITION BY",
      "Le cadre s'arrête à la ligne courante",
      "Il manque DESC dans le ORDER BY",
      "LAST_VALUE n'existe pas sur SQL Server"
    ],
    bonne: 1,
    pourquoi: [
      "Non. La partition est respectée ; c'est le cadre qui s'arrête à la ligne courante.",
      "Oui. Le cadre par défaut va du début jusqu'à la ligne courante : la « dernière » de la fenêtre, c'est elle. Précise : ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING. Ou FIRST_VALUE avec ORDER BY … DESC.",
      "Non. Ce serait une autre solution, mais pas l'explication.",
      "Non. LAST_VALUE existe sur SQL Server."
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
      "Non. Ce cadre ne prend que la ligne d'avant.",
      "Non. Avec ORDER BY, le cadre s'arrête à la ligne courante."
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
      "Non. Les montants ne sont pas NULL : le cumul non plus.",
      "Non. Les dates en double sont permises."
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
      "Non. Cette écriture n'est pas valide."
    ],
    retenir: "Moyenne mobile sur n : ROWS BETWEEN n-1 PRECEDING AND CURRENT ROW."
  },
  {
    id: "m08-q29", dialecte: "Standard",
    q: "Moyenne mobile 7 jours avec ROWS BETWEEN 6 PRECEDING AND CURRENT ROW. Certains jours n'ont aucune vente (pas de ligne). Problème ?",
    choix: [
      "Aucun, la moyenne reste juste",
      "7 lignes ne font pas forcément 7 jours",
      "Erreur : la fenêtre a des trous",
      "Les jours vides comptent pour 0 automatiquement"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Sans les jours vides, la fenêtre couvre plus de 7 jours.",
      "Oui. La fenêtre prend 7 LIGNES : sans les jours vides, elle couvre plus de 7 jours. Pars d'un calendrier complet : LEFT JOIN + COALESCE(ca, 0), puis la fenêtre.",
      "Non. Aucune erreur.",
      "Non. Une ligne absente n'est pas un 0."
    ],
    retenir: "ROWS compte des lignes, pas des jours."
  },
  {
    id: "m08-q30", dialecte: "SQL Server",
    q: "Sur SQL Server, RANGE BETWEEN 7 PRECEDING AND CURRENT ROW est-il accepté ?",
    choix: [
      "Oui, comme sur Snowflake",
      "Non : RANGE limité à UNBOUNDED",
      "Oui, mais seulement avec des dates",
      "Seulement avec un PARTITION BY"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Snowflake l'accepte, SQL Server non.",
      "Oui. Avec RANGE, SQL Server accepte seulement UNBOUNDED et CURRENT ROW. Pour un décalage en nombre, utilise ROWS (et un calendrier complet).",
      "Non. Même avec des dates, SQL Server refuse.",
      "Non. PARTITION BY ne change rien à cette règle."
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
      "Non. Le mois en cours et les 2 suivants : pas centré."
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
      "Non. Ce sont les lignes d'après, pas celles d'avant.",
      "Non. Seulement la ligne d'avant et la courante."
    ],
    retenir: "« Avant moi » : … AND 1 PRECEDING."
  },
  {
    id: "m08-q33", dialecte: "Standard",
    q: "Que donne MAX(ca) OVER (ORDER BY mois ROWS UNBOUNDED PRECEDING) ?",
    choix: [
      "Le CA maximum de toute la période, partout",
      "Le record de CA atteint jusqu'au mois",
      "Le CA du mois, sans changement",
      "Une erreur : MAX refuse ORDER BY"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Ce serait OVER ().",
      "Oui. Le plus haut historique à date : un maximum « courant ». Utile pour repérer les nouveaux records (ca = record).",
      "Non. Le MAX regarde tous les mois jusque-là.",
      "Non. MAX accepte ORDER BY dans OVER."
    ],
    retenir: "MAX cumulatif = record à date."
  },
  {
    id: "m08-q34", dialecte: "Standard",
    q: "Que donne COUNT(*) OVER (PARTITION BY client_id) ?",
    choix: [
      "Le numéro de la ligne dans le client",
      "Le nombre de commandes du client",
      "Le nombre total de clients de la table",
      "1 sur chaque ligne de chaque commande"
    ],
    bonne: 1,
    pourquoi: [
      "Non. C'est ROW_NUMBER.",
      "Oui. Affiché sur chacune de ses lignes. Pratique pour filtrer ensuite (ex. clients avec une seule commande).",
      "Non. PARTITION BY client_id compte par client.",
      "Non. Ça compte les lignes du client, souvent plus de 1."
    ],
    retenir: "COUNT(*) OVER (PARTITION BY x) = taille du groupe."
  },
  {
    id: "m08-q35", dialecte: "Standard",
    q: "Comment afficher TOUTES les colonnes des factures en double (même numéro), pas seulement les numéros ?",
    choix: [
      "GROUP BY num_facture HAVING COUNT(*) > 1",
      "COUNT(*) OVER (PARTITION BY num) puis nb > 1",
      "SELECT DISTINCT * pour voir les doublons",
      "ROW_NUMBER() OVER (PARTITION BY num) = 1"
    ],
    bonne: 1,
    pourquoi: [
      "Non. On perd le détail des lignes.",
      "Oui. Calcule COUNT(*) OVER (PARTITION BY num_facture) AS nb dans une CTE, puis WHERE nb > 1. Chaque ligne garde ses colonnes et connaît la taille de son groupe.",
      "Non. DISTINCT cache les doublons au lieu de les montrer.",
      "Non. Garde une ligne par numéro."
    ],
    retenir: "Voir le détail des doublons : COUNT(*) OVER (PARTITION BY clé)."
  },
  {
    id: "m08-q36", dialecte: "SQL Server",
    q: "Que donne SELECT * FROM commande WHERE ROW_NUMBER() OVER (ORDER BY id) = 1; ?",
    choix: [
      "La 1re commande, par ordre d'id",
      "Erreur : fenêtre interdite dans WHERE",
      "Toutes les commandes, numérotées",
      "0 ligne, car aucune n'est numérotée"
    ],
    bonne: 1,
    pourquoi: [
      "Non. La requête ne s'exécute pas.",
      "Oui. Les fonctions de fenêtrage sont permises seulement dans SELECT et ORDER BY. Passe par une CTE.",
      "Non. La requête ne s'exécute pas.",
      "Non. C'est une erreur, pas 0 ligne."
    ],
    retenir: "Fenêtre : SELECT et ORDER BY seulement (SQL Server)."
  },
  {
    id: "m08-q37", dialecte: "SQL Server",
    q: "Peut-on utiliser une fonction de fenêtrage dans HAVING sur SQL Server ?",
    choix: [
      "Oui",
      "Non",
      "Seulement RANK",
      "Seulement avec GROUP BY"
    ],
    bonne: 1,
    pourquoi: [
      "Non. HAVING refuse les fenêtres, comme WHERE.",
      "Oui, c'est interdit. Même règle que WHERE : passe par un niveau au-dessus.",
      "Non. Aucune fenêtre n'est permise dans HAVING.",
      "Non. GROUP BY ne change pas la règle."
    ],
    retenir: "Pas de fenêtre dans WHERE, GROUP BY ni HAVING."
  },
  {
    id: "m08-q38", dialecte: "Snowflake",
    q: "Sur Snowflake, quelle clause filtre directement sur une fonction de fenêtrage ?",
    choixCode: true,
    choix: [
      "WHERE",
      "HAVING",
      "QUALIFY",
      "FILTER"
    ],
    bonne: 2,
    pourquoi: [
      "Non. WHERE est calculé avant les fenêtres.",
      "Non. HAVING est calculé avant les fenêtres.",
      "Oui. Elle s'écrit après HAVING. Ex. QUALIFY ROW_NUMBER() OVER (…) = 1.",
      "Non. FILTER n'existe pas pour ça sur Snowflake."
    ],
    retenir: "Snowflake : QUALIFY."
  },
  {
    id: "m08-q39", dialecte: "Snowflake",
    q: "Sur Snowflake, quelle requête garde la commande la plus récente de chaque client ?",
    choixCode: true,
    choix: [
      "SELECT * FROM commande QUALIFY ROW_NUMBER() OVER (PARTITION BY client_id ORDER BY date_cde DESC) = 1",
      "SELECT * FROM commande QUALIFY ROW_NUMBER() OVER (PARTITION BY client_id ORDER BY date_cde) = 1",
      "SELECT * FROM commande WHERE ROW_NUMBER() OVER (PARTITION BY client_id ORDER BY date_cde DESC) = 1",
      "SELECT * FROM commande QUALIFY ROW_NUMBER() OVER (ORDER BY date_cde DESC) = 1"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Une ligne par client, sans CTE.",
      "Non. Tri croissant : c'est la PLUS ANCIENNE commande.",
      "Non. Fenêtre interdite dans WHERE.",
      "Non. Sans PARTITION BY : une seule ligne au total."
    ],
    retenir: "Dernière ligne par groupe sur Snowflake : QUALIFY ROW_NUMBER() = 1."
  },
  {
    id: "m08-q40", dialecte: "Standard",
    q: "Dans quel ordre logique les fonctions de fenêtrage sont-elles calculées ?",
    choix: [
      "Avant WHERE, sur toutes les lignes",
      "Après WHERE, GROUP BY et HAVING",
      "Après ORDER BY, à la toute fin du calcul",
      "Avant FROM, pour préparer les lignes"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Sinon on pourrait les filtrer dans WHERE.",
      "Oui. Au moment du SELECT : elles voient les lignes déjà filtrées et regroupées.",
      "Non. Elles sont calculées au SELECT, avant le tri final.",
      "Non. Elles ont besoin des lignes : elles viennent après FROM."
    ],
    retenir: "FROM → WHERE → GROUP BY → HAVING → fenêtres (SELECT) → ORDER BY."
  },
  {
    id: "m08-q41", dialecte: "Standard",
    q: "Une requête a WHERE annee = 2026 et SUM(montant) OVER (). Que calcule la fenêtre ?",
    choix: [
      "Le total de toutes les années",
      "Le total de 2026 seulement",
      "Une erreur",
      "Le cumul"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Le WHERE a déjà retiré les autres années.",
      "Oui. La fenêtre travaille sur les lignes restantes après le WHERE.",
      "Non. La requête est valide.",
      "Non. Pas d'ORDER BY dans OVER : pas de cumul."
    ],
    retenir: "Les fenêtres voient seulement les lignes qui ont passé le WHERE."
  },
  {
    id: "m08-q42", dialecte: "Standard",
    q: "Peut-on écrire SUM(SUM(montant)) OVER () dans une requête GROUP BY client_id ?",
    choix: [
      "Non : agrégat imbriqué interdit",
      "Oui : total des totaux par client",
      "Oui, mais le résultat est faux",
      "Seulement sur Snowflake, pas SQL Server"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Ici, c'est permis : la fenêtre s'applique APRÈS le GROUP BY.",
      "Oui. Le SUM intérieur est le total du client ; SUM(…) OVER () fait le total de ces totaux, car la fenêtre s'applique APRÈS le GROUP BY. Parfait pour la part de chaque client.",
      "Non. Le résultat est juste : c'est le total de tous les clients.",
      "Non. Valide aussi sur SQL Server."
    ],
    retenir: "Avec GROUP BY : fenêtre sur des agrégats = SUM(SUM(x)) OVER ()."
  },
  {
    id: "m08-q43", dialecte: "Standard",
    q: "Comment classer les clients par CA, dans une requête GROUP BY client_id ?",
    choixCode: true,
    choix: [
      "RANK() OVER (ORDER BY SUM(montant) DESC)",
      "RANK() OVER (ORDER BY montant DESC)",
      "RANK() OVER (PARTITION BY SUM(montant))",
      "SUM(RANK() OVER (ORDER BY montant))"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. On classe sur l'agrégat, calculé avant la fenêtre.",
      "Non. Dans une requête GROUP BY client_id, montant n'est ni groupé ni agrégé : erreur.",
      "Non. Chaque CA forme sa partition : tout le monde est classé 1.",
      "Non. On ne peut pas agréger une fenêtre."
    ],
    retenir: "Classement d'agrégats : RANK() OVER (ORDER BY SUM(x) DESC)."
  },
  {
    id: "m08-q44", dialecte: "Standard",
    q: "Analyse ABC des articles : comment calculer le % cumulé du CA, du plus gros article au plus petit ?",
    choixCode: true,
    choix: [
      "SUM(ca) OVER (ORDER BY ca DESC ROWS UNBOUNDED PRECEDING) * 100.0 / SUM(ca) OVER ()",
      "SUM(ca) OVER (ORDER BY ca ROWS UNBOUNDED PRECEDING) * 100.0 / SUM(ca) OVER ()",
      "ca * 100.0 / SUM(ca) OVER (ORDER BY ca DESC ROWS UNBOUNDED PRECEDING)",
      "SUM(ca) OVER (ORDER BY ca DESC ROWS UNBOUNDED PRECEDING) * 100.0 / SUM(ca)"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Cumul décroissant / total. Classe A jusqu'à 80 %, B jusqu'à 95 %, C ensuite.",
      "Non. Tri croissant : on cumule depuis les plus PETITS articles.",
      "Non. Part de l'article dans le cumul, pas un % cumulé.",
      "Non. SUM(ca) sans OVER : erreur (pas de GROUP BY)."
    ],
    retenir: "ABC / Pareto : % cumulé décroissant."
  },
  {
    id: "m08-q45", dialecte: "Standard",
    q: "Une table de mouvements de stock contient +entrées et -sorties. Comment obtenir le stock après chaque mouvement ?",
    choixCode: true,
    choix: [
      "SUM(qte) OVER (PARTITION BY article ORDER BY date_mvt, id ROWS UNBOUNDED PRECEDING)",
      "SUM(qte) OVER (ORDER BY date_mvt, id ROWS UNBOUNDED PRECEDING)",
      "SUM(ABS(qte)) OVER (PARTITION BY article ORDER BY date_mvt, id ROWS UNBOUNDED PRECEDING)",
      "SUM(qte) OVER (PARTITION BY article)"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Cumul des mouvements signés, par article, dans l'ordre. L'id départage les mouvements du même instant.",
      "Non. Sans PARTITION BY : les mouvements de tous les articles sont mélangés.",
      "Non. ABS rend les sorties positives : elles s'ajoutent au stock.",
      "Non. Pas de ORDER BY : le stock final sur chaque ligne, pas le stock après chaque mouvement."
    ],
    retenir: "Solde courant = cumul des mouvements signés."
  },
  {
    id: "m08-q46", dialecte: "Standard",
    q: "Comment afficher, sur chaque ligne, la date de première commande du client ?",
    choixCode: true,
    choix: [
      "MIN(date_cde) OVER (PARTITION BY client_id)",
      "MAX(date_cde) OVER (PARTITION BY client_id)",
      "MIN(date_cde) OVER (ORDER BY client_id)",
      "LAG(date_cde) OVER (PARTITION BY client_id ORDER BY date_cde)"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Le minimum du client, répété sur ses lignes. (FIRST_VALUE marche aussi.)",
      "Non. C'est la DERNIÈRE commande.",
      "Non. Minimum cumulé sur toute la table, pas par client.",
      "Non. La commande précédente, pas la première."
    ],
    retenir: "Info du groupe sur chaque ligne : agrégat OVER (PARTITION BY)."
  },
  {
    id: "m08-q47", dialecte: "Standard",
    q: "Comment repérer les lignes où le prix d'un article a changé par rapport à la ligne précédente ?",
    choix: [
      "WHERE prix <> LAG(prix) OVER (PARTITION BY article ORDER BY date_effet)",
      "LAG(prix) … AS prix_prec dans une CTE, puis WHERE prix <> prix_prec OR prix_prec IS NULL",
      "LAG(prix) … AS prix_prec dans une CTE, puis WHERE prix = prix_prec",
      "LEAD(prix) … AS prix_suiv dans une CTE, puis WHERE prix <> prix_suiv OR prix_suiv IS NULL"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Fenêtre interdite dans WHERE (SQL Server).",
      "Oui. LAG(prix) OVER (PARTITION BY article ORDER BY date_effet) : on compare à la valeur précédente. La 1re ligne (prix_prec NULL) est un « début ».",
      "Non. Ce sont les lignes SANS changement.",
      "Non. On compare à la ligne suivante : on repère la ligne AVANT le changement."
    ],
    retenir: "Détecter un changement : LAG puis comparaison, au niveau du dessus."
  },
  {
    id: "m08-q48", dialecte: "Standard",
    q: "Comment repérer les clients perdus (dernière commande il y a plus d'un an) avec une fenêtre ?",
    choix: [
      "Garder les lignes où LAG(date_cde) IS NULL, puis tester leur âge",
      "Garder les lignes où LEAD(date_cde) IS NULL, puis tester leur âge",
      "Garder les lignes où RANK() OVER (ORDER BY date_cde) = 1",
      "Découper les commandes avec NTILE(12) par mois"
    ],
    bonne: 1,
    pourquoi: [
      "Non. LAG IS NULL = la PREMIÈRE commande.",
      "Oui. LEAD(date_cde) OVER (PARTITION BY client_id ORDER BY date_cde) IS NULL isole la dernière commande ; on regarde ensuite si elle a plus d'un an. (MAX + GROUP BY marche aussi.)",
      "Non. La commande la plus ancienne de toute la table.",
      "Non. NTILE découpe en groupes égaux, sans regarder les dates."
    ],
    retenir: "Dernière commande = LEAD IS NULL (ou ROW_NUMBER DESC = 1)."
  },
  {
    id: "m08-q49", dialecte: "SQL Server",
    q: "Comment numéroter des lignes sans ordre particulier sur SQL Server (ORDER BY est obligatoire dans ROW_NUMBER) ?",
    choixCode: true,
    choix: [
      "ROW_NUMBER() OVER (PARTITION BY (SELECT NULL))",
      "ROW_NUMBER() OVER (ORDER BY (SELECT NULL))",
      "ROW_NUMBER() OVER (ORDER BY NULL)",
      "IDENTITY(int, 1, 1) dans un SELECT normal"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Pas de ORDER BY : SQL Server refuse.",
      "Oui. Astuce : un ORDER BY sur une sous-requête constante. Numérotation arbitraire, mais sans tri coûteux.",
      "Non. SQL Server refuse une constante directe dans ce ORDER BY : il faut (SELECT NULL).",
      "Non. IDENTITY() s'utilise seulement avec SELECT INTO."
    ],
    retenir: "Numéroter sans ordre : ORDER BY (SELECT NULL)."
  },
  {
    id: "m08-q50", dialecte: "Standard",
    q: "Une requête trie sur une fenêtre : ORDER BY RANK() OVER (ORDER BY ca DESC). Est-ce valide ?",
    choix: [
      "Oui",
      "Non",
      "Seulement dans une CTE",
      "Seulement sur Snowflake"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Les fenêtres sont permises dans ORDER BY.",
      "Non. ORDER BY accepte les fenêtres.",
      "Non. C'est permis directement.",
      "Non. Valide aussi sur SQL Server."
    ],
    retenir: "Fenêtre permise dans SELECT et ORDER BY."
  },
  {
    id: "m08-q51", dialecte: "SQL Server",
    q: "Que donne COUNT(DISTINCT article_id) OVER (PARTITION BY client_id) sur SQL Server ?",
    choix: [
      "Le nombre d'articles distincts du client",
      "Erreur : DISTINCT n'est pas permis avec OVER",
      "Le nombre de lignes",
      "NULL"
    ],
    bonne: 1,
    pourquoi: [
      "Non sur SQL Server. (Snowflake l'accepte, sans ORDER BY dans la fenêtre.)",
      "Oui. Astuce : DENSE_RANK() OVER (PARTITION BY client_id ORDER BY article_id) + DENSE_RANK() OVER (… ORDER BY article_id DESC) - 1.",
      "Non. La requête ne s'exécute pas.",
      "Non. C'est une erreur, pas NULL."
    ],
    retenir: "SQL Server : pas de COUNT(DISTINCT) OVER. Astuce des deux DENSE_RANK."
  },
  {
    id: "m08-q52", dialecte: "Snowflake",
    q: "Sur Snowflake, COUNT(DISTINCT article_id) OVER (PARTITION BY client_id) est-il accepté ?",
    choix: [
      "Oui",
      "Non",
      "Seulement avec ORDER BY dans la fenêtre",
      "Seulement avec QUALIFY"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Snowflake l'accepte tant que la fenêtre n'a pas d'ORDER BY.",
      "Non. Snowflake l'accepte, sans ORDER BY dans la fenêtre.",
      "Non. C'est justement sans ORDER BY.",
      "Non. QUALIFY n'est pas nécessaire."
    ],
    retenir: "Snowflake : COUNT(DISTINCT) OVER (PARTITION BY …) possible."
  },
  {
    id: "m08-q53", dialecte: "SQL Server",
    q: "Que donne UPDATE commande SET rang = ROW_NUMBER() OVER (ORDER BY date_cde); ?",
    choix: [
      "Les rangs sont mis à jour dans l'ordre",
      "Erreur : fenêtre interdite dans SET",
      "Tous les rangs valent 1, sans erreur",
      "Rien : l'UPDATE ne touche aucune ligne"
    ],
    bonne: 1,
    pourquoi: [
      "Non. SQL Server refuse une fenêtre dans SET.",
      "Oui. Passe par une CTE : WITH x AS (SELECT rang, ROW_NUMBER() OVER (ORDER BY date_cde) AS rn FROM commande) UPDATE x SET rang = rn;",
      "Non. SQL Server refuse : rien n'est modifié.",
      "Non. C'est une erreur, pas un UPDATE vide."
    ],
    retenir: "Écrire un résultat de fenêtre : CTE puis UPDATE de la CTE."
  },
  {
    id: "m08-q54", dialecte: "SQL Server",
    q: "Que donne SELECT SUM(ROW_NUMBER() OVER (ORDER BY id)) FROM t; ?",
    choix: [
      "La somme des numéros de ligne",
      "Erreur : fenêtre dans un agrégat",
      "Le nombre de lignes de la table",
      "NULL, car l'ordre n'est pas unique"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Une fenêtre dans un agrégat est interdite.",
      "Oui. Calcule la fenêtre dans une CTE, puis agrège au niveau du dessus.",
      "Non. La requête ne s'exécute pas.",
      "Non. C'est une erreur, pas NULL."
    ],
    retenir: "Pas d'agrégat sur une fenêtre au même niveau : CTE."
  },
  {
    id: "m08-q55", dialecte: "Standard",
    q: "Tu veux le rang des clients selon leur évolution (CA - CA de l'an dernier, calculé avec LAG). Comment faire ?",
    choix: [
      "RANK() OVER (ORDER BY ca - LAG(ca) OVER (…))",
      "LAG dans une 1re étape, RANK dans une 2e",
      "C'est impossible avec des fenêtres",
      "Un GROUP BY client avec RANK et LAG"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Fenêtre dans une fenêtre : interdit.",
      "Oui. Une fenêtre par étape : on calcule l'évolution avec LAG dans une CTE, puis RANK() sur cette colonne.",
      "Non. C'est possible en deux étapes.",
      "Non. GROUP BY ne remplace pas les fenêtres ici."
    ],
    retenir: "Fenêtre sur un résultat de fenêtre : deux étapes."
  },
  {
    id: "m08-q56", dialecte: "Standard",
    q: "SELECT DISTINCT client_id, SUM(montant) OVER (PARTITION BY client_id) FROM commande. Est-ce une bonne idée ?",
    choix: [
      "Oui, c'est la meilleure méthode possible",
      "Juste, mais GROUP BY fait mieux",
      "C'est une erreur : DISTINCT avec OVER",
      "Le résultat est faux : sommes doublées"
    ],
    bonne: 1,
    pourquoi: [
      "Non. GROUP BY fait la même chose, plus simplement.",
      "Oui. Le résultat est juste, mais on calcule sur chaque ligne puis on supprime les doublons : du travail en trop. GROUP BY client_id fait la même chose plus simplement et plus vite.",
      "Non. C'est valide.",
      "Non. Le résultat est juste."
    ],
    retenir: "Une ligne par groupe = GROUP BY. Fenêtre = garder le détail."
  },
  {
    id: "m08-q57", dialecte: "SQL Server",
    q: "Jours de production : 1, 2, 3, 6, 7 octobre. Comment regrouper les jours CONSÉCUTIFS (îlots) ?",
    choixCode: true,
    choix: [
      "GROUP BY DATEADD(day, -ROW_NUMBER() OVER (ORDER BY jour), jour)",
      "GROUP BY DATEADD(day, -ROW_NUMBER() OVER (ORDER BY jour), jour), calculé d'abord dans une CTE",
      "GROUP BY DATEADD(day, ROW_NUMBER() OVER (ORDER BY jour), jour), calculé d'abord dans une CTE",
      "GROUP BY MONTH(jour), calculé d'abord dans une CTE"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Fenêtre interdite dans GROUP BY : il faut la calculer avant, dans une CTE.",
      "Oui. Jour - numéro de ligne reste constant tant que les jours se suivent. Ce « marqueur » identifie chaque îlot.",
      "Non. On AJOUTE le numéro : la clé change à chaque ligne, même pour des jours consécutifs.",
      "Non. Un groupe par mois, pas par série de jours."
    ],
    retenir: "Îlots de dates consécutives : date - ROW_NUMBER = clé de groupe."
  },
  {
    id: "m08-q58", dialecte: "SQL Server",
    q: "Avec la clé d'îlot calculée (date - ROW_NUMBER), comment obtenir le début, la fin et la durée de chaque période d'arrêt machine ?",
    choixCode: true,
    choix: [
      "SELECT MIN(jour), MAX(jour), COUNT(*) FROM x GROUP BY cle_ilot",
      "SELECT MIN(jour), MAX(jour), COUNT(*) FROM x GROUP BY jour",
      "SELECT MIN(cle_ilot), MAX(cle_ilot), COUNT(*) FROM x GROUP BY jour",
      "SELECT MIN(jour), MAX(jour), COUNT(*) FROM x"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Un îlot = un groupe : début, fin, nombre de jours.",
      "Non. Un groupe par jour : chaque « période » fait 1 jour.",
      "Non. Grouper par jour et prendre MIN / MAX de la clé n'a pas de sens.",
      "Non. Un seul groupe : de la 1re à la dernière date, tous îlots confondus."
    ],
    retenir: "Îlots : GROUP BY clé → MIN, MAX, COUNT."
  },
  {
    id: "m08-q59", dialecte: "Standard",
    q: "Une machine a un statut par heure (MARCHE / ARRET). Comment regrouper les heures consécutives de même statut ?",
    choixCode: true,
    choix: [
      "Clé = ROW_NUMBER() OVER (ORDER BY heure) - ROW_NUMBER() OVER (PARTITION BY heure ORDER BY statut), puis GROUP BY statut, clé",
      "Clé = ROW_NUMBER() OVER (ORDER BY heure) - ROW_NUMBER() OVER (PARTITION BY statut ORDER BY heure), puis GROUP BY statut, clé",
      "Clé = ROW_NUMBER() OVER (PARTITION BY statut ORDER BY heure), puis GROUP BY statut, clé",
      "GROUP BY statut, puis MIN(heure) et MAX(heure)"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Partition par heure : chaque heure est seule, la 2e numérotation vaut toujours 1.",
      "Oui. La différence des deux numérotations est constante dans une même séquence.",
      "Non. Chaque ligne a sa propre clé : aucun regroupement.",
      "Non. Toutes les périodes ARRET seraient fusionnées."
    ],
    retenir: "Îlots de valeurs : différence de deux ROW_NUMBER."
  },
  {
    id: "m08-q60", dialecte: "Snowflake",
    q: "Sur Snowflake, quelle fonction numérote les séquences, en augmentant chaque fois que le statut change ?",
    choixCode: true,
    choix: [
      "CONDITIONAL_CHANGE_EVENT(statut) OVER (ORDER BY heure)",
      "CONDITIONAL_TRUE_EVENT(statut) OVER (ORDER BY heure)",
      "LAG(statut) OVER (ORDER BY heure)",
      "DENSE_RANK() OVER (ORDER BY statut, heure)"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Le compteur augmente à chaque changement de valeur : c'est directement la clé d'îlot.",
      "Non. Il attend une condition (vrai / faux), pas une valeur qui change.",
      "Non. Donne la valeur précédente, pas un numéro de séquence.",
      "Non. Un numéro par ligne, pas par séquence."
    ],
    retenir: "Snowflake : CONDITIONAL_CHANGE_EVENT pour les îlots."
  },
  {
    id: "m08-q61", dialecte: "Snowflake",
    q: "Sur Snowflake, comment numéroter des « sessions » (nouvelle session si plus de 30 min d'inactivité) ?",
    choixCode: true,
    choix: [
      "CONDITIONAL_TRUE_EVENT(DATEDIFF('minute', LAG(ts) OVER (ORDER BY ts), ts) > 30) OVER (ORDER BY ts)",
      "CONDITIONAL_CHANGE_EVENT(DATEDIFF('minute', LAG(ts) OVER (ORDER BY ts), ts) > 30) OVER (ORDER BY ts)",
      "ROW_NUMBER() OVER (ORDER BY ts) / 30",
      "CONDITIONAL_TRUE_EVENT(DATEDIFF('minute', LAG(ts) OVER (ORDER BY ts), ts) < 30) OVER (ORDER BY ts)"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Le compteur augmente chaque fois que la condition est vraie. (La condition est souvent calculée dans une étape avant.)",
      "Non. Il compte les CHANGEMENTS de la condition (vrai → faux aussi), pas ses passages à vrai.",
      "Non. Des paquets de 30 lignes, sans lien avec les pauses.",
      "Non. Condition inversée : le compteur augmente à chaque message rapproché."
    ],
    retenir: "Snowflake : CONDITIONAL_TRUE_EVENT(condition) = compteur d'événements."
  },
  {
    id: "m08-q62", dialecte: "SQL Server",
    q: "Sur SQL Server, comment numéroter des sessions (pause > 30 min = nouvelle session) ?",
    choix: [
      "Un curseur qui parcourt les lignes une à une",
      "Drapeau 0/1 avec LAG, puis SUM cumulé",
      "NTILE découpé en tranches de 30 min",
      "GROUP BY DATEPART(minute, ts)"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Lent et inutile.",
      "Oui. 1) drapeau = CASE WHEN DATEDIFF(minute, LAG(ts) OVER (ORDER BY ts), ts) > 30 THEN 1 ELSE 0 END ; 2) session = SUM(drapeau) OVER (ORDER BY ts ROWS UNBOUNDED PRECEDING). Le cumul des drapeaux donne un numéro de session.",
      "Non. NTILE découpe en nombre de lignes, pas en durée.",
      "Non. Ça groupe par minute de l'heure, sans regarder les pauses."
    ],
    retenir: "Numéroter des événements : drapeau 0/1, puis SUM cumulatif."
  },
  {
    id: "m08-q63", dialecte: "Snowflake",
    q: "Un relevé de prix a des trous (NULL). Sur Snowflake, comment reprendre le dernier prix connu ?",
    choixCode: true,
    choix: [
      "LAG(prix) IGNORE NULLS OVER (PARTITION BY article ORDER BY jour)",
      "LAG(prix) OVER (PARTITION BY article ORDER BY jour)",
      "LEAD(prix) IGNORE NULLS OVER (PARTITION BY article ORDER BY jour)",
      "MAX(prix) OVER (PARTITION BY article)"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. IGNORE NULLS saute les NULL pour trouver la dernière vraie valeur. Combine avec COALESCE(prix, …).",
      "Non. Si la veille est aussi NULL, LAG renvoie NULL.",
      "Non. LEAD regarde vers l'avant : le PROCHAIN prix connu.",
      "Non. Le plus haut prix de l'article, pas le dernier connu."
    ],
    retenir: "Prolonger la dernière valeur : IGNORE NULLS."
  },
  {
    id: "m08-q64", dialecte: "SQL Server",
    q: "Sur SQL Server 2022, comment reprendre la dernière valeur non NULL ?",
    choixCode: true,
    choix: [
      "LAST_VALUE(prix) IGNORE NULLS OVER (PARTITION BY article ORDER BY jour ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW)",
      "FIRST_VALUE(prix) IGNORE NULLS OVER (PARTITION BY article ORDER BY jour ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW)",
      "LAST_VALUE(prix) OVER (PARTITION BY article ORDER BY jour ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW)",
      "ISNULL(prix, LAG(prix) OVER (PARTITION BY article ORDER BY jour))"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Nouveauté de SQL Server 2022 : IGNORE NULLS sur FIRST_VALUE / LAST_VALUE.",
      "Non. Le PREMIER prix connu, pas le dernier.",
      "Non. Sans IGNORE NULLS : c'est la ligne courante, NULL compris.",
      "Non. LAG ne regarde qu'une ligne en arrière : deux NULL de suite et ça échoue."
    ],
    retenir: "SQL Server 2022 : LAST_VALUE … IGNORE NULLS."
  },
  {
    id: "m08-q65", dialecte: "SQL Server",
    q: "Avant SQL Server 2022, quelle astuce prolonge la dernière valeur connue ?",
    choix: [
      "Impossible avant SQL Server 2022",
      "COUNT(prix) cumulé = groupe, puis MAX",
      "SUM(prix) OVER () sur toute la table",
      "LAG(prix, 2) pour sauter deux NULL"
    ],
    bonne: 1,
    pourquoi: [
      "Non. L'astuce COUNT cumulé + MAX marche avant 2022.",
      "Oui. grp = COUNT(prix) OVER (ORDER BY jour ROWS UNBOUNDED PRECEDING) ; puis MAX(prix) OVER (PARTITION BY grp). COUNT(prix) n'augmente que sur les valeurs non NULL : les NULL restent dans le groupe de la dernière valeur.",
      "Non. Ça donne le total de toute la table.",
      "Non. Et s'il y a trois NULL de suite ?"
    ],
    retenir: "Remplir vers le bas : COUNT cumulatif = groupe, puis MAX du groupe."
  },
  {
    id: "m08-q66", dialecte: "Standard",
    q: "Que mesure PERCENT_RANK() OVER (ORDER BY ca) ?",
    choix: [
      "La part du CA de la ligne dans le total",
      "La position relative, de 0 à 1",
      "Le nombre de lignes avant la ligne",
      "Le CA exprimé en pourcentage du max"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Ce serait ca / SUM(ca) OVER ().",
      "Oui. De 0 (premier) à 1 (dernier) : (rang - 1) / (nombre de lignes - 1).",
      "Non. Ce serait un rang, pas un pourcentage.",
      "Non. PERCENT_RANK ne regarde que le rang, pas le max."
    ],
    retenir: "PERCENT_RANK = position relative entre 0 et 1."
  },
  {
    id: "m08-q67", dialecte: "Standard",
    q: "Que mesure CUME_DIST() OVER (ORDER BY ca) ?",
    choix: [
      "La part des lignes au CA inférieur ou égal",
      "Le CA cumulé jusqu'à la ligne courante",
      "L'écart-type du CA de la table",
      "Le rang de la ligne, de 1 à N"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. La proportion de lignes dont le CA est inférieur ou égal à celui de la ligne. Ex. 0,8 = 80 % des clients font un CA inférieur ou égal.",
      "Non. Ce serait SUM OVER.",
      "Non. Ce serait STDEV.",
      "Non. Ce serait RANK ou ROW_NUMBER."
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
      "PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY client_id) OVER (PARTITION BY montant)",
      "PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY montant) OVER ()"
    ],
    bonne: 1,
    pourquoi: [
      "Non. MEDIAN n'existe pas sur SQL Server.",
      "Oui. Fonction de distribution : WITHIN GROUP pour l'ordre, OVER pour le groupe.",
      "Non. Colonnes inversées : on cherche la médiane des client_id par montant.",
      "Non. OVER () : la médiane de toutes les commandes, pas par client."
    ],
    retenir: "Médiane SQL Server : PERCENTILE_CONT(0.5) … OVER."
  },
  {
    id: "m08-q69", dialecte: "Snowflake",
    q: "Sur Snowflake, comment afficher la médiane par client sur chaque ligne ?",
    choixCode: true,
    choix: [
      "MEDIAN(montant) OVER (PARTITION BY client_id)",
      "MEDIAN(client_id) OVER (PARTITION BY montant)",
      "AVG(montant) OVER (PARTITION BY client_id)",
      "MEDIAN(montant) OVER (ORDER BY client_id)"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. MEDIAN existe comme agrégat et comme fenêtre.",
      "Non. Colonnes inversées.",
      "Non. C'est la moyenne.",
      "Non. MEDIAN n'accepte pas de ORDER BY dans OVER, et il faut une partition par client."
    ],
    retenir: "Snowflake : MEDIAN(x) OVER (…)."
  },
  {
    id: "m08-q70", dialecte: "Snowflake",
    q: "Sur Snowflake, que fait RATIO_TO_REPORT(ca) OVER (PARTITION BY region) ?",
    choix: [
      "Le rang du CA dans sa région",
      "La part du CA dans le total de sa région",
      "Le CA cumulé de la région, mois par mois",
      "Un rapport PDF envoyé à chaque région"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Ce serait RANK.",
      "Oui. Entre 0 et 1. Raccourci de ca / SUM(ca) OVER (PARTITION BY region).",
      "Non. Ce serait SUM avec ORDER BY.",
      "Non. C'est une fonction de calcul, pas un envoi."
    ],
    retenir: "Snowflake : RATIO_TO_REPORT = part dans le total."
  },
  {
    id: "m08-q71", dialecte: "SQL Server",
    q: "Sur SQL Server 2022, à quoi sert la clause WINDOW ?",
    code: "SELECT client_id, montant,\n  SUM(montant) OVER w AS cumul,\n  AVG(montant) OVER w AS moy\nFROM commande\nWINDOW w AS (PARTITION BY client_id ORDER BY date_cde);",
    choix: [
      "À créer une vue réutilisable",
      "À nommer une fenêtre pour la réutiliser",
      "À filtrer les lignes selon une fonction de fenêtrage",
      "Rien, c'est une erreur de syntaxe"
    ],
    bonne: 1,
    pourquoi: [
      "Non. La fenêtre nommée existe seulement dans cette requête.",
      "Oui. On nomme la fenêtre une seule fois et on la réutilise dans plusieurs fonctions : moins de répétition, moins d'erreurs de copier-coller.",
      "Non. Ce serait QUALIFY (Snowflake).",
      "Non. Valide depuis SQL Server 2022."
    ],
    retenir: "WINDOW w AS (…) : fenêtre nommée, réutilisable."
  },
  {
    id: "m08-q72", dialecte: "SQL Server",
    q: "Quel index aide le plus ROW_NUMBER() OVER (PARTITION BY client_id ORDER BY date_cde) ?",
    choix: [
      "Un index sur (date_cde, client_id) + INCLUDE",
      "Un index sur (client_id, date_cde) + INCLUDE",
      "Un index sur date_cde seul, avec INCLUDE",
      "Un index sur (montant, client_id, date_cde)"
    ],
    bonne: 1,
    pourquoi: [
      "Non. L'ordre doit d'abord être par client (PARTITION BY).",
      "Oui. Index (client_id, date_cde) INCLUDE (colonnes affichées) : les lignes arrivent déjà dans l'ordre, pas de tri coûteux. On appelle ça un index « POC » (Partition, Order, Covering).",
      "Non. L'ordre doit d'abord être par client.",
      "Non. montant en tête ne sert pas l'ordre demandé."
    ],
    retenir: "Fenêtre rapide : index (PARTITION BY, ORDER BY) INCLUDE (…)."
  },
  {
    id: "m08-q73", dialecte: "SQL Server",
    q: "Le plan d'une requête avec fenêtre montre un gros opérateur Sort. Pourquoi ?",
    choix: [
      "Seulement à cause du ORDER BY final",
      "La fenêtre a besoin de lignes triées",
      "Les statistiques sont périmées",
      "Les fenêtres trient toujours tout deux fois"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Pas seulement.",
      "Oui. La fenêtre a besoin des lignes triées par PARTITION BY + ORDER BY ; sans index adapté, SQL Server trie. Un index sur ces colonnes supprime souvent ce tri.",
      "Non. Elles faussent les estimations, pas le besoin de trier.",
      "Non. Un tri suffit, pas deux."
    ],
    retenir: "Sort avant une fenêtre = index manquant sur (partition, ordre)."
  },
  {
    id: "m08-q74", dialecte: "SQL Server",
    q: "Sur SQL Server, pourquoi préciser ROWS plutôt que laisser RANGE (par défaut) pour un cumul ?",
    choix: [
      "Pour le style, aucun effet",
      "Cumul ligne à ligne, plus rapide",
      "RANGE est interdit dans un cumul",
      "ROWS trie aussi le résultat affiché"
    ],
    bonne: 1,
    pourquoi: [
      "Non. ROWS change le résultat avec des ex aequo, et la vitesse.",
      "Oui. ROWS ne regroupe pas les ex aequo, et il est généralement plus rapide : RANGE peut utiliser une table de travail sur disque.",
      "Non. RANGE est le cadre par défaut d'un cumul.",
      "Non. Le cadre ne trie pas l'affichage."
    ],
    retenir: "Cumul : ROWS UNBOUNDED PRECEDING, explicitement."
  },
  {
    id: "m08-q75", dialecte: "Standard",
    q: "Que renvoie LEAD(statut, 2) OVER (ORDER BY date_evt) ?",
    choix: [
      "Le statut 2 lignes avant",
      "Le statut 2 lignes après",
      "Le 2e statut de la table",
      "Le statut multiplié par 2"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Ce serait LAG(statut, 2).",
      "Oui. Le 2e paramètre est le décalage.",
      "Non. Le décalage part de la ligne courante.",
      "Non. Le 2 est un décalage de lignes."
    ],
    retenir: "LEAD(x, n) = n lignes plus loin."
  },
  {
    id: "m08-q76", dialecte: "Standard",
    q: "Avec LAG(montant) OVER (PARTITION BY client_id ORDER BY date_cde), que vaut LAG sur la 1re commande de CHAQUE client ?",
    choix: [
      "La dernière commande du client précédent",
      "NULL",
      "0",
      "Le montant lui-même"
    ],
    bonne: 1,
    pourquoi: [
      "Non. La partition l'en empêche.",
      "Oui. LAG ne sort jamais de sa partition.",
      "Non. Sauf valeur par défaut.",
      "Non. LAG regarde la ligne d'avant, pas la ligne elle-même."
    ],
    retenir: "LAG / LEAD restent dans leur partition."
  },
  {
    id: "m08-q77", dialecte: "SQL Server",
    q: "Sur SQL Server, avec ROW_NUMBER() OVER (ORDER BY date_livraison), où sont numérotées les lignes sans date (NULL) ?",
    choix: [
      "À la fin",
      "Au début",
      "Elles sont exclues",
      "Avec le numéro 0"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Ce serait le cas sur Snowflake.",
      "Oui. NULL = plus petite valeur sur SQL Server. Gère-les : ORDER BY CASE WHEN d IS NULL THEN 1 ELSE 0 END, d.",
      "Non. ROW_NUMBER numérote toutes les lignes.",
      "Non. Chaque ligne reçoit un numéro à partir de 1, NULL compris."
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
      "Non. Le nombre total de lignes, partout."
    ],
    retenir: "Numéro de groupe : DENSE_RANK() OVER (ORDER BY clé)."
  },
  {
    id: "m08-q79", dialecte: "Standard",
    q: "Une table client_import contient plusieurs versions du même client (date_maj différente). Comment garder la version la plus récente ?",
    choixCode: true,
    choix: [
      "ROW_NUMBER() OVER (PARTITION BY code_client ORDER BY date_maj) = 1 (via CTE ou QUALIFY)",
      "ROW_NUMBER() OVER (PARTITION BY code_client ORDER BY date_maj DESC) = 1 (via CTE ou QUALIFY)",
      "ROW_NUMBER() OVER (ORDER BY date_maj DESC) = 1 (via CTE ou QUALIFY)",
      "RANK() OVER (PARTITION BY code_client ORDER BY code_client DESC) = 1 (via CTE ou QUALIFY)"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Tri croissant : on garde la version la PLUS ANCIENNE.",
      "Oui. Dédoublonnage classique d'un flux d'import.",
      "Non. Sans PARTITION BY : une seule ligne pour toute la table.",
      "Non. Tri sur le code lui-même : toutes les versions sont ex aequo, toutes gardées."
    ],
    retenir: "Garder la dernière version : ROW_NUMBER … ORDER BY date DESC = 1."
  },
  {
    id: "m08-q80", dialecte: "Standard",
    q: "Comment afficher l'écart de chaque commande avec la moyenne de son client ?",
    choixCode: true,
    choix: [
      "montant - AVG(montant) OVER (PARTITION BY client_id)",
      "montant - AVG(montant) OVER (ORDER BY client_id)",
      "montant - AVG(montant) OVER ()",
      "montant - LAG(montant) OVER (PARTITION BY client_id ORDER BY date_cde)"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Positif = au-dessus de sa moyenne habituelle.",
      "Non. Moyenne cumulée de toute la table, pas du client.",
      "Non. Écart avec la moyenne de TOUTES les commandes.",
      "Non. Écart avec la commande précédente."
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
      "Non. NTILE découpe en 12 groupes, il ne classe pas par mois."
    ],
    retenir: "« Par … » = PARTITION BY. « Selon … » = ORDER BY."
  },
  {
    id: "m08-q82", dialecte: "Standard",
    q: "Tu veux le meilleur vendeur de chaque mois, en gardant les ex aequo. Quel filtre ?",
    choix: [
      "ROW_NUMBER() = 1",
      "RANK() = 1",
      "NTILE(1) = 1",
      "LAG() IS NULL"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Un seul vendeur, même en cas d'égalité.",
      "Oui. Tous les vendeurs à égalité au 1er rang.",
      "Non. Tout le monde.",
      "Non. LAG donne la valeur d'avant, pas un classement."
    ],
    retenir: "Avec ex aequo : RANK = 1. Sans : ROW_NUMBER = 1."
  },
  {
    id: "m08-q83", dialecte: "Standard",
    q: "Comment afficher en même temps la part d'un article dans sa famille ET dans le total ?",
    choixCode: true,
    choix: [
      "ca / SUM(ca) OVER (PARTITION BY famille) AS part_famille, ca / SUM(ca) OVER () AS part_totale",
      "ca / SUM(ca) OVER (PARTITION BY famille) AS part_famille, ca / SUM(ca) OVER (PARTITION BY famille) AS part_totale",
      "ca / SUM(ca) OVER () AS part_famille, ca / SUM(ca) OVER (PARTITION BY famille) AS part_totale",
      "Impossible : une seule fenêtre par SELECT"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Plusieurs fenêtres différentes dans le même SELECT, aucun problème.",
      "Non. La « part totale » est encore calculée par famille.",
      "Non. Les deux calculs sont inversés.",
      "Non. Plusieurs fenêtres différentes sont permises."
    ],
    retenir: "Plusieurs fenêtres différentes dans un même SELECT : permis."
  },
  {
    id: "m08-q84", dialecte: "Standard",
    q: "COUNT(*) OVER (ORDER BY date_cde ROWS UNBOUNDED PRECEDING) donne le même résultat que…",
    choix: [
      "COUNT(*) OVER () sur toute la table",
      "ROW_NUMBER() OVER (ORDER BY date_cde)",
      "DENSE_RANK() OVER (ORDER BY date_cde DESC)",
      "NTILE(1) OVER (ORDER BY date_cde)"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Le total sur chaque ligne, pas un compteur.",
      "Oui. Un compteur qui augmente de 1 à chaque ligne.",
      "Non. Les ex aequo sont gérés autrement, et l'ordre est inversé.",
      "Non. Un seul groupe : vaut 1 partout."
    ],
    retenir: "Comptage cumulatif ligne à ligne = ROW_NUMBER."
  },
  {
    id: "m08-q85", dialecte: "Standard",
    q: "Comment afficher, mois par mois, le nombre CUMULÉ de clients différents depuis le début ?",
    choix: [
      "COUNT(DISTINCT client_id) OVER (ORDER BY mois)",
      "Compter les 1res commandes, puis cumuler",
      "COUNT(*) OVER (ORDER BY mois), tout simplement",
      "DENSE_RANK() OVER (ORDER BY client_id)"
    ],
    bonne: 1,
    pourquoi: [
      "Non. DISTINCT avec ORDER BY dans OVER n'est pas permis.",
      "Oui. Marque la 1re commande de chaque client (ROW_NUMBER par client = 1), puis fais la somme cumulée de ces marques par mois. Chaque client est compté une fois, le mois de son arrivée.",
      "Non. Compte les commandes.",
      "Non. Numérote les clients, sans lien avec les mois."
    ],
    retenir: "Cumul de distincts : compter les « premières fois », puis cumuler."
  },
  {
    id: "m08-q86", dialecte: "Standard",
    q: "Sur SQL Server, peut-on écrire STRING_AGG(code, ',') OVER (PARTITION BY cde_id) ?",
    choix: [
      "Oui, comme LISTAGG sur Snowflake",
      "Non : pas en fenêtre sur SQL Server",
      "Oui, à condition d'ajouter ORDER BY",
      "Seulement depuis SQL Server 2022"
    ],
    bonne: 1,
    pourquoi: [
      "Non. LISTAGG … OVER existe sur Snowflake, pas STRING_AGG … OVER sur SQL Server.",
      "Oui. STRING_AGG n'est pas une fonction de fenêtrage sur SQL Server. Fais un GROUP BY dans une sous-requête puis une jointure. (Snowflake, lui, accepte LISTAGG … OVER.)",
      "Non. ORDER BY ne rend pas la fenêtre possible.",
      "Non. SQL Server 2022 ne l'accepte pas non plus."
    ],
    retenir: "Concaténer par fenêtre : LISTAGG OVER (Snowflake) ; GROUP BY + jointure (SQL Server)."
  },
  {
    id: "m08-q87", dialecte: "Standard",
    q: "Comment détecter les trous de plus d'une heure dans la réception des messages EDI ?",
    choixCode: true,
    choix: [
      "DATEDIFF(minute, LAG(recu_le) OVER (ORDER BY recu_le), recu_le), puis garder > 60",
      "DATEDIFF(minute, LEAD(recu_le) OVER (ORDER BY recu_le), recu_le), puis garder > 60",
      "COUNT(*) par heure, puis garder les heures à 0",
      "DATEDIFF(minute, MIN(recu_le) OVER (), recu_le), puis garder > 60"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Écart avec le message précédent : au-delà de 60 min, alerte.",
      "Non. Avec LEAD, l'écart est négatif : jamais > 60.",
      "Non. Une heure sans message n'a pas de ligne : invisible.",
      "Non. Écart avec le tout premier message, pas avec le précédent."
    ],
    retenir: "Surveiller un flux : écart avec LAG."
  },
  {
    id: "m08-q88", dialecte: "Standard",
    q: "Comment calculer, pour chaque article, l'évolution de prix entre le premier et le dernier relevé de l'année ?",
    choixCode: true,
    choix: [
      "LAST_VALUE(prix) OVER (PARTITION BY article ORDER BY jour ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING) - FIRST_VALUE(prix) OVER (PARTITION BY article ORDER BY jour)",
      "LAST_VALUE(prix) OVER (PARTITION BY article ORDER BY jour) - FIRST_VALUE(prix) OVER (PARTITION BY article ORDER BY jour)",
      "FIRST_VALUE(prix) OVER (PARTITION BY article ORDER BY jour ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING) - LAST_VALUE(prix) OVER (PARTITION BY article ORDER BY jour)",
      "MAX(prix) OVER (PARTITION BY article) - MIN(prix) OVER (PARTITION BY article)"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Dernier relevé (cadre complet !) moins premier relevé.",
      "Non. Sans cadre complet, LAST_VALUE renvoie le prix de la ligne elle-même.",
      "Non. Ordre inversé (premier moins dernier), et LAST_VALUE sans cadre complet.",
      "Non. Plus haut moins plus bas : pas forcément le début et la fin."
    ],
    retenir: "Début / fin de période : FIRST_VALUE et LAST_VALUE (cadre complet)."
  },
  {
    id: "m08-q89", dialecte: "Standard",
    q: "Dans une requête GROUP BY annee, mois, comment afficher la part de chaque mois dans son année ?",
    choixCode: true,
    choix: [
      "SUM(ca) * 100.0 / SUM(SUM(ca)) OVER (PARTITION BY annee)",
      "SUM(ca) * 100.0 / SUM(SUM(ca)) OVER (PARTITION BY mois)",
      "SUM(ca) * 100.0 / SUM(ca) OVER (PARTITION BY annee)",
      "SUM(ca) * 100.0 / SUM(SUM(ca)) OVER ()"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Le SUM intérieur = CA du mois ; la fenêtre = total de l'année.",
      "Non. Total du même mois sur toutes les années.",
      "Non. ca n'est pas groupé : dans une requête GROUP BY, il faut SUM(SUM(ca)).",
      "Non. Part dans le total de toutes les années."
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
      "Non. Le total de toute la période, sur chaque ligne."
    ],
    retenir: "Glissant sur n périodes : n-1 PRECEDING."
  },
  {
    id: "m08-q91", dialecte: "Standard",
    q: "Échéancier d'un client : comment afficher le « reste à payer » après chaque échéance ?",
    choixCode: true,
    choix: [
      "SUM(montant) OVER (PARTITION BY client ORDER BY echeance ROWS BETWEEN 1 FOLLOWING AND UNBOUNDED FOLLOWING)",
      "SUM(montant) OVER (PARTITION BY client ORDER BY echeance ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW)",
      "SUM(montant) OVER (PARTITION BY client ORDER BY echeance ROWS BETWEEN CURRENT ROW AND UNBOUNDED FOLLOWING)",
      "SUM(montant) OVER (PARTITION BY client) - montant"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. La somme des échéances SUIVANTES. NULL après la dernière : COALESCE(…, 0).",
      "Non. C'est le déjà payé (cumul jusqu'ici), pas le reste.",
      "Non. Inclut l'échéance de la ligne : c'est le reste AVANT de la payer.",
      "Non. Total moins la ligne : ignore les échéances déjà passées."
    ],
    retenir: "Cumul « restant » : cadre tourné vers FOLLOWING."
  },
  {
    id: "m08-q92", dialecte: "Standard",
    q: "Comment voir si un client a gagné ou perdu des places dans le classement d'un mois à l'autre ?",
    choix: [
      "RANK() deux fois dans la même expression",
      "Rang par mois, puis LAG du rang",
      "NTILE(12) sur le CA de l'année",
      "COUNT(*) des clients mieux classés"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Une fenêtre dans une fenêtre est interdite.",
      "Oui. Deux étapes : RANK … PARTITION BY mois, puis LAG(rang) OVER (PARTITION BY client ORDER BY mois) pour comparer au rang précédent.",
      "Non. NTILE découpe, il ne compare pas les mois.",
      "Non. Possible, mais lourd : LAG du rang est plus simple."
    ],
    retenir: "Évolution d'un rang : RANK, puis LAG du rang."
  },
  {
    id: "m08-q93", dialecte: "Standard",
    q: "Une vue calcule ROW_NUMBER() OVER (ORDER BY date_cde) AS rn. Tu filtres la vue avec WHERE client_id = 42. Les rn sont-ils 1, 2, 3… ?",
    choix: [
      "Oui, la numérotation suit le filtre",
      "Non : des trous dans la numérotation",
      "Erreur : on ne filtre pas une vue numérotée",
      "Ça dépend de l'index sur client_id"
    ],
    bonne: 1,
    pourquoi: [
      "Non. La numérotation est faite avant le filtre.",
      "Oui. La numérotation a été faite sur TOUTES les commandes, avant ton filtre : les rn du client 42 ont des trous. Ajoute PARTITION BY client_id pour une numérotation par client.",
      "Non. On peut filtrer une vue numérotée.",
      "Non. Un index ne change pas la numérotation."
    ],
    retenir: "Filtre avant ou après une fenêtre : résultats différents."
  },
  {
    id: "m08-q94", dialecte: "Standard",
    q: "Comment repérer les clients qui n'ont passé qu'UNE seule commande, en gardant le détail de cette commande ?",
    choixCode: true,
    choix: [
      "COUNT(*) OVER (PARTITION BY client_id) AS nb dans une CTE, puis WHERE nb = 1",
      "ROW_NUMBER() OVER (PARTITION BY client_id ORDER BY id) AS nb dans une CTE, puis WHERE nb = 1",
      "COUNT(*) OVER (ORDER BY client_id) AS nb dans une CTE, puis WHERE nb = 1",
      "COUNT(*) OVER (PARTITION BY client_id) AS nb dans une CTE, puis WHERE nb > 1"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. On connaît la taille du groupe sur chaque ligne.",
      "Non. La 1re commande de TOUS les clients.",
      "Non. Comptage cumulé sur toute la table : seule la 1re ligne vaut 1.",
      "Non. Ce sont les clients avec PLUSIEURS commandes."
    ],
    retenir: "Filtrer selon la taille du groupe : COUNT(*) OVER (PARTITION BY)."
  },
  {
    id: "m08-q95", dialecte: "Standard",
    q: "NTILE(10) découpe 1 000 clients en 10 groupes de 100. Le groupe 1 représente-t-il 10 % du CA ?",
    choix: [
      "Oui, toujours exactement 10 %",
      "Non : 10 % des clients, pas du CA",
      "Oui, si on trie les clients par CA",
      "Erreur : NTILE exige un PARTITION BY"
    ],
    bonne: 1,
    pourquoi: [
      "Non. NTILE coupe en nombre de clients, pas en CA.",
      "Oui. NTILE découpe en NOMBRE de clients, pas en CA : le 1er décile peut faire 60 % du CA. Pour des tranches de CA, utilise le % cumulé (analyse ABC).",
      "Non. Même trié, chaque groupe a 100 clients, pas 10 % du CA.",
      "Non. PARTITION BY est facultatif."
    ],
    retenir: "NTILE = parts égales en lignes. % cumulé = parts en valeur."
  },
  {
    id: "m08-q96", dialecte: "Standard",
    q: "Comment afficher « Hausse », « Baisse » ou « Stable » par rapport au mois précédent ?",
    choixCode: true,
    choix: [
      "CASE WHEN ca > LAG(ca) OVER (ORDER BY mois) THEN 'Hausse' WHEN ca < LAG(ca) OVER (ORDER BY mois) THEN 'Baisse' ELSE 'Stable' END",
      "CASE WHEN ca > LAG(ca) OVER (ORDER BY mois) THEN 'Baisse' WHEN ca < LAG(ca) OVER (ORDER BY mois) THEN 'Hausse' ELSE 'Stable' END",
      "CASE WHEN ca > LEAD(ca) OVER (ORDER BY mois) THEN 'Hausse' WHEN ca < LEAD(ca) OVER (ORDER BY mois) THEN 'Baisse' ELSE 'Stable' END",
      "CASE WHEN ca > LAG(ca) THEN 'Hausse' WHEN ca < LAG(ca) THEN 'Baisse' ELSE 'Stable' END"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Attention : le 1er mois (LAG NULL) tombe dans « Stable ». Ajoute un cas WHEN LAG(…) IS NULL.",
      "Non. Libellés inversés.",
      "Non. LEAD compare au mois SUIVANT, pas au précédent.",
      "Non. LAG sans OVER : erreur."
    ],
    retenir: "CASE + LAG pour qualifier une évolution. Pense au 1er cas (NULL)."
  },
  {
    id: "m08-q97", dialecte: "Standard",
    q: "Une requête utilise 5 fenêtres avec 5 PARTITION BY / ORDER BY différents. Quel impact ?",
    choix: [
      "Aucun, les fenêtres sont gratuites",
      "Plus de tris à faire",
      "Une erreur au-delà de 3 fenêtres",
      "Elles sont fusionnées en une seule"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Chaque ordre différent peut demander un tri.",
      "Oui. Chaque ordre différent peut demander un tri. Regroupe les fenêtres qui partagent le même OVER : elles sont calculées ensemble.",
      "Non. Il n'y a pas de limite à 3.",
      "Non. Des OVER différents ne peuvent pas être fusionnés."
    ],
    retenir: "Mêmes OVER = un seul tri. OVER différents = plusieurs tris."
  },
  {
    id: "m08-q98", dialecte: "Snowflake",
    q: "Sur Snowflake, une requête avec fenêtre sur 2 milliards de lignes « déborde sur disque » (spilling) dans le Query Profile. Que faire ?",
    choix: [
      "Créer un index sur les colonnes de la fenêtre",
      "Moins de données, ou warehouse plus grand",
      "Ajouter NOLOCK et un ORDER BY final",
      "Rien, le débordement est sans effet"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Pas d'index sur Snowflake.",
      "Oui. Réduis les données avant la fenêtre (filtre, colonnes utiles) ou prends un warehouse plus grand : la mémoire ne suffit pas.",
      "Non. NOLOCK n'existe pas sur Snowflake, et ORDER BY ajoute du travail.",
      "Non. Le débordement ralentit fortement."
    ],
    retenir: "Spilling = mémoire insuffisante : filtrer tôt ou warehouse plus grand."
  },
  {
    id: "m08-q99", dialecte: "Standard",
    q: "SUM(montant) OVER (ORDER BY date_cde ROWS UNBOUNDED PRECEDING) : plusieurs commandes ont la même date. Le cumul est-il reproductible ?",
    choix: [
      "Oui, toujours au centime près",
      "Pas entre ex aequo",
      "Non, même le total final change",
      "Erreur : dates en double interdites"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Pas ligne par ligne.",
      "Oui. Le total final reste juste, mais les cumuls intermédiaires entre ex aequo peuvent changer d'une exécution à l'autre. Ajoute un départage : ORDER BY date_cde, id.",
      "Non. Le total ne change pas.",
      "Non. Les dates en double sont permises."
    ],
    retenir: "Cumul stable = ORDER BY unique dans OVER."
  },
  {
    id: "m08-q100", dialecte: "Standard",
    q: "Quand choisir une fonction de fenêtrage plutôt que GROUP BY ?",
    choix: [
      "Toujours, c'est plus moderne",
      "Pour garder le détail ET le contexte",
      "Jamais, GROUP BY suffit toujours",
      "Seulement sur Snowflake, plus rapide"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Pour une ligne par groupe, GROUP BY est plus simple.",
      "Oui. Quand tu as besoin du détail ET d'une information de groupe (total, rang, précédent, cumul) sur la même ligne. Résumé = GROUP BY. Détail + contexte = fenêtre.",
      "Non. GROUP BY perd le détail des lignes.",
      "Non. Les fenêtres existent sur les deux moteurs."
    ],
    retenir: "Résumé : GROUP BY. Détail + contexte : OVER."
  }
];
