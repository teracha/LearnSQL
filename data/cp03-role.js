// Chef de projet SI — Questions du module cp03 « Le rôle attendu par un DSI ».
// Fond (PMBOK : le chef de projet répond des objectifs du projet, pas de chaque tâche ; PRINCE2 : gérer par exception,
// dans ses marges ; pratique de terrain des DSI de PME / ETI) : ce que le DSI attend (le résultat : date, budget,
// qualité, adoption ; pas de surprise ; des décisions préparées, options et recommandation ; la relation avec le métier ;
// protéger le run ; rendre compte) ; responsable du résultat, pas des tâches (à toi : piloter, risques, rapport,
// décisions ; tu fais faire : paramétrage, documentation, corrections, tests et travail du métier ; confier = quoi, pour
// quand, à quoi on voit que c'est fini, point d'étape ; suivre les résultats, pas chaque ligne ; ni excuse, ni faute
// endossée) ; l'expert devenu chef de projet (diagnostiquer plutôt que corriger ; une petite tâche de ton rôle, tu la
// fais ; faire à la place n'est pas une économie ; mettre les mains : urgence réelle, personne d'autre à temps, DSI
// d'accord, testé, tracé, dit, puis rendre la main ; pas d'habitude ; le DSI qui demande de faire décide en connaissant
// le prix) ; rendre compte (fiche du lundi : ce qui avance, ce qui coince, ce dont tu as besoin ; 2 minutes si tout va
// bien ; la mauvaise nouvelle le jour même, par toi, sans retarder le DAF ; ton erreur aussi ; trier, pas tout en copie ;
// demander de l'aide tôt ; ta délégation) ; anticiper (les décisions à venir, préparer le terrain avec ton DSI, proposer
// plutôt que subir, préparer ta propre absence) ; vers DSI adjoint (une ligne par projet, confier un projet,
// « que proposes-tu ? », une mauvaise nouvelle facile à apporter, transmettre son expertise).
// Les méthodes divergent sur la part de « faire » : Scrum n'a pas de chef de projet ; en PME, le chef de projet est
// souvent aussi l'expert. Ici, il fait rarement, en urgence, en le disant (q16, q18 : la bonne réponse est de faire).
// Fil rouge DEMAT 2027 (fiche fil rouge de docs/plan-chef-de-projet.md, qui fait foi), ligne « Toi et ton DSI (modules
// cp02, cp03) » : environ 70 % de ton temps sur DEMAT, 30 % sur le run (référent des flux EDI, en appui du support N2) ;
// point de 30 minutes avec ton DSI chaque lundi ; il attend : pas de surprise, des décisions préparées, faire faire
// plutôt que faire. Un seul consultant de l'intégrateur connaît le paramétrage ; sa documentation est un livrable de la
// commande (q10, q19). Des jours en plus = une commande signée par le DAF avant de commencer (q25). Connecteur :
// version 2 au printemps 2027, version 1 maintenue jusqu'en décembre 2027 (q31). Gel des changements dès le pilote
// de mai : la correction bloquante de q18 le passe (cp10-q26).
// Plan B (portail de la PA) depuis le 16 mars dans la branche de q14 (comme cp18-q32). Sophie dépose environ 400
// factures par mois hors connecteur, 2 jours par mois (cp11, cp15) : 90 en une semaine, une demi-journée (q13).
// COPIL le 2e mardi du mois (mars : le 9 ; avril : le 13). Aucun montant d'amende.
// Faits ajoutés (cohérents avec la fiche et les modules publiés, à valider) : la fiche du lundi a 3 rubriques (ce qui
// avance, ce qui coince, ce dont tu as besoin) ; ton DSI dispose d'un administrateur réseau (q27) ; un collègue chef de
// projet de la DSI porte un projet « étiquettes d'expédition » dans Divalto (q26 ; cp18-q40 l'orientait vers la DSI) ;
// comme référent des flux EDI, tu as des droits sur le connecteur en production (q18, q19) ; projet Snowflake + Power BI
// à 30 k€ (cp11), et son sponsor qui demande 10 % de moins (q33) ; ta semaine de congé en mai, posée depuis longtemps
// (q32). Variantes, chiffres d'exemple : connecteur annoncé avec 3 semaines de retard (q06) ; 30 % de ressaisie après la bascule (q07) ; 6 jours de paramétrage faits par toi,
// 4 500 € (q17) ; 150 factures bloquées un vendredi de pilote, consultant en congé (q18) ; recette qui déborde de
// 2 semaines (q24, comme cp17-q12) ; 1 jour de consultant sans commande (q25) ; 40 mails par semaine (q23).
// q34 à q39 : « Tu es DSI adjoint » (migration Divalto, état de stock, cheffe de projet junior, EDI).
// Affirmations juridiques ou comptables hors fiche : aucune.
// Déjà publiées ailleurs, pas reprises ici : cp01-q03 (1er retard de l'intégrateur, tu sais paramétrer), cp15-q13 (le
// N2 corrige à la place du consultant), cp16-q08 et q17 (faire les tests ou les règles du métier), cp16-q11 (l'export
// de 30 minutes), cp16-q31 (voir les managers avant le COPIL), cp17-q21 (« Ça va, DEMAT ? », consultant absent en mai),
// cp18-q36 (le DSI qui veut tout faire valider par le DAF), cp10-q26 (correction urgente par le consultant au pilote),
// cp02-q10 et q38 (former le N2), cp02-q13 (« Oui. Alors, que décale-t-on ? »), cp02-q30 (un retard dit tout de suite).
// Voisines, autre angle : q30 (ton DSI, avant le COPIL, pour ses équipes) et cp16-q31 ; q15 (ton diagnostic, code EDI
// 380 / 381) et cp15-q13 ; q28 (tu consultes ton DSI pour tout) et cp18-q36 ; q21 (ton DSI te demande de faire :
// le prix, puis il choisit) et cp02-q13 ; q39 (DSI adjoint : nommer un référent EDI) et cp02-q10.
// Frontières : cp02 = ton temps et tes priorités (le 70 / 30, le run contre le projet, les interruptions) ; cp09 = les
// instances et le RACI ; cp08 = le rapport du COPIL ; cp16 = l'échelle d'escalade ; cp17 = les mots ; cp18 = ta
// délégation, arbitrer ; cp15 = piloter le prestataire ; cp07 = les risques ; cp22 = le passage en run ; cp23 =
// l'adoption ; cp24 à cp27 = vers DSI adjoint (cités).
// Anti-devinette : 40 questions (attentes du DSI 6, faire ou faire faire 11, rendre compte 9, anticiper 5, posture 3,
// DSI adjoint 6). La bonne réponse est un extrême dans 10 questions : la plus douce qui suffit (q08, q10, q16, q22, q38,
// q40), la plus forte quand elle se justifie (q05, q24, q25, q26). Un choix « faire faire » est juste dans 14
// questions et faux dans 19 ; « faire toi-même » est juste dans q08 (garder le pilotage), q16 et q18, faux dans 22 ;
// un choix qui informe ou consulte le DSI est juste dans 19 questions et faux dans 19 (règles cp03 : 38 %, 10 %, 44 %
// là où le choix existe). « Rien », « tout », « seul », « personne », « toujours », « Oui », « D'accord »,
// « aujourd'hui », « le jour même », « dès » sont aussi dans des bonnes réponses ; « options », « chiffré », « fiche »,
// « test » aussi dans des choix faux.
LEARNSQL.questions.cp03 = [
  {
    id: "cp03-q01",
    dialecte: "Gestion de projet",
    q: "Octobre 2026. Ton DSI te confie DEMAT 2027, à environ 70 % de ton temps. Il te demande : « Au bout du compte, tu me livres quoi ? » Que réponds-tu ?",
    choix: [
      "« Un planning détaillé tâche par tâche, et le compte rendu de chaque réunion »",
      "« Ce que le DAF me demandera en route : c'est lui le sponsor, je m'adapterai »",
      "« Toutes les factures pros via la PA en septembre, au budget, sans ressaisie »",
      "« Le connecteur paramétré et les flux EDI repris, que j'aurai testés moi-même »"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Un planning et des comptes rendus sont des outils, pas un résultat. On peut tout documenter, et rater septembre.",
      "Non. Le DAF décide, mais tu ne t'effaces pas. Sans résultat promis, personne ne sait si le projet réussit.",
      "Oui. Un résultat : la date légale, le budget, la qualité, et une compta qui ne ressaisit plus (l'adoption). C'est là-dessus que ton DSI te jugera, pas sur tes tâches.",
      "Non. Ce sont des tâches, et tu les ferais toi-même. Ton DSI attend un résultat : la date, le budget, la qualité, l'adoption. Le paramétrage, c'est l'intégrateur."
    ],
    retenir: "Ton DSI attend un résultat : la date, le budget, la qualité et l'adoption. Pas une liste de tâches."
  },
  {
    id: "cp03-q02",
    dialecte: "Gestion de projet",
    q: "Lundi, point de 30 minutes avec ton DSI. Que mets-tu sur ta fiche ?",
    choix: [
      "Le dernier rapport du COPIL, en entier, pour qu'il ait tout",
      "Ce qui avance, ce qui coince, et ce dont tu as besoin de lui",
      "Rien d'écrit : il pose ses questions, tu réponds au fil de l'eau",
      "Tes tâches de la semaine, faites et à faire, une par ligne"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Un rapport mensuel parle du passé, et il est trop long pour 30 minutes. Le lundi, l'essentiel de la semaine.",
      "Oui. Trois rubriques : ce qui avance, ce qui coince (et ce qui va coincer), ce dont tu as besoin. En 5 minutes, il sait où agir.",
      "Non. Sans fiche, le point dépend de ses questions : ce qu'il ne pense pas à demander, il ne le saura pas.",
      "Non. Tes tâches disent ce que tu fais, pas où en est le résultat. Il veut voir ce qui change pour la date, le budget, la qualité."
    ],
    retenir: "Le point du lundi : ce qui avance, ce qui coince, ce dont tu as besoin."
  },
  {
    id: "cp03-q03",
    dialecte: "Gestion de projet",
    q: "Le consultant de l'intégrateur veut un accès administrateur permanent à la production de Divalto, « pour aller plus vite ». Ces accès, c'est ton DSI qui les accorde. Que lui apportes-tu ?",
    choix: [
      "2 ou 3 options, leur risque pour la production, ton avis",
      "Rien : un consultant n'a jamais accès à la production",
      "Sa demande, telle quelle, pour décision : « Tu es d'accord ? »",
      "Ton accord, déjà donné au consultant : tu l'informes après"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Une décision préparée : par exemple un accès permanent, ouvert à la demande par le support, ou limité à la recette. Le risque et le délai de chacune, ta recommandation : il tranche vite.",
      "Non. Tu tranches à sa place, et trop fort : l'intégrateur doit bien intervenir en production, ne serait-ce que pour installer le connecteur.",
      "Non. Tu lui laisses tout le travail : il ne connaît ni le besoin réel, ni les autres façons de faire. Une décision se prépare avant d'être demandée.",
      "Non. L'accès à la production est une décision de ton DSI. L'apprendre après coup, c'est la surprise qu'il ne veut pas."
    ],
    retenir: "Une décision à faire prendre se prépare : des options, leur risque, ta recommandation."
  },
  {
    id: "cp03-q04",
    dialecte: "Gestion de projet",
    q: "L'intégrateur veut installer le connecteur en production mardi à 10 h : Divalto arrêté 1 heure. À cette heure-là, l'ADV saisit les commandes et les flux EDI tournent. Que fais-tu ?",
    choix: [
      "Tu acceptes : 1 heure d'arrêt, les utilisateurs patienteront bien un peu",
      "Tu l'installes toi-même ce soir, puis l'intégrateur teste",
      "Tu fais choisir la date par le DAF : c'est lui le sponsor du projet",
      "D'accord, mais un soir : calé avec le support, utilisateurs prévenus"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Une heure sans saisie ni flux EDI en pleine journée : un incident causé par le projet. Le run se protège.",
      "Non. L'installation, c'est le travail de l'intégrateur : il en répond. Changer l'heure suffit ; changer de main, non.",
      "Non. Une heure d'intervention n'est pas une décision de sponsor. Elle se règle avec le support de la DSI.",
      "Oui. Le projet ne casse pas ce qui tourne : l'intervention se cale avec le support, hors des heures chargées, et chacun est prévenu. L'intégrateur installe ; ton DSI le sait."
    ],
    retenir: "Protéger le run : une intervention en production se cale avec le support, hors des heures chargées."
  },
  {
    id: "cp03-q05",
    dialecte: "Gestion de projet",
    q: "La cheffe comptable appelle ton DSI pour se plaindre du planning de recette. Il te transmet : « Règle ça avec elle. » Que fais-tu ?",
    choix: [
      "Tu lui renvoies le planning à jour, ton DSI en copie",
      "Tu lui écris que toute demande sur le projet passe par toi",
      "Tu laisses ton DSI lui répondre : c'est lui qu'elle a appelé",
      "Tu la vois le jour même, tu l'écoutes, puis ton DSI sait où on en est"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Elle se plaint d'un planning qu'elle a déjà : le lui renvoyer sans l'écouter ne règle rien, et l'agace un peu plus.",
      "Non. Presque : les demandes passent bien par toi. Mais un rappel écrit, sans l'écouter, la braque, et son problème reste entier.",
      "Non. La relation avec le métier, c'est toi qui la tiens. Si ton DSI répond à ta place, elle l'appellera encore la prochaine fois.",
      "Oui. Tu tiens la relation : tu vas la voir vite, tu écoutes ce qui la gêne, vous cherchez une solution. Puis ton DSI sait que c'est réglé, ou ce qu'il reste."
    ],
    retenir: "La relation avec le métier, c'est toi qui la tiens : ton DSI ne doit pas la porter à ta place."
  },
  {
    id: "cp03-q06",
    dialecte: "Gestion de projet",
    q: "Jeudi, tu as prévenu le DAF : le connecteur aura 3 semaines de retard. Ton DSI, tu comptais l'informer lundi, au point. Vendredi midi, le DAF lui en parle. Ton DSI t'appelle, agacé. Que lui dis-tu ?",
    choix: [
      "« Tu as raison, j'aurais dû te le dire le jour même. Voici mon plan »",
      "« Je voulais attendre lundi, pour venir avec un plan complet »",
      "« Le DAF n'avait pas à t'en parler avant le prochain COPIL »",
      "« Désormais : tous mes mails au DAF en copie, et un appel chaque soir »"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Tu reconnais l'oubli, simplement, puis ton plan. La prochaine fois : un message à ton DSI le jour même, en même temps que le DAF.",
      "Non. Ton DSI ne doit pas l'apprendre par d'autres, surtout pas par le DAF. Une mauvaise nouvelle se dit le jour même, même sans plan complet.",
      "Non. Le DAF parle à qui il veut. Le problème, c'est que ton DSI l'a appris par lui, et pas par toi.",
      "Non. Presque : il doit savoir plus vite. Mais des copies et un appel chaque soir, c'est du bruit : il ne lira plus rien. Le grave, le jour même ; le reste, le lundi."
    ],
    retenir: "Ton DSI n'apprend jamais une mauvaise nouvelle par d'autres : tu la lui dis le jour même."
  },
  {
    id: "cp03-q07",
    dialecte: "Gestion de projet",
    q: "Juin, 2 semaines après la bascule. Date et budget tenus. Mais la compta ressaisit encore 30 % des factures fournisseurs dans Divalto, « par sécurité ». Ton DSI : « DEMAT, c'est fini ? » Que réponds-tu ?",
    choix: [
      "« Bientôt : dès demain, je bloque la saisie à la main dans Divalto, pour tous »",
      "« Oui : date et budget tenus. La ressaisie, c'est leur affaire »",
      "« Pas encore : je vois avec la cheffe comptable pourquoi elles ressaisissent »",
      "« Non : je fais refaire toute la formation de la compta en juillet »"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Forcer, sans savoir pourquoi elles ressaisissent, c'est risquer des erreurs cachées. Et ce n'est pas ta décision, mais celle de la cheffe comptable.",
      "Non. Le résultat comprend l'adoption : le gain du projet, c'est la fin de la ressaisie. Tant qu'elles ressaisissent, il n'est pas là.",
      "Oui. Livré à l'heure mais contourné, le projet n'a pas donné son résultat. D'abord comprendre, avec leur cheffe : une peur, un manque, un défaut ? Puis agir.",
      "Non. Presque : il manque peut-être de la formation. Mais tout refaire, avant de connaître la cause, coûte cher et peut ne rien changer."
    ],
    retenir: "Le projet n'est pas fini tant que le métier ne s'en sert pas : l'adoption fait partie du résultat."
  },
  {
    id: "cp03-q08",
    dialecte: "Gestion de projet",
    q: "Le consultant de l'intégrateur propose : « Je peux tenir le registre des risques et écrire le rapport du COPIL. Je connais le projet mieux que personne. » 2 jours par mois, payés au jour. Que réponds-tu ?",
    choix: [
      "« Si le DAF accepte de payer ces 2 jours, d'accord »",
      "« Le registre des risques pour toi, le rapport pour moi »",
      "« Non : tout reste à moi. Tes risques, au point projet »",
      "« D'accord : faire faire, c'est le rôle d'un chef de projet »"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Ce n'est pas une question d'argent : même gratuit, le pilotage reste à toi. Le DAF n'a rien à payer ici.",
      "Non. Presque : tu gardes le rapport. Mais le registre est ton outil de pilotage : celui qui le tient choisit ce que le sponsor verra.",
      "Oui. Piloter et rendre compte restent à toi. Ses risques sont précieux : il te les apporte chaque lundi, au point projet ; toi, tu les tiens.",
      "Non. Faire faire vaut pour les tâches : paramétrer, tester. Piloter, suivre les risques, rendre compte au sponsor, c'est ton rôle même : il ne se délègue pas."
    ],
    retenir: "Piloter, suivre les risques et rendre compte ne se délèguent pas. Les autres t'apportent leurs risques ; toi, tu les tiens."
  },
  {
    id: "cp03-q09",
    dialecte: "Gestion de projet",
    q: "Sa cheffe a réservé à Sophie 2 matinées par semaine. Tu lui confies la préparation des cas de test des avoirs clients, pour la recette. Que lui dis-tu ?",
    choix: [
      "« Je les écris, et tu n'auras plus qu'à les dérouler »",
      "« Prépare tes cas d'avoirs pour la recette, quand tu peux. Merci ! »",
      "« Envoie-moi chaque cas dès qu'il est écrit, sur ce modèle : je le valide »",
      "« 15 cas sur ce modèle, pour le 5 mars. Un point le 26 février ? »"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Ses cas viennent de son travail réel : écrits par toi, ils testent ce que tu crois, pas ce qu'elle vit.",
      "Non. Ni combien, ni pour quand, ni sur quel modèle : elle ne sait pas ce qui est attendu, et tu ne sauras pas si c'est fini.",
      "Non. Valider chaque cas, un par un, c'est la surveiller, pas lui confier. Un point d'étape suffit.",
      "Oui. Confier, c'est dire quoi, pour quand, et à quoi on voit que c'est fini (le modèle). Le point d'étape laisse le temps de réagir si ça coince."
    ],
    retenir: "Confier une tâche : quoi, pour quand, à quoi on voit que c'est fini, et un point d'étape."
  },
  {
    id: "cp03-q10",
    dialecte: "Gestion de projet",
    q: "Le consultant propose : « Chaque semaine, je mets à jour la documentation de mon paramétrage. » C'est un livrable prévu à sa commande. Que réponds-tu ?",
    choix: [
      "« Oui, merci : je la regarderai à chaque jalon »",
      "« Non : la documentation, c'est au chef de projet de la tenir »",
      "« Oui, si le DAF accepte de payer ce temps en plus »",
      "« Oui, et je la relirai chaque soir, ligne par ligne »"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. C'est son livrable : il le fait, tu le regardes aux jalons. Faire faire, c'est aussi accepter simplement ce qui est déjà prévu.",
      "Non. La documentation du paramétrage, c'est celui qui paramètre qui l'écrit : il est le seul à savoir. Toi, tu vérifies qu'elle existe et qu'elle sert.",
      "Non. Elle est prévue à sa commande : il n'y a rien à payer en plus. Et le DAF n'a rien à décider ici.",
      "Non. Presque : oui à sa proposition. Mais relire chaque soir, c'est surveiller, pas suivre. Tu la regardes aux jalons."
    ],
    retenir: "Ce qui est prévu au contrat du prestataire, tu le fais faire, et tu le vérifies aux jalons."
  },
  {
    id: "cp03-q11",
    dialecte: "Gestion de projet",
    q: "Chaque soir, tu relis le paramétrage du jour du consultant, et tu corriges toi-même ce qui ne te plaît pas. Depuis, il livre plus vite, mais compte sur tes corrections. Que changes-tu ?",
    choix: [
      "Tu ne relis ni ne corriges plus rien : c'est son paramétrage",
      "Tu ne corriges plus rien : tu lui dis, et tu juges aux tests",
      "Rien : grâce à toi, la recette trouvera bien moins d'erreurs",
      "Tu demandes un 2e consultant à l'intégrateur, pour relire et tester"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Presque : arrêter de corriger, oui. Mais ne plus rien regarder, c'est lâcher. Tu suis ses livrables et les tests.",
      "Oui. Tu lui rends sa responsabilité : tu dis ce que tu vois, il corrige. Tu juges sur les résultats (les tests), pas ligne par ligne.",
      "Non. Il ne répond plus de son travail : il compte sur toi. Et chaque soir passé à corriger, tu ne pilotes pas.",
      "Non. Tu paierais des jours pour un problème de rôle. Il suffit que chacun reprenne le sien."
    ],
    retenir: "Tu suis les résultats, pas chaque ligne : corriger à sa place retire sa responsabilité au prestataire."
  },
  {
    id: "cp03-q12",
    dialecte: "Gestion de projet",
    q: "Il y a 3 semaines, tu as confié à Julie la préparation des cas de test fournisseurs. Depuis, tu n'as rien regardé. La recette commence dans 5 jours. Que fais-tu ?",
    choix: [
      "Tu demandes à sa cheffe de vérifier son travail avant le début",
      "Tu écris toi-même des cas de secours, au cas où il en manquerait le jour J",
      "Rien : tu lui fais confiance, vous verrez bien le 1er jour",
      "Tu fais le point avec elle aujourd'hui : ce qui est prêt, ce qui manque"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Tu n'as pas encore regardé : passer par sa cheffe, c'est mettre Julie en cause pour un suivi que tu n'as pas fait.",
      "Non. Tu doubles son travail sans savoir s'il manque quelque chose. Et tes cas testent ce que tu crois, pas son travail réel.",
      "Non. Confier n'est pas lâcher. Découvrir un manque le 1er jour, c'est une recette qui commence en retard.",
      "Oui. Faire faire, c'est suivre : le point d'étape, tout de suite, puisqu'il n'y en a pas eu. 5 jours laissent le temps de combler un manque."
    ],
    retenir: "Faire faire, c'est suivre : un point d'étape avant l'échéance, pas une surprise le jour J."
  },
  {
    id: "cp03-q13",
    dialecte: "Gestion de projet",
    q: "Après la bascule, Sophie dépose chaque semaine sur le portail de la PA les factures clients que le connecteur ne prend pas. Elle est malade toute la semaine : 90 factures attendent. Tu connais bien le portail. Que fais-tu ?",
    choix: [
      "Tu vois avec sa cheffe qui la remplace, et tu offres de former la personne",
      "Tu demandes à Julie de les déposer, puis tu préviens sa cheffe",
      "Tu les déposes toi-même aujourd'hui : une demi-journée, et plus rien ne bloque",
      "Rien : elles attendront son retour, lundi prochain"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Le remplacement, c'est la cheffe comptable qui l'organise : c'est son équipe. Ton aide utile : former la personne, pas faire à sa place.",
      "Non. Presque : faire faire, oui, mais pas dans cet ordre. Le temps de Julie, c'est sa cheffe qui en décide, avant, pas après.",
      "Non. Déposer les factures, c'est le travail de la compta, et sa cheffe doit savoir qui le fait. Sinon, tu deviens le remplaçant de chaque absence.",
      "Non. 90 factures clients en retard, ce sont des paiements qui attendent. Une solution existe, sans toi : sa cheffe."
    ],
    retenir: "Le travail du métier reste au métier : son manager organise les remplacements, toi tu aides."
  },
  {
    id: "cp03-q14",
    dialecte: "Gestion de projet",
    q: "COPIL d'avril. Le connecteur n'est toujours pas livré : le portail de la PA, prévu au contrat, sert de plan B depuis le 16 mars. Le DAF, agacé : « Qui est responsable de ce retard ? » Que réponds-tu ?",
    choix: [
      "« La PA : elle n'a pas tenu sa date. Voyez directement avec elle »",
      "« La PA a raté sa date. Juin tient, et voici la suite à décider »",
      "« Moi : j'aurais dû suivre la PA de bien plus près »",
      "« Le plan B tient : je propose de changer de PA dès ce mois-ci »"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Vrai, mais inutile : le résultat reste le tien. Renvoyer vers la PA, c'est laisser le DAF sans plan.",
      "Oui. Les faits sans détour (la PA a raté sa date), l'impact (juin tient), puis la suite : une date ferme exigée de la PA, et les pénalités, que le DAF décide d'appliquer ou non.",
      "Non. Presque : tu portes le résultat. Mais t'accuser à la place de la PA est faux, et n'aide pas à décider. Le DAF attend la suite.",
      "Non. Un retard couvert par le plan B ne justifie pas de tout changer en pleine recette. On exige d'abord une date ferme."
    ],
    retenir: "Responsable du résultat : ni excuse, ni faute endossée à la place d'un autre. Les faits, l'impact, et la suite."
  },
  {
    id: "cp03-q15",
    dialecte: "Gestion de projet",
    q: "Recette. Depuis 2 jours, le consultant cherche pourquoi les avoirs d'AquaBleu sont rejetés. En 5 minutes, tu vois la cause : le message EDI porte le code 380 (facture) au lieu de 381 (avoir). Il revient demain matin. Que fais-tu ?",
    choix: [
      "Rien : chercher la cause, c'est le travail qu'il facture",
      "Tu préviens son responsable, et tu demandes un consultant plus solide",
      "Tu lui montres ce que tu as vu ; il vérifie, corrige et reteste",
      "Tu corriges et testes le mapping ce soir : 2 jours perdus, ça suffit"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Garder un diagnostic pour toi coûte des jours payés et retarde la recette. Le partager, ce n'est pas faire son travail.",
      "Non. Une cause difficile à trouver n'est pas une faute. Changer de consultant en pleine recette coûterait bien plus que 2 jours.",
      "Oui. Ton expertise sert à trouver la cause, pas à faire le travail. Il vérifie, corrige, reteste, et met sa documentation à jour : le paramétrage reste le sien.",
      "Non. Rien ne presse au point de faire à sa place. Corrigé par toi, sans trace, le mapping n'est plus le sien : il n'en répond plus."
    ],
    retenir: "Ton expertise technique sert à diagnostiquer et à poser les bonnes questions ; la correction, tu la fais faire."
  },
  {
    id: "cp03-q16",
    dialecte: "Gestion de projet",
    q: "Pour ton rapport du COPIL, tu veux le taux de rejet du mois, motif par motif. L'export du portail de la PA et une requête sur Divalto suffisent : 20 minutes de ton temps. Que fais-tu ?",
    choix: [
      "Tu l'écris toi-même : le pilotage, c'est ton travail",
      "Tu demandes au N2 d'écrire la requête : c'est du travail technique",
      "Tu commandes un état Divalto à l'intégrateur : c'est son métier",
      "Tu fais compter les rejets à la main par Julie, chaque mois"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Une petite tâche de ton propre rôle, le pilotage : 20 minutes. La faire faire coûterait plus que de l'écrire. Faire faire vaut pour le travail des autres.",
      "Non. Le temps du N2 est au run, et ton DSI en dispose. Pour 20 minutes de ton propre travail, tu déranges une équipe.",
      "Non. Un état de l'intégrateur, c'est au moins 1 jour, donc une commande signée par le DAF, pour 20 minutes de travail.",
      "Non. Le temps de Julie, c'est sa cheffe qui en décide. Et compter à la main se trompe, là où une requête ne se trompe pas."
    ],
    retenir: "Une petite tâche de ton propre rôle (ton reporting), tu la fais toi-même : faire faire vaut pour le travail des autres."
  },
  {
    id: "cp03-q17",
    dialecte: "Gestion de projet",
    q: "Le DAF te félicite : « Tu as fait 6 jours de paramétrage à la place de l'intégrateur : 4 500 € d'économisés ! » Pendant ces 6 jours, ni les risques ni la recette n'ont avancé. Que réponds-tu ?",
    choix: [
      "« Merci ! Et j'en ferai encore 6 jours le mois prochain »",
      "« Merci : je l'inscris au bilan, comme une économie »",
      "« Pas vraiment : l'intégrateur devra refaire tout ce paramétrage »",
      "« Pas vraiment : 6 jours sans pilote, et un paramétrage dont personne ne répond »"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Tu creuses le trou : encore 6 jours sans pilote. Le DAF paie moins d'intégrateur, mais plus personne ne voit venir les risques.",
      "Non. Ce n'est pas une économie : ton temps aussi coûte, et il a manqué au pilotage. L'écrire ainsi, c'est inviter à recommencer.",
      "Non. Presque : ce n'est pas une économie. Mais rien ne dit que ton paramétrage est faux : le refaire en entier coûterait pour rien. L'intégrateur le relit et le documente.",
      "Oui. Les 4 500 € sont vrais (6 × 750 €), le reste aussi : 6 jours sans pilotage, et un paramétrage sans garantie de l'intégrateur. Tu le dis simplement, et tu reprends ton rôle."
    ],
    retenir: "Faire à la place du prestataire n'est pas une économie : pendant ce temps, personne ne pilote."
  },
  {
    id: "cp03-q18",
    dialecte: "Gestion de projet",
    q: "Vendredi 16 h, pilote. 150 factures fournisseurs bloquées dans le connecteur ; la clôture du mois commence lundi. Le seul consultant qui sait est en congé, injoignable, jusqu'à mercredi. Tu as trouvé la cause, et tu sais corriger. Que fais-tu ?",
    choix: [
      "Tu demandes à l'intégrateur un autre consultant dès lundi matin, avec un plan",
      "Tu préviens ton DSI, et vous attendez mercredi : c'est le paramétrage de l'intégrateur",
      "Tu corriges toi-même ce soir : testé, ton DSI d'accord, écrit à l'intégrateur",
      "Tu corriges tout de suite en production ; le consultant le découvrira mercredi"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Presque : faire faire reste le réflexe. Mais personne d'autre ne connaît ce paramétrage : un nouveau consultant découvrira tout, pendant que la clôture attend.",
      "Non. Prévenir ton DSI, oui. Mais 150 factures bloquées pendant la clôture, c'est un vrai blocage : attendre mercredi par principe, c'est faire payer le métier.",
      "Oui. Les conditions y sont : urgence réelle, personne d'autre à temps. Tu le fais proprement : testé en recette, ton DSI d'accord, une trace écrite. Mercredi, le consultant reprend la main.",
      "Non. Le bon geste, mal fait : sans test, tu peux bloquer plus de factures. Et sans le dire, l'intégrateur découvre un paramétrage changé dans son dos."
    ],
    retenir: "Faire toi-même : rarement, en urgence, quand personne d'autre ne peut. Alors testé, tracé, dit, et tu rends la main."
  },
  {
    id: "cp03-q19",
    dialecte: "Gestion de projet",
    q: "Vendredi, en urgence, tu as corrigé un paramètre du connecteur : testé, tracé, ton DSI d'accord. Mercredi, le consultant revient : « Bravo ! La prochaine fois que ça bloque, fais-le directement. » Que réponds-tu ?",
    choix: [
      "« Non : c'était une exception. Écris ce cas dans ta documentation »",
      "« On verra au prochain blocage, selon qui sera là »",
      "« Non, et je fais retirer mes droits en production dès demain »",
      "« D'accord : j'ai les droits, je teste, et ça ira plus vite pour tout le monde »"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. L'exception reste une exception. Le vrai sujet : un seul consultant sait. Sa documentation, un livrable de sa commande, doit couvrir ce cas, pour que d'autres s'en servent.",
      "Non. Rien n'aura changé au prochain blocage : on retombera sur toi. C'est maintenant qu'il faut écrire ce cas.",
      "Non. Trop fort : tes droits ont servi, proprement, dans une vraie urgence. Le problème n'est pas tes droits, c'est qu'il est le seul à savoir.",
      "Non. Ce serait une habitude : tu deviendrais son support, et il ne répondrait plus de son paramétrage."
    ],
    retenir: "Faire toi-même en urgence ne devient pas une habitude : on corrige la cause (la documentation, un 2e qui sait)."
  },
  {
    id: "cp03-q20",
    dialecte: "Gestion de projet",
    q: "Ton projet Snowflake + Power BI. Le mois dernier, en urgence, tu as fait toi-même un tableau pour la direction. Elle en veut maintenant un nouveau chaque mois. Que fais-tu ?",
    choix: [
      "Tu demandes au prestataire de les faire, « pour le geste », sans commande",
      "Tu le dis à ton DSI : un besoin qui revient, à confier, chiffré",
      "Tu les fais : la direction est contente, et un soir suffit",
      "Tu demandes à ton DSI de refuser pour toi : ce n'est pas ton rôle"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Presque : faire faire, oui. Mais un travail sans commande se paie plus tard, d'une façon ou d'une autre, et ne dure pas.",
      "Oui. Un besoin qui revient se traite comme un besoin : qui le fait, à quel coût. Ton DSI arbitre ; toi, tu rends la main.",
      "Non. Une fois, en urgence, c'était défendable. Chaque mois, c'est une habitude : un soir pris au projet, et toi seul qui sais faire.",
      "Non. Tu te caches derrière ton DSI, et le besoin est réel : un refus sec fâche la direction sans rien régler. Il faut lui trouver quelqu'un."
    ],
    retenir: "Faire toi-même une fois, en urgence : possible. Si ça revient, c'est un besoin à confier, pas une habitude."
  },
  {
    id: "cp03-q21",
    dialecte: "Gestion de projet",
    q: "Ton DSI : « L'intégrateur coûte 750 € par jour. Les flux EDI, c'est ton métier : fais-les toi-même. » Il te faudrait environ 15 jours. Que fais-tu ?",
    choix: [
      "Tu acceptes, et tu lui en rendras compte sur ta fiche du lundi",
      "Tu refuses : ce n'est pas le rôle d'un chef de projet",
      "Tu demandes au DAF, ton sponsor, de trancher entre ton DSI et toi",
      "Tu lui montres le prix (pilotage, risque) : il choisit, et tu appliques"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Presque : c'est bien ton DSI qui arbitre ton temps, et tu lui rendras compte. Mais il doit décider en connaissant le prix : 15 jours sans pilote.",
      "Non. Un refus sec, sans chiffres : il décidera sans voir le coût. Ce n'est pas interdit, c'est un choix à faire en connaissant le prix.",
      "Non. Ton temps, c'est ton DSI qui en décide, pas le DAF. Tu le mettrais en porte-à-faux pour rien.",
      "Oui. Il arbitre ton temps, en connaissant le prix : 15 jours où personne ne pilote, un travail dont l'intégrateur ne répond plus. S'il maintient, tu appliques."
    ],
    retenir: "Ton DSI te demande de faire : montre-lui le prix (pilotage, risque), puis il décide en le connaissant."
  },
  {
    id: "cp03-q22",
    dialecte: "Gestion de projet",
    q: "Lundi. Tout suit le plan : recette à l'heure, budget tenu, aucun risque nouveau. Tu as 30 minutes avec ton DSI. Que fais-tu ?",
    choix: [
      "« Rien de neuf, tout est vert, pas de besoin. » Et tu lui rends le temps",
      "Tu détailles les 30 cas de test passés, pour montrer le travail",
      "Tu proposes de passer le point à 1 heure, et de tout revoir",
      "Tu cherches un sujet à lui remonter, pour ne pas paraître vide"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Quand tout va bien, ça se dit en 2 minutes. Lui rendre son temps, c'est aussi ce qu'il attend : pas de bruit.",
      "Non. Le détail des tests ne lui sert à rien. Il juge le résultat, pas le volume de ton travail.",
      "Non. Plus de temps quand rien ne bouge, c'est du temps perdu pour vous deux. Le point s'allonge quand il y a des décisions.",
      "Non. Un sujet monté pour paraître utile lui prend du temps pour rien. Et le jour où un vrai sujet arrive, il se perd dans le reste."
    ],
    retenir: "Tout va bien ? Dis-le en 2 minutes : un point court est un bon point."
  },
  {
    id: "cp03-q23",
    dialecte: "Gestion de projet",
    q: "Ton DSI : « Je reçois 40 mails DEMAT par semaine en copie. Je ne les lis plus. » Que changes-tu ?",
    choix: [
      "Tu le retires de toutes les copies ; il verra tout au COPIL",
      "Rien : au moins, il ne pourra pas dire qu'il ne savait pas",
      "La fiche du lundi, et un appel le jour même si c'est grave",
      "Un résumé écrit des faits chaque soir, à la place des copies"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Moins de copies, oui. Mais plus rien jusqu'au COPIL : il apprendra les mauvaises nouvelles en séance, ou par d'autres.",
      "Non. Mettre en copie pour se couvrir, c'est le contraire d'informer : il ne lit plus, et l'important se perd.",
      "Oui. Le rythme normal : la fiche du lundi. Une mauvaise nouvelle : un appel, le jour même. Informer, c'est trier.",
      "Non. Presque : moins de bruit. Mais un résumé chaque soir, c'est encore trop, pour lui comme pour toi. Le lundi suffit, sauf urgence."
    ],
    retenir: "Informer ton DSI, c'est trier : le lundi pour le courant, le jour même pour le grave. Pas tout en copie."
  },
  {
    id: "cp03-q24",
    dialecte: "Gestion de projet",
    q: "Mercredi 10 h : la recette va déborder de 2 semaines, et la bascule de juin est menacée. Le DAF doit le savoir aujourd'hui. Ton DSI est en réunion toute la journée. Que fais-tu ?",
    choix: [
      "Ton DSI ce soir, à la sortie, puis le DAF demain à la 1re heure",
      "Un message court à ton DSI, puis le DAF dans la matinée",
      "Le DAF ce matin ; ton DSI, tu lui en parleras lundi, au point",
      "Rien avant le COPIL : d'ici là, la recette peut rattraper"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Presque : ton DSI d'abord, c'est juste. Mais une date menacée va au sponsor le jour même : attendre demain fait perdre un jour pour décider.",
      "Oui. En réunion, il lit un message de 2 lignes : il ne l'apprendra pas par d'autres. Le DAF est prévenu le jour même, comme il se doit.",
      "Non. Le DAF, oui, et vite. Mais ton DSI l'apprendrait par d'autres avant lundi : exactement la surprise qu'il ne veut pas.",
      "Non. Attendre en espérant rattraper, c'est le silence qui devient surprise. La date de juin est en jeu : le DAF doit pouvoir choisir."
    ],
    retenir: "Une mauvaise nouvelle : le sponsor le jour même, et ton DSI ne l'apprend jamais par d'autres. Un message suffit."
  },
  {
    id: "cp03-q25",
    dialecte: "Gestion de projet",
    q: "La règle : des jours en plus, c'est une commande signée par le DAF avant de commencer. Hier, tu as laissé le consultant faire 1 jour de plus sans elle. Personne ne l'a vu. Que fais-tu ?",
    choix: [
      "Tu le dis à ton DSI ; le DAF le saura au bilan de juillet",
      "Tu demandes au consultant de ne pas le compter, et tu n'en dis rien",
      "Rien : 750 €, la commande suivante le couvrira bien",
      "Tu le dis aujourd'hui au DAF et à ton DSI : ton erreur, la commande"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Presque : ton DSI le sait. Mais le DAF signe les commandes : en juillet, c'est une découverte, pas une information. Une erreur se dit vite, à qui décide.",
      "Non. Tu caches l'erreur sur le dos du prestataire, qui a travaillé à ta demande. Et la règle est contournée deux fois.",
      "Non. La facture le montrera : le DAF découvrira un jour sans commande, et que tu l'as caché. On pardonne une erreur, pas une surprise.",
      "Oui. Ton erreur, tu la dis toi-même, vite, simplement : le DAF décide de signer ou non, ton DSI ne l'apprend pas par la facture. Et la règle reprend."
    ],
    retenir: "Ton erreur, tu la dis toi-même, vite : on pardonne une erreur, pas une surprise."
  },
  {
    id: "cp03-q26",
    dialecte: "Gestion de projet",
    q: "Mardi. Le projet « étiquettes d'expédition » d'un collègue de la DSI a réservé le seul consultant qui connaît ton paramétrage, 2 semaines dès le 16 mars : le début de ta recette. L'intégrateur fige son planning vendredi. Que fais-tu ?",
    choix: [
      "Tu en parles à ton DSI lundi prochain, impact chiffré en main",
      "Rien : ta recette commencera par des tests qui n'ont pas besoin de lui",
      "Tu vois ton DSI dès demain : l'impact sur ta recette, tes options",
      "Tu appelles l'intégrateur, et tu exiges qu'il garde ce consultant pour toi"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Presque : le bon interlocuteur, et des chiffres. Mais lundi, le planning sera figé. Demander de l'aide tôt, c'est avant que les jeux soient faits.",
      "Non. Le seul consultant qui sait, absent 2 semaines au début de la recette : chaque anomalie attendra. C'est un risque à traiter, pas à subir.",
      "Oui. Ton DSI arbitre entre ses projets. Il lui faut l'impact (ta recette sans le seul consultant qui sait) et des options, avant vendredi : tôt, il peut encore agir.",
      "Non. Tu mets l'intégrateur au milieu de deux projets de ta propre DSI. Choisir entre eux, c'est le rôle de ton DSI."
    ],
    retenir: "Demander de l'aide tôt : avant que les jeux soient faits. Entre deux projets de la DSI, ton DSI arbitre."
  },
  {
    id: "cp03-q27",
    dialecte: "Gestion de projet",
    q: "Décembre. Pour installer le connecteur, il faudra ouvrir un accès réseau sécurisé vers la PA avant fin janvier. Tu ne l'as jamais fait. L'administrateur réseau de la DSI, lui, sait le faire. Que fais-tu ?",
    choix: [
      "Tu te formes au réseau, et tu le fais toi-même : quelques soirs suffiront",
      "Tu demandes dès cette semaine à ton DSI 1 jour de son expert",
      "Tu en parleras à ton DSI fin janvier, si la PA n'a rien fait",
      "Tu demandes à l'intégrateur de s'en charger : il installe le connecteur"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Des soirs à apprendre un métier qui existe déjà à la DSI, pendant que personne ne pilote. Et une erreur de sécurité, faite sans relecture.",
      "Oui. Le besoin est connu tôt : tu le dis tôt. Le temps de l'administrateur, c'est ton DSI qui le donne. Avec une date, il peut le planifier.",
      "Non. Fin janvier, c'est trop tard : ton DSI ne pourra plus planifier son administrateur. Et la PA ne fait que son côté ; l'ouverture chez vous, c'est la DSI.",
      "Non. Presque : faire faire, oui. Mais le réseau est celui de la DSI : un prestataire n'y touche pas sans elle. Et ses jours en plus demandent une commande."
    ],
    retenir: "Ce que tu ne sais pas faire, tu le demandes tôt à qui sait : les équipes de la DSI passent par ton DSI."
  },
  {
    id: "cp03-q28",
    dialecte: "Gestion de projet",
    q: "Avant chaque choix, même l'ordre des tests ou un créneau, tu demandes à ton DSI : « Tu ferais quoi ? » Il finit par te dire : « C'est ton projet. » Que changes-tu ?",
    choix: [
      "Dans ta délégation, tu décides et tu l'informes ; ailleurs, ta recommandation",
      "Tu lui écris tes questions, avec les options, et il répond quand il peut",
      "Tu ne lui parles plus de tes choix, jusqu'au prochain COPIL",
      "Tu demandes au DAF, ton sponsor, de trancher à sa place"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Ce qui est dans ta délégation (l'ordre des tests, un créneau), tu le décides, puis tu l'informes. Le reste, tu viens avec ta recommandation, pas avec une question ouverte.",
      "Non. Presque : des options, et moins de temps pris en direct. Mais il décide toujours à ta place, même dans ta délégation.",
      "Non. L'excès inverse : plus de questions, mais plus d'informations non plus. Il découvrira tout en séance.",
      "Non. Tu changes juste de personne : le DAF n'a pas à choisir l'ordre de tes tests. Ces choix sont à toi."
    ],
    retenir: "Dans ta délégation, tu décides et tu informes. Pour le reste, tu viens avec une recommandation."
  },
  {
    id: "cp03-q29",
    dialecte: "Gestion de projet",
    q: "Ton DSI, à la sortie du COPIL : « Chaque mois, je découvre en séance les décisions à prendre. » Que changes-tu ?",
    choix: [
      "Tu fais prendre ces décisions au DAF en direct, hors COPIL",
      "Tu lui fais valider chaque option avant de la montrer au DAF",
      "Rien : le rapport part 3 jours avant le COPIL, c'est la règle pour tous",
      "Ta fiche du lundi annonce les décisions à venir : laquelle, qui, quand"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Tu contournes le COPIL, et ton DSI, qui y siège, ne voit plus rien du tout.",
      "Non. Presque : il les voit avant. Mais en faire un passage obligé ralentit tout, et c'est le DAF qui décide, pas lui.",
      "Non. 3 jours, c'est pour lire le rapport. Ton DSI veut voir venir plus tôt, pour pouvoir peser sur ces décisions.",
      "Oui. Anticiper, c'est annoncer les décisions des semaines à venir : laquelle, qui décide, pour quand. Ton DSI n'est plus surpris, et peut préparer le terrain avec toi."
    ],
    retenir: "Anticiper : chaque lundi, les décisions à venir (laquelle, qui, pour quand). Personne ne les découvre en séance."
  },
  {
    id: "cp03-q30",
    dialecte: "Gestion de projet",
    q: "Au COPIL de mars, tu vas demander 2 jours du support N2 pour surveiller les flux EDI du pilote. Le N2 dépend de ton DSI, qui siège au COPIL. Que fais-tu avant ?",
    choix: [
      "Tu demandes au DAF d'imposer ces 2 jours à ton DSI, en séance",
      "Tu envoies l'ordre du jour à ton DSI 3 jours avant, comme à tous",
      "Tu vois ton DSI avant : besoin, dates, et ce que le run reporte",
      "Tu demandes aux techniciens du N2, en direct, s'ils sont d'accord"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Tu passes par le sponsor pour forcer ton propre chef : tu perds sa confiance pour 2 jours.",
      "Non. Presque : il est informé avant. Mais par l'ordre du jour, il découvre une demande sur ses équipes sans avoir pu en parler. Ça se cale avec lui, avant.",
      "Oui. Personne ne découvre en séance une demande qui le touche, ton DSI compris. Avant le COPIL, vous calez le besoin, les dates, et ce que le run reportera.",
      "Non. Presque : tu prépares, mais avec les mauvaises personnes. Le temps du N2, c'est ton DSI qui en dispose."
    ],
    retenir: "Une demande qui touche les équipes de ton DSI se prépare avec lui, avant le COPIL."
  },
  {
    id: "cp03-q31",
    dialecte: "Gestion de projet",
    q: "Avril 2027. La PA annonce la version 2 de son connecteur ; la version 1 ne sera plus maintenue après décembre. Ta bascule de juin se fera en version 1. Que fais-tu ?",
    choix: [
      "Tu passes en version 2 avant la bascule : un seul changement à faire",
      "Rien pour l'instant : la PA préviendra bien avant décembre",
      "Tu le mets dans les risques du bilan de juillet, pour ton DSI",
      "Tu proposes dès maintenant à ton DSI un passage à l'automne, chiffré"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Changer de version juste avant la bascule, c'est refaire des tests et risquer la date. Et les changements sont gelés dès le pilote de mai.",
      "Non. Subir, c'est découvrir en novembre qu'il faut des jours d'intégrateur et un budget que personne n'a prévus.",
      "Non. Presque : ton DSI et le run porteront ce passage. Mais en juillet, sans proposition, il aura perdu 3 mois pour le planifier et le budgéter.",
      "Oui. Proposer plutôt que subir : la charge, le coût, une date à l'automne, après la bascule et avant décembre. Ton DSI peut le prévoir."
    ],
    retenir: "Anticiper, c'est proposer tôt, chiffré, à celui qui décidera, au lieu de subir l'échéance."
  },
  {
    id: "cp03-q32",
    dialecte: "Gestion de projet",
    q: "Février. Tu as posé depuis longtemps une semaine de congé en mai, en plein pilote. Personne d'autre ne connaît tout le projet. Que fais-tu ?",
    choix: [
      "Tu prépares avec ton DSI, dès maintenant, qui te supplée, et tu le formes",
      "Tu demandes au consultant de piloter à ta place cette semaine-là",
      "Tu pars, et tu resteras joignable tous les jours, au cas où",
      "Tu annules ta semaine : le pilote passe avant tout le reste"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Voir venir, c'est aussi voir ta propre absence. Ton DSI choisit qui te supplée ; tu lui passes le relais (décisions en cours, risques, contacts), et le DAF le sait. Le projet ne dépend plus d'une seule personne.",
      "Non. Presque : quelqu'un te supplée. Mais le prestataire ne pilote pas son propre contrat, et ne rend pas compte au DAF à ta place. Le suppléant vient de la DSI.",
      "Non. Joignable tous les jours, ce n'est ni un congé, ni un relais : chaque question t'attendra. Il faut un suppléant, préparé avant.",
      "Non. Le réflexe du héros : le projet repose sur toi seul, et la prochaine absence (une maladie) n'aura pas de relais. Un suppléant préparé règle le vrai problème."
    ],
    retenir: "Anticiper, c'est aussi préparer ta propre absence : un suppléant choisi avec ton DSI, et un relais préparé."
  },
  {
    id: "cp03-q33",
    dialecte: "Gestion de projet",
    q: "Ton projet Snowflake + Power BI : 30 k€. Le sponsor : « La direction veut 10 % de moins. Débrouille-toi. » Que fais-tu ?",
    choix: [
      "Tu demandes à voir la direction, options chiffrées en main",
      "Sous 1 semaine, 2 options chiffrées et leur risque",
      "Tu retires 3 k€ de tests : personne ne verra la différence",
      "Tu refuses : le budget est validé, on n'y touche plus"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Presque : des options chiffrées, oui. Mais tu passes au-dessus du sponsor sans les lui avoir montrées. C'est lui qui porte le budget, et qui choisit.",
      "Oui. « Débrouille-toi » ne veut pas dire « décide seul ». Tu proposes, par exemple 2 tableaux de moins, ou une partie plus tard, chacun avec son risque. Le sponsor choisit.",
      "Non. Tu décides seul, et la qualité paie en silence. Le sponsor croit le projet intact ; les erreurs arriveront en production.",
      "Non. Un budget validé peut changer, par décision du sponsor. Refuser sans options, c'est subir autrement : il décidera sans toi."
    ],
    retenir: "Proposer plutôt que subir : face à une contrainte, 2 options chiffrées avec leur risque. Le sponsor choisit."
  },
  {
    id: "cp03-q34",
    dialecte: "Gestion de projet",
    q: "Tu es DSI adjoint : 5 projets en cours. Tu ne peux plus lire tous les comptes rendus. Que regardes-tu chaque semaine ?",
    choix: [
      "Tous les comptes rendus quand même, le soir et le week-end s'il le faut",
      "Rien : tu fais confiance, et tu verras bien aux COPIL",
      "Une ligne par projet, toujours la même : écarts, risques, décisions",
      "Seulement le plus gros projet, et ses risques : les autres attendront le COPIL"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Tu lis tout, et tu ne vois plus rien : le détail cache les écarts. Et tes soirées n'y suffiront pas.",
      "Non. Au COPIL, il est souvent trop tard pour aider. Ce que tu attendais de ton DSI, tu le dois à tes chefs de projet.",
      "Oui. Une ligne par projet, les mêmes rubriques : ce qui dévie, ce qui menace, ce qui doit être décidé. Tu creuses seulement là où ça bouge.",
      "Non. Presque : tu tries. Mais un petit projet peut cacher le plus gros risque. Chaque projet a sa ligne."
    ],
    retenir: "Plusieurs projets : une ligne par projet (écarts, gros risques, décisions à venir). Tu creuses là où ça bouge."
  },
  {
    id: "cp03-q35",
    dialecte: "Gestion de projet",
    q: "Tu es DSI adjoint. Tu confies à une cheffe de projet junior un état de stock dans Divalto, pour les 3 dépôts. Que lui donnes-tu au départ ?",
    choix: [
      "Le résultat, ses marges, ce qu'elle décide seule, un point chaque lundi",
      "Ton planning, tâche par tâche, avec ses jalons, déjà fait pour elle",
      "Le titre du projet, sans plus : elle apprendra en le faisant",
      "Ta validation, avant chacune de ses décisions, même petites"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Ce que ton DSI t'a donné : un résultat, des marges (délai, budget), ce qu'elle décide seule, un rendez-vous. Elle pilote ; tu suis.",
      "Non. Tu fais son travail : elle exécute ton plan, et n'apprend pas à planifier.",
      "Non. Sans résultat attendu ni limites, elle ne sait ni quoi viser, ni quand venir te voir.",
      "Non. Tout valider, c'est décider à sa place, et faire de toi le goulot de tous tes projets."
    ],
    retenir: "Confier un projet : le résultat attendu, des marges, ce qu'il décide seul, et un point régulier."
  },
  {
    id: "cp03-q36",
    dialecte: "Gestion de projet",
    q: "Tu es DSI adjoint. Un chef de projet t'appelle chaque jour pour savoir quoi faire : « Je relance la PA ou j'attends ? » Que fais-tu ?",
    choix: [
      "Tu demandes à ton DSI de le changer de projet",
      "Tu ne réponds plus, et tu le laisses apprendre seul",
      "Tu réponds à chaque fois, le jour même : c'est rapide, et tu sais",
      "Tu lui demandes : « Que proposes-tu ? » ; il vient avec son avis"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Il demande trop : ce n'est pas une faute, c'est un réflexe de débutant. Tu peux l'aider à le perdre.",
      "Non. Le lâcher d'un coup, sans méthode, c'est le laisser seul face à des décisions qu'il ne sait pas encore prendre.",
      "Non. Tu décides à sa place, chaque jour : il ne grandit pas, et tu deviens le chef de projet de tous tes projets.",
      "Oui. Ce que ton DSI attendait de toi : il vient avec ses options et sa recommandation. Tu valides ou tu corriges, et il apprend à décider."
    ],
    retenir: "DSI adjoint : « Que proposes-tu ? » plutôt que la réponse. Ils viennent avec leurs options."
  },
  {
    id: "cp03-q37",
    dialecte: "Gestion de projet",
    q: "Tu es DSI adjoint. Ton chef de projet de la migration Divalto, ancien développeur, adapte lui-même les spécifiques, le soir. Son rapport mensuel n'est pas arrivé ; ses risques ne sont plus suivis. Que fais-tu ?",
    choix: [
      "Tu reprends le pilotage de sa migration, et il garde le code",
      "Tu le vois : ce que tu attends, et comment faire faire",
      "Rien : son projet avance, et c'est bien l'essentiel pour la DSI",
      "Tu lui écris de ne plus jamais toucher au code, même un soir"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Tu fais à sa place ce que tu lui reproches de faire à la place de l'intégrateur. Il n'apprend rien.",
      "Oui. Tu lui dis ce que tu attends (piloter, rendre compte, faire faire), et tu l'aides à confier les adaptations à l'intégrateur. Un réflexe à changer, pas une faute grave (module cp26).",
      "Non. Sans rapport ni suivi des risques, le projet avance sans pilote. Les surprises arriveront plus tard, en plus gros.",
      "Non. Un mail d'interdiction ne dit ni pourquoi, ni comment faire autrement. Et « jamais » est faux : en urgence, il le pourra encore."
    ],
    retenir: "Tu es DSI adjoint : tu attends de tes chefs de projet qu'ils pilotent et fassent faire, et tu les y aides."
  },
  {
    id: "cp03-q38",
    dialecte: "Gestion de projet",
    q: "Tu es DSI adjoint. Vendredi 18 h, une cheffe de projet t'apprend que sa recette est bloquée depuis lundi : un flux Divalto ne passe plus. Elle a cherché seule toute la semaine. Que lui dis-tu d'abord ?",
    choix: [
      "« Pourquoi seulement maintenant ? Ça ne doit plus jamais arriver, compris ? »",
      "« Laisse, je m'en occupe moi-même ce week-end »",
      "« Merci de me le dire. Les faits, ton plan : de quoi as-tu besoin ? »",
      "« Tu devais m'alerter lundi : je le note pour ton entretien annuel »"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Le reproche d'abord, et la prochaine fois elle attendra encore plus. Le « plus tôt, la prochaine fois » viendra, mais après.",
      "Non. Tu reprends son sujet : elle n'apprend rien, et tu deviens le recours de chaque blocage.",
      "Oui. Une mauvaise nouvelle doit être facile à t'apporter : merci d'abord. Puis les faits, son plan, son besoin. Plus tard, au calme : « le jour même, la prochaine fois ».",
      "Non. La sanction avant les faits : elle retiendra surtout qu'il vaut mieux se taire. Et la recette attend toujours."
    ],
    retenir: "Une mauvaise nouvelle doit être facile à t'apporter : d'abord merci, puis les faits et le plan."
  },
  {
    id: "cp03-q39",
    dialecte: "Gestion de projet",
    q: "Tu es DSI adjoint. Le N2 t'appelle encore pour chaque rejet EDI difficile : tu restes le seul à savoir. Ton agenda déborde. Que fais-tu ?",
    choix: [
      "Tu ne prends plus les appels du N2 : ce n'est plus ton rôle",
      "Tu nommes un référent EDI dans l'équipe, formé avec toi, puis tu te retires",
      "Tu confies tout l'EDI à un prestataire extérieur, avec un contrat de support",
      "Tu continues, et tu prends ces appels le soir, après ta journée"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Couper d'un coup laisse le N2 sans solution, et les rejets s'accumulent chez les clients.",
      "Oui. Tu transmets : un référent nommé dans ton équipe, formé avec toi sur de vrais cas, puis tu te retires. Faire faire, à ton nouveau niveau : c'est ton équipe, tu peux le nommer.",
      "Non. Trop fort : un savoir à transmettre ne justifie pas un contrat. Et tu crées une dépendance à un prestataire.",
      "Non. Seul à savoir, c'est un risque pour la DSI (le jour où tu es absent), et du temps pris à ton nouveau rôle."
    ],
    retenir: "DSI adjoint : tu ne restes pas le seul expert. Tu transmets, puis tu te retires."
  },
  {
    id: "cp03-q40",
    dialecte: "Gestion de projet",
    q: "Mardi. Le consultant a corrigé une anomalie mineure de la recette : testée, tracée, sans effet sur le planning. Faut-il prévenir ton DSI ?",
    choix: [
      "Oui, aujourd'hui : un mail court, pour qu'il sache tout",
      "Rien de spécial : une ligne sur ta fiche de lundi suffit",
      "Tu le mets en copie du ticket et de la correction",
      "Oui, le jour même : un appel, il ne doit rien apprendre par d'autres"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Un mail de plus pour une bonne nouvelle mineure : c'est le bruit qui noie l'important. Le lundi suffit.",
      "Oui. Rien de grave, rien à décider : une ligne le lundi suffit. Le jour même, c'est pour une mauvaise nouvelle ou une décision à prendre.",
      "Non. Une copie de plus, qu'il ne lira pas. Informer, c'est trier : le courant va sur la fiche du lundi.",
      "Non. Presque : il ne doit rien apprendre par d'autres, c'est vrai pour une mauvaise nouvelle. Ici, rien n'est grave : un appel le dérangerait pour rien."
    ],
    retenir: "Le courant va sur la fiche du lundi ; le jour même, c'est pour le grave ou pour une décision à prendre."
  }
];
