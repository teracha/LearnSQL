// Super dico SQL — catégorie « Filtres » (étape 1, 05/11/2026). Format : docs/dico.md.
// Résultats calculés avec SQLite sur docs/base-exemple.sql : script de contrôle verif.py (scratchpad dico).
// Sources (vérifiées le 05/11/2026) :
// - SQL Server, learn.microsoft.com/sql/t-sql : queries/where-transact-sql, queries/search-condition-transact-sql,
//   language-elements/and-transact-sql, or-transact-sql, not-transact-sql (priorité NOT > AND > OR),
//   language-elements/in-transact-sql, between-transact-sql (bornes incluses), like-transact-sql (% _ [ ] [^ ], ESCAPE,
//   collation), queries/is-null-transact-sql, language-elements/null-and-unknown-transact-sql.
// - Snowflake, docs.snowflake.com/en/sql-reference : functions/like (casse exacte, pas d'échappement par défaut, ESCAPE),
//   functions/ilike, functions/ilike_any, functions/regexp_like, data-types-logical (BOOLEAN, WHERE actif).
// - MySQL 8, dev.mysql.com/doc/refman/8.0/en : string-comparison-functions.html (LIKE, \ = échappement par défaut, ESCAPE,
//   casse selon la collation), case-sensitivity.html et charset-unicode-sets.html (utf8mb4_0900_ai_ci : sans casse ni
//   accents), logical-operators.html (&&, ||, ! dépréciés depuis 8.0.17), comparison-operators.html (IN, BETWEEN, IS NULL).
// docs.snowflake.com et dev.mysql.com n'étaient pas joignables depuis la session : vérifiés par extraits de recherche.
LEARNSQL.dico = (LEARNSQL.dico || []).concat([
  {
    id: "where",
    nom: "WHERE",
    type: "mot-clé",
    categorie: "Filtres",
    definition: "Garde seulement les lignes pour lesquelles la condition est vraie.",
    moteurs: {
      sqlserver: "`WHERE condition` ; un booléen (type BIT) se teste : `WHERE actif = 1`",
      snowflake: "`WHERE condition` ; un BOOLEAN se teste seul : `WHERE actif`",
      mysql: "`WHERE condition` ; `WHERE actif` marche aussi (0 = faux)"
    },
    noms: [],
    exemple: "SELECT num_cde, statut, montant_ht\nFROM commande\nWHERE montant_ht > 2000;",
    resultat: [["num_cde", "statut", "montant_ht"], ["CDE-1001", "LIVREE", "4780.00"], ["CDE-1003", "LIVREE", "2385.00"], ["CDE-1007", "EN_COURS", "7950.00"]],
    piege: "WHERE travaille ligne par ligne, avant tout calcul de groupe : `WHERE montant_ht > AVG(montant_ht)` plante. Compare à une sous-requête : `> (SELECT AVG(montant_ht) FROM commande)`.",
    pratique: "Commence par `WHERE 1 = 1`, puis une condition par ligne : `AND statut = 'OK'`. En test, désactive n'importe laquelle avec `--` en début de ligne, sans casser la requête (MySQL veut un espace après `--`).",
    motsCles: ["filtrer", "filtre", "condition", "garder", "exclure", "critère", "restreindre", "sélectionner", "seulement", "lignes", "chercher", "conditions"],
    voirAussi: ["and-or-not", "in", "between", "like", "is-null"],
    module: "m02"
  },
  {
    id: "and-or-not",
    nom: "AND, OR, NOT",
    type: "mot-clé",
    categorie: "Filtres",
    definition: "Combinent des conditions : AND exige les deux, OR l'une ou l'autre, NOT inverse.",
    moteurs: {
      sqlserver: "`AND`, `OR`, `NOT` ; AND passe avant OR, comme × avant +",
      snowflake: "`AND`, `OR`, `NOT` (même ordre de priorité)",
      mysql: "`AND`, `OR`, `NOT` ; évite `&&`, `||` et `!`, d'anciens synonymes dépréciés"
    },
    noms: ["AND", "OR", "NOT"],
    exemple: "SELECT code, nom, ville, type\nFROM client\nWHERE (ville = 'Lyon' OR ville = 'Grenoble')\n  AND type = 'PRO';",
    resultat: [["code", "nom", "ville", "type"], ["C002", "Piscines Dumont", "Grenoble", "PRO"], ["C006", "Piscines Dumont", "Lyon", "PRO"]],
    piege: "Sans parenthèses, `ville = 'Lyon' OR ville = 'Grenoble' AND type = 'PRO'` se lit « Lyon, ou (Grenoble et PRO) » : AquaBleu, une grande surface de Lyon, entre dans le rapport. Mets des parenthèses dès que tu mélanges AND et OR.",
    pratique: "Pour un filtre facultatif dans un rapport (SQL Server), écris `WHERE (@canal IS NULL OR canal = @canal)` : sans valeur choisie, toutes les lignes sortent. Sur une grosse table, ajoute `OPTION (RECOMPILE)`.",
    motsCles: ["et", "ou", "non", "plusieurs", "conditions", "combiner", "cumuler", "priorité", "parenthèses", "inverser", "sauf", "logique", "contraire", "booléen", "exclure"],
    voirAussi: ["where", "in", "is-null"],
    module: "m02"
  },
  {
    id: "in",
    nom: "IN",
    type: "mot-clé",
    categorie: "Filtres",
    definition: "Teste si une valeur fait partie d'une liste : plus court qu'une série de OR.",
    moteurs: {
      sqlserver: "`col IN ('A', 'B')` ou `col IN (SELECT …)` ; une seule colonne à la fois",
      snowflake: "`col IN ('A', 'B')` ; deux colonnes aussi : `(a, b) IN (SELECT …)`",
      mysql: "`col IN ('A', 'B')` ; deux colonnes aussi : `(a, b) IN (SELECT …)`"
    },
    noms: ["NOT IN"],
    exemple: "SELECT code, nom, ville\nFROM client\nWHERE ville IN ('Lyon', 'Grenoble');",
    resultat: [["code", "nom", "ville"], ["C001", "AquaBleu", "Lyon"], ["C002", "Piscines Dumont", "Grenoble"], ["C006", "Piscines Dumont", "Lyon"]],
    piege: "Avec `NOT IN (SELECT …)`, un seul NULL dans la liste vide tout le résultat, sans erreur : le rapport « commandes sans flux EDI » sort vide. Écris `NOT EXISTS`, ou ajoute `WHERE … IS NOT NULL` dans la sous-requête.",
    pratique: "Avec des milliers de valeurs dans `IN (…)`, SQL Server peut refuser la requête (erreurs 8623 ou 8632). Mets les valeurs dans une table, puis `IN (SELECT …)`.",
    motsCles: ["liste", "parmi", "plusieurs", "valeurs", "appartient", "appartenir", "ensemble", "dans", "exclure", "série", "inclus", "codes", "multiple", "membre"],
    voirAussi: ["and-or-not", "where", "is-null", "between"],
    module: "m02"
  },
  {
    id: "between",
    nom: "BETWEEN",
    type: "mot-clé",
    categorie: "Filtres",
    definition: "Teste si une valeur est entre deux bornes, les deux bornes comprises.",
    moteurs: {
      sqlserver: "`col BETWEEN a AND b`, pareil que `col >= a AND col <= b` ; la petite borne d'abord",
      snowflake: "`col BETWEEN a AND b` (même règle)",
      mysql: "`col BETWEEN a AND b` (même règle)"
    },
    noms: ["NOT BETWEEN"],
    exemple: "SELECT num_cde, montant_ht\nFROM commande\nWHERE montant_ht BETWEEN 1290 AND 4780;",
    resultat: [["num_cde", "montant_ht"], ["CDE-1001", "4780.00"], ["CDE-1002", "1290.00"], ["CDE-1003", "2385.00"], ["CDE-1006", "1290.00"]],
    piege: "Sur une colonne date + heure, `BETWEEN '20260301' AND '20260331'` s'arrête le 31 mars à minuit : la commande du 31 à 14 h disparaît. Écris `>= '20260301' AND < '20260401'`.",
    pratique: "Pour un contrôle d'import, `NOT BETWEEN` repère les valeurs impossibles : `WHERE taux_tva NOT BETWEEN 0 AND 20` liste les lignes à corriger. Les taux vides n'y sortent pas : ajoute `OR taux_tva IS NULL`.",
    motsCles: ["entre", "intervalle", "plage", "bornes", "fourchette", "compris", "inclus", "période", "minimum", "maximum", "range", "dates", "montants"],
    voirAussi: ["where", "in", "and-or-not", "dateadd"],
    module: "m02"
  },
  {
    id: "like",
    nom: "LIKE",
    type: "mot-clé",
    categorie: "Filtres",
    definition: "Cherche un motif dans un texte : % remplace une suite de caractères, _ un seul.",
    moteurs: {
      sqlserver: "`col LIKE 'CHL%'` ; classes `[0-9]`, `[^0-9]` ; casse selon la collation (souvent ignorée)",
      snowflake: "`col LIKE 'CHL%'` ; la casse compte (`ILIKE` l'ignore) ; pas de classes `[ ]` : `REGEXP_LIKE`",
      mysql: "`col LIKE 'CHL%'` ; casse ignorée par défaut ; `\\` y échappe déjà % et _"
    },
    noms: ["NOT LIKE", "ESCAPE"],
    exemple: "SELECT code, libelle, prix_tarif\nFROM article\nWHERE code LIKE 'CHL%';",
    resultat: [["code", "libelle", "prix_tarif"], ["CHL-5", "Chlore lent 5 kg", "39.90"], ["CHL-25", "Chlore lent 25 kg", "159.00"]],
    piege: "Dans `LIKE 'FA_2026%'`, le `_` est un joker : il trouve aussi 'FA-2026-0301'. Pour chercher un vrai _ ou %, échappe-le : `LIKE 'FA!_2026%' ESCAPE '!'` (marche sur les trois moteurs).",
    pratique: "Avant un export CSV séparé par des points-virgules, cherche les libellés qui en contiennent : `WHERE libelle LIKE '%;%'`. Sans guillemets autour des champs, ces lignes auraient une colonne de trop.",
    motsCles: ["chercher", "rechercher", "contient", "commence", "termine", "motif", "joker", "partie", "texte", "début", "fin", "ressemble", "wildcard", "pattern", "trouver"],
    voirAussi: ["ilike", "charindex", "left", "where"],
    module: "m02"
  },
  {
    id: "ilike",
    nom: "ILIKE",
    type: "mot-clé",
    categorie: "Filtres",
    definition: "Comme LIKE, mais sans tenir compte des majuscules et des minuscules.",
    moteurs: {
      sqlserver: "Pas de ILIKE : `LIKE` suit la collation, souvent déjà sans casse (`_CI_`) ; sinon `UPPER(col) LIKE 'CHLORE%'`",
      snowflake: "`col ILIKE 'chlore%'` ; plusieurs motifs : `ILIKE ANY ('chl%', 'ph%')`",
      mysql: "Pas de ILIKE : `LIKE` ignore déjà la casse avec la collation par défaut (`utf8mb4_0900_ai_ci`)"
    },
    noms: ["ILIKE ANY", "NOT ILIKE"],
    exemple: "-- Collation sans casse (_CI_) : 'chlore' trouve 'Chlore'\nSELECT code, libelle\nFROM article\nWHERE libelle LIKE 'chlore%';",
    exemples: {
      snowflake: "SELECT code, libelle\nFROM article\nWHERE libelle ILIKE 'chlore%';"
    },
    resultat: [["code", "libelle"], ["CHL-5", "Chlore lent 5 kg"], ["CHL-25", "Chlore lent 25 kg"]],
    piege: "Une requête migrée de SQL Server vers Snowflake : `LIKE 'chlore%'` ne trouve plus 'Chlore lent 5 kg', sans erreur. Sur Snowflake, écris `ILIKE`, ou `UPPER(libelle) LIKE 'CHLORE%'`.",
    pratique: "Sur SQL Server, la collation de la colonne décide : `_CI` ignore la casse, `_AI` ignore les accents. Vois-la dans `INFORMATION_SCHEMA.COLUMNS` (colonne `COLLATION_NAME`). MySQL (`_ai_ci` par défaut) ignore les deux : `LIKE '%electrique%'` trouve « électrique ».",
    motsCles: ["majuscules", "minuscules", "casse", "ignorer", "insensible", "sensible", "chercher", "motif", "snowflake", "case", "insensitive", "collation", "capitales"],
    voirAussi: ["like", "upper-lower", "where"],
    module: "m02"
  },
  {
    id: "is-null",
    nom: "IS NULL",
    type: "mot-clé",
    categorie: "Filtres",
    definition: "Teste si une case est vide (NULL) ; IS NOT NULL teste qu'elle est remplie.",
    moteurs: {
      sqlserver: "`col IS NULL`, `col IS NOT NULL` ; jamais `= NULL`",
      snowflake: "`col IS NULL`, `col IS NOT NULL` (même règle)",
      mysql: "`col IS NULL`, `col IS NOT NULL` (même règle)"
    },
    noms: ["IS NOT NULL"],
    exemple: "-- Les clients hors Lyon, ville vide comprise\nSELECT code, nom, ville\nFROM client\nWHERE ville <> 'Lyon' OR ville IS NULL;",
    resultat: [["code", "nom", "ville"], ["C002", "Piscines Dumont", "Grenoble"], ["C003", "Bleu Lagon", "Nice"], ["C004", "Hydro Sud", "Montpellier"], ["C005", "Pool & Garden", "Genève"], ["C007", "Camping Les Flots", null]],
    piege: "`WHERE siren = NULL` renvoie 0 ligne, sans erreur : NULL n'est égal à rien, pas même à NULL. Et `ville <> 'Lyon'` seul oublie Camping Les Flots, dont la ville est vide.",
    pratique: "Selon l'outil de chargement, une case vide d'un fichier arrive en NULL ou en texte vide (''). Pour attraper les deux, et les cases faites d'espaces : `WHERE ville IS NULL OR TRIM(ville) = ''`.",
    motsCles: ["vide", "manquant", "absent", "renseigné", "rempli", "case", "valeur", "inconnu", "nulle", "trou", "manque", "empty", "missing", "renseigner"],
    voirAussi: ["coalesce", "nullif", "is-distinct-from", "where", "in"],
    module: "m02"
  }
]);
