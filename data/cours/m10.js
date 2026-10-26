LEARNSQL.cours.m10 = {
  intro: "Une bonne table protège les données toute seule : types justes, clés, contraintes. Une mauvaise table laisse entrer des erreurs que tu devras nettoyer pendant des années.",
  sections: [
    {
      titre: "Créer une table",
      exemple: "CREATE TABLE dbo.facture (\n  id          INT IDENTITY(1,1) NOT NULL,\n  num_facture VARCHAR(20)       NOT NULL,\n  client_id   INT               NOT NULL,\n  date_fact   DATE              NOT NULL,\n  montant_ht  DECIMAL(18,2)     NOT NULL,\n  statut      VARCHAR(10)       NOT NULL DEFAULT 'BROUILLON',\n  CONSTRAINT pk_facture PRIMARY KEY (id),\n  CONSTRAINT uq_facture_num UNIQUE (num_facture),\n  CONSTRAINT fk_facture_client FOREIGN KEY (client_id) REFERENCES dbo.client (id),\n  CONSTRAINT ck_facture_montant CHECK (montant_ht >= 0)\n);",
      points: [
        "Chaque colonne a un type et dit si elle accepte NULL.",
        "Mets `NOT NULL` dès que la valeur est obligatoire.",
        "Nomme tes contraintes (`pk_…`, `fk_…`) : les messages d'erreur seront clairs."
      ],
      retenir: "Le type + NOT NULL + les contraintes = la première ligne de défense."
    },
    {
      titre: "Les contraintes",
      exemple: "-- Refusé : le client 999 n'existe pas\nINSERT INTO dbo.facture (num_facture, client_id, date_fact, montant_ht)\nVALUES ('F2026-001', 999, '20261026', 100);",
      points: [
        "`PRIMARY KEY` : identifie chaque ligne. Unique et non NULL.",
        "`UNIQUE` : pas de doublon (ex. numéro de facture). Une seule ligne NULL autorisée sur SQL Server.",
        "`FOREIGN KEY` : la valeur doit exister dans la table référencée.",
        "`CHECK` : une règle (montant >= 0, statut dans une liste).",
        "`DEFAULT` : valeur si rien n'est fourni.",
        "Snowflake : seul NOT NULL est appliqué. PK, UNIQUE et FK sont documentaires : ils ne bloquent rien !"
      ],
      retenir: "SQL Server applique les contraintes. Snowflake applique seulement NOT NULL."
    },
    {
      titre: "Choisir les bons types",
      exemple: "date_cde     DATE            -- pas VARCHAR !\nhorodatage   DATETIME2(0)    -- pas DATETIME (plus précis, plus moderne)\nmontant      DECIMAL(18,2)   -- pas FLOAT\nquantite     DECIMAL(12,3)   -- si on vend au mètre ou au kg\nlibelle      NVARCHAR(100)   -- si caractères étrangers\nactif        BIT             -- BOOLEAN sur Snowflake",
      points: [
        "Une date stockée en texte : pas de tri fiable, pas de contrôle, conversions partout.",
        "Argent : DECIMAL. FLOAT donne des valeurs approchées.",
        "Codes avec zéros devant (code postal, SIRET) : texte, pas nombre.",
        "Taille juste : VARCHAR(20) pour un code, pas VARCHAR(MAX).",
        "Snowflake : la longueur du VARCHAR n'a pas d'impact sur les performances. NUMBER(38,0) pour les entiers."
      ],
      retenir: "Une date est une DATE. Un montant est un DECIMAL. Un code postal est un texte."
    },
    {
      titre: "Modifier une table",
      exemple: "ALTER TABLE dbo.facture ADD devise CHAR(3) NOT NULL\n  CONSTRAINT df_facture_devise DEFAULT 'EUR';\n\nALTER TABLE dbo.facture ALTER COLUMN num_facture VARCHAR(30) NOT NULL;\n\nDROP TABLE IF EXISTS stg.tmp_import;",
      points: [
        "Ajouter une colonne NOT NULL à une table pleine : il faut un DEFAULT.",
        "Agrandir une colonne : facile. La réduire : risque de troncature.",
        "`DROP TABLE IF EXISTS` (SQL Server 2016+, Snowflake) : script relançable.",
        "En production : teste d'abord sur une copie."
      ],
      retenir: "Colonne NOT NULL ajoutée = DEFAULT obligatoire."
    },
    {
      titre: "Tables temporaires",
      exemple: "-- SQL Server\nCREATE TABLE #a_traiter (id INT PRIMARY KEY);\nDECLARE @liste TABLE (id INT);\n\n-- Snowflake\nCREATE TEMPORARY TABLE a_traiter (id INT);",
      points: [
        "`#table` : visible dans ta session, supprimée à la fin.",
        "`##table` : visible par toutes les sessions (rare).",
        "`@table` (variable table) : petite, mauvaises estimations sur de gros volumes.",
        "Snowflake : `TEMPORARY` (session) ou `TRANSIENT` (sans Fail-safe)."
      ],
      retenir: "Résultat intermédiaire volumineux : #table plutôt que @table."
    },
    {
      titre: "Clés auto-incrémentées",
      exemple: "-- SQL Server\nid INT IDENTITY(1,1)\n\n-- Snowflake\nid INT AUTOINCREMENT   -- ou une SEQUENCE",
      points: [
        "Une clé technique (surrogate) : simple, stable, compacte.",
        "Garde aussi une contrainte UNIQUE sur la clé métier (num_facture).",
        "Les numéros peuvent avoir des trous (rollback, redémarrage). Normal.",
        "Ne jamais utiliser un id auto pour une numérotation légale de factures sans trou."
      ],
      retenir: "IDENTITY = identifiant technique, avec des trous possibles."
    }
  ],
  differences: [
    ["PK / UNIQUE / FK", "Appliquées", "Non appliquées (informatives)"],
    ["Booléen", "`BIT`", "`BOOLEAN`"],
    ["Auto-incrément", "`IDENTITY(1,1)`", "`AUTOINCREMENT` / `SEQUENCE`"],
    ["Texte Unicode", "`NVARCHAR`", "`VARCHAR` (toujours Unicode)"],
    ["Table temporaire", "`#t`, `@t`", "`TEMPORARY`, `TRANSIENT`"]
  ]
};
