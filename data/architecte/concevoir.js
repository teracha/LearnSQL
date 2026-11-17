// Conseils d'architecte, famille « Concevoir » (format : docs/architecte.md).
LEARNSQL.architecte = (LEARNSQL.architecte || []).concat([
  {
    id: "creer-table",
    titre: "Je crée une table",
    famille: "Concevoir",
    resume: "Les questions à te poser avant d'écrire `CREATE TABLE` : ce que contient une ligne, la clé, les types, les règles, les noms, qui lit et qui écrit.",
    besoins: [
      "je crée une table",
      "créer une nouvelle table dans la base",
      "comment bien concevoir une table",
      "les questions à se poser avant un create table"
    ],
    essais: [
      "je dois faire une table pour stocker les commandes edi",
      "bonne pratique creation table sql",
      "modéliser une table proprement"
    ],
    exemple: {
      texte: "Tu dois garder les commandes EDI reçues (messages ORDERS) avant de les intégrer dans Divalto. Avant d'écrire `CREATE TABLE`, tu réponds aux questions ci-dessous. Voici la table qu'on obtient à la fin.",
      code: "CREATE TABLE edi.commande_edi (\n  id            INT IDENTITY(1,1) NOT NULL,     -- numéro technique\n  partenaire    VARCHAR(40)   NOT NULL,         -- qui envoie le message\n  num_cde       VARCHAR(35)   NOT NULL,         -- numéro du client : 35 caractères au plus en EDIFACT\n  date_cde      DATE          NOT NULL,\n  montant_ht    DECIMAL(12,2) NOT NULL,\n  statut        VARCHAR(10)   NOT NULL CONSTRAINT df_commande_edi_statut DEFAULT 'RECU',\n  fichier       VARCHAR(255)  NOT NULL,         -- le fichier d'où vient la ligne\n  date_creation DATETIME2(0)  NOT NULL CONSTRAINT df_commande_edi_creation DEFAULT SYSDATETIME(),\n  CONSTRAINT pk_commande_edi PRIMARY KEY (id),\n  CONSTRAINT uq_commande_edi UNIQUE (partenaire, num_cde),\n  CONSTRAINT ck_commande_edi_statut CHECK (statut IN ('RECU', 'INTEGRE', 'REJET'))\n);",
      codes: {
        snowflake: "CREATE TABLE edi.commande_edi (\n  id            NUMBER(38,0)  IDENTITY,         -- numéro technique\n  partenaire    VARCHAR(40)   NOT NULL,\n  num_cde       VARCHAR(35)   NOT NULL,\n  date_cde      DATE          NOT NULL,\n  montant_ht    NUMBER(12,2)  NOT NULL,\n  statut        VARCHAR(10)   NOT NULL DEFAULT 'RECU',\n  fichier       VARCHAR(255)  NOT NULL,\n  date_creation TIMESTAMP_NTZ NOT NULL DEFAULT CURRENT_TIMESTAMP(),\n  CONSTRAINT pk_commande_edi PRIMARY KEY (id),             -- notée, pas appliquée\n  CONSTRAINT uq_commande_edi UNIQUE (partenaire, num_cde)  -- notée, pas appliquée\n);\n-- Pas de CHECK : la table est chargée par COPY INTO (voir l'étape « Les règles »).",
        mysql: "CREATE TABLE commande_edi (\n  id            INT           NOT NULL AUTO_INCREMENT,\n  partenaire    VARCHAR(40)   NOT NULL,\n  num_cde       VARCHAR(35)   NOT NULL,\n  date_cde      DATE          NOT NULL,\n  montant_ht    DECIMAL(12,2) NOT NULL,\n  statut        VARCHAR(10)   NOT NULL DEFAULT 'RECU',\n  fichier       VARCHAR(255)  NOT NULL,\n  date_creation DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,\n  CONSTRAINT pk_commande_edi PRIMARY KEY (id),\n  CONSTRAINT uq_commande_edi UNIQUE (partenaire, num_cde),\n  CONSTRAINT ck_commande_edi_statut CHECK (statut IN ('RECU', 'INTEGRE', 'REJET'))\n) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;"
      }
    },
    etapes: [
      {
        titre: "Le besoin",
        questions: [
          {
            id: "grain",
            q: "Que représente UNE ligne de la table ?",
            pourquoi: "Si ce n'est pas clair, on mélange deux niveaux, par exemple une commande et ses lignes. Les totaux comptent alors en double.",
            reflexe: "Écris-le en une phrase : « une ligne = une commande EDI reçue ». Si ta phrase contient « et », c'est souvent deux tables."
          },
          {
            id: "existe-deja",
            q: "Cette donnée existe-t-elle déjà ailleurs ?",
            pourquoi: "Une copie finit par s'écarter de l'original. Tu auras deux chiffres pour la même chose, et personne ne saura lequel est juste.",
            reflexe: "Cherche d'abord dans l'ERP, l'entrepôt de données et les vues. Si la donnée existe, lis-la à sa source (vue, jointure) au lieu de la recopier."
          },
          {
            id: "qui-ecrit-lit",
            q: "Qui écrit dans la table, et qui la lit ?",
            pourquoi: "Un flux automatique, une saisie à la main et un rapport n'ont pas les mêmes besoins : contrôles, droits, index.",
            reflexe: "Note qui écrit (le flux EDI, un job, une personne) et qui lit (Power BI, l'ERP, un export). Ces deux listes guident les droits et les index."
          },
          {
            id: "volume",
            q: "Combien de lignes aujourd'hui, et dans 3 ans ?",
            pourquoi: "Une table de 1 000 lignes et une table de 50 millions ne se conçoivent pas pareil : index, purge, découpage.",
            reflexe: "Calcule : lignes par jour × jours de conservation. Exemple : 300 commandes EDI par jour pendant 5 ans, environ 550 000 lignes."
          },
          {
            id: "conservation",
            q: "Combien de temps faut-il garder les lignes ?",
            pourquoi: "Sans règle, la table grossit sans fin. Et les données personnelles ont une durée de conservation limitée (RGPD).",
            reflexe: "Fixe la durée avec le métier et la comptabilité. Prévois la purge dès la création, pas le jour où la table devient trop grosse."
          }
        ]
      },
      {
        titre: "La clé",
        questions: [
          {
            id: "unicite",
            q: "Quelles colonnes rendent une ligne unique ?",
            pourquoi: "Sans clé, rien n'empêche les doublons. Le même message EDI chargé deux fois donne deux commandes, et deux livraisons.",
            reflexe: "Cherche la clé métier : ici, le partenaire et son numéro de commande. Protège-la par une contrainte `UNIQUE`.",
            moteurs: {
              snowflake: "Sur une table standard, `UNIQUE` est notée, pas appliquée : Snowflake accepte les doublons. Contrôle-les après chaque chargement : `GROUP BY partenaire, num_cde HAVING COUNT(*) > 1`."
            }
          },
          {
            id: "cle-primaire",
            q: "Clé métier ou numéro technique pour la clé primaire ?",
            pourquoi: "Une clé métier peut changer, ou être longue. Un numéro technique est court et ne change jamais : il est idéal pour les jointures.",
            reflexe: "Le plus souvent : un numéro technique en `PRIMARY KEY`, et la clé métier en `UNIQUE`. Les deux ensemble, pas l'un ou l'autre.",
            moteurs: {
              sqlserver: "La `PRIMARY KEY` crée par défaut l'index cluster, c'est-à-dire l'ordre de rangement des lignes. Une clé courte et croissante (`IDENTITY`) lui convient bien.",
              snowflake: "Sur une table standard, `PRIMARY KEY` est notée, pas appliquée. Elle reste utile : elle documente la clé.",
              mysql: "InnoDB range les lignes dans l'ordre de la clé primaire, et la recopie dans chaque autre index. Choisis-la courte."
            }
          },
          {
            id: "taille-numero",
            q: "Le numéro technique aura-t-il assez de place ?",
            pourquoi: "Un `INT` s'arrête à 2 147 483 647. Une table de mouvements ou de journaux peut l'atteindre : les insertions plantent alors.",
            reflexe: "`INT` pour la plupart des tables. `BIGINT` pour celles qui reçoivent des millions de lignes par jour.",
            moteurs: {
              snowflake: "Pas ce souci : `INT` est un autre nom de `NUMBER(38,0)`, qui va bien plus loin."
            }
          }
        ]
      },
      {
        titre: "Les colonnes",
        questions: [
          {
            id: "types",
            q: "Quel type pour chaque colonne ?",
            pourquoi: "Un mauvais type se paie longtemps : des dates rangées en texte se trient mal, un montant en `FLOAT` donne des erreurs d'arrondi.",
            reflexe: "Dates en `DATE` (ou date et heure), montants en `DECIMAL`, quantités en entier ou en `DECIMAL`, codes en `VARCHAR`. Le détail : « Je choisis le type de chaque colonne »."
          },
          {
            id: "codes-texte",
            q: "Un code avec des zéros devant : texte ou nombre ?",
            pourquoi: "En nombre, le code postal 01200 devient 1200 : le zéro est perdu pour de bon. Même risque pour un code article ou un EAN.",
            reflexe: "Un code qu'on ne calcule jamais est un texte. Règle simple : si tu ne fais jamais de somme dessus, c'est un `VARCHAR`."
          },
          {
            id: "longueur",
            q: "Quelle longueur pour chaque texte ?",
            pourquoi: "Trop courte : l'insertion plante (« String or binary data would be truncated »). Trop longue : la colonne ne contrôle plus rien.",
            reflexe: "Prends la longueur de la source, avec un peu de marge : la norme EDI, le champ de Divalto. Exemple : un numéro de document EDIFACT fait 35 caractères au plus.",
            moteurs: {
              sqlserver: "Évite `VARCHAR(MAX)` pour un code : une telle colonne ne peut pas être la clé d'un index.",
              snowflake: "La longueur ne change ni la place prise ni la vitesse. Mets quand même la vraie longueur : c'est un contrôle de plus."
            }
          },
          {
            id: "unicode",
            q: "Le texte peut-il contenir des accents ou des caractères étrangers ?",
            pourquoi: "Si le type ou le jeu de caractères ne connaît pas un caractère, il devient « ? » à l'enregistrement. Le nom du client est abîmé pour de bon.",
            reflexe: "Noms et adresses de clients étrangers : un type Unicode. Codes internes sans accent : un texte simple suffit.",
            moteurs: {
              sqlserver: "`NVARCHAR`, ou `VARCHAR` avec une collation (la règle des textes) UTF-8 (`_UTF8`, depuis SQL Server 2019). Écris les textes Unicode avec N devant : `N'Łódź'`.",
              snowflake: "Pas ce souci : tout texte est en UTF-8. `NVARCHAR` est un autre nom de `VARCHAR`.",
              mysql: "Le jeu de caractères `utf8mb4` (celui par défaut de MySQL 8) garde tous les caractères, même les émojis."
            }
          },
          {
            id: "null",
            q: "Chaque colonne peut-elle rester vide (NULL) ?",
            pourquoi: "Une colonne qui accepte NULL laisse entrer des lignes incomplètes. Et NULL piège les calculs : 10 + NULL donne NULL.",
            reflexe: "`NOT NULL` partout où la valeur est obligatoire. Laisse NULL seulement quand « pas encore connu » a un sens : une date de livraison à venir."
          },
          {
            id: "defaut",
            q: "Une valeur par défaut a-t-elle un sens ?",
            pourquoi: "Sans valeur par défaut, chaque programme qui insère doit penser à la colonne. Un oubli donne NULL, ou une erreur.",
            reflexe: "`DEFAULT` pour ce que le système remplit seul : le statut de départ ('RECU'), la date de création. Jamais pour une donnée métier qu'il faut vraiment saisir."
          }
        ]
      },
      {
        titre: "Les règles",
        questions: [
          {
            id: "valeurs-permises",
            q: "Quelles valeurs sont permises dans chaque colonne ?",
            pourquoi: "Sans contrôle, chacun écrit le statut à sa façon : 'RECU', 'RECEPTION', 'OK'. Les filtres et les totaux par statut deviennent faux.",
            reflexe: "Une contrainte `CHECK` pour une liste courte et stable : `statut IN ('RECU', 'INTEGRE', 'REJET')`. Une table de référence, avec une clé étrangère, si la liste change souvent.",
            moteurs: {
              snowflake: "Snowflake applique `CHECK` depuis avril 2026. Mais pour l'instant, `COPY INTO` et Snowpipe échouent sur une table qui a un `CHECK` : pas de `CHECK` sur une table chargée par fichiers.",
              mysql: "MySQL applique `CHECK` depuis la version 8.0.16. Avant, il l'acceptait sans rien contrôler."
            }
          },
          {
            id: "cle-etrangere",
            q: "La table pointe-t-elle vers une autre table (client, article) ?",
            pourquoi: "Sans clé étrangère, une ligne peut pointer vers un client qui n'existe pas. Une jointure la perd ensuite sans prévenir.",
            reflexe: "Ajoute une `FOREIGN KEY` vers la table de référence, et un index sur sa colonne pour les jointures. Le détail : « Je relie deux tables ».",
            moteurs: {
              sqlserver: "SQL Server ne crée pas d'index sur une clé étrangère : crée-le toi-même.",
              snowflake: "Sur une table standard, `FOREIGN KEY` est notée, pas appliquée. Cherche les lignes orphelines avec un `LEFT JOIN … WHERE … IS NULL`.",
              mysql: "InnoDB applique la clé étrangère, et crée l'index s'il manque."
            }
          },
          {
            id: "noms-contraintes",
            q: "As-tu donné un nom à chaque contrainte ?",
            pourquoi: "Sans nom, le moteur en invente un, comme PK__commande__3213E83F… Il change d'une base à l'autre, et les scripts de mise à jour cassent.",
            reflexe: "Nomme chaque contrainte : `pk_commande_edi`, `uq_commande_edi`, `ck_commande_edi_statut`, `fk_commande_edi_client`.",
            moteurs: {
              sqlserver: "Nomme aussi les valeurs par défaut : `CONSTRAINT df_commande_edi_statut DEFAULT 'RECU'`.",
              mysql: "La clé primaire s'appelle toujours PRIMARY : le nom que tu lui donnes est ignoré."
            }
          }
        ]
      },
      {
        titre: "Le nom et la description",
        questions: [
          {
            id: "noms",
            q: "Les noms de la table et des colonnes sont-ils clairs et libres ?",
            pourquoi: "Un nom réservé (ORDER, DATE, USER) oblige à l'entourer dans chaque requête. Un nom flou (data, info2) ne dit rien à celui qui arrive.",
            reflexe: "Minuscules, mots séparés par _, sans accent ni espace : `date_cde`, `num_cde`. Vérifie chaque nom dans l'outil « Mots réservés »."
          },
          {
            id: "schema",
            q: "Dans quel schéma ranger la table ?",
            pourquoi: "Tout dans le même schéma (dbo, PUBLIC), c'est un tiroir fourre-tout. On ne sait plus à quoi sert une table, ni qui y a droit.",
            reflexe: "Range par usage : `edi` pour les flux, `stg` pour les imports bruts, `rpt` pour les rapports. Les droits se donnent alors par schéma.",
            moteurs: {
              mysql: "Pas de schéma dans une base : sur MySQL, un schéma est une base. Range alors par base, ou par préfixe (`edi_commande`)."
            }
          },
          {
            id: "description",
            q: "Qui saura à quoi sert la table dans 2 ans ?",
            pourquoi: "Une table sans description devient une table que personne n'ose modifier ni supprimer.",
            reflexe: "Écris une description de la table et des colonnes importantes, dans la base elle-même.",
            moteurs: {
              sqlserver: "Avec une propriété étendue nommée `MS_Description` (procédure `sp_addextendedproperty`).",
              snowflake: "Avec `COMMENT = '…'` dans le `CREATE TABLE`, ou `COMMENT ON TABLE … IS '…'`.",
              mysql: "Avec `COMMENT '…'` après une colonne, et `COMMENT = '…'` à la fin du `CREATE TABLE`."
            }
          }
        ]
      },
      {
        titre: "La trace",
        questions: [
          {
            id: "audit",
            q: "Faut-il savoir quand, et d'où, chaque ligne est arrivée ?",
            pourquoi: "Quand un chiffre est faux, la première question est : depuis quand, et d'où vient cette ligne ?",
            reflexe: "Ajoute `date_creation` (avec `DEFAULT`) et, pour un import, le nom du fichier source. Si les lignes changent : `date_modif` et `modifie_par`."
          },
          {
            id: "historique",
            q: "Faut-il garder les anciennes valeurs ?",
            pourquoi: "Un `UPDATE` écrase l'ancienne valeur. Sans historique, impossible de dire quel était le prix au 1er mars.",
            reflexe: "Si le métier en a besoin, prévois l'historique dès la création : une table d'historique, ou une table temporelle (SQL Server).",
            moteurs: {
              snowflake: "Time Travel n'est pas un historique métier : il garde 1 jour par défaut, 90 jours au plus (édition Enterprise)."
            }
          }
        ]
      },
      {
        titre: "L'usage",
        questions: [
          {
            id: "requetes",
            q: "Quelles requêtes vont lire la table le plus souvent ?",
            pourquoi: "Un index se choisit pour des requêtes, pas pour une table. Sans le bon index, une grosse table est lue en entier à chaque recherche.",
            reflexe: "Liste les 3 recherches les plus fréquentes (par `num_cde`, par date). Crée les index pour elles, pas plus : chaque index ralentit les écritures.",
            moteurs: {
              snowflake: "Les lignes sont rangées en micro-partitions (des blocs), sans index par défaut. Très grosse table : une clé de clustering (l'ordre de rangement choisi). Recherches très sélectives : Search Optimization, ou un index secondaire (Enterprise, depuis le 26/10/2026).",
              mysql: "La clé primaire est déjà l'index de rangement (InnoDB). Les autres index s'ajoutent comme sur SQL Server."
            }
          },
          {
            id: "droits",
            q: "Qui a le droit de lire, et qui a le droit d'écrire ?",
            pourquoi: "Avec des droits trop larges, un rapport peut modifier des données. Trop serrés, le flux de nuit plante.",
            reflexe: "Donne les droits à un rôle, jamais à une personne. Lecture seule pour les rapports ; écriture pour le seul compte du flux."
          },
          {
            id: "script",
            q: "Le script de création est-il enregistré, et peut-on le rejouer ?",
            pourquoi: "Une table créée à la main en production n'existe nulle part ailleurs. Impossible de la recréer à l'identique en recette.",
            reflexe: "Garde le script dans un dépôt (Git) ou un dossier partagé. Écris-le pour qu'il puisse tourner deux fois sans dégât.",
            moteurs: {
              sqlserver: "Crée seulement si la table manque : `IF OBJECT_ID(N'edi.commande_edi', N'U') IS NULL CREATE TABLE …`",
              snowflake: "`CREATE TABLE IF NOT EXISTS`. Jamais `CREATE OR REPLACE TABLE` dans un script rejoué : la table est recréée vide.",
              mysql: "`CREATE TABLE IF NOT EXISTS`."
            }
          },
          {
            id: "essai",
            q: "As-tu essayé la table avec de vraies données ?",
            pourquoi: "Un vrai fichier a toujours une surprise : un numéro plus long que prévu, un accent, une date vide.",
            reflexe: "Charge un vrai échantillon en recette. Regarde les rejets, les doublons et les textes coupés avant d'aller en production."
          }
        ]
      }
    ],
    pieges: [
      "Une table sans clé : les doublons arrivent sans bruit, et les retirer ensuite prend des jours.",
      "Des dates ou des montants rangés en texte : '10' passe avant '9' dans un tri, et chaque somme demande une conversion.",
      "Croire que `PRIMARY KEY` ou `UNIQUE` empêchent les doublons sur Snowflake : sur une table standard, elles sont notées, pas appliquées.",
      "`CREATE OR REPLACE TABLE` dans un script Snowflake qu'on relance : la table est recréée vide.",
      "Une table fourre-tout (une colonne type, puis valeur1, valeur2, valeur3) : impossible à contrôler et à lire.",
      "Un nom réservé (ORDER, USER) : chaque requête devra l'entourer, pour toujours."
    ],
    pratique: "Avant de créer une table pour un flux EDI ou un rapport, regarde si Divalto ne l'a pas déjà. Une copie de l'ERP doit dire d'où elle vient et quand elle a été copiée.",
    motsCles: ["create table", "nouvelle table", "conception", "modéliser", "structure", "clé primaire", "colonnes", "contraintes", "not null", "bonnes pratiques", "checklist", "architecture"],
    voirAussi: ["cle-primaire", "relier-tables", "choisir-types", "nommer", "creer-schema"],
    dico: ["create-table", "primary-key", "unique", "foreign-key", "check", "default", "not-null", "identity"],
    outils: ["mots-reserves"],
    sources: [
      { titre: "CREATE TABLE (Transact-SQL)", url: "https://learn.microsoft.com/fr-fr/sql/t-sql/statements/create-table-transact-sql" },
      { titre: "Snowflake : CREATE TABLE", url: "https://docs.snowflake.com/en/sql-reference/sql/create-table" },
      { titre: "Snowflake : les contraintes", url: "https://docs.snowflake.com/en/sql-reference/constraints-overview" },
      { titre: "Snowflake : les types texte", url: "https://docs.snowflake.com/en/sql-reference/data-types-text" },
      { titre: "MySQL 8.4 : CREATE TABLE", url: "https://dev.mysql.com/doc/refman/8.4/en/create-table.html" }
    ]
  },
  {
    id: "creer-base",
    titre: "Je crée une base de données",
    famille: "Concevoir",
    resume: "Les questions à te poser avant `CREATE DATABASE` : son rôle, les environnements, le nom, le propriétaire, la collation, la récupération, la taille, les droits et le script.",
    besoins: [
      "je crée une base de données",
      "créer une nouvelle base sql server pour un projet",
      "quelles options choisir à la création d'une base",
      "comment bien créer une base de données"
    ],
    essais: [
      "nouvelle bdd pour l'entrepot de données power bi",
      "create database bonnes pratiques collation",
      "je dois monter une base pour la recette et la prod"
    ],
    exemple: {
      texte: "Ton équipe lance un entrepôt de données pour Power BI : les ventes de Divalto et les flux EDI. Il lui faut sa propre base, en recette puis en production. Avant `CREATE DATABASE`, tu réponds aux questions ci-dessous. Voici le script obtenu, rangé dans Git.",
      code: "-- Fichier entrepot/001_creer_base.sql, rangé dans Git\nCREATE DATABASE entrepot_ventes\nON PRIMARY (NAME = entrepot_ventes_data, FILENAME = 'D:\\sql\\data\\entrepot_ventes.mdf',\n            SIZE = 20 GB, FILEGROWTH = 1 GB)\nLOG ON (NAME = entrepot_ventes_log, FILENAME = 'L:\\sql\\log\\entrepot_ventes.ldf',\n        SIZE = 4 GB, FILEGROWTH = 512 MB)\nCOLLATE French_CI_AS;   -- exemple : mets celle des colonnes de ton ERP (sys.columns)\nGO\nALTER DATABASE entrepot_ventes SET RECOVERY FULL;         -- + une sauvegarde du journal toutes les 15 min\nALTER AUTHORIZATION ON DATABASE::entrepot_ventes TO sa;  -- un compte technique, pas une personne",
      codes: {
        snowflake: "-- Fichier entrepot/001_creer_base.sql, rangé dans Git\nUSE ROLE sysadmin;                         -- le rôle propriétaire, jamais ACCOUNTADMIN\nCREATE DATABASE IF NOT EXISTS entrepot_ventes\n  DATA_RETENTION_TIME_IN_DAYS = 7          -- Time Travel de 7 jours (édition Enterprise)\n  COMMENT = 'Entrepôt ventes et EDI pour Power BI. Responsable : équipe data';\nCREATE TRANSIENT DATABASE IF NOT EXISTS bac_a_sable   -- jetable : sans Fail-safe\n  DATA_RETENTION_TIME_IN_DAYS = 1;",
        mysql: "-- Fichier entrepot/001_creer_base.sql, rangé dans Git\nCREATE DATABASE IF NOT EXISTS entrepot_ventes\n  CHARACTER SET utf8mb4\n  COLLATE utf8mb4_0900_ai_ci;   -- le défaut de MySQL 8.4, écrit pour ne pas dépendre du serveur\nCREATE ROLE IF NOT EXISTS role_lecture;\nGRANT SELECT ON entrepot_ventes.* TO role_lecture;   -- Power BI : lecture seule"
      }
    },
    etapes: [
      {
        titre: "Le rôle de la base",
        questions: [
          {
            id: "usage",
            q: "À quoi servira la base, et pour quelle application ?",
            pourquoi: "Une base fourre-tout mélange l'ERP, l'EDI et les rapports. Une restauration, un droit ou une panne touche alors tout le monde à la fois.",
            reflexe: "Une base par application ou par domaine : `entrepot_ventes` pour Power BI, `edi_flux` pour les échanges. Écris son rôle en une phrase, en tête du script."
          },
          {
            id: "base-ou-schema",
            q: "Une nouvelle base, ou un schéma dans une base qui existe déjà ?",
            pourquoi: "Chaque base de plus, c'est une sauvegarde, des droits et une collation de plus à gérer. Mais une seule base pour tout mêle des équipes et des rythmes de sauvegarde différents.",
            reflexe: "Même équipe, mêmes sauvegardes, mêmes droits : un schéma suffit. Autre application, ou autre rythme de sauvegarde : une base à part. Le détail : « Je range les tables dans des schémas ».",
            moteurs: {
              sqlserver: "Une clé étrangère ne relie que des tables d'une même base : des tables liées restent ensemble.",
              mysql: "Un schéma est une base : la question devient « une base de plus, ou un préfixe devant les tables ? »."
            }
          },
          {
            id: "hors-erp",
            q: "Tes tables vont-elles dans la base de l'ERP ?",
            pourquoi: "Restaurer la base Divalto après un incident remet aussi tes tables à la date de la sauvegarde : les flux EDI de la journée disparaissent. Et chaque montée de version de l'ERP modifie sa base sans connaître tes objets.",
            reflexe: "Crée ta propre base, à côté de l'ERP. Lis l'ERP par son nom complet (`base.schema.table`) ou par des vues, sans rien écrire dans ses tables."
          },
          {
            id: "serveur",
            q: "Sur quel serveur : celui de l'ERP, ou un autre ?",
            pourquoi: "Sur l'instance de l'ERP, ta base partage la mémoire et le processeur avec Divalto. Un gros chargement de nuit qui déborde, ou un rapport lourd, ralentit alors les saisies du matin.",
            reflexe: "Gros volumes ou rapports lourds : une instance à part pour l'entrepôt. Sinon, planifie les chargements hors des heures de saisie, et mesure leur durée.",
            moteurs: {
              snowflake: "Le calcul passe par des warehouses (les moteurs de calcul) séparés : un warehouse par usage (chargement, rapports) évite qu'un chargement ralentisse Power BI."
            }
          },
          {
            id: "responsable",
            q: "Qui s'occupe de la base au quotidien : sauvegardes, place disque, surveillance ?",
            pourquoi: "Une base sans responsable n'est surveillée par personne. On le découvre le jour où le disque est plein, ou quand il faut restaurer.",
            reflexe: "Nomme un responsable (l'administrateur des bases, l'équipe data) avant la création. Inscris la base dans le plan de sauvegarde et dans la surveillance dès le premier jour."
          }
        ]
      },
      {
        titre: "Les environnements",
        questions: [
          {
            id: "environnements",
            q: "Combien d'environnements : développement, recette, production ?",
            pourquoi: "Sans recette, chaque script est testé en production, devant tous les utilisateurs. Et Power BI découvre les changements le jour même.",
            reflexe: "Au moins une recette, avec la même structure que la production. Le même script passe d'abord en recette, puis en production, sans retouche.",
            moteurs: {
              snowflake: "Une recette sur des données réelles, sans les recopier : `CREATE DATABASE entrepot_recette CLONE entrepot_ventes;`."
            }
          },
          {
            id: "quel-environnement",
            q: "Comment savoir, à coup sûr, dans quel environnement tu travailles ?",
            pourquoi: "Avec le même nom de base partout, une suppression lancée « en recette » part en production si la fenêtre est connectée au mauvais serveur.",
            reflexe: "Un serveur ou un compte par environnement, ou un préfixe (`rec_`, `prd_`). Donne une couleur à chaque connexion dans ton outil. Ne mets pas le nom de la base en dur dans les scripts.",
            moteurs: {
              snowflake: "Souvent, un seul compte : un préfixe par environnement (`DEV_`, `REC_`, `PRD_`) et des rôles séparés, pour qu'un rôle de recette ne puisse pas écrire en production."
            }
          },
          {
            id: "copie-production",
            q: "La recette contiendra-t-elle une copie des données de production ?",
            pourquoi: "La copie emporte les données personnelles : contacts, téléphones, IBAN. Tous ceux qui ont accès à la recette les voient, et ils sont souvent plus nombreux qu'en production.",
            reflexe: "Copie, puis masque ou anonymise les colonnes sensibles avant d'ouvrir la recette. Le détail : « Je protège des données personnelles »."
          }
        ]
      },
      {
        titre: "Le nom et le propriétaire",
        questions: [
          {
            id: "nom",
            q: "Le nom de la base dit-il à quoi elle sert ?",
            pourquoi: "`test2` ou `base_jean` ne disent rien. Dans deux ans, personne n'ose la supprimer, ni ne sait s'il faut la sauvegarder.",
            reflexe: "Minuscules, mots séparés par `_`, le domaine ou l'application : `entrepot_ventes`. Pas de date, ni de nom de personne. Le détail : « Je nomme les tables et les colonnes ».",
            moteurs: {
              snowflake: "Sans guillemets, le nom est rangé en majuscules : `ENTREPOT_VENTES`. Ne mets jamais de guillemets autour.",
              mysql: "Une base est un dossier sur le disque : sous Linux, la casse du nom compte. Écris-le en minuscules."
            }
          },
          {
            id: "proprietaire",
            q: "Qui sera le propriétaire de la base ?",
            pourquoi: "Par défaut, c'est le compte qui la crée. Si ce collègue part et que son compte est supprimé, les procédures qui s'exécutent « en tant que propriétaire » échouent (SQL Server, erreur 15517).",
            reflexe: "Un compte technique, jamais une personne. Les administrateurs passent par un rôle, pas par la propriété de la base.",
            moteurs: {
              sqlserver: "`ALTER AUTHORIZATION ON DATABASE::entrepot_ventes TO sa;` : `sa` ou un autre login technique, même désactivé. Contrôle : `SELECT name, SUSER_SNAME(owner_sid) FROM sys.databases;`",
              snowflake: "Le propriétaire est le rôle actif à la création. Crée avec SYSADMIN, ou un rôle placé sous lui. Jamais ACCOUNTADMIN : il faudrait ensuite donner chaque droit à la main.",
              mysql: "Pas de propriétaire de base : seulement des droits (`GRANT … ON entrepot_ventes.*`)."
            }
          }
        ]
      },
      {
        titre: "La collation",
        questions: [
          {
            id: "collation",
            q: "Quelle collation choisir : la règle qui compare et trie les textes ?",
            pourquoi: "Elle décide si 'abc' = 'ABC', et si 'é' = 'e'. Elle se choisit à la création : la changer ensuite ne touche pas les colonnes déjà créées.",
            reflexe: "Choisis-la exprès, et écris-la dans le script. SSMS en français l'appelle « classement ». Sans `COLLATE`, la base prend celle du serveur, qui n'est peut-être pas la bonne.",
            moteurs: {
              sqlserver: "`COLLATE French_CI_AS` : CI = casse ignorée, AS = accents comptés. Un `ALTER DATABASE … COLLATE` ne vaut que pour les tables créées ensuite.",
              snowflake: "Par défaut, rien à choisir : les textes sont en UTF-8, comparés tels quels (la casse compte). `DEFAULT_DDL_COLLATION` existe, mais une collation peut ralentir les comparaisons.",
              mysql: "`CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci` : le défaut de MySQL 8.4, sans casse ni accents. Écris-le quand même, pour ne pas dépendre du serveur."
            }
          },
          {
            id: "collation-erp",
            q: "Ta base sera-t-elle jointe aux tables de l'ERP ?",
            pourquoi: "Deux collations différentes dans une jointure ou une concaténation : la requête plante (« Cannot resolve the collation conflict »). Depuis la 10.12, Divalto range certains libellés en `Latin1_General_CI_AI` : sa doc signale la même erreur.",
            reflexe: "Relève la collation des colonnes que tu joindras : `SELECT name, collation_name FROM sys.columns WHERE object_id = OBJECT_ID('dbo.CLI');`. Prends la même pour ta base. La doc Divalto cite plusieurs collations : lis la tienne, ne la recopie pas.",
            seulement: ["sqlserver"]
          },
          {
            id: "tempdb",
            q: "La collation de ta base est-elle celle du serveur, donc de tempdb ?",
            pourquoi: "Une table temporaire (`#t`) vit dans tempdb, avec la collation du serveur. Si ta base en a une autre, la jointure entre tes tables et `#t` plante (erreur 468).",
            reflexe: "La même collation que le serveur, si l'ERP le permet. Sinon, écris `COLLATE DATABASE_DEFAULT` sur chaque colonne texte des tables temporaires : elles prennent alors la collation de ta base.",
            seulement: ["sqlserver"],
            code: "CREATE TABLE #cde_edi (\n  num_cde VARCHAR(35) COLLATE DATABASE_DEFAULT NOT NULL\n);"
          }
        ]
      },
      {
        titre: "Repartir après un incident",
        questions: [
          {
            id: "perte-acceptable",
            q: "Combien de données peux-tu perdre, et en combien de temps faut-il repartir ?",
            pourquoi: "Sans chiffres écrits, les sauvegardes sont réglées au hasard. Après une panne, on découvre qu'une journée de commandes EDI est perdue, et qu'il faut deux jours pour repartir.",
            reflexe: "Fais fixer deux chiffres par le métier : la perte maximale (par exemple 15 minutes de saisie) et le temps de reprise (par exemple 4 heures). Ils décident des sauvegardes."
          },
          {
            id: "mode-recuperation",
            q: "Quel mode de récupération : simple ou complet ?",
            pourquoi: "En mode complet (`FULL`) sans sauvegarde du journal, le journal grossit jusqu'à remplir le disque. En mode simple, impossible de revenir à 10 h 32, juste avant l'erreur.",
            reflexe: "Saisies ou flux en continu : `FULL`, avec une sauvegarde du journal toutes les 15 minutes, par exemple. Base rechargée chaque nuit depuis l'ERP : `SIMPLE` peut suffire. Sans réglage, la base prend le mode de la base `model`.",
            seulement: ["sqlserver"]
          },
          {
            id: "sauvegardes",
            q: "Les sauvegardes sont-elles planifiées, et une restauration a-t-elle été essayée ?",
            pourquoi: "Une sauvegarde jamais restaurée est un pari. Le jour de la panne, le fichier est incomplet, trop vieux, ou personne ne sait le relire.",
            reflexe: "Planifie les sauvegardes avant la mise en service. Restaure-les en recette chaque trimestre, chronomètre en main. Le détail : « Je sauvegarde et je restaure ».",
            moteurs: {
              snowflake: "Pour une erreur récente, Time Travel relit le passé. Pour garder des photos datées plus longtemps : les backups (backup sets), dans toutes les éditions, mais pas pour les tables transient.",
              mysql: "Une sauvegarde (`mysqldump`, ou une copie physique), plus le journal binaire (binlog) pour revenir à une heure précise."
            }
          },
          {
            id: "time-travel",
            q: "Combien de jours de Time Travel (le retour dans le passé) pour cette base ?",
            pourquoi: "1 jour par défaut : une erreur du vendredi, vue le lundi, ne se répare plus. À l'inverse, 90 jours sur des tables rechargées chaque nuit coûtent cher en stockage.",
            reflexe: "Règle `DATA_RETENTION_TIME_IN_DAYS` sur la base, puis par schéma ou par table selon l'usage : 7 à 30 jours pour les données de référence, 1 jour pour ce qui se recharge. Au-delà d'un jour : édition Enterprise.",
            seulement: ["snowflake"]
          },
          {
            id: "transient",
            q: "Les données sont-elles jetables, rechargeables à tout moment ?",
            pourquoi: "Une base permanente garde, après le Time Travel, 7 jours de Fail-safe : un filet de secours, payé en stockage. Pour des données rechargées chaque nuit, c'est payer pour rien.",
            reflexe: "Base de travail ou de chargement : `CREATE TRANSIENT DATABASE`. Toutes ses tables seront transient, sans Fail-safe. Décide à la création : une table transient ne se convertit pas ensuite.",
            seulement: ["snowflake"]
          }
        ]
      },
      {
        titre: "Les fichiers et les options",
        questions: [
          {
            id: "emplacement-fichiers",
            q: "Les fichiers de données et le journal sont-ils sur des disques séparés ?",
            pourquoi: "Sans chemin, ils vont dans les dossiers par défaut de l'instance, souvent sur le même disque. Les lectures et les écritures du journal s'y gênent. Et déplacer un fichier ensuite oblige à mettre la base hors ligne.",
            reflexe: "Écris le chemin de chaque fichier : les données sur un disque (`D:\\sql\\data`), le journal sur un autre (`L:\\sql\\log`). Le guide d'installation de Divalto conseille aussi des volumes séparés pour les données, le journal et tempdb.",
            seulement: ["sqlserver"]
          },
          {
            id: "taille-fichiers",
            q: "Quelle taille de départ pour le fichier de données et pour le journal ?",
            pourquoi: "Sans taille, la base prend celle de `model` (8 Mo par défaut), et grandit par petits bonds pendant les chargements. Un agrandissement du journal peut faire attendre toutes les écritures.",
            reflexe: "Estime le volume à un an (lignes × taille d'une ligne) et crée les fichiers à cette taille. Le journal : assez pour le plus gros chargement entre deux sauvegardes du journal.",
            seulement: ["sqlserver"]
          },
          {
            id: "croissance",
            q: "La croissance automatique est-elle fixe, en Mo, et assez grande ?",
            pourquoi: "En pourcentage, chaque bond est plus gros que le précédent. Trop petits, les bonds découpent le journal en milliers de morceaux (des VLF), et la base ralentit.",
            reflexe: "Une croissance fixe : par exemple 1 Go pour les données et 512 Mo pour le journal. Microsoft conseille de ne pas dépasser 1 024 Mo pour le journal. Surveille la place libre du disque.",
            seulement: ["sqlserver"]
          },
          {
            id: "options",
            q: "Les options copiées de la base `model` conviennent-elles ?",
            pourquoi: "Une nouvelle base copie les options de `model`. Avec `AUTO_CLOSE` à ON, la base se ferme au départ du dernier utilisateur : la connexion suivante attend sa réouverture, et l'application peut dépasser son délai d'attente.",
            reflexe: "Vérifie-les après la création : `AUTO_CLOSE` à OFF, `AUTO_SHRINK` (la réduction automatique des fichiers) à OFF, et Query Store (l'historique des requêtes et de leurs plans) actif, le défaut depuis SQL Server 2022.",
            seulement: ["sqlserver"],
            code: "SELECT name, is_auto_close_on, is_auto_shrink_on,\n       is_query_store_on, compatibility_level\nFROM sys.databases\nWHERE name = N'entrepot_ventes';"
          },
          {
            id: "compatibilite",
            q: "Quel niveau de compatibilité : la version de SQL Server que la base imite ?",
            pourquoi: "Une base restaurée depuis un vieux serveur garde son ancien niveau. Alors `STRING_SPLIT` (niveau 130) ou `GENERATE_SERIES` (niveau 160) « n'existent pas », et l'optimiseur reste à l'ancienne.",
            reflexe: "Base neuve : le niveau par défaut du serveur. Base d'un éditeur, comme l'ERP : le niveau qu'il certifie. Lis-le dans `sys.databases`, colonne `compatibility_level`.",
            seulement: ["sqlserver"]
          }
        ]
      },
      {
        titre: "Les droits",
        questions: [
          {
            id: "roles",
            q: "Qui pourra lire, écrire, ou modifier la structure ?",
            pourquoi: "Des droits donnés personne par personne deviennent impossibles à suivre. Et un compte de rapport qui peut écrire finira par modifier des données.",
            reflexe: "Crée les rôles avec la base : lecture (Power BI), écriture (les flux), structure (l'équipe data). Les droits vont aux rôles, les rôles aux personnes. Le détail : « Je donne des droits ».",
            moteurs: {
              sqlserver: "Des rôles de base (`CREATE ROLE role_lecture;`) et des droits par schéma : `GRANT SELECT ON SCHEMA::rpt TO role_lecture;`.",
              snowflake: "Lire une table demande `USAGE` sur la base et sur le schéma, puis `SELECT`. Un rôle de base (`CREATE DATABASE ROLE`) limite ses droits à cette base.",
              mysql: "`CREATE ROLE role_lecture;`, puis `GRANT SELECT ON entrepot_ventes.* TO role_lecture;`."
            }
          },
          {
            id: "comptes-techniques",
            q: "Les traitements (flux EDI, chargements) ont-ils leur propre compte ?",
            pourquoi: "Un flux qui tourne avec le compte d'une personne s'arrête quand elle change de mot de passe ou quitte l'entreprise. Et le journal ne dit plus qui a fait quoi.",
            reflexe: "Un compte technique par traitement, avec les seuls droits utiles. Jamais `db_owner` ni `sysadmin` pour une application, « pour que ça marche »."
          }
        ]
      },
      {
        titre: "Le script et la fiche",
        questions: [
          {
            id: "script",
            q: "Le script de création est-il enregistré, et peut-il tourner deux fois ?",
            pourquoi: "Une base créée à la main, avec des options cliquées dans SSMS, ne se recrée pas à l'identique en recette, ni après un sinistre.",
            reflexe: "Garde le script dans Git : base, options, rôles, droits. Écris-le pour qu'il tourne deux fois sans dégât, et rejoue-le tel quel dans chaque environnement.",
            moteurs: {
              sqlserver: "Crée seulement si la base manque : `IF DB_ID(N'entrepot_ventes') IS NULL CREATE DATABASE entrepot_ventes …`",
              snowflake: "`CREATE DATABASE IF NOT EXISTS`. Jamais `CREATE OR REPLACE DATABASE` : il supprime la base existante, rattrapable seulement pendant son Time Travel.",
              mysql: "`CREATE DATABASE IF NOT EXISTS`."
            }
          },
          {
            id: "fiche",
            q: "Où est écrit à quoi sert la base, et qui contacter ?",
            pourquoi: "Sans fiche, la base devient une boîte noire : on n'ose ni la modifier, ni l'arrêter, ni la supprimer.",
            reflexe: "Une fiche courte dans le dépôt : rôle, responsable, sources, environnements, sauvegardes, rôles. Ajoute un commentaire dans la base quand le moteur le permet.",
            moteurs: {
              sqlserver: "Une propriété étendue `MS_Description` sur la base (procédure `sp_addextendedproperty`).",
              snowflake: "`COMMENT = '…'` sur la base et sur chaque schéma.",
              mysql: "Pas de commentaire sur une base : la fiche du dépôt suffit."
            }
          }
        ]
      }
    ],
    pieges: [
      "Laisser la collation du serveur sans y penser : si la base de l'ERP en a une autre, chaque jointure avec elle plante, jusqu'à ce qu'on écrive `COLLATE` partout.",
      "Le mode complet (`FULL`) sans sauvegarde du journal : le journal grossit jusqu'à remplir le disque, puis les écritures échouent.",
      "Une base créée avec le compte d'un collègue : il part, son compte est supprimé, et les procédures « en tant que propriétaire » échouent.",
      "`CREATE OR REPLACE DATABASE` dans un script Snowflake qu'on relance : la base est supprimée, puis recréée vide.",
      "Une croissance en pourcentage : de petits bonds au début, des bonds énormes ensuite, et le disque se remplit d'un coup.",
      "Une recette copiée de la production sans masquer les données personnelles : tous les testeurs voient les IBAN et les contacts des clients.",
      "Tes tables dans la base de l'ERP : une restauration de Divalto les ramène à la date de la sauvegarde.",
      "Une base restaurée depuis un ancien serveur garde son vieux niveau de compatibilité : `STRING_SPLIT` « n'existe pas », et l'optimiseur reste à l'ancienne."
    ],
    pratique: "Avant de créer une base qui lira Divalto, relève la collation de ses colonnes de codes (`sys.columns`) et prends la même. Attention : depuis la 10.12, certains libellés sont en `Latin1_General_CI_AI`, et demandent un `COLLATE`.",
    motsCles: ["create database", "base de données", "nouvelle base", "collation", "classement", "mode de récupération", "journal", "sauvegarde", "environnement", "recette", "propriétaire", "compatibilité", "time travel", "transient", "bdd"],
    voirAussi: ["creer-schema", "creer-table", "nommer", "droits", "sauvegarder", "mettre-en-prod", "donnees-personnelles", "couts-snowflake"],
    dico: ["collate", "time-travel", "undrop", "clone", "string-split", "table-temporaire"],
    sources: [
      { titre: "CREATE DATABASE (Transact-SQL)", url: "https://learn.microsoft.com/fr-fr/sql/t-sql/statements/create-database-transact-sql" },
      { titre: "SQL Server : les modes de récupération", url: "https://learn.microsoft.com/fr-fr/sql/relational-databases/backup-restore/recovery-models-sql-server" },
      { titre: "Divalto : installer le serveur SQL (classement, récupération, volumes)", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/10550739615/Installation+Divalto+infinity+serveur+et+licence" },
      { titre: "SQL Server : gérer la taille du journal des transactions", url: "https://learn.microsoft.com/fr-fr/sql/relational-databases/logs/manage-the-size-of-the-transaction-log-file" },
      { titre: "ALTER DATABASE : le niveau de compatibilité", url: "https://learn.microsoft.com/fr-fr/sql/t-sql/statements/alter-database-transact-sql-compatibility-level" },
      { titre: "Snowflake : CREATE DATABASE", url: "https://docs.snowflake.com/en/sql-reference/sql/create-database" },
      { titre: "MySQL 8.4 : CREATE DATABASE", url: "https://dev.mysql.com/doc/refman/8.4/en/create-database.html" },
      { titre: "Divalto : collation SQL sur champs (412)", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/11666456736/Collation+SQL+sur+champs+412" }
    ]
  },
  {
    id: "creer-schema",
    titre: "Je range les tables dans des schémas",
    famille: "Concevoir",
    resume: "Ranger les tables par usage (brut, entrepôt, rapports, EDI, technique) : le découpage, les noms, le propriétaire, les droits par schéma et le schéma par défaut.",
    besoins: [
      "je range les tables dans des schémas",
      "créer un schéma dans la base",
      "comment organiser les tables par schéma",
      "séparer le brut, l'entrepôt et les rapports"
    ],
    essais: [
      "create schema ou tout dans dbo",
      "organiser ma base en couches stg dwh rpt",
      "donner les droits par schema a power bi"
    ],
    exemple: {
      texte: "Dans la base `entrepot_ventes`, tout est dans `dbo` : les copies de Divalto, les messages EDI, les tables pour Power BI et les essais de chacun. Un schéma est un tiroir nommé dans la base. Tu crées un tiroir par usage, et tu donnes les droits par tiroir.",
      code: "CREATE SCHEMA stg AUTHORIZATION dbo;     -- brut : les sources copiées telles quelles\nGO\nCREATE SCHEMA integ AUTHORIZATION dbo;   -- intégration : nettoyé, codes alignés\nGO\nCREATE SCHEMA dwh AUTHORIZATION dbo;     -- entrepôt : tables dim_ et fait_\nGO\nCREATE SCHEMA rpt AUTHORIZATION dbo;     -- rapports : les vues lues par Power BI\nGO\nCREATE SCHEMA edi AUTHORIZATION dbo;     -- messages EDI reçus et envoyés\nGO\nCREATE SCHEMA tech AUTHORIZATION dbo;    -- journaux et paramètres des traitements\nGO\nGRANT SELECT ON SCHEMA::rpt TO role_powerbi;                 -- Power BI ne lit que rpt\nGRANT SELECT, INSERT, UPDATE ON SCHEMA::edi TO role_flux_edi;",
      codes: {
        snowflake: "USE ROLE sysadmin;\nUSE DATABASE entrepot_ventes;\nCREATE TRANSIENT SCHEMA IF NOT EXISTS stg;             -- brut, rechargé : sans Fail-safe\nCREATE SCHEMA IF NOT EXISTS integ;                     -- intégration\nCREATE SCHEMA IF NOT EXISTS dwh WITH MANAGED ACCESS;   -- entrepôt : droits gérés par le schéma\nCREATE SCHEMA IF NOT EXISTS rpt WITH MANAGED ACCESS;   -- rapports pour Power BI\nCREATE SCHEMA IF NOT EXISTS edi;\nCREATE SCHEMA IF NOT EXISTS tech;\nGRANT USAGE ON DATABASE entrepot_ventes TO ROLE role_powerbi;\nGRANT USAGE ON SCHEMA rpt TO ROLE role_powerbi;\nGRANT SELECT ON ALL VIEWS IN SCHEMA rpt TO ROLE role_powerbi;\nGRANT SELECT ON FUTURE VIEWS IN SCHEMA rpt TO ROLE role_powerbi;",
        mysql: "-- MySQL : un schéma est une base. Une base par usage, préfixée par l'application.\nCREATE DATABASE IF NOT EXISTS ventes_stg CHARACTER SET utf8mb4;   -- brut\nCREATE DATABASE IF NOT EXISTS ventes_dwh CHARACTER SET utf8mb4;   -- entrepôt\nCREATE DATABASE IF NOT EXISTS ventes_rpt CHARACTER SET utf8mb4;   -- rapports\nCREATE DATABASE IF NOT EXISTS ventes_edi CHARACTER SET utf8mb4;   -- flux EDI\nGRANT SELECT ON ventes_rpt.* TO role_powerbi;                      -- Power BI ne lit que les rapports\nGRANT SELECT, INSERT, UPDATE ON ventes_edi.* TO role_flux_edi;"
      }
    },
    etapes: [
      {
        titre: "Le découpage",
        questions: [
          {
            id: "usages",
            q: "Quels usages vont cohabiter dans la base ?",
            pourquoi: "Dans un seul schéma, une copie brute, une table de rapport et un essai se ressemblent. On modifie la mauvaise table, ou on supprime une table utile.",
            reflexe: "Liste les usages, puis crée un schéma par usage : `stg` (brut), `integ` (intégration), `dwh` (entrepôt), `rpt` (rapports), `edi`, `tech`. Pas un schéma par personne, ni par projet de passage."
          },
          {
            id: "brut-separe",
            q: "Les données brutes des sources sont-elles séparées des données contrôlées ?",
            pourquoi: "Si la copie brute et la table nettoyée se côtoient, un rapport finit par lire la brute : doublons EDI, codes non alignés, montants en double.",
            reflexe: "`stg` reçoit les sources telles quelles, sans règle métier, et seuls les traitements y écrivent. Les rapports ne lisent jamais `stg` : ils lisent `dwh` ou `rpt`."
          },
          {
            id: "vues-rapports",
            q: "Power BI lit-il les tables, ou des vues faites pour lui ?",
            pourquoi: "Un rapport branché sur les tables casse dès qu'une colonne change de nom. Et il voit des colonnes techniques qui n'ont rien à y faire.",
            reflexe: "Un schéma `rpt` avec des vues aux noms clairs, faites pour Power BI. Tu fais évoluer les tables dessous sans casser les rapports. Le détail : « Je crée une vue »."
          },
          {
            id: "technique",
            q: "Où vont les journaux, les paramètres et les tables de travail des traitements ?",
            pourquoi: "Mélangés aux données métier, ils encombrent la liste des tables et les droits : un utilisateur de Power BI tombe sur le journal des erreurs EDI.",
            reflexe: "Un schéma `tech` pour les journaux et les paramètres, lu par l'équipe data seulement. Les tables de travail d'un chargement : dans `stg`, vidées à chaque passage."
          },
          {
            id: "bac-a-sable",
            q: "Où les analystes font-ils leurs essais ?",
            pourquoi: "Sans endroit prévu, les essais finissent à côté des vraies tables : `test_cde2`, `copie_client_old`… Personne n'ose les supprimer, et un rapport finit par en lire une.",
            reflexe: "Un schéma (ou une base) bac à sable, avec une règle écrite : ce qui y reste plus de 30 jours est supprimé. Aucun rapport ni traitement ne le lit.",
            moteurs: {
              sqlserver: "Donne-lui un autre propriétaire que `dbo`. Avec le droit `ALTER` sur un schéma de `dbo`, un analyste peut créer une vue qui lit les autres schémas de `dbo`, même ceux qui lui sont interdits."
            }
          }
        ]
      },
      {
        titre: "Le nom",
        questions: [
          {
            id: "nom-schema",
            q: "Le nom du schéma est-il court, clair, et libre de mot réservé ?",
            pourquoi: "Le schéma s'écrit devant chaque table, dans chaque requête et chaque rapport. Un nom flou se répète partout, et le renommer plus tard casse tout.",
            reflexe: "Quelques lettres, en minuscules : `stg`, `dwh`, `rpt`, `edi`. Vérifie-les dans l'outil « Mots réservés » : `int` et `ref` sont à éviter. Écris le sens de chaque schéma dans la fiche de la base."
          },
          {
            id: "meme-nom-partout",
            q: "Le nom du schéma est-il le même dans tous les environnements ?",
            pourquoi: "`rpt_recette` en recette et `rpt` en production : chaque vue et chaque script change au passage. Le script testé n'est plus celui qu'on livre.",
            reflexe: "Le même nom de schéma partout. L'environnement se voit au serveur, au compte ou à la base, jamais au schéma."
          }
        ]
      },
      {
        titre: "Le propriétaire",
        questions: [
          {
            id: "proprietaire-schema",
            q: "Qui possède chaque schéma ?",
            pourquoi: "Sur SQL Server, une vue de `rpt` lit les tables de `dwh` avec le seul droit sur la vue, si les deux schémas ont le même propriétaire. Sinon, chaque lecteur a besoin d'un droit sur `dwh`.",
            reflexe: "Le même propriétaire, souvent `dbo`, pour tous les schémas d'une application. Un autre propriétaire seulement pour isoler exprès, comme le bac à sable.",
            moteurs: {
              snowflake: "Le propriétaire est le rôle qui crée le schéma. Crée-les tous avec le même rôle, placé sous SYSADMIN.",
              mysql: "Pas de propriétaire de schéma : seulement des droits."
            }
          },
          {
            id: "acces-gere",
            q: "Qui peut donner des droits sur les tables du schéma ?",
            pourquoi: "Dans un schéma normal, le rôle qui crée une table peut l'ouvrir à qui il veut. Les droits se dispersent, et personne n'en a la liste.",
            reflexe: "`CREATE SCHEMA rpt WITH MANAGED ACCESS` : seul le propriétaire du schéma, ou un rôle qui a `MANAGE GRANTS`, donne les droits sur ses tables et ses vues.",
            seulement: ["snowflake"]
          }
        ]
      },
      {
        titre: "Les droits",
        questions: [
          {
            id: "droits-schema",
            q: "Les droits se donnent-ils par schéma, plutôt que table par table ?",
            pourquoi: "Table par table, chaque nouvelle table est oubliée : invisible pour Power BI, ou ouverte à tous. Personne ne sait plus qui voit quoi.",
            reflexe: "Un droit par schéma et par rôle : lecture de `rpt` pour Power BI, écriture dans `edi` pour le flux EDI. Les nouvelles tables du schéma suivent la même règle.",
            moteurs: {
              sqlserver: "`GRANT SELECT ON SCHEMA::rpt TO role_powerbi;` vaut aussi pour les tables et les vues créées ensuite dans `rpt`.",
              snowflake: "`USAGE` sur la base et le schéma, `SELECT ON ALL VIEWS IN SCHEMA rpt` pour l'existant, `SELECT ON FUTURE VIEWS IN SCHEMA rpt` pour la suite.",
              mysql: "`GRANT SELECT ON ventes_rpt.* TO role_powerbi;` vaut pour toute la base, tables à venir comprises."
            }
          },
          {
            id: "droits-futurs",
            q: "Les droits futurs (sur les tables à venir) sont-ils posés au niveau du schéma, ou de la base ?",
            pourquoi: "Si un droit futur existe sur le schéma et un autre sur la base, pour le même type d'objet, Snowflake ignore celui de la base. Power BI ne voit pas les nouvelles tables de ce schéma.",
            reflexe: "Un seul niveau, de préférence le schéma. Contrôle avec `SHOW FUTURE GRANTS IN SCHEMA rpt;`.",
            seulement: ["snowflake"]
          },
          {
            id: "deplacer",
            q: "Une table devra-t-elle changer de schéma plus tard ?",
            pourquoi: "Déplacer une table change son nom complet : les vues, procédures et rapports qui la citent cassent. Et sur SQL Server, `ALTER SCHEMA … TRANSFER` lui retire tous ses droits.",
            reflexe: "Choisis le bon schéma dès la création. Si tu déplaces, fais tout dans le même script : le déplacement, les droits, et les vues corrigées.",
            moteurs: {
              snowflake: "`ALTER TABLE … RENAME TO dwh.commande` déplace la table : les objets qui la citent sont à corriger.",
              mysql: "`RENAME TABLE ventes_stg.commande TO ventes_dwh.commande` déplace la table, mais les droits donnés sur elle ne suivent pas. Une table qui a des triggers refuse de changer de base."
            }
          }
        ]
      },
      {
        titre: "Le schéma par défaut",
        questions: [
          {
            id: "schema-defaut",
            q: "Où atterrit une table créée sans nom de schéma ?",
            pourquoi: "Sans préfixe, elle va dans le schéma par défaut de ta session : `dbo`, `PUBLIC`, ou le dernier schéma utilisé. Elle se retrouve au mauvais endroit, avec les mauvais droits.",
            reflexe: "Écris toujours le schéma : `CREATE TABLE edi.commande_edi`, `SELECT … FROM rpt.v_ventes`. Laisse `dbo` et `PUBLIC` vides, ou aux objets de l'éditeur.",
            moteurs: {
              sqlserver: "Un utilisateur Windows qui entre par un groupe, sans compte à lui dans la base, crée une table sans préfixe : SQL Server crée un schéma à son nom (`DOMAINE\\jdupont`).",
              snowflake: "`CREATE SCHEMA` fait du nouveau schéma le schéma courant : dans le même script, les tables suivantes sans préfixe y atterrissent."
            }
          }
        ]
      },
      {
        titre: "Les cas propres au moteur",
        questions: [
          {
            id: "base-par-couche",
            q: "Une base par couche, ou un schéma par couche ?",
            pourquoi: "Les deux marchent, mais pas mélangés : un projet rangé à moitié par base, à moitié par schéma, devient illisible, et ses droits aussi.",
            reflexe: "Petit entrepôt : une base, un schéma par couche. Plusieurs sources et équipes : une base par couche (`STG`, `DWH`), un schéma par source (`STG.DIVALTO`, `STG.EDI`).",
            seulement: ["snowflake"]
          },
          {
            id: "schema-transient",
            q: "Le schéma brut doit-il être transient, sans Fail-safe ?",
            pourquoi: "Les tables de `stg` se rechargent depuis les sources. Permanentes, elles payent 7 jours de Fail-safe (le filet de secours de Snowflake) pour des données qu'on peut recharger.",
            reflexe: "`CREATE TRANSIENT SCHEMA stg` : toutes ses tables sont transient. Garde un Time Travel court : `DATA_RETENTION_TIME_IN_DAYS = 1`.",
            seulement: ["snowflake"]
          },
          {
            id: "mysql-sans-schema",
            q: "Sur MySQL, comment ranger, puisqu'un schéma est une base ?",
            pourquoi: "`CREATE SCHEMA` y crée une base. Dans une seule base, tout se mélange, comme dans `dbo`.",
            reflexe: "Une base par usage, préfixée par l'application (`ventes_stg`, `ventes_rpt`) : une requête les joint par leur nom complet (`ventes_rpt.v_ventes`). Ou une seule base, et un préfixe par usage (`stg_commande`).",
            seulement: ["mysql"]
          }
        ]
      },
      {
        titre: "La règle et le script",
        questions: [
          {
            id: "regle-ecrite",
            q: "La règle de rangement est-elle écrite ?",
            pourquoi: "Sans règle, chaque nouveau venu range ses tables où il veut. En un an, le rangement a disparu.",
            reflexe: "Une page courte : chaque schéma, son usage, qui écrit, qui lit. Et un commentaire sur chaque schéma, dans la base.",
            moteurs: {
              sqlserver: "Une propriété étendue `MS_Description` sur le schéma (procédure `sp_addextendedproperty`).",
              snowflake: "`COMMENT = '…'` dans le `CREATE SCHEMA`.",
              mysql: "Pas de commentaire sur une base : la page suffit."
            }
          },
          {
            id: "script-schemas",
            q: "Les schémas et leurs droits sont-ils créés par un script rejouable ?",
            pourquoi: "Un schéma créé à la main en production manque en recette : le premier déploiement y échoue.",
            reflexe: "Un script versionné, qui tourne deux fois sans erreur : il crée ce qui manque et redonne les droits.",
            moteurs: {
              sqlserver: "`CREATE SCHEMA` doit être seul dans son lot : `GO` avant et après, ou `EXEC (N'…')` dans un `IF`, comme ci-dessous.",
              snowflake: "`CREATE SCHEMA IF NOT EXISTS`. Jamais `CREATE OR REPLACE SCHEMA` : il supprime le schéma et toutes ses tables.",
              mysql: "`CREATE DATABASE IF NOT EXISTS`."
            },
            code: "-- SQL Server\nIF SCHEMA_ID(N'stg') IS NULL\n  EXEC (N'CREATE SCHEMA stg AUTHORIZATION dbo');"
          }
        ]
      }
    ],
    pieges: [
      "Tout laisser dans `dbo` ou `PUBLIC` : au bout d'un an, personne ne sait quelles tables servent, ni qui peut les lire.",
      "Deux propriétaires différents pour `rpt` et `dwh` (SQL Server) : les vues de `rpt` demandent soudain des droits sur les tables de `dwh`.",
      "Déplacer une table avec `ALTER SCHEMA … TRANSFER` : elle perd tous ses droits, et le flux de la nuit plante.",
      "Sur Snowflake, un droit futur posé sur le schéma : celui de la base est ignoré pour ce schéma, et Power BI ne voit pas les nouvelles tables.",
      "`CREATE OR REPLACE SCHEMA` dans un script Snowflake qu'on relance : le schéma et toutes ses tables sont recréés vides.",
      "Un schéma par personne (`jdupont`) : à son départ, ses tables n'ont plus de responsable, et personne n'ose les supprimer.",
      "Le nom de l'environnement dans le schéma (`rpt_recette`) : chaque script change entre la recette et la production."
    ],
    pratique: "Pour Power BI, n'ouvre que le schéma `rpt` : des vues aux noms métier, rien d'autre. Le jour où une table de l'entrepôt change, tu corriges la vue, et aucun rapport ne casse.",
    motsCles: ["create schema", "schéma", "ranger", "organiser", "dbo", "public", "staging", "stg", "couches", "droits par schéma", "managed access", "propriétaire", "bac à sable", "rpt"],
    voirAussi: ["creer-base", "creer-table", "droits", "creer-vue", "nommer", "donnees-powerbi", "table-import"],
    dico: ["create-view", "create-table", "mots-reserves"],
    outils: ["mots-reserves"],
    sources: [
      { titre: "CREATE SCHEMA (Transact-SQL)", url: "https://learn.microsoft.com/fr-fr/sql/t-sql/statements/create-schema-transact-sql" },
      { titre: "ALTER SCHEMA (Transact-SQL)", url: "https://learn.microsoft.com/fr-fr/sql/t-sql/statements/alter-schema-transact-sql" },
      { titre: "SQL Server : propriété et séparation utilisateur-schéma", url: "https://learn.microsoft.com/fr-fr/sql/relational-databases/security/authentication-access/ownership-and-user-schema-separation" },
      { titre: "GRANT : autorisations sur un schéma (Transact-SQL)", url: "https://learn.microsoft.com/fr-fr/sql/t-sql/statements/grant-schema-permissions-transact-sql" },
      { titre: "Snowflake : CREATE SCHEMA", url: "https://docs.snowflake.com/en/sql-reference/sql/create-schema" },
      { titre: "Snowflake : GRANT et les droits futurs", url: "https://docs.snowflake.com/en/sql-reference/sql/grant-privilege" },
      { titre: "MySQL 8.4 : CREATE DATABASE (et CREATE SCHEMA)", url: "https://dev.mysql.com/doc/refman/8.4/en/create-database.html" },
      { titre: "MySQL 8.4 : RENAME TABLE", url: "https://dev.mysql.com/doc/refman/8.4/en/rename-table.html" }
    ]
  },
  {
    id: "cle-primaire",
    titre: "Je choisis la clé primaire",
    famille: "Concevoir",
    resume: "Choisir la clé primaire : clé métier ou numéro technique, le type, le compteur automatique et ses trous, le rangement des lignes, Snowflake, la reprise et les fusions.",
    besoins: [
      "je choisis la clé primaire",
      "quelle clé primaire mettre sur ma table",
      "clé naturelle ou numéro auto-incrémenté",
      "identity ou guid pour l'identifiant d'une table"
    ],
    essais: [
      "primary key technique ou metier",
      "faut il un id auto increment sur chaque table",
      "repartir le compteur identity apres une reprise"
    ],
    exemple: {
      texte: "Tu charges dans l'entrepôt les clients de deux dossiers Divalto, c'est-à-dire deux sociétés. Le code C001 existe dans chacun, pour deux clients différents. La clé primaire (ce qui désigne une ligne, sans doublon ni vide) sera un numéro technique ; la clé métier, dossier + code, est protégée à part.",
      code: "CREATE TABLE integ.client (\n  id          INT IDENTITY(1,1) NOT NULL,   -- numéro technique : court, ne change jamais\n  dossier     SMALLINT      NOT NULL,       -- le dossier Divalto, c'est-à-dire la société\n  code_client VARCHAR(20)   NOT NULL,       -- le code du client dans ce dossier\n  nom         NVARCHAR(60)  NOT NULL,\n  CONSTRAINT pk_client PRIMARY KEY CLUSTERED (id),\n  CONSTRAINT uq_client_dossier_code UNIQUE (dossier, code_client)   -- la clé métier\n);\nINSERT INTO integ.client (dossier, code_client, nom)\nVALUES (1, 'C001', N'AquaBleu'), (2, 'C001', N'Hydro Sud');   -- deux dossiers : accepté",
      codes: {
        snowflake: "CREATE TABLE integ.client (\n  id          NUMBER(38,0) IDENTITY,   -- NOORDER par défaut : unique, pas forcément croissant\n  dossier     NUMBER(4,0)  NOT NULL,\n  code_client VARCHAR(20)  NOT NULL,\n  nom         VARCHAR(60)  NOT NULL,\n  CONSTRAINT pk_client PRIMARY KEY (id),                            -- notée, pas appliquée\n  CONSTRAINT uq_client_dossier_code UNIQUE (dossier, code_client)   -- notée, pas appliquée\n);\n-- Après chaque chargement : 0 ligne attendue\nSELECT dossier, code_client, COUNT(*) AS nb\nFROM integ.client\nGROUP BY dossier, code_client\nHAVING COUNT(*) > 1;",
        mysql: "CREATE TABLE integ.client (\n  id          INT          NOT NULL AUTO_INCREMENT,   -- InnoDB range les lignes selon lui\n  dossier     SMALLINT     NOT NULL,\n  code_client VARCHAR(20)  NOT NULL,\n  nom         VARCHAR(60)  NOT NULL,\n  CONSTRAINT pk_client PRIMARY KEY (id),              -- son nom sera toujours PRIMARY\n  CONSTRAINT uq_client_dossier_code UNIQUE (dossier, code_client)\n) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;\nINSERT INTO integ.client (dossier, code_client, nom)\nVALUES (1, 'C001', 'AquaBleu'), (2, 'C001', 'Hydro Sud');"
      }
    },
    etapes: [
      {
        titre: "La clé métier",
        questions: [
          {
            id: "cle-metier",
            q: "Qu'est-ce qui distingue deux lignes pour le métier ?",
            pourquoi: "Sans clé métier connue, rien n'empêche les doublons : le même client chargé deux fois reçoit deux numéros, et ses ventes se partagent entre les deux.",
            reflexe: "Demande au métier : « deux lignes avec quelles valeurs sont la même chose ? ». Ici : le dossier et le code client. Une clé métier peut avoir plusieurs colonnes."
          },
          {
            id: "plusieurs-sources",
            q: "Les lignes viennent-elles de plusieurs sources ou de plusieurs sociétés ?",
            pourquoi: "Le code C001 existe dans chaque dossier Divalto. Avec le code seul comme clé, le second C001 est rejeté, ou il écrase le premier lors d'une mise à jour.",
            reflexe: "Mets la source dans la clé métier : `(dossier, code_client)`, ou `(partenaire, num_cde)` pour l'EDI. Divalto fait pareil : le dossier (`DOS`) accompagne le code client (`TIERS`)."
          },
          {
            id: "stabilite",
            q: "Cette clé métier peut-elle changer un jour ?",
            pourquoi: "Un client recodé, un SIRET qui change : si c'est la clé primaire, il faut corriger toutes les tables qui la citent, d'un seul coup.",
            reflexe: "Si elle peut changer, ou si elle est longue, prends un numéro technique en clé primaire. Garde la clé métier à côté, protégée par `UNIQUE`."
          }
        ]
      },
      {
        titre: "Le choix de la clé",
        questions: [
          {
            id: "technique-ou-metier",
            q: "Clé primaire : un numéro technique, ou la clé métier ?",
            pourquoi: "Une clé métier longue (dossier, code, date) se recopie dans chaque table qui la cite et dans chaque index : tout grossit, et chaque jointure compare trois colonnes.",
            reflexe: "Un numéro technique pour les tables de l'entrepôt et des flux. La clé métier seule suffit pour une petite table de codes stables, comme les pays (`FR`, `CH`) ou les devises."
          },
          {
            id: "table-liaison",
            q: "Une table de liaison a-t-elle besoin d'un numéro technique ?",
            pourquoi: "Avec un numéro en plus et rien d'autre, le même couple article-dépôt peut entrer deux fois : le stock est compté en double.",
            reflexe: "La clé composée suffit souvent : `PRIMARY KEY (article_id, depot_id)`, comme dans `stock_depot`. Mets en premier la colonne la plus souvent cherchée seule."
          },
          {
            id: "type-cle",
            q: "Le type du numéro tiendra-t-il toute la vie de la table ?",
            pourquoi: "Un `INT` s'arrête à 2 147 483 647. Sur SQL Server, l'agrandir oblige à retirer la clé primaire et toutes les clés étrangères qui la citent.",
            reflexe: "`INT` pour les clients, les articles et les commandes. `BIGINT` dès le départ pour les mouvements, les journaux et les lignes de flux EDI. Les clés étrangères prennent le même type.",
            moteurs: {
              snowflake: "Pas ce souci : `INT` y est un `NUMBER(38,0)`."
            }
          }
        ]
      },
      {
        titre: "Le compteur automatique",
        questions: [
          {
            id: "qui-numerote",
            q: "Qui donne le numéro : le moteur, ou un calcul maison ?",
            pourquoi: "Un numéro calculé par `MAX(id) + 1` donne le même numéro à deux traitements qui tournent en même temps : doublon, ou insertion refusée.",
            reflexe: "Laisse le moteur numéroter : `IDENTITY` pour une table, ou une séquence (un compteur à part) si plusieurs tables partagent les numéros. Récupère le numéro créé avec la fonction prévue.",
            moteurs: {
              sqlserver: "`IDENTITY(1,1)`, ou `CREATE SEQUENCE` et `NEXT VALUE FOR`. Le numéro créé : `SCOPE_IDENTITY()`.",
              snowflake: "`IDENTITY` ou `AUTOINCREMENT` (synonymes), ou une séquence : `seq_client.NEXTVAL`.",
              mysql: "`AUTO_INCREMENT`, sur une colonne indexée, une seule par table. Le numéro créé : `LAST_INSERT_ID()`."
            }
          },
          {
            id: "trous",
            q: "Des trous dans la numérotation, est-ce grave ?",
            pourquoi: "Un `INSERT` annulé perd son numéro, et SQL Server peut sauter des numéros après un redémarrage. Les trois moteurs laissent des trous : vouloir les combler, c'est réutiliser des numéros déjà cités ailleurs.",
            reflexe: "Pour une clé technique, les trous ne gênent pas : ne les comble jamais. Ne donne aucun sens au numéro : ni ordre exact, ni nombre de lignes."
          },
          {
            id: "numero-legal",
            q: "Ce numéro sert-il aussi de numéro légal, comme celui d'une facture ?",
            pourquoi: "Une facture porte un numéro unique, dans une suite chronologique et continue : c'est la règle française, à faire confirmer par ta comptabilité. Un compteur automatique laisse des trous.",
            reflexe: "Deux numéros : la clé technique, et le numéro de facture, donné par l'ERP ou par une table compteur lue et mise à jour dans la même transaction. `UNIQUE` sur le numéro de facture."
          },
          {
            id: "ordre-numeros",
            q: "Les numéros doivent-ils suivre l'ordre d'arrivée des lignes ?",
            pourquoi: "Par défaut (NOORDER), Snowflake donne des numéros uniques, mais pas toujours croissants. Un chargement qui reprend « au-dessus du dernier numéro lu » rate alors des lignes.",
            reflexe: "Pour reprendre là où un chargement s'est arrêté, ne te fie pas au numéro : prends un stream (le suivi des changements). `IDENTITY ORDER` donne des numéros plus grands que ceux des instructions déjà terminées, au prix d'un peu de vitesse.",
            seulement: ["snowflake"]
          }
        ]
      },
      {
        titre: "Le rangement des lignes",
        questions: [
          {
            id: "index-cluster",
            q: "La clé primaire doit-elle aussi être l'index cluster ?",
            pourquoi: "Par défaut, la `PRIMARY KEY` crée l'index cluster : l'ordre de rangement de la table. Une clé large ou tirée au hasard alourdit tous les autres index, qui la recopient.",
            reflexe: "Clé courte et croissante (`INT IDENTITY`) : laisse-la cluster. Sinon, `PRIMARY KEY NONCLUSTERED`, et l'index cluster sur une colonne plus utile, comme la date d'un journal lu par période.",
            seulement: ["sqlserver"]
          },
          {
            id: "innodb",
            q: "Sur MySQL, la clé primaire est-elle courte ?",
            pourquoi: "InnoDB range les lignes dans l'ordre de la clé primaire, et la recopie dans chaque autre index. Une clé longue grossit tous les index.",
            reflexe: "Un entier `AUTO_INCREMENT` en clé primaire. Sans clé primaire, InnoDB prend le premier `UNIQUE` sur des colonnes `NOT NULL`, ou crée une clé cachée, que tes requêtes ne voient pas.",
            seulement: ["mysql"]
          },
          {
            id: "guid",
            q: "Faut-il un identifiant universel (GUID, ou UUID) ?",
            pourquoi: "Un GUID est un code de 16 octets, unique partout. Tiré au hasard (`NEWID()`), il tombe n'importe où dans l'index : pages coupées en deux, table fragmentée.",
            reflexe: "Seulement si les numéros naissent hors de la base : plusieurs sites, une application mobile, un partenaire. Alors, le GUID en `UNIQUE` et un `INT IDENTITY` en clé cluster ; ou `NEWSEQUENTIALID()` (SQL Server).",
            moteurs: {
              snowflake: "Pas d'index cluster à fragmenter : `UUID_STRING()` convient. Mais un texte de 36 caractères reste plus lourd à joindre qu'un nombre.",
              mysql: "Range-le en `BINARY(16)` avec `UUID_TO_BIN(UUID(), 1)` : 16 octets au lieu de 36, et le 1 met la partie qui change vite à la fin, ce qui aide l'index."
            }
          }
        ]
      },
      {
        titre: "Snowflake : la clé non appliquée",
        questions: [
          {
            id: "non-appliquee",
            q: "Qui empêche les doublons, puisque Snowflake n'applique pas la clé primaire ?",
            pourquoi: "Sur une table standard, `PRIMARY KEY` et `UNIQUE` sont notées, pas appliquées. Un fichier chargé deux fois donne deux fois les mêmes clients, sans erreur.",
            reflexe: "Charge par `MERGE` sur la clé métier, et contrôle après chaque chargement (`GROUP BY … HAVING COUNT(*) > 1`). Déclare quand même la clé : les outils de BI la lisent. Pas de `RELY` (l'optimiseur croirait la clé) sans ce contrôle.",
            seulement: ["snowflake"]
          }
        ]
      },
      {
        titre: "Reprendre des numéros",
        questions: [
          {
            id: "garder-numeros",
            q: "Une reprise de données doit-elle garder les anciens numéros ?",
            pourquoi: "Si les numéros changent, les fichiers, les exports et les tables liées qui citent l'ancien numéro ne retrouvent plus leur ligne.",
            reflexe: "Garde-les si d'autres systèmes les citent. Sinon, renumérote, et garde l'ancien numéro dans une colonne (`ancien_id`) pour refaire les liens.",
            moteurs: {
              sqlserver: "`SET IDENTITY_INSERT integ.client ON;`, l'`INSERT` avec la liste des colonnes, puis `OFF`. Une seule table à la fois par session.",
              snowflake: "Tu peux écrire une valeur dans une colonne `IDENTITY`, mais le compteur ne bouge pas : il peut redonner ce numéro plus tard, sans erreur.",
              mysql: "Écris la valeur : si elle dépasse le compteur, le compteur repart au-dessus."
            }
          },
          {
            id: "repartir",
            q: "Faut-il faire repartir le compteur d'un numéro précis ?",
            pourquoi: "Après une purge ou une reprise, on veut parfois repartir au-dessus des anciens numéros. Repartir sous le plus grand numéro existant crée des doublons, ou des insertions refusées.",
            reflexe: "Repars toujours au-dessus du plus grand numéro : lis d'abord `SELECT MAX(id)`. Fais-le dans le script de reprise, pas à la main.",
            moteurs: {
              sqlserver: "`DBCC CHECKIDENT ('integ.client', RESEED, 5000);` : la ligne suivante reçoit 5000 si la table est neuve ou vidée par `TRUNCATE`, 5001 sinon, même après un `DELETE` de tout.",
              snowflake: "Pas de RESEED, et `ALTER SEQUENCE` ne change pas le départ. Prévois une séquence nommée (`DEFAULT seq_client.NEXTVAL`). Pour repartir : crée `seq_client_2` avec `START = 5001`, puis `ALTER TABLE … ALTER COLUMN id SET DEFAULT seq_client_2.NEXTVAL`.",
              mysql: "`ALTER TABLE integ.client AUTO_INCREMENT = 5001;`. InnoDB ne descend jamais sous le plus grand numéro existant."
            }
          }
        ]
      },
      {
        titre: "Fusions et échanges",
        questions: [
          {
            id: "fusion",
            q: "Deux bases ou deux sociétés seront-elles un jour regroupées ?",
            pourquoi: "Chaque table client a ses numéros 1, 2, 3… Au regroupement, les numéros se chevauchent : des commandes pointent vers le mauvais client, sans erreur.",
            reflexe: "Prévois-le dès la création : la source dans la clé métier (`dossier`). Au regroupement, une table de correspondance ancien numéro → nouveau numéro, pour renuméroter toutes les clés étrangères."
          },
          {
            id: "cle-exposee",
            q: "Le numéro technique sort-il de la base : export, EDI, lien web ?",
            pourquoi: "Un partenaire qui garde ton numéro interne t'interdit ensuite de renuméroter. Une reprise ou une fusion casse ses liens.",
            reflexe: "Échange la clé métier avec l'extérieur : numéro de commande, code client, EAN. Le numéro technique reste pour les jointures internes."
          }
        ]
      }
    ],
    pieges: [
      "Une table sans clé primaire : les doublons entrent sans bruit, et les retirer ensuite prend des jours.",
      "Le numéro de facture tiré d'un `IDENTITY` : un `ROLLBACK` laisse un trou dans une suite qui doit être continue.",
      "`MAX(id) + 1` pour numéroter : deux traitements qui tournent en même temps prennent le même numéro.",
      "Un GUID tiré au hasard en clé cluster (SQL Server) : chaque insertion tombe au milieu de la table, qui se fragmente.",
      "Croire que `PRIMARY KEY` bloque les doublons sur Snowflake : sur une table standard, elle est notée, pas appliquée.",
      "`DBCC CHECKIDENT … RESEED` sous le plus grand numéro : les insertions suivantes plantent sur la clé primaire (erreur 2627).",
      "Le code client seul comme clé, avec deux dossiers Divalto : le C001 de la seconde société est rejeté, ou il écrase celui de la première.",
      "Un `INT` pour une table de mouvements : le jour où il déborde, toutes les insertions plantent, et l'agrandir oblige à retirer les clés."
    ],
    pratique: "Sur des données Divalto, regarde d'abord comment l'ERP identifie une ligne. Une pièce se trouve par le dossier, le type de tiers, le type de pièce et le numéro (`DOS`, `TICOD`, `PICOD`, `PINO`), jamais par `PINO` seul.",
    motsCles: ["clé primaire", "primary key", "identifiant", "id", "identity", "auto_increment", "autoincrement", "séquence", "guid", "repartir", "clé métier", "compteur", "numéro technique", "reseed", "identity_insert"],
    voirAussi: ["creer-table", "relier-tables", "choisir-types", "doublons", "migrer", "fusionner", "inserer"],
    dico: ["primary-key", "identity", "unique", "uniqueidentifier", "int", "bigint", "having", "merge"],
    outils: ["astuces"],
    sources: [
      { titre: "IDENTITY (propriété) (Transact-SQL)", url: "https://learn.microsoft.com/fr-fr/sql/t-sql/statements/create-table-transact-sql-identity-property" },
      { titre: "SET IDENTITY_INSERT (Transact-SQL)", url: "https://learn.microsoft.com/fr-fr/sql/t-sql/statements/set-identity-insert-transact-sql" },
      { titre: "DBCC CHECKIDENT (Transact-SQL)", url: "https://learn.microsoft.com/fr-fr/sql/t-sql/database-console-commands/dbcc-checkident-transact-sql" },
      { titre: "NEWSEQUENTIALID (Transact-SQL)", url: "https://learn.microsoft.com/fr-fr/sql/t-sql/functions/newsequentialid-transact-sql" },
      { titre: "Snowflake : CREATE TABLE (AUTOINCREMENT, ORDER, NOORDER)", url: "https://docs.snowflake.com/en/sql-reference/sql/create-table" },
      { titre: "Snowflake : les séquences", url: "https://docs.snowflake.com/en/user-guide/querying-sequences" },
      { titre: "MySQL 8.4 : AUTO_INCREMENT dans InnoDB", url: "https://dev.mysql.com/doc/refman/8.4/en/innodb-auto-increment-handling.html" },
      { titre: "MySQL 8.4 : index cluster et index secondaires", url: "https://dev.mysql.com/doc/refman/8.4/en/innodb-index-types.html" }
    ]
  },
  {
    id: "relier-tables",
    titre: "Je relie deux tables",
    famille: "Concevoir",
    resume: "Relier deux tables : la cardinalité, la clé étrangère et ses types, la suppression du parent, l'index, l'ordre de chargement, les contraintes désactivées, le lien vers soi-même, Snowflake.",
    besoins: [
      "je relie deux tables",
      "créer une clé étrangère entre deux tables",
      "comment faire une relation un à plusieurs",
      "lien plusieurs à plusieurs avec une table de liaison"
    ],
    essais: [
      "foreign key on delete cascade danger",
      "relation entre la commande et ses lignes",
      "references vers la table client"
    ],
    exemple: {
      texte: "Une commande a plusieurs lignes, et chaque ligne cite un article. Tu relies `ligne_cde` à `commande` et à `article` par des clés étrangères : une clé étrangère est une colonne dont chaque valeur doit exister dans la clé d'une autre table. Voici la table, avec l'index de chaque lien.",
      code: "CREATE TABLE dbo.ligne_cde (\n  id         INT IDENTITY(1,1) NOT NULL,\n  cde_id     INT           NOT NULL,   -- même type que commande.id\n  article_id INT           NOT NULL,   -- même type que article.id\n  qte        INT           NOT NULL,\n  prix_unit  DECIMAL(10,2) NOT NULL,\n  CONSTRAINT pk_ligne_cde PRIMARY KEY (id),\n  CONSTRAINT fk_ligne_cde_commande FOREIGN KEY (cde_id) REFERENCES dbo.commande (id),\n  CONSTRAINT fk_ligne_cde_article FOREIGN KEY (article_id) REFERENCES dbo.article (id)\n);\nCREATE INDEX ix_ligne_cde_cde_id ON dbo.ligne_cde (cde_id);           -- SQL Server ne le crée pas seul\nCREATE INDEX ix_ligne_cde_article_id ON dbo.ligne_cde (article_id);",
      codes: {
        snowflake: "CREATE TABLE ventes.ligne_cde (\n  id         NUMBER(38,0) IDENTITY,\n  cde_id     NUMBER(38,0) NOT NULL,\n  article_id NUMBER(38,0) NOT NULL,\n  qte        NUMBER(10,0) NOT NULL,\n  prix_unit  NUMBER(10,2) NOT NULL,\n  CONSTRAINT pk_ligne_cde PRIMARY KEY (id),\n  CONSTRAINT fk_ligne_cde_commande FOREIGN KEY (cde_id) REFERENCES ventes.commande (id),     -- notée, pas appliquée\n  CONSTRAINT fk_ligne_cde_article FOREIGN KEY (article_id) REFERENCES ventes.article (id)\n);\n-- Après chaque chargement : les lignes sans commande (0 attendue)\nSELECT l.id FROM ventes.ligne_cde AS l\nWHERE NOT EXISTS (SELECT 1 FROM ventes.commande AS c WHERE c.id = l.cde_id);",
        mysql: "CREATE TABLE ligne_cde (\n  id         INT           NOT NULL AUTO_INCREMENT,\n  cde_id     INT           NOT NULL,\n  article_id INT           NOT NULL,\n  qte        INT           NOT NULL,\n  prix_unit  DECIMAL(10,2) NOT NULL,\n  CONSTRAINT pk_ligne_cde PRIMARY KEY (id),\n  CONSTRAINT fk_ligne_cde_commande FOREIGN KEY (cde_id) REFERENCES commande (id),   -- index créé seul\n  CONSTRAINT fk_ligne_cde_article FOREIGN KEY (article_id) REFERENCES article (id)\n) ENGINE = InnoDB;"
      }
    },
    etapes: [
      {
        titre: "La cardinalité",
        questions: [
          {
            id: "cardinalite",
            q: "Pour une ligne d'un côté, combien de lignes de l'autre ?",
            pourquoi: "C'est la cardinalité du lien. Se tromper de sens met la clé du mauvais côté : une commande n'aurait plus qu'une ligne, ou une ligne plusieurs commandes.",
            reflexe: "Dis-le en deux phrases : « une commande a plusieurs lignes » et « une ligne appartient à une seule commande ». Lien un à plusieurs : la clé étrangère va du côté « plusieurs », dans `ligne_cde`."
          },
          {
            id: "plusieurs-plusieurs",
            q: "Le lien est-il plusieurs à plusieurs ?",
            pourquoi: "Un article a plusieurs fournisseurs, un fournisseur plusieurs articles. Une colonne `fournisseur_id` dans `article` n'en garde qu'un ; une liste 'F01;F02' dans une case ne se joint pas.",
            reflexe: "Une table de liaison : `article_fournisseur (article_id, fournisseur_id)`, avec la clé primaire sur les deux colonnes et ses propres données : prix d'achat, délai, référence chez le fournisseur."
          },
          {
            id: "un-a-un",
            q: "Le lien est-il un à un ?",
            pourquoi: "Deux tables pour une seule chose : chaque lecture paie une jointure, et rien n'empêche deux lignes pour le même client.",
            reflexe: "Souvent, une seule table suffit. Garde une table à part si une partie est rare, lourde ou sensible, comme la fiche technique d'un article : une clé étrangère et un `UNIQUE` sur la même colonne."
          },
          {
            id: "facultatif",
            q: "Le lien est-il obligatoire, ou facultatif ?",
            pourquoi: "La clé étrangère ne vérifie pas une case vide (NULL) : une colonne de lien qui accepte NULL laisse entrer une commande sans client.",
            reflexe: "Obligatoire : `NOT NULL` et une clé étrangère. Facultatif, comme `flux_edi.cde_id` (un flux rejeté n'a pas de commande) : NULL permis, et les rapports joignent en `LEFT JOIN`."
          }
        ]
      },
      {
        titre: "La clé étrangère",
        questions: [
          {
            id: "declarer",
            q: "Déclares-tu la clé étrangère, ou seulement la colonne ?",
            pourquoi: "Une colonne `client_id` sans contrainte accepte le client 99, qui n'existe pas. Un rapport en `INNER JOIN` perd ensuite cette commande, sans erreur.",
            reflexe: "`CONSTRAINT fk_commande_client FOREIGN KEY (client_id) REFERENCES client (id)`. Elle pointe vers la clé primaire du parent, ou vers une colonne `UNIQUE`.",
            moteurs: {
              snowflake: "Notée, pas appliquée : le client 99 entre. Déclare-la quand même : les outils de BI la lisent.",
              mysql: "Écris-la à part (`FOREIGN KEY … REFERENCES`) : un `REFERENCES` collé à la colonne est ignoré, sans message."
            }
          },
          {
            id: "memes-types",
            q: "Les deux colonnes ont-elles exactement le même type ?",
            pourquoi: "SQL Server refuse une clé étrangère `INT` vers un `BIGINT`. Et une jointure entre deux types différents force une conversion, qui peut empêcher l'index de servir.",
            reflexe: "Même type, même longueur, même collation (la règle de comparaison des textes) des deux côtés : `cde_id INT` pour `commande.id INT`, `code_article VARCHAR(20)` dans toutes les tables.",
            moteurs: {
              mysql: "Mêmes taille et signe pour les entiers et les décimaux ; même jeu de caractères et même collation pour les textes. Seule la longueur d'un texte peut différer."
            }
          },
          {
            id: "meme-base",
            q: "Les deux tables sont-elles dans la même base ?",
            pourquoi: "SQL Server ne relie par clé étrangère que des tables d'une même base. Ta table EDI ne peut pas pointer vers les clients de la base Divalto.",
            reflexe: "Contrôle ce lien par une requête après chaque chargement (`NOT EXISTS`), ou copie la table de référence dans ta base et relie-la.",
            seulement: ["sqlserver"]
          },
          {
            id: "cle-composee",
            q: "La clé du parent a-t-elle plusieurs colonnes ?",
            pourquoi: "Joindre sur une partie de la clé multiplie les lignes. Dans Divalto, le numéro de pièce (`PINO`) sans le dossier ni les types de pièce mélange des pièces différentes.",
            reflexe: "La clé étrangère reprend toutes les colonnes, dans l'ordre de la clé du parent : `FOREIGN KEY (dossier, code_client) REFERENCES client (dossier, code_client)`. Ou relie par un numéro technique."
          }
        ]
      },
      {
        titre: "Supprimer le parent",
        questions: [
          {
            id: "on-delete",
            q: "Que deviennent les lignes quand on supprime le parent ?",
            pourquoi: "Par défaut (`NO ACTION`), supprimer une commande qui a des lignes est refusé. Avec `ON DELETE CASCADE`, les lignes partent avec elle, sans message.",
            reflexe: "Garde le refus par défaut presque partout : on n'efface pas l'histoire d'une commande. `CASCADE` pour une dépendance sans valeur seule ; `SET NULL` seulement si perdre le lien est acceptable.",
            moteurs: {
              snowflake: "Rien n'est appliqué sur une table standard : ni refus, ni cascade. Supprime toi-même les lignes enfants. Et avec `ON DELETE CASCADE` écrit, Snowflake ne crée même pas la clé étrangère (selon sa doc) : garde le défaut."
            }
          },
          {
            id: "cascade",
            q: "Une cascade peut-elle effacer plus que prévu ?",
            pourquoi: "Les cascades s'enchaînent : supprimer un client efface ses commandes, puis leurs lignes. Une erreur de `WHERE`, et l'historique des ventes disparaît.",
            reflexe: "Pas de cascade vers des données comptables ou historiques. Pour retirer un client, préfère une marque : `est_actif = 0`, une suppression logique.",
            moteurs: {
              sqlserver: "Deux chemins de cascade vers une même table, ou une boucle, sont refusés à la création (erreur 1785).",
              mysql: "Une suppression en cascade ne déclenche pas les triggers des tables enfants : ta table d'audit ne voit rien."
            }
          },
          {
            id: "on-update",
            q: "La clé du parent peut-elle changer ?",
            pourquoi: "Si elle change, chaque ligne qui la cite doit suivre. Sans `ON UPDATE CASCADE`, la modification est refusée ; avec, elle réécrit des milliers de lignes.",
            reflexe: "Évite le cas : relie par un numéro technique qui ne change jamais. Le code métier peut alors changer sans toucher aux lignes."
          }
        ]
      },
      {
        titre: "L'index",
        questions: [
          {
            id: "index-fk",
            q: "La colonne de la clé étrangère a-t-elle un index ?",
            pourquoi: "Sans index, chaque jointure de `commande` vers `ligne_cde` lit toutes les lignes. Et supprimer une commande oblige à tout lire, pour vérifier qu'aucune ligne ne la cite.",
            reflexe: "Un index sur chaque colonne de clé étrangère, sauf sur une toute petite table : `CREATE INDEX ix_ligne_cde_cde_id ON ligne_cde (cde_id)`. Le détail : « Je crée un index ».",
            moteurs: {
              sqlserver: "La clé étrangère ne crée pas d'index : crée-le toi-même.",
              snowflake: "Pas d'index à créer pour une jointure : Snowflake lit par micro-partitions (des blocs). Très grosse table, jointe souvent : une clé de clustering (l'ordre de rangement choisi).",
              mysql: "InnoDB crée l'index s'il manque."
            }
          }
        ]
      },
      {
        titre: "Charger et vider",
        questions: [
          {
            id: "ordre-chargement",
            q: "Dans quel ordre charger et vider les tables liées ?",
            pourquoi: "Avec des clés étrangères, charger les lignes avant leurs commandes est refusé. Vider `commande` avant `ligne_cde` aussi.",
            reflexe: "Charge les parents d'abord : client et article, puis commande, puis ligne_cde. Vide dans l'ordre inverse. Écris cet ordre dans le script du chargement.",
            moteurs: {
              sqlserver: "`TRUNCATE TABLE` est refusé sur une table citée par une clé étrangère : utilise `DELETE`, ou retire la clé le temps du chargement.",
              mysql: "`TRUNCATE TABLE` est refusé aussi sur une table citée par la clé étrangère d'une autre table."
            }
          },
          {
            id: "desactiver",
            q: "Faut-il désactiver une contrainte pendant un gros chargement ?",
            pourquoi: "Désactivée, la clé laisse entrer des lignes orphelines, sans parent. Réactivée sans contrôle, elle ne vérifie pas ce qui est entré entre-temps.",
            reflexe: "Évite-le si tu peux. Sinon, réactive-la en vérifiant l'existant, et traite les orphelins avant de livrer.",
            moteurs: {
              sqlserver: "`ALTER TABLE ligne_cde WITH CHECK CHECK CONSTRAINT fk_ligne_cde_commande;` Sans `WITH CHECK`, la clé reste « non approuvée » (`is_not_trusted = 1`) : l'optimiseur l'ignore.",
              mysql: "`SET foreign_key_checks = 1` ne relit pas les lignes entrées pendant la coupure : cherche les orphelins toi-même."
            },
            code: "-- SQL Server : les clés étrangères non approuvées\nSELECT name FROM sys.foreign_keys WHERE is_not_trusted = 1;"
          }
        ]
      },
      {
        titre: "Le lien vers soi-même",
        questions: [
          {
            id: "auto-reference",
            q: "Une table pointe-t-elle vers elle-même : nomenclature, maison mère ?",
            pourquoi: "Dans `nomenclature`, un composant peut être lui-même composé. KIT-COUV contient BACHE8, et BACHE8 contient KIT-COUV : une boucle. Aucune clé ne l'empêche, et une requête récursive tourne en rond jusqu'à sa limite.",
            reflexe: "Interdis le cas direct : `CHECK (compose <> composant)`. Cherche les boucles après chaque mise à jour : ci-dessous, celles à deux niveaux. Une boucle plus longue demande une requête récursive.",
            moteurs: {
              sqlserver: "`ON DELETE CASCADE` y est refusé : la cascade pourrait boucler (erreur 1785).",
              mysql: "Une colonne peut pointer vers une autre colonne de la même table, jamais vers elle-même."
            },
            code: "SELECT a.compose, a.composant\nFROM nomenclature AS a\nJOIN nomenclature AS b\n  ON b.compose = a.composant AND b.composant = a.compose\nWHERE a.compose < a.composant;   -- BACHE8 et KIT-COUV"
          }
        ]
      },
      {
        titre: "Snowflake : contrôler soi-même",
        questions: [
          {
            id: "orphelins",
            q: "Qui vérifie les liens, puisque Snowflake n'applique pas la clé étrangère ?",
            pourquoi: "Une ligne peut citer une commande absente. Le total des lignes et le même total en `INNER JOIN` ne collent plus : deux rapports Power BI se contredisent.",
            reflexe: "Après chaque chargement, cherche les orphelins avec `NOT EXISTS` : 0 ligne attendue. Sinon, le chargement s'arrête et prévient.",
            seulement: ["snowflake"],
            code: "SELECT l.id\nFROM ventes.ligne_cde AS l\nWHERE NOT EXISTS (SELECT 1 FROM ventes.commande AS c\n                  WHERE c.id = l.cde_id);"
          },
          {
            id: "rely",
            q: "Faut-il poser RELY sur la clé étrangère ?",
            pourquoi: "Avec `RELY`, l'optimiseur croit la clé juste et peut supprimer une jointure. S'il existe des orphelins, le résultat change, sans erreur.",
            reflexe: "`RELY` seulement si le contrôle des orphelins tourne à chaque chargement, et sur les deux contraintes : la clé primaire et la clé étrangère. Sinon, laisse `NORELY`, le défaut.",
            seulement: ["snowflake"]
          }
        ]
      },
      {
        titre: "Les liens dans Power BI",
        questions: [
          {
            id: "power-bi",
            q: "Power BI retrouvera-t-il les liens tout seul ?",
            pourquoi: "Sans clé déclarée, Power BI devine les relations d'après les noms des colonnes, ou ne les trouve pas. Une relation mal devinée fausse tous les totaux.",
            reflexe: "Déclare les clés étrangères : au premier chargement, Power BI les reprend en relations (option cochée par défaut). Vérifie quand même chaque relation dans la vue Modèle."
          }
        ]
      }
    ],
    pieges: [
      "Une colonne de lien sans clé étrangère : des commandes pour des clients qui n'existent pas, perdues sans bruit par chaque `INNER JOIN`.",
      "`ON DELETE CASCADE` posé « pour simplifier » : la suppression d'un client efface ses commandes et leurs lignes.",
      "Pas d'index sur la clé étrangère (SQL Server) : jointures lentes, et chaque suppression d'une commande lit toute la table des lignes.",
      "`NOCHECK` puis `CHECK CONSTRAINT` sans `WITH CHECK` : la clé revient, mais l'existant n'est pas vérifié, et elle reste « non approuvée ».",
      "Une liste de codes dans une case ('F01;F02') au lieu d'une table de liaison : impossible à joindre, à contrôler et à compter.",
      "Sur Snowflake, croire que la clé étrangère bloque les orphelins : elle est notée, pas appliquée.",
      "Joindre sur une partie de la clé (le numéro de pièce sans le dossier) : les lignes se multiplient, et les totaux doublent.",
      "Une boucle dans une nomenclature : une requête récursive sans garde-fou ne s'arrête pas (SQL Server : erreur 530 à 100 niveaux)."
    ],
    pratique: "Dans Divalto, une ligne de pièce (`MOUV`) n'a pas de champ `PINO` : elle rejoint son en-tête par le numéro de l'étape (`DVNO`, `CDNO`, `BLNO`, `FANO`). Écris ces jointures une fois, dans une vue, et réutilise-la.",
    motsCles: ["clé étrangère", "foreign key", "relation", "lien", "relier", "un à plusieurs", "plusieurs à plusieurs", "table de liaison", "cardinalité", "on delete cascade", "orphelin", "references", "nocheck", "parent", "enfant"],
    voirAussi: ["cle-primaire", "creer-table", "creer-index", "joindre", "supprimer", "importer-fichier", "donnees-powerbi"],
    dico: ["foreign-key", "primary-key", "create-index", "left-join", "inner-join", "exists", "cte-recursive", "truncate", "delete"],
    outils: ["astuces"],
    sources: [
      { titre: "SQL Server : contraintes de clé primaire et de clé étrangère", url: "https://learn.microsoft.com/fr-fr/sql/relational-databases/tables/primary-and-foreign-key-constraints" },
      { titre: "CREATE TABLE (Transact-SQL)", url: "https://learn.microsoft.com/fr-fr/sql/t-sql/statements/create-table-transact-sql" },
      { titre: "ALTER TABLE (Transact-SQL)", url: "https://learn.microsoft.com/fr-fr/sql/t-sql/statements/alter-table-transact-sql" },
      { titre: "SQL Server : erreur 1785", url: "https://learn.microsoft.com/fr-fr/sql/relational-databases/errors-events/mssqlserver-1785-database-engine-error" },
      { titre: "Snowflake : les contraintes", url: "https://docs.snowflake.com/en/sql-reference/constraints-overview" },
      { titre: "Snowflake : supprimer les jointures inutiles (RELY)", url: "https://docs.snowflake.com/en/user-guide/join-elimination" },
      { titre: "MySQL 8.4 : FOREIGN KEY", url: "https://dev.mysql.com/doc/refman/8.4/en/create-table-foreign-keys.html" },
      { titre: "Power BI : créer et gérer des relations", url: "https://learn.microsoft.com/fr-fr/power-bi/transform-model/desktop-create-and-manage-relationships" }
    ]
  },
  {
    id: "choisir-types",
    titre: "Je choisis le type de chaque colonne",
    famille: "Concevoir",
    resume: "Le bon type pour chaque valeur : montants, quantités, taux, dates et fuseaux, textes, vrai/faux, listes, avec les mêmes types partout et la place prise.",
    besoins: [
      "je choisis le type de chaque colonne",
      "quel type de données pour un montant",
      "decimal ou float pour les prix",
      "quel type pour une date ou un vrai faux"
    ],
    essais: [
      "type de colonne pour un code postal avec un zéro devant",
      "varchar ou nvarchar pour les noms des clients",
      "datetime2 ou datetime pour l'heure de reception"
    ],
    exemple: {
      texte: "Tu crées la table des factures fournisseurs reçues par EDI (messages INVOIC) : numéro, EAN, fournisseur, dates, quantité, montant, devise, TVA, payée ou non. Chaque colonne reçoit le type de sa valeur, pas celui du fichier reçu. Voici le résultat.",
      code: "CREATE TABLE edi.facture_fourn (\n  id          INT IDENTITY(1,1) NOT NULL,\n  num_fact    VARCHAR(35)   NOT NULL,   -- un code : du texte, même s'il n'a que des chiffres\n  ean_article CHAR(13)      NOT NULL,   -- 13 chiffres, zéros devant gardés\n  fournisseur NVARCHAR(70)  NOT NULL,   -- des noms étrangers : Unicode\n  date_fact   DATE          NOT NULL,   -- un jour, sans heure\n  recu_le     DATETIME2(0)  NOT NULL,   -- date et heure, à la seconde\n  qte         DECIMAL(12,3) NOT NULL,   -- une quantité peut avoir des décimales (kg)\n  unite       VARCHAR(3)    NOT NULL,   -- l'unité de la quantité : PCE, KGM\n  montant_ht  DECIMAL(18,2) NOT NULL,   -- de l'argent : exact, jamais FLOAT\n  devise      CHAR(3)       NOT NULL,   -- code ISO : EUR, CHF\n  taux_tva_pct DECIMAL(5,2) NOT NULL,   -- 20.00 veut dire 20 %\n  est_payee   BIT           NOT NULL CONSTRAINT df_facture_fourn_payee DEFAULT 0,\n  CONSTRAINT pk_facture_fourn PRIMARY KEY (id)\n);",
      codes: {
        snowflake: "CREATE TABLE edi.facture_fourn (\n  id           NUMBER(38,0) IDENTITY,\n  num_fact     VARCHAR(35)   NOT NULL,\n  ean_article  VARCHAR(13)   NOT NULL,      -- CHAR y est un VARCHAR\n  fournisseur  VARCHAR(70)   NOT NULL,      -- toujours Unicode (UTF-8)\n  date_fact    DATE          NOT NULL,\n  recu_le      TIMESTAMP_NTZ(0) NOT NULL,   -- ou TIMESTAMP_TZ si plusieurs fuseaux\n  qte          NUMBER(12,3)  NOT NULL,\n  unite        VARCHAR(3)    NOT NULL,\n  montant_ht   NUMBER(18,2)  NOT NULL,\n  devise       VARCHAR(3)    NOT NULL,\n  taux_tva_pct NUMBER(5,2)   NOT NULL,\n  est_payee    BOOLEAN       NOT NULL DEFAULT FALSE,\n  CONSTRAINT pk_facture_fourn PRIMARY KEY (id)\n);",
        mysql: "CREATE TABLE facture_fourn (\n  id           INT           NOT NULL AUTO_INCREMENT,\n  num_fact     VARCHAR(35)   NOT NULL,\n  ean_article  CHAR(13)      NOT NULL,\n  fournisseur  VARCHAR(70)   NOT NULL,      -- utf8mb4 : tous les alphabets\n  date_fact    DATE          NOT NULL,\n  recu_le      DATETIME      NOT NULL,      -- date et heure, sans fuseau\n  qte          DECIMAL(12,3) NOT NULL,\n  unite        VARCHAR(3)    NOT NULL,\n  montant_ht   DECIMAL(18,2) NOT NULL,\n  devise       CHAR(3)       NOT NULL,\n  taux_tva_pct DECIMAL(5,2)  NOT NULL,\n  est_payee    BOOLEAN       NOT NULL DEFAULT FALSE,   -- = TINYINT(1)\n  CONSTRAINT pk_facture_fourn PRIMARY KEY (id)\n) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;"
      }
    },
    etapes: [
      {
        titre: "La nature de la valeur",
        questions: [
          {
            id: "nature",
            q: "Que contient vraiment la colonne : montant, quantité, code, date, ou vrai/faux ?",
            pourquoi: "Le type se choisit selon la valeur, pas selon le fichier reçu. Un fichier Excel donne souvent des nombres à virgule approchés et des dates en texte : recopiés tels quels, les types sont faux pour toujours.",
            reflexe: "Pour chaque colonne, écris sa nature, son unité et un exemple réel : « montant HT en euros, 1 290,00 ». Le type en découle."
          },
          {
            id: "calcul",
            q: "Fera-t-on un calcul avec cette valeur ?",
            pourquoi: "Un SIREN, un EAN, un code postal ne se calculent jamais. Rangés en nombre, ils perdent leurs zéros devant : le code postal 01200 devient 1200.",
            reflexe: "Pas de calcul, donc du texte : `CHAR(9)` pour un SIREN, `CHAR(13)` pour un EAN, `VARCHAR(10)` pour un code postal étranger."
          }
        ]
      },
      {
        titre: "Les nombres",
        questions: [
          {
            id: "montants",
            q: "Les montants sont-ils dans un type exact ?",
            pourquoi: "`FLOAT` range les nombres de façon approchée : les totaux de factures dérivent de quelques centimes, et le rapprochement avec la comptabilité ne tombe plus juste.",
            reflexe: "`DECIMAL(18,2)` pour un montant, `DECIMAL(19,4)` pour un prix unitaire fin ou un taux de change. Jamais `FLOAT` ni `REAL` pour de l'argent. Garde la devise à côté : `devise CHAR(3)` (EUR, CHF).",
            moteurs: {
              sqlserver: "`MONEY` existe (4 décimales fixes), mais ses calculs restent à 4 décimales : préfère `DECIMAL`.",
              snowflake: "`NUMBER(18,2)` : la précision ne change pas la place prise, seule l'échelle (le nombre de décimales) compte.",
              mysql: "`DECIMAL(18,2)`. Un `FLOAT` n'y garde qu'environ 7 chiffres."
            }
          },
          {
            id: "precision",
            q: "Combien de chiffres en tout, et combien après la virgule ?",
            pourquoi: "`DECIMAL(5,2)` s'arrête à 999,99 : la grosse facture plante. Et `DECIMAL` sans parenthèses ne garde aucune décimale : 19,90 devient 20, sans erreur.",
            reflexe: "Prends le plus gros montant possible, puis ajoute de la marge : `DECIMAL(18,2)` monte à près de 10 millions de milliards. Écris toujours les deux nombres."
          },
          {
            id: "quantites",
            q: "Les quantités peuvent-elles avoir des décimales, ou être négatives ?",
            pourquoi: "En entier, 2,5 kg perd sa décimale, souvent sans erreur : le stock et la facture deviennent faux. En `TINYINT` (SQL Server), un avoir de -3 est refusé, et le flux EDI s'arrête.",
            reflexe: "Des pièces : `INT`. Des poids, des longueurs, des volumes : `DECIMAL(12,3)`. Et toujours l'unité à côté (`unite` : PCE, KGM) : 10 cartons ne font pas 10 pièces.",
            moteurs: {
              sqlserver: "2,5 rangé en `INT` devient 2 : la décimale est coupée, sans erreur.",
              snowflake: "2,5 rangé en `INT` (`NUMBER(38,0)`) devient 3 : il est arrondi, sans erreur.",
              mysql: "2,5 rangé en `INT` devient 3 : il est arrondi, sans erreur, même en mode strict."
            }
          },
          {
            id: "taux",
            q: "Un taux s'écrit-il 20 ou 0,20 ?",
            pourquoi: "Si une table range 20 et une autre 0,20, un calcul de TVA donne un montant 100 fois trop grand, ou 100 fois trop petit.",
            reflexe: "Décide une fois, et dis-le dans le nom : `taux_tva_pct DECIMAL(5,2)` pour 20,00, ou `taux_tva DECIMAL(5,4)` pour 0,2000."
          }
        ]
      },
      {
        titre: "Les dates",
        questions: [
          {
            id: "jour-ou-heure",
            q: "Faut-il le jour seul, ou aussi l'heure ?",
            pourquoi: "Une date de commande rangée avec l'heure rate un filtre sur le jour dès qu'une heure existe. Une heure de réception rangée en `DATE` perd l'ordre d'arrivée des messages.",
            reflexe: "Le jour seul : `DATE`. Le jour et l'heure : un type date et heure, à la seconde. Jamais une date rangée en texte.",
            moteurs: {
              sqlserver: "`DATETIME2(0)` : à la seconde, sur 6 octets. Évite `DATETIME` pour du neuf : arrondi au 1/300 de seconde, sur 8 octets.",
              snowflake: "`TIMESTAMP_NTZ(0)` : sans fuseau, comme `DATETIME2`. `TIMESTAMP` seul vaut NTZ par défaut (paramètre `TIMESTAMP_TYPE_MAPPING`).",
              mysql: "`DATETIME` pour une date métier. `TIMESTAMP` est converti en UTC et s'arrête en 2038 : garde-le pour un horodatage technique."
            }
          },
          {
            id: "fuseau",
            q: "Les heures viennent-elles de plusieurs fuseaux horaires ?",
            pourquoi: "Un message d'un partenaire suisse et un autre de Montréal, rangés sans fuseau, ne se comparent plus : l'ordre d'arrivée devient faux. Et en heure de Paris, 2 h 30 existe deux fois la nuit du passage à l'heure d'hiver.",
            reflexe: "Range en UTC, ou avec le décalage (+02:00). Convertis en heure de Paris seulement à l'affichage.",
            moteurs: {
              sqlserver: "`DATETIMEOFFSET` garde le décalage ; ou `DATETIME2` en UTC, rempli par `SYSUTCDATETIME()`.",
              snowflake: "`TIMESTAMP_TZ` garde le décalage de chaque valeur ; `TIMESTAMP_LTZ` range en UTC et affiche au fuseau de la session.",
              mysql: "Pas de type avec décalage : `DATETIME` en UTC, plus une colonne pour le fuseau d'origine si besoin."
            }
          },
          {
            id: "date-inconnue",
            q: "Comment noter une date pas encore connue, ou sans fin ?",
            pourquoi: "Une fausse date, comme '1900-01-01', passe pour une vraie : les délais moyens et les anciennetés deviennent absurdes, sans erreur.",
            reflexe: "NULL pour « pas encore connue », comme une livraison à venir. Pour « sans fin », une date haute fixée par une règle commune : '9999-12-31'.",
            moteurs: {
              sqlserver: "`SMALLDATETIME` refuse '9999-12-31' : il s'arrête en 2079.",
              mysql: "`TIMESTAMP` refuse '9999-12-31' : il s'arrête en 2038."
            }
          }
        ]
      },
      {
        titre: "Les textes",
        questions: [
          {
            id: "longueur",
            q: "Quelle longueur maximale pour chaque texte ?",
            pourquoi: "Trop courte, l'insertion plante : un nom de 41 caractères dans un `VARCHAR(40)`. Et `VARCHAR` sans longueur ne garde qu'un seul caractère sur SQL Server.",
            reflexe: "Prends la longueur de la source, avec un peu de marge : le champ de Divalto, la norme EDI (35 caractères pour un numéro de document EDIFACT). Écris toujours la longueur.",
            moteurs: {
              snowflake: "La longueur ne change ni la place ni la vitesse : mets la vraie quand même, c'est un contrôle de plus.",
              mysql: "`VARCHAR` exige une longueur, comptée en caractères."
            }
          },
          {
            id: "char-ou-varchar",
            q: "Longueur fixe (`CHAR`) ou variable (`VARCHAR`) ?",
            pourquoi: "Sur SQL Server, `CHAR(10)` complète par des espaces : 'AB' devient 'AB' suivi de 8 espaces, et une concaténation ou un `LIKE` réservent des surprises.",
            reflexe: "`CHAR` seulement pour un code de longueur toujours égale : pays `CHAR(2)`, devise `CHAR(3)`, EAN `CHAR(13)`. Tout le reste en `VARCHAR`.",
            moteurs: {
              snowflake: "`CHAR` y est un `VARCHAR` : aucun espace ajouté.",
              mysql: "`CHAR` est complété à l'écriture, mais les espaces de fin sont retirés à la lecture."
            }
          },
          {
            id: "unicode",
            q: "Le texte peut-il contenir des lettres d'autres alphabets ?",
            pourquoi: "Dans un type qui ne les connaît pas, les lettres de 'Łódź' sont remplacées à l'enregistrement, sans erreur. Le nom du client polonais est abîmé pour de bon.",
            reflexe: "Noms, adresses, libellés venus de l'extérieur : un type Unicode. Codes internes sans accent : un texte simple suffit.",
            moteurs: {
              sqlserver: "`NVARCHAR` (2 octets par caractère courant), ou `VARCHAR` avec une collation (règle de texte) `_UTF8`, depuis SQL Server 2019. Écris les valeurs avec N devant : `N'Łódź'`.",
              snowflake: "Tout texte y est déjà en UTF-8.",
              mysql: "`utf8mb4`, le jeu par défaut, garde tout. Évite `NVARCHAR` : il donne de l'utf8mb3."
            }
          },
          {
            id: "texte-long",
            q: "Le texte peut-il dépasser quelques milliers de caractères ?",
            pourquoi: "Un message EDI brut ou un commentaire libre ne tient pas dans un `VARCHAR(255)`. À l'inverse, sur SQL Server, un code en `VARCHAR(MAX)` ne peut plus être la clé d'un index.",
            reflexe: "Un type long seulement pour un texte long. Pour du JSON ou un message entier, le détail : « Je stocke du JSON ou un message brut ».",
            moteurs: {
              sqlserver: "`VARCHAR(MAX)` ou `NVARCHAR(MAX)`, jusqu'à 2 Go.",
              snowflake: "`VARCHAR` sans longueur : 16 777 216 caractères.",
              mysql: "`TEXT` s'arrête à 65 535 octets : prends `MEDIUMTEXT` (16 Mo) pour un gros message."
            }
          }
        ]
      },
      {
        titre: "Vrai/faux et listes",
        questions: [
          {
            id: "vrai-faux",
            q: "Une colonne vrai/faux : quel type, et peut-elle être vide ?",
            pourquoi: "Sans `NOT NULL`, la colonne a trois états. `WHERE est_payee = 0` oublie les lignes à NULL : le total des factures impayées est faux.",
            reflexe: "`NOT NULL` avec une valeur par défaut, et un nom qui se lit comme une question : `est_payee`, `est_actif`.",
            moteurs: {
              sqlserver: "`BIT` : 1, 0 ou NULL. Toute valeur non nulle devient 1, même -3.",
              snowflake: "`BOOLEAN` : TRUE, FALSE ou NULL.",
              mysql: "`BOOLEAN` est un `TINYINT(1)` : 2 est accepté sans erreur, et `= TRUE` ne le trouve pas."
            }
          },
          {
            id: "liste-valeurs",
            q: "Une colonne qui n'accepte que quelques valeurs, comme un statut : quel type ?",
            pourquoi: "En texte libre, le statut finit en 'PAYEE', 'Payée' et 'PAYE' : le rapport par statut se coupe en trois.",
            reflexe: "Un `VARCHAR` court et un `CHECK (statut IN (…))`, ou une table de référence si la liste bouge. Des codes lisibles ('PAYEE'), pas des chiffres sans sens (1, 2, 3).",
            moteurs: {
              snowflake: "`CHECK` est appliqué, mais `COPY INTO` échoue sur une table qui en a un : sur une table chargée par fichiers, contrôle par requête.",
              mysql: "`ENUM` existe, mais ajouter une valeur oblige à modifier la table."
            }
          }
        ]
      },
      {
        titre: "Jointures et place",
        questions: [
          {
            id: "types-joints",
            q: "Les colonnes qu'on joint ont-elles le même type partout ?",
            pourquoi: "Sinon, SQL Server convertit un côté vers le type le plus fort : entre `VARCHAR` et `NVARCHAR`, toute la colonne `VARCHAR` est convertie. L'index peut alors ne plus servir, et la requête lire toute la table.",
            reflexe: "Un code garde le même type, la même longueur et la même collation dans toutes les tables : article, lignes, stock, flux EDI. Dans le plan d'exécution, `CONVERT_IMPLICIT` signale le problème."
          },
          {
            id: "place",
            q: "La table sera-t-elle grosse ?",
            pourquoi: "Chaque octet en trop se paie sur des millions de lignes, dans chaque index, en mémoire et dans les sauvegardes : un code de 5 lettres en `NCHAR(100)` prend 200 octets par ligne.",
            reflexe: "Le plus petit type qui tient vraiment : `DATE` plutôt qu'une date avec heure, `INT` plutôt que `BIGINT` pour une petite table, `VARCHAR` plutôt que `CHAR` pour un texte variable.",
            moteurs: {
              sqlserver: "Une ligne tient dans 8 060 octets. Au-delà, les textes variables sont rangés hors de la ligne.",
              snowflake: "Tout est compressé, et la longueur d'un `VARCHAR` ne coûte rien : soigne surtout le bon type."
            }
          },
          {
            id: "obsoletes",
            q: "Utilises-tu un type obsolète ?",
            pourquoi: "`text`, `ntext` et `image` seront retirés de SQL Server, et peu de fonctions les acceptent. Et `timestamp` n'y est pas une date, mais un compteur de version.",
            reflexe: "`VARCHAR(MAX)`, `NVARCHAR(MAX)` et `VARBINARY(MAX)` à la place. Pour une date et heure : `DATETIME2`.",
            seulement: ["sqlserver"]
          }
        ]
      },
      {
        titre: "Jusqu'au rapport",
        questions: [
          {
            id: "power-bi-types",
            q: "Les types restent-ils justes jusque dans Power BI ?",
            pourquoi: "Dans Power BI, un « Nombre décimal » est approché, comme un `FLOAT` : une somme ou une égalité peut donner un résultat inattendu. Et un code changé en nombre y perd ses zéros.",
            reflexe: "Mets les montants en « Nombre décimal fixe » (exact, 4 décimales) et garde les codes en texte. Vérifie le type de chaque colonne dans Power Query."
          },
          {
            id: "regle-types",
            q: "Les types sont-ils écrits dans une règle commune ?",
            pourquoi: "Sans règle, chaque table choisit : un montant en `DECIMAL(18,2)` ici, en `FLOAT` là. Les jointures et les rapports héritent du désordre.",
            reflexe: "Une page courte : montant `DECIMAL(18,2)`, quantité `DECIMAL(12,3)`, code `VARCHAR(n)`, jour `DATE`, date et heure `DATETIME2(0)`, vrai/faux `NOT NULL`. Compare les moteurs dans la page « Tous les types de données » du dico."
          }
        ]
      }
    ],
    pieges: [
      "Un montant en `FLOAT` : 0,1 + 0,2 n'y vaut pas 0,3, et le total des factures s'écarte de la comptabilité de quelques centimes.",
      "Un code postal, un SIREN ou un EAN rangé en nombre : les zéros de tête disparaissent pour toujours.",
      "`DECIMAL` ou `VARCHAR` sans parenthèses : 19,90 devient 20, et un texte ne garde qu'un caractère sur SQL Server.",
      "Une date rangée en texte : '10/03/2026' passe avant '9/03/2026' dans un tri, et chaque filtre demande une conversion.",
      "Un vrai/faux sans `NOT NULL` : trois états, et le compte des « non » oublie les NULL.",
      "`VARCHAR` d'un côté, `NVARCHAR` de l'autre dans une jointure : SQL Server convertit toute une colonne, et l'index peut ne plus servir.",
      "Le type `TIMESTAMP` recopié de MySQL ou de Snowflake vers SQL Server : ce n'est pas une date, et la table refuse tes dates.",
      "Une heure de flux rangée en heure de Paris : la nuit du changement d'heure, 2 h 30 existe deux fois, et l'ordre des messages se brouille."
    ],
    pratique: "Dans la base SQL de Divalto, une date non renseignée est rangée au 01/01/1753 (documentation Xlan SQL). Écarte-la avant de calculer un délai moyen : sinon, il compte plus de 270 ans.",
    motsCles: ["type de données", "type de colonne", "float", "money", "datetime2", "date", "varchar", "nvarchar", "char", "bit", "boolean", "montant", "unicode", "fuseau horaire", "longueur"],
    voirAussi: ["creer-table", "nommer", "semi-structure", "table-import", "dates", "modifier-table", "donnees-powerbi"],
    dico: ["decimal", "money", "float", "int", "datetime2", "datetimeoffset", "timestamp-ntz", "timestamp", "date", "varchar", "nvarchar", "char", "bit", "boolean", "text", "conversion-implicite"],
    outils: ["dico"],
    sources: [
      { titre: "SQL Server : float et real", url: "https://learn.microsoft.com/fr-fr/sql/t-sql/data-types/float-and-real-transact-sql" },
      { titre: "SQL Server : priorité des types de données", url: "https://learn.microsoft.com/fr-fr/sql/t-sql/data-types/data-type-precedence-transact-sql" },
      { titre: "SQL Server : ntext, text et image", url: "https://learn.microsoft.com/fr-fr/sql/t-sql/data-types/ntext-text-and-image-transact-sql" },
      { titre: "Snowflake : les types numériques", url: "https://docs.snowflake.com/en/sql-reference/data-types-numeric" },
      { titre: "Snowflake : les types date et heure", url: "https://docs.snowflake.com/en/sql-reference/data-types-datetime" },
      { titre: "MySQL 8.4 : DATE, DATETIME et TIMESTAMP", url: "https://dev.mysql.com/doc/refman/8.4/en/datetime.html" },
      { titre: "Power BI : les types de données", url: "https://learn.microsoft.com/fr-fr/power-bi/transform-model/desktop-data-types" },
      { titre: "Divalto : restrictions de Xlan SQL", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/10558341338/Restrictions" }
    ]
  },
  {
    id: "nommer",
    titre: "Je nomme les tables et les colonnes",
    famille: "Concevoir",
    resume: "Une règle de nommage écrite : casse, langue, singulier, préfixes, noms des clés, des dates et des vrai/faux, mots réservés, guillemets, longueurs, contraintes et cohérence avec l'ERP.",
    besoins: [
      "je nomme les tables et les colonnes",
      "quelle convention de nommage pour les tables",
      "comment nommer les colonnes d'une table",
      "nom des contraintes et des index"
    ],
    essais: [
      "regle de nommage snake case en minuscules",
      "singulier ou pluriel pour les noms de table",
      "prefixe tbl devant le nom ou pas"
    ],
    exemple: {
      texte: "Ta table des avis d'expédition EDI s'appelle `TblDesadv2`, avec les colonnes `Date`, `Num`, `Poids Kg` et `flag`. Six mois plus tard, personne ne sait ce que veut dire `flag`, et chaque requête doit entourer `Poids Kg`. Voici la même table, nommée selon une règle écrite.",
      code: "-- Avant : CREATE TABLE TblDesadv2 ([Date] DATETIME, Num VARCHAR(20), [Poids Kg] FLOAT, flag INT, Cde INT)\nCREATE TABLE edi.avis_expedition (               -- le schéma, puis un nom métier au singulier\n  id              INT IDENTITY(1,1) NOT NULL,     -- la clé technique : id\n  cde_id          INT           NOT NULL,         -- clé étrangère : cde (de la liste) + _id\n  num_bl          VARCHAR(35)   NOT NULL,         -- num_ + une abréviation de la liste\n  date_expedition DATE          NOT NULL,         -- date_ + l'événement\n  poids_kg        DECIMAL(9,3)  NOT NULL,         -- l'unité dans le nom\n  est_rapproche   BIT           NOT NULL          -- vrai/faux : est_ + l'état\n    CONSTRAINT df_avis_expedition_rapproche DEFAULT 0,\n  CONSTRAINT pk_avis_expedition PRIMARY KEY (id),\n  CONSTRAINT fk_avis_expedition_commande FOREIGN KEY (cde_id) REFERENCES dbo.commande (id),\n  CONSTRAINT uq_avis_expedition_num_bl UNIQUE (num_bl)\n);\nCREATE INDEX ix_avis_expedition_cde_id ON edi.avis_expedition (cde_id);",
      codes: {
        snowflake: "-- Sans guillemets : rangé en majuscules (EDI.AVIS_EXPEDITION, NUM_BL…), et lu sans guillemets\nCREATE TABLE edi.avis_expedition (\n  id              NUMBER(38,0) IDENTITY,\n  cde_id          NUMBER(38,0) NOT NULL,\n  num_bl          VARCHAR(35)  NOT NULL,\n  date_expedition DATE         NOT NULL,\n  poids_kg        NUMBER(9,3)  NOT NULL,\n  est_rapproche   BOOLEAN      NOT NULL DEFAULT FALSE,\n  CONSTRAINT pk_avis_expedition PRIMARY KEY (id),\n  CONSTRAINT fk_avis_expedition_commande FOREIGN KEY (cde_id) REFERENCES ventes.commande (id),\n  CONSTRAINT uq_avis_expedition_num_bl UNIQUE (num_bl)\n);\n-- À éviter : CREATE TABLE \"avis_expedition\" (…) : il faudrait ensuite toujours écrire \"avis_expedition\"",
        mysql: "-- En minuscules : sous Linux, la casse des noms de tables compte\nCREATE TABLE avis_expedition (\n  id              INT          NOT NULL AUTO_INCREMENT,\n  cde_id          INT          NOT NULL,\n  num_bl          VARCHAR(35)  NOT NULL,\n  date_expedition DATE         NOT NULL,\n  poids_kg        DECIMAL(9,3) NOT NULL,\n  est_rapproche   BOOLEAN      NOT NULL DEFAULT FALSE,\n  CONSTRAINT pk_avis_expedition PRIMARY KEY (id),          -- son nom sera toujours PRIMARY\n  CONSTRAINT fk_avis_expedition_commande FOREIGN KEY (cde_id) REFERENCES commande (id),\n  CONSTRAINT uq_avis_expedition_num_bl UNIQUE (num_bl)\n) ENGINE = InnoDB;"
      }
    },
    etapes: [
      {
        titre: "La règle écrite",
        questions: [
          {
            id: "regle",
            q: "Existe-t-il une règle de nommage écrite, que tout le monde suit ?",
            pourquoi: "Sans règle, chacun nomme à sa façon : `NumCde`, `num_commande`, `NUMCDE`. On cherche le nom des colonnes au lieu d'écrire la requête, et on se trompe.",
            reflexe: "Une page courte, avant la première table : casse, langue, abréviations, préfixes, noms des clés et des contraintes. Elle vaut aussi pour les vues, les procédures et les fichiers."
          },
          {
            id: "casse",
            q: "Minuscules et `_`, ou autre chose ?",
            pourquoi: "Majuscules, accents et espaces posent des problèmes différents selon le moteur : un espace oblige à entourer le nom, et la casse ne se compare pas partout de la même façon.",
            reflexe: "Minuscules, mots séparés par `_`, sans accent, ni espace, ni tiret : `date_expedition`, pas `DateExpédition` ni `date-expedition`.",
            moteurs: {
              sqlserver: "La casse des noms suit la collation de la base (sa règle de comparaison des textes) : dans une base en collation `_CS` ou `_BIN`, `Client` et `client` sont deux tables.",
              snowflake: "Sans guillemets, `avis_expedition` est rangé `AVIS_EXPEDITION` : Power BI l'affiche ainsi. Ne crée jamais un nom entre guillemets.",
              mysql: "Bases et tables suivent la casse du système : sous Linux, `Commande` et `commande` sont deux tables. Les colonnes, elles, ignorent la casse."
            }
          },
          {
            id: "langue",
            q: "Une seule langue pour tous les noms ?",
            pourquoi: "`date_cde` à côté de `order_amount` et `qte_shipped` : on ne sait plus quel mot chercher, ni comment s'appelle la colonne suivante.",
            reflexe: "Le français du métier, comme l'ERP et les utilisateurs : `commande`, `facture`, `qte`. L'anglais seulement si l'équipe ou l'éditeur l'impose. Jamais un mélange."
          },
          {
            id: "singulier",
            q: "Les tables au singulier, ou au pluriel ?",
            pourquoi: "`client` ici, `commandes` là : on se trompe de nom à chaque requête, et les clés étrangères deviennent incohérentes (`client_id`, `commandes_id` ?).",
            reflexe: "Choisis une fois. Le singulier, comme la base d'exemple : `client`, `commande`, `ligne_cde`. On lit alors « une ligne = un client »."
          }
        ]
      },
      {
        titre: "Les tables et les objets",
        questions: [
          {
            id: "prefixes",
            q: "Faut-il un préfixe devant le nom des tables ?",
            pourquoi: "`tbl_` ou `t_` ne disent rien : toutes sont des tables. Mais un préfixe de rôle aide dans un entrepôt : on repère d'un coup d'œil les dimensions et les faits.",
            reflexe: "Pas de `tbl_`. Le schéma dit l'usage (`edi.`, `stg.`). Dans l'entrepôt : `dim_` et `fait_`, comme `dim_client` et `fait_vente`."
          },
          {
            id: "nom-metier",
            q: "Le nom dit-il ce que contient la table, sans l'ouvrir ?",
            pourquoi: "`TblDesadv2`, `copie_ok`, `test_jean` : dans un an, personne ne sait ce qu'elles contiennent, ni si on peut les supprimer.",
            reflexe: "Un nom métier : `avis_expedition`. Pas de numéro de version, de date, de nom de personne, ni « test » ou « old » en production."
          },
          {
            id: "autres-objets",
            q: "Les vues et les procédures suivent-elles la même règle ?",
            pourquoi: "Une vue nommée comme une table trompe le lecteur. Et sur SQL Server, une procédure en `sp_` peut entrer en conflit avec une procédure système du même nom.",
            reflexe: "Un préfixe pour les vues, si ta règle le prévoit (`v_ventes_mois`), et un verbe pour une procédure (`charger_commande_edi`). Jamais `sp_` au début."
          }
        ]
      },
      {
        titre: "Les colonnes",
        questions: [
          {
            id: "cles",
            q: "Comment s'appellent la clé primaire et les clés étrangères ?",
            pourquoi: "Avec `id` partout et `client_id` pour la colonne qui pointe vers `client`, chacun devine la jointure. Avec `num`, `code_cli` ou `ref`, chacun cherche.",
            reflexe: "Clé technique : `id`. Clé étrangère : le nom de la table, ou son abréviation de la liste, + `_id` : `client_id`, `cde_id`. Le même nom partout où la colonne revient. Dans l'entrepôt, la clé d'une dimension : `client_sk` (sk : un numéro propre à l'entrepôt)."
          },
          {
            id: "dates",
            q: "Le nom d'une date dit-il de quel événement il s'agit ?",
            pourquoi: "Une colonne `date` ne dit pas si c'est la commande, la livraison ou la saisie. Et `date` est aussi un mot du langage SQL : une source de confusion.",
            reflexe: "`date_` puis l'événement : `date_cde`, `date_livraison`, `date_creation`. Une seule forme dans toute la base."
          },
          {
            id: "vrai-faux",
            q: "Un vrai/faux se lit-il comme une question ?",
            pourquoi: "`flag`, `ok`, `statut2` : que veut dire 1 ? Le rapport filtre à l'envers, et personne ne le voit.",
            reflexe: "`est_` ou `a_` puis l'état : `est_actif`, `est_payee`, `a_reliquat`. 1 (ou TRUE) veut toujours dire oui."
          },
          {
            id: "unites",
            q: "Le nom dit-il l'unité ou la règle de calcul ?",
            pourquoi: "`montant` : HT ou TTC ? `poids` : en kilos ou en grammes ? Deux rapports additionnent alors des choses différentes.",
            reflexe: "L'unité ou la règle dans le nom : `montant_ht`, `montant_ttc`, `poids_kg`, `taux_tva_pct`, `delai_jours`."
          },
          {
            id: "abreviations",
            q: "Les abréviations viennent-elles d'une liste commune ?",
            pourquoi: "`cde`, `cmd` et `comm` pour « commande » : une recherche sur `cde` rate les deux autres, et chaque jointure demande de deviner.",
            reflexe: "Une liste courte et partagée : `cde` (commande), `fact` (facture), `qte` (quantité), `num` (numéro), `bl` (bon de livraison). Aucune autre abréviation."
          }
        ]
      },
      {
        titre: "Les pièges des moteurs",
        questions: [
          {
            id: "mots-reserves",
            q: "Un nom est-il un mot réservé du langage SQL ?",
            pourquoi: "`order`, `user`, `group`, `key` : la création plante, ou chaque requête devra entourer le nom, pour toujours.",
            reflexe: "Vérifie chaque nom dans l'outil « Mots réservés ». Évite aussi les mots « futurs » ou « limités ». Ajoute un mot pour sortir du piège : `num_cde` plutôt que `order`."
          },
          {
            id: "guillemets",
            q: "Un nom devra-t-il être entouré de guillemets ou de crochets ?",
            pourquoi: "Un nom entouré à la création doit l'être dans chaque requête. Sur Snowflake, une colonne créée `\"num_bl\"`, en minuscules, n'est plus trouvée par `num_bl` écrit sans guillemets.",
            reflexe: "Des noms qui n'ont jamais besoin d'être entourés : lettres, chiffres et `_`, en commençant par une lettre. Méfie-toi des outils de chargement qui créent les tables avec des guillemets."
          },
          {
            id: "longueur-nom",
            q: "Le nom tient-il dans la limite du moteur ?",
            pourquoi: "Au-delà, la création plante. Et un script prévu pour plusieurs moteurs doit tenir dans la limite la plus courte.",
            reflexe: "Vise 30 caractères au plus : un nom long se lit et se tape mal. Les limites : 128 caractères (SQL Server), 255 (Snowflake), 64 (MySQL)."
          }
        ]
      },
      {
        titre: "Contraintes et index",
        questions: [
          {
            id: "contraintes",
            q: "Chaque contrainte et chaque index portent-ils un nom selon la règle ?",
            pourquoi: "Sans nom, le moteur en invente un, comme `PK__avis_exp__3213E83F`, différent d'une base à l'autre : un script qui le cite casse en recette. Avec un bon nom, le message d'erreur dit quelle règle a bloqué.",
            reflexe: "Préfixe, table, puis colonnes : `pk_avis_expedition`, `fk_avis_expedition_commande`, `uq_avis_expedition_num_bl`, `ck_…`, `df_…`, `ix_avis_expedition_cde_id`.",
            moteurs: {
              sqlserver: "Une contrainte est un objet du schéma, comme une table : deux tables d'un même schéma ne peuvent pas avoir chacune une contrainte `pk_id`.",
              mysql: "La clé primaire s'appelle toujours PRIMARY. Les autres noms sont uniques dans la base, pour chaque type de contrainte."
            }
          }
        ]
      },
      {
        titre: "L'ERP et Power BI",
        questions: [
          {
            id: "erp",
            q: "Tes noms reprennent-ils ceux de l'ERP, ou les traduisent-ils ?",
            pourquoi: "Divalto nomme ses tables et ses champs par des codes courts en majuscules : `CLI`, `ENT`, `TIERS`, `PINO`. Recopiés partout, ils sont illisibles ; traduits sans trace, on ne sait plus d'où vient une colonne.",
            reflexe: "Dans `stg`, garde les noms de l'ERP pour suivre la source. Dans `dwh` et `rpt`, des noms clairs (`code_client` pour `TIERS`), et la correspondance écrite dans la documentation."
          },
          {
            id: "power-bi",
            q: "Les noms vus dans Power BI sont-ils clairs pour le métier ?",
            pourquoi: "Un utilisateur qui voit `MNT_HT_2` ne sait pas quoi glisser dans son visuel. Et Power BI devine les relations d'après les noms de colonnes : un nom différent d'une table à l'autre l'en empêche.",
            reflexe: "Garde les noms techniques dans la base, et donne les noms métier (« Montant HT ») dans le modèle Power BI. Dans les vues de `rpt`, renomme `id` en `client_id` : le même nom des deux côtés de la relation."
          }
        ]
      },
      {
        titre: "Changer un nom",
        questions: [
          {
            id: "renommer",
            q: "Que se passe-t-il si un nom doit changer plus tard ?",
            pourquoi: "Renommer casse tout ce qui cite l'ancien nom : vues, procédures, rapports, exports. MySQL n'a même pas d'instruction pour renommer une base.",
            reflexe: "Prends le temps de bien nommer avant la production. Pour renommer : liste d'abord chaque usage, puis change tout dans un même script, ou garde l'ancien nom par une vue le temps de la transition.",
            moteurs: {
              sqlserver: "`sp_rename` ne corrige pas les objets qui citent l'ancien nom : liste-les d'abord avec `sys.sql_expression_dependencies`.",
              snowflake: "Après un renommage, les objets qui citent l'ancien nom sont à corriger à la main."
            }
          }
        ]
      }
    ],
    pieges: [
      "Un mot réservé comme nom (`order`, `user`) : chaque requête devra l'entourer, pour toujours.",
      "Un nom créé entre guillemets sur Snowflake (`\"num_bl\"`) : il faudra toujours écrire les guillemets et les minuscules, sinon la colonne est introuvable.",
      "`Commande` et `commande` sur MySQL sous Linux : deux tables différentes. Le script testé sous Windows plante en production.",
      "Des contraintes sans nom : `PK__avis_exp__3213E83F` change d'une base à l'autre, et le script de mise à jour casse.",
      "Une procédure nommée `sp_…` sur SQL Server : elle peut entrer en conflit avec une procédure système du même nom.",
      "Trois abréviations pour le même mot (`cde`, `cmd`, `comm`) : les recherches ratent des colonnes, et les jointures se devinent.",
      "Renommer une colonne avec `sp_rename` : les vues et les procédures qui la citent cassent à leur prochain appel.",
      "Une colonne `date` ou `flag` : on ne sait pas de quoi il s'agit, et le rapport filtre à l'envers."
    ],
    pratique: "Divalto impose ses propres noms (`CLI`, `TIERS`, `PINO`) : ne les change jamais dans sa base. Fais la traduction une fois, dans tes vues, et garde la liste des correspondances dans la documentation.",
    motsCles: ["nommage", "convention", "nom de table", "nom de colonne", "nommer", "snake case", "minuscules", "majuscules", "casse", "préfixe", "abréviation", "singulier", "pluriel", "renommer", "guillemets"],
    voirAussi: ["creer-table", "creer-schema", "choisir-types", "creer-vue", "documenter", "modifier-table", "donnees-powerbi"],
    dico: ["mots-reserves", "create-table", "primary-key", "foreign-key", "as", "create-view"],
    outils: ["mots-reserves"],
    sources: [
      { titre: "SQL Server : identificateurs de base de données", url: "https://learn.microsoft.com/fr-fr/sql/relational-databases/databases/database-identifiers" },
      { titre: "sp_rename (Transact-SQL)", url: "https://learn.microsoft.com/fr-fr/sql/relational-databases/system-stored-procedures/sp-rename-transact-sql" },
      { titre: "CREATE PROCEDURE (Transact-SQL)", url: "https://learn.microsoft.com/fr-fr/sql/t-sql/statements/create-procedure-transact-sql" },
      { titre: "Snowflake : règles des identificateurs", url: "https://docs.snowflake.com/en/sql-reference/identifiers-syntax" },
      { titre: "MySQL 8.4 : casse des identificateurs", url: "https://dev.mysql.com/doc/refman/8.4/en/identifier-case-sensitivity.html" },
      { titre: "MySQL 8.4 : longueur des identificateurs", url: "https://dev.mysql.com/doc/refman/8.4/en/identifier-length.html" },
      { titre: "MySQL 8.4 : RENAME TABLE", url: "https://dev.mysql.com/doc/refman/8.4/en/rename-table.html" },
      { titre: "Power BI : créer et gérer des relations", url: "https://learn.microsoft.com/fr-fr/power-bi/transform-model/desktop-create-and-manage-relationships" }
    ]
  },
  {
    id: "creer-index",
    titre: "Je crée un index",
    famille: "Concevoir",
    resume: "Avant `CREATE INDEX` : la requête à aider, les colonnes et leur ordre, l'index couvrant, filtré ou unique, le coût en écriture, la création en production, l'entretien et Snowflake.",
    besoins: [
      "je crée un index",
      "ajouter un index sur une table",
      "quelles colonnes mettre dans un index",
      "créer un index sur une grosse table en production"
    ],
    essais: [
      "index cluster ou non cluster sur sql server",
      "index couvrant avec include",
      "supprimer les index jamais utilises",
      "faut il indexer une colonne qui a peu de valeurs"
    ],
    exemple: {
      texte: "Le rapport Power BI « commandes en cours » cherche, des centaines de fois par jour, les commandes `EN_COURS` d'un client, les plus récentes d'abord. Imagine `commande` avec 5 millions de lignes. Avant `CREATE INDEX`, tu réponds aux questions ci-dessous. Voici l'index obtenu ; en édition Enterprise, il se crée sans bloquer la saisie. Sur la base d'exemple, la requête rend une commande : CDE-1007.",
      code: "-- La requête à aider (rapport Power BI) :\n-- SELECT num_cde, date_cde, montant_ht FROM dbo.commande\n-- WHERE client_id = @client AND statut = 'EN_COURS' ORDER BY date_cde DESC;\nIF NOT EXISTS (SELECT 1 FROM sys.indexes\n               WHERE object_id = OBJECT_ID(N'dbo.commande')\n                 AND name = N'ix_commande_client_statut_date')\n  CREATE NONCLUSTERED INDEX ix_commande_client_statut_date\n    ON dbo.commande (client_id, statut, date_cde)   -- les égalités, puis le tri\n    INCLUDE (num_cde, montant_ht)                   -- les colonnes affichées\n    WITH (ONLINE = ON);   -- édition Enterprise : la table reste utilisable",
      codes: {
        snowflake: "-- 1. D'abord le Query Profile : les partitions lues sur le total.\n-- 2. Peu lues : rien à créer. Presque toutes, sur une très grosse table,\n--    pour une recherche très sélective : un index secondaire (Enterprise).\nCREATE INDEX IF NOT EXISTS ix_commande_client_statut\n  ON ventes.commande (client_id, statut)\n  INCLUDE (num_cde, date_cde, montant_ht);\nSHOW INDEXES IN TABLE ventes.commande;",
        mysql: "-- Pas d'INCLUDE : les colonnes affichées en fin de clé ; id (la clé primaire) y est déjà\nCREATE INDEX ix_commande_client_statut_date\n  ON commande (client_id, statut, date_cde, num_cde, montant_ht)\n  ALGORITHM = INPLACE LOCK = NONE;   -- échoue plutôt que de bloquer la table\nANALYZE TABLE commande;              -- statistiques à jour, comme le demande la doc\nEXPLAIN SELECT num_cde, date_cde, montant_ht FROM commande\nWHERE client_id = 1 AND statut = 'EN_COURS'\nORDER BY date_cde DESC;              -- la colonne key cite-t-elle l'index ?"
      }
    },
    etapes: [
      {
        titre: "La requête à aider",
        questions: [
          {
            id: "requete",
            q: "Quelle requête précise cet index doit-il aider, et combien de fois par jour tourne-t-elle ?",
            pourquoi: "Un index se choisit pour des requêtes, pas pour une table. Créé « au cas où », il ne sert souvent jamais, mais il ralentit chaque écriture, tant qu'il existe.",
            reflexe: "Note la requête exacte : son filtre, sa jointure, son tri, sa fréquence. « Rapport Power BI, 500 fois par jour : `client_id` et `statut`, tri par date. » Mesure-la avant. Le détail : « Ma requête est lente »."
          },
          {
            id: "existe-deja",
            q: "Un index proche existe-t-il déjà sur la table ?",
            pourquoi: "Deux index presque pareils, comme `(client_id)` et `(client_id, date_cde)`, coûtent deux fois à chaque écriture. Le second sert presque toujours les mêmes recherches que le premier.",
            reflexe: "Liste les index de la table avant d'en créer un. Souvent, mieux vaut compléter un index existant (une colonne de plus en `INCLUDE`) que d'en ajouter un autre.",
            moteurs: {
              sqlserver: "Les index et leurs colonnes : `sys.indexes` et `sys.index_columns`. La clé de l'index cluster (l'ordre de rangement de la table) est déjà dans chaque index non cluster : inutile de l'y ajouter.",
              snowflake: "`SHOW INDEXES IN TABLE ventes.commande;` pour les index secondaires. La clé de clustering (l'ordre de rangement choisi) apparaît dans `SHOW TABLES`, colonne `cluster_by`.",
              mysql: "`SHOW INDEX FROM commande;`. La vue `sys.schema_redundant_indexes` liste les index en double, avec l'ordre pour supprimer chacun."
            }
          },
          {
            id: "selectivite",
            q: "Le filtre garde-t-il peu de lignes, ou une grande partie de la table ?",
            pourquoi: "C'est la sélectivité. Un index sur `statut` (3 valeurs) ou sur un vrai/faux trouve des millions de lignes : lire toute la table va alors plus vite, et l'index ne sert pas. Il est pourtant mis à jour à chaque écriture.",
            reflexe: "Compte avant : `SELECT statut, COUNT(*) FROM commande GROUP BY statut`. Un index aide quand le filtre garde une petite part des lignes. Une valeur rare et très cherchée : un index filtré (SQL Server).",
            moteurs: {
              mysql: "Sa doc le dit : un index compte peu quand la requête lit la plupart des lignes. Lire toute la table dans l'ordre va alors plus vite."
            }
          },
          {
            id: "petite-table",
            q: "La table est-elle assez grosse pour qu'un index compte ?",
            pourquoi: "Sur une petite table, parcourir l'index coûte plus que tout lire : le moteur ne s'en sert souvent pas. Mais l'index est mis à jour à chaque écriture, pour rien.",
            reflexe: "Pas d'index de confort sur une table de paramètres de quelques centaines de lignes. Garde la clé primaire et les contraintes `UNIQUE`. Ajoute un index quand une mesure le justifie."
          }
        ]
      },
      {
        titre: "Les colonnes et leur ordre",
        questions: [
          {
            id: "ordre-colonnes",
            q: "Dans quel ordre mettre les colonnes d'un index sur plusieurs colonnes ?",
            pourquoi: "Un index composé (sur plusieurs colonnes) est trié par sa 1re colonne, puis par la 2e, comme un annuaire par nom puis par prénom. L'index `(statut, client_id)` ne sert pas une recherche sur `client_id` seul.",
            reflexe: "D'abord les colonnes filtrées par égalité, la plus sélective en tête ; puis la plage ou le tri. Ici : `(client_id, statut, date_cde)`. Microsoft donne la même règle pour ses suggestions d'index.",
            moteurs: {
              snowflake: "Index secondaire : le filtre le plus sélectif en tête (sa doc). Clé de clustering : l'inverse, de la colonne qui a le moins de valeurs différentes à celle qui en a le plus.",
              mysql: "Jusqu'à 16 colonnes. L'index sert pour la 1re colonne, pour les deux premières, et ainsi de suite : le préfixe le plus à gauche."
            }
          },
          {
            id: "tri-jointure",
            q: "L'index doit-il aussi servir un tri (ORDER BY) ou une jointure ?",
            pourquoi: "Sans index dans le bon ordre, le moteur trie lui-même, en mémoire ou sur disque. Et une jointure sans index sur sa colonne lit toute la table d'en face.",
            reflexe: "Mets la colonne du tri juste après les égalités : `(client_id, statut, date_cde)` sert `ORDER BY date_cde DESC`. Indexe aussi chaque colonne de clé étrangère : le détail dans « Je relie deux tables ».",
            moteurs: {
              snowflake: "Pas de tri servi par un index. Une clé de clustering aide les requêtes qui filtrent ou trient sur ses colonnes (sa doc)."
            }
          },
          {
            id: "couvrant",
            q: "Faut-il un index couvrant, avec les colonnes affichées en INCLUDE ?",
            pourquoi: "Sinon, chaque ligne trouvée repart lire le reste dans la table (le Key Lookup, le retour à la table) : 200 000 commandes trouvées, 200 000 allers-retours. Avec trop de colonnes, l'index devient une 2e copie de la table.",
            reflexe: "Dans la clé, les colonnes filtrées et triées ; en `INCLUDE`, seulement les colonnes affichées par la requête : `INCLUDE (num_cde, montant_ht)`. Un `SELECT *` n'est presque jamais couvert.",
            moteurs: {
              sqlserver: "`INCLUDE` seulement sur un index non cluster. Un texte long (`VARCHAR(MAX)`) peut y aller, jamais dans la clé.",
              snowflake: "Les index secondaires ont aussi `INCLUDE` : la requête est alors servie par l'index seul, sans lire la table (sa doc).",
              mysql: "Pas d'`INCLUDE` : ajoute les colonnes affichées en fin de clé. Chaque index InnoDB contient déjà la clé primaire."
            }
          },
          {
            id: "fonction",
            q: "Le filtre calcule-t-il sur la colonne, comme UPPER(nom) ou qte * prix_unit ?",
            pourquoi: "L'index est trié sur la valeur brute de la colonne. `WHERE UPPER(nom) = 'AQUABLEU'` ne peut pas s'en servir pour chercher : il lit tout l'index, ou toute la table.",
            reflexe: "D'abord, réécris le filtre avec la colonne nue : une plage de dates au lieu de `YEAR(date_cde)`. Calcul inévitable : indexe la valeur calculée, et filtre avec exactement la même expression.",
            moteurs: {
              sqlserver: "Une colonne calculée, puis un index dessus : `ALTER TABLE dbo.ligne_cde ADD montant AS (qte * prix_unit);`. Le calcul doit être déterministe (même résultat pour la même entrée) et précis (sans `FLOAT`).",
              snowflake: "Un index secondaire accepte une expression : `CREATE INDEX ix_ligne_cde_montant ON ventes.ligne_cde (qte * prix_unit);`. Sa doc le conseille quand le minimum et le maximum de la colonne ne suffisent pas.",
              mysql: "Un index fonctionnel, l'expression entre doubles parenthèses : `CREATE INDEX ix_ligne_cde_montant ON ligne_cde ((qte * prix_unit));`."
            }
          }
        ]
      },
      {
        titre: "Unique, filtré ou cluster",
        questions: [
          {
            id: "unique",
            q: "L'index protège-t-il une règle métier, comme « jamais deux fois le même numéro » ?",
            pourquoi: "Un index unique refuse les doublons : il protège la clé métier, comme `(partenaire, num_cde)`. Créé sur des données déjà en double, il échoue : il faut d'abord nettoyer.",
            reflexe: "Pour une règle métier, préfère la contrainte `UNIQUE` (nommée `uq_…`) : elle crée l'index, et dit pourquoi il existe. Cherche d'abord les doublons : `GROUP BY partenaire, num_cde HAVING COUNT(*) > 1`.",
            moteurs: {
              sqlserver: "Un seul NULL accepté. Pour « unique quand c'est rempli » : `CREATE UNIQUE INDEX ux_client_siren ON dbo.client (siren) WHERE siren IS NOT NULL;`.",
              snowflake: "`CREATE INDEX` n'a pas d'option `UNIQUE`, et la contrainte `UNIQUE` n'est pas appliquée sur une table standard : contrôle les doublons par requête.",
              mysql: "Plusieurs NULL acceptés. Un `UNIQUE` sur un préfixe (`nom(20)`) n'est unique que sur ces 20 premiers caractères."
            }
          },
          {
            id: "filtre",
            q: "Un index filtré, sur une petite partie des lignes, suffirait-il ?",
            pourquoi: "Les commandes `EN_COURS` sont peut-être 2 % de la table, et les plus lues. Un index filtré (avec un `WHERE`) ne range qu'elles : il est petit, et mis à jour pour elles seules.",
            reflexe: "`CREATE INDEX ix_commande_en_cours ON dbo.commande (client_id, date_cde) INCLUDE (num_cde) WHERE statut = 'EN_COURS';`. La requête doit filtrer sur le même `statut = 'EN_COURS'`. Pas de `LIKE` dans le filtre d'un index.",
            seulement: ["sqlserver"]
          },
          {
            id: "options-set",
            q: "Les programmes qui écrivent dans la table ont-ils les bonnes options SET ?",
            pourquoi: "Un index filtré, ou sur une colonne calculée, exige des réglages de session, dont `QUOTED_IDENTIFIER ON`. Sinon, chaque `INSERT` ou `UPDATE` de la table échoue et s'annule : le flux EDI s'arrête.",
            reflexe: "Teste en recette avec les vrais programmes : flux, jobs, scripts. Avec sqlcmd en version ODBC, ajoute `-I` : sans lui, `QUOTED_IDENTIFIER` est à OFF. La version Go le met toujours à ON.",
            seulement: ["sqlserver"],
            code: "-- Exigés (sa doc) : ON pour ANSI_NULLS, ANSI_PADDING, ANSI_WARNINGS, ARITHABORT,\n-- CONCAT_NULL_YIELDS_NULL, QUOTED_IDENTIFIER ; OFF pour NUMERIC_ROUNDABORT\nSELECT SESSIONPROPERTY('QUOTED_IDENTIFIER') AS quoted_identifier,   -- 1 = ON\n       SESSIONPROPERTY('ANSI_NULLS') AS ansi_nulls;"
          },
          {
            id: "cluster",
            q: "Quelle colonne range la table (l'index cluster), puisqu'il n'y en a qu'un ?",
            pourquoi: "L'index cluster est la table elle-même, rangée selon sa clé : un seul par table, celui de la clé primaire par défaut. Le changer réécrit la table, et reconstruit tous les autres index.",
            reflexe: "Garde-le court, unique et croissant (`id`). Une table lue surtout par période, comme un journal de flux : le cluster sur la date, la clé primaire en `NONCLUSTERED`. Le détail : « Je choisis la clé primaire ».",
            seulement: ["sqlserver"]
          }
        ]
      },
      {
        titre: "Le coût de l'index",
        questions: [
          {
            id: "ecritures",
            q: "Combien d'écritures la table reçoit-elle, et combien coûtera un index de plus ?",
            pourquoi: "Chaque index est mis à jour à chaque `INSERT` et `DELETE`, et à chaque `UPDATE` d'une de ses colonnes. Douze index « au cas où », et l'intégration EDI de la nuit déborde sur la matinée.",
            reflexe: "Mesure le chargement de nuit avant et après l'index. Sur une table très écrite (flux, journaux), peu d'index, avec peu de colonnes.",
            moteurs: {
              snowflake: "Les écritures ne sont pas bloquées : l'index secondaire et la clé de clustering s'entretiennent en fond. Mais cet entretien se paie en crédits (l'unité de facture), d'autant plus que la table change souvent."
            }
          },
          {
            id: "place",
            q: "Combien de place prendra l'index, sur le disque et dans les sauvegardes ?",
            pourquoi: "Un index est une copie triée de ses colonnes. Sur une grosse table, ce sont des Go de plus sur le disque, en mémoire et dans chaque sauvegarde.",
            reflexe: "Mesure sa taille en recette, après la création. Garde peu de colonnes dans la clé. Un long texte n'a pas sa place dans la clé d'un index.",
            moteurs: {
              sqlserver: "Clé limitée à 900 octets pour un index cluster, 1 700 pour un non cluster. Au-delà, l'index peut se créer, puis refuser les lignes trop longues.",
              snowflake: "Le stockage et l'entretien d'un index secondaire sont facturés avec le service Search Optimization (la recherche rapide).",
              mysql: "Pour un long texte, indexe un préfixe : `CREATE INDEX ix_client_nom ON client (nom(20));`. Il est obligatoire pour un `TEXT`."
            }
          },
          {
            id: "usage",
            q: "Qui vérifiera, plus tard, que l'index sert vraiment ?",
            pourquoi: "Un index jamais lu coûte à chaque écriture, sans rien rendre. Et le rapport qui le justifiait est peut-être abandonné depuis un an.",
            reflexe: "Note dans le script la requête et le ticket qui l'ont justifié. Chaque trimestre, liste les index jamais lus et ceux en double. Avant d'en retirer un, pense à la clôture mensuelle ou annuelle.",
            moteurs: {
              sqlserver: "`sys.dm_db_index_usage_stats` compte, par index, les lectures et les écritures depuis le dernier démarrage du serveur : 0 lecture depuis dimanche ne dit rien de la clôture du mois.",
              snowflake: "Le coût de chaque index : la colonne `INDEX_TYPE` de la vue `SEARCH_OPTIMIZATION_HISTORY` (`SNOWFLAKE.ACCOUNT_USAGE`).",
              mysql: "`sys.schema_unused_indexes` liste les index sans aucune lecture depuis le démarrage. Sa doc prévient : juge-la après une période de travail représentative."
            }
          },
          {
            id: "retirer",
            q: "Comment retirer un index qui semble inutile, sans risque ?",
            pourquoi: "Supprimé, un gros index se recrée en des heures. Si un rapport mensuel en avait besoin, il rame le jour de la clôture, au pire moment.",
            reflexe: "Garde son script de création. Retire-le hors des heures de travail, puis surveille les requêtes lentes pendant un cycle complet, clôture comprise.",
            moteurs: {
              sqlserver: "Pas d'index invisible : `ALTER INDEX … DISABLE` garde la définition mais efface les données de l'index ; le remettre demande un `REBUILD`. Jamais sur l'index cluster : la table devient illisible.",
              snowflake: "`DROP INDEX commande.ix_commande_client_statut;` : le nom de la table, un point, puis celui de l'index.",
              mysql: "Rends-le d'abord invisible : `ALTER TABLE commande ALTER INDEX ix_commande_client_statut_date INVISIBLE;`. L'optimiseur l'ignore, mais il reste à jour ; `VISIBLE` le remet en service, rapidement (sa doc)."
            }
          }
        ]
      },
      {
        titre: "Créer en production",
        questions: [
          {
            id: "verrous",
            q: "Pendant la création, qui sera bloqué, et combien de temps ?",
            pourquoi: "Créer un index lit et trie toute la table. Selon le moteur et les options, les écritures attendent la fin : la saisie des commandes ou le flux EDI se figent, parfois longtemps.",
            reflexe: "Chronomètre la création sur une copie de la production. Lance-la hors des heures de saisie et des traitements de nuit, en prévenant. Le détail : « Je mets un script en production ».",
            moteurs: {
              sqlserver: "Sans `ONLINE`, un index non cluster bloque les modifications ; un index cluster bloque même les lectures. `WITH (ONLINE = ON)` : édition Enterprise (ou Azure SQL), plus lent, et plus gourmand en place.",
              snowflake: "Rien n'est bloqué : l'index se construit en fond. Selon la doc de la Search Optimization, les requêtes n'accélèrent qu'une fois la construction finie.",
              mysql: "`CREATE INDEX` laisse lire et écrire. Écris `ALGORITHM = INPLACE LOCK = NONE` : si c'est impossible, l'ordre échoue au lieu de bloquer la table."
            }
          },
          {
            id: "attente",
            q: "Une transaction restée ouverte peut-elle faire attendre la création, et tout le monde derrière ?",
            pourquoi: "Au début ou à la fin, la création demande un court verrou sur la table. Si un `BEGIN TRAN` oublié la tient, la création attend, et les requêtes suivantes attendent derrière elle : l'ERP semble figé.",
            reflexe: "Juste avant, cherche les transactions ouvertes sur la table. Fixe un délai d'attente court : la création échoue proprement, et tu la relances plus tard.",
            moteurs: {
              sqlserver: "`SET LOCK_TIMEOUT 10000;` (10 secondes) avant l'ordre ; sans lui, l'attente est sans fin. Avec `ONLINE = ON`, l'option `WAIT_AT_LOW_PRIORITY` limite le blocage des autres.",
              mysql: "`SET SESSION lock_wait_timeout = 10;` (en secondes ; le défaut est d'un an). Sa doc le montre : un ordre qui attend ce verrou bloque les requêtes suivantes sur la table."
            }
          },
          {
            id: "journal",
            q: "Le journal, les données et tempdb ont-ils la place pour la création ?",
            pourquoi: "Créer un gros index écrit beaucoup dans le journal, qui ne peut pas être vidé avant la fin. Si le disque se remplit, la création échoue, et les autres écritures de la base aussi.",
            reflexe: "Vérifie la place libre des disques du journal et des données. Avec `SORT_IN_TEMPDB = ON`, le tri va dans tempdb (la base de travail du serveur), qui doit avoir à peu près la taille de l'index en plus. Sauvegarde le journal pendant l'opération.",
            seulement: ["sqlserver"]
          },
          {
            id: "nom-script",
            q: "Le nom suit-il la règle, et le script peut-il tourner deux fois ?",
            pourquoi: "`IX_1`, ou un nom inventé par un outil, ne dit pas ce que l'index couvre. Et un script qui plante sur un index déjà créé bloque toute la livraison.",
            reflexe: "`ix_` + table + colonnes de la clé : `ix_commande_client_statut_date` (`ux_` pour un index unique). Vérifie qu'il n'existe pas avant de le créer. Le détail : « Je nomme les tables et les colonnes ».",
            moteurs: {
              sqlserver: "Pas de `IF NOT EXISTS` dans `CREATE INDEX` : teste `sys.indexes`, comme dans l'exemple.",
              snowflake: "`CREATE INDEX IF NOT EXISTS`.",
              mysql: "Pas de `IF NOT EXISTS` : teste d'abord `information_schema.STATISTICS` (colonne `INDEX_NAME`)."
            }
          }
        ]
      },
      {
        titre: "L'entretien",
        questions: [
          {
            id: "entretien",
            q: "Qui tient à jour les statistiques et l'index, une fois créé ?",
            pourquoi: "Le moteur choisit son chemin d'après les statistiques (le résumé des valeurs de la table). Après un gros chargement, elles décrivent l'ancienne table : l'index est ignoré, ou mal utilisé.",
            reflexe: "Mets à jour les statistiques à la fin des gros chargements. Ne reconstruis pas tous les index chaque nuit « par principe » : mesure d'abord si leur fragmentation (des pages en désordre) gêne vraiment.",
            moteurs: {
              sqlserver: "Microsoft conseille de mesurer avant et après, sans calendrier fixe. Souvent, `UPDATE STATISTICS` donne le même gain qu'une reconstruction. Préfère `REORGANIZE`, plus léger et toujours en ligne, à `REBUILD`.",
              snowflake: "Rien à lancer : les statistiques, l'index secondaire et le rangement se tiennent seuls, en crédits.",
              mysql: "Après la création : `ANALYZE TABLE commande;`. Sa doc le demande quand les statistiques sont persistantes, ce qui est le défaut."
            }
          },
          {
            id: "verifier",
            q: "As-tu vérifié que le moteur choisit vraiment ton index ?",
            pourquoi: "Un mauvais ordre de colonnes, une conversion de type ou une fonction, et l'index est ignoré. Tu paies son entretien, et la requête reste lente.",
            reflexe: "Relance la requête aidée, avec son vrai filtre, sur le vrai volume. Compare le temps et les lignes lues, avant et après. Note le gain dans le ticket.",
            moteurs: {
              sqlserver: "Le plan réel (Ctrl + M) doit montrer un Index Seek (une recherche directe) sur ton index, sans Key Lookup.",
              snowflake: "Query Profile : les partitions lues doivent baisser nettement par rapport au total.",
              mysql: "`EXPLAIN` : la colonne `key` doit citer ton index ; `type = ALL` veut dire toute la table lue. `EXPLAIN ANALYZE` donne les lignes réelles."
            }
          }
        ]
      },
      {
        titre: "Snowflake : ranger ou indexer",
        questions: [
          {
            id: "sf-mesurer",
            q: "As-tu regardé les partitions lues, avant de créer quoi que ce soit ?",
            pourquoi: "Snowflake range la table en micro-partitions (des blocs) et saute celles que le filtre exclut. Une table chargée chaque jour est déjà rangée par date : un index ou une clé de clustering coûteraient pour rien.",
            reflexe: "Query Profile : « Partitions scanned » (lues) sur « Partitions total ». Peu lues : rien à créer. Presque toutes, sur une très grosse table : choisis à la question suivante.",
            seulement: ["snowflake"]
          },
          {
            id: "sf-choisir",
            q: "Clé de clustering, index secondaire ou Search Optimization : lequel pour ta recherche ?",
            pourquoi: "Ils ne règlent pas le même problème, et chacun se paie en crédits, en fond. L'index secondaire et la Search Optimization (la recherche rapide) demandent l'édition Enterprise.",
            reflexe: "Plage de dates sur une table de plusieurs To : clé de clustering, 3 ou 4 colonnes au plus. Quelques lignes parmi des milliards : index secondaire. `LIKE`, ou recherche dans du JSON : Search Optimization. Mesure crédits et partitions lues.",
            seulement: ["snowflake"]
          }
        ]
      },
      {
        titre: "MySQL : la clé primaire",
        questions: [
          {
            id: "my-cle-primaire",
            q: "Ta clé primaire est-elle courte, puisque chaque index la recopie ?",
            pourquoi: "InnoDB range la table selon sa clé primaire, et chaque index secondaire contient la clé primaire de la ligne. Une clé primaire de trois colonnes texte grossit tous les index.",
            reflexe: "Un entier `AUTO_INCREMENT` en clé primaire. Inutile de l'ajouter à un index : `(client_id, date_cde)` contient déjà `id`. Le détail : « Je choisis la clé primaire ».",
            seulement: ["mysql"]
          }
        ]
      }
    ],
    pieges: [
      "Créer tels quels les « index manquants » de SSMS : le plan n'en montre qu'un, pas forcément le meilleur, sans ordre de colonnes ni coût d'écriture. Un an après, douze index, et l'import EDI rame.",
      "Un index sur une colonne à 3 valeurs, comme `statut` : le moteur lit souvent toute la table quand même, mais chaque écriture paie l'index.",
      "`(client_id)` à côté de `(client_id, date_cde)` : deux index pour les mêmes recherches, et deux fois le coût en écriture.",
      "Un index filtré sur SQL Server, et un vieux script lancé par sqlcmd (ODBC) sans `-I` : ses `INSERT` échouent sur `QUOTED_IDENTIFIER`.",
      "`CREATE INDEX` sans `ONLINE` à 10 h sur la table des commandes : les saisies attendent jusqu'à la fin. Et `ONLINE = ON` n'existe pas en édition Standard.",
      "Supprimer un index « jamais lu » d'après `sys.dm_db_index_usage_stats` juste après un redémarrage : les compteurs repartaient de zéro, et la clôture du mois en avait besoin.",
      "Snowflake : renommer, supprimer ou changer le type d'une colonne citée par un index secondaire supprime l'index (sa doc). Les recherches redeviennent lentes.",
      "Snowflake : une clé de clustering sur un horodatage à la seconde. Sa doc le déconseille : l'entretien coûte plus cher. Range plutôt sur le jour : `CLUSTER BY (TO_DATE(date_recu))`.",
      "MySQL : un `UNIQUE` sur un préfixe (`nom(20)`) refuse deux noms qui commencent par les mêmes 20 caractères."
    ],
    pratique: "Sur la base Divalto, sa doc crée les index par le dictionnaire Diva (depuis Harmony 412 : index « pur SQL », colonnes incluses). Elle rappelle aussi que SSMS n'affiche qu'une proposition d'index : lis le XML du plan.",
    motsCles: ["index", "create index", "index cluster", "non cluster", "include", "index couvrant", "index filtré", "index unique", "ordre des colonnes", "sélectivité", "fragmentation", "online", "clé de clustering", "index secondaire", "index invisible"],
    voirAussi: ["requete-lente", "cle-primaire", "relier-tables", "nommer", "mettre-en-prod", "modifier-table", "fonction-scalaire", "couts-snowflake"],
    dico: ["create-index", "include", "plan-execution", "statistiques", "cluster-by", "colonne-calculee", "unique", "primary-key"],
    outils: ["dico"],
    sources: [
      { titre: "CREATE INDEX (Transact-SQL)", url: "https://learn.microsoft.com/fr-fr/sql/t-sql/statements/create-index-transact-sql" },
      { titre: "SQL Server : guide de conception des index", url: "https://learn.microsoft.com/fr-fr/sql/relational-databases/sql-server-index-design-guide" },
      { titre: "SQL Server : optimiser la maintenance des index", url: "https://learn.microsoft.com/fr-fr/sql/relational-databases/indexes/reorganize-and-rebuild-indexes" },
      { titre: "SQL Server : les suggestions d'index manquants", url: "https://learn.microsoft.com/fr-fr/sql/relational-databases/indexes/tune-nonclustered-missing-index-suggestions" },
      { titre: "Snowflake : les index secondaires", url: "https://docs.snowflake.com/en/user-guide/search-optimization/secondary-indexes" },
      { titre: "Snowflake : les clés de clustering", url: "https://docs.snowflake.com/en/user-guide/tables-clustering-keys" },
      { titre: "MySQL 8.4 : CREATE INDEX", url: "https://dev.mysql.com/doc/refman/8.4/en/create-index.html" },
      { titre: "MySQL 8.4 : les index invisibles", url: "https://dev.mysql.com/doc/refman/8.4/en/invisible-indexes.html" }
    ]
  },
  {
    id: "creer-vue",
    titre: "Je crée une vue",
    famille: "Concevoir",
    resume: "Avant `CREATE VIEW` : son rôle, ses colonnes nommées, un contrat stable pour Power BI, ses droits, sa vitesse, les vues indexées ou matérialisées, et les écritures à travers elle.",
    besoins: [
      "je crée une vue",
      "créer une vue pour power bi",
      "faire une vue sql pour simplifier les jointures",
      "cacher des colonnes avec une vue"
    ],
    essais: [
      "create view avec select etoile",
      "vue indexee ou vue materialisee",
      "order by dans une vue sql server",
      "lire une vue sans avoir le droit sur la table"
    ],
    exemple: {
      texte: "Power BI doit lire les commandes en cours, avec le nom du client. Tu ne lui ouvres pas les tables : tu crées la vue `rpt.v_cde_en_cours`, une requête enregistrée sous un nom. Elle montre des noms clairs et les seules colonnes utiles, et Power BI n'a de droit que sur elle. Sur la base d'exemple, elle rend 3 commandes : CDE-1005, 1006 et 1007.",
      code: "CREATE OR ALTER VIEW rpt.v_cde_en_cours\nWITH SCHEMABINDING            -- la table ne peut plus perdre une colonne lue ici\nAS\nSELECT c.num_cde    AS num_commande,\n       cl.nom       AS client,\n       c.date_cde   AS date_commande,\n       c.montant_ht AS montant_ht\nFROM dbo.commande AS c\nJOIN dbo.client   AS cl ON cl.id = c.client_id\nWHERE c.statut = 'EN_COURS';  -- pas d'ORDER BY : le tri va dans le rapport\nGO\nGRANT SELECT ON rpt.v_cde_en_cours TO role_powerbi;   -- la vue, pas les tables",
      codes: {
        snowflake: "CREATE OR REPLACE VIEW rpt.v_cde_en_cours\n  COPY GRANTS                 -- garde les droits déjà donnés sur la vue\n  COMMENT = 'Commandes en cours, pour Power BI. Responsable : équipe data'\nAS\nSELECT c.num_cde    AS num_commande,\n       cl.nom       AS client,\n       c.date_cde   AS date_commande,\n       c.montant_ht AS montant_ht\nFROM ventes.commande AS c\nJOIN ventes.client   AS cl ON cl.id = c.client_id\nWHERE c.statut = 'EN_COURS';\nGRANT SELECT ON VIEW rpt.v_cde_en_cours TO ROLE role_powerbi;",
        mysql: "-- Le DEFINER est le compte qui crée la vue : un compte technique de déploiement\nCREATE OR REPLACE ALGORITHM = MERGE SQL SECURITY DEFINER\nVIEW ventes_rpt.v_cde_en_cours AS\nSELECT c.num_cde    AS num_commande,\n       cl.nom       AS client,\n       c.date_cde   AS date_commande,\n       c.montant_ht AS montant_ht\nFROM ventes_dwh.commande AS c\nJOIN ventes_dwh.client   AS cl ON cl.id = c.client_id\nWHERE c.statut = 'EN_COURS';\nGRANT SELECT ON ventes_rpt.v_cde_en_cours TO role_powerbi;"
      }
    },
    etapes: [
      {
        titre: "Le rôle de la vue",
        questions: [
          {
            id: "usage",
            q: "À quoi sert cette vue : simplifier, cacher des colonnes, ou donner un contrat stable à un rapport ?",
            pourquoi: "Une vue sans but clair devient un objet de plus à maintenir. Une vue fourre-tout finit lue par dix rapports, qui n'en prennent chacun que trois colonnes, et que personne n'ose changer.",
            reflexe: "Écris son rôle en une phrase, en tête du script : « contrat de Power BI pour les commandes en cours ». Une vue, un usage, un responsable."
          },
          {
            id: "lecteurs",
            q: "Qui la lira : Power BI, Excel, un flux, l'ERP ?",
            pourquoi: "Le lecteur fixe les règles. Power BI veut des noms clairs et stables ; un flux veut des types exacts ; un utilisateur d'Excel ne doit pas voir l'IBAN des clients.",
            reflexe: "Note chaque lecteur et son besoin, comme pour une table. Pour Power BI, range la vue dans le schéma `rpt`, le seul qu'il peut lire. Le détail : « Je prépare des données pour Power BI »."
          },
          {
            id: "vue-ou-table",
            q: "Une vue suffit-elle, ou faut-il un résultat calculé à l'avance ?",
            pourquoi: "Une vue ne stocke rien : sa requête tourne à chaque lecture. Une vue lourde, lue 500 fois par jour par Power BI, refait 500 fois le même calcul.",
            reflexe: "Requête simple : une vue. Calcul lourd, lu souvent, sur des données qui changent peu : une table chargée par un traitement, une vue indexée (SQL Server), ou matérialisée (Snowflake). Mesure d'abord."
          }
        ]
      },
      {
        titre: "Les colonnes",
        questions: [
          {
            id: "pas-etoile",
            q: "As-tu écrit la liste des colonnes, sans SELECT * ?",
            pourquoi: "Une vue en `SELECT *` dépend de la forme de la table. Le jour où l'ERP ajoute une colonne, la vue ne la montre pas, sans bruit, ou elle casse : cela dépend du moteur.",
            reflexe: "Liste chaque colonne, avec un nom clair : `c.num_cde AS num_commande`. Une colonne ajoutée à la table n'entre dans la vue que si tu le décides.",
            moteurs: {
              sqlserver: "Sans `SCHEMABINDING` (le lien fort avec la table), la vue garde la liste de colonnes de sa création : la nouvelle n'apparaît pas. Après un changement de la table : `EXEC sp_refreshview 'rpt.v_cde_en_cours';`.",
              snowflake: "Après une colonne ajoutée, supprimée ou déplacée, une vue `SELECT *` renvoie une erreur de colonne, jusqu'à ce qu'on la recrée.",
              mysql: "La définition est figée à la création : une colonne ajoutée n'entre pas, une colonne supprimée donne une erreur."
            }
          },
          {
            id: "noms-colonnes",
            q: "Les noms des colonnes de la vue sont-ils ceux que le lecteur comprend ?",
            pourquoi: "Power BI affiche les noms tels quels : `MNT_HT_2` ou `TIERS` n'aident personne. Et renommer une colonne de la vue plus tard casse les rapports qui la lisent.",
            reflexe: "Des noms métier, en minuscules : `montant_ht`, `client`, `date_commande`. Choisis-les une fois : ils deviennent le contrat. Le détail : « Je nomme les tables et les colonnes »."
          },
          {
            id: "calculs",
            q: "Chaque colonne calculée a-t-elle un nom et un type écrits ?",
            pourquoi: "Un calcul sans `CAST` prend le type que le moteur déduit : `qte * prix_unit` sort plus large que prévu, et Power BI le lit autrement. Sans alias, la colonne n'a même pas de nom utilisable.",
            reflexe: "Convertis et nomme chaque calcul : `CAST(qte * prix_unit AS DECIMAL(12,2)) AS montant_ligne`.",
            moteurs: {
              snowflake: "Une vue dont une colonne vient d'un calcul exige un nom pour chaque colonne : un alias, ou la liste des colonnes après le nom de la vue."
            }
          },
          {
            id: "order-by",
            q: "As-tu mis un ORDER BY dans la vue ?",
            pourquoi: "Le tri d'une vue n'est pas garanti à la lecture. SQL Server refuse `ORDER BY` sans `TOP` ; avec `TOP 100 PERCENT`, il l'accepte, mais l'ordre lu peut changer.",
            reflexe: "Pas d'`ORDER BY` dans la vue. Le tri va dans la requête qui lit la vue, ou dans le rapport.",
            moteurs: {
              snowflake: "Accepté, mais sa doc conseille de l'enlever : la vue trie pour rien quand elle est jointe ou filtrée.",
              mysql: "Accepté, mais ignoré si la requête qui lit la vue a son propre `ORDER BY`."
            }
          }
        ]
      },
      {
        titre: "Un contrat stable",
        questions: [
          {
            id: "changements",
            q: "Qui verra qu'une table change sous la vue, avant les utilisateurs ?",
            pourquoi: "Une colonne renommée ou supprimée dans la table casse la vue, et le rapport Power BI, au prochain rafraîchissement. Personne n'est prévenu avant.",
            reflexe: "Avant de modifier une table, liste les vues qui la lisent. Après chaque mise en production, lis chaque vue de `rpt`, une fois. Le détail : « Je modifie une table qui sert déjà ».",
            moteurs: {
              sqlserver: "`WITH SCHEMABINDING` interdit de supprimer ou de changer une colonne lue par la vue : l'`ALTER TABLE` échoue au lieu de casser la vue. Il exige les noms en deux parties (`dbo.commande`).",
              snowflake: "Pas de lien fort : la vue est relue à chaque requête, et casse si une colonne disparaît. Elle remarche si la colonne revient.",
              mysql: "Pas de lien fort non plus. `CHECK TABLE ventes_rpt.v_cde_en_cours;` signale une vue cassée."
            }
          },
          {
            id: "imbriquees",
            q: "Ta vue lit-elle d'autres vues, qui en lisent d'autres ?",
            pourquoi: "Des vues empilées cachent des jointures en double et des colonnes inutiles. Le moteur doit tout déplier : une requête simple sur la dernière vue devient énorme, et lente.",
            reflexe: "Évite d'empiler les vues. Si une vue en lit une autre, lis le plan de la requête finale ; si la vue du dessous fait trop de travail, lis plutôt les tables.",
            moteurs: {
              snowflake: "Au-delà de 20 niveaux de vues imbriquées, la création échoue (sa doc)."
            }
          },
          {
            id: "script",
            q: "Le script de la vue est-il rangé dans Git, et peut-il tourner deux fois sans perdre les droits ?",
            pourquoi: "Une vue retouchée à la main en production n'existe nulle part ailleurs : la recette diverge, et la prochaine livraison écrase la correction. Et une vue recréée peut perdre ses droits.",
            reflexe: "Un fichier par vue, dans Git. Écris-le pour qu'il tourne deux fois sans dégât, puis vérifie que le lecteur a toujours son droit.",
            moteurs: {
              sqlserver: "`CREATE OR ALTER VIEW` (depuis SQL Server 2016 SP1) remplace la définition sur place ; un `DROP` puis un `CREATE` fait repartir les droits de zéro.",
              snowflake: "`CREATE OR REPLACE VIEW … COPY GRANTS` : sans `COPY GRANTS`, la nouvelle vue perd les droits donnés à l'ancienne (sauf les droits futurs du schéma).",
              mysql: "`CREATE OR REPLACE VIEW`, qui demande aussi le droit `DROP` sur la vue."
            }
          }
        ]
      },
      {
        titre: "Les droits",
        questions: [
          {
            id: "droit-vue",
            q: "Le lecteur reçoit-il le droit sur la vue seulement, sans droit sur les tables ?",
            pourquoi: "Avec le droit sur la table, le lecteur contourne la vue : il voit toutes les colonnes et toutes les lignes, IBAN compris.",
            reflexe: "Donne `SELECT` sur la vue, ou sur le schéma `rpt`, à un rôle : rien sur les tables. Teste avec le vrai compte : la vue répond, la table est refusée. Le détail : « Je donne des droits ».",
            moteurs: {
              sqlserver: "Ça marche si la vue et les tables ont le même propriétaire, souvent `dbo` : SQL Server ne vérifie alors pas les droits sur les tables (le chaînage des propriétaires).",
              snowflake: "Ça marche si le rôle propriétaire de la vue a accès aux tables (sa doc).",
              mysql: "Par défaut (`SQL SECURITY DEFINER`), la vue agit avec les droits de son `DEFINER`, le compte qui l'a créée."
            }
          },
          {
            id: "definer",
            q: "Qui est le DEFINER de la vue, et ce compte existera-t-il toujours ?",
            pourquoi: "La vue agit avec les droits de son `DEFINER` (son créateur, par défaut). Si ce compte disparaît, lire la vue donne une erreur. MySQL refuse d'ailleurs de supprimer un compte qui est `DEFINER`.",
            reflexe: "Crée les vues avec un compte technique de déploiement, jamais avec ton compte. `SQL SECURITY INVOKER` si chaque lecteur doit utiliser ses propres droits sur les tables.",
            seulement: ["mysql"]
          },
          {
            id: "secure",
            q: "La vue protège-t-elle des données, au point de devoir être sécurisée (SECURE) ?",
            pourquoi: "Une vue normale montre sa définition, et certaines optimisations peuvent laisser deviner des lignes cachées. Une vue `SECURE` cache tout cela, mais elle peut être plus lente.",
            reflexe: "`CREATE SECURE VIEW` pour une vue qui protège des données (IBAN, salaires, lignes d'un autre dépôt) ou qui est partagée. Pas pour une vue de simple confort.",
            seulement: ["snowflake"]
          }
        ]
      },
      {
        titre: "La vitesse",
        questions: [
          {
            id: "rapide",
            q: "La requête de la vue est-elle rapide sur le vrai volume, avec les filtres du rapport ?",
            pourquoi: "Lire la vue, c'est exécuter sa requête. Une jointure sans index, ou une fonction autour d'une colonne filtrée, rend chaque rapport lent, chaque matin.",
            reflexe: "Lance la requête de la vue avec les filtres que Power BI ajoutera, sur une copie de la production, et lis le plan. Le détail : « Ma requête est lente ».",
            moteurs: {
              mysql: "`ALGORITHM = MERGE` fond la vue dans la requête qui la lit, en général plus efficace (sa doc). `TEMPTABLE` la calcule d'abord dans une table temporaire, et rend la vue non modifiable."
            }
          },
          {
            id: "indexee",
            q: "Faut-il une vue indexée, dont le résultat est stocké ?",
            pourquoi: "Une vue indexée range son résultat comme une table : les lectures vont vite. Mais chaque écriture dans les tables de base la met à jour, et ses conditions sont strictes.",
            reflexe: "Seulement pour un agrégat lourd, lu souvent, sur des tables peu écrites. `SCHEMABINDING`, noms en deux parties, pas d'`OUTER JOIN` ni de `TOP`, `COUNT_BIG(*)` avec `GROUP BY`, puis un index cluster unique. En édition Standard, lis-la avec `WITH (NOEXPAND)`.",
            seulement: ["sqlserver"]
          },
          {
            id: "materialisee",
            q: "Faut-il une vue matérialisée, ou une table dynamique ?",
            pourquoi: "Une vue matérialisée stocke son résultat et se tient à jour seule, mais sur une seule table, sans jointure, en édition Enterprise. Son entretien se paie en crédits, à chaque changement de la table.",
            reflexe: "Vue matérialisée : accélérer une requête sur une seule table qui change peu. Jointures et agrégats d'un entrepôt : une table dynamique, rafraîchie avec un retard choisi (`TARGET_LAG`, 1 minute au moins), payée en warehouse (le moteur de calcul).",
            seulement: ["snowflake"]
          }
        ]
      },
      {
        titre: "Écrire à travers la vue",
        questions: [
          {
            id: "ecritures",
            q: "Quelqu'un écrira-t-il à travers la vue (INSERT, UPDATE) ?",
            pourquoi: "Une vue simple, sur une seule table, accepte des écritures : un utilisateur peut alors modifier des commandes « depuis un rapport ». Une vue avec agrégat les refuse.",
            reflexe: "Pour un rapport : aucune écriture, le droit `SELECT` seul. Si une application doit écrire par la vue, ajoute `WITH CHECK OPTION` : une ligne modifiée doit rester visible dans la vue.",
            moteurs: {
              sqlserver: "Une écriture ne touche qu'une seule table de base. Avec `WITH CHECK OPTION`, passer une commande de `EN_COURS` à `LIVREE` par `v_cde_en_cours` est refusé.",
              snowflake: "Les vues sont en lecture seule : pas d'`INSERT` ni d'`UPDATE` sur une vue.",
              mysql: "Vue modifiable si une ligne de la vue = une ligne de la table : pas de `GROUP BY`, `DISTINCT`, `UNION`, ni `TEMPTABLE`. `WITH CHECK OPTION` vaut `CASCADED` par défaut."
            }
          }
        ]
      },
      {
        titre: "Le nom et la description",
        questions: [
          {
            id: "nom",
            q: "Le nom dit-il que c'est une vue, et ce qu'elle montre ?",
            pourquoi: "Une vue nommée comme une table trompe : on croit lire des données stockées, ou on cherche où modifier une ligne.",
            reflexe: "Le préfixe de ta règle et un nom métier : `rpt.v_cde_en_cours`. Le détail : « Je nomme les tables et les colonnes »."
          },
          {
            id: "description",
            q: "Où est écrit ce que montre la vue, et qui en est responsable ?",
            pourquoi: "Sans description, personne n'ose modifier une vue que trois rapports lisent peut-être. Elle reste figée, ou elle casse sans prévenir.",
            reflexe: "En tête du script : le rôle, les lecteurs, le responsable, le ticket. Et une description dans la base, quand le moteur le permet.",
            moteurs: {
              sqlserver: "Une propriété étendue `MS_Description` (procédure `sp_addextendedproperty`).",
              snowflake: "`COMMENT = '…'` dans le `CREATE VIEW`.",
              mysql: "Pas de commentaire sur une vue : écris-le dans le script."
            }
          }
        ]
      }
    ],
    pieges: [
      "`SELECT *` dans une vue SQL Server : la colonne ajoutée à la table n'apparaît pas, sans erreur, jusqu'à `sp_refreshview`. Sur Snowflake, la même vue renvoie une erreur.",
      "`ORDER BY` avec `TOP 100 PERCENT` dans une vue : accepté, mais le rapport reçoit les lignes dans un ordre quelconque.",
      "`CREATE OR REPLACE VIEW` sans `COPY GRANTS` sur Snowflake : les droits donnés à la main sur l'ancienne vue sont perdus, et Power BI échoue au rafraîchissement suivant.",
      "Le droit `SELECT` donné sur les tables « pour que la vue marche » : le lecteur lit aussi les tables, colonnes cachées comprises.",
      "Une vue de vues de vues : une requête simple pour Power BI devient une énorme requête, avec des jointures en double.",
      "Une vue MySQL créée avec ton compte personnel : à ton départ, le compte ne peut pas être supprimé ; s'il l'est quand même, la vue renvoie une erreur.",
      "Une vue indexée sur une table de mouvements très écrite : chaque `INSERT` met aussi la vue à jour, et l'import de nuit ralentit."
    ],
    pratique: "Divalto livre ses vues de reporting (suffixe `_V`, script ERP_Divalto_SqlView.sql). Sa doc déconseille de modifier ce script : à la montée de version, tes changements seraient difficiles à retrouver. Crée tes vues dans un script à part, suffixe `_VU`.",
    motsCles: ["vue", "view", "create view", "vue indexée", "vue matérialisée", "table dynamique", "schemabinding", "sp_refreshview", "secure view", "check option", "definer", "select étoile", "vue imbriquée", "contrat", "power bi"],
    voirAussi: ["creer-schema", "droits", "donnees-powerbi", "nommer", "modifier-table", "requete-lente", "creer-index", "documenter"],
    dico: ["create-view", "select", "order-by", "top", "inner-join", "create-index", "with-cte"],
    outils: ["traduire"],
    sources: [
      { titre: "CREATE VIEW (Transact-SQL)", url: "https://learn.microsoft.com/fr-fr/sql/t-sql/statements/create-view-transact-sql" },
      { titre: "SQL Server : créer des vues indexées", url: "https://learn.microsoft.com/fr-fr/sql/relational-databases/views/create-indexed-views" },
      { titre: "SQL Server : les autorisations (chaînage des propriétaires)", url: "https://learn.microsoft.com/fr-fr/sql/relational-databases/security/permissions-database-engine" },
      { titre: "Snowflake : CREATE VIEW", url: "https://docs.snowflake.com/en/sql-reference/sql/create-view" },
      { titre: "Snowflake : les vues matérialisées", url: "https://docs.snowflake.com/en/user-guide/views-materialized" },
      { titre: "Snowflake : les vues sécurisées", url: "https://docs.snowflake.com/en/user-guide/views-secure" },
      { titre: "MySQL 8.4 : CREATE VIEW", url: "https://dev.mysql.com/doc/refman/8.4/en/create-view.html" },
      { titre: "MySQL 8.4 : contrôle d'accès des objets stockés (DEFINER)", url: "https://dev.mysql.com/doc/refman/8.4/en/stored-objects-security.html" }
    ]
  },
  {
    id: "modifier-table",
    titre: "Je modifie une table qui sert déjà",
    famille: "Concevoir",
    resume: "Changer une table en service : qui la lit, ajouter, agrandir, retyper, renommer ou supprimer une colonne, les contraintes sur l'existant, les verrous, la durée et le script rejouable.",
    besoins: [
      "je modifie une table qui sert déjà",
      "ajouter une colonne en production",
      "changer le type d'une colonne déjà remplie",
      "renommer ou supprimer une colonne sans tout casser"
    ],
    essais: [
      "alter table add column not null default",
      "agrandir un varchar sur une grosse table",
      "alter table algorithm instant mysql",
      "modifier la structure d'une table lue par power bi"
    ],
    exemple: {
      texte: "Les avis d'expédition (DESADV) doivent garder le poids des colis : tu ajoutes `poids_kg` à `flux_edi`, une table lue par Power BI et écrite toute la journée. Et `motif`, 60 caractères, doit passer à 200 pour les nouveaux messages de rejet. Avant l'`ALTER TABLE`, tu cherches qui lit la table, tu mesures sur une copie, et tu écris un script rejouable.",
      code: "-- SI-2107 · rejouable · lancé à 19 h, hors flux EDI\nSET LOCK_TIMEOUT 10000;   -- abandonne après 10 s d'attente, au lieu de bloquer le flux\nIF COL_LENGTH('dbo.flux_edi', 'poids_kg') IS NULL\n  ALTER TABLE dbo.flux_edi ADD poids_kg DECIMAL(9,3) NULL;   -- NULL : rien à inventer pour l'existant\nALTER TABLE dbo.flux_edi ALTER COLUMN motif VARCHAR(200) NULL;  -- la définition complète\n-- Qui cite la table ? (les vues, procédures et fonctions de cette base)\nSELECT referencing_schema_name, referencing_entity_name\nFROM sys.dm_sql_referencing_entities('dbo.flux_edi', 'OBJECT');",
      codes: {
        snowflake: "-- Pas de DEFAULT possible avec IF NOT EXISTS (sa doc)\nALTER TABLE edi.flux_edi ADD COLUMN IF NOT EXISTS poids_kg NUMBER(9,3);\n-- Agrandir un VARCHAR : permis. Réduire, ou changer de type : refusé.\nALTER TABLE edi.flux_edi ALTER COLUMN motif SET DATA TYPE VARCHAR(200);\n-- Les objets qui citent la table (jusqu'à 3 h de retard)\nSELECT referencing_object_name, referencing_object_domain\nFROM snowflake.account_usage.object_dependencies\nWHERE referenced_object_name = 'FLUX_EDI';",
        mysql: "SET SESSION lock_wait_timeout = 10;   -- 10 s d'attente au plus (défaut : 1 an)\nALTER TABLE flux_edi ADD COLUMN poids_kg DECIMAL(9,3) NULL, ALGORITHM = INSTANT;\n-- motif : 60 → 200 caractères en utf8mb4, soit 240 → 800 octets. Le cap des\n-- 255 octets est franchi : INPLACE est refusé, seule une copie de la table marche.\nALTER TABLE flux_edi MODIFY motif VARCHAR(200) NULL, ALGORITHM = COPY;   -- la nuit"
      }
    },
    etapes: [
      {
        titre: "Qui utilise la table",
        questions: [
          {
            id: "dependances",
            q: "Qui lit ou écrit cette table : vues, procédures, rapports, flux, ETL ?",
            pourquoi: "Une colonne renommée ou retypée casse la vue de Power BI, l'export comptable ou le flux EDI qui la lisaient. On le découvre le lendemain, à l'ouverture.",
            reflexe: "Liste les objets SQL qui citent la table, puis demande aux responsables des rapports et des flux. Power BI, Excel, l'ETL et l'ERP n'apparaissent dans aucune vue système.",
            moteurs: {
              sqlserver: "`sys.dm_sql_referencing_entities('dbo.flux_edi', 'OBJECT')` : les vues, procédures et fonctions de la base qui citent la table par son nom. Pas les objets des autres bases.",
              snowflake: "La vue `SNOWFLAKE.ACCOUNT_USAGE.OBJECT_DEPENDENCIES` liste les vues qui dépendent de la table, avec jusqu'à 3 h de retard. `ACCESS_HISTORY` (édition Enterprise) montre qui l'a lue.",
              mysql: "Cherche le nom de la table dans `information_schema.VIEWS` (colonne `VIEW_DEFINITION`) et `information_schema.ROUTINES` (colonne `ROUTINE_DEFINITION`)."
            }
          },
          {
            id: "position",
            q: "Un programme lit-il les colonnes par leur position, ou par SELECT * ?",
            pourquoi: "Un export qui lit « la 5e colonne », ou un `INSERT INTO … SELECT *`, se décale dès qu'une colonne arrive : le poids part dans la colonne du motif, sans erreur.",
            reflexe: "Ne dépends jamais de l'ordre des colonnes : chaque programme nomme les siennes. Ajoute toujours la nouvelle colonne à la fin, et cherche les `SELECT *` avant le changement.",
            moteurs: {
              sqlserver: "Changer l'ordre des colonnes oblige à recréer la table (SSMS le bloque par défaut). Microsoft le déconseille : les colonnes se nomment dans chaque requête.",
              snowflake: "Une vue en `SELECT *` renvoie une erreur après une colonne ajoutée, supprimée ou déplacée.",
              mysql: "Déplacer une colonne qui existe (`MODIFY … AFTER`) reconstruit toute la table : une opération lourde (sa doc)."
            }
          }
        ]
      },
      {
        titre: "Ajouter une colonne",
        questions: [
          {
            id: "obligatoire",
            q: "La nouvelle colonne doit-elle être obligatoire (NOT NULL) dès le premier jour ?",
            pourquoi: "Une colonne `NOT NULL` ajoutée à une table pleine a besoin d'une valeur pour les lignes déjà là. Sans `DEFAULT`, c'est refusé ; avec, chaque ligne ancienne reçoit cette valeur, même fausse pour elle.",
            reflexe: "Souvent : ajoute-la en `NULL`, remplis les lignes anciennes par lots, puis passe-la en `NOT NULL`. Une valeur par défaut seulement si elle a un vrai sens pour les lignes anciennes.",
            moteurs: {
              sqlserver: "Une colonne `NULL` ajoutée avec un `DEFAULT` reste vide sur les lignes déjà là, sauf avec `WITH VALUES`.",
              snowflake: "Une colonne ajoutée avec un `DEFAULT` remplit toutes les lignes déjà là. Ce `DEFAULT` doit être une valeur simple : `DEFAULT CURRENT_TIMESTAMP()` est refusé dans un `ADD COLUMN`."
            }
          },
          {
            id: "cout-ajout",
            q: "Ajouter la colonne réécrit-il toute la table, ou seulement sa description ?",
            pourquoi: "Sur une grosse table, réécrire chaque ligne prend des heures, gonfle le journal et bloque les écritures. La même commande peut être immédiate sur une édition, et très lourde sur une autre.",
            reflexe: "Vérifie, pour ton moteur, ta version et ton édition, si l'ajout ne change que la description de la table (les métadonnées). Puis mesure-le sur une copie de taille réelle.",
            moteurs: {
              sqlserver: "En édition Enterprise, `NOT NULL` avec un `DEFAULT` fixe ne touche que les métadonnées. Avec `NEWID()` ou un type `MAX` : hors ligne, table bloquée. Sur une autre édition : chaque ligne est réécrite (sa doc).",
              mysql: "`ALGORITHM = INSTANT` est le défaut de MySQL 8.4 pour ajouter une colonne, à toute position. Après 64 ajouts ou retraits instantanés, il faut reconstruire la table."
            }
          }
        ]
      },
      {
        titre: "Changer une colonne",
        questions: [
          {
            id: "type",
            q: "Changer le type d'une colonne : chaque valeur passera-t-elle, et combien de temps ?",
            pourquoi: "Changer un type convertit chaque ligne : la table est réécrite, le journal grossit, les écritures attendent. Une seule valeur qui ne passe pas annule tout, après des heures.",
            reflexe: "Liste d'abord les valeurs qui ne passeront pas : `TRY_CAST(col AS …) IS NULL`. Sur une grosse table : une nouvelle colonne, remplie par lots, puis la bascule. Le choix du type : « Je choisis le type de chaque colonne ».",
            moteurs: {
              sqlserver: "Refusé si la colonne est dans une clé primaire ou étrangère. Dans un index : seulement agrandir un `VARCHAR`. Avec un `CHECK` ou un `DEFAULT` : pas de changement de type. `ONLINE = ON` (depuis 2016, édition Enterprise) laisse la table utilisable, mais double la place.",
              snowflake: "Pas de changement de type sur place : seulement agrandir un `VARCHAR`, ou la précision d'un `NUMBER`. Sinon : nouvelle colonne, `UPDATE`, `DROP`, puis `RENAME`.",
              mysql: "Changer le type demande une copie de la table (`ALGORITHM = COPY`), et les écritures attendent la fin."
            }
          },
          {
            id: "agrandir",
            q: "Agrandir ou réduire un texte (VARCHAR) : que fait vraiment le moteur ?",
            pourquoi: "Agrandir paraît anodin, mais peut réécrire toute la table selon le moteur. Réduire peut couper des valeurs, ou être refusé.",
            reflexe: "Agrandis plutôt que réduire. Avant de réduire, mesure la plus longue valeur : `SELECT MAX(LEN(motif)) FROM dbo.flux_edi`. Écris la définition complète de la colonne, `NULL` ou `NOT NULL` compris.",
            moteurs: {
              sqlserver: "`ALTER COLUMN motif VARCHAR(200)` sans `NOT NULL` rend la colonne facultative, sans message.",
              snowflake: "`SET DATA TYPE VARCHAR(200)` : agrandir est permis ; réduire ne l'est pas (sa doc).",
              mysql: "Sur place seulement si la taille reste du même côté de 255 octets. En utf8mb4 (4 octets par caractère), `VARCHAR(60)` vers `VARCHAR(200)` franchit ce cap : copie de la table."
            }
          },
          {
            id: "renommer",
            q: "Renommer une colonne ou la table : qui utilise encore l'ancien nom ?",
            pourquoi: "Tout ce qui cite l'ancien nom casse : vues, procédures, rapports, flux, exports. Le moteur ne corrige pas leur code.",
            reflexe: "Évite de renommer une table en service. Sinon : ajoute la nouvelle colonne, garde l'ancienne le temps de migrer les lecteurs, ou garde l'ancien nom par une vue. Le détail : « Je nomme les tables et les colonnes ».",
            moteurs: {
              sqlserver: "`sp_rename` ne corrige pas le code des vues et procédures qui citent l'ancien nom. Microsoft déconseille de l'utiliser sur une vue ou une procédure.",
              snowflake: "Une colonne de la clé de clustering (l'ordre de rangement choisi) ne peut pas être renommée. Renommer une colonne citée par un index secondaire (édition Enterprise) supprime cet index.",
              mysql: "`RENAME COLUMN` sans changer le type est instantané. Une colonne citée par la clé étrangère d'une autre table : seulement `ALGORITHM = INPLACE`."
            }
          },
          {
            id: "supprimer-colonne",
            q: "Supprimer une colonne : est-elle vraiment inutile, et la place revient-elle ?",
            pourquoi: "Une colonne « inutile » sert parfois une fois par an, à la clôture. Et la supprimer ne rend pas toujours la place sur le disque.",
            reflexe: "Vérifie qu'aucun objet ni rapport ne la lit. Arrête d'abord de la remplir, attends un cycle complet (un mois, une clôture), puis supprime-la, avec une copie de ses valeurs.",
            moteurs: {
              sqlserver: "La place ne revient qu'après une reconstruction de l'index cluster (`ALTER INDEX … REBUILD`).",
              snowflake: "La place ne revient qu'à la réécriture de chaque micro-partition (bloc de stockage), puis à la fin du Time Travel (relire le passé).",
              mysql: "`DROP COLUMN` est instantané par défaut en 8.4, sauf si la colonne porte un index fonctionnel."
            }
          }
        ]
      },
      {
        titre: "Les contraintes",
        questions: [
          {
            id: "contrainte-existant",
            q: "La nouvelle contrainte est-elle vraie pour toutes les lignes déjà là ?",
            pourquoi: "Ajouter un `CHECK`, une clé étrangère ou `NOT NULL` à une table pleine : une seule ligne fausse fait échouer l'ordre. Ou, selon l'option, l'ordre passe, et les lignes fausses restent.",
            reflexe: "Cherche d'abord les lignes qui violent la règle, corrige-les avec le métier, puis ajoute la contrainte en vérifiant l'existant.",
            moteurs: {
              sqlserver: "`WITH CHECK`, le défaut pour une nouvelle contrainte, vérifie l'existant. `WITH NOCHECK` le saute : la contrainte est « non approuvée », et l'optimiseur l'ignore. Microsoft le déconseille.",
              snowflake: "Un `CHECK` ajouté à une table qui existe ne vérifie pas les lignes déjà là (`ENABLE NOVALIDATE`). Et la table ne peut plus être chargée par `COPY INTO`.",
              mysql: "Un `CHECK` ajouté vérifie les lignes déjà là : une seule ligne fausse, et la table n'est pas modifiée. `NOT NULL` est refusé s'il reste des NULL."
            }
          }
        ]
      },
      {
        titre: "Les verrous et la durée",
        questions: [
          {
            id: "attente-verrou",
            q: "Ton ALTER TABLE peut-il attendre un verrou, et bloquer tout le monde derrière lui ?",
            pourquoi: "L'`ALTER` demande un verrou sur la structure de la table. Si un rapport ou un `BEGIN TRAN` oublié la tient, il attend ; et toutes les requêtes suivantes attendent derrière lui. L'ERP semble figé.",
            reflexe: "Juste avant, cherche les transactions ouvertes sur la table. Fixe un délai d'attente court : l'ordre échoue proprement, et tu le relances plus tard.",
            moteurs: {
              sqlserver: "`SET LOCK_TIMEOUT 10000;` (en millisecondes) avant l'`ALTER` : par défaut, l'attente est sans fin (-1).",
              mysql: "`SET SESSION lock_wait_timeout = 10;` (en secondes ; le défaut est d'un an). `SHOW FULL PROCESSLIST` montre les requêtes qui attendent ce verrou."
            }
          },
          {
            id: "duree",
            q: "Combien de temps dure le changement sur le vrai volume, et le journal suivra-t-il ?",
            pourquoi: "1 seconde en recette sur 1 000 lignes, 40 minutes en production sur 30 millions. Pendant ce temps, le journal grossit, et la table peut rester bloquée.",
            reflexe: "Chronomètre sur une copie récente de la production. Vérifie la place du journal et du disque. Réserve la fenêtre, avec de la marge.",
            moteurs: {
              sqlserver: "Un changement qui touche toutes les lignes peut durer longtemps et remplir le journal. Microsoft conseille le même soin que pour un gros `UPDATE`.",
              mysql: "Avec `ALGORITHM = COPY`, la table est recopiée ligne à ligne, et les écritures attendent la fin."
            }
          },
          {
            id: "algorithme",
            q: "As-tu écrit ALGORITHM et LOCK dans l'ordre ALTER TABLE ?",
            pourquoi: "Sans eux, MySQL prend la meilleure méthode possible, jusqu'à la copie complète de la table, sans prévenir. Avec eux, il échoue si c'est impossible : tu le sais avant de bloquer la production.",
            reflexe: "`ALGORITHM = INSTANT` pour ajouter ou supprimer une colonne ; `ALGORITHM = INPLACE, LOCK = NONE` pour un index ou un `VARCHAR` agrandi. Une erreur ? Une copie serait nécessaire : planifie-la la nuit.",
            seulement: ["mysql"]
          }
        ]
      },
      {
        titre: "Le script et le retour",
        questions: [
          {
            id: "rejouable",
            q: "Le script peut-il tourner deux fois sans erreur ?",
            pourquoi: "Coupé au milieu puis relancé, un script non rejouable plante sur la colonne déjà ajoutée, ou ajoute deux fois la même contrainte.",
            reflexe: "Chaque étape vérifie avant d'agir : la colonne existe-t-elle déjà ? Lance-le deux fois de suite en recette.",
            moteurs: {
              sqlserver: "`IF COL_LENGTH('dbo.flux_edi', 'poids_kg') IS NULL ALTER TABLE …`, comme dans l'exemple.",
              snowflake: "`ADD COLUMN IF NOT EXISTS`, mais pas avec un `DEFAULT`, une clé ou `IDENTITY` (sa doc). Et chaque `ALTER` valide la transaction en cours.",
              mysql: "Pas de `ADD COLUMN IF NOT EXISTS` : teste d'abord `information_schema.COLUMNS`."
            }
          },
          {
            id: "retour",
            q: "Si ça tourne mal, comment reviens-tu à l'état d'avant ?",
            pourquoi: "Un type changé coupe des décimales ; une colonne supprimée emporte ses valeurs. Sans copie d'avant et sans script inverse testé, on répare à la main, sous pression.",
            reflexe: "Juste avant : une sauvegarde, ou une copie datée de la table (`flux_edi_avant_si2107`), vérifiée. Écris le script inverse et teste-le en recette. Le détail : « Je mets un script en production ».",
            moteurs: {
              sqlserver: "Un `ALTER TABLE` lancé dans une transaction (`BEGIN TRAN`) s'annule par `ROLLBACK`. Mais la table reste verrouillée jusqu'à la fin de la transaction.",
              snowflake: "`CREATE TABLE edi.flux_edi_avant CLONE edi.flux_edi;` : une copie rapide. Un `ALTER` valide la transaction : pas de `ROLLBACK`.",
              mysql: "Un `ALTER TABLE` valide la transaction en cours : le retour passe par le script inverse, ou la sauvegarde."
            }
          },
          {
            id: "prevenir",
            q: "Quand lancer le changement, et qui prévenir avant et après ?",
            pourquoi: "Lancé pendant la saisie ou le flux EDI, l'`ALTER` bloque tout le monde. Fait sans prévenir, il casse un rapport que personne ne surveille.",
            reflexe: "Une fenêtre calme, hors clôture et hors traitements de nuit. La veille, préviens les responsables des rapports et des flux ; après, confirme la fin, ou le retour arrière."
          }
        ]
      },
      {
        titre: "Snowflake : index et clustering",
        questions: [
          {
            id: "sf-index",
            q: "La colonne changée est-elle dans une clé de clustering ou un index secondaire ?",
            pourquoi: "Renommer, supprimer ou changer le type d'une colonne citée par un index secondaire supprime l'index. Et une colonne de la clé de clustering (l'ordre de rangement choisi) ne peut pas être renommée.",
            reflexe: "Avant le changement : `SHOW INDEXES IN TABLE edi.flux_edi;` et `SHOW TABLES` (colonne `cluster_by`). Recrée l'index dans le même script, juste après.",
            seulement: ["snowflake"]
          }
        ]
      }
    ],
    pieges: [
      "`ALTER COLUMN motif VARCHAR(200)` sans `NOT NULL` sur SQL Server : la colonne devient facultative, sans message. Le `MODIFY` de MySQL perd aussi le `DEFAULT`.",
      "Un `ALTER TABLE` lancé pendant qu'un rapport tient la table : il attend, et toutes les requêtes suivantes s'empilent derrière lui.",
      "Un export qui lit les colonnes par leur position : la colonne ajoutée décale tout, sans erreur.",
      "`WITH NOCHECK` pour aller vite : les lignes fausses restent, et l'optimiseur ignore la contrainte « non approuvée ».",
      "Snowflake : `ADD COLUMN … DEFAULT CURRENT_TIMESTAMP()` est refusé ; seule une valeur fixe passe.",
      "MySQL : `VARCHAR(60)` agrandi en `VARCHAR(200)` en utf8mb4 franchit 255 octets : la table entière est copiée, et les écritures attendent.",
      "Supprimer une colonne « jamais utilisée » : le rapport de clôture annuelle la lisait.",
      "Snowflake : changer le type d'une colonne citée par un index secondaire supprime l'index, et les recherches redeviennent lentes."
    ],
    pratique: "Sur la base Divalto, la structure vient du dictionnaire. Sa doc prévient : changer le type d'un champ, puis synchroniser le dictionnaire (XPSQL), renomme la table et en recrée une ; le suivi des modifications SQL de cette table est perdu.",
    motsCles: ["alter table", "ajouter une colonne", "add column", "alter column", "changer le type", "agrandir", "renommer", "supprimer une colonne", "drop column", "sp_rename", "dépendances", "verrou", "instant", "nocheck", "structure"],
    voirAussi: ["mettre-en-prod", "choisir-types", "nommer", "creer-vue", "creer-index", "sauvegarder", "script-fichier", "transaction"],
    dico: ["alter-table", "alter-column", "not-null", "default", "check", "foreign-key", "try-cast", "longueur-precision"],
    outils: ["gp-changements"],
    sources: [
      { titre: "ALTER TABLE (Transact-SQL)", url: "https://learn.microsoft.com/fr-fr/sql/t-sql/statements/alter-table-transact-sql" },
      { titre: "sys.dm_sql_referencing_entities (Transact-SQL)", url: "https://learn.microsoft.com/fr-fr/sql/relational-databases/system-dynamic-management-views/sys-dm-sql-referencing-entities-transact-sql" },
      { titre: "SQL Server : changer l'ordre des colonnes", url: "https://learn.microsoft.com/fr-fr/sql/relational-databases/tables/change-column-order-in-a-table" },
      { titre: "Snowflake : ALTER TABLE", url: "https://docs.snowflake.com/en/sql-reference/sql/alter-table" },
      { titre: "Snowflake : ALTER TABLE … ALTER COLUMN", url: "https://docs.snowflake.com/en/sql-reference/sql/alter-table-column" },
      { titre: "MySQL 8.4 : les opérations DDL en ligne", url: "https://dev.mysql.com/doc/refman/8.4/en/innodb-online-ddl-operations.html" },
      { titre: "MySQL 8.4 : DDL en ligne et verrous de métadonnées", url: "https://dev.mysql.com/doc/refman/8.4/en/innodb-online-ddl-performance.html" },
      { titre: "Divalto : suivi des modifications SQL pour l'ETL", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/10516466436/Suivi+des+modifications+SQL+pour+l+ETL" }
    ]
  },
  {
    id: "historiser",
    titre: "Je garde l'historique des changements",
    famille: "Concevoir",
    resume: "Garder les anciennes valeurs : le besoin, les colonnes suivies, écraser ou dater (type 2), tables temporelles, capture des changements, déclencheurs, streams, qui et quand, volume, purge.",
    besoins: [
      "je garde l'historique des changements",
      "historiser les modifications d'une table",
      "savoir qui a modifié une ligne et quand",
      "retrouver la valeur d'une colonne à une date passée"
    ],
    essais: [
      "table temporelle system versioning sql server",
      "audit des modifications avec un trigger",
      "scd type 2 pour garder les anciennes adresses",
      "garder l'ancien prix des articles"
    ],
    exemple: {
      texte: "Les achats veulent savoir quel était le prix tarif de CHL-25 à une date donnée, et qui l'a changé. Aujourd'hui, un `UPDATE` écrase l'ancien prix. Tu ajoutes l'historique à `article` : une version datée à chaque changement, en UTC (le temps universel, sans heure d'été). Attention : l'historique commence le jour où tu l'actives.",
      code: "CREATE SCHEMA histo;\nGO\nALTER TABLE dbo.article ADD\n  valide_du DATETIME2 GENERATED ALWAYS AS ROW START HIDDEN\n    CONSTRAINT df_article_valide_du DEFAULT SYSUTCDATETIME(),\n  valide_au DATETIME2 GENERATED ALWAYS AS ROW END HIDDEN\n    CONSTRAINT df_article_valide_au DEFAULT CONVERT(DATETIME2, '9999-12-31 23:59:59.9999999'),\n  PERIOD FOR SYSTEM_TIME (valide_du, valide_au);\nGO\nALTER TABLE dbo.article SET (SYSTEM_VERSIONING = ON\n  (HISTORY_TABLE = histo.article, HISTORY_RETENTION_PERIOD = 5 YEARS));  -- durée : décidée avec le métier\nGO\n-- Plus tard : le prix de CHL-25 au 1er décembre 2026, 8 h (heure UTC)\nSELECT code, prix_tarif\nFROM dbo.article FOR SYSTEM_TIME AS OF '2026-12-01T08:00:00'\nWHERE code = 'CHL-25';",
      codes: {
        snowflake: "-- Pas de table temporelle : une table d'historique, remplie depuis un stream\nCREATE TABLE IF NOT EXISTS histo.article_prix (\n  article_id NUMBER(38,0)  NOT NULL,\n  prix_tarif NUMBER(10,2),\n  action     VARCHAR(6)    NOT NULL,     -- INSERT ou DELETE\n  capte_le   TIMESTAMP_NTZ NOT NULL);    -- heure UTC du passage, pas du changement\nCREATE STREAM IF NOT EXISTS ventes.article_changements ON TABLE ventes.article;\n-- Une task, toutes les heures : cet INSERT consomme le stream\nINSERT INTO histo.article_prix (article_id, prix_tarif, action, capte_le)\nSELECT id, prix_tarif, METADATA$ACTION, SYSDATE()\nFROM ventes.article_changements\nWHERE NOT (METADATA$ACTION = 'DELETE' AND METADATA$ISUPDATE);  -- d'un UPDATE : la nouvelle valeur",
        mysql: "-- Pas de table temporelle : un déclencheur (trigger) écrit l'historique\nCREATE TABLE IF NOT EXISTS article_prix_histo (\n  id          BIGINT        NOT NULL AUTO_INCREMENT PRIMARY KEY,\n  article_id  INT           NOT NULL,\n  prix_avant  DECIMAL(10,2) NULL,\n  prix_apres  DECIMAL(10,2) NULL,\n  modifie_le  DATETIME(6)   NOT NULL,   -- en UTC\n  modifie_par VARCHAR(300)  NOT NULL    -- USER() : le compte qui a écrit\n) ENGINE = InnoDB;\nCREATE TRIGGER trg_article_prix_au AFTER UPDATE ON article\nFOR EACH ROW\n  INSERT INTO article_prix_histo (article_id, prix_avant, prix_apres, modifie_le, modifie_par)\n  SELECT OLD.id, OLD.prix_tarif, NEW.prix_tarif, UTC_TIMESTAMP(6), USER()\n  FROM DUAL\n  WHERE NOT (OLD.prix_tarif <=> NEW.prix_tarif);   -- seulement si le prix change"
      }
    },
    etapes: [
      {
        titre: "Le besoin",
        questions: [
          {
            id: "pourquoi",
            q: "Pourquoi garder l'historique : un audit, l'état à une date, ou des analyses dans le temps ?",
            pourquoi: "Chaque besoin demande une autre solution. Un audit veut qui et quand ; un rapport « au 31 mars » veut des versions datées ; l'entrepôt veut seulement les changements depuis hier.",
            reflexe: "Écris le besoin avec le métier, en une phrase : « retrouver le prix tarif à n'importe quelle date, et qui l'a changé ». Il choisit la solution : versions datées, table d'audit, ou capture des changements."
          },
          {
            id: "colonnes",
            q: "Quelles colonnes faut-il suivre, et lesquelles non ?",
            pourquoi: "Tout historiser, c'est garder des millions de versions pour une date de dernière lecture qui change sans cesse. Ne rien choisir, c'est oublier la colonne que l'auditeur demandera.",
            reflexe: "Liste les colonnes qui comptent pour le métier : prix, statut, adresse de livraison, conditions de paiement. Une colonne purement technique ne s'historise pas."
          },
          {
            id: "depuis-quand",
            q: "Depuis quand l'historique doit-il exister : le passé est-il connu quelque part ?",
            pourquoi: "L'historique commence le jour où tu l'actives. Le prix d'avant n'existe nulle part : si l'audit porte sur l'an dernier, il faut le retrouver dans une sauvegarde ou un export.",
            reflexe: "Active l'historique avant d'en avoir besoin, dès la création de la table. Pour le passé, cherche une source (sauvegarde, export de l'ERP), et charge-la comme première version, datée."
          }
        ]
      },
      {
        titre: "Écraser ou dater",
        questions: [
          {
            id: "type1-type2",
            q: "Pour chaque colonne : écraser l'ancienne valeur, ou garder une version datée ?",
            pourquoi: "Écrasée (le type 1), une ville change aussi dans les ventes passées : le CA de mars de Lyon passe à Villeurbanne, et le rapport de mars change après coup.",
            reflexe: "Type 1 pour une faute corrigée. Type 2 (une nouvelle ligne datée à chaque changement) pour ce qui doit garder son histoire : ville, commercial, prix. Décide colonne par colonne, avec le métier."
          },
          {
            id: "periode",
            q: "Comment noter la période de validité de chaque version ?",
            pourquoi: "Sans règle commune, une version finit le 31 et la suivante commence le 31 : la commande du 31 trouve deux prix, et son montant compte deux fois.",
            reflexe: "Deux colonnes : `valide_du` (incluse) et `valide_au` (exclue, égale au `valide_du` de la version suivante). Version en cours : `valide_au = '9999-12-31'`, pas NULL. Jointure : `date_cde >= valide_du AND date_cde < valide_au`."
          },
          {
            id: "courante",
            q: "Comment trouver vite la version en cours, et vérifier qu'il n'y en a qu'une ?",
            pourquoi: "Sans repère, chaque rapport cherche la dernière version avec un `MAX` ou une fonction de fenêtre : plus lourd, et facile à rater. Deux versions en cours doublent les lignes des rapports.",
            reflexe: "Une colonne `est_courante` (1 pour la version en cours), ou `valide_au = '9999-12-31'`, avec un index. Et un contrôle après chaque chargement : 0 ligne attendue.",
            code: "SELECT article_id\nFROM histo.article_version\nWHERE est_courante = 1\nGROUP BY article_id\nHAVING COUNT(*) > 1;   -- 0 ligne attendue"
          },
          {
            id: "cle-version",
            q: "La table des versions a-t-elle sa propre clé, et garde-t-elle la clé métier ?",
            pourquoi: "Avec l'identifiant de l'article comme clé primaire, la 2e version est refusée. Sans la clé métier, on ne relie plus les versions entre elles, ni aux ventes.",
            reflexe: "Une clé technique par version (`version_id`), la clé de l'article à côté (`article_id`), et `UNIQUE (article_id, valide_du)` : deux versions ne commencent pas au même instant."
          }
        ]
      },
      {
        titre: "L'outil du moteur",
        questions: [
          {
            id: "temporelle",
            q: "Une table temporelle peut-elle faire le travail ?",
            pourquoi: "Une table temporelle (depuis SQL Server 2016) range seule chaque ancienne version dans une table d'historique, datée en UTC, que personne ne peut modifier directement. Sans elle, tout est à coder à la main.",
            reflexe: "`SYSTEM_VERSIONING = ON`, puis `FOR SYSTEM_TIME AS OF` pour lire une date passée. Elle exige une clé primaire. Masque les deux colonnes de période (`HIDDEN`) : les `SELECT *` existants ne voient rien.",
            seulement: ["sqlserver"]
          },
          {
            id: "temporelle-charges",
            q: "Ta table temporelle supportera-t-elle tes chargements ?",
            pourquoi: "Chaque `UPDATE` ajoute une version, même si aucune valeur ne change. Un flux qui réécrit tous les articles chaque nuit recopie toute la table dans l'historique. Et `TRUNCATE TABLE` est refusé.",
            reflexe: "Ne mets à jour que les lignes qui changent vraiment : `WHERE a.prix_tarif IS DISTINCT FROM s.prix_tarif` (SQL Server 2022), NULL compris. Prévois la purge avec `HISTORY_RETENTION_PERIOD` (depuis 2017).",
            seulement: ["sqlserver"]
          },
          {
            id: "cdc",
            q: "Change Data Capture ou Change Tracking : est-ce un historique, ou une capture pour un chargement ?",
            pourquoi: "Change Tracking (le suivi des modifications) donne seulement la clé des lignes changées, sans les valeurs. CDC (la capture des données modifiées) garde l'avant et l'après, 3 jours par défaut : pour charger un entrepôt, pas pour garder dix ans.",
            reflexe: "CDC ou Change Tracking pour charger l'entrepôt avec les seuls changements ; l'historique durable va dans tes propres tables. CDC lit le journal et demande l'Agent SQL Server ; il n'existe pas en édition Express.",
            seulement: ["sqlserver"]
          },
          {
            id: "declencheur",
            q: "Un déclencheur (trigger) d'audit est-il la bonne solution ?",
            pourquoi: "Un trigger est du code lancé à chaque écriture. Il la ralentit, et s'il plante, l'écriture est annulée. Mal écrit, il rate des lignes, ou des cas comme une suppression en cascade.",
            reflexe: "Garde-le court : une seule insertion dans la table d'historique, pour les seules colonnes suivies, sans appel extérieur. Teste-le avec un `UPDATE` de 10 000 lignes et une suppression.",
            moteurs: {
              sqlserver: "Un trigger se lance une fois par instruction, pas par ligne : lis `inserted` et `deleted` comme des ensembles de lignes.",
              snowflake: "Pas de trigger : un stream (le suivi des changements d'une table) et une task (un traitement planifié) écrivent l'historique.",
              mysql: "`FOR EACH ROW` : une fois par ligne, avec `OLD` et `NEW`. Une suppression en cascade (clé étrangère) ne lance pas les triggers des tables enfants."
            }
          },
          {
            id: "stream",
            q: "Qui écrit l'historique, puisqu'il n'y a ni table temporelle ni trigger ?",
            pourquoi: "Un stream ne garde pas de données : c'est un marque-page. Il donne le changement net depuis son dernier passage : deux prix dans l'heure, seul le dernier est vu. Non consommé à temps, il devient périmé (stale), inutilisable.",
            reflexe: "Une task lit le stream et l'insère dans ta table d'historique : cet `INSERT … SELECT` consomme le stream. La fréquence décide des versions gardées. Surveille `STALE_AFTER` dans `SHOW STREAMS`.",
            seulement: ["snowflake"]
          },
          {
            id: "time-travel",
            q: "Comptes-tu sur Time Travel comme historique ?",
            pourquoi: "Time Travel relit une table telle qu'elle était, mais 1 jour par défaut, 90 au plus (édition Enterprise). Au-delà, l'ancienne valeur a disparu : ce n'est pas un historique métier.",
            reflexe: "Time Travel pour réparer une erreur récente. Pour l'histoire du prix sur des années : ta propre table d'historique.",
            seulement: ["snowflake"]
          },
          {
            id: "mysql",
            q: "Qu'est-ce qui existe vraiment pour historiser ?",
            pourquoi: "MySQL 8.4 n'a pas de table temporelle : `FOR SYSTEM_TIME` n'existe pas. Le journal binaire (binlog) sert à la réplication et à la restauration, pas à relire un prix passé en SQL.",
            reflexe: "Des triggers `AFTER UPDATE` et `AFTER DELETE` qui écrivent `OLD` dans une table d'historique, ou l'application qui écrit la version. Teste les suppressions en cascade : elles ne lancent pas les triggers.",
            seulement: ["mysql"]
          }
        ]
      },
      {
        titre: "Qui et quand",
        questions: [
          {
            id: "qui",
            q: "Faut-il savoir qui a fait la modification, et le connaîtras-tu vraiment ?",
            pourquoi: "Les tables temporelles, CDC et les streams disent quand, pas qui. Et si l'ERP ou le flux se connectent avec un seul compte de service, la base ne voit que lui : « svc_edi » a tout modifié.",
            reflexe: "Une colonne `modifie_par`, remplie avec le vrai utilisateur par l'application. Un trigger qui lit le compte de connexion suffit pour les scripts lancés à la main, pas pour les utilisateurs de l'ERP.",
            moteurs: {
              sqlserver: "L'application peut passer le vrai nom : `EXEC sp_set_session_context N'utilisateur', N'jdupont';`, puis `SESSION_CONTEXT(N'utilisateur')` (depuis 2016). Sinon : `ORIGINAL_LOGIN()`.",
              snowflake: "Un stream ne dit pas qui a modifié : remplis `modifie_par` dans l'écriture elle-même, avec `CURRENT_USER()`.",
              mysql: "Dans un trigger, `CURRENT_USER()` donne le `DEFINER` du trigger, pas la personne : prends `USER()`."
            }
          },
          {
            id: "utc",
            q: "Les dates de l'historique sont-elles en UTC, et le fuseau est-il écrit ?",
            pourquoi: "En heure de Paris, la nuit du passage à l'heure d'hiver, 2 h 30 existe deux fois : deux versions semblent se chevaucher, ou s'inverser.",
            reflexe: "Range les dates de l'historique en UTC, et dis-le dans le nom (`modifie_le_utc`) ou la description. Convertis en heure de Paris seulement à l'affichage.",
            moteurs: {
              sqlserver: "La table temporelle date déjà en UTC : `FOR SYSTEM_TIME AS OF` attend une heure UTC. Ailleurs : `SYSUTCDATETIME()`.",
              snowflake: "`SYSDATE()` donne l'heure UTC (en `TIMESTAMP_NTZ`) ; `CURRENT_TIMESTAMP` suit le fuseau de la session.",
              mysql: "`UTC_TIMESTAMP()` ; `NOW()` suit le fuseau de la session."
            }
          }
        ]
      },
      {
        titre: "Volume et purge",
        questions: [
          {
            id: "volume",
            q: "Combien de versions par jour, et quelle taille dans 5 ans ?",
            pourquoi: "Un flux qui réécrit chaque article chaque nuit crée 10 000 versions par jour, même sans changement. L'historique dépasse vite la table, et les rapports qui le lisent ralentissent.",
            reflexe: "Calcule : changements par jour × durée de conservation. N'écris une version que si une colonne suivie change vraiment. Indexe l'historique sur la clé et la date, pour les recherches « à une date ».",
            moteurs: {
              sqlserver: "Pour une grosse table d'historique, Microsoft conseille un index columnstore cluster : compressé, et purgé par blocs entiers."
            }
          },
          {
            id: "purge",
            q: "Combien de temps garder l'historique, et qui le purge ?",
            pourquoi: "Sans règle, l'historique grossit sans fin. Et une purge trop rapide efface la preuve qu'un auditeur ou la comptabilité demandera.",
            reflexe: "Fixe la durée avec le métier et la comptabilité, écris-la, et automatise la purge, par lots. Garde une trace de chaque purge : la date, la période effacée, le nombre de lignes.",
            moteurs: {
              sqlserver: "`HISTORY_RETENTION_PERIOD` purge seul la table temporelle ; sans valeur, elle garde tout (INFINITE). Après une restauration à un instant précis, cette purge est coupée : vérifie `is_temporal_history_retention_enabled`."
            }
          },
          {
            id: "rgpd",
            q: "L'historique garde-t-il des données personnelles, et pour combien de temps ?",
            pourquoi: "Un client demande l'effacement : tu le supprimes de la table, mais ses anciennes adresses et ses téléphones restent dans l'historique, et dans ses copies.",
            reflexe: "Ne suis pas les colonnes personnelles sans besoin. Sinon, applique-leur la même durée et le même effacement qu'à la table, décidés avec ton DPO. Le détail : « Je protège des données personnelles ».",
            moteurs: {
              sqlserver: "L'historique d'une table temporelle ne se modifie pas directement : coupe la version (`SYSTEM_VERSIONING = OFF`), corrige, puis remets-la avec sa `HISTORY_RETENTION_PERIOD`, qui n'est pas gardée.",
              snowflake: "Après un `DELETE`, Time Travel puis Fail-safe (le filet de secours) gardent encore les anciennes valeurs, pendant leur durée."
            }
          }
        ]
      },
      {
        titre: "Vérifier",
        questions: [
          {
            id: "tester",
            q: "As-tu essayé l'historique sur de vrais cas : création, deux changements, suppression ?",
            pourquoi: "Un historique faux se découvre le jour de l'audit : la suppression n'est pas tracée, ou deux versions se chevauchent.",
            reflexe: "En recette : crée un article, change deux fois son prix, supprime-le. Vérifie chaque version, ses dates, son auteur, et la requête « à une date ». Cherche les versions qui se chevauchent : 0 ligne attendue.",
            code: "SELECT a.article_id, a.valide_du, b.valide_du\nFROM histo.article_version AS a\nJOIN histo.article_version AS b\n  ON b.article_id = a.article_id\n AND a.version_id < b.version_id\n AND b.valide_du < a.valide_au\n AND a.valide_du < b.valide_au;   -- 0 ligne attendue"
          }
        ]
      }
    ],
    pieges: [
      "L'historique commence le jour où tu l'actives : le prix de l'an dernier n'existe nulle part.",
      "Un rechargement complet chaque nuit dans une table temporelle : chaque ligne entre dans l'historique, même sans aucun changement.",
      "Le job de capture CDC arrêté : le journal ne peut plus se vider, même en mode de récupération simple, et le disque se remplit.",
      "Une version qui finit le 31 et la suivante qui commence le 31 : la commande du 31 trouve deux prix.",
      "« svc_edi » dans la colonne `modifie_par` : le compte de service cache la vraie personne.",
      "Un stream Snowflake jamais consommé devient périmé après la rétention de la table (étendue à 14 jours par défaut) : il faut le recréer, et les changements manqués sont perdus pour lui.",
      "Time Travel pris pour un historique : au-delà de sa rétention (1 jour par défaut), l'ancienne valeur a disparu.",
      "MySQL : un trigger qui lit `CURRENT_USER()` note le créateur du trigger, pas la personne qui a modifié."
    ],
    pratique: "Avant d'historiser des données Divalto, regarde sa traçabilité (Administration, Paramètres, Traçabilité) : avant, après et utilisateur, pour les champs choisis. Sa doc prévient : seules les écritures passant par les fonctions standard de l'ERP sont tracées.",
    motsCles: ["historique", "historiser", "audit", "table temporelle", "system_versioning", "for system_time", "change data capture", "cdc", "change tracking", "trigger", "déclencheur", "scd", "stream", "anciennes valeurs", "traçabilité"],
    voirAussi: ["creer-table", "mettre-a-jour", "supprimer", "donnees-personnelles", "dates", "sauvegarder", "fusionner", "automatiser"],
    dico: ["time-travel", "rowversion", "merge", "is-distinct-from", "datetime2", "timestamp-ntz", "datetimeoffset", "create-table"],
    sources: [
      { titre: "SQL Server : les tables temporelles", url: "https://learn.microsoft.com/fr-fr/sql/relational-databases/tables/temporal-tables" },
      { titre: "SQL Server : limites des tables temporelles", url: "https://learn.microsoft.com/fr-fr/sql/relational-databases/tables/temporal-table-considerations-and-limitations" },
      { titre: "SQL Server : rétention de l'historique des tables temporelles", url: "https://learn.microsoft.com/fr-fr/sql/relational-databases/tables/manage-retention-of-historical-data-in-system-versioned-temporal-tables" },
      { titre: "SQL Server : suivre les modifications (CDC et Change Tracking)", url: "https://learn.microsoft.com/fr-fr/sql/relational-databases/track-changes/track-data-changes-sql-server" },
      { titre: "SQL Server : à propos de la capture des données modifiées", url: "https://learn.microsoft.com/fr-fr/sql/relational-databases/track-changes/about-change-data-capture-sql-server" },
      { titre: "Snowflake : les streams", url: "https://docs.snowflake.com/en/user-guide/streams-intro" },
      { titre: "MySQL 8.4 : CREATE TRIGGER", url: "https://dev.mysql.com/doc/refman/8.4/en/create-trigger.html" },
      { titre: "Divalto : la traçabilité des modifications", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/10513813947/La+tra+abilit+des+modifications" }
    ]
  },
  {
    id: "table-import",
    titre: "Je crée une table pour recevoir un import",
    famille: "Concevoir",
    resume: "La table d'arrivée d'un import (staging) : tout en texte, sans contrainte bloquante, la trace du fichier et du contrôle, vidée ou empilée, ses droits, sa purge, et ses réglages Snowflake.",
    besoins: [
      "je crée une table pour recevoir un import",
      "créer une table de staging pour un fichier",
      "table d'arrivée avant l'intégration des données",
      "table tampon pour charger un fichier csv"
    ],
    essais: [
      "table tampon pour les fichiers des partenaires",
      "zone de transit avant integration dans l'erp",
      "toutes les colonnes en varchar dans la table de chargement",
      "table transient snowflake pour le staging"
    ],
    exemple: {
      texte: "Chaque nuit, le traducteur EDI dépose les commandes d'AquaBleu en CSV. Avant de les intégrer dans Divalto, tu les charges dans une table d'arrivée, `stg.cde_aquableu` : une table de passage, qui accepte tout ce que contient le fichier. Elle garde d'où vient chaque ligne, et le résultat de son contrôle.",
      code: "CREATE TABLE stg.cde_aquableu (\n  -- les colonnes du fichier : du texte, assez long, NULL permis\n  num_cde       NVARCHAR(100) NULL,\n  date_cde      NVARCHAR(100) NULL,\n  code_article  NVARCHAR(100) NULL,\n  qte           NVARCHAR(100) NULL,\n  prix_unit     NVARCHAR(100) NULL,\n  -- les colonnes techniques\n  id_lot        INT           NULL,          -- le chargement (table de suivi des fichiers)\n  fichier       NVARCHAR(260) NULL,\n  num_ligne     INT           NULL,          -- la ligne dans le fichier\n  charge_le     DATETIME2(0)  NOT NULL CONSTRAINT df_cde_aquableu_charge DEFAULT SYSUTCDATETIME(),\n  statut        VARCHAR(12)   NOT NULL CONSTRAINT df_cde_aquableu_statut DEFAULT 'A_CONTROLER',\n  motif_rejet   NVARCHAR(400) NULL\n);   -- ni clé, ni index, ni CHECK : un tas (heap), rapide à remplir",
      codes: {
        snowflake: "CREATE TRANSIENT TABLE IF NOT EXISTS stg.cde_aquableu (   -- sans Fail-safe\n  num_cde VARCHAR, date_cde VARCHAR, code_article VARCHAR, qte VARCHAR, prix_unit VARCHAR,\n  fichier VARCHAR, num_ligne NUMBER(38,0), charge_le TIMESTAMP_LTZ,\n  statut VARCHAR(12) DEFAULT 'A_CONTROLER', motif_rejet VARCHAR\n) DATA_RETENTION_TIME_IN_DAYS = 1;   -- pas de CHECK : COPY INTO échouerait\nCOPY INTO stg.cde_aquableu\n  (num_cde, date_cde, code_article, qte, prix_unit, fichier, num_ligne, charge_le)\nFROM (SELECT $1, $2, $3, $4, $5,\n             METADATA$FILENAME, METADATA$FILE_ROW_NUMBER, METADATA$START_SCAN_TIME\n      FROM @edi.stage_edi/aquableu/)\nFILE_FORMAT = (FORMAT_NAME = 'edi.ff_csv_fr');",
        mysql: "-- MySQL : un schéma est une base (ventes_stg)\nCREATE TABLE IF NOT EXISTS ventes_stg.cde_aquableu (\n  id_chargement BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,   -- InnoDB range selon cette clé\n  num_cde       VARCHAR(100) NULL,\n  date_cde      VARCHAR(100) NULL,\n  code_article  VARCHAR(100) NULL,\n  qte           VARCHAR(100) NULL,\n  prix_unit     VARCHAR(100) NULL,\n  fichier       VARCHAR(260) NULL,\n  charge_le     DATETIME     NOT NULL DEFAULT (UTC_TIMESTAMP()),   -- en UTC\n  statut        VARCHAR(12)  NOT NULL DEFAULT 'A_CONTROLER',\n  motif_rejet   VARCHAR(400) NULL\n) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;   -- les autres index : après le chargement"
      }
    },
    etapes: [
      {
        titre: "Le rôle de la table",
        questions: [
          {
            id: "role",
            q: "Cette table reçoit-elle le fichier tel quel, avant tout contrôle ?",
            pourquoi: "Si la table d'arrivée sert aussi de table métier, une valeur fausse bloque tout le fichier, ou entre convertie sans bruit. Et les rapports finissent par la lire.",
            reflexe: "Une table d'arrivée (staging) reçoit le fichier tel quel ; les contrôles suivent ; puis les lignes propres passent dans la vraie table. Le chargement lui-même : « J'importe un fichier (CSV, Excel, EDI) »."
          },
          {
            id: "une-par-flux",
            q: "Une table d'arrivée par flux, ou une seule pour tous les fichiers ?",
            pourquoi: "Une table pour tous les partenaires mélange des formats différents : une colonne ajoutée par un seul partenaire décale les autres, et deux chargements en même temps se marchent dessus.",
            reflexe: "Une table par flux et par format, avec exactement les colonnes du fichier, dans son ordre : `stg.cde_aquableu`, `stg.desadv_hydrosud`. Les colonnes techniques, elles, sont les mêmes partout."
          },
          {
            id: "schema-droits",
            q: "Dans quel schéma la ranger, et qui peut y écrire ?",
            pourquoi: "Rangée avec les tables métier, la table d'arrivée est lue par erreur par un rapport : doublons, valeurs non contrôlées. Ouverte à tous, quelqu'un la vide pendant un chargement.",
            reflexe: "Le schéma `stg`, réservé aux traitements : l'écriture pour le seul compte du flux, la lecture pour l'équipe data, rien pour Power BI. Le détail : « Je range les tables dans des schémas ».",
            moteurs: {
              mysql: "Pas de schéma dans une base : une base dédiée (`ventes_stg`), ou un préfixe `stg_` devant le nom."
            }
          }
        ]
      },
      {
        titre: "Les colonnes du fichier",
        questions: [
          {
            id: "texte",
            q: "Les colonnes du fichier sont-elles toutes en texte ?",
            pourquoi: "Une colonne `DATE` ou `DECIMAL` refuse '31/02/2026' ou '125,50' : le chargement échoue, ou convertit mal sans bruit. Tu ne sais plus ce que contenait vraiment le fichier.",
            reflexe: "Toutes en texte, même les dates et les montants. Les conversions se font après, en SQL, avec les fonctions TRY, qui rendent NULL au lieu d'une erreur.",
            moteurs: {
              sqlserver: "`NVARCHAR` garde tous les caractères, accents et alphabets étrangers compris."
            }
          },
          {
            id: "longueur",
            q: "Les colonnes texte sont-elles assez longues pour la pire valeur ?",
            pourquoi: "Trop courte, la colonne coupe la valeur, ou fait échouer le chargement pour un seul nom un peu long : tout le fichier est rejeté, à 3 h du matin.",
            reflexe: "Prends large : 100 ou 255 caractères pour une valeur courte, plus pour un libellé. La vraie longueur se contrôle ensuite, avec un motif de rejet clair.",
            moteurs: {
              sqlserver: "Évite `NVARCHAR(MAX)` partout : une telle colonne ne peut pas être la clé d'un index, utile pour le contrôle des doublons.",
              snowflake: "La longueur d'un `VARCHAR` ne change ni la place ni la vitesse : `VARCHAR` sans longueur convient ici."
            }
          },
          {
            id: "sans-contrainte",
            q: "La table a-t-elle une contrainte qui rejette une ligne au chargement : NOT NULL, CHECK, clé ?",
            pourquoi: "Une contrainte sur la table d'arrivée rejette la ligne fausse dès le chargement : elle disparaît du suivi, sans motif. Le contrôle doit la garder, pour la rejeter avec une raison.",
            reflexe: "Colonnes du fichier en NULL permis, sans `CHECK`, sans clé étrangère, sans `UNIQUE`. Les règles s'appliquent ensuite, dans les contrôles. Les colonnes techniques, elles, peuvent être `NOT NULL`.",
            moteurs: {
              snowflake: "Pas de `CHECK` : `COPY INTO` échoue sur une table qui en a un, et la création d'un pipe (Snowpipe, le chargement automatique) aussi.",
              mysql: "En mode strict, sans `LOCAL` ni `IGNORE`, une valeur invalide arrête `LOAD DATA`. Avec l'un d'eux, 'x' ou une case vide devient 0 dans une colonne nombre, avec un simple avertissement."
            }
          }
        ]
      },
      {
        titre: "Les colonnes techniques",
        questions: [
          {
            id: "origine",
            q: "Chaque ligne garde-t-elle son fichier, son numéro de ligne et l'heure du chargement ?",
            pourquoi: "Le partenaire demande : « quelle ligne de quel fichier est fausse ? ». Sans ces colonnes, tu cherches à la main dans des milliers de lignes, et tu ne peux pas annuler un chargement raté.",
            reflexe: "Ajoute `fichier`, `num_ligne` et `charge_le` (en UTC), et garde-les jusqu'à la table des rejets. Comment les remplir avec chaque outil : « J'importe un fichier (CSV, Excel, EDI) ».",
            moteurs: {
              snowflake: "`METADATA$FILENAME`, `METADATA$FILE_ROW_NUMBER` et `METADATA$START_SCAN_TIME`, dans un `COPY INTO` avec `SELECT`, ou avec l'option `INCLUDE_METADATA`."
            }
          },
          {
            id: "statut",
            q: "Où est noté le résultat du contrôle de chaque ligne ?",
            pourquoi: "Sans statut, on ne sait pas quelles lignes sont passées dans la vraie table : un rechargement les insère une 2e fois, ou une ligne rejetée est oubliée.",
            reflexe: "Une colonne `statut` ('A_CONTROLER', 'OK', 'REJET', 'INTEGRE') et une colonne `motif_rejet` (« date invalide », « article inconnu »). Seules les lignes 'OK' passent dans la vraie table."
          },
          {
            id: "lot",
            q: "Un numéro de lot relie-t-il les lignes d'un même chargement ?",
            pourquoi: "Le même fichier est parfois chargé deux fois, ou deux fichiers ont des lignes pareilles. Sans numéro de lot, impossible d'annuler un seul chargement proprement.",
            reflexe: "Un `id_lot` par chargement, pris dans une table de suivi des fichiers : nom, empreinte, date, lignes lues, chargées et rejetées. Pour annuler un chargement : `DELETE FROM stg.cde_aquableu WHERE id_lot = 42;`."
          }
        ]
      },
      {
        titre: "Vider, empiler, purger",
        questions: [
          {
            id: "vider-empiler",
            q: "Vides-tu la table avant chaque chargement, ou empiles-tu les fichiers ?",
            pourquoi: "Vidée à chaque fois, la table perd le fichier d'hier dès qu'un nouveau arrive : impossible de rejouer un contrôle. Empilée, elle grossit, et chaque contrôle relit tout l'historique.",
            reflexe: "Choisis, et écris la règle. Vider : seulement quand les lignes d'avant sont intégrées ou archivées. Empiler : avec `id_lot`, une purge datée, et des contrôles qui filtrent sur le lot.",
            moteurs: {
              sqlserver: "`TRUNCATE TABLE` vide vite, mais demande le droit `ALTER` sur la table, pas seulement `DELETE`.",
              snowflake: "Vide avec `DELETE`, pas `TRUNCATE` : `TRUNCATE` efface l'historique de chargement, et `COPY INTO` rechargerait les anciens fichiers du stage (la zone de dépôt).",
              mysql: "`TRUNCATE TABLE` valide la transaction en cours, et demande le droit `DROP`."
            }
          },
          {
            id: "purge",
            q: "Qui purge la table d'arrivée, et après combien de temps ?",
            pourquoi: "Une table d'arrivée jamais purgée garde des années de fichiers : adresses, prix, données personnelles, lisibles par tous les comptes techniques.",
            reflexe: "Une durée écrite (par exemple 30 jours après l'intégration) et une purge automatique, par lot. Les fichiers eux-mêmes s'archivent à part, si le métier en a besoin.",
            moteurs: {
              snowflake: "Les fichiers restent aussi dans le stage après `COPY INTO`, et se paient : `PURGE = TRUE` dans le `COPY` (sans erreur si la suppression rate : vérifie avec `LIST`), ou `REMOVE`."
            }
          }
        ]
      },
      {
        titre: "Charger vite",
        questions: [
          {
            id: "sans-index",
            q: "La table d'arrivée a-t-elle un index qui ralentit le chargement ?",
            pourquoi: "Chaque index est mis à jour à chaque ligne chargée. Sur un million de lignes, le chargement s'allonge, alors que la table sera lue en entier, une seule fois.",
            reflexe: "Charge sans index. Crée ensuite l'index utile aux contrôles (sur le lot, sur le numéro de commande), ou aucun pour une petite table.",
            seulement: ["sqlserver", "mysql"],
            moteurs: {
              sqlserver: "Une table sans index cluster est un tas (heap) : Microsoft le conseille pour une table de chargement vidée et rechargée. Avec `TABLOCK`, le chargement peut être peu journalisé, mais pas en récupération `FULL`.",
              mysql: "InnoDB range toujours selon la clé primaire : un `AUTO_INCREMENT` charge dans l'ordre. Crée les autres index après le chargement (sa doc)."
            }
          },
          {
            id: "temporaire",
            q: "Table temporaire, qui disparaît avec la session, ou table permanente ?",
            pourquoi: "Une table temporaire disparaît à la fin de la session : si le traitement plante, les lignes à analyser sont perdues. Une table permanente reste, et se relit le lendemain matin.",
            reflexe: "Permanente pour un flux régulier : tu dois pouvoir relire ce qui a été chargé. Temporaire pour un calcul de passage, dans le même script.",
            moteurs: {
              sqlserver: "`#cde` vit dans tempdb, qui a la collation du serveur (les règles de comparaison du texte). Si ta base en a une autre, les comparaisons échouent : écris `COLLATE DATABASE_DEFAULT` sur ses colonnes texte.",
              snowflake: "`TEMPORARY` : la session seulement. `TRANSIENT` : la table reste, sans Fail-safe (le filet de secours de 7 jours).",
              mysql: "`CREATE TEMPORARY TABLE` : la session seulement. Elle ne valide pas la transaction en cours, à la différence d'un `CREATE TABLE`."
            }
          }
        ]
      },
      {
        titre: "Snowflake : la table d'arrivée",
        questions: [
          {
            id: "transient",
            q: "La table d'arrivée est-elle TRANSIENT, sans Fail-safe ?",
            pourquoi: "Une table permanente paie 7 jours de Fail-safe (le filet de secours) sur des données qu'on recharge depuis le fichier. Chaque rechargement laisse ces anciennes versions, payées en stockage.",
            reflexe: "`CREATE TRANSIENT TABLE stg.cde_aquableu …`, ou un schéma `stg` transient, avec `DATA_RETENTION_TIME_IN_DAYS = 1` ou 0. Le fichier, gardé dans le stage ou une archive, reste la copie de référence.",
            seulement: ["snowflake"]
          }
        ]
      },
      {
        titre: "Vers la vraie table",
        questions: [
          {
            id: "json",
            q: "Le fichier est-il du JSON, à garder entier dans une colonne ?",
            pourquoi: "Découper le JSON dès le chargement fige sa forme : une clé ajoutée par le partenaire est perdue, une clé renommée casse le chargement.",
            reflexe: "Une colonne reçoit chaque document entier, avec `fichier` et `charge_le`. Les clés s'extraient ensuite, en SQL. Le détail : « Je stocke du JSON ou un message brut ».",
            moteurs: {
              sqlserver: "`NVARCHAR(MAX)`, ou le type `json` depuis SQL Server 2025.",
              snowflake: "Une colonne `VARIANT` (le type de Snowflake pour le JSON), remplie par `COPY INTO`. Fichier fait d'un grand tableau : `STRIP_OUTER_ARRAY = TRUE` donne une ligne par élément.",
              mysql: "Une colonne `JSON`, ou `MEDIUMTEXT` pour garder le texte exact."
            }
          },
          {
            id: "vers-cible",
            q: "Comment les lignes passent-elles de la table d'arrivée à la vraie table ?",
            pourquoi: "Un `INSERT` direct depuis la table d'arrivée, sans conversion ni contrôle, recopie les erreurs du fichier dans la table métier.",
            reflexe: "Un `INSERT … SELECT` (ou un `MERGE`) des seules lignes 'OK', avec les conversions écrites, puis le statut passé à 'INTEGRE', dans une transaction. Le détail : « J'insère des lignes »."
          }
        ]
      }
    ],
    pieges: [
      "Une table d'arrivée avec des colonnes `DATE` et `DECIMAL` : une seule date '31/02/2026' fait échouer tout le fichier, à 3 h du matin.",
      "Une seule table d'arrivée pour tous les partenaires : l'un ajoute une colonne, et les fichiers des autres se décalent.",
      "Vider la table avant de charger, alors que les lignes d'hier n'étaient pas encore intégrées : elles sont perdues.",
      "Snowflake : un `CHECK` ajouté « pour être propre » sur la table d'arrivée, et `COPY INTO` échoue.",
      "Snowflake : `TRUNCATE` de la table d'arrivée efface l'historique de chargement : le `COPY INTO` suivant recharge les anciens fichiers du stage.",
      "Snowflake : une clé de clustering avec `UPPER` ou `DATE_TRUNC` sur une table chargée par `COPY INTO` de fichiers CSV : la commande échoue (sa doc).",
      "Un rapport Power BI branché sur la table d'arrivée : il montre des lignes rejetées et des doublons.",
      "Une table d'arrivée jamais purgée : des années d'adresses et de prix, lisibles par tous les comptes techniques."
    ],
    pratique: "Donne à toutes les tables d'arrivée les mêmes colonnes techniques : `id_lot`, `fichier`, `num_ligne`, `charge_le`, `statut`, `motif_rejet`. Le contrôle, le rapport des rejets et la purge s'écrivent alors une fois, pour tous les flux EDI.",
    motsCles: ["staging", "table d'arrivée", "table tampon", "table de chargement", "zone de transit", "stg", "brut", "colonnes en texte", "numéro de ligne", "fichier source", "lot", "transient", "tas", "heap", "purge"],
    voirAussi: ["importer-fichier", "charger-snowflake", "creer-table", "creer-schema", "inserer", "fusionner", "semi-structure", "automatiser"],
    dico: ["create-table", "copy-into", "stage", "truncate", "table-temporaire", "varchar", "try-cast", "default"],
    sources: [
      { titre: "SQL Server : les tas (tables sans index cluster)", url: "https://learn.microsoft.com/fr-fr/sql/relational-databases/indexes/heaps-tables-without-clustered-indexes" },
      { titre: "SQL Server : journalisation minimale en importation en bloc", url: "https://learn.microsoft.com/fr-fr/sql/relational-databases/import-export/prerequisites-for-minimal-logging-in-bulk-import" },
      { titre: "Snowflake : tables temporaires et transient", url: "https://docs.snowflake.com/en/user-guide/tables-temp-transient" },
      { titre: "Snowflake : COPY INTO <table>", url: "https://docs.snowflake.com/en/sql-reference/sql/copy-into-table" },
      { titre: "Snowflake : les contraintes (CHECK et COPY INTO)", url: "https://docs.snowflake.com/en/sql-reference/constraints-overview" },
      { titre: "Snowflake : les clés de clustering (COPY INTO de CSV)", url: "https://docs.snowflake.com/en/user-guide/tables-clustering-keys" },
      { titre: "MySQL 8.4 : chargement en masse dans InnoDB", url: "https://dev.mysql.com/doc/refman/8.4/en/optimizing-innodb-bulk-data-loading.html" },
      { titre: "MySQL 8.4 : CREATE TEMPORARY TABLE", url: "https://dev.mysql.com/doc/refman/8.4/en/create-temporary-table.html" }
    ]
  },
  {
    id: "semi-structure",
    titre: "Je stocke du JSON ou un message brut",
    famille: "Concevoir",
    resume: "Garder un message JSON, XML ou EDIFACT : le brut comme preuve, les champs extraits, le type selon le moteur, les clés, la taille, l'encodage, la version et les données personnelles.",
    besoins: [
      "je stocke du json ou un message brut",
      "stocker du json dans une colonne",
      "garder le message edi brut dans la base",
      "colonne variant pour des documents json"
    ],
    essais: [
      "json dans un nvarchar max avec isjson",
      "extraire un champ d'un json pour filtrer vite",
      "message edifact a garder comme preuve",
      "xml d'une facture electronique dans une table"
    ],
    exemple: {
      texte: "AquaBleu passe à une API : ses commandes arrivent en JSON, un texte fait de clés et de valeurs. Tu gardes chaque message entier, tel quel, comme preuve. À côté, tu extrais les champs qu'on cherche souvent, comme le numéro de commande. Les messages mal formés partent dans les rejets ; cette table ne garde que les messages acceptés.",
      code: "CREATE TABLE edi.message_api (\n  id             BIGINT IDENTITY(1,1) NOT NULL,\n  partenaire     VARCHAR(40)   NOT NULL,\n  recu_le        DATETIME2(0)  NOT NULL CONSTRAINT df_message_api_recu DEFAULT SYSUTCDATETIME(),\n  version_format VARCHAR(10)   NOT NULL,          -- la version du message chez le partenaire\n  brut           NVARCHAR(MAX) NOT NULL,          -- le texte reçu, tel quel : la preuve\n  num_cde AS CAST(JSON_VALUE(brut, '$.num_cde') AS VARCHAR(35)),   -- extrait, pour chercher\n  CONSTRAINT pk_message_api PRIMARY KEY (id),\n  CONSTRAINT ck_message_api_json CHECK (ISJSON(brut) = 1)\n);\nCREATE INDEX ix_message_api_num_cde ON edi.message_api (num_cde);",
      codes: {
        snowflake: "CREATE TABLE IF NOT EXISTS edi.message_api (\n  id             NUMBER(38,0) IDENTITY,\n  partenaire     VARCHAR(40)   NOT NULL,\n  recu_le        TIMESTAMP_NTZ NOT NULL,   -- en UTC : SYSDATE()\n  version_format VARCHAR(10)   NOT NULL,\n  brut           VARCHAR       NOT NULL,   -- le texte reçu, tel quel : la preuve\n  doc            VARIANT,                  -- le même message, lisible en SQL\n  num_cde        VARCHAR(35)               -- extrait à l'arrivée, pour filtrer\n);\nINSERT INTO edi.message_api (partenaire, recu_le, version_format, brut, doc, num_cde)\nSELECT 'AquaBleu', SYSDATE(), 'v2', m.txt, PARSE_JSON(m.txt), PARSE_JSON(m.txt):num_cde::VARCHAR\nFROM (SELECT '{\"num_cde\": \"CDE-1007\", \"lignes\": [{\"art\": \"CHL-5\", \"qte\": 150}]}' AS txt) AS m;",
        mysql: "CREATE TABLE IF NOT EXISTS message_api (\n  id             BIGINT       NOT NULL AUTO_INCREMENT,\n  partenaire     VARCHAR(40)  NOT NULL,\n  recu_le        DATETIME     NOT NULL,                    -- en UTC : UTC_TIMESTAMP()\n  version_format VARCHAR(10)  NOT NULL,\n  brut           MEDIUMTEXT   NOT NULL,                    -- le texte reçu, tel quel (16 Mo au plus)\n  doc            JSON         NULL,                        -- vérifié, réécrit, lisible en SQL\n  num_cde        VARCHAR(35)  AS (doc ->> '$.num_cde'),    -- colonne générée\n  PRIMARY KEY (id),\n  INDEX ix_message_api_num_cde (num_cde)\n) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;"
      }
    },
    etapes: [
      {
        titre: "Le besoin",
        questions: [
          {
            id: "brut-ou-colonnes",
            q: "Que feras-tu du message : le garder comme preuve, l'interroger, ou les deux ?",
            pourquoi: "Découpé tout de suite en colonnes, le message d'origine est perdu. Le jour d'un désaccord (« nous avons commandé 150, pas 15 »), tu ne peux plus montrer ce qui a été reçu.",
            reflexe: "Le plus souvent, les deux : le brut tel quel, que personne ne modifie, et à côté les champs utiles, extraits. Écris dans la description que le brut fait référence, et que les colonnes extraites servent aux recherches."
          },
          {
            id: "forme",
            q: "Les données ont-elles vraiment une forme variable, ou toujours les mêmes champs ?",
            pourquoi: "Un JSON pour des données qui ont toujours les mêmes champs, c'est perdre les types, les contraintes et les index : une quantité « quinze » entre sans erreur.",
            reflexe: "Forme fixe : des colonnes typées. Forme variable (des attributs propres à chaque famille d'article, des messages de plusieurs partenaires) : un document, avec les champs communs extraits en colonnes."
          },
          {
            id: "extraire",
            q: "Quels champs extrais-tu en colonnes, et lesquels restent dans le document ?",
            pourquoi: "Un filtre sur un champ du JSON relit et analyse chaque document : coûteux sur des millions de messages. Tout extraire, c'est refaire une table rigide, cassée à la moindre clé ajoutée.",
            reflexe: "Extrais les champs filtrés, joints ou additionnés souvent : partenaire, numéro de commande, date, montant. Le reste reste dans le document, lu seulement quand il le faut.",
            moteurs: {
              snowflake: "Sa doc conseille d'extraire en colonnes les dates, les nombres écrits en texte et les tableaux : moins de place, et un meilleur élagage (moins de blocs lus)."
            }
          }
        ]
      },
      {
        titre: "Le type de la colonne",
        questions: [
          {
            id: "type-json",
            q: "Quel type de colonne pour un document JSON ?",
            pourquoi: "En simple texte, rien ne vérifie le JSON, et chaque lecture le relit en entier. Dans un type JSON, il est vérifié et rangé pour être lu vite, mais il est réécrit à la façon du moteur.",
            reflexe: "Le type JSON du moteur pour interroger. Un texte pour garder l'original exact (question suivante).",
            moteurs: {
              sqlserver: "Type `json` depuis SQL Server 2025 : binaire, 2 Go au plus, un objet ou un tableau seulement. Avant : `NVARCHAR(MAX)` avec `CHECK (ISJSON(brut) = 1)`.",
              snowflake: "`VARIANT` (le type de Snowflake pour le JSON) : 128 Mo au plus, souvent moins en pratique. Rempli par `PARSE_JSON` dans un `INSERT … SELECT`.",
              mysql: "Type `JSON` : vérifié à l'écriture (une erreur sinon), limité par `max_allowed_packet` (64 Mo par défaut)."
            }
          },
          {
            id: "original-exact",
            q: "Le texte d'origine doit-il rester exact, au caractère près ?",
            pourquoi: "Un type JSON ou XML réécrit le document : espaces retirés, clés en double réduites à une, ordre changé. Ce n'est plus tout à fait le message reçu.",
            reflexe: "Garde le texte reçu dans une colonne texte (ou le fichier dans une archive), et le document typé à côté, pour les requêtes. Ne modifie jamais le brut : corrige dans les colonnes extraites.",
            moteurs: {
              sqlserver: "Le type `json` garde la 1re valeur d'une clé en double, sans erreur. Microsoft conseille un type texte pour garder la forme exacte du document.",
              snowflake: "`PARSE_JSON` refuse une clé en double. Avec le paramètre `'d'`, il la garde une seule fois, avec sa dernière valeur.",
              mysql: "Le type `JSON` garde la dernière valeur d'une clé en double, retire les espaces et trie les clés."
            }
          },
          {
            id: "taille",
            q: "Quelle taille peut atteindre un message, et le type la supporte-t-il ?",
            pourquoi: "Une facture de 3 000 lignes, ou un fichier de stock, dépasse la limite du type : l'insertion de ce message échoue, souvent la nuit, et la commande n'entre pas.",
            reflexe: "Mesure les plus gros messages reçus, et compare à la limite du type. Au-delà, garde le fichier dans un stockage de fichiers, et en base seulement son chemin et son empreinte.",
            moteurs: {
              sqlserver: "`NVARCHAR(MAX)` et `json` : 2 Go au plus. Mais en mode lax (le défaut, sans erreur), `JSON_VALUE` rend NULL au-delà de 4 000 caractères : prends `OPENJSON`, ou `RETURNING nvarchar(max)` en 2025.",
              snowflake: "`VARIANT` : 128 Mo non compressés. `VARCHAR` sans longueur : 16 Mo par défaut ; `VARCHAR(134217728)` pour aller jusqu'à 128 Mo.",
              mysql: "`TEXT` : 65 535 octets ; `MEDIUMTEXT` : 16 Mo ; `LONGTEXT` : 4 Go. Le `JSON` dépend de `max_allowed_packet`."
            }
          },
          {
            id: "encodage",
            q: "L'encodage du message est-il connu, et gardé ?",
            pourquoi: "Un message en Windows-1252 rangé comme de l'UTF-8 abîme les accents : « Électricité » devient illisible, et la preuve aussi.",
            reflexe: "Note l'encodage reçu, convertis-le une fois à l'arrivée, et range le brut dans un type Unicode. Pour un EDIFACT, l'en-tête UNB annonce son jeu de caractères (UNOA, UNOC…) : garde-le avec le message.",
            moteurs: {
              sqlserver: "`NVARCHAR`, ou `VARCHAR` avec une collation UTF-8 (depuis SQL Server 2019). Le type `json` range ses textes en UTF-8.",
              snowflake: "Tout texte est en UTF-8. Un CSV en Windows-1252 se charge avec `ENCODING = 'WINDOWS1252'` ; un JSON doit être en UTF-8. Un caractère invalide fait échouer, sauf avec `REPLACE_INVALID_CHARACTERS = TRUE`.",
              mysql: "`utf8mb4`, le jeu par défaut, garde tous les caractères."
            }
          }
        ]
      },
      {
        titre: "Lire le document",
        questions: [
          {
            id: "casse-cles",
            q: "Les noms des clés sont-ils écrits exactement, majuscules comprises ?",
            pourquoi: "Un chemin vers une clé mal écrite ne lève pas d'erreur : il rend NULL. Le partenaire envoie \"Num_Cde\" au lieu de \"num_cde\", et la commande entre sans numéro.",
            reflexe: "Copie les clés depuis un vrai message, jamais de mémoire. Après chaque chargement, compte les messages dont un champ obligatoire est NULL : 0 attendu.",
            moteurs: {
              sqlserver: "Les clés se comparent en binaire, majuscules comprises, quelle que soit la collation (doc d'`OPENJSON`). Une clé absente rend NULL, sans erreur (mode lax, le défaut).",
              snowflake: "`doc:num_cde` : le nom de la colonne ignore la casse, pas celui de la clé (sa doc)."
            }
          },
          {
            id: "null-json",
            q: "Distingues-tu une clé absente, un null JSON et un NULL SQL ?",
            pourquoi: "`\"motif\": null` n'est pas un NULL SQL : `WHERE doc:motif IS NULL` l'oublie. Le rapport des rejets sans motif se trompe, sans erreur.",
            reflexe: "Convertis avant de tester : `doc:motif::STRING IS NULL` attrape les deux cas. Décide avec le métier si « absent », « null » et « vide » veulent dire la même chose.",
            seulement: ["snowflake"]
          },
          {
            id: "tableaux",
            q: "Le message contient-il un tableau, comme les lignes d'une commande ?",
            pourquoi: "Un tableau se lit en une ligne SQL par élément. Une commande dont le tableau `lignes` est vide disparaît du résultat, sans erreur, comme avec un `INNER JOIN`.",
            reflexe: "Garde la commande même sans ligne (la forme « outer »), puis compte les commandes sans ligne : à traiter comme des rejets.",
            moteurs: {
              sqlserver: "`CROSS APPLY OPENJSON(brut, '$.lignes') WITH (…)` ; `OUTER APPLY` garde la commande. `OPENJSON` demande le niveau de compatibilité 130.",
              snowflake: "`LATERAL FLATTEN(input => doc:lignes)` ; `OUTER => TRUE` garde la commande.",
              mysql: "`JSON_TABLE(doc, '$.lignes[*]' COLUMNS (…))` ; `LEFT JOIN … ON TRUE` garde la commande."
            }
          },
          {
            id: "types-valeurs",
            q: "Les dates et les montants du document sont-ils convertis dans leur vrai type ?",
            pourquoi: "Un JSON n'a pas de type date : la date arrive en texte, et un montant peut arriver entre guillemets. Comparés sans conversion, '7950.00' et '850.00' se trient comme des mots.",
            reflexe: "Convertis chaque valeur extraite, avec son format : `doc:date_cde::DATE`, `CAST(JSON_VALUE(brut, '$.montant') AS DECIMAL(12,2))`. Les valeurs qui ne passent pas vont en rejet.",
            moteurs: {
              sqlserver: "Depuis SQL Server 2025, `JSON_VALUE(brut, '$.date_cde' RETURNING date)` convertit directement.",
              snowflake: "Sa doc le rappelle : une date dans un `VARIANT` est rangée en texte."
            }
          }
        ]
      },
      {
        titre: "Chercher vite",
        questions: [
          {
            id: "index-json",
            q: "Les recherches sur un champ du document sont-elles rapides ?",
            pourquoi: "Sans index, chercher la commande CDE-1007 relit tous les messages, et leur JSON. Sur deux ans de flux, l'écran de suivi peut mettre une minute.",
            reflexe: "Extrais le champ cherché dans une colonne, et indexe-la. Le filtre porte sur la colonne extraite, pas sur le JSON.",
            moteurs: {
              sqlserver: "Une colonne calculée avec `JSON_VALUE`, puis un index dessus (options SET correctes). En 2025, `CREATE JSON INDEX` existe aussi : il exige une clé primaire cluster, et se crée hors ligne.",
              snowflake: "Extrais le champ en colonne : l'élagage (moins de blocs lus) suffit souvent. Recherche très sélective : un index secondaire sur la colonne, ou la Search Optimization (une recherche rapide entretenue en fond). Les deux : édition Enterprise, payants.",
              mysql: "Une colonne générée, et un index dessus, comme dans l'exemple. Un index fonctionnel (un index sur une expression) demande `CAST(… AS CHAR(n))` et `COLLATE utf8mb4_bin` pour servir à `doc->>'$.nom' = …`."
            }
          },
          {
            id: "multi-valeurs",
            q: "Cherches-tu une valeur dans un tableau JSON, comme un code article ?",
            pourquoi: "`MEMBER OF`, `JSON_CONTAINS` ou `JSON_OVERLAPS` relisent chaque document sans index adapté : coûteux sur des millions de messages.",
            reflexe: "Un index multi-valeurs (une entrée par élément du tableau) : `CAST(doc->'$.articles' AS … ARRAY)` dans l'index, utilisé par `MEMBER OF()`, `JSON_CONTAINS()` et `JSON_OVERLAPS()`. Attention : sa création copie toute la table (pas en ligne).",
            seulement: ["mysql"]
          }
        ]
      },
      {
        titre: "EDIFACT et XML",
        questions: [
          {
            id: "edifact",
            q: "Un message EDIFACT brut : comment le garder ?",
            pourquoi: "Un EDIFACT est du texte en segments (UNB, UNH, BGM, LIN…) terminés par une apostrophe. Ce n'est ni du JSON ni du XML : un type JSON le refuse, et le découper en SQL casse au premier cas imprévu.",
            reflexe: "Range-le entier, en texte long, avec son numéro d'échange, son partenaire et sa date de réception. Le découpage reste au traducteur EDI ; garde sa sortie à côté, reliée au brut.",
            moteurs: {
              sqlserver: "`NVARCHAR(MAX)`, ou `VARCHAR(MAX)` avec une collation UTF-8.",
              snowflake: "`VARCHAR` : 16 Mo par défaut, bien assez pour un message.",
              mysql: "`MEDIUMTEXT` (16 Mo) : `TEXT` s'arrête à 65 535 octets."
            }
          },
          {
            id: "xml",
            q: "Le message est-il en XML, comme une facture électronique ?",
            pourquoi: "Une facture Factur-X est un PDF qui contient un XML (norme EN 16931) : c'est lui que lisent les logiciels. Rangé en simple texte, il ne se vérifie pas ; rangé dans un type XML, il est réécrit.",
            reflexe: "Garde le fichier d'origine, PDF et XML, comme preuve. En base : le XML pour les requêtes, et les champs utiles extraits (numéro, date, montant).",
            moteurs: {
              sqlserver: "Type `XML` (2 Go), lu par `.value()` et `.nodes()`. Il perd les espaces inutiles, l'ordre des attributs, les préfixes et la déclaration XML : pour une copie exacte, sa doc indique `NVARCHAR(MAX)` ou `VARBINARY(MAX)`.",
              snowflake: "Pas de type XML : `PARSE_XML` donne un `OBJECT`, rangé dans un `VARIANT`.",
              mysql: "Pas de type XML : du texte, lu avec `ExtractValue()`."
            }
          },
          {
            id: "version",
            q: "Le message porte-t-il une version de format, et la gardes-tu ?",
            pourquoi: "Le partenaire passe de la version 1 à la version 2 de son JSON, ou à une autre version de message EDIFACT : les champs bougent. Sans la version, tu ne sais plus comment relire un vieux message.",
            reflexe: "Une colonne `version_format`, remplie à l'arrivée : « v2 », ou la version lue dans l'en-tête UNH d'un EDIFACT (par exemple D96A). Les requêtes d'extraction en tiennent compte, version par version."
          }
        ]
      },
      {
        titre: "Données personnelles et durée",
        questions: [
          {
            id: "rgpd",
            q: "Le message brut contient-il des données personnelles ?",
            pourquoi: "Le brut garde tout : nom, téléphone, adresse de livraison du client final. Quand ces données s'effacent de la table client, elles restent dans des milliers de messages.",
            reflexe: "Liste les champs personnels du message. Fixe la durée de conservation du brut avec ton DPO, masque ou purge ensuite, et limite qui peut lire la colonne brute. Le détail : « Je protège des données personnelles »."
          },
          {
            id: "duree",
            q: "Combien de temps garder les messages bruts, et où ?",
            pourquoi: "Deux ans de messages pèsent vite plus que toutes les tables métier. Sans règle écrite, personne n'ose les supprimer, et la base grossit sans fin.",
            reflexe: "Une durée écrite, décidée avec le métier (litiges, audit), et une purge automatique. Au-delà de quelques mois, une archive de fichiers moins chère que la base, si le métier doit encore les relire."
          }
        ]
      }
    ],
    pieges: [
      "Une clé JSON mal écrite (\"Num_Cde\" au lieu de \"num_cde\") : la valeur lue est NULL, sans erreur, et la commande entre sans numéro.",
      "Snowflake : `WHERE doc:motif IS NULL` oublie les messages où `\"motif\": null` : un null JSON n'est pas un NULL SQL.",
      "SQL Server : `JSON_VALUE` sans `RETURNING` rend NULL au-delà de 4 000 caractères (mode lax), sans erreur.",
      "Garder seulement le document typé : le type JSON a réécrit le message (clé en double, espaces), et la copie exacte de ce qui a été reçu est perdue.",
      "MySQL : un index fonctionnel sur `doc->>'$.nom'` sans `CAST` est refusé ; avec `CAST` mais sans `COLLATE utf8mb4_bin`, il ne sert pas à `WHERE doc->>'$.nom' = …`.",
      "Une commande sans ligne disparaît avec `FLATTEN` ou `CROSS APPLY OPENJSON` : garde-la avec la forme « outer », puis traite-la.",
      "Un `CHECK (ISJSON(brut) = 1)` sur la table d'arrivée : le message mal formé est refusé, et avec lui la preuve de ce qu'a envoyé le partenaire.",
      "Snowflake : `PARSE_JSON('')` rend NULL, sans erreur : un message vide passe pour un message sans valeur."
    ],
    pratique: "En cas de désaccord avec un partenaire EDI, c'est le message reçu qu'on regarde. Garde-le tel quel, relié au numéro de commande et au nom du fichier, pendant la durée décidée avec le métier.",
    motsCles: ["json", "variant", "xml", "message brut", "semi-structuré", "document", "nvarchar(max)", "isjson", "openjson", "json_value", "flatten", "parse_json", "edifact", "colonne générée", "factur-x"],
    voirAussi: ["table-import", "choisir-types", "importer-fichier", "charger-snowflake", "creer-index", "donnees-personnelles", "historiser"],
    dico: ["json", "type-variant", "variant", "flatten", "xml", "object", "array", "colonne-calculee"],
    outils: ["dico"],
    sources: [
      { titre: "SQL Server : le type json", url: "https://learn.microsoft.com/fr-fr/sql/t-sql/data-types/json-data-type" },
      { titre: "SQL Server : stocker des documents JSON", url: "https://learn.microsoft.com/fr-fr/sql/relational-databases/json/store-json-documents-in-sql-tables" },
      { titre: "SQL Server : le type xml et ses colonnes", url: "https://learn.microsoft.com/fr-fr/sql/relational-databases/xml/xml-data-type-and-columns-sql-server" },
      { titre: "Snowflake : les types semi-structurés", url: "https://docs.snowflake.com/en/sql-reference/data-types-semistructured" },
      { titre: "Snowflake : bien stocker du semi-structuré dans un VARIANT", url: "https://docs.snowflake.com/en/user-guide/semistructured-considerations" },
      { titre: "MySQL 8.4 : le type JSON", url: "https://dev.mysql.com/doc/refman/8.4/en/json.html" },
      { titre: "MySQL 8.4 : CREATE INDEX (index fonctionnels et multi-valeurs)", url: "https://dev.mysql.com/doc/refman/8.4/en/create-index.html" },
      { titre: "Divalto : qu'est-ce que la norme Factur-X", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/10796630044/Qu+est-ce+que+la+norme+Factur-X" }
    ]
  }
]);
