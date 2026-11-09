// Outil PROVISOIRE (pilote du moteur, docs/outils.md) : le compte rendu de réunion, d'après les cours cp09 et cp17.
// Règles des cours : « Compte rendu sous 24 h : décisions, actions (qui, quoi, pour quand), points ouverts. »
// « Un point pas tranché faute d'info : un point ouvert. » Les décisions d'abord, avec leurs chiffres.
// Exemple : le COPIL de DEMAT 2027 du mardi 9 février 2027 (cours cp09) ; son compte rendu part le 10 février.
LEARNSQL.outils = (LEARNSQL.outils || []).concat([
  {
    id: "gp-compte-rendu",
    sujet: "gestion-projet",
    titre: "Compte rendu de réunion",
    resume: "Écrire, sous 24 h, les décisions, les actions et les points ouverts d'une réunion.",
    quand: "Après chaque COPIL ou point projet : le compte rendu part sous 24 h.",
    etapes: [
      "Note la date, l'objet et les participants.",
      "Écris les décisions d'abord, puis les actions : quoi, qui, pour quand.",
      "Ce qui n'est pas tranché va dans les points ouverts. Envoie sous 24 h."
    ],
    cours: ["cp09", "cp17"],
    type: "document",
    rubriques: [
      { id: "date", titre: "Date de la réunion", type: "date" },
      { id: "objet", titre: "Objet", type: "texte", aide: "Ex. : COPIL DEMAT 2027 de février." },
      { id: "participants", titre: "Participants", type: "texte-long" },
      { id: "decisions", titre: "Décisions", type: "liste", ligne: { titre: "Décision" }, aide: "Une décision par ligne, avec ses chiffres." },
      { id: "actions", titre: "Actions", type: "tableau", ligne: { titre: "Action" },
        colonnes: [
          { id: "action", titre: "Action", type: "texte-long", aide: "Quoi." },
          { id: "qui", titre: "Qui", type: "texte" },
          { id: "quand", titre: "Pour quand", type: "date" },
          { id: "statut", titre: "Statut", type: "choix", valeurs: ["À faire", "En cours", "Fait"], defaut: "À faire" }
        ],
        alertes: [
          { si: "action non vide et (qui vide ou quand vide)", message: "Action sans « qui » ou sans « pour quand »." }
        ],
        totaux: [
          { libelle: "Actions", calcul: "nombre" },
          { libelle: "Actions pas encore faites", calcul: "nombre", si: "non (statut = \"Fait\")" }
        ] },
      { id: "points", titre: "Points ouverts", type: "liste", ligne: { titre: "Point ouvert" },
        aide: "Ce qui manque pour décider, qui l'apporte, pour quand." }
    ],
    alertes: [
      { si: "date vide", message: "Date de la réunion manquante." }
    ],
    exemple: {
      nom: "COPIL du 9 février 2027",
      rubriques: {
        date: "2027-02-09",
        objet: "COPIL DEMAT 2027 de février",
        participants: "Le DAF (préside et décide), toi (animes et écris le compte rendu), ton DSI, la cheffe comptable, le responsable ADV.",
        decisions: ["Changements n° 7 et n° 9 acceptés : 7 jours d'intégrateur, 5 250 €. Commandes à signer."],
        actions: [
          { action: "Signer les commandes des changements n° 7 et n° 9.", qui: "Le DAF", quand: "2027-02-12", statut: "À faire" },
          { action: "Écrire la décision au registre des décisions.", qui: "Toi", quand: "2027-02-10", statut: "Fait" },
          { action: "Planifier les 7 jours de l'intégrateur avec le consultant.", qui: "Toi", quand: "", statut: "À faire" }
        ],
        points: []
      }
    },
    export: ["excel", "copier", "imprimer"]
  }
]);
