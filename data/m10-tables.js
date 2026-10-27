LEARNSQL.questions.m10 = [
  {
    id: "m10-q01", dialecte: "Standard",
    q: "Dans CREATE TABLE, que précise-t-on obligatoirement pour chaque colonne ?",
    choix: [
      "Son index",
      "Son nom et son type",
      "Sa valeur par défaut",
      "Sa clé étrangère"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Un index est facultatif.",
      "Oui. Le reste (NULL / NOT NULL, DEFAULT, contraintes) est facultatif… mais conseillé.",
      "Non. DEFAULT est facultatif.",
      "Non. Une clé étrangère est facultative."
    ],
    retenir: "Colonne = nom + type (+ NULL / NOT NULL)."
  },
  {
    id: "m10-q02", dialecte: "SQL Server",
    q: "Quelle est la valeur maximale d'un TINYINT ?",
    choix: [
      "127",
      "255",
      "32 767",
      "2,1 milliards"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Sur SQL Server, TINYINT n'est pas signé.",
      "Oui. De 0 à 255, sur 1 octet.",
      "Non. C'est SMALLINT.",
      "Non. C'est INT."
    ],
    retenir: "TINYINT 0-255, SMALLINT ±32 767, INT ±2,1 milliards, BIGINT énorme."
  },
  {
    id: "m10-q03", dialecte: "SQL Server",
    q: "Quel type entier choisir pour l'identifiant d'une table de logs qui reçoit 50 millions de lignes par mois ?",
    choix: [
      "SMALLINT",
      "INT",
      "BIGINT",
      "TINYINT"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Plein en quelques secondes.",
      "Non. 2,1 milliards : atteint en 3 ans et demi. Changer de type ensuite est très lourd.",
      "Oui. Pas de risque de dépassement.",
      "Non. TINYINT s'arrête à 255."
    ],
    retenir: "Table qui grossit vite : BIGINT pour l'id."
  },
  {
    id: "m10-q04", dialecte: "Standard",
    q: "Quel type pour des quantités vendues au mètre (ex. 12,5 m de câble) ?",
    choix: [
      "INT",
      "DECIMAL(12,3)",
      "VARCHAR(10)",
      "BIT"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Les décimales seraient perdues.",
      "Oui. Exact, avec 3 décimales.",
      "Non. Impossible de calculer proprement.",
      "Non. BIT ne stocke que 0 ou 1."
    ],
    retenir: "Quantité fractionnaire : DECIMAL, pas INT."
  },
  {
    id: "m10-q05", dialecte: "Standard",
    q: "Pourquoi éviter FLOAT pour des montants ?",
    choix: [
      "Il est trop petit pour de gros montants",
      "Il stocke des valeurs approchées",
      "Il n'accepte pas les nombres négatifs",
      "Il est interdit pour les colonnes monétaires"
    ],
    bonne: 1,
    pourquoi: [
      "Non. FLOAT peut stocker de très grands nombres.",
      "Oui. Les sommes peuvent avoir des écarts de centimes : 0,1 n'est pas représentable exactement en binaire. Montants = DECIMAL.",
      "Non. FLOAT accepte les nombres négatifs.",
      "Non. Il est permis, mais inadapté."
    ],
    retenir: "Argent : DECIMAL. FLOAT : mesures scientifiques."
  },
  {
    id: "m10-q06", dialecte: "SQL Server",
    q: "Une colonne CHAR(10) reçoit 'ABC'. Que contient-elle ?",
    choix: [
      "'ABC', sans rien d'autre",
      "'ABC' suivi de 7 espaces",
      "NULL, car la valeur est trop courte",
      "Une erreur : longueur incorrecte"
    ],
    bonne: 1,
    pourquoi: [
      "Non. CHAR a une longueur fixe.",
      "Oui. CHAR complète avec des espaces. VARCHAR, lui, garde la longueur réelle.",
      "Non. Une valeur courte est complétée, pas mise à NULL.",
      "Non. Une valeur plus courte est acceptée."
    ],
    retenir: "CHAR = longueur fixe (espaces ajoutés). VARCHAR = longueur variable."
  },
  {
    id: "m10-q07", dialecte: "Standard",
    q: "Quand CHAR est-il un bon choix plutôt que VARCHAR ?",
    choix: [
      "Pour des libellés d'articles",
      "Pour des codes de longueur fixe",
      "Pour des adresses de livraison",
      "Jamais, VARCHAR est toujours meilleur"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Les libellés varient : espaces inutiles.",
      "Oui. Code pays 'FR', devise 'EUR' : CHAR(2), CHAR(3), longueur fixe, pas de surcoût.",
      "Non. Les adresses varient beaucoup en longueur.",
      "Non. Pour des codes de longueur fixe, CHAR convient."
    ],
    retenir: "CHAR pour les codes de longueur fixe."
  },
  {
    id: "m10-q08", dialecte: "SQL Server",
    q: "Quelle est la différence entre VARCHAR et NVARCHAR sur SQL Server ?",
    choix: [
      "Aucune, ce sont deux synonymes",
      "NVARCHAR stocke l'Unicode",
      "VARCHAR est le type le plus récent",
      "NVARCHAR est limité à 10 caractères"
    ],
    bonne: 1,
    pourquoi: [
      "Non. NVARCHAR stocke l'Unicode, VARCHAR non.",
      "Oui. Tous les alphabets, avec en général 2 octets par caractère. VARCHAR dépend de la collation (page de codes) : certains caractères étrangers sont perdus.",
      "Non. L'âge du type n'est pas la différence.",
      "Non. NVARCHAR va jusqu'à 4 000 caractères, ou MAX."
    ],
    retenir: "Caractères étrangers possibles : NVARCHAR."
  },
  {
    id: "m10-q09", dialecte: "SQL Server",
    q: "Pourquoi ne pas mettre VARCHAR(MAX) partout « pour être tranquille » ?",
    choix: [
      "C'est interdit dans une table",
      "Pas d'index, et taille réelle cachée",
      "Elle ne peut contenir que 100 caractères",
      "Elle est bloquée en lecture seule"
    ],
    bonne: 1,
    pourquoi: [
      "Non. VARCHAR(MAX) est permis.",
      "Oui. Une colonne MAX ne peut pas être clé d'index, peut être stockée hors de la ligne, et cache la vraie taille attendue. Choisis une longueur réaliste : c'est aussi un contrôle de qualité.",
      "Non. MAX va jusqu'à 2 Go.",
      "Non. Elle se modifie normalement."
    ],
    retenir: "Longueur juste = performance + contrôle. MAX seulement si nécessaire."
  },
  {
    id: "m10-q10", dialecte: "Snowflake",
    q: "Sur Snowflake, VARCHAR(50) est-il plus performant que VARCHAR sans longueur ?",
    choix: [
      "Oui, beaucoup plus rapide",
      "Non : la longueur sert de contrôle",
      "VARCHAR sans longueur est interdit",
      "Oui, mais seulement pour les jointures"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Sur Snowflake, la longueur ne change pas la vitesse.",
      "Oui. Sur Snowflake, la longueur n'influence pas les performances : elle refuse seulement les valeurs trop longues. Différent de SQL Server. Une longueur reste utile pour documenter et contrôler.",
      "Non. VARCHAR sans longueur est permis.",
      "Non. Même vitesse pour les jointures."
    ],
    retenir: "Snowflake : la longueur des VARCHAR est un contrôle, pas une optimisation."
  },
  {
    id: "m10-q11", dialecte: "Snowflake",
    q: "Sur Snowflake, à quoi correspond INT ?",
    choix: [
      "Un entier 32 bits",
      "NUMBER(38,0)",
      "FLOAT",
      "VARCHAR"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Snowflake n'a pas de types d'entier à taille fixe.",
      "Oui. INT, BIGINT, SMALLINT… sont tous des alias de NUMBER(38,0).",
      "Non. INT reste un nombre exact.",
      "Non. INT est un nombre, pas un texte."
    ],
    retenir: "Snowflake : tous les entiers = NUMBER(38,0)."
  },
  {
    id: "m10-q12", dialecte: "SQL Server",
    q: "Quel type de date/heure moderne choisir sur SQL Server pour un horodatage ?",
    choix: [
      "DATETIME (le type historique)",
      "DATETIME2, précision au choix",
      "SMALLDATETIME (plus léger)",
      "VARCHAR(19) au format ISO"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Ancien type, précision bizarre (1/300 s).",
      "Oui. DATETIME2(0) à DATETIME2(7) : plus précis, plage plus large, précision réglable. DATETIME2(0) = à la seconde.",
      "Non. Précision à la minute seulement.",
      "Non. Une date se stocke dans un type date."
    ],
    retenir: "Horodatage SQL Server : DATETIME2."
  },
  {
    id: "m10-q13", dialecte: "SQL Server",
    q: "Une colonne DATETIME reçoit '2026-10-31 23:59:59.999'. Que contient-elle ?",
    choix: [
      "2026-10-31 23:59:59.999",
      "2026-11-01 00:00:00.000",
      "2026-10-31 23:59:59.000",
      "Une erreur"
    ],
    bonne: 1,
    pourquoi: [
      "Non. DATETIME n'a pas cette précision.",
      "Oui. DATETIME arrondit à 1/300 s : .999 devient la seconde suivante… donc le lendemain ! Raison de plus pour filtrer avec < lendemain.",
      "Non. DATETIME arrondit .999 vers le haut.",
      "Non. La valeur est acceptée et arrondie."
    ],
    retenir: "DATETIME arrondit : '23:59:59.999' = jour suivant."
  },
  {
    id: "m10-q14", dialecte: "SQL Server",
    q: "Quel type stocke une date ET le décalage horaire (ex. +02:00) ?",
    choixCode: true,
    choix: [
      "DATETIME2",
      "DATETIMEOFFSET",
      "DATE",
      "TIME"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Pas de fuseau.",
      "Oui. Utile pour des flux internationaux. (Snowflake : TIMESTAMP_TZ.)",
      "Non. DATE n'a ni heure ni fuseau.",
      "Non. TIME n'a ni date ni fuseau."
    ],
    retenir: "Date + fuseau : DATETIMEOFFSET (SQL Server), TIMESTAMP_TZ (Snowflake)."
  },
  {
    id: "m10-q15", dialecte: "Standard",
    q: "Une date de commande sans heure : quel type ?",
    choix: [
      "DATETIME",
      "DATE",
      "VARCHAR(10)",
      "INT"
    ],
    bonne: 1,
    pourquoi: [
      "Non. L'heure inutile crée des pièges de filtre.",
      "Oui. 3 octets, pas d'heure, pas de piège.",
      "Non. Un texte accepte des dates fausses.",
      "Non. On perd les fonctions de date."
    ],
    retenir: "Pas d'heure utile : type DATE."
  },
  {
    id: "m10-q16", dialecte: "SQL Server",
    q: "Pourquoi un UNIQUEIDENTIFIER généré par NEWID() est-il une mauvaise clé d'index cluster ?",
    choix: [
      "Il n'est pas vraiment unique",
      "Valeurs aléatoires : index fragmenté",
      "Il est trop petit pour une clé",
      "Il est interdit comme clé primaire"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Il est unique.",
      "Oui. Chaque insertion tombe au milieu de l'index : la table se fragmente et ralentit. Préfère un INT/BIGINT IDENTITY, ou NEWSEQUENTIALID() si un GUID est obligatoire.",
      "Non. 16 octets : 4 fois un INT.",
      "Non. Il est permis comme clé primaire."
    ],
    retenir: "Clé cluster : étroite et croissante. Pas de GUID aléatoire."
  },
  {
    id: "m10-q17", dialecte: "Standard",
    q: "Pourquoi déclarer NOT NULL dès qu'une valeur est obligatoire ?",
    choix: [
      "Pour la décoration du modèle",
      "La base refuse les lignes incomplètes",
      "Pour accélérer les INSERT",
      "C'est obligatoire pour toutes les colonnes"
    ],
    bonne: 1,
    pourquoi: [
      "Non. C'est un vrai contrôle des données.",
      "Oui. Et l'optimiseur peut faire de meilleurs plans. Un NULL qui ne devrait pas exister est un bug qui arrive tôt ou tard.",
      "Non. NOT NULL ajoute un contrôle, il n'accélère pas l'INSERT.",
      "Non. Seulement les colonnes vraiment obligatoires."
    ],
    retenir: "Obligatoire métier = NOT NULL en base."
  },
  {
    id: "m10-q18", dialecte: "Standard",
    q: "Que garantit une PRIMARY KEY ?",
    choix: [
      "Que la colonne est triée",
      "Que chaque valeur est unique ET non NULL",
      "Que la colonne est un entier",
      "Que la colonne est indexée en texte"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Une table n'a pas d'ordre garanti.",
      "Oui. Elle identifie chaque ligne de façon sûre.",
      "Non. Une clé peut être un texte.",
      "Non. La clé peut être de tout type, pas seulement du texte."
    ],
    retenir: "PRIMARY KEY = unique + NOT NULL."
  },
  {
    id: "m10-q19", dialecte: "SQL Server",
    q: "Sur SQL Server, que crée automatiquement une PRIMARY KEY (par défaut) ?",
    choix: [
      "Rien de plus qu'une contrainte",
      "Un index cluster (par défaut)",
      "Une vue triée sur la clé",
      "Un trigger de contrôle des doublons"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Elle crée aussi un index.",
      "Oui. Si la table n'en a pas déjà un : la table est rangée selon la clé primaire. On peut choisir NONCLUSTERED si besoin.",
      "Non. Elle ne crée pas de vue.",
      "Non. L'index unique suffit : pas de trigger."
    ],
    retenir: "SQL Server : PRIMARY KEY = index cluster par défaut."
  },
  {
    id: "m10-q20", dialecte: "Standard",
    q: "Comment déclarer une clé primaire sur deux colonnes (societe, num_cde) ?",
    choixCode: true,
    choix: [
      "societe PRIMARY KEY, num_cde PRIMARY KEY",
      "CONSTRAINT pk_commande PRIMARY KEY (societe, num_cde)",
      "PRIMARY KEY societe + num_cde",
      "Impossible"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Une table n'a qu'UNE clé primaire.",
      "Oui. Clé composée : c'est le couple qui doit être unique.",
      "Non. Syntaxe invalide.",
      "Non. Une clé composée est permise."
    ],
    retenir: "Clé composée : PRIMARY KEY (col1, col2)."
  },
  {
    id: "m10-q21", dialecte: "Standard",
    q: "Une table a un id technique en clé primaire. Comment empêcher deux factures d'avoir le même numéro ?",
    choixCode: true,
    choix: [
      "CONSTRAINT pk_facture PRIMARY KEY (num_facture)",
      "CONSTRAINT uq_facture_num UNIQUE (num_facture)",
      "CREATE INDEX ix_facture_num ON facture (num_facture)",
      "CONSTRAINT ck_facture_num CHECK (num_facture IS NOT NULL)"
    ],
    bonne: 1,
    pourquoi: [
      "Non. La table a déjà une clé primaire (l'id) : une seule PK par table.",
      "Oui. Clé technique + contrainte UNIQUE sur la clé métier.",
      "Non. Un index non unique n'empêche rien.",
      "Non. Interdit les NULL, pas les doublons."
    ],
    retenir: "Clé technique en PK + UNIQUE sur la clé métier."
  },
  {
    id: "m10-q22", dialecte: "SQL Server",
    q: "Une contrainte UNIQUE (email) existe. Deux clients n'ont pas d'email (NULL). Que se passe-t-il au 2e INSERT sur SQL Server ?",
    choix: [
      "Ça marche : plusieurs NULL sont permis",
      "Erreur : un seul NULL est accepté",
      "Le 1er client est écrasé par le 2e",
      "Le NULL devient '' automatiquement"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Pas sur SQL Server. (La norme SQL, elle, autorise plusieurs NULL dans une colonne UNIQUE.)",
      "Oui. SQL Server n'accepte qu'un seul NULL dans une contrainte UNIQUE. Solution : un index unique filtré … WHERE email IS NOT NULL.",
      "Non. Un INSERT n'écrase jamais une autre ligne.",
      "Non. SQL Server ne change pas la valeur."
    ],
    retenir: "SQL Server UNIQUE : un seul NULL. Index filtré pour en autoriser plusieurs."
  },
  {
    id: "m10-q23", dialecte: "SQL Server",
    q: "Comment rendre l'email unique quand il est renseigné, tout en autorisant plusieurs NULL ?",
    choixCode: true,
    choix: [
      "ALTER TABLE client ADD CONSTRAINT uq_client_email UNIQUE (email)",
      "CREATE UNIQUE INDEX ux_client_email ON client (email) WHERE email IS NOT NULL",
      "CREATE UNIQUE INDEX ux_client_email ON client (email) WHERE email IS NULL",
      "CREATE INDEX ux_client_email ON client (email) WHERE email IS NOT NULL"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Un seul NULL accepté.",
      "Oui. L'index ne contient que les lignes avec un email : les NULL ne sont pas comparés.",
      "Non. Filtre inversé : l'unicité porte sur les NULL seulement.",
      "Non. Index non unique : il n'empêche pas les doublons."
    ],
    retenir: "Unicité « si renseigné » : index unique filtré."
  },
  {
    id: "m10-q24", dialecte: "Standard",
    q: "Vers quoi une FOREIGN KEY doit-elle pointer ?",
    choix: [
      "N'importe quelle colonne de même type",
      "Une PRIMARY KEY ou une colonne UNIQUE",
      "Une colonne qui accepte NULL",
      "Une vue sur la table parente"
    ],
    bonne: 1,
    pourquoi: [
      "Non. La colonne visée doit être unique.",
      "Oui. La colonne (ou le groupe) référencée doit identifier une seule ligne.",
      "Non. La colonne visée doit être unique.",
      "Non. Une FK pointe vers une table."
    ],
    retenir: "FK → PK ou UNIQUE."
  },
  {
    id: "m10-q25", dialecte: "Standard",
    q: "commande.client_id est une FK vers client.id, et accepte NULL. Une commande avec client_id NULL est-elle acceptée ?",
    choix: [
      "Non, la FK refuse les NULL",
      "Oui : la FK ignore les NULL",
      "Seulement si un client a l'id NULL",
      "Erreur : valeur de référence absente"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Une FK ne vérifie que les valeurs renseignées.",
      "Oui. Une FK ne vérifie que les valeurs renseignées. Pour interdire : NOT NULL en plus de la FK.",
      "Non. Le NULL n'est pas comparé.",
      "Non. Un NULL n'est pas contrôlé par la FK."
    ],
    retenir: "FK + NULL autorisé = référence facultative. Obligatoire ? Ajoute NOT NULL."
  },
  {
    id: "m10-q26", dialecte: "Standard",
    q: "CHECK (qte > 0) existe. Une ligne avec qte = NULL est-elle acceptée ?",
    choix: [
      "Non, le CHECK la refuse",
      "Oui : le CHECK laisse passer NULL",
      "Erreur : NULL n'est pas un nombre",
      "Seulement en UPDATE, pas en INSERT"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Piège classique.",
      "Oui. Un CHECK ne refuse que si la condition est FAUSSE, et NULL > 0 est « inconnu ». Pour refuser aussi NULL : NOT NULL sur la colonne.",
      "Non. Une colonne numérique accepte NULL.",
      "Non. Même règle pour INSERT et UPDATE."
    ],
    retenir: "CHECK laisse passer NULL. Ajoute NOT NULL si besoin."
  },
  {
    id: "m10-q27", dialecte: "Standard",
    q: "Comment limiter la colonne statut aux valeurs 'BROUILLON', 'VALIDEE', 'ANNULEE' ?",
    choixCode: true,
    choix: [
      "CHECK (statut IN ('BROUILLON', 'VALIDEE', 'ANNULEE'))",
      "CHECK (statut IN ('BROUILLON') OR statut IS NOT NULL)",
      "CHECK (statut LIKE 'BROUILLON%' OR statut LIKE 'VALID%')",
      "DEFAULT ('BROUILLON', 'VALIDEE', 'ANNULEE') FOR statut"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. (Une FK vers une table de statuts est une alternative, plus souple si la liste évolue.)",
      "Non. Toujours vrai dès que le statut est renseigné : n'importe quelle valeur passe.",
      "Non. Accepte 'BROUILLONXYZ' et oublie ANNULEE.",
      "Non. Un DEFAULT n'est pas une liste autorisée, et n'accepte qu'une valeur."
    ],
    retenir: "Liste de valeurs : CHECK IN (…) ou FK vers une table de référence."
  },
  {
    id: "m10-q28", dialecte: "Standard",
    q: "Comment imposer que date_fin soit après date_debut ?",
    choixCode: true,
    choix: [
      "CHECK (date_fin >= date_debut)",
      "UNIQUE (date_debut, date_fin)",
      "DEFAULT date_debut",
      "Impossible en base"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Un CHECK peut comparer deux colonnes de la même ligne.",
      "Non. UNIQUE empêche les doublons, il ne compare pas les dates.",
      "Non. DEFAULT donne une valeur de départ, il ne contrôle rien.",
      "Non. Un CHECK le fait."
    ],
    retenir: "CHECK multi-colonnes : règles de cohérence sur la ligne."
  },
  {
    id: "m10-q29", dialecte: "SQL Server",
    q: "Pourquoi nommer ses contraintes (CONSTRAINT fk_commande_client …) plutôt que laisser SQL Server choisir ?",
    choix: [
      "C'est obligatoire depuis SQL Server 2016",
      "Des noms clairs pour les erreurs et scripts",
      "Pour accélérer la vérification",
      "Pour trier les contraintes par nom"
    ],
    bonne: 1,
    pourquoi: [
      "Non. C'est facultatif.",
      "Oui. Les noms automatiques sont illisibles (FK__commande__clien__3B75D760) et différents d'une base à l'autre. Un nom clair aide à comprendre l'erreur et à écrire DROP CONSTRAINT dans un script.",
      "Non. Le nom ne change pas la vitesse.",
      "Non. Le tri des contraintes n'a pas d'intérêt."
    ],
    retenir: "Contraintes nommées : pk_, fk_, uq_, ck_, df_."
  },
  {
    id: "m10-q30", dialecte: "SQL Server",
    q: "Comment ajouter une clé étrangère à une table existante ?",
    choixCode: true,
    choix: [
      "ALTER TABLE commande ADD CONSTRAINT fk_commande_client FOREIGN KEY (client_id) REFERENCES client (id)",
      "ALTER TABLE client ADD CONSTRAINT fk_commande_client FOREIGN KEY (id) REFERENCES commande (client_id)",
      "CREATE FOREIGN KEY fk_commande_client ON commande (client_id) REFERENCES client (id)",
      "ALTER TABLE commande ADD CONSTRAINT fk_commande_client CHECK (client_id IN (SELECT id FROM client))"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Les données existantes sont vérifiées : des orphelins = erreur.",
      "Non. Sens inversé : la FK doit être sur commande, vers client.",
      "Non. Syntaxe inexistante : on passe par ALTER TABLE.",
      "Non. Sous-requête interdite dans un CHECK."
    ],
    retenir: "ALTER TABLE … ADD CONSTRAINT … FOREIGN KEY … REFERENCES …"
  },
  {
    id: "m10-q31", dialecte: "SQL Server",
    q: "L'ajout d'une clé étrangère échoue : « conflit avec la contrainte FOREIGN KEY ». Pourquoi ?",
    choix: [
      "La syntaxe de la contrainte est fausse",
      "Des orphelins existent déjà",
      "La table commande est encore vide",
      "Il faut d'abord créer un index"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Le message parle de données, pas de syntaxe.",
      "Oui. Des lignes existantes pointent vers des valeurs absentes de la table parente. Trouve-les avec NOT EXISTS, corrige-les, puis ajoute la contrainte.",
      "Non. Une table vide n'a aucun orphelin : ça marcherait.",
      "Non. Une FK n'a pas besoin d'index pour être créée."
    ],
    retenir: "Avant d'ajouter une FK : nettoyer les orphelins."
  },
  {
    id: "m10-q32", dialecte: "SQL Server",
    q: "Une FK a été réactivée avec WITH NOCHECK après un chargement. Quel est le problème ?",
    choix: [
      "Aucun, c'est la méthode recommandée",
      "Contrainte non fiable (untrusted)",
      "La FK est supprimée sans prévenir",
      "Les nouveaux INSERT ne sont plus contrôlés"
    ],
    bonne: 1,
    pourquoi: [
      "Non. NOCHECK laisse des données non vérifiées.",
      "Oui. Les données existantes n'ont pas été vérifiées : l'optimiseur ne peut plus s'en servir. Réactive avec ALTER TABLE t WITH CHECK CHECK CONSTRAINT fk_… pour revérifier.",
      "Non. La FK existe toujours.",
      "Non. Les nouveaux le sont."
    ],
    retenir: "Après un chargement : WITH CHECK CHECK CONSTRAINT pour des contraintes fiables."
  },
  {
    id: "m10-q33", dialecte: "Snowflake",
    q: "Sur Snowflake, tu déclares PRIMARY KEY (id). Peut-on quand même insérer deux lignes avec le même id ?",
    choix: [
      "Non, erreur de clé primaire",
      "Oui : la PK n'est pas appliquée",
      "Oui, mais seulement avec COPY INTO",
      "Oui, mais seulement dans un MERGE"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Grosse différence avec SQL Server.",
      "Oui. Snowflake n'applique pas les clés primaires, uniques et étrangères (seulement NOT NULL). Les contrôles de doublons et d'orphelins sont à écrire soi-même.",
      "Non. Avec n'importe quelle instruction.",
      "Non. Avec n'importe quelle instruction."
    ],
    retenir: "Snowflake : seul NOT NULL est appliqué."
  },
  {
    id: "m10-q34", dialecte: "Snowflake",
    q: "Puisque Snowflake n'applique pas les PK, à quoi bon les déclarer ?",
    choix: [
      "À rien, c'est juste décoratif",
      "Documentation, outils, optimisations",
      "À accélérer les INSERT en masse",
      "C'est obligatoire pour créer une table"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Les outils et l'optimiseur peuvent s'en servir.",
      "Oui. Le modèle est documenté, les outils (Power BI, modélisation) lisent les relations, et certaines optimisations en profitent. Mais écris aussi des contrôles de qualité dans tes chargements.",
      "Non. Elles ne sont pas vérifiées : aucun effet sur la vitesse.",
      "Non. C'est facultatif."
    ],
    retenir: "Snowflake : déclarer les clés (documentation) + contrôler soi-même."
  },
  {
    id: "m10-q35", dialecte: "SQL Server",
    q: "Que veut dire IDENTITY(1000, 10) ?",
    choix: [
      "1 000 lignes maximum dans la table",
      "Départ à 1000, puis +10 à chaque ligne",
      "Des id tirés entre 10 et 1000",
      "Un id aléatoire de 10 chiffres"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Ce n'est pas une limite de lignes.",
      "Oui. IDENTITY(départ, pas) : 1000, 1010, 1020…",
      "Non. Les valeurs se suivent, elles ne sont pas tirées au hasard.",
      "Non. IDENTITY n'est pas aléatoire."
    ],
    retenir: "IDENTITY(départ, pas)."
  },
  {
    id: "m10-q36", dialecte: "SQL Server",
    q: "Comment repositionner le compteur IDENTITY d'une table (par exemple après une reprise de données) ?",
    choixCode: true,
    choix: [
      "DBCC CHECKIDENT ('dbo.client', RESEED, 5000)",
      "UPDATE client SET IDENTITY = 5000",
      "ALTER IDENTITY 5000",
      "TRUNCATE seulement"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. La prochaine valeur sera 5001. Attention à ne pas créer de doublons avec des id existants.",
      "Non. On ne modifie pas IDENTITY avec UPDATE.",
      "Non. Cette commande n'existe pas.",
      "Non. TRUNCATE remet au départ, mais vide la table."
    ],
    retenir: "Recaler IDENTITY : DBCC CHECKIDENT … RESEED."
  },
  {
    id: "m10-q37", dialecte: "Snowflake",
    q: "Sur Snowflake, comment déclarer une colonne auto-incrémentée ?",
    choixCode: true,
    choix: [
      "id INT AUTOINCREMENT",
      "id INT IDENTITY_INSERT",
      "id SERIAL",
      "id INT AUTO"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. AUTOINCREMENT (ou IDENTITY) avec départ et pas en option. Valeurs uniques, mais pas forcément sans trou.",
      "Non. IDENTITY_INSERT est une option SQL Server.",
      "Non. PostgreSQL.",
      "Non. AUTO n'est pas un mot-clé Snowflake."
    ],
    retenir: "Snowflake : AUTOINCREMENT / IDENTITY, ou une SEQUENCE."
  },
  {
    id: "m10-q38", dialecte: "SQL Server",
    q: "À quoi sert une colonne calculée PERSISTED ?",
    code: "ALTER TABLE ligne_cde ADD montant AS (qte * prix) PERSISTED;",
    choix: [
      "À rien, c'est une option décorative",
      "Stockée : lecture rapide, indexable",
      "Elle est recalculée à chaque lecture",
      "Elle peut être modifiée à la main"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Elle stocke la valeur.",
      "Oui. La valeur est calculée à l'écriture et stockée : lecture rapide, et on peut l'indexer. Sans PERSISTED, elle est calculée à chaque lecture.",
      "Non. C'est le cas sans PERSISTED.",
      "Non. Une colonne calculée ne se modifie pas."
    ],
    retenir: "Colonne calculée PERSISTED : stockée, indexable."
  },
  {
    id: "m10-q39", dialecte: "SQL Server",
    q: "Tu ajoutes une colonne NOT NULL à une table de 10 millions de lignes. Que faut-il ?",
    choixCode: true,
    choix: [
      "ALTER TABLE t ADD devise CHAR(3) NOT NULL; UPDATE t SET devise = 'EUR'",
      "ALTER TABLE t ADD devise CHAR(3) NOT NULL CONSTRAINT df_t_devise DEFAULT 'EUR'",
      "ALTER TABLE t ADD devise CHAR(3) NULL CONSTRAINT df_t_devise DEFAULT 'EUR'",
      "ALTER TABLE t ALTER COLUMN devise CHAR(3) NOT NULL DEFAULT 'EUR'"
    ],
    bonne: 1,
    pourquoi: [
      "Non. L'ALTER échoue avant l'UPDATE : les lignes existantes n'ont pas de valeur.",
      "Oui. La valeur par défaut remplit les lignes existantes. (Opération rapide sur les versions récentes.)",
      "Non. Colonne NULL : les lignes existantes restent à NULL (le DEFAULT ne sert qu'aux nouvelles).",
      "Non. ALTER COLUMN modifie une colonne existante, et n'accepte pas DEFAULT."
    ],
    retenir: "Nouvelle colonne NOT NULL = DEFAULT obligatoire."
  },
  {
    id: "m10-q40", dialecte: "SQL Server",
    q: "Tu veux réduire une colonne de VARCHAR(100) à VARCHAR(20). Des valeurs font 35 caractères. Que se passe-t-il ?",
    choix: [
      "Les valeurs trop longues sont coupées",
      "Erreur : données tronquées",
      "Les valeurs trop longues deviennent NULL",
      "Rien, la longueur est indicative"
    ],
    bonne: 1,
    pourquoi: [
      "Non. SQL Server refuse.",
      "Oui. SQL Server refuse : des données seraient tronquées. Vérifie d'abord : SELECT MAX(LEN(col)). Corrige les données si besoin.",
      "Non. SQL Server refuse le changement.",
      "Non. SQL Server contrôle la longueur."
    ],
    retenir: "Réduire une colonne : vérifier MAX(LEN) avant."
  },
  {
    id: "m10-q41", dialecte: "Standard",
    q: "Peut-on ajouter une colonne « au milieu » d'une table existante (après la 2e colonne) ?",
    choix: [
      "Oui, avec AFTER nom_colonne",
      "Non : ADD l'ajoute toujours à la fin",
      "Oui, avec l'option POSITION = 3",
      "Oui, mais sur SQL Server seulement"
    ],
    bonne: 1,
    pourquoi: [
      "Non. AFTER, c'est MySQL.",
      "Oui. Pour réordonner, il faut recréer la table. L'ordre physique n'a pas d'importance : liste les colonnes dans l'ordre voulu dans tes SELECT et tes vues.",
      "Non. Cette option n'existe pas.",
      "Non. SQL Server ajoute toujours à la fin."
    ],
    retenir: "Nouvelle colonne = à la fin. L'ordre se gère dans les SELECT."
  },
  {
    id: "m10-q42", dialecte: "SQL Server + Snowflake",
    q: "Comment renommer une colonne ?",
    choix: [
      "sp_rename (SQL Server), RENAME COLUMN (Snowflake)",
      "UPDATE client SET NAME ville = commune",
      "ALTER COLUMN ville AS commune, partout",
      "RENAME COLUMN (SQL Server), sp_rename (Snowflake)"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. sp_rename 'dbo.client.ville', 'commune', 'COLUMN' sur SQL Server ; ALTER TABLE client RENAME COLUMN ville TO commune sur Snowflake. Attention : les vues, procédures et rapports qui utilisent l'ancien nom vont casser.",
      "Non. UPDATE modifie des données, pas des noms.",
      "Non. Cette syntaxe n'existe pas.",
      "Non. C'est l'inverse."
    ],
    retenir: "Renommer : sp_rename (SQL Server), RENAME COLUMN (Snowflake). Vérifier les dépendances."
  },
  {
    id: "m10-q43", dialecte: "SQL Server",
    q: "SELECT * INTO client_copie FROM client copie-t-il la clé primaire, les index et les contraintes ?",
    choix: [
      "Oui, tout est copié à l'identique",
      "Non : colonnes et données seulement",
      "Seulement les index, pas les clés",
      "Seulement les clés étrangères et les CHECK"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Les clés et index ne sont pas copiés.",
      "Oui. Seulement les colonnes, leurs types, NULL/NOT NULL et la propriété IDENTITY. Clés, index, valeurs par défaut et triggers sont à recréer.",
      "Non. Les index ne sont pas copiés.",
      "Non. Aucune contrainte n'est copiée."
    ],
    retenir: "SELECT INTO = structure de base + données. Pas les contraintes."
  },
  {
    id: "m10-q44", dialecte: "Snowflake",
    q: "Sur Snowflake, que fait CREATE OR REPLACE TABLE client (…) si la table client existe et contient des données ?",
    choix: [
      "Erreur : la table existe déjà",
      "Elle remplace la table : données perdues",
      "Elle ajoute seulement les colonnes manquantes",
      "Rien, car la table existe déjà"
    ],
    bonne: 1,
    pourquoi: [
      "Non. OR REPLACE remplace sans erreur.",
      "Oui. Les données actuelles disparaissent (récupérables seulement via Time Travel). Très dangereux dans un script de déploiement. Pour ajouter une colonne : ALTER TABLE.",
      "Non. Toute la table est remplacée, vide.",
      "Non. OR REPLACE remplace la table."
    ],
    retenir: "CREATE OR REPLACE TABLE = DROP + CREATE. Danger."
  },
  {
    id: "m10-q45", dialecte: "Snowflake",
    q: "Sur Snowflake, comment créer une table seulement si elle n'existe pas encore ?",
    choixCode: true,
    choix: [
      "CREATE TABLE IF NOT EXISTS client (…)",
      "CREATE OR REPLACE TABLE client (…)",
      "CREATE TABLE client (…) ONLY",
      "CREATE NEW TABLE client"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Rien n'est fait si elle existe : script relançable sans perte.",
      "Non. Ça écrase la table existante.",
      "Non. ONLY n'existe pas ici.",
      "Non. Cette syntaxe n'existe pas."
    ],
    retenir: "Relançable sans perte : CREATE TABLE IF NOT EXISTS."
  },
  {
    id: "m10-q46", dialecte: "Snowflake",
    q: "Sur Snowflake, quelle est la différence entre une table PERMANENT et TRANSIENT ?",
    choix: [
      "Aucune, c'est le même type de table",
      "TRANSIENT : pas de Fail-safe, moins cher",
      "TRANSIENT disparaît à la fin de la session",
      "PERMANENT est en lecture seule"
    ],
    bonne: 1,
    pourquoi: [
      "Non. TRANSIENT n'a pas de Fail-safe.",
      "Oui. Pas de Fail-safe (7 jours de protection) et un Time Travel limité : moins de coût de stockage, moins de protection. Idéal pour les tables de chargement qu'on peut recréer.",
      "Non. C'est TEMPORARY.",
      "Non. PERMANENT est modifiable."
    ],
    retenir: "Snowflake : TEMPORARY (session), TRANSIENT (sans Fail-safe), PERMANENT."
  },
  {
    id: "m10-q47", dialecte: "SQL Server",
    q: "Quelle est la différence entre #client et ##client ?",
    choix: [
      "Aucune, c'est une faute de frappe",
      "# : ta session ; ## : toutes",
      "##client est une table permanente",
      "#client peut contenir plus de lignes"
    ],
    bonne: 1,
    pourquoi: [
      "Non. ## donne une table visible par toutes les sessions.",
      "Oui. #client est visible seulement par ta session ; ##client par toutes les sessions. ## est rarement une bonne idée : conflits de noms et de données entre utilisateurs.",
      "Non. Elle disparaît quand plus personne ne l'utilise.",
      "Non. Pas de différence de taille."
    ],
    retenir: "# = privée. ## = globale (à éviter)."
  },
  {
    id: "m10-q48", dialecte: "SQL Server",
    q: "À quoi servent les schémas (dbo, stg, rpt…) dans une base ?",
    choix: [
      "À rien, dbo suffit toujours",
      "À ranger les objets et gérer les droits",
      "À trier les lignes des tables",
      "À compresser les données de chaque table"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Les schémas aident à ranger et à gérer les droits.",
      "Oui. Ranger par usage (chargement, référentiel, rapports) et donner des droits par schéma. Ex. les utilisateurs Power BI ont seulement le droit de lire le schéma rpt.",
      "Non. Un schéma ne trie rien.",
      "Non. Un schéma ne compresse rien."
    ],
    retenir: "Schémas = rangement + sécurité."
  },
  {
    id: "m10-q49", dialecte: "Standard",
    q: "Une vue stocke-t-elle des données ?",
    choix: [
      "Oui, une copie des données",
      "Non : c'est une requête enregistrée",
      "Oui, dans un cache permanent",
      "Seulement les index de la table"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Une vue simple ne copie rien.",
      "Oui. Une vue simple est exécutée à chaque lecture. Les vues « matérialisées » / « indexées » sont l'exception : elles stockent le résultat.",
      "Non. Une vue simple n'a pas de cache.",
      "Non. Elle ne stocke pas d'index."
    ],
    retenir: "Vue = requête enregistrée, pas une copie."
  },
  {
    id: "m10-q50", dialecte: "SQL Server",
    q: "Que fait WITH SCHEMABINDING sur une vue ?",
    choix: [
      "La vue devient plus rapide",
      "Les tables sources sont protégées",
      "La vue change de schéma (dbo → sch)",
      "La vue stocke ses données sur disque"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Pas directement.",
      "Oui. On ne peut plus modifier ou supprimer les colonnes utilisées par la vue sans d'abord modifier la vue. Obligatoire pour une vue indexée.",
      "Non. Le schéma de la vue ne change pas.",
      "Non. Sauf si on lui ajoute un index cluster."
    ],
    retenir: "SCHEMABINDING = lien fort vue ↔ tables."
  },
  {
    id: "m10-q51", dialecte: "SQL Server",
    q: "Que faut-il pour transformer une vue en « vue indexée » (résultat stocké) sur SQL Server ?",
    choix: [
      "Rien de spécial, il suffit de le demander",
      "SCHEMABINDING + index cluster unique",
      "Un trigger qui recopie les données",
      "Une table temporaire globale (##)"
    ],
    bonne: 1,
    pourquoi: [
      "Non. SCHEMABINDING et un index cluster unique sont nécessaires.",
      "Oui. WITH SCHEMABINDING, puis un index cluster UNIQUE sur la vue : le résultat est stocké et maintenu à chaque modification des tables (coût en écriture).",
      "Non. SQL Server maintient la vue lui-même.",
      "Non. Une ## table n'est pas une vue indexée."
    ],
    retenir: "Vue indexée = SCHEMABINDING + index cluster unique."
  },
  {
    id: "m10-q52", dialecte: "Snowflake",
    q: "Sur Snowflake, qu'est-ce qu'une vue matérialisée ?",
    choix: [
      "Une vue normale, recalculée à chaque fois",
      "Une vue dont le résultat est stocké",
      "Une table temporaire de la session",
      "Une copie manuelle faite chaque nuit"
    ],
    bonne: 1,
    pourquoi: [
      "Non. C'est la vue normale.",
      "Oui. Le résultat est maintenu automatiquement (édition Enterprise, sur une seule table, avec un coût de maintenance). Utile pour des agrégats très souvent lus.",
      "Non. Elle est permanente.",
      "Non. Snowflake la maintient automatiquement."
    ],
    retenir: "Vue matérialisée Snowflake : rapide en lecture, coût de maintenance, limitée."
  },
  {
    id: "m10-q53", dialecte: "Snowflake",
    q: "Sur Snowflake, à quoi sert une SECURE VIEW ?",
    choix: [
      "À chiffrer les données de la vue",
      "À cacher la définition de la vue",
      "À accélérer la lecture de la vue",
      "À empêcher toute lecture de la vue"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Elle ne chiffre rien.",
      "Oui. Les utilisateurs voient le résultat, pas le SQL ni les tables derrière (utile en partage de données).",
      "Non. Elle peut même être un peu plus lente.",
      "Non. Les utilisateurs autorisés lisent les données."
    ],
    retenir: "SECURE VIEW = définition cachée."
  },
  {
    id: "m10-q54", dialecte: "SQL Server",
    q: "Une vue fait SELECT * FROM client. Tu ajoutes une colonne à client. La vue la montre-t-elle ?",
    choix: [
      "Oui, automatiquement et tout de suite",
      "Non : il faut sp_refreshview",
      "Erreur à la lecture de la vue",
      "Oui, mais seulement le lendemain"
    ],
    bonne: 1,
    pourquoi: [
      "Non. La liste des colonnes est figée à la création.",
      "Oui. SQL Server garde la liste de colonnes de la création : il faut sp_refreshview (ou recréer la vue). Encore une raison de lister les colonnes dans une vue.",
      "Non. La vue fonctionne, sans la nouvelle colonne.",
      "Non. Rien ne se met à jour tout seul."
    ],
    retenir: "Vue avec * : colonnes figées à la création."
  },
  {
    id: "m10-q55", dialecte: "Standard",
    q: "Comment permettre aux utilisateurs RH de lire les salariés sans voir la colonne salaire ?",
    choix: [
      "Supprimer la colonne salaire",
      "Une vue sans la colonne salaire",
      "Mettre la colonne salaire à NULL",
      "Chiffrer toute la table des salariés"
    ],
    bonne: 1,
    pourquoi: [
      "Non. On perd la donnée pour tout le monde.",
      "Oui. On donne les droits sur la vue, pas sur la table : la vue sert de « fenêtre » de sécurité.",
      "Non. On perd la donnée pour tout le monde.",
      "Non. Trop lourd pour ce besoin."
    ],
    retenir: "Vue = contrôle de ce qui est visible."
  },
  {
    id: "m10-q56", dialecte: "SQL Server",
    q: "Une vue filtre WHERE pays = 'FR' et est créée WITH CHECK OPTION. Que se passe-t-il si on fait un UPDATE via la vue qui met pays = 'BE' ?",
    choix: [
      "La ligne disparaît de la vue",
      "Erreur : la ligne sortirait de la vue",
      "Rien : la vue ignore l'UPDATE",
      "La définition de la vue est modifiée"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Ce serait le cas sans CHECK OPTION.",
      "Oui. CHECK OPTION interdit les modifications contraires au filtre de la vue.",
      "Non. CHECK OPTION refuse avec une erreur.",
      "Non. La vue ne change pas."
    ],
    retenir: "WITH CHECK OPTION : on ne sort pas une ligne de la vue en la modifiant."
  },
  {
    id: "m10-q57", dialecte: "SQL Server",
    q: "La base est insensible à la casse, mais une colonne code doit distinguer 'a1' et 'A1'. Que faire ?",
    choixCode: true,
    choix: [
      "ALTER DATABASE … COLLATE Latin1_General_CS_AS",
      "code VARCHAR(20) COLLATE Latin1_General_CS_AS",
      "code VARCHAR(20) COLLATE Latin1_General_CI_AS",
      "code VARCHAR(20) CHECK (code = UPPER(code))"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Changer la collation de toute la base : trop lourd et risqué.",
      "Oui. Dans la définition de la colonne : la collation peut être définie colonne par colonne.",
      "Non. CI = insensible à la casse : 'a1' = 'A1'.",
      "Non. En collation CI, code = UPPER(code) est toujours vrai : ça ne distingue rien."
    ],
    retenir: "Collation : réglable par colonne."
  },
  {
    id: "m10-q58", dialecte: "SQL Server",
    q: "Comment enregistrer automatiquement qui a créé la ligne et quand ?",
    choixCode: true,
    choix: [
      "cree_le DATETIME2 DEFAULT SYSDATETIME(), cree_par NVARCHAR(128) DEFAULT SUSER_SNAME()",
      "cree_le DATETIME2, cree_par NVARCHAR(128) (rempli à la main)",
      "Une colonne IDENTITY",
      "Impossible"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Les valeurs par défaut se remplissent à l'insertion.",
      "Non. Risque d'oubli.",
      "Non. IDENTITY donne un numéro, pas l'auteur ni la date.",
      "Non. Des DEFAULT le font."
    ],
    retenir: "Colonnes d'audit : DEFAULT SYSDATETIME() / SUSER_SNAME()."
  },
  {
    id: "m10-q59", dialecte: "SQL Server",
    q: "La colonne modifie_le a DEFAULT SYSDATETIME(). Est-elle mise à jour automatiquement lors d'un UPDATE ?",
    choix: [
      "Oui, à chaque modification",
      "Non : DEFAULT sert seulement à l'INSERT",
      "Oui, si la ligne change vraiment",
      "Oui, mais seulement sur Snowflake"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Erreur fréquente.",
      "Oui. Pour l'UPDATE : l'application, un trigger, ou une table temporelle. Pense-y dès la conception.",
      "Non. DEFAULT ne sert qu'à l'INSERT.",
      "Non. Même règle sur Snowflake."
    ],
    retenir: "DEFAULT = à la création seulement."
  },
  {
    id: "m10-q60", dialecte: "Standard",
    q: "Clé naturelle (ex. SIRET) ou clé technique (id auto) comme clé primaire : quel est le principal avantage de la clé technique ?",
    choix: [
      "Elle a un sens pour le métier",
      "Elle ne change jamais",
      "Elle est plus lisible par les humains",
      "Elle évite d'écrire des contraintes"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Au contraire.",
      "Oui. Elle est stable, courte et uniforme, même si la donnée métier change ou est saisie en retard. Un SIRET peut changer, être faux, ou absent au début : garde-le en UNIQUE à côté.",
      "Non. Un numéro technique n'est pas plus lisible.",
      "Non. On garde les contraintes (UNIQUE sur le SIRET)."
    ],
    retenir: "PK technique stable + UNIQUE sur la clé naturelle."
  },
  {
    id: "m10-q61", dialecte: "Standard",
    q: "Stocker les montants en centimes dans un entier (12,50 € → 1250) : quel avantage, quel risque ?",
    choix: [
      "Aucun avantage, que des risques",
      "Exact, mais /100 à ne pas oublier",
      "Ça interdit les montants négatifs",
      "Ça arrondit tout à l'euro près"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Les calculs sont exacts et rapides.",
      "Oui. Calculs exacts et rapides ; mais risque d'erreur si quelqu'un oublie de diviser par 100. DECIMAL est en général plus simple pour tous. Documente le choix s'il est fait.",
      "Non. Un entier accepte les négatifs.",
      "Non. 1250 centimes gardent les centimes."
    ],
    retenir: "Centimes en entier : possible, mais DECIMAL est plus clair."
  },
  {
    id: "m10-q62", dialecte: "SQL Server",
    q: "Une vieille table stocke un booléen en CHAR(1) 'O' / 'N'. Comment le protéger ?",
    choixCode: true,
    choix: [
      "CHECK (actif IN ('O', 'N'))",
      "CHECK (actif IN ('O', 'N')) et NOT NULL",
      "CHECK (actif <> '') et NOT NULL",
      "UNIQUE (actif) et NOT NULL"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Presque : mais NULL passe encore (un CHECK laisse passer NULL).",
      "Oui. Seules les valeurs prévues entrent. (En neuf, préfère BIT.)",
      "Non. 'Y', '1' ou 'o' passent encore.",
      "Non. Une seule ligne par valeur : deux clients actifs impossibles."
    ],
    retenir: "Codes à valeurs fixes : CHECK IN (…)."
  },
  {
    id: "m10-q63", dialecte: "Standard",
    q: "Dans un entrepôt de données, la clé de la dimension date est souvent un entier 20261026. Est-ce une bonne pratique ?",
    choix: [
      "Non, jamais d'entier pour une date",
      "Oui pour la clé du calendrier seulement",
      "Oui, partout, même dans l'ERP",
      "Non, il faut stocker du texte"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Pour la clé du calendrier, c'est courant.",
      "Oui. Lisible et compacte pour la clé de la table calendrier ; mais les vraies dates restent en type DATE dans la dimension. Dans une base de gestion (ERP), une date reste une DATE.",
      "Non. Dans un ERP, une date reste une DATE.",
      "Non. Un texte est plus lourd et sans contrôle."
    ],
    retenir: "Clé date AAAAMMJJ : en entrepôt, pour la dimension calendrier."
  },
  {
    id: "m10-q64", dialecte: "Standard",
    q: "Une colonne contient des listes : 'A12;B45;C78'. Quel est le problème ?",
    choix: [
      "Aucun, c'est compact et pratique",
      "On ne peut ni joindre ni contrôler",
      "Le texte est trop long pour la colonne",
      "Le ; est interdit dans un VARCHAR"
    ],
    bonne: 1,
    pourquoi: [
      "Non. On ne peut plus joindre ni contrôler.",
      "Oui. Impossible de joindre, filtrer, compter ou contrôler proprement : il faut une table enfant (une ligne par valeur). C'est contraire à la 1re forme normale.",
      "Non. La longueur n'est pas le vrai problème.",
      "Non. Le ; est permis dans un texte."
    ],
    retenir: "Une valeur par case. Liste = table enfant."
  },
  {
    id: "m10-q65", dialecte: "SQL Server",
    q: "Tu dois stocker du JSON dans SQL Server. Quelle approche ?",
    choix: [
      "NVARCHAR(MAX) avec CHECK (ISJSON(doc) = 1)",
      "VARIANT avec CHECK (IS_OBJECT(doc))",
      "XML avec CHECK (doc IS NOT NULL)",
      "VARCHAR(100) avec CHECK (doc LIKE '{%}')"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Le CHECK refuse le JSON mal formé ; on lit ensuite avec JSON_VALUE / OPENJSON. (Snowflake : type VARIANT.)",
      "Non. VARIANT est un type Snowflake, pas SQL Server.",
      "Non. JSON n'est pas du XML.",
      "Non. Trop court, et le LIKE ne vérifie pas que le JSON est valide."
    ],
    retenir: "JSON SQL Server : NVARCHAR(MAX) + ISJSON. Snowflake : VARIANT."
  },
  {
    id: "m10-q66", dialecte: "Snowflake",
    q: "Sur Snowflake, quel type stocke du JSON pour l'interroger directement ?",
    choixCode: true,
    choix: [
      "VARCHAR",
      "VARIANT",
      "BINARY",
      "TEXT"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Possible, mais il faudrait le convertir à chaque lecture.",
      "Oui. VARIANT (et ses cousins OBJECT, ARRAY) : on lit avec col:chemin::type.",
      "Non. BINARY stocke des octets.",
      "Non. TEXT est un VARCHAR sur Snowflake."
    ],
    retenir: "Snowflake : JSON → VARIANT."
  },
  {
    id: "m10-q67", dialecte: "Snowflake",
    q: "Sur Snowflake, une colonne déclarée TIMESTAMP (sans précision) devient, par défaut…",
    choix: [
      "TIMESTAMP_TZ",
      "TIMESTAMP_NTZ",
      "TIMESTAMP_LTZ",
      "DATE"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Par défaut, c'est NTZ.",
      "Oui. Par défaut (paramètre TIMESTAMP_TYPE_MAPPING). Sois explicite pour éviter les surprises.",
      "Non. Par défaut, c'est NTZ.",
      "Non. L'heure est gardée."
    ],
    retenir: "Snowflake : écris TIMESTAMP_NTZ / LTZ / TZ explicitement."
  },
  {
    id: "m10-q68", dialecte: "Snowflake",
    q: "Sur Snowflake, comment régler la durée de Time Travel d'une table ?",
    choixCode: true,
    choix: [
      "ALTER TABLE commande SET DATA_RETENTION_TIME_IN_DAYS = 30",
      "ALTER TABLE commande SET TIME_TRAVEL = 30",
      "CREATE BACKUP 30",
      "Impossible"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Jusqu'à 90 jours en édition Enterprise. Plus long = plus de stockage.",
      "Non. Le paramètre s'appelle DATA_RETENTION_TIME_IN_DAYS.",
      "Non. Cette commande n'existe pas.",
      "Non. Un ALTER TABLE le règle."
    ],
    retenir: "DATA_RETENTION_TIME_IN_DAYS = durée de Time Travel."
  },
  {
    id: "m10-q69", dialecte: "Snowflake",
    q: "Sur Snowflake, que fait CLUSTER BY (date_cde) dans CREATE TABLE ?",
    choix: [
      "Il crée un index sur date_cde",
      "Il réorganise les micro-partitions",
      "Il trie l'affichage des SELECT",
      "Il découpe la table en plusieurs tables"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Pas d'index sur Snowflake.",
      "Oui. CLUSTER BY définit une clé de clustering : Snowflake réorganise les micro-partitions selon date_cde pour mieux filtrer (coût en crédits). À réserver aux très grosses tables.",
      "Non. L'affichage a toujours besoin d'ORDER BY.",
      "Non. La table reste une seule table."
    ],
    retenir: "CLUSTER BY = meilleur pruning, pour les très grosses tables."
  },
  {
    id: "m10-q70", dialecte: "Snowflake",
    q: "Sur une table Snowflake standard, que donne CREATE INDEX ix ON commande (client_id) ?",
    choix: [
      "Un index est créé sur client_id",
      "Erreur : pas d'index sur Snowflake",
      "Une clé de clustering est créée",
      "Rien, sans aucun message"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Pas d'index sur Snowflake.",
      "Oui. Pas d'index sur les tables standard. L'optimisation passe par le pruning des micro-partitions et, si besoin, une clé de clustering.",
      "Non. Ce serait CLUSTER BY.",
      "Non. Snowflake renvoie une erreur."
    ],
    retenir: "Snowflake : pas de CREATE INDEX (tables standard)."
  },
  {
    id: "m10-q71", dialecte: "SQL Server",
    q: "À quoi sert le partitionnement d'une très grosse table sur SQL Server (ex. par mois) ?",
    choix: [
      "À répartir la table sur plusieurs bases",
      "À archiver ou purger par tranche",
      "À remplacer les index de la table",
      "À trier les requêtes par mois"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Les partitions restent dans la même base.",
      "Oui. On gère la table par morceaux : archiver ou supprimer un mois entier instantanément (SWITCH), maintenance par partie. Pour les performances, le bon index compte plus.",
      "Non. Les index restent nécessaires.",
      "Non. Le partitionnement ne trie pas les requêtes."
    ],
    retenir: "Partitionnement SQL Server : surtout pour gérer / archiver par tranche."
  },
  {
    id: "m10-q72", dialecte: "SQL Server",
    q: "Que peut apporter la compression PAGE sur une grosse table d'historique SQL Server ?",
    choix: [
      "Rien de mesurable sur une table",
      "Moins de disque, un peu plus de CPU",
      "Des données perdues à la compression",
      "Une table passée en lecture seule"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Gain souvent important d'espace et de lectures.",
      "Oui. Moins d'espace et souvent moins de lectures, contre un peu plus de calcul processeur. Intéressant pour les tables volumineuses peu modifiées.",
      "Non. La compression est sans perte.",
      "Non. La table reste modifiable."
    ],
    retenir: "Compression : moins de disque, un peu plus de CPU."
  },
  {
    id: "m10-q73", dialecte: "SQL Server",
    q: "Pour une table de chargement vidée et rechargée chaque nuit, une table sans index cluster (heap) est-elle acceptable ?",
    choix: [
      "Non, jamais : une table a toujours un cluster",
      "Oui : chargement en masse rapide",
      "Oui, mais seulement le week-end",
      "Non, c'est interdit par SQL Server"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Une table peut être un heap.",
      "Oui. On peut ajouter des index après le chargement si nécessaire. Pour les tables « permanentes » souvent lues et modifiées, un index cluster reste conseillé.",
      "Non. Le jour n'a pas d'importance.",
      "Non. C'est permis."
    ],
    retenir: "Heap : correct pour du chargement temporaire."
  },
  {
    id: "m10-q74", dialecte: "Standard",
    q: "Quel type pour un numéro de téléphone (+33 4 78 12 34 56) ?",
    choix: [
      "INT",
      "BIGINT",
      "VARCHAR(20)",
      "DECIMAL"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Trop petit, et le + et le 0 de tête sont perdus.",
      "Non. Le 0 de tête et le + sont perdus.",
      "Oui. Ce n'est pas un nombre : on ne calcule jamais dessus.",
      "Non. On ne calcule pas sur un téléphone, et le + est perdu."
    ],
    retenir: "Si on ne calcule pas dessus, ce n'est pas un nombre."
  },
  {
    id: "m10-q75", dialecte: "Standard",
    q: "Quel type pour un code postal de clients internationaux ?",
    choix: [
      "INT",
      "CHAR(5)",
      "VARCHAR(10)",
      "DECIMAL(5,0)"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Zéros perdus, et des codes contiennent des lettres (UK, Canada, Corse).",
      "Non. Trop strict : formats étrangers différents.",
      "Oui. Texte, longueur variable.",
      "Non. Zéros de tête et lettres perdus."
    ],
    retenir: "Codes postaux : texte, longueur variable."
  },
  {
    id: "m10-q76", dialecte: "Standard",
    q: "Les prix unitaires d'achat ont jusqu'à 4 décimales (ex. 0,0375 € la vis). Quel type ?",
    choix: [
      "DECIMAL(18,2)",
      "DECIMAL(19,4)",
      "INT",
      "FLOAT"
    ],
    bonne: 1,
    pourquoi: [
      "Non. 0,0375 deviendrait 0,04 : erreur sur 10 000 vis.",
      "Oui. Prix unitaires précis ; les montants totaux peuvent rester en 2 décimales.",
      "Non. Les décimales seraient perdues.",
      "Non. FLOAT est approché."
    ],
    retenir: "Prix unitaires fins : plus de décimales que les montants."
  },
  {
    id: "m10-q77", dialecte: "Standard",
    q: "Tu stockes un taux de remise. 20 % : 20 ou 0,20 ?",
    choix: [
      "Peu importe, les deux se valent bien",
      "Une seule convention, documentée",
      "Toujours 20, c'est plus lisible",
      "Toujours du texte comme '20%'"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Mélanger les deux crée des erreurs × 100.",
      "Oui. Choisis UNE convention, documente-la, et adapte le type (DECIMAL(5,2) pour 20,00 ; DECIMAL(5,4) pour 0,2000).",
      "Non. Les deux conventions existent : l'important est d'en choisir une.",
      "Non. Impossible de calculer avec du texte."
    ],
    retenir: "Pourcentages : une convention unique et documentée."
  },
  {
    id: "m10-q78", dialecte: "Standard",
    q: "Pourquoi les tables de chargement (stg) ont-elles souvent toutes leurs colonnes en VARCHAR ?",
    choix: [
      "Par paresse des développeurs",
      "Accepter tout, puis contrôler",
      "Pour gagner de la place sur le disque",
      "C'est obligatoire pour un import"
    ],
    bonne: 1,
    pourquoi: [
      "Non. C'est un choix voulu.",
      "Oui. Toutes les lignes du fichier entrent, même invalides ; on les contrôle et on les convertit avant la table cible. Une date mal formée ne fait pas échouer tout le chargement.",
      "Non. Ça ne fait pas gagner de place.",
      "Non. Ce n'est pas obligatoire."
    ],
    retenir: "stg en texte → contrôle → conversion → cible typée."
  },
  {
    id: "m10-q79", dialecte: "SQL Server",
    q: "Comment supprimer une table seulement si elle existe (script relançable) ?",
    choixCode: true,
    choix: [
      "DROP TABLE IF EXISTS stg.tmp_import;",
      "DROP TABLE stg.tmp_import FORCE;",
      "DELETE TABLE stg.tmp_import;",
      "TRUNCATE IF EXISTS"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. SQL Server 2016+ et Snowflake.",
      "Non. FORCE n'existe pas ici.",
      "Non. DELETE ne supprime pas une table.",
      "Non. Cette syntaxe n'existe pas."
    ],
    retenir: "DROP TABLE IF EXISTS."
  },
  {
    id: "m10-q80", dialecte: "SQL Server",
    q: "CREATE OR ALTER existe pour les vues et procédures. Et pour les tables ?",
    choix: [
      "CREATE OR ALTER TABLE existe aussi",
      "Non : on teste l'existence, ou ALTER",
      "Oui, depuis SQL Server 2016",
      "Oui, avec l'option FORCE"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Elle n'existe pas pour les tables.",
      "Oui. Pour une table, on teste son existence (IF OBJECT_ID(…) IS NULL) ou on utilise ALTER TABLE. Une table contient des données : on ne la « remplace » pas.",
      "Non. Seulement pour vues, procédures, fonctions.",
      "Non. FORCE n'existe pas ici."
    ],
    retenir: "Table : pas de CREATE OR ALTER. Évolution par ALTER TABLE."
  },
  {
    id: "m10-q81", dialecte: "SQL Server",
    q: "Comment ajouter une colonne seulement si elle n'existe pas encore (script relançable) ?",
    choixCode: true,
    choix: [
      "IF COL_LENGTH('dbo.facture', 'devise') IS NULL ALTER TABLE dbo.facture ADD devise CHAR(3) NULL;",
      "IF COL_LENGTH('dbo.facture', 'devise') IS NOT NULL ALTER TABLE dbo.facture ADD devise CHAR(3) NULL;",
      "ALTER TABLE dbo.facture ADD IF NOT EXISTS devise CHAR(3) NULL;",
      "IF OBJECT_ID('dbo.facture') IS NULL ALTER TABLE dbo.facture ADD devise CHAR(3) NULL;"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. COL_LENGTH renvoie NULL si la colonne n'existe pas.",
      "Non. Test inversé : on n'ajoute que si la colonne existe déjà (erreur).",
      "Non. Syntaxe Snowflake, pas SQL Server.",
      "Non. On teste la table, pas la colonne : rien n'est ajouté si la table existe."
    ],
    retenir: "Script de déploiement relançable : tester avant d'ajouter."
  },
  {
    id: "m10-q82", dialecte: "SQL Server + Snowflake",
    q: "Comment renommer une table ?",
    choix: [
      "sp_rename (SQL Server), ALTER TABLE … RENAME TO (Snowflake)",
      "ALTER TABLE … RENAME TO (SQL Server), sp_rename (Snowflake)",
      "UPDATE TABLE … SET NAME sur les deux moteurs",
      "Copier la table puis DROP, sur les deux moteurs"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. sp_rename 'dbo.ancien', 'nouveau' sur SQL Server ; ALTER TABLE ancien RENAME TO nouveau sur Snowflake. Vérifie toujours les dépendances (vues, procédures, flux ETL, rapports).",
      "Non. C'est l'inverse.",
      "Non. Cette syntaxe n'existe pas.",
      "Non. Possible, mais pas obligatoire."
    ],
    retenir: "Renommer = casser les dépendances. Vérifier avant."
  },
  {
    id: "m10-q83", dialecte: "SQL Server",
    q: "Avant de supprimer ou renommer une table, comment savoir quels objets l'utilisent ?",
    choix: [
      "Impossible, il faut deviner",
      "Dépendances SSMS + équipes ETL et BI",
      "Supprimer et attendre les plaintes",
      "Regarder le nom de la table"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Les dépendances se consultent.",
      "Oui. Affiche les dépendances (SSMS, sys.sql_expression_dependencies), et pense aux flux et rapports externes : ils ne sont pas visibles dans la base, demande aux équipes.",
      "Non. Trop risqué.",
      "Non. Le nom ne dit pas qui l'utilise."
    ],
    retenir: "Analyse d'impact avant toute modification de structure."
  },
  {
    id: "m10-q84", dialecte: "Standard",
    q: "Quelle règle de nommage des tables et colonnes est la plus sûre ?",
    choix: [
      "Avec espaces et accents, comme dans Excel",
      "Sans espace ni accent, cohérente",
      "Des noms très courts (dc, cl, ar)",
      "Chacun son style, selon le projet"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Il faudrait des crochets ou guillemets partout.",
      "Oui. En minuscules ou PascalCase, de façon cohérente (date_creation) : lisible, portable (SQL Server, Snowflake, outils), sans pièges.",
      "Non. Illisible.",
      "Non. Mélanger les styles crée des erreurs."
    ],
    retenir: "Noms : sans espace, sans accent, cohérents."
  },
  {
    id: "m10-q85", dialecte: "SQL Server + Snowflake",
    q: "Comment documenter le sens d'une colonne directement dans la base ?",
    choix: [
      "Impossible : seulement dans un fichier Word",
      "COMMENT ON (Snowflake), MS_Description (SQL Server)",
      "Dans le nom de la colonne, en long",
      "MS_Description (Snowflake), COMMENT ON (SQL Server)"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Les deux moteurs le permettent dans la base.",
      "Oui. Snowflake : COMMENT ON COLUMN t.col IS '…' ; SQL Server : propriété étendue MS_Description (sp_addextendedproperty). Les outils de documentation et certains outils BI lisent ces descriptions.",
      "Non. Un nom trop long devient illisible.",
      "Non. C'est l'inverse."
    ],
    retenir: "Dictionnaire de données : commentaires en base."
  },
  {
    id: "m10-q86", dialecte: "SQL Server",
    q: "Peut-on créer une clé étrangère entre la table client de la base SOC1 et la table commande de la base SOC2 ?",
    choix: [
      "Oui, exactement comme dans la même base",
      "Non : pas de FK entre deux bases",
      "Oui, en passant par un synonyme",
      "Oui, en passant par une vue"
    ],
    bonne: 1,
    pourquoi: [
      "Non. SQL Server refuse.",
      "Oui. SQL Server n'accepte pas les clés étrangères entre bases : contrôle par traitement ou trigger. Fréquent avec les ERP « multi-dossiers ».",
      "Non. Un synonyme ne permet pas de FK.",
      "Non. Une FK ne vise pas une vue."
    ],
    retenir: "Pas de FK entre bases différentes (SQL Server)."
  },
  {
    id: "m10-q87", dialecte: "Standard",
    q: "Un CHECK peut-il vérifier une valeur dans une AUTRE table (ex. que le client est actif) ?",
    choix: [
      "Oui, directement dans le CHECK",
      "Non : le CHECK ne voit que la ligne",
      "Oui, avec un JOIN écrit dans le CHECK",
      "Oui, mais seulement sur Snowflake"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Le CHECK ne voit que la ligne.",
      "Oui. Pour une autre table : clé étrangère, trigger ou contrôle applicatif. (Une fonction dans un CHECK le permet techniquement, mais c'est fragile et lent.)",
      "Non. Un JOIN est interdit dans un CHECK.",
      "Non. Snowflake n'applique même pas les CHECK."
    ],
    retenir: "CHECK = règles sur la ligne elle-même."
  },
  {
    id: "m10-q88", dialecte: "SQL Server",
    q: "Pour accélérer un très gros chargement, on désactive les contraintes (NOCHECK CONSTRAINT ALL). Que faut-il faire après ?",
    choix: [
      "Rien, elles se réactivent seules",
      "Les réactiver WITH CHECK",
      "Les supprimer définitivement",
      "Redémarrer le serveur SQL"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Les données ne sont plus protégées.",
      "Oui. WITH CHECK CHECK CONSTRAINT ALL contrôle les données chargées et garde des contraintes fiables. Si des lignes sont invalides, la réactivation échoue : tu sais qu'il faut corriger.",
      "Non. On perd toute protection.",
      "Non. Ça ne réactive rien."
    ],
    retenir: "Contraintes désactivées = à réactiver WITH CHECK."
  },
  {
    id: "m10-q89", dialecte: "SQL Server",
    q: "Contrainte UNIQUE ou index UNIQUE : quelle différence en pratique ?",
    choix: [
      "La contrainte ne bloque pas les doublons",
      "Même blocage ; l'index a plus d'options",
      "L'index unique est plus lent",
      "Aucune utilité, ce sont des doublons"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Elle les bloque.",
      "Oui. Les deux bloquent les doublons (la contrainte crée un index). La contrainte exprime une règle métier ; l'index permet des options (filtre, INCLUDE).",
      "Non. Même vitesse.",
      "Non. Le choix exprime une intention différente."
    ],
    retenir: "UNIQUE : contrainte (règle) ou index (options)."
  },
  {
    id: "m10-q90", dialecte: "SQL Server",
    q: "ALTER TABLE t ADD CONSTRAINT pk_t PRIMARY KEY (code) échoue : « nullable column ». Pourquoi ?",
    choix: [
      "La table est encore vide",
      "La colonne code accepte NULL",
      "La table a déjà une clé étrangère",
      "code est un texte, pas un nombre"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Le message parle d'une colonne nullable.",
      "Oui. Une clé primaire exige des colonnes NOT NULL : ALTER TABLE t ALTER COLUMN code VARCHAR(20) NOT NULL; puis la PK.",
      "Non. Le message parle d'une colonne nullable.",
      "Non. Une PK peut être un texte."
    ],
    retenir: "Clé primaire = colonnes NOT NULL."
  },
  {
    id: "m10-q91", dialecte: "Standard",
    q: "Quel est le risque d'une table sans clé primaire ?",
    choix: [
      "Aucun, c'est même plus rapide",
      "Des doublons possibles",
      "Elle passe en lecture seule",
      "Elle ne peut pas avoir d'index"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Doublons et lignes impossibles à cibler.",
      "Oui. Doublons possibles, impossible de cibler une ligne précise pour la corriger, problèmes avec les outils de réplication et de synchronisation. Toute table « métier » doit avoir une clé.",
      "Non. Elle reste modifiable.",
      "Non. Elle peut avoir des index."
    ],
    retenir: "Table métier = une clé primaire."
  },
  {
    id: "m10-q92", dialecte: "Standard",
    q: "Que fait ON DELETE SET NULL sur la FK commande.commercial_id ?",
    choix: [
      "Supprime les commandes du commercial",
      "commercial_id passe à NULL",
      "Empêche la suppression du commercial",
      "Rien, sauf un message d'alerte"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Ce serait CASCADE.",
      "Oui. Si le commercial est supprimé, ses commandes restent, mais commercial_id devient NULL. La colonne doit accepter NULL.",
      "Non. C'est le comportement par défaut (NO ACTION).",
      "Non. Les commandes sont vraiment modifiées."
    ],
    retenir: "ON DELETE : NO ACTION (défaut), CASCADE, SET NULL."
  },
  {
    id: "m10-q93", dialecte: "Standard",
    q: "Comment modéliser « chaque salarié a un manager, qui est lui-même un salarié » ?",
    choix: [
      "Une table manager séparée, copie de salarie",
      "manager_id dans salarie, FK vers salarie(id)",
      "Une colonne texte nom_manager dans salarie",
      "manager_id dans salarie, FK vers manager(id)"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Duplication des personnes.",
      "Oui. Clé étrangère vers la même table (auto-référence). NULL pour le sommet.",
      "Non. Pas de contrôle, homonymes.",
      "Non. Il n'y a pas de table manager : un manager est un salarié."
    ],
    retenir: "Hiérarchie : FK vers la même table."
  },
  {
    id: "m10-q94", dialecte: "SQL Server",
    q: "Deux tables se référencent mutuellement (A → B et B → A, colonnes NOT NULL). Comment insérer les premières lignes sur SQL Server ?",
    choix: [
      "Des contraintes « différées » jusqu'au COMMIT",
      "Une colonne NULL le temps d'insérer",
      "Insérer les deux lignes en même temps",
      "Impossible, il faut supprimer les FK"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Ça existe dans d'autres bases (PostgreSQL), pas sur SQL Server.",
      "Oui. SQL Server n'a pas de contraintes différées : rendre une des colonnes NULLable, insérer, puis mettre à jour. Ou revoir le modèle : une dépendance circulaire est souvent le signe d'un modèle à simplifier.",
      "Non. Chaque INSERT est vérifié tout de suite.",
      "Non. Une colonne NULL temporaire suffit."
    ],
    retenir: "Références circulaires : à éviter ; sinon NULL temporaire."
  },
  {
    id: "m10-q95", dialecte: "SQL Server",
    q: "Qu'apporte une table temporelle (SYSTEM_VERSIONING = ON) sur SQL Server ?",
    choix: [
      "Une table temporaire (#table)",
      "Un historique automatique des modifications",
      "Un tri automatique des lignes par date",
      "Une suppression automatique des vieilles lignes"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Rien à voir avec #table.",
      "Oui. SQL Server garde l'historique de chaque modification dans une table d'historique, interrogeable avec FOR SYSTEM_TIME AS OF. Idéal pour l'audit : « que valait ce tarif le 1er mars ? ».",
      "Non. Elle garde l'historique, elle ne trie pas.",
      "Non. Elle garde, elle ne supprime pas."
    ],
    retenir: "Table temporelle = historique automatique."
  },
  {
    id: "m10-q96", dialecte: "Snowflake",
    q: "Sur Snowflake, peut-on changer une colonne VARCHAR en NUMBER avec ALTER TABLE … ALTER COLUMN … SET DATA TYPE ?",
    choix: [
      "Oui, toujours, quel que soit le type",
      "Non : surtout agrandir, pas changer",
      "Oui, mais seulement si la table est vide",
      "Oui, avec l'option FORCE"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Surtout agrandir.",
      "Oui. Snowflake permet surtout d'agrandir (VARCHAR plus long, plus de précision). Pour changer de type : nouvelle colonne, conversion, puis échange. Prévoir les types dès la conception évite ces migrations.",
      "Non. Toujours limité.",
      "Non. FORCE n'existe pas ici."
    ],
    retenir: "Snowflake : changements de type limités. Bien typer dès le départ."
  },
  {
    id: "m10-q97", dialecte: "SQL Server",
    q: "Une colonne de type TEXT ou NTEXT apparaît dans une vieille base. Que faire ?",
    choix: [
      "Rien, ces types sont modernes",
      "Migrer vers (N)VARCHAR(MAX)",
      "Les transformer en INT pour gagner de la place",
      "Les supprimer de la table"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Beaucoup de fonctions texte ne marchent pas dessus.",
      "Oui. Ces types sont obsolètes : migre vers VARCHAR(MAX) / NVARCHAR(MAX). Même chose pour IMAGE → VARBINARY(MAX).",
      "Non. Un texte n'est pas un nombre.",
      "Non. On perdrait les données."
    ],
    retenir: "TEXT / NTEXT / IMAGE : obsolètes → (N)VARCHAR(MAX) / VARBINARY(MAX)."
  },
  {
    id: "m10-q98", dialecte: "Standard",
    q: "Pourquoi est-il préférable de typer correctement dès la création, plutôt que « tout en VARCHAR, on verra » ?",
    choix: [
      "Pour la beauté du modèle",
      "Contrôle, calculs justes, performance",
      "Ce n'est pas préférable, VARCHAR suffit",
      "Pour économiser des lignes"
    ],
    bonne: 1,
    pourquoi: [
      "Non. C'est la base de la qualité des données.",
      "Oui. Contrôle automatique des données, tris et calculs justes, meilleures performances ; changer un type plus tard coûte cher. Le type est la première règle de qualité.",
      "Non. VARCHAR accepte des valeurs fausses.",
      "Non. Le nombre de lignes ne change pas."
    ],
    retenir: "Le bon type dès le départ."
  },
  {
    id: "m10-q99", dialecte: "Standard",
    q: "Une table client a 120 colonnes, dont 40 « adresse_livraison_2 », « adresse_livraison_3 »… Quel problème de conception ?",
    choix: [
      "Aucun, 120 colonnes c'est normal",
      "Il manque une table adresse séparée",
      "Trop peu de colonnes pour les adresses",
      "Il faut plus d'index sur ces colonnes"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Ces colonnes répétées sont un défaut.",
      "Oui. Des groupes de colonnes répétés : il faut une table adresse (une ligne par adresse). Le nombre d'adresses devient illimité, et les requêtes restent simples.",
      "Non. Il en faut une table, pas plus de colonnes.",
      "Non. Des index ne règlent pas la conception."
    ],
    retenir: "Colonnes numérotées (x_1, x_2…) = table enfant manquante."
  },
  {
    id: "m10-q100", dialecte: "Standard",
    q: "Quelle liste décrit une table bien conçue ?",
    choix: [
      "Beaucoup de colonnes VARCHAR(MAX)",
      "Types justes, clés et contraintes",
      "Aucune contrainte, pour aller plus vite",
      "Une seule colonne JSON pour tout"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Pas de contrôle de type ni d'index.",
      "Oui. Types justes, NOT NULL quand c'est obligatoire, clé primaire, UNIQUE sur la clé métier, FK, CHECK, DEFAULT, noms clairs : la base protège elle-même la qualité des données.",
      "Non. La base ne protège plus les données.",
      "Non. Ni types ni contraintes."
    ],
    retenir: "Une bonne table se défend toute seule."
  }
];
