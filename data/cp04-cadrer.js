// Chef de projet SI — Questions du module cp04 « Cadrer un projet ».
// Mises en situation. Fil rouge DEMAT 2027 : négociant en équipement de piscines, 120 salariés, ERP Divalto,
// passage à la facture électronique.
LEARNSQL.questions.cp04 = [
  {
    id: "cp04-q01", dialecte: "Gestion de projet",
    q: "Le DAF te dit : « On passe à la facture électronique, lance le projet. » Tu n'as rien d'autre. Que fais-tu en premier ?",
    choix: [
      "Tu écris une note de cadrage et tu la fais valider",
      "Tu demandes vite des devis à trois plateformes agréées",
      "Tu lances l'intégrateur Divalto sur le connecteur",
      "Tu fais un planning détaillé jusqu'à la bascule"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Il faut d'abord un accord écrit sur l'objectif, le périmètre et les limites, validé par le DAF.",
      "Non. Sans périmètre ni critères, tu ne sais pas quoi demander : les devis ne seront pas comparables.",
      "Non. Tu engages du budget sur une solution avant de savoir ce que le projet doit couvrir.",
      "Non. Un planning détaillé sans périmètre validé sera faux dès la première semaine."
    ],
    retenir: "Avant de dépenser ou de planifier : cadrer, puis faire valider par le sponsor."
  },
  {
    id: "cp04-q02", dialecte: "Gestion de projet",
    q: "Dans ta note de cadrage DEMAT 2027, l'objectif est : « Installer la plateforme X et son connecteur Divalto. » Quel est le principal problème ?",
    choix: [
      "Il manque la date de mise en service",
      "Il est trop court pour un vrai objectif",
      "Il ne cite pas le nom de l'intégrateur",
      "Il décrit une solution, pas le résultat attendu"
    ],
    bonne: 3,
    pourquoi: [
      "Non. La date compte, mais le vrai défaut est ailleurs : la phrase impose déjà un outil.",
      "Non. Un objectif court est une qualité, s'il décrit le résultat attendu.",
      "Non. Le nom d'un prestataire n'a rien à faire dans l'objectif.",
      "Oui. L'objectif doit dire quoi obtenir et pourquoi. Nommer l'outil empêche de comparer d'autres plateformes."
    ],
    retenir: "Objectif = résultat attendu et sa raison, pas le nom d'un outil."
  },
  {
    id: "cp04-q03", dialecte: "Gestion de projet",
    q: "Ton projet DEMAT 2027 a un critère de succès : « Les comptables sont satisfaits de la nouvelle solution. » Que fais-tu ?",
    choix: [
      "Tu le remplaces par un seuil chiffré et sa mesure",
      "Tu le supprimes : seuls la date et le coût comptent",
      "Tu le gardes : la satisfaction des utilisateurs compte",
      "Tu demandes à la cheffe comptable de le valider"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Par exemple : clôture toujours faite en 5 jours, ou note d'enquête d'au moins 7/10, avec qui mesure et comment.",
      "Non. La qualité perçue par les métiers compte aussi. Il faut la rendre mesurable, pas la supprimer.",
      "Non. Tel quel, personne ne pourra dire s'il est atteint : il créera un débat en fin de projet.",
      "Non. Même validé, un critère flou reste impossible à vérifier."
    ],
    retenir: "Un critère de succès se mesure : chiffre, seuil, date, et façon de le mesurer."
  },
  {
    id: "cp04-q04", dialecte: "Gestion de projet",
    q: "Ta note de cadrage DEMAT 2027 liste le périmètre : factures clients et fournisseurs, 3 sites, connecteur Divalto, formation compta. Que manque-t-il de plus important ?",
    choix: [
      "La liste des champs du format Factur-X",
      "Le nom des formateurs de la comptabilité",
      "Le hors périmètre écrit noir sur blanc",
      "Le détail des tâches de l'intégrateur"
    ],
    bonne: 2,
    pourquoi: [
      "Non. C'est un détail de conception, pas un élément de cadrage.",
      "Non. C'est de l'organisation, trop fin pour une note de cadrage.",
      "Oui. Sans hors périmètre, chacun suppose que son besoin est inclus (notes de frais, BL, export…).",
      "Non. Le détail des tâches vient à la planification, pas au cadrage."
    ],
    retenir: "Ce qui n'est pas écrit hors périmètre finira par être demandé."
  },
  {
    id: "cp04-q05", dialecte: "Gestion de projet",
    q: "Trois mois après le lancement de DEMAT 2027, un commercial demande d'ajouter les bons de livraison dématérialisés. La note validée les met hors périmètre. Que fais-tu ?",
    choix: [
      "Tu acceptes : c'est un petit ajout et ça fait plaisir",
      "Tu rappelles que la note l'exclut et tu clos le sujet",
      "Tu chiffres l'impact et tu le soumets au sponsor",
      "Tu le notes pour une phase 2, sans en parler"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Les petits ajouts s'empilent et font glisser délai et budget sans décision de personne.",
      "Non. La note sert à cadrer la discussion, pas à fermer la porte : le besoin est peut-être réel.",
      "Oui. Tu traites la demande comme un changement : impact sur délai et coût, puis décision du DAF.",
      "Non. Le demandeur croit être entendu, le sponsor n'en sait rien : le sujet reviendra mal."
    ],
    retenir: "Une demande hors cadre devient une demande de changement : impact, puis décision du sponsor."
  },
  {
    id: "cp04-q06", dialecte: "Gestion de projet",
    q: "Qui doit valider la note de cadrage du projet DEMAT 2027 ?",
    choix: [
      "Le DAF, sponsor du projet",
      "L'intégrateur Divalto",
      "La cheffe comptable, la plus touchée",
      "Toi, le chef de projet"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Le sponsor porte le projet, finance et arbitre : sa validation donne le mandat.",
      "Non. Le prestataire exécute, il ne décide pas du périmètre du client.",
      "Non. Elle doit être consultée, mais elle ne porte ni le budget ni les arbitrages.",
      "Non. Tu rédiges la note, mais tu ne peux pas te donner un mandat à toi-même."
    ],
    retenir: "Le chef de projet rédige, le sponsor valide."
  },
  {
    id: "cp04-q07", dialecte: "Gestion de projet",
    q: "Tu envoies la note de cadrage au DAF. Il répond en 2 minutes : « OK, vas-y. » Tu sens qu'il ne l'a pas lue. Que fais-tu ?",
    choix: [
      "Tu lances : il a validé par écrit, donc tu es couvert",
      "Tu attends qu'il la relise, sans rien démarrer",
      "Tu demandes 20 minutes pour valider 3 points clés",
      "Tu fais valider la note par la cheffe comptable"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Un « OK » sans lecture ne le protège pas lui, ni toi : au premier arbitrage, il découvrira le périmètre.",
      "Non. Attendre sans rien demander bloque le projet sans rien obtenir.",
      "Oui. Tu le fais réagir sur le hors périmètre, le budget et les critères : la validation devient réelle.",
      "Non. Elle n'a pas le pouvoir d'arbitrer à la place du sponsor."
    ],
    retenir: "Un sponsor qui signe sans lire n'a pas vraiment validé : fais-le réagir sur les points clés."
  },
  {
    id: "cp04-q08", dialecte: "Gestion de projet",
    q: "Dans ta note DEMAT 2027, tu écris : « L'intégrateur livre le connecteur standard en version 10.13. » Personne ne l'a confirmé. Comment le classer ?",
    choix: [
      "Une contrainte du projet",
      "Un critère de succès",
      "Une hypothèse à vérifier",
      "Un livrable du projet"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Une contrainte est imposée et connue. Ici, c'est une supposition.",
      "Non. C'est un moyen, pas le résultat attendu par le métier.",
      "Oui. On la suppose vraie sans preuve. Si elle tombe, le plan change : on la vérifie vite avec l'intégrateur.",
      "Non. Le connecteur sera un livrable, mais la phrase porte sur une supposition non confirmée."
    ],
    retenir: "Hypothèse = supposé vrai sans preuve. On l'écrit et on la vérifie vite."
  },
  {
    id: "cp04-q09", dialecte: "Gestion de projet",
    q: "Pour DEMAT 2027, l'échéance légale d'émission des factures électroniques s'impose à l'entreprise. Dans la note de cadrage, c'est :",
    choix: [
      "Une contrainte",
      "Une hypothèse",
      "Un risque projet",
      "Un enjeu secondaire"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Elle est imposée et non négociable : le planning se construit à rebours depuis cette date.",
      "Non. Elle n'est pas supposée : elle est fixée par la loi.",
      "Non. Le risque, c'est de ne pas tenir la date. La date elle-même est une contrainte.",
      "Non. Une obligation légale avec sanctions est un enjeu majeur."
    ],
    retenir: "Contrainte = imposée de l'extérieur, non négociable."
  },
  {
    id: "cp04-q10", dialecte: "Gestion de projet",
    q: "Le DAF veut commander l'intégrateur lundi. Tu as rédigé seul la note DEMAT 2027 en une matinée, sans voir la compta ni les ventes. Que fais-tu d'ici lundi ?",
    choix: [
      "Tu l'envoies au DAF : il faut tenir son calendrier",
      "Tu demandes un mois de plus pour bien cadrer",
      "Tu laisses commander et tu complètes la note après",
      "Tu fais relire compta et ventes, puis tu l'envoies"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Une note écrite sans les métiers rate leurs vrais besoins : tu découvriras les écarts en recette.",
      "Non. Quelques relectures courtes tiennent avant lundi. Repousser d'un mois sans raison use la confiance du sponsor.",
      "Non. Une fois commandé, l'intégrateur travaille sur ta note incomplète : chaque écart deviendra un avenant payant.",
      "Oui. Deux ou trois relectures courtes d'ici lundi repèrent les besoins oubliés, sans bloquer le DAF."
    ],
    retenir: "Cadrer trop vite, sans les métiers, c'est découvrir les besoins en recette."
  },
  {
    id: "cp04-q11", dialecte: "Gestion de projet",
    q: "Au cadrage de DEMAT 2027, le DAF te demande « le budget ». Tu as peu d'éléments. Que donnes-tu ?",
    choix: [
      "Un chiffre précis, pour le rassurer",
      "Rien tant que les devis ne sont pas reçus",
      "Le budget prévu l'an dernier, tel quel",
      "Une fourchette et sa marge d'incertitude"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Un chiffre précis sans base devient une promesse : au premier écart, tu perds la confiance.",
      "Non. Le sponsor a besoin d'un ordre de grandeur pour décider de lancer ou non.",
      "Non. Un budget non construit pour ce projet n'a aucune base.",
      "Oui. Par exemple 60 à 90 k€, avec ce qui fait varier le chiffre. On l'affine à chaque étape."
    ],
    retenir: "Au cadrage, le budget est une fourchette avec sa marge d'incertitude."
  },
  {
    id: "cp04-q12", dialecte: "Gestion de projet",
    q: "La cheffe comptable veut d'abord la réception des factures fournisseurs, le commercial d'abord l'émission des factures clients. La loi impose les deux. Que fais-tu ?",
    choix: [
      "Tu suis le commercial : il apporte le chiffre d'affaires",
      "Tu mènes les deux de front, sans ordre de priorité",
      "Tu demandes au DAF de choisir, sans donner ton avis",
      "Tu recommandes la réception d'abord, le DAF valide"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Le chiffre d'affaires ne change pas la loi : la réception est déjà obligatoire, l'émission vient un an après.",
      "Non. Sans ordre, les deux chantiers se gênent et la compta sature : tu risques de tenir mal les deux dates.",
      "Non. Tu lui renvoies le problème sans éclairage : le sponsor attend une recommandation.",
      "Oui. La réception est obligatoire depuis le 1er septembre 2026 : elle est déjà en retard. Tu recommandes avec la raison, le DAF décide, c'est tracé."
    ],
    retenir: "Deux obligations à des dates différentes : tu recommandes un ordre avec sa raison, le sponsor valide."
  },
  {
    id: "cp04-q13", dialecte: "Gestion de projet",
    q: "Ta note de cadrage DEMAT 2027 fait 40 pages, avec le détail de chaque écran. Le DAF ne l'a pas lue. Quel est le problème ?",
    choix: [
      "Elle mélange note de cadrage et spécifications",
      "Elle manque encore de captures d'écran Divalto",
      "Le DAF n'a pas pris son rôle de sponsor au sérieux",
      "Il fallait l'envoyer aussi à l'intégrateur Divalto"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Une note de cadrage tient en quelques pages : le détail vient ensuite, dans les spécifications.",
      "Non. Ajouter du détail aggrave le problème.",
      "Non. Le sponsor a peu de temps : c'est au chef de projet de lui donner un document lisible.",
      "Non. Le public n'est pas le sujet : le document est trop lourd pour décider."
    ],
    retenir: "Cadrer, ce n'est pas spécifier : quelques pages, lisibles par le sponsor."
  },
  {
    id: "cp04-q14", dialecte: "Gestion de projet",
    q: "Le DAF valide ta note DEMAT 2027. Un mois plus tard, on découvre que les clients EDI de la grande distribution ne sont pas prêts. Que fais-tu de la note ?",
    choix: [
      "Rien : elle est validée, on ne la touche plus",
      "Tu la modifies discrètement pour qu'elle colle",
      "Tu proposes un avenant, validé par le DAF",
      "Tu la jettes : le projet a changé de nature"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Une note qui ne reflète plus la réalité ne sert plus de référence.",
      "Non. Modifier sans décision tracée te retire ta base pour dire non plus tard.",
      "Oui. La note évolue, mais par une décision tracée du sponsor, avec l'impact sur délai et coût.",
      "Non. Le cadre reste utile : on l'ajuste, on ne repart pas de zéro."
    ],
    retenir: "La note peut évoluer, mais par décision tracée du sponsor, jamais par glissement."
  },
  {
    id: "cp04-q15", dialecte: "Gestion de projet",
    q: "Dans ta note DEMAT 2027, lequel de ces éléments est un livrable ?",
    choix: [
      "Réduire le temps de saisie des factures",
      "La disponibilité de la compta en été",
      "Le connecteur Divalto recetté",
      "Le choix d'une démarche agile"
    ],
    bonne: 2,
    pourquoi: [
      "Non. C'est un bénéfice attendu, à mesurer avec un critère de succès.",
      "Non. C'est une contrainte (ou un risque) sur les ressources.",
      "Oui. C'est une chose concrète que l'on remet et que l'on peut vérifier.",
      "Non. C'est une façon de travailler, pas un résultat remis."
    ],
    retenir: "Livrable = chose concrète, remise et vérifiable."
  },
  {
    id: "cp04-q16", dialecte: "Gestion de projet",
    q: "Ton DAF, sponsor de DEMAT 2027, annule les trois derniers comités de pilotage. Deux arbitrages attendent. Que fais-tu ?",
    choix: [
      "Tu tranches seul pour ne pas bloquer le projet",
      "Tu attends le prochain comité, sans relancer",
      "Tu demandes au DG de trancher les 2 arbitrages",
      "Tu lui demandes 15 minutes sur les 2 arbitrages"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Tu prends des décisions qui ne sont pas les tiennes : il pourra les contester ensuite.",
      "Non. Le projet dérive pendant que tu attends, et tu n'as rien signalé.",
      "Non. Tu passes au-dessus du sponsor sans lui avoir laissé une chance de trancher. L'escalade vient si, malgré une demande courte et une date limite, rien ne bouge.",
      "Oui. Tu lui facilites la décision : options, impact, date limite. S'il ne tranche pas, tu l'écris."
    ],
    retenir: "Sponsor absent : rends la décision facile et courte, et trace l'absence de décision."
  },
  {
    id: "cp04-q17", dialecte: "Gestion de projet",
    q: "Laquelle de ces phrases est un critère de succès bien écrit pour DEMAT 2027 ?",
    choix: [
      "Moins de 2 % de rejets le 1er mois après la bascule",
      "Faciliter le travail de la comptabilité",
      "Améliorer la gestion des factures",
      "Une solution moderne et facile à utiliser"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Un chiffre, une période : on peut dire « atteint » ou « pas atteint ».",
      "Non. « Faciliter » est un souhait, pas un seuil.",
      "Non. « Améliorer » ne dit ni de combien ni comment on le vérifie.",
      "Non. « Moderne » et « facile » ne se mesurent pas tels quels."
    ],
    retenir: "Bannir « améliorer », « faciliter » : un critère a un chiffre et une date."
  },
  {
    id: "cp04-q18", dialecte: "Gestion de projet",
    q: "Tu prépares la note DEMAT 2027. L'intégrateur Divalto te propose de rédiger lui-même la note de cadrage. Que réponds-tu ?",
    choix: [
      "Oui : il connaît mieux Divalto que toi",
      "Oui, et tu la reprends à ton nom ensuite",
      "Non, mais tu lui demandes son avis technique",
      "Non : il ne doit pas du tout participer"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Il cadrera ce qu'il sait vendre et livrer, pas forcément le besoin de l'entreprise.",
      "Non. Reprendre à ton nom un texte écrit par le prestataire, c'est lui laisser fixer le périmètre.",
      "Oui. La note exprime le besoin du client. L'avis de l'intégrateur sert à repérer contraintes et risques.",
      "Non. Il connaît les contraintes techniques : se priver de son avis crée des hypothèses fausses."
    ],
    retenir: "Le client cadre son besoin ; le prestataire éclaire, il ne fixe pas le périmètre."
  },
  {
    id: "cp04-q19", dialecte: "Gestion de projet",
    q: "En lisant ta note DEMAT 2027, le DAF demande : « Et si on ne faisait rien ? » Quelle partie de la note doit lui répondre ?",
    choix: [
      "Le périmètre",
      "Les hypothèses",
      "Les livrables",
      "Les enjeux"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Le périmètre dit ce qu'on fait, pas ce qu'on risque à ne rien faire.",
      "Non. Les hypothèses décrivent ce que l'on suppose vrai.",
      "Non. Les livrables décrivent ce qui sera remis.",
      "Oui. Les enjeux disent ce que l'on gagne ou risque : sanctions, clients EDI perdus, surcharge compta."
    ],
    retenir: "Les enjeux répondent à « pourquoi maintenant, et que risque-t-on sans ce projet ? »."
  },
  {
    id: "cp04-q20", dialecte: "Gestion de projet",
    q: "Dans ta note DEMAT 2027, tu listes les premiers risques. Que mets-tu ?",
    choix: [
      "Les 3 à 5 plus gros, avec une idée de parade",
      "Tous les risques possibles, même les plus petits",
      "Aucun : on les analysera en phase de conception",
      "Seulement les risques techniques du connecteur"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Par exemple : plateforme en retard, clients EDI pas prêts, compta saturée en clôture.",
      "Non. Une liste trop longue noie les vrais risques : le sponsor ne retient rien.",
      "Non. Le sponsor doit connaître les gros risques avant de valider, pas après.",
      "Non. Les plus gros risques sont souvent humains, organisationnels ou liés aux prestataires."
    ],
    retenir: "Au cadrage : les 3 à 5 plus gros risques, tous types, avec une première parade."
  },
  {
    id: "cp04-q21", dialecte: "Gestion de projet",
    q: "Le commercial te dit : « Moi je veux juste que ça marche. » Il refuse de participer au cadrage de DEMAT 2027. Que fais-tu ?",
    choix: [
      "Tu l'oublies : il ne veut pas être impliqué",
      "Tu écris ses besoins à sa place, par déduction",
      "Tu demandes au DAF de l'obliger à venir",
      "Tu lui demandes 3 cas qui ne doivent pas casser"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Ses clients EDI sont touchés : s'il découvre le résultat à la bascule, il bloquera.",
      "Non. Tes suppositions deviennent des hypothèses fausses, et il ne les reconnaîtra pas.",
      "Non. Escalader dès le premier refus abîme la relation pour tout le projet.",
      "Oui. Tu lui demandes peu, sur son terrain : quels clients, quels flux, quel délai. Ça devient des critères."
    ],
    retenir: "Une partie prenante réticente : demande-lui peu, sur son terrain, et traduis-le en critères."
  },
  {
    id: "cp04-q22", dialecte: "Gestion de projet",
    q: "Ta note DEMAT 2027 contient objectif, périmètre, hors périmètre, livrables, critères, budget et jalons. Que manque-t-il pour piloter ?",
    choix: [
      "Le détail des écrans de saisie",
      "Le choix définitif de la plateforme agréée",
      "La gouvernance : qui décide, où et quand",
      "Les procédures comptables rédigées"
    ],
    bonne: 2,
    pourquoi: [
      "Non. C'est de la conception, pas du cadrage.",
      "Non. Le choix de la plateforme est une étape du projet, pas un prérequis du cadrage.",
      "Oui. Sans comité de pilotage ni rôles de décision, personne ne sait qui arbitre en cas de problème.",
      "Non. Ce sont des livrables à produire pendant le projet."
    ],
    retenir: "La gouvernance dit qui décide quoi, et dans quelle instance."
  },
  {
    id: "cp04-q23", dialecte: "Gestion de projet",
    q: "Une collègue te dit : « La note de cadrage, c'est de la paperasse, on sait tous ce qu'on doit faire. » À quoi sert-elle vraiment ?",
    choix: [
      "À faire plaisir au DAF qui aime les documents",
      "À servir de base pour décider et dire non",
      "À remplacer le cahier des charges détaillé",
      "À protéger le chef de projet en cas d'échec"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Elle a un usage concret tout au long du projet, pas un rôle de forme.",
      "Oui. Elle fixe l'accord de départ : chaque nouvelle demande se compare à elle.",
      "Non. Elle vient avant, à un niveau plus haut. Le détail vient ensuite.",
      "Non. La voir comme un « parapluie » est un travers : elle sert d'abord à aligner tout le monde."
    ],
    retenir: "La note de cadrage est l'accord de référence pour arbitrer toutes les demandes suivantes."
  },
  {
    id: "cp04-q24", dialecte: "Gestion de projet",
    q: "Pour DEMAT 2027, la plateforme agréée annonce un retard de deux mois sur son API. Où ce point aurait-il dû apparaître dès le cadrage ?",
    choix: [
      "Dans le hors périmètre",
      "Dans l'objectif du projet",
      "Dans les critères de succès",
      "Dans les premiers risques"
    ],
    bonne: 3,
    pourquoi: [
      "Non. La connexion à la plateforme fait partie du projet : elle n'est pas hors périmètre.",
      "Non. L'objectif dit le résultat attendu, pas ce qui peut mal tourner.",
      "Non. Les critères mesurent le résultat, pas ce qui peut le menacer.",
      "Oui. Un prestataire en retard est un risque classique : on le note avec une parade sur le délai (jalon d'alerte, plan B, marge)."
    ],
    retenir: "Dépendance à un prestataire = risque à écrire dès le cadrage."
  },
  {
    id: "cp04-q25", dialecte: "Gestion de projet",
    q: "Ton projet de migration Divalto est cadré. Le DAF demande d'y ajouter « juste » la refonte du plan comptable. Que fais-tu ?",
    choix: [
      "Tu chiffres l'impact et tu le fais arbitrer",
      "Tu l'ajoutes : c'est le sponsor qui le demande",
      "Tu dis non : la refonte mérite son propre projet",
      "Tu acceptes et tu demandes plus de temps après"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Tu montres ce que l'ajout coûte : il décide en connaissance de cause, et c'est tracé.",
      "Non. Même le sponsor doit voir l'impact sur délai, coût et risques avant de décider.",
      "Non. Ton avis se défend, mais le sponsor a le droit de changer le périmètre : tu montres l'impact, tu ne décides pas à sa place.",
      "Non. Dire oui puis négocier : tu as déjà perdu ta position."
    ],
    retenir: "Même le sponsor change le périmètre par une décision éclairée : impact d'abord."
  },
  {
    id: "cp04-q26", dialecte: "Gestion de projet",
    q: "Au cadrage de DEMAT 2027, le DAF veut un planning jour par jour jusqu'à la bascule. Que proposes-tu ?",
    choix: [
      "Le planning complet, même s'il sera faux",
      "La date légale comme seule date du projet",
      "Aucune date tant que la plateforme n'est pas choisie",
      "Les jalons clés, détaillés à l'étape suivante"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Un détail sans base donne une fausse précision, et tu devras le défendre.",
      "Non. Une seule date ne permet pas de voir un retard avant qu'il soit trop tard.",
      "Non. Sans aucune date, le sponsor ne peut pas juger si l'échéance est tenable.",
      "Oui. Plateforme et réception actives, connecteur recetté, pilote, bascule : le détail vient à la planification."
    ],
    retenir: "Au cadrage : des jalons clés. Le planning détaillé vient ensuite."
  },
  {
    id: "cp04-q27", dialecte: "Gestion de projet",
    q: "Ta note DEMAT 2027 contient : « Hypothèse : la compta peut consacrer 2 jours par semaine au projet. » Que fais-tu ensuite ?",
    choix: [
      "Tu la fais confirmer par la cheffe comptable",
      "Rien : elle est écrite, c'est suffisant",
      "Tu la notes aussi en risque, sans la vérifier",
      "Tu la retires : c'est trop incertain"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Tu la fais confirmer par la cheffe comptable, et le DAF la valide dans la note. Si elle est fausse, tu ajustes le plan.",
      "Non. Une hypothèse non vérifiée est un risque caché : elle tombera en pleine clôture.",
      "Non. La noter en risque ne la vérifie pas : une question de 10 minutes à la cheffe comptable lève le doute.",
      "Non. La retirer ne fait pas disparaître le problème : tu le caches."
    ],
    retenir: "Une hypothèse s'écrit, puis se vérifie vite."
  },
  {
    id: "cp04-q28", dialecte: "Gestion de projet",
    q: "Ton projet EDI (nouveaux flux avec AquaBleu) a des critères de succès chiffrés, mais personne ne sait comment les mesurer. Que manque-t-il ?",
    choix: [
      "Un outil de BI dédié au projet",
      "La source et le responsable de la mesure",
      "Un seuil plus ambitieux pour motiver",
      "La validation de chaque critère par AquaBleu"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Un outil de plus n'est pas nécessaire : un rapport existant suffit souvent.",
      "Oui. Pour chaque critère : d'où vient le chiffre (rapport, journal EDI) et qui le mesure.",
      "Non. Le seuil n'est pas le problème : sans mesure, aucun seuil n'est vérifiable.",
      "Non. Le client n'a pas à valider tes critères internes. Il manque la façon de mesurer."
    ],
    retenir: "Un critère chiffré sans source ni responsable de mesure reste invérifiable."
  },
  {
    id: "cp04-q29", dialecte: "Gestion de projet",
    q: "Dans la note DEMAT 2027, la cheffe comptable veut que « l'inutile » soit hors périmètre, sans plus de détail. Que fais-tu ?",
    choix: [
      "Tu acceptes la formule telle quelle",
      "Tu listes les éléments exclus un par un",
      "Tu supprimes la rubrique hors périmètre",
      "Tu renvoies le sujet après le lancement"
    ],
    bonne: 1,
    pourquoi: [
      "Non. « L'inutile » ne veut rien dire de précis : chacun y mettra autre chose.",
      "Oui. Notes de frais, refonte du plan comptable, export hors UE… : nommé, donc opposable.",
      "Non. Sans hors périmètre, les demandes vont s'ajouter sans limite.",
      "Non. Après le lancement, chaque exclusion devient une négociation."
    ],
    retenir: "Le hors périmètre se liste élément par élément, pas avec une formule floue."
  },
  {
    id: "cp04-q30", dialecte: "Gestion de projet",
    q: "Ton équipe travaille en agile pour une appli de saisie des notes de frais. Un collègue dit : « En agile, pas besoin de cadrage. » Qu'en penses-tu ?",
    choix: [
      "Il a raison : le backlog remplace le cadrage",
      "Il a tort : il faut un cahier des charges complet",
      "Il a tort : il faut une vision, des limites, un budget",
      "Il a raison, le Product Owner décide de tout"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Le backlog détaille le contenu, mais ne fixe ni l'objectif, ni le budget, ni les limites.",
      "Non. L'agile évite justement de tout spécifier d'avance.",
      "Oui. L'agile cadre aussi : une vision produit, un budget, des limites. Le détail reste ouvert.",
      "Non. Le Product Owner priorise le contenu, mais dans un cadre fixé avec le sponsor."
    ],
    retenir: "Agile ou pas, on cadre : objectif, limites, budget. Seul le niveau de détail change."
  },
  {
    id: "cp04-q31", dialecte: "Gestion de projet",
    q: "Pour DEMAT 2027, qui inclure dans la liste des parties prenantes de la note de cadrage ?",
    choix: [
      "Le DAF, la cheffe comptable et ses équipes",
      "Toute personne touchée ou qui doit décider",
      "Les personnes qui travaillent sur le projet",
      "Les prestataires sous contrat et le DAF"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Tu oublies les commerciaux, les clients EDI, la DSI et les prestataires.",
      "Oui. Sponsor, compta, commerciaux, DSI, intégrateur, plateforme, clients EDI : tous ceux qui sont touchés ou décident.",
      "Non. Les plus gros risques viennent souvent de personnes hors de l'équipe.",
      "Non. Les utilisateurs internes sont les plus touchés : les oublier, c'est se préparer un rejet."
    ],
    retenir: "Partie prenante = toute personne touchée par le projet ou qui pèse sur une décision."
  },
  {
    id: "cp04-q32", dialecte: "Gestion de projet",
    q: "Tu reprends un projet de migration Divalto déjà lancé. Il n'a jamais eu de note de cadrage. Les demandes s'empilent. Que fais-tu ?",
    choix: [
      "Tu continues : il est trop tard pour cadrer",
      "Tu écris un cadrage de reprise, validé par le sponsor",
      "Tu bloques toute nouvelle demande jusqu'à nouvel ordre",
      "Tu arrêtes le projet en attendant un audit externe"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Sans cadre, les demandes continueront de s'empiler et la dérive s'aggrave.",
      "Oui. Tu poses l'état actuel, le périmètre restant et le hors périmètre : tu as enfin une base pour arbitrer.",
      "Non. Sans référence validée, ton refus n'a aucune base : il sera contesté.",
      "Non. Tout arrêter coûte cher et n'est pas justifié avant d'avoir fait le point."
    ],
    retenir: "Il n'est jamais trop tard pour cadrer : un cadrage de reprise redonne une référence."
  },
  {
    id: "cp04-q33", dialecte: "Gestion de projet",
    q: "Le DAF de DEMAT 2027 te dit : « Le succès, c'est d'être dans les temps. » Que fais-tu pour les critères de succès ?",
    choix: [
      "Tu écris la date comme seul critère de succès",
      "Tu ajoutes des critères qualité et adoption",
      "Tu laisses les critères pour la fin du projet",
      "Tu remplaces la date par la satisfaction client"
    ],
    bonne: 1,
    pourquoi: [
      "Non. On peut basculer à la date avec 20 % de factures rejetées : « dans les temps » mais en échec.",
      "Oui. Délai, mais aussi taux de rejet et clôture tenue : tu proposes, le DAF valide.",
      "Non. Fixés à la fin, les critères s'adaptent au résultat : ils ne servent plus à rien.",
      "Non. La date légale reste un critère clé, et la satisfaction doit être chiffrée."
    ],
    retenir: "Un projet peut être à l'heure et raté : les critères couvrent délai, qualité et usage."
  },
  {
    id: "cp04-q34", dialecte: "Gestion de projet",
    q: "Pour DEMAT 2027, tu as demandé au DAF 15 minutes pour choisir la plateforme : 2 options, date limite le 10. On est le 20, aucune réponse. Sans plateforme, la réception, obligatoire depuis septembre, reste bloquée. Que fais-tu ?",
    choix: [
      "Tu signes toi-même avec la plateforme la moins chère",
      "Tu relances encore le DAF et tu attends sa réponse",
      "Tu préviens le DAF, puis tu demandes au DG d'arbitrer",
      "Tu notes le retard au rapport du prochain COPIL"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Tu engages un contrat de plusieurs années sans mandat : la décision pourra être contestée, et c'est toi qui la portes.",
      "Non. La date limite est passée et une obligation légale est déjà en retard : relancer encore, c'est laisser filer.",
      "Oui. Demande courte, options, date limite : tu as tout fait. L'enjeu est légal, donc tu escalades, en le disant d'abord au DAF.",
      "Non. Un mois de plus sans plateforme, alors que la loi s'applique déjà : un rapport ne remplace pas une décision."
    ],
    retenir: "Demande courte faite, date limite dépassée, obligation légale en jeu : on escalade, en prévenant le sponsor."
  },
  {
    id: "cp04-q35", dialecte: "Gestion de projet",
    q: "L'intégrateur Divalto propose de démarrer le connecteur DEMAT 2027 dès demain, facturé en régie, « pour gagner du temps ». Le DAF n'a pas encore validé la note de cadrage. Que réponds-tu ?",
    choix: [
      "Oui, sur un petit budget, pour gagner du temps",
      "Non : aucune commande avant la note validée",
      "Oui, s'il accepte de ne facturer qu'à la fin",
      "Tu demandes à la cheffe comptable de décider"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Un « petit » budget engagé sans mandat devient vite la base du projet : la solution arrive avant le besoin.",
      "Oui. Sans note validée, personne n'a le mandat de dépenser. Tu lui donnes la date de validation prévue : il démarre ensuite.",
      "Non. Payer plus tard ne change rien : il construit déjà sur un périmètre non validé, et la facture arrivera.",
      "Non. Elle n'a ni le budget ni le pouvoir d'engager une commande auprès d'un prestataire."
    ],
    retenir: "Pas de note validée, pas de commande : c'est le mandat du sponsor qui autorise à dépenser."
  },
  {
    id: "cp04-q36", dialecte: "Gestion de projet",
    q: "Le commercial demande : « Pour nos 15 petits clients professionnels en France, on garde l'envoi de factures PDF par mail après le 1er septembre 2027. C'est plus simple. » Que fais-tu ?",
    choix: [
      "Tu chiffres cette option et tu la soumets au DAF",
      "Tu acceptes pour ces 15 clients, à titre d'essai",
      "Tu refuses : c'est contraire à la loi, sans chiffrer",
      "Tu la notes en demande de changement pour plus tard"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Chiffrer une option illégale laisse croire qu'elle est possible : le DAF ne peut pas valider une infraction.",
      "Non. À cette date, une PME doit émettre ses factures entre entreprises via une plateforme agréée. Un PDF par mail n'est plus conforme.",
      "Oui. Il n'y a rien à arbitrer. Tu expliques la règle au commercial : ces clients doivent déjà savoir recevoir depuis septembre 2026.",
      "Non. Ce n'est pas un changement de périmètre : c'est une obligation légale. La garder en attente laisse le doute."
    ],
    retenir: "Une demande contraire à la loi ne se chiffre pas et ne s'arbitre pas : on dit non et on explique."
  },
  {
    id: "cp04-q37", dialecte: "Gestion de projet",
    q: "Au cadrage de DEMAT 2027, un responsable de site veut ajouter « tant qu'on y est » un module de gestion de stock pour son dépôt. Aucun lien avec les factures, et la date légale ne laisse pas de marge. Que fais-tu ?",
    choix: [
      "Tu chiffres l'ajout et tu le soumets au DAF",
      "Tu l'inscris en lot 2, après la bascule",
      "Tu dis non : c'est un autre projet, à demander à part",
      "Tu prends une petite partie pour garder son soutien"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Chiffrer une demande sans lien avec l'objectif l'installe dans ton projet : tu occupes l'équipe et le sponsor pour rien.",
      "Non. Un « lot 2 » le fait entrer dans ton périmètre : tu promets un livrable que personne n'a validé.",
      "Oui. La demande sort de l'objectif. Tu ne l'étudies pas dans ton projet : il la porte à la DSI comme une nouvelle demande.",
      "Non. Une « petite partie » reste hors objectif : elle prend du temps à l'équipe avant une date légale."
    ],
    retenir: "Sans lien avec l'objectif : non, et une demande à part. On ne chiffre que ce qui touche l'objectif."
  }
];
