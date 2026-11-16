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
              sqlserver: "`NVARCHAR`, ou `VARCHAR` avec une collation UTF-8 (`_UTF8`, depuis SQL Server 2019). Écris les textes Unicode avec N devant : `N'Łódź'`.",
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
              snowflake: "Les lignes sont rangées en micro-partitions, sans index par défaut. Très grosse table : une clé de clustering. Recherches très sélectives : Search Optimization, ou un index secondaire (Enterprise, depuis le 26/10/2026).",
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
      code: "-- Fichier entrepot/001_creer_base.sql, rangé dans Git\nCREATE DATABASE entrepot_ventes\nON PRIMARY (NAME = entrepot_ventes_data, FILENAME = 'D:\\sql\\data\\entrepot_ventes.mdf',\n            SIZE = 20 GB, FILEGROWTH = 1 GB)\nLOG ON (NAME = entrepot_ventes_log, FILENAME = 'L:\\sql\\log\\entrepot_ventes.ldf',\n        SIZE = 4 GB, FILEGROWTH = 512 MB)\nCOLLATE French_CI_AS;   -- la même que les bases de l'ERP : vérifie la tienne\nGO\nALTER DATABASE entrepot_ventes SET RECOVERY FULL;         -- + une sauvegarde du journal toutes les 15 min\nALTER AUTHORIZATION ON DATABASE::entrepot_ventes TO sa;  -- un compte technique, pas une personne",
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
              snowflake: "Le calcul passe par des warehouses séparés : un warehouse par usage (chargement, rapports) évite qu'un chargement ralentisse Power BI."
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
              snowflake: "Rien à choisir : les textes sont en UTF-8, comparés tels quels (la casse compte). `DEFAULT_DDL_COLLATION` existe, mais une collation peut ralentir les comparaisons.",
              mysql: "`CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci` : le défaut de MySQL 8.4, sans casse ni accents. Écris-le quand même, pour ne pas dépendre du serveur."
            }
          },
          {
            id: "collation-erp",
            q: "Ta base sera-t-elle jointe aux tables de l'ERP ?",
            pourquoi: "Deux collations différentes dans une jointure ou une concaténation : la requête plante (« Cannot resolve the collation conflict »). La documentation Divalto signale la même erreur avec ses champs en collation `CI_AI`.",
            reflexe: "Relève la collation des bases de l'ERP : `SELECT name, collation_name FROM sys.databases;`. Prends la même pour ta base. Sinon, chaque jointure devra écrire `COLLATE` sur les colonnes texte.",
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
        titre: "La taille et les options",
        questions: [
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
    pratique: "Avant de créer une base qui lira Divalto, relève la collation des bases de l'ERP (`sys.databases`) et reprends-la dans ton script. Tes jointures avec l'ERP marcheront sans `COLLATE` dans chaque requête.",
    motsCles: ["create database", "base de données", "nouvelle base", "collation", "classement", "mode de récupération", "journal", "sauvegarde", "environnement", "recette", "propriétaire", "compatibilité", "time travel", "transient", "bdd"],
    voirAussi: ["creer-schema", "creer-table", "nommer", "droits", "sauvegarder", "mettre-en-prod", "donnees-personnelles", "couts-snowflake"],
    dico: ["collate", "time-travel", "undrop", "clone", "string-split", "table-temporaire"],
    sources: [
      { titre: "CREATE DATABASE (Transact-SQL)", url: "https://learn.microsoft.com/fr-fr/sql/t-sql/statements/create-database-transact-sql" },
      { titre: "SQL Server : les modes de récupération", url: "https://learn.microsoft.com/fr-fr/sql/relational-databases/backup-restore/recovery-models-sql-server" },
      { titre: "SQL Server : la collation des bases, celle de master et model", url: "https://learn.microsoft.com/fr-fr/sql/relational-databases/policy-based-management/set-collation-of-user-defined-databases-to-match-master-model-databases" },
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
              mysql: "`RENAME TABLE ventes_stg.commande TO ventes_dwh.commande` déplace la table, mais les droits donnés sur elle ne suivent pas."
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
            reflexe: "Pour reprendre là où un chargement s'est arrêté, ne te fie pas au numéro : prends un stream (le suivi des changements), ou une date de création. `IDENTITY ORDER` rend les numéros croissants d'une instruction à l'autre, au prix d'un peu de vitesse.",
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
              mysql: "Range-le en `BINARY(16)` avec `UUID_TO_BIN(UUID(), 1)` : plus court, et croissant."
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
              snowflake: "Pas de RESEED, et `ALTER SEQUENCE` ne change pas le départ. Prévois une séquence nommée (`DEFAULT seq_client.NEXTVAL`) : tu la remplaces par une nouvelle, avec `START = 5001`.",
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
              snowflake: "La clé étrangère doit avoir les types de la clé qu'elle cite.",
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
              snowflake: "Rien n'est appliqué sur une table standard : ni refus, ni cascade. Supprime toi-même les lignes enfants."
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
              snowflake: "Pas d'index à créer pour une jointure : Snowflake lit par micro-partitions (des blocs). Très grosse table, jointe souvent : une clé de clustering.",
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
              sqlserver: "`TRUNCATE TABLE` est refusé sur une table citée par une clé étrangère : utilise `DELETE`, ou retire la clé le temps du chargement."
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
            pourquoi: "En `INT`, 2,5 kg est refusé. En `TINYINT` (SQL Server), un avoir de -3 est refusé. Le flux EDI s'arrête à la première ligne refusée.",
            reflexe: "Des pièces : `INT`. Des poids, des longueurs, des volumes : `DECIMAL(12,3)`. Et toujours l'unité à côté (`unite` : PCE, KGM) : 10 cartons ne font pas 10 pièces."
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
            reflexe: "Clé technique : `id`. Clé étrangère : le nom de la table, ou son abréviation de la liste, + `_id` : `client_id`, `cde_id`. Le même nom partout où la colonne revient. Dans l'entrepôt, la clé d'une dimension : `client_sk`."
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
  }
]);
