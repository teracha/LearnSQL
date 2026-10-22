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
  }
];
