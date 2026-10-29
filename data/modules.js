// Catalogue du parcours. Chaque module a son fichier de questions dans data/.
// Un module sans fichier de questions s'affiche comme "à venir".
// Les fiches de cours sont dans data/cours/mXX.js.
window.LEARNSQL = { modules: [
  { id: "m01", titre: "Les bases du SELECT", resume: "SELECT, FROM, ORDER BY, TOP / LIMIT, ordre d'exécution.", niveau: "Débutant" },
  { id: "m02", titre: "Filtrer et gérer NULL", resume: "WHERE, AND / OR, LIKE, BETWEEN, IN, le piège du NULL.", niveau: "Débutant" },
  { id: "m03", titre: "Fonctions, CASE et types", resume: "Texte, dates, CAST / CONVERT, CASE, types numériques.", niveau: "Débutant" },
  { id: "m04", titre: "Agrégats et GROUP BY", resume: "COUNT, SUM, AVG, GROUP BY, HAVING, ROLLUP.", niveau: "Intermédiaire" },
  { id: "m05", titre: "Les jointures", resume: "INNER, LEFT, FULL, CROSS, anti-jointure, pièges de doublons.", niveau: "Intermédiaire" },
  { id: "m06", titre: "Sous-requêtes et CTE", resume: "IN, EXISTS, sous-requêtes corrélées, WITH, CTE récursive.", niveau: "Intermédiaire" },
  { id: "m07", titre: "Opérateurs ensemblistes", resume: "UNION, UNION ALL, INTERSECT, EXCEPT / MINUS.", niveau: "Intermédiaire" },
  { id: "m08", titre: "Fonctions de fenêtrage", resume: "ROW_NUMBER, RANK, LAG, LEAD, SUM OVER, QUALIFY.", niveau: "Avancé" },
  { id: "m09", titre: "Modifier les données", resume: "INSERT, UPDATE, DELETE, MERGE, OUTPUT.", niveau: "Intermédiaire" },
  { id: "m10", titre: "Tables, types et contraintes", resume: "CREATE TABLE, clés, contraintes, choix des types.", niveau: "Intermédiaire" },
  { id: "m11", titre: "Transactions et verrous", resume: "BEGIN / COMMIT / ROLLBACK, isolation, blocages, deadlocks.", niveau: "Avancé" },
  { id: "m12", titre: "Index et performance SQL Server", resume: "Index cluster / non cluster, SARGable, plan d'exécution, statistiques.", niveau: "Avancé" },
  { id: "m13", titre: "Programmer en T-SQL", resume: "Variables, procédures stockées, TRY / CATCH, fonctions, SQL dynamique.", niveau: "Avancé" },
  { id: "m14", titre: "Spécificités Snowflake", resume: "Warehouses, micro-partitions, Time Travel, VARIANT, clustering.", niveau: "Avancé" },
  { id: "m15", titre: "Modélisation des données", resume: "Normalisation, modèle en étoile, faits et dimensions.", niveau: "Avancé" },
  { id: "m16", titre: "Bonnes pratiques et anti-patterns", resume: "Lisibilité, curseurs, fonctions scalaires, conventions.", niveau: "Expert" },
  { id: "dv01", titre: "Le cycle de vente", resume: "Commande, encours client, BL, facture et avoir dans Divalto 10.13.", niveau: "Débutant" }
], questions: {}, cours: {} };
