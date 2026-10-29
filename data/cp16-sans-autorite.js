// Chef de projet SI — Questions du module cp16 « Diriger sans autorité ».
// Mises en situation. Fil rouge DEMAT 2027 (fiche fil rouge de docs/plan-chef-de-projet.md, qui fait foi) :
// négociant en équipement de piscines, 120 salariés, ERP Divalto, passage à la facture électronique.
// DAF = sponsor ET manager de la cheffe comptable. Julie (comptable fournisseurs) et Sophie (comptable clients) :
// cheffe = cheffe comptable. Marc (assistant ADV) : chef = responsable ADV.
// Règle unique pour monter d'un niveau (cours, section 4) : 2e proposition chiffrée refusée, promesse non tenue après
// en avoir parlé, ou silence malgré une demande claire et une date limite. Enjeu fort exigé seulement pour le niveau 4 (DG).
LEARNSQL.questions.cp16 = [
  {
    id: "cp16-q01",
    dialecte: "Gestion de projet",
    q: "Tu as besoin de Julie, comptable fournisseurs, 2 matinées par semaine pour la recette DEMAT 2027. Julie te dit : « Pour moi, c'est OK. » Que fais-tu ?",
    choix: [
      "Tu bloques les créneaux dans son agenda, c'est fait",
      "Tu fais valider ces créneaux par sa cheffe",
      "Tu demandes au DAF de l'annoncer à toute l'équipe",
      "Tu lui demandes de prévenir elle-même sa cheffe"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Julie ne décide pas de son temps : au premier pic de travail, sa cheffe lui donnera d'autres urgences et tes créneaux sauteront.",
      "Oui. Sa manager fixe ses priorités. Avec son accord, les créneaux sont protégés, même en période chargée.",
      "Non. Tu passes au-dessus de la cheffe comptable sans lui avoir parlé : elle se sent court-circuitée et tu perds une alliée.",
      "Non. Tu laisses Julie porter ta demande : elle n'ose pas insister, sa cheffe n'entend pas ton besoin chiffré, et rien n'est réservé."
    ],
    retenir: "La personne pour comprendre, son manager pour réserver son temps."
  },
  {
    id: "cp16-q02",
    dialecte: "Gestion de projet",
    q: "La cheffe comptable refuse de libérer Julie la semaine de clôture. C'est votre premier échange sur ce sujet. Que fais-tu ?",
    choix: [
      "Tu demandes au DAF d'imposer la présence de Julie",
      "Tu décales toute la recette d'un mois, par prudence",
      "Tu fais toi-même les tests de Julie pendant la clôture",
      "Tu lui proposes d'autres créneaux, hors clôture"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Escalade trop tôt : tu n'as rien proposé. La cheffe comptable se sent court-circuitée, et le DAF te renverra vers elle.",
      "Non. Un mois de retard pour une seule semaine bloquée : la bascule glisse, et tu manges la marge légale sans raison.",
      "Non. Tu testes un métier qui n'est pas le tien : la compta n'aura rien validé, et les erreurs sortiront après la bascule.",
      "Oui. Son refus porte sur une semaine, pas sur le projet. Une proposition précise hors clôture règle le problème à ton niveau."
    ],
    retenir: "Un refus ponctuel se règle par une autre proposition, pas par une escalade."
  },
  {
    id: "cp16-q03",
    dialecte: "Gestion de projet",
    q: "Le DAF, sponsor, refuse que la cheffe comptable passe 3 jours en janvier à préparer ses cas de recette : « La clôture annuelle passe avant. » Ton planning prévoyait ces 3 jours. Que fais-tu ?",
    choix: [
      "Tu le préviens, puis tu demandes au DG d'arbitrer",
      "Tu demandes à la cheffe comptable 1 jour quand même",
      "Tu reviens vers lui avec des options et leur coût",
      "Tu prépares les cas sans la compta, pour tenir la date"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Le DAF n'a pas encore vu le coût de son choix : aller au DG maintenant, c'est passer au-dessus du sponsor pour une info qu'il n'a pas.",
      "Non. Son patron vient de dire non : passer par elle, c'est contourner la décision du DAF, et tu les mets tous les deux contre toi.",
      "Oui. Son refus dit sa priorité : la clôture. Avec le coût de chaque option (février, une autre personne, un intérimaire), il tranche en connaissance de cause.",
      "Non. Sans la compta, les cas de recette ne reflètent pas le travail réel : les vrais pièges passeront, et les erreurs sortiront sur des factures réelles."
    ],
    retenir: "Le refus du sponsor est une information : tu réponds avec le coût de chaque option."
  },
  {
    id: "cp16-q04",
    dialecte: "Gestion de projet",
    q: "Tu vas voir la cheffe comptable pour obtenir du temps de son équipe en recette. Que lui dis-tu ?",
    choix: [
      "« J'aurai besoin de ton équipe, quand vous pourrez »",
      "« Julie, mardi et jeudi matin, 4 semaines, dès le 16 »",
      "« Le projet est prioritaire, le DAF l'a dit en COPIL »",
      "« Donne-moi vos disponibilités, je m'adapterai »"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Une demande vague se refuse facilement : « quand vous pourrez » devient « jamais » en période de clôture.",
      "Oui. Qui, quels jours, combien de temps, à partir de quand : elle peut dire oui, ou proposer d'autres jours. Ça se négocie.",
      "Non. Tu brandis le sponsor au lieu d'exprimer un besoin : elle se braque, et elle vérifiera ce que le DAF a vraiment dit.",
      "Non. Sans besoin chiffré, elle te donnera les restes de son agenda : pas assez pour finir la recette à temps."
    ],
    retenir: "Une demande chiffrée (qui, quand, combien) se négocie ; une demande vague se refuse."
  },
  {
    id: "cp16-q05",
    dialecte: "Gestion de projet",
    q: "Marc, assistant ADV (administration des ventes), a manqué 2 ateliers DEMAT 2027 de suite, sans prévenir. Quelle est ta première action ?",
    choix: [
      "Tu en parles avec Marc, pour savoir ce qui bloque",
      "Tu informes le responsable ADV, DAF en copie",
      "Tu lui envoies les supports, sans rien dire",
      "Tu signales ses absences au prochain COPIL"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Niveau 1 de l'échelle : la personne. Il est peut-être débordé ou mal informé. Tu règles vite, sans braquer personne.",
      "Non. Tu sautes l'échelle et tu mets le sponsor en copie : Marc se sent dénoncé, et tu perds un utilisateur clé.",
      "Non. Tu évites le sujet : sans savoir ce qui bloque, il manquera le 3e atelier, et tu n'auras rien tenté à ton niveau.",
      "Non. Deux absences ne méritent pas un COPIL : tu exposes Marc en public pour un sujet qu'une discussion aurait réglé."
    ],
    retenir: "Échelle d'escalade : d'abord la personne, en direct."
  },
  {
    id: "cp16-q06",
    dialecte: "Gestion de projet",
    q: "La cheffe comptable a refusé tes 2 propositions. Le 5, tu as demandé au DAF, en 3 lignes, de trancher : 2 options, date limite le 12. Relance le 13. Le 19 : rien. La date légale est menacée. Que fais-tu ?",
    choix: [
      "Tu le préviens, puis tu demandes au DG d'arbitrer",
      "Tu le relances encore, avec un ton plus pressant",
      "Tu écris : « Sans réponse, je prends l'option A »",
      "Tu décales la bascule de 2 mois, par sécurité"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Demande courte, date limite dépassée, relance faite, date légale en jeu : niveau 4. Tu préviens le DAF d'abord, et ton DSI.",
      "Non. La date limite est passée et la date légale est en jeu : une relance de plus, c'est une semaine de plus perdue.",
      "Non. Les 2 options prennent du temps à la compta, malgré le refus de sa cheffe : ce n'est pas ton projet seul. Une décision par défaut ne vaut que pour un détail de ton projet.",
      "Non. Tu décides seul de tout décaler : la bascule tombe en août, sans marge avant le 1er septembre 2027. Ce choix revient au sponsor, pas à toi."
    ],
    retenir: "Demande courte faite, date limite dépassée, enjeu légal : on monte au-dessus du sponsor, en le prévenant."
  },
  {
    id: "cp16-q07",
    dialecte: "Gestion de projet",
    q: "Hier, tu as envoyé au DAF un long mail sur les créneaux de recette compta. Pas de réponse. Ton mail ne fixait aucune échéance. Que fais-tu ?",
    choix: [
      "Tu écris au DG aujourd'hui : le sponsor ne suit plus",
      "Tu mets le sujet à l'ordre du jour du COPIL suivant",
      "Tu décales la recette en attendant qu'il réponde",
      "Tu redemandes, en 3 lignes, avec une date limite"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Un jour sans réponse, sans date limite : aller au DG maintenant abîme ta relation avec le sponsor pour rien.",
      "Non. Attendre le COPIL fait perdre des semaines pour une question qui se règle en 15 minutes.",
      "Non. Tu décales sur un simple silence d'un jour : la marge de recette fond, et le DAF n'a même pas eu le temps de lire.",
      "Oui. Une demande courte avec une date limite donne au DAF une chance réelle de répondre. Sans elle, tu ne pourras pas escalader plus tard."
    ],
    retenir: "Avant toute escalade : une demande courte, avec une date limite."
  },
  {
    id: "cp16-q08",
    dialecte: "Gestion de projet",
    q: "Julie a du retard sur ses cas de test. Le commercial te dit : « Fais-les toi-même, tu connais Divalto mieux qu'elle. » Que fais-tu ?",
    choix: [
      "Tu les fais ce week-end pour tenir la date",
      "Tu refuses, et tu aides Julie à les préparer",
      "Tu demandes à l'intégrateur de les faire en régie",
      "Tu signales au DAF que Julie bloque la recette"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Tu testes un métier qui n'est pas le tien : la compta n'a rien validé, et c'est toi qu'on accusera à la première erreur.",
      "Oui. La recette, c'est le métier qui valide. Tu l'aides à préparer ses cas et tu es là au créneau : elle avance, et elle reste responsable.",
      "Non. L'intégrateur testerait son propre travail, et la compta ne validerait toujours rien. En plus, tu paies.",
      "Non. Un retard de cas de test se règle avec Julie, puis avec sa cheffe : monter au sponsor la met en accusation, et elle ne t'aidera plus."
    ],
    retenir: "On ne fait pas les tests du métier à sa place : on l'aide à les faire."
  },
  {
    id: "cp16-q09",
    dialecte: "Gestion de projet",
    q: "La recette compta a une semaine de retard. Julie, motivée, propose : « Je reste 2 soirs par semaine, ça ira plus vite. » Sa cheffe n'est pas au courant. Que fais-tu ?",
    choix: [
      "Tu acceptes et tu la remercies devant l'équipe",
      "Tu refuses, et demandes un intérimaire au DAF",
      "Tu la remercies, puis tu vois d'abord sa cheffe",
      "Tu acceptes, et tu préviens sa cheffe plus tard"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Ton planning repose sur des heures que personne n'a validées : si Julie s'épuise ou s'arrête, la recette s'effondre.",
      "Non. Tu sautes sa cheffe, qui décide de la charge de Julie : une semaine de retard se voit d'abord avec elle, pas avec le sponsor.",
      "Oui. Tu ne bâtis pas ton planning sur des heures que personne n'a validées. Sa cheffe décide : alléger autre chose, ou valider elle-même des heures en plus.",
      "Non. Sa cheffe apprend après coup que tu as décidé du temps de son équipe : tu perds sa confiance."
    ],
    retenir: "On n'accepte pas d'heures en plus sans le manager : c'est lui qui décide de la charge."
  },
  {
    id: "cp16-q10",
    dialecte: "Gestion de projet",
    q: "La recette des factures fournisseurs est finie. Julie y a passé 8 matinées et trouvé 12 anomalies, corrigées avant la bascule. Que fais-tu ?",
    choix: [
      "Tu la cites au COPIL, devant sa cheffe et le DAF",
      "Tu présentes les résultats au COPIL, sans la citer",
      "Tu la remercies en privé, sans en parler plus loin",
      "Tu proposes au DAF une prime pour Julie, en séance"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Sa contribution devient visible pour ceux qui décident de son temps : sa cheffe la libérera plus facilement la prochaine fois.",
      "Non. Le travail de Julie devient invisible : la prochaine fois, sa cheffe verra le temps perdu, pas le résultat.",
      "Non. Un merci privé fait plaisir, mais sa cheffe ne voit pas ce que son temps a apporté au projet.",
      "Non. Sa rémunération ne dépend pas de toi : tu promets ce que tu ne maîtrises pas, et sa cheffe se sent court-circuitée."
    ],
    retenir: "Rends visible la contribution des utilisateurs clés, devant leur manager."
  },
  {
    id: "cp16-q11",
    dialecte: "Gestion de projet",
    q: "Tu auras besoin du responsable ADV plus tard pour la reprise des clients. Aujourd'hui, il bloque sur un export Divalto pour son reporting. Tu sais le faire en 30 minutes. Que fais-tu ?",
    choix: [
      "Tu l'aides : 30 minutes, et un allié pour la suite",
      "Tu refuses : ce sujet est hors du périmètre",
      "Tu l'aides 30 minutes, contre un engagement écrit",
      "Tu lui dis d'ouvrir un ticket au support Divalto"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Un petit service crée du crédit : quand tu lui demanderas du temps, il s'en souviendra. Si ça devient régulier ou un vrai développement, c'est une demande de changement.",
      "Non. 30 minutes d'aide n'élargissent pas le périmètre du projet. Tu refuses un geste facile et tu perds un futur allié.",
      "Non. Un service donnant-donnant sonne comme un marchandage : le crédit vient du geste, pas du contrat.",
      "Non. Il attendra des jours pour 30 minutes de travail : tu rates une occasion simple de construire la relation."
    ],
    retenir: "Rends de petits services avant d'en avoir besoin : c'est ton crédit."
  },
  {
    id: "cp16-q12",
    dialecte: "Gestion de projet",
    q: "La cheffe comptable propose la stagiaire, arrivée il y a 3 semaines, comme utilisatrice clé des factures fournisseurs : « Elle a du temps. » Julie, comptable fournisseurs depuis 8 ans, connaît le travail réel. Que fais-tu ?",
    choix: [
      "Tu acceptes la stagiaire et tu la formes toi-même",
      "Tu demandes au DAF de nommer quelqu'un d'autre",
      "Tu vas voir Julie pour qu'elle demande à venir",
      "Tu demandes plutôt Julie, 1 matinée par semaine"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Un utilisateur clé doit connaître le travail réel : même formée par toi, la stagiaire ne connaîtra pas les vrais cas, et les erreurs passeront.",
      "Non. Tu passes au-dessus de la cheffe comptable avant d'avoir négocié avec elle : elle le prendra mal.",
      "Non. Tu contournes sa cheffe, qui vient de te répondre : Julie ne décide pas de son temps, et sa cheffe se sent manipulée.",
      "Oui. Tu expliques que le rôle demande de connaître les vrais cas, et tu réduis le coût pour elle : 1 matinée de Julie, la stagiaire en appui."
    ],
    retenir: "L'utilisateur clé connaît le travail réel : on négocie son temps, quitte à en demander moins."
  },
  {
    id: "cp16-q13",
    dialecte: "Gestion de projet",
    q: "Le DAF refuse un 2e utilisateur clé sur les factures fournisseurs, en appui de Julie : « Une personne suffit. » Ton planning en prévoyait deux. Que fais-tu ?",
    choix: [
      "Tu portes le sujet au DG, chiffres en main",
      "Tu demandes à Julie de faire le travail des deux à la fois",
      "Tu acceptes, et tu serres la recette sans rien lui dire",
      "Tu lui montres le coût : recette plus longue, ou intérim"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Le DAF n'a pas encore vu ces chiffres : tu passes au-dessus du sponsor alors qu'ils peuvent suffire.",
      "Non. Tu doubles la charge de Julie sans l'accord de sa cheffe : épuisement, erreurs, et une alliée perdue.",
      "Non. Tu caches un risque au sponsor : si la recette déborde, il découvrira trop tard que le planning était intenable.",
      "Oui. Son refus dit sa contrainte : la charge de la compta. Avec le coût (3 semaines de plus, ou un intérimaire), il tranche en connaissant le prix."
    ],
    retenir: "Face à un refus du sponsor : le coût de chaque option, pas l'escalade."
  },
  {
    id: "cp16-q14",
    dialecte: "Gestion de projet",
    q: "L'intégrateur Divalto appelle directement Julie pour lui faire tester un écran, hors planning, sans passer par toi. Julie y a perdu une matinée. Que fais-tu ?",
    choix: [
      "Tu recadres l'intégrateur : les demandes passent par toi",
      "Tu demandes à Julie de refuser seule, la prochaine fois",
      "Tu écris à son responsable de compte pour te plaindre",
      "Tu demandes au DAF de menacer l'intégrateur de pénalités"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Un seul canal protège le temps que sa cheffe t'a accordé. Tu le dis calmement à l'intégrateur, et tu replanifies son test.",
      "Non. Tu laisses Julie seule face à un prestataire : ce n'est pas son rôle, et elle n'ose pas dire non.",
      "Non. C'est la première fois : une phrase claire à l'intégrateur suffit. Monter chez son responsable sans lui avoir parlé le braque ; tu monteras s'il recommence.",
      "Non. Tu fais monter au sponsor ce qu'une phrase claire à l'intégrateur règle : tu donnes une image de chef de projet débordé."
    ],
    retenir: "Les demandes aux utilisateurs clés passent par toi : on recadre qui contourne."
  },
  {
    id: "cp16-q15",
    dialecte: "Gestion de projet",
    q: "Le commercial te dit : « Je prends Marc toute la semaine prochaine pour le salon, tu décaleras ses tests. » Marc est assistant ADV. Le commercial n'est pas son manager. Que réponds-tu ?",
    choix: [
      "« D'accord, le salon rapporte du chiffre d'affaires »",
      "« Non : son planning se voit avec le responsable ADV »",
      "« On coupe la poire en deux : la moitié des tests »",
      "« Non : je demande au DG qui a la priorité »"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Tu laisses quelqu'un sans autorité décider du temps de Marc : le responsable ADV découvrira que son équipe est gérée par d'autres.",
      "Oui. Ni toi ni le commercial ne décidez du planning de Marc. Son manager arbitre : vous lui présentez chacun votre besoin.",
      "Non. Tu négocies le temps de Marc avec quelqu'un qui n'en dispose pas : ton accord n'engage pas le responsable ADV.",
      "Non. Le DG pour une semaine de planning d'un assistant : tu sautes son manager et le sponsor, et tu passes pour quelqu'un qui ne sait pas régler."
    ],
    retenir: "Seul le manager d'une personne dispose de son temps : on dit non à qui veut en décider à sa place."
  },
  {
    id: "cp16-q16",
    dialecte: "Gestion de projet",
    q: "Pendant le pilote, des factures fournisseurs reçues via la PA restent bloquées en anomalie dans Divalto depuis 3 jours. Julie sait les traiter. Sa cheffe la garde sur la clôture et a refusé tes 2 propositions : 1 h par jour, puis 30 min. Que fais-tu ?",
    choix: [
      "Tu demandes à Julie de venir 1 h par jour, sans sa cheffe",
      "Tu attends la fin de la clôture, dans une semaine",
      "Tu préviens sa cheffe, puis demandes au DAF de trancher",
      "Tu demandes au DG d'imposer 1 h par jour de Julie"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Tu pousses Julie à passer outre sa cheffe : elle est prise entre deux feux, et sa cheffe ne te fera plus confiance.",
      "Non. Une semaine de plus de factures bloquées : fournisseurs payés en retard, relances, et tensions avec eux. Le problème grossit en silence.",
      "Oui. Tu as fait 2 propositions chiffrées, elle a dit non 2 fois, et des factures restent bloquées : tu montes d'un niveau. Le DAF est son manager et le sponsor : il arbitre.",
      "Non. Tu sautes le DAF, qui est à la fois son manager et le sponsor : c'est lui qui doit trancher, pas le DG."
    ],
    retenir: "Le manager refuse tes 2 propositions chiffrées et le blocage dure : on monte d'un niveau, en prévenant."
  },
  {
    id: "cp16-q17",
    dialecte: "Gestion de projet",
    q: "La cheffe comptable te demande : « Choisis et paramètre toi-même les circuits de validation, tu sais mieux que moi. » Ces circuits disent qui valide quel montant. Que fais-tu ?",
    choix: [
      "Tu les paramètres, puisque c'est elle qui le demande",
      "Tu vas voir le DAF pour qu'il lui rappelle son rôle",
      "Tu demandes à l'intégrateur de choisir les règles",
      "Tu refuses de les choisir : tu animes, elle décide"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Qui valide quel montant, c'est une règle de contrôle interne : si tu la choisis, c'est toi qu'on accusera à la première fraude ou erreur.",
      "Non. Elle ne refuse rien, elle te fait confiance : faire intervenir son patron la braque, alors qu'un atelier préparé suffit.",
      "Non. L'intégrateur sait paramétrer, pas décider de vos contrôles : la compta ne se reconnaîtra pas dans les règles.",
      "Oui. Tu prépares un atelier d'1 h avec les choix à faire. Elle décide des règles, l'intégrateur les paramètre."
    ],
    retenir: "Les règles métier sont décidées par le métier : on ne les choisit pas à sa place."
  },
  {
    id: "cp16-q18",
    dialecte: "Gestion de projet",
    q: "Ta demande écrite au DAF avait une date limite, dépassée de 10 jours, malgré une relance. L'émission obligatoire de septembre 2027 est en jeu. Tu décides d'aller voir le DG. Que dis-tu d'abord au DAF ?",
    choix: [
      "Rien : tu y vas, pour ne pas le froisser",
      "« Je vais voir le DG, je te mets en copie »",
      "« Sans décision d'ici vendredi, je verrai le DG »",
      "« Tu peux encore décider, ou je reporte tout »"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Il apprendra par le DG que tu es passé au-dessus de lui : ta relation avec le sponsor est cassée pour la suite du projet.",
      "Non. Prévenir en même temps, ce n'est pas prévenir avant : il n'a plus de chance de trancher.",
      "Oui. Tu le préviens, avec une date claire. Il garde une dernière chance de trancher, et il n'est pas surpris.",
      "Non. Tout reporter n'est pas en ton pouvoir, et c'est la plus grosse solution : tu mets toi-même la date légale en danger."
    ],
    retenir: "Avant de monter au-dessus du sponsor, on le prévient, avec une date."
  },
  {
    id: "cp16-q19",
    dialecte: "Gestion de projet",
    q: "En atelier sur la validation des factures fournisseurs, le commercial coupe Julie à chaque phrase. Ce sujet ne concerne pas les ventes. Que fais-tu ?",
    choix: [
      "Tu le laisses parler : il est pressé et influent",
      "Tu recadres : « Ce point est à la compta. Julie ? »",
      "Tu arrêtes l'atelier et tu en parles au DAF",
      "Tu attends la fin pour noter l'avis de Julie à part"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Les règles seront dictées par quelqu'un qui ne fait pas le travail : la compta ne les appliquera pas.",
      "Oui. Tu redonnes la parole à celle qui sait, calmement. Le commercial pourra donner son avis sur les factures clients.",
      "Non. Tu fais monter au sponsor un souci d'animation que tu peux régler en une phrase : l'atelier est perdu pour rien.",
      "Non. En séance, la décision suivra la voix la plus forte : l'avis de Julie, noté après, ne pèsera plus."
    ],
    retenir: "En atelier, on recadre qui parle à la place du métier concerné."
  },
  {
    id: "cp16-q20",
    dialecte: "Gestion de projet",
    q: "Marc est malade une semaine pendant la recette. Ta semaine de marge de recette est encore libre. Le commercial propose de décaler la bascule de juin d'un mois. Que réponds-tu ?",
    choix: [
      "« D'accord, décalons d'un mois : plus de marge »",
      "« Non : on en parle au COPIL, qui tranchera »",
      "« Non : on replanifie ses tests sur la marge »",
      "« Non : je ferai moi-même ses tests ADV »"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Un mois de décalage pour une semaine d'absence : la bascule tombe en juillet, et tu manges la marge légale avant septembre.",
      "Non. Un COPIL pour une semaine d'absence couverte par la marge de recette : tu montes un sujet que tu peux régler seul.",
      "Oui. La marge de recette sert à ça : tu replaces ses tests avec le responsable ADV à son retour, et tu informes le DAF au prochain point.",
      "Non. Tu testes le métier de l'ADV à sa place : rien n'est validé par ceux qui facturent, alors que la marge suffisait."
    ],
    retenir: "La taille de la réponse suit la taille du problème : une semaine se prend sur la marge de recette."
  },
  {
    id: "cp16-q21",
    dialecte: "Gestion de projet",
    q: "Ta semaine de tests ADV tombe pendant l'inventaire du dépôt. Le responsable ADV te propose la semaine suivante. Ta semaine de marge de recette est encore libre. Que fais-tu ?",
    choix: [
      "Tu acceptes sa proposition, et tu informes le DAF",
      "Tu fais toi-même les tests ADV pendant l'inventaire",
      "Tu demandes au DAF d'imposer ta semaine au responsable ADV",
      "Tu décales toute la bascule d'un mois pour être tranquille"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Le manager propose une solution qui tient dans ta marge de recette : tu acceptes, et tu gardes un allié. Le DAF est informé au point suivant, pas sollicité.",
      "Non. Tu testes le métier de l'ADV à sa place, alors que son manager t'offre une solution qui tient dans ta marge.",
      "Non. Tu passes au-dessus d'un manager qui t'aide : il s'en souviendra la prochaine fois.",
      "Non. Une semaine de glissement couverte par la marge ne justifie pas de décaler toute la bascule."
    ],
    retenir: "Un problème qui tient dans ta marge de recette se règle à ton niveau, avec le manager."
  },
  {
    id: "cp16-q22",
    dialecte: "Gestion de projet",
    q: "La plateforme agréée (PA) ne libère pas son expert pour l'atelier prévu au contrat ce mois-ci. Leur service planning répond : « Pas avant 3 semaines. » Que fais-tu ?",
    choix: [
      "Tu demandes au DAF d'appeler leur PDG, contrat en main",
      "Tu appelles directement leur responsable de compte",
      "Tu vois le chef de projet de la PA, contrat en main",
      "Tu réécris à leur service planning pour insister"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Tu sautes le chef de projet de la PA, et ton sponsor s'implique trop tôt : tu grilles une carte que tu pourrais garder.",
      "Non. Tu sautes le chef de projet de la PA, qui n'a pas encore été saisi : chez un prestataire aussi, on monte un niveau à la fois.",
      "Oui. Chez un prestataire, le « manager », c'est son chef de projet. Avec le contrat et le coût du retard, tu demandes une date.",
      "Non. Le planning a déjà répondu et ne fixe pas les priorités : insister au même endroit ne débloque rien, et le mois passe."
    ],
    retenir: "Chez un prestataire, on négocie avec son chef de projet, le contrat en main."
  },
  {
    id: "cp16-q23",
    dialecte: "Gestion de projet",
    q: "Tu prépares ta demande au responsable ADV pour avoir Marc en recette. Quelle phrase utilises-tu ?",
    choix: [
      "« Il me faut Marc dès que possible, c'est vraiment urgent »",
      "« Marc, 2 matins par semaine, 3 semaines : quels jours ? »",
      "« Le DAF compte vraiment sur ton équipe pour ce projet »",
      "« Marc m'a déjà dit qu'il était d'accord pour venir aux tests »"
    ],
    bonne: 1,
    pourquoi: [
      "Non. « Urgent » sans chiffre ne dit ni combien ni quand : il ne peut ni dire oui, ni proposer autre chose.",
      "Oui. Besoin précis, et il choisit les jours : il garde la main sur son équipe, donc il tiendra son accord.",
      "Non. Tu parles au nom du sponsor : s'il vérifie, ton crédit tombe. Et ce n'est pas une demande.",
      "Non. Tu le mets devant le fait accompli : il découvre que tu as négocié avec son équipe sans lui."
    ],
    retenir: "Phrase type : le besoin chiffré, puis « quels jours t'arrangent ? »."
  },
  {
    id: "cp16-q24",
    dialecte: "Gestion de projet",
    q: "Le responsable ADV hésite à libérer Marc. Tu penses lui dire : « Le DAF exige ta participation. » Le DAF n'a rien dit de tel. Que fais-tu ?",
    choix: [
      "Tu n'insistes pas, il reviendra vers toi",
      "Tu le dis, puis tu préviens le DAF juste après",
      "Tu demandes d'abord au DAF de l'appeler lui-même",
      "Tu exposes ton besoin chiffré, sans le DAF"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Il hésite, il n'a pas dit non : sans demande chiffrée de ta part, il ne reviendra pas, et ta recette attend.",
      "Non. Prévenir après ne rend pas la phrase vraie : tu as engagé le DAF sans son accord.",
      "Non. Il n'a pas encore dit non : faire intervenir le sponsor maintenant, c'est escalader avant d'avoir négocié.",
      "Oui. Ton besoin chiffré suffit à ouvrir la discussion. Le DAF reste une marche plus haute, si le manager refuse 2 propositions chiffrées."
    ],
    retenir: "On ne parle jamais au nom du sponsor s'il n'a rien dit."
  },
  {
    id: "cp16-q25",
    dialecte: "Gestion de projet",
    q: "Tu as promis à la cheffe comptable un atelier d'1 heure. Au bout d'1 heure, il reste 2 points à traiter. Que fais-tu ?",
    choix: [
      "Tu continues encore 30 minutes : on y est presque",
      "Tu finis à l'heure et fixes une suite de 30 min",
      "Tu traites les 2 points toi-même, après l'atelier",
      "Tu demandes à chacun s'il peut rester un peu plus"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Tu ne tiens pas ta promesse : la prochaine fois, elle accordera 1 heure en pensant « 2 heures ».",
      "Oui. Tenir ta parole sur la durée construit ton crédit : elle te redonnera du temps, car elle sait que tu respectes ce qu'on t'accorde.",
      "Non. Tu décides seul de points métier : la compta n'aura pas validé ces choix.",
      "Non. Personne n'ose dire non devant les autres : tu obtiens des heures en plus par la pression."
    ],
    retenir: "Tenir ses promesses, même sur la durée d'une réunion, c'est ton crédit."
  },
  {
    id: "cp16-q26",
    dialecte: "Gestion de projet",
    q: "La cheffe comptable avait accepté 2 matinées de Julie par semaine. Depuis 3 semaines, Julie annule à chaque fois : sa cheffe lui donne d'autres urgences. Tu en as parlé à Julie. Que fais-tu ?",
    choix: [
      "Tu demandes au DAF de rappeler sa cheffe à l'ordre",
      "Tu reparles à Julie, faits en main, plus fermement",
      "Tu continues à planifier Julie, en espérant mieux",
      "Tu fais le point avec sa cheffe : faits, impact, créneau"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Tu n'as pas encore revu la cheffe comptable : faire intervenir le DAF maintenant, c'est sauter un niveau et la braquer.",
      "Non. Julie ne décide pas : c'est sa cheffe qui lui donne d'autres urgences. Lui reparler ne protège aucun créneau.",
      "Non. Trois semaines perdues, et rien ne change : sans action, la recette dérive et la bascule de juin glisse.",
      "Oui. Niveau 2 : son accord n'est pas tenu, tu reviens vers elle avec les faits (6 matinées perdues), l'impact et un créneau protégé."
    ],
    retenir: "Un accord du manager n'est pas tenu : tu reviens vers lui, avec les faits, avant de monter."
  },
  {
    id: "cp16-q27",
    dialecte: "Gestion de projet",
    q: "Julie rend des cas de test incomplets : il manque les avoirs fournisseurs et les factures en devise. Que fais-tu ?",
    choix: [
      "Tu le dis à sa cheffe, pour qu'elle la reprenne",
      "Tu complètes toi-même les cas de Julie, sans rien dire",
      "Tu signales le problème au COPIL, dans les risques",
      "Tu en parles à Julie, exemples à l'appui"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Tu passes par son manager pour un souci qu'une discussion directe règle : Julie se sent dénoncée.",
      "Non. Tu fais à sa place, et elle ne saura jamais ce qui manquait : les mêmes trous reviendront dans la recette suivante.",
      "Non. Tu exposes Julie en comité pour un manque qu'elle peut corriger en une heure.",
      "Oui. Niveau 1 : la personne, en direct, avec des faits précis. Elle comprend ce qui manque et progresse."
    ],
    retenir: "Un souci avec une personne : on lui en parle d'abord, en direct, avec des faits."
  },
  {
    id: "cp16-q28",
    dialecte: "Gestion de projet",
    q: "Tu veux 1 journée de Marc (ADV) pour tester un état Divalto de suivi des factures émises (confort, hors obligation légale). Le responsable ADV a refusé 2 fois. Ta demande courte au DAF : date limite dépassée, malgré une relance. Que fais-tu ?",
    choix: [
      "Tu le préviens, puis tu vas voir le DG pour trancher",
      "Tu retires cet état du lot, sans le dire",
      "Tu vois le DAF 10 minutes, et tu replanifies ce test",
      "Tu relances le DAF par écrit une 3e fois, plus ferme"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Demande courte et délai dépassé, oui. Mais l'enjeu est faible, sans date légale : monter au DG pour un état de suivi use ta relation avec le sponsor.",
      "Non. Retirer une fonction du périmètre, c'est au sponsor de le décider : tu changes le projet seul, et on le découvrira plus tard.",
      "Oui. Sans enjeu fort, pas de niveau 4. Tu cherches la réponse en direct, et ce test non urgent attend une période plus calme.",
      "Non. Deux écrits sont restés sans réponse : un 3e ne changera rien. Pour un petit sujet, 10 minutes en face à face valent mieux qu'un mail de plus."
    ],
    retenir: "Au-dessus du sponsor, il faut les trois : demande courte, délai dépassé, enjeu fort. Sans enjeu fort, on reste à son niveau."
  },
  {
    id: "cp16-q29",
    dialecte: "Gestion de projet",
    q: "Le DAF a tranché, en connaissant le coût : pas d'intérimaire, la recette compta s'allonge, et la bascule passe de juin à mi-juillet. Tu préférais l'autre option. La date légale reste tenue. Que fais-tu ?",
    choix: [
      "Tu demandes au DG, tout de suite, de revoir la décision",
      "Tu appliques, et tu notes la décision et le risque",
      "Tu gardes ton planning, au cas où il changerait d'avis",
      "Tu remets le sujet au COPIL pour le faire rejuger"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Le sponsor a décidé en connaissant le coût : faire appel au DG, c'est contester son rôle, et tu perds sa confiance.",
      "Oui. Le sponsor a tranché, la loi est respectée. Tu traces la décision et la marge légale réduite, et tu ajustes le planning.",
      "Non. Deux plannings en parallèle sèment le doute : l'équipe ne sait plus quelle date tenir.",
      "Non. Refaire juger une décision déjà prise use le comité : un désaccord n'est pas un blocage."
    ],
    retenir: "Un désaccord n'est pas un blocage : le sponsor a tranché en connaissant le coût, on applique."
  },
  {
    id: "cp16-q30",
    dialecte: "Gestion de projet",
    q: "Le DAF a décidé, en connaissant le coût : pas d'intérimaire, bascule mi-juillet. Une semaine plus tard, l'intégrateur annonce 8 semaines de retard. La bascule passerait après le 1er septembre 2027, date légale. Que fais-tu ?",
    choix: [
      "Tu appliques : il a tranché en connaissant le coût",
      "Tu revois le DAF le jour même, avec le nouveau coût",
      "Tu vas voir le DG : la date légale est menacée",
      "Tu négocies seul avec l'intégrateur, sans le dire"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Il a décidé avec l'ancien coût. Le nouveau met la date légale en jeu : appliquer sans rien dire, c'est le laisser décider à l'aveugle.",
      "Oui. Une info nouvelle change le coût de sa décision : il doit le savoir le jour même, avec 2 ou 3 options (intérimaire, renfort de l'intégrateur, plan B prévu au contrat).",
      "Non. Le DAF n'a pas encore vu le nouveau coût : aller au DG maintenant, c'est passer au-dessus du sponsor pour une info qu'il n'a pas.",
      "Non. Négocier avec l'intégrateur, oui, mais pas en cachant au sponsor un risque légal : si tu échoues, il l'apprendra trop tard."
    ],
    retenir: "Une info nouvelle change le coût d'une décision du sponsor : on revient vers lui le jour même."
  },
  {
    id: "cp16-q31",
    dialecte: "Gestion de projet",
    q: "Au prochain COPIL, tu vas demander 2 matinées par semaine de la compta pendant 6 semaines. Que fais-tu avant le COPIL ?",
    choix: [
      "Tu vois la cheffe comptable pour caler ta demande",
      "Tu informes tout le monde la veille, support joint",
      "Tu demandes au DAF d'appuyer ta demande en séance",
      "Tu demandes au DG de soutenir ta demande en séance"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Pas de surprise en séance : elle a vu ta demande, proposé des jours, et le COPIL valide un accord déjà préparé.",
      "Non. Un envoi la veille ne laisse pas le temps d'en parler : c'est encore une surprise.",
      "Non. Tu passes par le patron de la cheffe comptable sans l'avoir vue : elle découvre ta demande par lui, et se défend au lieu de chercher une solution.",
      "Non. Tu fais monter le DG pour une demande que sa manager n'a même pas encore vue : la plus grosse solution, trop tôt."
    ],
    retenir: "Avant un COPIL, on voit les managers concernés : personne ne découvre ta demande en séance."
  },
  {
    id: "cp16-q32",
    dialecte: "Gestion de projet",
    q: "Marc refuse de venir aux tests : « Pas le temps. » Tu as écouté ses contraintes et fait 2 propositions de créneaux courts. Toujours non. Que fais-tu ?",
    choix: [
      "Tu le préviens, puis tu vois le responsable ADV",
      "Tu insistes chaque jour jusqu'à ce qu'il cède",
      "Tu signales son refus au DAF, en tant que sponsor",
      "Tu testes l'ADV toi-même, tu connais le processus"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Le niveau 1 a refusé 2 propositions : tu montes d'un niveau. Tu le dis d'abord à Marc, pour qu'il ne se sente pas trahi.",
      "Non. Tu mets la pression sur quelqu'un qui ne décide pas de son temps : il se braque, et rien ne change.",
      "Non. Tu sautes son manager, qui est le seul à pouvoir libérer son temps : le DAF te renverra vers lui.",
      "Non. Tu fais à la place du métier : l'ADV n'aura rien validé, et Marc ne connaîtra pas l'outil à la bascule."
    ],
    retenir: "La personne refuse 2 propositions : tu montes d'un niveau, en la prévenant."
  },
  {
    id: "cp16-q33",
    dialecte: "Gestion de projet",
    q: "Tu démarres DEMAT 2027. Dans 3 mois, la compta et l'ADV prépareront leurs cas de recette. Tu ne connais encore aucun de leurs managers. Que fais-tu maintenant ?",
    choix: [
      "Tu attends la recette : chaque chose en son temps",
      "Tu demandes au DAF d'annoncer leur participation",
      "Tu leur envoies le planning complet de la recette",
      "Tu vas les voir : leurs contraintes, leurs pics"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Ta première demande arrivera d'un inconnu, au pire moment : le refus est presque sûr.",
      "Non. Une annonce venue d'en haut, sans les avoir vus : ils obéiront du bout des lèvres, sans vraiment t'aider.",
      "Non. Un planning reçu sans discussion se lit comme une exigence : ils n'ont rien choisi, ils ne s'engagent pas.",
      "Oui. Tu construis du crédit avant d'en avoir besoin. Tu connais leurs pics (clôture, inventaire) et tu planifies autour."
    ],
    retenir: "On rencontre les managers clés tôt, avant d'avoir besoin d'eux."
  },
  {
    id: "cp16-q34",
    dialecte: "Gestion de projet",
    q: "Le commercial te demande de « juste valider » à la place de l'ADV les tests des factures clients, pour gagner une semaine. Le responsable ADV doit signer la recette. Que réponds-tu ?",
    choix: [
      "« D'accord, je signe pour l'ADV cette fois »",
      "« Non : c'est l'ADV qui valide ses factures »",
      "« Non : on demande d'abord l'avis du DG »",
      "« Je valide ses factures, l'ADV relira plus tard »"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Tu signes à la place de celui qui doit le faire : la première facture client fausse sera ta faute.",
      "Oui. La recette engage le métier. Tu ne signes pas à sa place : tu proposes plutôt d'aider l'ADV à tenir sa date.",
      "Non. Le DG n'a pas à décider qui valide une recette : la règle est déjà claire, et tu montes un sujet pour rien.",
      "Non. « Plus tard » n'arrive jamais avant la bascule : les erreurs sortiront chez les clients."
    ],
    retenir: "On ne valide pas à la place du métier, même pour gagner du temps."
  },
  {
    id: "cp16-q35",
    dialecte: "Gestion de projet",
    q: "Il te faut Sophie, comptable clients, pour la recette des factures émises. Sa cheffe a refusé ta 1re proposition (2 matinées par semaine), puis la 2e (2 heures par semaine, ou un intérimaire). Que fais-tu ?",
    choix: [
      "Tu lui fais une 3e proposition, encore plus légère",
      "Tu la préviens, puis tu vas au DG, options en main",
      "Tu demandes au DAF de trancher, en la prévenant",
      "Tu fais les tests avec la stagiaire, sans Sophie"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Elle a refusé 2 propositions chiffrées : c'est le signal pour monter. Une 3e, plus légère, ne suffira pas pour tester, et tu perds encore des semaines.",
      "Non. Le DAF est son manager et le sponsor : c'est à lui de trancher. Aller au DG, c'est le court-circuiter.",
      "Oui. Le niveau 2 a refusé 2 propositions chiffrées : tu montes au niveau 3. Le DAF est son manager et ton sponsor. Tu la préviens d'abord : elle n'est pas trahie.",
      "Non. La stagiaire ne connaît pas les vrais cas, et sa cheffe n'a rien accordé : les erreurs sortiront après la bascule."
    ],
    retenir: "Le manager refuse deux propositions chiffrées : on monte au sponsor, en prévenant le manager."
  },
  {
    id: "cp16-q36",
    dialecte: "Gestion de projet",
    q: "Le contrat fixait au 1er mars la livraison du connecteur de la plateforme agréée (PA). Son chef de projet a raté cette date, puis promis le 15. On est le 16 : rien. Que fais-tu ?",
    choix: [
      "Tu exiges de lui une 3e date ferme, par écrit",
      "Tu demandes au DAF de résilier le contrat de la PA",
      "Tu vas à son responsable de compte, DAF informé",
      "Tu codes toi-même un export Divalto en attendant"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Deux dates ratées : une 3e promesse du même interlocuteur ne vaut pas plus, même écrite. Tu absorbes le retard, et la recette fond.",
      "Non. Résilier, c'est la plus grosse solution, et trop tôt : son responsable de compte n'a même pas été saisi.",
      "Oui. Tu montes d'un niveau chez le prestataire, contrat en main. Le DAF a signé le contrat : il doit savoir. Et le déclencheur du 15 mars est atteint : tu lances aussi le plan B prévu au contrat (module cp07).",
      "Non. Tu fais le travail du prestataire à sa place : du code de plus à maintenir, et il s'en servira pour expliquer son retard."
    ],
    retenir: "Un prestataire rate 2 fois une date du contrat : son responsable de compte, le sponsor informé, et le plan B lancé si son déclencheur est atteint."
  },
  {
    id: "cp16-q37",
    dialecte: "Gestion de projet",
    q: "Le 3, tu as envoyé ton modèle de PV (procès-verbal) de recette à la cheffe comptable et au responsable ADV : « Sans remarque le 10, je le retiens. » Relance le 9. Le 12 : aucune remarque. Que fais-tu ?",
    choix: [
      "Tu ne le retiens pas : tu relances une 3e fois",
      "Tu attends le COPIL pour le faire approuver",
      "Tu demandes au DAF de valider le modèle de PV",
      "Tu le retiens, comme annoncé, et tu l'écris"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Ta date est passée : relancer encore apprend à tous que tes dates ne comptent pas. Et la recette attend un simple modèle.",
      "Non. Un COPIL pour un format de document : la recette attend des semaines pour rien.",
      "Non. Tu fais monter au sponsor un modèle de document qui relève de toi : il perd du temps, et tu passes pour quelqu'un qui n'ose pas trancher.",
      "Oui. Le format du PV est un document du projet : ta décision par défaut vaut. Tu l'écris (« comme annoncé, ce modèle est retenu »), et tu restes ouvert aux remarques à la marge."
    ],
    retenir: "Décision par défaut annoncée, sur un sujet de ton projet, date passée : on l'applique et on l'écrit."
  },
  {
    id: "cp16-q38",
    dialecte: "Gestion de projet",
    q: "Il y a 2 semaines, tu as recadré l'intégrateur Divalto : ses demandes à Julie passent par toi. Hier, il l'a encore appelée pour des tests hors planning. Sa cheffe s'en plaint. Que fais-tu ?",
    choix: [
      "Tu vas voir son responsable, faits et dates en main",
      "Tu le recadres le jour même, une 2e fois, plus fermement",
      "Tu demandes à Julie de ne plus lui répondre",
      "Tu demandes au DAF des pénalités, faits en main"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Le niveau 1 n'a pas suffi : tu montes chez lui, à son responsable (directeur de projet ou responsable de compte). Tu le dis d'abord à l'intégrateur.",
      "Non. Il connaît la règle et l'a ignorée : un 2e recadrage au même niveau ne changera rien, et la cheffe comptable perd confiance en toi.",
      "Non. Tu laisses Julie seule face à un prestataire : ce n'est pas son rôle, et elle n'ose pas dire non.",
      "Non. Des pénalités pour des appels hors circuit, c'est disproportionné : son responsable n'a même pas encore été saisi."
    ],
    retenir: "Un prestataire recadré recommence : on monte à son responsable, faits en main."
  },
  {
    id: "cp16-q39",
    dialecte: "Gestion de projet",
    q: "Tu découvres que ni le contrat de la plateforme agréée (PA) ni le lot de l'intégrateur ne prévoient l'archivage des factures électroniques sur la durée légale. Le prochain COPIL est dans 4 semaines. Que fais-tu ?",
    choix: [
      "Tu préviens le DAF aujourd'hui, avec les faits",
      "Tu l'ajoutes à l'ordre du jour du prochain COPIL",
      "Tu le fais ajouter par l'intégrateur, sans en parler",
      "Tu alertes le DG directement : c'est un risque légal"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Un risque légal, et sans doute un coût hors budget : le sponsor doit le savoir tout de suite. Tu viens avec les faits et une 1re idée des options.",
      "Non. 4 semaines perdues sur un risque légal : options et budget auraient pu être lancés tout de suite.",
      "Non. Tu engages un coût hors contrat sans le sponsor : c'est lui qui décide du budget, et la facture arrivera quand même.",
      "Non. Le DAF, sponsor, ne le sait même pas : aller au DG, c'est passer au-dessus de lui. Un risque légal se dit d'abord au sponsor, le jour même."
    ],
    retenir: "Un risque légal découvert : on prévient le sponsor tout de suite, sans attendre le COPIL."
  },
  {
    id: "cp16-q40",
    dialecte: "Gestion de projet",
    q: "Sophie, comptable clients, est utilisatrice clé pour les avoirs clients. Elle a manqué un 3e atelier sans prévenir. Après le 2e, tu lui en as parlé : elle avait promis de venir. Que fais-tu ?",
    choix: [
      "Tu reparles à Sophie, avec encore plus de patience",
      "Tu la préviens, puis tu signales ses absences au DAF",
      "Tu testes les avoirs toi-même, sans elle",
      "Tu vois sa cheffe, en le disant d'abord à Sophie"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Le niveau 1 a été tenté, et elle a promis : une 3e discussion ne changera rien. Tu perds encore un atelier, et les avoirs restent non testés.",
      "Non. Tu sautes la cheffe comptable, qui décide de son temps : le DAF te renverra vers elle, et elle se sentira court-circuitée.",
      "Non. Tu testes à la place du métier : personne de la compta n'aura validé les avoirs.",
      "Oui. Niveau 2 : son manager. Sophie a peut-être d'autres urgences imposées, et sa cheffe peut régler ça. Tu préviens Sophie avant : elle n'est pas trahie."
    ],
    retenir: "La personne a promis et recommence : on passe à son manager, en la prévenant."
  },
  {
    id: "cp16-q41",
    dialecte: "Gestion de projet",
    q: "AquaBleu, client EDI, rejette les factures sans numéro de commande. La cheffe comptable veut que l'ADV le saisisse. Le responsable ADV refuse. Tu les as réunis 2 fois, options chiffrées en main. Le paramétrage part le 15. Que fais-tu ?",
    choix: [
      "Tu organises une 3e réunion, options chiffrées en main",
      "Tu choisis toi-même : l'ADV saisit, c'est logique",
      "Tu demandes au DAF, le sponsor, de trancher",
      "Tu les préviens, puis tu demandes au DG de trancher"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Ils ont déjà vu 2 fois les options et leur coût : une 3e réunion rejouera le même désaccord, et le 15 sera passé.",
      "Non. Qui saisit quoi, c'est l'organisation de deux services : ta décision n'engage ni l'un ni l'autre, et celui qui perd ne l'appliquera pas.",
      "Oui. Deux managers bloqués sur une décision qui n'est pas à toi : le sponsor arbitre, avec tes options chiffrées. Tu préviens les deux avant.",
      "Non. Le DAF, sponsor, n'a pas encore été saisi : aller au DG, c'est sauter un niveau pour une décision qui est la sienne."
    ],
    retenir: "Deux managers bloqués, options déjà posées : le sponsor tranche, pas toi, et pas une 3e réunion."
  }
];
