// Outil « Note de cadrage » (docs/outils.md), défini par l'expert chef de projet d'après les cours cp04 et cp06.
// Règles des cours : objectif = quoi et pourquoi (cp04 §2) ; hors périmètre écrit noir sur blanc (§3) ; un critère de
// succès = un chiffre, une date ou un seuil, et comment on le mesure (§4) ; hypothèse impossible à vérifier = un risque
// (§4) ; les 3 à 5 plus gros risques (§5) ; budget en fourchette, tolérances (§6) ; validation écrite du sponsor (§7) ;
// démarche (cp06). Exemple : la note de cadrage de DEMAT 2027, octobre 2026 (docs/plan-chef-de-projet.md).
LEARNSQL.outils = (LEARNSQL.outils || []).concat([
  {
    id: "gp-cadrage",
    sujet: "gestion-projet",
    titre: "Note de cadrage",
    resume: "Écrire, avant de dépenser, ce que le projet doit produire, pour qui, avec quels moyens et quelles limites.",
    quand: "Au début du projet, avant les commandes. Ensuite, la note ne change que par une décision écrite du sponsor.",
    etapes: [
      "Remplis les rubriques avec les métiers. Écrit seul, le cadrage fait découvrir les besoins en recette.",
      "Écris le hors périmètre élément par élément, et des critères de succès chiffrés.",
      "Fais valider la note par écrit par le sponsor : 20 minutes sur 3 points clés."
    ],
    cours: ["cp04", "cp06"],
    type: "document",
    rubriques: [
      { id: "projet", titre: "Projet", type: "texte", aide: "Le nom court du projet." },
      { id: "sponsor", titre: "Sponsor", type: "texte", aide: "Celui qui décide et arbitre. Un seul." },
      { id: "objectif", titre: "Objectif", type: "texte-long", aide: "Quoi obtenir et pourquoi, en 1 ou 2 phrases. Pas le nom d'un logiciel." },
      { id: "enjeux", titre: "Enjeux", type: "texte-long", aide: "Ce qu'on risque si on ne fait rien : amende, client perdu, surcharge, image." },
      { id: "perimetre", titre: "Périmètre", type: "texte-long", aide: "Ce que le projet livre : sites, flux, processus, utilisateurs, données." },
      { id: "hors_perimetre", titre: "Hors périmètre", type: "texte-long",
        aide: "Ce que le projet ne fait pas, élément par élément. Ce qui n'est pas écrit sera demandé." },
      { id: "livrables", titre: "Livrables", type: "texte-long",
        aide: "Des choses concrètes, remises et vérifiées : un contrat, un connecteur recetté, une procédure." },
      { id: "criteres", titre: "Critères de succès", type: "tableau", ligne: { titre: "Critère" },
        aide: "Au moins un critère de qualité et un d'adoption : un projet peut être à l'heure et raté.",
        colonnes: [
          { id: "critere", titre: "Critère", type: "texte", aide: "Ce qu'on veut obtenir." },
          { id: "seuil", titre: "Seuil", type: "texte", aide: "Un chiffre, un seuil ou une date. Pas « améliorer »." },
          { id: "mesure", titre: "Comment on mesure", type: "texte", aide: "Quel rapport, quelle source." },
          { id: "qui", titre: "Qui mesure", type: "texte" },
          { id: "type", titre: "Type", type: "choix", valeurs: ["Délai", "Qualité", "Adoption"],
            aide: "Au moins un critère de qualité et un d'adoption : un projet peut être à l'heure et raté." }
        ],
        alertes: [
          { si: "seuil vide ou mesure vide", message: "Un critère se mesure : un seuil, et comment on le mesure." }
        ] },
      { id: "contraintes", titre: "Contraintes", type: "texte-long",
        aide: "Imposé, non négociable : une date légale, un budget plafonné, une absence. Une loi : avec sa source officielle." },
      { id: "hypotheses", titre: "Hypothèses", type: "tableau", ligne: { titre: "Hypothèse" },
        colonnes: [
          { id: "hypothese", titre: "Hypothèse", type: "texte-long", aide: "Ce qu'on suppose vrai sans preuve." },
          { id: "qui", titre: "Qui la vérifie", type: "texte" },
          { id: "quand", titre: "Pour quand", type: "date" },
          { id: "etat", titre: "État", type: "choix", valeurs: ["À vérifier", "Vraie", "Fausse", "Impossible à vérifier"] }
        ],
        alertes: [
          { si: "etat = \"Impossible à vérifier\"", message: "Écris aussi cette hypothèse au registre des risques." },
          { si: "etat = \"Fausse\"", message: "Hypothèse fausse : c'est un fait. Chiffre l'impact et replanifie." }
        ] },
      { id: "parties_prenantes", titre: "Parties prenantes", type: "texte-long",
        aide: "Qui est touché, qui décide, qui est consulté ou informé. Le détail : le RACI." },
      { id: "risques", titre: "Premiers risques", type: "tableau", ligne: { titre: "Risque" },
        colonnes: [
          { id: "risque", titre: "Risque", type: "texte-long", aide: "Les 3 à 5 plus gros. La cause précise, pas « on pourrait être en retard »." },
          { id: "parade", titre: "Idée de parade", type: "texte-long" }
        ],
        totaux: [{ libelle: "Premiers risques (3 à 5)", calcul: "nombre" }] },
      { id: "demarche", titre: "Démarche", type: "texte-long",
        aide: "Prédictive, agile ou hybride. Ce qui est fixe se cadre ; ce qui est flou avance par itérations." },
      { id: "jalons", titre: "Jalons", type: "tableau", ligne: { titre: "Jalon" },
        colonnes: [
          { id: "quand", titre: "Quand", type: "texte", aide: "Une date. Au cadrage, le mois suffit ; le planning donnera le jour." },
          { id: "jalon", titre: "Jalon", type: "texte", aide: "Un livrable qu'on peut vérifier. Pas une période, ni « bien avancé »." }
        ] },
      { id: "budget", titre: "Budget", type: "texte", aide: "Une fourchette, avec sa marge. Jamais un chiffre baissé « pour rassurer »." },
      { id: "tolerances", titre: "Tolérances", type: "texte",
        aide: "Ce que tu gères sans redemander. Au-delà : le sponsor décide, prévenu le jour même." },
      { id: "gouvernance", titre: "Gouvernance", type: "texte-long",
        aide: "Qui décide quoi, dans quelle réunion. Qui décide d'un avenant à cette note." },
      { id: "validation", titre: "Validée par", type: "texte", aide: "Le sponsor, par écrit, et la date. Sans elle, pas de mandat." }
    ],
    alertes: [
      { si: "hors_perimetre vide", message: "Le hors périmètre est vide. C'est la partie qu'on oublie le plus." },
      { si: "criteres vide", message: "Écris tes critères de succès : un chiffre, un seuil ou une date, et sa mesure." },
      { si: "tolerances vide", message: "Écris tes tolérances : jusqu'où tu gères seul." },
      { si: "validation vide", message: "Sans validation écrite du sponsor, pas de mandat." }
    ],
    exemple: {
      nom: "DEMAT 2027",
      rubriques: {
        projet: "DEMAT 2027 : la facture électronique",
        sponsor: "Le DAF",
        objectif: "Recevoir et émettre nos factures entre entreprises en électronique, via une plateforme agréée (PA), pour respecter la loi : émission avant septembre 2027, sans retarder la clôture mensuelle.",
        enjeux: "Réception déjà obligatoire depuis le 1er septembre 2026 ; émission au 1er septembre 2027. Si on ne fait rien : des amendes, des clients EDI mécontents (AquaBleu : 20 % du chiffre d'affaires), une compta surchargée.",
        perimetre: "Factures entre entreprises (B2B) en France, clients et fournisseurs, des 3 sites. Le connecteur standard de la PA, installé et paramétré dans Divalto par l'intégrateur. Les flux EDI des factures de la grande distribution (dont AquaBleu). La formation de la compta.",
        hors_perimetre: "Notes de frais. Refonte du plan comptable. Bons de livraison dématérialisés. Gestion de stock. E-reporting : obligatoire en septembre 2027, porté par le DAF, hors projet (vérifier que la PA choisie sait le faire).",
        livrables: "PA choisie et contractée. Connecteur recetté. Procédures comptables. Utilisateurs formés.",
        criteres: [
          { critere: "Factures aux clients professionnels en France émises via la PA", seuil: "100 % au 1er septembre 2027",
            mesure: "Relevé des factures émises, PA et Divalto", qui: "Toi", type: "Délai" },
          { critere: "Factures rejetées", seuil: "Moins de 2 % le 1er mois", mesure: "Relevé des rejets, portail de la PA", qui: "Toi", type: "Qualité" },
          { critere: "Clôture mensuelle", seuil: "Toujours en 5 jours ouvrés", mesure: "Calendrier de clôture", qui: "La cheffe comptable", type: "Qualité" },
          { critere: "Factures reçues par la PA ressaisies à la main", seuil: "Plus aucune au 3e mois (septembre 2027)",
            mesure: "Comptage dans Divalto", qui: "La cheffe comptable", type: "Adoption" }
        ],
        contraintes: "Date légale : émission au 1er septembre 2027 (source : impots.gouv.fr). Clôture annuelle en janvier. Compta à 2 sur 6 en août : pas de bascule en août.",
        hypotheses: [
          { hypothese: "Le connecteur standard de la PA marche avec Divalto 10.13.", qui: "L'intégrateur, avec la PA", quand: "2026-10-30", etat: "À vérifier" },
          { hypothese: "Les clients EDI de la grande distribution seront prêts pour la bascule de juin.", qui: "Marc, avec le commercial", quand: "2026-11-30", etat: "À vérifier" }
        ],
        parties_prenantes: "Sponsor : le DAF. Touchés et consultés : la cheffe comptable, l'ADV, les commerciaux, ton DSI. Prestataires : l'intégrateur Divalto, la PA. Dehors : les clients EDI. Détail : le RACI.",
        risques: [
          { risque: "La PA en retard sur son connecteur.", parade: "Une date au contrat, des jalons intermédiaires suivis, un plan B : le portail de la PA." },
          { risque: "Des clients EDI pas prêts.", parade: "Les prévenir tôt, par le commercial ; tester leurs factures pendant la recette." },
          { risque: "La compta saturée en clôture.", parade: "Placer ses tâches hors des jours de clôture ; réserver son temps avec la cheffe comptable." }
        ],
        demarche: "Hybride. Cadré : flux légaux, connecteur standard de la PA, bascule. Par itérations de 2 semaines, de février à avril : les écrans et états de suivi Divalto de la compta, dans une enveloppe de 10 jours d'intégrateur. PO : la cheffe comptable.",
        jalons: [
          { quand: "Novembre 2026, au plus vite", jalon: "PA choisie, contrat signé, réception active" },
          { quand: "Avril 2027", jalon: "Connecteur recetté (PV signé)" },
          { quand: "Mai 2027", jalon: "Pilote réussi sur 1 site" },
          { quand: "Juin 2027", jalon: "Bascule des 3 sites" },
          { quand: "1er septembre 2027", jalon: "Émission obligatoire (juillet-août : la marge, pas un jalon)" }
        ],
        budget: "60 à 90 k€ de dépenses externes, avec sa marge.",
        tolerances: "± 2 semaines par jalon ; budget dans sa fourchette, sous 90 k€. Au-delà : le DAF décide, prévenu le jour même.",
        gouvernance: "COPIL mensuel (le 2e mardi), présidé par le DAF : il décide du périmètre, du budget, des dates et des avenants à cette note. Point projet chaque semaine, avec 15 minutes de revue des risques.",
        validation: "Le DAF, par écrit, octobre 2026."
      }
    },
    export: ["excel", "copier", "imprimer"]
  }
]);
