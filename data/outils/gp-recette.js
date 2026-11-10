// Outil « Cahier de recette » (docs/outils.md), défini par l'expert chef de projet d'après les cours cp19 et cp08.
// Règles des cours : la recette, c'est le métier qui valide sur ses cas, avec un PV signé (cp19 §1) ; critères
// mesurables, qui teste, qui signe (§2) ; un cas = une situation réelle, ses données, le résultat attendu écrit avant
// (§3) ; un ticket par anomalie, 3 gravités fixées par le métier (§4) ; un lot de non-régression de 15 à 20 cas (§5) ;
// pas de PV avec une bloquante ou une majeure ouverte, les mineures en réserves datées (§6) ; un pourcentage cache les
// bloquantes (cp08 §6). L'exemple (mercredi 14 avril 2027) montre exprès l'alerte « Pas de PV » : l'état réel au milieu
// d'une recette.
LEARNSQL.outils = (LEARNSQL.outils || []).concat([
  {
    id: "gp-recette",
    sujet: "gestion-projet",
    titre: "Cahier de recette",
    resume: "Lister les cas de test du métier, suivre leurs résultats et les anomalies, jusqu'au PV.",
    quand: "Les cas s'écrivent avant la recette. Puis chaque semaine : les cas joués, les cas OK, les anomalies ouvertes.",
    etapes: [
      "Le métier écrit ses vrais cas, avec le résultat attendu, avant de tester.",
      "Chaque anomalie : un ticket, et une gravité fixée par le métier sur les définitions.",
      "Pas de PV tant qu'une bloquante ou une majeure est ouverte. Les mineures deviennent des réserves datées."
    ],
    cours: ["cp19", "cp08", "ot05"],
    type: "document",
    rubriques: [
      { id: "livrable", titre: "Ce qui est recetté", type: "texte", aide: "Le livrable et sa version." },
      { id: "criteres", titre: "Critères d'acceptation", type: "texte-long",
        defaut: "0 anomalie bloquante, 0 majeure. Les mineures en réserves, chacune avec sa date." },
      { id: "signataires", titre: "Qui signe le PV", type: "texte", aide: "L'A du RACI : le responsable du métier. Pas celui qui a testé." },
      { id: "calendrier", titre: "Calendrier", type: "texte", aide: "Du … au … ; des créneaux pour les retests ; la marge." },
      { id: "cas", titre: "Cas de test", type: "tableau", ligne: { titre: "Cas" },
        colonnes: [
          { id: "cas", titre: "Cas", type: "texte", aide: "Un code : F-17, C-42…" },
          { id: "situation", titre: "Situation et données", type: "texte-long",
            aide: "Une situation réelle, ses données, ses étapes. Les rares mais coûteux d'abord." },
          { id: "attendu", titre: "Résultat attendu", type: "texte-long", aide: "Écrit avant de tester." },
          { id: "testeur", titre: "Testeur", type: "texte", aide: "L'utilisateur clé. Pas toi, pas l'intégrateur." },
          { id: "resultat", titre: "Résultat", type: "choix", valeurs: ["Pas joué", "OK", "Anomalie"], couleurs: ["", "ok", "ko"], defaut: "Pas joué",
            aide: "Anomalie corrigée : rejoue-la ; OK seulement après le retest." },
          { id: "gravite", titre: "Gravité", type: "choix", valeurs: ["Bloquante", "Majeure", "Mineure"], couleurs: ["ko", "ko", "attention"],
            aide: "Bloquante : on ne peut plus facturer ou recevoir. Majeure : un contournement coûteux. Mineure : une gêne." },
          { id: "ticket", titre: "Ticket et date", type: "texte", aide: "Le n° du ticket. Mineure gardée au PV : sa date de correction." },
          { id: "lot_nr", titre: "Lot de non-régression", type: "choix", valeurs: ["Non", "Oui"], defaut: "Non",
            aide: "15 à 20 cas clés, rejoués après chaque livraison." }
        ],
        alertes: [
          { si: "attendu vide", message: "Écris le résultat attendu avant de tester." },
          { si: "resultat = \"Anomalie\" et gravite vide", message: "Fixe la gravité avec le métier, sur les définitions." },
          { si: "resultat = \"Anomalie\" et ticket vide", message: "Ouvre un ticket : le cas, l'attendu, l'obtenu, une preuve." },
          { si: "resultat = \"Anomalie\" et (gravite = \"Bloquante\" ou gravite = \"Majeure\")",
            message: "Pas de PV tant que cette anomalie est ouverte : corrige, puis rejoue OK." }
        ],
        totaux: [
          { libelle: "Cas", calcul: "nombre" },
          { libelle: "Joués", calcul: "nombre", si: "resultat <> \"Pas joué\"" },
          { libelle: "OK", calcul: "nombre", si: "resultat = \"OK\"" },
          { libelle: "Bloquantes ouvertes (0 pour le PV)", calcul: "nombre", si: "resultat = \"Anomalie\" et gravite = \"Bloquante\"" },
          { libelle: "Majeures ouvertes (0 pour le PV)", calcul: "nombre", si: "resultat = \"Anomalie\" et gravite = \"Majeure\"" },
          { libelle: "Mineures ouvertes (au PV : réserves datées)", calcul: "nombre", si: "resultat = \"Anomalie\" et gravite = \"Mineure\"" },
          { libelle: "Lot de non-régression (15 à 20 cas)", calcul: "nombre", si: "lot_nr = \"Oui\"" }
        ],
        aideTotaux: "Fin prévue = cas pas encore joués ÷ cas joués par semaine. Les bloquantes se lisent à part, jamais dans un pourcentage." }
    ],
    exemple: {
      nom: "Recette du connecteur, 14 avril",
      date: "2027-04-14",
      rubriques: {
        livrable: "Le connecteur de la PA et le paramétrage Divalto, livraison du mardi 13 avril",
        criteres: "0 anomalie bloquante, 0 majeure. Les mineures en réserves, chacune avec sa date.",
        signataires: "Fournisseurs : la cheffe comptable (en congé du 12 au 30 avril : la personne qu'elle a désignée par écrit, pas Julie) ; clients : le responsable ADV",
        calendrier: "Du 16 mars au 30 avril, 6 semaines + 1 semaine de marge ; correctifs livrés le mardi et le jeudi ; le lot de non-régression rejoué après chaque livraison.",
        cas: [
          { cas: "F-17", situation: "Un avoir fournisseur, lié à sa facture du mois. Facture 1 200 € HT, avoir 150 € HT. L'avoir arrive par la PA ; Julie le contrôle dans Divalto.",
            attendu: "Avoir lié à sa facture ; TVA 30 € ; reste à payer 1 260 € TTC.", testeur: "Julie", resultat: "Anomalie", gravite: "Bloquante",
            ticket: "Nouveau ticket : régression après la livraison du 13 avril.", lot_nr: "Oui" },
          { cas: "C-42", situation: "Un avoir AquaBleu, en EDI.", attendu: "Un message d'avoir (code 381), accepté par AquaBleu.", testeur: "Marc",
            resultat: "OK", gravite: "", ticket: "Ticket du 8 avril, fermé après le retest.", lot_nr: "Oui" },
          { cas: "F-22", situation: "Une facture fournisseur reçue par la PA, contrôlée dans Divalto.", attendu: "Facture liée au bon fournisseur, montants justes.",
            testeur: "Julie", resultat: "OK", gravite: "", ticket: "Pas de ticket : erreur de saisie, rejoué OK.", lot_nr: "Non" },
          { cas: "F-31", situation: "Une facture d'acompte fournisseur (cas ajouté en mars).", attendu: "L'acompte arrive et se déduit de la facture finale.",
            testeur: "Julie", resultat: "Anomalie", gravite: "Bloquante", ticket: "Ticket ouvert.", lot_nr: "Oui" },
          { cas: "F-08", situation: "Les avoirs d'un fournisseur, reçus par la PA.", attendu: "Chaque avoir arrive lié à sa facture.", testeur: "Julie",
            resultat: "Anomalie", gravite: "Majeure", ticket: "Ticket ouvert : Julie relie 30 avoirs par semaine à la main.", lot_nr: "Non" },
          { cas: "C-51", situation: "Une facture EDI AquaBleu, avec son numéro de commande.", attendu: "Le numéro de commande est dans la facture, sans ressaisie.",
            testeur: "Marc", resultat: "Anomalie", gravite: "Majeure", ticket: "Ticket ouvert : Marc ressaisit le numéro à la main.", lot_nr: "Oui" },
          { cas: "C-15", situation: "La version PDF lisible d'une facture client.", attendu: "Les libellés du PDF sont justes.", testeur: "Sophie",
            resultat: "Anomalie", gravite: "Mineure", ticket: "Ticket ouvert ; si elle reste au PV : réserve au 9 juillet.", lot_nr: "Non" },
          { cas: "F-60", situation: "La facture PDF d'un fournisseur étranger, hors PA.", attendu: "Elle se saisit comme avant, sans blocage.", testeur: "Julie",
            resultat: "Pas joué", gravite: "", ticket: "", lot_nr: "Non" }
        ]
      }
    },
    export: ["excel", "copier", "imprimer"]
  }
]);
