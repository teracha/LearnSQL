// Parcours « Maîtriser les outils du chef de projet » — Fiche de cours du module ot02 « Outils pour piloter ».
// Une section par outil de l'étape « Piloter » (data/outils/sujets.js), dans l'ordre : gp-risques, gp-tableau-bord,
// gp-rapport, gp-budget, gp-compte-rendu, gp-lundi. Pas de nouvelle notion : on apprend à SE SERVIR des outils. Les
// règles et les mots sont ceux des outils et de leurs cours, mot pour mot : cp07 (risques), cp08 (tableau de bord,
// rapport et météo), cp09 et cp17 (compte rendu), cp12 et cp15 (budget, régie), cp02 et cp03 (fiche du lundi, charge).
// Boutons et zones de l'écran : bloc « Outils » de js/app.js. Chiffres des exemples : ceux des exemples des outils,
// recalculés avec le moteur (js/outils.js) : note 3 × 2 = 6 « Priorité » ; 1 seuil franchi au 2 avril ; météo
// globale « Orange » ; atterrissage de la commande de base, avant la commande de 3 jours : 18 000 + 14 250 = 32 250 €
// pour 30 000 € engagés (alerte « L'atterrissage dépasse la commande ») ; charge 9 + 3 = 12 sur 10 = 120 %.
// Fil rouge : DEMAT 2027 (fiche fil rouge de docs/plan-chef-de-projet.md, qui fait foi).
LEARNSQL.cours.ot02 = {
  intro: "Piloter, c'est voir chaque semaine où en est le projet, et le dire à temps à ceux qui décident. Ici, tu apprends à te servir des 6 outils de l'étape « Piloter » du menu Outils : registre des risques, tableau de bord, rapport du COPIL (comité de pilotage), suivi du budget, compte rendu et fiche du lundi. Sur ta migration Divalto ou ton projet Snowflake + Power BI, où étaient écrits les risques, les chiffres et les décisions ?",
  sections: [
    {
      titre: "Registre des risques",
      exemple: "Lundi 8 février 2027, point projet de DEMAT 2027. Julie : « Seule la cheffe comptable sait traiter les avoirs fournisseurs. Et elle part du 12 au 30 avril. »\nTu ajoutes la ligne avec `+ Risque`. Probabilité 3, impact 2 : l'outil affiche 6, « Priorité ».\nPropriétaire : le DAF (directeur administratif et financier, ton sponsor), son manager. Pas elle : elle sera absente.",
      regle: "Un risque est un problème qui n'est pas encore arrivé. Le registre les rassemble pour les traiter tant qu'il est temps : chacun reçoit une note, une réponse, une date et un propriétaire. La note (probabilité × impact) dit où mettre l'effort en premier. Un registre utile se relit chaque semaine : sans action ni date, ce n'est qu'une liste d'inquiétudes. Quand un risque arrive, il devient un problème à traiter tout de suite.",
      points: [
        "À quoi il sert : lister les risques, les noter de 1 à 9, suivre leur action. Quand : dès le cadrage, puis 15 minutes chaque semaine au point projet.",
        "Sur le site : `Nouveau` ou `Partir de l'exemple`, puis une ligne par risque : « Parce que [cause], il peut arriver que [risque], ce qui entraînerait [conséquence]. » Note = probabilité × impact : 1 ou 2 « On surveille », 3 ou 4 « Action simple », 6 ou 9 « Priorité ».",
        "La règle : chaque ligne a une réponse, une date et un propriétaire nommé. Les réponses : éviter, réduire, transférer, accepter, ou escalader (la remettre à son porteur, hors du projet). Sans action ni date, l'alerte : c'est une liste d'inquiétudes.",
        "Le piège : la plus grosse solution. La bonne est la plus petite action qui réduit assez le risque. Repère : 10 à 20 risques ouverts.",
        "Le bon réflexe : le déclencheur daté décide pour toi. Atteint : statut « Arrivé », plan B lancé, sponsor prévenu le jour même. Action faite et vérifiée : « Fermé ». `Télécharger en Excel` garde la note en formule."
      ],
      retenir: "Une ligne de registre dit d'où vient le risque, combien il pèse, qui agit et quand."
    },
    {
      titre: "Tableau de bord de l'équipe",
      exemple: "Vendredi 2 avril 2027, 3e semaine de recette (les tests du métier). Le tableau de bord a 6 lignes, dont « Cas de recette joués et OK ».\nJulie, Sophie et Marc la mettent à jour : 45 cas joués sur 60 prévus, 38 OK. La marge de recette est mangée.\nÉtat : « Seuil franchi ». L'alerte : au point projet du lundi, avec un plan daté.",
      regle: "Le tableau de bord est l'outil de l'équipe : il montre chaque semaine si le projet avance vers son résultat. Il garde peu d'indicateurs, chacun avec une définition, une source et un seuil, pour que tout le monde lise le même chiffre. Il mesure ce qui est produit, pas l'agitation. Son rôle est d'alerter tôt : un indicateur qui glisse vers son seuil se traite avant de le franchir.",
      points: [
        "À quoi il sert : suivre 5 à 7 indicateurs de résultat. Quand : à jour chaque vendredi, chacun ses lignes ; le point projet du lundi part de lui.",
        "Sur le site : `+ Indicateur`, avec sa définition, sa source, son seuil et son responsable. Chaque vendredi : la valeur, « Données au » et l'état : « Dans le seuil », « En risque » ou « Seuil franchi ».",
        "La règle : le résultat (cas OK, rejets), pas l'activité (heures, réunions). Une impression (« moral : bon ») n'est pas un indicateur.",
        "Le piège : un vieux chiffre, ou deux. Données de plus d'une semaine ? L'alerte le dit. Deux sources diffèrent ? Tu vérifies, puis un seul chiffre : la source fait foi.",
        "Le bon réflexe : « En risque » dès que la tendance glisse vers le seuil. Au DAF : le rapport mensuel, et ce qui n'attend pas, le jour même."
      ],
      retenir: "Peu d'indicateurs, chacun avec une définition, une source et un seuil. Le tableau pour l'équipe, le rapport pour le DAF."
    },
    {
      titre: "Rapport du COPIL et météo",
      exemple: "Jeudi 8 avril 2027, COPIL le mardi 13. Tu fais `Dupliquer` sur le rapport de mars ; chiffres arrêtés au 31 mars.\nEn tête, la décision attendue : un intérimaire pour la recette, environ 4 000 €, oui ou non ?\nMétéo : délai orange (le PV, procès-verbal de recette, prévu le 7 mai au lieu du 30 avril) ; les 3 autres axes verts.\nL'outil calcule la météo globale : « Orange ».",
      regle: "Le rapport du COPIL est fait pour ceux qui décident, pas pour raconter le projet. Il tient sur une page, avec le même plan chaque mois, pour qu'on le lise en deux minutes. Il commence par les décisions attendues, puis donne l'état du projet en couleurs. Ces couleurs viennent de seuils fixés à l'avance, pas d'une impression : le rouge veut dire que le sponsor doit décider.",
      points: [
        "À quoi il sert : une page par mois pour le COPIL : décisions attendues, météo, jalons, 5 plus gros risques, ligne budget. Quand : 3 jours ouvrés avant, avec l'ordre du jour.",
        "Sur le site : un rapport neuf a déjà les 4 axes (délai, budget, périmètre, qualité et risques) et l'ordre du jour type. Jalon : prévu (seul le sponsor le change), réel, prévision. L'outil calcule l'écart et le reste de tolérance (14 jours).",
        "La règle : vert, dans les tolérances ; orange, risque d'en sortir ; rouge, hors tolérance, le sponsor doit décider. La météo globale = l'axe le plus mauvais.",
        "Le piège : la couleur d'après l'humeur. Les seuils font la couleur. Reste de tolérance sous 0 ? « Hors tolérance » : délai rouge, et le DAF le sait le jour même.",
        "Le bon réflexe : rien à décider ? Écris « Aucune décision attendue. » Le même modèle chaque mois, même tout vert. Puis `Copier` dans l'e-mail."
      ],
      retenir: "Une page, chaque mois, la même : les décisions d'abord, puis la météo, les jalons, les risques, le budget."
    },
    {
      titre: "Suivi du budget",
      exemple: "Fin mars 2027. Commande de base de l'intégrateur, en régie (au temps passé) : 40 jours, 30 000 €. Faits : 24 jours ; à faire : 19.\nSur sa ligne : consommé 18 000 €, reste à faire 14 250 €. Atterrissage calculé : 32 250 €, pour 30 000 € engagés.\nL'alerte : « L'atterrissage dépasse la commande : préviens le DAF tout de suite, avec des options. »",
      regle: "Suivre un budget, c'est prévoir où l'on va finir, pas compter les factures déjà payées. Pour chaque poste, on suit le travail fait et le travail qui reste : leur somme donne l'atterrissage (le coût final prévu). On le compare à la référence, que seul le sponsor peut changer. Un écart n'est pas une faute : il se dit tôt, avec sa cause et des options, pendant qu'on peut encore agir.",
      points: [
        "À quoi il sert : suivre chaque poste : engagé, consommé, reste à faire, atterrissage, écart. Quand : chaque mois avant le COPIL ; la régie, chaque semaine.",
        "Sur le site : `+ Poste`, une ligne par poste et une par commande. L'outil calcule l'atterrissage (consommé + reste à faire) et l'écart (atterrissage − référence).",
        "La règle : la référence ne bouge que par une décision du DAF, en nouvelle version, datée. Un dépassement reste un écart ; sans sa cause, l'alerte « Écart sans cause ».",
        "Le piège : suivre les factures, qui arrivent après le travail. Consommé = le travail fait, facture reçue ou pas. Le reste à faire se compte tâche par tâche.",
        "Le bon réflexe : lire les alertes. 80 % d'une commande en régie consommés : préviens le DAF (2 lignes), même si tout tient. Des jours en plus = une commande signée avant."
      ],
      retenir: "Consommé + reste à faire = atterrissage. Un écart se dit tôt, avec sa cause et des options."
    },
    {
      titre: "Compte rendu de réunion",
      exemple: "COPIL du mardi 9 février 2027. Le DAF : « Bon, allez-y pour les changements n° 7 et n° 9. »\nToi : « Je note : n° 7 et n° 9 acceptés, 7 jours d'intégrateur, 5 250 €. C'est bien ça ? »\nMercredi 10, 9 h, le compte rendu part : 2 décisions, 4 actions, 1 point ouvert.",
      regle: "Le compte rendu garde la mémoire de la réunion : ce qui a été décidé, qui fait quoi, et ce qui reste ouvert. Ce n'est pas un récit : seules les décisions, les actions et les questions en suspens comptent. Envoyé vite, il permet à chacun de corriger un malentendu tant qu'il est frais. À la réunion suivante, on part de ses actions : faites ou pas.",
      points: [
        "À quoi il sert : écrire les décisions, les actions et les points ouverts. Quand : sous 24 h après un COPIL ou un point projet ; le jour même pour un comité fournisseur.",
        "Sur le site : réunion, date, participants, « Envoyé le », puis `+ Décision`, `+ Action`, `+ Point ouvert`. Envoyé plus d'un jour après ? L'alerte le dit.",
        "La règle : chaque action a un nom et une date. Un « peut-être » est un point ouvert, pas une décision : ce qui manque, qui l'apporte, pour quand.",
        "Le piège : le récit de la réunion, ou une action floue (« renforcer l'équipe »). Ou faire taire l'alerte « Action en retard » en changeant la date.",
        "Le bon réflexe : à la réunion suivante, chaque action : faite, ou pas ? Faite : « Fait ? » passe à « Oui ». Sinon : pourquoi, et une nouvelle date."
      ],
      retenir: "Une décision non écrite se perd : compte rendu sous 24 h, actions avec un nom et une date, « peut-être » en point ouvert."
    },
    {
      titre: "Fiche du lundi et charge",
      exemple: "Lundi 8 mars 2027. Avant tes 30 minutes avec ton DSI (directeur des systèmes d'information), tu remplis ta fiche.\nTon temps, en demi-journées : DEMAT 9, run (le fonctionnement courant) 3. Charge : 120 %, « Au-delà : ton DSI ».\nTon besoin : « Ne glisse pas : la recette. Peut glisser : la doc d'un flux EDI (échange de données informatisé). Tu choisis ? »",
      regle: "La fiche du lundi prépare ton point avec ton manager : en quelques minutes, ce qui avance, ce qui coince, ce dont tu as besoin. Elle suit aussi ta charge, en demi-journées, pour voir tôt quand ton temps ne suffit plus. Ce n'est pas la liste de tes tâches : c'est ce qui demande une attention ou une décision. Une surcharge qui dure se dit, faits en main, et ton manager arbitre.",
      points: [
        "À quoi elle sert : préparer le point du lundi : ce qui avance, ce qui coince, ton besoin, ta charge. Une mauvaise nouvelle n'attend pas lundi : ton DSI l'apprend par toi, le jour même.",
        "Sur le site : `Dupliquer` la fiche d'avant. Ton temps : le partage fixé avec ton DSI (7 projet, 3 run), la semaine passée, cette semaine. Charge = cette semaine ÷ 10 : « Dans tes 10 », « Pic court » (jusqu'à 110 %) ou « Au-delà : ton DSI ».",
        "La règle : une journée = 2 demi-journées. Un pic court (11 sur 10, puis 9), sans échéance menacée : tu glisses ce qui peut attendre. Au-delà : tu le dis à ton DSI ; il choisit.",
        "Le piège : la liste de tes tâches. Tout va bien ? Dis-le en 2 minutes.",
        "Le bon réflexe : noter ta semaine passée. Plus que le partage prévu ? Un écart d'une semaine se note ; s'il dure, ton DSI arbitre, faits en main."
      ],
      retenir: "Chaque lundi : ce qui avance, ce qui coince, ce dont tu as besoin, et ta charge en demi-journées."
    }
  ]
};
