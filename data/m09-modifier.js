LEARNSQL.questions.m09 = [
  {
    id: "m09-q01", dialecte: "Standard",
    q: "Pourquoi écrire INSERT INTO client (code, nom, pays) VALUES (…) plutôt que INSERT INTO client VALUES (…) ?",
    choix: [
      "C'est plus rapide",
      "Si une colonne est ajoutée ou déplacée dans la table, l'INSERT sans liste casse ou remplit les mauvaises colonnes",
      "C'est obligatoire",
      "Pour trier les lignes"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Avec la liste, l'INSERT reste juste quoi qu'il arrive à la table.",
      "Non. C'est facultatif… mais indispensable en pratique.",
      "Non."
    ],
    retenir: "INSERT : toujours la liste des colonnes."
  },
  {
    id: "m09-q02", dialecte: "Standard",
    q: "Comment insérer 3 clients en une seule instruction ?",
    choixCode: true,
    choix: [
      "INSERT INTO client (code, nom) VALUES ('C1', 'A'), ('C2', 'B'), ('C3', 'C')",
      "INSERT INTO client (code, nom) VALUES ('C1', 'A') AND ('C2', 'B')",
      "INSERT 3 INTO client",
      "Impossible"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Plusieurs lignes séparées par des virgules. (SQL Server : 1 000 lignes max par VALUES.)",
      "Non.",
      "Non.",
      "Non."
    ],
    retenir: "VALUES (…), (…), (…) : plusieurs lignes."
  },
  {
    id: "m09-q03", dialecte: "SQL Server",
    q: "Un INSERT … VALUES contient 5 000 lignes. Que se passe-t-il sur SQL Server ?",
    choix: ["Ça marche", "Erreur : 1 000 lignes maximum dans un VALUES", "Seules 1 000 lignes sont insérées", "Ça plante le serveur"],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Découpe en plusieurs INSERT, ou charge un fichier (BULK INSERT), ou passe par une table de chargement.",
      "Non. Rien n'est inséré.",
      "Non."
    ],
    retenir: "VALUES : 1 000 lignes max (SQL Server)."
  },
  {
    id: "m09-q04", dialecte: "Standard",
    q: "Comment copier les clients inactifs dans une table d'archive qui existe déjà ?",
    choixCode: true,
    choix: [
      "SELECT * INTO client_archive FROM client WHERE actif = 0",
      "INSERT INTO client_archive (code, nom) SELECT code, nom FROM client WHERE actif = 0",
      "UPDATE client_archive SET … FROM client",
      "COPY client TO client_archive"
    ],
    bonne: 1,
    pourquoi: [
      "Non. SELECT INTO crée une nouvelle table : erreur si elle existe.",
      "Oui. INSERT … SELECT ajoute dans une table existante.",
      "Non.",
      "Non."
    ],
    retenir: "Ajouter dans une table existante : INSERT INTO … SELECT."
  },
  {
    id: "m09-q05", dialecte: "Standard",
    q: "La colonne date_creation a DEFAULT GETDATE(). Tu ne la mets pas dans ton INSERT. Que vaut-elle ?",
    choix: ["NULL", "La date et l'heure de l'insertion", "Une erreur", "0"],
    bonne: 1,
    pourquoi: [
      "Non. La valeur par défaut s'applique.",
      "Oui. Colonne absente de l'INSERT = valeur DEFAULT.",
      "Non.",
      "Non."
    ],
    retenir: "Colonne omise = DEFAULT (ou NULL s'il n'y en a pas)."
  },
  {
    id: "m09-q06", dialecte: "Standard",
    q: "La colonne nom est NOT NULL, sans valeur par défaut. Tu ne la mets pas dans l'INSERT. Que se passe-t-il ?",
    choix: ["Elle vaut ''", "Erreur : impossible d'insérer NULL dans la colonne nom", "Elle vaut NULL", "La ligne est insérée sans nom"],
    bonne: 1,
    pourquoi: [
      "Non. Pas de valeur inventée.",
      "Oui. La contrainte NOT NULL protège la donnée.",
      "Non. Interdit par NOT NULL.",
      "Non."
    ],
    retenir: "NOT NULL sans DEFAULT = valeur obligatoire dans l'INSERT."
  },
  {
    id: "m09-q07", dialecte: "Standard",
    q: "Comment demander explicitement la valeur par défaut d'une colonne dans un VALUES ?",
    choixCode: true,
    choix: ["VALUES ('C1', NULL)", "VALUES ('C1', DEFAULT)", "VALUES ('C1', '')", "VALUES ('C1', AUTO)"],
    bonne: 1,
    pourquoi: [
      "Non. NULL insère NULL, pas la valeur par défaut.",
      "Oui. Le mot-clé DEFAULT.",
      "Non.",
      "Non."
    ],
    retenir: "DEFAULT dans VALUES = valeur par défaut. NULL = NULL."
  },
  {
    id: "m09-q08", dialecte: "SQL Server",
    q: "La table a une colonne id IDENTITY. Tu écris INSERT INTO client (id, code) VALUES (500, 'C9'). Que se passe-t-il ?",
    choix: [
      "La ligne prend l'id 500",
      "Erreur : impossible d'insérer une valeur explicite dans une colonne IDENTITY (sauf avec SET IDENTITY_INSERT ON)",
      "L'id 500 est ignoré",
      "La table est réinitialisée"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. IDENTITY_INSERT sert aux reprises de données. À désactiver juste après.",
      "Non. SQL Server ne l'ignore pas en silence.",
      "Non."
    ],
    retenir: "Forcer un id IDENTITY : SET IDENTITY_INSERT table ON (ponctuel)."
  },
  {
    id: "m09-q09", dialecte: "SQL Server",
    q: "Après un INSERT dans une table IDENTITY, quelle fonction donne l'id généré par TON instruction ?",
    choixCode: true,
    choix: ["@@IDENTITY", "SCOPE_IDENTITY()", "IDENT_CURRENT('client')", "MAX(id)"],
    bonne: 1,
    pourquoi: [
      "Non. Peut renvoyer l'id créé par un trigger dans une autre table.",
      "Oui. L'id de la dernière insertion dans ta portée (ta procédure, ton lot).",
      "Non. Le dernier id de la table, même inséré par quelqu'un d'autre.",
      "Non. Un autre utilisateur a pu insérer entre-temps."
    ],
    retenir: "Id généré : SCOPE_IDENTITY() (ou OUTPUT inserted.id)."
  },
  {
    id: "m09-q10", dialecte: "SQL Server",
    q: "Tu insères 200 commandes d'un coup (INSERT … SELECT). Comment récupérer les 200 id générés ?",
    choixCode: true,
    choix: [
      "SCOPE_IDENTITY()",
      "OUTPUT inserted.id, inserted.num_cde INTO @ids",
      "@@ROWCOUNT",
      "MAX(id) - 200"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Seulement le dernier.",
      "Oui. OUTPUT renvoie toutes les lignes insérées, avec leurs id.",
      "Non. Le nombre de lignes, pas les id.",
      "Non. Les id peuvent ne pas se suivre."
    ],
    retenir: "Plusieurs id générés : OUTPUT inserted.id."
  },
  {
    id: "m09-q11", dialecte: "SQL Server",
    q: "Erreur : « String or binary data would be truncated ». Que veut dire ce message ?",
    choix: [
      "La table est pleine",
      "Une valeur est trop longue pour sa colonne (ex. 60 caractères dans un VARCHAR(50))",
      "Il manque une colonne",
      "Le type est faux"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Depuis SQL Server 2019, le message peut indiquer la table, la colonne et la valeur.",
      "Non.",
      "Non."
    ],
    retenir: "« would be truncated » = valeur trop longue pour la colonne."
  },
  {
    id: "m09-q12", dialecte: "Standard",
    q: "INSERT INTO t … SELECT … ORDER BY date_cde : les lignes seront-elles relues dans cet ordre plus tard ?",
    choix: ["Oui", "Non : une table n'a pas d'ordre. Seul un ORDER BY à la lecture garantit l'ordre", "Oui si la table a un IDENTITY", "Oui sur Snowflake"],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. (Un ORDER BY peut seulement influencer l'ordre d'attribution des IDENTITY.)",
      "Non. L'ordre de lecture n'est toujours pas garanti.",
      "Non."
    ],
    retenir: "L'ordre d'insertion ne garantit pas l'ordre de lecture."
  },
  {
    id: "m09-q13", dialecte: "SQL Server",
    q: "Comment insérer dans une table le résultat d'une procédure stockée ?",
    choixCode: true,
    choix: [
      "INSERT INTO #t EXEC dbo.p_liste_clients",
      "SELECT * INTO #t FROM dbo.p_liste_clients",
      "INSERT #t = EXEC …",
      "Impossible"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. La table #t doit exister, avec les bonnes colonnes.",
      "Non. On ne fait pas un FROM sur une procédure.",
      "Non.",
      "Non."
    ],
    retenir: "INSERT INTO … EXEC procédure."
  },
  {
    id: "m09-q14", dialecte: "Standard",
    q: "Que fait UPDATE article SET prix = prix * 1.05; (sans WHERE) ?",
    choix: ["Rien", "Augmente le prix de TOUS les articles de 5 %", "Erreur : WHERE obligatoire", "Augmente le 1er article"],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Sans WHERE, toutes les lignes sont modifiées. Erreur classique et grave.",
      "Non. Aucune protection par défaut.",
      "Non."
    ],
    retenir: "UPDATE sans WHERE = toute la table."
  },
  {
    id: "m09-q15", dialecte: "Standard",
    q: "Quelle est la bonne méthode avant un UPDATE en production ?",
    choix: [
      "Lancer l'UPDATE et regarder après",
      "Écrire d'abord un SELECT avec le même WHERE, vérifier les lignes et leur nombre, puis faire l'UPDATE dans une transaction",
      "Mettre NOLOCK",
      "Faire l'UPDATE deux fois"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Tu sais exactement ce qui va changer, et tu peux annuler (ROLLBACK).",
      "Non.",
      "Non."
    ],
    retenir: "SELECT → vérifier → BEGIN TRAN → UPDATE → vérifier → COMMIT."
  },
  {
    id: "m09-q16", dialecte: "Standard",
    q: "Comment modifier deux colonnes dans le même UPDATE ?",
    choixCode: true,
    choix: [
      "UPDATE client SET ville = 'Lyon' SET cp = '69001'",
      "UPDATE client SET ville = 'Lyon', cp = '69001' WHERE id = 42",
      "UPDATE client SET (ville, cp) WHERE id = 42",
      "Deux UPDATE obligatoires"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Un seul SET.",
      "Oui. Un SET, les affectations séparées par des virgules.",
      "Non.",
      "Non."
    ],
    retenir: "UPDATE … SET a = …, b = … WHERE …"
  },
  {
    id: "m09-q17", dialecte: "Standard",
    q: "a = 1 et b = 2. Après UPDATE t SET a = b, b = a, que valent a et b ?",
    choix: ["a = 2, b = 2", "a = 2, b = 1", "a = 1, b = 1", "Erreur"],
    bonne: 1,
    pourquoi: [
      "Non. Ce serait le cas en programmation ligne par ligne.",
      "Oui. Toutes les expressions du SET utilisent les valeurs d'AVANT la modification : l'échange fonctionne.",
      "Non.",
      "Non."
    ],
    retenir: "Dans un SET, tout est calculé avec les anciennes valeurs."
  },
  {
    id: "m09-q18", dialecte: "SQL Server",
    q: "Comment mettre à jour le prix des articles à partir d'une table de tarifs, sur SQL Server ?",
    choixCode: true,
    choix: [
      "UPDATE a SET a.prix = t.prix FROM dbo.article a JOIN stg.tarif t ON t.code = a.code",
      "UPDATE article JOIN tarif SET prix = tarif.prix",
      "UPDATE article SET prix = tarif.prix",
      "MERGE seulement"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Syntaxe SQL Server : UPDATE alias SET … FROM … JOIN …",
      "Non. Syntaxe MySQL.",
      "Non. tarif n'est pas dans la requête.",
      "Non. MERGE marche aussi, mais n'est pas obligatoire."
    ],
    retenir: "SQL Server : UPDATE a SET … FROM a JOIN b ON …"
  },
  {
    id: "m09-q19", dialecte: "Snowflake",
    q: "Sur Snowflake, comment mettre à jour le prix des articles à partir d'une table de tarifs ?",
    choixCode: true,
    choix: [
      "UPDATE article a SET prix = t.prix FROM tarif t WHERE t.code = a.code",
      "UPDATE a SET a.prix = t.prix FROM article a JOIN tarif t ON …",
      "UPDATE article JOIN tarif …",
      "Impossible"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Snowflake : UPDATE cible SET … FROM source WHERE condition.",
      "Non. Syntaxe SQL Server.",
      "Non.",
      "Non."
    ],
    retenir: "Snowflake : UPDATE t SET … FROM s WHERE …"
  },
  {
    id: "m09-q20", dialecte: "SQL Server",
    q: "La table de tarifs contient 2 prix pour le même article. Que fait l'UPDATE … FROM … JOIN sur SQL Server ?",
    choix: [
      "Erreur",
      "Pas d'erreur : l'article prend l'un des deux prix, au hasard",
      "Il prend la moyenne",
      "Il ne fait rien"
    ],
    bonne: 1,
    pourquoi: [
      "Non. C'est le piège : aucun message.",
      "Oui. Résultat imprévisible. Vérifie l'unicité de la source avant (GROUP BY … HAVING COUNT(*) > 1).",
      "Non.",
      "Non."
    ],
    retenir: "UPDATE avec jointure : source unique par clé, sinon résultat au hasard."
  },
  {
    id: "m09-q21", dialecte: "Standard",
    q: "Comment appliquer des hausses différentes selon la famille, en un seul UPDATE ?",
    choixCode: true,
    choix: [
      "UPDATE article SET prix = prix * CASE famille WHEN 'POMPE' THEN 1.05 WHEN 'LINER' THEN 1.03 ELSE 1 END",
      "Un UPDATE par famille obligatoire",
      "UPDATE article SET prix = prix * 1.05 OR 1.03",
      "UPDATE article SET prix = famille"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Un CASE dans le SET. Pense au ELSE 1 pour ne pas mettre les autres à NULL !",
      "Non. Possible, mais pas obligatoire.",
      "Non.",
      "Non."
    ],
    retenir: "UPDATE avec CASE : toujours un ELSE (sinon NULL)."
  },
  {
    id: "m09-q22", dialecte: "Standard",
    q: "UPDATE article SET prix = prix * CASE famille WHEN 'POMPE' THEN 1.05 END; (sans ELSE). Que deviennent les prix des autres familles ?",
    choix: ["Ils ne changent pas", "Ils deviennent NULL", "Erreur", "Ils sont multipliés par 1"],
    bonne: 1,
    pourquoi: [
      "Non. Toutes les lignes sont mises à jour (pas de WHERE).",
      "Oui. CASE sans ELSE = NULL ; prix * NULL = NULL. Catastrophe silencieuse.",
      "Non.",
      "Non."
    ],
    retenir: "UPDATE + CASE sans ELSE = données effacées."
  },
  {
    id: "m09-q23", dialecte: "SQL Server",
    q: "Comment savoir combien de lignes ton UPDATE vient de modifier ?",
    choixCode: true,
    choix: ["@@ROWCOUNT, juste après l'UPDATE", "COUNT(*)", "@@IDENTITY", "@@ERROR"],
    bonne: 0,
    pourquoi: [
      "Oui. Attention : il est remis à zéro par l'instruction suivante. Lis-le tout de suite.",
      "Non.",
      "Non.",
      "Non. Le code d'erreur."
    ],
    retenir: "@@ROWCOUNT : à lire immédiatement après l'instruction."
  },
  {
    id: "m09-q24", dialecte: "Standard",
    q: "Un UPDATE ne trouve aucune ligne (WHERE id = 999 qui n'existe pas). Que se passe-t-il ?",
    choix: ["Erreur", "Rien : 0 ligne modifiée, sans erreur", "Une ligne est créée", "Toute la table est modifiée"],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Vérifie @@ROWCOUNT si tu t'attends à exactement 1 ligne.",
      "Non. Ce serait un « upsert » (MERGE).",
      "Non."
    ],
    retenir: "0 ligne modifiée n'est pas une erreur : contrôle-le toi-même."
  },
  {
    id: "m09-q25", dialecte: "SQL Server",
    q: "Comment mettre à jour une très grosse table par lots de 10 000 lignes ?",
    choixCode: true,
    choix: [
      "UPDATE t SET … (une seule fois)",
      "Une boucle : UPDATE TOP (10000) t SET statut = 'X' WHERE statut <> 'X'; jusqu'à @@ROWCOUNT = 0",
      "UPDATE t SET … LIMIT 10000",
      "Impossible"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Possible, mais verrous longs et journal énorme.",
      "Oui. Le WHERE exclut ce qui est déjà fait. Petites transactions, moins de blocages.",
      "Non. LIMIT n'existe pas sur SQL Server.",
      "Non."
    ],
    retenir: "Grosses mises à jour : par lots, avec un WHERE qui avance."
  },
  {
    id: "m09-q26", dialecte: "Standard",
    q: "Tu veux mettre à jour la ville seulement si elle change vraiment (pour ne pas déclencher d'écritures inutiles). Quel WHERE ?",
    choixCode: true,
    choix: [
      "WHERE c.ville <> s.ville",
      "WHERE c.ville <> s.ville OR (c.ville IS NULL AND s.ville IS NOT NULL) OR (c.ville IS NOT NULL AND s.ville IS NULL)",
      "WHERE c.ville = s.ville",
      "Pas de WHERE"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Un passage de NULL à « Lyon » ne serait pas détecté.",
      "Oui. Ou plus court : WHERE c.ville IS DISTINCT FROM s.ville (Snowflake, SQL Server 2022).",
      "Non.",
      "Non. Toutes les lignes seraient réécrites."
    ],
    retenir: "Mettre à jour seulement si différent : attention aux NULL."
  },
  {
    id: "m09-q27", dialecte: "SQL Server",
    q: "Un UPDATE qui remet la même valeur (SET ville = ville) a-t-il un coût ?",
    choix: [
      "Aucun",
      "Oui : la ligne est écrite, journalisée, et les triggers se déclenchent quand même",
      "Il est refusé",
      "Il supprime la ligne"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. D'où l'intérêt de filtrer les lignes qui changent vraiment.",
      "Non.",
      "Non."
    ],
    retenir: "Ne réécris pas des valeurs identiques : filtre les vrais changements."
  },
  {
    id: "m09-q28", dialecte: "SQL Server",
    q: "Que permet OUTPUT deleted.prix, inserted.prix dans un UPDATE ?",
    choix: [
      "Rien",
      "Voir, pour chaque ligne modifiée, l'ancienne et la nouvelle valeur",
      "Annuler l'UPDATE",
      "Supprimer les lignes"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. deleted = avant, inserted = après. Idéal pour un journal des modifications.",
      "Non.",
      "Non."
    ],
    retenir: "OUTPUT deleted.* / inserted.* = avant / après."
  },
  {
    id: "m09-q29", dialecte: "SQL Server",
    q: "Comment garder une trace des modifications de prix dans une table journal_prix ?",
    choixCode: true,
    choix: [
      "UPDATE article SET prix = … OUTPUT deleted.id, deleted.prix, inserted.prix, SYSDATETIME() INTO journal_prix (article_id, ancien, nouveau, le) WHERE …",
      "UPDATE article … ; puis deviner les anciennes valeurs",
      "SELECT INTO journal_prix",
      "Impossible sans trigger"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. OUTPUT … INTO écrit le journal dans la même instruction.",
      "Non. Les anciennes valeurs sont perdues.",
      "Non.",
      "Non. OUTPUT INTO suffit."
    ],
    retenir: "Journaliser un UPDATE : OUTPUT … INTO table_journal."
  },
  {
    id: "m09-q30", dialecte: "Standard",
    q: "Que fait DELETE FROM commande; (sans WHERE) ?",
    choix: ["Supprime la table", "Supprime TOUTES les lignes (la table reste, vide)", "Erreur", "Supprime la 1re ligne"],
    bonne: 1,
    pourquoi: [
      "Non. Ce serait DROP TABLE.",
      "Oui. La structure reste. Erreur aussi grave qu'un UPDATE sans WHERE.",
      "Non.",
      "Non."
    ],
    retenir: "DELETE sans WHERE = table vidée."
  },
  {
    id: "m09-q31", dialecte: "SQL Server",
    q: "Comment supprimer les lignes de commande des commandes annulées, sur SQL Server ?",
    choixCode: true,
    choix: [
      "DELETE l FROM ligne_cde l JOIN commande c ON c.id = l.cde_id WHERE c.statut = 'ANNULEE'",
      "DELETE FROM ligne_cde JOIN commande …",
      "DELETE ligne_cde, commande WHERE …",
      "Impossible avec une jointure"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. DELETE alias FROM … JOIN … : on supprime dans la table de l'alias.",
      "Non. Syntaxe incomplète.",
      "Non.",
      "Non."
    ],
    retenir: "SQL Server : DELETE alias FROM t alias JOIN …"
  },
  {
    id: "m09-q32", dialecte: "Snowflake",
    q: "Sur Snowflake, comment supprimer les lignes de commande des commandes annulées (jointure avec commande) ?",
    choixCode: true,
    choix: [
      "DELETE FROM ligne_cde l USING commande c WHERE c.id = l.cde_id AND c.statut = 'ANNULEE'",
      "DELETE l FROM ligne_cde l JOIN commande c …",
      "DELETE JOIN …",
      "Impossible"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Snowflake : DELETE FROM cible USING source WHERE …",
      "Non. Syntaxe SQL Server.",
      "Non.",
      "Non."
    ],
    retenir: "Snowflake : DELETE … USING …"
  },
  {
    id: "m09-q33", dialecte: "SQL Server",
    q: "DELETE FROM client WHERE id = 42 échoue : « conflit avec la contrainte REFERENCE ». Pourquoi ?",
    choix: [
      "Le client n'existe pas",
      "Des commandes pointent vers ce client (clé étrangère) : on ne peut pas le supprimer tant qu'elles existent",
      "La table est verrouillée",
      "Il faut TRUNCATE"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Ce ne serait pas une erreur.",
      "Oui. La clé étrangère protège l'intégrité. Supprime d'abord les enfants, ou désactive le client (actif = 0).",
      "Non.",
      "Non. TRUNCATE est aussi refusé."
    ],
    retenir: "Clé étrangère = on ne supprime pas un parent qui a des enfants."
  },
  {
    id: "m09-q34", dialecte: "SQL Server",
    q: "Que fait ON DELETE CASCADE sur la clé étrangère commande → client ?",
    choix: [
      "Empêche toute suppression",
      "Supprimer un client supprime automatiquement toutes ses commandes",
      "Met client_id à NULL",
      "Rien"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Pratique… et dangereux : une suppression peut effacer beaucoup de données sans prévenir.",
      "Non. Ce serait ON DELETE SET NULL.",
      "Non."
    ],
    retenir: "ON DELETE CASCADE : suppression en chaîne. À utiliser avec prudence."
  },
  {
    id: "m09-q35", dialecte: "Standard",
    q: "En gestion (ERP), pourquoi préfère-t-on souvent « désactiver » un client (actif = 0) plutôt que le supprimer ?",
    choix: [
      "C'est plus rapide",
      "On garde l'historique (factures, commandes) et on peut revenir en arrière",
      "DELETE est interdit",
      "Pour économiser de la place"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. C'est la « suppression logique ». Les requêtes filtrent ensuite sur actif = 1.",
      "Non.",
      "Non. Ça en prend plus."
    ],
    retenir: "Suppression logique (actif = 0) : historique préservé."
  },
  {
    id: "m09-q36", dialecte: "SQL Server",
    q: "Quelle différence entre DELETE FROM t et TRUNCATE TABLE t ?",
    choix: [
      "Aucune",
      "TRUNCATE vide tout très vite (pas de WHERE), remet l'IDENTITY à zéro et ne déclenche pas les triggers DELETE",
      "TRUNCATE supprime la table",
      "DELETE est plus rapide"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. DELETE supprime ligne par ligne (journalisé, triggers, WHERE possible).",
      "Non. C'est DROP.",
      "Non."
    ],
    retenir: "DELETE = lignes choisies. TRUNCATE = tout, vite, compteur remis à zéro."
  },
  {
    id: "m09-q37", dialecte: "SQL Server",
    q: "Un TRUNCATE TABLE dans une transaction peut-il être annulé par ROLLBACK sur SQL Server ?",
    choix: ["Non, jamais", "Oui", "Seulement avec NOLOCK", "Seulement sans IDENTITY"],
    bonne: 1,
    pourquoi: [
      "Non. Idée reçue fréquente.",
      "Oui. Sur SQL Server, TRUNCATE est transactionnel : BEGIN TRAN; TRUNCATE …; ROLLBACK; et les données reviennent.",
      "Non.",
      "Non."
    ],
    retenir: "SQL Server : TRUNCATE peut être annulé dans une transaction."
  },
  {
    id: "m09-q38", dialecte: "SQL Server",
    q: "TRUNCATE TABLE client échoue alors que des commandes référencent client. Et si commande est vide ?",
    choix: [
      "Alors ça marche",
      "Toujours refusé : une table référencée par une clé étrangère ne peut pas être vidée par TRUNCATE",
      "Ça supprime aussi commande",
      "Ça désactive la clé"
    ],
    bonne: 1,
    pourquoi: [
      "Non. SQL Server ne regarde pas si la table enfant est vide.",
      "Oui. Utilise DELETE, ou supprime temporairement la clé étrangère.",
      "Non.",
      "Non."
    ],
    retenir: "TRUNCATE interdit sur une table référencée par une FK."
  },
  {
    id: "m09-q39", dialecte: "Standard",
    q: "DROP TABLE, TRUNCATE TABLE, DELETE FROM : lequel supprime aussi la STRUCTURE de la table ?",
    choix: ["DELETE", "TRUNCATE", "DROP TABLE", "Aucun"],
    bonne: 2,
    pourquoi: [
      "Non. Les lignes seulement.",
      "Non. Les lignes seulement.",
      "Oui. La table disparaît complètement : colonnes, index, droits.",
      "Non."
    ],
    retenir: "DELETE / TRUNCATE = vider. DROP = détruire."
  },
  {
    id: "m09-q40", dialecte: "SQL Server",
    q: "Comment déplacer (copier puis supprimer) les vieux logs vers une table d'archive en une seule instruction ?",
    choixCode: true,
    choix: [
      "DELETE FROM log_edi OUTPUT deleted.* INTO log_edi_archive WHERE date_log < '20250101'",
      "MOVE log_edi TO archive",
      "INSERT … ; DELETE … sans transaction",
      "Impossible"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Les lignes supprimées sont écrites dans l'archive, dans la même opération (tout ou rien).",
      "Non.",
      "Non. Possible, mais deux étapes sans protection : risque de perte ou de doublon.",
      "Non."
    ],
    retenir: "Archiver : DELETE … OUTPUT deleted.* INTO archive."
  },
  {
    id: "m09-q41", dialecte: "Standard",
    q: "Que fait une instruction MERGE ?",
    choix: [
      "Fusionne deux tables en une seule table permanente",
      "Compare une source à une cible, puis met à jour, insère ou supprime selon les correspondances",
      "Fait un UNION",
      "Trie deux tables"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Un « upsert » en une instruction.",
      "Non.",
      "Non."
    ],
    retenir: "MERGE = synchroniser une cible avec une source."
  },
  {
    id: "m09-q42", dialecte: "SQL Server",
    q: "Dans un MERGE, que signifie WHEN NOT MATCHED BY TARGET ?",
    choix: [
      "La ligne existe dans la cible mais pas dans la source",
      "La ligne existe dans la source mais pas dans la cible : on l'insère généralement",
      "La ligne existe des deux côtés",
      "Erreur"
    ],
    bonne: 1,
    pourquoi: [
      "Non. C'est NOT MATCHED BY SOURCE.",
      "Oui. Nouvelle ligne à créer.",
      "Non. C'est WHEN MATCHED.",
      "Non."
    ],
    retenir: "NOT MATCHED BY TARGET = nouveau. MATCHED = existe. BY SOURCE = disparu."
  },
  {
    id: "m09-q43", dialecte: "SQL Server",
    q: "Un MERGE se termine sans point-virgule. Que se passe-t-il sur SQL Server ?",
    choix: ["Rien", "Erreur : MERGE doit se terminer par ;", "Il ne fait que les INSERT", "Il est ignoré"],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. C'est l'une des rares instructions où le ; est obligatoire.",
      "Non.",
      "Non."
    ],
    retenir: "MERGE … ; (point-virgule obligatoire)."
  },
  {
    id: "m09-q44", dialecte: "SQL Server",
    q: "Erreur MERGE : « attempted to UPDATE or DELETE the same row more than once ». Cause ?",
    choix: [
      "La cible a des doublons",
      "La source contient plusieurs lignes pour la même clé : une ligne cible correspond à plusieurs lignes source",
      "Il manque un WHEN",
      "La table est verrouillée"
    ],
    bonne: 1,
    pourquoi: [
      "Non. C'est côté source.",
      "Oui. Dédoublonne la source (ROW_NUMBER = 1) avant le MERGE.",
      "Non.",
      "Non."
    ],
    retenir: "MERGE : source unique par clé, sinon erreur."
  },
  {
    id: "m09-q45", dialecte: "SQL Server",
    q: "Pourquoi ajouter AND (cible.prix <> src.prix OR …) dans WHEN MATCHED ?",
    choix: [
      "C'est obligatoire",
      "Pour ne mettre à jour que les lignes qui changent vraiment : moins d'écritures, journal plus utile",
      "Pour insérer",
      "Pour supprimer"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. WHEN MATCHED AND condition THEN UPDATE. (Attention aux NULL dans la condition.)",
      "Non.",
      "Non."
    ],
    retenir: "WHEN MATCHED AND (changement réel) THEN UPDATE."
  },
  {
    id: "m09-q46", dialecte: "SQL Server",
    q: "Danger de WHEN NOT MATCHED BY SOURCE THEN DELETE dans un MERGE ?",
    choix: [
      "Aucun",
      "Si la source est incomplète (fichier tronqué, filtre oublié), les lignes absentes de la cible sont supprimées",
      "Il supprime la source",
      "Il ne fait rien"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Un fichier vide = table cible vidée. Contrôle le volume de la source avant.",
      "Non.",
      "Non."
    ],
    retenir: "BY SOURCE DELETE : vérifie que la source est complète."
  },
  {
    id: "m09-q47", dialecte: "SQL Server",
    q: "Comment savoir, pour chaque ligne traitée par un MERGE, si elle a été insérée, mise à jour ou supprimée ?",
    choixCode: true,
    choix: ["@@ROWCOUNT", "OUTPUT $action, inserted.code, deleted.code", "MERGE_RESULT()", "Impossible"],
    bonne: 1,
    pourquoi: [
      "Non. Seulement le total.",
      "Oui. $action vaut 'INSERT', 'UPDATE' ou 'DELETE'.",
      "Non.",
      "Non."
    ],
    retenir: "MERGE + OUTPUT $action = détail des opérations."
  },
  {
    id: "m09-q48", dialecte: "SQL Server",
    q: "Deux sessions lancent en même temps un MERGE « insérer si absent » sur la même clé. Risque ?",
    choix: [
      "Aucun",
      "Les deux peuvent voir la ligne absente et tenter d'insérer : doublon ou violation de clé. On ajoute WITH (HOLDLOCK) sur la cible",
      "Le serveur s'arrête",
      "MERGE refuse"
    ],
    bonne: 1,
    pourquoi: [
      "Non. MERGE n'est pas protégé par défaut contre la concurrence.",
      "Oui. HOLDLOCK (niveau SERIALIZABLE sur la cible) évite ce cas.",
      "Non.",
      "Non."
    ],
    retenir: "Upsert concurrent : MERGE … WITH (HOLDLOCK)."
  },
  {
    id: "m09-q49", dialecte: "Snowflake",
    q: "Sur Snowflake, quelle clause MERGE n'existe PAS ?",
    choixCode: true,
    choix: [
      "WHEN MATCHED THEN UPDATE",
      "WHEN NOT MATCHED THEN INSERT",
      "WHEN NOT MATCHED BY SOURCE THEN DELETE",
      "WHEN MATCHED THEN DELETE"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Elle existe.",
      "Non. Elle existe.",
      "Oui. Pour supprimer ce qui a disparu de la source : un DELETE séparé (NOT EXISTS).",
      "Non. Elle existe."
    ],
    retenir: "Snowflake MERGE : pas de BY SOURCE."
  },
  {
    id: "m09-q50", dialecte: "Snowflake",
    q: "Sur Snowflake, un MERGE dont la source contient deux lignes pour la même clé de cible…",
    choix: [
      "Prend la 1re ligne",
      "Échoue par défaut (MERGE non déterministe)",
      "Additionne les deux",
      "Insère deux lignes"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Paramètre ERROR_ON_NONDETERMINISTIC_MERGE = TRUE par défaut. Dédoublonne la source (QUALIFY).",
      "Non.",
      "Non."
    ],
    retenir: "MERGE Snowflake : source dédoublonnée, sinon erreur."
  },
  {
    id: "m09-q51", dialecte: "Snowflake",
    q: "Sur Snowflake, comment insérer en une seule instruction les commandes FR dans cde_fr et les autres dans cde_export ?",
    choixCode: true,
    choix: [
      "INSERT FIRST WHEN pays = 'FR' THEN INTO cde_fr ELSE INTO cde_export SELECT * FROM stg_cde",
      "Deux INSERT obligatoires",
      "INSERT INTO cde_fr, cde_export SELECT …",
      "MERGE INTO cde_fr, cde_export"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Insertion multi-tables : la source n'est lue qu'une fois. (INSERT ALL insère dans toutes les tables dont la condition est vraie.)",
      "Non. Possible, mais pas obligatoire sur Snowflake.",
      "Non.",
      "Non."
    ],
    retenir: "Snowflake : INSERT ALL / INSERT FIRST = plusieurs tables, une lecture."
  },
  {
    id: "m09-q52", dialecte: "Snowflake",
    q: "Sur Snowflake, que fait INSERT OVERWRITE INTO t SELECT … ?",
    choix: [
      "Ajoute les lignes",
      "Vide la table, puis insère le résultat, en une seule opération",
      "Met à jour les lignes existantes",
      "Erreur"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Ce serait INSERT INTO.",
      "Oui. Pratique pour recharger complètement une table.",
      "Non.",
      "Non."
    ],
    retenir: "INSERT OVERWRITE = remplacer tout le contenu."
  },
  {
    id: "m09-q53", dialecte: "Snowflake",
    q: "Tu dois charger chaque nuit un fichier CSV de 2 millions de lignes dans Snowflake. Quelle méthode ?",
    choix: [
      "2 millions d'INSERT … VALUES",
      "Déposer le fichier dans un stage, puis COPY INTO",
      "Un curseur",
      "MERGE ligne par ligne"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Extrêmement lent.",
      "Oui. COPY INTO charge en masse, en parallèle, et se souvient des fichiers déjà chargés.",
      "Non.",
      "Non."
    ],
    retenir: "Snowflake : fichiers → stage → COPY INTO."
  },
  {
    id: "m09-q54", dialecte: "Snowflake",
    q: "Une appli insère des lignes une par une dans Snowflake, des milliers de fois par heure. Problème ?",
    choix: [
      "Aucun",
      "Snowflake est fait pour les traitements en masse : chaque petit INSERT a un coût fixe. Regroupe les lignes en lots",
      "Snowflake refuse",
      "Les lignes sont perdues"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Lots, fichiers + COPY, ou Snowpipe pour le flux continu.",
      "Non.",
      "Non."
    ],
    retenir: "Snowflake : écrire en lots, pas ligne par ligne."
  },
  {
    id: "m09-q55", dialecte: "Snowflake",
    q: "Sur Snowflake, pourquoi un UPDATE qui touche 1 ligne par micro-partition, sur toute une grosse table, est-il coûteux ?",
    choix: [
      "Il ne l'est pas",
      "Les micro-partitions ne sont pas modifiables : chaque partition touchée est réécrite entièrement",
      "Snowflake verrouille la base",
      "À cause des index"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Parfois, recréer la table (CREATE TABLE … AS SELECT) est plus efficace qu'un gros UPDATE.",
      "Non.",
      "Non. Pas d'index sur Snowflake."
    ],
    retenir: "Snowflake : UPDATE = réécriture de micro-partitions."
  },
  {
    id: "m09-q56", dialecte: "Snowflake",
    q: "Sur Snowflake, un UPDATE raté a modifié toute la table il y a 10 minutes. Comment récupérer les données d'avant ?",
    choixCode: true,
    choix: [
      "Impossible",
      "CREATE TABLE commande_avant CLONE commande AT (OFFSET => -60*15); puis comparer ou restaurer",
      "ROLLBACK après le COMMIT",
      "UNDO UPDATE"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Time Travel est fait pour ça.",
      "Oui. On clone la table telle qu'elle était il y a 15 minutes. (BEFORE (STATEMENT => 'id_requête') est encore plus précis.)",
      "Non. Après COMMIT, ROLLBACK ne peut plus rien.",
      "Non."
    ],
    retenir: "Snowflake : erreur de manipulation → Time Travel."
  },
  {
    id: "m09-q57", dialecte: "Snowflake",
    q: "Avant une grosse correction de données sur Snowflake, quel réflexe de sécurité, instantané et sans coût de stockage au départ ?",
    choixCode: true,
    choix: [
      "CREATE TABLE client_sauv CLONE client;",
      "Exporter en CSV",
      "Copier ligne par ligne",
      "Rien"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Le clone partage les données : instantané. Seules les différences futures prennent de la place.",
      "Non. Long et manuel.",
      "Non.",
      "Non."
    ],
    retenir: "Snowflake : CLONE avant une opération risquée."
  },
  {
    id: "m09-q58", dialecte: "Snowflake",
    q: "Sur Snowflake, sans BEGIN, un UPDATE est-il validé tout de suite ?",
    choix: ["Non, il faut COMMIT", "Oui : par défaut, chaque instruction est validée automatiquement (autocommit)", "Seulement le soir", "Seulement en lecture"],
    bonne: 1,
    pourquoi: [
      "Non. Seulement si tu as ouvert une transaction avec BEGIN.",
      "Oui. Comme sur SQL Server par défaut. Pour pouvoir annuler : BEGIN … COMMIT / ROLLBACK.",
      "Non.",
      "Non."
    ],
    retenir: "Autocommit par défaut : chaque instruction est définitive."
  },
  {
    id: "m09-q59", dialecte: "SQL Server",
    q: "Quel enchaînement permet de tester un UPDATE en production sans risque ?",
    choixCode: true,
    choix: [
      "UPDATE …; SELECT …;",
      "BEGIN TRAN; UPDATE …; SELECT … (vérification); ROLLBACK;",
      "SELECT …; UPDATE …;",
      "UPDATE … WITH (NOLOCK);"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Déjà validé.",
      "Oui. Tu vois le résultat, puis tu annules. Quand c'est bon : même chose avec COMMIT. Attention : les lignes sont verrouillées pendant le test.",
      "Non.",
      "Non."
    ],
    retenir: "Tester une modification : BEGIN TRAN … ROLLBACK."
  },
  {
    id: "m09-q60", dialecte: "SQL Server",
    q: "Une transaction contient 3 instructions. La 2e échoue. Sans XACT_ABORT ni TRY/CATCH, que se passe-t-il souvent ?",
    choix: [
      "Tout est annulé",
      "La 2e échoue mais la 1re et la 3e peuvent s'exécuter, puis être validées : données incohérentes",
      "Rien n'est exécuté",
      "Le serveur s'arrête"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Pas automatiquement pour beaucoup d'erreurs.",
      "Oui. Mets SET XACT_ABORT ON en tête : la moindre erreur annule toute la transaction.",
      "Non.",
      "Non."
    ],
    retenir: "Modifications en plusieurs étapes : SET XACT_ABORT ON."
  },
  {
    id: "m09-q61", dialecte: "SQL Server",
    q: "Tu as lancé BEGIN TRAN; UPDATE … et tu pars déjeuner sans COMMIT. Conséquence ?",
    choix: [
      "Aucune",
      "Les lignes modifiées restent verrouillées : les autres utilisateurs (ERP, rapports) sont bloqués",
      "La transaction se valide toute seule",
      "La transaction s'annule après 1 minute"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Cause fréquente de blocages. Vérifie SELECT @@TRANCOUNT avant de partir.",
      "Non.",
      "Non."
    ],
    retenir: "Jamais de transaction ouverte sans surveillance."
  },
  {
    id: "m09-q62", dialecte: "SQL Server",
    q: "Un DELETE de 500 000 lignes bloque toute la table pour les autres utilisateurs. Pourquoi ?",
    choix: [
      "Bug",
      "Au-delà d'environ 5 000 verrous, SQL Server remplace les verrous de lignes par un verrou sur toute la table (escalade)",
      "DELETE verrouille toujours la base",
      "À cause des NULL"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Supprimer par lots de quelques milliers de lignes évite l'escalade.",
      "Non.",
      "Non."
    ],
    retenir: "Gros DELETE / UPDATE : par lots, pour éviter le verrou de table."
  },
  {
    id: "m09-q63", dialecte: "SQL Server",
    q: "Un trigger contient SELECT @id = id FROM inserted; puis traite @id. Un INSERT de 50 lignes arrive. Problème ?",
    choix: [
      "Aucun",
      "Le trigger est appelé UNE fois pour les 50 lignes : il n'en traite qu'une",
      "Le trigger est appelé 50 fois",
      "Erreur"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Bug classique. Un trigger doit traiter inserted comme une table (INSERT … SELECT FROM inserted).",
      "Non. Une fois par instruction, pas par ligne.",
      "Non. Pas d'erreur : c'est pour ça que c'est dangereux."
    ],
    retenir: "Trigger SQL Server : une fois par instruction, toutes les lignes dans inserted."
  },
  {
    id: "m09-q64", dialecte: "SQL Server",
    q: "Dans un trigger AFTER UPDATE, que contiennent les tables inserted et deleted ?",
    choix: [
      "inserted = nouvelles lignes ajoutées, deleted = lignes supprimées",
      "deleted = les lignes AVANT la modification, inserted = les lignes APRÈS",
      "Elles sont vides",
      "inserted = toute la table"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Dans un UPDATE, chaque ligne modifiée est dans les deux.",
      "Oui. On les joint sur la clé pour comparer avant / après.",
      "Non.",
      "Non."
    ],
    retenir: "UPDATE : deleted = avant, inserted = après."
  },
  {
    id: "m09-q65", dialecte: "SQL Server",
    q: "Tu fais un INSERT dans une vue qui joint client et commande. Que se passe-t-il ?",
    choix: [
      "Les deux tables sont remplies",
      "Erreur : la modification toucherait plusieurs tables de base",
      "Seule la 1re table est remplie",
      "La vue est recréée"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Une modification via une vue ne doit toucher qu'une table (sauf trigger INSTEAD OF).",
      "Non.",
      "Non."
    ],
    retenir: "Modifier via une vue : une seule table de base."
  },
  {
    id: "m09-q66", dialecte: "SQL Server",
    q: "La colonne montant_ttc est une colonne calculée (montant_ht * 1.2). Que donne un INSERT qui lui donne une valeur ?",
    choix: ["La valeur est stockée", "Erreur : on ne peut pas écrire dans une colonne calculée", "La valeur est ignorée", "Elle remplace la formule"],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Elle se calcule toute seule à partir des autres colonnes.",
      "Non. SQL Server refuse.",
      "Non."
    ],
    retenir: "Colonne calculée = jamais dans un INSERT / UPDATE."
  },
  {
    id: "m09-q67", dialecte: "SQL Server",
    q: "À quoi sert une colonne de type rowversion ?",
    choix: [
      "À stocker une date",
      "Elle change automatiquement à chaque modification de la ligne : on détecte les lignes modifiées",
      "À numéroter les lignes",
      "À chiffrer"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Ce n'est pas une date.",
      "Oui. Utile pour les chargements incrémentaux et pour détecter des modifications concurrentes.",
      "Non.",
      "Non."
    ],
    retenir: "rowversion = compteur auto de modification de ligne."
  },
  {
    id: "m09-q68", dialecte: "SQL Server",
    q: "Toutes les colonnes ont une valeur par défaut ou sont IDENTITY. Comment insérer une ligne ?",
    choixCode: true,
    choix: ["INSERT INTO t VALUES ()", "INSERT INTO t DEFAULT VALUES", "INSERT INTO t", "INSERT DEFAULT t"],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Une ligne avec toutes les valeurs par défaut.",
      "Non.",
      "Non."
    ],
    retenir: "INSERT INTO t DEFAULT VALUES."
  },
  {
    id: "m09-q69", dialecte: "SQL Server",
    q: "Un INSERT échoue : « Violation of PRIMARY KEY constraint ». Que s'est-il passé ?",
    choix: [
      "La table est pleine",
      "Une ligne avec la même clé primaire existe déjà (ou la source contient deux fois la même clé)",
      "Un champ est trop long",
      "Le type est faux"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Vérifie les doublons de la source et ce qui existe déjà dans la cible.",
      "Non.",
      "Non."
    ],
    retenir: "Violation de PK = clé déjà présente."
  },
  {
    id: "m09-q70", dialecte: "SQL Server",
    q: "Un index unique a l'option IGNORE_DUP_KEY = ON. Que se passe-t-il quand un INSERT contient des doublons de clé ?",
    choix: [
      "Erreur et rien n'est inséré",
      "Les doublons sont ignorés (simple avertissement) et le reste est inséré",
      "Les doublons écrasent les anciennes lignes",
      "La table est vidée"
    ],
    bonne: 1,
    pourquoi: [
      "Non. C'est le comportement sans l'option.",
      "Oui. Pratique… mais des données peuvent être perdues sans que personne ne le remarque.",
      "Non.",
      "Non."
    ],
    retenir: "IGNORE_DUP_KEY : doublons ignorés en silence. À utiliser en connaissance de cause."
  },
  {
    id: "m09-q71", dialecte: "SQL Server",
    q: "Comment mettre à jour le CA total de chaque client à partir de ses commandes ?",
    choixCode: true,
    choix: [
      "UPDATE c SET c.ca = x.ca FROM client c JOIN (SELECT client_id, SUM(montant) AS ca FROM commande GROUP BY client_id) x ON x.client_id = c.id",
      "UPDATE client SET ca = SUM(montant)",
      "UPDATE client c JOIN commande co SET c.ca = SUM(co.montant)",
      "UPDATE client SET ca = commande.montant"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. On agrège d'abord (une ligne par client), puis on joint. Les clients sans commande ne sont pas touchés.",
      "Non. Agrégat interdit directement dans SET.",
      "Non.",
      "Non."
    ],
    retenir: "UPDATE avec agrégat : sous-requête agrégée + jointure."
  },
  {
    id: "m09-q72", dialecte: "SQL Server",
    q: "Que penser de l'astuce UPDATE t SET @n = rang = @n + 1 pour numéroter des lignes ?",
    choix: [
      "C'est la méthode recommandée",
      "À éviter : l'ordre de traitement des lignes n'est pas garanti. Utilise ROW_NUMBER() dans une CTE",
      "C'est interdit",
      "C'est la seule méthode"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. C'est la « mise à jour bizarre » (quirky update) : non documentée, résultat imprévisible.",
      "Non. C'est permis, mais pas fiable.",
      "Non."
    ],
    retenir: "Numéroter : ROW_NUMBER, pas de variable dans un UPDATE."
  },
  {
    id: "m09-q73", dialecte: "SQL Server",
    q: "Que fait ON UPDATE CASCADE sur la clé étrangère commande.client_id → client.id ?",
    choix: [
      "Empêche de modifier client.id",
      "Si client.id change, les commandes sont mises à jour automatiquement avec la nouvelle valeur",
      "Supprime les commandes",
      "Rien"
    ],
    bonne: 1,
    pourquoi: [
      "Non. C'est le comportement par défaut (NO ACTION).",
      "Oui. Mais modifier une clé primaire est rarement une bonne idée : préfère une clé technique qui ne change jamais.",
      "Non.",
      "Non."
    ],
    retenir: "Une clé primaire ne devrait jamais changer."
  },
  {
    id: "m09-q74", dialecte: "Standard",
    q: "Quelle requête supprime les doublons en gardant la ligne de plus grand id ?",
    choixCode: true,
    choix: [
      "DELETE FROM t WHERE id <> MAX(id)",
      "DELETE a FROM t a WHERE EXISTS (SELECT 1 FROM t b WHERE b.cle = a.cle AND b.id > a.id)",
      "DELETE DISTINCT FROM t",
      "DELETE FROM t WHERE cle IN (SELECT cle FROM t)"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Agrégat dans WHERE.",
      "Oui. On supprime chaque ligne qui a un « frère » plus récent. Il reste le plus grand id par clé.",
      "Non.",
      "Non. Supprime tout."
    ],
    retenir: "Dédoublonner : supprimer s'il existe une ligne « meilleure » avec la même clé."
  },
  {
    id: "m09-q75", dialecte: "Standard",
    q: "Comment supprimer les lignes de commande orphelines (dont la commande n'existe plus) ?",
    choixCode: true,
    choix: [
      "DELETE FROM ligne_cde WHERE cde_id IS NULL",
      "DELETE FROM ligne_cde WHERE NOT EXISTS (SELECT 1 FROM commande c WHERE c.id = ligne_cde.cde_id)",
      "DELETE FROM commande WHERE …",
      "TRUNCATE ligne_cde"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Les orphelines ont un cde_id rempli, mais qui ne pointe sur rien.",
      "Oui. Fais d'abord un SELECT avec le même NOT EXISTS pour compter. (Une clé étrangère aurait empêché ça.)",
      "Non.",
      "Non."
    ],
    retenir: "Orphelins : NOT EXISTS vers le parent."
  },
  {
    id: "m09-q76", dialecte: "SQL Server",
    q: "Pourquoi ajouter WAITFOR DELAY '00:00:01' entre deux lots d'un gros DELETE en journée ?",
    choix: [
      "C'est obligatoire",
      "Pour laisser respirer le serveur : les autres requêtes peuvent passer entre deux lots",
      "Pour annuler",
      "Pour trier"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Moins d'impact sur les utilisateurs de l'ERP.",
      "Non.",
      "Non."
    ],
    retenir: "Purge en journée : petits lots + pauses."
  },
  {
    id: "m09-q77", dialecte: "SQL Server",
    q: "Supprimer des clients est lent car SQL Server vérifie les commandes liées. Que manque-t-il souvent ?",
    choix: [
      "Une vue",
      "Un index sur commande.client_id (la colonne de clé étrangère)",
      "Un trigger",
      "Une contrainte CHECK"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Pour chaque client supprimé, SQL Server cherche ses commandes. Sans index : lecture complète à chaque fois.",
      "Non.",
      "Non."
    ],
    retenir: "Index sur les colonnes de clé étrangère : aussi utile pour les DELETE du parent."
  },
  {
    id: "m09-q78", dialecte: "Standard",
    q: "Les clients supprimés logiquement (actif = 0) apparaissent dans un rapport. Quelle solution durable ?",
    choix: [
      "Les supprimer pour de vrai",
      "Une vue v_client_actif (WHERE actif = 1) utilisée par tous les rapports",
      "Ajouter DISTINCT",
      "Prévenir les utilisateurs"
    ],
    bonne: 1,
    pourquoi: [
      "Non. On perd l'historique.",
      "Oui. La règle est écrite une fois, au bon endroit.",
      "Non.",
      "Non."
    ],
    retenir: "Suppression logique : une vue qui filtre, pour ne jamais l'oublier."
  },
  {
    id: "m09-q79", dialecte: "Standard",
    q: "Sans MERGE, comment faire un « upsert » (mettre à jour si existe, sinon insérer) ?",
    choix: [
      "INSERT puis UPDATE",
      "UPDATE … FROM source (lignes existantes), puis INSERT … SELECT … WHERE NOT EXISTS (lignes nouvelles)",
      "DELETE puis INSERT de tout",
      "Impossible"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Les lignes tout juste insérées seraient ensuite mises à jour pour rien.",
      "Oui. Deux instructions simples, souvent plus lisibles qu'un MERGE. À mettre dans une transaction.",
      "Non. Possible, mais on perd les id, l'historique, et on déclenche les contraintes.",
      "Non."
    ],
    retenir: "Upsert simple : UPDATE existants, puis INSERT nouveaux."
  },
  {
    id: "m09-q80", dialecte: "Standard",
    q: "Dans un MERGE, la clé de la source est NULL pour certaines lignes. Que se passe-t-il ?",
    choix: [
      "Elles sont ignorées",
      "Elles ne correspondent jamais à la cible (NULL ≠ NULL) : elles sont insérées à chaque exécution, en doublon",
      "Erreur",
      "Elles mettent à jour toutes les lignes"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Filtre ou corrige les clés NULL avant le MERGE.",
      "Non.",
      "Non."
    ],
    retenir: "Clés NULL dans un MERGE = doublons à chaque passage."
  },
  {
    id: "m09-q81", dialecte: "Standard",
    q: "Un flux EDI arrive chaque nuit. Quel enchaînement est le plus sûr ?",
    choix: [
      "Insérer directement dans les tables de l'ERP",
      "Charger dans une table de chargement (stg), contrôler (formats, doublons, références), isoler les rejets, puis MERGE vers la cible",
      "Faire un DELETE de la cible puis tout réinsérer",
      "Insérer sans contrôle et corriger après"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Une ligne fausse va directement en production.",
      "Oui. La table de chargement sert de « sas » : rien n'entre sans être vérifié.",
      "Non.",
      "Non."
    ],
    retenir: "Intégration : stg → contrôles → rejets → cible."
  },
  {
    id: "m09-q82", dialecte: "Standard",
    q: "Pendant le contrôle d'un import, que faire des lignes invalides (date impossible, client inconnu) ?",
    choix: [
      "Les supprimer en silence",
      "Les copier dans une table de rejets avec la raison du rejet, et ne charger que les lignes valides",
      "Les charger quand même",
      "Arrêter tout le traitement à la 1re erreur, toujours"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Personne ne saura qu'il manque des données.",
      "Oui. Les rejets sont visibles, corrigeables et rejouables.",
      "Non.",
      "Non. Possible pour certains flux critiques, mais pas une règle générale."
    ],
    retenir: "Rejets : tracés, expliqués, rejouables."
  },
  {
    id: "m09-q83", dialecte: "Standard",
    q: "Comment éviter de charger deux fois le même fichier si le traitement est relancé ?",
    choix: [
      "Espérer que ça n'arrive pas",
      "Garder une table des fichiers déjà chargés (nom, date, nombre de lignes) et vérifier avant de charger",
      "Mettre DISTINCT",
      "Supprimer le fichier avant"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Le traitement devient « idempotent » : le relancer ne crée pas de doublon. (COPY INTO de Snowflake le fait tout seul.)",
      "Non.",
      "Non."
    ],
    retenir: "Chargement relançable : journal des fichiers traités."
  },
  {
    id: "m09-q84", dialecte: "SQL Server",
    q: "Quelle méthode SQL Server charge un gros fichier CSV le plus efficacement ?",
    choix: [
      "Un INSERT par ligne",
      "BULK INSERT (ou l'outil bcp, ou un flux ETL en mode « bulk »)",
      "Un curseur",
      "Copier-coller dans SSMS"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Chargement en masse, beaucoup plus rapide.",
      "Non.",
      "Non."
    ],
    retenir: "Fichiers volumineux : BULK INSERT / bcp."
  },
  {
    id: "m09-q85", dialecte: "Snowflake",
    q: "Sur Snowflake, après DELETE FROM t (tout supprimer), un COPY INTO du même fichier ne recharge rien. Pourquoi ?",
    choix: [
      "Bug",
      "COPY INTO se souvient des fichiers déjà chargés. DELETE n'efface pas cette mémoire ; TRUNCATE, si",
      "Le fichier est vide",
      "Il faut un warehouse plus grand"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Utilise TRUNCATE, ou l'option FORCE = TRUE de COPY INTO (avec prudence).",
      "Non.",
      "Non."
    ],
    retenir: "Snowflake : TRUNCATE efface aussi l'historique de chargement, DELETE non."
  },
  {
    id: "m09-q86", dialecte: "SQL Server",
    q: "Une procédure lit le stock, vérifie qu'il suffit, puis le décrémente. Deux sessions font ça en même temps. Risque, et solution ?",
    choix: [
      "Aucun risque",
      "Les deux lisent le même stock et décrémentent : stock négatif. Lire avec WITH (UPDLOCK) dans la transaction, ou faire UPDATE … WHERE qte >= @besoin",
      "SQL Server refuse la 2e",
      "Mettre NOLOCK"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. UPDLOCK réserve la ligne dès la lecture. L'UPDATE conditionnel fait la vérification et la modification en une seule étape.",
      "Non.",
      "Non. Pire."
    ],
    retenir: "Lire puis modifier : verrouiller à la lecture (UPDLOCK), ou tout faire dans l'UPDATE."
  },
  {
    id: "m09-q87", dialecte: "SQL Server",
    q: "Un écran modifie un client avec UPDATE … WHERE id = @id AND version = @version_lue. @@ROWCOUNT vaut 0. Que s'est-il passé ?",
    choix: [
      "Bug",
      "Quelqu'un d'autre a modifié le client entre la lecture et l'enregistrement : la version ne correspond plus",
      "Le client n'a pas de version",
      "La table est vide"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. C'est le « verrouillage optimiste » (souvent avec une colonne rowversion). On prévient l'utilisateur au lieu d'écraser.",
      "Non.",
      "Non."
    ],
    retenir: "Verrouillage optimiste : WHERE version = lue, puis contrôle de @@ROWCOUNT."
  },
  {
    id: "m09-q88", dialecte: "SQL Server",
    q: "Un UPDATE avec OUTPUT inserted.* (sans INTO) échoue sur une table qui a un trigger actif. Pourquoi ?",
    choix: [
      "OUTPUT est interdit",
      "SQL Server refuse OUTPUT sans INTO si la table a des triggers actifs : utilise OUTPUT … INTO une table",
      "Le trigger supprime les lignes",
      "Bug"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Avec INTO (vers une variable table ou #table), ça fonctionne.",
      "Non.",
      "Non. Règle documentée."
    ],
    retenir: "Table avec trigger : OUTPUT … INTO obligatoire."
  },
  {
    id: "m09-q89", dialecte: "SQL Server",
    q: "INSERT INTO t (…) SELECT … ORDER BY date_cde, sur une table avec IDENTITY. Qu'est-ce qui est garanti ?",
    choix: [
      "Rien",
      "Les valeurs IDENTITY sont attribuées dans l'ordre du ORDER BY",
      "Les lignes seront relues dans cet ordre",
      "Les lignes sont stockées physiquement dans cet ordre"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Seulement ça. La lecture, elle, aura toujours besoin d'un ORDER BY.",
      "Non.",
      "Non."
    ],
    retenir: "INSERT … ORDER BY : ordre des IDENTITY garanti, pas l'ordre de lecture."
  },
  {
    id: "m09-q90", dialecte: "SQL Server",
    q: "À quoi sert un objet SEQUENCE (NEXT VALUE FOR seq_facture) par rapport à IDENTITY ?",
    choix: [
      "À rien",
      "Un compteur indépendant d'une table : on peut obtenir le numéro AVANT d'insérer, et le partager entre plusieurs tables",
      "Il garantit l'absence de trous",
      "Il trie les lignes"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Pratique pour des numéros partagés (ex. pièces de plusieurs types). Snowflake a aussi des SEQUENCE.",
      "Non. Des trous restent possibles.",
      "Non."
    ],
    retenir: "SEQUENCE = compteur autonome, réutilisable."
  },
  {
    id: "m09-q91", dialecte: "SQL Server",
    q: "Les id IDENTITY de la table facture passent de 1 041 à 2 042. Est-ce une anomalie ?",
    choix: [
      "Oui, des factures ont été supprimées",
      "Pas forcément : un redémarrage du serveur ou des transactions annulées créent des trous. Normal pour IDENTITY",
      "Oui, la table est corrompue",
      "Oui, il faut réinitialiser"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Pas forcément.",
      "Oui. Ne jamais utiliser IDENTITY pour une numérotation légale sans trou (factures) : il faut un mécanisme dédié.",
      "Non.",
      "Non."
    ],
    retenir: "IDENTITY peut avoir des trous. Numérotation légale : autre mécanisme."
  },
  {
    id: "m09-q92", dialecte: "Standard",
    q: "Tu dois corriger des données en production. Quelle pratique est la bonne ?",
    choix: [
      "Modifier directement dans SSMS en éditant les cellules",
      "Un script écrit, relu, testé sur une copie, lié à un ticket, avec un plan de retour arrière",
      "Demander à l'utilisateur de ressaisir",
      "Modifier puis prévenir"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Aucune trace, aucun contrôle.",
      "Oui. Traçabilité et sécurité : indispensable pour un futur chef de projet SI.",
      "Non.",
      "Non."
    ],
    retenir: "Correction en production = script + ticket + test + retour arrière."
  },
  {
    id: "m09-q93", dialecte: "SQL Server",
    q: "Avant un UPDATE massif sur SQL Server, quel filet de sécurité simple ?",
    choixCode: true,
    choix: [
      "SELECT * INTO article_sauv_20261026 FROM article; (ou seulement les lignes concernées)",
      "Rien",
      "BEGIN TRAN sans fin",
      "NOLOCK"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Une copie datée pour pouvoir comparer ou restaurer. À supprimer une fois la correction validée.",
      "Non.",
      "Non. Bloque tout le monde.",
      "Non."
    ],
    retenir: "Copie de sauvegarde datée avant une correction massive."
  },
  {
    id: "m09-q94", dialecte: "Standard",
    q: "Tu veux vider la colonne commentaire. Quelle écriture est correcte ?",
    choixCode: true,
    choix: [
      "UPDATE t SET commentaire = 'NULL'",
      "UPDATE t SET commentaire = NULL",
      "UPDATE t SET commentaire IS NULL",
      "UPDATE t DELETE commentaire"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Ça écrit le texte « NULL » : 4 lettres !",
      "Oui. NULL sans apostrophes. (Pour un texte vide : '' , ce n'est pas la même chose.)",
      "Non. IS NULL sert à tester, pas à affecter.",
      "Non."
    ],
    retenir: "Affecter NULL : = NULL. Tester NULL : IS NULL."
  },
  {
    id: "m09-q95", dialecte: "SQL Server",
    q: "INSERT INTO t (d) VALUES ('01/02/2026') sur un serveur en anglais : quelle date est enregistrée ?",
    choix: ["1er février 2026", "2 janvier 2026", "Erreur", "Ça dépend de DATEFORMAT / la langue : ici probablement le 2 janvier"],
    bonne: 3,
    pourquoi: [
      "Non. Pas en anglais (format mm/jj).",
      "Non. Presque : mais la vraie réponse est que ça dépend des réglages.",
      "Non. La date est valide dans les deux formats.",
      "Oui. Format ambigu ! Écris '20260201' (AAAAMMJJ) pour ne dépendre de rien."
    ],
    retenir: "Dates dans les INSERT : toujours 'AAAAMMJJ'."
  },
  {
    id: "m09-q96", dialecte: "Standard",
    q: "Une table de chargement est vidée puis rechargée chaque nuit. DELETE ou TRUNCATE ?",
    choix: ["DELETE", "TRUNCATE : plus rapide, moins de journal, compteurs remis à zéro", "DROP TABLE", "UPDATE"],
    bonne: 1,
    pourquoi: [
      "Non. Plus lent, sans avantage ici.",
      "Oui. Idéal pour les tables de chargement (sans clé étrangère entrante).",
      "Non. La structure, les droits et les index seraient perdus.",
      "Non."
    ],
    retenir: "Table de chargement : TRUNCATE avant rechargement."
  },
  {
    id: "m09-q97", dialecte: "SQL Server",
    q: "Comment mettre à jour un champ « date de dernière commande » sur chaque client, sans toucher aux clients sans commande ?",
    choixCode: true,
    choix: [
      "UPDATE client SET derniere_cde = (SELECT MAX(date_cde) FROM commande WHERE client_id = client.id)",
      "UPDATE c SET c.derniere_cde = x.d FROM client c JOIN (SELECT client_id, MAX(date_cde) AS d FROM commande GROUP BY client_id) x ON x.client_id = c.id",
      "UPDATE client SET derniere_cde = MAX(date_cde)",
      "UPDATE client SET derniere_cde = GETDATE()"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Les clients sans commande prennent NULL (leur ancienne valeur est écrasée).",
      "Oui. Le JOIN interne ne touche que les clients qui ont des commandes.",
      "Non.",
      "Non."
    ],
    retenir: "UPDATE … JOIN : seules les lignes jointes sont modifiées."
  },
  {
    id: "m09-q98", dialecte: "SQL Server",
    q: "Comment savoir combien de lignes ont été insérées, mises à jour et supprimées par un MERGE, pour le journal du traitement ?",
    choix: [
      "@@ROWCOUNT donne le détail",
      "OUTPUT $action INTO une table, puis COUNT par action",
      "Impossible",
      "Relancer le MERGE"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Seulement le total.",
      "Oui. Ex. 120 INSERT, 45 UPDATE, 3 DELETE : un vrai compte rendu de traitement.",
      "Non.",
      "Non."
    ],
    retenir: "Compte rendu d'un MERGE : OUTPUT $action."
  },
  {
    id: "m09-q99", dialecte: "Standard",
    q: "Une procédure de mise à jour doit pouvoir être relancée sans effet de bord. Comment s'appelle cette propriété ?",
    choix: ["Atomicité", "Idempotence", "Normalisation", "Cardinalité"],
    bonne: 1,
    pourquoi: [
      "Non. Atomicité = tout ou rien.",
      "Oui. Relancer = même résultat. Ex. INSERT … WHERE NOT EXISTS, MERGE, UPDATE vers une valeur cible.",
      "Non.",
      "Non."
    ],
    retenir: "Idempotent = relançable sans doublon ni dégât."
  },
  {
    id: "m09-q100", dialecte: "Standard",
    q: "Quelle liste résume les bons réflexes avant de modifier des données ?",
    choix: [
      "Aller vite",
      "Vérifier la base (DB_NAME), écrire le SELECT, compter, sauvegarder, transaction, contrôler @@ROWCOUNT, puis COMMIT",
      "Désactiver les contraintes",
      "Utiliser NOLOCK"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Ces réflexes évitent 99 % des catastrophes.",
      "Non.",
      "Non."
    ],
    retenir: "Base, SELECT, compte, sauvegarde, transaction, contrôle, COMMIT."
  }
];
