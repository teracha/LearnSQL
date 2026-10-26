LEARNSQL.questions.m01 = [
  {
    id: "m01-q01", dialecte: "Standard",
    q: "Dans quel ordre le moteur traite-t-il cette requête ? Quelle clause passe en premier ?",
    code: "SELECT nom\nFROM client\nWHERE pays = 'FR'\nORDER BY nom;",
    choix: [
      "SELECT",
      "FROM",
      "WHERE",
      "ORDER BY"
    ],
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
    choix: [
      "WHERE",
      "GROUP BY",
      "HAVING",
      "ORDER BY"
    ],
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
    choix: [
      "1",
      "2",
      "3",
      "Erreur : DISTINCT ne s'applique qu'à une colonne"
    ],
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
    choix: [
      "Croissant (ASC)",
      "Décroissant (DESC)",
      "Ordre d'insertion",
      "Aucun, il faut toujours préciser"
    ],
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
    choix: [
      "'O'Neil'",
      "\"O'Neil\"",
      "'O''Neil'",
      "'O\\'Neil'"
    ],
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
    choix: [
      "-- mon commentaire",
      "// mon commentaire",
      "# mon commentaire",
      "' mon commentaire"
    ],
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
    choix: [
      "Les lignes 1 à 10",
      "Les lignes 20 à 30",
      "Les lignes 21 à 30",
      "Les lignes 11 à 20"
    ],
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
    choix: [
      "Exactement 3",
      "5",
      "2",
      "Erreur"
    ],
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
    choix: [
      "La base de données",
      "Le schéma",
      "Le serveur",
      "Le propriétaire de la ligne"
    ],
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
    choix: [
      "[Code Client]",
      "'Code Client'",
      "`Code Client`",
      "Code_Client"
    ],
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
  },
  {
    id: "m01-q31", dialecte: "Standard",
    q: "Dans l'ordre logique, à quel moment DISTINCT est-il appliqué ?",
    choix: [
      "Avant WHERE",
      "Juste après FROM",
      "Après SELECT, avant ORDER BY",
      "Après ORDER BY"
    ],
    bonne: 2,
    pourquoi: [
      "Non. On ne peut pas dédoublonner des colonnes qui ne sont pas encore choisies.",
      "Non. À ce moment, les colonnes ne sont pas encore choisies.",
      "Oui. Le moteur choisit les colonnes, retire les doublons, puis trie.",
      "Non. Le tri vient après. C'est pour ça qu'ORDER BY ne peut utiliser que des colonnes du SELECT avec DISTINCT."
    ],
    retenir: "… → SELECT → DISTINCT → ORDER BY → TOP."
  },
  {
    id: "m01-q32", dialecte: "Standard",
    q: "Cette requête est-elle valide ?",
    code: "SELECT nom\nFROM client\nORDER BY ville;",
    choix: [
      "Oui",
      "Non : ville doit être dans le SELECT",
      "Seulement sur Snowflake",
      "Seulement avec DISTINCT"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Sans DISTINCT, on peut trier sur une colonne qu'on n'affiche pas.",
      "Non. Cette règle s'applique seulement avec DISTINCT (ou GROUP BY).",
      "Non. C'est valide partout.",
      "Non. C'est justement avec DISTINCT que ce serait interdit."
    ],
    retenir: "Sans DISTINCT, ORDER BY peut utiliser une colonne non affichée."
  },
  {
    id: "m01-q33", dialecte: "SQL Server",
    q: "Que fait ORDER BY LEN(nom) DESC ?",
    choix: [
      "Erreur : ORDER BY n'accepte que des colonnes",
      "Trie du nom le plus long au plus court",
      "Trie par ordre alphabétique inverse",
      "Affiche la longueur du nom"
    ],
    bonne: 1,
    pourquoi: [
      "Non. ORDER BY accepte des expressions et des fonctions.",
      "Oui. On trie sur le résultat de la fonction LEN.",
      "Non. On trie sur la longueur, pas sur les lettres.",
      "Non. ORDER BY ne crée pas de colonne dans le résultat."
    ],
    retenir: "ORDER BY accepte une expression, pas seulement une colonne."
  },
  {
    id: "m01-q34", dialecte: "Standard",
    q: "Tu veux afficher d'abord les commandes 'URGENT', puis les autres, triées par date. Quelle écriture ?",
    choixCode: true,
    choix: [
      "ORDER BY statut = 'URGENT', date_cde",
      "ORDER BY CASE WHEN statut = 'URGENT' THEN 0 ELSE 1 END, date_cde",
      "ORDER BY 'URGENT', date_cde",
      "ORDER BY statut DESC, date_cde"
    ],
    bonne: 1,
    pourquoi: [
      "Non. SQL Server refuse (erreur). Snowflake l'accepte, mais trie FALSE avant TRUE : les urgentes seraient à la fin.",
      "Oui. Le CASE donne 0 aux urgentes, 1 aux autres. On trie sur ce chiffre, puis sur la date.",
      "Non. Une constante ne trie rien : toutes les lignes ont la même valeur.",
      "Non. Ça trie par ordre alphabétique inverse des statuts. 'URGENT' ne sera pas forcément en premier."
    ],
    retenir: "Ordre personnalisé : ORDER BY CASE WHEN … THEN 0 ELSE 1 END."
  },
  {
    id: "m01-q35", dialecte: "SQL Server",
    q: "Sur SQL Server, que donne cette requête ?",
    code: "SELECT client_id, SUM(montant) AS total\nFROM commande\nGROUP BY client_id\nORDER BY total * 2 DESC;",
    choix: [
      "Elle marche : l'alias est permis dans ORDER BY",
      "Erreur : l'alias n'est accepté dans ORDER BY que seul, pas dans un calcul",
      "Elle trie par client_id",
      "Elle double les montants"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Piège : l'alias marche seul (ORDER BY total), mais pas dans une expression.",
      "Oui. SQL Server répond : nom de colonne « total » non valide. Écris ORDER BY SUM(montant) * 2.",
      "Non. La requête ne s'exécute pas.",
      "Non. ORDER BY ne modifie jamais les valeurs affichées."
    ],
    retenir: "SQL Server : alias seul dans ORDER BY = OK. Alias dans un calcul = erreur."
  },
  {
    id: "m01-q36", dialecte: "SQL Server",
    q: "Sur SQL Server, comment nommer une colonne « Chiffre d'affaires » (avec espace et apostrophe) ?",
    choixCode: true,
    choix: [
      "AS Chiffre d'affaires",
      "AS [Chiffre d'affaires]",
      "AS Chiffre_d'affaires",
      "AS 'Chiffre d'affaires'"
    ],
    bonne: 1,
    pourquoi: [
      "Non. L'espace coupe l'alias, et l'apostrophe ouvre un texte : erreur.",
      "Oui. Les crochets acceptent espaces et apostrophes. (Snowflake : \"Chiffre d'affaires\".)",
      "Non. L'apostrophe ouvre un texte qui ne se ferme pas : erreur.",
      "Non. L'apostrophe au milieu ferme le texte trop tôt : erreur."
    ],
    retenir: "Alias spécial : [ … ] sur SQL Server, \" … \" sur Snowflake. Mieux : ca_ht, sans espace."
  },
  {
    id: "m01-q37", dialecte: "Standard",
    q: "Il manque une virgule. Que renvoie cette requête ?",
    code: "SELECT nom ville\nFROM client;",
    choix: [
      "Une erreur de syntaxe",
      "Deux colonnes : nom et ville",
      "Une seule colonne, appelée « ville », qui contient les noms",
      "Une seule colonne : ville"
    ],
    bonne: 2,
    pourquoi: [
      "Non. C'est valide, et c'est bien là le piège.",
      "Non. Sans virgule, il n'y a qu'une colonne.",
      "Oui. Sans virgule, « ville » devient l'alias de nom (le AS est facultatif). Aucune erreur pour te prévenir.",
      "Non. La colonne s'appelle ville, mais elle contient les noms."
    ],
    retenir: "Une virgule oubliée transforme une colonne en alias. Écris toujours AS pour les alias."
  },
  {
    id: "m01-q38", dialecte: "SQL Server",
    q: "Sur SQL Server, que donne SELECT nom, ville, FROM client; (virgule en trop) ?",
    choix: [
      "Elle marche, la virgule est ignorée",
      "Erreur de syntaxe près de FROM",
      "Elle ajoute une colonne vide",
      "Elle renvoie 0 ligne"
    ],
    bonne: 1,
    pourquoi: [
      "Non. SQL Server n'accepte pas de virgule avant FROM.",
      "Oui. Après une virgule, SQL Server attend une colonne. Il trouve FROM : erreur.",
      "Non. Pas de colonne vide créée.",
      "Non. La requête ne s'exécute pas."
    ],
    retenir: "Pas de virgule après la dernière colonne. Astuce : mets les virgules en début de ligne."
  },
  {
    id: "m01-q39", dialecte: "Standard",
    q: "Une ligne a prix = 12 et qte = NULL. Que vaut prix * qte AS montant ?",
    choix: [
      "0",
      "12",
      "NULL",
      "Une erreur"
    ],
    bonne: 2,
    pourquoi: [
      "Non. NULL n'est pas 0.",
      "Non. Le NULL n'est pas ignoré dans un calcul.",
      "Oui. Tout calcul avec NULL donne NULL. Écris prix * COALESCE(qte, 0) si besoin.",
      "Non. C'est valide."
    ],
    retenir: "Calcul + NULL = NULL."
  },
  {
    id: "m01-q40", dialecte: "Standard",
    q: "Que renvoie SELECT 10 + 5 * 2; ?",
    choix: [
      "30",
      "20",
      "25",
      "Une erreur"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Ce serait (10 + 5) * 2.",
      "Oui. La multiplication passe avant l'addition : 10 + 10 = 20.",
      "Non.",
      "Non. C'est valide."
    ],
    retenir: "Priorités des maths : * et / avant + et -. Mets des parenthèses."
  },
  {
    id: "m01-q41", dialecte: "SQL Server + Snowflake",
    q: "Que renvoie SELECT 10 % 3; ?",
    choix: [
      "3",
      "1",
      "0.3",
      "30 %"
    ],
    bonne: 1,
    pourquoi: [
      "Non. 3 est le résultat de la division entière.",
      "Oui. % donne le reste de la division (modulo) : 10 = 3 × 3 + 1. Snowflake a aussi MOD(10, 3).",
      "Non. Ce n'est pas un pourcentage.",
      "Non. % n'a rien à voir avec un pourcentage ici."
    ],
    retenir: "% = reste de la division. Utile pour : un sur deux, paquets de n…"
  },
  {
    id: "m01-q42", dialecte: "Snowflake",
    q: "Sur Snowflake, quelle expression colle 'CDE-' et num_cde (texte) ?",
    choixCode: true,
    choix: [
      "'CDE-' + num_cde",
      "'CDE-' || num_cde",
      "'CDE-' & num_cde",
      "'CDE-' . num_cde"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Sur Snowflake, + est un calcul : il essaie de convertir le texte en nombre. Erreur.",
      "Oui. || est l'opérateur standard de concaténation. CONCAT marche aussi.",
      "Non. & est un opérateur Excel.",
      "Non. Le point n'est pas un opérateur de concaténation en SQL."
    ],
    retenir: "Concaténer : + sur SQL Server, || sur Snowflake. CONCAT() partout."
  },
  {
    id: "m01-q43", dialecte: "SQL Server + Snowflake",
    q: "Tu veux créer une nouvelle table à partir d'une requête. Quelle syntaxe pour chaque moteur ?",
    choix: [
      "SELECT … INTO nouvelle_table sur les deux",
      "SELECT … INTO sur SQL Server, CREATE TABLE … AS SELECT sur Snowflake",
      "CREATE TABLE … AS SELECT sur les deux",
      "INSERT INTO nouvelle_table sur les deux"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Snowflake ne crée pas de table avec SELECT INTO.",
      "Oui. SQL Server : SELECT … INTO t FROM … Snowflake : CREATE TABLE t AS SELECT … (CTAS).",
      "Non. SQL Server ne connaît pas CREATE TABLE AS SELECT.",
      "Non. INSERT INTO suppose que la table existe déjà."
    ],
    retenir: "Créer une table depuis une requête : SELECT INTO (SQL Server), CTAS (Snowflake)."
  },
  {
    id: "m01-q44", dialecte: "SQL Server",
    q: "La table client_2026 existe déjà. Que fait SELECT * INTO client_2026 FROM client; ?",
    choix: [
      "Elle ajoute les lignes à la table",
      "Elle remplace la table",
      "Erreur : un objet nommé client_2026 existe déjà",
      "Elle ne fait rien"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Pour ajouter, il faut INSERT INTO … SELECT.",
      "Non. SQL Server ne remplace jamais une table en silence.",
      "Oui. SELECT INTO crée toujours une NOUVELLE table.",
      "Non. Il y a une erreur."
    ],
    retenir: "SELECT INTO = créer. INSERT INTO … SELECT = ajouter."
  },
  {
    id: "m01-q45", dialecte: "SQL Server",
    q: "@n contient 10. Quelle syntaxe est correcte ?",
    choixCode: true,
    choix: [
      "SELECT TOP @n * FROM commande",
      "SELECT TOP (@n) * FROM commande",
      "SELECT * FROM commande TOP @n",
      "SELECT TOP = @n * FROM commande"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Avec une variable, les parenthèses sont obligatoires.",
      "Oui. TOP (@n). Prends l'habitude de toujours mettre les parenthèses.",
      "Non. TOP se place juste après SELECT.",
      "Non. Ce n'est pas une syntaxe valide."
    ],
    retenir: "TOP (expression) : parenthèses obligatoires avec une variable."
  },
  {
    id: "m01-q46", dialecte: "SQL Server",
    q: "La table a 15 lignes. Combien en renvoie SELECT TOP (10) PERCENT * FROM t ORDER BY id; ?",
    choix: [
      "1",
      "2",
      "10",
      "15"
    ],
    bonne: 1,
    pourquoi: [
      "Non. SQL Server arrondit au-dessus.",
      "Oui. 10 % de 15 = 1,5, arrondi au-dessus : 2 lignes.",
      "Non. PERCENT veut dire pourcentage, pas nombre de lignes.",
      "Non. On prend seulement 10 %."
    ],
    retenir: "TOP (n) PERCENT : pourcentage des lignes, arrondi au-dessus."
  },
  {
    id: "m01-q47", dialecte: "SQL Server",
    q: "Que renvoie cette requête sur une table de 25 lignes ?",
    code: "SELECT *\nFROM commande\nORDER BY id\nOFFSET 10 ROWS;",
    choix: [
      "Erreur : FETCH est obligatoire",
      "Les lignes 1 à 10",
      "Les lignes 11 à 25",
      "Aucune ligne"
    ],
    bonne: 2,
    pourquoi: [
      "Non. FETCH est facultatif.",
      "Non. Ce sont les lignes sautées.",
      "Oui. On saute 10 lignes et on prend tout le reste.",
      "Non. Il reste 15 lignes."
    ],
    retenir: "OFFSET seul = sauter n lignes. FETCH limite ensuite le nombre."
  },
  {
    id: "m01-q48", dialecte: "Snowflake",
    q: "Sur Snowflake, comment afficher la 3e page de 10 lignes (lignes 21 à 30) ?",
    choixCode: true,
    choix: [
      "ORDER BY id LIMIT 10 OFFSET 20",
      "ORDER BY id LIMIT 20, 10",
      "ORDER BY id LIMIT 30",
      "ORDER BY id OFFSET 30"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. LIMIT = combien de lignes, OFFSET = combien en sauter.",
      "Non. C'est la syntaxe de MySQL.",
      "Non. Ça renvoie les 30 premières lignes.",
      "Non. Ça saute 30 lignes et renvoie tout le reste."
    ],
    retenir: "Snowflake : LIMIT n OFFSET m. SQL Server : OFFSET m ROWS FETCH NEXT n ROWS ONLY."
  },
  {
    id: "m01-q49", dialecte: "Standard",
    q: "La pagination avec OFFSET 500000 est lente. Quelle technique est plus rapide sur de grosses tables ?",
    choixCode: true,
    choix: [
      "Augmenter OFFSET par pas de 1 000",
      "WHERE id > @dernier_id_vu ORDER BY id + TOP / LIMIT",
      "Ajouter DISTINCT",
      "Retirer ORDER BY"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Le moteur doit quand même lire et sauter toutes les lignes avant.",
      "Oui. Pagination « par clé » : on repart du dernier id vu. Avec un index sur id, on va directement au bon endroit.",
      "Non. DISTINCT ajoute du travail.",
      "Non. Sans ORDER BY, les pages ne sont plus fiables."
    ],
    retenir: "Gros volumes : pagination par clé (WHERE id > dernier) plutôt qu'OFFSET."
  },
  {
    id: "m01-q50", dialecte: "Standard",
    q: "La colonne region contient 'Sud', NULL, NULL, 'Sud'. Combien de lignes renvoie SELECT DISTINCT region ?",
    choix: [
      "1",
      "2",
      "3",
      "4"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Le NULL forme sa propre ligne.",
      "Oui. 'Sud' et NULL. Pour DISTINCT, les NULL sont considérés comme identiques.",
      "Non. Les deux NULL ne font qu'une ligne.",
      "Non. Il y a des doublons supprimés."
    ],
    retenir: "DISTINCT garde un seul NULL."
  },
  {
    id: "m01-q51", dialecte: "Standard",
    q: "id est la clé primaire de client. Que change le DISTINCT dans SELECT DISTINCT id, nom FROM client ?",
    choix: [
      "Il supprime les clients en double",
      "Rien : chaque ligne est déjà unique grâce à id",
      "Il supprime les noms en double",
      "Il trie par id"
    ],
    bonne: 1,
    pourquoi: [
      "Non. La clé primaire rend déjà chaque ligne unique.",
      "Oui. Un DISTINCT avec une clé unique ne retire rien. Il coûte juste du temps.",
      "Non. DISTINCT porte sur id + nom ensemble.",
      "Non. DISTINCT ne garantit aucun tri."
    ],
    retenir: "DISTINCT avec une clé unique dans le SELECT = travail inutile."
  },
  {
    id: "m01-q52", dialecte: "Standard",
    q: "La table a 100 lignes et 8 villes différentes. Que renvoie SELECT DISTINCT COUNT(*) FROM client; ?",
    choix: [
      "8",
      "100",
      "1 ligne : 8",
      "Une erreur"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Pour ça, il faut COUNT(DISTINCT ville).",
      "Oui. COUNT(*) compte 100 lignes. Le DISTINCT s'applique après, sur ce seul résultat : il ne change rien.",
      "Non. On compte des lignes, pas des villes.",
      "Non. C'est valide, mais inutile."
    ],
    retenir: "SELECT DISTINCT COUNT(*) ≠ COUNT(DISTINCT col)."
  },
  {
    id: "m01-q53", dialecte: "SQL Server",
    q: "Dans un script SSMS, que fait GO ?",
    choix: [
      "Il exécute la requête la plus rapide",
      "Il sépare le script en lots. Ce n'est pas une instruction SQL",
      "Il valide la transaction",
      "Il lance le script en arrière-plan"
    ],
    bonne: 1,
    pourquoi: [
      "Non. GO n'a aucun lien avec la vitesse.",
      "Oui. SSMS et sqlcmd coupent le script à chaque GO. Les variables déclarées avant GO n'existent plus après.",
      "Non. C'est COMMIT qui valide.",
      "Non."
    ],
    retenir: "GO = séparateur de lots de l'outil. Une variable ne traverse pas un GO."
  },
  {
    id: "m01-q54", dialecte: "SQL Server",
    q: "Que fait USE Ventes; sur SQL Server ?",
    choix: [
      "Il crée la base Ventes",
      "Il fait de Ventes la base courante pour la suite",
      "Il donne les droits sur Ventes",
      "Il sauvegarde Ventes"
    ],
    bonne: 1,
    pourquoi: [
      "Non. C'est CREATE DATABASE.",
      "Oui. Les noms sans base (dbo.client) seront cherchés dans Ventes. Snowflake : USE DATABASE, USE SCHEMA, USE WAREHOUSE.",
      "Non. C'est GRANT.",
      "Non. C'est BACKUP."
    ],
    retenir: "USE choisit la base courante."
  },
  {
    id: "m01-q55", dialecte: "SQL Server",
    q: "Pourquoi écrire dbo.client plutôt que client ?",
    choix: [
      "C'est obligatoire, sinon erreur",
      "Pour éviter toute ambiguïté si plusieurs schémas ont une table client, et aider SQL Server à réutiliser les plans",
      "Pour rendre la requête plus rapide à écrire",
      "Pour verrouiller la table"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Sans schéma, SQL Server cherche dans le schéma par défaut de l'utilisateur, puis dans dbo.",
      "Oui. Avec le schéma, il n'y a aucun doute sur la table visée.",
      "Non. C'est plus long à écrire.",
      "Non. Le nom ne pose aucun verrou."
    ],
    retenir: "Préfixe toujours le schéma : dbo.client, stg.import…"
  },
  {
    id: "m01-q56", dialecte: "SQL Server",
    q: "Que désigne SRV_ERP.Divalto.dbo.article ?",
    choix: [
      "Une colonne",
      "La table article du schéma dbo, dans la base Divalto, sur le serveur lié SRV_ERP",
      "Un fichier",
      "Une procédure"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Il y a 4 parties : serveur.base.schéma.table.",
      "Oui. Nom en 4 parties : on lit une table sur un autre serveur (serveur lié). Souvent lent sur de gros volumes.",
      "Non.",
      "Non. Ce serait appelé avec EXEC."
    ],
    retenir: "serveur.base.schéma.table : accès à un serveur lié."
  },
  {
    id: "m01-q57", dialecte: "SQL Server",
    q: "Une colonne s'appelle order (mot réservé). Comment la lire sur SQL Server ?",
    choixCode: true,
    choix: [
      "SELECT order FROM t",
      "SELECT [order] FROM t",
      "SELECT 'order' FROM t",
      "SELECT ORDER() FROM t"
    ],
    bonne: 1,
    pourquoi: [
      "Non. ORDER est un mot-clé : erreur de syntaxe.",
      "Oui. Les crochets transforment le mot-clé en nom. (Snowflake : \"ORDER\".)",
      "Non. Tu obtiens le texte « order » sur chaque ligne.",
      "Non. Ce n'est pas une fonction."
    ],
    retenir: "Mot réservé utilisé comme nom : [order]. Mieux : évite ces noms."
  },
  {
    id: "m01-q58", dialecte: "SQL Server",
    q: "La base utilise une collation sensible à la casse (CS). La table s'appelle client. Que donne SELECT * FROM Client ?",
    choix: [
      "Ça marche, la casse des noms de table n'a jamais d'importance",
      "Erreur : nom d'objet « Client » non valide",
      "Ça renvoie 0 ligne",
      "Ça marche seulement en minuscules"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Sur SQL Server, les noms d'objets suivent la collation de la base.",
      "Oui. Avec une collation CS, Client ≠ client. Écris les noms exactement comme ils ont été créés.",
      "Non. La table n'est pas trouvée.",
      "Non. Il faut la casse exacte de la création."
    ],
    retenir: "Base en collation CS : la casse des noms de tables et colonnes compte."
  },
  {
    id: "m01-q59", dialecte: "Snowflake",
    q: "Sur Snowflake, tu crées la table avec CREATE TABLE Client (…) (sans guillemets). Que donne SELECT * FROM \"Client\" ?",
    choix: [
      "Ça marche",
      "Erreur : la table « Client » n'existe pas",
      "Ça renvoie 0 ligne",
      "Ça crée une copie"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Sans guillemets à la création, le nom a été stocké en MAJUSCULES : CLIENT.",
      "Oui. Avec des guillemets, Snowflake cherche exactement « Client ». Écris FROM client (sans guillemets).",
      "Non. La table n'est pas trouvée.",
      "Non."
    ],
    retenir: "Snowflake : sans guillemets → MAJUSCULES. Ne mélange pas les deux styles."
  },
  {
    id: "m01-q60", dialecte: "Standard",
    q: "Quel est le type de la colonne dans SELECT '2026-10-26' AS d; ?",
    choix: [
      "DATE",
      "Texte (VARCHAR)",
      "DATETIME",
      "Nombre"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Le moteur ne devine pas que c'est une date.",
      "Oui. Entre apostrophes, c'est du texte. Pour une date : CAST('2026-10-26' AS date).",
      "Non.",
      "Non."
    ],
    retenir: "Une valeur entre apostrophes est un texte, même si elle ressemble à une date."
  },
  {
    id: "m01-q61", dialecte: "Standard",
    q: "La table a les colonnes (id, nom, ville). Dans quel ordre s'affichent les colonnes de SELECT ville, id FROM client ?",
    choix: [
      "id, ville",
      "ville, id",
      "id, nom, ville",
      "Au hasard"
    ],
    bonne: 1,
    pourquoi: [
      "Non. L'ordre de la table ne compte pas.",
      "Oui. Les colonnes s'affichent dans l'ordre du SELECT.",
      "Non. On a demandé seulement 2 colonnes.",
      "Non. L'ordre des colonnes est toujours celui du SELECT."
    ],
    retenir: "Colonnes : l'ordre du SELECT. Lignes : aucun ordre sans ORDER BY."
  },
  {
    id: "m01-q62", dialecte: "SQL Server + Snowflake",
    q: "FROM dbo.client c (sans AS) est-il valide ?",
    choix: [
      "Oui",
      "Non, AS est obligatoire",
      "Seulement sur Snowflake",
      "Seulement pour les colonnes"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. AS est facultatif pour les alias de table, sur SQL Server comme sur Snowflake.",
      "Non. Il est facultatif.",
      "Non. C'est valide sur les deux.",
      "Non. Il est facultatif pour les deux types d'alias."
    ],
    retenir: "AS est facultatif. Pour les colonnes, écris-le quand même (virgules oubliées)."
  },
  {
    id: "m01-q63", dialecte: "SQL Server",
    q: "Tu crées une vue avec SELECT TOP 100 PERCENT … ORDER BY nom. Un rapport fait SELECT * FROM la_vue. Est-il trié par nom ?",
    choix: [
      "Oui, toujours",
      "Non, pas garanti : le tri doit être dans la requête finale",
      "Oui, si la vue a un index",
      "Erreur : TOP interdit dans une vue"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Vieille astuce trompeuse : l'optimiseur peut ignorer ce tri.",
      "Oui. Une vue n'a pas d'ordre. Mets l'ORDER BY dans la requête qui lit la vue.",
      "Non. L'index ne garantit pas l'ordre du résultat.",
      "Non. TOP est permis, c'est même le seul moyen d'y mettre un ORDER BY."
    ],
    retenir: "L'ordre se décide dans la requête finale, jamais dans une vue."
  },
  {
    id: "m01-q64", dialecte: "Standard",
    q: "code est un VARCHAR contenant '1', '2' et '10'. Dans quel ordre sort ORDER BY code ?",
    choix: [
      "'1', '2', '10'",
      "'1', '10', '2'",
      "'10', '2', '1'",
      "'2', '1', '10'"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Ce serait un tri de nombres.",
      "Oui. Tri de texte : caractère par caractère. '10' commence par '1', il passe avant '2'.",
      "Non. C'est un tri décroissant.",
      "Non."
    ],
    retenir: "Des nombres stockés en texte se trient mal. ORDER BY CAST(code AS int) ou un vrai type numérique."
  },
  {
    id: "m01-q65", dialecte: "SQL Server + Snowflake",
    q: "Tu veux 5 commandes tirées au hasard. Quelle écriture pour chaque moteur ?",
    choix: [
      "TOP (5) … ORDER BY NEWID() sur SQL Server ; ORDER BY RANDOM() LIMIT 5 sur Snowflake",
      "TOP (5) sans ORDER BY partout",
      "ORDER BY 5 partout",
      "ORDER BY RAND() partout"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. NEWID() donne une valeur aléatoire par ligne. Snowflake : RANDOM(). Attention : trie toute la table.",
      "Non. Sans ORDER BY, ce n'est pas aléatoire : souvent toujours les mêmes lignes.",
      "Non. Ça trie sur la 5e colonne.",
      "Non. Sur SQL Server, RAND() donne la même valeur à toutes les lignes."
    ],
    retenir: "Hasard : ORDER BY NEWID() (SQL Server), ORDER BY RANDOM() ou SAMPLE (Snowflake)."
  },
  {
    id: "m01-q66", dialecte: "Snowflake",
    q: "Sur Snowflake, que fait SELECT * FROM commande SAMPLE (100 ROWS); ?",
    choix: [
      "Les 100 premières lignes insérées",
      "Un échantillon aléatoire de 100 lignes",
      "100 % des lignes",
      "Une erreur"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Il n'y a pas d'ordre d'insertion garanti.",
      "Oui. SAMPLE tire un échantillon. SAMPLE (10) sans ROWS = environ 10 % des lignes.",
      "Non. ROWS indique un nombre de lignes.",
      "Non. C'est une syntaxe Snowflake valide."
    ],
    retenir: "Snowflake : SAMPLE (n ROWS) ou SAMPLE (pourcentage) pour un échantillon."
  },
  {
    id: "m01-q67", dialecte: "SQL Server + Snowflake",
    q: "Que donne cette requête ?",
    code: "SELECT prix * qte AS montant,\n       montant * 0.2 AS tva\nFROM ligne_cde;",
    choix: [
      "Ça marche partout",
      "Erreur sur SQL Server, ça marche sur Snowflake",
      "Erreur partout",
      "Ça marche sur SQL Server, erreur sur Snowflake"
    ],
    bonne: 1,
    pourquoi: [
      "Non. SQL Server ne connaît pas l'alias dans le même SELECT.",
      "Oui. Snowflake permet de réutiliser un alias défini plus tôt dans le même SELECT. SQL Server : répète le calcul, ou passe par une CTE.",
      "Non. Snowflake l'accepte.",
      "Non. C'est l'inverse."
    ],
    retenir: "Réutiliser un alias dans le même SELECT : Snowflake oui, SQL Server non."
  },
  {
    id: "m01-q68", dialecte: "SQL Server",
    q: "Une requête lit 1 million de lignes et affiche GETDATE() sur chacune. Les valeurs sont-elles toutes identiques ?",
    choix: [
      "Oui, GETDATE() est calculé une seule fois pour la requête",
      "Non, chaque ligne a l'heure exacte de sa lecture",
      "Seulement si la requête dure moins d'une seconde",
      "Non, c'est aléatoire"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. GETDATE() est évalué une fois par requête. (NEWID(), lui, change à chaque ligne.)",
      "Non. Ce serait incohérent pour un horodatage de chargement.",
      "Non. La durée ne change rien.",
      "Non."
    ],
    retenir: "GETDATE() = même valeur pour toutes les lignes d'une requête."
  },
  {
    id: "m01-q69", dialecte: "SQL Server",
    q: "À quoi sert SELECT TOP (0) * FROM commande; ?",
    choix: [
      "À rien, c'est une erreur",
      "À voir les colonnes de la table, sans lire de données",
      "À vider la table",
      "À compter les lignes"
    ],
    bonne: 1,
    pourquoi: [
      "Non. C'est valide.",
      "Oui. Le résultat est vide, mais les en-têtes de colonnes s'affichent. Rapide, même sur une énorme table.",
      "Non. SELECT ne modifie rien.",
      "Non. Pour compter : COUNT(*)."
    ],
    retenir: "TOP (0) : la structure sans les données. (Snowflake : LIMIT 0.)"
  },
  {
    id: "m01-q70", dialecte: "SQL Server + Snowflake",
    q: "Quelle vue système liste les colonnes d'une table, sur SQL Server ET sur Snowflake ?",
    choixCode: true,
    choix: [
      "sys.columns",
      "INFORMATION_SCHEMA.COLUMNS",
      "SHOW COLUMNS",
      "sp_columns"
    ],
    bonne: 1,
    pourquoi: [
      "Non. sys.columns existe seulement sur SQL Server.",
      "Oui. INFORMATION_SCHEMA est standard : WHERE TABLE_NAME = 'COMMANDE' (en majuscules sur Snowflake).",
      "Non. SHOW COLUMNS est une commande Snowflake seulement.",
      "Non. sp_columns est propre à SQL Server."
    ],
    retenir: "INFORMATION_SCHEMA.COLUMNS : portable pour lire la structure."
  },
  {
    id: "m01-q71", dialecte: "SQL Server + Snowflake",
    q: "Pour voir rapidement la structure d'une table, quelle commande va avec quel moteur ?",
    choix: [
      "sp_help 'dbo.client' sur SQL Server ; DESCRIBE TABLE client sur Snowflake",
      "DESCRIBE TABLE sur les deux",
      "sp_help sur les deux",
      "SHOW CREATE sur les deux"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. sp_help est une procédure système SQL Server. DESCRIBE (ou DESC) est une commande Snowflake.",
      "Non. SQL Server ne connaît pas DESCRIBE.",
      "Non. Snowflake n'a pas sp_help.",
      "Non. Ce n'est pas la syntaxe de ces moteurs."
    ],
    retenir: "Structure : sp_help (SQL Server), DESCRIBE TABLE (Snowflake)."
  },
  {
    id: "m01-q72", dialecte: "SQL Server",
    q: "Sur SQL Server, que renvoie cette requête ?",
    code: "SELECT *\nFROM (VALUES (1, 'FR'), (2, 'BE')) AS t(id, pays);",
    choix: [
      "Une erreur : VALUES sert seulement à INSERT",
      "Une petite table de 2 lignes, avec les colonnes id et pays",
      "La valeur 1 seulement",
      "Les clients de FR et BE"
    ],
    bonne: 1,
    pourquoi: [
      "Non. VALUES peut construire une table dans un FROM.",
      "Oui. Pratique pour une table de correspondance rapide (codes → libellés). Snowflake : FROM VALUES (…) aussi.",
      "Non. Toutes les lignes sont renvoyées.",
      "Non. Aucune table client n'est lue."
    ],
    retenir: "(VALUES …) AS t(colonnes) : une table en dur dans la requête."
  },
  {
    id: "m01-q73", dialecte: "Standard",
    q: "Dans SELECT TOP (10) … FROM commande WHERE pays = 'FR' ORDER BY montant DESC, que se passe-t-il en premier ?",
    choix: [
      "TOP prend 10 lignes, puis WHERE filtre",
      "WHERE filtre, puis tri, puis TOP prend les 10 premières",
      "Le tri, puis WHERE, puis TOP",
      "Ça dépend du nombre de lignes"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Sinon on pourrait obtenir moins de 10 lignes FR.",
      "Oui. Les 10 plus grosses commandes françaises.",
      "Non. WHERE passe avant le tri.",
      "Non. L'ordre logique est fixe."
    ],
    retenir: "WHERE → ORDER BY → TOP."
  },
  {
    id: "m01-q74", dialecte: "Snowflake",
    q: "Sur Snowflake, SELECT nom FROM client; affiche une colonne nommée comment ?",
    choix: [
      "nom",
      "NOM",
      "Nom",
      "client.nom"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Les noms sans guillemets sont mis en majuscules.",
      "Oui. Power BI ou Excel verront NOM. Pour garder la casse : AS \"nom\".",
      "Non.",
      "Non. Le nom de la table n'apparaît pas."
    ],
    retenir: "Snowflake renvoie les noms de colonnes en MAJUSCULES (sauf guillemets)."
  },
  {
    id: "m01-q75", dialecte: "Snowflake",
    q: "Sur Snowflake, tu veux une colonne nommée nom_client en minuscules dans le résultat. Que faut-il écrire ?",
    choixCode: true,
    choix: [
      "AS nom_client",
      "AS \"nom_client\"",
      "AS 'nom_client'",
      "AS LOWER(nom_client)"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Sans guillemets, l'alias devient NOM_CLIENT.",
      "Oui. Les guillemets doubles gardent la casse exacte.",
      "Non. Les apostrophes servent au texte, pas aux noms.",
      "Non. LOWER s'applique à des valeurs, pas à des noms."
    ],
    retenir: "Snowflake : \"alias\" pour garder la casse."
  },
  {
    id: "m01-q76", dialecte: "SQL Server",
    q: "Tu crées une vue : SELECT * FROM commande co JOIN client cl ON cl.id = co.client_id. Les deux tables ont une colonne id. Que se passe-t-il ?",
    choix: [
      "La vue est créée avec deux colonnes id",
      "Erreur : la colonne id est présente plusieurs fois",
      "La 2e colonne id est renommée id1",
      "Seul le premier id est gardé"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Une vue ne peut pas avoir deux colonnes du même nom.",
      "Oui. Liste les colonnes et renomme : co.id AS cde_id, cl.id AS client_id.",
      "Non. SQL Server ne renomme pas tout seul.",
      "Non. Rien n'est supprimé en silence."
    ],
    retenir: "Vue : noms de colonnes uniques. Encore une raison d'éviter SELECT *."
  },
  {
    id: "m01-q77", dialecte: "SQL Server",
    q: "SSMS génère [dbo].[client]. Est-ce la même chose que dbo.client ?",
    choix: [
      "Oui",
      "Non, les crochets créent une copie",
      "Non, les crochets verrouillent la table",
      "Seulement en lecture"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Les crochets sont seulement utiles pour les noms spéciaux. Ici, ils ne changent rien.",
      "Non.",
      "Non.",
      "Non."
    ],
    retenir: "[dbo].[client] = dbo.client. Les crochets protègent les noms spéciaux."
  },
  {
    id: "m01-q78", dialecte: "Standard",
    q: "Les retours à la ligne et les espaces dans une requête changent-ils le résultat ?",
    choix: [
      "Oui",
      "Non, ils servent seulement à la lisibilité",
      "Oui, sur SQL Server",
      "Oui, après WHERE"
    ],
    bonne: 1,
    pourquoi: [
      "Non. En dehors des textes entre apostrophes, ils sont ignorés.",
      "Oui. Profites-en : une clause par ligne, c'est plus lisible.",
      "Non.",
      "Non."
    ],
    retenir: "Mise en forme libre : utilise-la pour être lisible."
  },
  {
    id: "m01-q79", dialecte: "Snowflake",
    q: "SELECT TOP 10 * FROM commande ORDER BY montant DESC; marche-t-il sur Snowflake ?",
    choix: [
      "Oui",
      "Non, seulement LIMIT",
      "Seulement sans ORDER BY",
      "Seulement avec PERCENT"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Snowflake accepte TOP, en plus de LIMIT. Pratique pour migrer du code SQL Server.",
      "Non. TOP est accepté.",
      "Non.",
      "Non."
    ],
    retenir: "Snowflake accepte TOP n et LIMIT n."
  },
  {
    id: "m01-q80", dialecte: "Snowflake",
    q: "Sur Snowflake, SELECT * FROM commande LIMIT 10; (sans ORDER BY) renvoie-t-il toujours les mêmes lignes ?",
    choix: [
      "Oui",
      "Non, aucun ordre n'est garanti",
      "Oui, les 10 plus anciennes",
      "Oui, les 10 plus récentes"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Comme sur SQL Server, sans ORDER BY, aucun ordre n'est garanti.",
      "Oui. Bien pour jeter un œil aux données. Pas pour un rapport.",
      "Non.",
      "Non."
    ],
    retenir: "LIMIT sans ORDER BY = lignes quelconques."
  },
  {
    id: "m01-q81", dialecte: "SQL Server",
    q: "Que donne SELECT TOP (5) WITH TIES * FROM commande; (sans ORDER BY) ?",
    choix: [
      "5 lignes",
      "Toutes les lignes",
      "Erreur : WITH TIES exige un ORDER BY",
      "0 ligne"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Sans tri, impossible de savoir qui est ex aequo.",
      "Non.",
      "Oui. WITH TIES compare les valeurs du ORDER BY. Sans ORDER BY : erreur.",
      "Non."
    ],
    retenir: "WITH TIES = ORDER BY obligatoire."
  },
  {
    id: "m01-q82", dialecte: "Standard",
    q: "Dans FROM a JOIN b ON … WHERE …, qu'est-ce qui est traité en premier, logiquement ?",
    choix: [
      "WHERE",
      "Le ON de la jointure",
      "SELECT",
      "Les deux en même temps"
    ],
    bonne: 1,
    pourquoi: [
      "Non. WHERE s'applique au résultat de la jointure.",
      "Oui. Les jointures (et leur ON) font partie du FROM. WHERE vient après. C'est pour ça qu'un filtre dans WHERE peut annuler un LEFT JOIN.",
      "Non. SELECT est presque à la fin.",
      "Non. L'ordre logique est précis."
    ],
    retenir: "FROM (avec les JOIN … ON) → WHERE."
  },
  {
    id: "m01-q83", dialecte: "Standard",
    q: "L'ordre logique (FROM → WHERE → …) est-il l'ordre réel dans lequel le serveur travaille ?",
    choix: [
      "Oui, exactement",
      "Non : c'est l'ordre qui définit le résultat. L'optimiseur peut travailler autrement, avec le même résultat",
      "Non, c'est l'ordre d'écriture",
      "Ça dépend du jour"
    ],
    bonne: 1,
    pourquoi: [
      "Non. L'optimiseur réorganise souvent (filtrer avant de joindre, par exemple).",
      "Oui. L'ordre logique sert à comprendre ce que la requête veut dire. Le plan d'exécution montre l'ordre réel.",
      "Non. L'ordre d'écriture commence par SELECT.",
      "Non."
    ],
    retenir: "Ordre logique = le sens. Plan d'exécution = le travail réel."
  },
  {
    id: "m01-q84", dialecte: "Standard",
    q: "Quelles colonnes renvoie cette requête ?",
    code: "SELECT nom -- , ville\nFROM client;",
    choix: [
      "nom et ville",
      "nom seulement",
      "Erreur de syntaxe",
      "Aucune"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Tout ce qui suit -- sur la ligne est un commentaire.",
      "Oui. « , ville » est en commentaire. Pratique pour désactiver une colonne pendant un test.",
      "Non. FROM est sur la ligne suivante, donc valide.",
      "Non."
    ],
    retenir: "-- commente jusqu'à la fin de la ligne seulement."
  },
  {
    id: "m01-q85", dialecte: "Snowflake",
    q: "Sur Snowflake, que fait '2026-10-26'::DATE ?",
    choix: [
      "Une erreur de syntaxe",
      "Convertit le texte en date (raccourci de CAST)",
      "Compare deux dates",
      "Crée une colonne DATE"
    ],
    bonne: 1,
    pourquoi: [
      "Non sur Snowflake. (Oui sur SQL Server, qui ne connaît pas ::.)",
      "Oui. :: est un raccourci de CAST(… AS DATE). Très utilisé sur Snowflake.",
      "Non.",
      "Non."
    ],
    retenir: "Snowflake : valeur::TYPE = CAST(valeur AS TYPE)."
  },
  {
    id: "m01-q86", dialecte: "SQL Server + Snowflake",
    q: "Comment connaître la version du moteur ?",
    choix: [
      "SELECT @@VERSION; sur SQL Server, SELECT CURRENT_VERSION(); sur Snowflake",
      "SELECT VERSION(); partout",
      "SHOW VERSION; partout",
      "On ne peut pas en SQL"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Utile avant d'utiliser une fonction récente (TRIM, STRING_AGG, DATETRUNC…).",
      "Non. VERSION() n'existe pas sur ces moteurs.",
      "Non.",
      "Non."
    ],
    retenir: "@@VERSION (SQL Server), CURRENT_VERSION() (Snowflake)."
  },
  {
    id: "m01-q87", dialecte: "SQL Server + Snowflake",
    q: "Comment savoir dans quelle base tu travailles ?",
    choix: [
      "SELECT DB_NAME(); sur SQL Server, SELECT CURRENT_DATABASE(); sur Snowflake",
      "SELECT DATABASE(); partout",
      "USE; partout",
      "SELECT @@SERVER;"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Bon réflexe avant un UPDATE en production !",
      "Non. DATABASE() est MySQL.",
      "Non. USE change la base, il ne l'affiche pas.",
      "Non. @@SERVERNAME donne le serveur, pas la base."
    ],
    retenir: "Avant de modifier : vérifie la base (DB_NAME / CURRENT_DATABASE)."
  },
  {
    id: "m01-q88", dialecte: "SQL Server + Snowflake",
    q: "SELECT *, montant * 1.2 AS ttc FROM commande; est-il valide ?",
    choix: [
      "Oui",
      "Non, on ne mélange pas * et colonnes",
      "Seulement sur Snowflake",
      "Seulement si ttc existe"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Toutes les colonnes, plus une colonne calculée à la fin.",
      "Non. Le mélange est permis.",
      "Non. Valide sur les deux.",
      "Non. L'alias crée la colonne dans le résultat."
    ],
    retenir: "* peut être suivi d'autres colonnes ou calculs."
  },
  {
    id: "m01-q89", dialecte: "Standard",
    q: "Que renvoie SELECT cl.*, co.montant FROM client cl JOIN commande co ON co.client_id = cl.id ?",
    choix: [
      "Toutes les colonnes des deux tables",
      "Toutes les colonnes de client, plus montant",
      "Seulement montant",
      "Une erreur"
    ],
    bonne: 1,
    pourquoi: [
      "Non. cl.* limite le * à la table client.",
      "Oui. alias.* = toutes les colonnes d'UNE table.",
      "Non.",
      "Non. C'est valide."
    ],
    retenir: "alias.* : toutes les colonnes d'une seule table."
  },
  {
    id: "m01-q90", dialecte: "SQL Server",
    q: "Sur SQL Server, tu veux trier par date_livraison croissante, avec les NULL à la FIN. Que faire ?",
    choixCode: true,
    choix: [
      "ORDER BY date_livraison NULLS LAST",
      "ORDER BY CASE WHEN date_livraison IS NULL THEN 1 ELSE 0 END, date_livraison",
      "ORDER BY date_livraison DESC",
      "ORDER BY ISNULL(date_livraison)"
    ],
    bonne: 1,
    pourquoi: [
      "Non. NULLS LAST n'existe pas sur SQL Server (il existe sur Snowflake).",
      "Oui. 1er critère : les NULL valent 1, donc après. 2e critère : la date.",
      "Non. Ça inverse toutes les dates.",
      "Non. ISNULL demande deux arguments sur SQL Server."
    ],
    retenir: "SQL Server : NULL à la fin avec ORDER BY CASE WHEN col IS NULL THEN 1 ELSE 0 END, col."
  },
  {
    id: "m01-q91", dialecte: "SQL Server",
    q: "Comment obtenir les 10 commandes les plus récentes ?",
    choixCode: true,
    choix: [
      "SELECT TOP (10) * FROM commande ORDER BY date_cde",
      "SELECT TOP (10) * FROM commande ORDER BY date_cde DESC",
      "SELECT TOP (10) * FROM commande",
      "SELECT * FROM commande WHERE TOP (10)"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Croissant = les 10 plus ANCIENNES.",
      "Oui. Les plus récentes d'abord (DESC), puis on en garde 10.",
      "Non. Sans tri, ce sont 10 lignes quelconques.",
      "Non. TOP ne va pas dans WHERE."
    ],
    retenir: "« Les plus récents » = ORDER BY date DESC + TOP."
  },
  {
    id: "m01-q92", dialecte: "SQL Server",
    q: "Quelle est la différence entre SELECT MAX(date_cde) FROM commande et SELECT TOP (1) * FROM commande ORDER BY date_cde DESC ?",
    choix: [
      "Aucune",
      "MAX donne seulement la date ; TOP (1) donne toute la ligne de la commande",
      "TOP (1) est toujours faux",
      "MAX renvoie plusieurs lignes"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Le contenu du résultat est différent.",
      "Oui. Si tu veux aussi le numéro, le client, le montant : TOP (1) … ORDER BY.",
      "Non. Il est correct.",
      "Non. MAX sans GROUP BY renvoie une seule ligne."
    ],
    retenir: "MAX = une valeur. TOP (1) + ORDER BY = la ligne entière."
  },
  {
    id: "m01-q93", dialecte: "SQL Server",
    q: "Sur SQL Server, avec ORDER BY date_livraison DESC, où sont les NULL ?",
    choix: [
      "En premier",
      "En dernier",
      "Supprimés",
      "Au milieu"
    ],
    bonne: 1,
    pourquoi: [
      "Non. SQL Server voit NULL comme la plus petite valeur.",
      "Oui. Plus petite valeur + tri décroissant = à la fin.",
      "Non. ORDER BY ne supprime rien.",
      "Non."
    ],
    retenir: "SQL Server : NULL = plus petite valeur. ASC → en tête, DESC → en fin."
  },
  {
    id: "m01-q94", dialecte: "Snowflake",
    q: "Sur Snowflake, comment forcer les NULL en premier dans un tri croissant ?",
    choixCode: true,
    choix: [
      "ORDER BY d NULLS FIRST",
      "ORDER BY d NULL FIRST",
      "ORDER BY NULL, d",
      "ORDER BY d ASC NULL"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. NULLS FIRST / NULLS LAST : syntaxe standard, acceptée par Snowflake.",
      "Non. Il faut NULLS au pluriel.",
      "Non. Trier sur une constante NULL ne change rien.",
      "Non. Syntaxe invalide."
    ],
    retenir: "Snowflake : NULLS FIRST / NULLS LAST après le sens du tri."
  },
  {
    id: "m01-q95", dialecte: "SQL Server",
    q: "Sur SQL Server, la colonne contient 'ABC' et 'ABC ' (espace à la fin). Combien de lignes renvoie SELECT DISTINCT ?",
    choix: [
      "1",
      "2",
      "0",
      "Une erreur"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. SQL Server ignore les espaces de fin quand il compare : les deux valeurs sont « égales ».",
      "Non sur SQL Server. (Snowflake, lui, renverrait 2 lignes.)",
      "Non.",
      "Non."
    ],
    retenir: "SQL Server : 'ABC' = 'ABC '. Snowflake : différents."
  },
  {
    id: "m01-q96", dialecte: "SQL Server",
    q: "Le SELECT a 3 colonnes. Que donne ORDER BY 5 ?",
    choix: [
      "Tri sur la valeur 5",
      "Erreur : position hors limites",
      "Tri sur la 3e colonne",
      "Aucun tri"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Un entier dans ORDER BY est une position.",
      "Oui. Il n'y a pas de 5e colonne : SQL Server refuse.",
      "Non.",
      "Non."
    ],
    retenir: "ORDER BY n : n doit exister dans le SELECT."
  },
  {
    id: "m01-q97", dialecte: "Snowflake",
    q: "Sur Snowflake, tu es dans la base PROD. Que désigne VENTES.COMMANDE ?",
    choix: [
      "La base VENTES, table COMMANDE",
      "Le schéma VENTES de la base PROD, table COMMANDE",
      "Une colonne COMMANDE de la table VENTES",
      "Le warehouse VENTES"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Avec 2 parties, la 1re est le schéma.",
      "Oui. Nom complet : PROD.VENTES.COMMANDE.",
      "Non. Dans un FROM, c'est une table.",
      "Non. Un warehouse n'apparaît jamais dans un nom de table."
    ],
    retenir: "2 parties = schéma.table, dans la base courante."
  },
  {
    id: "m01-q98", dialecte: "SQL Server",
    q: "date_cde est une DATE (sans heure). Que renvoie cette requête ?",
    code: "SELECT TOP (1) WITH TIES *\nFROM commande\nORDER BY date_cde DESC;",
    choix: [
      "Une seule commande, la dernière",
      "Toutes les commandes du dernier jour",
      "Toutes les commandes",
      "Une erreur"
    ],
    bonne: 1,
    pourquoi: [
      "Non. WITH TIES garde les ex aequo.",
      "Oui. Toutes les commandes qui ont la date la plus récente. Astuce élégante.",
      "Non. Seulement celles à égalité avec la 1re.",
      "Non. Il y a bien un ORDER BY."
    ],
    retenir: "TOP (1) WITH TIES + ORDER BY : toutes les lignes de la valeur la plus haute."
  },
  {
    id: "m01-q99", dialecte: "Snowflake",
    q: "Sur Snowflake, que donne SELECT * FROM commande LIMIT 10 ORDER BY montant DESC; ?",
    choix: [
      "Les 10 plus grosses commandes",
      "10 commandes triées",
      "Erreur de syntaxe",
      "Toutes les commandes triées"
    ],
    bonne: 2,
    pourquoi: [
      "Non. La requête ne s'exécute pas.",
      "Non.",
      "Oui. LIMIT se place après ORDER BY, tout à la fin.",
      "Non."
    ],
    retenir: "Snowflake : … ORDER BY … LIMIT n. LIMIT en dernier."
  },
  {
    id: "m01-q100", dialecte: "Standard",
    q: "Dans un traitement de chargement (ETL), pourquoi éviter un ORDER BY sur les étapes intermédiaires ?",
    choix: [
      "Il est interdit dans un ETL",
      "Trier coûte cher, et l'ordre n'est pas conservé par les étapes suivantes. On trie seulement le résultat final",
      "Il supprime des lignes",
      "Il bloque la table"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Il est permis.",
      "Oui. Un tri sur des millions de lignes prend du temps et de la mémoire, pour rien si l'étape suivante ne garde pas l'ordre.",
      "Non. ORDER BY ne supprime jamais de lignes.",
      "Non. Un tri ne verrouille pas la table."
    ],
    retenir: "Trie seulement là où l'ordre compte : l'affichage final."
  }
];
