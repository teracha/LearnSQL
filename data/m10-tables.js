LEARNSQL.questions.m10 = [
  {
    id: "m10-q01", dialecte: "Standard",
    q: "Dans CREATE TABLE, que précise-t-on obligatoirement pour chaque colonne ?",
    choix: ["Son index", "Son nom et son type", "Sa valeur par défaut", "Sa clé étrangère"],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Le reste (NULL / NOT NULL, DEFAULT, contraintes) est facultatif… mais conseillé.",
      "Non.",
      "Non."
    ],
    retenir: "Colonne = nom + type (+ NULL / NOT NULL)."
  },
  {
    id: "m10-q02", dialecte: "SQL Server",
    q: "Quelle est la valeur maximale d'un TINYINT ?",
    choix: ["127", "255", "32 767", "2,1 milliards"],
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
    choix: ["SMALLINT", "INT", "BIGINT", "TINYINT"],
    bonne: 2,
    pourquoi: [
      "Non. Plein en quelques secondes.",
      "Non. 2,1 milliards : atteint en 3 ans et demi. Changer de type ensuite est très lourd.",
      "Oui. Pas de risque de dépassement.",
      "Non."
    ],
    retenir: "Table qui grossit vite : BIGINT pour l'id."
  },
  {
    id: "m10-q04", dialecte: "Standard",
    q: "Quel type pour des quantités vendues au mètre (ex. 12,5 m de câble) ?",
    choix: ["INT", "DECIMAL(12,3)", "VARCHAR(10)", "BIT"],
    bonne: 1,
    pourquoi: [
      "Non. Les décimales seraient perdues.",
      "Oui. Exact, avec 3 décimales.",
      "Non. Impossible de calculer proprement.",
      "Non."
    ],
    retenir: "Quantité fractionnaire : DECIMAL, pas INT."
  },
  {
    id: "m10-q05", dialecte: "Standard",
    q: "Pourquoi éviter FLOAT pour des montants ?",
    choix: [
      "Il est trop petit",
      "Il stocke des valeurs approchées : les sommes peuvent avoir des écarts de centimes",
      "Il n'accepte pas les négatifs",
      "Il est interdit"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. 0,1 n'est pas représentable exactement en binaire. Montants = DECIMAL.",
      "Non.",
      "Non."
    ],
    retenir: "Argent : DECIMAL. FLOAT : mesures scientifiques."
  },
  {
    id: "m10-q06", dialecte: "SQL Server",
    q: "Une colonne CHAR(10) reçoit 'ABC'. Que contient-elle ?",
    choix: ["'ABC'", "'ABC' suivi de 7 espaces", "NULL", "Une erreur"],
    bonne: 1,
    pourquoi: [
      "Non. CHAR a une longueur fixe.",
      "Oui. CHAR complète avec des espaces. VARCHAR, lui, garde la longueur réelle.",
      "Non.",
      "Non."
    ],
    retenir: "CHAR = longueur fixe (espaces ajoutés). VARCHAR = longueur variable."
  },
  {
    id: "m10-q07", dialecte: "Standard",
    q: "Quand CHAR est-il un bon choix plutôt que VARCHAR ?",
    choix: [
      "Pour des libellés",
      "Pour des codes de longueur toujours identique (code pays 'FR', devise 'EUR')",
      "Pour des adresses",
      "Jamais"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Les libellés varient : espaces inutiles.",
      "Oui. CHAR(2), CHAR(3) : longueur fixe, pas de surcoût.",
      "Non.",
      "Non."
    ],
    retenir: "CHAR pour les codes de longueur fixe."
  },
  {
    id: "m10-q08", dialecte: "SQL Server",
    q: "Quelle est la différence entre VARCHAR et NVARCHAR sur SQL Server ?",
    choix: [
      "Aucune",
      "NVARCHAR stocke l'Unicode (tous les alphabets), avec en général 2 octets par caractère",
      "VARCHAR est plus récent",
      "NVARCHAR est limité à 10 caractères"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. VARCHAR dépend de la collation (page de codes) : certains caractères étrangers sont perdus.",
      "Non.",
      "Non."
    ],
    retenir: "Caractères étrangers possibles : NVARCHAR."
  },
  {
    id: "m10-q09", dialecte: "SQL Server",
    q: "Pourquoi ne pas mettre VARCHAR(MAX) partout « pour être tranquille » ?",
    choix: [
      "C'est interdit",
      "Une colonne MAX ne peut pas être clé d'index, peut être stockée hors de la ligne, et cache la vraie taille attendue",
      "Elle ne peut contenir que 100 caractères",
      "Elle est plus rapide"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Choisis une longueur réaliste : c'est aussi un contrôle de qualité.",
      "Non.",
      "Non."
    ],
    retenir: "Longueur juste = performance + contrôle. MAX seulement si nécessaire."
  },
  {
    id: "m10-q10", dialecte: "Snowflake",
    q: "Sur Snowflake, VARCHAR(50) est-il plus performant que VARCHAR sans longueur ?",
    choix: [
      "Oui, beaucoup",
      "Non : la longueur n'influence pas les performances ; elle sert seulement de contrôle (refus des valeurs trop longues)",
      "VARCHAR sans longueur est interdit",
      "Oui, pour les jointures"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Différent de SQL Server. Une longueur reste utile pour documenter et contrôler.",
      "Non.",
      "Non."
    ],
    retenir: "Snowflake : la longueur des VARCHAR est un contrôle, pas une optimisation."
  },
  {
    id: "m10-q11", dialecte: "Snowflake",
    q: "Sur Snowflake, à quoi correspond INT ?",
    choix: ["Un entier 32 bits", "NUMBER(38,0)", "FLOAT", "VARCHAR"],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. INT, BIGINT, SMALLINT… sont tous des alias de NUMBER(38,0).",
      "Non.",
      "Non."
    ],
    retenir: "Snowflake : tous les entiers = NUMBER(38,0)."
  },
  {
    id: "m10-q12", dialecte: "SQL Server",
    q: "Quel type de date/heure moderne choisir sur SQL Server pour un horodatage ?",
    choixCode: true,
    choix: ["DATETIME", "DATETIME2(0) à DATETIME2(7) selon la précision voulue", "SMALLDATETIME", "VARCHAR(19)"],
    bonne: 1,
    pourquoi: [
      "Non. Ancien type, précision bizarre (1/300 s).",
      "Oui. Plus précis, plage plus large, précision réglable. DATETIME2(0) = à la seconde.",
      "Non. Précision à la minute seulement.",
      "Non."
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
      "Non.",
      "Non."
    ],
    retenir: "DATETIME arrondit : '23:59:59.999' = jour suivant."
  },
  {
    id: "m10-q14", dialecte: "SQL Server",
    q: "Quel type stocke une date ET le décalage horaire (ex. +02:00) ?",
    choixCode: true,
    choix: ["DATETIME2", "DATETIMEOFFSET", "DATE", "TIME"],
    bonne: 1,
    pourquoi: [
      "Non. Pas de fuseau.",
      "Oui. Utile pour des flux internationaux. (Snowflake : TIMESTAMP_TZ.)",
      "Non.",
      "Non."
    ],
    retenir: "Date + fuseau : DATETIMEOFFSET (SQL Server), TIMESTAMP_TZ (Snowflake)."
  },
  {
    id: "m10-q15", dialecte: "Standard",
    q: "Une date de commande sans heure : quel type ?",
    choix: ["DATETIME", "DATE", "VARCHAR(10)", "INT"],
    bonne: 1,
    pourquoi: [
      "Non. L'heure inutile crée des pièges de filtre.",
      "Oui. 3 octets, pas d'heure, pas de piège.",
      "Non.",
      "Non."
    ],
    retenir: "Pas d'heure utile : type DATE."
  },
  {
    id: "m10-q16", dialecte: "SQL Server",
    q: "Pourquoi un UNIQUEIDENTIFIER généré par NEWID() est-il une mauvaise clé d'index cluster ?",
    choix: [
      "Il n'est pas unique",
      "Les valeurs sont aléatoires : chaque insertion tombe au milieu de l'index, ce qui fragmente la table et ralentit",
      "Il est trop petit",
      "Il est interdit"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Il est unique.",
      "Oui. Préfère un INT/BIGINT IDENTITY, ou NEWSEQUENTIALID() si un GUID est obligatoire.",
      "Non. 16 octets : 4 fois un INT.",
      "Non."
    ],
    retenir: "Clé cluster : étroite et croissante. Pas de GUID aléatoire."
  },
  {
    id: "m10-q17", dialecte: "Standard",
    q: "Pourquoi déclarer NOT NULL dès qu'une valeur est obligatoire ?",
    choix: [
      "Pour la décoration",
      "La base refuse les lignes incomplètes, et l'optimiseur peut faire de meilleurs plans",
      "Pour accélérer les INSERT",
      "C'est obligatoire pour toutes les colonnes"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Un NULL qui ne devrait pas exister est un bug qui arrive tôt ou tard.",
      "Non.",
      "Non."
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
      "Non."
    ],
    retenir: "PRIMARY KEY = unique + NOT NULL."
  },
  {
    id: "m10-q19", dialecte: "SQL Server",
    q: "Sur SQL Server, que crée automatiquement une PRIMARY KEY (par défaut) ?",
    choix: ["Rien", "Un index cluster (si la table n'en a pas déjà un)", "Une vue", "Un trigger"],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. La table est rangée selon la clé primaire. On peut choisir NONCLUSTERED si besoin.",
      "Non.",
      "Non."
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
      "Non.",
      "Non."
    ],
    retenir: "Clé composée : PRIMARY KEY (col1, col2)."
  },
  {
    id: "m10-q21", dialecte: "Standard",
    q: "Une table a un id technique en clé primaire. Comment empêcher deux factures d'avoir le même numéro ?",
    choixCode: true,
    choix: [
      "Rien à faire, l'id suffit",
      "CONSTRAINT uq_facture_num UNIQUE (num_facture)",
      "Un index non unique",
      "Un trigger"
    ],
    bonne: 1,
    pourquoi: [
      "Non. L'id est unique, mais deux lignes peuvent avoir le même numéro.",
      "Oui. Clé technique + contrainte UNIQUE sur la clé métier.",
      "Non. Ça n'empêche rien.",
      "Non. Possible, mais compliqué et plus fragile."
    ],
    retenir: "Clé technique en PK + UNIQUE sur la clé métier."
  },
  {
    id: "m10-q22", dialecte: "SQL Server",
    q: "Une contrainte UNIQUE (email) existe. Deux clients n'ont pas d'email (NULL). Que se passe-t-il au 2e INSERT sur SQL Server ?",
    choix: ["Ça marche", "Erreur : SQL Server n'accepte qu'un seul NULL dans une contrainte UNIQUE", "Le 1er est écrasé", "Le NULL devient ''"],
    bonne: 1,
    pourquoi: [
      "Non sur SQL Server. (La norme SQL, elle, autorise plusieurs NULL dans une colonne UNIQUE.)",
      "Oui. Solution : un index unique filtré … WHERE email IS NOT NULL.",
      "Non.",
      "Non."
    ],
    retenir: "SQL Server UNIQUE : un seul NULL. Index filtré pour en autoriser plusieurs."
  },
  {
    id: "m10-q23", dialecte: "SQL Server",
    q: "Comment rendre l'email unique quand il est renseigné, tout en autorisant plusieurs NULL ?",
    choixCode: true,
    choix: [
      "UNIQUE (email)",
      "CREATE UNIQUE INDEX ux_client_email ON client (email) WHERE email IS NOT NULL",
      "CHECK (email IS NOT NULL)",
      "PRIMARY KEY (email)"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Un seul NULL accepté.",
      "Oui. L'index ne contient que les lignes avec un email : les NULL ne sont pas comparés.",
      "Non. Interdit les NULL.",
      "Non."
    ],
    retenir: "Unicité « si renseigné » : index unique filtré."
  },
  {
    id: "m10-q24", dialecte: "Standard",
    q: "Vers quoi une FOREIGN KEY doit-elle pointer ?",
    choix: [
      "N'importe quelle colonne",
      "Une colonne (ou un groupe) déclarée PRIMARY KEY ou UNIQUE dans la table référencée",
      "Une colonne NULL",
      "Une vue"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. La référence doit identifier une seule ligne.",
      "Non.",
      "Non."
    ],
    retenir: "FK → PK ou UNIQUE."
  },
  {
    id: "m10-q25", dialecte: "Standard",
    q: "commande.client_id est une FK vers client.id, et accepte NULL. Une commande avec client_id NULL est-elle acceptée ?",
    choix: ["Non", "Oui : une FK ne vérifie que les valeurs renseignées", "Seulement si un client a l'id NULL", "Erreur"],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Pour interdire : NOT NULL en plus de la FK.",
      "Non.",
      "Non."
    ],
    retenir: "FK + NULL autorisé = référence facultative. Obligatoire ? Ajoute NOT NULL."
  },
  {
    id: "m10-q26", dialecte: "Standard",
    q: "CHECK (qte > 0) existe. Une ligne avec qte = NULL est-elle acceptée ?",
    choix: ["Non", "Oui : un CHECK ne refuse que si la condition est FAUSSE, et NULL > 0 est « inconnu »", "Erreur", "Seulement en UPDATE"],
    bonne: 1,
    pourquoi: [
      "Non. Piège classique.",
      "Oui. Pour refuser aussi NULL : NOT NULL sur la colonne.",
      "Non.",
      "Non."
    ],
    retenir: "CHECK laisse passer NULL. Ajoute NOT NULL si besoin."
  },
  {
    id: "m10-q27", dialecte: "Standard",
    q: "Comment limiter la colonne statut aux valeurs 'BROUILLON', 'VALIDEE', 'ANNULEE' ?",
    choixCode: true,
    choix: [
      "CHECK (statut IN ('BROUILLON', 'VALIDEE', 'ANNULEE'))",
      "DEFAULT 'BROUILLON'",
      "UNIQUE (statut)",
      "FOREIGN KEY (statut)"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. (Une FK vers une table de statuts est une alternative, plus souple si la liste évolue.)",
      "Non. Valeur par défaut seulement.",
      "Non. Une seule commande par statut !",
      "Non. Il faudrait une table référencée."
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
      "Non.",
      "Non.",
      "Non."
    ],
    retenir: "CHECK multi-colonnes : règles de cohérence sur la ligne."
  },
  {
    id: "m10-q29", dialecte: "SQL Server",
    q: "Pourquoi nommer ses contraintes (CONSTRAINT fk_commande_client …) plutôt que laisser SQL Server choisir ?",
    choix: [
      "C'est obligatoire",
      "Les noms automatiques sont illisibles (FK__commande__clien__3B75D760) et différents d'une base à l'autre : messages d'erreur et scripts de déploiement plus difficiles",
      "Pour la performance",
      "Pour trier"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Un nom clair aide à comprendre l'erreur et à écrire DROP CONSTRAINT dans un script.",
      "Non.",
      "Non."
    ],
    retenir: "Contraintes nommées : pk_, fk_, uq_, ck_, df_."
  },
  {
    id: "m10-q30", dialecte: "SQL Server",
    q: "Comment ajouter une clé étrangère à une table existante ?",
    choixCode: true,
    choix: [
      "ALTER TABLE commande ADD CONSTRAINT fk_commande_client FOREIGN KEY (client_id) REFERENCES client (id)",
      "UPDATE commande SET FOREIGN KEY …",
      "CREATE FOREIGN KEY …",
      "Impossible, il faut recréer la table"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Les données existantes sont vérifiées : des orphelins = erreur.",
      "Non.",
      "Non.",
      "Non."
    ],
    retenir: "ALTER TABLE … ADD CONSTRAINT … FOREIGN KEY … REFERENCES …"
  },
  {
    id: "m10-q31", dialecte: "SQL Server",
    q: "L'ajout d'une clé étrangère échoue : « conflit avec la contrainte FOREIGN KEY ». Pourquoi ?",
    choix: [
      "La syntaxe est fausse",
      "Des lignes existantes pointent vers des valeurs absentes de la table parente (orphelins)",
      "La table est vide",
      "Il faut un index"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Trouve-les avec NOT EXISTS, corrige-les, puis ajoute la contrainte.",
      "Non.",
      "Non."
    ],
    retenir: "Avant d'ajouter une FK : nettoyer les orphelins."
  },
  {
    id: "m10-q32", dialecte: "SQL Server",
    q: "Une FK a été réactivée avec WITH NOCHECK après un chargement. Quel est le problème ?",
    choix: [
      "Aucun",
      "Les données existantes n'ont pas été vérifiées : la contrainte est « non fiable » (untrusted) et l'optimiseur ne peut plus s'en servir",
      "La FK est supprimée",
      "Les nouveaux INSERT ne sont plus contrôlés"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Réactive avec ALTER TABLE t WITH CHECK CHECK CONSTRAINT fk_… pour revérifier.",
      "Non.",
      "Non. Les nouveaux le sont."
    ],
    retenir: "Après un chargement : WITH CHECK CHECK CONSTRAINT pour des contraintes fiables."
  },
  {
    id: "m10-q33", dialecte: "Snowflake",
    q: "Sur Snowflake, tu déclares PRIMARY KEY (id). Peut-on quand même insérer deux lignes avec le même id ?",
    choix: ["Non, erreur", "Oui : Snowflake n'applique pas les clés primaires, uniques et étrangères (seulement NOT NULL)", "Seulement en COPY INTO", "Seulement en MERGE"],
    bonne: 1,
    pourquoi: [
      "Non. Grosse différence avec SQL Server.",
      "Oui. Les contraintes sont documentaires. Les contrôles de doublons et d'orphelins sont à écrire soi-même.",
      "Non.",
      "Non."
    ],
    retenir: "Snowflake : seul NOT NULL est appliqué."
  },
  {
    id: "m10-q34", dialecte: "Snowflake",
    q: "Puisque Snowflake n'applique pas les PK, à quoi bon les déclarer ?",
    choix: [
      "À rien",
      "Documentation du modèle, outils (Power BI, outils de modélisation) qui lisent les relations, et certaines optimisations",
      "À accélérer les INSERT",
      "C'est obligatoire"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Mais n'oublie pas d'écrire des contrôles de qualité dans tes chargements.",
      "Non.",
      "Non."
    ],
    retenir: "Snowflake : déclarer les clés (documentation) + contrôler soi-même."
  },
  {
    id: "m10-q35", dialecte: "SQL Server",
    q: "Que veut dire IDENTITY(1000, 10) ?",
    choix: [
      "1 000 lignes maximum",
      "Le 1er id vaut 1000, puis on ajoute 10 à chaque ligne (1000, 1010, 1020…)",
      "Des id entre 10 et 1000",
      "Un id aléatoire"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. IDENTITY(départ, pas).",
      "Non.",
      "Non."
    ],
    retenir: "IDENTITY(départ, pas)."
  },
  {
    id: "m10-q36", dialecte: "SQL Server",
    q: "Comment repositionner le compteur IDENTITY d'une table (par exemple après une reprise de données) ?",
    choixCode: true,
    choix: ["DBCC CHECKIDENT ('dbo.client', RESEED, 5000)", "UPDATE client SET IDENTITY = 5000", "ALTER IDENTITY 5000", "TRUNCATE seulement"],
    bonne: 0,
    pourquoi: [
      "Oui. La prochaine valeur sera 5001. Attention à ne pas créer de doublons avec des id existants.",
      "Non.",
      "Non.",
      "Non. TRUNCATE remet au départ, mais vide la table."
    ],
    retenir: "Recaler IDENTITY : DBCC CHECKIDENT … RESEED."
  },
  {
    id: "m10-q37", dialecte: "Snowflake",
    q: "Sur Snowflake, comment déclarer une colonne auto-incrémentée ?",
    choixCode: true,
    choix: ["id INT AUTOINCREMENT", "id INT IDENTITY_INSERT", "id SERIAL", "id INT AUTO"],
    bonne: 0,
    pourquoi: [
      "Oui. AUTOINCREMENT (ou IDENTITY) avec départ et pas en option. Valeurs uniques, mais pas forcément sans trou.",
      "Non.",
      "Non. PostgreSQL.",
      "Non."
    ],
    retenir: "Snowflake : AUTOINCREMENT / IDENTITY, ou une SEQUENCE."
  },
  {
    id: "m10-q38", dialecte: "SQL Server",
    q: "À quoi sert une colonne calculée PERSISTED ?",
    code: "ALTER TABLE ligne_cde ADD montant AS (qte * prix) PERSISTED;",
    choix: [
      "À rien",
      "La valeur est calculée à l'écriture et stockée : lecture rapide, et on peut l'indexer",
      "Elle est recalculée à chaque lecture",
      "Elle peut être modifiée à la main"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Sans PERSISTED, elle est calculée à chaque lecture.",
      "Non. C'est le cas sans PERSISTED.",
      "Non."
    ],
    retenir: "Colonne calculée PERSISTED : stockée, indexable."
  },
  {
    id: "m10-q39", dialecte: "SQL Server",
    q: "Tu ajoutes une colonne NOT NULL à une table de 10 millions de lignes. Que faut-il ?",
    choixCode: true,
    choix: [
      "ALTER TABLE t ADD devise CHAR(3) NOT NULL",
      "ALTER TABLE t ADD devise CHAR(3) NOT NULL CONSTRAINT df_t_devise DEFAULT 'EUR'",
      "Recréer la table",
      "Mettre NULL puis espérer"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Les lignes existantes n'ont pas de valeur : erreur.",
      "Oui. La valeur par défaut remplit les lignes existantes. (Opération rapide sur les versions récentes.)",
      "Non.",
      "Non."
    ],
    retenir: "Nouvelle colonne NOT NULL = DEFAULT obligatoire."
  },
  {
    id: "m10-q40", dialecte: "SQL Server",
    q: "Tu veux réduire une colonne de VARCHAR(100) à VARCHAR(20). Des valeurs font 35 caractères. Que se passe-t-il ?",
    choix: ["Les valeurs sont coupées", "Erreur : des données seraient tronquées", "La colonne devient NULL", "Rien"],
    bonne: 1,
    pourquoi: [
      "Non. SQL Server refuse.",
      "Oui. Vérifie d'abord : SELECT MAX(LEN(col)). Corrige les données si besoin.",
      "Non.",
      "Non."
    ],
    retenir: "Réduire une colonne : vérifier MAX(LEN) avant."
  },
  {
    id: "m10-q41", dialecte: "Standard",
    q: "Peut-on ajouter une colonne « au milieu » d'une table existante (après la 2e colonne) ?",
    choix: [
      "Oui, avec AFTER",
      "Non : ALTER TABLE ADD l'ajoute toujours à la fin. Pour réordonner, il faut recréer la table",
      "Oui, avec POSITION",
      "Oui sur SQL Server seulement"
    ],
    bonne: 1,
    pourquoi: [
      "Non. AFTER, c'est MySQL.",
      "Oui. L'ordre physique n'a pas d'importance : liste les colonnes dans l'ordre voulu dans tes SELECT et tes vues.",
      "Non.",
      "Non."
    ],
    retenir: "Nouvelle colonne = à la fin. L'ordre se gère dans les SELECT."
  },
  {
    id: "m10-q42", dialecte: "SQL Server + Snowflake",
    q: "Comment renommer une colonne ?",
    choix: [
      "sp_rename 'dbo.client.ville', 'commune', 'COLUMN' sur SQL Server ; ALTER TABLE client RENAME COLUMN ville TO commune sur Snowflake",
      "UPDATE client SET NAME ville = commune",
      "ALTER COLUMN ville AS commune partout",
      "Impossible"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Attention : les vues, procédures et rapports qui utilisent l'ancien nom vont casser.",
      "Non.",
      "Non.",
      "Non."
    ],
    retenir: "Renommer : sp_rename (SQL Server), RENAME COLUMN (Snowflake). Vérifier les dépendances."
  },
  {
    id: "m10-q43", dialecte: "SQL Server",
    q: "SELECT * INTO client_copie FROM client copie-t-il la clé primaire, les index et les contraintes ?",
    choix: [
      "Oui, tout",
      "Non : seulement les colonnes, leurs types, NULL/NOT NULL et la propriété IDENTITY",
      "Seulement les index",
      "Seulement les FK"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Clés, index, valeurs par défaut et triggers sont à recréer.",
      "Non.",
      "Non."
    ],
    retenir: "SELECT INTO = structure de base + données. Pas les contraintes."
  },
  {
    id: "m10-q44", dialecte: "Snowflake",
    q: "Sur Snowflake, que fait CREATE OR REPLACE TABLE client (…) si la table client existe et contient des données ?",
    choix: [
      "Erreur",
      "Elle remplace la table : les données actuelles disparaissent (récupérables seulement via Time Travel)",
      "Elle ajoute les colonnes manquantes",
      "Rien"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Très dangereux dans un script de déploiement. Pour ajouter une colonne : ALTER TABLE.",
      "Non.",
      "Non."
    ],
    retenir: "CREATE OR REPLACE TABLE = DROP + CREATE. Danger."
  },
  {
    id: "m10-q45", dialecte: "Snowflake",
    q: "Sur Snowflake, comment créer une table seulement si elle n'existe pas encore ?",
    choixCode: true,
    choix: ["CREATE TABLE IF NOT EXISTS client (…)", "CREATE OR REPLACE TABLE client (…)", "CREATE TABLE client (…) ONLY", "CREATE NEW TABLE client"],
    bonne: 0,
    pourquoi: [
      "Oui. Rien n'est fait si elle existe : script relançable sans perte.",
      "Non. Ça écrase la table existante.",
      "Non.",
      "Non."
    ],
    retenir: "Relançable sans perte : CREATE TABLE IF NOT EXISTS."
  },
  {
    id: "m10-q46", dialecte: "Snowflake",
    q: "Sur Snowflake, quelle est la différence entre une table PERMANENT et TRANSIENT ?",
    choix: [
      "Aucune",
      "TRANSIENT n'a pas de Fail-safe (7 jours de protection) et un Time Travel limité : moins de coût de stockage, moins de protection",
      "TRANSIENT disparaît à la fin de la session",
      "PERMANENT est en lecture seule"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Idéal pour les tables de chargement qu'on peut recréer facilement.",
      "Non. C'est TEMPORARY.",
      "Non."
    ],
    retenir: "Snowflake : TEMPORARY (session), TRANSIENT (sans Fail-safe), PERMANENT."
  },
  {
    id: "m10-q47", dialecte: "SQL Server",
    q: "Quelle est la différence entre #client et ##client ?",
    choix: [
      "Aucune",
      "#client est visible seulement par ta session ; ##client par toutes les sessions",
      "##client est permanente",
      "#client est plus grande"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. ## est rarement une bonne idée : conflits de noms et de données entre utilisateurs.",
      "Non. Elle disparaît quand plus personne ne l'utilise.",
      "Non."
    ],
    retenir: "# = privée. ## = globale (à éviter)."
  },
  {
    id: "m10-q48", dialecte: "SQL Server",
    q: "À quoi servent les schémas (dbo, stg, rpt…) dans une base ?",
    choix: [
      "À rien",
      "À ranger les objets par usage (chargement, référentiel, rapports) et à donner des droits par schéma",
      "À trier les lignes",
      "À compresser"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Ex. les utilisateurs Power BI ont seulement le droit de lire le schéma rpt.",
      "Non.",
      "Non."
    ],
    retenir: "Schémas = rangement + sécurité."
  },
  {
    id: "m10-q49", dialecte: "Standard",
    q: "Une vue stocke-t-elle des données ?",
    choix: [
      "Oui, une copie",
      "Non (vue simple) : c'est une requête enregistrée, exécutée à chaque lecture",
      "Oui, en cache permanent",
      "Seulement les index"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Les vues « matérialisées » / « indexées » sont l'exception : elles stockent le résultat.",
      "Non.",
      "Non."
    ],
    retenir: "Vue = requête enregistrée, pas une copie."
  },
  {
    id: "m10-q50", dialecte: "SQL Server",
    q: "Que fait WITH SCHEMABINDING sur une vue ?",
    choix: [
      "Elle devient plus rapide",
      "On ne peut plus modifier ou supprimer les colonnes des tables utilisées par la vue sans d'abord modifier la vue",
      "Elle change de schéma",
      "Elle stocke les données"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Pas directement.",
      "Oui. La vue est protégée contre les changements de structure. Obligatoire pour une vue indexée.",
      "Non.",
      "Non. Sauf si on lui ajoute un index cluster."
    ],
    retenir: "SCHEMABINDING = lien fort vue ↔ tables."
  },
  {
    id: "m10-q51", dialecte: "SQL Server",
    q: "Que faut-il pour transformer une vue en « vue indexée » (résultat stocké) sur SQL Server ?",
    choix: [
      "Rien de spécial",
      "WITH SCHEMABINDING, puis un index cluster UNIQUE sur la vue",
      "Un trigger",
      "Une table temporaire"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Le résultat est alors stocké et maintenu à chaque modification des tables (coût en écriture).",
      "Non.",
      "Non."
    ],
    retenir: "Vue indexée = SCHEMABINDING + index cluster unique."
  },
  {
    id: "m10-q52", dialecte: "Snowflake",
    q: "Sur Snowflake, qu'est-ce qu'une vue matérialisée ?",
    choix: [
      "Une vue normale",
      "Une vue dont le résultat est stocké et maintenu automatiquement (édition Enterprise, sur une seule table, avec un coût de maintenance)",
      "Une table temporaire",
      "Une copie manuelle"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Utile pour des agrégats très souvent lus. Pour des jointures complexes : table alimentée par un traitement.",
      "Non.",
      "Non."
    ],
    retenir: "Vue matérialisée Snowflake : rapide en lecture, coût de maintenance, limitée."
  },
  {
    id: "m10-q53", dialecte: "Snowflake",
    q: "Sur Snowflake, à quoi sert une SECURE VIEW ?",
    choix: [
      "À chiffrer les données",
      "À cacher la définition (le SQL) de la vue aux utilisateurs, notamment en partage de données",
      "À accélérer",
      "À empêcher la lecture"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Les utilisateurs voient le résultat, pas la logique ni les tables cachées derrière.",
      "Non. Elle peut même être un peu plus lente.",
      "Non."
    ],
    retenir: "SECURE VIEW = définition cachée."
  },
  {
    id: "m10-q54", dialecte: "SQL Server",
    q: "Une vue fait SELECT * FROM client. Tu ajoutes une colonne à client. La vue la montre-t-elle ?",
    choix: [
      "Oui, tout de suite",
      "Non : SQL Server garde la liste de colonnes de la création. Il faut sp_refreshview (ou recréer la vue)",
      "Erreur",
      "Seulement le lendemain"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Encore une raison de lister les colonnes dans une vue.",
      "Non.",
      "Non."
    ],
    retenir: "Vue avec * : colonnes figées à la création."
  },
  {
    id: "m10-q55", dialecte: "Standard",
    q: "Comment permettre aux utilisateurs RH de lire les salariés sans voir la colonne salaire ?",
    choix: [
      "Supprimer la colonne",
      "Créer une vue sans la colonne salaire et donner les droits sur la vue, pas sur la table",
      "Mettre salaire à NULL",
      "Chiffrer la table"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. La vue sert de « fenêtre » de sécurité.",
      "Non.",
      "Non. Trop lourd pour ce besoin."
    ],
    retenir: "Vue = contrôle de ce qui est visible."
  },
  {
    id: "m10-q56", dialecte: "SQL Server",
    q: "Une vue filtre WHERE pays = 'FR' et est créée WITH CHECK OPTION. Que se passe-t-il si on fait un UPDATE via la vue qui met pays = 'BE' ?",
    choix: ["La ligne disparaît de la vue", "Erreur : la modification ferait sortir la ligne de la vue", "Rien", "La vue est modifiée"],
    bonne: 1,
    pourquoi: [
      "Non. Ce serait le cas sans CHECK OPTION.",
      "Oui. CHECK OPTION interdit les modifications contraires au filtre de la vue.",
      "Non.",
      "Non."
    ],
    retenir: "WITH CHECK OPTION : on ne sort pas une ligne de la vue en la modifiant."
  },
  {
    id: "m10-q57", dialecte: "SQL Server",
    q: "La base est insensible à la casse, mais une colonne code doit distinguer 'a1' et 'A1'. Que faire ?",
    choixCode: true,
    choix: [
      "Changer la collation de toute la base",
      "code VARCHAR(20) COLLATE Latin1_General_CS_AS dans la définition de la colonne",
      "Mettre UPPER partout",
      "Impossible"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Trop lourd et risqué.",
      "Oui. La collation peut être définie colonne par colonne.",
      "Non. Ça ferait l'inverse : confondre.",
      "Non."
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
      "Non.",
      "Non."
    ],
    retenir: "Colonnes d'audit : DEFAULT SYSDATETIME() / SUSER_SNAME()."
  },
  {
    id: "m10-q59", dialecte: "SQL Server",
    q: "La colonne modifie_le a DEFAULT SYSDATETIME(). Est-elle mise à jour automatiquement lors d'un UPDATE ?",
    choix: [
      "Oui",
      "Non : DEFAULT ne s'applique qu'à l'INSERT. Pour l'UPDATE : l'application, un trigger, ou une table temporelle",
      "Oui, si la ligne change",
      "Seulement sur Snowflake"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Erreur fréquente.",
      "Oui. Pense-y dès la conception.",
      "Non.",
      "Non."
    ],
    retenir: "DEFAULT = à la création seulement."
  },
  {
    id: "m10-q60", dialecte: "Standard",
    q: "Clé naturelle (ex. SIRET) ou clé technique (id auto) comme clé primaire : quel est le principal avantage de la clé technique ?",
    choix: [
      "Elle a un sens métier",
      "Elle ne change jamais, elle est courte et uniforme, même si la donnée métier change ou est saisie en retard",
      "Elle est plus lisible",
      "Elle évite les contraintes"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Au contraire.",
      "Oui. Un SIRET peut changer, être faux, ou absent au début. Garde-le en UNIQUE à côté.",
      "Non.",
      "Non."
    ],
    retenir: "PK technique stable + UNIQUE sur la clé naturelle."
  },
  {
    id: "m10-q61", dialecte: "Standard",
    q: "Stocker les montants en centimes dans un entier (12,50 € → 1250) : quel avantage, quel risque ?",
    choix: [
      "Aucun avantage",
      "Calculs exacts et rapides ; mais risque d'erreur d'affichage ou de calcul si quelqu'un oublie de diviser par 100",
      "Ça interdit les négatifs",
      "Ça arrondit tout"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. DECIMAL est en général plus simple à comprendre pour tous. Documente le choix s'il est fait.",
      "Non.",
      "Non."
    ],
    retenir: "Centimes en entier : possible, mais DECIMAL est plus clair."
  },
  {
    id: "m10-q62", dialecte: "SQL Server",
    q: "Une vieille table stocke un booléen en CHAR(1) 'O' / 'N'. Comment le protéger ?",
    choixCode: true,
    choix: [
      "Rien",
      "CHECK (actif IN ('O', 'N')) et NOT NULL",
      "Un index",
      "UNIQUE (actif)"
    ],
    bonne: 1,
    pourquoi: [
      "Non. On finit par trouver 'o', 'Y', '1'…",
      "Oui. Seules les valeurs prévues entrent. (En neuf, préfère BIT.)",
      "Non.",
      "Non."
    ],
    retenir: "Codes à valeurs fixes : CHECK IN (…)."
  },
  {
    id: "m10-q63", dialecte: "Standard",
    q: "Dans un entrepôt de données, la clé de la dimension date est souvent un entier 20261026. Est-ce une bonne pratique ?",
    choix: [
      "Non, jamais",
      "Oui pour la clé de la table calendrier (lisible et compacte) ; mais les vraies dates restent en type DATE dans la dimension",
      "Oui, partout, même dans l'ERP",
      "Non, il faut du texte"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Dans une base de gestion (ERP), une date reste une DATE.",
      "Non.",
      "Non."
    ],
    retenir: "Clé date AAAAMMJJ : en entrepôt, pour la dimension calendrier."
  },
  {
    id: "m10-q64", dialecte: "Standard",
    q: "Une colonne contient des listes : 'A12;B45;C78'. Quel est le problème ?",
    choix: [
      "Aucun",
      "Impossible de joindre, filtrer, compter ou contrôler proprement. Il faut une table enfant (une ligne par valeur)",
      "C'est trop long",
      "Le ; est interdit"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. C'est contraire à la 1re forme normale : une valeur par case.",
      "Non.",
      "Non."
    ],
    retenir: "Une valeur par case. Liste = table enfant."
  },
  {
    id: "m10-q65", dialecte: "SQL Server",
    q: "Tu dois stocker du JSON dans SQL Server. Quelle approche ?",
    choixCode: true,
    choix: [
      "NVARCHAR(MAX) avec CHECK (ISJSON(doc) = 1), puis JSON_VALUE / OPENJSON pour lire",
      "INT",
      "VARCHAR(10)",
      "Un fichier à côté"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Le CHECK refuse le JSON mal formé. (Snowflake : type VARIANT.)",
      "Non.",
      "Non.",
      "Non."
    ],
    retenir: "JSON SQL Server : NVARCHAR(MAX) + ISJSON. Snowflake : VARIANT."
  },
  {
    id: "m10-q66", dialecte: "Snowflake",
    q: "Sur Snowflake, quel type stocke du JSON pour l'interroger directement ?",
    choixCode: true,
    choix: ["VARCHAR", "VARIANT", "BINARY", "TEXT"],
    bonne: 1,
    pourquoi: [
      "Non. Possible, mais il faudrait le convertir à chaque lecture.",
      "Oui. VARIANT (et ses cousins OBJECT, ARRAY) : on lit avec col:chemin::type.",
      "Non.",
      "Non."
    ],
    retenir: "Snowflake : JSON → VARIANT."
  },
  {
    id: "m10-q67", dialecte: "Snowflake",
    q: "Sur Snowflake, une colonne déclarée TIMESTAMP (sans précision) devient, par défaut…",
    choix: ["TIMESTAMP_TZ", "TIMESTAMP_NTZ", "TIMESTAMP_LTZ", "DATE"],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Par défaut (paramètre TIMESTAMP_TYPE_MAPPING). Sois explicite pour éviter les surprises.",
      "Non.",
      "Non."
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
      "Non.",
      "Non.",
      "Non."
    ],
    retenir: "DATA_RETENTION_TIME_IN_DAYS = durée de Time Travel."
  },
  {
    id: "m10-q69", dialecte: "Snowflake",
    q: "Sur Snowflake, que fait CLUSTER BY (date_cde) dans CREATE TABLE ?",
    choix: [
      "Crée un index",
      "Définit une clé de clustering : Snowflake réorganise les micro-partitions selon date_cde pour mieux filtrer (coût en crédits)",
      "Trie l'affichage",
      "Partitionne en plusieurs tables"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Pas d'index sur Snowflake.",
      "Oui. À réserver aux très grosses tables souvent filtrées sur cette colonne.",
      "Non.",
      "Non."
    ],
    retenir: "CLUSTER BY = meilleur pruning, pour les très grosses tables."
  },
  {
    id: "m10-q70", dialecte: "Snowflake",
    q: "Sur une table Snowflake standard, que donne CREATE INDEX ix ON commande (client_id) ?",
    choix: ["Un index est créé", "Erreur : Snowflake n'a pas d'index sur ses tables standard", "Un clustering est créé", "Rien, sans message"],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. L'optimisation passe par le pruning des micro-partitions et, si besoin, une clé de clustering.",
      "Non.",
      "Non."
    ],
    retenir: "Snowflake : pas de CREATE INDEX (tables standard)."
  },
  {
    id: "m10-q71", dialecte: "SQL Server",
    q: "À quoi sert le partitionnement d'une très grosse table sur SQL Server (ex. par mois) ?",
    choix: [
      "À créer plusieurs bases",
      "À gérer la table par morceaux : archiver ou supprimer un mois entier instantanément (SWITCH), maintenance par partie",
      "À remplacer les index",
      "À trier les requêtes"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Le gain principal est la gestion des données (archivage). Pour les performances, le bon index compte plus.",
      "Non.",
      "Non."
    ],
    retenir: "Partitionnement SQL Server : surtout pour gérer / archiver par tranche."
  },
  {
    id: "m10-q72", dialecte: "SQL Server",
    q: "Que peut apporter la compression PAGE sur une grosse table d'historique SQL Server ?",
    choix: [
      "Rien",
      "Moins d'espace disque et souvent moins de lectures, contre un peu plus de calcul processeur",
      "Des données perdues",
      "Une table en lecture seule"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Intéressant pour les tables volumineuses peu modifiées.",
      "Non. La compression est sans perte.",
      "Non."
    ],
    retenir: "Compression : moins de disque, un peu plus de CPU."
  },
  {
    id: "m10-q73", dialecte: "SQL Server",
    q: "Pour une table de chargement vidée et rechargée chaque nuit, une table sans index cluster (heap) est-elle acceptable ?",
    choix: [
      "Non, jamais",
      "Oui : chargement en masse rapide. On peut ajouter des index après le chargement si nécessaire",
      "Oui, mais seulement le week-end",
      "Non, c'est interdit"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Pour les tables « permanentes » souvent lues et modifiées, un index cluster reste conseillé.",
      "Non.",
      "Non."
    ],
    retenir: "Heap : correct pour du chargement temporaire."
  },
  {
    id: "m10-q74", dialecte: "Standard",
    q: "Quel type pour un numéro de téléphone (+33 4 78 12 34 56) ?",
    choix: ["INT", "BIGINT", "VARCHAR(20)", "DECIMAL"],
    bonne: 2,
    pourquoi: [
      "Non. Trop petit, et le + et le 0 de tête sont perdus.",
      "Non. Le 0 de tête et le + sont perdus.",
      "Oui. Ce n'est pas un nombre : on ne calcule jamais dessus.",
      "Non."
    ],
    retenir: "Si on ne calcule pas dessus, ce n'est pas un nombre."
  },
  {
    id: "m10-q75", dialecte: "Standard",
    q: "Quel type pour un code postal de clients internationaux ?",
    choix: ["INT", "CHAR(5)", "VARCHAR(10)", "DECIMAL(5,0)"],
    bonne: 2,
    pourquoi: [
      "Non. Zéros perdus, et des codes contiennent des lettres (UK, Canada, Corse).",
      "Non. Trop strict : formats étrangers différents.",
      "Oui. Texte, longueur variable.",
      "Non."
    ],
    retenir: "Codes postaux : texte, longueur variable."
  },
  {
    id: "m10-q76", dialecte: "Standard",
    q: "Les prix unitaires d'achat ont jusqu'à 4 décimales (ex. 0,0375 € la vis). Quel type ?",
    choix: ["DECIMAL(18,2)", "DECIMAL(19,4)", "INT", "FLOAT"],
    bonne: 1,
    pourquoi: [
      "Non. 0,0375 deviendrait 0,04 : erreur sur 10 000 vis.",
      "Oui. Prix unitaires précis ; les montants totaux peuvent rester en 2 décimales.",
      "Non.",
      "Non."
    ],
    retenir: "Prix unitaires fins : plus de décimales que les montants."
  },
  {
    id: "m10-q77", dialecte: "Standard",
    q: "Tu stockes un taux de remise. 20 % : 20 ou 0,20 ?",
    choix: [
      "Peu importe",
      "Choisir UNE convention, la documenter, et adapter le type (DECIMAL(5,2) pour 20,00 ; DECIMAL(5,4) pour 0,2000)",
      "Toujours 20",
      "Toujours du texte '20%'"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Mélanger les deux crée des erreurs × 100.",
      "Oui. L'important : une seule convention partout.",
      "Non.",
      "Non."
    ],
    retenir: "Pourcentages : une convention unique et documentée."
  },
  {
    id: "m10-q78", dialecte: "Standard",
    q: "Pourquoi les tables de chargement (stg) ont-elles souvent toutes leurs colonnes en VARCHAR ?",
    choix: [
      "Par paresse",
      "Pour accepter toutes les lignes du fichier, même invalides, puis les contrôler et les convertir avant la table cible",
      "Pour gagner de la place",
      "C'est obligatoire"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Une date mal formée ne fait pas échouer tout le chargement : elle est repérée et rejetée proprement.",
      "Non.",
      "Non."
    ],
    retenir: "stg en texte → contrôle → conversion → cible typée."
  },
  {
    id: "m10-q79", dialecte: "SQL Server",
    q: "Comment supprimer une table seulement si elle existe (script relançable) ?",
    choixCode: true,
    choix: ["DROP TABLE IF EXISTS stg.tmp_import;", "DROP TABLE stg.tmp_import FORCE;", "DELETE TABLE stg.tmp_import;", "TRUNCATE IF EXISTS"],
    bonne: 0,
    pourquoi: [
      "Oui. SQL Server 2016+ et Snowflake.",
      "Non.",
      "Non.",
      "Non."
    ],
    retenir: "DROP TABLE IF EXISTS."
  },
  {
    id: "m10-q80", dialecte: "SQL Server",
    q: "CREATE OR ALTER existe pour les vues et procédures. Et pour les tables ?",
    choix: [
      "CREATE OR ALTER TABLE existe",
      "Non : pour une table, on teste son existence (IF OBJECT_ID(…) IS NULL) ou on utilise ALTER TABLE pour la faire évoluer",
      "Oui depuis 2016",
      "Oui avec FORCE"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Une table contient des données : on ne la « remplace » pas.",
      "Non.",
      "Non."
    ],
    retenir: "Table : pas de CREATE OR ALTER. Évolution par ALTER TABLE."
  },
  {
    id: "m10-q81", dialecte: "SQL Server",
    q: "Comment ajouter une colonne seulement si elle n'existe pas encore (script relançable) ?",
    choixCode: true,
    choix: [
      "IF COL_LENGTH('dbo.facture', 'devise') IS NULL ALTER TABLE dbo.facture ADD devise CHAR(3) NULL;",
      "ALTER TABLE dbo.facture ADD IF NOT EXISTS devise CHAR(3);",
      "ALTER TABLE dbo.facture ADD devise CHAR(3) FORCE;",
      "Impossible"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. COL_LENGTH renvoie NULL si la colonne n'existe pas.",
      "Non. Pas sur SQL Server.",
      "Non.",
      "Non."
    ],
    retenir: "Script de déploiement relançable : tester avant d'ajouter."
  },
  {
    id: "m10-q82", dialecte: "SQL Server + Snowflake",
    q: "Comment renommer une table ?",
    choix: [
      "sp_rename 'dbo.ancien', 'nouveau' sur SQL Server ; ALTER TABLE ancien RENAME TO nouveau sur Snowflake",
      "UPDATE TABLE … SET NAME",
      "COPY puis DROP obligatoire",
      "Impossible"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Vérifie toujours les dépendances (vues, procédures, flux ETL, rapports).",
      "Non.",
      "Non.",
      "Non."
    ],
    retenir: "Renommer = casser les dépendances. Vérifier avant."
  },
  {
    id: "m10-q83", dialecte: "SQL Server",
    q: "Avant de supprimer ou renommer une table, comment savoir quels objets l'utilisent ?",
    choix: [
      "Impossible",
      "Afficher les dépendances (SSMS), ou interroger sys.sql_expression_dependencies ; et penser aux flux et rapports externes",
      "Supprimer et attendre les plaintes",
      "Regarder le nom"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Les outils externes (ETL, Power BI, ERP) ne sont pas visibles dans la base : demande aux équipes.",
      "Non.",
      "Non."
    ],
    retenir: "Analyse d'impact avant toute modification de structure."
  },
  {
    id: "m10-q84", dialecte: "Standard",
    q: "Quelle règle de nommage des tables et colonnes est la plus sûre ?",
    choix: [
      "Avec espaces et accents (« Date de création »)",
      "Sans espaces ni accents, en minuscules ou PascalCase, de façon cohérente (date_creation)",
      "Des noms courts (dc)",
      "Chacun son style"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Il faudrait des crochets ou guillemets partout.",
      "Oui. Lisible, portable (SQL Server, Snowflake, outils), sans pièges.",
      "Non. Illisible.",
      "Non."
    ],
    retenir: "Noms : sans espace, sans accent, cohérents."
  },
  {
    id: "m10-q85", dialecte: "SQL Server + Snowflake",
    q: "Comment documenter le sens d'une colonne directement dans la base ?",
    choix: [
      "Impossible",
      "Snowflake : COMMENT ON COLUMN t.col IS '…' ; SQL Server : propriété étendue MS_Description (sp_addextendedproperty)",
      "Dans le nom de la colonne",
      "Dans une colonne en plus"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Les outils de documentation et certains outils BI lisent ces descriptions.",
      "Non.",
      "Non."
    ],
    retenir: "Dictionnaire de données : commentaires en base."
  },
  {
    id: "m10-q86", dialecte: "SQL Server",
    q: "Peut-on créer une clé étrangère entre la table client de la base SOC1 et la table commande de la base SOC2 ?",
    choix: ["Oui", "Non : SQL Server n'accepte pas les clés étrangères entre bases. Contrôle par traitement ou trigger", "Oui avec un synonyme", "Oui avec une vue"],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Fréquent avec les ERP « multi-dossiers » : l'intégrité doit être vérifiée autrement.",
      "Non.",
      "Non."
    ],
    retenir: "Pas de FK entre bases différentes (SQL Server)."
  },
  {
    id: "m10-q87", dialecte: "Standard",
    q: "Un CHECK peut-il vérifier une valeur dans une AUTRE table (ex. que le client est actif) ?",
    choix: [
      "Oui, directement",
      "Non : un CHECK ne voit que les colonnes de la ligne. Pour une autre table : clé étrangère, trigger ou contrôle applicatif",
      "Oui avec JOIN",
      "Oui sur Snowflake"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. (Une fonction dans un CHECK le permet techniquement, mais c'est fragile et lent.)",
      "Non.",
      "Non."
    ],
    retenir: "CHECK = règles sur la ligne elle-même."
  },
  {
    id: "m10-q88", dialecte: "SQL Server",
    q: "Pour accélérer un très gros chargement, on désactive les contraintes (NOCHECK CONSTRAINT ALL). Que faut-il faire après ?",
    choix: [
      "Rien",
      "Les réactiver AVEC vérification (WITH CHECK CHECK CONSTRAINT ALL) pour contrôler les données chargées et garder des contraintes fiables",
      "Les supprimer",
      "Redémarrer le serveur"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Les données ne sont plus protégées.",
      "Oui. Si des lignes sont invalides, la réactivation échoue : tu sais qu'il faut corriger.",
      "Non.",
      "Non."
    ],
    retenir: "Contraintes désactivées = à réactiver WITH CHECK."
  },
  {
    id: "m10-q89", dialecte: "SQL Server",
    q: "Contrainte UNIQUE ou index UNIQUE : quelle différence en pratique ?",
    choix: [
      "La contrainte ne bloque pas les doublons",
      "Les deux bloquent les doublons (la contrainte crée un index). La contrainte exprime une règle métier ; l'index permet des options (filtre, INCLUDE)",
      "L'index est plus lent",
      "Aucune utilité"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Règle métier → contrainte. Besoin d'un filtre → index unique filtré.",
      "Non.",
      "Non."
    ],
    retenir: "UNIQUE : contrainte (règle) ou index (options)."
  },
  {
    id: "m10-q90", dialecte: "SQL Server",
    q: "ALTER TABLE t ADD CONSTRAINT pk_t PRIMARY KEY (code) échoue : « nullable column ». Pourquoi ?",
    choix: [
      "La table est vide",
      "La colonne code accepte NULL : il faut d'abord la passer en NOT NULL",
      "La table a déjà une FK",
      "code est un texte"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. ALTER TABLE t ALTER COLUMN code VARCHAR(20) NOT NULL; puis la PK.",
      "Non.",
      "Non. Une PK peut être un texte."
    ],
    retenir: "Clé primaire = colonnes NOT NULL."
  },
  {
    id: "m10-q91", dialecte: "Standard",
    q: "Quel est le risque d'une table sans clé primaire ?",
    choix: [
      "Aucun",
      "Doublons possibles, impossible de cibler une ligne précise pour la corriger, problèmes avec les outils de réplication et de synchronisation",
      "Elle est en lecture seule",
      "Elle est plus rapide, donc mieux"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Toute table « métier » doit avoir une clé.",
      "Non.",
      "Non."
    ],
    retenir: "Table métier = une clé primaire."
  },
  {
    id: "m10-q92", dialecte: "Standard",
    q: "Que fait ON DELETE SET NULL sur la FK commande.commercial_id ?",
    choix: [
      "Supprime les commandes du commercial",
      "Si le commercial est supprimé, ses commandes gardent leur place mais commercial_id devient NULL",
      "Empêche la suppression",
      "Rien"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Ce serait CASCADE.",
      "Oui. La colonne doit accepter NULL.",
      "Non. C'est le comportement par défaut (NO ACTION).",
      "Non."
    ],
    retenir: "ON DELETE : NO ACTION (défaut), CASCADE, SET NULL."
  },
  {
    id: "m10-q93", dialecte: "Standard",
    q: "Comment modéliser « chaque salarié a un manager, qui est lui-même un salarié » ?",
    choixCode: true,
    choix: [
      "Une table manager séparée, copie de salarie",
      "Une colonne manager_id dans salarie, avec une FK vers salarie(id)",
      "Une colonne texte nom_manager",
      "Impossible"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Duplication des personnes.",
      "Oui. Clé étrangère vers la même table (auto-référence). NULL pour le sommet.",
      "Non. Pas de contrôle, homonymes.",
      "Non."
    ],
    retenir: "Hiérarchie : FK vers la même table."
  },
  {
    id: "m10-q94", dialecte: "SQL Server",
    q: "Deux tables se référencent mutuellement (A → B et B → A, colonnes NOT NULL). Comment insérer les premières lignes sur SQL Server ?",
    choix: [
      "Contraintes « différées » jusqu'au COMMIT",
      "SQL Server n'a pas de contraintes différées : rendre une des colonnes NULLable, insérer, puis mettre à jour. Ou revoir le modèle",
      "Insérer les deux en même temps",
      "Impossible, il faut supprimer les FK"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Ça existe dans d'autres bases (PostgreSQL), pas sur SQL Server.",
      "Oui. Une dépendance circulaire est souvent le signe d'un modèle à simplifier.",
      "Non.",
      "Non."
    ],
    retenir: "Références circulaires : à éviter ; sinon NULL temporaire."
  },
  {
    id: "m10-q95", dialecte: "SQL Server",
    q: "Qu'apporte une table temporelle (SYSTEM_VERSIONING = ON) sur SQL Server ?",
    choix: [
      "Une table temporaire",
      "SQL Server garde automatiquement l'historique de chaque modification dans une table d'historique, interrogeable avec FOR SYSTEM_TIME AS OF",
      "Un tri par date",
      "Une suppression automatique"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Rien à voir avec #table.",
      "Oui. Idéal pour l'audit : « que valait ce tarif le 1er mars ? ».",
      "Non.",
      "Non."
    ],
    retenir: "Table temporelle = historique automatique."
  },
  {
    id: "m10-q96", dialecte: "Snowflake",
    q: "Sur Snowflake, peut-on changer une colonne VARCHAR en NUMBER avec ALTER TABLE … ALTER COLUMN … SET DATA TYPE ?",
    choix: [
      "Oui, toujours",
      "Non : Snowflake permet surtout d'agrandir (VARCHAR plus long, plus de précision). Pour changer de type : nouvelle colonne, conversion, puis échange",
      "Oui, si la table est vide",
      "Oui avec FORCE"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Prévoir les types dès la conception évite ces migrations.",
      "Non. Toujours limité.",
      "Non."
    ],
    retenir: "Snowflake : changements de type limités. Bien typer dès le départ."
  },
  {
    id: "m10-q97", dialecte: "SQL Server",
    q: "Une colonne de type TEXT ou NTEXT apparaît dans une vieille base. Que faire ?",
    choix: [
      "Rien",
      "Ces types sont obsolètes : migrer vers VARCHAR(MAX) / NVARCHAR(MAX)",
      "Les transformer en INT",
      "Les supprimer"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Beaucoup de fonctions texte ne marchent pas dessus.",
      "Oui. Même chose pour IMAGE → VARBINARY(MAX).",
      "Non.",
      "Non."
    ],
    retenir: "TEXT / NTEXT / IMAGE : obsolètes → (N)VARCHAR(MAX) / VARBINARY(MAX)."
  },
  {
    id: "m10-q98", dialecte: "Standard",
    q: "Pourquoi est-il préférable de typer correctement dès la création, plutôt que « tout en VARCHAR, on verra » ?",
    choix: [
      "Pour la beauté",
      "Contrôle automatique des données, tris et calculs justes, meilleures performances ; changer un type plus tard coûte cher",
      "Ce n'est pas préférable",
      "Pour économiser des lignes"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Le type est la première règle de qualité.",
      "Non.",
      "Non."
    ],
    retenir: "Le bon type dès le départ."
  },
  {
    id: "m10-q99", dialecte: "Standard",
    q: "Une table client a 120 colonnes, dont 40 « adresse_livraison_2 », « adresse_livraison_3 »… Quel problème de conception ?",
    choix: [
      "Aucun",
      "Des groupes de colonnes répétés : il faut une table adresse séparée (une ligne par adresse)",
      "Trop peu de colonnes",
      "Il faut plus d'index"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Le nombre d'adresses devient illimité, et les requêtes restent simples.",
      "Non.",
      "Non."
    ],
    retenir: "Colonnes numérotées (x_1, x_2…) = table enfant manquante."
  },
  {
    id: "m10-q100", dialecte: "Standard",
    q: "Quelle liste décrit une table bien conçue ?",
    choix: [
      "Beaucoup de colonnes VARCHAR(MAX)",
      "Types justes, NOT NULL quand c'est obligatoire, clé primaire, UNIQUE sur la clé métier, FK, CHECK, DEFAULT, noms clairs",
      "Aucune contrainte pour aller plus vite",
      "Une seule colonne JSON"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. La base protège elle-même la qualité des données.",
      "Non.",
      "Non."
    ],
    retenir: "Une bonne table se défend toute seule."
  }
];
