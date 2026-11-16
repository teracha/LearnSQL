// Mots réservés SQL (outil « Mots réservés », docs/mots-reserves.md) : les règles d'un nom (identifiant) sur chaque
// moteur, pour « Vérifier un nom ». Valeurs PROVISOIRES écrites par le superviseur : l'expert les vérifie sur les pages
// officielles (sources ci-dessous) et les corrige.
// motif : expression régulière ES5 (pas de \p{…}) d'un nom écrit SANS guillemets ; echapper : comment l'écrire quand
// même ({nom} = le nom tapé).
LEARNSQL.motsRegles = {
  sqlserver: {
    longueurMax: 128,
    motif: "^[A-Za-z_\\u00C0-\\u024F][A-Za-z0-9_@$#\\u00C0-\\u024F]*$",
    regle: "Commence par une lettre ou _ ; ensuite des lettres, des chiffres, _, @, $ ou #. Pas d'espace.",
    echapper: "[{nom}]",
    echapperTexte: "Entre crochets, ou entre guillemets droits (option QUOTED_IDENTIFIER, active par défaut).",
    casse: "Majuscules et minuscules : selon la collation de la base, le plus souvent sans différence.",
    source: "https://learn.microsoft.com/en-us/sql/relational-databases/databases/database-identifiers"
  },
  snowflake: {
    longueurMax: 255,
    motif: "^[A-Za-z_][A-Za-z0-9_$]*$",
    regle: "Commence par une lettre (sans accent) ou _ ; ensuite des lettres, des chiffres, _ ou $.",
    echapper: "\"{NOM}\"",
    echapperTexte: "Entre guillemets droits. Attention : entre guillemets, la casse compte : \"ORDER\" et \"order\" sont deux noms différents.",
    casse: "Sans guillemets, le nom est rangé en MAJUSCULES.",
    source: "https://docs.snowflake.com/en/sql-reference/identifiers-syntax"
  },
  mysql: {
    longueurMax: 64,
    motif: "^(?![0-9]+$)[A-Za-z0-9_$\\u0080-\\uFFFF]+$",
    regle: "Lettres, chiffres, _ ou $ ; peut commencer par un chiffre, mais pas n'être fait que de chiffres.",
    echapper: "`{nom}`",
    echapperTexte: "Entre accents graves (ou entre guillemets droits avec le mode ANSI_QUOTES).",
    casse: "Noms de tables : la casse peut compter selon le serveur (lower_case_table_names) ; noms de colonnes : non.",
    source: "https://dev.mysql.com/doc/refman/8.4/en/identifiers.html"
  }
};
