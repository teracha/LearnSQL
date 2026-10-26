LEARNSQL.cours.m05 = {
  intro: "Une jointure relie deux tables : les commandes à leurs clients, les lignes à leurs articles. C'est la source n°1 des doublons et des montants faux dans les rapports.",
  sections: [
    {
      titre: "INNER JOIN : seulement ce qui correspond",
      exemple: "SELECT cl.nom, co.num_cde, co.montant\nFROM dbo.client AS cl\nINNER JOIN dbo.commande AS co ON co.client_id = cl.id;",
      points: [
        "On garde les lignes qui ont une correspondance des deux côtés.",
        "Un client sans commande disparaît.",
        "Avec des INNER JOIN, l'ordre des tables ne change pas le résultat.",
        "Écris toujours `JOIN … ON`, pas l'ancienne syntaxe `FROM a, b WHERE …`."
      ],
      retenir: "INNER = présent des deux côtés."
    },
    {
      titre: "LEFT JOIN : tout garder à gauche",
      exemple: "SELECT cl.nom, co.num_cde\nFROM dbo.client AS cl\nLEFT JOIN dbo.commande AS co\n       ON co.client_id = cl.id\n      AND co.annee = 2026;     -- filtre de droite dans le ON !",
      points: [
        "Tous les clients sont gardés. Sans commande : colonnes de droite à NULL.",
        "Un filtre sur la table de droite dans le WHERE annule le LEFT JOIN. Mets-le dans le ON.",
        "Un INNER JOIN après un LEFT JOIN peut aussi l'annuler.",
        "`A RIGHT JOIN B` = `B LEFT JOIN A`. Écris toujours des LEFT."
      ],
      retenir: "LEFT JOIN : les filtres de droite vont dans le ON."
    },
    {
      titre: "Trouver ce qui manque (anti-jointure)",
      exemple: "-- Clients sans commande\nSELECT cl.nom\nFROM dbo.client AS cl\nLEFT JOIN dbo.commande AS co ON co.client_id = cl.id\nWHERE co.id IS NULL;\n\n-- ou\nWHERE NOT EXISTS (SELECT 1 FROM dbo.commande co WHERE co.client_id = cl.id)",
      points: [
        "LEFT JOIN + `IS NULL` sur la clé de droite.",
        "Ou `NOT EXISTS`, souvent plus clair.",
        "« Ceux qui ont au moins un… » sans doublon : `EXISTS`."
      ],
      retenir: "Absent : LEFT JOIN + IS NULL, ou NOT EXISTS. Présent sans doublon : EXISTS."
    },
    {
      titre: "FULL OUTER JOIN : rapprocher deux sources",
      exemple: "SELECT COALESCE(e.num, d.num) AS num,\n       CASE WHEN e.num IS NULL THEN 'Manque ERP'\n            WHEN d.num IS NULL THEN 'Manque EDI'\n            ELSE 'OK' END AS etat\nFROM erp.commande AS e\nFULL OUTER JOIN edi.commande AS d ON d.num = e.num;",
      points: [
        "Garde tout, des deux côtés.",
        "Un côté à NULL = manquant de ce côté.",
        "`COALESCE(gauche.cle, droite.cle)` pour une clé toujours remplie."
      ],
      retenir: "Rapprochement ERP / EDI : FULL OUTER JOIN."
    },
    {
      titre: "Les doublons qui faussent les sommes",
      exemple: "-- 1 commande, 20 € de port, 4 lignes de détail\nSELECT SUM(co.frais_port)          -- 80 € au lieu de 20 € !\nFROM dbo.commande co\nJOIN dbo.ligne_cde li ON li.cde_id = co.id;",
      points: [
        "Jointure 1-N : les valeurs du côté « 1 » sont répétées N fois.",
        "Deux tables filles (commandes + paiements) : les deux sommes sont multipliées.",
        "Solution : agréger chaque table fille AVANT de joindre.",
        "Plus de lignes que prévu ? Clé non unique à droite, ou clé incomplète (ex. oubli de la société).",
        "Snowflake appelle ça une « exploding join » dans le Query Profile."
      ],
      retenir: "Vérifie la cardinalité. Agrège avant de joindre."
    },
    {
      titre: "Les autres jointures",
      exemple: "-- Auto-jointure : salarié + son manager\nSELECT s.nom, m.nom AS manager\nFROM dbo.salarie s\nLEFT JOIN dbo.salarie m ON m.id = s.manager_id;\n\n-- Non-équi : barème par tranche\nJOIN dbo.tranche t ON co.montant BETWEEN t.mini AND t.maxi",
      points: [
        "CROSS JOIN : toutes les combinaisons (3 × 5 = 15 lignes).",
        "Auto-jointure : même table, deux alias. Doublons : `a.id < b.id`.",
        "Le ON accepte toute condition : BETWEEN, <, >…",
        "Les clés NULL ne se joignent jamais.",
        "SQL Server : `CROSS APPLY` / `OUTER APPLY` (ex. 3 dernières commandes par client). Snowflake : `LATERAL`.",
        "Partir d'une table calendrier + LEFT JOIN pour afficher les jours sans vente."
      ],
      retenir: "Le ON accepte n'importe quelle condition. NULL ne se joint jamais."
    },
    {
      titre: "Jointures et performance",
      exemple: "-- Mauvais : types différents → conversion\nON article.code = stock.code_article   -- varchar = int\n\n-- Conflit de collation entre deux bases\nON a.code = b.code COLLATE French_CI_AS",
      points: [
        "Joins des colonnes du même type.",
        "Un OR dans le ON est souvent lent : pense à UNION.",
        "Plans SQL Server : Nested Loops (petit + index), Merge (triés), Hash Match (gros, non triés)."
      ],
      retenir: "Même type, même collation, condition simple = jointure rapide."
    }
  ],
  differences: [
    ["`USING (col)`", "Non", "Oui"],
    ["Sous-requête liée par ligne", "`CROSS APPLY` / `OUTER APPLY`", "`LATERAL`"],
    ["Comparaison NULL-safe", "`IS NOT DISTINCT FROM` (2022+)", "`IS NOT DISTINCT FROM`, `EQUAL_NULL`"],
    ["Diagnostic des doublons", "Plan d'exécution", "Query Profile (« exploding join »)"]
  ]
};
