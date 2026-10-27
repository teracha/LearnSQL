LEARNSQL.questions.m06 = [
  {
    id: "m06-q01", dialecte: "Standard",
    q: "Que contient la colonne derniere de cette requête ?",
    code: "SELECT num_cde,\n       (SELECT MAX(date_cde) FROM commande) AS derniere\nFROM commande;",
    choix: [
      "La date de chaque commande, ligne par ligne",
      "La date la plus récente, sur toutes les lignes",
      "Une erreur : sous-requête interdite dans SELECT",
      "NULL, car la sous-requête n'a pas de WHERE"
    ],
    bonne: 1,
    pourquoi: [
      "Non. La sous-requête ne dépend pas de la ligne.",
      "Oui. Sous-requête scalaire non corrélée : calculée une fois, répétée sur chaque ligne.",
      "Non. Elle renvoie une seule valeur : c'est valide.",
      "Non. Pas besoin de WHERE pour renvoyer une valeur."
    ],
    retenir: "Sous-requête scalaire non corrélée = une valeur pour toute la requête."
  },
  {
    id: "m06-q02", dialecte: "Standard",
    q: "La sous-requête scalaire (SELECT prix FROM tarif WHERE article = 'A1') renvoie 2 lignes. Que se passe-t-il ?",
    choix: [
      "Le 1er prix trouvé est pris",
      "Erreur : plus d'une valeur renvoyée",
      "Les deux prix sont additionnés",
      "NULL, car le résultat est ambigu"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Le moteur ne choisit pas.",
      "Oui. Une sous-requête scalaire doit renvoyer au plus 1 ligne. Sinon : erreur à l'exécution.",
      "Non. Le moteur n'additionne rien : il s'arrête sur une erreur.",
      "Non. Il y a une erreur."
    ],
    retenir: "Sous-requête scalaire : 1 ligne max, sinon erreur."
  },
  {
    id: "m06-q03", dialecte: "Standard",
    q: "La sous-requête scalaire ne trouve aucune ligne. Que vaut-elle ?",
    choix: [
      "0",
      "NULL",
      "Une erreur",
      "''"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Aucune ligne donne NULL, pas 0.",
      "Oui. Pas de ligne = NULL. Pense à COALESCE si tu calcules avec.",
      "Non. Zéro ligne n'est pas une erreur.",
      "Non. Aucune ligne donne NULL, pas un texte vide."
    ],
    retenir: "Sous-requête scalaire vide = NULL."
  },
  {
    id: "m06-q04", dialecte: "Standard",
    q: "Que renvoie cette requête ?",
    code: "SELECT c.nom,\n       (SELECT MAX(co.date_cde)\n        FROM commande co\n        WHERE co.client_id = c.id) AS derniere_cde\nFROM client c;",
    choix: [
      "Chaque client et la date de sa dernière commande",
      "Seulement les clients qui ont déjà commandé",
      "La même date pour tous : la dernière de la table",
      "Une erreur : la sous-requête utilise c.id"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Sous-requête corrélée : elle utilise c.id, donc elle dépend du client. Sans commande : NULL.",
      "Non. Tous les clients sont gardés : sans commande, la valeur est NULL.",
      "Non. Le WHERE la lie à chaque client.",
      "Non. C'est permis : c'est une sous-requête corrélée."
    ],
    retenir: "Sous-requête corrélée = recalculée (logiquement) pour chaque ligne."
  },
  {
    id: "m06-q05", dialecte: "Standard",
    q: "Qu'est-ce qui rend une sous-requête « corrélée » ?",
    choix: [
      "Elle contient un GROUP BY et un HAVING",
      "Elle utilise une colonne du dessus",
      "Elle est placée dans le FROM de la requête",
      "Elle renvoie plusieurs lignes à la fois"
    ],
    bonne: 1,
    pourquoi: [
      "Non. GROUP BY et HAVING n'ont rien à voir avec la corrélation.",
      "Oui. Elle utilise une colonne de la requête extérieure. Ex. WHERE co.client_id = c.id : c vient de la requête du dessus.",
      "Non. Une sous-requête dans FROM n'est pas corrélée (sauf avec APPLY / LATERAL).",
      "Non. Une sous-requête corrélée peut renvoyer une seule valeur."
    ],
    retenir: "Corrélée = elle regarde la ligne en cours de la requête extérieure."
  },
  {
    id: "m06-q06", dialecte: "Standard",
    q: "Comment réécrire la sous-requête « dernière commande par client » (dans le SELECT) avec une jointure ?",
    choixCode: true,
    choix: [
      "client c INNER JOIN (SELECT client_id, MAX(date_cde) AS derniere FROM commande GROUP BY client_id) m ON m.client_id = c.id",
      "client c LEFT JOIN (SELECT client_id, MAX(date_cde) AS derniere FROM commande GROUP BY client_id) m ON m.client_id = c.id",
      "client c LEFT JOIN (SELECT client_id, MAX(date_cde) AS derniere FROM commande) m ON m.client_id = c.id",
      "client c CROSS JOIN (SELECT MAX(date_cde) AS derniere FROM commande) m"
    ],
    bonne: 1,
    pourquoi: [
      "Non. INNER perd les clients sans commande.",
      "Oui. On agrège une fois, puis LEFT JOIN. Souvent plus efficace sur de gros volumes.",
      "Non. Sans GROUP BY, client_id n'est pas agrégé : erreur.",
      "Non. La même date (la plus récente de la table) pour tous les clients."
    ],
    retenir: "Sous-requête scalaire corrélée ≈ LEFT JOIN sur une sous-requête agrégée."
  },
  {
    id: "m06-q07", dialecte: "Standard",
    q: "Quelle requête donne les clients qui ont passé au moins une commande ?",
    choixCode: true,
    choix: [
      "SELECT * FROM client WHERE id IN (SELECT client_id FROM commande)",
      "SELECT * FROM client WHERE id = (SELECT client_id FROM commande)",
      "SELECT * FROM client WHERE IN commande",
      "SELECT * FROM client, commande"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. IN teste l'appartenance à la liste renvoyée.",
      "Non. = attend une seule valeur : erreur si plusieurs commandes.",
      "Non. Syntaxe invalide.",
      "Non. Produit cartésien."
    ],
    retenir: "Appartenance à une liste calculée : IN (SELECT …)."
  },
  {
    id: "m06-q08", dialecte: "SQL Server",
    q: "Que donne WHERE id IN (SELECT client_id, date_cde FROM commande) sur SQL Server ?",
    choix: [
      "Ça marche : les paires sont comparées",
      "Erreur : IN n'accepte qu'une colonne",
      "Seule la 1re colonne est utilisée",
      "NULL pour toutes les lignes de client"
    ],
    bonne: 1,
    pourquoi: [
      "Non. SQL Server ne compare pas des paires avec IN.",
      "Oui. La sous-requête de IN doit renvoyer une seule colonne. Pour plusieurs colonnes : EXISTS.",
      "Non. Il y a une erreur.",
      "Non. Il y a une erreur."
    ],
    retenir: "IN (sous-requête) : une seule colonne."
  },
  {
    id: "m06-q09", dialecte: "Standard",
    q: "La sous-requête contient un client_id NULL. Que renvoie WHERE id NOT IN (SELECT client_id FROM commande) ?",
    choix: [
      "Les clients sans commande",
      "Aucune ligne",
      "Tous les clients",
      "Une erreur"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Le NULL casse le NOT IN.",
      "Oui. id <> NULL est inconnu pour tout le monde : rien ne passe.",
      "Non. Le NULL ne laisse passer personne.",
      "Non. Aucune erreur pour te prévenir."
    ],
    retenir: "NOT IN + un seul NULL = 0 ligne."
  },
  {
    id: "m06-q10", dialecte: "Standard",
    q: "Quelles corrections rendent fiable « clients sans commande » ?",
    choix: [
      "Ajouter DISTINCT dans la sous-requête du NOT IN",
      "NOT EXISTS, ou filtrer les NULL du NOT IN",
      "Remplacer NOT IN par IN dans le WHERE",
      "Ajouter un ORDER BY dans la sous-requête"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Le NULL reste dans la liste.",
      "Oui. NOT EXISTS est le plus sûr. Ajouter WHERE client_id IS NOT NULL dans la sous-requête du NOT IN marche aussi, si on n'oublie pas.",
      "Non. Ça inverse le sens.",
      "Non. Le tri ne change rien."
    ],
    retenir: "Anti-jointure fiable : NOT EXISTS."
  },
  {
    id: "m06-q11", dialecte: "Standard",
    q: "Que teste WHERE EXISTS (SELECT 1 FROM commande co WHERE co.client_id = c.id) ?",
    choix: [
      "Que la commande vaut 1",
      "Qu'il existe au moins une commande pour ce client",
      "Qu'il y a exactement une commande",
      "Que le client existe"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Le 1 n'est pas lu.",
      "Oui. EXISTS répond vrai dès qu'une ligne est trouvée.",
      "Non. Une ou plusieurs.",
      "Non. On regarde dans commande."
    ],
    retenir: "EXISTS = « au moins une ligne ? »."
  },
  {
    id: "m06-q12", dialecte: "Standard",
    q: "Dans EXISTS (SELECT … FROM …), quelle différence entre SELECT 1, SELECT * et SELECT NULL ?",
    choix: [
      "SELECT * est beaucoup plus lent",
      "Aucune, seules les lignes comptent",
      "SELECT NULL renvoie toujours faux",
      "SELECT 1 est obligatoire avec EXISTS"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Les colonnes ne sont pas lues.",
      "Oui. EXISTS ne regarde pas les colonnes, seulement s'il y a des lignes. SELECT 1 est juste une convention lisible.",
      "Non. Même une ligne avec NULL compte comme une ligne.",
      "Non. Toutes les écritures sont acceptées : SELECT 1 est une convention."
    ],
    retenir: "EXISTS ignore le contenu du SELECT."
  },
  {
    id: "m06-q13", dialecte: "Standard",
    q: "Que renvoie cette requête s'il existe au moins une commande en 2026 dans la table ?",
    code: "SELECT nom\nFROM client c\nWHERE EXISTS (\n  SELECT 1 FROM commande co\n  WHERE co.annee = 2026\n);",
    choix: [
      "Les clients qui ont commandé en 2026",
      "TOUS les clients",
      "Aucun client",
      "Une erreur"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Piège : la sous-requête n'est pas reliée au client.",
      "Oui. Il manque co.client_id = c.id. Le EXISTS est vrai pour tout le monde.",
      "Non. Il existe une commande 2026 : EXISTS est vrai.",
      "Non. La requête est valide, elle est juste mal reliée."
    ],
    retenir: "EXISTS sans lien avec la ligne extérieure = vrai ou faux pour toutes les lignes."
  },
  {
    id: "m06-q14", dialecte: "Standard",
    q: "La table article n'a PAS de colonne client_id. Que renvoie SELECT * FROM client WHERE client_id IN (SELECT client_id FROM article); si client a une colonne client_id ?",
    choix: [
      "Une erreur : colonne inconnue dans article",
      "Tous les clients (client_id non NULL)",
      "Aucun client, car la colonne n'existe pas",
      "Seulement les clients liés à un article"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Piège célèbre : pas d'erreur !",
      "Oui. Si article n'est pas vide : dans la sous-requête, client_id est cherché dans article, puis… dans la requête extérieure. On teste client_id IN (client_id) : toujours vrai.",
      "Non. La colonne est trouvée… dans la requête extérieure.",
      "Non. Aucun lien réel n'est testé."
    ],
    retenir: "Dans une sous-requête, une colonne introuvable est cherchée à l'extérieur. Préfixe toujours."
  },
  {
    id: "m06-q15", dialecte: "Standard",
    q: "Quelle habitude évite le piège de la colonne « empruntée » à la requête extérieure ?",
    choix: [
      "Mettre DISTINCT dans la sous-requête",
      "Préfixer chaque colonne par son alias",
      "Utiliser NOT IN au lieu de IN, plus sûr",
      "Ne jamais utiliser de sous-requête"
    ],
    bonne: 1,
    pourquoi: [
      "Non. DISTINCT ne vérifie pas d'où vient la colonne.",
      "Oui. Avec a.client_id, une colonne absente provoque une vraie erreur.",
      "Non. Ça ne règle rien, et NOT IN a ses propres pièges.",
      "Non. Les sous-requêtes sont utiles."
    ],
    retenir: "Alias + préfixe partout, surtout dans les sous-requêtes."
  },
  {
    id: "m06-q16", dialecte: "Standard",
    q: "Tu veux la liste des clients ayant commandé, chacun une fois. Pourquoi IN ou EXISTS plutôt qu'un INNER JOIN ?",
    choix: [
      "C'est obligatoire pour une jointure",
      "Le JOIN répète le client par commande",
      "Le JOIN est interdit sur ces deux tables",
      "Aucune raison, c'est une question de goût"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Un JOIN n'oblige pas à utiliser IN ou EXISTS.",
      "Oui. IN / EXISTS ne créent pas de doublons : pas besoin de DISTINCT avec une semi-jointure.",
      "Non. Rien n'interdit de joindre ces deux tables.",
      "Non. Il y a une vraie différence."
    ],
    retenir: "« Ceux qui ont au moins un… » : IN / EXISTS, pas JOIN + DISTINCT."
  },
  {
    id: "m06-q17", dialecte: "Standard",
    q: "Pourquoi EXISTS peut-il être rapide même si un client a 10 000 commandes ?",
    choix: [
      "Il compte toutes les commandes très vite",
      "Il s'arrête dès la première commande trouvée",
      "Il utilise un cache",
      "Il ne lit que la première ligne de la table"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Il ne compte pas.",
      "Oui. Une seule ligne suffit pour répondre « oui ».",
      "Non. La vitesse vient de l'arrêt à la 1re ligne, pas d'un cache.",
      "Non. Il cherche la première ligne QUI CORRESPOND."
    ],
    retenir: "EXISTS s'arrête au premier résultat."
  },
  {
    id: "m06-q18", dialecte: "Standard",
    q: "Pour tester qu'un client a des commandes, que préférer ?",
    choixCode: true,
    choix: [
      "WHERE (SELECT COUNT(*) FROM commande co WHERE co.client_id = c.id) > 0",
      "WHERE EXISTS (SELECT 1 FROM commande co WHERE co.client_id = c.id)",
      "Les deux sont identiques en tout",
      "WHERE commande IS NOT NULL"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Ça marche, mais on compte tout alors qu'une seule ligne suffit.",
      "Oui. Plus clair et souvent plus efficace.",
      "Non. Même résultat, mais l'intention et parfois le coût diffèrent.",
      "Non. commande n'est pas une colonne du client."
    ],
    retenir: "Existence : EXISTS, pas COUNT(*) > 0."
  },
  {
    id: "m06-q19", dialecte: "Standard",
    q: "Quelle requête liste les articles jamais vendus ?",
    choixCode: true,
    choix: [
      "SELECT * FROM article a WHERE NOT EXISTS (SELECT 1 FROM ligne_cde l WHERE l.article_id = a.id)",
      "SELECT * FROM article a JOIN ligne_cde l ON l.article_id = a.id",
      "SELECT * FROM article a WHERE EXISTS (SELECT 1 FROM ligne_cde)",
      "SELECT * FROM ligne_cde WHERE article_id IS NULL"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Aucune ligne de vente pour cet article.",
      "Non. Ce sont les articles vendus (avec doublons).",
      "Non. Pas de lien avec l'article : tous ou aucun.",
      "Non. Ce sont des lignes sans article."
    ],
    retenir: "« Jamais » = NOT EXISTS."
  },
  {
    id: "m06-q20", dialecte: "Standard",
    q: "Tu veux les clients dont le CA dépasse la moyenne des CA clients. Où mettre la sous-requête ?",
    choixCode: true,
    choix: [
      "WHERE SUM(montant) > (SELECT AVG(ca) FROM (SELECT SUM(montant) AS ca FROM commande GROUP BY client_id) t)",
      "HAVING SUM(montant) > (SELECT AVG(ca) FROM (SELECT SUM(montant) AS ca FROM commande GROUP BY client_id) t)",
      "HAVING SUM(montant) > (SELECT AVG(montant) FROM commande)",
      "HAVING SUM(montant) > AVG(SUM(montant))"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Agrégat dans WHERE : erreur. Le filtre sur un total va dans HAVING.",
      "Oui. La sous-requête calcule la moyenne des CA par client ; HAVING compare chaque client.",
      "Non. C'est la moyenne des commandes, pas des CA clients.",
      "Non. Agrégat d'agrégat : erreur."
    ],
    retenir: "Comparer un groupe à une moyenne de groupes : sous-requête dans HAVING."
  },
  {
    id: "m06-q21", dialecte: "SQL Server",
    q: "Que donne SELECT * FROM (SELECT id, nom FROM client); sur SQL Server ?",
    choix: [
      "Tous les clients, avec id et nom",
      "Erreur : alias obligatoire",
      "Une seule ligne, la première",
      "NULL, car la table n'a pas de nom"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Sans alias, la requête ne s'exécute pas.",
      "Oui. La table dérivée doit avoir un alias : … FROM (SELECT …) AS t.",
      "Non. Sans alias, la requête ne s'exécute pas.",
      "Non. Il y a une erreur."
    ],
    retenir: "Sous-requête dans FROM : alias obligatoire (SQL Server)."
  },
  {
    id: "m06-q22", dialecte: "SQL Server",
    q: "Que donne SELECT * FROM (SELECT YEAR(date_cde) FROM commande) AS t; ?",
    choix: [
      "La liste des années de commande",
      "Erreur : la colonne n'a pas de nom",
      "Une seule ligne avec l'année",
      "Une colonne nommée « YEAR » automatiquement"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Sans nom de colonne, la requête ne s'exécute pas.",
      "Oui. Chaque colonne d'une table dérivée doit avoir un nom : YEAR(date_cde) AS annee.",
      "Non. Sans nom de colonne, la requête ne s'exécute pas.",
      "Non. SQL Server ne donne pas de nom tout seul ici : erreur."
    ],
    retenir: "Table dérivée : chaque colonne nommée."
  },
  {
    id: "m06-q23", dialecte: "SQL Server",
    q: "Que donne une table dérivée avec ORDER BY (sans TOP) sur SQL Server ?",
    code: "SELECT *\nFROM (SELECT nom FROM client ORDER BY nom) AS t;",
    choix: [
      "Les noms, triés par ordre alphabétique",
      "Erreur : ORDER BY interdit ici sans TOP",
      "Les noms, dans un ordre quelconque",
      "Une seule ligne, le premier nom"
    ],
    bonne: 1,
    pourquoi: [
      "Non. SQL Server refuse : c'est une erreur.",
      "Oui. Une sous-requête est un ensemble, sans ordre : SQL Server refuse ORDER BY sans TOP. Le tri se met dans la requête finale.",
      "Non. SQL Server refuse : c'est une erreur.",
      "Non. SQL Server refuse : rien n'est renvoyé."
    ],
    retenir: "ORDER BY : dans la requête finale seulement."
  },
  {
    id: "m06-q24", dialecte: "SQL Server",
    q: "Sur SQL Server, tu veux filtrer sur un calcul nommé ttc. Quelle écriture fonctionne ?",
    choixCode: true,
    choix: [
      "SELECT montant * 1.2 AS ttc FROM commande WHERE ttc > 100",
      "SELECT * FROM (SELECT montant * 1.2 AS ttc FROM commande) AS t WHERE t.ttc > 100",
      "SELECT montant * 1.2 AS ttc FROM commande HAVING ttc > 100",
      "SELECT ttc = montant * 1.2 WHERE ttc > 100"
    ],
    bonne: 1,
    pourquoi: [
      "Non. L'alias n'existe pas encore dans WHERE.",
      "Oui. Dans la requête extérieure, ttc est une vraie colonne de t.",
      "Non. HAVING ne voit pas non plus l'alias, et il n'y a pas de GROUP BY.",
      "Non. Il manque le FROM, et l'alias n'existe pas dans WHERE."
    ],
    retenir: "Réutiliser un alias : l'envelopper dans une table dérivée ou une CTE."
  },
  {
    id: "m06-q25", dialecte: "Standard",
    q: "Quelle est la syntaxe d'une CTE ?",
    choixCode: true,
    choix: [
      "CTE ca AS (SELECT …) SELECT * FROM ca",
      "WITH ca AS (SELECT …) SELECT * FROM ca",
      "SELECT * FROM ca WITH (SELECT …)",
      "DECLARE ca AS (SELECT …)"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Le mot-clé est WITH, pas CTE.",
      "Oui. WITH nom AS (requête), puis la requête qui l'utilise.",
      "Non. WITH se place avant la requête.",
      "Non. DECLARE sert aux variables."
    ],
    retenir: "WITH nom AS ( … ) SELECT … FROM nom."
  },
  {
    id: "m06-q26", dialecte: "SQL Server",
    q: "Pourquoi voit-on souvent ;WITH au lieu de WITH sur SQL Server ?",
    choix: [
      "C'est une syntaxe spéciale, plus rapide",
      "Le ; termine l'instruction d'avant",
      "Pour mettre la ligne en commentaire",
      "Pour indiquer que la CTE est récursive"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Le ; ne change pas la vitesse.",
      "Oui. L'instruction précédente doit finir par ; : le ; devant WITH protège si on l'a oublié. Sinon : erreur de syntaxe près de WITH. Mieux : finir toutes les instructions par ;.",
      "Non. Un commentaire commence par --.",
      "Non. Une CTE récursive s'écrit comme les autres sur SQL Server."
    ],
    retenir: "WITH exige que l'instruction d'avant soit terminée par ;."
  },
  {
    id: "m06-q27", dialecte: "Standard",
    q: "Comment écrire deux CTE dans la même requête ?",
    choixCode: true,
    choix: [
      "WITH a AS (…) WITH b AS (…) SELECT …",
      "WITH a AS (…), b AS (…) SELECT …",
      "WITH a, b AS (…) SELECT …",
      "WITH a AS (…); WITH b AS (…); SELECT …"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Un seul WITH.",
      "Oui. Un WITH, puis les CTE séparées par des virgules.",
      "Non. Chaque CTE a son propre AS (…).",
      "Non. Le ; termine l'instruction : b ne verrait plus a."
    ],
    retenir: "Un seul WITH, CTE séparées par des virgules."
  },
  {
    id: "m06-q28", dialecte: "Standard",
    q: "Dans WITH a AS (…), b AS (…), la CTE b peut-elle utiliser a ?",
    choix: [
      "Oui",
      "Non",
      "Seulement en récursif",
      "Seulement sur Snowflake"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Une CTE peut utiliser celles définies AVANT elle. C'est ce qui permet d'avancer étape par étape.",
      "Non. Une CTE voit celles écrites avant elle.",
      "Non. C'est possible dans une CTE normale.",
      "Non. Valide partout."
    ],
    retenir: "Une CTE voit les CTE précédentes."
  },
  {
    id: "m06-q29", dialecte: "Standard",
    q: "Après WITH ca AS (…) SELECT * FROM ca; tu écris une 2e requête SELECT * FROM ca;. Que se passe-t-il ?",
    choix: [
      "Ça marche : la CTE reste disponible",
      "Erreur : la CTE n'existe plus",
      "Ça renvoie 0 ligne, sans erreur",
      "Ça recalcule la CTE automatiquement"
    ],
    bonne: 1,
    pourquoi: [
      "Non. La CTE n'existe que pour la requête qui la suit.",
      "Oui. La CTE n'existe que pour la requête qui la suit directement. Pour réutiliser un résultat : table temporaire ou vue.",
      "Non. Il y a une erreur.",
      "Non. Il y a une erreur."
    ],
    retenir: "Portée d'une CTE = une seule instruction."
  },
  {
    id: "m06-q30", dialecte: "SQL Server",
    q: "Une CTE lourde est utilisée deux fois dans la même requête. Que fait SQL Server ?",
    choix: [
      "Il la calcule une fois et garde le résultat",
      "Il peut la calculer deux fois : une CTE n'est pas un cache",
      "Il refuse",
      "Il la stocke dans une table"
    ],
    bonne: 1,
    pourquoi: [
      "Non. SQL Server ne matérialise pas les CTE.",
      "Oui. Si c'est coûteux : stocker le résultat dans une table temporaire #t.",
      "Non. Une CTE utilisée deux fois est permise.",
      "Non. SQL Server ne stocke pas le résultat d'une CTE."
    ],
    retenir: "SQL Server : CTE = texte réutilisé, pas résultat stocké."
  },
  {
    id: "m06-q31", dialecte: "Standard",
    q: "Que permet l'écriture WITH ca_annuel (annee, ca) AS (SELECT YEAR(date_cde), SUM(montant) FROM commande GROUP BY YEAR(date_cde)) ?",
    choix: [
      "Rien, c'est une erreur de syntaxe",
      "Nommer les colonnes dans l'en-tête",
      "Créer une table permanente ca_annuel",
      "Trier le résultat par annee puis par ca"
    ],
    bonne: 1,
    pourquoi: [
      "Non. C'est valide.",
      "Oui. La liste (annee, ca) donne les noms des colonnes, au lieu de mettre des alias dans le SELECT. Pratique et lisible.",
      "Non. Une CTE ne crée pas de table.",
      "Non. La liste entre parenthèses donne des noms, pas un tri."
    ],
    retenir: "WITH nom (col1, col2) AS (…) : noms des colonnes dans l'en-tête."
  },
  {
    id: "m06-q32", dialecte: "Standard",
    q: "Quelle est la différence entre une CTE et une vue ?",
    choix: [
      "Aucune, ce sont deux noms pour la même chose",
      "La vue est enregistrée ; la CTE est locale",
      "La CTE est toujours plus rapide qu'une vue",
      "La vue ne peut pas contenir de jointure"
    ],
    bonne: 1,
    pourquoi: [
      "Non. La vue est enregistrée dans la base ; la CTE disparaît après la requête.",
      "Oui. Vue = objet permanent dans la base, réutilisable et partagé. CTE = étape temporaire d'une requête.",
      "Non. Les deux sont « dépliées » dans la requête.",
      "Non. Une vue peut contenir des jointures."
    ],
    retenir: "Vue = permanente. CTE = locale à une requête."
  },
  {
    id: "m06-q33", dialecte: "SQL Server",
    q: "Pourquoi choisir une table temporaire #t plutôt qu'une CTE dans une procédure en plusieurs étapes ?",
    choix: [
      "Elle est toujours plus lente qu'une CTE",
      "Le résultat est stocké et réutilisable",
      "Elle est visible par tous les utilisateurs",
      "Elle évite tous les verrous de lecture"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Elle est souvent plus rapide quand on relit le résultat.",
      "Oui. Calculée une fois, lue plusieurs fois, avec des statistiques (et des index possibles) qui aident l'optimiseur.",
      "Non. #t est privée à la session.",
      "Non. Lire une #table pose des verrous comme une table normale."
    ],
    retenir: "Résultat intermédiaire réutilisé ou volumineux : #table."
  },
  {
    id: "m06-q34", dialecte: "SQL Server",
    q: "Que donne une CTE qui contient ORDER BY (sans TOP) sur SQL Server ?",
    choix: [
      "Le résultat trié",
      "Une erreur",
      "Le tri est ignoré en silence",
      "Un tri aléatoire"
    ],
    bonne: 1,
    pourquoi: [
      "Non. SQL Server refuse ORDER BY sans TOP dans une CTE.",
      "Oui. Même règle que les tables dérivées et les vues. Trie dans la requête finale.",
      "Non. SQL Server refuse.",
      "Non. SQL Server refuse : il n'y a pas de résultat."
    ],
    retenir: "Pas d'ORDER BY dans une CTE (sauf avec TOP)."
  },
  {
    id: "m06-q35", dialecte: "SQL Server",
    q: "Que fait ce code sur SQL Server ?",
    code: "WITH d AS (\n  SELECT *, ROW_NUMBER() OVER (\n    PARTITION BY num_facture ORDER BY id) AS rn\n  FROM facture_import\n)\nDELETE FROM d WHERE rn > 1;",
    choix: [
      "Erreur : on ne supprime pas à travers une CTE",
      "Il supprime les doublons, garde la plus petite id",
      "Il supprime toute la table facture_import",
      "Il supprime les doublons, garde la plus grande id"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Sur SQL Server, une CTE sur une seule table peut être la cible d'un DELETE.",
      "Oui. Une ligne par numéro de facture, la plus petite id. Technique classique de dédoublonnage. Teste d'abord avec SELECT … WHERE rn > 1.",
      "Non. Seulement rn > 1.",
      "Non. ORDER BY id (croissant) : rn = 1 est la plus petite id."
    ],
    retenir: "SQL Server : dédoublonner avec CTE + ROW_NUMBER + DELETE WHERE rn > 1."
  },
  {
    id: "m06-q36", dialecte: "SQL Server",
    q: "WITH x AS (SELECT id, statut FROM commande WHERE annee = 2020) UPDATE x SET statut = 'ARCHIVE'; Que modifie-t-on ?",
    choix: [
      "Rien, une CTE est en lecture seule",
      "Les commandes de 2020 dans la table commande",
      "Toute la table",
      "Une copie temporaire"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Sur SQL Server, une CTE simple (une table) est modifiable.",
      "Oui. La modification est appliquée à la table d'origine.",
      "Non. Seulement les lignes de la CTE.",
      "Non. La CTE ne copie rien : on modifie la table d'origine."
    ],
    retenir: "UPDATE / DELETE via une CTE = modifie la table de base."
  },
  {
    id: "m06-q37", dialecte: "Snowflake",
    q: "Sur Snowflake, comment dédoublonner une table (garder 1 ligne par numéro) ?",
    choix: [
      "WITH d AS (…ROW_NUMBER…) DELETE FROM d WHERE rn > 1",
      "Réécrire la table avec QUALIFY ROW_NUMBER() … = 1",
      "DELETE DISTINCT FROM t, puis vérifier le résultat",
      "C'est impossible sur Snowflake, il faut un export"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Snowflake ne supprime pas à travers une CTE.",
      "Oui. INSERT OVERWRITE INTO t SELECT * FROM t QUALIFY ROW_NUMBER() OVER (PARTITION BY num ORDER BY id) = 1 réécrit la table avec une seule ligne par clé. (CREATE OR REPLACE TABLE … AS SELECT … marche aussi.)",
      "Non. N'existe pas.",
      "Non. C'est possible en SQL."
    ],
    retenir: "Snowflake : dédoublonner = réécrire avec QUALIFY ROW_NUMBER() = 1."
  },
  {
    id: "m06-q38", dialecte: "Standard",
    q: "Une requête contient 4 sous-requêtes imbriquées les unes dans les autres. Quel est l'intérêt de la réécrire en CTE ?",
    choix: [
      "Aucun, c'est juste une question de goût",
      "Lire étape par étape, avec des noms",
      "La requête devient toujours plus rapide",
      "La requête devient récursive, donc plus puissante"
    ],
    bonne: 1,
    pourquoi: [
      "Non. La lisibilité et le débogage sont un vrai gain.",
      "Oui. On lit de haut en bas, avec un nom parlant pour chaque étape. Même résultat, mais compréhensible et facile à déboguer.",
      "Non. Sur SQL Server, le plan est souvent le même.",
      "Non. Une CTE n'est récursive que si elle s'appelle elle-même."
    ],
    retenir: "CTE = lisibilité. Une étape, un nom."
  },
  {
    id: "m06-q39", dialecte: "Standard",
    q: "Quelles sont les deux parties d'une CTE récursive ?",
    choix: [
      "Le SELECT et le FROM de la CTE",
      "L'ancre et la partie récursive",
      "Le WHERE et le HAVING de la CTE",
      "Deux CTE séparées par une virgule"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Ce sont les parties de toute requête, pas de la récursion.",
      "Oui. L'ancre (point de départ) donne les premières lignes ; la partie récursive part des lignes précédentes pour trouver les suivantes. Reliées par UNION ALL.",
      "Non. Ce sont des filtres, pas les parties d'une récursion.",
      "Non. Une CTE récursive est une seule CTE, en deux parties."
    ],
    retenir: "Récursive = ancre UNION ALL partie récursive."
  },
  {
    id: "m06-q40", dialecte: "Standard",
    q: "Quand une CTE récursive s'arrête-t-elle ?",
    choix: [
      "Après 10 tours, par sécurité",
      "Quand elle ne trouve plus de ligne",
      "Quand l'ancre ne renvoie plus rien",
      "Jamais, il faut l'arrêter à la main"
    ],
    bonne: 1,
    pourquoi: [
      "Non. La limite par défaut de SQL Server est 100 niveaux, pas 10.",
      "Oui. Quand la partie récursive ne renvoie plus aucune ligne. Si les données bouclent, elle ne s'arrête pas toute seule.",
      "Non. Si l'ancre est vide, elle ne commence même pas.",
      "Non. Elle s'arrête seule quand plus rien n'est trouvé."
    ],
    retenir: "Fin de récursion = plus de nouvelles lignes."
  },
  {
    id: "m06-q41", dialecte: "SQL Server",
    q: "Une CTE récursive plante avec « The maximum recursion 100 has been exhausted ». Que veut dire ce message ?",
    choix: [
      "La table parcourue a plus de 100 lignes",
      "Plus de 100 niveaux de récursion",
      "La requête a rencontré 100 erreurs",
      "La requête dure plus de 100 secondes"
    ],
    bonne: 1,
    pourquoi: [
      "Non. La limite compte les niveaux, pas les lignes.",
      "Oui. C'est la limite par défaut de SQL Server : hiérarchie très profonde, ou boucle dans les données. Vérifie d'abord s'il y a une boucle. Si la profondeur est normale : OPTION (MAXRECURSION n).",
      "Non. Le message parle de niveaux de récursion, pas d'erreurs.",
      "Non. La limite compte les niveaux, pas le temps."
    ],
    retenir: "MAXRECURSION par défaut = 100 niveaux."
  },
  {
    id: "m06-q42", dialecte: "SQL Server",
    q: "Que fait OPTION (MAXRECURSION 0) à la fin d'une requête récursive ?",
    choix: [
      "Elle interdit toute récursion",
      "Elle supprime la limite de niveaux",
      "Elle limite le résultat à 0 ligne",
      "Elle accélère la requête récursive"
    ],
    bonne: 1,
    pourquoi: [
      "Non. 0 veut dire « pas de limite ».",
      "Oui. Attention : une boucle dans les données tournera sans fin. Préfère une limite raisonnable (ex. 1000) ou un garde-fou sur le niveau.",
      "Non. MAXRECURSION ne limite pas le nombre de lignes.",
      "Non. Elle enlève une limite, elle n'accélère rien."
    ],
    retenir: "MAXRECURSION 0 = sans limite. À utiliser avec un garde-fou."
  },
  {
    id: "m06-q43", dialecte: "Standard",
    q: "Une nomenclature contient une erreur : A contient B, et B contient A. Que fait une CTE récursive qui la parcourt ?",
    choix: [
      "Elle s'arrête normalement après B",
      "Elle boucle jusqu'à la limite",
      "Elle détecte la boucle et l'ignore",
      "Elle renvoie 0 ligne, sans erreur"
    ],
    bonne: 1,
    pourquoi: [
      "Non. B renvoie vers A : la boucle continue.",
      "Oui. Elle tourne en boucle jusqu'à la limite de récursion (ou sans fin). Garde-fou : un compteur de niveau (WHERE niveau < 20), ou un chemin et un test « déjà visité ».",
      "Non. Le moteur ne détecte pas les cycles tout seul.",
      "Non. Elle tourne et renvoie des lignes, jusqu'à l'erreur de limite."
    ],
    retenir: "Données en boucle = récursion infinie. Prévois un garde-fou."
  },
  {
    id: "m06-q44", dialecte: "SQL Server",
    q: "Erreur : « Types don't match between the anchor and the recursive part ». Cause probable ?",
    choix: [
      "Les types diffèrent entre ancre et partie récursive",
      "Il manque un alias sur la CTE récursive",
      "La table de départ ne contient aucune ligne",
      "Il faut UNION, et pas UNION ALL, entre les parties"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Une colonne n'a pas exactement le même type (ou la même longueur) des deux côtés. Ex. chemin VARCHAR(50) dans l'ancre, VARCHAR(100) après concaténation. Fais un CAST identique des deux côtés.",
      "Non. L'erreur parle de types, pas d'alias.",
      "Non. Une table vide ne crée pas d'erreur de type.",
      "Non. La récursion exige UNION ALL."
    ],
    retenir: "Récursif : mêmes types, mêmes longueurs, des deux côtés (CAST)."
  },
  {
    id: "m06-q45", dialecte: "SQL Server",
    q: "Tu construis le chemin « PDG > Directeur > Chef » dans une CTE récursive. Comment écrire la colonne chemin dans l'ancre ?",
    choixCode: true,
    choix: [
      "CAST(nom AS varchar(10)) AS chemin",
      "CAST(nom AS varchar(1000)) AS chemin",
      "CONCAT(nom, ' > ') AS chemin",
      "CAST(NULL AS varchar(1000)) AS chemin"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Trop court : le chemin sera coupé, et la partie récursive doit avoir le même type.",
      "Oui. On fixe un type assez large. La partie récursive fait CAST(chemin + ' > ' + nom AS varchar(1000)).",
      "Non. Le type dépend de nom : trop court, et différent de la partie récursive.",
      "Non. Le chemin commence vide : le nom de la racine est perdu (et NULL + texte = NULL)."
    ],
    retenir: "Chemin récursif : CAST large et identique des deux côtés."
  },
  {
    id: "m06-q46", dialecte: "SQL Server",
    q: "Sur SQL Server, peut-on relier l'ancre et la partie récursive avec UNION (sans ALL) ?",
    choix: [
      "Oui",
      "Non : UNION ALL est obligatoire",
      "Seulement avec DISTINCT",
      "Seulement sur deux niveaux"
    ],
    bonne: 1,
    pourquoi: [
      "Non. SQL Server refuse.",
      "Oui. UNION ALL obligatoire entre l'ancre et la partie récursive.",
      "Non. DISTINCT ne remplace pas UNION ALL ici.",
      "Non. La règle vaut quel que soit le nombre de niveaux."
    ],
    retenir: "CTE récursive (SQL Server) : UNION ALL."
  },
  {
    id: "m06-q47", dialecte: "SQL Server",
    q: "Dans la partie récursive d'une CTE, SQL Server accepte-t-il un LEFT JOIN vers la CTE elle-même ?",
    choix: [
      "Oui, comme n'importe quelle jointure",
      "Non : jointures externes interdites",
      "Seulement un RIGHT JOIN, pas un LEFT",
      "Seulement si la CTE contient un TOP"
    ],
    bonne: 1,
    pourquoi: [
      "Non. SQL Server interdit les jointures externes dans la partie récursive.",
      "Oui. Seulement des jointures internes dans la partie récursive.",
      "Non. RIGHT JOIN est aussi une jointure externe.",
      "Non. TOP est aussi interdit dans la partie récursive."
    ],
    retenir: "Partie récursive : pas de LEFT / RIGHT / FULL JOIN."
  },
  {
    id: "m06-q48", dialecte: "SQL Server",
    q: "Lequel de ces éléments est INTERDIT dans la partie récursive d'une CTE sur SQL Server ?",
    choix: [
      "Un INNER JOIN vers une autre table",
      "Un WHERE qui limite le niveau",
      "GROUP BY, TOP, DISTINCT ou un agrégat",
      "Une colonne calculée comme niveau + 1"
    ],
    bonne: 2,
    pourquoi: [
      "Non. C'est même le cas normal.",
      "Non. WHERE sert souvent de garde-fou.",
      "Oui. Fais les agrégats APRÈS la récursion, dans la requête finale.",
      "Non. C'est permis, et très utile."
    ],
    retenir: "Récursion d'abord, agrégation ensuite."
  },
  {
    id: "m06-q49", dialecte: "Standard",
    q: "Nomenclature : 1 piscine = 4 panneaux, 1 panneau = 6 vis. Dans la CTE récursive, comment calculer les 24 vis par piscine ?",
    choixCode: true,
    choix: [
      "quantite + b.quantite",
      "n.quantite * b.quantite",
      "MAX(quantite)",
      "SUM(quantite) dans la partie récursive"
    ],
    bonne: 1,
    pourquoi: [
      "Non. 4 + 6 = 10, faux.",
      "Oui. On multiplie la quantité du parent par celle du composant : 4 × 6 = 24.",
      "Non. MAX garde une seule valeur : 6, pas 24.",
      "Non. Agrégat interdit dans la partie récursive."
    ],
    retenir: "Nomenclature : quantités multipliées de niveau en niveau."
  },
  {
    id: "m06-q50", dialecte: "Standard",
    q: "Organigramme : quelle ancre pour partir du sommet (le PDG) ?",
    choixCode: true,
    choix: [
      "WHERE manager_id IS NULL",
      "WHERE manager_id = id",
      "WHERE id = 1",
      "WHERE manager_id IS NOT NULL"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Le sommet n'a pas de manager. La partie récursive descend ensuite vers les subordonnés.",
      "Non. Personne n'est son propre manager : ça ne trouve personne.",
      "Non. Rien ne garantit que le PDG ait l'id 1.",
      "Non. Ce sont tous les autres."
    ],
    retenir: "Descente d'arbre : l'ancre = la racine (parent NULL)."
  },
  {
    id: "m06-q51", dialecte: "Standard",
    q: "Tu pars d'un salarié et tu veux remonter jusqu'au PDG. Comment écrire la partie récursive ?",
    choixCode: true,
    choix: [
      "JOIN salarie s ON s.manager_id = r.id",
      "JOIN salarie s ON s.id = r.manager_id",
      "JOIN salarie s ON s.id = r.id",
      "CROSS JOIN salarie s"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Ça descend vers les subordonnés.",
      "Oui. On cherche la personne dont l'id est le manager de la ligne précédente : on monte d'un niveau.",
      "Non. On retrouverait la même personne : boucle.",
      "Non. Un CROSS JOIN relie tout le monde : la chaîne est perdue."
    ],
    retenir: "Monter : s.id = r.manager_id. Descendre : s.manager_id = r.id."
  },
  {
    id: "m06-q52", dialecte: "SQL Server",
    q: "Comment générer tous les jours d'octobre 2026 avec une CTE récursive ?",
    code: "WITH jours AS (\n  SELECT CAST('20261001' AS date) AS d\n  UNION ALL\n  SELECT DATEADD(day, 1, d) FROM jours\n  WHERE ???\n)\nSELECT d FROM jours;",
    choixCode: true,
    choix: [
      "d < '20261031'",
      "d <= '20261031'",
      "d = '20261031'",
      "d >= '20261001'"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Le dernier tour part du 30 et ajoute le 31, puis s'arrête.",
      "Non. On générerait aussi le 1er novembre.",
      "Non. Le 1er tour (d = 1er) ne passe pas : on s'arrêterait tout de suite.",
      "Non. Toujours vrai : pas de fin, boucle jusqu'à la limite de récursion."
    ],
    retenir: "Série de dates : la condition porte sur la valeur AVANT l'ajout."
  },
  {
    id: "m06-q53", dialecte: "SQL Server",
    q: "Sur SQL Server 2022, quelle fonction génère simplement les nombres de 1 à 100 ?",
    choixCode: true,
    choix: [
      "GENERATE_SERIES(1, 100)",
      "RANGE(1, 100)",
      "SEQUENCE(1, 100)",
      "GENERATOR(100)"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. SELECT value FROM GENERATE_SERIES(1, 100). Plus simple qu'une CTE récursive.",
      "Non. Python.",
      "Non. Cette fonction n'existe pas sur SQL Server.",
      "Non. Snowflake a GENERATOR, avec une autre syntaxe."
    ],
    retenir: "SQL Server 2022 : GENERATE_SERIES(début, fin [, pas])."
  },
  {
    id: "m06-q54", dialecte: "Snowflake",
    q: "Sur Snowflake, comment générer 365 lignes (pour construire un calendrier) ?",
    choixCode: true,
    choix: [
      "SELECT ROW_NUMBER() OVER (ORDER BY SEQ4()) AS n FROM TABLE(GENERATOR(ROWCOUNT => 365))",
      "SELECT value AS n FROM GENERATE_SERIES(1, 365)",
      "SELECT ROW_NUMBER() OVER (ORDER BY SEQ4()) AS n FROM TABLE(GENERATOR(TIMELIMIT => 365))",
      "SELECT SEQ4() AS n FROM TABLE(RANGE(1, 365))"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. GENERATOR crée des lignes vides ; ROW_NUMBER les numérote sans trou (SEQ4 seul peut avoir des trous).",
      "Non. Syntaxe SQL Server 2022, pas Snowflake.",
      "Non. TIMELIMIT est une durée en secondes, pas un nombre de lignes.",
      "Non. RANGE n'est pas une fonction de table Snowflake."
    ],
    retenir: "Snowflake : TABLE(GENERATOR(ROWCOUNT => n))."
  },
  {
    id: "m06-q55", dialecte: "Snowflake",
    q: "Sur Snowflake, quel mot-clé est conseillé pour une CTE récursive ?",
    choixCode: true,
    choix: [
      "WITH RECURSIVE",
      "WITH LOOP",
      "RECURSIVE WITH",
      "WITH REPEAT"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. WITH RECURSIVE nom (colonnes) AS (ancre UNION ALL récursion). Lisible et standard.",
      "Non. Cette syntaxe n'existe pas.",
      "Non. RECURSIVE se place après WITH.",
      "Non. Cette syntaxe n'existe pas."
    ],
    retenir: "Snowflake : WITH RECURSIVE."
  },
  {
    id: "m06-q56", dialecte: "Snowflake",
    q: "Sur Snowflake, quelle autre syntaxe parcourt une hiérarchie, en plus des CTE récursives ?",
    choixCode: true,
    choix: [
      "START WITH manager_id IS NULL CONNECT BY manager_id = PRIOR id",
      "START WITH manager_id IS NULL CONNECT BY PRIOR manager_id = id",
      "HIERARCHY BY manager_id START WITH manager_id IS NULL",
      "TREE (id, manager_id) START WITH manager_id IS NULL"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. CONNECT BY (syntaxe venue d'Oracle) : START WITH = la racine, PRIOR = la ligne parente.",
      "Non. Sens inversé : on remonte vers les chefs au lieu de descendre vers les équipes.",
      "Non. N'existe pas.",
      "Non. N'existe pas."
    ],
    retenir: "Snowflake : CONNECT BY … PRIOR … comme alternative."
  },
  {
    id: "m06-q57", dialecte: "Snowflake",
    q: "Une requête SQL Server avec une sous-requête corrélée dans le SELECT échoue sur Snowflake (« Unsupported subquery type »). Que faire ?",
    choix: [
      "Abandonner la migration de cette requête",
      "La réécrire avec une jointure ou une fenêtre",
      "Ajouter DISTINCT dans la sous-requête",
      "Ajouter LIMIT 1 dans la sous-requête"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Une réécriture en jointure ou en fenêtre suffit.",
      "Oui. Une jointure sur une sous-requête agrégée, ou une fonction de fenêtrage. Snowflake gère moins de formes de sous-requêtes corrélées. Les jointures et les fenêtres marchent toujours.",
      "Non. DISTINCT ne change pas le type de sous-requête.",
      "Non. Pas suffisant."
    ],
    retenir: "Snowflake : préfère jointures et fenêtres aux sous-requêtes corrélées."
  },
  {
    id: "m06-q58", dialecte: "SQL Server",
    q: "Comment écrire une sous-requête scalaire qui renvoie le DERNIER prix d'un article, à coup sûr sur une seule ligne ?",
    choixCode: true,
    choix: [
      "(SELECT prix FROM tarif t WHERE t.article_id = a.id ORDER BY t.date_effet DESC)",
      "(SELECT TOP (1) prix FROM tarif t WHERE t.article_id = a.id ORDER BY t.date_effet DESC)",
      "(SELECT TOP (1) prix FROM tarif t WHERE t.article_id = a.id ORDER BY t.prix DESC)",
      "(SELECT TOP (1) prix FROM tarif t WHERE t.article_id = a.id ORDER BY t.date_effet)"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Sans TOP, ORDER BY est interdit dans une sous-requête, et plusieurs lignes = erreur.",
      "Oui. TOP (1) garantit une ligne ; ORDER BY choisit la plus récente.",
      "Non. Le prix le plus haut, pas le dernier.",
      "Non. Tri croissant : c'est le PREMIER prix, pas le dernier."
    ],
    retenir: "Sous-requête scalaire sûre : TOP (1) + ORDER BY."
  },
  {
    id: "m06-q59", dialecte: "SQL Server",
    q: "Tu as besoin du dernier prix ET de sa date d'effet. Pourquoi OUTER APPLY plutôt que deux sous-requêtes scalaires ?",
    choix: [
      "Une sous-requête scalaire ne renvoie qu'une colonne",
      "APPLY est obligatoire pour lire un prix",
      "Les sous-requêtes sont interdites dans SELECT",
      "Aucune différence, c'est une question de style"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Il en faudrait deux, donc deux lectures. APPLY renvoie plusieurs colonnes en une seule fois.",
      "Non. Une sous-requête peut aussi lire un prix.",
      "Non. Les sous-requêtes scalaires sont permises dans SELECT.",
      "Non. Deux sous-requêtes = deux lectures ; APPLY en fait une."
    ],
    retenir: "Plusieurs colonnes « par ligne » : APPLY plutôt que plusieurs sous-requêtes."
  },
  {
    id: "m06-q60", dialecte: "Standard",
    q: "UPDATE client SET ca_total = (SELECT SUM(montant) FROM commande co WHERE co.client_id = client.id); Que vaut ca_total pour un client sans commande ?",
    choix: [
      "0",
      "NULL",
      "L'ancienne valeur",
      "Une erreur"
    ],
    bonne: 1,
    pourquoi: [
      "Non. SUM sur rien = NULL.",
      "Oui. Écris COALESCE((SELECT SUM(…) …), 0) si tu veux 0.",
      "Non. La valeur est remplacée.",
      "Non. La sous-requête renvoie NULL, sans erreur."
    ],
    retenir: "UPDATE avec sous-requête : prévois le cas « rien trouvé »."
  },
  {
    id: "m06-q61", dialecte: "Standard",
    q: "Tu insères les nouveaux articles d'un fichier, sans créer de doublons si tu relances le script. Quelle écriture ?",
    choixCode: true,
    choix: [
      "INSERT INTO article (code, libelle) SELECT s.code, s.libelle FROM stg_article s WHERE EXISTS (SELECT 1 FROM article a WHERE a.code = s.code)",
      "INSERT INTO article (code, libelle) SELECT s.code, s.libelle FROM stg_article s WHERE NOT EXISTS (SELECT 1 FROM article a WHERE a.code = s.code)",
      "INSERT INTO article (code, libelle) SELECT DISTINCT s.code, s.libelle FROM stg_article s",
      "INSERT INTO article (code, libelle) SELECT s.code, s.libelle FROM stg_article s WHERE s.code NOT IN (SELECT code FROM stg_article)"
    ],
    bonne: 1,
    pourquoi: [
      "Non. EXISTS : on réinsère les codes DÉJÀ présents.",
      "Oui. On n'insère que les codes absents : le script est relançable.",
      "Non. DISTINCT ne regarde pas ce qui existe déjà dans article.",
      "Non. On compare la table de chargement à elle-même : rien n'est inséré."
    ],
    retenir: "Insertion relançable : INSERT … SELECT … WHERE NOT EXISTS."
  },
  {
    id: "m06-q62", dialecte: "SQL Server",
    q: "Comment afficher « Actif » ou « Inactif » selon qu'un client a commandé cette année ?",
    choixCode: true,
    choix: [
      "SELECT nom, EXISTS (SELECT 1 FROM commande co WHERE co.client_id = c.id AND co.annee = 2026) AS statut",
      "SELECT nom, CASE WHEN EXISTS (SELECT 1 FROM commande co WHERE co.client_id = c.id AND co.annee = 2026) THEN 'Actif' ELSE 'Inactif' END",
      "SELECT nom, CASE WHEN EXISTS (SELECT 1 FROM commande co WHERE co.client_id = c.id AND co.annee = 2025) THEN 'Actif' ELSE 'Inactif' END",
      "SELECT nom, IF EXISTS (SELECT 1 FROM commande co WHERE co.client_id = c.id) THEN 'Actif' ELSE 'Inactif'"
    ],
    bonne: 1,
    pourquoi: [
      "Non. SQL Server ne renvoie pas de booléen dans un SELECT.",
      "Oui. EXISTS s'utilise dans un CASE WHEN.",
      "Non. Mauvaise année : 2025 au lieu de l'année en cours (2026).",
      "Non. IF n'est pas une expression : il ne s'utilise pas dans un SELECT."
    ],
    retenir: "EXISTS dans le SELECT : via CASE WHEN EXISTS (…)."
  },
  {
    id: "m06-q63", dialecte: "Standard",
    q: "Une commande a client_id = NULL. Passe-t-elle WHERE client_id IN (SELECT id FROM client) ?",
    choix: [
      "Oui",
      "Non",
      "Erreur",
      "Seulement si un client a un id NULL"
    ],
    bonne: 1,
    pourquoi: [
      "Non. NULL = n'importe quoi est inconnu.",
      "Oui, elle ne passe pas. Une valeur NULL n'est jamais « dans » une liste.",
      "Non. Un NULL dans IN est permis : la ligne est juste exclue.",
      "Non. Même là, NULL = NULL n'est pas vrai."
    ],
    retenir: "NULL IN (…) n'est jamais vrai."
  },
  {
    id: "m06-q64", dialecte: "Standard",
    q: "a.ref vaut NULL. Que donne EXISTS (SELECT 1 FROM b WHERE b.ref = a.ref) ?",
    choix: [
      "Vrai si b contient des NULL",
      "Faux",
      "Erreur",
      "Vrai"
    ],
    bonne: 1,
    pourquoi: [
      "Non. b.ref = NULL n'est jamais vrai.",
      "Oui. Aucune ligne ne vérifie b.ref = NULL : EXISTS est faux.",
      "Non. La requête est valide.",
      "Non. b.ref = NULL n'est jamais vrai : aucune ligne trouvée."
    ],
    retenir: "Clé NULL : aucune correspondance, même avec EXISTS."
  },
  {
    id: "m06-q65", dialecte: "SQL Server",
    q: "Dans le plan d'exécution d'une requête avec EXISTS, tu vois « Left Semi Join ». Qu'est-ce que c'est ?",
    choix: [
      "Une erreur dans le plan d'exécution",
      "Une semi-jointure : sans doublon",
      "Un LEFT JOIN classique, avec les NULL",
      "Un CROSS JOIN suivi d'un filtre"
    ],
    bonne: 1,
    pourquoi: [
      "Non. C'est un opérateur normal du plan.",
      "Oui. Une jointure qui garde les lignes de gauche ayant au moins une correspondance, sans les dupliquer. L'optimiseur transforme IN / EXISTS en semi-jointure. NOT EXISTS devient une « Anti Semi Join ».",
      "Non. Un LEFT JOIN garde aussi les lignes sans correspondance.",
      "Non. C'est une jointure qui s'arrête dès la 1re correspondance."
    ],
    retenir: "EXISTS / IN = semi-jointure. NOT EXISTS = anti-semi-jointure."
  },
  {
    id: "m06-q66", dialecte: "SQL Server",
    q: "Pourquoi NOT IN sur une colonne qui accepte NULL donne-t-il souvent un plan plus compliqué que NOT EXISTS ?",
    choix: [
      "NOT IN ne peut pas utiliser d'index",
      "Il doit chercher un NULL dans la liste",
      "NOT IN n'utilise jamais aucun index",
      "Aucune différence : c'est le même plan"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Il le peut ; le travail en plus vient de la recherche des NULL.",
      "Oui. Le moteur doit vérifier en plus s'il existe un NULL dans la liste, pour respecter la logique à 3 valeurs. Résultat piégeux ET travail en plus. NOT EXISTS évite les deux.",
      "Non. NOT IN peut utiliser un index ; le travail en plus vient des NULL.",
      "Non. Le plan de NOT IN est plus compliqué."
    ],
    retenir: "Encore une raison de préférer NOT EXISTS."
  },
  {
    id: "m06-q67", dialecte: "Standard",
    q: "Une sous-requête est-elle toujours plus lente qu'une jointure ?",
    choix: [
      "Oui, toujours plus lente",
      "Non : souvent le même plan",
      "Non, elle est toujours plus rapide",
      "Oui, mais seulement sur SQL Server"
    ],
    bonne: 1,
    pourquoi: [
      "Non. C'est un mythe.",
      "Oui. L'optimiseur produit souvent le même plan : IN, EXISTS et JOIN sont transformés en opérations équivalentes. Choisis l'écriture la plus claire, puis vérifie le plan si besoin.",
      "Non. Pas toujours : souvent, le plan est le même.",
      "Non. Sur SQL Server aussi, le plan est souvent le même."
    ],
    retenir: "Lisibilité d'abord. Le plan d'exécution tranche."
  },
  {
    id: "m06-q68", dialecte: "Standard",
    q: "Que renvoie cette requête ?",
    code: "SELECT co.num_cde, co.montant\nFROM commande co\nWHERE co.montant > (\n  SELECT AVG(x.montant) FROM commande x\n  WHERE x.client_id = co.client_id\n);",
    choix: [
      "Les commandes au-dessus de la moyenne générale",
      "Les commandes au-dessus de la moyenne DE LEUR client",
      "Une erreur",
      "Toutes les commandes"
    ],
    bonne: 1,
    pourquoi: [
      "Non. La moyenne est calculée par client, grâce à la corrélation.",
      "Oui. Chaque commande est comparée à la moyenne de son propre client.",
      "Non. La requête est valide.",
      "Non. Seules celles au-dessus de la moyenne de leur client passent."
    ],
    retenir: "Sous-requête corrélée = comparaison « à son propre groupe »."
  },
  {
    id: "m06-q69", dialecte: "Standard",
    q: "Comment réécrire « commandes au-dessus de la moyenne de leur client » sans sous-requête corrélée ?",
    choixCode: true,
    choix: [
      "SELECT * FROM (SELECT co.*, AVG(montant) OVER (PARTITION BY client_id) AS moy FROM commande co) t WHERE t.montant > t.moy",
      "SELECT * FROM commande WHERE montant > AVG(montant) OVER (PARTITION BY client_id)",
      "SELECT * FROM (SELECT co.*, AVG(montant) OVER (PARTITION BY client_id, date_cde) AS moy FROM commande co) t WHERE t.montant > t.moy",
      "SELECT * FROM (SELECT client_id, AVG(montant) AS moy FROM commande GROUP BY client_id) t WHERE t.montant > t.moy"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. La fenêtre calcule la moyenne du client sur chaque ligne ; on filtre ensuite. Une seule lecture de la table.",
      "Non. Fenêtre interdite dans WHERE.",
      "Non. Moyenne par client ET par jour, pas sur toutes les commandes du client.",
      "Non. Après GROUP BY, la colonne montant n'existe plus : erreur."
    ],
    retenir: "Comparer à son groupe : AVG() OVER (PARTITION BY …) puis filtrer."
  },
  {
    id: "m06-q70", dialecte: "Standard",
    q: "Tu as besoin du même calcul intermédiaire à deux endroits de ta requête. Que choisir ?",
    choix: [
      "Copier-coller la sous-requête deux fois",
      "Une CTE, utilisée deux fois",
      "Deux vues",
      "Un curseur"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Une correction devra être faite deux fois : risque d'oubli.",
      "Oui. Écrit une fois, nommé, réutilisé. (Sur SQL Server, il peut être calculé deux fois : #table si c'est lourd.)",
      "Non. Possible, mais lourd pour un besoin ponctuel.",
      "Non. Un curseur traite ligne par ligne : lent, et sans rapport."
    ],
    retenir: "Ne duplique pas une sous-requête : CTE."
  },
  {
    id: "m06-q71", dialecte: "SQL Server",
    q: "Une vue peut-elle contenir une CTE (WITH) ?",
    choix: [
      "Oui",
      "Non",
      "Seulement si elle est récursive",
      "Seulement sur Snowflake"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. CREATE VIEW v AS WITH x AS (…) SELECT … FROM x;",
      "Non. CREATE VIEW … AS WITH … est valide.",
      "Non. Toute CTE est permise dans une vue.",
      "Non. Valide sur les deux."
    ],
    retenir: "WITH est permis dans une vue."
  },
  {
    id: "m06-q72", dialecte: "Standard",
    q: "Comment obtenir les 3 plus grosses commandes de chaque client ?",
    choixCode: true,
    choix: [
      "WITH r AS (SELECT *, ROW_NUMBER() OVER (ORDER BY montant DESC) AS rn FROM commande) SELECT * FROM r WHERE rn <= 3",
      "WITH r AS (SELECT *, ROW_NUMBER() OVER (PARTITION BY client_id ORDER BY montant DESC) AS rn FROM commande) SELECT * FROM r WHERE rn <= 3",
      "WITH r AS (SELECT *, ROW_NUMBER() OVER (PARTITION BY client_id ORDER BY montant) AS rn FROM commande) SELECT * FROM r WHERE rn <= 3",
      "WITH r AS (SELECT *, ROW_NUMBER() OVER (PARTITION BY client_id ORDER BY montant DESC) AS rn FROM commande) SELECT * FROM r WHERE rn < 3"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Sans PARTITION BY : 3 commandes au total, pas 3 par client.",
      "Oui. Numérotation par client, puis filtre. Le classique « top N par groupe ».",
      "Non. Tri croissant : ce sont les 3 plus PETITES.",
      "Non. rn < 3 garde seulement 2 commandes par client."
    ],
    retenir: "Top N par groupe : CTE + ROW_NUMBER + rn <= N."
  },
  {
    id: "m06-q73", dialecte: "SQL Server",
    q: "Pourquoi faut-il une CTE ou une sous-requête pour filtrer sur ROW_NUMBER() sur SQL Server ?",
    choix: [
      "Parce que ROW_NUMBER est trop lent",
      "La fenêtre est calculée après le WHERE",
      "Parce que ROW_NUMBER exige un GROUP BY",
      "Ce n'est pas nécessaire, WHERE suffit"
    ],
    bonne: 1,
    pourquoi: [
      "Non. C'est une question d'ordre de calcul, pas de vitesse.",
      "Oui. Les fonctions de fenêtrage sont calculées au SELECT, après WHERE : WHERE rn = 1 dans la même requête = erreur. On filtre au niveau du dessus.",
      "Non. ROW_NUMBER n'a pas besoin de GROUP BY.",
      "Non. Sur SQL Server, WHERE refuse les fenêtres. (Snowflake a QUALIFY.)"
    ],
    retenir: "Filtrer une fenêtre : niveau du dessus (ou QUALIFY sur Snowflake)."
  },
  {
    id: "m06-q74", dialecte: "Snowflake",
    q: "Sur Snowflake, comment garder la dernière commande de chaque client sans CTE ?",
    choixCode: true,
    choix: [
      "SELECT * FROM commande WHERE ROW_NUMBER() OVER (PARTITION BY client_id ORDER BY date_cde DESC) = 1",
      "SELECT * FROM commande QUALIFY ROW_NUMBER() OVER (PARTITION BY client_id ORDER BY date_cde DESC) = 1",
      "SELECT * FROM commande HAVING ROW_NUMBER() OVER (PARTITION BY client_id ORDER BY date_cde DESC) = 1",
      "SELECT * FROM commande QUALIFY ROW_NUMBER() OVER (PARTITION BY client_id ORDER BY date_cde) = 1"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Fenêtre interdite dans WHERE.",
      "Oui. QUALIFY filtre sur une fonction de fenêtrage, comme HAVING le fait pour les agrégats.",
      "Non. HAVING ne filtre pas les fenêtres.",
      "Non. Tri croissant : c'est la PREMIÈRE commande."
    ],
    retenir: "Snowflake : QUALIFY = WHERE pour les fenêtres."
  },
  {
    id: "m06-q75", dialecte: "Snowflake",
    q: "Sur Snowflake, cette requête fonctionne-t-elle sans table dérivée ?",
    code: "SELECT montant * 1.2 AS ttc,\n       ttc - montant AS tva\nFROM commande\nWHERE ttc > 100;",
    choix: [
      "Oui",
      "Non, il faut une sous-requête",
      "Seulement sans WHERE",
      "Erreur sur tva"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Snowflake permet de réutiliser un alias dans le même SELECT et dans le WHERE.",
      "Non sur Snowflake. (Oui sur SQL Server.)",
      "Non. Le WHERE marche aussi avec l'alias sur Snowflake.",
      "Non. Snowflake connaît déjà ttc quand il calcule tva."
    ],
    retenir: "Snowflake évite beaucoup de tables dérivées grâce aux alias réutilisables."
  },
  {
    id: "m06-q76", dialecte: "SQL Server",
    q: "Que donne cette requête sur SQL Server ?",
    code: "SELECT c.nom, t.nb\nFROM client c\nJOIN (SELECT COUNT(*) AS nb FROM commande co\n      WHERE co.client_id = c.id) t ON 1 = 1;",
    choix: [
      "Le nombre de commandes de chaque client",
      "Erreur : c.id inconnu, il faut APPLY",
      "Le nombre total de commandes, partout",
      "0 pour chaque client, car ON 1 = 1"
    ],
    bonne: 1,
    pourquoi: [
      "Non. La requête ne s'exécute pas.",
      "Oui. Une table dérivée ne peut pas utiliser une table du même FROM. Il faut CROSS APPLY (ou LATERAL sur Snowflake).",
      "Non. La requête ne s'exécute pas.",
      "Non. La requête ne s'exécute pas."
    ],
    retenir: "Sous-requête de FROM liée à une autre table : APPLY / LATERAL."
  },
  {
    id: "m06-q77", dialecte: "Standard",
    q: "Que renvoie cette requête si un client a 2 commandes le même dernier jour ?",
    code: "SELECT co.*\nFROM commande co\nJOIN (SELECT client_id, MAX(date_cde) AS d\n      FROM commande GROUP BY client_id) m\n  ON m.client_id = co.client_id AND m.d = co.date_cde;",
    choix: [
      "1 ligne pour ce client",
      "Les 2 commandes de ce jour-là",
      "Une erreur",
      "Aucune ligne"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Les deux commandes ont la date maximale.",
      "Oui. Cette méthode garde les ex aequo. ROW_NUMBER, lui, en garderait une seule.",
      "Non. La requête est valide.",
      "Non. La date maximale existe : ses commandes sont gardées."
    ],
    retenir: "Jointure sur MAX = garde les ex aequo."
  },
  {
    id: "m06-q78", dialecte: "Standard",
    q: "Tu veux UNE seule ligne par client, même en cas d'égalité sur la date. Que choisir ?",
    choix: [
      "Une jointure sur MAX(date_cde)",
      "ROW_NUMBER + un critère de départage",
      "RANK() = 1, trié par date décroissante",
      "DISTINCT sur client_id et date_cde"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Garde les ex aequo.",
      "Oui. ROW_NUMBER() avec ORDER BY date_cde DESC, id DESC, puis rn = 1 : ROW_NUMBER numérote sans égalité ; le 2e critère rend le choix stable.",
      "Non. RANK donne 1 à tous les ex aequo.",
      "Non. Deux commandes du même jour donnent toujours deux lignes."
    ],
    retenir: "Une seule ligne garantie : ROW_NUMBER + critère de départage."
  },
  {
    id: "m06-q79", dialecte: "Standard",
    q: "Peut-on trier des clients par leur nombre de commandes avec une sous-requête dans ORDER BY ?",
    code: "SELECT nom FROM client c\nORDER BY (SELECT COUNT(*) FROM commande co WHERE co.client_id = c.id) DESC;",
    choix: [
      "Oui",
      "Non, ORDER BY n'accepte pas de sous-requête",
      "Seulement avec TOP",
      "Seulement sur Snowflake"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. C'est valide. Une jointure + GROUP BY est souvent plus lisible.",
      "Non. ORDER BY accepte une sous-requête scalaire.",
      "Non. TOP n'est pas nécessaire.",
      "Non. Valide aussi sur SQL Server."
    ],
    retenir: "Une sous-requête scalaire peut servir de critère de tri."
  },
  {
    id: "m06-q80", dialecte: "SQL Server",
    q: "Peut-on mettre une sous-requête dans le GROUP BY sur SQL Server ?",
    choix: [
      "Oui",
      "Non : erreur",
      "Seulement une sous-requête corrélée",
      "Seulement avec HAVING"
    ],
    bonne: 1,
    pourquoi: [
      "Non. SQL Server refuse une sous-requête dans GROUP BY.",
      "Oui. Calcule d'abord la valeur dans une table dérivée ou une CTE, puis groupe dessus.",
      "Non. Aucune sous-requête n'est permise dans GROUP BY.",
      "Non. HAVING ne lève pas cette interdiction."
    ],
    retenir: "Pas de sous-requête dans GROUP BY : passe par une étape avant."
  },
  {
    id: "m06-q81", dialecte: "SQL Server",
    q: "Peut-on écrire un WITH à l'intérieur de la définition d'une CTE sur SQL Server ?",
    choix: [
      "Oui, autant de niveaux qu'on veut",
      "Non : on enchaîne avec des virgules",
      "Seulement dans une CTE récursive",
      "Seulement dans une vue, pas ailleurs"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Les WITH imbriqués sont refusés.",
      "Oui. WITH a AS (…), b AS (… FROM a …) : même effet, à plat. Les WITH imbriqués sont refusés.",
      "Non. Même règle : les WITH imbriqués sont refusés.",
      "Non. Même règle dans une vue."
    ],
    retenir: "Pas de WITH dans un WITH : enchaîne les CTE."
  },
  {
    id: "m06-q82", dialecte: "Standard",
    q: "Dans une CTE récursive, à quoi sert la colonne niveau (1 dans l'ancre, niveau + 1 ensuite) ?",
    choix: [
      "À rien, c'est juste pour l'affichage",
      "Profondeur, et garde-fou contre les boucles",
      "À trier automatiquement le résultat final",
      "À éviter les doublons dans la hiérarchie"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Elle sert aussi de garde-fou.",
      "Oui. À savoir à quelle profondeur est chaque ligne, et à limiter la récursion (WHERE niveau < 10). Utile pour l'affichage (indentation).",
      "Non. Rien n'est trié sans ORDER BY.",
      "Non. Un compteur de niveau n'enlève pas les doublons."
    ],
    retenir: "Compteur de niveau : profondeur + garde-fou."
  },
  {
    id: "m06-q83", dialecte: "Standard",
    q: "Après une CTE récursive d'organigramme, comment afficher chaque personne sous son chef, dans l'ordre de l'arbre ?",
    choix: [
      "ORDER BY niveau, puis par nom",
      "Trier sur un chemin construit",
      "ORDER BY nom, tout simplement",
      "Rien, l'ordre de l'arbre est gardé"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Tous les niveaux 2, puis tous les niveaux 3 : on perd qui est sous qui.",
      "Oui. Construis un chemin de tri (ex. 'PDG/Dir1/Chef3') dans la récursion, puis ORDER BY chemin : il regroupe chaque branche.",
      "Non. L'ordre alphabétique mélange les branches.",
      "Non. Pas d'ordre garanti."
    ],
    retenir: "Afficher un arbre : trier sur le chemin."
  },
  {
    id: "m06-q84", dialecte: "SQL Server",
    q: "Une table #temp créée dans une procédure stockée existe jusqu'à quand ?",
    choix: [
      "Pour toujours, jusqu'à un DROP",
      "Jusqu'à la fin de la procédure",
      "Jusqu'au prochain GO du script",
      "Une heure, puis elle est purgée"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Une #table est supprimée automatiquement à la fin de la procédure.",
      "Oui. Elle est supprimée automatiquement (ou à la fin de la session si créée hors procédure). Un DROP explicite reste une bonne pratique dans les scripts.",
      "Non. GO ne la supprime pas.",
      "Non. Aucune durée fixe : elle vit le temps de la procédure."
    ],
    retenir: "#table : vit le temps de la procédure ou de la session."
  },
  {
    id: "m06-q85", dialecte: "SQL Server",
    q: "Pourquoi une variable table (DECLARE @t TABLE) peut-elle donner un mauvais plan avec 100 000 lignes ?",
    choix: [
      "Elle est limitée à 1 000 lignes",
      "Pas de statistiques : estimation fausse",
      "Elle est stockée sur disque, pas en mémoire",
      "Elle est en lecture seule après l'insertion"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Une variable table n'a pas cette limite.",
      "Oui. L'optimiseur sous-estime souvent son nombre de lignes. Avant SQL Server 2019, l'estimation était souvent 1 ligne. Pour du volume : #table.",
      "Non. Les deux types peuvent utiliser tempdb.",
      "Non. On peut encore la modifier."
    ],
    retenir: "Petit volume : @table. Gros volume : #table."
  },
  {
    id: "m06-q86", dialecte: "SQL Server",
    q: "Comment stocker le résultat d'une CTE dans une table temporaire ?",
    choixCode: true,
    choix: [
      "WITH x AS (…) SELECT * INTO #t FROM x;",
      "SELECT * INTO #t FROM (WITH x AS (…));",
      "CREATE #t AS WITH x AS (…);",
      "INSERT WITH x INTO #t;"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. La CTE est suivie d'un SELECT … INTO.",
      "Non. WITH ne se met pas dans une sous-requête.",
      "Non. CREATE … AS n'existe pas sur SQL Server.",
      "Non. Syntaxe inventée."
    ],
    retenir: "WITH … SELECT … INTO #t FROM …"
  },
  {
    id: "m06-q87", dialecte: "SQL Server",
    q: "Dans une procédure, #commandes_mois (500 000 lignes) est jointe 4 fois ensuite sur client_id. Bonne idée ?",
    choix: [
      "Rien à faire, c'est déjà optimal",
      "Créer un index sur client_id",
      "La transformer en CTE réutilisée",
      "Ajouter DISTINCT dans chaque jointure"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Sans index, chaque jointure lit toute la table.",
      "Oui. Une table temporaire peut être indexée comme une vraie table : crée l'index après le chargement.",
      "Non. La CTE serait recalculée 4 fois.",
      "Non. DISTINCT ajoute du travail sans aider la jointure."
    ],
    retenir: "#table réutilisée souvent : indexe-la."
  },
  {
    id: "m06-q88", dialecte: "Standard",
    q: "Que change le DISTINCT dans WHERE id IN (SELECT DISTINCT client_id FROM commande) ?",
    choix: [
      "Il évite des doublons dans le résultat",
      "Rien d'utile : IN ne crée jamais de doublons",
      "Il accélère toujours",
      "Il est obligatoire"
    ],
    bonne: 1,
    pourquoi: [
      "Non. IN n'en crée pas.",
      "Oui. L'optimiseur l'ignore souvent, mais il n'apporte rien.",
      "Non. Souvent ignoré, il n'accélère pas.",
      "Non. IN marche très bien sans DISTINCT."
    ],
    retenir: "DISTINCT dans un IN : inutile."
  },
  {
    id: "m06-q89", dialecte: "Standard",
    q: "Comment trouver les clients qui ont acheté l'article A mais JAMAIS l'article B ?",
    choixCode: true,
    choix: [
      "WHERE EXISTS (… achat de A …) AND EXISTS (… achat de B …)",
      "WHERE EXISTS (… achat de A …) AND NOT EXISTS (… achat de B …)",
      "WHERE NOT EXISTS (… achat de A …) AND EXISTS (… achat de B …)",
      "WHERE article = 'A' AND article <> 'B'"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Ce sont ceux qui ont acheté A ET B.",
      "Oui. Deux tests sur l'historique du client : un EXISTS, un NOT EXISTS.",
      "Non. C'est l'inverse : B mais jamais A.",
      "Non. Ça regarde une seule ligne à la fois, pas l'historique du client."
    ],
    retenir: "« A mais jamais B » : EXISTS + NOT EXISTS."
  },
  {
    id: "m06-q90", dialecte: "Standard",
    q: "Comment trouver les clients qui ont acheté TOUS les articles de la famille 'POMPE' ?",
    choixCode: true,
    choix: [
      "GROUP BY client_id HAVING COUNT(article_id) = (SELECT COUNT(*) FROM article WHERE famille = 'POMPE'), avec un WHERE sur la famille",
      "GROUP BY client_id HAVING COUNT(DISTINCT article_id) = (SELECT COUNT(*) FROM article WHERE famille = 'POMPE'), avec un WHERE sur la famille",
      "GROUP BY client_id HAVING COUNT(DISTINCT article_id) >= 1, avec un WHERE sur la famille",
      "GROUP BY client_id HAVING COUNT(DISTINCT article_id) = (SELECT COUNT(*) FROM article), avec un WHERE sur la famille"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Sans DISTINCT, un client qui achète 3 fois la même pompe compte 3 articles.",
      "Oui. Le client a autant d'articles POMPE distincts qu'il en existe. C'est la « division relationnelle ».",
      "Non. Au moins un article POMPE, pas tous.",
      "Non. On compare au nombre total d'articles, toutes familles : presque personne ne passe."
    ],
    retenir: "« Tous les… » : compter les distincts et comparer au total."
  },
  {
    id: "m06-q91", dialecte: "Standard",
    q: "WHERE taux = (SELECT taux FROM tva WHERE pays = 'FR') marche aujourd'hui. Quel risque demain ?",
    choix: [
      "Aucun, le taux de la France est fixe",
      "Un 2e taux pour la France ferait planter",
      "Le taux deviendrait NULL pour la France",
      "La requête deviendrait de plus en plus lente"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Les taux évoluent : un taux réduit peut être ajouté.",
      "Oui. Avec un taux réduit en plus, la sous-requête renverrait 2 lignes : erreur. Sois précis (WHERE pays = 'FR' AND type = 'NORMAL') ou utilise IN si plusieurs valeurs sont possibles.",
      "Non. Deux lignes donnent une erreur, pas NULL.",
      "Non. Le risque est une erreur, pas la lenteur."
    ],
    retenir: "Sous-requête avec = : garantis une seule ligne, sinon elle cassera un jour."
  },
  {
    id: "m06-q92", dialecte: "SQL Server",
    q: "Une absence va du 26 au 30 octobre (une ligne). Comment obtenir une ligne par jour ?",
    choix: [
      "Un GROUP BY sur la date de début",
      "Une jointure avec la table calendrier",
      "Un DISTINCT sur les dates de l'absence",
      "Un PIVOT des dates de début et de fin"
    ],
    bonne: 1,
    pourquoi: [
      "Non. GROUP BY regroupe : il ne crée pas de lignes.",
      "Oui. jour BETWEEN debut AND fin : une ligne par jour. C'est souvent le plus simple et le plus rapide. (Une CTE récursive qui ajoute 1 jour marche aussi.)",
      "Non. DISTINCT enlève des lignes : il n'en crée pas.",
      "Non. PIVOT change des lignes en colonnes : il ne crée pas les jours manquants."
    ],
    retenir: "Période → jours : calendrier (ou CTE récursive)."
  },
  {
    id: "m06-q93", dialecte: "Standard",
    q: "Un cumul est calculé par sous-requête corrélée : (SELECT SUM(x.montant) FROM vente x WHERE x.date <= v.date). Quel est le problème sur un an de ventes ?",
    choix: [
      "Aucun, c'est la méthode recommandée",
      "Travail en n² : préférer SUM() OVER",
      "Le résultat est faux à partir de la 2e ligne",
      "Erreur de syntaxe sur le <= de la date"
    ],
    bonne: 1,
    pourquoi: [
      "Non. SUM() OVER fait le même calcul en une seule passe.",
      "Oui. Chaque ligne relit toutes les lignes précédentes. SUM() OVER (ORDER BY date) fait le cumul en une seule passe.",
      "Non. Le résultat est juste, c'est la vitesse qui pose problème.",
      "Non. La syntaxe est valide."
    ],
    retenir: "Cumul : fonction de fenêtrage, pas sous-requête corrélée."
  },
  {
    id: "m06-q94", dialecte: "Standard",
    q: "Tu nettoies un fichier importé en 3 étapes : 1) TRIM des textes, 2) conversion des types, 3) filtre des lignes invalides. Quelle écriture est la plus claire ?",
    choix: [
      "Une seule requête avec toutes les fonctions imbriquées",
      "Trois CTE nommées : nettoye, converti, valide",
      "Trois curseurs",
      "Trois vues permanentes"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Illisible et difficile à déboguer.",
      "Oui. Chaque étape a un nom et un rôle. On peut afficher chaque étape pour vérifier.",
      "Non. Des curseurs traitent ligne par ligne : lent et long à écrire.",
      "Non. Trop lourd pour un traitement ponctuel."
    ],
    retenir: "Traitement en étapes : une CTE par étape."
  },
  {
    id: "m06-q95", dialecte: "Standard",
    q: "Le résultat final d'une chaîne de CTE est faux. Comment trouver l'étape fautive ?",
    choix: [
      "Tout réécrire depuis le début, en une requête",
      "Afficher les étapes une par une",
      "Ajouter DISTINCT à chaque étape",
      "Ajouter ORDER BY à la fin de chaque CTE"
    ],
    bonne: 1,
    pourquoi: [
      "Non. On perdrait l'avantage des étapes nommées.",
      "Oui. Remplace le SELECT final par SELECT * FROM etape2 (puis etape1…) pour voir chaque résultat intermédiaire. C'est le gros avantage des CTE.",
      "Non. DISTINCT cache les erreurs au lieu de les montrer.",
      "Non. SQL Server refuse ORDER BY sans TOP dans une CTE."
    ],
    retenir: "Déboguer une chaîne de CTE : afficher les étapes une par une."
  },
  {
    id: "m06-q96", dialecte: "SQL Server",
    q: "Sur SQL Server, une table dérivée et la même logique en CTE (utilisée une fois) ont-elles des performances différentes ?",
    choix: [
      "La CTE est toujours plus rapide",
      "En général non : même plan",
      "La table dérivée est stockée sur disque",
      "La CTE est stockée en mémoire"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Utilisée une fois, la CTE donne le même plan.",
      "Oui. Les deux sont intégrées de la même façon dans le plan. Choisis pour la lisibilité.",
      "Non. Elle est intégrée au plan, rien n'est stocké.",
      "Non. Pas sur SQL Server."
    ],
    retenir: "CTE ou table dérivée : même plan en général. Lisibilité d'abord."
  },
  {
    id: "m06-q97", dialecte: "Standard",
    q: "Comment lister les commandes livrées qui n'ont pas encore de facture ?",
    choixCode: true,
    choix: [
      "WHERE statut = 'LIVREE' AND NOT EXISTS (SELECT 1 FROM facture f WHERE f.cde_id = co.id)",
      "WHERE statut = 'LIVREE' AND EXISTS (SELECT 1 FROM facture f WHERE f.cde_id = co.id)",
      "WHERE statut = 'LIVREE' AND NOT EXISTS (SELECT 1 FROM facture f WHERE f.cde_id = co.client_id)",
      "WHERE statut <> 'FACTUREE'"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Livrée, et aucune facture rattachée. Contrôle classique de fin de mois.",
      "Non. Ce sont celles qui ONT une facture.",
      "Non. Mauvaise colonne : on compare au client, pas à la commande.",
      "Non. Se fier au statut est moins sûr que vérifier l'existence de la facture."
    ],
    retenir: "Contrôle « oublis » : NOT EXISTS vers le document suivant."
  },
  {
    id: "m06-q98", dialecte: "Standard",
    q: "Comment trouver les factures dont le montant d'en-tête ne correspond pas à la somme de leurs lignes ?",
    choixCode: true,
    choix: [
      "WHERE f.montant_ht <> (SELECT SUM(l.montant) FROM facture_ligne l WHERE l.facture_id = f.id)",
      "WHERE f.montant_ht <> (SELECT SUM(l.montant) FROM facture_ligne l)",
      "WHERE f.montant_ht = (SELECT SUM(l.montant) FROM facture_ligne l WHERE l.facture_id = f.id)",
      "WHERE f.montant_ht <> (SELECT MAX(l.montant) FROM facture_ligne l WHERE l.facture_id = f.id)"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Contrôle de cohérence en-tête / lignes. Attention : une facture sans ligne donne NULL et n'apparaît pas → ajoute COALESCE.",
      "Non. Sans lien avec la facture : on compare au total de TOUTES les lignes.",
      "Non. = : ce sont les factures cohérentes.",
      "Non. MAX = la plus grosse ligne, pas la somme."
    ],
    retenir: "Contrôle en-tête / lignes : sous-requête corrélée avec SUM."
  },
  {
    id: "m06-q99", dialecte: "SQL Server",
    q: "Une CTE récursive sur une nomenclature de 2 millions de lignes est lente. Quelle piste en priorité ?",
    choix: [
      "Ajouter DISTINCT dans la récursion",
      "Un index sur parent_id",
      "Mettre OPTION (MAXRECURSION 0)",
      "Utiliser UNION au lieu de UNION ALL"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Interdit dans la partie récursive, et inutile.",
      "Oui. Chaque niveau fait une recherche sur la colonne parcourue (parent_id). Sans index, chaque niveau relit toute la table.",
      "Non. Ça n'accélère rien.",
      "Non. Interdit."
    ],
    retenir: "CTE récursive : indexe la colonne de lien parent."
  },
  {
    id: "m06-q100", dialecte: "Standard",
    q: "Quel outil choisir dans chaque cas ?",
    choix: [
      "Toujours une sous-requête, c'est plus simple",
      "Chacun son usage : EXISTS, CTE, #table, vue",
      "Toujours une table temporaire, plus rapide",
      "Toujours une vue, plus facile à partager"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Pour un gros résultat réutilisé, une #table est meilleure.",
      "Oui. EXISTS pour « existe-t-il », CTE pour découper en étapes lisibles, #table pour un gros résultat réutilisé, vue pour une logique partagée et permanente.",
      "Non. Pour un simple test d'existence, EXISTS suffit.",
      "Non. Une vue est permanente : trop lourde pour un besoin ponctuel."
    ],
    retenir: "EXISTS, CTE, #table, vue : chacun son rôle."
  }
];
