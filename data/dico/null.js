// Super dico SQL — catégorie « NULL » (étape 1, 05/11/2026). Format : docs/dico.md.
// Résultats calculés avec SQLite sur docs/base-exemple.sql : script de contrôle verif.py (scratchpad dico).
// ISNULL coupe la valeur de secours au type du 1er argument (siren CHAR(9) -> 'Non rense') : pas d'équivalent SQLite,
// calculé à la main (9 premiers caractères), deux fois (SQLite substr et Python).
// Sources (vérifiées le 05/11/2026) :
// - SQL Server, learn.microsoft.com/sql/t-sql : language-elements/coalesce-transact-sql (type du résultat, comparaison
//   avec ISNULL), functions/isnull-transact-sql (« replacement_value can be truncated »), language-elements/
//   nullif-transact-sql, queries/is-distinct-from-transact-sql (SQL Server 2022), language-elements/divide-transact-sql
//   (division par zéro = erreur).
// - Snowflake, docs.snowflake.com/en/sql-reference : expressions-conditional (COALESCE, IFNULL, NVL, NVL2, NULLIF,
//   NULLIFZERO, EQUAL_NULL, IS [NOT] DISTINCT FROM ; pas de ISNULL), functions/ifnull (alias NVL), functions/equal_null.
//   Guide SnowConvert SQL Server : ISNULL -> NVL.
// - MySQL 8, dev.mysql.com/doc/refman/8.0/en : flow-control-functions.html (IFNULL, NULLIF), comparison-operators.html
//   (ISNULL(expr) rend 1 ou 0 ; <=> égalité qui accepte NULL), arithmetic-functions.html (division par zéro = NULL).
// docs.snowflake.com et dev.mysql.com n'étaient pas joignables depuis la session : vérifiés par extraits de recherche.
LEARNSQL.dico = (LEARNSQL.dico || []).concat([
  {
    id: "coalesce",
    nom: "COALESCE",
    type: "fonction",
    categorie: "NULL",
    definition: "Renvoie la première valeur non vide de la liste : remplace un NULL par une valeur de secours.",
    moteurs: {
      sqlserver: "`COALESCE(a, b, …)` : autant de valeurs que tu veux",
      snowflake: "`COALESCE(a, b, …)` (même écriture)",
      mysql: "`COALESCE(a, b, …)` (même écriture)"
    },
    noms: [],
    exemple: "SELECT id, COALESCE(motif, 'Aucun') AS motif\nFROM flux_edi\nWHERE type = 'ORDERS';",
    resultat: [["id", "motif"], [1, "Aucun"], [2, "Aucun"], [3, "EAN inconnu"], [5, "Aucun"]],
    piege: "Sur SQL Server et Snowflake, des types différents plantent : avec `COALESCE(ville, 0)`, le moteur essaie de convertir 'Lyon' en nombre (MySQL, lui, rend du texte). Donne un remplaçant du même type : `COALESCE(ville, '')`.",
    pratique: "Pour prendre la première valeur remplie parmi plusieurs colonnes, enchaîne-les dans l'ordre de préférence : `COALESCE(email_compta, email_contact, 'à compléter')` donne l'adresse d'envoi des factures.",
    motsCles: ["remplacer", "vide", "défaut", "secours", "valeur", "premier", "rempli", "manquant", "remplacement", "zéro", "nvl", "ifnull", "absent", "rien"],
    voirAussi: ["isnull", "nullif", "is-null", "concat"],
    module: "m02"
  },
  {
    id: "isnull",
    nom: "ISNULL",
    type: "fonction",
    categorie: "NULL",
    definition: "Remplace un NULL par une valeur de secours ; deux arguments seulement.",
    moteurs: {
      sqlserver: "`ISNULL(col, secours)` ; le résultat prend le type du 1er argument",
      snowflake: "Pas de ISNULL : `NVL(col, secours)` ou `IFNULL(col, secours)`",
      mysql: "`IFNULL(col, secours)` ; attention : `ISNULL(col)` existe, mais il teste seulement (1 ou 0)"
    },
    noms: ["IFNULL", "NVL"],
    exemple: "SELECT code, siren,\n       ISNULL(siren, 'Non renseigné') AS avec_isnull,\n       COALESCE(siren, 'Non renseigné') AS avec_coalesce\nFROM client\nWHERE siren IS NULL;",
    exemples: {
      snowflake: "SELECT code, siren,\n       NVL(siren, 'Non renseigné') AS avec_nvl,\n       COALESCE(siren, 'Non renseigné') AS avec_coalesce\nFROM client\nWHERE siren IS NULL;",
      mysql: "SELECT code, siren,\n       IFNULL(siren, 'Non renseigné') AS avec_ifnull,\n       COALESCE(siren, 'Non renseigné') AS avec_coalesce\nFROM client\nWHERE siren IS NULL;"
    },
    resultat: [["code", "siren", "avec_isnull", "avec_coalesce"], ["C003", null, "Non rense", "Non renseigné"], ["C005", null, "Non rense", "Non renseigné"]],
    piege: "ISNULL prend le type du 1er argument : sur `siren CHAR(9)`, SQL Server coupe 'Non renseigné' en 'Non rense', sans erreur. COALESCE garde le texte entier : préfère-le.",
    pratique: "Sur SQL Server, `SELECT ISNULL(code, '') AS code INTO copie FROM …` crée une colonne NOT NULL ; avec COALESCE, elle accepte NULL. Pratique pour poser ensuite une clé primaire sur `code`.",
    motsCles: ["remplacer", "vide", "défaut", "secours", "valeur", "nvl", "ifnull", "remplacement", "zéro", "manquant", "absent", "rien", "null"],
    voirAussi: ["coalesce", "nullif", "is-null"],
    module: "m02"
  },
  {
    id: "nullif",
    nom: "NULLIF",
    type: "fonction",
    categorie: "NULL",
    definition: "Renvoie NULL quand les deux valeurs sont égales, sinon la première : évite la division par zéro.",
    moteurs: {
      sqlserver: "`NULLIF(a, b)` ; une division par zéro, elle, plante",
      snowflake: "`NULLIF(a, b)` ; raccourci : `NULLIFZERO(x)` ; une division par zéro plante",
      mysql: "`NULLIF(a, b)` ; une division par zéro donne NULL dans un SELECT, mais plante dans un INSERT ou un UPDATE (mode strict par défaut)"
    },
    noms: ["NULLIFZERO"],
    exemple: "-- Une alerte seulement sur les flux rejetés\nSELECT id, statut, NULLIF(statut, 'OK') AS alerte\nFROM flux_edi\nWHERE type = 'ORDERS';",
    resultat: [["id", "statut", "alerte"], [1, "OK", null], [2, "OK", null], [3, "REJET", "REJET"], [5, "OK", null]],
    piege: "`montant / qte` plante (« division par zéro ») dès qu'une ligne a qte = 0, et tout le rapport s'arrête. Écris `montant / NULLIF(qte, 0)` : la ligne donne NULL au lieu de planter.",
    pratique: "Pour compter sans CASE les articles en stock, écris `COUNT(NULLIF(stock, 0))` : les stocks à 0 deviennent NULL, et COUNT ne compte pas les NULL.",
    motsCles: ["division", "zéro", "diviser", "erreur", "vide", "transformer", "égal", "éviter", "protéger", "annuler", "vider", "planter", "null"],
    voirAussi: ["coalesce", "division", "is-null", "charindex"],
    module: "m02"
  },
  {
    id: "is-distinct-from",
    nom: "IS DISTINCT FROM",
    type: "mot-clé",
    categorie: "NULL",
    definition: "Compare deux valeurs en traitant deux NULL comme égaux : la réponse est toujours vrai ou faux.",
    moteurs: {
      sqlserver: "`a IS [NOT] DISTINCT FROM b` (2022+) ; avant, « égal » s'écrit `a = b OR (a IS NULL AND b IS NULL)`",
      snowflake: "`a IS [NOT] DISTINCT FROM b`, ou `EQUAL_NULL(a, b)` pour « égal »",
      mysql: "Pas de IS DISTINCT FROM : `a <=> b` veut dire « égal, NULL compris » ; « différent » : `NOT (a <=> b)`"
    },
    noms: ["IS NOT DISTINCT FROM", "EQUAL_NULL", "<=>"],
    exemple: "-- Tous les flux, sauf ceux rejetés pour « EAN inconnu »\nSELECT id, statut, motif\nFROM flux_edi\nWHERE motif IS DISTINCT FROM 'EAN inconnu';",
    exemples: {
      mysql: "-- Tous les flux, sauf ceux rejetés pour « EAN inconnu »\nSELECT id, statut, motif\nFROM flux_edi\nWHERE NOT (motif <=> 'EAN inconnu');"
    },
    resultat: [["id", "statut", "motif"], [1, "OK", null], [2, "OK", null], [4, "OK", null], [5, "OK", null], [6, "REJET", "Quantité ≠ commande"]],
    piege: "`WHERE motif <> 'EAN inconnu'` ne garde que le flux 6 : les 4 flux au motif vide disparaissent, sans erreur. `IS DISTINCT FROM` les garde ; sur SQL Server avant 2022, ajoute `OR motif IS NULL`.",
    pratique: "Pour trouver les fiches changées entre deux imports, compare chaque colonne avec `IS DISTINCT FROM` (SQL Server 2022+, Snowflake) : passer de NULL à 'Lyon' compte comme un changement. MySQL : `NOT (a <=> b)`.",
    motsCles: ["comparer", "égalité", "différent", "changement", "détecter", "modification", "égal", "vides", "comparaison", "distinct", "null", "sûr", "nulls", "equal_null"],
    voirAussi: ["is-null", "coalesce", "and-or-not"],
    module: "m02"
  }
]);
