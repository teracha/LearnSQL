// Chef de projet SI — Questions du module cp16 « Diriger sans autorité ».
// Mises en situation. Fil rouge DEMAT 2027 : négociant en équipement de piscines, 120 salariés, ERP Divalto,
// passage à la facture électronique. DAF = sponsor ET manager de la cheffe comptable.
// Personnages : Julie (comptable fournisseurs, cheffe = cheffe comptable), Marc (ADV, chef = responsable ADV).
LEARNSQL.questions.cp16 = [
  {
    id: "cp16-q01",
    dialecte: "Gestion de projet",
    q: "Tu as besoin de Julie, comptable fournisseurs, 2 matinées par semaine pour la recette DEMAT 2027. Julie te dit : « Pour moi, c'est OK. » Que fais-tu ?",
    choix: [
      "Tu bloques les créneaux dans son agenda, c'est fait",
      "Tu fais valider ces créneaux par sa cheffe comptable",
      "Tu demandes au DAF de l'annoncer à toute l'équipe",
      "Tu notes son accord dans le compte rendu du COPIL"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Julie ne décide pas de son temps : au premier pic de travail, sa cheffe lui donnera d'autres urgences et tes créneaux sauteront.",
      "Oui. Sa manager fixe ses priorités. Avec son accord, les créneaux sont protégés, même en période chargée.",
      "Non. Tu passes au-dessus de la cheffe comptable sans lui avoir parlé : elle se sent court-circuitée et tu perds une alliée.",
      "Non. Un compte rendu n'engage pas la cheffe comptable. L'accord de Julie seule ne protège pas ses créneaux."
    ],
    retenir: "La personne pour comprendre, son manager pour réserver son temps."
  },
  {
    id: "cp16-q02",
    dialecte: "Gestion de projet",
    q: "La cheffe comptable refuse de libérer Julie la semaine de clôture. C'est votre premier échange sur ce sujet. Que fais-tu ?",
    choix: [
      "Tu demandes au DAF d'imposer la présence de Julie",
      "Tu lui proposes d'autres créneaux, hors clôture",
      "Tu fais toi-même les tests de Julie cette semaine",
      "Tu décales toute la recette d'un mois, par prudence"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Escalade trop tôt : tu n'as rien proposé. La cheffe comptable se sent court-circuitée, et le DAF te renverra vers elle.",
      "Oui. Son refus porte sur une semaine, pas sur le projet. Une proposition précise hors clôture règle le problème à ton niveau.",
      "Non. Tu testes un métier qui n'est pas le tien : la compta n'aura rien validé, et les erreurs sortiront après la bascule.",
      "Non. Un mois de retard pour une seule semaine bloquée : tu manges la marge avant la date légale sans raison."
    ],
    retenir: "Un refus ponctuel se règle par une autre proposition, pas par une escalade."
  },
  {
    id: "cp16-q03",
    dialecte: "Gestion de projet",
    q: "Le DAF, sponsor, refuse que la cheffe comptable passe 3 jours en recette en janvier : « La clôture annuelle passe avant. » Ton planning prévoyait ces 3 jours. Que fais-tu ?",
    choix: [
      "Tu le préviens, puis tu demandes au DG d'arbitrer",
      "Tu décales toute la recette après la clôture annuelle",
      "Tu reviens vers lui avec des options et leur coût",
      "Tu fais la recette sans la compta, pour tenir la date"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Le DAF n'a pas encore vu le coût de son choix : aller au DG maintenant, c'est passer au-dessus du sponsor pour une info qu'il n'a pas.",
      "Non. Tu choisis l'option la plus lourde sans la chiffrer : la marge avant septembre fond, et personne n'a décidé.",
      "Oui. Son refus dit sa priorité : la clôture. Avec le coût de chaque option (février, une autre personne, un intérimaire), il tranche en connaissance de cause.",
      "Non. Sans la compta, personne ne valide les écritures : les erreurs sortiront en production, sur des factures réelles."
    ],
    retenir: "Le refus du sponsor est une information : tu réponds avec le coût de chaque option."
  },
  {
    id: "cp16-q04",
    dialecte: "Gestion de projet",
    q: "Tu vas voir la cheffe comptable pour obtenir du temps de son équipe en recette. Que lui dis-tu ?",
    choix: [
      "« J'aurai besoin de ton équipe, quand vous pourrez »",
      "« Julie, mardi et jeudi matin, 4 semaines, dès le 5 »",
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
      "Tu écris au responsable ADV, avec le DAF en copie",
      "Tu le remplaces par un autre assistant de l'ADV",
      "Tu signales ses absences au prochain COPIL"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Niveau 1 de l'échelle : la personne. Il est peut-être débordé ou mal informé. Tu règles vite, sans braquer personne.",
      "Non. Tu sautes l'échelle et tu mets le sponsor en copie : Marc se sent dénoncé, et tu perds un utilisateur clé.",
      "Non. Tu changes d'utilisateur clé sans connaître la cause, et sans son manager : le nouveau aura sans doute le même problème.",
      "Non. Deux absences ne méritent pas un COPIL : tu exposes Marc en public pour un sujet qu'une discussion aurait réglé."
    ],
    retenir: "Échelle d'escalade : d'abord la personne, en direct."
  },
  {
    id: "cp16-q06",
    dialecte: "Gestion de projet",
    q: "La cheffe comptable a refusé ta proposition chiffrée. Le 5, tu as demandé au DAF, par écrit, de trancher entre 2 options : 15 minutes, date limite le 12. Relancé le 13. On est le 19, rien. Sans recette, la bascule de juin, avant l'émission obligatoire de septembre 2027, est menacée. Que fais-tu ?",
    choix: [
      "Tu le préviens, puis tu demandes au DG d'arbitrer",
      "Tu le relances encore, avec un ton plus pressant",
      "Tu écris : « Sans réponse, j'applique l'option A »",
      "Tu attends le COPIL du mois prochain pour en parler"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Demande courte, date limite dépassée, relance faite, date légale en jeu : niveau 4. Tu le préviens d'abord, pour ne pas le trahir.",
      "Non. La date limite est passée et une date légale est en jeu : une relance de plus, c'est une semaine de plus perdue.",
      "Non. L'option A prend du temps à la compta malgré le refus de sa cheffe. Une décision par défaut ne vaut que pour ce qui dépend de ton projet.",
      "Non. Trois semaines de plus sans décision, alors que la recette doit finir avant juin : tu laisses le risque devenir un retard."
    ],
    retenir: "Demande courte faite, date limite dépassée, enjeu légal : on monte au-dessus du sponsor, en le prévenant."
  },
  {
    id: "cp16-q07",
    dialecte: "Gestion de projet",
    q: "Hier, tu as envoyé au DAF un long mail sur les créneaux de recette compta. Pas de réponse. Ton mail ne fixait aucune date limite. Que fais-tu ?",
    choix: [
      "Tu écris au DG : le sponsor ne suit plus le projet",
      "Tu redemandes, en 3 lignes, avec une date limite",
      "Tu décales la recette en attendant qu'il réponde",
      "Tu mets le sujet à l'ordre du jour du COPIL suivant"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Un jour sans réponse, sans date limite : aller au DG maintenant abîme ta relation avec le sponsor pour rien.",
      "Oui. Une demande courte avec une date limite donne au DAF une chance réelle de répondre. Sans elle, tu ne pourras pas escalader plus tard.",
      "Non. Tu décales sur un simple silence d'un jour : la marge fond, et le DAF n'a même pas eu le temps de lire.",
      "Non. Attendre le COPIL fait perdre des semaines pour une question qui se règle en 15 minutes."
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
      "Tu en fais la moitié, Julie fait le reste"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Tu testes un métier qui n'est pas le tien : la compta n'a rien validé, et c'est toi qu'on accusera à la première erreur.",
      "Oui. La recette, c'est le métier qui valide. Tu l'aides à préparer ses cas et tu es là au créneau : elle avance, et elle reste responsable.",
      "Non. L'intégrateur testerait son propre travail, et la compta ne validerait toujours rien. En plus, tu paies.",
      "Non. Même à moitié, tu fais à sa place : la moitié du métier n'est pas validée par le métier."
    ],
    retenir: "On ne fait pas les tests du métier à sa place : on l'aide à les faire."
  },
  {
    id: "cp16-q09",
    dialecte: "Gestion de projet",
    q: "La recette compta a une semaine de retard. Julie, motivée, propose : « Je reste 2 soirs par semaine, ça ira plus vite. » Sa cheffe n'est pas au courant. Que fais-tu ?",
    choix: [
      "Tu acceptes et tu la remercies devant l'équipe",
      "Tu acceptes, mais seulement jusqu'à la fin du mois",
      "Tu la remercies, mais tu vois le retard avec sa cheffe",
      "Tu acceptes, et tu préviens sa cheffe plus tard"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Ton planning repose sur des heures que personne n'a validées : si Julie s'épuise ou s'arrête, la recette s'effondre.",
      "Non. Une limite dans le temps ne change rien : sa cheffe découvrira les heures en plus, et toi qui les as acceptées.",
      "Oui. Tu ne bâtis pas ton planning sur des heures que personne n'a validées. Sa cheffe décide : alléger autre chose, ou valider elle-même des heures en plus.",
      "Non. Sa cheffe apprend après coup que tu as décidé du temps de son équipe : tu perds sa confiance."
    ],
    retenir: "On n'accepte pas d'heures en plus sans le manager : c'est lui qui décide de la charge."
  },
  {
    id: "cp16-q10",
    dialecte: "Gestion de projet",
    q: "La recette des factures fournisseurs est finie. Julie y a passé 6 matinées et trouvé 12 anomalies, corrigées avant la bascule. Que fais-tu ?",
    choix: [
      "Tu présentes les résultats au COPIL, sans la citer",
      "Tu la cites au COPIL, devant sa cheffe et le DAF",
      "Tu la remercies en privé, sans en parler plus loin",
      "Tu passes vite à la suite : la recette continue"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Le travail de Julie devient invisible : la prochaine fois, sa cheffe verra le temps perdu, pas le résultat.",
      "Oui. Sa contribution devient visible pour ceux qui décident de son temps : sa cheffe la libérera plus facilement la prochaine fois.",
      "Non. Un merci privé fait plaisir, mais sa cheffe ne voit pas ce que son temps a apporté au projet.",
      "Non. Sans reconnaissance, ton allié se démotive, et tu auras encore besoin d'elle pour la bascule."
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
      "Tu l'aides, contre un engagement écrit de sa part",
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
    q: "La cheffe comptable te propose la stagiaire comme utilisatrice clé pour les factures fournisseurs : « Elle a du temps. » La stagiaire est là depuis 3 semaines. Julie, comptable fournisseurs depuis 8 ans, connaît tous les cas. Que fais-tu ?",
    choix: [
      "Tu acceptes la stagiaire et tu la formes toi-même",
      "Tu demandes au DAF de nommer quelqu'un d'autre",
      "Tu acceptes, et tu valides toi-même tous ses tests",
      "Tu expliques le rôle et demandes Julie 1 matinée par semaine"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Un utilisateur clé doit connaître le travail réel : même formée par toi, la stagiaire ne connaîtra pas les vrais cas, et les erreurs passeront.",
      "Non. Tu passes au-dessus de la cheffe comptable avant d'avoir négocié avec elle : elle le prendra mal.",
      "Non. Tu fais le travail du métier à sa place : personne de la compta n'aura vraiment validé.",
      "Oui. Tu lui montres ce que le rôle demande, et tu réduis le coût pour elle : 1 matinée de Julie, la stagiaire en appui."
    ],
    retenir: "L'utilisateur clé connaît le travail réel : on négocie son temps, quitte à en demander moins."
  },
  {
    id: "cp16-q13",
    dialecte: "Gestion de projet",
    q: "Le DAF refuse un 2e utilisateur clé en compta : « Une personne suffit. » Ton planning en prévoyait deux. Que fais-tu ?",
    choix: [
      "Tu portes le sujet au DG : la recette exige deux personnes",
      "Tu lui montres le coût : recette plus longue, ou intérim",
      "Tu acceptes, et tu serres la recette sans rien lui dire",
      "Tu demandes à Julie de faire le travail des deux à la fois"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Le DAF n'a pas vu le coût de son choix : tu passes au-dessus du sponsor alors qu'un chiffre peut suffire.",
      "Oui. Son refus dit sa contrainte : la charge de la compta. Avec le coût (3 semaines de plus, ou un intérimaire), il tranche en connaissant le prix.",
      "Non. Tu caches un risque au sponsor : si la recette déborde, il découvrira trop tard que le planning était intenable.",
      "Non. Tu doubles la charge de Julie sans l'accord de sa cheffe : épuisement, erreurs, et une alliée perdue."
    ],
    retenir: "Face à un refus du sponsor : le coût de chaque option, pas l'escalade."
  },
  {
    id: "cp16-q14",
    dialecte: "Gestion de projet",
    q: "L'intégrateur Divalto appelle directement Julie pour lui faire tester un écran, hors planning, sans passer par toi. Julie y a perdu une matinée. Que fais-tu ?",
    choix: [
      "Tu laisses faire : au moins, le projet avance plus vite",
      "Tu demandes à Julie de refuser seule, la prochaine fois",
      "Tu recadres l'intégrateur : les demandes passent par toi",
      "Tu demandes au DAF de menacer l'intégrateur de pénalités"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Chaque appel direct grignote le temps négocié avec sa cheffe : à la fin, elle te retirera Julie.",
      "Non. Tu laisses Julie seule face à un prestataire : ce n'est pas son rôle, et elle n'ose pas dire non.",
      "Oui. Un seul canal protège le temps que sa cheffe t'a accordé. Tu le dis calmement à l'intégrateur, et tu replanifies son test.",
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
    q: "Depuis 3 jours, des factures fournisseurs reçues restent bloquées en anomalie à l'intégration dans Divalto. Seule Julie sait les traiter. Sa cheffe la garde sur la clôture et a refusé ta proposition d'1 h par jour. La réception est obligatoire depuis septembre 2026. Que fais-tu ?",
    choix: [
      "Tu traites toi-même les rejets, pour aller plus vite",
      "Tu attends la fin de la clôture, dans une semaine",
      "Tu préviens sa cheffe, puis demandes au DAF de trancher",
      "Tu demandes au DG d'imposer 1 h par jour de Julie"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Traiter ces anomalies (compte, TVA, rapprochement), c'est un choix comptable : tu fais le métier à sa place, avec un vrai risque d'erreur sur les comptes.",
      "Non. Une semaine de factures bloquées : fournisseurs payés en retard, et une obligation légale déjà en vigueur mal tenue.",
      "Oui. Tu as proposé et chiffré, elle a dit non, l'enjeu est légal : tu montes d'un niveau. Le DAF est son manager et le sponsor : il arbitre.",
      "Non. Tu sautes le DAF, qui est à la fois son manager et le sponsor : c'est lui qui doit trancher, pas le DG."
    ],
    retenir: "Le manager refuse une proposition chiffrée et l'enjeu est fort : on monte d'un niveau, en prévenant."
  },
  {
    id: "cp16-q17",
    dialecte: "Gestion de projet",
    q: "La cheffe comptable te demande : « Choisis et paramètre toi-même les circuits de validation, tu sais mieux que moi. » Ces circuits disent qui valide quel montant. Que fais-tu ?",
    choix: [
      "Tu les paramètres, puisque c'est elle qui le demande",
      "Tu prends les circuits d'une autre entreprise cliente",
      "Tu refuses de les choisir : tu animes, elle décide",
      "Tu demandes à l'intégrateur de choisir les règles"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Qui valide quel montant, c'est une règle de contrôle interne : si tu la choisis, c'est toi qu'on accusera à la première fraude ou erreur.",
      "Non. Les circuits d'une autre entreprise ne collent ni à vos seuils ni à vos personnes : tu importes des erreurs.",
      "Oui. Tu prépares un atelier d'1 h avec les choix à faire. Elle décide des règles, l'intégrateur les paramètre.",
      "Non. L'intégrateur sait paramétrer, pas décider de vos contrôles : la compta ne se reconnaîtra pas dans les règles."
    ],
    retenir: "Les règles métier sont décidées par le métier : on ne les choisit pas à sa place."
  },
  {
    id: "cp16-q18",
    dialecte: "Gestion de projet",
    q: "Ta demande écrite au DAF avait une date limite, dépassée de 10 jours, malgré une relance. L'émission obligatoire de septembre 2027 est en jeu. Tu décides d'aller voir le DG. Que dis-tu d'abord au DAF ?",
    choix: [
      "Rien : tu vas voir le DG, pour ne pas le froisser",
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
    q: "En atelier sur la validation des factures fournisseurs, le commercial coupe Julie à chaque phrase. Ce sujet relève de la compta, pas des ventes. Que fais-tu ?",
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
    q: "Marc est malade une semaine pendant la recette. Ton planning garde 3 semaines de marge avant la bascule de juin. Le commercial propose de décaler la bascule d'un mois. Que réponds-tu ?",
    choix: [
      "« D'accord, décalons d'un mois, c'est plus sûr »",
      "« Non : on en parle au COPIL, qui tranchera »",
      "« Non : on replanifie ses tests sur la marge »",
      "« Je demande au DAF un autre assistant ADV »"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Un mois de décalage pour une semaine d'absence : tu prends la plus grosse solution, et tu manges la marge de la date légale.",
      "Non. Un COPIL pour une semaine d'absence couverte par la marge : tu montes un sujet que tu peux régler seul.",
      "Oui. La marge sert à ça : tu replaces ses tests avec le responsable ADV à son retour, et tu informes le DAF au prochain point.",
      "Non. Le DAF n'est pas le manager de Marc, et le remplacer pour une semaine coûte plus que d'attendre son retour."
    ],
    retenir: "La taille de la réponse suit la taille du problème : une semaine se prend sur la marge."
  },
  {
    id: "cp16-q21",
    dialecte: "Gestion de projet",
    q: "Ta semaine de tests ADV tombe pendant l'inventaire du dépôt. Le responsable ADV te propose la semaine suivante. Ton planning a encore 2 semaines de marge. Que fais-tu ?",
    choix: [
      "Tu prends sa semaine suivante, et tu informes le DAF",
      "Tu inscris le conflit de dates à l'ordre du jour du COPIL",
      "Tu demandes au DAF d'imposer ta semaine au responsable ADV",
      "Tu décales toute la bascule d'un mois pour être tranquille"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Le manager propose une solution qui tient dans ta marge : tu acceptes, et tu gardes un allié. Le DAF est informé, pas sollicité.",
      "Non. Une semaine qui tient dans la marge n'a rien à faire en COPIL : tu mobilises le comité pour rien.",
      "Non. Tu passes au-dessus d'un manager qui t'aide : il s'en souviendra la prochaine fois.",
      "Non. Une semaine de glissement couverte par la marge ne justifie pas de décaler toute la bascule."
    ],
    retenir: "Un problème qui tient dans ta marge se règle à ton niveau, avec le manager."
  },
  {
    id: "cp16-q22",
    dialecte: "Gestion de projet",
    q: "Le prestataire de la plateforme agréée ne libère pas son expert pour l'atelier de paramétrage. Son commercial répond : « Pas avant 3 semaines. » Le contrat prévoit cet atelier ce mois-ci. Que fais-tu ?",
    choix: [
      "Tu demandes au DAF d'appeler directement leur PDG",
      "Tu attends 3 semaines : tu n'y peux rien de toute façon",
      "Tu vois leur chef de projet, contrat en main",
      "Tu fais le paramétrage toi-même, avec leur documentation"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Tu sautes le chef de projet du prestataire et ton sponsor s'implique trop tôt : tu grilles une carte que tu pourrais garder.",
      "Non. Le contrat prévoit l'atelier ce mois-ci : attendre, c'est accepter 3 semaines de retard sans rien demander.",
      "Oui. Chez un prestataire, le « manager », c'est son chef de projet. Avec le contrat et le coût du retard, tu demandes une date.",
      "Non. Tu fais le travail du prestataire sans son expertise : en cas d'erreur, il dira que ce n'est pas son paramétrage."
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
      "Tu le dis : le DAF serait sûrement d'accord avec ça",
      "Tu exposes ton besoin chiffré, sans le DAF",
      "Tu demandes d'abord au DAF de l'appeler lui-même",
      "Tu le dis, puis tu préviens le DAF juste après"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Tu parles au nom du sponsor sans mandat : s'il vérifie, ton crédit tombe auprès des deux.",
      "Oui. Ton besoin chiffré suffit à ouvrir la discussion. Le DAF reste une marche plus haute, si le manager dit non.",
      "Non. Il n'a pas encore dit non : faire intervenir le sponsor maintenant, c'est escalader avant d'avoir négocié.",
      "Non. Prévenir après ne rend pas la phrase vraie : tu as engagé le DAF sans son accord."
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
      "Tu fais le point avec sa cheffe : faits, impact, créneau",
      "Tu continues à planifier Julie, en espérant mieux",
      "Tu fais les tests de Julie pour ne pas prendre de retard"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Tu n'as pas encore revu la cheffe comptable : faire intervenir le DAF maintenant, c'est sauter un niveau et la braquer.",
      "Oui. Niveau 2 : son accord n'est pas tenu, tu reviens vers elle avec les faits (6 matinées perdues), l'impact et un créneau protégé.",
      "Non. Trois semaines perdues, et rien ne change : sans action, la recette dérive et la bascule de juin glisse.",
      "Non. Tu fais le travail du métier à sa place : la compta n'aura rien validé avant la bascule."
    ],
    retenir: "Un accord du manager n'est pas tenu : tu reviens vers lui, avec les faits, avant de monter."
  },
  {
    id: "cp16-q27",
    dialecte: "Gestion de projet",
    q: "Julie rend des cas de test incomplets : il manque les avoirs et les factures en devise. Que fais-tu ?",
    choix: [
      "Tu le dis à sa cheffe, pour qu'elle la reprenne",
      "Tu complètes les cas toi-même, sans rien dire",
      "Tu en parles à Julie, exemples à l'appui",
      "Tu signales le problème au COPIL, dans les risques"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Tu passes par son manager pour un souci qu'une discussion directe règle : Julie se sent dénoncée.",
      "Non. Tu fais à sa place, et elle ne saura jamais ce qui manquait : les mêmes trous reviendront dans la recette suivante.",
      "Oui. Niveau 1 : la personne, en direct, avec des faits précis. Elle comprend ce qui manque et progresse.",
      "Non. Tu exposes Julie en comité pour un manque qu'elle peut corriger en une heure."
    ],
    retenir: "Un souci avec une personne : on lui en parle d'abord, en direct, avec des faits."
  },
  {
    id: "cp16-q28",
    dialecte: "Gestion de projet",
    q: "Tu veux 1 journée de Marc (ADV) pour tester un tableau de bord des ventes, un « plus » hors obligation légale. Le responsable ADV a dit non. Ta demande de 3 lignes au DAF avait une date limite, dépassée malgré une relance. Que fais-tu ?",
    choix: [
      "Tu le préviens, puis tu vas voir le DG pour trancher",
      "Tu retires le tableau de bord du lot, sans le dire",
      "Tu vois le DAF 10 minutes, et tu replanifies ce test",
      "Tu testes le tableau de bord toi-même, à sa place"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Demande courte et délai dépassé, oui. Mais l'enjeu est faible, sans date légale : monter au DG pour un « plus » use ta relation avec le sponsor.",
      "Non. Retirer une fonction du périmètre, c'est au sponsor de le décider : tu changes le projet seul, et on le découvrira plus tard.",
      "Oui. Sans enjeu fort, pas de niveau 4. Tu cherches la réponse en direct, et ce test non urgent attend une période plus calme.",
      "Non. Tu valides un outil des ventes à la place de l'ADV : il ne sera ni vérifié ni adopté par ceux qui l'utilisent."
    ],
    retenir: "Au-dessus du sponsor, il faut les trois : demande courte, délai dépassé, enjeu fort. Sans enjeu fort, on reste à son niveau."
  },
  {
    id: "cp16-q29",
    dialecte: "Gestion de projet",
    q: "Le DAF a tranché : la recette compta aura lieu après la clôture, et la bascule passe de juin à mi-juillet. Il a vu le coût. Tu préférais l'autre option. La date légale reste tenue. Que fais-tu ?",
    choix: [
      "Tu demandes au DG de revoir cette décision",
      "Tu appliques, et tu notes la décision et le risque",
      "Tu gardes ton planning, au cas où il changerait d'avis",
      "Tu remets le sujet au COPIL pour le faire rejuger"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Le sponsor a décidé en connaissant le coût : faire appel au DG, c'est contester son rôle, et tu perds sa confiance.",
      "Oui. Le sponsor a tranché, la loi est respectée. Tu traces la décision et la marge réduite, et tu ajustes le planning.",
      "Non. Deux plannings en parallèle sèment le doute : l'équipe ne sait plus quelle date tenir.",
      "Non. Refaire juger une décision déjà prise use le comité : un désaccord n'est pas un blocage."
    ],
    retenir: "Un désaccord n'est pas un blocage : le sponsor a tranché en connaissant le coût, on applique."
  },
  {
    id: "cp16-q30",
    dialecte: "Gestion de projet",
    q: "Le DAF a décidé, en connaissant le coût : recette compta après la clôture, bascule mi-juillet. Une semaine plus tard, l'intégrateur annonce 6 semaines de retard. Avec les deux, la bascule passe après le 1er septembre 2027, date de l'émission obligatoire. Que fais-tu ?",
    choix: [
      "Tu appliques : il a tranché en connaissant le coût",
      "Tu revois le DAF tout de suite, avec le nouveau coût",
      "Tu attends le COPIL du mois prochain pour l'annoncer",
      "Tu négocies seul avec l'intégrateur, sans rien dire"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Il a décidé avec l'ancien coût. Le nouveau met la date légale en jeu : appliquer sans rien dire, c'est le laisser décider à l'aveugle.",
      "Oui. Une info nouvelle change le coût de sa décision : il doit le savoir tout de suite, avec 2 ou 3 options (recette pendant la clôture, renfort, plan de rattrapage de l'intégrateur).",
      "Non. Un mois perdu alors que la date légale est menacée : le COPIL découvrira un problème qu'on pouvait encore traiter.",
      "Non. Négocier avec l'intégrateur, oui, mais pas en cachant au sponsor un risque légal : si tu échoues, il l'apprendra trop tard."
    ],
    retenir: "Une info nouvelle change le coût d'une décision du sponsor : on revient vers lui tout de suite."
  },
  {
    id: "cp16-q31",
    dialecte: "Gestion de projet",
    q: "Au prochain COPIL, tu vas demander 2 matinées par semaine de la compta pendant 6 semaines. Que fais-tu avant le COPIL ?",
    choix: [
      "Rien : le DAF tranchera en séance",
      "Tu envoies le support à tous la veille au soir",
      "Tu vois la cheffe comptable pour caler ta demande",
      "Tu demandes au DG de soutenir ta demande en séance"
    ],
    bonne: 2,
    pourquoi: [
      "Non. La cheffe comptable découvre ta demande devant son patron : elle se défend au lieu de chercher une solution.",
      "Non. Un envoi la veille ne laisse pas le temps d'en parler : c'est encore une surprise.",
      "Oui. Pas de surprise en séance : elle a vu ta demande, proposé des jours, et le COPIL valide un accord déjà préparé.",
      "Non. Tu fais monter le DG pour une demande que sa manager n'a même pas encore vue : la plus grosse solution, trop tôt."
    ],
    retenir: "Avant un COPIL, on voit les managers concernés : personne ne découvre ta demande en séance."
  },
  {
    id: "cp16-q32",
    dialecte: "Gestion de projet",
    q: "Marc refuse toujours de venir aux tests : « Pas le temps. » Tu as écouté ses contraintes et proposé des créneaux courts. Toujours non. Que fais-tu ?",
    choix: [
      "Tu le préviens, puis tu vois le responsable ADV",
      "Tu insistes chaque jour jusqu'à ce qu'il cède",
      "Tu signales son refus au DAF, en tant que sponsor",
      "Tu testes l'ADV toi-même, tu connais le processus"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Le niveau 1 a dit non : tu montes d'un niveau. Tu le dis d'abord à Marc, pour qu'il ne se sente pas trahi.",
      "Non. Tu mets la pression sur quelqu'un qui ne décide pas de son temps : il se braque, et rien ne change.",
      "Non. Tu sautes son manager, qui est le seul à pouvoir libérer son temps : le DAF te renverra vers lui.",
      "Non. Tu fais à la place du métier : l'ADV n'aura rien validé, et Marc ne connaîtra pas l'outil à la bascule."
    ],
    retenir: "La personne dit non malgré tes propositions : tu montes d'un niveau, en la prévenant."
  },
  {
    id: "cp16-q33",
    dialecte: "Gestion de projet",
    q: "Tu démarres DEMAT 2027. Dans 3 mois, tu auras besoin de la compta et de l'ADV pour la recette. Tu ne connais encore aucun de leurs managers. Que fais-tu maintenant ?",
    choix: [
      "Tu attends la recette : chaque chose en son temps",
      "Tu vas les voir : leurs contraintes, leurs pics",
      "Tu leur envoies le planning complet de la recette",
      "Tu demandes au DAF d'annoncer leur participation"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Ta première demande arrivera d'un inconnu, au pire moment : le refus est presque sûr.",
      "Oui. Tu construis du crédit avant d'en avoir besoin. Tu connais leurs pics (clôture, inventaire) et tu planifies autour.",
      "Non. Un planning reçu sans discussion se lit comme une exigence : ils n'ont rien choisi, ils ne s'engagent pas.",
      "Non. Une annonce venue d'en haut, sans les avoir vus : ils obéiront du bout des lèvres, sans vraiment t'aider."
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
      "« On demande au DG s'il accepte cette semaine »",
      "« Je valide, et l'ADV relira plus tard »"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Tu signes à la place de celui qui doit le faire : la première facture client fausse sera ta faute.",
      "Oui. La recette engage le métier. Tu ne signes pas à sa place : tu proposes plutôt d'aider l'ADV à tenir sa date.",
      "Non. Le DG n'a pas à décider qui valide une recette : la règle est déjà claire.",
      "Non. « Plus tard » n'arrive jamais avant la bascule : les erreurs sortiront chez les clients."
    ],
    retenir: "On ne valide pas à la place du métier, même pour gagner du temps."
  },
  {
    id: "cp16-q35",
    dialecte: "Gestion de projet",
    q: "Il te faut Julie pour la recette des factures émises. Sa cheffe a refusé ta 1re proposition (2 matinées par semaine), puis la 2e (2 heures par semaine, ou un intérimaire). Sans ces tests, la bascule passe après septembre 2027. Que fais-tu ?",
    choix: [
      "Tu lui fais une 3e proposition, encore plus légère",
      "Tu la préviens, puis tu vas voir le DG directement",
      "Tu demandes au DAF de trancher, en la prévenant",
      "Tu fais les tests avec la stagiaire, sans Julie"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Elle a refusé deux propositions chiffrées : une 3e, plus légère, ne suffira pas pour tester, et tu perds encore des semaines avant la date légale.",
      "Non. Le DAF est son manager et le sponsor : c'est à lui de trancher. Aller au DG, c'est le court-circuiter.",
      "Oui. Le niveau 2 a dit non deux fois, la date légale est en jeu : niveau 3. Le DAF est son manager et ton sponsor. Tu la préviens d'abord : elle n'est pas trahie.",
      "Non. La stagiaire ne connaît pas les vrais cas, et sa cheffe n'a rien accordé : les erreurs sortiront après la bascule."
    ],
    retenir: "Le manager refuse deux propositions chiffrées et la date légale est en jeu : on monte au sponsor, en le prévenant."
  },
  {
    id: "cp16-q36",
    dialecte: "Gestion de projet",
    q: "Le contrat fixait au 1er mars la livraison du connecteur Divalto de la plateforme. Son chef de projet a raté cette date, puis a promis le 15. On est le 16 : rien. La recette ne peut pas commencer. Que fais-tu ?",
    choix: [
      "Tu lui accordes une 3e date, confirmée par écrit",
      "Tu demandes au DAF de résilier le contrat",
      "Tu vas à son responsable de compte, et informes le DAF",
      "Tu codes toi-même un export en attendant"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Deux dates ratées : une 3e promesse du même interlocuteur ne vaut pas plus. Tu absorbes le retard, et la recette fond.",
      "Non. Résilier, c'est la plus grosse solution, et trop tôt : son responsable de compte n'a même pas été saisi.",
      "Oui. Tu montes d'un niveau chez le prestataire, contrat en main. Le DAF a signé le contrat : il doit savoir, sans avoir à agir pour l'instant.",
      "Non. Tu fais le travail du prestataire à sa place : du code de plus à maintenir, et il s'en servira pour expliquer son retard."
    ],
    retenir: "Un prestataire rate 2 fois une date du contrat : son responsable de compte, et le sponsor informé."
  },
  {
    id: "cp16-q37",
    dialecte: "Gestion de projet",
    q: "Le 3, tu as envoyé ton modèle de PV de recette (colonnes, statut des anomalies) à la cheffe comptable et au responsable ADV : « Sans remarque le 10, je le retiens. » Relancé le 9. On est le 12 : aucune remarque. Que fais-tu ?",
    choix: [
      "Tu les relances une 3e fois, pour avoir un vrai oui",
      "Tu le retiens, comme annoncé, et tu l'écris",
      "Tu demandes au DAF de valider le modèle de PV",
      "Tu attends le COPIL pour le faire approuver"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Ta date est passée : relancer encore apprend à tous que tes dates ne comptent pas. Et la recette attend un simple modèle.",
      "Oui. Le format du PV est un document du projet : ta décision par défaut vaut. Tu l'écris (« comme annoncé, ce modèle est retenu »), et tu restes ouvert aux remarques à la marge.",
      "Non. Tu fais monter au sponsor un modèle de document qui relève de toi : il perd du temps, et tu passes pour quelqu'un qui n'ose pas trancher.",
      "Non. Un COPIL pour un format de document : la recette attend des semaines pour rien."
    ],
    retenir: "Décision par défaut annoncée, sur un sujet de ton projet, date passée : on l'applique et on l'écrit."
  },
  {
    id: "cp16-q38",
    dialecte: "Gestion de projet",
    q: "Il y a 2 semaines, tu as recadré l'intégrateur Divalto : ses demandes à Julie passent par toi. Hier, il l'a encore appelée pour des tests hors planning. Sa cheffe s'en plaint. Que fais-tu ?",
    choix: [
      "Tu le recadres une 2e fois, plus fermement",
      "Tu vas voir son responsable, faits et dates en main",
      "Tu demandes à Julie de ne plus lui répondre",
      "Tu demandes au DAF d'appliquer des pénalités"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Il connaît la règle et l'a ignorée : un 2e recadrage au même niveau ne changera rien, et la cheffe comptable perd confiance en toi.",
      "Oui. Le niveau 1 n'a pas suffi : tu montes chez lui, à son responsable (directeur de projet ou responsable de compte). Tu le dis d'abord à l'intégrateur.",
      "Non. Tu laisses Julie seule face à un prestataire : ce n'est pas son rôle, et elle n'ose pas dire non.",
      "Non. Des pénalités pour des appels hors circuit, c'est disproportionné : son responsable n'a même pas encore été saisi."
    ],
    retenir: "Un prestataire recadré recommence : on monte à son responsable, faits en main."
  },
  {
    id: "cp16-q39",
    dialecte: "Gestion de projet",
    q: "En préparant la recette, tu découvres que ni le contrat de la plateforme ni le lot de l'intégrateur ne prévoient l'archivage des factures électroniques sur la durée légale. Le prochain COPIL est dans 5 semaines. Que fais-tu ?",
    choix: [
      "Tu préviens le DAF aujourd'hui, avec les faits",
      "Tu l'ajoutes à l'ordre du jour du prochain COPIL",
      "Tu le fais ajouter par l'intégrateur, sans en parler",
      "Tu le notes dans le registre des risques, et c'est tout"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Un risque légal, et sans doute un coût hors budget : le sponsor doit le savoir tout de suite. Tu viens avec les faits et une 1re idée des options.",
      "Non. 5 semaines perdues sur un risque légal : options et budget auraient pu être lancés tout de suite.",
      "Non. Tu engages un coût hors contrat sans le sponsor : c'est lui qui décide du budget, et la facture arrivera quand même.",
      "Non. Noter n'est pas prévenir : le sponsor découvrira trop tard un risque légal que tu connaissais."
    ],
    retenir: "Un risque légal découvert : on prévient le sponsor tout de suite, sans attendre le COPIL."
  },
  {
    id: "cp16-q40",
    dialecte: "Gestion de projet",
    q: "Sophie, comptable clients, est utilisatrice clé pour les avoirs. Elle a manqué un 3e atelier sans prévenir. Après le 2e, tu lui en as parlé : elle avait promis de venir. Que fais-tu ?",
    choix: [
      "Tu lui en reparles, avec encore plus de patience",
      "Tu la préviens, puis tu signales ses absences au DAF",
      "Tu vois sa cheffe, en le disant d'abord à Sophie",
      "Tu testes les avoirs toi-même, sans elle"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Le niveau 1 a été tenté, et elle a promis : une 3e discussion ne changera rien. Tu perds encore un atelier, et les avoirs restent non testés.",
      "Non. Tu sautes la cheffe comptable, qui décide de son temps : le DAF te renverra vers elle, et elle se sentira court-circuitée.",
      "Oui. Niveau 2 : son manager. Sophie a peut-être d'autres urgences imposées, et sa cheffe peut régler ça. Tu préviens Sophie avant : elle n'est pas trahie.",
      "Non. Tu testes à la place du métier : personne de la compta n'aura validé les avoirs."
    ],
    retenir: "La personne a promis et recommence : on passe à son manager, en la prévenant."
  },
  {
    id: "cp16-q41",
    dialecte: "Gestion de projet",
    q: "Les clients de la grande distribution rejettent les factures sans leur numéro de commande. La cheffe comptable veut que l'ADV le saisisse. Le responsable ADV refuse : 2 minutes de plus par commande. Tu les as réunis, options chiffrées en main : toujours bloqué. Le paramétrage part le 15. Que fais-tu ?",
    choix: [
      "Tu organises une 3e réunion pour qu'ils s'entendent",
      "Tu choisis toi-même : l'ADV saisit, c'est logique",
      "Tu demandes au DAF, le sponsor, de trancher",
      "Tu laisses chacun faire, on verra à la bascule"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Ils ont déjà vu les options et leur coût : une 3e réunion rejouera le même désaccord, et le 15 sera passé.",
      "Non. Qui saisit quoi, c'est l'organisation de deux services : ta décision n'engage ni l'un ni l'autre, et celui qui perd ne l'appliquera pas.",
      "Oui. Deux managers bloqués sur une décision qui n'est pas à toi : le sponsor arbitre, avec tes options chiffrées. Tu préviens les deux avant.",
      "Non. Rien de décidé, ce sont des factures rejetées par les clients après la bascule : trésorerie et relation client touchées."
    ],
    retenir: "Deux managers bloqués, options déjà posées : le sponsor tranche, pas toi, et pas une 3e réunion."
  }
];
