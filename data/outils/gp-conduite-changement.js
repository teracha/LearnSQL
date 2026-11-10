// Outil « Conduite du changement » (docs/outils.md), défini par l'expert chef de projet d'après le cours cp23.
// (Id gp-conduite-changement : gp-changements est le registre des demandes de changement, cp10.)
// Règles du cours : « Population = un groupe touché de la même façon. Pour chacune : ce qui change, quand, à quel
// point » ; « L'effort suit l'impact : fort, on forme et on accompagne ; faible, on informe. Le message passe par le
// manager » ; la carte faite au cadrage, mise à jour après la recette ; ne pas oublier ceux qui répondent aux questions,
// le site pilote et le dehors (§1) ; le pourquoi vient de la direction, le « ce qui change pour moi » du manager direct
// (§2) ; utilisateurs clés relais (§3) ; « ce qui change pour moi, quand, qui m'aide, et ce qui ne change pas : par le bon
// canal, au bon moment, plusieurs fois » (§4) ; former juste avant, sur les vrais cas ; « Mesurer par nom : qui, quelle
// session, quand. Un pourcentage cache qui manque » (§5).
// Exemple : DEMAT fin mai 2027 (cp23 §1 à §5, q16, q23) : 9 présences signées sur 10 ; la cheffe comptable, malade le
// jour de « recevoir », rattrape à la 3e session de juin, avant le go du 11.
LEARNSQL.outils = (LEARNSQL.outils || []).concat([
  {
    id: "gp-conduite-changement",
    sujet: "gestion-projet",
    titre: "Conduite du changement",
    resume: "Préparer l'adoption : qui est touché et à quel point, le message de chacun, et la formation suivie par nom.",
    quand: "La carte des impacts au cadrage, mise à jour après la recette. Le pourquoi et les grandes dates tôt ; le détail et la formation, juste avant.",
    etapes: [
      "Pour chaque population : ce qui change, quand, à quel point. N'oublie pas ceux qui répondent aux questions, le site pilote, le dehors.",
      "Le message passe par le manager : ce qui change pour moi, quand, qui m'aide, et ce qui ne change pas.",
      "Forme juste avant, sur les vrais cas. Suis la formation par nom : un pourcentage cache qui manque."
    ],
    cours: ["cp23", "ot05"],
    type: "document",
    rubriques: [
      { id: "pourquoi", titre: "Pourquoi on change", type: "texte-long",
        aide: "Dit par le sponsor, au lancement : la loi, le gain. Le « ce qui change pour moi » : le manager direct." },
      { id: "impacts", titre: "Carte des impacts", type: "tableau", ligne: { titre: "Population", pluriel: "Populations" },
        colonnes: [
          { id: "population", titre: "Population", type: "texte", aide: "Un groupe touché de la même façon." },
          { id: "change", titre: "Ce qui change pour elle", type: "texte-long" },
          { id: "quand", titre: "Quand", type: "texte" },
          { id: "impact", titre: "À quel point", type: "choix", valeurs: ["Fort", "Moyen", "Faible"],
            aide: "Fort : on forme et on accompagne. Faible : on informe." },
          { id: "porte_par", titre: "Message porté par", type: "texte", aide: "Le manager direct. Pas toi : tu prépares et tu outilles." },
          { id: "relais", titre: "Relais", type: "texte", aide: "L'utilisateur clé de l'équipe : il explique, et te remonte les questions." },
          { id: "action", titre: "Former, accompagner, informer", type: "texte" }
        ],
        alertes: [
          { si: "impact vide", message: "À quel point est-elle touchée ? Fort : on forme et on accompagne. Faible : on informe." },
          { si: "porte_par vide", message: "Le message passe par le manager direct : écris qui le porte." }
        ],
        totaux: [
          { libelle: "Populations", calcul: "nombre" },
          { libelle: "dont impact fort : former et accompagner", calcul: "nombre", si: "impact = \"Fort\"" }
        ] },
      { id: "messages", titre: "Messages", type: "tableau", ligne: { titre: "Message" },
        colonnes: [
          { id: "pour", titre: "Pour qui", type: "texte" },
          { id: "message", titre: "Ce qui change pour eux", type: "texte-long", aide: "Ce qui change, quand, qui les aide. Pas la technique." },
          { id: "ne_change_pas", titre: "Ce qui ne change pas", type: "texte" },
          { id: "canal", titre: "Canal", type: "texte", aide: "Le bon canal : une réunion d'équipe, une page, une lettre. Et on répète." },
          { id: "par", titre: "Porté par", type: "texte" },
          { id: "quand", titre: "Quand", type: "date", aide: "Le pourquoi et les grandes dates tôt ; le détail juste avant." },
          { id: "parti", titre: "Parti ?", type: "choix", valeurs: ["Non", "Oui"], defaut: "Non" }
        ],
        alertes: [
          { si: "ne_change_pas vide", message: "Dis aussi ce qui ne change pas : ça rassure, ça coupe les rumeurs." },
          { si: "parti = \"Non\" et quand < aujourdhui", message: "La date est passée : le message est-il parti ? Coche-le, ou donne une nouvelle date." }
        ] },
      { id: "formation", titre: "Formation, par nom", type: "tableau", ligne: { titre: "Présence", pluriel: "Présences" },
        colonnes: [
          { id: "personne", titre: "Personne", type: "texte", aide: "Un nom." },
          { id: "session", titre: "Session", type: "texte", aide: "Courte, sur les vrais cas." },
          { id: "date", titre: "Date", type: "date", aide: "Juste avant d'en avoir besoin, hors clôture." },
          { id: "presence", titre: "Présence", type: "choix", valeurs: ["À venir", "Présent", "Absent"], defaut: "À venir",
            couleurs: ["", "ok", "ko"], aide: "D'après la feuille signée." },
          { id: "rattrapage", titre: "Rattrapage", type: "date", aide: "Absent : sa session de rattrapage, avant la bascule." }
        ],
        alertes: [
          { si: "presence = \"Absent\" et rattrapage vide", message: "Absent : prévois sa session de rattrapage, datée, avant la bascule." },
          { si: "presence = \"À venir\" et date < aujourdhui", message: "La date est passée : présent ou absent ? Coche-le d'après la feuille signée." }
        ],
        totaux: [
          { libelle: "Présences prévues", calcul: "nombre" },
          { libelle: "Présences signées", calcul: "nombre", si: "presence = \"Présent\"" },
          { libelle: "Absences, à rattraper", calcul: "nombre", si: "presence = \"Absent\"" }
        ],
        aideTotaux: "Un pourcentage cache qui manque : la liste dit qui. Former ne suffit pas : on accompagne jusqu'à la mesure de l'adoption." }
    ],
    alertes: [
      { si: "pourquoi vide", message: "Écris le pourquoi : le sponsor le dit au lancement, la loi ou le gain." }
    ],
    exemple: {
      nom: "DEMAT 2027, fin mai",
      date: "2027-05-31",
      rubriques: {
        pourquoi: "La loi : émettre nos factures par une PA au 1er septembre 2027. Le gain : la fin de la ressaisie des factures fournisseurs. Le DAF le dit en ouvrant la 1re session de la compta.",
        impacts: [
          { population: "La compta (6 personnes et la stagiaire)", change: "Plus de ressaisie ; rejets et avoirs par la PA.",
            quand: "Formation en mai ; bascule le 14 juin", impact: "Fort", porte_par: "La cheffe comptable",
            relais: "Julie (fournisseurs), Sophie (clients)", action: "Former : 2 sessions de 2 h. Accompagner : l'hypercare." },
          { population: "L'ADV (le responsable, Marc et ses collègues)", change: "Le SIREN de chaque client ; Marc reprend les rejets EDI.",
            quand: "Ateliers en mai ; bascule le 14 juin", impact: "Moyen", porte_par: "Le responsable ADV",
            relais: "Marc (EDI)", action: "Former : 2 ateliers." },
          { population: "Les 3 responsables de site", change: "Peu de chose ; le site pilote passe en mai.",
            quand: "Mai pour le site pilote ; 14 juin pour les autres", impact: "Faible", porte_par: "Le directeur logistique",
            relais: "", action: "Informer. Le site pilote : accompagné en mai." },
          { population: "Les commerciaux", change: "Rien à saisir ; leurs clients les appelleront.",
            quand: "Début juin", impact: "Faible", porte_par: "Le directeur commercial",
            relais: "", action: "Informer : 10 minutes en réunion d'équipe, et une page." },
          { population: "Dehors : les 600 fournisseurs", change: "La facture électronique : ce qui change pour eux, et quand.",
            quand: "Avant la bascule", impact: "Faible", porte_par: "La cheffe comptable",
            relais: "", action: "Informer : une lettre de la compta." },
          { population: "Dehors : les clients EDI, dont AquaBleu", change: "Leurs factures arrivent par une plateforme agréée.",
            quand: "Dès le 14 juin", impact: "Faible", porte_par: "Le commercial",
            relais: "", action: "Informer, par le commercial. Marc vérifie les 1res factures d'AquaBleu, le lundi 8 h." }
        ],
        messages: [
          { pour: "La compta", message: "Pourquoi : la loi, la fin de la ressaisie (le DAF). Pour vous : recevoir et émettre par la PA, les rejets, les avoirs ; 2 sessions de 2 h en mai ; Julie et Sophie vous aident.",
            ne_change_pas: "La clôture : toujours en 5 jours ouvrés.", canal: "La 1re session, puis la réunion d'équipe",
            par: "Le DAF, puis la cheffe comptable", quand: "2027-05-12", parti: "Oui" },
          { pour: "Les 600 fournisseurs", message: "La facture électronique : ce qui change pour vous, et quand ; qui appeler à la compta.",
            ne_change_pas: "Vos délais de paiement.", canal: "Une lettre", par: "La cheffe comptable", quand: "2027-05-21", parti: "Oui" },
          { pour: "Les commerciaux", message: "Dès le 14 juin, vos clients reçoivent leurs factures par une PA. Pour vous, rien à saisir. Un nouveau client ? Son SIREN. Une facture rejetée ? L'ADV.",
            ne_change_pas: "Vos prix, vos commandes.", canal: "10 minutes en réunion d'équipe, et une page",
            par: "Le directeur commercial", quand: "2027-06-01", parti: "Non" },
          { pour: "Les clients EDI, dont AquaBleu", message: "Dès le 14 juin, nos factures vous arrivent par une plateforme agréée.",
            ne_change_pas: "Vos commandes EDI, vos prix.", canal: "Un appel du commercial", par: "Le commercial", quand: "2027-06-01", parti: "Non" }
        ],
        formation: [
          { personne: "La cheffe comptable", session: "Émettre", date: "2027-05-12", presence: "Présent", rattrapage: "" },
          { personne: "La cheffe comptable", session: "Recevoir", date: "2027-05-19", presence: "Absent", rattrapage: "2027-06-09" },
          { personne: "Comptable 1", session: "Émettre", date: "2027-05-12", presence: "Présent", rattrapage: "" },
          { personne: "Comptable 1", session: "Recevoir", date: "2027-05-19", presence: "Présent", rattrapage: "" },
          { personne: "Comptable 2", session: "Émettre", date: "2027-05-12", presence: "Présent", rattrapage: "" },
          { personne: "Comptable 2", session: "Recevoir", date: "2027-05-19", presence: "Présent", rattrapage: "" },
          { personne: "Comptable 3", session: "Émettre", date: "2027-05-12", presence: "Présent", rattrapage: "" },
          { personne: "Comptable 3", session: "Recevoir", date: "2027-05-19", presence: "Présent", rattrapage: "" },
          { personne: "La stagiaire", session: "Émettre", date: "2027-05-12", presence: "Présent", rattrapage: "" },
          { personne: "La stagiaire", session: "Recevoir", date: "2027-05-19", presence: "Présent", rattrapage: "" }
        ]
      }
    },
    export: ["excel", "copier", "imprimer"]
  }
]);
