// Outil PROVISOIRE (pilote du moteur, docs/outils.md) : le registre des risques, d'après le cours cp07.
// Règles du cours : probabilité et impact de 1 (faible) à 3 (fort) ; note = probabilité × impact, de 1 à 9 ;
// « 6 ou 9 = priorité. 3 ou 4 = une action simple, suivie en revue. 1 ou 2 = on accepte, on surveille de loin » ;
// 4 réponses : éviter, réduire, transférer, accepter ; un propriétaire nommé ; une action, une date.
// Exemple : le fil rouge DEMAT 2027 (docs/plan-chef-de-projet.md, cours cp07 et cp20).
LEARNSQL.outils = (LEARNSQL.outils || []).concat([
  {
    id: "gp-risques",
    sujet: "gestion-projet",
    titre: "Registre des risques",
    resume: "Lister les risques du projet, les noter et suivre leurs actions.",
    quand: "Dès le cadrage, puis à chaque point projet : 15 minutes sur ce qui bouge.",
    etapes: [
      "Trouve les risques à plusieurs. Écris chacun ainsi : cause → risque → conséquence.",
      "Note la probabilité et l'impact, de 1 à 3. La note se calcule.",
      "Pour une note de 6 ou 9 : une réponse, une action, un propriétaire et une date."
    ],
    cours: ["cp07"],
    type: "tableau",
    ligne: { titre: "Risque" },
    colonnes: [
      { id: "risque", titre: "Risque", type: "texte-long", aide: "Cause → risque → conséquence." },
      { id: "proba", titre: "Probabilité", type: "choix", valeurs: [1, 2, 3], libelles: ["Faible", "Moyenne", "Forte"] },
      { id: "impact", titre: "Impact", type: "choix", valeurs: [1, 2, 3], libelles: ["Faible", "Moyen", "Fort"] },
      { id: "note", titre: "Note", type: "calcul", formule: "proba × impact",
        niveaux: [
          { max: 2, libelle: "On surveille", couleur: "ok" },
          { max: 4, libelle: "Action simple", couleur: "attention" },
          { max: 9, libelle: "Priorité", couleur: "ko" }
        ] },
      { id: "reponse", titre: "Réponse", type: "choix", valeurs: ["Éviter", "Réduire", "Transférer", "Accepter"] },
      { id: "action", titre: "Action", type: "texte-long" },
      { id: "proprietaire", titre: "Propriétaire", type: "texte", aide: "Une personne nommée, qui peut agir quand le risque arrive." },
      { id: "echeance", titre: "Échéance", type: "date" },
      { id: "statut", titre: "Statut", type: "choix", valeurs: ["Ouvert", "Fermé"], defaut: "Ouvert" }
    ],
    alertes: [
      { si: "note >= 6 et action vide", message: "Note de 6 ou 9 sans action : c'est une priorité." },
      { si: "action non vide et (proprietaire vide ou echeance vide)", message: "Action sans propriétaire ou sans date." }
    ],
    totaux: [
      { libelle: "Risques", calcul: "nombre" },
      { libelle: "Risques ouverts", calcul: "nombre", si: "statut = \"Ouvert\"" },
      { libelle: "Priorités ouvertes (6 ou 9)", calcul: "nombre", si: "note >= 6 et statut = \"Ouvert\"" }
    ],
    exemple: {
      nom: "DEMAT 2027",
      lignes: [
        { risque: "Seule la cheffe comptable sait traiter les avoirs fournisseurs, et elle est en congé pendant la recette → les avoirs ne sont pas testés à temps → erreurs sur les avoirs après la bascule.",
          proba: 3, impact: 2, reponse: "Réduire", action: "Former Julie aux avoirs fournisseurs. Faire écrire ses cas avant son départ.",
          proprietaire: "Le DAF", echeance: "2027-03-15", statut: "Ouvert" },
        { risque: "Le connecteur de la PA n'est pas livré le 1er mars → la recette ne démarre pas le 16 mars → la bascule de juin glisse.",
          proba: 2, impact: 3, reponse: "Transférer", action: "Pénalités de retard au contrat. Déclencheur : pas livré au 15 mars → plan B, le portail web de la PA.",
          proprietaire: "Toi", echeance: "2027-03-15", statut: "Ouvert" },
        { risque: "La reprise des codes TVA prend plus de temps que prévu (3 semaines chez un autre client de l'intégrateur) → le paramétrage déborde → la recette commence en retard.",
          proba: 2, impact: 2, reponse: "Réduire", action: "Table des codes TVA (ancien → nouveau) validée par la cheffe comptable avant le 15 janvier.",
          proprietaire: "La cheffe comptable", echeance: "2027-01-15", statut: "Fermé" },
        { risque: "300 fiches clients sans SIREN dans Divalto → factures rejetées par la PA → retards de paiement.",
          proba: 3, impact: 3, reponse: "Réduire", action: "Nettoyer les fiches dans Divalto, avec l'utilitaire de contrôle Siret-Siren.",
          proprietaire: "Le responsable ADV", echeance: "2027-02-26", statut: "Ouvert" },
        { risque: "La PA augmente ses prix au renouvellement, en 2029 → le coût du run monte.",
          proba: 2, impact: 1, reponse: "Accepter", action: "Une marge prévue dans le budget du run, qui reprend le contrat à la clôture.",
          proprietaire: "Ton DSI", echeance: "2027-07-13", statut: "Ouvert" },
        { risque: "Pic de commandes EDI au printemps, pendant la recette → Marc a moins de temps pour tester les flux EDI → des cas EDI testés en retard.",
          proba: 3, impact: 2, reponse: "", action: "", proprietaire: "", echeance: "", statut: "Ouvert" }
      ]
    },
    export: ["excel", "copier", "imprimer"]
  }
]);
