// Chef de projet SI — Fiche de cours du module cp04 « Cadrer un projet ».
// Fond : pratiques reconnues (PMBOK : charte de projet ; PRINCE2 : mandat et Project Brief ; agile : vision produit),
// adaptées au terrain PME / ETI. Fil rouge : DEMAT 2027 (docs/plan-chef-de-projet.md).
LEARNSQL.cours.cp04 = {
  intro: "Un projet mal cadré dérape presque toujours : chacun a sa propre idée du résultat. La note de cadrage met tout le monde d'accord AVANT de dépenser, et te sert ensuite de base pour dire non.",
  sections: [
    {
      titre: "Pourquoi cadrer : partir de ton vécu",
      exemple: "Pense à ton projet de dématérialisation fiscale ou à une migration Divalto.\n- Au départ, tout le monde savait-il ce qui était inclus… et ce qui ne l'était pas ?\n- Quelqu'un a-t-il dit en cours de route : « Ah, je pensais que ça comprenait aussi… » ?\n\nDEMAT 2027 : le DAF dit « on passe à la facture électronique ». La cheffe comptable comprend « factures fournisseurs ». Le commercial comprend « factures clients ». L'intégrateur Divalto comprend « un connecteur ». Trois projets différents dans une seule phrase.",
      points: [
        "Cadrer = écrire, en 2 à 5 pages, ce que le projet doit produire, pour qui, avec quels moyens et quelles limites.",
        "Le document s'appelle note de cadrage. PMBOK parle de charte de projet, PRINCE2 de Project Brief : l'idée est la même.",
        "Le cadrage se fait AVANT de lancer les travaux et les commandes. Après, chaque désaccord coûte de l'argent.",
        "Plus tard, la note sert de référence : une demande hors du cadre devient une demande de changement, pas un « petit plus »."
      ],
      retenir: "Une note de cadrage transforme des attentes floues en un accord écrit, avant de dépenser."
    },
    {
      titre: "Objectif et enjeux : le besoin, pas la solution",
      exemple: "Version 1 : « Installer la plateforme X et le connecteur Divalto. »\nVersion 2 : « Émettre et recevoir toutes nos factures au format électronique via une plateforme agréée, avant l'échéance légale de septembre 2027, sans retarder la clôture mensuelle. »\n\nLa version 1 décrit une solution. La version 2 décrit le résultat attendu. Avec la version 2, tu peux encore comparer plusieurs plateformes.",
      points: [
        "L'objectif dit QUOI obtenir et POURQUOI. Il ne dit pas avec quel outil.",
        "Les enjeux disent ce qu'on risque si on ne fait rien : amende, client perdu, surcharge en compta, image.",
        "Si l'objectif nomme déjà un logiciel, demande : « Quel problème ce logiciel doit-il régler ? »",
        "Un bon objectif tient en une ou deux phrases, compréhensibles par le DAF comme par la comptabilité."
      ],
      retenir: "Objectif = résultat attendu et sa raison. La solution vient après."
    },
    {
      titre: "Périmètre, hors périmètre et livrables",
      exemple: "DEMAT 2027, périmètre :\n- factures clients et fournisseurs France, des 3 sites ;\n- connexion Divalto ↔ plateforme agréée ;\n- reprise des flux EDI factures de la grande distribution (dont AquaBleu) ;\n- formation de la comptabilité.\n\nHors périmètre :\n- notes de frais ;\n- refonte du plan comptable ;\n- factures export hors UE.\n\nLivrables : plateforme choisie et contractée, connecteur recetté, procédures comptables, utilisateurs formés.",
      points: [
        "Périmètre = ce que le projet livre : sites, flux, processus, utilisateurs, données.",
        "Hors périmètre = ce que le projet NE fait PAS, écrit noir sur blanc. C'est la partie qu'on oublie le plus.",
        "Ce qui n'est pas écrit sera supposé inclus par quelqu'un. Le flou se paie en fin de projet.",
        "Livrables = les choses concrètes que l'on peut remettre et vérifier (un contrat, un connecteur recetté, une procédure).",
        "Un point encore incertain peut être noté « à décider avant le jalon X », avec un responsable."
      ],
      retenir: "Ce qui n'est pas écrit hors périmètre finira par être demandé."
    },
    {
      titre: "Critères de succès, contraintes et hypothèses",
      exemple: "Mauvais critère : « Les utilisateurs sont satisfaits. »\nBons critères DEMAT 2027 :\n- 100 % des factures clients France émises via la plateforme au 1er septembre 2027 ;\n- moins de 2 % de factures rejetées le premier mois ;\n- clôture mensuelle toujours faite en 5 jours ouvrés.\n\nContrainte : date légale non négociable.\nHypothèse : « L'intégrateur Divalto livre le connecteur standard en version 10.13. »",
      points: [
        "Un critère de succès se mesure : un chiffre, une date, un seuil. On peut dire « atteint » ou « pas atteint ».",
        "On fixe le critère ET la façon de le mesurer (quel rapport, quelle source, qui mesure).",
        "Contrainte = imposée et non négociable : date légale, budget plafonné, ressource indisponible l'été.",
        "Hypothèse = ce que l'on suppose vrai sans preuve. Si elle tombe, le plan change : on la note et on la vérifie vite.",
        "Une hypothèse non vérifiée est souvent un risque caché."
      ],
      retenir: "Succès mesurable, contraintes imposées, hypothèses à vérifier : trois choses différentes."
    },
    {
      titre: "Parties prenantes, risques, jalons, budget, gouvernance",
      exemple: "DEMAT 2027 :\n- Sponsor : le DAF. Il décide et arbitre.\n- Parties prenantes : cheffe comptable, commerciaux, intégrateur, plateforme, DSI, clients EDI.\n- Premiers risques : plateforme en retard, clients EDI pas prêts, compta saturée en période de clôture.\n- Jalons : choix de la plateforme, connecteur recetté, pilote sur 1 site, bascule générale.\n- Budget macro : une fourchette (ex. 60 à 90 k€) et sa marge d'incertitude.\n- Gouvernance : comité de pilotage mensuel avec le DAF, point projet hebdomadaire.",
      points: [
        "Parties prenantes : qui est touché, qui décide, qui doit être consulté ou informé. Le détail (RACI) vient au module cp09.",
        "Premiers risques : les 3 à 5 plus gros, avec une première idée de parade. L'analyse complète vient au module cp07.",
        "Jalons et budget restent macro au cadrage : des dates clés et une fourchette, pas un planning détaillé.",
        "Gouvernance : qui décide quoi, et dans quelle instance (comité de pilotage, point projet).",
        "Un budget annoncé sans marge d'incertitude devient vite une promesse impossible à tenir."
      ],
      retenir: "Au cadrage, on donne des ordres de grandeur et on nomme qui décide."
    },
    {
      titre: "La validation par le sponsor, et les pièges",
      exemple: "Trois mois après le lancement, le commercial demande d'ajouter les bons de livraison dématérialisés.\nTu ouvres la note de cadrage validée par le DAF : « BL hors périmètre ».\nTu réponds : « Ce n'est pas prévu. Je chiffre l'impact et je le présente au DAF au prochain comité. »\nSans note signée, c'est ta parole contre la sienne.",
      points: [
        "Le sponsor (ici le DAF) valide la note par écrit. Sans cette validation, le projet n'a pas de mandat.",
        "Piège 1 : cadrer trop vite, sans interroger les métiers. Piège 2 : écrire une solution à la place d'un objectif.",
        "Piège 3 : des critères non mesurables (« améliorer », « faciliter »). Piège 4 : oublier le hors périmètre.",
        "Piège 5 : un sponsor absent, qui signe sans lire ou n'arbitre jamais. Il faut le faire réagir sur les points clés.",
        "La note peut évoluer, mais seulement par une décision tracée, pas par glissement."
      ],
      retenir: "Note validée par le sponsor = ta base pour dire non, ou pour dire « oui, mais voici l'impact »."
    }
  ]
};
