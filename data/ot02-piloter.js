// Parcours « Maîtriser les outils du chef de projet » — Questions du module ot02 « Outils pour piloter ».
// Petit QCM (15 questions) : quel outil prendre, comment s'en servir, lire un résultat (note, niveau, alerte, total),
// la règle clé, le piège. Outils : registre des risques (q01 à q03), tableau de bord de l'équipe (q04, q05), rapport du
// COPIL et météo (q06 à q08), suivi du budget (q09 à q11), compte rendu de réunion (q12, q13), fiche du lundi et charge
// (q14, q15). Règles et mots : ceux des outils (data/outils/gp-*.js) et de leurs cours (cp02, cp03, cp07, cp08, cp09,
// cp12, cp15, cp17), mot pour mot ; chaque notion testée est dans le cours ot02. Fil rouge : DEMAT 2027 (fiche de
// docs/plan-chef-de-projet.md, qui fait foi).
// Calculs vérifiés avec le moteur des outils (js/outils.js) : note 2 × 3 = 6, « Priorité » (q01) ; météo globale = le
// maximum des axes, « Orange » (q07) ; jalon prévu le 30 avril, prévision le 21 mai : écart 21 jours, reste de
// tolérance 14 - 21 = - 7, « Hors tolérance » et son alerte (q08) ; commande de base : 18 000 + 14 250 = 32 250 € pour
// 30 000 € engagés, alerte « L'atterrissage dépasse la commande » (q09) ; charge 8 + 3 = 11 sur 10 = 110 %, « Pic court »
// (q14) ; alerte « Plus que le partage prévu » quand la semaine passée dépasse le partage (q15).
// Variantes propres à une question : le connecteur pas livré au 15 mars (q03, comme l'exemple de cp07 §6) ; 3,1 % et
// 1,8 % de rejets la 1re semaine du pilote (q05 ; rien n'est hors tolérance, comme cp08-q23) ; le DAF qui veut juste savoir
// s'il y a une décision, en décembre 2026 (q06) ; le PV prévu au 21 mai (q08, comme cp08-q25) ; fin février, 13 jours faits, 5 facturés,
// 3 payés (q11, comme cp12 §2) ; 2 actions en retard au point du 15 février (q13) ; run à 5 sur 3 depuis 3 semaines
// (q15, comme cp02 §6).
// Anti-devinette (règles de .claude/agents/expert-chef-projet.md) : bonne réponse = l'action la plus forte dans q03,
// q08, q09 ; la plus petite action réelle dans q14 (un pic court) ; le DAF juste dans q01, q03, q08, q09 et faux dans
// q02, q04, q05, q07, q09, q13, q15 ; les mots d'urgence (« le jour même », « tout de suite », « aujourd'hui ») justes dans
// q03, q08, q09, q15 et aussi dans des choix faux (q03, q05, q08, q09, q13, q14, q15) ; « Oui » juste dans q14,
// « Rien » juste dans q07 ; absolus aussi dans de bonnes réponses (q05 « seul », q07 « Rien »).
// Affirmations juridiques : aucune.
LEARNSQL.questions.ot02 = [
  {
    id: "ot02-q01",
    dialecte: "Gestion de projet",
    q: "Registre de DEMAT : « Parce que le e-reporting est hors du projet, il peut arriver qu'il ne soit pas prêt au 1er septembre 2027… » Probabilité 2, impact 3. Que t'affiche l'outil, et que fais-tu ?",
    choix: [
      "5, « Action simple » : tu le suis en revue, chaque lundi",
      "6, « Priorité » : tu le remets au DAF, son porteur",
      "6, « Priorité » : tu l'ajoutes au périmètre de DEMAT",
      "3, « Action simple » : hors projet, tu le notes et c'est tout"
    ],
    bonne: 1,
    pourquoi: [
      "Non. La note est un produit : 2 × 3 = 6, pas 2 + 3. Et 6, c'est « Priorité ».",
      "Oui. 2 × 3 = 6 : « Priorité ». Hors du projet, la réponse est « escalader » : le remettre à son porteur, le DAF, qui l'a confié au contrôleur de gestion.",
      "Non. La note est juste, la réponse non : l'ajouter au périmètre serait une demande de changement. Le e-reporting a déjà son porteur.",
      "Non. 2 × 3 = 6, pas 3. Et un risque légal hors du projet ne se note pas seulement : il se remet à son porteur."
    ],
    retenir: "Note = probabilité × impact ; un risque hors du projet se remet à son porteur : c'est « escalader »."
  },
  {
    id: "ot02-q02",
    dialecte: "Gestion de projet",
    q: "Après l'atelier, ton registre compte 14 risques. 5 n'ont ni action ni date : 5 alertes. Le point projet commence dans 10 minutes. Que fais-tu ?",
    choix: [
      "Tu écris « à voir » et la date du jour : les 5 alertes disparaissent",
      "Tu supprimes ces 5 lignes : sans action, elles encombrent",
      "Tu leur donnes, en revue, une action ou « accepté », avec une date",
      "Tu les gardes pour le COPIL : le DAF choisira les actions"
    ],
    bonne: 2,
    pourquoi: [
      "Non. L'outil se tait, mais rien n'a changé : « à voir » n'est ni une action, ni « accepté ». C'est toujours une liste d'inquiétudes.",
      "Non. Supprimer un risque ne le fait pas disparaître. Un petit risque s'accepte, par écrit : il reste au registre.",
      "Oui. C'est l'objet des 15 minutes de revue : chaque risque reçoit sa réponse (une action, ou « accepté » écrit) et une date, avec son propriétaire.",
      "Non. Le COPIL voit les 5 plus gros risques, avec leur action. Trouver les actions, c'est le travail du point projet, pas du DAF."
    ],
    retenir: "Sans action ni date, c'est une liste d'inquiétudes : chaque risque a une réponse, un propriétaire et une date."
  },
  {
    id: "ot02-q03",
    dialecte: "Gestion de projet",
    q: "Mardi 16 mars : le connecteur n'est pas livré. Au registre, ce risque a son déclencheur : « pas livré au 15 mars ». Que fais-tu ?",
    choix: [
      "Statut « Arrivé » : plan B lancé, le DAF prévenu le jour même",
      "Statut « Fermé » : ce n'est plus un risque, c'est devenu un problème",
      "Probabilité à 3, et tu en reparles à la revue de lundi",
      "COPIL réuni dès aujourd'hui, pour décider du plan B"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Le déclencheur daté décide pour toi : plan B lancé (le portail de la PA). L'alerte « Arrivé » le rappelle : le sponsor est prévenu le jour même.",
      "Non. « Fermé », c'est une action faite et vérifiée. Ici, le risque est arrivé : il faut agir, pas le ranger.",
      "Non. Le risque est arrivé : sa probabilité ne compte plus. Attendre lundi, c'est perdre des jours de recette.",
      "Non. Le plan B part seul quand son déclencheur est atteint : personne ne le tranche. Et le prochain COPIL est le 13 avril."
    ],
    retenir: "Un déclencheur daté décide pour toi : statut « Arrivé », plan B lancé, sponsor prévenu le jour même."
  },
  {
    id: "ot02-q04",
    dialecte: "Gestion de projet",
    q: "Tu montes le tableau de bord de DEMAT. Le consultant propose 3 lignes : « heures passées », « réunions tenues », « moral : bon ». Que fais-tu ?",
    choix: [
      "Tu les gardes toutes : plus de lignes, c'est plus complet",
      "Tu gardes « heures passées », avec une source et un seuil",
      "Tu les gardes, et tu les envoies au DAF chaque vendredi",
      "Tu les remplaces : cas OK, anomalies bloquantes, rejets"
    ],
    bonne: 3,
    pourquoi: [
      "Non. 5 à 7 indicateurs, pour décider. Des heures et des réunions disent l'activité, pas le résultat.",
      "Non. Une source et un seuil n'en font pas un résultat : on peut passer 100 heures sans finir un cas.",
      "Non. Ce sont des indicateurs d'activité. Et le tableau sert à l'équipe : au DAF, le rapport mensuel et les alertes.",
      "Oui. Le résultat, pas l'activité. Et « moral : bon » est une impression : ce n'est pas un indicateur."
    ],
    retenir: "Un indicateur mesure un résultat (cas OK, rejets), pas une activité ; une impression n'en est pas un."
  },
  {
    id: "ot02-q05",
    dialecte: "Gestion de projet",
    q: "Vendredi, 1re semaine du pilote. Rejets de la PA : 3,1 % d'après son portail, 1,8 % d'après ton export Divalto. La source de la ligne est le portail. Que publies-tu ?",
    choix: [
      "1,8 % : c'est sous le seuil de 2 %, inutile d'inquiéter",
      "Les deux chiffres, et le DAF choisira le bon",
      "Un seul chiffre : celui qui fait foi, une fois l'écart vérifié",
      "3,1 % du portail, « Seuil franchi », et le DAF le jour même"
    ],
    bonne: 2,
    pourquoi: [
      "Non. C'est maquiller : la source de la ligne est le portail. Un chiffre choisi parce qu'il arrange n'est plus un indicateur.",
      "Non. Deux chiffres, c'est chacun le sien. Et le tableau sert à l'équipe ; au DAF, le rapport et les alertes.",
      "Oui. Deux sources diffèrent : tu vérifies avant de publier, puis un seul chiffre. La source écrite sur la ligne fait foi, avec la date de ses données.",
      "Non. Tu publies avant de comprendre l'écart. Et une 1re semaine de pilote ne juge pas encore le critère : un plan daté au point du lundi suffit."
    ],
    retenir: "Deux sources diffèrent : tu vérifies, puis un seul chiffre, celui de la source qui fait foi."
  },
  {
    id: "ot02-q06",
    dialecte: "Gestion de projet",
    q: "Décembre 2026, tout est vert. Le DAF : « Ce mois-ci, dis-moi juste s'il y a quelque chose à décider. » Rien n'est à décider. Que lui envoies-tu ?",
    choix: [
      "Le tableau de bord du vendredi : ses 6 lignes suffisent",
      "Le rapport du COPIL, avec « Aucune décision attendue. »",
      "Le registre des risques complet, pour qu'il voie tout",
      "Rien d'écrit : « tout va bien » se dit en 2 minutes"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Le tableau de bord sert à l'équipe, chaque semaine. Au DAF : le rapport mensuel, et les alertes.",
      "Oui. Le rapport d'une page, le même chaque mois, même tout vert. En tête, les décisions attendues ; rien à décider ? Tu l'écris.",
      "Non. Le DAF voit les 5 plus gros risques, dans le rapport. Le registre complet sert à l'équipe, au point projet.",
      "Non. « Tout va bien en 2 minutes », c'est pour ton DSI, le lundi. Au COPIL, le même rapport écrit chaque mois : il compare d'un mois à l'autre."
    ],
    retenir: "Au DAF, chaque mois, le rapport d'une page ; rien à décider ? Écris « Aucune décision attendue. »"
  },
  {
    id: "ot02-q07",
    dialecte: "Gestion de projet",
    q: "Rapport d'avril : délai orange, les 3 autres axes verts. L'outil affiche une météo globale « Orange ». Le DAF : « 3 verts sur 4, mets vert. » Que fais-tu ?",
    choix: [
      "Rien ne change : la globale reste l'axe le plus mauvais",
      "Délai passé en vert : la globale suivra",
      "Tu mets rouge, pas orange : un axe en risque, c'est tout le projet",
      "Tu laisses le DAF choisir la couleur : c'est son rapport"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Règle du modèle de DEMAT : la globale reprend l'axe le plus mauvais. L'outil la calcule : elle reste orange, et tu expliques au DAF pourquoi.",
      "Non. C'est maquiller : la pastèque, verte dehors, rouge dedans. Le délai reste en risque : les seuils font la couleur.",
      "Non. C'est dramatiser : rouge, c'est hors tolérance. Le PV prévu le 7 mai reste dans la tolérance de ± 2 semaines.",
      "Non. Le rapport est le tien : tu vérifies les faits, mais la couleur, c'est toi qui la mets, d'après les seuils."
    ],
    retenir: "La météo globale = l'axe le plus mauvais ; la couleur suit les seuils, pas l'humeur."
  },
  {
    id: "ot02-q08",
    dialecte: "Gestion de projet",
    q: "Rapport du COPIL, jalon « PV de recette signé » : prévu le 30 avril, prévision le 21 mai, tolérance 14 jours. Que calcule l'outil, et que fais-tu ?",
    choix: [
      "Écart 21 jours, hors tolérance : le DAF le jour même",
      "Écart 21 jours, dans la tolérance : orange au COPIL",
      "Écart 7 jours : tu passes tout de suite le prévu au 21 mai",
      "Écart 21 jours : tu attends le prochain COPIL pour le dire"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. 21 jours d'écart pour 14 de tolérance : reste - 7, « Hors tolérance ». L'alerte le dit : le délai est rouge, et le DAF le sait le jour même.",
      "Non. Le reste de tolérance est 14 - 21 = - 7 : sous 0, c'est hors tolérance. Ce n'est plus orange.",
      "Non. Le prévu est la référence : seul le sponsor la change. Et l'écart est de 21 jours, pas 7.",
      "Non. Hors tolérance, le DAF l'apprend le jour même, pas au COPIL suivant, des semaines plus tard."
    ],
    retenir: "Reste de tolérance sous 0 : hors tolérance, délai rouge, le DAF le jour même."
  },
  {
    id: "ot02-q09",
    dialecte: "Gestion de projet",
    q: "Fin mars, suivi du budget, commande de base de l'intégrateur : engagé 30 000 €, consommé 18 000 €, reste à faire 14 250 €. L'outil affiche : « L'atterrissage dépasse la commande ». Que fais-tu ?",
    choix: [
      "Tu attends les 80 % de la commande pour prévenir le DAF",
      "Tu laisses faire : le projet reste sous les 90 k€",
      "Tu demandes tout de suite au DG un budget de plus",
      "Tu appelles le DAF le jour même : cause, options, ton avis"
    ],
    bonne: 3,
    pourquoi: [
      "Non. L'atterrissage (32 250 €) dépasse déjà la commande : tu n'attends pas les 80 %. L'alerte dit : tout de suite.",
      "Non. Sous 90 k€ aussi, des jours en plus = une commande signée avant. Sinon, le consultant travaillerait sans commande.",
      "Non. Le DAF tranche le budget du projet, pas le DG. Et quelques jours de plus ne font pas un nouveau budget.",
      "Oui. 18 000 + 14 250 = 32 250 € pour 30 000 € engagés. Le DAF tout de suite, avec la cause, des options (retirer une tâche, une commande de plus) et ta recommandation."
    ],
    retenir: "L'atterrissage dépasse la commande : le DAF tout de suite, avec des options ; des jours en plus = une commande signée avant."
  },
  {
    id: "ot02-q10",
    dialecte: "Gestion de projet",
    q: "COPIL du 9 février : le DAF accepte les changements n° 7 et n° 9, 7 jours d'intégrateur, 5 250 €. Dans ton suivi du budget, que fais-tu ?",
    choix: [
      "Une ligne pour leur commande, et la référence en version 2",
      "Rien : l'écart de 5 250 € montrera le changement au COPIL",
      "Tu les prends sur la réserve pour risques : 8 000 € suffisent",
      "Tu montes la ligne de base de l'intégrateur à 35 250 €"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Seul le DAF change la référence : nouvelle version, datée (85 250 €). Chaque commande se suit à part, sur sa ligne.",
      "Non. Un changement accepté par le DAF, avec sa commande, change la référence. Un écart, c'est un dépassement que personne n'a décidé.",
      "Non. Un changement n'est pas un risque du registre. Le payer sur la réserve : seulement si le DAF le choisit.",
      "Non. Mélanger les commandes cache le reste à faire de chacune : la base paraîtrait finie trop tôt. Une ligne par commande."
    ],
    retenir: "Un changement accepté par le DAF donne une nouvelle version de la référence, datée ; chaque commande a sa ligne."
  },
  {
    id: "ot02-q11",
    dialecte: "Gestion de projet",
    q: "Fin février, commande de base de l'intégrateur : 13 jours faits (9 750 €), dont 5 facturés (3 750 €) et 3 payés (2 250 €). Que mets-tu en « Consommé » ?",
    choix: [
      "30 000 € : toute la commande est signée",
      "9 750 € : le travail fait, facturé ou pas",
      "3 750 € : seules les factures reçues font foi",
      "2 250 € : l'argent sorti, c'est le vrai coût"
    ],
    bonne: 1,
    pourquoi: [
      "Non. 30 000 €, c'est l'engagé : la commande signée. En régie, c'est un plafond, pas du travail fait.",
      "Oui. Consommé = le travail fait, facture reçue ou pas : 13 jours × 750 €. Avec 27 jours à faire, l'atterrissage reste à 40 jours.",
      "Non. Les factures arrivent après le travail : les suivre, c'est voir en retard.",
      "Non. Le payé, c'est l'argent sorti par la compta : il arrive encore plus tard."
    ],
    retenir: "Consommé = le travail fait, facture reçue ou pas : les factures arrivent après."
  },
  {
    id: "ot02-q12",
    dialecte: "Gestion de projet",
    q: "COPIL du 9 février. Sur la clôture de mars, en pleine recette, le DAF : « Un renfort ? Peut-être. Il me faut d'abord la charge de la compta. » Où l'écris-tu dans le compte rendu ?",
    choix: [
      "En décision : renfort accordé, son montant à chiffrer",
      "En action pour toi : « renforcer l'équipe », dès mars",
      "Nulle part : rien n'a été décidé, donc rien à écrire",
      "En point ouvert : quoi, qui l'apporte, pour quand"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Un « peut-être » n'est pas une décision. L'écrire « accordé » engage le DAF sur ce qu'il n'a pas dit.",
      "Non. « Renforcer l'équipe » n'est pas une action précise : qui vient, pour faire quoi ? Et rien n'est encore décidé.",
      "Non. Rien n'est décidé, mais une question reste ouverte : sans trace, elle revient en pleine recette, sans les chiffres.",
      "Oui. Un « peut-être » est un point ouvert : ce qui manque (la charge, en heures), qui l'apporte (la cheffe comptable), pour quand (le 4 mars)."
    ],
    retenir: "Un « peut-être » va en point ouvert : ce qui manque, qui l'apporte, pour quand."
  },
  {
    id: "ot02-q13",
    dialecte: "Gestion de projet",
    q: "Point projet du lundi 15 février. Dans le compte rendu de la semaine passée, 2 actions portent l'alerte « Action en retard ». Que fais-tu ?",
    choix: [
      "Tu reportes leur date d'une semaine : l'alerte disparaît",
      "Tu les revois en séance : faites ou pas, et sinon une date",
      "Tu les supprimes : la semaine est passée, on avance",
      "Tu préviens le DAF le jour même pour ces 2 retards"
    ],
    bonne: 1,
    pourquoi: [
      "Non. L'outil se tait, mais personne n'a rien décidé. Une nouvelle date se fixe avec celui qui fait, et on dit pourquoi.",
      "Oui. Au point suivant : fait, ou pas ? Faite : « Fait ? » passe à « Oui ». Sinon : pourquoi, et une nouvelle date avec son responsable.",
      "Non. Une action supprimée ne se fait pas pour autant : le retard sort du suivi, pas du projet.",
      "Non. Une action en retard se revoit d'abord au point projet. Le DAF le jour même, c'est pour un jalon hors tolérance ou une décision qui n'attend pas."
    ],
    retenir: "Au point suivant, chaque action : faite, ou pas ? Sinon : pourquoi, et une nouvelle date."
  },
  {
    id: "ot02-q14",
    dialecte: "Gestion de projet",
    q: "Fiche du lundi : cette semaine, DEMAT 8 demi-journées, run 3 ; la suivante, 9 sur 10, sans échéance menacée. Ton DSI : « Tu tiens ? » Que réponds-tu ?",
    choix: [
      "« Non : 120 % ; il me faut ton arbitrage aujourd'hui »",
      "« Non : 110 %, choisis ce que je laisse tomber »",
      "« Oui : 110 %, pic court ; je glisse ce qui peut attendre »",
      "« Oui : je finirai le soir, sans rien décaler ni te déranger »"
    ],
    bonne: 2,
    pourquoi: [
      "Non. 8 + 3 = 11 demi-journées sur 10 : 110 %, pas 120 %. Et un pic court ne demande pas d'arbitrage.",
      "Non. Un pic court se règle dans ta liste. Ton DSI arbitre ce qui dure, ou ce qui menace une échéance.",
      "Oui. 11 sur 10, puis 9, sans échéance menacée : l'outil affiche « Pic court ». Tu glisses ce qui peut attendre. Pas d'alerte, pas de soirée.",
      "Non. Le soir, en silence, cache le problème. Un pic court se règle en glissant ce qui peut attendre."
    ],
    retenir: "11 sur 10, puis 9, sans échéance menacée : un pic court, tu glisses ce qui peut attendre."
  },
  {
    id: "ot02-q15",
    dialecte: "Gestion de projet",
    q: "Ta fiche du lundi alerte : « Plus que le partage prévu ». Run : 5 demi-journées la semaine passée, pour 3 prévues. C'est la 3e semaine de suite. Que fais-tu ?",
    choix: [
      "Tu le notes encore : un écart d'une semaine se règle seul",
      "Tu passes le partage prévu du run à 5 : l'alerte disparaît",
      "Tu demandes au DAF, dès aujourd'hui, 2 demi-journées du run",
      "Tu vois ton DSI ce matin : les faits, 2 options, ton avis"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Une semaine, oui. Trois semaines de suite, ça dure : c'est à ton DSI d'arbitrer.",
      "Non. Le partage se fixe avec ton DSI. Le changer seul fait taire l'alerte, pas le problème.",
      "Non. Le DAF ne gère pas le temps de la DSI. Le partage entre run et projet, c'est ton DSI qui l'arbitre.",
      "Oui. Ça dure : ton DSI arbitre, faits en main. Ce qui ne glisse pas, 2 options (le support N2 traite les rejets simples, la doc attend), ta recommandation."
    ],
    retenir: "Un écart d'une semaine se note ; s'il dure, ton DSI arbitre, faits et options en main."
  }
];
