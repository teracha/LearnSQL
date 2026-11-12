// Parcours SQL — Cours complet du module m16 « Bonnes pratiques et anti-patterns », version 1 (12/11/2026).
// Relu le 12/11/2026 (testeur) : S3 (une requête par commande), S6 (DROP sur flux_edi : client est référencée par une clé
// étrangère), S7 (clone « vite »), S8 (le calcul se paie), carte (CLONE zéro copie). Détail : relecture-m16/changements.txt.
// Écrit à partir de la fiche de révision (data/fiches/m16.js, l'ancien cours court) et des 100 « retenir » de
// data/m16-bonnes-pratiques.js. Un cours de RELECTURE : chaque section part d'une requête livrée mal écrite (l'exemple
// montre l'anti-pattern et ce qu'il produit), puis la version propre. Squelette validé par l'élève (m02 v2) : Exemple →
// Résultat → « Ce qui se passe » → « Pourquoi » → « Le piège » → « Le bon réflexe » → « SQL Server / Snowflake » ou
// « Et aussi » → À retenir. Les règles déjà enseignées ne sont pas réexpliquées : renvois vers m01 à m11 (SELECT *,
// produit cartésien, NOT IN et NULL, colonne nue, DISTINCT après jointure, NOLOCK et RCSI, SELECT avant UPDATE) et vers
// m12, m13, m14, réécrits en même temps (index, curseurs et SQL dynamique, warehouses).
// Résultats vérifiés avec SQLite 3 sur docs/base-exemple.sql, base neuve à chaque essai (scratchpad cours-complets/m16 :
// outils/verif.py rejoue les exemples TELS QU'ÉCRITS, sortie dans verif.txt ; 26 contrôles, 0 écart) : virgule sans
// condition (28 lignes = 4 commandes d'avril × 7 clients) et version JOIN (4 lignes, tri par nom puis numéro) ; article a
// 6 colonnes ; boucle WHILE simulée (3 tours, 7 instructions, mêmes prix que l'UPDATE ensembliste : 43.89, 174.90, 26.95 ;
// 3 lignes modifiées) ; DISTINCT + jointure flux_edi (AquaBleu 27845.00 au lieu de 15115.00 ; flux par commande 2 + 1 + 2 ;
// DISTINCT sans effet ; version EXISTS : C001 15115.00 ; un GROUP BY sur le nom fusionnerait les clients 2 et 6 ; NOT IN :
// 0 ligne) ; rapport de mars en dur (3 lignes) et recalculé au 10 avril (CDE-1005, 1006, 1007) ; injection (le littéral
// vaut x' OR '1'='1 ; le texte construit rend les 7 clients ; en paramètre : 0 ligne) ; relance à 30 jours (3 factures,
// dont FA-2026-0301 AquaBleu et FA-2026-0302 Piscines Dumont, payées ; avec statut = 'EMISE' : 0 ligne).
// Vérifié dans la documentation, faute d'équivalent SQLite (SQLite relit l'étoile d'une vue à chaque requête) : la vue en
// SELECT * figée sur SQL Server, en erreur de colonne sur Snowflake ; le JOIN sans ON (erreur de syntaxe sur SQL Server).
// Sources (lues le 12/11/2026). learn.microsoft.com/sql : relational-databases/system-stored-procedures/
// sp-refreshview-transact-sql (métadonnées d'une vue non liée au schéma : périmées), relational-databases/tables/
// rename-columns-database-engine (vue en *, l'ancien nom reste), t-sql/statements/create-view-transact-sql (OR ALTER :
// 2016 SP1), relational-databases/user-defined-functions/scalar-udf-inlining (une invocation par ligne, pas de
// parallélisme, 1,6 s contre 29 min ; intégration à partir de 2019, sous conditions ; is_inlineable),
// relational-databases/cursors (le moteur travaille sur des ensembles ; curseur parfois nécessaire),
// relational-databases/security/sql-injection (la concaténation est la porte d'entrée ; un paramètre reste une valeur ;
// filtrer ou doubler les apostrophes n'est pas une défense fiable ; chaînes stockées en table ; relire chaque EXEC ;
// QUOTENAME pour un nom d'objet), relational-databases/system-stored-procedures/sp-executesql-transact-sql (syntaxe,
// texte Unicode), troubleshoot/sql/database-engine/performance/resolve-blocking-problems-caused-lock-escalation,
// troubleshoot-high-cpu-usage-issues et relational-databases/post-migration-validation-and-optimization-guide (fonction,
// ISNULL, conversion implicite ou fonction utilisateur sur la colonne : pas de seek, lecture complète),
// t-sql/statements/create-procedure-transact-sql (préfixe sp_), t-sql/statements/set-nocount-transact-sql,
// t-sql/functions/col-length-transact-sql (NULL en cas d'erreur).
// docs.snowflake.com (pages .md lues avec curl) : sql-reference/sql/create-view (vue en SELECT * : erreur de colonne si
// une colonne est ajoutée, supprimée ou déplacée), user-guide/views-introduction (changements non propagés),
// sql-reference/constructs/join (ON facultatif ; sans ON, produit cartésien), user-guide/tables-clustering-micropartitions
// (seules les colonnes citées sont lues), user-guide/warehouses-overview et warehouses-considerations (facturé à la
// seconde, 60 s minimum par démarrage, auto-suspend court), user-guide/resource-monitors (quota de crédits, alerte,
// suspension), user-guide/tables-temp-transient (pas de Fail-safe), sql-reference/sql/create-or-alter (CREATE OR ALTER
// TABLE garde les données) et sql/create-table (OR REPLACE = DROP puis CREATE), sql/alter-table (ADD COLUMN IF NOT
// EXISTS), sql/execute-immediate (USING), sql-reference/identifier-literal (IDENTIFIER contre l'injection), sql/set et
// session-variables (SET var = expression, puis $var), constructs/at-before (OFFSET en secondes), sql/create-clone,
// sql/insert (COPY INTO pour les gros volumes).
// Divalto (base documentaire du dépôt teracha/Divalto_10, lecture seule) : « Bonne pratiques SQL pour l'ERP » >
// « Jointures auto résolues et CAST implicites » (CE et DOS sont du texte : CE4 = '1', sinon pas d'index) et « Limiter
// le nombre de requêtes SQL » ; super dico, fiche dv-picod (4 = facture).
// Couverture des 100 « retenir » : scratchpad cours-complets/m16/couverture.txt (74 notions dans le cours, 26 laissées à
// leur question, toutes vues dans un module précédent ou dans m12, m13 ; règle 6 de docs/plan-sql.md).
// Question à corriger, signalée au superviseur : q04 (sur Snowflake, un JOIN sans ON n'est pas une erreur de syntaxe :
// il fait un produit cartésien ; docs.snowflake.com sql-reference/constructs/join).
LEARNSQL.cours.m16 = {
  intro: "Le prestataire EDI livre une procédure « testée en recette » : la signes-tu sans la relire ? Ce module apprend à relire du SQL : chaque section part d'une vraie requête mal écrite, montre ce qu'elle produit, puis la version propre. Le but : une requête juste, lisible, rapide, sûre, facile à reprendre, et l'erreur trouvée en relecture, pas dans Power BI.",
  sections: [
    {
      titre: "Lisible : des alias qui parlent, des jointures écrites",
      exemple: "-- Livré : « les commandes d'avril et leur client »\nSELECT a.num_cde, b.nom\nFROM commande a, client b\nWHERE a.date_cde >= '20260401'\nORDER BY 2;\n-- Relu (résultat ci-dessous)\nSELECT cde.num_cde, cli.nom\nFROM dbo.commande AS cde\nJOIN dbo.client AS cli ON cli.id = cde.client_id\nWHERE cde.date_cde >= '20260401'\nORDER BY cli.nom, cde.num_cde;",
      resultat: [["num_cde", "nom"], ["CDE-1007", "AquaBleu"], ["CDE-1005", "Hydro Sud"], ["CDE-1006", "Piscines Dumont"], ["CDE-1008", "Piscines Dumont"]],
      points: [
        "Ce qui se passe : la version livrée rend 28 lignes, chaque commande d'avril avec chacun des 7 clients. La version relue rend les 4 commandes et leur client.",
        "Pourquoi : avec la virgule, le lien entre les tables part dans le WHERE, loin du FROM ; oublié, il donne un produit cartésien (tout avec tout, m05), sans erreur. `JOIN` le met à côté de sa table.",
        "Le piège : des alias `a`, `b`, `c` obligent à remonter au FROM. Et `ORDER BY 2` trie sur une position : qu'un collègue ajoute une colonne devant, le tri change, sans erreur.",
        "Le bon réflexe : des alias qui parlent (`cde`, `cli`), `alias.colonne` partout, le schéma (`dbo.`), une clause par ligne, le tri par nom. Le commentaire dit pourquoi (règle, ticket), pas ce que fait le code.",
        "SQL Server / Snowflake : un `JOIN` sans ON est une erreur de syntaxe sur SQL Server ; Snowflake l'accepte et croise tout, comme la virgule. Sur Snowflake, jamais de nom créé entre guillemets (m01)."
      ],
      retenir: "JOIN … ON plutôt que la virgule, des alias qui parlent, alias.colonne partout, et un commentaire qui dit pourquoi."
    },
    {
      titre: "SELECT * : la vue figée, les colonnes lues pour rien",
      exemple: "-- Livré pour Power BI, qui en lit 3 colonnes\nCREATE VIEW dbo.v_article AS\nSELECT * FROM dbo.article;\nGO\n-- Six mois après, l'ERP ajoute une colonne\nALTER TABLE dbo.article ADD poids_kg DECIMAL(9,3) NULL;\nSELECT * FROM dbo.v_article;",
      resultat: "SQL Server : les 6 colonnes d'origine, sans poids_kg ni erreur. Snowflake : une erreur de colonne.",
      points: [
        "Ce qui se passe : SQL Server rend les colonnes du jour de la création ; `poids_kg` manque, sans message. Snowflake refuse la vue jusqu'à ce qu'on la recrée.",
        "Pourquoi : à la création, SQL Server range la liste des colonnes de la vue ; l'étoile n'est pas relue. `EXEC sp_refreshview 'dbo.v_article'` la met à jour. Une colonne renommée y garde son ancien nom.",
        "Le piège : Power BI lit 3 colonnes sur les 80 d'une table de l'ERP ; le moteur lit et transfère les 80, et aucun index ne peut couvrir la requête (contenir toutes ses colonnes, m12).",
        "Le bon réflexe : liste les colonnes utiles, dans les vues, les procédures et les `INSERT … SELECT` (m09). `SELECT *` reste bien pour explorer, et dans `EXISTS (SELECT * …)`, qui ne lit rien (m06).",
        "SQL Server / Snowflake : Snowflake range les données par colonne et ne lit que celles demandées : `SELECT *` sur 120 colonnes les lit toutes, donc plus de temps de warehouse (le moteur de calcul) et de crédits."
      ],
      retenir: "Liste les colonnes utiles : SELECT * lit tout, et fige ou casse les vues le jour où la table change."
    },
    {
      titre: "Ligne à ligne : la boucle, le curseur, la fonction scalaire",
      exemple: "-- Livré : +10 % sur la chimie, article par article\nDECLARE @id int = (SELECT MIN(id) FROM dbo.article WHERE famille = 'CHIMIE');\nWHILE @id IS NOT NULL\nBEGIN\n  UPDATE dbo.article SET prix_tarif = prix_tarif * 1.10 WHERE id = @id;\n  SET @id = (SELECT MIN(id) FROM dbo.article WHERE famille = 'CHIMIE' AND id > @id);\nEND;\n-- Relu : une seule instruction\nUPDATE dbo.article SET prix_tarif = prix_tarif * 1.10 WHERE famille = 'CHIMIE';",
      resultat: "Mêmes prix (43.89, 174.90, 26.95). Boucle : 7 instructions, 1 puis 2 par tour ; 100 001 pour 50 000 articles. UPDATE : 1.",
      points: [
        "Ce qui se passe : même résultat, mais la boucle fait 3 tours ; chacun relit la table pour trouver l'article suivant, puis écrit une ligne.",
        "Pourquoi : le moteur traite un ensemble de lignes d'un coup : une lecture, un plan (le chemin choisi), une écriture. Une boucle ou un curseur (qui lit ligne à ligne, m13) repaie tout à chaque tour.",
        "Le piège : la boucle cachée. `SELECT num_cde, dbo.f_nom_client(client_id) FROM dbo.commande` appelle la fonction scalaire (qui rend une valeur) à chaque ligne. Microsoft a mesuré 1,6 s sans fonction, 29 min avec. SQL Server 2019 sait en intégrer certaines à la requête, pas toutes.",
        "Le bon réflexe : décris le résultat, pas les étapes : UPDATE avec jointure (m09), `INSERT … SELECT`, cumul par `SUM() OVER` (m08). Un libellé : une jointure, ou une fonction table en ligne (une vue à paramètres, m13).",
        "Et aussi : une boucle reste juste pour une tâche par élément, sur peu de lignes, ou une purge par lots (m09). Côté appli, même défaut : 5 000 commandes puis une requête par commande pour son client, 5 001 allers-retours."
      ],
      retenir: "Pense ensemble : une instruction pour toutes les lignes. Boucle, curseur, fonction scalaire : le travail se paie à chaque ligne."
    },
    {
      titre: "Les rustines : DISTINCT, NOLOCK et les pièges déjà vus",
      exemple: "-- Livré : « CA 2026 des clients EDI », 4 défauts\nSELECT DISTINCT cl.nom, SUM(co.montant_ht) AS ca   -- 1. DISTINCT\nFROM dbo.commande AS co WITH (NOLOCK)               -- 2. NOLOCK\nJOIN dbo.client AS cl ON cl.id = co.client_id\nJOIN dbo.flux_edi AS f ON f.cde_id = co.id\nWHERE YEAR(co.date_cde) = 2026                      -- 3. fonction sur la colonne\nGROUP BY cl.nom;                                    -- 4. un nom, pas une clé",
      resultat: "AquaBleu : 27 845 €, pour 15 115 € de commandes EDI, chacune comptée une fois par flux (2 + 1 + 2).",
      points: [
        "Ce qui se passe : la jointure vers `flux_edi` copie chaque commande une fois par flux. Le DISTINCT ne retire rien : après le GROUP BY, chaque ligne est déjà unique.",
        "Pourquoi : DISTINCT dédoublonne les lignes finies : il cache des doublons dans une liste, il ne répare jamais une somme faite sur des copies (m05). « Au moins un flux » s'écrit `EXISTS` (m06).",
        "Le piège : chaque rustine ajoute un bug. NOLOCK (lire sans attendre les verrous) lit du non validé, saute ou double des lignes (m11). `YEAR()` empêche l'index (m02). Grouper par nom fusionnerait les deux Piscines Dumont.",
        "Le bon réflexe : `EXISTS (SELECT 1 FROM dbo.flux_edi AS f WHERE f.cde_id = co.id)`, la date en plage (`>= '20260101' AND < '20270101'`), le groupe sur la clé (`cl.code, cl.nom`) : C001, 15 115 €. Rapports bloqués : RCSI (lire la dernière version validée, comme Snowflake, m11), pas NOLOCK.",
        "Et aussi : relis chaque `NOT IN (SELECT …)` : un seul NULL et il rend 0 ligne ; écris `NOT EXISTS` (m02, m07). Un nombre comparé à une colonne texte convertit toute la colonne (m01) : dans Divalto, `CE4 = '1'`, pas `= 1`."
      ],
      retenir: "DISTINCT et NOLOCK cachent un bug : cherche la cause, et relis chaque NOT IN et chaque fonction sur une colonne."
    },
    {
      titre: "Les valeurs en dur : nombres magiques et dates",
      exemple: "-- Livré en mars : « commandes du mois à facturer »\nSELECT num_cde, date_cde, montant_ht\nFROM dbo.commande\nWHERE date_cde >= '20260301' AND date_cde < '20260401'   -- le mois, en dur\n  AND statut IN ('LIVREE', 'EN_COURS')                    -- copié dans 15 rapports\n  AND montant_ht > 100;                                   -- 100 : pourquoi ?\n-- Lancé le 10 avril (résultat ci-dessous)",
      resultat: [["num_cde", "date_cde", "montant_ht"], ["CDE-1001", "2026-03-02", "4780.00"], ["CDE-1002", "2026-03-05", "1290.00"], ["CDE-1003", "2026-03-09", "2385.00"]],
      points: [
        "Ce qui se passe : le 10 avril, le rapport « du mois » montre encore mars ; CDE-1005, 1006 et 1007 manquent. Et `100` ? Un seuil, un test oublié ? C'est un nombre magique (une valeur sans nom).",
        "Pourquoi : une valeur en dur ne change que si quelqu'un rouvre chaque requête qui la copie. Quinze rapports, quinze endroits : un sera oublié, et deux rapports Power BI divergent.",
        "Le piège : dans un traitement de nuit, `GETDATE()` appelé dans 5 instructions ; celles qui passent après minuit calculent un autre « hier ». Et `ERP_PROD.dbo.client` dans une procédure : en recette, elle lit la production.",
        "Le bon réflexe : la date lue une fois (`DECLARE @jour date = CAST(GETDATE() AS date);`), puis `DATEFROMPARTS(YEAR(@jour), MONTH(@jour), 1)`. Statuts et seuils : une table de paramètres, jointe ; sinon, un commentaire (`PICOD = 4 -- 4 = facture`).",
        "SQL Server / Snowflake : Snowflake lit la date une fois avec `SET jour = CURRENT_DATE();`, puis `$jour`. Sur SQL Server, une base en dur devient un synonyme (un nom relais, `CREATE SYNONYM`), un par environnement."
      ],
      retenir: "Pas de valeur sans nom : une date lue une fois, les listes et seuils dans une table de paramètres."
    },
    {
      titre: "SQL dynamique : la saisie ne devient jamais du code",
      exemple: "-- Livré : la recherche client ; l'utilisateur tape  x' OR '1'='1\nDECLARE @nom varchar(60) = 'x'' OR ''1''=''1';\nDECLARE @sql nvarchar(400) =\n  N'SELECT code, nom FROM dbo.client WHERE nom = ''' + @nom + N'''';\nEXEC (@sql);   -- … WHERE nom = 'x' OR '1'='1'\n-- Relu : la saisie part en paramètre\nEXEC sp_executesql N'SELECT code, nom FROM dbo.client WHERE nom = @n',\n                   N'@n varchar(60)', @n = @nom;",
      resultat: "EXEC : les 7 clients sortent. sp_executesql : 0 ligne, aucun client ne s'appelle ainsi.",
      points: [
        "Ce qui se passe : la saisie ferme l'apostrophe et ajoute `OR '1'='1'`, toujours vrai : les 7 clients sortent. En paramètre, la même saisie reste un nom bizarre : 0 ligne.",
        "Pourquoi : `EXEC (@sql)` exécute le texte tel qu'il est : ce qui est collé devient du code. Avec `sp_executesql`, la requête est fixe et la valeur voyage à part, jamais lue comme du SQL.",
        "Le piège : avec `x'; DROP TABLE dbo.flux_edi; --`, la saisie supprime une table : c'est l'injection SQL. Doubler les apostrophes à la main n'est pas fiable (Microsoft). Un champ EDI chargé peut aussi porter l'attaque.",
        "Le bon réflexe : chaque valeur en paramètre, du type de la colonne. Un nom de table ne peut pas l'être : vérifie-le dans une liste autorisée, puis `QUOTENAME(@table)` (m13). En relecture, cherche chaque `EXEC (`.",
        "SQL Server / Snowflake : Snowflake écrit `EXECUTE IMMEDIATE :texte USING (v_nom)`, les `?` du texte recevant les valeurs, et `IDENTIFIER(:nom_table)` pour un nom d'objet. Même règle : jamais une saisie collée."
      ],
      retenir: "SQL dynamique : valeurs en paramètres, noms d'objets vérifiés puis protégés, jamais une saisie collée dans le texte."
    },
    {
      titre: "Tester avant de livrer",
      exemple: "-- Ticket SI-1234 : relancer les factures émises depuis plus de 30 jours\n-- 1. Le SELECT, avec le WHERE prévu (arrêté au 30/04)\nSELECT num_fact, date_fact, statut\nFROM dbo.facture\nWHERE date_fact < DATEADD(day, -30, '20260430');   -- le statut est oublié\n-- 2. Ensuite : transaction, UPDATE, compte contrôlé",
      resultat: [["num_fact", "date_fact", "statut"], ["FA-2026-0301", "2026-03-03", "PAYEE"], ["FA-2026-0302", "2026-03-06", "PAYEE"], ["FA-2026-0303", "2026-03-10", "RETARD"]],
      points: [
        "Ce qui se passe : 3 factures, dont 2 payées : l'UPDATE aurait relancé AquaBleu et Piscines Dumont pour des factures réglées. Avec `AND statut = 'EMISE'`, 0 ligne : rien à relancer ce jour-là.",
        "Pourquoi : un UPDATE touche toutes les lignes de son WHERE, sans question ; 0 ou 3 lignes ne sont jamais une erreur (m09). Le SELECT montre le nombre et le contenu, avant tout dégât.",
        "Le piège : le script testé sur une petite recette, ou jamais hors de la production : 1 s sur 10 000 lignes, 25 min sur 40 millions. Ou un `BEGIN TRAN` oublié dans SSMS : tout le monde attend (m11).",
        "Le bon réflexe : un ticket, un script relu, le SELECT puis le même WHERE, une transaction qui compte (`IF @@ROWCOUNT <> @attendu ROLLBACK; ELSE COMMIT;`), une copie datée (`SELECT … INTO`), un test à volume réel sur une copie récente, plan lu.",
        "SQL Server / Snowflake : Snowflake clone vite une base de test (`CREATE DATABASE recette CLONE prod;`) et relit le passé par Time Travel (`AT (OFFSET => -1800)`). Mais `CREATE OR REPLACE TABLE` relancé recrée la table vide (m10)."
      ],
      retenir: "Avant de livrer : le SELECT du même WHERE, une transaction qui compte, une copie de sauvegarde, un test à volume réel."
    },
    {
      titre: "Détails utiles",
      points: [
        "Scripts relançables : `CREATE OR ALTER VIEW` (2016 SP1), `DROP TABLE IF EXISTS`, `IF COL_LENGTH('dbo.commande', 'devise') IS NULL ALTER TABLE …`. Snowflake : `CREATE OR ALTER TABLE` garde les données.",
        "Git (l'outil qui garde l'historique des fichiers) : chaque script y est versionné, avec date, auteur et ticket ; relecture et retour arrière deviennent simples. Le code mort se supprime : Git le garde.",
        "Procédures : une par responsabilité (charger, calculer, purger), lancées par une procédure chef d'orchestre ; en tête, objectif, paramètres, règles, ticket ; `SET NOCOUNT ON` et le modèle de m11. Pas de préfixe `sp_` (système).",
        "Trigger (code lancé à chaque modification d'une table) : une exécution par instruction, pas par ligne ; il traite `inserted` comme un ensemble (m09). Une règle métier va dans une procédure visible.",
        "Déjà vus, à relire : un ORDER BY avec chaque TOP (m01) ; l'id créé par `SCOPE_IDENTITY()`, pas `MAX(id)` (m09) ; une source sans doublon avant un UPDATE avec jointure ou un MERGE (m09).",
        "Snowflake et les coûts : `AUTO_SUSPEND` court (le warehouse inactif s'arrête), un warehouse par usage (chargement, BI, exploration), un resource monitor (plafond de crédits : alerte, puis arrêt). Lent : le Query Profile (son plan d'exécution) avant d'agrandir (m14).",
        "Snowflake et les chargements : tables `TRANSIENT` pour ce qui se recharge (sans Fail-safe, les 7 jours de secours : moins de stockage payé) ; par fichier (`COPY INTO`) ou par lots, pas 100 000 INSERT d'une ligne ; doublons contrôlés après (m10)."
      ],
      retenir: "Un script se relance sans dégât, vit dans Git, se teste avant la production ; sur Snowflake, le calcul se paie."
    }
  ],
  differences: [
    ["`JOIN` sans `ON`", "Erreur de syntaxe", "Produit cartésien"],
    ["Colonne ajoutée, vue `SELECT *`", "Colonnes figées, sans erreur", "Erreur de colonne"],
    ["Coût d'une requête lente", "Temps, blocages", "Crédits payés"],
    ["Rapport bloqué par l'ERP", "RCSI, pas `NOLOCK`", "Jamais bloqué"],
    ["SQL dynamique, valeurs", "`sp_executesql` + paramètres", "`EXECUTE IMMEDIATE … USING`"],
    ["Nom de table dynamique", "`QUOTENAME(@t)`", "`IDENTIFIER(:t)`"],
    ["Date lue une fois", "`DECLARE @jour date`", "`SET jour = CURRENT_DATE()`"],
    ["`CREATE OR ALTER`", "Vues, procédures", "Aussi les tables"],
    ["Copie de test", "Restaurer une sauvegarde", "`CLONE`, zéro copie"],
    ["Requête lente : où regarder", "Plan d'exécution", "Query Profile"]
  ]
};
