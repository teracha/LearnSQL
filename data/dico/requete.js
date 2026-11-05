// Super dico SQL — catégorie « Requête » (étape 1, 05/11/2026). Format : docs/dico.md.
// Résultats calculés avec SQLite sur docs/base-exemple.sql (TOP -> LIMIT) : script de contrôle verif.py (scratchpad dico).
// Sources (vérifiées le 05/11/2026) :
// - SQL Server, learn.microsoft.com/sql/t-sql : queries/select-transact-sql, queries/from-transact-sql,
//   queries/select-order-by-clause-transact-sql (OFFSET … FETCH, ORDER BY obligatoire), queries/top-transact-sql
//   (WITH TIES, PERCENT), queries/select-clause-transact-sql (DISTINCT).
// - Snowflake, docs.snowflake.com/en/sql-reference : constructs/limit (LIMIT et FETCH, OFFSET), constructs/top_n
//   (TOP <n> = LIMIT), constructs/order-by (NULLS FIRST / LAST, NULL en fin en ASC), sql/select (EXCLUDE) ; aucune
//   option WITH TIES dans la syntaxe (les guides de migration passent par QUALIFY + RANK).
// - MySQL 8, dev.mysql.com/doc/refman/8.0/en : select.html (LIMIT [offset,] n | n OFFSET m, FROM facultatif, DUAL),
//   problems-with-alias.html (alias interdit dans WHERE), working-with-null.html (NULL en tête en ASC),
//   identifiers.html (accents graves pour les noms spéciaux).
// docs.snowflake.com et dev.mysql.com n'étaient pas joignables depuis la session : vérifiés par extraits de recherche.
LEARNSQL.dico = (LEARNSQL.dico || []).concat([
  {
    id: "select",
    nom: "SELECT",
    type: "mot-clé",
    categorie: "Requête",
    definition: "Choisit les colonnes, ou les calculs, que la requête affiche.",
    moteurs: {
      sqlserver: "`SELECT col1, col2 FROM table` ; sans `FROM` pour tester un calcul : `SELECT 10 % 3`",
      snowflake: "Même écriture ; en plus, `SELECT * EXCLUDE (col)` retire une colonne",
      mysql: "Même écriture ; sans table : `SELECT 1 + 1`, ou `FROM DUAL`"
    },
    noms: [],
    exemple: "SELECT code, prix_tarif, stock,\n       prix_tarif * stock AS valeur_stock\nFROM article\nWHERE famille = 'CHIMIE'\nORDER BY valeur_stock DESC;",
    resultat: [["code", "prix_tarif", "stock", "valeur_stock"], ["CHL-25", "159.00", 40, "6360.00"], ["CHL-5", "39.90", 120, "4788.00"], ["PH-5", "24.50", 80, "1960.00"]],
    piege: "`SELECT *` dans une vue ou un flux EDI : le jour où une colonne s'ajoute, le rapport ou l'import se décale, ou plante. Liste tes colonnes, et donne un nom (`AS`) à chaque calcul.",
    motsCles: ["afficher", "choisir", "colonne", "lire", "voir", "extraire", "requête", "sélectionner", "étoile", "calcul", "interroger", "consulter", "champs"],
    voirAussi: ["from", "as", "where", "order-by", "distinct"],
    module: "m01"
  },
  {
    id: "from",
    nom: "FROM",
    type: "mot-clé",
    categorie: "Requête",
    definition: "Dit dans quelle table la requête va lire les lignes.",
    moteurs: {
      sqlserver: "`FROM dbo.facture AS f` : le schéma, puis la table ; une autre base : `base.dbo.table`",
      snowflake: "`FROM VENTES.FACTURE` ; sans guillemets, les noms sont lus en MAJUSCULES",
      mysql: "`FROM facture`, ou `FROM ventes.facture` (en MySQL, base et schéma, c'est la même chose)"
    },
    noms: [],
    exemple: "SELECT f.num_fact, f.montant_ht\nFROM facture AS f\nWHERE f.statut = 'PAYEE';",
    resultat: [["num_fact", "montant_ht"], ["FA-2026-0301", "4780.00"], ["FA-2026-0302", "1290.00"]],
    piege: "Une fois l'alias posé (`FROM facture AS f`), écrire `facture.statut` plante : seul `f.statut` marche. Prends l'habitude : un alias court par table, utilisé partout.",
    motsCles: ["table", "source", "lire", "depuis", "provenance", "origine", "schéma", "base", "alias", "dbo", "données", "où"],
    voirAussi: ["select", "as", "where"],
    module: "m01"
  },
  {
    id: "as",
    nom: "AS",
    type: "mot-clé",
    categorie: "Requête",
    definition: "Donne un nouveau nom, plus court ou plus clair, à une colonne ou à une table.",
    moteurs: {
      sqlserver: "`col AS nom` ; un nom avec espace se met entre crochets : `AS [Nom client]`",
      snowflake: "`col AS nom` ; un nom avec espace entre guillemets : `AS \"Nom client\"` ; l'alias marche aussi dans `WHERE`",
      mysql: "`col AS nom` ; un nom avec espace entre accents graves (AltGr + 7), pas entre crochets"
    },
    noms: [],
    exemple: "SELECT c.code,\n       c.nom AS [Nom client],\n       c.ville AS ville_livraison\nFROM client AS c\nWHERE c.siren IS NULL;",
    exemples: {
      snowflake: "SELECT c.code,\n       c.nom AS \"Nom client\",\n       c.ville AS ville_livraison\nFROM client AS c\nWHERE c.siren IS NULL;",
      mysql: "SELECT c.code,\n       c.nom AS `Nom client`,\n       c.ville AS ville_livraison\nFROM client AS c\nWHERE c.siren IS NULL;"
    },
    resultat: [["code", "Nom client", "ville_livraison"], ["C003", "Bleu Lagon", "Nice"], ["C005", "Pool & Garden", "Genève"]],
    piege: "Sur SQL Server et MySQL, l'alias n'existe pas encore dans `WHERE` : `WHERE ville_livraison = 'Nice'` plante (Snowflake l'accepte). Et une virgule oubliée, `SELECT nom ville`, renomme `nom` sans erreur : écris toujours `AS`.",
    motsCles: ["alias", "renommer", "nom", "colonne", "titre", "en-tête", "surnom", "abréviation", "crochets", "guillemets", "libellé", "nommer", "appeler"],
    voirAussi: ["select", "from", "order-by"],
    module: "m01"
  },
  {
    id: "order-by",
    nom: "ORDER BY",
    type: "mot-clé",
    categorie: "Requête",
    definition: "Trie les lignes du résultat : du plus petit au plus grand (ASC), ou l'inverse (DESC).",
    moteurs: {
      sqlserver: "`ORDER BY col [ASC | DESC]` ; en `ASC`, les NULL sortent en premier",
      snowflake: "`ORDER BY col [ASC | DESC]` ; en `ASC`, les NULL sortent en dernier ; `NULLS FIRST` ou `NULLS LAST` pour choisir",
      mysql: "`ORDER BY col [ASC | DESC]` ; en `ASC`, les NULL sortent en premier, comme sur SQL Server"
    },
    noms: ["ASC", "DESC", "NULLS FIRST", "NULLS LAST"],
    exemple: "SELECT nom, ville\nFROM client\nWHERE pays = 'FR' AND type = 'PRO'\nORDER BY ville;",
    resultat: [["nom", "ville"], ["Camping Les Flots", null], ["Piscines Dumont", "Grenoble"], ["Piscines Dumont", "Lyon"], ["Hydro Sud", "Montpellier"], ["Bleu Lagon", "Nice"]],
    piege: "Sans `ORDER BY`, aucun ordre n'est garanti, même si le résultat « a l'air » trié : un rapport ou un fichier EDI peut changer d'ordre du jour au lendemain. Ici, Snowflake mettrait Camping Les Flots (ville vide) en dernier.",
    motsCles: ["trier", "tri", "classer", "ordre", "ranger", "croissant", "décroissant", "alphabétique", "sort", "premier", "dernier", "inverser", "classement"],
    voirAussi: ["top", "offset-fetch", "distinct", "select"],
    module: "m01"
  },
  {
    id: "top",
    nom: "TOP",
    type: "mot-clé",
    categorie: "Requête",
    definition: "Garde seulement les n premières lignes du résultat, une fois triées.",
    moteurs: {
      sqlserver: "`SELECT TOP (3) …` ; `TOP (4) WITH TIES` garde aussi les ex aequo de la dernière place",
      snowflake: "`LIMIT 3` à la fin, ou `SELECT TOP 3 …` ; pas de `WITH TIES`",
      mysql: "Pas de TOP : `LIMIT 3` à la fin ; pas de `WITH TIES`"
    },
    noms: ["LIMIT", "WITH TIES"],
    exemple: "SELECT TOP (3) num_cde, montant_ht\nFROM commande\nORDER BY montant_ht DESC;",
    exemples: {
      snowflake: "SELECT num_cde, montant_ht\nFROM commande\nORDER BY montant_ht DESC\nLIMIT 3;",
      mysql: "SELECT num_cde, montant_ht\nFROM commande\nORDER BY montant_ht DESC\nLIMIT 3;"
    },
    resultat: [["num_cde", "montant_ht"], ["CDE-1007", "7950.00"], ["CDE-1001", "4780.00"], ["CDE-1003", "2385.00"]],
    piege: "Sans `ORDER BY`, `TOP` prend 3 lignes quelconques, qui changent d'un jour à l'autre. Et pour « les 4 plus grosses », CDE-1002 et CDE-1006 sont ex aequo à 1290.00 : `TOP (4)` en garde une au hasard, `TOP (4) WITH TIES` garde les deux.",
    motsCles: ["limiter", "premières", "lignes", "nombre", "meilleurs", "classement", "palmarès", "aequo", "égalité", "limit", "dernières", "récentes", "grosses", "plus"],
    voirAussi: ["order-by", "offset-fetch", "distinct"],
    module: "m01"
  },
  {
    id: "offset-fetch",
    nom: "OFFSET … FETCH",
    type: "mot-clé",
    categorie: "Requête",
    definition: "Saute les n premières lignes triées, puis garde les suivantes : pour afficher page par page.",
    moteurs: {
      sqlserver: "`ORDER BY … OFFSET 3 ROWS FETCH NEXT 3 ROWS ONLY` ; `ORDER BY` obligatoire",
      snowflake: "`LIMIT 3 OFFSET 3`, ou la même forme que SQL Server",
      mysql: "Pas de FETCH : `LIMIT 3 OFFSET 3`, ou `LIMIT 3, 3` (le saut d'abord, puis le nombre)"
    },
    noms: ["OFFSET", "FETCH", "FETCH NEXT", "LIMIT OFFSET"],
    exemple: "-- 2e page, 3 commandes par page\nSELECT num_cde, date_cde\nFROM commande\nORDER BY date_cde\nOFFSET 3 ROWS FETCH NEXT 3 ROWS ONLY;",
    exemples: {
      snowflake: "-- 2e page, 3 commandes par page\nSELECT num_cde, date_cde\nFROM commande\nORDER BY date_cde\nLIMIT 3 OFFSET 3;",
      mysql: "-- 2e page, 3 commandes par page\nSELECT num_cde, date_cde\nFROM commande\nORDER BY date_cde\nLIMIT 3 OFFSET 3;"
    },
    resultat: [["num_cde", "date_cde"], ["CDE-1004", "2026-03-12"], ["CDE-1005", "2026-04-01"], ["CDE-1006", "2026-04-03"]],
    piege: "Trie toujours sur une colonne unique (un id) : avec des ex aequo, une ligne peut sortir sur deux pages, ou sur aucune. Et à la page 5 000, `OFFSET` relit tout ce qui précède : pagine plutôt par clé, `WHERE id > @dernier_id ORDER BY id`.",
    motsCles: ["pagination", "page", "paginer", "sauter", "ignorer", "suivantes", "décaler", "offset", "fetch", "skip", "suite", "défiler", "lot", "tranche"],
    voirAussi: ["top", "order-by"],
    module: "m01"
  },
  {
    id: "distinct",
    nom: "DISTINCT",
    type: "mot-clé",
    categorie: "Requête",
    definition: "Retire les lignes en double : chaque combinaison de valeurs ne sort qu'une fois.",
    moteurs: {
      sqlserver: "`SELECT DISTINCT col1, col2` ; compter les valeurs différentes : `COUNT(DISTINCT col)`",
      snowflake: "`SELECT DISTINCT col1, col2` (même règle)",
      mysql: "`SELECT DISTINCT col1, col2` (même règle)"
    },
    noms: [],
    exemple: "SELECT DISTINCT type, statut\nFROM flux_edi\nORDER BY type, statut;",
    resultat: [["type", "statut"], ["DESADV", "REJET"], ["INVOIC", "OK"], ["ORDERS", "OK"], ["ORDERS", "REJET"]],
    piege: "`DISTINCT` compare la ligne entière : ORDERS sort deux fois (OK et REJET). L'ajouter pour cacher les doublons d'une jointure rend les lignes propres, mais les totaux restent faux : cherche d'abord d'où viennent les doublons.",
    motsCles: ["doublon", "doublons", "enlever les doublons", "unique", "dédoublonner", "différentes", "valeurs", "répétition", "éliminer", "supprimer", "distinctes", "fois", "liste", "dedup"],
    voirAussi: ["select", "order-by", "top"],
    module: "m01"
  }
]);
