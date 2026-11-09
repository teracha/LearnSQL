// Outil « Business case : le coût sur 3 ans » (docs/outils.md), défini par l'expert chef de projet d'après le cours cp11.
// Règles du cours : le problème, 2 ou 3 options, « ne rien faire » comme référence quand la loi le permet (§1) ; le coût
// complet sur la durée (mise en place, run, sortie, réserve), le temps interne en jours, pas en euros (§2) ; un gain =
// volume × temps gagné × coût horaire chargé ; du temps libéré n'est pas de l'argent économisé (§3, cp11-q28) ; délai
// de retour d'une option = son surcoût ÷ son gain en plus par mois, à partir du gain plein (§4, cp11-q28) ; une page,
// avec ses hypothèses (§6). L'exemple montre exprès l'alerte « gain en temps » : c'est la leçon du cours.
LEARNSQL.outils = (LEARNSQL.outils || []).concat([
  {
    id: "gp-business-case",
    sujet: "gestion-projet",
    titre: "Business case : le coût sur 3 ans",
    resume: "Justifier le projet : les options, leur coût complet sur la durée, les gains, et ta recommandation.",
    quand: "Au cadrage, avant de valider le budget. Puis à mettre à jour après les contrats et à chaque gros changement.",
    etapes: [
      "Pose le problème et 2 ou 3 options. « Ne rien faire » sert de référence, quand la loi le permet.",
      "Compte tout, sur la durée : dépenses externes, run, réserve, et le temps interne en jours.",
      "Chiffre les gains avec leurs hypothèses : en argent, ou en temps. Puis recommande."
    ],
    cours: ["cp11"],
    type: "document",
    rubriques: [
      { id: "probleme", titre: "Le problème ou l'obligation", type: "texte-long" },
      { id: "duree", titre: "Durée comptée", type: "texte", aide: "Celle du contrat ou de la vie de la solution." },
      { id: "options", titre: "Options", type: "tableau", ligne: { titre: "Option" },
        aide: "ROI = (gains − coûts) ÷ coûts, sur la même durée. Gain net = gain brut moins le run. Le délai de retour ne voit pas ce qui vient après : compare aussi le gain sur toute la durée.",
        colonnes: [
          { id: "option", titre: "Option", type: "texte" },
          { id: "contenu", titre: "Ce qu'on fait", type: "texte-long" },
          { id: "cout", titre: "Coût sur la durée (€)", type: "nombre", aide: "Dépenses externes." },
          { id: "jours_internes", titre: "Temps interne (jours)", type: "nombre" },
          { id: "surcout", titre: "Surcoût (€)", type: "nombre",
            aide: "Le coût moins celui de l'option de référence : « ne rien faire » si la loi le permet, sinon la moins chère qui la respecte. Elle a 0." },
          { id: "gain_mois", titre: "Gain en plus par mois (€)", type: "nombre", aide: "Ce qui change par rapport à la référence, run déduit." },
          { id: "gain_en", titre: "Gain en", type: "choix", valeurs: ["Argent", "Temps"] },
          { id: "retour", titre: "Délai de retour (mois)", type: "calcul", formule: "surcout / gain_mois" }
        ],
        alertes: [
          { si: "gain_en = \"Temps\"",
            message: "Gain en temps : ce n'est pas de l'argent économisé. Ce délai de retour est en valeur de temps ; il devient de l'argent seulement si une dépense disparaît." }
        ],
        totaux: [{ id: "nb_options", libelle: "Options (2 ou 3)", calcul: "nombre" }] },
      { id: "tco", titre: "Coût complet de l'option recommandée", type: "tableau", ligne: { titre: "Poste" },
        colonnes: [
          { id: "poste", titre: "Poste", type: "texte" },
          { id: "quantite", titre: "Quantité", type: "nombre" },
          { id: "prix", titre: "Prix unitaire (€)", type: "nombre" },
          { id: "total", titre: "Total (€)", type: "calcul", formule: "quantite * prix" },
          { id: "nature", titre: "Nature", type: "choix", valeurs: ["Mise en place", "Run", "Sortie", "Réserve"] }
        ],
        totaux: [{ libelle: "Total sur la durée (€)", calcul: "somme", colonne: "total" }] },
      { id: "temps_interne", titre: "Temps interne, en jours", type: "nombre", aide: "Compté en jours, pas en euros, et pas dans le budget." },
      { id: "gains", titre: "Gains chiffrés", type: "tableau", ligne: { titre: "Gain" },
        colonnes: [
          { id: "gain", titre: "Gain", type: "texte" },
          { id: "volume", titre: "Volume par mois", type: "nombre" },
          { id: "minutes", titre: "Minutes gagnées par unité", type: "nombre" },
          { id: "heures", titre: "Heures par mois", type: "calcul", formule: "volume * minutes / 60" },
          { id: "cout_horaire", titre: "Coût horaire chargé (€)", type: "nombre" },
          { id: "valeur", titre: "Valeur par mois (€)", type: "calcul", formule: "heures * cout_horaire" },
          { id: "mesure", titre: "Mesuré par, quand", type: "texte", aide: "Un responsable métier, une date après la bascule." }
        ],
        alertes: [
          { si: "mesure vide", message: "Chaque gain : un responsable métier et une date de mesure." }
        ],
        totaux: [
          { libelle: "Heures par mois", calcul: "somme", colonne: "heures" },
          { libelle: "Valeur par mois (€)", calcul: "somme", colonne: "valeur" }
        ] },
      { id: "gains_qualitatifs", titre: "Gains qualitatifs", type: "texte-long", aide: "À part : pas d'euros inventés." },
      { id: "risques", titre: "Risques", type: "texte-long" },
      { id: "hypotheses", titre: "Hypothèses", type: "texte-long", aide: "Volumes, minutes, coût horaire, dates." },
      { id: "recommandation", titre: "Ta recommandation", type: "texte-long" },
      { id: "validation", titre: "Validé par", type: "texte" }
    ],
    alertes: [
      { si: "options vide", message: "Donne 2 ou 3 options ; « ne rien faire » quand la loi le permet." },
      { si: "nb_options = 1", message: "Une seule option : ce n'est pas un choix. Donne 2 ou 3 options." },
      { si: "hypotheses vide", message: "Écris les hypothèses : volumes, minutes, coût horaire, dates." },
      { si: "temps_interne vide", message: "Le temps interne compte : écris-le en jours." }
    ],
    exemple: {
      nom: "DEMAT 2027",
      rubriques: {
        probleme: "La loi : recevoir des factures électroniques est obligatoire depuis le 1er septembre 2026 ; les émettre le sera au 1er septembre 2027. « Ne rien faire » est impossible : on compare des façons de s'y conformer.",
        duree: "3 ans : la durée du contrat de la PA.",
        options: [
          { option: "A. Portail de la PA seul", contenu: "Les factures fournisseurs sont ressaisies dans Divalto.", cout: 45000, jours_internes: "",
            surcout: 0, gain_mois: 0, gain_en: "" },
          { option: "B. Connecteur standard dans Divalto", contenu: "Le connecteur pour le gros des factures, le portail pour le reste.", cout: 80000,
            jours_internes: 100, surcout: 35000, gain_mois: 3000, gain_en: "Temps" }
        ],
        tco: [
          { poste: "Abonnement de la PA (mois)", quantite: 36, prix: 850, nature: "Run" },
          { poste: "Mise en service du connecteur, forfait", quantite: 1, prix: 7400, nature: "Mise en place" },
          { poste: "Intégrateur, en régie (jours)", quantite: 40, prix: 750, nature: "Mise en place" },
          { poste: "Formation et tests", quantite: 1, prix: 4000, nature: "Mise en place" },
          { poste: "Réserve pour risques (liée au registre)", quantite: 1, prix: 8000, nature: "Réserve" }
        ],
        temps_interne: 100,
        gains: [
          { gain: "Fin de la ressaisie des factures fournisseurs", volume: 2000, minutes: 3, cout_horaire: 30,
            mesure: "La cheffe comptable, septembre 2027 (3e mois)" }
        ],
        gains_qualitatifs: "Conformité ; clôture plus sereine ; image auprès d'AquaBleu.",
        risques: "Retard du connecteur (plan B : le portail de la PA, prévu au contrat) ; un seul consultant connaît le paramétrage ; hausse de prix au renouvellement de 2029.",
        hypotheses: "8 000 factures par mois, dont 2 000 fournisseurs. Ressaisie : 4 minutes par facture ; avec le connecteur : 1 minute de contrôle. Coût horaire chargé d'une comptable : 30 €. Gain plein quand les fournisseurs PME émettent (1er septembre 2027). Prix des contrats de novembre 2026.",
        recommandation: "B : 35 k€ de plus que A sur 3 ans, et 100 heures de compta rendues par mois (en temps). Surcoût couvert en 12 mois environ, à partir du gain plein (septembre 2027).",
        validation: "Le DAF, novembre 2026, après les contrats (80 k€)."
      }
    },
    export: ["excel", "copier", "imprimer"]
  }
]);
