// Parcours « Maîtriser les outils du chef de projet » — Questions du module ot05 « Outils pour livrer ».
// Ce qu'elles vérifient : quel outil prendre, comment s'en servir sur le site, lire un résultat (un total, un écart, une
// alerte), la règle clé de l'outil, le piège. Outils : gp-recette (q01 à q03), gp-reprise (q04 à q06),
// gp-conduite-changement (q07 à q09), gp-bascule (q10 à q12), gp-bilan (q13 à q15). Règles et mots : ceux des outils et
// de leurs cours (cp08, cp15, cp19 à cp23), mot pour mot ; textes des alertes, totaux et niveaux recalculés avec le moteur
// (js/outils.js) : « Bloquantes ouvertes (0 pour le PV) » (q01) ; « Fixe la gravité avec le métier, sur les
// définitions. » (q02) ; écart 600 − 598 − 6 = -4, « Fiches en trop » (q04) ; 19 rejets expliqués sur 20 (q05) ;
// 300 × 10 ÷ 60 = 50 h (q06) ; « Message porté par » vide (q08) ; « Non » sur un critère (q10) ; plus de 5 actions (q14).
// Fil rouge DEMAT 2027 (fiche fil rouge de docs/plan-chef-de-projet.md, qui fait foi) : recette de 120 cas, PV fin avril,
// correctifs du mardi, lot de non-régression (q01 à q03) ; essai 2 des 15 et 16 mai, 300 fiches sans SIREN en décembre
// 2026 (q04 à q06) ; formation de la compta en mai, rattrapage en juin, commerciaux informés (q07 à q09) ; go / no-go du
// vendredi 11 juin, sauvegarde du samedi 12 par le N2, signal de plus de 5 % de rejets le lundi matin, décision du DAF
// avant 12 h (q10 à q12) ; bilan au COPIL du 13 juillet, référence de 85 250 €, intégrateur à 42 jours au lieu de 40,
// REX du 30 juin (q13 à q15).
// Faits ajoutés (cohérents avec la fiche et les exemples des outils, à valider) : 115 cas OK sur 120 et une bloquante fin
// avril, corrigée avant le PV du 30 (q01) ; 3 gravités pas encore fixées (q02) ; 598 fiches fournisseurs comptées
// chargées à l'essai 2, avant le rapprochement (q04) ; 19 rejets clients expliqués sur 20 le samedi 15 mai, signature le
// dimanche 16 (q05) ; 9 actions au REX avant le tri (q14) ; le consultant qui accuse Marc (q15).
// Variantes propres à une question (le temps d'une question, sans changer la fiche) : une majeure encore ouverte le
// 11 juin (q10 ; dans la fiche et l'exemple de gp-bascule, les 6 critères sont atteints) ; 7 % de rejets à 9 h 30 le
// lundi 14 (q12). Aucune affirmation juridique hors de la fiche.
// Déjà publiées ailleurs, avec un autre angle (la règle, pas l'outil) : cp19-q18, q19, q25, q29 ; cp20-q40, q43, q45 ;
// cp21-q06, q13, q18, q23 ; cp22-q29 à q33 ; cp23. Ici, la question part de l'écran de l'outil : un total, un niveau,
// une alerte, une rubrique.
// Anti-devinette (calcul sans connaître le sujet, script de l'expert) : la bonne réponse est un extrême dans 3 questions
// sur 11 avec un axe d'action (la plus forte : q05, q10 ; la plus petite : q11, le « D'accord » simple). Règles : action
// moyenne 36 %, plus petite action réelle 18 %, la plus forte si urgence 0 % (q12), jamais / toujours le sponsor 24 / 25 %,
// choix à deux actions 32 %, la plus longue 20 %, extrêmes écartés + chiffre 43 %, + mot de méthode 35 %, « écarter
// absolus, oui, DAF » 35 %. « « Non : » », « tout de suite », « D'accord » aussi dans des bonnes réponses.
LEARNSQL.questions.ot05 = [
  {
    id: "ot05-q01",
    dialecte: "Gestion de projet",
    q: "Fin avril. Le consultant : « 96 % des cas sont OK, on signe le PV ? » Sous ton cahier de recette : « OK » 115 sur 120 ; « Bloquantes ouvertes (0 pour le PV) » 1 ; « Majeures ouvertes (0 pour le PV) » 0. Que réponds-tu ?",
    choix: [
      "« Oui : 96 % de cas OK, c'est mieux que ce qu'on espérait »",
      "« Oui, et la bloquante en réserve, datée au 9 juillet »",
      "« Pas encore : la bloquante d'abord, corrigée et rejouée OK »",
      "« Pas encore : on rejoue les 120 cas, puis on signe »"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Un pourcentage cache les bloquantes : une seule peut arrêter un flux entier. « 0 pour le PV » n'est pas tenu.",
      "Non. Une réserve vise un défaut mineur, précis et daté. Une bloquante ne se met pas en réserve : elle se corrige avant le PV.",
      "Oui. Pas de PV tant qu'une bloquante ou une majeure est ouverte : corrigée, puis rejouée OK par le testeur, avec le lot de non-régression.",
      "Non. Trop : on rejoue le cas corrigé et le lot de non-régression (15 à 20 cas clés), pas les 120."
    ],
    retenir: "Le PV se lit sur les bloquantes et les majeures, à part : 0 pour les deux. Un pourcentage les cache."
  },
  {
    id: "ot05-q02",
    dialecte: "Gestion de projet",
    q: "Ton cahier de recette affiche 3 alertes : « Fixe la gravité avec le métier, sur les définitions. » Le consultant propose de remplir lui-même la colonne « Gravité », « pour aller vite ». Que réponds-tu ?",
    choix: [
      "« D'accord : tu corriges, tu sais ce qui est long »",
      "« Non : le métier la fixe, avec moi, d'après les définitions »",
      "« D'accord, et le DAF tranchera les gravités contestées »",
      "« Non : je la fixe pour le métier, d'après les définitions »"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Celui qui corrige jugerait la gravité de son propre travail : il aurait intérêt à la baisser.",
      "Oui. Bloquante, majeure, mineure : des définitions écrites. Le métier fixe la gravité, avec toi, sur ces définitions. Pas celui qui corrige.",
      "Non. Le DAF n'a pas à trancher chaque ticket : des définitions écrites, appliquées par le métier, suffisent.",
      "Non. Presque : les définitions, oui. Mais c'est le métier qui sait si on peut encore facturer ou recevoir. Tu l'aides."
    ],
    retenir: "La gravité d'une anomalie se fixe par le métier, avec toi, sur des définitions écrites. Pas par celui qui corrige."
  },
  {
    id: "ot05-q03",
    dialecte: "Gestion de projet",
    q: "Mardi, livraison d'un correctif sur la TVA des avoirs clients, un réglage commun. Dans ton cahier de recette, que fait-on rejouer mercredi ?",
    choix: [
      "Le seul cas corrigé : le reste marchait déjà avant",
      "Le cas corrigé, et les cas « Oui » du lot de non-régression",
      "Les 120 cas du cahier de recette, pour être sûrs de ne rien casser",
      "Rien : le consultant a testé chez lui avant de livrer"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Un correctif peut casser ailleurs, surtout un réglage commun comme la TVA.",
      "Oui. Après chaque livraison : le cas corrigé, et le lot de non-régression (15 à 20 cas clés, marqués « Oui »). Pas tout, jamais rien.",
      "Non. Rejouer les 120 après chaque livraison prendrait toute la recette : pas tout, jamais rien.",
      "Non. Ses tests vérifient ce qu'il a construit. La recette, c'est le métier, dans la copie de recette."
    ],
    retenir: "Après chaque livraison : le cas corrigé et le lot de non-régression (15 à 20 cas clés). Pas tout, jamais rien."
  },
  {
    id: "ot05-q04",
    dialecte: "Gestion de projet",
    q: "Contrôles de l'essai 2, fiches fournisseurs : extraites 600, chargées 598, rejetées 6. L'outil affiche « Écart -4 · Fiches en trop ». Que fais-tu ?",
    choix: [
      "Rien : des fiches en plus, c'est que rien n'est perdu",
      "Tu fais rapprocher fiche par fiche : d'où viennent les 4 ?",
      "Tu corriges « Chargées » à 594 : l'écart revient à 0, c'est juste",
      "Tu relances l'essai 2 en entier, dès ce soir"
    ],
    bonne: 1,
    pourquoi: [
      "Non. 4 fiches de trop : des doublons, ou des fiches chargées et rejetées à la fois. Un écart s'explique dans un sens comme dans l'autre.",
      "Oui. Extraites = chargées + rejetées : ici, 4 de trop. Un rapprochement fiche par fiche, sur le code, dit d'où elles viennent. Expliqué, puis signé.",
      "Non. C'est maquiller le contrôle : la PA contient bien 598 fiches. Un chiffre se corrige quand il est faux, pas pour faire 0.",
      "Non. Trop tôt : on cherche d'abord la cause. Un 3e essai, seulement si elle remet en cause les règles."
    ],
    retenir: "Un écart, dans un sens ou dans l'autre, se rapproche fiche par fiche avant de signer."
  },
  {
    id: "ot05-q05",
    dialecte: "Gestion de projet",
    q: "Samedi 15 mai, essai 2, fiches clients : 2 000 extraites = 1 980 chargées + 20 rejetées. « Rejets expliqués » : 19. Le responsable ADV doit signer ce soir. L'outil affiche une alerte. Que fais-tu ?",
    choix: [
      "Il signe ce soir : l'écart est juste, et 19 sur 20, c'est 95 %",
      "Il signe, avec le 20e rejet en réserve, daté à lundi",
      "Pas ce soir : on trouve d'abord la cause du 20e rejet",
      "L'intégrateur signe à sa place : c'est son chargement"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Une seule fiche sans explication bloque la signature : elle peut cacher une règle fausse.",
      "Non. Presque : la réserve datée, c'est pour un PV de recette. Une reprise se signe quand chaque rejet a sa cause et son propriétaire.",
      "Oui. Chaque rejet : sa cause et son propriétaire. Le 20e expliqué, le responsable ADV signe, chiffres en main.",
      "Non. L'intégrateur ne valide pas son propre travail : le propriétaire au métier signe."
    ],
    retenir: "Une reprise se signe quand extraites = chargées + rejetées et que chaque rejet est expliqué ; par le propriétaire, pas l'intégrateur."
  },
  {
    id: "ot05-q06",
    dialecte: "Gestion de projet",
    q: "Décembre 2026. Rubrique « Qualité, mesurée avant » : 300 fiches clients sans SIREN, 10 minutes par fiche. L'outil calcule 50 h. Qui fait ce travail, et où ?",
    choix: [
      "L'ADV, dans Divalto ; ses 50 h se demandent au responsable ADV",
      "Le consultant, dans le fichier de transit, au moment du chargement",
      "Toi, par une requête qui remplit les SIREN dans la base",
      "La PA, après le chargement ; son support complète les fiches"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. On corrige à la source, dans Divalto, par le métier : l'ADV sait quel est le bon SIREN. Ses 50 heures se demandent à son manager, tôt.",
      "Non. Le fichier de transit est refait à chaque essai : la correction disparaît, et Divalto garde l'erreur.",
      "Non. Tes requêtes trouvent ; le métier confirme. Un UPDATE maison dans la base contourne les contrôles de Divalto, sans trace.",
      "Non. Les fiches partiraient fausses : les factures seraient rejetées, et Divalto resterait faux."
    ],
    retenir: "La qualité se mesure avant, en heures (fiches × minutes), et se corrige à la source, par le métier, avec le temps demandé à son manager."
  },
  {
    id: "ot05-q07",
    dialecte: "Gestion de projet",
    q: "Fin mai. Le DAF : « À la compta, qui n'est pas encore formé, et quand le sera-t-il ? » Quel outil ouvres-tu ?",
    choix: [
      "La conduite du changement : la formation, par nom",
      "Le go / no-go : le critère « Formation faite » et sa preuve",
      "Le cahier de recette : la colonne « Testeur » de chaque cas",
      "Le bilan de fin : l'axe « Adoption », comparé au départ"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. La formation, par nom : qui, quelle session, quand, présent ou absent, et la date du rattrapage. Un pourcentage cache qui manque.",
      "Non. Presque : ce critère dit « fait » ou pas, avec les feuilles signées en preuve. Le détail par nom, avec les rattrapages, est dans la conduite du changement.",
      "Non. Les testeurs, ce sont Julie, Sophie et Marc : la formation de toute la compta n'y est pas.",
      "Non. L'adoption se mesure au 3e mois, après la bascule. La question du DAF porte sur la formation, avant."
    ],
    retenir: "Qui est formé, qui manque, et quand il rattrape : la formation par nom, dans l'outil de conduite du changement."
  },
  {
    id: "ot05-q08",
    dialecte: "Gestion de projet",
    q: "Carte des impacts. Ligne « La compta », impact fort : « Message porté par » est vide, et l'outil le signale. Qui écris-tu ?",
    choix: [
      "Toi : tu connais le projet mieux que personne",
      "La cheffe comptable : la manager directe de l'équipe",
      "Le DAF : le sponsor dit pourquoi on change",
      "Julie et Sophie : les utilisatrices clés de la compta"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Toi, tu prépares et tu outilles : messages clés, dates, réponses. On écoute son chef, pas le chef de projet.",
      "Oui. Le « ce qui change pour moi » vient du manager direct. Toi, tu lui prépares les messages clés et les dates.",
      "Non. Presque : le DAF dit le pourquoi, au lancement. Le « ce qui change pour moi », au quotidien, c'est le manager direct.",
      "Non. Ce sont des relais : elles expliquent, et te remontent les questions. Le message de l'équipe, c'est leur manager qui le porte."
    ],
    retenir: "Dans la carte des impacts, le message de chaque population est porté par son manager direct ; le sponsor dit le pourquoi ; toi, tu outilles."
  },
  {
    id: "ot05-q09",
    dialecte: "Gestion de projet",
    q: "Carte des impacts, ligne « Les commerciaux » : rien à saisir, mais leurs clients les appelleront. Impact faible. Qu'écris-tu dans « Former, accompagner, informer » ?",
    choix: [
      "Informer : 10 minutes en réunion d'équipe, et une page",
      "Former : 2 sessions de 2 h sur les vrais cas, comme la compta",
      "Rien : ils ne touchent pas à l'outil, ce n'est pas pour eux",
      "Accompagner : un relais commercial pendant toute l'hypercare"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. L'effort suit l'impact : faible, on informe. Une page et 10 minutes, par leur directeur : ce qui change pour eux, et qui appeler.",
      "Non. Trop : ils n'utilisent pas l'outil. 4 heures de formation pour rien, et du temps commercial perdu.",
      "Non. Ils répondent aux clients : sans info, ils diront n'importe quoi sur une facture rejetée. Ceux qui répondent aux questions s'oublient souvent.",
      "Non. Un relais sert une équipe qui change sa façon de travailler. Pour eux, une info claire suffit."
    ],
    retenir: "L'effort suit l'impact : fort, on forme et on accompagne ; faible, on informe. Sans oublier ceux qui répondent aux questions."
  },
  {
    id: "ot05-q10",
    dialecte: "Gestion de projet",
    q: "Vendredi 11 juin, 11 h. Ta page de go / no-go : 5 critères « Oui » ; « Non » pour « 0 anomalie bloquante ou majeure ouverte » : une majeure reste. Que recommandes-tu ?",
    choix: [
      "Go : 5 critères sur 6, et la majeure a un contournement",
      "No-go : tu montres l'écart, et le DAF décide en le sachant",
      "Go sous conditions, et la majeure corrigée pendant l'hypercare",
      "Critère passé à « Presque » : un contournement existe"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Un critère non atteint ne se compense pas par les autres : 5 sur 6 n'est pas un go.",
      "Oui. Critère non atteint : tu recommandes le no-go, écart et prix en main. Le DAF peut décider d'y aller en connaissant le risque : c'est alors écrit.",
      "Non. L'hypercare traite les petits écarts, pas une majeure connue. Et sa correction tomberait pendant le gel.",
      "Non. Changer « Non » en « Presque » pour passer, c'est réécrire le critère la veille."
    ],
    retenir: "Un critère non atteint : no-go, ou le DAF décide en connaissant le risque. On ne le réécrit pas."
  },
  {
    id: "ot05-q11",
    dialecte: "Gestion de projet",
    q: "Plan de bascule, ligne « Sam. 12 juin · Sauvegarde complète de Divalto », encore vide. Le N2 (2e niveau du support) propose : « Qui : moi. Contrôle : restauration déjà essayée, fichiers présents, vérifié par toi. Si ça échoue : on ne touche pas Divalto, appel au DAF. » Que réponds-tu ?",
    choix: [
      "« D'accord : qui, quel contrôle, et quoi faire si ça échoue »",
      "« Trop détaillé : écris seulement la DSI, c'est son métier »",
      "« D'accord, mais retire le cas d'échec : il n'arrivera pas »",
      "« Non : une sauvegarde est technique, hors du plan »"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Chaque étape : un nom, un contrôle avec un nom, et quoi faire si elle échoue. La sauvegarde rend le retour possible : elle mérite tout ça.",
      "Non. « La DSI », ce n'est personne : samedi, chacun croira que l'autre l'a fait. Le plan veut un nom, vu avec son manager.",
      "Non. Le plan prévoit l'échec de chaque étape. Sans « si ça échoue », on improvise au pire moment.",
      "Non. Sans sauvegarde, pas de retour arrière possible : c'est une étape clé du plan, avec son contrôle."
    ],
    retenir: "Plan de bascule : chaque étape a un nom, un contrôle avec un nom, et ce qu'on fait si elle échoue."
  },
  {
    id: "ot05-q12",
    dialecte: "Gestion de projet",
    q: "Lundi 14 juin, 9 h 30 : 7 % de rejets, cause inconnue. Ta page dit : signal d'alerte « plus de 5 % de rejets le lundi matin » ; retour arrière décidé par le DAF, sur ta recommandation, avant 12 h. Que fais-tu ?",
    choix: [
      "Tu lances le retour arrière : le signal d'alerte est franchi",
      "Tu attends 11 h 30 pour voir si les rejets baissent seuls",
      "Tu appelles le DAF tout de suite, avec ta recommandation",
      "Tu fais corriger en production, puis tu informes le DAF"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Le signal appelle le DAF ; il ne lance pas seul le retour arrière. Le DAF le décide, sur ta recommandation.",
      "Non. À 11 h 30, il reste 30 minutes au DAF pour décider avant midi, le point de non-retour. Le signal est franchi : on appelle.",
      "Oui. Le signal est franchi : tu appelles le DAF tout de suite, avec les faits et ta recommandation. Il décide avant midi ; après, on corrige en avant.",
      "Non. Une correction en production, cause inconnue, sans test : un 2e risque. Et la décision n'est pas à toi."
    ],
    retenir: "Le signal d'alerte appelle le DAF ; il ne lance pas seul le retour arrière. Le DAF décide, avant le point de non-retour."
  },
  {
    id: "ot05-q13",
    dialecte: "Gestion de projet",
    q: "Bilan de fin, axe « Budget » : le total est sous la référence de 85 250 €, grâce à la réserve. Mais la ligne de l'intégrateur dépasse : + 2 jours, + 1 500 €. Qu'écris-tu dans « Écart et sa cause » ?",
    choix: [
      "« Aucun écart : le total est sous les 85 250 € »",
      "« Intégrateur : + 1 500 €, flux EDI chiffrés en bloc »",
      "« Écart couvert par les 8 000 € de réserve, rien à signaler »",
      "« À voir au COPIL du 13 juillet : le DAF tranchera »"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Un total sauvé par la réserve ne cache pas une ligne qui dépasse : l'écart de l'intégrateur a une cause, utile au prochain projet.",
      "Oui. Chaque écart a sa cause, contre la référence à jour : 2 jours de plus, des flux EDI chiffrés en bloc. Le REX en tire une action.",
      "Non. La réserve couvrait des risques ; ce dépassement a une cause précise. La taire, c'est la refaire au prochain projet.",
      "Non. Il n'y a rien à trancher : les jours ont été commandés et signés. Le bilan explique l'écart et sa cause."
    ],
    retenir: "Au bilan, chaque écart a sa cause, ligne par ligne : un total sauvé par la réserve ne cache pas une ligne qui dépasse."
  },
  {
    id: "ot05-q14",
    dialecte: "Gestion de projet",
    q: "REX du 30 juin. Ton tableau compte 9 lignes « On change », chacune avec une action. L'outil affiche une alerte. Que fais-tu ?",
    choix: [
      "Tu gardes les 9 : chaque leçon compte, aucune ne se perd",
      "Tu gardes les 3 à 5 plus utiles, toutes avec un nom",
      "Tu envoies les 9 au DAF : il choisit celles qu'on garde",
      "Tu passes des lignes en « On garde » : l'alerte s'en va"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Plus de 5 actions : personne ne les relira. Un REX que personne ne relit n'a servi à rien.",
      "Oui. 3 à 5 actions nommées, dans le modèle de projet de la DSI, lues au prochain cadrage. Les autres constats restent écrits.",
      "Non. Le REX est le travail de l'équipe, pas une décision du sponsor. À vous de choisir les plus utiles.",
      "Non. Ce sont des choses à changer : les classer « On garde » fausse le REX pour faire taire l'alerte."
    ],
    retenir: "Un REX utile : 3 à 5 actions nommées, écrites dans le modèle de projet, lues au prochain cadrage."
  },
  {
    id: "ot05-q15",
    dialecte: "Gestion de projet",
    q: "REX du 30 juin. Le consultant : « Le retard des flux EDI, c'est Marc : il a donné ses règles tard. » Qu'écris-tu dans la colonne « Constat » ?",
    choix: [
      "« Marc a donné ses règles EDI en retard, d'où les 2 jours de plus »",
      "« Intégrateur : 42 jours au lieu de 40, à cause des flux EDI »",
      "Rien : ce point tourne au conflit, tu le sors du REX",
      "« Retard des flux EDI : faute partagée de l'ADV et de l'intégrateur »"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Un coupable, pas un fait : Marc se taira au prochain REX, et la cause réelle reste cachée.",
      "Oui. Un fait, tiré des registres, sans coupable. Sa cause (des flux chiffrés en bloc, sans ceux qui les connaissent) donne l'action : chiffrer chaque flux avec Marc.",
      "Non. C'est le sujet qui a coûté le plus : le sortir du REX, c'est le refaire au prochain projet. On le ramène aux faits.",
      "Non. Toujours des coupables, juste plus nombreux. Le REX cherche les causes, pas les fautes."
    ],
    retenir: "Un REX sans coupable : des faits et des causes, tirés des registres ; puis une action avec un nom."
  }
];
