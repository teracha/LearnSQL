LEARNSQL.cours.m07 = {
  intro: "Les opérateurs ensemblistes empilent ou comparent les résultats de deux requêtes. Très utiles pour comparer deux sources : ERP contre EDI, ancienne contre nouvelle version d'une table.",
  sections: [
    {
      titre: "UNION et UNION ALL : empiler",
      exemple: "SELECT code, libelle, 'ERP' AS source FROM erp.article\nUNION ALL\nSELECT code, libelle, 'EDI' FROM edi.article;",
      points: [
        "`UNION ALL` garde toutes les lignes, doublons compris. Rapide.",
        "`UNION` supprime les doublons. Plus lent (tri ou hachage).",
        "Par défaut, utilise UNION ALL. UNION seulement si tu veux dédoublonner.",
        "Même nombre de colonnes, types compatibles, dans le même ordre.",
        "Les noms de colonnes viennent de la 1re requête.",
        "Un seul ORDER BY, tout à la fin."
      ],
      retenir: "UNION ALL par défaut. UNION = UNION ALL + DISTINCT."
    },
    {
      titre: "INTERSECT : ce qui est des deux côtés",
      exemple: "SELECT client_id FROM dbo.commande WHERE annee = 2025\nINTERSECT\nSELECT client_id FROM dbo.commande WHERE annee = 2026;",
      resultat: "les clients fidèles, présents en 2025 ET en 2026.",
      points: [
        "Garde les lignes présentes dans les deux résultats.",
        "Le résultat est sans doublon.",
        "Compare des lignes entières : toutes les colonnes doivent être égales."
      ],
      retenir: "INTERSECT = présent des deux côtés."
    },
    {
      titre: "EXCEPT / MINUS : ce qui manque",
      exemple: "-- Articles de l'ERP absents de l'EDI\nSELECT code FROM erp.article\nEXCEPT\nSELECT code FROM edi.article;",
      points: [
        "Garde les lignes du 1er résultat absentes du 2e.",
        "L'ordre compte : A EXCEPT B ≠ B EXCEPT A.",
        "Snowflake accepte aussi `MINUS` (même chose).",
        "Le résultat est sans doublon."
      ],
      retenir: "A EXCEPT B = dans A, pas dans B."
    },
    {
      titre: "NULL dans les ensembles",
      exemple: "SELECT code, ville FROM ancienne_version\nEXCEPT\nSELECT code, ville FROM nouvelle_version;",
      points: [
        "Ici, deux NULL sont considérés comme ÉGAUX. C'est différent du `=`.",
        "C'est pour ça qu'EXCEPT est parfait pour comparer deux tables : pas besoin de gérer les NULL.",
        "Avec une jointure, il faudrait des tests IS NULL partout."
      ],
      retenir: "Opérateurs ensemblistes : NULL = NULL. Idéal pour comparer des versions."
    },
    {
      titre: "Comparer deux tables complètement",
      exemple: "(SELECT * FROM v1 EXCEPT SELECT * FROM v2)\nUNION ALL\n(SELECT * FROM v2 EXCEPT SELECT * FROM v1);",
      resultat: "0 ligne = les deux tables sont identiques.",
      points: [
        "1re partie : ce qui est dans v1 mais pas dans v2.",
        "2e partie : l'inverse.",
        "Ajoute une colonne 'v1' / 'v2' pour savoir d'où vient la différence.",
        "Mets des parenthèses : les priorités entre opérateurs sont un piège."
      ],
      retenir: "Recette de migration : A EXCEPT B, puis B EXCEPT A."
    }
  ],
  differences: [
    ["Différence", "`EXCEPT`", "`EXCEPT` ou `MINUS`"],
    ["NULL dans UNION / EXCEPT / INTERSECT", "NULL = NULL", "NULL = NULL"]
  ]
};
