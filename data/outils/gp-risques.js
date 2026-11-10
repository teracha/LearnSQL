// Outil « Registre des risques » (docs/outils.md), défini par l'expert chef de projet d'après les cours cp07 et cp08.
// Règles du cours cp07 : une ligne = cause → risque → conséquence (§3) ; probabilité et impact de 1 (faible) à 3 (fort),
// note = probabilité × impact, de 1 à 9 ; « 6 ou 9 = priorité. 3 ou 4 = une action simple, suivie en revue. 1 ou 2 =
// on accepte, on surveille de loin » (§3) ; un propriétaire nommé (« porteur » est réservé au porteur hors projet d'un
// risque escaladé) ; les 4 réponses et la 5e, escalader (§4) ; repère de 10 à 20 risques actifs (§5) ; déclencheur,
// plan B, revue de 15 minutes, risque arrivé, fermeture (§6). Exemple : point projet du lundi 8 février 2027.
LEARNSQL.outils = (LEARNSQL.outils || []).concat([
  {
    id: "gp-risques",
    sujet: "gestion-projet",
    titre: "Registre des risques",
    resume: "Lister les risques du projet, les noter de 1 à 9, et suivre leur action.",
    quand: "Dès le cadrage. Puis chaque semaine, 15 minutes au point projet, sur ce qui bouge.",
    etapes: [
      "Écris chaque risque : cause → risque → conséquence. Cherche-les à plusieurs, métiers et prestataires.",
      "Note la probabilité et l'impact de 1 à 3. Choisis la plus petite action qui réduit assez le risque.",
      "Donne un propriétaire et une date. Action faite et vérifiée : ferme le risque."
    ],
    cours: ["cp07", "cp08", "ot02"],
    type: "tableau",
    ligne: { titre: "Risque" },
    colonnes: [
      { id: "risque", titre: "Risque", type: "texte-long",
        aide: "« Parce que [cause], il peut arriver que [risque], ce qui entraînerait [conséquence]. »" },
      { id: "proba", titre: "Probabilité", type: "choix", valeurs: [1, 2, 3], libelles: ["Faible", "Moyenne", "Forte"], aide: "Va-t-il arriver ?" },
      { id: "impact", titre: "Impact", type: "choix", valeurs: [1, 2, 3], libelles: ["Faible", "Moyen", "Fort"], aide: "S'il arrive : délai, coût, qualité ?" },
      { id: "note", titre: "Note", type: "calcul", formule: "proba * impact",
        niveaux: [
          { max: 2, libelle: "On surveille", couleur: "ok" },
          { max: 4, libelle: "Action simple", couleur: "attention" },
          { max: 9, libelle: "Priorité", couleur: "ko" }
        ] },
      { id: "reponse", titre: "Réponse et action", type: "texte-long",
        aide: "Éviter, réduire, transférer, accepter, ou escalader (le remettre à son porteur, hors du projet). Puis l'action précise. Accepté : écris-le. Si besoin, un déclencheur daté et le plan B." },
      { id: "proprietaire", titre: "Propriétaire", type: "texte", aide: "Une personne nommée, qui peut agir. Pas « l'équipe ». Jamais la personne absente." },
      { id: "quand", titre: "Pour quand", type: "date", aide: "La date de l'action, ou de la prochaine revue." },
      { id: "statut", titre: "Statut", type: "choix", valeurs: ["Ouvert", "Arrivé", "Fermé"], defaut: "Ouvert",
        aide: "Arrivé : c'est devenu un problème ; plan B lancé, sponsor prévenu. Fermé : action faite et vérifiée." }
    ],
    alertes: [
      { si: "statut <> \"Fermé\" et (reponse vide ou quand vide)",
        message: "Sans action ni date, c'est une liste d'inquiétudes. Écris l'action (ou « accepté ») et sa date." },
      { si: "proprietaire vide", message: "Nomme un propriétaire : une personne qui peut agir." },
      { si: "statut = \"Arrivé\"", message: "Le risque est arrivé : plan B lancé, et le sponsor prévenu le jour même." },
      { si: "statut = \"Ouvert\" et quand < aujourdhui", message: "La date est passée : fais le point à la revue." }
    ],
    totaux: [
      { libelle: "Risques ouverts (repère : 10 à 20, les 5 plus gros au COPIL)", calcul: "nombre", si: "statut = \"Ouvert\"" },
      { libelle: "dont priorités (6 ou 9)", calcul: "nombre", si: "statut = \"Ouvert\" et note >= 6" },
      { libelle: "Arrivés", calcul: "nombre", si: "statut = \"Arrivé\"" }
    ],
    exemple: {
      nom: "DEMAT 2027",
      date: "2027-02-08",
      lignes: [
        { risque: "Parce que seule la cheffe comptable sait traiter les avoirs fournisseurs, et qu'elle est en congé du 12 au 30 avril, pendant la recette, il peut arriver que les avoirs ne soient pas testés à temps, ce qui entraînerait des erreurs sur les avoirs après la bascule.",
          proba: 3, impact: 2, reponse: "Réduire : former Julie aux avoirs ; la cheffe comptable écrit ses cas avant de partir.",
          proprietaire: "Le DAF (son manager)", quand: "2027-03-15", statut: "Ouvert" },
        { risque: "Parce que la PA a raté 2 jalons intermédiaires, il peut arriver que le connecteur ne soit pas livré le 1er mars, ce qui entraînerait une recette qui ne démarre pas le 16 mars.",
          proba: 3, impact: 3, reponse: "Transférer : pénalités au contrat. Réduire : suivi des jalons de la PA. Plan B prêt : le portail de la PA ; déclencheur « pas livré au 15 mars ».",
          proprietaire: "Toi", quand: "2027-03-15", statut: "Ouvert" },
        { risque: "Parce que la reprise des codes TVA a pris 3 semaines chez un autre client de l'intégrateur, il peut arriver que notre table des codes TVA ne soit pas prête, ce qui entraînerait des fiches rejetées ou mal classées.",
          proba: 3, impact: 3, reponse: "Réduire : table « ancien code → nouveau code » validée par la cheffe comptable, testée à l'essai à blanc de fin février.",
          proprietaire: "La cheffe comptable", quand: "2027-02-26", statut: "Ouvert" },
        { risque: "Parce que la compta est peu disponible (clôture de mars, congé de la cheffe comptable), il peut arriver que la recette prenne du retard, ce qui entraînerait un PV après le 30 avril.",
          proba: 2, impact: 2, reponse: "Réduire : créneaux de Julie réservés avec sa cheffe, hors semaine de clôture.",
          proprietaire: "La cheffe comptable", quand: "2027-03-16", statut: "Ouvert" },
        { risque: "Parce que le e-reporting est hors du projet, il peut arriver qu'il ne soit pas prêt au 1er septembre 2027, ce qui entraînerait un manquement à la loi.",
          proba: 2, impact: 3, reponse: "Escalader : remis au DAF, son porteur, qui l'a confié au contrôleur de gestion.",
          proprietaire: "Le DAF", quand: "2027-03-09", statut: "Ouvert" },
        { risque: "Parce que le contrat ne plafonne pas les hausses, il peut arriver que la PA augmente ses prix au renouvellement, en 2029, ce qui entraînerait un run plus cher.",
          proba: 2, impact: 2, reponse: "Accepter : une marge dans le budget du run, après le projet.",
          proprietaire: "Ton DSI", quand: "2027-07-13", statut: "Ouvert" },
        { risque: "Parce que la version PDF des factures est nouvelle, il peut arriver que le logo soit mal placé, ce qui entraînerait une facture moins lisible.",
          proba: 2, impact: 1, reponse: "Accepter : on corrige si ça arrive.", proprietaire: "Sophie", quand: "2027-03-16", statut: "Ouvert" },
        { risque: "Parce que la compta est à 2 sur 6 en août, il peut arriver qu'une bascule en août manque de monde, ce qui entraînerait des rejets non traités.",
          proba: 3, impact: 3, reponse: "Éviter : la bascule est en juin ; juillet-août reste la marge.", proprietaire: "Toi", quand: "2026-10-30", statut: "Fermé" }
      ]
    },
    export: ["excel", "copier", "imprimer"]
  }
]);
