// Chef de projet SI — Questions du module cp27 « Budget SI annuel et direction générale ».
// CHIFFRES DU BUDGET 2028 DE LA DSI (faits ajoutés par cp27, cohérents avec la fiche, cp12, cp22 et cp25 ; prêts à
// coller dans la fiche, ligne « Budget SI annuel (module cp27) ») :
// - Budget 2028, préparé par ton DSI à l'automne 2027 (toi, chef de projet DEMAT, tu lui donnes le run de DEMAT),
//   présenté au comité de direction en novembre, décidé par le DG en décembre 2027, le DAF consulté. Tu es DSI adjoint
//   dès décembre 2027 : tu suis 2028 et tu prépares 2029 avec ton DSI (septembre-octobre 2028).
// - Total 1 119 k€ = run 200 k€ + enveloppe des projets 256 k€ + masse salariale 663 k€ (10 personnes ; 650 k€ en 2027,
//   + 2 %, taux donné par la RH). Base : le réel de 2027 (run 193,7 k€).
// - Run 2028 : abonnement de la PA 10 200 € (12 × 850 €) ; archivage 600 € (12 × 50 €) ; le reste, 189,2 k€, stable.
//   Hausse : + 6,3 k€, DEMAT en année pleine (le run de 2027 n'en a payé que 5 mois, d'août à décembre : 4 250 € et
//   250 € ; le projet avait payé le reste).
// - Enveloppe des projets 2028 : 256 k€, votée en décembre 2027, répartie au comité de janvier 2028 : sécurité 20 k€,
//   migration de Divalto 86 k€ (75 k€ et l'adaptation des spécifiques), WMS 150 k€, tableaux Power BI des ventes 0 €.
// - Page du DG : ce que la loi impose (PA et archivage, 10,8 k€), faire tourner l'existant (189,2 k€), l'équipe
//   (663 k€), les projets (256 k€, chacun avec son gain ou le risque évité). CAPEX / OPEX : le contrôleur de gestion
//   classe (run surtout en charges, masse salariale en charges ; le matériel acheté, une part de la migration et du WMS
//   peut-être en investissement, sans montant).
// - Suivi : une revue par mois avec le contrôleur de gestion (réel, écart et cause, prévision de fin d'année). Dans le
//   total voté, le DSI compense entre ses lignes ; sortir du total voté : le DG décide, le DAF consulté.
// - Révision de juin 2028 : la migration glisse de 3 mois (en service fin septembre) ; le WMS, prévu de juillet à
//   décembre (25 k€ par mois), commence en octobre : 75 k€ en 2028, 75 k€ repris au budget 2029 ; ce qui se libère en
//   2028, le DG en décide. Le projet sécurité, clos fin mai 2028, laisse au run 400 € par mois dès juin (licences,
//   sauvegarde) : 2 800 € en 2028, 4 800 € en 2029.
// - Budget 2029 : la PA, 11 mois au prix du contrat (9 350 €), décembre selon une hypothèse écrite (une hausse possible,
//   cp07), le coût d'un changement de PA (environ 15 000 €, comme cp13-q43) sur une ligne visible ; le DAF choisit avant
//   fin mai 2029 ; l'archivage, 11 mois (550 €), puis décembre à prévoir : les factures se gardent la durée légale.
// Fond (contrôle de gestion et gestion financière d'une DSI ; ITIL, gestion financière des services ; le partage run /
// build ; FinOps pour le cloud ; pratiques de terrain en PME / ETI) : le budget de la DSI (run, enveloppe des projets,
// masse salariale) ; la base, le réel de l'année en cours et sa prévision ; des hypothèses écrites, avec leur source
// (contrat, RH) ; le temps de l'équipe compte en jours, jamais une 2e fois en euros ; le run contrat par contrat, sur les
// mois de l'année (année pleine, ponctuel retiré, prix selon le contrat, plan pour le matériel) ; les coûts cachés
// (ligne « divers », copie de test allumée, licences sans usage : le manager d'abord) ; l'enveloppe votée en décembre,
// répartie en janvier ; un projet qui glisse change d'année ; ce qui se libère, le DG en décide ; un projet sans
// dépense externe ne fait pas d'économie en euros ; CAPEX / OPEX classés par le contrôleur de gestion, deux chiffres au
// DG, on ne range pas une ligne pour qu'elle passe ; le cloud déplace la dépense ; une page par nature, en valeur, sans
// jargon, rapprochée avec le contrôleur ; une obligation se vérifie ; pas de rabot, des options chiffrées ; le DG décide
// en connaissant le prix, on applique ; pas de marge cachée, un risque nommé a sa ligne visible ; le suivi mensuel (un
// écart de calendrier n'est ni une dérive ni une économie) ; le DSI compense dans son total, le DG au-delà ; la révision
// ligne par ligne ; un échéancier des contrats ; le renouvellement de la PA ; l'archivage continue. Les pratiques
// divergent (budget reconduit ou base zéro, révision en juin ou prévision glissante) : on garde ce que dit la fiche.
// Fil rouge DEMAT 2027 et cadre « Tu es DSI adjoint » (fiche fil rouge de docs/plan-chef-de-projet.md, qui fait foi),
// ligne « Budget SI annuel (module cp27) » : le cycle (q02, q05), le contenu (q01, q03, q04), CAPEX / OPEX par le
// contrôleur de gestion (q19, q20), un budget annuel ne compte que son année (q06, q10, q35, q37), le suivi mensuel
// (q30 à q32), la révision de juin (q16, q17, q33, q34), chaque projet clos ajoute du run (q09, q10). Lignes « Budget et
// business case » (850 € par mois jusqu'en novembre 2029, archivage repris par le run, réserve rendue : q06, q07, q09),
// « Contrats » (préavis de 6 mois, le DAF signe : q36, q38), « Portefeuille (module cp25) » (comité de janvier 2028,
// 256 k€, tableaux Power BI à 0 €, glissement de juin 2028 : q05, q16 à q18, q25), « La réglementation » (tout passe par
// une PA, durée légale, NIS2 à vérifier : q22, q27, q37), « Les personnages » (le DG arbitre, le DAF consulté, Nicolas
// chef de projet du WMS, la RH).
// Scénarios ajoutés (faits de question, à valider) : le DAF consulté veut 50 k€ de moins, début décembre 2027 (q02) ;
// + 2 % de la RH, ton DSI veut + 5 % (q03) ; Nicolas ajoute 150 jours à 300 € au WMS de 2029 (q04) ; le CRM et ses 40 k€
// (q05) ; chef de projet DEMAT, septembre-octobre 2027 : l'archivage, la mise en service, le temps du N2 (q06 à q08) ;
// serveur remplacé en mars 2028, 12 k€ (q11) ; « + 3 % partout » du contrôleur (q12) ; ligne « divers » de 4 800 €
// (q13) ; copie de Divalto louée pour la recette de la migration, 300 € par mois, encore allumée en novembre 2028 (q14) ;
// 20 licences Power BI sans connexion depuis 3 mois, 3 360 € par an (q15) ; l'enveloppe d'investissement de l'entreprise
// pleine (q19) ; jargon « MCO, build, tenant » (q23) ; 4 k€ d'écart avec le contrôleur, la veille du comité (q24) ;
// « coupe 10 % partout » (q26) ; lien internet de secours du dépôt 2, 3 600 € par an, refusé par le DG (q28) ; « 5 % de
// plus partout » (q29) ; ligne matériel de 40 k€, postes renouvelés en octobre 2028 (q31) ; 6 lignes mobiles à 50 € par
// mois depuis mars 2028 (q32) ; 5 k€ au-dessus du total voté en juin (q33) ; maintenance annuelle de Divalto, 40 k€,
// payée en janvier (q34, année non dite) ; hypothèse de + 10 % en décembre 2029 (q35) ; liens télécoms des 3 dépôts
// reconduits seuls pour 3 ans le 1er avril 2029, préavis de 3 mois : l'échéancier de tous les contrats (q38).
// Calculs vérifiés : 12 × 850 = 10 200 ; 12 × 50 = 600 ; 5 × 850 = 4 250 ; 5 × 50 = 250 ; 10 800 − 4 500 = 6 300 ;
// 189,2 + 10,8 = 200 ; 189,2 + 4,5 = 193,7 ; 200 + 256 + 663 = 1 119 ; 650 × 1,02 = 663 ; 20 + 86 + 150 + 0 = 256 ;
// 28 × 50 = 1 400 (q06) ; 3 700 + 3 700 = 7 400 (q07) ; 24 × 300 = 7 200 (q08) ; 3 % de 193,7 = 5,8 (q09) ; 7 × 400 =
// 2 800, 12 × 400 = 4 800 (q10) ; 3 % de 200 = 6 (q12) ; 150 × 300 = 45 000 (q04) ; 3 × 25 = 75, 4 × 25 = 100 (q16) ;
// 40 × 300 = 12 000 (q18) ; 10 % de 1 119 = 111,9 (q26) ; 6 × 50 = 300, 10 × 300 = 3 000 de mars à décembre (q32) ;
// 100 × 12/5 = 240, 40 + 12 × 12 = 184, 100 + 5 × 12 = 160 (q34) ; 11 × 850 = 9 350, 850 × 1,10 = 935, 9 350 + 935 =
// 10 285, 12 × 935 = 11 220 (q35) ; 11 × 50 = 550, 32 × 50 = 1 600 (q37) ; 20 × 14 € × 12 = 3 360 (q15) ; 2 mois × 300 €
// = 600 € (q14) ; préavis de 3 mois avant le 1er avril 2029 = fin décembre 2028 (q38). Aucun jour de semaine cité.
// Affirmations juridiques ou comptables hors fiche (générales, vérifiées sur legifrance.gouv.fr le 1er novembre 2026) :
// un contrat à durée déterminée s'exécute jusqu'à son terme, sauf ce que le contrat prévoit (Code civil, art. 1212 ;
// art. 1103 : les contrats légalement formés tiennent lieu de loi), dans q26, q27 ; la reconduction et son préavis
// suivent le contrat, tel que l'énoncé le décrit (q38, comme cp14). Comptable : un investissement pèse sur plusieurs
// années, une charge sur l'année, l'argent sort à la date des factures (q19 à q21, comme cp11). Aucune règle précise
// d'immobilisation (le contrôleur de gestion tranche), aucune règle fiscale, aucun montant d'amende.
// Déjà publiées ailleurs, pas reprises ici : cp01-q30 (le DG et les 15 % de hausse : par nature, en valeur, des
// options), cp11-q32 à q37 et q42 (qui classe CAPEX / OPEX, l'abonnement, la charge et l'argent, les crédits payés
// d'avance), cp12-q34 (warehouse Snowflake allumé), cp12-q38 (le reste du budget en décembre), cp22-q17 (12 mensualités
// de la PA en 2028), cp22-q18 et cp07-q29 (marge pour la hausse de la PA), cp22-q38 (chaque projet clos ajoute du run),
// cp24-q37 (licences par utilisateur nommé), cp13-q43 (coût d'un changement de PA), cp14-q34 et q35 (préavis de la PA).
// Voisines, avec un autre angle : q06 et cp22-q17 (ici : l'archivage, et la réserve qui l'aurait payé) ; q09, q25, q26 et
// cp01-q30 (ici : l'année pleine expliquée, la valeur projet par projet, la coupe demandée) ; q14 et cp12-q34 (ici : une
// copie de recette, arrêtée avec son propriétaire, une date de fin dès la création) ; q15 et cp24-q37 (ici : peu de
// connexions ne veut pas dire inutile, le manager d'abord) ; q17, q31 et cp12-q38 (ici : un glissement en juin, un écart
// de calendrier) ; q19 à q21 et cp11 (ici : le DG, l'enveloppe d'investissement, la page du budget, le cloud qui fait
// monter le run) ; q22 et cp25-q11 (ici : la page du budget, « la loi » réservée à ce qui est vérifié) ; q35, q36 et
// cp22-q18 (ici : la hausse ne pèse qu'un mois en 2029 ; la décision du DAF vient après le vote) ; q38 et cp14-q35 (ici :
// un contrat découvert en préparant le budget, l'échéancier) ; q04, q08 et cp11-q05 (ici : le temps de l'équipe déjà dans
// la masse salariale).
// Frontières : le business case d'UN projet = cp11 ; le budget d'UN projet = cp12 ; le run chiffré à la clôture = cp22 ;
// choisir entre les projets = cp25 ; les contrats = cp14 ; les risques = cp07 ; la conformité = cp24 ; manager l'équipe =
// cp26 (q03 : le taux de la RH ; garder l'équipe reste un sujet de cp26). Cités en une ligne, pas refaits.
// Types : contenu et base q01 à q05 ; run ligne par ligne q06 à q15 ; projets et enveloppe q16 à q18 ; CAPEX / OPEX q19
// à q21 ; présenter et couper q22 à q29 ; suivre, réviser, renouveler q30 à q38. Cadres : « Tu es DSI adjoint »
// 35 questions (décembre 2027 : q02, q05, q09, q18, q22, q23, q25, q26 ; 2028 : q14, q16, q17, q30 à q32 ; budget 2029 : q01, q03,
// q04, q10 à q13, q29, q35 à q38 ; sans date : les autres) ; chef de projet DEMAT, septembre-octobre 2027 : q06 à q08.
// Anti-devinette (scores.js, sans connaître le sujet) : la bonne réponse est un extrême dans 6 questions sur 21
// avec un axe d'action (la plus forte qui se justifie : q02, q11, q33 ; la plus douce : q27, q28, q31). Règles du
// module (au plus 1 fois sur 2) : « couper le moins possible / tout garder » 23 % (18 % là où ce choix existe ; juste
// dans q27, q31), « couper d'abord les projets » 22 % (0 % là où il existe, 4 questions), « garder une marge cachée »
// 18 % (0 % là où elle existe, 10 questions), « le DG décide toujours » 26 % (30 % là où il existe ; juste dans q02,
// q05, q17, q33 ; faux dans q14, q19, q24, q28, q31, q32), « le choix le plus chiffré » 17 % (13 % là où un choix a plus
// de nombres), « le contrôleur de gestion a toujours raison » 27 % (36 % là où il existe ; juste dans q15, q19, q20 ;
// faux dans q12, q21, q24, q34). Règles générales (sous 60 %) : extrêmes écartés + mot de méthode 48 % ; écarter
// « rien », les absolus et le plus fort, puis mot de méthode 47 % ; le choix avec un mot de méthode 44 % ; écarter
// « rien » et le plus fort, puis deux actions 42 % ; la plus petite action réelle 40 % ; l'action moyenne 32 % ; le
// choix à deux actions 31 % (38 % là où il y en a) ; écarter absolus, oui, DAF / COPIL, puis hasard 31 % ; la plus
// longue 28 % (24 % au vérificateur) ; extrêmes écartés + chiffre ou date 26 % ; jamais le sponsor ni le DG 26 % ;
// toujours le sponsor 24 % ; jamais au-dessus du manager 19 % ; la plus courte 18 % (16 % au vérificateur) ; la plus
// forte si urgence 0 % (1 question). Indices de forme : le seul choix avec un point-virgule est bon 1 fois sur 5 (q17) ;
// le seul choix entre guillemets, 0 fois sur 1 (q17) ; aucune question où un seul choix commence, ou ne commence pas,
// par « Tu ». « Aujourd'hui », « dès », « Oui », « D'accord », « Non : », « rien », « tout », « seule », le DG, le DAF,
// le contrôleur, « ton DSI » : aussi dans des bonnes réponses ; chiffres, dates et points-virgules aussi dans des
// choix faux ; aucune bonne réponse n'est le seul choix à deux actions ; un « presque juste » dans 24 questions.
LEARNSQL.questions.cp27 = [
  {
    id: "cp27-q01",
    dialecte: "Gestion de projet",
    q: "Tu es DSI adjoint. Septembre 2028 : avec ton DSI et le contrôleur de gestion, tu prépares le budget 2029. De quoi pars-tu ?",
    choix: [
      "Du budget 2028 voté, reconduit tel quel, ligne par ligne",
      "Du réel de 2028, à fin août, et de sa prévision",
      "Des demandes de chaque service, additionnées",
      "Du réel de 2028, et 10 % de plus par prudence"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Le budget voté n'est pas ce qui a été dépensé : le WMS a glissé, des lignes ont bougé. Reconduit tel quel, il répète les écarts de l'an dernier.",
      "Oui. La base, c'est ce que la DSI dépense vraiment cette année, ligne par ligne, jusqu'en décembre. Puis on ajoute ce qui arrive (année pleine, contrats nouveaux) et on retire ce qui ne revient pas.",
      "Non. Additionner les demandes ne dit rien du run qui tourne déjà. Les projets passent par le classement (module cp25) ; le run part du réel.",
      "Non. Presque : la base réelle est la bonne. Mais 10 % de plus sans raison, c'est une marge cachée : le DG ne sait plus ce qu'il vote."
    ],
    retenir: "La base d'un budget est le réel de l'année en cours, avec sa prévision, ligne par ligne, pas le budget de l'an dernier."
  },
  {
    id: "cp27-q02",
    dialecte: "Gestion de projet",
    q: "Tu es DSI adjoint. Début décembre 2027, avant la décision du DG. Le DAF, consulté, veut 50 k€ de moins sur l'enveloppe des projets. Ton DSI : « Baissons-la, c'est le DAF. » Que proposes-tu ?",
    choix: [
      "Baisser tout de suite : le DAF tient les finances",
      "Refuser : l'avis du DAF ne change rien au budget",
      "Des options au comité de janvier, à la répartition",
      "Son avis au DG, avec ce que la baisse décalerait"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Le DAF est consulté ; le DG décide du budget. Baisser avant lui, c'est lui retirer la décision.",
      "Non. Son avis compte : il se présente au DG, chiffré. L'écarter, c'est priver le DG d'un éclairage, et fâcher le DAF.",
      "Non. Presque : janvier répartit l'enveloppe. Mais son montant se décide en décembre : l'avis du DAF doit arriver avant.",
      "Oui. Le DG décide en décembre, le DAF consulté. Tu chiffres ce que l'avis change : quel projet attend, quel gain recule. Le DG tranche en le sachant."
    ],
    retenir: "Le DAF est consulté, le DG décide : un avis se chiffre et va au DG, avant sa décision de décembre."
  },
  {
    id: "cp27-q03",
    dialecte: "Gestion de projet",
    q: "Tu es DSI adjoint. Budget 2029, masse salariale : la RH donne + 2 % d'augmentations. Ton DSI veut écrire + 5 %, « pour garder l'équipe ». Que proposes-tu ?",
    choix: [
      "Le taux de la RH, et sa demande de 5 % à part, chiffrée",
      "Les 5 % : c'est le budget de ton DSI, c'est à lui de décider",
      "Les 2 %, sans rien dire de sa demande au DG",
      "3,5 % : on coupe l'écart en deux, et chacun cède"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. L'hypothèse vient de la RH : c'est elle qui donne le taux, avec la direction. Une demande de plus se chiffre et se défend à part : le DG décide en la voyant.",
      "Non. Le budget est celui de la DSI, mais le taux d'augmentation vient de la RH, avec la direction. Écrit à 5 %, il promet à l'équipe ce que personne n'a décidé.",
      "Non. Presque : l'hypothèse est la bonne. Mais sa crainte (perdre des gens) est un vrai sujet : passée sous silence, elle ne sera ni chiffrée, ni décidée.",
      "Non. Couper la poire en deux n'est pas une hypothèse : personne ne saura d'où vient ce taux, ni qui l'a décidé."
    ],
    retenir: "Chaque chiffre a son hypothèse et sa source (pour la masse salariale, le taux de la RH) ; une autre demande se chiffre à part."
  },
  {
    id: "cp27-q04",
    dialecte: "Gestion de projet",
    q: "Tu es DSI adjoint. Budget 2029. Nicolas, chef de projet du WMS (logiciel d'entrepôt), ajoute à ses 75 k€ les 150 jours de l'équipe, à 300 € le jour : 45 k€. Que lui dis-tu ?",
    choix: [
      "« D'accord : 120 k€, c'est le vrai coût du WMS »",
      "« Retire ces jours : le temps interne ne compte pas »",
      "« Ces jours sont déjà payés : compte-les en jours »",
      "« Mets plutôt 400 € le jour, charges comprises »"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Presque : le coût complet compte le temps interne, en jours, dans le business case (module cp11). Mais au budget, ce temps est déjà dans la masse salariale : 45 k€ payés deux fois.",
      "Non. Il compte, en jours : sans lui, la capacité de l'équipe serait fausse, et le WMS paraîtrait plus léger qu'il n'est.",
      "Oui. Le salaire de l'équipe est dans la masse salariale. Compté aussi en euros dans l'enveloppe, il serait payé deux fois. Les 150 jours comptent dans la capacité (module cp25).",
      "Non. Le taux n'est pas le problème : ces jours sont déjà au budget, dans la masse salariale. En euros, ils seraient comptés deux fois."
    ],
    retenir: "Le temps de l'équipe est payé par la masse salariale : il se compte en jours, jamais une 2e fois en euros."
  },
  {
    id: "cp27-q05",
    dialecte: "Gestion de projet",
    q: "Tu es DSI adjoint. Mi-décembre 2027 : le DG vient de voter 256 k€ pour les projets de 2028. Le directeur commercial : « Mon CRM a donc ses 40 k€ dedans ? » Que réponds-tu ?",
    choix: [
      "« Pas encore : elle se répartit en janvier »",
      "« Oui : chaque demande y a sa part, au prorata »",
      "« Non : votre CRM est refusé, l'enveloppe est pleine »",
      "« Oui, si le DG l'accepte : va le voir ce soir »"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. L'enveloppe est votée en décembre ; elle se répartit en janvier, sur le classement (module cp25). Le CRM (gestion des clients) y sera comparé aux autres, sur les mêmes critères.",
      "Non. Une enveloppe n'est pas un partage : elle paie les projets retenus. Les 8 demandes, 401 k€ avec les spécifiques, ne tiennent pas dans 256 k€.",
      "Non. Trop tôt, et faux : rien n'est réparti avant janvier. Tu annonces une décision que le comité n'a pas prise.",
      "Non. Tu l'envoies contourner le classement : le DG arbitre en janvier, sur une seule liste, devant tous les directeurs."
    ],
    retenir: "L'enveloppe des projets se vote en décembre et se répartit en janvier, sur le classement : avant, aucun projet n'y a sa part."
  },
  {
    id: "cp27-q06",
    dialecte: "Gestion de projet",
    q: "Septembre 2027. Ton DSI prépare le budget 2028 : « L'abonnement de la PA, je l'ai : 10 200 €. L'archivage, il faut le prévoir aussi ? » Que lui réponds-tu ?",
    choix: [
      "« Non : la réserve de DEMAT l'a payé »",
      "« Non : les 6 400 € de réserve rendus le couvrent »",
      "« Oui : 1 400 €, les 28 mois repris à la clôture »",
      "« Oui : 12 × 50 €, soit 600 € »"
    ],
    bonne: 3,
    pourquoi: [
      "Non. La réserve l'a couvert pendant le projet. À la clôture, ses mois restants sont passés au run, comme les mensualités de la PA (module cp22).",
      "Non. La réserve couvrait les risques de DEMAT ; elle est rendue, et le DAF dit où va cet argent. Le run se chiffre ligne par ligne, pas avec un reste.",
      "Non. 28 × 50 = 1 400 €, c'est tout ce que le run a repris à la clôture, jusqu'en novembre 2029. Un budget annuel ne compte que son année : 12 mois en 2028.",
      "Oui. À la clôture, l'archivage est passé au run, comme l'abonnement : 50 € par mois, jusqu'en novembre 2029. 12 mois en 2028 : 600 €. Tu donnes aussi sa date de fin."
    ],
    retenir: "Ce qu'un projet clos laisse au run se budgète chaque année, sur les mois de l'année."
  },
  {
    id: "cp27-q07",
    dialecte: "Gestion de projet",
    q: "Octobre 2027. Ton DSI relit ta liste pour son budget 2028 : « La mise en service du connecteur, 7 400 €, je la reprends aussi ? » Que lui dis-tu ?",
    choix: [
      "« Oui : ce qui a coûté en 2027 reviendra en 2028 »",
      "« Non : payée une seule fois, elle ne revient pas »",
      "« La moitié, 3 700 €, pour le solde du PV »",
      "« Oui, pour la version 2 du connecteur »"
    ],
    bonne: 1,
    pourquoi: [
      "Non. La base est le réel, mais sans ce qui ne revient pas. La mise en service s'est payée une fois : 3 700 € à la signature, 3 700 € au PV (procès-verbal) de recette.",
      "Oui. Un coût ponctuel sort de la base. Ce qui revient chaque mois reste : l'abonnement (10 200 €) et l'archivage (600 €).",
      "Non. Le solde de 3 700 € a été payé au PV du 30 avril 2027. Plus rien n'est dû pour la mise en service.",
      "Non. Le passage en version 2, mi-novembre 2027, n'a rien à voir avec ce forfait. S'il coûte, il se chiffre à part, à sa date."
    ],
    retenir: "Ce qui ne revient pas (une mise en service) sort de la base ; ce qui revient chaque mois reste."
  },
  {
    id: "cp27-q08",
    dialecte: "Gestion de projet",
    q: "Octobre 2027. Ton DSI note pour 2028 : « DEMAT au run : le N2 (le support de 2e niveau), 2 jours par mois de tickets. » Il veut les ajouter en euros, à 300 € le jour. Que lui conseilles-tu ?",
    choix: [
      "« Oui : 24 jours à 300 €, 7 200 € de run en plus »",
      "« Non : DEMAT est clos, il ne prend plus de temps »",
      "« Non, déjà payé : compte ses 24 jours au run »",
      "« Oui, et ajoute les 2 jours par mois de Sophie »"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Le N2 est salarié de la DSI : son temps est déjà dans la masse salariale. Ajouté en euros, il serait payé deux fois.",
      "Non. Le projet est clos, pas le run : tickets, supervision, comité avec la PA. Ce temps est réel : il se compte, en jours.",
      "Oui. 2 jours × 12 mois = 24 jours : ils comptent dans la capacité du run (module cp25), pas en euros. Ces jours-là, le N2 ne fera rien d'autre.",
      "Non. Le temps de Sophie est celui de la compta, pas de la DSI. Et aucun des deux ne s'ajoute en euros : leurs salaires sont déjà payés."
    ],
    retenir: "Le temps de l'équipe est déjà payé : il compte en jours dans la capacité du run, pas en euros de plus."
  },
  {
    id: "cp27-q09",
    dialecte: "Gestion de projet",
    q: "Tu es DSI adjoint. Décembre 2027. Le DG : « Le run passe de 193,7 à 200 k€. Pourtant, rien de nouveau en 2028. Pourquoi ? » Que réponds-tu ?",
    choix: [
      "« La PA augmente ses prix : + 6,3 k€ en 2028 »",
      "« DEMAT, arrivé au run en 2027 : + 10,8 k€ »",
      "« 3 % de marge sur 193,7 k€, pour 2028 »",
      "« DEMAT, sur 12 mois au lieu de 5 : + 6,3 k€ »"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Le contrat fixe 850 € par mois jusqu'en novembre 2029. La hausse vient du nombre de mois, pas du prix.",
      "Non. 10,8 k€, c'est tout son run en 2028. Mais 4,5 k€ étaient déjà dans le réel de 2027 : la hausse est de 6,3 k€.",
      "Non. 3 % de 193,7 k€ font 5,8 k€, pas 6,3. Et une marge sans risque nommé serait cachée : le DG doit voir ce qu'il vote.",
      "Oui. Clos en juillet 2027, DEMAT n'a pesé sur le run que d'août à décembre : 4 250 € d'abonnement, 250 € d'archivage. En 2028 : 10 200 € et 600 €. + 6 300 €."
    ],
    retenir: "Un projet clos en cours d'année pèse quelques mois sur le run ; l'année suivante, 12 : l'année pleine explique la hausse."
  },
  {
    id: "cp27-q10",
    dialecte: "Gestion de projet",
    q: "Tu es DSI adjoint. Budget 2029. Le projet sécurité, clos fin mai 2028, a laissé au run 400 € par mois depuis juin (licences, sauvegarde). Que prévois-tu pour 2029 ?",
    choix: [
      "4 800 € : 400 € par mois, toute l'année",
      "2 800 € : 7 mois de 2028, la base du budget",
      "5 600 € : le réel de 2028, doublé",
      "Rien : ces 400 € restent payés par le projet"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. 12 × 400 = 4 800 €. Arrivé en juin, ce run pesait 7 mois en 2028 ; en 2029, il pèse l'année pleine, comme DEMAT en 2028.",
      "Non. Presque : la base est le réel. Mais 2028 n'a compté que 7 mois, de juin à décembre. En 2029, l'année est pleine : 12 mois.",
      "Non. 2 800 × 2 = 5 600 €, mais doubler 7 mois en fait 14. Une année en compte 12 : 4 800 €.",
      "Non. Le projet est clos : ce qui dure passe au run (module cp22). Sans cette ligne, les licences arriveraient sans budget."
    ],
    retenir: "Un run arrivé en cours d'année : le réel le compte sur quelques mois ; le budget suivant, sur 12."
  },
  {
    id: "cp27-q11",
    dialecte: "Gestion de projet",
    q: "Tu es DSI adjoint. Budget 2029. En mars 2028, un serveur en panne a été remplacé : 12 k€, payés sur le run. Que fais-tu de cette dépense ?",
    choix: [
      "Tu la reconduis : elle est dans le réel 2028, la base",
      "Tu la retires, et tu planifies les serveurs à remplacer",
      "Tu la retires ; une panne, ça ne se prévoit pas",
      "Tu gardes les 12 k€, et tu en fais une réserve"
    ],
    bonne: 1,
    pourquoi: [
      "Non. La base est le réel, sans ce qui ne revient pas. Ce serveur est remplacé : il ne se rachète pas en 2029.",
      "Oui. Un coût ponctuel sort de la base. Mais la panne rappelle un risque : les serveurs âgés se remplacent selon un plan, à leur date, budgétés et non subis.",
      "Non. Presque : elle ne revient pas, oui. Mais d'autres serveurs vieillissent : sans plan de remplacement, la prochaine panne se paiera encore dans l'urgence.",
      "Non. Une réserve glissée dans une ligne est cachée : le DG croit voter un achat. Un risque de panne se traite par un plan, visible."
    ],
    retenir: "Un achat ponctuel sort de la base ; le risque qu'il révèle se traite par un plan, au budget."
  },
  {
    id: "cp27-q12",
    dialecte: "Gestion de projet",
    q: "Tu es DSI adjoint. Budget 2029. Le contrôleur de gestion : « Pour le run, mets + 3 % partout : c'est l'inflation. » Que proposes-tu ?",
    choix: [
      "« D'accord : + 3 % sur 200 k€, soit 6 k€ »",
      "« Rien : en 2029, les prix resteront ceux de 2028 »",
      "« Contrat par contrat : prix fixe, révision ou hausse annoncée »",
      "« Plutôt + 5 % partout, pour être tranquilles »"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Le calcul est juste, pas la méthode. Le prix de la PA est fixé jusqu'en novembre 2029 ; d'autres contrats ont une clause de révision. Un taux unique se trompe ligne par ligne.",
      "Non. Certains contrats prévoient une révision, d'autres arrivent à échéance (la PA, fin novembre 2029). Chaque ligne se lit dans son contrat.",
      "Oui. Chaque ligne suit son contrat : un prix fixe ne bouge pas, une clause de révision donne sa hausse, une hausse annoncée s'écrit avec sa source. Le total en découle.",
      "Non. Une hausse sans source, plus forte encore : une marge cachée. Le DG ne sait plus ce qui est subi et ce qui est gonflé."
    ],
    retenir: "Les prix du run se lisent contrat par contrat (prix fixe, révision, hausse annoncée), pas dans un taux unique."
  },
  {
    id: "cp27-q13",
    dialecte: "Gestion de projet",
    q: "Tu es DSI adjoint. Budget 2029. Une ligne du run dit « Divers : 4 800 € », sans détail. Ton DSI : « Reconduis-la, c'est chaque année pareil. » Que fais-tu ?",
    choix: [
      "Tu détailles tout, abonnement par abonnement",
      "Tu la reconduis : 4 800 €, c'est peu sur 200 k€",
      "Tu la supprimes : sans détail, pas de budget",
      "Tu la reconduis, et tu ajoutes 10 % pour les imprévus"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Une ligne « divers » cache des coûts. Abonnement par abonnement : à quoi il sert, qui en répond. Ce qui ne sert plus se résilie, selon son contrat.",
      "Non. Peu, mais sans détail : personne ne sait ce qu'on paie. C'est là que se cachent les abonnements oubliés.",
      "Non. Trop fort : supprimer la ligne n'arrête pas ce qu'elle paie. Les factures arriveront quand même, sans budget, et une partie sert peut-être (un outil du support).",
      "Non. Tu reconduis ce que tu ne connais pas, et tu y caches une marge : deux défauts au lieu d'un."
    ],
    retenir: "Une ligne « divers » cache des coûts : on la détaille, abonnement par abonnement, chacun avec un propriétaire."
  },
  {
    id: "cp27-q14",
    dialecte: "Gestion de projet",
    q: "Tu es DSI adjoint. Novembre 2028. La copie de Divalto louée pour la recette de la migration tourne encore : 300 € par mois. La migration est en service depuis fin septembre. Que fais-tu ?",
    choix: [
      "Tu gardes la copie : elle servira à la prochaine version",
      "Tu l'arrêtes ce soir, sans prévenir personne",
      "Tu remontes l'oubli au DG, et tu chiffres la perte",
      "Tu l'arrêtes avec son propriétaire, et chaque copie aura sa fin"
    ],
    bonne: 3,
    pourquoi: [
      "Non. La prochaine version majeure est dans des années : d'ici là, 300 € par mois pour rien. Une copie se recrée quand on en a besoin.",
      "Non. Presque : il faut l'arrêter. Mais l'intégrateur y teste peut-être encore une correction : arrêtée sans prévenir, tu bloques un travail en cours.",
      "Non. Trop haut : 2 mois perdus, 600 €, se corrigent à la DSI. La leçon va dans une règle (une date de fin), pas au comité.",
      "Oui. Tu vérifies avec le chef de projet que plus personne n'en a besoin, puis elle s'arrête. Désormais, chaque ressource provisoire a sa date d'arrêt dès sa création."
    ],
    retenir: "Une ressource cloud provisoire a sa date d'arrêt dès sa création ; oubliée, elle se paie chaque mois pour rien."
  },
  {
    id: "cp27-q15",
    dialecte: "Gestion de projet",
    q: "Tu es DSI adjoint. Le contrôleur de gestion : « 20 licences Power BI ne se sont pas connectées depuis 3 mois. Coupe-les : 3 360 € par an. » Que fais-tu ?",
    choix: [
      "Tu les coupes toutes demain ; tu notes l'économie",
      "« D'accord, après l'avis de chaque manager »",
      "« Non : une licence peut toujours resservir »",
      "Tu en coupes la moitié, au hasard, pour voir qui réclame"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Presque : l'économie est réelle. Mais 3 mois sans connexion ne disent pas « inutile » : un tableau du trimestre ou de la clôture annuelle s'ouvre peut-être 4 fois par an.",
      "Oui. Sur le fond, il a raison : une licence sans usage se coupe. Mais le manager sait qui en a besoin, et quand (un tableau du trimestre). Puis on coupe, à la date que permet le contrat ; le contrôleur voit l'économie dans la prévision.",
      "Non. Garder « au cas où », c'est payer chaque mois pour personne. Une licence se rachète quand le besoin revient.",
      "Non. Au hasard, tu coupes peut-être celle de la clôture annuelle, et tu en gardes d'inutiles."
    ],
    retenir: "Une licence peu utilisée se coupe après avoir demandé au manager : peu de connexions ne veut pas dire inutile."
  },
  {
    id: "cp27-q16",
    dialecte: "Gestion de projet",
    q: "Tu es DSI adjoint. Juin 2028. Le WMS (logiciel d'entrepôt) devait dépenser 150 k€ de juillet à décembre, 25 k€ par mois. La migration glisse de 3 mois : il commencera en octobre. Que prévois-tu ?",
    choix: [
      "150 k€ en 2028 : le budget est voté, il ne bouge pas",
      "0 € en 2028 : il passe tout entier en 2029",
      "100 k€ en 2028, et 50 k€ en 2029",
      "75 k€ en 2028, et 75 k€ au budget 2029"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Le vote fixe un montant, pas un calendrier. 3 mois de dépenses glissent en 2029 : la prévision doit le montrer.",
      "Non. Il commence en octobre : 3 mois de dépenses restent en 2028. Seule la suite change d'année.",
      "Non. 100 k€, c'est 4 mois. D'octobre à décembre, il n'y en a que 3 : 3 × 25 = 75 k€ en 2028.",
      "Oui. D'octobre à décembre : 3 × 25 = 75 k€ en 2028. Les 3 mois suivants passent en 2029 : 75 k€ que le budget 2029 doit reprendre."
    ],
    retenir: "Un projet qui glisse change d'année : sa dépense passe au budget suivant, qui la reprend."
  },
  {
    id: "cp27-q17",
    dialecte: "Gestion de projet",
    q: "Tu es DSI adjoint. Juin 2028 : le WMS glisse, 75 k€ ne seront pas dépensés cette année. Le directeur commercial : « Prends-les pour mon projet, qui n'a pas été retenu. » Que fais-tu ?",
    choix: [
      "Tu lances son projet, et tu le dis au comité ensuite",
      "Tu les gardes en réserve pour la DSI, sans le dire",
      "La révision le montre ; le DG en décide, au comité",
      "« Non : ce qui n'est pas dépensé est perdu »"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Lancer un projet non retenu, c'est contourner le classement. Et le WMS aura besoin de ces 75 k€ en 2029 : ce choix se fait au comité, pas à la DSI.",
      "Non. Une réserve cachée : le DG croit l'argent dépensé, et la DSI décide seule de son usage.",
      "Oui. Ce qui glisse n'est pas au premier qui demande. La révision de juin montre les 75 k€ ; le DG décide de leur usage au comité, avec la revue du classement de juillet.",
      "Non. Presque : ce n'est pas à lui. Mais rien n'est « perdu » : la dépense glisse en 2029, et ce qui se libère en 2028, le DG en décide."
    ],
    retenir: "Ce qu'un projet qui glisse ne dépense pas n'est pas à prendre : la révision le montre, le DG décide de son usage."
  },
  {
    id: "cp27-q18",
    dialecte: "Gestion de projet",
    q: "Tu es DSI adjoint. Décembre 2027. Le DG, sur le budget 2028 : « Supprime les tableaux Power BI des ventes : ça fera une économie. » Que lui réponds-tu ?",
    choix: [
      "« Ils ne coûtent rien en euros : ils libèrent 40 jours »",
      "« D'accord : je retire leur ligne de l'enveloppe »",
      "« D'accord : 40 jours à 300 €, soit 12 k€ de moins au budget »",
      "« Non : le projet est décidé, on n'y revient pas »"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Leurs dépenses externes : 0 €. Les supprimer ne change pas le budget ; ça libère 40 jours de l'équipe, et perd 15 k€ de gain par an. Le DG décide en le sachant.",
      "Non. Leur ligne vaut 0 € : ils sont faits en interne. Le budget ne baisse pas d'un euro, et le gain de 15 k€ par an disparaît.",
      "Non. Ces 40 jours sont payés par la masse salariale, projet ou pas. Aucune dépense ne disparaît : 0 € d'économie.",
      "Non. Trop sec, et faux : en décembre, rien n'est réparti (le classement est en janvier), et le DG peut choisir. Tu lui donnes le vrai prix de son choix."
    ],
    retenir: "Couper un projet sans dépense externe n'économise rien en euros : il libère des jours, et perd son gain."
  },
  {
    id: "cp27-q19",
    dialecte: "Gestion de projet",
    q: "Tu es DSI adjoint. Le DG : « L'enveloppe d'investissement de l'entreprise est pleine. Passe le WMS en charges, il passera. » Que fais-tu ?",
    choix: [
      "Tu le passes en charges : le DG l'a demandé",
      "Tu laisses le contrôleur classer, et tu chiffres des options",
      "Tu le classes toi-même en investissement : c'en est un",
      "Tu retires le WMS, et tu préviens son sponsor"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Le classement suit les règles comptables : le contrôleur de gestion classe, ni le DG ni toi. Rangé pour passer, le WMS rend le budget faux.",
      "Oui. Le contrôleur de gestion dit ce qui est un investissement. Si l'enveloppe manque, le DG choisit entre des options chiffrées : décaler, étaler, un autre type de contrat.",
      "Non. Presque : c'en est peut-être un. Mais classer n'est pas ton rôle : le contrôleur de gestion le dit, selon les règles.",
      "Non. Trop fort : il rapporte 100 k€ par an. Prévenu ou pas, le sponsor perd son projet sans que le DG ait vu les options."
    ],
    retenir: "Le contrôleur de gestion classe CAPEX et OPEX ; on ne range pas une ligne pour qu'elle passe, le DG choisit entre des options."
  },
  {
    id: "cp27-q20",
    dialecte: "Gestion de projet",
    q: "Tu es DSI adjoint. Pour le budget de l'an prochain, le contrôleur de gestion a classé une part des projets en investissement. Que montres-tu au DG ?",
    choix: [
      "Un seul total : le classement ne le regarde pas",
      "Les charges seulement : l'investissement, c'est le DAF",
      "Les charges de l'année, et l'investissement à voter",
      "Ton classement, et celui du contrôleur, pour comparer"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Le DG décide de deux choses : ce qui pèse sur le résultat de l'année, et l'investissement à voter, souvent à part. Un seul total lui cache la seconde.",
      "Non. Le DAF est consulté, mais c'est le DG qui décide du budget, investissement compris.",
      "Oui. Deux chiffres, tels que le contrôleur de gestion les a classés : les charges de l'année, et l'investissement, qui pèsera aussi sur les années suivantes.",
      "Non. Classer n'est pas ton rôle. Et avec deux classements différents, le DG ne croirait plus aucun chiffre."
    ],
    retenir: "Le DG voit deux chiffres : les charges de l'année et l'investissement à voter, tels que le contrôleur de gestion les a classés."
  },
  {
    id: "cp27-q21",
    dialecte: "Gestion de projet",
    q: "Tu es DSI adjoint. Le DG : « Le run monte, et la DSI n'achète presque plus de serveurs. Vous dépensez davantage ? » Le cloud a remplacé des achats. Que réponds-tu ?",
    choix: [
      "« Oui : le run monte, c'en est la preuve »",
      "« Non : le cloud coûte toujours moins cher »",
      "« Le contrôleur de gestion vous répondra : c'est comptable »",
      "« Autrement : le coût se compare sur la durée »"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Le run monte, mais les achats baissent : regarder une seule ligne, c'est conclure trop vite. On compare le tout, sur la durée.",
      "Non. Pas toujours : un achat peut coûter moins sur 5 ans (module cp11). Ça se calcule, au cas par cas.",
      "Non. Presque : il classe les dépenses. Mais expliquer pourquoi la DSI dépense ainsi, c'est à la DSI, chiffres à l'appui.",
      "Oui. Le cloud et les abonnements déplacent la dépense : moins d'achats (d'investissement), une charge chaque année. Pour savoir si c'est plus cher, on compare sur la durée, achats compris (module cp11)."
    ],
    retenir: "Le cloud et les abonnements déplacent la dépense (moins d'investissement, plus de charges) : plus cher ou pas, ça se compare sur la durée."
  },
  {
    id: "cp27-q22",
    dialecte: "Gestion de projet",
    q: "Tu es DSI adjoint. Décembre 2027, avant la décision du DG. Sur la page du budget, ton DSI veut ranger la sécurité dans « ce que la loi impose », « à cause de NIS2 ». La vérification est en cours. Que proposes-tu ?",
    choix: [
      "Dans la loi : elle passera, le DG ne discutera pas une loi",
      "Dans les projets, défendue par le risque qu'elle évite",
      "Dans l'existant, sans la nommer, pour qu'elle passe",
      "Dans la loi, avec « à vérifier » en petit"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Tu comptes sur une obligation supposée pour éviter le débat. NIS2 : concerné ou pas, ça se vérifie (module cp24). Si c'est faux, le DG ne croira plus la page.",
      "Oui. Sans obligation vérifiée, la sécurité se défend sur son risque : un compte piraté, des sauvegardes qui ne repartent pas, la facturation arrêtée. Ça suffit à la défendre.",
      "Non. Cachée dans le run, elle échappe au choix du DG : une ligne masquée, et la confiance tombe au premier contrôle.",
      "Non. Presque : tu dis le doute. Mais le DG lit « loi » : il ne la discutera pas. Elle se défend sur son risque, qui suffit."
    ],
    retenir: "Au budget, « ce que la loi impose » est vérifié ; sinon, la dépense se défend sur le risque qu'elle évite."
  },
  {
    id: "cp27-q23",
    dialecte: "Gestion de projet",
    q: "Tu es DSI adjoint. Décembre 2027, avant la décision du DG. La page du budget dit : « MCO : 200 k€. Build : 256 k€. Tenant cloud en hausse. » Ton DSI te la fait relire. Que changes-tu ?",
    choix: [
      "Les mots du métier : « faire tourner l'existant »",
      "Rien : le DG apprendra nos mots, ils sont plus précis",
      "Tu ajoutes 2 pages de glossaire en annexe",
      "Tu retires les chiffres, et tu gardes les mots"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. « MCO » (maintien en conditions opérationnelles) devient « faire tourner l'existant » ; « build », « les projets ». Le DG lit ce que chaque montant paie, sans traduction.",
      "Non. Le DG décide sur ce qu'il comprend. Des sigles qu'il ne connaît pas, et il coupera au hasard, ou pas du tout.",
      "Non. Presque : tu expliques les mots. Mais personne ne lit 2 pages d'annexe en comité : la page doit se lire seule.",
      "Non. Ce sont les mots qui gênent, pas les chiffres : sans montants, le DG ne peut rien décider."
    ],
    retenir: "Au DG, des mots qu'il comprend, ce que chaque montant paie ; le jargon de la DSI reste à la DSI."
  },
  {
    id: "cp27-q24",
    dialecte: "Gestion de projet",
    q: "Tu es DSI adjoint. La veille du comité, ton total du run diffère de 4 k€ de celui du contrôleur de gestion. Que fais-tu ?",
    choix: [
      "Tu présentes ton chiffre : c'est le budget de la DSI",
      "Tu prends le sien, sans chercher plus loin : la compta fait foi",
      "Tu présentes les deux : le DG tranchera",
      "Tu cherches l'écart avec lui, ligne par ligne, ce soir"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Le DG verra deux chiffres, ou le contrôleur corrigera en séance. Un budget non rapproché perd sa crédibilité.",
      "Non. Presque : son chiffre compte. Mais sans chercher, tu ne sais pas qui se trompe : un contrat oublié, une ligne comptée deux fois.",
      "Non. Le DG n'a pas à arbitrer un écart de calcul : il décide du budget, pas de l'addition.",
      "Oui. Un seul chiffre au DG, vérifié à deux. Vous trouvez la cause (une ligne oubliée, une date de facture), puis le chiffre juste."
    ],
    retenir: "Au DG, un seul chiffre, rapproché avant avec le contrôleur de gestion."
  },
  {
    id: "cp27-q25",
    dialecte: "Gestion de projet",
    q: "Tu es DSI adjoint. Décembre 2027. Avant de décider, le DG : « 256 k€ de projets en 2028 : qu'est-ce que j'achète ? » Que lui montres-tu ?",
    choix: [
      "Le détail technique : versions, serveurs, flux",
      "Le retour sur investissement de toute la DSI",
      "Pour chaque projet, son gain ou le risque qu'il évite",
      "Les 256 k€, projet par projet, sans plus"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Le DG ne décide pas sur la technique : il veut savoir ce que chaque euro rapporte, ou évite.",
      "Non. Presque : la valeur, oui. Mais un seul chiffre mélange un WMS qui rapporte et une sécurité qui évite un risque : le DG ne peut rien choisir.",
      "Oui. WMS : 100 k€ par an. Tableaux Power BI : 15 k€ par an. Sécurité : un risque fort évité. Migration : une version qui vieillit. Chaque chiffre vient du business case (module cp11).",
      "Non. Les montants disent ce que ça coûte, pas ce que ça apporte. Sans la valeur, couper le plus cher paraît logique."
    ],
    retenir: "Au DG, chaque projet se présente en valeur : son gain, ou le risque qu'il évite."
  },
  {
    id: "cp27-q26",
    dialecte: "Gestion de projet",
    q: "Tu es DSI adjoint. Décembre 2027. Le DG, sur le budget 2028 de 1 119 k€ : « Coupe 10 % partout. » Que lui proposes-tu ?",
    choix: [
      "10 % de chaque ligne : 111,9 k€ en moins, partagés par tous",
      "Des options chiffrées : ce qu'on ne fera pas, le risque",
      "Que rien ne se coupe : tout est engagé ou obligatoire",
      "Les 111,9 k€ sur les projets : le run ne se touche pas"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Un rabot coupe aussi ce qui ne se coupe pas : la PA (la loi, un contrat en cours), les salaires. Et il ne dit pas ce qu'on ne fera plus.",
      "Oui. Par exemple : décaler le WMS, 150 k€ de moins en 2028, et un gain de 100 k€ par an reporté. Pour chaque option, le gain, ce qu'on ne fera pas, le risque. Le DG choisit.",
      "Non. Faux : l'enveloppe des projets n'est pas engagée, rien n'est réparti avant janvier. « Tout est engagé » ferme la discussion, et le DG coupera seul.",
      "Non. Presque : les projets se coupent plus facilement. Mais lesquels ? Sans le gain perdu ni le risque, le DG coupe à l'aveugle. Et le run a peut-être des coûts cachés."
    ],
    retenir: "Le DG demande de couper : des options chiffrées, avec ce qu'on ne fera pas et le risque, ni rabot ni refus."
  },
  {
    id: "cp27-q27",
    dialecte: "Gestion de projet",
    q: "Tu es DSI adjoint. Le DG cherche des économies : « L'abonnement de la PA et l'archivage, 10,8 k€ par an : on peut s'en passer ? » Que réponds-tu ?",
    choix: [
      "« Non : rien à couper, c'est la loi et un contrat »",
      "« Oui : on revient au papier, 10,8 k€ de gagnés »",
      "« L'abonnement reste, l'archivage part : 600 € de moins »",
      "« À voir avec le DAF : c'est lui qui a signé »"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Recevoir et émettre passe par une PA, et les factures se gardent la durée légale. Le contrat engage jusqu'en novembre 2029. Ces 10,8 k€ ne sont pas une option.",
      "Non. Le papier n'est plus possible : entre entreprises en France, les factures passent par une PA. Et le contrat engage les mensualités jusqu'en novembre 2029.",
      "Non. Presque : l'abonnement reste. Mais l'avenant engage aussi jusqu'en novembre 2029, et les factures se gardent la durée légale : sans l'archivage, il faut une autre solution, qui coûtera aussi.",
      "Non. Le DAF a signé, mais la réponse est déjà là : la loi et le contrat. Inutile de renvoyer le DG ailleurs."
    ],
    retenir: "Ce que la loi impose et ce qu'un contrat engage ne se coupent pas : on le dit, avec la raison."
  },
  {
    id: "cp27-q28",
    dialecte: "Gestion de projet",
    q: "Tu es DSI adjoint. Le DG refuse un lien internet de secours pour le dépôt 2, 3 600 € par an, en connaissant le risque : une panne y coupe Divalto. Ton DSI veut le remettre au comité suivant. Que proposes-tu ?",
    choix: [
      "Le remettre au comité suivant, risque à l'appui",
      "Le payer sur une autre ligne du run, sans le dire",
      "Demander au DAF de faire changer d'avis le DG",
      "Appliquer, décision et risque écrits"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Il connaît déjà le prix et le risque : revenir sans fait nouveau, c'est refuser sa décision.",
      "Non. Tu contournes une décision du DG : une dépense cachée, et la confiance perdue au premier contrôle.",
      "Non. Presque : le DAF est consulté sur le budget. Mais le DG a décidé en le sachant : chercher un allié pour le faire changer d'avis, c'est contourner sa décision.",
      "Oui. Le DG a décidé en connaissant le prix et le risque : c'est une décision. Elle s'écrit, avec le risque accepté. On n'y revient que sur un fait nouveau (une panne, par exemple)."
    ],
    retenir: "Le DG qui décide en connaissant le prix et le risque a décidé : on l'écrit, on applique."
  },
  {
    id: "cp27-q29",
    dialecte: "Gestion de projet",
    q: "Tu es DSI adjoint. Budget 2029. Ton DSI : « Mets 5 % de plus sur chaque ligne : le DG coupe toujours, on retombera juste. » Que réponds-tu ?",
    choix: [
      "« D'accord : c'est l'usage, et le DG le sait »",
      "« Plutôt 5 % sur les projets ; ils dérapent toujours »",
      "« Non : des lignes justes, et les risques nommés à part »",
      "« Non : aucune réserve, jamais, même pour un risque connu »"
    ],
    bonne: 2,
    pourquoi: [
      "Non. S'il le sait, il coupera 10 % la prochaine fois ; sinon, il vote un budget faux. Dans les deux cas, plus personne ne croit les chiffres.",
      "Non. Presque : les projets ont des risques. Mais une marge glissée dans chaque projet reste cachée ; une réserve se lie à des risques nommés, et se montre.",
      "Oui. Chaque ligne suit son hypothèse. Un vrai risque (une hausse de la PA au renouvellement) a sa ligne, visible : le DG la vote ou non. Rien de caché.",
      "Non. Trop strict : un risque connu et chiffré peut avoir sa réserve. Ce qui ne va pas, c'est de la cacher."
    ],
    retenir: "Pas de marge cachée : des lignes justes, et une réserve visible pour les risques nommés, que le DG vote ou non."
  },
  {
    id: "cp27-q30",
    dialecte: "Gestion de projet",
    q: "Tu es DSI adjoint. Février 2028 : 1re revue mensuelle du budget avec le contrôleur de gestion. Que regardez-vous, ligne par ligne ?",
    choix: [
      "Le réel, l'écart et sa cause, la prévision de fin d'année",
      "Le réel du mois, comparé au budget du mois",
      "Les factures du mois, une à une, pour tout vérifier",
      "Le total de la DSI : le détail ralentit la revue"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Le réel dit où vous en êtes ; la cause dit si l'écart est un décalage ou une dérive ; la prévision dit où l'année finira. C'est elle qui déclenche une décision.",
      "Non. Presque : la comparaison sert. Mais un mois seul trompe (une facture annuelle en janvier) : ce qui compte, c'est où l'année finira.",
      "Non. La compta contrôle les factures. Vous, vous pilotez : des écarts expliqués et une prévision, pas un pointage.",
      "Non. Un total qui tient peut cacher une ligne qui dérape et une autre en avance. Les causes se lisent ligne par ligne."
    ],
    retenir: "Chaque mois, ligne par ligne : le réel, l'écart et sa cause, la prévision de fin d'année."
  },
  {
    id: "cp27-q31",
    dialecte: "Gestion de projet",
    q: "Tu es DSI adjoint. Fin mars 2028, revue avec le contrôleur de gestion : la ligne matériel, 40 k€, est à 0 €. Les postes se renouvellent en octobre. Le directeur commercial veut ces 40 k€ pour des tablettes. Que fais-tu ?",
    choix: [
      "« D'accord : ils dorment, autant qu'ils servent »",
      "« Non : c'est un décalage de calendrier, pas une économie »",
      "Tu avances l'achat des postes en avril, pour clore le sujet",
      "Tu signales au DG une ligne surévaluée de 40 k€"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Ils ne dorment pas : les postes se renouvellent en octobre. Les donner maintenant, c'est créer un trou à l'automne.",
      "Oui. 0 € en mars, c'est le calendrier : l'achat est en octobre, la prévision de fin d'année reste 40 k€. Les tablettes sont une demande à part, à classer (module cp25).",
      "Non. Tu changes un calendrier choisi, juste pour éviter une question. Et les tablettes ne sont toujours pas classées.",
      "Non. Elle n'est pas surévaluée : la dépense arrive en octobre. Annoncer une fausse économie, c'est tromper le DG."
    ],
    retenir: "Un écart de calendrier n'est pas une économie : la prévision de fin d'année le dit."
  },
  {
    id: "cp27-q32",
    dialecte: "Gestion de projet",
    q: "Tu es DSI adjoint. Avril 2028, revue du mois. Télécoms : 6 lignes mobiles de plus, pour de nouveaux commerciaux, depuis mars, à 50 € par mois chacune. Le budget n'en prévoyait pas. Que fais-tu ?",
    choix: [
      "Rien : 3 000 € sur 200 k€, personne ne le verra",
      "Le DG saisi, avec la cause et des options",
      "Les 6 lignes résiliées ; leur directeur prévenu par écrit",
      "La prévision refaite dès aujourd'hui, et ton DSI compense"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Un écart passé sous silence finit par se voir, sans sa cause. Chaque mois, l'écart et sa raison s'écrivent, avec le contrôleur de gestion.",
      "Non. Presque : la cause et des options, oui. Mais trop haut : un écart qui se compense dans le budget de la DSI se règle à la DSI. Le DG décide quand le total voté ne tient plus.",
      "Non. Trop fort : les commerciaux en ont besoin, et la demande vient de leur directeur. Le coût se prévoit ; il ne s'annule pas.",
      "Oui. 6 × 50 = 300 € par mois, de mars à décembre : 10 × 300 = 3 000 €. La cause est écrite ; ton DSI compense sur une autre ligne. Le total voté tient : le DG n'a rien à décider."
    ],
    retenir: "Un écart se dit chaque mois, avec sa cause et la prévision ; dans le total voté, ton DSI compense, au-delà le DG décide."
  },
  {
    id: "cp27-q33",
    dialecte: "Gestion de projet",
    q: "Tu es DSI adjoint. Révision de juin : le run finira 5 k€ au-dessus du total voté. Aucune autre ligne de la DSI ne peut baisser. Que fais-tu ?",
    choix: [
      "Tu laisses ton DSI décider seul : c'est son budget, après tout",
      "Tu le portes au DG, tôt, avec la cause et des options",
      "Tu prends 5 k€ sur l'enveloppe des projets",
      "Tu attends décembre : la prévision peut encore bouger"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Dans le total voté, ton DSI compense. Mais le dépasser, c'est changer la décision du DG : c'est lui qui décide, le DAF consulté.",
      "Oui. Le total voté ne tient plus : le DG décide, comme en décembre, le DAF consulté. Tu lui donnes tôt la cause, la prévision et les options (accepter, reporter une dépense).",
      "Non. Presque : c'est un budget de la DSI. Mais l'enveloppe paie les projets retenus, répartis au comité : y prendre pour le run, c'est une décision du DG.",
      "Non. En décembre, il n'y aura plus d'options. Un dépassement prévu en juin se dit en juin."
    ],
    retenir: "Sortir du total voté se décide comme le vote : par le DG, le DAF consulté, prévenu tôt, avec la cause et des options."
  },
  {
    id: "cp27-q34",
    dialecte: "Gestion de projet",
    q: "Tu es DSI adjoint. Révision de juin. Run : 100 k€ dépensés à fin mai, dont la maintenance annuelle de Divalto, 40 k€, payée en janvier. Le reste : 12 k€ par mois, régulier. Le contrôleur de gestion : « 100 × 12/5 = 240 k€. » Que prévois-tu ?",
    choix: [
      "240 k€ : le calcul du contrôleur, Divalto compris, fait foi",
      "100 k€ : la révision ne compte que le réel",
      "184 k€ : Divalto une fois, et 12 k€ par mois",
      "160 k€ : 100 k€, plus 12 k€ par mois jusqu'en décembre"
    ],
    bonne: 2,
    pourquoi: [
      "Non. 100 × 12/5 donne bien 240. Mais ce calcul suppose que chaque mois coûte pareil : les 40 k€ de Divalto ne reviendront pas avant l'an prochain.",
      "Non. La révision prévoit la fin de l'année : le réel à fin mai, plus les 7 mois qui restent.",
      "Oui. 40 k€ une fois, et 12 × 12 = 144 k€ pour le reste : 184 k€. Puis on ajoute, ligne par ligne, ce qui change (un achat prévu, un projet livré).",
      "Non. Presque : la bonne méthode. Mais de juin à décembre, il reste 7 mois, pas 5 : 100 + 7 × 12 = 184 k€."
    ],
    retenir: "La révision refait la prévision ligne par ligne : une facture annuelle ne se multiplie pas par 12."
  },
  {
    id: "cp27-q35",
    dialecte: "Gestion de projet",
    q: "Tu es DSI adjoint. Budget 2029. Le contrat de la PA, 850 € par mois, arrive à échéance fin novembre 2029. Hypothèse écrite : il est reconduit, avec une hausse de 10 % dès décembre. Combien prévois-tu ?",
    choix: [
      "10 285 € : 11 mois à 850 €, puis 935 € pour le 12e",
      "10 200 € : 12 mois à 850 €, comme en 2028",
      "11 220 € : 935 € par mois, de janvier à décembre 2029",
      "9 350 € : le contrat s'arrête fin novembre"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. 11 × 850 = 9 350 € ; décembre : 850 × 1,10 = 935 €. Total : 10 285 €. En 2030, l'année pleine au nouveau prix : 11 220 €.",
      "Non. Tu oublies la hausse : décembre se paiera au nouveau prix, 935 €.",
      "Non. La hausse ne vient qu'au renouvellement : de janvier à novembre, le contrat garde 850 €.",
      "Non. Il est reconduit, et la facture électronique continue : décembre se paie aussi. Oublié, il arrive sans budget."
    ],
    retenir: "Une hausse au renouvellement ne compte, la 1re année, que pour les mois qui suivent : l'année pleine vient l'année d'après."
  },
  {
    id: "cp27-q36",
    dialecte: "Gestion de projet",
    q: "Tu es DSI adjoint. Octobre 2028, budget 2029. Le DAF choisira avant fin mai 2029 : garder la PA, renégocier ou en changer. Changer coûterait environ 15 000 €. Que mets-tu au budget ?",
    choix: [
      "Rien de plus : on verra en mai, après son choix",
      "15 000 € glissés dans la ligne de la PA",
      "Le changement décidé d'avance, et budgété en entier",
      "Ton hypothèse écrite, et le changement sur une ligne visible"
    ],
    bonne: 3,
    pourquoi: [
      "Non. S'il choisit de changer, les 15 000 € se dépensent dès juin, pour une nouvelle PA prête avant fin novembre : la révision ne ferait que constater un dépassement. Connu en octobre, le coût se montre au budget.",
      "Non. Presque : tu prévois le coût. Mais glissés dans la ligne, ils deviennent une marge cachée : le DG ne sait pas ce qu'il vote.",
      "Non. Tu décides à la place du DAF, avant même la consultation des PA : le budget suit le choix, il ne le fait pas.",
      "Oui. Le contrat en cours, avec son hypothèse ; et le coût d'un changement sur une ligne à part, que le DG vote ou non. En mai, le choix du DAF dira si elle sert."
    ],
    retenir: "Un choix qui viendra après le vote : une hypothèse écrite, et le coût de l'autre choix sur une ligne visible."
  },
  {
    id: "cp27-q37",
    dialecte: "Gestion de projet",
    q: "Tu es DSI adjoint. Budget 2029. L'option d'archivage de la PA, 50 € par mois, arrive à échéance avec le contrat, fin novembre 2029. Que prévois-tu ?",
    choix: [
      "550 € : 11 mois, puis plus rien à payer",
      "1 600 € : tout l'avenant d'archivage",
      "550 €, et décembre à prévoir",
      "Rien : la PA garde les factures de toute façon"
    ],
    bonne: 2,
    pourquoi: [
      "Non. L'option arrive à échéance, pas l'obligation : les factures se gardent la durée légale. Décembre se prévoit, chez la PA ou ailleurs.",
      "Non. 1 600 €, c'est l'avenant sur toute sa durée, d'avril 2027 à novembre 2029. 2029 n'en paie que 11 mois : 550 €. Et décembre reste à prévoir.",
      "Oui. 11 × 50 = 550 € jusqu'en novembre. Puis les factures restent à garder : chez la PA reconduite, ou ailleurs après un export. Décembre se prévoit, selon l'hypothèse écrite.",
      "Non. C'est l'entreprise qui doit garder ses factures la durée légale ; elle choisit où. Sans l'option, payée chaque mois, la PA ne s'y engage pas."
    ],
    retenir: "Un contrat arrive à échéance, l'obligation dure : les factures se gardent la durée légale, et le budget le prévoit."
  },
  {
    id: "cp27-q38",
    dialecte: "Gestion de projet",
    q: "Tu es DSI adjoint. Octobre 2028, budget 2029. Tu découvres que le contrat des liens télécoms des 3 dépôts se reconduit seul pour 3 ans le 1er avril, sauf préavis de 3 mois. Le DAF choisira d'ici décembre. Que mets-tu en place ?",
    choix: [
      "Un échéancier des contrats : fin, préavis, propriétaire",
      "Rien de plus : ce contrat est réglé, c'était un oubli",
      "La résiliation, par principe, de tout contrat à reconduction",
      "Une alerte sur ce contrat-là, avant son prochain préavis"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Un contrat oublié en cache souvent d'autres : l'échéancier les liste tous (fin, préavis, propriétaire), relu à chaque budget. Chaque préavis arrive alors avec le temps de choisir.",
      "Non. Celui-ci est réglé, mais d'autres contrats ont peut-être la même clause. Sans liste, le prochain préavis passera sans que personne ne choisisse.",
      "Non. Trop fort : une reconduction n'est pas un piège en soi (module cp14), et résilier, c'est au DAF. Le risque, c'est d'oublier la date.",
      "Non. Presque : une alerte, oui, mais pour ce seul contrat. Les autres restent sans date connue : c'est la liste de tous qui protège."
    ],
    retenir: "Préparer le budget, c'est aussi relire les fins de contrats : un échéancier (fin, préavis, propriétaire), relu à chaque budget."
  }
];
