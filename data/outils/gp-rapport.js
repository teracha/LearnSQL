// Outil « Rapport du COPIL et météo » (docs/outils.md), défini par l'expert chef de projet d'après les cours cp08 et cp09.
// Règles des cours : une page par mois, le même modèle, envoyée 3 jours ouvrés avant le COPIL ; en tête les décisions
// attendues, ou « Aucune décision attendue » ; chiffres arrêtés à une date (cp08 §4) ; météo par axe (vert : dans les
// tolérances ; orange : risque d'en sortir ; rouge : hors tolérance, le sponsor décide) et globale = l'axe le plus
// mauvais, règle de DEMAT (cp08 §3) ; jalon : prévu, réel, prévision (cp08 §1) ; tolérance ± 2 semaines par jalon
// (cp04 §6 : décision du superviseur, l'avance compte comme le retard) ; ordre du jour (cp09 §5) ; ligne budget (cp12).
// Exemple : le rapport du COPIL du mardi 13 avril 2027, chiffres arrêtés au 31 mars.
LEARNSQL.outils = (LEARNSQL.outils || []).concat([
  {
    id: "gp-rapport",
    sujet: "gestion-projet",
    titre: "Rapport du COPIL et météo",
    resume: "Une page par mois pour le COPIL : les décisions attendues, la météo, les jalons, les risques, le budget.",
    quand: "Chaque mois, envoyé avec l'ordre du jour 3 jours ouvrés avant le COPIL (le jeudi pour un COPIL le mardi). Le même modèle, même quand tout est vert.",
    etapes: [
      "Arrête les chiffres à une date. En tête, les décisions attendues, ou « Aucune décision attendue. »",
      "Donne une couleur à chacun des 4 axes, d'après les seuils, pas d'après l'humeur.",
      "Reporte les jalons, les 5 plus gros risques et la ligne budget, puis envoie. Duplique le rapport le mois suivant."
    ],
    cours: ["cp08", "cp09", "cp05"],
    type: "document",
    rubriques: [
      { id: "copil", titre: "COPIL du", type: "date" },
      { id: "arrete_au", titre: "Chiffres arrêtés au", type: "date" },
      { id: "ordre_du_jour", titre: "Ordre du jour", type: "texte-long",
        defaut: "1. Décisions (40 min) · 2. Les 5 plus gros risques (20 min) · 3. Le rapport, déjà lu : questions (20 min) · 4. Actions et dates (10 min)" },
      { id: "decisions", titre: "Décisions attendues", type: "tableau", ligne: { titre: "Décision" },
        colonnes: [
          { id: "question", titre: "Décision attendue", type: "texte-long", aide: "Une question à trancher." },
          { id: "prix", titre: "Son prix", type: "texte", aide: "Délai, coût, risque." },
          { id: "recommandation", titre: "Ta recommandation", type: "texte" },
          { id: "quand", titre: "Pour quand", type: "date" }
        ] },
      { id: "meteo", titre: "Météo", type: "tableau", ligne: { titre: "Axe" },
        aide: "Vert : dans les tolérances. Orange : risque d'en sortir ; la cause, l'impact, le plan. Rouge : hors tolérance, ou seuil déjà perdu ; le sponsor doit décider. Rouge jusqu'à sa décision.",
        colonnes: [
          { id: "axe", titre: "Axe", type: "texte" },
          { id: "couleur", titre: "Couleur", type: "choix", valeurs: [1, 2, 3], libelles: ["Vert", "Orange", "Rouge"], couleurs: ["ok", "attention", "ko"],
            aide: "Vert : dans les tolérances. Orange : risque d'en sortir. Rouge : hors tolérance ; le sponsor décide." },
          { id: "pourquoi", titre: "Pourquoi", type: "texte-long", aide: "La cause et l'impact." },
          { id: "plan", titre: "Plan ou décision", type: "texte-long" }
        ],
        modele: [{ axe: "Délai" }, { axe: "Budget" }, { axe: "Périmètre" }, { axe: "Qualité et risques" }],
        alertes: [
          { si: "couleur >= 2 et pourquoi vide", message: "Orange ou rouge : écris la cause, l'impact et le plan." },
          { si: "couleur = 3", message: "Rouge : le sponsor doit décider. Sa décision est en tête du rapport, et le DAF le sait déjà." }
        ],
        totaux: [
          { libelle: "Météo globale : l'axe le plus mauvais", calcul: "max", colonne: "couleur",
            niveaux: [{ max: 1, libelle: "Vert", couleur: "ok" }, { max: 2, libelle: "Orange", couleur: "attention" }, { max: 3, libelle: "Rouge", couleur: "ko" }] }
        ] },
      { id: "tolerance", titre: "Tolérance d'un jalon, en jours (±)", type: "nombre", defaut: 14,
        aide: "Celle de la note de cadrage : ± 2 semaines = 14 jours, en retard ou en avance." },
      { id: "jalons", titre: "Jalons", type: "tableau", ligne: { titre: "Jalon" },
        colonnes: [
          { id: "jalon", titre: "Jalon", type: "texte", aide: "Une date et un livrable vérifiable." },
          { id: "prevu", titre: "Prévu", type: "date", aide: "La référence. Seul le sponsor la change." },
          { id: "reel", titre: "Réel", type: "date" },
          { id: "prevision", titre: "Prévision", type: "date", aide: "La date prévue aujourd'hui. Jalon tenu : la date réelle." },
          { id: "ecart", titre: "Écart, en jours", type: "calcul", formule: "prevision - prevu" },
          { id: "reste", titre: "Reste de tolérance, en jours", type: "calcul", formule: "tolerance - abs(ecart)",
            niveaux: [{ sous: 0, libelle: "Hors tolérance", couleur: "ko" }, { libelle: "Dans la tolérance", couleur: "ok" }] }
        ],
        alertes: [
          { si: "reste < 0", message: "Jalon hors tolérance : le délai est rouge, et le DAF le sait le jour même." },
          { si: "reel vide et prevision vide", message: "Donne une prévision : la date prévue aujourd'hui." }
        ] },
      { id: "risques", titre: "Les 5 plus gros risques", type: "tableau", ligne: { titre: "Risque" },
        colonnes: [
          { id: "risque", titre: "Risque", type: "texte-long" },
          { id: "note", titre: "Note", type: "choix", aide: "Probabilité × impact, comme au registre des risques.",
            valeurs: [1, 2, 3, 4, 6, 9], libelles: ["On surveille", "On surveille", "Action simple", "Action simple", "Priorité", "Priorité"],
            couleurs: ["ok", "ok", "attention", "attention", "ko", "ko"] },
          { id: "action", titre: "Action", type: "texte-long" },
          { id: "proprietaire", titre: "Propriétaire", type: "texte" }
        ],
        totaux: [{ libelle: "Risques montrés (5 au plus)", calcul: "nombre" }] },
      { id: "budget", titre: "Ligne budget", type: "tableau", ligne: { titre: "Budget" },
        colonnes: [
          { id: "reference", titre: "Référence (€)", type: "nombre" },
          { id: "engage", titre: "Engagé (€)", type: "nombre" },
          { id: "consomme", titre: "Consommé (€)", type: "nombre" },
          { id: "atterrissage", titre: "Atterrissage (€)", type: "nombre", aide: "Consommé + reste à faire." },
          { id: "ecart", titre: "Écart (€)", type: "calcul", formule: "atterrissage - reference" },
          { id: "cause", titre: "Cause de l'écart", type: "texte" },
          { id: "reserve", titre: "Réserve restante (€)", type: "nombre" },
          { id: "plafond", titre: "Plafond (€)", type: "nombre", aide: "La tolérance : au-delà, le DAF décide." }
        ],
        alertes: [
          { si: "atterrissage > plafond", message: "Hors tolérance du budget : le DAF décide, prévenu le jour même." },
          { si: "ecart <> 0 et cause vide", message: "Écris la cause de l'écart, même sous le plafond." }
        ] }
    ],
    alertes: [
      { si: "arrete_au vide", message: "Écris la date d'arrêt des chiffres." },
      { si: "decisions vide", message: "Rien à décider ? Écris une ligne : « Aucune décision attendue. »" }
    ],
    exemple: {
      nom: "COPIL du 13 avril 2027",
      date: "2027-04-08",
      rubriques: {
        copil: "2027-04-13",
        arrete_au: "2027-03-31",
        ordre_du_jour: "1. Décision : un intérimaire pour la recette ? (40 min) · 2. Les 5 plus gros risques (20 min) · 3. Le rapport, déjà lu : questions (20 min) · 4. Actions et dates (10 min)",
        decisions: [
          { question: "Un intérimaire pour la recette, 2 semaines : oui ou non ?",
            prix: "Environ 4 000 €, payés sur la réserve (il resterait 2 400 €). Sans lui : PV prévu le 7 mai, dans la tolérance.",
            recommandation: "Oui : le PV revient vers le 30 avril, et le pilote démarre le 3 mai, comme prévu.", quand: "2027-04-13" }
        ],
        meteo: [
          { axe: "Délai", couleur: 2, pourquoi: "Flux EDI en retard (1 fini sur 3 prévus) et recette lente : PV prévu le 7 mai au lieu du 30 avril, dans la tolérance.",
            plan: "4 actions datées ; décision attendue sur l'intérimaire." },
          { axe: "Budget", couleur: 1, pourquoi: "Atterrissage 87,5 k€, sous 90 k€. Écart + 2,25 k€ : flux EDI sous-estimés.",
            plan: "Commande de 3 jours signée par le DAF." },
          { axe: "Périmètre", couleur: 1, pourquoi: "Changements n° 7 et n° 9 faits ; aucun à décider.", plan: "" },
          { axe: "Qualité et risques", couleur: 1, pourquoi: "Seuil : les critères de succès (moins de 2 % de rejets le 1er mois). Rien hors seuil.", plan: "" }
        ],
        tolerance: 14,
        jalons: [
          { jalon: "Données de paramétrage envoyées à la PA", prevu: "2027-01-15", reel: "2027-01-15", prevision: "2027-01-15" },
          { jalon: "Connecteur livré", prevu: "2027-03-01", reel: "2027-03-01", prevision: "2027-03-01" },
          { jalon: "PV de recette signé", prevu: "2027-04-30", reel: "", prevision: "2027-05-07" },
          { jalon: "Pilote réussi sur 1 site", prevu: "2027-05-28", reel: "", prevision: "2027-06-04" },
          { jalon: "Bascule des 3 sites", prevu: "2027-06-14", reel: "", prevision: "2027-06-14" }
        ],
        risques: [
          { risque: "La compta, peu disponible (clôture de mars, congé de la cheffe comptable), retarde la recette.", note: 6,
            action: "Créneaux de Julie protégés avec sa cheffe ; décision du DAF sur un intérimaire.", proprietaire: "La cheffe comptable" },
          { risque: "Les 2 flux EDI restants ne sont pas prêts pour le pilote.", note: 6,
            action: "Reste à faire revu flux par flux chaque lundi ; commande de 3 jours signée.", proprietaire: "Toi" },
          { risque: "L'essai 2 de la reprise des tiers échoue (260 rejets à l'essai 1).", note: 6,
            action: "Règles en version 2 ; fiches corrigées dans Divalto par l'ADV ; essai 2 les 15 et 16 mai.", proprietaire: "Le responsable ADV" },
          { risque: "Le e-reporting, hors projet, n'est pas prêt au 1er septembre 2027.", note: 6, action: "Escaladé au DAF, son porteur.", proprietaire: "Le DAF" },
          { risque: "Avoirs fournisseurs : la cheffe comptable absente du 12 au 30 avril.", note: 4,
            action: "Julie formée ; signataire du PV désigné par écrit.", proprietaire: "Le DAF" }
        ],
        budget: [
          { reference: 85250, engage: 81100, consomme: 30350, atterrissage: 87500,
            cause: "Flux EDI sous-estimés ; commande de 3 jours signée par le DAF", reserve: 6400, plafond: 90000 }
        ]
      }
    },
    export: ["excel", "copier", "imprimer"]
  }
]);
