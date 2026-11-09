// Outil « Note de décision : options chiffrées » (docs/outils.md), défini par l'expert chef de projet d'après les cours
// cp03, cp17 et cp18. Règles des cours : des décisions préparées, 2 ou 3 options, chacune avec son prix (délai, coût,
// risque), et ta recommandation (cp03 §1) ; la décision attendue et sa date d'abord, puis les faits, l'impact, les
// options, la recommandation (cp17 §2) ; dont « ne rien changer », une date limite, ta délégation (cp18 §3 ; cp10 §2).
// Exemple : le changement n° 7, préparé pour le COPIL du 9 février 2027 (cp10 §2-3).
LEARNSQL.outils = (LEARNSQL.outils || []).concat([
  {
    id: "gp-options",
    sujet: "gestion-projet",
    titre: "Note de décision : options chiffrées",
    resume: "Préparer une décision : les faits, 2 ou 3 options avec leur prix, et ta recommandation.",
    quand: "Avant de demander une décision : au sponsor, au COPIL, à ton DSI ou au manager d'un autre service.",
    etapes: [
      "Écris la décision attendue et sa date limite. Vérifie d'abord : est-ce dans ta délégation ?",
      "Donne les faits, puis 2 ou 3 options, dont « Ne rien changer » quand c'est possible, chacune avec son prix.",
      "Recommande une option, en une ligne, avec sa raison. Le décideur choisit."
    ],
    cours: ["cp03", "cp17", "cp18", "cp16", "cp10"],
    type: "document",
    rubriques: [
      { id: "decision", titre: "Décision attendue", type: "texte", aide: "La question à trancher : oui ou non, A ou B." },
      { id: "quand", titre: "Pour quand", type: "date", aide: "La date limite." },
      { id: "qui", titre: "Qui décide", type: "texte",
        aide: "Dans ta délégation ? Tu décides et tu informes. Sinon : le sponsor, le COPIL, ton DSI, ou le manager concerné." },
      { id: "faits", titre: "Faits", type: "texte-long", aide: "Ce qui se vérifie : dates, chiffres. Pas d'adjectifs." },
      { id: "impact", titre: "Impact", type: "texte-long", aide: "Délai, coût, risque." },
      { id: "options", titre: "Options", type: "tableau", ligne: { titre: "Option" },
        colonnes: [
          { id: "option", titre: "Option", type: "texte" },
          { id: "contenu", titre: "Ce qu'on fait", type: "texte-long" },
          { id: "delai", titre: "Délai", type: "texte", aide: "Ce que ça change aux dates." },
          { id: "cout", titre: "Coût (€)", type: "nombre" },
          { id: "risque", titre: "Risque", type: "texte" }
        ],
        modele: [{ option: "A. Ne rien changer" }],
        alertes: [
          { si: "delai vide et cout vide", message: "Chaque option a son prix : délai, coût, risque." }
        ],
        totaux: [{ id: "nb_options", libelle: "Options (2 ou 3)", calcul: "nombre" }] },
      { id: "recommandation", titre: "Ta recommandation", type: "texte-long", aide: "L'option, et sa raison, en une ligne." },
      { id: "decision_prise", titre: "Décision prise", type: "texte", aide: "Quoi, par qui, quand. Puis au registre des décisions." }
    ],
    alertes: [
      { si: "options vide", message: "Écris 2 ou 3 options, dont « Ne rien changer » quand c'est possible." },
      { si: "nb_options = 1", message: "Une seule option : ce n'est pas un choix. Donne 2 ou 3 options." },
      { si: "nb_options > 3", message: "Plus de 3 options : garde-en 2 ou 3, dont « Ne rien changer » quand c'est possible." },
      { si: "recommandation vide", message: "Écris ta recommandation, en une ligne, avec sa raison." },
      { si: "quand vide", message: "Donne une date limite." }
    ],
    exemple: {
      nom: "Changement n° 7 : la référence chantier",
      rubriques: {
        decision: "Ajouter la référence chantier sur les factures (changement n° 7) ?",
        quand: "2027-02-09",
        qui: "Le DAF, au COPIL : le changement touche le budget.",
        faits: "Demandé par le responsable ADV le 2 février. Des litiges chez 3 clients pisciniers, faute de référence chantier. Besoin pour la bascule de juin.",
        impact: "4 jours d'intégrateur (environ 3 000 €), 15 tests à refaire, un risque sur les flux EDI. Vu avec l'intégrateur et Sophie.",
        options: [
          { option: "A. Ne rien changer", contenu: "Les factures restent sans référence chantier.", delai: "Aucun", cout: 0,
            risque: "Les litiges continuent chez 3 clients." },
          { option: "B. Maintenant", contenu: "4 jours d'intégrateur en février ; 15 tests à refaire.", delai: "Aucun : fait avant la recette", cout: 3000,
            risque: "Un risque sur les flux EDI, couvert par les tests." },
          { option: "C. En juillet", contenu: "Les mêmes 4 jours, après la bascule et le gel.", delai: "En juillet", cout: 3000,
            risque: "Les litiges continuent jusqu'en juillet." }
        ],
        recommandation: "B : les litiges s'arrêtent dès la bascule, et les tests sont refaits avant la recette.",
        decision_prise: "B, acceptée par le DAF au COPIL du 9 février ; commande signée le 10 ; travail commencé le 11."
      }
    },
    export: ["excel", "copier", "imprimer"]
  }
]);
