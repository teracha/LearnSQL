// Outil « Fiche contrat et SLA » (docs/outils.md), défini par l'expert chef de projet d'après les cours cp14 et cp15.
// Règles des cours : toi, les clauses opérationnelles, relues AVANT la signature, avec un texte proposé par point ; le DAF,
// le prix, la signature et le juridique (responsabilité, droit applicable), avec un avocat si besoin ; après la
// signature, un avenant (cp14 §6) ; ce que tu relis : livrables vérifiables, documentation comprise, passation écrite ;
// dates fixes, pas « indicatives », et tes obligations ; PV, réserves, délai de validation (piège : la recette tacite) ;
// solde au PV (§3) ; pénalités : par défaut, après une mise en demeure, « dès la date » si le contrat le dit, plafonnées ;
// le plan B écrit, avec son prix ; un SLA s'exige s'il se mesure (chiffre, période, heures, qui mesure), et ses
// exclusions ; garantie au forfait, en général aucune en régie, sauf clause (§4) ; données, RGPD (sous-traitant, avis du
// DPO), spécifique, réversibilité (quoi, format, délai, coût, aide), durée et préavis notés avec une alerte (§5) ; ordre
// de priorité des pièces (§2) ; « une fiche d'une page pour l'équipe (dates, livrables, recette, SLA, pénalités, préavis,
// contacts) » (§6, q38). Le SLA : « tes mesures contre le contrat » ; qui mesure : la PA dans son rapport, et toi
// (tickets, heures de début et de fin) ; la disponibilité compte jour et nuit ; les délais aux heures de support ; chaque
// écart, même le 1er : la cause, un plan daté, le suivi au comité ; les crédits : tu apportes le calcul, le DAF décide ;
// SLA tenu ne veut pas dire service correct (cp15 §4, q16, q19, q20).
// Exemple : le contrat de la PA (fiche DEMAT, cp14) et son SLA de mars et d'avril 2027 (cp15 §4, q19, q20).
LEARNSQL.outils = (LEARNSQL.outils || []).concat([
  {
    id: "gp-contrat",
    sujet: "gestion-projet",
    titre: "Fiche contrat et SLA",
    resume: "Relire tes clauses avant de signer, résumer le contrat sur une page pour l'équipe, puis mesurer le SLA chaque mois.",
    quand: "Avant la signature : la relecture. Après : la fiche d'une page. Chaque mois : le SLA, au comité fournisseur.",
    etapes: [
      "Avant de signer, relis tes clauses une par une, avec un texte proposé. Le juridique : le DAF, avec un avocat si besoin.",
      "Signé : une fiche d'une page pour l'équipe, avec les dates, les livrables, la recette, le SLA, les pénalités, le préavis, les contacts.",
      "Chaque mois, tes mesures contre le contrat. Un écart : sa cause, un plan daté, le suivi au comité. Les crédits : le DAF décide."
    ],
    cours: ["cp14", "cp15", "ot04"],
    type: "document",
    rubriques: [
      { id: "fournisseur", titre: "Fournisseur et contrat", type: "texte", aide: "Qui, quoi, signé quand et par qui." },
      { id: "type_contrat", titre: "Type de contrat", type: "texte", aide: "Forfait, régie ou abonnement : qui paie quand ça dérape ?" },
      { id: "clauses", titre: "Clauses relues avant la signature", type: "tableau", ligne: { titre: "Clause" },
        aide: "Tes clauses, les opérationnelles. Après la signature, tout changement passe par un avenant.",
        colonnes: [
          { id: "clause", titre: "Clause", type: "texte" },
          { id: "verifier", titre: "Ce que tu vérifies", type: "texte-long" },
          { id: "texte_contrat", titre: "Ce que dit le contrat", type: "texte-long", aide: "Le texte, ou ton texte proposé." },
          { id: "etat", titre: "État", type: "choix", valeurs: ["À relire", "OK", "À faire écrire"], defaut: "À relire",
            couleurs: ["neutre", "ok", "attention"] }
        ],
        modele: [
          { clause: "Livrables", verifier: "Une liste vérifiable, documentation comprise. Une passation écrite si le consultant change." },
          { clause: "Planning et tes obligations", verifier: "Des dates fixes, pas « indicatives ». Tes obligations (données à fournir) : tenables ?" },
          { clause: "Recette, PV et paiement", verifier: "Le délai de validation court après ta recette (piège : la recette tacite). Le solde au PV, pas à la livraison." },
          { clause: "Pénalités et plan B", verifier: "Par défaut, après une mise en demeure ; « sans mise en demeure » : dès la date. Un plafond. Le plan B écrit, avec son prix." },
          { clause: "SLA", verifier: "Un chiffre, une période, des heures, qui mesure. Pas « meilleurs efforts ». Les exclusions : jamais en clôture." },
          { clause: "Garantie", verifier: "Au forfait : un défaut se corrige sans frais, pendant une durée écrite. En régie : en général aucune, sauf clause." },
          { clause: "Données, RGPD et sortie", verifier: "Tes données t'appartiennent. Sous-traitant RGPD : vu par le DPO, ou le référent RGPD. La sortie : quoi, format, délai, coût, aide." },
          { clause: "Spécifique", verifier: "Le droit de l'utiliser, de le modifier, de le faire maintenir par un autre, sources livrées." },
          { clause: "Durée et préavis", verifier: "Reconduit seul ? La date limite pour résilier, notée avec une alerte : l'échéancier des contrats." },
          { clause: "Ordre de priorité", verifier: "Quelle pièce prime : le contrat et ses annexes avant les conditions générales. Absente ? Fais-la écrire." }
        ],
        alertes: [
          { si: "etat = \"À faire écrire\"", message: "Propose ton texte, et fais-le écrire avant la signature : après, il faut un avenant." }
        ],
        totaux: [
          { libelle: "Clauses à relire", calcul: "nombre", si: "etat = \"À relire\"" },
          { libelle: "À faire écrire avant la signature", calcul: "nombre", si: "etat = \"À faire écrire\"" }
        ] },
      { id: "dates", titre: "Dates clés", type: "texte-long", aide: "Livraisons, jalons, fin du contrat, et tes obligations (données à fournir)." },
      { id: "livrables", titre: "Livrables", type: "texte-long" },
      { id: "recette", titre: "Recette et paiement", type: "texte-long", aide: "Le délai de validation, le PV, le solde au PV." },
      { id: "sla", titre: "SLA", type: "texte-long", aide: "Chiffre, période, heures, qui mesure." },
      { id: "dispo_promise", titre: "Disponibilité promise (%)", type: "nombre", aide: "Le chiffre du SLA, par mois. Ex. : 99,5." },
      { id: "penalites", titre: "Pénalités", type: "texte-long", aide: "Dès la date, ou après une mise en demeure ; leur plafond. Le DAF décide de les appliquer." },
      { id: "preavis", titre: "Durée et préavis", type: "texte", aide: "La date limite pour résilier va à l'échéancier des contrats." },
      { id: "contacts", titre: "Contacts", type: "texte-long", aide: "Nom, numéro, heures." },
      { id: "suivi", titre: "Le SLA, mois par mois", type: "tableau", ligne: { titre: "Mois" },
        colonnes: [
          { id: "mois", titre: "Mois", type: "texte" },
          { id: "jours", titre: "Jours dans le mois", type: "nombre" },
          { id: "panne", titre: "Panne relevée (h)", type: "nombre", aide: "Tes tickets : heures de début et de fin. Jour et nuit, week-end compris." },
          { id: "dispo", titre: "Disponibilité mesurée (%)", type: "calcul", formule: "(jours * 24 - panne) / (jours * 24) * 100" },
          { id: "rapport", titre: "Son rapport (%)", type: "nombre", aide: "Le chiffre du fournisseur, à côté du tien." },
          { id: "delais", titre: "Délais du support", type: "choix", valeurs: ["Tenus", "Ratés"], couleurs: ["ok", "ko"],
            aide: "Prise en charge et rétablissement : aux heures de support, dès le ticket." },
          { id: "suite", titre: "Cause, plan daté, crédits", type: "texte-long",
            aide: "Chaque écart, même le 1er : la cause, un plan daté, le suivi au comité. Les crédits : le DAF décide." }
        ],
        alertes: [
          { si: "dispo < dispo_promise et suite vide",
            message: "SLA raté : la cause, un plan daté, le suivi au comité. Les crédits : tu apportes le calcul, le DAF décide." },
          { si: "rapport >= dispo_promise et dispo < dispo_promise et suite vide",
            message: "Son rapport dit « tenu », tes tickets disent « raté » : montre-les au comité, et demande comment il mesure." },
          { si: "delais = \"Ratés\" et suite vide", message: "Délai du support raté : la cause, un plan daté, le suivi au comité." }
        ],
        totaux: [
          { libelle: "Mois suivis", calcul: "nombre" },
          { libelle: "Mois sous le SLA", calcul: "nombre", si: "dispo < dispo_promise" }
        ],
        aideTotaux: "SLA tenu ne veut pas dire service correct : une lenteur se mesure aussi, et va au comité." }
    ],
    alertes: [
      { si: "dispo_promise vide et suivi non vide", message: "Écris la disponibilité promise par le contrat : sans elle, le SLA ne se contrôle pas." }
    ],
    exemple: {
      nom: "Contrat de la PA",
      rubriques: {
        fournisseur: "La PA (plateforme agréée) : contrat signé par le DAF en novembre 2026.",
        type_contrat: "Abonnement de 3 ans, 850 € par mois ; mise en service du connecteur au forfait, 7 400 €.",
        clauses: [
          { clause: "Livrables", verifier: "Une liste vérifiable, documentation comprise. Une passation écrite si le consultant change.",
            texte_contrat: "Le connecteur standard : factures et avoirs, clients et fournisseurs, 3 sites. Le portail web, pour le plan B.", etat: "OK" },
          { clause: "Planning et tes obligations", verifier: "Des dates fixes, pas « indicatives ». Tes obligations (données à fournir) : tenables ?",
            texte_contrat: "Connecteur livré le 1er mars 2027, date fixe. Nos données de paramétrage : le 15 janvier 2027.", etat: "OK" },
          { clause: "Recette, PV et paiement", verifier: "Le délai de validation court après ta recette (piège : la recette tacite). Le solde au PV, pas à la livraison.",
            texte_contrat: "Le délai de validation court après notre recette. Mise en service : 3 700 € à la signature, 3 700 € au PV.", etat: "OK" },
          { clause: "Pénalités et plan B", verifier: "Par défaut, après une mise en demeure ; « sans mise en demeure » : dès la date. Un plafond. Le plan B écrit, avec son prix.",
            texte_contrat: "Par jour de retard après le 1er mars, sans mise en demeure, plafonnées. Plan B : le portail de la PA, prévu au contrat et inclus.", etat: "OK" },
          { clause: "SLA", verifier: "Un chiffre, une période, des heures, qui mesure. Pas « meilleurs efforts ». Les exclusions : jamais en clôture.",
            texte_contrat: "99,5 % par mois, jour et nuit. Support de 8 h à 18 h, jours ouvrés. Maintenances annoncées : la nuit ou le week-end, jamais en clôture.", etat: "OK" },
          { clause: "Garantie", verifier: "Au forfait : un défaut se corrige sans frais, pendant une durée écrite. En régie : en général aucune, sauf clause.",
            texte_contrat: "Abonnement : le service se corrige par le support, dans le SLA.", etat: "OK" },
          { clause: "Données, RGPD et sortie", verifier: "Tes données t'appartiennent. Sous-traitant RGPD : vu par le DPO, ou le référent RGPD. La sortie : quoi, format, délai, coût, aide.",
            texte_contrat: "Nos données nous appartiennent ; clause de sous-traitant, vue par le DPO. Export des factures et de leurs statuts, en format standard, sous 30 jours, prix connu, avec une aide.", etat: "OK" },
          { clause: "Spécifique", verifier: "Le droit de l'utiliser, de le modifier, de le faire maintenir par un autre, sources livrées.",
            texte_contrat: "Rien de spécifique : le connecteur standard de la PA.", etat: "OK" },
          { clause: "Durée et préavis", verifier: "Reconduit seul ? La date limite pour résilier, notée avec une alerte : l'échéancier des contrats.",
            texte_contrat: "3 ans, puis reconduit chaque année, sauf préavis de 6 mois.", etat: "OK" },
          { clause: "Ordre de priorité", verifier: "Quelle pièce prime : le contrat et ses annexes avant les conditions générales. Absente ? Fais-la écrire.",
            texte_contrat: "Le contrat et ses annexes priment sur les conditions générales de la PA.", etat: "OK" }
        ],
        dates: "Nos données de paramétrage : le 15 janvier 2027. Connecteur livré : le 1er mars 2027. Fin du contrat : le 30 novembre 2029.",
        livrables: "Le connecteur standard (factures et avoirs, clients et fournisseurs, 3 sites), installé et paramétré dans Divalto par l'intégrateur. Le portail web, pour le plan B.",
        recette: "Le délai de validation court après notre recette. PV : 0 anomalie bloquante ni majeure. Solde de la mise en service, 3 700 €, au PV.",
        sla: "99,5 % par mois, jour et nuit. Support de 8 h à 18 h, jours ouvrés : prise en charge en 1 h, portail rétabli en 4 h. Priorités : 1 = tout est bloqué, 2 = une partie. Mesuré par la PA et par nos tickets.",
        dispo_promise: 99.5,
        penalites: "Connecteur en retard : par jour après le 1er mars, sans mise en demeure, plafonnées. SLA raté : des crédits sur l'abonnement, plafonnés. Le DAF décide de les appliquer.",
        preavis: "3 ans, puis reconduit chaque année ; préavis de 6 mois : décider avant fin mai 2029.",
        contacts: "Chef de projet de la PA : 06 00 00 00 01, jours ouvrés. Support : par ticket, de 8 h à 18 h. Son responsable de compte : quand un écart dure.",
        suivi: [
          { mois: "Mars 2027", jours: 31, panne: 0, rapport: "", delais: "Tenus",
            suite: "SLA tenu. Mais le portail est lent de 8 h à 9 h : 2 minutes par facture, 1 h par jour pour Julie. Mesures portées au comité : cause et plan daté demandés." },
          { mois: "Avril 2027", jours: 30, panne: 6, rapport: 99.8, delais: "",
            suite: "Au comité de mai : nos tickets à côté de son rapport ; cause et plan daté demandés. Crédits : le DAF y renonce, « en pleine recette » ; on mesure toujours." }
        ]
      }
    },
    export: ["excel", "copier", "imprimer"]
  }
]);
