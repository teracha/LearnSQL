// Outil PROVISOIRE (pilote du moteur, docs/outils.md) : la matrice RACI, d'après le cours cp09.
// Règles du cours : R = Réalise, A = Approuve, C = Consulté, I = Informé ; un seul A par livrable (« deux A, c'est
// aucun ») ; pas de livrable sans A ; au moins un R (consigne du pilote). Une valeur par case.
// Exemple : le RACI de DEMAT 2027 (fiche fil rouge de docs/plan-chef-de-projet.md, cours cp09) ; en mars, le planning
// de formation de la compta n'a pas encore de A (cours cp09, « Les règles du RACI »), d'où une alerte.
LEARNSQL.outils = (LEARNSQL.outils || []).concat([
  {
    id: "gp-raci",
    sujet: "gestion-projet",
    titre: "Matrice RACI",
    resume: "Dire, pour chaque livrable, qui réalise, qui approuve, qui est consulté et qui est informé.",
    quand: "Au cadrage : chaque A accepte son rôle, puis le sponsor valide. Ensuite, à chaque nouveau livrable ou départ.",
    etapes: [
      "Mets les livrables en lignes et les personnes en colonnes.",
      "Dans chaque case utile : R, A, C ou I. Un seul A par livrable.",
      "Lis les alertes, puis fais valider le RACI."
    ],
    cours: ["cp09"],
    type: "matrice",
    ligne: { titre: "Livrable", pluriel: "Livrables", aide: "Un livrable ou une décision : format de facture, PV de recette…" },
    colonne: { titre: "Personne", pluriel: "Personnes", aide: "Une personne ou un rôle : le DAF, la cheffe comptable…" },
    valeurs: ["R", "A", "C", "I"],
    libelles: ["Réalise", "Approuve", "Consulté", "Informé"],
    alertes: [
      { si: "nb(\"A\") > 1", message: "Plus d'un A : deux A, c'est aucun." },
      { si: "nb(\"A\") = 0", message: "Pas de A : personne ne valide ce livrable." },
      { si: "nb(\"R\") = 0", message: "Pas de R : personne ne réalise ce livrable." }
    ],
    exemple: {
      nom: "DEMAT 2027",
      colonnes: ["Toi", "Intégrateur", "DAF", "Cheffe comptable", "Responsable ADV", "Julie", "Sophie", "Marc", "Ton DSI", "DG"],
      lignes: [
        { nom: "Format de facture", cases: ["R", "R", "A", "C", "C", "", "", "", "I", ""] },
        { nom: "PV de recette fournisseurs", cases: ["", "", "", "A", "", "R", "", "", "", ""] },
        { nom: "PV de recette clients", cases: ["", "", "", "", "A", "", "R", "R", "", ""] },
        { nom: "Go / no-go de la bascule", cases: ["R", "", "A", "C", "C", "", "", "", "C", "I"] },
        { nom: "Planning de formation de la compta", cases: ["R", "", "", "", "", "", "", "", "", ""] }
      ]
    },
    export: ["excel", "copier", "imprimer"]
  }
]);
