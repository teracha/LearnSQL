// Chef de projet SI — Fiche de cours du module cp04 « Cadrer un projet ».
// Fond : pratiques reconnues (PMBOK : charte de projet ; PRINCE2 : mandat, Project Brief et tolérances ; agile : vision produit),
// adaptées au terrain PME / ETI. Fil rouge : DEMAT 2027 (docs/plan-chef-de-projet.md, fiche fil rouge).
// Réglementaire (vérifié fin octobre 2026) : réception des factures électroniques obligatoire pour toutes les entreprises
// depuis le 1er septembre 2026 ; émission obligatoire pour les PME au 1er septembre 2027 ; via une plateforme agréée (PA, ex-PDP).
// Facture électronique = factures entre entreprises (B2B) en France ; ventes aux particuliers (B2C), opérations avec
// l'étranger (UE et hors UE) et données de paiement = e-reporting, obligatoire aussi pour les PME au 1er septembre 2027.
// Décision par défaut : alignée sur cp16 (seulement si elle reste dans ton projet ; sinon, enjeu fort : prévenir le sponsor, puis le DG).
LEARNSQL.cours.cp04 = {
  intro: "Un projet mal cadré dérape presque toujours, car chacun a sa propre idée du résultat. La note de cadrage met tout le monde d'accord AVANT de dépenser, et te sert ensuite pour dire non.",
  sections: [
    {
      titre: "Pourquoi cadrer : partir de ton vécu",
      exemple: "Ta démat fiscale ou ta migration Divalto : quelqu'un a-t-il dit « Ah, je pensais que c'était inclus » ?\nDEMAT 2027 : le DAF (directeur administratif et financier) dit « on passe à la facture électronique ».\nLa cheffe comptable comprend « factures fournisseurs ». Le commercial, « factures clients ».\nL'intégrateur Divalto comprend « un connecteur ».\nTrois projets différents dans une seule phrase.",
      points: [
        "Cadrer = écrire, en 2 à 5 pages, ce que le projet doit produire, pour qui, avec quels moyens et quelles limites. Ce document s'appelle la note de cadrage.",
        "Autres noms : charte de projet (PMBOK, le guide américain), Project Brief (PRINCE2, la méthode britannique). En agile : vision produit, avec un budget et des limites. Même idée.",
        "Note de cadrage = QUOI et POURQUOI. Cahier des charges = le détail des besoins, pour consulter des prestataires. Spécifications = COMMENT, écran par écran.",
        "On cadre AVANT de lancer les travaux et les commandes. Un prestataire démarre sans note validée ni commande ? Tu fais arrêter, et tu informes le sponsor le jour même.",
        "Plus tard, une demande hors cadre devient une demande de changement : impact chiffré, puis décision du sponsor. Sans lien avec l'objectif ? Autre projet. Contraire à la loi ? Non, sans chiffrer."
      ],
      retenir: "Une note de cadrage transforme des attentes floues en un accord écrit, avant de dépenser."
    },
    {
      titre: "Objectif et enjeux : le besoin, pas la solution",
      exemple: "Rappel : recevoir des factures électroniques est obligatoire pour toutes les entreprises depuis le 1er septembre 2026.\nLes émettre devient obligatoire pour une PME comme le négociant au 1er septembre 2027.\nVersion 1 : « Installer la plateforme X et le connecteur Divalto. »\nVersion 2 : « Recevoir et émettre nos factures entre entreprises en électronique, via une plateforme agréée (PA),\npour respecter la loi : émission avant septembre 2027, sans retarder la clôture mensuelle. »\nLa version 1 décrit une solution. La version 2 décrit le résultat attendu, et laisse comparer plusieurs plateformes.",
      points: [
        "L'objectif dit QUOI obtenir et POURQUOI. Il ne dit pas avec quel outil.",
        "Les enjeux disent ce qu'on risque si on ne fait rien : amende, client perdu, surcharge en compta, image.",
        "L'objectif nomme déjà un logiciel ? À dire : « Quel problème ce logiciel doit-il régler ? »",
        "Un bon objectif tient en une ou deux phrases.",
        "Le DAF comme la comptabilité doivent le comprendre."
      ],
      retenir: "L'objectif dit le résultat attendu et sa raison, jamais la solution."
    },
    {
      titre: "Périmètre, hors périmètre et livrables",
      exemple: "Périmètre : factures entre entreprises (B2B) en France, clients et fournisseurs, des 3 sites.\nAussi : le connecteur standard de la PA, que l'intégrateur installe et paramètre dans Divalto.\nAussi : flux EDI (échange de données informatisé) des factures de la grande distribution (dont AquaBleu), formation compta.\nHors périmètre : notes de frais, refonte du plan comptable, bons de livraison dématérialisés.\nHors périmètre du projet, mais obligatoire en septembre 2027 : le e-reporting\n(ventes aux particuliers, opérations avec l'étranger). Porteur : le DAF, hors projet DEMAT.\nVérifie que la PA choisie sait aussi le faire : c'est un critère de choix.\nLivrables : PA choisie et contractée, connecteur recetté (recette = tests de validation par le métier), procédures comptables, utilisateurs formés.",
      points: [
        "Périmètre = ce que le projet livre : sites, flux, processus, utilisateurs, données.",
        "Hors périmètre = ce que le projet NE fait PAS, écrit noir sur blanc. C'est la partie qu'on oublie le plus.",
        "Ce qui n'est pas écrit sera supposé inclus par quelqu'un. Le flou se paie en fin de projet.",
        "Livrable = une chose concrète que l'on remet et que l'on vérifie : un contrat, un connecteur recetté, une procédure.",
        "Un point incertain, ou porté ailleurs ? À dire : « Qui le décide, ou qui le porte, et pour quand ? »"
      ],
      retenir: "Ce qui n'est pas écrit hors périmètre finira par être demandé."
    },
    {
      titre: "Critères de succès, contraintes et hypothèses",
      exemple: "Le DAF dit : « Le succès, c'est d'être dans les temps. » C'est utile, mais pas suffisant.\nDélai : 100 % des factures aux clients professionnels en France émises via la PA au 1er septembre 2027.\nQualité : moins de 2 % de factures rejetées le 1er mois, et clôture mensuelle toujours en 5 jours ouvrés.\nAdoption : au 3e mois, plus aucune facture fournisseur ressaisie à la main.\nContrainte : la date légale. Hypothèse : « Le connecteur standard de la PA marche avec Divalto 10.13. »",
      points: [
        "Critère de succès = un chiffre, une date ou un seuil. Pour chacun, écris comment le mesurer : quel rapport, qui mesure.",
        "Couvre le délai, mais aussi la qualité (taux de rejet) et l'adoption (les gens utilisent vraiment l'outil). Un projet peut être à l'heure et raté.",
        "Contrainte = imposée et non négociable : date légale, budget plafonné, ressource absente l'été.",
        "Date imposée ? Construis le planning à rebours : on part de la date, et on remonte jalon par jalon.",
        "Hypothèse = ce qu'on suppose vrai sans preuve. Non vérifiée, c'est un risque caché : vérifie-la vite. Impossible à vérifier ? Écris-la aussi en risque (module cp07)."
      ],
      retenir: "Le succès se mesure (délai, qualité, adoption), la contrainte s'impose, l'hypothèse se vérifie."
    },
    {
      titre: "Parties prenantes et premiers risques",
      exemple: "Sponsor : le DAF. Il décide et arbitre.\nParties prenantes : cheffe comptable, ADV (administration des ventes), commerciaux, intégrateur, PA, DSI (directeur des systèmes d'information), clients EDI.\nLe commercial dit : « Moi je veux juste que ça marche. » Tu lui demandes 15 minutes :\n« Quels sont les 3 cas qui ne doivent jamais casser ? » Tu traduis ses réponses en critères.\nRisques : PA en retard, clients EDI pas prêts, compta saturée en clôture.",
      points: [
        "Parties prenantes : qui est touché, qui décide, qui est consulté ou informé. Le détail vient au module cp09 : le RACI (Réalise, Approuve, Consulté, Informé).",
        "Voir les métiers AVANT de faire valider. Une note écrite seul, sans la compta ni les ventes, fait découvrir les besoins en recette.",
        "Un métier refuse de participer ? Demande-lui peu, sur son terrain. À dire : « Quels sont les 3 cas qui ne doivent jamais casser ? »",
        "C'est le client (la maîtrise d'ouvrage, ici le DAF et les métiers) qui porte la note. L'intégrateur donne un avis technique, il ne fixe pas le périmètre.",
        "Premiers risques : les 3 à 5 plus gros, avec une idée de parade. L'analyse complète vient au module cp07."
      ],
      retenir: "Le client porte la note, les métiers y sont entendus, même ceux qui ne veulent pas venir."
    },
    {
      titre: "Jalons, budget, tolérances et gouvernance",
      exemple: "Réception : déjà obligatoire depuis le 1er septembre 2026.\n1er jalon : PA choisie et réception active au plus vite.\nÉmission : obligatoire au 1er septembre 2027. À rebours : bascule en juin 2027, pilote sur 1 site au printemps, connecteur recetté avant.\nPas de bascule en août : congés, aucune marge. Juillet-août reste la marge avant le 1er septembre.\nBudget : 60 à 90 k€, avec sa marge. Tolérances : ± 2 semaines par jalon, et le budget dans sa fourchette.\nGouvernance : COPIL (comité de pilotage) mensuel avec le DAF, point projet chaque semaine.",
      points: [
        "Jalons et budget restent macro : des dates clés, et une fourchette avec sa marge. Pas de planning détaillé.",
        "Une obligation déjà en vigueur passe en premier. Garde une marge avant chaque date légale.",
        "On te demande un chiffre plus bas « pour rassurer » ? Refuse : un budget faux devient ta promesse. Propose plutôt un périmètre réduit.",
        "Gouvernance : qui décide quoi, dans quelle réunion. Et qui peut décider d'un avenant à la note.",
        "Tolérance (mot de PRINCE2) = l'écart que tu gères sans redemander. Dedans : tu ajustes, et tu le dis au COPIL. Au-delà : le sponsor décide, prévenu le jour même."
      ],
      retenir: "Au cadrage : des ordres de grandeur, qui décide, et jusqu'où tu gères seul."
    },
    {
      titre: "La validation par le sponsor, et les pièges",
      exemple: "Le DAF répond « OK, vas-y » en 2 minutes. Il n'a pas lu.\nTu demandes 20 minutes pour 3 points clés, avec des options et ta recommandation.\nIl annule ensuite les comités, et le choix de la PA attend ? Tu lui demandes 15 minutes et une réponse avant le 15.\nLe 15, rien, et la réception légale reste bloquée : tu le préviens, puis tu demandes au DG de trancher.\nLe modèle du rapport mensuel, lui, reste dans ton projet : « Sans remarque au 10, je garde celui-ci. »\nTrois mois plus tard, le commercial veut les bons de livraison dématérialisés, « hors périmètre » : tu chiffres l'impact pour le DAF.",
      points: [
        "Le sponsor (ici le DAF) valide la note par écrit. Sans elle, pas de mandat. Absent, ou il signe sans lire ? Demande-lui 15 à 20 minutes, avec des options et une date limite.",
        "Sans réponse : décision par défaut, seulement pour un détail de ton projet. Jamais pour le périmètre, le budget, un contrat ou le temps d'un autre service. Enjeu fort ? Préviens-le, puis va au DG.",
        "La note peut évoluer (un client pas prêt, une nouvelle demande), mais par un avenant ou une décision tracée du sponsor (module cp10). Jamais par glissement.",
        "Projet déjà lancé sans note ? Il n'est pas trop tard : écris un cadrage de reprise (l'existant, la suite, les limites) et fais-le valider.",
        "Pièges : cadrer seul et trop vite, écrire une solution, des critères pas mesurables (« améliorer »), oublier le hors périmètre."
      ],
      retenir: "La note validée par le sponsor te permet de dire non, ou « oui, mais voici l'impact »."
    }
  ]
};
