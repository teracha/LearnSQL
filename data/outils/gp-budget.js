// Outil « Suivi du budget » (docs/outils.md), défini par l'expert chef de projet d'après le cours cp12.
// Règles du cours : la référence poste par poste, que seul le sponsor change (§1) ; engagé, consommé, reste à faire ;
// atterrissage = consommé + reste à faire ; écart = atterrissage − référence (§2) ; chaque commande se suit à part ;
// alerte au DAF à 80 % d'une commande en régie (§3, cp15 §2) ; un écart se dit tôt, avec sa cause et des options (§5) ;
// au-dessus du plafond de tolérance, le DAF décide, prévenu le jour même (cp04 §6, cp12 §1 et §5).
// Exemple : chiffres arrêtés au 31 mars 2027. Ses totaux redonnent ceux de la fiche DEMAT 2027 : référence 85 250 €,
// engagé 81 100 €, consommé 30 350 €, atterrissage 87 500 €, écart + 2 250 €.
LEARNSQL.outils = (LEARNSQL.outils || []).concat([
  {
    id: "gp-budget",
    sujet: "gestion-projet",
    titre: "Suivi du budget",
    resume: "Suivre chaque poste du budget : engagé, consommé, reste à faire, atterrissage et écart.",
    quand: "Chaque mois, avant le COPIL. La régie se suit chaque semaine, au point avec le consultant.",
    etapes: [
      "Une ligne par poste et par commande. La référence ne change que par une décision du sponsor.",
      "Chaque mois : l'engagé, le consommé, et le reste à faire estimé tâche par tâche.",
      "Lis l'atterrissage et l'écart. Un écart se dit tôt, avec sa cause et des options."
    ],
    cours: ["cp12", "cp15"],
    type: "document",
    rubriques: [
      { id: "projet", titre: "Projet", type: "texte" },
      { id: "arrete_au", titre: "Chiffres arrêtés au", type: "date" },
      { id: "reference_version", titre: "Référence validée", type: "texte", aide: "La version, la date et la décision du sponsor." },
      { id: "plafond", titre: "Plafond de tolérance (€)", type: "nombre", aide: "Au-delà, le DAF décide, prévenu le jour même." },
      { id: "postes", titre: "Postes", type: "tableau", ligne: { titre: "Poste" },
        colonnes: [
          { id: "poste", titre: "Poste", type: "texte", aide: "Une ligne par poste, et une par commande." },
          { id: "reference", titre: "Référence (€)", type: "nombre", aide: "Le budget validé." },
          { id: "engage", titre: "Engagé (€)", type: "nombre", aide: "Commandes et avenants signés. En régie, la commande est un plafond." },
          { id: "consomme", titre: "Consommé (€)", type: "nombre", aide: "Le travail fait, facture reçue ou pas." },
          { id: "reste", titre: "Reste à faire (€)", type: "nombre", aide: "Ce qu'il faut encore pour finir, tâche par tâche. Pas « ce qui reste au budget »." },
          { id: "atterrissage", titre: "Atterrissage (€)", type: "calcul", formule: "consomme + reste" },
          { id: "ecart", titre: "Écart (€)", type: "calcul", formule: "atterrissage - reference",
            niveaux: [{ max: 0, libelle: "Dans la référence", couleur: "ok" }, { libelle: "Écart", couleur: "attention" }] },
          { id: "cause", titre: "Cause de l'écart", type: "texte", aide: "Obligatoire dès qu'il y a un écart." }
        ],
        alertes: [
          { si: "ecart <> 0 et cause vide", message: "Écart sans cause : écris-la." },
          { si: "consomme > engage", message: "Du travail fait sans commande ? Une commande ou un avenant se signe avant." },
          { si: "engage > 0 et atterrissage > engage",
            message: "L'atterrissage dépasse la commande : préviens le DAF tout de suite, avec des options. Des jours en plus = une commande signée avant." },
          { si: "engage > 0 et consomme >= engage * 0.8 et reste > 0",
            message: "80 % de cette commande consommés : en régie, préviens le DAF (2 lignes), même si tout tient." }
        ],
        totaux: [
          { id: "total_reference", libelle: "Référence (€)", calcul: "somme", colonne: "reference" },
          { id: "total_engage", libelle: "Engagé (€)", calcul: "somme", colonne: "engage" },
          { id: "total_consomme", libelle: "Consommé (€)", calcul: "somme", colonne: "consomme" },
          { id: "total_reste", libelle: "Reste à faire (€)", calcul: "somme", colonne: "reste" },
          { id: "total_atterrissage", libelle: "Atterrissage (€)", calcul: "somme", colonne: "atterrissage" },
          { id: "total_ecart", libelle: "Écart (€)", calcul: "somme", colonne: "ecart" }
        ],
        aideTotaux: "La ligne du COPIL : référence, engagé, consommé, atterrissage, écart et sa cause, réserve." }
    ],
    alertes: [
      { si: "total_atterrissage > plafond", message: "L'atterrissage dépasse le plafond : le DAF décide, prévenu le jour même." }
    ],
    exemple: {
      nom: "DEMAT 2027, fin mars",
      date: "2027-03-31",
      rubriques: {
        projet: "DEMAT 2027",
        arrete_au: "2027-03-31",
        reference_version: "Version 2 du 9 février 2027 (changements n° 7 et n° 9)",
        plafond: 90000,
        postes: [
          { poste: "PA : abonnement (36 mois × 850 €)", reference: 30600, engage: 30600, consomme: 3400, reste: 27200, cause: "" },
          { poste: "PA : mise en service, forfait", reference: 7400, engage: 7400, consomme: 3700, reste: 3700, cause: "" },
          { poste: "PA : archivage (avenant de mars)", reference: 0, engage: 1600, consomme: 0, reste: 1600,
            cause: "Avenant d'archivage (32 mois × 50 €), payé sur la réserve : décision du DAF." },
          { poste: "Intégrateur : commande de base (40 jours)", reference: 30000, engage: 30000, consomme: 18000, reste: 12000, cause: "" },
          { poste: "Intégrateur : changements n° 7 et n° 9 (7 jours)", reference: 5250, engage: 5250, consomme: 5250, reste: 0, cause: "" },
          { poste: "Intégrateur : commande de 3 jours (30 mars)", reference: 0, engage: 2250, consomme: 0, reste: 2250,
            cause: "Flux EDI sous-estimés : 43 jours au lieu de 40. Commande signée par le DAF." },
          { poste: "Formation et tests", reference: 4000, engage: 4000, consomme: 0, reste: 4000, cause: "" },
          { poste: "Réserve pour risques", reference: 8000, engage: 0, consomme: 0, reste: 6400, cause: "1 600 € pris pour l'archivage." }
        ]
      }
    },
    export: ["excel", "copier", "imprimer"]
  }
]);
