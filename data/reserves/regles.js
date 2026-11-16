// Mots réservés SQL (outil « Mots réservés », docs/mots-reserves.md) : les règles d'un nom (identifiant) sur chaque
// moteur, pour « Vérifier un nom ».
// motif : expression régulière ES5 (pas de \p{…}) d'un nom écrit SANS guillemets ; echapper : comment l'écrire quand
// même ({nom} = le nom tapé, {NOM} = en majuscules). Les textes passent par fmt() : `…` = police code.
// Vérifié par l'expert SQL le 16/11/2026, sur les pages officielles :
// - SQL Server, learn.microsoft.com/en-us/sql/relational-databases/databases/database-identifiers : 1 à 128 caractères
//   (116 pour une table #temporaire) ; 1er caractère : une lettre (Unicode 3.2), _, @ (variable) ou # (# : table
//   temporaire, à éviter pour le reste) ; ensuite lettres, chiffres, @, $, #, _ ; ni espace, ni signe spécial ; entouré
//   de [ ] ou de " " (avec QUOTED_IDENTIFIER, « the default for most connections ») ; casse : celle de la collation de
//   la base. Le motif refuse @ et # en tête (un nom de table ou de colonne normal), et ne prend que les lettres latines
//   de Unicode 3.2 : U+00C0-00D6, U+00D8-00F6, U+00F8-0220, U+0222-0233 (calcul : Python unicodedata.ucd_3_2_0 ;
//   × et ÷ ne sont pas des lettres). Les autres alphabets (grec, cyrillique…) sont permis par SQL Server, mais pas par
//   le motif : la page dit alors « à entourer », ce qui marche aussi.
// - Snowflake, docs.snowflake.com/en/sql-reference/identifiers-syntax : sans guillemets, une lettre A-Z, a-z ou _ au
//   début, puis lettres, chiffres 0-9, _ et $, sans caractère étendu ni espace ; rangé et lu en MAJUSCULES ; entre
//   guillemets, la casse est gardée ("order" ≠ ORDER) ; 255 caractères au plus, avec ou sans guillemets.
// - MySQL 8.4, dev.mysql.com/doc/refman/8.4/en : identifiers.html (sans guillemets : [0-9a-zA-Z$_] et U+0080 à U+FFFF ;
//   pas de caractère supplémentaire ; un chiffre au début, mais pas que des chiffres ; $ au début déprécié ; nom entre
//   ` `, ou " " avec ANSI_QUOTES ; éviter 1e…), identifier-length.html (64 caractères pour une table, une colonne, une
//   base), identifier-case-sensitivity.html (colonnes : jamais sensibles à la casse ; tables et bases : selon
//   lower_case_table_names, 0 sous Unix, 1 sous Windows, 2 sous macOS ; conseil : tout en minuscules).
//   Essayé sur un vrai serveur MySQL 8.0.46 : refusés 123, 007, 1e3, 2E5x, 0x41, 0xAB, 0b01, « nom client », 65
//   caractères (erreur 1059) ; acceptés 1client, 1event, 0X41, 0x4g, 0xab_c, société, prix€, 64 caractères ; $prix
//   accepté avec l'avertissement 1681 (déprécié). Le motif refuse donc aussi un nom qui commence par des chiffres puis
//   e et un chiffre (lu comme un nombre : 1e3), 0x + chiffres hexadécimaux, 0b + 0 et 1, et le $ en tête.
LEARNSQL.motsRegles = {
  sqlserver: {
    longueurMax: 128,
    motif: "^[A-Za-z_\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u0220\\u0222-\\u0233][A-Za-z0-9_@$#\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u0220\\u0222-\\u0233]*$",
    regle: "Commence par une lettre (accents permis) ou _. Ensuite : lettres, chiffres, _, @, $ ou #. Pas d'espace. Un nom qui commence par # désigne une table temporaire : pour une table normale, commence par une lettre.",
    echapper: "[{nom}]",
    echapperTexte: "Entre crochets. Les guillemets droits marchent aussi, si l'option QUOTED_IDENTIFIER est active (le cas le plus courant).",
    casse: "La casse suit la collation de la base. En général (collation _CI_, comme French_CI_AS), elle ne compte pas : Commande = commande.",
    source: "https://learn.microsoft.com/en-us/sql/relational-databases/databases/database-identifiers"
  },
  snowflake: {
    longueurMax: 255,
    motif: "^[A-Za-z_][A-Za-z0-9_$]*$",
    regle: "Commence par une lettre ou _. Ensuite : lettres, chiffres, _ ou $. Pas d'accent, pas d'espace.",
    echapper: "\"{NOM}\"",
    echapperTexte: "Entre guillemets droits, en MAJUSCULES. Entre guillemets, la casse compte : `\"order\"` et `\"ORDER\"` sont deux noms différents.",
    casse: "Sans guillemets, le nom est rangé en MAJUSCULES : commande, Commande et COMMANDE sont le même nom.",
    source: "https://docs.snowflake.com/en/sql-reference/identifiers-syntax"
  },
  mysql: {
    longueurMax: 64,
    motif: "^(?![0-9]+$)(?![0-9]+[eE][0-9])(?!0x[0-9A-Fa-f]+$)(?!0b[01]+$)(?!\\$)[A-Za-z0-9_$\\u0080-\\uD7FF\\uE000-\\uFFFF]+$",
    regle: "Lettres (accents permis), chiffres, _ ou $. Peut commencer par un chiffre, mais ne doit pas ressembler à un nombre (123, 1e3). Pas d'espace. Pas de $ au début : c'est obsolète (MySQL l'accepte encore, avec un avertissement).",
    echapper: "`{nom}`",
    echapperTexte: "Entre accents graves, le signe ` (AltGr + 7, puis Espace, sur un clavier français). Avec le mode ANSI_QUOTES, aussi entre guillemets droits.",
    casse: "Colonnes : la casse ne compte pas. Tables et bases : elle compte sous Linux, pas sous Windows (réglage lower_case_table_names). Écris tout en minuscules.",
    source: "https://dev.mysql.com/doc/refman/8.4/en/identifiers.html"
  }
};
