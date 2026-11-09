// Outil « Compte rendu de réunion » (docs/outils.md), défini par l'expert chef de projet d'après les cours cp09 et cp17.
// Règles des cours : « Compte rendu sous 24 h : décisions, actions, points ouverts » ; un « peut-être » est un point
// ouvert ; chaque décision reformulée (cp09 §5-6) ; « Pas le récit de la réunion » (cp17 §7) ; chaque action a un nom et
// une date (cp08 §5) ; « fait, ou pas ? » (cp15 §1). Exemple : le COPIL du mardi 9 février 2027 (cp09, cp10).
LEARNSQL.outils = (LEARNSQL.outils || []).concat([
  {
    id: "gp-compte-rendu",
    sujet: "gestion-projet",
    titre: "Compte rendu de réunion",
    resume: "Écrire, sous 24 h, les décisions, les actions et les points ouverts d'une réunion.",
    quand: "Après chaque COPIL, point projet ou comité fournisseur. Pas le récit de la réunion.",
    etapes: [
      "En séance, reformule chaque décision à voix haute, avec ses chiffres : « Je note : … C'est bien ça ? »",
      "Écris les décisions, puis les actions : chacune avec un nom et une date.",
      "Un « peut-être » va en point ouvert : ce qui manque, qui l'apporte, pour quand."
    ],
    cours: ["cp09", "cp17"],
    type: "document",
    rubriques: [
      { id: "reunion", titre: "Réunion", type: "texte", aide: "COPIL, point projet, comité fournisseur…" },
      { id: "date", titre: "Date", type: "date" },
      { id: "participants", titre: "Participants", type: "texte-long" },
      { id: "redige_par", titre: "Rédigé par", type: "texte" },
      { id: "envoye_le", titre: "Envoyé le", type: "date", aide: "Sous 24 h. Comité fournisseur : le jour même." },
      { id: "decisions", titre: "Décisions", type: "tableau", ligne: { titre: "Décision" },
        aide: "Chaque décision va aussi au registre des décisions.",
        colonnes: [
          { id: "decision", titre: "Décision", type: "texte-long", aide: "Avec ses chiffres." },
          { id: "qui", titre: "Qui décide", type: "texte" },
          { id: "impact", titre: "Impact", type: "texte", aide: "Délai, coût, périmètre." }
        ] },
      { id: "actions", titre: "Actions", type: "tableau", ligne: { titre: "Action" },
        colonnes: [
          { id: "action", titre: "Action", type: "texte-long", aide: "Une action précise. « Renforcer l'équipe » n'en est pas une." },
          { id: "qui", titre: "Qui", type: "texte", aide: "Un nom." },
          { id: "quand", titre: "Pour quand", type: "date" },
          { id: "fait", titre: "Fait ?", type: "choix", valeurs: ["Non", "Oui"], defaut: "Non" }
        ],
        alertes: [
          { si: "qui vide ou quand vide", message: "Chaque action : un nom et une date." },
          { si: "fait = \"Non\" et quand < aujourdhui", message: "Action en retard : à revoir à la prochaine réunion." }
        ],
        totaux: [
          { libelle: "Actions", calcul: "nombre" },
          { libelle: "Actions pas encore faites", calcul: "nombre", si: "fait = \"Non\"" }
        ] },
      { id: "points_ouverts", titre: "Points ouverts", type: "tableau", ligne: { titre: "Point ouvert" },
        colonnes: [
          { id: "point", titre: "Point ouvert", type: "texte-long" },
          { id: "manque", titre: "Ce qui manque", type: "texte" },
          { id: "qui", titre: "Qui l'apporte", type: "texte" },
          { id: "quand", titre: "Pour quand", type: "date" }
        ],
        alertes: [
          { si: "qui vide ou quand vide", message: "Un point ouvert dit qui apporte quoi, et pour quand." }
        ] }
    ],
    alertes: [
      { si: "envoye_le - date > 1", message: "Envoie le compte rendu sous 24 h." }
    ],
    exemple: {
      nom: "COPIL du 9 février 2027",
      date: "2027-02-10",
      rubriques: {
        reunion: "COPIL DEMAT 2027",
        date: "2027-02-09",
        participants: "Le DAF (il préside et décide), toi (tu animes et tu écris), ton DSI, la cheffe comptable, le responsable ADV.",
        redige_par: "Toi",
        envoye_le: "2027-02-10",
        decisions: [
          { decision: "Changement n° 7 accepté : la référence chantier sur les factures, 4 jours d'intégrateur.", qui: "Le DAF",
            impact: "+ 3 000 € ; 15 tests à refaire avant la recette." },
          { decision: "Changement n° 9 accepté : le code magasin sur les factures, 3 jours d'intégrateur.", qui: "Le DAF",
            impact: "+ 2 250 € ; 6 tests à refaire. Budget de référence : 85 250 € (version 2)." }
        ],
        actions: [
          { action: "Signer les commandes des changements n° 7 et n° 9.", qui: "Le DAF", quand: "2027-02-10", fait: "Non" },
          { action: "Mettre à jour le planning, le budget (version 2) et le registre des changements.", qui: "Toi", quand: "2027-02-10", fait: "Non" },
          { action: "Annoncer les décisions à l'ADV, à la compta et à l'intégrateur.", qui: "Toi", quand: "2027-02-11", fait: "Non" },
          { action: "Ajouter au cahier de recette les tests des changements n° 7 et n° 9.", qui: "Sophie", quand: "2027-03-12", fait: "Non" }
        ],
        points_ouverts: [
          { point: "Clôture de mars, début avril, en pleine recette : renfort ou report si la recette glisse ?",
            manque: "La charge de la compta pendant la clôture, en heures", qui: "La cheffe comptable", quand: "2027-03-04" }
        ]
      }
    },
    export: ["excel", "copier", "imprimer"]
  }
]);
