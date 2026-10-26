LEARNSQL.cours.m06 = {
  intro: "Une sous-requête est une requête dans une requête. Une CTE (WITH) fait la même chose, mais en plus lisible. Elles servent à découper un problème compliqué en étapes simples.",
  sections: [
    {
      titre: "La sous-requête scalaire",
      exemple: "SELECT num_cde, montant,\n       (SELECT AVG(montant) FROM dbo.commande) AS moyenne\nFROM dbo.commande;",
      points: [
        "Elle renvoie UNE seule valeur (1 ligne, 1 colonne).",
        "Si elle renvoie plusieurs lignes : erreur.",
        "Si elle ne renvoie rien : NULL."
      ],
      retenir: "Sous-requête scalaire = une seule valeur, sinon erreur."
    },
    {
      titre: "IN et EXISTS",
      exemple: "-- Clients qui ont commandé en 2026\nSELECT c.nom\nFROM dbo.client c\nWHERE EXISTS (\n  SELECT 1 FROM dbo.commande co\n  WHERE co.client_id = c.id AND co.annee = 2026\n);",
      points: [
        "`IN (sous-requête)` : la valeur est-elle dans la liste ?",
        "`EXISTS` : y a-t-il au moins une ligne ? Le contenu du SELECT n'a pas d'importance (`SELECT 1`).",
        "EXISTS s'arrête dès la 1re ligne trouvée.",
        "`NOT IN` + un NULL dans la liste = 0 ligne. `NOT EXISTS` n'a pas ce piège.",
        "IN et EXISTS ne créent pas de doublons, contrairement à un JOIN."
      ],
      retenir: "Pour « il existe / il n'existe pas » : EXISTS / NOT EXISTS."
    },
    {
      titre: "La sous-requête corrélée",
      exemple: "-- Commandes au-dessus de la moyenne DE LEUR client\nSELECT co.num_cde, co.montant\nFROM dbo.commande co\nWHERE co.montant > (\n  SELECT AVG(x.montant) FROM dbo.commande x\n  WHERE x.client_id = co.client_id\n);",
      points: [
        "Elle utilise une colonne de la requête du dessus (`co.client_id`).",
        "Logiquement, elle est recalculée pour chaque ligne.",
        "L'optimiseur la transforme souvent en jointure. Mais sur de gros volumes, vérifie le plan.",
        "Alternative souvent plus claire : une fonction de fenêtrage (module 8)."
      ],
      retenir: "Corrélée = dépend de la ligne en cours."
    },
    {
      titre: "La table dérivée (sous-requête dans FROM)",
      exemple: "SELECT t.annee, SUM(t.montant) AS ca\nFROM (\n  SELECT YEAR(date_cde) AS annee, montant\n  FROM dbo.commande\n) AS t\nGROUP BY t.annee;",
      points: [
        "Le résultat de la sous-requête devient une table temporaire.",
        "L'alias (`AS t`) est obligatoire sur SQL Server.",
        "Pratique pour nommer un calcul avant GROUP BY.",
        "Pas de ORDER BY dans une sous-requête sur SQL Server (sauf avec TOP)."
      ],
      retenir: "Sous-requête dans FROM = table temporaire, avec un alias obligatoire."
    },
    {
      titre: "La CTE : WITH",
      exemple: ";WITH ca_client AS (\n  SELECT client_id, SUM(montant) AS ca\n  FROM dbo.commande\n  GROUP BY client_id\n),\ngros AS (\n  SELECT client_id FROM ca_client WHERE ca > 10000\n)\nSELECT c.nom, cc.ca\nFROM gros g\nJOIN ca_client cc ON cc.client_id = g.client_id\nJOIN dbo.client c ON c.id = g.client_id;",
      points: [
        "Une CTE donne un nom à une étape. On la lit de haut en bas.",
        "Plusieurs CTE : séparées par des virgules, un seul WITH.",
        "Une CTE peut utiliser les CTE définies avant elle.",
        "SQL Server : l'instruction d'avant doit finir par `;` (d'où le `;WITH`).",
        "Elle n'existe que pour la requête qui suit.",
        "SQL Server ne la stocke pas : elle est recalculée à chaque utilisation. Gros résultat réutilisé → table temporaire `#t`."
      ],
      retenir: "CTE = sous-requête avec un nom, pour la lisibilité. Pas un cache."
    },
    {
      titre: "La CTE récursive : hiérarchies et nomenclatures",
      exemple: "WITH nomenclature AS (\n  -- Ancre : le produit fini\n  SELECT composant_id, quantite, 1 AS niveau\n  FROM dbo.bom WHERE parent_id = 'PISCINE-8M'\n  UNION ALL\n  -- Récursion : les composants des composants\n  SELECT b.composant_id, n.quantite * b.quantite, n.niveau + 1\n  FROM dbo.bom b\n  JOIN nomenclature n ON b.parent_id = n.composant_id\n)\nSELECT * FROM nomenclature;",
      points: [
        "Deux parties : l'ancre (point de départ) UNION ALL la partie récursive.",
        "Elle s'arrête quand la partie récursive ne trouve plus rien.",
        "SQL Server : 100 niveaux max par défaut → `OPTION (MAXRECURSION 0)` pour lever la limite.",
        "Une boucle dans les données (A → B → A) = récursion infinie. Garde un compteur de niveau.",
        "Snowflake : `WITH RECURSIVE` (conseillé), ou `CONNECT BY`."
      ],
      retenir: "Hiérarchie, nomenclature, organigramme : CTE récursive."
    }
  ],
  differences: [
    ["Mot-clé récursif", "`WITH` seul", "`WITH RECURSIVE` (conseillé)"],
    ["Avant WITH", "`;` obligatoire si instruction avant", "Pas de contrainte"],
    ["Hiérarchie alternative", "—", "`CONNECT BY`"]
  ]
};
