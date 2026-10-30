// Chef de projet SI — Questions du module cp05 « Planifier ».
// Fond (PMBOK : organigramme des tâches ou WBS, estimation à trois points, réseau de tâches, chemin critique, marge d'une
// tâche, compression des délais en parallèle ou avec des ressources ; chaîne critique de Goldratt : la marge regroupée en
// fin de chaîne ; loi de Brooks ; terrain PME / ETI) : découper (par livrable, pas par phase ; livrable vérifiable ;
// tâches de quelques jours ; rien d'oublié, un responsable nommé ; le planning est au chef de projet, le prestataire y
// détaille et estime ses tâches) ; estimer (charge ≠ durée ; durée = charge ÷ disponibilité ; quelqu'un à 200 % =
// planning faux ; l'estimation vient de celui qui fait ; 3 points ; une estimation baisse avec le contenu, pas sous la
// pression) ; dépendances (fin-début ; chemin critique = le plus long, pas la somme ; marge ; le chemin critique change ;
// accélérer hors du chemin critique ne sert à rien ; le Gantt, la partie agile en itérations) ; rétroplanning (depuis la
// date imposée, dates au plus tard ; période chargée → avant ; personne rare d'abord ; clôture de janvier, gel dès le
// pilote) ; jalons (date + livrable vérifiable ; intermédiaires ; le DAF valide jalons et marges, ± 2 semaines) ; marges
// (une seule, visible, en bout de chaîne, à la taille des risques ; ni cachée dans chaque tâche, ni d'avance, ni à un
// prestataire ; marge de recette ≠ marge légale) ; réalisme et accélérer (planning réaliste, pas « pour motiver » ;
// parallèle et risque de reprise ; moins de périmètre ; du monde en plus : Brooks, sauf travail découpable). Les pratiques
// divergent : le PMBOK admet une réserve par tâche ou pour le projet, la chaîne critique la met à la fin (choix retenu,
// q28, q38) ; en agile, pas de date par écran (q06).
// Fil rouge DEMAT 2027 (fiche fil rouge de docs/plan-chef-de-projet.md, qui fait foi), ligne « Planning (module cp05) » :
// lots, chemin critique (données de paramétrage du 15 janvier, paramétrage, connecteur livré le 1er mars, recette, PV du
// 30 avril, pilote, bascule), contraintes (clôture de janvier, gel dès le pilote de mai, pas de bascule en août), jalons
// validés par le DAF, ± 2 semaines ; recette du 16 mars au 30 avril avec 1 semaine de marge de recette ; marge légale
// juillet-août. Pas de budget de changement délégué : chaque jour d'intégrateur en plus = une commande du DAF (q33).
// Report à mi-juillet = décision du DAF (q30). Promesse du bilan (cp01-q06) tenue sans refaire le cas : q16, q17, q31.
// Faits ajoutés (cohérents avec la fiche et les modules publiés, à valider) : congé de la cheffe comptable du 12 au
// 30 avril (q23 ; cp06 : 3 semaines en avril ; cp18-q14 : la recette finit pendant son congé) ; Julie suppléante sur les
// avoirs fournisseurs (fiche) ; planning détaillé de 180 tâches (q27) ; variantes : 300 fiches clients sans SIREN (q04),
// flux EDI estimés à 12 jours (q11), supports de formation avec 3 semaines de marge (q15, q16), Marc à 200 % la semaine
// du 12 avril (q20), données de paramétrage préparées par la compta (q22, comme cp14-q30), jalon de formation du 28 mai
// (q25), consultant qui veut livrer les flux EDI 1 semaine plus tard (q29), flux EDI en retard de 4 semaines en avril
// (q31), 1er planning détaillé au 12 juillet (q33), recette fournisseurs lancée plus tôt (q34), paramétrage en retard de
// 2 semaines en janvier (q36). Autres projets (son vécu) : flux EDI (q10, q13, q18, q24), Snowflake + Power BI (q03, q08,
// q14, q17, q19, q35), migration Divalto (q37, q38), WMS (q39). Dates vérifiées : lundi 18 octobre 2027, lundi 6 septembre
// 2027 (q24), vendredi 15 janvier, lundi 4 janvier, lundi 12 avril, vendredi 28 mai, lundi 12 juillet 2027.
// Affirmations juridiques hors fiche (générales, à faire vérifier) : quand le retard vient du client (données en retard),
// les pénalités de retard de la PA ne jouent plus, en général (q22, comme cp14-q18 et q30) ; les heures en plus d'un
// consultant en régie se décident avec son employeur (q36, comme cp15).
// Déjà publiées ailleurs, pas reprises ici : cp01-q06 (connecteur en retard sur le chemin critique), cp04-q26 et q42
// (jalons au cadrage, tolérance), cp07-q23 et q25, cp16-q20 et q21 (un retard pris sur la marge de recette), cp10-q18
// (petits oui qui mangent la marge), cp14-q18 et q30 (date du 15 janvier dans le contrat), cp15-q38 (planning commun de
// deux prestataires), cp17-q35 et cp01-q20 (avancer la bascule), cp18-q16 (bascule à mi-juillet). q22 est voisine de
// cp14-q18 (même date, autre geste : planifier le travail avant la clôture, contrat déjà signé).
// Frontières : cadrage, jalons macro et tolérances = cp04 ; démarche et partie agile = cp06 ; risques et plan B = cp07 ;
// suivre l'avancement réel, mettre à jour le planning, reporter = cp08 ; instances = cp09 ; changement et gel = cp10 ;
// budget = cp12 ; planning commun des prestataires, binôme = cp15 ; temps d'un autre service = cp16 ; triangle,
// délégation = cp18 ; portefeuille = cp25 ; ton propre temps = cp02.
// Anti-devinette : la bonne réponse est un extrême dans 11 questions sur 37 (hors notions q12, q15, q21, q25) : la plus
// douce qui suffit (q02, q14, q16, q35), la plus forte quand elle se justifie (q11, q19, q24, q29, q31, q32, q39).
// Règles du module (sous 50 %) : « le chemin ou la durée la plus longue » 18 %, « le choix qui ajoute une marge » 20 %,
// « celui qui ajoute des personnes » 6 % (le renfort n'est juste que dans q41) ; calculs : « le plus grand nombre » 20 %,
// « le plus petit » 10 %, « celui du milieu » 35 %. « Le jour même », « aujourd'hui », « dès », « tout de suite », « Rien »,
// « tout », « seul », « jamais », « Oui », « D'accord », le DAF, le COPIL et le sponsor sont aussi dans des bonnes réponses.
// q38 à q41 : « Tu es DSI adjoint ».
LEARNSQL.questions.cp05 = [
  {
    id: "cp05-q01",
    dialecte: "Gestion de projet",
    q: "Décembre. Dans le planning de l'intégrateur, le livrable du lot des flux EDI est : « Flux EDI avancés à 80 % fin mars ». Que fais-tu ?",
    choix: [
      "Tu le gardes : 80 %, c'est un chiffre, donc ça se suit",
      "Tu demandes en plus un pourcentage, chaque semaine",
      "Tu fais écrire : « factures d'AquaBleu acceptées en test »",
      "Tu demandes au DAF d'exiger 100 % fin mars, par écrit signé"
    ],
    bonne: 2,
    pourquoi: [
      "Non. 80 % de quoi ? Personne ne peut le vérifier. Fin mars, tu apprendrais qu'il reste « 20 % », sans savoir lesquels.",
      "Non. Presque : suivre chaque semaine, oui. Mais un pourcentage reste invérifiable : 80 % peut cacher le flux le plus dur, pas commencé.",
      "Oui. Un livrable se vérifie : les factures de test d'AquaBleu passent, ou pas. L'intégrateur, Marc et toi savez quand c'est fini.",
      "Non. Le problème n'est pas l'engagement : c'est un livrable que personne ne sait vérifier. « 100 % » ne se vérifie pas mieux, et le DAF n'a rien à trancher."
    ],
    retenir: "Un livrable se vérifie : « factures acceptées en test », pas « avancé à 80 % »."
  },
  {
    id: "cp05-q02",
    dialecte: "Gestion de projet",
    q: "Le planning de l'intégrateur tient en une ligne : « Paramétrage Divalto, de décembre à février ». Que lui demandes-tu ?",
    choix: [
      "Ses tâches de quelques jours, chacune avec son résultat",
      "Son détail heure par heure, pour suivre chaque journée",
      "Rien : tu le découpes toi-même, tu connais Divalto",
      "Que le DAF exige, par écrit, un planning détaillé"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Des tâches de quelques jours, chacune avec un résultat vérifiable : un retard se voit dès décembre, et ce qui attend la PA ou la compta aussi.",
      "Non. Trop fin : un planning à l'heure ne se tient pas, et tu suivrais ses heures, pas ses résultats.",
      "Non. C'est son travail, et c'est à lui de l'estimer. Découpé par toi, le planning ne l'engage pas.",
      "Non. Trop fort : ce n'est pas un litige. Le planning commun, c'est ton travail : tu lui demandes ses tâches toi-même, sans le DAF."
    ],
    retenir: "On découpe jusqu'à des tâches de quelques jours, chacune avec un résultat vérifiable."
  },
  {
    id: "cp05-q03",
    dialecte: "Gestion de projet",
    q: "Ton projet Snowflake + Power BI : 3 lignes au planning, « Données », « Tableaux », « Recette », de 4 semaines chacune. Le sponsor demande ce qu'il aura dans 6 semaines. Que changes-tu ?",
    choix: [
      "Chaque phase passe à 2 semaines, pour livrer plus tôt",
      "Des maquettes des tableaux ; il les verra dans 6 semaines",
      "Rien : dans 12 semaines, il aura tout, comme prévu",
      "Un découpage par sujet : ventes, puis achats, chacun publié"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Mêmes tâches, moins de temps : tu promets ce que l'équipe ne peut pas tenir. Et le découpage, lui, n'a pas changé.",
      "Non. Presque : il verra quelque chose. Mais une maquette n'est pas un livrable : rien n'est chargé ni vérifié.",
      "Non. Dans 6 semaines, il n'aura rien d'utilisable : des données chargées, sans tableau. Et un retard ne se verra qu'à la recette, à la fin.",
      "Oui. Un livrable par sujet : les ventes chargées, testées, publiées, puis les achats. Dans 6 semaines, il a un vrai résultat, vérifié."
    ],
    retenir: "On découpe par livrable (un tableau chargé, publié, vérifié), pas par phase (« les données »)."
  },
  {
    id: "cp05-q04",
    dialecte: "Gestion de projet",
    q: "Décembre. Une facture électronique sans le SIREN du client est rejetée. Dans Divalto, 300 fiches clients n'en ont pas. Ton découpage n'en parle pas. Que fais-tu ?",
    choix: [
      "Tu fais décaler la recette d'un mois, le temps de les corriger",
      "Une tâche : l'ADV, une charge, une date avant la recette",
      "Tu complètes toi-même les 300 fiches, ce week-end, au calme",
      "Tu l'écris au registre des risques, avec sa probabilité"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Trop fort : 300 fiches se corrigent bien avant le 16 mars. Décaler la recette, c'est décaler le PV et toute la suite, pour une tâche qu'il suffit d'ajouter.",
      "Oui. Ce qui manque au découpage y entre, comme une tâche : un responsable (l'ADV, l'administration des ventes, avec l'accord de son responsable), une charge, une date avant la recette.",
      "Non. Tu fais à la place de l'ADV, sans charge prévue. Et la prochaine fiche sans SIREN n'aura toujours personne.",
      "Non. Presque : tu le notes. Mais ce n'est pas incertain : les 300 fiches manquent déjà. C'est du travail à faire : une tâche, avec un nom et une date."
    ],
    retenir: "Ce qui manque au découpage devient une tâche : un responsable nommé, une charge, une date."
  },
  {
    id: "cp05-q05",
    dialecte: "Gestion de projet",
    q: "L'intégrateur propose : « Je fais tout le planning du projet, vous n'aurez qu'à le suivre. Je fais ça pour tous mes clients. » Que réponds-tu ?",
    choix: [
      "« Non : je fais tout le planning seul, vos tâches comprises »",
      "« Le planning est à moi, et vous y détaillez vos tâches »",
      "« D'accord, et le DAF le validera au COPIL, sans retouche »",
      "« D'accord : vous connaissez Divalto mieux que nous »"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Presque : le planning est bien à toi. Mais ses tâches, c'est lui qui les connaît : estimées par toi, elles ne l'engagent pas.",
      "Oui. Le planning du projet est à toi : il croise la PA, la compta, l'ADV et les contraintes. L'intégrateur y détaille et estime ses tâches.",
      "Non. Validé sans retouche, un planning qui ignore la PA et la compta devient la référence du DAF. Les surprises arriveront en recette.",
      "Non. Son planning ne voit ni la PA, ni la clôture de la compta, ni les congés. Et c'est toi qui réponds de la date."
    ],
    retenir: "Le planning du projet est au chef de projet ; chaque prestataire y détaille et estime ses tâches."
  },
  {
    id: "cp05-q06",
    dialecte: "Gestion de projet",
    q: "Tu fais le Gantt de DEMAT. Les écrans de la compta se construisent en itérations de 2 semaines, de février à avril. Comment les y mets-tu ?",
    choix: [
      "Nulle part : en agile, il n'y a pas de dates",
      "Une seule barre « écrans », sans date de fin fixée",
      "Une barre par écran, chacun avec sa date de livraison",
      "Une barre par itération : leur contenu, c'est le backlog"
    ],
    bonne: 3,
    pourquoi: [
      "Non. L'agile a des dates : chaque itération, sa démo, et la fin en avril, avant le pilote. Hors du Gantt, tu ne vois pas ce qu'elle touche.",
      "Non. Presque : une barre peut suffire. Mais sans date de fin, les itérations débordent sur mai, pendant le gel des changements.",
      "Non. En agile, le contenu varie : une date par écran promet ce que la cheffe comptable n'a pas encore classé. C'est le cœur cadré qui se planifie tâche par tâche.",
      "Oui. La partie agile fixe le temps et l'enveloppe : des itérations de 2 semaines, de février à avril. Ce qui sera fait dépend du backlog, classé par la cheffe comptable (module cp06)."
    ],
    retenir: "La partie agile entre au planning en itérations de durée fixe ; leur contenu, c'est le backlog."
  },
  {
    id: "cp05-q07",
    dialecte: "Gestion de projet",
    q: "Sophie doit écrire ses cas de test des factures clients : 3 jours de travail. Sa cheffe lui accorde 2 après-midi par semaine pour le projet. Quelle durée mets-tu au planning ?",
    choix: [
      "3 semaines : 1 jour par semaine, pour 3 jours",
      "6 semaines : 3 jours font 6 après-midi de travail",
      "1 semaine et demie : 2 après-midi, 2 jours",
      "3 jours : c'est la charge qu'elle a estimée"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. 2 après-midi par semaine, c'est 1 jour. 3 jours de charge ÷ 1 jour par semaine = 3 semaines de durée.",
      "Non. 3 jours font bien 6 après-midi. Mais elle en a 2 par semaine : 6 ÷ 2 = 3 semaines, pas 6.",
      "Non. 2 après-midi, ce n'est pas 2 jours : c'est 1 jour. 3 jours de charge prennent donc 3 semaines, pas 1 et demie.",
      "Non. 3 jours, c'est la charge : le travail. Elle n'a qu'1 jour par semaine pour le projet : ton planning serait faux de plus de 2 semaines."
    ],
    retenir: "Durée = charge ÷ disponibilité : 3 jours de travail, à 1 jour par semaine, font 3 semaines."
  },
  {
    id: "cp05-q08",
    dialecte: "Gestion de projet",
    q: "Projet Snowflake + Power BI. Le prestataire estime le modèle de données à 15 jours : « Fini dans 3 semaines. » Son consultant travaille pour vous 3 jours par semaine. Que fais-tu ?",
    choix: [
      "Tu notes 3 semaines, plus 1 semaine de marge, par prudence",
      "Tu notes 3 semaines : 15 jours de travail, c'est 3 semaines",
      "Tu fais recaler : 15 jours, à 3 par semaine, font 5 semaines",
      "Tu demandes un 2e consultant, pour tenir les 3 semaines"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Presque : tu sens que 3 semaines ne tiendront pas. Mais 4 semaines restent fausses, le calcul dit 5. Une marge ne corrige pas une erreur.",
      "Non. 15 jours font 3 semaines à temps plein. Son consultant n'est là que 3 jours par semaine : la date est fausse dès le départ.",
      "Oui. Durée = charge ÷ disponibilité : 15 ÷ 3 = 5 semaines. Tu lui fais confirmer cette date, puis elle va au planning.",
      "Non. Rien n'impose 3 semaines : la date est juste mal calculée. Un 2e consultant coûte, et devra d'abord apprendre votre modèle."
    ],
    retenir: "Une date se calcule avec la disponibilité réelle de chacun, pas en supposant un temps plein."
  },
  {
    id: "cp05-q09",
    dialecte: "Gestion de projet",
    q: "Décembre. Tu as déjà paramétré les statuts de facture sur un autre projet : 3 jours. Le consultant de l'intégrateur te répondra jeudi. Le DAF veut ton planning vendredi. Que mets-tu pour cette tâche ?",
    choix: [
      "Tes 3 jours, plus 50 % de marge, par simple sécurité",
      "Rien : tu demandes au DAF de repousser à lundi",
      "Tes 3 jours : tu l'as déjà fait, pas besoin de lui",
      "Son estimation, que tu compares à tes 3 jours"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Tu gonfles ton propre chiffre au lieu de demander. Une marge se pose une fois, visible, à la fin, pas sur chaque tâche.",
      "Non. Il répond jeudi : tu as tout pour vendredi. Repousser tout le planning pour une tâche, c'est disproportionné.",
      "Non. C'est lui qui fera le travail, sur votre Divalto et avec cette PA. Ton chiffre ne l'engage pas, et le contexte n'est pas le même.",
      "Oui. L'estimation vient de celui qui fait. Ta référence sert à la challenger : s'il dit 8 jours, tu lui demandes ce qui change."
    ],
    retenir: "L'estimation vient de celui qui fait ; ton expérience sert à la challenger."
  },
  {
    id: "cp05-q10",
    dialecte: "Gestion de projet",
    q: "Projet EDI : un nouveau flux de commandes avec AquaBleu. Le développeur hésite : « Au mieux 8 jours, sans doute 11, au pire 20. » Avec l'estimation en 3 points, quelle charge retiens-tu ?",
    choix: [
      "20 jours : le pire, pour être tranquille",
      "11 jours : le chiffre le plus probable",
      "12 jours : (8 + 4 × 11 + 20) ÷ 6",
      "13 jours : la moyenne des trois chiffres"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Le pire partout, c'est un planning trop long, qu'on finit par remplir. L'incertitude se gère avec une marge visible, à la fin.",
      "Non. Le probable seul oublie le risque : 20 jours au pire, c'est loin au-dessus. La moyenne pondérée en tient compte.",
      "Oui. (8 + 44 + 20) ÷ 6 = 72 ÷ 6 = 12 jours. Le probable compte 4 fois ; le pire tire un peu vers le haut.",
      "Non. Presque : tu tiens compte des trois chiffres. Mais la moyenne simple donne autant de poids au pire qu'au probable : 13 au lieu de 12."
    ],
    retenir: "Estimation en 3 points : (optimiste + 4 × probable + pessimiste) ÷ 6."
  },
  {
    id: "cp05-q11",
    dialecte: "Gestion de projet",
    q: "Le consultant estimait les flux EDI à 12 jours. Le DAF a trouvé ça long. Le lendemain, le consultant t'écrit : « Mettons 8 jours, on y arrivera. » Le contenu est le même. Que fais-tu ?",
    choix: [
      "Tu mets 8 jours : c'est lui qui fait, c'est son estimation",
      "Tu lui demandes ce qui a changé. Sans raison, tu gardes 12",
      "Tu mets 8, et tu gardes 4 jours de côté, sans le dire",
      "10 jours : l'option du milieu, chacun fait un pas"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Presque : l'estimation vient bien de celui qui fait. Mais elle a baissé sous la pression, pas parce que le travail a changé. À 8 jours, le planning glissera en mars.",
      "Oui. Une estimation change avec le contenu, pas parce que le DAF trouve ça long. Sans fait nouveau, 12 jours restent au planning. Le DAF veut moins ? Moins de contenu, et il choisit.",
      "Non. Une marge cachée, c'est un planning faux pour tout le monde. Le jour où elle sert, personne ne sait pourquoi le planning tient encore.",
      "Non. Couper la poire en deux, c'est encore un chiffre sans fait : 10 jours ne viennent ni du travail, ni du consultant. Le planning glissera quand même."
    ],
    retenir: "Une estimation baisse quand le contenu baisse, pas sous la pression : sinon, le planning plaît, puis il glisse."
  },
  {
    id: "cp05-q12",
    dialecte: "Gestion de projet",
    q: "La cheffe comptable découvre ton Gantt : « Ça montre quoi, exactement ? » Que lui réponds-tu ?",
    choix: [
      "Les tâches sur un calendrier, leurs liens et les jalons",
      "Le coût de chaque tâche, mois par mois, jusqu'à la fin",
      "Qui fait, qui approuve, qui est consulté, tâche par tâche",
      "L'avancement réel de chaque tâche, en pourcentage"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Une barre par tâche sur le calendrier, des flèches pour les dépendances, un losange par jalon. Le chemin critique y est souvent en rouge.",
      "Non. Ça, c'est le suivi du budget (module cp12). Le Gantt montre le temps : quand, et dans quel ordre.",
      "Non. Ça, c'est le RACI (module cp09). Le Gantt dit quand et dans quel ordre, pas qui décide.",
      "Non. Presque : un Gantt mis à jour peut montrer l'avancement. Mais d'abord, il montre le plan : tâches, liens, jalons. Le suivi : module cp08."
    ],
    retenir: "Un Gantt : les tâches sur un calendrier, leurs dépendances et les jalons."
  },
  {
    id: "cp05-q13",
    dialecte: "Gestion de projet",
    q: "Projet EDI : un nouveau flux de factures vers un client (C : le raccordement chez l'opérateur EDI). Quelle est la durée minimale du projet ?",
    code: "A  Spécifier      4 j\nB  Développer     8 j  après A\nC  Opérateur EDI  6 j  dès le début\nD  Tests client   5 j  après B et C",
    choix: [
      "17 jours : A, puis B, puis D",
      "23 jours : A + B + C + D",
      "19 jours : C, puis B, puis D",
      "11 jours : C, puis D"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Le plus long chemin : A (4) + B (8) + D (5) = 17 jours. C'est le chemin critique ; C (6 jours) se fait pendant A et B.",
      "Non. Additionner tout, c'est oublier le parallèle : C se fait en même temps que A et B. 23 jours, ce serait tout l'un après l'autre.",
      "Non. B n'attend que A, pas C : C se fait à côté. Seul D attend les deux.",
      "Non. C puis D font 11 jours, mais D attend aussi B : A puis B prennent déjà 12 jours avant que D commence."
    ],
    retenir: "La durée minimale d'un projet, c'est la longueur du chemin critique : le plus long chemin, pas la somme des tâches."
  },
  {
    id: "cp05-q14",
    dialecte: "Gestion de projet",
    q: "Projet Snowflake + Power BI : le modèle de données (A), le chargement des ventes (B) et des achats (C), les tableaux et la recette (D). Quelle est la marge de C ?",
    code: "A  Modèle         5 j\nB  Ventes        10 j  après A\nC  Achats         4 j  après A\nD  Tableaux       6 j  après B et C",
    choix: [
      "9 jours : A et C finissent au jour 9",
      "6 jours : C finit au jour 9, D part au jour 15",
      "15 jours : la durée de son chemin, A, C, puis D",
      "21 jours : la durée du chemin critique"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Le jour 9, c'est quand C finit au plus tôt, pas sa marge. D ne commence qu'au jour 15 : C peut glisser de 15 − 9 = 6 jours.",
      "Oui. A + C = 9 jours ; D attend B, au jour 15 (5 + 10). C peut glisser de 15 − 9 = 6 jours sans décaler la fin.",
      "Non. 15 jours, c'est la longueur de son chemin, pas sa marge. La marge, c'est l'écart avec le chemin critique : 21 − 15 = 6.",
      "Non. 21 jours, c'est la durée du projet, pas une marge. Si C glissait de 21 jours, D commencerait au jour 30 : la fin reculerait de 15 jours."
    ],
    retenir: "La marge d'une tâche, c'est ce qu'elle peut glisser sans décaler la fin : l'écart entre son chemin et le chemin critique."
  },
  {
    id: "cp05-q15",
    dialecte: "Gestion de projet",
    q: "Ton planning DEMAT, en décembre. Laquelle de ces tâches est sur le chemin critique ?",
    choix: [
      "La préparation des supports de formation de la compta",
      "Les itérations des écrans de suivi de la compta",
      "La préparation des données de paramétrage",
      "La réception des factures par le portail de la PA"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Ils doivent être prêts pour la formation, mais ils ont de la marge : un petit retard ne décale pas la bascule.",
      "Non. Les itérations ont une enveloppe et une fin fixée en avril ; un écran pas prêt attend au backlog. La bascule n'en dépend pas.",
      "Oui. Sans ces données, dues le 15 janvier, pas de paramétrage ; sans connecteur, pas de recette, ni de PV, ni de pilote. Leur retard décale toute la suite.",
      "Non. Elle tourne depuis novembre : ce n'est plus une tâche à venir. Et l'émission n'en dépend pas."
    ],
    retenir: "Chemin critique de DEMAT : données de paramétrage, paramétrage, connecteur, recette, PV, pilote, bascule."
  },
  {
    id: "cp05-q16",
    dialecte: "Gestion de projet",
    q: "Février. Les supports de formation ont 1 semaine de retard. Hors du chemin critique, ils avaient 3 semaines de marge. Sans action, que devient la bascule de juin ?",
    choix: [
      "Rien ne bouge ; la marge de recette passe à zéro",
      "Elle recule de 3 semaines : la marge est perdue",
      "Elle recule d'1 semaine, comme les supports en retard",
      "Rien ne bouge ; il leur reste 2 semaines de marge"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Presque : la bascule ne bouge pas. Mais la marge de recette protège la recette ; ici, c'est la marge des supports qui a servi.",
      "Non. 3 semaines, c'était leur marge, pas un retard. Il en reste 2 : rien ne recule.",
      "Non. Ça, c'est vrai sur le chemin critique. Les supports avaient 3 semaines de marge : 1 semaine de retard s'y loge.",
      "Oui. Hors du chemin critique, un retard plus petit que la marge ne décale rien. Mais leur marge fond : tu le notes au planning, et tu suis."
    ],
    retenir: "Hors du chemin critique, un retard plus petit que la marge de la tâche ne décale pas la fin : il réduit sa marge."
  },
  {
    id: "cp05-q17",
    dialecte: "Gestion de projet",
    q: "Projet Snowflake + Power BI. Le chargement des achats avait 2 semaines de marge. Il prend 3 semaines de retard. Rien d'autre ne bouge. Sans action, qu'arrive-t-il à la date de fin ?",
    choix: [
      "Elle recule de 5 semaines : 3 de retard, 2 de marge perdues",
      "Elle ne bouge pas : la tâche n'est pas sur le chemin critique",
      "Elle recule d'1 semaine : cette tâche devient critique",
      "Elle recule de 3 semaines, autant que le retard"
    ],
    bonne: 2,
    pourquoi: [
      "Non. La marge n'est pas un retard en plus : elle absorbe. 3 semaines de retard moins 2 de marge : la fin recule d'1 semaine.",
      "Non. Hors du chemin critique, oui, mais avec 2 semaines de marge seulement. Au-delà, chaque semaine de retard décale la fin.",
      "Oui. 2 semaines se logent dans la marge ; la 3e décale la fin. Ce chemin devient le plus long : c'est le nouveau chemin critique.",
      "Non. Presque : la fin recule bien. Mais les 2 premières semaines tiennent dans la marge : 3 − 2 = 1 semaine."
    ],
    retenir: "Une tâche qui glisse plus que sa marge devient critique : la fin recule de l'écart."
  },
  {
    id: "cp05-q18",
    dialecte: "Gestion de projet",
    q: "Projet EDI (C : le raccordement chez l'opérateur EDI). Le développement (B) prendra 7 jours au lieu de 10. En combien de jours le projet finit-il maintenant ?",
    code: "A  Spécifier      5 j\nB  Développer    10 j  après A\nC  Opérateur EDI 13 j  dès le début\nD  Tests client   5 j  après B et C",
    choix: [
      "20 jours : le chemin critique ne change pas",
      "12 jours : A et B finissent au jour 12",
      "17 jours : 3 jours gagnés sur le chemin critique",
      "18 jours : D attend C, qui finit au jour 13"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Le chemin critique peut changer : B raccourci, c'est C, puis D, qui devient le plus long. Le projet finit au jour 18.",
      "Non. Il manque D, les tests : 5 jours, qui commencent après B et C. Fin au jour 18.",
      "Non. Presque : B est bien sur le chemin critique. Mais D attend aussi C, qui finit au jour 13 : on ne gagne que 2 jours.",
      "Oui. A + B = 12 jours, mais C finit au jour 13 : D commence au jour 13, et finit au jour 18. Le chemin critique passe maintenant par C."
    ],
    retenir: "Le chemin critique peut changer : quand il raccourcit, un autre chemin peut devenir le plus long."
  },
  {
    id: "cp05-q19",
    dialecte: "Gestion de projet",
    q: "Projet Snowflake + Power BI. Le sponsor veut finir 1 semaine plus tôt. Ton développeur propose d'accélérer les tableaux des achats, qui ont 2 semaines de marge. Que réponds-tu ?",
    choix: [
      "« D'accord : 1 semaine gagnée là, c'est 1 semaine de moins »",
      "« Rien à gagner là : cherchons sur le chemin critique »",
      "« D'accord, et la semaine gagnée ira en marge, à la fin »",
      "« Non : on garde notre plan, le sponsor attendra la date »"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Ces tableaux finissent plus tôt, mais la fin dépend du chemin critique, qui n'a pas bougé. Le sponsor n'a rien gagné.",
      "Oui. Hors du chemin critique, accélérer ne change pas la fin. Pour finir plus tôt, on raccourcit le chemin critique : du parallèle, ou moins de périmètre.",
      "Non. Presque : tu penses à protéger la fin. Mais rien n'est gagné là : il n'y a pas de semaine à mettre en marge.",
      "Non. Trop vite : le sponsor demande, tu cherches. Une option existe peut-être sur le chemin critique, avec son prix."
    ],
    retenir: "Pour finir plus tôt, on raccourcit le chemin critique : ailleurs, on ne gagne rien."
  },
  {
    id: "cp05-q20",
    dialecte: "Gestion de projet",
    q: "Semaine du 12 avril : ton planning met Marc, assistant ADV (administration des ventes), à plein temps sur les tests EDI, et à plein temps pour former 2 collègues. Que fais-tu ?",
    choix: [
      "Tu décales l'une des 2 tâches, et tu vois ce qu'elle touche",
      "Tu demandes aujourd'hui une 2e personne au responsable ADV",
      "Tu demandes au DAF de trancher entre les 2 tâches de Marc",
      "Tu demandes 2 soirées à Marc, et tu le dis à son responsable"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Une personne ne fait pas 2 temps pleins : tu lisses. L'une passe après l'autre, et tu regardes si elle touche le chemin critique.",
      "Non. Presque : son responsable est le bon interlocuteur s'il faut du monde. Mais un 2e formateur doit d'abord apprendre : décaler l'une des tâches suffit peut-être.",
      "Non. Trop haut : l'ordre des tâches de ton projet, c'est ta délégation (module cp18). Tu lisses toi-même ; le DAF ne tranche que si un jalon sort de ta tolérance.",
      "Non. Ses heures, c'est son responsable qui en décide (module cp16), avant, pas après. Et un planning qui compte sur des soirées n'est pas réaliste."
    ],
    retenir: "Quelqu'un à 200 % sur une semaine, c'est un planning faux : on décale une tâche, et on regarde ce qu'elle touche."
  },
  {
    id: "cp05-q21",
    dialecte: "Gestion de projet",
    q: "Décembre. Tu places les itérations des écrans de la compta au planning. La cheffe comptable classe leur backlog. Quelle période choisis-tu ?",
    choix: [
      "Janvier à mars : on commence tout de suite",
      "Février à avril : après la clôture, avant le pilote",
      "Mars à mai : en même temps que la recette et le pilote",
      "Avril à juin : quand tout le reste sera fini"
    ],
    bonne: 1,
    pourquoi: [
      "Non. En janvier, la cheffe comptable est prise par la clôture annuelle : pas de classement, pas de démo. L'itération tournerait à vide.",
      "Oui. Après la clôture de janvier, elle est disponible. Et tout finit en avril : le pilote de mai ouvre le gel des changements.",
      "Non. En mai, le gel des changements commence avec le pilote : une itération en mai ne pourrait rien livrer.",
      "Non. Mai et juin, c'est le gel, jusqu'à la fin de la bascule. Les écrans arriveraient après la mise en service."
    ],
    retenir: "Le rétroplanning pose les contraintes d'abord : la clôture de janvier, le gel dès le pilote de mai."
  },
  {
    id: "cp05-q22",
    dialecte: "Gestion de projet",
    q: "Novembre. Le contrat signé avec la PA : données de paramétrage dues le vendredi 15 janvier. La compta les prépare, et janvier, c'est sa clôture annuelle. Quand planifies-tu ce travail ?",
    choix: [
      "En décembre, avant les fêtes, et l'envoi dès le 4 janvier",
      "En février, après la clôture : la PA attendra un peu",
      "En janvier, avec un intérimaire pour aider la compta",
      "Du 4 au 15 janvier, et un rappel à la compta chaque lundi"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. On part du 15 janvier et des contraintes : la clôture prend janvier. Le travail se fait en décembre, et l'envoi part dès la rentrée.",
      "Non. Données en retard, connecteur en retard : le 1er mars ne tient plus, et en général les pénalités de la PA non plus. Toute la suite glisse.",
      "Non. Un intérimaire ne connaît ni vos clients ni vos fournisseurs : il faudrait le former en pleine clôture. Décembre suffit, sans coût.",
      "Non. Début janvier, la compta est en pleine clôture : ce travail passera après, rappels ou pas. Et la tâche est sur le chemin critique : chaque jour perdu se retrouve en mars."
    ],
    retenir: "Une tâche due dans une période chargée se planifie avant : on part de la date due, contraintes posées."
  },
  {
    id: "cp05-q23",
    dialecte: "Gestion de projet",
    q: "Recette du 16 mars au 30 avril. La cheffe comptable, la seule à bien connaître les avoirs fournisseurs, est en congé du 12 au 30 avril. Quand places-tu les tests des avoirs fournisseurs ?",
    choix: [
      "Pendant son congé : Julie, formée, les fera toute seule",
      "En mai, à son retour, et tu décales le PV d'autant",
      "En fin de recette : les cas les plus durs en dernier",
      "Dans les 3 premières semaines, avec elle et Julie"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Presque : Julie est formée, c'est le filet si la cheffe comptable manque. Mais placer ces tests pendant son congé, c'est se priver de la seule experte. Un cas difficile échoue : plus personne ne tranche avant le PV.",
      "Non. Mai, c'est le pilote et le gel : le PV ne peut pas attendre. Tout glisserait, alors qu'il suffit de placer ces tests avant son congé.",
      "Non. Fin avril, elle est en congé : les cas les plus durs seraient testés sans celle qui les connaît, juste avant le PV.",
      "Oui. Une personne rare se planifie d'abord : ses cas passent avant son congé. Julie, sa suppléante, apprend à côté, et pourra retester en avril."
    ],
    retenir: "Une personne rare se planifie en premier : ses tests passent avant son absence."
  },
  {
    id: "cp05-q24",
    dialecte: "Gestion de projet",
    q: "Nouveau flux EDI des commandes d'AquaBleu, en service le lundi 18 octobre 2027. Avant : spécifier (1 semaine), développer (3), tester avec AquaBleu (2), l'un après l'autre. Quand commencer au plus tard ?",
    choix: [
      "Le 20 septembre : 4 semaines, tester en codant",
      "Le 27 septembre : 3 semaines, la plus longue tâche",
      "Le 6 septembre : 1 + 3 + 2 = 6 semaines avant",
      "Le 13 septembre : 5 semaines, spécifier en codant"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Les tests attendent le développement : on teste ce qui est fini. En même temps, chaque correction relance les tests.",
      "Non. Les tâches se suivent : on additionne 1 + 3 + 2. La plus longue ne fixe pas, seule, la date de départ.",
      "Oui. On remonte depuis le lundi 18 octobre : 2 semaines de tests, 3 de développement, 1 de spécification. Départ le lundi 6 septembre, fin le vendredi 15 octobre.",
      "Non. Le développement attend la spécification : elles se suivent. Spécifier en codant, c'est coder sans savoir quoi, puis refaire."
    ],
    retenir: "Rétroplanning : on part de la date imposée et on remonte, tâche par tâche, jusqu'à la date de début au plus tard."
  },
  {
    id: "cp05-q25",
    dialecte: "Gestion de projet",
    q: "Lequel de ces jalons du lot formation est bien écrit ?",
    choix: [
      "Du 3 au 28 mai : la formation de la compta",
      "Fin mai : la compta presque toute formée, à 90 %",
      "Mai : la formation de la compta bien avancée",
      "28 mai : chaque comptable a traité 5 factures, sans aide"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Presque : des dates exactes. Mais c'est une tâche de 4 semaines, pas un jalon : elle ne dit pas ce qui est obtenu à la fin.",
      "Non. 90 % de quoi ? Ça ne se vérifie pas. Il faut un livrable : fait, ou pas fait.",
      "Non. « Bien avancée » ne se vérifie pas, et « mai » n'est pas une date. Fin mai, chacun dira ce qu'il veut.",
      "Oui. Une date, et un livrable qu'on vérifie : chaque comptable a traité ses 5 factures sans aide, ou pas. Un jalon dure zéro jour : c'est un point de contrôle."
    ],
    retenir: "Un jalon : une date et un livrable vérifiable, pas « bien avancé », ni une période."
  },
  {
    id: "cp05-q26",
    dialecte: "Gestion de projet",
    q: "Novembre. Le planning de la PA ne montre qu'une date : « 1er mars : connecteur livré ». Rien avant. Que demandes-tu à son chef de projet ?",
    choix: [
      "Un point d'avancement par mail, chaque vendredi",
      "Des jalons vérifiables avant, comme un test en février",
      "Des pénalités sur chaque jalon intermédiaire, par avenant",
      "Rien : seule la date du contrat compte, elle l'engage"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Un mail chaque vendredi dira « ça avance ». Sans livrable vérifiable, un retard reste invisible jusqu'en mars.",
      "Oui. Des jalons intermédiaires vérifiables (par exemple, le connecteur testé sur vos données, en février) : un retard se voit tôt, pas le 1er mars.",
      "Non. Trop fort : le contrat est signé, et de nouvelles pénalités demandent un avenant que la PA refusera. Des jalons vérifiables suffisent à voir tôt.",
      "Non. Presque : la date du contrat engage bien la PA. Mais sans étape avant, tu apprends le retard le 1er mars, trop tard pour agir avant ton plan B."
    ],
    retenir: "Avant une date lointaine, des jalons intermédiaires vérifiables : un retard se voit tôt."
  },
  {
    id: "cp05-q27",
    dialecte: "Gestion de projet",
    q: "Décembre. Ton planning détaillé de DEMAT compte 180 tâches. Que fais-tu valider par le DAF ?",
    choix: [
      "Les jalons et les marges ; tout le détail reste à toi",
      "Rien : il a déjà validé les grandes dates au cadrage",
      "Les jalons ; chaque prestataire voit ses tâches avec lui",
      "Les 180 tâches, une par une, pour qu'il sache tout"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Le DAF valide ce qui l'engage : les jalons et les marges. Les tâches sont ton travail : dans ± 2 semaines par jalon, tu ajustes (module cp04).",
      "Non. Presque : au cadrage, il a validé des dates macro (« bascule en juin »). Le planning détaillé fixe les jalons au jour et ajoute la marge de recette : il les valide, en sachant.",
      "Non. Les prestataires ne voient pas leurs tâches avec le sponsor : elles passent par toi, dans ton planning. Le DAF valide les jalons et les marges.",
      "Non. 180 tâches noient le sponsor : il signera sans lire. Et chaque petit ajustement deviendrait une décision du DAF."
    ],
    retenir: "Le sponsor valide les jalons et les marges ; le détail des tâches reste au chef de projet."
  },
  {
    id: "cp05-q28",
    dialecte: "Gestion de projet",
    q: "L'intégrateur t'envoie ses estimations, avec 20 % ajoutés à chaque tâche « par sécurité ». Que fais-tu ?",
    choix: [
      "Tu les prends, et tu ajoutes ta marge de 20 % à la fin",
      "Tu les prends comme elles sont : on n'a jamais trop de sécurité",
      "Ses durées probables, et une seule marge, visible, à la fin",
      "Tu retires les 20 % partout, sans lui en parler"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Tu comptes deux fois : 20 % dans chaque tâche, plus 20 % à la fin. Le planning s'allonge, et le 1er septembre se rapproche.",
      "Non. Une marge cachée dans chaque tâche se consomme toujours : le travail s'étale sur le temps donné. À la fin, il ne reste rien pour un vrai imprévu.",
      "Oui. Des durées probables, et une seule marge, visible, en bout de chaîne : elle protège la fin, et tu vois quand elle sert.",
      "Non. Presque : tu enlèves bien la marge cachée. Mais sans lui en parler, ses durées ne l'engagent plus, et la sécurité disparaît au lieu de passer à la fin."
    ],
    retenir: "Une marge se pose une fois, visible, à la fin. Cachée dans chaque tâche, elle se perd."
  },
  {
    id: "cp05-q29",
    dialecte: "Gestion de projet",
    q: "Février. Le consultant regarde ton planning : « Il y a une semaine de marge de recette. Je livrerai donc les flux EDI une semaine plus tard, sans souci. » Que réponds-tu ?",
    choix: [
      "« Non : votre date tient. La marge ne se donne jamais »",
      "« D'accord, si vous l'annoncez vous-même au COPIL »",
      "« Une semaine, oui, mais pas un jour de plus »",
      "« D'accord : c'est à ça que sert la marge de recette »"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. La marge de recette est au projet, pour un imprévu : elle ne se donne pas à un prestataire, ni d'avance. Sa date reste celle du planning.",
      "Non. Presque : dire les choses, c'est bien. Mais l'annoncer ne change rien : la marge serait mangée avant la recette, et le 1er imprévu ferait glisser le PV.",
      "Non. Une semaine, c'est toute la marge : elle serait consommée avant même la recette. Au 1er imprévu, le PV du 30 avril glisse.",
      "Non. Consommée d'avance, la marge ne protège plus rien : au 1er imprévu de la recette, le PV du 30 avril glisse."
    ],
    retenir: "La marge est au projet, pour les imprévus : elle ne se consomme pas d'avance, ni par un prestataire."
  },
  {
    id: "cp05-q30",
    dialecte: "Gestion de projet",
    q: "Point projet. Le consultant : « Avec juillet et août de marge, la recette peut bien prendre 2 semaines de plus. » Que lui réponds-tu ?",
    choix: [
      "« Non : on n'a aucune marge, chaque jour de recette compte »",
      "« Non, et j'alerte le DAF aujourd'hui : la date est en jeu »",
      "« Non : juillet-août protège septembre, pas la recette »",
      "« D'accord : la bascule glissera à mi-juillet, c'est permis »"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Presque : la recette doit tenir. Mais elle a sa marge, 1 semaine, pour un imprévu. Dire « aucune », c'est faux, et ta prochaine vraie alerte pèsera moins.",
      "Non. Trop fort : une phrase en point projet n'est pas un retard. Tu recadres toi-même ; une alerte sans fait use ton crédit auprès du DAF.",
      "Oui. Deux marges, deux usages : la marge de recette (1 semaine) absorbe un petit retard de recette ; la marge légale protège le 1er septembre.",
      "Non. Mi-juillet est possible, mais sur décision du DAF, en connaissant le prix : moins de marge légale. Ce n'est pas un droit."
    ],
    retenir: "Marge de recette et marge légale ne se confondent pas : la 1re absorbe un retard de recette, la 2e protège le 1er septembre."
  },
  {
    id: "cp05-q31",
    dialecte: "Gestion de projet",
    q: "Avril. Les flux EDI avaient 1 semaine de marge, marge de recette comprise. Ils annoncent 4 semaines de retard. Ta tolérance : ± 2 semaines par jalon. Que fais-tu ?",
    choix: [
      "Le DAF le jour même : 4 semaines de recul, bascule en juillet",
      "Rien de plus : ils ne sont pas sur le chemin critique",
      "Planning à jour (3 semaines de recul) ; tu le dis au COPIL",
      "Le DAF le jour même : 3 semaines de recul, et des options"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Le bon moment, le mauvais chiffre : la marge absorbe 1 semaine, le recul est de 3. Et sans option, tu décides à sa place.",
      "Non. Ils ne l'étaient pas, avec 1 semaine de marge. Avec 4 semaines de retard, ils le deviennent : la fin recule de 4 − 1 = 3 semaines.",
      "Non. Presque : le bon calcul. Mais 3 semaines dépassent ta tolérance de 2 : ce n'est plus à toi de gérer, et le COPIL arrive trop tard.",
      "Oui. 4 semaines de retard, moins 1 de marge : la fin recule de 3 semaines, au-delà de ± 2. Le DAF décide, prévenu le jour même, avec des options chiffrées."
    ],
    retenir: "Une tâche qui glisse plus que sa marge devient critique ; si la fin sort de la tolérance, le DAF décide, prévenu le jour même."
  },
  {
    id: "cp05-q32",
    dialecte: "Gestion de projet",
    q: "Un collègue chef de projet : « Annonce toujours une date plus tôt que ton planning. L'équipe se presse, et tu gardes une marge en secret. » Que fais-tu ?",
    choix: [
      "Tu suis son conseil : plus tôt, et ta marge en secret",
      "Tu annonces la date de ton planning, marge visible comprise",
      "Tu donnes la date tôt à l'équipe, celle du planning au DAF",
      "Tu n'annonces plus de date, que des jalons « en cours »"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Une date fausse se paie au 1er jalon raté : l'équipe ne croit plus au planning, et le DAF non plus.",
      "Oui. Une seule date, réaliste, avec sa marge visible : elle se défend, et chacun sait ce qu'elle protège.",
      "Non. Presque : le DAF a la vraie date. Mais 2 plannings, c'est une équipe qui court après une date fausse, et qui le découvre.",
      "Non. Sans date, rien ne se pilote : un jalon, c'est une date et un livrable vérifiable."
    ],
    retenir: "Un seul planning, réaliste, marge visible : une date « pour motiver » se paie au 1er jalon."
  },
  {
    id: "cp05-q33",
    dialecte: "Gestion de projet",
    q: "Décembre. Ton planning détaillé, tâche par tâche, met la bascule au lundi 12 juillet. Le jalon validé par le DAF : mi-juin. Que fais-tu ?",
    choix: [
      "Tu demandes à l'intégrateur 2 consultants de plus en mars",
      "Tu rabotes les estimations de 15 % pour retomber en juin",
      "Au DAF, aujourd'hui : l'écart et 2 options chiffrées",
      "Au DAF, le jour même : « Il me faut un mois de plus »"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Plus de monde ne divise pas la durée : il faut les former, et le seul consultant du paramétrage ralentira. Chaque jour en plus serait aussi une commande du DAF.",
      "Non. Le planning plaît, mais il est faux : juin glissera quand même, plus tard. Une estimation baisse avec le contenu, pas avec la date voulue.",
      "Oui. 4 semaines après la mi-juin : hors tolérance, le DAF décide, prévenu le jour même. Tu lui apportes l'écart et des options sur le chemin critique (du parallèle, moins de périmètre au pilote), avec leur prix.",
      "Non. Presque : le bon interlocuteur, au bon moment. Mais sans option, tu décides à sa place : un mois de plus, alors qu'il existe peut-être moins cher."
    ],
    retenir: "Planning au-delà du jalon validé : ni estimations rabotées, ni « un mois de plus » ; des options chiffrées, et le DAF choisit."
  },
  {
    id: "cp05-q34",
    dialecte: "Gestion de projet",
    q: "Pour gagner 2 semaines sur le chemin critique, l'intégrateur propose de lancer la recette des factures fournisseurs dès qu'elles sont prêtes, sans attendre les factures clients. Julie et sa cheffe sont d'accord. Que fais-tu ?",
    choix: [
      "Tu refuses : une recette se fait sur une version finie",
      "D'accord : tu prévois de quoi retester, et tu le dis au COPIL",
      "D'accord, et tu lances aussi le pilote pendant la recette",
      "Tu en fais une décision du DAF : c'est un changement de méthode"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Trop prudent : les factures fournisseurs se testent bien à part. 2 semaines gagnées sur le chemin critique, c'est la fin qui est mieux protégée.",
      "Oui. Le parallèle fait gagner du temps, avec un risque de reprise : un réglage commun qui change, et on reteste. Tu le prévois, et le COPIL est informé : c'est ta délégation.",
      "Non. Presque : le parallèle, oui. Mais un pilote sur une version pas encore recettée, ce sont de vraies factures non testées, et le gel qui commence en pleine recette.",
      "Non. C'est l'organisation de ton projet, sans coût ni date validée qui bouge, et la compta est d'accord : ta délégation (module cp18). Tu décides, et tu le dis au COPIL."
    ],
    retenir: "Mettre en parallèle fait gagner du temps, avec un risque de reprise : on le mesure, et on le prévoit."
  },
  {
    id: "cp05-q35",
    dialecte: "Gestion de projet",
    q: "Projet Snowflake + Power BI : 5 tableaux promis au comité de direction du 4 octobre. Le planning réaliste en donne 3 à cette date, les 2 derniers 3 semaines après. Que proposes-tu au sponsor ?",
    choix: [
      "3 à la date et 2 après, ou 5 plus tard : le sponsor choisit",
      "Les 5 au sponsor à la date, et les tests des 2 derniers après",
      "Un 2e développeur dès lundi, pour tenir les 5 au 4 octobre",
      "Une seule option : les 5 tableaux, 3 semaines plus tard"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Deux options vraies : 3 tableaux le 4 octobre (les plus utiles) et les 2 autres 3 semaines après, ou les 5 ensemble, 3 semaines plus tard. Le triangle : un côté bouge, le sponsor choisit lequel.",
      "Non. Des tableaux non testés devant la direction : un chiffre faux, et la confiance dans tout le projet tombe. Tester après, c'est trop tard.",
      "Non. Un nouveau doit d'abord apprendre le modèle : sur 3 semaines, il ralentit l'équipe avant d'aider. Et le sponsor ne choisit toujours rien.",
      "Non. Presque : une date réaliste, sans mentir. Mais une seule option, c'est choisir à sa place le côté du triangle qui paie : il préférerait peut-être 3 tableaux à l'heure."
    ],
    retenir: "Pour tenir une date : moins de contenu à la date et le reste après, ou tout plus tard. Le sponsor choisit. Pas des tests en moins."
  },
  {
    id: "cp05-q36",
    dialecte: "Gestion de projet",
    q: "Janvier. Le paramétrage du connecteur a 2 semaines de retard. Le DAF : « Prends un 2e consultant, ça ira 2 fois plus vite. » Un seul consultant connaît votre paramétrage. Que réponds-tu ?",
    choix: [
      "« Non : un 2e consultant ne fait jamais gagner de temps »",
      "« D'accord, et le 1er le formera le soir, pour ne rien perdre »",
      "« D'accord : à deux, le retard est rattrapé fin janvier »",
      "« Il doit d'abord apprendre. Je chiffre le gain, avec 2 options »"
    ],
    bonne: 3,
    pourquoi: [
      "Non. « Jamais » est faux : sur des morceaux indépendants, un 2e consultant aide. Ici, le travail se partage mal, mais le DAF mérite un chiffre, pas une règle.",
      "Non. Former le soir, ce sont des heures en plus que décide son employeur, et un 1er consultant fatigué. Le gain reste incertain.",
      "Non. Le 2e doit apprendre votre paramétrage, auprès du seul qui le connaît : pendant ce temps, le 1er avance moins. Le gain réel est bien plus petit.",
      "Oui. Loi de Brooks : du monde en plus sur un travail en retard le ralentit d'abord. Tu chiffres le vrai gain, avec d'autres options (du parallèle, moins de périmètre). Le DAF choisit."
    ],
    retenir: "Ajouter des personnes ne divise pas la durée : il faut les former et se coordonner. Chiffre le vrai gain, avec d'autres options."
  },
  {
    id: "cp05-q37",
    dialecte: "Gestion de projet",
    q: "Ta migration Divalto : il reste 10 jours de travail au consultant, seul. Un 2e consultant arrive : le 1er passe 5 jours à le former, puis ils se partagent le reste. Quand le travail finit-il ?",
    choix: [
      "Au jour 5 : à deux, on va 2 fois plus vite",
      "Au jour 10, comme seul, et 10 jours payés en plus",
      "Au jour 8 : la formation coûte, mais on gagne 2 jours",
      "Au jour 15 : 5 jours de formation, puis 10, comme seul"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Tu oublies la formation : 5 jours où ni l'un ni l'autre n'avance. Puis 10 jours de travail à deux : 5 jours de plus. Fin au jour 10.",
      "Oui. Jours 1 à 5 : la formation, rien n'avance. Jours 6 à 10 : 10 jours de travail à deux. Fin au jour 10, comme seul, avec 10 jours de consultant payés en plus.",
      "Non. Presque : la formation coûte, tu l'as vu. Mais elle prend 5 jours entiers ; puis les 10 jours de travail en prennent 5, à deux. Fin au jour 10.",
      "Non. Après la formation, ils sont deux : les 10 jours de travail prennent 5 jours, pas 10 comme seul. Fin au jour 10."
    ],
    retenir: "Un renfort coûte d'abord du temps, pour le former : sur un travail court, il ne fait rien gagner."
  },
  {
    id: "cp05-q38",
    dialecte: "Gestion de projet",
    q: "Tu es DSI adjoint. Un chef de projet présente son planning de migration Divalto : « Tout est au plus juste, pas un jour de marge. La date tient. » Que lui demandes-tu ?",
    choix: [
      "10 % de plus sur chacune de ses tâches, par sécurité",
      "De décaler sa date d'un mois entier, par simple prudence",
      "Rien : sans marge, l'équipe se presse pour tenir",
      "Une marge visible à la fin, à la taille des risques"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Presque : une marge, oui. Mais cachée dans chaque tâche, elle se consomme tâche par tâche, et ne protège plus la fin.",
      "Non. Un mois sans raison chiffrée, c'est une marge au hasard. Sa taille vient des risques, pas d'une prudence générale.",
      "Non. Sans marge, le 1er imprévu décale la date : un consultant malade, une version Divalto en retard. La pression ne remplace pas une marge.",
      "Oui. Une marge en bout de chaîne, visible, et dimensionnée sur ses risques (module cp07) : elle protège la date, et il voit quand elle sert."
    ],
    retenir: "Un planning sans marge ne tient qu'au 1er imprévu : une marge visible, à la fin, à la taille des risques."
  },
  {
    id: "cp05-q39",
    dialecte: "Gestion de projet",
    q: "Tu es DSI adjoint. Un chef de projet a estimé seul, en une soirée, toutes les tâches de son projet WMS (logiciel d'entrepôt) : « C'est plus rapide. » Que lui demandes-tu ?",
    choix: [
      "De les comparer à un projet WMS d'une autre entreprise",
      "Rien : il connaît le sujet, ses chiffres suffiront",
      "De faire estimer le travail par ceux qui le feront",
      "D'ajouter 30 % à chaque estimation, par prudence"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Presque : comparer à un projet semblable aide à challenger. Mais ça ne remplace pas ceux qui feront le travail, avec leur contexte et leur disponibilité.",
      "Non. Ses chiffres n'engagent ni l'éditeur, ni l'intégrateur, ni les magasiniers. Et il ne voit pas leurs contraintes : autres clients, disponibilité.",
      "Oui. L'estimation vient de ceux qui font : l'éditeur, l'intégrateur, les utilisateurs clés. Lui la challenge ensuite, avec son expérience.",
      "Non. Une marge sur chaque tâche se consomme, et ne corrige pas un chiffre faux. D'abord des estimations justes."
    ],
    retenir: "L'estimation vient de ceux qui font le travail ; le chef de projet la challenge, il ne l'invente pas."
  },
  {
    id: "cp05-q40",
    dialecte: "Gestion de projet",
    q: "Tu es DSI adjoint. En mars, deux projets comptent chacun sur ton analyste Divalto à plein temps : la migration et un nouveau flux EDI. Leurs chefs de projet ne le savent pas. Que fais-tu ?",
    choix: [
      "Les 2 plannings ensemble, puis un choix de priorité",
      "Tu le partages à 50 % sur chacun ; les 2 dates restent",
      "Tu lances le recrutement d'un 2e analyste pour mars",
      "Rien : chaque chef de projet gère son propre planning"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. La charge d'une personne se regarde sur tous les projets. À 200 %, tu fais trancher la priorité (module cp25), et le projet qui attend recule, en le sachant.",
      "Non. Presque : partager, c'est déjà arbitrer. Mais à 50 %, chaque tâche prend 2 fois plus de temps : garder les 2 dates, c'est un planning faux.",
      "Non. Trop lourd pour un mois : un recrutement prend des mois, et le nouveau devra apprendre votre Divalto.",
      "Non. Chacun voit un planning juste, à 100 %. Ensemble, ils sont à 200 % : l'un des deux glissera en mars, sans que personne l'ait choisi."
    ],
    retenir: "Une personne partagée se planifie sur tous les projets : à 200 %, on arbitre, on ne laisse pas glisser."
  },
  {
    id: "cp05-q41",
    dialecte: "Gestion de projet",
    q: "Tu es DSI adjoint. Migration de 120 états Power BI, simples, indépendants, bien documentés. Seul, ton développeur y passerait 12 semaines. Un 2e développeur, qui connaît Power BI, se libère. Le prends-tu ?",
    choix: [
      "Non : du monde en plus ralentit toujours un projet (Brooks)",
      "Oui, si le 1er le forme d'abord 2 semaines, avant tout",
      "Non : un seul développeur, et 4 semaines de marge en plus",
      "Oui : le travail se partage, il est utile tout de suite"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Brooks parle d'un travail qui se découpe mal, sur un projet en retard. Ici, 120 états indépendants se partagent bien : le renfort aide.",
      "Non. Presque : le prendre, oui. Mais il connaît Power BI, et les états sont documentés : une journée d'accueil suffit. Avec 2 semaines de formation, la fin passe de 6 ou 7 semaines à 8.",
      "Non. Une marge ne raccourcit rien : elle protège une date. Ici, un renfort utile est disponible.",
      "Oui. Des morceaux indépendants, un outil connu, une doc claire : le renfort travaille presque tout de suite. La durée baisse vraiment, vers 6 ou 7 semaines."
    ],
    retenir: "Un renfort raccourcit vraiment quand le travail se coupe en morceaux indépendants, et que la personne est vite autonome."
  }
];
