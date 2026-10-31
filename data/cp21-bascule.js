// Chef de projet SI — Questions du module cp21 « Bascule et go / no-go ».
// Fond (PMBOK, PRINCE2, ITIL et pratiques de terrain en PME / ETI) : critères de go fixés avant, mesurables, distincts
// des critères de succès, presque atteints (go sous conditions écrit, ou no-go), pas réécrits la veille ; dossier de
// décision d'une page (preuves, risques et parades, retour arrière, recommandation ; R toi, A le DAF) ; plan heure par
// heure (noms, contrôles, contacts, répétition chronométrée, messages à heures fixes, branche no-go, gel) ; retour
// arrière écrit et testé, décidé par le DAF ou par celui qu'il désigne, point de non-retour, puis on corrige en avant ;
// revenir n'est pas un échec ; big bang, progressif ou en parallèle ; hypercare (tickets, point court, tri, demande
// nouvelle après le gel, correction tracée). Les pratiques divergent sur la stratégie : le contexte décide (q27, q28,
// q36 à q38) ; certains déclenchent le retour arrière sur un seuil, DEMAT le fait décider par le DAF (q23).
// Fil rouge DEMAT 2027 (fiche fil rouge de docs/plan-chef-de-projet.md, qui fait foi), ligne « Bascule (module cp21) » :
// critères du COPIL du mardi 11 mai (q01 à q06, q11, q12) ; go / no-go le vendredi 11 juin à 14 h (q07, q08, q12, q34,
// q35) ; plan du vendredi 11 au lundi 14 (q14 à q20) ; retour arrière par le portail de la PA au plus tard le lundi 14 à
// 12 h (q21 à q26, q41) ; hypercare du 14 au 25 juin, point à 9 h 30 (q29 à q33). Lignes « Planning » (report à
// mi-juillet sur décision du DAF, pas d'août : q12, q34), « Changements » (gel : q11, q32), « Contrats » (support de la
// PA de 8 h à 18 h les jours ouvrés, délais comptés aux heures de support : q14), « Reprise » (gel des créations de
// tiers le vendredi 11 à 12 h : q20). Promesse tenue : cp01-q24 (« Go / no-go : comparer aux critères fixés avant,
// montrer le retour arrière, recommander ; le sponsor décide » : q05, q08, q12, q13), sans refaire son cas.
// Faits ajoutés (cohérents avec la fiche et les modules publiés, à valider) : rejets du pilote par semaine (q04 : 5, 3,
// 1,8 et 1,6 % ; q05 : 2,4 % ; q34 : 3 %) ; une comptable malade, de retour le 21 juin (q06) ; 30 rejets EDI du pilote,
// condition du DAF (q07) ; 2 réserves mineures du PV datées au 9 juillet, après le gel, comme cp19-q31 (q11) ; avoirs
// fournisseurs bloqués la veille du go (q12) ; une majeure ouverte, contournement de 2 h par jour pour Sophie (q13) ;
// répétition de la bascule entière, 50 minutes par site pour activer le connecteur (q16, q17) ; arrêt de la facturation le
// vendredi à 17 h, par Sophie, contrôlé par Marc à 17 h 30 (q18) ; message au DAF à 18 h le samedi (q19) ; la compta n'a jamais émis par le
// portail (q21) ; seuil d'alerte de 5 % de rejets, 18 % le lundi à 10 h 30 (q23) ; un client EDI rejeté le lundi à 15 h
// (q24) ; le DAF en avion le lundi matin (q25) ; retour arrière décidé à 11 h 30 (q26) ; 15 % de rejets et une piste de
// l'intégrateur pour 16 h (q41) ; 25 appels en un jour (q29) ; point de 1 h 15 (q30) ; alerte sur les avoirs demandée
// par Julie (q32) ; correction de nuit sans ticket (q33) ; le gel court jusqu'à la fin de l'hypercare, le 25 juin (lu
// comme « la fin de la bascule » de la fiche : q11, q32) ; projets hors DEMAT pour « Tu es DSI adjoint » (q36 à q40).
// Affirmations juridiques hors fiche (générales, à faire vérifier) : un doublon de facture se corrige par un avoir (q28 ;
// la fiche dit : une facture émise se corrige par un avoir ou une facture rectificative). Rien d'autre.
// Déjà publiées ailleurs, pas reprises ici : cp01-q24 (veille de bascule, 2 majeures, le DAF veut y aller), cp09-q05 (où
// se décide le go / no-go), cp09-q19 (un C contre), cp10-q26 et cp03-q18 (correction en production pendant le pilote),
// cp10-q27 et q29 (le gel), cp17-q19 (AquaBleu prévenu), cp17-q20 (annonce du report), cp17-q35 (le DG veut mai),
// cp18-q08, q09, q12, q16 (dates et site du pilote), cp08-q23 et q27 (météo des rejets), cp02-q44 (deux pics en juin).
// Voisines, avec un autre angle : q33 (correction déjà faite, sans trace) et cp10-q26 ; q32 (demande nouvelle pendant
// l'hypercare) et cp10-q27 ; q27 (à quoi sert le pilote) et cp17-q35 ; q25 (A absent) et cp09-q24.
// Frontières : qui décide = cp09 ; la recette et les gravités = cp19 ; la reprise = cp20 ; le gel = cp10 ; les mots =
// cp17 ; le plan B = cp07 ; les tickets = cp15 ; la fin de l'hypercare et le run = cp22 ; formation et adoption = cp23.
// Types : critères de go q01 à q07 ; préparer la décision q08 à q13 ; plan de bascule q14 à q20 ; retour arrière q22 à
// q26 et q41 ; big bang ou progressif q27, q28 ; hypercare q29 à q32 ; pièges q21 (retour arrière jamais testé), q33
// (correction sans trace), q34 (« c'est la loi »), q35 (la peur) ; « Tu es DSI adjoint » q36 à q40.
// Anti-devinette : la bonne réponse est un extrême dans 8 questions sur 28 avec un axe d'action (la plus forte qui se
// justifie : q12, q15, q21, q22, q23, q41 ; la plus douce : q13, q35). Go est la bonne réponse dans q06, q11, q35 ;
// no-go ou report dans q12, q34 ; le retour arrière dans q41 ; le DAF qui décide dans q02, q05, q13, q23, q25 (et un
// choix faux le fait décider dans 7 autres). Sans connaître le sujet, toutes les règles restent sous 37 % ; « prendre
// go » 22 %, « no-go ou reporter » 20 %, « le retour arrière » 24 %, « celui qui fait décider le DAF » 29 %. « Tout »,
// « tous », « aujourd'hui », « le jour même », « dès », « D'accord », « Oui » et « Non : » sont aussi dans des bonnes
// réponses ; chiffres et dates aussi dans des choix faux.
LEARNSQL.questions.cp21 = [
  {
    id: "cp21-q01",
    dialecte: "Gestion de projet",
    q: "Début mai. Tu proposes les critères de go (on y va) de la bascule du 14 juin. Lequel est un bon critère ?",
    choix: [
      "« La compta et l'ADV se sentent prêtes pour le 14 juin »",
      "« 115 cas de recette joués sur 120, avant le 30 avril »",
      "« Pilote : moins de 2 % de rejets, ses 2 dernières semaines »",
      "« Le connecteur marche bien sur les 3 sites, sans aucun souci »"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Un ressenti ne se mesure pas : le 11 juin, chacun dira oui ou non selon son humeur. Un critère se vérifie, preuve en main.",
      "Non. Presque : c'est mesurable. Mais « joués » ne dit pas « réussis » : 115 cas joués peuvent cacher 10 anomalies. On mesure le résultat, pas l'effort.",
      "Oui. Un seuil, une période, une source (le relevé des rejets de la PA, la plateforme agréée) : le 11 juin, on lit le chiffre, sans débat.",
      "Non. « Marche bien » : chacun y met ce qu'il veut. Sans seuil, le critère ne tranche rien le jour du go / no-go."
    ],
    retenir: "Un critère de go se mesure : un seuil, une période, une preuve. Il mesure le résultat, pas l'effort."
  },
  {
    id: "cp21-q02",
    dialecte: "Gestion de projet",
    q: "Fin avril. Le DAF : « Les critères de go ? On verra le 11 juin, selon la situation. » Que fais-tu ?",
    choix: [
      "Tu en proposes 6, mesurables, validés au COPIL du 11 mai",
      "D'accord : tu les écriras le 10 juin, après le dernier test",
      "Tu les fixes toi-même, et tu les annonces à l'équipe en mai",
      "Tu demandes au DG d'imposer des critères au DAF, avant mai"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Fixés un mois avant, par celui qui décidera : chacun sait ce qu'il faut atteindre, et le 11 juin, on compare sans débat. Tu proposes des seuils ; le DAF (directeur administratif et financier, le sponsor) valide au COPIL (comité de pilotage).",
      "Non. Écrits la veille, après les résultats, les critères se taillent sur ce qu'on a obtenu. Et pendant un mois, l'équipe n'a pas su ce qu'elle devait atteindre.",
      "Non. Presque : le bon moment. Mais c'est le DAF qui décidera du go : s'il n'a pas validé les critères, il ne s'y sentira pas tenu le 11 juin.",
      "Non. Le DG (directeur général) n'a rien à imposer : le DAF n'a pas refusé, il remet à plus tard. Tu lui proposes des critères et une date."
    ],
    retenir: "Les critères de go se fixent avant, par celui qui décidera, sur ta proposition : le jour J, on compare."
  },
  {
    id: "cp21-q03",
    dialecte: "Gestion de projet",
    q: "Ton DSI : « Le critère de succès, c'est moins de 2 % de rejets le 1er mois. On le saura mi-juillet. Comment décider le 11 juin ? » Que réponds-tu ?",
    choix: [
      "« On ne peut pas : on décidera mi-juillet, le mois en main »",
      "« Sur tout le pilote, depuis son 1er jour : c'est plus sûr »",
      "« On bascule, et on revient en arrière si le mois dépasse 2 % »",
      "« Sur le pilote : ses 2 dernières semaines, sous 2 % »"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Attendre le résultat d'après la bascule pour décider de la bascule, c'est impossible. Et la marge légale fondrait. Le pilote sert à prévoir.",
      "Non. Presque : c'est bien le pilote. Mais ses 1res semaines, on corrigeait encore : elles pèsent sur la moyenne. Le critère validé regarde les 2 dernières.",
      "Non. Le retour arrière se décide au plus tard le lundi 14 à 12 h. Un mois après, trop de factures sont parties : on corrige en avant.",
      "Oui. Le go se juge avant, sur ce qu'on peut mesurer : la fin du pilote. Le succès se mesure après, sur le 1er mois. Deux critères, deux moments."
    ],
    retenir: "Critère de go et critère de succès sont deux choses : le go se juge avant, sur le pilote ; le succès, après."
  },
  {
    id: "cp21-q04",
    dialecte: "Gestion de projet",
    q: "Pilote, rejets par semaine, à volumes égaux : 5 %, 3 %, 1,8 %, 1,6 %. Critère de go : moins de 2 % sur ses 2 dernières semaines. Est-il atteint ?",
    choix: [
      "Non : 2,85 % en moyenne sur les 4 semaines du pilote",
      "Oui : 1,7 % en moyenne sur les 2 semaines de fin",
      "Non : la 1re semaine dépasse 2 %, elle est à 5 %",
      "Oui : 1,6 % la dernière semaine, c'est sous 2 %"
    ],
    bonne: 1,
    pourquoi: [
      "Non. C'est la moyenne des 4 semaines : (5 + 3 + 1,8 + 1,6) / 4 = 2,85 %. Mais le critère validé ne regarde que les 2 dernières, quand les causes sont corrigées.",
      "Oui. À volumes égaux : (1,8 + 1,6) / 2 = 1,7 %, sous 2 %. Les 1res semaines servent à corriger : c'est pour ça que le critère porte sur la fin du pilote.",
      "Non. La 1re semaine n'est pas dans le critère : on y corrigeait encore les fiches. Juger dessus, c'est punir le pilote d'avoir servi.",
      "Non. Presque : le critère est atteint, mais pas pour cette raison. Il porte sur 2 semaines : une dernière semaine à 1,6 % après une semaine à 2,6 % ne suffirait pas."
    ],
    retenir: "Un critère se lit tel qu'il est écrit : sa période, son seuil. Ni plus large, ni plus court."
  },
  {
    id: "cp21-q05",
    dialecte: "Gestion de projet",
    q: "Jeudi 10 juin. Pilote : 2,4 % de rejets sur ses 2 dernières semaines ; critère : moins de 2 %. Le DAF : « Mets le seuil à 3 %, et on est bons. » Que fais-tu ?",
    choix: [
      "Tu passes le seuil à 3 % : c'est lui qui a validé les critères",
      "Tu passes à 3 %, et tu écris ce changement au registre",
      "Tu gardes 2 % ; tu montres l'écart, et il décide en le sachant",
      "Tu refuses tout go tant que le pilote dépasse 2 %"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Changer le seuil la veille, c'est cacher l'écart : le compte rendu dira « tout est vert », et personne ne saura qu'on a pris un risque.",
      "Non. Presque : c'est tracé. Mais c'est toujours le critère qu'on réécrit pour qu'il passe. Ce qui doit s'écrire, c'est le risque accepté, pas un nouveau seuil.",
      "Oui. Le critère reste : 2,4 %, c'est rouge. Tu montres la cause, le risque, les options (go sous conditions, report). S'il y va, c'est sa décision, écrite avec le risque. Rien n'est caché.",
      "Non. Tu es R : tu recommandes. Le go / no-go est au DAF (module cp09) : il peut décider d'y aller en connaissant le risque."
    ],
    retenir: "La veille, on ne réécrit pas un critère pour qu'il passe : on montre l'écart, et le DAF décide en le connaissant."
  },
  {
    id: "cp21-q06",
    dialecte: "Gestion de projet",
    q: "Vendredi 11, 11 h. Critère « formation faite » : 5 personnes de la compta sur 6. La 6e, malade, revient le 21 juin ; sa cheffe a réparti ses dossiers d'ici là. Que recommandes-tu ?",
    choix: [
      "No-go : un critère manque, la bascule attendra son retour",
      "Go : elle apprendra sur le tas, avec ses collègues",
      "Go, et tu la formes par téléphone pendant son arrêt",
      "Go sous conditions, écrites : formée le 21"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Le critère est presque atteint, avec une parade sûre : un report coûterait des semaines pour une personne, dont le travail est couvert.",
      "Non. « Sur le tas », sans date, ce sont des erreurs sur de vraies factures. Le critère n'est ni atteint, ni compensé par écrit.",
      "Non. On ne fait pas travailler une personne en arrêt maladie. Et sa formation se cale avec sa cheffe, à son retour.",
      "Oui. Presque atteint, cause connue, parade datée : un go sous conditions. Écrit : quoi (sa formation), qui (sa cheffe), pour quand (le 21). Le DAF décide en le lisant."
    ],
    retenir: "Un critère presque atteint, avec une parade sûre : go sous conditions, écrit et daté. Sans parade : no-go."
  },
  {
    id: "cp21-q07",
    dialecte: "Gestion de projet",
    q: "Vendredi 11, 14 h 20. Le DAF : « Go, si les 30 rejets EDI du pilote sont repris avant lundi. » La séance se lève. Que fais-tu ?",
    choix: [
      "Tu écris la condition le jour même : qui, quand, qui vérifie, sinon",
      "Tu notes au registre : « go, si les 30 rejets sont repris »",
      "Tu les reprends toi-même samedi : tu connais bien l'EDI",
      "Tu demandes un no-go : une condition, c'est un critère raté"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Un go sous conditions s'écrit : quoi (les 30 rejets), qui (Marc, vu avec son chef), pour quand (vendredi 18 h), qui vérifie, et sinon (appel au DAF). Il relit, puis c'est au registre.",
      "Non. Presque : la condition est écrite. Mais sans qui, pour quand, qui vérifie, ni ce qu'on fait si elle n'est pas remplie, lundi personne ne saura quoi contrôler.",
      "Non. Reprendre les rejets EDI, c'est le travail de l'ADV (administration des ventes) : Marc sait le faire, son chef organise son temps. Toi, tu tiens le plan du week-end.",
      "Non. Le DAF a décidé, en connaissant l'écart : c'est son rôle. Une condition claire et vérifiable rend le go plus sûr, pas moins."
    ],
    retenir: "Un go sous conditions s'écrit : quoi, qui, pour quand, qui vérifie, et ce qu'on fait si elle n'est pas remplie."
  },
  {
    id: "cp21-q08",
    dialecte: "Gestion de projet",
    q: "Vendredi 11, 14 h : go / no-go de la bascule. Que mets-tu sous les yeux du DAF ?",
    choix: [
      "Le dossier de recette complet : 120 cas, 40 pages",
      "Une page : critères, preuves, risques, retour arrière, ton avis",
      "Une ligne : « Tout est vert, je recommande go »",
      "Une page : chaque critère, sa preuve, les risques ; à lui de juger"
    ],
    bonne: 1,
    pourquoi: [
      "Non. 40 pages, il ne les lira pas : il veut savoir si on y va, et sur quoi. Le détail reste en annexe, pour qui le demande.",
      "Oui. Critère par critère : atteint ou pas, avec sa preuve. Puis les risques qui restent, le retour arrière prêt, et ta recommandation. Il décide en 10 minutes, en sachant.",
      "Non. « Tout est vert » sans preuve ne se vérifie pas. Et sans les risques ni le retour arrière, il décide à l'aveugle.",
      "Non. Presque : les faits y sont. Mais tu es R (tu réalises : tu recommandes) : sans ton avis, le DAF tranche seul ce que tu connais le mieux."
    ],
    retenir: "Dossier de go / no-go : une page, chaque critère avec sa preuve, les risques, le retour arrière, ta recommandation."
  },
  {
    id: "cp21-q09",
    dialecte: "Gestion de projet",
    q: "Ta page de go / no-go dit : « Formation faite : oui. » Ton DSI la relit : « Ta preuve ? » Que réponds-tu ?",
    choix: [
      "« La cheffe comptable me l'a confirmé à la pause »",
      "« Le planning prévoyait toutes les sessions en mai »",
      "« Personne ne s'est plaint, pendant tout le pilote »",
      "« Les feuilles signées : qui, quand, quel module »"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Elle sait, sans doute. Mais une phrase à la pause ne se montre pas en séance. Une preuve se lit : un document, une date.",
      "Non. Prévu n'est pas fait : une session a pu sauter, une personne manquer. Le critère dit « faite ».",
      "Non. Ne pas se plaindre ne prouve rien : au pilote, un seul site travaillait. Les 2 autres n'ont encore rien vu.",
      "Oui. La preuve d'une formation faite : la liste signée des présents, par date et par module. Les absents se voient, et se rattrapent avant le 11."
    ],
    retenir: "Chaque critère coché a sa preuve : un document daté, pas un « on m'a dit »."
  },
  {
    id: "cp21-q10",
    dialecte: "Gestion de projet",
    q: "Tous les critères sont verts. Mais AquaBleu, 20 % du chiffre d'affaires, n'était pas dans le pilote. Le mets-tu dans ta page de go / no-go ?",
    choix: [
      "Non : les critères sont verts, ce n'en est pas un",
      "Oui, en annexe, sans en parler en séance",
      "Oui : un risque, avec sa parade de lundi matin",
      "Oui, et tu recommandes no-go tant qu'il n'est pas testé"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Les critères ne disent pas tout : un risque connu, tu le montres. Le DAF ne doit pas découvrir AquaBleu lundi, par un appel du client.",
      "Non. C'est écrit, mais un risque sur 20 % du chiffre d'affaires se dit en séance, avec sa parade. En annexe, personne ne le lit.",
      "Oui. Critères verts ne veut pas dire zéro risque. Tu l'écris avec sa parade : ses 1res factures vérifiées une à une lundi par Marc, et le client prévenu par le commercial. Le DAF décide en le sachant.",
      "Non. Le tester avant, c'est un nouveau pilote, et des semaines de report. Un risque se traite par une parade, pas forcément par un report."
    ],
    retenir: "Même avec des critères verts, tu montres les risques qui restent, avec leur parade : le DAF décide en les connaissant."
  },
  {
    id: "cp21-q11",
    dialecte: "Gestion de projet",
    q: "Vendredi 11. Tous les critères sont atteints. Restent 2 réserves mineures du PV de recette, à corriger d'ici le 9 juillet. Que recommandes-tu ?",
    choix: [
      "Go : les 2 réserves gardent leur date, et tu les suis",
      "No-go : on corrige d'abord les 2 réserves, puis on bascule",
      "Go sous conditions : les 2 réserves corrigées avant lundi",
      "Aucune : tu donnes les faits, le DAF jugera seul"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Tous les critères sont atteints : tu recommandes go. Les réserves mineures ont leur date, le 9 juillet, après le gel, comme au PV (procès-verbal) : tu les suis jusque-là.",
      "Non. Les critères disent 0 anomalie bloquante ou majeure, et des PV signés : des réserves mineures datées n'en font pas partie. Attendre la perfection, c'est un no-go par peur.",
      "Non. Presque : c'est un go. Mais tu ajoutes une condition que les critères ne demandent pas. Et corriger des mineures ce week-end casse le gel : seul le bloquant passe.",
      "Non. Tu es R : ta recommandation fait partie du dossier. Sans elle, le DAF décide sans l'avis de celui qui connaît le mieux le projet."
    ],
    retenir: "Critères atteints : tu recommandes go. Des réserves mineures datées se suivent ; elles ne bloquent pas."
  },
  {
    id: "cp21-q12",
    dialecte: "Gestion de projet",
    q: "Vendredi 11, 11 h. Une anomalie bloquante est ouverte depuis hier : les avoirs fournisseurs n'arrivent plus dans Divalto. Cause inconnue, pas de date. Que recommandes-tu à 14 h ?",
    choix: [
      "Go : l'hypercare servira à la corriger dès lundi",
      "No-go : un report, avec les dates possibles et leur prix",
      "Go sous conditions : corrigée avant lundi midi",
      "Go : les avoirs saisis à la main, en attendant"
    ],
    bonne: 1,
    pourquoi: [
      "Non. L'hypercare (le support renforcé d'après la bascule) traite les petits écarts. Une bloquante, sans cause ni date, c'est un incident annoncé sur de vraies factures.",
      "Oui. Le critère « 0 bloquante » est rouge, sans parade. Tu recommandes no-go, avec les dates possibles (mi-juillet, par exemple) et leur prix. Le DAF décide.",
      "Non. Une condition peut sauver un go, si elle peut se tenir. Sans cause ni date, « corrigée avant lundi » est un espoir, pas une condition.",
      "Non. Presque : un contournement existe. Mais une bloquante contournée à grand coût reste une majeure, et le critère dit 0 majeure. Sans cause connue, la saisie à la main peut durer des semaines."
    ],
    retenir: "Un critère rouge, sans parade datée : tu recommandes no-go, avec les dates possibles. Le DAF décide."
  },
  {
    id: "cp21-q13",
    dialecte: "Gestion de projet",
    q: "Tu as recommandé un no-go : une anomalie majeure reste ouverte (contournement : 2 h par jour pour Sophie). Le DAF, en connaissant le risque : « On y va. » Que fais-tu ?",
    choix: [
      "Tu montes au DG : un risque pareil dépasse le rôle du DAF",
      "Tu lui fais d'abord signer une décharge, puis tu bascules",
      "Tu refuses de lancer le plan tant qu'un contournement est nécessaire",
      "Tu appliques : décision et risque au registre, contournement prêt"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Le sponsor qui décide en connaissant le risque a décidé : il n'y a rien à faire arbitrer au DG (directeur général). Escalader, ici, c'est contester son rôle.",
      "Non. Il faut une trace, oui. Mais une décharge à signer traite le sponsor en adversaire. La trace, c'est le registre : la décision, qui l'a prise, le risque accepté.",
      "Non. Tu recommandes, il décide (module cp09). Bloquer son go, c'est prendre une décision qui n'est pas la tienne.",
      "Oui. Le DAF est A (il approuve, il décide) : il a tranché en connaissant le prix. Tu écris la décision et le risque accepté ; le contournement est calé avec la cheffe comptable ; l'anomalie est suivie chaque jour en hypercare."
    ],
    retenir: "Le DAF décide contre ta recommandation, en connaissant le risque : tu appliques, et tu écris la décision et le risque."
  },
  {
    id: "cp21-q14",
    dialecte: "Gestion de projet",
    q: "La reprise vers la PA tourne samedi 12 et dimanche 13. Au contrat, le support de la PA répond de 8 h à 18 h, les jours ouvrés. Que fais-tu ?",
    choix: [
      "Tu obtiens par écrit, avant, un nom et un numéro pour tout le week-end",
      "Rien : un ticket en priorité 1 suffira, s'il y a un souci",
      "Tu déplaces la bascule en semaine, du mardi au jeudi",
      "Tu fais prévoir par le DAF des pénalités si la PA ne répond pas"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Les heures du contrat ne couvrent pas ton week-end : tu obtiens avant, par écrit, qui répond à la PA (et chez l'intégrateur), à quelles heures, à quel numéro. C'est la liste des contacts du plan.",
      "Non. Les délais du SLA (l'engagement de service) se comptent aux heures de support : un ticket du samedi est pris en charge lundi matin. Ta bascule serait finie, ou ratée.",
      "Non. Basculer en semaine, c'est arrêter la facturation des 3 sites pendant des jours ouvrés. Le week-end est choisi pour ça : il suffit d'y avoir les bons contacts.",
      "Non. Des pénalités ne t'aident pas samedi à 15 h : elles se comptent après, et seulement sur ce que le contrat couvre. Il te faut quelqu'un qui décroche."
    ],
    retenir: "Le plan de bascule a ses contacts : nom, numéro, heures. Ce que le contrat ne couvre pas, tu l'obtiens par écrit, avant."
  },
  {
    id: "cp21-q15",
    dialecte: "Gestion de projet",
    q: "Ton plan dit : « Lundi 8 h : contrôle des 1res factures EDI : l'ADV. » Marc est le seul à savoir reprendre un rejet EDI. Que corriges-tu ?",
    choix: [
      "Rien : l'ADV saura bien qui envoyer ce jour-là",
      "« Toi » : tu connais l'EDI, ce sera plus sûr",
      "« Marc », confirmé avant par son chef, à 8 h",
      "« Marc » : tu le lui dis vendredi, après le go"
    ],
    bonne: 2,
    pourquoi: [
      "Non. « L'ADV », c'est personne : lundi à 8 h, chacun croira qu'un autre s'en charge. Une étape du plan a un nom.",
      "Non. Contrôler ses factures, c'est le métier de l'ADV, et tu dois rester libre pour coordonner. Faire toi-même laisse le plan sans pilote.",
      "Oui. Une étape, un nom. Le temps de Marc appartient à son chef (module cp16) : tu le vois avec lui, avant. Marc sait à quelle heure il est attendu, et qui appeler.",
      "Non. Presque : le bon nom. Mais vendredi, c'est trop tard pour qu'il s'organise, et son chef n'a rien accepté. Un nom se confirme avant le go."
    ],
    retenir: "Chaque étape du plan a un nom, confirmé avant avec son manager. « L'équipe », c'est personne."
  },
  {
    id: "cp21-q16",
    dialecte: "Gestion de projet",
    q: "Fin mai. Le plan de bascule n'a jamais été joué. Le consultant : « Pas besoin de répétition : j'en ai fait vingt chez d'autres clients. » Que fais-tu ?",
    choix: [
      "Tu le crois : il connaît son métier mieux que toi",
      "Une répétition avant le 11 juin, chronomètre en main",
      "Tu relis le plan seul, aujourd'hui, étape par étape",
      "Tu reportes d'un mois : le temps d'une vraie répétition"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Ses vingt bascules n'avaient ni ton Divalto, ni ta PA, ni tes clients EDI. Ce qui casse, c'est ce qui est propre à chez vous.",
      "Oui. On joue le plan sur l'environnement de test, avec les vraies personnes : on mesure les durées, on trouve les oublis. Les essais à blanc de la reprise ne jouent qu'une étape (module cp20).",
      "Non. Presque : relire aide. Mais sur papier, rien ne se chronomètre, et personne ne découvre qu'il lui manque un accès.",
      "Non. Une répétition tient en une journée, d'ici le 11 juin. Un mois de report, c'est la marge légale entamée pour rien."
    ],
    retenir: "Un plan de bascule se joue avant, en répétition, chronomètre en main : c'est là qu'on trouve les oublis."
  },
  {
    id: "cp21-q17",
    dialecte: "Gestion de projet",
    q: "Ta répétition a mesuré 50 minutes par site pour activer le connecteur, un site après l'autre. Ton plan prévoit dimanche de 14 h à 16 h pour les 3 sites. Que fais-tu ?",
    choix: [
      "Ça tient : 1 h 50 pour les 3 sites, il reste 10 minutes",
      "Ça tient, si le consultant va plus vite qu'à la répétition",
      "Il manque 30 minutes : tu enlèves le contrôle de la fin",
      "Il manque 30 minutes : tu élargis le créneau, avec une marge"
    ],
    bonne: 3,
    pourquoi: [
      "Non. 3 × 50 = 150 minutes, soit 2 h 30, pas 1 h 50 : une heure fait 60 minutes. L'étape finirait à 16 h 30, et tout ce qui suit glisse.",
      "Non. Compter sur plus vite que la mesure, c'est jeter la répétition. Elle a donné le vrai chiffre : on planifie avec lui.",
      "Non. Presque : le bon calcul. Mais le contrôle dit si l'étape a marché : sans lui, une erreur passe à l'étape suivante, puis à lundi.",
      "Oui. 3 × 50 = 150 minutes, soit 2 h 30 : fin à 16 h 30. Tu élargis le créneau (début à 13 h, par exemple), avec une marge : une répétition mesure, elle ne garantit pas."
    ],
    retenir: "Une répétition donne des durées : le plan les prend telles quelles, plus une marge. On ne gagne pas du temps sur les contrôles."
  },
  {
    id: "cp21-q18",
    dialecte: "Gestion de projet",
    q: "Laquelle de ces lignes de ton plan de bascule est la mieux écrite ?",
    choix: [
      "Ven. 17 h : arrêt de la facturation, Sophie ; Marc contrôle, à 17 h 30",
      "Vendredi : arrêt de la facturation par l'équipe, puis contrôle",
      "Ven. 17 h : arrêt de la facturation, Sophie, 30 minutes, avec soin",
      "Ven. 17 h : arrêt de la facturation par Sophie, puis contrôle par l'ADV"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. L'heure, l'étape, qui la fait, qui la contrôle, et quand : à 17 h 30, Marc vérifie qu'aucune facture n'attend entre les deux circuits. Le plan dit aussi qui appeler si une facture traîne.",
      "Non. Ni heure, ni nom, ni contrôle précis : vendredi soir, chacun attendra l'autre, et personne ne saura quand vérifier.",
      "Non. Une heure, un nom, une durée : bien. Mais pas de contrôle : « avec soin » ne se vérifie pas. Une facture oubliée passe à l'étape suivante.",
      "Non. Presque : il y a un contrôle. Mais « l'ADV », c'est personne : qui contrôle, et quand ? Un contrôle a un nom, comme l'étape."
    ],
    retenir: "Une ligne du plan : l'heure, l'étape, un nom, un contrôle avec un nom. Sans contrôle, une erreur passe à la suivante."
  },
  {
    id: "cp21-q19",
    dialecte: "Gestion de projet",
    q: "Samedi 15 h. La reprise a 2 heures de retard ; la marge du dimanche l'absorbe, lundi tient. Ton message au DAF est prévu à 18 h. Que fais-tu ?",
    choix: [
      "Tu l'appelles tout de suite : un retard se dit le jour même",
      "À 18 h : « Tout va bien », le retard sera rattrapé",
      "À 18 h, comme convenu : le retard, sa cause, son effet",
      "Rien à 18 h : tu écriras quand le retard sera rattrapé"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Rien n'est à décider : la marge absorbe le retard. L'appeler un samedi pour ça, c'est user l'alerte. Le message de 18 h est fait pour ça.",
      "Non. Presque : le bon rendez-vous. Mais « tout va bien » cache un retard : s'il grossit dimanche, le DAF découvrira que tu le savais depuis samedi.",
      "Oui. Pendant la bascule, des messages à heures fixes, même sans drame : les faits, la cause, ce que ça change (rien pour lundi). Le DAF sait où on en est.",
      "Non. Un message prévu qui n'arrive pas inquiète plus qu'un retard. Et si le retard grossit, le DAF l'apprend trop tard."
    ],
    retenir: "Pendant la bascule : des messages à heures fixes, avec les faits, même quand tout va bien. Le jour même, seulement s'il y a une décision."
  },
  {
    id: "cp21-q20",
    dialecte: "Gestion de projet",
    q: "Ton plan décrit tout ce qui suit un go. Ton DSI le relit : « Et si vendredi à 14 h, c'est no-go ? » Que fais-tu ?",
    choix: [
      "Rien de plus : si c'est no-go, tout reste comme avant",
      "D'accord : tu ajoutes la branche no-go, qui prévenir, quoi défaire",
      "Tu écris un 2e plan complet, pour une bascule à mi-juillet",
      "Rien pour l'instant : les critères sont presque tous verts"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Depuis vendredi 12 h, les créations de tiers sont gelées ; l'intégrateur, la PA et Marc sont mobilisés ; les clients EDI sont prévenus d'une pause. Tout ça se défait, et vite.",
      "Oui. Un no-go a son plan aussi : rouvrir les créations de tiers, libérer le week-end de l'intégrateur et de la PA, prévenir les sites et les clients, et dire quand le DAF décidera de la suite.",
      "Non. La nouvelle date dépend de la cause du no-go et du DAF : écrire tout un plan avant, c'est travailler pour rien. Il faut la branche no-go, pas un 2e plan.",
      "Non. « Presque tous verts » n'est pas « tous verts ». Un no-go improvisé à 14 h, c'est un week-end de messages contradictoires."
    ],
    retenir: "Le plan de bascule prévoit aussi le no-go et le retour arrière : qui prévenir, quoi défaire, à quelle heure."
  },
  {
    id: "cp21-q21",
    dialecte: "Gestion de projet",
    q: "Fin mai. Critère « retour arrière testé » : rien de fait. Ton DSI : « Le portail de la PA, la compta s'en sert depuis novembre. Pas besoin de test. » Que fais-tu ?",
    choix: [
      "Tu le fais tester avant le 11, émission comprise",
      "Tu le coches : la compta connaît déjà le portail",
      "Tu le testeras pendant l'hypercare, si besoin",
      "Tu fais écrire à la PA que le portail est prêt"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. La compta y reçoit des factures depuis novembre, mais n'y a jamais émis celles des clients. Tu fais jouer le retour arrière avant le go : Sophie émet quelques factures, Julie en reçoit, on mesure le temps.",
      "Non. En réception, oui. Mais revenir en arrière, c'est aussi y émettre les factures clients, ce que la compta n'a jamais fait. Coché sans test, le critère ment.",
      "Non. Presque : il sera testé. Mais pendant l'hypercare, le point de non-retour est passé : un retour arrière qu'on découvre ce jour-là arrive trop tard.",
      "Non. La PA dit que son portail marche, pas que ta compta sait y émettre vos factures clients. Un écrit du fournisseur ne remplace pas un test chez toi."
    ],
    retenir: "Le retour arrière s'écrit et se teste avant le go. « On connaît le portail » n'est pas un test."
  },
  {
    id: "cp21-q22",
    dialecte: "Gestion de projet",
    q: "Ton plan de retour arrière tient en une ligne : « Si ça ne marche pas, on repasse par le portail. » Que lui manque-t-il ?",
    choix: [
      "Rien : le portail est prévu au contrat, cette ligne suffit",
      "Le numéro du support de la PA, pour l'appeler ce jour-là",
      "L'heure limite, lundi 12 h ; le reste se décidera sur place",
      "Les signaux d'alerte, qui fait quoi, en combien de temps, qui décide"
    ],
    bonne: 3,
    pourquoi: [
      "Non. « Si ça ne marche pas » : qui le dit, sur quel chiffre ? Et qui dépose quoi sur le portail, dès quand ? Une ligne n'est pas un plan.",
      "Non. Les contacts en font partie, mais un numéro ne dit ni quand revenir, ni qui fait quoi, ni qui décide.",
      "Non. L'heure limite en fait partie. Mais « sur place », sous pression, personne ne sait quoi faire : qui dépose quoi, en combien de temps, sur quel signal.",
      "Oui. Un retour arrière dit : les signaux qui alertent (un seuil, une heure), les gestes pour revenir (qui, quoi, combien de temps), qui décide (le DAF) et jusqu'à quand (lundi 12 h)."
    ],
    retenir: "Un plan de retour arrière dit : quand on alerte, comment on revient, en combien de temps, qui décide et jusqu'à quand."
  },
  {
    id: "cp21-q23",
    dialecte: "Gestion de projet",
    q: "Lundi 14, 10 h 30. Depuis ce matin, 18 % des factures émises sont rejetées par la PA ; cause inconnue, l'intégrateur cherche. Le plan alerte au-dessus de 5 %. Que fais-tu ?",
    choix: [
      "Tu lances toi-même le retour arrière : le seuil est dépassé",
      "Tu appelles le DAF tout de suite : les faits, ta recommandation",
      "Tu attends 12 h : l'intégrateur aura peut-être trouvé d'ici là",
      "Tu ouvres un ticket en priorité 1 à la PA, et tu attends"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Le retour arrière défait le go : c'est au DAF de le décider, comme le go. Le seuil du plan déclenche l'alerte, pas le retour arrière.",
      "Oui. Seuil dépassé, cause inconnue, point de non-retour à 12 h : tu appelles le DAF maintenant. Les faits, ce que fait l'intégrateur, ta recommandation (ici : revenir). Il décide avant midi.",
      "Non. 12 h, c'est l'heure limite du retour arrière : attendre jusque-là, c'est laisser le DAF sans choix. Et chaque heure, des factures rejetées de plus.",
      "Non. La PA doit chercher aussi, oui. Mais attendre son ticket, c'est laisser filer l'heure limite sans que le DAF le sache. Le ticket part, et le DAF est appelé."
    ],
    retenir: "Seuil d'alerte dépassé avant le point de non-retour : le DAF tout de suite, avec les faits et ta recommandation. Il décide."
  },
  {
    id: "cp21-q24",
    dialecte: "Gestion de projet",
    q: "Lundi 14, 15 h. Les factures d'un client EDI sont rejetées ; toutes les autres passent. Le DAF : « On repasse tout le monde par le portail ? » Que réponds-tu ?",
    choix: [
      "« Oui : tout le monde au portail, par sécurité »",
      "« Non : un ticket, et ce client attend la correction »",
      "« Non : midi est passé ; ce client au portail, on corrige »",
      "« Oui, si l'intégrateur n'a toujours pas trouvé à 18 h »"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Le point de non-retour (12 h) est passé : trop de factures sont parties par le connecteur. Tout repasser au portail pour un seul client, c'est deux circuits à suivre, et plus de risque que d'en corriger un.",
      "Non. Presque : le ticket, oui. Mais en attendant, ses factures ne partent pas : le client n'est pas facturé, et ne paie pas. Corriger en avant, c'est aussi un contournement.",
      "Oui. Après le point de non-retour, on corrige en avant. Un seul client touché : un contournement pour lui (ses factures par le portail), un ticket, la correction testée.",
      "Non. Tu laisses du temps à l'intégrateur, mais à 18 h, le point de non-retour est passé depuis longtemps : un retour arrière ce soir coûterait encore plus."
    ],
    retenir: "Après le point de non-retour, on ne revient plus en arrière : on corrige en avant, avec un contournement pour ce qui coince."
  },
  {
    id: "cp21-q25",
    dialecte: "Gestion de projet",
    q: "Le DAF sera en avion le lundi 14, de 8 h à 13 h. Le point de non-retour est à 12 h. Que fais-tu, deux semaines avant ?",
    choix: [
      "Tu lui fais désigner, par écrit, qui décide lundi",
      "Tu décideras seul lundi, s'il le faut : tu connais le dossier",
      "Ton DSI décidera : c'est ton responsable, il connaît DEMAT",
      "Tu proposes de reporter la bascule après son voyage"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. L'A (celui qui approuve) absent quand sa décision tombe désigne avant, par écrit, qui décide à sa place (module cp09). Le nom va dans le plan, avec son numéro.",
      "Non. Tu es R : tu recommandes. Décider seul du retour arrière, c'est approuver ta propre recommandation, sur une décision qui n'est pas la tienne.",
      "Non. Quelqu'un décide, oui. Mais ton DSI n'est pas le sponsor de DEMAT : sans désignation écrite du DAF, sa décision serait contestée.",
      "Non. Un voyage se règle par une désignation écrite : reporter la bascule pour ça coûte des semaines de marge."
    ],
    retenir: "Le décideur du retour arrière sera injoignable : il désigne avant, par écrit, qui décide à sa place."
  },
  {
    id: "cp21-q26",
    dialecte: "Gestion de projet",
    q: "Lundi 14, 11 h 30. Le DAF a décidé le retour arrière : les factures repassent par le portail de la PA. Quel message envoies-tu à la compta et à l'ADV ?",
    choix: [
      "« La bascule a échoué. Nous cherchons les responsables. »",
      "« Petit souci technique : rien ne change pour vous. »",
      "« Retour arrière vers le portail : on rebascule demain 8 h. »",
      "« Retour arrière, prévu : le portail dès 12 h, suite jeudi. »"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Un retour arrière décidé à temps n'est pas un échec : c'est le plan qui marche. Chercher des coupables maintenant fait taire ceux qui ont vu le problème.",
      "Non. C'est faux : dès midi, les équipes déposent par le portail. Le jour où elles le découvrent seules, elles ne te croient plus.",
      "Non. Presque : sans drame, avec une suite. Mais la cause n'est pas connue, et la nouvelle date est au DAF. Annoncer demain 8 h, c'est promettre ce que tu n'as pas.",
      "Oui. Le fait, sans drame : le plan prévu s'applique. Ce qui change pour les équipes (le portail, dès 12 h), et quand elles en sauront plus. La cause et la nouvelle date viendront, décidées par le DAF."
    ],
    retenir: "Revenir en arrière n'est pas un échec : on le dit sans drame, avec ce qui change et quand vient la suite."
  },
  {
    id: "cp21-q27",
    dialecte: "Gestion de projet",
    q: "Avril. Le consultant : « La recette a tout validé. Le pilote ne sert à rien : basculons les 3 sites dès mai. » Que réponds-tu ?",
    choix: [
      "« D'accord : la recette a tout validé, on gagne un mois »",
      "« Non : le pilote voit le réel, que la recette n'a pas vu »",
      "« D'accord, si le retour arrière est testé avant mai »",
      "« Non : le planning dit un pilote en mai, on n'y touche pas »"
    ],
    bonne: 1,
    pourquoi: [
      "Non. La recette teste des cas choisis, sur un environnement de test. Sans pilote, les 3 sites découvrent en même temps ce que personne n'a vu.",
      "Oui. La recette dit : « ça marche comme prévu ». Le pilote dit : « ça tient dans la vraie vie » : de vraies factures, de vrais clients, le volume d'un site, avec un risque limité. Ce qu'il apprend se corrige avant les 2 autres.",
      "Non. Un retour arrière testé, il en faut un. Mais il limite la casse, il ne l'évite pas : 3 sites touchés d'un coup, c'est 3 fois plus d'incidents le 1er jour.",
      "Non. Le planning peut changer, sur décision du DAF. La vraie raison est ailleurs : ce que le pilote apporte. C'est elle que le consultant doit entendre."
    ],
    retenir: "La recette vérifie que ça marche ; le pilote, que ça tient dans la vraie vie, en petit, avant de tout basculer."
  },
  {
    id: "cp21-q28",
    dialecte: "Gestion de projet",
    q: "Le responsable ADV : « Pour être sûrs, faisons partir chaque facture des deux façons pendant un mois : l'ancienne, et le connecteur. » Que réponds-tu ?",
    choix: [
      "« Oui : un mois en parallèle, c'est le plus prudent »",
      "« Oui, mais une semaine : un mois, c'est trop long »",
      "« Non : tes clients recevraient tout en double »",
      "« Non : on supprime le pilote, il fait déjà doublon »"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Pour des factures, le parallèle crée des doublons : le client reçoit deux factures, peut payer deux fois, et chaque doublon se corrige par un avoir.",
      "Non. Presque : plus court, c'est moins de dégâts. Mais même une semaine, chaque facture part deux fois : des centaines de doublons, et autant d'avoirs.",
      "Oui. Faire tourner l'ancien et le nouveau ensemble, ça marche pour des rapports, pas pour des factures. On sécurise autrement : le pilote, les 1res factures vérifiées, le retour arrière prêt.",
      "Non. Le pilote ne double rien : sur son site, chaque facture part d'une seule façon, par le connecteur. Il réduit le risque sans doublon."
    ],
    retenir: "En parallèle, l'ancien et le nouveau tournent ensemble : bien pour des rapports, exclu pour des factures (doublons)."
  },
  {
    id: "cp21-q29",
    dialecte: "Gestion de projet",
    q: "Hypercare, mardi 15. Hier, 25 appels directs de la compta sur ton portable. Ce matin, tu ne sais plus qui attend quoi. Que fais-tu ?",
    choix: [
      "Tu notes chaque appel dans ton cahier, et tu rappelles",
      "Tu ne prends plus d'appel, et tu renvoies tout au support",
      "Tu demandes au DAF un 2e chef de projet pour l'hypercare",
      "Tout en ticket, même chez toi ; tri à 9 h 30"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Presque : c'est écrit. Mais dans ton cahier, personne d'autre ne le voit : ni le tri de 9 h 30, ni le N2, ni la PA. Et tout repasse par toi.",
      "Non. Le support est le bon canal, mais couper les appels en pleine hypercare, c'est rater l'appel grave. Tu prends l'appel, puis il part en ticket.",
      "Non. Le problème n'est pas le nombre de bras, c'est le canal : avec des tickets, l'équipe en place suffit.",
      "Oui. Un appel peut arriver chez toi ; il repart en ticket, même court. Au point de 9 h 30, on voit tout, on trie, on donne une date. Rien ne se perd."
    ],
    retenir: "En hypercare, tout passe par un ticket, même ce qui arrive dans ton bureau : sinon, rien n'est trié."
  },
  {
    id: "cp21-q30",
    dialecte: "Gestion de projet",
    q: "Hypercare, jour 3. Le point de 9 h 30 dure 1 h 15 : chacun raconte sa journée de la veille. Que fais-tu ?",
    choix: [
      "20 minutes : tickets nouveaux, tri, qui, pour quand",
      "Tu le laisses durer : il faut que chacun puisse s'exprimer",
      "Tu le supprimes : l'outil de tickets suffit à tout suivre",
      "Tu le passes à 1 fois par semaine : c'est plus raisonnable"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Un point court, sur les tickets : ce qui est nouveau, sa gravité, qui s'en charge, pour quand. Les récits et les débats se règlent après, à deux.",
      "Non. 1 h 15 chaque matin, à 6 personnes : plus d'une journée de travail perdue chaque jour, en pleine hypercare. Et l'urgent se perd dans les récits.",
      "Non. Les tickets disent ce qui ne va pas ; le point fait décider qui s'en charge, chaque jour. Sans lui, le tri attend.",
      "Non. Plus court, oui. Mais en hypercare, les incidents vont vite : un point par semaine, c'est 5 jours de tri en retard. Le plan dit chaque jour."
    ],
    retenir: "Le point quotidien d'hypercare est court : les tickets nouveaux, leur gravité, qui fait quoi, pour quand."
  },
  {
    id: "cp21-q31",
    dialecte: "Gestion de projet",
    q: "Point de 9 h 30, jeudi 17 juin. Quatre nouveaux tickets. Lequel passe en premier ?",
    choix: [
      "Un libellé mal orthographié sur le PDF des factures",
      "L'écran des factures reçues met 10 secondes le matin",
      "Les factures d'un fournisseur n'arrivent plus dans Divalto",
      "Un état des factures par dépôt, pour un chef de site"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Un libellé gêne, sans rien bloquer : c'est mineur. Il aura sa date, après le reste.",
      "Non. Ça agace tout le monde, chaque matin. Mais tout passe : c'est une gêne, pas un blocage.",
      "Oui. On ne peut plus recevoir ses factures : c'est bloquant. On cherche tout de suite, avec un contournement en attendant (les lire sur le portail de la PA).",
      "Non. Ce n'est pas une anomalie : c'est une demande nouvelle. Elle s'écrit, et attend la fin du gel (module cp10)."
    ],
    retenir: "En hypercare, on trie : le bloquant d'abord (on ne peut plus facturer ou recevoir), puis le majeur, puis le mineur. Une demande nouvelle n'est pas une anomalie."
  },
  {
    id: "cp21-q32",
    dialecte: "Gestion de projet",
    q: "Hypercare, jour 5. Julie : « Il me faudrait une alerte quand un fournisseur envoie un avoir. Le consultant dit : 1 jour. » Que fais-tu ?",
    choix: [
      "Oui : en hypercare, on règle tout ce qui gêne la compta",
      "Tu l'écris : une demande nouvelle attend la fin du gel",
      "Tu la chiffres, et le DAF lève le gel pour elle",
      "Tu la fais classer bloquante : elle passera le gel"
    ],
    bonne: 1,
    pourquoi: [
      "Non. L'hypercare corrige ce qui ne marche pas. Une alerte nouvelle, c'est un changement : en pleine bascule, chaque ajout est un risque de plus.",
      "Oui. Rien n'est cassé : c'est une demande nouvelle. Tu l'écris (qui, quoi, pourquoi) ; elle attend la fin du gel, le 25 juin, puis suit son circuit (module cp10). Julie sait quand.",
      "Non. Le DAF peut lever le gel, mais pour une alerte utile qui peut attendre une semaine ? Tu le déranges pour rien, et tu ouvres la porte aux suivantes.",
      "Non. L'étiquette ne change pas la nature : sans l'alerte, tout marche. Tricher sur la gravité, c'est casser le tri pour tout le monde."
    ],
    retenir: "En hypercare, une anomalie se corrige ; une demande nouvelle s'écrit et attend la fin du gel."
  },
  {
    id: "cp21-q33",
    dialecte: "Gestion de projet",
    q: "Hypercare, mercredi 16. Ce matin, le consultant : « Hier soir, j'ai corrigé un réglage en production : les factures d'un dépôt passent enfin. Pas eu le temps de faire un ticket. » Que fais-tu ?",
    choix: [
      "Ticket et trace aujourd'hui, et un test des autres dépôts",
      "Tu lui demandes son ticket d'ici vendredi, sans plus",
      "Tu fais défaire sa correction : elle n'a pas suivi le circuit",
      "Tu le signales à son employeur, et au DAF le jour même"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. On rattrape : le ticket (quoi, où, pourquoi), la trace du réglage, et un test des autres dépôts. Puis la règle, redite au point de 9 h 30 : en production, testé et tracé, même la nuit.",
      "Non. Presque : le ticket, oui. Mais vendredi, c'est 2 jours sans trace, et rien n'est testé : si un autre dépôt casse demain, personne ne fera le lien.",
      "Non. Défaire une correction qui marche, c'est rebloquer les factures de ce dépôt. Le circuit se rattrape : trace et test, maintenant.",
      "Non. 1re fois, et il a réglé un vrai blocage : le dénoncer, c'est lui apprendre à cacher. La règle se redit ; si ça recommence, tu montes d'un niveau (module cp16)."
    ],
    retenir: "Une correction en production sans trace se rattrape tout de suite : ticket, trace, test. Puis la règle se redit à tous."
  },
  {
    id: "cp21-q34",
    dialecte: "Gestion de projet",
    q: "Vendredi 11, 14 h. Pilote : 3 % de rejets sur ses 2 dernières semaines ; critère : moins de 2 %. Le responsable ADV : « On n'a pas le choix : c'est une obligation légale. » Que réponds-tu ?",
    choix: [
      "« Exact : la loi passe avant nos critères, on y va lundi »",
      "« Faux : rien n'est obligatoire pour nous avant l'année 2028 »",
      "« Alors basculons début août : l'activité y sera plus calme »",
      "« Émettre devient obligatoire le 1er septembre : mi-juillet tient »"
    ],
    bonne: 3,
    pourquoi: [
      "Non. La loi fixe une date, pas le 14 juin. Basculer avec un critère rouge « pour la loi », c'est risquer de vraies factures rejetées, sans y être obligé.",
      "Non. C'est faux : la réception est déjà obligatoire, l'émission le sera le 1er septembre 2027. Minimiser la loi, c'est perdre ta crédibilité.",
      "Non. Pas de bascule en août : la compta est à 2 personnes sur 6, et plus aucune marge avant le 1er septembre. Si on reporte, c'est mi-juillet.",
      "Oui. L'émission devient obligatoire le 1er septembre 2027. Juillet-août est la marge : un report à mi-juillet, décidé par le DAF, la tient encore. La date légale ne force pas un go en juin."
    ],
    retenir: "« C'est la loi » ne force pas un go : la date légale est le 1er septembre 2027, et la marge de juillet existe. Jamais en août."
  },
  {
    id: "cp21-q35",
    dialecte: "Gestion de projet",
    q: "Vendredi 11. Tous les critères sont atteints, preuves en main ; le retour arrière est testé. Hier, le consultant t'a raconté une bascule ratée chez un autre client. Tu as peur. Que recommandes-tu ?",
    choix: [
      "Un no-go : prudence, on n'est jamais assez prêt",
      "Un go : tous les faits le disent, et on sait revenir",
      "Un report d'une semaine, pour un dernier test complet",
      "Un go sous conditions : un 2e test du retour arrière samedi"
    ],
    bonne: 1,
    pourquoi: [
      "Non. C'est un no-go par peur : aucun fait de ce projet ne le justifie. Tu ferais perdre des semaines de marge, et l'équipe ne croirait plus aux critères.",
      "Oui. Ta peur vient d'un autre projet, pas d'un fait de celui-ci. Critères atteints, preuves, retour arrière testé : tu recommandes go. Le DAF décide.",
      "Non. Un dernier test « pour être sûr » : de quoi ? Tous les critères sont prouvés. Une semaine, c'est le gel prolongé, et ton doute transmis à l'équipe.",
      "Non. Presque : c'est un go. Mais une condition sans critère rouge ne protège de rien : le retour arrière est déjà testé. Tu ajoutes du travail au week-end."
    ],
    retenir: "Critères atteints et retour arrière prêt : tu recommandes go. Une peur sans fait n'est pas un critère."
  },
  {
    id: "cp21-q36",
    dialecte: "Gestion de projet",
    q: "Tu es DSI adjoint. Montée de version de Divalto : une seule base pour les 3 dépôts. Ton chef de projet propose de basculer dépôt par dépôt, « comme DEMAT ». Que réponds-tu ?",
    choix: [
      "« Oui : le progressif est toujours le moins risqué »",
      "« Oui, avec un mois de pilote sur un dépôt, avant de basculer »",
      "« Non : une base unique bascule d'un bloc, répétée avant »",
      "« Non : l'ancienne et la nouvelle base, un mois en parallèle »"
    ],
    bonne: 2,
    pourquoi: [
      "Non. « Toujours » : le choix dépend du contexte. Une base unique ne se coupe pas en morceaux : deux dépôts dans l'ancienne version, un dans la nouvelle, c'est impossible.",
      "Non. Un pilote réduit le risque, d'habitude. Mais une seule base ne peut pas être dans deux versions à la fois : ici, le pilote par dépôt n'existe pas.",
      "Oui. Une seule base : big bang, tout en une fois. On le sécurise autrement : une répétition sur une copie, des contrôles, et une sauvegarde pour revenir en arrière.",
      "Non. Deux versions en parallèle, c'est tout saisir deux fois pendant un mois : personne ne le tiendra, et les deux bases divergeront."
    ],
    retenir: "Big bang ou progressif dépend du contexte : une base unique bascule d'un bloc, sécurisée par une répétition et un retour arrière."
  },
  {
    id: "cp21-q37",
    dialecte: "Gestion de projet",
    q: "Tu es DSI adjoint. Un chef de projet remplace les rapports de la direction par des rapports Power BI sur Snowflake. Il veut couper les anciens le jour de la mise en service. Que proposes-tu ?",
    choix: [
      "Les deux en parallèle sur une clôture, on compare, puis on coupe",
      "D'accord : couper net évite que chacun garde ses vieux chiffres",
      "Garder les anciens un an, et comparer les deux chaque mois",
      "Un pilote : un seul dépôt voit les nouveaux rapports pendant 3 mois"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Des rapports peuvent tourner en parallèle sans risque : on compare les chiffres sur une vraie clôture de mois, on explique les écarts, puis on coupe les anciens, à une date annoncée.",
      "Non. Presque : il faudra couper, oui. Mais personne n'a comparé : un écart découvert en comité de direction, et plus personne ne croit les nouveaux rapports.",
      "Non. Un an de double : deux chiffres qui circulent, deux outils à maintenir. Le parallèle a une fin, fixée d'avance.",
      "Non. Les rapports de la direction regardent toute l'entreprise : un dépôt seul ne teste pas les totaux. Et 3 mois, c'est long pour un écart qu'une clôture suffit à montrer."
    ],
    retenir: "Pour des rapports, le parallèle est le plus sûr : on compare sur une vraie clôture, puis on coupe l'ancien à une date fixée."
  },
  {
    id: "cp21-q38",
    dialecte: "Gestion de projet",
    q: "Tu es DSI adjoint. Changement de l'outil de traduction EDI : 40 partenaires. Ton chef de projet veut basculer les 40 le même week-end. Que réponds-tu ?",
    choix: [
      "« D'accord : les 40 partenaires en un seul week-end »",
      "« En parallèle : chaque message part par les 2 outils, un mois »",
      "« Un partenaire par semaine : 40 semaines, mais aucun risque »",
      "« Par vagues : quelques partenaires d'abord, testés avec eux »"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Chaque partenaire a ses règles : 40 d'un coup, c'est 40 sources de rejets le même lundi, et un support débordé.",
      "Non. Une commande ou une facture envoyée par deux outils arrive deux fois chez le partenaire : des doublons, des livraisons en double.",
      "Non. Progressif, oui. Mais 40 semaines, c'est près d'un an à faire tourner deux outils, et « aucun risque » n'existe pas. Des vagues suffisent.",
      "Oui. Progressif, par vagues : quelques partenaires simples d'abord, testés avec eux, puis les suivants ; les plus gros quand la méthode est rodée. Chaque vague a son retour arrière."
    ],
    retenir: "Plusieurs partenaires qui ont chacun leurs règles : on bascule par vagues, chacune testée, plutôt que tout le même week-end."
  },
  {
    id: "cp21-q39",
    dialecte: "Gestion de projet",
    q: "Tu es DSI adjoint. Un chef de projet met en service un nouvel état Divalto pour l'ADV. Il prévoit un go / no-go avec le DAF et 6 critères, comme DEMAT. Que lui dis-tu ?",
    choix: [
      "« Bien : la même méthode pour tous les projets, c'est simple »",
      "« Une liste courte, l'ancien état gardé ; l'ADV dit go »",
      "« Rien de tout ça : un état pour l'ADV, on le met en production »",
      "« Une liste courte, et c'est toi qui dis go : c'est ton projet »"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Un go / no-go avec le DAF pour un état : son temps pour rien, et une méthode lourde que les chefs de projet finiront par sauter.",
      "Oui. La méthode se taille au risque : quelques critères, une preuve, un retour arrière simple (l'ancien état gardé). Le responsable ADV, qui s'en sert, dit go.",
      "Non. Même petit, un état faux arrive chez l'ADV : on vérifie qu'il est testé et validé, et on garde de quoi revenir.",
      "Non. Presque : la bonne taille. Mais le chef de projet recommande ; le go revient à celui qui porte le métier, le responsable ADV."
    ],
    retenir: "Le go / no-go se taille au risque : petit changement, liste courte, l'ancien gardé, le métier dit go."
  },
  {
    id: "cp21-q40",
    dialecte: "Gestion de projet",
    q: "Tu es DSI adjoint. Ton chef de projet du nouveau WMS (logiciel d'entrepôt) recommande un no-go : 2 critères rouges. Le sponsor, directeur logistique, te demande de « le raisonner ». Que fais-tu ?",
    choix: [
      "Tu lui demandes de recommander go : le sponsor le veut",
      "Tu décides toi-même le no-go : tu es au-dessus de lui",
      "Tu revois les faits avec lui ; son avis reste le sien",
      "Tu demandes au DG de trancher entre le sponsor et lui"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Une recommandation tordue pour plaire ne sert plus à rien : le sponsor décide sur un faux avis. Et ton chef de projet apprend que les critères ne comptent pas.",
      "Non. Le go / no-go est au sponsor, pas à la DSI. Toi, tu protèges la qualité de la recommandation, pas la décision.",
      "Oui. Tu vérifies les faits avec lui : les 2 critères sont-ils bien rouges ? Puis il présente sa recommandation ; le sponsor décide en la connaissant. S'il y va quand même, c'est son choix, écrit.",
      "Non. Il n'y a pas de conflit à arbitrer : le sponsor n'a pas encore décidé. Il le fera, recommandation en main."
    ],
    retenir: "DSI adjoint : tu protèges la recommandation de ton chef de projet, faits vérifiés ; le sponsor décide en la connaissant."
  }
,
  {
    id: "cp21-q41",
    dialecte: "Gestion de projet",
    q: "Lundi 14, 11 h. 15 % de rejets depuis 8 h. L'intégrateur a une piste, sans certitude, pas avant 16 h. Le DAF t'appelle : « On continue, ou on revient ? » Que recommandes-tu ?",
    choix: [
      "« On continue : l'intégrateur a une piste, laissons-lui sa chance »",
      "« On continue jusqu'à 16 h, et on revient si sa piste échoue »",
      "« On revient : rien de sûr avant midi, l'heure limite »",
      "« À toi de voir : c'est toi le sponsor, je n'ai pas d'avis »"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Une piste sans certitude, c'est un pari. Si elle échoue à 16 h, midi est passé : on ne peut plus revenir, et les rejets continuent des jours.",
      "Non. Presque : revenir si ça échoue, c'est l'idée. Mais à 16 h, le point de non-retour est passé : revenir coûterait plus que corriger. La décision se prend avant midi.",
      "Oui. Rien de sûr avant le point de non-retour : tu recommandes de revenir, par le portail, comme prévu. L'intégrateur cherche la cause au calme ; la nouvelle date viendra, décidée par le DAF.",
      "Non. Il décide, oui, mais sur ta recommandation : tu es R, c'est ton rôle de lui en donner une. Sans avis, il tranche seul, en 2 minutes, sur ce que tu connais le mieux."
    ],
    retenir: "Avant le point de non-retour, sans correction sûre à temps : tu recommandes de revenir. Après, il sera trop tard."
  }
];
