// Super dico SQL — catégorie « Ensembles » (étape 2, 05/11/2026). Format : docs/dico.md.
// Résultats calculés avec SQLite sur docs/base-exemple.sql et relancés sur un vrai serveur MySQL 8.0.46 (copie ventes_a) :
// scripts verif_a.py et mysql_a.py (scratchpad dico/a).
// Sources (vérifiées le 05/11/2026) :
// - SQL Server, learn.microsoft.com/sql/t-sql : language-elements/set-operators-union-transact-sql (ALL garde les
//   doublons ; même nombre et même ordre de colonnes, types compatibles), language-elements/set-operators-except-and-
//   intersect-transact-sql (sans doublon ; deux NULL sont égaux ; noms de colonnes de la requête de gauche ; priorité :
//   parenthèses, puis INTERSECT, puis EXCEPT et UNION de gauche à droite ; pas de ALL),
//   queries/select-order-by-clause-transact-sql (un seul ORDER BY, à la fin).
// - Snowflake, docs.snowflake.com/en/sql-reference/operators-query : UNION [ALL] et UNION [ALL] BY NAME (colonnes
//   associées par nom), INTERSECT, MINUS = EXCEPT, INTERSECT plus prioritaire ; pas de INTERSECT ALL (guide SnowConvert).
// - MySQL 8, dev.mysql.com/doc/refman/8.0/en : set-operations.html, intersect.html, except.html (INTERSECT et EXCEPT en
//   8.0.31, DISTINCT par défaut, ALL possible, INTERSECT plus prioritaire). Testé sur le serveur : INTERSECT ALL et
//   EXCEPT ALL marchent, MINUS est refusé (erreur 1064), NOT IN avec un NULL dans la liste renvoie 0 ligne.
// docs.snowflake.com n'était pas joignable depuis la session : vérifié par extraits de recherche.
LEARNSQL.dico = (LEARNSQL.dico || []).concat([
  {
    id: "union",
    nom: "UNION",
    type: "mot-clé",
    categorie: "Ensembles",
    definition: "Empile les résultats de deux requêtes et retire les lignes en double.",
    moteurs: {
      sqlserver: "`SELECT … UNION SELECT …` : même nombre de colonnes, types compatibles ; un seul `ORDER BY`, à la fin",
      snowflake: "Même écriture ; `UNION BY NAME` associe les colonnes par leur nom",
      mysql: "Même écriture"
    },
    noms: [],
    exemple: "-- Commandes qui ont au moins un document : flux EDI ou facture\nSELECT cde_id FROM flux_edi WHERE cde_id IS NOT NULL\nUNION\nSELECT cde_id FROM facture\nORDER BY cde_id;",
    resultat: [["cde_id"], [1], [2], [3], [7], [8]],
    piege: "UNION retire aussi les vraies lignes en double : deux ventes identiques (même client, même jour, même montant) n'en font plus qu'une, et le CA baisse sans erreur. Pour empiler des montants, écris `UNION ALL`.",
    motsCles: ["empiler", "combiner", "fusionner", "ajouter", "assembler", "réunir", "union", "doublons", "deux requêtes", "deux tables", "concaténer", "superposer", "regrouper"],
    voirAussi: ["union-all", "intersect", "except", "distinct"],
    module: "m07"
  },
  {
    id: "union-all",
    nom: "UNION ALL",
    type: "mot-clé",
    categorie: "Ensembles",
    definition: "Empile les résultats de deux requêtes en gardant toutes les lignes, doublons compris.",
    moteurs: {
      sqlserver: "`SELECT … UNION ALL SELECT …` : garde tout, sans chercher les doublons, donc plus rapide que `UNION`",
      snowflake: "Même écriture ; `UNION ALL BY NAME` associe les colonnes par leur nom, pas par leur place",
      mysql: "Même écriture"
    },
    noms: ["UNION ALL BY NAME"],
    exemple: "SELECT cde_id, COUNT(*) AS nb_documents\nFROM (SELECT cde_id FROM flux_edi WHERE cde_id IS NOT NULL\n      UNION ALL\n      SELECT cde_id FROM facture) AS docs\nGROUP BY cde_id\nORDER BY cde_id;",
    resultat: [["cde_id", "nb_documents"], [1, 3], [2, 1], [3, 2], [7, 2], [8, 1]],
    piege: "Les colonnes sont associées par leur place, pas par leur nom : `SELECT nom, ville … UNION ALL SELECT ville, nom …` mélange villes et noms, sans erreur. Écris les colonnes dans le même ordre, et jamais `SELECT *`.",
    motsCles: ["empiler", "combiner", "ajouter", "assembler", "réunir", "union all", "tout garder", "garder", "deux requêtes", "deux tables", "superposer", "historique", "archive", "sociétés"],
    voirAussi: ["union", "full-outer-join", "group-by", "intersect"],
    module: "m07"
  },
  {
    id: "intersect",
    nom: "INTERSECT",
    type: "mot-clé",
    categorie: "Ensembles",
    definition: "Garde seulement les lignes présentes dans les deux résultats.",
    moteurs: {
      sqlserver: "`SELECT … INTERSECT SELECT …` : sans doublon ; passe avant `UNION` et `EXCEPT` (mets des parenthèses)",
      snowflake: "Même écriture ; pas de `INTERSECT ALL`",
      mysql: "`INTERSECT` depuis MySQL 8.0.31 ; `INTERSECT ALL` garde les doublons"
    },
    noms: ["INTERSECT ALL"],
    exemple: "-- Articles en stock à Lyon (dépôt 1) ET à Nantes (dépôt 3)\nSELECT article_id FROM stock_depot WHERE depot_id = 1\nINTERSECT\nSELECT article_id FROM stock_depot WHERE depot_id = 3\nORDER BY article_id;",
    resultat: [["article_id"], [1], [3], [7], [8]],
    piege: "INTERSECT compare la ligne entière : ajoute `qte` aux deux SELECT, et il ne reste rien, car aucun article n'a la même quantité dans les deux dépôts. Mets seulement les colonnes qui doivent être égales.",
    motsCles: ["commun", "communs", "les deux", "à la fois", "présent", "partout", "intersection", "croiser", "recouper", "comparer", "deux résultats", "en même temps", "fidèles"],
    voirAussi: ["except", "union", "inner-join", "exists"],
    module: "m07"
  },
  {
    id: "except",
    nom: "EXCEPT",
    type: "mot-clé",
    categorie: "Ensembles",
    definition: "Garde les lignes du premier résultat qui sont absentes du second.",
    moteurs: {
      sqlserver: "`SELECT … EXCEPT SELECT …` : les lignes du 1er résultat absentes du 2e, sans doublon",
      snowflake: "`EXCEPT`, ou `MINUS` (même chose)",
      mysql: "`EXCEPT` depuis MySQL 8.0.31 ; `EXCEPT ALL` garde les doublons ; pas de `MINUS`"
    },
    noms: ["MINUS", "EXCEPT ALL"],
    exemple: "-- Commandes sans aucun flux EDI\nSELECT id FROM commande\nEXCEPT\nSELECT cde_id FROM flux_edi\nORDER BY id;",
    resultat: [["id"], [2], [4], [5], [6], [8]],
    piege: "`WHERE id NOT IN (SELECT cde_id FROM flux_edi)` renvoie 0 ligne : le flux 3 a un `cde_id` NULL, et un NULL dans la liste bloque tout. EXCEPT n'a pas ce piège ; mais l'ordre compte : `flux EXCEPT commande` répond à une autre question.",
    motsCles: ["manquant", "manquants", "absent", "absents", "différence", "soustraire", "moins", "minus", "sauf", "comparer", "écart", "écarts", "rapprochement", "contrôle", "orphelins", "lignes manquantes", "différence entre deux tables", "comparer deux tables"],
    voirAussi: ["intersect", "union", "left-join", "in", "exists"],
    module: "m07"
  }
]);
