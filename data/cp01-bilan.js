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
      "Tu confies le flux au support, point à 11 h, et tu tiens l'atelier",
      "Tu demandes au DSI de choisir ce qui passe en premier, flux ou atelier",
      "Tu tiens l'atelier et tu regardes le flux avec le support à la pause"
    ],
    "bonne": 1,
    "pourquoi": [
      "Non. Tu fais le travail du support et tu décales 6 personnes. Le run mange le projet, et ça recommencera.",
      "Oui. Le support sait faire : tu lui confies le flux avec un point à 11 h, et tu gardes ton rôle de chef de projet.",
      "Non. Tu escalades une décision que tu peux prendre seul. Le DSI attend que tu gères ce genre d'arbitrage.",
      "Non. Le flux reste bloqué jusqu'à la pause, et tu gardes en main un sujet que le support sait traiter seul. Les factures AquaBleu partent en retard."
    ],
    "retenir": "Quand le run déborde : déléguer à celui qui sait faire, avec une échéance, et garder son rôle. → module cp02"
  },
  {
    "id": "cp01-q02",
    "dialecte": "Gestion de projet",
    "q": "Tu as le projet DEMAT, deux petits projets et le run. Depuis un mois, tu dépasses de 30 % ton temps chaque semaine. Que fais-tu ?",
    "choix": [
      "Tu tiens jusqu'à la mise en service, puis tu en parles à ton chef",
      "Tu demandes à ton responsable un jour de télétravail pour te concentrer",
      "Tu alertes ton responsable, chiffres et options en main",
      "Tu dis non à toute nouvelle demande, de ton propre chef"
    ],
    "bonne": 2,
    "pourquoi": [
      "Non. Ton responsable découvrira le problème trop tard, quand des engagements seront déjà ratés.",
      "Non. Tu gagnes du calme, pas du temps : 30 % de trop ne se règle pas ainsi. Ton responsable ne voit pas le vrai problème, ta charge.",
      "Oui. Une alerte tôt, avec ta charge chiffrée et des options, permet à ton responsable de choisir les priorités.",
      "Non. Les demandeurs ne comprennent pas tes refus. Tu abîmes la relation sans régler la charge."
    ],
    "retenir": "Surcharge : alerter tôt, avec des faits et des options de ce qui peut glisser. → module cp02"
  },
  {
    "id": "cp01-q03",
    "dialecte": "Gestion de projet",
    "q": "L'intégrateur Divalto a 5 jours de retard sur le paramétrage du connecteur. C'est son 1er retard, et il tient dans la marge de recette. Tu sais faire ce paramétrage. Le commercial s'agace : « La date légale approche, change d'intégrateur aujourd'hui ! » Que fais-tu ?",
    "choix": [
      "Tu le paramètres toi-même ce soir, pour rattraper les 5 jours",
      "Tu lui demandes un engagement ferme, et tu suis l'écart",
      "Tu lui laisses ces 5 jours sur la marge, sans rien demander",
      "Tu préviens le DAF, puis tu lui demandes un autre intégrateur"
    ],
    "bonne": 1,
    "pourquoi": [
      "Non. Tu deviens responsable d'un paramétrage hors contrat. Au premier bug, l'intégrateur dira que ce n'est pas lui.",
      "Oui. Un 1er retard, dans la marge : tu gères à ton niveau. Nouvelle date ferme, suivie, et tu le dis au prochain COPIL. S'il la rate, tu montes à son responsable et tu informes le DAF.",
      "Non. La marge absorbe ces 5 jours, mais sans engagement daté, rien ne dit que le retard s'arrêtera là. Au 2e retard, la marge aura fondu en silence.",
      "Non. Un 1er retard qui tient dans la marge ne justifie pas de changer d'intégrateur : ça coûte des mois. Tu surréagis à la pression d'un commercial qui ne décide pas."
    ],
    "retenir": "Le chef de projet fait faire et suit, à la taille du problème : ni à la place du prestataire, ni escalade au 1er retard. → module cp03"
  },
  {
    "id": "cp01-q04",
    "dialecte": "Gestion de projet",
    "q": "Atelier de cadrage DEMAT. Le DAF ajoute : « Profitons-en pour refaire les relances clients. » Le délai légal ne bouge pas. Que fais-tu ?",
    "choix": [
      "Tu l'ajoutes au périmètre pour garder le sponsor de ton côté",
      "Tu réponds au DAF que ce n'est pas le sujet du projet",
      "Tu montres l'impact sur le planning, et le DAF tranche",
      "Tu le classes en lot 2, puis tu l'annonces au DAF"
    ],
    "bonne": 2,
    "pourquoi": [
      "Non. Tu ajoutes de la charge sur un délai fixe, sans que le DAF ait vu l'impact. Le jour du retard, on oubliera que l'idée venait de lui.",
      "Non. Ton avis se défend, mais le sponsor a le droit de changer le périmètre. Tu montres l'impact, tu ne décides pas à sa place.",
      "Oui. Il voit ce que l'ajout coûte à la date légale, puis il décide. Sa décision s'écrit dans la note, souvent en hors périmètre : la demande n'est pas perdue.",
      "Non. Il apprend ton choix après coup, sans en voir le coût. Le périmètre, c'est le sponsor qui le valide, en connaissant l'impact."
    ],
    "retenir": "Le sponsor ajoute une demande au cadrage : montrer l'impact, le laisser trancher, écrire sa décision (souvent hors périmètre). → module cp04"
  },
  {
    "id": "cp01-q05",
    "dialecte": "Gestion de projet",
    "q": "Dans la note de cadrage DEMAT, quel critère de succès est le mieux écrit ?",
    "choix": [
      "La comptabilité est satisfaite du nouvel outil et l'utilise tous les jours",
      "Le connecteur Divalto fonctionne bien et les flux partent sans souci",
      "100 % des factures B2B émises via la PA au 1er sept. 2027, moins de 2 % de rejets",
      "Le projet est livré à la date prévue et dans le budget validé en COPIL"
    ],
    "bonne": 2,
    "pourquoi": [
      "Non. « Satisfaite » ne se mesure pas. Chacun aura son avis à la fin.",
      "Non. « Bien » ne veut rien dire. Le connecteur peut marcher et les factures être rejetées.",
      "Oui. Il est mesurable, daté et lié au but métier. Tout le monde peut vérifier s'il est atteint. (La réception, elle, est obligatoire depuis septembre 2026.)",
      "Non. Il est mesurable, mais ne dit rien du résultat métier : on peut livrer à l'heure des factures rejetées."
    ],
    "retenir": "Un critère de succès se mesure, se vérifie par tous et dit le résultat métier attendu. → module cp04"
  },
  {
    "id": "cp01-q06",
    "dialecte": "Gestion de projet",
    "q": "La plateforme agréée (PA) livre son connecteur avec 3 semaines de retard. Cette tâche est sur le chemin critique. Sans action de ta part, que devient la date de fin ?",
    "choix": [
      "Elle ne bouge pas : la marge de la tâche absorbe le retard",
      "Elle recule de 3 semaines, autant que la tâche en retard",
      "Elle recule d'une semaine : l'intégrateur avance en parallèle",
      "Elle ne bouge pas si on ajoute un développeur chez nous"
    ],
    "bonne": 1,
    "pourquoi": [
      "Non. Une tâche du chemin critique n'a pas de marge : c'est sa définition. La marge légale (juillet-août) peut protéger la date légale, mais la fin des travaux recule.",
      "Oui. Tout retard sur le chemin critique décale la fin d'autant. Pour la tenir, il faut agir : réduire le périmètre, réorganiser les tâches suivantes.",
      "Non. Avancer en parallèle n'aide que les tâches qui ne dépendent pas du connecteur. La tâche critique attend 3 semaines : la fin recule d'autant.",
      "Non. Le connecteur est chez la PA : un développeur de plus chez vous ne le livre pas plus vite. La tâche critique attend toujours."
    ],
    "retenir": "Un retard sur le chemin critique décale la fin d'autant. Sans action, seule la marge avant l'échéance protège la date légale. → module cp05"
  },
  {
    "id": "cp01-q07",
    "dialecte": "Gestion de projet",
    "q": "Projet DEMAT : les règles légales du format de facture sont fixes. Les écrans de suivi pour la comptabilité sont encore flous. Quelle démarche choisis-tu ?",
    "choix": [
      "Tout en agile : on découvrira les règles légales au fil des sprints",
      "Hybride : flux légaux cadrés au départ, écrans en itérations courtes",
      "Tout en cycle en V : on spécifie aussi les écrans dès le départ",
      "La démarche habituelle de l'intégrateur, sans l'adapter"
    ],
    "bonne": 1,
    "pourquoi": [
      "Non. Des règles légales fixes n'ont pas besoin d'être découvertes. Les itérations font perdre du temps sur cette partie.",
      "Oui. Ce qui est fixe se cadre au départ. Ce qui est flou s'affine avec la comptabilité, par petits pas.",
      "Non. Spécifier des écrans flous donne des écrans que la comptabilité refusera à la recette.",
      "Non. Tu subis la méthode du prestataire : elle sert son organisation, pas ton besoin."
    ],
    "retenir": "Le besoin stable se cadre au départ, le besoin flou se construit par itérations. → module cp06"
  },
  {
    "id": "cp01-q08",
    "dialecte": "Gestion de projet",
    "q": "La cheffe comptable, seule à savoir traiter les avoirs fournisseurs, part 3 semaines en congé dans 4 mois, pendant la recette. Que fais-tu ?",
    "choix": [
      "Tu l'écris en risque et tu fais former une suppléante",
      "Tu attends : c'est dans 4 mois, on verra à ce moment-là",
      "Tu demandes au DAF de décaler ses congés après la recette",
      "Tu demandes au COPIL de décaler la recette de 4 mois"
    ],
    "bonne": 0,
    "pourquoi": [
      "Oui. Risque connu, 4 mois pour agir : une petite action suffit. Elle écrit ses cas et forme une suppléante ; le DAF, son manager, en est le propriétaire.",
      "Non. Dans 4 mois, ce sera un problème, sans solution simple. Former quelqu'un prend du temps.",
      "Non. Ses congés sont posés, et c'est le DAF, son manager, qui les a accordés. Tu crées un conflit, alors que former une suppléante suffit.",
      "Non. Tu proposes la solution la plus chère sans avoir cherché les autres. Le COPIL te le reprochera."
    ],
    "retenir": "Un risque se traite avant qu'il arrive, par la plus petite action qui suffit : registre, propriétaire, action datée. → module cp07"
  },
  {
    "id": "cp01-q09",
    "dialecte": "Gestion de projet",
    "q": "Tu prépares le reporting mensuel DEMAT. Tu viens d'apprendre que le jalon « recette » sera raté de 3 semaines. Le mois dernier, tout était vert. Que fais-tu ?",
    "choix": [
      "Tu restes en vert : tu as encore une chance de rattraper",
      "Tu passes en rouge, sans plus de détails, pour te couvrir",
      "Tu passes en orange, avec cause, impact et décision",
      "Tu restes en vert et tu préviens le DAF à l'oral"
    ],
    "bonne": 2,
    "pourquoi": [
      "Non. Le jour où le jalon tombe, le DAF découvre le retard. Tu perds sa confiance pour le reste du projet.",
      "Non. Un rouge sans explication inquiète sans aider. Le sponsor ne sait pas quoi décider.",
      "Oui. Une alerte tôt et honnête, avec une décision à prendre, laisse au sponsor le temps d'agir.",
      "Non. L'écrit dit « tout va bien », l'oral dit autre chose. Au COPIL, c'est le vert qui fera foi, et aucune décision n'est demandée."
    ],
    "retenir": "Une météo honnête et tôt, avec une décision à prendre, vaut mieux qu'un vert de façade. → module cp08"
  },
  {
    "id": "cp01-q10",
    "dialecte": "Gestion de projet",
    "q": "Le RACI dit : le DAF valide le format de facture. Le 3, tu lui as demandé sa validation en 3 lignes, date limite le 10. Relancé le 11. On est le 17 : rien. Sans validation vendredi, la date légale est en danger. Que fais-tu ?",
    "choix": [
      "Tu valides toi-même le format, pour ne pas perdre la date",
      "Tu attends son retour : c'est lui le valideur au RACI",
      "Tu le préviens, puis tu portes la décision au DG avec l'impact",
      "Tu fais valider par la cheffe comptable, elle connaît le format"
    ],
    "bonne": 2,
    "pourquoi": [
      "Non. Tu n'es pas le valideur. Et pas de décision par défaut ici : le format touche toute la compta. S'il est faux, tu portes seul l'erreur.",
      "Non. Le RACI ne dit pas d'attendre sans fin. Sa date limite est passée : vendredi, c'est la date légale qui recule.",
      "Oui. Demande courte, date limite dépassée, relance faite, date légale en jeu : tu montes au-dessus. Tu préviens d'abord le DAF, par écrit, pour qu'il ne le découvre pas.",
      "Non. Elle n'a pas ce rôle au RACI. Sa validation sera contestée, et tu la mets en porte-à-faux avec son chef."
    ],
    "retenir": "Valideur muet après une demande courte, date limite dépassée, enjeu légal : le prévenir, puis monter au-dessus, avec l'impact. → module cp09"
  },
  {
    "id": "cp01-q11",
    "dialecte": "Gestion de projet",
    "q": "À 2 semaines de la recette, le commercial demande : « Ajoutez aussi un tableau de suivi des factures rejetées pour mon équipe. » Que fais-tu ?",
    "choix": [
      "Tu dis oui : l'intégrateur l'ajoutera vite, c'est un petit développement",
      "Tu dis non : le périmètre est figé depuis le cadrage",
      "Tu acceptes une version simple, sans toucher au planning",
      "Tu chiffres l'impact, le sponsor arbitre, tu traces"
    ],
    "bonne": 3,
    "pourquoi": [
      "Non. « Vite » n'est jamais gratuit. Le délai et le budget glissent sans décision de personne.",
      "Non. La demande a peut-être de la valeur. Fermer la porte sans chiffrage braque le commercial.",
      "Non. Même « simple », l'ajout prend du temps à l'intégrateur et à la recette. Sans chiffrage ni décision du sponsor, le délai glisse en silence.",
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
      "Le devis de l'intégrateur plus un an d'abonnement",
      "Le prix de l'abonnement à la PA, par facture"
    ],
    "bonne": 1,
    "pourquoi": [
      "Non. Il manque l'abonnement, la maintenance et le temps de tes équipes. Le DAF découvrira les autres coûts plus tard.",
      "Oui. Le coût total (TCO) sur plusieurs années montre la vraie dépense. Le DAF peut budgéter sans surprise.",
      "Non. C'est mieux qu'un seul devis, mais il manque les années suivantes, la maintenance et le temps de tes équipes.",
      "Non. C'est un seul poste, et seulement le récurrent. Le coût du projet lui-même est oublié."
    ],
    "retenir": "Un coût se présente sur plusieurs années, tout compris (TCO), pas avec un seul devis. → module cp11"
  },
  {
    "id": "cp01-q13",
    "dialecte": "Gestion de projet",
    "q": "Le DAF veut séparer investissement (CAPEX) et fonctionnement (OPEX). Où ranges-tu l'abonnement annuel à la plateforme agréée (PA) ?",
    "choix": [
      "En investissement, car il est lié au projet",
      "En fonctionnement : c'est un service, pas un bien",
      "En investissement la 1re année, puis en fonctionnement",
      "Hors budget SI, car c'est la compta qui l'utilise"
    ],
    "bonne": 1,
    "pourquoi": [
      "Non. Le lien avec le projet ne suffit pas. Un abonnement payé chaque année est une charge, pas un investissement.",
      "Oui. Un abonnement paie un service : c'est une charge (OPEX). Le développement du connecteur peut, lui, être immobilisé : à voir avec le contrôle de gestion.",
      "Non. La nature de la dépense ne change pas avec l'année. Ce découpage fausse la comparaison des budgets.",
      "Non. Tu réponds « qui paie », pas « quelle nature ». Chez la compta ou à la DSI, un abonnement reste une charge (OPEX)."
    ],
    "retenir": "Abonnement à un service = OPEX ; développement ou licence achetée = souvent CAPEX. → module cp11"
  },
  {
    "id": "cp01-q14",
    "dialecte": "Gestion de projet",
    "q": "L'intégrateur travaille en régie. 60 % du budget est consommé pour 40 % du travail fait. Que fais-tu ?",
    "choix": [
      "Tu attends la facture finale pour voir l'écart réel",
      "Tu supprimes une partie de la recette pour tenir le budget",
      "Tu recalcules le reste à faire et tu alertes le sponsor",
      "Tu demandes à l'intégrateur un geste sur les jours en trop"
    ],
    "bonne": 2,
    "pourquoi": [
      "Non. À la fin, il est trop tard pour agir. La dérive est visible dès maintenant.",
      "Non. Tu tiens le budget mais tu prends un risque sur la mise en service. Et sans le dire au sponsor.",
      "Oui. Le reste à faire donne l'atterrissage réel. Le sponsor peut décider tôt : budget, périmètre ou délai.",
      "Non. En régie, il facture le temps passé : il ne te doit rien. Et l'atterrissage n'est ni calculé ni connu du sponsor."
    ],
    "retenir": "Suivre un budget : consommé + reste à faire = atterrissage. Alerter dès que l'écart apparaît. → module cp12"
  },
  {
    "id": "cp01-q15",
    "dialecte": "Gestion de projet",
    "q": "Tu dois choisir la plateforme agréée (PA). Le commercial pousse celle qu'utilise un ami. Que fais-tu ?",
    "choix": [
      "Tu prends la moins chère des plateformes proposées",
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
    "q": "Le DAF va signer avec la plateforme agréée (PA). Tu relis le contrat avant. En plus du prix, que vérifies-tu en priorité ?",
    "choix": [
      "La durée d'engagement la plus longue, pour avoir une remise",
      "Les SLA et la récupération des données en fin de contrat",
      "Le nombre de clients de la PA, pour être rassuré",
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
    "q": "Le devis de l'intégrateur n'est pas signé : le DAF le relit encore. L'intégrateur propose de démarrer lundi, « on régularisera après ». Que fais-tu ?",
    "choix": [
      "Tu acceptes : le devis sera signé, une semaine de gagnée",
      "Tu acceptes s'il note ses heures à part en attendant",
      "Tu dis non : pas de démarrage avant la commande signée",
      "Tu lui demandes de voir directement avec le DAF"
    ],
    "bonne": 2,
    "pourquoi": [
      "Non. Sans commande, rien n'est fixé : ni périmètre, ni prix. En cas de désaccord, tu n'as rien à lui opposer.",
      "Non. Des heures notées ne sont pas un engagement. Le périmètre et le prix restent flous, et la facture arrivera quand même.",
      "Oui. Sans commande signée, ni le périmètre ni le prix ne sont engagés. Tu tiens ce non, et tu aides le DAF à signer vite.",
      "Non. Tu sors du circuit. Le prestataire négocie avec le sponsor, et tu perds la main sur ton projet."
    ],
    "retenir": "Pas de démarrage d'un prestataire sans commande signée : elle fixe le périmètre, le prix et les responsabilités. → module cp15"
  },
  {
    "id": "cp01-q18",
    "dialecte": "Gestion de projet",
    "q": "La cheffe comptable doit tester les factures. Le DAF, son chef, l'a mise à 100 % sur la clôture. Que fais-tu ?",
    "choix": [
      "Tu lui demandes de venir tester en dehors de ses heures",
      "Tu fais la recette à sa place, tu connais les factures",
      "Tu négocies avec le DAF des créneaux fixes pour elle",
      "Tu préviens le DAF, puis tu fais arbitrer le DG"
    ],
    "bonne": 2,
    "pourquoi": [
      "Non. Tu la mets en porte-à-faux avec son chef. Et la recette faite en fin de journée sera bâclée.",
      "Non. Le métier n'aura pas validé. Les cas que toi tu ne connais pas sortiront en production.",
      "Oui. Tu n'as pas d'autorité sur elle : tu négocies avec son manager, avec le coût de chaque option. S'il refuse en connaissant ce coût, c'est sa décision : tu l'appliques.",
      "Non. Prévenir ne suffit pas : le DAF, ton sponsor, n'a pas encore vu le coût de son choix. Tu passes au-dessus de lui avant de le lui montrer, et tu perds sa confiance."
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
      "Un mail de 2 pages, avec le détail technique en annexe",
      "À l'oral, sans support, pour ne pas laisser de trace écrite"
    ],
    "bonne": 1,
    "pourquoi": [
      "Non. La direction ne lit pas le XML. Elle repart sans savoir ce qu'elle doit décider.",
      "Oui. La direction veut des euros, des risques et une décision. Une page suffit.",
      "Non. La direction lit le début d'un mail. Sans euros ni décision attendue en tête, elle ne sait pas quoi trancher.",
      "Non. Sans trace, chacun retiendra sa version. La décision prise sera contestée plus tard."
    ],
    "retenir": "À la direction : euros, risques, décision attendue, sur une page. → module cp17"
  },
  {
    "id": "cp01-q20",
    "dialecte": "Gestion de projet",
    "q": "Le directeur général veut avancer la mise en service DEMAT d'un mois. Ton planning n'a pas un mois de marge. Que fais-tu ?",
    "choix": [
      "Tu dis oui, puis tu négocies plus tard avec l'équipe et le prestataire",
      "Tu proposes des options, chacune avec son coût et son risque",
      "Tu dis non : le planning a été validé en COPIL",
      "Tu acceptes 2 semaines d'avance, pour couper la poire en deux"
    ],
    "bonne": 1,
    "pourquoi": [
      "Non. Le « oui » devient un engagement. Tu le rateras, et ce sera ta faute, pas celle de la demande.",
      "Oui. Tu dis non à « même projet, même coût, un mois plus tôt » et tu montres le prix de chaque option (réduire le périmètre, renforcer, accepter un risque). Le DG choisit.",
      "Non. Un non sans options, même justifié, braque le DG. Il pensera que tu protèges ton confort.",
      "Non. Tu promets 2 semaines que ton planning n'a pas, sans dire ce qu'elles coûtent. Le DG n'a rien choisi, et tu les rateras."
    ],
    "retenir": "Dire non, c'est proposer des options avec leur prix, et laisser décider. → module cp18"
  },
  {
    "id": "cp01-q21",
    "dialecte": "Gestion de projet",
    "q": "Une facture AquaBleu est déjà émise via la plateforme agréée (PA), avec un mauvais prix. Le commercial te demande de la modifier, « pour éviter un avoir ». Que fais-tu ?",
    "choix": [
      "Tu fais corriger la facture émise en base par l'intégrateur",
      "Tu acceptes si le DAF te donne son accord par écrit",
      "Tu dis non : une facture émise ne se modifie pas",
      "Tu en parles au COPIL du mois prochain avant de répondre"
    ],
    "bonne": 2,
    "pourquoi": [
      "Non. La facture est déjà chez le client. La changer en base crée deux versions différentes de la même facture : c'est illégal.",
      "Non. L'accord du DAF ne rend pas la modification légale. Vous seriez deux à porter la faute.",
      "Oui. Une facture émise ne se modifie pas : on la corrige par un avoir (ou une facture rectificative). Tu l'expliques au commercial : c'est la loi, pas ton choix.",
      "Non. La réponse est déjà connue : c'est la loi. Attendre un mois laisse le client avec une facture fausse."
    ],
    "retenir": "Une demande illégale se refuse net, en donnant la règle et la bonne voie (ici, l'avoir). → module cp18"
  },
  {
    "id": "cp01-q22",
    "dialecte": "Gestion de projet",
    "q": "L'intégrateur dit : « Nos tests sont bons, on peut passer en production. » Que fais-tu ?",
    "choix": [
      "Tu lui fais confiance : il connaît Divalto mieux que toi",
      "Tu fais faire une recette métier, avec PV signé",
      "Tu testes toi-même quelques factures pour vérifier",
      "Tu passes en production si la compta valide 3 factures"
    ],
    "bonne": 1,
    "pourquoi": [
      "Non. Ses tests vérifient ce qu'il a fait, pas ce dont le métier a besoin. Ce n'est pas une recette.",
      "Oui. La comptabilité valide sur ses cas réels, avec des critères d'acceptation. Le PV signé engage chacun.",
      "Non. Tu ne connais pas tous les cas de la compta. Et ton test ne vaut pas validation métier.",
      "Non. Trois factures ne couvrent pas les cas de la compta (avoirs, rejets, clients EDI). Sans critères ni PV, ce n'est pas une recette."
    ],
    "retenir": "La recette, c'est le métier qui valide sur ses cas, avec un PV signé. → module cp19"
  },
  {
    "id": "cp01-q23",
    "dialecte": "Gestion de projet",
    "q": "Tu reprends 2 000 fiches clients (SIREN, adresse de facturation) pour la plateforme agréée (PA). Comment contrôles-tu la reprise ?",
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
      "Tu compares aux critères de go et tu recommandes, il tranche",
      "Tu bascules quand même et tu corriges pendant l'hypercare"
    ],
    "bonne": 2,
    "pourquoi": [
      "Non. Le sponsor décide, mais il doit décider en connaissant les risques. C'est à toi de les montrer.",
      "Non. La décision ne t'appartient pas seule. Le sponsor doit pouvoir choisir en connaissant les faits.",
      "Oui. Critères fixés avant, écarts, retour arrière, puis ta recommandation (ici no-go si le critère était « 0 anomalie majeure »). Le DAF décide en connaissant le plan de repli.",
      "Non. Deux anomalies majeures sur de vraies factures, ce n'est pas de l'hypercare. C'est un incident annoncé."
    ],
    "retenir": "Go / no-go : comparer aux critères fixés avant, montrer le retour arrière, recommander ; le sponsor décide. → module cp21"
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
      "Oui. On traite l'inquiétude en face, avec du concret. Une utilisatrice clé porte le changement de l'intérieur. Ne promets rien sur l'emploi : le DAF doit répondre à ce point, avec toi.",
      "Non. Trop tôt, la formation est oubliée. Et elle ne répond pas à l'inquiétude.",
      "Non. Le DAF répond sur l'emploi, mais l'adoption est ton résultat : vous y allez ensemble."
    ],
    "retenir": "Le changement se prépare avec les gens : écouter, montrer le concret, s'appuyer sur des utilisateurs clés. → module cp23"
  },
  {
    "id": "cp01-q27",
    "dialecte": "Gestion de projet",
    "q": "L'intégrateur demande une copie complète de la base clients de production pour ses tests. Que fais-tu ?",
    "choix": [
      "Tu l'envoies : il a signé un accord de confidentialité",
      "Tu n'acceptes que des données inventées de toutes pièces",
      "Tu l'envoies par mail chiffré, c'est sécurisé",
      "Tu donnes le minimum utile, contacts masqués"
    ],
    "bonne": 3,
    "pourquoi": [
      "Non. La confidentialité ne suffit pas. Le RGPD demande de limiter les données au besoin réel.",
      "Non. Des données toutes inventées testent mal tes vrais cas : SIREN, adresses, clients EDI. On réduit et on masque les personnes, on n'invente pas tout.",
      "Non. Le chiffrement protège le transport, pas le fond : tu envoies quand même trop de données.",
      "Oui. Tu limites les données au besoin. Les SIREN des sociétés peuvent rester réels ; on masque les personnes (noms, e-mails des contacts). Vérifie aussi le contrat du prestataire (sous-traitant RGPD) et demande l'avis du DPO, ou du référent RGPD s'il n'y a pas de DPO."
    ],
    "retenir": "Données personnelles en projet : donner le minimum utile, et vérifier le cadre du prestataire. → module cp24"
  },
  {
    "id": "cp01-q28",
    "dialecte": "Gestion de projet",
    "q": "Tu es DSI adjoint. Trois projets demandés, de la place pour deux : DEMAT (obligation légale), tableaux Power BI des ventes, refonte de l'intranet. Que fais-tu ?",
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
    "q": "Tu es DSI adjoint. Ton analyste a changé en production le paramétrage du connecteur, sans ticket ni test, « pour aller vite ». Rien n'a cassé. C'est la 1re fois. Le DSI, furieux, te dit : « Règle ça aujourd'hui. » Que fais-tu ?",
    "choix": [
      "Tu ne dis rien : rien n'a cassé et il voulait bien faire",
      "Tu le vois seul aujourd'hui : c'est interdit, et tu dis pourquoi",
      "Tu en parles à la prochaine réunion, sans le nommer",
      "Tu demandes aujourd'hui aux RH de lui faire un avertissement écrit"
    ],
    "bonne": 1,
    "pourquoi": [
      "Non. Il comprend que la règle est facultative. La prochaine fois, c'est la facturation qui cassera.",
      "Oui. Un 1er écart sur la production se recadre vite et net, en tête-à-tête : la règle, sa raison, ce que tu attends. Tu en rends compte au DSI. S'il recommence, tu passes à l'écrit.",
      "Non. Un message général ne touche pas la bonne personne. Et l'équipe voit que tu évites le sujet.",
      "Non. Une sanction pour un 1er écart, de bonne foi et sans dégât, c'est trop fort. Il retiendra la peur, pas la règle, et cachera ses prochaines erreurs."
    ],
    "retenir": "Un écart grave, la 1re fois : le recadrer le jour même, seul à seul, avec la règle et son pourquoi. Ni silence, ni sanction d'emblée. → module cp26"
  },
  {
    "id": "cp01-q30",
    "dialecte": "Gestion de projet",
    "q": "Tu es DSI adjoint. Le directeur général demande pourquoi le budget SI augmente de 15 % l'an prochain. Que présentes-tu ?",
    "choix": [
      "Le détail des licences et des contrats, ligne par ligne",
      "Que ce budget est incompressible : tout est déjà engagé",
      "La hausse par nature, sa valeur, et des options",
      "Une baisse de 5 % proposée d'avance, pour montrer ta bonne volonté"
    ],
    "bonne": 2,
    "pourquoi": [
      "Non. Le DG ne peut rien décider sur 200 lignes. Il repart sans comprendre la hausse.",
      "Non. « Incompressible » ferme la discussion. Le DG coupera au hasard, sans toi.",
      "Oui. Le DG voit ce qui est subi, ce qui est choisi, ce que ça rapporte, et ce qu'il peut couper avec quelle conséquence.",
      "Non. Tu coupes avant de savoir ce qui est subi ou choisi. Le DG ne voit ni la valeur du budget ni le risque de ta coupe."
    ],
    "retenir": "Défendre un budget SI : par nature (run, projets, obligations), en valeur, avec des options. → module cp27"
  }
];
