// Outil « Go / no-go et plan de bascule » (docs/outils.md), défini par l'expert chef de projet d'après le cours cp21.
// Règles du cours : critères fixés avant, par celui qui décidera ; un seuil, une période, une preuve ; go sous conditions
// écrit (quoi, qui, pour quand, qui vérifie, et sinon) ; la veille, on ne réécrit pas un critère (§1) ; la page :
// critères et preuves, risques et parades, retour arrière, recommandation (§2) ; le plan heure par heure : une heure, un
// nom, une durée, un contrôle avec un nom, et quoi faire s'il échoue (§3) ; le retour arrière : signal, gestes,
// décideur, heure limite, testé avant (§4). Exemple : la page du vendredi 11 juin 2027 (numéros de téléphone fictifs).
LEARNSQL.outils = (LEARNSQL.outils || []).concat([
  {
    id: "gp-bascule",
    sujet: "gestion-projet",
    titre: "Go / no-go et plan de bascule",
    resume: "Préparer la mise en service : les critères de go, ta recommandation, le retour arrière et le plan heure par heure.",
    quand: "Critères fixés environ un mois avant le go / no-go. Plan joué en répétition avant. Page relue la veille.",
    etapes: [
      "Fais valider par le décideur, un mois avant, des critères de go mesurables : un seuil, une période, une preuve.",
      "Écris le plan heure par heure (qui, quel contrôle, quoi faire si ça échoue) et le retour arrière. Répète-les.",
      "Le jour J, compare chaque critère à sa preuve, sans le réécrire. Puis recommande : go, go sous conditions ou no-go."
    ],
    cours: ["cp21", "cp20"],
    type: "document",
    rubriques: [
      { id: "bascule", titre: "Bascule", type: "texte", aide: "La date, ce qui bascule." },
      { id: "go_no_go", titre: "Go / no-go", type: "texte", aide: "La date, l'heure, qui décide (A), qui est consulté (C)." },
      { id: "criteres", titre: "Critères de go", type: "tableau", ligne: { titre: "Critère" },
        colonnes: [
          { id: "critere", titre: "Critère", type: "texte" },
          { id: "seuil", titre: "Seuil et période", type: "texte" },
          { id: "preuve", titre: "Preuve", type: "texte", aide: "Un chiffre, un document daté." },
          { id: "atteint", titre: "Atteint ?", type: "choix", valeurs: ["Oui", "Presque", "Non"], couleurs: ["ok", "attention", "ko"] }
        ],
        alertes: [
          { si: "preuve vide", message: "Chaque critère a sa preuve : un chiffre, un document daté." },
          { si: "atteint = \"Presque\"", message: "Presque atteint : go sous conditions, écrites (quoi, qui, pour quand, qui vérifie, et sinon), ou no-go." },
          { si: "atteint = \"Non\"", message: "Critère non atteint : no-go, ou le DAF décide en connaissant le risque. On ne réécrit pas le critère." }
        ],
        totaux: [
          { libelle: "Critères", calcul: "nombre" },
          { libelle: "Atteints", calcul: "nombre", si: "atteint = \"Oui\"" }
        ] },
      { id: "risques", titre: "Risques qui restent", type: "tableau", ligne: { titre: "Risque" },
        colonnes: [
          { id: "risque", titre: "Risque", type: "texte" },
          { id: "parade", titre: "Parade", type: "texte" }
        ] },
      { id: "retour_signal", titre: "Signal d'alerte", type: "texte", aide: "Un seuil, une heure." },
      { id: "retour_gestes", titre: "Retour arrière : ce qu'on fait", type: "texte-long", aide: "Qui fait quoi pour revenir, en combien de temps." },
      { id: "retour_qui", titre: "Qui décide le retour arrière", type: "texte", aide: "Et qui le remplace, désigné par écrit." },
      { id: "non_retour", titre: "Point de non-retour", type: "texte", aide: "Après : on corrige en avant." },
      { id: "retour_teste", titre: "Retour arrière testé", type: "texte", aide: "Quand, par qui. C'est un critère de go." },
      { id: "recommandation", titre: "Ta recommandation", type: "choix", valeurs: ["Go", "Go sous conditions", "No-go"],
        aide: "Tu recommandes ; le décideur décide." },
      { id: "conditions", titre: "Conditions du go", type: "tableau", ligne: { titre: "Condition" },
        aide: "Seulement pour un go sous conditions.",
        colonnes: [
          { id: "quoi", titre: "Quoi", type: "texte" },
          { id: "qui", titre: "Qui", type: "texte" },
          { id: "quand", titre: "Pour quand", type: "texte" },
          { id: "verifie", titre: "Qui vérifie", type: "texte" },
          { id: "sinon", titre: "Et sinon", type: "texte" }
        ] },
      { id: "plan", titre: "Plan heure par heure", type: "tableau", ligne: { titre: "Étape" },
        colonnes: [
          { id: "quand", titre: "Quand", type: "texte", aide: "Le jour et l'heure." },
          { id: "etape", titre: "Étape", type: "texte" },
          { id: "qui", titre: "Qui", type: "texte", aide: "Un nom, vu avec son manager." },
          { id: "duree", titre: "Durée", type: "texte", aide: "Mesurée en répétition, plus une marge." },
          { id: "controle", titre: "Contrôle", type: "texte" },
          { id: "qui_controle", titre: "Qui contrôle", type: "texte" },
          { id: "si_echec", titre: "Si ça échoue", type: "texte" },
          { id: "etat", titre: "État", type: "choix", valeurs: ["À faire", "Fait", "Problème"], defaut: "À faire" }
        ],
        alertes: [
          { si: "qui vide ou controle vide", message: "Chaque étape : un nom et un contrôle." },
          { si: "si_echec vide", message: "Que fait-on si cette étape échoue ?" }
        ] },
      { id: "contacts", titre: "Contacts", type: "tableau", ligne: { titre: "Contact" }, aide: "Nom, numéro, heures.",
        colonnes: [
          { id: "nom", titre: "Nom et rôle", type: "texte" },
          { id: "numero", titre: "Numéro", type: "texte" },
          { id: "heures", titre: "Joignable", type: "texte" }
        ] }
    ],
    alertes: [
      { si: "recommandation = \"Go sous conditions\" et conditions vide", message: "Écris les conditions du go." },
      { si: "retour_teste vide", message: "Le retour arrière se teste avant le go : c'est un critère." }
    ],
    exemple: {
      nom: "Bascule du 14 juin 2027",
      date: "2027-06-11",
      rubriques: {
        bascule: "Lundi 14 juin 2027 : les 3 sites passent à la facture électronique, par le connecteur.",
        go_no_go: "Vendredi 11 juin, 14 h, séance courte. A : le DAF, sur ta recommandation. C : la cheffe comptable, le responsable ADV, ton DSI. I : le DG.",
        criteres: [
          { critere: "0 anomalie bloquante ou majeure ouverte", seuil: "Le 11 juin à 11 h", preuve: "Export daté de l'outil de tickets", atteint: "Oui" },
          { critere: "PV de recette signés", seuil: "Fournisseurs et clients", preuve: "Les 2 PV du 30 avril ; 2 réserves mineures, datées au 9 juillet", atteint: "Oui" },
          { critere: "Pilote : moins de 2 % de factures rejetées par la PA", seuil: "Ses 2 dernières semaines",
            preuve: "Relevé des rejets de la PA : 1,8 % puis 1,6 %", atteint: "Oui" },
          { critere: "Reprise des tiers validée par le métier", seuil: "Essai 2, les 15 et 16 mai",
            preuve: "Comptages et signatures du dimanche 16 mai ; 26 rejets expliqués", atteint: "Oui" },
          { critere: "Formation faite", seuil: "Compta et ADV", preuve: "Feuilles de présence signées : qui, quand, quel module", atteint: "Oui" },
          { critere: "Retour arrière testé", seuil: "Émettre et recevoir par le portail", preuve: "Test de fin mai : Sophie émet, Julie reçoit", atteint: "Oui" }
        ],
        risques: [
          { risque: "AquaBleu (20 % du chiffre d'affaires) n'était pas dans le pilote.",
            parade: "Lundi 8 h, Marc vérifie ses 1res factures EDI une à une ; le commercial prévient le client." },
          { risque: "Le support de la PA répond de 8 h à 18 h, les jours ouvrés.", parade: "Un nom et un numéro obtenus par écrit pour le week-end." }
        ],
        retour_signal: "Plus de 5 % de rejets le lundi matin : tu appelles le DAF. Le signal ne lance pas seul le retour arrière.",
        retour_gestes: "Les factures repassent par le portail de la PA (le plan B, prévu au contrat) : Sophie y émet, Julie y reçoit, comme au test de fin mai.",
        retour_qui: "Le DAF, sur ta recommandation ; absent : la personne qu'il a désignée par écrit.",
        non_retour: "Lundi 14 juin, 12 h. Après : on corrige en avant.",
        retour_teste: "Fin mai : Sophie a émis et Julie a reçu quelques factures par le portail.",
        recommandation: "Go",
        conditions: [],
        plan: [
          { quand: "Ven. 11 juin, 12 h", etape: "Gel des tiers : plus de création ni de modification", qui: "Le responsable ADV et la cheffe comptable",
            duree: "Jusqu'à lundi", controle: "Comptages des tiers sur la photo de 12 h", qui_controle: "Toi",
            si_echec: "Un client urgent : sur une liste, créé après la bascule", etat: "À faire" },
          { quand: "Ven. 11 juin, 14 h", etape: "Go / no-go", qui: "Le DAF, sur ta recommandation", duree: "Séance courte",
            controle: "Décision écrite au registre", qui_controle: "Toi",
            si_echec: "No-go : prévenir l'équipe, la PA, l'intégrateur ; lever le gel des tiers", etat: "À faire" },
          { quand: "Ven. 11 juin, 17 h", etape: "Arrêt de la facturation", qui: "Sophie", duree: "30 min",
            controle: "Aucune facture n'attend entre les deux circuits", qui_controle: "Marc, à 17 h 30",
            si_echec: "Une facture traîne : appeler le consultant", etat: "À faire" },
          { quand: "Sam. 12 juin, matin", etape: "Sauvegarde complète de Divalto (base SQL, dictionnaires, fichiers FHSQL)", qui: "Le N2",
            duree: "Mesurée en répétition", controle: "Restauration déjà essayée ; fichiers présents", qui_controle: "Toi",
            si_echec: "Pas de sauvegarde : on ne touche pas Divalto ; appel au DAF", etat: "À faire" },
          { quand: "Sam. 12 juin", etape: "Codes TVA, puis tiers vers la PA", qui: "Le consultant de l'intégrateur", duree: "13 h + une marge",
            controle: "Extraites = chargées + rejetées", qui_controle: "Toi", si_echec: "Écart sans explication : appel au DAF", etat: "À faire" },
          { quand: "Dim. 13 juin", etape: "Contrôles de la reprise, puis signatures", qui: "Le responsable ADV (clients), la cheffe comptable (fournisseurs)",
            duree: "Dimanche", controle: "Comptages, totaux, rapprochement, échantillon ciblé", qui_controle: "Les 2 propriétaires",
            si_echec: "Écart sans explication : on ne signe pas ; le DAF décide de la suite", etat: "À faire" },
          { quand: "Sam. et dim., 18 h", etape: "Message au DAF et à ton DSI", qui: "Toi", duree: "5 min", controle: "Le DAF a lu", qui_controle: "Toi",
            si_echec: "Pas de réponse : appeler le DAF", etat: "À faire" },
          { quand: "Lun. 14 juin, 8 h", etape: "1res factures par le connecteur", qui: "Sophie", duree: "La matinée",
            controle: "Les factures EDI d'AquaBleu vérifiées une à une", qui_controle: "Marc",
            si_echec: "Plus de 5 % de rejets : appel au DAF ; retour arrière avant 12 h, s'il le décide", etat: "À faire" }
        ],
        contacts: [
          { nom: "Chef de projet de la PA (présence du week-end, accord écrit)", numero: "06 00 00 00 01", heures: "Sam. et dim." },
          { nom: "Consultant de l'intégrateur", numero: "06 00 00 00 02", heures: "Du vendredi 11 au lundi 14 juin" },
          { nom: "Le DAF", numero: "06 00 00 00 03", heures: "Messages à 18 h ; joignable pour décider" },
          { nom: "Le N2 (support de la DSI)", numero: "06 00 00 00 04", heures: "Samedi ; lundi dès l'ouverture" }
        ]
      }
    },
    export: ["excel", "copier", "imprimer"]
  }
]);
