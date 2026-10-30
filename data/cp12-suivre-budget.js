// Chef de projet SI — Questions du module cp12 « Suivre le budget ».
// Fond (PMBOK : référence de base des coûts, estimation à l'achèvement, valeur acquise en une ligne, réserve liée aux
// risques identifiés ; contrôle de gestion en PME / ETI) : la référence (validée par le DAF, suivie poste par poste,
// changée seulement par sa décision : changement accepté = version datée ; un dépassement reste un écart ; le temps
// interne n'y est pas) ; les mots (engagé = commandes et avenants signés, la commande en régie est un plafond ; facturé ;
// payé ; consommé, facture reçue ou pas, et le travail fait non facturé à la clôture des comptes ; reste à faire ≠
// « ce qui reste au budget » ; atterrissage = consommé + reste à faire ; écart = atterrissage − référence à jour) ;
// chaque contrat à sa façon (régie : les jours, chaque commande à part, le prix tient jusqu'au bout ; forfait : jalons,
// solde au PV, un PV avec réserves est un PV ; abonnement : engagé pour la durée, consommé chaque mois, repris par le
// run à la clôture ; à l'usage : Snowflake chaque mois, cause d'abord, alerte de crédits) ; les factures (toi le service
// fait, la compta la facture, le DAF le bon à payer ; avoir ; imputation à la bonne commande ; crédit du SLA réclamé) ;
// la dérive (signaux, fausse économie d'un travail décalé, alerte tôt avec cause, atterrissage et options chiffrées,
// le DAF tranche, hors tolérance le jour même ; pièges : attendre la facture, couper la recette, absorber) ; la réserve
// (risques du registre, décision du DAF, suivie à part, comptée dans l'atterrissage, rendue quand les risques se
// ferment, jamais « à dépenser ») ; la ligne budget du COPIL. Les pratiques divergent sur l'engagé d'un contrat de
// plusieurs années : le budget du projet (3 ans) compte tout le contrat, un budget annuel n'en compte que l'année (q03).
// Fil rouge DEMAT 2027 (fiche fil rouge de docs/plan-chef-de-projet.md, qui fait foi), ligne « Budget et business case
// (modules cp11, cp12) » : référence de 80 k€ validée par le DAF en novembre 2026, après les contrats (abonnement 850 €
// par mois, 30,6 k€ ; mise en service au forfait 7,4 k€ ; intégrateur 40 jours à 750 €, 30 k€, en régie ; formation et
// tests 4 k€ ; réserve 8 k€, chaque dépense par commande ou avenant signé par le DAF) ; tolérance : sous 90 k€, sinon le
// DAF décide, prévenu le jour même. Lignes « Contrats (cp14) » et « Pilotage des prestataires (cp15) » : solde au PV,
// relevé validé avant la facture, alerte à 80 % de la commande, crédits du SLA décidés par le DAF. Pas de budget de
// changement délégué ; plan B parti seul au 16 mars dans sa branche (q17, q23) ; aucun montant d'amende.
// Chiffres de suivi (faits ajoutés, cohérents avec la fiche et les modules publiés, à valider) : abonnement de décembre
// 2026 à novembre 2029, 36 mensualités, une facture par mois (q02, q03, q31 : 8 passées à la clôture, 6 800 €, 28
// restantes, 23 800 €, reprises par le run) ; mise en service : 3 700 € à la signature, 3 700 € au PV (q06, q15) ; les
// 40 jours comprennent l'enveloppe des 10 jours des écrans de la compta ; changements n° 7 (4 jours) et n° 9 (3 jours)
// acceptés le 9 février (cp10) : 5 250 €, référence à 85 250 € (q07, q08, q10) ; commande de base, jours faits :
// décembre 3, janvier 2, février 8, mars 11 (cumul 24 ; plan : 3, 3, 8, 10), avril 9, mai 4, juin 5, total 42 sur 43
// (q12, q13, q14, q20, q21, q32) ; n° 7 fait en février, n° 9 en mars (factures de 12 et 14 jours) ; fin février :
// 1 flux EDI fini sur 3 prévus (q20) ; fin mars : reste à faire 19, atterrissage 43 jours, cause les flux EDI
// sous-estimés (pas au registre), le DAF choisit une commande de 3 jours le jour même (q21, q26, q29) ; fin mars :
// engagé 81 100 €, consommé 30 350 €, facturé 19 850 €, atterrissage 87 500 €, écart + 2 250 € (q08, q09, q10) ;
// avenant d'archivage : 50 € par mois d'avril 2027 à novembre 2029, 1 600 €, pris sur la réserve par le DAF (risque
// légal du registre) (q18, q27) ; intérimaire envisagé en avril, environ 4 000 € (cp18-q22), refusé ensuite (cp18-q24) :
// réserve de 6 400 € en juin (q28, q30) ; formation et tests commandés en janvier, faits d'avril à juin, 300 € de plus
// en juin (q24) ; crédit du SLA de mai, 85 € (q19) ; ligne « frais d'activation » de 300 € (q18) ; révision de taux à
// 780 € refusée (q13). Variantes : connecteur livré le 29 mars (q23, comme cp14-q24) ; atterrissage au-delà de 90 k€
// au pilote (q25). Autres projets : Snowflake + Power BI (q33, q34, q37), chiffres des exemples (q33 à q39).
// q34 à q39 : « Tu es DSI adjoint ».
// Affirmations comptables ou juridiques hors fiche (générales, à faire vérifier) : le travail fait mais pas facturé
// compte dans l'année où il est fait (facture non parvenue) (q12) ; un PV avec réserves vaut acceptation, le solde lié
// au PV est dû, sauf retenue écrite au contrat (q16) ; le prix d'une commande signée tient jusqu'au bout, sauf clause de
// révision (q13) ; une facture émise ne se modifie pas : avoir (fiche ; q14, q18, q19) ; en régie, rien n'est payé
// d'avance et le jour non fait n'est pas dû (q32).
// Déjà publiées ailleurs, pas reprises ici : cp01-q14 (60 % consommé pour 40 % du travail), cp15-q06 à q10 et q41,
// cp14-q06, q09, q17, q24, q26 et q31, cp10-q18 à q21 et q36 à q38, cp11-q07 à q10, q31 et q38, cp18-q22 et q24.
// cp12-q20 est voisine de cp15-q08 (le reste à faire tâche par tâche), avec un autre signal : le consommé dans le plan.
// Frontières : construire le budget et le business case = cp11 ; le reporting global (météo) = cp08 (ici, la ligne
// budget) ; la régie au point hebdo = cp15 ; contrats, PV, pénalités = cp14 ; circuit d'un changement = cp10 ; registre
// des risques = cp07 ; clôture et passage en run = cp22 (ici, l'abonnement et la commande à la clôture) ; budget SI
// annuel = cp27.
// Anti-devinette : la bonne réponse est un extrême dans 10 questions sur 39 : la plus douce qui suffit (q16, q27), la
// plus forte ou la plus complète quand elle se justifie (q01, q03, q09, q10, q28, q29, q30, q32). « Atterrissage » ou
// « reste à faire » est dans des choix faux de 12 questions, et dans la bonne réponse de 11. Alerter le DAF n'est juste
// que dans q22, q24, q25, q28, q29, q30 ; attendre (le PV, le COPIL), dans q06, q15, q17, q26. « Rien », « tout »,
// « seul », « Oui », « D'accord », « Tu acceptes », « Tu refuses », « aujourd'hui », « dès », « le jour même » sont
// aussi dans des bonnes réponses.
LEARNSQL.questions.cp12 = [
  {
    id: "cp12-q01",
    dialecte: "Gestion de projet",
    q: "Fin février 2027. Commande de base de l'intégrateur : 40 jours, 30 000 €, signée en novembre. 13 jours sont faits ; factures reçues : 3 750 €. Ton DSI : « On a donc engagé 3 750 € ? » Que réponds-tu ?",
    choix: [
      "« Oui : 3 750 €. La commande signée n'est qu'un plafond »",
      "« Non : 9 750 €, les 13 jours déjà faits à ce jour »",
      "« Non : 30 000 €, la commande signée. Facturé : 3 750 € »",
      "« Non : rien, tant que la compta n'a rien payé »"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Presque : en régie, on ne paie que les jours faits. Mais le suivi compte toute la commande en engagé : c'est ce que le DAF a signé. Les jours non faits sortiront de l'engagé à la fin.",
      "Non. 9 750 €, c'est le consommé : le travail fait. L'engagé, c'est la commande signée.",
      "Oui. Engagé : la commande signée, 30 000 €. Facturé : 3 750 €. Consommé : 13 jours, 9 750 €. Trois chiffres, trois sens.",
      "Non. Ça, c'est le payé. L'engagement naît à la signature de la commande, bien avant le paiement."
    ],
    retenir: "Engagé = commandes et avenants signés. Le facturé, le payé et le consommé sont d'autres chiffres."
  },
  {
    id: "cp12-q02",
    dialecte: "Gestion de projet",
    q: "Fin février. La facture d'abonnement de février de la PA n'est pas arrivée. Le service a marché tout le mois. Que portes-tu pour février dans ton suivi ?",
    choix: [
      "Rien de consommé pour février : sans facture, rien ne compte",
      "850 € consommés ; la compta réclame la facture à la PA",
      "850 € consommés et payés, pour garder un suivi juste",
      "Tu demandes au DAF de bloquer mars jusqu'à la facture"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Le service est rendu : c'est consommé, facture ou pas. Ton suivi dirait moins que la réalité, et la facture arrivera quand même.",
      "Oui. Consommé = service rendu : 850 € pour février. Facturé et payé suivront. La facture manquante, c'est à la compta de la réclamer.",
      "Non. Presque : consommé, oui. Mais payé, non : rien n'est sorti de la banque. Le payé, c'est la compta qui le dit.",
      "Non. Un retard de facture n'est pas une faute : le DAF n'a rien à décider. La compta relance, c'est tout."
    ],
    retenir: "Consommé = travail fait ou service rendu, facture reçue ou pas."
  },
  {
    id: "cp12-q03",
    dialecte: "Gestion de projet",
    q: "Novembre 2026. Le DAF signe le contrat de la PA : 3 ans, 850 € par mois, de décembre 2026 à novembre 2029. Que portes-tu ce mois-ci dans ton suivi, pour l'abonnement ?",
    choix: [
      "Engagé : 30 600 €. Consommé : 0, le 1er mois est décembre",
      "Engagé : 850 €, la 1re mensualité ; le reste, mois par mois",
      "Engagé : 10 200 €, la 1re année ; le reste, chaque année",
      "Rien : rien n'est dû avant la 1re facture, en décembre"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Le contrat signé engage 36 mensualités : 30 600 €. Rien n'est encore consommé : le service et l'abonnement commencent en décembre. Puis 850 € de consommé chaque mois.",
      "Non. Le DAF signe pour 3 ans, pas pour un mois. N'engager que 850 €, c'est cacher 29 750 € déjà promis.",
      "Non. Presque : c'est la vue d'un budget annuel (module cp27). Ton projet se suit sur 3 ans : le contrat engage les 36 mois.",
      "Non. L'engagement naît à la signature, pas à la facture. Sans lui, ton suivi ignore 30 600 € déjà promis."
    ],
    retenir: "Un abonnement signé pour 3 ans est engagé pour 3 ans, et consommé mois par mois."
  },
  {
    id: "cp12-q04",
    dialecte: "Gestion de projet",
    q: "La compta t'envoie la facture de mars de l'intégrateur : « Merci de la valider. » Que valides-tu, toi ?",
    choix: [
      "Tout : le service, le montant, la TVA, puis le bon à payer",
      "Rien : la compta vérifie les factures mieux que toi",
      "Le bon à payer, et tu l'envoies au DAF pour information",
      "Le service fait : jours, tâches, commande, relevé"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Le montant et la TVA, c'est le métier de la compta ; le bon à payer, celui du DAF. Tu signerais ce que tu ne sais pas vérifier.",
      "Non. La compta ne sait pas si les jours facturés ont été faits. Sans ton service fait, elle paie à l'aveugle.",
      "Non. Tu as bien un rôle avant le paiement, mais pas celui-là : le bon à payer est au DAF, après ton service fait et le contrôle de la compta.",
      "Oui. Toi : le travail est là, conforme à la commande et au relevé validé. La compta contrôle la facture (montant, TVA, mentions) ; le DAF donne le bon à payer."
    ],
    retenir: "Toi : le service fait. La compta : la facture. Le DAF : le bon à payer."
  },
  {
    id: "cp12-q05",
    dialecte: "Gestion de projet",
    q: "Avril. La recette a pris 8 jours de plus à la compta. La cheffe comptable : « Ajoute-les à la ligne budget du COPIL, à 400 € le jour. » Que fais-tu ?",
    choix: [
      "Tu les ajoutes : 8 jours, 3 200 € de plus au budget",
      "Rien en euros : tu les montres en jours, hors du budget",
      "Tu les ajoutes, et le DAF les couvre par la réserve",
      "Rien du tout : c'est le temps de la compta, pas ton projet"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Le budget de référence ne paie pas la compta : ses salaires sont déjà payés. L'atterrissage gonflerait sans qu'un euro de plus sorte.",
      "Oui. Le budget de référence ne compte que les dépenses externes. Le temps interne se suit en jours, à part : il pèse sur le planning et sur le business case (module cp11).",
      "Non. La réserve paie des dépenses externes, par commande. Les salaires de la compta sont déjà payés : il n'y a rien à couvrir.",
      "Non. Presque : hors du budget, c'est juste. Mais 8 jours de compta, c'est un fait du projet : le DAF doit le voir, en jours."
    ],
    retenir: "Le temps interne ne va pas dans le budget de référence : il se suit en jours, à part."
  },
  {
    id: "cp12-q06",
    dialecte: "Gestion de projet",
    q: "Le DAF : « La mise en service de la PA est au forfait, 7 400 €. Prix fixe : rien à suivre de ce côté, non ? » Que lui réponds-tu ?",
    choix: [
      "« Si : les jalons, et le solde, payé seulement au PV »",
      "« Rien, en effet : au forfait, tout dépassement est pour la PA »",
      "« Si : ses jours chaque semaine, et son relevé, comme en régie »",
      "« Si : chaque mois, je te ferai valider son avancement »"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Au forfait, le prix ne bouge pas, sauf avenant. Tu suis les jalons : 3 700 € payés à la signature, 3 700 € au PV. Pas de PV, pas de solde.",
      "Non. Un dépassement est bien pour la PA. Mais le solde dépend du PV, et chaque ajout passe par un avenant. Sans suivi, tu paies un livrable pas encore accepté.",
      "Non. Au forfait, ses jours ne te regardent pas : c'est son risque. Tu suis ce qu'elle livre, et quand.",
      "Non. Le DAF n'a rien à valider chaque mois. Il donne le bon à payer du solde, après le PV ; d'ici là, c'est ton suivi."
    ],
    retenir: "Au forfait, le prix est fixe, mais tu suis les jalons et le PV : le solde en dépend."
  },
  {
    id: "cp12-q07",
    dialecte: "Gestion de projet",
    q: "9 février 2027. Le DAF accepte 2 changements : 7 jours d'intégrateur, 5 250 €, par 2 commandes signées. Ta référence était de 80 000 €. Que deviennent la référence et l'écart ?",
    choix: [
      "Référence 80 000 € ; écart de + 5 250 €, à montrer au COPIL",
      "Référence 85 250 €, et l'écart passe aussi à + 5 250 €",
      "Référence 85 250 €, nouvelle version datée ; l'écart ne bouge pas",
      "Rien ne change tant que les 7 jours ne sont pas facturés"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Un écart, c'est ce qui dépasse sans décision. Ici, le DAF a décidé : la référence monte. Garder 80 000 € ferait croire à une dérive.",
      "Non. Tu comptes deux fois : la référence monte de 5 250 €, l'atterrissage aussi. L'écart (atterrissage − référence) ne bouge pas.",
      "Oui. Un changement accepté par le DAF, avec ses commandes, change la référence : une version 2, datée du 9 février. Ce n'est pas un dépassement : l'écart reste le même.",
      "Non. Les 2 commandes sont signées : c'est engagé dès aujourd'hui. Le suivi n'attend pas les factures."
    ],
    retenir: "Un changement accepté par le DAF change la référence (une version datée), pas l'écart."
  },
  {
    id: "cp12-q08",
    dialecte: "Gestion de projet",
    q: "Fin mars. Référence : 85 250 €. Atterrissage des postes, réserve restante comprise : PA 39 600 €, intégrateur 37 500 €, formation et tests 4 000 €, réserve 6 400 €. Quel est l'écart ?",
    choix: [
      "− 4 150 € : sans la réserve, 81 100 € d'atterrissage",
      "+ 7 500 € : 87 500 € contre les 80 000 € du départ",
      "+ 2 250 €, à prendre tout de suite sur la réserve",
      "+ 2 250 € : 87 500 € d'atterrissage, sous les 90 k€"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Tant qu'elle n'est pas rendue, la réserve compte dans l'atterrissage. Sans elle, tu annonces une économie qui n'existe pas.",
      "Non. La référence est passée à 85 250 € avec les 2 changements de février, décidés par le DAF. Comparer à 80 000 €, c'est compter ces changements comme une dérive.",
      "Non. Presque : le bon calcul. Mais la réserve ne se prend pas toute seule : c'est une décision du DAF, par une commande.",
      "Oui. 39 600 + 37 500 + 4 000 + 6 400 = 87 500 €. Écart : 87 500 − 85 250 = + 2 250 €. Sous la tolérance de 90 k€ : tu le montres, avec sa cause."
    ],
    retenir: "Écart = atterrissage − référence à jour. L'atterrissage compte la réserve tant qu'elle n'est pas rendue."
  },
  {
    id: "cp12-q09",
    dialecte: "Gestion de projet",
    q: "COPIL d'avril. Le DAF : « À fin mars, 19 850 € facturés sur 85 250 € : il en reste 65 400, on est larges ! » Ton suivi dit autre chose. Que réponds-tu ?",
    choix: [
      "« Oui : 65 400 € pour finir, la marge est large »",
      "« Non : consommé et reste à faire disent 87 500 € à la fin »",
      "« L'atterrissage, on ne le saura qu'à la facture finale »",
      "« Non : retirez les jours faits non facturés, il reste moins »"
    ],
    bonne: 1,
    pourquoi: [
      "Non. 65 400 €, c'est ce qui reste au budget, pas ce qu'il faut pour finir. Les factures ont un mois de retard sur le travail.",
      "Oui. Atterrissage = consommé + reste à faire : 87 500 €, soit 2 250 € au-dessus de la référence, sous les 90 k€. Les factures ne disent pas la fin.",
      "Non. La facture finale arrive après la fin : trop tard pour décider. L'atterrissage se calcule chaque semaine, avec le reste à faire.",
      "Non. Presque : le consommé compte plus que le facturé. Mais « ce qui reste au budget » ne dit toujours pas ce qu'il faut pour finir : il manque le reste à faire."
    ],
    retenir: "« Ce qui reste au budget » ne dit pas la fin : l'atterrissage (consommé + reste à faire), si."
  },
  {
    id: "cp12-q10",
    dialecte: "Gestion de projet",
    q: "COPIL d'avril, chiffres à fin mars. Depuis les 2 changements de février, la référence est de 85,25 k€. Quelle ligne budget donnes-tu ? (montants en k€)",
    choix: [
      "Facturé 19,85 sur 85,25, soit 23 % · reste 65,4 · tout va bien",
      "Référence 80 · engagé 81,1 · consommé 30,35 · atterrissage 87,5 · écart + 7,5 (flux EDI sous-estimés)",
      "Référence 85,25 · engagé 81,1 · consommé 30,35 · atterrissage 87,5 · écart + 2,25 (flux EDI)",
      "Météo verte · l'intégrateur dépasse un peu · c'est sous contrôle"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Le facturé a un mois de retard sur le travail, et « ce qui reste » ne dit pas la fin. Le DAF croirait tout tenu, à tort.",
      "Non. Presque : la bonne forme, mais l'ancienne référence. Les 2 changements de février l'ont portée à 85,25 k€ : l'écart réel est de + 2,25, pas de + 7,5.",
      "Oui. Les mêmes mots chaque mois : référence, engagé, consommé, atterrissage, écart, et sa cause. Sous 90 k€ : le DAF voit l'écart et pourquoi.",
      "Non. Une météo sans chiffres ne dit ni combien, ni pourquoi. « Un peu », c'est 2 250 € que le DAF ne voit pas."
    ],
    retenir: "La ligne budget du COPIL : référence, engagé, consommé, atterrissage, écart et sa cause. Les mêmes mots, chaque mois."
  },
  {
    id: "cp12-q11",
    dialecte: "Gestion de projet",
    q: "Fin mars, l'atterrissage de DEMAT dépasse la référence de 2 250 €. Un collègue chef de projet : « Moi, je remplace la référence par l'atterrissage chaque mois. Jamais d'écart à expliquer. » Que fais-tu ?",
    choix: [
      "Tu gardes ta référence, et tu montres tout écart, avec sa cause",
      "Tu fais comme lui, et tu gardes l'ancienne référence pour toi",
      "Tu remplaces la référence, cause écrite, si le DAF signe",
      "Tu le signales au DSI : ce collègue cache chaque écart"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. La référence ne bouge que par une décision du DAF sur un changement. Un dépassement est un écart : il se montre, avec sa cause et ce qui a été décidé.",
      "Non. Plus d'écart au COPIL, plus d'alerte : la dérive devient invisible pour le DAF. L'ancienne référence gardée pour toi n'aide personne à décider.",
      "Non. Presque : rien ne change la référence sans le DAF. Mais un dépassement n'est pas un changement : même couvert par une commande, il reste un écart, que le bilan expliquera.",
      "Non. Ses projets ne sont pas les tiens : tu n'as rien à dénoncer. Toi, tu tiens ta référence, et tu montres tes écarts."
    ],
    retenir: "Un dépassement ne remplace pas la référence : c'est un écart, qui se montre avec sa cause."
  },
  {
    id: "cp12-q12",
    dialecte: "Gestion de projet",
    q: "29 décembre 2026. La compta prépare la clôture annuelle : « Du travail fait en décembre, pas encore facturé ? » L'intégrateur a fait 3 jours ; sa facture arrivera en janvier. Que réponds-tu ?",
    choix: [
      "« Rien : sans facture reçue avant janvier, rien ne compte »",
      "« Oui : toute la commande, 30 000 €, signée avant décembre »",
      "« Je ne sais pas : demandez ses jours à l'intégrateur »",
      "« Oui : 3 jours, 2 250 €, faits en décembre »"
    ],
    bonne: 3,
    pourquoi: [
      "Non. En comptabilité, une charge compte l'année où le travail est fait, facture reçue ou pas. Sans ton chiffre, 2026 paraît moins chère qu'elle n'est.",
      "Non. La commande est engagée, mais seuls 3 jours sont faits en décembre. Les 37 autres seront le travail de 2027.",
      "Non. Ton suivi a le chiffre, validé : c'est toi qui connais le consommé. L'intégrateur ne fait pas la clôture de ta compta.",
      "Oui. C'est ton consommé : du travail fait, pas encore facturé. La compta l'inscrit dans l'année où il a été fait (une « facture non parvenue »). Ton suivi lui donne le chiffre."
    ],
    retenir: "Le travail fait mais pas encore facturé compte dans l'année où il est fait : ton consommé donne le chiffre."
  },
  {
    id: "cp12-q13",
    dialecte: "Gestion de projet",
    q: "2 janvier 2027. L'intégrateur écrit ce matin : « Révision annuelle : notre taux passe à 780 € le jour. » Ta commande de 40 jours (3 faits), signée en novembre, dit 750 €, sans clause de révision. Que fais-tu ?",
    choix: [
      "Tu acceptes : 30 € de plus par jour, c'est l'usage chaque année",
      "Tu refuses, commande en main : ses jours restent à 750 €",
      "Tu acceptes, et tu recalcules l'atterrissage de la commande",
      "Tu demandes au DAF un autre intégrateur pour les jours restants"
    ],
    bonne: 1,
    pourquoi: [
      "Non. La commande signée fixe le prix de ses jours. 37 jours restent : 30 € × 37 = 1 110 € payés sans décision.",
      "Oui. Le prix de la commande vaut pour tous ses jours, jusqu'au bout. Un nouveau taux, ce sera pour une prochaine commande, ou par un avenant que le DAF signerait.",
      "Non. Presque : recalculer l'atterrissage est un bon réflexe, mais sur un prix que personne n'a accepté. La commande dit 750 €.",
      "Non. Demander une hausse n'est pas une faute : il essaie, tu réponds par le contrat. Changer d'intégrateur coûterait bien plus."
    ],
    retenir: "Le prix d'une commande signée vaut jusqu'au bout : une hausse passe par une nouvelle commande ou un avenant."
  },
  {
    id: "cp12-q14",
    dialecte: "Gestion de projet",
    q: "Facture de l'intégrateur pour février : 12 jours, tous sur la commande de base. Ton relevé validé : 8 jours de base, 4 pour le changement n° 7, qui a sa propre commande. Que fais-tu ?",
    choix: [
      "Tu signes : 12 jours faits, 12 jours facturés, le total est juste",
      "Tu signes, et tu corriges la répartition par commande dans ton suivi",
      "Tu demandes une facture par commande : 8 jours et 4 jours",
      "Tu refuses toute la facture, et tu demandes des pénalités au DAF"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Le total est juste, pas l'imputation. La commande de base paraît consommée trop vite, et le changement n° 7 paraît gratuit.",
      "Non. Presque : ton suivi serait juste, mais la compta impute ce que dit la facture. Les deux ne se rapprochent plus, et la commande de base s'épuise trop tôt en compta.",
      "Oui. Chaque jour s'impute à sa commande : 8 sur la base, 4 sur le n° 7. Une facture émise ne se modifie pas : l'intégrateur fait un avoir, puis les bonnes factures.",
      "Non. Les 12 jours sont faits et validés : ils sont dus. L'erreur est une imputation, pas une faute à punir."
    ],
    retenir: "Chaque jour facturé s'impute à sa commande : la base d'un côté, chaque changement de l'autre."
  },
  {
    id: "cp12-q15",
    dialecte: "Gestion de projet",
    q: "2 mars. La PA a livré le connecteur hier, et facture le solde de la mise en service : 3 700 €. Ta recette commence le 16. La compta veut ton service fait aujourd'hui. Que fais-tu ?",
    choix: [
      "Tu ne le signes pas : le solde attend le PV, contrat en main",
      "Tu le signes : la livraison est faite, à la date du contrat",
      "Tu signes la moitié du solde : 1 850 € maintenant, le reste au PV",
      "Tu demandes au DAF de résilier : la PA facture avant la recette"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Le service fait du solde, c'est le PV. Tu le dis à la compta et à la PA, contrat en main. La facture attend ; elle sera payée après le PV.",
      "Non. Livré n'est pas accepté. Le contrat lie le solde au PV de recette : payé aujourd'hui, tu perds ton levier si la recette trouve une anomalie bloquante.",
      "Non. Tu gardes une part pour le PV, mais le contrat ne coupe pas le solde : tu paierais la moitié d'un livrable que personne n'a testé.",
      "Non. Une facture trop tôt est une erreur courante, pas une faute grave. Un mail, contrat en main, suffit."
    ],
    retenir: "Au forfait, le solde suit le PV de recette, pas la livraison : pas de PV, pas de service fait."
  },
  {
    id: "cp12-q16",
    dialecte: "Gestion de projet",
    q: "30 avril. Le PV du connecteur est signé, avec 2 réserves mineures, datées. La PA facture le solde de la mise en service. Le contrat lie le solde au PV. Que fais-tu ?",
    choix: [
      "Tu bloques le solde jusqu'à la levée des 2 réserves du PV",
      "Tu fais payer la moitié du solde, et garder l'autre jusqu'à la levée",
      "Tu demandes au DAF s'il accepte de payer ce service avec des réserves",
      "Tu signes le service fait, et tu suis les 2 réserves à leurs dates"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Presque : bloquer protège, mais le contrat ne le prévoit pas. Le solde suit le PV, et ce PV est signé : retenir le paiement irait contre le contrat.",
      "Non. Le contrat ne coupe pas le solde. Une retenue jusqu'à la levée des réserves se négocie avant de signer, pas après.",
      "Non. Le DAF a signé le contrat : le solde au PV. Tu signes le service fait ; il donne le bon à payer, comme d'habitude.",
      "Oui. Un PV avec réserves est un PV : le livrable est accepté, le solde est dû, comme le contrat le dit. Les réserves se suivent à leurs dates, à part."
    ],
    retenir: "Un PV avec réserves vaut acceptation : le solde lié au PV est dû. Les réserves se suivent à part."
  },
  {
    id: "cp12-q17",
    dialecte: "Gestion de projet",
    q: "Connecteur pas livré au 15 mars : le plan B, le portail de la PA, tourne depuis le 16. La PA facture le solde de la mise en service : « Vos factures passent. » Que fais-tu ?",
    choix: [
      "Tu signes : le portail marche, les factures passent",
      "Tu ne signes pas : le solde suit le PV du connecteur",
      "Tu signes le solde, et le DAF comptera les pénalités",
      "Tu refuses, et le DAF suspend l'abonnement jusqu'au connecteur"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Le portail est le plan B, déjà prévu au contrat. La mise en service, c'est le connecteur : pas livré, pas de PV, pas de solde.",
      "Oui. Le solde paie le connecteur accepté, au PV. Le portail, déjà prévu au contrat, ne remplace pas la livraison. Tu le dis à la PA et à la compta, contrat en main.",
      "Non. Presque : les pénalités de retard comptent bien, et le DAF décide de les appliquer. Mais tu paierais d'abord un livrable que tu n'as pas.",
      "Non. L'abonnement paie un service qui marche : la réception, le portail. Le suspendre, c'est risquer ta facture électronique, obligatoire."
    ],
    retenir: "Le solde au forfait paie le livrable accepté (le PV), pas une solution de secours."
  },
  {
    id: "cp12-q18",
    dialecte: "Gestion de projet",
    q: "Facture de la PA pour mai : abonnement 850 €, archivage 50 €, et « frais d'activation de l'archivage : 300 € ». L'avenant signé en mars ne prévoit que 50 € par mois. Que fais-tu ?",
    choix: [
      "Tu signes le tout : 300 € ne valent pas une dispute sur l'avenant",
      "Service fait pour 900 € ; les 300 €, tu les noteras au bilan",
      "Service fait pour 900 € ; les 300 €, signalés à la compta, avenant en main",
      "Tu signales les 300 € au DAF, et tu suspends l'abonnement"
    ],
    bonne: 2,
    pourquoi: [
      "Non. 300 € non prévus, payés sans rien dire : un petit dépassement absorbé. Et la PA recommencera.",
      "Non. Presque : le service fait est juste. Mais noter les 300 € pour plus tard, c'est les payer : la facture part telle quelle.",
      "Oui. Ton rôle : le service fait, 850 € et 50 €, comme le contrat et l'avenant. Les 300 € ne sont écrits nulle part : la compta les conteste, avenant en main, et la PA fait un avoir.",
      "Non. La ligne est fausse, pas le service : l'abonnement est dû. Le DAF n'a rien à trancher : la compta conteste la ligne, avenant en main."
    ],
    retenir: "Une ligne que ni le contrat ni l'avenant ne prévoit ne se paie pas : la compta la conteste, la PA fait un avoir."
  },
  {
    id: "cp12-q19",
    dialecte: "Gestion de projet",
    q: "Le DAF a décidé d'appliquer un crédit de 85 € pour l'écart au SLA de mai. Ce matin, la facture de juin de la PA arrive : 900 €, sans ce crédit. Que fais-tu ?",
    choix: [
      "Tu signes le service de juin, et tu fais réclamer l'avoir de 85 €",
      "Tu signes juin : le crédit viendra sur une prochaine facture",
      "Tu retires toi-même 85 € de la facture, avant de la signer",
      "Tu bloques la facture, et tu redemandes au DAF sa décision"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Le service de juin est rendu : tu le signes. Le crédit décidé par le DAF se réclame à part, décision en main : la PA fait un avoir, que la compta suit.",
      "Non. Un crédit que personne ne réclame se perd. Il n'est écrit nulle part dans tes suivis : il sera oublié.",
      "Non. Presque : la somme à payer baisse bien de 85 €. Mais une facture émise ne se modifie pas : c'est la PA qui fait un avoir.",
      "Non. Le DAF a déjà décidé. Bloquer 900 € dus pour 85 €, c'est créer un litige de plus, sans rien gagner."
    ],
    retenir: "Un crédit décidé par le DAF se réclame par un avoir ; le service fait, lui, reste dû."
  },
  {
    id: "cp12-q20",
    dialecte: "Gestion de projet",
    q: "Fin février. Commande de base : 13 jours consommés, pour 14 prévus. Mais sur 4 flux EDI, 1 seul est fini ; le plan en prévoyait 3. Le consultant : « Je suis dans les jours. » Que fais-tu d'abord ?",
    choix: [
      "Rien : 13 jours sur 14 prévus, le budget est tenu",
      "Tu alertes le DAF dès aujourd'hui : l'atterrissage va dériver",
      "Tu lui demandes de finir les 2 flux en retard d'ici vendredi",
      "Tu refais le reste à faire tâche par tâche, flux par flux"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Le consommé suit le plan, pas le travail : 1 flux fini sur 3 prévus. Le reste à faire a sûrement grossi.",
      "Non. Presque : il y a un signal, mais pas encore de chiffre. Sans reste à faire, tu alertes sur une impression : ni atterrissage chiffré, ni options.",
      "Non. Une date sans estimation : il coupera dans ses tests, ou ratera vendredi. D'abord, savoir ce qui reste vraiment.",
      "Oui. Le signal : le travail avance moins vite que les jours. Le reste à faire, flux par flux, donne l'atterrissage. S'il dépasse la commande, le DAF le sait le jour même, options en main."
    ],
    retenir: "Le consommé dans le plan ne suffit pas : si le travail fait est en retard, refais le reste à faire."
  },
  {
    id: "cp12-q21",
    dialecte: "Gestion de projet",
    q: "Fin mars. Commande de base : 24 jours faits, 19 à faire. Ton projet de mail au DAF : « L'intégrateur dépassera de 3 jours. Peux-tu signer une commande de 3 jours ? » Que manque-t-il ?",
    choix: [
      "Rien : le dépassement et la demande, c'est ce qu'il lui faut",
      "Le reste à faire, tâche par tâche, et le détail des 24 jours faits",
      "La cause, l'atterrissage, d'autres options chiffrées",
      "L'avis du DG sur la cause, pour appuyer ta demande"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Une seule option, c'est une décision prise à sa place. Sans la cause, il ne sait pas si ça recommencera.",
      "Non. Presque : des faits, oui, mais le DAF ne décide pas avec 40 lignes de tâches. Le détail reste dans ton suivi ; il le voit s'il le demande.",
      "Oui. La cause (les flux EDI), l'atterrissage (87 500 €, sous 90 k€), et des options : retirer 2 états, une commande de 3 jours, ou ces états en juillet. Ta recommandation, puis il tranche.",
      "Non. Le budget est au DAF, ton sponsor : passer par le DG, c'est passer au-dessus de lui. Sous 90 k€, c'est sa décision."
    ],
    retenir: "Une alerte budget : la cause, l'atterrissage, 2 ou 3 options chiffrées et ta recommandation. Le DAF tranche."
  },
  {
    id: "cp12-q22",
    dialecte: "Gestion de projet",
    q: "Fin mars. Le consultant : « Pour tenir les 40 jours, je peux supprimer mes tests de non-régression : 3 jours de gagnés. » Que fais-tu ?",
    choix: [
      "Tu acceptes : 40 jours tenus, et le DAF n'a rien à signer",
      "Non : l'écart au DAF aujourd'hui, avec ses vraies options",
      "Option du milieu : 1 jour et demi de tests en moins",
      "Non, et tu demandes à son responsable un autre consultant"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Le budget est tenu, la qualité paie en silence : les régressions sortiront au pilote, sur de vraies factures. Et le DAF n'a rien choisi.",
      "Oui. Couper les tests pour tenir le budget, c'est cacher l'écart. Tu le montres, avec des options (réduire un autre contenu, une commande de plus, décaler). Moins de tests ? Seulement si le DAF le choisit, risque connu.",
      "Non. Moitié moins de tests, c'est plus de risque, toujours sans décision. Un compromis n'est pas une option chiffrée.",
      "Non. Il propose une économie, maladroite : ce n'est pas une faute. Changer de consultant en pleine recette coûte bien plus que 3 jours."
    ],
    retenir: "Ne coupe pas la recette pour tenir le budget : montre l'écart ; le DAF choisit."
  },
  {
    id: "cp12-q23",
    dialecte: "Gestion de projet",
    q: "Le connecteur de la PA arrive le 29 mars, au lieu du 1er. En mars, l'intégrateur n'a fait que 4 jours, pour 10 prévus. Le DAF : « 6 jours d'économie, bravo ! » Que lui réponds-tu ?",
    choix: [
      "« Merci : 6 jours, soit 4 500 € de moins à l'atterrissage »",
      "« Non : on les gardera, et on les rendra en juillet s'ils ne servent pas »",
      "« Non : je demande les pénalités de retard pour payer ces jours »",
      "« Non : ces jours sont décalés, pas économisés. L'atterrissage tient »"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Le travail n'a pas disparu : le paramétrage du connecteur reste à faire, en avril. Le reste à faire n'a pas baissé.",
      "Non. Ce qui ne sert pas se rend bien à la fin. Mais ces 6 jours serviront : le travail est seulement repoussé.",
      "Non. Les pénalités, le DAF décide de les appliquer, et elles ne changent pas les jours à faire. Ici, rien n'est économisé : le travail est décalé.",
      "Oui. Consommé plus bas, reste à faire inchangé : l'atterrissage ne bouge pas. Ce sont des jours décalés, avec un planning plus serré en avril."
    ],
    retenir: "Moins de jours consommés n'est pas une économie : seul un reste à faire qui baisse en est une."
  },
  {
    id: "cp12-q24",
    dialecte: "Gestion de projet",
    q: "Juin. La 3e session de formation de la compta coûtera 300 € de plus : 2 personnes en plus. La ligne formation et tests est de 4 000 €. Que fais-tu ?",
    choix: [
      "Tu dis tout : 300 € d'écart, la cause, une commande signée du DAF",
      "Tu retires les supports papier pour compenser, sans en parler",
      "Tu notes la cause pour le bilan de juillet : 300 €, c'est petit",
      "Tu alertes le DAF le jour même, et tu réunis le COPIL"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Petit ou pas, un écart se dit, avec sa cause. 300 € de plus, c'est une commande, signée par le DAF avant. Et la ligne budget du COPIL le montre.",
      "Non. Un petit dépassement absorbé en silence : la ligne paraît tenue, la formation est moins bonne, et personne n'a choisi.",
      "Non. Presque : le dire, oui, mais au bilan, c'est trop tard : la dépense est faite sans commande. Et dix petits écarts cachés en font un gros.",
      "Non. 300 €, loin des 90 k€ : rien d'urgent, pas de COPIL spécial. Une commande à signer et la ligne budget suffisent."
    ],
    retenir: "Un petit écart se dit aussi, avec sa cause : absorbé en silence, il s'ajoute aux autres."
  },
  {
    id: "cp12-q25",
    dialecte: "Gestion de projet",
    q: "Mai, pilote. Ce matin, les rejets EDI demandent des jours d'intégrateur en plus. Même avec toute la réserve, l'atterrissage dépasse 90 k€. Le COPIL est dans 2 semaines. Que fais-tu ?",
    choix: [
      "Tu présentes l'atterrissage au COPIL, avec des options chiffrées",
      "Tu fais faire les jours : sans eux, le pilote échoue",
      "Le DAF le jour même : la cause, l'atterrissage, les options",
      "Le DG le jour même : au-delà de 90 k€, ce n'est plus le DAF"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Presque : le bon contenu, pas le bon moment. Hors tolérance, 2 semaines d'attente, et les jours seront déjà faits.",
      "Non. Aucun jour sans commande signée par le DAF. Et au-delà de 90 k€, c'est à lui de décider, pas au pilote.",
      "Oui. Hors tolérance, la décision n'est plus à toi : le DAF la prend, prévenu le jour même. Les faits, la cause, 2 ou 3 options chiffrées (réduire, rallonge, décaler).",
      "Non. Le budget est au DAF, ton sponsor : le DG vient seulement si le DAF ne répond pas, et si l'enjeu est fort."
    ],
    retenir: "Atterrissage au-delà de 90 k€ : hors tolérance, le DAF décide, prévenu le jour même."
  },
  {
    id: "cp12-q26",
    dialecte: "Gestion de projet",
    q: "Début avril. Le DAF a signé la commande de 3 jours qui couvre le dépassement de l'intégrateur. Atterrissage : 87 500 €, sous 90 k€. COPIL le 14 avril. Que fais-tu de cet écart ?",
    choix: [
      "Rien de plus : le DAF a signé, le sujet est clos",
      "Rien d'urgent : au COPIL du 14, avec sa cause",
      "Un mail au DAF ce soir, sans attendre le COPIL du 14",
      "Tu le retires de la ligne budget : la commande le couvre"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Presque : rien à décider, c'est vrai. Mais le COPIL doit voir l'écart et sa cause : sinon, le projet paraît tenu à 85 250 €.",
      "Oui. Décidé, signé, sous la tolérance : rien d'urgent. Le COPIL le voit dans la ligne budget, avec sa cause et la décision prise.",
      "Non. Il a déjà décidé : le relancer ce soir lui prend du temps pour rien. Le COPIL suffit.",
      "Non. Une commande signée ne fait pas disparaître l'écart : elle dit comment il est payé. L'atterrissage reste au-dessus de la référence."
    ],
    retenir: "Un écart décidé et sous la tolérance n'appelle pas d'alerte : il se montre au COPIL, avec sa cause."
  },
  {
    id: "cp12-q27",
    dialecte: "Gestion de projet",
    q: "Mars. L'archivage manquant était au registre des risques. Le DAF signe l'avenant : 50 € par mois, d'avril 2027 à novembre 2029, « pris sur la réserve » de 8 000 €. Que fais-tu ?",
    choix: [
      "Tu refuses : la réserve est pour les risques, pas pour un avenant",
      "Tu acceptes : 1 600 € engagés dès aujourd'hui ; reste 6 400 €",
      "D'accord : 50 € pris sur la réserve ; le reste, chaque mois",
      "Tu lui proposes d'abord le COPIL : la réserve est à tout le projet"
    ],
    bonne: 1,
    pourquoi: [
      "Non. La réserve se dépense justement par une commande ou un avenant signé du DAF. Le risque de l'archivage est au registre : c'est son usage.",
      "Oui. 32 mois × 50 € = 1 600 €, engagés dès la signature. La réserve passe de 8 000 € à 6 400 €. Tu notes l'usage : date, risque, décision du DAF.",
      "Non. Presque : la bonne ligne. Mais l'avenant engage 32 mois d'un coup : 1 600 €. Sinon, la réserve paraît plus grosse qu'elle n'est.",
      "Non. Le DAF, sponsor, décide de la réserve. Repasser par le COPIL, c'est ralentir une décision déjà prise par la bonne personne."
    ],
    retenir: "La réserve se dépense sur décision du DAF, par commande ou avenant : l'engagé compte tout l'avenant, dès sa signature."
  },
  {
    id: "cp12-q28",
    dialecte: "Gestion de projet",
    q: "Avril. Recette en retard de 2 semaines : un risque du registre. Le DAF envisage un intérimaire, environ 4 000 € : « On le paie avec quoi ? » Réserve : 8 000 €, dont 1 600 € pris pour l'archivage. Que réponds-tu ?",
    choix: [
      "« La réserve, si tu signes la commande : il restera 4 000 € »",
      "« La ligne formation et tests : elle a encore de la marge »",
      "« Rien : un intérimaire, c'est du temps interne, hors budget »",
      "« La réserve, si tu signes la commande : il restera 2 400 € »"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Presque : la bonne ligne, le bon circuit. Mais tu oublies les 1 600 € de l'archivage : il ne resterait que 2 400 €.",
      "Non. Chaque ligne paie ce pour quoi elle est faite. Puiser ailleurs cache le risque, et la formation manquera d'argent en juin.",
      "Non. Le temps de la compta est interne ; un intérimaire, c'est une agence qui facture : une dépense externe, dans le budget.",
      "Oui. Un risque du registre arrive : c'est l'usage de la réserve. 8 000 − 1 600 − 4 000 = 2 400 € pour les risques encore ouverts. Il décide, et signe la commande."
    ],
    retenir: "La réserve paie les risques du registre qui arrivent, sur décision du DAF, par une commande : dis-lui ce qu'il en restera."
  },
  {
    id: "cp12-q29",
    dialecte: "Gestion de projet",
    q: "Fin mars. L'intégrateur dépassera de 3 jours : les flux EDI ont été sous-estimés. Ce n'était pas au registre des risques. Le commercial : « Prends-les sur la réserve, personne ne verra rien. » Que fais-tu ?",
    choix: [
      "L'écart au DAF, options chiffrées, réserve comprise : il choisit",
      "Tu les prends sur la réserve : elle est faite pour l'imprévu",
      "Tu les prends sur la réserve, et tu le dis au COPIL du mois",
      "Non : la réserve ne se touche pas avant la fin du projet"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Pas un risque du registre : un écart, qui se montre. Le DAF choisit entre réduire, rallonger, décaler, ou payer sur la réserve en le sachant. Il signe la commande.",
      "Non. La réserve n'est pas une caisse libre : chaque usage est une décision du DAF, par une commande. Prise en silence, elle cache l'écart.",
      "Non. Presque : tu le dis, mais après avoir décidé à sa place. La réserve se dépense sur décision du DAF, avant.",
      "Non. Trop rigide : la réserve sert quand un risque du registre arrive, à toute date. Et le DAF peut aussi choisir de l'utiliser ici."
    ],
    retenir: "La réserve n'est pas un budget libre : chaque usage est une décision du DAF, jamais une façon de cacher un écart."
  },
  {
    id: "cp12-q30",
    dialecte: "Gestion de projet",
    q: "Juin, après la bascule. Il reste 6 400 € de réserve. Le responsable ADV, ce matin : « Il reste de l'argent : finançons un atelier Divalto pour mon équipe, 2 000 €. » Que réponds-tu ?",
    choix: [
      "« D'accord : 2 000 €, il restera 4 400 € pour la fin »",
      "« Oui pour l'atelier, si le DAF signe la commande avant juillet »",
      "« Non : on garde la réserve, et on la dépensera en juillet »",
      "« Non : la réserve n'est pas à dépenser ; demande-le au DAF »"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Tu dépenses la réserve sans décision du DAF, pour un besoin qui n'est pas un risque. Ce qui n'est pas dépensé n'est pas « à dépenser ».",
      "Non. Le DAF décide, c'est juste. Mais « il reste de l'argent » n'est pas une raison. Son atelier se juge comme une demande, sur sa valeur.",
      "Non. La réserve ne se dépense pas pour se vider. En juillet, ce qui n'a pas servi est rendu, et le bilan le dit.",
      "Oui. La réserve couvre les risques du registre ; ce qui reste sera rendu. Un atelier, c'est un besoin nouveau : une demande au DAF, jugée sur sa valeur, pas parce qu'il reste de l'argent."
    ],
    retenir: "Ce qui reste de la réserve n'est pas « à dépenser » : c'est rendu. Un besoin nouveau se juge sur sa valeur."
  },
  {
    id: "cp12-q31",
    dialecte: "Gestion de projet",
    q: "Juillet 2027 : DEMAT se clôture. L'abonnement de la PA, 850 € par mois, court de décembre 2026 à novembre 2029. 8 mensualités sont passées. Que dit le bilan pour l'abonnement ?",
    choix: [
      "6 800 € au projet ; 23 800 € engagés, que le run reprend",
      "6 800 € au projet ; le reste ne regarde plus personne ici",
      "30 600 € au projet, tout compris jusqu'en 2029 : c'est soldé",
      "6 800 € au projet ; 23 800 € à rendre, comme une réserve"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. 8 × 850 = 6 800 € pendant le projet. Les 28 mensualités restantes, 23 800 €, sont engagées par le contrat : le budget du run les reprend (module cp22). Le bilan le dit.",
      "Non. Le projet s'arrête, pas le contrat. Si le bilan ne le dit pas, 23 800 € arrivent dans un budget qui ne les attend pas.",
      "Non. Rien n'est soldé : 28 mensualités restent à payer, chaque mois, jusqu'en 2029. Le budget de référence les comptait ; le run doit les reprendre.",
      "Non. Ce n'est pas de l'argent libre : le contrat engage ces 28 mois. On ne « rend » que ce qui n'est pas engagé."
    ],
    retenir: "À la clôture, l'abonnement continue : ses mensualités restantes, engagées, passent au budget du run."
  },
  {
    id: "cp12-q32",
    dialecte: "Gestion de projet",
    q: "Juillet, clôture. Commande de base et rallonge : 43 jours. 42 sont faits ; plus rien à faire. Le consultant veut ta réponse aujourd'hui : « Il reste 1 jour : un petit état en plus ? »",
    choix: [
      "« Oui : ce jour est payé d'avance, rien ne se perd »",
      "« Oui, si la cheffe comptable en a vraiment besoin »",
      "« Non : ce jour n'est pas perdu, il servira aux corrections d'après »",
      "« Non : rien n'est dû pour ce jour ; il sort de l'engagé »"
    ],
    bonne: 3,
    pourquoi: [
      "Non. En régie, rien n'est payé d'avance : tu paies les jours faits. Le dépenser pour un état non demandé, c'est la dérive.",
      "Non. Un besoin réel se juge, mais pas parce qu'un jour reste. Un nouvel état passe par une demande, sur sa valeur.",
      "Non. Après la clôture, les corrections passent au run et à son budget (module cp22). Garder un jour ouvert, c'est une petite réserve cachée.",
      "Oui. La commande est un plafond : le jour non fait n'est pas dû. Il sort de l'engagé, et le bilan le dit : 42 jours sur 43."
    ],
    retenir: "En fin de régie, les jours non faits ne sont pas « à faire » : ils sortent de l'engagé."
  },
  {
    id: "cp12-q33",
    dialecte: "Gestion de projet",
    q: "Ton projet Snowflake + Power BI. Budget de calcul de l'année : 12 000 €, soit 1 000 € par mois. Janvier : 1 100 €. Février : 1 300 €. Mars : 1 600 €. Que fais-tu ?",
    choix: [
      "Rien avant l'été : le budget est annuel, il reste 8 000 €",
      "Ton atterrissage au sponsor, et 6 000 € de plus pour l'année",
      "La cause de la hausse, puis l'atterrissage au sponsor",
      "Sans attendre la cause : tous les warehouses réduits, rafraîchissements coupés"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Au rythme de mars, 9 mois coûteraient 14 400 € : l'atterrissage est déjà à 18 400 €. Plus tu attends, moins il reste d'options.",
      "Non. Presque : prévenir le sponsor, oui. Mais une rallonge sans cause ne règle rien : la hausse continue, et 6 000 € ne suffiraient pas.",
      "Oui. À l'usage, tu suis chaque mois. D'abord la cause (un warehouse qui ne se met pas en veille, un rafraîchissement trop fréquent). Puis l'atterrissage, et des options chiffrées pour le sponsor.",
      "Non. Tu agis avant de comprendre : des rapports lents ou vides, et la cause est peut-être ailleurs."
    ],
    retenir: "Un coût à l'usage se suit chaque mois : la cause d'abord, puis l'atterrissage et les options."
  },
  {
    id: "cp12-q34",
    dialecte: "Gestion de projet",
    q: "Tu es DSI adjoint. Avril : la facture Snowflake dépasse le mois prévu de 40 %. Ton équipe a trouvé la cause : un warehouse de test jamais mis en veille, allumé jour et nuit. Que fais-tu ?",
    choix: [
      "La veille réglée, une alerte de crédits, l'atterrissage revu",
      "La veille réglée ; l'écart d'avril est passé, rien de plus",
      "L'atterrissage revu, et une rallonge pour l'année au contrôleur",
      "Plus de warehouse de test : on testera en production"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Tu corriges la cause (la mise en veille automatique), tu poses une alerte (un resource monitor : un plafond de crédits qui prévient, voire suspend), et tu revois l'atterrissage de l'année avec le contrôleur de gestion.",
      "Non. Presque : la cause est corrigée. Mais sans alerte, le prochain oubli se verra encore sur une facture, un mois trop tard. Et l'atterrissage de l'année a bougé.",
      "Non. Revoir l'atterrissage, oui ; payer l'oubli, non. La cause est trouvée et se corrige : une rallonge paierait cet oubli, chaque mois.",
      "Non. Tu échanges un coût contre un risque bien pire : des tests en production, sur les vraies données."
    ],
    retenir: "Une dérive à l'usage : corriger la cause, poser une alerte de crédits, revoir l'atterrissage."
  },
  {
    id: "cp12-q35",
    dialecte: "Gestion de projet",
    q: "Tu es DSI adjoint. Revue mensuelle avec le contrôleur de gestion. Projet A : 90 % engagé, 30 % facturé, atterrissage égal à la référence. Projet B : 40 % facturé, atterrissage à + 15 %. Lequel regardes-tu de près ?",
    choix: [
      "A : 90 % engagé pour 30 % facturé, la cause est à chercher",
      "B seul : son atterrissage dépasse sa référence de 15 %",
      "Les deux : A pour son engagé, B pour son atterrissage",
      "Aucun : peu facturé, et sous la référence pour l'instant"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Beaucoup d'engagé tôt, c'est normal : les contrats se signent au début. Son atterrissage tient : rien à creuser.",
      "Oui. L'écart se lit sur l'atterrissage, pas sur l'engagé ni le facturé. B finira 15 % au-dessus : tu vois avec son chef de projet la cause et les options.",
      "Non. Presque : B, oui. Mais A n'a pas d'écart : un engagé élevé tôt est normal. Tu perds du temps sur un projet qui tient.",
      "Non. Le facturé ne dit pas la fin. B finira 15 % au-dessus de sa référence, même si peu est facturé."
    ],
    retenir: "Plusieurs projets : tu creuses ceux dont l'atterrissage dépasse la référence, pas ceux qui ont beaucoup engagé."
  },
  {
    id: "cp12-q36",
    dialecte: "Gestion de projet",
    q: "Tu es DSI adjoint. Un de tes chefs de projet présente son budget : « Mi-projet, 45 % facturé : on est pile dans le plan. » Que lui demandes-tu ?",
    choix: [
      "Rien : à mi-projet, 45 % facturé, c'est même un peu en dessous",
      "Toutes ses factures, que tu vérifies seul, une par une",
      "Son reste à faire en euros : le budget moins le facturé",
      "Son consommé et son reste à faire, poste par poste"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Les factures ont un mois de retard sur le travail. 45 % facturé peut cacher 60 % consommé, et un reste à faire qui ne baisse pas.",
      "Non. Tu fais son travail, et tu regardes encore le passé : les factures ne disent ni le consommé, ni le reste à faire.",
      "Non. Presque : le bon mot, le mauvais calcul. Le budget moins le facturé, c'est « ce qui reste au budget », pas le travail qui reste.",
      "Oui. Le facturé ne dit pas la fin. Consommé + reste à faire, poste par poste : l'atterrissage, où se voit l'écart."
    ],
    retenir: "Un budget se pilote sur l'atterrissage (consommé + reste à faire), pas sur le facturé."
  },
  {
    id: "cp12-q37",
    dialecte: "Gestion de projet",
    q: "Tu es DSI adjoint. Le contrôleur de gestion : « Power BI : 42 600 € consommés au suivi, 33 600 € facturés en compta. Qui se trompe ? » En mars, le prestataire en régie a fait 12 jours à 750 €. Que réponds-tu ?",
    choix: [
      "« Personne : les 12 jours de mars sont faits, pas encore facturés »",
      "« La compta : elle a dû perdre la facture de mars »",
      "« Le suivi : je le fais caler sur la compta, qui fait foi »",
      "« On le saura en juillet, quand tous les jours seront facturés »"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. 12 × 750 = 9 000 € : l'écart exact. Consommé et facturé n'ont pas le même rythme : la facture de mars arrive en avril. Vous rapprochez les deux, ligne par ligne, chaque mois.",
      "Non. Tu accuses sans vérifier. L'écart a une cause simple : du travail fait, pas encore facturé.",
      "Non. Presque : la compta fait foi pour le facturé et le payé. Mais le suivi dit le travail fait : le caler sur les factures, c'est voir avec un mois de retard.",
      "Non. Un écart non expliqué se cherche tout de suite, pas à la fin. Ici, il s'explique en une ligne."
    ],
    retenir: "Consommé et facturé ne disent pas la même chose : le suivi et la compta se rapprochent chaque mois, ligne par ligne."
  },
  {
    id: "cp12-q38",
    dialecte: "Gestion de projet",
    q: "Tu es DSI adjoint. Mi-décembre. Un chef de projet : « Il me reste 9 000 € sur l'année. Je commande 12 jours d'intégrateur maintenant, pour les travaux de mars. Sinon, ils sont perdus. » Que fais-tu ?",
    choix: [
      "Tu acceptes : 12 jours commandés, l'argent n'est pas perdu",
      "Tu acceptes la moitié : 6 jours, pour une partie des travaux de mars",
      "Non : les travaux de mars vont au budget de l'an prochain",
      "Non, et tu signales ce chef de projet au DG"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Tu engages cette année un travail de l'an prochain, pour vider un budget. Ce qui n'est pas dépensé n'est pas « à dépenser » : c'est une économie.",
      "Non. Moins de risque, mais la même erreur, en plus petit. Le compromis ne rend pas la dépense utile maintenant.",
      "Oui. Un besoin de mars se budgète dans le budget de l'an prochain (module cp27). Les 9 000 € non dépensés sont une économie : le contrôleur de gestion la note.",
      "Non. C'est une erreur courante, pas une faute : tu lui expliques la règle. Monter au DG pour ça, c'est hors de proportion."
    ],
    retenir: "Un budget non dépensé n'est pas « à dépenser » en décembre : les besoins suivants vont dans le budget suivant."
  },
  {
    id: "cp12-q39",
    dialecte: "Gestion de projet",
    q: "Tu es DSI adjoint. Un projet est fini à 90 %. Réserve : 10 000 €, intacte. Un seul risque reste ouvert, chiffré à 1 500 €. Le contrôleur de gestion veut en rendre une part. Ton conseil au sponsor ?",
    choix: [
      "Tout garder : la réserve se garde entière jusqu'à la clôture",
      "D'accord : 8 500 € rendus, 1 500 € gardés pour le dernier risque",
      "D'accord : les 10 000 €, le dernier risque est petit",
      "Rien rendre : la dépenser en améliorations avant la fin"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Garder jusqu'au bout rassure. Mais 8 500 € ne couvrent plus aucun risque : bloqués pour rien, quand un autre projet en a besoin.",
      "Oui. La réserve suit le registre : quand les risques se ferment, elle n'a plus d'objet. Tu gardes de quoi couvrir le risque ouvert ; le reste est rendu, et sert ailleurs.",
      "Non. Un risque est encore ouvert : s'il arrive, rien ne le paie. Tu gardes sa part.",
      "Non. Ce qui n'est pas dépensé n'est pas « à dépenser ». Des améliorations se décident sur leur valeur, pas parce qu'il reste de l'argent."
    ],
    retenir: "La réserve suit le registre : quand les risques se ferment, on rend ce qui ne couvre plus rien."
  }
];
