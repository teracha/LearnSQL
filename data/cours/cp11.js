// Chef de projet SI — Fiche de cours du module cp11 « Budget et business case ».
// Fond : pratiques reconnues. PRINCE2 (le business case justifie le projet ; il est revu à chaque fin d'étape ; les
// bénéfices sont revus après le projet). PMBOK (business case et plan de gestion des bénéfices ; réserve pour aléas,
// liée aux risques identifiés). Contrôle de gestion (TCO, ROI simple, délai de retour, CAPEX / OPEX ; l'actualisation,
// VAN, reste au contrôleur de gestion). Les méthodes divergent sur la place du business case : au centre du projet et
// revu à chaque étape (PRINCE2), document d'entrée du projet (PMBOK) ; le cours garde « revu à chaque étape ».
// - Le business case : le problème ou l'obligation, les options (« ne rien faire » quand c'est possible ; ici, impossible :
//   on compare des façons de se conformer), les coûts complets, les gains, les risques, une recommandation ; le sponsor
//   valide ; on le met à jour (après les contrats, à un gros changement).
// - Le coût complet (TCO) : dépenses externes ET temps interne, projet ET run, sur la durée, sortie comprise ; la réserve
//   pour risques (registre, module cp07) ; pièges (un seul devis, oublis, double comptage).
// - Les gains : chiffrés avec leurs hypothèses ; temps libéré ≠ argent économisé ; qualitatif à part ; prudence.
// - ROI simple et délai de retour : formules, limites ; un projet obligatoire ne se décide pas au ROI.
// - CAPEX / OPEX : définitions générales ; l'abonnement = charge (OPEX) ; le contrôleur de gestion classe.
// - Présenter et défendre : options et prix, hypothèses, fourchette puis chiffre ; le sponsor tranche ; mise à jour.
// Fil rouge : DEMAT 2027 (fiche fil rouge de docs/plan-chef-de-projet.md, qui fait foi), ligne « Budget et business
// case (modules cp11, cp12) » : TCO sur 3 ans (durée du contrat de la PA) = dépenses externes + temps interne (en jours,
// pas dans le budget) ; budget de référence 80 k€, validé par le DAF en novembre 2026 après les contrats (abonnement
// 850 € par mois, 30,6 k€ ; mise en service au forfait 7,4 k€ ; intégrateur 40 jours à 750 €, 30 k€, en régie ;
// formation et tests 4 k€ ; réserve pour risques 8 k€) ; abonnement = OPEX, le contrôleur de gestion dit le CAPEX ;
// tolérance : sous 90 k€, sinon le DAF décide, prévenu le jour même ; « ne rien faire » n'est pas une option.
// Aucun montant d'amende. Plan B, gel, 15 mars : inchangés.
// Faits ajoutés (exemples, cohérents avec la fiche, à valider) : 8 000 factures par mois, dont 2 000 factures
// fournisseurs (les 400 hors connecteur = 5 %) ; ressaisie de 4 minutes par facture, 1 minute de contrôle après le
// connecteur (3 minutes gagnées, 100 heures par mois) ; coût horaire chargé d'une comptable : 30 € ; temps interne du
// projet : environ 100 jours ; option A (portail seul, ressaisie) : environ 45 k€ de dépenses externes sur 3 ans ;
// gains pleins quand les fournisseurs PME émettent (1er septembre 2027).
// Affirmations comptables hors fiche (générales, à faire vérifier) : un CAPEX est immobilisé et amorti sur sa durée
// d'utilisation ; un OPEX est une charge de l'année ; le classement change le résultat de l'année, pas la sortie
// d'argent ; le calcul Snowflake payé au mois est une charge ; un développement fait pour l'entreprise peut parfois
// être immobilisé.
// Frontières :
// - cp12 = SUIVRE le budget pendant le projet (engagé, facturé, reste à faire, atterrissage, dérive) : une phrase ici.
// - cp04 = la fourchette du cadrage (60 à 90 k€) et la tolérance ; cp13 = le prix de chaque offre sur 3 ans ;
//   cp07 = le registre des risques (la réserve en vient) ; cp15 = l'atterrissage de la régie.
// - cp25 = choisir ENTRE projets (portefeuille) ; cp27 = le budget SI annuel de la DSI.
LEARNSQL.cours.cp11 = {
  intro: "Sur ta démat fiscale, ta migration Divalto ou ton projet Snowflake + Power BI, qui avait chiffré ce que ça coûtait vraiment, et ce que ça rapportait ? Ici : construire et défendre le business case d'un projet. Le suivre pendant le projet : module cp12.",
  sections: [
    {
      titre: "Le business case : pourquoi ce projet, et de quelle façon",
      exemple: "DEMAT 2027, octobre 2026. Le problème : la loi. Recevoir des factures électroniques est déjà obligatoire ; les émettre le sera au 1er septembre 2027.\n« Ne rien faire » : impossible. Tu compares donc des façons de s'y conformer.\nA. Le portail web de la PA (plateforme agréée) seul : les factures fournisseurs sont ressaisies dans Divalto.\nB. Le connecteur standard de la PA dans Divalto, et le portail pour le reste.\nPour chacune : coût, gains, risques. Ta recommandation : B. Le DAF (directeur administratif et financier, ton sponsor) valide.",
      points: [
        "Le business case est le dossier qui justifie un projet : le problème ou l'obligation, les options, leurs coûts et leurs gains, les risques, ta recommandation.",
        "« Ne rien faire » est l'option de référence : combien coûte le statu quo ? Quand la loi l'interdit, tu compares des façons de se conformer.",
        "Tu le construis, avec le métier et le contrôleur de gestion. Le sponsor, ici le DAF, le valide.",
        "Court : 2 à 4 pages, dont une page de synthèse. Le détail va en annexe.",
        "Il justifie UN projet. Choisir entre plusieurs projets : module cp25. Le budget annuel de la DSI (direction des systèmes d'information) : module cp27."
      ],
      retenir: "Le business case dit pourquoi, quelles options, combien, ce que ça rapporte, les risques, et ce que tu recommandes. Le sponsor le valide."
    },
    {
      titre: "Le coût complet (TCO) : tout, sur toute la durée",
      exemple: "Option B, chiffrée après les contrats de novembre 2026, sur 3 ans (la durée du contrat de la PA). Dépenses externes :\n– abonnement de la PA : 850 € × 36 mois = 30,6 k€ ;\n– mise en service du connecteur, au forfait : 7,4 k€ ;\n– intégrateur : 40 jours × 750 € = 30 k€, en régie ;\n– formation et tests : 4 k€ ;\n– réserve pour risques : 8 k€.\nTotal : 80 k€. Plus le temps interne : environ 100 jours (compta, ADV : administration des ventes, DSI).",
      points: [
        "TCO (coût total de possession) = tout ce que le choix coûte, sur sa durée : la mise en place, le run (le fonctionnement après la bascule : abonnement, support, versions) et la sortie (reprendre ses données).",
        "Les dépenses externes ET le temps interne, compté ici en jours dans le business case (pas dans le budget). Il n'est pas gratuit : Julie en recette ne traite pas ses factures.",
        "La durée : celle du contrat ou de la vie de la solution. 3 ans pour la PA ; souvent plus pour un ERP.",
        "La réserve pour risques vient du registre (module cp07) : une somme pour des risques nommés, pas une marge pour tout. La dépenser : une commande ou un avenant signé par le DAF.",
        "Pièges : un seul devis présenté comme le coût (un poste « sur devis séparé » se chiffre quand même) ; oublier le run, la sortie, le temps interne ; compter deux fois (une réserve, plus une marge sur chaque ligne)."
      ],
      retenir: "Le TCO compte tout, sur toute la durée : dépenses externes et temps interne, projet et run, sortie comprise."
    },
    {
      titre: "Les gains : chiffrés, prudents, honnêtes",
      exemple: "2 000 factures fournisseurs par mois. Aujourd'hui, Julie et ses collègues les ressaisissent : 4 minutes chacune.\nAvec le connecteur : 1 minute de contrôle. 3 minutes gagnées × 2 000 = 100 heures par mois.\nCoût horaire chargé (salaire et charges) : 30 €. Valeur : 3 000 € par mois.\nMais aucune dépense ne disparaît : c'est du temps libéré. Le DAF dira à quoi il sert.",
      points: [
        "Chiffre ce qui se compte : volume × temps gagné × coût horaire chargé. Heures de ressaisie, erreurs évitées, relances en moins.",
        "Du temps libéré n'est pas de l'argent économisé. Il le devient si une dépense disparaît (un intérim, une embauche évitée) ou s'il sert à un travail décidé. Sinon, écris « gain en temps ».",
        "Le qualitatif à part : conformité, clôture plus sereine, image auprès d'AquaBleu. Pas d'euros inventés.",
        "Prudence : le gain arrive après la bascule, et monte en charge (tes fournisseurs PME émettront au 1er septembre 2027). Il reste un contrôle : jamais 100 %. Et un gain ne se compte qu'une fois : 100 heures ou « 2/3 d'un poste », pas les deux.",
        "Chaque gain a sa source (une mesure, un volume de Divalto), un responsable métier (ici, la cheffe comptable), et une date pour le mesurer après la bascule."
      ],
      retenir: "Un gain se chiffre avec ses hypothèses, prudemment, et dit s'il est en argent ou en temps. Le qualitatif reste à part."
    },
    {
      titre: "Retour sur investissement et délai de retour",
      exemple: "Ton projet Snowflake + Power BI : 30 k€ de projet. Il arrête l'ancien serveur de reporting : 1 600 € par mois de moins (licence, maintenance). Le calcul Snowflake coûte 600 € par mois.\nGain net : 1 000 € par mois. Délai de retour : 30 000 ÷ 1 000 = 30 mois.\nSur 3 ans : 36 k€ de gain net pour 30 k€ dépensés.\nROI (retour sur investissement) : (36 - 30) ÷ 30 = 20 %.",
      points: [
        "ROI simple = (gains - coûts) ÷ coûts, sur la même durée, avec TES chiffres : le ROI d'un vendeur n'est pas le tien.",
        "Délai de retour (payback) = le temps pour que les gains cumulés remboursent la dépense : coût ÷ gain net par mois.",
        "Gain net = gain brut - coût du run. Oublie les 600 € de Snowflake : le délai tombe à environ 19 mois. C'est faux.",
        "Limites : le délai de retour ne voit pas ce qui vient après lui ; un euro dans 3 ans vaut moins qu'aujourd'hui (l'actualisation, la VAN ou valeur actuelle nette : le travail du contrôleur de gestion) ; rien sur les risques ni le qualitatif.",
        "Projet obligatoire : le ROI ne décide pas s'il faut le faire, il aide à choisir la façon. Entre deux options, compte ce qui diffère : l'abonnement, payé dans les deux, ne change pas l'écart."
      ],
      retenir: "ROI = (gains - coûts) ÷ coûts ; délai de retour = coût ÷ gain net par mois. Utiles pour comparer, jamais seuls."
    },
    {
      titre: "CAPEX, OPEX : le contrôleur de gestion classe",
      exemple: "Snowflake : le calcul se paie au mois, à la consommation. Ton ancien serveur, lui, avait été acheté.\nDEMAT : l'abonnement de la PA, 850 € par mois, est une charge de l'année.\nLa mise en service, les jours d'intégrateur ? Peut-être un investissement, peut-être pas.\nTu ne décides pas : tu donnes le détail au contrôleur de gestion. Il classe.",
      points: [
        "CAPEX (dépense d'investissement) : un bien qui sert plusieurs années. Il est immobilisé, et sa charge s'étale sur sa durée d'utilisation : l'amortissement. Ex. : un serveur acheté.",
        "OPEX (dépense de fonctionnement) : une charge de l'année. Ex. : un abonnement, le calcul Snowflake au mois, le support, la formation.",
        "Le cloud et les abonnements déplacent la dépense : moins d'achat au départ, une charge chaque année, tant que tu paies. Payé d'avance, le calcul reste une charge.",
        "Le classement suit des règles comptables : le contrôleur de gestion décide. Toi, tu détailles chaque coût, par nature et par date, sans pré-classer.",
        "Pourquoi le DAF y tient : souvent deux enveloppes (investissement, fonctionnement), et un effet sur le résultat de l'année. Le classement ne change pas l'argent qui sort."
      ],
      retenir: "CAPEX : un investissement, étalé sur plusieurs années. OPEX : une charge de l'année, comme un abonnement. Le contrôleur de gestion classe ; toi, tu détailles."
    },
    {
      titre: "Présenter, défendre, mettre à jour",
      exemple: "Octobre 2026, au cadrage : 60 à 90 k€ (module cp04), options A et B, hypothèses écrites.\nNovembre 2026, contrats signés : tu mets le business case à jour, 80 k€ de dépenses externes. Le DAF le valide.\nTolérance : rester sous 90 k€. Au-delà, le DAF décide, prévenu le jour même.\nEnsuite, le suivi : engagé, facturé, reste à faire (module cp12).",
      points: [
        "Une page : le problème, 2 ou 3 options avec leur coût sur 3 ans et leurs gains, les risques, ta recommandation, et les hypothèses (volumes, minutes, coût horaire, dates).",
        "Un chiffre honnête : une fourchette tant que c'est incertain, un chiffre quand les contrats sont signés. Un coût à l'usage (le calcul Snowflake) : une fourchette, et un plafond surveillé.",
        "On te pousse à gonfler un gain ou à baisser un coût ? Tu montres la version prudente, et ce qui ferait monter le gain. Le sponsor tranche en connaissant le prix : c'est décidé, tu appliques.",
        "Mise à jour à chaque étape : après les contrats, à un gros changement, à la fin. PRINCE2 (la méthode britannique) le revoit à chaque fin d'étape : s'il ne tient plus, le sponsor peut arrêter. Les gains se mesurent quand ils sont pleins.",
        "« Lance, on verra le budget après » : non. Sans budget validé, pas de commande."
      ],
      retenir: "Un business case honnête : des options, leurs prix, des hypothèses écrites, une recommandation. Le sponsor tranche ; on le met à jour à chaque étape."
    }
  ]
};
