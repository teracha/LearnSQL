// Super dico SQL — catégorie « Logique » (étape 1, 05/11/2026). Format : docs/dico.md.
// Résultats calculés avec SQLite sur docs/base-exemple.sql (IIF -> iif de SQLite) : script de contrôle verif.py
// (scratchpad dico).
// Sources (vérifiées le 05/11/2026) :
// - SQL Server, learn.microsoft.com/sql/t-sql : language-elements/case-transact-sql (premier WHEN vrai, NULL sans ELSE,
//   type de plus haute priorité), functions/logical-functions-iif-transact-sql (raccourci de CASE).
// - Snowflake, docs.snowflake.com/en/sql-reference/functions : case, iff (condition FALSE ou NULL -> 2e valeur) ;
//   pas de IIF (les guides de migration SnowConvert traduisent IIF en IFF).
// - MySQL 8, dev.mysql.com/doc/refman/8.0/en/flow-control-functions.html : CASE, IF(expr1, expr2, expr3) (expr3 si
//   expr1 vaut 0 ou NULL) ; pas de IIF.
// docs.snowflake.com et dev.mysql.com n'étaient pas joignables depuis la session : vérifiés par extraits de recherche.
LEARNSQL.dico = (LEARNSQL.dico || []).concat([
  {
    id: "case",
    nom: "CASE",
    type: "mot-clé",
    categorie: "Logique",
    definition: "Choisit une valeur selon des conditions lues dans l'ordre : si ceci, alors cela, sinon autre chose.",
    moteurs: {
      sqlserver: "`CASE WHEN condition THEN a ELSE b END`, ou `CASE col WHEN 'X' THEN a END`",
      snowflake: "Même écriture",
      mysql: "Même écriture"
    },
    noms: ["CASE WHEN"],
    exemple: "SELECT num_cde, montant_ht,\n       CASE WHEN montant_ht >= 2000 THEN 'Grosse'\n            WHEN montant_ht >= 500 THEN 'Moyenne'\n            ELSE 'Petite' END AS taille\nFROM commande\nWHERE statut = 'EN_COURS';",
    resultat: [["num_cde", "montant_ht", "taille"], ["CDE-1005", "318.00", "Petite"], ["CDE-1006", "1290.00", "Moyenne"], ["CDE-1007", "7950.00", "Grosse"]],
    piege: "Le premier WHEN vrai gagne : si `WHEN montant_ht >= 500` passe avant `>= 2000`, « Grosse » ne sort jamais. Et sans ELSE, un cas oublié donne NULL, qui tombe dans « (vide) » dans Power BI.",
    pratique: "Pour un tableau croisé (une colonne par canal), mets CASE dans SUM : `SUM(CASE WHEN canal = 'EDI' THEN montant_ht ELSE 0 END) AS ca_edi`, puis la même chose pour WEB et TEL.",
    motsCles: ["si", "alors", "sinon", "condition", "conditionnel", "cas", "selon", "catégorie", "tranche", "classer", "traduire", "libellé", "switch", "if", "else", "when"],
    voirAussi: ["iif", "coalesce", "nullif", "order-by"],
    module: "m03"
  },
  {
    id: "iif",
    nom: "IIF",
    type: "fonction",
    categorie: "Logique",
    definition: "Raccourci de CASE pour une seule condition : une valeur si c'est vrai, une autre sinon.",
    moteurs: {
      sqlserver: "`IIF(condition, si_vrai, si_faux)`",
      snowflake: "Pas de IIF : `IFF(condition, si_vrai, si_faux)`, avec deux F",
      mysql: "Pas de IIF : `IF(condition, si_vrai, si_faux)`"
    },
    noms: ["IFF", "IF"],
    exemple: "SELECT code, stock,\n       IIF(stock > 0, 'En stock', 'Rupture') AS dispo\nFROM article\nWHERE famille = 'FILTRATION';",
    exemples: {
      snowflake: "SELECT code, stock,\n       IFF(stock > 0, 'En stock', 'Rupture') AS dispo\nFROM article\nWHERE famille = 'FILTRATION';",
      mysql: "SELECT code, stock,\n       IF(stock > 0, 'En stock', 'Rupture') AS dispo\nFROM article\nWHERE famille = 'FILTRATION';"
    },
    resultat: [["code", "stock", "dispo"], ["FIL-14", 12, "En stock"], ["POMP-1", 0, "Rupture"]],
    piege: "Avec un NULL, la condition n'est pas vraie : IIF prend la branche « sinon », sans prévenir. `IIF(ville = 'Lyon', 'Lyon', 'Autre')` range Camping Les Flots, ville vide, dans « Autre ».",
    pratique: "Au-delà de deux cas, écris un seul CASE avec plusieurs WHEN : des IIF imbriqués deviennent illisibles, et SQL Server en refuse plus de 10 niveaux.",
    motsCles: ["si", "alors", "sinon", "condition", "raccourci", "iff", "if", "vrai", "faux", "test", "oui", "non", "booléen", "ternaire", "choix"],
    voirAussi: ["case", "coalesce", "is-null"],
    module: "m03"
  }
]);
