// Dico Divalto (ERP Divalto 10.13) : fiches écrites par l'expert Divalto, source /home/user/divalto_10
// (dépôt teracha/Divalto_10, lu en lecture seule). Format : docs/dico.md, section « Le dico Divalto ».
// Pas de page = pas de fiche : chaque fiche cite sa page (source ou sources). Fiches : tables, champs, vues SQL,
// requêtes Dataviz. Les exemples SQL viennent de la doc, ou sont écrits seulement avec ses tables et ses champs.
// 133 fiches, générées le 2026-11-09.
LEARNSQL.dico = (LEARNSQL.dico || []).concat([
  {
    id: "dv-rq-top10-clients-ca",
    nom: "Top 10 clients par chiffre d'affaires",
    type: "requête",
    domaine: "divalto",
    categorie: "Requêtes Dataviz",
    definition: "Requête Dataviz du Négoce : les 10 meilleurs clients, classés par chiffre d'affaires facturé.",
    indicateurs: [
      "Client",
      "Chiffre d'affaires",
      "Rang (pourcentage du CA global)"
    ],
    regles: [
      "Basée sur les factures de vente",
      "Opérations de type C (factures de vente) et CPV (factures TPV)",
      "Chiffre d'affaires agrégé par client",
      "Limitée aux 10 premiers clients",
      "Fichier joint de la requête : « FACTURE_VENTE_ENT_V_Top… » (vue des en-têtes de factures de vente)"
    ],
    pratique: "Usage prévu par la doc : repérer les clients stratégiques et suivre la concentration du CA. La requête s'importe dans Dataviz, puis s'adapte à ton organisation.",
    motsCles: ["top 10", "meilleurs clients", "classement clients", "chiffre d'affaires", "clients", "palmares", "concentration", "factures de vente", "negoce", "dataviz"],
    voirAussi: ["dv-ent", "dv-vues-sql", "dv-stc", "rank", "top"],
    source: { titre: "Négoce", url: "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/12897484806/N+goce" }
  },
  {
    id: "dv-rq-articles-plus-vendus",
    nom: "Articles les plus vendus du mois courant",
    type: "requête",
    domaine: "divalto",
    categorie: "Requêtes Dataviz",
    definition: "Requête Dataviz du Négoce : les articles les plus vendus ce mois-ci, à partir de 5 vendus.",
    indicateurs: [
      "Article",
      "Quantité vendue"
    ],
    regles: [
      "Sources : factures de vente (C) et factures TPV (CPV)",
      "Filtre sur le mois courant",
      "Quantités vendues supérieures ou égales à 5",
      "Agrégation par article",
      "Fichier joint de la requête : « FACTURE_VENTE_MOUV_V_Art… » (vue des lignes de factures de vente)"
    ],
    pratique: "Usage prévu par la doc : repérer les meilleures rotations, ajuster les approvisionnements et mettre en avant les best-sellers.",
    motsCles: ["articles les plus vendus", "meilleures ventes", "best sellers", "top articles", "rotation", "quantite vendue", "ventes du mois", "mois courant", "negoce", "dataviz"],
    voirAussi: ["dv-rq-articles-moins-sortis", "dv-facture-vente-mouv-v", "dv-mouv", "group-by", "sum"],
    source: { titre: "Négoce", url: "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/12897484806/N+goce" }
  },
  {
    id: "dv-rq-articles-moins-sortis",
    nom: "Articles les moins sortis du mois courant",
    type: "requête",
    domaine: "divalto",
    categorie: "Requêtes Dataviz",
    definition: "Requête Dataviz du Négoce : les articles les moins vendus du mois, avec 10 ventes au plus.",
    indicateurs: [
      "Article",
      "Quantités vendues"
    ],
    regles: [
      "Filtre sur le mois courant",
      "Articles avec 10 ventes au maximum",
      "Agrégation des quantités sorties",
      "Fichier joint de la requête : « FACTURE_VENTE_MOUV_V_Art… » (vue des lignes de factures de vente)"
    ],
    pratique: "Usage prévu par la doc : détecter les articles à faible rotation, les risques de surstock, et décider d'un déstockage ou d'un arrêt.",
    motsCles: ["articles les moins vendus", "moins sortis", "faible rotation", "rotation lente", "surstock", "destockage", "invendus", "mois courant", "negoce", "dataviz"],
    voirAussi: ["dv-rq-articles-plus-vendus", "dv-facture-vente-mouv-v", "dv-stb", "having"],
    source: { titre: "Négoce", url: "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/12897484806/N+goce" }
  },
  {
    id: "dv-rq-commandes-achat-attente",
    nom: "Commandes d'achat en attente de réception (mois courant)",
    type: "requête",
    domaine: "divalto",
    categorie: "Requêtes Dataviz",
    definition: "Requête Dataviz du Négoce : les commandes d'achat pas encore reçues, attendues ce mois-ci.",
    indicateurs: [
      "Fournisseur",
      "Numéro de commande",
      "Date prévue de réception",
      "Quantités en attente"
    ],
    regles: [
      "Commandes d'achat non périmées et non soldées",
      "Créées depuis le début de l'année",
      "Réception attendue sur le mois courant",
      "Fichier joint de la requête : « COMMANDE_ACHAT_ENT_V_Les… » (vue des en-têtes de commandes d'achat)"
    ],
    pratique: "Usage prévu par la doc : suivre les retards fournisseurs, anticiper les ruptures de stock et piloter les approvisionnements.",
    motsCles: ["commandes d'achat", "commandes fournisseur", "attente de reception", "receptions prevues", "en attente", "non soldees", "approvisionnement", "rupture", "achats", "negoce", "dataviz"],
    voirAussi: ["dv-ent", "dv-mvtl", "dv-deldt", "dv-rq-commandes-achat-relancer"],
    source: { titre: "Négoce", url: "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/12897484806/N+goce" }
  },
  {
    id: "dv-rq-bl-non-factures",
    nom: "BL de vente non facturés",
    type: "requête",
    domaine: "divalto",
    categorie: "Requêtes Dataviz",
    definition: "Requête Dataviz du Négoce : les bons de livraison de vente pas encore facturés depuis janvier.",
    indicateurs: [
      "Numéro de BL",
      "Client",
      "Date",
      "Montant potentiel à facturer"
    ],
    regles: [
      "BL actifs",
      "BL non facturés",
      "Émis depuis le début de l'année en cours",
      "Fichier joint de la requête : « BL_VENTE_ENT_V_Les BL Ve… » (vue des en-têtes de BL de vente)"
    ],
    pratique: "Usage prévu par la doc : sécuriser la facturation, voir le chiffre d'affaires pas encore reconnu et réduire les oublis de facturation.",
    motsCles: ["bl non factures", "bons de livraison", "livre non facture", "reste a facturer", "oubli de facturation", "facturation", "chiffre d'affaires", "bl", "negoce", "dataviz"],
    voirAussi: ["dv-ent", "dv-ce4", "dv-picod"],
    source: { titre: "Négoce", url: "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/12897484806/N+goce" }
  },
  {
    id: "dv-rq-analyse-commande-client",
    nom: "Analyse commande client",
    type: "requête",
    domaine: "divalto",
    categorie: "Requêtes Dataviz",
    definition: "Requête Dataviz Industrie : chaque ligne d'une commande client, avec la couverture de ses réservations.",
    indicateurs: [
      "Bucket : statut de couverture calculé",
      "Référence complète (REF + ARTIND + SREF1 + SREF2)",
      "Désignation article",
      "Quantité commandée, livrée, restante",
      "Date de besoin",
      "Quantité réservée, date d'entrée prévue"
    ],
    regles: [
      "Entité source : ENT avec TICOD = 'C' et PICOD = 2 (commande client)",
      "Jointures : MOUV → MVTL (sorties) → MRES (réservations) → MVTL (entrées)",
      "Bucket « Aucune réservation » : pas de MRES",
      "Bucket « Réservation non affectée » : CE2 = '2' ; « Affecté stock » : CE2 = '1'",
      "Bucket « Affecté commande » : CE2 = '3' ; délai OK ou NON OK selon la date d'entrée prévue, « sans date prévue » si elle est vide",
      "Paramètre contextuel {{id?12363}} : l'ENT_ID de la commande courante",
      "Widget : entité ENT, mode DQL, visualisation Tableau"
    ],
    exemple: ";WITH Ligne AS (\n     SELECT e.[PINO] AS NumCommande,\n            m.[ENRNO], m.[REF], m.[ARTIND], m.[SREF1], m.[SREF2],\n            ISNULL(m.[BLQTE], 0) AS QteLivree,\n            m.[CDQTE] AS QteCommandee,\n            (m.[CDQTE] - ISNULL(m.[BLQTE], 0)) AS QteRestante,\n            m.[CDDT] AS DateBesoinMouv\n     FROM ENT e\n     JOIN MOUV m\n       ON m.[DOS] = e.[DOS] AND m.[TICOD] = e.[TICOD]\n      AND m.[CDNO] = e.[PINO] AND m.[CE2] = '1' AND m.[SENS] = 2\n     WHERE e.[TICOD] = 'C' AND e.[PICOD] = 2\n       AND e.[ENT_ID] = {{id?12363}} AND e.[DOS] = '998'\n ),\n Sortie AS (\n     SELECT l.*,\n            vout.[TICKETRES] AS Ticket_Sortie,\n            COALESCE(vout.[DELDT], l.DateBesoinMouv) AS DateBesoin\n     FROM Ligne l\n     LEFT JOIN MVTL vout\n       ON vout.[ENRNO] = l.[ENRNO] AND vout.[DOS] = '998'\n      AND ISNULL(vout.[CE5], '') IN ('', '1') AND vout.[SENS] = 2\n ),\n Reserv AS (\n     SELECT s.*, r.[RESQTE], r.[CE2] AS CE2_RES, r.[TICKETRESE]\n     FROM Sortie s\n     LEFT JOIN MRES r\n       ON r.[TICKETRESS] = s.Ticket_Sortie AND r.[DOS] = '998'\n      AND r.[CE1] = 'A' AND ISNULL(s.Ticket_Sortie, 0) <> 0\n ),\n Entree AS (\n     SELECT r.*, vin.[DELDT] AS DateEntreePrevue\n     FROM Reserv r\n     LEFT JOIN MVTL vin\n       ON ISNULL(r.[TICKETRESE], 0) <> 0\n      AND vin.[TICKETRES] = r.[TICKETRESE] AND vin.[DOS] = '998'\n      AND ISNULL(vin.[CE5], '') IN ('', '1') AND vin.[SENS] = 1\n ),\n AvecArticle AS (\n     SELECT e.*, a.[DES] AS Designation,\n            e.[REF]\n              + ISNULL('-' + NULLIF(e.[ARTIND], ''), '')\n              + ISNULL('-' + NULLIF(e.[SREF1], ''), '')\n              + ISNULL('-' + NULLIF(e.[SREF2], ''), '') AS RefComplete\n     FROM Entree e\n     LEFT JOIN ART a\n       ON a.[DOS] = '998' AND a.[REF] = e.[REF]\n      AND ISNULL(a.[ARTIND], '') = ISNULL(e.[ARTIND], '')\n )\n SELECT CASE\n            WHEN RESQTE IS NULL THEN 'Aucune réservation'\n            WHEN CE2_RES = '2' THEN 'Réservation non affectée'\n            WHEN CE2_RES = '1' THEN 'Affecté stock'\n            WHEN CE2_RES = '3' AND DateEntreePrevue IS NULL THEN 'Affecté commande sans date prévue'\n            WHEN CE2_RES = '3' AND DateEntreePrevue <= DateBesoin THEN 'Affecté commande délai OK'\n            WHEN CE2_RES = '3' AND DateEntreePrevue > DateBesoin THEN 'Affecté commande délai NON OK'\n            ELSE 'Aucune réservation'\n        END AS Bucket,\n        RefComplete, [REF], [ARTIND], [SREF1], [SREF2],\n        Designation, QteCommandee, QteLivree, QteRestante,\n        DateBesoin, RESQTE, DateEntreePrevue\n FROM AvecArticle\n ORDER BY NumCommande, RefComplete;",
    piege: "Les requêtes Industrie filtrent en dur le dossier '998' (DOS = '998'), celui des exemples. Sur ta base, remplace '998' par ton code dossier, sinon la requête ne renvoie rien.",
    pratique: "Hors Dataviz, remplace {{id?12363}} par l'ENT_ID d'une commande pour tester. Le « Bucket » dit si chaque ligne est couverte par le stock ou par une commande fournisseur.",
    motsCles: ["analyse commande client", "commande client", "couverture", "reservation", "ligne par ligne", "bucket", "retard de livraison", "affecte stock", "industrie", "dataviz"],
    voirAussi: ["dv-ent", "dv-mouv", "dv-mvtl", "dv-mres", "dv-ticketres", "with-cte", "left-join"],
    source: { titre: "Industrie", url: "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/12896370759/Industrie" }
  },
  {
    id: "dv-rq-ratio-activite-affaire",
    nom: "Ratio activité affaire",
    type: "requête",
    domaine: "divalto",
    categorie: "Requêtes Dataviz",
    definition: "Requête Dataviz Industrie : l'avancement en temps de chaque affaire, heures réalisées sur heures prévues.",
    indicateurs: [
      "Code affaire (ProjetRacine)",
      "Libellé projet",
      "Temps réalisé (heures entières)",
      "Temps prévu (heures entières)",
      "Ratio temps (%)"
    ],
    regles: [
      "Entité source : GPAELEM avec ARBOCOD = 'TEC' (arborescence technique)",
      "Jointures : GPAELEM → GPAACTIVITE → AFRTPS (temps réalisé), et PRJAP (libellé du projet)",
      "Temps stockés en secondes, convertis en heures entières (÷ 3600)",
      "Ratio = 0 si aucun temps prévu (protection contre la division par zéro)",
      "Tri décroissant par code affaire",
      "Widget : entité GPAELEM, mode DQL, graphique en barres (X : ProjetRacine, Y : RatioTemps_Pct)"
    ],
    exemple: "WITH Temps AS (\n    SELECT\n        E.AFFAIRE AS ProjetRacine,\n        PRJAP.LIB80 AS LibelleProjet,\n        COALESCE(SUM(CAST(AFRTPS.TPSREAL AS FLOAT)), 0) AS TotalSecsRealise,\n        COALESCE(SUM(CAST(GPAACTIVITE.TPSPREV AS FLOAT)), 0) AS TotalSecsPrevu\n    FROM GPAELEM AS E\n    LEFT JOIN GPAACTIVITE\n        ON E.DOS = GPAACTIVITE.DOS\n       AND E.AFFAIRE = GPAACTIVITE.AFFAIRE\n       AND E.ELEMNO = GPAACTIVITE.ELEMNO\n       AND E.AFRINDICE = GPAACTIVITE.AFRINDICE\n    LEFT JOIN AFRTPS\n        ON GPAACTIVITE.DOS = AFRTPS.DOS\n       AND GPAACTIVITE.AFFAIRE = AFRTPS.AFFAIRE\n       AND GPAACTIVITE.ELEMNO = AFRTPS.ELEMNO\n       AND GPAACTIVITE.AFRINDICE = AFRTPS.AFRINDICE\n       AND GPAACTIVITE.ACTIVNO = AFRTPS.ACTIVNO\n    INNER JOIN PRJAP\n        ON PRJAP.DOS = E.DOS\n       AND PRJAP.AFFAIRE = E.AFFAIRE\n    WHERE E.ARBOCOD = 'TEC'\n      AND E.DOS = '998'\n    GROUP BY E.AFFAIRE, PRJAP.LIB80\n)\nSELECT\n    ProjetRacine,\n    LibelleProjet,\n    CAST(TotalSecsRealise / 3600 AS INT) AS TempsRealise_Heures,\n    CAST(TotalSecsPrevu / 3600 AS INT) AS TempsPrevu_Heures,\n    CASE\n        WHEN TotalSecsPrevu = 0 THEN 0\n        ELSE CAST((TotalSecsRealise * 100.0 / TotalSecsPrevu) AS INT)\n    END AS RatioTemps_Pct\nFROM Temps\nORDER BY ProjetRacine DESC;",
    piege: "AFRTPS.TPSREAL et GPAACTIVITE.TPSPREV sont stockés en secondes : sans la division par 3600, tes heures sont 3 600 fois trop grandes.",
    pratique: "Le CASE WHEN TotalSecsPrevu = 0 THEN 0 protège d'une division par zéro sur une affaire sans temps prévu : garde ce réflexe dans tes propres ratios.",
    motsCles: ["ratio activite", "avancement affaire", "temps passes", "temps prevu", "temps realise", "heures", "affaire", "projet", "depassement", "industrie", "dataviz"],
    voirAussi: ["dv-gpaelem", "dv-gpaactivite", "dv-afrtps", "dv-prjap", "case", "nullif"],
    source: { titre: "Industrie", url: "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/12896370759/Industrie" }
  },
  {
    id: "dv-rq-of-sans-reservations",
    nom: "OF à venir sans réservations complètes",
    type: "requête",
    domaine: "divalto",
    categorie: "Requêtes Dataviz",
    definition: "Requête Dataviz Industrie : les OF actifs dont les composants ne sont pas tous réservés sur l'horizon.",
    indicateurs: [
      "Numéro d'OF",
      "Libellé OF",
      "Date planifiée de début",
      "Premier et dernier besoin composant",
      "Références non couvertes",
      "Ratio de couverture (%)",
      "Nombre de composants : total sur l'horizon, déjà consommés, couverts, non couverts"
    ],
    regles: [
      "Entité source : BF, OF actifs (STATUS NOT IN (5, 6) : terminé, annulé)",
      "Horizon de besoin : J-365 à J+181",
      "Couverture par MRES (CE1 = 'A') : CE2 = '1' stock courant ; CE2 = '3' commande fournisseur si date d'entrée <= date de besoin",
      "Composant couvert si la quantité restante est <= 0, ou si la quantité réservée couvrante est >= à la quantité restante",
      "Tri : premier besoin composant, puis numéro d'OF",
      "Widget : entité BF, mode DQL, visualisation Tableau"
    ],
    exemple: ";WITH Params AS (\n     SELECT DATEADD(DAY, -365, CONVERT(date, GETDATE())) AS DateDebut,\n            DATEADD(DAY, 181, CONVERT(date, GETDATE())) AS DateFinExclusive\n ),\n ComposantsBase AS (\n     SELECT e.[PINO] AS OFNO, m.[ENRNO], m.[REF], m.[ARTIND], m.[SREF1], m.[SREF2],\n            m.[CDQTE] AS QteComposant,\n            ISNULL(m.[BLQTE], 0) AS QteConsommee,\n            CASE\n                WHEN m.[CDQTE] - ISNULL(m.[BLQTE], 0) <= 0 THEN 0\n                ELSE m.[CDQTE] - ISNULL(m.[BLQTE], 0)\n            END AS QteRestanteACouvrir,\n            bf.[PREVDEBDH] AS DatePlanifieeOF,\n            COALESCE(NULLIF(LTRIM(RTRIM(bf.[LIBOF])) COLLATE Latin1_General_CI_AI, ''),\n                     art.[DES] COLLATE Latin1_General_CI_AI) AS LibelleOF\n     FROM ENT e\n     JOIN MOUV m ON m.[DOS] = e.[DOS] AND m.[TICOD] = e.[TICOD]\n      AND m.[CDNO] = e.[PINO] AND m.[CE2] = '1' AND m.[SENS] = 2\n     JOIN BF bf ON bf.[DOS] = e.[DOS] AND bf.[PINO] = e.[PINO]\n      AND bf.[STATUS] NOT IN (5, 6)\n     LEFT JOIN ART art ON art.[DOS] = bf.[DOS] AND art.[REF] = bf.[REF]\n      AND ISNULL(art.[ARTIND], '') = ISNULL(bf.[ARTIND], '')\n     WHERE e.[DOS] = '998' AND e.[TICOD] = 'I' AND e.[PICOD] = 2\n ),\n VentilationBesoin AS (\n     SELECT c.OFNO, c.ENRNO, MIN(v.[DELDT]) AS DateBesoin\n     FROM ComposantsBase c\n     JOIN MVTL v ON v.[DOS] = '998' AND v.[ENRNO] = c.ENRNO\n      AND v.[SENS] = 2 AND v.[DELDT] IS NOT NULL\n     GROUP BY c.OFNO, c.ENRNO\n ),\n ComposantsSemaine AS (\n     SELECT c.*, vb.DateBesoin\n     FROM ComposantsBase c\n     JOIN VentilationBesoin vb ON vb.OFNO = c.OFNO AND vb.ENRNO = c.ENRNO\n     CROSS JOIN Params p\n     WHERE vb.DateBesoin >= p.DateDebut AND vb.DateBesoin < p.DateFinExclusive\n ),\n ReservationsComposant AS (\n     SELECT c.OFNO, c.ENRNO,\n            SUM(CASE\n                WHEN r.[MRES_ID] IS NULL THEN 0\n                WHEN ISNULL(r.[RESQTE], 0) <= 0 THEN 0\n                WHEN r.[CE2] = '1' THEN r.[RESQTE]\n                WHEN r.[CE2] = '3' AND vin.[DELDT] IS NOT NULL\n                     AND vin.[DELDT] <= c.DateBesoin THEN r.[RESQTE]\n                ELSE 0\n            END) AS QteReserveeCouvrante\n     FROM ComposantsSemaine c\n     LEFT JOIN MVTL v ON v.[DOS] = '998' AND v.[ENRNO] = c.ENRNO\n      AND v.[SENS] = 2 AND ISNULL(v.[TICKETRES], 0) <> 0\n     LEFT JOIN MRES r ON r.[DOS] = '998' AND r.[TICKETRESS] = v.[TICKETRES] AND r.[CE1] = 'A'\n     LEFT JOIN MVTL vin ON vin.[DOS] = '998' AND vin.[TICKETRES] = r.[TICKETRESE]\n      AND vin.[SENS] = 1 AND ISNULL(r.[TICKETRESE], 0) <> 0\n     GROUP BY c.OFNO, c.ENRNO\n ),\n Couverture AS (\n     SELECT c.*, ISNULL(r.QteReserveeCouvrante, 0) AS QteReserveeCouvrante,\n            CASE\n                WHEN c.QteRestanteACouvrir <= 0 THEN 1\n                WHEN ISNULL(r.QteReserveeCouvrante, 0) >= c.QteRestanteACouvrir THEN 1\n                ELSE 0\n            END AS EstCouvert\n     FROM ComposantsSemaine c\n     LEFT JOIN ReservationsComposant r ON r.OFNO = c.OFNO AND r.ENRNO = c.ENRNO\n ),\n ComposantsNonCouverts AS (\n     SELECT cv.OFNO,\n            STRING_AGG(c.[REF]\n                + ISNULL('-' + NULLIF(LTRIM(RTRIM(c.[ARTIND])), ''), '')\n                + ISNULL('-' + NULLIF(LTRIM(RTRIM(c.[SREF1])), ''), '')\n                + ISNULL('-' + NULLIF(LTRIM(RTRIM(c.[SREF2])), ''), ''), ', ') AS ReferencesNonCouvertes\n     FROM Couverture cv\n     JOIN ComposantsSemaine c ON c.OFNO = cv.OFNO AND c.ENRNO = cv.ENRNO\n     WHERE cv.EstCouvert = 0\n     GROUP BY cv.OFNO\n )\n SELECT c.OFNO,\n        MAX(c.LibelleOF) AS LibelleOF,\n        MIN(c.DatePlanifieeOF) AS DatePlanifieeOF,\n        MIN(c.DateBesoin) AS PremierBesoinComposant,\n        MAX(c.DateBesoin) AS DernierBesoinComposant,\n        MAX(cnc.ReferencesNonCouvertes) AS ReferencesNonCouvertes,\n        CAST(100.0 * SUM(cv.EstCouvert) / NULLIF(COUNT(*), 0) AS DECIMAL(5,2)) AS RatioCouverture,\n        COUNT(*) AS NbComposantsHorizon,\n        SUM(CASE WHEN cv.QteRestanteACouvrir <= 0 THEN 1 ELSE 0 END) AS NbComposantsDejaConsommes,\n        SUM(CASE WHEN cv.QteRestanteACouvrir > 0 AND cv.EstCouvert = 1 THEN 1 ELSE 0 END) AS NbComposantsCouverts,\n        SUM(CASE WHEN cv.QteRestanteACouvrir > 0 AND cv.EstCouvert = 0 THEN 1 ELSE 0 END) AS NbComposantsNonCouverts\n FROM ComposantsSemaine c\n LEFT JOIN Couverture cv ON cv.OFNO = c.OFNO AND cv.ENRNO = c.ENRNO\n LEFT JOIN ComposantsNonCouverts cnc ON cnc.OFNO = c.OFNO\n GROUP BY c.OFNO\n ORDER BY PremierBesoinComposant, c.OFNO;",
    piege: "BF ne donne que l'en-tête de l'OF. Les composants sont lus dans ENT (TICOD = 'I', PICOD = 2) et MOUV (SENS = 2, sortie) : sans cette jointure, tu n'as aucun composant.",
    pratique: "Usage prévu par la doc : anticiper les blocages au lancement de fabrication, prioriser les appros des OF urgents et voir le taux de complétude des dossiers.",
    motsCles: ["of", "ordre de fabrication", "composants", "reservation", "couverture", "manquants", "rupture", "fabrication", "lancement", "industrie", "dataviz"],
    voirAussi: ["dv-bf", "dv-mres", "dv-mvtl", "dv-mouv", "dv-ticod", "string-agg"],
    source: { titre: "Industrie", url: "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/12896370759/Industrie" },
    version: "La requête dit STATUS 5 et 6 = terminé et annulé. La page technique de BF liste les états (préparé, confirmé, lancé, démarré, clôturé, valorisé) sans leurs codes : vérifie les valeurs sur ta base."
  },
  {
    id: "dv-rq-incoherences-reservations-affaires",
    nom: "Éléments d'affaires avec incohérences de réservations",
    type: "requête",
    domaine: "divalto",
    categorie: "Requêtes Dataviz",
    definition: "Requête Dataviz Industrie : les éléments d'affaire en cours dont les besoins en composants ne sont pas couverts.",
    indicateurs: [
      "Affaire, indice, numéro d'élément",
      "Code arborescence (ARBOCOD)",
      "Libellé affaire et libellé élément",
      "Dates de couverture (première, dernière)",
      "Nombre de besoins : total, déjà sortis, couverts, non couverts",
      "Références non couvertes",
      "Ratio de couverture (%)"
    ],
    regles: [
      "Entité source : GPABESOIN, via GPAELEM (éléments actifs, STATUTM = 2) et GPACBESOIN",
      "Filtre : ARBOCOD IN ('TEC', 'REA'), éléments en cours",
      "Horizon : J-365 à J+180",
      "Couverture : même logique que la requête des OF (MRES CE2 = '1', ou CE2 = '3' avec une date d'entrée)",
      "Tri : première date de couverture, affaire, élément",
      "Widget : entité GPABESOIN, mode DQL, visualisation Tableau"
    ],
    exemple: ";WITH Params AS (\n     SELECT DATEADD(DAY, -365, DATEADD(DAY, DATEDIFF(DAY, 0, GETDATE()), 0)) AS DateDebut,\n            DATEADD(DAY, 180, DATEADD(DAY, DATEDIFF(DAY, 0, GETDATE()), 0)) AS DateFin\n ),\n ElementsBase AS (\n     SELECT elem.[AFFAIRE], elem.[AFRINDICE], elem.[ELEMNO], elem.[ARBOCOD],\n            COALESCE(NULLIF(LTRIM(RTRIM(prj.[LIB80])) COLLATE DATABASE_DEFAULT, ''),\n                     elem.[AFFAIRE] COLLATE DATABASE_DEFAULT) AS LibelleAffaire,\n            COALESCE(NULLIF(LTRIM(RTRIM(elem.[LIB80])) COLLATE DATABASE_DEFAULT, ''),\n                     CAST(elem.[ELEMNO] AS varchar(20)) COLLATE DATABASE_DEFAULT) AS LibelleElement,\n            COALESCE(CAST(elem.[PLANDEBDH] AS date), elem.[PREVDT], CAST(GETDATE() AS date)) AS DateElement\n     FROM GPAELEM elem\n     LEFT JOIN PRJAP prj ON prj.[DOS] = elem.[DOS] AND prj.[AFFAIRE] = elem.[AFFAIRE]\n     JOIN GATELEMST st ON st.[DOS] = elem.[DOS] AND st.[STATUTTYP] = 1\n      AND st.[STATUTCOD] = elem.[STATUTCOD] AND st.[STATUTM] = 2\n     WHERE elem.[DOS] = '998' AND elem.[ARBOCOD] IN ('TEC', 'REA')\n ),\n CouverturesBase AS (\n     SELECT e.[AFFAIRE], e.[AFRINDICE], e.[ELEMNO], e.[ARBOCOD],\n            e.LibelleAffaire, e.LibelleElement, e.DateElement,\n            cb.[BESOINNO], cb.[REF], cb.[ARTIND], cb.[SREF1], cb.[SREF2],\n            cb.[DELDT] AS DateCouverture, cb.[TICKETRES],\n            cb.[COUVREFQTE] AS QteBesoin,\n            ISNULL(cb.[SORTIEREFQTE], 0) AS QteDejaSortie,\n            CASE\n                WHEN cb.[COUVREFQTE] - ISNULL(cb.[SORTIEREFQTE], 0) <= 0 THEN 0\n                ELSE cb.[COUVREFQTE] - ISNULL(cb.[SORTIEREFQTE], 0)\n            END AS QteRestanteACouvrir\n     FROM ElementsBase e\n     JOIN GPACBESOIN cb ON cb.[DOS] = '998' AND cb.[AFFAIRE] = e.[AFFAIRE]\n      AND cb.[AFRINDICE] = e.[AFRINDICE] AND cb.[ELEMNO] = e.[ELEMNO]\n     CROSS JOIN Params p\n     WHERE cb.[DELDT] >= p.DateDebut AND cb.[DELDT] < p.DateFin\n ),\n ReservationsCouverture AS (\n     SELECT c.[AFFAIRE], c.[AFRINDICE], c.[ELEMNO], c.[BESOINNO],\n            SUM(CASE\n                WHEN r.[MRES_ID] IS NULL THEN 0\n                WHEN ISNULL(r.[RESQTE], 0) <= 0 THEN 0\n                WHEN r.[CE2] = '1' THEN r.[RESQTE]\n                WHEN r.[CE2] = '3' AND vin.[DELDT] IS NOT NULL\n                     AND vin.[DELDT] <= c.DateCouverture THEN r.[RESQTE]\n                ELSE 0\n            END) AS QteReserveeCouvrante\n     FROM CouverturesBase c\n     LEFT JOIN MRES r ON r.[DOS] = '998' AND r.[TICKETRESS] = c.[TICKETRES]\n      AND r.[CE1] = 'A' AND ISNULL(c.[TICKETRES], 0) <> 0\n     LEFT JOIN MVTL vin ON vin.[DOS] = '998' AND vin.[TICKETRES] = r.[TICKETRESE]\n      AND ISNULL(vin.[CE5], '') IN ('', '1') AND vin.[SENS] = 1\n      AND ISNULL(r.[TICKETRESE], 0) <> 0\n     GROUP BY c.[AFFAIRE], c.[AFRINDICE], c.[ELEMNO], c.[BESOINNO]\n ),\n Couverture AS (\n     SELECT c.*, ISNULL(r.QteReserveeCouvrante, 0) AS QteReserveeCouvrante,\n            CASE\n                WHEN c.QteRestanteACouvrir <= 0 THEN 1\n                WHEN ISNULL(r.QteReserveeCouvrante, 0) >= c.QteRestanteACouvrir THEN 1\n                ELSE 0\n            END AS EstCouvert\n     FROM CouverturesBase c\n     LEFT JOIN ReservationsCouverture r\n       ON r.[AFFAIRE] = c.[AFFAIRE] AND r.[AFRINDICE] = c.[AFRINDICE]\n      AND r.[ELEMNO] = c.[ELEMNO] AND r.[BESOINNO] = c.[BESOINNO]\n ),\n BesoinsNonCouverts AS (\n     SELECT cv.[AFFAIRE], cv.[AFRINDICE], cv.[ELEMNO],\n            STRING_AGG(cv.[REF]\n                + ISNULL('-' + NULLIF(LTRIM(RTRIM(cv.[ARTIND])), ''), '')\n                + ISNULL('-' + NULLIF(LTRIM(RTRIM(cv.[SREF1])), ''), '')\n                + ISNULL('-' + NULLIF(LTRIM(RTRIM(cv.[SREF2])), ''), ''), ', ') AS ReferencesNonCouvertes\n     FROM Couverture cv\n     WHERE cv.EstCouvert = 0\n     GROUP BY cv.[AFFAIRE], cv.[AFRINDICE], cv.[ELEMNO]\n )\n SELECT cv.[AFFAIRE], cv.[AFRINDICE], cv.[ELEMNO],\n        MAX(cv.[ARBOCOD]) AS ARBOCOD,\n        MAX(cv.LibelleAffaire) AS LibelleAffaire,\n        MAX(cv.LibelleElement) AS LibelleElement,\n        MIN(cv.DateElement) AS DateElement,\n        MIN(cv.DateCouverture) AS PremiereDateCouverture,\n        MAX(cv.DateCouverture) AS DerniereDateCouverture,\n        COUNT(*) AS NbBesoinsCouverture,\n        SUM(CASE WHEN cv.QteRestanteACouvrir <= 0 THEN 1 ELSE 0 END) AS NbBesoinsDejaSortis,\n        SUM(cv.EstCouvert) AS NbBesoinsCouverts,\n        SUM(CASE WHEN cv.EstCouvert = 0 THEN 1 ELSE 0 END) AS NbBesoinsNonCouverts,\n        MAX(bnc.ReferencesNonCouvertes) AS ReferencesNonCouvertes,\n        CAST(100.0 * SUM(cv.EstCouvert) / NULLIF(COUNT(*), 0) AS DECIMAL(5,2)) AS RatioCouverture\n FROM Couverture cv\n LEFT JOIN BesoinsNonCouverts bnc\n   ON bnc.[AFFAIRE] = cv.[AFFAIRE] AND bnc.[AFRINDICE] = cv.[AFRINDICE] AND bnc.[ELEMNO] = cv.[ELEMNO]\n GROUP BY cv.[AFFAIRE], cv.[AFRINDICE], cv.[ELEMNO]\n ORDER BY PremiereDateCouverture, cv.[AFFAIRE], cv.[ELEMNO];",
    piege: "Les codes d'arborescence 'TEC' et 'REA' sont ceux des exemples : le code arborescence se paramètre par société. Vérifie tes propres codes avant de lancer la requête.",
    pratique: "Usage prévu par la doc : détecter les incohérences de planification et corriger avant la date de besoin.",
    motsCles: ["elements d'affaire", "affaire", "besoins", "couverture", "reservation", "incoherence", "planification", "arborescence", "approvisionnement", "industrie", "dataviz"],
    voirAussi: ["dv-gpaelem", "dv-gpacbesoin", "dv-gatelemst", "dv-mres", "dv-rq-of-sans-reservations"],
    sources: [
      { titre: "Industrie", url: "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/12896370759/Industrie" },
      { titre: "Paramétrages liés aux arborescences", url: "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704700065/Param+trages+li+s+aux+arborescences" }
    ],
    version: "La requête garde STATUTM = 2 pour les éléments « actifs, en cours ». La page des arborescences liste les statuts maîtres (En cours, En attente, Suspendu, Terminé) sans leur code stocké : à vérifier sur ta base."
  },
  {
    id: "dv-rq-commandes-achat-relancer",
    nom: "Commandes achat à relancer avec impact",
    type: "requête",
    domaine: "divalto",
    categorie: "Requêtes Dataviz",
    definition: "Requête Dataviz Industrie : les commandes d'achat en retard sur les besoins des OF, clients ou affaires.",
    indicateurs: [
      "Numéro de commande achat",
      "Fournisseur",
      "Référence article",
      "Date d'entrée prévue",
      "Premier et dernier besoin impacté",
      "Retard maximum (jours)",
      "Nombre de besoins impactés : OF, commandes client, affaires",
      "Détail des besoins impactés"
    ],
    regles: [
      "Entité source : ENT, commandes d'achat (TICOD = 'F', PICOD = 2)",
      "Horizon : J-30 à J+90 sur les dates d'entrée prévues",
      "Réservations CE2 = '3' seulement (affectées à une commande fournisseur)",
      "Statuts de relance : commande sans date prévue, besoin sans date, retard (date d'entrée > date de besoin)",
      "Impact croisé sur les OF, les commandes clients et les besoins d'affaires (GPACBESOIN)",
      "Widget : entité ENT, mode DQL, visualisation Tableau"
    ],
    exemple: ";WITH Params AS (\n     SELECT DATEADD(DAY, -30, DATEADD(DAY, DATEDIFF(DAY, 0, GETDATE()), 0)) AS DateDebutCommandeAchat,\n            DATEADD(DAY, 90, DATEADD(DAY, DATEDIFF(DAY, 0, GETDATE()), 0)) AS DateFinCommandeAchat\n ),\n ReservationsAchat AS (\n     SELECT r.[MRES_ID], r.[TICKETRESS], r.[TICKETRESE], r.[RESQTE],\n            r.[REF], r.[ARTIND], r.[SREF1], r.[SREF2],\n            r.[REF] + ISNULL('-' + NULLIF(LTRIM(RTRIM(r.[ARTIND])), ''), '')\n              + ISNULL('-' + NULLIF(LTRIM(RTRIM(r.[SREF1])), ''), '')\n              + ISNULL('-' + NULLIF(LTRIM(RTRIM(r.[SREF2])), ''), '') AS RefComplete,\n            vin.[TIERS] AS TiersFournisseur,\n            vin.[PREFPINO] AS PrefCommandeAchat,\n            vin.[PINO] AS NumCommandeAchat,\n            vin.[DELDT] AS DateEntreePrevue\n     FROM MRES r\n     JOIN MVTL vin ON vin.[DOS] = '998' AND vin.[TICKETRES] = r.[TICKETRESE]\n      AND vin.[CE5] = '1' AND vin.[SENS] = 1 AND vin.[TICOD] = 'F' AND vin.[PICOD] = 2\n     CROSS JOIN Params p\n     WHERE r.[DOS] = '998' AND r.[CE1] = 'A' AND r.[CE2] = '3'\n       AND ISNULL(r.[TICKETRESE], 0) <> 0\n       AND (vin.[DELDT] IS NULL\n            OR (vin.[DELDT] >= p.DateDebutCommandeAchat AND vin.[DELDT] < p.DateFinCommandeAchat))\n ),\n ImpactsPieces AS (\n     SELECT ra.[MRES_ID], ra.RefComplete, ra.TiersFournisseur,\n            ra.PrefCommandeAchat, ra.NumCommandeAchat, ra.DateEntreePrevue,\n            CASE WHEN vout.[TICOD]='I' AND vout.[PICOD]=2 THEN 'OF'\n                 WHEN vout.[TICOD]='C' AND vout.[PICOD]=2 THEN 'Commande client'\n                 ELSE 'Pièce' END AS TypeBesoin,\n            COALESCE(vout.[DELDT], m.[CDDT]) AS DateBesoin,\n            CASE WHEN vout.[TICOD]='I' AND vout.[PICOD]=2\n                 THEN 'OF ' + CAST(CAST(vout.[PINO] AS bigint) AS varchar(20))\n                 WHEN vout.[TICOD]='C' AND vout.[PICOD]=2\n                 THEN 'Cde client ' + ISNULL(NULLIF(LTRIM(RTRIM(vout.[PREFPINO])),''),'')\n                      + CAST(CAST(vout.[PINO] AS bigint) AS varchar(20))\n                 ELSE 'Pièce ' + ISNULL(vout.[TICOD],'?') + '/'\n                      + CAST(ISNULL(vout.[PICOD],0) AS varchar(5))\n                      + ' ' + CAST(CAST(ISNULL(vout.[PINO],0) AS bigint) AS varchar(20))\n            END AS LibelleBesoin\n     FROM ReservationsAchat ra\n     JOIN MVTL vout ON vout.[DOS]='998' AND vout.[TICKETRES]=ra.[TICKETRESS]\n      AND ISNULL(vout.[CE5],'') IN ('','1') AND vout.[SENS]=2\n     LEFT JOIN MOUV m ON m.[DOS]='998' AND m.[ENRNO]=vout.[ENRNO]\n ),\n ImpactsAffaires AS (\n     SELECT ra.[MRES_ID], ra.RefComplete, ra.TiersFournisseur,\n            ra.PrefCommandeAchat, ra.NumCommandeAchat, ra.DateEntreePrevue,\n            'Couverture affaire' AS TypeBesoin, cb.[DELDT] AS DateBesoin,\n            'Affaire ' + cb.[AFFAIRE] + ' / Elem ' + CAST(CAST(cb.[ELEMNO] AS bigint) AS varchar(20))\n              + ISNULL(' - ' + NULLIF(LTRIM(RTRIM(elem.[LIB80])) COLLATE DATABASE_DEFAULT,''),'') AS LibelleBesoin\n     FROM ReservationsAchat ra\n     JOIN GPACBESOIN cb ON cb.[DOS]='998' AND cb.[TICKETRES]=ra.[TICKETRESS]\n     LEFT JOIN GPAELEM elem ON elem.[DOS]=cb.[DOS] AND elem.[AFFAIRE]=cb.[AFFAIRE]\n      AND elem.[AFRINDICE]=cb.[AFRINDICE] AND elem.[ELEMNO]=cb.[ELEMNO]\n ),\n Impacts AS (SELECT * FROM ImpactsPieces UNION ALL SELECT * FROM ImpactsAffaires),\n ImpactsARelancer AS (\n     SELECT DISTINCT RefComplete, TiersFournisseur, PrefCommandeAchat, NumCommandeAchat,\n            DateEntreePrevue, TypeBesoin, DateBesoin, LibelleBesoin,\n            CASE WHEN DateEntreePrevue IS NULL THEN 'Commande achat sans date prévue'\n                 WHEN DateBesoin IS NULL THEN 'Besoin sans date'\n                 WHEN DateEntreePrevue > DateBesoin THEN 'Commande achat en retard besoin'\n                 ELSE 'Délai OK' END AS StatutRelance\n     FROM Impacts\n     WHERE DateEntreePrevue IS NULL OR DateBesoin IS NULL OR DateEntreePrevue > DateBesoin\n )\n SELECT ISNULL(NULLIF(LTRIM(RTRIM(PrefCommandeAchat)),''),'')\n        + CAST(CAST(NumCommandeAchat AS bigint) AS varchar(20)) AS CommandeAchat,\n        TiersFournisseur, RefComplete,\n        MIN(DateEntreePrevue) AS DateEntreePrevue,\n        MIN(DateBesoin) AS PremierBesoinImpacte,\n        MAX(DateBesoin) AS DernierBesoinImpacte,\n        MAX(CASE WHEN DateEntreePrevue IS NOT NULL AND DateBesoin IS NOT NULL\n                 THEN DATEDIFF(DAY, DateBesoin, DateEntreePrevue) ELSE NULL END) AS RetardMaxJours,\n        COUNT(*) AS NbBesoinsImpactes,\n        SUM(CASE WHEN TypeBesoin='OF' THEN 1 ELSE 0 END) AS NbOFImpactes,\n        SUM(CASE WHEN TypeBesoin='Commande client' THEN 1 ELSE 0 END) AS NbCommandesClientImpactees,\n        SUM(CASE WHEN TypeBesoin='Couverture affaire' THEN 1 ELSE 0 END) AS NbBesoinsAffaireImpactes,\n        STRING_AGG(CAST(TypeBesoin+' : '+LibelleBesoin\n            +' ('+CONVERT(varchar(10),DateBesoin,120)+')' AS varchar(max)),' | ') AS BesoinsImpactes\n FROM ImpactsARelancer\n GROUP BY PrefCommandeAchat, NumCommandeAchat, TiersFournisseur, RefComplete\n ORDER BY PremierBesoinImpacte, RetardMaxJours DESC, CommandeAchat, RefComplete;",
    piege: "Le type de besoin vient de la ventilation de sortie : TICOD 'I' + PICOD 2 = OF, TICOD 'C' + PICOD 2 = commande client. Tout autre couple est classé « Pièce ».",
    pratique: "Usage prévu par la doc : prioriser les relances fournisseurs selon l'impact, et évaluer le risque de retard en fabrication et en livraison client.",
    motsCles: ["relance fournisseur", "commandes a relancer", "commandes d'achat", "retard fournisseur", "retard", "date d'entree prevue", "impact", "besoins", "of", "achats", "industrie", "dataviz"],
    voirAussi: ["dv-ent", "dv-mres", "dv-mvtl", "dv-gpacbesoin", "dv-rq-commandes-achat-attente", "union-all"],
    source: { titre: "Industrie", url: "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/12896370759/Industrie" }
  },
  {
    id: "dv-rq-top-articles-bloquants",
    nom: "Top articles bloquants OF / Affaires",
    type: "requête",
    domaine: "divalto",
    categorie: "Requêtes Dataviz",
    definition: "Requête Dataviz Industrie : les articles dont les besoins d'OF ou d'affaires restent non couverts.",
    indicateurs: [
      "Référence complète, désignation",
      "Dépôt",
      "Première date de besoin",
      "Nombre de besoins bloquants",
      "Nombre d'OF et d'affaires impactés",
      "Quantité restante à couvrir, couverte, manquante",
      "Détail des besoins impactés"
    ],
    regles: [
      "Entité source : ART, articles gérés en stock (STCOD = 2)",
      "Horizon : J-720 à J+365",
      "Besoins OF : composants non soldés (CDQTE > BLQTE) avec une sortie MVTL",
      "Besoins affaires : GPACBESOIN d'éléments actifs (ARBOCOD 'TEC' ou 'REA')",
      "Couverture : MRES CE2 = '1' (stock) ou CE2 = '3' (commande avec une date <= date de besoin)",
      "Tri : nombre de besoins bloquants (décroissant), date de besoin, quantité manquante (décroissant)",
      "Widget : entité ART, mode DQL, visualisation Tableau"
    ],
    exemple: ";WITH Params AS (\n    SELECT DATEADD(DAY, -720, CONVERT(date, GETDATE())) AS DateDebut,\n           DATEADD(DAY, 365, CONVERT(date, GETDATE())) AS DateFin\n),\nBesoinsOF AS (\n    SELECT 'OF|'+CAST(CAST(e.PINO AS bigint) AS varchar(20))\n           +'|ENRNO|'+CAST(CAST(m.ENRNO AS bigint) AS varchar(20)) AS CleBesoin,\n           'OF' AS TypeBesoin,\n           CAST(CAST(e.PINO AS bigint) AS varchar(20)) AS BesoinNo,\n           m.REF, m.ARTIND, m.SREF1, m.SREF2,\n           COALESCE(NULLIF(LTRIM(RTRIM(MAX(v.DEPO))),''), m.DEPO) AS Depot,\n           MIN(v.DELDT) AS DateBesoin,\n           MAX(ISNULL(v.TICKETRES,0)) AS TicketSortie,\n           SUM(COALESCE(NULLIF(ABS(v.REFQTE),0),ABS(v.QTE),0)) AS QteRestanteACouvrir\n    FROM ENT e\n    JOIN MOUV m ON m.DOS=e.DOS AND m.TICOD=e.TICOD AND m.CDNO=e.PINO\n     AND m.CE2='1' AND m.SENS=2 AND ISNULL(m.SOLDERELFL,0)=0\n     AND m.CDQTE > ISNULL(m.BLQTE,0)\n    JOIN MVTL v ON v.DOS=m.DOS AND v.ENRNO=m.ENRNO\n     AND v.SENS=2 AND ISNULL(v.CE5,'') IN ('','1')\n    JOIN ART art ON art.DOS=m.DOS AND art.REF=m.REF\n     AND ISNULL(art.ARTIND,'')=ISNULL(m.ARTIND,'') AND art.STCOD=2\n    CROSS JOIN Params p\n    WHERE e.DOS='998' AND e.TICOD='I' AND e.PICOD=2\n      AND v.DELDT >= p.DateDebut AND v.DELDT < p.DateFin\n      AND COALESCE(NULLIF(ABS(v.REFQTE),0),ABS(v.QTE),0) > 0\n    GROUP BY e.PINO, m.ENRNO, m.REF, m.ARTIND, m.SREF1, m.SREF2, m.DEPO\n    HAVING SUM(COALESCE(NULLIF(ABS(v.REFQTE),0),ABS(v.QTE),0)) > 0\n),\nBesoinsAffaires AS (\n    SELECT 'Affaire|'+CAST(cb.AFFAIRE AS varchar(30))\n           +'/'+CAST(CAST(cb.ELEMNO AS bigint) AS varchar(20))\n           +'|BES|'+CAST(CAST(cb.BESOINNO AS bigint) AS varchar(20)) AS CleBesoin,\n           'Affaire' AS TypeBesoin,\n           CAST(cb.AFFAIRE AS varchar(30))+'/'+CAST(CAST(cb.ELEMNO AS bigint) AS varchar(20)) AS BesoinNo,\n           cb.REF, cb.ARTIND, cb.SREF1, cb.SREF2, cb.DEPO AS Depot,\n           cb.DELDT AS DateBesoin,\n           ISNULL(cb.TICKETRES,0) AS TicketSortie,\n           cb.COUVREFQTE - ISNULL(cb.SORTIEREFQTE,0) AS QteRestanteACouvrir\n    FROM GPACBESOIN cb\n    JOIN GPAELEM elem ON elem.DOS=cb.DOS AND elem.AFFAIRE=cb.AFFAIRE\n     AND elem.AFRINDICE=cb.AFRINDICE AND elem.ELEMNO=cb.ELEMNO\n    JOIN GATELEMST st ON st.DOS=elem.DOS AND st.STATUTTYP=1\n     AND st.STATUTCOD=elem.STATUTCOD AND st.STATUTM=2\n    JOIN ART art ON art.DOS=cb.DOS AND art.REF=cb.REF\n     AND ISNULL(art.ARTIND,'')=ISNULL(cb.ARTIND,'') AND art.STCOD=2\n    CROSS JOIN Params p\n    WHERE cb.DOS='998' AND elem.ARBOCOD IN ('TEC','REA')\n      AND cb.DELDT >= p.DateDebut AND cb.DELDT < p.DateFin\n      AND cb.COUVREFQTE - ISNULL(cb.SORTIEREFQTE,0) > 0\n),\nBesoins AS (SELECT * FROM BesoinsOF UNION ALL SELECT * FROM BesoinsAffaires),\nReservations AS (\n    SELECT b.CleBesoin,\n           SUM(CASE WHEN b.TicketSortie=0 THEN 0\n                    WHEN r.MRES_ID IS NULL THEN 0\n                    WHEN ISNULL(r.RESQTE,0) <= 0 THEN 0\n                    WHEN r.CE2='1' THEN r.RESQTE\n                    WHEN r.CE2='3' AND vin.DELDT IS NOT NULL\n                         AND vin.DELDT <= b.DateBesoin THEN r.RESQTE\n                    ELSE 0 END) AS QteCouvrante\n    FROM Besoins b\n    LEFT JOIN MRES r ON r.DOS='998' AND r.TICKETRESS=b.TicketSortie\n     AND r.CE1='A' AND b.TicketSortie <> 0\n    LEFT JOIN MVTL vin ON vin.DOS='998' AND vin.TICKETRES=r.TICKETRESE\n     AND vin.SENS=1 AND ISNULL(vin.CE5,'') IN ('','1')\n     AND ISNULL(r.TICKETRESE,0) <> 0\n    GROUP BY b.CleBesoin\n),\nBesoinsNonCouverts AS (\n    SELECT b.CleBesoin, b.TypeBesoin, b.BesoinNo, b.REF, b.ARTIND, b.SREF1, b.SREF2,\n           b.Depot, b.DateBesoin, b.QteRestanteACouvrir,\n           ISNULL(r.QteCouvrante,0) AS QteCouvrante,\n           b.QteRestanteACouvrir - ISNULL(r.QteCouvrante,0) AS QteManquante\n    FROM Besoins b\n    LEFT JOIN Reservations r ON r.CleBesoin=b.CleBesoin\n    WHERE b.QteRestanteACouvrir > ISNULL(r.QteCouvrante,0)\n),\nBesoinsAvecArticle AS (\n    SELECT b.*,\n           b.REF + ISNULL('-'+NULLIF(LTRIM(RTRIM(b.ARTIND)),''),'')\n           + ISNULL('-'+NULLIF(LTRIM(RTRIM(b.SREF1)),''),'')\n           + ISNULL('-'+NULLIF(LTRIM(RTRIM(b.SREF2)),''),'') AS RefComplete,\n           a.DES AS Designation\n    FROM BesoinsNonCouverts b\n    LEFT JOIN ART a ON a.DOS='998' AND a.REF=b.REF\n     AND ISNULL(a.ARTIND,'')=ISNULL(b.ARTIND,'')\n),\nSyntheseArticle AS (\n    SELECT RefComplete, REF, ARTIND, SREF1, SREF2, Depot,\n           MAX(Designation) AS Designation,\n           MIN(DateBesoin) AS PremiereDateBesoin,\n           COUNT(*) AS NbBesoinsBloquants,\n           COUNT(DISTINCT CASE WHEN TypeBesoin='OF' THEN BesoinNo END) AS NbOFImpactes,\n           COUNT(DISTINCT CASE WHEN TypeBesoin='Affaire' THEN BesoinNo END) AS NbAffairesImpactees,\n           SUM(QteRestanteACouvrir) AS QteRestanteACouvrir,\n           SUM(QteCouvrante) AS QteCouvrante,\n           SUM(QteManquante) AS QteManquante,\n           STRING_AGG(CAST(TypeBesoin+' '+BesoinNo\n               +' ('+ISNULL(CONVERT(varchar(10),DateBesoin,120),'-')+')' AS varchar(max)),' | ') AS BesoinsImpactes\n    FROM BesoinsAvecArticle\n    GROUP BY RefComplete, REF, ARTIND, SREF1, SREF2, Depot\n)\nSELECT RefComplete, REF, ARTIND, SREF1, SREF2, Depot, Designation,\n       PremiereDateBesoin, NbBesoinsBloquants, NbOFImpactes, NbAffairesImpactees,\n       QteRestanteACouvrir, QteCouvrante, QteManquante, BesoinsImpactes\nFROM SyntheseArticle\nORDER BY NbBesoinsBloquants DESC, PremiereDateBesoin, QteManquante DESC, RefComplete;",
    pratique: "Usage prévu par la doc : trouver les articles « goulots » à approvisionner en urgence et mesurer l'impact global d'une rupture (OF et affaires).",
    motsCles: ["articles bloquants", "goulot", "rupture", "manquants", "composants", "besoins", "urgence", "approvisionnement", "of", "affaire", "industrie", "dataviz"],
    voirAussi: ["dv-art", "dv-mres", "dv-gpacbesoin", "dv-mouv", "string-agg", "count"],
    source: { titre: "Industrie", url: "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/12896370759/Industrie" }
  },
  {
    id: "dv-rq-sig",
    nom: "Soldes intermédiaires de gestion (SIG)",
    type: "requête",
    domaine: "divalto",
    categorie: "Requêtes Dataviz",
    definition: "Requêtes Dataviz Finances : les soldes intermédiaires de gestion, calculés sur les écritures comptables C8.",
    noms: ["SIG", "C8_SIG"],
    indicateurs: [
      "Ventes de marchandises",
      "Production vendue",
      "Montant net du chiffre d'affaires",
      "Coût d'achat des marchandises",
      "Marge commerciale",
      "Production de l'exercice",
      "Consommations en provenance des tiers",
      "Valeur ajoutée",
      "Excédent ou insuffisance brut d'exploitation",
      "Résultat d'exploitation",
      "Résultat courant avant impôts",
      "Résultat exceptionnel",
      "Résultat net",
      "EBITDA",
      "Plus ou moins-values sur … (nom coupé dans la doc)",
      "C8_SIG : tous les indicateurs dans un tableau"
    ],
    regles: [
      "Construites sur les écritures comptables (table C8)",
      "Basées sur des tables uniques (C8 et CX) et des données historiques : utilisables sur toutes les versions maintenues",
      "Écritures de type comptable seulement",
      "Dossier comptable courant",
      "Écritures datées de l'année 2026",
      "Deux approches : une requête par indicateur (un montant, accès réservé à certains profils), et une requête globale C8_SIG (tableau)",
      "Calculs selon les modifications du CNOEC du 4 juillet 2024 (plan comptable 2025, règlement ANC 2022-06)",
      "Écrites sur la base standard Papyrus : à adapter si besoin (établissements, confidentialités)",
      "Noms des fichiers coupés dans la doc : libellés complétés avec les noms usuels des SIG"
    ],
    piege: "Les requêtes ne prennent que les écritures de l'année 2026. En 2027, elles montreront encore 2026 : change l'année dans chaque requête.",
    pratique: "Pour protéger les chiffres sensibles, ne donne les requêtes par indicateur qu'aux profils autorisés ; la requête globale C8_SIG montre tout le tableau d'un coup.",
    motsCles: ["sig", "soldes intermediaires de gestion", "marge commerciale", "valeur ajoutee", "ebe", "excedent brut d'exploitation", "resultat d'exploitation", "resultat net", "ebitda", "chiffre d'affaires", "finance", "comptabilite", "dataviz"],
    voirAussi: ["dv-c8", "dv-rq-repartition-analytique", "sum", "case"],
    source: { titre: "Finances", url: "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/12897386514/Finances" }
  },
  {
    id: "dv-rq-repartition-analytique",
    nom: "Répartition analytique par axe (CX)",
    type: "requête",
    domaine: "divalto",
    categorie: "Requêtes Dataviz",
    definition: "Requêtes Dataviz Finances : la répartition des ventilations analytiques, un camembert par axe.",
    indicateurs: [
      "Répartition des ventilations pour un axe analytique donné",
      "Une requête par axe (4 fichiers « CX_Répartition analytiqu… » dans la doc)"
    ],
    regles: [
      "Construites sur les ventilations analytiques (table CX), rattachées aux écritures comptables",
      "Dossier comptable courant",
      "Ventilations d'écritures datées de l'exercice 2026",
      "Une requête par axe analytique, en graphique camembert",
      "Restitutions croisables entre axes si besoin"
    ],
    piege: "Comme les SIG, ces requêtes se limitent à l'exercice 2026 : change l'année, sinon le camembert reste figé sur 2026.",
    pratique: "Un axe par graphique garde le camembert lisible : centre de coûts, activité, projet… selon les axes de ton dossier.",
    motsCles: ["analytique", "axe analytique", "repartition par axe", "repartition", "centre de cout", "camembert", "cx", "comptabilite analytique", "finance", "dataviz"],
    voirAussi: ["dv-cx", "dv-axe", "dv-c5", "dv-rq-sig"],
    source: { titre: "Finances", url: "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/12897386514/Finances" }
  },
  {
    id: "dv-rq-ca-contrats-famille",
    nom: "Répartition du CA contrats par famille de contrat",
    type: "requête",
    domaine: "divalto",
    categorie: "Requêtes Dataviz",
    definition: "Requête Dataviz Service : le cumul facturé des contrats, par famille, depuis le début de l'année.",
    indicateurs: [
      "Famille de contrat",
      "Cumul des montants facturés à partir des préparations de factures contrat (montant ligne)"
    ],
    regles: [
      "Basée sur la table CONTRATPREFA (préparations de factures contrat, PFC)",
      "PFC facturées et non annulées",
      "PFC en euros seulement",
      "Agrégation du montant ligne",
      "Depuis le début de l'année courante",
      "Positionnement : écran d'accueil ; deux présentations, Résultats et Graphique"
    ],
    piege: "Seules les PFC en euros sont prises : si une partie de tes contrats est facturée dans une autre devise, ce CA manque dans le graphique.",
    pratique: "Usage prévu par la doc : comprendre la composition du chiffre d'affaires et juger la pertinence des offres de contrats.",
    motsCles: ["chiffre d'affaires contrats", "famille de contrat", "contrats", "pfc", "preparation facture contrat", "maintenance", "abonnement", "repartition", "service", "dataviz"],
    voirAussi: ["dv-contratprefa", "dv-ceacontrat", "sum", "group-by"],
    source: { titre: "Service", url: "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/12897943559/Service" }
  },
  {
    id: "dv-rq-contrats-actifs-client",
    nom: "État des contrats actifs du client",
    type: "requête",
    domaine: "divalto",
    categorie: "Requêtes Dataviz",
    definition: "Requête Dataviz Service : la synthèse de facturation des contrats actifs d'un client, en liste.",
    indicateurs: [
      "Référence, famille, site de rattachement, statut du contrat",
      "Date du prochain renouvellement",
      "Dernière échéance préparée en facture : date, période de facturation (début, fin)",
      "Montant annuel actualisé du contrat",
      "Prochaine échéance : date, statut (A VENIR ou EN RETARD), montant estimé, pourcentage",
      "Mode de calcul : prix manuel ou d'après les matériels"
    ],
    regles: [
      "Basée sur CEACONTRAT, CONTRATPREFA et CONTRATCAL (la doc écrit « CONTRAPREFA »)",
      "Contrats actifs, facturés au montant ou d'après les matériels en détention",
      "Montant annuel actualisé recalculé dans la requête : en base, il peut être annuel, global ou « à la facture »",
      "Montant estimé = pourcentage du calendrier × montant actualisé",
      "Statut A VENIR pour une échéance future, EN RETARD pour une échéance passée",
      "Positionnement : tableau de bord du client"
    ],
    piege: "Le montant du contrat en base n'est pas toujours annuel (annuel, global ou « à la facture ») : ne le somme pas tel quel, la requête le ramène en montant annuel.",
    pratique: "Le montant actualisé est recalculé à chaque préparation de facture contrat : relance la requête après une préparation pour avoir des chiffres à jour.",
    motsCles: ["contrats actifs", "contrat client", "echeance", "renouvellement", "tableau de bord client", "calendrier contrat", "montant annuel", "en retard", "service", "dataviz"],
    voirAussi: ["dv-ceacontrat", "dv-contratcal", "dv-contratprefa", "dv-rq-contrats-actifs-site"],
    source: { titre: "Service", url: "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/12897943559/Service" }
  },
  {
    id: "dv-rq-contrats-actifs-site",
    nom: "État des contrats actifs du site",
    type: "requête",
    domaine: "divalto",
    categorie: "Requêtes Dataviz",
    definition: "Requête Dataviz Service : la synthèse de facturation des contrats actifs d'un site, en liste.",
    indicateurs: [
      "Référence, famille, site de rattachement, statut du contrat",
      "Date du prochain renouvellement",
      "Dernière échéance préparée en facture : date, période de facturation (début, fin)",
      "Montant annuel actualisé du contrat",
      "Prochaine échéance : date, statut (A VENIR ou EN RETARD), montant estimé, pourcentage",
      "Mode de calcul : prix manuel ou d'après les matériels"
    ],
    regles: [
      "Basée sur CEACONTRAT, CONTRATPREFA et CONTRATCAL",
      "Contrats actifs, facturés au montant ou d'après les matériels en détention",
      "Montant annuel actualisé recalculé dans la requête",
      "Montant estimé = pourcentage du calendrier × montant actualisé",
      "Statut A VENIR pour une échéance future, EN RETARD pour une échéance passée",
      "Positionnement : tableau de bord du site"
    ],
    pratique: "Usage prévu par la doc : voir en un coup d'œil la situation financière des contrats d'un site. Même calcul que la requête du client.",
    motsCles: ["contrats actifs", "contrat site", "site", "tableau de bord site", "echeance", "renouvellement", "calendrier contrat", "en retard", "service", "dataviz"],
    voirAussi: ["dv-site", "dv-ceacontrat", "dv-contratcal", "dv-rq-contrats-actifs-client"],
    source: { titre: "Service", url: "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/12897943559/Service" }
  },
  {
    id: "dv-vues-sql",
    nom: "Vues SQL Divalto (_V et _VU)",
    type: "vue",
    domaine: "divalto",
    categorie: "Vues Divalto",
    definition: "Les vues SQL livrées par Divalto : des requêtes stockées, plus simples à lire que les tables.",
    noms: ["ERP_Divalto_SqlView.sql", "vue de vue", "_VU"],
    champs: [
      ["xx_ID", "identifiant de la ligne de la table lue (ex. ART_ID) : sert de lien pour une vue de vue"],
      ["CLE_xxx", "clés prêtes pour relier les vues entre elles (ex. CLE_ARTICLE)"],
      ["DOSSIER", "code dossier (dans ARTICLE_V : ART.DOS)"]
    ],
    liens: [
      "Vue standard : nom en MAJUSCULES, suffixe _V (ex. ARTICLE_V) ; vue complémentaire ou de surcharge : suffixe _VU",
      "Vue de vue : la nouvelle vue relit toute la vue standard et la joint à la table par le champ xx_ID",
      "Script livré dans le zip « Decisionnel_infinity_x4 », sous-dossier « 6 Sources / Divalto reporting / Scripts SQL »"
    ],
    exemple: "IF OBJECT_ID('ARTICLE_VU', 'V') IS NOT NULL DROP VIEW ARTICLE_VU\nGO\nCREATE VIEW ARTICLE_VU AS\nSELECT dbo.ARTICLE_V.*, dbo.ART.CHAMPS_SURCHARGE  -- ton champ ajouté (nom d'exemple de la doc)\nFROM dbo.ARTICLE_V\nINNER JOIN dbo.ART ON dbo.ARTICLE_V.ART_ID = dbo.ART.ART_ID",
    piege: "Ne modifie pas le script standard ERP_Divalto_SqlView.sql : à la montée de version, tes modifications seront difficiles à retrouver. Écris une vue _VU dans un script à part.",
    pratique: "Pour trouver la vue d'une table : dans le zoom, menu Aide / À propos donne la table (ex. ART) ; cherche « FROM ART » dans ERP_Divalto_SqlView.sql et remonte au CREATE VIEW.",
    motsCles: ["vue", "vues sql", "view", "trouver la vue", "surcharge de vue", "vue de vue", "sqlview", "create view", "reporting", "power bi", "decisionnel", "vue complementaire"],
    voirAussi: ["create-view", "dv-article-v", "dv-cle", "dv-id"],
    sources: [
      { titre: "Vue SQL", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/10516466303/Vue+SQL" },
      { titre: "Surcharge ou modification de vue", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/10516466340/Surcharge+ou+modification+de+vue" },
      { titre: "Comment trouver la vue qu'il me faut", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/10516466375/Comment+trouver+la+vue+qu+il+me+faut" }
    ]
  },
  {
    id: "dv-article-v",
    nom: "ARTICLE_V",
    type: "vue",
    domaine: "divalto",
    categorie: "Vues Divalto",
    definition: "La vue SQL des articles : la table ART avec des noms de colonnes clairs et des libellés déjà joints.",
    champs: [
      ["ART_ID", "identifiant de l'article dans ART (lien direct ARTICLE_V.ART_ID = ART.ART_ID)"],
      ["DOSSIER", "code dossier (ART.DOS)"],
      ["REFERENCE", "référence de l'article (ART.REF)"],
      ["DESIGNATION", "désignation (ART.DES)"],
      ["NATUREPRODUIT", "code nature de produit (ART.PRODNAT)"],
      ["NATUREPRODUITLIBELLE", "libellé de la nature de produit (table T036)"],
      ["CLASSEPRODUIT", "classe de produit : 1er caractère de PRODNAT"],
      ["LIBELLE_FAM_STAT1 à 3", "libellés des familles statistiques 1 à 3 de l'article"],
      ["FOURHABITUEL", "fournisseur habituel de l'article"],
      ["CLE_ARTICLE", "clé primaire de la vue, pour la relier aux autres vues"]
    ],
    liens: [
      "ART : la table lue (une ligne ARTICLE_V par article)",
      "SOC : jointe sur ART.DOS = SOC.DOS ; TABLE_NATURE_PRODUIT_V : libellé de la nature",
      "COMMANDE_VENTE_MOUV_V et FACTURE_VENTE_MOUV_V : reliées par CLE_ARTICLE"
    ],
    exemple: "SELECT ARTICLE_V.DOSSIER,\n       ARTICLE_V.REFERENCE,\n       ARTICLE_V.DESIGNATION,\n       ARTICLE_V.NATUREPRODUIT,\n       ARTICLE_V.NATUREPRODUITLIBELLE,\n       ARTICLE_V.CLASSEPRODUIT\nFROM ARTICLE_V\nORDER BY DOSSIER, REFERENCE;",
    piege: "CLE_ARTICLE colle le dossier et la référence (ex. « 998 @PF000091 ») : compare-la à une autre clé CLE_ARTICLE, jamais à ART.REF seule.",
    pratique: "Il te manque une clé ? Crée ARTICLE_VU avec dbo.CLECONCAT(ARTICLE_V.DOSSIER, ARTICLE_V.FOURHABITUEL, null, null, null, null, null) AS CLE_FOURNISSEUR : jusqu'à 7 champs, NULL pour les inutiles.",
    motsCles: ["vue article", "articles", "article_v", "reference article", "designation", "nature de produit", "famille statistique", "fournisseur habituel", "cle article", "power bi", "reporting"],
    voirAussi: ["dv-art", "dv-vues-sql", "dv-cle", "dv-table-nature-produit-v", "dv-t036"],
    sources: [
      { titre: "Les widgets  KPI", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/10516465387/Les+widgets+KPI" },
      { titre: "Microsoft Power BI", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/10516467268/Microsoft+Power+BI" },
      { titre: "Comment ajouter un champ CLE a une vue avec règle nommage CLE", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/10516466354/Comment+ajouter+un+champ+CLE+a+une+vue+avec+r+gle+nommage+CLE" }
    ]
  },
  {
    id: "dv-commande-vente-mouv-v",
    nom: "COMMANDE_VENTE_MOUV_V",
    type: "vue",
    domaine: "divalto",
    categorie: "Vues Divalto",
    definition: "La vue SQL des lignes de commandes de vente : quantités et montants, avec des clés vers les autres vues.",
    champs: [
      ["DOSSIER", "code dossier"],
      ["ETABLISSEMENT", "code établissement"],
      ["REFERENCE", "référence de l'article commandé"],
      ["QUANTITESIGNEE", "quantité de la ligne, cumulée par SUM dans l'exemple de la doc"],
      ["MONTANTSIGNE_DEV", "montant en devise, cumulé par SUM dans l'exemple de la doc"],
      ["CLE_DOSSIER", "clé du dossier, jointe à ARTICLE_V.DOSSIER"],
      ["CLE_ARTICLE", "clé de l'article (le même champ que dans ARTICLE_V)"]
    ],
    liens: [
      "ARTICLE_V : par CLE_ARTICLE, ou par CLE_DOSSIER + REFERENCE (exemple de la doc)"
    ],
    exemple: "SELECT CDE.DOSSIER, CDE.ETABLISSEMENT, CDE.REFERENCE,\n       ARTICLE_V.LIBELLE_FAM_STAT1 AS ARTICLE_STAT1,\n       SUM(CDE.QUANTITESIGNEE) AS QUANTITE_CUMUL,\n       SUM(CDE.MONTANTSIGNE_DEV) AS MONTANT_CUMUL\nFROM COMMANDE_VENTE_MOUV_V AS CDE\nLEFT JOIN ARTICLE_V ON ARTICLE_V.DOSSIER = CDE.CLE_DOSSIER\n                   AND ARTICLE_V.REFERENCE = CDE.REFERENCE\nGROUP BY CDE.DOSSIER, CDE.ETABLISSEMENT, CDE.REFERENCE, ARTICLE_V.LIBELLE_FAM_STAT1;",
    pratique: "La doc s'en sert pour un instantané BI : photographier chaque jour les quantités en commande par article, puis suivre leur évolution dans le temps.",
    motsCles: ["lignes de commande", "commandes de vente", "commandes clients", "portefeuille de commandes", "quantite commandee", "montant commande", "vue commande", "instantane", "power bi"],
    voirAussi: ["dv-mouv", "dv-article-v", "dv-cle", "sum", "group-by"],
    sources: [
      { titre: "Fichier de description des requêtes SQL pour snapshot", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/10516466751/Fichier+de+description+des+requ+tes+SQL+pour+snapshot" },
      { titre: "Microsoft Power BI", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/10516467268/Microsoft+Power+BI" }
    ]
  },
  {
    id: "dv-facture-vente-mouv-v",
    nom: "FACTURE_VENTE_MOUV_V",
    type: "vue",
    domaine: "divalto",
    categorie: "Vues Divalto",
    definition: "La vue SQL des lignes de factures de vente ; sa clé CLE_ARTICLE pointe vers l'article vendu.",
    champs: [
      ["CLE_ARTICLE", "clé étrangère vers l'article vendu (relie ARTICLE_V)"]
    ],
    liens: [
      "ARTICLE_V : par CLE_ARTICLE (clé primaire de ARTICLE_V)",
      "Requêtes Dataviz « articles les plus vendus » et « les moins sortis » : fichiers nommés FACTURE_VENTE_MOUV_V_Art…"
    ],
    pratique: "Pour analyser les ventes par article dans Power BI, relie cette vue à ARTICLE_V par CLE_ARTICLE : c'est la relation conseillée par la doc.",
    motsCles: ["lignes de factures", "factures de vente", "ventes par article", "quantites vendues", "chiffre d'affaires", "vue facture", "cle article", "power bi", "facturation"],
    voirAussi: ["dv-mouv", "dv-article-v", "dv-cle", "dv-rq-articles-plus-vendus"],
    sources: [
      { titre: "Comment ajouter un champ CLE a une vue avec règle nommage CLE", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/10516466354/Comment+ajouter+un+champ+CLE+a+une+vue+avec+r+gle+nommage+CLE" },
      { titre: "Négoce", url: "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/12897484806/N+goce" }
    ]
  },
  {
    id: "dv-fournisseur-v",
    nom: "FOURNISSEUR_V",
    type: "vue",
    domaine: "divalto",
    categorie: "Vues Divalto",
    definition: "La vue SQL des fournisseurs, montrée dans le modèle Power BI d'exemple de la doc.",
    champs: [
      ["FOU_ID", "identifiant du fournisseur (règle xx_ID des vues)"],
      ["DOSSIER", "code dossier"],
      ["TIERS", "code du fournisseur"],
      ["NOMABREGE", "nom abrégé"],
      ["NOMFOURNISSEUR", "nom du fournisseur"],
      ["RUE", "rue de l'adresse"]
    ],
    liens: [
      "COMMANDE_ACHAT_MOUV_V et FACTURE_ACHAT_MOUV_V : 1 fournisseur pour n lignes (modèle Power BI de la doc)",
      "FOU : la table des fournisseurs"
    ],
    motsCles: ["vue fournisseurs", "fournisseurs", "fournisseur_v", "nom fournisseur", "code fournisseur", "achats", "power bi", "reporting"],
    voirAussi: ["dv-fou", "dv-commande-achat-mouv-v", "dv-vues-sql", "dv-id"],
    source: { titre: "Microsoft Power BI", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/10516467268/Microsoft+Power+BI" },
    version: "Colonnes lues sur une capture d'une ancienne base (Divalto_VG81, SQL Server 2012) : vérifie-les sur ta version."
  },
  {
    id: "dv-commande-achat-mouv-v",
    nom: "COMMANDE_ACHAT_MOUV_V",
    type: "vue",
    domaine: "divalto",
    categorie: "Vues Divalto",
    definition: "La vue SQL des lignes de commandes d'achat, montrée dans le modèle Power BI d'exemple de la doc.",
    champs: [
      ["MOUV_ID", "identifiant de la ligne dans MOUV"],
      ["DOSSIER", "code dossier"],
      ["REFERENCE", "référence de l'article"],
      ["TIERS", "code du fournisseur"],
      ["FOURNISSEURNOM", "nom du fournisseur"],
      ["NUMERO", "numéro de la commande"],
      ["DATECOMMANDE", "date de la commande"]
    ],
    liens: [
      "ARTICLE_V : 1 article pour n lignes ; FOURNISSEUR_V : 1 fournisseur pour n lignes (modèle Power BI)",
      "CALENDRIER : 1 pour n lignes, dans le même modèle Power BI",
      "MOUV : la table des lignes (MOUV_ID)"
    ],
    motsCles: ["lignes de commande d'achat", "commandes fournisseur", "commandes d'achat", "achats", "vue commande achat", "date de commande", "power bi", "reporting"],
    voirAussi: ["dv-mouv", "dv-fournisseur-v", "dv-facture-achat-mouv-v", "dv-article-v"],
    source: { titre: "Microsoft Power BI", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/10516467268/Microsoft+Power+BI" },
    version: "Colonnes lues sur une capture d'une ancienne base (Divalto_VG81, SQL Server 2012) : vérifie-les sur ta version."
  },
  {
    id: "dv-facture-achat-mouv-v",
    nom: "FACTURE_ACHAT_MOUV_V",
    type: "vue",
    domaine: "divalto",
    categorie: "Vues Divalto",
    definition: "La vue SQL des lignes de factures d'achat, montrée dans le modèle Power BI d'exemple de la doc.",
    champs: [
      ["MOUV_ID", "identifiant de la ligne dans MOUV"],
      ["DOSSIER", "code dossier"],
      ["REFERENCE", "référence de l'article"],
      ["SREFERENCE1 / SREFERENCE2", "sous-références 1 et 2"],
      ["TIERS", "code du fournisseur"],
      ["FOURNISSEURNOM", "nom du fournisseur"],
      ["NUMERO", "numéro de la facture"]
    ],
    liens: [
      "ARTICLE_V : 1 article pour n lignes ; FOURNISSEUR_V : 1 fournisseur pour n lignes (modèle Power BI)",
      "MOUV : la table des lignes (MOUV_ID)"
    ],
    motsCles: ["lignes de factures d'achat", "factures fournisseur", "factures d'achat", "achats", "vue facture achat", "power bi", "reporting", "sous-reference"],
    voirAussi: ["dv-mouv", "dv-fournisseur-v", "dv-commande-achat-mouv-v"],
    source: { titre: "Microsoft Power BI", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/10516467268/Microsoft+Power+BI" },
    version: "Colonnes lues sur une capture d'une ancienne base (Divalto_VG81, SQL Server 2012) : vérifie-les sur ta version."
  },
  {
    id: "dv-of-entete-v",
    nom: "OF_ENTETE_V",
    type: "vue",
    domaine: "divalto",
    categorie: "Vues Divalto",
    definition: "La vue SQL des en-têtes d'ordres de fabrication (OF), avec leurs clés vers l'article et le dossier.",
    champs: [
      ["BF_ID", "identifiant de l'en-tête d'OF dans la table BF"],
      ["CLE_OF_ENTETE", "clé de l'OF : dossier et numéro (ex. « 998 @ 501 »)"],
      ["CLE_ARTICLE", "clé de l'article (ex. « 998 @PF000091 »)"],
      ["CLE_DOSSIER", "clé du dossier (ex. « 998 »)"]
    ],
    liens: [
      "BF : la table des en-têtes d'OF (BF_ID)",
      "Autres vues de production listées dans Power BI, sans description : OF_COMPOSANTS_V, MVTL_OF_COMPOSANT_V, MVTL_OF_COMPOSE_V"
    ],
    motsCles: ["of", "ordres de fabrication", "en-tete of", "vue of", "production", "fabrication", "power bi", "bf"],
    voirAussi: ["dv-bf", "dv-cle", "dv-vues-sql", "dv-rq-of-sans-reservations"],
    source: { titre: "Microsoft Power BI", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/10516467268/Microsoft+Power+BI" },
    version: "Capture d'une ancienne base (Divalto_VG81) : vérifie les colonnes sur ta version."
  },
  {
    id: "dv-action-materiel-v",
    nom: "ACTION_MATERIEL_V",
    type: "vue",
    domaine: "divalto",
    categorie: "Vues Divalto",
    definition: "La vue SQL des actions sur les matériels, donnée en exemple d'accès OData dans Excel.",
    champs: [
      ["GMACT_ID", "identifiant de l'action matériel"],
      ["DOSSIER / CLE_DOSSIER", "code dossier et sa clé"],
      ["CODEINTERVENTION_MATERIEL", "code d'intervention, précédé du dossier (ex. « 998 @NIVEAUHUILE »)"],
      ["NUMEROACTION", "numéro de l'action"],
      ["NUMEROMATERIEL", "numéro du matériel"],
      ["CODEMATERIEL", "code du matériel"]
    ],
    liens: [
      "OData : l'exemple de la doc charge la vue filtrée sur le dossier 998 (« @998 » à la fin de l'URL)"
    ],
    piege: "OData donne accès à toutes les données des tables, sans les confidentialités métier : un classeur Excel connecté montre tout ce que la vue contient.",
    pratique: "Avec OData, ajoute « @ » et le code dossier à la fin de l'URL : la doc le conseille fortement pour ne charger qu'un dossier.",
    motsCles: ["odata", "excel", "actions materiel", "materiel", "intervention", "equipement", "power query", "vue materiel", "grm"],
    voirAussi: ["dv-vues-sql", "dv-cle", "dv-dos"],
    source: { titre: "OData pour divalto ERP", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/10777067523/OData+pour+divalto+ERP" }
  },
  {
    id: "dv-table-nature-produit-v",
    nom: "TABLE_NATURE_PRODUIT_V",
    type: "vue",
    domaine: "divalto",
    categorie: "Vues Divalto",
    definition: "La vue SQL de la table des natures de produit (T036) : code et libellé, par dossier.",
    champs: [
      ["NATUREPRODUIT", "code nature de produit"],
      ["LIBELLE", "libellé de la nature"],
      ["DOSC", "dossier de la ligne, à joindre au dossier de l'article"]
    ],
    liens: [
      "ARTICLE_V : ARTICLE_V.NATUREPRODUIT = NATUREPRODUIT et ARTICLE_V.DOSSIER = DOSC",
      "T036 : la table des natures de produit"
    ],
    exemple: "SELECT ARTICLE_V.DOSSIER,\n       ARTICLE_V.REFERENCE,\n       NATURE_PRODUIT.LIBELLE AS NATUREPRODUITLIBELLE\nFROM ARTICLE_V\nLEFT JOIN TABLE_NATURE_PRODUIT_V AS NATURE_PRODUIT\n  ON (ARTICLE_V.NATUREPRODUIT = NATURE_PRODUIT.NATUREPRODUIT\n      AND ARTICLE_V.DOSSIER = NATURE_PRODUIT.DOSC)\nORDER BY DOSSIER, REFERENCE;",
    pratique: "La vue t'évite le test du dossier commun : avec la table T036 brute, il faut lire T000.TABTYP_0036 pour savoir si la table est commune ('999').",
    motsCles: ["nature de produit", "natures", "classe produit", "libelle nature", "table des natures", "vue nature", "t036", "achete fabrique"],
    voirAussi: ["dv-t036", "dv-article-v", "dv-txxx", "left-join"],
    source: { titre: "Les widgets  KPI", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/10516465387/Les+widgets+KPI" }
  },
  {
    id: "dv-table-competence-v",
    nom: "TABLE_COMPETENCE_V",
    type: "vue",
    domaine: "divalto",
    categorie: "Vues Divalto",
    definition: "La vue SQL des compétences : code et libellé, à joindre au code compétence de l'article.",
    champs: [
      ["CODECOMPETENCE", "code compétence"],
      ["LIBELLE", "libellé de la compétence"],
      ["DOSC", "dossier de la ligne"]
    ],
    liens: [
      "ART : ART.COMPETCOD = TABLE_COMPETENCE_V.CODECOMPETENCE, avec ARTICLE_V.DOSSIER = DOSC (exemple 2 de la doc)"
    ],
    exemple: "CREATE VIEW ARTICLE_VU AS\nSELECT dbo.ARTICLE_V.*, dbo.TABLE_COMPETENCE_V.LIBELLE\nFROM dbo.ARTICLE_V\nINNER JOIN dbo.ART ON dbo.ARTICLE_V.ART_ID = dbo.ART.ART_ID\nLEFT JOIN dbo.TABLE_COMPETENCE_V\n  ON TABLE_COMPETENCE_V.DOSC = ARTICLE_V.DOSSIER\n AND ART.COMPETCOD = TABLE_COMPETENCE_V.CODECOMPETENCE",
    pratique: "Cet exemple de la doc montre la vue de vue « jointure simple et champ supplémentaire » : la vue standard reste intacte, ta vue _VU ajoute le libellé.",
    motsCles: ["competence", "code competence", "libelle competence", "vue competence", "surcharge", "article", "domaine de competence", "jointure"],
    voirAussi: ["dv-vues-sql", "dv-article-v", "dv-art"],
    source: { titre: "Surcharge ou modification de vue", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/10516466340/Surcharge+ou+modification+de+vue" }
  },
  {
    id: "dv-ent",
    nom: "ENT",
    type: "table",
    domaine: "divalto",
    categorie: "Tables Divalto",
    definition: "L'en-tête des pièces commerciales : un devis, une commande, un BL ou une facture, client ou fournisseur.",
    noms: ["en-tête de pièce", "entête de pièce", "pièce commerciale", "GTFENT"],
    champs: [
      ["DOS", "dossier"],
      ["TICOD", "type de tiers : C client, F fournisseur, P prospect, I interne"],
      ["PICOD", "type de pièce : 1 devis, 2 commande, 3 BL, 4 facture, 5 relevé, 6 devis travaux, 7 situation"],
      ["PREFPINO", "préfixe du numéro de pièce"],
      ["PINO", "numéro de pièce"],
      ["PIDT", "date de la pièce"],
      ["TIERS", "code tiers"],
      ["ETB / DEPO", "établissement, dépôt"],
      ["OP", "code opération"],
      ["STATUS", "commande client : 1 à préparer, 2 préparée (ou sans préparation), 3 en cours de préparation ; commande fournisseur : 1 AR en attente, 2 AR reçu ou non demandé"],
      ["CE2", "intégration comptable : 1 = facture à intégrer"],
      ["CE4", "état : 1 actif, 2 suspendu, 4 modèle, 6 attente, 7 préparé, 8 périmé, 9 transféré, A archivé"],
      ["PIREF", "référence de la pièce (ex. référence du client)"],
      ["PINOTIERS", "numéro de la pièce chez le tiers"],
      ["HTMT / TTCMT", "montants HT et TTC de la pièce"],
      ["DEV / DEVP", "devise, taux de change"],
      ["DELDEMDT / DELACCDT", "délais de livraison demandé, accepté"],
      ["ECHDT", "date d'échéance"],
      ["TIERSGRP", "code centrale"],
      ["ORIGINE", "origine : 1 saisie, 2 GTFI, 3 Internet, 4 EDI, 5 production, 10 Mobileo, 11 Retail"],
      ["INTEGREGL / USERINTEGRE", "importation comptable (1 non, 2 oui), utilisateur qui l'a lancée"],
      ["ETATPDFSIGNE", "facture dématérialisée : 2 = un PDF est présent, 1 = aucun PDF"],
      ["ENT_ID", "identifiant technique de l'en-tête"]
    ],
    liens: [
      "MOUV : les lignes, avec le même DOS et TICOD ; MOUV.CDNO = ENT.PINO pour une commande (DVNO devis, BLNO BL, FANO facture)",
      "Une pièce par étape : le devis, la commande, le BL et la facture ont chacun leur ENT ; la ligne MOUV reste la même",
      "EAD : adresses saisies sur la pièce ; EEC : échéances multiples",
      "CLI, FOU, PRO : le tiers (ENT.TIERS), selon TICOD"
    ],
    exemple: "-- Les lignes des commandes clients actives (998 : dossier des exemples de la doc)\nSELECT e.PINO, e.PIDT, m.REF, m.DES, m.CDQTE\nFROM ENT e\nJOIN MOUV m ON m.DOS = e.DOS AND m.TICOD = e.TICOD\n           AND m.CDNO = e.PINO AND m.CE2 = '1'\nWHERE e.DOS = '998' AND e.TICOD = 'C' AND e.PICOD = 2\n  AND e.CE4 = '1';",
    piege: "PINO seul n'identifie pas une pièce : les compteurs sont séparés par type (devis client, commande fournisseur…). Filtre toujours DOS, TICOD et PICOD avec PINO.",
    pratique: "Facture bloquée en intégration comptable ? Lis INTEGREGL, USERINTEGRE et USERINTEGREDH : le widget de la doc montre celles lancées depuis plus de 15 minutes.",
    motsCles: ["entete de piece", "en-tete", "piece", "commande", "devis", "bon de livraison", "facture", "numero de piece", "type de piece", "montant ht", "pieces commerciales", "ent"],
    voirAussi: ["dv-mouv", "dv-mvtl", "dv-ticod", "dv-picod", "dv-pino", "dv-ce4"],
    sources: [
      { titre: "Achat-vent technique base - Pièces", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/11490099273/Achat-vent+technique+base+-+Pi+ces" },
      { titre: "L'intégration dans l'ERP", url: "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/12186452020/L+int+gration+dans+l+ERP" },
      { titre: "Colonnes dédiées à la dématérialisation de facture dans la table ENT", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/11704074252/Colonnes+d+di+es+la+d+mat+rialisation+de+facture+dans+la+table+ENT" }
    ],
    version: "CE2 : la doc technique dit 1 = facture à intégrer, 2 ou espace = intégrée (ou sans intégration). La page « L'intégration dans l'ERP » écrit 1 = non intégrée et ≠ 1 = à intégrer. La fiche suit la doc technique : vérifie sur ta base."
  },
  {
    id: "dv-mouv",
    nom: "MOUV",
    type: "table",
    domaine: "divalto",
    categorie: "Tables Divalto",
    definition: "Les lignes des pièces commerciales : une ligne par article, gardée du devis jusqu'à la facture.",
    noms: ["mouvements", "lignes de pièce", "GTFAM"],
    champs: [
      ["DOS", "dossier"],
      ["TICOD", "type de tiers"],
      ["PICOD", "type de la pièce active : il évolue avec l'état de la ligne"],
      ["TIERS", "code tiers"],
      ["REF / SREF1 / SREF2", "référence article et sous-références"],
      ["DES", "désignation"],
      ["DVNO / CDNO / BLNO / FANO", "numéro de devis, de commande, de BL, de facture"],
      ["CDDT / BLDT", "date de commande, de BL"],
      ["FADT", "date de facture, ou date du dernier mouvement"],
      ["CDCE4 / BLCE4 / FACE4", "état de la ligne à chaque étape (1 actif, 8 périmé…)"],
      ["CE2", "1 mouvement (ligne article), 2 chapitre, 3 poste"],
      ["CE6 / CE7 / CE8", "1 si la ligne est passée en commande, en BL, en facture"],
      ["CDQTE / BLQTE / FAQTE", "quantité commandée, livrée, facturée"],
      ["REFQTE", "quantité en unité de référence"],
      ["PUB", "prix unitaire brut"],
      ["REM", "remises 1 à 3"],
      ["MONT", "montant de la ligne (total si chapitre ou poste)"],
      ["SENS", "1 entrée, 2 sortie"],
      ["OP / DEPO / ETB", "code opération, dépôt, établissement"],
      ["ENRNO", "numéro d'enregistrement de la ligne (lien vers MVTL)"],
      ["CDENRNO", "ENRNO de la ligne de commande d'origine, suivi sur les BL partiels"],
      ["CMPTOTMT / CRTOTMT", "montant au CMP et au coût de revient (somme des MVTL)"],
      ["MOUV_ID", "identifiant technique de la ligne"]
    ],
    liens: [
      "ENT : l'en-tête. MOUV.CDNO = ENT.PINO pour une commande (DVNO, BLNO, FANO pour les autres étapes), même DOS et TICOD",
      "MVTL : les ventilations de la ligne, par MVTL.ENRNO = MOUV.ENRNO",
      "ART : l'article, par DOS et REF"
    ],
    exemple: "-- Reste à livrer des lignes d'une commande client\nSELECT m.CDNO, m.REF, m.SREF1, m.SREF2,\n       m.CDQTE AS QteCommandee,\n       ISNULL(m.BLQTE, 0) AS QteLivree,\n       m.CDQTE - ISNULL(m.BLQTE, 0) AS QteRestante\nFROM MOUV m\nWHERE m.DOS = '998' AND m.TICOD = 'C'\n  AND m.CE2 = '1' AND m.CDNO = 10000076;",
    piege: "MOUV n'a pas de champ PINO : joins sur DVNO, CDNO, BLNO ou FANO selon l'étape. Et filtre CE2 = '1', sinon les chapitres et postes (CE2 = 2 ou 3) faussent tes totaux.",
    pratique: "Le CMP d'une ligne est déjà un total : MOUV.CMPTOTMT = somme des CMP unitaires × quantités de ses ventilations. Ne le multiplie pas une deuxième fois.",
    motsCles: ["lignes de commande", "table des lignes", "lignes de facture", "lignes de pieces", "detail", "mouvements", "quantite commandee", "quantite livree", "reliquat", "prix unitaire", "montant ligne", "mouv"],
    voirAussi: ["dv-ent", "dv-mvtl", "dv-enrno", "dv-ref", "dv-picod", "dv-sens"],
    sources: [
      { titre: "Achat-vent technique base - Pièces", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/11490099273/Achat-vent+technique+base+-+Pi+ces" },
      { titre: "Industrie", url: "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/12896370759/Industrie" },
      { titre: "Comprendre le fonctionnement du programme de calcul du CMP", url: "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11763744815/Comprendre+le+fonctionnement+du+programme+de+calcul+du+CMP" }
    ]
  },
  {
    id: "dv-mvtl",
    nom: "MVTL",
    type: "table",
    domaine: "divalto",
    categorie: "Tables Divalto",
    definition: "Les ventilations des lignes de pièce : le détail par dépôt, emplacement, lot ou série, et le stock.",
    noms: ["ventilations", "GTFVTL"],
    champs: [
      ["DOS", "dossier"],
      ["ENRNO", "numéro de la ligne MOUV ventilée"],
      ["LILG / VTLNO", "numéro de ligne, numéro de ventilation"],
      ["TICOD / PICOD", "type de tiers et de pièce (repris de MOUV)"],
      ["PINO", "numéro de la pièce active"],
      ["TIERS", "code tiers"],
      ["REF / SREF1 / SREF2", "article"],
      ["DEPO / LIEU", "dépôt, emplacement"],
      ["SERIE", "numéro de série ou de lot"],
      ["NST", "nature de stock"],
      ["SENS", "1 entrée, 2 sortie"],
      ["QTE / REFQTE", "quantité de la pièce en cours, en unité de référence"],
      ["STQTE", "quantité en stock"],
      ["DELDT", "délai de livraison actif"],
      ["TICKETRES", "numéro de ticket de réservation"],
      ["CMP / CR", "coût moyen pondéré unitaire, coût de revient"],
      ["CE3", "1 = ligne de commande en portefeuille (active ou en préparation)"],
      ["CE4", "état (comme MOUV, plus 6 attente)"],
      ["CE5", "1 = ventilation réservée (TICKETRES renseigné)"],
      ["CEA", "1 = entrée d'article encore en stock"]
    ],
    liens: [
      "MOUV : la ligne, par MVTL.ENRNO = MOUV.ENRNO (même DOS)",
      "MRES : réservations, par MRES.TICKETRESS (sortie) ou MRES.TICKETRESE (entrée) = MVTL.TICKETRES",
      "WMVTL : le stock côté WMS (emplacements, contenants)"
    ],
    exemple: "-- Stock d'un article par dépôt, emplacement et lot\nSELECT DEPO, LIEU, SERIE, SUM(STQTE) AS QteEnStock\nFROM MVTL\nWHERE DOS = '998' AND REF = 'MAREF'\n  AND CEA = '1'      -- entrée encore en stock\nGROUP BY DEPO, LIEU, SERIE;",
    piege: "MVTL.CMP est un coût unitaire : multiplie-le par la quantité. Le total de la ligne est déjà dans MOUV.CMPTOTMT.",
    pratique: "Pour le stock, écris CEA = '1' en dur plutôt qu'avec une variable : la doc montre que SQL Server réutilise alors mieux son plan d'exécution.",
    motsCles: ["ventilation", "ventilation des lignes", "stock", "stock par emplacement", "stock par lot", "emplacement", "lot", "numero de serie", "depot", "quantite en stock", "portefeuille", "cmp", "entrees sorties", "mvtl"],
    voirAussi: ["dv-mouv", "dv-mres", "dv-ticketres", "dv-nst", "dv-deldt", "dv-wmvtl", "sum"],
    sources: [
      { titre: "Achat-vent technique base - Pièces", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/11490099273/Achat-vent+technique+base+-+Pi+ces" },
      { titre: "Eviter les paramètres dans les WHERE (CE = VariableCE)", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/11418042389/Eviter+les+param+tres+dans+les+WHERE+CE+VariableCE" },
      { titre: "Comprendre le fonctionnement du programme de calcul du CMP", url: "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11763744815/Comprendre+le+fonctionnement+du+programme+de+calcul+du+CMP" }
    ]
  },
  {
    id: "dv-mres",
    nom: "MRES",
    type: "table",
    domaine: "divalto",
    categorie: "Tables Divalto",
    definition: "Les réservations de stock : le lien entre une sortie et le stock, ou une commande fournisseur.",
    noms: ["réservation", "réservations", "GTFRES"],
    champs: [
      ["DOS", "dossier"],
      ["CE1", "= 'A' pour une réservation"],
      ["CE2", "1 affectée au stock, 2 non affectée, 3 affectée à une commande"],
      ["DEPO / NST", "dépôt, nature de stock"],
      ["REF / SREF1 / SREF2", "article"],
      ["TICKETRESS", "ticket de réservation de la sortie"],
      ["TICKETRESE", "ticket de réservation de l'entrée"],
      ["RESQTE", "quantité réservée"],
      ["BPDETNO", "numéro de ligne de bon de préparation"],
      ["TIERSSTOCK", "tiers de stock"],
      ["MRES_ID", "identifiant technique"]
    ],
    liens: [
      "MVTL de sortie : MRES.TICKETRESS = MVTL.TICKETRES (SENS = 2)",
      "MVTL d'entrée : MRES.TICKETRESE = MVTL.TICKETRES (SENS = 1) : donne la date d'entrée prévue",
      "BPDET : MRES.BPDETNO = BPDET.BPDETNO (une réservation par ligne de BP)"
    ],
    exemple: "-- Réservations affectées à une commande fournisseur, avec la date d'entrée prévue\nSELECT r.REF, r.RESQTE, vin.DELDT AS DateEntreePrevue\nFROM MRES r\nLEFT JOIN MVTL vin ON vin.DOS = r.DOS\n                  AND vin.TICKETRES = r.TICKETRESE\n                  AND vin.SENS = 1\nWHERE r.DOS = '998' AND r.CE1 = 'A' AND r.CE2 = '3';",
    piege: "CE2 = '3' (affectée à une commande) ne garantit pas la couverture : compare encore la date d'entrée prévue à la date de besoin, comme les requêtes Dataviz Industrie.",
    pratique: "Dans les requêtes Dataviz, une réservation affectée au stock (CE2 = '1') couvre le besoin ; une non affectée (CE2 = '2') compte 0.",
    motsCles: ["reservation", "reservations", "ticket de reservation", "affectee", "non affectee", "couverture", "stock reserve", "quantite reservee", "commande fournisseur", "mres"],
    voirAussi: ["dv-mvtl", "dv-ticketres", "dv-bpdet", "dv-rq-analyse-commande-client"],
    sources: [
      { titre: "Achat-vent technique base - Pièces", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/11490099273/Achat-vent+technique+base+-+Pi+ces" },
      { titre: "Industrie", url: "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/12896370759/Industrie" }
    ]
  },
  {
    id: "dv-ead",
    nom: "EAD",
    type: "table",
    domaine: "divalto",
    categorie: "Tables Divalto",
    definition: "Les adresses saisies à la main sur une pièce commerciale, quand elles diffèrent de la fiche du tiers.",
    noms: ["adresse modifiée"],
    champs: [
      ["CE1", "= 'B'"],
      ["DOS / TICOD / PICOD / PINO", "la pièce concernée"],
      ["ADRNO", "numéro d'adresse"],
      ["ADR", "l'adresse saisie"]
    ],
    liens: [
      "ENT : même DOS, TICOD, PICOD et PINO",
      "ENT.ADRTYP : 1 adresse par code ; 2 à 7 adresse manuelle (ou idem devis, commande, BL, facture, relevé) ; EAD existe quand ADRTYP <> 1"
    ],
    piege: "Une adresse de livraison tapée sur la pièce n'est pas dans T1 : si ENT.ADRTYP <> 1, va la chercher dans EAD, pas dans la fiche du tiers.",
    motsCles: ["adresse modifiee", "adresse de livraison", "adresse de facturation", "adresse manuelle", "adresse de la piece", "adresses", "livraison", "ead"],
    voirAussi: ["dv-ent", "dv-t1"],
    source: { titre: "Achat-vent technique base - Pièces", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/11490099273/Achat-vent+technique+base+-+Pi+ces" }
  },
  {
    id: "dv-eec",
    nom: "EEC",
    type: "table",
    domaine: "divalto",
    categorie: "Tables Divalto",
    definition: "Les échéances multiples d'une pièce : le montant et la date de chaque échéance.",
    noms: ["échéances multiples"],
    champs: [
      ["CE1", "= 'C'"],
      ["DOS / TICOD / PICOD / PINO", "la pièce concernée"],
      ["REGL", "mode de règlement"],
      ["ECHVTL", "expression de la répartition"],
      ["ECHMT", "montant de l'échéance"],
      ["ECHDT", "date d'échéance"]
    ],
    liens: [
      "ENT : même DOS, TICOD, PICOD et PINO (ENT.ECHVCOD : ventilation par échéance, 1 non, 2 oui)"
    ],
    pratique: "Pour un relevé multi-échéance, la doc dit de ne prendre que la partie de la facture qui concerne l'échéance traitée : lis EEC, pas seulement ENT.ECHDT.",
    motsCles: ["echeances multiples", "echeance", "plusieurs echeances", "repartition des echeances", "date d'echeance", "montant echeance", "paiement en plusieurs fois", "eec"],
    voirAussi: ["dv-ent", "dv-t006", "dv-cp"],
    source: { titre: "Achat-vent technique base - Pièces", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/11490099273/Achat-vent+technique+base+-+Pi+ces" }
  },
  {
    id: "dv-bpent",
    nom: "BPENT",
    type: "table",
    domaine: "divalto",
    categorie: "Tables Divalto",
    definition: "L'en-tête des bons de préparation (BP) : la préparation des commandes avant la livraison.",
    noms: ["en-tête de bon de préparation", "GTFBP"],
    champs: [
      ["DOS", "dossier"],
      ["BPNO / BPDT", "numéro et date du BP"],
      ["TICOD / TIERS", "type de tiers, code tiers"],
      ["CE2", "statut : 1 proposé, 2 généré, 3 en cours de saisie, 5 prêt, 6 périmé, 7 suspendu ou en erreur"],
      ["BPEDITCOD", "impression : 1 non imprimé, 2 imprimé, 3 jamais"],
      ["BLGENCOD", "1 un BP pour un BL, 2 regroupement des BP"],
      ["POITOT / VOLTOT / COLINB", "masse, volume, nombre de colis"],
      ["ETB / BLMOD", "établissement, mode de transport"]
    ],
    liens: [
      "BPDET : les lignes du BP, par BPNO"
    ],
    motsCles: ["bon de preparation", "preparation", "bp", "picking", "preparation de commande", "colis", "statut bp", "logistique", "bpent"],
    voirAussi: ["dv-bpdet", "dv-ent", "dv-mres"],
    source: { titre: "Achat-vent technique base - BP, Livraison, TVA, Projets", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/11491016710/Achat-vent+technique+base+-+BP+Livraison+TVA+Projets" }
  },
  {
    id: "dv-bpdet",
    nom: "BPDET",
    type: "table",
    domaine: "divalto",
    categorie: "Tables Divalto",
    definition: "Les lignes des bons de préparation : quoi préparer, où, et en quelle quantité.",
    noms: ["lignes de BP", "détail de bon de préparation"],
    champs: [
      ["DOS / BPNO", "dossier, numéro de BP"],
      ["BPDETNO", "numéro de ligne de BP"],
      ["VTLNO", "ventilation de commande préparée"],
      ["CDNO", "numéro de commande"],
      ["REF / SREF1 / SREF2", "article"],
      ["DEPO / LIEU / NST", "dépôt, emplacement, nature de stock"],
      ["SERIE", "numéro de série ou de lot"],
      ["RESQTE", "quantité réservée"],
      ["BPQTE", "quantité préparée"],
      ["COLINO", "numéro de colis"],
      ["CE3", "statut : 1 proposée, 2 générée, 3 en cours, 4 supprimée sans reliquat, 5 prête, 6 périmée, 7 suspendue"]
    ],
    liens: [
      "BPENT : par BPNO (une ligne appartient à un seul BP)",
      "MVTL : par VTLNO (une seule ventilation de commande)",
      "MRES : par BPDETNO (une réservation affectée par ligne de BP)"
    ],
    motsCles: ["lignes de bp", "bon de preparation", "quantite preparee", "picking", "emplacement", "colis", "preparation", "reservation", "bpdet"],
    voirAussi: ["dv-bpent", "dv-mvtl", "dv-mres"],
    source: { titre: "Achat-vent technique base - BP, Livraison, TVA, Projets", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/11491016710/Achat-vent+technique+base+-+BP+Livraison+TVA+Projets" }
  },
  {
    id: "dv-cli",
    nom: "CLI",
    type: "table",
    domaine: "divalto",
    categorie: "Tables Divalto",
    definition: "La fiche client : identité, adresse, conditions commerciales, comptabilité et paramètres EDI.",
    noms: ["client", "clients", "fiche client"],
    champs: [
      ["DOS", "dossier"],
      ["TIERS", "code client"],
      ["NOM / NOMABR", "nom, nom abrégé (clé de recherche)"],
      ["RUE / CPOSTAL / VIL / PAY", "rue, code postal, ville, code pays"],
      ["TEL / EMAIL", "téléphone, e-mail"],
      ["SIRET / NAF", "Siret, code NAF"],
      ["TVANO", "numéro de TVA intracommunautaire"],
      ["TVATIE", "régime TVA du tiers"],
      ["CPT", "compte comptable (intégration en comptabilité)"],
      ["REGL / DEV", "mode de règlement, devise du client"],
      ["TIERSGRP", "code centrale (groupement)"],
      ["STATTB", "codes statistiques client (3)"],
      ["REPRTB", "représentants (3)"],
      ["TIERSSTAT", "tiers sur lequel les statistiques sont générées"],
      ["TIERSR3", "tiers pour Divalto Règlements"],
      ["TACOD / REMCOD", "code tarif, code remise"],
      ["PROTOCOD", "protocole EDI"],
      ["GLN", "Global Location Number"],
      ["DEMATCOD", "type de dématérialisation"],
      ["HSDT", "date de fin de validité"]
    ],
    liens: [
      "T1 : adresses ; T2 : contacts ; T3 : RIB (par DOS et TIERS)",
      "ENT : les pièces du client (TICOD = 'C', ENT.TIERS = CLI.TIERS)",
      "STC : récapitulatif statistique du client"
    ],
    piege: "Les statistiques sont générées sur TIERSSTAT et la compta sur le compte CPT, pas toujours sur TIERS : un CA par client peut donc différer selon la source.",
    pratique: "Depuis la X.12, CLI.NOM et NOMABR sont en collation CI_AI (ni casse ni accents) : LIKE '%ecole%' trouve aussi « École ».",
    motsCles: ["client", "clients", "table des clients", "fiche client", "code client", "siret", "tva intracommunautaire", "centrale", "representant", "compte comptable", "edi", "gln", "collation", "cli"],
    voirAussi: ["dv-tiers", "dv-t1", "dv-t2", "dv-ent", "dv-tiersgrp", "dv-stc"],
    sources: [
      { titre: "Achat-vent technique base - Dossiers et tiers", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/11490033695/Achat-vent+technique+base+-+Dossiers+et+tiers" },
      { titre: "Migration - Différence de collation des champs entre Vx12 et Vx13", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/13003456950/Migration+-+Diff+rence+de+collation+des+champs+entre+Vx12+et+Vx13" },
      { titre: "Collation SQL sur champs (412)", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/11666456736/Collation+SQL+sur+champs+412" }
    ]
  },
  {
    id: "dv-fou",
    nom: "FOU",
    type: "table",
    domaine: "divalto",
    categorie: "Tables Divalto",
    definition: "La fiche fournisseur : identité, adresse, conditions d'achat, délais et paiement.",
    noms: ["fournisseur", "fournisseurs", "fiche fournisseur"],
    champs: [
      ["DOS", "dossier"],
      ["TIERS", "code fournisseur"],
      ["NOM / NOMABR", "nom, nom abrégé"],
      ["RUE / CPOSTAL / VIL / PAY", "adresse"],
      ["CPT", "compte comptable"],
      ["REGL / DEV", "mode de règlement, devise"],
      ["TIERSPAYER", "tiers payeur"],
      ["SALCOD", "salarié acheteur"],
      ["DELFO", "délai de réapprovisionnement du fournisseur"],
      ["DELSECUJR", "délai de sécurité (jours)"],
      ["QUACOD", "contrôle qualité non / oui"],
      ["CDARCOD", "accusé de réception de commande demandé non / oui"],
      ["PORFRVAL / PORFRCOD", "valeur et type de franco"],
      ["CTRLFAVAL", "validation du contrôle facture nécessaire"],
      ["BAPSALCOD", "signataire du bon à payer"],
      ["TVATIE", "régime TVA du tiers"],
      ["PROTOCOL", "protocole EDI"],
      ["HSDT", "date de fin de validité"]
    ],
    liens: [
      "ENT : pièces d'achat (TICOD = 'F', ENT.TIERS = FOU.TIERS)",
      "RFO : conditions d'achat par article ; TFO : tarifs d'achat",
      "T1, T2, T3 : adresses, contacts, RIB"
    ],
    piege: "Depuis la X.12, FOU.NOM est en collation CI_AI : le mélanger à un champ en collation par défaut dans un COALESCE ou un CONCAT plante. Ajoute COLLATE Latin1_General_CI_AI.",
    pratique: "Pour savoir qui valide les factures d'un fournisseur, lis BAPSALCOD (signataire du bon à payer) et CTRLFAVAL (validation du contrôle facture nécessaire).",
    motsCles: ["fournisseur", "fournisseurs", "table des fournisseurs", "fiche fournisseur", "code fournisseur", "achats", "delai fournisseur", "franco", "accuse de reception", "acheteur", "tiers payeur", "collation", "fou"],
    voirAussi: ["dv-tiers", "dv-rfo", "dv-tfo", "dv-ent", "dv-t3"],
    sources: [
      { titre: "Achat-vent technique base - Dossiers et tiers", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/11490033695/Achat-vent+technique+base+-+Dossiers+et+tiers" },
      { titre: "Migration - Différence de collation des champs entre Vx12 et Vx13", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/13003456950/Migration+-+Diff+rence+de+collation+des+champs+entre+Vx12+et+Vx13" },
      { titre: "Collation SQL sur champs (412)", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/11666456736/Collation+SQL+sur+champs+412" }
    ],
    version: "La doc écrit le protocole EDI PROTOCOD sur CLI et PROTOCOL sur FOU : vérifie le nom exact avec l'explorateur de champ."
  },
  {
    id: "dv-pro",
    nom: "PRO",
    type: "table",
    domaine: "divalto",
    categorie: "Tables Divalto",
    definition: "La fiche prospect : un client potentiel, avec sa qualification commerciale.",
    noms: ["prospects", "fiche prospect"],
    champs: [
      ["DOS / TIERS", "dossier, code prospect"],
      ["NOM / NOMABR", "nom, nom abrégé"],
      ["QUALCOD", "qualification : 1 non qualifié, 2 qualifié, 3 démarche commerciale, 4 intéressé, 5 client fidèle, 6 client ponctuel, 7 hors cible"],
      ["TIERSCLI", "client dans lequel le prospect a été validé"],
      ["REPRTB", "représentants"],
      ["ORIGCOD", "code origine"],
      ["HSDT", "date de fin de validité"]
    ],
    liens: [
      "CLI : TIERSCLI donne le client créé à partir du prospect",
      "ENT : pièces du prospect (TICOD = 'P')"
    ],
    motsCles: ["prospect", "prospects", "qualification", "client potentiel", "prospection", "devis prospect", "fiche prospect", "crm", "pro"],
    voirAussi: ["dv-cli", "dv-tiers", "dv-ticod"],
    source: { titre: "Achat-vent technique base - Dossiers et tiers", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/11490033695/Achat-vent+technique+base+-+Dossiers+et+tiers" }
  },
  {
    id: "dv-vrp",
    nom: "VRP",
    type: "table",
    domaine: "divalto",
    categorie: "Tables Divalto",
    definition: "La fiche représentant : le commercial, son taux et son type de commission.",
    noms: ["représentants", "commerciaux"],
    champs: [
      ["DOS / TIERS", "dossier, code représentant"],
      ["NOM", "nom"],
      ["SALCOD", "code salarié"],
      ["COMP", "taux de commission"],
      ["COMTYP", "commission sur 1 facture, 2 encaissement"],
      ["COMBASTYP", "base de commission : 1 HT, 2 marge"],
      ["COFAMV", "classe de commissionnement"],
      ["TELGSM", "téléphone portable"]
    ],
    liens: [
      "ENT.REPRTB, CLI.REPRTB, STA.REPRTB : jusqu'à 3 représentants ; le 1er est toujours le principal"
    ],
    piege: "Les pièces et les stats portent jusqu'à 3 représentants : pour un CA par commercial, prends le 1er (le principal, celui des statistiques), sinon une vente compte deux ou trois fois.",
    motsCles: ["representant", "representants", "commercial", "commerciaux", "vrp", "commission", "vendeur", "taux de commission", "ca par commercial"],
    voirAussi: ["dv-sta", "dv-ent", "dv-cli"],
    source: { titre: "Achat-vent technique base - Dossiers et tiers", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/11490033695/Achat-vent+technique+base+-+Dossiers+et+tiers" }
  },
  {
    id: "dv-tia",
    nom: "TIA",
    type: "table",
    domaine: "divalto",
    categorie: "Tables Divalto",
    definition: "La fiche des tiers internes et des autres tiers, ni clients ni fournisseurs.",
    noms: ["tiers interne", "autres tiers"],
    champs: [
      ["DOS / TIERS", "dossier, code tiers"],
      ["NOM", "nom"],
      ["CPT", "compte comptable"],
      ["CE2", "1 = tiers du plan comptable"]
    ],
    liens: [
      "ENT : pièces internes (TICOD = 'I')",
      "T017 : TIERS = tiers interne associé à un dépôt"
    ],
    motsCles: ["tiers interne", "tiers internes", "autre tiers", "autres tiers", "interne", "commande interne", "depot", "tia"],
    voirAussi: ["dv-ticod", "dv-t017", "dv-tiers"],
    sources: [
      { titre: "Achat-vent technique base - Dossiers et tiers", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/11490033695/Achat-vent+technique+base+-+Dossiers+et+tiers" },
      { titre: "Achat-vent technique base - Tables communes Txxx", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/11490885655/Achat-vent+technique+base+-+Tables+communes+Txxx" }
    ]
  },
  {
    id: "dv-t1",
    nom: "T1",
    type: "table",
    domaine: "divalto",
    categorie: "Tables Divalto",
    definition: "Les adresses d'un tiers : livraison, facturation… plusieurs adresses par client ou fournisseur.",
    noms: ["adresses"],
    champs: [
      ["DOS / TIERS", "le tiers"],
      ["ADRCOD", "code adresse"],
      ["NOM / RUE / CPOSTAL / VIL / PAY", "l'adresse"],
      ["TEL / EMAIL", "téléphone, e-mail"],
      ["TOUR / TOURRG", "tournée, rang dans la tournée"],
      ["BLJR", "jours de livraison"],
      ["GLN", "Global Location Number"],
      ["ADRPIECETYP", "types de pièce autorisés pour cette adresse"],
      ["HSDT", "date de péremption"]
    ],
    liens: [
      "CLI.ADRCODTB : adresse par défaut de chaque pièce (1 devis, 2 commande, 3 BL, 4 facture, 5 relevé)",
      "ENT.ADRCODTB : l'adresse choisie sur la pièce ; une adresse tapée à la main va dans EAD"
    ],
    pratique: "Un client a plusieurs lieux de livraison ? La doc propose un code adresse par lieu, ou un client par adresse si les pièces doivent être suivies par adresse.",
    motsCles: ["adresse", "adresses", "adresses du client", "adresse de livraison", "adresse de facturation", "code adresse", "gln", "tournee", "lieu de livraison", "t1"],
    voirAussi: ["dv-cli", "dv-ead", "dv-t2"],
    source: { titre: "Achat-vent technique base - Dossiers et tiers", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/11490033695/Achat-vent+technique+base+-+Dossiers+et+tiers" }
  },
  {
    id: "dv-t2",
    nom: "T2",
    type: "table",
    domaine: "divalto",
    categorie: "Tables Divalto",
    definition: "Les contacts d'un tiers : nom, fonction, téléphone, e-mail et adresse de rattachement.",
    noms: ["contacts"],
    champs: [
      ["DOS / TIERS", "le tiers"],
      ["CONTACT", "code contact"],
      ["NOM / PRENOM", "nom, prénom"],
      ["LIB", "fonction"],
      ["TEL / TELGSM / EMAIL", "téléphone, portable, e-mail"],
      ["ADRCOD", "adresse de rattachement"],
      ["FCTTYP", "rôles (cases à cocher) : 1 destinataire relance, 2 destinataire commande"],
      ["LOGIN", "login internet"],
      ["CE2", "type du tiers : 2 prospect, 3 client, 4 fournisseur, 6 interne"]
    ],
    liens: [
      "CLI, FOU, PRO : par DOS et TIERS",
      "ENT.CONTACT : le contact de la pièce"
    ],
    pratique: "Les rôles « destinataire relance » et « destinataire commande » sont les cases 1 et 2 du tableau FCTTYP : en SQL, un tableau devient une colonne par case (NOM_0001…).",
    motsCles: ["contact", "contacts", "interlocuteur", "email", "telephone", "fonction", "destinataire", "relance", "t2"],
    voirAussi: ["dv-cli", "dv-t1", "dv-champ-tableau"],
    sources: [
      { titre: "Achat-vent technique base - Dossiers et tiers", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/11490033695/Achat-vent+technique+base+-+Dossiers+et+tiers" },
      { titre: "Explorateur de champ", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/10936811521/Explorateur+de+champ" }
    ]
  },
  {
    id: "dv-t3",
    nom: "T3",
    type: "table",
    domaine: "divalto",
    categorie: "Tables Divalto",
    definition: "Les RIB d'un tiers : IBAN, BIC et domiciliation bancaire.",
    noms: ["RIB"],
    champs: [
      ["DOS / TIERS", "le tiers"],
      ["RIBCOD", "code RIB"],
      ["RIBTYP", "espace = RIB principal, 1 = autre"],
      ["IBAN", "IBAN"],
      ["RIBBIC", "code BIC de la banque"],
      ["RIBDO", "domiciliation"],
      ["HSDT", "date de péremption"]
    ],
    liens: [
      "ENT.RIBCOD : le RIB choisi sur la pièce"
    ],
    motsCles: ["rib", "iban", "iban du fournisseur", "rib du client", "bic", "banque", "coordonnees bancaires", "domiciliation", "virement", "t3"],
    voirAussi: ["dv-fou", "dv-cli", "dv-cp"],
    source: { titre: "Achat-vent technique base - Dossiers et tiers", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/11490033695/Achat-vent+technique+base+-+Dossiers+et+tiers" }
  },
  {
    id: "dv-soc",
    nom: "SOC",
    type: "table",
    domaine: "divalto",
    categorie: "Tables Divalto",
    definition: "La fiche dossier : les paramètres de gestion d'une société, comme le stock ou les reliquats.",
    noms: ["dossier", "fiche dossier", "GTFDOS"],
    champs: [
      ["DOS", "code dossier"],
      ["ZONEPARAM", "zone qui regroupe depuis la X.10 des paramètres masqués en SQL, dont le tableau ENTCODN au début"],
      ["ENTCODN", "options de gestion : (5) gestion du stock 1 non, 2 oui ; (6) valorisation 1 dernier CR, 2 CMP, 3 coût réel ; (22) établissements ; (29) sortie FIFO, LIFO, FEFO…"],
      ["EDITTYP", "support par type de pièce : 1 papier, 2 fax, 3 mail, 4 EDI…"],
      ["RELCOD", "reliquats gérés par type de pièce (1 non, 2 oui)"],
      ["AXEMAJTYP", "alimentation des axes analytiques : famille article, code statistique, projet, établissement"]
    ],
    liens: [
      "Toutes les tables de gestion ont un champ DOS : le code du dossier",
      "ETS : les établissements du dossier"
    ],
    exemple: "-- ENTCODN(n) est à la position n de ZONEPARAM depuis la X.10\nSELECT DOS,\n       SUBSTRING(ZONEPARAM, 5, 1) AS GestionStock,      -- ENTCODN(5)\n       SUBSTRING(ZONEPARAM, 6, 1) AS ValorisationStock  -- ENTCODN(6)\nFROM SOC;",
    piege: "Depuis la X.10, SOC.ENTCODN n'est plus visible en SQL : une requête qui le lit plante. Lis SUBSTRING(SOC.ZONEPARAM, n, 1) : la case n du tableau est à la position n.",
    pratique: "Pour un autre champ rangé dans ZONEPARAM, la doc donne : SUBSTRING(SOC.ZONEPARAM, position dans le dictionnaire, 1) ; pour une case de tableau, position + indice - 1.",
    motsCles: ["dossier", "fiche dossier", "societe", "parametres", "parametrage dossier", "entcodn", "zoneparam", "valorisation du stock", "fifo", "reliquat", "soc"],
    voirAussi: ["dv-dos", "dv-ets", "dv-champ-tableau", "substring"],
    sources: [
      { titre: "Achat-vent technique base - Dossiers et tiers", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/11490033695/Achat-vent+technique+base+-+Dossiers+et+tiers" },
      { titre: "x10 migration", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/10826121217/x10+migration" }
    ],
    version: "La page technique « Dossiers et tiers » décrit encore ENTCODN comme un champ de SOC ; depuis la X.10, il est rangé dans ZONEPARAM (page x10 migration)."
  },
  {
    id: "dv-ets",
    nom: "ETS",
    type: "table",
    domaine: "divalto",
    categorie: "Tables Divalto",
    definition: "Les établissements d'un dossier : un filtre sur les pièces, les mouvements et les statistiques.",
    noms: ["établissements"],
    champs: [
      ["DOS", "dossier"],
      ["ETB", "code établissement"],
      ["PINO1 / PINO2", "compteurs de pièces par type (1 devis client, 2 commande client… 13 devis prospect)"]
    ],
    liens: [
      "T017 : chaque dépôt indique son établissement de rattachement",
      "ENT, MOUV, STA : champ ETB",
      "MZ.ETB : l'établissement courant ; à espace si on ne gère pas les établissements"
    ],
    piege: "Sans gestion des établissements, le code reste à espace partout : un filtre ETB = '01' ne renvoie alors rien.",
    motsCles: ["etablissement", "etablissements", "agence", "site", "filiale", "etb", "compteur de pieces", "ets"],
    voirAussi: ["dv-soc", "dv-etb", "dv-t017"],
    source: { titre: "Achat-vent technique base - Dossiers et tiers", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/11490033695/Achat-vent+technique+base+-+Dossiers+et+tiers" }
  },
  {
    id: "dv-art",
    nom: "ART",
    type: "table",
    domaine: "divalto",
    categorie: "Tables Divalto",
    definition: "La fiche article : désignation, familles, unités, comptes, gestion du stock et compteurs.",
    noms: ["article", "articles", "fiche article", "GTFAT"],
    champs: [
      ["DOS / REF", "dossier, référence (la clé de l'article)"],
      ["DES", "désignation"],
      ["DESABR", "désignation abrégée : clé de recherche, en majuscules"],
      ["EAN", "code EAN"],
      ["FAMTB", "familles statistiques article (3)"],
      ["PRODNAT", "nature de produit ; 1er caractère : 1 acheté, 2 fabriqué, 3 fantôme, 4 service, 5 encours"],
      ["REFUN / ACHUN / STUN / VENUN", "unités de référence, d'achat, de stockage, de vente"],
      ["CPTV / CPTA / CPTS", "comptes de vente, d'achat, de stock"],
      ["TVAART", "régime TVA de l'article"],
      ["STCOD", "1 hors stock, 2 en stock, 3 extérieur"],
      ["GICOD", "suivi : 1 en quantité, 2 série, 3 numéro de lot"],
      ["STVALCOD", "valorisation : 1 dernier CR, 2 CMP, 3 coût réel, 9 dossier"],
      ["STSORCOD", "sortie du stock : 1 FIFO, 2 LIFO, 3 FEFO, 9 dossier"],
      ["SREFCOD", "gère des sous-références non / oui"],
      ["TIERS", "fournisseur habituel"],
      ["STTOTQTE / CDECLQTE / CDEFOQTE / RESTOTQTE", "compteurs : stock total, en commande client, en commande fournisseur, réservé"],
      ["HSDT", "date de fin de validité"],
      ["ART_ID", "identifiant technique"]
    ],
    liens: [
      "SART : une fiche par sous-référence (obligatoire, même à espace)",
      "ARTICLE_V : la vue de ART (même ART_ID)",
      "T036 : nature de produit ; T012 : familles statistiques",
      "MOUV, MVTL : par DOS et REF"
    ],
    exemple: "SELECT ART.DOS AS DOSSIER,\n       ART.REF AS REFERENCE,\n       ART.DES AS DESIGNATION,\n       ART.PRODNAT AS NATUREPRODUIT,\n       NATURE_PRODUIT.LIB AS NATUREPRODUITLIBELLE,\n       LEFT(ART.PRODNAT, 1) AS CLASSEPRODUIT\nFROM ART\nLEFT JOIN T000 AS T000 ON T000.DOS = '999'\nLEFT JOIN T036 AS NATURE_PRODUIT ON NATURE_PRODUIT.CEBIN = 36\n  AND (NATURE_PRODUIT.DOS = CASE WHEN T000.TABTYP_0036 = 2 THEN '999' ELSE ART.DOS END)\n  AND NATURE_PRODUIT.PRODNAT = ART.PRODNAT\nORDER BY DOSSIER, REFERENCE;",
    piege: "Depuis la X.12, ART.DES et DESABR sont en collation CI_AI : les mélanger à un champ en collation par défaut dans un COALESCE ou un CONCAT plante. Ajoute COLLATE Latin1_General_CI_AI, comme les requêtes Dataviz.",
    pratique: "Les compteurs de ART cumulent tous les dépôts et sous-références, pour la nature de stock du dossier. Pour un stock par dépôt, lis plutôt MVTL.",
    motsCles: ["article", "articles", "table des articles", "fiche article", "reference article", "designation", "famille article", "nature de produit", "unite", "ean", "stock", "fournisseur habituel", "compte de vente", "collation", "art"],
    voirAussi: ["dv-sart", "dv-article-v", "dv-ref", "dv-t036", "dv-t012", "dv-mvtl"],
    sources: [
      { titre: "Achat-vent technique base - Articles", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/11490361362/Achat-vent+technique+base+-+Articles" },
      { titre: "Les widgets  KPI", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/10516465387/Les+widgets+KPI" },
      { titre: "Migration - Différence de collation des champs entre Vx12 et Vx13", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/13003456950/Migration+-+Diff+rence+de+collation+des+champs+entre+Vx12+et+Vx13" }
    ]
  },
  {
    id: "dv-sart",
    nom: "SART",
    type: "table",
    domaine: "divalto",
    categorie: "Tables Divalto",
    definition: "Les sous-références d'un article, avec leurs coûts : CR, CMP, coût standard et prix d'achat.",
    noms: ["sous-références"],
    champs: [
      ["DOS / REF / SREF1 / SREF2", "l'article et ses sous-références"],
      ["GRREF", "référence et sous-références regroupées"],
      ["EAN", "code EAN de la sous-référence"],
      ["CR / CORDT", "dernier coût de revient et sa date"],
      ["CMP / CMPDT", "coût moyen pondéré et sa date"],
      ["CRSTD / CRSTDDT", "coût de revient standard et sa date de calcul"],
      ["PA / PADT", "dernier prix d'achat et sa date"],
      ["QTEMIN / QTEPAR", "quantité minimale, multiple de"],
      ["DELSECUJR", "délai de sécurité (jours)"],
      ["SART_ID", "identifiant technique"]
    ],
    liens: [
      "ART : la fiche article (DOS, REF)",
      "SARTEAN : EAN multiples par article ou sous-référence"
    ],
    piege: "SART est obligatoire : un article sans sous-références a quand même une fiche SART, avec SREF1 et SREF2 à espace. Joins donc aussi sur SREF1 et SREF2 vides.",
    pratique: "Le programme de calcul du CMP enregistre le CMP final dans la fiche sous-référence : pour valoriser un stock au CMP, lis SART.CMP.",
    motsCles: ["sous-reference", "sous references", "variante", "cmp", "cout moyen pondere", "cout de revient", "cout standard", "prix d'achat", "valorisation", "sart"],
    voirAussi: ["dv-art", "dv-ref", "dv-mvtl", "dv-sartean"],
    sources: [
      { titre: "Achat-vent technique base - Articles", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/11490361362/Achat-vent+technique+base+-+Articles" },
      { titre: "Comprendre le fonctionnement du programme de calcul du CMP", url: "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11763744815/Comprendre+le+fonctionnement+du+programme+de+calcul+du+CMP" }
    ]
  },
  {
    id: "dv-lart",
    nom: "LART",
    type: "table",
    domaine: "divalto",
    categorie: "Tables Divalto",
    definition: "Les libellés complémentaires d'un article, par langue et par type de pièce où les imprimer.",
    noms: ["libellés complémentaires"],
    champs: [
      ["DOS / REF / SREF1 / SREF2", "l'article (sous-références facultatives)"],
      ["LANG", "code langue"],
      ["EDCODTB", "codes d'impression : C client, F fournisseur, I interne, 1 devis, 2 commande, 3 BL, 4 facture, 5 BP…"],
      ["NOTETB", "numéros des notes (texte RTF) liées à chaque code d'impression"]
    ],
    liens: [
      "ART : un enregistrement par référence, sous-références et code langue"
    ],
    piege: "Le texte n'est pas dans LART : LART donne des numéros de note (NOTETB), et le texte est dans la note, au format RTF.",
    motsCles: ["libelle complementaire", "descriptif", "texte article", "traduction", "langue", "designation longue", "notes", "lart"],
    voirAussi: ["dv-art"],
    source: { titre: "Achat-vent technique base - Articles", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/11490361362/Achat-vent+technique+base+-+Articles" }
  },
  {
    id: "dv-rso",
    nom: "RSO",
    type: "table",
    domaine: "divalto",
    categorie: "Tables Divalto",
    definition: "Le réapprovisionnement d'un article par dépôt : stock d'alerte, stock de sécurité, quantité d'achat.",
    noms: ["réapprovisionnement"],
    champs: [
      ["DOS / REF / SREF1 / SREF2 / DEPO", "l'article et le dépôt"],
      ["TIERS", "fournisseur habituel"],
      ["REACOD", "1 non, 2 niveau 1, 3 niveau 2, 4 délai fournisseur < client, 5 contremarque"],
      ["STALERTQTE", "stock d'alerte"],
      ["STSECUQTE", "stock de sécurité"],
      ["ACHQTE", "quantité optimale d'achat"],
      ["CONSQTE", "consommation annuelle"],
      ["PREVQTE", "prévision de vente"]
    ],
    piege: "RSO se cherche du plus précis au plus général : REF + SREF1 + SREF2 + DEPO, puis avec des espaces. Une jointure exacte sur le dépôt rate la fiche commune (DEPO à espace).",
    motsCles: ["reapprovisionnement", "stock d'alerte", "stock de securite", "stock mini", "quantite d'achat", "reappro", "rupture", "depot", "rso"],
    voirAussi: ["dv-art", "dv-artdepo", "dv-rfo", "dv-depo"],
    source: { titre: "Achat-vent technique base - Articles", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/11490361362/Achat-vent+technique+base+-+Articles" }
  },
  {
    id: "dv-artdepo",
    nom: "ARTDEPO",
    type: "table",
    domaine: "divalto",
    categorie: "Tables Divalto",
    definition: "Les informations d'un article par dépôt : emplacement implicite et méthode de sortie du stock.",
    noms: ["article dépôt"],
    champs: [
      ["DOS / REF / DEPO / SREF1 / SREF2 / NST", "l'article, le dépôt, la nature de stock"],
      ["LIEU", "emplacement implicite"],
      ["STLGTSORCOD", "sortie : 1 déstockage implicite (FIFO, LIFO), 2 vider les emplacements, 3 une seule prise, 4 emplacement implicite, 5 un seul lot obligatoirement, 6 un seul lot si possible"],
      ["WMEMPLPREP", "emplacement de préparation privilégié"]
    ],
    piege: "En mono-dépôt, ARTDEPO.DEPO vaut le dépôt de l'utilisateur (MZ.DEPO), pas un espace, contrairement aux autres tables.",
    motsCles: ["article depot", "emplacement implicite", "emplacement par defaut", "depot", "sortie de stock", "methode de sortie", "fifo", "preparation", "artdepo"],
    voirAussi: ["dv-art", "dv-depo", "dv-mvtl", "dv-rso"],
    source: { titre: "Achat-vent technique base - Articles", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/11490361362/Achat-vent+technique+base+-+Articles" }
  },
  {
    id: "dv-rcl",
    nom: "RCL",
    type: "table",
    domaine: "divalto",
    categorie: "Tables Divalto",
    definition: "Le référencement client : la référence et la désignation d'un article chez le client.",
    noms: ["référencement client"],
    champs: [
      ["DOS / REF / SREF1 / SREF2", "l'article"],
      ["TIERS", "le client"],
      ["REFFO", "référence de l'article chez le client"],
      ["DESFO", "désignation chez le client"]
    ],
    liens: [
      "ART : l'article ; CLI : le client (TIERS)"
    ],
    pratique: "Pour retrouver ton article depuis la référence du client (par exemple sur une commande reçue), cherche RCL par DOS, TIERS et REFFO : c'est l'index U de la doc.",
    motsCles: ["referencement client", "reference client", "code article client", "ref client", "correspondance article", "catalogue client", "edi", "rcl"],
    voirAussi: ["dv-art", "dv-cli", "dv-rfo"],
    source: { titre: "Achat-vent technique base - Articles", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/11490361362/Achat-vent+technique+base+-+Articles" }
  },
  {
    id: "dv-rfo",
    nom: "RFO",
    type: "table",
    domaine: "divalto",
    categorie: "Tables Divalto",
    definition: "Les conditions fournisseur d'un article : référence chez le fournisseur, délai et quantité minimale.",
    noms: ["conditions fournisseur"],
    champs: [
      ["DOS / REF / SREF1 / SREF2", "l'article"],
      ["TIERS", "le fournisseur"],
      ["DEPO", "dépôt (facultatif)"],
      ["REFFO / DESFO", "référence et désignation chez le fournisseur"],
      ["DELFO", "délai de réapprovisionnement"],
      ["DELSECUJR", "délai de sécurité (jours)"],
      ["QTEMIN / QTEPAR", "quantité minimum, multiple de"],
      ["QUACOD", "contrôle qualité non / oui"],
      ["TVAPAYO", "pays d'origine (DEB)"]
    ],
    liens: [
      "ART ; FOU (TIERS) ; TFO : les prix d'achat"
    ],
    piege: "Le dépôt de RFO est facultatif : cherche d'abord avec le dépôt, puis avec DEPO à espace, comme le fait Divalto. Sinon tu rates la condition commune à tous les dépôts.",
    motsCles: ["conditions fournisseur", "reference fournisseur", "ref fournisseur", "delai fournisseur", "quantite minimum", "catalogue fournisseur", "achat", "rfo"],
    voirAussi: ["dv-fou", "dv-tfo", "dv-rso", "dv-art"],
    source: { titre: "Achat-vent technique base - Articles", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/11490361362/Achat-vent+technique+base+-+Articles" }
  },
  {
    id: "dv-sartean",
    nom: "SARTEAN",
    type: "table",
    domaine: "divalto",
    categorie: "Tables Divalto",
    definition: "Les codes EAN d'un article ou d'une sous-référence, dont ceux générés automatiquement.",
    noms: ["EAN multiples"],
    champs: [
      ["DOS", "dossier"],
      ["EAN", "code EAN"],
      ["REF / SREF1 / SREF2", "l'article"]
    ],
    liens: [
      "Recherche d'un EAN en 3 niveaux : SARTEAN, puis SART.EAN, puis ART.EAN"
    ],
    exemple: "SELECT a.REF, s.SREF1, s.SREF2,\n       COALESCE(e.EAN, NULLIF(s.EAN, ''), NULLIF(a.EAN, '')) AS EAN\nFROM ART a\nJOIN SART s ON s.DOS = a.DOS AND s.REF = a.REF\nLEFT JOIN SARTEAN e ON e.DOS = s.DOS AND e.REF = s.REF\n                   AND e.SREF1 = s.SREF1 AND e.SREF2 = s.SREF2\nWHERE a.DOS = '998';",
    piege: "SARTEAN permet plusieurs EAN pour un même article : la jointure peut renvoyer plusieurs lignes par article. Et un EAN généré n'apparaît pas forcément sur la fiche article.",
    motsCles: ["ean", "code ean", "code barre", "gencod", "ean multiples", "ean automatique", "sous-reference", "sartean"],
    voirAussi: ["dv-art", "dv-sart", "coalesce", "nullif"],
    sources: [
      { titre: "Achat-vent technique base - Articles", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/11490361362/Achat-vent+technique+base+-+Articles" },
      { titre: "L'article", url: "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704704088/L+article" }
    ]
  },
  {
    id: "dv-tar",
    nom: "TAR",
    type: "table",
    domaine: "divalto",
    categorie: "Tables Divalto",
    definition: "Les tarifs de vente : prix par article, code tarif, client, quantité seuil et date d'effet.",
    noms: ["tarif de vente", "tarifs de vente"],
    champs: [
      ["DOS / REF / SREF1 / SREF2", "l'article"],
      ["TACOD", "code tarif ; 99 = tarif particulier d'un client"],
      ["TIERS", "client, si code tarif 99"],
      ["MARCHE", "code marché"],
      ["VENUN / DEV / DEPO", "unité de vente (facultative), devise, dépôt"],
      ["TADT", "date d'application du tarif"],
      ["QTE", "quantité seuil"],
      ["PUB", "prix unitaire de vente"],
      ["HTCOD", "tarif HT ou TTC"],
      ["PUBTYP", "prix brut ou net"],
      ["PAFORF", "prix forfaitaire (1 non, 2 oui)"],
      ["HSDT", "date de fin de validité"]
    ],
    liens: [
      "TRE : les remises de vente ; CLI.TACOD : le code tarif du client"
    ],
    piege: "Un article a souvent plusieurs lignes TAR (code tarif, client, dépôt, date, quantité) : un simple JOIN multiplie tes lignes. Divalto cherche dans un ordre précis (tarif 99 du client d'abord).",
    pratique: "Les codes tarif 90 à 98 sont réservés à une facturation au coût de revient + x % : n'y cherche pas un prix de vente saisi.",
    motsCles: ["tarif", "tarifs de vente", "prix de vente", "grille tarifaire", "code tarif", "prix client", "quantite seuil", "date d'effet", "tar"],
    voirAussi: ["dv-tre", "dv-tfo", "dv-cli", "dv-art"],
    source: { titre: "Achat-vent technique base - Tarifs", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/11490000922/Achat-vent+technique+base+-+Tarifs" }
  },
  {
    id: "dv-tre",
    nom: "TRE",
    type: "table",
    domaine: "divalto",
    categorie: "Tables Divalto",
    definition: "Les remises de vente : taux ou montant par code remise, client, article et quantité.",
    noms: ["remises de vente"],
    champs: [
      ["DOS / REF / SREF1 / SREF2", "l'article (facultatif)"],
      ["REMCOD", "code remise ; 99 = remise particulière d'un client"],
      ["TIERS", "client, si code remise 99"],
      ["MARCHE", "code marché"],
      ["REMDT", "date d'application"],
      ["QTE", "quantité seuil"],
      ["REM", "remises 1 à 3 (taux)"],
      ["REMTYP", "type : 1 cumulative, 2 successive, 3 différée sur prix brut, 4 différée sur prix net"],
      ["REMMT", "montant de la remise"]
    ],
    piege: "Avec un tarif 99 (prix particulier du client), seule une remise 99 s'applique : ne cumule pas les autres remises dans ton calcul.",
    pratique: "Ordre de calcul de la doc : prix brut, moins la remise en montant, puis les remises cumulatives (taux cumulés), puis les successives une par une.",
    motsCles: ["remise", "remises", "remise client", "code remise", "ristourne", "taux de remise", "remise successive", "remise cumulative", "tre"],
    voirAussi: ["dv-tar", "dv-mouv", "dv-cli"],
    source: { titre: "Achat-vent technique base - Tarifs", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/11490000922/Achat-vent+technique+base+-+Tarifs" }
  },
  {
    id: "dv-tfo",
    nom: "TFO",
    type: "table",
    domaine: "divalto",
    categorie: "Tables Divalto",
    definition: "Les tarifs d'achat : prix d'achat par fournisseur, article, unité, devise et quantité seuil.",
    noms: ["tarifs d'achat", "tarifs fournisseur"],
    champs: [
      ["DOS / REF / SREF1 / SREF2", "l'article"],
      ["TIERS", "le fournisseur"],
      ["MARCHE", "code marché (facultatif)"],
      ["ACHUN / DEV", "unité d'achat, devise"],
      ["TADT", "date d'application"],
      ["QTE", "quantité seuil"],
      ["PA", "prix d'achat"],
      ["PUBTYP", "prix brut ou net (brut par défaut)"],
      ["PAFORF", "tarif forfaitaire"],
      ["HSDT", "date de fin de validité"]
    ],
    liens: [
      "FOU ; RFO (conditions d'achat) ; ART"
    ],
    pratique: "Divalto lance toutes les recherches de tarif fournisseur et garde le prix le plus bas : en SQL, compare les tarifs trouvés au lieu de prendre le premier.",
    motsCles: ["tarif d'achat", "prix d'achat", "tarif fournisseur", "grille d'achat", "fournisseur", "quantite seuil", "achat", "tfo"],
    voirAussi: ["dv-fou", "dv-rfo", "dv-tar", "min-max"],
    source: { titre: "Achat-vent technique base - Tarifs", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/11490000922/Achat-vent+technique+base+-+Tarifs" }
  },
  {
    id: "dv-sta",
    nom: "STA",
    type: "table",
    domaine: "divalto",
    categorie: "Tables Divalto",
    definition: "Les statistiques mensuelles de vente et d'achat : CA, coûts et quantités cumulés par mois.",
    noms: ["statistiques", "stats", "GTFSTAT"],
    champs: [
      ["DOS", "dossier"],
      ["TICOD", "C client, F fournisseur"],
      ["DEPO / ETB", "dépôt, établissement"],
      ["TIERS", "code tiers"],
      ["REF / SREF1 / SREF2", "article"],
      ["STADT", "période AAAAMM (année et mois)"],
      ["OP", "code opération"],
      ["STATTB / FAMTB", "codes statistiques client (3), familles statistiques article (3)"],
      ["REPRTB", "représentants (3)"],
      ["PROJET / TIERSGRP", "projet, centrale"],
      ["STAMT", "chiffre d'affaires"],
      ["CRMT / CMPMT", "montant au coût de revient, au CMP"],
      ["CONSQTE", "quantité"]
    ],
    liens: [
      "MOUV : STA regroupe les lignes facturées (programme GTPP110, en différé)",
      "STB : récapitulatif article ; STC : récapitulatif client"
    ],
    exemple: "-- Clients du dossier 998 dont le CA de février 2012 est plus bas qu'en janvier 2012\n-- (exemple de la doc, ciblage CRM)\nSELECT STA.DOS, STA.ETB, CLI.CE1, STA.TIERS\nFROM STA\nLEFT JOIN (SELECT TIERS, SUM(STAMT) AS TOTAL\n           FROM STA\n           WHERE DOS = '998' AND TICOD = 'C' AND STADT = '201202'\n           GROUP BY STA.TIERS) AS S2 ON S2.TIERS = STA.TIERS\nJOIN CLI ON CLI.DOS = STA.DOS AND CLI.TIERS = STA.TIERS\nWHERE STA.DOS = '998' AND STA.TICOD = 'C' AND STA.STADT = '201201'\nGROUP BY STA.DOS, STA.ETB, CLI.CE1, STA.TIERS, S2.TIERS, S2.TOTAL\nHAVING S2.TOTAL < SUM(STAMT) OR S2.TOTAL IS NULL;",
    piege: "STA est mise à jour en différé (programme GTPP110) : une facture du jour peut ne pas y être encore. Pour du temps réel, lis les lignes de facture.",
    pratique: "STADT est le mois au format AAAAMM, en texte ('201201' dans l'exemple de la doc) : filtre-le avec une chaîne, et groupe par STADT pour un CA mensuel.",
    motsCles: ["statistiques", "stats", "chiffre d'affaires mensuel", "ca par mois", "ventes par mois", "marge", "statistiques de vente", "achats par mois", "cumul mensuel", "sta"],
    voirAussi: ["dv-stb", "dv-stc", "dv-mouv", "dv-vrp", "group-by", "having"],
    sources: [
      { titre: "Achat-vent technique base - BP, Livraison, TVA, Projets", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/11491016710/Achat-vent+technique+base+-+BP+Livraison+TVA+Projets" },
      { titre: "Les filtres dans le module CRM", url: "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11705856929/Les+filtres+dans+le+module+CRM" }
    ]
  },
  {
    id: "dv-stb",
    nom: "STB",
    type: "table",
    domaine: "divalto",
    categorie: "Tables Divalto",
    definition: "Le récapitulatif statistique par article : CA, marge, rotation, rang et stock moyen.",
    noms: ["récapitulatif article"],
    champs: [
      ["DOS / REF", "l'article"],
      ["TIERS", "client le plus important"],
      ["ROTATIONTX", "taux de rotation"],
      ["STACALDT", "date de calcul"],
      ["CAMTTB", "CA du mois, 3 mois, 12 mois, N-1"],
      ["MARGETB", "marge du mois, 3 mois, 12 mois, N-1"],
      ["CAPART / CARANG", "part du CA du dossier, rang"],
      ["STSTAMOY / STMOYMT", "stock moyen en quantité, en montant"],
      ["STSTAMIN / STSTAMAX", "stock mini, maxi"],
      ["TIERSNB", "nombre de clients"]
    ],
    piege: "STB est mise à jour seulement en batch : regarde STACALDT avant de te fier aux chiffres.",
    pratique: "CAMTTB est un tableau de 4 cases (mois, 3 mois, 12 mois, N-1) : en SQL, une colonne par case. Vérifie le nom exact avec l'explorateur de champ (Ctrl + D).",
    motsCles: ["recapitulatif article", "rotation", "taux de rotation", "stock moyen", "marge article", "ca article", "rang article", "classement articles", "stb"],
    voirAussi: ["dv-sta", "dv-stc", "dv-art", "dv-champ-tableau"],
    sources: [
      { titre: "Achat-vent technique base - BP, Livraison, TVA, Projets", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/11491016710/Achat-vent+technique+base+-+BP+Livraison+TVA+Projets" },
      { titre: "Explorateur de champ", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/10936811521/Explorateur+de+champ" }
    ]
  },
  {
    id: "dv-stc",
    nom: "STC",
    type: "table",
    domaine: "divalto",
    categorie: "Tables Divalto",
    definition: "Le récapitulatif statistique par client : CA, marge, rang, délai de règlement et incidents.",
    noms: ["récapitulatif client"],
    champs: [
      ["DOS / TICOD / TIERS", "le tiers"],
      ["CAMTTB", "CA du mois, 3 mois, 12 mois, N-1"],
      ["MARGETB", "marge du mois, 3 mois, 12 mois, N-1"],
      ["CAPART", "part du CA du dossier"],
      ["CARANG", "rang du client en CA"],
      ["REGDEL", "délai moyen de règlement (jours)"],
      ["REGMOYMT / FAMOYMT", "montant moyen de règlement, de facture"],
      ["LTGNB / IMPNB / INCNB", "nombre de litiges, d'impayés, d'incidents"]
    ],
    piege: "STC est mise à jour seulement en batch : le rang CARANG date du dernier calcul, pas d'aujourd'hui.",
    pratique: "La mobilité utilise STC.CARANG (rang du client en CA) comme indicateur : c'est une source prête pour classer tes clients.",
    motsCles: ["recapitulatif client", "rang client", "rang du client", "chiffre d'affaires par client", "ca client", "classement client", "delai de reglement", "impayes", "litiges", "marge client", "stc"],
    voirAussi: ["dv-sta", "dv-cli", "dv-rq-top10-clients-ca"],
    sources: [
      { titre: "Achat-vent technique base - BP, Livraison, TVA, Projets", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/11491016710/Achat-vent+technique+base+-+BP+Livraison+TVA+Projets" },
      { titre: "Mapping des tables échangées", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/221844940/Mapping+des+tables+chang+es" }
    ]
  },
  {
    id: "dv-tva-deb",
    nom: "TVA",
    type: "table",
    domaine: "divalto",
    categorie: "Tables Divalto",
    definition: "Les lignes de factures à déclarer dans la déclaration d'échanges de biens (DEB).",
    noms: ["GTFTVA", "DEB"],
    champs: [
      ["DOS / TICOD / TIERS", "le tiers"],
      ["REF", "article"],
      ["FANO / FADT", "numéro et date de facture"],
      ["OP", "code opération"],
      ["TVANOM", "nomenclature douanière"],
      ["TVANO / TVAPAY", "numéro d'identification TVA, pays"],
      ["TVAREG / TVANAT", "régime, nature de transaction"],
      ["TVABLCD3", "code INCOTERM"],
      ["HTMT / STAMT", "montant, montant statistique"],
      ["QTE / TVAQTE", "quantité, quantité en unité douanière"],
      ["POIN", "poids net"]
    ],
    piege: "Ne confonds pas cette table TVA (la DEB) avec la « table TVA » du paramétrage, qui croise les régimes article et tiers : pour un taux, lis T085.",
    motsCles: ["deb", "declaration d'echanges de biens", "intrastat", "douane", "nomenclature douaniere", "incoterm", "intracommunautaire", "gtftva", "tva"],
    voirAussi: ["dv-t085", "dv-ent", "dv-cli"],
    sources: [
      { titre: "Achat-vent technique base - BP, Livraison, TVA, Projets", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/11491016710/Achat-vent+technique+base+-+BP+Livraison+TVA+Projets" },
      { titre: "TVA et autres taxes", url: "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704712887/TVA+et+autres+taxes" }
    ]
  },
  {
    id: "dv-prjap",
    nom: "PRJAP",
    type: "table",
    domaine: "divalto",
    categorie: "Tables Divalto",
    definition: "Les affaires (projets après-vente) : client, chef de projet, état, dates et chiffres clés.",
    noms: ["affaire", "affaires", "projet après-vente"],
    champs: [
      ["DOS / ETB", "dossier, établissement"],
      ["AFFAIRE", "code affaire"],
      ["TIERS", "client ou prospect (facultatif)"],
      ["LIB80 / LIBABR", "libellé, libellé abrégé"],
      ["CE2", "état : 1 en préparation, 2 confirmé, 3 démarré, 4 terminé, 5 archivé"],
      ["ETAPTYP", "1 opportunité, 2 affaire, 3 modèle"],
      ["SALCOD", "chef de projet interne"],
      ["CONTACT", "chef de projet client"],
      ["DELDT", "délai de livraison"],
      ["RCPPREVDT / RCPDT", "réception prévue, réelle"],
      ["HTMT", "montant du projet"],
      ["AFFAIREPERE / AFFAIREPRINC", "affaire père, affaire principale"],
      ["AFRCLAS", "classe d'affaire"],
      ["CHIFFRECLETB", "chiffres clés mis à jour par le calcul"]
    ],
    liens: [
      "PRJAVT : les avenants ; PRJSAL : les salariés de l'affaire ; PRJSALACT : leurs activités (même DOS et AFFAIRE)",
      "CLI ou PRO : le tiers de l'affaire (TIERS, facultatif)",
      "AFFAIREPERE et AFFAIREPRINC : l'arborescence des affaires"
    ],
    piege: "Depuis la X.12, PRJAP.LIB80 et LIBABR sont en collation CI_AI : une concaténation avec un champ en collation par défaut plante. La doc corrige avec PRJAP.Lib80 COLLATE Latin1_General_CI_AI.",
    motsCles: ["affaire", "affaires", "projet", "projet apres-vente", "chef de projet", "opportunite", "etat de l'affaire", "code affaire", "collation", "prjap"],
    voirAussi: ["dv-gpaelem", "dv-prjav", "dv-ceacontrat", "dv-rq-ratio-activite-affaire"],
    sources: [
      { titre: "Achat-vent technique base - BP, Livraison, TVA, Projets", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/11491016710/Achat-vent+technique+base+-+BP+Livraison+TVA+Projets" },
      { titre: "Traitement des Affaires industrielles à l'état opportunité (V10.9) - (V10.11)", url: "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11705848847/Traitement+des+Affaires+industrielles+l+tat+opportunit+V10.9+-+V10.11" },
      { titre: "Collation SQL sur champs (412)", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/11666456736/Collation+SQL+sur+champs+412" }
    ],
    version: "Les opportunités sont des affaires PRJAP à l'état opportunité ; la table PRJAV servait aux opportunités dans les anciennes versions."
  },
  {
    id: "dv-prjav",
    nom: "PRJAV",
    type: "table",
    domaine: "divalto",
    categorie: "Tables Divalto",
    definition: "Les projets avant-vente : étape, priorité, chances de réussite et motif de perte.",
    noms: ["projets avant-vente"],
    champs: [
      ["DOS / ETB", "dossier, établissement"],
      ["PROJET", "code projet"],
      ["TIERS", "client ou prospect"],
      ["LIB80", "libellé"],
      ["CE4", "état : 1 actif, 2 sommeil, 3 gagné, 4 perdu"],
      ["DELDT", "délai de la signature"],
      ["PRIOCOD", "priorité"],
      ["RELDT", "date de relance (remise à zéro au changement d'état)"],
      ["MOTIF", "motif de perte"],
      ["CAMT", "montant du projet"],
      ["REUSSITEP", "pourcentage de réussite"]
    ],
    motsCles: ["projet avant-vente", "avant-vente", "opportunite", "pipe commercial", "pourcentage de reussite", "motif de perte", "relance", "prjav"],
    voirAussi: ["dv-prjap", "dv-pro"],
    sources: [
      { titre: "Achat-vent technique base - BP, Livraison, TVA, Projets", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/11491016710/Achat-vent+technique+base+-+BP+Livraison+TVA+Projets" },
      { titre: "Traitement des Affaires industrielles à l'état opportunité (V10.9) - (V10.11)", url: "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11705848847/Traitement+des+Affaires+industrielles+l+tat+opportunit+V10.9+-+V10.11" }
    ],
    version: "La page « Affaires industrielles à l'état opportunité » dit de créer les opportunités dans PRJAP et non dans PRJAV (anciennes versions). La doc technique donne aussi CE1 = 'B' dans un tableau et 'A' dans l'autre."
  },
  {
    id: "dv-ceacontrat",
    nom: "CEACONTRAT",
    type: "table",
    domaine: "divalto",
    categorie: "Tables Divalto",
    definition: "Les contrats de service : client ou site, dates, renouvellement, montant actualisé et indexation.",
    noms: ["contrat", "contrats", "GTFCONT"],
    champs: [
      ["DOS / ETB", "dossier, établissement"],
      ["CONTRATNO / CONTRATREF", "numéro et référence du contrat"],
      ["LIB80", "libellé"],
      ["TIERS / SITECOD", "code tiers, code site"],
      ["CONTRATFAM", "famille de contrat"],
      ["AFFAIRE", "affaire ou projet après-vente"],
      ["VALDEBDT / VALFINDT", "début et fin de validité"],
      ["STATUS", "1 actif, 2 suspendu, 3 résilié, 4 terminé"],
      ["TACITEFLG", "tacite reconduction"],
      ["RENOUVDT", "date de renouvellement"],
      ["HTMT", "montant HT"],
      ["CONTRATMT", "montant actualisé du contrat"],
      ["MTTYP", "1 montant global pour une période contractuelle, 2 montant pour une période de facturation"],
      ["INDEXTYP", "indexation : 1 toujours, 2 définie, 3 coefficient fixe, 4 aucune"],
      ["FAGRPTYP", "factures : 1 par contrat, 2 regroupées par site, 3 par tiers"]
    ],
    liens: [
      "CONTRATCAL : le calendrier des échéances (CONTRATNO)",
      "CONTRATPREFA : les préparations de factures (CONTRATNO)",
      "SITE : le site (SITECOD)"
    ],
    piege: "CONTRATMT ne se somme pas tel quel : selon le contrat, c'est un montant annuel, global ou « à la facture ». Ramène-le d'abord à une même période, comme la requête Dataviz.",
    motsCles: ["contrat", "contrats", "contrat de service", "maintenance", "abonnement", "renouvellement", "tacite reconduction", "indexation", "contrat client", "ceacontrat"],
    voirAussi: ["dv-contratcal", "dv-contratprefa", "dv-site", "dv-rq-contrats-actifs-client"],
    sources: [
      { titre: "Achat-vent technique base - Contrats, inventaires, demandes", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/11490656260/Achat-vent+technique+base+-+Contrats+inventaires+demandes" },
      { titre: "Service", url: "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/12897943559/Service" }
    ]
  },
  {
    id: "dv-contratcal",
    nom: "CONTRATCAL",
    type: "table",
    domaine: "divalto",
    categorie: "Tables Divalto",
    definition: "Le calendrier de facturation d'un contrat : une ligne par échéance, avec son pourcentage.",
    noms: ["calendrier de contrat"],
    champs: [
      ["DOS / CONTRATNO", "le contrat"],
      ["ECHDT", "date d'échéance"],
      ["POURCENT", "pourcentage de l'échéance"],
      ["AVISFLG", "avis de paiement"],
      ["INDEXFLG", "indexation"]
    ],
    liens: [
      "CEACONTRAT : par DOS et CONTRATNO"
    ],
    pratique: "La requête Dataviz estime le montant d'une échéance ainsi : POURCENT du calendrier × montant actualisé du contrat.",
    motsCles: ["calendrier contrat", "echeancier", "echeance", "pourcentage", "facturation contrat", "prochaine echeance", "contrat", "contratcal"],
    voirAussi: ["dv-ceacontrat", "dv-contratprefa", "dv-rq-contrats-actifs-client"],
    sources: [
      { titre: "Achat-vent technique base - Contrats, inventaires, demandes", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/11490656260/Achat-vent+technique+base+-+Contrats+inventaires+demandes" },
      { titre: "Service", url: "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/12897943559/Service" }
    ]
  },
  {
    id: "dv-contratprefa",
    nom: "CONTRATPREFA",
    type: "table",
    domaine: "divalto",
    categorie: "Tables Divalto",
    definition: "Les préparations de factures contrat (PFC) : les lignes à facturer, générées pour chaque échéance.",
    noms: ["PFC", "préparation de factures contrat", "GTFPFC"],
    champs: [
      ["DOS / ETB", "dossier, établissement"],
      ["PFCNO", "numéro de préparation"],
      ["CONTRATNO / SITECOD", "contrat, site"],
      ["STATUS", "1 générée, 2 en anomalie, 3 annulée, 4 validée en facture ou en avis de paiement"],
      ["ECHDT", "date d'échéance"],
      ["DATD / DATF", "début et fin de la période"],
      ["PIDT", "date de la pièce"],
      ["TIERS", "tiers"],
      ["REF", "article"],
      ["MONT", "montant de la ligne"],
      ["CONTRATMT", "montant actualisé du contrat"],
      ["DEV", "devise"],
      ["ERRTXT", "texte d'erreur"]
    ],
    liens: [
      "CEACONTRAT : par CONTRATNO",
      "MOUV a aussi un champ PFCNO (« numéro d'élément de facturation » dans la doc ; MOUV.CEC = 1 s'il est renseigné)"
    ],
    piege: "Pour un CA facturé, prends les PFC validées (STATUS = 4) et jamais les annulées (3) : la requête Dataviz garde les PFC « facturées, non annulées », en euros.",
    motsCles: ["preparation facture contrat", "pfc", "facturation contrat", "echeance", "lignes a facturer", "anomalie", "contrats", "contratprefa"],
    voirAussi: ["dv-ceacontrat", "dv-contratcal", "dv-rq-ca-contrats-famille", "dv-mouv"],
    sources: [
      { titre: "Achat-vent technique base - Contrats, inventaires, demandes", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/11490656260/Achat-vent+technique+base+-+Contrats+inventaires+demandes" },
      { titre: "Service", url: "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/12897943559/Service" },
      { titre: "Achat-vent technique base - Pièces", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/11490099273/Achat-vent+technique+base+-+Pi+ces" }
    ]
  },
  {
    id: "dv-site",
    nom: "SITE",
    type: "table",
    domaine: "divalto",
    categorie: "Tables Divalto",
    definition: "Les sites des tiers : un lieu d'un client, avec son adresse et son contact.",
    noms: ["sites", "GTFSITE"],
    champs: [
      ["DOS / SITECOD", "dossier, code site"],
      ["NOM / NOMABR", "nom, nom abrégé"],
      ["TIERS", "code tiers"],
      ["ADRCOD / CONTACT", "adresse, contact"],
      ["REGIONCOD", "région administrative"],
      ["HSDT", "date de fin de validité"]
    ],
    liens: [
      "CEACONTRAT.SITECOD et CONTRATPREFA.SITECOD : le site du contrat"
    ],
    motsCles: ["site", "sites", "site client", "lieu", "contrat site", "code site", "adresse site", "site tiers"],
    voirAussi: ["dv-ceacontrat", "dv-rq-contrats-actifs-site"],
    source: { titre: "Achat-vent technique base - Contrats, inventaires, demandes", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/11490656260/Achat-vent+technique+base+-+Contrats+inventaires+demandes" }
  },
  {
    id: "dv-daoent",
    nom: "DAOENT",
    type: "table",
    domaine: "divalto",
    categorie: "Tables Divalto",
    definition: "L'en-tête des demandes d'achat et des appels d'offre, avec leur état.",
    noms: ["demande d'achat", "appel d'offre", "GTFDAO"],
    champs: [
      ["DOS / ETB", "dossier, établissement"],
      ["DAONO", "numéro de demande ou d'appel d'offre"],
      ["DAOTYP", "1 demande d'achat, 2 appel d'offre"],
      ["DAOREF / DAODT", "référence, date"],
      ["DELDEMDT", "délai demandé"],
      ["STATUS", "1 provisoire, 2 active, 6 périmée ; 3 AO transmis, 4 partiellement répondu, 5 totalement répondu"],
      ["PROJET", "projet ou affaire"],
      ["USERDAO / SALCOD", "demandeur, salarié responsable"],
      ["DEPO", "dépôt"]
    ],
    liens: [
      "DAOLIG : les lignes (DAONO)",
      "DAOLFOU : les fournisseurs consultés, leurs prix et le fournisseur choisi"
    ],
    motsCles: ["demande d'achat", "demandes d'achat", "appel d'offre", "appels d'offres", "consultation fournisseur", "achats", "da", "daoent"],
    voirAussi: ["dv-daolig", "dv-ent", "dv-fou"],
    source: { titre: "Achat-vent technique base - Contrats, inventaires, demandes", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/11490656260/Achat-vent+technique+base+-+Contrats+inventaires+demandes" }
  },
  {
    id: "dv-daolig",
    nom: "DAOLIG",
    type: "table",
    domaine: "divalto",
    categorie: "Tables Divalto",
    definition: "Les lignes des demandes d'achat et appels d'offre : article, quantité et délai demandés.",
    noms: ["DAOLFOU"],
    champs: [
      ["DOS / DAONO", "la demande"],
      ["DAOLGNO", "numéro de ligne"],
      ["DAOTYP", "1 demande d'achat, 2 appel d'offre"],
      ["REF / SREF1 / SREF2", "article"],
      ["DES", "désignation"],
      ["QTEINI", "quantité demandée"],
      ["ACHUN", "unité d'achat"],
      ["DELDEMDT", "délai demandé"],
      ["DAOLGNOAO", "ligne d'appel d'offre liée à la demande d'achat"]
    ],
    liens: [
      "DAOENT : par DAONO",
      "DAOLFOU : par DAOLGNO ; fournisseur (TIERS), prix (PUB), délai accepté, commande créée (CDNO), MARQUE = fournisseur choisi"
    ],
    motsCles: ["lignes demande d'achat", "appel d'offre", "quantite demandee", "consultation", "fournisseur choisi", "achats", "daolig", "daolfou"],
    voirAussi: ["dv-daoent", "dv-mouv"],
    source: { titre: "Achat-vent technique base - Contrats, inventaires, demandes", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/11490656260/Achat-vent+technique+base+-+Contrats+inventaires+demandes" }
  },
  {
    id: "dv-invent",
    nom: "INVENT",
    type: "table",
    domaine: "divalto",
    categorie: "Tables Divalto",
    definition: "L'en-tête des inventaires avancés : date d'arrêté, état et sélections.",
    noms: ["inventaire", "GTFINV", "INVDET"],
    champs: [
      ["DOS", "dossier"],
      ["INVNO", "numéro d'inventaire"],
      ["INVDT", "date d'arrêté"],
      ["CE2", "1 planifié, 2 généré, 3 saisi, 4 validé, 5 annulé"],
      ["SALCOD", "salarié responsable"],
      ["DEPOD / DEPOF", "dépôts sélectionnés (début, fin)"],
      ["NST", "nature de stock"]
    ],
    liens: [
      "INVDET : les lignes (INVNO), avec dépôt, emplacement, nature de stock, article, page et rang",
      "INVVTL : les ventilations d'une ligne d'inventaire"
    ],
    motsCles: ["inventaire", "inventaires", "comptage", "date d'arrete", "inventaire tournant", "stock", "invent", "invdet"],
    voirAussi: ["dv-mvtl", "dv-depo"],
    source: { titre: "Achat-vent technique base - Contrats, inventaires, demandes", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/11490656260/Achat-vent+technique+base+-+Contrats+inventaires+demandes" }
  },
  {
    id: "dv-txxx",
    nom: "Txxx",
    type: "table",
    domaine: "divalto",
    categorie: "Tables Divalto",
    definition: "Les tables de paramétrage T000 à T107 : règlements, dépôts, TVA, familles… propres au dossier ou communes.",
    noms: ["tables communes", "GTFTAB", "tables de paramétrage"],
    champs: [
      ["CEBIN", "numéro de la table (ex. 36 pour T036)"],
      ["DOS", "dossier, ou '999' si la table est commune à tous les dossiers"],
      ["TABNO", "numéro de la table"],
      ["LIB", "libellé (dans la plupart des tables)"]
    ],
    liens: [
      "T000 : dit pour chaque table si elle est commune (TABTYP)",
      "Jointure : DOS = '999' si la table est commune, sinon le DOS du dossier"
    ],
    exemple: "SELECT ART.REF, NATURE_PRODUIT.LIB\nFROM ART\nLEFT JOIN T000 ON T000.DOS = '999'\nLEFT JOIN T036 AS NATURE_PRODUIT\n  ON NATURE_PRODUIT.CEBIN = 36\n AND NATURE_PRODUIT.DOS = CASE WHEN T000.TABTYP_0036 = 2 THEN '999' ELSE ART.DOS END\n AND NATURE_PRODUIT.PRODNAT = ART.PRODNAT;",
    piege: "Une table Txxx peut être commune (DOS = '999') ou propre au dossier : une jointure sur le seul DOS de la pièce rate les tables communes. Teste T000.TABTYP de la table.",
    pratique: "La doc note que ce CASE dans la jointure gêne les index : si tu sais que la table est commune chez toi, écris directement DOS = '999'.",
    motsCles: ["tables communes", "table de parametrage", "parametres", "dossier commun", "999", "gtftab", "txxx", "cebin", "tabtyp"],
    voirAussi: ["dv-t000", "dv-dos", "dv-t036", "case", "left-join"],
    sources: [
      { titre: "Achat-vent technique base - Tables communes Txxx", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/11490885655/Achat-vent+technique+base+-+Tables+communes+Txxx" },
      { titre: "Les widgets  KPI", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/10516465387/Les+widgets+KPI" },
      { titre: "Jointures auto résolues et CAST implicites", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/11430658054/Jointures+auto+r+solues+et+CAST+implicites" }
    ]
  },
  {
    id: "dv-t000",
    nom: "T000",
    type: "table",
    domaine: "divalto",
    categorie: "Tables Divalto",
    definition: "La table des tables : elle dit, pour chaque table Txxx, si elle est commune à tous les dossiers.",
    noms: ["table des tables"],
    champs: [
      ["CEBIN", "= 58"],
      ["DOS", "'999' si commune"],
      ["TABTYP", "tableau de 200 cases, une par table : 2 = table commune (ex. TABTYP_0036 pour T036)"],
      ["STACLETB", "paramétrage des index croisés des statistiques"],
      ["SYNCHROFL", "synchronisation inter-compagnies oui / non"]
    ],
    liens: [
      "Toutes les tables Txxx : la case TABTYP_00nn concerne la table Tnn"
    ],
    piege: "TABTYP est un tableau : en SQL, la case de la table 36 s'écrit TABTYP_0036 (exemple de la doc), pas TABTYP(36).",
    motsCles: ["table des tables", "table commune", "tabtyp", "dossier commun", "999", "parametrage", "commune", "t000"],
    voirAussi: ["dv-txxx", "dv-champ-tableau", "dv-dos"],
    sources: [
      { titre: "Achat-vent technique base - Tables communes Txxx", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/11490885655/Achat-vent+technique+base+-+Tables+communes+Txxx" },
      { titre: "Les widgets  KPI", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/10516465387/Les+widgets+KPI" }
    ]
  },
  {
    id: "dv-t006",
    nom: "T006",
    type: "table",
    domaine: "divalto",
    categorie: "Tables Divalto",
    definition: "La table des modes de règlement : calcul des échéances, fin de mois, traites et relevés.",
    noms: ["modes de règlement"],
    champs: [
      ["DOS", "dossier ou '999'"],
      ["REGL", "code mode de règlement"],
      ["LIB", "libellé"],
      ["REG2", "nombre de jours"],
      ["REG3", "fin de mois : 1 non, 2 fin de mois après, 3 fin de mois avant"],
      ["REG4", "jour de report (le 5…)"],
      ["REG5", "traite : 1 non, 2 en pied, 3 séparée"],
      ["REG6", "base du calcul de l'échéance : 1 facture, 2 bon de livraison"],
      ["REG7", "relevé : 1 non, 2 oui"],
      ["REG9", "échéance manuelle : 1 non, 2 oui"]
    ],
    liens: [
      "CLI.REGL, FOU.REGL, ENT.REGL : le mode de règlement du tiers ou de la pièce"
    ],
    pratique: "Loi LME, 45 jours fin de mois : REG3 = 2 (après) part de la fin du mois d'émission de la facture ; REG3 = 3 (avant), plus rare, de la fin du mois de l'échéance.",
    motsCles: ["mode de reglement", "conditions de paiement", "echeance", "fin de mois", "45 jours", "lme", "traite", "delai de paiement", "t006"],
    voirAussi: ["dv-txxx", "dv-cli", "dv-cp"],
    source: { titre: "Achat-vent technique base - Tables communes Txxx", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/11490885655/Achat-vent+technique+base+-+Tables+communes+Txxx" }
  },
  {
    id: "dv-t012",
    nom: "T012",
    type: "table",
    domaine: "divalto",
    categorie: "Tables Divalto",
    definition: "La table des familles statistiques article : code et libellé, pour les familles 1 à 3.",
    noms: ["familles statistiques article"],
    champs: [
      ["DOS", "dossier ou '999'"],
      ["FAMNO", "numéro de la famille statistique (1 à 3)"],
      ["FAM", "code famille"],
      ["LIB", "libellé"]
    ],
    liens: [
      "ART.FAMTB : les 3 familles statistiques de l'article",
      "ARTICLE_V : LIBELLE_FAM_STAT1 à 3"
    ],
    piege: "T012 range les 3 familles dans la même table : filtre FAMNO (1, 2 ou 3) en plus du code, sinon tu peux prendre le libellé d'une autre famille.",
    pratique: "Depuis la X.12, T012.LIB est en collation CI_AI : ajoute COLLATE si tu le concatènes avec d'autres libellés.",
    motsCles: ["famille statistique", "famille article", "familles", "libelle famille", "regroupement articles", "categorie article", "statistiques", "collation", "t012"],
    voirAussi: ["dv-art", "dv-article-v", "dv-txxx"],
    sources: [
      { titre: "Achat-vent technique base - Tables communes Txxx", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/11490885655/Achat-vent+technique+base+-+Tables+communes+Txxx" },
      { titre: "Migration - Différence de collation des champs entre Vx12 et Vx13", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/13003456950/Migration+-+Diff+rence+de+collation+des+champs+entre+Vx12+et+Vx13" }
    ]
  },
  {
    id: "dv-t017",
    nom: "T017",
    type: "table",
    domaine: "divalto",
    categorie: "Tables Divalto",
    definition: "La table des dépôts : libellé, établissement, gestion des emplacements et des réservations.",
    noms: ["dépôts"],
    champs: [
      ["DOS", "dossier ou '999'"],
      ["DEPO", "code dépôt"],
      ["LIB", "libellé"],
      ["TIERS", "tiers interne associé"],
      ["ETB", "établissement de rattachement"],
      ["LIEUCOD", "gère les emplacements non / oui"],
      ["STRES", "gère les réservations"],
      ["DEPOPRINC", "dépôt principal (informatif)"],
      ["BESCOD", "pris en compte dans le calcul des besoins"],
      ["BPCOD", "gère les bons de préparation"]
    ],
    piege: "Un seul dépôt principal par établissement : les traitements batch (calcul des besoins…) prennent le premier dépôt principal lu.",
    motsCles: ["depot", "depots", "magasin", "entrepot", "liste des depots", "depot principal", "emplacements", "t017"],
    voirAussi: ["dv-depo", "dv-ets", "dv-txxx", "dv-tia"],
    source: { titre: "Achat-vent technique base - Tables communes Txxx", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/11490885655/Achat-vent+technique+base+-+Tables+communes+Txxx" }
  },
  {
    id: "dv-t020",
    nom: "T020",
    type: "table",
    domaine: "divalto",
    categorie: "Tables Divalto",
    definition: "La table des codes opération : sens du stock, journal comptable et type de pièce de chaque mouvement.",
    noms: ["codes opération"],
    champs: [
      ["DOS", "dossier ou '999'"],
      ["OP", "code opération"],
      ["LIB", "libellé"],
      ["TICOD", "type de tiers C, F ou I"],
      ["SENS", "1 entrée, 2 sortie"],
      ["ACVE", "compte 1 achat, 2 vente"],
      ["JNL", "journal d'intégration comptable"],
      ["NSTO / NSTD", "nature de stock d'origine, de destination"],
      ["OPAS", "code opération associé (lettrage)"],
      ["TVAREG / TVANAT", "régime et nature de transaction pour la DEB"],
      ["PRGTRTTYP", "traitements concernés (classement ABC, calcul du CMP, transfert WMS…)"]
    ],
    liens: [
      "ENT.OP, MOUV.OP, MVTL.OP, STA.OP : le code opération du mouvement"
    ],
    pratique: "Pour savoir si une ligne entre ou sort du stock, lis le SENS de son code opération dans T020 ; le journal comptable de la pièce vient aussi du code opération.",
    motsCles: ["code operation", "operation", "type de mouvement", "sens", "journal", "entree sortie", "op", "t020"],
    voirAussi: ["dv-op", "dv-sens", "dv-txxx", "dv-sta"],
    sources: [
      { titre: "Achat-vent technique base - Tables communes Txxx", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/11490885655/Achat-vent+technique+base+-+Tables+communes+Txxx" },
      { titre: "L'intégration dans l'ERP", url: "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/12186452020/L+int+gration+dans+l+ERP" }
    ]
  },
  {
    id: "dv-t036",
    nom: "T036",
    type: "table",
    domaine: "divalto",
    categorie: "Tables Divalto",
    definition: "La table des natures de produit : acheté, fabriqué, fantôme, service ou encours.",
    noms: ["nature de produit"],
    champs: [
      ["DOS", "dossier ou '999'"],
      ["PRODNAT", "nature de produit"],
      ["PRODNAT1", "classe (1er caractère) : 1 acheté, 2 fabriqué, 3 fantôme, 4 service, 5 encours"],
      ["PRODNAT2", "identifiant"],
      ["LIB", "libellé"],
      ["OFFAM", "famille d'OF (seulement pour un produit fabriqué)"]
    ],
    piege: "PRODNAT1 et PRODNAT2 ne sont pas visibles en SQL : seule PRODNAT l'est. Prends la classe avec LEFT(PRODNAT, 1), comme ARTICLE_V.",
    motsCles: ["nature de produit", "produit fabrique", "produit achete", "service", "fantome", "classe produit", "prodnat", "t036"],
    voirAussi: ["dv-art", "dv-table-nature-produit-v", "dv-txxx", "left"],
    sources: [
      { titre: "Achat-vent technique base - Tables communes Txxx", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/11490885655/Achat-vent+technique+base+-+Tables+communes+Txxx" },
      { titre: "Explorateur de champ", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/10936811521/Explorateur+de+champ" },
      { titre: "Les widgets  KPI", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/10516465387/Les+widgets+KPI" }
    ]
  },
  {
    id: "dv-t085",
    nom: "T085",
    type: "table",
    domaine: "divalto",
    categorie: "Tables Divalto",
    definition: "La table des taux de TVA : un taux pour chaque couple régime article et régime tiers.",
    noms: ["taux de TVA"],
    champs: [
      ["DOS", "dossier ou '999'"],
      ["TVAART", "régime TVA article"],
      ["TVATIE", "régime TVA tiers"],
      ["EFFETDT", "date d'effet"],
      ["TVAP", "taux de TVA (%)"],
      ["TVACPT", "comptes de TVA"],
      ["TVAALP", "% d'autoliquidation"],
      ["TVATYP", "TVA sur les débits (1) ou les encaissements (2)"]
    ],
    liens: [
      "Taux d'une ligne : T085.TVAP du couple ART.TVAART et régime TVA du tiers de la pièce (mapping mobilité)",
      "T086 : libellés des régimes tiers ; CTAX.EFFETDT : date d'effet du code TVA"
    ],
    piege: "T085 garde plusieurs taux par date d'effet (EFFETDT) : sans filtre sur la date, un même couple article-tiers sort plusieurs fois.",
    motsCles: ["taux de tva", "tva", "regime tva", "taux", "autoliquidation", "tva article", "tva tiers", "date d'effet", "t085"],
    voirAussi: ["dv-t086", "dv-ctax", "dv-art", "dv-tva-deb"],
    sources: [
      { titre: "Achat-vent technique base - Tables communes Txxx", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/11490885655/Achat-vent+technique+base+-+Tables+communes+Txxx" },
      { titre: "Mapping des tables échangées", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/221844940/Mapping+des+tables+chang+es" }
    ]
  },
  {
    id: "dv-t086",
    nom: "T086",
    type: "table",
    domaine: "divalto",
    categorie: "Tables Divalto",
    definition: "La table des régimes TVA des tiers : le code et son libellé, comme régime normal.",
    noms: ["régimes TVA tiers"],
    champs: [
      ["DOS", "dossier ou '999'"],
      ["TVATIE", "régime TVA tiers"],
      ["LIB", "libellé"],
      ["CPTMSK", "masque du compte"]
    ],
    liens: [
      "CLI.TVATIE, FOU.TVATIE : le régime du tiers ; T085 : le taux du couple article et tiers"
    ],
    motsCles: ["regime tva", "regime tiers", "franchise", "export", "intracommunautaire", "tva tiers", "tva", "t086"],
    voirAussi: ["dv-t085", "dv-cli", "dv-txxx"],
    source: { titre: "Achat-vent technique base - Tables communes Txxx", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/11490885655/Achat-vent+technique+base+-+Tables+communes+Txxx" }
  },
  {
    id: "dv-t099",
    nom: "T099",
    type: "table",
    domaine: "divalto",
    categorie: "Tables Divalto",
    definition: "La table des régions par pays (états, provinces…), utilisée dans les blocs adresse.",
    noms: ["régions", "T070"],
    champs: [
      ["DOS", "dossier ou '999'"],
      ["PAY", "code pays"],
      ["REGIONCOD", "code région"],
      ["LIB", "libellé"]
    ],
    liens: [
      "CLI.REGIONCOD (bloc adresse) : contrôlé par T099",
      "T070 : ancienne table des régions administratives (fiche prospect)"
    ],
    piege: "Il existe deux tables de régions : T099 (par pays et région, celle des adresses) et T070 (ancienne, régions administratives des prospects). Ne les mélange pas.",
    motsCles: ["region", "regions", "etat", "province", "region administrative", "adresse", "t099", "t070"],
    voirAussi: ["dv-cli", "dv-txxx", "dv-t1"],
    sources: [
      { titre: "Existence de deux tables Régions", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/11005218381/Existence+de+deux+tables+R+gions" },
      { titre: "Achat-vent technique base - Tables communes Txxx", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/11490885655/Achat-vent+technique+base+-+Tables+communes+Txxx" }
    ]
  },
  {
    id: "dv-c8",
    nom: "C8",
    type: "table",
    domaine: "divalto",
    categorie: "Tables Divalto",
    definition: "Les lignes d'écritures comptables : compte, journal, date, montant, sens, lettrage et pièce.",
    noms: ["écritures comptables", "EntryLigne"],
    champs: [
      ["DOS / ETB", "dossier, établissement"],
      ["CE2", "type : 1 comptable, 2 extra-comptable, 3 budget, 4 modèle"],
      ["CE3", "1 brouillard, 2 validée"],
      ["CE4", "1 non lettrée, 2 lettrée, espace non lettrable"],
      ["CPT / CPTCOL", "compte, compte collectif"],
      ["JNL", "journal"],
      ["ECRNO / ECRLG", "numéro d'écriture, numéro de ligne"],
      ["ECRDT", "date d'écriture"],
      ["LIB", "libellé de l'écriture"],
      ["PIECE / PREFPIECE", "numéro de pièce et son préfixe"],
      ["PINOTIERS", "numéro de pièce du tiers"],
      ["ECHDT", "date d'échéance"],
      ["MT / MTDEV", "montant en devise principale, en devise saisie"],
      ["DEV", "devise"],
      ["SENS", "1 débit, 2 crédit"],
      ["LETT / LETTDT", "code et date de lettrage"],
      ["TIERS / TIERSGRP", "tiers, centrale"],
      ["AXE (1 à 4)", "axes analytiques"],
      ["VTLCOD_0005", "indicateur de ventilations par échéance : 1 = aucune ventilation CP, 2 ou 3 = ventilations CP présentes (requête de contrôle de la doc)"]
    ],
    liens: [
      "CX : ventilations analytiques ; CP : ventilations par pièce et échéance ; CTAX : ventilations TVA (même ECRNO)",
      "C3 : le compte (CPT) ; C4 : le journal (JNL)"
    ],
    exemple: "-- Lettrages non soldés (requête de contrôle de la doc ; CE4 écrit en texte)\nDECLARE @DOS VARCHAR(8) = '1'\nSELECT C8.DOS, C8.CPT, C8.LETT, C8.LETTDT,\n       SUM(CASE WHEN C8.SENS = 1 THEN C8.MT ELSE -C8.MT END) AS SOLDE_C8\nFROM C8\nWHERE C8.CE4 = '2'          -- lettrée\n  AND C8.DOS = @DOS\nGROUP BY C8.DOS, C8.CPT, C8.LETT, C8.LETTDT\nHAVING SUM(CASE WHEN C8.SENS = 1 THEN C8.MT ELSE -C8.MT END) <> 0\nORDER BY C8.DOS, C8.CPT, C8.LETT, C8.LETTDT;",
    piege: "SENS vaut 1 pour le débit et 2 pour le crédit : sommer MT sans regarder SENS donne un total faux. Attention, en gestion commerciale, SENS veut dire entrée ou sortie de stock.",
    pratique: "Dans les requêtes de contrôle de la doc, un code LETT qui commence par « * » est un lettrage partiel, et un espace veut dire « pas lettré ».",
    motsCles: ["ecritures", "ecritures comptables", "grand livre", "compte", "journal", "lettrage", "balance", "debit credit", "comptabilite", "montant", "c8"],
    voirAussi: ["dv-cx", "dv-cp", "dv-ctax", "dv-c3", "dv-cs", "dv-sens", "dv-rq-sig"],
    sources: [
      { titre: "Comptabilité Technique base", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/229627857/Comptabilit+Technique+base" },
      { titre: "L'import-export dans l'ERP", url: "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/12009078980/L+import-export+dans+l+ERP" },
      { titre: "Guide pratique pour la bascule vers règlement new - SANS assistant", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/11050844161/Guide+pratique+pour+la+bascule+vers+r+glement+new+-+SANS+assistant" }
    ]
  },
  {
    id: "dv-cx",
    nom: "CX",
    type: "table",
    domaine: "divalto",
    categorie: "Tables Divalto",
    definition: "Les ventilations analytiques des écritures : le montant d'une ligne réparti sur les axes.",
    noms: ["ventilation analytique", "AnalyticalLigne"],
    champs: [
      ["DOS / ETB", "dossier, établissement"],
      ["ECRNO / ECRLG", "écriture et ligne C8 ventilées"],
      ["MASKLG", "numéro de ligne de la ventilation"],
      ["AXE (1 à 4)", "codes des axes analytiques"],
      ["CPT / JNL", "compte, journal"],
      ["ECRDT", "date d'écriture"],
      ["MT / MTDEV", "montant en devise principale, en devise saisie"],
      ["SENS", "1 débit, 2 crédit"],
      ["CE7 à CEA", "1 si l'axe 1, 2, 3 ou 4 est renseigné"]
    ],
    liens: [
      "C8 : par DOS et ECRNO (le numéro d'écriture fait le lien), puis ECRLG"
    ],
    piege: "Joins CX à C8 sur ECRNO et ECRLG : sur ECRNO seul, chaque ventilation se répète sur toutes les lignes de l'écriture et tes montants sont multipliés.",
    motsCles: ["analytique", "ventilation analytique", "axe", "axes", "centre de cout", "repartition", "comptabilite analytique", "cx"],
    voirAussi: ["dv-c8", "dv-axe", "dv-c5", "dv-rq-repartition-analytique"],
    sources: [
      { titre: "Comptabilité Technique base", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/229627857/Comptabilit+Technique+base" },
      { titre: "L'import-export dans l'ERP", url: "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/12009078980/L+import-export+dans+l+ERP" }
    ]
  },
  {
    id: "dv-cp",
    nom: "CP",
    type: "table",
    domaine: "divalto",
    categorie: "Tables Divalto",
    definition: "Les ventilations des écritures par pièce et échéance : le suivi des règlements et de l'encours.",
    noms: ["échéances", "PaymentTermsLigne"],
    champs: [
      ["DOS / ETB", "dossier, établissement"],
      ["ECRNO / ECRLG / MASKLG", "écriture, ligne, ventilation"],
      ["CPT / PIECE", "compte, numéro de pièce"],
      ["ECHDT / ECHINIDT", "date d'échéance, date d'échéance initiale"],
      ["MT / MTDEV", "montants"],
      ["SENS", "1 débit, 2 crédit"],
      ["LETT / LETTDT", "code et date de lettrage (« * » en tête = lettrage partiel)"],
      ["CE4", "1 non lettrée, 2 lettrée"],
      ["ETATREG", "état de règlement"],
      ["REGLEFL", "2 si un règlement a été initié pour l'échéance, 1 sinon"],
      ["ENCFL", "encours : 0 non, 1 dans l'encours, 2 sortie de l'encours"],
      ["TIERSTYPE", "1 client, 2 fournisseur"],
      ["TIERS / TIERSG3 / DOSG3", "tiers ; tiers et dossier de la gestion commerciale"],
      ["LASTTRANSAC", "dernière transaction de règlement liée"],
      ["PROMISEFL", "2 = échéance promise (recouvrement)"]
    ],
    liens: [
      "C8 : par DOS, ECRNO et ECRLG",
      "DOSG3 et TIERSG3 : relient l'échéance au dossier et au tiers de la gestion commerciale"
    ],
    exemple: "-- Lettrages de CP non soldés (requête de contrôle de la doc)\nDECLARE @DOS VARCHAR(8) = '1'\nSELECT CP.DOS, CP.CPT, CP.LETT, CP.LETTDT,\n       SUM(CASE WHEN CP.SENS = 1 THEN CP.MT ELSE -CP.MT END) AS SOLDE\nFROM CP\nJOIN C3 ON CP.DOS = C3.DOS AND CP.CPT = C3.CPT\nWHERE LEFT(CP.LETT, 1) NOT IN (' ', '*')   -- lettré, pas partiel\n  AND CP.DOS = @DOS\n  AND C3.CPTNAT IN (3, 4, 5)                -- client, fournisseur, personnel\n  AND CP.LETTDT IS NOT NULL\nGROUP BY CP.DOS, CP.CPT, CP.LETT, CP.LETTDT\nHAVING SUM(CASE WHEN CP.SENS = 1 THEN CP.MT ELSE -CP.MT END) <> 0;",
    pratique: "Pour un échéancier client : CP avec TIERSTYPE = 1 et REGLEFL = 1 (aucun règlement initié), trié par ECHDT.",
    motsCles: ["echeance", "echeancier", "reglement", "encours", "relance", "recouvrement", "balance agee", "lettrage", "impayes", "cp"],
    voirAussi: ["dv-c8", "dv-c3", "dv-t006", "dv-t3"],
    sources: [
      { titre: "Comptabilité Technique base", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/229627857/Comptabilit+Technique+base" },
      { titre: "L'import-export dans l'ERP", url: "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/12009078980/L+import-export+dans+l+ERP" },
      { titre: "Guide pratique pour la bascule vers règlement new - SANS assistant", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/11050844161/Guide+pratique+pour+la+bascule+vers+r+glement+new+-+SANS+assistant" }
    ],
    version: "Depuis la 10.7 (fusion comptabilité et règlements), CP porte les données de règlement qui étaient dans les R2."
  },
  {
    id: "dv-ctax",
    nom: "CTAX",
    type: "table",
    domaine: "divalto",
    categorie: "Tables Divalto",
    definition: "Les ventilations TVA des écritures : base HT, TVA et date d'exigibilité, par régime.",
    noms: ["ventilations TVA", "VATLigne"],
    champs: [
      ["DOS / ETB", "dossier, établissement"],
      ["ECRNO / ECRLG", "écriture et ligne"],
      ["CE2", "1 non déclarable, 2 à déclarer, 3 préparée, 4 déclarée"],
      ["CE3", "1 achat, 2 vente"],
      ["TVAART / TVATIE", "code TVA article, régime TVA tiers"],
      ["PIECE", "numéro de pièce"],
      ["EXDT", "date d'exigibilité"],
      ["MTHT / MTTVA", "montant HT, montant de TVA"],
      ["TVATYP", "débit ou encaissement"],
      ["SENS", "sens"],
      ["FLTVAAL", "autoliquidation"],
      ["EFFETDT", "date d'effet du code TVA (celle de T085)"]
    ],
    liens: [
      "C8 : par ECRNO et ECRLG",
      "T085 : le taux (TVAART, TVATIE, EFFETDT)"
    ],
    pratique: "Pour contrôler la TVA à déclarer, filtre CE2 = '2' et regroupe MTHT et MTTVA par TVAART et TVATIE.",
    motsCles: ["tva", "ventilation tva", "declaration de tva", "tva collectee", "tva deductible", "exigibilite", "autoliquidation", "ctax"],
    voirAussi: ["dv-c8", "dv-t085", "dv-t086"],
    sources: [
      { titre: "L'import-export dans l'ERP", url: "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/12009078980/L+import-export+dans+l+ERP" },
      { titre: "Comptabilité Technique base", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/229627857/Comptabilit+Technique+base" }
    ]
  },
  {
    id: "dv-c3",
    nom: "C3",
    type: "table",
    domaine: "divalto",
    categorie: "Tables Divalto",
    definition: "Le plan comptable : les comptes avec leur libellé, nature, type et axes par défaut.",
    noms: ["plan comptable"],
    champs: [
      ["DOS", "dossier"],
      ["CPT", "compte"],
      ["LIB", "libellé du compte"],
      ["CPTCOL", "compte collectif"],
      ["CPTNAT", "nature du compte ; 3 client, 4 fournisseur, 5 personnel (requêtes de contrôle de la doc)"],
      ["CPTTYP", "type"],
      ["SENS", "sens implicite"],
      ["DEV", "devise"],
      ["AXESAIS (1 à 4) / AXE (1 à 4)", "saisie de l'axe, valeur par défaut de l'axe"],
      ["LETTTYP", "type de lettrage"],
      ["HSDT", "date de fermeture"],
      ["R3COD", "compte lié à Divalto Règlements"]
    ],
    liens: [
      "C8.CPT : les écritures du compte"
    ],
    motsCles: ["plan comptable", "compte", "comptes", "compte general", "compte collectif", "libelle compte", "nature de compte", "c3"],
    voirAussi: ["dv-c8", "dv-c4", "dv-cs"],
    sources: [
      { titre: "L'import-export dans l'ERP", url: "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/12009078980/L+import-export+dans+l+ERP" },
      { titre: "x12 migration", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/11454349316/x12+migration" },
      { titre: "Guide pratique pour la bascule vers règlement new - SANS assistant", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/11050844161/Guide+pratique+pour+la+bascule+vers+r+glement+new+-+SANS+assistant" }
    ],
    version: "Depuis la X.12, les soldes des comptes (C3 et C3ETS) sont vidés et ne sont plus mis à jour : calcule-les depuis C8."
  },
  {
    id: "dv-c4",
    nom: "C4",
    type: "table",
    domaine: "divalto",
    categorie: "Tables Divalto",
    definition: "Les journaux comptables : code, libellé, type et options de saisie.",
    noms: ["journaux"],
    champs: [
      ["DOS", "dossier"],
      ["JNL", "code journal"],
      ["LIB", "libellé du journal"],
      ["JNLTYP", "type"],
      ["PIECECOD", "type de numérotation automatique des pièces"],
      ["R3COD", "journal lié à Divalto Règlements"]
    ],
    liens: [
      "C8.JNL : les écritures du journal",
      "T020.JNL : le journal d'intégration d'un code opération"
    ],
    motsCles: ["journal", "journaux", "code journal", "journal de vente", "journal d'achat", "type de journal", "comptabilite", "c4"],
    voirAussi: ["dv-c8", "dv-t020", "dv-c3"],
    source: { titre: "L'import-export dans l'ERP", url: "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/12009078980/L+import-export+dans+l+ERP" }
  },
  {
    id: "dv-c5",
    nom: "C5",
    type: "table",
    domaine: "divalto",
    categorie: "Tables Divalto",
    definition: "Les axes analytiques : code, libellé, numéro d'axe et hiérarchie (axe père).",
    noms: ["axes analytiques"],
    champs: [
      ["DOS", "dossier"],
      ["AXE", "code axe"],
      ["LIB", "libellé"],
      ["AXENO", "numéro d'axe (1 à 4)"],
      ["AXEPRINCIP", "axe principal"],
      ["AXEPERE", "axe père"],
      ["AXETYP", "type d'axe"],
      ["HSDT", "date de fermeture"]
    ],
    liens: [
      "CX.AXE et C8.AXE : les codes d'axe utilisés dans les écritures"
    ],
    motsCles: ["axe analytique", "axes", "section analytique", "centre de cout", "libelle axe", "analytique", "hierarchie", "c5"],
    voirAussi: ["dv-cx", "dv-axe", "dv-c8"],
    source: { titre: "L'import-export dans l'ERP", url: "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/12009078980/L+import-export+dans+l+ERP" }
  },
  {
    id: "dv-cs",
    nom: "CS",
    type: "table",
    domaine: "divalto",
    categorie: "Tables Divalto",
    definition: "Les anciennes statistiques par compte, axe et mois, vidées et plus alimentées depuis la X.12.",
    noms: ["statistiques comptables"],
    champs: [
      ["CE2", "1 comptable, 2 extra-comptable, 3 budget"],
      ["CE7 à CEA", "1 si l'axe 1 à 4 est renseigné"]
    ],
    piege: "Une requête ou un rapport qui lit CS ne renvoie plus rien depuis la X.12 : les soldes se calculent à la volée depuis les écritures. Réécris-le sur C8.",
    motsCles: ["statistiques comptables", "soldes", "solde de compte", "balance", "cumul par compte", "migration x12", "comptabilite", "cs"],
    voirAussi: ["dv-c8", "dv-c3"],
    sources: [
      { titre: "x12 migration", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/11454349316/x12+migration" },
      { titre: "Comptabilité Technique base", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/229627857/Comptabilit+Technique+base" }
    ],
    version: "La page « Comptabilité Technique base » décrit encore CS ; la page x12 migration dit qu'elle est vidée à la migration X.12 et n'est plus alimentée."
  },
  {
    id: "dv-bf",
    nom: "BF",
    type: "table",
    domaine: "divalto",
    categorie: "Tables Divalto",
    definition: "L'en-tête des ordres de fabrication (OF) : produit, quantités, dates prévues et état.",
    noms: ["OF", "ordre de fabrication", "GTFOF"],
    champs: [
      ["DOS", "dossier"],
      ["PINO", "numéro d'OF (le même que l'ENT de la commande interne)"],
      ["REF / ARTIND", "article fabriqué et son indice"],
      ["LIBOF", "libellé de l'OF"],
      ["STATUS", "état : préparé, confirmé, lancé, démarré, clôturé, valorisé"],
      ["QTE", "quantité demandée (pour information)"],
      ["CDQTE", "quantité à produire"],
      ["BLQTE", "quantité produite"],
      ["PREVDEBDH / PREVFINDH", "début et fin prévus"],
      ["CE2", "1 si ordre de fabrication principal"],
      ["CE3", "1 si STATUS = 2, 3 ou 4"],
      ["BF_ID", "identifiant technique"]
    ],
    liens: [
      "ENT : ENT.PINO = BF.PINO, avec TICOD = 'I' et PICOD = 2 (commande interne)",
      "MOUV : les composants, lignes de l'OF en sortie (SENS = 2)",
      "BG : composants d'une ligne d'OF ; BH : séquences de gamme de l'OF",
      "OF_ENTETE_V : la vue des en-têtes d'OF (BF_ID)"
    ],
    piege: "QTE n'est pas la quantité à fabriquer : c'est la quantité demandée, pour information. Exemple de la doc : on en veut 100, 10 sont en stock, donc CDQTE = 90.",
    pratique: "Le dépôt, l'emplacement et les axes d'un OF sont recherchés dans le MOUV associé : pour eux, lis la ligne MOUV de l'OF plutôt que BF.",
    motsCles: ["of", "ordre de fabrication", "ordres de fabrication", "en-tete of", "fabrication", "production", "statut of", "quantite a produire", "bf"],
    voirAussi: ["dv-bg", "dv-bh", "dv-of-entete-v", "dv-ent", "dv-rq-of-sans-reservations"],
    sources: [
      { titre: "BF En-tête d'OF", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/229627911/BF+En-t+te+d+OF" },
      { titre: "Industrie", url: "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/12896370759/Industrie" }
    ],
    version: "La page technique liste les états sans codes ; la requête Dataviz « OF à venir » dit STATUS 5 et 6 = terminé et annulé. Vérifie les valeurs sur ta base."
  },
  {
    id: "dv-bg",
    nom: "BG",
    type: "table",
    domaine: "divalto",
    categorie: "Tables Divalto",
    definition: "Les composants d'une ligne d'OF : les quantités de matières prévues, en unité PUUN.",
    noms: ["composants d'OF"],
    champs: [
      ["GRREF", "composant (référence et sous-références)"],
      ["CDQTE", "quantité, en unité PUUN"],
      ["QTE / QTE1 / QTE2", "quantités reprises de la nomenclature"],
      ["QTETYP", "type de quantité"],
      ["PRODIND", "indice"],
      ["CE4", "1 si TICKETOF renseigné"]
    ],
    liens: [
      "BF : l'OF",
      "MVTL : la quantité réservée n'est pas dans BG, elle est générée en MVTL (avec DEPO, LIEU, NST)"
    ],
    piege: "La quantité réservée d'un composant n'est pas gardée dans BG : elle est générée sous forme de MVTL, avec le dépôt et l'emplacement.",
    motsCles: ["composants of", "composants d'une ligne d'of", "matieres", "composant", "besoin matiere", "consommation", "nomenclature", "of", "bg"],
    voirAussi: ["dv-bf", "dv-bb", "dv-mvtl"],
    source: { titre: "BG Composant d'une ligne d'OF", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/229627912/BG+Composant+d+une+ligne+d+OF" }
  },
  {
    id: "dv-bh",
    nom: "BH",
    type: "table",
    domaine: "divalto",
    categorie: "Tables Divalto",
    definition: "Les lignes de gamme d'un OF : les séquences (opérations), leurs temps et leur état.",
    noms: ["séquences d'OF", "GGFOF"],
    champs: [
      ["GAMSEQ / LIBSEQ", "numéro et libellé de la séquence"],
      ["CENTRE / POSTE", "centre de charge, poste de travail"],
      ["PREPTPS / FABTPS", "temps de préparation, de fabrication"],
      ["PREPQTE / FABQTE", "quantités de référence de ces temps"],
      ["CALDEBDT", "date de début retenue (PREVDEBDT si DEBDT est vide)"],
      ["CE2", "1 si opération sous-traitée"],
      ["CE3", "1 si BF.STATUS = 2, 3 ou 4"],
      ["STRTCOD", "sous-traitance"]
    ],
    liens: [
      "BF : l'OF ; BC : la ligne de gamme standard d'où viennent les temps"
    ],
    pratique: "Les données d'une séquence sont verrouillées dès la première saisie de temps (statut démarré) : une séquence modifiable n'a pas encore commencé.",
    motsCles: ["gamme of", "sequence", "operation", "temps de fabrication", "poste de charge", "sous-traitance", "ordonnancement", "bh"],
    voirAussi: ["dv-bf", "dv-bc"],
    source: { titre: "GGFOF", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/229627914/GGFOF" }
  },
  {
    id: "dv-ba",
    nom: "BA",
    type: "table",
    domaine: "divalto",
    categorie: "Tables Divalto",
    definition: "L'en-tête de production d'un article : en-tête de nomenclature et de gamme, par indice.",
    noms: ["en-tête de production", "GTFNOM"],
    champs: [
      ["CE2", "1 = en-tête principal de l'indice en vigueur"],
      ["GAMPRINC", "gamme principale d'un indice"]
    ],
    liens: [
      "BB : les lignes de nomenclature (composants) ; BC : les lignes de gamme",
      "SART : mise à jour quand l'en-tête devient principal (substitution des sous-références)"
    ],
    pratique: "Un article est fabriqué s'il a un BA : la nature de produit de la fiche article n'est qu'indicative, dit la doc.",
    motsCles: ["nomenclature", "en-tete de nomenclature", "gamme", "indice", "donnees techniques", "production", "article fabrique", "ba"],
    voirAussi: ["dv-bb", "dv-bc", "dv-bf", "dv-t036"],
    source: { titre: "BA En-tête production", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/229627904/BA+En-t+te+production" }
  },
  {
    id: "dv-bb",
    nom: "BB",
    type: "table",
    domaine: "divalto",
    categorie: "Tables Divalto",
    definition: "Les lignes de nomenclature : les composants d'un produit, avec leurs quantités et leurs pertes.",
    noms: ["lignes de nomenclature"],
    champs: [
      ["LILG", "numéro de ligne (ordre de saisie)"],
      ["QTE", "quantité de structure (négative : un produit annexe est récupéré)"],
      ["QTE1", "quantité de produit fini par lien (ex. 1 caisse pour 12 bouteilles)"],
      ["QTE2", "quantité répétitive (ex. 3 morceaux de 0,2 m)"],
      ["GRGAM / GAMSEQ", "gamme et séquence où le composant est consommé"],
      ["CE9", "indicateur temporaire du calcul des niveaux"]
    ],
    liens: [
      "BA : l'en-tête de production"
    ],
    pratique: "D'après les exemples de la doc : 0,2 m × 3 morceaux = 0,6 m d'acier pour 1 produit fini, et 1 caisse pour 12 bouteilles (QTE = 1, QTE1 = 12).",
    motsCles: ["nomenclature", "composants", "ligne de nomenclature", "bom", "quantite de structure", "perte", "composant", "bb"],
    voirAussi: ["dv-ba", "dv-bg"],
    source: { titre: "BB Ligne de nomenclature", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/229627905/BB+Ligne+de+nomenclature" }
  },
  {
    id: "dv-bc",
    nom: "BC",
    type: "table",
    domaine: "divalto",
    categorie: "Tables Divalto",
    definition: "Les lignes de gamme : les opérations de fabrication, avec centre de charge, temps et sous-traitance.",
    noms: ["lignes de gamme", "GGFGAM"],
    champs: [
      ["PREPTPS / PREPQTE", "temps de préparation et sa quantité (0 = temps forfaitaire)"],
      ["FABTPS / FABQTE", "temps de fabrication (FABQTE = 0 : temps fixe)"],
      ["CENTRE / POSTE", "centre de charge (obligatoire), poste de travail (facultatif)"],
      ["CE2", "1 si POSTE est renseigné"],
      ["STRTCOD", "2 = séquence sous-traitée"],
      ["DELSTRT", "délai de sous-traitance"],
      ["FRACNB", "fractionnement : nombre de machines utilisées en même temps"],
      ["CHEVSEQ / CHEVTX", "séquence et taux de chevauchement"]
    ],
    liens: [
      "BA : l'en-tête de production ; BD : ressources ; BE : outillages de la ligne"
    ],
    motsCles: ["gamme", "gamme de fabrication", "operation", "temps de preparation", "temps de fabrication", "centre de charge", "sous-traitance", "bc"],
    voirAussi: ["dv-ba", "dv-bh"],
    source: { titre: "GGFGAM", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/229627906/GGFGAM" }
  },
  {
    id: "dv-gpaelem",
    nom: "GPAELEM",
    type: "table",
    domaine: "divalto",
    categorie: "Tables Divalto",
    definition: "Les éléments d'une affaire : l'arborescence, avec libellé, statut et dates de planning.",
    noms: ["éléments d'affaire", "ElemGPA"],
    champs: [
      ["DOS / AFFAIRE", "l'affaire"],
      ["AFRINDICE", "indice de l'affaire"],
      ["ELEMNO / ELEMNOPARENT", "numéro d'élément, élément parent"],
      ["ARBOCOD", "code arborescence (ex. 'TEC' : arborescence technique)"],
      ["ELEMTYPCOD", "type d'élément"],
      ["LIB80", "libellé"],
      ["STATUTCOD", "code statut (relié à GATELEMST)"],
      ["PLANDEBDH / PLANFINDH", "début et fin planifiés"],
      ["PREVDT", "date prévue"]
    ],
    liens: [
      "PRJAP : l'affaire (DOS, AFFAIRE)",
      "GPAACTIVITE et GPACBESOIN : par DOS, AFFAIRE, AFRINDICE et ELEMNO",
      "GATELEMST : le statut (STATUTCOD, STATUTTYP = 1)"
    ],
    piege: "Les jointures vers les activités et les besoins utilisent 4 champs : DOS, AFFAIRE, AFRINDICE et ELEMNO. En oublier un (souvent AFRINDICE) mélange les indices d'une même affaire.",
    motsCles: ["element d'affaire", "elements", "arborescence", "affaire", "planning", "statut element", "indice", "gestion de projet", "gpaelem"],
    voirAussi: ["dv-prjap", "dv-gpaactivite", "dv-gpacbesoin", "dv-gatelemst", "dv-rq-ratio-activite-affaire"],
    sources: [
      { titre: "Affaire Technique base", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/11490885669/Affaire+Technique+base" },
      { titre: "Résumé d'affaire (V10.7) (JSON)", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/10530390663/R+sum+d+affaire+V10.7+JSON" },
      { titre: "Industrie", url: "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/12896370759/Industrie" }
    ]
  },
  {
    id: "dv-gpacbesoin",
    nom: "GPACBESOIN",
    type: "table",
    domaine: "divalto",
    categorie: "Tables Divalto",
    definition: "Les couvertures de besoin d'une affaire : composants à couvrir, quantités et date de besoin.",
    noms: ["couverture de besoin", "CBesoinGPA"],
    champs: [
      ["DOS / AFFAIRE / AFRINDICE / ELEMNO", "l'élément d'affaire"],
      ["BESOINNO", "numéro de besoin"],
      ["REF / ARTIND / SREF1 / SREF2", "article"],
      ["DEPO", "dépôt"],
      ["DELDT", "date de besoin"],
      ["COUVREFQTE", "quantité à couvrir"],
      ["SORTIEREFQTE", "quantité déjà sortie"],
      ["TICKETRES", "ticket de réservation (lien MRES.TICKETRESS)"]
    ],
    liens: [
      "GPAELEM : l'élément d'affaire",
      "MRES : MRES.TICKETRESS = GPACBESOIN.TICKETRES"
    ],
    pratique: "Reste à couvrir = COUVREFQTE - ISNULL(SORTIEREFQTE, 0), ramené à 0 s'il est négatif : c'est le calcul des requêtes Dataviz Industrie.",
    motsCles: ["besoin affaire", "couverture de besoin", "besoins", "composants affaire", "reservation", "date de besoin", "affaire", "gpacbesoin"],
    voirAussi: ["dv-gpaelem", "dv-mres", "dv-ticketres", "dv-rq-incoherences-reservations-affaires"],
    sources: [
      { titre: "Affaire Technique base", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/11490885669/Affaire+Technique+base" },
      { titre: "Industrie", url: "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/12896370759/Industrie" }
    ]
  },
  {
    id: "dv-gpaactivite",
    nom: "GPAACTIVITE",
    type: "table",
    domaine: "divalto",
    categorie: "Tables Divalto",
    definition: "Les lignes d'activités d'une affaire : le temps prévu pour chaque activité d'un élément.",
    noms: ["activités", "ActivGPA"],
    champs: [
      ["DOS / AFFAIRE / AFRINDICE / ELEMNO", "l'élément d'affaire"],
      ["ACTIVNO", "numéro d'activité"],
      ["TPSPREV", "temps prévu, en secondes"]
    ],
    liens: [
      "GPAELEM : l'élément ; AFRTPS : les temps réalisés (même clé + ACTIVNO)"
    ],
    piege: "TPSPREV est stocké en secondes : divise par 3600 pour avoir des heures.",
    motsCles: ["activite", "activites", "temps prevu", "charge", "planning", "heures prevues", "affaire", "gpaactivite"],
    voirAussi: ["dv-gpaelem", "dv-afrtps", "dv-rq-ratio-activite-affaire"],
    sources: [
      { titre: "Affaire Technique base", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/11490885669/Affaire+Technique+base" },
      { titre: "Industrie", url: "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/12896370759/Industrie" }
    ]
  },
  {
    id: "dv-afrtps",
    nom: "AFRTPS",
    type: "table",
    domaine: "divalto",
    categorie: "Tables Divalto",
    definition: "Les temps passés sur les affaires : le temps réalisé par activité.",
    noms: ["temps passés", "GAFVAL"],
    champs: [
      ["DOS / AFFAIRE / AFRINDICE / ELEMNO / ACTIVNO", "l'activité"],
      ["TPSREAL", "temps réalisé, en secondes"]
    ],
    liens: [
      "GPAACTIVITE : par DOS, AFFAIRE, ELEMNO, AFRINDICE et ACTIVNO",
      "AFRPOINT : les points d'affaire ; la doc cite AFRPOINT + AFRTPS pour les temps par point"
    ],
    piege: "TPSREAL est stocké en secondes : SUM(TPSREAL) / 3600 donne des heures.",
    pratique: "Exemple de la doc : pour les temps passés par point d'affaire, une requête sur AFRPOINT et AFRTPS, jointe aux clients et aux affaires, puis une vue.",
    motsCles: ["temps passes", "temps realise", "saisie des temps", "heures", "pointage", "temps", "affaire", "afrtps"],
    voirAussi: ["dv-gpaactivite", "dv-gpaelem", "dv-prjap", "dv-rq-ratio-activite-affaire"],
    sources: [
      { titre: "Affaire Technique base", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/11490885669/Affaire+Technique+base" },
      { titre: "Industrie", url: "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/12896370759/Industrie" },
      { titre: "Bonne pratique pour les autres outils", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/10516467236/Bonne+pratique+pour+les+autres+outils" }
    ]
  },
  {
    id: "dv-gatelemst",
    nom: "GATELEMST",
    type: "table",
    domaine: "divalto",
    categorie: "Tables Divalto",
    definition: "Les statuts des éléments d'affaire : chaque code statut est relié à un statut maître.",
    noms: ["statuts d'éléments", "ElemStAfr"],
    champs: [
      ["DOS", "dossier"],
      ["STATUTTYP", "type de statut (1 dans les requêtes Dataviz sur les éléments)"],
      ["STATUTCOD", "code statut (personnalisable)"],
      ["STATUTM", "statut maître : en cours, en attente, suspendu ou terminé"]
    ],
    liens: [
      "GPAELEM.STATUTCOD = GATELEMST.STATUTCOD (même DOS, STATUTTYP = 1)"
    ],
    motsCles: ["statut", "statut maitre", "statut element", "code statut", "element actif", "en cours", "termine", "gatelemst"],
    voirAussi: ["dv-gpaelem", "dv-rq-incoherences-reservations-affaires"],
    sources: [
      { titre: "Paramétrages liés aux arborescences", url: "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704700065/Param+trages+li+s+aux+arborescences" },
      { titre: "Industrie", url: "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/12896370759/Industrie" },
      { titre: "Affaire Technique base", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/11490885669/Affaire+Technique+base" }
    ],
    version: "Les requêtes Dataviz prennent STATUTM = 2 pour les éléments actifs (en cours) ; la page des arborescences liste les statuts maîtres sans dire leur code stocké. Vérifie la valeur sur ta base."
  },
  {
    id: "dv-muser",
    nom: "MUSER",
    type: "table",
    domaine: "divalto",
    categorie: "Tables Divalto",
    definition: "Les utilisateurs de l'ERP : login, nom, date de fin de validité, dossier et dépôt par défaut.",
    noms: ["utilisateurs", "a5dd"],
    champs: [
      ["USER", "login du compte utilisateur"],
      ["NOM / PRENOM", "nom, prénom"],
      ["HSDT", "date de fin de validité du compte"],
      ["DOS", "dossier implicite de l'utilisateur"],
      ["DEPO", "dépôt de l'utilisateur (modifiable à tout moment)"],
      ["PROTDDT / PROTFDT", "dates de protection (début, fin)"],
      ["SAISTYPG3", "saisie en mode fiche ou non : pièces client, fournisseur, internes, nomenclatures, gammes, zooms"],
      ["MUSER_ID", "identifiant technique"]
    ],
    liens: [
      "MUSERAPPLIC : les accès de l'utilisateur aux domaines (applications)",
      "Widgets KPI : [MUSER.USER] = l'utilisateur courant, [MZ.DOS] = le dossier courant"
    ],
    piege: "Depuis la X.12, MUSER.NOM et PRENOM sont en collation CI_AI : ajoute COLLATE si tu les concatènes avec des champs en collation par défaut.",
    pratique: "Dans une requête de widget KPI, [MUSER.USER] et [MZ.DOS] sont remplacés par l'utilisateur et le dossier courants : filtre avec eux pour un widget personnel.",
    motsCles: ["utilisateur", "utilisateurs", "login", "compte utilisateur", "user", "droits", "dossier par defaut", "collation", "muser"],
    voirAussi: ["dv-user-trace", "dv-dos", "dv-ndfent"],
    sources: [
      { titre: "Achat-vente Technique base", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/11491115009/Achat-vente+Technique+base" },
      { titre: "Les widgets  KPI", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/10516465387/Les+widgets+KPI" },
      { titre: "Migration - Différence de collation des champs entre Vx10 et Vx12", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/11638604231/Migration+-+Diff+rence+de+collation+des+champs+entre+Vx10+et+Vx12" }
    ]
  },
  {
    id: "dv-mjoint",
    nom: "MJOINT",
    type: "table",
    domaine: "divalto",
    categorie: "Tables Divalto",
    definition: "La table des fichiers joints : libellé, nom et taille des fichiers liés aux fiches et aux pièces.",
    noms: ["fichiers joints"],
    champs: [
      ["JOINT", "numéro du groupe de fichiers joints (repris dans le champ JOINT des fiches)"],
      ["LIB80", "libellé"],
      ["FICC", "nom du fichier"],
      ["TAILLEFIC", "taille du fichier en octets"],
      ["USERCRDT / USERMODT", "dates de création, de modification"],
      ["MJOINT_ID", "identifiant technique"]
    ],
    liens: [
      "ENT, CLI, ART… : champ JOINT (CEJOINT = 2 quand un fichier est joint)"
    ],
    piege: "En duplication d'environnement, MJOINT est soit remplacée (copie des fichiers joints, chemins mis à jour), soit gardée telle quelle : vérifie les chemins après une copie de base.",
    motsCles: ["fichiers joints", "piece jointe", "document joint", "pdf", "attachement", "ged", "joint", "mjoint"],
    voirAussi: ["dv-joint", "dv-ent"],
    sources: [
      { titre: "Mapping des tables échangées", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/221844940/Mapping+des+tables+chang+es" },
      { titre: "Duplication", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/10735976488/Duplication" }
    ]
  },
  {
    id: "dv-evttiers",
    nom: "EVTTIERS",
    type: "table",
    domaine: "divalto",
    categorie: "Tables Divalto",
    definition: "Les événements de la relation tiers : tâches et rendez-vous liés à un client, un prospect ou un fournisseur.",
    noms: ["événements", "GRFEVT"],
    champs: [
      ["DOS", "dossier"],
      ["EVTNO", "numéro d'événement"],
      ["EVENEMENT", "code événement (table GRTEVT)"],
      ["TIERS / TIERSINDIVIDU", "tiers ou individu"],
      ["CE2", "2 prospect, 3 client"],
      ["LIB80", "libellé"],
      ["EVTDT / EVTHE", "date et heure de début (ou de création)"],
      ["EVTFINDT / EVTFINHE", "date et heure de fin"],
      ["EVTECHDT / EVTECHHE", "échéance"],
      ["REALISEOK", "tâche : 1 à réaliser, 2 réalisée"],
      ["RDVOK", "2 = rendez-vous confirmé"],
      ["ANNULEST", "2 = annulé"],
      ["EVTUSER / REALUSER", "créateur, réalisateur"],
      ["CONTACT", "contact"],
      ["EVTTIERS_ID", "identifiant technique"]
    ],
    liens: [
      "GRTEVT : le code événement",
      "EVTCOL : collaborateurs de l'événement ; EVTCONTACT : contacts",
      "MUSER : EVTUSER et REALUSER"
    ],
    pratique: "Tâches en retard d'un commercial : REALISEOK = 1 (à réaliser) et EVTECHDT dépassée, filtrées sur EVTUSER.",
    motsCles: ["evenement", "evenements", "tache", "taches", "rendez-vous", "agenda", "crm", "relation tiers", "action commerciale", "evttiers"],
    voirAussi: ["dv-cli", "dv-muser", "dv-pro"],
    source: { titre: "Mapping des tables échangées", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/221844940/Mapping+des+tables+chang+es" }
  },
  {
    id: "dv-ndfent",
    nom: "NDFENT",
    type: "table",
    domaine: "divalto",
    categorie: "Tables Divalto",
    definition: "L'en-tête des notes de frais d'un collaborateur, avec leur statut de validation.",
    noms: ["notes de frais", "GAFNDF"],
    champs: [
      ["NDFENT_ID", "identifiant"],
      ["DOS", "dossier"],
      ["SALCOD", "collaborateur"],
      ["LIB80", "libellé"],
      ["STATUSNDF", "0 en cours de saisie, 1 refusée par le manager, 2 validée par le collaborateur, 3 validée par le manager, 8 intégrée en paie, 9 intégrée en compta"]
    ],
    exemple: "SELECT NDFENT.NDFENT_ID AS ID,\n       CONCAT(CASE NDFENT.STATUSNDF WHEN 0 THEN '(En cours de saisie) '\n                                    WHEN 1 THEN '(Refusée par le manager) '\n                                    WHEN 2 THEN '(Validée par le collaborateur) '\n                                    WHEN 3 THEN '(Validée par le manager) '\n                                    ELSE '(Statut spécifique) ' END,\n              RTRIM(NDFENT.LIB80)) AS TEXT\nFROM NDFENT AS NDFENT\nWHERE STATUSNDF IN (0, 1, 2, 3)\n  AND NDFENT.DOS = @DOS\n  AND NDFENT.SALCOD = @COLLABORATEUR;",
    pratique: "Exemple de widget KPI de la doc : les notes de frais actives du collaborateur ; @DOS vaut [MZ.DOS] et @COLLABORATEUR vaut [MUSER.USER].",
    motsCles: ["note de frais", "notes de frais", "ndf", "frais", "depenses", "remboursement", "validation manager", "collaborateur", "ndfent"],
    voirAussi: ["dv-muser", "case"],
    source: { titre: "Les widgets  KPI", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/10516465387/Les+widgets+KPI" }
  },
  {
    id: "dv-mtrctrace",
    nom: "MTRCTRACE",
    type: "table",
    domaine: "divalto",
    categorie: "Tables Divalto",
    definition: "La table de traçabilité financière : chaque modification tracée, avec l'ancienne valeur, la nouvelle et son auteur.",
    noms: ["traçabilité financière", "A5PMTRACE"],
    champs: [
      ["Dossier", "numéro de dossier"],
      ["Applic", "code application"],
      ["NomTable / NomChamp", "table et champ modifiés"],
      ["ActTyp", "type d'action : 1 ajout, 2 modification, 3 suppression, 4 autre"],
      ["TiCod / PiCod / PiNo", "la pièce, seulement si l'enregistrement tracé est une pièce"],
      ["TracePK", "clé d'accès direct à l'enregistrement modifié"],
      ["ValOriModLib", "valeur initiale (indice 1) et valeur modifiée (indice 2)"],
      ["UserCr / UserMoDh", "utilisateur, date et heure de la modification"]
    ],
    liens: [
      "MTRCDICO, MTRCENREG, MTRCCHAMP : le paramétrage de ce qui est tracé (dictionnaires, enregistrements, champs)"
    ],
    pratique: "Seules les modifications paramétrées sont tracées (module A5PMTRACE, modèle de la loi Sarbanes-Oxley) : une table absente de MTRCTRACE n'a peut-être juste pas été paramétrée.",
    motsCles: ["tracabilite", "tracabilite financiere", "historique des modifications", "audit", "sarbanes-oxley", "valeur avant apres", "qui a modifie", "piste d'audit", "mtrctrace"],
    voirAussi: ["dv-user-trace", "dv-champ-tableau"],
    sources: [
      { titre: "Structure du fichier MTRCTRACE", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/228847697/Structure+du+fichier+MTRCTRACE" },
      { titre: "La table MTRCTRACE", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/228847695/La+table+MTRCTRACE" },
      { titre: "Généralités la loi Sarbanes-Oxley.", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/228847679/G+n+ralit+s+la+loi+Sarbanes-Oxley." }
    ]
  },
  {
    id: "dv-pvt",
    nom: "PVT",
    type: "table",
    domaine: "divalto",
    categorie: "Tables Divalto",
    definition: "Les tickets de vente du point de vente (caisse), séparés des autres opérations depuis la 10.13.",
    noms: ["tickets de vente", "PVTDET"],
    champs: [
      ["DES", "désignation (collation CI_AI en X.13)"]
    ],
    liens: [
      "PVTDET : les lignes de ticket",
      "PVE : les autres opérations de caisse, et les tickets mis en attente",
      "PVF : la facture de caisse, alimentée depuis les lignes de ticket"
    ],
    pratique: "Pour un CA caisse en 10.13, lis PVT : PVE ne garde que les opérations de caisse et les tickets en attente, qui passent dans PVT une fois repris et validés.",
    motsCles: ["ticket", "tickets de caisse", "point de vente", "caisse", "tpv", "vente comptoir", "nf525", "pvt"],
    voirAussi: ["dv-pve", "dv-pvf"],
    sources: [
      { titre: "Gestion des Compteurs", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/12711788565/Gestion+des+Compteurs" },
      { titre: "Gestion des tables TPV (V10.13)", url: "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/12714344449/Gestion+des+tables+TPV+V10.13" },
      { titre: "Migration - Différence de collation des champs entre Vx12 et Vx13", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/13003456950/Migration+-+Diff+rence+de+collation+des+champs+entre+Vx12+et+Vx13" }
    ],
    version: "Avant la 10.13, la table PVE regroupait tous les tickets (vente, ouverture et fermeture de caisse, fonds de caisse, tickets techniques). Depuis, PVT ne contient que les tickets de vente."
  },
  {
    id: "dv-pve",
    nom: "PVE",
    type: "table",
    domaine: "divalto",
    categorie: "Tables Divalto",
    definition: "Les opérations de caisse du point de vente, et les tickets de vente mis en attente.",
    noms: ["opérations de caisse"],
    champs: [
      ["ATTENTETRAITEFL", "ticket en attente : 1 en attente, 2 repris et validé, 0 après une reprise de données"]
    ],
    liens: [
      "PVT : un ticket en attente y est enregistré après sa reprise et sa validation"
    ],
    piege: "Un ticket annulé alors qu'il était en attente reste dans PVE (la table des opérations) et n'arrive jamais dans PVT : ne le compte pas comme une vente.",
    motsCles: ["operations de caisse", "ticket en attente", "fond de caisse", "ouverture de caisse", "point de vente", "caisse", "tpv", "pve"],
    voirAussi: ["dv-pvt", "dv-pvf"],
    sources: [
      { titre: "Gestion des tables TPV (V10.13)", url: "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/12714344449/Gestion+des+tables+TPV+V10.13" },
      { titre: "Gestion des Compteurs", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/12711788565/Gestion+des+Compteurs" }
    ],
    version: "Avant la 10.13, PVE contenait aussi tous les tickets de vente ; depuis, ils sont dans PVT (page « Gestion des Compteurs »)."
  },
  {
    id: "dv-pvf",
    nom: "PVF",
    type: "table",
    domaine: "divalto",
    categorie: "Tables Divalto",
    definition: "La facture de caisse du point de vente, distincte du ticket, pour la norme NF525.",
    noms: ["facture de caisse", "PVFDET"],
    liens: [
      "PVF : informations générales de la facture (adresse, références client)",
      "PVFDET : les lignes de facture, alimentées depuis les lignes de ticket",
      "PVFTAXVTL : taxes par ligne ; PVFTAXVTE : cumul des taxes par type pour l'en-tête"
    ],
    motsCles: ["facture de caisse", "point de vente", "nf525", "facture comptoir", "duplicata", "tva caisse", "pvf", "pvfdet"],
    voirAussi: ["dv-pvt", "dv-pve"],
    source: { titre: "Information technique du modèle de données de la facture de caisse, ticket et duplicata (V10.13)", url: "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/12327256081/Information+technique+du+mod+le+de+donn+es+de+la+facture+de+caisse+ticket+et+duplicata+V10.13" }
  },
  {
    id: "dv-wmvtl",
    nom: "WMVTL",
    type: "table",
    domaine: "divalto",
    categorie: "Tables Divalto",
    definition: "Le stock du WMS : les ventilations par dépôt, emplacement et contenant.",
    noms: ["ventilations WMS"],
    champs: [
      ["DOS / DEPO", "dossier, dépôt"],
      ["GRREF", "article (référence et sous-références)"],
      ["NST", "nature de stock"],
      ["SERIE", "série ou lot"],
      ["LIEU", "emplacement"],
      ["WMCONTNO", "numéro de contenant"],
      ["REFQTE / STQTE", "quantités"],
      ["VTLTYP", "type de ventilation"]
    ],
    liens: [
      "MVTL : le stock de la gestion commerciale ; quantité, article, nature, dépôt et série existent des deux côtés",
      "Les coûts (CR, CMP) restent dans MVTL, pas dans le WMS"
    ],
    piege: "Un déplacement dans le dépôt ou un changement de contenant ne touche que WMVTL : MVTL ne voit pas l'emplacement WMS. Pour l'emplacement réel, lis WMVTL.",
    motsCles: ["wms", "stock wms", "emplacement", "contenant", "palette", "sscc", "entrepot", "ventilation wms", "wmvtl"],
    voirAussi: ["dv-mvtl", "dv-nst"],
    sources: [
      { titre: "Contenants et clé de stock", url: "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11705928798/Contenants+et+cl+de+stock" },
      { titre: "Proposer un emplacement fixe pour l'article (V10.12)", url: "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11705931701/Proposer+un+emplacement+fixe+pour+l+article+V10.12" }
    ]
  },
  {
    id: "dv-f-facture-vente-ligne",
    nom: "F_FACTURE_VENTE_LIGNE",
    type: "table",
    domaine: "divalto",
    categorie: "Tables Divalto",
    definition: "Table de la base décisionnelle (BI) : les lignes de factures de vente, chargées depuis l'ERP par l'ETL.",
    noms: ["datawarehouse", "base BI"],
    champs: [
      ["MONTANT_FACTURE_NET_DEV", "montant net facturé, en devise"],
      ["DATE_FACTURE", "date de facture"],
      ["DOSSIER_CODE", "code dossier"]
    ],
    liens: [
      "Base DWDIVALTO, chargée depuis ERPDIVALTO par l'ETL du Power DataWarehouse Builder (PDWB)"
    ],
    exemple: "SELECT SUM(MAXFAC.MONTANT_FACTURE_NET_DEV)\nFROM $BI.F_FACTURE_VENTE_LIGNE AS MAXFAC\nWHERE YEAR(MAXFAC.DATE_FACTURE) = YEAR(GETDATE()) - 1\n  AND MAXFAC.DOSSIER_CODE = @DOSSIER",
    piege: "$BI. n'est pas du SQL Server : c'est le préfixe des widgets KPI, remplacé par la base décisionnelle. Dans SSMS, écris le vrai nom de la base.",
    motsCles: ["base bi", "datawarehouse", "decisionnel", "ca annee precedente", "lignes de factures", "factures de vente", "etl", "pdwb", "f_facture_vente_ligne"],
    voirAussi: ["dv-facture-vente-mouv-v", "getdate", "datepart"],
    sources: [
      { titre: "Les widgets  KPI", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/10516465387/Les+widgets+KPI" },
      { titre: "Configuration de l'ETL Power DataWarehouse Builder", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/10516466422/Configuration+de+l+ETL+Power+DataWarehouse+Builder" }
    ]
  },
  {
    id: "dv-dos",
    nom: "DOS",
    type: "champ",
    domaine: "divalto",
    categorie: "Champs Divalto",
    definition: "Le code du dossier (la société) : présent dans presque toutes les tables, en tête des clés.",
    noms: ["DOSSIER", "CLE_DOSSIER", "DOSSIER_CODE"],
    liens: [
      "'999' : dossier commun, pour les tables Txxx communes (voir T000)",
      "[MZ.DOS] : le dossier courant, dans les requêtes de widgets KPI",
      "Vues : la colonne s'appelle DOSSIER (ARTICLE_V.DOSSIER = ART.DOS)"
    ],
    piege: "DOS est du texte : écris DOS = '998', pas DOS = 998. Un nombre force une conversion implicite et SQL Server n'utilise plus les index (page des bonnes pratiques SQL).",
    pratique: "La doc déconseille de lire les tables en direct, à cause du champ DOS et des données communes multi-dossiers : pour un rapport, préfère les vues _V.",
    motsCles: ["dossier", "societe", "code dossier", "multi-dossier", "dossier commun", "999", "entreprise", "filiale", "dos"],
    voirAussi: ["dv-txxx", "dv-t000", "dv-soc", "dv-vues-sql"],
    sources: [
      { titre: "ERP en direct", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/10516466281/ERP+en+direct" },
      { titre: "Jointures auto résolues et CAST implicites", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/11430658054/Jointures+auto+r+solues+et+CAST+implicites" },
      { titre: "Achat-vent technique base - Tables communes Txxx", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/11490885655/Achat-vent+technique+base+-+Tables+communes+Txxx" }
    ]
  },
  {
    id: "dv-ticod",
    nom: "TICOD",
    type: "champ",
    domaine: "divalto",
    categorie: "Champs Divalto",
    definition: "Le type de tiers d'une pièce ou d'un mouvement : C client, F fournisseur, P prospect, I interne.",
    noms: ["type de tiers"],
    liens: [
      "ENT, MOUV, MVTL, BPENT, STA : même champ",
      "I = interne : un OF est une commande interne (TICOD = 'I', PICOD = 2)"
    ],
    exemple: "-- Nombre de commandes par type de tiers\nSELECT TICOD, COUNT(*) AS NbCommandes\nFROM ENT\nWHERE DOS = '998' AND PICOD = 2\nGROUP BY TICOD;",
    piege: "Les tables de pièces sont communes à tous les tiers : sans filtre TICOD, tes commandes clients se mélangent aux commandes fournisseurs et aux OF.",
    motsCles: ["type de tiers", "client", "fournisseur", "prospect", "interne", "vente ou achat", "achat", "vente", "ticod"],
    voirAussi: ["dv-picod", "dv-ent", "dv-mouv", "dv-tiers"],
    sources: [
      { titre: "Achat-vent technique base - Pièces", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/11490099273/Achat-vent+technique+base+-+Pi+ces" },
      { titre: "Industrie", url: "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/12896370759/Industrie" }
    ]
  },
  {
    id: "dv-picod",
    nom: "PICOD",
    type: "champ",
    domaine: "divalto",
    categorie: "Champs Divalto",
    definition: "Le type de pièce : 1 devis, 2 commande, 3 BL, 4 facture, 5 relevé, 6 devis travaux, 7 situation.",
    noms: ["type de pièce"],
    liens: [
      "ENT : un en-tête par étape (devis, commande, BL, facture)",
      "MOUV et MVTL : seul PICOD évolue sur la ligne, selon l'état de la pièce"
    ],
    piege: "Sur MOUV, PICOD est l'étape actuelle de la ligne : une ligne de commande déjà facturée a PICOD = 4. Pour « tout ce qui a été commandé », filtre CE6 = '1' (passée en commande), pas PICOD = 2.",
    motsCles: ["type de piece", "devis", "commande", "bon de livraison", "facture", "etape", "releve", "situation", "picod"],
    voirAussi: ["dv-ticod", "dv-ent", "dv-mouv", "dv-ce4"],
    source: { titre: "Achat-vent technique base - Pièces", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/11490099273/Achat-vent+technique+base+-+Pi+ces" }
  },
  {
    id: "dv-pino",
    nom: "PINO",
    type: "champ",
    domaine: "divalto",
    categorie: "Champs Divalto",
    definition: "Le numéro de pièce ; avec son préfixe PREFPINO, il forme le numéro complet FULLPINO.",
    noms: ["PREFPINO", "FULLPINO", "numéro de pièce", "PIECECONCAT"],
    liens: [
      "ENT.PINO : le numéro de l'en-tête",
      "MOUV n'a pas PINO : DVNO, CDNO, BLNO ou FANO selon l'étape",
      "MVTL.PINO : numéro de la pièce active ; BF.PINO : numéro d'OF"
    ],
    exemple: "SELECT dbo.PIECECONCAT(ENT.PREFPINO, ENT.PINO) AS NumeroComplet\nFROM ENT\nWHERE ENT.DOS = '998' AND ENT.TICOD = 'C' AND ENT.PICOD = 4;",
    piege: "FULLPINO n'est pas une colonne SQL : seuls PREFPINO et PINO sont stockés. Reconstruis le numéro avec la fonction dbo.PIECECONCAT(PREFPINO, PINO).",
    pratique: "Le numéro seul n'est pas unique : un même PINO peut exister en devis, en commande ou chez un fournisseur. Identifie une pièce par DOS, TICOD, PICOD et PINO.",
    motsCles: ["numero de piece", "numero de commande", "numero de facture", "prefixe", "numero complet", "pino", "prefpino", "fullpino", "piececoncat"],
    voirAussi: ["dv-ent", "dv-mouv", "dv-ticod", "dv-picod", "concat"],
    sources: [
      { titre: "Explorateur de champ", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/10936811521/Explorateur+de+champ" },
      { titre: "Les widgets  KPI", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/10516465387/Les+widgets+KPI" },
      { titre: "Achat-vent technique base - Pièces", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/11490099273/Achat-vent+technique+base+-+Pi+ces" }
    ]
  },
  {
    id: "dv-tiers",
    nom: "TIERS",
    type: "champ",
    domaine: "divalto",
    categorie: "Champs Divalto",
    definition: "Le code du tiers (client, fournisseur, prospect…) : il relie les pièces, les stats et la compta.",
    noms: ["code tiers", "TIERSSTAT", "TIERSR3", "TIERSRLV"],
    liens: [
      "Pièces et mouvements : rattachés au tiers TIERS",
      "Statistiques : générées sur TIERSSTAT ; comptabilité : sur le compte CPT",
      "Divalto Règlements : tiers TIERSR3 ; relevés : tiers TIERSRLV"
    ],
    pratique: "Un code tiers est unique dans le dossier, tous types confondus (index A de GTFPCF) : la table à lire (CLI, FOU, PRO…) dépend de TICOD.",
    motsCles: ["code tiers", "tiers", "client", "fournisseur", "code client", "code fournisseur", "tiersstat", "partenaire"],
    voirAussi: ["dv-cli", "dv-fou", "dv-ticod", "dv-tiersgrp"],
    source: { titre: "Achat-vent technique base - Dossiers et tiers", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/11490033695/Achat-vent+technique+base+-+Dossiers+et+tiers" }
  },
  {
    id: "dv-ref",
    nom: "REF",
    type: "champ",
    domaine: "divalto",
    categorie: "Champs Divalto",
    definition: "La référence de l'article, avec ses sous-références SREF1 et SREF2 ; GRREF regroupe les trois.",
    noms: ["SREF1", "SREF2", "GRREF", "référence article"],
    liens: [
      "ART : la fiche (DOS, REF) ; SART : la sous-référence (DOS, REF, SREF1, SREF2)",
      "Référence complète des requêtes Dataviz : REF + ARTIND + SREF1 + SREF2"
    ],
    exemple: "SELECT m.REF\n     + ISNULL('-' + NULLIF(m.ARTIND, ''), '')\n     + ISNULL('-' + NULLIF(m.SREF1, ''), '')\n     + ISNULL('-' + NULLIF(m.SREF2, ''), '') AS RefComplete\nFROM MOUV m\nWHERE m.DOS = '998';",
    piege: "Une sous-référence vide est à espace : NULLIF(SREF1, '') la change en NULL, pour ne pas coller un tiret en trop, comme dans les requêtes Dataviz.",
    motsCles: ["reference article", "reference", "sous-reference", "code article", "ref", "sref1", "grref", "variante", "indice article"],
    voirAussi: ["dv-art", "dv-sart", "nullif", "concat"],
    sources: [
      { titre: "Achat-vent technique base - Articles", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/11490361362/Achat-vent+technique+base+-+Articles" },
      { titre: "Industrie", url: "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/12896370759/Industrie" }
    ]
  },
  {
    id: "dv-ce",
    nom: "CE1 à CEx (champs CE)",
    type: "champ",
    domaine: "divalto",
    categorie: "Champs Divalto",
    definition: "Les champs CE : des codes d'un caractère qui donnent le type d'enregistrement et son état, pour les index.",
    noms: ["CE1", "CE2", "CE3", "CEA", "codes enregistrement"],
    liens: [
      "CE1 : type d'enregistrement (ex. ENT = 'A', MVTL = 'V', MRES = 'A')",
      "Les autres CE : un état ou un indicateur (ex. ENT.CE4 état de la pièce, MVTL.CEA entrée en stock)"
    ],
    exemple: "-- Pièces actives : la condition « PieceActive » de la doc\nSELECT PINO\nFROM ENT\nWHERE DOS = '998' AND CE4 = '1';",
    piege: "Les CE sont du texte : écris ENT.CE4 = '1', pas = 1. Sinon SQL Server fait une conversion implicite et n'utilise plus les index.",
    pratique: "La doc conseille d'écrire les valeurs de CE en dur (MVTL.CEA = '1') plutôt qu'en variable : le plan d'exécution est réutilisé.",
    motsCles: ["ce", "ce1", "code enregistrement", "indicateur", "etat", "champ ce", "condition d'index", "flag", "cea"],
    voirAussi: ["dv-ce4", "dv-ent", "dv-mvtl", "dv-dos"],
    sources: [
      { titre: "Jointures auto résolues et CAST implicites", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/11430658054/Jointures+auto+r+solues+et+CAST+implicites" },
      { titre: "Eviter les paramètres dans les WHERE (CE = VariableCE)", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/11418042389/Eviter+les+param+tres+dans+les+WHERE+CE+VariableCE" },
      { titre: "Achat-vent technique base - Pièces", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/11490099273/Achat-vent+technique+base+-+Pi+ces" }
    ]
  },
  {
    id: "dv-ce4",
    nom: "CE4",
    type: "champ",
    domaine: "divalto",
    categorie: "Champs Divalto",
    definition: "L'état d'une pièce ou d'une ligne : 1 actif, 2 suspendu, 8 périmé, 9 transféré, A archivé…",
    noms: ["état de la pièce", "DVCE4", "CDCE4", "BLCE4", "FACE4", "DOCUMENTSTATUS"],
    liens: [
      "Valeurs : 1 actif, 2 suspendu, 4 modèle (« type » sur les lignes), 6 attente, 7 préparé, 8 périmé, 9 transféré, A archivé",
      "ENT.CE4 : état de l'en-tête (6 = attente)",
      "MOUV : DVCE4, CDCE4, BLCE4, FACE4 = l'état de la ligne à chaque étape",
      "MVTL.CE4 : comme MOUV, plus 6 attente"
    ],
    exemple: "-- Commandes clients actives\nSELECT PINO, PIDT, HTMT\nFROM ENT\nWHERE DOS = '998' AND TICOD = 'C' AND PICOD = 2\n  AND CE4 = '1';",
    piege: "Une commande livrée n'est plus active : la mobilité extrait les commandes « périmées (livrées non facturées) ». CE4 = '1' seul ne montre donc pas tout l'historique.",
    pratique: "Pour une pièce encore « vivante », filtre CE4 = '1' : c'est la condition « PieceActive » de la doc (ENT.Ce4 = '1').",
    motsCles: ["etat de la piece", "piece active", "actif", "perime", "archive", "suspendu", "transfere", "statut piece", "ce4"],
    voirAussi: ["dv-ce", "dv-ent", "dv-picod"],
    sources: [
      { titre: "Achat-vent technique base - Pièces", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/11490099273/Achat-vent+technique+base+-+Pi+ces" },
      { titre: "Mapping des tables échangées", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/221844940/Mapping+des+tables+chang+es" },
      { titre: "Jointures auto résolues et CAST implicites", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/11430658054/Jointures+auto+r+solues+et+CAST+implicites" }
    ]
  },
  {
    id: "dv-enrno",
    nom: "ENRNO",
    type: "champ",
    domaine: "divalto",
    categorie: "Champs Divalto",
    definition: "Le numéro d'enregistrement d'une ligne de pièce : il relie la ligne MOUV à ses ventilations MVTL.",
    noms: ["CDENRNO", "numéro d'enregistrement"],
    liens: [
      "MVTL.ENRNO = MOUV.ENRNO (même DOS)",
      "MOUV.CDENRNO : ENRNO de la ligne de commande d'origine, suivi sur tous les BL partiels"
    ],
    exemple: "SELECT m.CDNO, m.REF, v.DEPO, v.DELDT\nFROM MOUV m\nLEFT JOIN MVTL v ON v.DOS = m.DOS AND v.ENRNO = m.ENRNO\nWHERE m.DOS = '998' AND m.TICOD = 'C' AND m.CE2 = '1';",
    pratique: "Pour comparer une livraison partielle à la commande, regroupe les lignes par CDENRNO : elles viennent toutes de la même ligne de commande.",
    motsCles: ["numero d'enregistrement", "lien ligne ventilation", "ligne d'origine", "livraison partielle", "reliquat", "jointure mouv mvtl", "enrno", "cdenrno"],
    voirAussi: ["dv-mouv", "dv-mvtl", "inner-join"],
    sources: [
      { titre: "Achat-vent technique base - Pièces", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/11490099273/Achat-vent+technique+base+-+Pi+ces" },
      { titre: "Industrie", url: "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/12896370759/Industrie" }
    ]
  },
  {
    id: "dv-sens",
    nom: "SENS",
    type: "champ",
    domaine: "divalto",
    categorie: "Champs Divalto",
    definition: "Le sens d'un mouvement : 1 entrée, 2 sortie en gestion commerciale ; 1 débit, 2 crédit en comptabilité.",
    liens: [
      "MOUV.SENS, MVTL.SENS, T020.SENS : 1 entrée, 2 sortie",
      "C8.SENS, CX.SENS, CP.SENS : 1 débit, 2 crédit"
    ],
    exemple: "-- Entrées prévues (ventilations d'entrée)\nSELECT ENRNO, DELDT\nFROM MVTL\nWHERE DOS = '998' AND SENS = 1;",
    piege: "Le même nom SENS change de sens selon le module : 1 = entrée en stock, mais 1 = débit en comptabilité. Regarde la table avant de filtrer.",
    motsCles: ["sens", "entree", "sortie", "debit", "credit", "sens du mouvement", "entree de stock", "sortie de stock"],
    voirAussi: ["dv-mvtl", "dv-c8", "dv-t020"],
    sources: [
      { titre: "Achat-vent technique base - Pièces", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/11490099273/Achat-vent+technique+base+-+Pi+ces" },
      { titre: "L'import-export dans l'ERP", url: "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/12009078980/L+import-export+dans+l+ERP" }
    ]
  },
  {
    id: "dv-op",
    nom: "OP",
    type: "champ",
    domaine: "divalto",
    categorie: "Champs Divalto",
    definition: "Le code opération d'une pièce ou d'un mouvement : il fixe le sens du stock et le journal comptable.",
    noms: ["code opération"],
    liens: [
      "T020 : la table des codes opération",
      "ENT.OP, MOUV.OP, MVTL.OP, STA.OP, DAR.OP"
    ],
    pratique: "Les requêtes Dataviz Négoce prennent les opérations C (factures de vente) et CPV (factures TPV) : regarde dans T020 les codes de ton dossier avant de filtrer.",
    motsCles: ["code operation", "operation", "type d'operation", "nature de mouvement", "journal", "avoir", "op", "t020"],
    voirAussi: ["dv-t020", "dv-sens", "dv-sta"],
    sources: [
      { titre: "Achat-vent technique base - Tables communes Txxx", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/11490885655/Achat-vent+technique+base+-+Tables+communes+Txxx" },
      { titre: "Négoce", url: "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/12897484806/N+goce" }
    ]
  },
  {
    id: "dv-depo",
    nom: "DEPO",
    type: "champ",
    domaine: "divalto",
    categorie: "Champs Divalto",
    definition: "Le code du dépôt (magasin) d'une pièce, d'une ligne, d'une réservation ou d'un stock.",
    noms: ["dépôt"],
    liens: [
      "T017 : la table des dépôts",
      "ENT.DEPO, MOUV.DEPO, MVTL.DEPO, MRES.DEPO, ARTDEPO.DEPO, RSO.DEPO",
      "[MZ.DEPO] : le dépôt courant dans les widgets KPI"
    ],
    piege: "Dans RSO (réappro) et RFO (conditions fournisseur), DEPO à espace veut dire « tous dépôts » : prévois cette ligne générale dans ta jointure.",
    motsCles: ["depot", "magasin", "entrepot", "code depot", "stock par depot", "multi-depot", "site de stockage", "depo"],
    voirAussi: ["dv-t017", "dv-mvtl", "dv-etb"],
    sources: [
      { titre: "Achat-vent technique base - Tables communes Txxx", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/11490885655/Achat-vent+technique+base+-+Tables+communes+Txxx" },
      { titre: "Achat-vent technique base - Articles", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/11490361362/Achat-vent+technique+base+-+Articles" }
    ]
  },
  {
    id: "dv-etb",
    nom: "ETB",
    type: "champ",
    domaine: "divalto",
    categorie: "Champs Divalto",
    definition: "Le code établissement : un filtre sur les pièces, les mouvements et les statistiques.",
    noms: ["établissement"],
    liens: [
      "ETS : la table des établissements",
      "T017 : chaque dépôt a son établissement",
      "[MZ.ETB] : l'établissement courant"
    ],
    piege: "Sans gestion des établissements, ETB vaut espace partout : ne filtre pas ETB = '01' par habitude.",
    motsCles: ["etablissement", "agence", "site", "filtre etablissement", "multi-etablissement", "code etablissement", "branche", "etb"],
    voirAussi: ["dv-ets", "dv-depo", "dv-dos"],
    source: { titre: "Achat-vent technique base - Dossiers et tiers", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/11490033695/Achat-vent+technique+base+-+Dossiers+et+tiers" }
  },
  {
    id: "dv-nst",
    nom: "NST",
    type: "champ",
    domaine: "divalto",
    categorie: "Champs Divalto",
    definition: "La nature de stock d'une ventilation, d'une réservation ou d'un article par dépôt.",
    noms: ["nature de stock"],
    liens: [
      "MVTL.NST, MRES.NST, ARTDEPO.NST, WMVTL.NST",
      "T025 : table des natures de stock ; T020.NSTO et NSTD : nature d'origine et de destination d'un code opération"
    ],
    pratique: "Les compteurs de la fiche article ne comptent que la nature de stock du dossier : pour une autre nature, lis MVTL filtrée sur NST.",
    motsCles: ["nature de stock", "type de stock", "stock disponible", "nature", "depot", "ventilation", "stock", "nst"],
    voirAussi: ["dv-mvtl", "dv-mres", "dv-art"],
    sources: [
      { titre: "Achat-vent technique base - Pièces", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/11490099273/Achat-vent+technique+base+-+Pi+ces" },
      { titre: "Achat-vent technique base - Articles", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/11490361362/Achat-vent+technique+base+-+Articles" },
      { titre: "Achat-vent technique base - Tables communes Txxx", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/11490885655/Achat-vent+technique+base+-+Tables+communes+Txxx" }
    ]
  },
  {
    id: "dv-ticketres",
    nom: "TICKETRES",
    type: "champ",
    domaine: "divalto",
    categorie: "Champs Divalto",
    definition: "Le numéro de ticket de réservation : il relie une ventilation MVTL à ses réservations MRES.",
    noms: ["TICKETRESS", "TICKETRESE", "ticket de réservation"],
    liens: [
      "Sortie : MRES.TICKETRESS = MVTL.TICKETRES (MVTL.SENS = 2)",
      "Entrée : MRES.TICKETRESE = MVTL.TICKETRES (MVTL.SENS = 1)",
      "GPACBESOIN.TICKETRES : un besoin d'affaire réservé"
    ],
    exemple: "SELECT vout.ENRNO, r.CE2, r.RESQTE, vin.DELDT AS DateEntreePrevue\nFROM MVTL vout\nJOIN MRES r ON r.DOS = vout.DOS AND r.TICKETRESS = vout.TICKETRES\n           AND r.CE1 = 'A'\nLEFT JOIN MVTL vin ON vin.DOS = r.DOS AND vin.TICKETRES = r.TICKETRESE\n                  AND vin.SENS = 1\nWHERE vout.DOS = '998' AND vout.SENS = 2\n  AND ISNULL(vout.TICKETRES, 0) <> 0;",
    piege: "Un ticket à 0 veut dire « pas de réservation » : les requêtes Dataviz testent ISNULL(TICKETRES, 0) <> 0 avant de joindre, sinon les lignes sans réservation se relient entre elles.",
    motsCles: ["ticket de reservation", "reservation", "lien reservation", "couverture", "affectation", "ticketres", "ticketress", "ticketrese"],
    voirAussi: ["dv-mres", "dv-mvtl", "dv-rq-analyse-commande-client"],
    sources: [
      { titre: "Achat-vent technique base - Pièces", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/11490099273/Achat-vent+technique+base+-+Pi+ces" },
      { titre: "Industrie", url: "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/12896370759/Industrie" }
    ]
  },
  {
    id: "dv-deldt",
    nom: "DELDT",
    type: "champ",
    domaine: "divalto",
    categorie: "Champs Divalto",
    definition: "Le délai de livraison actif d'une ventilation : le délai reporté, sinon accepté, sinon demandé.",
    noms: ["DELDEMDT", "DELACCDT", "DELREPDT", "délai de livraison"],
    liens: [
      "MVTL : DELDT, DELDEMDT, DELACCDT, DELREPDT",
      "ENT : DELDEMDT, DELACCDT, DELREPDT ; GPACBESOIN.DELDT : date de besoin"
    ],
    exemple: "SELECT ENRNO, DELDEMDT, DELACCDT, DELREPDT, DELDT\nFROM MVTL\nWHERE DOS = '998' AND TICOD = 'F' AND SENS = 1;",
    piege: "En pièces clients, le délai retire le nombre de jours de transport : ne le compare pas tel quel à la date demandée par le client.",
    pratique: "Les requêtes Dataviz lisent MVTL.DELDT comme date de besoin (ventilation de sortie) et comme date d'entrée prévue (ventilation d'entrée).",
    motsCles: ["delai de livraison", "date de livraison", "date prevue", "delai demande", "delai accepte", "delai reporte", "date de besoin", "retard", "deldt"],
    voirAussi: ["dv-mvtl", "dv-ent", "dv-rq-commandes-achat-relancer"],
    sources: [
      { titre: "Achat-vent technique base - Pièces", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/11490099273/Achat-vent+technique+base+-+Pi+ces" },
      { titre: "Industrie", url: "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/12896370759/Industrie" }
    ]
  },
  {
    id: "dv-cle",
    nom: "CLE_xxx (clés des vues)",
    type: "champ",
    domaine: "divalto",
    categorie: "Champs Divalto",
    definition: "Les champs CLE_ des vues SQL : des clés prêtes pour relier les vues entre elles, dans Power BI.",
    noms: ["CLE_ARTICLE", "CLE_DOSSIER", "CLE_FOURNISSEUR", "CLE_OF_ENTETE", "CLECONCAT"],
    liens: [
      "Clé primaire : CLE_ARTICLE dans ARTICLE_V",
      "Clé étrangère : CLE_ARTICLE dans FACTURE_VENTE_MOUV_V et COMMANDE_VENTE_MOUV_V",
      "dbo.CLECONCAT : fonction qui construit une clé avec jusqu'à 7 champs (NULL pour les inutiles)"
    ],
    exemple: "IF OBJECT_ID('ARTICLE_VU', 'V') IS NOT NULL DROP VIEW ARTICLE_VU\nGO\nCREATE VIEW ARTICLE_VU AS\nSELECT *,\n  dbo.CLECONCAT(ARTICLE_V.DOSSIER, ARTICLE_V.FOURHABITUEL, null, null, null, null, null) AS CLE_FOURNISSEUR\nFROM ARTICLE_V",
    piege: "Une clé CLE_ colle le dossier et le code (ex. « 998 @PF000091 ») : compare-la à une autre clé CLE_, jamais à une référence seule.",
    pratique: "Dans Power BI, fais tes relations sur les champs CLE_ : la doc les a créés pour ça, et c'est la relation unique entre deux vues.",
    motsCles: ["cle", "cles", "relation", "power bi", "cle article", "cleconcat", "jointure entre vues", "cle etrangere", "cle primaire"],
    voirAussi: ["dv-vues-sql", "dv-article-v", "dv-id", "primary-key", "foreign-key"],
    sources: [
      { titre: "Comment ajouter un champ CLE a une vue avec règle nommage CLE", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/10516466354/Comment+ajouter+un+champ+CLE+a+une+vue+avec+r+gle+nommage+CLE" },
      { titre: "Microsoft Power BI", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/10516467268/Microsoft+Power+BI" }
    ]
  },
  {
    id: "dv-id",
    nom: "xx_ID (identifiants techniques)",
    type: "champ",
    domaine: "divalto",
    categorie: "Champs Divalto",
    definition: "Le champ xx_ID d'une table (ART_ID, ENT_ID…) : le champ primaire de la ligne, pour les liens techniques.",
    noms: ["ART_ID", "ENT_ID", "MOUV_ID", "MRES_ID", "BF_ID", "CLI_ID", "SART_ID"],
    liens: [
      "Vue de vue : ARTICLE_V.ART_ID = ART.ART_ID",
      "Mobilité : ExternalID = ENT.ENT_ID, MOUV.MOUV_ID, CLI.CLI_ID",
      "Dataviz : le paramètre {{id?…}} reçoit l'ENT_ID de la commande ouverte"
    ],
    exemple: "SELECT e.PINO, e.PIDT\nFROM ENT e\nWHERE e.ENT_ID = 12363;   -- 12363 : valeur d'exemple de la doc (Dataviz)",
    pratique: "La clé métier d'une table reste ses champs clés (DOS et REF pour ART, dit l'explorateur de champ) ; xx_ID sert aux liens techniques : vues, mobilité, Dataviz.",
    motsCles: ["identifiant", "id", "cle primaire", "identifiant technique", "external id", "lien technique", "ent_id", "art_id", "xx_id"],
    voirAussi: ["dv-vues-sql", "dv-cle", "primary-key", "identity"],
    sources: [
      { titre: "Surcharge ou modification de vue", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/10516466340/Surcharge+ou+modification+de+vue" },
      { titre: "Mapping des tables échangées", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/221844940/Mapping+des+tables+chang+es" },
      { titre: "Industrie", url: "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/12896370759/Industrie" }
    ]
  },
  {
    id: "dv-user-trace",
    nom: "USERCR / USERMO (traçabilité)",
    type: "champ",
    domaine: "divalto",
    categorie: "Champs Divalto",
    definition: "Les champs de traçabilité : qui a créé ou modifié la ligne, et quand.",
    noms: ["USERCR", "USERMO", "USERCRDH", "USERMODH", "USERTRACE"],
    liens: [
      "Dans presque toutes les tables (ENT, MOUV, MVTL, CLI, ART…)",
      "MUSER.USER : le login de l'utilisateur"
    ],
    exemple: "SELECT PINO, USERCR, USERCRDH, USERMO, USERMODH\nFROM ENT\nWHERE DOS = '998' AND TICOD = 'C' AND PICOD = 2\nORDER BY USERMODH DESC;",
    pratique: "Pour savoir qui a modifié une pièce en dernier, lis ENT.USERMO et USERMODH ; la création est dans USERCR et USERCRDH.",
    motsCles: ["qui a cree", "qui a modifie", "date de creation", "date de modification", "tracabilite", "auteur", "historique", "usercr", "usermo"],
    voirAussi: ["dv-muser", "dv-ent", "dv-mtrctrace"],
    source: { titre: "Achat-vent technique base - Pièces", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/11490099273/Achat-vent+technique+base+-+Pi+ces" }
  },
  {
    id: "dv-hsdt",
    nom: "HSDT",
    type: "champ",
    domaine: "divalto",
    categorie: "Champs Divalto",
    definition: "La date de fin de validité d'une fiche : client, fournisseur, adresse, article ou tarif.",
    noms: ["date de fin de validité", "date de péremption"],
    liens: [
      "CLI, FOU, PRO, T1, T2, T3, ART, TAR, TFO : champ HSDT (« date de péremption » sur T1, T2, T3)"
    ],
    exemple: "-- Clients encore valides\nSELECT TIERS, NOM\nFROM CLI\nWHERE DOS = '998'\n  AND (HSDT IS NULL OR HSDT > GETDATE());",
    piege: "Oublier HSDT dans un export de clients ou de tarifs ressort aussi les fiches dont la validité est finie.",
    motsCles: ["fin de validite", "date de fermeture", "client ferme", "article ferme", "inactif", "peremption", "obsolete", "hsdt"],
    voirAussi: ["dv-cli", "dv-art", "dv-tar", "is-null"],
    sources: [
      { titre: "Achat-vent technique base - Dossiers et tiers", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/11490033695/Achat-vent+technique+base+-+Dossiers+et+tiers" },
      { titre: "Achat-vent technique base - Articles", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/11490361362/Achat-vent+technique+base+-+Articles" },
      { titre: "Achat-vent technique base - Tarifs", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/11490000922/Achat-vent+technique+base+-+Tarifs" }
    ]
  },
  {
    id: "dv-champ-tableau",
    nom: "NOM_0001 (champs tableau)",
    type: "champ",
    domaine: "divalto",
    categorie: "Champs Divalto",
    definition: "Un champ tableau du dictionnaire devient une colonne SQL par case : NOM_0001, NOM_0002…",
    noms: ["tableau indicé", "TABTYP_0036", "DIM_0001"],
    liens: [
      "Exemples de la doc : Dim(1) → DIM_0001 ; T000.TabTyp(36) → TABTYP_0036",
      "Tableaux fréquents : représentants (3), familles statistiques (3), axes analytiques (4)"
    ],
    exemple: "SELECT T000.TABTYP_0036 AS NaturesCommunes\nFROM T000\nWHERE T000.DOS = '999';",
    piege: "Certains champs ne sont pas visibles en SQL (ex. SOC.ENTCODN, rangé dans ZONEPARAM depuis la X.10) : regarde « Champ visible SQL » dans l'explorateur de champ.",
    pratique: "Dans un zoom, Ctrl + D ouvre l'explorateur de champ : nom SQL, libellé, valeurs possibles, champ clé et « visible SQL » de chaque champ.",
    motsCles: ["tableau", "champ tableau", "indice", "colonne", "dimension", "explorateur de champ", "nom sql", "ctrl d", "0001"],
    voirAussi: ["dv-t000", "dv-soc", "dv-oui-non"],
    sources: [
      { titre: "Explorateur de champ", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/10936811521/Explorateur+de+champ" },
      { titre: "Les widgets  KPI", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/10516465387/Les+widgets+KPI" },
      { titre: "x10 migration", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/10826121217/x10+migration" }
    ]
  },
  {
    id: "dv-oui-non",
    nom: "Codes 1 / 2 (non / oui)",
    type: "champ",
    domaine: "divalto",
    categorie: "Champs Divalto",
    definition: "Dans Divalto, un oui / non est souvent stocké en nombre : 1 = non, 2 = oui.",
    noms: ["booléen", "case à cocher"],
    liens: [
      "Exemples : ENT.PIRELCOD (pièce en reliquat), ENT.TRCOD (traite éditée), TAR.PAFORF (prix forfaitaire), SOC.RELCOD"
    ],
    exemple: "-- Commandes clients en reliquat\nSELECT PINO, PIRELCOD\nFROM ENT\nWHERE DOS = '998' AND TICOD = 'C' AND PICOD = 2\n  AND PIRELCOD = 2;",
    piege: "WHERE champ = 1 ne veut pas dire « oui » : en général 1 = non et 2 = oui, dit la doc. Vérifie les valeurs du champ dans l'explorateur de champ.",
    motsCles: ["oui non", "booleen", "case a cocher", "vrai faux", "flag", "indicateur", "valeur 2", "1 2"],
    voirAussi: ["dv-champ-tableau", "dv-ce", "type-booleen"],
    sources: [
      { titre: "Explorateur de champ", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/10936811521/Explorateur+de+champ" },
      { titre: "Achat-vent technique base - Pièces", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/11490099273/Achat-vent+technique+base+-+Pi+ces" }
    ]
  },
  {
    id: "dv-axe",
    nom: "AXETB / AXE (axes analytiques)",
    type: "champ",
    domaine: "divalto",
    categorie: "Champs Divalto",
    definition: "Les 4 axes analytiques d'une pièce, d'une ligne de pièce ou d'une écriture comptable.",
    noms: ["AXETB", "AXE", "axes analytiques"],
    liens: [
      "ENT.AXETB et MOUV.AXETB : les 4 axes de la pièce et de la ligne",
      "C8.AXE et CX.AXE (1 à 4) en comptabilité",
      "C5 : les axes (code, libellé, numéro d'axe)"
    ],
    pratique: "En SQL, l'axe n est une colonne de tableau (NOM_000n) : vérifie le nom exact avec l'explorateur de champ avant de grouper par axe.",
    motsCles: ["axe", "axes", "analytique", "axe analytique", "centre de cout", "section", "ventilation", "axetb"],
    voirAussi: ["dv-cx", "dv-c5", "dv-champ-tableau"],
    sources: [
      { titre: "Achat-vent technique base - Pièces", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/11490099273/Achat-vent+technique+base+-+Pi+ces" },
      { titre: "L'import-export dans l'ERP", url: "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/12009078980/L+import-export+dans+l+ERP" },
      { titre: "Explorateur de champ", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/10936811521/Explorateur+de+champ" }
    ]
  },
  {
    id: "dv-tiersgrp",
    nom: "TIERSGRP",
    type: "champ",
    domaine: "divalto",
    categorie: "Champs Divalto",
    definition: "Le code centrale (groupement) d'un tiers : il regroupe plusieurs clients ou fournisseurs.",
    noms: ["centrale", "code centrale", "groupement"],
    liens: [
      "CLI.TIERSGRP, FOU.TIERSGRP, ENT.TIERSGRP, STA.TIERSGRP, C8.TIERSGRP",
      "CLI.CE3 et FOU.CE3 = 1 quand TIERSGRP est renseigné"
    ],
    pratique: "Pour un CA par centrale, groupe STA par TIERSGRP ; en comptabilité, l'extrait de compte par centrale cherche aussi sur le TiersGrp de l'écriture (C8).",
    motsCles: ["centrale", "centrale d'achat", "groupement", "enseigne", "groupe client", "ca par centrale", "tiers", "tiersgrp"],
    voirAussi: ["dv-cli", "dv-sta", "dv-c8"],
    sources: [
      { titre: "Achat-vent technique base - Dossiers et tiers", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/11490033695/Achat-vent+technique+base+-+Dossiers+et+tiers" },
      { titre: "Les interrogations et les éditions", url: "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/12208046081/Les+interrogations+et+les+ditions" }
    ]
  },
  {
    id: "dv-joint",
    nom: "JOINT / CEJOINT",
    type: "champ",
    domaine: "divalto",
    categorie: "Champs Divalto",
    definition: "Le numéro des fichiers joints d'une fiche ou d'une pièce ; CEJOINT = 2 s'il y en a.",
    noms: ["CEJOINT", "fichiers joints"],
    liens: [
      "ENT, CLI, FOU, ART, PRJAP, CEACONTRAT… : champs JOINT et CEJOINT",
      "MJOINT : la table des fichiers joints (MJOINT.JOINT)"
    ],
    exemple: "SELECT e.PINO, j.LIB80, j.FICC\nFROM ENT e\nJOIN MJOINT j ON j.JOINT = e.JOINT\nWHERE e.DOS = '998' AND e.CEJOINT = 2;",
    piege: "Un même numéro JOINT regroupe plusieurs fichiers : la jointure renvoie une ligne par fichier, donc plusieurs lignes par pièce.",
    motsCles: ["fichiers joints", "piece jointe", "document joint", "pdf", "attachement", "joint", "cejoint", "ged"],
    voirAussi: ["dv-mjoint", "dv-ent"],
    sources: [
      { titre: "Achat-vent technique base - Pièces", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/11490099273/Achat-vent+technique+base+-+Pi+ces" },
      { titre: "Mapping des tables échangées", url: "https://divalto.atlassian.net/wiki/spaces/PAI/pages/221844940/Mapping+des+tables+chang+es" }
    ]
  }
]);
