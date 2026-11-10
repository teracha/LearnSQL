// Outil « Tableau de bord de l'équipe » (docs/outils.md), défini par l'expert chef de projet d'après le cours cp08.
// Règles du cours : « 5 à 7 indicateurs, pour décider : la date, le budget, la qualité. Le résultat (cas OK, rejets),
// pas l'activité (heures, réunions) » ; « Chacun a une définition écrite, la même partout, une source, un seuil fixé à
// l'avance et un responsable. Une impression (« moral : bon ») n'en est pas un » ; « La source fait foi, avec la date de
// ses données » ; deux sources diffèrent : tu vérifies avant de publier, puis un seul chiffre ; à jour chaque vendredi,
// chacun met à jour ses lignes, le point projet du lundi part de lui ; au DAF : le rapport mensuel, et les alertes (§2,
// q07 à q09, q13, q14) ; la tendance qui glisse vers la limite est déjà un risque (§1) ; le jour même au DAF : hors
// tolérance, risque légal, décision qui n'attend pas (§5).
// Exemple : le tableau de bord de DEMAT, vendredi 2 avril 2027, fin de la 3e semaine de recette (cp08 §1, §2, §6) :
// ses 6 lignes, leur source et leur seuil.
LEARNSQL.outils = (LEARNSQL.outils || []).concat([
  {
    id: "gp-tableau-bord",
    sujet: "gestion-projet",
    titre: "Tableau de bord de l'équipe",
    resume: "Suivre chaque semaine 5 à 7 indicateurs de résultat, chacun avec sa définition, sa source, son seuil et son responsable.",
    quand: "À jour chaque vendredi, chacun ses lignes. Le point projet du lundi part de lui. Au DAF : le rapport mensuel, et les alertes.",
    etapes: [
      "Choisis 5 à 7 indicateurs pour décider : la date, le budget, la qualité. Le résultat (cas OK, rejets), pas l'activité.",
      "Pour chacun : une définition écrite, une source, un seuil fixé à l'avance, un responsable. Une impression n'est pas un indicateur.",
      "Chaque vendredi, chacun met à jour ses lignes, avec la date des données. Deux sources diffèrent ? Vérifie, puis un seul chiffre."
    ],
    cours: ["cp08"],
    type: "tableau",
    ligne: { titre: "Indicateur" },
    colonnes: [
      { id: "indicateur", titre: "Indicateur", type: "texte", aide: "Un résultat : cas OK, rejets. Pas une activité : heures, réunions." },
      { id: "definition", titre: "Définition", type: "texte-long", aide: "Écrite, la même partout. Elle ne change pas pour faire plus joli." },
      { id: "source", titre: "Source", type: "texte", aide: "Elle fait foi." },
      { id: "seuil", titre: "Seuil", type: "texte", aide: "Fixé à l'avance." },
      { id: "responsable", titre: "Responsable", type: "texte", aide: "Celui qui met la ligne à jour." },
      { id: "valeur", titre: "Valeur", type: "texte-long" },
      { id: "donnees_au", titre: "Données au", type: "date", aide: "La date des données de la source." },
      { id: "etat", titre: "État", type: "choix", valeurs: ["Dans le seuil", "En risque", "Seuil franchi"], couleurs: ["ok", "attention", "ko"],
        aide: "En risque : la tendance glisse vers le seuil. Seuil franchi : un plan daté." }
    ],
    alertes: [
      { si: "definition vide ou source vide ou seuil vide ou responsable vide",
        message: "Chaque indicateur : une définition écrite, une source, un seuil fixé à l'avance et un responsable." },
      { si: "etat = \"Seuil franchi\"",
        message: "Seuil franchi : au point projet du lundi, avec un plan daté. Hors tolérance ou risque légal : le DAF, le jour même." },
      { si: "donnees_au < aujourdhui - 7", message: "Données de plus d'une semaine : la ligne se met à jour chaque vendredi." }
    ],
    totaux: [
      { libelle: "Indicateurs (5 à 7)", calcul: "nombre" },
      { libelle: "En risque", calcul: "nombre", si: "etat = \"En risque\"" },
      { libelle: "Seuils franchis", calcul: "nombre", si: "etat = \"Seuil franchi\"" }
    ],
    aideTotaux: "Le tableau sert à l'équipe, chaque semaine. Au DAF : le rapport d'une page chaque mois, et ce qui n'attend pas, le jour même.",
    exemple: {
      nom: "DEMAT 2027, vendredi 2 avril",
      date: "2027-04-02",
      lignes: [
        { indicateur: "Jalons", definition: "Pour chaque jalon : la prévision contre la date prévue, en jours.", source: "Le planning",
          seuil: "± 2 semaines par jalon", responsable: "Toi",
          valeur: "PV de recette : prévu le 30 avril, prévision le 7 mai (+ 7 jours). Les autres jalons tenus.",
          donnees_au: "2027-04-02", etat: "En risque" },
        { indicateur: "Reste à faire de l'intégrateur", definition: "Les jours qui restent, tâche par tâche, réestimés chaque semaine par le consultant ; plus les jours faits, contre la commande.",
          source: "Le consultant, au point hebdo", seuil: "La commande dépassée", responsable: "Le consultant de l'intégrateur",
          valeur: "19 jours. 24 faits + 19 = 43, pour 43 commandés (3 jours signés le 30 mars).", donnees_au: "2027-03-30", etat: "Dans le seuil" },
        { indicateur: "Cas de recette joués et OK", definition: "Les cas joués et OK, contre le plan : 20 par semaine. Un cas en anomalie n'est pas passé.",
          source: "Le cahier de recette", seuil: "La marge de recette mangée", responsable: "Julie, Sophie et Marc",
          valeur: "45 joués sur 60 prévus, 38 OK. Au rythme réel, 15 par semaine : fin en 8e semaine, la marge est mangée.",
          donnees_au: "2027-04-02", etat: "Seuil franchi" },
        { indicateur: "Anomalies bloquantes ouvertes", definition: "Les anomalies bloquantes ouvertes, et depuis quand : on ne peut plus facturer ou recevoir.",
          source: "L'outil de tickets", seuil: "0 au PV", responsable: "Toi", valeur: "4 ouvertes, sur 7 anomalies.",
          donnees_au: "2027-04-02", etat: "En risque" },
        { indicateur: "Rejets de la PA", definition: "Les factures rejetées par la PA, sur les factures envoyées de la semaine.",
          source: "Le portail de la PA", seuil: "2 %", responsable: "Sophie", valeur: "Mesurés dès le pilote, le 3 mai.",
          donnees_au: "", etat: "" },
        { indicateur: "Atterrissage du budget", definition: "Consommé + reste à faire, réserve restante comprise.", source: "Ton suivi du budget",
          seuil: "90 k€", responsable: "Toi", valeur: "87 500 €, pour une référence de 85 250 €.", donnees_au: "2027-03-31", etat: "Dans le seuil" }
      ]
    },
    export: ["excel", "copier", "imprimer"]
  }
]);
