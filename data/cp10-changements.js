// Chef de projet SI — Questions du module cp10 « Les demandes de changement ».
// Le CIRCUIT d'une demande de changement : la trier (anomalie, changement, ta délégation, plan B décidé d'avance), l'écrire
// (qui, quoi, pourquoi, pour quand), mesurer son impact sur tout le projet (délai, coût, risque, qualité, autres lots, recette),
// poser les options (dont « ne rien changer »), la faire décider par la bonne autorité, la tracer au registre des changements,
// mettre à jour les références, signer la commande ou l'avenant AVANT de commencer (cp14), l'annoncer. Plus : la dérive par
// petits pas, le changement urgent (circuit court mais tracé), le gel dès le pilote de mai, la partie agile (backlog, PO,
// enveloppe de 10 jours), l'autorité et le budget de changement de PRINCE2 (sur un projet Power BI, car pas de budget de
// changement délégué sur le cœur de DEMAT).
// Fil rouge DEMAT 2027 (fiche fil rouge de docs/plan-chef-de-projet.md, qui fait foi). DAF = sponsor ET manager de la cheffe
// comptable. Intégrateur en régie : des jours en plus = une nouvelle commande signée par le DAF avant de commencer.
// Plan B (portail de la PA, prévu au contrat) : il part seul si le connecteur n'est pas livré au 15 mars (pas de demande de
// changement). Gel : seuls passent les anomalies bloquantes et les obligations légales ; le lever = décision du DAF. Aucun montant d'amende.
// Frontières : cp18 = faut-il dire oui (déjà traité : le texte ambigu relu ensemble, cp18-q33) ; cp17 = les mots ; cp14 = le contrat.
// Anti-devinette : la bonne réponse est un extrême dans 10 questions sur 41 : le oui simple (q08, q32, q40, q41), la plus petite
// action (q22), le non net (q20, q38), le DAF ou le sponsor quand il le faut (q02, q15, q37). « Ne rien changer » est juste en q30.
// Ailleurs, elle est au milieu. « DAF », « COPIL », « sponsor », « chiffr », « impact », « registre », « circuit », « backlog »,
// des chiffres et des dates sont aussi dans des choix faux. Règles de devinette calculées : toutes à 50 % ou moins ;
// « le choix avec DAF / sponsor / COPIL » 15 %, « le choix avec chiffrer / impact / registre » 24 %.
LEARNSQL.questions.cp10 = [
  {
    id: "cp10-q01",
    dialecte: "Gestion de projet",
    q: "Recette. Quatre tickets sont ouverts. Lequel est une anomalie, et non un changement ?",
    choix: [
      "Julie voudrait un 2e état des factures en attente, trié par fournisseur",
      "Le cahier de recette prévoit un avoir lié à sa facture : il ne l'est pas",
      "En recette, le PDF suit le modèle validé, mais l'ADV le trouve chargé",
      "Un client EDI exige un nouveau code dans ses factures, dès juin"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Un besoin nouveau, pas une erreur. Ici, un état de suivi de la compta : il va au backlog, et la cheffe comptable le classe.",
      "Oui. Ce qui est livré n'est pas conforme à ce qui est écrit dans le cahier de recette : c'est une anomalie. Le prestataire la corrige dans le cadre de son contrat.",
      "Non. Le PDF est conforme au modèle validé : le changer pour un goût, c'est un changement.",
      "Non. Une exigence nouvelle d'un client : c'est un changement, même pressé. Il suit le circuit."
    ],
    retenir: "Anomalie = non conforme à ce qui est écrit. Un besoin nouveau, un goût, une exigence nouvelle : ce n'en est pas une."
  },
  {
    id: "cp10-q02",
    dialecte: "Gestion de projet",
    q: "Février. Quatre demandes arrivent. Laquelle passe par le circuit complet de changement ?",
    choix: [
      "3 jours d'intégrateur en plus, pour un nouveau flux EDI",
      "Une idée d'écran de suivi pour la compta, dans l'enveloppe",
      "Un test de plus pour Julie, dans ses créneaux déjà réservés",
      "Inverser 2 ateliers de paramétrage dans la même semaine"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Des jours d'intégrateur en plus touchent le budget et la commande : demande écrite, chiffrée, décidée par le DAF, puis commande signée avant de commencer.",
      "Non. C'est la partie agile : l'idée va au backlog, et la cheffe comptable la classe dans l'enveloppe. Pas de circuit.",
      "Non. Dans ses créneaux, sans rien bouger : c'est ta délégation.",
      "Non. L'ordre des ateliers, sans coût ni date touchée : c'est ta délégation. Tu décides, et tu informes."
    ],
    retenir: "Le circuit complet, seulement quand le périmètre, le budget, une date validée ou un contrat bougent."
  },
  {
    id: "cp10-q03",
    dialecte: "Gestion de projet",
    q: "Le responsable de site te dit, en passant : « Il faudrait que mon dépôt valide chaque facture fournisseur avant la compta. » Rien d'autre. Que fais-tu d'abord ?",
    choix: [
      "Tu le fais chiffrer par l'intégrateur, tout de suite",
      "Tu lui dis d'en parler au DAF, qui décide du périmètre",
      "Tu l'écris avec lui : qui, quoi, pourquoi, pour quand",
      "Rien pour l'instant : une demande orale ne compte pas"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Presque : il faudra mesurer l'impact, mais pas avant de savoir pourquoi. Sans le besoin, l'intégrateur chiffre une solution au hasard.",
      "Non. Le DAF recevrait une phrase, sans pourquoi ni impact : il déciderait à l'aveugle. L'entrée du circuit, c'est toi.",
      "Oui. Une demande commence par un écrit : qui demande, quoi, pourquoi, pour quand. Ensuite seulement, l'impact.",
      "Non. Tu perds une demande peut-être utile. Une demande orale, tu l'écris toi-même, et tu la fais relire."
    ],
    retenir: "Une demande commence par un écrit : qui, quoi, pourquoi, pour quand. Orale ? Tu l'écris, et tu la fais relire."
  },
  {
    id: "cp10-q04",
    dialecte: "Gestion de projet",
    q: "Recette. Sophie, comptable clients, ouvre une anomalie : « Les factures n'ont que le logo de la société. Il faut celui de chaque dépôt. » La spécification validée prévoit un seul logo. Que fais-tu ?",
    choix: [
      "Tu la laisses en anomalie : l'intégrateur la corrigera",
      "Tu en fais une demande de changement, et tu lui dis pourquoi",
      "Tu la refermes : conforme, c'est noté au registre",
      "Tu demandes au DAF de trancher : est-ce une anomalie ou un changement ?"
    ],
    bonne: 1,
    pourquoi: [
      "Non. La facture est conforme à la spécification validée : ce n'est pas une anomalie. L'intégrateur ferait un ajout que personne n'a décidé.",
      "Oui. Conforme à l'écrit, mais un besoin nouveau : c'est un changement. Il suit le circuit (écrit, impact, décision), et Sophie sait pourquoi son ticket change.",
      "Non. Conforme, oui, mais son besoin est peut-être réel : refermer sans suite, c'est le perdre. Il mérite le circuit.",
      "Non. Le texte est clair : un seul logo. Trier un ticket, c'est ton travail, pas celui du sponsor."
    ],
    retenir: "Conforme à l'écrit, mais on veut autre chose : ce n'est pas une anomalie, c'est une demande de changement."
  },
  {
    id: "cp10-q05",
    dialecte: "Gestion de projet",
    q: "Le contrat de la PA dit : son connecteur transmet le SIREN du client. En recette, il ne le transmet pas, alors qu'il est dans Divalto. Le chef de projet de la PA parle d'« évolution » et envoie un devis. Que fais-tu ?",
    choix: [
      "Tu ouvres une anomalie : la PA doit corriger, sans devis",
      "Tu chiffres l'impact, puis le DAF signe un avenant",
      "Tu acceptes son devis : sans SIREN, les factures sont rejetées",
      "Tu demandes au DAF de bloquer le paiement de l'abonnement"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Non conforme à ce que dit le contrat : c'est une anomalie, pas une évolution. Elle va au suivi de recette, et la PA la corrige dans le cadre de son contrat.",
      "Non. Le circuit de changement pour une anomalie : le DAF paierait par avenant ce qui est déjà dû.",
      "Non. Tu paies une 2e fois ce que le contrat couvre déjà. Ce n'est pas un besoin nouveau : c'est une anomalie.",
      "Non. Trop fort, trop tôt : la PA n'a pas encore refusé de corriger. On signale d'abord l'anomalie, contrat en main."
    ],
    retenir: "Non conforme à l'écrit : une anomalie, corrigée dans le cadre du contrat. Ni devis, ni avenant."
  },
  {
    id: "cp10-q06",
    dialecte: "Gestion de projet",
    q: "Demande n° 9 : le code du magasin livré dans les factures EDI d'un client de la grande distribution. L'intégrateur chiffre 3 jours, environ 2 250 €. Tu prépares la décision du DAF. Que te manque-t-il ?",
    choix: [
      "Rien : avec ce chiffrage, le DAF peut décider",
      "L'effet sur la recette, les autres flux EDI et la bascule",
      "Le devis d'un 2e intégrateur, pour comparer les prix",
      "Le planning de l'intégrateur, tâche par tâche, jour par jour"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Un devis donne les jours du prestataire, pas l'impact sur le projet. Le DAF découvrira après les tests à refaire et le risque.",
      "Oui. L'impact se mesure sur tout le projet : délai, coût, risque, recette (les tests à refaire), autres lots. Le devis n'en est qu'une ligne.",
      "Non. Un 2e intégrateur pour 3 jours : des semaines perdues, et un nouveau venu ne connaît pas votre paramétrage.",
      "Non. Le détail du travail ne dit pas ce que le changement coûte au projet : tests à refaire, risque, date."
    ],
    retenir: "Un devis n'est pas une analyse d'impact : délai, coût, risque, recette et autres lots, sur tout le projet."
  },
  {
    id: "cp10-q07",
    dialecte: "Gestion de projet",
    q: "Au COPIL du 9 février, le DAF a dit oui à une demande de 3 jours d'intégrateur. L'intégrateur veut commencer demain. La commande n'est pas encore signée. Que fais-tu ?",
    choix: [
      "Il commence demain : le DAF a dit oui devant le COPIL",
      "Il commence demain : le compte rendu du COPIL vaut commande",
      "Il commence quand le DAF a signé la commande",
      "Tu attends le COPIL de mars, qui validera le registre"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Un oui oral ne vaut pas commande. Sans commande signée, ces jours sont facturés sans engagement écrit.",
      "Non. Presque : la décision est écrite, c'est bien. Mais un compte rendu n'est pas une commande : ni le prix ni le contenu ne sont engagés envers l'intégrateur.",
      "Oui. La décision, puis la commande signée par le DAF, puis le travail. La signature prend un jour, pas un mois (module cp14).",
      "Non. La décision est prise : attendre un mois pour la faire revalider retarde le travail, et use le sponsor."
    ],
    retenir: "Une décision ne suffit pas : la commande ou l'avenant est signé avant de commencer."
  },
  {
    id: "cp10-q08",
    dialecte: "Gestion de projet",
    q: "Février, avant la recette. L'intégrateur propose de remplacer 2 règles de son paramétrage par une seule : même résultat, aucun coût, aucune date touchée. Que fais-tu ?",
    choix: [
      "Tu la fais valider par le DAF : c'est le paramétrage du cœur",
      "Tu demandes d'abord un devis à l'intégrateur, par écrit",
      "Tu la notes pour après la bascule : on ne touche à rien",
      "Tu acceptes, et tu l'annonces au COPIL suivant"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Le cœur est cadré, mais rien ne bouge ici : ni périmètre, ni budget, ni date, ni contrat. Le DAF n'a rien à décider.",
      "Non. Le coût est nul, c'est dit : un devis de plus, c'est du temps perdu pour un choix technique de ton niveau.",
      "Non. Avant la recette, ce changement ne coûte rien. Après la bascule, il faudrait retester, en production : le moment change le prix.",
      "Oui. Rien ne bouge (coût, date, périmètre, contrat) : c'est dans ta délégation. Tu décides, et tu informes le COPIL."
    ],
    retenir: "Sans coût, sans date, sans périmètre ni contrat touché : pas de circuit. Tu décides, et tu informes."
  },
  {
    id: "cp10-q09",
    dialecte: "Gestion de projet",
    q: "Le connecteur n'était pas livré au 15 mars : le plan B (le portail de la PA, prévu au contrat) est parti le 16, DAF prévenu. L'intégrateur te dit : « Il faut ouvrir une demande de changement, pour régulariser. » Que fais-tu ?",
    choix: [
      "Tu l'ouvres : le DAF signe, et le COPIL valide le plan B",
      "Non : décidé d'avance ; tu mets le planning à jour",
      "Non : rien à écrire, le plan B était prévu",
      "Tu l'ouvres pour le COPIL d'avril, qui tranchera"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Le plan B a été préparé à froid, et il est prévu au contrat : personne ne le « tranche », ni avant, ni après. Ce circuit ne servirait à rien.",
      "Oui. Décidé d'avance : pas de demande de changement. Mais les références suivent : le planning, et le registre des risques, où le risque est devenu un problème.",
      "Non. Presque : pas de circuit. Mais le planning a changé : sans mise à jour, plus personne ne sait ce qui est prévu.",
      "Non. Le COPIL n'a rien à trancher : le plan B est déjà parti. Il est informé, pas consulté."
    ],
    retenir: "Ce qui a été décidé d'avance (un plan B et son déclencheur) ne repasse pas par le circuit : on met à jour les références, et on informe."
  },
  {
    id: "cp10-q10",
    dialecte: "Gestion de projet",
    q: "En 2 semaines, 3 demandes de changement arrivent. Leur impact est chiffré. Aucune ne presse : rien ne bloque avant 2 mois. Le COPIL a lieu dans 10 jours. Que fais-tu ?",
    choix: [
      "Tu les présentes ensemble au prochain COPIL",
      "Tu les fais démarrer ; le COPIL régularisera",
      "Tu attends d'en avoir 10, pour un COPIL dédié",
      "Tu appelles le DAF le jour même, impact par impact"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Pas d'urgence : tu regroupes. Le COPIL décide en une fois, en voyant le total.",
      "Non. Démarrer avant la décision, c'est la dérive : le COPIL ne ferait que constater.",
      "Non. Les demandes vieillissent, et certaines deviendront urgentes. Le COPIL mensuel suffit.",
      "Non. Rien ne presse : 3 appels pour 3 demandes, c'est le sponsor dérangé pour rien. Il décide mieux en une fois."
    ],
    retenir: "Rien ne presse : les demandes chiffrées se regroupent pour le COPIL. Urgent : le DAF, le jour même."
  },
  {
    id: "cp10-q11",
    dialecte: "Gestion de projet",
    q: "En COPIL, le DAF a refusé la demande n° 11 de la cheffe comptable : 8 jours d'intégrateur. Elle n'était pas là. Que fais-tu ?",
    choix: [
      "Tu notes le refus, et tu lui dis pourquoi",
      "Tu supprimes la demande du registre : elle ne se fera pas",
      "Tu la remets au COPIL suivant, et tu la chiffres mieux",
      "Tu laisses le DAF le lui dire : c'est son manager"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Un refus se trace aussi : décision, qui, quand. Elle l'apprend de toi, avec la raison : la demande ne reviendra pas chaque mois.",
      "Non. Effacée, la demande revient dans 3 mois, et personne ne sait qu'elle a été refusée, ni pourquoi.",
      "Non. Rien n'a changé : la représenter, c'est contester la décision du DAF. Un fait nouveau, oui ; la même demande, non.",
      "Non. Le DAF a d'autres sujets : sans toi, elle l'apprendra tard, ou sans la raison. Le circuit, c'est toi qui le fermes."
    ],
    retenir: "Un refus se trace et s'annonce, avec sa raison : sinon, la demande revient."
  },
  {
    id: "cp10-q12",
    dialecte: "Gestion de projet",
    q: "Laquelle de ces lignes du registre des changements est complète ?",
    choix: [
      "N° 9 · ADV · code magasin · urgent, à faire vite · confié à l'intégrateur",
      "N° 9 · ADV · code magasin · 3 jours, 6 tests · accepté par le DAF le 9/02",
      "N° 9 · code magasin · 3 jours, 6 tests à refaire · accepté · en cours",
      "N° 9 · ADV · code magasin · 3 jours · à voir avec le DAF au COPIL"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Ni impact ni décision : « urgent » n'est pas un chiffre, et personne n'a dit oui.",
      "Oui. Qui demande, quoi, l'impact (jours, tests), la décision, qui l'a prise et quand : on retrouve tout, même dans 6 mois.",
      "Non. Qui l'a demandée ? Qui l'a acceptée, et quand ? Dans 3 mois, personne ne saura qui a engagé ces 3 jours.",
      "Non. Pas encore de décision : la ligne est juste, mais pas complète. Rien ne doit démarrer."
    ],
    retenir: "Une ligne du registre : qui demande, quoi, l'impact, la décision, qui l'a prise et quand."
  },
  {
    id: "cp10-q13",
    dialecte: "Gestion de projet",
    q: "Au COPIL, que montres-tu du registre des changements ?",
    choix: [
      "Toutes les demandes, une par une, depuis le début du projet",
      "Rien : c'est ton outil ; le COPIL suit le planning et le budget",
      "Les demandes à décider, et le total déjà accepté : jours, euros",
      "Les seules demandes refusées, pour montrer que tu tiens bon"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Une liste complète noie le COPIL : il a 10 minutes, pas une heure. Le détail reste disponible.",
      "Non. Sans le total, le COPIL ne voit pas la dérive : 10 petits oui ne se lisent pas dans un planning.",
      "Oui. Le COPIL décide ce qui attend, et voit le cumul : c'est là qu'une dérive par petits pas devient visible.",
      "Non. Le COPIL n'a pas à juger ta fermeté : il doit voir ce qui reste à décider, et ce qui est déjà engagé."
    ],
    retenir: "Au COPIL : les demandes à décider, et le total déjà accepté. C'est le total qui montre la dérive."
  },
  {
    id: "cp10-q14",
    dialecte: "Gestion de projet",
    q: "Le DAF, ton sponsor, en couloir : « Ajoute un tableau de bord mensuel des factures pour le comité de direction. Pas besoin de ton circuit pour moi : c'est moi qui décide. » Que fais-tu ?",
    choix: [
      "Tu lances l'intégrateur : c'est lui qui décide, c'est son droit",
      "Tu lui donnes le prix d'ici jeudi ; il décide, tu l'écris",
      "Tu refuses, et tu lui envoies le formulaire à remplir",
      "Tu en parles d'abord à ton DSI, pour qu'il le raisonne"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Il décide, oui, mais il n'a pas vu le prix : jours d'intégrateur, tests, peut-être la date. Il le découvrira sur la facture.",
      "Oui. C'est bien lui qui décide, en connaissant le prix. Pour le sponsor, le circuit est court : l'impact en 2 jours, sa décision, une ligne au registre.",
      "Non. Le formulaire n'est pas le but : écrire sa demande, c'est ton travail. Lui, il doit voir le prix.",
      "Non. Ton DSI n'est pas le sponsor de DEMAT : tu contournes le DAF, au lieu de lui donner le prix."
    ],
    retenir: "Le sponsor décide, mais en connaissant le prix : sa demande suit le circuit, en court."
  },
  {
    id: "cp10-q15",
    dialecte: "Gestion de projet",
    q: "Pour tenir le planning, l'intégrateur propose : « Retirons la formation de la compta, ils apprendront en faisant. » Elle est au périmètre validé. Que fais-tu ?",
    choix: [
      "Tu acceptes : moins de travail, moins de risque de retard",
      "Tu gardes la moitié des sessions : chacun fait un pas",
      "Tu demandes l'accord de la cheffe comptable, puis tu retires",
      "Tu en fais une demande de changement : impact, options, DAF"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Retirer, c'est aussi changer le périmètre. Sans formation, la clôture en 5 jours ouvrés est en danger, et personne ne l'a décidé.",
      "Non. Tu changes le périmètre seul, à moitié : ni le DAF ni la compta n'ont choisi ce risque.",
      "Non. Presque : son avis compte dans l'impact. Mais le périmètre validé, c'est le DAF qui le change.",
      "Oui. Retirer est un changement, comme ajouter : impact (adoption, clôture), options, et le DAF décide. C'est peut-être une bonne option : à lui de la choisir."
    ],
    retenir: "Retirer quelque chose du périmètre est aussi un changement : il suit le même circuit."
  },
  {
    id: "cp10-q16",
    dialecte: "Gestion de projet",
    q: "L'intégrateur a livré un changement validé : un nouveau code dans les factures EDI d'un client. La recette des flux EDI était finie. Que fais-tu retester ?",
    choix: [
      "Le nouveau code, et les flux EDI qu'il touche",
      "Le nouveau code, sur 2 ou 3 factures de ce client",
      "Toute la recette, depuis le début : 6 semaines de plus",
      "Rien : l'intégrateur l'a testé chez lui avant de livrer"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Le nouveau, et la non-régression : vérifier que ce qui marchait marche encore. C'est l'impact « recette » d'un changement.",
      "Non. Presque : le nouveau code, oui. Mais un changement peut casser ce qui marchait : les flux EDI qu'il touche se retestent aussi.",
      "Non. Trop fort : tout retester pour un code, c'est 6 semaines perdues. On reteste ce que le changement touche.",
      "Non. Ses tests ne remplacent pas la recette du métier : il teste ce qu'il a compris, pas vos cas réels."
    ],
    retenir: "Après un changement, on reteste le nouveau et ce qu'il touche (la non-régression) : pas tout, ni rien."
  },
  {
    id: "cp10-q17",
    dialecte: "Gestion de projet",
    q: "Le DAF a décidé : les avoirs clients sortent du pilote de mai, et entreront à la bascule de juin. Que mets-tu à jour ?",
    choix: [
      "Le contrat de la PA, par un avenant signé du DAF",
      "Rien : c'est provisoire, tout revient après le pilote",
      "Le planning et les tests du pilote ; la décision au registre",
      "La note de cadrage, le budget et la commande de l'intégrateur"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Ni le prix ni le service de la PA ne changent : un avenant ne sert que si un contrat bouge.",
      "Non. Provisoire ou pas, le plan validé a changé : sans mise à jour, on testera encore les avoirs en mai, ou on les oubliera en juin.",
      "Oui. Le contenu du pilote change : son planning et ses tests suivent. Le registre garde la décision, qui l'a prise et quand.",
      "Non. Le périmètre du projet ne change pas : les avoirs passent toujours à la bascule. Ni budget ni commande ne bougent."
    ],
    retenir: "Après une décision, on met à jour ce qui a bougé, et seulement ça : un avenant, seulement si un contrat change."
  },
  {
    id: "cp10-q18",
    dialecte: "Gestion de projet",
    q: "Février. Depuis novembre, tu as dit oui à 8 petites demandes d'1 jour d'intégrateur, chacune « trop petite pour le DAF ». La semaine de marge de recette a disparu. Que fais-tu ?",
    choix: [
      "Tu continues : chacune reste petite, c'est la règle",
      "Tu prends la semaine sur la recette, et tu n'en parles pas",
      "Tu montres le total au DAF ; ensuite, chaque demande au registre",
      "Tu gèles toute demande dès aujourd'hui, jusqu'à la bascule"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Huit petits oui font 8 jours que personne n'a décidés. Continuer, c'est laisser la dérive manger la suite.",
      "Non. La qualité paie en silence : moins de tests, et les erreurs sortent après la bascule. Le DAF n'a toujours rien vu.",
      "Oui. Le total (8 jours, environ 6 000 €, la marge mangée) est une vraie décision, pour le DAF. Ensuite, chaque demande passe au registre, qui fait le total, même les petites.",
      "Non. Trop fort : un gel en février bloque aussi les demandes utiles, et ne règle rien. Le problème n'est pas les demandes, c'est qu'elles n'étaient pas décidées."
    ],
    retenir: "De petits oui jamais décidés font une grosse décision : le registre fait le total, et le DAF le voit."
  },
  {
    id: "cp10-q19",
    dialecte: "Gestion de projet",
    q: "Le consultant de l'intégrateur ajoute de lui-même de « petites améliorations » au paramétrage : « Je vous les offre. » L'intégrateur est en régie. Que fais-tu ?",
    choix: [
      "Tu le remercies, et tu le dis à la compta : c'est offert",
      "Tu le laisses faire, s'il les teste lui-même avant",
      "Tu le recadres : rien sans décision, même si c'est offert",
      "Tu demandes au DAF des pénalités pour ce travail non demandé"
    ],
    bonne: 2,
    pourquoi: [
      "Non. En régie, chaque heure est facturée : rien n'est offert. Et un ajout que personne n'a demandé doit quand même être testé.",
      "Non. Presque : tester, oui. Mais ses tests ne remplacent pas la recette du métier, et les heures restent facturées.",
      "Oui. Ses idées sont peut-être bonnes : elles passent par le circuit, comme les autres. Rien ne se fait sans décision, même « offert ».",
      "Non. Trop fort : il croit bien faire. Un recadrage suffit, et ses idées peuvent servir."
    ],
    retenir: "« Offert » n'existe pas en régie : un ajout non demandé passe par le circuit, comme le reste."
  },
  {
    id: "cp10-q20",
    dialecte: "Gestion de projet",
    q: "Le DAF a refusé une demande de 2 jours, en connaissant le prix. Le commercial dit à l'intégrateur : « Prends-les sur les jours déjà commandés, personne ne verra rien. » L'intégrateur t'en parle. Que fais-tu ?",
    choix: [
      "Tu acceptes : ces jours sont déjà payés, rien ne bouge",
      "Tu acceptes 1 jour sur les 2 : chacun fait un pas",
      "Tu la fais chiffrer à nouveau, pour le DAF",
      "Non : refusée, et ces jours servent à autre chose"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Ces jours sont prévus pour d'autres tâches : il faudra les recommander plus tard. Et tu contournes une décision du DAF.",
      "Non. Un compromis sur une décision du sponsor, c'est la contourner à moitié. Et le trou réapparaît plus tard.",
      "Non. Rien n'a changé : refaire chiffrer la même demande pour le DAF, c'est contester sa décision. Un fait nouveau, oui ; la même demande, non.",
      "Oui. Le DAF a décidé en connaissant le prix : on applique. Les jours commandés servent au plan validé ; prendre dessus, c'est une dérive cachée."
    ],
    retenir: "Prendre un changement sur les jours déjà commandés, c'est une dérive cachée : le trou réapparaît plus tard."
  },
  {
    id: "cp10-q21",
    dialecte: "Gestion de projet",
    q: "Tu découvres que l'intégrateur a ajouté un champ aux factures émises, à la demande directe du commercial. 1 jour facturé. Personne d'autre ne le savait. Que fais-tu ?",
    choix: [
      "Il repasse par le circuit : on décide de le garder ou non",
      "Tu rappelles la règle aux deux ; le champ reste, c'est fait",
      "Tu dis au commercial d'aller le défendre auprès du DAF",
      "Tu fais retirer le champ dès demain, aux frais de l'intégrateur"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Fait sans décision, il repasse par le circuit : impact (tests, format de la PA), puis décision de le garder ou non. Et tu rappelles que les demandes passent par toi.",
      "Non. Presque : la règle se rappelle. Mais le champ reste sans que personne ait vu son impact : tests, format de la PA, rejets possibles.",
      "Non. Le circuit, c'est toi qui le tiens : le DAF recevrait un plaidoyer, sans impact ni options. Et la règle n'est pas rappelée.",
      "Non. Trop fort, trop tôt : le besoin est peut-être réel. Retirer sans analyse, c'est peut-être payer 2 fois pour revenir au départ."
    ],
    retenir: "Un changement fait sans décision repasse par le circuit : impact, puis décision. Il n'est pas validé parce qu'il est fait."
  },
  {
    id: "cp10-q22",
    dialecte: "Gestion de projet",
    q: "Marc, assistant ADV, a une idée contre les rejets EDI : bloquer l'envoi d'une facture sans SIREN. Il hésite : « Je ne suis qu'assistant, je n'ai pas le droit de demander. » Que fais-tu ?",
    choix: [
      "Tu l'aides à l'écrire : qui, quoi, pourquoi",
      "Tu lui dis de convaincre d'abord son manager, puis toi",
      "Tu la chiffres, et tu la portes au DAF en ton nom",
      "Tu lui dis que seul un manager peut faire une demande"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Tout le monde peut demander, de l'assistant au DAF. Tu l'aides à écrire qui, quoi, pourquoi : puis elle suit le circuit, comme les autres.",
      "Non. Un filtre de plus avant même la demande : les idées du terrain se perdent. Son manager sera consulté à l'analyse d'impact.",
      "Non. Tu prends son idée : le registre dira « demandé par toi », et il ne t'en proposera plus. Qui demande fait partie de la demande.",
      "Non. Tout le monde peut faire une demande de changement : seule la décision a un propriétaire. Tu perds une bonne idée."
    ],
    retenir: "Tout le monde peut faire une demande de changement ; seule la décision a un propriétaire."
  },
  {
    id: "cp10-q23",
    dialecte: "Gestion de projet",
    q: "En février, le DAF a refusé la demande n° 14 : un contrôle automatique des doublons de factures fournisseurs, 3 jours. En avril, Julie apporte un fait nouveau : 2 doublons payés en mars, 8 000 € à récupérer. Que fais-tu ?",
    choix: [
      "Rien : la demande est refusée, on n'y revient pas",
      "Tu la fais faire : 8 000 € perdus, ça suffit à décider",
      "Tu renvoies au DAF le dossier de février, tel quel",
      "Tu la rouvres, avec ce fait et de nouvelles options"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Un refus n'est pas éternel : 8 000 € payés en double changent le prix de « ne rien changer ».",
      "Non. Le fait est fort, mais il ne te donne pas la décision : 3 jours touchent le budget. Le DAF décide, avec les nouveaux chiffres.",
      "Non. Presque : c'est bien au DAF. Mais le dossier de février ne contient pas le fait nouveau : il redirait non, sur de vieux chiffres.",
      "Oui. Le fait nouveau rouvre la demande : nouvel impact, nouvelles options, dont « ne rien changer » et son vrai prix. Le DAF décide à nouveau."
    ],
    retenir: "Une demande refusée se rouvre sur un fait nouveau, avec un nouvel impact. Sans fait nouveau, la décision tient."
  },
  {
    id: "cp10-q24",
    dialecte: "Gestion de projet",
    q: "Mars. Deux demandes de 3 jours chacune. L'une : un état de suivi pour le commercial, utile, sans échéance. L'autre : un code qu'un client EDI exige dès juin. Que fais-tu ?",
    choix: [
      "Les deux chiffrées, et le DAF décide des deux ce mois-ci",
      "Les deux tout de suite, et tu préviens le DAF ensuite",
      "L'état en juillet ; le code au circuit, décidé ce mois-ci",
      "Les deux en juillet : le gel protège la bascule"
    ],
    bonne: 2,
    pourquoi: [
      "Non. L'état du commercial ne presse pas : « pas maintenant », avec une date. Son prix ira au DAF en juillet. Le faire trancher en pleine recette, c'est du temps perdu.",
      "Non. 6 jours que personne n'a décidés : le budget et la recette paient, et le DAF l'apprend après.",
      "Oui. L'état : bonne demande, mauvais moment, donc « pas maintenant », avec une date. Le code, exigé avant la bascule : il passe au circuit, vite.",
      "Non. Le gel commence en mai, et le code est exigé dès juin : en juillet, les factures de ce client seront rejetées."
    ],
    retenir: "Utile mais sans échéance : « pas maintenant », avec une date. Exigé avant la bascule : au circuit, vite."
  },
  {
    id: "cp10-q25",
    dialecte: "Gestion de projet",
    q: "Mi-avril, en recette. Julie trouve un cas que personne n'avait écrit : un fournisseur facture 2 dépôts à la fois, et Divalto ne sait pas répartir. 2 jours d'intégrateur, avant le pilote de mai. Le COPIL est dans 3 semaines. Que fais-tu ?",
    choix: [
      "Tu décides seul : c'est urgent, et ce n'est que 2 jours",
      "Impact chiffré aujourd'hui, décision du DAF au téléphone",
      "Tu le notes pour juillet : le pilote passe d'abord",
      "Tu décales le pilote de 3 semaines, le temps du COPIL"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Urgent ne veut pas dire « à toi » : 2 jours d'intégrateur touchent le budget et la commande. Le DAF peut décider en 10 minutes.",
      "Oui. Circuit court, mais complet : l'impact en quelques heures, la décision du DAF au téléphone, puis une ligne au registre et la commande signée avant de commencer.",
      "Non. Le cas doit être réglé avant le pilote : en juillet, le pilote aura tourné avec des factures mal réparties. Une exigence proche n'attend pas.",
      "Non. Trop fort : décaler le pilote décale la bascule, pour attendre une réunion. Le DAF peut décider cette semaine."
    ],
    retenir: "Urgent : un circuit court, jamais pas de circuit. Impact, décision du DAF, trace et commande, en quelques jours."
  },
  {
    id: "cp10-q26",
    dialecte: "Gestion de projet",
    q: "Pilote, jeudi 16 h : 30 % des factures fournisseurs reçues restent bloquées dans Divalto. Cause trouvée. Le consultant veut corriger en production ce soir : « Pas le temps pour la paperasse. » Que fais-tu ?",
    choix: [
      "Non : c'est le gel, ces factures attendront la bascule",
      "Oui, tout de suite : c'est bloquant, on corrige d'abord",
      "Tu l'inscris au registre, et le DAF lève le gel",
      "Oui ce soir, après un test sur 3 factures, et une trace écrite"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Une anomalie bloquante passe le gel : c'est fait pour ça. Attendre, c'est laisser 30 % des factures bloquées.",
      "Non. Presque : c'est bloquant, on corrige ce soir. Mais sans test ni trace, tu risques de casser le reste, et personne ne saura ce qui a changé.",
      "Non. Le gel laisse déjà passer le bloquant : rien à lever, et ce n'est pas un changement. Tu ajoutes un délai, avec des factures bloquées.",
      "Oui. Bloquant : la correction passe le gel. Mais même pressée, elle est testée avant, et tracée. Un correctif non testé peut bloquer les 70 % qui marchent."
    ],
    retenir: "Bloquant : la correction passe le gel, le jour même. Mais testée et tracée, même pressée."
  },
  {
    id: "cp10-q27",
    dialecte: "Gestion de projet",
    q: "Pilote de mai. La cheffe comptable classe « bloquante » une demande : un tri de plus dans l'écran des factures reçues. Sans lui, tout marche, mais c'est moins pratique. Que fais-tu ?",
    choix: [
      "Elle est PO : si elle la dit bloquante, elle passe le gel",
      "Tu chiffres le tri, et le DAF décide de lever le gel",
      "Tu la remets au backlog, pour après la bascule",
      "Tu la notes pour septembre, après la marge légale"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Bloquant veut dire : sans correction, ça ne marche pas. Ici, tout marche : l'étiquette ne change pas la nature de la demande.",
      "Non. Seul le DAF peut lever le gel, mais pas pour un confort qui peut attendre un mois : tu le déranges pour rien.",
      "Oui. Ni anomalie bloquante, ni obligation légale : elle attend la fin du gel, au backlog, avec une date.",
      "Non. Tu fixes la date à la place de la PO, et trop loin : le gel s'arrête après la bascule. C'est elle qui la reclassera au backlog."
    ],
    retenir: "Ce qui n'empêche rien de marcher n'est pas bloquant, quelle que soit l'étiquette : pendant le gel, ça attend."
  },
  {
    id: "cp10-q28",
    dialecte: "Gestion de projet",
    q: "Pilote. Sur le PDF des factures émises, un libellé est mal orthographié. La spécification l'écrit juste. Le consultant peut corriger en 1 heure. Que fais-tu ?",
    choix: [
      "Tu notes l'anomalie : elle attend la fin du gel",
      "Tu l'inscris au registre des changements, pour le COPIL",
      "Tu demandes au DAF de lever le gel pour l'occasion",
      "Tu fais corriger : c'est une anomalie, elle passe le gel"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Non bloquante, elle attend la fin du gel, notée au suivi des anomalies. Toucher au modèle de facture en plein pilote, c'est risquer pire qu'une faute.",
      "Non. Non conforme à la spécification : c'est une anomalie, pas un changement. Elle n'a rien à faire au registre des changements, ni au COPIL.",
      "Non. Pour une faute de frappe qui peut attendre un mois, déranger le DAF n'a pas de sens.",
      "Non. Presque : c'est bien une anomalie, mais pas bloquante. Le gel ne laisse passer que les anomalies bloquantes : une faute de frappe attend."
    ],
    retenir: "Pendant le gel, une anomalie non bloquante attend aussi : seules passent les bloquantes et les obligations légales."
  },
  {
    id: "cp10-q29",
    dialecte: "Gestion de projet",
    q: "Mai, pendant le gel. Le DAF veut un nouvel état pour le DG avant la bascule : 2 jours d'intégrateur. Que fais-tu ?",
    choix: [
      "Non : le gel vaut pour tout le monde, lui compris",
      "Tu le fais faire : c'est lui qui a fixé le gel",
      "Tu vérifies d'abord auprès du DG, puis tu donnes ta réponse au DAF",
      "Tu donnes risque et prix ; s'il lève le gel, tu appliques"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Le gel est une règle du DAF : il peut la lever. Ton rôle n'est pas de l'interdire, mais de lui montrer ce qu'elle coûte.",
      "Non. Il a fixé le gel, mais il ne voit pas son prix : tests à refaire, risque sur le pilote. Il déciderait sans savoir.",
      "Non. Tu contournes ton sponsor pour vérifier sa demande auprès de son chef : il se sent contourné, et le DG n'a rien demandé.",
      "Oui. Lever le gel est sa décision, en connaissant le risque : tests à refaire, effet de bord en plein pilote, 2 jours. Il décide ; tu traces, et tu appliques."
    ],
    retenir: "Seul le DAF lève le gel, en connaissant le risque. Même quand c'est lui qui demande : le prix d'abord."
  },
  {
    id: "cp10-q30",
    dialecte: "Gestion de projet",
    q: "Avril, en pleine recette. La PA propose de passer à la version 2 de son connecteur, « plus rapide ». La version 1, que vous testez, reste maintenue jusqu'en décembre. Que fais-tu ?",
    choix: [
      "Tu passes en version 2 : plus rapide, et sans surcoût",
      "Tu fais tester la version 2 en parallèle par l'intégrateur",
      "Rien avant la bascule : la version 2 sera pour l'automne",
      "La version 2 passe par le circuit, et le DAF décide"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Sans surcoût d'abonnement, peut-être, mais pas sans coût : une version neuve en pleine recette, ce sont des tests à refaire et un risque nouveau.",
      "Non. Des tests en double en pleine recette : la compta et l'intégrateur n'ont pas ce temps, pour un gain qui peut attendre.",
      "Oui. « Ne rien changer » est une option, ici la meilleure : la version 1 marche et reste maintenue. Changer en pleine recette, c'est tout retester.",
      "Non. Rien à décider : garder la version prévue, c'est le plan validé. Tu lancerais le circuit, et ferais trancher le DAF, pour rien."
    ],
    retenir: "En pleine recette, « ne rien changer » est souvent la meilleure option : un changement qui peut attendre attend."
  },
  {
    id: "cp10-q31",
    dialecte: "Gestion de projet",
    q: "Mars. Julie propose un écran des factures fournisseurs bloquées, par motif : 1 jour d'intégrateur. Il reste 3 jours dans l'enveloppe des écrans de suivi compta. Que fais-tu ?",
    choix: [
      "Tu le fais faire tout de suite, et tu le dis à la cheffe",
      "Tu le mets au backlog ; la cheffe comptable le classera",
      "Tu le classes toi-même en tête du backlog",
      "Tu chiffres l'impact de l'idée, et le DAF décide s'il la veut"
    ],
    bonne: 1,
    pourquoi: [
      "Non. L'enveloppe le permet, mais ce n'est ni à toi ni à Julie de la dépenser : l'idée passerait devant celles que la PO a classées.",
      "Oui. Partie agile : une idée va au backlog, et la PO (la cheffe comptable) la classe dans l'enveloppe. Pas de demande de changement.",
      "Non. Presque : le backlog est la bonne voie. Mais le classer, c'est le rôle de la PO, pas le tien.",
      "Non. Dans l'enveloppe fixée par le DAF, il n'a rien à décider : chiffrer et le déranger pour 1 jour qu'il a déjà délégué, c'est du temps perdu."
    ],
    retenir: "Partie agile : une idée va au backlog, et la PO la classe dans l'enveloppe. Ni circuit, ni DAF."
  },
  {
    id: "cp10-q32",
    dialecte: "Gestion de projet",
    q: "La cheffe comptable, PO de la partie agile, remplace au backlog un état prévu (2 jours) par un autre, plus utile (2 jours). L'intégrateur te demande si c'est possible. Que fais-tu ?",
    choix: [
      "Oui : c'est son rôle, et l'enveloppe ne bouge pas",
      "Le circuit : demande au registre, puis décision du DAF",
      "Non : l'état prévu garde sa place au backlog",
      "Oui, si le responsable ADV donne aussi son accord"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Dans l'enveloppe, la PO classe et échange : même total, pas de circuit. Ici, le oui simple est la bonne réponse.",
      "Non. Rien ne sort de l'enveloppe fixée par le DAF : le circuit, ce sont des semaines perdues pour un échange que la PO a le droit de faire.",
      "Non. En agile, le backlog bouge : c'est fait pour ça. La place d'un état « prévu » n'est pas acquise : la PO la change.",
      "Non. Les états de suivi de la compta, c'est la PO qui les classe : l'ADV n'a pas à valider son choix."
    ],
    retenir: "Dans l'enveloppe, la PO échange une idée contre une autre : même total, pas de circuit."
  },
  {
    id: "cp10-q33",
    dialecte: "Gestion de projet",
    q: "En pleine itération, Sophie demande au consultant de l'intégrateur une colonne de plus dans l'état des rejets. Il te dit : « 2 heures, je la glisse dedans ? » Que fais-tu ?",
    choix: [
      "Oui : 2 heures, dans l'enveloppe, et Sophie sera contente",
      "Non : Sophie n'a pas à demander quoi que ce soit",
      "Tu la fais passer par le circuit : chiffrée, puis le DAF",
      "Au backlog : la cheffe comptable la classera pour la suite"
    ],
    bonne: 3,
    pourquoi: [
      "Non. L'itération en cours ne bouge pas, et la PO n'a rien classé : 2 heures par-ci, par-là, et l'enveloppe fond sans choix.",
      "Non. Son idée est peut-être bonne : la bonne voie, c'est le backlog. Tu fermes la porte à une utilisatrice clé.",
      "Non. Dans la partie agile, une idée ne lance pas le circuit : le backlog est fait pour ça.",
      "Oui. Une idée arrivée en cours d'itération va au backlog. La PO la classe, pour une prochaine itération. Pas de demande directe au consultant."
    ],
    retenir: "Partie agile : l'itération en cours ne bouge pas ; une idée va au backlog, et la PO la classe."
  },
  {
    id: "cp10-q34",
    dialecte: "Gestion de projet",
    q: "Avril. Le backlog des écrans de suivi compta compte 14 jours d'idées, toutes « utiles » selon la cheffe comptable. L'enveloppe est de 10 jours. Que fais-tu ?",
    choix: [
      "Tu fais les 14 jours : 4 de plus, c'est presque la même enveloppe",
      "Elle classe ; au-delà de 10 jours, demande de changement au DAF",
      "Tu retires 4 jours du backlog, et tu le dis à la cheffe",
      "Tu demandes au DAF de porter l'enveloppe à 14 jours"
    ],
    bonne: 1,
    pourquoi: [
      "Non. 4 jours de plus, c'est 40 % de plus : l'enveloppe fixée par le DAF ne veut plus rien dire.",
      "Oui. Dans l'enveloppe, la PO choisit. En sortir, c'est une demande de changement : chiffrée, décidée par le DAF, qui l'avait fixée.",
      "Non. Classer le backlog, c'est le rôle de la PO : tu retires à sa place ce qu'elle jugeait peut-être essentiel.",
      "Non. Presque : au-delà, c'est bien le DAF. Mais d'abord, elle classe : peut-être que 10 jours suffisent. Et le DAF décide sur une demande chiffrée, pas sur une liste."
    ],
    retenir: "L'enveloppe agile se classe d'abord ; en sortir, c'est une demande de changement au DAF."
  },
  {
    id: "cp10-q35",
    dialecte: "Gestion de projet",
    q: "Fin mars, il reste 2 jours dans l'enveloppe des écrans de la compta. Le consultant propose de s'en servir pour ajouter un contrôle dans le connecteur de la PA : « C'est déjà payé. » Que fais-tu ?",
    choix: [
      "Tu acceptes : l'enveloppe est payée, autant l'utiliser",
      "Tu acceptes, si la cheffe comptable, PO, est d'accord",
      "Tu demandes au DAF de fermer l'enveloppe dès aujourd'hui",
      "Pas sur l'enveloppe : c'est le cœur, donc le circuit"
    ],
    bonne: 3,
    pourquoi: [
      "Non. L'enveloppe finance les écrans de suivi de la compta, pas le cœur. Un changement du connecteur se chiffre et se décide : tests, risque, flux légaux.",
      "Non. Presque : la PO décide dans l'enveloppe, mais pour sa partie seulement. Le connecteur est au cœur du projet : c'est le DAF qui décide.",
      "Non. Trop fort : la partie agile marche. Il suffit de dire par où passe cette idée : le circuit.",
      "Oui. L'enveloppe est un budget confié à la PO pour sa partie, pas une caisse libre. Toucher au cœur, c'est une demande de changement : impact, options, décision du DAF."
    ],
    retenir: "L'enveloppe agile ne paie que la partie agile : ce qui touche le cœur passe par le circuit, même « déjà payé »."
  },
  {
    id: "cp10-q36",
    dialecte: "Gestion de projet",
    q: "Ton projet Power BI des ventes : le sponsor t'a délégué un budget de changement de 5 jours. Le directeur commercial demande un filtre par région : 1 jour. Il reste 4 jours. Que fais-tu ?",
    choix: [
      "Tu le présentes au sponsor, et tu attends sa décision par écrit",
      "Tu acceptes, tu le notes au registre, tu en rends compte",
      "Tu le fais faire, sans trace : c'est déjà budgété",
      "Tu refuses : ce budget est gardé pour l'imprévu"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Le sponsor t'a délégué ce budget pour ne plus voir passer ces demandes : la lui remonter, c'est annuler sa délégation.",
      "Oui. Tu es l'autorité de changement, dans la limite du budget délégué (PRINCE2). Tu dis oui, tu traces, et le sponsor sait ce qui reste.",
      "Non. Presque : la décision est à toi. Mais sans trace, personne ne sait ce qu'il reste du budget, ni ce qui a changé.",
      "Non. Ce budget sert justement aux petits changements demandés : un filtre utile d'1 jour, c'est son usage. Il ne paie pas l'imprévu."
    ],
    retenir: "Avec un budget de changement délégué, tu décides des petits changements, dans la limite, et tu traces chaque usage."
  },
  {
    id: "cp10-q37",
    dialecte: "Gestion de projet",
    q: "Projet Power BI : tu décides seul des changements de 2 jours au plus. Une demande en coûte 3. Le prestataire propose de la couper en deux demandes d'1,5 jour. Que fais-tu ?",
    choix: [
      "Tu acceptes : chaque morceau reste sous ta limite",
      "Tu fais la 1re moitié, et la 2e au trimestre prochain",
      "Tu la refuses : 3 jours, c'est trop pour toi",
      "Tu la portes au sponsor, entière : 3 jours"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Une demande coupée en deux reste une demande de 3 jours : c'est contourner ta limite, et le sponsor perd la main sans le savoir.",
      "Non. Couper dans le temps ne change rien : c'est le même besoin, 3 jours au total, que personne au-dessus de toi n'a décidés.",
      "Non. « Trop » n'est pas une raison : le besoin est réel. Au-delà de ta limite, c'est le sponsor qui choisit.",
      "Oui. Un besoin = une demande, chiffrée en entier. Au-delà de ta limite, le sponsor décide, avec ta recommandation."
    ],
    retenir: "Couper une demande pour rester sous un seuil, c'est contourner la règle : un besoin = une demande, chiffrée en entier."
  },
  {
    id: "cp10-q38",
    dialecte: "Gestion de projet",
    q: "Projet Power BI : il te reste 3 jours de budget de changement, délégué par le sponsor. Le prestataire a 3 jours de retard sur un livrable. Il propose de les prendre sur ce budget. Que fais-tu ?",
    choix: [
      "Tu acceptes : 3 jours de retard, 3 jours de budget, c'est égal",
      "Tu acceptes, et tu le notes au registre des changements",
      "Non : ce budget paie des changements, pas un retard",
      "Tu acceptes sur ce budget, s'il écrit qu'il ne recommencera pas"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Le retard disparaît des comptes : le sponsor croit le budget utilisé pour des demandes, et le prestataire ne répond pas de son retard.",
      "Non. Presque : la trace, oui. Mais tu as mélangé les deux : un retard ne se paie pas avec l'argent des changements, et le registre mentirait.",
      "Oui. Le budget de changement paie des changements demandés et décidés. Le retard se traite à part : ta tolérance, le contrat, et le sponsor s'il le faut.",
      "Non. Une promesse ne change pas la nature du retard : le budget des changements paierait une erreur du prestataire."
    ],
    retenir: "Le budget de changement paie des changements décidés, jamais un retard : chaque chose à sa place."
  },
  {
    id: "cp10-q39",
    dialecte: "Gestion de projet",
    q: "Tu prépares l'impact d'une demande de changement. Elle demande aussi 2 jours de tests à Marc, assistant ADV. Le DAF décidera au COPIL de jeudi. Que fais-tu d'abord ?",
    choix: [
      "Tu vois son manager, et tu chiffres ces 2 jours avec lui",
      "Tu demandes à Marc s'il peut se libérer 2 jours",
      "Tu l'écris dans l'impact : si le DAF dit oui, Marc suivra",
      "Tu fais ces tests toi-même, pour ne gêner personne"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Le temps de Marc appartient au responsable ADV : l'impact compte aussi le temps des autres services, chiffré avec leur manager AVANT la décision.",
      "Non. Presque : Marc connaît sa charge, mais ce n'est pas lui qui dispose de son temps. Son oui ne protège rien (module cp16).",
      "Non. Le DAF n'est pas le manager de l'ADV : son oui ne libère pas Marc. Le responsable ADV découvrirait la charge après.",
      "Non. Les tests du métier se font par le métier : tu valides à sa place, et ton temps part ailleurs."
    ],
    retenir: "L'impact d'un changement compte aussi le temps des autres services : il se voit avec leur manager, avant la décision."
  },
  {
    id: "cp10-q40",
    dialecte: "Gestion de projet",
    q: "Le DAF a dit oui au changement n° 9. Ce matin, il a signé la commande, et c'est noté au registre. L'intégrateur demande s'il peut commencer. Que fais-tu ?",
    choix: [
      "Oui : décision, trace et signature sont là, il commence",
      "Pas avant la mise à jour complète du cahier de recette",
      "Pas avant le prochain COPIL, qui l'annoncera à tous",
      "Oui, si le DAF le confirme encore par écrit ce matin"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Décidé, tracé, signé : le circuit est complet, il commence. Ici, le oui simple est la bonne réponse.",
      "Non. Le cahier de recette se met à jour en parallèle, avant les tests : bloquer le travail pour ça fait perdre des jours.",
      "Non. Le COPIL sera informé, mais il n'a rien à redécider : attendre un mois retarde un changement déjà signé.",
      "Non. La commande signée est déjà sa confirmation écrite : la lui redemander, c'est douter de sa signature et perdre du temps."
    ],
    retenir: "Décidé, tracé, signé : le changement peut commencer. Pas besoin d'une validation de plus."
  },
  {
    id: "cp10-q41",
    dialecte: "Gestion de projet",
    q: "Recette. La PA a corrigé l'anomalie du SIREN, comme son contrat le prévoit. Elle propose d'installer le correctif mardi, dans un créneau de tests déjà prévu. Que fais-tu ?",
    choix: [
      "Tu la fais passer par le circuit, jusqu'au COPIL",
      "Tu demandes au DAF de valider ce correctif avant",
      "Tu acceptes, et Sophie reteste ses factures mardi",
      "Tu acceptes mardi, si la PA paie le temps de test de Sophie"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Corriger une anomalie n'est pas un changement : pas de circuit, et le COPIL n'a rien à décider. Elle se suit au suivi des anomalies.",
      "Non. Ni coût, ni date, ni contrat ne bougent : faire valider par le DAF un correctif déjà dû, c'est le déranger pour rien.",
      "Oui. Une anomalie corrigée dans le cadre du contrat : pas de circuit. Elle se reteste dans le créneau prévu. Ici, le oui simple est la bonne réponse.",
      "Non. Ce test fait partie de la recette prévue : poser une condition retarde la correction, pour rien."
    ],
    retenir: "Une anomalie corrigée dans le cadre du contrat se reteste, tout simplement : pas de circuit."
  }
];
