// Chef de projet SI — Questions du module cp07 « Gérer les risques ».
// Mises en situation. Fil rouge DEMAT 2027 : négociant en équipement de piscines, 120 salariés, ERP Divalto,
// passage à la facture électronique via une plateforme agréée (PA). DAF = sponsor ET manager de la cheffe comptable.
// Personnages : Julie (comptable fournisseurs), Sophie (comptable clients), Marc (ADV), intégrateur Divalto, chef de projet de la PA,
// responsable ADV, commercial pressé. Fiche fil rouge (fait foi) : docs/plan-chef-de-projet.md.
// Calendrier : connecteur livré au 1er mars 2027 (contrat), déclencheur du plan B « pas livré au 15 mars »,
// recette du 16 mars à fin avril (1 semaine de marge de recette), bascule en juin. « Escalader » ici = sens PMBOK (q16).
// Équilibre voulu : environ 1/3 « agir fort ou tout de suite », 1/3 « piège de surréaction », 1/3 technique.
// Anti-devinette : les questions « agir fort » ont un choix faux TROP fort ; les pièges, un choix faux TROP passif.
// Mots d'urgence et date légale présents aussi dans des choix faux et des énoncés piège (q23, q25, q35).
LEARNSQL.questions.cp07 = [
  {
    id: "cp07-q01",
    dialecte: "Gestion de projet",
    q: "Le chef de projet de la plateforme agréée (PA) te dit : « Le connecteur Divalto aura peut-être 3 semaines de retard. » La livraison est prévue dans 2 mois. C'est quoi ?",
    choix: [
      "Un risque : le retard n'est pas encore arrivé",
      "Un problème : la PA l'a déjà annoncé",
      "Une hypothèse : on suppose la date tenue",
      "Une contrainte : la date ne dépend pas de toi"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Le retard est possible, pas encore réel. Tu l'écris au registre avec une note et une action, pendant qu'agir coûte peu.",
      "Non. Une annonce de « peut-être » ne rend pas le retard réel. Le traiter en problème, c'est lancer le plan B trop tôt et payer pour rien.",
      "Non. L'hypothèse, c'est « le connecteur arrive à l'heure ». La PA la met en doute, et on ne peut pas la vérifier avant la date : elle devient un risque à suivre.",
      "Non. La contrainte est imposée (la date légale). Le retard possible de la PA est un risque : il se réduit et se surveille."
    ],
    retenir: "Un risque n'est pas encore arrivé ; un problème, si."
  },
  {
    id: "cp07-q02",
    dialecte: "Gestion de projet",
    q: "Le connecteur Divalto devait être livré le 1er mars. On est le 18 mars, rien n'est livré, et la PA ne donne pas de nouvelle date. C'est quoi, et que fais-tu ?",
    choix: [
      "Un risque : tu relèves sa probabilité à 3",
      "Un problème : tu le traites dès maintenant",
      "Un risque : tu en parles au COPIL du mois",
      "Une hypothèse fausse : tu corriges le cadrage"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Le retard est réel : changer une note ne sert plus à rien. Pendant ce temps, la marge avant la bascule fond.",
      "Oui. La date est passée : ce n'est plus incertain. Plan B s'il existe, nouvelle date exigée, impact chiffré pour le DAF.",
      "Non. Attendre le COPIL mensuel pour un fait déjà arrivé, c'est perdre jusqu'à 4 semaines de marge sans rien faire.",
      "Non. Corriger la note de cadrage ne règle rien : le connecteur manque toujours, et la bascule s'approche."
    ],
    retenir: "Quand le risque arrive, on arrête de l'évaluer : on le traite."
  },
  {
    id: "cp07-q03",
    dialecte: "Gestion de projet",
    q: "Ta note de cadrage dit : « Divalto 10.13 accepte le format de facture de la PA sans développement. » Personne ne l'a vérifié. Que fais-tu ?",
    choix: [
      "Tu la laisses : elle est validée dans la note",
      "Tu la notes en risque et tu la testes en recette",
      "Tu la fais vérifier cette semaine par l'intégrateur",
      "Tu demandes au COPIL de choisir une autre PA"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Validée ne veut pas dire vraie. Si elle est fausse, tu le découvres en recette, avec un développement imprévu.",
      "Non. La noter ne la vérifie pas, et la recette, c'est tard : un développement imprévu. Une question à l'intégrateur lève le doute en quelques jours.",
      "Oui. Une hypothèse douteuse se vérifie vite. Impossible à confirmer ? Tu l'écris en risque. Fausse ? C'est un fait : tu chiffres le développement et tu replanifies.",
      "Non. Tu changes de plateforme sur un doute jamais vérifié : coût, délai, et peut-être le même souci ailleurs."
    ],
    retenir: "Une hypothèse douteuse se vérifie d'abord ; si le doute reste, elle devient un risque ; si elle est fausse, c'est un fait à traiter."
  },
  {
    id: "cp07-q04",
    dialecte: "Gestion de projet",
    q: "Tu écris une ligne du registre des risques DEMAT 2027. Laquelle est la mieux écrite ?",
    choix: [
      "Si le projet DEMAT 2027 prend du retard : date légale ratée",
      "Si la cheffe, seule à savoir, est absente en recette : cas non testés",
      "Problème : la cheffe comptable part en congé pendant la recette",
      "Risque majeur : manque de ressources en compta cet été"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Le retard et la date ratée sont des conséquences. Sans cause, personne ne sait quelle action lancer.",
      "Oui. Cause (une seule personne sait, et elle peut manquer en recette), risque (des cas non testés), conséquence implicite (des erreurs après la bascule). L'action se voit : former une suppléante.",
      "Non. Son congé est connu et pas encore commencé : c'est une cause, pas un problème. La ligne ne dit pas ce qu'il entraîne (cas non testés), donc pas d'impact à noter.",
      "Non. Trop vague : qui, quand, quel effet ? « Majeur » sans probabilité ni impact chiffrés ne permet pas de trier."
    ],
    retenir: "Une ligne de registre : cause → risque → conséquence."
  },
  {
    id: "cp07-q05",
    dialecte: "Gestion de projet",
    q: "La cheffe comptable, seule à connaître les cas particuliers (avoirs, litiges), part 3 semaines en congé pendant la recette, dans 4 mois. Que fais-tu ?",
    choix: [
      "Tu demandes au COPIL de décaler la recette de 4 mois",
      "Tu l'écris en risque et tu fais former une suppléante",
      "Tu confies ses cas à l'intégrateur et tu suis les tests",
      "Tu l'écris en risque et tu testeras ses cas à son retour"
    ],
    bonne: 1,
    pourquoi: [
      "Non. La plus grosse solution, pour un risque qu'une action simple réduit. Décaler de 4 mois pousse la bascule après le 1er septembre 2027.",
      "Oui. 4 mois, c'est le temps de lui faire écrire ses cas et de former Julie. Le risque baisse, le planning ne bouge pas.",
      "Non. L'intégrateur connaît Divalto, pas vos avoirs ni vos litiges : il teste ce qu'il comprend. Et après la bascule, personne en compta ne sait traiter ces cas.",
      "Non. Ses cas glissent de 3 semaines, et le point unique de défaillance reste : si elle tombe malade, plus personne ne sait. 4 mois suffisent pour former Julie."
    ],
    retenir: "Réponse proportionnée : la plus petite action qui réduit assez le risque."
  },
  {
    id: "cp07-q06",
    dialecte: "Gestion de projet",
    q: "Un seul consultant de l'intégrateur connaît le paramétrage de vos journaux comptables dans Divalto. Rien n'indique qu'il va partir. La bascule est dans 6 mois. Que fais-tu ?",
    choix: [
      "Tu rédiges toi-même la doc de son paramétrage",
      "Tu lances une consultation pour un 2e intégrateur",
      "Tu demandes un 2e consultant formé et une doc écrite",
      "Tu n'écris rien : il est là, et il fait du bon travail"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Tu documentes un paramétrage que tu ne maîtrises pas : la doc sera incomplète, et personne chez l'intégrateur ne pourra le reprendre.",
      "Non. Des semaines de travail et de coût pour un risque qu'un binôme réduit. Ta marge part dans un appel d'offres.",
      "Oui. C'est un point unique de défaillance. Un binôme et une doc réduisent le risque, sans changer de prestataire.",
      "Non. Un point unique de défaillance se traite avant qu'il manque. Le jour où il part, il est trop tard pour transmettre."
    ],
    retenir: "Une seule personne qui sait = un point unique de défaillance : un binôme et une doc, tôt."
  },
  {
    id: "cp07-q07",
    dialecte: "Gestion de projet",
    q: "Après l'atelier risques, ta liste compte 85 risques. Le COPIL (comité de pilotage) a lieu la semaine prochaine. Que fais-tu ?",
    choix: [
      "Tu présentes les 85, pour que rien ne soit oublié",
      "Tu gardes une quinzaine d'actifs, et 5 au COPIL",
      "Tu mets une action et un propriétaire sur les 85",
      "Tu jettes la liste et gardes ceux du cadrage"
    ],
    bonne: 1,
    pourquoi: [
      "Non. 85 lignes noient les 5 qui comptent : le COPIL ne retient rien et ne décide rien. 100 risques = 0 pilotage.",
      "Oui. Tu notes, tu tries, tu fusionnes les doublons. Les plus gros vont au COPIL, les petits sont acceptés ou surveillés de loin.",
      "Non. 85 actions à suivre : personne ne le fera. Les vraies priorités se perdent dans la masse.",
      "Non. Tu perds ce que l'atelier a trouvé de nouveau, comme les points uniques de défaillance chez les métiers."
    ],
    retenir: "Un registre utile est court : 10 à 20 risques actifs, les 5 plus gros au COPIL."
  },
  {
    id: "cp07-q08",
    dialecte: "Gestion de projet",
    q: "Sophie, comptable clients, signale un risque : le logo pourrait être mal placé sur la version PDF lisible des factures. Probabilité 2, impact 1. Que fais-tu ?",
    choix: [
      "Tu bloques la bascule tant que tous les logos ne sont pas testés",
      "Tu l'acceptes et le notes : on corrigera si ça arrive",
      "Tu le notes et tu préviens le DAF aujourd'hui",
      "Tu réponds à Sophie : ce n'est pas un sujet du projet"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Bloquer la bascule pour un logo, c'est mettre en jeu la date légale pour un détail.",
      "Oui. Note 2 sur 9 : on accepte. Une ligne courte, et une correction simple si ça arrive.",
      "Non. Alerter le sponsor pour un risque de note 2, c'est le noyer : il écoutera moins le jour d'une vraie alerte.",
      "Non. C'est bien un risque du projet, même petit. Le balayer décourage Sophie : elle ne signalera pas le prochain, peut-être grave."
    ],
    retenir: "Petit risque (note 1 ou 2) : on l'accepte en le sachant, sans dépenser."
  },
  {
    id: "cp07-q09",
    dialecte: "Gestion de projet",
    q: "Le chef de projet de la PA t'annonce par écrit : « L'émission des factures depuis Divalto ne sera pas prête avant octobre 2027. » L'émission est obligatoire au 1er septembre 2027. Le COPIL est dans 3 semaines. Que fais-tu ?",
    choix: [
      "Tu l'ajoutes au registre et le présentes au COPIL",
      "Tu préviens le DAF aujourd'hui, avec des options",
      "Tu relances la PA aujourd'hui pour la date",
      "Tu demandes au DG un COPIL extraordinaire demain"
    ],
    bonne: 1,
    pourquoi: [
      "Non. 3 semaines perdues sur un risque légal. Le DAF découvre en séance un sujet où chaque semaine compte.",
      "Oui. Le retard annoncé est un fait ; le risque, c'est de rater la date légale. Le sponsor le sait le jour même : faits, impact, 2 ou 3 options, ta recommandation.",
      "Non. Relancer est utile, mais ne suffit pas : la date légale est en jeu et le sponsor doit le savoir le jour même.",
      "Non. Tu sautes ton sponsor : il doit d'abord savoir, et pouvoir décider. Et un COPIL réuni en urgence, sans options préparées, ne décide rien."
    ],
    retenir: "Risque légal ou majeur et proche : le sponsor le sait le jour même, pas au prochain COPIL."
  },
  {
    id: "cp07-q10",
    dialecte: "Gestion de projet",
    q: "Ton registre prévoit un déclencheur : « connecteur pas livré au 15 mars ». Plan B : la bascule de juin via le portail web de la PA, prévu au contrat. Le 16 mars, rien n'est livré. Que fais-tu ?",
    choix: [
      "Tu laisses une semaine de plus à la PA",
      "Tu déclenches le plan B et tu préviens le DAF",
      "Tu lances la recherche d'une autre PA",
      "Tu exiges une date ferme et tu préviens le DAF"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Le déclencheur sert justement à ne pas négocier avec soi-même. Une semaine de plus, puis une autre : la marge disparaît.",
      "Oui. Le déclencheur est atteint : le plan B part, comme prévu. La bascule de juin tient via le portail ; le DAF est prévenu du changement.",
      "Non. Changer de PA à 3 mois de la bascule : contrat, connecteur et tests à refaire. Le plan B est prêt : on l'utilise.",
      "Non. Prévenir le DAF est bien, mais une nouvelle date ne remplace pas le plan B : si la PA la rate encore, tu as perdu des semaines."
    ],
    retenir: "Déclencheur atteint = plan B lancé, sans nouvelle discussion."
  },
  {
    id: "cp07-q11",
    dialecte: "Gestion de projet",
    q: "Le planning de l'intégrateur met la bascule de l'émission le 20 août 2027. En août, la compta est à 2 personnes sur 6. Aucune marge avant le 1er septembre. Que fais-tu ?",
    choix: [
      "Tu acceptes, et tu prévois une astreinte tout l'été",
      "Tu avances la bascule en mars, recette raccourcie",
      "Tu le notes en risque et tu le surveilles",
      "Tu fais changer le plan : bascule avancée en juin"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Une astreinte n'ajoute pas de marge. Au moindre souci, la date légale est ratée, avec une compta vide.",
      "Non. Trop fort : tu sacrifies la recette, et les erreurs partent chez les clients. Juin suffit à garder une marge.",
      "Non. Surveiller un risque inacceptable, c'est le regarder arriver. Rien ne le réduit.",
      "Oui. Risque inacceptable : on l'évite en changeant le plan. Juin laisse juillet-août comme marge légale."
    ],
    retenir: "Un risque inacceptable s'évite : on change le plan."
  },
  {
    id: "cp07-q12",
    dialecte: "Gestion de projet",
    q: "Tu fais ajouter au contrat de la PA une date de livraison et des pénalités de retard. Face au risque de retard du connecteur, quelle réponse est-ce ?",
    choix: [
      "Éviter : le risque de retard disparaît",
      "Réduire : le retard devient peu probable",
      "Transférer : le prestataire paie une partie du retard",
      "Accepter : on paiera nous-mêmes si ça arrive"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Le risque existe toujours : le connecteur peut être en retard. Éviter, c'est changer le plan pour qu'il n'existe plus.",
      "Non. Une pénalité motive un peu, mais ne change pas vraiment la probabilité. Réduire, c'est agir sur la cause (jalons, tests tôt).",
      "Oui. Une partie de la conséquence financière (souvent plafonnée) passe au prestataire. Le retard reste chez toi : il faut aussi réduire.",
      "Non. Accepter, c'est garder la conséquence. Ici, tu la fais porter par un autre."
    ],
    retenir: "Contrat ou assurance = transférer la conséquence, pas supprimer le risque."
  },
  {
    id: "cp07-q13",
    dialecte: "Gestion de projet",
    q: "Le DAF te dit : « Il y a des pénalités de retard dans le contrat de la PA, donc le risque de retard est réglé. » Que lui réponds-tu ?",
    choix: [
      "« Oui, on peut le retirer du registre »",
      "« Non : les pénalités ne servent à rien ici »",
      "« Une partie du coût, oui ; la date légale, non »",
      "« Oui, si le montant couvre nos pertes »"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Le retard peut toujours arriver. Sans suivi ni plan B, la date légale tombe quand même.",
      "Non. Elles compensent le coût et motivent le prestataire. Elles sont utiles, mais pas suffisantes.",
      "Oui. Les pénalités couvrent une partie du coût (souvent plafonnée). Le retard reste à réduire : jalons, tests tôt, plan B.",
      "Non. Même compensé, tu n'émets pas tes factures à la date : clients, trésorerie et obligation légale restent touchés."
    ],
    retenir: "La pénalité paie le retard, elle ne l'empêche pas : transférer ET réduire."
  },
  {
    id: "cp07-q14",
    dialecte: "Gestion de projet",
    q: "Échelle 1 à 3. Risque A : probabilité 3, impact 2. Risque B : probabilité 1, impact 3. Risque C : probabilité 2, impact 1. Aucun ne touche la date légale. Lequel suis-tu en priorité ?",
    choix: [
      "A, la plus forte note",
      "B, le plus grave",
      "C, le plus facile à traiter",
      "Les trois au même niveau"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. 3 × 2 = 6, contre 3 pour B et 2 pour C. A a la plus forte note : action et suivi en premier.",
      "Non. Impact fort, mais rare : 1 × 3 = 3. Sans date légale en jeu, il passe après A, avec une action simple suivie en revue.",
      "Non. Note 2 : le plus faible des trois. Commencer par le plus facile, c'est soigner le petit et laisser le gros.",
      "Non. Tout suivre pareil, c'est ne rien prioriser : le temps part sur les petits risques."
    ],
    retenir: "Note = probabilité × impact : on traite d'abord les notes les plus hautes."
  },
  {
    id: "cp07-q15",
    dialecte: "Gestion de projet",
    q: "Dans ton registre, la colonne « propriétaire » dit « Équipe projet » sur 12 risques sur 15. Qu'en penses-tu ?",
    choix: [
      "C'est bien : toute l'équipe surveille les risques",
      "Il faut une personne nommée par risque",
      "Il faut mettre le DAF, il est le sponsor",
      "Il faut te mettre, tu es chef de projet"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Quand tout le monde est responsable, personne ne l'est : les actions ne sont pas faites.",
      "Oui. Une personne qui suit l'action et la note : celle qui peut le mieux agir (la cheffe comptable, l'intégrateur, toi…).",
      "Non. Le DAF peut porter une ligne qui touche son équipe, pas 12. Le sponsor décide des gros sujets, il ne pilote pas chaque ligne.",
      "Non. Toi sur toutes les lignes, c'est l'équipe qui se décharge sur toi. Tu ne peux pas agir chez la PA ou en compta."
    ],
    retenir: "Propriétaire = une personne nommée, celle qui peut agir."
  },
  {
    id: "cp07-q16",
    dialecte: "Gestion de projet",
    q: "Mars 2027. Le e-reporting, hors du périmètre de ton projet, est porté par le DAF, qui l'a confié au contrôleur de gestion. Tu apprends que rien n'a démarré. Il est obligatoire au 1er septembre 2027. Que fais-tu ?",
    choix: [
      "Rien : c'est hors périmètre, il n'est pas à toi",
      "Tu alertes le DG : le DAF est en retard",
      "Tu l'ajoutes à ton registre, suivi au point projet",
      "Tu le dis au DAF aujourd'hui : risque légal"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Hors périmètre ne veut pas dire hors de ta vue. Si personne ne le dit, l'entreprise rate une obligation légale.",
      "Non. Tu passes par-dessus le porteur : le DAF l'apprend par le DG, et ta relation avec ton sponsor en souffre. Lui d'abord.",
      "Non. Ce n'est pas un risque de ton projet : le suivre chez toi ne le fait pas démarrer. Son porteur doit le savoir vite.",
      "Oui. C'est escalader, au sens du PMBOK : remettre le risque à son porteur, le DAF. Faits, date, ce que ton projet peut absorber ou pas. Tu préviens aussi le contrôleur de gestion."
    ],
    retenir: "Un risque légal hors de ton périmètre se remet le jour même à son porteur : c'est escalader, au sens du PMBOK."
  },
  {
    id: "cp07-q17",
    dialecte: "Gestion de projet",
    q: "Revue des risques. Le risque « retard du connecteur » est noté probabilité 1. La PA vient de rater 2 jalons intermédiaires. La date finale n'est pas passée. Que fais-tu ?",
    choix: [
      "Tu gardes 1 : la date finale n'est pas ratée",
      "Tu changes de PA tout de suite",
      "Tu remontes à 3 et prépares le plan B",
      "Tu notes les 2 retards et tu revois au prochain jalon"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Deux jalons ratés sont un signal d'alerte réel. Attendre la date finale, c'est découvrir le problème sans plan B.",
      "Non. Changer de PA est une décision lourde, au sponsor. Le signal justifie d'agir, pas de tout casser.",
      "Oui. Signal d'alerte = la probabilité monte tout de suite. Plan B prêt, déclencheur daté, DAF informé du changement.",
      "Non. Noter sans remonter la probabilité, c'est attendre : un 3e jalon raté te coûte encore des semaines."
    ],
    retenir: "Un signal d'alerte fait monter la probabilité tout de suite : on n'attend pas la date finale."
  },
  {
    id: "cp07-q18",
    dialecte: "Gestion de projet",
    q: "L'intégrateur propose un connecteur spécifique, jamais fait ailleurs, livré 3 semaines avant la date légale. Le connecteur standard de la PA couvre 95 % de vos factures. Que recommandes-tu ?",
    choix: [
      "Le standard, et les 5 % restants traités à part",
      "Le spécifique, avec des pénalités de retard",
      "Tu laisses l'intégrateur choisir : c'est son métier",
      "Le spécifique, et deux fois plus de tests"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Tu évites le risque en changeant le plan : un connecteur éprouvé, et une solution simple pour les cas rares.",
      "Non. Les pénalités paient le retard, mais 3 semaines de marge sur un développement neuf : la date légale reste en jeu.",
      "Non. Le choix engage la date légale et le budget : c'est une décision du projet. L'intégrateur propose ce qu'il sait vendre.",
      "Non. Plus de tests réduit les erreurs, pas le risque de retard du développement lui-même. Et 3 semaines n'y suffiront pas."
    ],
    retenir: "Risque inacceptable et alternative simple : on l'évite en changeant le plan."
  },
  {
    id: "cp07-q19",
    dialecte: "Gestion de projet",
    q: "La cheffe comptable vient d'être arrêtée 2 mois. La recette commence dans 1 semaine. Ton registre avait prévu ce cas : plan B « Julie, formée comme suppléante, prend ses cas ». Que fais-tu ?",
    choix: [
      "Tu passes la probabilité à 3 et tu préviens le DAF",
      "Tu demandes au COPIL de décaler la recette de 2 mois",
      "Tu lances le plan B et tu informes le DAF",
      "Tu fais toi-même ses tests, pour tenir la date"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Le risque est arrivé : ce n'est plus une note à revoir, c'est un problème. Prévenir le DAF ne lance pas Julie : la semaine avant la recette se perd.",
      "Non. Trop fort : le plan B existe pour ce cas. Décaler de 2 mois mange la marge avant la date légale, sans raison.",
      "Oui. Le plan B part tout de suite. La cheffe comptable est absente : c'est donc le DAF, son manager, qui valide la charge de Julie.",
      "Non. Tu testes un métier qui n'est pas le tien : rien n'est vraiment validé, les erreurs sortiront après la bascule."
    ],
    retenir: "Le risque arrive : on lance le plan B préparé, on ne le réévalue pas."
  },
  {
    id: "cp07-q20",
    dialecte: "Gestion de projet",
    q: "Il y a 2 mois, tu as noté un risque fort (probabilité 3, impact 3) sur la reprise des codes TVA. Tu ne l'as pas dit au DAF, pensant le régler. Ton action n'a pas marché. Que fais-tu ?",
    choix: [
      "Tu essaies une autre solution avant de lui en parler",
      "Tu demandes au DAF de décaler la bascule",
      "Tu le lui dis maintenant, avec un plan",
      "Tu le passes à 2, puisque tu as déjà agi"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Deux mois de silence sur un risque de note 9, c'est déjà trop. Une 2e tentative cachée aggrave la surprise.",
      "Non. Tu sors du silence, mais avec le plus gros remède et une seule option. Le DAF doit d'abord savoir, puis choisir entre des pistes chiffrées.",
      "Oui. Mieux vaut tard que trop tard. Faits, ce que tu as essayé, ta proposition, et ce que tu attends de lui.",
      "Non. Ton action n'a pas marché : le risque n'a pas baissé. Baisser la note, c'est maquiller le registre."
    ],
    retenir: "Un risque fort ne se garde pas pour soi : le sponsor le sait tôt."
  },
  {
    id: "cp07-q21",
    dialecte: "Gestion de projet",
    q: "Le DAF signe demain le contrat de la PA. Tu vois qu'il ne contient aucune date de livraison du connecteur Divalto, ni de pénalité. Que fais-tu ?",
    choix: [
      "Tu laisses signer : on verra si le retard arrive",
      "Tu l'appelles aujourd'hui : il manque une clause clé",
      "Tu le notes pour l'avenant, après la signature",
      "Tu bloques la signature jusqu'au prochain COPIL"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Après la signature, tu n'as plus de levier : un retard du connecteur sera à tes frais.",
      "Oui. Avant la signature, c'est le moment de transférer : date, jalons, pénalités. Le DAF décide, mais il doit le savoir.",
      "Non. Un avenant se négocie quand le prestataire a déjà le contrat : il a beaucoup moins de raisons d'accepter.",
      "Non. Bloquer une signature n'est pas ton rôle, et un COPIL pour une clause qu'un appel règle fait perdre du temps."
    ],
    retenir: "Le contrat se négocie avant de signer : c'est là qu'on transfère le risque."
  },
  {
    id: "cp07-q22",
    dialecte: "Gestion de projet",
    q: "Le consultant de l'intégrateur, seul à connaître votre paramétrage Divalto, annonce qu'il quitte la société dans 2 semaines. La recette commence dans 1 mois. Que fais-tu ?",
    choix: [
      "Tu le notes en risque, à suivre à la revue",
      "Tu lui demandes une doc et tu la reliras avec lui",
      "Tu demandes au DAF de changer d'intégrateur",
      "Tu exiges un remplaçant, passation avant son départ"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Le départ est annoncé : ce n'est plus incertain. Dans 2 semaines, sa connaissance part avec lui.",
      "Non. Une doc écrite en 2 semaines, relue par toi qui ne fais pas le paramétrage : la recette démarre sans personne qui sait.",
      "Non. Trop fort : à 1 mois de la recette, tout le savoir de l'intégrateur part, pas seulement le sien. Une passation suffit.",
      "Oui. Tu appelles le responsable de compte de l'intégrateur : remplaçant nommé, passation entre eux avant le départ, suivie par toi. Tu informes le DAF."
    ],
    retenir: "Un point unique de défaillance qui s'en va : passation tout de suite, pas à la prochaine revue."
  },
  {
    id: "cp07-q23",
    dialecte: "Gestion de projet",
    q: "La PA livre un document intermédiaire avec 2 jours de retard. Ton planning garde 1 semaine de marge de recette. La bascule est en juin, pour l'échéance du 1er septembre 2027. Que fais-tu ?",
    choix: [
      "Tu préviens le DAF et exiges un plan de rattrapage",
      "Tu notes le retard et tu suis le prochain jalon",
      "Tu décales la bascule d'un mois, par sécurité",
      "Tu ne notes rien : 2 jours, ce n'est rien"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Le sponsor et un plan de rattrapage pour 2 jours dans la marge : tu surréagis, et ta prochaine vraie alerte pèsera moins.",
      "Oui. 2 jours tiennent dans la semaine de marge de recette. Tu restes attentif : si ça se répète, la probabilité monte.",
      "Non. Un mois de décalage pour 2 jours de retard : tu perds plus que le problème ne coûte.",
      "Non. Un retard, même petit, se note : s'il se répète, c'est un signal d'alerte. Sans trace, tu ne le verras pas venir."
    ],
    retenir: "Un petit retard qui tient dans la marge de recette se note et se suit, sans tout bouleverser."
  },
  {
    id: "cp07-q24",
    dialecte: "Gestion de projet",
    q: "Risque « Sophie, comptable clients, peu à l'aise avec le nouveau circuit de relance » : probabilité 2, impact 2. La bascule est dans 5 mois. Que prévois-tu ?",
    choix: [
      "Tu lui donnes la doc et elle apprendra seule",
      "Une alerte au DAF aujourd'hui : risque facturation",
      "Deux séances de formation et un essai en recette",
      "Tu fais ses relances le 1er mois, et tu la formes après"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Seule avec une doc, elle apprend sur de vraies relances, après la bascule : retards d'encaissement et erreurs. 5 mois laissent le temps de former.",
      "Non. Une note de 4 se gère à ton niveau. Le DAF le verra au COPIL, avec l'action déjà en cours.",
      "Oui. Réduire, simplement : former, puis vérifier en recette. Si l'essai rate, la probabilité monte et tu adaptes.",
      "Non. Tu fais le travail de la compta : tu ne pilotes plus le projet, et Sophie apprend quand même sur de vraies relances, après la bascule."
    ],
    retenir: "Risque moyen : une action simple pour le réduire, puis on vérifie."
  },
  {
    id: "cp07-q25",
    dialecte: "Gestion de projet",
    q: "Julie sera absente une semaine pendant la recette (formation prévue de longue date). La recette dure 6 semaines, plus 1 semaine de marge de recette. Bascule en juin, échéance le 1er septembre 2027. Que fais-tu ?",
    choix: [
      "Tu ne changes rien, sans le noter : elle rattrapera",
      "Tu replaces ses tests sur la semaine de marge",
      "Tu fais ses tests toi-même et elle les relira",
      "Tu décales la recette d'un mois entier"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Sans replanifier ni noter, ses tests s'empilent à son retour, et personne ne voit que la marge est prise.",
      "Oui. Une semaine se prend sur la marge de recette. Tu le notes, et tu sais que la marge est maintenant consommée.",
      "Non. Tu testes un métier qui n'est pas le tien : ce que tu valides ne l'est pas vraiment. Et la marge de recette suffit pour attendre son retour.",
      "Non. Un mois de décalage pour une semaine d'absence : tu perds 3 semaines pour rien."
    ],
    retenir: "Une semaine d'absence se prend sur la marge de recette."
  },
  {
    id: "cp07-q26",
    dialecte: "Gestion de projet",
    q: "Tu organises la revue des risques : 2 h chaque semaine, avec 8 personnes, pour relire les 18 risques un par un. Au bout d'un mois, plus personne ne vient. Que changes-tu ?",
    choix: [
      "Tu la rends obligatoire, avec le DAF en copie",
      "Tu la fais en 15 minutes, au point projet",
      "Tu la supprimes : le registre suffit à lui seul",
      "Tu la fais seul, chaque semaine, pendant 2 h"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Forcer une réunion trop lourde fâche les participants sans la rendre utile.",
      "Oui. Revue courte, régulière : chaque propriétaire dit ce qui change. Les risques stables ne se relisent pas à chaque fois.",
      "Non. Un registre sans revue vieillit : les notes ne bougent plus, les signaux passent inaperçus.",
      "Non. Seul, tu n'as pas les infos des propriétaires : tu notes des risques que tu ne connais pas."
    ],
    retenir: "Une revue des risques est courte et régulière, faite avec les propriétaires."
  },
  {
    id: "cp07-q27",
    dialecte: "Gestion de projet",
    q: "Le commercial a lu qu'une autre plateforme agréée a eu une panne de 2 jours. Il te dit : « Changeons de PA avant que ça nous arrive. » Que fais-tu ?",
    choix: [
      "Tu lances un appel d'offres pour une nouvelle PA",
      "Tu passes ce risque à probabilité 3, impact 3",
      "Tu ignores : ce n'est pas notre plateforme",
      "Tu vérifies les engagements de service de ta PA"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Changer de plateforme sur une rumeur visant un autre : coût, délai, et aucune preuve que la nouvelle fera mieux.",
      "Non. Rien ne montre que ta PA est concernée. Une note 9 sans fait sème la panique au COPIL.",
      "Non. La question est légitime : une panne de PA bloque l'émission. Il faut au moins vérifier.",
      "Oui. Tu vérifies, tu notes, tu ajustes : délai de reprise prévu au contrat, plan de repli. Puis tu réponds au commercial."
    ],
    retenir: "Une rumeur se vérifie avant d'agir : on ne change pas de plan sur un « on dit »."
  },
  {
    id: "cp07-q28",
    dialecte: "Gestion de projet",
    q: "Au COPIL, tu présentes le risque « retard des tests côté responsable ADV » : probabilité 2, impact 2, action en cours. Comment le dis-tu ?",
    choix: [
      "« Gros souci : l'ADV met le projet en danger »",
      "« Rien à signaler sur la partie ADV, tout va bien »",
      "« Note 4 sur 9 : l'ADV peut glisser, plan lancé »",
      "« Je propose un COPIL extraordinaire sur l'ADV »"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Dramatiser un risque moyen braque le responsable ADV, et ta prochaine vraie alerte pèsera moins.",
      "Non. Cacher un risque suivi : si les tests dérapent, le sponsor découvre qu'il était connu.",
      "Oui. Les faits, la note, l'action en cours. Le COPIL sait, sans s'affoler, et peut te demander plus.",
      "Non. Une réunion de crise pour une note de 4 : tu prends le temps de tout le monde pour un sujet que tu gères."
    ],
    retenir: "Un risque se dit avec des faits et une action : ni drame, ni silence."
  },
  {
    id: "cp07-q29",
    dialecte: "Gestion de projet",
    q: "Au renouvellement du contrat, la PA pourra augmenter ses prix. Le contrat signé ne plafonne pas les hausses. Impact modéré, et vous ne pouvez pas vous passer de PA. Quelle réponse choisis-tu ?",
    choix: [
      "Éviter : renoncer à la PA",
      "Accepter, avec une réserve au budget",
      "Réduire : surveiller les tarifs chaque mois",
      "Ignorer : c'est dans plus d'un an"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Passer par une plateforme agréée est obligatoire : tu ne peux pas éviter ce risque en y renonçant.",
      "Oui. Rien ne le réduit simplement, l'impact est modéré : on accepte en le sachant, avec une réserve de budget.",
      "Non. Surveiller ne baisse ni la probabilité ni l'impact : c'est accepter, mais sans réserve. La hausse tombera sur le budget.",
      "Non. Accepter n'est pas ignorer : sans réserve, la hausse tombera sur un budget déjà tendu."
    ],
    retenir: "Accepter un risque, c'est le garder en le sachant, avec une réserve si l'impact compte."
  },
  {
    id: "cp07-q30",
    dialecte: "Gestion de projet",
    q: "Le connecteur doit être livré le 1er mars ; la recette commence le 16 mars. Tu écris le déclencheur du plan B pour le risque « retard du connecteur ». Lequel est le meilleur ?",
    choix: [
      "« Si on sent que ça dérape côté prestataire »",
      "« Si le connecteur n'est pas recetté au 15 mars »",
      "« Si le connecteur n'est pas livré au 15 mars »",
      "« Si la PA nous annonce un retard »"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Une impression ne déclenche rien : chacun la voit à sa façon, et le plan B part trop tard.",
      "Non. La recette ne commence que le 16 mars : au 15, rien n'est recetté. Ce déclencheur part toujours, même si le connecteur arrive à l'heure.",
      "Oui. Un fait observable et une date : le 16 mars, tout le monde sait si le plan B part, sans débat.",
      "Non. Utile comme alerte, mais tu dépends de sa franchise : elle annonce souvent trop tard. Sans date, rien ne part à coup sûr."
    ],
    retenir: "Un déclencheur = un fait observable et daté, qui ne part que si le risque arrive."
  },
  {
    id: "cp07-q31",
    dialecte: "Gestion de projet",
    q: "Risque « Sophie peu à l'aise avec le circuit de relance ». Formation faite, et Sophie a réussi ses tests en recette sans aide. Que fais-tu de ce risque ?",
    choix: [
      "Tu le gardes en rouge, par prudence",
      "Tu le fermes, en notant pourquoi",
      "Tu demandes au COPIL l'autorisation de le fermer",
      "Tu ajoutes une 3e formation, pour être sûr"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Un risque traité qui reste rouge brouille le registre : les vrais risques se voient moins.",
      "Oui. L'action est faite, le test le prouve : la revue sert aussi à fermer. Une ligne dit pourquoi.",
      "Non. Fermer un petit risque traité est ton travail. Le COPIL le verra dans le registre, sans débat.",
      "Non. Une formation de plus pour un risque déjà écarté : du temps pris à Sophie pour rien."
    ],
    retenir: "Un risque traité et vérifié se ferme, à la revue."
  },
  {
    id: "cp07-q32",
    dialecte: "Gestion de projet",
    q: "Tu lances l'identification des risques de DEMAT 2027. Comment t'y prends-tu ?",
    choix: [
      "Tu écris seul la liste, tu connais bien Divalto",
      "Tu demandes à l'intégrateur et à la PA leur liste",
      "Tu réunis 1 h métiers et prestataires en atelier",
      "Tu reprends une liste type trouvée sur Internet"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Seul, tu vois surtout la technique. Les risques chez les gens (une seule personne qui sait, la clôture) t'échappent.",
      "Non. Utile comme retour d'expérience, mais ils ne voient pas les risques côté compta et ADV : une seule personne qui sait, la clôture.",
      "Oui. Compta, ADV, intégrateur, PA : chacun voit ses risques. Ajoute les retours d'expérience de chacun.",
      "Non. Une liste type est générique : elle ne connaît ni vos clôtures, ni vos clients EDI, ni vos personnes clés."
    ],
    retenir: "Les risques se trouvent à plusieurs, métiers et prestataires ensemble."
  },
  {
    id: "cp07-q33",
    dialecte: "Gestion de projet",
    q: "Parmi ces situations DEMAT 2027, laquelle est un point unique de défaillance ?",
    choix: [
      "Trois personnes en compta savent saisir un avoir",
      "Le connecteur a été testé par Julie et par Sophie",
      "Seul Marc, à l'ADV, sait reprendre les flux EDI rejetés",
      "Un seul connecteur, avec le portail de la PA en secours"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Trois personnes : si l'une manque, les autres prennent le relais.",
      "Non. Deux testeurs, c'est au contraire une protection : aucun n'est seul à savoir.",
      "Oui. Une seule personne sait : s'il est absent, les flux EDI rejetés s'accumulent. Il faut un binôme et une procédure.",
      "Non. Le connecteur a un secours : s'il tombe, les factures passent par le portail. La PA elle-même reste un point faible, mais c'est un autre risque."
    ],
    retenir: "Point unique de défaillance = un seul élément qui, s'il manque, arrête tout."
  },
  {
    id: "cp07-q34",
    dialecte: "Gestion de projet",
    q: "Former Julie pour qu'elle puisse traiter les avoirs fournisseurs à la place de la cheffe comptable : face au risque d'absence de celle-ci, quelle réponse est-ce ?",
    choix: [
      "Éviter",
      "Réduire",
      "Transférer",
      "Accepter"
    ],
    bonne: 1,
    pourquoi: [
      "Non. L'absence peut toujours arriver : le risque n'a pas disparu. Éviter, c'est changer le plan pour qu'il n'existe plus.",
      "Oui. L'absence reste possible, mais son impact baisse : quelqu'un sait faire. C'est réduire.",
      "Non. Transférer, c'est faire porter la conséquence par un autre (contrat, assurance). Julie fait partie de l'entreprise.",
      "Non. Accepter, c'est ne rien faire de plus. Ici, tu agis pour baisser l'impact."
    ],
    retenir: "Réduire = baisser la probabilité ou l'impact, sans supprimer le risque."
  },
  {
    id: "cp07-q35",
    dialecte: "Gestion de projet",
    q: "Pendant la recette, le paramétrage de la TVA rejette 3 factures sur 400. La bascule est dans 2 mois, pour l'échéance du 1er septembre 2027. L'intégrateur peut corriger en 2 jours. Que fais-tu ?",
    choix: [
      "Tu corriges toi-même aujourd'hui et tu retestes",
      "Tu fais corriger, puis retester ces cas",
      "Tu décales la bascule pour tout retester",
      "Tu notes les rejets et tu corriges après la bascule"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Le paramétrage est à l'intégrateur : si tu y touches, il n'en répond plus, et tu ne pilotes plus. Tu le fais corriger, puis retester.",
      "Oui. C'est un petit problème : on le traite simplement. Correction, nouveau test des cas concernés, et on continue.",
      "Non. 2 mois avant la bascule, une correction de 2 jours : décaler n'apporte rien et coûte de la marge.",
      "Non. C'est un problème connu, pas un risque. Corriger après la bascule, c'est émettre des factures fausses, alors que 2 jours suffisent maintenant."
    ],
    retenir: "Un petit problème trouvé en recette se corrige et se reteste, sans drame."
  },
  {
    id: "cp07-q36",
    dialecte: "Gestion de projet",
    q: "Février 2027. AquaBleu (client EDI, 20 % du chiffre d'affaires) exige dès juin de nouvelles mentions dans ses factures (n° de commande, code GLN). Le connecteur ne les transmet pas. La bascule est en juin. Que fais-tu ?",
    choix: [
      "Tu préviens le DAF aujourd'hui, avec les options",
      "Tu le notes et tu demandes un délai à AquaBleu",
      "Tu attends le COPIL du mois prochain pour l'annoncer",
      "Tu décales la bascule de 3 mois, sans attendre"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Deux mentions manquent (n° de commande, code GLN : le code du lieu de livraison), pour un client à 20 % du chiffre d'affaires. Le DAF le sait le jour même, avec des pistes et ta recommandation.",
      "Non. Négocier un délai avec un client à 20 % du chiffre d'affaires n'est pas ton rôle, et le DAF ne sait rien : s'il refuse, des semaines sont perdues.",
      "Non. Un mois perdu sur un sujet commercial majeur : le DAF découvre en séance ce qu'il aurait pu traiter.",
      "Non. Trop fort, et pas ta décision : la bascule passe en septembre, après la date légale, pour un sujet qu'un ajout au connecteur peut régler."
    ],
    retenir: "Risque majeur et proche, qui demande une décision : le sponsor le sait le jour même."
  },
  {
    id: "cp07-q37",
    dialecte: "Gestion de projet",
    q: "Le commercial pressé te dit : « Ton registre de risques, c'est de la paperasse. On verra bien. » Que lui réponds-tu ?",
    choix: [
      "« Tu as raison, je l'arrête pour gagner du temps »",
      "« C'est obligatoire, le DAF l'exige »",
      "« Donne-moi tes 3 risques côté ventes, je les suis »",
      "« Je t'envoie le registre : lis-le et tu verras »"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Sans registre, les risques arrivent en surprise : le premier client bloqué sera le sien.",
      "Non. Brandir le sponsor ne convainc pas, et rien ne dit qu'il l'a demandé : parler en son nom se vérifie vite, et tu perds du crédit.",
      "Oui. Tu le rends utile : 3 risques, sur son terrain. Il voit à quoi sert le registre : protéger ses clients.",
      "Non. Lui envoyer le registre, c'est lui donner la paperasse qu'il refuse : il ne le lira pas. Pars de son terrain : ses clients."
    ],
    retenir: "Un registre court et concret convainc mieux qu'une règle imposée."
  },
  {
    id: "cp07-q38",
    dialecte: "Gestion de projet",
    q: "La PA annonce 2 mois de retard sur le connecteur. Sans le plan B, la bascule tombe en août, sans marge avant le 1er septembre 2027. Comment présentes-tu le sujet au DAF ?",
    choix: [
      "« Le projet est en péril, il faut réagir vite »",
      "« Petit glissement, je gère, rien à décider »",
      "« Il faut absolument changer de prestataire »",
      "« 2 mois de retard : 2 options, décision vendredi »"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Dramatiser sans proposer : le DAF s'inquiète, mais ne sait pas quoi décider.",
      "Non. Minimiser un risque sur la date légale : le DAF découvrira trop tard qu'il avait une décision à prendre.",
      "Non. Une seule option, sans coût : tu décides à la place du sponsor, et il ne voit pas les autres choix.",
      "Oui. Les faits, l'impact, des options et une date de décision. Le DAF peut trancher en connaissance de cause."
    ],
    retenir: "Au sponsor : faits, impact, options, décision attendue. Ni drame, ni silence."
  }
];
