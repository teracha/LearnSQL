// Chef de projet SI — Questions du module cp18 « Dire non, arbitrer, gérer un conflit ».
// Le FOND (cp17 = la forme, les mots) : faut-il dire oui, non, « oui, mais », « pas maintenant » ? Qui décide ?
// Comment arbitrer entre deux demandes (critères, MoSCoW) ? Quel mode face à un conflit (s'effacer, céder, compromis,
// imposer, collaborer) ? Comment négocier (intérêts, faits partagés, solution de rechange, jamais sur la loi) ?
// Fil rouge DEMAT 2027 (fiche fil rouge de docs/plan-chef-de-projet.md, qui fait foi). DAF = sponsor ET manager de la
// cheffe comptable. Tolérance du cadrage : ± 2 semaines par jalon (cp04). Report de la bascule à mi-juillet = décision du DAF.
// Plan B (portail de la PA, prévu au contrat) lancé seul si le connecteur n'est pas livré au 15 mars. Aucun montant d'amende.
// Anti-devinette : la bonne réponse est un extrême dans 9 questions sur 40 : le oui simple (q02, q10, q11, q12), céder (q27),
// s'effacer (q31), le non net (q04, q06), l'action la plus forte quand elle se justifie (q35). Ailleurs, elle est au milieu.
// « Chiffr », « prix », « coût », « options », « Non : », « DAF », « COPIL », des chiffres et des dates sont aussi dans des choix faux.
LEARNSQL.questions.cp18 = [
  {
    id: "cp18-q01",
    dialecte: "Gestion de projet",
    q: "Le DAF, ton sponsor, veut ajouter un tableau Power BI des délais de paiement : « Même date de bascule, même budget. » Il faut 8 jours d'intégrateur, déjà tous pris. Que fais-tu ?",
    choix: [
      "Tu acceptes, et tu raccourcis un peu la recette pour tenir",
      "Tu lui montres le prix : date, budget, ou autre chose retiré",
      "Tu refuses : le périmètre validé au cadrage ne bouge plus",
      "Tu acceptes, et le budget paie 8 jours de plus en régie"
    ],
    bonne: 1,
    pourquoi: [
      "Non. La qualité paie en silence : moins de tests, et les rejets sortiront après la bascule. Le DAF n'a rien choisi.",
      "Oui. Rien n'est gratuit : un autre côté du triangle doit payer. Le DAF choisit lequel, en connaissant le prix.",
      "Non. Le sponsor a le droit de changer le périmètre. Ton rôle est de lui montrer le prix, pas de fermer la porte.",
      "Non. Le budget paie sans décision : 8 jours en régie (payés au temps passé) arrivent sur la facture, et le DAF le découvre après."
    ],
    retenir: "Le périmètre grossit : un autre côté paie (date, budget, retrait). Le sponsor choisit lequel."
  },
  {
    id: "cp18-q02",
    dialecte: "Gestion de projet",
    q: "Julie, comptable fournisseurs, veut ajouter à ses cas de test 5 factures « pièges » d'un fournisseur difficile. Ça tient dans ses créneaux déjà réservés, sans rallonger la recette. Que fais-tu ?",
    choix: [
      "Tu demandes d'abord l'accord de sa cheffe, puis du DAF",
      "Non : le plan de recette est figé depuis février",
      "Tu acceptes, si l'intégrateur en chiffre d'abord le coût",
      "Tu acceptes : plus de cas réels, même temps, même date"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Sa cheffe lui a déjà accordé ces créneaux : ce qu'elle y teste, c'est son métier. Tu fais monter un détail à deux managers.",
      "Non. Un plan figé qui refuse des cas réels laisse passer les pièges : ils sortiront après la bascule, sur de vraies factures.",
      "Non. Rien ne bouge, ni la date, ni le coût : faire chiffrer ce qui ne coûte rien, c'est ralentir pour rien.",
      "Oui. Petit, utile, dans ses créneaux, sans rien bouger : c'est dans ta délégation. Ici, le oui simple est la bonne réponse."
    ],
    retenir: "Petit, utile, sans rien bouger, et c'est à toi de décider : oui, tout simplement."
  },
  {
    id: "cp18-q03",
    dialecte: "Gestion de projet",
    q: "Comme prévu, le responsable ADV (administration des ventes) a choisi les 3 clients EDI du pilote de mai. Il écarte AquaBleu, 20 % du chiffre d'affaires : « Trop risqué. » Le commercial veut AquaBleu. Que fais-tu ?",
    choix: [
      "Tu gardes son choix, et tu expliques au commercial pourquoi",
      "Tu ajoutes AquaBleu : c'est le client qu'il faut tester",
      "Tu notes leurs avis, puis le DAF tranche entre les deux",
      "Tu laisses le commercial en parler avec lui, sans t'en mêler"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Le choix revient au responsable ADV, et il réduit le risque. Le commercial n'a aucune autorité sur l'ADV : tu lui donnes la raison.",
      "Non. Tu décides à la place de celui qui choisit. Et un pilote sur le plus gros client met 20 % du chiffre d'affaires en jeu dès le 1er jour.",
      "Non. Il n'y a rien à trancher : le décideur a décidé. Tu fais monter au sponsor l'avis d'un commercial sans autorité sur l'ADV.",
      "Non. Tu laisses un commercial sans autorité rouvrir un choix déjà fait : le responsable ADV subit sa pression, et le pilote reste incertain."
    ],
    retenir: "Celui qui a l'autorité a tranché : on applique, et on explique. On ne rouvre pas le débat pour un tiers."
  },
  {
    id: "cp18-q04",
    dialecte: "Gestion de projet",
    q: "Le DAF, ton sponsor, t'appelle : « La facture émise hier à un client a un mauvais taux de TVA. Fais-la corriger directement dans Divalto, c'est plus rapide. » Que fais-tu ?",
    choix: [
      "Tu la fais corriger : c'est le sponsor qui te le demande",
      "Tu demandes à l'intégrateur si Divalto permet de le faire",
      "Tu fais corriger la facture, puis tu préviens le client",
      "Non : elle ne se modifie pas. Avoir, puis nouvelle facture"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Une facture émise ne se modifie pas, même à la demande du sponsor : vous seriez deux à porter la faute.",
      "Non. La question n'est pas technique, mais légale : même si Divalto le permet, c'est interdit. L'intégrateur perd du temps.",
      "Non. Prévenir ne rend pas la correction légale : la facture transmise et celle de Divalto seraient différentes.",
      "Oui. La loi ne dépend pas du rang de celui qui demande. Un non net, la règle, et la bonne voie : un avoir, puis une nouvelle facture."
    ],
    retenir: "Une demande illégale se refuse net, même au sponsor : la règle, puis la bonne voie."
  },
  {
    id: "cp18-q05",
    dialecte: "Gestion de projet",
    q: "Octobre 2026. La cheffe comptable propose : « Recevons les factures fournisseurs électroniques en juin 2027, avec l'émission. Une seule formation, c'est plus simple. » Que fais-tu ?",
    choix: [
      "Tu acceptes : une seule formation, c'est moins de charge",
      "Non : la réception est déjà obligatoire. Portail en novembre",
      "Tu chiffres les deux options, et le DAF choisit",
      "Tu avances l'émission à novembre, pour tout faire d'un coup"
    ],
    bonne: 1,
    pourquoi: [
      "Non. La réception est obligatoire depuis le 1er septembre 2026 : l'entreprise est déjà en retard. Attendre juin, c'est encore 8 mois hors la loi.",
      "Oui. Un non légal, sans débat, avec la voie possible : la réception via le portail de la PA dès novembre. Sa crainte (la charge) se traite à part : une formation courte.",
      "Non. On ne chiffre pas une option illégale : le DAF ne peut pas choisir de rester hors la loi 8 mois de plus.",
      "Non. Le connecteur n'arrive qu'en mars : avancer l'émission est impossible. Tu bouleverses le projet pour un problème que le portail règle."
    ],
    retenir: "Ce qui est déjà obligatoire ne s'arbitre pas : on dit non, et on donne la voie possible tout de suite."
  },
  {
    id: "cp18-q06",
    dialecte: "Gestion de projet",
    q: "AquaBleu préfère garder son EDI en direct, sans plateforme agréée (PA). Le commercial propose : « Coupons la poire en deux : EDI direct jusqu'à fin 2027. » L'émission via une PA est obligatoire au 1er septembre 2027. Que fais-tu ?",
    choix: [
      "Tu acceptes : AquaBleu pèse 20 % du chiffre d'affaires",
      "Tu proposes moins : EDI direct jusqu'à fin septembre",
      "Non : pas de compromis sur la loi. La PA au 1er septembre",
      "Tu acceptes, si AquaBleu signe qu'il en prend le risque"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Le poids d'un client ne change pas la loi : au 1er septembre 2027, vos factures passent par une PA. C'est ton entreprise qui est exposée.",
      "Non. Un compromis sur la loi reste hors la loi : un mois sans PA, c'est déjà illégal.",
      "Oui. La loi n'est pas une monnaie d'échange. Le commercial l'explique à AquaBleu, qui doit lui aussi s'y préparer.",
      "Non. La signature d'AquaBleu ne protège pas ton entreprise : l'obligation pèse sur celui qui émet la facture."
    ],
    retenir: "On négocie un délai ou un prix, jamais la loi : pas de compromis sur une obligation légale."
  },
  {
    id: "cp18-q07",
    dialecte: "Gestion de projet",
    q: "Le contrôleur de gestion porte le e-reporting pour le DAF. Il te demande 5 jours de ton intégrateur : « C'est une obligation légale aussi. » Ces jours sont payés par ton budget. Que fais-tu ?",
    choix: [
      "Tu acceptes : c'est légal aussi, et c'est la même PA",
      "Non : le e-reporting est hors de ton périmètre",
      "Tu demandes au DG de trancher entre les deux obligations",
      "Tu chiffres l'effet sur DEMAT, et le DAF choisit"
    ],
    bonne: 3,
    pourquoi: [
      "Non. L'obligation d'un autre sujet ne te rend pas décideur : DEMAT perd 5 jours, et le DAF ne l'a pas choisi.",
      "Non. Hors de ton périmètre, oui, mais c'est une obligation de l'entreprise : un refus sec la laisse sans solution.",
      "Non. Le DAF porte les deux sujets, et il n'a pas encore été saisi : aller au DG, c'est sauter le sponsor.",
      "Oui. Budget et date : pas à toi. Le DAF porte les deux obligations. Avec l'effet sur DEMAT (jours, date, risque), il arbitre."
    ],
    retenir: "Une demande d'un autre sujet, sur ton budget : tu donnes le prix, et celui qui porte les deux décide."
  },
  {
    id: "cp18-q08",
    dialecte: "Gestion de projet",
    q: "Le responsable ADV demande 1 semaine de pilote en plus, pour voir une fin de mois. La bascule reste en juin, dans ta tolérance de ± 2 semaines. Que fais-tu ?",
    choix: [
      "Tu donnes le prix au DAF, et tu lui demandes de trancher",
      "Tu refuses : la date du pilote a été validée en COPIL",
      "Tu acceptes, et tu l'annonces au prochain COPIL",
      "Tu acceptes, sans rien en dire : c'est dans ta tolérance"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Un écart dans ta tolérance est ta décision : faire trancher le DAF, c'est lui faire perdre du temps sur un détail.",
      "Non. Le COPIL (comité de pilotage) a validé un cadre avec une tolérance : refuser une semaine utile qui tient dedans, c'est de la rigidité.",
      "Oui. Dans ta tolérance, tu décides. Tu informes le COPIL : il voit l'écart, sans avoir à le trancher.",
      "Non. Presque : la décision est à toi, mais un écart se dit. Le COPIL découvrira une semaine de pilote en plus sans l'avoir vue venir."
    ],
    retenir: "Dans ta tolérance, tu décides et tu informes ; au-delà, le sponsor tranche."
  },
  {
    id: "cp18-q09",
    dialecte: "Gestion de projet",
    q: "Le COPIL (comité de pilotage) a validé « bascule en juin ». Ton planning la met le 2 juin. La cheffe comptable demande de la placer après les 5 jours ouvrés de clôture du mois. Que fais-tu ?",
    choix: [
      "Tu acceptes : après la clôture, mais toujours en juin",
      "Tu demandes au DAF de valider le changement de date",
      "Non : le 2 juin est calé, la clôture s'adaptera",
      "Tu lui réponds : « On verra ça plus près de la date »"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Le COPIL a validé juin, pas le 2 : le jour exact est dans ta délégation. Et la clôture en 5 jours ouvrés est un critère de succès : elle a raison.",
      "Non. Le jour dans le mois validé, c'est ton planning : monter au DAF pour ça lui fait perdre du temps.",
      "Non. Une bascule en pleine clôture menace un critère de succès du projet. L'intégrateur peut décaler de quelques jours.",
      "Non. Elle a besoin d'une réponse pour organiser sa clôture : « on verra » la laisse inquiète, et la bascule reste sur ses jours de clôture."
    ],
    retenir: "Un détail dans le cadre validé, utile au projet : tu dis oui, et tu décides."
  },
  {
    id: "cp18-q10",
    dialecte: "Gestion de projet",
    q: "L'intégrateur propose de livrer son paramétrage en 2 lots au lieu d'1. Même date de fin, même prix. Le 1er lot arriverait 2 semaines plus tôt, pour vos tests techniques. Que fais-tu ?",
    choix: [
      "Tu acceptes, et tu adaptes ton planning",
      "Tu fais chiffrer l'avenant, puis valider par le DAF",
      "Tu refuses : un seul lot, c'est ce que dit le contrat",
      "Tu acceptes, si la cheffe comptable valide d'abord"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Même date, même prix, et des tests plus tôt : c'est dans ta délégation. Tu adaptes simplement ton planning.",
      "Non. Ce n'est pas un avenant : ni la date de fin ni le prix ne changent. Tu fais monter un détail de planning au sponsor.",
      "Non. Le contrat fixe une date de fin, il n'interdit pas de livrer plus tôt. Tu refuses 2 semaines de tests en plus.",
      "Non. Des tests techniques ne prennent pas le temps de la compta : elle n'a rien à valider, et tu ralentis pour rien."
    ],
    retenir: "Une proposition sans coût, dans ton cadre, qui réduit un risque : tu dis oui, sans monter."
  },
  {
    id: "cp18-q11",
    dialecte: "Gestion de projet",
    q: "Le DAF te demande d'ajouter son assistante, qui reçoit des factures fournisseurs, à la formation compta de mai. Il reste des places, et rien ne coûte en plus. Que fais-tu ?",
    choix: [
      "Tu le chiffres et tu le fais valider au prochain COPIL",
      "Tu demandes d'abord l'accord de la cheffe comptable",
      "Tu refuses : la liste des formés a été fixée au cadrage",
      "Tu l'inscris : une place libre, sans coût, un vrai besoin"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Rien à chiffrer : une place libre, sans coût. Un COPIL (comité de pilotage) pour une inscription, c'est un détail monté trop haut.",
      "Non. Son assistante dépend du DAF, pas de la cheffe comptable : c'est lui qui dispose de son temps, et il le donne.",
      "Non. Une liste n'est pas une loi : une personne de plus, sans coût, qui traite des factures, c'est utile au projet.",
      "Oui. Petit, utile, sans coût, et c'est son manager qui le demande : tu dis oui, tout simplement."
    ],
    retenir: "Un oui simple, au sponsor aussi, quand c'est petit, utile et sans coût."
  },
  {
    id: "cp18-q12",
    dialecte: "Gestion de projet",
    q: "Le COPIL a validé « pilote sur 1 site », sans le nommer. Tu as choisi le dépôt nord. Son responsable refuse : « Mai, c'est notre pic. » Les 2 autres dépôts conviennent aussi. Que fais-tu ?",
    choix: [
      "Tu maintiens le dépôt nord : le pilote est déjà annoncé",
      "Tu prends un autre dépôt, et tu mets le planning à jour",
      "Tu demandes au DAF d'imposer le dépôt nord",
      "Tu décales le pilote en juin, après son pic"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Tu imposes un pilote à un site en plein pic, alors qu'un autre convient : les tests seront bâclés, et tu perds un allié.",
      "Oui. Le choix du site est dans ta délégation, et deux autres conviennent : tu dis oui, puis tu l'annonces au COPIL. Il a validé « 1 site », pas lequel.",
      "Non. Rien à imposer : un autre dépôt convient. Tu fais monter au sponsor un choix qui est le tien.",
      "Non. Décaler le pilote décale la bascule : c'est la plus grosse solution, alors qu'un autre site suffit."
    ],
    retenir: "Une demande raisonnable dans ta délégation, sans coût pour le projet : tu dis oui."
  },
  {
    id: "cp18-q13",
    dialecte: "Gestion de projet",
    q: "Le chef de projet de la PA propose : « Sautez la recette, testez en production sur de vraies factures clients. Vous gagnez 2 semaines. » Que fais-tu ?",
    choix: [
      "Tu acceptes : 2 semaines de gagnées, c'est la date qui compte",
      "Tu sautes la recette, mais seulement pour AquaBleu",
      "Tu chiffres le gain, et le DAF choisit en connaissant le prix",
      "Non : une facture émise est définitive. La recette reste"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Chaque erreur partirait chez un vrai client. Une facture émise ne se modifie pas : chaque erreur coûte un avoir et une nouvelle facture.",
      "Non. Tu testes sur ton plus gros client (20 % du chiffre d'affaires) : le pire endroit pour découvrir une erreur.",
      "Non. Le plan de recette est validé : tu n'as pas besoin du DAF pour refuser l'idée d'un prestataire qui l'abîme.",
      "Oui. En production, une facture émise est définitive : on la corrige par un avoir. Garder la recette validée est dans ton rôle."
    ],
    retenir: "Ce qui rendrait des erreurs définitives se refuse net, même pour gagner du temps."
  },
  {
    id: "cp18-q14",
    dialecte: "Gestion de projet",
    q: "La cheffe comptable doit signer le PV (procès-verbal) de recette des factures fournisseurs. Elle part 3 semaines, et la recette finit pendant son congé : « Signe-le à ma place, tu as tout suivi. » Que fais-tu ?",
    choix: [
      "Tu signes : elle te le demande, et tu connais le dossier",
      "Tu signes, et elle contresigne à son retour de congé",
      "Tu refuses, et tu lui demandes qui signe pour elle",
      "Tu reportes le pilote jusqu'à son retour, dans 3 semaines"
    ],
    bonne: 2,
    pourquoi: [
      "Non. La recette engage le métier : si une facture fournisseur est fausse après la bascule, c'est ta signature qu'on lira.",
      "Non. Pendant 3 semaines, personne de la compta n'a validé : le pilote démarre sur ta seule signature.",
      "Oui. Signer pour le métier n'est pas ton rôle. La bonne voie : avant de partir, elle désigne par écrit quelqu'un de la compta, comme Julie. Le DAF, son manager, est informé.",
      "Non. Trois semaines de retard pour une signature, alors qu'une personne désignée par elle règle le problème."
    ],
    retenir: "Hors de ton rôle : non, avec la bonne voie. On ne signe pas à la place du métier : c'est lui qui désigne qui signe."
  },
  {
    id: "cp18-q15",
    dialecte: "Gestion de projet",
    q: "Le DG (directeur général) te croise : « Mets aussi nos ventes aux particuliers dans DEMAT. » C'est du e-reporting, hors périmètre, porté par le DAF avec le contrôleur de gestion. Que fais-tu ?",
    choix: [
      "Tu l'ajoutes au projet : c'est le DG qui le demande",
      "Tu lui dis qui le porte, et tu préviens le DAF",
      "Tu chiffres l'ajout, et le COPIL tranche en séance",
      "Tu refuses : ce n'est pas dans ton périmètre"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Le sujet a déjà un porteur : tu doublonnes son travail, et DEMAT prend une charge que personne n'a chiffrée.",
      "Oui. Le besoin est réel, mais il a déjà un porteur. Tu le dis au DG, et le DAF sait que le DG s'en inquiète.",
      "Non. Chiffrer l'ajout l'installe dans ton projet, alors qu'il est porté ailleurs : tu crées un doublon.",
      "Non. Vrai sur le périmètre, mais sec : le DG repart sans réponse, alors que tu sais qui s'en occupe."
    ],
    retenir: "Une demande qui a déjà un porteur : tu dis qui la porte, au lieu de la prendre ou de la refuser."
  },
  {
    id: "cp18-q16",
    dialecte: "Gestion de projet",
    q: "La cheffe comptable veut décaler la bascule de juin à mi-juillet : « Mon équipe sera plus disponible. » C'est faisable, mais la marge légale avant le 1er septembre fond. Que fais-tu ?",
    choix: [
      "Tu demandes au DG d'arbitrer : la date légale est en jeu",
      "Non : juin est validé, il ne bouge plus",
      "Tu acceptes, et tu en informes le DAF ensuite",
      "Tu prépares 3 options chiffrées ; le DAF tranche"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Le DAF, sponsor, n'a même pas été saisi : aller au DG, c'est sauter un niveau. Et la date légale tient encore.",
      "Non. Juin est validé, mais le sponsor peut le changer : ton rôle est de lui donner le prix, pas de fermer la porte.",
      "Non. Presque : tu préviens, mais après avoir décidé à sa place. Le report à mi-juillet est une décision du DAF.",
      "Oui. Une date validée ne t'appartient pas. Options : juin sans rien changer (compta chargée), juin avec un renfort, ou mi-juillet (moins de marge). Le DAF choisit."
    ],
    retenir: "Une date validée qui bouge : tu prépares les options et leur prix ; le sponsor tranche."
  },
  {
    id: "cp18-q17",
    dialecte: "Gestion de projet",
    q: "Julie et Sophie se renvoient une tâche : lire chaque matin la liste des rejets de la PA (factures reçues et émises). Tu les as vues 2 fois, options posées : pas d'accord. La procédure doit être prête lundi. Que fais-tu ?",
    choix: [
      "Une 3e réunion avec elles deux, pour qu'elles s'accordent",
      "Tu tranches toi-même, et tu l'écris dans la procédure",
      "Tu les préviens, puis le DAF tranche sur tes options",
      "Tu les préviens, puis leur cheffe tranche sur tes options"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Elles ont vu 2 fois tes options : une 3e réunion rejoue le même désaccord, et lundi sera passé.",
      "Non. Qui fait quoi dans la compta, c'est l'organisation d'un service : pas ta décision. Celle qui perd ne l'appliquera pas.",
      "Non. Presque : il faut un arbitre, mais tu sautes leur manager. L'organisation de la compta, c'est la cheffe comptable qui la décide.",
      "Oui. Chercher ensemble a été tenté, et lundi approche : celui qui a l'autorité tranche. Pour deux personnes d'un même service, c'est leur manager."
    ],
    retenir: "Bloqués après de vrais essais, date proche : celui qui a l'autorité tranche. Dans un même service, c'est le manager, pas le sponsor."
  },
  {
    id: "cp18-q18",
    dialecte: "Gestion de projet",
    q: "La cheffe comptable veut suivre les anomalies de recette sous Excel, le responsable ADV dans l'outil de tickets du projet. Ils ne s'entendent pas. Ce suivi est un outil de ton projet. Que fais-tu ?",
    choix: [
      "Tu demandes au DAF de choisir entre les deux outils",
      "Tu choisis les tickets, avec un export Excel par semaine",
      "Tu laisses chacun son outil : Excel ou tickets",
      "Tu organises une réunion pour qu'ils trouvent un accord"
    ],
    bonne: 1,
    pourquoi: [
      "Non. L'outil de suivi de ta recette est dans ta délégation : monter au DAF, c'est lui apprendre à décider à ta place.",
      "Oui. C'est ton outil de projet : tu tranches. L'export Excel répond au besoin de la cheffe comptable, sans 2 outils.",
      "Non. Deux outils, deux listes : des anomalies se perdent entre les deux, et personne n'a la vue complète.",
      "Non. Presque : chercher ensemble est souvent bien, mais ici la décision est la tienne. Une réunion pour un outil, c'est du temps perdu."
    ],
    retenir: "Un désaccord sur un sujet de ta délégation : tu tranches toi-même, en tenant compte des besoins."
  },
  {
    id: "cp18-q19",
    dialecte: "Gestion de projet",
    q: "Il reste 5 jours d'intégrateur avant le pilote. Trois demandes : corriger des rejets EDI (8 % des factures d'un client, 4 jours), un libellé du PDF pour Sophie (1 jour), un rapport du commercial (3 jours). Que fais-tu ?",
    choix: [
      "Le rapport du commercial d'abord : c'est lui qui insiste le plus",
      "Rejets, libellé et rapport : on serre les tests du pilote",
      "Rejets EDI et libellé ; le rapport, noté pour juillet",
      "Tu demandes au DAF de classer les trois, avec leur coût"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Insister n'est pas un critère. Le rapport n'aide pas la bascule, et les rejets EDI resteraient.",
      "Non. 8 jours de travail dans 5 jours de place : la qualité paie en silence, et les rejets sortent pendant le pilote.",
      "Oui. Les rejets touchent un critère de succès (moins de 2 %) : « doit ». Le libellé tient dans le reste. Le rapport : « pas cette fois », écrit pour juillet.",
      "Non. Ce tri tient dans ta capacité : c'est à toi de le faire. Le DAF ne tranche que si un demandeur le conteste."
    ],
    retenir: "Plusieurs demandes, peu de place : des critères, puis on écrit ce qui attend, avec une date."
  },
  {
    id: "cp18-q20",
    dialecte: "Gestion de projet",
    q: "Tu classes en MoSCoW (doit, devrait, pourrait, pas cette fois) les 12 demandes de la compta pour la bascule. Avec la cheffe comptable, 10 finissent en « doit », soit 80 % de l'effort. Que fais-tu ?",
    choix: [
      "Tu gardes ce tri : la compta connaît son métier mieux que toi",
      "Tu retires toi-même 4 « doit », sans la compta",
      "Tu décales la bascule de 3 semaines pour tout faire tenir",
      "Tu refais le tri : « Sans elle, la bascule échoue-t-elle ? »"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Si presque tout est « doit », rien ne protège la date : au moindre retard, on ne sait plus quoi lâcher.",
      "Non. Presque : il faut refaire le tri, mais avec la compta. Seul, tu choisis ses priorités à sa place : elle ne l'appliquera pas.",
      "Non. Tu paies un mauvais tri avec 3 semaines de retard, alors qu'un vrai tri suffisait. Et une date validée n'est pas à toi.",
      "Oui. « Doit » = sans elle, la bascule échoue. Repère DSDM : pas plus d'environ 60 % de l'effort en « doit ». Le reste devient « devrait » ou « pourrait »."
    ],
    retenir: "MoSCoW : « doit » veut dire « sans elle, échec ». Tout mettre en « doit », c'est ne rien trier."
  },
  {
    id: "cp18-q21",
    dialecte: "Gestion de projet",
    q: "La demande de Sophie, une alerte par mail sur chaque facture rejetée, est classée « pas cette fois » en MoSCoW. Le DAF a validé ce tri. Que fais-tu de cette demande ?",
    choix: [
      "Tu la supprimes de la liste : elle est refusée",
      "Tu la gardes en « pourrait », pour ne pas froisser Sophie",
      "Tu l'écris, avec une date, et tu le dis à Sophie",
      "Tu la fais quand même, le soir, avec l'intégrateur"
    ],
    bonne: 2,
    pourquoi: [
      "Non. « Pas cette fois » n'est pas « jamais » : effacée, la demande revient, et le besoin réel est perdu.",
      "Non. Tu fausses le tri pour faire plaisir : « pourrait » laisse croire qu'elle sera faite avant la bascule.",
      "Oui. « Pas cette fois » = écrite, datée (après la bascule), et dite à la demandeuse. Le besoin n'est pas perdu.",
      "Non. Tu contournes un tri validé par le sponsor, et l'intégrateur facture des jours que personne n'a choisis."
    ],
    retenir: "« Pas cette fois » s'écrit avec une date, et se dit au demandeur : ce n'est pas « jamais »."
  },
  {
    id: "cp18-q22",
    dialecte: "Gestion de projet",
    q: "Tu prépares un arbitrage pour le DAF : la recette a 2 semaines de retard. Option A : un intérimaire, environ 4 000 €. Option B : retirer les avoirs clients du pilote. Ta recommandation et ta date limite sont prêtes. Que manque-t-il ?",
    choix: [
      "L'option « ne rien changer », avec son prix : juin menacé",
      "Une 3e et une 4e option, pour qu'il ait plus de choix",
      "Rien : deux options et une recommandation suffisent",
      "Le détail du retard, jour par jour, depuis le 16 mars"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. « Ne rien changer » est aussi une option, avec un prix : ici, la recette glisse, et juin est menacé. Sans elle, le DAF croit qu'attendre est gratuit.",
      "Non. Plus d'options ne veut pas dire mieux : 2 ou 3 options claires se comparent, 4 ou 5 noient la décision.",
      "Non. Presque : il manque le prix de l'inaction. Le DAF peut être tenté d'« attendre un peu », sans savoir ce que ça coûte.",
      "Non. Le DAF décide sur des prix, pas sur l'historique : le détail va en annexe, s'il le demande."
    ],
    retenir: "Un arbitrage montre aussi l'option « ne rien changer » et son prix : ne pas décider coûte aussi."
  },
  {
    id: "cp18-q23",
    dialecte: "Gestion de projet",
    q: "Pendant la recette, quatre sujets arrivent sur ton bureau. Lequel tranches-tu seul, sans monter ?",
    choix: [
      "Retirer les avoirs clients du pilote, faute de temps",
      "Ajouter 1 heure de tests à Julie, demain",
      "Inverser 2 lots de tests dans la même semaine",
      "Décaler la bascule de juin à mi-juillet, pour la marge"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Retirer une partie du pilote change le périmètre validé : c'est au sponsor de le décider, avec le prix.",
      "Non. Même 1 heure : le temps de Julie appartient à sa cheffe. Tu proposes, c'est elle qui décide.",
      "Oui. L'ordre des tests, sans changer la charge ni la date, est dans ta délégation. Tu décides, puis tu informes.",
      "Non. Une date validée, et la marge légale qui fond : c'est la décision du DAF."
    ],
    retenir: "Ta délégation : l'organisation de ton projet. Le périmètre, les dates validées, le temps des autres : pas à toi."
  },
  {
    id: "cp18-q24",
    dialecte: "Gestion de projet",
    q: "Le DAF a refusé l'intérimaire, en connaissant le coût : la recette ADV durera 2 semaines de plus, et la date légale tient. Le responsable ADV, furieux, te demande de « remonter au DG ». Que fais-tu ?",
    choix: [
      "Tu préviens le DAF, puis tu demandes au DG d'arbitrer",
      "Tu appliques, et tu notes son désaccord et le risque",
      "Tu refais le chiffrage, pour que le DAF revienne dessus",
      "Tu lui promets d'en reparler au DAF plus tard"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Le sponsor a tranché en connaissant le coût : c'est une décision, pas un blocage. Le DG n'a pas à la rejuger.",
      "Oui. C'est décidé : on applique. Tu traces le désaccord et le risque. Si un fait nouveau change le coût, tu reviendras vers le DAF.",
      "Non. Rien n'a changé : refaire le même chiffrage pour faire revenir le DAF, c'est contester sa décision.",
      "Non. Une promesse floue de rouvrir une décision prise : il attend un changement qui ne viendra pas, et le DAF se sent contesté."
    ],
    retenir: "Le sponsor a tranché en connaissant le coût : on applique, on trace le risque, on ne fait pas rejuger."
  },
  {
    id: "cp18-q25",
    dialecte: "Gestion de projet",
    q: "Le DAF veut le lettrage automatique des paiements clients : « Ajoute-le. Pas de délai, pas de budget en plus : vous testerez un peu moins. » Que fais-tu ?",
    choix: [
      "Tu dis quels tests sautent et le risque, puis tu appliques",
      "Tu refuses : la qualité ne se négocie jamais",
      "Tu appliques sans rien dire : il a choisi, c'est le sponsor",
      "Tu vas voir le DG : il met la bascule en danger"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Le sponsor peut choisir la qualité comme côté qui paie, s'il voit le risque : quels tests sautent, quels rejets possibles. Puis c'est décidé.",
      "Non. Ce n'est pas à toi de refuser. L'agile (DSDM) ne touche jamais à la qualité ; ici, le sponsor le peut, s'il voit le risque. Ton rôle : le lui montrer.",
      "Non. Presque : il a choisi, mais sans voir quels tests sautent. Au 1er rejet, il découvrira un risque que tu connaissais.",
      "Non. La date légale n'est pas en jeu, et le sponsor a tranché : le DG n'a pas à rejuger. Tu montres le risque au DAF."
    ],
    retenir: "Le sponsor peut faire payer la qualité, s'il voit le risque : tu le montres, puis tu appliques."
  },
  {
    id: "cp18-q26",
    dialecte: "Gestion de projet",
    q: "Pilote : 6 % de rejets. Depuis 10 jours, la PA et l'intégrateur s'accusent, chacun avec ses propres logs, qui l'innocentent. Que fais-tu ?",
    choix: [
      "Tu tranches : les logs de l'intégrateur te semblent plus clairs",
      "Tu demandes au DAF des pénalités, pour la PA et l'intégrateur",
      "Tu attends : entre experts, ils finiront bien par trouver",
      "Un test commun : 10 factures, les deux présents, les mêmes logs"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Ton impression n'est pas un fait partagé : celui que tu accuses contestera, et les rejets continuent.",
      "Non. Des pénalités avant de connaître la cause : tu punis peut-être le mauvais, et la correction n'avance pas.",
      "Non. 10 jours déjà perdus : chacun défend ses logs, et les 6 % de rejets bloquent des factures réelles.",
      "Oui. Des faits vus ensemble, sur les mêmes factures : la cause apparaît, sans coupable désigné. Puis le contrat dit qui corrige."
    ],
    retenir: "Deux parties s'accusent : des faits vus ensemble (test commun, mêmes logs), pas ton avis."
  },
  {
    id: "cp18-q27",
    dialecte: "Gestion de projet",
    q: "Tu prévoyais de tester les factures d'achat dans l'ordre des fournisseurs. Julie préfère par type : avoirs, acomptes, litiges. Même charge, même date. Elle y tient. Que fais-tu ?",
    choix: [
      "Tu prends son ordre : elle teste, et ça ne coûte rien",
      "Tu imposes ton ordre : c'est ton plan de recette",
      "Moitié par fournisseur, moitié par type : chacun cède",
      "Tu demandes à sa cheffe de trancher entre vous deux"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Enjeu mineur pour toi, important pour elle : céder est le bon choix. Elle teste mieux dans son ordre, et elle s'en souviendra.",
      "Non. Tu gagnes un point sans enjeu, et tu perds de l'énergie chez ton utilisatrice clé.",
      "Non. Un compromis sur un sujet sans enjeu : deux logiques mélangées, et personne n'y gagne.",
      "Non. Tu fais monter à sa manager un détail de méthode : elle perd du temps, et Julie se sent accusée."
    ],
    retenir: "Enjeu mineur pour toi, important pour l'autre : tu cèdes. Pas besoin de négocier."
  },
  {
    id: "cp18-q28",
    dialecte: "Gestion de projet",
    q: "Le consultant de l'intégrateur n'a plus que 2 jours avant le pilote. La compta et l'ADV veulent chacune ces 2 jours, pour 2 corrections « devrait » d'1 jour, toutes de même valeur. Il commence demain. Que fais-tu ?",
    choix: [
      "Un atelier de 2 h avec les deux, pour trouver mieux",
      "Un jour chacun, sur sa correction la plus utile",
      "Tu laisses le consultant choisir lui-même",
      "Tu demandes au DAF de choisir avant demain matin"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Presque : chercher ensemble est souvent le mieux, mais pas ici. 2 h de deux managers, pour 2 jours de consultant qui commence demain.",
      "Oui. Même valeur, pas de temps : le compromis est juste. Chacun garde sa correction la plus utile ; le reste est noté pour juillet.",
      "Non. Tu t'effaces sur un choix qui est le tien : le consultant prendra le plus simple, pas le plus utile, et les deux services se sentiront ignorés.",
      "Non. 2 jours de consultant de ton projet, c'est ta délégation : le DAF n'a pas à trancher ça."
    ],
    retenir: "Valeur égale, temps court : le compromis est la bonne réponse. Collaborer demande du temps."
  },
  {
    id: "cp18-q29",
    dialecte: "Gestion de projet",
    q: "La cheffe comptable veut que Sophie valide chaque facture client avant l'envoi à la PA. Le responsable ADV veut un envoi automatique. Les deux campent sur leur position. La bascule est dans 3 mois. Que fais-tu ?",
    choix: [
      "Tu choisis l'envoi automatique : c'est le but du projet",
      "Tu demandes à chacun ce qu'il veut protéger",
      "Tu demandes au DAF de trancher entre eux, cette semaine",
      "Tu attends la recette : vous verrez bien à l'usage"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Le circuit de validation est une règle de contrôle de la compta : ce n'est pas à toi de le choisir, et elle ne l'appliquera pas.",
      "Oui. Derrière les positions, des intérêts : éviter les factures fausses ; ne pas retarder les clients. Ex. : envoi automatique, sauf gros montants et nouveaux clients.",
      "Non. 3 mois devant vous, et rien n'a été cherché : faire trancher maintenant crée un perdant, sans chercher ce qui sert les deux.",
      "Non. Le désaccord reste entier : en recette, chacun testera « son » circuit, et le conflit reviendra plus fort, plus près de la bascule."
    ],
    retenir: "Positions opposées, du temps devant soi : on cherche les intérêts, souvent compatibles."
  },
  {
    id: "cp18-q30",
    dialecte: "Gestion de projet",
    q: "La PA et l'intégrateur se renvoient une tâche : convertir les factures Divalto au format de la PA. Le contrat de la PA dit : « Le connecteur assure la conversion. » Que fais-tu ?",
    choix: [
      "Une réunion avec les deux, pour qu'ils se répartissent la tâche",
      "Tu fais faire la conversion par l'intégrateur, en régie",
      "Tu écris à la PA, contrat en main : la conversion est à elle",
      "Tu demandes au DAF de relire le contrat et d'arbitrer"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Le contrat a déjà répondu : rouvrir la discussion fait perdre des jours, et la PA y voit une porte de sortie.",
      "Non. Tu paies en régie ce que le contrat de la PA couvre déjà : le budget paie, sans décision du DAF.",
      "Oui. Quand la règle existe (le contrat, la loi), on l'applique : pas besoin de débat ni d'arbitre. Tu l'écris, contrat en main.",
      "Non. Le contrat a tranché : faire arbitrer le DAF, c'est lui faire relire un contrat qu'il a signé."
    ],
    retenir: "Quand le contrat ou la loi tranche, on applique la règle : pas de débat, pas d'arbitre."
  },
  {
    id: "cp18-q31",
    dialecte: "Gestion de projet",
    q: "En point projet DEMAT, le commercial et la cheffe comptable se disputent sur le calcul des commissions. Le sujet n'a aucun lien avec le projet. Que fais-tu ?",
    choix: [
      "Tu recentres la réunion : ils régleront ça entre eux",
      "Tu tranches : tu connais Divalto, tu sais qui a raison",
      "Tu proposes un atelier commun pour les aider à s'accorder",
      "Tu notes le désaccord, et tu le portes au prochain COPIL"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Ce conflit n'est ni le tien, ni celui du projet : t'effacer est le bon choix. Tu protèges le temps du point projet.",
      "Non. Tu prends parti dans un sujet hors projet : tu te fais un ennemi pour rien.",
      "Non. Collaborer, oui, mais pas sur un conflit qui n'est pas le tien : tu y passes un temps que DEMAT n'a pas.",
      "Non. Le COPIL (comité de pilotage) pilote DEMAT, pas les commissions : tu exposes deux personnes sur un sujet qui ne le regarde pas."
    ],
    retenir: "Un conflit hors de ton projet : tu t'effaces, et tu recentres. Tous les conflits ne sont pas à toi."
  },
  {
    id: "cp18-q32",
    dialecte: "Gestion de projet",
    q: "Le connecteur n'est pas livré : le plan B (portail de la PA, prévu au contrat) tourne depuis le 16 mars. Le responsable de compte de la PA propose : « Connecteur le 30 avril, sans pénalités. » Quelle est ta meilleure carte ?",
    choix: [
      "Le plan B : juin tient déjà, sans eux",
      "La menace de changer de PA dès maintenant",
      "Ta bonne relation avec leur chef de projet",
      "L'appui du DG, que tu peux faire intervenir"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Ta solution de rechange existe déjà : juin ne dépend plus du connecteur. Tu négocies sans panique ; le DAF, qui a signé, décide des pénalités.",
      "Non. Changer de PA en plein projet coûte des mois : ils savent que c'est une menace vide.",
      "Non. La relation aide, mais elle ne pèse rien face à leur planning : ce n'est pas une force dans la négociation.",
      "Non. Le DG n'a pas à négocier avec un prestataire : brandir son nom use une carte pour rien."
    ],
    retenir: "Ta force dans une négociation, c'est ta solution de rechange : prépare-la avant d'en avoir besoin."
  },
  {
    id: "cp18-q33",
    dialecte: "Gestion de projet",
    q: "L'intégrateur réclame un avenant de 10 jours pour le numéro de commande AquaBleu : « Hors de mon lot. » Ton cahier des charges cite « les exigences EDI des clients de la grande distribution », sans détail. Que fais-tu d'abord ?",
    choix: [
      "Tu acceptes les 10 jours : le numéro de commande presse",
      "Non : le cahier des charges suffit, sans discussion",
      "Tu demandes au DAF d'appliquer des pénalités",
      "Tu relis avec lui le cahier des charges et son devis signé"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Tu paies peut-être ce que le contrat couvre déjà : le budget glisse, et un avenant n'est pas à toi de l'accepter.",
      "Non. Le texte est général : ta lecture n'est pas encore un fait partagé. Sans le relire ensemble, il campe sur sa position, et le travail s'arrête.",
      "Non. Il n'est pas en retard : il conteste un périmètre. Des pénalités ne règlent pas un désaccord de lecture.",
      "Oui. D'abord des faits partagés : les textes signés. Un texte général se lit de deux façons : on le relit ensemble. S'il reste un avenant, le DAF le signe."
    ],
    retenir: "Un texte signé qui se lit de deux façons : on le relit ensemble, avant de payer, de refuser ou de punir."
  },
  {
    id: "cp18-q34",
    dialecte: "Gestion de projet",
    q: "Le responsable ADV te prête Marc 2 jours de plus pour la recette EDI, si tu lui fais son export Divalto mensuel : 4 heures par mois, pendant 6 mois. Que réponds-tu ?",
    choix: [
      "« D'accord : 2 jours de Marc valent bien 24 heures »",
      "« Non : ce n'est pas dans le périmètre du projet »",
      "« Je te le fais une fois, et je montre à Marc comment »",
      "« Je demande au DAF si j'ai le droit d'accepter ce marché »"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Tu deviens son support pour 6 mois, hors projet : ton temps part ailleurs, et la demande ne s'arrêtera pas.",
      "Non. Un non sec ferme la porte : tu perds 2 jours de Marc, utiles à la recette, pour un service que tu pouvais rendre autrement.",
      "Oui. Donner pour recevoir, sans t'engager hors projet : un service ponctuel, puis Marc sait le refaire. Le responsable ADV y gagne aussi.",
      "Non. Un échange de petits services avec un manager est dans ta main : monter au DAF pour ça, c'est un détail."
    ],
    retenir: "Négocier : donner pour recevoir, sans prendre un engagement qui sort de ton projet."
  },
  {
    id: "cp18-q35",
    dialecte: "Gestion de projet",
    q: "Ton réflexe face à un conflit : chercher une solution ensemble (collaborer). Dans quelle situation est-ce une erreur ?",
    choix: [
      "Deux services se disputent une règle qui durera des années",
      "À 3 jours d'une échéance légale, après 2 réunions sans accord",
      "Deux personnes ont de bonnes raisons, et du temps devant elles",
      "Le conflit touche la date légale, et vous avez 2 mois devant vous"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Une règle durable mérite qu'on cherche ensemble : c'est le cas où collaborer paie le plus.",
      "Oui. Collaborer prend du temps : il a été tenté, et l'échéance légale est là. Celui qui a l'autorité tranche, sur tes options.",
      "Non. De bonnes raisons des deux côtés, et du temps : c'est le cas idéal pour collaborer.",
      "Non. L'enjeu est fort, mais 2 mois suffisent pour chercher ce qui sert les deux : c'est le moment de collaborer, pas d'imposer."
    ],
    retenir: "Collaborer est souvent le meilleur, pas toujours : en urgence légale, après de vrais essais, on fait trancher."
  },
  {
    id: "cp18-q36",
    dialecte: "Gestion de projet",
    q: "Ton DSI te dit : « Pour te couvrir, fais valider par le DAF chaque changement de planning, même d'un jour. » Le cadrage prévoit une tolérance de ± 2 semaines par jalon. Que fais-tu ?",
    choix: [
      "Tu appliques : c'est ton responsable, il connaît le DAF",
      "Tu ignores sa consigne : la tolérance a été validée",
      "Tu lui proposes la règle : dans la tolérance, je décide",
      "Tu demandes au DAF de dire au DSI de te laisser faire"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Le DAF reçoit chaque jour de décalage : il se lasse, et apprend à décider à ta place. Ton point faible deviendrait la règle.",
      "Non. La règle est bonne, mais ignorer ton responsable sans lui en parler abîme la confiance.",
      "Oui. Tu clarifies ta délégation avec ton DSI : dans la tolérance validée, tu décides et tu informes ; au-delà, le DAF tranche.",
      "Non. Tu fais régler par le sponsor un sujet entre toi et ton DSI : il se sent contourné."
    ],
    retenir: "Ta délégation se dit clairement : dans la tolérance, tu décides et tu informes ; au-delà, le sponsor tranche."
  },
  {
    id: "cp18-q37",
    dialecte: "Gestion de projet",
    q: "Le commercial veut que Marc, assistant ADV, appelle chaque client dont la facture est rejetée, avant de la renvoyer. Cela prend environ 1 heure par jour. Que fais-tu ?",
    choix: [
      "Tu l'acceptes : ses clients seront contents d'être prévenus",
      "Tu donnes le prix, 1 h par jour, au responsable ADV",
      "Tu chiffres la demande et tu la portes au prochain COPIL",
      "Tu refuses : appeler les clients n'est pas dans le projet"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Tu disposes du temps de Marc, qui n'est ni à toi ni au commercial : son manager découvre une heure de moins par jour.",
      "Oui. « Oui, mais » : la demande coûte le temps d'un autre service. Son manager décide, en connaissant le prix.",
      "Non. Le COPIL pour l'heure quotidienne d'un assistant : c'est le responsable ADV qui dispose de son temps.",
      "Non. Les rejets font partie du projet, et le besoin est réel : un refus sec t'empêche de le porter à celui qui décide."
    ],
    retenir: "« Oui, mais » : le prix va à celui qui décide. Pour le temps d'un service, c'est son manager."
  },
  {
    id: "cp18-q38",
    dialecte: "Gestion de projet",
    q: "Le contrôleur de gestion te demande de « faire en sorte » que Julie lui envoie chaque semaine un export des factures reçues. 1 heure par semaine, hors projet. Que fais-tu ?",
    choix: [
      "Tu lui dis d'en parler à sa cheffe : c'est son temps",
      "Tu le demandes à Julie : c'est rapide, et c'est utile",
      "Tu demandes au DAF de l'imposer à la compta",
      "Tu fais l'export toi-même chaque semaine"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Ce n'est ni ton projet, ni ton rôle : la bonne voie, c'est la cheffe comptable, qui décide du temps de Julie.",
      "Non. Tu disposes du temps de Julie sans sa cheffe : elle l'apprend après, et tu perds sa confiance.",
      "Non. Personne n'a encore demandé à la cheffe comptable : passer par le DAF, c'est sauter une étape.",
      "Non. Tu prends une tâche qui revient chaque semaine, hors projet : ton temps part ailleurs, et la compta n'apprend rien."
    ],
    retenir: "Une demande hors de ton rôle : tu indiques qui décide, sans la porter toi-même."
  },
  {
    id: "cp18-q39",
    dialecte: "Gestion de projet",
    q: "En pleine recette, le responsable ADV veut un écran Divalto du statut de chaque facture émise via la PA : 5 jours d'intégrateur. Utile, pas nécessaire à la bascule. L'intégrateur est pris par la recette. Que fais-tu ?",
    choix: [
      "Tu réponds : pas pendant la recette, noté pour juillet",
      "Tu acceptes, et la recette se serre un peu",
      "Tu refuses : ce n'est pas un « doit », c'est définitif",
      "Tu donnes le coût des 5 jours, et le DAF choisit"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Bonne demande, mauvais moment : « pas maintenant », avec une date. La recette garde ses jours. En juillet, son prix ira au DAF.",
      "Non. L'intégrateur est pris par la recette : la serrer, c'est faire payer la qualité, pour une demande qui peut attendre.",
      "Non. Pas « doit » ne veut pas dire jamais : le besoin est réel. Fermé pour toujours, il reviendra par un autre chemin.",
      "Non. Rien ne l'exige avant la bascule : tu ferais trancher le DAF pour rien, en pleine recette. Son prix ira au DAF en juillet."
    ],
    retenir: "Bonne demande, mauvais moment : « pas maintenant », avec une date. Le prix ira au décideur à ce moment-là."
  },
  {
    id: "cp18-q40",
    dialecte: "Gestion de projet",
    q: "Le responsable d'un dépôt : « Tant que l'intégrateur est là, qu'il refasse mes étiquettes d'expédition dans Divalto. 2 jours, pas plus. » Aucun lien avec les factures. Que fais-tu ?",
    choix: [
      "Tu acceptes : 2 jours, et l'intégrateur est déjà là",
      "Tu l'inscris au projet pour juillet, après la bascule",
      "Non : autre sujet. Tu l'orientes vers la DSI, à part",
      "Tu donnes le prix des 2 jours ; le DAF tranche en COPIL"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Rien n'est gratuit : ces 2 jours en régie sont payés par ton budget, sans lien avec l'objectif, et personne ne les a choisis.",
      "Non. Noté pour juillet, il entre dans ton projet : tu promets un livrable sans lien avec l'objectif.",
      "Oui. Sans lien avec l'objectif, même petit : non, sans chiffrer, et la bonne voie (une demande à part, à la DSI).",
      "Non. On ne chiffre que ce qui sert l'objectif : tu fais perdre du temps au DAF et au COPIL."
    ],
    retenir: "Sans lien avec l'objectif, même petit et « tant qu'il est là » : non, et la bonne voie. Rien n'est gratuit."
  }
];
