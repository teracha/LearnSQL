LEARNSQL.questions.m14 = [
  {
    id: "m14-q01", dialecte: "Snowflake",
    q: "Quelles sont les trois couches de l'architecture Snowflake ?",
    choix: [
      "Disque, RAM, processeur",
      "Stockage (les données), calcul (les warehouses), services cloud (connexion, optimisation, métadonnées, sécurité)",
      "Tables, vues, index",
      "Client, serveur, réseau"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Le stockage et le calcul sont séparés : on peut les faire grandir indépendamment.",
      "Non.",
      "Non."
    ],
    retenir: "Stockage / calcul / services cloud, séparés."
  },
  {
    id: "m14-q02", dialecte: "Snowflake",
    q: "Qu'est-ce qu'un « virtual warehouse » sur Snowflake ?",
    choix: [
      "Un entrepôt de données",
      "Un groupe de ressources de calcul qui exécute les requêtes ; il ne contient pas de données",
      "Une base de données",
      "Un fichier"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Piège de vocabulaire.",
      "Oui. Les données sont dans le stockage ; le warehouse est le « moteur » qui les lit.",
      "Non.",
      "Non."
    ],
    retenir: "Warehouse = puissance de calcul, pas de stockage."
  },
  {
    id: "m14-q03", dialecte: "Snowflake",
    q: "Passer un warehouse de la taille S à M, qu'est-ce que ça change ?",
    choix: [
      "Rien",
      "Deux fois plus de puissance de calcul, et deux fois plus de crédits par heure de fonctionnement",
      "Plus de stockage",
      "Plus d'utilisateurs autorisés"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Chaque taille double. Une requête qui passe de 10 min à 5 min coûte à peu près pareil.",
      "Non.",
      "Non."
    ],
    retenir: "Taille × 2 = puissance × 2 = crédits/heure × 2."
  },
  {
    id: "m14-q04", dialecte: "Snowflake",
    q: "Comment Snowflake facture-t-il le temps d'un warehouse ?",
    choix: [
      "À la journée",
      "À la seconde, avec un minimum de 60 secondes à chaque démarrage (ou reprise)",
      "À la requête",
      "Au mois, forfait fixe"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Un warehouse qui démarre pour une requête de 2 s coûte 60 s.",
      "Non.",
      "Non."
    ],
    retenir: "Facturation à la seconde, minimum 60 s par démarrage."
  },
  {
    id: "m14-q05", dialecte: "Snowflake",
    q: "À quoi sert AUTO_SUSPEND = 60 sur un warehouse ?",
    choix: [
      "À limiter les requêtes à 60 s",
      "À arrêter automatiquement le warehouse après 60 s sans activité : on ne paie plus quand il ne sert pas",
      "À le redémarrer toutes les minutes",
      "À limiter à 60 utilisateurs"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Avec AUTO_RESUME = TRUE, il redémarre tout seul à la prochaine requête.",
      "Non.",
      "Non."
    ],
    retenir: "AUTO_SUSPEND court + AUTO_RESUME = pas de crédits gaspillés."
  },
  {
    id: "m14-q06", dialecte: "Snowflake",
    q: "Pourquoi un AUTO_SUSPEND trop court (ex. 10 s) n'est-il pas toujours une bonne idée ?",
    choix: [
      "Il est interdit",
      "Chaque redémarrage coûte au moins 60 s et vide le cache local : pour des requêtes fréquentes, ça peut coûter plus et ralentir",
      "Il augmente le stockage",
      "Il bloque les tables"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Trouver le bon équilibre selon l'usage (souvent 60 à 300 s).",
      "Non.",
      "Non."
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
      "Non.",
      "Non. Pas d'index."
    ],
    retenir: "Grosse requête : plus grande taille."
  },
  {
    id: "m14-q08", dialecte: "Snowflake",
    q: "À 9 h, 80 utilisateurs Power BI lancent des requêtes en même temps : beaucoup attendent dans la file. Solution adaptée ?",
    choix: [
      "Un warehouse 4XL",
      "Un warehouse multi-cluster (scale out) : des clusters s'ajoutent automatiquement quand la file s'allonge",
      "Réduire la taille",
      "Supprimer Power BI"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Cher, et pas forcément efficace pour beaucoup de petites requêtes.",
      "Oui. MIN_CLUSTER_COUNT / MAX_CLUSTER_COUNT (édition Enterprise).",
      "Non.",
      "Non."
    ],
    retenir: "Beaucoup d'utilisateurs : multi-cluster."
  },
  {
    id: "m14-q09", dialecte: "Snowflake",
    q: "Pourquoi créer des warehouses séparés pour l'ETL, Power BI et l'exploration ?",
    choix: [
      "C'est obligatoire",
      "Les traitements ne se gênent pas, chaque usage a sa taille adaptée, et on voit le coût de chaque usage",
      "Pour avoir plus de stockage",
      "Pour avoir plus d'index"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Le chargement de nuit ne ralentit pas les tableaux de bord, et inversement.",
      "Non.",
      "Non."
    ],
    retenir: "Un warehouse par usage."
  },
  {
    id: "m14-q10", dialecte: "Snowflake",
    q: "Comment limiter automatiquement la consommation de crédits d'un warehouse sur le mois ?",
    choix: [
      "Impossible",
      "Un RESOURCE MONITOR avec un quota de crédits et des actions (alerte, suspension) à certains seuils",
      "Supprimer le warehouse le 20 du mois",
      "AUTO_SUSPEND = 0"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Ex. alerte à 80 %, suspension à 100 %. Indispensable pour maîtriser le budget.",
      "Non.",
      "Non. 0 = jamais de suspension."
    ],
    retenir: "Budget : resource monitor."
  },
  {
    id: "m14-q11", dialecte: "Snowflake",
    q: "Tu relances exactement la même requête 5 minutes plus tard, sans que les données aient changé. Que fait Snowflake ?",
    choix: [
      "Il recalcule tout",
      "Il renvoie le résultat du cache de résultats, presque instantanément, sans même démarrer le warehouse",
      "Il renvoie une erreur",
      "Il renvoie un résultat vide"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Cache de résultats : 24 h, même texte de requête, données inchangées, mêmes droits.",
      "Non.",
      "Non."
    ],
    retenir: "Cache de résultats : même requête + mêmes données = gratuit et instantané."
  },
  {
    id: "m14-q12", dialecte: "Snowflake",
    q: "Pourquoi une requête contenant CURRENT_TIMESTAMP() ne profite-t-elle pas du cache de résultats ?",
    choix: [
      "Bug",
      "Le résultat dépend du moment : Snowflake ne peut pas réutiliser un ancien résultat",
      "Elle est trop longue",
      "Elle n'a pas de warehouse"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Les fonctions non déterministes empêchent la réutilisation. Remplace par une date fixe si possible.",
      "Non.",
      "Non."
    ],
    retenir: "Fonctions « du moment » = pas de cache de résultats."
  },
  {
    id: "m14-q13", dialecte: "Snowflake",
    q: "Quelle différence entre le cache de résultats et le cache local du warehouse ?",
    choix: [
      "Aucune",
      "Résultats : réponse complète réutilisée (services cloud, 24 h). Local : données déjà lues gardées sur le warehouse tant qu'il tourne",
      "Le cache local dure 1 an",
      "Le cache de résultats est sur le PC"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Suspendre le warehouse vide le cache local, pas le cache de résultats.",
      "Non.",
      "Non."
    ],
    retenir: "Deux caches : résultats (global) et local (warehouse)."
  },
  {
    id: "m14-q14", dialecte: "Snowflake",
    q: "Pourquoi SELECT COUNT(*), MIN(date_cde), MAX(date_cde) FROM commande (sans filtre) est-il quasi instantané ?",
    choix: [
      "Grâce aux index",
      "Snowflake connaît ces valeurs dans les métadonnées de chaque micro-partition : pas besoin de lire les données",
      "Grâce au hasard",
      "La table est petite"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Pas d'index.",
      "Oui. Requêtes « métadonnées seules », souvent sans warehouse.",
      "Non.",
      "Non."
    ],
    retenir: "COUNT / MIN / MAX sans filtre : métadonnées."
  },
  {
    id: "m14-q15", dialecte: "Snowflake",
    q: "Qu'est-ce qu'une micro-partition ?",
    choix: [
      "Un index",
      "Un bloc de stockage immuable (environ 50 à 500 Mo de données non compressées), rangé par colonnes, avec des métadonnées (min, max…)",
      "Une table temporaire",
      "Un warehouse"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Snowflake découpe automatiquement chaque table en micro-partitions.",
      "Non.",
      "Non."
    ],
    retenir: "Micro-partition = bloc immuable + métadonnées."
  },
  {
    id: "m14-q16", dialecte: "Snowflake",
    q: "Qu'est-ce que le « pruning » ?",
    choix: [
      "La suppression de données",
      "Le fait de sauter les micro-partitions qui ne peuvent pas contenir les lignes recherchées, grâce à leur min / max",
      "La compression",
      "Le tri"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. C'est le principal levier de performance sur Snowflake.",
      "Non.",
      "Non."
    ],
    retenir: "Pruning = ne lire que les partitions utiles."
  },
  {
    id: "m14-q17", dialecte: "Snowflake",
    q: "Dans le Query Profile, « Partitions scanned : 9 800 / Partitions total : 10 000 » pour un filtre sur une date. Interprétation ?",
    choix: [
      "Excellent",
      "Le pruning ne fonctionne presque pas : les dates sont dispersées dans toutes les partitions (ou le filtre empêche le pruning)",
      "Erreur",
      "Les partitions sont vides"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Vérifie le filtre (fonction sur la colonne ?) ; si la table est énorme et toujours filtrée ainsi, une clé de clustering peut aider.",
      "Non.",
      "Non."
    ],
    retenir: "Scanned ≈ total = pruning inefficace."
  },
  {
    id: "m14-q18", dialecte: "Snowflake",
    q: "Pourquoi les données chargées chaque jour par date sont-elles naturellement bien « rangées » pour un filtre sur la date de chargement ?",
    choix: [
      "Par hasard",
      "Les nouvelles micro-partitions contiennent les nouvelles dates : chaque partition couvre une petite plage de dates, le pruning marche bien",
      "Grâce à un index automatique",
      "Ce n'est pas le cas"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. On parle de « clustering naturel ». Un filtre sur une autre colonne (ex. client) n'en profite pas.",
      "Non.",
      "Non."
    ],
    retenir: "Ordre de chargement = rangement naturel."
  },
  {
    id: "m14-q19", dialecte: "Snowflake",
    q: "Quand une clé de clustering (CLUSTER BY) vaut-elle la peine ?",
    choix: [
      "Sur toutes les tables",
      "Sur de très grosses tables (plusieurs To), souvent filtrées sur les mêmes colonnes, quand le pruning est mauvais",
      "Sur les petites tables",
      "Jamais"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Le reclustering automatique consomme des crédits.",
      "Oui. Mesurer avant / après le gain sur les requêtes et le coût de maintenance.",
      "Non. Inutile.",
      "Non."
    ],
    retenir: "Clustering : très grosses tables, filtres réguliers."
  },
  {
    id: "m14-q20", dialecte: "Snowflake",
    q: "Quelle fonction mesure la qualité du rangement d'une table sur une colonne ?",
    choixCode: true,
    choix: [
      "SYSTEM$CLUSTERING_INFORMATION('commande', '(date_cde)')",
      "SHOW INDEXES",
      "DBCC SHOWCONTIG",
      "sp_help"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Elle donne notamment la profondeur moyenne de chevauchement des partitions.",
      "Non.",
      "Non. SQL Server.",
      "Non. SQL Server."
    ],
    retenir: "SYSTEM$CLUSTERING_INFORMATION."
  },
  {
    id: "m14-q21", dialecte: "Snowflake",
    q: "Des requêtes cherchent très souvent UNE commande par son numéro dans une table de 5 milliards de lignes. Quel service Snowflake est fait pour ça ?",
    choix: [
      "Un index B-tree",
      "Le Search Optimization Service (recherches ponctuelles très sélectives)",
      "Un warehouse 6XL",
      "Le cache de résultats"
    ],
    bonne: 1,
    pourquoi: [
      "Non. N'existe pas.",
      "Oui. Il maintient des structures pour retrouver vite quelques lignes (coût de maintenance, édition Enterprise).",
      "Non. Cher et inefficace.",
      "Non. Chaque numéro est différent."
    ],
    retenir: "Recherches ponctuelles massives : Search Optimization."
  },
  {
    id: "m14-q22", dialecte: "Snowflake",
    q: "Le Query Profile indique « Bytes spilled to local storage » puis « to remote storage ». Que faire ?",
    choix: [
      "Rien",
      "La mémoire du warehouse ne suffit pas : réduire les données traitées (filtres, colonnes) ou augmenter la taille du warehouse",
      "Ajouter un index",
      "Supprimer le cache"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Le débordement distant est très lent.",
      "Oui. Souvent, un filtre plus tôt ou une jointure mieux écrite suffit.",
      "Non.",
      "Non."
    ],
    retenir: "Spilling = mémoire insuffisante."
  },
  {
    id: "m14-q23", dialecte: "Snowflake",
    q: "Dans le Query Profile, quel opérateur prend le plus souvent le temps dans une requête lente ?",
    choix: [
      "Toujours le SELECT",
      "Il faut regarder : souvent TableScan (trop de partitions lues) ou une jointure qui explose (plus de lignes en sortie qu'en entrée)",
      "Toujours le tri",
      "Le profil n'indique pas les temps"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Le profil donne le pourcentage de temps par opérateur : commence par le plus gros.",
      "Non.",
      "Non."
    ],
    retenir: "Query Profile : attaquer l'opérateur le plus coûteux."
  },
  {
    id: "m14-q24", dialecte: "Snowflake",
    q: "Pourquoi éviter SELECT * sur une table de 300 colonnes dans Snowflake ?",
    choix: [
      "C'est interdit",
      "Stockage en colonnes : Snowflake ne lit que les colonnes demandées. Avec *, il lit tout : plus de données, plus de temps, plus de crédits",
      "Ça désactive le cache",
      "Ça trie"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Lister 5 colonnes peut diviser fortement le volume lu.",
      "Non.",
      "Non."
    ],
    retenir: "Colonnes listées = moins de données lues."
  },
  {
    id: "m14-q25", dialecte: "Snowflake",
    q: "LIMIT 10 réduit-il toujours la quantité de données lues ?",
    choix: [
      "Oui, toujours",
      "Non : avec un ORDER BY ou un agrégat, Snowflake doit souvent tout lire avant de garder 10 lignes",
      "Non, jamais",
      "Seulement le lundi"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Pour explorer une table à moindre coût : SAMPLE, ou filtrer sur une partition (date).",
      "Non. Sans tri, il peut s'arrêter tôt.",
      "Non."
    ],
    retenir: "LIMIT ne garantit pas une lecture réduite."
  },
  {
    id: "m14-q26", dialecte: "Snowflake",
    q: "Comment lire la table commande telle qu'elle était à 8 h ce matin ?",
    choixCode: true,
    choix: [
      "SELECT * FROM commande AT (TIMESTAMP => '2026-10-26 08:00:00'::TIMESTAMP_LTZ);",
      "SELECT * FROM commande WHERE heure = 8;",
      "RESTORE commande 8h",
      "SELECT * FROM commande_backup"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Time Travel : AT (TIMESTAMP => …), AT (OFFSET => -secondes) ou BEFORE (STATEMENT => 'id').",
      "Non.",
      "Non.",
      "Non."
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
      "UNDO '01b2c3…'",
      "ROLLBACK '01b2c3…'"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Précis : l'état exact avant cette requête. L'id se trouve dans l'historique des requêtes.",
      "Non.",
      "Non."
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
      "Non.",
      "Oui. Possible tant qu'on est dans la période de Time Travel. Marche aussi pour un schéma ou une base.",
      "Non.",
      "Non."
    ],
    retenir: "DROP par erreur : UNDROP."
  },
  {
    id: "m14-q29", dialecte: "Snowflake",
    q: "Quelle est la durée de Time Travel par défaut, et le maximum ?",
    choix: [
      "7 jours, 365 jours",
      "1 jour par défaut ; jusqu'à 90 jours en édition Enterprise",
      "30 jours, 30 jours",
      "Aucun Time Travel par défaut"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Réglable par table, schéma ou base (DATA_RETENTION_TIME_IN_DAYS). Plus long = plus de stockage.",
      "Non.",
      "Non."
    ],
    retenir: "Time Travel : 1 jour par défaut, 90 max (Enterprise)."
  },
  {
    id: "m14-q30", dialecte: "Snowflake",
    q: "Qu'est-ce que le Fail-safe ?",
    choix: [
      "Le Time Travel",
      "7 jours de protection supplémentaires APRÈS le Time Travel, accessibles seulement par le support Snowflake en cas de sinistre",
      "Une sauvegarde manuelle",
      "Un antivirus"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Ce n'est pas un outil du quotidien. Les tables TRANSIENT n'en ont pas.",
      "Non.",
      "Non."
    ],
    retenir: "Fail-safe : 7 jours, via le support uniquement."
  },
  {
    id: "m14-q31", dialecte: "Snowflake",
    q: "Que fait CREATE DATABASE dev CLONE prod; ?",
    choix: [
      "Copie physiquement toutes les données (des heures)",
      "Crée instantanément une base qui partage les données de prod ; seules les modifications futures prennent de la place",
      "Crée une base vide",
      "Crée un lien en lecture seule"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. « Zéro copie » : parfait pour un environnement de test ou de recette réaliste.",
      "Non.",
      "Non. Le clone est modifiable, indépendamment de prod."
    ],
    retenir: "CLONE = copie instantanée, stockage partagé."
  },
  {
    id: "m14-q32", dialecte: "Snowflake",
    q: "Peut-on cloner une table telle qu'elle était hier ?",
    choixCode: true,
    choix: [
      "Non",
      "Oui : CREATE TABLE commande_hier CLONE commande AT (OFFSET => -86400);",
      "Seulement une base",
      "Seulement avec UNDROP"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Clone + Time Travel : idéal pour comparer avant / après un traitement.",
      "Non.",
      "Non."
    ],
    retenir: "CLONE … AT / BEFORE = copie d'un état passé."
  },
  {
    id: "m14-q33", dialecte: "Snowflake",
    q: "Une table clonée garde-t-elle l'historique des fichiers déjà chargés par COPY INTO ?",
    choix: [
      "Oui",
      "Non : le clone n'a pas cet historique. Un COPY INTO sur le clone pourrait recharger des fichiers déjà présents",
      "Oui, pour 64 jours",
      "Seulement en Enterprise"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Point d'attention pour les tests de chargement sur un environnement cloné.",
      "Non.",
      "Non."
    ],
    retenir: "Clone : pas d'historique de chargement."
  },
  {
    id: "m14-q34", dialecte: "Snowflake",
    q: "Qu'est-ce qu'un « stage » sur Snowflake ?",
    choix: [
      "Une étape de requête",
      "Un emplacement de fichiers (interne à Snowflake ou externe : S3, Azure, GCS) d'où l'on charge et où l'on décharge des données",
      "Une table temporaire",
      "Un warehouse"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Fichiers → stage → COPY INTO table.",
      "Non.",
      "Non."
    ],
    retenir: "Stage = zone de fichiers."
  },
  {
    id: "m14-q35", dialecte: "Snowflake",
    q: "Que désignent @~, @%commande et @mon_stage ?",
    choix: [
      "Trois variables",
      "Le stage de l'utilisateur, le stage de la table commande, et un stage nommé",
      "Trois warehouses",
      "Trois rôles"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Pour un flux d'entreprise, on préfère un stage nommé, avec un format de fichier défini.",
      "Non.",
      "Non."
    ],
    retenir: "@~ utilisateur, @%table, @stage nommé."
  },
  {
    id: "m14-q36", dialecte: "Snowflake",
    q: "À quoi sert un FILE FORMAT nommé ?",
    choixCode: true,
    choix: [
      "À rien",
      "À décrire une fois le format des fichiers (CSV, séparateur ;, entête, encodage, format de date…) et le réutiliser dans les COPY",
      "À compresser",
      "À trier"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. CREATE FILE FORMAT ff_csv_fr TYPE = CSV FIELD_DELIMITER = ';' SKIP_HEADER = 1 …",
      "Non.",
      "Non."
    ],
    retenir: "FILE FORMAT : décrire le fichier une seule fois."
  },
  {
    id: "m14-q37", dialecte: "Snowflake",
    q: "Par défaut, que fait COPY INTO si une ligne d'un fichier est invalide ?",
    choix: [
      "Il l'ignore",
      "Il arrête tout le chargement (ON_ERROR = ABORT_STATEMENT par défaut)",
      "Il la corrige",
      "Il la met à NULL"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Seulement avec ON_ERROR = CONTINUE.",
      "Oui. On peut choisir CONTINUE (ignorer les lignes en erreur) ou SKIP_FILE (ignorer le fichier).",
      "Non.",
      "Non."
    ],
    retenir: "COPY : ON_ERROR = ABORT_STATEMENT par défaut."
  },
  {
    id: "m14-q38", dialecte: "Snowflake",
    q: "Comment vérifier les erreurs d'un fichier SANS le charger ?",
    choixCode: true,
    choix: [
      "COPY INTO t FROM @stage VALIDATION_MODE = RETURN_ERRORS;",
      "SELECT * FROM fichier",
      "TEST COPY",
      "Impossible"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Liste les erreurs (ligne, colonne, message) sans rien insérer.",
      "Non.",
      "Non.",
      "Non."
    ],
    retenir: "Tester un fichier : VALIDATION_MODE."
  },
  {
    id: "m14-q39", dialecte: "Snowflake",
    q: "Tu relances un COPY INTO sur le même dossier. Les fichiers déjà chargés sont-ils rechargés ?",
    choix: [
      "Oui, doublons",
      "Non : Snowflake garde l'historique de chargement (64 jours) et saute les fichiers déjà chargés",
      "Oui, sauf le premier",
      "Erreur"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Chargement naturellement relançable. FORCE = TRUE pour forcer (avec prudence).",
      "Non.",
      "Non."
    ],
    retenir: "COPY INTO : pas de double chargement (64 jours)."
  },
  {
    id: "m14-q40", dialecte: "Snowflake",
    q: "Qu'est-ce que Snowpipe ?",
    choix: [
      "Un outil de dessin",
      "Le chargement automatique et continu : dès qu'un fichier arrive dans le stage, il est chargé (sans warehouse à gérer)",
      "Un connecteur Power BI",
      "Un type de table"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Idéal pour des flux réguliers (fichiers EDI qui arrivent au fil de la journée).",
      "Non.",
      "Non."
    ],
    retenir: "Snowpipe = chargement au fil de l'eau."
  },
  {
    id: "m14-q41", dialecte: "Snowflake",
    q: "Comment exporter le résultat d'une requête vers des fichiers CSV dans un stage ?",
    choixCode: true,
    choix: [
      "EXPORT … TO CSV",
      "COPY INTO @mon_stage/export/ FROM (SELECT …) FILE_FORMAT = (TYPE = CSV) HEADER = TRUE;",
      "SELECT … INTO OUTFILE",
      "Impossible"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. COPY INTO marche dans les deux sens : vers une table ou vers un stage.",
      "Non. MySQL.",
      "Non."
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
      "Inutile",
      "Sans conversion, le résultat est un VARIANT (affiché \"Dupont\" avec guillemets) ; avec ::STRING, c'est un vrai texte comparable et joignable",
      "Pour trier",
      "Pour compresser"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Toujours typer ce qu'on extrait d'un JSON.",
      "Non.",
      "Non."
    ],
    retenir: "Extraire du JSON = convertir (::)."
  },
  {
    id: "m14-q44", dialecte: "Snowflake",
    q: "Une commande JSON contient un tableau \"lignes\". Comment obtenir une ligne SQL par ligne de commande ?",
    choixCode: true,
    choix: [
      "SELECT doc:lignes FROM t",
      "SELECT l.value:art::STRING, l.value:qte::NUMBER FROM t, LATERAL FLATTEN(input => t.doc:lignes) l",
      "SELECT EXPLODE(doc)",
      "Impossible"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Le tableau entier sur une seule ligne.",
      "Oui. FLATTEN déplie le tableau ; value contient chaque élément.",
      "Non. Syntaxe Spark.",
      "Non."
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
      "Non.",
      "Oui. (TRY_PARSE_JSON renvoie NULL si le texte est mal formé.)",
      "Non. TO_JSON fait l'inverse : VARIANT → texte.",
      "Non."
    ],
    retenir: "Texte → JSON : PARSE_JSON."
  },
  {
    id: "m14-q46", dialecte: "Snowflake",
    q: "Comment construire un objet JSON à partir de colonnes ?",
    choixCode: true,
    choix: [
      "OBJECT_CONSTRUCT('code', code, 'nom', nom)",
      "CONCAT('{', code, '}')",
      "JSON_OBJECT(*)",
      "FOR JSON PATH"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. ARRAY_AGG(OBJECT_CONSTRUCT(…)) donne un tableau d'objets : pratique pour un export API.",
      "Non. Fragile : guillemets et caractères spéciaux.",
      "Non.",
      "Non. Syntaxe SQL Server."
    ],
    retenir: "Colonnes → JSON : OBJECT_CONSTRUCT / ARRAY_AGG."
  },
  {
    id: "m14-q47", dialecte: "Snowflake",
    q: "Dans un JSON, les clés \"Nom\" et \"nom\" sont-elles identiques pour Snowflake ?",
    choix: [
      "Oui",
      "Non : les clés JSON tiennent compte de la casse",
      "Seulement en majuscules",
      "Ça dépend du warehouse"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. doc:Nom et doc:nom sont différents. Contrairement aux noms de colonnes sans guillemets.",
      "Non.",
      "Non."
    ],
    retenir: "Clés JSON : sensibles à la casse."
  },
  {
    id: "m14-q48", dialecte: "Snowflake",
    q: "Qu'est-ce qu'un STREAM sur Snowflake ?",
    choix: [
      "Une vidéo",
      "Un objet qui enregistre les changements (insertions, modifications, suppressions) d'une table depuis la dernière lecture",
      "Un warehouse",
      "Une copie de table"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Capture de changements (CDC) : idéal pour des traitements incrémentaux.",
      "Non.",
      "Non. Il ne copie pas les données, il garde un repère."
    ],
    retenir: "STREAM = changements depuis la dernière consommation."
  },
  {
    id: "m14-q49", dialecte: "Snowflake",
    q: "Quand un STREAM est-il « vidé » (son repère avance) ?",
    choix: [
      "À chaque SELECT",
      "Quand il est utilisé dans une instruction de modification (INSERT, MERGE…) validée",
      "Toutes les heures",
      "Jamais"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Un simple SELECT ne le consomme pas.",
      "Oui. Si la transaction est annulée, le stream garde ses changements : rien n'est perdu.",
      "Non.",
      "Non."
    ],
    retenir: "Stream consommé par un DML validé."
  },
  {
    id: "m14-q50", dialecte: "Snowflake",
    q: "Qu'est-ce qu'une « dynamic table » sur Snowflake ?",
    choix: [
      "Une table temporaire",
      "Une table définie par une requête, que Snowflake rafraîchit automatiquement pour rester à jour avec un délai maximum choisi (TARGET_LAG)",
      "Une table sans colonnes",
      "Une vue simple"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Remplace souvent des combinaisons stream + task pour des transformations simples.",
      "Non.",
      "Non. Le résultat est stocké."
    ],
    retenir: "Dynamic table = requête matérialisée, rafraîchie automatiquement."
  },
  {
    id: "m14-q51", dialecte: "Snowflake",
    q: "Sur Snowflake, à qui donne-t-on les droits (SELECT, INSERT…) ?",
    choix: [
      "Directement aux utilisateurs",
      "À des RÔLES ; puis on attribue les rôles aux utilisateurs",
      "Aux warehouses",
      "Aux tables"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Ce n'est pas le modèle Snowflake.",
      "Oui. Contrôle d'accès par rôles (RBAC). Un nouvel arrivant reçoit simplement le bon rôle.",
      "Non.",
      "Non."
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
      "Non.",
      "Non."
    ],
    retenir: "Objets : SYSADMIN. Droits : SECURITYADMIN. Compte : ACCOUNTADMIN."
  },
  {
    id: "m14-q53", dialecte: "Snowflake",
    q: "Pourquoi ne pas travailler au quotidien avec le rôle ACCOUNTADMIN ?",
    choix: [
      "Il est lent",
      "Il a tous les pouvoirs (facturation, sécurité…) : une erreur peut coûter très cher. Et les objets créés lui appartiennent",
      "Il est payant",
      "Il ne voit pas les tables"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Principe du moindre privilège : chacun le rôle juste nécessaire. Et MFA sur les comptes ACCOUNTADMIN.",
      "Non.",
      "Non."
    ],
    retenir: "ACCOUNTADMIN : rarement, et protégé."
  },
  {
    id: "m14-q54", dialecte: "Snowflake",
    q: "Tu crées un rôle RL_FINANCE. Pourquoi l'attribuer aussi au rôle SYSADMIN ?",
    choix: [
      "Inutile",
      "Pour que la hiérarchie des rôles reste cohérente : les administrateurs gardent la main sur les objets créés par ce rôle",
      "Pour lui donner plus de stockage",
      "C'est interdit"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Un rôle « orphelin » crée des objets que personne d'autre ne peut gérer.",
      "Non.",
      "Non."
    ],
    retenir: "Rôles personnalisés : rattachés à SYSADMIN."
  },
  {
    id: "m14-q55", dialecte: "Snowflake",
    q: "Quel modèle de rôles est recommandé pour une équipe data ?",
    choix: [
      "Un rôle par personne",
      "Des rôles d'accès (lecture / écriture par schéma) regroupés dans des rôles métier (ANALYSTE_VENTES, ETL…) attribués aux personnes",
      "Tout le monde en ACCOUNTADMIN",
      "Un seul rôle pour tous"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Ingérable.",
      "Oui. Les droits techniques sont définis une fois ; les rôles métier les combinent.",
      "Non.",
      "Non."
    ],
    retenir: "Rôles d'accès + rôles métier."
  },
  {
    id: "m14-q56", dialecte: "Snowflake",
    q: "Une requête échoue : « No active warehouse selected in the current session ». Que faire ?",
    choixCode: true,
    choix: [
      "CREATE INDEX",
      "USE WAREHOUSE WH_ANALYSE; (ou définir un warehouse par défaut pour l'utilisateur)",
      "USE DATABASE",
      "Redémarrer"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Il faut aussi que le rôle ait le droit USAGE sur ce warehouse.",
      "Non. La base ne fournit pas de calcul.",
      "Non."
    ],
    retenir: "Pas de warehouse = pas de calcul."
  },
  {
    id: "m14-q57", dialecte: "Snowflake",
    q: "Le rôle ANALYSTE a SELECT sur toutes les tables du schéma VENTES. Une nouvelle table est créée demain. Comment l'inclure automatiquement ?",
    choixCode: true,
    choix: [
      "Rien à faire",
      "GRANT SELECT ON FUTURE TABLES IN SCHEMA VENTES TO ROLE ANALYSTE;",
      "GRANT ALL",
      "Recréer le rôle chaque jour"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Les droits existants ne couvrent pas les nouvelles tables.",
      "Oui. Les « droits futurs » s'appliquent aux objets créés ensuite.",
      "Non. Trop large.",
      "Non."
    ],
    retenir: "Nouvelles tables couvertes : FUTURE GRANTS."
  },
  {
    id: "m14-q58", dialecte: "Snowflake",
    q: "Le rôle a SELECT sur PROD.VENTES.COMMANDE mais la requête échoue (« does not exist or not authorized »). Que manque-t-il souvent ?",
    choix: [
      "Un index",
      "Le droit USAGE sur la base PROD et sur le schéma VENTES",
      "Le droit DELETE",
      "Un warehouse plus grand"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Pour atteindre une table, il faut pouvoir « entrer » dans la base et le schéma.",
      "Non.",
      "Non."
    ],
    retenir: "Lire une table = USAGE base + USAGE schéma + SELECT table."
  },
  {
    id: "m14-q59", dialecte: "Snowflake",
    q: "Sur Snowflake, qui possède un objet (table, vue) ?",
    choix: [
      "L'utilisateur qui l'a créé",
      "Le RÔLE actif au moment de la création ; on peut transférer avec GRANT OWNERSHIP",
      "Le warehouse",
      "Personne"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Ce n'est pas la personne.",
      "Oui. D'où l'importance d'utiliser le bon rôle quand on crée des objets.",
      "Non.",
      "Non."
    ],
    retenir: "Propriétaire = rôle actif à la création."
  },
  {
    id: "m14-q60", dialecte: "Snowflake",
    q: "Comment afficher les IBAN en clair pour le rôle COMPTA, et masqués (***) pour les autres, sans dupliquer les tables ?",
    choix: [
      "Deux tables",
      "Une politique de masquage (MASKING POLICY) attachée à la colonne, qui teste CURRENT_ROLE()",
      "Un trigger",
      "Une vue par utilisateur"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Le masquage s'applique partout, même aux nouvelles requêtes (édition Enterprise).",
      "Non.",
      "Non."
    ],
    retenir: "Données sensibles : masking policy."
  },
  {
    id: "m14-q61", dialecte: "Snowflake",
    q: "Chaque commercial ne doit voir que les ventes de sa région, dans la même table. Quelle fonctionnalité ?",
    choix: [
      "Une colonne masquée",
      "Une politique d'accès aux lignes (ROW ACCESS POLICY)",
      "Un warehouse par région",
      "Un index"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Le masquage concerne les colonnes.",
      "Oui. Les lignes non autorisées sont filtrées automatiquement selon l'utilisateur ou le rôle.",
      "Non.",
      "Non."
    ],
    retenir: "Filtrer les lignes par utilisateur : row access policy."
  },
  {
    id: "m14-q62", dialecte: "Snowflake",
    q: "Quelles mesures de base protègent l'accès au compte Snowflake ?",
    choix: [
      "Aucune",
      "Authentification forte (MFA / SSO), politiques réseau (adresses IP autorisées), comptes de service par clé, rôles minimaux",
      "Un mot de passe partagé",
      "NOLOCK"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Les données d'entreprise dans le cloud doivent être protégées comme un serveur interne, voire plus.",
      "Non. Jamais.",
      "Non."
    ],
    retenir: "MFA, IP autorisées, rôles minimaux."
  },
  {
    id: "m14-q63", dialecte: "Snowflake",
    q: "Tu veux donner à un distributeur un accès en lecture à ses ventes, sans lui envoyer de fichiers. Quelle fonctionnalité ?",
    choix: [
      "Export CSV quotidien",
      "Le partage de données (Secure Data Sharing) : il interroge les données directement, sans copie",
      "Un VPN",
      "Une copie de la base"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Possible, mais lourd et vite obsolète.",
      "Oui. Il paie son propre calcul ; les données restent à jour et sous ton contrôle (vue sécurisée filtrée).",
      "Non.",
      "Non."
    ],
    retenir: "Partenaire : partage sécurisé, sans copie."
  },
  {
    id: "m14-q64", dialecte: "Snowflake",
    q: "Le distributeur n'a pas de compte Snowflake. Comment lui partager quand même les données ?",
    choix: [
      "Impossible",
      "Un « reader account » créé et payé par ton entreprise, à travers lequel il consulte le partage",
      "Lui donner tes identifiants",
      "Un mail"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Attention : son calcul est facturé à ton compte.",
      "Non. Jamais.",
      "Non."
    ],
    retenir: "Partenaire sans compte : reader account."
  },
  {
    id: "m14-q65", dialecte: "Snowflake",
    q: "À quoi sert la Snowflake Marketplace ?",
    choix: [
      "À acheter des warehouses",
      "À accéder à des jeux de données externes (météo, données économiques…) partagés par des fournisseurs, directement dans son compte",
      "À vendre des licences",
      "À télécharger Snowflake"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Ex. croiser les ventes de piscines avec la météo, sans aucun chargement.",
      "Non.",
      "Non."
    ],
    retenir: "Marketplace = données externes prêtes à l'emploi."
  },
  {
    id: "m14-q66", dialecte: "Snowflake",
    q: "Différence entre INFORMATION_SCHEMA et SNOWFLAKE.ACCOUNT_USAGE ?",
    choix: [
      "Aucune",
      "INFORMATION_SCHEMA : par base, temps réel, historique court. ACCOUNT_USAGE : tout le compte, historique long (1 an), avec un délai de mise à jour",
      "ACCOUNT_USAGE est en temps réel",
      "INFORMATION_SCHEMA est payant"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Pour un suivi des coûts sur plusieurs mois : ACCOUNT_USAGE.",
      "Non. Délai de quelques dizaines de minutes à quelques heures.",
      "Non."
    ],
    retenir: "Temps réel : INFORMATION_SCHEMA. Historique : ACCOUNT_USAGE."
  },
  {
    id: "m14-q67", dialecte: "Snowflake",
    q: "Comment trouver les requêtes les plus longues du mois sur Snowflake ?",
    choixCode: true,
    choix: [
      "SELECT … FROM SNOWFLAKE.ACCOUNT_USAGE.QUERY_HISTORY WHERE start_time >= … ORDER BY total_elapsed_time DESC",
      "sys.dm_exec_query_stats",
      "SHOW INDEXES",
      "Impossible"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Avec l'utilisateur, le warehouse, les octets lus, les partitions lues…",
      "Non. SQL Server.",
      "Non.",
      "Non."
    ],
    retenir: "Requêtes coûteuses : QUERY_HISTORY."
  },
  {
    id: "m14-q68", dialecte: "Snowflake",
    q: "Comment savoir combien de crédits chaque warehouse a consommé ?",
    choixCode: true,
    choix: [
      "SNOWFLAKE.ACCOUNT_USAGE.WAREHOUSE_METERING_HISTORY",
      "SHOW TABLES",
      "Le cache de résultats",
      "Impossible"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Base du suivi budgétaire (avec Snowsight, qui l'affiche aussi).",
      "Non.",
      "Non.",
      "Non."
    ],
    retenir: "Crédits par warehouse : WAREHOUSE_METERING_HISTORY."
  },
  {
    id: "m14-q69", dialecte: "Snowflake",
    q: "Plusieurs rapports partagent un warehouse. Comment savoir quel rapport coûte le plus ?",
    choixCode: true,
    choix: [
      "Impossible",
      "ALTER SESSION SET QUERY_TAG = 'rapport_ventes'; dans chaque outil, puis analyser QUERY_HISTORY par tag",
      "Un warehouse par requête",
      "Deviner"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Le tag est enregistré avec chaque requête.",
      "Non. Excessif.",
      "Non."
    ],
    retenir: "Attribuer les coûts : QUERY_TAG."
  },
  {
    id: "m14-q70", dialecte: "Snowflake",
    q: "Comment filtrer le résultat d'une commande SHOW TABLES avec du SQL ?",
    choixCode: true,
    choix: [
      "SHOW TABLES WHERE rows > 1000",
      "SHOW TABLES; puis SELECT * FROM TABLE(RESULT_SCAN(LAST_QUERY_ID())) WHERE \"rows\" > 1000;",
      "SELECT SHOW TABLES",
      "Impossible"
    ],
    bonne: 1,
    pourquoi: [
      "Non. SHOW n'accepte que LIKE / IN.",
      "Oui. RESULT_SCAN relit le résultat d'une requête précédente. (Noms de colonnes en minuscules, entre guillemets.)",
      "Non.",
      "Non."
    ],
    retenir: "Résultat de SHOW : RESULT_SCAN(LAST_QUERY_ID())."
  },
  {
    id: "m14-q71", dialecte: "Snowflake",
    q: "Une table de 1 To a 90 jours de Time Travel et est entièrement réécrite chaque nuit. Quel effet sur le stockage ?",
    choix: [
      "Aucun",
      "Les anciennes versions sont gardées 90 jours (+ 7 jours de Fail-safe) : le stockage peut être bien plus grand que la table elle-même",
      "Le stockage diminue",
      "Les données sont perdues"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Pour ce genre de table (rechargée), une rétention courte ou une table TRANSIENT est plus économique.",
      "Non.",
      "Non."
    ],
    retenir: "Time Travel long + réécritures = stockage qui gonfle."
  },
  {
    id: "m14-q72", dialecte: "Snowflake",
    q: "Après un gros UPDATE sur une table, pourquoi le stockage facturé augmente-t-il ?",
    choix: [
      "Bug",
      "Les micro-partitions réécrites remplacent les anciennes, mais les anciennes restent conservées pour le Time Travel et le Fail-safe",
      "L'UPDATE double la table",
      "À cause du cache"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Elles disparaissent seulement à la fin des périodes de rétention.",
      "Non.",
      "Non."
    ],
    retenir: "Modifier = anciennes versions gardées un temps."
  },
  {
    id: "m14-q73", dialecte: "Snowflake",
    q: "Une requête mal écrite tourne depuis 9 heures. Quel paramètre aurait pu l'arrêter automatiquement ?",
    choixCode: true,
    choix: [
      "AUTO_SUSPEND",
      "STATEMENT_TIMEOUT_IN_SECONDS (sur le warehouse, l'utilisateur ou la session)",
      "LOCK_TIMEOUT",
      "DATA_RETENTION_TIME_IN_DAYS"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Le warehouse ne s'arrête pas tant qu'une requête tourne.",
      "Oui. Par défaut 2 jours : souvent bien trop long. Ex. 1 heure sur le warehouse d'exploration.",
      "Non.",
      "Non."
    ],
    retenir: "Requêtes sans fin : STATEMENT_TIMEOUT_IN_SECONDS."
  },
  {
    id: "m14-q74", dialecte: "Snowflake",
    q: "Le Query Profile indique que la requête a passé beaucoup de temps « en file d'attente » (queued). Cause ?",
    choix: [
      "Un verrou",
      "Le warehouse était déjà occupé par d'autres requêtes : plus de place pour en exécuter une de plus en parallèle",
      "Le disque",
      "Le réseau"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Ce serait « blocked ».",
      "Oui. Solutions : multi-cluster, warehouse dédié, ou étaler les traitements.",
      "Non.",
      "Non."
    ],
    retenir: "Queued = warehouse saturé."
  },
  {
    id: "m14-q75", dialecte: "Snowflake",
    q: "Power BI sur Snowflake : quelle différence de coût entre le mode Import et le mode DirectQuery ?",
    choix: [
      "Aucune",
      "Import : Snowflake travaille seulement lors des rafraîchissements planifiés. DirectQuery : chaque clic d'un utilisateur lance des requêtes, le warehouse tourne beaucoup plus",
      "DirectQuery est gratuit",
      "Import est interdit"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. DirectQuery se justifie pour des données très volumineuses ou très fraîches.",
      "Non.",
      "Non."
    ],
    retenir: "Import = coût maîtrisé. DirectQuery = coût à chaque clic."
  },
  {
    id: "m14-q76", dialecte: "Snowflake",
    q: "Un rapport Power BI en DirectQuery coûte trop cher. Pistes ?",
    choix: [
      "Augmenter la taille du warehouse",
      "Tables agrégées (ou dynamic tables) pour les visuels, modèle en étoile, mode Import ou composite, warehouse dédié avec AUTO_SUSPEND",
      "Supprimer le rapport",
      "Ajouter des index"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Plus cher.",
      "Oui. Moins de données lues par clic = moins de crédits.",
      "Non.",
      "Non."
    ],
    retenir: "DirectQuery : pré-agréger et bien modéliser."
  },
  {
    id: "m14-q77", dialecte: "Snowflake",
    q: "Sur Snowflake, comment comparer deux textes sans tenir compte de la casse, de façon permanente pour une colonne ?",
    choixCode: true,
    choix: [
      "Impossible",
      "Définir une collation sur la colonne, par exemple COLLATE 'en-ci' (ci = case insensitive)",
      "Un index",
      "NOLOCK"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Sinon, UPPER / ILIKE au cas par cas. (Les collations peuvent avoir un coût en performance.)",
      "Non.",
      "Non."
    ],
    retenir: "Snowflake : collation 'en-ci' pour ignorer la casse."
  },
  {
    id: "m14-q78", dialecte: "Snowflake",
    q: "Qu'est-ce qu'une table externe (EXTERNAL TABLE) sur Snowflake ?",
    choix: [
      "Une table d'un autre compte",
      "Une table qui lit directement des fichiers restés dans un stockage externe (S3, Azure), sans les charger",
      "Une table temporaire",
      "Une vue"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Pratique pour explorer, mais plus lente qu'une table chargée.",
      "Non.",
      "Non."
    ],
    retenir: "Table externe = interroger des fichiers sans les charger."
  },
  {
    id: "m14-q79", dialecte: "Snowflake",
    q: "Laquelle de ces fonctionnalités demande au moins l'édition Enterprise ?",
    choix: [
      "Le Time Travel de 1 jour",
      "Les warehouses multi-cluster, le Time Travel jusqu'à 90 jours, les politiques de masquage",
      "Les requêtes SELECT",
      "Les rôles"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Disponible partout.",
      "Oui. Vérifie l'édition du compte avant de concevoir une solution.",
      "Non.",
      "Non."
    ],
    retenir: "Certaines fonctions = édition Enterprise."
  },
  {
    id: "m14-q80", dialecte: "Snowflake",
    q: "Pourquoi le choix de la région (ex. Europe) lors de la création du compte Snowflake est-il important ?",
    choix: [
      "Il ne l'est pas",
      "Les données sont stockées dans cette région : conformité (RGPD, contrats), latence, et certains coûts de transfert",
      "Pour la langue de l'interface",
      "Pour le fuseau horaire"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Question à valider avec le DPO et la DSI dès le début du projet.",
      "Non.",
      "Non."
    ],
    retenir: "Région = où vivent les données."
  },
  {
    id: "m14-q81", dialecte: "Snowflake",
    q: "Les données stockées dans Snowflake sont-elles chiffrées ?",
    choix: [
      "Non",
      "Oui, automatiquement, au repos et pendant les transferts",
      "Seulement si on le demande",
      "Seulement les mots de passe"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Le chiffrement n'empêche pas un utilisateur autorisé de tout lire : les rôles restent essentiels.",
      "Non.",
      "Non."
    ],
    retenir: "Chiffrement automatique. Les droits restent la vraie protection."
  },
  {
    id: "m14-q82", dialecte: "Snowflake",
    q: "Quelles tâches de maintenance SQL Server n'ont pas d'équivalent à faire soi-même sur Snowflake ?",
    choix: [
      "Aucune",
      "Reconstruction d'index, mise à jour des statistiques, gestion des fichiers et du journal : Snowflake les gère",
      "Toutes doivent être faites à la main",
      "Seulement les sauvegardes"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Il reste à gérer : les coûts, les droits, la qualité des données et la conception des requêtes.",
      "Non.",
      "Non."
    ],
    retenir: "Snowflake : peu de maintenance technique."
  },
  {
    id: "m14-q83", dialecte: "Snowflake",
    q: "Lors d'une migration SQL Server → Snowflake, qu'est-ce qui doit être repensé ?",
    choix: [
      "Rien",
      "Les index (n'existent plus), la casse et les espaces, les contraintes (non appliquées), les procédures, les fuseaux horaires, la stratégie de coûts",
      "Seulement les noms de tables",
      "Seulement le matériel"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Une migration « copier-coller » donne souvent un système lent ou cher.",
      "Non.",
      "Non."
    ],
    retenir: "Migration = repenser, pas recopier."
  },
  {
    id: "m14-q84", dialecte: "Snowflake",
    q: "Puisque Snowflake n'applique pas les clés primaires et étrangères, comment garantir la qualité des données ?",
    choix: [
      "Impossible",
      "Ajouter des tests automatiques après chaque chargement : unicité, non NULL, références existantes (à la main ou avec un outil comme dbt)",
      "Faire confiance aux fichiers",
      "Mettre des index"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Un test qui échoue arrête le traitement avant que les rapports ne soient faux.",
      "Non.",
      "Non."
    ],
    retenir: "Snowflake : qualité = tests automatiques."
  },
  {
    id: "m14-q85", dialecte: "Snowflake",
    q: "Quelle différence entre ETL et ELT ?",
    choix: [
      "Aucune",
      "ETL : on transforme avant de charger (dans un outil). ELT : on charge les données brutes dans Snowflake, puis on les transforme en SQL dans Snowflake",
      "ELT est interdit",
      "ETL est plus récent"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. L'ELT profite de la puissance de Snowflake et garde une trace des données brutes.",
      "Non.",
      "Non."
    ],
    retenir: "Snowflake favorise l'ELT."
  },
  {
    id: "m14-q86", dialecte: "Snowflake",
    q: "Pourquoi organiser un entrepôt Snowflake en couches (brut → nettoyé → modèle métier) ?",
    choix: [
      "Pour faire joli",
      "Chaque couche a un rôle clair : on peut recalculer à partir du brut, tester chaque étape, et les rapports ne lisent que des données propres",
      "C'est obligatoire",
      "Pour économiser du stockage"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Souvent appelées RAW / STAGING / CORE / MART (ou bronze / argent / or).",
      "Non.",
      "Non. Ça en prend un peu plus."
    ],
    retenir: "Couches : brut, nettoyé, métier."
  },
  {
    id: "m14-q87", dialecte: "Snowflake",
    q: "Des horodatages TIMESTAMP_LTZ s'affichent avec 1 ou 2 heures d'écart selon les utilisateurs. Pourquoi ?",
    choix: [
      "Bug",
      "LTZ s'affiche dans le fuseau de la SESSION (paramètre TIMEZONE) : chaque utilisateur peut avoir un réglage différent",
      "Les données sont fausses",
      "Le warehouse est à l'étranger"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Fixe ALTER SESSION SET TIMEZONE = 'Europe/Paris' (ou au niveau du compte / de l'utilisateur), et choisis le bon type.",
      "Non.",
      "Non."
    ],
    retenir: "LTZ dépend du TIMEZONE de la session."
  },
  {
    id: "m14-q88", dialecte: "Snowflake",
    q: "Un CREATE OR REPLACE TABLE commande a écrasé la bonne table. Comment récupérer l'ancienne ?",
    choixCode: true,
    choix: [
      "UNDROP TABLE commande; directement",
      "ALTER TABLE commande RENAME TO commande_vide; puis UNDROP TABLE commande;",
      "ROLLBACK",
      "Impossible"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Une table de ce nom existe déjà (la nouvelle) : UNDROP refuse.",
      "Oui. On libère le nom, puis on restaure l'ancienne version grâce au Time Travel.",
      "Non.",
      "Non."
    ],
    retenir: "Après REPLACE : renommer la nouvelle, puis UNDROP."
  },
  {
    id: "m14-q89", dialecte: "Snowflake",
    q: "Qu'est-ce que Snowpark ?",
    choix: [
      "Un parc d'attractions",
      "Une bibliothèque pour écrire des traitements de données en Python (ou Java / Scala) exécutés dans Snowflake",
      "Un type de warehouse",
      "Un format de fichier"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Les données ne sortent pas de Snowflake : le code vient à elles.",
      "Non.",
      "Non."
    ],
    retenir: "Snowpark = Python dans Snowflake."
  },
  {
    id: "m14-q90", dialecte: "Snowflake",
    q: "Tu dois charger un seul fichier CSV de 40 Go. Conseil pour un chargement efficace ?",
    choix: [
      "Le charger tel quel",
      "Le découper en fichiers d'environ 100 à 250 Mo compressés : Snowflake les charge en parallèle",
      "Le convertir en Excel",
      "Utiliser un warehouse XS"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Un seul gros fichier = un seul fil de chargement.",
      "Oui. Le parallélisme du warehouse est alors pleinement utilisé.",
      "Non.",
      "Non."
    ],
    retenir: "Chargement : beaucoup de fichiers moyens > un énorme."
  },
  {
    id: "m14-q91", dialecte: "Snowflake",
    q: "Faut-il décompresser des fichiers .csv.gz avant de les charger dans Snowflake ?",
    choix: [
      "Oui, toujours",
      "Non : Snowflake lit directement les fichiers compressés (gzip, etc.), et le transfert est plus rapide",
      "Seulement le week-end",
      "Snowflake refuse le gzip"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. La compression est détectée automatiquement (ou précisée dans le FILE FORMAT).",
      "Non.",
      "Non."
    ],
    retenir: "Fichiers compressés : acceptés directement."
  },
  {
    id: "m14-q92", dialecte: "Snowflake",
    q: "Que fait l'option PURGE = TRUE dans un COPY INTO ?",
    choix: [
      "Vide la table",
      "Supprime les fichiers du stage une fois chargés avec succès",
      "Efface les erreurs",
      "Supprime le stage"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Évite l'accumulation de fichiers. Garde une archive ailleurs si tu dois pouvoir rejouer.",
      "Non.",
      "Non."
    ],
    retenir: "PURGE = TRUE : nettoyage du stage après chargement."
  },
  {
    id: "m14-q93", dialecte: "Snowflake",
    q: "Comment convertir une date AAAAMMJJ pendant le chargement, sans table intermédiaire ?",
    choixCode: true,
    choix: [
      "Impossible",
      "COPY INTO cde (num, date_cde) FROM (SELECT $1, TO_DATE($2, 'YYYYMMDD') FROM @stage_edi) FILE_FORMAT = (FORMAT_NAME = 'ff_csv');",
      "UPDATE après",
      "COPY … CONVERT"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. $1, $2… désignent les colonnes du fichier. Transformations simples possibles pendant le COPY.",
      "Non. Possible, mais plus coûteux.",
      "Non."
    ],
    retenir: "COPY avec SELECT : transformations simples au chargement."
  },
  {
    id: "m14-q94", dialecte: "Snowflake",
    q: "Comment regarder le contenu d'un fichier du stage avant de le charger ?",
    choixCode: true,
    choix: [
      "Impossible",
      "SELECT $1, $2, $3 FROM @stage_edi/commandes_20261026.csv (FILE_FORMAT => 'ff_csv') LIMIT 10;",
      "OPEN FILE",
      "CAT @stage"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Très utile pour vérifier les séparateurs et formats.",
      "Non.",
      "Non."
    ],
    retenir: "Interroger un fichier en stage : SELECT $1… FROM @stage."
  },
  {
    id: "m14-q95", dialecte: "Snowflake",
    q: "Comment enregistrer, pour chaque ligne chargée, le nom du fichier d'origine ?",
    choixCode: true,
    choix: [
      "Impossible",
      "Dans le COPY : SELECT METADATA$FILENAME, METADATA$FILE_ROW_NUMBER, $1, $2 … FROM @stage",
      "Avec un trigger",
      "Avec un index"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Traçabilité parfaite : on retrouve la ligne exacte du fichier EDI d'origine.",
      "Non.",
      "Non."
    ],
    retenir: "Traçabilité : METADATA$FILENAME."
  },
  {
    id: "m14-q96", dialecte: "Snowflake",
    q: "Comment voir le stockage d'une table, Time Travel et Fail-safe compris ?",
    choixCode: true,
    choix: [
      "SNOWFLAKE.ACCOUNT_USAGE.TABLE_STORAGE_METRICS",
      "sp_spaceused",
      "SHOW INDEXES",
      "Impossible"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Octets actifs, en Time Travel et en Fail-safe : utile pour trouver les tables qui coûtent cher.",
      "Non. SQL Server.",
      "Non.",
      "Non."
    ],
    retenir: "Stockage détaillé : TABLE_STORAGE_METRICS."
  },
  {
    id: "m14-q97", dialecte: "Snowflake",
    q: "Le clustering automatique, le Search Optimization et Snowpipe sont-ils gratuits ?",
    choix: [
      "Oui",
      "Non : ce sont des services « serverless » qui consomment des crédits, à surveiller comme les warehouses",
      "Seulement en Enterprise",
      "Seulement la nuit"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Les coûts apparaissent dans les vues d'historique de consommation du compte.",
      "Non.",
      "Non."
    ],
    retenir: "Services serverless = crédits aussi."
  },
  {
    id: "m14-q98", dialecte: "Snowflake",
    q: "Quelles sont les bonnes pratiques de base pour maîtriser les coûts Snowflake ?",
    choix: [
      "Un seul gros warehouse toujours allumé",
      "Warehouses par usage, bien dimensionnés, AUTO_SUSPEND court, resource monitors, timeouts, requêtes qui lisent peu (filtres, colonnes), suivi régulier",
      "Ne jamais suspendre",
      "Tout en DirectQuery"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Le coût Snowflake se pilote comme un budget de projet.",
      "Non.",
      "Non."
    ],
    retenir: "Coûts : taille juste, arrêt auto, quotas, requêtes efficaces, suivi."
  },
  {
    id: "m14-q99", dialecte: "SQL Server + Snowflake",
    q: "Quel changement d'état d'esprit faut-il entre SQL Server et Snowflake pour la performance ?",
    choix: [
      "Aucun",
      "SQL Server : on optimise surtout avec des index. Snowflake : on lit moins (pruning, colonnes, filtres) et on ajuste la puissance de calcul, en sachant que tout se paie",
      "Snowflake : tout est instantané",
      "SQL Server : pas d'optimisation"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Sur Snowflake, une requête lente est aussi une requête chère.",
      "Non.",
      "Non."
    ],
    retenir: "Snowflake : moins lire, calcul ajustable, coût visible."
  },
  {
    id: "m14-q100", dialecte: "Snowflake",
    q: "Quelle phrase résume le mieux Snowflake ?",
    choix: [
      "Un SQL Server dans le cloud",
      "Un entrepôt cloud où stockage et calcul sont séparés, sans index ni maintenance, avec Time Travel, clonage et partage, facturé à l'usage",
      "Un outil de reporting",
      "Un ETL"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Le fonctionnement interne est très différent.",
      "Oui. C'est ce qui guide la conception, l'optimisation et la gouvernance.",
      "Non.",
      "Non."
    ],
    retenir: "Snowflake : séparé, sans index, voyage dans le temps, payé à l'usage."
  }
];
