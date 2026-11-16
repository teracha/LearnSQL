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
  }
]);
