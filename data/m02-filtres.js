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
  },
  {
    id: "m02-q11", dialecte: "Standard",
    q: "Quel filtre est équivalent à WHERE pays IN ('FR', 'BE', 'CH') ?",
    choixCode: true,
    choix: [
      "WHERE pays = 'FR' AND pays = 'BE' AND pays = 'CH'",
      "WHERE pays = 'FR' OR pays = 'BE' OR pays = 'CH'",
      "WHERE pays BETWEEN 'BE' AND 'FR'",
      "WHERE pays LIKE 'FR,BE,CH'"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Une ligne ne peut pas avoir 3 pays à la fois : 0 ligne.",
      "Oui. IN est une écriture courte pour plusieurs OR sur la même colonne.",
      "Non. BETWEEN prend un intervalle alphabétique : 'CH' passerait, mais aussi 'DE', 'ES'…",
      "Non. LIKE cherche le texte exact 'FR,BE,CH'."
    ],
    retenir: "col IN (a, b, c) = col = a OR col = b OR col = c."
  },
  {
    id: "m02-q12", dialecte: "SQL Server",
    q: "Sur SQL Server, tu cherches les codes qui contiennent un vrai caractère _ (comme 'A_12'). Quel motif utiliser ?",
    choixCode: true,
    choix: ["LIKE '%_%'", "LIKE '%[_]%'", "LIKE '%__%'", "LIKE '_%_'"],
    bonne: 1,
    pourquoi: [
      "Non. _ est un joker : ce motif accepte tout texte d'au moins 1 caractère.",
      "Oui. Entre crochets, _ redevient un caractère normal. (Snowflake ne connaît pas les crochets : utilise ESCAPE.)",
      "Non. Deux jokers : tout texte d'au moins 2 caractères.",
      "Non. Que des jokers : tout texte d'au moins 2 caractères."
    ],
    retenir: "LIKE : pour chercher un vrai _ ou %, mets-le entre crochets [_] sur SQL Server, ou utilise ESCAPE."
  },
  {
    id: "m02-q13", dialecte: "Snowflake",
    q: "Sur Snowflake, tu veux les noms qui commencent par « dup », quelle que soit la casse (Dupont, DUPUIS…). Que choisis-tu ?",
    choixCode: true,
    choix: ["nom LIKE 'dup%'", "nom ILIKE 'dup%'", "nom = 'dup%'", "nom LIKE 'DUP%'"],
    bonne: 1,
    pourquoi: [
      "Non. Sur Snowflake, LIKE tient compte de la casse : 'Dupont' ne passe pas.",
      "Oui. ILIKE est un LIKE qui ignore la casse. Il n'existe pas sur SQL Server.",
      "Non. = ne connaît pas les jokers : il cherche le texte « dup% ».",
      "Non. 'Dupont' ne passe pas : seules les majuscules exactes correspondent."
    ],
    retenir: "Snowflake : ILIKE = LIKE sans tenir compte de la casse."
  },
  {
    id: "m02-q14", dialecte: "SQL Server + Snowflake",
    q: "Le test '' IS NULL (texte vide) est-il vrai ?",
    choix: [
      "Oui, un texte vide est NULL",
      "Non, un texte vide est une vraie valeur",
      "Oui sur Snowflake, non sur SQL Server",
      "Ça dépend de la collation"
    ],
    bonne: 1,
    pourquoi: [
      "Non. C'est vrai sur Oracle seulement.",
      "Oui. '' veut dire « vide, mais connu ». NULL veut dire « inconnu ». Pour tester les deux : COALESCE(col, '') = ''.",
      "Non. C'est pareil sur les deux.",
      "Non. La collation n'a aucun rôle ici."
    ],
    retenir: "'' n'est pas NULL. Champs EDI ou imports : teste les deux cas."
  },
  {
    id: "m02-q15", dialecte: "Standard",
    q: "La remise vaut NULL pour une ligne. Cette ligne passe-t-elle le filtre WHERE NOT (remise > 10) ?",
    choix: ["Oui", "Non", "Seulement si la remise est 0", "Erreur"],
    bonne: 1,
    pourquoi: [
      "Non. NULL > 10 donne « inconnu ». NOT (inconnu) reste « inconnu ».",
      "Oui, elle ne passe pas. Seul « vrai » passe un WHERE. « Inconnu » est éliminé.",
      "Non. La ligne n'a pas 0, elle a NULL.",
      "Non. C'est valide."
    ],
    retenir: "NOT n'inverse pas « inconnu ». Les NULL restent exclus."
  },
  {
    id: "m02-q16", dialecte: "SQL Server",
    q: "Sur SQL Server, ce filtre peut-il provoquer une erreur « division par zéro » ?",
    code: "WHERE qte <> 0\n  AND montant / qte > 5",
    choix: [
      "Non, qte <> 0 est testé en premier",
      "Oui, l'ordre d'évaluation des conditions n'est pas garanti",
      "Non, SQL Server ignore les erreurs dans WHERE",
      "Oui, toujours"
    ],
    bonne: 1,
    pourquoi: [
      "Non. On le croit souvent. Mais l'optimiseur peut évaluer la division d'abord.",
      "Oui. Le moteur choisit l'ordre. Écris plutôt montant / NULLIF(qte, 0) > 5.",
      "Non. Une erreur arrête la requête.",
      "Non. Ça dépend du plan d'exécution. Le risque existe, sans être systématique."
    ],
    retenir: "Ne compte pas sur l'ordre des conditions dans WHERE. Protège la division avec NULLIF."
  },
  {
    id: "m02-q17", dialecte: "Standard",
    q: "Pour une ligne où qte = 0, que donne montant / NULLIF(qte, 0) ?",
    choix: ["0", "Une erreur de division par zéro", "NULL", "montant"],
    bonne: 2,
    pourquoi: [
      "Non. NULLIF ne renvoie pas 0 ici.",
      "Non. C'est justement ce que NULLIF évite.",
      "Oui. NULLIF(qte, 0) renvoie NULL si qte vaut 0. Diviser par NULL donne NULL, sans erreur.",
      "Non. Il n'y a pas de division par 1."
    ],
    retenir: "NULLIF(a, b) = NULL si a = b. Parfait pour éviter les divisions par zéro."
  },
  {
    id: "m02-q18", dialecte: "Standard",
    q: "Que renvoie WHERE quantite BETWEEN 20 AND 10 ?",
    choix: [
      "Les quantités de 10 à 20",
      "Aucune ligne",
      "Une erreur",
      "Toutes les lignes"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Le moteur n'inverse pas les bornes pour toi.",
      "Oui. Ça veut dire quantite >= 20 AND quantite <= 10 : impossible. Mets toujours la petite borne en premier.",
      "Non. C'est valide, juste illogique.",
      "Non. Aucune valeur ne peut être à la fois >= 20 et <= 10."
    ],
    retenir: "BETWEEN petite_borne AND grande_borne. Sinon : 0 ligne, sans erreur."
  },
  {
    id: "m02-q19", dialecte: "Standard",
    q: "WHERE pays IN ('FR', NULL) renvoie-t-il les clients dont le pays est NULL ?",
    choix: ["Oui", "Non", "Seulement sur SQL Server", "Erreur"],
    bonne: 1,
    pourquoi: [
      "Non. IN fait des comparaisons avec =. Or NULL = NULL n'est jamais vrai.",
      "Oui, il ne les renvoie pas. Seuls les FR passent. Pour les NULL : OR pays IS NULL.",
      "Non. C'est la même règle partout.",
      "Non. C'est valide."
    ],
    retenir: "Mettre NULL dans une liste IN ne sert à rien. Utilise IS NULL."
  },
  {
    id: "m02-q20", dialecte: "SQL Server + Snowflake",
    q: "La condition 'abc' = 'abc   ' (avec des espaces à la fin) est-elle vraie ?",
    choix: [
      "Oui partout",
      "Non partout",
      "Oui sur SQL Server, non sur Snowflake",
      "Non sur SQL Server, oui sur Snowflake"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Snowflake compte les espaces de fin.",
      "Non. SQL Server ignore les espaces de fin pour =.",
      "Oui. SQL Server complète avec des espaces avant de comparer. Snowflake compare exactement : pense à TRIM.",
      "Non. C'est l'inverse."
    ],
    retenir: "Espaces de fin : ignorés par SQL Server, comptés par Snowflake. Migration = TRIM."
  },
  {
    id: "m02-q21", dialecte: "SQL Server",
    q: "date_cde est de type DATE. Comment filtrer les commandes du jour sur SQL Server ?",
    choixCode: true,
    choix: [
      "WHERE date_cde = GETDATE()",
      "WHERE date_cde = CAST(GETDATE() AS date)",
      "WHERE date_cde LIKE GETDATE()",
      "WHERE date_cde = 'today'"
    ],
    bonne: 1,
    pourquoi: [
      "Non. GETDATE() contient l'heure. La date du jour à 00:00 ne vaut pas maintenant à 14:32.",
      "Oui. On enlève l'heure de GETDATE() pour comparer des dates. (Snowflake : CURRENT_DATE.)",
      "Non. LIKE sert au texte.",
      "Non. 'today' n'est pas une date valide sur SQL Server."
    ],
    retenir: "SQL Server : CAST(GETDATE() AS date) = date du jour sans l'heure."
  },
  {
    id: "m02-q22", dialecte: "Standard",
    q: "Quel filtre est équivalent à WHERE NOT (pays = 'FR' OR pays = 'BE') ? (on ignore les NULL)",
    choixCode: true,
    choix: [
      "WHERE pays <> 'FR' OR pays <> 'BE'",
      "WHERE pays <> 'FR' AND pays <> 'BE'",
      "WHERE pays = 'FR' AND pays = 'BE'",
      "WHERE NOT pays = 'FR' OR pays = 'BE'"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Piège classique : ce filtre est toujours vrai. 'FR' est bien différent de 'BE'.",
      "Oui. NOT (A OR B) = (NOT A) AND (NOT B). C'est la loi de De Morgan.",
      "Non. C'est impossible : 0 ligne.",
      "Non. NOT s'applique seulement à la 1re condition ici."
    ],
    retenir: "NOT (A OR B) = NOT A AND NOT B. Le plus simple : pays NOT IN ('FR', 'BE')."
  },
  {
    id: "m02-q23", dialecte: "SQL Server + Snowflake",
    q: "Tu compares l'ancien et le nouveau prix d'un article. L'un des deux peut être NULL. Quel test détecte bien TOUS les changements ?",
    choixCode: true,
    choix: [
      "WHERE ancien_prix <> nouveau_prix",
      "WHERE ancien_prix IS DISTINCT FROM nouveau_prix",
      "WHERE ancien_prix != nouveau_prix",
      "WHERE NOT ancien_prix = nouveau_prix"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Si un des prix est NULL, <> donne « inconnu » : le changement est raté.",
      "Oui. IS DISTINCT FROM traite NULL comme une valeur normale. Disponible sur Snowflake et SQL Server 2022+.",
      "Non. != est la même chose que <> : même problème avec NULL.",
      "Non. Même problème avec NULL."
    ],
    retenir: "Détecter un changement avec des NULL : IS DISTINCT FROM. Avant SQL Server 2022 : ajoute des tests IS NULL."
  },
  {
    id: "m02-q24", dialecte: "SQL Server",
    q: "Un index existe sur nom. Quel filtre permet une recherche rapide dans l'index (Index Seek) ?",
    choixCode: true,
    choix: ["LIKE '%DUP%'", "LIKE '%DUP'", "LIKE 'DUP%'", "LIKE '_UP%'"],
    bonne: 2,
    pourquoi: [
      "Non. Le début est inconnu : il faut tout lire.",
      "Non. Le début est inconnu : il faut tout lire.",
      "Oui. Le début est connu. Comme dans un dictionnaire, on va directement à « DUP ».",
      "Non. Le 1er caractère est inconnu : l'index ne peut pas servir."
    ],
    retenir: "LIKE 'début%' utilise l'index. LIKE '%…' lit tout."
  },
  {
    id: "m02-q25", dialecte: "SQL Server + Snowflake",
    q: "La colonne actif indique si le client est actif. Le filtre WHERE actif (sans = 1) est-il valide ?",
    choix: [
      "Oui partout",
      "Non sur SQL Server (type BIT, il faut = 1), oui sur Snowflake (type BOOLEAN)",
      "Oui sur SQL Server, non sur Snowflake",
      "Non partout"
    ],
    bonne: 1,
    pourquoi: [
      "Non. SQL Server n'a pas de vrai type booléen.",
      "Oui. Sur SQL Server, BIT est un nombre : écris actif = 1. Snowflake a un vrai BOOLEAN.",
      "Non. C'est l'inverse.",
      "Non. Snowflake l'accepte."
    ],
    retenir: "SQL Server : WHERE actif = 1. Snowflake : WHERE actif suffit."
  },
  {
    id: "m02-q26", dialecte: "Standard",
    q: "WHERE nom BETWEEN 'A' AND 'C' renvoie-t-il le client 'Caron' ?",
    choix: ["Oui", "Non", "Seulement si la collation ignore la casse", "Erreur : BETWEEN ne marche pas sur du texte"],
    bonne: 1,
    pourquoi: [
      "Non. Dans l'ordre alphabétique, 'Caron' vient après 'C'.",
      "Oui, il ne le renvoie pas. 'Caron' > 'C', donc il est hors de l'intervalle. Écris plutôt nom >= 'A' AND nom < 'D'.",
      "Non. La casse ne change rien ici.",
      "Non. BETWEEN marche sur du texte."
    ],
    retenir: "BETWEEN sur du texte est piégeux. Préfère >= 'A' AND < 'D'."
  },
  {
    id: "m02-q27", dialecte: "Standard",
    q: "La remise vaut 0, 5 ou NULL selon les lignes. Quelles lignes garde WHERE COALESCE(remise, 0) = 0 ?",
    choix: [
      "Seulement les remises à 0",
      "Les remises à 0 et à NULL",
      "Seulement les NULL",
      "Toutes les lignes"
    ],
    bonne: 1,
    pourquoi: [
      "Non. COALESCE transforme aussi les NULL en 0.",
      "Oui. Les NULL deviennent 0 avant la comparaison. Utile quand « pas de remise » est saisi des deux façons.",
      "Non. Les vrais 0 passent aussi.",
      "Non. La remise de 5 est exclue."
    ],
    retenir: "COALESCE(col, 0) = 0 : un seul test pour 0 et NULL. Attention : ce filtre n'utilise pas l'index."
  },
  {
    id: "m02-q28", dialecte: "Standard",
    q: "Comment le moteur lit-il WHERE NOT a = 1 AND b = 2 ?",
    choixCode: true,
    choix: [
      "NOT (a = 1 AND b = 2)",
      "(NOT a = 1) AND b = 2",
      "NOT a = (1 AND b = 2)",
      "Erreur de syntaxe"
    ],
    bonne: 1,
    pourquoi: [
      "Non. NOT ne s'applique qu'à la condition juste après lui.",
      "Oui. Priorité : NOT, puis AND, puis OR.",
      "Non. Ce n'est pas une expression valide.",
      "Non. C'est valide."
    ],
    retenir: "Priorité : NOT > AND > OR. Dans le doute, mets des parenthèses."
  },
  {
    id: "m02-q29", dialecte: "SQL Server",
    q: "Que fait cette instruction sur SQL Server ?",
    code: "SELECT *\nINTO client_copie\nFROM client\nWHERE 1 = 0;",
    choix: [
      "Une copie complète de la table",
      "Une table vide, avec les mêmes colonnes que client",
      "Une erreur : 1 = 0 est faux",
      "Elle supprime les clients"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Le filtre 1 = 0 n'est jamais vrai : aucune ligne n'est copiée.",
      "Oui. SELECT INTO crée la table. WHERE 1 = 0 ne copie aucune ligne. Attention : les index et clés ne sont pas copiés.",
      "Non. C'est un filtre valide, juste toujours faux.",
      "Non. SELECT ne supprime rien."
    ],
    retenir: "WHERE 1 = 0 : aucune ligne. Astuce pour copier seulement la structure d'une table."
  },
  {
    id: "m02-q30", dialecte: "SQL Server",
    q: "Sur SQL Server, quel motif trouve les codes article qui commencent par A ou par B ?",
    choixCode: true,
    choix: ["LIKE '(A|B)%'", "LIKE '[AB]%'", "LIKE 'A%B%'", "LIKE 'A,B%'"],
    bonne: 1,
    pourquoi: [
      "Non. LIKE ne connaît pas les expressions régulières.",
      "Oui. [AB] = un caractère, A ou B. (Snowflake ne connaît pas les crochets : utilise deux LIKE ou RLIKE.)",
      "Non. Ça cherche un A au début, puis un B plus loin.",
      "Non. Ça cherche le texte « A,B » au début."
    ],
    retenir: "SQL Server : [AB] = A ou B, [A-F] = de A à F, [^A] = tout sauf A."
  }
];
