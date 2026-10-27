LEARNSQL.questions.m09 = [
  {
    id: "m09-q01", dialecte: "Standard",
    q: "Pourquoi écrire INSERT INTO client (code, nom, pays) VALUES (…) plutôt que INSERT INTO client VALUES (…) ?",
    choix: [
      "C'est plus rapide à exécuter",
      "L'INSERT résiste aux changements de la table",
      "C'est obligatoire sur SQL Server et Snowflake",
      "Pour que les lignes soient triées à l'insertion"
    ],
    bonne: 1,
    pourquoi: [
      "Non. La liste de colonnes ne change pas la vitesse.",
      "Oui. Si une colonne est ajoutée ou déplacée, l'INSERT sans liste casse ou remplit les mauvaises colonnes. Avec la liste, il reste juste.",
      "Non. C'est facultatif… mais indispensable en pratique.",
      "Non. Une table n'a pas d'ordre."
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
      "Non. Les lignes se séparent par des virgules, pas par AND.",
      "Non. Cette syntaxe n'existe pas.",
      "Non. Un seul VALUES peut contenir plusieurs lignes."
    ],
    retenir: "VALUES (…), (…), (…) : plusieurs lignes."
  },
  {
    id: "m09-q03", dialecte: "SQL Server",
    q: "Un INSERT … VALUES contient 5 000 lignes. Que se passe-t-il sur SQL Server ?",
    choix: [
      "Ça marche",
      "Erreur : 1 000 lignes maximum dans un VALUES",
      "Seules 1 000 lignes sont insérées",
      "Ça plante le serveur"
    ],
    bonne: 1,
    pourquoi: [
      "Non. SQL Server refuse au-delà de 1 000 lignes.",
      "Oui. Découpe en plusieurs INSERT, ou charge un fichier (BULK INSERT), ou passe par une table de chargement.",
      "Non. Rien n'est inséré.",
      "Non. C'est une simple erreur de syntaxe."
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
      "Non. UPDATE modifie des lignes existantes, il n'en ajoute pas.",
      "Non. Cette commande n'existe pas sur SQL Server."
    ],
    retenir: "Ajouter dans une table existante : INSERT INTO … SELECT."
  },
  {
    id: "m09-q05", dialecte: "Standard",
    q: "La colonne date_creation a DEFAULT GETDATE(). Tu ne la mets pas dans ton INSERT. Que vaut-elle ?",
    choix: [
      "NULL, car la colonne est absente",
      "La date et l'heure de l'insertion",
      "Une erreur : colonne manquante",
      "0, la valeur par défaut d'une date"
    ],
    bonne: 1,
    pourquoi: [
      "Non. La valeur par défaut s'applique.",
      "Oui. Colonne absente de l'INSERT = valeur DEFAULT.",
      "Non. Une colonne avec DEFAULT peut être omise.",
      "Non. C'est le DEFAULT de la colonne qui s'applique."
    ],
    retenir: "Colonne omise = DEFAULT (ou NULL s'il n'y en a pas)."
  },
  {
    id: "m09-q06", dialecte: "Standard",
    q: "La colonne nom est NOT NULL, sans valeur par défaut. Tu ne la mets pas dans l'INSERT. Que se passe-t-il ?",
    choix: [
      "Elle vaut '' (un texte vide)",
      "Erreur : NULL interdit dans nom",
      "Elle vaut NULL, malgré la contrainte",
      "La ligne est insérée sans nom"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Pas de valeur inventée.",
      "Oui. Impossible d'insérer NULL dans la colonne nom : la contrainte NOT NULL protège la donnée.",
      "Non. Interdit par NOT NULL.",
      "Non. Il y a une erreur."
    ],
    retenir: "NOT NULL sans DEFAULT = valeur obligatoire dans l'INSERT."
  },
  {
    id: "m09-q07", dialecte: "Standard",
    q: "Comment demander explicitement la valeur par défaut d'une colonne dans un VALUES ?",
    choixCode: true,
    choix: [
      "VALUES ('C1', NULL)",
      "VALUES ('C1', DEFAULT)",
      "VALUES ('C1', '')",
      "VALUES ('C1', AUTO)"
    ],
    bonne: 1,
    pourquoi: [
      "Non. NULL insère NULL, pas la valeur par défaut.",
      "Oui. Le mot-clé DEFAULT.",
      "Non. '' insère un texte vide.",
      "Non. AUTO n'est pas un mot-clé SQL."
    ],
    retenir: "DEFAULT dans VALUES = valeur par défaut. NULL = NULL."
  },
  {
    id: "m09-q08", dialecte: "SQL Server",
    q: "La table a une colonne id IDENTITY. Tu écris INSERT INTO client (id, code) VALUES (500, 'C9'). Que se passe-t-il ?",
    choix: [
      "La ligne est insérée avec l'id 500",
      "Erreur, sauf avec SET IDENTITY_INSERT ON",
      "L'id 500 est ignoré, un autre est donné",
      "Le compteur IDENTITY repart à 500"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Sans IDENTITY_INSERT, SQL Server refuse.",
      "Oui. On ne peut pas insérer une valeur explicite dans une colonne IDENTITY, sauf avec SET IDENTITY_INSERT client ON. Il sert aux reprises de données : à désactiver juste après.",
      "Non. SQL Server ne l'ignore pas en silence.",
      "Non. SQL Server refuse l'INSERT : le compteur ne bouge pas."
    ],
    retenir: "Forcer un id IDENTITY : SET IDENTITY_INSERT table ON (ponctuel)."
  },
  {
    id: "m09-q09", dialecte: "SQL Server",
    q: "Après un INSERT dans une table IDENTITY, quelle fonction donne l'id généré par TON instruction ?",
    choixCode: true,
    choix: [
      "@@IDENTITY",
      "SCOPE_IDENTITY()",
      "IDENT_CURRENT('client')",
      "MAX(id)"
    ],
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
      "SELECT SCOPE_IDENTITY() après l'INSERT",
      "OUTPUT inserted.id, inserted.num_cde INTO @ids",
      "OUTPUT deleted.id, deleted.num_cde INTO @ids",
      "SELECT TOP (200) id FROM commande ORDER BY id DESC"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Seulement le dernier id.",
      "Oui. OUTPUT renvoie toutes les lignes insérées, avec leurs id.",
      "Non. Dans un INSERT, deleted est vide : il faut inserted.",
      "Non. D'autres sessions peuvent insérer en même temps : ce ne sont pas forcément tes lignes."
    ],
    retenir: "Plusieurs id générés : OUTPUT inserted.id."
  },
  {
    id: "m09-q11", dialecte: "SQL Server",
    q: "Erreur : « String or binary data would be truncated ». Que veut dire ce message ?",
    choix: [
      "La table a atteint sa taille maximale",
      "Une valeur est trop longue pour sa colonne",
      "Il manque une colonne obligatoire",
      "Le type d'une colonne est faux"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Le message parle d'une valeur coupée.",
      "Oui. Ex. 60 caractères dans un VARCHAR(50). Depuis SQL Server 2019, le message peut indiquer la table, la colonne et la valeur.",
      "Non. Ce serait une erreur « cannot insert NULL ».",
      "Non. Le type va, c'est la longueur qui dépasse."
    ],
    retenir: "« would be truncated » = valeur trop longue pour la colonne."
  },
  {
    id: "m09-q12", dialecte: "Standard",
    q: "INSERT INTO t … SELECT … ORDER BY date_cde : les lignes seront-elles relues dans cet ordre plus tard ?",
    choix: [
      "Oui, toujours dans l'ordre d'insertion",
      "Non : seul un ORDER BY à la lecture",
      "Oui, si la table a un IDENTITY",
      "Oui, mais seulement sur Snowflake"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Une table n'a pas d'ordre de lecture garanti.",
      "Oui. Une table n'a pas d'ordre : seul un ORDER BY à la lecture garantit l'ordre. (L'ORDER BY de l'INSERT peut seulement influencer l'ordre d'attribution des IDENTITY.)",
      "Non. L'ordre de lecture n'est toujours pas garanti.",
      "Non. Même règle sur Snowflake."
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
      "Non. Cette syntaxe n'existe pas.",
      "Non. INSERT … EXEC fait exactement ça."
    ],
    retenir: "INSERT INTO … EXEC procédure."
  },
  {
    id: "m09-q14", dialecte: "Standard",
    q: "Que fait UPDATE article SET prix = prix * 1.05; (sans WHERE) ?",
    choix: [
      "Rien, il faut un WHERE pour agir",
      "+5 % sur TOUS les articles",
      "Erreur : WHERE est obligatoire",
      "+5 % sur le 1er article seulement"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Sans WHERE, toutes les lignes sont modifiées.",
      "Oui. Sans WHERE, toutes les lignes sont modifiées. Erreur classique et grave.",
      "Non. Aucune protection par défaut.",
      "Non. Toutes les lignes sont modifiées."
    ],
    retenir: "UPDATE sans WHERE = toute la table."
  },
  {
    id: "m09-q15", dialecte: "Standard",
    q: "Quelle est la bonne méthode avant un UPDATE en production ?",
    choix: [
      "Lancer l'UPDATE et vérifier après",
      "SELECT d'abord, puis UPDATE en transaction",
      "Ajouter NOLOCK pour ne bloquer personne",
      "Faire l'UPDATE deux fois pour être sûr"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Trop tard si le WHERE est faux.",
      "Oui. Écris d'abord un SELECT avec le même WHERE, vérifie les lignes et leur nombre, puis fais l'UPDATE dans une transaction : tu peux annuler (ROLLBACK).",
      "Non. NOLOCK sert à lire, et il ne protège pas l'UPDATE.",
      "Non. Deux fois = +10 % au lieu de +5 %."
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
      "Non. Il manque les valeurs, et ce n'est pas une syntaxe SQL Server.",
      "Non. Un seul SET peut changer plusieurs colonnes."
    ],
    retenir: "UPDATE … SET a = …, b = … WHERE …"
  },
  {
    id: "m09-q17", dialecte: "Standard",
    q: "a = 1 et b = 2. Après UPDATE t SET a = b, b = a, que valent a et b ?",
    choix: [
      "a = 2, b = 2",
      "a = 2, b = 1",
      "a = 1, b = 1",
      "Erreur"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Ce serait le cas en programmation ligne par ligne.",
      "Oui. Toutes les expressions du SET utilisent les valeurs d'AVANT la modification : l'échange fonctionne.",
      "Non. Les valeurs d'avant sont utilisées : a reçoit 2.",
      "Non. L'instruction est valide."
    ],
    retenir: "Dans un SET, tout est calculé avec les anciennes valeurs."
  },
  {
    id: "m09-q18", dialecte: "SQL Server",
    q: "Comment mettre à jour le prix des articles à partir d'une table de tarifs, sur SQL Server ?",
    choixCode: true,
    choix: [
      "UPDATE a SET a.prix = t.prix FROM dbo.article a JOIN stg.tarif t ON t.code = a.code",
      "UPDATE dbo.article a JOIN stg.tarif t ON t.code = a.code SET a.prix = t.prix",
      "UPDATE dbo.article SET prix = t.prix WHERE code = stg.tarif.code",
      "UPDATE t SET t.prix = a.prix FROM dbo.article a JOIN stg.tarif t ON t.code = a.code"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Syntaxe SQL Server : UPDATE alias SET … FROM … JOIN …",
      "Non. Syntaxe MySQL.",
      "Non. La table tarif n'est pas dans la requête : erreur.",
      "Non. On met à jour la table des tarifs, pas les articles."
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
      "Non. Cette syntaxe n'existe pas sur Snowflake.",
      "Non. UPDATE … FROM le permet."
    ],
    retenir: "Snowflake : UPDATE t SET … FROM s WHERE …"
  },
  {
    id: "m09-q20", dialecte: "SQL Server",
    q: "La table de tarifs contient 2 prix pour le même article. Que fait l'UPDATE … FROM … JOIN sur SQL Server ?",
    choix: [
      "Erreur : plusieurs prix pour un article",
      "Pas d'erreur, un des prix au hasard",
      "Il prend la moyenne des deux prix",
      "Il ignore l'article, sans le modifier"
    ],
    bonne: 1,
    pourquoi: [
      "Non. C'est le piège : aucun message.",
      "Oui. L'article prend l'un des deux prix : résultat imprévisible. Vérifie l'unicité de la source avant (GROUP BY … HAVING COUNT(*) > 1).",
      "Non. SQL Server ne calcule pas de moyenne : il prend un des deux.",
      "Non. L'article est bien modifié, avec un des deux prix."
    ],
    retenir: "UPDATE avec jointure : source unique par clé, sinon résultat au hasard."
  },
  {
    id: "m09-q21", dialecte: "Standard",
    q: "Comment appliquer des hausses différentes selon la famille, en un seul UPDATE ?",
    choixCode: true,
    choix: [
      "UPDATE article SET prix = prix * CASE famille WHEN 'POMPE' THEN 1.05 WHEN 'LINER' THEN 1.03 ELSE 1 END",
      "UPDATE article SET prix = prix * CASE famille WHEN 'POMPE' THEN 1.05 WHEN 'LINER' THEN 1.03 END",
      "UPDATE article SET prix = CASE famille WHEN 'POMPE' THEN 1.05 WHEN 'LINER' THEN 1.03 ELSE 1 END",
      "UPDATE article SET prix = prix * 1.05 WHERE famille = 'POMPE' OR famille = 'LINER'"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Un CASE dans le SET. Pense au ELSE 1 pour ne pas mettre les autres à NULL !",
      "Non. Sans ELSE, les autres familles passent à NULL.",
      "Non. On remplace le prix par le coefficient (1.05…), au lieu de le multiplier.",
      "Non. Les LINER prennent aussi +5 %."
    ],
    retenir: "UPDATE avec CASE : toujours un ELSE (sinon NULL)."
  },
  {
    id: "m09-q22", dialecte: "Standard",
    q: "UPDATE article SET prix = prix * CASE famille WHEN 'POMPE' THEN 1.05 END; (sans ELSE). Que deviennent les prix des autres familles ?",
    choix: [
      "Ils ne changent pas",
      "Ils deviennent NULL",
      "Erreur",
      "Ils sont multipliés par 1"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Toutes les lignes sont mises à jour (pas de WHERE).",
      "Oui. CASE sans ELSE = NULL ; prix * NULL = NULL. Catastrophe silencieuse.",
      "Non. La requête est valide : c'est ce qui la rend dangereuse.",
      "Non. Sans ELSE, CASE donne NULL, pas 1."
    ],
    retenir: "UPDATE + CASE sans ELSE = données effacées."
  },
  {
    id: "m09-q23", dialecte: "SQL Server",
    q: "Comment savoir combien de lignes ton UPDATE vient de modifier ?",
    choix: [
      "@@ROWCOUNT, juste après l'UPDATE",
      "@@ROWCOUNT, après un PRINT de contrôle",
      "@@IDENTITY, juste après l'UPDATE",
      "SELECT COUNT(*) FROM la table, ensuite"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Attention : il est remis à zéro par l'instruction suivante. Lis-le tout de suite.",
      "Non. Le PRINT remet @@ROWCOUNT à zéro : il faut le lire juste après l'UPDATE.",
      "Non. Dernier id généré, pas un nombre de lignes.",
      "Non. Compte toutes les lignes, pas celles modifiées."
    ],
    retenir: "@@ROWCOUNT : à lire immédiatement après l'instruction."
  },
  {
    id: "m09-q24", dialecte: "Standard",
    q: "Un UPDATE ne trouve aucune ligne (WHERE id = 999 qui n'existe pas). Que se passe-t-il ?",
    choix: [
      "Erreur",
      "Rien : 0 ligne modifiée, sans erreur",
      "Une ligne est créée",
      "Toute la table est modifiée"
    ],
    bonne: 1,
    pourquoi: [
      "Non. 0 ligne modifiée n'est pas une erreur.",
      "Oui. Vérifie @@ROWCOUNT si tu t'attends à exactement 1 ligne.",
      "Non. Ce serait un « upsert » (MERGE).",
      "Non. Le WHERE limite l'UPDATE : aucune ligne ne correspond."
    ],
    retenir: "0 ligne modifiée n'est pas une erreur : contrôle-le toi-même."
  },
  {
    id: "m09-q25", dialecte: "SQL Server",
    q: "Comment mettre à jour une très grosse table par lots de 10 000 lignes ?",
    choixCode: true,
    choix: [
      "UPDATE t SET statut = 'X' WHERE statut <> 'X' (une seule fois)",
      "Une boucle : UPDATE TOP (10000) t SET statut = 'X' WHERE statut <> 'X'; jusqu'à @@ROWCOUNT = 0",
      "Une boucle : UPDATE TOP (10000) t SET statut = 'X'; jusqu'à @@ROWCOUNT = 0",
      "Une boucle : UPDATE t SET statut = 'X' WHERE statut <> 'X' LIMIT 10000; jusqu'à @@ROWCOUNT = 0"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Possible, mais verrous longs et journal énorme.",
      "Oui. Le WHERE exclut ce qui est déjà fait. Petites transactions, moins de blocages.",
      "Non. Sans WHERE qui avance, on remet à jour les mêmes lignes sans fin : la boucle ne s'arrête jamais.",
      "Non. LIMIT n'existe pas sur SQL Server."
    ],
    retenir: "Grosses mises à jour : par lots, avec un WHERE qui avance."
  },
  {
    id: "m09-q26", dialecte: "Standard",
    q: "Tu veux mettre à jour la ville seulement si elle change vraiment (pour ne pas déclencher d'écritures inutiles). Quel WHERE ?",
    choixCode: true,
    choix: [
      "WHERE c.ville <> s.ville OR c.ville IS NULL OR s.ville IS NULL",
      "WHERE c.ville IS DISTINCT FROM s.ville",
      "WHERE c.ville <> s.ville AND c.ville IS NOT NULL AND s.ville IS NOT NULL",
      "WHERE ISNULL(c.ville, '') = ISNULL(s.ville, '')"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Deux NULL seraient « différents » : mise à jour inutile.",
      "Oui. IS DISTINCT FROM traite NULL comme une valeur (Snowflake, SQL Server 2022). Avant 2022 : c.ville <> s.ville OR (c.ville IS NULL AND s.ville IS NOT NULL) OR (c.ville IS NOT NULL AND s.ville IS NULL).",
      "Non. Un passage de NULL à « Lyon » ne serait pas détecté.",
      "Non. = : ce sont les lignes IDENTIQUES."
    ],
    retenir: "Mettre à jour seulement si différent : attention aux NULL."
  },
  {
    id: "m09-q27", dialecte: "SQL Server",
    q: "Un UPDATE qui remet la même valeur (SET ville = ville) a-t-il un coût ?",
    choix: [
      "Aucun : SQL Server ne fait rien du tout",
      "Oui : écriture, journal et triggers",
      "Il est refusé par SQL Server",
      "Il supprime puis recrée la ligne"
    ],
    bonne: 1,
    pourquoi: [
      "Non. La ligne est quand même écrite et journalisée.",
      "Oui. La ligne est écrite, journalisée, et les triggers se déclenchent quand même. D'où l'intérêt de filtrer les lignes qui changent vraiment.",
      "Non. SQL Server l'accepte.",
      "Non. La ligne est modifiée sur place."
    ],
    retenir: "Ne réécris pas des valeurs identiques : filtre les vrais changements."
  },
  {
    id: "m09-q28", dialecte: "SQL Server",
    q: "Que permet OUTPUT deleted.prix, inserted.prix dans un UPDATE ?",
    choix: [
      "Rien de plus qu'un UPDATE normal",
      "Voir l'ancienne et la nouvelle valeur",
      "Annuler l'UPDATE si les prix changent",
      "Supprimer les lignes puis les réinsérer"
    ],
    bonne: 1,
    pourquoi: [
      "Non. OUTPUT renvoie les valeurs avant et après.",
      "Oui. Pour chaque ligne modifiée : deleted = avant, inserted = après. Idéal pour un journal des modifications.",
      "Non. OUTPUT montre, il n'annule rien.",
      "Non. L'UPDATE modifie les lignes sur place."
    ],
    retenir: "OUTPUT deleted.* / inserted.* = avant / après."
  },
  {
    id: "m09-q29", dialecte: "SQL Server",
    q: "Comment garder une trace des modifications de prix dans une table journal_prix ?",
    choixCode: true,
    choix: [
      "UPDATE article SET prix = … OUTPUT deleted.id, deleted.prix, inserted.prix, SYSDATETIME() INTO journal_prix (article_id, ancien, nouveau, le) WHERE …",
      "UPDATE article SET prix = … OUTPUT inserted.id, inserted.prix, deleted.prix, SYSDATETIME() INTO journal_prix (article_id, ancien, nouveau, le) WHERE …",
      "UPDATE article SET prix = … WHERE … ; INSERT INTO journal_prix SELECT id, prix, prix, SYSDATETIME() FROM article",
      "Impossible sans écrire un trigger sur la table article"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. OUTPUT … INTO écrit le journal dans la même instruction.",
      "Non. Ancien et nouveau sont inversés : inserted = après, deleted = avant.",
      "Non. Après l'UPDATE, l'ancien prix est perdu : on journalise deux fois le nouveau.",
      "Non. OUTPUT INTO suffit."
    ],
    retenir: "Journaliser un UPDATE : OUTPUT … INTO table_journal."
  },
  {
    id: "m09-q30", dialecte: "Standard",
    q: "Que fait DELETE FROM commande; (sans WHERE) ?",
    choix: [
      "Supprime la table et ses données",
      "Vide la table, qui reste en place",
      "Erreur : WHERE est obligatoire",
      "Supprime seulement la 1re ligne"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Ce serait DROP TABLE.",
      "Oui. Toutes les lignes sont supprimées, la structure reste. Erreur aussi grave qu'un UPDATE sans WHERE.",
      "Non. Aucune protection par défaut.",
      "Non. Sans WHERE, toutes les lignes sont supprimées."
    ],
    retenir: "DELETE sans WHERE = table vidée."
  },
  {
    id: "m09-q31", dialecte: "SQL Server",
    q: "Comment supprimer les lignes de commande des commandes annulées, sur SQL Server ?",
    choixCode: true,
    choix: [
      "DELETE l FROM ligne_cde l JOIN commande c ON c.id = l.cde_id WHERE c.statut = 'ANNULEE'",
      "DELETE c FROM ligne_cde l JOIN commande c ON c.id = l.cde_id WHERE c.statut = 'ANNULEE'",
      "DELETE FROM ligne_cde JOIN commande c ON c.id = cde_id WHERE c.statut = 'ANNULEE'",
      "DELETE FROM ligne_cde WHERE cde_id = (SELECT id FROM commande WHERE statut = 'ANNULEE')"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. DELETE alias FROM … JOIN … : on supprime dans la table de l'alias.",
      "Non. Alias c : on supprime les COMMANDES, pas leurs lignes.",
      "Non. Syntaxe incomplète : il faut DELETE alias FROM … JOIN.",
      "Non. = avec une sous-requête de plusieurs lignes : erreur dès qu'il y a 2 commandes annulées."
    ],
    retenir: "SQL Server : DELETE alias FROM t alias JOIN …"
  },
  {
    id: "m09-q32", dialecte: "Snowflake",
    q: "Sur Snowflake, comment supprimer les lignes de commande des commandes annulées (jointure avec commande) ?",
    choixCode: true,
    choix: [
      "DELETE FROM ligne_cde l USING commande c WHERE c.id = l.cde_id AND c.statut = 'ANNULEE'",
      "DELETE l FROM ligne_cde l JOIN commande c ON c.id = l.cde_id WHERE c.statut = 'ANNULEE'",
      "DELETE FROM commande c USING ligne_cde l WHERE c.id = l.cde_id AND c.statut = 'ANNULEE'",
      "DELETE FROM ligne_cde l USING commande c WHERE c.statut = 'ANNULEE'"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Snowflake : DELETE FROM cible USING source WHERE …",
      "Non. Syntaxe SQL Server.",
      "Non. On supprime les commandes, pas leurs lignes.",
      "Non. Sans lien c.id = l.cde_id : TOUTES les lignes sont supprimées dès qu'une commande est annulée."
    ],
    retenir: "Snowflake : DELETE … USING …"
  },
  {
    id: "m09-q33", dialecte: "SQL Server",
    q: "DELETE FROM client WHERE id = 42 échoue : « conflit avec la contrainte REFERENCE ». Pourquoi ?",
    choix: [
      "Le client 42 n'existe pas dans la table",
      "Des commandes pointent vers ce client",
      "La table client est verrouillée",
      "Il faut TRUNCATE au lieu de DELETE"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Ce ne serait pas une erreur.",
      "Oui. La clé étrangère protège l'intégrité : on ne supprime pas un client qui a des commandes. Supprime d'abord les enfants, ou désactive le client (actif = 0).",
      "Non. Un verrou ferait attendre, pas cette erreur.",
      "Non. TRUNCATE est aussi refusé."
    ],
    retenir: "Clé étrangère = on ne supprime pas un parent qui a des enfants."
  },
  {
    id: "m09-q34", dialecte: "SQL Server",
    q: "Que fait ON DELETE CASCADE sur la clé étrangère commande → client ?",
    choix: [
      "Elle empêche toute suppression de client",
      "Les commandes du client sont supprimées aussi",
      "Elle met client_id à NULL dans commande",
      "Rien : c'est seulement de la documentation"
    ],
    bonne: 1,
    pourquoi: [
      "Non. C'est le comportement par défaut (NO ACTION).",
      "Oui. Supprimer un client supprime automatiquement toutes ses commandes. Pratique… et dangereux : une suppression peut effacer beaucoup de données sans prévenir.",
      "Non. Ce serait ON DELETE SET NULL.",
      "Non. CASCADE agit vraiment sur les données."
    ],
    retenir: "ON DELETE CASCADE : suppression en chaîne. À utiliser avec prudence."
  },
  {
    id: "m09-q35", dialecte: "Standard",
    q: "En gestion (ERP), pourquoi préfère-t-on souvent « désactiver » un client (actif = 0) plutôt que le supprimer ?",
    choix: [
      "C'est plus rapide qu'un DELETE",
      "On garde l'historique",
      "DELETE est interdit dans un ERP",
      "Pour économiser de la place disque"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Ce n'est pas une question de vitesse.",
      "Oui. On garde les factures et commandes liées, et on peut revenir en arrière : c'est la « suppression logique ». Les requêtes filtrent ensuite sur actif = 1.",
      "Non. DELETE est permis, mais on perd l'historique.",
      "Non. Ça en prend plus."
    ],
    retenir: "Suppression logique (actif = 0) : historique préservé."
  },
  {
    id: "m09-q36", dialecte: "SQL Server",
    q: "Quelle différence entre DELETE FROM t et TRUNCATE TABLE t ?",
    choix: [
      "Aucune, ce sont deux synonymes",
      "TRUNCATE vide tout, vite, sans WHERE",
      "TRUNCATE supprime la table entière",
      "DELETE est toujours le plus rapide"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Ils diffèrent : WHERE, triggers, IDENTITY, vitesse.",
      "Oui. TRUNCATE vide tout très vite (pas de WHERE), remet l'IDENTITY à zéro et ne déclenche pas les triggers DELETE. DELETE supprime ligne par ligne (journalisé, triggers, WHERE possible).",
      "Non. C'est DROP.",
      "Non. TRUNCATE est bien plus rapide pour tout vider."
    ],
    retenir: "DELETE = lignes choisies. TRUNCATE = tout, vite, compteur remis à zéro."
  },
  {
    id: "m09-q37", dialecte: "SQL Server",
    q: "Un TRUNCATE TABLE dans une transaction peut-il être annulé par ROLLBACK sur SQL Server ?",
    choix: [
      "Non, jamais",
      "Oui",
      "Seulement avec NOLOCK",
      "Seulement sans IDENTITY"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Idée reçue fréquente.",
      "Oui. Sur SQL Server, TRUNCATE est transactionnel : BEGIN TRAN; TRUNCATE …; ROLLBACK; et les données reviennent.",
      "Non. NOLOCK sert à lire, il ne change rien ici.",
      "Non. IDENTITY ne change pas le ROLLBACK."
    ],
    retenir: "SQL Server : TRUNCATE peut être annulé dans une transaction."
  },
  {
    id: "m09-q38", dialecte: "SQL Server",
    q: "TRUNCATE TABLE client échoue alors que des commandes référencent client. Et si commande est vide ?",
    choix: [
      "Alors ça marche, la table est vide",
      "Toujours refusé",
      "Ça supprime aussi la table commande",
      "Ça désactive la clé étrangère"
    ],
    bonne: 1,
    pourquoi: [
      "Non. SQL Server ne regarde pas si la table enfant est vide.",
      "Oui. Une table référencée par une clé étrangère ne peut pas être vidée par TRUNCATE, même si la table enfant est vide. Utilise DELETE, ou supprime temporairement la clé étrangère.",
      "Non. TRUNCATE ne touche que la table nommée.",
      "Non. TRUNCATE ne désactive rien : il est refusé."
    ],
    retenir: "TRUNCATE interdit sur une table référencée par une FK."
  },
  {
    id: "m09-q39", dialecte: "Standard",
    q: "DROP TABLE, TRUNCATE TABLE, DELETE FROM : lequel supprime aussi la STRUCTURE de la table ?",
    choix: [
      "DELETE",
      "TRUNCATE",
      "DROP TABLE",
      "Aucun"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Les lignes seulement.",
      "Non. Les lignes seulement.",
      "Oui. La table disparaît complètement : colonnes, index, droits.",
      "Non. DROP TABLE supprime aussi la structure."
    ],
    retenir: "DELETE / TRUNCATE = vider. DROP = détruire."
  },
  {
    id: "m09-q40", dialecte: "SQL Server",
    q: "Comment déplacer (copier puis supprimer) les vieux logs vers une table d'archive en une seule instruction ?",
    choixCode: true,
    choix: [
      "DELETE FROM log_edi OUTPUT deleted.* INTO log_edi_archive WHERE date_log < '20250101'",
      "DELETE FROM log_edi OUTPUT inserted.* INTO log_edi_archive WHERE date_log < '20250101'",
      "INSERT INTO log_edi_archive SELECT * FROM log_edi WHERE date_log < '20250101'",
      "DELETE FROM log_edi_archive OUTPUT deleted.* INTO log_edi WHERE date_log < '20250101'"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Les lignes supprimées sont écrites dans l'archive, dans la même opération (tout ou rien).",
      "Non. Dans un DELETE, il n'y a pas de inserted : il faut deleted.",
      "Non. Copie seulement : les logs restent dans log_edi.",
      "Non. Sens inversé : on vide l'archive vers la table."
    ],
    retenir: "Archiver : DELETE … OUTPUT deleted.* INTO archive."
  },
  {
    id: "m09-q41", dialecte: "Standard",
    q: "Que fait une instruction MERGE ?",
    choix: [
      "Fusionne deux tables en une seule table",
      "Synchronise une cible avec une source",
      "Fait un UNION des deux tables",
      "Trie deux tables dans le même ordre"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Les deux tables restent ; seule la cible change.",
      "Oui. Compare une source à une cible, puis met à jour, insère ou supprime selon les correspondances : un « upsert » en une instruction.",
      "Non. UNION empile un résultat, il ne modifie pas de table.",
      "Non. MERGE modifie des données, il ne trie rien."
    ],
    retenir: "MERGE = synchroniser une cible avec une source."
  },
  {
    id: "m09-q42", dialecte: "SQL Server",
    q: "Dans un MERGE, que signifie WHEN NOT MATCHED BY TARGET ?",
    choix: [
      "La ligne existe dans la cible, pas la source",
      "La ligne est dans la source, pas la cible",
      "La ligne existe des deux côtés",
      "La ligne n'existe d'aucun côté"
    ],
    bonne: 1,
    pourquoi: [
      "Non. C'est NOT MATCHED BY SOURCE.",
      "Oui. Nouvelle ligne : on l'insère généralement.",
      "Non. C'est WHEN MATCHED.",
      "Non. Une telle ligne n'est pas vue par le MERGE."
    ],
    retenir: "NOT MATCHED BY TARGET = nouveau. MATCHED = existe. BY SOURCE = disparu."
  },
  {
    id: "m09-q43", dialecte: "SQL Server",
    q: "Un MERGE se termine sans point-virgule. Que se passe-t-il sur SQL Server ?",
    choix: [
      "Rien",
      "Erreur : MERGE doit se terminer par ;",
      "Il ne fait que les INSERT",
      "Il est ignoré"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Sans ;, le MERGE est refusé.",
      "Oui. C'est l'une des rares instructions où le ; est obligatoire.",
      "Non. Le MERGE est refusé en entier.",
      "Non. C'est une erreur, pas un oubli silencieux."
    ],
    retenir: "MERGE … ; (point-virgule obligatoire)."
  },
  {
    id: "m09-q44", dialecte: "SQL Server",
    q: "Erreur MERGE : « attempted to UPDATE or DELETE the same row more than once ». Cause ?",
    choix: [
      "La cible contient des doublons sur la clé",
      "Plusieurs lignes source pour une même clé",
      "Il manque une clause WHEN NOT MATCHED",
      "La table cible est verrouillée"
    ],
    bonne: 1,
    pourquoi: [
      "Non. C'est côté source.",
      "Oui. Une ligne cible correspond à plusieurs lignes source. Dédoublonne la source (ROW_NUMBER = 1) avant le MERGE.",
      "Non. Une clause manquante ne crée pas cette erreur.",
      "Non. Un verrou ferait attendre, pas cette erreur."
    ],
    retenir: "MERGE : source unique par clé, sinon erreur."
  },
  {
    id: "m09-q45", dialecte: "SQL Server",
    q: "Pourquoi ajouter AND (cible.prix <> src.prix OR …) dans WHEN MATCHED ?",
    choix: [
      "C'est obligatoire dans un MERGE",
      "Mettre à jour seulement ce qui change",
      "Pour insérer les lignes absentes de la cible",
      "Pour supprimer les lignes disparues"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Cette condition est facultative.",
      "Oui. Moins d'écritures, journal plus utile. WHEN MATCHED AND condition THEN UPDATE. (Attention aux NULL dans la condition.)",
      "Non. C'est WHEN NOT MATCHED BY TARGET.",
      "Non. C'est WHEN NOT MATCHED BY SOURCE."
    ],
    retenir: "WHEN MATCHED AND (changement réel) THEN UPDATE."
  },
  {
    id: "m09-q46", dialecte: "SQL Server",
    q: "Danger de WHEN NOT MATCHED BY SOURCE THEN DELETE dans un MERGE ?",
    choix: [
      "Aucun, la source fait foi",
      "Une source incomplète vide la cible",
      "Il supprime les lignes de la source",
      "Il ne fait rien sans clé primaire"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Une source incomplète supprime des lignes valides.",
      "Oui. Si la source est incomplète (fichier tronqué, filtre oublié), les lignes absentes sont supprimées de la cible. Un fichier vide = table cible vidée. Contrôle le volume de la source avant.",
      "Non. Le DELETE agit sur la cible, pas sur la source.",
      "Non. La clause marche sans clé primaire."
    ],
    retenir: "BY SOURCE DELETE : vérifie que la source est complète."
  },
  {
    id: "m09-q47", dialecte: "SQL Server",
    q: "Comment savoir, pour chaque ligne traitée par un MERGE, si elle a été insérée, mise à jour ou supprimée ?",
    choixCode: true,
    choix: [
      "@@ROWCOUNT juste après le MERGE",
      "OUTPUT $action, inserted.code, deleted.code",
      "OUTPUT inserted.code, deleted.code, @@ROWCOUNT",
      "SELECT MERGE_RESULT() après le MERGE"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Seulement le total.",
      "Oui. $action vaut 'INSERT', 'UPDATE' ou 'DELETE'.",
      "Non. @@ROWCOUNT n'indique pas l'action ligne par ligne.",
      "Non. N'existe pas."
    ],
    retenir: "MERGE + OUTPUT $action = détail des opérations."
  },
  {
    id: "m09-q48", dialecte: "SQL Server",
    q: "Deux sessions lancent en même temps un MERGE « insérer si absent » sur la même clé. Risque ?",
    choix: [
      "Aucun : MERGE est protégé contre ça",
      "Doublon possible : ajouter HOLDLOCK",
      "Le 2e attend, puis met à jour la ligne",
      "Le 2e MERGE est refusé, sans erreur"
    ],
    bonne: 1,
    pourquoi: [
      "Non. MERGE n'est pas protégé par défaut contre la concurrence.",
      "Oui. Les deux peuvent voir la ligne absente et tenter d'insérer : doublon ou violation de clé. WITH (HOLDLOCK) sur la cible (niveau SERIALIZABLE) évite ce cas.",
      "Non. Sans HOLDLOCK, rien ne le fait attendre : les deux voient « absent » et insèrent.",
      "Non. Le 2e MERGE peut insérer un doublon, ou planter."
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
      "Prend la 1re ligne de la source",
      "Échoue par défaut (non déterministe)",
      "Additionne les deux lignes source",
      "Insère deux lignes dans la cible"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Snowflake refuse de choisir : erreur.",
      "Oui. Paramètre ERROR_ON_NONDETERMINISTIC_MERGE = TRUE par défaut. Dédoublonne la source (QUALIFY).",
      "Non. MERGE n'additionne rien.",
      "Non. Les deux lignes correspondent à une ligne existante : pas d'insertion."
    ],
    retenir: "MERGE Snowflake : source dédoublonnée, sinon erreur."
  },
  {
    id: "m09-q51", dialecte: "Snowflake",
    q: "Sur Snowflake, comment insérer en une seule instruction les commandes FR dans cde_fr et les autres dans cde_export ?",
    choixCode: true,
    choix: [
      "INSERT FIRST WHEN pays = 'FR' THEN INTO cde_fr ELSE INTO cde_export SELECT * FROM stg_cde",
      "INSERT FIRST WHEN pays <> 'FR' THEN INTO cde_fr ELSE INTO cde_export SELECT * FROM stg_cde",
      "INSERT INTO cde_fr, cde_export SELECT * FROM stg_cde WHERE pays = 'FR'",
      "MERGE INTO cde_fr, cde_export USING stg_cde ON pays = 'FR'"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Insertion multi-tables : la source n'est lue qu'une fois. (INSERT ALL insère dans toutes les tables dont la condition est vraie.)",
      "Non. Condition inversée : les commandes FR partent à l'export.",
      "Non. Syntaxe invalide : un INSERT INTO classique vise une seule table.",
      "Non. MERGE vise une seule cible."
    ],
    retenir: "Snowflake : INSERT ALL / INSERT FIRST = plusieurs tables, une lecture."
  },
  {
    id: "m09-q52", dialecte: "Snowflake",
    q: "Sur Snowflake, que fait INSERT OVERWRITE INTO t SELECT … ?",
    choix: [
      "Ajoute les lignes à la suite",
      "Vide la table, puis insère, d'un coup",
      "Met à jour les lignes existantes",
      "Erreur : OVERWRITE est réservé aux vues"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Ce serait INSERT INTO.",
      "Oui. Une seule opération : pratique pour recharger complètement une table.",
      "Non. La table est vidée, pas mise à jour.",
      "Non. OVERWRITE marche sur les tables."
    ],
    retenir: "INSERT OVERWRITE = remplacer tout le contenu."
  },
  {
    id: "m09-q53", dialecte: "Snowflake",
    q: "Tu dois charger chaque nuit un fichier CSV de 2 millions de lignes dans Snowflake. Quelle méthode ?",
    choix: [
      "2 millions d'INSERT … VALUES, un par ligne",
      "Stage, puis COPY INTO",
      "Un curseur qui lit le fichier",
      "Un MERGE ligne par ligne"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Extrêmement lent.",
      "Oui. Dépose le fichier dans un stage, puis COPY INTO : chargement en masse, en parallèle, et Snowflake se souvient des fichiers déjà chargés.",
      "Non. Ligne par ligne : beaucoup trop lent.",
      "Non. Ligne par ligne : beaucoup trop lent."
    ],
    retenir: "Snowflake : fichiers → stage → COPY INTO."
  },
  {
    id: "m09-q54", dialecte: "Snowflake",
    q: "Une appli insère des lignes une par une dans Snowflake, des milliers de fois par heure. Problème ?",
    choix: [
      "Aucun, Snowflake adore les petits INSERT",
      "Chaque petit INSERT a un coût fixe",
      "Snowflake refuse au-delà de 1 000",
      "Une partie des lignes est perdue"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Chaque petit INSERT a un coût fixe.",
      "Oui. Snowflake est fait pour les traitements en masse. Regroupe les lignes en lots, ou passe par des fichiers + COPY, ou Snowpipe pour le flux continu.",
      "Non. Il n'y a pas de limite à 1 000.",
      "Non. Rien n'est perdu : c'est juste lent et cher."
    ],
    retenir: "Snowflake : écrire en lots, pas ligne par ligne."
  },
  {
    id: "m09-q55", dialecte: "Snowflake",
    q: "Sur Snowflake, pourquoi un UPDATE qui touche 1 ligne par micro-partition, sur toute une grosse table, est-il coûteux ?",
    choix: [
      "Il ne l'est pas, peu de lignes changent",
      "Chaque partition touchée est réécrite",
      "Snowflake verrouille toute la base",
      "À cause de la mise à jour des index"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Chaque partition touchée est réécrite en entier.",
      "Oui. Les micro-partitions ne sont pas modifiables : chaque partition touchée est réécrite entièrement. Parfois, recréer la table (CREATE TABLE … AS SELECT) est plus efficace.",
      "Non. Snowflake ne verrouille pas toute la base.",
      "Non. Pas d'index sur Snowflake."
    ],
    retenir: "Snowflake : UPDATE = réécriture de micro-partitions."
  },
  {
    id: "m09-q56", dialecte: "Snowflake",
    q: "Sur Snowflake, un UPDATE raté a modifié toute la table il y a 10 minutes. Comment récupérer les données d'avant ?",
    choixCode: true,
    choix: [
      "CREATE TABLE commande_avant CLONE commande AT (OFFSET => -60*5); puis comparer ou restaurer",
      "CREATE TABLE commande_avant CLONE commande AT (OFFSET => -60*15); puis comparer ou restaurer",
      "ROLLBACK; puis vérifier les lignes de commande",
      "UNDROP TABLE commande; puis comparer ou restaurer"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Il y a 5 minutes : l'UPDATE (il y a 10 minutes) était déjà fait.",
      "Oui. On clone la table telle qu'elle était il y a 15 minutes. (BEFORE (STATEMENT => 'id_requête') est encore plus précis.)",
      "Non. L'UPDATE est déjà validé : ROLLBACK ne peut plus rien.",
      "Non. UNDROP sert à une table supprimée, pas modifiée."
    ],
    retenir: "Snowflake : erreur de manipulation → Time Travel."
  },
  {
    id: "m09-q57", dialecte: "Snowflake",
    q: "Avant une grosse correction de données sur Snowflake, quel réflexe de sécurité, instantané et sans coût de stockage au départ ?",
    choixCode: true,
    choix: [
      "CREATE TABLE client_sauv CLONE client;",
      "CREATE TABLE client_sauv AS SELECT * FROM client;",
      "CREATE TABLE client_sauv LIKE client;",
      "COPY INTO @stage/client_sauv FROM client;"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Le clone partage les données : instantané. Seules les différences futures prennent de la place.",
      "Non. Copie réelle : prend du temps et de la place.",
      "Non. Copie la structure seulement, sans les données.",
      "Non. Export vers des fichiers : plus long, et à recharger ensuite."
    ],
    retenir: "Snowflake : CLONE avant une opération risquée."
  },
  {
    id: "m09-q58", dialecte: "Snowflake",
    q: "Sur Snowflake, sans BEGIN, un UPDATE est-il validé tout de suite ?",
    choix: [
      "Non, il faut toujours un COMMIT",
      "Oui, autocommit par défaut",
      "Seulement si la session est en mode batch",
      "Seulement pour les petites tables"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Seulement si tu as ouvert une transaction avec BEGIN.",
      "Oui. Par défaut, chaque instruction est validée automatiquement, comme sur SQL Server. Pour pouvoir annuler : BEGIN … COMMIT / ROLLBACK.",
      "Non. Il n'y a pas de « mode batch » : l'autocommit est le défaut partout.",
      "Non. La taille de la table ne change rien."
    ],
    retenir: "Autocommit par défaut : chaque instruction est définitive."
  },
  {
    id: "m09-q59", dialecte: "SQL Server",
    q: "Quel enchaînement permet de tester un UPDATE en production sans risque ?",
    choixCode: true,
    choix: [
      "UPDATE …; SELECT … (vérification); ROLLBACK;",
      "BEGIN TRAN; UPDATE …; SELECT … (vérification); ROLLBACK;",
      "BEGIN TRAN; UPDATE …; COMMIT; SELECT … (vérification);",
      "BEGIN TRAN; SELECT … (vérification); UPDATE … WITH (NOLOCK);"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Sans BEGIN TRAN, l'UPDATE est déjà validé : ROLLBACK ne peut plus rien.",
      "Oui. Tu vois le résultat, puis tu annules. Quand c'est bon : même chose avec COMMIT. Attention : les lignes sont verrouillées pendant le test.",
      "Non. On vérifie après avoir validé : trop tard.",
      "Non. NOLOCK ne protège rien, et la transaction reste ouverte."
    ],
    retenir: "Tester une modification : BEGIN TRAN … ROLLBACK."
  },
  {
    id: "m09-q60", dialecte: "SQL Server",
    q: "Une transaction contient 3 instructions. La 2e échoue. Sans XACT_ABORT ni TRY/CATCH, que se passe-t-il souvent ?",
    choix: [
      "Tout est annulé automatiquement",
      "La 1re et la 3e peuvent être validées",
      "Rien n'est exécuté, même la 1re instruction",
      "Le serveur arrête la session"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Pas automatiquement pour beaucoup d'erreurs.",
      "Oui. La 2e échoue mais les autres peuvent s'exécuter puis être validées : données incohérentes. Mets SET XACT_ABORT ON en tête : la moindre erreur annule toute la transaction.",
      "Non. La 1re instruction est déjà exécutée.",
      "Non. La session continue."
    ],
    retenir: "Modifications en plusieurs étapes : SET XACT_ABORT ON."
  },
  {
    id: "m09-q61", dialecte: "SQL Server",
    q: "Tu as lancé BEGIN TRAN; UPDATE … et tu pars déjeuner sans COMMIT. Conséquence ?",
    choix: [
      "Aucune, le verrou est relâché",
      "Les lignes restent verrouillées",
      "La transaction se valide toute seule",
      "La transaction s'annule après 1 minute"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Le verrou reste jusqu'au COMMIT ou ROLLBACK.",
      "Oui. Les autres utilisateurs (ERP, rapports) sont bloqués : cause fréquente de blocages. Vérifie SELECT @@TRANCOUNT avant de partir.",
      "Non. Aucune validation automatique.",
      "Non. Pas d'annulation automatique après un délai."
    ],
    retenir: "Jamais de transaction ouverte sans surveillance."
  },
  {
    id: "m09-q62", dialecte: "SQL Server",
    q: "Un DELETE de 500 000 lignes bloque toute la table pour les autres utilisateurs. Pourquoi ?",
    choix: [
      "DELETE verrouille toujours toute la table",
      "L'escalade de verrous vers la table",
      "DELETE verrouille toujours la base",
      "À cause des NULL dans les colonnes supprimées"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Il commence par des verrous de ligne ; c'est le nombre de verrous qui fait monter à la table.",
      "Oui. Au-delà d'environ 5 000 verrous, SQL Server remplace les verrous de lignes par un verrou sur toute la table. Supprimer par lots de quelques milliers de lignes évite l'escalade.",
      "Non. DELETE ne verrouille pas toute la base.",
      "Non. Les NULL ne jouent aucun rôle."
    ],
    retenir: "Gros DELETE / UPDATE : par lots, pour éviter le verrou de table."
  },
  {
    id: "m09-q63", dialecte: "SQL Server",
    q: "Un trigger contient SELECT @id = id FROM inserted; puis traite @id. Un INSERT de 50 lignes arrive. Problème ?",
    choix: [
      "Aucun, le trigger gère tout",
      "Il ne traite qu'une ligne sur 50",
      "Le trigger est appelé 50 fois",
      "Erreur : 50 lignes dans inserted"
    ],
    bonne: 1,
    pourquoi: [
      "Non. @id ne garde qu'une seule ligne.",
      "Oui. Le trigger est appelé UNE fois pour les 50 lignes : @id ne contient qu'une ligne. Bug classique : un trigger doit traiter inserted comme une table (INSERT … SELECT FROM inserted).",
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
      "Non. Elles contiennent les lignes modifiées.",
      "Non. Seulement les lignes modifiées."
    ],
    retenir: "UPDATE : deleted = avant, inserted = après."
  },
  {
    id: "m09-q65", dialecte: "SQL Server",
    q: "Tu fais un INSERT dans une vue qui joint client et commande. Que se passe-t-il ?",
    choix: [
      "Les deux tables sont remplies",
      "Erreur : plusieurs tables touchées",
      "Seule la 1re table de la vue est remplie",
      "La vue est recréée automatiquement"
    ],
    bonne: 1,
    pourquoi: [
      "Non. SQL Server refuse.",
      "Oui. Une modification via une vue ne doit toucher qu'une table de base (sauf trigger INSTEAD OF).",
      "Non. SQL Server refuse tout l'INSERT.",
      "Non. Une vue n'est jamais recréée toute seule."
    ],
    retenir: "Modifier via une vue : une seule table de base."
  },
  {
    id: "m09-q66", dialecte: "SQL Server",
    q: "La colonne montant_ttc est une colonne calculée (montant_ht * 1.2). Que donne un INSERT qui lui donne une valeur ?",
    choix: [
      "La valeur est stockée telle quelle",
      "Erreur : colonne calculée",
      "La valeur est ignorée en silence",
      "Elle remplace la formule de calcul"
    ],
    bonne: 1,
    pourquoi: [
      "Non. SQL Server refuse.",
      "Oui. On ne peut pas écrire dans une colonne calculée : elle se calcule toute seule à partir des autres colonnes.",
      "Non. SQL Server refuse.",
      "Non. La formule ne change pas."
    ],
    retenir: "Colonne calculée = jamais dans un INSERT / UPDATE."
  },
  {
    id: "m09-q67", dialecte: "SQL Server",
    q: "À quoi sert une colonne de type rowversion ?",
    choix: [
      "À stocker la date de modification",
      "Détecter les lignes modifiées",
      "À numéroter les lignes de 1 à N",
      "À chiffrer le contenu de la ligne"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Ce n'est pas une date.",
      "Oui. Elle change automatiquement à chaque modification de la ligne. Utile pour les chargements incrémentaux et pour détecter des modifications concurrentes.",
      "Non. Ce serait ROW_NUMBER ou IDENTITY.",
      "Non. rowversion ne chiffre rien."
    ],
    retenir: "rowversion = compteur auto de modification de ligne."
  },
  {
    id: "m09-q68", dialecte: "SQL Server",
    q: "Toutes les colonnes ont une valeur par défaut ou sont IDENTITY. Comment insérer une ligne ?",
    choixCode: true,
    choix: [
      "INSERT INTO t VALUES ()",
      "INSERT INTO t DEFAULT VALUES",
      "INSERT INTO t",
      "INSERT DEFAULT t"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Des parenthèses vides sont refusées.",
      "Oui. Une ligne avec toutes les valeurs par défaut.",
      "Non. Il manque la partie VALUES.",
      "Non. Syntaxe inventée."
    ],
    retenir: "INSERT INTO t DEFAULT VALUES."
  },
  {
    id: "m09-q69", dialecte: "SQL Server",
    q: "Un INSERT échoue : « Violation of PRIMARY KEY constraint ». Que s'est-il passé ?",
    choix: [
      "La table a atteint sa taille maximale",
      "La clé primaire existe déjà",
      "Un champ est trop long pour sa colonne",
      "Le type d'une valeur est faux"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Le message parle de la clé primaire.",
      "Oui. Une ligne avec la même clé existe déjà (ou la source contient deux fois la même clé). Vérifie les doublons de la source et ce qui existe déjà dans la cible.",
      "Non. Ce serait « would be truncated ».",
      "Non. Ce serait une erreur de conversion."
    ],
    retenir: "Violation de PK = clé déjà présente."
  },
  {
    id: "m09-q70", dialecte: "SQL Server",
    q: "Un index unique a l'option IGNORE_DUP_KEY = ON. Que se passe-t-il quand un INSERT contient des doublons de clé ?",
    choix: [
      "Erreur, et rien n'est inséré",
      "Doublons ignorés, le reste inséré",
      "Les doublons écrasent les anciennes lignes",
      "La table est vidée puis rechargée"
    ],
    bonne: 1,
    pourquoi: [
      "Non. C'est le comportement sans l'option.",
      "Oui. Simple avertissement. Pratique… mais des données peuvent être perdues sans que personne ne le remarque.",
      "Non. Les anciennes lignes restent ; les doublons sont ignorés.",
      "Non. Rien n'est vidé."
    ],
    retenir: "IGNORE_DUP_KEY : doublons ignorés en silence. À utiliser en connaissance de cause."
  },
  {
    id: "m09-q71", dialecte: "SQL Server",
    q: "Comment mettre à jour le CA total de chaque client à partir de ses commandes ?",
    choixCode: true,
    choix: [
      "UPDATE c SET c.ca = x.ca FROM client c JOIN (SELECT client_id, SUM(montant) AS ca FROM commande GROUP BY client_id) x ON x.client_id = c.id",
      "UPDATE c SET c.ca = x.ca FROM client c JOIN (SELECT client_id, SUM(montant) AS ca FROM commande) x ON x.client_id = c.id",
      "UPDATE c SET c.ca = SUM(co.montant) FROM client c JOIN commande co ON co.client_id = c.id GROUP BY c.id",
      "UPDATE c SET c.ca = x.ca FROM client c JOIN (SELECT client_id, MAX(montant) AS ca FROM commande GROUP BY client_id) x ON x.client_id = c.id"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. On agrège d'abord (une ligne par client), puis on joint. Les clients sans commande ne sont pas touchés.",
      "Non. Sans GROUP BY, client_id n'est pas agrégé : erreur.",
      "Non. Agrégat interdit dans SET, et GROUP BY interdit dans un UPDATE.",
      "Non. MAX = la plus grosse commande, pas le CA total."
    ],
    retenir: "UPDATE avec agrégat : sous-requête agrégée + jointure."
  },
  {
    id: "m09-q72", dialecte: "SQL Server",
    q: "Que penser de l'astuce UPDATE t SET @n = rang = @n + 1 pour numéroter des lignes ?",
    choix: [
      "C'est la méthode recommandée",
      "À éviter : ordre non garanti",
      "C'est interdit par SQL Server",
      "C'est la seule méthode possible"
    ],
    bonne: 1,
    pourquoi: [
      "Non. L'ordre n'est pas garanti : ROW_NUMBER est sûr.",
      "Oui. C'est la « mise à jour bizarre » (quirky update) : non documentée, l'ordre de traitement des lignes n'est pas garanti. Utilise ROW_NUMBER() dans une CTE.",
      "Non. C'est permis, mais pas fiable.",
      "Non. ROW_NUMBER fait mieux."
    ],
    retenir: "Numéroter : ROW_NUMBER, pas de variable dans un UPDATE."
  },
  {
    id: "m09-q73", dialecte: "SQL Server",
    q: "Que fait ON UPDATE CASCADE sur la clé étrangère commande.client_id → client.id ?",
    choix: [
      "Empêche toute modification de client.id",
      "Les commandes suivent le nouvel id",
      "Supprime les commandes du client",
      "Rien, sauf un message d'avertissement"
    ],
    bonne: 1,
    pourquoi: [
      "Non. C'est le comportement par défaut (NO ACTION).",
      "Oui. Si client.id change, les commandes sont mises à jour avec la nouvelle valeur. Mais modifier une clé primaire est rarement une bonne idée : préfère une clé technique qui ne change jamais.",
      "Non. Ce serait ON DELETE CASCADE.",
      "Non. Les commandes sont vraiment modifiées."
    ],
    retenir: "Une clé primaire ne devrait jamais changer."
  },
  {
    id: "m09-q74", dialecte: "Standard",
    q: "Quelle requête supprime les doublons en gardant la ligne de plus grand id ?",
    choixCode: true,
    choix: [
      "DELETE a FROM t a WHERE EXISTS (SELECT 1 FROM t b WHERE b.cle = a.cle AND b.id < a.id)",
      "DELETE a FROM t a WHERE EXISTS (SELECT 1 FROM t b WHERE b.cle = a.cle AND b.id > a.id)",
      "DELETE a FROM t a WHERE EXISTS (SELECT 1 FROM t b WHERE b.cle = a.cle AND b.id <> a.id)",
      "DELETE FROM t WHERE id <> (SELECT MAX(id) FROM t)"
    ],
    bonne: 1,
    pourquoi: [
      "Non. On supprime les lignes qui ont un id plus PETIT à côté : il reste le plus petit id.",
      "Oui. On supprime chaque ligne qui a un « frère » plus récent. Il reste le plus grand id par clé.",
      "Non. Toutes les lignes en doublon sont supprimées, sans en garder une.",
      "Non. Garde une seule ligne pour toute la table."
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
      "DELETE FROM ligne_cde WHERE EXISTS (SELECT 1 FROM commande c WHERE c.id = ligne_cde.cde_id)",
      "DELETE FROM commande WHERE NOT EXISTS (SELECT 1 FROM ligne_cde l WHERE l.cde_id = commande.id)"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Les orphelines ont un cde_id rempli, mais qui ne pointe sur rien.",
      "Oui. Fais d'abord un SELECT avec le même NOT EXISTS pour compter. (Une clé étrangère aurait empêché ça.)",
      "Non. EXISTS : on supprime les lignes qui ONT une commande.",
      "Non. On supprime les commandes sans lignes, pas les lignes orphelines."
    ],
    retenir: "Orphelins : NOT EXISTS vers le parent."
  },
  {
    id: "m09-q76", dialecte: "SQL Server",
    q: "Pourquoi ajouter WAITFOR DELAY '00:00:01' entre deux lots d'un gros DELETE en journée ?",
    choix: [
      "C'est obligatoire entre deux lots",
      "Laisser passer les autres requêtes",
      "Pour pouvoir annuler le lot d'avant",
      "Pour trier les lignes à supprimer"
    ],
    bonne: 1,
    pourquoi: [
      "Non. C'est facultatif.",
      "Oui. Le serveur respire : les autres requêtes passent entre deux lots. Moins d'impact sur les utilisateurs de l'ERP.",
      "Non. Une pause ne permet pas d'annuler.",
      "Non. Une pause ne trie rien."
    ],
    retenir: "Purge en journée : petits lots + pauses."
  },
  {
    id: "m09-q77", dialecte: "SQL Server",
    q: "Supprimer des clients est lent car SQL Server vérifie les commandes liées. Que manque-t-il souvent ?",
    choix: [
      "Une vue sur la table commande",
      "Un index sur commande.client_id",
      "Un trigger sur la table client",
      "Une contrainte CHECK sur client"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Une vue n'accélère pas la recherche.",
      "Oui. La colonne de clé étrangère. Pour chaque client supprimé, SQL Server cherche ses commandes. Sans index : lecture complète à chaque fois.",
      "Non. Un trigger ajoute du travail.",
      "Non. Une contrainte CHECK n'accélère pas la recherche."
    ],
    retenir: "Index sur les colonnes de clé étrangère : aussi utile pour les DELETE du parent."
  },
  {
    id: "m09-q78", dialecte: "Standard",
    q: "Les clients supprimés logiquement (actif = 0) apparaissent dans un rapport. Quelle solution durable ?",
    choix: [
      "Les supprimer pour de vrai de la base",
      "Une vue qui filtre actif = 1",
      "Ajouter DISTINCT dans les rapports",
      "Un filtre actif = 1 dans chaque rapport"
    ],
    bonne: 1,
    pourquoi: [
      "Non. On perd l'historique.",
      "Oui. Une vue v_client_actif (WHERE actif = 1) utilisée par tous les rapports : la règle est écrite une fois, au bon endroit.",
      "Non. DISTINCT ne retire pas les clients inactifs.",
      "Non. Ça marche, mais on l'oublie au prochain rapport : la vue le fait une fois pour toutes."
    ],
    retenir: "Suppression logique : une vue qui filtre, pour ne jamais l'oublier."
  },
  {
    id: "m09-q79", dialecte: "Standard",
    q: "Sans MERGE, comment faire un « upsert » (mettre à jour si existe, sinon insérer) ?",
    choix: [
      "INSERT de tout, puis UPDATE de tout",
      "UPDATE, puis INSERT des absents",
      "DELETE de la cible, puis INSERT de tout",
      "C'est impossible sans MERGE"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Les lignes tout juste insérées seraient ensuite mises à jour pour rien.",
      "Oui. UPDATE … FROM source pour les lignes existantes, puis INSERT … SELECT … WHERE NOT EXISTS pour les nouvelles. Souvent plus lisible qu'un MERGE. À mettre dans une transaction.",
      "Non. Possible, mais on perd les id, l'historique, et on déclenche les contraintes.",
      "Non. UPDATE puis INSERT des absents le fait."
    ],
    retenir: "Upsert simple : UPDATE existants, puis INSERT nouveaux."
  },
  {
    id: "m09-q80", dialecte: "Standard",
    q: "Dans un MERGE, la clé de la source est NULL pour certaines lignes. Que se passe-t-il ?",
    choix: [
      "Elles sont ignorées par le MERGE",
      "Elles sont insérées à chaque fois",
      "Erreur : clé NULL interdite",
      "Elles mettent à jour toutes les lignes"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Elles sont insérées, car NULL ne correspond à rien.",
      "Oui. NULL ne correspond jamais à la cible (NULL ≠ NULL) : ces lignes sont réinsérées à chaque exécution, en doublon. Filtre ou corrige les clés NULL avant.",
      "Non. Une clé NULL dans la source est permise.",
      "Non. NULL ne correspond à aucune ligne."
    ],
    retenir: "Clés NULL dans un MERGE = doublons à chaque passage."
  },
  {
    id: "m09-q81", dialecte: "Standard",
    q: "Un flux EDI arrive chaque nuit. Quel enchaînement est le plus sûr ?",
    choix: [
      "Insérer directement dans les tables de l'ERP",
      "Table de chargement, contrôles, rejets, MERGE",
      "DELETE de la cible puis tout réinsérer",
      "Insérer sans contrôle et corriger après"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Une ligne fausse va directement en production.",
      "Oui. Charger dans une table de chargement (stg), contrôler (formats, doublons, références), isoler les rejets, puis MERGE vers la cible. Le « sas » : rien n'entre sans être vérifié.",
      "Non. Une source fausse effacerait les bonnes données.",
      "Non. Les erreurs arrivent en production avant d'être vues."
    ],
    retenir: "Intégration : stg → contrôles → rejets → cible."
  },
  {
    id: "m09-q82", dialecte: "Standard",
    q: "Pendant le contrôle d'un import, que faire des lignes invalides (date impossible, client inconnu) ?",
    choix: [
      "Les supprimer en silence du fichier",
      "Les isoler dans une table de rejets",
      "Les charger quand même, puis voir",
      "Tout arrêter à la 1re erreur, toujours"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Personne ne saura qu'il manque des données.",
      "Oui. Avec la raison du rejet, et on ne charge que les lignes valides. Les rejets sont visibles, corrigeables et rejouables.",
      "Non. Des données fausses arriveraient dans les rapports.",
      "Non. Possible pour certains flux critiques, mais pas une règle générale."
    ],
    retenir: "Rejets : tracés, expliqués, rejouables."
  },
  {
    id: "m09-q83", dialecte: "Standard",
    q: "Comment éviter de charger deux fois le même fichier si le traitement est relancé ?",
    choix: [
      "Vider la table cible avant chaque chargement",
      "Un journal des fichiers déjà chargés",
      "Ajouter DISTINCT au chargement",
      "Supprimer le fichier avant de charger"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Ça supprime aussi les fichiers d'avant, déjà chargés.",
      "Oui. Une table des fichiers traités (nom, date, nombre de lignes), vérifiée avant de charger : le traitement devient « idempotent ». (COPY INTO de Snowflake le fait tout seul.)",
      "Non. DISTINCT ne voit pas ce qui est déjà chargé.",
      "Non. On perd la source, sans savoir ce qui a été chargé."
    ],
    retenir: "Chargement relançable : journal des fichiers traités."
  },
  {
    id: "m09-q84", dialecte: "SQL Server",
    q: "Quelle méthode SQL Server charge un gros fichier CSV le plus efficacement ?",
    choix: [
      "Un INSERT par ligne du fichier",
      "BULK INSERT (ou bcp)",
      "Un curseur sur le fichier",
      "Copier-coller dans SSMS"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Un INSERT par ligne est très lent.",
      "Oui. Chargement en masse (BULK INSERT, l'outil bcp, ou un flux ETL en mode « bulk ») : beaucoup plus rapide.",
      "Non. Un curseur est ligne par ligne : lent.",
      "Non. Impossible pour un gros fichier."
    ],
    retenir: "Fichiers volumineux : BULK INSERT / bcp."
  },
  {
    id: "m09-q85", dialecte: "Snowflake",
    q: "Sur Snowflake, après DELETE FROM t (tout supprimer), un COPY INTO du même fichier ne recharge rien. Pourquoi ?",
    choix: [
      "Le DELETE a aussi effacé le stage",
      "COPY INTO se souvient des fichiers",
      "Le fichier est devenu vide",
      "Il faut un warehouse plus grand"
    ],
    bonne: 1,
    pourquoi: [
      "Non. DELETE ne touche que la table ; le fichier est toujours dans le stage.",
      "Oui. COPY INTO garde la mémoire des fichiers déjà chargés. DELETE n'efface pas cette mémoire ; TRUNCATE, si. Utilise TRUNCATE, ou l'option FORCE = TRUE (avec prudence).",
      "Non. Le fichier n'a pas changé.",
      "Non. La taille du warehouse ne joue pas."
    ],
    retenir: "Snowflake : TRUNCATE efface aussi l'historique de chargement, DELETE non."
  },
  {
    id: "m09-q86", dialecte: "SQL Server",
    q: "Une procédure lit le stock, vérifie qu'il suffit, puis le décrémente. Deux sessions font ça en même temps. Risque, et solution ?",
    choix: [
      "Aucun risque, SQL Server sérialise",
      "Stock négatif : UPDLOCK ou UPDATE conditionnel",
      "SQL Server refuse la 2e session",
      "Mettre NOLOCK sur la lecture du stock"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Les deux lectures peuvent se faire en même temps.",
      "Oui. Les deux lisent le même stock et décrémentent. Lis avec WITH (UPDLOCK) dans la transaction, ou fais UPDATE … WHERE qte >= @besoin : vérification et modification en une seule étape.",
      "Non. Les deux sessions passent.",
      "Non. Pire."
    ],
    retenir: "Lire puis modifier : verrouiller à la lecture (UPDLOCK), ou tout faire dans l'UPDATE."
  },
  {
    id: "m09-q87", dialecte: "SQL Server",
    q: "Un écran modifie un client avec UPDATE … WHERE id = @id AND version = @version_lue. @@ROWCOUNT vaut 0. Que s'est-il passé ?",
    choix: [
      "La transaction a été annulée",
      "Quelqu'un a modifié le client entre-temps",
      "Le client n'a pas de numéro de version",
      "La table client est verrouillée en lecture"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Une annulation donne une erreur ; 0 ligne veut dire que le WHERE n'a rien trouvé.",
      "Oui. La version ne correspond plus : c'est le « verrouillage optimiste » (souvent avec une colonne rowversion). On prévient l'utilisateur au lieu d'écraser.",
      "Non. La version existe ; elle a juste changé.",
      "Non. Un verrou ferait attendre, pas renvoyer 0 ligne."
    ],
    retenir: "Verrouillage optimiste : WHERE version = lue, puis contrôle de @@ROWCOUNT."
  },
  {
    id: "m09-q88", dialecte: "SQL Server",
    q: "Un UPDATE avec OUTPUT inserted.* (sans INTO) échoue sur une table qui a un trigger actif. Pourquoi ?",
    choix: [
      "OUTPUT est interdit dans un UPDATE",
      "Avec un trigger, OUTPUT exige INTO",
      "Le trigger supprime les lignes",
      "Le trigger interdit toute modification"
    ],
    bonne: 1,
    pourquoi: [
      "Non. OUTPUT est permis dans un UPDATE.",
      "Oui. SQL Server refuse OUTPUT sans INTO si la table a des triggers actifs. Avec INTO (vers une variable table ou #table), ça fonctionne.",
      "Non. Le trigger ne supprime rien.",
      "Non. Le trigger se déclenche normalement ; seul OUTPUT sans INTO pose problème."
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
      "Non. L'ordre d'attribution des IDENTITY est garanti.",
      "Oui. Seulement ça. La lecture, elle, aura toujours besoin d'un ORDER BY.",
      "Non. La lecture a besoin d'un ORDER BY.",
      "Non. Le stockage ne suit pas cet ordre."
    ],
    retenir: "INSERT … ORDER BY : ordre des IDENTITY garanti, pas l'ordre de lecture."
  },
  {
    id: "m09-q90", dialecte: "SQL Server",
    q: "À quoi sert un objet SEQUENCE (NEXT VALUE FOR seq_facture) par rapport à IDENTITY ?",
    choix: [
      "À rien de plus qu'IDENTITY",
      "Un compteur indépendant des tables",
      "Il garantit des numéros sans trou",
      "Il trie les lignes à l'insertion"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Elle est indépendante des tables.",
      "Oui. On peut obtenir le numéro AVANT d'insérer, et le partager entre plusieurs tables (ex. pièces de plusieurs types). Snowflake a aussi des SEQUENCE.",
      "Non. Des trous restent possibles.",
      "Non. Une SEQUENCE donne des numéros, elle ne trie rien."
    ],
    retenir: "SEQUENCE = compteur autonome, réutilisable."
  },
  {
    id: "m09-q91", dialecte: "SQL Server",
    q: "Les id IDENTITY de la table facture passent de 1 041 à 2 042. Est-ce une anomalie ?",
    choix: [
      "Oui, des factures ont été supprimées",
      "Pas forcément : IDENTITY a des trous",
      "Oui, la table est corrompue",
      "Oui, il faut réinitialiser le compteur"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Pas forcément.",
      "Oui. Un redémarrage du serveur ou des transactions annulées créent des trous : normal pour IDENTITY. Ne l'utilise jamais pour une numérotation légale sans trou (factures).",
      "Non. Les trous sont normaux.",
      "Non. Ça risque de créer des doublons."
    ],
    retenir: "IDENTITY peut avoir des trous. Numérotation légale : autre mécanisme."
  },
  {
    id: "m09-q92", dialecte: "Standard",
    q: "Tu dois corriger des données en production. Quelle pratique est la bonne ?",
    choix: [
      "Modifier directement les cellules dans SSMS",
      "Script relu, testé, tracé, réversible",
      "Demander à l'utilisateur de ressaisir",
      "Modifier d'abord, puis prévenir"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Aucune trace, aucun contrôle.",
      "Oui. Un script écrit, relu, testé sur une copie, lié à un ticket, avec un plan de retour arrière. Traçabilité et sécurité.",
      "Non. Lent, et source d'erreurs.",
      "Non. On prévient avant."
    ],
    retenir: "Correction en production = script + ticket + test + retour arrière."
  },
  {
    id: "m09-q93", dialecte: "SQL Server",
    q: "Avant un UPDATE massif sur SQL Server, quel filet de sécurité simple ?",
    choixCode: true,
    choix: [
      "SELECT * INTO article_sauv_20261026 FROM article;",
      "BEGIN TRAN; UPDATE …; (laisser ouvert jusqu'à demain)",
      "SELECT * FROM article WITH (NOLOCK);",
      "TRUNCATE TABLE article_sauv;"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Une copie datée (ou seulement les lignes concernées) pour pouvoir comparer ou restaurer. À supprimer une fois la correction validée.",
      "Non. Bloque tout le monde.",
      "Non. Une lecture ne sauvegarde rien.",
      "Non. Ça vide une sauvegarde, ça n'en crée pas."
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
      "Non. Syntaxe inventée."
    ],
    retenir: "Affecter NULL : = NULL. Tester NULL : IS NULL."
  },
  {
    id: "m09-q95", dialecte: "SQL Server",
    q: "INSERT INTO t (d) VALUES ('01/02/2026') sur un serveur en anglais : quelle date est enregistrée ?",
    choix: [
      "Le 1er février 2026, dans tous les cas",
      "Le 2 janvier 2026, toujours",
      "Une erreur de conversion",
      "Ça dépend des réglages (DATEFORMAT)"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Pas en anglais (format mm/jj).",
      "Non. Probable ici, mais pas « toujours » : ça dépend des réglages.",
      "Non. La date est valide dans les deux formats.",
      "Oui. Format ambigu ! En anglais (mm/jj), probablement le 2 janvier. Écris '20260201' (AAAAMMJJ) pour ne dépendre de rien."
    ],
    retenir: "Dates dans les INSERT : toujours 'AAAAMMJJ'."
  },
  {
    id: "m09-q96", dialecte: "Standard",
    q: "Une table de chargement est vidée puis rechargée chaque nuit. DELETE ou TRUNCATE ?",
    choix: [
      "DELETE, pour garder une trace dans le journal",
      "TRUNCATE : rapide, compteurs à zéro",
      "DROP TABLE, puis CREATE TABLE",
      "UPDATE de toutes les lignes"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Plus lent, sans avantage ici.",
      "Oui. Plus rapide, moins de journal. Idéal pour les tables de chargement (sans clé étrangère entrante).",
      "Non. La structure, les droits et les index seraient perdus.",
      "Non. UPDATE modifie, il ne vide pas la table."
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
      "UPDATE c SET c.derniere_cde = x.d FROM client c LEFT JOIN (SELECT client_id, MAX(date_cde) AS d FROM commande GROUP BY client_id) x ON x.client_id = c.id",
      "UPDATE c SET c.derniere_cde = x.d FROM client c JOIN (SELECT client_id, MIN(date_cde) AS d FROM commande GROUP BY client_id) x ON x.client_id = c.id"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Les clients sans commande prennent NULL (leur ancienne valeur est écrasée).",
      "Oui. Le JOIN interne ne touche que les clients qui ont des commandes.",
      "Non. LEFT JOIN : les clients sans commande sont aussi touchés, et passent à NULL.",
      "Non. MIN = la PREMIÈRE commande."
    ],
    retenir: "UPDATE … JOIN : seules les lignes jointes sont modifiées."
  },
  {
    id: "m09-q98", dialecte: "SQL Server",
    q: "Comment savoir combien de lignes ont été insérées, mises à jour et supprimées par un MERGE, pour le journal du traitement ?",
    choix: [
      "@@ROWCOUNT donne le détail par action",
      "OUTPUT $action, puis COUNT par action",
      "Impossible : MERGE ne renvoie rien",
      "Relancer le MERGE en mode test"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Seulement le total.",
      "Oui. OUTPUT $action INTO une table, puis COUNT par action. Ex. 120 INSERT, 45 UPDATE, 3 DELETE : un vrai compte rendu.",
      "Non. MERGE peut renvoyer le détail avec OUTPUT $action.",
      "Non. MERGE n'a pas de mode test."
    ],
    retenir: "Compte rendu d'un MERGE : OUTPUT $action."
  },
  {
    id: "m09-q99", dialecte: "Standard",
    q: "Une procédure de mise à jour doit pouvoir être relancée sans effet de bord. Comment s'appelle cette propriété ?",
    choix: [
      "Atomicité",
      "Idempotence",
      "Normalisation",
      "Cardinalité"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Atomicité = tout ou rien.",
      "Oui. Relancer = même résultat. Ex. INSERT … WHERE NOT EXISTS, MERGE, UPDATE vers une valeur cible.",
      "Non. La normalisation concerne la structure des tables.",
      "Non. La cardinalité est un nombre de lignes."
    ],
    retenir: "Idempotent = relançable sans doublon ni dégât."
  },
  {
    id: "m09-q100", dialecte: "Standard",
    q: "Quelle liste résume les bons réflexes avant de modifier des données ?",
    choix: [
      "Aller vite, puis vérifier le lendemain",
      "Vérifier, sauvegarder, transaction",
      "Désactiver les contraintes pour aller vite",
      "Utiliser NOLOCK sur toutes les tables"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Une erreur peut être grave avant d'être vue.",
      "Oui. Vérifier la base (DB_NAME), écrire le SELECT, compter, sauvegarder, transaction, contrôler @@ROWCOUNT, puis COMMIT. Ces réflexes évitent la plupart des catastrophes.",
      "Non. On perd la protection des données.",
      "Non. NOLOCK peut lire des données fausses."
    ],
    retenir: "Base, SELECT, compte, sauvegarde, transaction, contrôle, COMMIT."
  }
];
