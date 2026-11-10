// Outil « Matrice RACI » (docs/outils.md), défini par l'expert chef de projet d'après le cours cp09.
// Règles du cours : R = Réalise, A = Approuve, C = Consulté (avant, pas de veto), I = Informé (après) (§3) ; un seul A par
// livrable, « deux A, c'est aucun » ; pas de livrable sans A (§4). Décision du superviseur : seulement ces deux règles
// en alerte (pas « au moins un R », pas « trop de C » : elles ne viennent pas des cours).
// Exemple : le RACI de la fiche DEMAT 2027, plus « Reprise des fiches clients » (cp20) et le planning de formation de la
// compta après sa mise à jour (cp09 §4 : « Tu proposes la cheffe comptable »).
LEARNSQL.outils = (LEARNSQL.outils || []).concat([
  {
    id: "gp-raci",
    sujet: "gestion-projet",
    titre: "Matrice RACI",
    resume: "Dire, pour chaque livrable, qui réalise, qui approuve, qui est consulté et qui est informé.",
    quand: "Au cadrage, validé par le sponsor. Puis à chaque nouveau livrable, départ ou congé.",
    etapes: [
      "Une ligne par livrable, une colonne par personne ou par rôle.",
      "Mets R, A, C ou I. Un seul A par livrable ; pour un livrable du métier, l'A vient du métier.",
      "Relis-le avec chaque A, puis fais-le valider par le sponsor."
    ],
    cours: ["cp09", "ot01"],
    type: "matrice",
    ligne: { titre: "Livrable", pluriel: "Livrables", aide: "Une chose qu'on remet et qu'on valide." },
    colonne: { titre: "Personne", pluriel: "Personnes et rôles", aide: "Une personne ou un rôle : le DAF, la cheffe comptable…" },
    valeurs: ["R", "A", "C", "I"],
    libelles: ["Réalise", "Approuve", "Consulté", "Informé"],
    aides: [
      "Fait le travail. Il peut y en avoir plusieurs.",
      "Valide et répond du résultat. Un seul par livrable.",
      "Donne son avis AVANT la décision. Pas de veto.",
      "Apprend la décision APRÈS."
    ],
    alertes: [
      { si: "nb(\"A\") > 1", message: "Deux A, c'est aucun : un seul A par livrable." },
      { si: "nb(\"A\") = 0", message: "Personne n'approuve ce livrable : mets un A." }
    ],
    exemple: {
      nom: "DEMAT 2027",
      colonnes: ["Toi", "Intégrateur", "DAF", "Cheffe comptable", "Responsable ADV", "Julie", "Sophie", "Marc", "Ton DSI", "DG"],
      lignes: [
        { nom: "Format de facture", cases: ["R", "R", "A", "C", "C", "", "", "", "I", ""] },
        { nom: "PV de recette fournisseurs", cases: ["", "", "I", "A", "", "R", "", "", "", ""] },
        { nom: "PV de recette clients", cases: ["", "", "", "", "A", "", "R", "R", "", ""] },
        { nom: "Go / no-go de la bascule", cases: ["R", "", "A", "C", "C", "", "", "", "C", "I"] },
        { nom: "Budget et dates validées", cases: ["R", "", "A", "", "", "", "", "", "", ""] },
        { nom: "Reprise des fiches clients", cases: ["", "R", "", "", "A", "", "", "", "", ""] },
        { nom: "Planning de formation de la compta", cases: ["R", "", "", "A", "", "", "", "", "", ""] }
      ]
    },
    export: ["excel", "copier", "imprimer"]
  }
]);
