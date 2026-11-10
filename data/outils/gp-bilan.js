// Outil « Bilan de fin et REX » (docs/outils.md), défini par l'expert chef de projet d'après les cours cp22 et cp15.
// Les décisions, actions et points ouverts de la réunion de clôture restent dans le compte rendu (gp-compte-rendu).
// Règles des cours : « Le bilan compare au départ : date, budget, qualité, adoption. Chaque écart a sa cause, contre la
// référence à jour, changements acceptés compris. Un total sauvé par la réserve ne cache pas une ligne qui dépasse » ;
// la réserve rendue n'est pas une économie ; les commandes se soldent, ce qui ne l'est pas devient un point ouvert, avec
// un nom ; corrigé n'est pas levé ; les accès des prestataires se ferment ; le DAF prononce la clôture au COPIL (cp22 §5) ;
// le REX se fait tôt, avec ceux qui ont fait, sans coupable, sur des faits ; ce qui a marché s'écrit avec sa raison ;
// « 3 à 5 actions nommées, dans le modèle de projet de la DSI, lues au prochain cadrage » ; le bilan de chaque
// fournisseur : faits datés, sa réponse à côté (cp22 §6, q29 à q33) ; « un bilan écrit par fournisseur (délais, qualité,
// SLA, relation), partagé avec lui ; il nourrit le prochain choix » (cp15 §7).
// Exemple : la clôture de DEMAT au COPIL du mardi 13 juillet 2027, REX du mercredi 30 juin (cp22 §4 à §6, q21 à q33).
LEARNSQL.outils = (LEARNSQL.outils || []).concat([
  {
    id: "gp-bilan",
    sujet: "gestion-projet",
    titre: "Bilan de fin et REX",
    resume: "Clôturer un projet : le bilan comparé au départ, ce qui se ferme, le REX sans coupable, et le bilan de chaque fournisseur.",
    quand: "Le REX juste après l'hypercare, avec ceux qui ont fait. Le bilan au dernier COPIL : le DAF y prononce la clôture.",
    etapes: [
      "Compare au départ : date, budget, qualité, adoption. Chaque écart a sa cause, contre la référence à jour.",
      "Ferme ce qui doit l'être : commandes, réserves du PV, accès, réserve. Ce qui reste ouvert reçoit un nom.",
      "REX sans coupable : ce qu'on garde, avec sa raison, et 3 à 5 actions nommées. Bilan de chaque fournisseur, sa réponse à côté."
    ],
    cours: ["cp22", "cp15"],
    type: "document",
    rubriques: [
      { id: "projet", titre: "Projet", type: "texte" },
      { id: "copil", titre: "COPIL de clôture", type: "date", aide: "Le DAF prononce la clôture, sur ton bilan, le travail du projet fait." },
      { id: "bilan", titre: "Le bilan, comparé au départ", type: "tableau", ligne: { titre: "Axe" },
        colonnes: [
          { id: "axe", titre: "Axe", type: "texte" },
          { id: "depart", titre: "Au départ", type: "texte-long", aide: "La référence à jour : changements acceptés compris." },
          { id: "fin", titre: "À la fin", type: "texte-long", aide: "Le résultat. Pas encore mesuré ? Qui le mesure, et quand." },
          { id: "ecart", titre: "Écart et sa cause", type: "texte-long",
            aide: "Chaque écart a sa cause. Un total sauvé par la réserve ne cache pas une ligne qui dépasse." }
        ],
        modele: [{ axe: "Date" }, { axe: "Budget" }, { axe: "Qualité" }, { axe: "Adoption" }],
        alertes: [
          { si: "fin vide ou ecart vide", message: "Écris le résultat, et l'écart avec sa cause. Pas encore mesuré ? Qui le mesure, et quand." }
        ] },
      { id: "fermer", titre: "Ce qui se ferme, ou reçoit un nom", type: "liste", ligne: { titre: "Point" },
        aide: "Commandes soldées, réserves du PV levées par écrit, accès fermés, réserve rendue, run et risques passés par écrit, archives." },
      { id: "rex", titre: "Le REX : ce qu'on garde, ce qu'on change", type: "tableau", ligne: { titre: "Constat" },
        colonnes: [
          { id: "constat", titre: "Constat", type: "texte-long", aide: "Un fait : registres, tickets, chiffres. Pas un coupable." },
          { id: "raison", titre: "Cause ou raison", type: "texte-long" },
          { id: "suite", titre: "On garde ou on change", type: "choix", valeurs: ["On garde", "On change"] },
          { id: "action", titre: "Action pour le prochain projet", type: "texte-long", aide: "Écrite au modèle de projet de la DSI, lue au prochain cadrage." },
          { id: "qui", titre: "Qui", type: "texte", aide: "Un nom." }
        ],
        alertes: [
          { si: "suite = \"On change\" et (action vide ou qui vide)",
            message: "Ce qu'on change devient une action, avec un nom, dans le modèle de projet de la DSI." },
          { si: "suite = \"On garde\" et raison vide",
            message: "Ce qui a marché s'écrit avec sa raison : sinon, le prochain projet le supprime « pour gagner du temps »." }
        ],
        totaux: [
          { id: "nb_actions", libelle: "Actions (3 à 5)", calcul: "nombre", si: "suite = \"On change\"" },
          { libelle: "Ce qu'on garde", calcul: "nombre", si: "suite = \"On garde\"" }
        ] },
      { id: "fournisseurs", titre: "Le bilan des fournisseurs", type: "tableau", ligne: { titre: "Fait", pluriel: "Faits" },
        aide: "Un bilan écrit par fournisseur, partagé avec lui. Il nourrit le prochain choix.",
        colonnes: [
          { id: "fournisseur", titre: "Fournisseur", type: "texte" },
          { id: "axe", titre: "Axe", type: "choix", valeurs: ["Délais", "Qualité", "SLA", "Relation"] },
          { id: "fait", titre: "Fait daté", type: "texte-long", aide: "Sans adjectif. Le bon travail aussi." },
          { id: "reponse", titre: "Sa réponse", type: "texte-long", aide: "Écrite à côté : la cause, ce qui a changé." }
        ],
        alertes: [
          { si: "reponse vide", message: "Partage ce bilan avec lui : sa réponse s'écrit à côté du fait." }
        ] }
    ],
    alertes: [
      { si: "rex vide", message: "Fais le REX tôt, avec ceux qui ont fait : les faits et les causes, pas les coupables." },
      { si: "nb_actions > 5", message: "Plus de 5 actions : personne ne les relira. Garde les 3 à 5 plus utiles, chacune avec un nom." }
    ],
    exemple: {
      nom: "Clôture de DEMAT 2027",
      rubriques: {
        projet: "DEMAT 2027 : la facture électronique",
        copil: "2027-07-13",
        bilan: [
          { axe: "Date", depart: "Bascule des 3 sites en juin ; ± 2 semaines par jalon.",
            fin: "Bascule le lundi 14 juin, comme prévu. PV le 30 avril, avec 2 réserves mineures.",
            ecart: "Aucun à la bascule. La recette lente a mangé sa marge : PV prévu au 7 mai en avril, revenu au 30 avril." },
          { axe: "Budget", depart: "Référence : 85 250 € (version 2, changements n° 7 et n° 9 compris). Plafond : 90 000 €.",
            fin: "Sous la référence. Réserve : 1 600 € pour l'archivage, 6 400 € rendus.",
            ecart: "Intégrateur : + 2 jours, + 1 500 € (flux EDI sous-estimés). Formation : + 300 € (3e session). Le total tient grâce à la réserve rendue." },
          { axe: "Qualité", depart: "Moins de 2 % de rejets le 1er mois ; clôture toujours en 5 jours ouvrés.",
            fin: "1,7 % de rejets depuis la bascule ; clôture de juin en 5 jours ouvrés.", ecart: "Aucun." },
          { axe: "Adoption", depart: "Au 3e mois, plus aucune facture reçue par la PA ressaisie à la main.",
            fin: "Mesurée en septembre 2027 par la cheffe comptable ; tu l'aides.", ecart: "Pas encore mesurée : la date est fixée." }
        ],
        fermer: [
          "Commandes de l'intégrateur soldées : 42 jours faits sur 43 commandés.",
          "Les 2 réserves du PV : corrigées le 9 juillet, levées par écrit par le métier.",
          "Accès des prestataires fermés : ton DSI a décidé, le N2 a fermé.",
          "Réserve rendue : 6 400 €.",
          "Passés au run, par écrit : 28 mensualités (23 800 €), l'archivage, le risque de hausse de 2029.",
          "Point ouvert : l'avoir de 85 € de la PA (crédit du SLA de mai). La compta le suit ; toi, au comité fournisseur.",
          "Archives : contrats, PV, registres, bilan. Le dossier d'exploitation vit au run, tenu par le N2."
        ],
        rex: [
          { constat: "Le pilote sur 1 site, en mai.", raison: "Les rejets mesurés et corrigés sur 1 site, avant les 3.",
            suite: "On garde", action: "", qui: "" },
          { constat: "La répétition de toute la bascule.", raison: "L'ordre et les durées connus avant le jour J.",
            suite: "On garde", action: "", qui: "" },
          { constat: "Le retour arrière testé fin mai.", raison: "Le go s'est décidé sur un plan B prouvé, pas promis.",
            suite: "On garde", action: "", qui: "" },
          { constat: "Flux EDI : 43 jours au lieu de 40.", raison: "Les flux chiffrés en bloc, sans ceux qui les connaissent.",
            suite: "On change", action: "Chiffrer chaque flux EDI avec Marc.", qui: "Toi" },
          { constat: "Recette lente : la clôture de mars et le congé de la cheffe comptable.", raison: "Le plan comptait 20 cas par semaine ; la compta, en clôture puis en congé, en a joué 15.",
            suite: "On change", action: "Au planning de la recette, compter les vrais jours du métier : clôtures, congés.", qui: "Toi" },
          { constat: "Avoirs fournisseurs : une seule personne savait les traiter.", raison: "Ce savoir rare n'est entré au registre des risques qu'en février.",
            suite: "On change", action: "Au cadrage, chercher les savoirs rares et nommer un suppléant.", qui: "Toi" },
          { constat: "La documentation du paramétrage, livrée en tableau, sans explication.", raison: "« Livré » ne disait pas « testé par un autre ».",
            suite: "On change", action: "Écrire à la commande : une documentation est livrée quand le N2 l'a testée seul.", qui: "Toi" }
        ],
        fournisseurs: [
          { fournisseur: "La PA", axe: "Délais", fait: "Janvier et février 2027 : 2 petits jalons ratés. Connecteur livré le 1er mars, à la date du contrat.",
            reponse: "Son ordre des tâches, revu en février : plus aucun jalon raté ensuite." },
          { fournisseur: "La PA", axe: "SLA", fait: "Avril : 6 h de panne d'après nos tickets, 99,8 % dans son rapport. Mai : SLA raté, crédit de 85 € décidé par le DAF.",
            reponse: "Ses chiffres excluent les maintenances annoncées : les deux mesures se comparent au comité." },
          { fournisseur: "L'intégrateur", axe: "Délais", fait: "Fin mars : 1 flux EDI fini sur 3 prévus ; 3 jours commandés en plus le 30 mars.",
            reponse: "Flux chiffrés en bloc au départ ; désormais flux par flux, avec le métier." },
          { fournisseur: "L'intégrateur", axe: "Qualité", fait: "Le bon travail : la bascule répétée, le retour arrière testé ; le N2 a refait seul chaque procédure.",
            reponse: "Merci reçu ; le consultant reste le contact N3 du run, par ticket." }
        ]
      }
    },
    export: ["excel", "copier", "imprimer"]
  }
]);
