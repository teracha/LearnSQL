// Chef de projet SI — Questions du module cp26 « Manager une équipe ».
// Fond (pratiques reconnues de management en PME / ETI ; PMBOK, domaine « ressources » : acquérir, développer, diriger
// l'équipe ; repères : le point individuel d'A. Grove, le leadership situationnel de Hersey et Blanchard, la délégation par
// niveaux, les objectifs SMART, le feedback SBI et la critique du « sandwich », le désaccord sur une tâche n'est pas un
// conflit de personnes, les entretiens de recrutement structurés, l'intégration planifiée, le « facteur camion ») :
// prendre son poste (écouter avant de changer ; le candidat qui n'a pas eu le poste l'apprend en privé, avant les autres,
// par celui qui a décidé ; anciens collègues : même relation, mêmes règles, confidentialité) ; les rituels de la fiche (le
// lundi à 9 h, 30 minutes ; un point individuel de 30 minutes toutes les 2 semaines, son ordre du jour d'abord) ; déléguer
// (quoi, à qui, 3 niveaux d'autonomie ; au 1er souci on aide, on ne reprend pas ; une erreur répétée sur un risque fort :
// un niveau de moins ; ce qui ne se délègue pas : entretiens, feedback, recadrage) ; tes 2 chefs de projet (piloter, faire
// faire, t'alerter d'abord, pas de surprise) ; des objectifs mesurables, dans la main de la personne ; un chiffre pousse à
// faire ce qu'il mesure ; l'entretien annuel (règle de l'entreprise, janvier, critères connus d'avance, sans surprise) ;
// l'entretien de parcours professionnel (la loi, telle que la fiche la donne) ; la RH en cas de doute sur une règle du
// travail ; le feedback (tôt, des faits, l'impact, une demande ; le positif aussi) ; recadrer tout de suite, seul à seul ;
// un écart grave s'arrête sur-le-champ ; performance insuffisante : un plan écrit, la RH en conseil ; conflit : chacun,
// puis les deux ensemble, une règle écrite ; un avis rapporté se vérifie ; un désaccord franc n'est pas un conflit ;
// l'usure (signaux, alléger vraiment) ; le run (environ 60 %) qui déborde : les chiffres et des options à ton DSI ;
// recruter (le besoin d'abord, la fiche de poste, des entretiens structurés), intégrer, un départ (dit vite, le jour
// choisi avec la personne ; un binôme sur les vrais cas, une doc testée ; tu ne reprends pas le sujet toi-même), faire
// grandir (un plan écrit, pas une promesse ; un appui). Les pratiques divergent (rythme du point individuel, évaluation
// annuelle ou continue, éloge en public ou en privé) : on garde ce que dit la fiche.
// Fil rouge DEMAT 2027 et cadre « Tu es DSI adjoint » (fiche fil rouge de docs/plan-chef-de-projet.md, qui fait foi),
// ligne « Manager l'équipe (module cp26) » : rituels (q06 à q08), entretiens annuels en janvier et critères connus
// d'avance (q12, q17 à q20), règle de l'entreprise, pas de la loi (q21), entretien de parcours professionnel (q21 à q23,
// q40), en cas de doute sur une règle du travail : la RH (q05). Lignes « Les personnages » (l'équipe de 8 et ses
// prénoms ; Nicolas, candidat au poste : q01, q02 ; la responsable RH conseille les managers : q05, q29, q37, q38),
// « Portefeuille (module cp25) » (run environ 60 % : q34 ; migration de Divalto de janvier à juin 2028, qui glisse de
// 3 mois : q13, q34 ; le WMS après la migration : q34, q41 ; AquaBleu ouvre 2 magasins fin 2027 : q24, comme cp25-q01),
// « Passage en run et clôture » (comité fournisseur avec la PA tenu par le support N2 après 2027, ton DSI en reste
// responsable : q09), « Pilotage des prestataires » (le DAF décide des crédits du SLA ; la PA rate son SLA un mois sur
// deux, comme cp15-q22 : q09), « La réglementation » (les factures EDI passent par la PA : q37), « L'entreprise » (la
// saison des piscines au printemps : q33), « Toi et ton DSI » (pas de surprise, faire faire : q13, q14).
// Faits ajoutés (cohérents avec la fiche et les modules publiés, à valider ; ceux du cours en tête de data/cours/cp26.js) :
// - Nomination : annoncée par le DSI le vendredi 26 novembre 2027, effective au 1er décembre ; l'équipe l'apprend le lundi
//   29 novembre (q01) ; 1re réunion d'équipe le lundi 6 décembre 2027 à 9 h (q06).
// - Théo (N2) tient le comité fournisseur avec la PA dès janvier 2028 (q09). Léa pilote les tableaux Power BI des ventes
//   en 2028, avec Lucas (q16, q20), puis le CRM quand il est retenu (q41, comme la cheffe de projet de cp23-q42). Karim
//   travaille à plein temps sur la migration pilotée par Nicolas (q12) et décide des mises à jour de Divalto, avec un
//   plan de tests (q15). Lucas est l'ancien voisin de bureau de l'élève (q03).
// - Hugo, analyste EDI, quitte l'entreprise fin avril 2029 (annonce en février 2029) ; Théo, en binôme, reprend son savoir
//   (q35, q36) ; sa remplaçante arrive le mercredi 2 mai 2029 (q23, q37 à q39).
// - Novembre 2028 : depuis la migration (en service fin septembre, cp27), le run prend 80 % du temps de l'équipe (q34).
// - Scénarios : Lucas et l'augmentation « pour rire » (q03) ; le déjeuner et les confidences (q04) ; Yann, 4 heures un
//   samedi pour une coupure prévue (q05) ; Karim et Lucas, un écart de chiffres Divalto / Power BI qui allonge la réunion
//   du lundi (q07) ; Yann, l'état de ses 15 tâches au point individuel (q08) ; Léa soumet chaque mail à son sponsor (q10) ;
//   la procédure des rejets EDI du support, 2 jours, Hugo plein jusqu'en mars (q11) ; Nicolas veut faire l'entretien de
//   Karim (q12) ; Nicolas annonce au DSI 3 semaines de retard de la migration (q13) ; Karim, 2 mises à jour sans tests,
//   la facturation arrêtée 2 heures (q15) ; Léa présente au comité de direction (q16) ; objectifs de Yann en janvier 2028
//   (q17) ; Théo, « 30 tickets fermés par semaine », 1 sur 4 rouvert (q18) ; Lucas jugé sur un critère jamais annoncé,
//   janvier 2029 (q19) ; Lucas, 2 états Power BI non testés, chiffres faux au comité de direction, septembre 2028 (q20) ;
//   Samia, « l'entretien annuel, c'est la loi ? », décembre 2028 (q21) ; le brouillon du parcours professionnel de Karim
//   (q22) ; le rapport de Léa parti jeudi au lieu de mardi (q25) ; Lucas, 3 lundis en retard (q26) ; Yann crie sur Samia
//   devant 2 utilisateurs (q27) ; Nicolas : « Léa ne tiendra jamais sa date de juin » (q28) ; Karim, 3 spécifications sur
//   4 incomplètes depuis 4 mois (q29) ; Karim et Hugo : le contrôle des commandes EDI, dans Divalto ou dans l'outil EDI
//   (q30) ; Samia se ferme (q31) ; Samia et Théo ne se parlent plus (q32) ; Théo, mai 2028, mails à 23 h (q33) ; Samia
//   veut devenir N2 (q40).
// Affirmations juridiques : seulement la fiche (entretien de parcours professionnel : loi du 24 octobre 2025, dans la 1re
// année après l'embauche, puis tous les 4 ans, état des lieux tous les 8 ans ; avant, tous les 2 ans ; parcours,
// compétences, formation, pas l'évaluation du travail ; un écrit, copie remise ; l'entretien annuel est une règle de
// l'entreprise) : q21 à q23. Vérifié sur legifrance.gouv.fr le 1er novembre 2026 (loi n° 2025-989, article L6315-1 du
// Code du travail). Générales, non testées comme des faits : le temps de travail a ses règles (la loi, les accords de
// l'entreprise), la RH les vérifie (q05) ; des congés imposés suivent des règles, que la RH vérifie (q33) ; la RH
// conseille, elle ne décide pas à la place du manager (q29). Aucun montant, aucune sanction citée comme un fait, aucune
// durée légale hors de la fiche.
// Déjà publiées ailleurs, pas reprises ici : cp01-q29 (1er écart en production, recadré le jour même, seul à seul),
// cp02-q39 (tes propres signaux d'épuisement), cp02-q41 à q43 (l'équipe qui interrompt ; faits et options ; « ça va » ne
// suffit pas), cp03-q35 à q39 (confier un projet à une junior ; « Que proposes-tu ? » ; l'ancien développeur qui code le
// soir ; une mauvaise nouvelle : merci d'abord ; tu restes le seul expert EDI), cp08-q41 (« je reste vert »), cp09-q43
// (un suppléant au COPIL), cp15-q10 (un consultant en régie géré comme un salarié), cp23-q42 (la cheffe de projet du CRM
// qui fait tout), cp24-q31 et q34 (la revue des accès par chaque manager ; la violation avouée : merci), cp01-q08,
// cp07-q05, q06, q22, cp15-q12 (un seul qui sait, chez un prestataire ou en congé), cp17-q37, q38, q42 (recadrer un
// partenaire), cp18-q17, q26, q35 (conflits comme chef de projet). Voisines, avec un autre angle : q10 et cp03-q36 (ici :
// dire le niveau d'autonomie) ; q13 et cp02-q43 (ici : l'alerte arrive au DSI avant toi) ; q15 et cp01-q29 (ici : 2e fois,
// on baisse l'autonomie d'un niveau) ; q35 et cp07-q22 (ici : un salarié de ton équipe, et la tentation de reprendre
// l'EDI toi-même) ; q25, q26 et cp17-q38, q42 (ici : ton équipe ; le sandwich, la réparation à sa place, la menace par la
// RH) ; q34 et cp25-q17 (ici : le run qui déborde et l'usure, pas une personne rare) ; q11 et cp03-q39 (ici : qui écrit
// la procédure) ; q33 et cp02-q39 (ici : les signaux d'un membre de ton équipe, et c'est toi qui allèges).
// Frontières : ton temps = cp02 ; le rôle attendu = cp03 ; un consultant en régie = cp15 ; diriger sans autorité = cp16 ;
// les mots = cp17 ; les conflits comme chef de projet = cp18 ; la résistance au changement = cp23 ; choisir entre les
// projets = cp25 ; le budget SI annuel, masse salariale comprise = cp27.
// Types : prendre son poste et ses rituels q01 à q08 ; déléguer et tes chefs de projet q09 à q16 ; objectifs et
// entretiens q17 à q23 ; feedback et recadrage q24 à q28 ; situations difficiles q29 à q34 ; recruter, intégrer, un
// départ, faire grandir q35 à q41. Cadres : « Tu es DSI adjoint » 39 questions ; avant la prise de poste (fin novembre
// 2027) 2 questions (q01, q06). Personnes : Nicolas 6, Léa 7, Karim 6, Lucas 6, Hugo 8, Samia 5, Théo 9, Yann 5.
// Anti-devinette (scores.js, sans connaître le sujet) : la bonne réponse est un extrême dans 9 questions sur 27 avec un
// axe d'action (la plus forte qui se justifie : q20, q24, q27, q32, q34 ; la plus douce : q06, q09, q13, q30). Règles du
// module (au plus 1 fois sur 2) : « toujours la RH » 17 % (juste dans q05 et q29, fausse dans q03, q26, q31, q36),
// « toujours en privé / seul à seul » 38 %, « faire soi-même ou reprendre la main » 11 % (juste dans q12, q15),
// « laisser faire, ça va passer » 4 % (juste dans q30), « recadrer fort tout de suite » 8 % (juste dans q27),
// « attendre l'entretien annuel » 0 %. Règles générales (sous 60 %) : la plus petite action réelle 41 %, extrêmes
// écartés + mot de méthode 34 %, + chiffre ou date 32 %, écarter « rien » et le plus fort puis deux actions 36 %, le choix
// à deux actions 36 % (où il y en a), l'action moyenne 30 %, écarter absolus, oui, DAF / COPIL 30 %, toujours le sponsor
// 24 %, la plus longue 23 %, jamais au-dessus du manager 21 %, la plus courte 18 %, la plus forte si urgence 0 % ; un mot
// de méthode 37 %, « puis » 45 %, « , et » 40 % (où il y en a). Forme (forme-tu/mesure.js) : le seul choix sans « Tu »
// bon 2 fois sur 7, le seul en « Tu » bon 1 fois sur 4, le seul avec « ; » 0 sur 2, le seul entre guillemets 0 sur 1 ;
// le point d'interrogation aussi dans des choix faux. « Aujourd'hui », « le jour même », « dès », « Oui », « D'accord »,
// « Non : », « Merci », « puis », la RH, « seul », « tout », « aucun » : aussi dans des bonnes réponses ; chiffres, dates
// et points-virgules aussi dans des choix faux ; un « presque juste » dans 23 questions. Bonne réponse en A/B/C/D :
// 11/10/10/10. Testeur (1er novembre 2026) : « faits » et « ensemble » n'étaient que dans des bonnes réponses (5,5 fois
// sur 6 ; 4 sur 4) : ajoutés dans des choix faux (q09, q12, q13, q15, q16, q20, q27, q29, q41), 1 fois sur 2 au plus ;
// contexte ajouté aux énoncés de q05, q16, q30 ; q34 en novembre 2028 (cp27) ; q29 : rien sur une sanction.
LEARNSQL.questions.cp26 = [
  {
    id: "cp26-q01",
    dialecte: "Gestion de projet",
    q: "Vendredi 26 novembre 2027, ton DSI t'annonce : tu seras DSI adjoint au 1er décembre. Nicolas, chef de projet senior, était candidat. L'équipe l'apprendra lundi 29. Ton DSI te demande comment l'annoncer. Que proposes-tu ?",
    choix: [
      "Qu'il le dise d'abord à Nicolas, seul à seul, avant lundi",
      "Que tu le dises toi-même à Nicolas ce soir, en ami",
      "Que Nicolas l'apprenne lundi, en même temps que l'équipe",
      "Qu'il promette une prime à Nicolas, pour qu'il ne parte pas"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. C'est sa décision : à ton DSI de l'annoncer à Nicolas, en privé, avant les autres, avec ses raisons. Apprendre en réunion qu'on n'a pas eu le poste blesse. Toi, tu le vois dans ta 1re semaine.",
      "Non. Presque : en privé, avant les autres. Mais ce n'est pas ta décision à annoncer : venant de toi, ce soir, elle sonne comme une victoire, et Nicolas ne peut pas en parler à celui qui a choisi.",
      "Non. Il découvrirait devant tous qu'il n'a pas le poste : il se sentirait humilié, et tu commencerais avec un adversaire.",
      "Non. Trop fort : une prime pour acheter son calme ne règle rien, et les autres le sauront. Il lui faut une explication franche, puis de vrais enjeux sur ses projets."
    ],
    retenir: "Le candidat qui n'a pas eu le poste l'apprend en privé, avant les autres, par celui qui a décidé."
  },
  {
    id: "cp26-q02",
    dialecte: "Gestion de projet",
    q: "Tu es DSI adjoint depuis 2 jours. 1er tête-à-tête avec Nicolas, qui était candidat au poste : « Je voulais ce poste. Je ne vais pas faire semblant. » Que lui réponds-tu ?",
    choix: [
      "« Ce n'est pas moi qui ai choisi : vois ça avec le DSI »",
      "« Pour me faire pardonner : tu décideras seul, d'accord ? »",
      "« Si ça ne te convient pas, il faudra en tirer les conséquences »",
      "« Merci de le dire. Je compte sur toi : qu'attends-tu de moi ? »"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Tu esquives : son manager, désormais, c'est toi. Le renvoyer au DSI, c'est lui dire que vous ne parlerez pas de ce qui compte.",
      "Non. Tu achètes la paix en lui cédant tout : plus de limites, plus d'alertes. Il a besoin d'autonomie, pas d'un manager absent.",
      "Non. Trop fort : une menace dès le 1er échange, pour une franchise. Il a dit sa déception ; il n'a pas refusé de travailler.",
      "Oui. Tu reconnais sa déception, sans t'excuser d'avoir le poste. Puis tu parles de la suite : son expertise, ses projets (la migration de Divalto, puis le WMS, le logiciel d'entrepôt), ce qu'il attend de toi."
    ],
    retenir: "Face à l'ancien candidat : reconnaître sa déception, sans t'excuser, puis parler de la suite et de ses attentes."
  },
  {
    id: "cp26-q03",
    dialecte: "Gestion de projet",
    q: "Tu es DSI adjoint. Lucas, ton ancien voisin de bureau, en riant : « Maintenant que tu es chef, tu vas pouvoir m'augmenter ! » Que lui réponds-tu ?",
    choix: [
      "« Ami ou pas, mêmes critères pour tous, au même moment »",
      "« Promis, je pousserai ta demande avant celles des autres »",
      "« Les augmentations, ce n'est pas moi : vois avec la RH »",
      "« Ce genre de blague, c'est fini entre nous, maintenant »"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Avec le sourire, mais clairement : pas de passe-droit pour les anciens collègues. Sa demande suivra le circuit de tous, et c'est toi qui la porteras. L'équipe regarde comment tu traites tes amis.",
      "Non. Une promesse à un ami, avant les autres : un passe-droit. Les autres le sauront, et tu ne pourras peut-être pas la tenir.",
      "Non. Tu te défausses : la RH (ressources humaines) conseille les managers, mais une demande de ton équipe, c'est toi qui la portes, dans le circuit prévu.",
      "Non. Trop fort : tu casses la relation pour une boutade. Tu peux rester proche ; ce qui change, ce sont les règles, les mêmes pour tous."
    ],
    retenir: "D'anciens collègues : la même relation, mais les mêmes règles pour tous. Pas de passe-droit."
  },
  {
    id: "cp26-q04",
    dialecte: "Gestion de projet",
    q: "Tu es DSI adjoint. Au déjeuner, Théo et Yann, tes anciens collègues : « Alors, Lucas s'est fait recadrer ? Allez, entre nous, tu peux bien le dire. » Que fais-tu ?",
    choix: [
      "Tu racontes, mais sans les détails : ce sont des amis",
      "Tu ne déjeunes plus avec eux : un chef garde ses distances",
      "« Non : ce que je vois avec chacun reste confidentiel »",
      "« Bon, et si on parlait d'autre chose ? »"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Même sans détails, tu racontes : Lucas l'apprendra, et plus personne ne te confiera rien. Les amis non plus.",
      "Non. Trop fort : la relation peut rester. Ce qui change, c'est ce que tu en dis. Te couper d'eux, c'est perdre ce qu'on t'aurait dit au déjeuner.",
      "Oui. Tu le dis simplement, une fois, sans gêne : ce qui se dit entre toi et chacun ne se raconte pas. Ils comprennent que ce qu'ils te confient sera protégé aussi. Et le déjeuner continue.",
      "Non. Presque : tu ne dis rien. Mais esquiver se lit comme un oui, et la question reviendra. La règle se dit une fois, simplement."
    ],
    retenir: "Ce qui se dit entre toi et chacun reste confidentiel, même entre anciens collègues ; la relation, elle, peut rester."
  },
  {
    id: "cp26-q05",
    dialecte: "Gestion de projet",
    q: "Tu es DSI adjoint. À ta demande, Yann a travaillé 4 heures samedi, pour une coupure prévue du réseau. Il te demande s'il peut les récupérer, et comment. Tu ne connais pas la règle. Que fais-tu ?",
    choix: [
      "« Oui, prends ton vendredi après-midi, entre nous »",
      "« Je vérifie la règle avec la RH, et je te réponds cette semaine »",
      "« Non : la règle, c'est que les samedis font partie du poste »",
      "« Vois ça avec la RH, et redis-moi ce qu'elle t'a répondu »"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Un arrangement entre vous, hors des règles : un passe-droit que les autres apprendront, et qui peut être faux.",
      "Oui. Le temps de travail a ses règles (la loi, les accords de l'entreprise) : tu ne les inventes pas. La RH te les donne ; toi, tu réponds à Yann, vite, et pareil pour tous.",
      "Non. Tu inventes une règle : le temps de travail a les siennes, que la RH connaît. Si Yann l'apprend, ta parole perd sa valeur.",
      "Non. Presque : la RH a la règle. Mais ces heures, tu les as demandées, et leur récupération s'organise avec toi : à toi d'avoir la réponse, et de la donner, pareil pour tous."
    ],
    retenir: "Un doute sur une règle du travail : tu vérifies avec la RH, puis tu réponds toi-même, pareil pour tous."
  },
  {
    id: "cp26-q06",
    dialecte: "Gestion de projet",
    q: "Fin novembre 2027. Tu prépares ta 1re réunion d'équipe comme DSI adjoint : le lundi 6 décembre, à 9 h. Qu'y mets-tu ?",
    choix: [
      "Ton nouveau plan d'organisation, à appliquer dès le lendemain",
      "Un point d'une heure sur l'avancement de chaque projet",
      "Tu dis comment tu vas travailler : rituels, attentes, les leurs",
      "Le bilan de chacun, ses forces et ses faiblesses, devant toute l'équipe"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Trop tôt, et trop fort : tu changes avant d'avoir écouté. Tu ne sais pas encore ce qui marche, et l'équipe se braque.",
      "Non. Presque : une réunion, oui. Mais l'avancement des projets se suit ailleurs. Ta 1re réunion dit comment vous allez travailler ensemble, et ce que chacun peut attendre de l'autre.",
      "Oui. Une réunion courte : comment tu vas travailler (le lundi à 9 h, un point toutes les 2 semaines), ce que tu attends d'eux, ce qu'ils peuvent attendre de toi. Tu écoutes avant de changer.",
      "Non. Un bilan en public humilie, et tu ne connais pas encore leur travail dans ton nouveau rôle. Un bilan se fait seul à seul, à l'entretien de janvier."
    ],
    retenir: "Une 1re réunion d'équipe : comment tu vas travailler, tes attentes et les leurs. Tu écoutes avant de changer."
  },
  {
    id: "cp26-q07",
    dialecte: "Gestion de projet",
    q: "Tu es DSI adjoint. Depuis un mois, la réunion du lundi 9 h dure une heure : Karim et Lucas y règlent chaque fois un écart de chiffres entre Divalto et Power BI. Les autres décrochent. Que fais-tu ?",
    choix: [
      "Tu tiens les 30 minutes : leur sujet se traite après, à deux",
      "Tu passes la réunion à une heure : on traite ces écarts ensemble",
      "Tu supprimes la réunion, et chacun t'écrit ses blocages",
      "Tu vois Karim et Lucas seuls, pour leur reprocher de bavarder"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. La réunion sert à tous : priorités, blocages, entraide, en 30 minutes. Un sujet de deux personnes se règle après, entre elles. Tu le dis en réunion, pour tous : c'est ton cadre.",
      "Non. Tu installes la dérive : 8 personnes, une heure par semaine, pour un sujet de deux. Les autres décrocheront toujours.",
      "Non. Trop fort : tu perds le seul moment où l'équipe se voit et s'entraide. Le problème, c'est la durée, pas la réunion.",
      "Non. Le cadre de la réunion, c'est à toi de le tenir, en réunion, pour tous. Et ils ne bavardent pas : ils règlent un vrai problème, au mauvais endroit."
    ],
    retenir: "La réunion du lundi : 30 minutes, pour tous ; un sujet de deux personnes se règle après, entre elles."
  },
  {
    id: "cp26-q08",
    dialecte: "Gestion de projet",
    q: "Tu es DSI adjoint. À votre point individuel, Yann te récite l'état de ses 15 tâches, 30 minutes durant. Rien d'autre ne se dit. Que changes-tu ?",
    choix: [
      "Rien : tu sais ainsi où il en est, tâche par tâche",
      "Tu supprimes ce point : un tableau des tâches suffit bien",
      "Les tâches dans l'outil ; ce temps-là est pour lui",
      "Tu passes ce point à une heure ; on y parlera du reste"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Tu suis ses tâches, pas Yann : sa charge, ses blocages, ses envies ne sortent jamais. Et 30 minutes de liste, l'outil les donne en 2.",
      "Non. Trop fort : un tableau dit l'avancement, pas ce qui le gêne ni ce qu'il attend de toi. C'est au point qu'arrivent les alertes et le feedback.",
      "Oui. L'avancement se lit dans l'outil. Le point sert à ce qui ne s'y écrit pas : ses priorités, ses blocages, ses besoins, ton feedback. Son ordre du jour d'abord, puis le tien.",
      "Non. Presque : parler du reste, oui. Mais une heure de plus garde la liste des tâches. C'est le contenu qui change, pas la durée."
    ],
    retenir: "Le point individuel n'est pas un état des tâches : son ordre du jour d'abord (priorités, blocages, besoins), puis le tien."
  },
  {
    id: "cp26-q09",
    dialecte: "Gestion de projet",
    q: "Tu es DSI adjoint. Février 2028. Théo (N2) tient depuis janvier le comité fournisseur avec la PA. Elle rate encore son SLA, et ne donne aucun plan daté. Théo : « Reprends le comité, ils t'écoutent, toi. » Que fais-tu ?",
    choix: [
      "Tu le reprends ; Théo y viendra pour prendre les notes",
      "Vous y allez ensemble, toi assis à côté de lui, pour peser",
      "Tu fais venir le DAF au prochain comité, pour faire peur",
      "Il le garde ; vous préparez ensemble le prochain comité"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Tu reprends au 1er souci : Théo apprend qu'une délégation tient tant que tout va bien. Et un comité de plus chaque mois s'ajoute à ton agenda.",
      "Non. Presque : tu l'aides. Mais à côté de lui, c'est toi que la PA regardera : Théo perd sa place. L'aide se donne avant, en préparant.",
      "Non. Trop fort : le DAF vient pour décider (les crédits du SLA, un avenant), pas pour impressionner. Ici, il manque d'abord une demande claire de plan daté.",
      "Oui. Un 1er souci n'annule pas une délégation. Vous préparez : ses mesures, le plan daté à exiger, le responsable de compte de la PA si l'écart dure (module cp15). Il tient le comité, et il apprend ; ton DSI en reste responsable."
    ],
    retenir: "Au 1er souci, une délégation tient : tu aides à préparer, tu ne reprends pas."
  },
  {
    id: "cp26-q10",
    dialecte: "Gestion de projet",
    q: "Tu es DSI adjoint. Léa, cheffe de projet junior, te soumet chaque mail à son sponsor avant de l'envoyer, même un simple compte rendu. Son projet va bien. Que fais-tu ?",
    choix: [
      "Tu relis chacun, puis tu le corriges : elle apprend ainsi",
      "Tu la félicites de sa prudence, et rien ne change",
      "« Tu es autonome sur tout : ne me montre plus rien »",
      "Tu lui dis ce qu'elle décide seule, et ce qui passe par toi"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Tu deviens son relecteur : elle apprend à attendre ta validation, et chaque mail passe par ton agenda.",
      "Non. Sa prudence te coûte du temps et la freine. Sans limite claire, elle continuera à tout te soumettre.",
      "Non. Trop fort : une date ou le budget, même chez un bon chef de projet, se proposent avant d'être décidés. « Tout », c'est sans limite : le jour d'un vrai risque, tu l'apprendras trop tard.",
      "Oui. Tu fixes son niveau d'autonomie : le courant (un compte rendu, un rappel), elle décide et t'informe ; une date, le budget, elle te propose. Elle sait enfin où est la limite."
    ],
    retenir: "Déléguer, c'est dire le niveau d'autonomie : ce qu'on décide seul, ce qu'on propose avant."
  },
  {
    id: "cp26-q11",
    dialecte: "Gestion de projet",
    q: "Tu es DSI adjoint. La procédure des rejets EDI du support est à refaire : 2 jours de travail. Hugo la connaît par cœur, mais il est plein jusqu'en mars. Théo l'applique chaque jour, au N2. Que fais-tu ?",
    choix: [
      "Tu la confies à Théo, et Hugo la relit en une heure",
      "Hugo la refait en mars ; d'ici là, on garde l'ancienne",
      "Tu la réécris toi-même ce week-end : tu connais l'EDI",
      "Théo la réécrit seul, sans relecture : il l'applique déjà"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Celui qui l'applique chaque jour l'écrit pour de vrai ; l'expert vérifie le fond, en une heure. La procédure sort tôt, et le savoir ne reste plus chez Hugo seul.",
      "Non. Elle attend des mois, et le savoir reste chez une seule personne : le jour où Hugo manque, le support n'a qu'une vieille procédure.",
      "Non. Tu fais le travail de ton équipe, sur ton week-end. La procédure sera la tienne, pas celle de Théo, et c'est toi qu'on appellera.",
      "Non. Presque : la bonne personne pour l'écrire. Mais sans l'œil de l'expert, une erreur de fond passe dans la procédure, et tout le support l'applique."
    ],
    retenir: "Une procédure s'écrit par celui qui l'applique, et l'expert la relit : le savoir se partage."
  },
  {
    id: "cp26-q12",
    dialecte: "Gestion de projet",
    q: "Tu es DSI adjoint. Karim travaille à plein temps sur la migration de Divalto, pilotée par Nicolas. Nicolas : « Je ferai son entretien annuel : je le vois tous les jours. » Que réponds-tu ?",
    choix: [
      "« Je le fais, et je te demande ton avis sur son travail »",
      "« D'accord : tu le connais mieux que moi au quotidien »",
      "« Menons-le ensemble : tu conduis, j'écoute »",
      "« Je le fais seul, sur ses objectifs : ton projet ne compte pas »"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. L'entretien de Karim est à son manager : toi. Il ne se délègue pas. Mais Nicolas voit son travail chaque jour : tu lui demandes des faits avant, et tu en tiens compte.",
      "Non. Tu délègues ce qui est à toi : le bilan, les objectifs, les formations de Karim. Et Nicolas jugerait seul quelqu'un dont il n'est pas le manager.",
      "Non. Presque : tu es là. Mais c'est Nicolas qui conduit : Karim ne sait plus qui est son manager, ni à qui parler de sa suite.",
      "Non. Tu te prives des faits les plus récents : Karim passe tout son temps sur la migration. Son bilan se ferait sans son année."
    ],
    retenir: "L'entretien annuel ne se délègue pas ; celui qui voit la personne travailler donne son avis, avant."
  },
  {
    id: "cp26-q13",
    dialecte: "Gestion de projet",
    q: "Tu es DSI adjoint. Ton DSI : « Nicolas est venu me dire que la migration a 3 semaines de retard. Tu le savais ? » Tu ne le savais pas. Que fais-tu ?",
    choix: [
      "Tu dis à ton DSI de te le renvoyer, sans voir Nicolas",
      "Tu le recadres lundi en réunion, puis tu préviens ton DSI",
      "Tu vois Nicolas aujourd'hui : les faits, puis « à moi d'abord »",
      "Tu vois Nicolas seul : les faits, et plus jamais le DSI en direct"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Presque : ton DSI te le renverra. Mais Nicolas ne sait toujours pas ce que tu attends, ni pourquoi : il recommencera, ou il se taira.",
      "Non. Un recadrage en public braque, et ne dit pas pourquoi il est allé au DSI. D'abord les faits, seul à seul.",
      "Oui. D'abord les faits : le retard, son plan. Puis ce que tu attends, comme ton DSI avec toi : pas de surprise, les alertes d'abord à toi. Et tu cales avec ton DSI qu'il te le renvoie : Nicolas a gardé un vieux réflexe.",
      "Non. Trop fort : Nicolas peut parler au DSI. Ce que tu demandes, c'est que les alertes te parviennent d'abord. L'interdire, c'est le pousser à contourner encore."
    ],
    retenir: "Tes chefs de projet : pas de surprise. Leurs alertes te parviennent d'abord, comme les tiennes à ton DSI."
  },
  {
    id: "cp26-q14",
    dialecte: "Gestion de projet",
    q: "Tu es DSI adjoint. Léa, cheffe de projet junior, à votre point : « Au fond, qu'attends-tu de moi ? » Que lui réponds-tu ?",
    choix: [
      "« Que tu fasses toi-même ce qui presse : on gagne du temps »",
      "« Que tu pilotes, que tu fasses faire, et aucune surprise »",
      "« Que tu me mettes en copie de tous tes mails »",
      "« Que ton projet reste vert, quoi qu'il arrive »"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Faire soi-même, c'est ne plus piloter pendant ce temps : le projet avance sans personne qui regarde la route.",
      "Oui. Ce que ton DSI attendait de toi : piloter (le plan, les risques, des décisions préparées), faire faire, et des alertes tôt. Une mauvaise nouvelle, tu l'apprends par elle, avant les autres.",
      "Non. 50 mails par jour ne t'informent pas : tu ne les liras plus. Ce que tu veux, c'est ce qui coince, et ce qu'elle propose.",
      "Non. Un vert à tout prix fabrique des « pastèques », vertes dehors, rouges dedans (module cp08). Tu préfères un orange tôt, avec un plan."
    ],
    retenir: "Tu attends de tes chefs de projet ce que ton DSI attendait de toi : piloter, faire faire, pas de surprise."
  },
  {
    id: "cp26-q15",
    dialecte: "Gestion de projet",
    q: "Tu es DSI adjoint. Karim décide seul des mises à jour de Divalto, avec un plan de tests. 2e fois ce mois-ci : une mise à jour part sans tests. Hier, la facturation s'est arrêtée 2 heures. Que fais-tu ?",
    choix: [
      "Tu lui redis les faits et la règle des tests, comme la 1re fois",
      "Tu confies toutes les mises à jour à l'intégrateur, dès demain",
      "Tu valides, pour un temps : il te les propose, tests en main",
      "Tu le notes, puis tu en parleras à son entretien annuel"
    ],
    bonne: 2,
    pourquoi: [
      "Non. La 1re fois, le redire suffisait. La 2e, avec la facturation arrêtée, le redire ne change rien : c'est sa marge de décision qui doit changer.",
      "Non. Trop fort : tu retires tout, d'un coup, à ton analyste Divalto, et tu paies l'intégrateur pour ce que Karim sait faire. Baisser d'un niveau suffit.",
      "Oui. Erreur répétée, risque fort : tu baisses son autonomie d'un niveau, pour un temps. Il te propose chaque mise à jour, avec ses tests ; tu valides. Tu lui dis pourquoi et comment la regagner ; tu l'écris.",
      "Non. Janvier, c'est trop tard : il peut recommencer d'ici là, et la facturation s'arrêter encore. Une erreur répétée se traite la semaine même."
    ],
    retenir: "Une erreur qui se répète, sur un risque fort : tu baisses l'autonomie d'un niveau, en disant pourquoi, sans tout reprendre."
  },
  {
    id: "cp26-q16",
    dialecte: "Gestion de projet",
    q: "Tu es DSI adjoint. Ton DSI te confie le point sur les tableaux Power BI des ventes au prochain comité de direction : à toi de l'organiser. Léa, qui pilote ce projet, propose de le présenter elle-même. C'est une 1re. Que réponds-tu ?",
    choix: [
      "« Non : le comité de direction, c'est mon rôle, pas le tien »",
      "« D'accord, on y va ensemble, et je réponds aux questions »",
      "« Vas-y seule, sans préparer : tu connais ton projet »",
      "« D'accord : on prépare ensemble, et c'est toi qui parles »"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Tu gardes ce qu'elle peut faire, et qui la ferait grandir. Le comité y gagne aussi : il entend celle qui pilote.",
      "Non. Presque : elle présente, et tu es là. Mais si tu réponds aux questions à sa place, le comité comprend que ce n'est pas elle qui tient le projet.",
      "Non. Une 1re au comité sans préparation peut mal tourner : une question sur les dates, et elle se trouble. Déléguer, c'est aussi préparer.",
      "Oui. C'est son projet, et une occasion de grandir. Tu l'aides à préparer : la ligne du projet, la décision attendue, les questions probables. Tu en parles à ton DSI. Au comité, c'est elle qui parle."
    ],
    retenir: "Faire grandir : confier ce qui se voit, préparer avec la personne, sans parler à sa place."
  },
  {
    id: "cp26-q17",
    dialecte: "Gestion de projet",
    q: "Tu es DSI adjoint. Janvier 2028, entretien annuel de Yann, l'administrateur réseau. Tu proposes ses objectifs pour l'année. Lequel retiens-tu ?",
    choix: [
      "Zéro panne du réseau en 2028, sur les 3 sites",
      "Renforcer la sécurité du réseau dans le courant de l'année",
      "Restaurer chaque trimestre une sauvegarde de Divalto, et le noter",
      "Faire mieux que l'an dernier sur l'ensemble de ses sujets"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Une panne ne dépend pas que de lui : l'opérateur, le matériel, un câble arraché. Un objectif hors de sa main décourage, ou fait cacher les pannes.",
      "Non. Flou : ni chiffre, ni date précise, ni preuve. En janvier 2029, personne ne pourra dire s'il est atteint.",
      "Oui. Un résultat, une fréquence, une preuve, et c'est dans sa main. Une sauvegarde jamais restaurée n'est qu'un espoir.",
      "Non. Mieux sur quoi, mesuré comment ? Sans chiffre ni source, le bilan sera une impression."
    ],
    retenir: "Un objectif clair : un résultat, un chiffre, une date, une source, et dans la main de la personne."
  },
  {
    id: "cp26-q18",
    dialecte: "Gestion de projet",
    q: "Tu es DSI adjoint. Depuis janvier, l'objectif de Théo (N2) est « 30 tickets fermés par semaine ». Il l'atteint. Mais 1 ticket sur 4 est rouvert la semaine suivante. Que fais-tu ?",
    choix: [
      "Tu le félicites : il tient son objectif chaque semaine",
      "Tu revois l'objectif avec lui : des tickets réglés",
      "Tu le recadres, seul à seul : il ferme pour faire son chiffre",
      "Tu passes l'objectif à 35 tickets, pour le pousser plus"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Tu félicites un chiffre qui fait du tort : 1 ticket sur 4 revient, les utilisateurs rappellent, et le support refait le même travail.",
      "Oui. Le chiffre pousse à fermer vite, pas à régler. Tu changes la mesure avec lui : des tickets réglés, sans réouverture. Ce n'est pas lui qui triche : c'est l'objectif qui était mal posé.",
      "Non. Tu l'accuses d'avoir suivi l'objectif que tu lui as donné. Il a fait ce qu'on mesurait : c'est la mesure qu'il faut changer.",
      "Non. Tu renforces le défaut : il fermera encore plus vite, et les réouvertures monteront."
    ],
    retenir: "Un chiffre pousse à faire ce qu'il mesure : on mesure le résultat (régler), pas l'activité (fermer)."
  },
  {
    id: "cp26-q19",
    dialecte: "Gestion de projet",
    q: "Tu es DSI adjoint. Janvier 2029, entretien annuel de Lucas. Tu veux le juger aussi sur « la relation avec les utilisateurs ». Ce critère n'était ni dans ses objectifs de 2028, ni annoncé. Que fais-tu ?",
    choix: [
      "Tu le juges sur ce critère : la relation compte pour tous",
      "Tu le comptes à moitié sur 2028 ; c'est plus juste",
      "Tu reportes l'entretien et ses objectifs à avril 2029",
      "Tu juges 2028 sur ses objectifs ; le critère, pour 2029"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Le critère est peut-être bon ; s'en servir après coup ne l'est pas. Lucas découvre en janvier qu'il fallait faire autre chose.",
      "Non. Presque : tu sens le problème. Mais à moitié, c'est encore le juger sur une règle qu'il ne connaissait pas.",
      "Non. Trop fort : l'entretien de janvier peut se tenir sur ses objectifs. Le report laisse Lucas sans bilan ni objectifs, des mois durant.",
      "Oui. Les critères sont connus d'avance : on ne juge pas une année sur une règle découverte à la fin. Le nouveau critère entre dans ses objectifs de 2029, expliqué, avec un exemple."
    ],
    retenir: "L'entretien annuel juge sur des critères connus d'avance ; un nouveau critère vaut pour l'année suivante."
  },
  {
    id: "cp26-q20",
    dialecte: "Gestion de projet",
    q: "Tu es DSI adjoint. Septembre 2028. 2 fois, Lucas a publié un état Power BI sans le faire tester par le métier : des chiffres faux sont arrivés au comité de direction. Tu prévois d'en parler à son entretien de janvier. Que fais-tu ?",
    choix: [
      "Tu lui en parles toi-même jeudi : faits, impact, demande",
      "Tu notes les faits pour janvier : l'entretien sert à ça",
      "Léa, sa cheffe de projet, lui parle le jour même, à ta demande",
      "Rien : 2 erreurs, ça peut arriver à tout le monde"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Un comportement qui gêne se dit tôt, à la 1re occasion, seul à seul : les 2 états, les chiffres faux au comité, ce que tu attends (un test par le métier avant chaque publication). En janvier, le bilan ne surprendra personne.",
      "Non. 4 mois d'attente : il recommence sans le savoir, et découvre en janvier un reproche de septembre. L'entretien fait le bilan de ce qui a déjà été dit.",
      "Non. Le feedback et le recadrage ne se délèguent pas : tu es son manager. Léa peut te donner les faits ; c'est toi qui parles à Lucas.",
      "Non. Des chiffres faux au comité de direction : la confiance dans tous les tableaux baisse. Ça se dit, sans attendre."
    ],
    retenir: "Un comportement qui gêne se recadre tout de suite, à la 1re occasion, seul à seul : l'entretien annuel ne garde pas les reproches."
  },
  {
    id: "cp26-q21",
    dialecte: "Gestion de projet",
    q: "Tu es DSI adjoint. Décembre 2028. Samia, au support N1 : « L'entretien annuel de janvier, c'est la loi qui l'impose ? » Que lui réponds-tu ?",
    choix: [
      "« Oui, c'est la règle légale, sinon l'entreprise est sanctionnée »",
      "« Non, c'est notre règle. La loi en impose un autre »",
      "« Oui, et il remplace l'entretien de parcours professionnel »",
      "« Non, et c'est simple : la loi n'impose aucun entretien »"
    ],
    bonne: 1,
    pourquoi: [
      "Non. L'entretien annuel n'est pas imposé par la loi : c'est la règle de l'entreprise. Et on n'annonce pas une sanction sans l'avoir vérifiée.",
      "Oui. L'entretien annuel d'évaluation est une règle de l'entreprise. La loi impose l'entretien de parcours professionnel : son parcours, ses compétences, sa formation, sans évaluer son travail.",
      "Non. Les deux ne se remplacent pas : l'un fait le bilan de l'année (la règle de l'entreprise), l'autre parle du parcours (la loi), sans évaluer.",
      "Non. Presque : l'entretien annuel n'est pas la loi. Mais l'entretien de parcours professionnel, lui, l'est : dans la 1re année après l'embauche, puis tous les 4 ans."
    ],
    retenir: "L'entretien annuel est une règle de l'entreprise ; la loi impose l'entretien de parcours professionnel."
  },
  {
    id: "cp26-q22",
    dialecte: "Gestion de projet",
    q: "Tu es DSI adjoint. Tu prépares l'entretien de parcours professionnel de Karim. Ton brouillon : le bilan de son année, 2 objectifs manqués, ses souhaits de formation. Que corriges-tu ?",
    choix: [
      "Rien : bilan, objectifs, formation, tout y a sa place",
      "Tu retires le bilan et les objectifs",
      "Tu ajoutes à son bilan une note sur 5, pour suivre ses progrès",
      "Tu le fais à l'oral, sans écrit, pour le mettre à l'aise"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Mêler l'évaluation au parcours change l'entretien : Karim défend ses objectifs, et ne parle plus de ce qu'il veut apprendre.",
      "Oui. Cet entretien porte sur son parcours, ses compétences, ses formations, pas sur l'évaluation de son travail : le bilan et les objectifs sont pour l'entretien annuel. Il donne lieu à un écrit, dont Karim reçoit une copie.",
      "Non. Une note, c'est une évaluation : ce n'est pas l'objet de cet entretien, pas plus que le bilan.",
      "Non. Presque : le mettre à l'aise, oui. Mais cet entretien donne lieu à un document écrit, dont une copie est remise à Karim."
    ],
    retenir: "L'entretien de parcours professionnel : le parcours, les compétences, la formation, pas l'évaluation ; un écrit, copie au salarié."
  },
  {
    id: "cp26-q23",
    dialecte: "Gestion de projet",
    q: "Tu es DSI adjoint. Ta nouvelle analyste EDI est arrivée le mercredi 2 mai 2029. Quand a lieu son 1er entretien de parcours professionnel ?",
    choix: [
      "En mai 2031 : cet entretien a lieu tous les 2 ans",
      "En mai 2033, au bout de 4 ans, comme pour toute l'équipe",
      "Dans l'année qui suit, avant mai 2030, puis tous les 4 ans",
      "Seulement si elle demande une formation, un jour ou l'autre"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Tous les 2 ans, c'était l'ancien « entretien professionnel ». Depuis la loi du 24 octobre 2025 : dans l'année qui suit l'embauche, puis tous les 4 ans.",
      "Non. Presque : 4 ans, c'est le rythme ensuite. Le 1er entretien, lui, a lieu dans l'année qui suit l'arrivée.",
      "Oui. La loi (24 octobre 2025) : un 1er entretien dans l'année qui suit l'embauche, puis tous les 4 ans, avec un état des lieux tous les 8 ans. Tu le prévois avec la RH.",
      "Non. La loi l'impose, demande ou pas : tu le prévois, avec la RH."
    ],
    retenir: "L'entretien de parcours professionnel : dans l'année qui suit l'embauche, puis tous les 4 ans."
  },
  {
    id: "cp26-q24",
    dialecte: "Gestion de projet",
    q: "Tu es DSI adjoint. Décembre 2027. Hugo a ajouté aux flux EDI les 2 nouveaux magasins d'AquaBleu : 2 jours de travail, et aucun rejet à la 1re facture. Que fais-tu ?",
    choix: [
      "Rien de spécial : c'est son travail, et il le fait bien",
      "Un « merci » glissé en privé, sans entrer dans le moindre détail",
      "Tu le dis lundi, devant tous : ce qu'il a fait, ce que ça évite",
      "Tu le gardes pour son entretien annuel, en janvier"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Un travail bien fait qu'on ne relève jamais finit par sembler sans valeur. Le positif aussi se dit, et tôt.",
      "Non. Presque : le merci. Mais sans détail, Hugo ne sait pas ce qui a compté. Un feedback positif est aussi précis qu'un recadrage.",
      "Oui. Un feedback positif, précis : 2 magasins ouverts sans un rejet, chez un client qui fait 20 % du chiffre d'affaires. Dit devant l'équipe, il montre aussi ce qui est attendu.",
      "Non. Un mois d'attente, et le moment est passé : un feedback se donne tôt, le positif aussi. L'entretien fera le bilan de ce qui a déjà été dit."
    ],
    retenir: "Le feedback positif aussi : précis, tôt, et il peut se dire devant l'équipe."
  },
  {
    id: "cp26-q25",
    dialecte: "Gestion de projet",
    q: "Tu es DSI adjoint. Le rapport mensuel de Léa est parti jeudi au lieu de mardi. La décision attendue était en page 3 : le sponsor ne l'a pas vue. Tu lui en parles, seule à seule. Que dis-tu ?",
    choix: [
      "« Encore en retard, Léa ? Mardi, c'est mardi, tout le monde le sait »",
      "« Jeudi, pas mardi, et la décision ratée : que s'est-il passé ? »",
      "« Bon rapport ! Juste la décision en page 3, mais bravo »",
      "« Pas grave : jeudi, j'ai refait la page pour le sponsor »"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Un « encore » et un reproche, sans l'impact ni sa raison : elle se défend au lieu de corriger.",
      "Oui. Des faits, l'impact, puis sa parole : elle a peut-être une raison (des chiffres arrivés tard). Ensuite, ta demande : la décision en 1re ligne, et la date tenue.",
      "Non. Le reproche noyé entre deux bravos : elle retiendra les bravos, et la décision restera en page 3.",
      "Non. Tu répares à sa place : elle ne saura pas ce qui n'allait pas, et le mois prochain, tu le referas."
    ],
    retenir: "Un feedback : des faits, l'impact, puis sa raison et ta demande. Ni « encore », ni bravos qui noient le message, ni réparation à sa place."
  },
  {
    id: "cp26-q26",
    dialecte: "Gestion de projet",
    q: "Tu es DSI adjoint. Lucas arrive 20 minutes en retard à la réunion du lundi, pour la 3e fois en un mois. Tu le vois seul juste après. Que lui dis-tu d'abord ?",
    choix: [
      "« Tu manques de respect à toute l'équipe, Lucas »",
      "« 3 lundis en retard, l'équipe attend : que se passe-t-il ? »",
      "« 3 retards, ce n'est rien, tant que ton travail est fait »",
      "« Encore un lundi en retard ? La prochaine fois, j'en parle à la RH »"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Un jugement sur la personne, pas sur les faits : il se défend, et tu n'apprends pas pourquoi il est en retard.",
      "Oui. Les faits, l'impact, puis une question : il a peut-être une raison (un enfant à déposer, un trajet). Ensuite, ta demande, ou un arrangement. Le reproche d'abord fermerait la discussion.",
      "Non. L'équipe l'attend chaque fois : laisser passer, c'est dire que l'heure ne compte pas, pour personne.",
      "Non. Une menace dès la 1re discussion : il viendra peut-être à l'heure, mais tu ne sauras jamais pourquoi il était en retard. La RH conseille ; elle ne sert pas de menace."
    ],
    retenir: "Recadrer : d'abord les faits et l'impact, puis une question. Il a peut-être une raison."
  },
  {
    id: "cp26-q27",
    dialecte: "Gestion de projet",
    q: "Tu es DSI adjoint. Au support, devant 2 utilisateurs, Yann lance à Samia : « Tu ne comprends jamais rien ! » Tu es là. Que fais-tu ?",
    choix: [
      "Tu l'arrêtes sur-le-champ, puis tu le vois seul le jour même",
      "Rien sur le moment ; tu lui dis les faits au prochain point",
      "Tu consoles Samia après, sans rien dire à Yann",
      "Tu laisses passer : la journée a été dure pour tout le monde"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Un écart grave s'arrête tout de suite, d'une phrase calme : « Yann, on arrête. On en parle tout à l'heure. » Puis seul à seul, le jour même : les faits, ce qui n'est pas acceptable, ce que tu attends. Tu vois aussi Samia. La RH te conseille pour la suite.",
      "Non. Presque : tu lui en parleras seul. Mais te taire devant les utilisateurs, c'est laisser Samia humiliée, et dire à tous que ça passe.",
      "Non. Tu soignes la blessure, pas la cause : Yann recommencera, et Samia verra que rien ne le retient.",
      "Non. Une humiliation en public, devant des utilisateurs : laissée sans réponse, elle devient permise. Samia et l'équipe le retiendront."
    ],
    retenir: "Un écart grave (humilier un collègue) s'arrête sur-le-champ, d'une phrase ; puis seul à seul, le jour même."
  },
  {
    id: "cp26-q28",
    dialecte: "Gestion de projet",
    q: "Tu es DSI adjoint. Nicolas, en aparté : « Léa ne tiendra jamais sa date de juin. Tu devrais la recadrer. » Que fais-tu ?",
    choix: [
      "Tu vois Léa seule aujourd'hui, et tu la recadres",
      "Tu n'en tiens pas compte : Nicolas veut se mettre en avant",
      "Tu lui demandes ses faits, puis tu vois Léa et son planning",
      "Tu confies à Nicolas le suivi du planning de Léa"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Recadrer sur un ouï-dire : tu n'as aucun fait. Léa apprend qu'on la juge sur ce qu'en dit un collègue.",
      "Non. Tu juges l'intention au lieu de vérifier : Nicolas a peut-être vu un vrai risque. Les faits d'abord, dans les deux sens.",
      "Oui. Un avis rapporté n'est pas un fait. Tu demandes à Nicolas sur quoi il s'appuie ; puis tu regardes le planning avec Léa, comme à chaque point : reste à faire, risques. S'il y a un écart, elle l'explique et le traite.",
      "Non. Tu confies son suivi à un collègue, sur son seul avis : Léa perd sa place, et Nicolas devient juge et partie."
    ],
    retenir: "Un avis rapporté se vérifie : les faits d'abord, avec la personne concernée, avant tout recadrage."
  },
  {
    id: "cp26-q29",
    dialecte: "Gestion de projet",
    q: "Tu es DSI adjoint. Depuis 4 mois, 3 spécifications de Karim sur 4 reviennent de l'intégrateur, incomplètes. Tu lui en as parlé 2 fois. Rien ne change. Que fais-tu ?",
    choix: [
      "Tu écris toi-même ses spécifications : elles partiront complètes",
      "Une 3e discussion seul à seul, sur les faits, plus ferme",
      "Un plan écrit : faits, attentes, aide, délai, la RH en conseil",
      "Tu demandes à la RH une sanction, dès cette semaine"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Tu fais son travail, et tu caches le problème : Karim ne progresse pas, et ton temps part dans ses dossiers.",
      "Non. Presque : il faut lui parler. Mais une 3e discussion comme les 2 premières donnera le même résultat : il faut un plan écrit, avec de l'aide et un délai.",
      "Oui. Après 2 discussions, un plan écrit, avec lui : les faits (3 sur 4), ce que tu attends (une spécification complète, avec ses cas de test), l'aide (Nicolas en relit 2), un délai, un point toutes les 2 semaines. La responsable RH te conseille avant.",
      "Non. Trop fort : rien n'a encore été fait pour l'aider (attentes écrites, aide, délai). Une performance se travaille d'abord ; la suite a ses règles, que la RH connaît. Elle conseille, elle ne décide pas à ta place."
    ],
    retenir: "Une performance insuffisante, après des discussions : un plan écrit (faits, attentes, aide, délai), avec la RH en conseil."
  },
  {
    id: "cp26-q30",
    dialecte: "Gestion de projet",
    q: "Tu es DSI adjoint. En atelier, Karim et Hugo s'opposent vivement : contrôler les commandes EDI dans Divalto, ou dans l'outil EDI ? Le ton monte un peu ; les arguments sont solides. La décision peut attendre 2 semaines. Que fais-tu ?",
    choix: [
      "Tu tranches tout de suite sur les faits, pour calmer le jeu",
      "Tu arrêtes l'atelier : on reprendra à froid, un autre jour",
      "Tu vois chacun seul ensuite, pour apaiser la tension",
      "Tu les laisses débattre sur les faits, et tu fixes quand trancher"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Trop tôt : rien ne presse, et tu coupes un débat utile. Tu décides sans les meilleurs arguments, et ils apprennent à ne plus te contredire.",
      "Non. Tu fuis un débat qui avançait : le sujet revient, sans date, et la décision attend.",
      "Non. Il n'y a pas de conflit à apaiser : deux avis s'opposent, sur le fond. Des tête-à-tête feraient d'un débat une affaire de personnes.",
      "Oui. Un désaccord franc sur une solution n'est pas un conflit : c'est souvent là que naît la meilleure. Tu veilles aux faits (les cas, les coûts), et tu fixes la date de la décision. S'ils restent bloqués, tu tranches."
    ],
    retenir: "Un désaccord franc sur une solution n'est pas un conflit : on laisse débattre sur les faits, et on fixe quand trancher."
  },
  {
    id: "cp26-q31",
    dialecte: "Gestion de projet",
    q: "Tu es DSI adjoint. Samia, d'habitude rapide et souriante, laisse des tickets ouverts depuis 3 semaines. En réunion, elle ne parle plus. Que fais-tu d'abord ?",
    choix: [
      "Un plan de progrès écrit, et la RH prévenue, le jour même",
      "Tu la vois seule : tu dis ce que tu as vu, et tu écoutes",
      "D'abord ses tickets à Théo, puis tu verras avec elle",
      "Tu attends : chacun a ses passages à vide"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Trop fort, trop tôt : tu traites en performance ce que tu ne comprends pas encore. Si elle va mal, un plan l'enfonce.",
      "Oui. Un changement net est un signal : tu en parles tôt, seul à seul, sans diagnostic. Ce que tu as vu, puis tu écoutes : la charge, un souci, une tension avec un collègue. La suite dépend de ce qu'elle dit.",
      "Non. Tu soulages les tickets, pas Samia : elle comprend qu'on l'écarte, sans savoir pourquoi. Et « tu verras » laisse le signal sans réponse.",
      "Non. 3 semaines, et un changement net : attendre, c'est laisser grandir ce qui ne va pas. Un signal se dit tôt."
    ],
    retenir: "Un changement net chez quelqu'un est un signal : tu en parles tôt, seul à seul, et tu écoutes."
  },
  {
    id: "cp26-q32",
    dialecte: "Gestion de projet",
    q: "Tu es DSI adjoint. Samia (N1) et Théo (N2) ne se parlent plus. Théo : « Elle me passe tout, sans chercher. » Samia : « Il me renvoie tout, sans expliquer. » Les tickets attendent. Que fais-tu ?",
    choix: [
      "Tu donnes raison à Théo : au N2, il sait mieux ce qui est simple",
      "Chacun, puis les deux ensemble : les faits, une règle écrite",
      "Tu les laisses s'arranger : ce sont des adultes",
      "Tu en parles en réunion, et tu leur demandes un effort"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Tu prends parti sans les faits : Samia comprend qu'au N1, on a toujours tort, et rien ne change dans les tickets.",
      "Oui. Tu ne prends pas parti : tu entends chacun, puis vous regardez ensemble les tickets de la semaine. Une règle en sort, écrite : ce que le N1 essaie avant de passer, ce que le N2 lui explique en retour. Tu suis.",
      "Non. Les tickets attendent : les utilisateurs paient le conflit. Laisser faire, c'est le laisser durer.",
      "Non. Un appel général ne règle rien : ni les faits, ni la règle de passage. Et le dire devant l'équipe les gêne tous les deux."
    ],
    retenir: "Un conflit dans l'équipe : ni parti pris, ni laisser durer. Chacun, puis les deux ensemble, sur les faits ; une règle écrite."
  },
  {
    id: "cp26-q33",
    dialecte: "Gestion de projet",
    q: "Tu es DSI adjoint. Mai 2028, pleine saison des piscines : les incidents EDI se multiplient. Depuis 3 semaines, Théo écrit à 23 h, oublie 2 réunions et s'agace vite. Que fais-tu ?",
    choix: [
      "Tu lui en parles seul, et tu allèges : ce qui attend est décidé",
      "Tu le félicites : il tient la saison à lui seul",
      "Tu lui demandes de mieux s'organiser, et de souffler le week-end",
      "Tu lui imposes une semaine de congés, dès lundi"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Des signaux d'usure : tu en parles, seul à seul, sans diagnostic. Puis tu allèges vraiment : ce qui peut attendre (une petite demande, une tâche de projet) est décidé, écrit, dit à qui l'attendait. S'il va mal, la RH ou le médecin du travail peuvent l'aider.",
      "Non. Tu félicites ce qui l'use : il comprend qu'il faut continuer. Et s'il tombe, le N2 s'arrête en pleine saison.",
      "Non. Tu fais de sa charge son problème : il s'organise déjà le soir. Ce qui manque, c'est un arbitrage, et c'est le tien.",
      "Non. Trop fort, et sans lui : le N2 vide en pleine saison. Et des congés imposés suivent des règles, que la RH vérifie. D'abord en parler, puis alléger."
    ],
    retenir: "L'usure a des signaux (le soir, les oublis, l'irritation) : tu en parles, seul à seul, puis tu allèges vraiment."
  },
  {
    id: "cp26-q34",
    dialecte: "Gestion de projet",
    q: "Tu es DSI adjoint. Novembre 2028. Depuis la migration de Divalto, en service fin septembre, le run prend 80 % du temps de l'équipe, au lieu d'environ 60 %. Le WMS prend du retard, et l'équipe fait des soirées. Que fais-tu ?",
    choix: [
      "Tu le montres à ton DSI : renfort ou WMS plus tard, chiffrés",
      "Tu demandes à chacun de rattraper le WMS le soir, quelques semaines",
      "Tu fais toi-même des tickets le soir, pour aider",
      "Tu attends la revue de janvier pour en parler"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Le run passe d'abord, mais pas par des soirées. Les chiffres (80 % au lieu d'environ 60 %, ce que ça décale) et 2 options : un renfort pour le run, ou le WMS plus tard. Ton DSI arbitre, ou fait arbitrer au comité de direction (module cp25).",
      "Non. Des soirées, des semaines durant : l'usure, puis les erreurs, puis les départs. Et personne n'a choisi de payer ce retard ainsi.",
      "Non. Tu absorbes en silence : la surcharge ne se voit pas, et personne ne peut choisir. Ton rôle : la montrer, chiffres en main.",
      "Non. 2 mois de plus à 80 %, l'équipe n'y arrivera pas. Un écart qui dure se dit tôt, chiffres en main."
    ],
    retenir: "Le run déborde, des semaines durant ? Les chiffres et des options à ton DSI : un renfort, ou un projet plus tard. Pas des soirées."
  },
  {
    id: "cp26-q35",
    dialecte: "Gestion de projet",
    q: "Tu es DSI adjoint. Février 2029. Hugo, analyste EDI, quitte l'entreprise fin avril. Depuis ta nomination, lui seul suit les flux de la grande distribution. Que fais-tu ?",
    choix: [
      "Tu reprends l'EDI toi-même : tu en étais le référent",
      "Hugo écrit sa doc, puis Théo la lira après son départ",
      "Tu lui proposes une forte augmentation pour qu'il reste",
      "Dès cette semaine, Théo fait les vrais cas avec lui"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Tu redeviens le seul à savoir, avec moins de temps qu'avant : le problème change de nom, pas de nature. Et ton rôle de DSI adjoint attend.",
      "Non. Presque : une doc, oui. Mais lue après son départ, jamais testée avec lui, elle aura des trous, et Hugo ne sera plus là pour les combler.",
      "Non. Trop fort, et à côté : sa décision est prise, et une augmentation hors du circuit de tous est un passe-droit. Le risque, c'est le savoir : il se transmet.",
      "Oui. Le savoir d'une seule personne passe à un binôme, sur de vrais cas, dès l'annonce ; tu allèges Théo d'autant. Et la doc se teste : Théo traite seul un rejet, avec elle seule. Fin avril, quelqu'un sait déjà."
    ],
    retenir: "Un départ annoncé : le savoir passe à un binôme, sur les vrais cas, dès l'annonce. Une doc se teste."
  },
  {
    id: "cp26-q36",
    dialecte: "Gestion de projet",
    q: "Tu es DSI adjoint. Février 2029. Hugo t'annonce qu'il part fin avril, et ajoute : « N'en dis rien à l'équipe pour l'instant. » Que fais-tu ?",
    choix: [
      "Le secret, comme il le veut, jusqu'à son pot de départ",
      "Tu l'annonces le jour même à l'équipe, sans son accord",
      "Tu laisses la RH l'annoncer quand elle le jugera bon",
      "Tu fixes avec lui le jour de l'annonce, cette semaine"
    ],
    bonne: 3,
    pourquoi: [
      "Non. La passation ne se cache pas : l'équipe l'apprendra par la rumeur, et se demandera ce qu'on lui cache d'autre.",
      "Non. Trop vite, et sans lui : c'est son départ, il a son mot à dire sur le moment. Quelques jours, pour le faire ensemble, c'est mieux.",
      "Non. Ce n'est pas à la RH d'annoncer un départ à ton équipe : c'est toi, avec Hugo. Elle gère son départ, pas ta relation avec l'équipe.",
      "Oui. Tu respectes sa demande, mais pas longtemps : la passation commence, l'équipe va la voir. Vous fixez le jour ; c'est lui qui l'annonce, s'il le veut. Une rumeur ferait pire."
    ],
    retenir: "Un départ se dit vite à l'équipe, le jour choisi avec la personne : la passation ne se cache pas."
  },
  {
    id: "cp26-q37",
    dialecte: "Gestion de projet",
    q: "Tu es DSI adjoint. Hugo, analyste EDI, part fin avril. La responsable RH propose de republier sa fiche de poste telle quelle, dès cette semaine. Que réponds-tu ?",
    choix: [
      "« D'accord, la même fiche de poste : on gagne 2 semaines »",
      "« D'abord le besoin : ce que ce poste devra faire demain »",
      "« Pas de recrutement : un prestataire fera l'EDI »",
      "« Publions-la, et on verra en entretien ce qu'il faut »"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Tu recrutes le Hugo d'hier : les missions ont peut-être changé. 2 semaines gagnées, pour peut-être un mauvais choix.",
      "Oui. Le poste a pu changer : depuis DEMAT, les factures EDI passent par la PA, et le WMS arrive. Tu écris le besoin (missions, compétences, ce qui peut attendre), et tu regardes si quelqu'un de l'équipe le peut. Puis la fiche, avec la RH.",
      "Non. Trop fort, sans analyse : l'EDI est un travail de chaque jour chez vous. Un prestataire se choisit aussi sur un besoin écrit.",
      "Non. Presque : avancer vite. Mais sans besoin écrit, les entretiens n'ont pas de critères : tu choisiras au feeling."
    ],
    retenir: "Recruter : le besoin d'abord (ce que le poste devra faire demain), puis la fiche de poste."
  },
  {
    id: "cp26-q38",
    dialecte: "Gestion de projet",
    q: "Tu es DSI adjoint. Avec la responsable RH, tu reçois 3 candidats au poste d'analyste EDI. Comment mènes-tu les entretiens ?",
    choix: [
      "Une discussion libre : le bon candidat, ça se sent",
      "Tu laisses Hugo, qui part, choisir seul son remplaçant",
      "Un test sur un cas réel, de 3 heures, et rien de plus",
      "Mêmes questions et même cas réel pour les 3, notés sur une grille"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Le « feeling » trompe : on préfère qui nous ressemble, ou qui parle bien. Sans les mêmes questions, rien ne se compare.",
      "Non. Hugo peut aider (le cas réel, un avis technique), mais il part : le choix est le tien, avec la RH, sur tes critères.",
      "Non. Presque : un cas réel, oui. Mais un test seul ne dit rien de la façon de travailler avec l'ADV ou les partenaires.",
      "Oui. Des entretiens structurés : les mêmes questions, un même cas réel (un rejet EDI à analyser), notés sur des critères fixés avant. Tu compares des réponses, pas des impressions."
    ],
    retenir: "Des entretiens structurés : les mêmes questions et un même cas réel pour tous, notés sur des critères fixés avant."
  },
  {
    id: "cp26-q39",
    dialecte: "Gestion de projet",
    q: "Tu es DSI adjoint. Ta nouvelle analyste EDI arrive le mercredi 2 mai 2029. Hugo, qu'elle remplace, est parti lundi. Que prépares-tu ?",
    choix: [
      "Poste et accès prêts, Théo en référent, ses semaines planifiées",
      "Rien de spécial : elle apprendra sur le tas, comme tous",
      "La doc de Hugo à lire seule, puis les tickets, dans 2 semaines",
      "Tu la formes toi-même, à plein temps, pendant tout son 1er mois"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Le 1er jour, tout marche : le poste, les comptes (Yann et Samia). Théo, qui a fait la passation avec Hugo, est son référent. Un plan des 1res semaines, sur de vrais cas, et un point à la fin de chacune.",
      "Non. Sans accès ni référent, elle passe ses 1res semaines à attendre et à chercher qui sait. Un accueil raté fait partir les bons.",
      "Non. Presque : la doc aide. Mais lue seule, sans cas réels ni référent, elle s'oublie ; et les tickets, seule ensuite, c'est apprendre sur le tas. On apprend en faisant, avec quelqu'un.",
      "Non. Un mois de ton temps, et tu redeviens le référent de l'EDI. Ton rôle : organiser son accueil, pas le faire seul."
    ],
    retenir: "Intégrer : le poste et les accès prêts le 1er jour, un référent, un plan des 1res semaines."
  },
  {
    id: "cp26-q40",
    dialecte: "Gestion de projet",
    q: "Tu es DSI adjoint. À son entretien de parcours professionnel, Samia (N1) dit qu'elle aimerait devenir technicienne N2, un jour. Que fais-tu ?",
    choix: [
      "Un plan écrit : formation, pratique, bilan à 6 mois",
      "Tu lui promets le prochain poste de N2 qui s'ouvrira",
      "Son besoin noté, sans rien prévoir : ce n'est pas le sujet",
      "Tu l'inscris à 5 jours de formation Divalto, et c'est tout"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Faire grandir, c'est un plan : une formation, de la pratique sur de vrais tickets N2 avec Théo, une date de bilan. C'est écrit dans le document de l'entretien. Sans promettre de poste.",
      "Non. Une promesse que tu ne maîtrises pas : un poste dépend du besoin et des règles de l'entreprise. Non tenue, elle te coûte sa confiance.",
      "Non. C'est justement le sujet : cet entretien porte sur son parcours et sa formation. Noter sans rien prévoir, c'est lui dire non sans le dire.",
      "Non. Presque : la formation aide. Mais sans pratique ni bilan, elle oublie vite. Ce qui fait grandir : apprendre, puis faire."
    ],
    retenir: "Faire grandir : un plan écrit (formation, pratique, date de bilan), pas une promesse."
  },
  {
    id: "cp26-q41",
    dialecte: "Gestion de projet",
    q: "Tu es DSI adjoint. Le CRM (gestion des clients) vient d'être retenu. Léa, cheffe de projet junior, veut le piloter. Elle n'a mené que de petits projets. Que lui réponds-tu ?",
    choix: [
      "« Non : trop gros pour une junior, Nicolas le prendra »",
      "« Oui, seule, sans point : c'est en pilotant qu'on apprend »",
      "« On le pilote ensemble : je décide, et tu apprends »",
      "« Oui, avec Nicolas en appui, et des points serrés »"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Elle ne grandira pas si elle ne prend que les petits projets. Et Nicolas est déjà pris : la migration, puis le WMS.",
      "Non. Presque : le lui confier, oui. Mais seule, sans point, sur un projet plus gros que tout ce qu'elle a fait : le 1er écueil la met en échec, faute d'appui.",
      "Non. Ensemble, mais c'est toi qui décides : elle regarde, et n'apprend pas à décider. Et ton temps de DSI adjoint part dans un projet.",
      "Oui. Un projet plus gros fait grandir, avec un filet : quelques heures d'appui de Nicolas, des points chaque semaine au début, puis espacés. Tu ne pilotes pas à sa place."
    ],
    retenir: "Faire grandir : un projet plus gros, avec un appui et des points serrés au début, sans piloter à sa place."
  }
];
