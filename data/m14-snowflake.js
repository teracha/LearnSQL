LEARNSQL.questions.m14 = [
  {
    id: "m14-q01", dialecte: "Snowflake",
    q: "Quelles sont les trois couches de l'architecture Snowflake ?",
    choix: [
      "Disque, mémoire, processeur",
      "Stockage, calcul, services cloud",
      "Données, index, journal de transactions",
      "Client, serveur, réseau privé"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Ce sont des composants matériels, pas les couches Snowflake.",
      "Oui. Stockage (les données), calcul (les warehouses), services cloud (connexion, optimisation, métadonnées, sécurité). Stockage et calcul sont séparés : on peut les faire grandir indépendamment.",
      "Non. Il n'y a pas d'index sur Snowflake.",
      "Non. Ce n'est pas l'architecture de Snowflake."
    ],
    retenir: "Stockage / calcul / services cloud, séparés."
  },
  {
    id: "m14-q02", dialecte: "Snowflake",
    q: "Qu'est-ce qu'un « virtual warehouse » sur Snowflake ?",
    choix: [
      "Un entrepôt qui stocke les données",
      "Du calcul, sans données",
      "Une base de données isolée",
      "Un dossier de fichiers chargés"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Piège de vocabulaire.",
      "Oui. Un groupe de ressources de calcul qui exécute les requêtes ; il ne contient pas de données. Les données sont dans le stockage ; le warehouse est le « moteur » qui les lit.",
      "Non. Un warehouse ne contient aucune donnée.",
      "Non. Ça, c'est un stage."
    ],
    retenir: "Warehouse = puissance de calcul, pas de stockage."
  },
  {
    id: "m14-q03", dialecte: "Snowflake",
    q: "Passer un warehouse de la taille S à M, qu'est-ce que ça change ?",
    choix: [
      "Rien, seule l'étiquette change",
      "2× plus de puissance et de crédits/h",
      "Plus de stockage disponible",
      "Deux fois plus d'utilisateurs autorisés"
    ],
    bonne: 1,
    pourquoi: [
      "Non. La puissance et le coût doublent.",
      "Oui. Deux fois plus de puissance de calcul, et deux fois plus de crédits par heure. Chaque taille double. Une requête qui passe de 10 min à 5 min coûte à peu près pareil.",
      "Non. Le stockage ne dépend pas du warehouse.",
      "Non. La taille ne limite pas les utilisateurs."
    ],
    retenir: "Taille × 2 = puissance × 2 = crédits/heure × 2."
  },
  {
    id: "m14-q04", dialecte: "Snowflake",
    q: "Comment Snowflake facture-t-il le temps d'un warehouse ?",
    choix: [
      "À la journée entamée",
      "À la seconde, 60 s minimum",
      "À la requête exécutée",
      "Au mois, en forfait fixe par taille"
    ],
    bonne: 1,
    pourquoi: [
      "Non. La facturation est à la seconde.",
      "Oui. À la seconde, avec un minimum de 60 secondes à chaque démarrage (ou reprise). Un warehouse qui démarre pour une requête de 2 s coûte 60 s.",
      "Non. C'est le temps allumé qui compte.",
      "Non. Pas de forfait : on paie l'usage."
    ],
    retenir: "Facturation à la seconde, minimum 60 s par démarrage."
  },
  {
    id: "m14-q05", dialecte: "Snowflake",
    q: "À quoi sert AUTO_SUSPEND = 60 sur un warehouse ?",
    choix: [
      "À limiter les requêtes à 60 secondes",
      "L'arrêter après 60 s sans activité",
      "À le redémarrer toutes les minutes",
      "À limiter le warehouse à 60 utilisateurs"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Ce serait STATEMENT_TIMEOUT_IN_SECONDS.",
      "Oui. On ne paie plus quand il ne sert pas. Avec AUTO_RESUME = TRUE, il redémarre tout seul à la prochaine requête.",
      "Non. Il s'arrête ; il ne redémarre qu'à la prochaine requête.",
      "Non. Ce n'est pas une limite d'utilisateurs."
    ],
    retenir: "AUTO_SUSPEND court + AUTO_RESUME = pas de crédits gaspillés."
  },
  {
    id: "m14-q06", dialecte: "Snowflake",
    q: "Pourquoi un AUTO_SUSPEND trop court (ex. 10 s) n'est-il pas toujours une bonne idée ?",
    choix: [
      "C'est interdit en dessous de 60 s",
      "Redémarrages coûteux, cache vidé",
      "Il augmente le stockage facturé",
      "Il bloque les tables pendant l'arrêt"
    ],
    bonne: 1,
    pourquoi: [
      "Non. C'est permis.",
      "Oui. Chaque redémarrage coûte au moins 60 s et vide le cache local : pour des requêtes fréquentes, ça peut coûter plus et ralentir. Trouver le bon équilibre selon l'usage (souvent 60 à 300 s).",
      "Non. Le stockage ne dépend pas du warehouse.",
      "Non. Un warehouse arrêté ne bloque pas les tables."
    ],
    retenir: "AUTO_SUSPEND : équilibre entre coût et cache."
  },
  {
    id: "m14-q07", dialecte: "Snowflake",
    q: "Une seule grosse requête est trop lente. Que faire en priorité côté warehouse ?",
    choix: [
      "Ajouter des clusters (scale out)",
      "Augmenter la taille du warehouse (scale up)",
      "Réduire AUTO_SUSPEND",
      "Créer un index"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Les clusters supplémentaires aident quand il y a beaucoup de requêtes en même temps, pas une seule grosse.",
      "Oui. Plus de puissance pour UNE requête. (Mais vérifie d'abord le Query Profile : la requête est peut-être mal écrite.)",
      "Non. Ça règle l'arrêt, pas la puissance.",
      "Non. Pas d'index."
    ],
    retenir: "Grosse requête : plus grande taille."
  },
  {
    id: "m14-q08", dialecte: "Snowflake",
    q: "À 9 h, 80 utilisateurs Power BI lancent des requêtes en même temps : beaucoup attendent dans la file. Solution adaptée ?",
    choix: [
      "Un seul warehouse 4XL",
      "Un warehouse multi-cluster",
      "Réduire la taille du warehouse",
      "Un warehouse par utilisateur Power BI"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Cher, et pas forcément efficace pour beaucoup de petites requêtes.",
      "Oui. Scale out : des clusters s'ajoutent automatiquement quand la file s'allonge. MIN_CLUSTER_COUNT / MAX_CLUSTER_COUNT (édition Enterprise).",
      "Non. Moins de puissance, plus d'attente.",
      "Non. Ingérable et très cher."
    ],
    retenir: "Beaucoup d'utilisateurs : multi-cluster."
  },
  {
    id: "m14-q09", dialecte: "Snowflake",
    q: "Pourquoi créer des warehouses séparés pour l'ETL, Power BI et l'exploration ?",
    choix: [
      "C'est obligatoire sur Snowflake",
      "Isoler chaque usage et son coût",
      "Pour avoir plus de stockage par usage",
      "Pour multiplier le cache de résultats"
    ],
    bonne: 1,
    pourquoi: [
      "Non. C'est un choix, pas une obligation.",
      "Oui. Les traitements ne se gênent pas, chaque usage a sa taille adaptée, et on voit le coût de chaque usage. Le chargement de nuit ne ralentit pas les tableaux de bord.",
      "Non. Le stockage ne dépend pas du warehouse.",
      "Non. Le cache de résultats est commun à tout le compte."
    ],
    retenir: "Un warehouse par usage."
  },
  {
    id: "m14-q10", dialecte: "Snowflake",
    q: "Comment limiter automatiquement la consommation de crédits d'un warehouse sur le mois ?",
    choix: [
      "Impossible sur Snowflake",
      "Un RESOURCE MONITOR avec quota",
      "Supprimer le warehouse le 20 du mois",
      "AUTO_SUSPEND = 0"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Un resource monitor le fait.",
      "Oui. Un quota de crédits et des actions (alerte, suspension) à certains seuils. Ex. alerte à 80 %, suspension à 100 %. Indispensable pour maîtriser le budget.",
      "Non. On perd l'outil, et ce n'est pas automatique.",
      "Non. 0 = jamais de suspension."
    ],
    retenir: "Budget : resource monitor."
  },
  {
    id: "m14-q11", dialecte: "Snowflake",
    q: "Tu relances exactement la même requête 5 minutes plus tard, sans que les données aient changé. Que fait Snowflake ?",
    choix: [
      "Il recalcule tout depuis le stockage",
      "Cache de résultats",
      "Il renvoie une erreur de doublon",
      "Il relit le cache local du warehouse"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Le résultat est déjà en cache.",
      "Oui. Il renvoie le résultat du cache, presque instantanément, sans même démarrer le warehouse. Conditions : 24 h, même texte de requête, données inchangées, mêmes droits.",
      "Non. Relancer une requête est normal.",
      "Non. Pas besoin du warehouse : le cache de résultats est dans les services cloud."
    ],
    retenir: "Cache de résultats : même requête + mêmes données = gratuit et instantané."
  },
  {
    id: "m14-q12", dialecte: "Snowflake",
    q: "Pourquoi une requête contenant CURRENT_TIMESTAMP() ne profite-t-elle pas du cache de résultats ?",
    choix: [
      "Un bug connu de Snowflake",
      "Le résultat dépend du moment",
      "Elle est trop longue à mettre en cache",
      "Elle n'utilise pas de warehouse"
    ],
    bonne: 1,
    pourquoi: [
      "Non. C'est voulu : le résultat change à chaque instant.",
      "Oui. Snowflake ne peut pas réutiliser un ancien résultat. Les fonctions non déterministes empêchent la réutilisation. Remplace par une date fixe si possible.",
      "Non. La taille n'est pas la raison.",
      "Non. La raison est le moment, pas le warehouse."
    ],
    retenir: "Fonctions « du moment » = pas de cache de résultats."
  },
  {
    id: "m14-q13", dialecte: "Snowflake",
    q: "Quelle différence entre le cache de résultats et le cache local du warehouse ?",
    choix: [
      "Aucune, c'est le même cache",
      "Réponse complète vs données lues",
      "Le cache local dure 1 an",
      "Le cache de résultats est sur le PC"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Deux caches différents.",
      "Oui. Résultats : réponse complète réutilisée (services cloud, 24 h). Local : données déjà lues gardées sur le warehouse tant qu'il tourne. Suspendre le warehouse vide le cache local, pas le cache de résultats.",
      "Non. Il disparaît quand le warehouse s'arrête.",
      "Non. Il est dans les services cloud."
    ],
    retenir: "Deux caches : résultats (global) et local (warehouse)."
  },
  {
    id: "m14-q14", dialecte: "Snowflake",
    q: "Pourquoi SELECT COUNT(*), MIN(date_cde), MAX(date_cde) FROM commande (sans filtre) est-il quasi instantané ?",
    choix: [
      "Grâce aux index automatiques",
      "Il lit seulement les métadonnées",
      "La table est toujours en cache",
      "Il lit un échantillon de la table"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Pas d'index.",
      "Oui. Snowflake connaît ces valeurs dans les métadonnées de chaque micro-partition : pas besoin de lire les données. Requêtes « métadonnées seules », souvent sans warehouse.",
      "Non. Il lit les métadonnées, pas un cache.",
      "Non. Le résultat est exact, pas estimé."
    ],
    retenir: "COUNT / MIN / MAX sans filtre : métadonnées."
  },
  {
    id: "m14-q15", dialecte: "Snowflake",
    q: "Qu'est-ce qu'une micro-partition ?",
    choix: [
      "Un index sur une colonne",
      "Un bloc immuable, avec métadonnées",
      "Une table temporaire de session",
      "Une partition définie à la main par l'admin"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Pas d'index sur Snowflake.",
      "Oui. Un bloc de stockage immuable (environ 50 à 500 Mo non compressés), rangé par colonnes, avec des métadonnées (min, max…). Snowflake découpe automatiquement chaque table.",
      "Non. C'est un bloc de stockage permanent.",
      "Non. Le découpage est automatique."
    ],
    retenir: "Micro-partition = bloc immuable + métadonnées."
  },
  {
    id: "m14-q16", dialecte: "Snowflake",
    q: "Qu'est-ce que le « pruning » ?",
    choix: [
      "La suppression des vieilles données",
      "Sauter les partitions inutiles",
      "La compression des micro-partitions",
      "Le tri automatique des lignes"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Il saute des partitions à la lecture.",
      "Oui. Sauter les micro-partitions qui ne peuvent pas contenir les lignes recherchées, grâce à leur min / max. C'est le principal levier de performance sur Snowflake.",
      "Non. Ce n'est pas une compression.",
      "Non. Ce n'est pas un tri."
    ],
    retenir: "Pruning = ne lire que les partitions utiles."
  },
  {
    id: "m14-q17", dialecte: "Snowflake",
    q: "Dans le Query Profile, « Partitions scanned : 9 800 / Partitions total : 10 000 » pour un filtre sur une date. Interprétation ?",
    choix: [
      "Excellent : peu de partitions lues",
      "Pruning presque nul",
      "Une erreur de statistiques",
      "Les partitions sont presque vides"
    ],
    bonne: 1,
    pourquoi: [
      "Non. 98 % des partitions sont lues.",
      "Oui. Les dates sont dispersées dans toutes les partitions (ou le filtre empêche le pruning). Vérifie le filtre (fonction sur la colonne ?) ; si la table est énorme et toujours filtrée ainsi, une clé de clustering peut aider.",
      "Non. Pas de statistiques à gérer sur Snowflake.",
      "Non. Elles sont lues car elles peuvent contenir la date."
    ],
    retenir: "Scanned ≈ total = pruning inefficace."
  },
  {
    id: "m14-q18", dialecte: "Snowflake",
    q: "Pourquoi les données chargées chaque jour par date sont-elles naturellement bien « rangées » pour un filtre sur la date de chargement ?",
    choix: [
      "Par hasard, sans raison particulière",
      "Chaque partition couvre peu de dates",
      "Grâce à un index automatique sur la date",
      "Ce n'est pas le cas"
    ],
    bonne: 1,
    pourquoi: [
      "Non. L'ordre de chargement explique ce rangement.",
      "Oui. Les nouvelles micro-partitions contiennent les nouvelles dates : chaque partition couvre une petite plage, le pruning marche bien. « Clustering naturel ». Un filtre sur une autre colonne (ex. client) n'en profite pas.",
      "Non. Pas d'index sur Snowflake.",
      "Non. C'est le cas grâce à l'ordre de chargement."
    ],
    retenir: "Ordre de chargement = rangement naturel."
  },
  {
    id: "m14-q19", dialecte: "Snowflake",
    q: "Quand une clé de clustering (CLUSTER BY) vaut-elle la peine ?",
    choix: [
      "Sur toutes les tables, par défaut",
      "Très grosses tables, mal élaguées",
      "Sur les petites tables de référence",
      "Jamais, c'est déconseillé"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Le reclustering automatique consomme des crédits.",
      "Oui. Plusieurs To, souvent filtrées sur les mêmes colonnes, quand le pruning est mauvais. Mesurer avant / après le gain sur les requêtes et le coût de maintenance.",
      "Non. Inutile.",
      "Non. Utile sur de très grosses tables."
    ],
    retenir: "Clustering : très grosses tables, filtres réguliers."
  },
  {
    id: "m14-q20", dialecte: "Snowflake",
    q: "Quelle fonction mesure la qualité du rangement d'une table sur une colonne ?",
    choixCode: true,
    choix: [
      "SYSTEM$CLUSTERING_INFORMATION('commande', '(date_cde)')",
      "SHOW INDEXES ON commande",
      "DBCC SHOWCONTIG ('commande')",
      "SELECT * FROM SYSTEM$TABLE_STATS('commande')"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Elle donne notamment la profondeur moyenne de chevauchement des partitions.",
      "Non. Pas d'index sur Snowflake.",
      "Non. SQL Server.",
      "Non. Cette fonction n'existe pas."
    ],
    retenir: "SYSTEM$CLUSTERING_INFORMATION."
  },
  {
    id: "m14-q21", dialecte: "Snowflake",
    q: "Des requêtes cherchent très souvent UNE commande par son numéro dans une table de 5 milliards de lignes. Quel service Snowflake est fait pour ça ?",
    choix: [
      "Un index B-tree sur le numéro",
      "Le Search Optimization Service",
      "Un warehouse 6XL dédié",
      "Le cache de résultats du compte"
    ],
    bonne: 1,
    pourquoi: [
      "Non. N'existe pas sur Snowflake.",
      "Oui. Fait pour les recherches ponctuelles très sélectives : il maintient des structures pour retrouver vite quelques lignes (coût de maintenance, édition Enterprise).",
      "Non. Cher et inefficace.",
      "Non. Chaque numéro est différent."
    ],
    retenir: "Recherches ponctuelles massives : Search Optimization."
  },
  {
    id: "m14-q22", dialecte: "Snowflake",
    q: "Le Query Profile indique « Bytes spilled to local storage » puis « to remote storage ». Que faire ?",
    choix: [
      "Rien, c'est un message normal",
      "Manque de mémoire",
      "Ajouter un index sur la jointure",
      "Vider le cache de résultats"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Le débordement distant est très lent.",
      "Oui. La mémoire du warehouse ne suffit pas : réduire les données traitées (filtres, colonnes) ou augmenter la taille du warehouse. Souvent, un filtre plus tôt ou une jointure mieux écrite suffit.",
      "Non. Pas d'index sur Snowflake.",
      "Non. Ça ne règle pas le manque de mémoire."
    ],
    retenir: "Spilling = mémoire insuffisante."
  },
  {
    id: "m14-q23", dialecte: "Snowflake",
    q: "Dans le Query Profile, quel opérateur prend le plus souvent le temps dans une requête lente ?",
    choix: [
      "Toujours le SELECT final",
      "Ça dépend : il faut regarder",
      "Toujours le tri (ORDER BY)",
      "Le profil n'indique pas les temps"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Ça dépend de la requête.",
      "Oui. Souvent TableScan (trop de partitions lues) ou une jointure qui explose (plus de lignes en sortie qu'en entrée). Le profil donne le pourcentage de temps par opérateur : commence par le plus gros.",
      "Non. Ça dépend de la requête.",
      "Non. Il donne le temps de chaque opérateur."
    ],
    retenir: "Query Profile : attaquer l'opérateur le plus coûteux."
  },
  {
    id: "m14-q24", dialecte: "Snowflake",
    q: "Pourquoi éviter SELECT * sur une table de 300 colonnes dans Snowflake ?",
    choix: [
      "C'est interdit sur les grandes tables",
      "Il lit toutes les colonnes",
      "Ça désactive le cache de résultats",
      "Ça force un tri des lignes"
    ],
    bonne: 1,
    pourquoi: [
      "Non. C'est permis, mais coûteux.",
      "Oui. Stockage en colonnes : Snowflake ne lit que les colonnes demandées. Avec *, il lit tout : plus de données, plus de temps, plus de crédits. Lister 5 colonnes peut diviser fortement le volume lu.",
      "Non. Le cache marche toujours.",
      "Non. Il ne trie rien."
    ],
    retenir: "Colonnes listées = moins de données lues."
  },
  {
    id: "m14-q25", dialecte: "Snowflake",
    q: "LIMIT 10 réduit-il toujours la quantité de données lues ?",
    choix: [
      "Oui, toujours",
      "Non, pas avec un tri",
      "Non, jamais",
      "Oui, sauf sur les vues"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Pas avec un tri ou un agrégat.",
      "Oui. Avec un ORDER BY ou un agrégat, Snowflake doit souvent tout lire avant de garder 10 lignes. Pour explorer à moindre coût : SAMPLE, ou filtrer sur une date.",
      "Non. Sans tri, il peut s'arrêter tôt.",
      "Non. Les vues n'ont rien à voir."
    ],
    retenir: "LIMIT ne garantit pas une lecture réduite."
  },
  {
    id: "m14-q26", dialecte: "Snowflake",
    q: "Comment lire la table commande telle qu'elle était à 8 h ce matin ?",
    choixCode: true,
    choix: [
      "SELECT * FROM commande AT (TIMESTAMP => '2026-10-26 08:00'::TIMESTAMP_LTZ);",
      "SELECT * FROM commande WHERE date_creation <= '2026-10-26 08:00:00';",
      "SELECT * FROM commande FOR SYSTEM_TIME AS OF '2026-10-26 08:00';",
      "RESTORE TABLE commande TO '2026-10-26 08:00';"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Time Travel : AT (TIMESTAMP => …), AT (OFFSET => -secondes) ou BEFORE (STATEMENT => 'id').",
      "Non. Les lignes créées avant 8 h, mais avec leurs valeurs d'aujourd'hui (et sans celles supprimées depuis).",
      "Non. Syntaxe SQL Server (tables temporelles).",
      "Non. Cette commande n'existe pas."
    ],
    retenir: "Time Travel : AT / BEFORE."
  },
  {
    id: "m14-q27", dialecte: "Snowflake",
    q: "Tu veux voir la table juste AVANT une requête DELETE précise (dont tu as l'identifiant). Quelle syntaxe ?",
    choixCode: true,
    choix: [
      "AT (OFFSET => 0)",
      "BEFORE (STATEMENT => '01b2c3…')",
      "UNDO STATEMENT '01b2c3…'",
      "AT (STATEMENT => '01b2c3…')"
    ],
    bonne: 1,
    pourquoi: [
      "Non. OFFSET 0 = maintenant.",
      "Oui. Précis : l'état exact avant cette requête. L'id se trouve dans l'historique des requêtes.",
      "Non. Cette commande n'existe pas.",
      "Non. AT inclut les changements de cette requête : on verrait la table APRÈS le DELETE."
    ],
    retenir: "BEFORE (STATEMENT => id) = juste avant une requête."
  },
  {
    id: "m14-q28", dialecte: "Snowflake",
    q: "Une table a été supprimée par erreur (DROP TABLE) hier. Comment la récupérer ?",
    choixCode: true,
    choix: [
      "CREATE TABLE … FROM BACKUP",
      "UNDROP TABLE commande;",
      "ROLLBACK",
      "Impossible"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Cette syntaxe n'existe pas.",
      "Oui. Possible tant qu'on est dans la période de Time Travel. Marche aussi pour un schéma ou une base.",
      "Non. Le DROP est validé depuis hier.",
      "Non. UNDROP le permet pendant le Time Travel."
    ],
    retenir: "DROP par erreur : UNDROP."
  },
  {
    id: "m14-q29", dialecte: "Snowflake",
    q: "Quelle est la durée de Time Travel par défaut, et le maximum ?",
    choix: [
      "7 jours ; 365 jours max",
      "1 jour ; 90 jours max",
      "30 jours ; 30 jours max",
      "Aucun par défaut ; 7 jours max"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Ce n'est pas la durée par défaut.",
      "Oui. 90 jours en édition Enterprise. Réglable par table, schéma ou base (DATA_RETENTION_TIME_IN_DAYS). Plus long = plus de stockage.",
      "Non. Ce n'est pas la durée par défaut.",
      "Non. Il y a 1 jour par défaut."
    ],
    retenir: "Time Travel : 1 jour par défaut, 90 max (Enterprise)."
  },
  {
    id: "m14-q30", dialecte: "Snowflake",
    q: "Qu'est-ce que le Fail-safe ?",
    choix: [
      "Un autre nom du Time Travel",
      "7 jours de plus, via le support",
      "Une sauvegarde manuelle planifiée",
      "Un antivirus sur les fichiers chargés"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Il vient après le Time Travel.",
      "Oui. 7 jours de protection supplémentaires APRÈS le Time Travel, accessibles seulement par le support Snowflake en cas de sinistre. Pas un outil du quotidien. Les tables TRANSIENT n'en ont pas.",
      "Non. Il est automatique.",
      "Non. Rien à voir avec la sécurité antivirus."
    ],
    retenir: "Fail-safe : 7 jours, via le support uniquement."
  },
  {
    id: "m14-q31", dialecte: "Snowflake",
    q: "Que fait CREATE DATABASE dev CLONE prod; ?",
    choix: [
      "Copie physiquement toutes les données (des heures)",
      "Une copie instantanée qui partage le stockage",
      "Crée une base vide de même structure",
      "Crée un lien en lecture seule vers prod"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Le clone est instantané : rien n'est copié.",
      "Oui. La nouvelle base partage les données de prod ; seules les modifications futures prennent de la place. « Zéro copie » : parfait pour un environnement de test réaliste.",
      "Non. Le clone contient les données.",
      "Non. Le clone est modifiable, indépendamment de prod."
    ],
    retenir: "CLONE = copie instantanée, stockage partagé."
  },
  {
    id: "m14-q32", dialecte: "Snowflake",
    q: "Comment cloner une table telle qu'elle était hier ?",
    choixCode: true,
    choix: [
      "CREATE TABLE commande_hier CLONE commande;",
      "CREATE TABLE commande_hier CLONE commande AT (OFFSET => -86400);",
      "CREATE TABLE commande_hier LIKE commande AT (OFFSET => -86400);",
      "UNDROP TABLE commande AT (OFFSET => -86400);"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Clone l'état actuel, pas celui d'hier.",
      "Oui. Clone + Time Travel : idéal pour comparer avant / après un traitement.",
      "Non. LIKE copie seulement la structure, sans les données.",
      "Non. UNDROP restaure une table supprimée ; il ne crée pas de copie."
    ],
    retenir: "CLONE … AT / BEFORE = copie d'un état passé."
  },
  {
    id: "m14-q33", dialecte: "Snowflake",
    q: "Une table clonée garde-t-elle l'historique des fichiers déjà chargés par COPY INTO ?",
    choix: [
      "Oui, il hérite de tout l'historique",
      "Non, le clone ne l'a pas",
      "Oui, pendant 64 jours",
      "Seulement en édition Enterprise"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Le clone n'a pas cet historique.",
      "Oui. Un COPY INTO sur le clone pourrait recharger des fichiers déjà présents. Point d'attention pour les tests de chargement sur un environnement cloné.",
      "Non. Il n'a pas cet historique.",
      "Non. Même règle partout."
    ],
    retenir: "Clone : pas d'historique de chargement."
  },
  {
    id: "m14-q34", dialecte: "Snowflake",
    q: "Qu'est-ce qu'un « stage » sur Snowflake ?",
    choix: [
      "Une étape dans l'exécution d'une requête",
      "Une zone de fichiers",
      "Une table temporaire de transit",
      "Un warehouse de chargement"
    ],
    bonne: 1,
    pourquoi: [
      "Non. C'est un emplacement de fichiers.",
      "Oui. Un emplacement de fichiers (interne à Snowflake ou externe : S3, Azure, GCS) d'où l'on charge et où l'on décharge des données. Fichiers → stage → COPY INTO table.",
      "Non. Ce n'est pas une table.",
      "Non. Un warehouse ne stocke pas de fichiers."
    ],
    retenir: "Stage = zone de fichiers."
  },
  {
    id: "m14-q35", dialecte: "Snowflake",
    q: "Que désignent @~, @%commande et @mon_stage ?",
    choix: [
      "Trois variables de session",
      "Stage utilisateur, de table, nommé",
      "Trois chemins de fichiers sur ton PC",
      "Trois rôles système"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Ce sont des stages.",
      "Oui. @~ : le stage de l'utilisateur ; @%commande : le stage de la table commande ; @mon_stage : un stage nommé. Pour un flux d'entreprise, on préfère un stage nommé, avec un format de fichier défini.",
      "Non. Ce sont des zones dans Snowflake.",
      "Non. Ce sont des stages."
    ],
    retenir: "@~ utilisateur, @%table, @stage nommé."
  },
  {
    id: "m14-q36", dialecte: "Snowflake",
    q: "À quoi sert un FILE FORMAT nommé ?",
    choixCode: true,
    choix: [
      "À rien, le format est deviné",
      "Décrire le fichier une seule fois",
      "À compresser les fichiers du stage",
      "À trier les lignes au chargement"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Il faut le décrire.",
      "Oui. CSV, séparateur ;, entête, encodage, format de date… réutilisé dans les COPY. Ex. CREATE FILE FORMAT ff_csv_fr TYPE = CSV FIELD_DELIMITER = ';' SKIP_HEADER = 1 …",
      "Non. Il décrit le fichier, il ne compresse pas.",
      "Non. Il ne trie rien."
    ],
    retenir: "FILE FORMAT : décrire le fichier une seule fois."
  },
  {
    id: "m14-q37", dialecte: "Snowflake",
    q: "Par défaut, que fait COPY INTO si une ligne d'un fichier est invalide ?",
    choix: [
      "Il ignore la ligne et continue",
      "Il arrête tout",
      "Il corrige la ligne si possible",
      "Il met les valeurs fausses à NULL"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Seulement avec ON_ERROR = CONTINUE.",
      "Oui. ON_ERROR = ABORT_STATEMENT par défaut. On peut choisir CONTINUE (ignorer les lignes en erreur) ou SKIP_FILE (ignorer le fichier).",
      "Non. Il ne corrige rien.",
      "Non. Il arrête tout par défaut."
    ],
    retenir: "COPY : ON_ERROR = ABORT_STATEMENT par défaut."
  },
  {
    id: "m14-q38", dialecte: "Snowflake",
    q: "Comment vérifier les erreurs d'un fichier SANS le charger ?",
    choixCode: true,
    choix: [
      "COPY INTO t FROM @stage VALIDATION_MODE = RETURN_ERRORS;",
      "COPY INTO t FROM @stage ON_ERROR = CONTINUE;",
      "SELECT * FROM @stage WHERE erreur = TRUE;",
      "COPY INTO t FROM @stage FORCE = TRUE;"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Liste les erreurs (ligne, colonne, message) sans rien insérer.",
      "Non. Ça charge les lignes valides.",
      "Non. Pas de colonne « erreur » dans un fichier.",
      "Non. Ça force le rechargement."
    ],
    retenir: "Tester un fichier : VALIDATION_MODE."
  },
  {
    id: "m14-q39", dialecte: "Snowflake",
    q: "Tu relances un COPY INTO sur le même dossier. Les fichiers déjà chargés sont-ils rechargés ?",
    choix: [
      "Oui, en doublon",
      "Non, ils sont sautés",
      "Oui, sauf le premier fichier",
      "Erreur : dossier déjà chargé"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Ils sont sautés.",
      "Oui. Snowflake garde l'historique de chargement (64 jours) et saute les fichiers déjà chargés. Chargement naturellement relançable. FORCE = TRUE pour forcer (avec prudence).",
      "Non. Tous les fichiers déjà chargés sont sautés.",
      "Non. Pas d'erreur : ils sont sautés."
    ],
    retenir: "COPY INTO : pas de double chargement (64 jours)."
  },
  {
    id: "m14-q40", dialecte: "Snowflake",
    q: "Qu'est-ce que Snowpipe ?",
    choix: [
      "Un outil de schéma des flux",
      "Le chargement continu automatique",
      "Un connecteur Power BI natif",
      "Un tuyau réseau entre deux comptes Snowflake"
    ],
    bonne: 1,
    pourquoi: [
      "Non. C'est un chargement automatique.",
      "Oui. Dès qu'un fichier arrive dans le stage, il est chargé (sans warehouse à gérer). Idéal pour des flux réguliers (fichiers EDI qui arrivent au fil de la journée).",
      "Non. Ce n'est pas un connecteur.",
      "Non. Ça ressemble plutôt au partage de données."
    ],
    retenir: "Snowpipe = chargement au fil de l'eau."
  },
  {
    id: "m14-q41", dialecte: "Snowflake",
    q: "Comment exporter le résultat d'une requête vers des fichiers CSV dans un stage ?",
    choixCode: true,
    choix: [
      "EXPORT (SELECT …) TO '@mon_stage/export/' AS CSV;",
      "COPY INTO @mon_stage/export/ FROM (SELECT …);",
      "SELECT … INTO OUTFILE '@mon_stage/export/';",
      "PUT (SELECT …) @mon_stage/export/;"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Cette syntaxe n'existe pas.",
      "Oui. Avec FILE_FORMAT = (TYPE = CSV) HEADER = TRUE. COPY INTO marche dans les deux sens : vers une table ou vers un stage.",
      "Non. Syntaxe MySQL.",
      "Non. PUT envoie un fichier local vers un stage."
    ],
    retenir: "Export : COPY INTO @stage FROM (SELECT …)."
  },
  {
    id: "m14-q42", dialecte: "Snowflake",
    q: "Une colonne VARIANT contient {\"client\": {\"nom\": \"Dupont\"}}. Comment lire le nom en texte ?",
    choixCode: true,
    choix: [
      "doc.client.nom",
      "doc:client.nom::STRING",
      "JSON_VALUE(doc, '$.client.nom')",
      "doc['client']['nom']"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Le point seul sert aux noms d'objets.",
      "Oui. : pour entrer dans le JSON, . pour descendre, :: pour convertir.",
      "Non. Syntaxe SQL Server.",
      "Non. Ça marche aussi en partie, mais sans conversion, le résultat reste un VARIANT entre guillemets."
    ],
    retenir: "VARIANT : col:chemin::TYPE."
  },
  {
    id: "m14-q43", dialecte: "Snowflake",
    q: "Pourquoi ajouter ::STRING à doc:client.nom ?",
    choix: [
      "Inutile, c'est déjà du texte",
      "Pour avoir un vrai texte",
      "Pour trier plus vite",
      "Pour compresser la valeur"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Sans conversion, c'est un VARIANT.",
      "Oui. Sans conversion, le résultat est un VARIANT (affiché \"Dupont\" avec guillemets) ; avec ::STRING, c'est un vrai texte comparable et joignable. Toujours typer ce qu'on extrait d'un JSON.",
      "Non. Le but est d'avoir un vrai texte.",
      "Non. Il ne compresse rien."
    ],
    retenir: "Extraire du JSON = convertir (::)."
  },
  {
    id: "m14-q44", dialecte: "Snowflake",
    q: "Une commande JSON contient un tableau \"lignes\". Comment obtenir une ligne SQL par ligne de commande ?",
    choixCode: true,
    choix: [
      "SELECT doc:lignes FROM t",
      "SELECT l.value:art FROM t, LATERAL FLATTEN(input => t.doc:lignes) l",
      "SELECT l.art FROM t CROSS APPLY OPENJSON(t.doc, '$.lignes') l",
      "SELECT doc:lignes[0]:art, doc:lignes[1]:art FROM t"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Le tableau entier sur une seule ligne.",
      "Oui. FLATTEN déplie le tableau ; value contient chaque élément. Ajoute :: pour typer (l.value:qte::NUMBER).",
      "Non. Syntaxe SQL Server.",
      "Non. Seulement les 2 premiers éléments, sur une seule ligne."
    ],
    retenir: "Tableau JSON → lignes : LATERAL FLATTEN."
  },
  {
    id: "m14-q45", dialecte: "Snowflake",
    q: "Comment transformer un texte JSON (VARCHAR) en VARIANT ?",
    choixCode: true,
    choix: [
      "CAST(txt AS JSON)",
      "PARSE_JSON(txt)",
      "TO_JSON(txt)",
      "JSON(txt)"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Pas de type JSON sur Snowflake.",
      "Oui. (TRY_PARSE_JSON renvoie NULL si le texte est mal formé.)",
      "Non. TO_JSON fait l'inverse : VARIANT → texte.",
      "Non. Cette fonction n'existe pas."
    ],
    retenir: "Texte → JSON : PARSE_JSON."
  },
  {
    id: "m14-q46", dialecte: "Snowflake",
    q: "Comment construire un objet JSON à partir de colonnes ?",
    choixCode: true,
    choix: [
      "OBJECT_CONSTRUCT('code', code, 'nom', nom)",
      "CONCAT('{\"code\":', code, '}')",
      "JSON_OBJECT('code', code, 'nom', nom)",
      "SELECT code, nom FROM client FOR JSON PATH"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. ARRAY_AGG(OBJECT_CONSTRUCT(…)) donne un tableau d'objets : pratique pour un export API.",
      "Non. Fragile : guillemets et caractères spéciaux.",
      "Non. Syntaxe d'autres moteurs, pas Snowflake.",
      "Non. Syntaxe SQL Server."
    ],
    retenir: "Colonnes → JSON : OBJECT_CONSTRUCT / ARRAY_AGG."
  },
  {
    id: "m14-q47", dialecte: "Snowflake",
    q: "Dans un JSON, les clés \"Nom\" et \"nom\" sont-elles identiques pour Snowflake ?",
    choix: [
      "Oui, la casse est ignorée",
      "Non, ils diffèrent",
      "Seulement si la clé est en majuscules",
      "Ça dépend du warehouse utilisé"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Les clés JSON respectent la casse.",
      "Oui. Les clés JSON tiennent compte de la casse : doc:Nom et doc:nom sont différents. Contrairement aux noms de colonnes sans guillemets.",
      "Non. La casse compte toujours.",
      "Non. Rien à voir avec le warehouse."
    ],
    retenir: "Clés JSON : sensibles à la casse."
  },
  {
    id: "m14-q48", dialecte: "Snowflake",
    q: "Qu'est-ce qu'un STREAM sur Snowflake ?",
    choix: [
      "Un flux vidéo de supervision",
      "Le suivi des changements d'une table",
      "Un type de warehouse en continu",
      "Une copie de la table, mise à jour en continu"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Rien à voir avec la vidéo.",
      "Oui. Il enregistre les changements (insertions, modifications, suppressions) d'une table depuis la dernière lecture. Capture de changements (CDC) : idéal pour des traitements incrémentaux.",
      "Non. Ce n'est pas un warehouse.",
      "Non. Il ne copie pas les données, il garde un repère."
    ],
    retenir: "STREAM = changements depuis la dernière consommation."
  },
  {
    id: "m14-q49", dialecte: "Snowflake",
    q: "Quand un STREAM est-il « vidé » (son repère avance) ?",
    choix: [
      "À chaque SELECT sur le stream",
      "Quand un DML validé l'utilise",
      "Toutes les heures, automatiquement",
      "Jamais, il grossit sans fin"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Un simple SELECT ne le consomme pas.",
      "Oui. Quand il est utilisé dans une instruction de modification (INSERT, MERGE…) validée. Si la transaction est annulée, le stream garde ses changements : rien n'est perdu.",
      "Non. Il est vidé quand il est utilisé, pas selon l'heure.",
      "Non. Il est vidé par un DML validé."
    ],
    retenir: "Stream consommé par un DML validé."
  },
  {
    id: "m14-q50", dialecte: "Snowflake",
    q: "Qu'est-ce qu'une « dynamic table » sur Snowflake ?",
    choix: [
      "Une table temporaire de session",
      "Une requête rafraîchie automatiquement",
      "Une table dont les colonnes changent",
      "Une vue simple, recalculée à la lecture"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Elle est permanente.",
      "Oui. Une table définie par une requête, que Snowflake rafraîchit automatiquement avec un délai maximum choisi (TARGET_LAG). Remplace souvent des combinaisons stream + task.",
      "Non. Ses colonnes sont fixes.",
      "Non. Le résultat est stocké."
    ],
    retenir: "Dynamic table = requête matérialisée, rafraîchie automatiquement."
  },
  {
    id: "m14-q51", dialecte: "Snowflake",
    q: "Sur Snowflake, à qui donne-t-on les droits (SELECT, INSERT…) ?",
    choix: [
      "Directement aux utilisateurs",
      "À des rôles",
      "Aux warehouses",
      "Aux tables elles-mêmes"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Ce n'est pas le modèle Snowflake.",
      "Oui. Puis on attribue les rôles aux utilisateurs : contrôle d'accès par rôles (RBAC). Un nouvel arrivant reçoit simplement le bon rôle.",
      "Non. Un warehouse ne reçoit pas de droits sur les données.",
      "Non. Les droits portent sur les tables, mais sont donnés à des rôles."
    ],
    retenir: "Droits → rôles → utilisateurs."
  },
  {
    id: "m14-q52", dialecte: "Snowflake",
    q: "Quel rôle système sert normalement à créer et posséder les bases, schémas et tables ?",
    choix: [
      "ACCOUNTADMIN",
      "SYSADMIN",
      "PUBLIC",
      "USERADMIN"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Rôle le plus puissant, à réserver à l'administration du compte.",
      "Oui. SECURITYADMIN gère les droits, USERADMIN les utilisateurs et rôles, PUBLIC est donné à tout le monde.",
      "Non. PUBLIC est donné à tout le monde.",
      "Non. USERADMIN gère les utilisateurs et rôles."
    ],
    retenir: "Objets : SYSADMIN. Droits : SECURITYADMIN. Compte : ACCOUNTADMIN."
  },
  {
    id: "m14-q53", dialecte: "Snowflake",
    q: "Pourquoi ne pas travailler au quotidien avec le rôle ACCOUNTADMIN ?",
    choix: [
      "Il est lent sur les requêtes",
      "Trop de pouvoirs : erreurs coûteuses",
      "Il est facturé en plus",
      "Il ne voit pas les tables des autres rôles"
    ],
    bonne: 1,
    pourquoi: [
      "Non. La vitesse est la même.",
      "Oui. Il a tous les pouvoirs (facturation, sécurité…) : une erreur peut coûter très cher. Et les objets créés lui appartiennent. Moindre privilège : chacun le rôle juste nécessaire, et MFA sur ACCOUNTADMIN.",
      "Non. Aucun coût en plus.",
      "Non. Il hérite des autres rôles système."
    ],
    retenir: "ACCOUNTADMIN : rarement, et protégé."
  },
  {
    id: "m14-q54", dialecte: "Snowflake",
    q: "Tu crées un rôle RL_FINANCE. Pourquoi l'attribuer aussi au rôle SYSADMIN ?",
    choix: [
      "Inutile, c'est automatique",
      "Pour garder une hiérarchie cohérente",
      "Pour lui donner plus de stockage",
      "Pour qu'il puisse utiliser tous les warehouses"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Il faut le rattacher à la main.",
      "Oui. Les administrateurs gardent la main sur les objets créés par ce rôle. Un rôle « orphelin » crée des objets que personne d'autre ne peut gérer.",
      "Non. Les rôles ne reçoivent pas de stockage.",
      "Non. Les warehouses se donnent par GRANT USAGE."
    ],
    retenir: "Rôles personnalisés : rattachés à SYSADMIN."
  },
  {
    id: "m14-q55", dialecte: "Snowflake",
    q: "Quel modèle de rôles est recommandé pour une équipe data ?",
    choix: [
      "Un rôle par personne",
      "Rôles d'accès dans des rôles métier",
      "Tout le monde en ACCOUNTADMIN",
      "Un seul rôle partagé par toute l'équipe"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Ingérable.",
      "Oui. Des rôles d'accès (lecture / écriture par schéma) regroupés dans des rôles métier (ANALYSTE_VENTES, ETL…) attribués aux personnes. Les droits techniques sont définis une fois.",
      "Non. Beaucoup trop de pouvoirs.",
      "Non. Aucune séparation des droits."
    ],
    retenir: "Rôles d'accès + rôles métier."
  },
  {
    id: "m14-q56", dialecte: "Snowflake",
    q: "Une requête échoue : « No active warehouse selected in the current session ». Que faire ?",
    choixCode: true,
    choix: [
      "ALTER WAREHOUSE WH_ANALYSE RESUME;",
      "USE WAREHOUSE WH_ANALYSE;",
      "USE DATABASE PROD;",
      "GRANT USAGE ON WAREHOUSE WH_ANALYSE TO ROLE r;"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Le reprendre ne le sélectionne pas pour la session.",
      "Oui. Ou définir un warehouse par défaut pour l'utilisateur. Il faut aussi que le rôle ait le droit USAGE sur ce warehouse.",
      "Non. La base ne fournit pas de calcul.",
      "Non. Utile, mais ne sélectionne pas le warehouse."
    ],
    retenir: "Pas de warehouse = pas de calcul."
  },
  {
    id: "m14-q57", dialecte: "Snowflake",
    q: "Le rôle ANALYSTE a SELECT sur toutes les tables du schéma VENTES. Une nouvelle table est créée demain. Comment l'inclure automatiquement ?",
    choixCode: true,
    choix: [
      "GRANT SELECT ON ALL TABLES IN SCHEMA VENTES TO ROLE ANALYSTE;",
      "GRANT SELECT ON FUTURE TABLES IN SCHEMA VENTES TO ROLE ANALYSTE;",
      "GRANT ALL ON SCHEMA VENTES TO ROLE ANALYSTE;",
      "GRANT OWNERSHIP ON SCHEMA VENTES TO ROLE ANALYSTE;"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Seulement les tables qui existent déjà.",
      "Oui. Les « droits futurs » s'appliquent aux objets créés ensuite.",
      "Non. Trop large, et ne donne pas SELECT sur les tables.",
      "Non. Beaucoup trop large."
    ],
    retenir: "Nouvelles tables couvertes : FUTURE GRANTS."
  },
  {
    id: "m14-q58", dialecte: "Snowflake",
    q: "Le rôle a SELECT sur PROD.VENTES.COMMANDE mais la requête échoue (« does not exist or not authorized »). Que manque-t-il souvent ?",
    choix: [
      "Un index sur la table",
      "USAGE base + schéma",
      "Le droit DELETE sur la table",
      "Un warehouse plus grand"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Pas d'index sur Snowflake.",
      "Oui. Le droit USAGE sur la base PROD et sur le schéma VENTES : pour atteindre une table, il faut pouvoir « entrer » dans la base et le schéma.",
      "Non. Lire ne demande pas DELETE.",
      "Non. Le message parle de droits."
    ],
    retenir: "Lire une table = USAGE base + USAGE schéma + SELECT table."
  },
  {
    id: "m14-q59", dialecte: "Snowflake",
    q: "Sur Snowflake, qui possède un objet (table, vue) ?",
    choix: [
      "L'utilisateur qui l'a créé, pour toujours",
      "Le rôle actif à la création",
      "Le warehouse utilisé",
      "Personne, il est public"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Ce n'est pas la personne.",
      "Oui. Le RÔLE actif au moment de la création ; on peut transférer avec GRANT OWNERSHIP. D'où l'importance d'utiliser le bon rôle quand on crée des objets.",
      "Non. Le warehouse ne possède rien.",
      "Non. Chaque objet a un rôle propriétaire."
    ],
    retenir: "Propriétaire = rôle actif à la création."
  },
  {
    id: "m14-q60", dialecte: "Snowflake",
    q: "Comment afficher les IBAN en clair pour le rôle COMPTA, et masqués (***) pour les autres, sans dupliquer les tables ?",
    choix: [
      "Deux tables, une masquée",
      "Une MASKING POLICY",
      "Un trigger à la lecture",
      "Une vue par utilisateur"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Doublons et maintenance lourde.",
      "Oui. Une politique de masquage attachée à la colonne, qui teste CURRENT_ROLE(). Elle s'applique partout, même aux nouvelles requêtes (édition Enterprise).",
      "Non. Pas de triggers sur Snowflake.",
      "Non. Ingérable."
    ],
    retenir: "Données sensibles : masking policy."
  },
  {
    id: "m14-q61", dialecte: "Snowflake",
    q: "Chaque commercial ne doit voir que les ventes de sa région, dans la même table. Quelle fonctionnalité ?",
    choix: [
      "Une politique de masquage",
      "Une ROW ACCESS POLICY",
      "Un warehouse par région",
      "Une table copiée par région"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Le masquage concerne les colonnes.",
      "Oui. Politique d'accès aux lignes : les lignes non autorisées sont filtrées automatiquement selon l'utilisateur ou le rôle.",
      "Non. Un warehouse ne filtre pas les lignes.",
      "Non. Doublons et maintenance lourde."
    ],
    retenir: "Filtrer les lignes par utilisateur : row access policy."
  },
  {
    id: "m14-q62", dialecte: "Snowflake",
    q: "Quelles mesures de base protègent l'accès au compte Snowflake ?",
    choix: [
      "Aucune, le cloud est sûr",
      "MFA, IP autorisées, rôles minimaux",
      "Un mot de passe partagé par l'équipe",
      "Le chiffrement suffit à tout"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Le compte doit être protégé.",
      "Oui. Authentification forte (MFA / SSO), politiques réseau (adresses IP autorisées), comptes de service par clé, rôles minimaux. Les données dans le cloud doivent être protégées comme un serveur interne, voire plus.",
      "Non. Jamais.",
      "Non. Un utilisateur autorisé lit tout, chiffré ou non."
    ],
    retenir: "MFA, IP autorisées, rôles minimaux."
  },
  {
    id: "m14-q63", dialecte: "Snowflake",
    q: "Tu veux donner à un distributeur un accès en lecture à ses ventes, sans lui envoyer de fichiers. Quelle fonctionnalité ?",
    choix: [
      "Un export CSV quotidien par mail",
      "Le partage sécurisé de données",
      "Un accès VPN à ton réseau",
      "Une copie de la base dans son compte"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Possible, mais lourd et vite obsolète.",
      "Oui. Secure Data Sharing : il interroge les données directement, sans copie. Il paie son propre calcul ; les données restent à jour et sous ton contrôle (vue sécurisée filtrée).",
      "Non. Il n'accède pas à ton réseau.",
      "Non. Copie vite obsolète."
    ],
    retenir: "Partenaire : partage sécurisé, sans copie."
  },
  {
    id: "m14-q64", dialecte: "Snowflake",
    q: "Le distributeur n'a pas de compte Snowflake. Comment lui partager quand même les données ?",
    choix: [
      "Impossible : il doit acheter un compte Snowflake",
      "Un « reader account » payé par toi",
      "Lui donner tes identifiants",
      "Lui envoyer un mail chaque jour"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Un reader account le permet.",
      "Oui. Un « reader account » créé et payé par ton entreprise, à travers lequel il consulte le partage. Attention : son calcul est facturé à ton compte.",
      "Non. Jamais.",
      "Non. Lourd et vite obsolète."
    ],
    retenir: "Partenaire sans compte : reader account."
  },
  {
    id: "m14-q65", dialecte: "Snowflake",
    q: "À quoi sert la Snowflake Marketplace ?",
    choix: [
      "À acheter des warehouses",
      "Des jeux de données externes",
      "À vendre des licences Snowflake",
      "À télécharger des pilotes ODBC"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Ce sont des données, pas des warehouses.",
      "Oui. Des jeux de données (météo, données économiques…) partagés par des fournisseurs, directement dans son compte. Ex. croiser les ventes de piscines avec la météo, sans aucun chargement.",
      "Non. Ce n'est pas un magasin de licences.",
      "Non. Ce n'est pas un téléchargement de logiciels."
    ],
    retenir: "Marketplace = données externes prêtes à l'emploi."
  },
  {
    id: "m14-q66", dialecte: "Snowflake",
    q: "Différence entre INFORMATION_SCHEMA et SNOWFLAKE.ACCOUNT_USAGE ?",
    choix: [
      "Aucune, ce sont des alias",
      "Base, court terme vs compte, 1 an",
      "ACCOUNT_USAGE est en temps réel, sans délai",
      "INFORMATION_SCHEMA est payant"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Portée et durée différentes.",
      "Oui. INFORMATION_SCHEMA : par base, temps réel, historique court. ACCOUNT_USAGE : tout le compte, historique long (1 an), avec un délai de mise à jour. Pour un suivi des coûts sur plusieurs mois : ACCOUNT_USAGE.",
      "Non. Délai de quelques dizaines de minutes à quelques heures.",
      "Non. Il est inclus."
    ],
    retenir: "Temps réel : INFORMATION_SCHEMA. Historique : ACCOUNT_USAGE."
  },
  {
    id: "m14-q67", dialecte: "Snowflake",
    q: "Comment trouver les requêtes les plus longues du mois sur Snowflake ?",
    choixCode: true,
    choix: [
      "SELECT … FROM SNOWFLAKE.ACCOUNT_USAGE.QUERY_HISTORY ORDER BY …",
      "SELECT … FROM sys.dm_exec_query_stats ORDER BY total_elapsed_time DESC",
      "SELECT … FROM INFORMATION_SCHEMA.TABLES ORDER BY last_altered DESC",
      "SHOW QUERIES ORDER BY duration DESC"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Avec WHERE start_time >= … ORDER BY total_elapsed_time DESC. On a aussi l'utilisateur, le warehouse, les octets lus, les partitions lues…",
      "Non. SQL Server.",
      "Non. Liste les tables, pas les requêtes.",
      "Non. Cette commande n'existe pas."
    ],
    retenir: "Requêtes coûteuses : QUERY_HISTORY."
  },
  {
    id: "m14-q68", dialecte: "Snowflake",
    q: "Comment savoir combien de crédits chaque warehouse a consommé ?",
    choixCode: true,
    choix: [
      "SNOWFLAKE.ACCOUNT_USAGE.WAREHOUSE_METERING_HISTORY",
      "SNOWFLAKE.ACCOUNT_USAGE.WAREHOUSE_LOAD_HISTORY",
      "SNOWFLAKE.ACCOUNT_USAGE.TABLE_STORAGE_METRICS",
      "INFORMATION_SCHEMA.WAREHOUSE_CREDITS"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Base du suivi budgétaire (Snowsight l'affiche aussi).",
      "Non. Donne la charge (requêtes en cours, en file), pas les crédits.",
      "Non. Donne le stockage des tables.",
      "Non. Cette vue n'existe pas."
    ],
    retenir: "Crédits par warehouse : WAREHOUSE_METERING_HISTORY."
  },
  {
    id: "m14-q69", dialecte: "Snowflake",
    q: "Plusieurs rapports partagent un warehouse. Comment savoir quel rapport coûte le plus ?",
    choixCode: true,
    choix: [
      "CREATE WAREHOUSE wh_rapport_ventes;",
      "ALTER SESSION SET QUERY_TAG = 'rapport_ventes';",
      "ALTER WAREHOUSE wh SET COMMENT = 'rapport_ventes';",
      "SELECT … FROM QUERY_HISTORY WHERE user_name = 'BI';"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Un warehouse par rapport : excessif.",
      "Oui. Dans chaque outil, puis analyser QUERY_HISTORY par tag : le tag est enregistré avec chaque requête.",
      "Non. Un commentaire sur le warehouse ne distingue pas les rapports.",
      "Non. Tous les rapports utilisent souvent le même compte de service."
    ],
    retenir: "Attribuer les coûts : QUERY_TAG."
  },
  {
    id: "m14-q70", dialecte: "Snowflake",
    q: "Comment filtrer le résultat d'une commande SHOW TABLES avec du SQL ?",
    choixCode: true,
    choix: [
      "SHOW TABLES WHERE rows > 1000;",
      "SELECT * FROM TABLE(RESULT_SCAN(LAST_QUERY_ID())) WHERE \"rows\" > 1000;",
      "SELECT * FROM (SHOW TABLES) WHERE rows > 1000;",
      "SHOW TABLES; SELECT * FROM SHOW_RESULT WHERE rows > 1000;"
    ],
    bonne: 1,
    pourquoi: [
      "Non. SHOW n'accepte que LIKE / IN.",
      "Oui. Juste après SHOW TABLES;. RESULT_SCAN relit le résultat d'une requête précédente. (Noms de colonnes en minuscules, entre guillemets.)",
      "Non. Syntaxe invalide.",
      "Non. SHOW_RESULT n'existe pas."
    ],
    retenir: "Résultat de SHOW : RESULT_SCAN(LAST_QUERY_ID())."
  },
  {
    id: "m14-q71", dialecte: "Snowflake",
    q: "Une table de 1 To a 90 jours de Time Travel et est entièrement réécrite chaque nuit. Quel effet sur le stockage ?",
    choix: [
      "Aucun effet sur le stockage",
      "Le stockage peut fortement gonfler",
      "Le stockage diminue chaque nuit",
      "Les anciennes données sont perdues"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Les versions gardées prennent de la place.",
      "Oui. Les anciennes versions sont gardées 90 jours (+ 7 jours de Fail-safe) : le stockage peut être bien plus grand que la table. Pour une table rechargée, une rétention courte ou une table TRANSIENT est plus économique.",
      "Non. Il augmente.",
      "Non. Elles restent récupérables un temps."
    ],
    retenir: "Time Travel long + réécritures = stockage qui gonfle."
  },
  {
    id: "m14-q72", dialecte: "Snowflake",
    q: "Après un gros UPDATE sur une table, pourquoi le stockage facturé augmente-t-il ?",
    choix: [
      "Un bug de facturation",
      "Anciennes versions conservées",
      "L'UPDATE double toujours la table",
      "Le cache de résultats est facturé"
    ],
    bonne: 1,
    pourquoi: [
      "Non. C'est le Time Travel.",
      "Oui. Les micro-partitions réécrites remplacent les anciennes, mais les anciennes restent pour le Time Travel et le Fail-safe. Elles disparaissent à la fin des périodes de rétention.",
      "Non. Pas toujours le double.",
      "Non. Le cache de résultats n'est pas facturé ainsi."
    ],
    retenir: "Modifier = anciennes versions gardées un temps."
  },
  {
    id: "m14-q73", dialecte: "Snowflake",
    q: "Une requête mal écrite tourne depuis 9 heures. Quel paramètre aurait pu l'arrêter automatiquement ?",
    choixCode: true,
    choix: [
      "AUTO_SUSPEND = 60",
      "STATEMENT_TIMEOUT_IN_SECONDS = 3600",
      "STATEMENT_QUEUED_TIMEOUT_IN_SECONDS = 3600",
      "DATA_RETENTION_TIME_IN_DAYS = 1"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Le warehouse ne s'arrête pas tant qu'une requête tourne.",
      "Oui. Sur le warehouse, l'utilisateur ou la session. Par défaut 2 jours : souvent bien trop long. Ex. 1 heure sur le warehouse d'exploration.",
      "Non. Limite seulement l'attente en file, pas l'exécution.",
      "Non. Concerne le Time Travel."
    ],
    retenir: "Requêtes sans fin : STATEMENT_TIMEOUT_IN_SECONDS."
  },
  {
    id: "m14-q74", dialecte: "Snowflake",
    q: "Le Query Profile indique que la requête a passé beaucoup de temps « en file d'attente » (queued). Cause ?",
    choix: [
      "Un verrou sur la table",
      "Warehouse saturé",
      "Un disque trop lent",
      "Une coupure du réseau"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Ce serait « blocked ».",
      "Oui. Le warehouse était déjà occupé par d'autres requêtes : plus de place pour une de plus. Solutions : multi-cluster, warehouse dédié, ou étaler les traitements.",
      "Non. File d'attente = warehouse occupé.",
      "Non. File d'attente = warehouse occupé."
    ],
    retenir: "Queued = warehouse saturé."
  },
  {
    id: "m14-q75", dialecte: "Snowflake",
    q: "Power BI sur Snowflake : quelle différence de coût entre le mode Import et le mode DirectQuery ?",
    choix: [
      "Aucune, le coût est le même",
      "DirectQuery coûte à chaque clic",
      "DirectQuery est gratuit pour Snowflake",
      "Import est interdit sur Snowflake"
    ],
    bonne: 1,
    pourquoi: [
      "Non. DirectQuery consomme à chaque clic.",
      "Oui. Import : Snowflake travaille seulement lors des rafraîchissements planifiés. DirectQuery : chaque clic lance des requêtes, le warehouse tourne beaucoup plus. DirectQuery se justifie pour des données très volumineuses ou très fraîches.",
      "Non. Chaque requête consomme.",
      "Non. Import est permis."
    ],
    retenir: "Import = coût maîtrisé. DirectQuery = coût à chaque clic."
  },
  {
    id: "m14-q76", dialecte: "Snowflake",
    q: "Un rapport Power BI en DirectQuery coûte trop cher. Pistes ?",
    choix: [
      "Augmenter la taille du warehouse",
      "Pré-agréger et bien modéliser",
      "Supprimer le rapport",
      "Ajouter des index sur les tables"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Plus cher.",
      "Oui. Tables agrégées (ou dynamic tables) pour les visuels, modèle en étoile, mode Import ou composite, warehouse dédié avec AUTO_SUSPEND. Moins de données lues par clic = moins de crédits.",
      "Non. Le besoin reste.",
      "Non. Pas d'index sur Snowflake."
    ],
    retenir: "DirectQuery : pré-agréger et bien modéliser."
  },
  {
    id: "m14-q77", dialecte: "Snowflake",
    q: "Sur Snowflake, comment comparer deux textes sans tenir compte de la casse, de façon permanente pour une colonne ?",
    choixCode: true,
    choix: [
      "CREATE INDEX ix ON t (nom) CASE_INSENSITIVE;",
      "nom VARCHAR COLLATE 'en-ci'",
      "nom VARCHAR IGNORE CASE",
      "ALTER SESSION SET CASE_SENSITIVE = FALSE;"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Pas d'index sur Snowflake.",
      "Oui. Collation sur la colonne (ci = case insensitive). Sinon, UPPER / ILIKE au cas par cas. (Les collations peuvent avoir un coût en performance.)",
      "Non. Syntaxe inventée.",
      "Non. Ce paramètre n'existe pas."
    ],
    retenir: "Snowflake : collation 'en-ci' pour ignorer la casse."
  },
  {
    id: "m14-q78", dialecte: "Snowflake",
    q: "Qu'est-ce qu'une table externe (EXTERNAL TABLE) sur Snowflake ?",
    choix: [
      "Une table copiée depuis un autre compte",
      "Des fichiers lus sans être chargés",
      "Une table temporaire de session",
      "Une vue sur une autre base"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Ce serait du partage de données.",
      "Oui. Une table qui lit directement des fichiers restés dans un stockage externe (S3, Azure), sans les charger. Pratique pour explorer, mais plus lente qu'une table chargée.",
      "Non. Elle est permanente.",
      "Non. Elle lit des fichiers externes."
    ],
    retenir: "Table externe = interroger des fichiers sans les charger."
  },
  {
    id: "m14-q79", dialecte: "Snowflake",
    q: "Laquelle de ces fonctionnalités demande au moins l'édition Enterprise ?",
    choix: [
      "Le Time Travel de 1 jour",
      "Les warehouses multi-cluster",
      "Les requêtes SELECT simples",
      "Les rôles et les utilisateurs"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Disponible partout.",
      "Oui. Comme le Time Travel jusqu'à 90 jours ou les politiques de masquage. Vérifie l'édition du compte avant de concevoir une solution.",
      "Non. Disponibles partout.",
      "Non. Disponibles partout."
    ],
    retenir: "Certaines fonctions = édition Enterprise."
  },
  {
    id: "m14-q80", dialecte: "Snowflake",
    q: "Pourquoi le choix de la région (ex. Europe) lors de la création du compte Snowflake est-il important ?",
    choix: [
      "Il ne l'est pas",
      "Les données y sont stockées",
      "Pour la langue de l'interface",
      "Pour le fuseau horaire par défaut"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Les données y sont stockées.",
      "Oui. Conformité (RGPD, contrats), latence, et certains coûts de transfert. Question à valider avec le DPO et la DSI dès le début du projet.",
      "Non. La langue ne dépend pas de la région.",
      "Non. Le fuseau se règle à part."
    ],
    retenir: "Région = où vivent les données."
  },
  {
    id: "m14-q81", dialecte: "Snowflake",
    q: "Les données stockées dans Snowflake sont-elles chiffrées ?",
    choix: [
      "Non, jamais",
      "Oui, automatiquement",
      "Seulement si on le demande",
      "Seulement les mots de passe"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Elles sont chiffrées automatiquement.",
      "Oui. Au repos et pendant les transferts. Le chiffrement n'empêche pas un utilisateur autorisé de tout lire : les rôles restent essentiels.",
      "Non. C'est automatique.",
      "Non. Toutes les données sont chiffrées."
    ],
    retenir: "Chiffrement automatique. Les droits restent la vraie protection."
  },
  {
    id: "m14-q82", dialecte: "Snowflake",
    q: "Quelles tâches de maintenance SQL Server n'ont pas d'équivalent à faire soi-même sur Snowflake ?",
    choix: [
      "Aucune, tout reste à faire",
      "Index, statistiques, fichiers",
      "Toutes doivent être faites à la main",
      "Seulement les sauvegardes"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Snowflake gère index, statistiques, fichiers.",
      "Oui. Reconstruction d'index, mise à jour des statistiques, gestion des fichiers et du journal : Snowflake les gère. Reste à gérer : coûts, droits, qualité des données, conception des requêtes.",
      "Non. Snowflake les gère.",
      "Non. Les sauvegardes sont gérées aussi (Time Travel, Fail-safe)."
    ],
    retenir: "Snowflake : peu de maintenance technique."
  },
  {
    id: "m14-q83", dialecte: "Snowflake",
    q: "Lors d'une migration SQL Server → Snowflake, qu'est-ce qui doit être repensé ?",
    choix: [
      "Rien, on recopie tout",
      "Index, contraintes, coûts…",
      "Seulement les noms de tables",
      "Seulement le matériel serveur"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Index, contraintes, coûts changent.",
      "Oui. Les index (n'existent plus), la casse et les espaces, les contraintes (non appliquées), les procédures, les fuseaux horaires, la stratégie de coûts. Une migration « copier-coller » donne souvent un système lent ou cher.",
      "Non. Bien plus que les noms.",
      "Non. Il n'y a pas de serveur à gérer."
    ],
    retenir: "Migration = repenser, pas recopier."
  },
  {
    id: "m14-q84", dialecte: "Snowflake",
    q: "Puisque Snowflake n'applique pas les clés primaires et étrangères, comment garantir la qualité des données ?",
    choix: [
      "Impossible sur Snowflake",
      "Des tests après chaque chargement",
      "Faire confiance aux fichiers sources",
      "Mettre des index uniques"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Des tests automatiques le permettent.",
      "Oui. Tests automatiques : unicité, non NULL, références existantes (à la main ou avec un outil comme dbt). Un test qui échoue arrête le traitement avant que les rapports ne soient faux.",
      "Non. Les fichiers peuvent contenir des erreurs.",
      "Non. Pas d'index sur Snowflake."
    ],
    retenir: "Snowflake : qualité = tests automatiques."
  },
  {
    id: "m14-q85", dialecte: "Snowflake",
    q: "Quelle différence entre ETL et ELT ?",
    choix: [
      "Aucune, deux noms pour la même chose",
      "L'ordre : transformer avant ou après",
      "ELT est interdit sur Snowflake",
      "ETL est plus récent que ELT"
    ],
    bonne: 1,
    pourquoi: [
      "Non. L'ordre des étapes change.",
      "Oui. ETL : on transforme avant de charger (dans un outil). ELT : on charge les données brutes dans Snowflake, puis on les transforme en SQL. L'ELT profite de la puissance de Snowflake et garde une trace des données brutes.",
      "Non. C'est l'usage le plus courant.",
      "Non. ETL est plus ancien."
    ],
    retenir: "Snowflake favorise l'ELT."
  },
  {
    id: "m14-q86", dialecte: "Snowflake",
    q: "Pourquoi organiser un entrepôt Snowflake en couches (brut → nettoyé → modèle métier) ?",
    choix: [
      "Pour faire joli",
      "Rôles clairs, recalcul, tests",
      "C'est obligatoire sur Snowflake",
      "Pour économiser du stockage"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Chaque couche a un rôle utile.",
      "Oui. Chaque couche a un rôle clair : on peut recalculer à partir du brut, tester chaque étape, et les rapports ne lisent que des données propres. Souvent RAW / STAGING / CORE / MART (ou bronze / argent / or).",
      "Non. C'est une bonne pratique.",
      "Non. Ça en prend un peu plus."
    ],
    retenir: "Couches : brut, nettoyé, métier."
  },
  {
    id: "m14-q87", dialecte: "Snowflake",
    q: "Des horodatages TIMESTAMP_LTZ s'affichent avec 1 ou 2 heures d'écart selon les utilisateurs. Pourquoi ?",
    choix: [
      "Un bug d'affichage",
      "Le fuseau de la session",
      "Les données sont fausses",
      "Le warehouse est à l'étranger"
    ],
    bonne: 1,
    pourquoi: [
      "Non. C'est le fuseau de la session.",
      "Oui. LTZ s'affiche dans le fuseau de la SESSION (paramètre TIMEZONE) : chaque utilisateur peut avoir un réglage différent. Fixe ALTER SESSION SET TIMEZONE = 'Europe/Paris' (ou au niveau du compte / de l'utilisateur), et choisis le bon type.",
      "Non. La valeur stockée est juste.",
      "Non. Le warehouse ne change pas l'affichage."
    ],
    retenir: "LTZ dépend du TIMEZONE de la session."
  },
  {
    id: "m14-q88", dialecte: "Snowflake",
    q: "Un CREATE OR REPLACE TABLE commande a écrasé la bonne table. Comment récupérer l'ancienne ?",
    choixCode: true,
    choix: [
      "UNDROP TABLE commande;",
      "ALTER TABLE commande RENAME TO commande_vide; UNDROP TABLE commande;",
      "CREATE TABLE commande CLONE commande AT (OFFSET => -3600);",
      "DROP TABLE commande; UNDROP TABLE commande;"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Une table de ce nom existe déjà (la nouvelle) : UNDROP refuse.",
      "Oui. On libère le nom, puis on restaure l'ancienne version grâce au Time Travel.",
      "Non. Le nom est déjà pris, et l'historique de la nouvelle table ne contient pas l'ancienne.",
      "Non. UNDROP restaure la dernière supprimée : la nouvelle table vide."
    ],
    retenir: "Après REPLACE : renommer la nouvelle, puis UNDROP."
  },
  {
    id: "m14-q89", dialecte: "Snowflake",
    q: "Qu'est-ce que Snowpark ?",
    choix: [
      "Un parc d'attractions",
      "Du Python dans Snowflake",
      "Un type de warehouse Python",
      "Un format de fichier Parquet"
    ],
    bonne: 1,
    pourquoi: [
      "Non. C'est une bibliothèque de code.",
      "Oui. Une bibliothèque pour écrire des traitements de données en Python (ou Java / Scala) exécutés dans Snowflake. Les données ne sortent pas : le code vient à elles.",
      "Non. C'est une bibliothèque, pas un warehouse.",
      "Non. Ce n'est pas un format."
    ],
    retenir: "Snowpark = Python dans Snowflake."
  },
  {
    id: "m14-q90", dialecte: "Snowflake",
    q: "Tu dois charger un seul fichier CSV de 40 Go. Conseil pour un chargement efficace ?",
    choix: [
      "Le charger tel quel, en un seul COPY",
      "Le découper en fichiers moyens",
      "Le convertir en Excel avant",
      "Utiliser un warehouse XS"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Un seul gros fichier = un seul fil de chargement.",
      "Oui. Environ 100 à 250 Mo compressés : Snowflake les charge en parallèle. Le parallélisme du warehouse est alors pleinement utilisé.",
      "Non. Excel est limité et plus lourd.",
      "Non. Un petit warehouse charge moins en parallèle."
    ],
    retenir: "Chargement : beaucoup de fichiers moyens > un énorme."
  },
  {
    id: "m14-q91", dialecte: "Snowflake",
    q: "Faut-il décompresser des fichiers .csv.gz avant de les charger dans Snowflake ?",
    choix: [
      "Oui, toujours",
      "Non, il les lit directement",
      "Snowflake refuse le gzip",
      "Oui, sinon le COPY est plus lent"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Snowflake lit le gzip directement.",
      "Oui. Snowflake lit directement les fichiers compressés (gzip, etc.), et le transfert est plus rapide. La compression est détectée automatiquement (ou précisée dans le FILE FORMAT).",
      "Non. Il l'accepte.",
      "Non. C'est plutôt l'inverse."
    ],
    retenir: "Fichiers compressés : acceptés directement."
  },
  {
    id: "m14-q92", dialecte: "Snowflake",
    q: "Que fait l'option PURGE = TRUE dans un COPY INTO ?",
    choix: [
      "Vide la table avant de charger",
      "Supprime les fichiers chargés",
      "Efface les lignes en erreur",
      "Supprime le stage lui-même"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Il supprime les fichiers, pas les lignes.",
      "Oui. Supprime les fichiers du stage une fois chargés avec succès. Évite l'accumulation. Garde une archive ailleurs si tu dois pouvoir rejouer.",
      "Non. Il supprime les fichiers chargés.",
      "Non. Le stage reste."
    ],
    retenir: "PURGE = TRUE : nettoyage du stage après chargement."
  },
  {
    id: "m14-q93", dialecte: "Snowflake",
    q: "Comment convertir une date AAAAMMJJ pendant le chargement, sans table intermédiaire ?",
    choixCode: true,
    choix: [
      "COPY INTO cde FROM @stage_edi CONVERT ($2 AS DATE);",
      "COPY INTO cde FROM (SELECT $1, TO_DATE($2, 'YYYYMMDD') FROM @stage_edi);",
      "INSERT INTO cde SELECT $1, CAST($2 AS DATE) FROM cde_brut;",
      "COPY INTO cde FROM (SELECT $1, $2::DATE('AAAAMMJJ') FROM @stage_edi);"
    ],
    bonne: 1,
    pourquoi: [
      "Non. CONVERT n'existe pas dans COPY.",
      "Oui. $1, $2… désignent les colonnes du fichier. Transformations simples possibles pendant le COPY (avec FILE_FORMAT si besoin).",
      "Non. Passe par une table intermédiaire (cde_brut).",
      "Non. Syntaxe invalide : :: ne prend pas de format."
    ],
    retenir: "COPY avec SELECT : transformations simples au chargement."
  },
  {
    id: "m14-q94", dialecte: "Snowflake",
    q: "Comment regarder le contenu d'un fichier du stage avant de le charger ?",
    choixCode: true,
    choix: [
      "SELECT * FROM @stage_edi/cde.csv LIMIT 10;",
      "SELECT $1, $2 FROM @stage_edi/cde.csv LIMIT 10;",
      "LIST @stage_edi/cde.csv;",
      "DESCRIBE STAGE stage_edi;"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Sur un stage, on désigne les colonnes par $1, $2…",
      "Oui. Ajoute (FILE_FORMAT => 'ff_csv') si le fichier n'est pas un CSV standard. Très utile pour vérifier les séparateurs et formats.",
      "Non. Liste les fichiers, sans leur contenu.",
      "Non. Décrit le stage, pas le fichier."
    ],
    retenir: "Interroger un fichier en stage : SELECT $1… FROM @stage."
  },
  {
    id: "m14-q95", dialecte: "Snowflake",
    q: "Comment enregistrer, pour chaque ligne chargée, le nom du fichier d'origine ?",
    choixCode: true,
    choix: [
      "SELECT FILE_NAME(), $1, $2 … FROM @stage",
      "SELECT METADATA$FILENAME, $1, $2 … FROM @stage",
      "SELECT @@FILENAME, $1, $2 … FROM @stage",
      "SELECT $0, $1, $2 … FROM @stage"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Cette fonction n'existe pas.",
      "Oui. Dans le COPY (avec METADATA$FILE_ROW_NUMBER pour la ligne). Traçabilité parfaite : on retrouve la ligne exacte du fichier EDI d'origine.",
      "Non. Syntaxe inventée.",
      "Non. $0 n'existe pas."
    ],
    retenir: "Traçabilité : METADATA$FILENAME."
  },
  {
    id: "m14-q96", dialecte: "Snowflake",
    q: "Comment voir le stockage d'une table, Time Travel et Fail-safe compris ?",
    choixCode: true,
    choix: [
      "SNOWFLAKE.ACCOUNT_USAGE.TABLE_STORAGE_METRICS",
      "EXEC sp_spaceused 'commande';",
      "SHOW TABLES (colonne bytes)",
      "SNOWFLAKE.ACCOUNT_USAGE.TABLE_TIME_TRAVEL_HISTORY"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Octets actifs, en Time Travel et en Fail-safe : utile pour trouver les tables qui coûtent cher.",
      "Non. SQL Server.",
      "Non. Seulement les octets actifs, sans Time Travel ni Fail-safe.",
      "Non. Cette vue n'existe pas."
    ],
    retenir: "Stockage détaillé : TABLE_STORAGE_METRICS."
  },
  {
    id: "m14-q97", dialecte: "Snowflake",
    q: "Le clustering automatique, le Search Optimization et Snowpipe sont-ils gratuits ?",
    choix: [
      "Oui, inclus dans le prix",
      "Non, ils consomment",
      "Seulement en Enterprise",
      "Gratuits la nuit seulement"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Ils consomment des crédits.",
      "Oui. Ce sont des services « serverless » qui consomment des crédits, à surveiller comme les warehouses. Les coûts apparaissent dans les vues d'historique de consommation.",
      "Non. Ils consomment des crédits partout.",
      "Non. L'heure ne change rien."
    ],
    retenir: "Services serverless = crédits aussi."
  },
  {
    id: "m14-q98", dialecte: "Snowflake",
    q: "Quelles sont les bonnes pratiques de base pour maîtriser les coûts Snowflake ?",
    choix: [
      "Un seul gros warehouse toujours allumé",
      "Taille juste, arrêt auto, quotas",
      "Ne jamais suspendre les warehouses",
      "Tout passer en DirectQuery"
    ],
    bonne: 1,
    pourquoi: [
      "Non. On paie même quand il ne sert pas.",
      "Oui. Warehouses par usage, bien dimensionnés, AUTO_SUSPEND court, resource monitors, timeouts, requêtes qui lisent peu, suivi régulier. Le coût Snowflake se pilote comme un budget de projet.",
      "Non. On paie pour rien.",
      "Non. Plus de requêtes, plus de coût."
    ],
    retenir: "Coûts : taille juste, arrêt auto, quotas, requêtes efficaces, suivi."
  },
  {
    id: "m14-q99", dialecte: "SQL Server + Snowflake",
    q: "Quel changement d'état d'esprit faut-il entre SQL Server et Snowflake pour la performance ?",
    choix: [
      "Aucun, c'est le même moteur",
      "Lire moins, payer le calcul",
      "Snowflake : tout est instantané",
      "SQL Server : pas d'optimisation"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Les deux moteurs sont très différents.",
      "Oui. SQL Server : on optimise surtout avec des index. Snowflake : on lit moins (pruning, colonnes, filtres) et on ajuste la puissance de calcul, en sachant que tout se paie. Une requête lente est aussi une requête chère.",
      "Non. Une requête mal écrite reste lente et chère.",
      "Non. SQL Server s'optimise surtout avec des index."
    ],
    retenir: "Snowflake : moins lire, calcul ajustable, coût visible."
  },
  {
    id: "m14-q100", dialecte: "Snowflake",
    q: "Quelle phrase résume le mieux Snowflake ?",
    choix: [
      "Un SQL Server dans le cloud",
      "Stockage et calcul séparés",
      "Un outil de reporting en ligne",
      "Un ETL hébergé dans le cloud"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Le fonctionnement interne est très différent.",
      "Oui. Un entrepôt cloud où stockage et calcul sont séparés, sans index ni maintenance, avec Time Travel, clonage et partage, facturé à l'usage.",
      "Non. C'est un entrepôt de données.",
      "Non. C'est un entrepôt, pas un outil ETL."
    ],
    retenir: "Snowflake : séparé, sans index, voyage dans le temps, payé à l'usage."
  }
];
