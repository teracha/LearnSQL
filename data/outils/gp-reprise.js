// Outil « Reprise de données » (docs/outils.md), défini par l'expert chef de projet d'après le cours cp20.
// Règles du cours : « L'inventaire : chaque donnée, sa source, sa cible, son volume, son propriétaire » ; le propriétaire
// est au métier, pas la DSI ni l'intégrateur ; on reprend ce qui sert, en-cours compris (§1) ; « Mesurer avant : les
// vides, les formats faux, les doublons. Des chiffres, par propriétaire, avec une date et le temps à prévoir (fiches ×
// minutes) » ; on corrige à la source, par le métier (§2) ; « Une règle par champ, écrite », validée par le propriétaire ;
// une règle qui change : nouvelle version, revalidée (§3) ; au moins deux essais à blanc, chronométrés (§4) ; « Extraites
// = chargées + rejetées. Une seule fiche sans explication bloque la signature » ; un écart s'explique dans un sens comme
// dans l'autre (q24) ; le propriétaire signe, chiffres en main, pas l'intégrateur (§5) ; la reprise définitive rejoue
// l'essai 2 : gel annoncé, sauvegarde complète, même ordre, mêmes contrôles, signatures avant la bascule (§6).
// Exemple : DEMAT après l'essai 2 (cp20 §1 à §6, q20, q24, q43 à q45) : essai 1, 2 600 = 2 340 + 260 ; essai 2,
// clients 2 000 = 1 980 + 20, fournisseurs 600 = 594 + 6, 26 rejets expliqués, signés le dimanche 16 mai ; le
// week-end du 12 et 13 juin prévu (fiche DEMAT).
LEARNSQL.outils = (LEARNSQL.outils || []).concat([
  {
    id: "gp-reprise",
    sujet: "gestion-projet",
    titre: "Reprise de données",
    resume: "Préparer et prouver une reprise : l'inventaire des données, la qualité mesurée avant, puis les contrôles de chaque essai.",
    quand: "L'inventaire dès le cadrage. Les contrôles à chaque essai à blanc (au moins deux), puis le week-end de la reprise définitive.",
    etapes: [
      "Pour chaque donnée : sa source, sa cible, son volume, son propriétaire au métier. On reprend ce qui sert, en-cours compris.",
      "Mesure la qualité avant, en chiffres, par propriétaire. Le temps à prévoir : fiches × minutes. On corrige à la source, par le métier.",
      "À chaque essai : extraites = chargées + rejetées, chaque rejet expliqué. Puis le propriétaire signe, chiffres en main."
    ],
    cours: ["cp20", "ot05"],
    type: "document",
    rubriques: [
      { id: "projet", titre: "Projet", type: "texte", aide: "Le projet, et ce qu'on reprend, vers où." },
      { id: "inventaire", titre: "Inventaire", type: "tableau", ligne: { titre: "Donnée", pluriel: "Données" },
        colonnes: [
          { id: "donnee", titre: "Donnée", type: "texte", aide: "Fiches clients, fiches fournisseurs, codes TVA…" },
          { id: "source", titre: "Source", type: "texte" },
          { id: "cible", titre: "Cible", type: "texte" },
          { id: "volume", titre: "Volume", type: "nombre", aide: "Ce qu'on reprend : ce qui sert, en-cours compris." },
          { id: "proprietaire", titre: "Propriétaire", type: "texte",
            aide: "Au métier : il sait ce que la donnée veut dire, fait corriger, valide. Pas la DSI, ni l'intégrateur." },
          { id: "regles", titre: "Règles de reprise", type: "texte",
            aide: "Une règle par champ, écrite. Sa version, et qui l'a validée : le propriétaire." }
        ],
        alertes: [
          { si: "proprietaire vide", message: "Chaque donnée a un propriétaire au métier : il sait ce qu'elle veut dire, fait corriger, valide." },
          { si: "regles vide", message: "Écris les règles de reprise, champ par champ, et fais-les valider par le propriétaire." }
        ],
        totaux: [{ libelle: "Données", calcul: "nombre" }] },
      { id: "qualite", titre: "Qualité, mesurée avant", type: "tableau", ligne: { titre: "Problème", pluriel: "Problèmes" },
        colonnes: [
          { id: "probleme", titre: "Problème", type: "texte", aide: "Des vides, des formats faux, des doublons : des chiffres." },
          { id: "proprietaire", titre: "Propriétaire", type: "texte", aide: "Il corrige à la source, dans l'outil d'origine." },
          { id: "fiches", titre: "Fiches", type: "nombre" },
          { id: "minutes", titre: "Minutes par fiche", type: "nombre" },
          { id: "heures", titre: "Temps à prévoir (h)", type: "calcul", formule: "fiches * minutes / 60" },
          { id: "mesure", titre: "Mesuré le", type: "date" }
        ],
        alertes: [
          { si: "proprietaire vide", message: "Le propriétaire corrige à la source : écris son nom. Le temps de son équipe se demande à lui." }
        ],
        totaux: [{ libelle: "Temps à prévoir (h)", calcul: "somme", colonne: "heures" }] },
      { id: "controles", titre: "Contrôles, à chaque essai", type: "tableau", ligne: { titre: "Contrôle", pluriel: "Contrôles" },
        colonnes: [
          { id: "essai", titre: "Essai", type: "texte", aide: "Essai 1, essai 2, reprise définitive : la date, la durée mesurée." },
          { id: "donnee", titre: "Donnée", type: "texte" },
          { id: "extraites", titre: "Extraites", type: "nombre" },
          { id: "chargees", titre: "Chargées", type: "nombre" },
          { id: "rejetees", titre: "Rejetées", type: "nombre" },
          { id: "ecart", titre: "Écart", type: "calcul", formule: "extraites - chargees - rejetees",
            niveaux: [
              { sous: 0, libelle: "Fiches en trop", couleur: "ko" },
              { max: 0, libelle: "Juste", couleur: "ok" },
              { libelle: "Fiches manquantes", couleur: "ko" }
            ] },
          { id: "expliques", titre: "Rejets expliqués", type: "nombre", aide: "Chaque rejet : sa cause et son propriétaire." },
          { id: "signe", titre: "Signé par, le", type: "texte", aide: "Le propriétaire, chiffres en main. Pas l'intégrateur." }
        ],
        alertes: [
          { si: "ecart <> 0",
            message: "Extraites, chargées et rejetées ne collent pas : des fiches manquent, ou sont en trop. Rapproche fiche par fiche, avant de signer." },
          { si: "rejetees > 0 et (expliques vide ou expliques < rejetees)",
            message: "Une seule fiche sans explication bloque la signature : chaque rejet, sa cause et son propriétaire." }
        ],
        totaux: [{ libelle: "Écarts à expliquer", calcul: "nombre", si: "ecart <> 0" }],
        aideTotaux: "Extraites = chargées + rejetées. Puis un total de contrôle, un rapprochement fiche par fiche, un échantillon ciblé, et la signature du propriétaire." },
      { id: "definitive", titre: "Reprise définitive", type: "texte-long",
        aide: "Le gel annoncé, une sauvegarde complète, l'ordre et la durée de l'essai 2, les mêmes contrôles, les signatures avant la bascule." }
    ],
    alertes: [
      { si: "inventaire vide", message: "Commence par l'inventaire : chaque donnée, sa source, sa cible, son volume, son propriétaire." }
    ],
    exemple: {
      nom: "DEMAT 2027, après l'essai 2",
      rubriques: {
        projet: "DEMAT 2027 : les tiers vers la PA, les codes TVA dans Divalto.",
        inventaire: [
          { donnee: "Fiches clients", source: "Divalto (3 400 fiches)", cible: "La PA", volume: 2000, proprietaire: "Le responsable ADV",
            regles: "Version 2, validée par le responsable ADV" },
          { donnee: "Fiches fournisseurs", source: "Divalto", cible: "La PA", volume: 600, proprietaire: "La cheffe comptable",
            regles: "Version 2, validée par la cheffe comptable" },
          { donnee: "Codes TVA", source: "Divalto : anciens codes", cible: "Divalto : nouveaux codes", volume: "",
            proprietaire: "La cheffe comptable", regles: "Table ancien → nouveau, version 2, revalidée par la cheffe comptable" }
        ],
        qualite: [
          { probleme: "Fiches clients sans SIREN", proprietaire: "Le responsable ADV", fiches: 300, minutes: 10, mesure: "2026-12-07" }
        ],
        controles: [
          { essai: "Essai 1, fin février (18 heures)", donnee: "Clients et fournisseurs", extraites: 2600, chargees: 2340, rejetees: 260,
            expliques: 260, signe: "Non : règles et fiches à corriger avant l'essai 2" },
          { essai: "Essai 2, 15 et 16 mai (13 heures)", donnee: "Fiches clients", extraites: 2000, chargees: 1980, rejetees: 20,
            expliques: 20, signe: "Le responsable ADV, le 16 mai" },
          { essai: "Essai 2, 15 et 16 mai (13 heures)", donnee: "Fiches fournisseurs", extraites: 600, chargees: 594, rejetees: 6,
            expliques: 6, signe: "La cheffe comptable, le 16 mai" }
        ],
        definitive: "Gel des tiers le vendredi 11 juin à 12 h. Samedi 12 : sauvegarde complète de Divalto, codes TVA, puis les tiers vers la PA (13 heures prévues, plus une marge). Dimanche 13 : contrôles, puis les signatures des 2 propriétaires. Lundi 14 : la bascule."
      }
    },
    export: ["excel", "copier", "imprimer"]
  }
]);
