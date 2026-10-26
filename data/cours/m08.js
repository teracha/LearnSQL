LEARNSQL.cours.m08 = {
  intro: "Les fonctions de fenêtrage calculent sur un groupe de lignes, sans les fusionner. Classement, cumul, comparaison avec la ligne d'avant : c'est l'outil le plus puissant du SQL moderne.",
  sections: [
    {
      titre: "OVER : calculer sans perdre le détail",
      exemple: "SELECT num_cde, client_id, montant,\n  SUM(montant) OVER (PARTITION BY client_id) AS total_client,\n  montant * 100.0 / SUM(montant) OVER ()      AS pct_du_total\nFROM dbo.commande;",
      points: [
        "`OVER ()` : la fenêtre est toute la table.",
        "`PARTITION BY` : une fenêtre par groupe (comme GROUP BY, mais sans fusionner).",
        "Chaque ligne garde son détail ET reçoit le calcul.",
        "Les fonctions de fenêtrage sont calculées au moment du SELECT, après WHERE et GROUP BY."
      ],
      retenir: "GROUP BY fusionne. OVER garde les lignes."
    },
    {
      titre: "Numéroter et classer",
      exemple: "SELECT nom, ca,\n  ROW_NUMBER() OVER (ORDER BY ca DESC) AS rn,     -- 1, 2, 3, 4\n  RANK()       OVER (ORDER BY ca DESC) AS rk,     -- 1, 2, 2, 4\n  DENSE_RANK() OVER (ORDER BY ca DESC) AS drk     -- 1, 2, 2, 3\nFROM dbo.commercial;",
      points: [
        "`ROW_NUMBER` : numéro unique, même en cas d'égalité (ordre arbitraire entre ex aequo).",
        "`RANK` : ex aequo au même rang, puis un trou.",
        "`DENSE_RANK` : ex aequo au même rang, sans trou.",
        "`NTILE(4)` : découpe en 4 groupes (quartiles).",
        "Ajoute une colonne au ORDER BY pour départager et rendre ROW_NUMBER stable."
      ],
      retenir: "ROW_NUMBER unique, RANK avec trous, DENSE_RANK sans trous."
    },
    {
      titre: "La dernière ligne de chaque groupe",
      exemple: "WITH x AS (\n  SELECT *, ROW_NUMBER() OVER (\n           PARTITION BY client_id ORDER BY date_cde DESC) AS rn\n  FROM dbo.commande\n)\nSELECT * FROM x WHERE rn = 1;\n\n-- Snowflake : directement\nSELECT * FROM commande\nQUALIFY ROW_NUMBER() OVER (PARTITION BY client_id ORDER BY date_cde DESC) = 1;",
      points: [
        "On numérote dans chaque groupe, puis on garde le n° 1.",
        "Impossible de filtrer une fenêtre dans WHERE (elle est calculée après).",
        "SQL Server : passe par une CTE ou une sous-requête.",
        "Snowflake : `QUALIFY` filtre directement sur la fenêtre.",
        "Même méthode pour dédoublonner : garder rn = 1."
      ],
      retenir: "« La dernière X de chaque Y » : ROW_NUMBER + filtre rn = 1."
    },
    {
      titre: "Comparer avec la ligne d'avant : LAG / LEAD",
      exemple: "SELECT mois, ca,\n  LAG(ca)  OVER (ORDER BY mois) AS ca_mois_precedent,\n  ca - LAG(ca) OVER (ORDER BY mois) AS evolution,\n  LEAD(ca) OVER (ORDER BY mois) AS ca_mois_suivant\nFROM dbo.ca_mensuel;",
      points: [
        "`LAG(col)` : valeur de la ligne d'avant. `LEAD(col)` : de la ligne d'après.",
        "Pas de ligne d'avant : NULL. Valeur par défaut : `LAG(ca, 1, 0)`.",
        "`LAG(ca, 12)` : même mois l'an dernier (si aucun mois ne manque !).",
        "Pour comparer client par client : `PARTITION BY client_id`."
      ],
      retenir: "LAG = avant, LEAD = après. Pense au PARTITION BY."
    },
    {
      titre: "Cumuls et moyennes mobiles",
      exemple: "SELECT date_jour, ca,\n  SUM(ca) OVER (ORDER BY date_jour\n                ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS cumul,\n  AVG(ca) OVER (ORDER BY date_jour\n                ROWS BETWEEN 6 PRECEDING AND CURRENT ROW)         AS moy_7j\nFROM dbo.ca_jour;",
      points: [
        "ORDER BY dans OVER + un agrégat = un calcul « courant » (cumul).",
        "Le cadre dit quelles lignes prendre : `ROWS BETWEEN … AND …`.",
        "Sans cadre précisé, SQL Server utilise `RANGE` : les ex aequo sont additionnés ensemble. Précise `ROWS`.",
        "Moyenne mobile 7 jours : 6 lignes avant + la ligne courante.",
        "`LAST_VALUE` avec ORDER BY renvoie souvent la ligne courante (cadre par défaut). Précise `… AND UNBOUNDED FOLLOWING`."
      ],
      retenir: "Cumul : précise toujours ROWS BETWEEN … pour éviter les surprises."
    }
  ],
  differences: [
    ["Filtrer sur une fenêtre", "CTE / sous-requête", "`QUALIFY`"],
    ["Médiane en fenêtre", "`PERCENTILE_CONT(0.5) … OVER`", "`MEDIAN(x) OVER (…)`"],
    ["Concaténer en fenêtre", "Non", "`LISTAGG … OVER`"]
  ]
};
