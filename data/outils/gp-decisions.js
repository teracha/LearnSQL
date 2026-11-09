// Outil « Registre des décisions » (docs/outils.md), défini par l'expert chef de projet d'après le cours cp09.
// Règles du cours : une ligne par décision : la date, la décision, qui l'a prise, l'impact ; les décisions du COPIL, du
// DAF et des A du RACI, où qu'elles soient prises ; une décision de couloir confirmée par écrit ; une décision écrite ne
// se refait pas, sauf fait nouveau (cp09 §6) ; un accord oral s'écrit le jour même (cp17 §7).
// La colonne « Où » s'appelle lieu : « ou » est un mot réservé des formules. Exemple : le registre au 11 juin 2027.
LEARNSQL.outils = (LEARNSQL.outils || []).concat([
  {
    id: "gp-decisions",
    sujet: "gestion-projet",
    titre: "Registre des décisions",
    resume: "Garder une trace de chaque décision : la date, la décision, qui l'a prise, l'impact.",
    quand: "Après chaque COPIL, et après chaque décision prise au téléphone, dans un couloir ou par mail.",
    etapes: [
      "Une ligne par décision du sponsor, du COPIL ou d'un A du RACI. Les choix d'équipe restent dans les actions.",
      "Décision orale : fais-la confirmer par écrit le jour même (« Comme convenu ce matin : … »).",
      "Une décision écrite ne se refait pas au COPIL suivant, sauf fait nouveau."
    ],
    cours: ["cp09"],
    type: "tableau",
    ligne: { titre: "Décision" },
    colonnes: [
      { id: "date", titre: "Date", type: "date", aide: "Le jour de la décision." },
      { id: "decision", titre: "Décision", type: "texte-long", aide: "Avec ses chiffres." },
      { id: "qui", titre: "Qui l'a prise", type: "texte", aide: "Le sponsor, le COPIL, l'A du RACI." },
      { id: "lieu", titre: "Où", type: "choix", valeurs: ["COPIL", "Séance courte", "Téléphone", "Couloir", "Mail", "Autre"] },
      { id: "impact", titre: "Impact", type: "texte", aide: "Délai, coût, périmètre." },
      { id: "trace", titre: "Trace écrite", type: "choix", valeurs: ["Compte rendu", "Écrit (mail)", "À faire"],
        aide: "Orale ? « Comme convenu ce matin : … »" }
    ],
    alertes: [
      { si: "qui vide", message: "Qui a décidé ? Sans nom, la décision sera contestée." },
      { si: "trace vide ou trace = \"À faire\"", message: "Fais confirmer cette décision par écrit, le jour même." }
    ],
    totaux: [
      { libelle: "Décisions", calcul: "nombre" },
      { libelle: "Trace écrite à faire", calcul: "nombre", si: "trace = \"À faire\"" }
    ],
    exemple: {
      nom: "DEMAT 2027",
      date: "2027-06-11",
      lignes: [
        { date: "2027-02-09", decision: "Changements n° 7 et n° 9 acceptés.", qui: "Le DAF", lieu: "COPIL",
          impact: "+ 7 jours d'intégrateur, 5 250 € ; référence 85 250 €.", trace: "Compte rendu" },
        { date: "2027-03-09", decision: "Avenant d'archivage : 50 € par mois, d'avril 2027 à novembre 2029, payé sur la réserve.", qui: "Le DAF", lieu: "COPIL",
          impact: "+ 1 600 € engagés ; réserve 6 400 €.", trace: "Compte rendu" },
        { date: "2027-03-29", decision: "Commande de 3 jours d'intégrateur (flux EDI sous-estimés).", qui: "Le DAF", lieu: "Téléphone",
          impact: "+ 2 250 € ; atterrissage 87 500 €, sous 90 k€.", trace: "Écrit (mail)" },
        { date: "2027-04-09", decision: "Signataire du PV fournisseurs désigné pendant le congé de la cheffe comptable (pas Julie).",
          qui: "La cheffe comptable (A du PV)", lieu: "Mail", impact: "RACI mis à jour du 12 au 30 avril.", trace: "Écrit (mail)" },
        { date: "2027-04-13", decision: "Intérimaire pour la recette refusé (environ 4 000 €).", qui: "Le DAF", lieu: "COPIL",
          impact: "0 € ; PV prévu le 7 mai, dans la tolérance.", trace: "Compte rendu" },
        { date: "2027-05-11", decision: "Critères de go de la bascule validés (6 critères).", qui: "Le DAF", lieu: "COPIL",
          impact: "Go / no-go le 11 juin, sur ces critères.", trace: "Compte rendu" },
        { date: "2027-06-11", decision: "Go pour la bascule du lundi 14 juin.", qui: "Le DAF, sur ta recommandation", lieu: "Séance courte",
          impact: "Bascule le 14 juin ; retour arrière possible jusqu'au lundi 12 h.", trace: "Compte rendu" }
      ]
    },
    export: ["excel", "copier", "imprimer"]
  }
]);
