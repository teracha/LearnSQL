// Outil « Échéancier des contrats » (docs/outils.md), défini par l'expert chef de projet d'après les cours cp27 et cp14.
// Règles des cours : « Un échéancier des contrats (fin, préavis, propriétaire), relu à chaque budget » ; le contrat de la
// PA arrive à échéance fin novembre 2029, se reconduit seul, sauf préavis de 6 mois : le DAF choisit avant fin mai 2029
// (cp27 §6, q38) ; chaque ligne a un propriétaire, une fin, un préavis (cp27 §2) ; « Durée : souvent reconduite seule,
// sauf résiliation avant un préavis. Note la date, avec une alerte. Avant, le DAF choisit (rester, renégocier, changer),
// coût de sortie compris » ; « Changer de prestataire est un projet : le nouveau signé, connecté et testé avant la fin de
// l'ancien. Jamais de trou » (cp14 §5, q34, q35).
// Date limite pour résilier = fin − préavis. Repli : le moteur ne calcule pas une date (un calcul donne un nombre) ni
// des mois ; la date limite se saisit, une alerte vérifie qu'elle tombe avant la fin, et un calcul donne les jours qui
// restent. L'alerte « à décider » suit la règle du cours : relu à chaque budget, donc une date limite avant la prochaine
// relecture se décide maintenant.
// Exemple : DSI adjoint, octobre 2028, budget 2029 (cp27 §6, q38 ; cp14-q35 ; cp15-q22).
LEARNSQL.outils = (LEARNSQL.outils || []).concat([
  {
    id: "gp-echeancier",
    sujet: "gestion-projet",
    titre: "Échéancier des contrats",
    resume: "Lister chaque contrat avec sa fin, son préavis et son propriétaire, pour que le DAF choisisse avant la date limite.",
    quand: "Dès le premier contrat signé. Puis relu à chaque budget : chaque préavis arrive avec le temps de choisir.",
    etapes: [
      "Une ligne par contrat : sa fin, son préavis, son propriétaire. Reconduit seul ? La fin de la période en cours.",
      "Date limite pour résilier = la fin moins le préavis. Ex. : fin le 30/11/2029, préavis de 6 mois : le 31/05/2029.",
      "Avant la date limite, le DAF choisit : rester, renégocier ou changer, coût de sortie compris."
    ],
    cours: ["cp27", "cp14"],
    type: "document",
    rubriques: [
      { id: "relu_par", titre: "Relu par", type: "texte", aide: "À chaque budget : le DSI et son adjoint, avec le contrôleur de gestion." },
      { id: "relu_le", titre: "Relu le", type: "date", aide: "À chaque budget." },
      { id: "prochaine", titre: "Prochaine relecture", type: "date",
        aide: "Le prochain budget. Une date limite qui tombe avant se décide maintenant." },
      { id: "contrats", titre: "Contrats", type: "tableau", ligne: { titre: "Contrat" },
        colonnes: [
          { id: "contrat", titre: "Contrat", type: "texte", aide: "Le fournisseur, ce qu'il fournit, son prix." },
          { id: "fin", titre: "Fin", type: "date", aide: "Reconduit seul ? La fin de la période en cours." },
          { id: "preavis", titre: "Préavis (mois)", type: "nombre" },
          { id: "date_limite", titre: "Date limite pour résilier", type: "date", aide: "La fin moins le préavis." },
          { id: "jours", titre: "Jours avant la date limite", type: "calcul", formule: "date_limite - aujourdhui" },
          { id: "proprietaire", titre: "Propriétaire", type: "texte", aide: "Il suit la date et prépare le choix." },
          { id: "decision", titre: "Décision du DAF", type: "choix", valeurs: ["À décider", "Rester", "Renégocier", "Changer"],
            defaut: "À décider", couleurs: ["attention", "ok", "ok", "ok"] }
        ],
        alertes: [
          { si: "date_limite vide", message: "Écris la date limite pour résilier : la fin moins le préavis." },
          { si: "date_limite > fin", message: "La date limite vient avant la fin du contrat : la fin moins le préavis." },
          { si: "decision = \"À décider\" et date_limite < aujourdhui",
            message: "Date limite passée : le contrat s'est reconduit seul. Note sa nouvelle fin." },
          { si: "decision = \"À décider\" et date_limite >= aujourdhui et date_limite <= prochaine",
            message: "La date limite tombe avant la prochaine relecture : prépare le choix du DAF, sortie chiffrée, et prévois-le au budget." },
          { si: "decision = \"Changer\"",
            message: "Changer est un projet : le nouveau signé, connecté et testé avant la fin de l'ancien. Jamais de trou." },
          { si: "proprietaire vide", message: "Chaque contrat a un propriétaire : il suit la date et prépare le choix." }
        ],
        totaux: [
          { libelle: "Contrats", calcul: "nombre" },
          { libelle: "À décider avant la prochaine relecture", calcul: "nombre",
            si: "decision = \"À décider\" et date_limite >= aujourdhui et date_limite <= prochaine" }
        ] }
    ],
    alertes: [
      { si: "prochaine vide", message: "Écris la date de la prochaine relecture : le prochain budget." }
    ],
    exemple: {
      nom: "Contrats de la DSI, budget 2029",
      date: "2028-10-02",
      rubriques: {
        relu_par: "Ton DSI et toi, avec le contrôleur de gestion",
        relu_le: "2028-10-02",
        prochaine: "2029-09-03",
        contrats: [
          { contrat: "La PA : abonnement à 850 € par mois, et l'archivage à 50 € par mois", fin: "2029-11-30", preavis: 6,
            date_limite: "2029-05-31", proprietaire: "Toi, DSI adjoint", decision: "À décider" },
          { contrat: "Les liens télécoms des 3 dépôts : reconduits seuls pour 3 ans", fin: "2029-03-31", preavis: 3,
            date_limite: "2028-12-31", proprietaire: "Yann, administrateur réseau", decision: "À décider" }
        ]
      }
    },
    export: ["excel", "copier", "imprimer"]
  }
]);
