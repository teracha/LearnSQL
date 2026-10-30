// Chef de projet SI — Fiche de cours du module cp12 « Suivre le budget ».
// Fond : PMBOK (référence de base des coûts ; estimation à l'achèvement ; valeur acquise en une ligne ; réserve pour
// aléas liée aux risques identifiés) et pratiques du contrôle de gestion en PME / ETI (engagé, facturé, payé, consommé,
// reste à faire, atterrissage, écart ; service fait avant le bon à payer ; rapprochement avec la comptabilité ; travail
// fait non facturé à la clôture des comptes). Les pratiques divergent sur l'engagé d'un contrat de plusieurs années :
// le budget du projet (sur 3 ans) compte tout le contrat ; un budget annuel n'en compte que l'année (module cp27).
// - La référence : 80 k€, validée par le DAF, suivie poste par poste ; elle ne change que par sa décision (changement
//   accepté, avec sa commande : nouvelle version datée) ; un dépassement reste un écart ; le temps interne n'y est pas.
// - Les mots : engagé (commandes et avenants signés ; en régie, la commande est un plafond, rendue en partie à la fin),
//   facturé, payé, consommé (en régie : les jours), reste à faire (≠ « ce qui reste au budget »), atterrissage =
//   consommé + reste à faire, écart = atterrissage − référence.
// - Chaque contrat à sa façon : régie (les jours, chaque semaine, chaque commande à part), forfait (jalons, solde au PV),
//   abonnement (engagé pour la durée, consommé chaque mois, continue au run), à l'usage (Snowflake : chaque mois).
// - Les factures : la pièce qui prouve (commande, relevé validé, PV) ; toi le service fait, la compta la facture, le DAF
//   le bon à payer ; une facture émise ne se modifie pas (avoir) ; imputer à la bonne commande.
// - La dérive : signaux, causes, alerte tôt avec options chiffrées (réduire, rallonge, décaler), le DAF tranche ;
//   au-delà de 90 k€, le jour même ; pièges (attendre la facture, couper la recette, absorber sans le dire).
// - La réserve : les risques du registre, décision du DAF par commande ou avenant, suivie à part, comptée dans
//   l'atterrissage tant qu'elle n'est pas rendue ; ce qui n'est pas dépensé n'est pas « à dépenser ».
// - Rendre compte : une ligne budget au COPIL ; DSI adjoint avec le contrôleur de gestion ; le bilan de fin (une phrase).
// Fil rouge : DEMAT 2027 (fiche fil rouge de docs/plan-chef-de-projet.md, qui fait foi), ligne « Budget et business case
// (modules cp11, cp12) » : budget de référence de 80 k€ validé par le DAF en novembre 2026 (PA : abonnement 850 € par
// mois, 30,6 k€ sur 3 ans, et mise en service au forfait 7,4 k€ ; intégrateur : 40 jours à 750 €, 30 k€, en régie ;
// formation et tests 4 k€ ; réserve pour risques 8 k€) ; tolérance : sous 90 k€, sinon le DAF décide, prévenu le jour
// même. Lignes « Contrats (cp14) » et « Pilotage des prestataires (cp15) » : solde au PV, alerte à 80 % de la commande,
// relevé validé avant la facture, crédits du SLA décidés par le DAF. Pas de budget de changement délégué. Aucun montant
// d'amende.
// Faits ajoutés (chiffres de suivi, cohérents avec la fiche et les modules publiés, à valider) : abonnement de décembre
// 2026 à novembre 2029 (36 mensualités, une facture par mois) ; mise en service : 3 700 € à la signature, 3 700 € au PV ;
// les 40 jours comprennent l'enveloppe des 10 jours des écrans de la compta ; changements n° 7 (4 jours) et n° 9
// (3 jours) acceptés le 9 février (cp10) : 5 250 €, référence à 85 250 € ; jours de la commande de base : décembre 3,
// janvier 2, février 8, mars 11 (cumul 24), avril 9, mai 4, juin 5 (total 42) ; changements faits en février (n° 7) et
// mars (n° 9) ; fin mars : reste à faire 19, atterrissage 43 jours (flux EDI sous-estimés, pas au registre), le DAF
// signe une commande de 3 jours le jour même ; avenant d'archivage : 50 € par mois d'avril 2027 à novembre 2029, 1 600 €,
// pris sur la réserve par le DAF (risque légal du registre) ; formation et tests commandés en janvier ; fin mars :
// engagé 81 100 €, consommé 30 350 €, facturé 19 850 €, atterrissage 87 500 € ; intérimaire envisagé en avril (environ
// 4 000 €, cp18-q22) ; factures de l'intégrateur chaque mois, sur relevé validé.
// Affirmations comptables ou juridiques hors fiche (générales, à faire vérifier) : la compta inscrit dans l'année le
// travail fait non facturé (facture non parvenue) ; un PV avec réserves vaut acceptation, le solde lié au PV est dû
// (sauf retenue écrite au contrat) ; le prix d'une commande signée tient jusqu'au bout, sauf clause de révision.
// Frontières : cp11 = construire le budget et le business case (avant) ; cp12 = le suivre pendant le projet ; cp08 = le
// reporting global (ici, seulement la ligne budget) ; cp15 = le suivi de la régie au point hebdo (cité, pas refait) ;
// cp14 = forfait, régie, abonnement, PV, pénalités ; cp10 = le circuit d'un changement ; cp07 = le registre des risques ;
// cp22 = clôture et passage en run (ici, une phrase sur le bilan) ; cp27 = le budget SI annuel de la DSI.
LEARNSQL.cours.cp12 = {
  intro: "Sur ta démat fiscale, ta migration Divalto ou ton projet Snowflake + Power BI, qui savait ce que le projet coûterait à la fin ? Les factures le disaient-elles à temps ? Ici : suivre le budget pendant le projet. Le construire, et le business case : module cp11.",
  sections: [
    {
      titre: "Le budget de référence : ta ligne de départ",
      exemple: "Novembre 2026, après les contrats. Le DAF (directeur administratif et financier, ton sponsor) valide la référence de DEMAT 2027 : 80 k€ de dépenses externes.\nPA (plateforme agréée) : abonnement 30,6 k€ (850 € par mois, 3 ans), mise en service au forfait 7,4 k€.\nIntégrateur, en régie : 40 jours à 750 €, 30 k€. Formation et tests : 4 k€. Réserve pour risques : 8 k€.\n9 février 2027 : 2 changements acceptés par le DAF (module cp10), 5 250 €. Référence : 85 250 €.",
      points: [
        "La référence est le budget validé, poste par poste (au PMBOK, le guide américain : « référence de base des coûts »). Tu suis chaque poste, pas seulement le total.",
        "Seul le DAF la change : un changement accepté, avec sa commande, donne une nouvelle version, datée. Un dépassement ne la change pas : c'est un écart, qui se montre.",
        "Le temps de la compta, de l'ADV (administration des ventes) et de la DSI (direction des systèmes d'information) n'y est pas. Il se suit en jours, à part.",
        "Tolérance : rester sous 90 k€. Au-delà, le DAF décide, prévenu le jour même (module cp04)."
      ],
      retenir: "La référence ne bouge que par une décision du DAF. Un dépassement reste un écart."
    },
    {
      titre: "Les mots du suivi",
      exemple: "Fin février. Commande de base de l'intégrateur : 40 jours, 30 000 €.\nEngagé : 30 000 € (signée).\nConsommé : 13 jours, 9 750 €.\nFacturé : 5 jours, 3 750 €. Payé : 3 jours, 2 250 €.\nReste à faire, tâche par tâche : 27 jours. Atterrissage : 13 + 27 = 40 jours. Écart : 0.",
      points: [
        "Engagé : les commandes et avenants signés. En régie (au temps passé), la commande est un plafond : les jours non faits sortent de l'engagé à la fin.",
        "Facturé : les factures reçues. Payé : l'argent sorti, par la compta. Ils arrivent après le travail : suivre les factures, c'est voir en retard.",
        "Consommé : le travail fait, ou le service rendu, facture reçue ou pas. À la clôture des comptes, le travail fait mais pas encore facturé compte dans l'année.",
        "Reste à faire : ce qu'il faut encore pour finir, estimé tâche par tâche. Ce n'est pas « ce qui reste au budget ».",
        "Atterrissage = consommé + reste à faire : le coût final probable (au PMBOK, l'estimation à l'achèvement). Écart = atterrissage − référence."
      ],
      retenir: "Consommé + reste à faire = atterrissage. Les factures arrivent après : elles ne disent pas où tu en es."
    },
    {
      titre: "Régie, forfait, abonnement : chacun se suit à sa façon",
      exemple: "Régie : les jours de l'intégrateur, chaque semaine (module cp15).\nForfait : la mise en service de la PA. 3 700 € à la signature, 3 700 € au PV (procès-verbal) de recette.\nAbonnement : 850 € par mois, de décembre 2026 à novembre 2029.\nSur ton projet Snowflake + Power BI, le calcul se paie à l'usage.",
      points: [
        "Régie : chaque semaine, consommé et reste à faire. Le consultant estime, tu vérifies dans Divalto. Alerte au DAF à 80 % de la commande. Chaque commande se suit à part.",
        "Forfait : le prix est fixe, sauf avenant. Tu suis les jalons : le solde suit le PV.",
        "Abonnement : engagé pour toute la durée du contrat, consommé chaque mois. Un budget annuel n'en compte que l'année (module cp27) : les pratiques diffèrent.",
        "Il dure après le projet : à la clôture, les mensualités restantes passent au budget du run (le fonctionnement courant, module cp22).",
        "À l'usage : pas de commande par requête. Le coût se suit chaque mois, avec une alerte de crédits (un resource monitor). Il monte ? La cause d'abord."
      ],
      retenir: "Régie : les jours. Forfait : les jalons et le PV. Abonnement : les mensualités. À l'usage : le coût, chaque mois."
    },
    {
      titre: "Les factures : le service fait, puis le bon à payer",
      exemple: "Début avril. Facture de l'intégrateur pour mars : 14 jours, 10 500 €.\nTon relevé validé dit pareil : 11 jours sur la commande de base, 3 sur celle du changement n° 9.\nTu signes le « service fait ». La compta contrôle la facture. Le DAF donne le bon à payer.",
      points: [
        "Ce qui fait foi : la commande ou l'avenant (son prix tient jusqu'au bout), le relevé validé en régie, le PV pour un solde au forfait.",
        "Toi : le service fait. La compta : la facture (montant, TVA, mentions). Le DAF : le bon à payer, le feu vert du paiement.",
        "Pas de PV, pas de solde ; un PV avec réserves est un PV. Pas de relevé validé, pas de jours payés.",
        "Une ligne non prévue ? Tu la signales, contrat en main. Une facture émise ne se modifie pas : le prestataire fait un avoir. Un crédit du SLA (le niveau de service promis) décidé par le DAF aussi.",
        "Chaque jour s'impute à sa commande. Sinon, la base paraît finie trop tôt, et le changement paraît gratuit."
      ],
      retenir: "Tu signes le service fait, pièces en main. La compta contrôle, le DAF donne le bon à payer."
    },
    {
      titre: "La dérive : la voir tôt, alerter avec des options",
      exemple: "Fin mars. Commande de base : 24 jours faits, 19 à faire. Atterrissage : 43 jours, 2 250 € de trop. Cause : les flux EDI (échange de données informatisé), sous-estimés. Le projet passe à 87 500 €, sous 90 k€.\nLe jour même, au DAF : A, retirer 2 états des écrans de la compta ; B, une commande de 3 jours ; C, ces états en juillet (même prix, plus tard). Il choisit B.",
      points: [
        "Les signaux : le consommé avance plus vite que le travail ; le reste à faire ne baisse pas. Causes : jours sous-estimés, changements jamais décidés (module cp10), attentes.",
        "Des jours en moins ne sont pas une économie si le travail est seulement décalé. Valeur acquise (PMBOK) : ce que vaut le travail fait, au prix prévu ; moins que le consommé, ça dérive.",
        "Tu alertes dès que l'écart apparaît : la cause, l'atterrissage, 2 ou 3 options chiffrées (réduire, rallonge par commande ou avenant, décaler), ta recommandation. Le DAF tranche, pas le DG (directeur général) ; au-delà de 90 k€ (hors tolérance), le jour même.",
        "Les pièges : attendre la facture finale ; couper la recette pour tenir le budget ; absorber un petit dépassement sans le dire."
      ],
      retenir: "Un écart se dit tôt, avec sa cause et des options chiffrées. Le DAF tranche ; au-delà de 90 k€, le jour même."
    },
    {
      titre: "La réserve pour risques : pas un budget libre",
      exemple: "Registre des risques (module cp07) : « La compta, peu disponible, retarde la recette. » En avril, c'est arrivé. Le DAF envisage un intérimaire, environ 4 000 €.\nTa ligne réserve : 8 000 € ; 1 600 € pris par le DAF en mars pour l'avenant d'archivage (un risque légal du registre) ; reste 6 400 €. Avec l'intérimaire : 2 400 €.",
      points: [
        "Elle paie les risques du registre quand ils arrivent. Le DAF décide de chaque usage, par une commande ou un avenant qu'il signe.",
        "Un dépassement ou un changement n'est pas un risque. Le payer sur la réserve ? Seulement si le DAF le choisit, en le sachant.",
        "Tu la suis à part : chaque usage (date, risque, décision), le reste, les risques encore ouverts.",
        "Elle compte dans l'atterrissage tant qu'elle n'est pas rendue. Ce qui n'est pas dépensé n'est pas « à dépenser » : quand les risques se ferment, la part inutile est rendue."
      ],
      retenir: "La réserve paie les risques du registre, sur décision du DAF. Ce qui ne sert plus est rendu."
    },
    {
      titre: "Rendre compte : la ligne budget, et la fin",
      exemple: "COPIL (comité de pilotage) d'avril, chiffres à fin mars :\n« Référence 85,25 k€ · engagé 81,1 k€ · consommé 30,35 k€ · atterrissage 87,5 k€ · écart + 2,25 k€ (flux EDI ; commande de 3 jours signée) · réserve 6,4 k€. »\nLe reste du rapport (planning, risques, météo du projet) : module cp08.",
      points: [
        "Chaque mois, la même ligne, avec les mêmes mots, et la cause de l'écart. Le détail reste dans ton suivi.",
        "Un écart déjà décidé, sous 90 k€ ? Pas d'alerte de plus : il se montre au COPIL, avec la décision.",
        "Tu es DSI adjoint : chaque mois, avec le contrôleur de gestion, une ligne par projet. Il rapproche les suivis de la compta ; tu creuses les projets en écart.",
        "En décembre, un budget non dépensé n'est pas « à dépenser » : le besoin de l'an prochain va au budget de l'an prochain (module cp27).",
        "Fin du projet (module cp22) : un bilan, chaque écart expliqué, la réserve rendue. L'abonnement continue : le run le reprend."
      ],
      retenir: "Au COPIL, une ligne budget, la même chaque mois, avec la cause de l'écart. À la fin, un bilan."
    }
  ]
};
