// Chef de projet SI — Questions du module cp17 « Communiquer : le bon message, les mots justes ».
// Deux types mélangés : mises en situation « Que fais-tu ? » (canal, moment, destinataire, copie) et
// « Quelle phrase ? » (4 formulations entre « »).
// Fil rouge DEMAT 2027 (fiche fil rouge de docs/plan-chef-de-projet.md, qui fait foi) : négociant en équipement de piscines,
// ERP Divalto, facture électronique via une plateforme agréée (PA). DAF = sponsor ET manager de la cheffe comptable.
// Calendrier : connecteur au contrat le 1er mars 2027, déclencheur du plan B (portail de la PA) le 15 mars, recette du 16 mars
// à fin avril, pilote en mai, bascule en juin, marge légale juillet-août. Aucun montant d'amende.
// Frontières : cp16 = qui aller voir et quand monter ; cp18 = le fond (faut-il dire non, arbitrer) ; cp26 = manager son équipe.
// Anti-devinette (type « phrase ») : la bonne réponse n'est pas toujours la plus douce. Choix faux des deux côtés :
// trop mou (flou, minimise, excuses, sans date) et trop dur (menace, reproche, jargon, dramatise, copie au patron),
// plus un « presque juste » au même niveau (mauvais public, sans date, sans décision attendue).
// Les mots « décision », « options », « impact », « je recommande », « je préfère te le dire avant », « d'ici » sont aussi
// dans des choix faux. La bonne réponse est la plus ferme dans q13, q30, q31, q33 ; la plus douce dans q06, q22, q28, q42.
LEARNSQL.questions.cp17 = [
  {
    id: "cp17-q01",
    dialecte: "Gestion de projet",
    q: "Le DG te croise : « Où en est la facture électronique ? » Le connecteur de la PA a du retard, mais le plan B sauve la bascule de juin. Le DAF le sait. Que réponds-tu ?",
    choix: [
      "« Le connecteur a du retard ; on teste le mapping Factur-X du portail. »",
      "« Juin tient, grâce au plan B. Coût : du travail en plus en compta. Rien à décider. »",
      "« Pour la compta : 20 minutes de dépôt par jour sur le portail, pendant 6 semaines. »",
      "« C'est tendu : la PA nous lâche, et septembre devient vraiment très risqué. »"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Le DG ne parle pas « mapping » : il repart sans savoir si la date tient, et il ira le demander au DAF.",
      "Oui. Le DG veut la date, le coût, le risque, et savoir s'il doit décider. Ici, rien : en 15 secondes, il est rassuré sur des faits.",
      "Non. Bon message, mauvais public : c'est ce que Sophie doit savoir. Le DG ne sait toujours pas si juin tient.",
      "Non. Tu dramatises : le plan B tient la date. Le DG s'inquiète pour rien, et appelle le DAF en urgence."
    ],
    retenir: "À la direction : la date, le coût, le risque, et s'il y a une décision à prendre."
  },
  {
    id: "cp17-q02",
    dialecte: "Gestion de projet",
    q: "Le plan B démarre : 6 semaines de dépôt des factures clients sur le portail de la PA. Sa cheffe est d'accord. Tu l'expliques à Sophie, comptable clients. Que dis-tu ?",
    choix: [
      "« Le connecteur est KO : on passe en dépôt Factur-X sur le portail de la PA. »",
      "« Le plan B prend du temps à la compta, 6 semaines ; le DAF l'a validé. »",
      "« Rien ne change vraiment pour toi : surtout, ne t'inquiète pas. »",
      "« Pendant 6 semaines, tu déposes chaque facture sur le portail. On te forme mardi. »"
    ],
    bonne: 3,
    pourquoi: [
      "Non. « KO », « Factur-X » : du jargon. Sophie ne sait toujours pas ce qu'elle doit faire lundi matin.",
      "Non. Bon message pour la direction, pas pour elle : elle apprend que ça coûte, sans savoir quoi faire, ni quand.",
      "Non. C'est faux : elle aura une tâche en plus. Le jour où elle le découvre, elle ne te croit plus.",
      "Oui. Pour le métier : ce qui change, combien de temps, et qui l'aide. Elle sait quoi faire lundi."
    ],
    retenir: "Au métier : ce qui change pour lui, quand, combien de temps, et qui l'aide."
  },
  {
    id: "cp17-q03",
    dialecte: "Gestion de projet",
    q: "Depuis mardi, 12 factures AquaBleu sont rejetées en recette. Marc a trouvé le motif : un champ obligatoire est vide. Tu écris au consultant de l'intégrateur. Que lui écris-tu ?",
    choix: [
      "« Le flux AquaBleu ne marche toujours pas : tu peux regarder vite ? »",
      "« 12 rejets AquaBleu depuis mardi : numéro de commande vide. La cause d'ici jeudi ? »",
      "« Enjeu : la date légale. Le DAF attend une décision d'ici peu sur AquaBleu. »",
      "« Encore des rejets depuis mardi : ton paramétrage n'est pas fiable. »"
    ],
    bonne: 1,
    pourquoi: [
      "Non. « Ne marche pas » : il doit tout rechercher lui-même, et perd une journée sur ce que Marc a déjà trouvé.",
      "Oui. Pour le technique : combien, depuis quand, quel motif, pour quand. Il peut chercher tout de suite.",
      "Non. Mauvais public : un technicien a besoin du cas précis, pas de l'enjeu. Et ton message ne lui demande rien.",
      "Non. Tu juges au lieu de décrire : il se défend, et le motif trouvé par Marc n'est même pas dans ton message."
    ],
    retenir: "Au technique : des faits précis (combien, depuis quand, quel motif) et une échéance."
  },
  {
    id: "cp17-q04",
    dialecte: "Gestion de projet",
    q: "Le plan B démarre. Le DAF, la compta et l'intégrateur doivent le savoir aujourd'hui. Que fais-tu ?",
    choix: [
      "Trois messages courts : mêmes faits, un angle par public",
      "Un seul long mail à tous : chacun y prend sa part",
      "Tu préviens le DAF : il fera passer l'info aux autres",
      "Une réunion de 2 h avec tous, le jour même, pour tout expliquer"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Mêmes faits pour tous, mais chacun lit ce qui le concerne : le coût pour le DAF, la tâche pour la compta, la demande précise pour l'intégrateur.",
      "Non. Presque : tout le monde est prévenu, mais chacun lit le début et cherche sa part. Le DAF ne voit pas le coût, l'intégrateur ne voit pas sa date.",
      "Non. Le sponsor n'est pas ton facteur : l'info arrive tard, déformée, et sans les détails dont chacun a besoin.",
      "Non. 2 h pour une info qui tient en 3 messages : tu bloques une dizaine de personnes, et chacune repart sans sa part claire."
    ],
    retenir: "Un même fait, un message par public : mêmes chiffres, angle différent."
  },
  {
    id: "cp17-q05",
    dialecte: "Gestion de projet",
    q: "Chaque vendredi, tu envoies au DAF un rapport de 2 pages. Il ne répond jamais, et te pose des questions dont la réponse y était. Que changes-tu ?",
    choix: [
      "Tu l'envoies aussi au DG, pour être sûr qu'il soit lu",
      "Tu arrêtes le rapport : il n'en a visiblement pas besoin",
      "Tu ajoutes un résumé d'une page à la fin du rapport",
      "Tu mets en tête 5 lignes : dates, risques, décisions"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Le DG en copie pour forcer la lecture : le DAF le vit comme un contournement, et le rapport reste trop long.",
      "Non. Plus aucune trace : le jour où un risque arrive, le DAF dira qu'il n'était pas informé.",
      "Non. Presque : un résumé aide, mais placé à la fin, personne ne le lit. L'essentiel va en tête.",
      "Oui. Le DAF lit le début : les dates, les risques et ce qu'il doit décider. Le détail reste dessous, pour qui le veut."
    ],
    retenir: "Pour la direction, l'essentiel en tête : dates, risques, décisions attendues."
  },
  {
    id: "cp17-q06",
    dialecte: "Gestion de projet",
    q: "La cheffe comptable te dit, tendue : « Je suis sûre qu'on va tout rater en septembre. » Que réponds-tu ?",
    choix: [
      "« Ce risque est au registre : probabilité 2, impact 2. Il est bien suivi, rassure-toi. »",
      "« Qu'est-ce qui t'inquiète le plus ? On regarde ensemble les cas qui comptent. »",
      "« Si tu avais lu le planning, tu saurais que tout est déjà prévu. »",
      "« Je comprends. On verra bien en septembre, de toute façon. »"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Le langage du chef de projet n'est pas le sien : « probabilité 2 » ne la rassure pas, et tu n'as pas écouté.",
      "Oui. Tu écoutes d'abord, puis tu passes au concret, sur son terrain : les cas qui ne doivent pas casser.",
      "Non. Tu lui reproches de ne pas lire : elle se ferme, et tu perds une alliée clé de la recette.",
      "Non. Tu partages sa peur sans rien proposer : elle repart aussi inquiète, et elle le dira à son équipe."
    ],
    retenir: "Face à une inquiétude du métier : écouter, puis du concret, sur son terrain."
  },
  {
    id: "cp17-q07",
    dialecte: "Gestion de projet",
    q: "Tu écris au DAF : il doit choisir d'appliquer ou non les pénalités de retard prévues au contrat de la PA. Il ne lit que le début des mails. Quelle 1re ligne ?",
    choix: [
      "« Pour faire suite à nos échanges de janvier, voici l'historique complet. »",
      "« La PA est encore en retard : c'est inadmissible, il faut réagir vite. »",
      "« Décision attendue sur les pénalités de la PA, quand tu pourras. »",
      "« Décision attendue d'ici vendredi : pénalités de la PA, oui ou non ? »"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Il lit l'historique, pas la question : il ne sait pas qu'il doit décider, ni pour quand.",
      "Non. L'émotion avant les faits : le DAF voit ta colère, pas la décision qu'il doit prendre.",
      "Non. Presque : la bonne décision, mais sans date. « Quand tu pourras » devient « jamais » pour un DAF pressé.",
      "Oui. La décision attendue et sa date en 1re ligne : même s'il ne lit que ça, il sait quoi faire."
    ],
    retenir: "1re ligne d'un mail : la décision attendue et sa date."
  },
  {
    id: "cp17-q08",
    dialecte: "Gestion de projet",
    q: "Tu as 10 minutes au COPIL pour faire choisir entre deux plans de rattrapage. Dans quel ordre présentes-tu ?",
    choix: [
      "L'historique du retard, puis les options, puis la question",
      "Les options seulement, sans ton avis, pour rester neutre",
      "Décision attendue, faits, options, ta recommandation",
      "Ta recommandation seule : le COPIL n'a pas le temps d'écouter"
    ],
    bonne: 2,
    pourquoi: [
      "Non. La question arrive à la 9e minute : le COPIL a écouté sans savoir quoi chercher, et n'a plus le temps de trancher.",
      "Non. Presque : les options sont là, mais sans ton avis, le COPIL perd ton expertise. Neutre ne veut pas dire muet : il décide quand même.",
      "Oui. Le COPIL sait dès la 1re phrase ce qu'il doit décider, puis il a de quoi choisir, avec ton avis d'expert.",
      "Non. Sans les options et leur coût, le COPIL ne choisit pas : il valide à l'aveugle, ou il se méfie."
    ],
    retenir: "Ordre : décision attendue, faits, impact, options, recommandation."
  },
  {
    id: "cp17-q09",
    dialecte: "Gestion de projet",
    q: "Tu as présenté au DAF 2 options de plan B, avec leur coût. Il te demande : « Et toi, tu ferais quoi ? » Que réponds-tu ?",
    choix: [
      "« Je recommande B : moins cher, et juin tient. A, si tu veux zéro risque. »",
      "« C'est ta décision, non ? Je préfère ne pas t'influencer. »",
      "« B, évidemment : A n'a aucun sens, je ne comprends même pas qu'on hésite. »",
      "« Je recommande B, mais franchement, les deux se valent à peu près. »"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Un avis clair, avec sa raison, et l'autre option reste ouverte. Le DAF décide, en sachant ce que tu ferais.",
      "Non. Il te demande ton avis d'expert : refuser de le donner, c'est le laisser seul, et ça ressemble à de la peur.",
      "Non. Tu méprises une option que tu as toi-même proposée : il se sent jugé, et doute de tes chiffres.",
      "Non. Presque : une recommandation, mais qui se dément tout de suite. Il ne sait pas pourquoi B."
    ],
    retenir: "Une recommandation : une option, sa raison, et l'autre reste possible."
  },
  {
    id: "cp17-q10",
    dialecte: "Gestion de projet",
    q: "Ton compte rendu d'atelier pour le DAF fait 25 lignes. En ligne 18 : une décision qu'il doit prendre avant vendredi. Que fais-tu avant d'envoyer ?",
    choix: [
      "Tu fais un mail à part, la décision et sa date en objet",
      "Tu passes la décision de la ligne 18 en gras et en rouge",
      "Tu l'envoies tel quel, et tu le relances jeudi",
      "Tu mets le DG en copie, pour être bien sûr que le DAF le lise"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Une décision, un mail, et l'objet dit quoi et pour quand. Le compte rendu part de son côté.",
      "Non. Presque : c'est plus visible, mais la décision reste noyée en ligne 18 d'un compte rendu qu'il ne lira pas jusque-là.",
      "Non. Tu sais déjà qu'il ne la verra pas : ta relance de jeudi arrive à un jour de la date limite.",
      "Non. Le DG n'a rien à faire dans ce mail : le DAF le vit comme une pression, et la décision reste en ligne 18."
    ],
    retenir: "Une décision à prendre mérite son propre mail, avec la date dans l'objet."
  },
  {
    id: "cp17-q11",
    dialecte: "Gestion de projet",
    q: "La recette a 3 semaines de retard. Le DAF te demande : « Quelles sont nos options ? » Que réponds-tu ?",
    choix: [
      "« On renforce, on réduit le périmètre, ou on décale : à toi de voir. »",
      "« A : un intérimaire 3 semaines, environ 6 000 €. B : bascule à mi-juillet. »",
      "« Une seule solution : décaler de 3 semaines. Le reste, c'est du bricolage. »",
      "« Les options ont un fort impact ; je te les détaille au prochain COPIL. »"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Des options sans coût ne se choisissent pas : il ne voit ni le prix ni le risque de chacune.",
      "Oui. Chaque option a son prix : des euros pour A, de la marge légale en moins pour B. Il choisit, ou il te demande ton avis.",
      "Non. Tu choisis à sa place, et tu méprises des options réelles : il se braque, ou doute de toi.",
      "Non. Il demande maintenant, et le COPIL est dans plusieurs semaines : 3 semaines de retard n'attendent pas."
    ],
    retenir: "Une option se présente avec son coût : en euros, en délai, en risque."
  },
  {
    id: "cp17-q12",
    dialecte: "Gestion de projet",
    q: "Mardi, tu découvres que la recette a 2 semaines de retard : la marge de recette ne suffit plus, juin est menacé. Le COPIL est dans 3 semaines. Que fais-tu ?",
    choix: [
      "Tu l'annonces au COPIL, avec un plan complet et bien chiffré",
      "Message Teams au DAF : « petit retard, je gère »",
      "Tu écris le jour même au DAF, puis au DG et à ton DSI",
      "Tu appelles le DAF le jour même, puis tu lui écris 5 lignes"
    ],
    bonne: 3,
    pourquoi: [
      "Non. 3 semaines de silence sur une date menacée : le DAF découvre en séance qu'il aurait pu agir plus tôt.",
      "Non. Presque : le DAF est prévenu le jour même, mais « petit » et « je gère » cachent que juin est menacé. Il ne te croira plus.",
      "Non. Le DG n'a pas à l'apprendre le jour même : tu passes au-dessus du DAF avant qu'il ait pu réagir.",
      "Oui. Le sponsor l'apprend de toi, le jour même, à l'oral. Les 5 lignes tracent les faits, l'impact et ton plan."
    ],
    retenir: "Une mauvaise nouvelle qui menace une date : au sponsor, le jour même, à l'oral puis par écrit."
  },
  {
    id: "cp17-q13",
    dialecte: "Gestion de projet",
    q: "Le 16 mars au matin, le connecteur de la PA n'est toujours pas livré. Tu appelles le DAF. Quelle est ta 1re phrase ?",
    choix: [
      "« Le connecteur n'est pas livré. J'appelle le DG pour qu'il secoue la PA. »",
      "« Mauvaise nouvelle : pas de connecteur. Je lance le plan B ; juin tient. »",
      "« Petit contretemps côté PA, rien d'inquiétant pour l'instant. »",
      "« Le connecteur n'est pas livré. Je te rappelle quand j'en sais plus. »"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Trop fort : le contrat prévoit déjà le plan B, et tu annonces au DAF que tu sautes au DG. Il se sent dépassé, et rien n'avance.",
      "Oui. Tu nommes la mauvaise nouvelle, puis ton plan et l'impact. Le déclencheur du 15 mars est atteint : le plan B prévu au contrat démarre.",
      "Non. « Petit contretemps » cache une date du contrat ratée : le DAF ne réagit pas, et l'apprendra plus tard.",
      "Non. Presque : le fait est dit, sans détour, mais sans plan ni impact. Le DAF raccroche inquiet, sans savoir si juin tient."
    ],
    retenir: "Une mauvaise nouvelle : la nommer, puis ton plan et l'impact."
  },
  {
    id: "cp17-q14",
    dialecte: "Gestion de projet",
    q: "Tu as oublié les avoirs clients dans le plan de recette. Il faut 3 jours de plus, pris sur la marge de recette. Tu l'annonces au DAF. Que dis-tu ?",
    choix: [
      "« L'intégrateur aurait dû voir que les avoirs clients manquaient au plan. »",
      "« Je suis vraiment désolé, j'ai oublié : c'est une faute impardonnable. »",
      "« Mon erreur, désolé : j'ai oublié les avoirs clients. 3 jours, sur la marge. »",
      "« Un oubli a été constaté dans le plan ; 3 jours seront pris sur la marge. »"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Tu reportes ta faute sur un autre : le DAF le verra vite, et ta parole perd du poids.",
      "Non. Trop d'excuses : le DAF doit te rassurer au lieu d'entendre ton plan. Il ne connaît ni l'impact ni la suite.",
      "Oui. Tu dis ton erreur une fois, avec un seul « désolé », puis l'impact et la solution. Le DAF garde confiance.",
      "Non. Presque : l'impact est là, mais la forme passive cache qui s'est trompé. Le DAF le remarque, et se méfie."
    ],
    retenir: "Ton erreur : la dire une fois, simplement, puis l'impact et la solution."
  },
  {
    id: "cp17-q15",
    dialecte: "Gestion de projet",
    q: "Ce matin, tu as appris que la bascule de juin est menacée. Le COPIL a lieu demain. Le DAF, ton sponsor, ne le sait pas encore. Que fais-tu ?",
    choix: [
      "Tu l'appelles aujourd'hui, puis tu le présentes en séance",
      "Tu l'annonces en séance : tous l'apprennent en même temps",
      "Ce soir, un mail à tous les membres du COPIL, pour préparer",
      "Tu retires le point du COPIL, le temps d'y voir plus clair"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Le sponsor n'est jamais surpris en séance : il a le temps d'y penser, et le COPIL décide sur un sujet préparé.",
      "Non. Le sponsor découvre la nouvelle devant tout le monde : il se sent piégé, et défendra moins le projet.",
      "Non. Presque : tu préviens avant la séance, mais le DAF l'apprend par écrit, en même temps que les autres.",
      "Non. Tu caches une menace sur la date au comité qui doit la gérer : un mois perdu, et ta parole avec."
    ],
    retenir: "Le sponsor apprend une mauvaise nouvelle de toi, avant la séance, jamais en public."
  },
  {
    id: "cp17-q16",
    dialecte: "Gestion de projet",
    q: "Vendredi 17 h, 1re semaine du pilote : 6 % de factures rejetées (objectif : moins de 2 %). Cause trouvée, correction lundi. Le DAF est en congé jusqu'à lundi. Que fais-tu ?",
    choix: [
      "Tu appelles le DAF ce soir : lundi, ce serait trop tard",
      "Tu lui écris ce soir faits et cause, et lui demandes de rappeler",
      "Lundi matin, 5 lignes au DAF : faits, cause, solution",
      "Rien d'écrit : tu en parleras au COPIL de fin de mois"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Rien ne se décide ce week-end : la cause est trouvée, la correction est lundi. Tu déranges le sponsor pour rien.",
      "Non. Presque : le bon message, au mauvais moment. Tu demandes à un sponsor en congé de te rappeler pour un problème déjà traité.",
      "Oui. Le problème est compris et traité, sans risque légal ce week-end. Lundi, il a les faits et la suite.",
      "Non. 6 % de rejets en pilote, c'est un écart au critère de succès : le sponsor doit le savoir avant la fin du mois."
    ],
    retenir: "Une mauvaise nouvelle déjà traitée, sans décision à prendre : le prochain jour ouvré suffit."
  },
  {
    id: "cp17-q17",
    dialecte: "Gestion de projet",
    q: "Le DAF a refusé l'intérimaire : la recette fournisseurs dure 3 semaines de plus, avec Julie. Tu préférais l'intérimaire. Tu l'annonces à Julie. Que dis-tu ?",
    choix: [
      "« Le DAF a dit non à l'intérim. Je n'y peux rien : il ne voit pas votre charge. »",
      "« Le DAF a choisi : 3 semaines de recette en plus. Courage, ça va aller ! »",
      "« Je suis désolé, vraiment, je me sens si mal de devoir t'annoncer ça… »",
      "« Le DAF a choisi : 3 semaines de plus. On cale ton planning avec ta cheffe ? »"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Tu critiques le décideur devant Julie : elle perd confiance dans le projet, et le DAF finira par l'apprendre.",
      "Non. Presque : tu portes la décision sans la critiquer, mais « courage » ne dit rien de ce qui change pour elle, ni de sa charge.",
      "Non. Tes excuses parlent de toi : elle doit te consoler, et ne sait toujours pas ce qui change pour elle.",
      "Oui. Tu portes la décision sans la critiquer ni l'enjoliver, et tu passes à ce qui change pour elle, avec sa cheffe."
    ],
    retenir: "Une décision que tu n'as pas choisie : tu la portes, sans la critiquer, et tu passes à la suite."
  },
  {
    id: "cp17-q18",
    dialecte: "Gestion de projet",
    q: "Le DG te demande : « On tiendra le 1er septembre ? » Le test décisif de la PA a lieu jeudi. Avant, tu ne peux pas savoir. Que réponds-tu ?",
    choix: [
      "« Oui, sans problème : le test de jeudi n'est qu'une simple formalité. »",
      "« Impossible à dire, non ? Ça dépend de beaucoup trop de choses. »",
      "« Je ne sais pas encore. Je vous réponds jeudi soir, après le test. »",
      "« Franchement, c'est très mal parti pour le 1er septembre. »"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Tu promets ce que tu ne sais pas : si jeudi tourne mal, le DG ne te croira plus.",
      "Non. Vrai, mais flou : pas de date, pas de suite. Le DG repart inquiet, sans savoir quand il saura.",
      "Oui. « Je ne sais pas » est honnête, s'il vient avec la date de la réponse. Le DG sait quand revenir.",
      "Non. Tu dramatises sans fait : le test n'a pas eu lieu. Le DG s'alarme, et le DAF reçoit un appel inquiet."
    ],
    retenir: "« Je ne sais pas » se dit, avec la date à laquelle tu sauras."
  },
  {
    id: "cp17-q19",
    dialecte: "Gestion de projet",
    q: "À la bascule, les factures EDI d'AquaBleu seront suspendues 2 jours. AquaBleu doit le savoir. Le commercial gère la relation avec ce client. Que fais-tu ?",
    choix: [
      "Tu appelles toi-même l'acheteur d'AquaBleu, sans le commercial",
      "Rien : 2 jours de pause, AquaBleu ne verra rien",
      "Tu préviens le DAF, puis il écrit au directeur d'AquaBleu",
      "Tu donnes au commercial 3 lignes : quoi, quand, qui appeler"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Presque : le client est prévenu, mais pas par celui qui gère la relation. Le commercial l'apprend par son client.",
      "Non. AquaBleu attend ses factures EDI chaque jour : la pause se verra, et le client l'apprendra par surprise.",
      "Non. Le DAF pour 2 jours de pause : trop gros, et ça sonne comme un incident grave chez le client.",
      "Oui. Le commercial porte le message, avec des faits justes. Le client sait quoi attendre, et qui appeler si une facture manque."
    ],
    retenir: "Un message au client passe par celui qui gère la relation, avec 3 lignes de faits."
  },
  {
    id: "cp17-q20",
    dialecte: "Gestion de projet",
    q: "Le DAF a décidé : la bascule passe de juin à mi-juillet. Les 6 personnes de la compta doivent le savoir. Que fais-tu ?",
    choix: [
      "Un mail aux 6, le jour même, pour que ce soit clair",
      "Tu vois la cheffe comptable, puis vous l'annoncez ensemble",
      "Tu attends le COPIL suivant, pour l'annoncer officiellement",
      "Le DAF l'annonce lui-même, puis tu réponds aux questions"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Presque : l'info part vite, mais leur cheffe l'apprend en même temps que son équipe. Elle ne peut pas répondre à leurs questions.",
      "Oui. Leur manager d'abord : elle sait avant son équipe, prépare les questions, et l'annonce passe par elle.",
      "Non. La décision est prise : attendre laisse courir des rumeurs, et l'équipe s'organise sur une fausse date.",
      "Non. Le DAF a tranché, à toi de faire suivre : une annonce venue d'en haut, sans détail, crée plus de questions."
    ],
    retenir: "Une annonce à une équipe passe d'abord par son manager."
  },
  {
    id: "cp17-q21",
    dialecte: "Gestion de projet",
    q: "Ton DSI te demande : « Ça va, DEMAT ? » Le seul consultant qui connaît le paramétrage part 3 semaines en mai, pendant le pilote. Que réponds-tu ?",
    choix: [
      "« Ça va bien : rien de spécial à te signaler aujourd'hui, merci. »",
      "« Un risque : le seul consultant clé part en mai. J'en veux un 2e. Tu m'aides ? »",
      "« Catastrophe : l'intégrateur va nous lâcher en plein pilote, en mai. »",
      "« Oui, sauf un consultant en congé en mai ; on verra bien à ce moment-là. »"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Tu caches un risque à ton responsable : s'il éclate en mai, il découvrira que tu le savais.",
      "Oui. Le risque, ta parade (former un 2e consultant), et ce que tu attends de lui. Ton DSI peut t'aider, s'il le sait.",
      "Non. Tu dramatises : le pilote n'a pas commencé, et il existe une parade. Ton DSI s'inquiète au lieu de t'aider.",
      "Non. Presque : le fait est dit, mais minimisé, sans parade ni demande. Ton DSI ne voit pas le danger."
    ],
    retenir: "À ton DSI aussi : le risque, ta parade, et ce que tu attends de lui."
  },
  {
    id: "cp17-q22",
    dialecte: "Gestion de projet",
    q: "Pendant le pilote, Marc, assistant ADV, vient te voir : « J'ai oublié de reprendre 15 rejets EDI la semaine dernière. » Que lui dis-tu ?",
    choix: [
      "« Merci de me le dire. On les reprend ensemble aujourd'hui ? »",
      "« Tu te rends compte ? 15 factures bloquées, c'est très grave. »",
      "« Bon. Note-le quelque part, on verra ça plus tard. »",
      "« Je dois en parler au responsable ADV. Je préfère te le dire avant. »"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Il vient de lui-même : tu le remercies, puis vous réglez le problème. Il reviendra vers toi à la prochaine erreur.",
      "Non. Tu le punis d'avoir parlé : la prochaine fois, il cachera l'erreur, et tu l'apprendras par le client.",
      "Non. Tu laisses 15 factures bloquées sans suite : le client attend son argent, et Marc comprend que ce n'était pas important.",
      "Non. Il a dit son erreur de lui-même, et elle se règle aujourd'hui : monter à son manager le punit d'avoir été honnête."
    ],
    retenir: "Quelqu'un t'apporte son erreur : merci d'abord, puis la solution ensemble."
  },
  {
    id: "cp17-q23",
    dialecte: "Gestion de projet",
    q: "Le DAF n'a pas tranché le plan B : question courte, date limite passée, relance faite. La date légale est en jeu. Tu le préviens que tu vas monter. Quelle phrase ?",
    choix: [
      "« Sans décision lundi 12 h, je demande au DG d'arbitrer. Je préfère te le dire avant. »",
      "« Je serais dans le regret de devoir escalader ce sujet au DG, sans réponse. »",
      "« Tu ne me laisses pas le choix : je vais voir le DG cette semaine, désolé. »",
      "« Une décision quand tu peux ; sinon, on en reparlera plus tard, pas de souci. »"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Une date, une action, et tu le dis avant : il garde une dernière chance de trancher, et il n'est pas surpris.",
      "Non. Formule floue, ton de menace : il entend un ultimatum, sans savoir quand ni pourquoi.",
      "Non. Un reproche (« tu ne me laisses pas le choix ») : il se défend au lieu de décider, et la relation s'abîme.",
      "Non. Plus de date, plus d'action : il n'a aucune raison de trancher, et la date légale approche."
    ],
    retenir: "Prévenir sans menacer : une date, ce que tu feras, et « je préfère te le dire avant »."
  },
  {
    id: "cp17-q24",
    dialecte: "Gestion de projet",
    q: "Le DAF et ton DSI savent que tu viens. Le DG te reçoit 10 minutes au sujet du plan B. Quelle est ta 1re phrase ?",
    choix: [
      "« Le DAF ne répond plus à mes mails depuis 3 semaines, je suis bloqué. »",
      "« Excusez-moi de vous déranger, ce n'est sans doute pas grand-chose… »",
      "« Décision attendue d'ici mercredi sur le plan B : septembre en jeu. Le DAF est prévenu. »",
      "« Deux options pour le plan B, avec leur coût : laquelle préférez-vous ? »"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Un reproche sur le DAF : le DG défend son directeur, et le sujet devient une affaire de personnes.",
      "Non. Tu minimises un sujet qui menace la date légale : le DG ne comprend pas pourquoi tu es là.",
      "Oui. La décision, sa date, l'enjeu, et « le DAF est prévenu » : le DG comprend en 10 secondes, sans reproche. Puis les options et ta recommandation.",
      "Non. Presque : les options viennent après. Sans l'enjeu ni la date, le DG ne sait pas pourquoi c'est à lui de trancher."
    ],
    retenir: "Chez le DG : la décision attendue, sa date, l'enjeu, « le DAF est prévenu », puis les options."
  },
  {
    id: "cp17-q25",
    dialecte: "Gestion de projet",
    q: "Tu écris au DG pour qu'il arbitre le plan B. Le DAF, ton sponsor, sait depuis lundi que tu le fais. Qui mets-tu en copie ?",
    choix: [
      "Le DAF en copie cachée, pour ne pas le froisser",
      "Personne : tu raconteras la suite au DAF après",
      "Le DAF en copie ; ton DSI est informé avant",
      "Tout le COPIL, pour que chacun soit au courant"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Presque : le DAF voit le mail, mais en cachette. Une copie cachée se découvre toujours, et elle sonne comme un double jeu.",
      "Non. Le DAF ne sait pas ce que tu as écrit de lui au DG : même prévenu, il se méfiera.",
      "Oui. Tout se fait à découvert : le DAF voit ce que tu écris, et ton DSI n'est pas surpris.",
      "Non. Tu exposes devant tout le comité un désaccord avec le sponsor : il le vit comme une humiliation."
    ],
    retenir: "Escalade par écrit : le niveau dépassé en copie, à découvert ; jamais en copie cachée."
  },
  {
    id: "cp17-q26",
    dialecte: "Gestion de projet",
    q: "Le 1er mars, la PA n'a pas livré le connecteur prévu au contrat. Son chef de projet promet « très bientôt ». Le plan B se déclenche le 15. Que lui dis-tu ?",
    choix: [
      "« Il me faut une date ferme. Sans livraison le 15, je lance le plan B. »",
      "« Ce n'est pas grave si ça glisse un peu : on s'adaptera, comme toujours. »",
      "« Si vous ratez le 15, on résilie, et vous payez des pénalités. »",
      "« Vous êtes encore en retard ? Ce n'est pas sérieux, comme d'habitude. »"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Une demande claire, et ce qui se passera le 15, déjà prévu au contrat : c'est un fait, pas une menace.",
      "Non. Tu lui dis que la date ne compte pas : « très bientôt » deviendra avril, et ta recette fond.",
      "Non. Une menace, hors de ton pouvoir : résilier ou appliquer des pénalités, c'est au DAF de le décider. La PA le sait, et ne te croit plus.",
      "Non. Un reproche général : il se défend, et ne te donne toujours pas de date."
    ],
    retenir: "Avec un prestataire, le contrat parle : une date ferme, et ce qui se passe sinon."
  },
  {
    id: "cp17-q27",
    dialecte: "Gestion de projet",
    q: "Marc, assistant ADV, a refusé tes 2 propositions de créneaux de test. Tu vas en parler à son chef, le responsable ADV. Que dis-tu d'abord à Marc ?",
    choix: [
      "« Ce n'est pas grave : je trouverai bien une autre solution, sans toi. »",
      "« Si tu ne viens pas, je serai obligé de le signaler à ton chef. »",
      "« J'en parle à ton chef : c'est lui qui gère ton temps. Je préfère te le dire avant. »",
      "« Je vais voir ton chef : tu ne me laisses vraiment pas le choix. »"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Tu renonces, et c'est faux : sans Marc, l'ADV ne sera pas testée. Le problème reste entier.",
      "Non. Une menace (« je serai obligé ») : il se braque, et vit ta visite à son chef comme une sanction.",
      "Oui. Tu dis pourquoi tu montes (son chef décide de son temps), et tu le dis avant : ce n'est pas une sanction.",
      "Non. Presque : bonne action, mauvais mots. Le reproche transforme une démarche normale en punition."
    ],
    retenir: "Prévenir la personne qu'on monte : la raison, sans reproche, et avant."
  },
  {
    id: "cp17-q28",
    dialecte: "Gestion de projet",
    q: "La cheffe comptable a refusé tes 2 propositions pour la recette de Julie. Pour toi, le DAF doit trancher. Que dis-tu d'abord à la cheffe comptable ?",
    choix: [
      "« Puisque tu bloques tout, je vais voir directement ton patron, le DAF. »",
      "« On n'est pas d'accord, c'est normal. On va voir le DAF ensemble ? »",
      "« Bon, tant pis : on fera la recette sans Julie, alors. »",
      "« Je vais demander au DAF de te rappeler l'enjeu du projet. »"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Tu l'accuses (« tu bloques tout ») : elle arrive chez le DAF en défense, et tu perds une alliée.",
      "Oui. Le désaccord devient un sujet à trancher, pas une faute : vous allez voir l'arbitre ensemble, chacun avec ses arguments.",
      "Non. Tu renonces : sans Julie, la recette fournisseurs n'est pas faite par le métier, et les erreurs sortiront après la bascule.",
      "Non. Tu fais du DAF une arme contre elle : elle se sent rappelée à l'ordre, et le désaccord n'est même pas posé."
    ],
    retenir: "Avant de monter, présente le désaccord comme un sujet à trancher, si possible ensemble."
  },
  {
    id: "cp17-q29",
    dialecte: "Gestion de projet",
    q: "Le chef de projet de la PA a raté le 1er mars, puis le 15. Tu l'as prévenu. Tu écris à son responsable de compte. Quelle est ta 1re phrase ?",
    choix: [
      "« Désolé de vous solliciter : nous avons peut-être un petit souci de calendrier. »",
      "« Nous déclenchons les pénalités et étudions la résiliation du contrat. »",
      "« Votre chef de projet n'est pas à la hauteur : je demande qu'il soit remplacé. »",
      "« Deux dates du contrat ratées, le 1er et le 15 mars. Il me faut une date ferme. »"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Tu minimises deux dates ratées : il classe ton mail comme non urgent.",
      "Non. Une menace, hors de ton rôle : pénalités et résiliation, c'est au DAF de le décider. Tu te mets en défaut.",
      "Non. Tu attaques une personne : il la défend, et la livraison n'avance pas.",
      "Oui. Les faits du contrat, puis une demande : il voit la gravité, sans attaque. En parallèle, le DAF est informé et le plan B lancé."
    ],
    retenir: "Chez le responsable d'un prestataire : les faits du contrat et une demande, sans attaque."
  },
  {
    id: "cp17-q30",
    dialecte: "Gestion de projet",
    q: "Il y a 2 semaines, le consultant de l'intégrateur a promis d'annoncer la veille chaque changement de paramétrage. Hier, il a encore tout changé sans prévenir. Que lui dis-tu ?",
    choix: [
      "« Pas grave, on fera avec ; tu essaies de prévenir, si tu peux ? »",
      "« J'écris à ton directeur, avec le DAF en copie, pour que ce soit clair. »",
      "« 2e fois malgré notre accord : j'en parle à ton responsable, je te le dis avant. »",
      "« Je te rappelle notre accord : chaque changement annoncé la veille, OK ? »"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Tu lui dis que l'accord ne compte pas : il recommencera, et Julie perdra d'autres matinées de tests.",
      "Non. Trop fort, et sans prévenir : le DAF en copie pour un sujet de paramétrage, c'est une copie punitive. Il découvre l'escalade par le mail.",
      "Oui. Le fait, puis l'étape suivante, dite avant : ferme, sans insulte. Monter d'un niveau n'est pas une punition (module cp16).",
      "Non. Presque : bon ton, mais même niveau. Il connaît déjà l'accord : le redire une 2e fois ne changera rien."
    ],
    retenir: "Ça recommence après un accord : tu le dis net, et tu montes d'un niveau en prévenant."
  },
  {
    id: "cp17-q31",
    dialecte: "Gestion de projet",
    q: "Le commercial veut un état Divalto des factures rejetées, par client. C'est du confort, hors obligation. L'équipe n'a plus de temps jusqu'à la bascule. Que réponds-tu ?",
    choix: [
      "« Je vais voir avec l'équipe ce qu'on peut faire, d'accord ? »",
      "« Pas avant la bascule : l'équipe est pleine. Je le note pour juillet. »",
      "« Vois avec le DAF : c'est à lui de décider de ce genre d'ajout. »",
      "« Pas avant la bascule. Désolé, je ne peux vraiment rien faire pour toi. »"
    ],
    bonne: 1,
    pourquoi: [
      "Non. « Je vais voir » : il entend oui, et reviendra dans 15 jours chercher son état.",
      "Oui. La demande est bonne, le moment non : tu dis pourquoi, et quand elle sera traitée.",
      "Non. Tu renvoies au sponsor une demande de confort que tu peux traiter : le DAF est dérangé pour rien, et le commercial n'a pas de réponse.",
      "Non. Presque : le non est clair, mais sans « quand ». Son besoin semble enterré, et il ira voir le DAF."
    ],
    retenir: "« Pas maintenant » se dit avec une raison et un « quand »."
  },
  {
    id: "cp17-q32",
    dialecte: "Gestion de projet",
    q: "En COPIL, le DAF, ton sponsor, veut ajouter les notes de frais au projet. Elles sont hors périmètre. Que réponds-tu ?",
    choix: [
      "« Non : c'est hors périmètre, c'est bien écrit dans la note de cadrage. »",
      "« D'accord, on va se débrouiller pour les intégrer au projet. »",
      "« Oui, mais d'ici là, je ne garantis plus rien sur les dates. »",
      "« Possible : environ 10 jours, et bascule à mi-juillet. Tu valides ? »"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Le sponsor peut changer le périmètre : la note de cadrage sert à montrer le prix, pas à lui dire non.",
      "Non. Un oui sans prix : la charge arrive sans délai en plus, et le retard sera le tien.",
      "Non. Une menace floue : il n'a aucun chiffre pour décider, et il entend que tu te couvres.",
      "Oui. « Oui, et voici ce que ça coûte » : le sponsor décide en connaissant le prix, en charge et en délai."
    ],
    retenir: "Au sponsor qui ajoute une demande : « oui, et voici ce que ça coûte »."
  },
  {
    id: "cp17-q33",
    dialecte: "Gestion de projet",
    q: "Le commercial te demande de modifier une facture AquaBleu déjà émise via la PA : « Juste le prix, personne ne verra rien. » Que réponds-tu ?",
    choix: [
      "« Non : une facture émise ne se modifie pas. Sophie fait un avoir. »",
      "« Je demande à l'intégrateur. La facture peut-elle se modifier ? »",
      "« Une facture émise ? Il faudrait voir avec le DAF ce qu'il en pense. »",
      "« D'accord, si ce n'est que le prix ; je préviens Sophie tout de suite. »"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Un non net, une raison (la loi), une solution (un avoir, fait par Sophie, comptable clients). Pas de débat.",
      "Non. Tu laisses croire que c'est possible : l'intégrateur perd du temps, et le commercial attend un oui.",
      "Non. La loi ne dépend pas de l'avis du DAF : tu ouvres un débat qui n'existe pas, et la facture reste fausse.",
      "Non. Une facture émise ne se modifie pas : on la corrige par un avoir. Tu acceptes une faute, pour éviter un non."
    ],
    retenir: "Un non légal se dit net : la raison, puis la solution."
  },
  {
    id: "cp17-q34",
    dialecte: "Gestion de projet",
    q: "En pleine recette, Julie te demande un nouvel état Divalto des factures en attente. Il faut 2 jours de travail, hors projet. Que réponds-tu ?",
    choix: [
      "« Pas pendant la recette. Ouvre un ticket au support : je l'appuie. »",
      "« Oui, bien sûr : je te le fais ce soir, après les tests, pas de souci. »",
      "« Pas pendant la recette, je suis débordé ; on verra plus tard. »",
      "« Ce n'est pas mon rôle : vois ça avec quelqu'un d'autre. »"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Non au moment, pas au besoin : elle a une voie claire (le support), et ton appui.",
      "Non. 2 jours pris sur tes soirées : la recette en souffre, et tout le monde saura que tu dis oui à tout.",
      "Non. Presque : c'est un « pas maintenant », mais sans « quand » ni autre voie. Elle reviendra, ou se sentira ignorée.",
      "Non. Vrai sur le fond, mais sec et sans piste : elle ne sait pas à qui s'adresser, et retient ton refus."
    ],
    retenir: "Dire non à une demande hors projet : une raison et une autre voie."
  },
  {
    id: "cp17-q35",
    dialecte: "Gestion de projet",
    q: "En COPIL, devant tous, le DG veut avancer la bascule de juin à mai. Ton planning n'a pas cette marge. Que réponds-tu en séance ?",
    choix: [
      "« C'est impossible, et je l'avais bien dit dès le cadrage. »",
      "« Mai, c'est sans pilote. Je vous chiffre les options d'ici jeudi. »",
      "« Je recommande de rester en juin : l'impact serait trop fort. »",
      "« Entendu, on va tout faire pour y arriver en mai, comptez sur nous. »"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Un non sec et un reproche, devant tous : le DG perd la face, et il imposera mai pour la reprendre.",
      "Oui. Tu dis le prix tout de suite (pas de pilote), sans dire non, et tu reviens vite avec des options chiffrées. Il décide en connaissant le coût.",
      "Non. Presque : ton avis est clair, mais sans coût ni options, le DG n'a rien pour décider. Il y voit un refus.",
      "Non. Un oui sans prix : tu promets un mois que tu n'as pas, et tu le rateras devant le même COPIL."
    ],
    retenir: "Au DG, en public : le prix tout de suite, les options chiffrées vite, et c'est lui qui décide."
  },
  {
    id: "cp17-q36",
    dialecte: "Gestion de projet",
    q: "Le DAF a refusé le budget d'un 3e atelier de formation ADV. Le responsable ADV y tenait beaucoup. Tu dois le lui dire. Que fais-tu ?",
    choix: [
      "Un message Teams court : « Désolé, refusé par le DAF »",
      "Un mail détaillé des raisons, le DAF en copie pour appuyer",
      "Tu laisses le DAF le lui annoncer : c'est sa décision",
      "Tu vas le voir, avec une autre piste, puis tu écris"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Une déception en une ligne, et le DAF en bouclier : il se sent méprisé.",
      "Non. Presque : tout est expliqué, mais par écrit, et le DAF en copie sonne comme « ce n'est pas moi ». Il se sent mis sous pression.",
      "Non. Tu fuis : c'est ton projet, c'est à toi de porter la décision, même si tu ne l'as pas prise.",
      "Oui. Un refus qui déçoit se dit de vive voix, avec une autre piste (un support écrit, une session courte). Puis l'écrit trace."
    ],
    retenir: "Un refus qui déçoit se dit de vive voix, avec une autre piste, puis s'écrit."
  },
  {
    id: "cp17-q37",
    dialecte: "Gestion de projet",
    q: "Mardi, le consultant de l'intégrateur a changé le paramétrage en recette sans prévenir. Julie a perdu une matinée de tests. C'est la 1re fois. Que fais-tu ?",
    choix: [
      "Rien : c'est la 1re fois, tu notes juste la date",
      "Tu réponds à tous sur le fil du projet, pour que ça cesse",
      "Tu l'appelles 10 minutes, puis tu lui écris 2 lignes",
      "Tu écris à son responsable, puis au DAF, faits en main"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Sans rien dire, il recommencera : Julie perdra d'autres matinées, et sa cheffe te le reprochera.",
      "Non. Presque : tu réagis vite, mais en public. Il perd la face, se défend devant tous, et la relation se tend.",
      "Oui. En privé, à l'oral : faits, impact, demande. Les 2 lignes écrites gardent la trace de ce qui est convenu.",
      "Non. 1re fois : tu sautes la personne, et le DAF n'a pas à s'en mêler. Il se sent dénoncé, et tu brûles des étapes."
    ],
    retenir: "Recadrer : en privé, à l'oral d'abord, puis une trace courte."
  },
  {
    id: "cp17-q38",
    dialecte: "Gestion de projet",
    q: "Marc, utilisateur clé ADV, teste sans noter ses anomalies. Hier, il en a vu 4, sans en noter une seule. Tu lui en parles en privé. Quelle phrase ?",
    choix: [
      "« L'impact sur la recette est fort : il faudra être plus rigoureux. »",
      "« Tu ne notes jamais rien ? Franchement, ce n'est pas sérieux du tout. »",
      "« Hier, 4 anomalies vues, 0 notée : rien ne sera corrigé. Tu peux les noter ? »",
      "« Pas grave, je vais noter tes anomalies moi-même, ne t'en fais pas. »"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Presque : l'impact est dit, mais sans fait ni demande précise. « Plus rigoureux » ne lui dit pas quoi faire.",
      "Non. « Jamais » et « pas sérieux » jugent la personne : il se défend, et ne change rien.",
      "Oui. Un fait précis, son impact, une demande, puis une question : il comprend, et il peut répondre.",
      "Non. Tu fais à sa place : il ne saura pas pourquoi c'est important, et tu deviens son secrétaire."
    ],
    retenir: "Recadrer : un fait précis, son impact, une demande claire."
  },
  {
    id: "cp17-q39",
    dialecte: "Gestion de projet",
    q: "En COPIL, devant la cheffe comptable, le commercial lance : « Si on est en retard, c'est que la compta traîne. » Le retard vient des rejets EDI. Que dis-tu ?",
    choix: [
      "« Restons sur les faits : la cause, ce sont les rejets EDI. »",
      "« Tu dis n'importe quoi, les faits le prouvent : ce sont les rejets EDI. »",
      "« Je note ta remarque ; on en reparlera après la réunion, d'accord ? »",
      "« Le retard, c'est un peu la faute de tout le monde ; avançons. »"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Tu corriges sur les faits, sans attaquer personne : la compta est défendue, et le COPIL revient au sujet.",
      "Non. Le fond est juste, mais tu l'attaques en public : il se défend, et le COPIL tourne au règlement de comptes.",
      "Non. Presque : tu évites le clash, mais l'accusation reste sans réponse devant tous. La cheffe comptable se sent lâchée.",
      "Non. Tu laisses croire que la compta a sa part : c'est faux, et elle s'en souviendra."
    ],
    retenir: "En réunion, on recadre sur les faits, pas sur la personne."
  },
  {
    id: "cp17-q40",
    dialecte: "Gestion de projet",
    q: "En point projet, le chef de projet de la PA et le consultant de l'intégrateur se renvoient la faute des rejets. Le ton monte. Tu animes. Que dis-tu ?",
    choix: [
      "« Arrêtez de vous renvoyer la balle, franchement, c'est ridicule. »",
      "« Vous avez sûrement raison tous les deux ; calmons-nous un peu, s'il vous plaît. »",
      "« On en fera un point au COPIL, et le DAF tranchera entre vous. »",
      "« On cherche la cause, pas un coupable : qui teste quoi, et quand ? »"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Tu les humilies tous les deux : ils se liguent contre toi, et la cause n'est toujours pas trouvée.",
      "Non. Tu calmes sans avancer : personne ne cherche la cause, et la dispute reprendra au prochain point.",
      "Non. Le DAF n'a pas à trancher un diagnostic technique : des tests le font. Tu perds un mois.",
      "Oui. Tu ramènes au problème et à des actions datées : chacun a une tâche, et personne ne perd la face."
    ],
    retenir: "Quand on cherche un coupable, ramène à la cause et à des actions datées."
  },
  {
    id: "cp17-q41",
    dialecte: "Gestion de projet",
    q: "Le commercial a promis à AquaBleu « tout automatique dès mai ». Or AquaBleu n'est pas dans le pilote de mai. Tu lui en parles en tête-à-tête. Que dis-tu ?",
    choix: [
      "« Bon, on va essayer de tenir ta promesse à AquaBleu, je verrai. »",
      "« Je signale tout de suite au DAF ta promesse hors pilote, désolé. »",
      "« AquaBleu n'est pas dans le pilote. On leur redit ensemble la date ? »",
      "« Tu n'avais pas à promettre ça : c'est vraiment n'importe quoi. »"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Tu promets à ton tour de tenir l'intenable : AquaBleu sera déçu en mai, et c'est toi qu'on blâmera.",
      "Non. 1re fois, et ça se règle entre vous : passer par le DAF le braque, et AquaBleu n'est toujours pas prévenu.",
      "Oui. Le fait, puis une solution commune : il garde la face devant son client, et le client a la vraie date.",
      "Non. Tu le juges : il défendra sa promesse au lieu de la corriger, et le client attend toujours."
    ],
    retenir: "Recadrer : le fait, puis une solution à construire ensemble."
  },
  {
    id: "cp17-q42",
    dialecte: "Gestion de projet",
    q: "Hier, Sophie a coché 10 cas de test « OK ». Pour 6 d'entre eux, tu ne trouves aucune facture dans Divalto. Tu lui en parles en privé. Quelle est ta 1re phrase ?",
    choix: [
      "« Tu as coché sans créer une seule facture : ce n'est pas honnête. »",
      "« Bon. Je reprends ces 6 cas moi-même, ne t'en occupe plus. »",
      "« Ta cheffe devra revoir tes cas. Je préfère te le dire avant, Sophie. »",
      "« Sur 6 cas cochés, je ne vois pas de facture. Tu me montres ? »"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Tu l'accuses sans savoir : elle a peut-être testé dans un autre dossier. Elle se ferme, et tu as peut-être tort.",
      "Non. Tu fais la recette à sa place, sans comprendre : rien n'est validé par le métier, et si elle avait une raison, tu ne la sauras jamais.",
      "Non. Presque : tu préviens avant, mais tu montes chez sa cheffe sans même avoir écouté Sophie. Elle se sent jugée.",
      "Oui. Le fait, puis une question ouverte : tu n'accuses pas, et tu apprends peut-être une raison que tu ignorais."
    ],
    retenir: "Un doute sur le travail de quelqu'un : le fait, puis une question, avant toute conclusion."
  },
  {
    id: "cp17-q43",
    dialecte: "Gestion de projet",
    q: "18 h. La cheffe comptable t'écrit sur Teams : « Encore un bug ? Franchement, ce projet… » Elle est agacée. Que fais-tu ?",
    choix: [
      "Tu réponds sur Teams : « On en parle lundi, au point »",
      "Tu réponds point par point sur Teams, preuves à l'appui",
      "Tu l'appelles : 10 minutes de vive voix",
      "Tu transfères son message au DAF, son manager"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Presque : tu restes calme, mais tu la laisses ruminer jusqu'à lundi, et le malaise grossit.",
      "Non. Par écrit, chaque argument sonne comme une attaque : elle répondra point par point, et le ton monte.",
      "Oui. La tension se règle à l'oral : tu entends ce qui l'inquiète, et l'agacement retombe.",
      "Non. Tu fais remonter un moment d'humeur à son patron : elle le vivra comme une dénonciation."
    ],
    retenir: "Le ton monte à l'écrit : on passe à l'oral."
  },
  {
    id: "cp17-q44",
    dialecte: "Gestion de projet",
    q: "Le chef de projet de la PA écrit à tous, DAF en copie : « Le retard vient de votre Divalto. » Les logs prouvent le contraire. Que fais-tu ?",
    choix: [
      "Tu l'appelles, puis tu réponds à tous en 3 lignes factuelles",
      "Tu réponds à tous, point par point, logs en pièce jointe",
      "Tu ne réponds pas aujourd'hui : le DAF se fera son idée",
      "Tu écris à son responsable, faits en main, et exiges des excuses"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. L'appel apaise, et permet souvent de corriger ensemble. Puis 3 lignes à tous : le DAF a les faits, sans polémique.",
      "Non. Presque : les faits sont là, mais une longue réponse publique lance une guerre de mails. Il répondra point par point.",
      "Non. Le DAF garde une info fausse : il pense que le problème vient de chez vous.",
      "Non. Exiger des excuses chez son chef pour un mail : tu fais d'un désaccord technique une affaire personnelle."
    ],
    retenir: "Une accusation par écrit : on appelle d'abord, puis on rétablit les faits en 3 lignes."
  },
  {
    id: "cp17-q45",
    dialecte: "Gestion de projet",
    q: "Aujourd'hui, à l'oral, tu as recadré le chef de projet de la PA : ses livraisons arrivent sans note de version. Il a accepté d'en joindre une. Que fais-tu ensuite ?",
    choix: [
      "Un mail formel, avec le DAF et son responsable de compte en copie",
      "Rien par écrit, pour garder la bonne ambiance entre vous",
      "Un message dans le groupe Teams du projet, pour tous",
      "2 lignes, à lui seul : « Comme convenu : une note par livraison »"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Copie punitive : il a accepté, et tu le traites en fautif devant son chef et ton sponsor.",
      "Non. Sans trace, l'accord s'oublie : s'il recommence, tu ne pourras rien montrer à son responsable.",
      "Non. Presque : il y a une trace, mais publique. Tu rends public un recadrage fait en privé : il perd la face.",
      "Oui. Une trace courte, sans reproche, de ce qui est convenu. S'il recommence, tu as un appui."
    ],
    retenir: "Après un recadrage oral : deux lignes écrites, sans reproche, à la seule personne."
  },
  {
    id: "cp17-q46",
    dialecte: "Gestion de projet",
    q: "Le responsable ADV doit choisir, avant le 20, les 3 clients EDI du pilote. Tu lui écris. Quel objet mets-tu ?",
    choix: [
      "« DEMAT 2027 : point d'avancement et questions diverses »",
      "« Choix des clients EDI du pilote : décision attendue d'ici peu »",
      "« Pour choix avant le 20 : les 3 clients EDI du pilote »",
      "« URGENT !!! Réponse attendue de ta part, merci d'avance »"
    ],
    bonne: 2,
    pourquoi: [
      "Non. L'objet ne dit ni quoi ni pour quand : le mail se perd parmi les autres.",
      "Non. Presque : la demande est là, mais « d'ici peu » n'est pas une date. Le mail attendra, et le 20 passera.",
      "Oui. L'objet dit la demande et la date : sans ouvrir le mail, il sait ce que tu attends, et pour quand.",
      "Non. « URGENT » sans sujet stresse sans informer : il ne sait pas de quoi il s'agit."
    ],
    retenir: "Objet d'un mail : la demande et sa date."
  },
  {
    id: "cp17-q47",
    dialecte: "Gestion de projet",
    q: "Le COPIL vient de finir : 2 décisions, 5 actions, 1 point ouvert. Que contient ton compte rendu ?",
    choix: [
      "Le récit de la séance, dans l'ordre des échanges",
      "Les slides du COPIL : tout y est déjà, inutile de réécrire",
      "Décisions, actions (qui, quoi, quand), point ouvert : sous 24 h",
      "Décisions, actions et point ouvert, envoyés avec le prochain ordre du jour"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Un récit se lit mal : les décisions se perdent au milieu, et chacun y lit ce qu'il veut.",
      "Non. Les slides montrent ce qui était prévu, pas ce qui a été décidé en séance.",
      "Oui. Ce qui a été décidé, qui fait quoi pour quand, ce qui reste ouvert, et vite : chacun peut corriger tant que c'est frais.",
      "Non. Presque : bon contenu, mais un mois plus tard. Les actions n'ont pas démarré, et personne ne se souvient de la décision exacte."
    ],
    retenir: "Compte rendu : décisions, actions (qui, quoi, quand), points ouverts, envoyé sous 24 h."
  },
  {
    id: "cp17-q48",
    dialecte: "Gestion de projet",
    q: "Julie a 2 jours de retard sur ses cas de test. C'est la 1re fois. Il faut fixer une nouvelle date. Que fais-tu ?",
    choix: [
      "Tu lui écris, sa cheffe en copie « pour info »",
      "Tu lui écris, le DAF en copie, en tant que sponsor",
      "Rien : elle sait déjà qu'elle est en retard",
      "Tu lui écris à elle seule, sans copie"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Copie punitive : pour 2 jours de retard, Julie y lit « je te dénonce à ta cheffe ». Elle se braque.",
      "Non. Le sponsor pour 2 jours de retard d'une seule personne : disproportionné, et Julie se sent accusée.",
      "Non. Sans nouvelle date, le retard glisse en silence : 2 jours deviennent une semaine, et ta recette avec.",
      "Oui. 1re fois, petit retard : ça se règle entre vous. Si ça recommence, tu verras sa cheffe, en le disant à Julie."
    ],
    retenir: "En copie, seulement ceux qui doivent savoir ; jamais pour mettre la pression."
  },
  {
    id: "cp17-q49",
    dialecte: "Gestion de projet",
    q: "Sur Teams, le responsable ADV accepte de libérer Marc le mardi et le jeudi matin, pendant 3 semaines. Que fais-tu ?",
    choix: [
      "Un mail court « comme convenu », créneaux en agenda",
      "Rien : c'est écrit sur Teams, ça suffit largement",
      "Tu lui fais signer un engagement formel de 3 semaines",
      "Tu confirmes par mail, le DAF en copie pour sécuriser"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Une trace simple de l'accord, et des créneaux bloqués : Marc et son chef ne seront pas surpris.",
      "Non. Un message Teams se perd dans le fil : dans 3 semaines, personne ne le retrouvera.",
      "Non. Trop lourd pour un accord simple : il se sent soupçonné, et la confiance baisse.",
      "Non. Presque : la trace est là, mais le DAF en copie sonne comme une pression. Il n'a pas à valider cet accord."
    ],
    retenir: "Un accord pris à l'oral ou sur Teams se confirme par un mail court, sans copie inutile."
  },
  {
    id: "cp17-q50",
    dialecte: "Gestion de projet",
    q: "La cheffe comptable devait te rendre lundi le PV de recette signé. On est jeudi. Le pilote démarre lundi prochain. Tu la relances. Quelle phrase ?",
    choix: [
      "« Je n'ai toujours pas ton PV, comme d'habitude avec la compta. »",
      "« Il me faut le PV vendredi 12 h, pour le pilote. Un souci ? »",
      "« Petite relance pour le pilote, quand tu auras un moment. »",
      "« Relance n°2 : merci de me retourner le PV signé au plus vite. »"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Un reproche qui vise toute la compta : elle se défend, et le PV n'avance pas.",
      "Oui. La date, la raison, et une question : tu proposes ton aide au lieu d'accuser.",
      "Non. Trop doux : « quand tu auras un moment » dit que ce n'est pas urgent. Le PV reste sous la pile, et le pilote attend.",
      "Non. Presque : la relance est claire, mais sans date ni raison. « Au plus vite » ne dit pas quand."
    ],
    retenir: "Relancer : la date, la raison, et une question, sans reproche."
  }
];
