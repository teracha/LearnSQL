// Outil « Fiche du lundi et charge » (docs/outils.md), défini par l'expert chef de projet d'après les cours cp02 et cp03.
// Règles des cours : la fiche du point du lundi avec ton DSI : « ce qui avance, ce qui coince (et ce qui va coincer), ce
// dont tu as besoin de lui. Pas la liste de tes tâches. Tout va bien ? Dis-le en 2 minutes » ; une mauvaise nouvelle, il
// l'apprend par toi, le jour même (cp03 §4) ; « Pour ton temps, ajoute ton run de la semaine passée, en demi-journées »
// (cp02 §4) ; « Ta charge = tout ce que tu as à faire (projet, run, formation), en demi-journées, divisé par 10. Une
// journée, c'est 2 demi-journées » ; un pic court (11 sur 10, puis 9), sans échéance menacée : tu glisses ce qui peut
// attendre ; au-delà (120 %, plusieurs semaines, une échéance en jeu) : tu le dis tôt à ton DSI, au point du lundi
// (cp02 §5, q27 à q29) ; un écart d'une semaine sur le partage se note, s'il dure ton DSI arbitre (cp02 §6, q11, q12).
// Exemple : le point du lundi 8 mars 2027 (cp02 §5 et q28 : 9 + 3 = 12 demi-journées pour 10, 120 %).
LEARNSQL.outils = (LEARNSQL.outils || []).concat([
  {
    id: "gp-lundi",
    sujet: "gestion-projet",
    titre: "Fiche du lundi et charge",
    resume: "Préparer le point du lundi avec ton DSI : ce qui avance, ce qui coince, ton besoin, et ta charge en demi-journées.",
    quand: "Chaque lundi, avant le point de 30 minutes avec ton DSI. Une mauvaise nouvelle n'attend pas lundi : il l'apprend par toi, le jour même.",
    etapes: [
      "Écris ce qui avance, ce qui coince (et ce qui va coincer), ce dont tu as besoin de lui. Pas la liste de tes tâches.",
      "Compte ta semaine en demi-journées : projet, run, formation. Une journée = 2 demi-journées. Note aussi la semaine passée.",
      "Au-delà d'un pic court (11 sur 10, puis 9, sans échéance menacée) : dis-le à ton DSI, avec ce qui glisse ou pas. Il choisit."
    ],
    cours: ["cp02", "cp03"],
    type: "document",
    rubriques: [
      { id: "lundi", titre: "Point du lundi", type: "date" },
      { id: "avance", titre: "Ce qui avance", type: "texte-long", aide: "Des faits : livrables finis, jalons tenus. Tout va bien ? Dis-le en 2 minutes." },
      { id: "coince", titre: "Ce qui coince, et ce qui va coincer", type: "texte-long", aide: "Le problème, son impact, ton plan." },
      { id: "besoin", titre: "Ce dont tu as besoin de lui", type: "texte-long",
        aide: "Un avis, une aide, un arbitrage : avec tes options et ta recommandation." },
      { id: "temps", titre: "Ton temps, en demi-journées", type: "tableau", ligne: { titre: "Activité", pluriel: "Activités" },
        colonnes: [
          { id: "activite", titre: "Activité", type: "texte", aide: "Le projet, le run, une formation : tout ce que tu as à faire." },
          { id: "partage", titre: "Partage prévu (sur 10)", type: "nombre", aide: "Celui fixé avec ton DSI. Ex. : 7 sur le projet, 3 sur le run." },
          { id: "passee", titre: "Semaine passée", type: "nombre", aide: "Ton temps réel, noté, en demi-journées." },
          { id: "semaine", titre: "Cette semaine", type: "nombre", aide: "Ce que tu as à faire, en demi-journées. Une journée = 2 demi-journées." },
          { id: "charge", titre: "Charge (%)", type: "calcul", formule: "semaine / 10 * 100" }
        ],
        modele: [{ activite: "Projet" }, { activite: "Run" }],
        alertes: [
          { si: "passee > partage",
            message: "Plus que le partage prévu : un écart d'une semaine se note. S'il dure, ton DSI arbitre, faits en main." }
        ],
        totaux: [
          { libelle: "Semaine passée (sur 10)", calcul: "somme", colonne: "passee" },
          { libelle: "Cette semaine (sur 10)", calcul: "somme", colonne: "semaine" },
          { id: "charge_totale", libelle: "Ta charge (%)", calcul: "somme", colonne: "charge",
            niveaux: [
              { max: 100, libelle: "Dans tes 10", couleur: "ok" },
              { max: 110, libelle: "Pic court", couleur: "attention" },
              { libelle: "Au-delà : ton DSI", couleur: "ko" }
            ] }
        ],
        aideTotaux: "Ta charge = tout ce que tu as à faire, en demi-journées, divisé par 10. 11 sur 10, puis 9, sans échéance menacée : un pic court, tu glisses ce qui peut attendre. Au-delà, plusieurs semaines de suite, ou une échéance en jeu : ton DSI, au point du lundi." }
    ],
    alertes: [
      { si: "charge_totale > 110 et besoin vide",
        message: "Plus de 11 sur 10 : dis-le à ton DSI, dans « Ce dont tu as besoin » : ce qui ne glisse pas, ce qui peut glisser. Il choisit." }
    ],
    exemple: {
      nom: "Point du 8 mars 2027",
      date: "2027-03-08",
      rubriques: {
        lundi: "2027-03-08",
        avance: "Connecteur livré le 1er mars, à la date du contrat. Changement n° 7 fait, n° 9 en cours. Les 120 cas de test sont prêts pour la recette du 16 mars.",
        coince: "Reprise des tiers : 260 rejets à l'essai 1 ; les règles passent en version 2, avec l'ADV et la cheffe comptable. Va coincer : la clôture de mars, début avril, en pleine recette.",
        besoin: "Ton choix : je suis à 120 % cette semaine. Ne glisse pas : la recette du 16 mars. Peut glisser : la doc d'un flux EDI.",
        temps: [
          { activite: "DEMAT 2027", partage: 7, passee: 7, semaine: 9 },
          { activite: "Run : flux EDI et petites demandes", partage: 3, passee: 3, semaine: 3 }
        ]
      }
    },
    export: ["excel", "copier", "imprimer"]
  }
]);
