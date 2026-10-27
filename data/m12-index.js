LEARNSQL.questions.m12 = [
  {
    id: "m12-q01", dialecte: "SQL Server",
    q: "Qu'est-ce qu'un index cluster ?",
    choix: [
      "Une copie triée de la table",
      "La table elle-même, rangée selon la clé",
      "Un index commun à plusieurs tables",
      "Un index temporaire en mémoire"
    ],
    bonne: 1,
    pourquoi: [
      "Non. C'est la table elle-même.",
      "Oui. Les lignes sont rangées selon la clé de l'index. Comme un dictionnaire rangé par ordre alphabétique : le classement EST le livre.",
      "Non. Un index appartient à une seule table.",
      "Non. Il est stocké sur disque, comme la table."
    ],
    retenir: "Index cluster = la table rangée selon une clé."
  },
  {
    id: "m12-q02", dialecte: "SQL Server",
    q: "Combien d'index cluster une table peut-elle avoir ?",
    choix: [
      "Aucun",
      "Un seul",
      "Deux",
      "Autant qu'on veut"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Elle peut en avoir un (sinon c'est un « heap »).",
      "Oui. Les lignes ne peuvent être rangées que d'une seule façon.",
      "Non. Les lignes ne peuvent être rangées que d'une façon.",
      "Non. C'est vrai pour les index non cluster (jusqu'à 999)."
    ],
    retenir: "Un seul index cluster par table."
  },
  {
    id: "m12-q03", dialecte: "SQL Server",
    q: "Qu'est-ce qu'un index non cluster ?",
    choix: [
      "Un index désactivé par l'administrateur",
      "Une structure à part, avec des renvois",
      "Un index sans aucune colonne clé",
      "La table elle-même, triée sur la clé"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Un index non cluster est actif.",
      "Oui. Triée sur ses colonnes clés, elle pointe vers les lignes de la table, comme l'index à la fin d'un livre. On cherche dans l'index, puis on va lire la ligne si besoin.",
      "Non. Il a au moins une colonne clé.",
      "Non. C'est l'index cluster."
    ],
    retenir: "Non cluster = annuaire à part, avec des renvois."
  },
  {
    id: "m12-q04", dialecte: "SQL Server",
    q: "Qu'est-ce qu'un « heap » ?",
    choix: [
      "Un index cluster très rapide",
      "Une table sans index cluster",
      "Une table temporaire de session",
      "Une vue sans clause WHERE"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Un heap n'a justement pas d'index cluster.",
      "Oui. Les lignes sont stockées sans ordre. Correct pour du chargement en masse ; pour une table métier souvent lue, on préfère un index cluster.",
      "Non. Un heap est une table normale.",
      "Non. Une vue n'est pas un heap."
    ],
    retenir: "Heap = table sans index cluster."
  },
  {
    id: "m12-q05", dialecte: "SQL Server",
    q: "Quelles sont les qualités d'une bonne clé d'index cluster ?",
    choix: [
      "Longue et aléatoire, pour bien répartir",
      "Étroite, unique, stable, croissante",
      "Un texte libre, facile à lire",
      "Une colonne qui accepte NULL"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Une clé longue alourdit tous les index ; aléatoire, elle fragmente.",
      "Oui. Ex. id IDENTITY. La clé cluster est recopiée dans tous les index non cluster : elle doit être petite.",
      "Non. Un texte est large et peut changer.",
      "Non. Une clé cluster doit être stable et non NULL."
    ],
    retenir: "Clé cluster : étroite, unique, stable, croissante."
  },
  {
    id: "m12-q06", dialecte: "SQL Server",
    q: "Pourquoi une clé cluster large (ex. 3 colonnes texte) alourdit-elle TOUS les index non cluster ?",
    choix: [
      "Elle ne les alourdit pas du tout",
      "Elle est recopiée dans chacun d'eux",
      "Elle désactive les index non cluster",
      "Elle les trie dans le mauvais ordre"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Elle est copiée dans chaque index non cluster.",
      "Oui. Chaque index non cluster contient la clé cluster comme « adresse » de la ligne. Clé de 4 octets vs 120 octets : énorme différence sur des millions de lignes.",
      "Non. Ils restent actifs.",
      "Non. L'ordre n'est pas le problème : c'est la taille."
    ],
    retenir: "La clé cluster voyage dans chaque index non cluster."
  },
  {
    id: "m12-q07", dialecte: "SQL Server",
    q: "Quelle est la différence entre un Index Seek et un Index Scan ?",
    choix: [
      "Aucune, ce sont deux noms",
      "Seek va droit au but, Scan lit tout",
      "Scan est toujours plus rapide",
      "Seek lit toute la table, Scan un index"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Ils lisent des quantités très différentes.",
      "Oui. Seek : accès direct aux lignes voulues. Scan : parcours de tout l'index (ou d'une grande partie). Comme chercher un mot dans un dictionnaire, ou le lire en entier.",
      "Non. Pas toujours : ça dépend du nombre de lignes voulues.",
      "Non. C'est l'inverse."
    ],
    retenir: "Seek = accès direct. Scan = lecture complète."
  },
  {
    id: "m12-q08", dialecte: "SQL Server",
    q: "Un Scan est-il toujours mauvais ?",
    choix: [
      "Oui, toujours à éviter",
      "Non : parfois le meilleur choix",
      "Oui, sauf pendant la nuit",
      "Oui, sur les tables avec IDENTITY"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Pour beaucoup de lignes, un scan est souvent meilleur.",
      "Oui. Pour une petite table, ou quand on veut une grande partie des lignes, un scan est souvent plus rapide que des seeks + lookups.",
      "Non. L'heure ne change rien.",
      "Non. IDENTITY ne change rien."
    ],
    retenir: "Scan ≠ problème. Scan inattendu sur peu de lignes = problème."
  },
  {
    id: "m12-q09", dialecte: "SQL Server",
    q: "Qu'est-ce qu'un « Key Lookup » dans un plan ?",
    choix: [
      "Une recherche dans un index non cluster",
      "Un aller-retour vers l'index cluster",
      "Une jointure entre deux tables",
      "Un tri des lignes trouvées"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Ça, c'est le Seek ; le Key Lookup va ensuite chercher les autres colonnes dans l'index cluster.",
      "Oui. Après un seek dans un index non cluster, on va chercher les colonnes manquantes dans l'index cluster. Un lookup par ligne trouvée : coûteux s'il y en a beaucoup.",
      "Non. Même s'il apparaît avec une boucle (Nested Loops).",
      "Non. Il ne trie rien."
    ],
    retenir: "Key Lookup = colonnes manquantes dans l'index."
  },
  {
    id: "m12-q10", dialecte: "SQL Server",
    q: "Comment supprimer un Key Lookup fréquent sur SELECT date_cde, montant FROM commande WHERE client_id = @c ?",
    choixCode: true,
    choix: [
      "CREATE INDEX ix ON commande (client_id) INCLUDE (date_cde, montant)",
      "CREATE INDEX ix ON commande (date_cde, montant) INCLUDE (client_id)",
      "CREATE INDEX ix ON commande (client_id)",
      "CREATE INDEX ix ON commande (montant) INCLUDE (client_id, date_cde)"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. L'index devient « couvrant » : toutes les colonnes utiles y sont.",
      "Non. La colonne filtrée (client_id) n'est pas en tête de clé : pas de seek.",
      "Non. Pas couvrant : date_cde et montant manquent toujours, le lookup reste.",
      "Non. Pas sur la colonne filtrée."
    ],
    retenir: "INCLUDE = colonnes en plus pour couvrir la requête."
  },
  {
    id: "m12-q11", dialecte: "SQL Server",
    q: "Quelle différence entre une colonne dans la CLÉ de l'index et une colonne en INCLUDE ?",
    choix: [
      "Aucune, c'est la même chose",
      "La clé sert à chercher, INCLUDE non",
      "INCLUDE est triée, la clé non",
      "INCLUDE est interdit sur un index"
    ],
    bonne: 1,
    pourquoi: [
      "Non. La clé est triée et sert à chercher ; INCLUDE non.",
      "Oui. La clé est triée et sert à chercher / trier. INCLUDE est seulement stocké en bout d'index pour éviter les lookups. Filtre et tri → clé ; colonnes affichées → INCLUDE.",
      "Non. C'est l'inverse.",
      "Non. INCLUDE est permis."
    ],
    retenir: "Clé = chercher/trier. INCLUDE = transporter."
  },
  {
    id: "m12-q12", dialecte: "SQL Server",
    q: "Pourquoi SELECT * empêche-t-il souvent d'utiliser un index couvrant ?",
    choix: [
      "Il ne l'empêche pas du tout",
      "Aucun index ne contient tout",
      "Il désactive les index de la table",
      "Il trie les lignes avant de lire"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Un index couvrant devrait contenir toutes les colonnes.",
      "Oui. SELECT * demande TOUTES les colonnes : aucun index non cluster ne les contient toutes, donc lookups ou scan. Demande seulement les colonnes utiles.",
      "Non. Les index restent actifs.",
      "Non. SELECT * ne trie rien."
    ],
    retenir: "SELECT * = pas d'index couvrant."
  },
  {
    id: "m12-q13", dialecte: "SQL Server",
    q: "Index sur (client_id, date_cde). Lequel de ces filtres permet un Seek ?",
    choixCode: true,
    choix: [
      "WHERE date_cde >= '20260101' AND montant > 100",
      "WHERE client_id = 42 AND date_cde >= '20260101'",
      "WHERE client_id + 0 = 42 AND date_cde >= '20260101'",
      "WHERE YEAR(date_cde) = 2026 AND montant > 100"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Sans client_id (1re colonne de la clé), pas de seek.",
      "Oui. On utilise le début de la clé (client_id), puis la plage sur date_cde.",
      "Non. Un calcul sur la colonne empêche le seek.",
      "Non. Fonction, et pas de client_id."
    ],
    retenir: "Index composé : utilisable à partir de la 1re colonne."
  },
  {
    id: "m12-q14", dialecte: "SQL Server",
    q: "Pour WHERE statut = 'OUVERT' AND date_cde >= '20260101', quel ordre de colonnes est le meilleur ?",
    choixCode: true,
    choix: [
      "(date_cde, statut)",
      "(statut, date_cde)",
      "(montant)",
      "Peu importe"
    ],
    bonne: 1,
    pourquoi: [
      "Non. La plage sur date_cde d'abord empêche de chercher efficacement sur statut.",
      "Oui. Égalité d'abord, puis plage : le seek va directement au bon endroit.",
      "Non. montant n'est pas dans le filtre.",
      "Non. L'ordre des colonnes compte beaucoup."
    ],
    retenir: "Colonnes d'égalité d'abord, colonne de plage ensuite."
  },
  {
    id: "m12-q15", dialecte: "SQL Server",
    q: "Pourquoi WHERE YEAR(date_cde) = 2026 empêche-t-il un Index Seek ?",
    choix: [
      "YEAR est une fonction très lente",
      "L'index est trié sur date_cde, pas sur YEAR",
      "Les colonnes de date n'ont pas d'index",
      "Il ne l'empêche pas, c'est un mythe"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Ce n'est pas la fonction elle-même qui est lente.",
      "Oui. SQL Server doit calculer YEAR pour chaque ligne. Écris date_cde >= '20260101' AND date_cde < '20270101'.",
      "Non. Une colonne date peut être indexée.",
      "Non. La fonction empêche vraiment le seek."
    ],
    retenir: "Fonction sur la colonne = pas de seek."
  },
  {
    id: "m12-q16", dialecte: "SQL Server",
    q: "Le plan affiche un avertissement « CONVERT_IMPLICIT » sur la colonne filtrée. Qu'est-ce que ça signifie ?",
    choix: [
      "Tout va bien, c'est informatif",
      "La colonne est convertie : index peu utile",
      "La table filtrée est vide",
      "Il manque un ORDER BY dans la requête"
    ],
    bonne: 1,
    pourquoi: [
      "Non. C'est un vrai problème : l'index devient peu utile.",
      "Oui. SQL Server convertit la colonne pour la comparer à une valeur d'un autre type. Aligne le type de la valeur ou du paramètre sur celui de la colonne.",
      "Non. Rien à voir avec le nombre de lignes.",
      "Non. ORDER BY n'a rien à voir."
    ],
    retenir: "CONVERT_IMPLICIT sur une colonne = types à aligner."
  },
  {
    id: "m12-q17", dialecte: "SQL Server",
    q: "Pourquoi WHERE statut <> 'SOLDE' utilise-t-il rarement un seek ?",
    choix: [
      "<> est interdit avec un index",
      "« Différent » garde presque tout",
      "Les colonnes texte n'ont pas d'index",
      "Faux : il utilise toujours un seek"
    ],
    bonne: 1,
    pourquoi: [
      "Non. <> est permis.",
      "Oui. « Différent de » correspond souvent à presque toute la table : un scan est plus efficace. Si possible, filtre sur les valeurs voulues (IN ('OUVERT', 'EN_COURS')), ou utilise un index filtré.",
      "Non. Une colonne texte peut être indexée.",
      "Non. Le moteur choisit souvent un scan."
    ],
    retenir: "<> et NOT : souvent un scan."
  },
  {
    id: "m12-q18", dialecte: "SQL Server",
    q: "Qu'est-ce que la « sélectivité » d'un filtre ?",
    choix: [
      "Sa vitesse d'exécution",
      "La part de lignes qu'il garde",
      "Le nombre de colonnes filtrées",
      "Son nombre de caractères"
    ],
    bonne: 1,
    pourquoi: [
      "Non. C'est une proportion de lignes.",
      "Oui. Peu de lignes = très sélectif = index très utile. Un filtre sur le numéro de commande est très sélectif ; sur le pays 'FR' (90 % des lignes), pas du tout.",
      "Non. Un seul filtre peut être très sélectif.",
      "Non. La longueur du texte ne compte pas."
    ],
    retenir: "Index utile = filtre sélectif."
  },
  {
    id: "m12-q19", dialecte: "SQL Server",
    q: "Un index sur une colonne actif (BIT) avec 99 % de valeurs à 1 : utile pour WHERE actif = 1 ?",
    choix: [
      "Très utile, c'est un booléen",
      "Non : le filtre garde presque tout",
      "Obligatoire sur une colonne BIT",
      "Interdit sur une colonne BIT"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Le filtre garde 99 % des lignes.",
      "Oui. Un scan est plus efficace. L'index serait utile pour WHERE actif = 0 (1 %), et un index filtré … WHERE actif = 0 encore mieux.",
      "Non. Rien n'est obligatoire.",
      "Non. C'est permis."
    ],
    retenir: "Index sur une valeur très fréquente = peu utile."
  },
  {
    id: "m12-q20", dialecte: "SQL Server",
    q: "À quoi sert un index filtré, par exemple CREATE INDEX ix ON commande (date_cde) WHERE statut = 'OUVERT' ?",
    choix: [
      "À filtrer l'affichage du résultat",
      "Un petit index sur les commandes ouvertes",
      "À supprimer les commandes non ouvertes",
      "À trier les commandes par date"
    ],
    bonne: 1,
    pourquoi: [
      "Non. C'est le WHERE qui filtre l'affichage.",
      "Oui. Plus petit, il ne contient que les commandes ouvertes : rapide pour les requêtes qui ciblent ces lignes. Idéal quand on interroge souvent une petite partie d'une grosse table.",
      "Non. Un index ne supprime aucune ligne.",
      "Non. Il ne contient que les commandes ouvertes."
    ],
    retenir: "Index filtré = index sur un sous-ensemble utile."
  },
  {
    id: "m12-q21", dialecte: "SQL Server",
    q: "Un index filtré WHERE statut = 'OUVERT' existe. La requête fait WHERE statut = @statut (paramètre). L'index est-il utilisé ?",
    choix: [
      "Oui, toujours, sans condition",
      "Souvent non : la valeur est inconnue",
      "Oui, si @statut est un VARCHAR",
      "Erreur : paramètre interdit ici"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Le plan ne connaît pas la valeur de @statut.",
      "Oui. Au moment du plan, SQL Server ne sait pas que @statut vaudra 'OUVERT'. Piège des index filtrés : écris la valeur en dur, ou OPTION (RECOMPILE).",
      "Non. Le type ne change rien.",
      "Non. Un paramètre est permis."
    ],
    retenir: "Index filtré + paramètre = souvent ignoré."
  },
  {
    id: "m12-q22", dialecte: "SQL Server",
    q: "Comment mesurer le vrai travail d'une requête (pages lues) ?",
    choixCode: true,
    choix: [
      "SET STATISTICS IO ON",
      "SELECT @@ROWCOUNT",
      "sp_help",
      "SET NOCOUNT ON"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Onglet Messages : « lectures logiques » par table. Moins = mieux. (STATISTICS TIME donne le CPU et la durée.)",
      "Non. Ça compte les lignes, pas les pages.",
      "Non. sp_help décrit la table.",
      "Non. Ça masque le message « n lignes »."
    ],
    retenir: "STATISTICS IO : les lectures logiques, la vraie mesure."
  },
  {
    id: "m12-q23", dialecte: "SQL Server",
    q: "Pourquoi comparer les lectures logiques plutôt que la durée pour juger une optimisation ?",
    choix: [
      "La durée n'est pas mesurable",
      "La durée varie, les lectures non",
      "Les lectures sont plus faciles à lire",
      "C'est obligatoire dans SSMS"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Elle se mesure, mais elle varie.",
      "Oui. La durée dépend du cache, de la charge et du réseau ; les lectures logiques sont stables pour une même requête et des mêmes données.",
      "Non. La raison est la stabilité.",
      "Non. Rien n'est obligatoire."
    ],
    retenir: "Optimiser = réduire les lectures logiques."
  },
  {
    id: "m12-q24", dialecte: "SQL Server",
    q: "Différence entre plan « estimé » et plan « réel » (actual) ?",
    choix: [
      "Aucune, c'est le même plan",
      "Le réel est obtenu en exécutant",
      "Le réel est toujours faux",
      "L'estimé est toujours plus précis"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Le réel ajoute les vrais nombres de lignes.",
      "Oui. L'estimé est calculé sans exécuter ; le réel donne le nombre de lignes réellement traitées. Comparer lignes estimées et lignes réelles révèle les problèmes d'estimation.",
      "Non. Le réel est le plus fiable.",
      "Non. C'est l'inverse."
    ],
    retenir: "Plan réel : estimées vs réelles = diagnostic."
  },
  {
    id: "m12-q25", dialecte: "SQL Server",
    q: "Dans un plan réel, un opérateur estime 1 ligne mais en traite 2 millions. Que soupçonner ?",
    choix: [
      "Tout va bien, c'est normal",
      "Une estimation complètement fausse",
      "Le plan réel n'a pas fini de compter",
      "Un index en trop sur la table"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Un écart énorme fausse le plan.",
      "Oui. Statistiques périmées, parameter sniffing, variable table, fonction… L'optimiseur a choisi une stratégie pour 1 ligne (ex. boucles) : catastrophique pour 2 millions.",
      "Non. Le plan réel affiche les vrais nombres en fin d'exécution : l'écart est réel.",
      "Non. Un index en trop ne crée pas cet écart."
    ],
    retenir: "Écart énorme estimé / réel = cause n°1 des plans lents."
  },
  {
    id: "m12-q26", dialecte: "SQL Server",
    q: "Dans quel sens lit-on un plan d'exécution graphique ?",
    choix: [
      "De gauche à droite, puis de haut en bas",
      "De droite à gauche",
      "De bas en haut, puis de gauche à droite",
      "Peu importe le sens de lecture"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Les données partent de droite.",
      "Oui. Les données partent des tables à droite et remontent vers le SELECT à gauche (et de haut en bas). L'épaisseur des flèches indique le nombre de lignes.",
      "Non. Le sens est de droite à gauche.",
      "Non. Le sens compte pour comprendre le plan."
    ],
    retenir: "Plan : de droite à gauche, flèches épaisses = beaucoup de lignes."
  },
  {
    id: "m12-q27", dialecte: "SQL Server",
    q: "SSMS affiche un « index manquant » en vert dans le plan. Que faire ?",
    choix: [
      "Le créer tout de suite, tel quel",
      "L'étudier : c'est une piste",
      "L'ignorer toujours, ce sont des bugs",
      "Supprimer et recréer la table"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Les suggestions sont souvent redondantes ou trop larges.",
      "Oui. Vérifie les index existants (doublons), l'ordre des colonnes, le coût en écriture, puis décide. Une suggestion ne voit qu'une requête, pas toute la charge.",
      "Non. Elle peut être très utile.",
      "Non. Une suggestion d'index ne demande pas ça."
    ],
    retenir: "Index manquant suggéré = piste, pas ordre."
  },
  {
    id: "m12-q28", dialecte: "SQL Server",
    q: "Que sont les statistiques d'un index ou d'une colonne ?",
    choix: [
      "Le nombre d'utilisateurs connectés",
      "Un histogramme des valeurs",
      "Les temps de réponse des requêtes",
      "Les droits des utilisateurs"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Ça n'a rien à voir avec les connexions.",
      "Oui. Un résumé de la répartition des valeurs, qui permet à l'optimiseur d'estimer le nombre de lignes. Bonnes statistiques = bonnes estimations = bons plans.",
      "Non. Ça décrit les données, pas les temps.",
      "Non. Ça n'a rien à voir avec les droits."
    ],
    retenir: "Statistiques = carte des données pour l'optimiseur."
  },
  {
    id: "m12-q29", dialecte: "SQL Server",
    q: "Après le chargement de 3 millions de lignes dans une table de 10 millions, les requêtes deviennent lentes. Première piste ?",
    choixCode: true,
    choix: [
      "UPDATE STATISTICS dbo.commande;",
      "DROP STATISTICS dbo.commande.*;",
      "ALTER INDEX ALL ON dbo.commande DISABLE;",
      "DBCC FREEPROCCACHE;"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Les statistiques ne reflètent peut-être pas encore les nouvelles données (la mise à jour automatique a un seuil).",
      "Non. On ne supprime pas les statistiques : on les met à jour.",
      "Non. Désactiver les index rend tout encore plus lent.",
      "Non. Vider le cache force de nouveaux plans… avec les mêmes statistiques périmées."
    ],
    retenir: "Gros chargement → mettre à jour les statistiques."
  },
  {
    id: "m12-q30", dialecte: "SQL Server",
    q: "Problème de la « clé croissante » : les commandes d'aujourd'hui ne sont pas dans l'histogramme des statistiques. Effet ?",
    choix: [
      "Aucun effet sur les requêtes",
      "Sous-estimation des lignes récentes",
      "Les commandes du jour sont perdues",
      "Une erreur à chaque requête du jour"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Les estimations deviennent fausses.",
      "Oui. Une requête sur les dernières dates est estimée à presque 0 ligne alors qu'il y en a beaucoup : plan inadapté. Mets à jour les statistiques après chargement (les versions récentes de l'estimateur gèrent mieux ce cas).",
      "Non. Les données sont bien là.",
      "Non. Aucune erreur, juste un mauvais plan."
    ],
    retenir: "Données récentes hors statistiques = sous-estimation."
  },
  {
    id: "m12-q31", dialecte: "SQL Server",
    q: "Qu'est-ce que le « parameter sniffing » ?",
    choix: [
      "L'analyse des paramètres par l'audit",
      "Plan du 1er appel, réutilisé ensuite",
      "Une erreur de type de paramètre",
      "Un type d'index spécial"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Ce n'est pas de l'audit : le plan du 1er appel est gardé pour tous les suivants.",
      "Oui. SQL Server construit le plan d'une procédure avec les valeurs du 1er appel, puis le réutilise. Excellent en général ; mauvais si les valeurs sont très différentes (petit client vs énorme client).",
      "Non. Le type est juste.",
      "Non. Ce n'est pas un index."
    ],
    retenir: "Plan calculé au 1er appel, réutilisé ensuite."
  },
  {
    id: "m12-q32", dialecte: "SQL Server",
    q: "Une procédure est rapide le matin et très lente l'après-midi, sans changement de données. Hypothèse ?",
    choix: [
      "Plus d'utilisateurs l'après-midi",
      "Le plan a changé (parameter sniffing)",
      "Les index ont disparu à midi",
      "Le cache de données est vidé à midi"
    ],
    bonne: 1,
    pourquoi: [
      "Non. La charge joue un peu, mais pas « rapide / très lent » sans changement : le plan a changé.",
      "Oui. Le plan a été recompilé avec un paramètre atypique et ne convient pas aux appels suivants. Vérifie dans Query Store si le plan a changé.",
      "Non. Les index ne disparaissent pas seuls.",
      "Non. SQL Server ne vide pas son cache à heure fixe."
    ],
    retenir: "Lenteur intermittente = pense au plan qui change."
  },
  {
    id: "m12-q33", dialecte: "SQL Server",
    q: "Quelles solutions existent contre un mauvais parameter sniffing ?",
    choix: [
      "Ajouter NOLOCK partout",
      "RECOMPILE, OPTIMIZE FOR, Query Store",
      "Supprimer puis recréer la procédure chaque jour",
      "Ajouter de la RAM au serveur"
    ],
    bonne: 1,
    pourquoi: [
      "Non. NOLOCK ne change pas le plan.",
      "Oui. OPTION (RECOMPILE), OPTIMIZE FOR, forcer un bon plan avec Query Store, ou réécrire / séparer les cas. RECOMPILE coûte du CPU à chaque appel.",
      "Non. Lourd, et ça ne règle pas la cause.",
      "Non. La RAM ne corrige pas un mauvais plan."
    ],
    retenir: "Sniffing : RECOMPILE, OPTIMIZE FOR, Query Store."
  },
  {
    id: "m12-q34", dialecte: "SQL Server",
    q: "Dans une procédure, DECLARE @d DATE = @param; puis WHERE date_cde >= @d. Effet sur l'estimation ?",
    choix: [
      "Aucun effet sur le plan",
      "Une estimation moyenne, souvent fausse",
      "Il connaît toujours la valeur exacte du paramètre",
      "Une erreur de compilation"
    ],
    bonne: 1,
    pourquoi: [
      "Non. L'estimation devient moyenne.",
      "Oui. SQL Server ne connaît pas la valeur d'une variable locale au moment du plan. Parfois utilisé exprès contre le sniffing, mais l'estimation devient « moyenne » pour tout le monde.",
      "Non. Sauf avec OPTION (RECOMPILE).",
      "Non. C'est valide."
    ],
    retenir: "Variable locale = estimation moyenne."
  },
  {
    id: "m12-q35", dialecte: "SQL Server",
    q: "À quoi sert le Query Store (SQL Server 2016+) ?",
    choix: [
      "À stocker les requêtes favorites",
      "À garder l'historique des plans",
      "À sauvegarder la base chaque nuit",
      "À créer les index automatiquement"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Il enregistre les plans et leurs performances.",
      "Oui. Il enregistre les requêtes, leurs plans et leurs performances : on voit quand un plan a changé et on peut forcer l'ancien. L'outil n°1 pour « c'était rapide hier ».",
      "Non. Ce n'est pas une sauvegarde.",
      "Non. Il ne crée pas d'index."
    ],
    retenir: "Query Store = boîte noire des performances."
  },
  {
    id: "m12-q36", dialecte: "SQL Server",
    q: "Comment trouver les requêtes qui consomment le plus de CPU sur le serveur ?",
    choix: [
      "Demander aux utilisateurs",
      "Query Store, ou dm_exec_query_stats",
      "Avec sp_help sur chaque table",
      "Avec SELECT @@VERSION"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Les outils du serveur donnent les chiffres.",
      "Oui. Query Store (requêtes les plus consommatrices) ou sys.dm_exec_query_stats trié par total_worker_time. On optimise d'abord ce qui coûte le plus au total.",
      "Non. sp_help décrit une table.",
      "Non. Ça donne la version."
    ],
    retenir: "Optimiser les plus gros consommateurs d'abord."
  },
  {
    id: "m12-q37", dialecte: "SQL Server",
    q: "Comment savoir si un index est réellement utilisé ?",
    choixCode: true,
    choix: [
      "sys.dm_db_index_usage_stats",
      "sys.dm_db_index_physical_stats",
      "sys.index_columns",
      "sp_helpindex"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Seeks, scans, lookups vs updates. Attention : compteurs remis à zéro au redémarrage. Observe sur une période représentative (fin de mois comprise).",
      "Non. Donne la fragmentation, pas l'utilisation.",
      "Non. Liste les colonnes des index, pas leur usage.",
      "Non. Liste les index, sans dire s'ils servent."
    ],
    retenir: "Usage des index : sys.dm_db_index_usage_stats."
  },
  {
    id: "m12-q38", dialecte: "SQL Server",
    q: "Un index a 0 seek, 0 scan, mais 2 millions de mises à jour depuis 3 mois. Que faire ?",
    choix: [
      "Le garder, au cas où",
      "Le supprimer, après vérification",
      "En créer un deuxième identique en plus",
      "Le reconstruire chaque jour"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Il coûte à chaque écriture sans rien apporter.",
      "Oui. Il coûte à chaque écriture sans jamais aider une lecture. Vérifie qu'il ne sert pas à une contrainte (UNIQUE) ou à un traitement rare (clôture annuelle).",
      "Non. Doubler le problème.",
      "Non. Il est inutile : le reconstruire coûte pour rien."
    ],
    retenir: "Index jamais lu mais souvent écrit = candidat à la suppression."
  },
  {
    id: "m12-q39", dialecte: "SQL Server",
    q: "Index A sur (client_id) et index B sur (client_id, date_cde). Que penser de A ?",
    choix: [
      "Indispensable dans tous les cas",
      "Probablement redondant avec B",
      "Il faut créer un 3e index",
      "C'est B qui est inutile"
    ],
    bonne: 1,
    pourquoi: [
      "Non. B sert déjà aux mêmes recherches.",
      "Oui. B commence par client_id et peut servir aux mêmes recherches. Doublons d'index = coût d'écriture et d'espace pour rien (sauf cas particuliers : unicité, taille).",
      "Non. Un 3e index ajoute du coût.",
      "Non. B sert plus de requêtes que A."
    ],
    retenir: "Un index dont la clé est le début d'un autre = souvent redondant."
  },
  {
    id: "m12-q40", dialecte: "SQL Server",
    q: "Pourquoi ne pas créer un index sur chaque colonne « au cas où » ?",
    choix: [
      "C'est une bonne idée, par sécurité totale",
      "Écritures plus lentes, peu d'utilité",
      "C'est interdit par SQL Server",
      "Ça désactive l'index cluster"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Chaque index ralentit les écritures.",
      "Oui. Chaque index ralentit INSERT / UPDATE / DELETE et prend de la place ; des index sur une seule colonne servent rarement aux vraies requêtes.",
      "Non. C'est permis, mais mauvais.",
      "Non. L'index cluster reste."
    ],
    retenir: "Index sur mesure, pas « au cas où »."
  },
  {
    id: "m12-q41", dialecte: "SQL Server",
    q: "Comment un index peut-il éviter le tri d'un ORDER BY date_cde DESC ?",
    choix: [
      "Impossible : un ORDER BY trie toujours",
      "Les lignes sont lues déjà triées",
      "En ajoutant DISTINCT à la requête",
      "En ajoutant NOLOCK à la requête"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Un index peut fournir l'ordre.",
      "Oui. Si un index a date_cde en clé, SQL Server lit les lignes déjà triées : pas d'opérateur Sort. Un index peut être lu dans les deux sens. Très utile avec TOP (n).",
      "Non. DISTINCT ajoute un tri ou un hachage.",
      "Non. NOLOCK ne change pas l'ordre."
    ],
    retenir: "Index sur la colonne de tri = pas de Sort."
  },
  {
    id: "m12-q42", dialecte: "SQL Server",
    q: "SELECT TOP (10) … ORDER BY date_cde DESC sur 50 millions de lignes : pourquoi est-ce instantané avec un index sur date_cde, et lent sans ?",
    choix: [
      "Aucune différence de temps",
      "On lit 10 lignes, puis on s'arrête",
      "TOP est lent sans index",
      "À cause du DESC, plus coûteux"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Avec l'index, on lit 10 lignes ; sans, tout.",
      "Oui. Avec l'index, on lit les 10 premières entrées et on s'arrête. Sans, il faut tout lire et tout trier pour trouver les 10 plus récentes.",
      "Non. TOP n'est pas lent ; c'est le tri complet.",
      "Non. Un index se lit dans les deux sens."
    ],
    retenir: "TOP + ORDER BY + index = lecture minimale."
  },
  {
    id: "m12-q43", dialecte: "SQL Server",
    q: "Le plan montre un « Hash Match (Aggregate) » pour un GROUP BY client_id. Un index sur client_id permettrait quel autre opérateur, souvent moins coûteux ?",
    choix: [
      "Nested Loops (boucles imbriquées)",
      "Stream Aggregate",
      "Key Lookup sur l'index cluster",
      "Table Spool en mémoire"
    ],
    bonne: 1,
    pourquoi: [
      "Non. C'est une jointure.",
      "Oui. Agrégat sur des données déjà triées : les lignes arrivent groupées dans l'ordre, pas besoin de table de hachage.",
      "Non. Un lookup n'agrège pas.",
      "Non. Un spool n'agrège pas."
    ],
    retenir: "Données triées sur la clé de GROUP BY = Stream Aggregate."
  },
  {
    id: "m12-q44", dialecte: "SQL Server",
    q: "Un opérateur Sort ou Hash affiche un avertissement « spill to tempdb ». Que veut dire ce message ?",
    choix: [
      "Tout va bien, simple information",
      "Pas assez de mémoire : disque",
      "La table temporaire est pleine",
      "Il manque un ORDER BY final"
    ],
    bonne: 1,
    pourquoi: [
      "Non. C'est un ralentissement réel.",
      "Oui. La mémoire accordée n'a pas suffi : SQL Server a dû écrire dans tempdb, beaucoup plus lent. Souvent dû à une sous-estimation du nombre de lignes.",
      "Non. tempdb n'est pas plein.",
      "Non. ORDER BY ne règle rien ici."
    ],
    retenir: "Spill = mémoire insuffisante, souvent à cause d'une mauvaise estimation."
  },
  {
    id: "m12-q45", dialecte: "SQL Server",
    q: "Qu'est-ce que la fragmentation d'un index ?",
    choix: [
      "Un index cassé, à réparer",
      "Des pages en désordre ou à moitié vides",
      "Un index en plusieurs morceaux de tables",
      "Un index supprimé par erreur"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Il fonctionne, mais moins bien.",
      "Oui. Après beaucoup d'insertions / suppressions, les pages ne sont plus dans l'ordre physique ou sont peu remplies. Effet surtout sur les gros scans ; peu sur les seeks.",
      "Non. Un index appartient à une table.",
      "Non. Il existe toujours."
    ],
    retenir: "Fragmentation = pages en désordre ou peu remplies."
  },
  {
    id: "m12-q46", dialecte: "SQL Server",
    q: "Quelle est la règle classique pour l'entretien des index fragmentés ?",
    choix: [
      "Tout reconstruire chaque heure",
      "REORGANIZE si léger, REBUILD si fort",
      "Jamais d'entretien des index",
      "Supprimer les index fragmentés"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Coûteux et inutile.",
      "Oui. Entre ~5 et 30 % : REORGANIZE ; au-delà de ~30 % : REBUILD (seuils indicatifs). Sur des disques rapides, mettre à jour les statistiques est souvent plus important.",
      "Non. Les gros scans en souffrent.",
      "Non. On perdrait leur aide."
    ],
    retenir: "REORGANIZE (léger) / REBUILD (complet)."
  },
  {
    id: "m12-q47", dialecte: "SQL Server",
    q: "Que fait un REBUILD d'index en plus de défragmenter ?",
    choix: [
      "Rien de plus qu'un REORGANIZE",
      "Il recalcule aussi les statistiques",
      "Il supprime les lignes en double de l'index",
      "Il crée une copie de la table"
    ],
    bonne: 1,
    pourquoi: [
      "Non. REBUILD recalcule aussi les statistiques.",
      "Oui. Avec un échantillon complet. Parfois, l'amélioration ressentie après un REBUILD vient surtout des statistiques mises à jour.",
      "Non. Il ne touche pas aux données.",
      "Non. Il reconstruit l'index, pas la table."
    ],
    retenir: "REBUILD = défragmentation + statistiques fraîches."
  },
  {
    id: "m12-q48", dialecte: "SQL Server",
    q: "À quoi sert le FILLFACTOR d'un index (ex. 90) ?",
    choix: [
      "À limiter le nombre de lignes de l'index",
      "Laisser 10 % de place libre par page",
      "À compresser les pages à 90 %",
      "À trier 90 % des lignes"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Pas de limite de lignes.",
      "Oui. Pour les futures insertions, et limiter les divisions de pages. Utile pour les index où l'on insère « au milieu » ; inutile pour une clé croissante.",
      "Non. Ce n'est pas une compression.",
      "Non. Il ne trie rien."
    ],
    retenir: "FILLFACTOR = espace libre réservé dans les pages."
  },
  {
    id: "m12-q49", dialecte: "SQL Server",
    q: "Pourquoi une clé GUID aléatoire (NEWID) en index cluster fragmente-t-elle beaucoup ?",
    choix: [
      "Elle est trop courte pour un index",
      "Insertions au hasard : pages divisées",
      "Elle n'est pas toujours unique",
      "Elle est stockée en texte"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Elle fait 16 octets.",
      "Oui. Chaque nouvelle ligne s'insère à un endroit aléatoire : divisions de pages permanentes. Une clé croissante ajoute toujours à la fin.",
      "Non. Elle est unique.",
      "Non. UNIQUEIDENTIFIER n'est pas un texte."
    ],
    retenir: "Clé aléatoire = fragmentation."
  },
  {
    id: "m12-q50", dialecte: "SQL Server",
    q: "Une table reçoit des milliers d'INSERT par seconde sur une clé IDENTITY : contention sur la dernière page. Quelle option SQL Server 2019 aide ?",
    choix: [
      "OPTIMIZE_FOR_SEQUENTIAL_KEY = ON sur l'index",
      "FILLFACTOR = 10 sur l'index cluster",
      "ALLOW_PAGE_LOCKS = OFF sur l'index",
      "Une clé NEWID() à la place de l'IDENTITY"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Option prévue pour ce cas de « dernière page chaude ».",
      "Non. Des pages presque vides : plus de pages, et la dernière reste « chaude ».",
      "Non. Ne règle pas la contention sur la dernière page.",
      "Non. La contention disparaît, mais la fragmentation explose."
    ],
    retenir: "Insertions massives en fin d'index : OPTIMIZE_FOR_SEQUENTIAL_KEY."
  },
  {
    id: "m12-q51", dialecte: "SQL Server",
    q: "Pour une table de faits de 500 millions de lignes interrogée par des agrégats (SUM, COUNT par mois, par famille), quel type d'index est le plus adapté ?",
    choix: [
      "Un index non cluster sur chaque colonne",
      "Un index columnstore (cluster)",
      "Aucun index",
      "Un index sur l'id seulement"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Coûteux, et peu utile pour des agrégats.",
      "Oui. Stockage par colonnes, compression forte, traitement par lots : idéal pour l'analyse.",
      "Non. Chaque requête lirait tout en ligne à ligne.",
      "Non. L'id n'aide pas les agrégats."
    ],
    retenir: "Analyse sur gros volume : columnstore."
  },
  {
    id: "m12-q52", dialecte: "SQL Server",
    q: "Un columnstore est-il adapté pour lire UNE commande précise par son numéro, des milliers de fois par minute ?",
    choix: [
      "Oui, parfait pour ce cas",
      "Non : un index classique est meilleur",
      "Oui, si la table est petite",
      "Il n'est adapté à rien du tout"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Fait pour parcourir beaucoup de lignes.",
      "Oui. Le columnstore est fait pour parcourir beaucoup de lignes. Pour des accès ponctuels, un index classique (rowstore) est meilleur. Saisie / consultation unitaire = rowstore ; analyse = columnstore.",
      "Non. La taille n'est pas le critère.",
      "Non. Il est excellent pour l'analyse."
    ],
    retenir: "Rowstore pour l'unitaire, columnstore pour l'analytique."
  },
  {
    id: "m12-q53", dialecte: "SQL Server",
    q: "Que permet un index columnstore NON cluster ajouté sur une table de l'ERP ?",
    choix: [
      "Rien de plus qu'un index classique",
      "Analyser vite sans quitter l'ERP",
      "Remplacer l'ERP par un entrepôt",
      "Supprimer les verrous de la table"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Il stocke par colonnes, pour l'analyse.",
      "Oui. Faire des analyses rapides directement sur la table opérationnelle, tout en gardant l'index classique pour la saisie. Coût : un peu plus de travail à chaque écriture.",
      "Non. L'ERP reste en place.",
      "Non. Les verrous restent."
    ],
    retenir: "Columnstore non cluster = analyse sur une table opérationnelle."
  },
  {
    id: "m12-q54", dialecte: "SQL Server",
    q: "Une requête filtre souvent sur LEFT(code, 3) = 'PIS'. Sans changer la requête, comment la rendre rapide ?",
    choix: [
      "Impossible sans changer la requête",
      "Une colonne calculée indexée",
      "Ajouter NOLOCK sur la table",
      "Un index classique sur code suffit"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Une colonne calculée indexée le permet.",
      "Oui. Ajoute prefixe AS LEFT(code, 3) PERSISTED et indexe-la : SQL Server peut faire correspondre l'expression de la requête à la colonne calculée indexée.",
      "Non. NOLOCK ne change pas le plan.",
      "Non. La fonction autour de code empêche le seek."
    ],
    retenir: "Fonction incontournable dans un filtre : colonne calculée indexée."
  },
  {
    id: "m12-q55", dialecte: "SQL Server",
    q: "Un tableau de bord recalcule toutes les 5 minutes le même gros agrégat (CA par jour et famille). Quelle option SQL Server stocke ce résultat et le tient à jour ?",
    choix: [
      "Une vue simple",
      "Une vue indexée",
      "Une CTE",
      "Une variable table"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Recalculée à chaque lecture.",
      "Oui. Le résultat agrégé est stocké et maintenu à chaque modification (coût en écriture).",
      "Non. Une CTE est recalculée à chaque fois.",
      "Non. Elle disparaît après la requête."
    ],
    retenir: "Agrégat lu très souvent : vue indexée (ou table de synthèse)."
  },
  {
    id: "m12-q56", dialecte: "SQL Server",
    q: "Les utilisateurs cherchent des mots dans de longs libellés (LIKE '%pompe%'), c'est lent. Quelle fonctionnalité est faite pour ça ?",
    choix: [
      "Un index classique sur libelle",
      "La recherche en texte intégral",
      "Un index filtré sur libelle",
      "Ajouter NOLOCK à la requête"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Le % au début empêche le seek.",
      "Oui. Index full-text et CONTAINS : index de mots, recherche rapide, formes de mots…",
      "Non. Le % au début empêche toujours le seek.",
      "Non. NOLOCK ne rend pas la recherche plus rapide."
    ],
    retenir: "Recherche de mots : full-text, pas LIKE '%…%'."
  },
  {
    id: "m12-q57", dialecte: "SQL Server",
    q: "WHERE client_id = 42 OR commercial_id = 7 fait un scan. Il existe un index sur client_id seulement. Que faut-il au minimum pour espérer deux seeks ?",
    choix: [
      "Rien, l'index sur client_id suffit",
      "Un index aussi sur commercial_id",
      "Un index sur la colonne montant",
      "Supprimer l'index sur client_id"
    ],
    bonne: 1,
    pourquoi: [
      "Non. L'autre côté du OR n'a pas d'index.",
      "Oui. Pour un OR, chaque côté doit pouvoir utiliser un index ; sinon, un scan est inévitable. (Puis éventuellement réécrire en UNION.)",
      "Non. montant n'est pas filtré.",
      "Non. On perdrait le seek côté client."
    ],
    retenir: "OR : chaque condition doit avoir son index."
  },
  {
    id: "m12-q58", dialecte: "SQL Server",
    q: "Pourquoi une fonction scalaire utilisateur (dbo.f_prix(id)) dans un SELECT sur 1 million de lignes est-elle souvent lente (avant SQL Server 2019) ?",
    choix: [
      "Elle ne l'est pas, c'est un mythe",
      "Exécutée une fois par ligne",
      "Elle verrouille toute la table",
      "Elle désactive les index utilisés"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Elle s'exécute une fois par ligne.",
      "Oui. Comme une boucle, et elle empêche le parallélisme. SQL Server 2019 sait « intégrer » certaines fonctions. Sinon : réécrire en jointure ou en fonction table inline.",
      "Non. Elle ne verrouille pas tout.",
      "Non. Les index restent."
    ],
    retenir: "Fonction scalaire = exécution ligne par ligne."
  },
  {
    id: "m12-q59", dialecte: "SQL Server",
    q: "Pourquoi une fonction table « multi-instructions » (RETURNS @t TABLE … BEGIN … END) donne-t-elle souvent de mauvais plans ?",
    choix: [
      "Elle est interdite dans une jointure",
      "Son nombre de lignes est inconnu",
      "Elle trie mal ses lignes",
      "Elle n'a pas de colonnes typées"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Elle est permise.",
      "Oui. L'optimiseur utilise une estimation fixe (1 ou 100 lignes). Préfère une fonction table inline (un seul RETURN SELECT), traitée comme une vue.",
      "Non. Elle ne trie rien.",
      "Non. Ses colonnes sont typées."
    ],
    retenir: "Fonction table : inline plutôt que multi-instructions."
  },
  {
    id: "m12-q60", dialecte: "SQL Server",
    q: "Le paramètre « cost threshold for parallelism » vaut 5 par défaut. Pourquoi l'augmente-t-on souvent (ex. 50) ?",
    choix: [
      "Pour interdire le parallélisme",
      "Trop de petites requêtes en parallèle",
      "Pour accélérer les sauvegardes",
      "Pour réduire la RAM utilisée"
    ],
    bonne: 1,
    pourquoi: [
      "Non. C'est MAXDOP = 1.",
      "Oui. Avec 5, beaucoup de petites requêtes passent en parallèle inutilement : surcoût et contention. Le parallélisme est réservé aux requêtes vraiment lourdes.",
      "Non. Rien à voir avec les sauvegardes.",
      "Non. Ce n'est pas un réglage de mémoire."
    ],
    retenir: "Seuil de parallélisme par défaut trop bas."
  },
  {
    id: "m12-q61", dialecte: "SQL Server",
    q: "Les attentes CXPACKET sont élevées. Est-ce forcément un problème ?",
    choix: [
      "Oui, toujours : mettre MAXDOP = 1",
      "Non : regarder les requêtes derrière",
      "Oui, il faut redémarrer le serveur",
      "Non, c'est un problème de disque"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Couper le parallélisme peut ralentir les gros traitements.",
      "Oui. Elles traduisent l'activité parallèle : ce sont les requêtes lourdes derrière qu'il faut examiner (souvent mieux indexables).",
      "Non. Ça ne règle rien.",
      "Non. Ça concerne le parallélisme."
    ],
    retenir: "CXPACKET = symptôme du parallélisme, pas une cause."
  },
  {
    id: "m12-q62", dialecte: "SQL Server",
    q: "Des requêtes attendent sur RESOURCE_SEMAPHORE. Que se passe-t-il ?",
    choix: [
      "Le disque des données est lent",
      "Elles attendent de la mémoire",
      "Un verrou exclusif sur la table",
      "Le réseau vers le client est lent"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Ce serait PAGEIOLATCH.",
      "Oui. De la mémoire pour trier ou hacher : souvent des requêtes qui en demandent trop à cause de mauvaises estimations. Corriger les estimations et les tris inutiles réduit ces demandes.",
      "Non. Ce serait LCK_M_*.",
      "Non. Ce serait ASYNC_NETWORK_IO."
    ],
    retenir: "RESOURCE_SEMAPHORE = attente de mémoire de travail."
  },
  {
    id: "m12-q63", dialecte: "SQL Server",
    q: "Une application envoie des requêtes avec les valeurs écrites en dur (WHERE id = 1, WHERE id = 2…). Effet sur le cache des plans ?",
    choix: [
      "Aucun effet sur le cache",
      "Un plan par valeur : cache saturé",
      "Les plans sont partagés automatiquement",
      "Le serveur refuse ces requêtes"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Un plan par valeur remplit le cache.",
      "Oui. Le cache se remplit de plans à usage unique, et chaque requête est compilée. Paramètre les requêtes ; l'option « optimize for ad hoc workloads » limite les dégâts.",
      "Non. Sauf cas simples.",
      "Non. Elles s'exécutent."
    ],
    retenir: "Requêtes paramétrées = plans réutilisés."
  },
  {
    id: "m12-q64", dialecte: "SQL Server",
    q: "En SQL dynamique, pourquoi sp_executesql avec des paramètres est-il meilleur que EXEC d'une chaîne concaténée ?",
    choix: [
      "Aucune différence entre les deux",
      "Plan réutilisé, et pas d'injection",
      "EXEC est interdit en production",
      "sp_executesql est plus court à écrire"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Plan réutilisé et pas d'injection.",
      "Oui. Le plan est réutilisé (même texte, valeurs en paramètres) ET on évite l'injection SQL : performance et sécurité.",
      "Non. EXEC est permis.",
      "Non. Il est plus long, mais plus sûr."
    ],
    retenir: "SQL dynamique : sp_executesql + paramètres."
  },
  {
    id: "m12-q65", dialecte: "SQL Server",
    q: "Que fait OPTION (OPTIMIZE FOR UNKNOWN) ?",
    choix: [
      "Rien de visible sur le plan",
      "Un plan pour une valeur « moyenne »",
      "Le plan est recalculé à chaque fois",
      "Il désactive les index de la table"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Le plan change : estimation moyenne.",
      "Oui. Le plan n'est pas construit pour la valeur du 1er appel : stable, mais pas optimal pour les valeurs extrêmes.",
      "Non. Ce serait RECOMPILE.",
      "Non. Les index restent."
    ],
    retenir: "OPTIMIZE FOR UNKNOWN = plan moyen et stable."
  },
  {
    id: "m12-q66", dialecte: "SQL Server",
    q: "Le Query Store montre qu'une requête avait un bon plan hier et un mauvais aujourd'hui. Correction rapide ?",
    choix: [
      "Mettre à jour les statistiques",
      "Forcer l'ancien plan dans Query Store",
      "Supprimer et recréer la table",
      "Ajouter NOLOCK à la requête"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Ça peut aider, mais sans garantie de retrouver le bon plan ; forcer l'ancien plan est immédiat.",
      "Oui. Correctif immédiat, réversible. Ensuite, cherche la cause à froid : statistiques, index, réécriture.",
      "Non. Trop risqué.",
      "Non. NOLOCK ne change pas le plan."
    ],
    retenir: "Régression de plan : forcer le bon plan (Query Store)."
  },
  {
    id: "m12-q67", dialecte: "SQL Server",
    q: "Après une migration de SQL Server 2012 vers 2022 (et changement du niveau de compatibilité), certaines requêtes ralentissent. Piste ?",
    choix: [
      "Le matériel du nouveau serveur",
      "Le nouvel estimateur change des plans",
      "Le réseau entre les serveurs",
      "Rien à voir avec la migration"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Le nouvel estimateur change des plans.",
      "Oui. Le niveau de compatibilité change l'estimateur de cardinalité : certains plans changent. Query Store aide à comparer et corriger ; active-le avant de monter le niveau.",
      "Non. Rien à voir avec le réseau.",
      "Non. C'est un effet connu."
    ],
    retenir: "Montée de compatibilité = plans qui peuvent changer."
  },
  {
    id: "m12-q68", dialecte: "SQL Server",
    q: "Une vue utilise une vue qui utilise une vue (4 niveaux). Quel risque de performance ?",
    choix: [
      "Aucun, SQL Server simplifie tout",
      "Plans lourds, jointures inutiles",
      "Les vues sont mises en cache",
      "Elles deviennent indexées seules"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Il ne simplifie pas toujours.",
      "Oui. Plans très complexes, jointures inutiles ramenées des vues intermédiaires, estimations difficiles. Pour un rapport critique, une requête directe sur les tables est souvent bien plus rapide.",
      "Non. Une vue n'est pas mise en cache.",
      "Non. Une vue n'est indexée que si on le demande."
    ],
    retenir: "Vues imbriquées = plans lourds."
  },
  {
    id: "m12-q69", dialecte: "SQL Server",
    q: "Les attentes PAGEIOLATCH_SH dominent. Qu'est-ce que ça indique ?",
    choix: [
      "Des verrous sur les tables",
      "Des lectures disque en attente",
      "Le réseau vers les clients",
      "Le parallélisme des requêtes"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Ce serait LCK_M_*.",
      "Oui. Le serveur attend de lire des pages sur disque : trop de lectures (index manquants, scans) ou pas assez de mémoire. Réduire les lectures est souvent plus efficace qu'acheter du disque.",
      "Non. Ce serait ASYNC_NETWORK_IO.",
      "Non. Ce serait CXPACKET."
    ],
    retenir: "PAGEIOLATCH = lectures disque."
  },
  {
    id: "m12-q70", dialecte: "SQL Server",
    q: "Une requête prend 20 s à la 1re exécution, 2 s à la 2e. Pourquoi ?",
    choix: [
      "Les statistiques sont créées au 1er appel",
      "Les pages sont déjà en mémoire",
      "Les index ont été créés entre-temps",
      "Le plan est compilé au 1er appel"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Ça peut coûter un peu, pas 18 secondes ; ce sont les pages lues sur le disque.",
      "Oui. À la 2e exécution, les pages sont en cache : plus de lectures disque. Compare toujours à « cache chaud » ou « cache froid » de façon cohérente.",
      "Non. Rien n'a été créé.",
      "Non. La compilation prend des millisecondes, pas 18 secondes."
    ],
    retenir: "1re exécution lente, 2e rapide = cache."
  },
  {
    id: "m12-q71", dialecte: "SQL Server",
    q: "Peut-on lancer DBCC DROPCLEANBUFFERS (vider le cache) pour tester une requête ?",
    choix: [
      "Oui, partout, sans risque",
      "Seulement sur un serveur de test",
      "Jamais, la commande est interdite",
      "Oui, si on le fait la nuit"
    ],
    bonne: 1,
    pourquoi: [
      "Non. En production, tout le monde ralentit.",
      "Oui. En production, tout le monde subirait des lectures disque massives. Utile pour mesurer à « cache froid », mais pas en production.",
      "Non. Elle est permise.",
      "Non. Même la nuit, tout le serveur relit ses données sur le disque ensuite."
    ],
    retenir: "Vider le cache : test uniquement."
  },
  {
    id: "m12-q72", dialecte: "SQL Server",
    q: "Pourquoi des types trop larges (NVARCHAR(4000) pour un code de 10 caractères, BIGINT pour un statut) ralentissent-ils ?",
    choix: [
      "Ils ne ralentissent rien du tout",
      "Plus de pages à lire, plus de mémoire",
      "Ils empêchent les INSERT",
      "Ils créent des doublons"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Plus de pages et de mémoire.",
      "Oui. Plus d'octets par ligne = moins de lignes par page = plus de pages à lire, et plus de mémoire réservée pour les tris (estimée sur la taille déclarée).",
      "Non. Les INSERT marchent.",
      "Non. Rien à voir avec les doublons."
    ],
    retenir: "Types justes = moins de lectures, moins de mémoire."
  },
  {
    id: "m12-q73", dialecte: "SQL Server",
    q: "Tu vois des statistiques nommées _WA_Sys_… sur une table. D'où viennent-elles ?",
    choix: [
      "Des index créés par l'assistant de réglage",
      "Des statistiques automatiques",
      "D'une ancienne sauvegarde",
      "D'un index supprimé récemment"
    ],
    bonne: 1,
    pourquoi: [
      "Non. L'assistant crée des index, pas ces statistiques _WA_Sys_.",
      "Oui. SQL Server les a créées sur des colonnes filtrées sans index, pour mieux estimer : c'est l'option AUTO_CREATE_STATISTICS, activée par défaut.",
      "Non. Elles sont créées par le moteur.",
      "Non. Elles viennent des filtres."
    ],
    retenir: "_WA_Sys_ = statistiques automatiques."
  },
  {
    id: "m12-q74", dialecte: "SQL Server",
    q: "WHERE ville = 'Lyon' AND code_postal LIKE '69%' est fortement sous-estimé. Pourquoi ?",
    choix: [
      "LIKE empêche toute estimation",
      "Les colonnes sont liées",
      "Les textes n'ont pas de statistiques",
      "Il manque NOLOCK sur la table"
    ],
    bonne: 1,
    pourquoi: [
      "Non. LIKE '69%' s'estime bien ; le souci est de multiplier deux filtres liés.",
      "Oui. L'optimiseur suppose les colonnes plutôt indépendantes et multiplie à peu près les probabilités : le résultat est trop petit. Des statistiques multi-colonnes peuvent aider.",
      "Non. Les textes ont des statistiques.",
      "Non. NOLOCK ne change pas l'estimation."
    ],
    retenir: "Colonnes corrélées = estimations faussées."
  },
  {
    id: "m12-q75", dialecte: "SQL Server",
    q: "Quand utiliser UPDATE STATISTICS … WITH FULLSCAN ?",
    choix: [
      "Jamais, l'échantillon suffit",
      "Quand l'échantillon estime mal",
      "À chaque requête lancée",
      "Pour supprimer les statistiques"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Pour des données inégales, l'échantillon peut tromper.",
      "Oui. Données très inégalement réparties : on lit toutes les lignes. Plus long à calculer, mais plus précis.",
      "Non. Beaucoup trop coûteux.",
      "Non. Il les recalcule."
    ],
    retenir: "FULLSCAN = statistiques précises, plus longues à calculer."
  },
  {
    id: "m12-q76", dialecte: "SQL Server",
    q: "Sur les versions récentes (compatibilité 130+), quand les statistiques sont-elles mises à jour automatiquement ?",
    choix: [
      "Jamais, il faut le faire à la main",
      "Après assez de modifications",
      "Toutes les heures, automatiquement",
      "À chaque INSERT, ligne par ligne"
    ],
    bonne: 1,
    pourquoi: [
      "Non. La mise à jour est automatique.",
      "Oui. Après un nombre de modifications qui diminue en proportion quand la table grossit (seuil dynamique), lors de la requête suivante. Avant, il fallait 20 % de lignes modifiées.",
      "Non. Pas selon l'heure.",
      "Non. Beaucoup trop coûteux."
    ],
    retenir: "Mise à jour auto : seuil dynamique, mais pas instantanée."
  },
  {
    id: "m12-q77", dialecte: "SQL Server",
    q: "Pourquoi ne peut-on pas mettre une colonne NVARCHAR(2000) dans la CLÉ d'un index non cluster ?",
    choix: [
      "C'est permis, sans aucune limite",
      "La clé d'index a une taille limitée",
      "Les textes sont interdits en clé",
      "Il faut un index full-text à la place"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Il y a une limite de taille.",
      "Oui. 1 700 octets pour un non cluster (900 pour un cluster) : 2 000 caractères Unicode peuvent dépasser. Une telle colonne peut aller en INCLUDE.",
      "Non. Un texte court est permis.",
      "Non. Un INCLUDE suffit."
    ],
    retenir: "Clé d'index : taille limitée."
  },
  {
    id: "m12-q78", dialecte: "SQL Server",
    q: "Une colonne VARCHAR(MAX) peut-elle être dans le INCLUDE d'un index ?",
    choix: [
      "Non",
      "Oui (pas dans la clé)",
      "Seulement si elle est vide",
      "Seulement en columnstore"
    ],
    bonne: 1,
    pourquoi: [
      "Non. C'est permis en INCLUDE.",
      "Oui. Mais cela peut beaucoup grossir l'index : à faire seulement si c'est vraiment utile.",
      "Non. Le contenu ne change rien.",
      "Non. C'est permis en index classique."
    ],
    retenir: "MAX : en INCLUDE possible, jamais en clé."
  },
  {
    id: "m12-q79", dialecte: "SQL Server",
    q: "Pourquoi déclarer UNIQUE un index qui l'est réellement (ex. sur num_facture) aide-t-il l'optimiseur ?",
    choix: [
      "Ça n'aide en rien l'optimiseur",
      "Il sait : une égalité = 1 ligne max",
      "Ça accélère les INSERT",
      "Ça désactive les statistiques de la table"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Il sait qu'une égalité = 1 ligne.",
      "Oui. Estimations exactes et plans plus simples. En plus, l'unicité protège les données.",
      "Non. Plutôt l'inverse (vérification).",
      "Non. Les statistiques restent."
    ],
    retenir: "Ce qui est unique doit être déclaré unique."
  },
  {
    id: "m12-q80", dialecte: "SQL Server",
    q: "Une contrainte CHECK (pays IN ('FR', 'BE')) fiable existe. Que peut faire l'optimiseur pour WHERE pays = 'DE' ?",
    choix: [
      "Lire toute la table, puis filtrer",
      "Ne lire aucune ligne",
      "Renvoyer une erreur de contrainte",
      "Créer un index sur pays"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Il sait que 'DE' est impossible.",
      "Oui. Il comprend que c'est impossible. Les contraintes fiables (trusted) servent aussi à l'optimisation : encore une raison de les réactiver WITH CHECK.",
      "Non. Un SELECT ne viole pas un CHECK.",
      "Non. L'optimiseur ne crée pas d'index."
    ],
    retenir: "Contraintes fiables = informations pour l'optimiseur."
  },
  {
    id: "m12-q81", dialecte: "SQL Server",
    q: "Une table est partitionnée par mois sur date_cde. Une requête filtre WHERE date_cde >= '20261001'. Que peut faire SQL Server ?",
    choix: [
      "Lire toutes les partitions",
      "Ne lire que les partitions utiles",
      "Une erreur de partition",
      "Fusionner les partitions lues"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Seulement si le filtre ne porte pas sur la clé de partition.",
      "Oui. C'est l'élimination de partitions, à condition de filtrer directement sur la colonne de partition (sans fonction).",
      "Non. Le filtre est valide.",
      "Non. Il lit, il ne fusionne rien."
    ],
    retenir: "Filtrer sur la clé de partition = partitions ignorées."
  },
  {
    id: "m12-q82", dialecte: "SQL Server",
    q: "Sur une table heap souvent mise à jour, des « forwarded records » apparaissent. Qu'est-ce que c'est ?",
    choix: [
      "Des lignes en double dans le heap",
      "Des lignes déplacées avec un renvoi",
      "Des lignes supprimées mais visibles",
      "Des index créés automatiquement"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Ce ne sont pas des doublons.",
      "Oui. Devenues trop grandes, elles sont déplacées ailleurs avec un pointeur à l'ancienne place : lectures en plus. Solution : ALTER TABLE … REBUILD, ou un index cluster.",
      "Non. Ce ne sont pas des lignes supprimées.",
      "Non. Rien à voir avec les index."
    ],
    retenir: "Heap + UPDATE = forwarded records."
  },
  {
    id: "m12-q83", dialecte: "SQL Server",
    q: "Après un gros DELETE sur une table heap, elle occupe toujours autant de place. Pourquoi ?",
    choix: [
      "Le journal garde les lignes supprimées",
      "Les pages vides restent allouées",
      "Les données sont seulement cachées",
      "Le DELETE a échoué sans message"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Le journal est un autre fichier ; ici, ce sont les pages vides de la table.",
      "Oui. Sur un heap, les pages vidées ne sont pas toujours libérées (sauf DELETE avec TABLOCK ou reconstruction). Les scans continuent de les lire.",
      "Non. Elles sont bien supprimées.",
      "Non. Il a réussi."
    ],
    retenir: "Heap vidé par DELETE : pages parfois conservées."
  },
  {
    id: "m12-q84", dialecte: "SQL Server",
    q: "Dans STATISTICS IO, différence entre « lectures logiques » et « lectures physiques » ?",
    choix: [
      "Aucune différence entre les deux",
      "Logiques en mémoire, physiques sur disque",
      "Physiques = lectures faites sur le réseau",
      "Logiques = lectures en erreur"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Mémoire ou disque.",
      "Oui. Logiques : pages lues (en mémoire). Physiques : pages qu'il a fallu chercher sur le disque. On optimise les logiques ; les physiques dépendent du cache.",
      "Non. Le réseau n'est pas compté.",
      "Non. Ce ne sont pas des erreurs."
    ],
    retenir: "Logiques = travail. Physiques = disque."
  },
  {
    id: "m12-q85", dialecte: "SQL Server",
    q: "Le « coût estimé » affiché dans un plan (ex. 45,3) est-il une durée en secondes ?",
    choix: [
      "Oui, c'est une durée en secondes",
      "Non : une unité interne",
      "Ce sont des millisecondes",
      "C'est un nombre de pages"
    ],
    bonne: 1,
    pourquoi: [
      "Non. C'est une unité interne.",
      "Oui. Une unité de l'optimiseur pour comparer des plans, basée sur des estimations. Avec de mauvaises estimations, ce coût est faux aussi : mesure le réel (IO, temps).",
      "Non. Ce n'est pas un temps.",
      "Non. Ce n'est pas un nombre de pages."
    ],
    retenir: "Coût estimé ≠ temps réel."
  },
  {
    id: "m12-q86", dialecte: "SQL Server",
    q: "Un Index Seek lit 2 millions de lignes pour en renvoyer 10. Dans ses propriétés : « Seek Predicate » sur client_id, « Predicate » sur statut. Qu'est-ce que ça veut dire ?",
    choix: [
      "Tout va bien, le seek est rapide",
      "statut est filtré après, ligne par ligne",
      "L'index est cassé, à reconstruire",
      "Il faut ajouter NOLOCK"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Un seek peut lire énormément.",
      "Oui. Le seek ne trouve que sur client_id ; statut est un prédicat résiduel. Ajouter statut dans la clé aiderait. Regarde toujours « lignes lues » vs « lignes renvoyées ».",
      "Non. L'index marche ; il lui manque statut.",
      "Non. NOLOCK ne change pas le seek."
    ],
    retenir: "Seek ≠ efficace : vérifier le prédicat résiduel."
  },
  {
    id: "m12-q87", dialecte: "SQL Server",
    q: "Pour un filtre qui renvoie 30 % de la table, SQL Server fait un scan alors qu'un index existe. Pourquoi ?",
    choix: [
      "Le scan est toujours plus rapide",
      "Trop de lookups : le scan coûte moins",
      "L'index est désactivé",
      "Les statistiques sont trop parfaites"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Pour quelques lignes, l'index gagne ; à 30 %, ce sont les lookups qui coûtent trop.",
      "Oui. Au-delà d'un certain nombre de lignes, des milliers de lookups coûtent plus cher qu'un scan (« point de bascule »). Avec un index couvrant, le seek redevient intéressant.",
      "Non. Il est actif.",
      "Non. Les statistiques sont bonnes : 30 %."
    ],
    retenir: "Trop de lookups = scan préféré. Solution : couvrir."
  },
  {
    id: "m12-q88", dialecte: "SQL Server",
    q: "Pourquoi un DISTINCT ajouté « par sécurité » peut-il coûter cher ?",
    choix: [
      "Il est gratuit pour le moteur",
      "Il impose un tri ou un hachage",
      "Il supprime les index utilisés",
      "Il verrouille toute la table"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Il trie ou hache tout le résultat.",
      "Oui. De tout le résultat, pour trouver les doublons. Inutile si les lignes sont déjà uniques ; et il cache souvent un problème de jointure.",
      "Non. Les index restent.",
      "Non. Il ne verrouille pas plus."
    ],
    retenir: "DISTINCT = tri ou hachage. Pas « par sécurité »."
  },
  {
    id: "m12-q89", dialecte: "SQL Server",
    q: "Un écran de recherche a 10 critères facultatifs. Quelle approche donne les meilleurs plans ?",
    choix: [
      "Un WHERE avec (@c IS NULL OR col = @c) partout",
      "SQL dynamique paramétré (ou RECOMPILE)",
      "Dix requêtes différentes écrites à la main",
      "Ajouter NOLOCK à la recherche"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Un seul plan pour toutes les combinaisons : souvent mauvais.",
      "Oui. On construit uniquement les conditions remplies, avec sp_executesql et des paramètres (ou OPTION (RECOMPILE)) : chaque combinaison a son plan adapté, sans injection.",
      "Non. Ingérable (1 024 combinaisons).",
      "Non. NOLOCK ne donne pas de meilleur plan."
    ],
    retenir: "Recherche multicritère : SQL dynamique paramétré."
  },
  {
    id: "m12-q90", dialecte: "SQL Server",
    q: "Un index non cluster a 3 colonnes de clé et 25 colonnes en INCLUDE. Problème ?",
    choix: [
      "Aucun, plus d'INCLUDE = plus rapide",
      "C'est presque une copie de la table",
      "Il est trop petit pour servir",
      "Il est interdit au-delà de 10"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Plus de place et plus d'écritures.",
      "Oui. Espace, mémoire et coût d'écriture doublés. Un index sert des requêtes précises : si toutes les colonnes sont utiles, repense l'index cluster.",
      "Non. C'est l'inverse.",
      "Non. Il n'y a pas de limite à 10."
    ],
    retenir: "Index trop larges = table dupliquée."
  },
  {
    id: "m12-q91", dialecte: "SQL Server",
    q: "Quelle démarche pour choisir les index d'une base ?",
    choix: [
      "Indexer toutes les colonnes",
      "Partir de la charge réelle",
      "Copier les index d'une autre base",
      "Suivre toutes les suggestions de SSMS"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Écritures lentes, peu d'utilité.",
      "Oui. Les requêtes les plus fréquentes et les plus coûteuses (Query Store), puis peu d'index bien pensés qui en servent plusieurs.",
      "Non. Chaque base a ses requêtes.",
      "Non. Les suggestions se recoupent."
    ],
    retenir: "Index guidés par la charge réelle."
  },
  {
    id: "m12-q92", dialecte: "Standard",
    q: "Une requête est rapide sur la base de test (10 000 lignes) et très lente en production (50 millions). Leçon ?",
    choix: [
      "La production est cassée",
      "Tester avec des volumes réalistes",
      "Il faut moins de données en production",
      "Ajouter de la mémoire au serveur"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Le volume change les plans.",
      "Oui. Les plans et les coûts changent avec le volume. Une copie anonymisée de la production est l'idéal pour les tests de performance.",
      "Non. Les données sont nécessaires.",
      "Non. Ça cache le problème un temps ; il faut tester avec des volumes réalistes."
    ],
    retenir: "Tests de performance = volumes réalistes."
  },
  {
    id: "m12-q93", dialecte: "Standard",
    q: "Avant d'optimiser une requête, que faut-il faire en premier ?",
    choix: [
      "Créer des index tout de suite",
      "Mesurer l'état de départ",
      "Mettre à jour toutes les statistiques",
      "Réécrire toute la requête"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Sans mesure, impossible de prouver un gain.",
      "Oui. Lectures, CPU, durée, plan : pour pouvoir prouver le gain ensuite. Sans mesure de départ, impossible de dire si on a amélioré ou empiré.",
      "Non. Ça peut aider, mais sans mesure de départ, on ne saura pas si ça a changé quelque chose.",
      "Non. On doit d'abord mesurer."
    ],
    retenir: "Mesurer avant, mesurer après."
  },
  {
    id: "m12-q94", dialecte: "Standard",
    q: "Pourquoi ne changer qu'une seule chose à la fois quand on optimise ?",
    choix: [
      "Pour éviter de bloquer la production",
      "Pour savoir ce qui a eu de l'effet",
      "C'est obligatoire dans SSMS",
      "Pour économiser des index"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Ce n'est pas le but ; on veut savoir quel changement a eu de l'effet.",
      "Oui. Trois changements d'un coup : impossible de savoir lequel compte, ni lequel a cassé autre chose.",
      "Non. Rien n'est obligatoire.",
      "Non. Rien à voir avec les index."
    ],
    retenir: "Une modification à la fois."
  },
  {
    id: "m12-q95", dialecte: "SQL Server",
    q: "L'assistant de paramétrage (Database Engine Tuning Advisor) propose 15 index. Que faire ?",
    choix: [
      "Tous les créer d'un coup",
      "Les examiner un par un",
      "Les ignorer tous sans regarder",
      "Supprimer les index existants"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Beaucoup se recoupent ou coûtent cher.",
      "Oui. Beaucoup se recoupent ou coûtent cher en écriture : garde ceux qui ont un vrai gain mesuré. Les outils automatiques sont des aides, pas des décideurs.",
      "Non. Certains peuvent être bons.",
      "Non. Ils servent peut-être d'autres requêtes."
    ],
    retenir: "Suggestions automatiques = à trier."
  },
  {
    id: "m12-q96", dialecte: "SQL Server",
    q: "Beaucoup de tables temporaires créées en parallèle provoquent de la contention sur tempdb. Mesure classique ?",
    choix: [
      "Supprimer et recréer tempdb",
      "Plusieurs fichiers de même taille",
      "Ajouter NOLOCK sur les #tables",
      "Interdire les tables temporaires (#)"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Impossible.",
      "Oui. Configure tempdb avec plusieurs fichiers de données de même taille : les allocations sont réparties, moins de contention (réglage fait par le DBA).",
      "Non. NOLOCK ne règle pas l'allocation.",
      "Non. Elles sont utiles ; on configure tempdb."
    ],
    retenir: "tempdb : plusieurs fichiers de données."
  },
  {
    id: "m12-q97", dialecte: "SQL Server",
    q: "Dans un plan réel, la partie intérieure d'un Nested Loops indique « Nombre d'exécutions : 250 000 ». Que comprendre ?",
    choix: [
      "Rien de spécial, c'est le fonctionnement normal",
      "Exécuté 250 000 fois, une par ligne",
      "250 000 erreurs ignorées",
      "250 000 index parcourus"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Exécuté 250 000 fois, c'est souvent trop.",
      "Oui. Une fois par ligne extérieure : s'il fait un scan, c'est catastrophique. Il faut un seek à l'intérieur, ou un autre type de jointure.",
      "Non. Ce ne sont pas des erreurs.",
      "Non. C'est un nombre d'exécutions."
    ],
    retenir: "Regarder le nombre d'exécutions dans les boucles."
  },
  {
    id: "m12-q98", dialecte: "SQL Server",
    q: "Que peut apporter le « batch mode » (traitement par lots de lignes) sur SQL Server 2019+ ?",
    choix: [
      "Rien de nouveau pour les requêtes",
      "Des agrégats plus rapides en gros volume",
      "Des sauvegardes plus rapides",
      "Moins de verrous sur les tables"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Il accélère les agrégats et jointures.",
      "Oui. Le moteur traite des paquets de lignes au lieu d'une ligne à la fois : agrégats et jointures beaucoup plus rapides, même sans columnstore (selon l'édition).",
      "Non. Rien à voir avec les sauvegardes.",
      "Non. Rien à voir avec les verrous."
    ],
    retenir: "Batch mode = analytique accélérée."
  },
  {
    id: "m12-q99", dialecte: "SQL Server",
    q: "Qu'est-ce qu'une « jointure adaptative » (Adaptive Join) dans un plan récent ?",
    choix: [
      "Une jointure qui change de tables",
      "Hash ou boucles, choisi à l'exécution",
      "Une jointure sans aucune condition ON",
      "Une erreur de l'optimiseur"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Les tables ne changent pas.",
      "Oui. Le choix entre Hash Join et Nested Loops est fait pendant l'exécution, selon le nombre réel de lignes : limite les dégâts d'une mauvaise estimation (en mode batch).",
      "Non. Elle a une condition ON.",
      "Non. C'est une fonction voulue."
    ],
    retenir: "Adaptive Join = choix de jointure à l'exécution."
  },
  {
    id: "m12-q100", dialecte: "SQL Server",
    q: "Quelle méthode d'optimisation est la bonne ?",
    choix: [
      "Ajouter des index jusqu'à ce que ce soit rapide",
      "Mesurer, comprendre, corriger, re-mesurer",
      "Acheter un serveur plus gros",
      "Mettre NOLOCK partout"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Trop d'index ralentissent les écritures.",
      "Oui. Trouver les plus gros consommateurs, lire le plan réel, corriger la cause (filtre SARGable, index adapté, statistiques, réécriture), puis re-mesurer. Méthode reproductible.",
      "Non. Parfois utile, mais rarement la cause.",
      "Non. Des chiffres faux possibles."
    ],
    retenir: "Mesurer → comprendre → corriger la cause → mesurer."
  }
];
