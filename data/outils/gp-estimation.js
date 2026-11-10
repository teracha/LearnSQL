// Outil « Calculette d'estimation » (docs/outils.md), défini par l'expert chef de projet d'après le cours cp05.
// Règles du cours (§2) : « Charge : le travail, en jours de travail d'une personne. Durée : le temps au calendrier, du
// début à la fin » ; « Durée = charge ÷ disponibilité. Personne n'est à 100 % : congés, clôture, run, autres projets » ;
// « L'estimation vient de celui qui fait. Toi, tu la challenges : sur quoi repose-t-elle ? Déjà fait ailleurs ? » ;
// « Incertain ? Trois chiffres : optimiste (O), probable (P), pessimiste (Pe). Moyenne pondérée du PMBOK : (O + 4 × P
// + Pe) ÷ 6. Ex. : 4, 6 et 14 jours donnent 7 jours » ; « Une estimation baisse quand le contenu baisse, pas sous la
// pression » ; au planning, on met la durée.
// Exemple : le planning de DEMAT, décembre 2026 : les cas de test de Julie (6 jours, 1 jour par semaine, 6 semaines :
// cp05 §2) ; les 300 fiches clients sans SIREN de l'ADV (environ 10 minutes par fiche, 50 heures : cp20-q43), estimées
// avec les 3 chiffres du cours (4, 6 et 14 jours : 7 jours).
LEARNSQL.outils = (LEARNSQL.outils || []).concat([
  {
    id: "gp-estimation",
    sujet: "gestion-projet",
    titre: "Calculette d'estimation",
    resume: "Estimer une tâche avec trois chiffres, puis passer de la charge à la durée au calendrier, selon la disponibilité réelle.",
    quand: "En faisant le planning, avec ceux qui feront le travail. Puis chaque fois que le contenu change.",
    etapes: [
      "L'estimation vient de celui qui fait. Toi, tu la challenges : sur quoi repose-t-elle ? Déjà fait ailleurs ?",
      "Incertain ? Trois chiffres : optimiste, probable, pessimiste. Charge = (O + 4 × P + Pe) ÷ 6. Sûr ? Le même chiffre 3 fois.",
      "Durée = charge ÷ disponibilité. Personne n'est à 100 % : congés, clôture, run. Au planning, on met la durée."
    ],
    cours: ["cp05", "ot01"],
    type: "tableau",
    ligne: { titre: "Tâche" },
    colonnes: [
      { id: "tache", titre: "Tâche", type: "texte", aide: "De quelques jours à 2 semaines." },
      { id: "qui", titre: "Qui l'estime", type: "texte", aide: "Celui qui fera le travail." },
      { id: "optimiste", titre: "Optimiste (O)", type: "nombre", aide: "En jours de travail." },
      { id: "probable", titre: "Probable (P)", type: "nombre", aide: "En jours de travail." },
      { id: "pessimiste", titre: "Pessimiste (Pe)", type: "nombre", aide: "En jours de travail." },
      { id: "charge", titre: "Charge (jours)", type: "calcul", formule: "(optimiste + 4 * probable + pessimiste) / 6" },
      { id: "dispo", titre: "Disponibilité (jours par semaine)", type: "nombre",
        aide: "Ses vrais jours pour cette tâche : congés, clôture, run et autres projets déduits." },
      { id: "duree", titre: "Durée (semaines)", type: "calcul", formule: "charge / dispo" }
    ],
    alertes: [
      { si: "qui vide", message: "L'estimation vient de celui qui fait : écris son nom." },
      { si: "optimiste vide ou pessimiste vide",
        message: "Il manque un chiffre : optimiste, probable et pessimiste. Sûr de toi ? Le même chiffre 3 fois." },
      { si: "optimiste > probable ou probable > pessimiste",
        message: "Range les chiffres : l'optimiste est le plus petit, le pessimiste le plus grand." },
      { si: "dispo >= 5", message: "Personne n'est à 100 % : congés, clôture, run, autres projets. Compte ses vrais jours." }
    ],
    totaux: [
      { libelle: "Charge totale (jours)", calcul: "somme", colonne: "charge" }
    ],
    aideTotaux: "La charge dit combien de travail ; la durée, combien de temps au calendrier. Moins de temps ? Moins de contenu, pas une estimation baissée.",
    exemple: {
      nom: "Planning de DEMAT, décembre 2026",
      lignes: [
        { tache: "Cas de test des factures fournisseurs", qui: "Julie", optimiste: 6, probable: 6, pessimiste: 6, dispo: 1 },
        { tache: "Fiches clients sans SIREN : 300 à compléter dans Divalto", qui: "L'ADV, avec son responsable",
          optimiste: 4, probable: 6, pessimiste: 14, dispo: 2 }
      ]
    },
    export: ["excel", "copier", "imprimer"]
  }
]);
