// Chef de projet SI — Questions du module cp06 « Choisir sa démarche ».
// CHOISIR la démarche (prédictif / cycle en V, agile : Scrum ou Kanban, hybride) selon le projet, puis la TENIR :
// le PO (product owner), la démo, la rétrospective, « fini » = testé, l'enveloppe, changer de démarche en le proposant au sponsor.
// Fil rouge DEMAT 2027 (fiche fil rouge de docs/plan-chef-de-projet.md, qui fait foi), ligne « Démarche (module cp06) » :
// cœur cadré (flux légaux, connecteur standard de la PA, bascule) ; écrans et états de suivi Divalto de la compta en
// itérations de 2 semaines, dans une enveloppe de 10 jours d'intégrateur fixée par le DAF ; PO = la cheffe comptable,
// prise par la clôture annuelle de janvier et en congé 3 semaines pendant la recette. Intégrateur en régie.
// Dans la fiche (audit du 29/10) : itérations de février à avril, démarche validée par le DAF en octobre 2026, Julie
// suppléante du PO (désignée par écrit), gel dès le pilote de mai, partie agile comprise (cp10).
// Testeur : q36 = un « oui » simple juste ; « tout » aussi dans des bonnes réponses (q01, q31, q37) ; « Hybride » dans la
// bonne réponse de q07, « Agile » dans celle de q32 (ces mots ne doivent pas signaler un choix faux).
// Frontières : cp10 = le circuit d'une demande de changement (ici, des renvois : q23) ; cp14 = contracter (q29, q30 pointent
// vers lui) ; cp04-q30 traite déjà « en agile, pas besoin de cadrage » (pas repris ici).
// Anti-devinette propre à cp06 : « hybride » n'est pas un signal. La bonne réponse est tantôt le prédictif pur (q01, q05,
// q26, q31, q34), tantôt l'agile pur (q02, q06 Kanban, q11, q32, q35), tantôt l'hybride (q07, q08, q27, q33), et le plus
// souvent une réponse qui n'est pas un nom de démarche (trouver un PO, découper le besoin, le dire au sponsor...).
// « Hybride » est aussi dans des choix faux (hybride à l'envers, hybride par habitude). « Agile », « sprints »,
// « cycle en V », « itérations », « backlog », « enveloppe », « PO », « démo », « DAF », chiffres et dates : aussi dans des choix faux.
// La bonne réponse est un extrême (l'action la plus forte, ou la plus faible) dans environ 1 question sur 4.
LEARNSQL.questions.cp06 = [
  {
    id: "cp06-q01",
    dialecte: "Gestion de projet",
    q: "Le DSI te confie la migration Divalto vers la nouvelle version : à l'identique, mêmes écrans, mêmes règles. La date est fixée après la clôture. L'intégrateur est au forfait. Quelle démarche choisis-tu ?",
    choix: [
      "Scrum : des sprints de 2 semaines, avec une démo au métier",
      "Cycle en V : tout est figé, tests en miroir, recette à la fin",
      "Hybride : la migration cadrée, des améliorations en sprints",
      "Aucune : au forfait, c'est à l'intégrateur de s'organiser"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Rien n'est à découvrir : le besoin est connu. Les démos n'apprennent rien, et le forfait suppose un contenu fixé d'avance.",
      "Oui. Besoin stable, date fixée, prix fixé : on cadre au départ. Chaque niveau a son test en miroir, et le métier valide à la recette.",
      "Non. « À l'identique » : il n'y a pas de partie floue. Ajouter des améliorations, c'est grossir un projet à date fixe.",
      "Non. Au forfait, l'intégrateur s'engage sur le résultat. Mais la recette, le temps du métier et la date restent à piloter : il faut une démarche."
    ],
    retenir: "Besoin stable, date et prix fixés : le prédictif (cycle en V) est le bon choix."
  },
  {
    id: "cp06-q02",
    dialecte: "Gestion de projet",
    q: "Tableaux Power BI des ventes, sur ton entrepôt Snowflake déjà en place. Le directeur commercial ne sait pas encore lesquels il veut. Deux commerciaux sont disponibles 1 h par semaine. Quelle démarche ?",
    choix: [
      "Agile : des sprints courts, un PO, une démo à chaque fois",
      "Cycle en V : un cahier des charges de tous les tableaux, d'abord",
      "Spécifier tous les tableaux, puis les livrer en sprints",
      "Attendre que le directeur écrive un besoin complet"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Besoin flou, utilisateurs disponibles, un tableau livrable à la fois : l'agile. Le PO (le directeur, ou un commercial qu'il désigne) classe ; la démo montre un vrai tableau.",
      "Non. Spécifier ce qu'il ne sait pas encore donne des tableaux refusés à la fin. Un besoin flou se construit par petits pas.",
      "Non. C'est un faux agile : le contenu est figé avant le 1er sprint. Les démos montreront des tableaux qu'on ne peut plus changer.",
      "Non. Il ne saura qu'en voyant de vrais tableaux. Attendre un besoin complet, c'est ne jamais commencer."
    ],
    retenir: "Besoin flou, métier disponible, valeur livrable par morceaux : l'agile."
  },
  {
    id: "cp06-q03",
    dialecte: "Gestion de projet",
    q: "Le cœur de DEMAT suit un cycle en V. En recette, la compta teste le connecteur de la plateforme agréée (PA). Par rapport à quoi vérifie-t-elle le résultat ?",
    choix: [
      "Au besoin écrit au départ : ses cas de test",
      "À la conception technique faite par l'intégrateur",
      "Au paramétrage de l'intégrateur, ligne par ligne",
      "À ce qu'elle découvre en testant, au fil de l'eau"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Dans le V, chaque test vérifie le niveau d'en face. La recette est en face du besoin : la compta vérifie ce qu'elle a demandé, avec ses cas écrits.",
      "Non. La conception technique se vérifie par les tests d'intégration (Divalto avec la PA), avant la recette. C'est le travail de l'intégrateur.",
      "Non. Le paramétrage, ligne par ligne, ce sont les tests unitaires de l'intégrateur, en bas du V.",
      "Non. Sans référence écrite, c'est de l'exploration : utile, mais rien ne prouve que le besoin est couvert."
    ],
    retenir: "Dans le cycle en V, la recette vérifie le besoin écrit au départ ; les tests techniques vérifient la conception."
  },
  {
    id: "cp06-q04",
    dialecte: "Gestion de projet",
    q: "Le cœur de DEMAT suit un cycle en V. Le connecteur est prévu au 1er mars, la recette commence le 16 mars. Quand la compta écrit-elle ses cas de test ?",
    choix: [
      "Le 1er mars : on les écrit quand le connecteur arrive",
      "En janvier-février, dès que le besoin est écrit",
      "Pendant la recette, au fur et à mesure des tests",
      "En octobre, avant même le choix de la plateforme"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Les écrire à la livraison, c'est tester avec des cas faits à la hâte. Dans le V, les tests se préparent à gauche, bien avant.",
      "Oui. Dans le V, on prépare les tests dès que le niveau d'en face est écrit : ici, le besoin. On les joue à droite, à partir du 16 mars.",
      "Non. Sans cas écrits avant, la recette n'a pas de référence : on teste ce qui vient, et on oublie les cas difficiles, comme les avoirs.",
      "Non. Trop tôt : sans la plateforme choisie, les cas ne connaissent ni ses formats, ni ses rejets. Ils seront à refaire."
    ],
    retenir: "Dans le cycle en V, les tests se préparent tôt (à gauche du V) et se jouent à la fin (à droite)."
  },
  {
    id: "cp06-q05",
    dialecte: "Gestion de projet",
    q: "Une nouvelle enseigne de la grande distribution veut ses factures en EDI (échange de données informatisé). Elle impose son guide de message et une campagne de tests en mars. Le commercial : « Faisons des sprints, on verra vite des choses. » Que choisis-tu ?",
    choix: [
      "Des sprints de 2 semaines, et une démo à l'enseigne en mars",
      "Hybride : le guide en itérations, et les tests cadrés",
      "Le guide comme besoin écrit, des tests en miroir, avant mars",
      "Le paramétrage d'AquaBleu, copié tel quel : même norme EDI"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Le contenu est imposé par le guide : il n'y a rien à découvrir. Et l'enseigne ne viendra pas à vos démos.",
      "Non. Hybride à l'envers : le guide est fixe, c'est lui qui se cadre. L'itérer, c'est rouvrir ce que le client a déjà écrit.",
      "Oui. Besoin fixé (le guide), date fixée (mars) : prédictif. Tu écris les cas de test dès le guide reçu, et tu les joues avant la campagne.",
      "Non. Chaque enseigne a ses exigences, même sur une norme commune : copier AquaBleu, c'est découvrir les écarts pendant la campagne de tests."
    ],
    retenir: "Un besoin imposé et une date fixe (un guide EDI, une campagne de tests) se cadrent au départ."
  },
  {
    id: "cp06-q06",
    dialecte: "Gestion de projet",
    q: "Tu es DSI adjoint. Ton équipe intégration reçoit chaque semaine des demandes EDI de toutes tailles : un partenaire à ajouter, un rejet à analyser, un code à changer. Ses sprints de 2 semaines sont cassés par les urgences. Que proposes-tu ?",
    choix: [
      "Des sprints d'1 semaine, pour absorber les urgences plus vite",
      "Un cycle en V par demande, avec un cahier des charges chacune",
      "Plus de méthode : chacun prend les demandes comme elles viennent",
      "Un flux Kanban : un tableau, et peu de sujets en cours à la fois"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Des sprints plus courts restent des engagements de contenu : les urgences les casseront aussi, juste plus souvent.",
      "Non. Un cahier des charges pour changer un code : la démarche coûte plus cher que la demande.",
      "Non. Sans tableau ni priorités, les urgences passent devant tout, et les gros sujets ne finissent jamais.",
      "Oui. Des demandes continues, de toutes tailles : un flux, pas des sprints. Le tableau montre tout ; limiter le travail en cours fait finir les sujets."
    ],
    retenir: "Des demandes qui arrivent sans cesse, de toutes tailles : Kanban (un flux), pas des sprints."
  },
  {
    id: "cp06-q07",
    dialecte: "Gestion de projet",
    q: "Le DSI te confie un projet : un entrepôt Snowflake alimenté par Divalto, puis des tableaux Power BI pour la direction. Les flux et les droits d'accès sont connus. Les tableaux, pas encore. Quelle démarche ?",
    choix: [
      "Hybride : flux et accès cadrés ; tableaux en itérations",
      "Hybride : tableaux cadrés ; flux et accès en sprints",
      "Tout en agile : les droits d'accès se découvriront en sprints",
      "Tout en cycle en V, tableaux compris, pour tenir le budget"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Ce qui est connu se cadre : les flux, les droits d'accès. Ce qui est flou s'itère avec la direction : les tableaux. C'est l'hybride bien découpé.",
      "Non. C'est l'hybride à l'envers : tu figes ce qui est flou, et tu fais varier ce qui est connu. Les tableaux seront refusés, les accès bougeront.",
      "Non. Les droits d'accès sont déjà connus : rien à découvrir. Les laisser « se découvrir » en sprints, c'est ouvrir des données aux mauvaises personnes en attendant.",
      "Non. Spécifier des tableaux que la direction ne connaît pas encore : ils seront refusés à la recette. Et le budget n'est pas mieux tenu."
    ],
    retenir: "L'hybride cadre ce qui est connu et itère ce qui est flou. Pas l'inverse."
  },
  {
    id: "cp06-q08",
    dialecte: "Gestion de projet",
    q: "Le plan de l'intégrateur pour DEMAT : les écrans de la compta spécifiés en détail dès octobre, et le paramétrage du connecteur en sprints de 2 semaines. Que fais-tu ?",
    choix: [
      "Tu valides : c'est bien un plan hybride",
      "Tu passes tout en sprints, écrans et connecteur",
      "Tu passes tout en cycle en V, plus simple à suivre",
      "Tu inverses : connecteur cadré, écrans itérés"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Hybride, oui, mais à l'envers : ce qui est flou (les écrans) est figé, et ce qui est fixe (le connecteur) passe en sprints.",
      "Non. Le connecteur est un produit standard, livré à une date : des sprints n'y changeraient rien. Il se paramètre et se teste.",
      "Non. Les écrans de la compta sont flous : spécifiés en octobre, ils seront refusés à la recette.",
      "Oui. Le connecteur est standard et daté : il se cadre. Les écrans sont flous : ils s'itèrent avec la cheffe comptable, qui classe le backlog."
    ],
    retenir: "Un hybride se découpe dans le bon sens : le fixe se cadre, le flou s'itère."
  },
  {
    id: "cp06-q09",
    dialecte: "Gestion de projet",
    q: "Le DAF te confie un projet de notes de frais dématérialisées. En réunion, il te demande : « Agile ou cycle en V ? Réponds-moi maintenant. » Personne n'a encore regardé le besoin. Que réponds-tu ?",
    choix: [
      "« Je découpe d'abord le besoin, fixe ou flou. Réponse jeudi »",
      "« Agile : on découvrira le besoin en route, c'est plus rapide »",
      "« Hybride, comme DEMAT : ça marche bien »",
      "« Cycle en V : avec un cahier des charges, on est couverts »"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. La démarche se choisit après avoir regardé le besoin : le stable, le flou, la date, le contrat. Une réponse datée, pas au hasard.",
      "Non. L'agile n'est pas plus rapide par nature : il sert un besoin flou, avec un métier disponible. Personne ne sait encore si c'est le cas.",
      "Non. Copier la démarche du projet d'avant, c'est choisir sans regarder celui-ci. L'hybride n'est pas une réponse par défaut.",
      "Non. Le cycle en V ne couvre que si le besoin est stable. Sur un besoin flou, le cahier des charges sera faux, et signé."
    ],
    retenir: "On ne choisit pas une démarche à l'aveugle : on découpe d'abord le besoin (fixe ou flou), puis on choisit."
  },
  {
    id: "cp06-q10",
    dialecte: "Gestion de projet",
    q: "Le DAF : « En agile, la date ne bouge jamais. Alors faisons tout DEMAT en agile : on tiendra le 1er septembre. » Que lui réponds-tu ?",
    choix: [
      "« D'accord : en agile, la date est toujours tenue, quoi qu'il arrive »",
      "« Oui, avec 2 sprints de marge avant septembre »",
      "« Non : l'agile ne sait pas tenir une date fixe comme celle-là »",
      "« L'agile tient la date en coupant du contenu : pas le flux légal »"
    ],
    bonne: 3,
    pourquoi: [
      "Non. L'agile tient la date parce qu'il retire du contenu en route. Sur DEMAT, que retirer ? Les factures légales ne se coupent pas.",
      "Non. La marge ne change pas le fond : contenu fixe et date fixe, les sprints ne seraient qu'un planning découpé. Le cœur se cadre.",
      "Non. Faux aussi : l'agile tient très bien une date, en faisant varier le contenu. Le souci est ailleurs : ici, le contenu légal est fixe.",
      "Oui. Temps fixe, contenu variable : c'est le principe de l'agile. Le flux légal ne peut pas varier : il se cadre. Les écrans, eux, s'itèrent."
    ],
    retenir: "L'agile tient une date en coupant du contenu : ce qui ne peut pas être coupé (un flux légal) se cadre."
  },
  {
    id: "cp06-q11",
    dialecte: "Gestion de projet",
    q: "Le directeur commercial veut des tableaux Power BI pour le salon professionnel du 10 février. La date ne bouge pas, mais la liste des tableaux reste ouverte. Deux commerciaux sont disponibles. Quelle démarche ?",
    choix: [
      "Prédictif : la date est fixe, donc on fige tout au départ",
      "Agile : les plus utiles d'abord, et on coupe si besoin",
      "Hybride : un tableau cadré au départ, les autres en itérations",
      "Attendre la liste définitive des tableaux pour commencer"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Date fixe ne veut pas dire contenu fixe. Figer une liste ouverte, c'est risquer de livrer en retard, ou de livrer ce qui ne sert pas.",
      "Oui. Date fixe, contenu ouvert : l'agile tient la date en faisant varier le contenu. Le salon aura les tableaux les plus utiles, finis et testés.",
      "Non. Rien ne justifie de cadrer un tableau à part : ils sont tous flous. Ce découpage ajoute un cycle en V sans raison.",
      "Non. La liste ne sera « définitive » qu'en voyant les premiers tableaux. Attendre, c'est perdre le temps qui reste avant le salon."
    ],
    retenir: "Date fixe et contenu ouvert : l'agile tient la date en coupant du contenu."
  },
  {
    id: "cp06-q12",
    dialecte: "Gestion de projet",
    q: "Octobre 2026. Le DAF valide la démarche hybride de DEMAT, puis ajoute : « Pour les écrans de la compta, sois le PO (product owner) : tu connais Divalto mieux que la compta. » Que fais-tu ?",
    choix: [
      "Tu deviens PO : tu classes, et la compta teste",
      "Tu laisses l'intégrateur classer : il voit le faisable",
      "Tu proposes la cheffe comptable, avec 1 h par itération",
      "Pas de PO : tu passes les écrans en cycle en V"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Le PO décide de ce qui compte pour le métier. Si tu classes à sa place, la compta découvrira en démo des écrans qu'elle n'a pas choisis.",
      "Non. L'intégrateur sait ce qui est faisable, pas ce qui est utile à la compta. Il classera ce qui l'arrange.",
      "Oui. Le PO vient du métier qui utilisera les écrans. Tu chiffres son temps (1 h par itération, plus la démo) : le DAF, son manager, valide.",
      "Non. Tu changes de démarche pour fuir un rôle : le besoin reste flou, et les écrans seront refusés en recette."
    ],
    retenir: "Le PO vient du métier, avec du temps réservé : pas toi, pas l'intégrateur."
  },
  {
    id: "cp06-q13",
    dialecte: "Gestion de projet",
    q: "Au cadrage, tu présentes au DAF la démarche hybride de DEMAT. Il a 10 minutes. Que doit-il comprendre et valider ?",
    choix: [
      "L'enveloppe, le temps de la cheffe comptable, ce qui n'est pas promis",
      "Le détail de Scrum : les sprints, les rôles, les rituels, les outils",
      "Rien : la démarche, c'est l'affaire du chef de projet, pas la sienne",
      "Le cahier des charges complet de chaque écran de la compta"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Il fixe l'enveloppe (10 jours), il libère la cheffe comptable comme PO, et il accepte que le détail des écrans ne soit pas promis d'avance.",
      "Non. Le jargon de méthode ne l'aide pas à décider. Il lui faut ce qui touche son budget, ses équipes, et ce qu'il recevra.",
      "Non. La démarche change ce qu'il reçoit, quand, et le temps de ses équipes : c'est à lui de la valider. Toi, tu la proposes.",
      "Non. Un cahier des charges des écrans, c'est figer la partie floue : tu reviens au cycle en V là où il fallait itérer."
    ],
    retenir: "Le sponsor valide la démarche par ce qui le touche : budget, temps de ses équipes, ce qui est promis et ce qui ne l'est pas."
  },
  {
    id: "cp06-q14",
    dialecte: "Gestion de projet",
    q: "L'intégrateur propose de lancer la 1re itération des écrans de la compta le 4 janvier. La cheffe comptable, PO de cette partie, est prise par la clôture annuelle jusqu'à fin janvier. Que fais-tu ?",
    choix: [
      "Tu lances l'itération le 4 : l'intégrateur commence sans elle",
      "Tu lances les itérations en février ; le cœur ne bouge pas",
      "Tu écris toi-même les spécifications des écrans en janvier",
      "Tu demandes au DAF de la libérer 1 jour par semaine en janvier"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Sans PO, l'intégrateur choisit à la place du métier : en février, la cheffe comptable découvrira des écrans qu'elle n'a pas classés.",
      "Oui. Pas d'itération sans PO disponible. Les écrans ne retardent pas le cœur : les lancer en février ne coûte rien à la bascule.",
      "Non. Tu fais le travail du PO, et tu figes un besoin flou : c'est un cycle en V caché, que la compta n'a pas validé.",
      "Non. La clôture annuelle passe avant, et rien n'oblige à démarrer en janvier : tu prends le temps de la compta pour rien."
    ],
    retenir: "Pas d'itération sans PO disponible : on cale les itérations sur son agenda, pas l'inverse."
  },
  {
    id: "cp06-q15",
    dialecte: "Gestion de projet",
    q: "Le consultant de l'intégrateur veut commencer par l'écran le plus simple, « pour bien démarrer ». La cheffe comptable, PO, veut d'abord l'état des factures bloquées. Aucune dépendance technique. Que fais-tu ?",
    choix: [
      "Tu demandes au DAF de trancher l'ordre des deux",
      "L'ordre du consultant : la PO suivra le faisable",
      "L'ordre de la PO : c'est elle qui classe",
      "Ton ordre : tu choisis ce qui te semble le plus utile"
    ],
    bonne: 2,
    pourquoi: [
      "Non. L'ordre du backlog, dans l'enveloppe, revient à la PO : faire trancher le DAF, c'est monter un détail.",
      "Non. Le consultant conseille sur le faisable ; l'ordre de la valeur, c'est la PO. Sans dépendance technique, son avis ne passe pas devant.",
      "Oui. Classer le backlog, c'est le rôle de la PO. Sans dépendance technique, son ordre s'applique : l'écran simple attendra.",
      "Non. Tu n'es pas le PO : ton avis sur l'utilité compte moins que celui du métier qui utilisera les écrans."
    ],
    retenir: "L'ordre du backlog revient au PO ; l'intégrateur conseille sur le faisable, il ne classe pas."
  },
  {
    id: "cp06-q16",
    dialecte: "Gestion de projet",
    q: "Fin de la 1re itération. L'état des factures bloquées est paramétré dans le Divalto de test. Pour la démo, le consultant prévoit 20 diapositives, sans rien montrer dans Divalto. Que fais-tu ?",
    choix: [
      "Tu laisses faire : c'est à lui de montrer comme il veut",
      "Tu fais la démo toi-même, dans Divalto, à sa place",
      "Tu lui demandes de montrer l'état en vrai, dans Divalto",
      "Tu annules la démo, et l'état repasse dans l'itération"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Des diapositives ne montrent pas si l'état convient : la cheffe comptable ne peut ni l'essayer, ni réagir. La démo perd son sens.",
      "Non. Presque : montrer dans Divalto, oui, mais pas à sa place. Aux questions, tu ne sauras pas répondre, et le consultant n'entend pas les réactions.",
      "Oui. Une démo montre ce qui marche, dans l'outil, sur des données de test. La cheffe comptable l'essaie, réagit, et reclasse le backlog.",
      "Non. L'état existe : annuler pour une question de forme fait perdre 2 semaines. Il suffit de le montrer en vrai."
    ],
    retenir: "Une démo montre un écran qui marche, dans l'outil ; pas des diapositives."
  },
  {
    id: "cp06-q17",
    dialecte: "Gestion de projet",
    q: "Démo de fin d'itération. Le consultant veut compter l'état des factures bloquées comme livré : « Il marche. Les tests, on les fera en recette. » Que fais-tu ?",
    choix: [
      "Tu acceptes, et tu notes le risque dans le registre",
      "Tu acceptes : la recette le testera de toute façon",
      "Tu le comptes à moitié ; il le finit à l'itération suivante",
      "Non : pas fini tant qu'il n'est pas testé et accepté"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Noter un risque que tu peux éviter tout de suite, c'est accepter une erreur connue au lieu de la refuser.",
      "Non. Livré sans test, c'est une dette : les erreurs s'accumulent jusqu'à la recette, où tout arrive en même temps.",
      "Non. « À moitié fini » n'existe pas : il est fini, ou il retourne au backlog. Sinon, l'avancement affiché est faux.",
      "Oui. En agile, « fini » = testé, et accepté par la cheffe comptable. L'agile ne touche pas à la qualité : ce qui n'est pas testé retourne au backlog."
    ],
    retenir: "En agile, « fini » veut dire testé et accepté : un écran non testé n'est pas livré."
  },
  {
    id: "cp06-q18",
    dialecte: "Gestion de projet",
    q: "Le consultant de l'intégrateur, sur la partie agile de DEMAT : « En agile, on ne documente pas le paramétrage. Les écrans qui marchent, c'est la doc. » Que fais-tu ?",
    choix: [
      "Tu mets la doc utile au run dans « fini », écran par écran",
      "Tu acceptes : l'agile préfère le logiciel qui marche à la doc",
      "Tu exiges un dossier complet avant chaque itération",
      "Tu écris toi-même la doc des écrans, à la fin, après les démos"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Une doc courte, utile au run (le support au quotidien), faite pendant l'itération : un écran n'est « fini » qu'avec elle. Ni roman, ni rien.",
      "Non. Le manifeste agile dit « plus que », pas « à la place de ». Sans doc, le support ne saura pas reprendre le paramétrage après la bascule.",
      "Non. Un dossier complet avant chaque itération, c'est figer le besoin flou : tu recrées un cycle en V.",
      "Non. Tu fais le travail du prestataire, en retard, sans savoir ce qu'il a paramétré. La doc arrive quand plus personne ne s'en souvient."
    ],
    retenir: "Agile ne veut pas dire sans doc : la doc utile au run fait partie de « fini »."
  },
  {
    id: "cp06-q19",
    dialecte: "Gestion de projet",
    q: "Après la 3e itération des écrans de la compta, le même souci revient : la compta découvre les écrans le jour de la démo, et les refuse. Que fais-tu ?",
    choix: [
      "Tu attends la fin de l'enveloppe pour en faire le bilan",
      "À la démo suivante, vous en parlez avec la compta",
      "En rétrospective, vous changez 1 ou 2 choses dans la méthode",
      "Tu passes les écrans restants en cycle en V, avec spécifications"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Attendre la fin, c'est répéter le même souci à chaque itération, et brûler l'enveloppe sur des écrans refusés.",
      "Non. Presque : il faut en parler, mais la démo sert à juger ce qui est livré. La façon de travailler se traite en rétrospective, avec l'intégrateur.",
      "Oui. La rétrospective sert à ça : regarder comment vous travaillez, et changer 1 ou 2 choses. Ex. : la cheffe comptable voit une maquette au milieu de l'itération.",
      "Non. Le souci vient de la façon de travailler, pas de l'agile. Spécifier d'avance un besoin flou ferait refuser les écrans à la recette."
    ],
    retenir: "La démo juge le produit ; la rétrospective améliore la façon de travailler, à chaque itération."
  },
  {
    id: "cp06-q20",
    dialecte: "Gestion de projet",
    q: "Deux itérations sont finies. La cheffe comptable, PO, a manqué les deux démos : « Trop de travail. » Depuis, l'intégrateur choisit seul quoi faire. Que fais-tu ?",
    choix: [
      "Tu valides les démos à sa place, pour ne pas bloquer",
      "Tu demandes au DAF de la rappeler à l'ordre, cette semaine",
      "Tu arrêtes l'agile : la suite passe en cycle en V",
      "Tu vois avec elle : un créneau fixe d'1 h, ou une suppléante"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Tu deviens PO sans le dire : la compta découvrira à la recette des écrans qu'elle n'a jamais vus.",
      "Non. Tu ne lui as encore rien proposé : monter au DAF d'abord la met contre toi (module cp16).",
      "Non. Tu changes de démarche sans traiter la cause, et sans le proposer au DAF. Et spécifier un besoin flou donne des écrans refusés.",
      "Oui. Sans PO, pas d'agile. Tu lui parles d'abord : un créneau court et fixe, ou quelqu'un de la compta qu'elle désigne par écrit."
    ],
    retenir: "Un PO absent des démos : on lui propose un créneau court et fixe, ou un suppléant. Sans PO, pas d'agile."
  },
  {
    id: "cp06-q21",
    dialecte: "Gestion de projet",
    q: "La cheffe comptable, PO des écrans de la compta, part 3 semaines en avril, pendant la recette. La dernière itération tombe dans son absence. Cette itération doit livrer l'état des rejets, attendu pour le pilote de mai. Que fais-tu ?",
    choix: [
      "L'intégrateur avance seul, et elle verra la démo à son retour",
      "Avant de partir, elle classe le backlog et désigne une suppléante",
      "Tu fais le PO pendant ces 3 semaines : tu connais le backlog",
      "Tu suspends l'itération : l'état attendra son retour de congé"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Personne ne valide pendant 3 semaines : si l'état ne convient pas, on le découvre à son retour, trop tard pour le pilote.",
      "Oui. Elle classe avant de partir, et désigne par écrit sa suppléante comme PO, ici Julie. Julie tient la démo et dit si l'état convient.",
      "Non. Presque : il faut quelqu'un, mais du métier. Toi à sa place, tu classes selon ta logique, et l'état sera rediscuté à son retour.",
      "Non. Suspendue, l'itération finirait en mai, en plein gel des changements : l'état manquerait le pilote. Une suppléante suffit."
    ],
    retenir: "PO absent : il classe avant de partir et désigne par écrit un suppléant du métier. Ni toi, ni l'intégrateur."
  },
  {
    id: "cp06-q22",
    dialecte: "Gestion de projet",
    q: "Dernier jour d'une itération. L'état des avoirs fournisseurs en attente n'est pas fini : il manque 1 jour de travail. Le consultant propose : « Allongeons l'itération d'une semaine, je finis tranquillement. » Que fais-tu ?",
    choix: [
      "Non : l'itération finit à sa date ; l'état retourne au backlog",
      "Oui : on allonge l'itération, l'état sera fini proprement",
      "Il finit ce week-end, en heures en plus, pour tenir la démo",
      "Tu demandes au DAF d'accorder une semaine de plus"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Une itération a une durée fixe. La démo a lieu à la date prévue ; l'état non fini retourne au backlog, et la cheffe comptable le reclasse.",
      "Non. Une itération qui s'allonge, c'est un planning qui glisse sans que personne l'ait décidé. Ce qui n'est pas fini repart au backlog.",
      "Non. Fini à la hâte, un week-end, l'état est mal testé : c'est la qualité qui paie. L'itération garde sa date, et l'état retourne au backlog.",
      "Non. Le DAF a fixé l'enveloppe, pas la date de chaque démo : tu lui montes un détail. Et une itération ne s'allonge pas."
    ],
    retenir: "Une itération a une durée fixe : ce qui n'est pas fini retourne au backlog ; on n'allonge pas l'itération."
  },
  {
    id: "cp06-q23",
    dialecte: "Gestion de projet",
    q: "Fin avril. Les 10 jours d'intégrateur de la partie agile sont consommés. Trois idées restent en bas du backlog. Le consultant : « Je les fais en 2 jours, si on saute les tests. » Que fais-tu ?",
    choix: [
      "Tu acceptes : le pilote de mai les testera en vrai",
      "Tu commandes 5 jours de plus : il est déjà là",
      "Tu acceptes, si la cheffe comptable les teste elle-même",
      "Les 3 attendent : enveloppe fixe, contenu variable"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Sauter les tests, c'est faire payer la qualité : les erreurs sortiront pendant le pilote, sur de vraies factures.",
      "Non. Des jours en plus, c'est le budget du DAF, et sa signature : pas ta décision. L'enveloppe deviendrait une régie sans fin.",
      "Non. Les tests ne disparaissent pas : ils passent à la compta, en pleine fin de recette. Et ces 2 jours sortent de l'enveloppe.",
      "Oui. Enveloppe vide : le bas du backlog attend, pas la qualité. Avec le gel de mai, ces idées attendent l'après-bascule (module cp10)."
    ],
    retenir: "Enveloppe consommée : le bas du backlog attend. On ne paie ni avec la qualité, ni avec un budget que personne n'a décidé."
  },
  {
    id: "cp06-q24",
    dialecte: "Gestion de projet",
    q: "Le DAF, sur la partie agile de DEMAT : « Avec ton agile, je ne sais même pas ce que j'aurai fin avril. » Que lui réponds-tu ?",
    choix: [
      "« Tout le backlog, fin avril : je m'y engage par écrit »",
      "« Sûr : 10 jours, fin avril. Probable : le haut du backlog »",
      "« C'est vrai : en agile, on ne promet rien d'avance »",
      "« Je t'écris le cahier des charges des écrans, pour te rassurer »"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Promettre tout le backlog, c'est promettre un contenu qui doit pouvoir varier. Fin avril, tu devras expliquer ce qui manque.",
      "Oui. Ce qui est fixe : 10 jours, fin avril. Ce qui est probable : le haut du backlog, classé par la cheffe comptable. Et il peut venir voir chaque démo.",
      "Non. L'agile promet le temps, le budget et un ordre de priorité. Dire « rien » lui donne raison de s'inquiéter.",
      "Non. Spécifier les écrans pour rassurer, c'est figer la partie floue : un cycle en V caché, et des écrans refusés plus tard."
    ],
    retenir: "En agile, on promet le temps, le budget et l'ordre des priorités ; le contenu exact se voit à chaque démo."
  },
  {
    id: "cp06-q25",
    dialecte: "Gestion de projet",
    q: "Les écrans de la compta ont été acceptés un par un, à chaque démo. Le consultant propose de les sortir de la recette du cœur : « Déjà validés. » Que fais-tu ?",
    choix: [
      "Tu acceptes : ils sont déjà validés, on gagne du temps",
      "Tu les sors, puisqu'ils ne modifient pas le flux légal",
      "Tu gardes un test de bout en bout, avec le connecteur",
      "Tu les gardes, et tu refais tous leurs tests un par un"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Une démo valide un écran seul, sur des données de test. L'état des factures bloquées dépend des statuts du connecteur : seul un test d'ensemble le prouve.",
      "Non. Ils ne modifient pas le flux, mais ils en dépendent : un statut mal transmis par le connecteur fausse l'écran.",
      "Oui. L'hybride finit par une recette d'ensemble : les écrans avec le connecteur, sur des factures de bout en bout. Pas tout refaire : tout relier.",
      "Non. Refaire chaque test déjà passé : tu dépenses la recette sur ce qui est prouvé. Ce qui manque, c'est l'ensemble."
    ],
    retenir: "Dans l'hybride, la recette finale teste l'ensemble : les parties itérées avec le cœur, de bout en bout."
  },
  {
    id: "cp06-q26",
    dialecte: "Gestion de projet",
    q: "Le consultant de l'intégrateur propose : « Faisons aussi le connecteur de la PA en sprints, avec une démo à la compta toutes les 2 semaines. » C'est le connecteur standard de la PA, prévu au contrat le 1er mars. Que réponds-tu ?",
    choix: [
      "« Non : un produit standard se paramètre, puis se teste »",
      "« Seulement si la PA livre son standard par morceaux »",
      "« D'accord : des démos à la compta, c'est mieux »",
      "« Hybride : connecteur en sprints, écrans cadrés »"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Le connecteur est un produit du fournisseur, prévu au 1er mars : on ne le construit pas, on le paramètre et on le teste. Il reste dans le cœur cadré.",
      "Non. La PA livre son produit à la date du contrat. Lui demander des morceaux, c'est renégocier un contrat pour une méthode.",
      "Non. La compta ne peut rien changer à un produit standard : elle verrait des démos sans pouvoir réagir. Du temps perdu pour elle.",
      "Non. C'est l'hybride à l'envers : le fixe (un produit livré à une date) en sprints, le flou (les écrans) figé."
    ],
    retenir: "Un produit standard d'un fournisseur se paramètre et se teste à sa date : il ne se construit pas en sprints."
  },
  {
    id: "cp06-q27",
    dialecte: "Gestion de projet",
    q: "L'intégrateur envoie son « plan projet type » pour DEMAT : 6 phases en cycle en V, 40 livrables, le même chez tous ses clients. Que fais-tu ?",
    choix: [
      "Tu le prends tel quel : c'est sa méthode, il la maîtrise",
      "Tu pars de son plan : V pour le cœur, itérations pour les écrans",
      "Tu le refuses : ta démarche s'applique, pas celle de l'intégrateur",
      "Tu demandes au DAF de choisir entre son plan et le tien"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Son plan type sert son organisation, pas ton projet : les écrans flous seraient spécifiés d'avance, et 40 livrables alourdiraient tout.",
      "Oui. Tu gardes ce qui sert (le V et ses tests pour le cœur), tu enlèves le superflu, et tu itères les écrans. Puis le DAF valide la démarche.",
      "Non. Son plan a de la valeur : c'est lui qui l'exécute. Le jeter, c'est perdre son expérience et repartir de zéro.",
      "Non. Proposer la démarche, c'est ton travail ; le DAF valide. Lui faire comparer deux plans, c'est lui renvoyer ton travail."
    ],
    retenir: "La démarche d'un intégrateur se prend comme base, puis s'adapte au projet."
  },
  {
    id: "cp06-q28",
    dialecte: "Gestion de projet",
    q: "Mars. Malgré un créneau fixe et deux rétrospectives, la partie agile de DEMAT patine. Les derniers écrans sont devenus clairs : tu veux les passer en spécifications écrites, comme le cœur. Que fais-tu ?",
    choix: [
      "Tu gardes l'agile coûte que coûte : la démarche est validée",
      "Tu changes, et tu l'annonces au prochain COPIL",
      "Tu le proposes au DAF, avec l'impact, avant de changer",
      "Tu demandes au DG de trancher, avec l'impact des deux"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Une démarche validée peut changer quand elle ne marche plus. S'acharner, c'est laisser l'intégrateur deviner et brûler l'enveloppe.",
      "Non. Presque : tu informes, mais après avoir décidé seul. Au COPIL (comité de pilotage), le DAF découvre un changement qu'il n'a pas validé.",
      "Oui. Tu proposes, le sponsor valide : ce qui change pour lui (contenu, dates, temps de la compta) et pourquoi. Puis tu changes.",
      "Non. Le DAF, ton sponsor, n'a même pas été saisi : aller au DG (directeur général), c'est sauter un niveau pour un sujet du projet."
    ],
    retenir: "Changer de démarche en cours : tu le proposes au sponsor, avec l'impact, avant de changer."
  },
  {
    id: "cp06-q29",
    dialecte: "Gestion de projet",
    q: "Tu es DSI adjoint. Appli de prise de commande pour les commerciaux : ils sauront ce qu'ils veulent en l'essayant. Un intégrateur propose : « Forfait de 60 k€ sur votre cahier des charges de 80 pages, livré en sprints de 3 semaines, avec une démo à chaque fin de sprint. » Quel est le vrai problème ?",
    choix: [
      "Aucun : forfait et sprints, c'est le meilleur des deux",
      "Le prix : un forfait coûte toujours plus cher qu'une régie",
      "Le rythme : une démo toutes les 3 semaines, c'est trop rare",
      "Le contenu figé : une idée née en démo devient un avenant"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Prix fixe et contenu figé : les sprints ne font que découper un cycle en V. Ce que la démo apprend ne pourra pas changer sans payer.",
      "Non. Un forfait n'est pas toujours plus cher. Le problème n'est pas le prix : c'est un contenu figé, sous des habits agiles.",
      "Non. 3 semaines, c'est un rythme normal de sprint. Le souci est ailleurs : rien de ce que montre la démo ne peut changer.",
      "Oui. C'est un faux agile : la démo montre, mais le cahier des charges décide. Pour un besoin qui se découvre : une enveloppe avec un PO (contrats : module cp14)."
    ],
    retenir: "Forfait sur un cahier des charges figé, livré en sprints : c'est un cycle en V déguisé, pas de l'agile."
  },
  {
    id: "cp06-q30",
    dialecte: "Gestion de projet",
    q: "Tu es DSI adjoint. Projet de portail fournisseurs, besoin encore flou. Le DAF veut un forfait (prix fixe) « pour maîtriser le prix ». Que proposes-tu ?",
    choix: [
      "Un forfait sur le besoin actuel, et des avenants pour les écarts",
      "Définir le besoin d'abord ; sinon, une régie plafonnée",
      "Une régie sans enveloppe : on paiera ce qu'il faudra, à la fin",
      "Un forfait sur un cahier des charges complet, livré en sprints"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Un besoin flou, figé tel quel, sera faux, et signé : chaque écart deviendra un avenant. Le prix « maîtrisé » ne l'est plus.",
      "Oui. Un forfait classique suppose un besoin défini. Soit on le définit d'abord (une phase courte), soit une régie avec un plafond et un PO (contrats : module cp14).",
      "Non. Sans enveloppe, personne ne maîtrise rien : le prix dépend du temps passé, sans limite décidée.",
      "Non. Un cahier des charges complet d'un besoin flou, livré en sprints : un cycle en V déguisé. Un vrai forfait agile, lui, fait varier le contenu."
    ],
    retenir: "Un forfait classique suppose un besoin défini avant ; sur un besoin flou, on le définit d'abord, ou on travaille en régie, avec un plafond."
  },
  {
    id: "cp06-q31",
    dialecte: "Gestion de projet",
    q: "Le DSI te confie la migration de ton entrepôt SQL Server vers Snowflake : mêmes tables, mêmes rapports, rien de nouveau. L'hébergeur actuel coupe le 30 juin. Quelle démarche ?",
    choix: [
      "Prédictif : tout est connu, mêmes résultats avant et après",
      "Agile : des sprints, et le modèle s'ajuste en route",
      "Hybride : la migration cadrée, les rapports refaits en itérations",
      "La démarche du prestataire Snowflake, sans l'adapter"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Contenu connu, date imposée : on cadre. Les tests comparent les mêmes chiffres avant et après, rapport par rapport.",
      "Non. « Rien de nouveau » : rien à découvrir. Ajuster le modèle en route, c'est changer des rapports que personne n'a demandé de changer.",
      "Non. Refaire les rapports, c'est glisser un 2e projet dans la migration, à date fixe. À l'identique d'abord ; les améliorations après.",
      "Non. Sa démarche sert son organisation. Pars de son plan, mais la liste, la date et les tests restent à toi."
    ],
    retenir: "Une migration à l'identique, à date imposée : prédictif, avec des tests qui comparent avant et après."
  },
  {
    id: "cp06-q32",
    dialecte: "Gestion de projet",
    q: "Octobre 2027 : DEMAT tourne. La compta veut maintenant améliorer ses états de suivi. Idées floues, cheffe comptable disponible, intégrateur en régie. Quelle démarche pour cette suite ?",
    choix: [
      "Pas de projet : la cheffe comptable écrit au support",
      "Hybride, comme DEMAT : un cœur cadré, puis des itérations",
      "Agile : des itérations, une enveloppe, un PO de la compta",
      "Un cycle en V : un cahier des charges de toutes les idées"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Sans enveloppe ni PO, les demandes passent au fil de l'eau : personne ne classe, et le budget file.",
      "Non. Il n'y a plus de cœur à cadrer : il tourne. Reprendre l'hybride par habitude, c'est cadrer pour rien.",
      "Oui. Idées floues, PO disponible, régie : de l'agile pur. Une enveloppe décidée par le DAF, des itérations, une démo à chaque fois.",
      "Non. Écrire d'avance des idées floues donne un cahier des charges faux. Elles se précisent en voyant les premiers états."
    ],
    retenir: "Sans partie fixe à cadrer, pas besoin d'hybride : besoin flou et PO disponible = agile."
  },
  {
    id: "cp06-q33",
    dialecte: "Gestion de projet",
    q: "Le DSI te confie un site de commande en ligne pour les clients pros, branché sur Divalto. Prix, stocks et commandes suivent des règles connues. Les pages et le parcours client sont à inventer, avec 3 clients volontaires. Quelle démarche ?",
    choix: [
      "Tout en agile : les règles de prix se découvriront en sprints",
      "Hybride : les pages cadrées, les règles de prix en itérations",
      "Hybride : les règles cadrées, les pages en itérations",
      "Tout en cycle en V : les pages client spécifiées au départ"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Les règles de prix, de stock et de commande sont connues : les « découvrir » en sprints, c'est risquer des prix faux en ligne.",
      "Non. C'est l'hybride à l'envers : tu figes l'inconnu (les pages) et tu fais varier le connu (les règles).",
      "Oui. Le connu se cadre (règles, échanges avec Divalto). L'inconnu s'itère, avec les 3 clients à chaque démo. Chaque partie a sa démarche.",
      "Non. Des pages écrites sans les clients seront refusées, ou ignorées. Le parcours se construit en les voyant essayer."
    ],
    retenir: "Hybride bien découpé : les règles connues se cadrent ; ce qui est à inventer s'itère avec les utilisateurs."
  },
  {
    id: "cp06-q34",
    dialecte: "Gestion de projet",
    q: "Le DSI te confie la nouvelle version du logiciel de paie : l'éditeur la livre en décembre, avec des règles déjà fixées. Elle doit tourner pour la paie de janvier. La RH (ressources humaines) propose des sprints. Que choisis-tu ?",
    choix: [
      "Des sprints avec la RH : elle voit la version en démo",
      "Rien de spécial : l'éditeur a testé sa version, on l'installe",
      "Hybride : l'installation cadrée, les tests en itérations",
      "Un plan daté : installer, tester sur une paie connue, basculer"
    ],
    bonne: 3,
    pourquoi: [
      "Non. La RH ne peut rien changer à la version de l'éditeur : les démos ne servent à rien. Et la date de la paie ne bouge pas.",
      "Non. L'éditeur teste sa version, pas votre paramétrage : une erreur de paie se découvrirait sur les bulletins des salariés.",
      "Non. Les tests ne sont pas flous : on compare une paie connue, avant et après. Les itérer n'apporte rien, et retarde la date.",
      "Oui. Produit d'un fournisseur, règles fixées, date imposée : on planifie. Le test compare une paie déjà connue avec la nouvelle version."
    ],
    retenir: "La version d'un éditeur, à date imposée : un plan daté et des tests, pas des sprints."
  },
  {
    id: "cp06-q35",
    dialecte: "Gestion de projet",
    q: "Les factures des fournisseurs étrangers arrivent encore en PDF. Le DSI te confie l'essai d'un outil de lecture automatique. Personne ne sait s'il marchera sur vos factures. Quelle démarche ?",
    choix: [
      "Des essais courts, sur vos factures ; stop s'il échoue",
      "Prédictif : le cahier des charges complet de l'outil",
      "Hybride : tout l'outil spécifié, puis des essais en itérations",
      "Attendre qu'un autre client l'ait essayé sur ses factures"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Tout est incertain : on avance par petits essais, sur de vraies factures. Si l'outil échoue, on s'arrête tôt, et on a peu dépensé.",
      "Non. Un cahier des charges complet pour un outil dont on ignore s'il marche : des semaines d'écriture, peut-être pour rien.",
      "Non. Presque : des essais, oui. Mais spécifier tout l'outil avant de savoir s'il marche, c'est figer l'inconnu.",
      "Non. Les factures d'un autre client ne sont pas les vôtres : son essai ne dira pas si l'outil lit vos fournisseurs."
    ],
    retenir: "Quand personne ne sait si ça marchera, l'agile avance par petits essais, et sait s'arrêter tôt."
  },
  {
    id: "cp06-q36",
    dialecte: "Gestion de projet",
    q: "Tu es DSI adjoint. Le responsable ADV (administration des ventes) veut un état Divalto des commandes en retard, trié par client : besoin clair, 1 jour de travail pour ton équipe. Il propose : « J'écris le besoin en 3 lignes, et je teste l'état. » Que réponds-tu ?",
    choix: [
      "« Non : il faut un PO, un backlog, un sprint et une démo »",
      "« Non : d'abord des spécifications et 3 niveaux de tests »",
      "« Oui : pour 1 jour de travail, c'est la bonne taille »",
      "« Oui, mais sans rien écrire : mon équipe sait le faire »"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Tout l'appareil de Scrum pour 1 jour de travail : la démarche coûterait plus que la demande.",
      "Non. Des spécifications et trois niveaux de tests pour un état d'1 jour : c'est disproportionné.",
      "Oui. Petit et clair : une démarche légère suffit. Le besoin écrit en 3 lignes, et un test par celui qui l'utilisera.",
      "Non. Presque : la démarche légère est bonne. Mais sans besoin écrit, l'état sera « presque bon » : tri, colonnes, filtres à refaire."
    ],
    retenir: "La démarche a la taille du besoin : un petit besoin clair n'a besoin ni de Scrum, ni d'un cycle en V complet."
  },
  {
    id: "cp06-q37",
    dialecte: "Gestion de projet",
    q: "Tu es DSI adjoint. Le DG (directeur général) veut lancer la refonte des achats dans Divalto : 2 ans, beaucoup d'inconnues. Il demande d'engager tout le budget dès maintenant. Que proposes-tu ?",
    choix: [
      "Attendre que toutes les inconnues soient levées pour lancer",
      "Tout engager : un seul budget, plus simple pour la direction",
      "Des sprints, sans budget ni étapes : on verra où on arrive",
      "Pas tout d'un coup : des étapes, et une décision à chacune"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Sur 2 ans, toutes les inconnues ne se lèvent jamais d'avance : certaines ne se lèvent qu'en avançant.",
      "Non. Engager 2 ans sur des inconnues, c'est découvrir les écarts quand l'argent est dépensé. Personne ne pourra plus arrêter à temps.",
      "Non. L'agile a aussi un budget et des limites (module cp04) : sans eux, personne ne sait quand s'arrêter.",
      "Oui. C'est la gestion par étapes (PRINCE2, la méthode britannique) : à la fin de chaque étape, la direction voit les faits et décide de la suite."
    ],
    retenir: "Un gros projet incertain se découpe en étapes, avec une décision à la fin de chacune (PRINCE2)."
  },
  {
    id: "cp06-q38",
    dialecte: "Gestion de projet",
    q: "Tu es DSI adjoint. Un chef de projet de ton équipe propose : « Passons tous nos projets en Scrum : tout le monde parlera pareil. » Que réponds-tu ?",
    choix: [
      "« Non : un cadre commun, et la démarche choisie par projet »",
      "« Oui, mais seulement pour les nouveaux projets, dès janvier »",
      "« Oui : Scrum partout, et Kanban pour le support »",
      "« Non : chacun fait comme il veut, sans cadre commun »"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Ce qui doit être commun : les étapes de décision, le reporting. La démarche, elle, dépend du besoin, du contrat et du métier.",
      "Non. Un nouveau projet peut avoir un besoin stable et une date fixe : Scrum n'y serait pas meilleur. Le critère, c'est le projet, pas sa date de départ.",
      "Non. Presque pour le support : un flux lui convient. Mais une migration à l'identique ou un connecteur standard ne gagnent rien aux sprints : la démarche se choisit par projet.",
      "Non. Sans cadre commun, la direction ne peut plus suivre ni comparer les projets : chacun son reporting, chacun ses mots."
    ],
    retenir: "Un cadre commun pour piloter, mais une démarche choisie projet par projet."
  },
  {
    id: "cp06-q39",
    dialecte: "Gestion de projet",
    q: "Tu es DSI adjoint. Trois projets. 1 : changer de messagerie, à l'identique, avant une date fixe. 2 : une appli de stock, à inventer avec les magasiniers. 3 : des règles de stock connues, et des écrans de dépôt encore flous. Quelle répartition ?",
    choix: [
      "1 : hybride · 2 : agile · 3 : cycle en V",
      "1 : agile · 2 : hybride · 3 : cycle en V",
      "1 : cycle en V · 2 : agile · 3 : hybride",
      "1 : cycle en V · 2 : hybride · 3 : agile"
    ],
    bonne: 2,
    pourquoi: [
      "Non. La messagerie à l'identique n'a pas de partie floue. Et un cycle en V figerait les écrans de dépôt, encore flous.",
      "Non. Une messagerie à l'identique n'a rien à découvrir en sprints. Et l'appli à inventer n'a pas de cœur fixe à cadrer.",
      "Oui. À l'identique et daté : cycle en V. À inventer, avec les utilisateurs : agile. Des règles fixes et une partie floue : hybride.",
      "Non. L'appli à inventer n'a pas de cœur fixe. Et tout en agile, des règles de stock connues « se découvriraient » en route."
    ],
    retenir: "Une démarche par projet : stable = cycle en V, à inventer = agile, un cœur fixe et une partie floue = hybride."
  }
];
