// Outil « Grille de choix d'un prestataire » (docs/outils.md), défini par l'expert chef de projet d'après le cours cp13.
// Règles du cours : 2 ou 3 offres sérieuses, sur le même cahier des charges et un même tableau de prix (§2) ; « Critères
// et poids s'écrivent AVANT d'ouvrir les offres. Les changer après, c'est choisir le gagnant d'abord » ; « Un critère
// éliminatoire ne se compense pas : raté, l'offre sort, même bien notée ailleurs. La loi est un filtre, pas un poids » ;
// « Chacun note son domaine, puis une séance commune règle les gros écarts » ; le prix se compare sur 3 ans, tout
// compris ; « Il manque un chiffre dans une offre ? Tu demandes le même aux 3, par écrit » (§4) ; tes cas en démo, des
// références appelées, la solidité sur des faits (§5) ; négocier avec une solution de rechange, puis une page au DAF :
// les 2 finalistes, leurs notes, le coût sur 3 ans, les risques, ta recommandation ; il choisit (§6).
// Source externe (le cours ne dit pas comment noter un critère) : l'échelle de notes de 0 à 5 du Guide romand des
// marchés publics (CROMP, annexes O et R) : 5 très intéressant, 4 bon et avantageux, 3 satisfaisant, 2 partiellement
// suffisant, 1 insuffisant, 0 information non fournie ; une même échelle pour tous les critères. Points = poids × note
// ÷ 5 : le total se lit sur 100, comme les notes du cours (78 et 74).
// Exemple : la grille DEMAT d'octobre 2026 (cp13 §4 à §6, q25, q26, q28 à q30, q34) : A 78, B 74, C écartée.
LEARNSQL.outils = (LEARNSQL.outils || []).concat([
  {
    id: "gp-choix-prestataire",
    sujet: "gestion-projet",
    titre: "Grille de choix d'un prestataire",
    resume: "Comparer 2 ou 3 offres sur une grille écrite avant de les ouvrir : éliminatoires, critères pondérés, notes de 0 à 5.",
    quand: "La grille, avant d'ouvrir les offres, validée par le décideur. Les notes, après les démos et les références.",
    etapes: [
      "Avant d'ouvrir les offres : les éliminatoires, puis les critères et leurs poids, 100 en tout. Fais-les valider par le décideur.",
      "Chacun note son domaine, de 0 à 5, sur des faits : tes cas en démo, des références. Une séance commune règle les gros écarts.",
      "Négocie, l'autre finaliste en réserve. Puis une page au décideur : notes, coût sur 3 ans, risques, ta recommandation."
    ],
    cours: ["cp13"],
    type: "document",
    rubriques: [
      { id: "achat", titre: "Ce qu'on achète", type: "texte", aide: "Le besoin, en une ligne. Le détail : le cahier des charges." },
      { id: "offres", titre: "Les offres A, B et C", type: "texte-long",
        aide: "2 ou 3 offres sérieuses, sur le même cahier des charges et le même tableau de prix." },
      { id: "validee", titre: "Grille validée par, le", type: "texte",
        aide: "Le décideur, AVANT d'ouvrir les offres. Changer la grille après, c'est choisir le gagnant d'abord." },
      { id: "eliminatoires", titre: "Critères éliminatoires", type: "tableau", ligne: { titre: "Éliminatoire", pluriel: "Éliminatoires" },
        aide: "Raté, l'offre sort, même bien notée ailleurs. La loi est un filtre, pas un poids.",
        colonnes: [
          { id: "critere", titre: "Critère éliminatoire", type: "texte" },
          { id: "a", titre: "Offre A", type: "choix", valeurs: ["Oui", "Non"], couleurs: ["ok", "ko"] },
          { id: "b", titre: "Offre B", type: "choix", valeurs: ["Oui", "Non"], couleurs: ["ok", "ko"] },
          { id: "c", titre: "Offre C", type: "choix", valeurs: ["Oui", "Non"], couleurs: ["ok", "ko"], facultatif: true }
        ],
        alertes: [
          { si: "a = \"Non\" ou b = \"Non\" ou c = \"Non\"",
            message: "Un critère éliminatoire ne se compense pas : l'offre qui le rate sort, quelles que soient ses notes. Écris-lui la raison." }
        ] },
      { id: "grille", titre: "Critères pondérés, sur 100", type: "tableau", ligne: { titre: "Critère" },
        colonnes: [
          { id: "critere", titre: "Critère", type: "texte", aide: "Le critère, et qui le note : chacun son domaine. Le prix : sur 3 ans, tout compris." },
          { id: "poids", titre: "Poids", type: "nombre", aide: "100 en tout, écrits avant d'ouvrir les offres." },
          { id: "note_a", titre: "Note A", type: "choix", valeurs: [0, 1, 2, 3, 4, 5], largeur: 16,
            libelles: ["Pas d'information", "Insuffisant", "Partiellement suffisant", "Satisfaisant", "Bon et avantageux", "Très intéressant"],
            couleurs: ["ko", "ko", "attention", "neutre", "ok", "ok"], aide: "De 0 à 5, sur des faits." },
          { id: "note_b", titre: "Note B", type: "choix", valeurs: [0, 1, 2, 3, 4, 5], largeur: 16,
            libelles: ["Pas d'information", "Insuffisant", "Partiellement suffisant", "Satisfaisant", "Bon et avantageux", "Très intéressant"],
            couleurs: ["ko", "ko", "attention", "neutre", "ok", "ok"], aide: "De 0 à 5, sur des faits." },
          { id: "note_c", titre: "Note C", type: "choix", valeurs: [0, 1, 2, 3, 4, 5], largeur: 16, facultatif: true,
            libelles: ["Pas d'information", "Insuffisant", "Partiellement suffisant", "Satisfaisant", "Bon et avantageux", "Très intéressant"],
            couleurs: ["ko", "ko", "attention", "neutre", "ok", "ok"], aide: "De 0 à 5, sur des faits." },
          { id: "points_a", titre: "Points A", type: "calcul", formule: "poids * note_a / 5" },
          { id: "points_b", titre: "Points B", type: "calcul", formule: "poids * note_b / 5" },
          { id: "points_c", titre: "Points C", type: "calcul", formule: "poids * note_c / 5" }
        ],
        alertes: [
          { si: "note_a = 0 ou note_b = 0 ou note_c = 0",
            message: "Note 0 : l'information manque ? Demande le même chiffre aux 3, par écrit, avec le même délai." }
        ],
        totaux: [
          { id: "total_poids", libelle: "Poids (100 en tout)", calcul: "somme", colonne: "poids" },
          { libelle: "Offre A, sur 100", calcul: "somme", colonne: "points_a" },
          { libelle: "Offre B, sur 100", calcul: "somme", colonne: "points_b" },
          { libelle: "Offre C, sur 100", calcul: "somme", colonne: "points_c" }
        ],
        aideTotaux: "Points = poids × note ÷ 5. Notes de 0 à 5 : 5 très intéressant, 3 satisfaisant, 0 pas d'information. Une offre qui rate un éliminatoire sort, quelle que soit sa note." },
      { id: "recommandation", titre: "Ta recommandation", type: "texte-long",
        aide: "Une page au décideur : les 2 finalistes, leurs notes, le coût sur 3 ans, les risques, ta recommandation. Il choisit." }
    ],
    alertes: [
      { si: "validee vide", message: "Fais valider les critères et leurs poids par le décideur, AVANT d'ouvrir les offres." },
      { si: "total_poids <> 100", message: "Les poids font 100 en tout. Fixés avant les offres, ils ne bougent plus." }
    ],
    exemple: {
      nom: "Choix de la PA, octobre 2026",
      rubriques: {
        achat: "Une plateforme agréée (PA) : un service obligatoire, avec un contrat de 3 ans.",
        offres: "A, B et C : 3 PA de la liste officielle, avec un connecteur standard pour Divalto. Réponses sous 2 semaines, puis une démo de 2 h chacune, sur nos 6 cas réels.",
        validee: "Le DAF, en octobre 2026, avant d'ouvrir les offres.",
        eliminatoires: [
          { critere: "Dans la liste officielle des PA (DGFiP)", a: "Oui", b: "Oui", c: "Oui" },
          { critere: "Un connecteur standard pour Divalto", a: "Oui", b: "Oui", c: "Oui" },
          { critere: "Réception possible dès novembre 2026", a: "Oui", b: "Oui", c: "Oui" }
        ],
        grille: [
          { critere: "Tes cas en démo (noté par la compta)", poids: 20, note_a: 4, note_b: 4, note_c: 3 },
          { critere: "Connecteur Divalto et sécurité (noté par la DSI)", poids: 25, note_a: 5, note_b: 3, note_c: 3 },
          { critere: "Prix sur 3 ans, tout compris (noté par toi)", poids: 20, note_a: 3, note_b: 4, note_c: 5 },
          { critere: "SLA", poids: 15, note_a: 3, note_b: 4, note_c: 3 },
          { critere: "Références sous Divalto", poids: 10, note_a: 4, note_b: 4, note_c: 2 },
          { critere: "Réversibilité", poids: 5, note_a: 3, note_b: 3, note_c: 3 },
          { critere: "Solidité", poids: 5, note_a: 5, note_b: 4, note_c: 1 }
        ],
        recommandation: "Finalistes : A (78) et B (74). C (64) écartée : un mot poli, sur les points faibles de son offre. Négocié avec A, B en réserve : support de 8 h à 18 h, portail du plan B inclus, export sous 30 jours. B coûte 10 % de moins sur 3 ans, mais son connecteur est moins bien noté. Je recommande A. Le DAF choisit."
      }
    },
    export: ["excel", "copier", "imprimer"]
  }
]);
