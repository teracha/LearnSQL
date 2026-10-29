// Chef de projet SI — cp01 « Bilan de départ ».
// 30 mises en situation (fil rouge DEMAT 2027) qui couvrent les sous-parcours 0, A, B, C, D, E.
// Chaque « retenir » finit par le module qui traite le point (→ module cpXX).
LEARNSQL.questions.cp01 = [
  {
    "id": "cp01-q01",
    "dialecte": "Gestion de projet",
    "q": "Lundi 9 h. Le flux EDI des factures AquaBleu est bloqué. Tu animes l'atelier de cadrage DEMAT à 10 h. Le support N2 connaît ce flux. Que fais-tu ?",
    "choix": [
      "Tu corriges le flux toi-même, puis tu décales l'atelier d'une heure",
      "Tu délègues le flux au support et tu tiens l'atelier",
      "Tu demandes au DSI de choisir ce qui passe en premier, flux ou atelier",
      "Tu tiens l'atelier et tu regarderas toi-même le flux pendant la pause"
    ],
    "bonne": 1,
    "pourquoi": [
      "Non. Tu fais le travail du support et tu décales 6 personnes. Le run mange le projet, et ça recommencera.",
      "Oui. Le support sait faire : tu lui confies le flux avec une échéance et tu gardes ton rôle de chef de projet.",
      "Non. Tu escalades une décision que tu peux prendre seul. Le DSI attend que tu gères ce genre d'arbitrage.",
      "Non. Le flux bloqué reste sans pilote pendant 3 heures. Les factures AquaBleu partent en retard."
    ],
    "retenir": "Quand le run déborde : déléguer à celui qui sait faire, avec une échéance, et garder son rôle. → module cp02"
  },
  {
    "id": "cp01-q02",
    "dialecte": "Gestion de projet",
    "q": "Tu as le projet DEMAT, deux petits projets et le run. Depuis un mois, tu dépasses de 30 % ton temps chaque semaine. Que fais-tu ?",
    "choix": [
      "Tu tiens jusqu'à la mise en service, puis tu en parles à ton chef",
      "Tu travailles le week-end pour rattraper ton retard sans gêner personne",
      "Tu alertes ton responsable, chiffres et options en main",
      "Tu refuses toute nouvelle demande, sans en parler à ton responsable"
    ],
    "bonne": 2,
    "pourquoi": [
      "Non. Ton responsable découvrira le problème trop tard, quand des engagements seront déjà ratés.",
      "Non. Ça marche deux semaines. Ensuite la fatigue fait des erreurs, et personne ne sait que la charge est trop forte.",
      "Oui. Une alerte tôt, avec ta charge chiffrée et des options, permet à ton responsable de choisir les priorités.",
      "Non. Les demandeurs ne comprennent pas tes refus. Tu abîmes la relation sans régler la charge."
    ],
    "retenir": "Surcharge : alerter tôt, avec des faits et des options de ce qui peut glisser. → module cp02"
  },
  {
    "id": "cp01-q03",
    "dialecte": "Gestion de projet",
    "q": "L'intégrateur Divalto est lent à paramétrer le connecteur vers la plateforme. Tu sais faire ce paramétrage. Que fais-tu ?",
    "choix": [
      "Tu le paramètres toi-même un soir, pour gagner une semaine sur le planning",
      "Tu relances l'intégrateur avec une date et tu suis le retard",
      "Tu laisses faire, c'est son contrat, pas ton problème",
      "Tu signales au DAF que l'intégrateur n'est pas au niveau"
    ],
    "bonne": 1,
    "pourquoi": [
      "Non. Tu deviens responsable d'un paramétrage hors contrat. Au premier bug, l'intégrateur dira que ce n'est pas lui.",
      "Oui. Tu restes responsable du résultat, pas de la tâche : tu obtiens un engagement daté et tu suis l'écart.",
      "Non. Le retard est ton problème : c'est ta date de mise en service qui recule.",
      "Non. Tu escalades avant d'avoir demandé un engagement clair. Le DAF te demandera ce que tu as fait."
    ],
    "retenir": "Le chef de projet fait faire et suit. Il ne fait pas à la place du prestataire. → module cp03"
  },
  {
    "id": "cp01-q04",
    "dialecte": "Gestion de projet",
    "q": "Atelier de cadrage DEMAT. Le DAF ajoute : « Profitons-en pour refaire les relances clients. » Le délai légal ne bouge pas. Que fais-tu ?",
    "choix": [
      "Tu l'ajoutes au périmètre pour garder le sponsor de ton côté",
      "Tu refuses : ce n'est pas dans le projet de départ",
      "Tu l'écris en hors périmètre ou lot 2, et le DAF le valide",
      "Tu ne l'écris nulle part, pour ne pas le froisser"
    ],
    "bonne": 2,
    "pourquoi": [
      "Non. Tu ajoutes de la charge sur un délai fixe. Le jour du retard, on oubliera que l'idée venait du DAF.",
      "Non. Un refus sec braque le sponsor. Sa demande est peut-être utile, mais pas maintenant.",
      "Oui. Un hors-périmètre écrit et signé protège le délai. La demande n'est pas perdue : elle a sa place.",
      "Non. Le flou revient plus tard : le DAF pensera que les relances sont dans le projet."
    ],
    "retenir": "Une demande hors du cœur du projet : l'écrire en hors périmètre (ou lot 2), signé par le sponsor. → module cp04"
  },
  {
    "id": "cp01-q05",
    "dialecte": "Gestion de projet",
    "q": "Dans la note de cadrage DEMAT, quel critère de succès est le mieux écrit ?",
    "choix": [
      "La comptabilité est satisfaite du nouvel outil et l'utilise tous les jours",
      "Le connecteur Divalto fonctionne bien et les flux partent sans souci",
      "100 % des factures via la plateforme, 0 rejet bloquant sur un mois",
      "Le projet est livré à la date prévue et dans le budget validé en COPIL"
    ],
    "bonne": 2,
    "pourquoi": [
      "Non. « Satisfaite » ne se mesure pas. Chacun aura son avis à la fin.",
      "Non. « Bien » ne veut rien dire. Le connecteur peut marcher et les factures être rejetées.",
      "Oui. Il est mesurable, daté et lié au but métier. Tout le monde peut vérifier s'il est atteint.",
      "Non. La date est une contrainte, pas un résultat. On peut livrer à l'heure un outil qui ne sert à rien."
    ],
    "retenir": "Un critère de succès se mesure et se vérifie par tous, sans débat. → module cp04"
  },
  {
    "id": "cp01-q06",
    "dialecte": "Gestion de projet",
    "q": "La plateforme agréée livre son API avec 3 semaines de retard. Cette tâche est sur le chemin critique. Sans action de ta part, que devient la date de fin ?",
    "choix": [
      "Elle ne bouge pas : les marges absorbent le retard",
      "Elle recule de 3 semaines",
      "Elle recule d'environ une semaine et demie",
      "Elle ne bouge pas si on ajoute un développeur"
    ],
    "bonne": 1,
    "pourquoi": [
      "Non. Sur le chemin critique, il n'y a pas de marge. C'est justement sa définition.",
      "Oui. Tout retard sur le chemin critique décale la fin d'autant, sauf si tu agis (paralléliser, réduire, renforcer).",
      "Non. Le retard ne se partage pas en deux. Il passe entier sur la date de fin.",
      "Non. L'API est chez la plateforme : un développeur de plus chez toi ne la livre pas plus vite."
    ],
    "retenir": "Un retard sur le chemin critique décale la date de fin d'autant. → module cp05"
  },
  {
    "id": "cp01-q07",
    "dialecte": "Gestion de projet",
    "q": "Projet DEMAT : les règles légales du format de facture sont fixes. Les écrans de suivi pour la comptabilité sont encore flous. Quelle démarche choisis-tu ?",
    "choix": [
      "Tout en agile : on découvrira les règles légales au fil des sprints",
      "Hybride : flux légaux cadrés au départ, écrans en itérations courtes",
      "Tout en cycle en V : on spécifie aussi les écrans dès le départ",
      "Pas de démarche : l'intégrateur a l'habitude de ces projets"
    ],
    "bonne": 1,
    "pourquoi": [
      "Non. Des règles légales fixes n'ont pas besoin d'être découvertes. Les itérations font perdre du temps sur cette partie.",
      "Oui. Ce qui est fixe se cadre au départ. Ce qui est flou s'affine avec la comptabilité, par petits pas.",
      "Non. Spécifier des écrans flous donne des écrans que la comptabilité refusera à la recette.",
      "Non. Sans démarche partagée, chacun travaille à sa façon. Tu ne sais plus ce qui est validé."
    ],
    "retenir": "Le besoin stable se cadre au départ, le besoin flou se construit par itérations. → module cp06"
  },
  {
    "id": "cp01-q08",
    "dialecte": "Gestion de projet",
    "q": "La cheffe comptable, seule à connaître les cas de facturation, part en congé dans 4 mois, pendant la recette. Que fais-tu ?",
    "choix": [
      "Tu l'inscris au registre des risques : former une suppléante dès maintenant",
      "Tu attends : c'est dans 4 mois, on verra à ce moment-là",
      "Tu le signales aux RH : c'est un sujet d'absence, pas de projet",
      "Tu demandes au COPIL de décaler la recette de 4 mois"
    ],
    "bonne": 0,
    "pourquoi": [
      "Oui. C'est un risque connu, avec un fort impact. Une action maintenant coûte peu ; plus tard, il sera trop tard.",
      "Non. Dans 4 mois, ce sera un problème, sans solution simple. Former quelqu'un prend du temps.",
      "Non. L'absence est normale. Le risque, c'est pour ton projet : c'est à toi de le traiter.",
      "Non. Tu proposes la solution la plus chère sans avoir cherché les autres. Le COPIL te le reprochera."
    ],
    "retenir": "Un risque se traite avant qu'il arrive : registre, propriétaire, action. → module cp07"
  },
  {
    "id": "cp01-q09",
    "dialecte": "Gestion de projet",
    "q": "Tu envoies le reporting mensuel DEMAT. Tu sais déjà que le jalon « recette » sera raté de 2 semaines. Le mois dernier, tout était vert. Que fais-tu ?",
    "choix": [
      "Tu restes en vert : tu as encore une chance de rattraper",
      "Tu passes en rouge, sans plus de détails, pour te couvrir",
      "Tu passes en orange, avec cause, impact et décision",
      "Tu joins 3 pages d'analyse technique pour tout justifier"
    ],
    "bonne": 2,
    "pourquoi": [
      "Non. Le jour où le jalon tombe, le DAF découvre le retard. Tu perds sa confiance pour le reste du projet.",
      "Non. Un rouge sans explication inquiète sans aider. Le sponsor ne sait pas quoi décider.",
      "Oui. Une alerte tôt et honnête, avec une décision à prendre, laisse au sponsor le temps d'agir.",
      "Non. Le DAF ne lira pas 3 pages. Le message important (le retard) se perd dans le détail."
    ],
    "retenir": "Une météo honnête et tôt, avec une décision à prendre, vaut mieux qu'un vert de façade. → module cp08"
  },
  {
    "id": "cp01-q10",
    "dialecte": "Gestion de projet",
    "q": "Personne ne valide les spécifications du format de facture. La compta dit : « C'est à l'informatique. » L'informatique dit : « C'est à la compta. » Que fais-tu ?",
    "choix": [
      "Tu les valides toi-même pour débloquer la situation",
      "Tu fais un RACI avec un seul valideur par livrable, validé en COPIL",
      "Tu fais signer les deux services, pour être sûr",
      "Tu demandes à l'intégrateur de trancher, il connaît le sujet"
    ],
    "bonne": 1,
    "pourquoi": [
      "Non. Tu n'es pas le métier. Si une règle est fausse, c'est toi qui porteras l'erreur.",
      "Oui. Un seul « A » (celui qui valide) par livrable évite le ping-pong. Le COPIL rend la règle officielle.",
      "Non. Deux valideurs = chacun compte sur l'autre. Le blocage reviendra au premier désaccord.",
      "Non. Le prestataire n'a pas à décider pour toi. Et il a intérêt à valider ce qu'il a déjà fait."
    ],
    "retenir": "Un livrable = un seul valideur, écrit dans un RACI validé par la gouvernance. → module cp09"
  },
  {
    "id": "cp01-q11",
    "dialecte": "Gestion de projet",
    "q": "À 2 semaines de la recette, le commercial demande : « Envoyez aussi les factures en PDF aux petits clients. » Que fais-tu ?",
    "choix": [
      "Tu dis oui : l'intégrateur l'ajoutera vite, c'est un petit développement",
      "Tu refuses : le périmètre est figé depuis la note de cadrage",
      "Tu demandes à l'intégrateur de l'ajouter sans en parler au sponsor",
      "Tu chiffres l'impact, le sponsor arbitre, tu traces"
    ],
    "bonne": 3,
    "pourquoi": [
      "Non. « Vite » n'est jamais gratuit. Le délai et le budget glissent sans décision de personne.",
      "Non. La demande a peut-être de la valeur. Un refus sec sans chiffrage braque le commercial.",
      "Non. Un ajout caché n'est ni chiffré ni recetté. Il sortira à la mise en service, au pire moment.",
      "Oui. Chaque demande de changement est chiffrée (délai, coût, risque), arbitrée par le sponsor, puis tracée."
    ],
    "retenir": "Demande de changement : chiffrer, faire arbitrer par le sponsor, tracer la décision. → module cp10"
  },
  {
    "id": "cp01-q12",
    "dialecte": "Gestion de projet",
    "q": "Le DAF demande : « Combien coûte la DEMAT ? » Que lui présentes-tu ?",
    "choix": [
      "Le devis de l'intégrateur Divalto, c'est le plus gros poste",
      "Le coût total sur 3 à 5 ans : projet, abonnement, maintenance, temps interne",
      "Rien : c'est une obligation légale, le coût n'est pas un sujet",
      "Le prix de l'abonnement à la plateforme, par facture"
    ],
    "bonne": 1,
    "pourquoi": [
      "Non. Il manque l'abonnement, la maintenance et le temps de tes équipes. Le DAF découvrira les autres coûts plus tard.",
      "Oui. Le coût total (TCO) sur plusieurs années montre la vraie dépense. Le DAF peut budgéter sans surprise.",
      "Non. Obligatoire ne veut pas dire gratuit. Le DAF doit quand même budgéter, et choisir entre plusieurs options.",
      "Non. C'est un seul poste, et seulement le récurrent. Le coût du projet lui-même est oublié."
    ],
    "retenir": "Un coût se présente sur plusieurs années, tout compris (TCO), pas avec un seul devis. → module cp11"
  },
  {
    "id": "cp01-q13",
    "dialecte": "Gestion de projet",
    "q": "Le DAF veut séparer investissement (CAPEX) et fonctionnement (OPEX). Où ranges-tu l'abonnement annuel à la plateforme agréée ?",
    "choix": [
      "En investissement, car il est lié au projet",
      "En fonctionnement, car il revient chaque année",
      "En investissement la 1re année, puis en fonctionnement",
      "Hors budget SI, car c'est la compta qui l'utilise"
    ],
    "bonne": 1,
    "pourquoi": [
      "Non. Le lien avec le projet ne suffit pas. Un abonnement payé chaque année est une charge, pas un investissement.",
      "Oui. Un abonnement est une dépense récurrente : c'est du fonctionnement. À valider avec le contrôle de gestion.",
      "Non. La nature de la dépense ne change pas avec l'année. Ce découpage fausse la comparaison des budgets.",
      "Non. Quelqu'un doit porter ce coût dans un budget. Sinon il « disparaît », puis surprend tout le monde."
    ],
    "retenir": "Abonnement récurrent = fonctionnement (OPEX). Projet ponctuel = souvent investissement (CAPEX). → module cp11"
  },
  {
    "id": "cp01-q14",
    "dialecte": "Gestion de projet",
    "q": "L'intégrateur travaille en régie. 60 % du budget est consommé pour 40 % du travail fait. Que fais-tu ?",
    "choix": [
      "Tu attends la facture finale pour voir l'écart réel",
      "Tu supprimes une partie de la recette pour tenir le budget",
      "Tu recalcules le reste à faire et tu alertes le sponsor",
      "Tu imposes à l'intégrateur de passer au forfait demain"
    ],
    "bonne": 2,
    "pourquoi": [
      "Non. À la fin, il est trop tard pour agir. La dérive est visible dès maintenant.",
      "Non. Tu tiens le budget mais tu prends un risque sur la mise en service. Et sans le dire au sponsor.",
      "Oui. Le reste à faire donne l'atterrissage réel. Le sponsor peut décider tôt : budget, périmètre ou délai.",
      "Non. Un forfait se négocie, il ne s'impose pas. Et l'intégrateur chiffrera le risque très cher."
    ],
    "retenir": "Suivre un budget : consommé + reste à faire = atterrissage. Alerter dès que l'écart apparaît. → module cp12"
  },
  {
    "id": "cp01-q15",
    "dialecte": "Gestion de projet",
    "q": "Tu dois choisir la plateforme agréée. Le commercial pousse celle qu'utilise un ami. Que fais-tu ?",
    "choix": [
      "Tu prends la moins chère des trois offres reçues, à service égal",
      "Tu consultes 3 plateformes avec une grille de choix pondérée",
      "Tu prends celle que l'intégrateur Divalto connaît déjà",
      "Tu organises une démo de chacune et tu choisis au ressenti"
    ],
    "bonne": 1,
    "pourquoi": [
      "Non. Le prix seul oublie la qualité, le connecteur Divalto et le support. Le moins cher coûte souvent plus cher ensuite.",
      "Oui. Une grille définie avant de lire les offres rend le choix objectif. Tu peux le défendre face au commercial.",
      "Non. C'est un critère utile, mais pas le seul. Et l'intégrateur a peut-être un intérêt à ce choix.",
      "Non. La démo montre ce que le vendeur veut montrer. Le ressenti ne se justifie pas devant un COPIL."
    ],
    "retenir": "Choisir un prestataire : plusieurs offres, grille pondérée fixée avant de les lire. → module cp13"
  },
  {
    "id": "cp01-q16",
    "dialecte": "Gestion de projet",
    "q": "Tu vas signer avec la plateforme agréée. En plus du prix, que vérifies-tu en priorité ?",
    "choix": [
      "La durée d'engagement la plus longue, pour avoir une remise",
      "Les niveaux de service (SLA) et la récupération des données en fin de contrat",
      "Le nombre de clients de la plateforme, pour être rassuré",
      "Rien de plus : l'agrément de l'État garantit le service"
    ],
    "bonne": 1,
    "pourquoi": [
      "Non. Un engagement long sans clause de sortie t'enferme si le service est mauvais.",
      "Oui. Les SLA fixent ce que tu peux exiger. La réversibilité te permet de partir avec tes factures et tes données.",
      "Non. C'est rassurant, mais ce n'est pas contractuel. Tu ne peux rien exiger avec ce chiffre.",
      "Non. L'agrément porte sur la conformité, pas sur ton niveau de service ni sur la sortie du contrat."
    ],
    "retenir": "Avant de signer : SLA, pénalités, réversibilité, propriété des données. → module cp14"
  },
  {
    "id": "cp01-q17",
    "dialecte": "Gestion de projet",
    "q": "Pour la 2e fois, la plateforme agréée livre en retard sans prévenir. Que fais-tu ?",
    "choix": [
      "Tu menaces de rompre le contrat dès cette semaine",
      "Tu compenses en faisant toi-même une partie de leur travail",
      "Tu attends : ils ont sûrement d'autres clients en retard",
      "Tu fixes un comité fournisseur, un plan daté, et tu écris"
    ],
    "bonne": 3,
    "pourquoi": [
      "Non. Une menace trop tôt durcit la relation. Et changer de plateforme en cours de projet te retarde encore plus.",
      "Non. Tu prends leur travail et leur responsabilité. Ils n'ont plus de raison de tenir leurs dates.",
      "Non. Le problème se répète : sans réaction, il deviendra la règle.",
      "Oui. Un cadre formel et des traces écrites mettent le fournisseur face à ses engagements. Les pénalités restent possibles."
    ],
    "retenir": "Un fournisseur en retard se pilote : comité, plan d'action daté, traces écrites. → module cp15"
  },
  {
    "id": "cp01-q18",
    "dialecte": "Gestion de projet",
    "q": "La cheffe comptable doit tester les factures. Le DAF, son chef, l'a mise à 100 % sur la clôture. Que fais-tu ?",
    "choix": [
      "Tu lui demandes de venir tester en dehors de ses heures",
      "Tu fais la recette à sa place, tu connais les factures",
      "Tu négocies avec le DAF des créneaux fixes pour elle",
      "Tu escalades au directeur général pour la libérer"
    ],
    "bonne": 2,
    "pourquoi": [
      "Non. Tu la mets en porte-à-faux avec son chef. Et la recette faite en fin de journée sera bâclée.",
      "Non. Le métier n'aura pas validé. Les cas que toi tu ne connais pas sortiront en production.",
      "Oui. Tu n'as pas d'autorité sur elle : tu négocies avec son manager, en montrant ce que coûte son absence.",
      "Non. Tu contournes le DAF, qui est aussi ton sponsor. Tu gagnes une semaine et tu perds sa confiance."
    ],
    "retenir": "Sans autorité, on négocie la disponibilité des utilisateurs clés avec leur manager, chiffres à l'appui. → module cp16"
  },
  {
    "id": "cp01-q19",
    "dialecte": "Gestion de projet",
    "q": "Tu dois annoncer au comité de direction un retard de 3 semaines sur la DEMAT. Comment le présentes-tu ?",
    "choix": [
      "Le détail des erreurs XML qui ont causé le retard, pour être précis",
      "Une page : délai, euros, risques, décision attendue",
      "Une présentation complète de 30 slides, pour être transparent",
      "À l'oral, sans support, pour ne pas laisser de trace écrite"
    ],
    "bonne": 1,
    "pourquoi": [
      "Non. La direction ne lit pas le XML. Elle repart sans savoir ce qu'elle doit décider.",
      "Oui. La direction veut des euros, des risques et une décision. Une page suffit.",
      "Non. Trop d'information cache le message. Personne ne retient le point important.",
      "Non. Sans trace, chacun retiendra sa version. La décision prise sera contestée plus tard."
    ],
    "retenir": "À la direction : euros, risques, décision attendue, sur une page. → module cp17"
  },
  {
    "id": "cp01-q20",
    "dialecte": "Gestion de projet",
    "q": "Le directeur général veut avancer la mise en service DEMAT d'un mois. Ton planning n'a aucune marge. Que fais-tu ?",
    "choix": [
      "Tu dis oui, puis tu négocies plus tard avec l'équipe et le prestataire",
      "Tu proposes des options, chacune avec son coût et son risque",
      "Tu refuses : le planning a été validé en COPIL",
      "Tu acceptes et tu demandes des heures sup à l'équipe"
    ],
    "bonne": 1,
    "pourquoi": [
      "Non. Le « oui » devient un engagement. Tu le rateras, et ce sera ta faute, pas celle de la demande.",
      "Oui. Tu ne dis pas non : tu montres le prix de chaque option. Le DG choisit en connaissant les conséquences.",
      "Non. Un refus sec, même justifié, braque le DG. Il pensera que tu protèges ton confort.",
      "Non. L'équipe s'épuise et fait plus d'erreurs. Et le risque n'a pas été accepté par celui qui demande."
    ],
    "retenir": "Dire non, c'est proposer des options avec leur prix, et laisser décider. → module cp18"
  },
  {
    "id": "cp01-q21",
    "dialecte": "Gestion de projet",
    "q": "Des factures sont rejetées. L'intégrateur accuse la plateforme, la plateforme accuse l'intégrateur. Que fais-tu ?",
    "choix": [
      "Tu désignes l'intégrateur comme fautif : c'est lui que tu paies",
      "Tu les laisses régler ça entre eux, ce sont des pros",
      "Tu analyses toi-même les journaux toute la nuit",
      "Tu les réunis sur des faits, avec un responsable par action"
    ],
    "bonne": 3,
    "pourquoi": [
      "Non. Accuser sans preuve braque l'intégrateur. Et si la faute vient de la plateforme, le problème reste.",
      "Non. Chacun défend sa position. Personne n'a intérêt à céder, et les rejets continuent.",
      "Non. Tu fais le travail des deux prestataires. Et tu seras épuisé pour la suite du projet.",
      "Oui. Les faits dépassionnent le conflit. Chaque action a un responsable et une date."
    ],
    "retenir": "Un conflit entre prestataires se règle ensemble, sur des faits, avec des actions attribuées. → module cp18"
  },
  {
    "id": "cp01-q22",
    "dialecte": "Gestion de projet",
    "q": "L'intégrateur dit : « Nos tests sont bons, on peut passer en production. » Que fais-tu ?",
    "choix": [
      "Tu lui fais confiance : il connaît Divalto mieux que toi",
      "Tu fais faire une recette métier, avec PV signé",
      "Tu testes toi-même quelques factures pour vérifier",
      "Tu passes en production et la compta testera en vrai"
    ],
    "bonne": 1,
    "pourquoi": [
      "Non. Ses tests vérifient ce qu'il a fait, pas ce dont le métier a besoin. Ce n'est pas une recette.",
      "Oui. La comptabilité valide sur ses cas réels, avec des critères d'acceptation. Le PV signé engage chacun.",
      "Non. Tu ne connais pas tous les cas de la compta. Et ton test ne vaut pas validation métier.",
      "Non. Les erreurs sortent sur de vraies factures clients. Les corriger coûte bien plus cher."
    ],
    "retenir": "La recette, c'est le métier qui valide sur ses cas, avec un PV signé. → module cp19"
  },
  {
    "id": "cp01-q23",
    "dialecte": "Gestion de projet",
    "q": "Tu reprends 2 000 fiches clients (SIREN, adresse de facturation) pour la plateforme. Comment contrôles-tu la reprise ?",
    "choix": [
      "Tu importes tout, les rejets en production diront ce qui est faux",
      "Tu regardes une dizaine de fiches à l'écran, au hasard",
      "Tu fais des comptages et des rapprochements, puis la compta valide",
      "Tu laisses l'intégrateur contrôler, c'est lui qui a fait le script"
    ],
    "bonne": 2,
    "pourquoi": [
      "Non. Chaque rejet est une facture client bloquée. Tu découvres les erreurs au pire moment.",
      "Non. Dix fiches sur 2 000 ne prouvent rien. Les erreurs sont souvent dans des cas rares.",
      "Oui. Comptages et rapprochements avec la source prouvent que rien n'est perdu. Le métier valide le contenu.",
      "Non. Celui qui fait le script ne doit pas être le seul à le contrôler. Et le métier n'a rien validé."
    ],
    "retenir": "Une reprise se prouve : comptages, rapprochements, validation par le métier. → module cp20"
  },
  {
    "id": "cp01-q24",
    "dialecte": "Gestion de projet",
    "q": "Veille de bascule DEMAT. Deux anomalies majeures sont encore ouvertes. Le DAF veut y aller. Que fais-tu ?",
    "choix": [
      "Tu bascules : le DAF est le sponsor, il a décidé",
      "Tu annules la bascule seul, la qualité passe avant tout",
      "Tu présentes les écarts aux critères de go fixés avant, et le retour arrière",
      "Tu bascules quand même et tu corriges pendant l'hypercare"
    ],
    "bonne": 2,
    "pourquoi": [
      "Non. Le sponsor décide, mais il doit décider en connaissant les risques. C'est à toi de les montrer.",
      "Non. La décision ne t'appartient pas seule. Le sponsor doit pouvoir choisir en connaissant les faits.",
      "Oui. Des critères fixés à l'avance évitent un débat d'opinions. Le sponsor décide en connaissant le plan de repli.",
      "Non. Deux anomalies majeures sur de vraies factures, ce n'est pas de l'hypercare. C'est un incident annoncé."
    ],
    "retenir": "Go / no-go : comparer aux critères fixés avant, montrer le retour arrière, puis le sponsor décide. → module cp21"
  },
  {
    "id": "cp01-q25",
    "dialecte": "Gestion de projet",
    "q": "La DEMAT est en production depuis 2 mois. Tous les appels arrivent encore chez toi. Que fais-tu ?",
    "choix": [
      "Tu continues à répondre : tu connais le sujet mieux que tout le monde",
      "Tu clôtures le projet et tu ne réponds plus aux appels",
      "Tu renvoies tous les appels vers l'intégrateur Divalto",
      "Tu transfères au support, avec un dossier et une date de fin"
    ],
    "bonne": 3,
    "pourquoi": [
      "Non. Tu deviens le support de fait. Ton prochain projet commencera sans toi.",
      "Non. Sans transfert, le support ne sait pas gérer. Les utilisateurs restent sans réponse.",
      "Non. Chaque appel coûte cher. Et le support interne ne monte jamais en compétence.",
      "Oui. Un transfert formel au support, avec une date de fin, ferme proprement le projet."
    ],
    "retenir": "Passer en run : dossier d'exploitation, transfert au support, date de fin de l'hypercare. → module cp22"
  },
  {
    "id": "cp01-q26",
    "dialecte": "Gestion de projet",
    "q": "Les comptables sont inquiètes : « Avec la facture électronique, on va perdre notre travail. » Que fais-tu ?",
    "choix": [
      "Tu envoies un mail rassurant à toute l'équipe comptable",
      "Tu les rencontres pour parler de ce qui change pour elles",
      "Tu organises une grosse formation, 3 mois avant la bascule",
      "Tu laisses le DAF gérer : c'est son équipe, pas la tienne"
    ],
    "bonne": 1,
    "pourquoi": [
      "Non. Un mail ne répond pas à une peur. Il donne l'impression qu'on évite le sujet.",
      "Oui. On traite l'inquiétude en face, avec du concret. Une utilisatrice clé porte le changement de l'intérieur.",
      "Non. Trop tôt, la formation est oubliée. Et elle ne répond pas à l'inquiétude.",
      "Non. Le DAF a un rôle, mais l'adoption est un résultat de ton projet. Si elle rate, le projet rate."
    ],
    "retenir": "Le changement se prépare avec les gens : écouter, montrer le concret, s'appuyer sur des utilisateurs clés. → module cp23"
  },
  {
    "id": "cp01-q27",
    "dialecte": "Gestion de projet",
    "q": "L'intégrateur demande une copie complète de la base clients de production pour ses tests. Que fais-tu ?",
    "choix": [
      "Tu l'envoies : il a signé un accord de confidentialité",
      "Tu refuses tout test sur des données ressemblant au réel",
      "Tu l'envoies par mail chiffré, c'est sécurisé",
      "Tu donnes des données réduites ou anonymisées"
    ],
    "bonne": 3,
    "pourquoi": [
      "Non. La confidentialité ne suffit pas. Le RGPD demande de limiter les données au besoin réel.",
      "Non. Les tests doivent rester réalistes. Le bon réflexe est de réduire les données, pas de bloquer.",
      "Non. Le chiffrement protège le transport, pas le fond : tu envoies quand même trop de données.",
      "Oui. Tu limites les données au besoin. Vérifie aussi le contrat du prestataire (sous-traitant RGPD). Demande l'avis du DPO ou du référent RGPD."
    ],
    "retenir": "Données personnelles en projet : donner le minimum utile, et vérifier le cadre du prestataire. → module cp24"
  },
  {
    "id": "cp01-q28",
    "dialecte": "Gestion de projet",
    "q": "Trois projets demandés, de la place pour deux : DEMAT (obligation légale), tableaux Power BI des ventes, refonte de l'intranet. Que fais-tu ?",
    "choix": [
      "Tu les lances dans l'ordre d'arrivée des demandes, sans discuter",
      "Tu lances les trois en parallèle, un peu plus lentement",
      "Tu mets la DEMAT d'abord, la direction arbitre le reste",
      "Tu prends celui du demandeur le plus haut placé dans l'entreprise"
    ],
    "bonne": 2,
    "pourquoi": [
      "Non. L'ordre d'arrivée ne dit rien de la valeur. L'obligation légale peut passer en dernier.",
      "Non. Trois projets lents finissent tous en retard. Y compris celui qui est obligatoire.",
      "Oui. L'obligation légale passe d'abord. Les autres se comparent sur valeur, risque et capacité, et la direction décide.",
      "Non. Le rang du demandeur n'est pas un critère. Les autres directions contesteront le choix."
    ],
    "retenir": "Prioriser : obligation légale d'abord, puis valeur, risque et capacité, arbitrés par la direction. → module cp25"
  },
  {
    "id": "cp01-q29",
    "dialecte": "Gestion de projet",
    "q": "Tu manages un analyste. Il livre en retard pour la 3e fois. Tu as repris son travail les deux fois d'avant. Que fais-tu ?",
    "choix": [
      "Tu reprends encore son travail, c'est plus rapide",
      "Tu le recadres devant l'équipe, pour que tout le monde comprenne",
      "Tu attends l'entretien annuel pour en parler",
      "Tu le vois seul : faits, causes, et attentes claires"
    ],
    "bonne": 3,
    "pourquoi": [
      "Non. Il n'apprend rien et tu t'épuises. Il comprend que le retard n'a pas de conséquence.",
      "Non. Le recadrage en public humilie. Tu perds sa confiance et celle de l'équipe.",
      "Non. Attendre des mois laisse le problème s'installer. Et l'entretien annuel devient un procès.",
      "Oui. Un échange en tête-à-tête, factuel, permet de comprendre la cause et de fixer ce que tu attends."
    ],
    "retenir": "Un problème de travail se traite vite, seul à seul, sur des faits, avec des attentes claires. → module cp26"
  },
  {
    "id": "cp01-q30",
    "dialecte": "Gestion de projet",
    "q": "Le directeur général demande pourquoi le budget SI augmente de 15 % l'an prochain. Que présentes-tu ?",
    "choix": [
      "Le détail des licences et des contrats, ligne par ligne",
      "Que ce budget est incompressible : tout est déjà engagé",
      "Le run, les projets et les obligations, avec la valeur et des options d'économie",
      "Une comparaison avec la moyenne des entreprises du secteur"
    ],
    "bonne": 2,
    "pourquoi": [
      "Non. Le DG ne peut rien décider sur 200 lignes. Il repart sans comprendre la hausse.",
      "Non. « Incompressible » ferme la discussion. Le DG coupera au hasard, sans toi.",
      "Oui. Le DG voit ce qui est subi, ce qui est choisi, ce que ça rapporte, et ce qu'il peut couper avec quelle conséquence.",
      "Non. Une moyenne aide, mais ne dit pas ce que ce budget apporte à ton entreprise."
    ],
    "retenir": "Défendre un budget SI : par nature (run, projets, obligations), en valeur, avec des options. → module cp27"
  }
];
