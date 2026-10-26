LEARNSQL.cours.m15 = {
  intro: "Modéliser, c'est décider comment ranger les données. Un ERP range pour saisir vite et sans erreur. Un entrepôt de données (Snowflake + Power BI) range pour analyser vite. Ce ne sont pas les mêmes règles.",
  sections: [
    {
      titre: "Le problème des données répétées",
      exemple: "-- Table « à plat » : le nom du client est répété sur chaque commande\n-- num_cde | client_code | client_nom       | client_ville\n-- 1001    | C01         | Piscines Dupont  | Lyon\n-- 1002    | C01         | Piscines Dupont  | Lyon\n-- 1003    | C01         | Piscine Dupont   | Lyon   ← faute de frappe",
      points: [
        "Répéter une information = risque d'incohérence (anomalie de mise à jour).",
        "Le client déménage : il faut modifier toutes ses commandes.",
        "Solution : une table client, et la commande ne garde que `client_id`."
      ],
      retenir: "Une information = un seul endroit."
    },
    {
      titre: "La normalisation (pour l'ERP)",
      exemple: "client   (id, code, nom, ville)\ncommande (id, num_cde, client_id → client, date_cde)\nligne    (id, cde_id → commande, article_id → article, qte, prix)\narticle  (id, code, libelle, famille_id → famille)",
      points: [
        "1re forme normale : une valeur par case (pas de liste « A1, A2, A3 » dans une colonne).",
        "2e forme normale : chaque colonne dépend de TOUTE la clé.",
        "3e forme normale : pas de dépendance entre colonnes non clés (la ville ne dépend pas de la commande, mais du client).",
        "Idéal pour la saisie (OLTP) : pas de doublon, intégrité garantie.",
        "Mais beaucoup de jointures pour analyser."
      ],
      retenir: "OLTP (ERP) : normalisé, pour saisir sans erreur."
    },
    {
      titre: "Le modèle en étoile (pour l'analyse)",
      exemple: "fait_vente (date_id, client_id, article_id, depot_id,   -- clés\n            qte, montant_ht, marge)                   -- mesures\n\ndim_date    (date_id, jour, mois, trimestre, annee, ...)\ndim_client  (client_id, code, nom, ville, region, segment)\ndim_article (article_id, code, libelle, famille, gamme)",
      points: [
        "Au centre : la table de faits. Elle contient des clés et des mesures (nombres).",
        "Autour : les dimensions. Elles décrivent (qui, quoi, où, quand).",
        "Les dimensions sont « à plat » (dénormalisées) : famille et gamme dans dim_article.",
        "Peu de jointures, faciles à comprendre : c'est le modèle que Power BI préfère.",
        "« Snowflake schema » (flocon) = dimensions normalisées. Rien à voir avec le produit Snowflake."
      ],
      retenir: "Analyse : une table de faits au centre, des dimensions autour."
    },
    {
      titre: "Le grain : la 1re décision",
      exemple: "-- Grain = « une ligne par ligne de facture »\n-- Grain = « une ligne par client et par jour »\n-- Grain = « une photo du stock par article, par dépôt, par fin de mois »",
      points: [
        "Le grain dit ce que représente UNE ligne de la table de faits.",
        "Le décider AVANT de choisir les colonnes.",
        "Mélanger deux grains dans une table = doublons et totaux faux.",
        "Grain le plus fin possible : on peut toujours agréger ensuite."
      ],
      retenir: "Une table de faits = un grain, écrit noir sur blanc."
    },
    {
      titre: "Les types de mesures",
      exemple: "montant_ht   -- additif : on peut sommer sur tout\nqte_stock    -- semi-additif : somme par dépôt OK, somme dans le temps NON\ntaux_marge   -- non additif : ne jamais sommer, recalculer",
      points: [
        "Additive : se somme sur toutes les dimensions (CA, quantité vendue).",
        "Semi-additive : pas sur le temps (stock, solde). Prendre la dernière valeur.",
        "Non additive : ratios, pourcentages. Stocker numérateur et dénominateur, recalculer."
      ],
      retenir: "Stock = semi-additif. Taux = ne jamais sommer."
    },
    {
      titre: "Garder l'historique : SCD",
      exemple: "-- SCD type 2 : le client change de commercial le 01/03/2026\n-- client_sk | code | commercial | date_debut | date_fin   | actuel\n-- 15        | C01  | Martin     | 2020-01-01 | 2026-02-28 | 0\n-- 87        | C01  | Bernard    | 2026-03-01 | 9999-12-31 | 1",
      points: [
        "SCD = Slowly Changing Dimension (dimension qui change lentement).",
        "Type 1 : on écrase l'ancienne valeur. Pas d'historique.",
        "Type 2 : on ajoute une nouvelle ligne, avec des dates de validité. Historique complet.",
        "Les ventes de 2025 restent rattachées à Martin, celles de 2026 à Bernard.",
        "Il faut alors une clé technique (client_sk), différente du code métier."
      ],
      retenir: "Besoin de « l'état à l'époque » : SCD type 2."
    },
    {
      titre: "Les relations",
      exemple: "-- N-N : un article peut avoir plusieurs fournisseurs, un fournisseur plusieurs articles\narticle_fournisseur (article_id, fournisseur_id, prix_achat, delai)",
      points: [
        "1-N : un client, plusieurs commandes. La clé du « 1 » va dans la table du « N ».",
        "N-N : une table de liaison au milieu, avec les deux clés.",
        "La table de liaison porte souvent des infos utiles (prix d'achat, délai).",
        "Dans Power BI : évite les relations N-N et bidirectionnelles quand c'est possible."
      ],
      retenir: "N-N = table de liaison."
    }
  ],
  differences: [
    ["Usage typique", "ERP, OLTP (normalisé)", "Entrepôt, analyse (étoile)"],
    ["Contraintes pour garantir le modèle", "Appliquées", "Non appliquées : contrôles à écrire"]
  ]
};
