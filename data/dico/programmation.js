// Super dico SQL — catégorie « Programmation » (étape 2, 05/11/2026). Format : docs/dico.md.
// Résultats calculés avec SQLite sur docs/base-exemple.sql (boucles, curseurs et procédures rejoués en Python sur une
// copie en mémoire), et chaque exemple MySQL rejoué sur un vrai serveur MySQL 8.0.46 (procédures créées avec DELIMITER,
// binlog actif, mode strict) : scripts de contrôle du dossier scratchpad dico/d. Les fiches SQL Server seules (PRINT,
// THROW, @@ROWCOUNT…) : résultat calculé à la main, deux fois, et dit en phrase.
// Sources (vérifiées le 05/11/2026) :
// - SQL Server, learn.microsoft.com/sql : t-sql/language-elements/declare-local-variable-transact-sql (NULL au départ,
//   portée = le lot), variables-transact-sql (portée, pas touchées par un ROLLBACK), set-local-variable- et
//   select-local-variable-transact-sql (plusieurs lignes : la dernière valeur, sans erreur ; aucune ligne : valeur
//   inchangée ; sous-requête vide : NULL), if-else-, while-, begin-end-transact-sql (pas une transaction, pas atomique),
//   try-catch-transact-sql (erreurs de compilation et de nom d'objet non attrapées au même niveau), throw-transact-sql
//   (point-virgule avant, numéro ≥ 50000, gravité 16, lot arrêté sans TRY), raiserror-transact-sql (WITH NOWAIT),
//   print-transact-sql, t-sql/statements/create-procedure-transact-sql (OR ALTER : 2016 SP1+ ; préfixe sp_ à éviter),
//   relational-databases/stored-procedures/specify-parameters (paramètres nommés, OUTPUT dans l'appel),
//   t-sql/statements/create-function-transact-sql (fonction scalaire appelée avec le schéma), relational-databases/
//   user-defined-functions/scalar-udf-inlining (appel ligne par ligne, sans parallélisme ; inlining en niveau 150),
//   relational-databases/system-stored-procedures/sp-executesql-transact-sql, t-sql/functions/rowcount-transact-sql
//   (remis à 0 par PRINT, COMMIT… ; à 1 par SET @v), t-sql/language-elements/declare-cursor- et
//   functions/fetch-status-transact-sql, tools/sql-database-projects (SR0009 : VARCHAR sans longueur = 1).
// - Snowflake, docs.snowflake.com : developer-guide/snowflake-scripting/variables (DECLARE, LET, :=, SELECT … INTO :
//   une seule ligne), sql-reference/sql/set (variables de session, $nom), user-guide/querying-subqueries (sous-requête
//   scalaire sur plusieurs lignes = erreur), snowflake-scripting/branch, loops, while, break, continue, exceptions et
//   raise (EXCEPTION WHEN OTHER, SQLCODE, SQLERRM ; RAISE sans nom relance l'erreur), stored-procedures-snowflake-
//   scripting (:param dans le SQL), sql/call (CALL, arguments nommés =>), udf-sql et udf-sql-tabular-functions,
//   sql/execute-immediate (USING, RESULTSET), snowflake-scripting/dml-status (SQLROWCOUNT, SQLFOUND, SQLNOTFOUND),
//   snowflake-scripting/cursors (FOR … IN … DO), logging-tracing/logging-snowflake-scripting (SYSTEM$LOG, table
//   d'événements à activer).
// - MySQL 8.0, dev.mysql.com/doc/refman/8.0/en : declare-local-variable.html, local-variable-scope.html (une variable
//   ou un paramètre prend le pas sur une colonne du même nom), user-variables.html, select-into.html (erreur 1172),
//   if.html, while.html, leave.html, iterate.html, begin-end.html, declare-handler.html, get-diagnostics.html,
//   signal.html, resignal.html, create-procedure.html (pas de OR REPLACE ; IF NOT EXISTS depuis 8.0.29), call.html,
//   stored-programs-logging.html (erreur 1418 sans DETERMINISTIC quand le binlog est actif),
//   sql-prepared-statements.html, information-functions.html (ROW_COUNT : lignes vraiment changées, sauf connexion
//   CLIENT_FOUND_ROWS), cursors.html.
// docs.snowflake.com et dev.mysql.com n'étaient pas joignables depuis la session : vérifiés par extraits de recherche
// (et, pour MySQL, sur le serveur réel).
LEARNSQL.dico = (LEARNSQL.dico || []).concat([
  {
    id: "declare",
    nom: "DECLARE",
    type: "mot-clé",
    categorie: "Programmation",
    definition: "Crée une variable : une case nommée qui garde une valeur pendant le script.",
    moteurs: {
      sqlserver: "`DECLARE @total DECIMAL(10,2) = 0;` : le nom commence par @ ; la variable vit jusqu'à la fin du lot (le `GO`)",
      snowflake: "Dans un bloc : `DECLARE total NUMBER(10,2);` avant `BEGIN`, ou `LET total NUMBER(10,2) := 0;` dedans ; hors bloc : `SET total = 0;` puis `$total`",
      mysql: "Dans une procédure : `DECLARE total DECIMAL(10,2) DEFAULT 0;` en tête du bloc ; ailleurs : `SET @total = 0;` (sans type)"
    },
    noms: ["LET", "DECLARE @"],
    exemple: "DECLARE @client_id INT = 1;\nDECLARE @total DECIMAL(10,2);\nSET @total = (SELECT SUM(montant_ht) FROM commande\n              WHERE client_id = @client_id AND statut <> 'ANNULEE');\nSELECT @client_id AS client_id, @total AS total_ht;",
    exemples: {
      snowflake: "DECLARE\n  total NUMBER(10,2);\nBEGIN\n  SELECT SUM(montant_ht) INTO :total FROM commande\n  WHERE client_id = 1 AND statut <> 'ANNULEE';\n  RETURN total;   -- 15115.00\nEND;",
      mysql: "SET @client_id = 1;   -- hors procédure : pas de DECLARE\nSET @total = (SELECT SUM(montant_ht) FROM commande\n              WHERE client_id = @client_id AND statut <> 'ANNULEE');\nSELECT @client_id AS client_id, @total AS total_ht;"
    },
    resultat: [["client_id", "total_ht"], [1, "15115.00"]],
    piege: "Une variable déclarée sans valeur vaut NULL : `@total + 100` donne NULL, sans erreur. Donne une valeur de départ (`= 0`), et une longueur à tes textes : `DECLARE @nom VARCHAR` vaut `VARCHAR(1)` et coupe tout après la 1re lettre.",
    motsCles: ["variable", "déclarer", "créer une variable", "stocker", "garder", "mémoriser", "retenir", "valeur", "let", "type", "initialiser", "conserver", "script"],
    voirAussi: ["set-variable", "if-else", "while", "sql-dynamique"],
    module: "m13"
  },
  {
    id: "set-variable",
    nom: "SET @variable",
    type: "mot-clé",
    categorie: "Programmation",
    definition: "Donne une valeur à une variable : un nombre, un texte, ou le résultat d'une requête.",
    moteurs: {
      sqlserver: "`SET @v = (SELECT …)` : une variable, erreur si plusieurs lignes ; `SELECT @a = col1, @b = col2 FROM …` : plusieurs à la fois",
      snowflake: "Dans un bloc : `v := valeur;` ou `SELECT col INTO :v FROM …` (une seule ligne) ; hors bloc : `SET v = (SELECT …);` puis `$v`",
      mysql: "`SET @v = (SELECT …);` ; ou `SELECT col INTO @v FROM …` : erreur 1172 s'il y a plusieurs lignes"
    },
    noms: ["SELECT @var =", "SELECT INTO", ":="],
    exemple: "DECLARE @ville VARCHAR(40) = '?';\n-- 2 clients s'appellent Piscines Dumont (2 agences)\nSELECT @ville = ville FROM client WHERE nom = 'Piscines Dumont';   -- aucune erreur !\n-- (SET @ville = (SELECT ville … même WHERE) donnerait l'erreur 512 : tant mieux)\nSELECT @ville AS ville;",
    exemples: {
      snowflake: "-- 2 clients s'appellent Piscines Dumont (2 agences)\nSET ville = (SELECT ville FROM client WHERE nom = 'Piscines Dumont');   -- erreur : plusieurs lignes\nSET ville = (SELECT ville FROM client WHERE code = 'C004');              -- une ligne : OK\nSELECT $ville AS ville;",
      mysql: "SET @ville = '?';\n-- 2 clients s'appellent Piscines Dumont (2 agences)\nSELECT ville INTO @ville FROM client WHERE nom = 'Piscines Dumont';   -- erreur 1172 : tant mieux…\nSELECT @ville AS ville;   -- … mais @ville vaut déjà Grenoble (la 1re ligne lue)"
    },
    resultat: "`@ville` reçoit la ville d'une seule des 2 lignes, souvent la dernière lue (Lyon), sans erreur ni avertissement.",
    piege: "`SELECT @v = col` sur plusieurs lignes garde une seule valeur sans prévenir ; sur zéro ligne, la variable garde son ancienne valeur (piège dans une boucle). Pour une seule valeur, écris `SET @v = (SELECT …)` : il plante s'il y a plusieurs lignes (MySQL et Snowflake refusent aussi), et donne NULL s'il n'y en a aucune.",
    motsCles: ["affecter", "assigner", "valeur", "variable", "remplir", "mettre", "stocker", "set", "plusieurs lignes", "into", "résultat", "écraser", "récupérer", "assignation"],
    voirAussi: ["declare", "sous-requete", "top", "while"],
    module: "m13"
  },
  {
    id: "if-else",
    nom: "IF … ELSE",
    type: "mot-clé",
    categorie: "Programmation",
    definition: "Exécute un bloc d'instructions seulement si une condition est vraie ; sinon, un autre bloc.",
    moteurs: {
      sqlserver: "`IF condition BEGIN … END ELSE BEGIN … END` ; dans un script ou une procédure, pas dans un SELECT",
      snowflake: "Dans un bloc : `IF (condition) THEN … ELSEIF (…) THEN … ELSE … END IF;`",
      mysql: "Dans une procédure : `IF condition THEN … ELSEIF … ELSE … END IF;` ; dans un SELECT, c'est la fonction `IF(c, a, b)`"
    },
    noms: ["IF", "ELSE", "ELSEIF", "END IF"],
    exemple: "IF NOT EXISTS (SELECT 1 FROM facture WHERE cde_id = 5)\nBEGIN\n  INSERT INTO facture (id, num_fact, cde_id, date_fact, montant_ht, statut)\n  VALUES (5, 'FA-2026-0402', 5, '2026-04-15', 318.00, 'EMISE');\n  PRINT 'Facture créée';\nEND\nELSE\n  PRINT 'Déjà facturée';",
    exemples: {
      snowflake: "DECLARE nb INTEGER;\nBEGIN\n  SELECT COUNT(*) INTO :nb FROM facture WHERE cde_id = 5;\n  IF (nb = 0) THEN\n    INSERT INTO facture VALUES (5, 'FA-2026-0402', 5, '2026-04-15', 318.00, 'EMISE');\n    RETURN 'Facture créée';\n  ELSE RETURN 'Déjà facturée'; END IF;\nEND;",
      mysql: "-- Dans une procédure\nIF NOT EXISTS (SELECT 1 FROM facture WHERE cde_id = 5) THEN\n  INSERT INTO facture (id, num_fact, cde_id, date_fact, montant_ht, statut)\n  VALUES (5, 'FA-2026-0402', 5, '2026-04-15', 318.00, 'EMISE');\n  SELECT 'Facture créée' AS message;\nELSE\n  SELECT 'Déjà facturée' AS message;\nEND IF;"
    },
    resultat: "CDE-1005 n'a pas encore de facture : FA-2026-0402 est créée, message « Facture créée ». Relancé, le script affiche « Déjà facturée » et n'insère rien.",
    piege: "Sans `BEGIN … END`, seule la 1re instruction dépend du IF : la suivante s'exécute toujours, même quand la condition est fausse. Et IF ne s'écrit pas dans un SELECT : là, c'est `CASE` (ou `IIF`).",
    motsCles: ["si", "sinon", "alors", "condition", "test", "tester", "vérifier", "choix", "branche", "elseif", "existe", "déjà", "contrôle", "if"],
    voirAussi: ["case", "iif", "begin-end", "while", "exists"],
    module: "m13"
  },
  {
    id: "while",
    nom: "WHILE",
    type: "mot-clé",
    categorie: "Programmation",
    definition: "Répète un bloc d'instructions tant qu'une condition reste vraie.",
    moteurs: {
      sqlserver: "`WHILE condition BEGIN … END` ; `BREAK` sort de la boucle, `CONTINUE` passe au tour suivant",
      snowflake: "Dans un bloc : `WHILE (condition) DO … END WHILE;` ; aussi `FOR`, `REPEAT`, `LOOP` ; `BREAK` et `CONTINUE`",
      mysql: "Dans une procédure : `WHILE condition DO … END WHILE;` ; sortir : `LEAVE etiquette` ; tour suivant : `ITERATE etiquette`"
    },
    noms: ["boucle", "BREAK", "CONTINUE", "LOOP", "REPEAT", "LEAVE", "ITERATE", "END WHILE"],
    exemple: "DECLARE @id INT = (SELECT MIN(id) FROM commande WHERE statut = 'EN_COURS');\nWHILE @id IS NOT NULL\nBEGIN\n  UPDATE commande SET statut = 'LIVREE' WHERE id = @id;   -- une ligne par tour\n  SET @id = (SELECT MIN(id) FROM commande WHERE statut = 'EN_COURS');\nEND;\n-- Version ensembliste, en une fois :\n-- UPDATE commande SET statut = 'LIVREE' WHERE statut = 'EN_COURS';",
    exemples: {
      snowflake: "DECLARE id_cde INTEGER;\nBEGIN\n  SELECT MIN(id) INTO :id_cde FROM commande WHERE statut = 'EN_COURS';\n  WHILE (id_cde IS NOT NULL) DO\n    UPDATE commande SET statut = 'LIVREE' WHERE id = :id_cde;   -- une ligne par tour\n    SELECT MIN(id) INTO :id_cde FROM commande WHERE statut = 'EN_COURS';\n  END WHILE;\nEND;",
      mysql: "-- Dans une procédure (v_id : DECLARE v_id INT;)\nSET v_id = (SELECT MIN(id) FROM commande WHERE statut = 'EN_COURS');\nWHILE v_id IS NOT NULL DO\n  UPDATE commande SET statut = 'LIVREE' WHERE id = v_id;   -- une ligne par tour\n  SET v_id = (SELECT MIN(id) FROM commande WHERE statut = 'EN_COURS');\nEND WHILE;\n-- Version ensembliste, en une fois :\n-- UPDATE commande SET statut = 'LIVREE' WHERE statut = 'EN_COURS';"
    },
    resultat: "3 tours de boucle, 3 UPDATE d'une ligne : CDE-1005, CDE-1006 puis CDE-1007 passent à LIVREE. La version ensembliste fait la même chose en une seule instruction.",
    piege: "Une boucle traite une ligne par tour : sur 100 000 commandes, des minutes au lieu d'une seconde (et sur Snowflake, chaque petite requête coûte). Si la condition n'avance jamais (un UPDATE qui ne change rien), la boucle ne s'arrête plus : il faut l'annuler à la main.",
    motsCles: ["boucle", "répéter", "tant que", "itération", "tour", "une ligne à la fois", "break", "continue", "loop", "recommencer", "ensembliste", "infinie", "lot", "while"],
    voirAussi: ["if-else", "begin-end", "curseur", "update", "rowcount"],
    module: "m13"
  },
  {
    id: "begin-end",
    nom: "BEGIN … END",
    type: "mot-clé",
    categorie: "Programmation",
    definition: "Regroupe plusieurs instructions en un seul bloc, par exemple après un IF ou un WHILE.",
    moteurs: {
      sqlserver: "`BEGIN … END` après `IF`, `ELSE`, `WHILE`, ou autour du corps d'une procédure ; ce n'est pas une transaction",
      snowflake: "`BEGIN … END;` : le bloc Snowflake Scripting (procédure, ou bloc lancé seul) ; hors bloc, `BEGIN;` seul ouvre une transaction",
      mysql: "`BEGIN … END` seulement dans une procédure, une fonction ou un trigger ; ailleurs, `BEGIN;` ouvre une transaction"
    },
    noms: ["BEGIN", "END"],
    exemple: "IF EXISTS (SELECT 1 FROM flux_edi WHERE statut = 'REJET')\nBEGIN\n  PRINT 'Des flux EDI sont rejetés';\n  SELECT id, type, motif FROM flux_edi WHERE statut = 'REJET' ORDER BY id;\nEND;",
    exemples: {
      snowflake: "BEGIN\n  LET res RESULTSET := (SELECT id, type, motif FROM flux_edi WHERE statut = 'REJET' ORDER BY id);\n  RETURN TABLE(res);\nEND;",
      mysql: "DELIMITER //\nCREATE PROCEDURE p_flux_rejetes()\nBEGIN   -- le bloc : seulement dans une procédure\n  SELECT id, type, motif FROM flux_edi WHERE statut = 'REJET' ORDER BY id;\nEND //\nDELIMITER ;\nCALL p_flux_rejetes();"
    },
    resultat: [["id", "type", "motif"], [3, "ORDERS", "EAN inconnu"], [6, "DESADV", "Quantité ≠ commande"]],
    piege: "`BEGIN … END` n'est pas une transaction : si la 2e instruction plante, la 1re reste faite. Pour « tout ou rien », c'est `BEGIN TRAN … COMMIT` ; et sur MySQL et Snowflake, `BEGIN;` seul (hors bloc) ouvre justement une transaction.",
    motsCles: ["bloc", "regrouper", "grouper", "plusieurs instructions", "begin", "end", "accolades", "corps", "ensemble", "séquence", "début", "fin"],
    voirAussi: ["if-else", "while", "begin-transaction", "create-procedure", "try-catch"],
    module: "m13"
  },
  {
    id: "try-catch",
    nom: "TRY … CATCH",
    type: "mot-clé",
    categorie: "Programmation",
    definition: "Attrape une erreur : si une instruction plante, le code saute dans le bloc prévu pour la gérer.",
    moteurs: {
      sqlserver: "`BEGIN TRY … END TRY BEGIN CATCH … END CATCH` ; détails : `ERROR_NUMBER()`, `ERROR_MESSAGE()`, `ERROR_LINE()`",
      snowflake: "Dans un bloc : `BEGIN … EXCEPTION WHEN OTHER THEN … END;` ; détails : `SQLCODE`, `SQLERRM`, `SQLSTATE`",
      mysql: "Dans une procédure : `DECLARE EXIT HANDLER FOR SQLEXCEPTION BEGIN … END;` en tête du bloc ; détails : `GET DIAGNOSTICS`"
    },
    noms: ["BEGIN TRY", "BEGIN CATCH", "EXCEPTION", "WHEN OTHER", "DECLARE HANDLER", "EXIT HANDLER", "ERROR_MESSAGE", "SQLERRM"],
    exemple: "BEGIN TRY\n  BEGIN TRAN;\n    UPDATE commande SET statut = 'LIVREE' WHERE num_cde = 'CDE-1005';\n    INSERT INTO facture VALUES (5, 'FA-2026-0402', 5, '2026-04-15', 318.00, 'EMISE');\n  COMMIT;\nEND TRY\n-- En cas d'erreur : tout annuler, puis renvoyer l'erreur\nBEGIN CATCH  IF @@TRANCOUNT > 0 ROLLBACK;  THROW;  END CATCH;",
    exemples: {
      snowflake: "BEGIN\n  BEGIN TRANSACTION;\n  UPDATE commande SET statut = 'LIVREE' WHERE num_cde = 'CDE-1005';\n  INSERT INTO facture VALUES (5, 'FA-2026-0402', 5, '2026-04-15', 318.00, 'EMISE');\n  COMMIT;\nEXCEPTION\n  WHEN OTHER THEN ROLLBACK; RAISE;   -- tout annuler, puis renvoyer l'erreur\nEND;",
      mysql: "-- Dans une procédure : le handler joue le rôle du CATCH\nDECLARE EXIT HANDLER FOR SQLEXCEPTION\n  BEGIN ROLLBACK; RESIGNAL; END;   -- tout annuler, puis renvoyer l'erreur\nSTART TRANSACTION;\nUPDATE commande SET statut = 'LIVREE' WHERE num_cde = 'CDE-1005';\nINSERT INTO facture VALUES (5, 'FA-2026-0402', 5, '2026-04-15', 318.00, 'EMISE');\nCOMMIT;"
    },
    resultat: "Tout va bien : CDE-1005 passe à LIVREE et FA-2026-0402 est créée. Si l'INSERT plante (une colonne obligatoire vide, par exemple), le CATCH annule aussi la livraison, puis renvoie l'erreur à l'appelant.",
    piege: "Un CATCH qui ne fait qu'un PRINT « avale » l'erreur : le job de nuit est vu comme réussi, et personne n'est prévenu. Finis toujours par `THROW;` (Snowflake : `RAISE;`, MySQL : `RESIGNAL;`), et sache que CATCH n'attrape pas une faute de nom de table dans le même bloc.",
    motsCles: ["erreur", "gérer", "gestion d'erreur", "attraper", "capturer", "exception", "try", "catch", "planter", "échec", "handler", "intercepter", "journaliser", "rattraper"],
    voirAussi: ["throw", "xact-abort", "rollback", "trancount", "begin-end"],
    module: "m13"
  },
  {
    id: "throw",
    nom: "THROW",
    type: "mot-clé",
    categorie: "Programmation",
    definition: "Déclenche une erreur, avec ton numéro et ton message : le traitement s'arrête et l'appelant est prévenu.",
    moteurs: {
      sqlserver: "`THROW 50001, 'message', 1;` (numéro ≥ 50000) ; `THROW;` seul, dans un CATCH, relance l'erreur d'origine ; plus ancien : `RAISERROR`",
      snowflake: "`DECLARE e EXCEPTION (-20001, 'message');` puis `RAISE e;` ; dans `EXCEPTION`, `RAISE;` seul relance l'erreur",
      mysql: "`SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'message';` ; dans un handler, `RESIGNAL;` relance l'erreur"
    },
    noms: ["RAISERROR", "RAISE", "SIGNAL", "RESIGNAL"],
    exemple: "DECLARE @cde_id INT = 4;   -- CDE-1004, une commande annulée\nIF EXISTS (SELECT 1 FROM commande WHERE id = @cde_id AND statut = 'ANNULEE')\n  THROW 50001, 'Commande annulée : facturation impossible', 1;\n-- … la suite (la facture) n'est jamais exécutée",
    exemples: {
      snowflake: "DECLARE\n  cde_annulee EXCEPTION (-20001, 'Commande annulée : facturation impossible');\n  nb INTEGER;\nBEGIN\n  SELECT COUNT(*) INTO :nb FROM commande WHERE id = 4 AND statut = 'ANNULEE';\n  IF (nb > 0) THEN RAISE cde_annulee; END IF;\n  -- … la suite (la facture) n'est jamais exécutée\nEND;",
      mysql: "-- Dans une procédure (p_cde_id : le paramètre, ici 4)\nIF EXISTS (SELECT 1 FROM commande WHERE id = p_cde_id AND statut = 'ANNULEE') THEN\n  SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Commande annulée : facturation impossible';\nEND IF;\n-- … la suite (la facture) n'est jamais exécutée"
    },
    resultat: "Erreur 50001, gravité 16 : « Commande annulée : facturation impossible ». Le lot s'arrête là : aucune facture n'est créée.",
    piege: "`THROW` exige un point-virgule à la fin de l'instruction d'avant : sans lui, erreur de syntaxe. Et préfère THROW à RAISERROR dans le code neuf : THROW respecte XACT_ABORT, RAISERROR non.",
    motsCles: ["erreur", "lever", "déclencher", "provoquer", "signaler", "arrêter", "stopper", "message", "raise", "signal", "raiserror", "exception", "personnalisée", "règle métier"],
    voirAussi: ["try-catch", "if-else", "rowcount", "xact-abort"],
    module: "m13"
  },
  {
    id: "create-procedure",
    nom: "CREATE PROCEDURE",
    type: "mot-clé",
    categorie: "Programmation",
    definition: "Enregistre un traitement dans la base, avec des paramètres, pour le relancer d'un simple appel.",
    moteurs: {
      sqlserver: "`CREATE OR ALTER PROCEDURE p_nom @param INT AS BEGIN … END;` (2016 SP1+) ; `SET NOCOUNT ON` en 1re ligne",
      snowflake: "`CREATE OR REPLACE PROCEDURE p_nom(param INT) RETURNS VARCHAR LANGUAGE SQL AS $$ … $$;` ; dans le SQL, un paramètre s'écrit `:param`",
      mysql: "`CREATE PROCEDURE p_nom(IN param INT) BEGIN … END`, entre `DELIMITER //` et `DELIMITER ;` ; pas de OR REPLACE : `DROP PROCEDURE IF EXISTS` avant"
    },
    noms: ["PROCEDURE", "CREATE PROC", "CREATE OR ALTER PROCEDURE", "CREATE OR REPLACE PROCEDURE", "DELIMITER"],
    exemple: "CREATE OR ALTER PROCEDURE p_facturer\n  @cde_id INT, @fact_id INT, @num_fact VARCHAR(14)\nAS BEGIN\n  SET NOCOUNT ON;\n  INSERT INTO facture (id, num_fact, cde_id, date_fact, montant_ht, statut)\n  SELECT @fact_id, @num_fact, id, CAST(GETDATE() AS DATE), montant_ht, 'EMISE'\n  FROM commande WHERE id = @cde_id;\nEND;",
    exemples: {
      snowflake: "CREATE OR REPLACE PROCEDURE p_facturer(p_cde_id INT, p_fact_id INT, p_num VARCHAR)\nRETURNS VARCHAR LANGUAGE SQL AS $$\nBEGIN\n  INSERT INTO facture (id, num_fact, cde_id, date_fact, montant_ht, statut)\n  SELECT :p_fact_id, :p_num, id, CURRENT_DATE, montant_ht, 'EMISE'\n  FROM commande WHERE id = :p_cde_id;\n  RETURN 'Facture créée';\nEND; $$;",
      mysql: "DELIMITER //\nCREATE PROCEDURE p_facturer(IN p_cde_id INT, IN p_fact_id INT, IN p_num VARCHAR(14))\nBEGIN\n  INSERT INTO facture (id, num_fact, cde_id, date_fact, montant_ht, statut)\n  SELECT p_fact_id, p_num, id, CURRENT_DATE, montant_ht, 'EMISE'\n  FROM commande WHERE id = p_cde_id;\nEND //\nDELIMITER ;"
    },
    resultat: "La procédure est enregistrée dans la base : rien n'est facturé tant qu'on ne l'appelle pas (voir la fiche EXEC).",
    piege: "`CREATE PROCEDURE` plante si la procédure existe déjà : le script de déploiement s'arrête au milieu. Écris `CREATE OR ALTER` (SQL Server), `CREATE OR REPLACE` (Snowflake) ou `DROP PROCEDURE IF EXISTS` juste avant (MySQL) ; et sur MySQL, préfixe les paramètres (`p_cde_id`) : un paramètre nommé comme une colonne prend sa place.",
    motsCles: ["procédure", "procédure stockée", "stored procedure", "créer", "enregistrer", "traitement", "paramètre", "réutiliser", "automatiser", "routine", "déployer", "delimiter", "stocker"],
    voirAussi: ["exec", "create-function", "declare", "try-catch", "begin-end"],
    module: "m13"
  },
  {
    id: "exec",
    nom: "EXEC",
    type: "mot-clé",
    categorie: "Programmation",
    definition: "Lance une procédure stockée, en lui donnant ses paramètres.",
    moteurs: {
      sqlserver: "`EXEC p_nom @param = valeur;` (ou `EXECUTE`) ; un paramètre `OUTPUT` doit aussi porter `OUTPUT` dans l'appel",
      snowflake: "Pas d'EXEC : `CALL p_nom(valeur);` ; par nom : `CALL p_nom(param => valeur);`",
      mysql: "Pas d'EXEC : `CALL p_nom(valeur);`, par position seulement ; `EXECUTE` y lance une requête préparée"
    },
    noms: ["EXECUTE", "CALL"],
    exemple: "EXEC p_facturer @cde_id = 5, @fact_id = 5, @num_fact = 'FA-2026-0402';\nSELECT num_fact, cde_id, montant_ht, statut FROM facture WHERE id = 5;",
    exemples: {
      snowflake: "CALL p_facturer(p_cde_id => 5, p_fact_id => 5, p_num => 'FA-2026-0402');\nSELECT num_fact, cde_id, montant_ht, statut FROM facture WHERE id = 5;",
      mysql: "CALL p_facturer(5, 5, 'FA-2026-0402');   -- par position : relis l'ordre\nSELECT num_fact, cde_id, montant_ht, statut FROM facture WHERE id = 5;"
    },
    resultat: [["num_fact", "cde_id", "montant_ht", "statut"], ["FA-2026-0402", 5, "318.00", "EMISE"]],
    piege: "Un appel par position (`EXEC p_facturer 5, 6, 'FA-2026-0402'`) se trompe en silence si quelqu'un inverse deux paramètres dans la procédure : la facture part sur la commande 6 au lieu de la 5. Nomme les paramètres (`@cde_id = 5`) : l'ordre ne compte plus, et une faute de nom donne une erreur.",
    motsCles: ["lancer", "exécuter", "appeler", "appel", "procédure", "call", "execute", "paramètre", "nommé", "run", "procédure stockée"],
    voirAussi: ["create-procedure", "sql-dynamique", "declare"],
    module: "m13"
  },
  {
    id: "create-function",
    nom: "CREATE FUNCTION",
    type: "mot-clé",
    categorie: "Programmation",
    definition: "Crée ta propre fonction : un calcul réutilisable dans les requêtes, qui renvoie une valeur ou une table.",
    moteurs: {
      sqlserver: "Scalaire : `RETURNS DECIMAL(10,2) AS BEGIN RETURN … END`, appelée avec le schéma (`dbo.f_ttc(…)`) ; table « inline » : `RETURNS TABLE AS RETURN (SELECT …)`",
      snowflake: "`CREATE FUNCTION f(x NUMBER) RETURNS NUMBER AS 'x * 1.2';` ; table : `RETURNS TABLE (…)`, appelée avec `TABLE(f(…))`",
      mysql: "Scalaire seulement : `CREATE FUNCTION f(x DECIMAL(10,2)) RETURNS DECIMAL(10,2) DETERMINISTIC RETURN …;` ; pas de fonction qui renvoie une table"
    },
    noms: ["UDF", "UDTF", "CREATE OR ALTER FUNCTION", "RETURNS TABLE"],
    exemple: "CREATE OR ALTER FUNCTION dbo.f_ttc (@ht DECIMAL(10,2))\nRETURNS DECIMAL(10,2)\nAS BEGIN RETURN ROUND(@ht * 1.20, 2); END;\nGO\n-- appel : le nom du schéma devant est obligatoire\nSELECT num_cde, montant_ht, dbo.f_ttc(montant_ht) AS montant_ttc\nFROM commande WHERE client_id = 1 ORDER BY num_cde;",
    exemples: {
      snowflake: "CREATE OR REPLACE FUNCTION f_ttc(ht NUMBER(10,2))\nRETURNS NUMBER(10,2)\nAS 'ROUND(ht * 1.20, 2)';\n\nSELECT num_cde, montant_ht, f_ttc(montant_ht) AS montant_ttc\nFROM commande WHERE client_id = 1 ORDER BY num_cde;",
      mysql: "CREATE FUNCTION f_ttc(p_ht DECIMAL(10,2))\nRETURNS DECIMAL(10,2) DETERMINISTIC   -- sans lui : erreur 1418\nRETURN ROUND(p_ht * 1.20, 2);\n\nSELECT num_cde, montant_ht, f_ttc(montant_ht) AS montant_ttc\nFROM commande WHERE client_id = 1 ORDER BY num_cde;"
    },
    resultat: [["num_cde", "montant_ht", "montant_ttc"], ["CDE-1001", "4780.00", "5736.00"], ["CDE-1003", "2385.00", "2862.00"], ["CDE-1007", "7950.00", "9540.00"]],
    piege: "Une fonction scalaire est appelée pour chaque ligne : dans un SELECT sur un million de lignes, c'est un million d'appels, sans parallélisme (SQL Server 2019+ l'intègre parfois à la requête, pas toujours). Pour renvoyer des lignes, préfère une fonction table « inline » (`RETURNS TABLE AS RETURN (SELECT …)`), traitée comme une vue avec paramètres.",
    motsCles: ["udf", "créer", "créer une fonction", "calcul", "réutiliser", "scalaire", "tvf", "fonction utilisateur", "perso", "renvoyer", "returns", "lent", "performance", "formule", "inline"],
    voirAussi: ["create-procedure", "cross-apply", "create-view", "round"],
    module: "m13"
  },
  {
    id: "sql-dynamique",
    nom: "sp_executesql",
    type: "mot-clé",
    categorie: "Programmation",
    definition: "Exécute une requête écrite dans un texte, construite pendant le traitement, avec des paramètres.",
    moteurs: {
      sqlserver: "`EXEC sp_executesql @sql, N'@s VARCHAR(10)', @s = valeur;` : les valeurs en paramètres ; un nom de table : `QUOTENAME(@table)`",
      snowflake: "Dans un bloc : `EXECUTE IMMEDIATE :texte USING (variable);` ; les `?` du texte reçoivent les valeurs",
      mysql: "`PREPARE s FROM @sql; EXECUTE s USING @v; DEALLOCATE PREPARE s;` ; les `?` du texte reçoivent les valeurs"
    },
    noms: ["SQL dynamique", "EXECUTE IMMEDIATE", "PREPARE", "EXEC (@sql)"],
    exemple: "DECLARE @statut VARCHAR(10) = 'EN_COURS';   -- saisi à l'écran\nDECLARE @sql NVARCHAR(200) =\n  N'SELECT num_cde, montant_ht FROM commande WHERE statut = @s ORDER BY montant_ht DESC';\nEXEC sp_executesql @sql, N'@s VARCHAR(10)', @s = @statut;",
    exemples: {
      snowflake: "DECLARE\n  v_statut VARCHAR DEFAULT 'EN_COURS';   -- saisi à l'écran\n  texte VARCHAR DEFAULT 'SELECT num_cde, montant_ht FROM commande WHERE statut = ? ORDER BY montant_ht DESC';\n  res RESULTSET;\nBEGIN\n  res := (EXECUTE IMMEDIATE :texte USING (v_statut));\n  RETURN TABLE(res);\nEND;",
      mysql: "SET @statut = 'EN_COURS';   -- saisi à l'écran\nSET @sql = 'SELECT num_cde, montant_ht FROM commande WHERE statut = ? ORDER BY montant_ht DESC';\nPREPARE s FROM @sql;\nEXECUTE s USING @statut;\nDEALLOCATE PREPARE s;"
    },
    resultat: [["num_cde", "montant_ht"], ["CDE-1007", "7950.00"], ["CDE-1006", "1290.00"], ["CDE-1005", "318.00"]],
    piege: "Coller une valeur saisie dans le texte (`'… WHERE statut = ''' + @statut + ''''`) ouvre la porte à l'injection SQL : avec la saisie `x' OR '1'='1`, la requête lit toutes les commandes. Passe toujours les valeurs en paramètres, et les noms de table par `QUOTENAME` + une liste autorisée.",
    motsCles: ["dynamique", "texte", "construire", "concaténer", "injection", "paramètre", "exécuter", "chaîne", "variable", "quotename", "execute immediate", "prepare", "sécurité", "critères"],
    voirAussi: ["exec", "declare", "concat", "create-procedure"],
    module: "m13"
  },
  {
    id: "rowcount",
    nom: "@@ROWCOUNT",
    type: "fonction",
    categorie: "Programmation",
    definition: "Donne le nombre de lignes touchées par la dernière instruction : modifiées, insérées, supprimées ou lues.",
    moteurs: {
      sqlserver: "`@@ROWCOUNT`, à lire juste après l'instruction ; `ROWCOUNT_BIG()` au-delà de 2 milliards de lignes",
      snowflake: "Dans un bloc : `SQLROWCOUNT` (lignes de la dernière modification) ; aussi `SQLFOUND` et `SQLNOTFOUND`",
      mysql: "`ROW_COUNT()` ; pour un UPDATE, il compte (par défaut) les lignes vraiment changées : une ligne déjà à la bonne valeur compte 0"
    },
    noms: ["ROW_COUNT", "SQLROWCOUNT", "ROWCOUNT_BIG", "SQLFOUND", "SQLNOTFOUND"],
    exemple: "UPDATE commande SET statut = 'LIVREE' WHERE num_cde = 'CDE-1009';   -- numéro reçu en EDI\nIF @@ROWCOUNT = 0\n  THROW 50002, 'Commande inconnue : CDE-1009', 1;",
    exemples: {
      snowflake: "DECLARE\n  cde_inconnue EXCEPTION (-20002, 'Commande inconnue : CDE-1009');\nBEGIN\n  UPDATE commande SET statut = 'LIVREE' WHERE num_cde = 'CDE-1009';   -- numéro reçu en EDI\n  IF (SQLROWCOUNT = 0) THEN RAISE cde_inconnue; END IF;\nEND;",
      mysql: "-- Dans une procédure\nUPDATE commande SET statut = 'LIVREE' WHERE num_cde = 'CDE-1009';   -- numéro reçu en EDI\nIF ROW_COUNT() = 0 THEN\n  SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Commande inconnue : CDE-1009';\nEND IF;"
    },
    resultat: "0 ligne modifiée : CDE-1009 n'existe pas. L'erreur 50002 arrête le traitement, au lieu d'un « succès » silencieux.",
    piege: "`@@ROWCOUNT` change après presque chaque instruction (`PRINT`, `COMMIT`, `SET @x = …`) : lu une ligne trop tard, il ne compte plus ton UPDATE ; range-le tout de suite dans une variable. Sur MySQL, `ROW_COUNT()` donne aussi 0 pour CDE-1001, déjà LIVREE : « rien changé » ne veut pas dire « introuvable ».",
    motsCles: ["nombre de lignes", "lignes modifiées", "combien", "affectées", "touchées", "vérifier", "contrôle", "rowcount", "row_count", "aucune ligne", "introuvable", "trouvé", "modifiées", "supprimées"],
    voirAussi: ["update", "throw", "if-else", "while"],
    module: "m13"
  },
  {
    id: "curseur",
    nom: "DECLARE CURSOR",
    type: "mot-clé",
    categorie: "Programmation",
    definition: "Parcourt le résultat d'une requête ligne par ligne, pour traiter chaque ligne à part.",
    moteurs: {
      sqlserver: "`DECLARE c CURSOR LOCAL FAST_FORWARD FOR SELECT …`, puis `OPEN`, `FETCH NEXT … INTO`, `CLOSE`, `DEALLOCATE`",
      snowflake: "Dans un bloc : `c CURSOR FOR SELECT …` (dans `DECLARE`), puis `FOR ligne IN c DO … END FOR;`",
      mysql: "Dans une procédure : `DECLARE c CURSOR FOR SELECT …` et un handler `NOT FOUND` ; puis `OPEN`, `FETCH … INTO`, `CLOSE`"
    },
    noms: ["CURSOR", "@@FETCH_STATUS", "FAST_FORWARD", "DEALLOCATE"],
    exemple: "DECLARE @mt DECIMAL(10,2), @total DECIMAL(10,2) = 0;\nDECLARE c CURSOR LOCAL FAST_FORWARD FOR SELECT montant_ht FROM commande WHERE client_id = 1;\nOPEN c;  FETCH NEXT FROM c INTO @mt;\nWHILE @@FETCH_STATUS = 0 BEGIN\n  SET @total = @total + @mt;\n  FETCH NEXT FROM c INTO @mt;\nEND;\nCLOSE c;  DEALLOCATE c;  SELECT @total AS total_client_1;",
    exemples: {
      snowflake: "DECLARE\n  total NUMBER(10,2) DEFAULT 0;\n  c CURSOR FOR SELECT montant_ht FROM commande WHERE client_id = 1;\nBEGIN\n  FOR ligne IN c DO total := total + ligne.montant_ht; END FOR;\n  RETURN total;   -- 15115.00\nEND;",
      mysql: "-- Dans une procédure\nDECLARE v_mt, v_total DECIMAL(10,2) DEFAULT 0;\nDECLARE fini INT DEFAULT 0;\nDECLARE c CURSOR FOR SELECT montant_ht FROM commande WHERE client_id = 1;\nDECLARE CONTINUE HANDLER FOR NOT FOUND SET fini = 1;\nOPEN c;  FETCH c INTO v_mt;\nWHILE NOT fini DO  SET v_total = v_total + v_mt;  FETCH c INTO v_mt;  END WHILE;\nCLOSE c;  SELECT v_total AS total_client_1;"
    },
    resultat: [["total_client_1"], ["15115.00"]],
    piege: "Un curseur traite une ligne à la fois : sur 100 000 lignes, des minutes au lieu d'une seconde. Ici, `SELECT SUM(montant_ht) FROM commande WHERE client_id = 1` donne 15115.00 d'un coup : garde le curseur pour une action vraiment unitaire (un fichier par client…).",
    motsCles: ["curseur", "une ligne à la fois", "ligne par ligne", "parcourir", "boucle", "fetch", "unitaire", "itérer", "chaque ligne", "lent", "ensembliste", "traiter", "row by row"],
    voirAussi: ["while", "sum", "update", "declare"],
    module: "m13"
  },
  {
    id: "print",
    nom: "PRINT",
    type: "mot-clé",
    categorie: "Programmation",
    definition: "Affiche un message dans l'onglet Messages, pour suivre un script étape par étape.",
    moteurs: {
      sqlserver: "`PRINT 'texte';` (onglet Messages de SSMS) ; affichage immédiat : `RAISERROR('texte', 0, 1) WITH NOWAIT;`",
      snowflake: "Pas de PRINT : `RETURN 'texte';` à la fin du bloc, ou `SYSTEM$LOG('info', 'texte');` vers la table d'événements (à activer)",
      mysql: "Pas de PRINT : `SELECT 'texte' AS message;` (un résultat de plus)"
    },
    noms: ["SYSTEM$LOG", "SYSTEM$LOG_INFO", "RAISERROR WITH NOWAIT"],
    exemple: "DECLARE @nb INT = (SELECT COUNT(*) FROM flux_edi WHERE statut = 'REJET');\nPRINT 'Flux EDI rejetés : ' + CAST(@nb AS VARCHAR(10));",
    exemples: {
      snowflake: "DECLARE\n  nb INTEGER;\nBEGIN\n  SELECT COUNT(*) INTO :nb FROM flux_edi WHERE statut = 'REJET';\n  SYSTEM$LOG('info', 'Flux EDI rejetés : ' || nb);   -- table d'événements\n  RETURN 'Flux EDI rejetés : ' || nb;\nEND;",
      mysql: "SET @nb = (SELECT COUNT(*) FROM flux_edi WHERE statut = 'REJET');\nSELECT CONCAT('Flux EDI rejetés : ', @nb) AS message;"
    },
    resultat: "Onglet Messages : « Flux EDI rejetés : 2 ».",
    piege: "Les PRINT d'un long traitement arrivent souvent tous à la fin (mémoire tampon) : pour suivre en direct, `RAISERROR('…', 0, 1) WITH NOWAIT`. Et un job de nuit n'a pas d'onglet Messages : écris le suivi dans une table de log.",
    motsCles: ["afficher", "message", "écrire", "suivre", "suivi", "debug", "déboguer", "log", "journal", "console", "progression", "étape", "print", "avancement"],
    voirAussi: ["throw", "concat", "cast", "declare"],
    module: "m13"
  }
]);
