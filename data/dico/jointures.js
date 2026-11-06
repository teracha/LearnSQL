// Super dico SQL — catégorie « Jointures » (étape 2, 05/11/2026). Format : docs/dico.md.
// Résultats calculés avec SQLite sur docs/base-exemple.sql (FULL OUTER JOIN : SQLite 3.45 ; CROSS APPLY TOP (1) ->
// sous-requête MAX(date_cde) ; QUALIFY -> ROW_NUMBER dans une sous-requête) et relancés sur un vrai serveur MySQL 8.0.46
// (copie ventes_a) : scripts verif_a.py et mysql_a.py (scratchpad dico/a).
// Sources (vérifiées le 05/11/2026) :
// - SQL Server, learn.microsoft.com/sql/t-sql/queries/from-transact-sql : types de jointure (INNER par défaut ; un filtre
//   dans le ON ou dans le WHERE change le résultat d'une jointure externe ; CROSS JOIN ; auto-jointure), APPLY (CROSS : pas
//   de ligne si la sous-requête est vide ; OUTER : une ligne quand même) ; pas de USING ni de NATURAL JOIN dans la syntaxe.
// - Snowflake, docs.snowflake.com/en/sql-reference : constructs/join (ON, USING, NATURAL, FULL OUTER), constructs/join-
//   lateral (LATERAL), user-guide/querying-subqueries (« The LIMIT / FETCH clause is allowed only in uncorrelated scalar
//   subqueries » : pas de TOP 1 dans un LATERAL lié à la ligne, d'où QUALIFY), constructs/qualify.
// - MySQL 8, dev.mysql.com/doc/refman/8.0/en : join.html (JOIN, CROSS JOIN et INNER JOIN équivalents ; NATURAL ; USING ;
//   pas de FULL OUTER JOIN), lateral-derived-tables.html (LATERAL en 8.0.14). Testé sur le serveur : JOIN sans ON = produit
//   cartésien (24 lignes), FULL OUTER JOIN refusé (erreur 1064), « flux_edi FULL JOIN commande » sans alias : FULL pris
//   pour un alias de flux_edi (avertissement 4119) ; JOIN simple (5 lignes) si le ON n'écrit pas flux_edi.col, sinon
//   erreur 1054 (retesté par le testeur t1), LATERAL avec LIMIT 1, LEFT JOIN LATERAL … ON TRUE, USING, NATURAL
//   JOIN facture / flux_edi = 0 ligne.
// docs.snowflake.com n'était pas joignable depuis la session : vérifié par extraits de recherche.
LEARNSQL.dico = (LEARNSQL.dico || []).concat([
  {
    id: "inner-join",
    nom: "INNER JOIN",
    type: "mot-clé",
    categorie: "Jointures",
    definition: "Relie deux tables et garde seulement les lignes qui ont une correspondance des deux côtés.",
    moteurs: {
      sqlserver: "`FROM a INNER JOIN b ON b.cle = a.cle` ; `JOIN` seul = `INNER JOIN`",
      snowflake: "Même écriture ; `JOIN … USING (col)` si la colonne a le même nom des deux côtés",
      mysql: "Même écriture ; attention : `JOIN` sans `ON` ne plante pas, il fait un produit cartésien"
    },
    noms: ["JOIN", "INNER"],
    exemple: "SELECT f.id, f.type, f.statut, co.num_cde\nFROM flux_edi AS f\nINNER JOIN commande AS co ON co.id = f.cde_id\nWHERE f.type = 'ORDERS'\nORDER BY f.id;",
    resultat: [["id", "type", "statut", "num_cde"], [1, "ORDERS", "OK", "CDE-1001"], [2, "ORDERS", "OK", "CDE-1003"], [5, "ORDERS", "OK", "CDE-1007"]],
    piege: "Le flux 3, rejeté (EAN inconnu), n'a pas de commande : l'INNER JOIN le fait disparaître, sans erreur, et le suivi des rejets EDI devient faux. Pour garder toutes les lignes de gauche, écris `LEFT JOIN`.",
    pratique: "Dans un ERP multi-sociétés, joins sur toute la clé : `ON l.societe = c.societe AND l.num_cde = c.num_cde`. Avec le numéro seul, une ligne se relie aussi à la commande de même numéro d'une autre société.",
    motsCles: ["jointure", "joindre", "relier", "lier", "associer", "correspondance", "rapprocher", "croiser", "deux tables", "commun", "join", "inner", "liaison", "clé", "combiner"],
    voirAussi: ["left-join", "full-outer-join", "cross-join", "using", "sum"],
    module: "m05"
  },
  {
    id: "left-join",
    nom: "LEFT JOIN",
    type: "mot-clé",
    categorie: "Jointures",
    definition: "Relie deux tables en gardant toutes les lignes de la table de gauche, même sans correspondance.",
    moteurs: {
      sqlserver: "`FROM a LEFT JOIN b ON …` : toutes les lignes de a ; sans correspondance, les colonnes de b sont NULL ; `RIGHT JOIN` fait l'inverse",
      snowflake: "Même écriture (`LEFT` ou `RIGHT [OUTER] JOIN`)",
      mysql: "Même écriture (`LEFT` ou `RIGHT [OUTER] JOIN`)"
    },
    noms: ["LEFT OUTER JOIN", "RIGHT JOIN", "RIGHT OUTER JOIN", "OUTER JOIN"],
    exemple: "-- Clients sans aucune commande\nSELECT cl.code, cl.nom, co.num_cde\nFROM client AS cl\nLEFT JOIN commande AS co ON co.client_id = cl.id\nWHERE co.id IS NULL;",
    resultat: [["code", "nom", "num_cde"], ["C005", "Pool & Garden", null], ["C007", "Camping Les Flots", null]],
    piege: "Un filtre sur la table de droite mis dans le `WHERE` (`WHERE co.statut = 'EN_COURS'`) retire les clients sans commande : le LEFT JOIN devient un INNER JOIN, sans erreur. Mets-le dans le `ON` : `ON co.client_id = cl.id AND co.statut = 'EN_COURS'`.",
    pratique: "Avant de dire qu'un code importé manque dans l'ERP (`LEFT JOIN … IS NULL`), enlève les espaces de fin (`TRIM`) : SQL Server les ignore avec `=`, pas Snowflake ni MySQL 8 (collation par défaut).",
    motsCles: ["garder", "tous", "manquant", "absent", "aucun", "orphelin", "facultatif", "optionnel", "left", "outer", "externe", "gauche", "droite", "right", "anti-jointure", "correspondance", "clients sans commande", "garder toutes les lignes"],
    voirAussi: ["inner-join", "full-outer-join", "is-null", "coalesce", "exists"],
    module: "m05"
  },
  {
    id: "full-outer-join",
    nom: "FULL OUTER JOIN",
    type: "mot-clé",
    categorie: "Jointures",
    definition: "Relie deux tables en gardant toutes les lignes des deux côtés, avec ou sans correspondance.",
    moteurs: {
      sqlserver: "`FROM a FULL OUTER JOIN b ON …` : toutes les lignes des deux côtés ; `FULL JOIN` = `FULL OUTER JOIN`",
      snowflake: "Même écriture",
      mysql: "Pas de FULL OUTER JOIN : `LEFT JOIN`, puis `UNION ALL` des lignes de droite sans correspondance ; piège : dans `a FULL JOIN b`, MySQL prend `FULL` pour un alias de a : erreur 1054 si le `ON` écrit `a.col`, sinon un simple JOIN, sans erreur"
    },
    noms: ["FULL JOIN", "FULL OUTER"],
    exemple: "WITH f AS (SELECT id, cde_id FROM flux_edi WHERE type = 'ORDERS'),\n     co AS (SELECT id, num_cde FROM commande WHERE canal = 'EDI')\nSELECT f.id AS flux, co.num_cde\nFROM f\nFULL OUTER JOIN co ON co.id = f.cde_id\nORDER BY flux;",
    exemples: {
      mysql: "WITH f AS (SELECT id, cde_id FROM flux_edi WHERE type = 'ORDERS'),\n     co AS (SELECT id, num_cde FROM commande WHERE canal = 'EDI')\nSELECT f.id AS flux, co.num_cde FROM f LEFT JOIN co ON co.id = f.cde_id\nUNION ALL\nSELECT NULL, co.num_cde FROM co LEFT JOIN f ON f.cde_id = co.id WHERE f.id IS NULL\nORDER BY flux;"
    },
    resultat: [["flux", "num_cde"], [1, "CDE-1001"], [2, "CDE-1003"], [3, null], [5, "CDE-1007"]],
    piege: "Un `WHERE` sur un seul côté, après la jointure (`WHERE co.canal = 'EDI'`), retire les lignes où ce côté est NULL : le flux 3 disparaît, et le rapprochement dit « tout va bien ». Filtre chaque côté avant de joindre, comme ici avec `WITH`.",
    pratique: "Pour un rapprochement ERP / EDI, ajoute une colonne d'état : `CASE WHEN f.id IS NULL THEN 'Manque EDI' WHEN co.id IS NULL THEN 'Manque ERP' ELSE 'OK' END`. Tu comptes ensuite les écarts par état.",
    motsCles: ["rapprocher", "rapprochement", "comparer", "réconcilier", "réconciliation", "manquants", "les deux côtés", "écarts", "full", "outer", "complet", "tout garder", "erp", "edi", "contrôle", "deux sources"],
    voirAussi: ["left-join", "union-all", "coalesce", "inner-join"],
    module: "m05"
  },
  {
    id: "cross-join",
    nom: "CROSS JOIN",
    type: "mot-clé",
    categorie: "Jointures",
    definition: "Associe chaque ligne d'une table à chaque ligne de l'autre : toutes les combinaisons.",
    moteurs: {
      sqlserver: "`FROM a CROSS JOIN b` : chaque ligne de a avec chaque ligne de b (8 articles × 3 dépôts = 24 lignes)",
      snowflake: "Même écriture",
      mysql: "Même écriture ; `JOIN` sans `ON` fait aussi un produit cartésien"
    },
    noms: [],
    exemple: "-- Le stock du filtre à sable dans chaque dépôt, zéros compris\nSELECT a.code, d.nom AS depot, COALESCE(s.qte, 0) AS qte\nFROM article AS a\nCROSS JOIN depot AS d\nLEFT JOIN stock_depot AS s ON s.article_id = a.id AND s.depot_id = d.id\nWHERE a.code = 'FIL-14' ORDER BY d.id;",
    resultat: [["code", "depot", "qte"], ["FIL-14", "Lyon", 8], ["FIL-14", "Toulouse", 4], ["FIL-14", "Nantes", 0]],
    piege: "Un produit cartésien involontaire (`FROM a, b` sans condition, ou un `ON` oublié en MySQL) multiplie les lignes : 10 000 × 10 000 = 100 millions. Écris `CROSS JOIN` en toutes lettres, pour montrer que c'est voulu.",
    pratique: "Pour appliquer un même paramètre à toutes les lignes (date d'arrêté, taux de TVA), mets-le dans une table d'une ligne et croise : `CROSS JOIN (SELECT CAST('2026-03-31' AS DATE) AS date_arrete) AS p`.",
    motsCles: ["combinaisons", "toutes les combinaisons", "produit cartésien", "cartésien", "multiplier", "croiser", "grille", "chaque", "tous les", "cross", "matrice", "générer", "paires", "calendrier"],
    voirAussi: ["inner-join", "left-join", "coalesce"],
    module: "m05"
  },
  {
    id: "auto-jointure",
    nom: "Auto-jointure",
    type: "mot-clé",
    categorie: "Jointures",
    definition: "Joint une table à elle-même, avec deux alias, pour comparer ses lignes entre elles.",
    moteurs: {
      sqlserver: "Pas de mot-clé : la même table deux fois, avec deux alias : `FROM client AS a JOIN client AS b ON …`",
      snowflake: "Même écriture (deux alias)",
      mysql: "Même écriture (deux alias)"
    },
    noms: ["SELF JOIN", "SELF-JOIN"],
    exemple: "-- Fiches client en double : même SIREN\nSELECT a.code, b.code AS doublon, a.nom, a.siren\nFROM client AS a\nJOIN client AS b ON b.siren = a.siren AND a.id < b.id;",
    resultat: [["code", "doublon", "nom", "siren"], ["C002", "C006", "Piscines Dumont", "423456789"]],
    piege: "Avec `a.id <> b.id`, chaque paire sort deux fois (C002-C006, puis C006-C002) : le rapport compte deux fois trop de doublons. Écris `a.id < b.id` ; et les SIREN vides (NULL) ne se joignent jamais, ils ne sortent pas.",
    pratique: "Pour repérer deux tarifs qui se chevauchent, joins la table à elle-même : `ON b.article_id = a.article_id AND a.id < b.id AND a.debut <= COALESCE(b.fin, '9999-12-31') AND b.debut <= COALESCE(a.fin, '9999-12-31')` ; `COALESCE` garde les tarifs sans date de fin.",
    motsCles: ["même table", "elle-même", "deux alias", "self", "paires", "même siren", "comparer", "hiérarchie", "responsable", "manager", "parent", "autojointure", "auto jointure", "auto"],
    voirAussi: ["inner-join", "left-join", "lag-lead", "cte-recursive"],
    module: "m05"
  },
  {
    id: "cross-apply",
    nom: "CROSS APPLY",
    type: "mot-clé",
    categorie: "Jointures",
    definition: "Exécute une sous-requête pour chaque ligne de la table de gauche, avec les valeurs de cette ligne.",
    moteurs: {
      sqlserver: "`CROSS APPLY (sous-requête)` : comme un INNER JOIN ; `OUTER APPLY` garde les lignes sans résultat, comme un LEFT JOIN",
      snowflake: "Pas d'APPLY : `, LATERAL (sous-requête)` ou `LATERAL FLATTEN(…)` ; un `LIMIT` est refusé dans une sous-requête liée : « la dernière par client » se fait avec `QUALIFY`",
      mysql: "Pas d'APPLY : `, LATERAL (sous-requête)` (8.0.14+) ; `LEFT JOIN LATERAL (…) ON TRUE` remplace OUTER APPLY"
    },
    noms: ["OUTER APPLY", "LATERAL", "APPLY"],
    exemple: "-- La dernière commande de chaque client\nSELECT cl.code, d.num_cde, d.date_cde\nFROM client AS cl\nCROSS APPLY (SELECT TOP (1) co.num_cde, co.date_cde FROM commande AS co\n             WHERE co.client_id = cl.id ORDER BY co.date_cde DESC) AS d\nORDER BY cl.code;",
    exemples: {
      snowflake: "-- La dernière commande de chaque client\nSELECT cl.code, co.num_cde, co.date_cde\nFROM client AS cl\nJOIN commande AS co ON co.client_id = cl.id\nQUALIFY ROW_NUMBER() OVER (PARTITION BY cl.id ORDER BY co.date_cde DESC) = 1\nORDER BY cl.code;",
      mysql: "-- La dernière commande de chaque client\nSELECT cl.code, d.num_cde, d.date_cde\nFROM client AS cl,\n     LATERAL (SELECT co.num_cde, co.date_cde FROM commande AS co\n              WHERE co.client_id = cl.id ORDER BY co.date_cde DESC LIMIT 1) AS d\nORDER BY cl.code;"
    },
    resultat: [["code", "num_cde", "date_cde"], ["C001", "CDE-1007", "2026-04-07"], ["C002", "CDE-1006", "2026-04-03"], ["C003", "CDE-1004", "2026-03-12"], ["C004", "CDE-1005", "2026-04-01"], ["C006", "CDE-1008", "2026-04-10"]],
    piege: "CROSS APPLY fait disparaître les clients sans commande (C005, C007), sans erreur, comme un INNER JOIN. Pour les garder avec des NULL, écris `OUTER APPLY` (MySQL : `LEFT JOIN LATERAL (…) ON TRUE`).",
    pratique: "Sur SQL Server, `CROSS APPLY (SELECT c.montant_ht * 1.2 AS ttc) AS x` donne un nom à un calcul : `x.ttc` sert ensuite dans le `WHERE` et le `GROUP BY`, sans recopier la formule.",
    motsCles: ["apply", "lateral", "pour chaque ligne", "sous-requête", "dernière", "dernier", "top par groupe", "corrélée", "fonction table", "outer apply", "chaque client", "récent"],
    voirAussi: ["inner-join", "left-join", "row-number", "qualify", "flatten", "top"],
    module: "m05"
  },
  {
    id: "using",
    nom: "USING",
    type: "mot-clé",
    categorie: "Jointures",
    definition: "Raccourci de jointure quand la colonne commune porte le même nom dans les deux tables.",
    moteurs: {
      sqlserver: "Pas de USING : `JOIN b ON b.cde_id = a.cde_id`",
      snowflake: "`JOIN b USING (cde_id)` ; plusieurs colonnes : `USING (societe, num_cde)`",
      mysql: "`JOIN b USING (cde_id)` (même écriture)"
    },
    noms: ["NATURAL JOIN", "JOIN USING"],
    exemple: "SELECT f.cde_id, f.num_fact, e.type, e.statut\nFROM facture AS f\nJOIN flux_edi AS e ON e.cde_id = f.cde_id\nORDER BY f.cde_id, e.id;",
    exemples: {
      snowflake: "SELECT cde_id, f.num_fact, e.type, e.statut\nFROM facture AS f\nJOIN flux_edi AS e USING (cde_id)\nORDER BY cde_id, e.id;",
      mysql: "SELECT cde_id, f.num_fact, e.type, e.statut\nFROM facture AS f\nJOIN flux_edi AS e USING (cde_id)\nORDER BY cde_id, e.id;"
    },
    resultat: [["cde_id", "num_fact", "type", "statut"], [1, "FA-2026-0301", "ORDERS", "OK"], [1, "FA-2026-0301", "INVOIC", "OK"], [3, "FA-2026-0303", "ORDERS", "OK"]],
    piege: "Ne prends pas `NATURAL JOIN` pour un raccourci : il joint sur toutes les colonnes de même nom (ici `id`, `cde_id` et `statut`) et renvoie 0 ligne, sans erreur. Et une requête Snowflake avec USING plante sur SQL Server : écris `ON`.",
    pratique: "Sur Snowflake et MySQL, après `LEFT JOIN … USING (cde_id)`, cherche les orphelins sur une colonne de droite (`WHERE e.id IS NULL`) : `cde_id IS NULL` regarde seulement la valeur de gauche, pas s'il existe une ligne à droite.",
    motsCles: ["using", "même nom", "colonne commune", "raccourci", "natural", "naturelle", "jointure", "simplifier", "join using", "nom identique", "abréger", "clé commune"],
    voirAussi: ["inner-join", "left-join", "from"],
    module: "m05"
  }
]);
