// Outil « MoSCoW : trier les demandes » (docs/outils.md), défini par l'expert chef de projet d'après le cours cp18.
// Règles du cours : « Des critères écrits AVANT de comparer : loi, valeur, urgence (une date), risque si on ne fait rien,
// effort (en jours). Le rang du demandeur n'en est pas un » ; « La loi n'est pas un critère qu'on pèse : c'est un
// filtre » ; MoSCoW (méthode agile DSDM) : « « Doit » : sans lui, la bascule échoue. « Devrait » : important,
// contournable. « Pourrait » : confort. « Pas cette fois » : écrit, avec une date » ; « Repère DSDM : pas plus d'environ
// 60 % de l'effort en « doit ». Sinon, rien ne protège la date » ; tu proposes le classement, avec les métiers ; le
// sponsor valide les « doit » et tranche en cas de désaccord (§4, q19 à q21). L'effort se compte en jours, estimé par
// celui qui fait (cp05 §2). La part du « doit » se compte sur la place (les jours disponibles, l'effort d'une
// itération pour DSDM) : « le reste devient « devrait » ou « pourrait » » (q20) ; « pas cette fois » n'est pas dans la
// place.
// Exemple : les demandes de la compta pour la bascule, l'enveloppe des écrans de 10 jours (fiche DEMAT, cp06), triées
// en février 2027 ; l'alerte par mail de Sophie en « pas cette fois », tri fait par la cheffe comptable, PO (cp06 §5,
// cp10), « doit » validés par le DAF (cp18 §4, q21).
LEARNSQL.outils = (LEARNSQL.outils || []).concat([
  {
    id: "gp-moscow",
    sujet: "gestion-projet",
    titre: "MoSCoW : trier les demandes",
    resume: "Trier des demandes pour une place limitée : doit, devrait, pourrait, pas cette fois, avec au plus environ 60 % de l'effort en « doit ».",
    quand: "Quand plusieurs demandes veulent la même place : une itération, une enveloppe de jours, la bascule.",
    etapes: [
      "Écris les critères avant de comparer : la loi d'abord (un filtre), puis la valeur, l'urgence, le risque, l'effort.",
      "Classe avec les métiers. « Doit » : sans lui, la bascule échoue. Pas plus d'environ 60 % de l'effort en « doit ».",
      "« Pas cette fois » s'écrit avec une date, et se dit au demandeur. Le sponsor valide les « doit »."
    ],
    cours: ["cp18"],
    type: "document",
    rubriques: [
      { id: "objet", titre: "Ce qu'on trie", type: "texte", aide: "La place : une itération, une enveloppe de jours, les jours avant la bascule." },
      { id: "place", titre: "Place (jours)", type: "nombre", aide: "Les jours disponibles." },
      { id: "criteres", titre: "Critères, écrits avant de comparer", type: "texte-long",
        defaut: "La loi d'abord : un filtre, pas un critère qu'on pèse. Puis la valeur, l'urgence (une date), le risque si on ne fait rien, l'effort (en jours). Le rang du demandeur n'en est pas un." },
      { id: "demandes", titre: "Demandes", type: "tableau", ligne: { titre: "Demande" },
        colonnes: [
          { id: "demande", titre: "Demande", type: "texte-long" },
          { id: "demandeur", titre: "Demandeur", type: "texte" },
          { id: "pourquoi", titre: "Pourquoi", type: "texte-long", aide: "Sur tes critères : la loi, la valeur, l'urgence, le risque si on ne fait rien." },
          { id: "effort", titre: "Effort (jours)", type: "nombre", aide: "Estimé par celui qui fera le travail." },
          { id: "classe", titre: "Classe", type: "choix", valeurs: ["Doit", "Devrait", "Pourrait", "Pas cette fois"],
            aide: "Doit : sans lui, la bascule échoue. Devrait : important, contournable. Pourrait : confort. Pas cette fois : écrit, avec une date." },
          { id: "quand", titre: "Pas cette fois : pour quand", type: "date", aide: "Une date, dite au demandeur. Ce n'est pas « jamais »." }
        ],
        alertes: [
          { si: "classe vide", message: "Classe la demande : doit, devrait, pourrait, ou pas cette fois." },
          { si: "effort vide", message: "Chiffre l'effort en jours, avec celui qui fera le travail." },
          { si: "classe = \"Pas cette fois\" et quand vide",
            message: "« Pas cette fois » s'écrit avec une date, et se dit au demandeur : ce n'est pas « jamais »." }
        ],
        totaux: [
          { id: "effort_prevu", libelle: "Effort prévu (jours) : doit, devrait, pourrait", calcul: "somme", colonne: "effort",
            si: "classe <> \"Pas cette fois\"" },
          { id: "effort_doit", libelle: "dont « doit » (jours)", calcul: "somme", colonne: "effort", si: "classe = \"Doit\"" },
          { id: "part_doit", libelle: "Part du « doit » dans la place (%)", calcul: "formule", formule: "effort_doit / place * 100",
            niveaux: [{ max: 60, libelle: "Dans le repère", couleur: "ok" }, { libelle: "Au-delà du repère", couleur: "ko" }] },
          { libelle: "Pas cette fois", calcul: "nombre", si: "classe = \"Pas cette fois\"" }
        ],
        aideTotaux: "Repère DSDM : pas plus d'environ 60 % de l'effort en « doit », compté sur la place. Sinon, rien ne protège la date." },
      { id: "valide", titre: "Validé par", type: "texte", aide: "Tu proposes le classement, avec les métiers. Dans une partie agile, le PO classe. Le sponsor valide les « doit », et tranche en cas de désaccord." }
    ],
    alertes: [
      { si: "part_doit > 60",
        message: "Plus de 60 % de la place en « doit » : rien ne protège la date. Refais le tri avec le métier : « sans elle, la bascule échoue-t-elle ? »" },
      { si: "effort_prevu > place",
        message: "L'effort prévu dépasse la place : quelque chose doit sortir. Contesté ? Le sponsor tranche, sur tes critères." },
      { si: "place vide", message: "Écris la place : les jours disponibles. Sans elle, pas de part du « doit »." },
      { si: "valide vide", message: "Fais valider les « doit » par le sponsor. En cas de désaccord, il tranche." }
    ],
    exemple: {
      nom: "Demandes de la compta, février 2027",
      rubriques: {
        objet: "Les demandes de la compta pour la bascule : l'enveloppe des écrans, 10 jours d'intégrateur, de février à avril.",
        place: 10,
        criteres: "La loi d'abord : un filtre, pas un critère qu'on pèse. Puis la valeur, l'urgence (une date), le risque si on ne fait rien, l'effort (en jours). Le rang du demandeur n'en est pas un.",
        demandes: [
          { demande: "État des factures bloquées", demandeur: "La cheffe comptable",
            pourquoi: "Sans lui, les factures bloquées ne se voient pas : la clôture en 5 jours ouvrés est en jeu.", effort: 2, classe: "Doit", quand: "" },
          { demande: "État des rejets", demandeur: "La cheffe comptable",
            pourquoi: "Attendu pour le pilote de mai : suivre les rejets, sous 2 % (critère de succès).", effort: 3, classe: "Doit", quand: "" },
          { demande: "État des avoirs fournisseurs en attente", demandeur: "La cheffe comptable",
            pourquoi: "Un gain de temps, contournable. Le standard de Divalto d'abord.", effort: 3, classe: "Devrait", quand: "" },
          { demande: "Écran des factures reçues, trié par site", demandeur: "Julie",
            pourquoi: "Confort : le filtre du standard suffit.", effort: 1, classe: "Pourrait", quand: "" },
          { demande: "Total des avoirs clients du mois, en bas de l'écran", demandeur: "Sophie",
            pourquoi: "Confort : un export le donne.", effort: 1, classe: "Pourrait", quand: "" },
          { demande: "Une alerte par mail sur chaque facture rejetée", demandeur: "Sophie",
            pourquoi: "Utile, pas nécessaire à la bascule : l'état des rejets les montre.", effort: 2, classe: "Pas cette fois", quand: "2027-07-01" }
        ],
        valide: "Tri fait par la cheffe comptable, PO de l'enveloppe. « Doit » validés par le DAF, le 3 février 2027."
      }
    },
    export: ["excel", "copier", "imprimer"]
  }
]);
