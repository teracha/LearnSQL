// Astuces SQL, famille « Compléter » (docs/astuces.md). Chaque résultat est vérifié sur docs/base-exemple.sql.
LEARNSQL.astuces = (LEARNSQL.astuces || []).concat([
  {
    id: "zeros-devant",
    titre: "Compléter un numéro avec des zéros devant",
    famille: "Compléter",
    besoins: ["sortir un numéro client avec des zéros devant", "un numéro sur 6 chiffres avec des zéros à gauche", "transformer 42 en 000042"],
    essais: ["je voudrais un numero de facture sur 8 caractere avec des 0", "remplir à gauche avec des zéros", "zerofill"],
    moteurs: {
      sqlserver: "`RIGHT('000000' + CAST(id AS VARCHAR(6)), 6)`, ou `FORMAT(id, 'D6')` (plus lent sur beaucoup de lignes)",
      snowflake: "`LPAD(id::VARCHAR, 6, '0')`",
      mysql: "`LPAD(id, 6, '0')` ; l'attribut `ZEROFILL` est obsolète depuis MySQL 8.0.17"
    },
    exemple: "SELECT num_cde,\n       RIGHT('000000' + CAST(id AS VARCHAR(6)), 6) AS num_6\nFROM commande\nWHERE id <= 3\nORDER BY id;",
    exemples: {
      snowflake: "SELECT num_cde, LPAD(id::VARCHAR, 6, '0') AS num_6\nFROM commande\nWHERE id <= 3\nORDER BY id;",
      mysql: "SELECT num_cde, LPAD(id, 6, '0') AS num_6\nFROM commande\nWHERE id <= 3\nORDER BY id;"
    },
    resultat: [["num_cde", "num_6"], ["CDE-1001", "000001"], ["CDE-1002", "000002"], ["CDE-1003", "000003"]],
    piege: "Un nombre plus long que la largeur est coupé, sans erreur : `RIGHT` garde la fin du nombre, `LPAD` en garde le début. Choisis une largeur assez grande, et contrôle la longueur.",
    pratique: "Garde le numéro en nombre dans la table, et ajoute les zéros seulement à l'affichage ou à l'export (fichier EDI, étiquette) : un nombre se trie et se compare bien.",
    motsCles: ["zéro", "zeros", "0", "compléter", "gauche", "devant", "padding", "largeur", "longueur fixe", "numéro", "code", "format"],
    voirAussi: ["lpad", "right", "format", "cast", "zerofill"]
  }
]);
