// Parcours « Maîtriser les outils du chef de projet » — Questions du module ot04 « Outils pour les prestataires ».
// Ce qu'elles vérifient : quel outil prendre, comment s'en servir sur le site, lire un résultat (un total, un calcul, une
// alerte), la règle clé de l'outil, le piège. Outils : gp-choix-prestataire (q01 à q06), gp-contrat (q07 à q10),
// gp-echeancier (q11 à q15). Règles et mots : ceux des outils et de leurs cours (cp13, cp14, cp15, cp27), mot pour mot ;
// calculs recalculés avec le moteur (js/outils.js) : points 15 × 3 ÷ 5 = 9 et 15 × 4 ÷ 5 = 12 (q03) ; disponibilité
// d'avril (720 − 6) ÷ 720 = 99,17 % (q08) et de mai (744 − 4) ÷ 744 = 99,46 % (q09) ; date limite 31/03/2029 moins
// 3 mois = 31/12/2028 (q12) ; 30/11/2029 moins 6 mois = 30/05/2029, avant la relecture de septembre 2029 (q13) ;
// 30/06/2028 moins 3 mois = 30/03/2028, passée en octobre 2028 (q14) ; l'export Excel garde les points en formules
// (poids × note ÷ 5) et les totaux (q06).
// Fil rouge DEMAT 2027 (fiche fil rouge de docs/plan-chef-de-projet.md, qui fait foi) : grille validée par le DAF avant
// les offres, éliminatoires, critère « Connecteur Divalto et sécurité » noté par la DSI, 2 clients de référence appelés
// par finaliste (q01, q02, q05) ; contrat de la PA, SLA de 99,5 % par mois, jour et nuit, rapport à 99,8 % et 6 h de
// panne en avril, SLA raté en mai (q08, q09) ; contrat de la PA jusqu'au 30 novembre 2029, préavis de 6 mois, liens
// télécoms au 31 mars 2029, préavis de 3 mois (q12, q13 ; cp27-q38). « Tu es DSI adjoint » : q11 à q15 (2028-2029).
// Faits ajoutés (cohérents avec la fiche, à valider) : l'offre C à 81 points mais « Non » à un éliminatoire (q02) ; un
// prix de mise en service absent de l'offre B (q04) ; des pannes du connecteur de B citées par ses références (q05) ; un
// plafond de responsabilité très bas (q07) ; une clause de recette tacite à 5 jours dans le projet de contrat (q10) ; un
// contrat de maintenance des imprimantes des dépôts (q14) ; le DAF qui choisit « Changer » en mai 2029 (q15).
// Affirmations juridiques (générales, à faire vérifier) : un contrat reconduit tacitement court pour la nouvelle période ;
// en sortir avant, c'est ce que le contrat permet, souvent avec un coût (q14). Le reste est dans la fiche (le juridique au
// DAF, avec un avocat si besoin : q07 ; l'avenant après la signature : q10).
// Déjà publiées ailleurs, avec un autre angle (la règle, pas l'outil) : cp13 (grille), cp14-q34, q35, cp15-q16, q19,
// q22, cp27-q38. Ici, la question part de l'écran de l'outil : une rubrique, un calcul, une alerte, un bouton.
// Anti-devinette (calcul sans connaître le sujet, script de l'expert) : la bonne réponse est un extrême dans 3 questions
// sur 11 avec un axe d'action (la plus forte : q04, q13 ; la plus petite : q07). Règles : action moyenne 36 %, plus petite
// action réelle 9 %, jamais / toujours le sponsor 23 / 23 %, choix à deux actions 18 %, la plus longue 22 %, extrêmes
// écartés + chiffre 30 %, + mot de méthode 29 %, « écarter absolus, oui, DAF » 22 %. « D'accord » est la bonne réponse en
// q05 (et un choix faux en q05, q15) ; « maintenant », « tous » aussi dans des bonnes réponses.
LEARNSQL.questions.ot04 = [
  {
    id: "ot04-q01",
    dialecte: "Gestion de projet",
    q: "Octobre 2026. Les offres des 3 PA (plateformes agréées) arrivent demain. Ta grille de choix est prête, mais « Grille validée par, le » est vide : le DAF n'a pas eu le temps. Que fais-tu ?",
    choix: [
      "Tu ouvres les offres demain ; il validera la grille en les lisant",
      "Tu lui fais valider critères et poids avant d'ouvrir, même par mail",
      "Tu valides la grille toi-même : c'est ton outil, tu la connais",
      "Tu repousses de 2 semaines la réponse des 3 PA, le temps qu'il lise"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Lire les offres avant de valider la grille, c'est risquer de la changer après : choisir le gagnant d'abord.",
      "Oui. Critères et poids se valident AVANT d'ouvrir les offres, par celui qui choisira. Un mail du DAF suffit : tu écris « le DAF, le … » dans la rubrique.",
      "Non. Le décideur valide la grille : c'est lui qui choisira sur elle. Validée par toi seul, elle sera contestée.",
      "Non. Trop fort : un délai ne s'allonge que pour une raison de la consultation. Une validation se fait en une journée."
    ],
    retenir: "La grille (éliminatoires, critères, poids) est validée par le décideur avant d'ouvrir les offres."
  },
  {
    id: "ot04-q02",
    dialecte: "Gestion de projet",
    q: "Ta grille de choix : l'offre C a le meilleur total, 81 sur 100. Mais pour l'éliminatoire « Réception possible dès novembre », elle a « Non ». Que fais-tu ?",
    choix: [
      "C gagne : 81, c'est le meilleur total de toute la grille",
      "C sort ; tu lui écris pourquoi, et tu compares A et B",
      "Tu retires ce critère de la grille : il élimine la meilleure offre",
      "Tu le signales au DAF, et il choisit entre C et le critère"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Un éliminatoire ne se compense pas : raté, l'offre sort, quelles que soient ses notes.",
      "Oui. Un critère éliminatoire ne se compense pas : l'offre qui le rate sort. Tu lui écris la raison, poliment, sur son offre.",
      "Non. Changer la grille après avoir vu les offres, c'est choisir le gagnant d'abord. Et la réception est déjà obligatoire.",
      "Non. Le DAF a validé la grille avant les offres : elle a déjà tranché. Rien à lui redemander."
    ],
    retenir: "Un critère éliminatoire ne se compense pas : raté, l'offre sort, même avec le meilleur total."
  },
  {
    id: "ot04-q03",
    dialecte: "Gestion de projet",
    q: "Grille de choix. Critère « SLA » (le niveau de service promis), poids 15. L'offre A a la note 3 (satisfaisant), l'offre B la note 4 (bon et avantageux). Quels points l'outil calcule-t-il ?",
    choix: [
      "A : 9 points ; B : 12 points",
      "A : 45 points ; B : 60 points",
      "A : 3 points ; B : 4 points",
      "A : 60 points ; B : 80 points"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Points = poids × note ÷ 5 : 15 × 3 ÷ 5 = 9, et 15 × 4 ÷ 5 = 12. Une note de 5 donne tout le poids ; le total se lit sur 100.",
      "Non. C'est poids × note, sans diviser par 5 : le total de la grille dépasserait 100.",
      "Non. Ce sont les notes, pas les points : le poids du critère n'y est pas.",
      "Non. Ce sont les notes en pourcentage (3 sur 5 = 60 %), sans le poids du critère."
    ],
    retenir: "Dans la grille : points = poids × note ÷ 5. Une note de 5 donne tout le poids ; le total se lit sur 100."
  },
  {
    id: "ot04-q04",
    dialecte: "Gestion de projet",
    q: "Lecture des offres. L'offre B ne donne pas son prix de mise en service. Tu mets 0 sur « Prix sur 3 ans » ; l'outil affiche « Note 0 : l'information manque ? … ». Que fais-tu ?",
    choix: [
      "Tu laisses 0 : l'offre est incomplète, tant pis pour elle",
      "Tu estimes ce prix d'après les 2 autres offres, puis tu notes",
      "Tu appelles B pour avoir son prix, et tu corriges sa note",
      "Tu demandes ce chiffre à toutes les PA, par écrit, même délai"
    ],
    bonne: 3,
    pourquoi: [
      "Non. L'offre perdrait sur un oubli facile à corriger : la comparaison serait faussée. Demander le chiffre, à tous, est plus juste.",
      "Non. Ton estimation n'engage pas la PA : tu noterais une offre qu'elle n'a pas faite.",
      "Non. Presque : il faut ce chiffre. Mais mêmes informations pour tous : un appel à B seul, sans trace, casse l'égalité.",
      "Oui. Il manque un chiffre ? Tu demandes le même à chaque offre, par écrit, avec le même délai. Puis tu notes, sur des faits."
    ],
    retenir: "Il manque un chiffre dans une offre : tu demandes le même à chaque offre, par écrit, avec le même délai."
  },
  {
    id: "ot04-q05",
    dialecte: "Gestion de projet",
    q: "Séance commune de notation. Les 2 clients de référence de B, appelés hier, parlent de pannes de son connecteur chaque mois. La DSI veut baisser sa note « Connecteur Divalto et sécurité » de 3 à 2. Les poids ne bougent pas. Que réponds-tu ?",
    choix: [
      "« D'accord : une note se corrige sur un fait, en séance commune »",
      "« Non : les notes se fixent avant les offres, comme les poids »",
      "« D'accord, mais après un accord écrit du DAF sur la grille »",
      "« D'accord, et on passe le poids de ce critère de 25 à 30 »"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Critères et poids se fixent avant les offres ; les notes se donnent après, sur des faits : démos, références. La séance commune règle les écarts.",
      "Non. Ce sont les critères et les poids qui se fixent avant. Les notes viennent après les démos et les références, justement.",
      "Non. Trop lourd : le DAF a validé la grille, pas chaque note. Une note qui bouge sur un fait se règle en séance commune.",
      "Non. Changer un poids après avoir vu les offres, c'est choisir le gagnant d'abord. La note bouge ; le poids, non."
    ],
    retenir: "Critères et poids se fixent avant les offres ; les notes se donnent après, sur des faits, et la séance commune règle les écarts."
  },
  {
    id: "ot04-q06",
    dialecte: "Gestion de projet",
    q: "Tu as téléchargé ta grille de choix en Excel. En séance commune, la DSI change dans Excel la note d'un critère. Que se passe-t-il ?",
    choix: [
      "Les points et le total se recalculent : ce sont des formules",
      "Rien : Excel garde les chiffres calculés par le site, figés",
      "Le document du site se met à jour aussi : il suit le fichier Excel",
      "Excel refuse : une note ne se change que sur le site"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. L'export garde les formules : points = poids × note ÷ 5, et les totaux en dessous. Excel recalcule.",
      "Non. Les colonnes calculées et les totaux sont des formules dans Excel : ils suivent les notes.",
      "Non. Rien n'est synchronisé : ton document reste dans ton navigateur. Reporte la note sur le site, ou garde le fichier Excel comme référence.",
      "Non. Le fichier est à toi : la note se change dans Excel, et les calculs suivent."
    ],
    retenir: "En Excel, les calculs de l'outil restent des formules : changer une note recalcule les points et les totaux. Rien ne revient seul sur le site."
  },
  {
    id: "ot04-q07",
    dialecte: "Gestion de projet",
    q: "Tu relis le contrat de la PA pour ta fiche. La clause « responsabilité » te gêne : un plafond très bas. Que fais-tu ?",
    choix: [
      "Tu la mets « À faire écrire », avec ton texte, comme tes clauses",
      "Tu le signales au DAF : le juridique, c'est lui, avec un avocat",
      "Tu demandes au DAF de ne pas signer tant que la PA n'a pas cédé",
      "Tu écris à la PA pour faire relever ce plafond avant de signer"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Presque : « À faire écrire » vaut pour tes clauses, les opérationnelles. La responsabilité est juridique : tu la signales, tu ne la réécris pas.",
      "Oui. Toi, les clauses opérationnelles ; le DAF, le prix, la signature et le juridique (responsabilité, droit applicable), avec un avocat si besoin. Un problème là ? Tu le lui signales.",
      "Non. Trop fort, et pas ta décision : le DAF juge ce risque, avec un avocat si besoin. Toi, tu le lui signales.",
      "Non. Tu négocies à la place du DAF un point qui n'est pas le tien. Il le fera, s'il le décide."
    ],
    retenir: "Dans la relecture : tes clauses opérationnelles, avec un texte proposé ; le juridique, tu le signales au DAF."
  },
  {
    id: "ot04-q08",
    dialecte: "Gestion de projet",
    q: "Fiche contrat, avril : 30 jours, 6 h de panne d'après tes tickets. L'outil calcule 99,17 % de disponibilité ; son rapport dit 99,8 % ; le contrat promet 99,5 %. Que fais-tu ?",
    choix: [
      "Tu prends son chiffre : c'est son outil qui mesure, SLA tenu",
      "Tu montres tes tickets et son rapport côte à côte, au comité",
      "Tu demandes au DAF d'appliquer tout de suite les crédits d'avril",
      "Tu notes l'écart dans ta fiche, et tu attends mai pour voir"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Sans tes traces, son chiffre fait foi ; avec elles, on compare. 6 h de panne, c'est plus que les 3 h 30 environ permises par mois.",
      "Oui. Tes tickets disent « raté », son rapport « tenu » : tu montres les deux au comité, et tu demandes comment il mesure. Puis la cause, et un plan daté.",
      "Non. Trop tôt : les deux mesures ne collent pas. D'abord comparer, sur des faits partagés. Les crédits, le DAF les décide ensuite, calcul en main.",
      "Non. Chaque écart, même le 1er : la cause, un plan daté, le suivi au comité. Attendre mai, c'est laisser l'écart devenir la règle."
    ],
    retenir: "Le SLA se mesure aussi chez toi : tes tickets à côté de son rapport, comparés au comité."
  },
  {
    id: "ot04-q09",
    dialecte: "Gestion de projet",
    q: "Fiche contrat, mai : 4 h de panne en 31 jours. L'outil calcule 99,46 % ; le contrat promet 99,5 %. C'est le 1er écart. Qu'écris-tu dans « Cause, plan daté, crédits » ?",
    choix: [
      "« Écart noté » : tu le suivras s'il revient le mois prochain",
      "La cause, un plan daté, et le calcul des crédits pour le DAF",
      "« Crédits appliqués » sur le SLA : tu les déduis de sa facture",
      "« Changer de PA » : tu préviens le DAF le jour même, par écrit"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Chaque écart, même le 1er : la cause, un plan daté, le suivi au comité. Attendre qu'il revienne, c'est le laisser devenir la règle.",
      "Oui. Chaque écart, même le 1er : sa cause, un plan daté, suivi au comité. Les crédits : tu apportes le calcul, le DAF décide.",
      "Non. Appliquer les crédits, c'est la décision du DAF : il a signé. Toi, tu apportes le calcul.",
      "Non. Trop fort pour un 1er écart. Changer de prestataire vient en dernier, avant le préavis."
    ],
    retenir: "Un écart au SLA, même le 1er : sa cause, un plan daté, le suivi au comité. Les crédits : le DAF décide, sur ton calcul."
  },
  {
    id: "ot04-q10",
    dialecte: "Gestion de projet",
    q: "Relecture du contrat de la PA, avant la signature. Clause recette : « Sans réserve 5 jours après la livraison, le connecteur est accepté. » Ta recette dure 6 semaines. Quel état mets-tu dans ta fiche ?",
    choix: [
      "« OK » : la recette commencera dès la livraison",
      "« À faire écrire » : le délai court après ta recette",
      "« OK », et un avenant si la recette dépasse 5 jours",
      "« À faire écrire », et le DAF change de PA si elle refuse"
    ],
    bonne: 1,
    pourquoi: [
      "Non. 5 jours après la livraison, ta recette n'est pas finie : le connecteur serait accepté sans être testé. C'est la recette tacite.",
      "Oui. Tu proposes ton texte (le délai de validation court après ta recette), et tu le fais écrire avant la signature : après, il faut un avenant.",
      "Non. Après la signature, la PA a moins de raisons d'accepter un avenant. Ta clause se fait écrire avant.",
      "Non. Presque : « À faire écrire », oui. Mais changer de PA pour une clause, c'est trop : on propose un texte, et on négocie."
    ],
    retenir: "Une clause à corriger se fait écrire avant la signature, avec ton texte proposé ; après, il faut un avenant."
  },
  {
    id: "ot04-q11",
    dialecte: "Gestion de projet",
    q: "Tu es DSI adjoint. Septembre 2028, avant le budget 2029. Ton DSI : « Quels contrats finissent bientôt, quand faut-il résilier, et qui les suit ? » Quel outil ouvres-tu ?",
    choix: [
      "L'échéancier : tous les contrats, fin, préavis, propriétaire",
      "La fiche contrat et SLA de chaque fournisseur, une par une",
      "Le registre des risques : un risque « reconduction » par contrat",
      "Le suivi du budget : une ligne par contrat, au réel"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. L'échéancier liste chaque contrat avec sa fin, son préavis, son propriétaire, et calcule la date limite pour résilier. Il se relit à chaque budget.",
      "Non. Chaque fiche décrit un contrat. Ton DSI veut la vue de tous, avec les dates limites calculées : l'échéancier.",
      "Non. Un préavis oublié est un risque, mais le registre ne calcule pas les dates limites. L'échéancier, si.",
      "Non. Le budget suit les euros, mois par mois. Les fins et les préavis se suivent dans l'échéancier."
    ],
    retenir: "Fins de contrats, préavis, propriétaires : l'échéancier des contrats, relu à chaque budget."
  },
  {
    id: "ot04-q12",
    dialecte: "Gestion de projet",
    q: "Tu es DSI adjoint. Échéancier des contrats : les liens télécoms des 3 dépôts finissent le 31/03/2029, avec un préavis de 3 mois. Quelle date limite pour résilier l'outil calcule-t-il ?",
    choix: [
      "Le 31/12/2028",
      "Le 31/03/2029",
      "Le 30/06/2029",
      "Le 30/09/2028"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Date limite = la fin moins le préavis : 31 mars 2029 moins 3 mois, le 31 décembre 2028. Après, le contrat repart seul.",
      "Non. C'est la fin du contrat. Le préavis se donne avant : à cette date, il s'est déjà reconduit.",
      "Non. C'est la fin plus 3 mois : le préavis se compte avant la fin, pas après.",
      "Non. C'est la fin moins 6 mois. Le préavis de ce contrat est de 3 mois (6 mois, c'est celui de la PA)."
    ],
    retenir: "Date limite pour résilier = la fin moins le préavis. Après elle, le contrat se reconduit seul."
  },
  {
    id: "ot04-q13",
    dialecte: "Gestion de projet",
    q: "Tu es DSI adjoint. 2 octobre 2028, budget 2029. Ligne de la PA : date limite le 30/05/2029, « À décider ». Prochaine relecture : septembre 2029. L'outil affiche une alerte. Que fais-tu ?",
    choix: [
      "Rien de plus : la date limite est dans 8 mois, il reste du temps",
      "Tu le notes pour la relecture de septembre 2029, au budget suivant",
      "Tu prépares maintenant le choix du DAF, sortie chiffrée, au budget 2029",
      "Tu notes un rappel pour mars 2029, deux mois avant la date limite"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Huit mois passent vite : le budget 2029 se vote en décembre, et le DAF doit choisir avant fin mai, sortie chiffrée.",
      "Non. En septembre 2029, la date limite (30 mai) sera passée : le contrat se sera reconduit seul.",
      "Oui. Une date limite avant la prochaine relecture se prépare maintenant : le choix du DAF (rester, renégocier, changer), sortie chiffrée, et une hypothèse écrite au budget 2029.",
      "Non. Le budget 2029 se vote en décembre : la sortie chiffrée doit y être. Un rappel en mars arrive après le vote."
    ],
    retenir: "Échéancier : une date limite qui tombe avant la prochaine relecture se prépare tout de suite, pour le choix du DAF."
  },
  {
    id: "ot04-q14",
    dialecte: "Gestion de projet",
    q: "Tu es DSI adjoint. Octobre 2028. Ligne « Maintenance des imprimantes des dépôts » : reconduite seule chaque année, fin le 30/06/2028, préavis 3 mois, « À décider ». L'alerte : « Date limite passée : le contrat s'est reconduit seul. Note sa nouvelle fin. » Que fais-tu ?",
    choix: [
      "Sa nouvelle fin, le 30/06/2029 : la date limite suit",
      "Tu supprimes la ligne : reconduit, il est réglé jusqu'en 2029",
      "Tu fais résilier tout de suite : il n'est jamais trop tard",
      "Tu laisses « À décider » : le DAF tranchera au prochain budget"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Reconduit pour un an : nouvelle fin le 30/06/2029. L'outil recalcule la date limite, le 30/03/2029 : cette fois, le choix aura son temps.",
      "Non. Le contrat continue : sans ligne, sa prochaine date limite passera aussi.",
      "Non. Le préavis est passé : le contrat est reconduit pour la période. En sortir avant, c'est ce que le contrat permet, souvent avec un coût.",
      "Non. Pour cette année, il n'y a plus rien à décider : la date est passée. Sans nouvelle fin, la prochaine date limite n'est pas calculée."
    ],
    retenir: "Date limite passée : le contrat s'est reconduit seul. Tu notes sa nouvelle fin ; la prochaine date limite se calcule."
  },
  {
    id: "ot04-q15",
    dialecte: "Gestion de projet",
    q: "Tu es DSI adjoint. Mai 2029 : le DAF choisit « Changer » de PA à la fin du contrat, le 30 novembre. Ton DSI propose de signer la nouvelle PA en novembre, « pour ne pas payer deux fois ». Que fais-tu ?",
    choix: [
      "D'accord : signée fin novembre, elle prendra le relais le 1er décembre",
      "Tu prévois la nouvelle signée, connectée, testée avant le 30/11",
      "Tu proposes de garder l'ancienne PA jusqu'en 2030, par sécurité",
      "Tu demandes au DAF de revenir sur son choix : c'est trop risqué"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Signée fin novembre, elle n'est ni connectée ni testée au 1er décembre : un trou, alors que la facture électronique est obligatoire.",
      "Oui. Changer est un projet : la nouvelle PA signée, connectée et testée avant la fin de l'ancienne. Quelques mois en double coûtent moins qu'un trou.",
      "Non. Le DAF a choisi de changer, en connaissant le coût : tu appliques. La sécurité vient d'un recouvrement de quelques mois, pas d'une année de plus.",
      "Non. Le DAF a décidé en connaissant le risque. Ton travail : rendre le changement sûr, sans trou."
    ],
    retenir: "Changer de prestataire est un projet : le nouveau signé, connecté et testé avant la fin de l'ancien. Jamais de trou."
  }
];
