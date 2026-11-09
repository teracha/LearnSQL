// Outil « Registre des changements » (docs/outils.md), défini par l'expert chef de projet d'après le cours cp10.
// Règles du cours : trier (anomalie, changement, délégation, illégal) ; qui demande, quoi, pourquoi, pour quand ; l'impact
// sur tout le projet ; options dont « ne rien changer » (§1-2) ; le registre garde tout, un refus aussi, dit au
// demandeur avec sa raison ; signature avant le travail (§3) ; le registre fait le total ; un besoin = une demande,
// chiffrée en entier (§4) ; « pas maintenant », avec une date (cp18 §2). Exemple : le registre au jeudi 8 avril 2027.
LEARNSQL.outils = (LEARNSQL.outils || []).concat([
  {
    id: "gp-changements",
    sujet: "gestion-projet",
    titre: "Registre des changements",
    resume: "Suivre chaque demande de changement : son impact, la décision, et le total déjà accepté.",
    quand: "Dès qu'une demande touche le périmètre, le budget, une date validée ou un contrat. Le total se montre à chaque COPIL.",
    etapes: [
      "Trie d'abord. Non conforme à l'écrit : une anomalie, pas un changement. Dans ta délégation : tu décides et tu informes. Illégal : non.",
      "Écris la demande (qui, quoi, pourquoi, pour quand) et chiffre son impact sur tout le projet.",
      "Fais décider la bonne personne. Puis la commande ou l'avenant signé, et seulement après, le travail."
    ],
    cours: ["cp10"],
    type: "tableau",
    ligne: { titre: "Demande" },
    colonnes: [
      { id: "numero", titre: "N°", type: "texte", aide: "Dans l'ordre d'arrivée." },
      { id: "demandeur", titre: "Demandeur", type: "texte", aide: "Tout le monde peut demander." },
      { id: "demande", titre: "Demande", type: "texte-long", aide: "Quoi, pourquoi, pour quand. Un besoin = une demande, chiffrée en entier." },
      { id: "jours", titre: "Jours en plus", type: "nombre", aide: "Jours de prestataire." },
      { id: "cout", titre: "Coût (€)", type: "nombre", aide: "Jours × taux journalier, ou le prix de l'avenant." },
      { id: "autres_impacts", titre: "Autres impacts", type: "texte-long", aide: "Tests à refaire, délai, risque, temps des autres services." },
      { id: "decision", titre: "Décision", type: "choix", valeurs: ["À décider", "Acceptée", "Pas maintenant", "Refusée"], defaut: "À décider",
        aide: "Pas maintenant : avec une date. Refusée : dis-le au demandeur, avec la raison." },
      { id: "decide_par", titre: "Décidée par, le", type: "texte", aide: "Qui, et quand." }
    ],
    alertes: [
      { si: "decision = \"À décider\" et jours vide et cout vide", message: "Demande pas encore chiffrée : l'impact d'abord, puis la décision." },
      { si: "decision <> \"À décider\" et decide_par vide", message: "Écris qui a décidé, et quand." }
    ],
    totaux: [
      { libelle: "Acceptées : jours", calcul: "somme", colonne: "jours", si: "decision = \"Acceptée\"" },
      { libelle: "Acceptées : coût (€)", calcul: "somme", colonne: "cout", si: "decision = \"Acceptée\"" },
      { libelle: "À décider", calcul: "nombre", si: "decision = \"À décider\"" }
    ],
    aideTotaux: "Au COPIL : les demandes à décider, et le total déjà accepté. C'est le total qui montre la dérive.",
    exemple: {
      nom: "DEMAT 2027",
      date: "2027-04-08",
      lignes: [
        { numero: "7", demandeur: "Le responsable ADV", demande: "La référence chantier sur les factures : des litiges chez 3 clients pisciniers. Pour la bascule de juin.",
          jours: 4, cout: 3000, autres_impacts: "15 tests à refaire ; un risque sur les flux EDI.", decision: "Acceptée", decide_par: "Le DAF, COPIL du 09/02/2027" },
        { numero: "9", demandeur: "L'ADV", demande: "Le code magasin sur les factures.", jours: 3, cout: 2250, autres_impacts: "6 tests à refaire.",
          decision: "Acceptée", decide_par: "Le DAF, COPIL du 09/02/2027" },
        { numero: "14", demandeur: "La compta", demande: "Un contrôle automatique des doublons de factures fournisseurs.", jours: 3, cout: 2250,
          autres_impacts: "Tests des factures fournisseurs à refaire.", decision: "Refusée", decide_par: "Le DAF, février 2027" },
        { numero: "15", demandeur: "La PA", demande: "Passer le connecteur en version 2, « plus rapide ». La version 1 reste maintenue jusqu'en décembre 2027.",
          jours: 0, cout: 0, autres_impacts: "Tout retester en pleine recette.", decision: "Pas maintenant",
          decide_par: "Toi (ne rien changer), le 06/04/2027 : à l'automne" },
        { numero: "16", demandeur: "Le commercial", demande: "Un état des factures rejetées, par client (confort).", jours: "", cout: "",
          autres_impacts: "L'équipe est pleine jusqu'à la bascule.", decision: "Pas maintenant", decide_par: "Toi, le 07/04/2027 : en juillet" }
      ]
    },
    export: ["excel", "copier", "imprimer"]
  }
]);
