// Chef de projet SI — Fiche de cours du module cp04 « Cadrer un projet ».
// Fond : pratiques reconnues (PMBOK : charte de projet ; PRINCE2 : mandat et Project Brief ; agile : vision produit),
// adaptées au terrain PME / ETI. Fil rouge : DEMAT 2027 (docs/plan-chef-de-projet.md).
// Réglementaire (vérifié fin octobre 2026) : réception des factures électroniques obligatoire pour toutes les entreprises
// depuis le 1er septembre 2026 ; émission obligatoire pour les PME au 1er septembre 2027 ; via une plateforme agréée (PA, ex-PDP).
// Facture électronique = factures entre entreprises (B2B) en France ; ventes aux particuliers = e-reporting.
LEARNSQL.cours.cp04 = {
  intro: "Un projet mal cadré dérape presque toujours, car chacun a sa propre idée du résultat. La note de cadrage met tout le monde d'accord AVANT de dépenser, et te sert ensuite pour dire non.",
  sections: [
    {
      titre: "Pourquoi cadrer : partir de ton vécu",
      exemple: "Ta démat fiscale ou ta migration Divalto : quelqu'un a-t-il dit « Ah, je pensais que c'était inclus » ?\nDEMAT 2027 : le DAF (directeur financier) dit « on passe à la facture électronique ».\nLa cheffe comptable comprend « factures fournisseurs ». Le commercial, « factures clients ».\nL'intégrateur Divalto comprend « un connecteur ».\nTrois projets différents dans une seule phrase.",
      points: [
        "Cadrer = écrire, en 2 à 5 pages, ce que le projet doit produire, pour qui, avec quels moyens et quelles limites. Ce document s'appelle la note de cadrage.",
        "Autres noms : charte de projet (PMBOK, le guide américain), Project Brief (PRINCE2, la méthode britannique). En agile : vision produit, avec un budget et des limites. Même idée.",
        "Ne pas confondre : la note de cadrage dit QUOI et POURQUOI (quelques pages). Le cahier des charges détaille les besoins, pour consulter des prestataires. Les spécifications disent COMMENT, écran par écran.",
        "On cadre AVANT de lancer les travaux et les commandes. Après, chaque désaccord coûte de l'argent.",
        "Plus tard, une demande hors du cadre devient une demande de changement, pas un « petit plus »."
      ],
      retenir: "Une note de cadrage transforme des attentes floues en un accord écrit, avant de dépenser."
    },
    {
      titre: "Objectif et enjeux : le besoin, pas la solution",
      exemple: "Rappel : recevoir des factures électroniques est obligatoire pour toutes les entreprises depuis le 1er septembre 2026.\nLes émettre devient obligatoire pour une PME comme le négociant au 1er septembre 2027.\nVersion 1 : « Installer la plateforme X et le connecteur Divalto. »\nVersion 2 : « Recevoir et émettre nos factures entre entreprises en électronique, via une plateforme agréée (PA),\navant septembre 2027 pour l'émission, sans retarder la clôture mensuelle. »\nLa version 1 décrit une solution. La version 2 décrit le résultat attendu, et laisse comparer plusieurs plateformes.",
      points: [
        "L'objectif dit QUOI obtenir et POURQUOI. Il ne dit pas avec quel outil.",
        "Les enjeux disent ce qu'on risque si on ne fait rien : amende, client perdu, surcharge en compta, image.",
        "L'objectif nomme déjà un logiciel ? Demande : « Quel problème ce logiciel doit-il régler ? »",
        "Un bon objectif tient en une ou deux phrases.",
        "Le DAF comme la comptabilité doivent le comprendre."
      ],
      retenir: "L'objectif dit le résultat attendu et sa raison, jamais la solution."
    },
    {
      titre: "Périmètre, hors périmètre et livrables",
      exemple: "Périmètre : factures entre entreprises (B2B) en France, clients et fournisseurs, des 3 sites.\nAussi : connexion Divalto ↔ plateforme, flux EDI factures de la grande distribution (dont AquaBleu), formation compta.\nHors périmètre : notes de frais, refonte du plan comptable, factures export hors UE (Union européenne).\nÀ décider avant le jalon 1 : le e-reporting des ventes aux particuliers (responsable : DAF).\nLivrables : plateforme choisie et contractée, connecteur recetté, procédures comptables, utilisateurs formés.",
      points: [
        "Périmètre = ce que le projet livre : sites, flux, processus, utilisateurs, données.",
        "Hors périmètre = ce que le projet NE fait PAS, écrit noir sur blanc. C'est la partie qu'on oublie le plus.",
        "Ce qui n'est pas écrit sera supposé inclus par quelqu'un. Le flou se paie en fin de projet.",
        "Livrable = une chose concrète que l'on remet et que l'on vérifie : un contrat, un connecteur recetté, une procédure.",
        "Un point encore incertain ? Note « à décider avant le jalon X », avec un responsable."
      ],
      retenir: "Ce qui n'est pas écrit hors périmètre finira par être demandé."
    },
    {
      titre: "Critères de succès, contraintes et hypothèses",
      exemple: "Le DAF dit : « Le succès, c'est d'être dans les temps. » C'est utile, mais pas suffisant.\nDélai : toutes les factures clients professionnels émises via la plateforme au 1er septembre 2027.\nQualité : moins de 2 % de factures rejetées le 1er mois. Adoption : clôture mensuelle toujours faite en 5 jours ouvrés.\nContrainte : la date légale. Hypothèse : « L'intégrateur livre le connecteur standard en version 10.13. »",
      points: [
        "Critère de succès = un chiffre, une date ou un seuil. Pour chacun, écris comment le mesurer : quel rapport, qui mesure.",
        "Couvre le délai, mais aussi la qualité (taux de rejet) et l'adoption (les gens utilisent vraiment l'outil). Un projet peut être à l'heure et raté.",
        "Contrainte = imposée et non négociable : date légale, budget plafonné, ressource absente l'été.",
        "Date imposée ? Construis le planning à rebours : on part de la date, et on remonte jalon par jalon.",
        "Hypothèse = ce qu'on suppose vrai sans preuve. Non vérifiée, c'est un risque caché : vérifie-la vite."
      ],
      retenir: "Le succès se mesure (délai, qualité, adoption), la contrainte s'impose, l'hypothèse se vérifie."
    },
    {
      titre: "Parties prenantes et premiers risques",
      exemple: "Sponsor : le DAF. Il décide et arbitre.\nParties prenantes : cheffe comptable, commerciaux, intégrateur, plateforme, DSI, clients EDI.\nLe commercial dit : « Moi je veux juste que ça marche. » Tu lui demandes 15 minutes :\n« Quels sont les 3 cas qui ne doivent jamais casser ? » Tu traduis ses réponses en critères.\nRisques : plateforme en retard, clients EDI pas prêts, compta saturée en clôture.",
      points: [
        "Parties prenantes : qui est touché, qui décide, qui est consulté ou informé. Le détail (RACI) vient au module cp09.",
        "Voir les métiers AVANT de faire valider. Une note écrite seul, sans la compta ni les ventes, fait découvrir les besoins en recette.",
        "Un métier refuse de participer ? Demande-lui peu, sur son terrain : un entretien court, les cas qui ne doivent pas casser.",
        "C'est le client (la maîtrise d'ouvrage, ici le DAF et les métiers) qui porte la note. L'intégrateur donne un avis technique, il ne fixe pas le périmètre.",
        "Premiers risques : les 3 à 5 plus gros, avec une idée de parade. L'analyse complète vient au module cp07."
      ],
      retenir: "Le client porte la note, les métiers y sont entendus, même ceux qui ne veulent pas venir."
    },
    {
      titre: "Jalons, budget et gouvernance",
      exemple: "Date imposée : émission obligatoire au 1er septembre 2027.\nJalons, à rebours : bascule en août 2027, pilote sur 1 site au printemps, connecteur recetté avant, choix de la plateforme d'abord.\nBudget : 60 à 90 k€, avec sa marge.\nGouvernance : COPIL (comité de pilotage) mensuel avec le DAF, point projet chaque semaine.",
      points: [
        "Jalons et budget restent macro : des dates clés et une fourchette, pas un planning détaillé.",
        "Un budget sans marge d'incertitude devient vite une promesse impossible à tenir.",
        "Gouvernance : qui décide quoi, et dans quelle réunion (comité de pilotage, point projet).",
        "Écris aussi comment on change la note : qui peut décider d'un avenant."
      ],
      retenir: "Au cadrage, on donne des ordres de grandeur et on nomme qui décide."
    },
    {
      titre: "La validation par le sponsor, et les pièges",
      exemple: "Le DAF répond « OK, vas-y » en 2 minutes. Il n'a pas lu.\nTu demandes 20 minutes pour 3 points clés, avec des options et ta recommandation.\nIl annule ensuite les comités ? Tu écris : « Sans réponse avant le 15, on applique l'option A. »\nTrois mois plus tard, le commercial veut les bons de livraison dématérialisés. La note dit « hors périmètre ».\nTu chiffres l'impact et tu le présentes au DAF.",
      points: [
        "Le sponsor (ici le DAF) valide la note par écrit. Sans cette validation, le projet n'a pas de mandat.",
        "Sponsor absent ou qui signe sans lire ? Demande 15 à 20 minutes, viens avec des options, fixe une date limite. S'il ne tranche pas, écris la décision par défaut.",
        "La note peut évoluer (un client pas prêt, une nouvelle demande), mais par un avenant ou une décision tracée du sponsor, jamais par glissement.",
        "Projet déjà lancé sans note ? Il n'est pas trop tard : écris un cadrage de reprise (l'existant, la suite, les limites) et fais-le valider.",
        "Pièges : cadrer seul et trop vite, écrire une solution, des critères pas mesurables (« améliorer »), oublier le hors périmètre."
      ],
      retenir: "La note validée par le sponsor te permet de dire non, ou « oui, mais voici l'impact »."
    }
  ]
};
