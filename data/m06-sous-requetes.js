LEARNSQL.questions.m06 = [
  {
    id: "m06-q01", dialecte: "Standard",
    q: "Que contient la colonne derniere de cette requête ?",
    code: "SELECT num_cde,\n       (SELECT MAX(date_cde) FROM commande) AS derniere\nFROM commande;",
    choix: [
      "La date de chaque commande",
      "La même valeur sur toutes les lignes : la date de commande la plus récente de la table",
      "Une erreur",
      "NULL"
    ],
    bonne: 1,
    pourquoi: [
      "Non. La sous-requête ne dépend pas de la ligne.",
      "Oui. Sous-requête scalaire non corrélée : calculée une fois, répétée partout.",
      "Non. Elle renvoie une seule valeur : c'est valide.",
      "Non."
    ],
    retenir: "Sous-requête scalaire non corrélée = une valeur pour toute la requête."
  },
  {
    id: "m06-q02", dialecte: "Standard",
    q: "La sous-requête scalaire (SELECT prix FROM tarif WHERE article = 'A1') renvoie 2 lignes. Que se passe-t-il ?",
    choix: ["Le 1er prix est pris", "Erreur : la sous-requête renvoie plus d'une valeur", "Les deux prix sont additionnés", "NULL"],
    bonne: 1,
    pourquoi: [
      "Non. Le moteur ne choisit pas.",
      "Oui. Une sous-requête scalaire doit renvoyer au plus 1 ligne. Sinon : erreur à l'exécution.",
      "Non.",
      "Non."
    ],
    retenir: "Sous-requête scalaire : 1 ligne max, sinon erreur."
  },
  {
    id: "m06-q03", dialecte: "Standard",
    q: "La sous-requête scalaire ne trouve aucune ligne. Que vaut-elle ?",
    choix: ["0", "NULL", "Une erreur", "''"],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Pas de ligne = NULL. Pense à COALESCE si tu calcules avec.",
      "Non. Zéro ligne n'est pas une erreur.",
      "Non."
    ],
    retenir: "Sous-requête scalaire vide = NULL."
  },
  {
    id: "m06-q04", dialecte: "Standard",
    q: "Que renvoie cette requête ?",
    code: "SELECT c.nom,\n       (SELECT MAX(co.date_cde)\n        FROM commande co\n        WHERE co.client_id = c.id) AS derniere_cde\nFROM client c;",
    choix: [
      "Chaque client avec la date de sa dernière commande (NULL s'il n'en a pas)",
      "Seulement les clients qui ont commandé",
      "La dernière commande de la table pour tous",
      "Une erreur"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Sous-requête corrélée : elle utilise c.id, donc elle dépend du client.",
      "Non. Tous les clients sont gardés : sans commande, la valeur est NULL.",
      "Non. Le WHERE la lie à chaque client.",
      "Non."
    ],
    retenir: "Sous-requête corrélée = recalculée (logiquement) pour chaque ligne."
  },
  {
    id: "m06-q05", dialecte: "Standard",
    q: "Qu'est-ce qui rend une sous-requête « corrélée » ?",
    choix: [
      "Elle contient un GROUP BY",
      "Elle utilise une colonne de la requête extérieure",
      "Elle est dans le FROM",
      "Elle renvoie plusieurs lignes"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Ex. WHERE co.client_id = c.id : c vient de la requête du dessus.",
      "Non. Une sous-requête dans FROM n'est pas corrélée (sauf avec APPLY / LATERAL).",
      "Non."
    ],
    retenir: "Corrélée = elle regarde la ligne en cours de la requête extérieure."
  },
  {
    id: "m06-q06", dialecte: "Standard",
    q: "Comment réécrire la sous-requête « dernière commande par client » (dans le SELECT) avec une jointure ?",
    choixCode: true,
    choix: [
      "client c INNER JOIN commande co … GROUP BY c.nom",
      "client c LEFT JOIN (SELECT client_id, MAX(date_cde) AS derniere FROM commande GROUP BY client_id) m ON m.client_id = c.id",
      "client c CROSS JOIN commande",
      "client c WHERE EXISTS (…)"
    ],
    bonne: 1,
    pourquoi: [
      "Non. INNER perd les clients sans commande.",
      "Oui. On agrège une fois, puis LEFT JOIN. Souvent plus efficace sur de gros volumes.",
      "Non.",
      "Non. EXISTS ne ramène pas de valeur."
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
    choix: ["Ça marche", "Erreur : la sous-requête de IN doit renvoyer une seule colonne", "Ça compare les deux colonnes", "NULL"],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Une colonne à comparer = une colonne dans la sous-requête. Pour plusieurs colonnes : EXISTS.",
      "Non. SQL Server ne compare pas des paires avec IN.",
      "Non."
    ],
    retenir: "IN (sous-requête) : une seule colonne."
  },
  {
    id: "m06-q09", dialecte: "Standard",
    q: "Rappel : la sous-requête contient un client_id NULL. Que renvoie WHERE id NOT IN (SELECT client_id FROM commande) ?",
    choix: ["Les clients sans commande", "Aucune ligne", "Tous les clients", "Une erreur"],
    bonne: 1,
    pourquoi: [
      "Non. Le NULL casse le NOT IN.",
      "Oui. id <> NULL est inconnu pour tout le monde : rien ne passe.",
      "Non.",
      "Non. Aucune erreur pour te prévenir."
    ],
    retenir: "NOT IN + un seul NULL = 0 ligne."
  },
  {
    id: "m06-q10", dialecte: "Standard",
    q: "Quelles corrections rendent fiable « clients sans commande » ?",
    choix: [
      "Ajouter DISTINCT dans la sous-requête",
      "Utiliser NOT EXISTS, ou ajouter WHERE client_id IS NOT NULL dans la sous-requête du NOT IN",
      "Remplacer NOT IN par IN",
      "Ajouter ORDER BY"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Le NULL reste dans la liste.",
      "Oui. NOT EXISTS est le plus sûr. Filtrer les NULL marche aussi, si on n'oublie pas.",
      "Non. Ça inverse le sens.",
      "Non."
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
      "Aucune : EXISTS ne regarde pas les colonnes, seulement s'il y a des lignes",
      "SELECT NULL renvoie toujours faux",
      "SELECT 1 est obligatoire"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Les colonnes ne sont pas lues.",
      "Oui. SELECT 1 est juste une convention lisible.",
      "Non. Même une ligne avec NULL compte comme une ligne.",
      "Non."
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
      "Non.",
      "Non."
    ],
    retenir: "EXISTS sans lien avec la ligne extérieure = vrai ou faux pour toutes les lignes."
  },
  {
    id: "m06-q14", dialecte: "Standard",
    q: "La table article n'a PAS de colonne client_id. Que renvoie SELECT * FROM client WHERE client_id IN (SELECT client_id FROM article); si client a une colonne client_id ?",
    choix: [
      "Une erreur : colonne inconnue",
      "Tous les clients (dont client_id n'est pas NULL), si article n'est pas vide",
      "Aucun client",
      "Les clients liés à un article"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Piège célèbre : pas d'erreur !",
      "Oui. Dans la sous-requête, client_id est cherché dans article, puis… dans la requête extérieure. On teste client_id IN (client_id) : toujours vrai.",
      "Non.",
      "Non."
    ],
    retenir: "Dans une sous-requête, une colonne introuvable est cherchée à l'extérieur. Préfixe toujours."
  },
  {
    id: "m06-q15", dialecte: "Standard",
    q: "Quelle habitude évite le piège de la colonne « empruntée » à la requête extérieure ?",
    choix: [
      "Mettre DISTINCT",
      "Préfixer chaque colonne de la sous-requête par l'alias de sa table (a.client_id)",
      "Utiliser NOT IN",
      "Éviter les sous-requêtes"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Avec a.client_id, une colonne absente provoque une vraie erreur.",
      "Non.",
      "Non. Les sous-requêtes sont utiles."
    ],
    retenir: "Alias + préfixe partout, surtout dans les sous-requêtes."
  },
  {
    id: "m06-q16", dialecte: "Standard",
    q: "Tu veux la liste des clients ayant commandé, chacun une fois. Pourquoi IN ou EXISTS plutôt qu'un INNER JOIN ?",
    choix: [
      "C'est obligatoire",
      "Le JOIN répète le client pour chaque commande ; IN / EXISTS ne créent pas de doublons",
      "Le JOIN est interdit sur ces tables",
      "Aucune raison"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Pas besoin de DISTINCT avec une semi-jointure.",
      "Non.",
      "Non."
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
      "Non.",
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
      "Non."
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
      "WHERE SUM(montant) > AVG(SUM(montant))",
      "HAVING SUM(montant) > (SELECT AVG(ca) FROM (SELECT SUM(montant) AS ca FROM commande GROUP BY client_id) t)",
      "HAVING SUM(montant) > AVG(montant)",
      "ORDER BY SUM(montant) DESC"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Agrégats imbriqués et agrégat dans WHERE : erreur.",
      "Oui. La sous-requête calcule la moyenne des CA par client ; HAVING compare chaque client.",
      "Non. C'est la moyenne des commandes, pas des CA clients.",
      "Non."
    ],
    retenir: "Comparer un groupe à une moyenne de groupes : sous-requête dans HAVING."
  },
  {
    id: "m06-q21", dialecte: "SQL Server",
    q: "Que donne SELECT * FROM (SELECT id, nom FROM client); sur SQL Server ?",
    choix: ["Tous les clients", "Erreur : la table dérivée doit avoir un alias", "Une seule ligne", "NULL"],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Écris … FROM (SELECT …) AS t.",
      "Non.",
      "Non."
    ],
    retenir: "Sous-requête dans FROM : alias obligatoire (SQL Server)."
  },
  {
    id: "m06-q22", dialecte: "SQL Server",
    q: "Que donne SELECT * FROM (SELECT YEAR(date_cde) FROM commande) AS t; ?",
    choix: ["La liste des années", "Erreur : la colonne 1 de t n'a pas de nom", "Une ligne", "NULL"],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Chaque colonne d'une table dérivée doit avoir un nom : YEAR(date_cde) AS annee.",
      "Non.",
      "Non."
    ],
    retenir: "Table dérivée : chaque colonne nommée."
  },
  {
    id: "m06-q23", dialecte: "SQL Server",
    q: "Que donne une table dérivée avec ORDER BY (sans TOP) sur SQL Server ?",
    code: "SELECT *\nFROM (SELECT nom FROM client ORDER BY nom) AS t;",
    choix: ["Les noms triés", "Erreur : ORDER BY interdit dans une table dérivée sans TOP", "Les noms au hasard", "Une ligne"],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Une sous-requête est un ensemble, sans ordre. Le tri se met dans la requête finale.",
      "Non.",
      "Non."
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
      "Non.",
      "Non."
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
      "Non.",
      "Oui. WITH nom AS (requête), puis la requête qui l'utilise.",
      "Non.",
      "Non."
    ],
    retenir: "WITH nom AS ( … ) SELECT … FROM nom."
  },
  {
    id: "m06-q26", dialecte: "SQL Server",
    q: "Pourquoi voit-on souvent ;WITH au lieu de WITH sur SQL Server ?",
    choix: [
      "C'est une syntaxe spéciale plus rapide",
      "L'instruction précédente doit finir par ; : le ; devant WITH protège si on l'a oublié",
      "Pour commenter la ligne",
      "Pour créer une CTE récursive"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Sinon : erreur de syntaxe près de WITH. Mieux : finir toutes les instructions par ;.",
      "Non.",
      "Non."
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
      "Non.",
      "Non. Le ; termine l'instruction : b ne verrait plus a."
    ],
    retenir: "Un seul WITH, CTE séparées par des virgules."
  },
  {
    id: "m06-q28", dialecte: "Standard",
    q: "Dans WITH a AS (…), b AS (…), la CTE b peut-elle utiliser a ?",
    choix: ["Oui", "Non", "Seulement en récursif", "Seulement sur Snowflake"],
    bonne: 0,
    pourquoi: [
      "Oui. Une CTE peut utiliser celles définies AVANT elle. C'est ce qui permet d'avancer étape par étape.",
      "Non.",
      "Non.",
      "Non. Valide partout."
    ],
    retenir: "Une CTE voit les CTE précédentes."
  },
  {
    id: "m06-q29", dialecte: "Standard",
    q: "Après WITH ca AS (…) SELECT * FROM ca; tu écris une 2e requête SELECT * FROM ca;. Que se passe-t-il ?",
    choix: ["Ça marche", "Erreur : la CTE n'existe que pour la requête qui la suit directement", "Ça renvoie 0 ligne", "Ça recalcule"],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Pour réutiliser un résultat dans plusieurs requêtes : table temporaire ou vue.",
      "Non.",
      "Non."
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
      "Non.",
      "Non."
    ],
    retenir: "SQL Server : CTE = texte réutilisé, pas résultat stocké."
  },
  {
    id: "m06-q31", dialecte: "Standard",
    q: "Que permet l'écriture WITH ca_annuel (annee, ca) AS (SELECT YEAR(date_cde), SUM(montant) FROM commande GROUP BY YEAR(date_cde)) ?",
    choix: [
      "Rien, c'est une erreur",
      "Nommer les colonnes de la CTE dans l'en-tête, au lieu de mettre des alias dans le SELECT",
      "Créer une table",
      "Trier le résultat"
    ],
    bonne: 1,
    pourquoi: [
      "Non. C'est valide.",
      "Oui. La liste (annee, ca) donne les noms des colonnes. Pratique et lisible.",
      "Non.",
      "Non."
    ],
    retenir: "WITH nom (col1, col2) AS (…) : noms des colonnes dans l'en-tête."
  },
  {
    id: "m06-q32", dialecte: "Standard",
    q: "Quelle est la différence entre une CTE et une vue ?",
    choix: [
      "Aucune",
      "La vue est enregistrée dans la base et réutilisable ; la CTE n'existe que dans la requête",
      "La CTE est plus rapide",
      "La vue ne peut pas avoir de jointure"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Vue = objet permanent, partagé. CTE = étape temporaire d'une requête.",
      "Non. Les deux sont « dépliées » dans la requête.",
      "Non."
    ],
    retenir: "Vue = permanente. CTE = locale à une requête."
  },
  {
    id: "m06-q33", dialecte: "SQL Server",
    q: "Pourquoi choisir une table temporaire #t plutôt qu'une CTE dans une procédure en plusieurs étapes ?",
    choix: [
      "Elle est toujours plus lente",
      "Le résultat est stocké : réutilisable dans plusieurs requêtes, avec des statistiques et des index possibles",
      "Elle est visible par tous les utilisateurs",
      "Elle évite les verrous"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Calculée une fois, lue plusieurs fois. Les statistiques aident l'optimiseur.",
      "Non. #t est privée à la session.",
      "Non."
    ],
    retenir: "Résultat intermédiaire réutilisé ou volumineux : #table."
  },
  {
    id: "m06-q34", dialecte: "SQL Server",
    q: "Que donne une CTE qui contient ORDER BY (sans TOP) sur SQL Server ?",
    choix: ["Le résultat trié", "Une erreur", "Le tri est ignoré en silence", "Un tri aléatoire"],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Même règle que les tables dérivées et les vues. Trie dans la requête finale.",
      "Non. SQL Server refuse.",
      "Non."
    ],
    retenir: "Pas d'ORDER BY dans une CTE (sauf avec TOP)."
  },
  {
    id: "m06-q35", dialecte: "SQL Server",
    q: "Que fait ce code sur SQL Server ?",
    code: "WITH d AS (\n  SELECT *, ROW_NUMBER() OVER (\n    PARTITION BY num_facture ORDER BY id) AS rn\n  FROM facture_import\n)\nDELETE FROM d WHERE rn > 1;",
    choix: [
      "Erreur : on ne supprime pas dans une CTE",
      "Il supprime les doublons de facture_import, en gardant la plus petite id par numéro",
      "Il supprime toute la table",
      "Il ne supprime rien"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Sur SQL Server, une CTE sur une seule table peut être la cible d'un DELETE.",
      "Oui. Technique classique de dédoublonnage. Teste d'abord avec SELECT … WHERE rn > 1.",
      "Non. Seulement rn > 1.",
      "Non."
    ],
    retenir: "SQL Server : dédoublonner avec CTE + ROW_NUMBER + DELETE WHERE rn > 1."
  },
  {
    id: "m06-q36", dialecte: "SQL Server",
    q: "WITH x AS (SELECT id, statut FROM commande WHERE annee = 2020) UPDATE x SET statut = 'ARCHIVE'; Que modifie-t-on ?",
    choix: ["Rien, une CTE est en lecture seule", "Les commandes de 2020 dans la table commande", "Toute la table", "Une copie temporaire"],
    bonne: 1,
    pourquoi: [
      "Non. Sur SQL Server, une CTE simple (une table) est modifiable.",
      "Oui. La modification est appliquée à la table d'origine.",
      "Non. Seulement les lignes de la CTE.",
      "Non."
    ],
    retenir: "UPDATE / DELETE via une CTE = modifie la table de base."
  },
  {
    id: "m06-q37", dialecte: "Snowflake",
    q: "Sur Snowflake, comment dédoublonner une table (garder 1 ligne par numéro) ?",
    choix: [
      "WITH d AS (…ROW_NUMBER…) DELETE FROM d WHERE rn > 1",
      "Réécrire la table : INSERT OVERWRITE INTO t SELECT * FROM t QUALIFY ROW_NUMBER() OVER (PARTITION BY num ORDER BY id) = 1",
      "DELETE DISTINCT FROM t",
      "C'est impossible"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Snowflake ne supprime pas à travers une CTE.",
      "Oui. On réécrit la table avec une seule ligne par clé. (CREATE OR REPLACE TABLE … AS SELECT … marche aussi.)",
      "Non. N'existe pas.",
      "Non."
    ],
    retenir: "Snowflake : dédoublonner = réécrire avec QUALIFY ROW_NUMBER() = 1."
  },
  {
    id: "m06-q38", dialecte: "Standard",
    q: "Une requête contient 4 sous-requêtes imbriquées les unes dans les autres. Quel est l'intérêt de la réécrire en CTE ?",
    choix: [
      "Aucun",
      "Lire de haut en bas, étape par étape, avec un nom parlant pour chaque étape",
      "Elle devient toujours plus rapide",
      "Elle devient récursive"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Même résultat, mais compréhensible et facile à déboguer.",
      "Non. Sur SQL Server, le plan est souvent le même.",
      "Non."
    ],
    retenir: "CTE = lisibilité. Une étape, un nom."
  },
  {
    id: "m06-q39", dialecte: "Standard",
    q: "Quelles sont les deux parties d'une CTE récursive ?",
    choix: [
      "SELECT et FROM",
      "L'ancre (point de départ) et la partie récursive (qui se rappelle), reliées par UNION ALL",
      "WHERE et HAVING",
      "Deux CTE séparées"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. L'ancre donne les premières lignes ; la partie récursive part des lignes précédentes pour trouver les suivantes.",
      "Non.",
      "Non."
    ],
    retenir: "Récursive = ancre UNION ALL partie récursive."
  },
  {
    id: "m06-q40", dialecte: "Standard",
    q: "Quand une CTE récursive s'arrête-t-elle ?",
    choix: [
      "Après 10 tours",
      "Quand la partie récursive ne renvoie plus aucune ligne",
      "Quand l'ancre est vide",
      "Jamais"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Plus de nouvelles lignes = fin. Si les données bouclent, elle ne s'arrête pas toute seule.",
      "Non. Si l'ancre est vide, elle ne commence même pas.",
      "Non."
    ],
    retenir: "Fin de récursion = plus de nouvelles lignes."
  },
  {
    id: "m06-q41", dialecte: "SQL Server",
    q: "Une CTE récursive plante avec « The maximum recursion 100 has been exhausted ». Que veut dire ce message ?",
    choix: [
      "La table a plus de 100 lignes",
      "La récursion a dépassé 100 niveaux : limite par défaut de SQL Server (hiérarchie profonde, ou boucle dans les données)",
      "Il y a 100 erreurs",
      "La requête dure plus de 100 secondes"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Vérifie d'abord s'il y a une boucle. Si la profondeur est normale : OPTION (MAXRECURSION n).",
      "Non.",
      "Non."
    ],
    retenir: "MAXRECURSION par défaut = 100 niveaux."
  },
  {
    id: "m06-q42", dialecte: "SQL Server",
    q: "Que fait OPTION (MAXRECURSION 0) à la fin d'une requête récursive ?",
    choix: [
      "Interdit la récursion",
      "Supprime la limite de niveaux. Attention : une boucle dans les données tournera sans fin",
      "Limite à 0 ligne",
      "Accélère la requête"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Préfère une limite raisonnable (ex. 1000) ou un garde-fou sur le niveau.",
      "Non.",
      "Non."
    ],
    retenir: "MAXRECURSION 0 = sans limite. À utiliser avec un garde-fou."
  },
  {
    id: "m06-q43", dialecte: "Standard",
    q: "Une nomenclature contient une erreur : A contient B, et B contient A. Que fait une CTE récursive qui la parcourt ?",
    choix: [
      "Elle s'arrête normalement",
      "Elle tourne en boucle jusqu'à la limite de récursion (ou sans fin)",
      "Elle ignore la boucle",
      "Elle renvoie 0 ligne"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Garde-fou : un compteur de niveau (WHERE niveau < 20), ou un chemin et un test « déjà visité ».",
      "Non. Le moteur ne détecte pas les cycles tout seul.",
      "Non."
    ],
    retenir: "Données en boucle = récursion infinie. Prévois un garde-fou."
  },
  {
    id: "m06-q44", dialecte: "SQL Server",
    q: "Erreur : « Types don't match between the anchor and the recursive part ». Cause probable ?",
    choix: [
      "Une colonne n'a pas exactement le même type (ou la même longueur) dans l'ancre et dans la partie récursive",
      "Il manque un alias",
      "La table est vide",
      "Il faut UNION au lieu de UNION ALL"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Ex. chemin VARCHAR(50) dans l'ancre, VARCHAR(100) après concaténation. Fais un CAST identique des deux côtés.",
      "Non.",
      "Non.",
      "Non."
    ],
    retenir: "Récursif : mêmes types, mêmes longueurs, des deux côtés (CAST)."
  },
  {
    id: "m06-q45", dialecte: "SQL Server",
    q: "Tu construis le chemin « PDG > Directeur > Chef » dans une CTE récursive. Comment écrire la colonne chemin dans l'ancre ?",
    choixCode: true,
    choix: [
      "nom AS chemin",
      "CAST(nom AS varchar(1000)) AS chemin",
      "'chemin' AS chemin",
      "NULL AS chemin"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Le type serait celui de nom (ex. varchar(50)) : trop court, et types différents ensuite.",
      "Oui. On fixe un type assez large. La partie récursive fait CAST(chemin + ' > ' + nom AS varchar(1000)).",
      "Non.",
      "Non."
    ],
    retenir: "Chemin récursif : CAST large et identique des deux côtés."
  },
  {
    id: "m06-q46", dialecte: "SQL Server",
    q: "Sur SQL Server, peut-on relier l'ancre et la partie récursive avec UNION (sans ALL) ?",
    choix: ["Oui", "Non : UNION ALL est obligatoire", "Seulement avec DISTINCT", "Seulement sur deux niveaux"],
    bonne: 1,
    pourquoi: [
      "Non. SQL Server refuse.",
      "Oui. UNION ALL obligatoire entre l'ancre et la partie récursive.",
      "Non.",
      "Non."
    ],
    retenir: "CTE récursive (SQL Server) : UNION ALL."
  },
  {
    id: "m06-q47", dialecte: "SQL Server",
    q: "Dans la partie récursive d'une CTE, SQL Server accepte-t-il un LEFT JOIN vers la CTE elle-même ?",
    choix: ["Oui", "Non : les jointures externes sont interdites dans la partie récursive", "Seulement RIGHT JOIN", "Seulement avec TOP"],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Seulement des jointures internes dans la partie récursive.",
      "Non.",
      "Non."
    ],
    retenir: "Partie récursive : pas de LEFT / RIGHT / FULL JOIN."
  },
  {
    id: "m06-q48", dialecte: "SQL Server",
    q: "Lequel de ces éléments est INTERDIT dans la partie récursive d'une CTE sur SQL Server ?",
    choix: ["Un INNER JOIN", "Un WHERE", "GROUP BY, TOP, DISTINCT ou un agrégat", "Une colonne calculée"],
    bonne: 2,
    pourquoi: [
      "Non. C'est même le cas normal.",
      "Non. WHERE sert souvent de garde-fou.",
      "Oui. Fais les agrégats APRÈS la récursion, dans la requête finale.",
      "Non. Ex. niveau + 1."
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
      "Non.",
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
      "Non.",
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
      "Non."
    ],
    retenir: "Monter : s.id = r.manager_id. Descendre : s.manager_id = r.id."
  },
  {
    id: "m06-q52", dialecte: "SQL Server",
    q: "Comment générer tous les jours d'octobre 2026 avec une CTE récursive ?",
    code: "WITH jours AS (\n  SELECT CAST('20261001' AS date) AS d\n  UNION ALL\n  SELECT DATEADD(day, 1, d) FROM jours\n  WHERE ???\n)\nSELECT d FROM jours;",
    choixCode: true,
    choix: ["d < '20261031'", "d <= '20261031'", "d = '20261031'", "d >= '20261001'"],
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
    choix: ["GENERATE_SERIES(1, 100)", "RANGE(1, 100)", "SEQUENCE(1, 100)", "GENERATOR(100)"],
    bonne: 0,
    pourquoi: [
      "Oui. SELECT value FROM GENERATE_SERIES(1, 100). Plus simple qu'une CTE récursive.",
      "Non. Python.",
      "Non.",
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
      "SELECT * FROM GENERATE_SERIES(1, 365)",
      "SELECT 1 TO 365",
      "SELECT * FROM RANGE(365)"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. GENERATOR crée des lignes vides ; ROW_NUMBER les numérote sans trou (SEQ4 seul peut avoir des trous).",
      "Non. Syntaxe SQL Server 2022.",
      "Non.",
      "Non."
    ],
    retenir: "Snowflake : TABLE(GENERATOR(ROWCOUNT => n))."
  },
  {
    id: "m06-q55", dialecte: "Snowflake",
    q: "Sur Snowflake, quel mot-clé est conseillé pour une CTE récursive ?",
    choixCode: true,
    choix: ["WITH RECURSIVE", "WITH LOOP", "RECURSIVE WITH", "WITH REPEAT"],
    bonne: 0,
    pourquoi: [
      "Oui. WITH RECURSIVE nom (colonnes) AS (ancre UNION ALL récursion). Lisible et standard.",
      "Non.",
      "Non.",
      "Non."
    ],
    retenir: "Snowflake : WITH RECURSIVE."
  },
  {
    id: "m06-q56", dialecte: "Snowflake",
    q: "Sur Snowflake, quelle autre syntaxe parcourt une hiérarchie, en plus des CTE récursives ?",
    choixCode: true,
    choix: [
      "START WITH manager_id IS NULL CONNECT BY manager_id = PRIOR id",
      "HIERARCHY BY manager_id",
      "TREE (id, manager_id)",
      "LOOP JOIN"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. CONNECT BY (syntaxe venue d'Oracle) : START WITH = la racine, PRIOR = la ligne parente.",
      "Non.",
      "Non.",
      "Non."
    ],
    retenir: "Snowflake : CONNECT BY … PRIOR … comme alternative."
  },
  {
    id: "m06-q57", dialecte: "Snowflake",
    q: "Une requête SQL Server avec une sous-requête corrélée dans le SELECT échoue sur Snowflake (« Unsupported subquery type »). Que faire ?",
    choix: [
      "Abandonner la migration",
      "La réécrire avec une jointure sur une sous-requête agrégée, ou une fonction de fenêtrage",
      "Ajouter DISTINCT",
      "Ajouter LIMIT 1"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Snowflake gère moins de formes de sous-requêtes corrélées. Les jointures et les fenêtres marchent toujours.",
      "Non.",
      "Non. Pas suffisant."
    ],
    retenir: "Snowflake : préfère jointures et fenêtres aux sous-requêtes corrélées."
  },
  {
    id: "m06-q58", dialecte: "SQL Server",
    q: "Comment écrire une sous-requête scalaire qui renvoie le DERNIER prix d'un article, à coup sûr sur une seule ligne ?",
    choixCode: true,
    choix: [
      "(SELECT prix FROM tarif t WHERE t.article_id = a.id)",
      "(SELECT TOP (1) prix FROM tarif t WHERE t.article_id = a.id ORDER BY t.date_effet DESC)",
      "(SELECT MAX(prix) FROM tarif t WHERE t.article_id = a.id)",
      "(SELECT prix FROM tarif)"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Plusieurs tarifs = erreur.",
      "Oui. TOP (1) garantit une ligne ; ORDER BY choisit la plus récente.",
      "Non. Le prix le plus haut, pas le dernier.",
      "Non."
    ],
    retenir: "Sous-requête scalaire sûre : TOP (1) + ORDER BY."
  },
  {
    id: "m06-q59", dialecte: "SQL Server",
    q: "Tu as besoin du dernier prix ET de sa date d'effet. Pourquoi OUTER APPLY plutôt que deux sous-requêtes scalaires ?",
    choix: [
      "Une sous-requête scalaire ne peut renvoyer qu'une colonne : il en faudrait deux, donc deux lectures",
      "APPLY est obligatoire",
      "Les sous-requêtes sont interdites dans SELECT",
      "Aucune différence"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. APPLY renvoie plusieurs colonnes en une seule fois.",
      "Non.",
      "Non.",
      "Non."
    ],
    retenir: "Plusieurs colonnes « par ligne » : APPLY plutôt que plusieurs sous-requêtes."
  },
  {
    id: "m06-q60", dialecte: "Standard",
    q: "UPDATE client SET ca_total = (SELECT SUM(montant) FROM commande co WHERE co.client_id = client.id); Que vaut ca_total pour un client sans commande ?",
    choix: ["0", "NULL", "L'ancienne valeur", "Une erreur"],
    bonne: 1,
    pourquoi: [
      "Non. SUM sur rien = NULL.",
      "Oui. Écris COALESCE((SELECT SUM(…) …), 0) si tu veux 0.",
      "Non. La valeur est remplacée.",
      "Non."
    ],
    retenir: "UPDATE avec sous-requête : prévois le cas « rien trouvé »."
  },
  {
    id: "m06-q61", dialecte: "Standard",
    q: "Tu insères les nouveaux articles d'un fichier, sans créer de doublons si tu relances le script. Quelle écriture ?",
    choixCode: true,
    choix: [
      "INSERT INTO article SELECT * FROM stg_article",
      "INSERT INTO article (code, libelle) SELECT s.code, s.libelle FROM stg_article s WHERE NOT EXISTS (SELECT 1 FROM article a WHERE a.code = s.code)",
      "INSERT INTO article SELECT DISTINCT * FROM stg_article",
      "UPDATE article SET …"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Relancé deux fois = doublons.",
      "Oui. On n'insère que les codes absents : le script est relançable.",
      "Non. DISTINCT ne regarde pas ce qui existe déjà dans article.",
      "Non."
    ],
    retenir: "Insertion relançable : INSERT … SELECT … WHERE NOT EXISTS."
  },
  {
    id: "m06-q62", dialecte: "SQL Server",
    q: "Comment afficher « Actif » ou « Inactif » selon qu'un client a commandé cette année ?",
    choixCode: true,
    choix: [
      "SELECT nom, EXISTS (SELECT 1 …) AS statut",
      "SELECT nom, CASE WHEN EXISTS (SELECT 1 FROM commande co WHERE co.client_id = c.id AND co.annee = 2026) THEN 'Actif' ELSE 'Inactif' END",
      "SELECT nom, IF EXISTS … THEN 'Actif'",
      "SELECT nom, COUNT(*) AS statut"
    ],
    bonne: 1,
    pourquoi: [
      "Non. SQL Server ne renvoie pas de booléen dans un SELECT.",
      "Oui. EXISTS s'utilise dans un CASE WHEN.",
      "Non. IF n'est pas une expression.",
      "Non."
    ],
    retenir: "EXISTS dans le SELECT : via CASE WHEN EXISTS (…)."
  },
  {
    id: "m06-q63", dialecte: "Standard",
    q: "Une commande a client_id = NULL. Passe-t-elle WHERE client_id IN (SELECT id FROM client) ?",
    choix: ["Oui", "Non", "Erreur", "Seulement si un client a un id NULL"],
    bonne: 1,
    pourquoi: [
      "Non. NULL = n'importe quoi est inconnu.",
      "Oui, elle ne passe pas. Une valeur NULL n'est jamais « dans » une liste.",
      "Non.",
      "Non. Même là, NULL = NULL n'est pas vrai."
    ],
    retenir: "NULL IN (…) n'est jamais vrai."
  },
  {
    id: "m06-q64", dialecte: "Standard",
    q: "a.ref vaut NULL. Que donne EXISTS (SELECT 1 FROM b WHERE b.ref = a.ref) ?",
    choix: ["Vrai si b contient des NULL", "Faux", "Erreur", "Vrai"],
    bonne: 1,
    pourquoi: [
      "Non. b.ref = NULL n'est jamais vrai.",
      "Oui. Aucune ligne ne vérifie b.ref = NULL : EXISTS est faux.",
      "Non.",
      "Non."
    ],
    retenir: "Clé NULL : aucune correspondance, même avec EXISTS."
  },
  {
    id: "m06-q65", dialecte: "SQL Server",
    q: "Dans le plan d'exécution d'une requête avec EXISTS, tu vois « Left Semi Join ». Qu'est-ce que c'est ?",
    choix: [
      "Une erreur",
      "Une jointure qui garde les lignes de gauche ayant au moins une correspondance, sans les dupliquer",
      "Un LEFT JOIN classique",
      "Un CROSS JOIN"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. L'optimiseur transforme IN / EXISTS en semi-jointure. NOT EXISTS devient une « Anti Semi Join ».",
      "Non. Un LEFT JOIN garde aussi les lignes sans correspondance.",
      "Non."
    ],
    retenir: "EXISTS / IN = semi-jointure. NOT EXISTS = anti-semi-jointure."
  },
  {
    id: "m06-q66", dialecte: "SQL Server",
    q: "Pourquoi NOT IN sur une colonne qui accepte NULL donne-t-il souvent un plan plus compliqué que NOT EXISTS ?",
    choix: [
      "C'est un bug",
      "Le moteur doit vérifier en plus s'il existe un NULL dans la liste, pour respecter la logique à 3 valeurs",
      "NOT IN n'utilise jamais d'index",
      "Aucune différence"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Résultat piégeux ET travail en plus. NOT EXISTS évite les deux.",
      "Non.",
      "Non."
    ],
    retenir: "Encore une raison de préférer NOT EXISTS."
  },
  {
    id: "m06-q67", dialecte: "Standard",
    q: "Une sous-requête est-elle toujours plus lente qu'une jointure ?",
    choix: [
      "Oui, toujours",
      "Non : l'optimiseur produit souvent le même plan. Choisis l'écriture la plus claire, puis vérifie le plan si besoin",
      "Non, elle est toujours plus rapide",
      "Oui, sur SQL Server"
    ],
    bonne: 1,
    pourquoi: [
      "Non. C'est un mythe.",
      "Oui. IN, EXISTS et JOIN sont souvent transformés en opérations équivalentes.",
      "Non.",
      "Non."
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
      "Non.",
      "Non."
    ],
    retenir: "Sous-requête corrélée = comparaison « à son propre groupe »."
  },
  {
    id: "m06-q69", dialecte: "Standard",
    q: "Comment réécrire « commandes au-dessus de la moyenne de leur client » sans sous-requête corrélée ?",
    choixCode: true,
    choix: [
      "SELECT * FROM (SELECT co.*, AVG(montant) OVER (PARTITION BY client_id) AS moy FROM commande co) t WHERE t.montant > t.moy",
      "SELECT * FROM commande WHERE montant > AVG(montant)",
      "SELECT * FROM commande GROUP BY client_id HAVING montant > AVG(montant)",
      "SELECT * FROM commande ORDER BY montant"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. La fenêtre calcule la moyenne du client sur chaque ligne ; on filtre ensuite. Une seule lecture de la table.",
      "Non. Agrégat dans WHERE.",
      "Non. montant n'est pas groupé.",
      "Non."
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
      "Non."
    ],
    retenir: "Ne duplique pas une sous-requête : CTE."
  },
  {
    id: "m06-q71", dialecte: "SQL Server",
    q: "Une vue peut-elle contenir une CTE (WITH) ?",
    choix: ["Oui", "Non", "Seulement si elle est récursive", "Seulement sur Snowflake"],
    bonne: 0,
    pourquoi: [
      "Oui. CREATE VIEW v AS WITH x AS (…) SELECT … FROM x;",
      "Non.",
      "Non.",
      "Non. Valide sur les deux."
    ],
    retenir: "WITH est permis dans une vue."
  },
  {
    id: "m06-q72", dialecte: "Standard",
    q: "Comment obtenir les 3 plus grosses commandes de chaque client ?",
    choixCode: true,
    choix: [
      "SELECT TOP (3) * FROM commande ORDER BY montant DESC",
      "WITH r AS (SELECT *, ROW_NUMBER() OVER (PARTITION BY client_id ORDER BY montant DESC) AS rn FROM commande) SELECT * FROM r WHERE rn <= 3",
      "SELECT * FROM commande GROUP BY client_id HAVING COUNT(*) <= 3",
      "SELECT DISTINCT TOP (3) client_id FROM commande"
    ],
    bonne: 1,
    pourquoi: [
      "Non. 3 commandes au total.",
      "Oui. Numérotation par client, puis filtre. Le classique « top N par groupe ».",
      "Non.",
      "Non."
    ],
    retenir: "Top N par groupe : CTE + ROW_NUMBER + rn <= N."
  },
  {
    id: "m06-q73", dialecte: "SQL Server",
    q: "Pourquoi faut-il une CTE ou une sous-requête pour filtrer sur ROW_NUMBER() sur SQL Server ?",
    choix: [
      "Parce que ROW_NUMBER est lent",
      "Les fonctions de fenêtrage sont calculées au SELECT, après WHERE : on ne peut pas les filtrer dans le même niveau",
      "Parce que c'est plus joli",
      "Ce n'est pas nécessaire"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. WHERE rn = 1 dans la même requête = erreur. On filtre au niveau du dessus.",
      "Non.",
      "Non sur SQL Server. (Snowflake a QUALIFY.)"
    ],
    retenir: "Filtrer une fenêtre : niveau du dessus (ou QUALIFY sur Snowflake)."
  },
  {
    id: "m06-q74", dialecte: "Snowflake",
    q: "Sur Snowflake, comment garder la dernière commande de chaque client sans CTE ?",
    choixCode: true,
    choix: [
      "SELECT * FROM commande WHERE ROW_NUMBER() OVER (…) = 1",
      "SELECT * FROM commande QUALIFY ROW_NUMBER() OVER (PARTITION BY client_id ORDER BY date_cde DESC) = 1",
      "SELECT * FROM commande HAVING ROW_NUMBER() = 1",
      "SELECT LAST(*) FROM commande"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Fenêtre interdite dans WHERE.",
      "Oui. QUALIFY filtre sur une fonction de fenêtrage, comme HAVING le fait pour les agrégats.",
      "Non.",
      "Non."
    ],
    retenir: "Snowflake : QUALIFY = WHERE pour les fenêtres."
  },
  {
    id: "m06-q75", dialecte: "Snowflake",
    q: "Sur Snowflake, cette requête fonctionne-t-elle sans table dérivée ?",
    code: "SELECT montant * 1.2 AS ttc,\n       ttc - montant AS tva\nFROM commande\nWHERE ttc > 100;",
    choix: ["Oui", "Non, il faut une sous-requête", "Seulement sans WHERE", "Erreur sur tva"],
    bonne: 0,
    pourquoi: [
      "Oui. Snowflake permet de réutiliser un alias dans le même SELECT et dans le WHERE.",
      "Non sur Snowflake. (Oui sur SQL Server.)",
      "Non.",
      "Non."
    ],
    retenir: "Snowflake évite beaucoup de tables dérivées grâce aux alias réutilisables."
  },
  {
    id: "m06-q76", dialecte: "SQL Server",
    q: "Que donne cette requête sur SQL Server ?",
    code: "SELECT c.nom, t.nb\nFROM client c\nJOIN (SELECT COUNT(*) AS nb FROM commande co\n      WHERE co.client_id = c.id) t ON 1 = 1;",
    choix: [
      "Le nombre de commandes par client",
      "Erreur : une table dérivée ne peut pas utiliser c.id (table extérieure). Il faut CROSS APPLY",
      "Le nombre total de commandes",
      "0 partout"
    ],
    bonne: 1,
    pourquoi: [
      "Non. La requête ne s'exécute pas.",
      "Oui. Une sous-requête dans FROM ne voit pas les autres tables du FROM. APPLY (ou LATERAL sur Snowflake) le permet.",
      "Non.",
      "Non."
    ],
    retenir: "Sous-requête de FROM liée à une autre table : APPLY / LATERAL."
  },
  {
    id: "m06-q77", dialecte: "Standard",
    q: "Que renvoie cette requête si un client a 2 commandes le même dernier jour ?",
    code: "SELECT co.*\nFROM commande co\nJOIN (SELECT client_id, MAX(date_cde) AS d\n      FROM commande GROUP BY client_id) m\n  ON m.client_id = co.client_id AND m.d = co.date_cde;",
    choix: ["1 ligne pour ce client", "Les 2 commandes de ce jour-là", "Une erreur", "Aucune ligne"],
    bonne: 1,
    pourquoi: [
      "Non. Les deux commandes ont la date maximale.",
      "Oui. Cette méthode garde les ex aequo. ROW_NUMBER, lui, en garderait une seule.",
      "Non.",
      "Non."
    ],
    retenir: "Jointure sur MAX = garde les ex aequo."
  },
  {
    id: "m06-q78", dialecte: "Standard",
    q: "Tu veux UNE seule ligne par client, même en cas d'égalité sur la date. Que choisir ?",
    choix: [
      "Jointure sur MAX(date)",
      "ROW_NUMBER() avec un critère de départage (ORDER BY date_cde DESC, id DESC), puis rn = 1",
      "RANK() = 1",
      "DISTINCT"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Garde les ex aequo.",
      "Oui. ROW_NUMBER numérote sans égalité ; le 2e critère rend le choix stable.",
      "Non. RANK donne 1 à tous les ex aequo.",
      "Non."
    ],
    retenir: "Une seule ligne garantie : ROW_NUMBER + critère de départage."
  },
  {
    id: "m06-q79", dialecte: "Standard",
    q: "Peut-on trier des clients par leur nombre de commandes avec une sous-requête dans ORDER BY ?",
    code: "SELECT nom FROM client c\nORDER BY (SELECT COUNT(*) FROM commande co WHERE co.client_id = c.id) DESC;",
    choix: ["Oui", "Non, ORDER BY n'accepte pas de sous-requête", "Seulement avec TOP", "Seulement sur Snowflake"],
    bonne: 0,
    pourquoi: [
      "Oui. C'est valide. Une jointure + GROUP BY est souvent plus lisible.",
      "Non.",
      "Non.",
      "Non."
    ],
    retenir: "Une sous-requête scalaire peut servir de critère de tri."
  },
  {
    id: "m06-q80", dialecte: "SQL Server",
    q: "Peut-on mettre une sous-requête dans le GROUP BY sur SQL Server ?",
    choix: ["Oui", "Non : erreur", "Seulement une sous-requête corrélée", "Seulement avec HAVING"],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Calcule d'abord la valeur dans une table dérivée ou une CTE, puis groupe dessus.",
      "Non.",
      "Non."
    ],
    retenir: "Pas de sous-requête dans GROUP BY : passe par une étape avant."
  },
  {
    id: "m06-q81", dialecte: "SQL Server",
    q: "Peut-on écrire un WITH à l'intérieur de la définition d'une CTE sur SQL Server ?",
    choix: ["Oui", "Non : on enchaîne les CTE avec des virgules", "Seulement en récursif", "Seulement dans une vue"],
    bonne: 1,
    pourquoi: [
      "Non. Les WITH imbriqués sont refusés.",
      "Oui. WITH a AS (…), b AS (… FROM a …) : même effet, à plat.",
      "Non.",
      "Non."
    ],
    retenir: "Pas de WITH dans un WITH : enchaîne les CTE."
  },
  {
    id: "m06-q82", dialecte: "Standard",
    q: "Dans une CTE récursive, à quoi sert la colonne niveau (1 dans l'ancre, niveau + 1 ensuite) ?",
    choix: [
      "À rien",
      "À savoir à quelle profondeur est chaque ligne, et à limiter la récursion (WHERE niveau < 10)",
      "À trier automatiquement",
      "À éviter les doublons"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Utile pour l'affichage (indentation) et comme garde-fou contre les boucles.",
      "Non.",
      "Non."
    ],
    retenir: "Compteur de niveau : profondeur + garde-fou."
  },
  {
    id: "m06-q83", dialecte: "Standard",
    q: "Après une CTE récursive d'organigramme, comment afficher chaque personne sous son chef, dans l'ordre de l'arbre ?",
    choix: [
      "ORDER BY niveau",
      "Construire un chemin de tri (ex. 'PDG/Dir1/Chef3') dans la récursion et faire ORDER BY chemin",
      "ORDER BY nom",
      "Rien, c'est automatique"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Tous les niveaux 2, puis tous les niveaux 3 : on perd qui est sous qui.",
      "Oui. Le chemin regroupe chaque branche.",
      "Non.",
      "Non. Pas d'ordre garanti."
    ],
    retenir: "Afficher un arbre : trier sur le chemin."
  },
  {
    id: "m06-q84", dialecte: "SQL Server",
    q: "Une table #temp créée dans une procédure stockée existe jusqu'à quand ?",
    choix: ["Pour toujours", "Jusqu'à la fin de la procédure (ou de la session si créée hors procédure)", "Jusqu'au prochain GO", "Une heure"],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Elle est supprimée automatiquement. Un DROP explicite reste une bonne pratique dans les scripts.",
      "Non. GO ne la supprime pas.",
      "Non."
    ],
    retenir: "#table : vit le temps de la procédure ou de la session."
  },
  {
    id: "m06-q85", dialecte: "SQL Server",
    q: "Pourquoi une variable table (DECLARE @t TABLE) peut-elle donner un mauvais plan avec 100 000 lignes ?",
    choix: [
      "Elle est limitée à 1 000 lignes",
      "Elle n'a pas de statistiques : l'optimiseur sous-estime souvent son nombre de lignes",
      "Elle est stockée sur disque",
      "Elle est en lecture seule"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Avant SQL Server 2019, l'estimation était souvent 1 ligne. Pour du volume : #table.",
      "Non. Les deux types peuvent utiliser tempdb.",
      "Non."
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
      "Non.",
      "Non."
    ],
    retenir: "WITH … SELECT … INTO #t FROM …"
  },
  {
    id: "m06-q87", dialecte: "SQL Server",
    q: "Dans une procédure, #commandes_mois (500 000 lignes) est jointe 4 fois ensuite sur client_id. Bonne idée ?",
    choix: [
      "Rien à faire",
      "Créer un index sur #commandes_mois (client_id) après le chargement",
      "La transformer en CTE",
      "Ajouter DISTINCT"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Une table temporaire peut être indexée comme une vraie table.",
      "Non. La CTE serait recalculée 4 fois.",
      "Non."
    ],
    retenir: "#table réutilisée souvent : indexe-la."
  },
  {
    id: "m06-q88", dialecte: "Standard",
    q: "Que change le DISTINCT dans WHERE id IN (SELECT DISTINCT client_id FROM commande) ?",
    choix: ["Il évite des doublons dans le résultat", "Rien d'utile : IN ne crée jamais de doublons", "Il accélère toujours", "Il est obligatoire"],
    bonne: 1,
    pourquoi: [
      "Non. IN n'en crée pas.",
      "Oui. L'optimiseur l'ignore souvent, mais il n'apporte rien.",
      "Non.",
      "Non."
    ],
    retenir: "DISTINCT dans un IN : inutile."
  },
  {
    id: "m06-q89", dialecte: "Standard",
    q: "Comment trouver les clients qui ont acheté l'article A mais JAMAIS l'article B ?",
    choixCode: true,
    choix: [
      "WHERE article = 'A' AND article <> 'B'",
      "WHERE EXISTS (… achat de A …) AND NOT EXISTS (… achat de B …)",
      "WHERE article IN ('A', 'B')",
      "WHERE article = 'A' OR article = 'B'"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Ça regarde une seule ligne à la fois, pas l'historique du client.",
      "Oui. Deux tests sur l'historique du client : un EXISTS, un NOT EXISTS.",
      "Non.",
      "Non."
    ],
    retenir: "« A mais jamais B » : EXISTS + NOT EXISTS."
  },
  {
    id: "m06-q90", dialecte: "Standard",
    q: "Comment trouver les clients qui ont acheté TOUS les articles de la famille 'POMPE' ?",
    choixCode: true,
    choix: [
      "WHERE famille = 'POMPE'",
      "GROUP BY client_id HAVING COUNT(DISTINCT article_id) = (SELECT COUNT(*) FROM article WHERE famille = 'POMPE'), avec un WHERE sur la famille",
      "WHERE article_id IN (SELECT id FROM article WHERE famille = 'POMPE')",
      "HAVING COUNT(*) > 1"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Au moins un, pas tous.",
      "Oui. Le client a autant d'articles POMPE distincts qu'il en existe. C'est la « division relationnelle ».",
      "Non. Au moins un.",
      "Non."
    ],
    retenir: "« Tous les… » : compter les distincts et comparer au total."
  },
  {
    id: "m06-q91", dialecte: "Standard",
    q: "WHERE taux = (SELECT taux FROM tva WHERE pays = 'FR') marche aujourd'hui. Quel risque demain ?",
    choix: [
      "Aucun",
      "Si on ajoute un 2e taux pour la France (taux réduit), la sous-requête renvoie 2 lignes : erreur",
      "Le taux devient NULL",
      "La requête devient lente"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Sois précis (WHERE pays = 'FR' AND type = 'NORMAL') ou utilise IN si plusieurs valeurs sont possibles.",
      "Non.",
      "Non."
    ],
    retenir: "Sous-requête avec = : garantis une seule ligne, sinon elle cassera un jour."
  },
  {
    id: "m06-q92", dialecte: "SQL Server",
    q: "Une absence va du 26 au 30 octobre (une ligne). Comment obtenir une ligne par jour ?",
    choix: [
      "Un GROUP BY",
      "Une CTE récursive qui ajoute 1 jour jusqu'à la date de fin, ou une jointure avec la table calendrier",
      "Un DISTINCT",
      "Un PIVOT"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. La jointure calendrier (jour BETWEEN debut AND fin) est souvent la plus simple et la plus rapide.",
      "Non.",
      "Non."
    ],
    retenir: "Période → jours : calendrier (ou CTE récursive)."
  },
  {
    id: "m06-q93", dialecte: "Standard",
    q: "Un cumul est calculé par sous-requête corrélée : (SELECT SUM(x.montant) FROM vente x WHERE x.date <= v.date). Quel est le problème sur un an de ventes ?",
    choix: [
      "Aucun",
      "Chaque ligne relit toutes les lignes précédentes : travail en n². SUM() OVER (ORDER BY date) est bien plus efficace",
      "Le résultat est faux",
      "Erreur de syntaxe"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. La fenêtre fait le cumul en une seule passe.",
      "Non. Le résultat est juste, c'est la vitesse qui pose problème.",
      "Non."
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
      "Non.",
      "Non. Trop lourd pour un traitement ponctuel."
    ],
    retenir: "Traitement en étapes : une CTE par étape."
  },
  {
    id: "m06-q95", dialecte: "Standard",
    q: "Le résultat final d'une chaîne de CTE est faux. Comment trouver l'étape fautive ?",
    choix: [
      "Tout réécrire",
      "Remplacer le SELECT final par SELECT * FROM etape2 (puis etape1…) pour voir chaque résultat intermédiaire",
      "Ajouter DISTINCT",
      "Ajouter ORDER BY"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. C'est le gros avantage des CTE : on inspecte chaque étape facilement.",
      "Non.",
      "Non."
    ],
    retenir: "Déboguer une chaîne de CTE : afficher les étapes une par une."
  },
  {
    id: "m06-q96", dialecte: "SQL Server",
    q: "Sur SQL Server, une table dérivée et la même logique en CTE (utilisée une fois) ont-elles des performances différentes ?",
    choix: ["La CTE est toujours plus rapide", "En général non : les deux sont intégrées de la même façon dans le plan", "La table dérivée est stockée", "La CTE est stockée"],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Choisis pour la lisibilité.",
      "Non.",
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
      "JOIN facture f ON f.cde_id = co.id WHERE statut = 'LIVREE'",
      "WHERE statut = 'LIVREE' AND facture IS NULL",
      "WHERE statut <> 'FACTUREE'"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Livrée, et aucune facture rattachée. Contrôle classique de fin de mois.",
      "Non. Ce sont celles qui ONT une facture.",
      "Non. Pas de colonne facture dans commande.",
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
      "WHERE f.montant_ht <> SUM(l.montant)",
      "GROUP BY f.montant_ht",
      "WHERE f.montant_ht IS NULL"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Contrôle de cohérence en-tête / lignes. Attention : une facture sans ligne donne NULL et n'apparaît pas → ajoute COALESCE.",
      "Non. Agrégat dans WHERE.",
      "Non.",
      "Non."
    ],
    retenir: "Contrôle en-tête / lignes : sous-requête corrélée avec SUM."
  },
  {
    id: "m06-q99", dialecte: "SQL Server",
    q: "Une CTE récursive sur une nomenclature de 2 millions de lignes est lente. Quelle piste en priorité ?",
    choix: [
      "Ajouter DISTINCT",
      "Un index sur la colonne parcourue à chaque tour (parent_id) : chaque niveau fait une recherche dans la table",
      "Mettre MAXRECURSION 0",
      "Utiliser UNION au lieu de UNION ALL"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Interdit dans la partie récursive, et inutile.",
      "Oui. Sans index, chaque niveau relit toute la table.",
      "Non. Ça n'accélère rien.",
      "Non. Interdit."
    ],
    retenir: "CTE récursive : indexe la colonne de lien parent."
  },
  {
    id: "m06-q100", dialecte: "Standard",
    q: "Quel outil choisir dans chaque cas ?",
    choix: [
      "Toujours une sous-requête",
      "EXISTS pour « existe-t-il », CTE pour découper en étapes lisibles, #table pour un gros résultat réutilisé, vue pour une logique partagée et permanente",
      "Toujours une table temporaire",
      "Toujours une vue"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Chaque outil a son usage. Le bon choix dépend du besoin : lisibilité, réutilisation, volume.",
      "Non.",
      "Non."
    ],
    retenir: "EXISTS, CTE, #table, vue : chacun son rôle."
  }
];
