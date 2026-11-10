// Parcours « Maîtriser les outils du chef de projet » — Questions du module ot03 « Outils pour décider ».
// Ce qu'elles vérifient : quel outil prendre, comment s'en servir sur le site, lire un résultat (une alerte, un total, un
// niveau), la règle clé de l'outil, le piège. Outils : gp-options (q01 à q05), gp-decisions (q06 à q08),
// gp-changements (q09 à q12), gp-moscow (q13 à q15). Règles et mots : ceux des outils et de leurs cours (cp03, cp09,
// cp10, cp17, cp18), mot pour mot ; textes des alertes, totaux et niveaux recalculés avec le moteur (js/outils.js) :
// option A sans délai ni coût (q01), « Aucune alerte » (q03), « Trace écrite à faire : 1 » (q07), « À décider » sans
// chiffre (q12), part du « doit » 7 sur 10 = 70 %, « Au-delà du repère » (q13), « pas cette fois » sans date (q14),
// « Validé par » vide (q15).
// Fil rouge DEMAT 2027 (fiche fil rouge de docs/plan-chef-de-projet.md, qui fait foi) : changement n° 7 et COPIL du
// 9 février (q05, q09) ; commande de 3 jours au téléphone le 30 mars (q07) ; critères de go validés le 11 mai, COPIL du
// 8 juin (q08) ; enveloppe des écrans de 10 jours, PO la cheffe comptable, « doit » validés par le DAF (q13 à q15).
// Faits ajoutés (cohérents avec la fiche et les exemples des outils, à valider) : un lot de réglages livré 3 jours plus
// tard, dans la marge de recette (q02) ; la demande n° 17, ouverte par erreur au registre (q10) ; la demande n° 18, pas
// encore chiffrée (q12) ; un tri à 7 jours de « doit » sur 10 (q13) ; l'export Excel des factures bloquées demandé par
// Julie (q14). Aucune affirmation juridique hors de la fiche.
// q07 : la trace écrite d'une décision prise au téléphone est le mail de confirmation, le jour même (cp09 §6, cp17 §7,
// gp-decisions : « Écrit (mail) ») ; la commande, signée le jour même (fiche), engage la dépense et ne la remplace pas.
// Déjà publiées ailleurs, avec un autre angle (la règle, pas l'outil) : cp09-q35, q36, q39 ; cp10-q05, q11, q13 ;
// cp18-q20, q21. Ici, la question part de l'écran de l'outil : une alerte, un total, une rubrique, un bouton.
// Anti-devinette (calcul sans connaître le sujet, script de l'expert) : la bonne réponse est un extrême dans 3 questions
// sur 10 avec un axe d'action (la plus petite : q02, q03 ; la plus forte : q15). Règles : action moyenne 35 %, plus petite
// action réelle 20 %, jamais / toujours le sponsor 26 / 17 %, choix à deux actions 35 %, la plus longue 27 %, extrêmes
// écartés + chiffre 39 %, + mot de méthode 31 %, « écarter absolus, oui, DAF » 24 %. Absolus, « Oui », mots d'urgence et
// chiffres aussi dans des bonnes réponses ; point-virgule et forme sans « Tu » : jamais une marque de la bonne réponse.
LEARNSQL.questions.ot03 = [
  {
    id: "ot03-q01",
    dialecte: "Gestion de projet",
    q: "Ta note de décision a 2 options. Une alerte reste sous le document : « Option 1 (« A. Ne rien changer ») : Chaque option a son prix : délai, coût, risque. » Que fais-tu ?",
    choix: [
      "Tu supprimes l'option A : personne ne choisira de ne rien faire",
      "Tu écris son prix : aucun délai, 0 €, et le risque de ne rien faire",
      "Rien : ne rien changer est sans risque, l'alerte ne vaut pas ici",
      "Tu ajoutes une option C, avec son prix : l'alerte en demande trois"
    ],
    bonne: 1,
    pourquoi: [
      "Non. « Ne rien changer » est une vraie option : sans elle, le décideur ne voit pas le prix de l'inaction.",
      "Oui. Ne rien changer a aussi un prix : 0 € peut-être, mais le problème continue. Écrit, ce prix se compare à celui des autres options.",
      "Non. Ne rien changer coûte souvent : un risque, un retard, des litiges. L'alerte demande ce prix, pour que le décideur compare.",
      "Non. L'alerte vise la ligne A, sans délai ni coût : elle ne compte pas les options. 2 options suffisent."
    ],
    retenir: "« Ne rien changer » est une option comme les autres : elle a son prix (délai, coût, risque), écrit dans la note."
  },
  {
    id: "ot03-q02",
    dialecte: "Gestion de projet",
    q: "Le consultant de l'intégrateur livrera un lot de réglages 3 jours plus tard. Ta marge de recette les couvre : ni date validée, ni créneau de la compta, ni coût ne bougent. Tu as commencé une note de décision. Que fais-tu ?",
    choix: [
      "Tu l'arrêtes : dans ta délégation, tu décides seul et tu informes",
      "Tu la finis, et tu la portes au DAF, au COPIL du mois",
      "Tu la finis pour ton DSI : il arbitre au point du lundi",
      "Tu la finis pour la cheffe comptable : ses testeurs sont concernés"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Pas de coût, aucune date validée ni créneau ne bouge : c'est ta délégation. Tu replanifies, et tu le dis au point projet. La note sert aux décisions qui ne sont pas à toi.",
      "Non. Monter un détail fait perdre du temps au DAF, et lui apprend à décider à ta place.",
      "Non. Ton DSI arbitre ton temps entre le run et le projet. Le planning de DEMAT, dans ta marge, c'est à toi.",
      "Non. Les créneaux de ses testeurs ne bougent pas : rien à lui demander. Tu décides, puis tu informes l'équipe."
    ],
    retenir: "Avant une note de décision, une question : est-ce dans ma délégation ? Oui : tu décides et tu informes, sans note."
  },
  {
    id: "ot03-q03",
    dialecte: "Gestion de projet",
    q: "Ta note de décision : la décision attendue et sa date limite, qui décide, les faits, l'impact, 3 options dont « A. Ne rien changer », chacune avec son prix, et ta recommandation en une ligne. Sous la note : « Aucune alerte. » Ton DSI : « Tu l'envoies comme ça ? » Que réponds-tu ?",
    choix: [
      "« Oui : tout y est, elle part au DAF aujourd'hui »",
      "« Non : j'ajoute une 4e option, pour être complet »",
      "« Oui, mais sans ma recommandation : le DAF choisit seul »",
      "« Non : j'ajoute l'historique des échanges depuis janvier »"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. La question et sa date, les faits, l'impact, 3 options avec leur prix, ta recommandation : la note est prête. Le DAF choisit.",
      "Non. 2 ou 3 options : au-delà, le décideur se perd. L'outil le dirait : « Plus de 3 options : garde-en 2 ou 3… ».",
      "Non. Ta recommandation fait partie de la note : le DAF choisit en la connaissant. Sans elle, il te demandera « tu ferais quoi ? ».",
      "Non. L'historique noie la décision : la 1re ligne doit suffire. Les faits utiles sont déjà dans la note."
    ],
    retenir: "Une note de décision est prête quand elle a la question et sa date, les faits, l'impact, 2 ou 3 options chiffrées et ta recommandation."
  },
  {
    id: "ot03-q04",
    dialecte: "Gestion de projet",
    q: "Ta note de décision est prête. Le DAF la veut dans le corps de ton e-mail, pas en pièce jointe. Que fais-tu sur le site ?",
    choix: [
      "« Copier », puis tu colles la note dans ton e-mail",
      "« Enregistrer dans un fichier », puis tu le joins à l'e-mail",
      "« Télécharger le modèle vide (Excel) », puis tu le remplis",
      "« Dupliquer », puis tu lui envoies l'adresse de la copie"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. `Copier` prend le texte mis en forme : tu le colles dans Word ou dans un e-mail. Le DAF lit la note sans ouvrir de pièce jointe.",
      "Non. Ce fichier (.json) sert à rouvrir le document sur le site, avec `Ouvrir un fichier`. Le DAF ne pourrait pas le lire.",
      "Non. Le modèle vide sert à travailler sans le site : ta note, déjà remplie, serait à refaire.",
      "Non. Tes documents restent dans ton navigateur : une copie n'a pas d'adresse que le DAF pourrait ouvrir."
    ],
    retenir: "Pour un e-mail ou Word : `Copier`. Pour Excel : `Télécharger en Excel`. Pour garder le document ou changer d'ordinateur : `Enregistrer dans un fichier`."
  },
  {
    id: "ot03-q05",
    dialecte: "Gestion de projet",
    q: "COPIL. Tu recommandais l'option B. Le DAF choisit C, en connaissant son prix. Que fais-tu de ta note de décision ?",
    choix: [
      "Tu remplis « Décision prise » : C, le DAF, la date ; puis le registre",
      "Tu réécris ta recommandation en C, pour que la note reste cohérente",
      "Tu la renvoies au DAF demain ; tu redis tes arguments pour B",
      "Tu la supprimes : la décision est prise, la note ne sert plus"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. « Décision prise » : quoi, par qui, quand. Puis une ligne au registre des décisions. Ta recommandation reste écrite : le DAF a choisi en la connaissant.",
      "Non. Ce serait réécrire l'histoire. Ta recommandation (B) et le choix du DAF (C) restent écrits tous les deux.",
      "Non. Le DAF a décidé en connaissant le prix : c'est décidé, tu appliques. On n'y revient que sur un fait nouveau.",
      "Non. La note est la trace de la décision et de ses options. Sans elle, le choix sera contesté plus tard."
    ],
    retenir: "Le décideur choisit, même contre ta recommandation. Tu écris « Décision prise » (quoi, par qui, quand), puis une ligne au registre des décisions."
  },
  {
    id: "ot03-q06",
    dialecte: "Gestion de projet",
    q: "Quatre faits de la semaine. Lequel écris-tu au registre des décisions ?",
    choix: [
      "Au point projet, l'équipe teste les avoirs avant les acomptes",
      "Le consultant règle les codes TVA avant les adresses, mardi",
      "La cheffe comptable désigne par écrit qui signe le PV de recette",
      "Sophie propose un état des rejets : il part au backlog de la compta"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Un choix d'équipe, sans effet sur les dates : il va dans les actions du point projet.",
      "Non. L'ordre de son propre travail : le consultant l'organise, rien à tracer au registre.",
      "Oui. Une décision d'un A du RACI : elle approuve le PV fournisseurs, et choisit qui signe pendant son congé. Une ligne au registre, avec sa date et son impact.",
      "Non. Une idée au backlog n'est pas une décision : la cheffe comptable, PO, la classera."
    ],
    retenir: "Au registre des décisions : celles du sponsor, du COPIL et des A du RACI, où qu'elles soient prises. Les choix d'équipe restent dans les actions."
  },
  {
    id: "ot03-q07",
    dialecte: "Gestion de projet",
    q: "Mardi 30 mars, 18 h. Ton registre des décisions affiche « Trace écrite à faire : 1 » : l'accord du DAF, ce matin au téléphone, pour 3 jours d'intégrateur de plus. Que fais-tu ?",
    choix: [
      "Rien de plus : « Téléphone » est déjà écrit dans la colonne « Où »",
      "Tu notes son accord dans ton cahier, pour le compte rendu d'avril",
      "Tu lui écris ce soir « Comme convenu… », puis « Écrit (mail) »",
      "Tu l'appelles aujourd'hui, et il redira son accord au COPIL d'avril"
    ],
    bonne: 2,
    pourquoi: [
      "Non. « Où » dit comment la décision a été prise, pas qu'elle est écrite. Sans écrit, elle sera contestée.",
      "Non. Presque : tu notes, mais pour toi seul. Deux semaines sans écrit partagé : les souvenirs changent. L'écrit au DAF se fait le jour même.",
      "Oui. Une décision orale se confirme par écrit le jour même : « Trace écrite » passe à « Écrit (mail) », et l'alerte s'éteint. La commande signée, elle, engage la dépense : elle ne remplace pas ce mail.",
      "Non. Une décision prise ne se refait pas en séance. Un mail, le jour même, suffit à la tracer."
    ],
    retenir: "Une décision prise au téléphone ou dans un couloir se confirme par écrit le jour même : « Comme convenu ce matin : … »."
  },
  {
    id: "ot03-q08",
    dialecte: "Gestion de projet",
    q: "COPIL du mardi 8 juin. Le responsable ADV : « Les critères de go, on les revoit ? 2 % de rejets, c'est dur. » Ils sont au registre : validés par le DAF le 11 mai. Rien de nouveau depuis. Que fais-tu ?",
    choix: [
      "Tu ouvres le débat : un critère de go doit faire consensus",
      "Tu montres leur ligne au registre : décidé, sauf fait nouveau",
      "Tu proposes au DAF un seuil à 3 %, pour éviter un no-go",
      "Tu notes son avis au registre, pour le go / no-go du 11"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Les critères sont fixés avant, par celui qui décidera. Les rouvrir 3 jours avant, sans fait nouveau, c'est les réécrire pour qu'ils passent.",
      "Oui. Une décision écrite ne se refait pas au COPIL suivant, sauf fait nouveau. Le 11 juin, on comparera les preuves aux critères du 11 mai.",
      "Non. Baisser un seuil pour qu'il passe, c'est réécrire un critère. Un écart, s'il y en a un, se montre au DAF le 11 juin.",
      "Non. Le registre garde les décisions, pas les avis. Et le 11 juin, on compare les preuves aux critères : les rouvrir ce jour-là, c'est décider sous la pression."
    ],
    retenir: "Une décision écrite au registre ne se refait pas au COPIL suivant, sauf fait nouveau : tu montres sa ligne."
  },
  {
    id: "ot03-q09",
    dialecte: "Gestion de projet",
    q: "Mardi 2 février. Le responsable ADV veut la référence chantier sur les factures : des litiges chez 3 clients. Rien n'est encore chiffré. Quel outil remplis-tu en premier ?",
    choix: [
      "La note de décision, pour le COPIL du mardi 9 février",
      "Le registre des décisions : sa demande, avec la date du jour",
      "Le registre des changements : n° 7, « À décider »",
      "MoSCoW : tu la classes avec les autres demandes du mois"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Bon outil, trop tôt : sans impact chiffré, pas d'options à poser. La note de décision vient après le registre et le chiffrage.",
      "Non. Rien n'est décidé : le registre des décisions attendra la décision du DAF.",
      "Oui. La demande touche le budget : elle entre au registre des changements, « À décider ». Puis l'impact chiffré, puis la note de décision pour le DAF.",
      "Non. MoSCoW trie plusieurs demandes pour une même place (une enveloppe, une itération). Ici, une demande qui touche le budget : le circuit de changement, jusqu'au DAF."
    ],
    retenir: "Une demande qui touche le périmètre, le budget, une date validée ou un contrat entre d'abord au registre des changements. La note de décision vient après le chiffrage."
  },
  {
    id: "ot03-q10",
    dialecte: "Gestion de projet",
    q: "Recette. Le cahier de recette prévoit le n° de commande dans les factures EDI d'AquaBleu ; il n'y est pas. Le consultant veut en faire la demande n° 17 au registre des changements : 2 jours. Que fais-tu ?",
    choix: [
      "Tu la gardes « À décider », chiffrée, pour le prochain COPIL",
      "Tu la passes « Pas maintenant » : pour juillet, après la bascule",
      "Tu en fais un ticket d'anomalie : c'est non conforme à l'écrit",
      "Tu demandes au DAF de trancher : anomalie, ou changement ?"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Ce n'est pas un besoin nouveau : le cahier de recette le prévoyait. Au registre, l'anomalie passerait pour un changement, décidé et payé comme tel.",
      "Non. Une anomalie ne se reporte pas comme une demande : elle se corrige selon sa gravité. Bloquante ou majeure, elle empêche le PV.",
      "Oui. Non conforme à l'écrit : une anomalie, pas un changement. Elle va dans l'outil de tickets, avec sa gravité. Qui paie la correction : le contrat le dit.",
      "Non. Trier, c'est ton travail : le cahier de recette dit ce qui était attendu. Le DAF n'a pas à arbitrer un texte clair."
    ],
    retenir: "Avant le registre des changements, on trie : non conforme à l'écrit, c'est une anomalie, pas un changement."
  },
  {
    id: "ot03-q11",
    dialecte: "Gestion de projet",
    q: "Demande n° 16 du commercial : un état des factures rejetées, par client. Du confort ; l'équipe est pleine jusqu'à la bascule. Tu choisis « Pas maintenant ». L'outil affiche : « Écris qui a décidé, et quand. » Que fais-tu ?",
    choix: [
      "Tu écris « Toi, le 07/04 : en juillet », et tu le dis au commercial",
      "Tu écris « Le DAF, au COPIL », et tu la mets à l'ordre du jour",
      "Tu écris « Toi, le 07/04 », sans date : il relancera s'il y tient",
      "Tu passes la décision à « Refusée » : il la redemandera le 1er juillet"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Du confort, sans coût ni date touchée : tu décides et tu informes. « Pas maintenant » s'écrit avec qui, quand, et pour quand, dit au demandeur.",
      "Non. Rien n'est dépensé, aucune date ne bouge : c'est ta délégation. Le DAF décidera en juillet, si des jours d'intégrateur sont engagés.",
      "Non. Presque : c'est bien ta décision. Mais sans date, « pas maintenant » devient « jamais » : le commercial relance, et personne ne sait quand.",
      "Non. Une bonne demande au mauvais moment ne se refuse pas : « pas maintenant », avec une date, la garde."
    ],
    retenir: "« Pas maintenant » s'écrit avec qui l'a décidé, quand, et pour quand : une date, dite au demandeur."
  },
  {
    id: "ot03-q12",
    dialecte: "Gestion de projet",
    q: "Ton registre des changements affiche, sur la demande n° 18 : « Demande pas encore chiffrée : l'impact d'abord, puis la décision. » Le COPIL est dans 6 jours. Que fais-tu ?",
    choix: [
      "Tu l'inscris au COPIL, et tu laisses le DAF poser ses questions",
      "Tu mets 0 jour et 0 € pour l'instant, et l'alerte disparaît",
      "Tu fais chiffrer jours et tests cette semaine, puis tu la portes",
      "Tu la refuses : une demande sans chiffre n'est pas recevable"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Sans impact, le DAF décide à l'aveugle, ou renvoie au mois suivant : un COPIL perdu.",
      "Non. Un faux chiffre fait taire l'alerte : le DAF lirait « 0 € » et déciderait sur un prix faux.",
      "Oui. L'impact d'abord : les jours avec l'intégrateur, les tests et le temps des métiers avec leur manager. Puis les options, et la décision au COPIL.",
      "Non. La chiffrer, c'est ton travail. La refuser sans la regarder, c'est perdre peut-être un vrai besoin."
    ],
    retenir: "Au registre des changements, l'impact d'abord, puis la décision : une demande « À décider » se chiffre avant d'aller au COPIL."
  },
  {
    id: "ot03-q13",
    dialecte: "Gestion de projet",
    q: "MoSCoW de la compta. Place : 10 jours. Demandes : 12 jours, dont 7 en « doit » et 2 en « pas cette fois ». L'outil affiche « Part du « doit » dans la place (%) : 70 · Au-delà du repère ». La cheffe comptable : « 7 sur 12, ça fait 58 %. » Qui a raison ?",
    choix: [
      "Elle : la part se compte sur tout ce qui est demandé, 12 jours",
      "L'outil : la part se compte sur la place, les 10 jours",
      "Personne : la part se compte en nombre de demandes",
      "L'outil, mais 70 % reste dans le repère « d'environ 60 % »"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Le « pas cette fois » n'entre pas dans la place : le compter fait baisser la part du « doit » pour rien.",
      "Oui. Repère DSDM : pas plus d'environ 60 % de l'effort en « doit », compté sur la place. 7 sur 10 : 70 %. On refait le tri : « sans elle, la bascule échoue-t-elle ? »",
      "Non. Une demande d'un jour et une de cinq ne pèsent pas pareil : l'effort se compte en jours.",
      "Non. L'outil dit « Au-delà du repère », et l'alerte demande de refaire le tri : à 70 %, rien ne protège la date."
    ],
    retenir: "La part du « doit » se compte sur la place, les jours disponibles. Au-delà d'environ 60 %, on refait le tri avec le métier."
  },
  {
    id: "ot03-q14",
    dialecte: "Gestion de projet",
    q: "Ton tri MoSCoW classe « pas cette fois » l'export Excel des factures bloquées, demandé par Julie. Une alerte s'affiche sur sa ligne. Que fais-tu ?",
    choix: [
      "Une date de reprise, le 1er juillet, dite à Julie",
      "Tu la passes en « pourrait » pour 2 jours : l'alerte part",
      "Tu supprimes sa ligne, et tu dis à Julie : pas cette fois",
      "Tu laisses la date vide : c'est au DAF de la fixer plus tard"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. « Pas cette fois » s'écrit avec une date, et se dit au demandeur : ce n'est pas « jamais ».",
      "Non. « Pourrait » veut dire : dans la place, s'il reste du temps. Julie croirait l'avoir, et l'alerte se tairait pour rien.",
      "Non. Le lui dire, oui. Mais supprimer la ligne, c'est perdre la demande et sa trace : sans date, elle ne reviendra pas.",
      "Non. Tu proposes le tri, dates comprises ; le sponsor valide les « doit ». Sans date, la demande se perd."
    ],
    retenir: "« Pas cette fois » n'est pas « jamais » : une date, et le demandeur prévenu."
  },
  {
    id: "ot03-q15",
    dialecte: "Gestion de projet",
    q: "Tri MoSCoW fini avec la cheffe comptable, PO de l'enveloppe des écrans. Reste l'alerte : « Fais valider les « doit » par le sponsor. En cas de désaccord, il tranche. » Que fais-tu ?",
    choix: [
      "Tu écris « Validé par : moi » : c'est toi qui as proposé le tri",
      "Tu fais valider les « doit » par le DAF, et tu notes la date",
      "Tu fais valider par la cheffe comptable, PO, et tu notes la date",
      "Tu laisses l'alerte : le DAF verra le tri au prochain COPIL"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Tu proposes le classement, avec les métiers ; tu ne le valides pas. Les « doit » engagent la bascule.",
      "Oui. La PO classe ; le sponsor valide les « doit », et tranche en cas de désaccord. « Validé par » garde qui, et quand.",
      "Non. Presque : la PO classe sa partie. Mais les « doit » engagent la bascule : le sponsor les valide.",
      "Non. Sans validation, le tri sera contesté dans 3 semaines. Une validation courte, maintenant, le protège."
    ],
    retenir: "MoSCoW : tu proposes le classement avec les métiers, la PO classe sa partie, le sponsor valide les « doit »."
  }
];
