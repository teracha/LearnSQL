// Parcours « Maîtriser les outils du chef de projet » — Fiche de cours du module ot04 « Outils pour les prestataires ».
// Une section par outil de l'étape « Prestataires » (data/outils/sujets.js), dans l'ordre : gp-choix-prestataire,
// gp-contrat, gp-echeancier. Pas de nouvelle notion : on apprend à SE SERVIR des outils (quoi faire, comment le faire sur
// le site). Les règles et les mots sont ceux des outils et de leurs cours, mot pour mot : cp13 (grille de choix), cp14 et
// cp15 (fiche contrat et SLA), cp27 et cp14 (échéancier). L'échelle de notes de 0 à 5 est celle de l'outil (source
// externe citée dans data/outils/gp-choix-prestataire.js). Boutons et zones de l'écran : bloc « Outils » de js/app.js
// (Nouveau, « + Éliminatoire », « + Critère », « + Mois », « + Contrat », Alertes, Totaux, Télécharger en Excel, Copier).
// Chiffres des exemples : ceux des exemples des outils, recalculés avec le moteur (js/outils.js) : A 78, B 74, C 64 ;
// avril 2027, 6 h de panne en 30 jours = 99,17 % ; fin le 30/11/2029, préavis 6 mois = date limite le 30/05/2029.
// Fil rouge : DEMAT 2027 (fiche fil rouge de docs/plan-chef-de-projet.md, qui fait foi).
LEARNSQL.cours.ot04 = {
  intro: "Un prestataire se choisit sur une grille, se pilote avec son contrat, et se quitte à une date qu'on prépare. Ici, tu apprends à te servir des 3 outils de l'étape « Prestataires » du menu Outils : la grille de choix, la fiche contrat et SLA, et l'échéancier des contrats. Sur ta démat fiscale ou ta migration Divalto, le prestataire avait-il été choisi sur une grille, et qui suivait la date de fin de son contrat ?",
  sections: [
    {
      titre: "Grille de choix d'un prestataire",
      exemple: "Octobre 2026, projet DEMAT 2027. Tu consultes 3 PA (plateformes agréées) de la liste officielle. Réponses sous 2 semaines.\nAvant d'ouvrir les offres, tu écris la grille : 3 critères éliminatoires, puis 7 critères pondérés, 100 en tout. Le DAF (directeur administratif et financier, ton sponsor) la valide.\nAprès les démos sur vos 6 cas réels, chacun note son domaine. Totaux : A 78, B 74, C 64.",
      points: [
        "À quoi elle sert : comparer 2 ou 3 offres sérieuses sur une grille écrite avant de les ouvrir. Quand : la grille avant les offres, validée par le décideur ; les notes après les démos et les références.",
        "Sur le site : « Ce qu'on achète », les offres, « Grille validée par, le ». `+ Éliminatoire` : Oui ou Non par offre. `+ Critère` : un poids, puis une note de 0 à 5 par offre (5 très intéressant, 3 satisfaisant, 0 pas d'information). Points = poids × note ÷ 5 : un calcul, qui reste une formule avec `Télécharger en Excel`.",
        "La règle : critères et poids s'écrivent AVANT d'ouvrir les offres. Les changer après, c'est choisir le gagnant d'abord. Les notes, elles, viennent après, sur des faits. Un critère éliminatoire ne se compense pas : raté, l'offre sort, même bien notée ailleurs.",
        "Le piège : la note 0. Elle veut dire « pas d'information », pas « mauvais ». Il manque un chiffre ? L'alerte le rappelle : tu demandes le même à chaque offre, par écrit, avec le même délai.",
        "Le bon réflexe : chacun note son domaine : la compta ses cas, la DSI (direction des systèmes d'information) le connecteur, toi le prix sur 3 ans. Une séance commune règle les gros écarts. Enfin, une page au DAF : les 2 finalistes, leurs notes, le coût sur 3 ans, les risques, ta recommandation. Il choisit."
      ],
      retenir: "Une grille validée avant les offres : les éliminatoires à part, des poids qui font 100, des notes de 0 à 5 sur des faits. Tu recommandes, le décideur choisit."
    },
    {
      titre: "Fiche contrat et SLA",
      exemple: "Novembre 2026. Le DAF t'envoie le contrat de la PA : « Relis ce qui te concerne. »\nTu ouvres la fiche : 10 clauses à relire, déjà listées, chacune avec ce que tu vérifies.\nSigné, tu en tires une page pour l'équipe.\nAvril 2027 : son rapport dit 99,8 % de disponibilité. Tes tickets : 6 h de panne. L'outil calcule 99,17 %, pour 99,5 % promis.",
      points: [
        "À quoi elle sert : relire tes clauses avant de signer ; puis une fiche d'une page pour l'équipe (dates, livrables, recette, SLA, pénalités, préavis, contacts) ; puis mesurer le SLA (le niveau de service promis) chaque mois, au comité fournisseur.",
        "Sur le site : un document neuf a déjà les 10 clauses. Pour chacune : ce que dit le contrat, ou ton texte proposé, puis l'état : « OK » ou « À faire écrire ». Puis les rubriques de la fiche. Chaque mois, `+ Mois` : les jours, les heures de panne, son rapport. La disponibilité se calcule.",
        "La règle : toi, les clauses opérationnelles, relues AVANT la signature, avec un texte proposé. Le DAF : le prix, la signature et le juridique (responsabilité, droit applicable), avec un avocat si besoin. Après la signature, tout changement passe par un avenant.",
        "Le piège : prendre son rapport pour la mesure. Sans tes tickets (heures de début et de fin), son chiffre fait foi. La disponibilité compte jour et nuit, week-end compris. Son rapport dit « tenu », tes tickets « raté » ? L'alerte : montre-les au comité.",
        "Le bon réflexe : chaque écart, même le 1er : la cause, un plan daté, le suivi au comité. Les crédits : tu apportes le calcul, le DAF décide. SLA tenu ne veut pas dire service correct : une lenteur se mesure aussi."
      ],
      retenir: "Avant de signer : tes clauses relues, avec un texte proposé. Après : une fiche d'une page. Chaque mois : tes mesures contre le contrat."
    },
    {
      titre: "Échéancier des contrats",
      exemple: "Plus tard, tu es DSI adjoint. Octobre 2028, budget 2029.\nLe contrat de la PA finit le 30 novembre 2029. Il se reconduit seul, sauf préavis de 6 mois.\nL'outil calcule la date limite pour résilier : le 30/05/2029. Ta prochaine relecture : septembre 2029, trop tard.\nL'alerte : « La date limite tombe avant la prochaine relecture : prépare le choix du DAF, sortie chiffrée, et prévois-le au budget. »",
      points: [
        "À quoi il sert : lister chaque contrat avec sa fin, son préavis et son propriétaire, pour que le DAF choisisse avant la date limite. Quand : dès le 1er contrat signé, puis relu à chaque budget.",
        "Sur le site : « Relu par », « Relu le », et la date de la prochaine relecture (le prochain budget). `+ Contrat` : sa fin, son préavis en mois, son propriétaire. L'outil calcule la date limite pour résilier, et les jours qui restent.",
        "La règle : date limite = la fin moins le préavis. Reconduit seul ? La fin de la période en cours. Avant la date limite, le DAF choisit : rester, renégocier ou changer, coût de sortie compris.",
        "Le piège : laisser passer la date. Le contrat repart seul ; l'alerte le dit : « Date limite passée : le contrat s'est reconduit seul. Note sa nouvelle fin. »",
        "Le bon réflexe : une date limite qui tombe avant la prochaine relecture se prépare maintenant. Le DAF choisit « Changer » ? C'est un projet : le nouveau signé, connecté et testé avant la fin de l'ancien. Jamais de trou."
      ],
      retenir: "Chaque contrat : sa fin, son préavis, son propriétaire. Date limite = la fin moins le préavis ; le DAF choisit avant."
    }
  ]
};
