// Chef de projet SI — Questions du module cp15 « Piloter prestataires et éditeurs ».
// Fond (pratiques de terrain ; PMBOK « contrôler les approvisionnements » ; ITIL en une ligne) : point hebdo et comité
// fournisseur (SLA mesuré, retards, risques, plan d'actions daté, compte rendu, DAF pour décider) ; suivi d'une régie
// (consommé + reste à faire, alerte à 80 %, relevé validé avant la facture, consultant sous l'autorité de son
// employeur) ; dépendance (documentation testée, binôme payé en régie, support de la DSI à côté du consultant, un autre
// consultant avant un autre prestataire) ; SLA (tes traces face à son rapport, disponibilité jour et nuit, délais aux
// heures de support, crédits décidés par le DAF, SLA tenu ≠ service correct, changer en dernier) ; support (N1 / N2 /
// N3, bon ticket, un seul canal, relances aux échéances, fermeture après confirmation, incident ou problème) ; éditeur
// (standard, feuille de route, spécifique en surcharge, montée de version préparée, SaaS testé avant) ; plusieurs
// prestataires (le client coordonne, sauf ensemblier) ; relation (exigeant et juste, ni ami ni ennemi, escalader n'est
// pas punir, bilan fournisseur).
// Fil rouge DEMAT 2027 (fiche fil rouge de docs/plan-chef-de-projet.md, qui fait foi), lignes « Contrats (module cp14) »
// et « Pilotage des prestataires (module cp15) ». Contrat de la PA signé en novembre 2026 : 3 ans, préavis de 6 mois
// (fin mai 2029) ; annexe SLA : 99,5 % par mois jour et nuit, support 8 h-18 h les jours ouvrés, prise en charge en 1 h,
// portail rétabli en 4 h ; crédits plafonnés, décidés par le DAF. Intégrateur en régie (environ 750 € par jour),
// commande signée par le DAF. Gel des changements de mai à la fin de la bascule. Aucun montant d'amende.
// q10, q22, q26, q36, q39, q44 : « Tu es DSI adjoint ». q37 : un autre projet de la DSI (Power BI).
// Pages Divalto utilisées (base documentaire Divalto 10.13, lecture seule) : « Contrôle du Siret/Siren (V10.12) » (q29),
// « Surcharge ou modification de vue » et « ERP en direct » (q37), « x10 migration » (q30, q37), « Avant migration, vérifier les
// modifications » (q30), « Les surcharges multiples » (q28, q35), « Les opérations de maintenance » (q30, q31).
// Faits ajoutés (scénarios, cohérents avec la fiche, à valider) : commande de l'intégrateur de 40 jours (q06, q07) ;
// 12 puis 25 spécifiques Divalto (q30, q36) ; passation sans surcoût écrite à la commande (q15, comme cp14-q23) ;
// priorités numérotées dans l'annexe SLA (q24, q26) ; la version 1 du connecteur maintenue jusqu'en décembre
// (cp10-q30) et une version 2 disponible depuis le printemps 2027 (q32) ; 5 % de factures hors connecteur déposées à la main (q35).
// Affirmations juridiques hors fiche (générales, à faire vérifier) : diriger un consultant en régie comme un salarié est
// un risque de prêt de main-d'œuvre illicite (q10) ; en régie, les jours d'attente d'un consultant disponible sont dus,
// en général (q09) ; un prestataire peut ne plus répondre de ce qu'un autre a modifié (q13, q35).
// Déjà publiées ailleurs, pas reprises ici : cp01-q13 et q14, cp07-q06 et q22, cp10-q30, cp14-q06, q09, q23, q25,
// q34 à q36, cp16-q22, q36 et q38, cp17-q03, q21 et q37, cp18-q26, q30, q32 et q33.
// Frontières : choisir le prestataire = cp13 ; les clauses, l'avenant, les pénalités = cp14 ; l'échelle d'escalade =
// cp16 (citée, pas refaite) ; un conflit entre la PA et l'intégrateur = cp18 ; anomalie ou changement = cp10 ;
// passage en run et clôture = cp22 ; manager son équipe = cp26.
// Anti-devinette : la bonne réponse est un extrême dans 12 questions sur 44 : l'action la plus douce qui suffit (q03,
// q07, q19, q27, q29, q33), la plus forte quand elle se justifie (q06, q10, q15, q22, q23, q39). « Standard » est dans la bonne
// réponse de q29, q34, q36 et q37, pas de q35. Monter chez le prestataire n'est juste que dans q14.
LEARNSQL.questions.cp15 = [
  {
    id: "cp15-q01",
    dialecte: "Gestion de projet",
    q: "Décembre 2026. La réception des factures passe par le portail de la PA depuis novembre. Tu prépares le 1er comité fournisseur avec son chef de projet. Quel ordre du jour ?",
    choix: [
      "Le SLA du mois mesuré, les retards, les risques, le plan d'actions",
      "Ses nouveautés du trimestre, puis un tour de table, sans ordre fixe",
      "Chaque ticket du mois, un par un, avec les techniciens de la PA",
      "Les crédits et pénalités à appliquer, en présence du DAF"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Le comité suit le service : le SLA mesuré, les retards, les risques, et le plan d'actions daté, relu au comité suivant. Ton compte rendu part le jour même.",
      "Non. Ses nouveautés peuvent t'informer, mais un comité sans mesures ni actions devient une réunion commerciale. Le service, lui, n'avance pas.",
      "Non. Presque : les tickets nourrissent le comité, mais un par un, l'heure passe sur le détail. Tu regardes les écarts et ce qui revient ; le reste, c'est le support.",
      "Non. Aucun écart n'est encore mesuré : il n'y a rien à appliquer. Le DAF vient quand une décision l'attend, pas à un 1er comité."
    ],
    retenir: "Comité fournisseur : le SLA mesuré, les retards, les risques, le plan d'actions daté. Le détail des tickets reste au support."
  },
  {
    id: "cp15-q02",
    dialecte: "Gestion de projet",
    q: "Fin du comité fournisseur de janvier : 3 actions décidées. Le contrat ne dit pas qui écrit le compte rendu. Le chef de projet de la PA : « Je vous enverrai le nôtre, à l'occasion. » Que fais-tu ?",
    choix: [
      "Tu attends le sien : la PA anime ce comité, elle l'écrira",
      "Tu écris le tien le jour même : chaque action, un nom, une date",
      "Tu écris le tien, et le DAF le valide avant de l'envoyer à la PA",
      "Tu écris le tien, avec les actions ; la PA fixera les dates"
    ],
    bonne: 1,
    pourquoi: [
      "Non. « À l'occasion », c'est sans date, et avec ses mots à elle. Les engagements du comité s'écrivent tout de suite, par toi : c'est ton outil de pilotage.",
      "Oui. Le jour même, ton compte rendu fixe chaque engagement : une action, un nom, une date. Tu l'envoies à la PA, et il se relit au comité suivant.",
      "Non. Le DAF n'a pas à valider un compte rendu de suivi : il vient pour décider. Tu perds des jours, et les actions attendent.",
      "Non. Presque : c'est écrit, mais une action sans date ne se suit pas. Au comité suivant, rien ne pourra être « en retard »."
    ],
    retenir: "Après un comité fournisseur, ton compte rendu part le jour même : chaque action a un nom et une date."
  },
  {
    id: "cp15-q03",
    dialecte: "Gestion de projet",
    q: "Le chef de projet de la PA te demande d'inviter le DAF au comité de février, « pour lui présenter notre feuille de route ». Aucune décision n'est à prendre. Que fais-tu ?",
    choix: [
      "Tu invites le DAF, et le DG aussi, pour montrer votre sérieux",
      "Tu invites le DAF : la PA le demande, ça soigne la relation",
      "Tu refuses que la PA présente sa feuille de route en comité",
      "Tu vois la feuille de route au comité ; le DAF aura 3 lignes"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Deux dirigeants pour une présentation, sans décision à prendre : c'est leur temps. Le sérieux se montre par tes mesures et tes comptes rendus.",
      "Non. Tu prends 1 heure au DAF pour écouter. S'il vient sans décision à prendre, il ne viendra plus le jour où il le faudra.",
      "Non. Sa feuille de route t'intéresse : une nouveauté peut éviter un spécifique, ou toucher ton planning. C'est le DAF qui n'a pas à l'écouter.",
      "Oui. La feuille de route se voit entre chefs de projet, au comité. Le DAF reçoit l'essentiel en 3 lignes ; il viendra quand une décision l'attendra (crédits, avenant)."
    ],
    retenir: "Le DAF vient au comité fournisseur pour décider, pas pour écouter : sinon, 3 lignes lui suffisent."
  },
  {
    id: "cp15-q04",
    dialecte: "Gestion de projet",
    q: "Au COPIL, le DAF : « Pourquoi un comité fournisseur chaque mois avec la PA ? Le COPIL suffit. » Que lui réponds-tu ?",
    choix: [
      "« Il suit la PA ; le COPIL en reçoit l'essentiel, et décide »",
      "« D'accord : on l'arrête, et on suivra la PA ici, au COPIL »",
      "« C'est la méthode du PMBOK : un comité par fournisseur »",
      "« Invitons la PA à chaque COPIL : tu la suivras toi-même »"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Deux instances, deux rôles. Le comité suit le service et le plan d'actions de la PA ; le COPIL en reçoit 3 lignes, et tranche ce qui le demande (crédits, avenant).",
      "Non. Le COPIL décide pour tout le projet, une fois par mois : le suivi du SLA et des actions de la PA n'y tient pas. Les écarts passeraient sans suite.",
      "Non. Le DAF demande l'utilité, pas une méthode. Et le PMBOK décrit le suivi des fournisseurs, pas ta gouvernance : c'est ton projet qui la justifie.",
      "Non. Le COPIL est votre instance de décision : la PA y entendrait vos débats internes. Et le DAF ne veut pas suivre un fournisseur, il veut décider."
    ],
    retenir: "Le comité fournisseur suit le prestataire ; le COPIL en reçoit l'essentiel et décide. Ne mélange pas les deux."
  },
  {
    id: "cp15-q05",
    dialecte: "Gestion de projet",
    q: "Comité de mars. Après 2 pannes du portail en février, le plan de la PA tient en une ligne : « Nous allons renforcer nos équipes. » Que fais-tu ?",
    choix: [
      "Tu l'acceptes : la PA s'engage par écrit, c'est déjà ça",
      "Tu portes ce plan vide à son responsable de compte, le jour même",
      "Tu demandes des actions, chacune avec un nom et une date",
      "Tu exiges une date de fin, et tu l'écris au compte rendu"
    ],
    bonne: 2,
    pourquoi: [
      "Non. « Renforcer » ne dit ni quoi, ni qui, ni quand : au comité suivant, impossible de savoir si c'est fait. Une promesse n'est pas un plan.",
      "Non. C'est la 1re fois que tu demandes un vrai plan : son chef de projet doit pouvoir le faire. Son responsable de compte, c'est s'il refuse, ou ne tient pas sa promesse.",
      "Oui. Un plan d'actions se vérifie : des actions précises (surveillance, correctif, astreinte), un nom, une date. Tu le relis au comité suivant.",
      "Non. Presque : une date aide, et l'écrire aussi, mais « renforcer nos équipes » reste vague. Il faut savoir quelles actions, et faites par qui."
    ],
    retenir: "Un plan d'actions daté : des actions précises, chacune avec un nom et une date, relues au comité suivant."
  },
  {
    id: "cp15-q06",
    dialecte: "Gestion de projet",
    q: "Point hebdo. Commande de l'intégrateur : 40 jours, dont 26 consommés. Le consultant détaille son reste à faire, tâche par tâche : 20 jours. Règle du projet : alerte au DAF à 80 %. Que fais-tu ?",
    choix: [
      "Pas d'alerte avant 32 jours consommés : la règle dit 80 %",
      "Tu lui demandes de tenir en 14 jours, pas un de plus",
      "Tu notes l'écart, et tu préviens le DAF au prochain COPIL",
      "Tu alertes le DAF aujourd'hui : 46 jours, avec des options"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Presque : 80 % est une limite, pas un moment à attendre. 26 + 20 = 46 : l'atterrissage dépasse déjà de 6 jours. Le DAF doit le savoir avant qu'ils soient dépensés.",
      "Non. Tu lui demandes de tenir un chiffre, pas de réduire le travail : il coupera dans les tests, ou les jours arriveront plus tard. En régie, le risque reste chez vous.",
      "Non. Le prochain COPIL peut être dans 3 semaines : des jours de plus seront partis. L'écart est connu aujourd'hui : le DAF le sait aujourd'hui.",
      "Oui. Consommé + reste à faire = 46 jours pour 40 commandés. Tu alertes tôt, avec des options : retirer une tâche, ou une nouvelle commande, signée avant le 41e jour."
    ],
    retenir: "L'alerte à 80 % est une limite, pas une attente : si consommé + reste à faire dépasse la commande, le DAF le sait tout de suite."
  },
  {
    id: "cp15-q07",
    dialecte: "Gestion de projet",
    q: "Point hebdo. Commande de l'intégrateur : 40 jours. Consommés : 32, soit 80 %. Reste à faire, tâche par tâche : 8 jours. Tout tient. Que fais-tu ?",
    choix: [
      "Deux lignes au DAF : 80 %, atterrissage à 40, rien à signer",
      "Tu fais signer au DAF 5 jours de plus, par prudence",
      "Tu lui demandes de finir en 6 jours : 38 au total, au lieu de 40",
      "Tu réunis le DAF et le consultant : à 80 %, on revoit chaque tâche"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. L'alerte à 80 % peut être une bonne nouvelle : 2 lignes suffisent. Le DAF sait où en est sa commande, et qu'aucune signature n'est attendue.",
      "Non. Tu commandes des jours dont personne n'a besoin : en régie, des jours commandés finissent souvent par être consommés. Une commande répond à un besoin chiffré.",
      "Non. Tu mets la pression sur une estimation déjà faite tâche par tâche : il coupera dans la qualité, ou les jours reviendront plus tard.",
      "Non. Une réunion pour un reste à faire qui tient : du temps pris au DAF, et des heures facturées par le consultant, pour rien de neuf."
    ],
    retenir: "À 80 % de la commande, tu préviens le DAF, même quand tout tient : 2 lignes, l'atterrissage, et s'il faut signer."
  },
  {
    id: "cp15-q08",
    dialecte: "Gestion de projet",
    q: "Point hebdo, 3e semaine de suite : le consultant annonce « encore 5 jours » pour boucler le paramétrage des statuts. Il en a consommé 8 depuis la 1re annonce. Que fais-tu ?",
    choix: [
      "Tu lui fixes une date de fin ferme, et tu la lui écris",
      "Tu demandes à son responsable un autre consultant, dès lundi",
      "Le reste à faire par tâche, et ce qui est fini, dans Divalto",
      "Tu le crois : c'est lui qui connaît le mieux son paramétrage"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Une date ne dit pas ce qui reste à faire : il finira en coupant, ou il la ratera quand même. D'abord, comprendre pourquoi ça ne baisse pas.",
      "Non. Tu ne sais pas encore pourquoi ça ne baisse pas : un souci technique, un besoin flou, une donnée qui manque. Changer de consultant coûte une passation.",
      "Oui. Tu fais détailler le reste par tâche, et tu regardes dans Divalto ce qui est vraiment fini. Puis tu recalcules l'atterrissage, et tu alertes le DAF s'il dépasse.",
      "Non. Trois annonces à « encore 5 jours », et 8 jours consommés entre-temps : c'est un signal. Le croire, c'est découvrir le dérapage sur la facture."
    ],
    retenir: "Un reste à faire qui ne baisse pas : le détailler tâche par tâche, voir ce qui est vraiment fini, puis recalculer l'atterrissage."
  },
  {
    id: "cp15-q09",
    dialecte: "Gestion de projet",
    q: "Mardi. En régie, le consultant attend depuis lundi des données de la compta : « Je fais quoi, en attendant ? » Que fais-tu ?",
    choix: [
      "Une autre tâche du plan, et une date pour les données",
      "Il attend : le retard vient de la compta, pas de lui",
      "Tu demandes au DAF de ne pas payer ces jours d'attente",
      "Il saisit les données, et la compta les teste ensuite"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Tu lui confies une autre tâche prévue, qui ne dépend pas de ces données. Et tu demandes à la cheffe comptable une date ferme pour les données.",
      "Non. En régie, un consultant qui attend est payé : le risque est chez vous. Chaque jour d'attente se paie, sans rien produire.",
      "Non. Il était là, disponible, et le retard vient de vous : c'est au client de fournir ses données à temps. En régie, ces jours se paient en général, sauf clause contraire de la commande.",
      "Non. Les données de la compta sont à la compta : il risque de se tromper, et tu paies ce temps-là. Les tester ensuite lui prend autant de temps que les fournir."
    ],
    retenir: "En régie, un consultant qui attend coûte : tu lui donnes une autre tâche prévue, et tu débloques ce qui l'arrête."
  },
  {
    id: "cp15-q10",
    dialecte: "Gestion de projet",
    q: "Tu es DSI adjoint. Un consultant en régie travaille dans ton équipe depuis 18 mois. Ton analyste lui fixe ses horaires et valide ses congés, comme à un salarié. Que fais-tu ?",
    choix: [
      "Rien : il est bien intégré, c'est mieux pour tout le monde",
      "Tu fais son entretien annuel, et tu fixes ses objectifs",
      "Tu demandes à ton analyste de noter ses horaires et congés",
      "Horaires et congés : son employeur. Toi, tu suis son travail"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Il reste le salarié de l'intégrateur. Le diriger comme le tien (horaires, congés) est, en général, un risque juridique : le prêt de main-d'œuvre illicite. À voir avec le DAF.",
      "Non. Tu le gères encore plus comme un salarié : le risque juridique grandit. Son évaluation, c'est son employeur ; toi, tu donnes ton avis sur le travail rendu.",
      "Non. Tu mets par écrit ce qui pose problème : il reste géré comme un salarié, et le risque juridique reste entier.",
      "Oui. Tu lui confies des tâches et tu suis le résultat. Ses horaires, ses congés, son remplaçant : c'est son employeur, avec qui tu cales la continuité. Point juridique à faire vérifier."
    ],
    retenir: "En régie, tu confies des tâches et tu suis le résultat ; horaires, congés et remplacement restent à son employeur."
  },
  {
    id: "cp15-q11",
    dialecte: "Gestion de projet",
    q: "Mars. La commande prévoit la documentation du paramétrage du connecteur. Le consultant la livre : 30 captures d'écran, sans explication. Que fais-tu ?",
    choix: [
      "Tu bloques le paiement de toute la commande, dès ce mois",
      "Tu l'acceptes : une documentation était prévue, la voilà",
      "Tu la complètes toi-même, en partant de ses captures",
      "Tu la fais tester au support de la DSI, avec elle seule"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Un livrable incomplet se signale et se fait compléter : bloquer toute la commande punit des jours de travail utiles, et tend la relation.",
      "Non. Des captures sans explication ne disent ni pourquoi, ni comment changer : le jour où le consultant part, personne ne sait s'en servir.",
      "Non. Tu fais son livrable, sans son savoir : ta doc sera incomplète, et tu paies quand même la sienne.",
      "Oui. Une documentation se teste : quelqu'un d'autre fait un petit changement avec elle seule. S'il n'y arrive pas, le livrable est incomplet : tu l'écris le jour même, avec ce qui manque."
    ],
    retenir: "Une documentation est un livrable : elle se teste par quelqu'un d'autre, avant d'être acceptée."
  },
  {
    id: "cp15-q12",
    dialecte: "Gestion de projet",
    q: "Un seul consultant connaît le paramétrage. Tu veux un 2e consultant, formé en binôme. L'intégrateur : « D'accord : 4 jours, en régie. » Que fais-tu ?",
    choix: [
      "Tu exiges qu'il les offre : c'est son consultant, son problème",
      "Tu y renonces : 4 jours, c'est trop cher pour un risque",
      "Tu proposes les 4 jours au DAF, avec le risque qu'ils évitent",
      "Tu les prends sur l'enveloppe des écrans de la compta"
    ],
    bonne: 2,
    pourquoi: [
      "Non. En régie, il vend du temps : former un 2e consultant pour vous, ce sont des jours. Tu peux lui demander un geste, pas l'exiger.",
      "Non. Tu acceptes seul un risque qui peut bloquer le pilote : ce choix revient au DAF, qui paie. Toi, tu le chiffres.",
      "Oui. En régie, chaque jour en plus est une commande signée par le DAF. Tu lui montres ce que ces 4 jours évitent : une absence soudaine, en plein pilote. Il décide en connaissant le prix.",
      "Non. L'enveloppe paie les écrans de la partie agile, pas la sécurité du cœur : prendre dessus, c'est une dérive cachée (module cp10)."
    ],
    retenir: "Un binôme en régie coûte des jours : le DAF décide, avec le risque chiffré qu'il évite."
  },
  {
    id: "cp15-q13",
    dialecte: "Gestion de projet",
    q: "Recette. Un paramètre du connecteur est faux : anomalie ouverte hier. Le consultant ne l'a pas encore corrigé. Ton collègue du support N2 : « Je sais le faire : 10 minutes. » Que fais-tu ?",
    choix: [
      "Ton collègue corrige en 10 minutes, et tu fermes l'anomalie",
      "Tu écris au responsable du consultant : l'anomalie traîne",
      "Le consultant corrige d'ici demain, ton collègue à côté",
      "Tu attends le point hebdo de lundi pour en parler"
    ],
    bonne: 2,
    pourquoi: [
      "Non. La DSI touche à son paramétrage sans lui : il peut ne plus répondre du résultat. Et ton collègue n'apprend rien du consultant.",
      "Non. Il n'a encore ni refusé, ni raté d'échéance : une date claire suffit. Son responsable, c'est s'il ne la tient pas.",
      "Oui. L'anomalie reste à celui qui a paramétré, avec une échéance. Ton collègue N2 corrige avec lui : c'est le transfert de compétences, et la DSI dépendra moins de lui.",
      "Non. Une anomalie de recette a besoin d'une échéance maintenant, pas lundi : chaque jour d'attente retarde les tests."
    ],
    retenir: "Ne corrige pas à la place du prestataire : fais-le corriger, avec ton support à côté, pour apprendre."
  },
  {
    id: "cp15-q14",
    dialecte: "Gestion de projet",
    q: "Mars. Les mêmes erreurs de paramétrage reviennent, malgré 2 recadrages du consultant et un échange avec son responsable. La recette les paie. Que fais-tu ?",
    choix: [
      "Tu le recadres une 3e fois, son responsable et le DAF en copie",
      "Tu demandes au DAF de changer d'intégrateur, en pleine recette de mars",
      "Tu demandes à son responsable un autre consultant, avec passation",
      "Tu corriges toi-même les erreurs du consultant, pour aller vite"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Deux recadrages et son responsable n'ont rien changé : un 3e écrit, même avec des copies, ne fera pas mieux. La recette paie chaque erreur.",
      "Non. Changer d'intégrateur en pleine recette : un nouveau contrat, tout à réapprendre, la date légale en danger. Un autre consultant règle d'abord le problème.",
      "Oui. Tu as essayé à son niveau, puis chez son responsable. Un autre consultant, avec une passation, garde l'intégrateur et ce qu'il sait de votre Divalto. Changer d'intégrateur viendrait en dernier.",
      "Non. Tu fais son travail, payé en régie, et tu deviens celui qui connaît le paramétrage à sa place. Le problème reste entier."
    ],
    retenir: "Un consultant qui ne progresse pas malgré recadrages et escalade : un autre consultant, avant un autre prestataire."
  },
  {
    id: "cp15-q15",
    dialecte: "Gestion de projet",
    q: "L'intégrateur remplace son consultant par un collègue, et facture 3 jours de « prise de connaissance ». La commande dit : un changement de consultant se fait sans surcoût, passation comprise. Que fais-tu ?",
    choix: [
      "Tu paies 1,5 des 3 jours : chacun fait un pas",
      "Tu paies : il faut bien que le nouveau consultant apprenne",
      "Tu paies, et tu le notes pour la prochaine commande",
      "Tu refuses ces 3 jours, commande en main, DAF informé"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Un compromis sur des jours qui ne sont pas dus : la clause ne vaut plus rien, et la prochaine facture prendra le même chemin.",
      "Non. La commande dit l'inverse : un changement de consultant est sans surcoût pour vous. Tu paies ce que le contrat met à sa charge.",
      "Non. Le noter ne règle rien : la clause s'applique maintenant. Payer, c'est renoncer à ce que la commande te donne.",
      "Oui. La clause est écrite : le changement, passation comprise, est à sa charge. Tu le lui écris, commande en main, et le DAF, qui paie les factures, le sait."
    ],
    retenir: "Ce que le contrat met à la charge du prestataire ne se paie pas : tu le refuses, contrat en main."
  },
  {
    id: "cp15-q16",
    dialecte: "Gestion de projet",
    q: "Comité de novembre 2027. Rapport de la PA pour octobre : disponibilité 99,9 %. Tes tickets montrent deux pannes du portail, 5 h en tout. Que fais-tu ?",
    choix: [
      "Tu écris à son responsable de compte : son rapport est faux",
      "Tes tickets face à son rapport, et le détail de sa mesure",
      "Tu prends son chiffre : c'est son outil qui mesure",
      "Tu demandes au DAF les crédits, et tu joins tes tickets"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Tu accuses avant d'avoir comparé : peut-être une maintenance annoncée, exclue du calcul. Le comité est fait pour ça, entre chefs de projet.",
      "Oui. Deux mesures qui ne collent pas : tu montres tes tickets (heures de début et de fin), et tu demandes comment la PA mesure. Une exclusion, ou une erreur ? L'écart se fixe sur des faits partagés.",
      "Non. Sans tes traces, son rapport ferait foi ; mais tu en as : 5 h de panne sur octobre, c'est sous 99,5 %. Prendre son chiffre, c'est renoncer à l'écart.",
      "Non. Presque : l'écart est probable, mais tes chiffres ne sont pas encore confrontés aux siens. Le DAF doit décider sur un calcul que la PA ne pourra pas contester."
    ],
    retenir: "Le SLA se mesure aussi chez toi : tes tickets face à son rapport, et l'écart fixé sur des faits partagés."
  },
  {
    id: "cp15-q17",
    dialecte: "Gestion de projet",
    q: "Samedi 10 h, le portail de la PA tombe. Il revient lundi à 9 h. Au comité, la PA : « Hors heures de support, le délai de 4 h ne courait pas. Pas d'écart. » Que réponds-tu ?",
    choix: [
      "« Pour les 4 h, oui. Mais 47 h de panne : le mois est sous 99,5 % »",
      "« 47 h sans portail : nous préparons la résiliation et les pénalités »",
      "« D'accord : hors heures de support, rien à vous reprocher ce mois-ci »",
      "« Non : votre délai de 4 h courait dès samedi 10 h, comme en semaine »"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Deux mesures différentes. Le délai de 4 h : aux heures de support. La disponibilité : jour et nuit, tout le mois. 47 h de panne, c'est loin sous 99,5 % : un écart, et des crédits que le DAF décidera.",
      "Non. Un écart se traite : la cause, un plan daté, des crédits que le DAF décide. Menacer de résilier pour une panne, c'est la plus grosse solution, avec une obligation légale à tenir.",
      "Non. Presque : le délai de 4 h court aux heures de support. Mais la disponibilité se mesure jour et nuit, week-end compris : 47 h de panne, le mois est en écart.",
      "Non. L'annexe met les délais (1 h, 4 h) dans les heures de support : de 8 h à 18 h, les jours ouvrés. Le samedi, ce délai-là ne courait pas."
    ],
    retenir: "Le délai de rétablissement court aux heures de support ; la disponibilité se mesure jour et nuit. Une panne de week-end compte."
  },
  {
    id: "cp15-q18",
    dialecte: "Gestion de projet",
    q: "Juillet 2027. Une panne du portail de 5 h, en heures de support. Une panne isolée : la PA en a trouvé la cause, et l'a corrigée. Que fais-tu ?",
    choix: [
      "Rien : la cause est trouvée, et la panne déjà corrigée",
      "L'écart au comité, cause vérifiée, et les crédits chiffrés au DAF",
      "Tu fais tester la réversibilité du contrat, pour préparer une sortie",
      "Tu portes l'écart à son responsable de compte aujourd'hui, plan exigé"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Corrigée ou pas, c'est un écart au contrat : 5 h, au-delà des 4 h, et sous 99,5 % sur le mois. Les crédits, c'est le DAF qui décide, pas toi.",
      "Oui. Un écart se note, même isolé : tu vérifies la cause et la correction au comité, et tu apportes au DAF le calcul des crédits. Il décide de les appliquer.",
      "Non. Préparer une sortie pour une panne isolée : c'est la plus grosse solution. Changer de PA vient en dernier, après mesures, plans et escalade.",
      "Non. Une panne isolée, cause trouvée et corrigée : rien ne justifie de monter. Son responsable de compte, c'est quand ça recommence après une promesse."
    ],
    retenir: "Chaque écart au SLA se note et se chiffre, même isolé ; on monte quand ça recommence après une promesse."
  },
  {
    id: "cp15-q19",
    dialecte: "Gestion de projet",
    q: "Le DAF renonce aux crédits du SLA pour avril : « En pleine recette, la relation compte plus. » Tu lui avais donné ton avis : les appliquer. Que fais-tu ?",
    choix: [
      "D'accord : tu notes sa décision, et tu mesures toujours le SLA",
      "Tu le préviens, puis tu demandes au DG de revoir sa décision",
      "Tu lui redemandes d'appliquer les crédits du SLA, calcul en main",
      "Tu remets le sujet au COPIL, pour qu'il soit rejugé devant tous"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Les crédits, c'est sa décision : il a signé, et il tranche en connaissant le prix. Toi, tu continues à mesurer : les écarts nourrissent le comité, et le choix au renouvellement.",
      "Non. Le sponsor qui tranche en connaissant le coût a décidé : on applique. Le prévenir, c'est bien ; mais passer au-dessus de lui pour ça te coûte sa confiance.",
      "Non. Ton avis, tu l'as donné, et il a décidé en connaissant le prix. Revenir sans fait nouveau, c'est contester sa décision.",
      "Non. Faire rejuger ton sponsor en COPIL, c'est le contester devant tous. Il a tranché : c'est décidé."
    ],
    retenir: "Le DAF renonce aux crédits en connaissant le prix : c'est décidé. Tu continues à mesurer le SLA."
  },
  {
    id: "cp15-q20",
    dialecte: "Gestion de projet",
    q: "Mars. Le SLA de la PA est tenu. Mais chaque matin, de 8 h à 9 h, le portail met 2 minutes par facture. Julie y perd 1 h par jour. Que fais-tu ?",
    choix: [
      "Tu le notes, et tu prépares un changement de PA à l'échéance",
      "Tu mesures ces lenteurs, et tu les portes au prochain comité",
      "Rien de plus : le SLA est tenu, la PA est dans son droit",
      "Tu demandes au DAF les crédits prévus par le contrat, pour mars"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Tu n'as encore rien demandé à la PA : la cause est peut-être simple. Changer de PA est un projet, en dernier recours.",
      "Oui. SLA tenu ne veut pas dire service correct. Des mesures (heures, durées, nombre de factures) portées au comité : la PA cherche la cause, avec un plan daté. Au renouvellement, un indicateur de rapidité pourra s'ajouter.",
      "Non. Presque : le contrat ne promet pas la vitesse. Mais Julie perd 1 h par jour : un service se pilote aussi par les faits, hors du contrat.",
      "Non. Aucun chiffre du contrat n'est raté : pas d'écart, pas de crédits. La lenteur se traite par un plan, pas par une pénalité."
    ],
    retenir: "SLA tenu ne veut pas dire service correct : mesure ce qui gêne, et porte-le au comité, faits en main."
  },
  {
    id: "cp15-q21",
    dialecte: "Gestion de projet",
    q: "Septembre 2027. Depuis un mois, le connecteur s'arrête chaque lundi vers 7 h. La PA le relance en 30 minutes : SLA tenu. C'est arrivé 4 fois. Que fais-tu ?",
    choix: [
      "Tu demandes au DAF les crédits : 4 arrêts en un mois",
      "Rien : chaque arrêt est réglé dans les délais du SLA",
      "Ta DSI le relance elle-même chaque lundi, à 6 h 30, avec un ticket",
      "La cause de fond au comité, avec un plan daté"
    ],
    bonne: 3,
    pourquoi: [
      "Non. 4 arrêts de 30 minutes : 2 h sur le mois, sous la limite. Pas d'écart, pas de crédits. Le sujet, c'est la cause.",
      "Non. Chaque incident est réglé, mais il revient : la cause, elle, n'est pas traitée. Au 5e lundi, une clôture peut tomber dessus.",
      "Non. Tu fais à sa place, chaque semaine, sans fin : la cause reste, et ta DSI porte un travail payé dans l'abonnement. Un contournement peut aider, le temps de trouver la cause.",
      "Oui. ITIL sépare l'incident (rétablir vite : c'est fait) et le problème (la cause d'incidents qui reviennent). Tu demandes l'analyse et un plan daté au comité."
    ],
    retenir: "Un incident qui revient est un problème : demande la cause de fond et un plan daté, pas un redémarrage de plus."
  },
  {
    id: "cp15-q22",
    dialecte: "Gestion de projet",
    q: "Tu es DSI adjoint. Février 2029. Depuis 2 ans, la PA rate son SLA un mois sur deux, malgré des plans datés, 2 passages chez son responsable de compte et des crédits appliqués. Préavis : fin mai. Que fais-tu ?",
    choix: [
      "Un nouveau plan daté de la PA, et un suivi de près au comité",
      "Le DG chez leur direction générale, pour un dernier essai",
      "Tu laisses passer fin mai : vous verrez au prochain préavis",
      "D'autres PA consultées, et le choix du DAF avant fin mai"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Des plans datés, il y en a eu pendant 2 ans, sans effet durable. Un de plus repousse la décision après le préavis.",
      "Non. Le DG n'a pas à négocier avec un prestataire (module cp18). Et sans autre offre en main, ce dernier essai ne pèse rien : la PA sait que vous n'avez pas d'autre choix.",
      "Non. Passé fin mai, le contrat repart pour un an, avec le même service, sans que le DAF ait choisi.",
      "Oui. Mesures, plans, escalade, crédits : tout a été essayé. Tu consultes d'autres PA (module cp13), sortie chiffrée : le DAF choisit avant fin mai (rester, renégocier, changer). Ces offres sont aussi ton meilleur levier."
    ],
    retenir: "Changer de fournisseur vient en dernier : quand mesures, plans, escalade et crédits n'ont rien changé, et avant la date du préavis."
  },
  {
    id: "cp15-q23",
    dialecte: "Gestion de projet",
    q: "Julie a le portable du consultant de l'intégrateur. Elle l'appelle pour chaque souci Divalto, sans passer par le support de la DSI. Il répond, et facture ce temps en régie. Que fais-tu ?",
    choix: [
      "Le consultant note chaque appel dans un ticket, après coup",
      "Tu laisses faire : c'est rapide, et Julie est contente",
      "Il ne prend que les urgences ; le reste va au support plus tard",
      "Julie passe par le support, qui ouvre un ticket si besoin"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Presque : il y a une trace, mais le consultant reste le 1er niveau, payé en régie. Les cas simples doivent s'arrêter au support de la DSI.",
      "Non. Rapide pour elle, cher pour vous : chaque appel est facturé, sans trace, et le support de la DSI ne voit rien. Il n'apprend jamais à traiter les cas simples.",
      "Non. C'est encore Julie qui juge l'urgence, sur un portable : pas de ticket, pas de délai, pas de trace. Le tri revient au support.",
      "Oui. Un seul canal : le support de la DSI (N1, puis N2) traite ce qu'il sait, et ouvre un ticket au N3 sinon. Tu l'expliques à Julie ; le consultant renvoie vers le support."
    ],
    retenir: "Un seul canal : l'utilisateur passe par le support de la DSI, qui ouvre un ticket au prestataire si besoin."
  },
  {
    id: "cp15-q24",
    dialecte: "Gestion de projet",
    q: "Lundi 8 h 30. Le portail de la PA refuse des factures fournisseurs. Le N2 de la DSI a vérifié : ni le réseau, ni Divalto. Quel ticket envoie-t-il à la PA ?",
    choix: [
      "« Portail en panne depuis ce matin : priorité maximale, merci de faire vite ! »",
      "« Priorité 1 : toute la compta est bloquée à cause de votre portail. Rappelez Julie au plus vite. »",
      "« Depuis 8 h 10, des factures sont refusées pour SIREN invalide. Merci de corriger rapidement. »",
      "« Depuis 8 h 10, refus SIREN invalide : 3 cas joints, reproduit. 40 factures bloquées, priorité 2. »"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Aucun fait : quelles factures, quel message, combien ? Le N3 doit tout redemander, et « priorité maximale » n'est pas une priorité du contrat.",
      "Non. La compta n'est pas toute bloquée : une priorité gonflée fausse les délais, et la PA finit par contester tes priorités. Et il manque les faits.",
      "Non. Presque : l'heure et le message y sont, mais ni exemples, ni impact, ni priorité. La PA ne sait pas si c'est 1 facture ou 400.",
      "Oui. Les faits (heure, message), des exemples, la preuve que ça se reproduit, l'impact, et la priorité selon les définitions du contrat. Le N3 peut chercher tout de suite."
    ],
    retenir: "Un bon ticket : les faits, des exemples, comment reproduire, l'impact, et la priorité définie au contrat."
  },
  {
    id: "cp15-q25",
    dialecte: "Gestion de projet",
    q: "Mardi 10 h, ticket « bloquant » ouvert à la PA : prise en charge en 1 h, portail rétabli en 4 h. La cheffe comptable te demande d'appeler la PA toutes les 15 minutes. Que fais-tu ?",
    choix: [
      "Tu appelles toutes les 15 minutes : c'est bloquant, elle a raison",
      "Tu écris à son responsable de compte dès 10 h 15, DAF en copie",
      "Tu relances dès 11 h sans prise en charge, à 14 h sans retour",
      "Tu attends ce soir : prise en charge et délais sont à la PA"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Appeler toutes les 15 minutes occupe ceux qui réparent, sans rien accélérer. Tu relances aux échéances du contrat, avec les faits.",
      "Non. À 10 h 15, aucun délai n'est dépassé : monter maintenant, c'est escalader avant d'avoir un écart. Et le DAF n'a rien à décider.",
      "Oui. Les échéances du contrat rythment le suivi : 11 h pour la prise en charge, 14 h pour le rétablissement. Tu expliques ce rythme à la cheffe comptable, et tu la tiens informée.",
      "Non. Attendre ce soir, c'est rater les deux échéances sans le voir. Une relance à l'heure du contrat fait partie du suivi."
    ],
    retenir: "Suivre sans harceler : on relance aux échéances du contrat, faits en main, et on tient le métier informé."
  },
  {
    id: "cp15-q26",
    dialecte: "Gestion de projet",
    q: "Tu es DSI adjoint. Ton équipe support (N2) ouvre tous ses tickets à la PA en priorité 1, « pour aller plus vite ». Au comité, la PA conteste chaque priorité. Que fais-tu ?",
    choix: [
      "Tu fais écrire par avenant : tout ticket est en priorité 1",
      "Tu laisses ton équipe faire : ça met la PA sous pression",
      "Ton équipe suit les définitions de priorité du contrat",
      "Tu laisses la PA fixer elle-même la priorité de chaque ticket"
    ],
    bonne: 2,
    pourquoi: [
      "Non. La PA ne signera jamais ça, et ça n'aurait plus de sens : les priorités servent à trier.",
      "Non. Tout en priorité 1, plus rien n'est prioritaire : la PA conteste, et les vrais bloquants attendent avec le reste. Vos écarts au SLA deviennent discutables.",
      "Oui. Le contrat définit chaque priorité (ce qui bloque tout, ce qui gêne). Ton équipe l'applique : un vrai bloquant est alors traité comme tel, sans débat.",
      "Non. La priorité dit l'impact chez vous : la PA ne le connaît pas, et elle a intérêt à la baisser. C'est à vous de la fixer, selon le contrat."
    ],
    retenir: "La priorité d'un ticket suit les définitions du contrat : tout en priorité 1, plus rien n'est prioritaire."
  },
  {
    id: "cp15-q27",
    dialecte: "Gestion de projet",
    q: "La PA a fermé ton ticket : « résolu ». Le lendemain, Julie te montre que les factures de ce fournisseur sont toujours refusées, avec le même message. Que fais-tu ?",
    choix: [
      "Tu rouvres le ticket, avec le nouveau cas de Julie",
      "Tu écris à son responsable de compte, faits en main",
      "Tu ouvres un nouveau ticket pour Julie, en priorité 1 cette fois",
      "Tu demandes au DAF des crédits pour ce ticket mal fermé"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Même problème, même message : le ticket n'était pas résolu. Tu le rouvres, avec les faits, et tu demandes qu'il ne se ferme qu'après la confirmation de Julie.",
      "Non. Une 1re fermeture trop rapide se règle en rouvrant le ticket. Si ça devient une habitude, tu le portes au comité.",
      "Non. Un nouveau ticket perd l'historique et remet le délai à zéro. Et la priorité 1 se mérite selon le contrat, pas par agacement.",
      "Non. Rien ne dit qu'un chiffre du contrat est raté : d'abord rouvrir, et faire corriger. Les crédits viennent d'un écart mesuré."
    ],
    retenir: "Un ticket se ferme quand l'utilisateur confirme ; sinon, on le rouvre, avec les faits."
  },
  {
    id: "cp15-q28",
    dialecte: "Gestion de projet",
    q: "Un état standard de Divalto donne un total faux sur certains avoirs. L'intégrateur, ton N3 : « Bug de l'éditeur ; Divalto le corrigera dans une prochaine version. » La clôture du mois est dans 10 jours. Que fais-tu ?",
    choix: [
      "Le programme standard, corrigé par l'intégrateur avant la clôture",
      "Un contournement pour la clôture, et le bug suivi chez Divalto",
      "Tu appelles Divalto toi-même, et tu exiges une date de correction",
      "Tu attends la prochaine version : le bug vient de l'éditeur"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Divalto déconseille de modifier le standard : à la montée de version, la modification est difficile à retrouver, et peut casser. Un contournement suffit en attendant.",
      "Oui. Deux choses. Un contournement pour la clôture (une correction à la main, un autre état). Et le bug suivi chez l'éditeur, par l'intégrateur : sa référence, et la version qui le corrige.",
      "Non. Ton support Divalto, c'est l'intégrateur : partenaire de l'éditeur, c'est lui qui remonte le bug. En direct, tu doubles le circuit, sans trace.",
      "Non. « Une prochaine version » n'a pas de date, et ta clôture est dans 10 jours. Il te faut une solution d'ici là."
    ],
    retenir: "Bug de l'éditeur : un contournement pour tenir ta date, et le bug suivi par l'intégrateur jusqu'à la version qui le corrige."
  },
  {
    id: "cp15-q29",
    dialecte: "Gestion de projet",
    q: "Février. Le DAF a validé l'idée de Marc : ne plus émettre de facture client avec un SIREN faux ou absent. Le consultant propose un spécifique : 2 jours. Que fais-tu d'abord ?",
    choix: [
      "Tu commandes les 2 jours : le DAF a déjà validé l'idée",
      "Tu demandes à Divalto de l'ajouter à sa prochaine version",
      "Un développeur de la DSI le code, puis l'intégrateur le relit",
      "Tu fais vérifier le standard, puis la feuille de route"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Le DAF a validé le besoin, pas la solution. Payer un spécifique avant de regarder le standard, c'est risquer de payer deux fois : à sa création, puis à chaque version.",
      "Non. Un éditeur fait ses versions pour tous ses clients, à sa date : tu ne peux pas compter dessus pour février. Et la réponse est peut-être déjà là.",
      "Non. Un spécifique de plus, codé hors de l'intégrateur, dans le Divalto qu'il paramètre : une relecture ne le rend pas responsable, et personne ne le suit aux versions. Et le standard le fait peut-être déjà.",
      "Oui. Le standard d'abord. Ici, Divalto 10.13 contrôle déjà le SIREN des tiers en Factur-X (« Validation conformité Siret-Siren Factur-X », depuis la 10.12). On l'essaie avec Marc avant de payer un spécifique."
    ],
    retenir: "Avant un spécifique : le standard, puis la feuille de route. Le besoin est validé, pas encore la solution."
  },
  {
    id: "cp15-q30",
    dialecte: "Gestion de projet",
    q: "Octobre 2027. Divalto publie une nouvelle version. Votre Divalto a 12 spécifiques. Avant de planifier la montée de version, que demandes-tu à l'intégrateur ?",
    choix: [
      "Les effets sur vos 12 spécifiques, puis un test sur une copie",
      "Rien de spécial : l'éditeur a testé sa version avant",
      "Une garantie écrite de Divalto sur vos 12 spécifiques",
      "La liste des nouveautés, puis un plan de formation de la compta"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Divalto publie ce qui change à chaque version (programmes réécrits, tables et champs modifiés). L'intégrateur en tire les effets sur vos spécifiques ; puis le métier teste sur une copie de la base.",
      "Non. L'éditeur teste son standard, pas vos spécifiques : un programme réécrit, un champ déplacé, et un spécifique casse en production.",
      "Non. L'éditeur ne répond que de son standard : vos spécifiques ont été faits pour vous, par l'intégrateur. C'est lui qui les vérifie.",
      "Non. Presque : la compta devra savoir ce qui change. Mais le risque, ce sont les spécifiques : sans leur analyse, tu formes sur une version qui peut casser."
    ],
    retenir: "Avant une montée de version : l'effet sur chaque spécifique, puis un test du métier sur une copie de la base."
  },
  {
    id: "cp15-q31",
    dialecte: "Gestion de projet",
    q: "Novembre 2027. L'intégrateur propose de monter de version Divalto le 4 janvier : « Toute la compta sera rentrée de congés. » Que réponds-tu ?",
    choix: [
      "« D'accord : le 4 janvier, toute l'équipe est là pour tester »",
      "« Pas en janvier, ni en clôture : mi-février, tests faits »",
      "« On reste en 10.13 : on ne change pas ce qui marche »",
      "« Plutôt le 20 décembre : on testera pendant les fêtes, c'est calme »"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Janvier, c'est la clôture annuelle : la compta n'a pas le temps de tester, et un souci de version tomberait en plein bilan.",
      "Oui. Hors clôture, et après un test de la compta sur une copie. Mi-février, la clôture annuelle est finie, et la clôture du mois aussi (5 jours ouvrés).",
      "Non. Une version n'est maintenue qu'un temps : rester trop longtemps, c'est perdre les corrections, puis le support. Une montée de version se planifie.",
      "Non. Les fêtes sont calmes, mais la compta est en congé : personne ne teste vraiment. Et la clôture annuelle tournerait sur une version neuve, en plein bilan."
    ],
    retenir: "Une montée de version se place hors clôture, après un test du métier sur une copie : jamais en janvier."
  },
  {
    id: "cp15-q32",
    dialecte: "Gestion de projet",
    q: "Octobre 2027. La PA rappelle que la version 1 de son connecteur ne sera plus maintenue après décembre. La version 2 est disponible depuis le printemps. Que fais-tu ?",
    choix: [
      "Tu demandes, au comité, de maintenir la version 1 un an de plus",
      "Rien avant décembre : la version 1 marche très bien",
      "Mi-novembre : jours d'intégrateur commandés, tests de la compta",
      "Tu passes en version 2 dès demain ; la compta la testera après"
    ],
    bonne: 2,
    pourquoi: [
      "Non. La PA maintient ses versions pour tous ses clients : elle refusera, ou le fera payer. Et tu ne fais que repousser.",
      "Non. En janvier, plus de correctif ni de support sur ta version, en pleine clôture annuelle. Le changement se prépare avant la fin.",
      "Oui. Le moment : hors clôture, avant la fin de la maintenance. L'intégrateur installe la version 2 : ses jours, sur une commande signée avant. Et la compta teste ses cas avant la mise en service.",
      "Non. Disponible chez la PA ne veut pas dire testée chez vous : sans commande, et testée après coup, une version mal paramétrée bloque vos factures."
    ],
    retenir: "Une version qui ne sera plus maintenue se remplace avant la fin : hors clôture, commande signée, tests du métier."
  },
  {
    id: "cp15-q33",
    dialecte: "Gestion de projet",
    q: "Mai : pilote, et gel des changements. La PA annonce une nouvelle version de son portail le 20 mai, pour tous ses clients. Un espace de test est ouvert. Que fais-tu ?",
    choix: [
      "Julie teste ses cas sur la version de test, avant le 20",
      "Tu demandes au DAF de lever le gel pour cette version",
      "Tu coupes l'accès au portail le 20, le temps de faire un test",
      "Tu demandes à la PA de la reporter : votre gel court jusqu'en juin"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Tu ne choisis pas la date, mais tu testes avant : les cas de Julie, sur un créneau vu avec sa cheffe. Un souci ? Un ticket avant le 20, et la compta est prévenue.",
      "Non. Le gel est votre règle interne : la version de la PA arrive avec ou sans lui. Il n'y a rien à lever, il y a à tester.",
      "Non. Couper le portail, c'est arrêter la réception des factures, qui est obligatoire. Et tu testerais après, au lieu d'avant.",
      "Non. Un service partagé change pour tous à sa date : ton contrat prévoit un préavis et un espace de test, pas un gel (module cp14). Ton gel vaut pour ton projet."
    ],
    retenir: "Un service en ligne change pour tous à sa date : tu ne la choisis pas, tu testes avant, dans l'espace de test."
  },
  {
    id: "cp15-q34",
    dialecte: "Gestion de projet",
    q: "La cheffe comptable veut retrouver, en spécifique, son ancien état Excel des factures à valider : 4 jours, sur l'enveloppe des écrans. Le standard Divalto donne les mêmes données, présentées autrement. Que fais-tu ?",
    choix: [
      "Le standard, sans débat : un spécifique coûte toujours trop",
      "Tu lui montres le standard avec Julie, et le coût du spécifique",
      "Le spécifique : c'est elle qui classe, c'est dans l'enveloppe",
      "Tu chiffres les deux, et le DAF choisit au prochain COPIL"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Tu tranches à sa place, et « sans débat » ne la convaincra pas. Un spécifique se justifie parfois : c'est à elle de choisir, en connaissant le coût.",
      "Oui. Souvent, le standard couvre le besoin, présenté autrement. Tu le lui montres, avec Julie qui l'utilisera, et le vrai coût du spécifique, version après version. Dans l'enveloppe, c'est elle qui choisit, en connaissant ce prix.",
      "Non. Elle classe, oui ; mais elle doit savoir que le standard a les mêmes données, et que le spécifique se repaiera à chaque montée de version.",
      "Non. Dans l'enveloppe, c'est elle qui classe, sans le DAF. Monter un choix d'état au COPIL fait perdre du temps à tout le monde."
    ],
    retenir: "Avant un spécifique, montre le standard : il couvre souvent le besoin. Le métier choisit en connaissant le coût, version après version."
  },
  {
    id: "cp15-q35",
    dialecte: "Gestion de projet",
    q: "Octobre 2027. Le connecteur standard de la PA couvre 95 % des factures. Le reste, environ 400 par mois, Sophie le dépose à la main : 2 jours par mois. La feuille de route de la PA ne prévoit rien pour ce reste. L'intégrateur propose un spécifique : 6 jours, puis environ 1 jour par montée de version. Que recommandes-tu au DAF ?",
    choix: [
      "Le spécifique : 6 jours, et un par version, contre 24 jours par an",
      "Le dépôt à la main : le standard d'abord, toujours",
      "Attendre une version de la PA qui couvre aussi ces factures",
      "Un spécifique de 6 jours, codé par la DSI, et relu par l'intégrateur"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Ici, le spécifique se justifie : 6 jours, plus 1 par version, contre 24 jours de Sophie par an, et moins d'erreurs. Fait en surcharge (à part du standard), documenté. Le DAF décide (module cp10).",
      "Non. Le standard d'abord, oui, mais pas « toujours » : 24 jours de saisie par an coûtent plus qu'un petit spécifique, versions comprises. Le choix se fait sur les chiffres.",
      "Non. Sa feuille de route ne prévoit rien : attendre, c'est payer 2 jours par mois, sans date de fin.",
      "Non. Codé par la DSI, dans le Divalto que l'intégrateur paramètre : une relecture ne le rend pas responsable. Personne ne le suit aux versions, et il peut ne plus répondre du reste."
    ],
    retenir: "Un spécifique se justifie quand il rapporte plus qu'il ne coûte, versions comprises. Alors : à part du standard, et documenté."
  },
  {
    id: "cp15-q36",
    dialecte: "Gestion de projet",
    q: "Tu es DSI adjoint. Votre Divalto compte 25 spécifiques. À la dernière montée de version, l'intégrateur a passé 15 jours à les adapter. 6 ne servent plus. Que fais-tu ?",
    choix: [
      "Tu gardes les 25 : ils ont été payés, y compris les 6",
      "Tu supprimes les 6, et tu vois si le standard remplace les autres",
      "Plus de montée de version : c'est bien trop cher à chaque fois",
      "Tu arrêtes les 25, et tu remets tout au standard en un seul projet"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Payés une fois, ils coûtent encore à chaque version : 6 spécifiques inutiles, c'est du temps d'adaptation pour rien.",
      "Oui. Un spécifique inutile se supprime. Pour les autres, tu vérifies si le standard actuel fait la même chose : chaque retour au standard allège les prochaines versions.",
      "Non. Une version finit par ne plus être maintenue : bloquer les montées de version, c'est perdre corrections et support, et payer un saut plus gros plus tard.",
      "Non. Certains spécifiques se justifient encore : tout arrêter et tout refaire d'un coup, c'est un gros projet, pour rien sur ceux-là. On trie d'abord."
    ],
    retenir: "Fais l'inventaire des spécifiques : supprime ceux qui ne servent plus, remplace par le standard ce qui peut l'être."
  },
  {
    id: "cp15-q37",
    dialecte: "Gestion de projet",
    q: "Autre projet de la DSI : un tableau Power BI des ventes, lu dans les vues SQL de Divalto. Il manque un champ. Le consultant propose de l'ajouter dans le script standard des vues. Que demandes-tu ?",
    choix: [
      "Que Divalto ajoute ce champ dans sa vue standard, pour vous",
      "Une vue à part, qui reprend la vue standard et ajoute le champ",
      "D'accord : modifier le script standard, c'est le plus rapide",
      "Que Power BI lise les tables en direct, et laisse les vues de côté"
    ],
    bonne: 1,
    pourquoi: [
      "Non. L'éditeur ne change pas sa vue standard pour un client. La solution existe déjà : une vue à toi, à part.",
      "Oui. Divalto recommande une « vue de vue » : un script à part (noms en _VU) qui reprend la vue standard et ajoute le champ. Le standard reste intact à chaque version.",
      "Non. Divalto le déconseille : à une montée de version, le script standard change, et ta modification est difficile à retrouver. Elle se perd.",
      "Non. Divalto recommande les vues, pas les tables en direct : elles changent d'une version à l'autre (en X.10, des champs de SOC ont été regroupés). Le rapport casse sans prévenir."
    ],
    retenir: "Ne modifie jamais le standard d'un éditeur : ajoute à part (une « vue de vue » chez Divalto), pour passer les versions sans perte."
  },
  {
    id: "cp15-q38",
    dialecte: "Gestion de projet",
    q: "Janvier. Le planning de l'intégrateur prévoit de paramétrer les statuts de facture le 20 février. La PA livrera la liste de ses statuts avec le connecteur, le 1er mars. Que fais-tu ?",
    choix: [
      "L'intégrateur paramètre le 20, au jugé, et teste en mars",
      "Tu demandes au DAF des pénalités de retard pour la PA",
      "Tu cales les deux dates avec eux, dans un planning commun",
      "Rien : chacun son planning, ils s'arrangeront entre eux"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Paramétrer sans la liste, c'est payer deux fois : une au jugé, une pour corriger après les tests. Et la correction tombe en recette.",
      "Non. La liste arrive avec le connecteur, à la date du contrat : il n'y a pas de retard. Il y a deux plannings à caler, et c'est ton travail.",
      "Oui. La livraison de l'un est l'entrée de l'autre : tu obtiens la liste plus tôt, ou tu décales la tâche. Puis tu mets le planning commun à jour.",
      "Non. Personne d'autre ne voit la frontière : le 20 février, l'intégrateur n'aura rien à paramétrer, et ses jours seront payés quand même."
    ],
    retenir: "Plusieurs prestataires : la livraison de l'un est l'entrée de l'autre. Tu cales leurs dates dans un planning commun."
  },
  {
    id: "cp15-q39",
    dialecte: "Gestion de projet",
    q: "Tu es DSI adjoint. Prochain projet : un WMS (logiciel d'entrepôt), avec un éditeur, un intégrateur et un fournisseur de matériel. Ta DSI n'a pas le temps de les coordonner. Que proposes-tu ?",
    choix: [
      "L'éditeur coordonne : c'est son logiciel, il sait faire",
      "Rien : ils ont l'habitude, ils se coordonneront entre eux",
      "Tu coordonnes toi-même, et tu gardes tes projets en cours",
      "Un ensemblier, payé et écrit au contrat ; tu le pilotes"
    ],
    bonne: 3,
    pourquoi: [
      "Non. L'éditeur n'est pas payé pour piloter l'intégrateur ni le matériel : il ne le fera pas, et n'en répondra pas.",
      "Non. Chacun pilote sa part, personne la frontière : les retards de l'un tombent sur l'autre, et tu les découvres trop tard.",
      "Non. Coordonner sans temps, c'est mal le faire : le WMS et tes projets en cours paient. Garder la main se peut, avec du temps prévu pour ça.",
      "Oui. Un ensemblier coordonne les autres et répond du tout, si son contrat le dit. Il coûte plus cher ; certaines DSI préfèrent garder la main. Toi, tu pilotes l'ensemblier : un seul interlocuteur."
    ],
    retenir: "Plusieurs prestataires : le client coordonne, ou il paie un ensemblier, rôle écrit au contrat, qu'il pilote."
  },
  {
    id: "cp15-q40",
    dialecte: "Gestion de projet",
    q: "Fin avril. Le consultant de l'intégrateur a livré son paramétrage en avance. La recette n'a trouvé aucune anomalie bloquante. Que fais-tu ?",
    choix: [
      "Un merci à l'oral, au point hebdo, avec les faits",
      "Tu lui fais offrir 2 jours de plus sur la commande, en prime",
      "Un écrit à lui, son responsable en copie, avec les faits",
      "Rien de spécial : il est payé pour faire du bon travail"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Presque : il l'entend, faits compris, mais son responsable ne le sait pas, et rien n'est écrit pour le bilan fournisseur.",
      "Non. Des jours en remerciement : ce n'est ni ton budget, ni ta décision. En régie, un jour se paie pour un travail.",
      "Oui. Exigeant et juste : tu reconnais le bon travail comme tu signales un écart, par écrit, faits en main. Son responsable le voit, et le bilan s'en nourrit.",
      "Non. Payé, oui ; mais le bon travail reconnu se répète. Et ce fait manquera au bilan fournisseur."
    ],
    retenir: "Exigeant et juste : le bon travail se reconnaît par écrit, faits en main, devant son responsable."
  },
  {
    id: "cp15-q41",
    dialecte: "Gestion de projet",
    q: "Juin. Le consultant est devenu un ami. Il te demande : « Valide mon relevé de jours sans le lire ce mois-ci, je suis débordé. » Que fais-tu ?",
    choix: [
      "Tu le lis avant de valider, comme toujours : 10 minutes",
      "Tu valides : six mois sans un seul écart, tu lui fais confiance",
      "Tu demandes un autre consultant, plus distant, à l'intégrateur",
      "Tu le signales au DAF : ça cache peut-être quelque chose"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Ni ami, ni ennemi : la règle reste la même pour tous. 10 minutes de lecture, sans soupçon, et le relevé est validé avant la facture.",
      "Non. L'amitié ne change pas le contrôle : le relevé valide ce que l'entreprise paie. Le jour où il y a une erreur, elle est déjà payée.",
      "Non. Bien s'entendre n'est pas un problème ; oublier la règle en serait un. Rien ne justifie de le changer.",
      "Non. Une demande pressée n'est pas une fraude : tu le soupçonnes sans aucun fait. Lire le relevé suffit."
    ],
    retenir: "Ni ami ni ennemi : avec un prestataire sympathique, le contrôle reste le même, sans soupçon."
  },
  {
    id: "cp15-q42",
    dialecte: "Gestion de projet",
    q: "Après ton passage chez son responsable de compte, le chef de projet de la PA est froid avec toi. Le commercial te dit : « Maintenant, passe toujours par son chef. » Que fais-tu ?",
    choix: [
      "Tu passes par son responsable de compte, au prochain comité",
      "Tu continues avec lui : comité, plan daté, faits",
      "Tu demandes à la PA de le remplacer par quelqu'un d'autre",
      "Tu t'excuses auprès de lui d'être monté chez son chef"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Tu court-circuites ton interlocuteur pour de bon : il ne te dira plus rien, et son responsable n'a pas le temps du quotidien.",
      "Oui. Escalader n'est pas punir : c'était pour débloquer, pas contre lui. Tu continues à travailler avec lui, sur les faits et le plan daté.",
      "Non. Il n'a commis aucune faute : il est froid. Demander son départ, c'est punir, et perdre celui qui connaît ton dossier.",
      "Non. Monter était justifié, et tu l'avais prévenu : t'excuser dit que ta démarche était une faute. Tu peux expliquer, sans t'excuser."
    ],
    retenir: "Escalader n'est pas punir : après, tu continues avec ton interlocuteur habituel, sur les faits."
  },
  {
    id: "cp15-q43",
    dialecte: "Gestion de projet",
    q: "Juillet 2027. La bascule est faite. Avant de clôturer le projet, que fais-tu avec la PA et l'intégrateur ?",
    choix: [
      "Une note sur 20 pour chacun, envoyée au DG, sans la leur montrer",
      "Rien de plus : le projet finit, la relation passe au support",
      "Un bilan écrit pour chacun, partagé avec eux, gardé pour la suite",
      "Un bilan pour la PA seulement : c'est elle qui a eu du retard"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Une note sans faits, cachée aux intéressés : ils ne peuvent ni progresser, ni répondre. Et le DG n'en a pas l'usage.",
      "Non. Ce que tu as appris (délais, qualité, SLA, relation) disparaît avec le projet. Au prochain choix, personne ne s'en souviendra.",
      "Oui. Un bilan par fournisseur : délais, qualité, SLA, relation, avec les faits. Partagé, il les fait progresser ; gardé, il nourrit le prochain choix (module cp13).",
      "Non. Presque : le bilan est utile, mais pour chacun. Le bon travail de l'intégrateur compte autant que le retard de la PA."
    ],
    retenir: "En fin de projet, un bilan écrit par fournisseur, partagé avec lui : il nourrit le prochain choix."
  },
  {
    id: "cp15-q44",
    dialecte: "Gestion de projet",
    q: "Tu es DSI adjoint. La DSI a 15 fournisseurs. Tu ne peux pas tenir 15 comités par mois. Comment répartis-tu ton suivi ?",
    choix: [
      "Un comité par mois pour chacun, de 30 minutes seulement",
      "Selon leur criticité : comité mensuel, ou revue annuelle",
      "Aucun comité : tu les vois quand il y a un problème",
      "Selon le montant de leurs factures : comité mensuel, ou revue annuelle"
    ],
    bonne: 1,
    pourquoi: [
      "Non. 15 comités par mois, même courts : 7 h 30 de réunions, sans les comptes rendus. Le temps manque pour ceux qui comptent vraiment.",
      "Oui. Un fournisseur critique (sa panne arrête l'activité, comme la PA) a son comité mensuel. Les autres, une revue par an : contrat, coût, incidents, préavis.",
      "Non. Sans rendez-vous, tu découvres les problèmes quand ils arrivent, et les dates de préavis passent sans décision.",
      "Non. Presque : le coût compte, mais un fournisseur peu cher peut être critique. Un abonnement modeste, comme la PA, peut bloquer toutes les factures."
    ],
    retenir: "Suivi des fournisseurs selon leur criticité : comité mensuel pour ceux dont la panne arrête l'activité, revue annuelle pour les autres."
  }
];
