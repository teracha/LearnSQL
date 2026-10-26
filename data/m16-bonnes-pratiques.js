LEARNSQL.questions.m16 = [
  {
    id: "m16-q01", dialecte: "Standard",
    q: "Pourquoi préfixer chaque colonne par l'alias de sa table (`c.nom`, `co.date_cde`), même quand ce n'est pas obligatoire ?",
    choix: [
      "Pour que la requête s'exécute plus vite",
      "Savoir d'où vient chaque colonne, sans ambiguïté",
      "Parce que SQL Server l'exige dès qu'il y a une jointure",
      "Pour que le résultat soit trié par table"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Aucun effet sur la performance.",
      "Oui. Et éviter l'erreur « nom de colonne ambigu » le jour où une autre table aura une colonne du même nom. Une requête qui marche aujourd'hui peut casser demain si on ajoute une colonne `nom` à une autre table.",
      "Non. Il ne l'exige qu'en cas d'ambiguïté. Justement : on se protège avant qu'elle n'arrive.",
      "Non. Aucun effet sur le tri."
    ],
    retenir: "Toujours alias.colonne."
  },
  {
    id: "m16-q02", dialecte: "Standard",
    q: "Quel commentaire est vraiment utile au-dessus d'un UPDATE de prix ?",
    choix: [
      "`-- On fait un UPDATE de la table article`",
      "`-- +3 % sauf famille PROMO (DAF, SI-1234)`",
      "`-- Ne pas toucher, voir avec la compta`",
      "`-- Modifié par JB le 15/10/2026`"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Il répète le code : on voit déjà que c'est un UPDATE.",
      "Oui. Il explique le POURQUOI : la règle métier, l'exception, l'origine de la décision. Version complète : « Hausse tarifaire 2027 : +3 % sauf famille PROMO (décision DAF du 15/10, ticket SI-1234) ».",
      "Non. Il ne dit pas pourquoi : personne n'osera jamais le corriger.",
      "Non. L'auteur et la date sont dans l'historique Git ; le commentaire doit expliquer la règle."
    ],
    retenir: "Commenter le pourquoi, pas le quoi."
  },
  {
    id: "m16-q03", dialecte: "Standard",
    q: "Un rapport utilise `SELECT code, nom, ca FROM ... ORDER BY 3 DESC`. Un collègue ajoute la colonne `ville` en 2e position. Que se passe-t-il ?",
    choix: [
      "Une erreur « colonne inconnue »",
      "Le tri se fait sur `nom`",
      "Le tri reste sur `ca`, sans changement",
      "Le tri devient aléatoire à chaque fois"
    ],
    bonne: 1,
    pourquoi: [
      "Non. La requête reste valide : c'est le piège.",
      "Oui. La nouvelle 3e colonne, sans aucun message d'erreur. `ORDER BY 3` désigne une position, pas une colonne. Écrire `ORDER BY ca DESC` est plus sûr.",
      "Non. SQL ne suit pas la colonne : il prend la 3e position.",
      "Non. Le tri est bien fait, mais sur la mauvaise colonne."
    ],
    retenir: "ORDER BY par nom de colonne, pas par numéro."
  },
  {
    id: "m16-q04", dialecte: "Standard",
    q: "Que renvoie cette requête écrite à l'ancienne ?",
    code: "SELECT co.num_cde, cl.nom\nFROM commande co, client cl\nWHERE co.date_cde >= '20260101';",
    choix: [
      "Chaque commande avec son client",
      "Un produit cartésien",
      "Une erreur de syntaxe sur la virgule",
      "Seulement les clients qui ont commandé"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Rien ne relie la commande à son client.",
      "Oui. Chaque commande combinée avec CHAQUE client : la condition de jointure a été oubliée. Avec `INNER JOIN … ON`, l'oubli de la condition provoque une erreur de syntaxe : on le voit tout de suite.",
      "Non. La virgule entre tables est une syntaxe ancienne mais valide.",
      "Non. Il n'y a aucun lien entre les deux tables."
    ],
    retenir: "Toujours JOIN … ON, jamais la virgule."
  },
  {
    id: "m16-q05", dialecte: "SQL Server",
    q: "Pourquoi éviter de nommer ses procédures `sp_calcul_ca` ?",
    choix: [
      "Le nom est trop long pour SQL Server",
      "`sp_` est réservé aux procédures système",
      "Les procédures `sp_` ne peuvent pas avoir de paramètres",
      "SQL Server refuse ce nom à la création"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Si une procédure système porte un jour le même nom, ton code peut casser. C'est la recommandation de Microsoft. Préfère `p_` ou `usp_`, ou pas de préfixe.",
      "Non. Elles en ont autant que les autres.",
      "Non. Il l'accepte : c'est pour ça que le piège existe."
    ],
    retenir: "Pas de préfixe sp_ pour tes procédures."
  },
  {
    id: "m16-q06", dialecte: "SQL Server",
    q: "Pourquoi écrire `dbo.client` plutôt que `client` dans le code ?",
    choix: [
      "C'est obligatoire depuis SQL Server 2019",
      "Aucun doute sur le schéma de la table",
      "Pour copier la table dans le schéma dbo",
      "Pour donner les droits à tout le monde"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Ce n'est pas obligatoire.",
      "Oui. Le moteur et le lecteur savent tout de suite quelle table est visée, quel que soit le schéma par défaut de l'utilisateur. Deux tables `client` peuvent exister dans deux schémas (`dbo`, `stg`).",
      "Non. Ça ne copie rien.",
      "Non. Les droits ne changent pas."
    ],
    retenir: "Toujours schéma.table."
  },
  {
    id: "m16-q07", dialecte: "Standard",
    q: "Le filtre `WHERE statut IN ('A','B','C')` est copié dans 15 rapports. Un nouveau statut « D » doit être ajouté. Quelle est la meilleure correction durable ?",
    choix: [
      "Modifier les 15 rapports, un par un",
      "Une table de référence des statuts",
      "Supprimer le filtre des rapports",
      "Renommer le statut D en C"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Ça marche aujourd'hui, mais on en oubliera un la prochaine fois.",
      "Oui. Avec une colonne « à inclure » (O/N), et une jointure dans les rapports. La règle est à un seul endroit, et le métier peut même la gérer.",
      "Non. Les statuts exclus remonteraient.",
      "Non. On fausse la donnée."
    ],
    retenir: "Valeurs en dur répétées → table de paramètres."
  },
  {
    id: "m16-q08", dialecte: "Standard",
    q: "Une requête contient 4 niveaux de sous-requêtes imbriquées. Comment la rendre lisible sans changer le résultat ?",
    choix: [
      "Tout mettre sur une seule ligne",
      "Des CTE nommées, une par étape",
      "Ajouter DISTINCT partout",
      "Remplacer les sous-requêtes par des curseurs"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. `WITH ventes AS (…), marges AS (…)` : on lit de haut en bas, comme une recette. Attention : sur SQL Server, une CTE n'est pas plus rapide, juste plus lisible.",
      "Non. Ça peut changer le résultat.",
      "Non. Plus lent et plus long."
    ],
    retenir: "CTE = lisibilité, étape par étape."
  },
  {
    id: "m16-q09", dialecte: "Standard",
    q: "Quel est le problème de cette requête ?",
    code: "SELECT a.num_cde, b.nom, c.libelle\nFROM commande a\nJOIN client b ON b.id = a.client_id\nJOIN ligne_cde d ON d.cde_id = a.id\nJOIN article c ON c.id = d.article_id;",
    choix: [
      "Elle ne fonctionne pas",
      "Alias sans sens : illisible",
      "Il manque un ORDER BY obligatoire",
      "Les alias doivent faire 3 lettres minimum"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Elle fonctionne.",
      "Oui. Les alias a, b, c, d n'ont pas de sens : on doit remonter au FROM pour comprendre chaque colonne. `cde`, `cli`, `lig`, `art` se lisent tout seuls.",
      "Non. ORDER BY n'est pas obligatoire.",
      "Non. Il n'y a pas de minimum ; c'est une question de lisibilité."
    ],
    retenir: "Des alias parlants."
  },
  {
    id: "m16-q10", dialecte: "SQL Server",
    q: "Une table a des colonnes nommées `[Date commande]` et `[Code client]`. Quel est l'inconvénient ?",
    choix: [
      "Aucun, c'est plus lisible",
      "Crochets partout, erreurs de frappe",
      "Les colonnes ne peuvent pas être indexées",
      "Les colonnes ne peuvent pas être NULL"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Il faut des crochets partout, les erreurs de frappe sont fréquentes, et certains outils gèrent mal les espaces. Préfère `date_commande`, `code_client` : sans espace, sans accent, sans mot réservé.",
      "Non. Elles peuvent l'être.",
      "Non."
    ],
    retenir: "Noms sans espace, sans accent, sans mot réservé."
  },
  {
    id: "m16-q11", dialecte: "Snowflake",
    q: "Un outil de chargement a créé la table `\"client\"` (en minuscules, avec des guillemets). La requête `SELECT * FROM client;` répond « l'objet n'existe pas ». Pourquoi ?",
    choix: [
      "La table est vide",
      "Casse : \"client\" n'est pas CLIENT",
      "Il manque le nom du warehouse",
      "Snowflake interdit les minuscules"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Une table vide existe quand même.",
      "Oui. Sans guillemets, Snowflake met le nom en MAJUSCULES et cherche `CLIENT`. Avec guillemets, `\"client\"` est sensible à la casse : ce sont deux noms différents. Il faudrait écrire `SELECT * FROM \"client\";`. Mieux : ne pas créer de noms entre guillemets.",
      "Non. Le warehouse ne change pas la recherche du nom.",
      "Non. Il les accepte entre guillemets : c'est la source du piège."
    ],
    retenir: "Snowflake : éviter les noms entre guillemets."
  },
  {
    id: "m16-q12", dialecte: "Standard",
    q: "Une procédure contient 400 lignes d'ancien code mis en commentaire « au cas où ». Bonne pratique ?",
    choix: [
      "C'est parfait : on garde tout",
      "Le supprimer, Git l'a gardé",
      "Le décommenter pour le réactiver",
      "Le déplacer à la fin du fichier"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Personne ne sait plus s'il est encore utile.",
      "Oui. L'historique est dans Git, et le code commenté rend la procédure difficile à lire. Si on en a besoin un jour, Git permet de le retrouver.",
      "Non. Il pourrait casser le traitement.",
      "Non. Il reste du bruit."
    ],
    retenir: "Code mort → supprimé. L'historique, c'est Git."
  },
  {
    id: "m16-q13", dialecte: "SQL Server",
    q: "Un curseur applique une hausse de prix article par article (50 000 articles). Il met 20 minutes. Que faire ?",
    choix: [
      "Ajouter de la mémoire au serveur",
      "Une seule requête UPDATE avec jointure",
      "Lancer le curseur la nuit",
      "Découper en 10 curseurs en parallèle"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Le problème est le traitement ligne par ligne.",
      "Oui. `UPDATE a SET a.prix = a.prix * t.coef FROM dbo.article a JOIN dbo.tarif_hausse t ON t.famille = a.famille` : une requête ensembliste fait le même travail en quelques secondes.",
      "Non. On cache le problème, on ne le règle pas.",
      "Non. Plus complexe, et risque de blocages."
    ],
    retenir: "Curseur lent → une requête ensembliste."
  },
  {
    id: "m16-q14", dialecte: "SQL Server",
    q: "Dans quel cas un curseur (ou une boucle) reste acceptable ?",
    choix: [
      "Pour calculer un total par client",
      "Une tâche d'admin sur peu d'éléments",
      "Pour mettre à jour les prix de 100 000 articles",
      "Jamais, c'est interdit"
    ],
    bonne: 1,
    pourquoi: [
      "Non. GROUP BY le fait en une requête.",
      "Oui. Ex. une sauvegarde de chaque base, ou appeler une procédure par élément, sur un petit nombre de lignes. Quand le traitement ne peut pas s'écrire en une requête et que le volume est faible.",
      "Non. Un UPDATE avec jointure le fait.",
      "Non. Ce n'est pas interdit ; c'est rarement le meilleur choix."
    ],
    retenir: "Curseur : petit volume, traitement impossible en une requête."
  },
  {
    id: "m16-q15", dialecte: "SQL Server",
    q: "Pour charger 1 million de lignes de la table de chargement vers la table finale, un script fait une boucle WHILE avec un INSERT par ligne. Mieux ?",
    choix: [
      "Une boucle FOR à la place de WHILE",
      "Un seul `INSERT … SELECT`",
      "Un curseur rapide (FAST_FORWARD)",
      "Insérer 2 lignes par tour de boucle"
    ],
    bonne: 1,
    pourquoi: [
      "Non. FOR n'existe pas en T-SQL, et ce serait toujours ligne par ligne.",
      "Oui. `INSERT INTO dbo.commande (…) SELECT … FROM stg.commande` : une seule instruction, optimisée par le moteur.",
      "Non. Moins lent qu'un curseur standard, mais toujours ligne par ligne.",
      "Non. Toujours une boucle."
    ],
    retenir: "Charger = INSERT … SELECT."
  },
  {
    id: "m16-q16", dialecte: "SQL Server + Snowflake",
    q: "Un curseur calcule le cumul du CA jour après jour. Quelle requête le remplace ?",
    choixCode: true,
    choix: [
      "`SELECT jour, SUM(ca) FROM ventes_jour GROUP BY jour ORDER BY jour`",
      "`SELECT jour, SUM(ca) OVER (ORDER BY jour) AS cumul FROM ventes_jour`",
      "`SELECT jour, SUM(ca) OVER (PARTITION BY jour) AS cumul FROM ventes_jour`",
      "Aucune, il faut un curseur"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Total par jour, pas cumul.",
      "Oui. La fonction de fenêtrage calcule le cumul en une passe. Préciser `ROWS UNBOUNDED PRECEDING` est encore plus sûr et plus rapide sur SQL Server.",
      "Non. PARTITION BY jour : le total de chaque jour, pas le cumul.",
      "Non. Le fenêtrage existe pour ça."
    ],
    retenir: "Cumul = SUM() OVER (ORDER BY …)."
  },
  {
    id: "m16-q17", dialecte: "SQL Server",
    q: "`SELECT num_cde, dbo.f_libelle_statut(statut) FROM dbo.commande` est lente sur 2 millions de lignes. Pourquoi ?",
    choix: [
      "Le nom de la fonction est trop long",
      "Elle s'exécute une fois par ligne",
      "Les fonctions sont interdites dans SELECT",
      "La colonne statut n'est pas triée"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Une fonction scalaire est souvent exécutée une fois par ligne, comme une mini-boucle cachée (SQL Server 2019 sait parfois l'intégrer, mais pas toujours). Souvent, une jointure vers une table de libellés fait la même chose bien plus vite.",
      "Non. Elles sont permises.",
      "Non."
    ],
    retenir: "Fonction scalaire = boucle cachée."
  },
  {
    id: "m16-q18", dialecte: "SQL Server",
    q: "Par quoi remplacer une fonction scalaire lente qui calcule le prix net d'un article ?",
    choix: [
      "Par un curseur sur les articles",
      "Par une fonction table en ligne",
      "Par une procédure appelée pour chaque ligne",
      "Par une vue avec ORDER BY"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Encore pire.",
      "Oui. `RETURNS TABLE AS RETURN SELECT …`, utilisée avec CROSS APPLY, ou une jointure directe. La fonction en ligne est intégrée à la requête, comme une vue avec paramètres.",
      "Non. Toujours ligne par ligne.",
      "Non."
    ],
    retenir: "Fonction scalaire lente → fonction table en ligne."
  },
  {
    id: "m16-q19", dialecte: "SQL Server",
    q: "Quelle différence entre une fonction table « en ligne » et une fonction table « multi-instructions » ?",
    choix: [
      "Aucune, seul le nom change",
      "Un seul SELECT vs table intermédiaire",
      "La multi-instructions est toujours plus rapide",
      "L'en ligne ne peut pas avoir de paramètres"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. L'en ligne est un seul SELECT intégré à la requête. La multi-instructions remplit une table intermédiaire, et le moteur estime souvent mal son nombre de lignes. Mauvaise estimation = mauvais plan.",
      "Non. C'est souvent l'inverse.",
      "Non. Elle en a."
    ],
    retenir: "Fonction table : en ligne de préférence."
  },
  {
    id: "m16-q20", dialecte: "Standard",
    q: "Un écran fait une requête pour lister 5 000 commandes, puis une requête par commande pour lire son client. Quel est le problème ?",
    choix: [
      "Aucun, chaque requête est rapide",
      "5 001 allers-retours au lieu d'un",
      "Il faudrait une requête par ligne de commande",
      "Il faudrait un index sur le nom du client"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Chaque aller-retour coûte du temps réseau.",
      "Oui. Une seule requête avec une jointure commande-client suffit. Chaque aller-retour coûte du temps réseau, même si la requête est rapide.",
      "Non. Encore plus d'allers-retours.",
      "Non. Le problème est le nombre de requêtes."
    ],
    retenir: "Une requête par élément = lenteur assurée."
  },
  {
    id: "m16-q21", dialecte: "Standard",
    q: "Une vue utilisée par Power BI fait `SELECT * FROM commande` (80 colonnes). Le rapport en utilise 6. Quels problèmes ?",
    choix: [
      "Aucun, Power BI filtre tout seul",
      "Lectures inutiles, rapport fragile",
      "La vue sera plus rapide",
      "Power BI refuse les vues"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Les colonnes sont lues et transférées.",
      "Oui. Lectures inutiles, pas d'index couvrant possible, et le rapport peut casser ou changer si la table évolue. Liste les 6 colonnes utiles.",
      "Non.",
      "Non."
    ],
    retenir: "Lister les colonnes utiles."
  },
  {
    id: "m16-q22", dialecte: "SQL Server",
    q: "La vue `v_article` a été créée avec `SELECT * FROM dbo.article`. On ajoute ensuite la colonne `poids` à `article`. Que montre `SELECT * FROM v_article` ?",
    choix: [
      "La colonne poids apparaît automatiquement",
      "Pas de poids : colonnes figées",
      "Une erreur « vue invalide »",
      "La vue est supprimée"
    ],
    bonne: 1,
    pourquoi: [
      "Non. C'est ce qu'on croit, et c'est faux.",
      "Oui. La vue garde la liste de colonnes du jour de sa création, jusqu'à `sp_refreshview` ou un `ALTER VIEW`. Et si une colonne est supprimée de la table, la vue peut renvoyer une erreur ou des colonnes décalées.",
      "Non. Pas d'erreur dans ce cas : c'est plus sournois.",
      "Non."
    ],
    retenir: "Vue en SELECT * : colonnes figées à la création."
  },
  {
    id: "m16-q23", dialecte: "SQL Server",
    q: "Un collègue met `WITH (NOLOCK)` sur toutes les tables « pour aller plus vite ». Que peut-il arriver ?",
    choix: [
      "Rien, c'est sans risque",
      "Des résultats faux",
      "La table est verrouillée pour tout le monde",
      "Les données sont modifiées"
    ],
    bonne: 1,
    pourquoi: [
      "Non. C'est la croyance répandue.",
      "Oui. Lire des données non validées (ensuite annulées), rater des lignes ou en lire certaines deux fois. Inacceptable pour un rapport financier : le total peut être faux.",
      "Non. C'est l'inverse : on ne pose pas de verrou de lecture.",
      "Non. NOLOCK ne modifie rien."
    ],
    retenir: "NOLOCK = résultats possiblement faux."
  },
  {
    id: "m16-q24", dialecte: "SQL Server",
    q: "Les rapports sont bloqués par les écritures de l'ERP. Quelle solution propre, à la place de NOLOCK partout ?",
    choix: [
      "Arrêter l'ERP pendant les rapports",
      "Activer `READ_COMMITTED_SNAPSHOT`",
      "Mettre les rapports en SERIALIZABLE",
      "Ajouter `TABLOCKX` aux rapports"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Sur la base : les lecteurs lisent la dernière version validée, sans être bloqués. Données justes et pas de blocage. À tester : cela utilise davantage tempdb.",
      "Non. Plus de blocages, pas moins.",
      "Non. Verrou exclusif : bloque tout le monde."
    ],
    retenir: "Lecteurs bloqués → RCSI, pas NOLOCK."
  },
  {
    id: "m16-q25", dialecte: "SQL Server",
    q: "Quelle écriture permet d'utiliser un index sur `date_cde` ?",
    choixCode: true,
    choix: [
      "`WHERE YEAR(date_cde) = 2026`",
      "`WHERE date_cde >= '20260101' AND date_cde < '20270101'`",
      "`WHERE CONVERT(char(4), date_cde, 112) = '2026'`",
      "`WHERE DATEFROMPARTS(YEAR(date_cde), 1, 1) = '20260101'`"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Fonction sur la colonne : scan.",
      "Oui. La colonne reste « nue » : recherche par plage dans l'index.",
      "Non. Fonction sur la colonne.",
      "Non. Fonctions sur la colonne."
    ],
    retenir: "Filtre sur date : une plage, colonne nue."
  },
  {
    id: "m16-q26", dialecte: "SQL Server",
    q: "`code_client` est un VARCHAR(10) indexé. La requête `WHERE code_client = 12345` (sans guillemets) est lente, et plante parfois. Pourquoi ?",
    choix: [
      "Le nombre est trop grand pour un VARCHAR",
      "La colonne est convertie en nombre",
      "Il manque un ORDER BY",
      "L'index est corrompu"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. SQL Server convertit la COLONNE en nombre pour chaque ligne : l'index ne sert plus, et un code contenant une lettre (ex. « C123 ») provoque une erreur de conversion. Écrire `code_client = '12345'` : même type des deux côtés.",
      "Non.",
      "Non."
    ],
    retenir: "Comparer des valeurs du même type que la colonne."
  },
  {
    id: "m16-q27", dialecte: "SQL Server",
    q: "Pour savoir si un client a au moins une commande, quelle écriture exprime le mieux l'intention ?",
    choixCode: true,
    choix: [
      "`IF (SELECT COUNT(*) FROM dbo.commande WHERE client_id = @id) > 0`",
      "`IF EXISTS (SELECT 1 FROM dbo.commande WHERE client_id = @id)`",
      "`IF (SELECT SUM(1) FROM dbo.commande WHERE client_id = @id) > 0`",
      "`IF (SELECT MAX(id) FROM dbo.commande) > 0`"
    ],
    bonne: 1,
    pourquoi: [
      "Non. On demande « combien » alors qu'on veut « est-ce qu'il y en a ».",
      "Oui. EXISTS peut s'arrêter à la première ligne trouvée.",
      "Non. Même problème que COUNT.",
      "Non. Ne regarde pas le client."
    ],
    retenir: "Tester l'existence = EXISTS."
  },
  {
    id: "m16-q28", dialecte: "Standard",
    q: "`WHERE libelle LIKE '%POMPE%'` sur 3 millions d'articles est lente, malgré un index sur `libelle`. Pourquoi ?",
    choix: [
      "LIKE ne fonctionne pas avec les index",
      "Le `%` au début empêche l'index",
      "Le mot est en majuscules",
      "Il faut écrire LIKE en minuscules"
    ],
    bonne: 1,
    pourquoi: [
      "Non. `LIKE 'POMPE%'` (sans % au début) utilise l'index.",
      "Oui. Il faut lire tous les libellés. Pour chercher un mot au milieu d'un texte, on regarde la recherche en texte intégral (full-text).",
      "Non.",
      "Non."
    ],
    retenir: "% au début = pas de recherche dans l'index."
  },
  {
    id: "m16-q29", dialecte: "Standard",
    q: "Quelle écriture est équivalente à `WHERE ISNULL(remise, 0) > 0`, mais permet d'utiliser un index ?",
    choixCode: true,
    choix: [
      "`WHERE remise > 0 OR remise IS NULL`",
      "`WHERE remise > 0`",
      "`WHERE remise <> 0`",
      "`WHERE remise IS NOT NULL`"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Ajoute les lignes sans remise.",
      "Oui. `NULL > 0` donne « inconnu » : la ligne est déjà exclue. ISNULL ne sert à rien ici.",
      "Non. Inclut les remises négatives.",
      "Non. Inclut les remises à 0."
    ],
    retenir: "Une fonction inutile sur une colonne coûte cher."
  },
  {
    id: "m16-q30", dialecte: "SQL Server",
    q: "Sur SQL Server, la comparaison `'A12  ' = 'A12'` (avec des espaces à la fin) donne quoi ?",
    choix: [
      "Faux : les chaînes diffèrent",
      "Vrai, sur SQL Server",
      "Une erreur de conversion",
      "NULL, comparaison impossible"
    ],
    bonne: 1,
    pourquoi: [
      "Non. C'est le réflexe, mais SQL Server complète la chaîne courte avec des espaces avant de comparer.",
      "Oui. SQL Server ignore les espaces de fin dans une comparaison avec =. Écrire `RTRIM(code) = 'A12'` est donc inutile, et empêche l'index. Attention : sur Snowflake, les espaces de fin comptent avec =.",
      "Non.",
      "Non."
    ],
    retenir: "SQL Server : espaces de fin ignorés par =."
  },
  {
    id: "m16-q31", dialecte: "SQL Server",
    q: "Une procédure de recherche fait `WHERE (@client IS NULL OR client_id = @client) AND (@date IS NULL OR date_cde >= @date)`. Elle est parfois très lente. Pourquoi ?",
    choix: [
      "Les paramètres NULL sont interdits",
      "Un seul plan pour tous les cas",
      "OR est interdit dans WHERE",
      "Il manque DISTINCT"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Un seul plan est gardé pour toutes les combinaisons de paramètres : bon pour un cas, mauvais pour les autres. Solutions : `OPTION (RECOMPILE)` ou du SQL dynamique paramétré qui n'ajoute que les filtres utiles.",
      "Non.",
      "Non."
    ],
    retenir: "Recherche « fourre-tout » : RECOMPILE ou SQL dynamique paramétré."
  },
  {
    id: "m16-q32", dialecte: "SQL Server",
    q: "Une requête est rapide dans SSMS, mais lente depuis l'application, avec les mêmes paramètres. Quelle cause classique ?",
    choix: [
      "SSMS triche sur les résultats",
      "Options de session différentes",
      "L'application lit une autre base",
      "Le réseau est toujours en cause"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. SSMS et l'application n'ont pas les mêmes options (ex. `ARITHABORT`) : deux plans différents en cache, compilés pour des paramètres différents (« reniflage » de paramètres). Comparer les deux plans.",
      "Non. Possible, mais ce n'est pas la cause classique.",
      "Non. Pas « toujours » : regarder le plan d'abord."
    ],
    retenir: "Rapide dans SSMS, lent dans l'appli : comparer les plans."
  },
  {
    id: "m16-q33", dialecte: "SQL Server",
    q: "On stocke 500 000 lignes intermédiaires avant une jointure. Variable table (`@t`) ou table temporaire (`#t`) ?",
    choix: [
      "Variable table : toujours plus rapide car en mémoire",
      "Table temporaire : stats et index",
      "Aucune différence entre les deux",
      "Une table permanente dans dbo"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Mythe : les deux sont dans tempdb. Et la variable table n'a pas de statistiques sur ses colonnes.",
      "Oui. Elle a des statistiques et peut être indexée : le moteur estime mieux le nombre de lignes. La variable table convient aux petits volumes.",
      "Non.",
      "Non. Risque de conflits entre utilisateurs, et nettoyage à gérer."
    ],
    retenir: "Gros volume intermédiaire → #table."
  },
  {
    id: "m16-q34", dialecte: "Standard",
    q: "On empile les ventes 2025 (table `ventes_2025`) et 2026 (table `ventes_2026`). Elles ne peuvent pas avoir de lignes en commun. UNION ou UNION ALL ?",
    choix: [
      "UNION, par sécurité",
      "UNION ALL",
      "Peu importe, même coût",
      "JOIN sur l'année"
    ],
    bonne: 1,
    pourquoi: [
      "Non. UNION supprimerait aussi deux ventes réelles identiques (même article, même jour, même montant).",
      "Oui. Pas de recherche de doublons inutile (tri coûteux évité), et deux ventes identiques ne sont pas fusionnées. UNION ALL par défaut ; UNION seulement si on veut vraiment dédoublonner.",
      "Non. UNION ajoute un dédoublonnage.",
      "Non. On empile, on ne relie pas."
    ],
    retenir: "Empiler = UNION ALL par défaut."
  },
  {
    id: "m16-q35", dialecte: "Standard",
    q: "Un collègue ajoute `DISTINCT` « par sécurité » à une requête qui renvoie déjà une ligne par commande (clé primaire). Avis ?",
    choix: [
      "Bonne idée, ça ne coûte rien",
      "Mauvaise idée : coût et bug caché",
      "Obligatoire avec une clé primaire",
      "Ça accélère la requête"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Ça coûte, surtout sur gros volume.",
      "Oui. Coût de tri ou de hachage inutile, et le jour où des doublons apparaîtront, DISTINCT cachera le bug. On veut voir les doublons pour comprendre leur cause.",
      "Non.",
      "Non."
    ],
    retenir: "DISTINCT « par sécurité » = mauvaise sécurité."
  },
  {
    id: "m16-q36", dialecte: "SQL Server",
    q: "Une vue contient `SELECT TOP 100 PERCENT … ORDER BY date_cde`. Le rapport qui lit la vue sans ORDER BY est-il trié ?",
    choix: [
      "Oui, toujours",
      "Non, pas garanti",
      "Oui, grâce au TOP 100 PERCENT",
      "La vue refuse de se créer"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Le moteur peut ignorer ce tri.",
      "Oui. L'ORDER BY d'une vue ne garantit pas l'ordre du résultat final. Il faut mettre ORDER BY dans la requête qui lit la vue.",
      "Non. Le moteur ignore souvent ce tri.",
      "Non. Avec TOP, la création est acceptée : c'est ce qui trompe."
    ],
    retenir: "Le tri se met dans la requête finale."
  },
  {
    id: "m16-q37", dialecte: "SQL Server",
    q: "Pour « être tranquille », un développeur crée un index sur chacune des 40 colonnes de la table commande. Conséquence ?",
    choix: [
      "Toutes les requêtes deviennent rapides",
      "Écritures lentes, index inutiles",
      "Aucune conséquence",
      "Les index se suppriment tout seuls"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Un index sur une seule colonne aide rarement une requête complexe.",
      "Oui. Chaque INSERT, UPDATE ou DELETE doit maintenir 40 index : écritures lentes, stockage multiplié, et la plupart ne servent jamais. On crée les index à partir des requêtes réelles.",
      "Non.",
      "Non."
    ],
    retenir: "Index : selon les requêtes, pas par principe."
  },
  {
    id: "m16-q38", dialecte: "SQL Server",
    q: "`ligne_cde.cde_id` est une clé étrangère vers `commande`. SQL Server crée-t-il un index dessus automatiquement ?",
    choix: [
      "Oui, toujours",
      "Non : il faut souvent le créer",
      "Oui, mais seulement si la table est vide",
      "Les clés étrangères n'ont pas besoin d'index"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Seule la clé primaire (et UNIQUE) crée un index automatiquement.",
      "Oui. Sinon les jointures commande-lignes et les suppressions de commandes deviennent lentes : une suppression doit vérifier les lignes, et sans index c'est un scan complet.",
      "Non.",
      "Non."
    ],
    retenir: "Clé étrangère : penser à l'indexer."
  },
  {
    id: "m16-q39", dialecte: "SQL Server",
    q: "Un écran pagine les commandes avec `OFFSET 200000 ROWS FETCH NEXT 50 ROWS ONLY`. La page 4 000 est très lente. Pourquoi, et que faire ?",
    choix: [
      "OFFSET est buggé sur les grandes tables",
      "Lignes lues puis jetées : paginer par clé",
      "Il faut augmenter FETCH à 500",
      "Il faut enlever ORDER BY"
    ],
    bonne: 1,
    pourquoi: [
      "Non. C'est son fonctionnement normal.",
      "Oui. Le moteur lit et jette 200 000 lignes avant de renvoyer les 50 voulues. Mieux : partir de la dernière clé affichée (`WHERE id > @dernier_id ORDER BY id`) : chaque page coûte pareil.",
      "Non.",
      "Non. OFFSET exige ORDER BY, et la pagination n'aurait plus de sens."
    ],
    retenir: "Pagination profonde → pagination par clé."
  },
  {
    id: "m16-q40", dialecte: "Standard",
    q: "Une requête met 1 seconde en recette (10 000 lignes) et 25 minutes en production (40 millions). Quelle leçon ?",
    choix: [
      "La production est mal configurée",
      "Tester à volume réel, lire le plan",
      "Mettre la requête dans une procédure",
      "Ajouter NOLOCK"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Pas forcément : c'est la requête qui ne passe pas à l'échelle.",
      "Oui. Tester avec un volume réaliste, et lire le plan d'exécution (lignes estimées / réelles) avant la mise en production. Un scan invisible sur 10 000 lignes devient un drame sur 40 millions.",
      "Non. Ça ne change pas le plan.",
      "Non."
    ],
    retenir: "Tester à volume réel, lire le plan."
  },
  {
    id: "m16-q41", dialecte: "Standard",
    q: "Une requête renvoie des doublons après une jointure. Un collègue ajoute DISTINCT et « ça marche ». Pourquoi est-ce risqué ?",
    choix: [
      "DISTINCT est lent, c'est tout",
      "Cause cachée, totaux faux",
      "DISTINCT trie les données",
      "Ce n'est pas risqué"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Le vrai risque est un résultat faux.",
      "Oui. On cache la cause (souvent une jointure 1-N oubliée), et DISTINCT peut aussi fusionner deux lignes réelles identiques. Il faut trouver la table qui multiplie les lignes, et corriger la jointure.",
      "Non. Pas garanti, et ce n'est pas le problème.",
      "Non."
    ],
    retenir: "Doublons : chercher la cause, pas DISTINCT."
  },
  {
    id: "m16-q42", dialecte: "Standard",
    q: "`SELECT * FROM client WHERE id NOT IN (SELECT client_id FROM commande)` renvoie 0 ligne, alors que des clients n'ont jamais commandé. Pourquoi ?",
    choix: [
      "La table client est vide",
      "Un `client_id` NULL dans la liste",
      "NOT IN ne marche pas avec les sous-requêtes",
      "Il faut un index"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Au moins une commande a `client_id` NULL : `NOT IN` avec un NULL dans la liste ne renvoie jamais rien. Utiliser `NOT EXISTS (SELECT 1 FROM commande co WHERE co.client_id = c.id)`.",
      "Non. Elle marche, sauf avec un NULL.",
      "Non."
    ],
    retenir: "NOT IN + sous-requête → NOT EXISTS."
  },
  {
    id: "m16-q43", dialecte: "Standard",
    q: "On veut tous les clients, avec leurs commandes de 2026 s'ils en ont. Pourquoi cette requête perd-elle les clients sans commande ?",
    code: "SELECT cli.nom, cde.num_cde\nFROM client cli\nLEFT JOIN commande cde ON cde.client_id = cli.id\nWHERE cde.date_cde >= '20260101';",
    choix: [
      "Le LEFT JOIN est mal écrit",
      "Le WHERE élimine les NULL",
      "Il faut un RIGHT JOIN",
      "La date est mal écrite"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Le LEFT JOIN est correct ; c'est le WHERE qui l'annule.",
      "Oui. Pour un client sans commande, `cde.date_cde` est NULL : le WHERE l'élimine. Le filtre doit aller dans le ON : `LEFT JOIN commande cde ON cde.client_id = cli.id AND cde.date_cde >= '20260101'`.",
      "Non.",
      "Non. 'AAAAMMJJ' est le format sûr."
    ],
    retenir: "LEFT JOIN : filtre de droite dans le ON."
  },
  {
    id: "m16-q44", dialecte: "Standard",
    q: "Le panier moyen national est calculé comme la moyenne des paniers moyens des agences. Pourquoi est-ce faux ?",
    choix: [
      "Ce n'est pas faux",
      "Chaque agence pèse pareil",
      "Il faut prendre la médiane",
      "Il faut arrondir chaque moyenne"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Sauf si toutes les agences ont exactement le même nombre de ventes.",
      "Oui. Une petite agence (10 ventes) pèse autant qu'une grande (10 000). Il faut diviser le CA total par le nombre total de ventes.",
      "Non. Autre indicateur.",
      "Non. L'erreur reste."
    ],
    retenir: "Pas de moyenne de moyennes : SUM / COUNT globaux."
  },
  {
    id: "m16-q45", dialecte: "Standard",
    q: "Pourquoi ce total des commandes est-il trop élevé ?",
    code: "SELECT SUM(cde.montant_total)\nFROM commande cde\nJOIN ligne_cde lig ON lig.cde_id = cde.id;",
    choix: [
      "SUM est mal utilisé",
      "L'en-tête est compté par ligne",
      "Il manque GROUP BY",
      "La jointure élimine des commandes"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Le montant d'en-tête est répété sur chaque ligne : une commande de 3 lignes est comptée 3 fois. Soit on somme les lignes, soit on somme les en-têtes sans joindre les lignes.",
      "Non. Le problème vient de la jointure.",
      "Non. Elle en multiplie."
    ],
    retenir: "SUM d'un montant d'en-tête après jointure 1-N = total gonflé."
  },
  {
    id: "m16-q46", dialecte: "Standard",
    q: "`SELECT * FROM client WHERE email = NULL` renvoie 0 ligne. Pourquoi ?",
    choix: [
      "Tous les clients ont un email",
      "= NULL n'est jamais vrai",
      "Il faut écrire `= 'NULL'`",
      "NULL n'existe pas en SQL"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Même avec des emails vides, = NULL ne renvoie rien.",
      "Oui. Toute comparaison avec NULL donne « inconnu ». Il faut écrire `WHERE email IS NULL`.",
      "Non. Ça cherche le texte « NULL ».",
      "Non."
    ],
    retenir: "NULL se teste avec IS NULL."
  },
  {
    id: "m16-q47", dialecte: "SQL Server",
    q: "`SELECT TOP 10 * FROM commande` doit donner « les 10 dernières commandes ». Est-ce garanti ?",
    choix: [
      "Oui, les dernières insérées",
      "Non, il faut un ORDER BY",
      "Oui, si la table a une clé primaire",
      "Oui, les 10 premières par ordre alphabétique"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Ça peut sembler marcher, puis changer un jour (nouvel index, parallélisme).",
      "Oui. Sans ORDER BY, l'ordre n'est pas garanti. Il faut `ORDER BY date_cde DESC`.",
      "Non. Même avec une clé primaire, rien n'est garanti sans ORDER BY.",
      "Non."
    ],
    retenir: "TOP sans ORDER BY = résultat au hasard."
  },
  {
    id: "m16-q48", dialecte: "SQL Server",
    q: "`date_cde` est un DATETIME (avec l'heure). Que rate ce filtre ?",
    code: "WHERE date_cde BETWEEN '20260101' AND '20260131'",
    choix: [
      "Rien, tout janvier est inclus",
      "Le 31 janvier après 00:00",
      "Les commandes du 1er janvier",
      "Les commandes du week-end"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. La borne de fin vaut 31/01 à 00:00:00 : les commandes du 31 à 14 h sont exclues. Écrire `date_cde >= '20260101' AND date_cde < '20260201'`.",
      "Non. Le 1er janvier à partir de 00:00 est inclus.",
      "Non."
    ],
    retenir: "Période : >= début ET < lendemain de la fin."
  },
  {
    id: "m16-q49", dialecte: "SQL Server",
    q: "Session en français (`SET LANGUAGE French`). `CAST('2026-01-02' AS DATETIME)` donne quelle date ?",
    choix: [
      "Le 2 janvier 2026",
      "Le 1er février 2026",
      "Une erreur de conversion",
      "Le 26 janvier 2001"
    ],
    bonne: 1,
    pourquoi: [
      "Non. C'est ce qu'on attend… mais pas avec DATETIME en français.",
      "Oui. Pour le type DATETIME, ce format dépend de la langue. Le format 'AAAAMMJJ' (`'20260102'`) est toujours compris de la même façon. Avec DATE et DATETIME2, '2026-01-02' n'a pas ce problème.",
      "Non. La date est valide dans les deux sens.",
      "Non."
    ],
    retenir: "Dates en dur : 'AAAAMMJJ'."
  },
  {
    id: "m16-q50", dialecte: "SQL Server + Snowflake",
    q: "`nb_retours` et `nb_ventes` sont des entiers (5 et 20). Que donne `nb_retours / nb_ventes` ?",
    choix: [
      "0,25 sur les deux moteurs",
      "0 sur SQL Server, 0,25 sur Snowflake",
      "0 sur les deux moteurs (division entière)",
      "Une erreur de type sur SQL Server"
    ],
    bonne: 1,
    pourquoi: [
      "Non. SQL Server divise deux entiers en entier.",
      "Oui. Division entière sur SQL Server ; sur SQL Server, écrire `nb_retours * 1.0 / nb_ventes`. Piège classique lors d'une migration : les résultats changent.",
      "Non. Snowflake renvoie 0,25.",
      "Non."
    ],
    retenir: "SQL Server : entier / entier = entier."
  },
  {
    id: "m16-q51", dialecte: "Standard",
    q: "Le rapport affiche « 1 200 clients avec email », mais la requête fait `COUNT(*)` sur les clients filtrés par pays. Où est l'erreur probable ?",
    choix: [
      "COUNT(*) ne compte pas les NULL",
      "Il faut `COUNT(email)`",
      "COUNT ne marche pas avec WHERE",
      "Il faut COUNT(DISTINCT *)"
    ],
    bonne: 1,
    pourquoi: [
      "Non. C'est l'inverse : COUNT(*) compte toutes les lignes, même pleines de NULL.",
      "Oui. `COUNT(*)` compte toutes les lignes ; `COUNT(email)` ignore les NULL. Attention aux emails vides ('') : ils ne sont pas NULL et seront comptés.",
      "Non.",
      "Non. Cette syntaxe n'existe pas."
    ],
    retenir: "COUNT(*) = lignes. COUNT(col) = valeurs non NULL."
  },
  {
    id: "m16-q52", dialecte: "Standard",
    q: "Un rapport de CA par client fait `GROUP BY cli.nom`. Quel risque ?",
    choix: [
      "Aucun, le nom est unique",
      "Deux homonymes fusionnés",
      "Le tri est faux",
      "Les clients sans nom plantent la requête"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Rien ne garantit qu'un nom est unique.",
      "Oui. Deux clients différents avec le même nom (« Martin Piscines » à Lyon et à Nantes) sont fusionnés en une seule ligne. Grouper sur l'identifiant (`cli.id`), puis afficher le nom.",
      "Non. Le tri n'est pas le sujet.",
      "Non. Ils forment un groupe NULL, sans erreur."
    ],
    retenir: "GROUP BY sur l'identifiant, pas sur le libellé."
  },
  {
    id: "m16-q53", dialecte: "Standard",
    q: "La TVA d'une facture est calculée ligne par ligne et arrondie, puis additionnée. Le rapport, lui, arrondit la TVA du total. Il y a 1 centime d'écart. Qui a raison ?",
    choix: [
      "Toujours le rapport",
      "Celui qui suit la règle de l'ERP",
      "Toujours la facture, quelle que soit la règle",
      "Personne, 1 centime ne compte pas"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. La règle d'arrondi est une règle métier, à reproduire exactement dans le SQL. Arrondir avant ou après la somme ne donne pas le même résultat. Il faut savoir où l'ERP arrondit.",
      "Non. Le rapport doit suivre la règle, pas l'inverse par principe.",
      "Non. En comptabilité, 1 centime d'écart doit être expliqué."
    ],
    retenir: "Arrondi : même règle et même moment que l'ERP."
  },
  {
    id: "m16-q54", dialecte: "SQL Server + Snowflake",
    q: "Quel type choisir pour stocker un montant en euros ?",
    choix: [
      "FLOAT (nombre à virgule)",
      "DECIMAL(18,2)",
      "VARCHAR(20) formaté",
      "INT en euros entiers"
    ],
    bonne: 1,
    pourquoi: [
      "Non. FLOAT est approximatif : 0,1 + 0,2 peut ne pas donner exactement 0,3.",
      "Oui. NUMBER(18,2) sur Snowflake. Valeur exacte au centime. Prévoir plus de décimales pour des prix unitaires si besoin.",
      "Non. Pas de calcul, tri faux, valeurs invalides possibles.",
      "Non. Les centimes sont perdus."
    ],
    retenir: "Montants : DECIMAL / NUMBER, jamais FLOAT."
  },
  {
    id: "m16-q55", dialecte: "Standard",
    q: "Dans une ancienne table, les dates sont stockées en texte au format '26/10/2026'. Quels problèmes ?",
    choix: [
      "Aucun, c'est lisible",
      "Tri faux, dates invalides",
      "Seulement un problème de place",
      "Le format change selon le serveur"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Lisible pour un humain, pas pour un moteur.",
      "Oui. Tri faux (le 01/11 passe avant le 26/10), dates invalides possibles ('31/02/2026'), pas de fonctions de date sans conversion. Une date se stocke dans un type DATE.",
      "Non. Ce n'est pas le principal problème.",
      "Non. Le texte ne change pas ; c'est son usage qui pose problème."
    ],
    retenir: "Une date = type DATE."
  },
  {
    id: "m16-q56", dialecte: "SQL Server",
    q: "Que renvoie ce code ?",
    code: "DECLARE @region VARCHAR(3) = NULL;\nSELECT ISNULL(@region, 'Inconnue');",
    choix: [
      "Inconnue",
      "Inc",
      "NULL",
      "Une erreur"
    ],
    bonne: 1,
    pourquoi: [
      "Non. C'est ce qu'on attend, mais ISNULL prend le type du 1er argument.",
      "Oui. Le résultat est un VARCHAR(3) : le texte est coupé, sans erreur. `COALESCE` renverrait 'Inconnue'.",
      "Non. ISNULL remplace bien le NULL.",
      "Non. Aucune erreur : c'est ce qui rend le piège dangereux."
    ],
    retenir: "ISNULL prend le type du 1er argument."
  },
  {
    id: "m16-q57", dialecte: "SQL Server",
    q: "Après l'INSERT d'une commande, un script récupère son id avec `SELECT MAX(id) FROM dbo.commande`. Quel risque ?",
    choix: [
      "Aucun, MAX(id) est fiable",
      "On peut récupérer l'id d'un autre",
      "MAX ne marche pas sur les id",
      "La commande est insérée deux fois"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Ça marche en test… et pas en production avec plusieurs utilisateurs.",
      "Oui. Si un autre utilisateur insère une commande au même moment, on récupère SON id. Utiliser `SCOPE_IDENTITY()` ou `OUTPUT inserted.id`. Sinon, on lierait les lignes au mauvais en-tête.",
      "Non.",
      "Non."
    ],
    retenir: "Nouvel id : SCOPE_IDENTITY() ou OUTPUT, jamais MAX."
  },
  {
    id: "m16-q58", dialecte: "SQL Server",
    q: "Après un INSERT dans `commande`, `@@IDENTITY` renvoie un id inattendu. La table a un trigger qui écrit dans une table d'audit (avec son propre IDENTITY). Explication ?",
    choix: [
      "Bug de SQL Server",
      "Il inclut l'id créé par le trigger",
      "Le trigger a supprimé la commande",
      "L'audit a pris l'id de la commande"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Comportement documenté.",
      "Oui. `@@IDENTITY` renvoie le dernier id créé dans la session, y compris par le trigger. `SCOPE_IDENTITY()` renvoie celui de ta propre instruction. Le code a pu marcher des années, jusqu'à l'ajout du trigger.",
      "Non.",
      "Non. Chaque table a ses propres id."
    ],
    retenir: "SCOPE_IDENTITY(), pas @@IDENTITY."
  },
  {
    id: "m16-q59", dialecte: "Standard",
    q: "Les numéros de lot sont stockés en texte ('9', '10', '11'). `WHERE num_lot > '9'` ne renvoie rien. Pourquoi ?",
    choix: [
      "Il n'y a pas de lot après 9",
      "Ordre alphabétique : '10' < '9'",
      "> ne marche pas sur du texte",
      "Les guillemets sont en trop"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Comparaison de textes, caractère par caractère : '1' < '9', donc '10' < '9'. Stocker des nombres dans un type numérique, ou compléter avec des zéros ('009', '010').",
      "Non. Il marche, mais dans l'ordre alphabétique.",
      "Non. Sans guillemets, conversion implicite de la colonne."
    ],
    retenir: "Texte : ordre alphabétique, pas numérique."
  },
  {
    id: "m16-q60", dialecte: "SQL Server",
    q: "Un traitement de nuit appelle `GETDATE()` dans 5 instructions différentes pour calculer « hier ». Il démarre à 23 h 59. Quel risque ?",
    choix: [
      "Aucun, c'est le même jour",
      "Après minuit, « hier » change",
      "GETDATE() est interdit dans un traitement",
      "GETDATE() renvoie toujours minuit"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Certaines instructions s'exécutent après minuit : elles calculent un autre « hier ». Capturer la date une seule fois : `DECLARE @hier DATE = DATEADD(day, -1, CAST(GETDATE() AS DATE));` puis utiliser @hier partout.",
      "Non.",
      "Non. Il renvoie la date et l'heure."
    ],
    retenir: "Date de référence : capturée une fois."
  },
  {
    id: "m16-q61", dialecte: "Standard",
    q: "Avant un DELETE en production, quel est le premier réflexe ?",
    choix: [
      "Lancer le DELETE et vérifier après",
      "Un SELECT avec le même WHERE",
      "Prévenir les utilisateurs après coup",
      "Désactiver les index de la table"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Trop tard si le WHERE est faux.",
      "Oui. Exactement le même WHERE, pour vérifier le nombre et le contenu des lignes. Si le SELECT montre 12 lignes alors qu'on en attend 3, on s'arrête.",
      "Non.",
      "Non. Aucun rapport."
    ],
    retenir: "SELECT d'abord, avec le même WHERE."
  },
  {
    id: "m16-q62", dialecte: "SQL Server",
    q: "Dans ce script, à quoi sert le test sur `@@ROWCOUNT` ?",
    code: "BEGIN TRAN;\nUPDATE dbo.facture SET statut = 'ANNULEE'\nWHERE num_facture = 'F2026-0042';\nIF @@ROWCOUNT <> 1\n    ROLLBACK;\nELSE\n    COMMIT;",
    choix: [
      "À compter les factures de la table",
      "Vérifier qu'1 seule ligne a changé",
      "À accélérer l'UPDATE",
      "À rien, @@ROWCOUNT vaut toujours 1"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Il donne le nombre de lignes touchées par la dernière instruction.",
      "Oui. Sinon tout est annulé. Protection contre un WHERE trop large (ou une facture introuvable).",
      "Non.",
      "Non."
    ],
    retenir: "Contrôler le nombre de lignes avant COMMIT."
  },
  {
    id: "m16-q63", dialecte: "SQL Server",
    q: "Dans SSMS, on sélectionne à la souris seulement la ligne `UPDATE dbo.article SET prix = 0` (la ligne WHERE est en dessous, non sélectionnée), puis F5. Que se passe-t-il ?",
    choix: [
      "SSMS exécute tout le script",
      "Tous les prix passent à 0",
      "SSMS refuse un UPDATE sans WHERE",
      "Rien, il faut un point-virgule"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Avec une sélection, seule la sélection part.",
      "Oui. SSMS exécute seulement la sélection. D'où les réflexes : transaction ouverte, contrôle du nombre de lignes, et WHERE écrit avant le SET.",
      "Non. Aucune protection par défaut.",
      "Non. Le point-virgule n'est pas obligatoire ici."
    ],
    retenir: "SSMS : la sélection seule est exécutée."
  },
  {
    id: "m16-q64", dialecte: "SQL Server",
    q: "Le matin, des utilisateurs sont bloqués. On découvre un `BEGIN TRAN` lancé hier dans SSMS, jamais validé. Quel est le problème ?",
    choix: [
      "Aucun, la transaction s'est validée seule",
      "Transaction ouverte : verrous gardés",
      "Le serveur a redémarré",
      "SSMS a supprimé les données"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Pas de validation automatique.",
      "Oui. Ses verrous bloquent les autres. Vérifier avec `@@TRANCOUNT` (dans sa fenêtre) ou `DBCC OPENTRAN`. Réflexe : toujours finir par COMMIT ou ROLLBACK.",
      "Non.",
      "Non."
    ],
    retenir: "Transaction ouverte = verrous gardés."
  },
  {
    id: "m16-q65", dialecte: "SQL Server",
    q: "`UPDATE a SET a.prix = t.prix FROM dbo.article a JOIN dbo.tarif t ON t.code = a.code`. La table tarif contient 2 prix pour le même code. Que se passe-t-il ?",
    choix: [
      "Une erreur s'affiche",
      "Un des deux prix, au hasard",
      "L'article prend la moyenne des deux prix",
      "L'article est mis à jour deux fois, le 2e prix gagne toujours"
    ],
    bonne: 1,
    pourquoi: [
      "Non. C'est le danger : pas d'alerte.",
      "Oui. Aucune erreur : l'article prend un des deux prix, sans qu'on sache lequel. Vérifier avant que la source est unique sur la clé de jointure (GROUP BY code HAVING COUNT(*) > 1).",
      "Non.",
      "Non. L'ordre n'est pas garanti."
    ],
    retenir: "UPDATE avec jointure : source unique sur la clé."
  },
  {
    id: "m16-q66", dialecte: "SQL Server",
    q: "Il faut supprimer 20 millions de lignes d'historique en production. Meilleure approche ?",
    choix: [
      "Un seul DELETE en pleine journée",
      "Par lots, en heures creuses",
      "Un curseur ligne par ligne",
      "Supprimer la table et la recréer"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Journal énorme, verrous sur toute la table, utilisateurs bloqués longtemps.",
      "Oui. `DELETE TOP (50000) … WHERE …` dans une boucle. Ici, la boucle est justifiée : chaque lot reste petit et court.",
      "Non. Beaucoup trop lent.",
      "Non. On perdrait les lignes à garder."
    ],
    retenir: "Gros DELETE → par lots."
  },
  {
    id: "m16-q67", dialecte: "SQL Server",
    q: "Avant une correction massive de 3 000 prix en production, que prévoir pour pouvoir revenir en arrière ?",
    choix: [
      "Rien, on fera attention",
      "Sauvegarder les lignes avant",
      "Faire une capture d'écran",
      "Noter les anciens prix sur papier"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Ex. `SELECT … INTO dbo.svg_article_20261026 FROM dbo.article WHERE …` avant l'UPDATE. En cas d'erreur, un UPDATE depuis cette table restaure les anciennes valeurs.",
      "Non. Inexploitable pour 3 000 lignes.",
      "Non."
    ],
    retenir: "Correction massive : sauvegarde des lignes avant."
  },
  {
    id: "m16-q68", dialecte: "SQL Server",
    q: "Comment garder automatiquement l'ancien et le nouveau prix pendant un UPDATE ?",
    choix: [
      "Avec deux SELECT, avant et après",
      "Avec la clause `OUTPUT` de l'UPDATE",
      "Avec un ORDER BY dans l'UPDATE",
      "Impossible en une seule instruction"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Possible, mais lourd et risqué si les données bougent entre les deux.",
      "Oui. `OUTPUT deleted.prix, inserted.prix INTO dbo.journal_prix` : `deleted` = avant, `inserted` = après, dans la même instruction.",
      "Non.",
      "Non."
    ],
    retenir: "OUTPUT = trace de la modification."
  },
  {
    id: "m16-q69", dialecte: "Standard",
    q: "Un script de correction n'a jamais été lancé ailleurs qu'en production. Que manque-t-il ?",
    choix: [
      "Rien, il a marché",
      "Un test sur une copie récente",
      "Des commentaires en anglais",
      "Un ORDER BY final"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Sur une copie récente des données (recette), pour vérifier le résultat et la durée avant la production. Sur Snowflake, un clone (`CLONE`) donne une copie de test en quelques secondes.",
      "Non.",
      "Non."
    ],
    retenir: "Tester sur une copie avant la production."
  },
  {
    id: "m16-q70", dialecte: "Standard",
    q: "Un utilisateur demande par téléphone de corriger « vite » un montant de facture directement en base. Bonne pratique ?",
    choix: [
      "Le faire tout de suite dans SSMS",
      "Ticket, script relu, avoir si besoin",
      "Refuser toute correction",
      "Demander le mot de passe de l'utilisateur"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Pas de trace, pas de validation : risque d'audit et d'incohérence comptable.",
      "Oui. Un ticket (demande écrite, validation), un script relu et conservé, et vérifier si l'ERP propose une correction fonctionnelle. Une facture validée se corrige souvent par un avoir, pas par un UPDATE.",
      "Non. On encadre, on ne bloque pas.",
      "Non. Jamais."
    ],
    retenir: "Correction en base : ticket, script, validation."
  },
  {
    id: "m16-q71", dialecte: "SQL Server",
    q: "Pourquoi `TRUNCATE TABLE dbo.commande` échoue-t-il, alors que `DELETE FROM dbo.commande` fonctionne ?",
    choix: [
      "TRUNCATE est désactivé en production",
      "Une clé étrangère la référence",
      "La table est trop grande",
      "TRUNCATE exige un WHERE"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. La table est référencée par une clé étrangère (ex. depuis ligne_cde) : TRUNCATE est refusé dans ce cas. TRUNCATE remet aussi le compteur IDENTITY à zéro et n'accepte pas de WHERE. À réserver aux tables de chargement.",
      "Non. TRUNCATE est justement rapide sur les grandes tables.",
      "Non. TRUNCATE n'accepte pas de WHERE."
    ],
    retenir: "TRUNCATE : tables de chargement, pas tables métier."
  },
  {
    id: "m16-q72", dialecte: "SQL Server",
    q: "Une procédure ouvre une transaction. L'application coupe l'appel après 30 secondes (délai dépassé). Sans `SET XACT_ABORT ON`, que peut-il arriver ?",
    choix: [
      "Tout est annulé proprement",
      "Transaction ouverte, verrous gardés",
      "La procédure continue jusqu'à la fin",
      "Les données sont validées automatiquement"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Pas sans XACT_ABORT.",
      "Oui. La transaction peut rester ouverte sur la connexion, avec ses verrous, et bloquer les autres utilisateurs. Avec `SET XACT_ABORT ON` en tête de procédure, l'interruption annule la transaction.",
      "Non. L'exécution est arrêtée.",
      "Non."
    ],
    retenir: "Procédure avec transaction : SET XACT_ABORT ON."
  },
  {
    id: "m16-q73", dialecte: "SQL Server",
    q: "Un bloc CATCH fait `ROLLBACK` puis s'arrête, sans rien d'autre. Le job SQL Agent affiche « Réussi », mais les données ne sont pas chargées. Que manque-t-il ?",
    choix: [
      "Un COMMIT dans le CATCH",
      "Un `THROW;` final",
      "Un deuxième bloc TRY imbriqué",
      "Un RETURN 0 à la fin du CATCH"
    ],
    bonne: 1,
    pourquoi: [
      "Non. On validerait une transaction en erreur.",
      "Oui. À la fin du CATCH (et idéalement une écriture dans une table de log), pour que l'erreur remonte au job. Une erreur « avalée » est pire qu'une erreur visible : personne n'est prévenu.",
      "Non.",
      "Non. RETURN 0 dit même « succès »."
    ],
    retenir: "CATCH : annuler, tracer, puis THROW."
  },
  {
    id: "m16-q74", dialecte: "SQL Server",
    q: "Pourquoi écrire `IF @@TRANCOUNT > 0 ROLLBACK;` plutôt que `ROLLBACK;` seul dans un bloc CATCH ?",
    choix: [
      "Par habitude, sans raison",
      "Éviter une 2e erreur sans transaction",
      "Pour valider la transaction",
      "Pour accélérer le ROLLBACK"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. L'erreur a pu arriver avant le BEGIN TRAN, ou la transaction est déjà annulée : un ROLLBACK sans transaction ouverte provoque une nouvelle erreur, qui masquerait la vraie cause.",
      "Non. ROLLBACK ne valide jamais.",
      "Non."
    ],
    retenir: "ROLLBACK seulement si une transaction est ouverte."
  },
  {
    id: "m16-q75", dialecte: "SQL Server",
    q: "Un MERGE de synchronisation des tarifs échoue : « tentative de mise à jour de la même ligne plus d'une fois ». Cause ?",
    choix: [
      "MERGE est buggé",
      "Doublons de clé dans la source",
      "La table cible est vide",
      "Il manque un ORDER BY dans le MERGE"
    ],
    bonne: 1,
    pourquoi: [
      "Non. C'est une protection utile.",
      "Oui. La source contient plusieurs lignes pour la même clé cible : il faut la dédoublonner avant. Contrairement à UPDATE … FROM, MERGE refuse ce cas au lieu de choisir au hasard.",
      "Non.",
      "Non."
    ],
    retenir: "MERGE : source unique sur la clé."
  },
  {
    id: "m16-q76", dialecte: "SQL Server",
    q: "Un script de déploiement contient `CREATE VIEW dbo.v_ca_client …`. Il plante si on le relance. Que faire ?",
    choix: [
      "Le lancer une seule fois et ne jamais se tromper",
      "`CREATE OR ALTER VIEW`",
      "Supprimer la base avant",
      "Changer le nom de la vue à chaque fois"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Un déploiement doit pouvoir être rejoué.",
      "Oui. Le script devient relançable. Disponible depuis SQL Server 2016 SP1. Sur Snowflake : `CREATE OR REPLACE VIEW`.",
      "Non.",
      "Non."
    ],
    retenir: "Scripts relançables (idempotents)."
  },
  {
    id: "m16-q77", dialecte: "SQL Server",
    q: "Comment écrire proprement la suppression d'une table de travail qui n'existe peut-être pas ?",
    choixCode: true,
    choix: [
      "`DROP TABLE stg.tmp_import;`",
      "`DROP TABLE IF EXISTS stg.tmp_import;`",
      "`DELETE stg.tmp_import;`",
      "`TRUNCATE TABLE IF EXISTS stg.tmp_import;`"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Erreur si la table n'existe pas.",
      "Oui. Pas d'erreur si elle n'existe pas (SQL Server 2016 et plus).",
      "Non. Vide la table, ne la supprime pas, et plante si elle n'existe pas.",
      "Non. Cette syntaxe n'existe pas."
    ],
    retenir: "DROP … IF EXISTS."
  },
  {
    id: "m16-q78", dialecte: "SQL Server",
    q: "Comment ajouter la colonne `devise` à `commande` dans un script relançable ?",
    choixCode: true,
    choix: [
      "`ALTER TABLE dbo.commande ADD devise CHAR(3);`",
      "`IF COL_LENGTH('dbo.commande', 'devise') IS NULL ALTER TABLE dbo.commande ADD devise CHAR(3);`",
      "`IF OBJECT_ID('dbo.commande.devise') IS NULL ALTER TABLE dbo.commande ADD devise CHAR(3);`",
      "`ALTER TABLE dbo.commande ADD IF NOT EXISTS devise CHAR(3);`"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Erreur au 2e lancement : la colonne existe déjà.",
      "Oui. `COL_LENGTH` renvoie NULL si la colonne n'existe pas.",
      "Non. OBJECT_ID cherche des objets (tables, vues…), pas des colonnes : il renvoie toujours NULL ici, donc erreur au 2e lancement.",
      "Non. N'existe pas sur SQL Server (Snowflake, lui, accepte `ADD COLUMN IF NOT EXISTS`)."
    ],
    retenir: "Ajout de colonne relançable : tester avant."
  },
  {
    id: "m16-q79", dialecte: "Standard",
    q: "Pourquoi versionner les scripts SQL (vues, procédures) dans Git ?",
    choix: [
      "Pour faire comme les développeurs",
      "Historique, relecture, retour arrière",
      "Pour que SQL Server soit plus rapide",
      "Git remplace les sauvegardes de la base"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Historique (qui, quand, pourquoi), relecture avant déploiement, retour à une version précédente, et même script en recette puis en production. Sans Git, la « vraie » version est celle de la production… que personne n'a relue.",
      "Non.",
      "Non. Git garde le code, pas les données."
    ],
    retenir: "Le code SQL est du code : Git."
  },
  {
    id: "m16-q80", dialecte: "Standard",
    q: "Une procédure de 2 000 lignes charge les commandes, calcule les marges, envoie des alertes et purge l'historique. Problème ?",
    choix: [
      "Aucun, tout est au même endroit",
      "Trop de responsabilités : découper",
      "Elle est trop rapide",
      "Il faut la transformer en vue"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Difficile à lire, à tester et à relancer en partie. Découper en procédures (une par étape), appelées par une procédure chef d'orchestre. Si la purge plante, on peut la relancer seule.",
      "Non.",
      "Non. Une vue ne peut pas modifier de données."
    ],
    retenir: "Une procédure = une responsabilité."
  },
  {
    id: "m16-q81", dialecte: "SQL Server",
    q: "À quoi sert `SET NOCOUNT ON` au début d'une procédure ?",
    choix: [
      "À désactiver COUNT(*)",
      "Masquer « (n lignes affectées) »",
      "À compter les lignes plus vite",
      "À empêcher les modifications"
    ],
    bonne: 1,
    pourquoi: [
      "Non. COUNT(*) fonctionne toujours.",
      "Oui. Moins de trafic, et certains programmes appelants ne confondent plus ces messages avec un résultat. Bonne pratique standard en tête de procédure.",
      "Non.",
      "Non."
    ],
    retenir: "Procédure : SET NOCOUNT ON."
  },
  {
    id: "m16-q82", dialecte: "SQL Server",
    q: "Les procédures de l'entrepôt lisent `ERP_PROD.dbo.client` (nom de base écrit en dur). Quel problème au moment de tester en recette ?",
    choix: [
      "Aucun, la base est la même",
      "Elles lisent la PRODUCTION",
      "La procédure est refusée en recette",
      "Les noms de base sont interdits"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. En recette, les procédures lisent quand même la base de PRODUCTION. Utiliser un synonyme (`CREATE SYNONYM dbo.erp_client FOR …`) défini différemment dans chaque environnement.",
      "Non. Elle marche… sur la mauvaise base.",
      "Non."
    ],
    retenir: "Pas de nom de base en dur : synonymes."
  },
  {
    id: "m16-q83", dialecte: "SQL Server",
    q: "Quel est le danger de ce SQL dynamique ?",
    code: "SET @sql = 'SELECT * FROM dbo.client WHERE nom = ''' + @nom + '''';\nEXEC (@sql);",
    choix: [
      "Il est trop lent",
      "Injection SQL",
      "Les guillemets sont mal comptés",
      "EXEC est interdit en procédure"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Le vrai danger est la sécurité.",
      "Oui. Si @nom contient `x'; DROP TABLE dbo.client; --`, la commande est exécutée. Utiliser `sp_executesql` avec un paramètre : `EXEC sp_executesql N'SELECT … WHERE nom = @nom', N'@nom NVARCHAR(100)', @nom = @nom;`",
      "Non. Ils sont corrects : c'est bien le contenu de @nom qui pose problème.",
      "Non."
    ],
    retenir: "SQL dynamique : paramètres, jamais de concaténation de saisies."
  },
  {
    id: "m16-q84", dialecte: "SQL Server",
    q: "Une procédure reçoit un nom de table en paramètre pour du SQL dynamique. Un nom de table ne peut pas être passé comme paramètre de `sp_executesql`. Comment se protéger ?",
    choix: [
      "Concaténer le nom tel quel",
      "Liste autorisée + `QUOTENAME`",
      "Mettre le nom en majuscules",
      "Utiliser NOLOCK sur la table"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Injection possible.",
      "Oui. Vérifier que la table existe (liste autorisée ou `OBJECT_ID`), et l'entourer avec `QUOTENAME(@table)` : crochets ajoutés, caractères dangereux neutralisés.",
      "Non. Aucune protection.",
      "Non."
    ],
    retenir: "Nom d'objet dynamique : liste autorisée + QUOTENAME."
  },
  {
    id: "m16-q85", dialecte: "SQL Server",
    q: "Un trigger sur `commande` fait `SELECT @id = id FROM inserted;` puis met à jour le stock pour @id. Un import insère 500 commandes d'un coup. Que se passe-t-il ?",
    choix: [
      "Le trigger s'exécute 500 fois",
      "1 commande traitée sur 500",
      "L'import est refusé",
      "Tout fonctionne"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Un trigger SQL Server s'exécute une fois par instruction, pas par ligne.",
      "Oui. Le trigger s'exécute UNE fois ; @id ne contient qu'une des 500 commandes : 499 stocks ne sont pas mis à jour. Un trigger doit traiter `inserted` comme un ensemble (UPDATE … FROM inserted).",
      "Non. Aucune erreur : c'est ce qui rend le bug invisible.",
      "Non. Ça marche seulement quand on insère une ligne à la fois."
    ],
    retenir: "Trigger : traiter inserted comme un ensemble."
  },
  {
    id: "m16-q86", dialecte: "Standard",
    q: "Une règle de calcul importante (remise automatique) est cachée dans un trigger. Quel est l'inconvénient ?",
    choix: [
      "Aucun, c'est automatique",
      "Règle invisible, difficile à déboguer",
      "Les triggers sont plus rapides que tout",
      "Les triggers sont interdits"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Personne ne la voit en lisant le code de l'application ou des procédures : comportements « magiques ». Les triggers conviennent à l'audit ou à des contrôles simples ; les règles métier vont dans des procédures visibles.",
      "Non.",
      "Non."
    ],
    retenir: "Logique métier : visible, pas cachée dans un trigger."
  },
  {
    id: "m16-q87", dialecte: "SQL Server",
    q: "Comment organiser un entrepôt SQL Server pour séparer le chargement, les données propres et ce que voient les utilisateurs ?",
    choix: [
      "Tout dans dbo",
      "Un schéma par couche",
      "Une base par table",
      "Des préfixes de couleurs"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Mélange et droits difficiles à gérer.",
      "Oui. `stg`, `dwh`, `rpt`, et des droits par schéma (`GRANT SELECT ON SCHEMA::rpt TO role_bi`). Les utilisateurs Power BI ne voient que `rpt`.",
      "Non.",
      "Non."
    ],
    retenir: "Un schéma par couche, des droits par schéma."
  },
  {
    id: "m16-q88", dialecte: "Standard",
    q: "Que mettre dans l'en-tête d'une procédure importante ?",
    choix: [
      "Rien, le code suffit",
      "Objectif, paramètres, règles, référence",
      "L'historique complet ligne par ligne",
      "Le mot de passe de connexion"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Son objectif, ses paramètres, les règles métier clés et la référence du ticket ou de la spécification. Le détail des modifications, lui, est dans Git.",
      "Non. C'est le rôle de Git.",
      "Non. Jamais de mot de passe dans le code."
    ],
    retenir: "En-tête : objectif, paramètres, règles, référence."
  },
  {
    id: "m16-q89", dialecte: "Snowflake",
    q: "Un warehouse d'exploration a `AUTO_SUSPEND = 3600`. Les analystes lancent quelques requêtes par jour. Quel est le problème ?",
    choix: [
      "Aucun, c'est le réglage conseillé",
      "Jusqu'à 1 h payée pour rien",
      "Le warehouse ne redémarrera pas",
      "Les requêtes seront fausses"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Après chaque requête, le warehouse reste allumé jusqu'à une heure pour rien : ces minutes sont facturées. Un AUTO_SUSPEND de 60 secondes suffit souvent ; avec AUTO_RESUME, il redémarre tout seul.",
      "Non.",
      "Non."
    ],
    retenir: "Snowflake : AUTO_SUSPEND court."
  },
  {
    id: "m16-q90", dialecte: "Snowflake",
    q: "Le chargement de nuit, Power BI et les analystes utilisent le même warehouse. Pourquoi en créer un par usage ?",
    choix: [
      "C'est obligatoire",
      "Isolation et suivi des coûts",
      "Pour avoir plus de stockage",
      "Pour que les données soient copiées"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Les usages ne se gênent pas, et on sait combien coûte chacun (chargement, BI, exploration). Chaque warehouse a sa taille et son suivi de crédits.",
      "Non. Le stockage est séparé du calcul.",
      "Non. Tous lisent les mêmes données."
    ],
    retenir: "Un warehouse par usage."
  },
  {
    id: "m16-q91", dialecte: "Snowflake",
    q: "Comment éviter une mauvaise surprise sur la facture Snowflake (requête folle qui tourne tout le week-end) ?",
    choix: [
      "Regarder la facture en fin de mois",
      "Un « resource monitor »",
      "Supprimer les warehouses le vendredi",
      "Utiliser NOLOCK sur les tables"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Trop tard.",
      "Oui. Avec un quota de crédits : alerte à 80 %, suspension du warehouse à 100 %. On peut aussi limiter la durée des requêtes (`STATEMENT_TIMEOUT_IN_SECONDS`).",
      "Non.",
      "Non. N'existe pas sur Snowflake."
    ],
    retenir: "Resource monitor = garde-fou financier."
  },
  {
    id: "m16-q92", dialecte: "Snowflake",
    q: "Sur Snowflake, pourquoi `SELECT code, libelle FROM article` coûte-t-il moins que `SELECT * FROM article` (120 colonnes) ?",
    choix: [
      "Ce n'est pas le cas",
      "Stockage par colonnes",
      "SELECT * est interdit sur Snowflake",
      "Les petites requêtes sont gratuites"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Seules les colonnes demandées sont lues. Moins de colonnes = moins de données lues = moins de temps de warehouse.",
      "Non.",
      "Non."
    ],
    retenir: "Snowflake : ne lire que les colonnes utiles."
  },
  {
    id: "m16-q93", dialecte: "Snowflake",
    q: "Sur Snowflake, la clé primaire déclarée sur `client(code)` laisse passer des doublons. Que faire ?",
    choix: [
      "Rien, Snowflake les supprime la nuit",
      "Des contrôles après chaque chargement",
      "Recréer la clé primaire",
      "Passer en SQL Server"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Ex. `SELECT code, COUNT(*) FROM client GROUP BY code HAVING COUNT(*) > 1`, et les orphelins avec un LEFT JOIN. Sur les tables standard, Snowflake n'applique pas PRIMARY KEY, UNIQUE ni FOREIGN KEY (seul NOT NULL est appliqué).",
      "Non. Elle ne serait toujours pas appliquée.",
      "Non."
    ],
    retenir: "Snowflake : contraintes déclaratives → contrôles à écrire."
  },
  {
    id: "m16-q94", dialecte: "Snowflake",
    q: "Une requête Snowflake est lente. Avant d'agrandir le warehouse, que regarder ?",
    choix: [
      "Rien, agrandir directement",
      "Le Query Profile",
      "La couleur de l'interface",
      "Le nombre d'utilisateurs connectés"
    ],
    bonne: 1,
    pourquoi: [
      "Non. On paie plus pour une requête peut-être mal écrite.",
      "Oui. Partitions lues sur le total (élagage), débordement sur disque (spilling), jointure qui multiplie les lignes. Ça se corrige dans la requête, pas avec un plus gros warehouse.",
      "Non.",
      "Non."
    ],
    retenir: "Query Profile avant de payer plus."
  },
  {
    id: "m16-q95", dialecte: "Snowflake",
    q: "Un script de déploiement contient `CREATE OR REPLACE TABLE dwh.commande (…)`. On le relance en production. Que se passe-t-il ?",
    choix: [
      "Seules les nouvelles colonnes sont ajoutées",
      "Table remplacée par une table vide",
      "Rien, la table existe déjà",
      "Une erreur s'affiche"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Ce n'est pas un ALTER.",
      "Oui. Les données disparaissent (récupérables un temps grâce au Time Travel), et les droits aussi, sauf avec `COPY GRANTS`. Pour une table : `CREATE TABLE IF NOT EXISTS` puis des ALTER.",
      "Non. REPLACE remplace.",
      "Non. Aucune erreur : c'est le danger."
    ],
    retenir: "CREATE OR REPLACE TABLE = table vide."
  },
  {
    id: "m16-q96", dialecte: "Snowflake",
    q: "Sur Snowflake, un DELETE sans WHERE a vidé la table `tarif` il y a 20 minutes. Comment récupérer les données ?",
    choix: [
      "Impossible après un DELETE",
      "Avec le Time Travel (`AT`)",
      "Avec UNDROP TABLE tarif",
      "En redémarrant le warehouse"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Possible tant qu'on est dans la durée de conservation (1 jour par défaut).",
      "Oui. `INSERT INTO tarif SELECT * FROM tarif AT(OFFSET => -60*30);` (l'état d'il y a 30 minutes). Ou une copie : `CREATE TABLE tarif_svg CLONE tarif AT(OFFSET => -1800);`",
      "Non. UNDROP sert pour une table supprimée (DROP), pas vidée.",
      "Non."
    ],
    retenir: "Snowflake : Time Travel pour revenir en arrière."
  },
  {
    id: "m16-q97", dialecte: "Snowflake",
    q: "On veut tester une grosse correction sur les données de production, sans risque et sans attendre une copie de plusieurs heures. Sur Snowflake ?",
    choix: [
      "Tester directement en production",
      "Un clone de la base",
      "Exporter en CSV puis réimporter",
      "Impossible sans attendre"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. `CREATE DATABASE recette CLONE prod;` : copie instantanée, qui ne coûte du stockage que pour les données modifiées ensuite. Un des grands atouts de Snowflake.",
      "Non. Long et inutile.",
      "Non."
    ],
    retenir: "Snowflake : CLONE pour tester."
  },
  {
    id: "m16-q98", dialecte: "Snowflake",
    q: "Les tables de chargement (`stg`) sont vidées et rechargées chaque nuit depuis l'ERP. Quel type de table Snowflake convient ?",
    choix: [
      "Permanente, avec 90 jours de Time Travel",
      "TRANSIENT",
      "Temporaire (TEMPORARY), partagée par tous",
      "Externe obligatoirement"
    ],
    bonne: 1,
    pourquoi: [
      "Non. On paie la conservation de données jetables.",
      "Oui. Pas de Fail-safe (et Time Travel court), donc moins de stockage payé pour des données qu'on peut recharger. Les tables métier, elles, restent permanentes.",
      "Non. Une table TEMPORARY n'existe que dans la session qui l'a créée.",
      "Non."
    ],
    retenir: "Données rechargeables → TRANSIENT."
  },
  {
    id: "m16-q99", dialecte: "Snowflake",
    q: "Un programme insère 100 000 lignes dans Snowflake avec 100 000 INSERT d'une ligne. C'est très lent. Pourquoi ?",
    choix: [
      "Snowflake limite à 1 000 lignes par jour",
      "Coût fixe par instruction",
      "Il faut un index",
      "Le warehouse est trop grand"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Snowflake est fait pour de gros lots : chaque petite instruction a un coût fixe (et crée de petits fichiers). Charger par fichier (`COPY INTO`) ou par lots.",
      "Non. Pas d'index sur les tables standard.",
      "Non."
    ],
    retenir: "Snowflake : charger par lots."
  },
  {
    id: "m16-q100", dialecte: "Standard",
    q: "Ta requête donne le bon résultat sur l'exemple de test. Est-ce suffisant pour la mettre en production ?",
    choix: [
      "Oui, elle marche",
      "Non : cas limites, volume, relecture",
      "Oui, si elle est rapide",
      "Oui, si elle a des commentaires"
    ],
    bonne: 1,
    pourquoi: [
      "Non. « Juste par hasard » est le pire bug : invisible jusqu'au jour où il coûte cher.",
      "Oui. Vérifier les cas limites (NULL, doublons, période vide), le volume réel et le plan, la relecture, et la version dans Git. Juste, lisible, performante, sûre, maintenable : le niveau attendu d'un senior.",
      "Non. Rapide ne veut pas dire juste.",
      "Non."
    ],
    retenir: "Juste, lisible, rapide, sûre, maintenable."
  }
];
