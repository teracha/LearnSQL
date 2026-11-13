// Dico SQL, catégorie « Types de données » (1/2) : entiers, décimaux exacts, nombres approchés, booléens,
// et les familles « Modifier un type » et « Convertir un type » (docs/dico.md, « Types de données »).
// Sources : learn.microsoft.com (types SQL Server), docs.snowflake.com (data-types-*), dev.mysql.com (refman 8.4).
LEARNSQL.dico = (LEARNSQL.dico || []).concat([
  {
    id: "int",
    nom: "INT",
    type: "type",
    categorie: "Types de données",
    famille: "Entiers",
    definition: "Un nombre entier, sans virgule, sur 4 octets : de −2 147 483 648 à 2 147 483 647.",
    moteurs: {
      sqlserver: "`INT` (4 octets), de −2 147 483 648 à 2 147 483 647",
      snowflake: "`INT` est un synonyme de `NUMBER(38,0)` : jusqu'à 38 chiffres, sans décimale",
      mysql: "`INT` (4 octets) ; `INT UNSIGNED` va de 0 à 4 294 967 295"
    },
    apercu: { sqlserver: "4 octets, ± 2,1 milliards", snowflake: "= NUMBER(38,0)", mysql: "4 octets ; UNSIGNED : 0 à 4,2 milliards" },
    noms: ["INTEGER"],
    exemple: "CREATE TABLE stock_depot (\n  article_id INT NOT NULL,\n  depot_id   INT NOT NULL,\n  qte        INT NOT NULL\n);",
    piege: "Sur SQL Server, une division de deux entiers garde un entier : `7 / 2` donne 3. Snowflake et MySQL donnent 3.5. Pour garder les décimales sur SQL Server : `7 / 2.0`, ou un `CAST`.",
    pratique: "Un code fait de chiffres (code postal, SIRET, numéro de facture) se range en texte (`VARCHAR`) : en INT, 01000 perdrait son zéro, et on ne calcule jamais dessus.",
    motsCles: ["entier", "nombre entier", "integer", "int", "quantité", "compteur", "sans virgule", "4 octets", "type numérique"],
    voirAussi: ["bigint", "smallint", "decimal", "types-nombre", "division"]
  }
]);
