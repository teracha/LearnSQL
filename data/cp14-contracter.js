// Chef de projet SI — Questions du module cp14 « Contracter ».
// Fond (niveau praticien, pas juriste) : forfait (prix fixe pour un résultat défini, dérapage pour le prestataire,
// ajout = avenant, garantie après le PV), régie (temps passé, plafond de jours, risque chez le client, pas de garantie
// en général), abonnement / SaaS (un service qui évolue pour tous : SLA, données, sortie). Les pièces et leur ordre de
// priorité. Ce que le chef de projet relit et écrit : livrables, planning et obligations du client, recette et PV
// (réserves ou refus), délai de validation (recette tacite), paiement au PV, SLA mesurables et leurs exclusions,
// réversibilité, spécifique, durée et préavis. Ce que porte le DAF : signature, prix, pénalités, responsabilité, droit
// applicable (avec un avocat si besoin). RGPD : prestataire = sous-traitant, à faire vérifier par le DPO.
// Fil rouge DEMAT 2027 (fiche fil rouge de docs/plan-chef-de-projet.md, qui fait foi), ligne « Contrats (module cp14) » :
// PA = abonnement signé en novembre 2026 par le DAF (connecteur au 1er mars, pénalités plafonnées, SLA, plan B par le
// portail, réversibilité) ; intégrateur Divalto = régie, commande en jours (environ 750 € par jour) signée par le DAF ;
// des jours en plus = une nouvelle commande, signée avant de commencer. Le 15 mars est le déclencheur du plan B, pas une
// date du contrat. Aucun montant d'amende ni de pénalité. q02 à q04 : un autre projet de la DSI, au forfait.
// q35 et q36 : « Tu es DSI adjoint », en 2029.
// Faits ajoutés (scénarios, à valider) : données de paramétrage dues à la PA le 15 janvier (q18, q30) ; contrat de la PA
// de 3 ans, reconduit d'année en année, préavis de 6 mois (q34 à q36) ; PV ou réserves au 10 mai (q28) ; option
// d'archivage ajoutée en mars (q31) ; support de la PA de 8 h à 18 h (q29, comme l'annexe SLA du cours).
// Déjà publiées ailleurs, pas reprises ici : cp01-q16 et q17, cp04-q35 et q40, cp06-q29 et q30, cp07-q12, q13 et q21,
// cp10-q05 et q07, cp16-q36 et q39, cp18-q30, q32 et q33. Circuit d'une demande de changement : cp10. Démarche : cp06.
// Suivi des SLA et comités fournisseurs : cp15.
// Anti-devinette : la bonne réponse est un extrême dans 9 questions sur 40 : l'action la plus douce qui suffit (q07, q34,
// q39, q40), la plus forte quand elle se justifie (q02, q19, q25, q27), la date du contrat (q24). Un choix faux
// « presque juste » au même niveau dans environ la moitié des questions. « contrat », « avenant », « PV », « SLA », « DAF »,
// « avocat », des chiffres et des dates sont aussi dans des choix faux.
LEARNSQL.questions.cp14 = [
  {
    id: "cp14-q01",
    dialecte: "Gestion de projet",
    q: "Novembre 2026. Le DAF va signer la commande de l'intégrateur, en régie. Il te dit : « Comme ça, s'il dérape, c'est pour lui. » Que lui réponds-tu ?",
    choix: [
      "« Non : c'est pour nous. Je suivrai ses jours chaque semaine »",
      "« Oui : en régie, il s'engage sur un résultat, pas sur des jours »",
      "« Non : c'est pour nous. À toi de suivre ses jours chaque semaine »",
      "« Non : ajoutons une pénalité de dérapage dans la commande »"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. En régie, il vend du temps : chaque jour en plus est facturé. Le dérapage est pour vous, et ton outil, c'est le suivi des jours consommés et du reste à faire.",
      "Non. C'est l'inverse : en régie, il s'engage sur des jours, pas sur un résultat. Un retard se paie en jours de plus.",
      "Non. Presque : le dérapage est bien pour vous, mais suivre les jours, c'est ton travail. Le DAF reçoit l'alerte quand ça dérive, pas le suivi.",
      "Non. En régie, il vend du temps : une pénalité de dérapage n'a pas de sens, il la refusera ou montera son taux. Ton levier : le plafond de jours, et leur suivi."
    ],
    retenir: "En régie, le dérapage est pour toi : tu pilotes les jours consommés et le reste à faire."
  },
  {
    id: "cp14-q02",
    dialecte: "Gestion de projet",
    q: "Autre projet de la DSI, au forfait : le portail de commande des clients. En cours de route, les ventes ajoutent un écran de suivi des livraisons. Le prestataire : « Hors forfait : avenant de 6 jours. » Que fais-tu ?",
    choix: [
      "Tu refuses les 6 jours : au forfait, tout ajout est compris",
      "Tu portes les 6 jours au sponsor du projet, qui choisit",
      "Tu glisses l'écran dans la recette du projet, sans rien signer",
      "Tu signes l'avenant toi-même, puis tu informes le sponsor"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Le forfait couvre le résultat écrit, pas ce qu'on ajoute ensuite. Un nouvel écran sort du périmètre signé : il se paie.",
      "Oui. Au forfait, un ajout est un avenant chiffré. Le sponsor choisit en connaissant le prix (circuit : module cp10). S'il dit oui, le DAF signe l'avenant avant le travail.",
      "Non. Le prestataire ne le fera pas gratuitement : il le facturera, ou ne le livrera pas. Et la recette teste ce qui a été commandé, rien d'autre.",
      "Non. Presque : l'avenant est normal, mais ce n'est pas à toi de l'accepter ni de le signer. Le sponsor choisit d'abord, puis le DAF signe."
    ],
    retenir: "Au forfait, un ajout au périmètre est un avenant : celui qui décide choisit en connaissant le prix."
  },
  {
    id: "cp14-q03",
    dialecte: "Gestion de projet",
    q: "Autre projet de la DSI, au forfait : un module de relances clients, périmètre signé. Le prestataire a passé 15 jours de plus que prévu, sans rien ajouter. Il facture ces 15 jours. Que fais-tu ?",
    choix: [
      "Tu fais payer : même au forfait, il a travaillé ces 15 jours",
      "Tu demandes au DAF de résilier le contrat pour abus",
      "Tu réponds, contrat en main : ils sont dans le forfait",
      "Tu proposes de partager le coût : 7 jours pour lui, 8 pour vous"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Au forfait, le prix couvre le résultat signé, quels que soient les jours passés. Tu paies un risque qu'il avait pris.",
      "Non. Une facture contestable n'est pas un abus : tu réponds, pièces en main. Résilier en cours de projet coûte bien plus que 15 jours.",
      "Oui. Même périmètre, même résultat : le dépassement est pour lui, c'est le principe du forfait. Tu le lui écris, et le DAF, qui paie, le sait.",
      "Non. Un compromis sur une facture qui n'est pas due : tu offres 8 jours, et le prochain dépassement prendra le même chemin."
    ],
    retenir: "Au forfait, sans ajout au périmètre, les jours en trop sont pour le prestataire."
  },
  {
    id: "cp14-q04",
    dialecte: "Gestion de projet",
    q: "Autre projet de la DSI, au forfait : le PV de recette est signé le 1er juin, avec 3 mois de garantie. Le 15 juillet, un défaut apparaît. Le prestataire envoie un devis pour le corriger. Que fais-tu ?",
    choix: [
      "Tu acceptes le devis : le PV est signé, le forfait est soldé",
      "Tu fais corriger le défaut par la DSI, pour aller vite",
      "Tu demandes au DAF de faire jouer des pénalités",
      "Tu demandes la correction sans frais, contrat en main"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Le PV ouvre la garantie, il ne la ferme pas : pendant 3 mois, un défaut se corrige sans frais. Tu paierais ce que le contrat couvre déjà.",
      "Non. La DSI touche à un livrable sous garantie : en général, la garantie ne couvre plus ce qu'un autre a modifié. Et tu paies ce temps-là.",
      "Non. Il n'y a pas de retard à punir : un défaut sous garantie se fait corriger, c'est tout. Des pénalités ne le corrigeraient pas.",
      "Oui. Au forfait, un défaut trouvé pendant la garantie se corrige sans frais. Tu le signales par écrit, contrat en main, avant la fin des 3 mois."
    ],
    retenir: "Au forfait, la garantie court après le PV : un défaut trouvé pendant sa durée se corrige sans frais, contrat en main."
  },
  {
    id: "cp14-q05",
    dialecte: "Gestion de projet",
    q: "Novembre. Projet de contrat de la PA : « Le service évolue librement, pour tous les clients. » Ta bascule est en juin. Que demandes-tu avant la signature ?",
    choix: [
      "Un préavis avant chaque évolution, plus un espace de test",
      "Une clause : aucune évolution jusqu'au 1er septembre 2027",
      "L'avis de l'avocat sur cette clause, avant de signer",
      "Un appel de la PA la veille de chaque nouvelle version"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Un service partagé évolue pour tous : tu ne l'arrêtes pas. Tu demandes le temps de tester avant : un préavis écrit et un espace de test.",
      "Non. La PA fait évoluer un service commun à tous ses clients : elle ne le gèlera pas pour toi. Et certaines évolutions corrigent des défauts.",
      "Non. C'est une clause de service, pas de droit : elle est à toi. L'avocat ne sait pas quand tu bascules, ni ce qu'il faut tester.",
      "Non. Prévenu la veille, tu n'as pas le temps de tester : une nouvelle version la semaine de ta bascule passerait sans test."
    ],
    retenir: "Un abonnement évolue pour tous les clients : tu demandes un préavis et un espace de test, pas un gel."
  },
  {
    id: "cp14-q06",
    dialecte: "Gestion de projet",
    q: "Fin janvier. L'intégrateur, en régie, facture 9 jours pour le mois. Ton suivi n'en montre que 6 : 3 jours sans tâche visible. Le DAF doit payer la facture. Que fais-tu ?",
    choix: [
      "Tu la laisses payer : en régie, il facture ce qu'il dit",
      "Tu lui demandes le détail des 3 jours, avant de les faire payer",
      "Tu demandes au DAF de bloquer toutes ses factures",
      "Ton suivi en main, tu fais payer 6 jours, et tu refuses les 3 autres"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Régie ne veut pas dire chèque en blanc : tu paies le temps passé, pas le temps déclaré. Sans contrôle, l'écart se répète.",
      "Oui. Des faits d'abord : dates, tâches, personnes. Ces 3 jours sont peut-être réels (analyse, réunion), ou une erreur. Les 6 jours suivis peuvent être payés ; les 3 autres, une fois expliqués.",
      "Non. Un écart de 3 jours se vérifie en une réunion. Bloquer toutes ses factures, c'est punir avant de savoir, et risquer l'arrêt du paramétrage.",
      "Non. Presque : payer les 6 jours suivis, oui. Mais refuser les 3 autres, c'est trancher avant de savoir : s'il a vraiment travaillé, ils lui sont dus."
    ],
    retenir: "En régie, tu paies le temps passé, pas le temps déclaré : un écart se vérifie avant de payer ces jours-là."
  },
  {
    id: "cp14-q07",
    dialecte: "Gestion de projet",
    q: "Juillet 2027. Un écran de suivi de la compta, fait en régie, a un défaut. L'intégrateur propose de le corriger en 1 jour, sur une nouvelle commande. Le DAF : « Ce n'est pas sous garantie ? » Que réponds-tu ?",
    choix: [
      "« Si : un défaut est toujours sous garantie, on ne paie pas »",
      "« En régie, sans garantie prévue dans la commande, on paie »",
      "« On paie, et on change d'intégrateur à la fin de la régie »",
      "« Je demande à l'avocat s'il y a un vice caché »"
    ],
    bonne: 1,
    pourquoi: [
      "Non. En régie, tu paies le temps passé, corrections comprises. Une garantie existe si la commande l'écrit, pas d'office.",
      "Oui. En général, la régie n'a pas de garantie : le risque est chez vous. Si la commande en prévoit une, elle s'applique ; sinon, ce jour se paie, sur une commande signée avant.",
      "Non. Un défaut corrigé en 1 jour ne justifie pas de changer d'intégrateur. En régie, le bon réflexe : tester tôt, pour trouver les défauts avant.",
      "Non. Un jour de correction ne relève pas de l'avocat : la réponse est dans la commande, et la relire suffit."
    ],
    retenir: "En régie, en général, pas de garantie (sauf clause) : une correction se paie en jours, sur une commande signée avant."
  },
  {
    id: "cp14-q08",
    dialecte: "Gestion de projet",
    q: "Novembre. La réception des factures est déjà en retard. Le DAF est en déplacement toute la semaine. La PA te dit : « Signez, vous êtes le chef de projet, ça ira plus vite. » Que fais-tu ?",
    choix: [
      "Tu signes : tu connais le contrat mieux que personne",
      "Tu demandes au DG de signer à la place du DAF, cette semaine",
      "Tu envoies le contrat au DAF, à signer à distance",
      "Tu signes, et le DAF contresigne à son retour"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Tu n'as pas le pouvoir d'engager l'entreprise : c'est le DAF qui signe. Ta signature peut être contestée, et tu engages des années d'abonnement à sa place.",
      "Non. Passer au-dessus du DAF pour une signature qu'il peut faire à distance : il se sent contourné, pour gagner quelques heures.",
      "Oui. Le DAF signe, même en déplacement : une signature à distance prend quelques minutes. Tu lui dis ce qui presse, avec tes remarques sur les clauses.",
      "Non. Presque : il signera, mais après toi. Pendant une semaine, le contrat repose sur une signature sans pouvoir : il peut être contesté."
    ],
    retenir: "Le DAF signe les contrats, même pressé ou absent : tu organises sa signature, tu ne signes pas à sa place."
  },
  {
    id: "cp14-q09",
    dialecte: "Gestion de projet",
    q: "Fin février. La commande de l'intégrateur est épuisée depuis 2 semaines. Sa facture montre 2 jours de plus, faits sans nouvelle commande : « C'était pour finir le paramétrage. » Que fais-tu ?",
    choix: [
      "Tu la fais payer : le travail est fait, et il était utile",
      "Tu signes toi-même une commande de 2 jours, au prix prévu",
      "Tu refuses de payer, et tu demandes un autre consultant",
      "Tu le recadres, et le DAF décide de payer ou non ces 2 jours"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Des jours faits hors commande, payés sans décision : la règle « une commande avant chaque jour en plus » ne vaut plus rien, et ça recommencera.",
      "Non. Presque : il faut bien une décision sur ces 2 jours, mais c'est le DAF qui engage l'entreprise. Tu prépares, tu ne signes pas.",
      "Non. C'est la plus grosse solution : tu perds le seul consultant qui connaît le paramétrage. Tu le recadres, et le DAF décide pour ces 2 jours.",
      "Oui. Deux choses : le recadrer (plus aucun jour sans commande signée avant), et laisser le DAF décider de ces 2 jours, sur les faits."
    ],
    retenir: "En régie, aucun jour sans commande signée avant. Des jours déjà faits hors commande : tu recadres, et le DAF décide."
  },
  {
    id: "cp14-q10",
    dialecte: "Gestion de projet",
    q: "Novembre. Le projet de commande de l'intégrateur dit : « Paramétrage du connecteur, en régie, au taux journalier. » Aucun plafond de jours. Le DAF va la signer. Que vérifies-tu ?",
    choix: [
      "Qu'il donne une estimation chiffrée, pour info",
      "Qu'elle décrit la mission, avec un plafond de jours",
      "Que le prix de ses jours est le plus bas du marché",
      "Qu'elle passe au forfait, pour connaître le prix total"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Presque : une estimation « pour info » n'engage personne. Sans plafond écrit dans la commande, chaque jour en plus est facturé.",
      "Oui. La commande dit ce qu'il fait (installer et paramétrer le connecteur) et jusqu'à combien de jours. Au-delà, une nouvelle commande, signée avant.",
      "Non. Le prix d'une journée compte, mais un bon taux sans plafond ne protège rien : c'est le nombre de jours qui dérape.",
      "Non. Ce qui manque n'est pas un autre type de contrat, c'est un plafond : une régie plafonnée donne aussi un prix maximum."
    ],
    retenir: "Une commande en régie décrit la mission et fixe un plafond de jours : sans plafond, c'est un chèque en blanc."
  },
  {
    id: "cp14-q11",
    dialecte: "Gestion de projet",
    q: "Novembre. Les conditions générales (CG) de l'intégrateur, jointes au devis : « Un dépassement jusqu'à 10 % des jours est facturé sans accord. » Ta future commande dit : « jours en plus = nouvelle commande ». Que fais-tu ?",
    choix: [
      "Tu écris le risque, et tu suivras les jours de la commande",
      "Tu demandes au DAF de changer d'intégrateur pour ça",
      "Tu fais écrire que la commande passe en premier",
      "Tu acceptes les 10 % : une petite marge, c'est l'usage"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Écrire le risque et suivre les jours ne règle pas la contradiction. Le jour du dépassement, il montrera ses CG : un litige sur 10 % de jours.",
      "Non. Une ligne des CG se négocie avant la signature : changer d'intégrateur pour ça, c'est relancer toute la consultation.",
      "Oui. Deux pièces se contredisent : la clause d'ordre de priorité tranche. Tu la fais écrire avant de signer (la commande avant les CG), ou tu fais retirer la ligne des CG.",
      "Non. 10 % de jours sans accord, c'est un budget qui grossit sans décision. Et ta règle, une commande avant chaque jour en plus, ne tient plus."
    ],
    retenir: "Deux pièces se contredisent : ne suppose pas laquelle prime. Fais écrire l'ordre de priorité avant de signer."
  },
  {
    id: "cp14-q12",
    dialecte: "Gestion de projet",
    q: "Novembre. En réunion, le commercial de la PA assure : « Notre connecteur gère aussi les avoirs. » Ni le devis ni les annexes n'en parlent. Le DAF signe vendredi. Que fais-tu ?",
    choix: [
      "Tu lui fais confiance : il l'a dit devant témoins",
      "Tu demandes au DAF de reporter la signature d'un mois",
      "Tu le fais écrire dans l'annexe du périmètre",
      "Tu l'écris dans le compte rendu, envoyé à la PA"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Une parole se prouve mal, même devant témoins, et le contrat dit souvent que seul l'écrit compte. Le jour où les avoirs bloquent, tu n'as rien à montrer.",
      "Non. Une ligne à ajouter ne justifie pas un mois de retard, alors que la réception est déjà en retard.",
      "Oui. Écrite dans l'annexe signée, la promesse engage la PA : tu pourras l'exiger. Une ligne suffit, et la signature de vendredi tient.",
      "Non. Presque : c'est écrit, mais pas dans le contrat. Un compte rendu n'engage pas la PA comme une annexe signée."
    ],
    retenir: "Une promesse orale se prouve mal : fais-la écrire en annexe, avant la signature."
  },
  {
    id: "cp14-q13",
    dialecte: "Gestion de projet",
    q: "Novembre. Projet de contrat de la PA : « Portail web de secours : en option, sur devis. » C'est ton plan B si le connecteur n'est pas livré au 15 mars. Que fais-tu ?",
    choix: [
      "Tu fais inclure le portail et son prix, dès maintenant",
      "Tu demandes dès maintenant un devis du portail, pour info",
      "Tu fais chiffrer un export de secours par l'intégrateur",
      "Tu demandes au DAF de refuser un portail qui n'est pas gratuit"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Le plan B se prépare à froid, avant la signature : le portail inclus, le prix connu, les conditions écrites. Le 15 mars, il part seul, sans nouvelle négociation.",
      "Non. Presque : tu connais le prix, mais un devis « pour info » n'engage pas la PA. En mars, il aura changé, ou expiré : le plan B ne part pas seul.",
      "Non. Tu prépares un développement en régie pour un secours que la PA fournit déjà : du coût, et un outil de plus à tester.",
      "Non. Gratuit n'est pas le sujet : ce qui compte, c'est un prix connu d'avance. Bloquer pour ça retarde encore la réception."
    ],
    retenir: "Un plan B qui dépend du prestataire s'écrit au contrat avant la signature, avec son prix : il doit pouvoir partir seul."
  },
  {
    id: "cp14-q14",
    dialecte: "Gestion de projet",
    q: "Novembre. Annexe SLA (niveau de service) du projet de contrat de la PA : « La PA fait ses meilleurs efforts pour une haute disponibilité. » Que fais-tu ?",
    choix: [
      "Rien : « haute disponibilité », c'est déjà un engagement",
      "Tu demandes à l'avocat de réécrire ce SLA, avant signature",
      "Tu demandes à la PA ses chiffres de disponibilité, pour info",
      "Tu fais mettre des chiffres : taux, délais, heures, mesure"
    ],
    bonne: 3,
    pourquoi: [
      "Non. « Haute » ne se mesure pas : après une panne de 2 jours, la PA dira qu'elle a fait de son mieux. Tu n'as rien à exiger.",
      "Non. Le niveau de service est une clause opérationnelle : c'est la tienne. L'avocat ne sait pas ce dont la compta a besoin, ni quand.",
      "Non. Presque : ses chiffres passés t'informent, mais ne l'engagent pas. Sans chiffres écrits dans le SLA, tu n'as toujours rien à exiger.",
      "Oui. « Meilleurs efforts » ne se mesure pas. Un SLA se mesure : un taux de disponibilité par mois, des délais de prise en charge et de rétablissement, des heures, qui mesure."
    ],
    retenir: "Un SLA s'exige s'il se mesure : un chiffre, une période, des heures, et qui mesure. Il s'écrit avant la signature."
  },
  {
    id: "cp14-q15",
    dialecte: "Gestion de projet",
    q: "Annexe SLA de la PA, avant signature : « Disponibilité 99,5 % par mois, hors maintenances annoncées 24 h avant, à toute heure. » Ta clôture mensuelle prend 5 jours ouvrés. Que fais-tu ?",
    choix: [
      "Tu demandes à être prévenu des maintenances par mail",
      "Tu fais exiger un SLA de 100 %, même pendant la clôture",
      "Tu fais mettre les maintenances la nuit, jamais en clôture",
      "Tu demandes au DAF de chercher une autre PA, plus fiable"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Être prévenu ne change rien si la maintenance tombe en pleine clôture : c'est le moment des maintenances qu'il faut encadrer.",
      "Non. Aucun service n'est disponible à 100 % : la PA refusera, ou le fera payer très cher. Le vrai risque, ce sont les maintenances pendant ta clôture.",
      "Oui. Le chiffre compte moins que ses exclusions : 99,5 % par mois, c'est environ 3 h 30 de panne, maintenances non comptées. Tu les fais placer la nuit ou le week-end, jamais pendant les 5 jours de clôture.",
      "Non. Une clause se négocie avant de signer : changer de PA pour ça relance tout le choix, alors que la réception est déjà en retard."
    ],
    retenir: "Lis les exclusions d'un SLA : une maintenance « hors disponibilité » peut tomber en pleine clôture."
  },
  {
    id: "cp14-q16",
    dialecte: "Gestion de projet",
    q: "Novembre. Projet de contrat de la PA : « Sans réserve écrite 5 jours après la livraison, le connecteur est accepté. » Ta recette dure 6 semaines, à partir du 16 mars. Que fais-tu ?",
    choix: [
      "Tu prévois de tester le connecteur en 5 jours, dès le 1er mars",
      "Tu fais courir le délai après ta recette",
      "Tu prévois d'envoyer des réserves chaque semaine, par principe",
      "Tu fais retirer du contrat toute date limite de recette"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Presque : tu testes vite, mais en 5 jours tu vois qu'il s'installe, pas qu'il marche sur tes cas. Ta vraie recette commencerait après l'acceptation.",
      "Oui. Le délai de validation doit tenir avec ta recette : l'acceptation, c'est le PV signé après tes 6 semaines de tests, pas le silence 5 jours après la livraison.",
      "Non. Des réserves « par principe » ne règlent rien : la PA les contestera, et tu perds ta crédibilité pour les vraies.",
      "Non. La PA a droit à une date limite : sinon, rien n'est jamais accepté. Tu l'alignes sur ta recette, tu ne la supprimes pas."
    ],
    retenir: "Méfie-toi de la recette tacite : le délai de validation doit courir après ta recette, pas après la livraison."
  },
  {
    id: "cp14-q17",
    dialecte: "Gestion de projet",
    q: "Novembre. Échéancier de la mise en service du connecteur : 50 % à la signature, 50 % à la livraison, le 1er mars. Ta recette finit fin avril. Que proposes-tu ?",
    choix: [
      "Garder l'échéancier : payer à la livraison, c'est l'usage",
      "Le solde au PV de recette, pas à la livraison",
      "Tout payer après la bascule de juin, pas au PV de recette",
      "Une relecture de l'échéancier par l'avocat"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Au 1er mars, tout est payé, avant le moindre test : si la recette trouve un défaut, ton levier a disparu.",
      "Oui. Le paiement suit le travail accepté, pas le travail remis. Avec le solde au PV, la PA a intérêt à corriger vite pendant ta recette.",
      "Non. Le connecteur est accepté fin avril : attendre juin, c'est retenir le paiement d'un travail déjà accepté. Le PV de recette est le bon moment.",
      "Non. Un échéancier est une question de projet, pas de droit : c'est toi qui sais quand le connecteur sera livré, puis accepté."
    ],
    retenir: "Lie le solde au PV de recette (le travail accepté), pas à la livraison (le travail remis)."
  },
  {
    id: "cp14-q18",
    dialecte: "Gestion de projet",
    q: "Novembre. Contrat de la PA : « Le 1er mars suppose les données de paramétrage du client au plus tard le 15 janvier. » En janvier, la compta est en clôture annuelle. Que fais-tu avant la signature ?",
    choix: [
      "Tu fais confirmer la date par la compta, ou en changer",
      "Tu laisses : cette clause engage la PA, pas la compta",
      "Tu fais retirer du contrat toute date imposée au client",
      "Tu préviens la compta par écrit du 15 janvier, et tu signes"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Le contrat engage aussi le client : tu vérifies que la date est tenable avant de signer. Sinon, tu fais écrire une date possible, par exemple avant la clôture.",
      "Non. C'est aussi ton engagement : si les données partent le 20, le 1er mars ne tient plus, et les pénalités de retard non plus.",
      "Non. La PA ne peut pas livrer sans tes données : elle refusera. Le sujet n'est pas d'avoir une date, c'est qu'elle soit tenable.",
      "Non. La compta est prévenue, mais en pleine clôture annuelle, elle ne tiendra pas le 15. Il faut une date tenable écrite avant de signer, pas un rappel."
    ],
    retenir: "Le contrat liste aussi tes obligations : vérifie qu'elles sont tenables avant de signer. Si tu es en retard, sa date tombe, en général."
  },
  {
    id: "cp14-q19",
    dialecte: "Gestion de projet",
    q: "En relisant le projet de contrat de la PA, tu lis : « La responsabilité de la PA est limitée à un mois d'abonnement, quel que soit le dommage. » Que fais-tu ?",
    choix: [
      "Rien : c'est du juridique, pas ton sujet",
      "Tu barres la clause, et tu renvoies le contrat à la PA",
      "Tu fais exiger une responsabilité sans aucune limite",
      "Tu la signales au DAF, qui voit avec l'avocat"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Pas ton sujet à négocier, mais à signaler : tu l'as vue, le DAF doit le savoir avant de signer.",
      "Non. Tu modifies seul un contrat que tu ne signes pas : la PA ne sait plus qui négocie, et le DAF découvre ta rature.",
      "Non. Tu prends position sur une clause juridique : ce n'est pas ton rôle. Et presque aucun prestataire ne signe une responsabilité sans limite.",
      "Oui. La responsabilité est une clause juridique : le DAF la négocie, avec un avocat si besoin. Toi, tu la repères, et tu dis ce qu'une panne coûterait au projet."
    ],
    retenir: "Clause juridique (responsabilité, droit applicable) : tu la signales au DAF, qui la négocie avec un avocat si besoin."
  },
  {
    id: "cp14-q20",
    dialecte: "Gestion de projet",
    q: "Novembre. Devis de l'intégrateur, en petit : « Les développements spécifiques restent notre propriété. » Il fera des écrans Divalto pour la compta. Que fais-tu ?",
    choix: [
      "Tu demandes par mail qu'il livre les sources à la fin",
      "Rien : payés en régie, ils seront à toi",
      "Tu exiges la propriété de tout ton Divalto paramétré",
      "Tu fais écrire ton droit de les utiliser et les modifier"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Presque : avoir les sources aide, mais sans droit écrit de les modifier, un autre intégrateur risque de ne pas avoir le droit d'y toucher. Et un mail n'est pas une pièce signée.",
      "Non. En général, payer ne suffit pas : sans clause écrite, les droits restent au prestataire. Un autre intégrateur pourrait ne pas avoir le droit d'y toucher.",
      "Non. Divalto appartient à son éditeur : personne ne t'en donnera la propriété. Ce qui compte, c'est ton droit sur les écrans faits pour toi.",
      "Oui. Tu fais écrire que tu peux les utiliser, les modifier et les faire maintenir par un autre, sources livrées. Le DAF fait valider le texte, avec l'avocat si besoin."
    ],
    retenir: "Un développement spécifique payé n'est pas forcément à toi : fais écrire ton droit de l'utiliser, le modifier et le faire maintenir par un autre."
  },
  {
    id: "cp14-q21",
    dialecte: "Gestion de projet",
    q: "Novembre. Le projet de contrat de la PA ne dit rien des données personnelles. Les factures portent des noms et des e-mails de contacts, et certains clients sont des entrepreneurs individuels. Que fais-tu ?",
    choix: [
      "Tu demandes à la PA, par mail, si elle respecte le RGPD",
      "Tu écris toi-même une annexe RGPD, et tu la fais signer",
      "Tu le signales au DAF : il manque la clause RGPD",
      "Tu suspends le projet jusqu'à un audit complet de la PA"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Un « oui » par mail n'engage pas la PA : le RGPD demande que le contrat prévoie la sous-traitance, par écrit.",
      "Non. Tu rédiges seul un texte juridique que tu ne signes pas : il risque d'être incomplet, et la PA a souvent déjà le sien. Le DPO doit le vérifier.",
      "Oui. La PA traite ces données pour vous : c'est un sous-traitant au sens du RGPD, et le contrat doit le prévoir. Le DAF le fait ajouter, vérifié par le DPO ou le référent RGPD.",
      "Non. Une clause manquante se fait ajouter avant la signature : suspendre le projet ajoute du retard à une réception déjà en retard."
    ],
    retenir: "Un prestataire qui traite des données personnelles pour l'entreprise est un sous-traitant RGPD : le contrat doit le prévoir, vérifié par le DPO."
  },
  {
    id: "cp14-q22",
    dialecte: "Gestion de projet",
    q: "Novembre. Clause de réversibilité du projet de contrat de la PA : « En fin de contrat, export des données au format de la PA. » Que fais-tu ?",
    choix: [
      "Tu fais ajouter « export complet » à la clause",
      "Tu fais préciser quoi, sous quelle forme, délai, coût, aide",
      "Tu exiges par clause une copie de la base chaque nuit",
      "Tu fais relire la clause par l'avocat, avant la signature"
    ],
    bonne: 1,
    pourquoi: [
      "Non. « Complet » dit quoi, pas sous quelle forme : au format de la PA, un export complet reste illisible ailleurs, sans délai ni prix connus.",
      "Oui. Sortir, c'est tout récupérer : factures et statuts, dans un format standard (comme Factur-X), sous un délai, à un prix connu, avec une aide.",
      "Non. Tu demandes un dispositif coûteux pour un besoin de fin de contrat : une sortie bien écrite, et testée une fois, suffit.",
      "Non. La réversibilité est une clause opérationnelle : c'est toi qui sais quelles données il faut, et sous quelle forme. Pas l'avocat."
    ],
    retenir: "Une réversibilité utile dit quoi, dans quel format standard, sous quel délai, à quel coût, avec quelle aide."
  },
  {
    id: "cp14-q23",
    dialecte: "Gestion de projet",
    q: "Novembre. Chez l'intégrateur, un seul consultant connaît le paramétrage du connecteur. Sa commande en régie ne parle ni de lui, ni de documentation. Que fais-tu ajouter ?",
    choix: [
      "Son nom dans la commande, et rien de plus",
      "Une pénalité s'il part sans laisser de documentation",
      "La documentation, et une passation s'il change",
      "L'exclusivité du consultant sur DEMAT jusqu'en juin"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Presque : son nom dit qui travaille, pas ce qui se passe s'il part. Sans documentation ni passation, son savoir part avec lui.",
      "Non. Une pénalité ne remplace pas ce qu'il sait : s'il part, l'entreprise touche un peu d'argent, et reste bloquée.",
      "Oui. Un point unique de défaillance se réduit par écrit : la documentation du paramétrage comme livrable, et une passation sans surcoût si le consultant change.",
      "Non. Un consultant réservé à un projet qui n'a pas besoin de lui chaque jour : l'intégrateur refusera, ou te le facturera."
    ],
    retenir: "Un seul expert chez le prestataire ? Fais écrire dans la commande la documentation et la passation, avant de signer."
  },
  {
    id: "cp14-q24",
    dialecte: "Gestion de projet",
    q: "Le connecteur est livré le 29 mars, au lieu du 1er mars prévu au contrat (pénalités par jour de retard, sans mise en demeure). Le plan B est parti le 16 mars. Le DAF te demande depuis quand compter les pénalités. Que réponds-tu ?",
    choix: [
      "« Depuis le 1er mars : c'est la date du contrat »",
      "« Depuis le 15 mars : le déclencheur du plan B, prévu au contrat »",
      "« Depuis le 16 mars : le jour où la recette devait commencer »",
      "« Aucune : le plan B a évité le retard de la bascule »"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Sans mise en demeure à envoyer, les pénalités comptent depuis la date écrite au contrat, le 1er mars, jusqu'au plafond. C'est ensuite le DAF qui décide de les appliquer.",
      "Non. Le plan B est prévu au contrat, pas son déclencheur : le 15 mars est ta date interne. La PA était déjà en retard depuis 2 semaines.",
      "Non. Le début de ta recette est une date de ton planning, pas du contrat : tu offres 15 jours à la PA.",
      "Non. Le plan B protège ta date, il n'efface pas le retard de la PA : le contrat prévoit des pénalités, et le DAF décide de les appliquer."
    ],
    retenir: "Contrat « sans mise en demeure » : les pénalités comptent dès sa date (1er mars), pas depuis ton déclencheur du plan B (15 mars)."
  },
  {
    id: "cp14-q25",
    dialecte: "Gestion de projet",
    q: "Avril. Le connecteur est arrivé avec 4 semaines de retard. Le chef de projet de la PA te propose : « On oublie les pénalités, et on vous offre 2 jours de formation. » Que fais-tu ?",
    choix: [
      "Tu acceptes : la formation servira vraiment à la compta",
      "Tu refuses, contrat en main : les pénalités s'appliquent",
      "Tu lui demandes 4 jours de formation plutôt que 2",
      "Tu portes l'offre au DAF, avec le calcul et ton avis"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Tu renonces à une somme prévue par un contrat que tu n'as pas signé : c'est au DAF de le décider. Et tu ne sais même pas ce que valent les pénalités.",
      "Non. Presque : la règle est au contrat, mais l'appliquer, la réduire ou l'échanger, c'est le DAF qui le décide. Il a signé.",
      "Non. Tu négocies à la place du DAF une somme qui n'est pas à toi : la PA prendra ta parole pour un accord.",
      "Oui. Les pénalités, c'est le DAF qui décide : il a signé. Tu lui apportes les faits (date du contrat, date réelle, calcul, plafond), l'offre de la PA, et ton avis."
    ],
    retenir: "Appliquer, réduire ou échanger des pénalités : le DAF décide, sur tes faits (dates, calcul, plafond) et ton avis."
  },
  {
    id: "cp14-q26",
    dialecte: "Gestion de projet",
    q: "Fin avril. Recette du connecteur : aucune anomalie bloquante, 2 défauts mineurs (un libellé sur le PDF, un tri d'écran). La PA demande le PV pour facturer le solde. Que fais-tu signer ?",
    choix: [
      "Un PV sans réserve, et un mail qui liste les 2 défauts",
      "Aucun PV avant que les 2 défauts soient corrigés",
      "Aucun PV, et une demande de pénalités au DAF",
      "Un PV avec 2 réserves, chacune avec sa date"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Presque : les défauts sont écrits, mais hors du PV. Signé sans réserve, il accepte tout : ton mail devient une demande que la PA peut faire attendre, ou facturer.",
      "Non. Bloquer le PV pour un libellé, c'est retenir un paiement pour des détails. Des réserves datées font le même travail, sans bloquer.",
      "Non. Il n'y a pas de retard à punir : des défauts mineurs se traitent par des réserves, pas par des pénalités.",
      "Oui. Pas de défaut bloquant : le connecteur est accepté, avec réserves. Chaque défaut a une date de correction écrite. Le métier signe (cheffe comptable, responsable ADV)."
    ],
    retenir: "Défauts mineurs : PV avec réserves datées. Anomalie bloquante : pas de PV, un refus écrit."
  },
  {
    id: "cp14-q27",
    dialecte: "Gestion de projet",
    q: "Fin avril. En recette, les avoirs fournisseurs ne passent pas du tout dans le connecteur : anomalie bloquante. Le pilote démarre dans une semaine. La PA réclame quand même le PV, « avec une réserve ». Que fais-tu ?",
    choix: [
      "Tu laisses la PA juger si l'anomalie est bloquante",
      "Tu fais signer le PV : la bascule de juin ne doit pas glisser",
      "Tu fais signer un PV avec une réserve sur les avoirs",
      "Pas de PV : un refus écrit, avec l'anomalie décrite"
    ],
    bonne: 3,
    pourquoi: [
      "Non. C'est le métier qui juge ses anomalies, pas celui qui les a produites : la PA classera « mineur » ce qui l'arrange.",
      "Non. Signer, c'est accepter un connecteur qui ne traite pas les avoirs : le solde est payé, et la bascule partira avec l'anomalie.",
      "Non. Presque : une réserve, c'est pour un défaut mineur. Pour une anomalie bloquante, accepter avec réserve, c'est déjà accepter.",
      "Oui. Une anomalie bloquante, c'est un livrable non conforme : pas de PV. Tu refuses par écrit, avant la fin du délai de validation, avec l'anomalie et une demande de correction datée."
    ],
    retenir: "Une anomalie bloquante ne se met pas en réserve : pas de PV, un refus écrit avec l'anomalie et une date de correction."
  },
  {
    id: "cp14-q28",
    dialecte: "Gestion de projet",
    q: "Le contrat de la PA : « PV ou réserves écrites au plus tard le 10 mai ; sans réponse, le connecteur est accepté. » On est le 7 mai. 2 cas sur 40 n'ont pas encore pu être testés. Que fais-tu ?",
    choix: [
      "Tu attends : sans PV ni réserves écrites, rien n'est accepté",
      "Tu appelles la PA : réserve orale sur les 2 cas",
      "Avant le 10, tes réserves écrites, dont les 2 cas à tester",
      "Tu demandes au DAF de suspendre le contrat jusqu'aux tests"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Le contrat dit l'inverse : sans réponse au 10 mai, c'est accepté. Attendre, c'est accepter 2 cas que personne n'a vus.",
      "Non. Presque : la PA le sait, mais une réserve orale ne compte pas. Le 11 mai, le connecteur est accepté, avec ses 2 cas jamais testés.",
      "Oui. Le silence ne décide pas à ta place : avant la date, tes réserves écrites, dont les 2 cas à tester, avec une date. Si besoin, tu demandes par écrit un délai de plus.",
      "Non. 2 cas sur 40 ne justifient pas de suspendre un contrat : des réserves écrites, envoyées à temps, suffisent."
    ],
    retenir: "Recette tacite : tes réserves partent par écrit avant la date limite. Sinon, le silence vaut acceptation."
  },
  {
    id: "cp14-q29",
    dialecte: "Gestion de projet",
    q: "Avril. La PA écrit à tous ses clients : « Dès mai, notre support passe de 8 h-18 h à 9 h-17 h. » Votre annexe SLA dit 8 h-18 h. Que fais-tu ?",
    choix: [
      "Tu réponds, annexe en main : 8 h-18 h tient, sauf avenant",
      "Tu demandes à la PA une hotline à 8 h pour vous",
      "Tu acceptes, contre une baisse de prix écrite en annexe",
      "Tu demandes au DAF de résilier pour manquement"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Ce que le prestataire change seul ne change pas le contrat : seul un avenant signé des deux côtés le peut. Tu le dis par écrit, et le DAF le sait.",
      "Non. Tu demandes une faveur là où le contrat te donne un droit : l'annexe dit 8 h-18 h, et elle tient sans avenant.",
      "Non. Tu négocies seul un changement du contrat : c'est un avenant, que le DAF signe. Et la compta perd 2 heures de support par jour.",
      "Non. Il n'y a pas encore de manquement, seulement une annonce. Résilier en plein projet, c'est la plus grosse solution, et la plus risquée."
    ],
    retenir: "Un mail du prestataire ne modifie pas le contrat : seul un avenant signé des deux côtés le peut."
  },
  {
    id: "cp14-q30",
    dialecte: "Gestion de projet",
    q: "20 janvier. Clôture annuelle : la compta n'a pas pu envoyer à la PA ses données de paramétrage, dues au contrat le 15. La PA écrit : « Le 1er mars n'est plus garanti. » Que fais-tu ?",
    choix: [
      "Tu contestes, contrat en main : la date du 1er mars tient",
      "Tu fais partir les données vite, et tu cales une nouvelle date",
      "Tu préviens le DAF que le 1er mars glisse, sans plus",
      "Tu demandes au DAF les pénalités dès mars, données ou pas"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Le contrat engage aussi le client : le 1er mars supposait tes données au 15 janvier. Le retard vient de vous, la PA a raison.",
      "Oui. Le retard vient de vous : tu le répares, et la nouvelle date s'écrit, par un avenant que signe le DAF. Si elle dépasse le 15 mars, le plan B part seul.",
      "Non. Le DAF doit savoir, mais sans données envoyées ni nouvelle date écrite, la PA n'a plus d'échéance, et ta recette du 16 mars n'a plus de connecteur.",
      "Non. En général, les pénalités ne jouent pas quand le retard vient du client : le DAF les préparerait pour rien, et la relation se tend."
    ],
    retenir: "Le contrat engage les deux côtés : si ton retard décale la date du prestataire, ses pénalités ne jouent pas, en général. La nouvelle date s'écrit, par avenant."
  },
  {
    id: "cp14-q31",
    dialecte: "Gestion de projet",
    q: "Mars. Le DAF a décidé d'ajouter l'archivage des factures sur la durée légale, une option de la PA. Elle propose : « On l'active demain ; le prix, on le verra dans l'avenant. » Que fais-tu ?",
    choix: [
      "Tu acceptes : le DAF a décidé, c'est le principal",
      "Tu refuses l'option : elle n'était pas dans le contrat signé",
      "D'abord l'avenant signé, avec son prix ; puis l'activation",
      "Tu fais activer, et tu notes par écrit le prix pour l'avenant"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Le DAF a décidé d'ajouter l'option, pas de payer n'importe quel prix : sans avenant, c'est la facture qui fixera le prix.",
      "Non. Un contrat signé peut changer : c'est le rôle de l'avenant. Et garder les factures sur la durée légale est une obligation.",
      "Oui. Le DAF a dit oui à l'option, pas à un prix inconnu. L'avenant fixe le prix et le service ; le DAF le signe avant l'activation. Le circuit qui le précède : module cp10.",
      "Non. Presque : tu gardes une trace, mais un prix noté par toi n'engage pas la PA. Elle facturera son tarif, et l'option tourne déjà."
    ],
    retenir: "Un avenant fixe le prix avant le travail : « le prix, on le verra », c'est la facture qui décide."
  },
  {
    id: "cp14-q32",
    dialecte: "Gestion de projet",
    q: "Ton contrat avec la PA prévoit la réversibilité : export des factures et de leurs statuts, en format standard, sous 30 jours. Comment la vérifies-tu ?",
    choix: [
      "Par une attestation de réversibilité de la PA",
      "Par un vrai export d'un mois, en recette",
      "Par un export complet chaque mois, gardé chez toi",
      "Par un audit de la PA, confié à un cabinet"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Une attestation, c'est une promesse de plus, pas une preuve. Seul un vrai export, ouvert dans un autre outil, montre ce que tu récupéreras.",
      "Oui. Comme un plan B, une sortie se teste à froid, avant d'en avoir besoin : un petit export réel, ouvert dans un autre outil. Un statut manque ? Tu le fais corriger avant le PV.",
      "Non. Tu paies et stockes une copie dont tu n'as pas besoin : la clause suffit, si elle a été testée une fois.",
      "Non. Un audit complet pour vérifier un export : c'est lourd et cher. Un test simple pendant la recette répond à la question."
    ],
    retenir: "La réversibilité se teste avant d'en avoir besoin : un vrai export, pendant la recette."
  },
  {
    id: "cp14-q33",
    dialecte: "Gestion de projet",
    q: "1er mars. La PA livre le connecteur, mais sans les avoirs fournisseurs, prévus dans l'annexe du périmètre : « Ils suivront. Nous avons livré à la date. » Que fais-tu ?",
    choix: [
      "Tu prends la livraison, et tu demandes une date pour les avoirs",
      "Tu lances le plan B prévu au contrat, dès aujourd'hui",
      "Tu demandes au DAF de résilier, annexe en main",
      "Tu écris, annexe en main : livraison incomplète, DAF informé"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Une date pour les avoirs, oui. Mais prendre la livraison, c'est laisser dire que le 1er mars est tenu : les pénalités risquent de tomber.",
      "Non. Ton déclencheur est le 15 mars : le plan B part seul s'il est atteint, pas avant. D'ici là, le connecteur peut être complété.",
      "Non. Une livraison incomplète se constate par écrit : résilier le jour même, c'est la plus grosse solution, et la date légale en danger.",
      "Oui. Livrer, c'est livrer ce que dit l'annexe. Tu l'écris le jour même : livraison incomplète. Le DAF, qui a signé, sait que les pénalités peuvent courir."
    ],
    retenir: "Livrer, c'est livrer ce que dit le contrat : un livrable incomplet se signale par écrit, le jour même."
  },
  {
    id: "cp14-q34",
    dialecte: "Gestion de projet",
    q: "Novembre. Contrat de la PA : 3 ans, puis reconduit seul d'année en année, sauf résiliation 6 mois avant l'échéance. Que fais-tu de cette clause ?",
    choix: [
      "Rien à changer : tu notes le préavis, avec une alerte",
      "Tu fais supprimer la reconduction : 3 ans, puis on verra",
      "Tu fais réduire l'engagement à 1 an, pour rester libre",
      "Tu fais renégocier la clause par l'avocat du DAF"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. La clause est courante pour un service obligatoire. Le piège, c'est d'oublier la date : passé le préavis, tu repars pour un an. Une alerte laisse le temps de décider.",
      "Non. Sans reconduction, le service s'arrête au bout de 3 ans si personne n'a rien signé : pour une obligation légale, c'est une coupure possible.",
      "Non. Un engagement d'1 an coûte souvent plus cher, et changer de PA est un projet : tu ne le feras pas chaque année. Ta liberté, c'est la réversibilité.",
      "Non. Il n'y a rien à renégocier : la clause est courante. Le seul vrai risque, c'est d'oublier sa date."
    ],
    retenir: "Reconduction tacite : la clause est courante ; le piège, c'est d'oublier la date du préavis. Note-la, avec une alerte."
  },
  {
    id: "cp14-q35",
    dialecte: "Gestion de projet",
    q: "Tu es DSI adjoint. Mars 2029. Une autre PA coûte 30 % de moins. Votre contrat se reconduit seul fin novembre, sauf résiliation 6 mois avant, donc avant fin mai. Que fais-tu ?",
    choix: [
      "Tu laisses reconduire : changer de PA est trop risqué",
      "Tu fais résilier tout de suite, pour avoir l'offre",
      "Tu prépares le choix du DAF avant mai, sortie chiffrée",
      "Tu demandes à la PA d'aligner son prix, sans le DAF"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Tu décides seul de ne rien faire : le DAF ne voit jamais l'économie, ni ce que coûterait la sortie.",
      "Non. Résilier avant de connaître le coût de sortie (export, connecteur, tests, recette) : l'économie peut fondre, et rien n'est prêt.",
      "Oui. La date du préavis fixe ton calendrier. Options : rester, renégocier, changer, chacune avec son coût, sortie comprise. Le DAF décide avant fin mai.",
      "Non. Négocier est une bonne idée, mais pas seul : c'est le contrat du DAF, et tu engages l'entreprise sans lui."
    ],
    retenir: "Fin de contrat : la date du préavis fixe le calendrier ; le décideur choisit avant, en connaissant le coût de sortie."
  },
  {
    id: "cp14-q36",
    dialecte: "Gestion de projet",
    q: "Tu es DSI adjoint. Le DAF a décidé de changer de PA à la fin du contrat, fin novembre 2029. Il prévoit de signer avec la nouvelle « début novembre, pour ne pas payer deux abonnements ». Que fais-tu ?",
    choix: [
      "Tu préviens le DAF que novembre, c'est juste, sans plus",
      "Tu fais signer la nouvelle PA tôt, pour tester avant la fin",
      "Tu fais repousser d'un an la nouvelle PA, par prudence",
      "Tu lances l'export de l'ancienne PA dès demain, avant de signer"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Il est prévenu, mais rien ne change : signée en novembre, la nouvelle PA n'aura ni connecteur ni tests au 1er décembre. Vos factures ne partent plus.",
      "Oui. Pas de trou : la nouvelle PA signée tôt, connectée et testée avant la fin de l'ancienne. Quelques mois de double abonnement coûtent moins qu'une coupure.",
      "Non. Le DAF a décidé en connaissant le prix : un an de plus, c'est payer l'ancienne PA pour rien. Il suffit de bien caler les dates.",
      "Non. L'export fait partie de la sortie, mais demain, il manquerait les derniers mois de factures. Le vrai risque : une nouvelle PA pas prête au 1er décembre."
    ],
    retenir: "Changer de prestataire est un projet : le nouveau prêt et testé avant la fin de l'ancien, quitte à payer les deux un moment."
  },
  {
    id: "cp14-q37",
    dialecte: "Gestion de projet",
    q: "Le DAF t'envoie le projet de contrat de la PA, 40 pages : « Relis ce qui te concerne, l'avocat verra le reste. » Où passes-tu ton temps ?",
    choix: [
      "Livrables, planning, recette, SLA et réversibilité",
      "Responsabilité, droit applicable et tribunal compétent",
      "Toutes les clauses, de la 1re à la 40e page",
      "Le prix et l'échéancier : c'est ce qui compte au DAF"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Les clauses opérationnelles sont les tiennes : ce qui est livré, quand, comment on l'accepte, le service et la sortie. Personne ne les connaît mieux que toi.",
      "Non. Ce sont les clauses juridiques : celles du DAF et de l'avocat. Tu peux y signaler un doute, pas y passer ton temps.",
      "Non. Tu passes autant de temps sur le droit applicable que sur la recette : tes clauses à toi seront relues trop vite.",
      "Non. Le prix et la signature, c'est le DAF. Toi, tu vérifies que le paiement suit le PV : une ligne, pas tout ton temps."
    ],
    retenir: "Toi : les clauses opérationnelles (livrables, planning, recette, SLA, réversibilité). Le DAF et l'avocat : le juridique."
  },
  {
    id: "cp14-q38",
    dialecte: "Gestion de projet",
    q: "Le contrat de la PA est signé : 40 pages et 4 annexes. Ton équipe projet en aura besoin jusqu'à la bascule. Que fais-tu ?",
    choix: [
      "Tu le ranges : il est signé, le DAF garde l'original",
      "Tu l'envoies en entier à toute l'équipe, pour info",
      "Tu demandes à l'avocat une note de synthèse",
      "Tu en fais une fiche d'une page pour l'équipe"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Le jour d'un retard, personne ne saura ce que le contrat permet d'exiger, ni à quelle date.",
      "Non. L'info circule, mais personne ne lira 40 pages : le jour J, la bonne clause ne sera pas trouvée.",
      "Non. L'avocat connaît le droit, pas ton planning ni ta recette : cette fiche, c'est toi qui sais la faire.",
      "Oui. Ce dont l'équipe a besoin tient sur une page : dates clés, livrables, délai de validation, SLA, pénalités, préavis, contacts. Le suivi du prestataire : module cp15."
    ],
    retenir: "Après la signature, une fiche d'une page dit à l'équipe ce que le contrat permet d'exiger, et quand."
  },
  {
    id: "cp14-q39",
    dialecte: "Gestion de projet",
    q: "Novembre. Le commercial lit le projet de contrat de la PA : « Les pénalités sont plafonnées ? Exige qu'elles soient illimitées, sinon on change de PA ! » Que fais-tu ?",
    choix: [
      "Rien de plus : ce qui protège juin, c'est le plan B",
      "Tu fais demander des pénalités illimitées avant de signer",
      "Tu fais bloquer la signature jusqu'à un plafond plus haut",
      "Tu relances le choix de la PA, pour en trouver une sans plafond"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Un plafond est courant : sans lui, la PA refuse, ou fait payer le risque. Les pénalités paient une partie du coût (module cp07) ; ta date, c'est le plan B prévu au contrat qui la protège. Tu l'expliques au commercial.",
      "Non. Presque aucune PA ne signe des pénalités illimitées : tu bloques la signature, alors que la réception est déjà en retard.",
      "Non. Tu bloques la signature alors que la réception est déjà en retard : un plafond plus haut ne livrera pas ton connecteur plus tôt.",
      "Non. Relancer un choix pour une clause courante : des semaines perdues, et la nouvelle PA aura aussi un plafond."
    ],
    retenir: "Des pénalités plafonnées, c'est courant : elles paient une partie du retard. Ce qui protège ta date, c'est le plan B."
  },
  {
    id: "cp14-q40",
    dialecte: "Gestion de projet",
    q: "Novembre. Le DAF t'a confié la relecture des clauses opérationnelles du projet de contrat de la PA. La cheffe comptable, qui signera la recette des factures fournisseurs, veut lire l'annexe « recette » avant la signature. Que fais-tu ?",
    choix: [
      "Tu acceptes : elle la lit, et tu notes ses remarques",
      "Tu refuses : le contrat est confidentiel, réservé au DAF",
      "Tu demandes d'abord l'accord écrit du DAF",
      "Tu lui fais relire tout le contrat, avec l'avocat"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Elle signera le PV : le délai de validation et les critères d'acceptation la concernent d'abord. Ses remarques arrivent avant la signature, quand on peut encore changer.",
      "Non. L'annexe recette n'a rien de secret pour celle qui la signera : elle la découvrirait trop tard, en pleine recette.",
      "Non. Le DAF t'a confié ces clauses : les faire relire par celle qui signera le PV en fait partie. Lui demander un accord écrit lui fait perdre du temps.",
      "Non. Elle n'a besoin que de l'annexe recette : 40 pages et un avocat, c'est lui faire perdre une journée."
    ],
    retenir: "Ceux qui signeront le PV relisent l'annexe recette avant la signature : c'est aussi leur engagement."
  }
];
