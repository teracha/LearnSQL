LEARNSQL.cours.m04 = {
  intro: "Les agrégats résument plusieurs lignes en une seule valeur : un total, un nombre, une moyenne. GROUP BY permet de faire ce résumé par client, par mois, par article…",
  sections: [
    {
      titre: "Les fonctions d'agrégat",
      exemple: "SELECT\n  COUNT(*)              AS nb_lignes,\n  COUNT(remise)         AS nb_avec_remise,\n  COUNT(DISTINCT client_id) AS nb_clients,\n  SUM(montant)          AS ca,\n  AVG(montant)          AS panier_moyen\nFROM dbo.commande;",
      points: [
        "`COUNT(*)` compte les lignes. `COUNT(col)` compte les valeurs non NULL.",
        "SUM, AVG, MIN, MAX ignorent les NULL.",
        "SUM sur aucune ligne = NULL, pas 0 → `COALESCE(SUM(x), 0)`.",
        "SQL Server : AVG d'un INT renvoie un INT → `AVG(col * 1.0)`.",
        "SUM d'un INT peut dépasser la limite → `SUM(CAST(col AS bigint))`.",
        "`COUNT(1)` = `COUNT(*)` : aucune différence de vitesse."
      ],
      retenir: "COUNT(*) = lignes, COUNT(col) = valeurs non NULL. SUM de rien = NULL."
    },
    {
      titre: "GROUP BY : un résumé par groupe",
      exemple: "SELECT client_id, COUNT(*) AS nb_cdes, SUM(montant) AS ca\nFROM dbo.commande\nWHERE statut <> 'ANNULEE'\nGROUP BY client_id;",
      resultat: "une ligne par client.",
      points: [
        "Chaque colonne du SELECT est soit dans GROUP BY, soit dans un agrégat.",
        "SQL Server : GROUP BY avec l'expression complète (`YEAR(date_cde)`), pas l'alias.",
        "Tous les NULL forment un seul groupe.",
        "Filtre les lignes AVANT de grouper, dans WHERE."
      ],
      retenir: "Colonne du SELECT = groupée ou agrégée. Pas d'autre choix."
    },
    {
      titre: "WHERE ou HAVING ?",
      exemple: "SELECT client_id, SUM(montant) AS ca\nFROM dbo.commande\nWHERE annee = 2026            -- filtre les lignes\nGROUP BY client_id\nHAVING SUM(montant) > 10000;  -- filtre les groupes",
      points: [
        "WHERE : avant le regroupement, sur les lignes.",
        "HAVING : après le regroupement, sur les résultats des agrégats.",
        "Un agrégat dans WHERE = erreur.",
        "Trouver des doublons : `GROUP BY cle HAVING COUNT(*) > 1`."
      ],
      retenir: "WHERE filtre les lignes, HAVING filtre les groupes."
    },
    {
      titre: "L'agrégation conditionnelle",
      exemple: "SELECT client_id,\n  SUM(CASE WHEN annee = 2025 THEN montant ELSE 0 END) AS ca_2025,\n  SUM(CASE WHEN annee = 2026 THEN montant ELSE 0 END) AS ca_2026,\n  COUNT(CASE WHEN statut = 'LIVRE' THEN 1 END)        AS nb_livrees\nFROM dbo.commande\nGROUP BY client_id;",
      points: [
        "Un CASE dans un agrégat = un calcul par condition, en une seule lecture.",
        "Piège : `COUNT(CASE … THEN 1 ELSE 0 END)` compte TOUT (0 n'est pas NULL).",
        "Avec COUNT : pas de ELSE. Avec SUM : ELSE 0.",
        "Snowflake : `COUNT_IF(condition)`."
      ],
      retenir: "Pivot simple : SUM(CASE WHEN … THEN x ELSE 0 END)."
    },
    {
      titre: "Pièges de calcul",
      exemple: "-- Moyenne des moyennes : FAUX\n-- Région A : 2 cdes à 100 €, Région B : 8 cdes à 50 €\n-- (100 + 50) / 2 = 75 €   ← faux\n-- 600 € / 10 cdes = 60 €  ← juste",
      points: [
        "Ne fais jamais la moyenne de moyennes : recalcule total / nombre.",
        "`SUM(DISTINCT x)` est presque toujours faux.",
        "`COUNT(*)` après un LEFT JOIN compte 1 pour un client sans commande → `COUNT(co.id)`.",
        "Médiane : `MEDIAN` (Snowflake), `PERCENTILE_CONT(0.5)` (SQL Server)."
      ],
      retenir: "Recalcule les ratios à partir des totaux."
    },
    {
      titre: "Sous-totaux : ROLLUP et GROUPING SETS",
      exemple: "SELECT region, pays, SUM(ca) AS ca,\n       GROUPING(pays) AS est_sous_total\nFROM dbo.vente\nGROUP BY ROLLUP (region, pays);",
      points: [
        "`ROLLUP (a, b)` : détail + sous-totaux par a + total général.",
        "`GROUPING SETS ((a), (b))` : plusieurs regroupements choisis, en une requête.",
        "`GROUPING(col) = 1` : la ligne est un total sur cette colonne.",
        "Concaténer des lignes : `STRING_AGG` (SQL Server), `LISTAGG` (Snowflake).",
        "Gros volumes : `APPROX_COUNT_DISTINCT` pour une estimation rapide."
      ],
      retenir: "ROLLUP = sous-totaux + total. GROUPING() les repère."
    },
    {
      titre: "Garder le détail : teaser des fenêtres",
      exemple: "SELECT cde_id, article, montant,\n       SUM(montant) OVER (PARTITION BY cde_id) AS total_cde\nFROM dbo.ligne_cde;",
      points: [
        "GROUP BY réduit le nombre de lignes.",
        "`OVER (PARTITION BY …)` calcule sur le groupe mais garde chaque ligne.",
        "« La dernière commande de chaque client » : ROW_NUMBER (module 8), pas GROUP BY."
      ],
      retenir: "Besoin du détail + du total : fonction de fenêtrage."
    }
  ],
  differences: [
    ["Alias dans GROUP BY / HAVING", "Interdit", "Accepté"],
    ["AVG d'un entier", "Entier (tronqué)", "Décimal"],
    ["Compter selon condition", "`SUM(CASE …)`", "`COUNT_IF(…)`"],
    ["Concaténer des lignes", "`STRING_AGG`", "`LISTAGG`"],
    ["Médiane", "`PERCENTILE_CONT(0.5)`", "`MEDIAN`"]
  ]
};
