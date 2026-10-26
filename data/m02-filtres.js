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
  },
  {
    id: "m02-q31", dialecte: "Standard",
    q: "Que renvoie SELECT * FROM client WHERE NULL = NULL; ?",
    choix: ["Toutes les lignes", "Aucune ligne", "Les lignes avec des NULL", "Une erreur"],
    bonne: 1,
    pourquoi: [
      "Non. NULL = NULL n'est pas vrai.",
      "Oui. NULL = NULL donne « inconnu ». Aucune ligne ne passe.",
      "Non.",
      "Non. C'est valide."
    ],
    retenir: "Même NULL = NULL n'est pas vrai."
  },
  {
    id: "m02-q32", dialecte: "Standard",
    q: "Pourquoi trouve-t-on souvent WHERE 1 = 1 au début des requêtes construites par programme ?",
    choix: [
      "Pour accélérer la requête",
      "Pour pouvoir ajouter chaque condition avec « AND … » sans se soucier de la première",
      "Pour forcer l'utilisation d'un index",
      "Pour éviter les NULL"
    ],
    bonne: 1,
    pourquoi: [
      "Non. L'optimiseur l'ignore : aucun effet sur la vitesse.",
      "Oui. 1 = 1 est toujours vrai. Chaque filtre ajouté commence alors par AND.",
      "Non.",
      "Non."
    ],
    retenir: "WHERE 1 = 1 : toujours vrai, pratique pour ajouter des AND."
  },
  {
    id: "m02-q33", dialecte: "Standard",
    q: "Que renvoie WHERE date_livraison <> NULL ?",
    choix: ["Les lignes avec une date", "Aucune ligne", "Toutes les lignes", "Les lignes sans date"],
    bonne: 1,
    pourquoi: [
      "Non. Pour ça, il faut IS NOT NULL.",
      "Oui. Toute comparaison avec NULL donne « inconnu ». Rien ne passe.",
      "Non.",
      "Non."
    ],
    retenir: "« A une valeur » = IS NOT NULL. Jamais <> NULL."
  },
  {
    id: "m02-q34", dialecte: "Standard",
    q: "Une ligne a pays = 'FR' et remise = NULL. Passe-t-elle WHERE pays = 'FR' OR remise > 10 ?",
    choix: ["Oui", "Non", "Seulement si remise vaut 0", "Erreur"],
    bonne: 0,
    pourquoi: [
      "Oui. VRAI OU inconnu = VRAI. Une seule condition vraie suffit avec OR.",
      "Non. Le OR est satisfait par pays = 'FR'.",
      "Non.",
      "Non."
    ],
    retenir: "VRAI OR inconnu = VRAI. FAUX OR inconnu = inconnu."
  },
  {
    id: "m02-q35", dialecte: "Standard",
    q: "Une ligne a pays = 'BE' et remise = NULL. Passe-t-elle WHERE NOT (pays = 'FR' AND remise > 10) ?",
    choix: ["Oui", "Non", "Erreur", "Ça dépend du serveur"],
    bonne: 0,
    pourquoi: [
      "Oui. pays = 'FR' est FAUX. FAUX AND inconnu = FAUX. NOT FAUX = VRAI : la ligne passe.",
      "Non. Ici, le NULL ne bloque pas, grâce au FAUX.",
      "Non.",
      "Non. C'est la logique standard."
    ],
    retenir: "FAUX AND inconnu = FAUX. La logique à 3 valeurs n'élimine pas toujours les NULL."
  },
  {
    id: "m02-q36", dialecte: "Standard",
    q: "100 lignes : 30 ont statut = 'X', 10 ont statut = NULL, le reste d'autres valeurs. Combien de lignes renvoie WHERE statut <> 'X' ?",
    choix: ["70", "60", "30", "100"],
    bonne: 1,
    pourquoi: [
      "Non. Les 10 NULL ne passent pas.",
      "Oui. 100 - 30 'X' - 10 NULL = 60. C'est pour ça que « X » + « pas X » ne fait pas 100.",
      "Non.",
      "Non."
    ],
    retenir: "= 'X' + <> 'X' ≠ total s'il y a des NULL."
  },
  {
    id: "m02-q37", dialecte: "Standard",
    q: "La ligne a id = 1. Passe-t-elle WHERE id IN (1, 2, NULL) ?",
    choix: ["Oui", "Non, le NULL bloque tout", "Erreur", "Seulement sur Snowflake"],
    bonne: 0,
    pourquoi: [
      "Oui. id = 1 est VRAI. Avec IN (donc des OR), une égalité vraie suffit.",
      "Non. Le NULL bloque seulement avec NOT IN.",
      "Non.",
      "Non."
    ],
    retenir: "IN + NULL : sans danger. NOT IN + NULL : danger."
  },
  {
    id: "m02-q38", dialecte: "Standard",
    q: "La colonne categorie vaut NULL. La ligne passe-t-elle WHERE categorie NOT IN ('A', 'B') ?",
    choix: ["Oui", "Non", "Erreur", "Seulement si la liste est vide"],
    bonne: 1,
    pourquoi: [
      "Non. NULL <> 'A' donne « inconnu ».",
      "Oui, elle ne passe pas. Pour la garder : OR categorie IS NULL.",
      "Non.",
      "Non."
    ],
    retenir: "NOT IN exclut aussi les lignes où la colonne est NULL."
  },
  {
    id: "m02-q39", dialecte: "Standard",
    q: "Que deviennent les lignes où nom est NULL avec WHERE nom NOT LIKE 'A%' ?",
    choix: ["Elles passent", "Elles sont exclues", "Erreur", "Elles passent sur SQL Server"],
    bonne: 1,
    pourquoi: [
      "Non. NULL LIKE … donne « inconnu », et NOT inconnu reste inconnu.",
      "Oui. Comme pour <>, les NULL sont éliminés.",
      "Non.",
      "Non. Même règle partout."
    ],
    retenir: "LIKE et NOT LIKE excluent les NULL."
  },
  {
    id: "m02-q40", dialecte: "SQL Server + Snowflake",
    q: "Tu cherches les libellés qui contiennent vraiment « 50% ». Quel filtre ?",
    choixCode: true,
    choix: [
      "LIKE '%50%%'",
      "LIKE '%50!%%' ESCAPE '!'",
      "LIKE '50%'",
      "= '%50%%'"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Le 2e % est un joker : ça trouve tout ce qui contient « 50 ».",
      "Oui. ESCAPE '!' : le % qui suit ! devient un vrai caractère. Marche sur les deux moteurs.",
      "Non. Ça cherche ce qui commence par 50.",
      "Non. = ne connaît pas les jokers."
    ],
    retenir: "Chercher un vrai % ou _ : ESCAPE."
  },
  {
    id: "m02-q41", dialecte: "Snowflake",
    q: "Sur Snowflake, comment vérifier qu'un code a le format 3 lettres + 4 chiffres (ex. PIS1234) ?",
    choixCode: true,
    choix: [
      "code LIKE '[A-Z]{3}[0-9]{4}'",
      "REGEXP_LIKE(code, '[A-Z]{3}[0-9]{4}')",
      "code = 'AAA9999'",
      "ISNUMERIC(code)"
    ],
    bonne: 1,
    pourquoi: [
      "Non. LIKE ne connaît pas les expressions régulières.",
      "Oui. REGEXP_LIKE (ou RLIKE) teste une expression régulière. Sur Snowflake, le motif doit couvrir tout le texte.",
      "Non. Ça cherche ce texte exact.",
      "Non. ISNUMERIC n'existe pas sur Snowflake, et ne teste pas un format."
    ],
    retenir: "Snowflake : REGEXP_LIKE / RLIKE pour valider un format."
  },
  {
    id: "m02-q42", dialecte: "SQL Server",
    q: "Sur SQL Server (sans regex), quel motif vérifie 3 lettres puis 4 chiffres ?",
    choixCode: true,
    choix: [
      "LIKE '[A-Z]{3}[0-9]{4}'",
      "LIKE '[A-Z][A-Z][A-Z][0-9][0-9][0-9][0-9]'",
      "LIKE 'AAA9999'",
      "LIKE '___####'"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Les {3} ne sont pas compris par LIKE.",
      "Oui. Une classe [ ] par caractère. Attention : en collation CI, [A-Z] accepte aussi les minuscules.",
      "Non. Ça cherche ce texte exact.",
      "Non. # n'est pas un joker de LIKE."
    ],
    retenir: "LIKE SQL Server : une classe [ ] par caractère."
  },
  {
    id: "m02-q43", dialecte: "SQL Server",
    q: "Comment trouver les codes postaux qui contiennent autre chose que des chiffres ?",
    choixCode: true,
    choix: [
      "WHERE code_postal LIKE '%[0-9]%'",
      "WHERE code_postal LIKE '%[^0-9]%'",
      "WHERE code_postal NOT LIKE '[0-9]'",
      "WHERE ISNUMERIC(code_postal) = 1"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Ça trouve ceux qui contiennent AU MOINS un chiffre.",
      "Oui. [^0-9] = un caractère qui n'est pas un chiffre. Parfait pour contrôler un import (ex. '2A004', '69 110').",
      "Non. Ce motif ne vérifie qu'un seul caractère.",
      "Non. ISNUMERIC = 1 trouve plutôt ceux qui « ressemblent » à des nombres, et il est peu fiable."
    ],
    retenir: "[^…] = tout sauf. LIKE '%[^0-9]%' = contient un non-chiffre."
  },
  {
    id: "m02-q44", dialecte: "SQL Server",
    q: "Que renvoie PATINDEX('%[0-9]%', 'ABC123') ?",
    choix: ["0", "3", "4", "123"],
    bonne: 2,
    pourquoi: [
      "Non. 0 voudrait dire « pas trouvé ».",
      "Non. Le 3e caractère est C.",
      "Oui. PATINDEX donne la position du 1er caractère qui correspond au motif : le 1 est en 4e position.",
      "Non. PATINDEX renvoie une position, pas le texte."
    ],
    retenir: "PATINDEX = CHARINDEX avec des jokers LIKE."
  },
  {
    id: "m02-q45", dialecte: "Standard",
    q: "date_cde est de type DATE (sans heure). WHERE date_cde BETWEEN '20260101' AND '20260131' prend-il tout janvier ?",
    choix: ["Oui", "Non, le 31 est exclu", "Non, le 1er est exclu", "Erreur"],
    bonne: 0,
    pourquoi: [
      "Oui. Sans heure, pas de piège : le 31 vaut exactement '20260131'. Le piège existe seulement avec DATETIME.",
      "Non. BETWEEN inclut les bornes.",
      "Non.",
      "Non."
    ],
    retenir: "BETWEEN sur DATE : OK. Sur DATETIME : préfère >= et <."
  },
  {
    id: "m02-q46", dialecte: "Standard",
    q: "Quelles quantités garde WHERE qte NOT BETWEEN 10 AND 20 ?",
    choix: ["De 11 à 19", "Inférieures à 10 ou supérieures à 20", "10 et 20 seulement", "Inférieures ou égales à 10"],
    bonne: 1,
    pourquoi: [
      "Non. C'est l'intérieur de l'intervalle, sans les bornes.",
      "Oui. NOT BETWEEN = qte < 10 OR qte > 20. Les bornes 10 et 20 sont exclues.",
      "Non.",
      "Non."
    ],
    retenir: "NOT BETWEEN a AND b = < a OR > b."
  },
  {
    id: "m02-q47", dialecte: "SQL Server",
    q: "Une appli génère WHERE code IN ('A1', 'A2', … 5 000 valeurs). Quel est le problème, et la solution ?",
    choix: [
      "Aucun problème",
      "Compilation lente et plan difficile : mettre les valeurs dans une table temporaire et faire une jointure",
      "IN est limité à 10 valeurs",
      "Il faut remplacer IN par LIKE"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Une liste énorme pèse sur la compilation et sur l'estimation.",
      "Oui. Table temporaire (ou paramètre table) + JOIN ou EXISTS : plus rapide et plus propre.",
      "Non. Il n'y a pas de limite à 10.",
      "Non."
    ],
    retenir: "Très longue liste IN : passe par une table + JOIN."
  },
  {
    id: "m02-q48", dialecte: "Standard",
    q: "La sous-requête de WHERE client_id IN (SELECT client_id FROM commande) renvoie 5 fois le client 42. Le client 42 apparaît combien de fois ?",
    choix: ["1 fois", "5 fois", "0 fois", "Erreur"],
    bonne: 0,
    pourquoi: [
      "Oui. IN teste seulement « est dans la liste ». Les doublons de la liste ne dupliquent rien.",
      "Non. C'est ce que ferait une jointure.",
      "Non.",
      "Non."
    ],
    retenir: "IN / EXISTS ne créent pas de doublons. JOIN, oui."
  },
  {
    id: "m02-q49", dialecte: "SQL Server",
    q: "Une procédure filtre avec WHERE (@pays IS NULL OR pays = @pays). Quel est le risque ?",
    choix: [
      "Erreur de syntaxe",
      "Un seul plan pour tous les cas : souvent mauvais. OPTION (RECOMPILE) aide",
      "Le filtre ne marche pas",
      "Les NULL sont doublés"
    ],
    bonne: 1,
    pourquoi: [
      "Non. C'est valide.",
      "Oui. C'est la requête « fourre-tout ». Le plan prévu pour « tous les pays » est mauvais pour « un pays ». RECOMPILE crée un plan adapté à chaque appel.",
      "Non. Le résultat est juste. C'est la performance qui souffre.",
      "Non."
    ],
    retenir: "Filtre optionnel (@p IS NULL OR col = @p) : pense à OPTION (RECOMPILE)."
  },
  {
    id: "m02-q50", dialecte: "SQL Server",
    q: "date_cde est un DATETIME. Comment filtrer les commandes des 30 derniers jours (jusqu'à maintenant) ?",
    choixCode: true,
    choix: [
      "WHERE DATEDIFF(day, date_cde, GETDATE()) <= 30",
      "WHERE date_cde >= DATEADD(day, -30, GETDATE())",
      "WHERE date_cde = GETDATE() - 30",
      "WHERE date_cde BETWEEN 30 AND GETDATE()"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Le résultat est proche, mais la fonction autour de la colonne empêche l'index.",
      "Oui. Le calcul est fait sur la valeur, la colonne reste nue.",
      "Non. = cherche un instant précis.",
      "Non. 30 n'est pas une date."
    ],
    retenir: "Fenêtre glissante : col >= DATEADD(…, GETDATE())."
  },
  {
    id: "m02-q51", dialecte: "SQL Server",
    q: "Comment calculer le 1er jour du mois en cours sur SQL Server (avant 2022) ?",
    choixCode: true,
    choix: [
      "DATEFROMPARTS(YEAR(GETDATE()), MONTH(GETDATE()), 1)",
      "DATE_TRUNC('month', GETDATE())",
      "EOMONTH(GETDATE())",
      "DAY(GETDATE()) = 1"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. On recompose une date avec le jour 1. Filtre du mois : >= cette date AND < DATEADD(month, 1, cette date).",
      "Non. C'est Snowflake. (SQL Server 2022 a DATETRUNC.)",
      "Non. C'est le dernier jour du mois.",
      "Non. C'est un test, pas une date."
    ],
    retenir: "1er du mois : DATEFROMPARTS(année, mois, 1)."
  },
  {
    id: "m02-q52", dialecte: "SQL Server",
    q: "date_cde est un DATETIME indexé. WHERE CAST(date_cde AS date) = '20261026' peut-il utiliser l'index (Seek) ?",
    choix: [
      "Non, jamais : c'est une fonction sur la colonne",
      "Oui : c'est une exception que SQL Server sait optimiser",
      "Seulement sur Snowflake",
      "Seulement avec NOLOCK"
    ],
    bonne: 1,
    pourquoi: [
      "Non. En général oui, mais CAST de DATETIME vers DATE est un cas spécial.",
      "Oui. SQL Server transforme ce filtre en plage. Les autres fonctions (YEAR, CONVERT…) n'ont pas cette chance.",
      "Non. Snowflake n'a pas d'index.",
      "Non."
    ],
    retenir: "Exception utile : CAST(datetime AS date) = … reste SARGable sur SQL Server."
  },
  {
    id: "m02-q53", dialecte: "SQL Server",
    q: "Comment simplifier WHERE ISNULL(statut, '') = 'OK' ?",
    choixCode: true,
    choix: ["WHERE statut = 'OK'", "WHERE statut IS NULL", "WHERE statut <> ''", "Impossible"],
    bonne: 0,
    pourquoi: [
      "Oui. Une ligne NULL ne peut pas valoir 'OK'. Le ISNULL ne sert à rien, et il empêche l'index.",
      "Non. Ça cherche les NULL.",
      "Non.",
      "Non."
    ],
    retenir: "ISNULL inutile dans un test d'égalité avec une valeur précise."
  },
  {
    id: "m02-q54", dialecte: "Standard",
    q: "Quel filtre est équivalent à WHERE montant * 1.2 > 1200, tout en laissant la colonne « nue » ?",
    choixCode: true,
    choix: ["WHERE montant > 1200 / 1.2", "WHERE montant > 1200 * 1.2", "WHERE montant * 1.2 >= 1200", "WHERE ROUND(montant, 0) > 1000"],
    bonne: 0,
    pourquoi: [
      "Oui. On divise des deux côtés : montant > 1000. L'index sur montant peut servir.",
      "Non. Ça donne montant > 1440.",
      "Non. La colonne reste dans un calcul (et >= change le sens).",
      "Non. Fonction sur la colonne."
    ],
    retenir: "Déplace les calculs du côté de la valeur."
  },
  {
    id: "m02-q55", dialecte: "Standard",
    q: "Comment réécrire WHERE LEFT(code, 3) = 'PIS' pour profiter de l'index ?",
    choixCode: true,
    choix: ["WHERE code LIKE 'PIS%'", "WHERE code LIKE '%PIS%'", "WHERE code = 'PIS'", "WHERE RIGHT(code, 3) = 'PIS'"],
    bonne: 0,
    pourquoi: [
      "Oui. Même sens, et le début connu permet un Index Seek.",
      "Non. Ça cherche PIS n'importe où.",
      "Non. Ça cherche le code exact 'PIS'.",
      "Non. Ça regarde la fin."
    ],
    retenir: "LEFT(col, n) = 'x' → col LIKE 'x%'."
  },
  {
    id: "m02-q56", dialecte: "SQL Server",
    q: "La base est en collation CI (insensible à la casse). Que penser de WHERE UPPER(nom) = 'DUPONT' ?",
    choix: [
      "C'est nécessaire pour trouver 'Dupont'",
      "C'est inutile (la comparaison ignore déjà la casse) et ça empêche l'index",
      "C'est plus rapide",
      "C'est une erreur"
    ],
    bonne: 1,
    pourquoi: [
      "Non. En CI, nom = 'DUPONT' trouve déjà 'Dupont'.",
      "Oui. Supprime le UPPER. (Sur Snowflake, sensible à la casse, il serait utile.)",
      "Non. Une fonction sur la colonne ralentit.",
      "Non."
    ],
    retenir: "Connais ta collation avant d'ajouter UPPER / LOWER."
  },
  {
    id: "m02-q57", dialecte: "SQL Server",
    q: "Une appli envoie N'C001' (NVARCHAR) pour filtrer une colonne code en VARCHAR, indexée. Quel risque ?",
    choix: [
      "Aucun",
      "SQL Server convertit la colonne en NVARCHAR : l'index peut être mal utilisé",
      "Erreur de type",
      "Les accents sont perdus"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Le type le plus fort (NVARCHAR) l'emporte : la COLONNE est convertie.",
      "Oui. Problème classique de performance avec les ORM. Le plan montre CONVERT_IMPLICIT. Aligne les types.",
      "Non. La conversion est automatique.",
      "Non."
    ],
    retenir: "Paramètre NVARCHAR sur colonne VARCHAR = conversion implicite de la colonne."
  },
  {
    id: "m02-q58", dialecte: "SQL Server",
    q: "La base est en CI. Comment trouver uniquement 'dupont' en minuscules, pas 'DUPONT' ?",
    choixCode: true,
    choix: [
      "WHERE nom = 'dupont'",
      "WHERE nom = 'dupont' COLLATE French_CS_AS",
      "WHERE LOWER(nom) = 'dupont'",
      "WHERE nom LIKE 'dupont'"
    ],
    bonne: 1,
    pourquoi: [
      "Non. En CI, 'DUPONT' passe aussi.",
      "Oui. COLLATE impose une comparaison sensible à la casse (CS), juste pour ce test.",
      "Non. LOWER('DUPONT') = 'dupont' : 'DUPONT' passe aussi.",
      "Non. LIKE suit la même collation CI."
    ],
    retenir: "COLLATE … CS pour une comparaison sensible à la casse ponctuelle."
  },
  {
    id: "m02-q59", dialecte: "SQL Server",
    q: "Collation French_CI_AS. WHERE prenom = 'Helene' trouve-t-il 'Hélène' ?",
    choix: ["Oui", "Non", "Seulement en majuscules", "Erreur"],
    bonne: 1,
    pourquoi: [
      "Non. AS = Accent Sensitive : é ≠ e.",
      "Oui, il ne le trouve pas. Avec une collation AI (Accent Insensitive), il le trouverait.",
      "Non.",
      "Non."
    ],
    retenir: "CI/CS = casse. AI/AS = accents. French_CI_AS : casse ignorée, accents comptés."
  },
  {
    id: "m02-q60", dialecte: "Snowflake",
    q: "Sur Snowflake, quelle fonction renvoie VRAI quand deux valeurs sont égales, y compris quand les deux sont NULL ?",
    choixCode: true,
    choix: ["EQUAL_NULL(a, b)", "a = b", "NULLIF(a, b)", "COALESCE(a, b)"],
    bonne: 0,
    pourquoi: [
      "Oui. EQUAL_NULL traite NULL comme une valeur. Équivalent : a IS NOT DISTINCT FROM b.",
      "Non. NULL = NULL donne « inconnu ».",
      "Non. NULLIF renvoie une valeur, pas un booléen.",
      "Non."
    ],
    retenir: "Snowflake : EQUAL_NULL(a, b) = égalité qui gère les NULL."
  },
  {
    id: "m02-q61", dialecte: "SQL Server + Snowflake",
    q: "WHERE montant > ALL (SELECT montant FROM commande WHERE pays = 'BE') veut dire…",
    choix: [
      "Supérieur à au moins une commande belge",
      "Supérieur à la plus grosse commande belge",
      "Supérieur à la moyenne belge",
      "Erreur"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Ça, c'est > ANY.",
      "Oui. Supérieur à TOUTES les valeurs = supérieur au maximum.",
      "Non.",
      "Non. ALL existe sur les deux moteurs."
    ],
    retenir: "> ALL = > MAX. > ANY = > MIN."
  },
  {
    id: "m02-q62", dialecte: "Standard",
    q: "Aucune commande belge n'existe. Que renvoie WHERE montant > ALL (SELECT montant FROM commande WHERE pays = 'BE') ?",
    choix: ["Aucune ligne", "Toutes les lignes", "Une erreur", "NULL"],
    bonne: 1,
    pourquoi: [
      "Non. Piège : c'est l'inverse.",
      "Oui. « Plus grand que tous les éléments d'une liste vide » est vrai (rien ne le contredit). Toutes les lignes passent.",
      "Non.",
      "Non."
    ],
    retenir: "> ALL (liste vide) = VRAI pour tout le monde."
  },
  {
    id: "m02-q63", dialecte: "Standard",
    q: "WHERE pays = ANY (SELECT pays FROM zone_export) est équivalent à…",
    choixCode: true,
    choix: ["WHERE pays IN (SELECT pays FROM zone_export)", "WHERE pays = ALL (…)", "WHERE pays NOT IN (…)", "WHERE EXISTS (SELECT 1)"],
    bonne: 0,
    pourquoi: [
      "Oui. Égal à au moins une valeur = IN.",
      "Non. = ALL voudrait dire égal à toutes les valeurs.",
      "Non.",
      "Non."
    ],
    retenir: "= ANY = IN."
  },
  {
    id: "m02-q64", dialecte: "SQL Server",
    q: "Sur SQL Server, la condition '   ' = '' (3 espaces contre texte vide) est-elle vraie ?",
    choix: ["Oui", "Non", "Erreur", "NULL"],
    bonne: 0,
    pourquoi: [
      "Oui. SQL Server ignore les espaces de fin : '   ' devient '' pour la comparaison.",
      "Non sur SQL Server. (Oui sur Snowflake.)",
      "Non.",
      "Non."
    ],
    retenir: "SQL Server : WHERE col = '' trouve aussi les textes faits seulement d'espaces."
  },
  {
    id: "m02-q65", dialecte: "Snowflake",
    q: "Sur Snowflake, comment trouver les références vides OU faites seulement d'espaces ?",
    choixCode: true,
    choix: ["WHERE ref = ''", "WHERE TRIM(ref) = ''", "WHERE ref IS NULL", "WHERE LEN(ref) = 0"],
    bonne: 1,
    pourquoi: [
      "Non. Sur Snowflake, '   ' ≠ ''.",
      "Oui. TRIM retire les espaces, puis on compare au vide.",
      "Non. Ça trouve les NULL.",
      "Non. Les espaces comptent dans la longueur."
    ],
    retenir: "Snowflake : TRIM(col) = '' pour les « blancs »."
  },
  {
    id: "m02-q66", dialecte: "SQL Server + Snowflake",
    q: "Quel test trouve en une fois les références NULL, vides ou faites seulement d'espaces ?",
    choixCode: true,
    choix: [
      "WHERE ref IS NULL",
      "WHERE NULLIF(TRIM(ref), '') IS NULL",
      "WHERE ref = ''",
      "WHERE TRIM(ref) IS NULL"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Oublie les vides.",
      "Oui. TRIM enlève les espaces, NULLIF transforme '' en NULL : il ne reste qu'un test IS NULL.",
      "Non. Oublie les NULL.",
      "Non. TRIM('') donne '', pas NULL."
    ],
    retenir: "NULLIF(TRIM(col), '') IS NULL = NULL, vide ou blanc."
  },
  {
    id: "m02-q67", dialecte: "SQL Server + Snowflake",
    q: "Une appli génère WHERE id IN () quand la liste est vide. Que se passe-t-il ?",
    choix: ["0 ligne", "Toutes les lignes", "Erreur de syntaxe", "NULL"],
    bonne: 2,
    pourquoi: [
      "Non. La requête ne s'exécute pas.",
      "Non.",
      "Oui. IN exige au moins une valeur. L'appli doit gérer le cas « liste vide ».",
      "Non."
    ],
    retenir: "IN () vide = erreur. À gérer avant d'envoyer la requête."
  },
  {
    id: "m02-q68", dialecte: "Standard",
    q: "WHERE NOT statut IN ('A', 'B') est-il équivalent à WHERE statut NOT IN ('A', 'B') ?",
    choix: ["Oui", "Non", "Seulement sans NULL", "Erreur"],
    bonne: 0,
    pourquoi: [
      "Oui. Les deux écritures sont équivalentes, NULL compris.",
      "Non.",
      "Non. Le comportement avec NULL est le même dans les deux cas.",
      "Non. Les deux sont valides."
    ],
    retenir: "NOT x IN (…) = x NOT IN (…). Préfère la 2e : plus lisible."
  },
  {
    id: "m02-q69", dialecte: "Standard",
    q: "montant_txt est un VARCHAR. Une ligne contient '99'. Passe-t-elle WHERE montant_txt > '100' ?",
    choix: ["Non, 99 < 100", "Oui, car en texte '9' > '1'", "Erreur", "Seulement sur Snowflake"],
    bonne: 1,
    pourquoi: [
      "Non. Ce serait vrai pour des nombres.",
      "Oui. Comparaison de texte, caractère par caractère : '9' > '1'. Convertis : TRY_CAST(montant_txt AS decimal(10,2)) > 100.",
      "Non.",
      "Non. Même règle partout."
    ],
    retenir: "Nombres en texte = comparaisons fausses. Convertis avant de comparer."
  },
  {
    id: "m02-q70", dialecte: "SQL Server",
    q: "Quel filtre est équivalent à WHERE CHARINDEX('PISC', libelle) > 0 ?",
    choixCode: true,
    choix: ["WHERE libelle LIKE 'PISC%'", "WHERE libelle LIKE '%PISC%'", "WHERE libelle = 'PISC'", "WHERE libelle LIKE '%PISC'"],
    bonne: 1,
    pourquoi: [
      "Non. Ça demande que le libellé commence par PISC.",
      "Oui. CHARINDEX > 0 = « contient ». Les deux lisent toute la table.",
      "Non.",
      "Non. Ça demande que le libellé finisse par PISC."
    ],
    retenir: "« Contient » : LIKE '%x%' ou CHARINDEX(x, col) > 0."
  },
  {
    id: "m02-q71", dialecte: "Snowflake",
    q: "Sur Snowflake, quelle fonction teste qu'un code commence par 'PIS' ?",
    choixCode: true,
    choix: ["STARTSWITH(code, 'PIS')", "BEGINS(code, 'PIS')", "LEFTWITH(code, 'PIS')", "PREFIX(code) = 'PIS'"],
    bonne: 0,
    pourquoi: [
      "Oui. STARTSWITH (et ENDSWITH, CONTAINS) existent sur Snowflake. LIKE 'PIS%' marche aussi.",
      "Non. Cette fonction n'existe pas.",
      "Non.",
      "Non."
    ],
    retenir: "Snowflake : STARTSWITH, ENDSWITH, CONTAINS."
  },
  {
    id: "m02-q72", dialecte: "SQL Server + Snowflake",
    q: "WHERE (societe, num_cde) IN ((1, 'C100'), (2, 'C200')) est-il valide ?",
    choix: [
      "Oui partout",
      "Oui sur Snowflake, non sur SQL Server",
      "Non partout",
      "Oui sur SQL Server, non sur Snowflake"
    ],
    bonne: 1,
    pourquoi: [
      "Non. SQL Server ne connaît pas les IN sur plusieurs colonnes.",
      "Oui. Sur SQL Server : (societe = 1 AND num_cde = 'C100') OR (…), ou EXISTS avec une table VALUES.",
      "Non. Snowflake l'accepte.",
      "Non. C'est l'inverse."
    ],
    retenir: "IN sur plusieurs colonnes : Snowflake oui, SQL Server non (EXISTS)."
  },
  {
    id: "m02-q73", dialecte: "Standard",
    q: "poids est un FLOAT calculé (0.1 + 0.2). WHERE poids = 0.3 le trouve-t-il ?",
    choix: ["Oui, toujours", "Pas forcément : FLOAT est approximatif", "Erreur", "Seulement en DECIMAL"],
    bonne: 1,
    pourquoi: [
      "Non. 0.1 + 0.2 en FLOAT donne 0.30000000000000004.",
      "Oui. Avec FLOAT, compare avec une tolérance : ABS(poids - 0.3) < 0.0001. Ou utilise DECIMAL.",
      "Non.",
      "Non. La question porte sur FLOAT."
    ],
    retenir: "Jamais d'égalité stricte sur un FLOAT."
  },
  {
    id: "m02-q74", dialecte: "Standard",
    q: "Mettre la condition la plus sélective en premier dans le WHERE accélère-t-il la requête ?",
    choix: ["Oui, toujours", "Non, l'optimiseur choisit lui-même l'ordre", "Oui, sur SQL Server", "Oui, avec OR"],
    bonne: 1,
    pourquoi: [
      "Non. C'est un mythe.",
      "Oui. L'optimiseur réorganise les conditions. Écris dans l'ordre le plus lisible.",
      "Non.",
      "Non."
    ],
    retenir: "L'ordre des conditions dans WHERE : pour la lisibilité, pas pour la vitesse."
  },
  {
    id: "m02-q75", dialecte: "SQL Server",
    q: "WHERE client_id = 42 OR commercial_id = 7, avec un index sur chaque colonne, est lent. Quelle réécriture aide souvent ?",
    choix: [
      "Ajouter DISTINCT",
      "Deux requêtes (une par condition) assemblées avec UNION",
      "Remplacer OR par AND",
      "Ajouter NOLOCK"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Ça n'aide pas.",
      "Oui. Chaque requête utilise son index (Seek). UNION retire les lignes présentes dans les deux.",
      "Non. Ça change le sens.",
      "Non."
    ],
    retenir: "OR sur deux colonnes différentes : pense UNION."
  },
  {
    id: "m02-q76", dialecte: "SQL Server",
    q: "date_cde est une DATE. Comment garder seulement les commandes passées le dernier jour d'un mois ?",
    choixCode: true,
    choix: [
      "WHERE DAY(date_cde) = 31",
      "WHERE date_cde = EOMONTH(date_cde)",
      "WHERE date_cde = EOMONTH(GETDATE())",
      "WHERE MONTH(date_cde) = 12"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Février, avril, juin… n'ont pas de 31.",
      "Oui. On compare chaque date à la fin de SON mois.",
      "Non. Seulement le dernier jour du mois en cours.",
      "Non. Ça garde tout décembre."
    ],
    retenir: "Fin de mois : date = EOMONTH(date)."
  },
  {
    id: "m02-q77", dialecte: "SQL Server",
    q: "WHERE DATENAME(weekday, date_cde) IN ('Saturday', 'Sunday') ne trouve rien sur ton serveur. Pourquoi ?",
    choix: [
      "Personne ne commande le week-end",
      "DATENAME dépend de la langue : en français, il renvoie 'samedi', 'dimanche'",
      "DATENAME n'existe pas",
      "Il faut des majuscules"
    ],
    bonne: 1,
    pourquoi: [
      "Non. C'est un problème technique.",
      "Oui. Le résultat dépend de la langue de la session. Code fragile !",
      "Non.",
      "Non."
    ],
    retenir: "DATENAME / DATEPART(weekday) dépendent des réglages. Préfère une table calendrier."
  },
  {
    id: "m02-q78", dialecte: "SQL Server",
    q: "date_cde est un DATETIME. Comment garder les commandes passées entre 8 h et midi, quel que soit le jour ?",
    choixCode: true,
    choix: [
      "WHERE date_cde BETWEEN '08:00' AND '12:00'",
      "WHERE CAST(date_cde AS time) >= '08:00' AND CAST(date_cde AS time) < '12:00'",
      "WHERE HOUR(date_cde) = 8",
      "WHERE date_cde LIKE '%08:%'"
    ],
    bonne: 1,
    pourquoi: [
      "Non. '08:00' seul est lu comme le 1er janvier 1900 à 8 h.",
      "Oui. On extrait l'heure (type TIME), puis on compare.",
      "Non. HOUR n'existe pas sur SQL Server (DATEPART(hour, …)), et 8 h seulement.",
      "Non. Conversion en texte : fragile et lent."
    ],
    retenir: "Heure de la journée : CAST(col AS time)."
  },
  {
    id: "m02-q79", dialecte: "SQL Server",
    q: "Comment filtrer les commandes de l'année en cours, sans écrire l'année en dur ?",
    choixCode: true,
    choix: [
      "WHERE date_cde >= DATEFROMPARTS(YEAR(GETDATE()), 1, 1)",
      "WHERE YEAR(date_cde) = 2026",
      "WHERE date_cde >= '20260101'",
      "WHERE date_cde = YEAR(GETDATE())"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Le 1er janvier de l'année en cours est calculé. La requête marchera encore l'an prochain.",
      "Non. Année en dur, et fonction sur la colonne.",
      "Non. Année en dur : la requête sera fausse en 2027.",
      "Non. On compare une date à un nombre."
    ],
    retenir: "Pas de date en dur dans un rapport récurrent."
  },
  {
    id: "m02-q80", dialecte: "Snowflake",
    q: "Sur Snowflake, comment filtrer depuis le 1er janvier de l'année en cours ?",
    choixCode: true,
    choix: [
      "WHERE date_cde >= DATE_TRUNC('year', CURRENT_DATE)",
      "WHERE date_cde >= DATEFROMPARTS(YEAR(GETDATE()), 1, 1)",
      "WHERE YEAR(date_cde) = YEAR()",
      "WHERE date_cde >= 'YEAR'"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. DATE_TRUNC coupe la date au début de l'année.",
      "Non. Syntaxe SQL Server. (DATE_FROM_PARTS existe sur Snowflake, avec des _.)",
      "Non.",
      "Non."
    ],
    retenir: "Snowflake : DATE_TRUNC('year' | 'month' | 'week', CURRENT_DATE)."
  },
  {
    id: "m02-q81", dialecte: "Standard",
    q: "La table tarif a date_debut et date_fin (NULL = toujours valide). Quel filtre donne les tarifs valides à la date @d ?",
    choixCode: true,
    choix: [
      "WHERE @d BETWEEN date_debut AND date_fin",
      "WHERE date_debut <= @d AND (date_fin IS NULL OR date_fin >= @d)",
      "WHERE date_debut = @d",
      "WHERE date_fin IS NULL"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Les tarifs sans date de fin (NULL) sont exclus.",
      "Oui. Commencé avant @d, et pas encore fini (ou sans fin).",
      "Non. Seulement ceux qui commencent ce jour-là.",
      "Non. Oublie les tarifs avec une date de fin future."
    ],
    retenir: "Validité : début <= @d AND (fin IS NULL OR fin >= @d)."
  },
  {
    id: "m02-q82", dialecte: "Standard",
    q: "Deux périodes [debut1, fin1] et [debut2, fin2]. Quand se chevauchent-elles ?",
    choixCode: true,
    choix: [
      "debut1 = debut2",
      "debut1 <= fin2 AND debut2 <= fin1",
      "debut1 BETWEEN debut2 AND fin2",
      "fin1 = fin2"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Trop restrictif.",
      "Oui. Chacune commence avant que l'autre finisse. Couvre tous les cas, y compris une période incluse dans l'autre.",
      "Non. Rate le cas où la période 2 commence pendant la période 1.",
      "Non."
    ],
    retenir: "Chevauchement : début1 <= fin2 AND début2 <= fin1."
  },
  {
    id: "m02-q83", dialecte: "Standard",
    q: "@max vaut NULL. Que renvoie WHERE montant BETWEEN @min AND @max ?",
    choix: ["Tout ce qui est >= @min", "Aucune ligne", "Toutes les lignes", "Une erreur"],
    bonne: 1,
    pourquoi: [
      "Non. montant <= NULL est inconnu.",
      "Oui. Une borne NULL rend tout le BETWEEN inconnu. Gère le cas : (@max IS NULL OR montant <= @max).",
      "Non.",
      "Non."
    ],
    retenir: "Une borne NULL dans BETWEEN = 0 ligne."
  },
  {
    id: "m02-q84", dialecte: "SQL Server + Snowflake",
    q: "Comment trouver les lignes importées dont qte_txt n'est pas un nombre valide ?",
    choixCode: true,
    choix: [
      "WHERE TRY_CAST(qte_txt AS int) IS NULL AND qte_txt IS NOT NULL",
      "WHERE CAST(qte_txt AS int) IS NULL",
      "WHERE qte_txt NOT LIKE '%'",
      "WHERE qte_txt IS NULL"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. TRY_CAST donne NULL si la conversion échoue. On exclut les valeurs déjà NULL au départ.",
      "Non. CAST plante dès la 1re valeur invalide.",
      "Non. Toujours faux sauf pour NULL.",
      "Non. Ça trouve les vides, pas les invalides."
    ],
    retenir: "Contrôle d'import : TRY_CAST(col AS type) IS NULL AND col IS NOT NULL."
  },
  {
    id: "m02-q85", dialecte: "SQL Server",
    q: "ISNUMERIC('$') renvoie 1. Pourquoi ne pas utiliser ISNUMERIC pour contrôler des montants ?",
    choix: [
      "C'est un bug corrigé",
      "ISNUMERIC accepte des valeurs non convertibles ('$', '-', '1e5', '.') : préfère TRY_CAST",
      "ISNUMERIC est trop lent",
      "ISNUMERIC n'accepte que des entiers"
    ],
    bonne: 1,
    pourquoi: [
      "Non. C'est le comportement normal, documenté.",
      "Oui. ISNUMERIC répond « convertible vers AU MOINS un type numérique ». Pas fiable pour un DECIMAL précis.",
      "Non.",
      "Non."
    ],
    retenir: "ISNUMERIC = piège. TRY_CAST vers le type voulu = fiable."
  },
  {
    id: "m02-q86", dialecte: "Standard",
    q: "Comment trouver les noms qui contiennent une apostrophe (ex. L'Isle) ?",
    choixCode: true,
    choix: ["LIKE '%'%'", "LIKE '%''%'", "LIKE \"%'%\"", "LIKE '%\\'%'"],
    bonne: 1,
    pourquoi: [
      "Non. L'apostrophe ferme le texte : erreur.",
      "Oui. Deux apostrophes = une vraie apostrophe, même dans un motif LIKE.",
      "Non. Les guillemets doubles désignent un nom de colonne.",
      "Non sur SQL Server : l'antislash n'échappe rien."
    ],
    retenir: "Apostrophe dans un motif : on la double aussi."
  },
  {
    id: "m02-q87", dialecte: "Snowflake",
    q: "Sur Snowflake, comment trouver les noms qui commencent par « dup » OU « mar », sans tenir compte de la casse, en une seule condition ?",
    choixCode: true,
    choix: [
      "nom ILIKE ANY ('dup%', 'mar%')",
      "nom ILIKE ('dup%', 'mar%')",
      "nom IN ILIKE ('dup%', 'mar%')",
      "nom LIKE '[dm][ua][pr]%'"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. LIKE ANY / ILIKE ANY : correspond à au moins un des motifs.",
      "Non. Il manque ANY.",
      "Non. Syntaxe invalide.",
      "Non. Snowflake ne connaît pas les crochets dans LIKE."
    ],
    retenir: "Snowflake : ILIKE ANY ('motif1', 'motif2')."
  },
  {
    id: "m02-q88", dialecte: "SQL Server",
    q: "Une vieille procédure utilise WHERE col = NULL et ça « marche ». Pourquoi ?",
    choix: [
      "C'est normal",
      "Elle a été créée avec SET ANSI_NULLS OFF, un réglage obsolète",
      "C'est un bug de SQL Server",
      "La colonne est NOT NULL"
    ],
    bonne: 1,
    pourquoi: [
      "Non. En standard, = NULL ne marche jamais.",
      "Oui. Avec ANSI_NULLS OFF, = NULL se comporte comme IS NULL. Obsolète : corrige en IS NULL.",
      "Non.",
      "Non."
    ],
    retenir: "= NULL qui « marche » = ANSI_NULLS OFF. À corriger."
  },
  {
    id: "m02-q89", dialecte: "Standard",
    q: "Quel est le défaut de WHERE COALESCE(a.ref, '') = COALESCE(b.ref, '') pour comparer deux colonnes ?",
    choix: [
      "Aucun",
      "Il confond NULL et '', et il empêche l'utilisation des index",
      "Il plante si les deux sont NULL",
      "Il ignore la casse"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Un NULL et un vide deviennent « égaux ». Préfère IS NOT DISTINCT FROM, ou des tests IS NULL explicites.",
      "Non. Deux NULL deviennent '' = '' : vrai.",
      "Non. La casse dépend de la collation."
    ],
    retenir: "COALESCE des deux côtés : pratique, mais confond NULL et vide."
  },
  {
    id: "m02-q90", dialecte: "SQL Server",
    q: "Avant SQL Server 2022 (pas de IS DISTINCT FROM), comment tester « a égal à b, NULL compris » ?",
    choixCode: true,
    choix: [
      "a = b",
      "a = b OR (a IS NULL AND b IS NULL)",
      "ISNULL(a) = ISNULL(b)",
      "a IS b"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Deux NULL ne sont pas égaux avec =.",
      "Oui. Égaux, ou NULL tous les deux.",
      "Non. ISNULL demande deux arguments.",
      "Non. Syntaxe invalide."
    ],
    retenir: "Égalité NULL-safe à l'ancienne : a = b OR (a IS NULL AND b IS NULL)."
  },
  {
    id: "m02-q91", dialecte: "SQL Server",
    q: "Les codes articles doivent faire 6 caractères. Comment trouver ceux qui ne respectent pas la règle ?",
    choixCode: true,
    choix: ["WHERE LEN(code) <> 6", "WHERE code <> 6", "WHERE code NOT LIKE '%6%'", "WHERE SIZE(code) <> 6"],
    bonne: 0,
    pourquoi: [
      "Oui. Attention : LEN ignore les espaces de fin. Pour les voir, DATALENGTH.",
      "Non. Compare le code au nombre 6.",
      "Non.",
      "Non. SIZE n'existe pas."
    ],
    retenir: "Contrôle de longueur : LEN (SQL Server), LENGTH (Snowflake)."
  },
  {
    id: "m02-q92", dialecte: "SQL Server",
    q: "Comment trouver les libellés qui commencent par un chiffre ?",
    choixCode: true,
    choix: ["LIKE '[0-9]%'", "LIKE '%[0-9]'", "LIKE '0-9%'", "LIKE '#%'"],
    bonne: 0,
    pourquoi: [
      "Oui. Le 1er caractère est un chiffre, puis n'importe quoi.",
      "Non. Ça cherche ceux qui FINISSENT par un chiffre.",
      "Non. Ça cherche le texte « 0-9 » au début.",
      "Non. # n'est pas un joker."
    ],
    retenir: "[0-9] = un chiffre, en position précise."
  },
  {
    id: "m02-q93", dialecte: "Snowflake",
    q: "Sur Snowflake, date_cde est un TIMESTAMP. Que renvoie WHERE date_cde = CURRENT_DATE ?",
    choix: [
      "Toutes les commandes du jour",
      "Seulement celles passées exactement à minuit",
      "Une erreur",
      "Aucune ligne, toujours"
    ],
    bonne: 1,
    pourquoi: [
      "Non. CURRENT_DATE devient aujourd'hui 00:00:00 pour être comparé.",
      "Oui. Écris plutôt date_cde::DATE = CURRENT_DATE, ou >= CURRENT_DATE AND < CURRENT_DATE + 1.",
      "Non. La conversion est automatique.",
      "Non. Celles de minuit pile passent."
    ],
    retenir: "TIMESTAMP comparé à une DATE = comparaison à minuit."
  },
  {
    id: "m02-q94", dialecte: "SQL Server",
    q: "date_cde est un DATETIME. Comment filtrer les commandes d'hier ?",
    choixCode: true,
    choix: [
      "WHERE date_cde = GETDATE() - 1",
      "WHERE date_cde >= DATEADD(day, -1, CAST(GETDATE() AS date)) AND date_cde < CAST(GETDATE() AS date)",
      "WHERE DAY(date_cde) = DAY(GETDATE()) - 1",
      "WHERE date_cde > GETDATE() - 1"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Cherche un instant précis : hier à la même seconde.",
      "Oui. De hier 00:00 (inclus) à aujourd'hui 00:00 (exclu).",
      "Non. Faux le 1er du mois, et mélange tous les mois.",
      "Non. Ce sont les dernières 24 heures, pas « hier »."
    ],
    retenir: "« Hier » = [hier 00:00 ; aujourd'hui 00:00[."
  },
  {
    id: "m02-q95", dialecte: "SQL Server",
    q: "La colonne ville est en NVARCHAR et contient 'Łódź'. Pourquoi WHERE ville = 'Łódź' ne trouve rien ?",
    choix: [
      "La ville n'existe pas",
      "Sans le préfixe N, le texte est en VARCHAR : Ł devient une autre lettre avant la comparaison",
      "Il faut LIKE",
      "Il faut des majuscules"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Écris WHERE ville = N'Łódź'. Le N garde les caractères Unicode.",
      "Non.",
      "Non."
    ],
    retenir: "Texte Unicode sur SQL Server : N'…'."
  },
  {
    id: "m02-q96", dialecte: "SQL Server",
    q: "Quelle écriture évite la division par zéro de façon fiable dans un WHERE ?",
    choixCode: true,
    choix: [
      "WHERE qte <> 0 AND montant / qte > 5",
      "WHERE CASE WHEN qte = 0 THEN 0 ELSE montant / qte END > 5",
      "WHERE montant / qte > 5 AND qte <> 0",
      "WHERE montant / qte > 5"
    ],
    bonne: 1,
    pourquoi: [
      "Non. L'ordre des conditions AND n'est pas garanti.",
      "Oui. Le CASE évalue ses branches dans l'ordre : la division n'a lieu que si qte ≠ 0. (NULLIF marche aussi.)",
      "Non. Même problème.",
      "Non. Plante si qte = 0."
    ],
    retenir: "Protéger un calcul : CASE ou NULLIF, pas l'ordre des AND."
  },
  {
    id: "m02-q97", dialecte: "Standard",
    q: "Comment garder les commandes au-dessus de la moyenne de toutes les commandes ?",
    choixCode: true,
    choix: [
      "WHERE montant > AVG(montant)",
      "WHERE montant > (SELECT AVG(montant) FROM commande)",
      "HAVING montant > AVG(montant)",
      "WHERE AVG(montant) > montant"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Agrégat interdit dans WHERE.",
      "Oui. La sous-requête calcule la moyenne une fois, puis on compare chaque ligne.",
      "Non. Sans GROUP BY, ce n'est pas ce qu'on veut.",
      "Non. Agrégat dans WHERE : erreur."
    ],
    retenir: "Comparer à un agrégat global : sous-requête scalaire."
  },
  {
    id: "m02-q98", dialecte: "Standard",
    q: "Que donne SELECT * FROM commande WHERE montant > AVG(montant); ?",
    choix: ["Les commandes au-dessus de la moyenne", "Erreur : agrégat interdit dans WHERE", "Toutes les commandes", "Aucune"],
    bonne: 1,
    pourquoi: [
      "Non. La requête ne s'exécute pas.",
      "Oui. WHERE travaille ligne par ligne, avant le calcul des agrégats.",
      "Non.",
      "Non."
    ],
    retenir: "Pas d'agrégat dans WHERE. HAVING ou sous-requête."
  },
  {
    id: "m02-q99", dialecte: "Snowflake",
    q: "Sur Snowflake, que fait WHERE nom ILIKE 'dupont' (sans joker) ?",
    choix: [
      "Erreur : il faut un %",
      "Une égalité qui ignore la casse : trouve Dupont, DUPONT…",
      "Une égalité stricte",
      "Cherche 'dupont' n'importe où"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Les jokers sont facultatifs.",
      "Oui. Sans joker, ILIKE = égalité insensible à la casse.",
      "Non. ILIKE ignore la casse.",
      "Non. Il faudrait '%dupont%'."
    ],
    retenir: "Snowflake : ILIKE sans joker = égalité sans casse."
  },
  {
    id: "m02-q100", dialecte: "Snowflake",
    q: "Sur Snowflake, pourquoi WHERE date_cde >= '2026-01-01' est-il souvent plus efficace que WHERE YEAR(date_cde) >= 2026 ?",
    choix: [
      "Snowflake utilise un index sur date_cde",
      "Snowflake connaît le min et le max de date_cde par micro-partition : il peut sauter des partitions entières",
      "YEAR n'existe pas sur Snowflake",
      "Aucune différence"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Snowflake n'a pas d'index.",
      "Oui. C'est le pruning. Une fonction sur la colonne peut le rendre moins efficace.",
      "Non. YEAR existe.",
      "Non. La différence peut être importante sur de grosses tables."
    ],
    retenir: "Snowflake aussi aime les colonnes « nues » : meilleur pruning."
  }
];
