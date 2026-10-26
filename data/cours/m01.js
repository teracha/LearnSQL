LEARNSQL.cours.m01 = {
  intro: "Une requête SELECT lit des données sans rien modifier. C'est la base de tout. Ici, on apprend à bien l'écrire, et surtout à comprendre dans quel ordre le moteur la lit.",
  sections: [
    {
      titre: "Lire une table",
      exemple: "SELECT nom, ville\nFROM dbo.client;",
      resultat: "toutes les lignes de la table client, avec 2 colonnes : nom et ville.",
      points: [
        "`SELECT` dit quelles colonnes afficher.",
        "`FROM` dit dans quelle table lire.",
        "Préfixe le schéma : `dbo.client` (SQL Server) ou `VENTES.CLIENT` (Snowflake).",
        "Évite `SELECT *` en production : trop de colonnes, et ça casse si la table change."
      ],
      retenir: "Liste toujours les colonnes dont tu as besoin."
    },
    {
      titre: "L'ordre d'exécution",
      exemple: "/*5*/ SELECT client_id, SUM(montant) AS total\n/*1*/ FROM commande\n/*2*/ WHERE statut <> 'ANNULEE'\n/*3*/ GROUP BY client_id\n/*4*/ HAVING SUM(montant) > 10000\n/*6*/ ORDER BY total DESC;",
      points: [
        "On écrit dans un ordre, le moteur lit dans un autre.",
        "Ordre du moteur : FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → TOP / LIMIT.",
        "Un alias créé dans SELECT n'existe qu'après SELECT.",
        "Sur SQL Server, l'alias n'est donc utilisable que dans `ORDER BY`.",
        "Snowflake est plus souple : il accepte l'alias dans WHERE, GROUP BY et HAVING."
      ],
      retenir: "FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY. L'alias du SELECT : seulement dans ORDER BY (SQL Server)."
    },
    {
      titre: "Les alias",
      exemple: "SELECT c.nom AS client, c.ville\nFROM dbo.client AS c;",
      points: [
        "Alias de colonne : renomme une colonne dans le résultat (`AS client`).",
        "Alias de table : un nom court pour la table (`AS c`).",
        "Une fois l'alias de table posé, il faut l'utiliser partout : `c.nom`, pas `client.nom`.",
        "Une colonne calculée doit avoir un alias. Dans une vue, c'est obligatoire."
      ],
      retenir: "Alias de table posé = alias obligatoire partout dans la requête."
    },
    {
      titre: "Trier avec ORDER BY",
      exemple: "SELECT nom, pays, ca\nFROM dbo.client\nORDER BY pays ASC, ca DESC;",
      resultat: "trié par pays, puis, dans chaque pays, du plus gros CA au plus petit.",
      points: [
        "Par défaut, le tri est croissant (`ASC`).",
        "Le 2e critère sert seulement à départager les égalités du 1er.",
        "Sans `ORDER BY`, l'ordre n'est JAMAIS garanti. Même s'il « a l'air » correct.",
        "Les NULL : en tête sur SQL Server (ASC), en fin sur Snowflake.",
        "Avec `DISTINCT`, on ne trie que sur des colonnes du SELECT."
      ],
      retenir: "Pas de ORDER BY = pas d'ordre garanti."
    },
    {
      titre: "Limiter le nombre de lignes",
      exemple: "-- SQL Server\nSELECT TOP (10) num_cde, montant\nFROM dbo.commande\nORDER BY montant DESC;\n\n-- Snowflake\nSELECT num_cde, montant\nFROM commande\nORDER BY montant DESC\nLIMIT 10;",
      points: [
        "SQL Server : `TOP (n)`, juste après SELECT.",
        "Snowflake : `LIMIT n`, à la fin. (`TOP` marche aussi sur Snowflake.)",
        "`LIMIT` n'existe PAS sur SQL Server.",
        "TOP / LIMIT s'appliquent après le tri : on obtient bien les 10 plus gros.",
        "`TOP (n) WITH TIES` garde les ex aequo de la dernière place.",
        "Pagination SQL Server : `OFFSET 20 ROWS FETCH NEXT 10 ROWS ONLY` (avec ORDER BY)."
      ],
      retenir: "TOP sur SQL Server, LIMIT sur Snowflake. Toujours avec un ORDER BY."
    },
    {
      titre: "Supprimer les doublons avec DISTINCT",
      exemple: "SELECT DISTINCT ville, pays\nFROM dbo.client;",
      resultat: "chaque couple ville + pays une seule fois.",
      points: [
        "DISTINCT porte sur toute la ligne du SELECT, pas sur la 1re colonne.",
        "Avec TOP : `SELECT DISTINCT TOP (5) …` (DISTINCT d'abord).",
        "Si tu ajoutes DISTINCT pour « corriger » des doublons, cherche d'abord d'où ils viennent (souvent une jointure)."
      ],
      retenir: "DISTINCT = lignes entières uniques."
    },
    {
      titre: "Écrire les valeurs et les noms",
      exemple: "SELECT [Code Client], 'O''Neil' AS nom_test\nFROM dbo.client\nWHERE code_postal = '69110';",
      points: [
        "Texte : entre apostrophes simples `'…'`.",
        "Une apostrophe dans le texte : on la double → `'O''Neil'`.",
        "Nom spécial (espace, mot réservé) : `[Code Client]` sur SQL Server, `\"Code Client\"` sur Snowflake.",
        "Sur Snowflake, un nom sans guillemets est mis en MAJUSCULES. Avec guillemets, la casse devient obligatoire.",
        "Compare avec le bon type : `'69110'` pour un VARCHAR, sinon conversion (et erreur avec '2A004').",
        "Commentaires : `-- une ligne` et `/* plusieurs lignes */`."
      ],
      retenir: "Texte entre '…', apostrophe doublée. Noms spéciaux entre [ ] (SQL Server) ou \" \" (Snowflake)."
    }
  ],
  differences: [
    ["Limiter les lignes", "`TOP (n)`", "`LIMIT n` (TOP accepté)"],
    ["Alias dans WHERE / GROUP BY", "Interdit", "Accepté"],
    ["NULL dans ORDER BY ASC", "En premier", "En dernier"],
    ["Nom spécial", "`[Mon Nom]`", "`\"Mon Nom\"`"],
    ["Casse des noms", "Selon la collation", "MAJUSCULES si sans guillemets"],
    ["Toutes les colonnes sauf…", "Impossible", "`SELECT * EXCLUDE (col)`"]
  ]
};
