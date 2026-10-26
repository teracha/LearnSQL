LEARNSQL.questions.m01 = [
  {
    id: "m01-q01", dialecte: "Standard",
    q: "Dans quel ordre le moteur traite-t-il cette requête ? Quelle clause passe en premier ?",
    code: "SELECT nom\nFROM client\nWHERE pays = 'FR'\nORDER BY nom;",
    choix: ["SELECT", "FROM", "WHERE", "ORDER BY"],
    bonne: 1,
    pourquoi: [
      "Non. On écrit SELECT en premier, mais le moteur le traite presque à la fin.",
      "Oui. Le moteur doit d'abord savoir quelle table lire.",
      "Non. WHERE vient juste après FROM : il faut d'abord des lignes à filtrer.",
      "Non. ORDER BY est la toute dernière étape."
    ],
    retenir: "Ordre logique : FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY."
  },
  {
    id: "m01-q02", dialecte: "SQL Server",
    q: "Sur SQL Server, que se passe-t-il ?",
    code: "SELECT prix * 1.2 AS prix_ttc\nFROM article\nWHERE prix_ttc > 100;",
    choix: [
      "La requête fonctionne",
      "Erreur : nom de colonne « prix_ttc » non valide",
      "La requête renvoie 0 ligne",
      "Le filtre est ignoré"
    ],
    bonne: 1,
    pourquoi: [
      "Non. WHERE est traité avant SELECT. L'alias n'existe pas encore.",
      "Oui. WHERE passe avant SELECT, donc l'alias prix_ttc est inconnu. Écris WHERE prix * 1.2 > 100.",
      "Non. La requête ne s'exécute même pas : c'est une erreur.",
      "Non. SQL Server n'ignore jamais un filtre en silence."
    ],
    retenir: "SQL Server : pas d'alias du SELECT dans WHERE. Snowflake, lui, l'accepte."
  },
  {
    id: "m01-q03", dialecte: "SQL Server",
    q: "Sur SQL Server, dans quelle clause peut-on utiliser un alias créé dans le SELECT ?",
    choix: ["WHERE", "GROUP BY", "HAVING", "ORDER BY"],
    bonne: 3,
    pourquoi: [
      "Non. WHERE est traité avant SELECT.",
      "Non. GROUP BY est traité avant SELECT.",
      "Non. HAVING est traité avant SELECT.",
      "Oui. ORDER BY est traité après SELECT. L'alias existe déjà."
    ],
    retenir: "Seul ORDER BY passe après SELECT : c'est la seule clause qui voit les alias (sur SQL Server)."
  },
  {
    id: "m01-q04", dialecte: "Standard",
    q: "La table contient 3 lignes : (Lyon, FR), (Lyon, FR), (Lyon, BE). Combien de lignes renvoie cette requête ?",
    code: "SELECT DISTINCT ville, pays\nFROM site;",
    choix: ["1", "2", "3", "Erreur : DISTINCT ne s'applique qu'à une colonne"],
    bonne: 1,
    pourquoi: [
      "Non. DISTINCT ne regarde pas seulement la ville.",
      "Oui. DISTINCT supprime les doublons sur la combinaison ville + pays. Il reste (Lyon, FR) et (Lyon, BE).",
      "Non. Les deux lignes (Lyon, FR) sont identiques : une est supprimée.",
      "Non. DISTINCT s'applique à toutes les colonnes du SELECT."
    ],
    retenir: "DISTINCT porte sur la ligne entière du SELECT, pas sur la première colonne."
  },
  {
    id: "m01-q05", dialecte: "SQL Server",
    q: "Tu veux les 10 plus grosses commandes sur SQL Server. Quelle syntaxe est correcte ?",
    choixCode: true,
    choix: [
      "SELECT * FROM commande ORDER BY montant DESC LIMIT 10;",
      "SELECT TOP (10) * FROM commande ORDER BY montant DESC;",
      "SELECT * FROM commande WHERE ROWNUM <= 10 ORDER BY montant DESC;",
      "SELECT FIRST 10 * FROM commande ORDER BY montant DESC;"
    ],
    bonne: 1,
    pourquoi: [
      "Non. LIMIT n'existe pas sur SQL Server. C'est la syntaxe de Snowflake, MySQL ou PostgreSQL.",
      "Oui. TOP est la syntaxe SQL Server. Les parenthèses sont recommandées.",
      "Non. ROWNUM vient d'Oracle.",
      "Non. FIRST seul n'existe pas sur SQL Server."
    ],
    retenir: "SQL Server : TOP (n). Snowflake : LIMIT n (TOP marche aussi). Standard : OFFSET … FETCH."
  },
  {
    id: "m01-q06", dialecte: "Standard",
    q: "Que renvoie SELECT TOP (5) * FROM commande; sans ORDER BY ?",
    choix: [
      "Les 5 premières lignes insérées",
      "Les 5 plus petites clés primaires",
      "5 lignes, sans garantie sur lesquelles",
      "Une erreur : ORDER BY est obligatoire"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Une table n'a pas d'ordre. L'ordre d'insertion n'est pas garanti.",
      "Non. C'est souvent le cas par hasard, mais rien ne le garantit.",
      "Oui. Sans ORDER BY, l'ordre dépend du plan d'exécution. Il peut changer d'un jour à l'autre.",
      "Non. La requête marche. Mais le résultat n'est pas fiable."
    ],
    retenir: "Sans ORDER BY, aucun ordre n'est garanti. Jamais."
  },
  {
    id: "m01-q07", dialecte: "Standard",
    q: "Quel est le sens de tri par défaut de ORDER BY ?",
    choix: ["Croissant (ASC)", "Décroissant (DESC)", "Ordre d'insertion", "Aucun, il faut toujours préciser"],
    bonne: 0,
    pourquoi: [
      "Oui. Sans précision, le tri est croissant.",
      "Non. Il faut écrire DESC pour trier du plus grand au plus petit.",
      "Non. L'ordre d'insertion n'existe pas en SQL.",
      "Non. ASC est la valeur par défaut."
    ],
    retenir: "ORDER BY col = ORDER BY col ASC."
  },
  {
    id: "m01-q08", dialecte: "Standard",
    q: "Pourquoi éviter SELECT * dans une requête de production (vue, procédure, rapport) ?",
    choix: [
      "C'est une erreur de syntaxe sur SQL Server",
      "Il ramène des colonnes inutiles, et le résultat change si la table change",
      "Il ne marche pas avec les jointures",
      "Il trie les données au hasard"
    ],
    bonne: 1,
    pourquoi: [
      "Non. SELECT * est valide partout.",
      "Oui. Plus de données lues et transférées. Et si on ajoute une colonne, ton rapport ou ton flux peut casser.",
      "Non. SELECT * marche avec les jointures (il ramène toutes les colonnes de toutes les tables).",
      "Non. Le tri n'a rien à voir avec SELECT *."
    ],
    retenir: "En production, liste les colonnes. SELECT * : seulement pour explorer."
  },
  {
    id: "m01-q09", dialecte: "Snowflake",
    q: "Sur Snowflake, tu crées une table avec des guillemets. Que donne la 2e requête ?",
    code: "CREATE TABLE \"client\" (id INT);\n\nSELECT * FROM client;",
    choix: [
      "Elle marche : Snowflake ignore la casse",
      "Erreur : la table CLIENT n'existe pas",
      "Elle renvoie 0 ligne sans erreur",
      "Elle marche mais affiche un avertissement"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Snowflake ignore la casse seulement pour les noms sans guillemets.",
      "Oui. Sans guillemets, Snowflake met le nom en MAJUSCULES : il cherche CLIENT. Or la table s'appelle \"client\" en minuscules.",
      "Non. La table n'est pas trouvée, c'est une erreur.",
      "Non. Pas d'avertissement : c'est une erreur."
    ],
    retenir: "Snowflake : évite les guillemets dans les noms. Sinon la casse devient obligatoire."
  },
  {
    id: "m01-q10", dialecte: "Standard",
    q: "Comment écrire le texte O'Neil dans une requête ?",
    choixCode: true,
    choix: ["'O'Neil'", "\"O'Neil\"", "'O''Neil'", "'O\\'Neil'"],
    bonne: 2,
    pourquoi: [
      "Non. L'apostrophe ferme le texte trop tôt : erreur de syntaxe.",
      "Non. Les guillemets doubles servent aux noms de colonnes ou de tables, pas au texte.",
      "Oui. On met 2 apostrophes à la suite pour l'échapper. Ça marche sur SQL Server et Snowflake.",
      "Non sur SQL Server : l'antislash n'échappe rien. (Snowflake l'accepte, mais ce n'est pas standard.)"
    ],
    retenir: "Texte entre apostrophes simples. Une apostrophe dans le texte : on la double → `'O''Neil'`."
  },
  {
    id: "m01-q11", dialecte: "SQL Server",
    q: "Tu as donné l'alias c à la table client. Que se passe-t-il sur SQL Server ?",
    code: "SELECT client.nom\nFROM client AS c;",
    choix: [
      "Ça marche : client et c désignent la même table",
      "Erreur : une fois l'alias posé, il faut écrire c.nom",
      "Ça renvoie 0 ligne",
      "Ça renvoie la colonne en double"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Dès qu'un alias est posé, le nom d'origine n'est plus reconnu dans la requête.",
      "Oui. SQL Server répond que l'identificateur « client.nom » ne peut pas être lié. Utilise l'alias partout.",
      "Non. La requête ne s'exécute pas : c'est une erreur.",
      "Non. La requête ne s'exécute pas."
    ],
    retenir: "Alias posé = alias obligatoire partout dans la requête."
  },
  {
    id: "m01-q12", dialecte: "Standard",
    q: "Comment écrire un commentaire sur une seule ligne en SQL ?",
    choixCode: true,
    choix: ["-- mon commentaire", "// mon commentaire", "# mon commentaire", "' mon commentaire"],
    bonne: 0,
    pourquoi: [
      "Oui. Deux tirets : tout ce qui suit sur la ligne est ignoré. Pour plusieurs lignes : /* … */.",
      "Non. // est un commentaire Snowflake, mais pas SQL Server, ni standard.",
      "Non. # est utilisé par MySQL, pas par SQL Server.",
      "Non. L'apostrophe ouvre un texte : erreur de syntaxe."
    ],
    retenir: "Commentaire : -- pour une ligne, /* … */ pour plusieurs lignes."
  },
  {
    id: "m01-q13", dialecte: "SQL Server",
    q: "Sur SQL Server, dans quel cas le point-virgule ; est-il obligatoire ?",
    choix: [
      "Après chaque SELECT",
      "Jamais",
      "À la fin de l'instruction qui précède un WITH (CTE)",
      "Seulement dans les procédures stockées"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Il est conseillé, mais pas obligatoire après un simple SELECT.",
      "Non. Il y a des cas obligatoires.",
      "Oui. Sinon SQL Server croit que WITH fait partie de l'instruction d'avant. MERGE doit aussi finir par ;.",
      "Non. Les règles sont les mêmes partout."
    ],
    retenir: "Prends l'habitude de finir chaque instruction par ; : tu évites les pièges du WITH et du MERGE."
  },
  {
    id: "m01-q14", dialecte: "Standard",
    q: "Que fait ORDER BY 2 dans cette requête ?",
    code: "SELECT nom, ville, ca\nFROM client\nORDER BY 2;",
    choix: [
      "Trie sur la colonne ville",
      "Trie sur la valeur 2 : aucun effet",
      "Renvoie seulement 2 lignes",
      "Erreur de syntaxe"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Le chiffre désigne la position dans le SELECT : 2 = ville. Ça marche, mais c'est risqué si on modifie le SELECT.",
      "Non. Un entier seul dans ORDER BY est lu comme une position de colonne.",
      "Non. Pour limiter le nombre de lignes, il faut TOP ou LIMIT.",
      "Non. C'est valide."
    ],
    retenir: "ORDER BY 2 = 2e colonne du SELECT. Écris plutôt le nom : plus lisible et plus sûr."
  },
  {
    id: "m01-q15", dialecte: "Standard",
    q: "Comment ces lignes sont-elles triées ?",
    code: "ORDER BY pays ASC, ca DESC",
    choix: [
      "Par ca décroissant seulement",
      "Par pays, puis, pour un même pays, par ca décroissant",
      "Par ca, puis par pays",
      "Erreur : un seul sens de tri par requête"
    ],
    bonne: 1,
    pourquoi: [
      "Non. La première colonne du ORDER BY est prioritaire.",
      "Oui. Le 2e critère sert seulement à départager les lignes du même pays.",
      "Non. L'ordre des colonnes dans ORDER BY compte.",
      "Non. Chaque colonne a son propre sens de tri."
    ],
    retenir: "ORDER BY a, b : tri sur a d'abord. b sert seulement en cas d'égalité sur a."
  },
  {
    id: "m01-q16", dialecte: "SQL Server + Snowflake",
    q: "Tu fais ORDER BY date_livraison ASC. Où sont placées les lignes où date_livraison est NULL ?",
    choix: [
      "En premier sur SQL Server, en dernier sur Snowflake",
      "En dernier partout",
      "En premier partout",
      "Elles sont exclues du résultat"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. SQL Server considère NULL comme la plus petite valeur. Snowflake, comme la plus grande. Sur Snowflake, tu peux forcer avec NULLS FIRST / NULLS LAST.",
      "Non. C'est vrai sur Snowflake seulement.",
      "Non. C'est vrai sur SQL Server seulement.",
      "Non. ORDER BY ne supprime jamais de lignes."
    ],
    retenir: "Tri en ASC : les NULL sont en tête sur SQL Server, en fin sur Snowflake."
  },
  {
    id: "m01-q17", dialecte: "SQL Server",
    q: "Quelles lignes renvoie cette requête ?",
    code: "SELECT *\nFROM commande\nORDER BY id\nOFFSET 20 ROWS FETCH NEXT 10 ROWS ONLY;",
    choix: ["Les lignes 1 à 10", "Les lignes 20 à 30", "Les lignes 21 à 30", "Les lignes 11 à 20"],
    bonne: 2,
    pourquoi: [
      "Non. OFFSET 20 saute d'abord 20 lignes.",
      "Non. La ligne 20 est sautée. On commence à la 21e.",
      "Oui. On saute 20 lignes, puis on en prend 10. C'est la pagination. ORDER BY est obligatoire.",
      "Non. On saute 20 lignes, pas 10."
    ],
    retenir: "OFFSET n ROWS FETCH NEXT m ROWS ONLY : pagination, toujours avec ORDER BY."
  },
  {
    id: "m01-q18", dialecte: "SQL Server",
    q: "Trois commerciaux ont le même CA, à la 3e place. Combien de lignes renvoie cette requête ?",
    code: "SELECT TOP (3) WITH TIES nom, ca\nFROM commercial\nORDER BY ca DESC;",
    choix: ["Exactement 3", "5", "2", "Erreur"],
    bonne: 1,
    pourquoi: [
      "Non. WITH TIES ajoute les ex aequo de la dernière place.",
      "Oui. 2 premiers + les 3 ex aequo à la 3e place = 5 lignes.",
      "Non. TOP (3) en donne au moins 3.",
      "Non. C'est valide, car il y a un ORDER BY."
    ],
    retenir: "TOP … WITH TIES garde les ex aequo de la dernière place. ORDER BY obligatoire."
  },
  {
    id: "m01-q19", dialecte: "SQL Server",
    q: "Tu crées une vue. Que se passe-t-il ?",
    code: "CREATE VIEW v_ligne AS\nSELECT id, prix * qte\nFROM ligne_cde;",
    choix: [
      "La vue est créée, la colonne s'appelle « prix * qte »",
      "La vue est créée, la colonne n'a pas de nom",
      "Erreur : chaque colonne d'une vue doit avoir un nom",
      "La colonne calculée est ignorée"
    ],
    bonne: 2,
    pourquoi: [
      "Non. SQL Server ne nomme pas automatiquement une expression.",
      "Non. Dans un simple SELECT, oui (« No column name »). Mais pas dans une vue.",
      "Oui. Il faut un alias : prix * qte AS montant.",
      "Non. Rien n'est ignoré en silence."
    ],
    retenir: "Donne toujours un alias à une colonne calculée. Dans une vue, c'est obligatoire."
  },
  {
    id: "m01-q20", dialecte: "SQL Server + Snowflake",
    q: "La requête SELECT 1 + 1; (sans FROM) est-elle valide ?",
    choix: [
      "Oui, sur SQL Server et sur Snowflake",
      "Non, FROM est toujours obligatoire",
      "Seulement avec FROM DUAL",
      "Seulement sur SQL Server"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Elle renvoie 2. Pratique pour tester une fonction : SELECT GETDATE(); ou SELECT CURRENT_DATE;",
      "Non. Ces deux moteurs acceptent un SELECT sans FROM.",
      "Non. DUAL, c'est Oracle. (Snowflake l'accepte aussi, mais il n'est pas nécessaire.)",
      "Non. Snowflake l'accepte aussi."
    ],
    retenir: "SELECT sans FROM : idéal pour tester une expression ou une fonction."
  },
  {
    id: "m01-q21", dialecte: "SQL Server",
    q: "Dans le nom Ventes.dbo.Commande, que représente dbo ?",
    choix: ["La base de données", "Le schéma", "Le serveur", "Le propriétaire de la ligne"],
    bonne: 1,
    pourquoi: [
      "Non. La base, c'est Ventes (la 1re partie).",
      "Oui. Le nom complet est base.schéma.table. dbo est le schéma par défaut. Snowflake utilise le même principe.",
      "Non. Le serveur apparaîtrait en 4e partie, devant (serveur lié).",
      "Non. Le schéma regroupe des objets, pas des lignes."
    ],
    retenir: "Nom complet : base.schéma.table. Préfixe toujours le schéma (dbo.Commande)."
  },
  {
    id: "m01-q22", dialecte: "SQL Server",
    q: "Quelle syntaxe est correcte sur SQL Server ?",
    choixCode: true,
    choix: [
      "SELECT TOP (5) DISTINCT ville FROM client;",
      "SELECT DISTINCT TOP (5) ville FROM client;",
      "SELECT DISTINCT ville TOP (5) FROM client;",
      "SELECT ville DISTINCT TOP (5) FROM client;"
    ],
    bonne: 1,
    pourquoi: [
      "Non. DISTINCT doit venir avant TOP.",
      "Oui. Ordre imposé : SELECT DISTINCT TOP (n) colonnes.",
      "Non. TOP se place juste après SELECT / DISTINCT, avant les colonnes.",
      "Non. DISTINCT se place juste après SELECT."
    ],
    retenir: "SELECT DISTINCT TOP (n) … : DISTINCT d'abord, puis TOP."
  },
  {
    id: "m01-q23", dialecte: "SQL Server",
    q: "Une colonne s'appelle Code Client (avec un espace). Comment l'écrire sur SQL Server ?",
    choixCode: true,
    choix: ["[Code Client]", "'Code Client'", "`Code Client`", "Code_Client"],
    bonne: 0,
    pourquoi: [
      "Oui. Les crochets entourent un nom spécial (espace, mot réservé). Les guillemets doubles marchent aussi.",
      "Non. Les apostrophes créent un texte : tu obtiens le texte « Code Client » sur chaque ligne.",
      "Non. Les accents graves, c'est MySQL.",
      "Non. C'est un autre nom de colonne."
    ],
    retenir: "SQL Server : [nom spécial]. Mieux : évite les espaces dans les noms."
  },
  {
    id: "m01-q24", dialecte: "Standard",
    q: "Que renvoie cette requête sur une table de 50 clients ?",
    code: "SELECT 'FR' AS pays, nom\nFROM client;",
    choix: [
      "1 ligne avec 'FR'",
      "50 lignes, avec 'FR' dans la colonne pays de chacune",
      "Les clients dont le pays est FR",
      "Erreur : la colonne pays n'existe pas"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Il y a une ligne par client.",
      "Oui. Une valeur fixe est répétée sur chaque ligne. Pratique pour marquer la source d'une donnée.",
      "Non. Ce n'est pas un filtre. Le filtre se met dans WHERE.",
      "Non. On crée la colonne avec un alias. Pas besoin qu'elle existe."
    ],
    retenir: "Une constante dans le SELECT est répétée sur chaque ligne."
  },
  {
    id: "m01-q25", dialecte: "Standard",
    q: "Quel est l'ordre d'écriture correct des clauses ?",
    choixCode: true,
    choix: [
      "SELECT, FROM, WHERE, GROUP BY, HAVING, ORDER BY",
      "SELECT, FROM, GROUP BY, WHERE, HAVING, ORDER BY",
      "FROM, SELECT, WHERE, ORDER BY, GROUP BY",
      "SELECT, WHERE, FROM, HAVING, GROUP BY, ORDER BY"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. C'est l'ordre d'écriture, différent de l'ordre d'exécution.",
      "Non. WHERE s'écrit avant GROUP BY.",
      "Non. On commence toujours par SELECT (ou WITH).",
      "Non. FROM vient juste après SELECT."
    ],
    retenir: "On écrit : SELECT FROM WHERE GROUP BY HAVING ORDER BY. Le moteur exécute : FROM WHERE GROUP BY HAVING SELECT ORDER BY."
  },
  {
    id: "m01-q26", dialecte: "SQL Server",
    q: "Que se passe-t-il sur SQL Server ?",
    code: "SELECT DISTINCT ville\nFROM client\nORDER BY nom;",
    choix: [
      "Les villes sont triées par nom de client",
      "Erreur : avec DISTINCT, la colonne du ORDER BY doit être dans le SELECT",
      "Le ORDER BY est ignoré",
      "Les villes sont en double"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Une ville peut avoir plusieurs clients : quel nom prendre pour trier ? Le moteur ne peut pas choisir.",
      "Oui. Sans DISTINCT, trier sur une colonne absente du SELECT est permis. Avec DISTINCT, non.",
      "Non. SQL Server n'ignore pas un tri.",
      "Non. La requête ne s'exécute pas."
    ],
    retenir: "SELECT DISTINCT + ORDER BY : on trie seulement sur des colonnes du SELECT."
  },
  {
    id: "m01-q27", dialecte: "Snowflake",
    q: "Sur Snowflake, tu veux toutes les colonnes sauf commentaire. Que peux-tu écrire ?",
    choixCode: true,
    choix: [
      "SELECT * - commentaire FROM commande;",
      "SELECT * EXCLUDE (commentaire) FROM commande;",
      "SELECT * WITHOUT commentaire FROM commande;",
      "C'est impossible, il faut lister les colonnes"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Le - ferait une soustraction : erreur.",
      "Oui. Snowflake permet SELECT * EXCLUDE (…). SQL Server ne le permet pas.",
      "Non. Ce mot-clé n'existe pas.",
      "Non sur Snowflake. Sur SQL Server, oui : il faut lister les colonnes."
    ],
    retenir: "Snowflake : SELECT * EXCLUDE (col). Pratique pour explorer. Inexistant sur SQL Server."
  },
  {
    id: "m01-q28", dialecte: "Standard",
    q: "select nom from client; et SELECT nom FROM client; donnent-ils le même résultat ?",
    choix: [
      "Oui, les mots-clés SQL ne tiennent pas compte de la casse",
      "Non, les mots-clés doivent être en majuscules",
      "Seulement sur SQL Server",
      "Seulement sur Snowflake"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Majuscules ou minuscules : même chose pour les mots-clés. Les majuscules aident juste à la lecture.",
      "Non. Ce n'est qu'une convention de lisibilité.",
      "Non. C'est vrai partout.",
      "Non. C'est vrai partout."
    ],
    retenir: "Mots-clés : casse libre. Convention courante : mots-clés en MAJUSCULES."
  },
  {
    id: "m01-q29", dialecte: "SQL Server",
    q: "code_postal est un VARCHAR. Un client corse a le code '2A004'. Que risque cette requête ?",
    code: "SELECT *\nFROM client\nWHERE code_postal = 69110;",
    choix: [
      "Rien, SQL Server convertit 69110 en texte",
      "Une erreur de conversion, à cause de '2A004'",
      "Elle renvoie 0 ligne",
      "Elle ignore les codes avec des lettres"
    ],
    bonne: 1,
    pourquoi: [
      "Non. C'est l'inverse : l'entier est prioritaire. SQL Server convertit la colonne en entier.",
      "Oui. Conversion de '2A004' en entier impossible : la requête plante. En plus, l'index ne sert plus. Écris '69110' entre apostrophes.",
      "Non. Elle plante dès qu'elle rencontre '2A004'.",
      "Non. SQL Server n'ignore pas en silence."
    ],
    retenir: "Compare une colonne avec une valeur du même type : '69110' pour un VARCHAR."
  },
  {
    id: "m01-q30", dialecte: "SQL Server",
    q: "Dans cette requête, quand TOP est-il appliqué ?",
    code: "SELECT TOP (3) nom, ca\nFROM client\nORDER BY ca DESC;",
    choix: [
      "Avant le tri : 3 clients au hasard, ensuite triés",
      "Après le tri : les 3 plus gros CA",
      "Avant le FROM",
      "Ça dépend du serveur"
    ],
    bonne: 1,
    pourquoi: [
      "Non. TOP est appliqué tout à la fin.",
      "Oui. Le moteur trie d'abord, puis garde les 3 premières lignes.",
      "Non. FROM est toujours traité en premier.",
      "Non. La règle est fixe."
    ],
    retenir: "TOP / LIMIT s'appliquent en dernier, après ORDER BY."
  }
];
