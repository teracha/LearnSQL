// Dico SQL, catégorie « Types de données » (1/2) : entiers, décimaux exacts, nombres approchés, booléens, et la
// famille « Modifier un type » (docs/dico.md, « Les types de données »). Les nouvelles fiches « Convertir un type »
// (::, TO_CHAR, TO_NUMBER, TO_DATE, PARSE, conversion implicite) sont dans conversion.js, catégorie Conversion, avec
// CAST, CONVERT, TRY_CAST et FORMAT ; IDENTITY, DEFAULT et NOT NULL (« Modifier un type ») restent dans tables.js.
// Vérification (13/11/2026) : SQLite sur docs/base-exemple.sql, avec Python Decimal et struct quand SQLite calcule
// autrement (décimal exact, REAL sur 4 octets) : script scratchpad types-astuces/nombres/verif/verif.py ; et le VRAI
// serveur MySQL 8.0.46 de la session (copie ventes_nb, rechargée avant chaque essai : nombres/mysql/t01 à t08).
// SQL Server et Snowflake : documentation seulement (pas de serveur). Notes complètes : nombres/sources.txt.
// Sources (lues le 13/11/2026) :
// - SQL Server, learn.microsoft.com/sql : t-sql/data-types/int-bigint-smallint-and-tinyint-transact-sql (bornes et
//   octets), decimal-and-numeric-transact-sql (p de 1 à 38, défaut 18, s défaut 0 ; 5, 9, 13 ou 17 octets ; arrondi ;
//   dépassement = 8115), money-and-smallmoney-transact-sql (bornes, 8 et 4 octets, 4 décimales),
//   float-and-real-transact-sql (FLOAT(1) à (24) = REAL, 4 octets, 7 chiffres ; (25) à (53) = 8 octets, 15 chiffres),
//   bit-transact-sql ('TRUE' / 'FALSE' ; non nul = 1 ; 8 colonnes par octet), char-and-varchar-transact-sql (n en
//   octets ; sans n : 1, ou 30 dans CAST), datetime2-transact-sql (0 à 7, défaut 7 ; 6 octets sous 3),
//   functions/cast-and-convert-transact-sql (money : style 0 = 2 décimales, style 2 = 4 ; float vers entier : coupé),
//   functions/sum-transact-sql (SUM d'un tinyint, smallint ou int = int), statements/alter-table-transact-sql (ALTER
//   COLUMN : conversion de chaque valeur, pas sur une clé ; sans COLLATE, collation par défaut de la base),
//   statements/collations (fn_helpcollations), relational-databases/collations/collation-and-unicode-support (_UTF8,
//   2019), relational-databases/tables/specify-computed-columns-in-a-table (PERSISTED ; ni INSERT ni UPDATE),
//   relational-databases/errors-events (220, 8115).
// - Snowflake, docs.snowflake.com/en/sql-reference (lu en .md) : data-types-numeric (NUMBER(38,0) par défaut, échelle
//   37 au plus ; INT, BIGINT, SMALLINT, TINYINT, BYTEINT = NUMBER(38,0) ; la précision ne change pas la place, l'échelle
//   oui ; FLOAT, DOUBLE, REAL… = 8 octets ; DECFLOAT), intro-summary-data-types (pas de MEDIUMINT ni de MONEY),
//   data-types-logical et functions/to_boolean (textes acceptés), data-types-text (VARCHAR(n) en caractères, défaut
//   16 777 216), data-types-datetime (TIMESTAMP de 0 à 9, défaut 9), sql/alter-table-column (SET DATA TYPE : agrandir
//   un texte, changer la précision d'un NUMBER ; ni l'échelle, ni un autre type ; la colonne de remplacement n'hérite
//   de rien), collation (COLLATE 'en-cs' ; binaire par défaut), virtual-columns (type obligatoire, même échelle,
//   jamais stockée), constraints (CHECK appliqué depuis avril 2026).
// - MySQL 8.4, dev.mysql.com/doc/refman/8.4/en : integer-types.html (bornes, avec et sans UNSIGNED),
//   numeric-type-syntax.html (BOOL = TINYINT(1) ; DECIMAL : 65 chiffres, 30 décimales, défaut (10,0) ; REAL = DOUBLE ;
//   FLOAT : 7 chiffres), numeric-type-attributes.html (largeur d'affichage ; ZEROFILL ignoré dans les calculs et les
//   UNION ; LPAD conseillé), out-of-range-and-overflow.html (mode strict : erreur 1264 ; soustraction UNSIGNED : 1690),
//   bit-type.html, alter-table.html (MODIFY : un attribut non répété est perdu), create-table-generated-columns.html,
//   charset-column.html, fractional-seconds.html (défaut 0) ; refman 8.0 numeric-type-attributes.html et notes de
//   version 8.0.17 (ZEROFILL et largeur d'affichage obsolètes) et 8.0.19 (largeur plus affichée).
LEARNSQL.dico = (LEARNSQL.dico || []).concat([
  {
    id: "tinyint",
    nom: "TINYINT",
    type: "type",
    categorie: "Types de données",
    famille: "Entiers",
    definition: "Un très petit nombre entier, sur 1 octet : de 0 à 255 sur SQL Server.",
    moteurs: {
      sqlserver: "`TINYINT` (1 octet) : de 0 à 255, jamais négatif",
      snowflake: "`TINYINT` (ou `BYTEINT`) est un synonyme de `NUMBER(38,0)` : il ne s'arrête pas à 255",
      mysql: "`TINYINT` (1 octet) : de −128 à 127 ; `TINYINT UNSIGNED` : de 0 à 255"
    },
    apercu: { sqlserver: "1 octet, 0 à 255", snowflake: "= NUMBER(38,0)", mysql: "1 octet, −128 à 127 ; UNSIGNED : 0 à 255" },
    noms: ["BYTEINT"],
    exemple: "-- Écart d'inventaire : quantité comptée moins quantité attendue\nCREATE TABLE ecart_inventaire (\n  article_id INT     NOT NULL,\n  ecart      TINYINT NOT NULL\n);\nINSERT INTO ecart_inventaire VALUES (7, 4), (1, -3);",
    resultat: "Refusé (Msg 220, dépassement) : −3 est sous 0, le minimum d'un TINYINT. Aucune des 2 lignes n'entre. MySQL (−128 à 127) et Snowflake acceptent les deux.",
    piege: "Sur SQL Server, TINYINT n'a pas de négatif : un écart d'inventaire ou une correction de stock à −3 fait planter tout l'INSERT. Pour une valeur qui peut être négative, prends SMALLINT ou INT.",
    pratique: "TINYINT suffit pour un petit code de 0 à 255 (niveau de relance, priorité) : 1 octet au lieu de 4. Sur MySQL, écris `TINYINT UNSIGNED` pour aller jusqu'à 255.",
    motsCles: ["tinyint", "byteint", "petit entier", "très petit nombre", "1 octet", "255", "niveau", "priorité", "négatif", "entier", "type numérique"],
    voirAussi: ["smallint", "int", "unsigned", "type-booleen", "check"]
  },
  {
    id: "smallint",
    nom: "SMALLINT",
    type: "type",
    categorie: "Types de données",
    famille: "Entiers",
    definition: "Un petit nombre entier, sur 2 octets : de −32 768 à 32 767.",
    moteurs: {
      sqlserver: "`SMALLINT` (2 octets) : de −32 768 à 32 767",
      snowflake: "`SMALLINT` est un synonyme de `NUMBER(38,0)` : jusqu'à 38 chiffres",
      mysql: "`SMALLINT` (2 octets) : de −32 768 à 32 767 ; `SMALLINT UNSIGNED` : de 0 à 65 535"
    },
    apercu: { sqlserver: "2 octets, ±\u00a032\u00a0767", snowflake: "= NUMBER(38,0)", mysql: "2 octets ; UNSIGNED : 0 à 65\u00a0535" },
    noms: [],
    exemple: "-- Une commande EDI de 50 000 joints de vanne\nCREATE TABLE ligne_edi (\n  num_cde VARCHAR(10) NOT NULL,\n  code    VARCHAR(10) NOT NULL,\n  qte     SMALLINT    NOT NULL\n);\nINSERT INTO ligne_edi VALUES ('CDE-1009', 'JOINT-V', 50000);",
    resultat: "Refusé (Msg 220, dépassement) : 50 000 dépasse 32 767, le maximum d'un SMALLINT. MySQL refuse aussi (erreur 1264) ; Snowflake accepte la ligne.",
    piege: "Une quantité en SMALLINT tient… jusqu'à la grosse commande : 50 000 pièces font planter l'INSERT, et tout le flux EDI s'arrête. Pour une quantité, prends INT.",
    pratique: "Avant de passer une colonne INT en SMALLINT pour gagner de la place, regarde `MIN(col)` et `MAX(col)` : sur SQL Server et MySQL, l'ALTER plante à la première valeur hors de −32 768 à 32 767.",
    motsCles: ["smallint", "petit entier", "2 octets", "32767", "quantité", "dépassement", "overflow", "trop grand", "limite", "entier", "type numérique"],
    voirAussi: ["tinyint", "int", "bigint", "alter-column", "types-nombre"]
  },
  {
    id: "mediumint",
    nom: "MEDIUMINT",
    type: "type",
    categorie: "Types de données",
    famille: "Entiers",
    definition: "Un entier moyen, sur 3 octets, qui n'existe que sur MySQL : de −8 388 608 à 8 388 607.",
    moteurs: {
      sqlserver: "Pas de MEDIUMINT : `INT` (4 octets)",
      snowflake: "Pas de MEDIUMINT : `INT`, c'est-à-dire `NUMBER(38,0)`",
      mysql: "`MEDIUMINT` (3 octets) : de −8 388 608 à 8 388 607 ; `MEDIUMINT UNSIGNED` : de 0 à 16 777 215"
    },
    apercu: { sqlserver: "— (INT)", snowflake: "— (NUMBER(38,0))", mysql: "3 octets, ± 8,3 millions" },
    noms: [],
    exemple: "-- MySQL : un compteur de messages EDI arrivé au maximum\nCREATE TABLE compteur_flux (\n  partenaire  VARCHAR(40)        NOT NULL,\n  nb_messages MEDIUMINT UNSIGNED NOT NULL\n);\nINSERT INTO compteur_flux VALUES ('AquaBleu', 16777215);\nUPDATE compteur_flux SET nb_messages = nb_messages + 1;",
    resultat: "L'INSERT passe ; l'UPDATE est refusé (erreur 1264, « Out of range value ») : 16 777 215 est le maximum d'un MEDIUMINT UNSIGNED. Le compteur reste bloqué.",
    piege: "Exemple écrit pour MySQL. Copié sur SQL Server ou Snowflake, un script avec MEDIUMINT plante (le type n'y existe pas) : remplace-le par INT, et préfère INT dès le départ.",
    pratique: "MySQL refuse une valeur trop grande en mode strict (le réglage par défaut). Sans mode strict, il la ramène au maximum du type avec un simple avertissement : le compteur se fige, sans erreur.",
    motsCles: ["mediumint", "entier moyen", "3 octets", "mysql", "compteur", "8 millions", "16 millions", "migration", "entier", "type numérique"],
    voirAussi: ["int", "smallint", "unsigned", "bigint"]
  },
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
    piege: "Sur SQL Server, une division de deux entiers garde un entier : `7 / 2` donne 3 (Snowflake et MySQL : 3.5). Pour garder les décimales sur SQL Server : `7 / 2.0`, ou un `CAST`.",
    pratique: "Un code fait de chiffres (code postal, SIRET, numéro de facture) se range en texte (`VARCHAR`) : en INT, 01000 perdrait son zéro, et on ne calcule jamais dessus.",
    motsCles: ["entier", "nombre entier", "integer", "int", "quantité", "compteur", "sans virgule", "4 octets", "type numérique"],
    voirAussi: ["bigint", "smallint", "decimal", "types-nombre", "division"]
  },
  {
    id: "bigint",
    nom: "BIGINT",
    type: "type",
    categorie: "Types de données",
    famille: "Entiers",
    definition: "Un très grand nombre entier, sur 8 octets : jusqu'à 9,2 milliards de milliards.",
    moteurs: {
      sqlserver: "`BIGINT` (8 octets) : de −9 223 372 036 854 775 808 à 9 223 372 036 854 775 807",
      snowflake: "`BIGINT` est un synonyme de `NUMBER(38,0)` : jusqu'à 38 chiffres",
      mysql: "`BIGINT` (8 octets), mêmes bornes ; `BIGINT UNSIGNED` : de 0 à 18 446 744 073 709 551 615"
    },
    apercu: { sqlserver: "8 octets, ± 9,2 milliards de milliards", snowflake: "= NUMBER(38,0)", mysql: "8 octets ; UNSIGNED : 18,4 milliards de milliards" },
    noms: [],
    exemple: "-- Chiffre d'affaires en centimes, pour un fichier à longueur fixe\nSELECT SUM(CAST(montant_ht * 100 AS BIGINT)) AS ca_centimes\nFROM commande;",
    exemples: {
      mysql: "-- Chiffre d'affaires en centimes, pour un fichier à longueur fixe\nSELECT SUM(CAST(montant_ht * 100 AS SIGNED)) AS ca_centimes\nFROM commande;"
    },
    resultat: [["ca_centimes"], [1864180]],
    piege: "Sur SQL Server, `SUM` d'une colonne INT rend un INT : au-delà de 2,1 milliards, la requête plante (Msg 8115, dépassement). Convertis avant de sommer, `SUM(CAST(col AS BIGINT))` ; Snowflake et MySQL agrandissent seuls le type du total.",
    pratique: "Pour l'id d'une table qui grossit vite (journal des flux EDI, mouvements de stock), prends BIGINT dès le départ. Plus tard, c'est lourd : SQL Server refuse l'ALTER COLUMN sur une clé primaire ou étrangère.",
    motsCles: ["bigint", "grand entier", "grand nombre", "très grand nombre", "8 octets", "milliards", "dépassement", "overflow", "gros total", "identifiant", "centimes", "entier", "type numérique"],
    voirAussi: ["int", "sum", "count", "identity", "types-nombre"],
    module: "m10"
  },
  {
    id: "decimal",
    nom: "DECIMAL",
    type: "type",
    categorie: "Types de données",
    famille: "Décimaux exacts",
    definition: "Un nombre exact à virgule : on choisit le nombre total de chiffres (la précision) et de décimales (l'échelle).",
    moteurs: {
      sqlserver: "`DECIMAL(p,s)` = `NUMERIC(p,s)` : p de 1 à 38 ; sans rien, `DECIMAL(18,0)` ; décimales en trop : arrondies",
      snowflake: "`DECIMAL(p,s)` et `NUMERIC` = `NUMBER(p,s)` : p jusqu'à 38 ; sans rien, `NUMBER(38,0)`",
      mysql: "`DECIMAL(p,s)` : p jusqu'à 65, s jusqu'à 30 ; sans rien, `DECIMAL(10,0)`"
    },
    apercu: { sqlserver: "jusqu'à 38 chiffres ; défaut (18,0)", snowflake: "= NUMBER ; défaut (38,0)", mysql: "jusqu'à 65 chiffres ; défaut (10,0)" },
    noms: ["NUMERIC", "DEC", "FIXED"],
    exemple: "-- Taux de remise en % : DECIMAL(4,2) va jusqu'à 99.99\nCREATE TABLE remise_article (\n  article_id INT          NOT NULL,\n  taux       DECIMAL(4,2) NOT NULL\n);\nINSERT INTO remise_article VALUES (7, 12.345);  -- 3 décimales\nINSERT INTO remise_article VALUES (8, 100);     -- échantillon gratuit",
    resultat: "1er INSERT : accepté, 12.345 devient 12.35 (arrondi, sans message). 2e INSERT : refusé (Msg 8115, dépassement) : 100.00 demande 5 chiffres, DECIMAL(4,2) n'en a que 4. MySQL : erreur 1264.",
    piege: "La précision compte tous les chiffres, décimales comprises : DECIMAL(4,2) s'arrête à 99.99, et une remise de 100 % plante. Les décimales en trop, elles, sont arrondies sans prévenir.",
    pratique: "Des repères : un montant en `DECIMAL(18,2)`, un prix d'achat fin en `DECIMAL(19,4)`, un taux en `DECIMAL(5,2)`. Sur SQL Server, jusqu'à 9 chiffres, un DECIMAL prend 5 octets ; de 10 à 19 chiffres, 9 octets.",
    motsCles: ["decimal", "décimal", "numeric", "nombre à virgule", "virgule", "décimales", "précision", "échelle", "exact", "montant", "prix", "argent", "taux", "pourcentage", "chiffres après la virgule", "type numérique"],
    voirAussi: ["number", "money", "float", "round", "cast", "longueur-precision"],
    module: "m03"
  },
  {
    id: "number",
    nom: "NUMBER",
    type: "type",
    categorie: "Types de données",
    famille: "Décimaux exacts",
    definition: "Le type de tous les nombres exacts de Snowflake, entiers et décimaux : jusqu'à 38 chiffres.",
    moteurs: {
      sqlserver: "Pas de NUMBER : `DECIMAL(p,s)` pour un décimal, `INT` ou `BIGINT` pour un entier",
      snowflake: "`NUMBER(p,s)` : p jusqu'à 38, s jusqu'à 37 ; seul = `NUMBER(38,0)` ; `INT`, `DECIMAL`… en sont des synonymes ; `DECFLOAT` : exact, échelle variable",
      mysql: "Pas de NUMBER : `DECIMAL(p,s)`, ou `INT` / `BIGINT`"
    },
    apercu: { sqlserver: "— (DECIMAL, INT)", snowflake: "38 chiffres ; défaut (38,0)", mysql: "— (DECIMAL, INT)" },
    noms: [],
    exemple: "-- Snowflake : quatre types déclarés, un seul type rangé\nCREATE TABLE statut_flux (\n  code_statut TINYINT,\n  nb_lignes   INT,\n  montant     DECIMAL(10,2),\n  taux        NUMERIC\n);\nDESC TABLE statut_flux;",
    resultat: [["name", "type"], ["CODE_STATUT", "NUMBER(38,0)"], ["NB_LIGNES", "NUMBER(38,0)"], ["MONTANT", "NUMBER(10,2)"], ["TAUX", "NUMBER(38,0)"]],
    piege: "Exemple écrit pour Snowflake. TINYINT ou INT n'y limitent rien : code_statut accepte 300, ou 12 chiffres, sans erreur ; pour une vraie limite, ajoute un CHECK (`CHECK (code_statut BETWEEN 0 AND 255)`), appliqué depuis avril 2026 ; pour l'instant, `COPY INTO` échoue alors sur la table.",
    pratique: "Sur Snowflake, la précision ne coûte rien (même place) : seule l'échelle compte. `NUMBER(38,2)` pour un montant, sans hésiter ; pas plus de décimales que le besoin.",
    motsCles: ["number", "nombre", "snowflake", "numérique", "nombre exact", "38 chiffres", "précision", "échelle", "entier", "décimal", "decfloat", "type numérique"],
    voirAussi: ["decimal", "int", "float", "to-number", "cast"],
    module: "m10"
  },
  {
    id: "money",
    nom: "MONEY",
    type: "type",
    categorie: "Types de données",
    famille: "Décimaux exacts",
    definition: "Le type monétaire de SQL Server : un nombre exact avec 4 décimales fixes. On lui préfère DECIMAL.",
    moteurs: {
      sqlserver: "`MONEY` : 8 octets, ± 922 337 milliards, 4 décimales ; `SMALLMONEY` : 4 octets, ± 214 748,3647",
      snowflake: "Pas de MONEY : `NUMBER(19,4)` (mêmes 4 décimales), ou `NUMBER(18,2)`",
      mysql: "Pas de MONEY : `DECIMAL(19,4)`, ou `DECIMAL(18,2)`"
    },
    apercu: { sqlserver: "8 octets, 4 décimales", snowflake: "— (NUMBER(19,4))", mysql: "— (DECIMAL(19,4))" },
    noms: ["SMALLMONEY"],
    exemple: "-- Prix d'achat d'un joint de vanne (JOINT-V) : 0,0125 €\nDECLARE @prix_joint MONEY = 0.0125;\nSELECT @prix_joint AS prix,\n       CAST(@prix_joint AS VARCHAR(20)) AS texte_defaut,\n       CONVERT(VARCHAR(20), @prix_joint, 2) AS texte_style_2;",
    resultat: [["prix", "texte_defaut", "texte_style_2"], ["0.0125", "0.01", "0.0125"]],
    piege: "Mis en texte (CAST, export d'un fichier), un MONEY ne garde que 2 décimales : 0,0125 € part en '0.01'. Pour garder les 4 décimales, donne le style 2 : `CONVERT(VARCHAR(20), prix, 2)`.",
    pratique: "Préfère `DECIMAL(19,4)` : même précision, mais tu choisis l'échelle, alors qu'un calcul en MONEY (division, taux) reste à 4 décimales ; et DECIMAL existe aussi sur Snowflake et MySQL.",
    motsCles: ["money", "smallmoney", "monétaire", "euros", "devise", "monnaie", "prix", "4 décimales", "comptabilité", "type numérique"],
    voirAussi: ["decimal", "convert", "format", "round"],
    module: "m03"
  },
  {
    id: "float",
    nom: "FLOAT",
    type: "type",
    categorie: "Types de données",
    famille: "Nombres approchés",
    definition: "Un nombre à virgule approché : immense ou minuscule, mais rangé en binaire, donc pas toujours exact.",
    moteurs: {
      sqlserver: "`FLOAT` = `FLOAT(53)` = `DOUBLE PRECISION` : 8 octets, 15 chiffres ; de `FLOAT(1)` à `FLOAT(24)`, c'est un `REAL` (4 octets)",
      snowflake: "`FLOAT`, `DOUBLE`, `DOUBLE PRECISION`, `FLOAT4`, `FLOAT8` : toujours 8 octets, environ 15 chiffres",
      mysql: "`FLOAT` : 4 octets, environ 7 chiffres ; `DOUBLE` (ou `DOUBLE PRECISION`) : 8 octets, environ 15 chiffres"
    },
    apercu: { sqlserver: "8 octets, 15 chiffres, approché", snowflake: "8 octets, 15 chiffres, approché", mysql: "4 octets, 7 chiffres ; DOUBLE : 8 octets" },
    noms: ["DOUBLE", "DOUBLE PRECISION", "FLOAT8", "FLOAT4"],
    exemple: "-- Prix en centimes pour un fichier ; le tarif a été copié en FLOAT\nSELECT code, prix_tarif,\n       CAST(CAST(prix_tarif AS FLOAT) * 100 AS INT) AS centimes_float,\n       CAST(prix_tarif * 100 AS INT) AS centimes_exact\nFROM article\nWHERE famille = 'ACCESSOIRE';",
    exemples: {
      mysql: "-- Prix en centimes pour un fichier ; le tarif a été copié en DOUBLE\nSELECT code, prix_tarif,\n       CAST(CAST(prix_tarif AS DOUBLE) * 100 AS SIGNED) AS centimes_float,\n       CAST(prix_tarif * 100 AS SIGNED) AS centimes_exact\nFROM article\nWHERE famille = 'ACCESSOIRE';"
    },
    resultat: [["code", "prix_tarif", "centimes_float", "centimes_exact"], ["EPU-F", "19.90", 1989, 1990], ["BACHE8", "149.00", 14900, 14900]],
    piege: "En FLOAT, 19.90 × 100 vaut 1989.9999999999998, et SQL Server coupe en passant à l'entier : 1989 centimes, un centime perdu (Snowflake et MySQL arrondissent : 1990). Calcule en DECIMAL, ou arrondis avant : `CAST(ROUND(x * 100, 0) AS INT)`.",
    pratique: "FLOAT est fait pour les calculs scientifiques (statistiques, coordonnées GPS), pas pour l'argent. Un fichier Excel importé arrive souvent en FLOAT : convertis les montants en `DECIMAL(18,2)` dès le chargement.",
    motsCles: ["float", "double", "flottant", "virgule flottante", "approché", "approximatif", "imprécis", "arrondi", "centimes", "mesure", "scientifique", "excel", "type numérique"],
    voirAussi: ["real", "decimal", "round", "cast", "types-nombre"],
    module: "m03"
  },
  {
    id: "real",
    nom: "REAL",
    type: "type",
    categorie: "Types de données",
    famille: "Nombres approchés",
    definition: "Un nombre à virgule approché, dont la taille change selon le moteur : 4 octets sur SQL Server, 8 ailleurs.",
    moteurs: {
      sqlserver: "`REAL` = `FLOAT(24)` : 4 octets, environ 7 chiffres",
      snowflake: "`REAL` = `FLOAT` : 8 octets, environ 15 chiffres",
      mysql: "`REAL` = `DOUBLE` (8 octets) ; avec le mode `REAL_AS_FLOAT` : `FLOAT` (4 octets)"
    },
    apercu: { sqlserver: "4 octets, 7 chiffres", snowflake: "= FLOAT, 8 octets", mysql: "= DOUBLE, 8 octets" },
    noms: ["FLOAT(24)"],
    exemple: "-- Un chiffre d'affaires de 1 234 567,89 € rangé dans un REAL\nSELECT CAST(CAST(1234567.89 AS REAL) AS DECIMAL(12,2)) AS en_real,\n       CAST(CAST(1234567.89 AS FLOAT) AS DECIMAL(12,2)) AS en_float;",
    resultat: [["en_real", "en_float"], ["1234567.88", "1234567.89"]],
    piege: "Un REAL de SQL Server ne garde qu'environ 7 chiffres : 1 234 567,89 devient 1 234 567,875, puis 1 234 567,88. Une table copiée de Snowflake ou de MySQL (REAL sur 8 octets) vers SQL Server perd ainsi des chiffres, sans erreur.",
    pratique: "Sur SQL Server, `FLOAT(10)` ne veut pas dire 10 chiffres : de `FLOAT(1)` à `FLOAT(24)`, c'est un REAL (4 octets, 7 chiffres) ; de 25 à 53, un FLOAT de 8 octets.",
    motsCles: ["real", "réel", "simple précision", "4 octets", "7 chiffres", "approché", "flottant", "chiffres perdus", "virgule", "type numérique"],
    voirAussi: ["float", "decimal", "types-nombre"]
  },
  {
    id: "bit",
    nom: "BIT",
    type: "type",
    categorie: "Types de données",
    famille: "Booléens",
    definition: "Le oui / non de SQL Server : un tout petit entier qui vaut 1, 0, ou NULL.",
    moteurs: {
      sqlserver: "`BIT` : 1, 0 ou NULL ; toute valeur non nulle devient 1 ; les textes 'TRUE' et 'FALSE' sont acceptés",
      snowflake: "Pas de BIT : `BOOLEAN` (TRUE, FALSE ou NULL)",
      mysql: "`BIT(n)` est un champ de n bits (`b'101'`), pas un oui / non : prends `BOOLEAN`"
    },
    apercu: { sqlserver: "1, 0 ou NULL", snowflake: "— (BOOLEAN)", mysql: "BIT(n) : champ de bits" },
    noms: [],
    exemple: "-- Drapeau « en stock » pour le site web\nSELECT code, stock, CAST(stock AS BIT) AS en_stock\nFROM article\nWHERE famille IN ('FILTRATION', 'ROBOT');",
    exemples: {
      snowflake: "-- Drapeau « en stock » pour le site web\nSELECT code, stock, stock::BOOLEAN AS en_stock\nFROM article\nWHERE famille IN ('FILTRATION', 'ROBOT');",
      mysql: "-- Drapeau « en stock » pour le site web\nSELECT code, stock, stock <> 0 AS en_stock\nFROM article\nWHERE famille IN ('FILTRATION', 'ROBOT');"
    },
    resultat: [["code", "stock", "en_stock"], ["FIL-14", 12, 1], ["POMP-1", 0, 0], ["ROB-X", 5, 1]],
    piege: "Toute valeur non nulle devient 1, même négative : un stock à −3 (écart d'inventaire) s'affiche « en stock » sur le site. Écris plutôt `CASE WHEN stock > 0 THEN 1 ELSE 0 END` ; Snowflake, lui, affiche TRUE et FALSE.",
    pratique: "Sur SQL Server, les textes 'TRUE' et 'FALSE' se convertissent en BIT (1 et 0) : un fichier CSV avec ces mots se charge sans CASE. Et 8 colonnes BIT d'une même table tiennent dans 1 seul octet.",
    motsCles: ["bit", "booléen", "oui", "non", "vrai", "faux", "drapeau", "flag", "0 ou 1", "case à cocher", "indicateur", "sql server"],
    voirAussi: ["boolean", "type-booleen", "case", "iif", "cast"],
    module: "m04"
  },
  {
    id: "boolean",
    nom: "BOOLEAN",
    type: "type",
    categorie: "Types de données",
    famille: "Booléens",
    definition: "Un vrai type oui / non : TRUE, FALSE, ou NULL quand on ne sait pas.",
    moteurs: {
      sqlserver: "Pas de BOOLEAN : `BIT` (1, 0, NULL) ; une comparaison ne peut pas être une colonne : `CASE WHEN … THEN 1 ELSE 0 END`",
      snowflake: "`BOOLEAN` : TRUE, FALSE ou NULL ; `statut = 'OK' AS ok` donne une colonne TRUE / FALSE ; `TO_BOOLEAN('yes')` donne TRUE",
      mysql: "`BOOLEAN` (ou `BOOL`) = `TINYINT(1)` : TRUE vaut 1, FALSE vaut 0, et 2 est accepté"
    },
    apercu: { sqlserver: "— (BIT)", snowflake: "TRUE, FALSE ou NULL", mysql: "= TINYINT(1)" },
    noms: ["BOOL"],
    exemple: "-- Les commandes EDI reçues : le flux est-il OK ?\nSELECT id, type, CASE WHEN statut = 'OK' THEN 1 ELSE 0 END AS ok\nFROM flux_edi\nWHERE type = 'ORDERS';",
    exemples: {
      snowflake: "-- Les commandes EDI reçues : le flux est-il OK ?\nSELECT id, type, statut = 'OK' AS ok\nFROM flux_edi\nWHERE type = 'ORDERS';",
      mysql: "-- Les commandes EDI reçues : le flux est-il OK ?\nSELECT id, type, statut = 'OK' AS ok\nFROM flux_edi\nWHERE type = 'ORDERS';"
    },
    resultat: [["id", "type", "ok"], [1, "ORDERS", 1], [2, "ORDERS", 1], [3, "ORDERS", 0], [5, "ORDERS", 1]],
    piege: "Sur Snowflake (qui affiche ici TRUE et FALSE), `TO_BOOLEAN` ne lit que 'true', 'yes', 'y', 'on', '1'… et leurs contraires : le 'O' de « Oui » d'un ERP fait planter la requête. Compare toi-même : `flag = 'O'`.",
    pratique: "Sur MySQL, TRUE vaut 1 : `WHERE actif = TRUE` oublie une ligne à 2 (acceptée par TINYINT(1)). `WHERE actif`, sans signe égal, la trouve : toute valeur non nulle compte comme vraie.",
    motsCles: ["boolean", "bool", "booléen", "true", "false", "vrai", "faux", "oui", "non", "drapeau", "flag", "logique", "snowflake", "to_boolean"],
    voirAussi: ["bit", "type-booleen", "iif", "case", "where"]
  },
  {
    id: "longueur-precision",
    nom: "Longueur et précision (n), (p,s)",
    type: "mot-clé",
    categorie: "Types de données",
    famille: "Modifier un type",
    definition: "Le nombre entre parenthèses après un type : la longueur d'un texte, les chiffres d'un nombre, les décimales des secondes.",
    moteurs: {
      sqlserver: "`VARCHAR(50)` : 50 octets ; `DECIMAL(10,2)` : 10 chiffres dont 2 décimales ; `DATETIME2(0)` : à la seconde (7 décimales par défaut)",
      snowflake: "`VARCHAR(50)` : 50 caractères ; `NUMBER(10,2)` ; `TIMESTAMP_NTZ(0)` : à la seconde (9 décimales par défaut)",
      mysql: "`VARCHAR(50)` : 50 caractères ; `DECIMAL(10,2)` ; `DATETIME(3)` : au millième (0 par défaut) ; `INT(11)` : une largeur d'affichage, qui ne limite rien"
    },
    apercu: { sqlserver: "VARCHAR(n) : n octets", snowflake: "VARCHAR(n) : n caractères", mysql: "VARCHAR(n) : n caractères" },
    noms: ["(p,s)", "précision et échelle"],
    exemple: "CREATE TABLE expedition (\n  num_bl     VARCHAR(12)  NOT NULL,  -- longueur : 12\n  poids_kg   DECIMAL(7,3) NOT NULL,  -- 7 chiffres, dont 3 décimales\n  expedie_le DATETIME2(0) NOT NULL   -- à la seconde\n);\nINSERT INTO expedition VALUES ('BL-2026-0042', 412.5678, '2026-04-08 17:30:42');\nSELECT num_bl, poids_kg, expedie_le FROM expedition;",
    exemples: {
      snowflake: "CREATE TABLE expedition (\n  num_bl     VARCHAR(12)      NOT NULL,\n  poids_kg   NUMBER(7,3)      NOT NULL,\n  expedie_le TIMESTAMP_NTZ(0) NOT NULL\n);\nINSERT INTO expedition VALUES ('BL-2026-0042', 412.5678, '2026-04-08 17:30:42');\nSELECT num_bl, poids_kg, expedie_le FROM expedition;",
      mysql: "CREATE TABLE expedition (\n  num_bl     VARCHAR(12)  NOT NULL,\n  poids_kg   DECIMAL(7,3) NOT NULL,\n  expedie_le DATETIME     NOT NULL   -- sans parenthèses : à la seconde\n);\nINSERT INTO expedition VALUES ('BL-2026-0042', 412.5678, '2026-04-08 17:30:42');\nSELECT num_bl, poids_kg, expedie_le FROM expedition;"
    },
    resultat: [["num_bl", "poids_kg", "expedie_le"], ["BL-2026-0042", "412.568", "2026-04-08 17:30:42"]],
    piege: "Sans parenthèses, chaque moteur choisit : `VARCHAR` seul garde 1 caractère sur SQL Server, 16 777 216 sur Snowflake, et MySQL le refuse ; `DECIMAL` seul vaut (18,0), (38,0) ou (10,0). Un script copié d'un moteur à l'autre change de sens : écris toujours les parenthèses.",
    pratique: "Sur SQL Server, `DATETIME2(0)` (à la seconde) prend 6 octets, contre 8 pour `DATETIME2` seul (7 décimales de seconde) : assez pour l'heure d'un flux EDI, et plus lisible dans un export.",
    motsCles: ["longueur", "taille", "taille de colonne", "précision", "échelle", "parenthèses", "décimales", "chiffres", "secondes", "millisecondes", "varchar(50)", "decimal(10,2)", "datetime2(0)", "défaut"],
    voirAussi: ["decimal", "types-texte", "types-date", "alter-column", "cast"],
    module: "m10"
  },
  {
    id: "unsigned",
    nom: "UNSIGNED",
    type: "mot-clé",
    categorie: "Types de données",
    famille: "Modifier un type",
    definition: "Un attribut des entiers de MySQL : pas de nombre négatif, et une valeur maximale doublée.",
    moteurs: {
      sqlserver: "Pas de UNSIGNED : `CHECK (col >= 0)` ; seul `TINYINT` est déjà sans signe (0 à 255)",
      snowflake: "Pas de UNSIGNED : `CHECK (col >= 0)`, appliqué depuis avril 2026 ; pour l'instant, `COPY INTO` échoue sur une table qui en a un",
      mysql: "`INT UNSIGNED` : de 0 à 4 294 967 295 ; obsolète sur `DECIMAL`, `FLOAT` et `DOUBLE` (MySQL conseille un `CHECK`)"
    },
    apercu: { sqlserver: "— (CHECK col >= 0)", snowflake: "— (CHECK col >= 0)", mysql: "négatifs refusés, maximum doublé" },
    noms: ["INT UNSIGNED", "NO_UNSIGNED_SUBTRACTION"],
    exemple: "-- MySQL : le stock en UNSIGNED, puis le reste après une commande de 20\nALTER TABLE article MODIFY stock INT UNSIGNED NOT NULL;\nSELECT code, stock, stock - 20 AS reste\nFROM article\nWHERE famille = 'FILTRATION';",
    resultat: "Erreur 1690 (« BIGINT UNSIGNED value is out of range ») : 12 − 20 ne peut pas être négatif en UNSIGNED, et toute la requête s'arrête.",
    piege: "Exemple écrit pour MySQL. Un calcul avec une colonne UNSIGNED reste sans signe : un reste à livrer négatif fait planter la requête ; convertis d'abord, `CAST(stock AS SIGNED) - 20` donne −8 pour FIL-14.",
    pratique: "Ailleurs, un CHECK fait le même contrôle, sans changer les calculs : `CHECK (stock >= 0)` sur SQL Server et MySQL, et sur Snowflake depuis avril 2026.",
    motsCles: ["unsigned", "signed", "sans signe", "non signé", "positif", "négatif", "interdire les négatifs", "soustraction", "1690", "out of range", "mysql", "check"],
    voirAussi: ["int", "check", "cast", "tinyint", "zerofill"]
  },
  {
    id: "zerofill",
    nom: "ZEROFILL",
    type: "mot-clé",
    categorie: "Types de données",
    famille: "Modifier un type",
    definition: "Un attribut de MySQL qui affiche un entier avec des zéros devant, jusqu'à une largeur : INT(6).",
    moteurs: {
      sqlserver: "Pas de ZEROFILL : `FORMAT(id, '000000')`, ou `RIGHT('000000' + CAST(id AS VARCHAR(6)), 6)`",
      snowflake: "Pas de ZEROFILL : `LPAD(id, 6, '0')`, ou `TO_CHAR(id, 'FM000000')`",
      mysql: "`INT(6) ZEROFILL` : 5 s'affiche 000005 ; obsolète depuis MySQL 8.0.17, comme la largeur `INT(6)` : préfère `LPAD(id, 6, '0')`"
    },
    apercu: { sqlserver: "— (FORMAT, RIGHT)", snowflake: "— (LPAD)", mysql: "obsolète depuis 8.0.17 : LPAD" },
    noms: ["INT(11)", "largeur d'affichage", "display width"],
    exemple: "-- MySQL : le numéro de client affiché sur 6 chiffres\nCREATE TABLE client_zf (\n  id  INT(6) ZEROFILL NOT NULL,\n  nom VARCHAR(60)     NOT NULL\n);\nINSERT INTO client_zf SELECT id, nom FROM client WHERE pays = 'CH';\nSELECT id, id + 0 AS calcul, LPAD(id, 6, '0') AS avec_lpad\nFROM client_zf;",
    resultat: [["id", "calcul", "avec_lpad"], ["000005", 5, "000005"]],
    piege: "Exemple écrit pour MySQL, où le CREATE TABLE donne déjà deux avertissements « deprecated ». Les zéros ne sont qu'un habillage : dans un calcul ou un UNION, 000005 redevient 5 ; `LPAD` donne un vrai texte, qui marche aussi sur Snowflake.",
    pratique: "Dans un vieux script MySQL, `INT(11)` ne limite rien : sans ZEROFILL, ce nombre n'est qu'une largeur d'affichage. Un `INT(3)` accepte 123456, et depuis MySQL 8.0.19, SHOW CREATE TABLE ne l'écrit même plus.",
    motsCles: ["zerofill", "zéros", "zéros devant", "zéros à gauche", "largeur d'affichage", "int(11)", "000042", "numéro client", "obsolète", "mysql", "lpad"],
    voirAussi: ["lpad", "right", "to-char", "format", "unsigned"]
  },
  {
    id: "collate",
    nom: "COLLATE",
    type: "mot-clé",
    categorie: "Types de données",
    famille: "Modifier un type",
    definition: "Fixe comment un texte se compare et se trie (majuscules, accents) ; sur MySQL, aussi son jeu de caractères.",
    moteurs: {
      sqlserver: "`code VARCHAR(10) COLLATE Latin1_General_CS_AS` : CS = casse comptée, CI = ignorée ; AS / AI : accents ; `_UTF8` : texte en UTF-8 (2019+)",
      snowflake: "`code VARCHAR(10) COLLATE 'en-cs'` ; sans COLLATE : comparaison binaire, sensible à la casse ; texte toujours en UTF-8",
      mysql: "`code VARCHAR(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_as_cs` ; par défaut `utf8mb4_0900_ai_ci` : ni casse, ni accents"
    },
    apercu: { sqlserver: "COLLATE Latin1_General_CS_AS", snowflake: "COLLATE 'en-cs' ; binaire sinon", mysql: "CHARACTER SET … COLLATE …" },
    noms: ["CHARACTER SET", "CHARSET", "collation", "jeu de caractères"],
    exemple: "-- Codes partenaires : 'ab12' et 'AB12' sont deux partenaires différents\nCREATE TABLE partenaire_code (\n  code VARCHAR(10) COLLATE Latin1_General_CS_AS NOT NULL,\n  nom  VARCHAR(40) NOT NULL\n);\nINSERT INTO partenaire_code VALUES ('ab12', 'Hydro Sud'), ('AB12', 'AquaBleu');\nSELECT code, nom FROM partenaire_code WHERE code = 'AB12';",
    exemples: {
      snowflake: "-- Sans COLLATE, Snowflake compare déjà en tenant compte de la casse\nCREATE TABLE partenaire_code (\n  code VARCHAR(10) NOT NULL,\n  nom  VARCHAR(40) NOT NULL\n);\nINSERT INTO partenaire_code VALUES ('ab12', 'Hydro Sud'), ('AB12', 'AquaBleu');\nSELECT code, nom FROM partenaire_code WHERE code = 'AB12';",
      mysql: "-- Codes partenaires : 'ab12' et 'AB12' sont deux partenaires différents\nCREATE TABLE partenaire_code (\n  code VARCHAR(10) COLLATE utf8mb4_0900_as_cs NOT NULL,\n  nom  VARCHAR(40) NOT NULL\n);\nINSERT INTO partenaire_code VALUES ('ab12', 'Hydro Sud'), ('AB12', 'AquaBleu');\nSELECT code, nom FROM partenaire_code WHERE code = 'AB12';"
    },
    resultat: [["code", "nom"], ["AB12", "AquaBleu"]],
    piege: "Un `ALTER COLUMN` (SQL Server) ou un `MODIFY` (MySQL) qui oublie `COLLATE` remet la collation par défaut de la base, souvent insensible à la casse : on allonge code en VARCHAR(20), et 'ab12' = 'AB12' devient vrai, sans message. Réécris toujours le COLLATE.",
    pratique: "Sur SQL Server, `SELECT name FROM sys.fn_helpcollations() WHERE name LIKE 'French%'` liste les collations françaises. `_CI_AI` ignore casse et accents : 'epuisette' trouve 'Épuisette'.",
    motsCles: ["collation", "collate", "casse", "majuscules", "minuscules", "accents", "sensible à la casse", "insensible", "jeu de caractères", "charset", "utf8", "tri", "comparaison"],
    voirAussi: ["ilike", "upper-lower", "types-texte", "alter-column", "like"]
  },
  {
    id: "alter-column",
    nom: "Changer le type d'une colonne",
    type: "mot-clé",
    categorie: "Types de données",
    famille: "Modifier un type",
    definition: "Change le type ou la taille d'une colonne déjà remplie : chaque moteur a ses limites.",
    moteurs: {
      sqlserver: "`ALTER TABLE t ALTER COLUMN col DECIMAL(12,4) NOT NULL` : chaque valeur est convertie ; refusé si une seule ne passe pas, ou si la colonne est dans une clé",
      snowflake: "`ALTER TABLE t ALTER COLUMN col SET DATA TYPE NUMBER(20,2)` : seulement agrandir un VARCHAR ou changer la précision d'un NUMBER ; ni l'échelle, ni le type",
      mysql: "`ALTER TABLE t MODIFY col DECIMAL(12,4) NOT NULL` : convertit tout ; en mode strict (le défaut), refusé si une valeur ne passe pas"
    },
    apercu: { sqlserver: "ALTER COLUMN : conversion de chaque valeur", snowflake: "SET DATA TYPE : surtout agrandir", mysql: "MODIFY : définition complète" },
    noms: ["MODIFY COLUMN", "CHANGE COLUMN", "modifier le type"],
    exemple: "-- Prix de vente à 4 décimales, comme les prix d'achat\nALTER TABLE article ALTER COLUMN prix_tarif DECIMAL(12,4) NOT NULL;\nSELECT code, prix_tarif FROM article WHERE famille = 'CHIMIE';",
    exemples: {
      snowflake: "-- L'échelle (2 → 4) ne change pas sur place : une nouvelle colonne\nALTER TABLE article ADD COLUMN prix_4 NUMBER(12,4);\nUPDATE article SET prix_4 = prix_tarif;\nALTER TABLE article DROP COLUMN prix_tarif;\nALTER TABLE article RENAME COLUMN prix_4 TO prix_tarif;\nSELECT code, prix_tarif FROM article WHERE famille = 'CHIMIE';",
      mysql: "-- Prix de vente à 4 décimales, comme les prix d'achat\nALTER TABLE article MODIFY prix_tarif DECIMAL(12,4) NOT NULL;\nSELECT code, prix_tarif FROM article WHERE famille = 'CHIMIE';"
    },
    resultat: [["code", "prix_tarif"], ["CHL-5", "39.9000"], ["CHL-25", "159.0000"], ["PH-5", "24.5000"]],
    piege: "Sur Snowflake, `SET DATA TYPE NUMBER(12,4)` est refusé : l'échelle ne change pas sur place, ni un texte en nombre. La colonne de remplacement ne reprend ni NOT NULL, ni DEFAULT, ni commentaire : refais-les, et vérifie les vues qui la citent.",
    pratique: "Avant de passer un texte en nombre, liste ce qui ne passera pas : `SELECT col FROM t WHERE TRY_CAST(col AS DECIMAL(12,2)) IS NULL AND col IS NOT NULL;` (MySQL, sans TRY_CAST : un test `REGEXP`).",
    motsCles: ["changer le type", "modifier le type", "type de colonne", "alter column", "modify", "set data type", "convertir une colonne", "agrandir", "élargir", "migration", "colonne", "décimales"],
    voirAussi: ["alter-table", "try-cast", "not-null", "collate", "longueur-precision"],
    module: "m10"
  },
  {
    id: "colonne-calculee",
    nom: "Colonne calculée (AS)",
    type: "mot-clé",
    categorie: "Types de données",
    famille: "Modifier un type",
    definition: "Une colonne dont la valeur est calculée à partir des autres colonnes de la même ligne.",
    moteurs: {
      sqlserver: "`montant AS (qte * prix_unit)` : type déduit du calcul ; calculée à la lecture, ou stockée avec `PERSISTED`",
      snowflake: "`montant NUMBER(38,2) AS (qte * prix_unit)` : type obligatoire ; toujours calculée à la lecture",
      mysql: "`montant DECIMAL(12,2) AS (qte * prix_unit)` : `VIRTUAL` (par défaut) ou `STORED`"
    },
    apercu: { sqlserver: "AS (calcul) ; PERSISTED pour stocker", snowflake: "type AS (calcul), jamais stockée", mysql: "AS (calcul) VIRTUAL ou STORED" },
    noms: ["computed column", "PERSISTED", "GENERATED ALWAYS AS", "colonne virtuelle", "VIRTUAL", "STORED"],
    exemple: "ALTER TABLE ligne_cde ADD montant AS (qte * prix_unit) PERSISTED;\nSELECT id, qte, prix_unit, montant FROM ligne_cde WHERE cde_id = 1;",
    exemples: {
      snowflake: "ALTER TABLE ligne_cde ADD COLUMN montant NUMBER(38,2) AS (qte * prix_unit);\nSELECT id, qte, prix_unit, montant FROM ligne_cde WHERE cde_id = 1;",
      mysql: "ALTER TABLE ligne_cde ADD montant DECIMAL(12,2) AS (qte * prix_unit) STORED;\nSELECT id, qte, prix_unit, montant FROM ligne_cde WHERE cde_id = 1;"
    },
    resultat: [["id", "qte", "prix_unit", "montant"], [1, 100, "35.90", "3590.00"], [2, 10, "119.00", "1190.00"]],
    piege: "On n'écrit jamais dans une colonne calculée : un INSERT qui la cite est refusé. Et sur Snowflake, le type doit coller au calcul : `NUMBER(12,2)` est refusé ici, car qte × prix_unit peut faire 38 chiffres.",
    pratique: "Une colonne calculée évite de recopier la formule dans chaque requête et chaque rapport Power BI. Sur SQL Server et MySQL, elle peut aussi porter un index, même non stockée, pour filtrer vite sur la valeur calculée.",
    motsCles: ["colonne calculée", "calculer", "calcul", "formule", "persisted", "virtuelle", "generated", "stored", "montant de ligne", "computed", "dérivée", "toujours à jour"],
    voirAussi: ["create-index", "alter-table", "default", "create-view"]
  }
]);
