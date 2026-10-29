// Chef de projet SI — Questions du module cp04 « Cadrer un projet ».
// Mises en situation. Fil rouge DEMAT 2027 : négociant en équipement de piscines, 120 salariés, ERP Divalto,
// passage à la facture électronique via une plateforme agréée (PA). Référence : fiche fil rouge de docs/plan-chef-de-projet.md.
// « Agir fort » (bonne réponse ferme : refuser, monter, arrêter) : q34 à q40. « Piège : surréaction » : q41, q42.
// Décision par défaut alignée sur cp16 : seulement pour un détail de ton projet (q41) ; sinon, enjeu fort → sponsor prévenu, puis DG (q34).
LEARNSQL.questions.cp04 = [
  {
    id: "cp04-q01", dialecte: "Gestion de projet",
    q: "Le DAF te dit : « On passe à la facture électronique, lance le projet. » Tu n'as rien d'autre. Que fais-tu en premier ?",
    choix: [
      "Tu écris une note de cadrage et tu la fais valider",
      "Tu demandes vite des devis à trois plateformes agréées",
      "Tu attends que le DAF t'écrive son besoin",
      "Tu fais un planning détaillé jusqu'à la bascule"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Il faut d'abord un accord écrit sur l'objectif, le périmètre et les limites, validé par le DAF.",
      "Non. Sans périmètre ni critères, tu ne sais pas quoi demander : les devis ne seront pas comparables.",
      "Non. Le DAF t'a confié le projet : c'est à toi de poser les questions et d'écrire le besoin, pas d'attendre.",
      "Non. Un planning détaillé sans périmètre validé sera faux dès la première semaine."
    ],
    retenir: "Avant de dépenser ou de planifier : cadrer, puis faire valider par le sponsor."
  },
  {
    id: "cp04-q02", dialecte: "Gestion de projet",
    q: "Dans ta note de cadrage DEMAT 2027, l'objectif est : « Installer la plateforme X et son connecteur Divalto. » Quel est le principal problème ?",
    choix: [
      "Il manque la date et le budget du projet",
      "Il est trop court pour un vrai objectif",
      "Il ne cite pas le nom de l'intégrateur",
      "Il décrit une solution, pas le résultat attendu"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Date et budget comptent, mais le vrai défaut est ailleurs : la phrase impose déjà un outil.",
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
    q: "Ta note de cadrage DEMAT 2027 dit ce que le projet couvre : factures clients et fournisseurs, 3 sites, connecteur Divalto, formation compta. Que manque-t-il de plus important ?",
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
      "Oui. Sans hors périmètre, chacun suppose que son besoin est inclus : notes de frais, BL (bons de livraison), export…",
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
      "Tu lui dis d'en parler lui-même au DAF"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Les petits ajouts s'empilent et font glisser délai et budget sans décision de personne.",
      "Non. La note sert à cadrer la discussion, pas à fermer la porte : le besoin est peut-être réel.",
      "Oui. Tu traites la demande comme un changement : impact sur délai et coût, puis décision du DAF.",
      "Non. Le DAF recevra une demande sans impact chiffré : il décidera à l'aveugle. L'analyse d'impact, c'est ton travail."
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
    q: "Tu envoies la note de cadrage au DAF. Il répond presque aussitôt : « OK, vas-y. » Tu sens qu'il ne l'a pas lue. Que fais-tu ?",
    choix: [
      "Tu lances : il a validé par écrit, donc tu es couvert",
      "Tu attends qu'il la relise, sans rien démarrer",
      "Tu demandes 20 minutes pour valider 3 points clés",
      "Tu la renvoies au DAF avec le DG en copie"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Un « OK » sans lecture ne le protège pas lui, ni toi : au premier arbitrage, il découvrira le périmètre.",
      "Non. Attendre sans rien demander bloque le projet sans rien obtenir.",
      "Oui. Tu le fais réagir sur le hors périmètre, le budget et les critères : la validation devient réelle.",
      "Non. Mettre son chef en copie pour le forcer à lire l'humilie : tu perds ton sponsor dès le départ."
    ],
    retenir: "Un sponsor qui signe sans lire n'a pas vraiment validé : fais-le réagir sur les points clés."
  },
  {
    id: "cp04-q08", dialecte: "Gestion de projet",
    q: "Dans ta note DEMAT 2027, tu écris : « Le connecteur standard de la plateforme agréée (PA) marche avec notre Divalto 10.13. » Personne ne l'a confirmé. Comment le classer ?",
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
      "Oui. On la suppose vraie sans preuve. Si elle tombe, le plan change : on la vérifie vite avec la PA et l'intégrateur.",
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
      "Tu ajoutes toi-même les besoins compta et ventes",
      "Tu demandes un mois pour revoir compta et ventes",
      "Tu la fais valider au DAF et tu complètes après",
      "Tu fais relire compta et ventes, puis tu l'envoies"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Tu écris leurs besoins à leur place : tes suppositions deviendront des écarts en recette.",
      "Non. Quelques relectures courtes tiennent avant lundi. Repousser d'un mois use la confiance du sponsor.",
      "Non. Validée sans les métiers, la note sert de base à la commande : chaque besoin oublié deviendra un avenant payant.",
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
      "Une fourchette très large, de 20 à 200 k€",
      "Une fourchette et sa marge d'incertitude"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Un chiffre précis sans base devient une promesse : au premier écart, tu perds la confiance.",
      "Non. Le sponsor a besoin d'un ordre de grandeur pour décider de lancer ou non.",
      "Non. Une fourchette aussi large n'aide pas à décider : donne une fourchette réaliste et ce qui la fait varier.",
      "Oui. Par exemple 60 à 90 k€, avec ce qui fait varier le chiffre. On l'affine à chaque étape."
    ],
    retenir: "Au cadrage, le budget est une fourchette avec sa marge d'incertitude."
  },
  {
    id: "cp04-q12", dialecte: "Gestion de projet",
    q: "La cheffe comptable veut d'abord la réception des factures fournisseurs, le commercial d'abord l'émission des factures clients. La loi impose les deux. Que fais-tu ?",
    choix: [
      "Tu suis le commercial : il apporte le chiffre d'affaires",
      "Tu recommandes l'émission d'abord, la plus lourde",
      "Tu demandes au DAF de choisir, sans donner ton avis",
      "Tu recommandes la réception d'abord, le DAF valide"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Le chiffre d'affaires ne change pas la loi : la réception est déjà obligatoire, l'émission vient un an après.",
      "Non. L'émission est plus lourde, mais la réception est obligatoire depuis septembre 2026 : elle est déjà en retard et passe en premier.",
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
      "Elle manque de captures d'écran et de schémas",
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
      "Tu la mets à jour et l'envoies au DAF pour info",
      "Tu proposes un avenant avec son impact",
      "Tu la jettes : le projet a changé de nature"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Une note qui ne reflète plus la réalité ne sert plus de référence.",
      "Non. « Pour info », ce n'est pas une décision : le DAF n'a pas arbitré l'impact sur délai et coût.",
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
      "Tu tranches seul les 2 arbitrages, pour avancer",
      "Tu attends le prochain comité, sans relancer",
      "Tu le préviens, puis tu demandes au DG de trancher",
      "Tu lui demandes 15 minutes sur les 2 arbitrages"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Tu prends des décisions qui ne sont pas les tiennes : il pourra les contester ensuite.",
      "Non. Le projet dérive pendant que tu attends, et tu n'as rien signalé.",
      "Non. Le prévenir ne suffit pas : tu ne lui as pas encore fait de demande courte, avec une date limite. Le DG vient après, si rien ne bouge et si l'enjeu est fort.",
      "Oui. Tu lui facilites la décision : options, impact, date limite. Sans réponse à la date, et avec un enjeu fort, tu le préviens, puis tu montes au DG."
    ],
    retenir: "Sponsor absent : demande courte, options, date limite. Le DG vient seulement après, et si l'enjeu est fort."
  },
  {
    id: "cp04-q17", dialecte: "Gestion de projet",
    q: "Laquelle de ces phrases est un critère de succès bien écrit pour DEMAT 2027 ?",
    choix: [
      "Moins de 2 % de rejets au 1er mois",
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
    retenir: "Bannir « améliorer », « faciliter » : un critère a un chiffre, un seuil ou une date, et sa mesure."
  },
  {
    id: "cp04-q18", dialecte: "Gestion de projet",
    q: "Tu prépares la note DEMAT 2027. L'intégrateur Divalto te propose de rédiger lui-même la note de cadrage. Que réponds-tu ?",
    choix: [
      "Oui : il connaît mieux Divalto que toi",
      "Oui, et tu la fais relire par la compta",
      "Non, mais tu lui demandes son avis technique",
      "Non : il ne doit pas du tout participer"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Il cadrera ce qu'il sait vendre et livrer, pas forcément le besoin de l'entreprise.",
      "Non. La relecture ne change pas l'auteur : il cadre ce qu'il sait vendre, la compta ne corrige qu'à la marge.",
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
      "Les 3 plus gros risques techniques, avec parade"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Par exemple : plateforme en retard, clients EDI pas prêts, compta saturée en clôture.",
      "Non. Une liste trop longue noie les vrais risques : le sponsor ne retient rien.",
      "Non. Le sponsor doit connaître les gros risques avant de valider, pas après.",
      "Non. Les plus gros risques sont souvent humains, organisationnels ou liés aux prestataires : ne garde pas que la technique."
    ],
    retenir: "Au cadrage : les 3 à 5 plus gros risques, tous types, avec une première parade."
  },
  {
    id: "cp04-q21", dialecte: "Gestion de projet",
    q: "Le commercial te dit : « Moi je veux juste que ça marche. » Il refuse de participer au cadrage de DEMAT 2027. Que fais-tu ?",
    choix: [
      "Tu l'oublies : il ne veut pas être impliqué",
      "Tu lui envoies la note pour avis, par mail",
      "Tu demandes au DAF de l'obliger à venir",
      "Tu lui demandes 3 cas qui ne doivent pas casser"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Ses clients EDI sont touchés : s'il découvre le résultat à la bascule, il bloquera.",
      "Non. Il refuse de participer : il ne lira pas une note entière. Demande-lui peu, sur son terrain.",
      "Non. Escalader dès le premier refus abîme la relation pour tout le projet.",
      "Oui. Tu lui demandes peu, sur son terrain : quels clients, quels flux, quel délai. Ça devient des critères."
    ],
    retenir: "Une partie prenante réticente : demande-lui peu, sur son terrain, et traduis-le en critères."
  },
  {
    id: "cp04-q22", dialecte: "Gestion de projet",
    q: "Ta note DEMAT 2027 contient objectif, périmètre, hors périmètre, livrables, critères, budget et jalons. Que manque-t-il pour piloter ?",
    choix: [
      "Le détail des écrans, des champs et des contrôles",
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
      "À figer le projet : plus rien ne change ensuite",
      "À servir de base pour décider et dire non",
      "À remplacer le cahier des charges détaillé",
      "À protéger le chef de projet en cas d'échec"
    ],
    bonne: 1,
    pourquoi: [
      "Non. La note peut évoluer, par un avenant ou une décision tracée du sponsor. C'est une référence, pas un verrou.",
      "Oui. Elle fixe l'accord de départ : chaque nouvelle demande se compare à elle.",
      "Non. Elle vient avant, à un niveau plus haut. Le détail vient ensuite.",
      "Non. La voir comme un « parapluie » est un travers : elle sert à aligner tout le monde, puis à arbitrer."
    ],
    retenir: "La note de cadrage est l'accord de référence pour arbitrer toutes les demandes suivantes."
  },
  {
    id: "cp04-q24", dialecte: "Gestion de projet",
    q: "Pour DEMAT 2027, la plateforme agréée (PA) annonce un retard de deux mois sur son connecteur Divalto. Où ce point aurait-il dû apparaître dès le cadrage ?",
    choix: [
      "Dans le hors périmètre",
      "Dans l'objectif du projet",
      "Dans les critères de succès",
      "Dans les premiers risques"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Le connecteur de la PA fait partie du projet : il n'est pas hors périmètre.",
      "Non. L'objectif dit le résultat attendu, pas ce qui peut mal tourner.",
      "Non. Les critères mesurent le résultat, pas ce qui peut le menacer.",
      "Oui. Un prestataire en retard est un risque classique : on le note avec une parade sur le délai (jalon d'alerte, plan B, marge)."
    ],
    retenir: "Dépendance à un prestataire = risque à écrire dès le cadrage."
  },
  {
    id: "cp04-q25", dialecte: "Gestion de projet",
    q: "Ton projet de migration Divalto est cadré. Le DAF, sponsor du projet, demande d'y ajouter « juste » la refonte du plan comptable. Que fais-tu ?",
    choix: [
      "Tu chiffres l'impact et tu le fais arbitrer",
      "Tu l'ajoutes : c'est le sponsor qui le demande",
      "Tu dis non : la refonte mérite son propre projet",
      "Tu l'acceptes, mais en lot 2 après la bascule"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Tu montres ce que l'ajout coûte : il décide en connaissance de cause, et c'est tracé.",
      "Non. Même le sponsor doit voir l'impact sur délai, coût et risques avant de décider.",
      "Non. Ton avis se défend, mais le sponsor a le droit de changer le périmètre : tu montres l'impact, tu ne décides pas à sa place.",
      "Non. Tu décides seul du découpage : le DAF doit voir l'impact et choisir lui-même."
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
      "Tu la recopies aussi en risque, pour la suivre",
      "Tu prévois un intérimaire, validé par le DAF"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Une question courte lève le doute, et le DAF la valide dans la note. Si elle est fausse, tu ajustes le plan.",
      "Non. Une hypothèse non vérifiée est un risque caché : elle tombera en pleine clôture.",
      "Non. Elle se vérifie en 10 minutes avec la cheffe comptable. Le registre sert aux hypothèses qu'on ne peut pas vérifier vite (module cp07).",
      "Non. Tu dépenses avant de savoir si l'hypothèse est fausse. On la vérifie d'abord ; le renfort vient seulement si elle tombe."
    ],
    retenir: "Une hypothèse s'écrit, puis se vérifie vite."
  },
  {
    id: "cp04-q28", dialecte: "Gestion de projet",
    q: "Ton projet EDI (nouveaux flux avec AquaBleu) a des critères de succès chiffrés, mais personne ne sait comment les mesurer. Que manque-t-il ?",
    choix: [
      "Un outil de BI dédié à la mesure",
      "La source et le responsable de la mesure",
      "Un seuil plus ambitieux et un suivi mensuel",
      "La validation de chaque critère par AquaBleu"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Un outil de plus n'est pas nécessaire : un rapport existant suffit souvent.",
      "Oui. Pour chaque critère : d'où vient le chiffre (rapport, journal EDI) et qui le mesure.",
      "Non. Seuil et fréquence ne sont pas le problème : sans source de mesure, aucun seuil n'est vérifiable.",
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
      "Tu demandes au DAF de définir « l'inutile »"
    ],
    bonne: 1,
    pourquoi: [
      "Non. « L'inutile » ne veut rien dire de précis : chacun y mettra autre chose.",
      "Oui. Notes de frais, refonte du plan comptable, ventes à l'étranger… : chaque élément nommé, on peut s'y référer pour dire non.",
      "Non. Sans hors périmètre, les demandes vont s'ajouter sans limite.",
      "Non. Tu renvoies le travail au sponsor : c'est à toi de proposer une liste précise, qu'il validera."
    ],
    retenir: "Le hors périmètre se liste élément par élément, pas avec une formule floue."
  },
  {
    id: "cp04-q30", dialecte: "Gestion de projet",
    q: "Ton équipe travaille en agile pour une appli de saisie des notes de frais. Un collègue dit : « En agile, pas besoin de cadrage. » Qu'en penses-tu ?",
    choix: [
      "Il a raison : le backlog remplace le cadrage",
      "Il a tort : il faut un cahier des charges et un planning",
      "Il a tort : il faut une vision, des limites, un budget",
      "Il a raison, le Product Owner décide de tout"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Le backlog détaille le contenu, mais ne fixe ni l'objectif, ni le budget, ni les limites.",
      "Non. L'agile évite justement de tout spécifier et planifier d'avance.",
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
      "Toute personne touchée ou qui pèse sur le projet",
      "Les personnes qui travaillent sur le projet",
      "Les prestataires sous contrat et le DAF"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Tu oublies l'ADV (administration des ventes), les commerciaux, les clients EDI, la DSI et les prestataires.",
      "Oui. Sponsor, compta, ADV, commerciaux, DSI, intégrateur, plateforme agréée, clients EDI : tous ceux qui sont touchés ou décident.",
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
      "Tu écris un cadrage de reprise de l'existant",
      "Tu bloques toute nouvelle demande jusqu'à nouvel ordre",
      "Tu arrêtes le projet en attendant un audit externe"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Sans cadre, les demandes continueront de s'empiler et la dérive s'aggrave.",
      "Oui. Tu poses l'état actuel, le périmètre restant et le hors périmètre, et le sponsor le valide : tu as enfin une base pour arbitrer.",
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
      "Tu ajoutes « satisfaction des utilisateurs »"
    ],
    bonne: 1,
    pourquoi: [
      "Non. On peut basculer à la date avec 20 % de factures rejetées : « dans les temps » mais en échec.",
      "Oui. Délai, mais aussi taux de rejet et fin de la ressaisie : tu proposes, le DAF valide.",
      "Non. Fixés à la fin, les critères s'adaptent au résultat : ils ne servent plus à rien.",
      "Non. Tel quel, ce critère ne se mesure pas : il faut un seuil (taux de rejet, fin de la ressaisie) et sa mesure."
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
      "Non. Tu engages un contrat sans mandat : la décision pourra être contestée, et c'est toi qui la portes.",
      "Non. La date limite est passée et une obligation légale est déjà en retard : relancer encore, c'est laisser filer.",
      "Oui. Demande courte, options, date limite : tu as tout fait. L'enjeu est légal, donc tu escalades, en le disant d'abord au DAF.",
      "Non. Un mois de plus sans plateforme, alors que la loi s'applique déjà : un rapport ne remplace pas une décision."
    ],
    retenir: "Demande courte faite, date limite dépassée, obligation légale en jeu : on escalade, en prévenant le sponsor."
  },
  {
    id: "cp04-q35", dialecte: "Gestion de projet",
    q: "L'intégrateur Divalto propose de démarrer dès demain le paramétrage Divalto de DEMAT 2027, facturé en régie (au temps passé), « pour gagner du temps ». Le DAF n'a pas encore validé la note de cadrage. Que réponds-tu ?",
    choix: [
      "Oui, sur un petit budget, pour gagner du temps",
      "Non : aucune commande avant la note validée",
      "Oui, s'il accepte de ne facturer qu'à la fin",
      "Non, et tu l'écartes du cadrage jusqu'au contrat"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Un « petit » budget engagé sans mandat devient vite la base du projet : la solution arrive avant le besoin.",
      "Oui. Sans note validée, personne n'a le mandat de dépenser. Tu lui donnes la date de validation prévue : il démarre ensuite.",
      "Non. Payer plus tard ne change rien : il construit déjà sur un périmètre non validé, et la facture arrivera.",
      "Non. Refuser la commande ne veut pas dire refuser l'échange : son avis technique aide le cadrage (contraintes, risques)."
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
      "Tu fais couper tout envoi PDF dès ce mois-ci"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Chiffrer une option illégale laisse croire qu'elle est possible : le DAF ne peut pas valider une infraction.",
      "Non. À cette date, une PME doit émettre ses factures entre entreprises via une plateforme agréée. Un PDF par mail n'est plus conforme.",
      "Oui. Il n'y a rien à arbitrer. Tu expliques la règle au commercial : ces clients doivent déjà savoir recevoir depuis septembre 2026.",
      "Non. Pour une PME, l'émission électronique devient obligatoire au 1er septembre 2027 : d'ici là, le PDF reste permis. Tout couper sans plateforme prête bloque la facturation."
    ],
    retenir: "Une demande contraire à la loi ne se chiffre pas et ne s'arbitre pas : on dit non et on explique."
  },
  {
    id: "cp04-q37", dialecte: "Gestion de projet",
    q: "Au cadrage de DEMAT 2027, un responsable de site veut ajouter « tant qu'on y est » la gestion de stock de son dépôt. Aucun lien avec les factures. Que fais-tu ?",
    choix: [
      "Tu chiffres l'ajout et tu le soumets au DAF",
      "Tu l'inscris en lot 2, après la bascule",
      "Tu dis non : c'est un autre projet, à part",
      "Tu demandes au DAF de le recadrer en COPIL"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Chiffrer une demande sans lien avec l'objectif l'installe dans ton projet : tu occupes l'équipe et le sponsor pour rien.",
      "Non. Un « lot 2 » le fait entrer dans ton périmètre : tu promets un livrable que personne n'a validé.",
      "Oui. La demande sort de l'objectif : tu l'écris hors périmètre, et il la porte à la DSI comme une nouvelle demande.",
      "Non. Une demande hors sujet ne justifie pas d'escalade : tu lui réponds toi-même, note en main, et tu l'orientes vers la DSI."
    ],
    retenir: "Sans lien avec l'objectif : non, et une demande à part. On ne chiffre que ce qui touche l'objectif."
  },
  {
    id: "cp04-q38", dialecte: "Gestion de projet",
    q: "Au cadrage de DEMAT 2027, ta fourchette de budget est de 60 à 90 k€. Le DAF te dit : « Écris 50 k€ ferme dans la note, sinon le DG ne validera jamais. » Que fais-tu ?",
    choix: [
      "Tu écris 50 k€ : c'est au sponsor de trancher",
      "Tu refuses d'écrire un chiffre que tu sais faux",
      "Tu écris 50 k€, et « hors imprévus » en tout petit",
      "Tu envoies toi-même ta fourchette au DG"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Il tranche, mais sur un vrai chiffre. 50 k€ pour ce périmètre devient ta promesse : au premier devis, c'est toi qui perds la confiance.",
      "Oui. Un chiffre faux devient ta promesse. Tu lui proposes deux voies : 50 k€ avec un périmètre réduit, ou la vraie fourchette. Il choisit.",
      "Non. Les imprévus sont déjà dans ta fourchette : la mention en petit ne protège rien. Le DG ne retiendra que 50 k€.",
      "Non. Tu passes au-dessus de ton sponsor : tu perds sa confiance pour tout le projet. Tu refuses le chiffre, pas son rôle."
    ],
    retenir: "Un budget faux ne rassure pas longtemps : refuse le chiffre, propose un périmètre réduit ou la vraie fourchette."
  },
  {
    id: "cp04-q39", dialecte: "Gestion de projet",
    q: "Ta note DEMAT 2027 validée prévoit un budget de 60 à 90 k€. En novembre, les devis de la plateforme agréée (PA) et de l'intégrateur arrivent : 115 k€ au total. Prochain COPIL dans 3 semaines. Que fais-tu ?",
    choix: [
      "Tu le présentes au COPIL, avec le dossier complet",
      "Tu réduis le périmètre pour tenir les 90 k€",
      "Tu préviens le DAF dès aujourd'hui, avec l'impact",
      "Tu demandes au DG une rallonge, dès aujourd'hui"
    ],
    bonne: 2,
    pourquoi: [
      "Non. 115 k€ sort de la fourchette validée : la décision n'est plus à toi. Et le DAF doit signer le contrat de la PA ce mois-ci : dans 3 semaines, c'est trop tard.",
      "Non. Tu changes seul le périmètre validé pour cacher l'écart. Hors fourchette, c'est le sponsor qui choisit : payer plus, réduire, ou négocier.",
      "Oui. L'écart sort de la tolérance (la fourchette) : le sponsor décide, et tôt. Tu viens avec l'impact et 2 ou 3 options : réduire, négocier, payer plus.",
      "Non. Le budget est au DAF : aller au DG, c'est passer au-dessus de lui. Le DG vient seulement si le DAF ne répond pas, et si l'enjeu est fort."
    ],
    retenir: "Hors tolérance, la décision n'est plus à toi : tu préviens le sponsor tout de suite, avec l'impact."
  },
  {
    id: "cp04-q40", dialecte: "Gestion de projet",
    q: "La note DEMAT 2027 n'est pas encore validée. Tu découvres que l'intégrateur Divalto paramètre déjà Divalto pour le projet depuis 3 jours, en régie, sur un simple mail du commercial. Aucun bon de commande. Que fais-tu ?",
    choix: [
      "Tu laisses la régie avancer : c'est du temps de gagné",
      "Tu fais arrêter la régie, puis tu informes le DAF",
      "Tu fais régulariser par une commande du DAF",
      "Tu refuses de payer et tu changes d'intégrateur"
    ],
    bonne: 1,
    pourquoi: [
      "Non. En régie, chaque jour passé est facturé : sans note validée ni commande, c'est une dépense sans mandat. Et il construit sur un périmètre que personne n'a validé.",
      "Oui. Pas de note validée, pas de commande : tu fais arrêter, et le DAF le sait le jour même. Le travail reprendra après la validation.",
      "Non. Régulariser, c'est commander avant la note validée : le paramétrage décide du périmètre à la place du besoin.",
      "Non. Les 3 jours se règlent avec le DAF, contrat en main. Changer d'intégrateur pour un mail du commercial, c'est disproportionné."
    ],
    retenir: "Des travaux démarrent sans note validée ni commande : tu les fais arrêter et tu informes le sponsor le jour même."
  },
  {
    id: "cp04-q41", dialecte: "Gestion de projet",
    q: "Pour DEMAT 2027, tu as envoyé au DAF : « Sans remarque d'ici le 10, je garde ce modèle de compte rendu de COPIL. » On est le 12. Aucune réponse : il est en déplacement. Que fais-tu ?",
    choix: [
      "Tu le préviens, puis tu vas voir le DG pour trancher",
      "Tu appliques le modèle annoncé, et tu l'écris",
      "Tu relances le DAF et tu attends son accord",
      "Tu reportes le choix du modèle au prochain COPIL"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Un modèle de compte rendu reste dans ton projet : ta décision par défaut suffit. Le DG, c'est pour un enjeu fort qui sort de ton projet.",
      "Oui. Défaut annoncé, date passée, et le choix reste dans ton projet : tu l'appliques et tu l'écris. Le DAF pourra l'ajuster à son retour.",
      "Non. Tu avais fixé une date pour ne pas attendre. Attendre son accord sur un détail de ton ressort bloque le projet pour rien.",
      "Non. Un mois perdu sur un choix qui t'appartient : ta date limite ne servait à rien."
    ],
    retenir: "Décision par défaut annoncée, date passée, détail de ton projet : tu l'appliques et tu l'écris. Pas d'escalade."
  },
  {
    id: "cp04-q42", dialecte: "Gestion de projet",
    q: "Le contrat prévoit le connecteur de la plateforme agréée (PA) au 1er mars. Ta note DEMAT 2027 : tolérance de ± 2 semaines par jalon. La PA annonce le 8 mars, et la recette commence le 16 mars. Que fais-tu ?",
    choix: [
      "Tu préviens le DAF aujourd'hui, pour un avenant",
      "Tu décales aussi la bascule de juin d'une semaine",
      "Tu ne changes rien : c'est dans la tolérance",
      "Tu mets le planning à jour et tu le dis au COPIL"
    ],
    bonne: 3,
    pourquoi: [
      "Non. 1 semaine, dans une tolérance de 2 : c'est à toi de gérer. Un avenant pour si peu use le sponsor, qui écoutera moins tes vraies alertes.",
      "Non. Livré le 8, le connecteur arrive avant la recette du 16 : la bascule n'est pas touchée. Tout décaler fait perdre une semaine pour rien.",
      "Non. Dans la tolérance, tu gères, mais tu ne caches rien : sans planning à jour, le COPIL découvre l'écart trop tard.",
      "Oui. Dans la tolérance, tu gères seul : planning à jour, et l'écart figure au prochain COPIL. Le DAF n'a rien à décider."
    ],
    retenir: "Dans la tolérance, tu ajustes et tu le dis au COPIL. Au-delà, le sponsor décide, prévenu tout de suite."
  }
];
