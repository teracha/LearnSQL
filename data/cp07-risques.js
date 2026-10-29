// Chef de projet SI — Questions du module cp07 « Gérer les risques ».
// Mises en situation. Fil rouge DEMAT 2027 : négociant en équipement de piscines, 120 salariés, ERP Divalto,
// passage à la facture électronique via une plateforme agréée (PA). DAF = sponsor ET manager de la cheffe comptable.
// Personnages : Julie (comptable fournisseurs), Sophie (comptable clients), intégrateur Divalto, prestataire de la PA,
// responsable ADV, commercial pressé.
// Équilibre voulu : environ 1/3 « agir fort ou tout de suite », 1/3 « piège de surréaction », 1/3 technique.
LEARNSQL.questions.cp07 = [
  {
    id: "cp07-q01",
    dialecte: "Gestion de projet",
    q: "Le prestataire de la PA (plateforme agréée) te dit : « Le connecteur Divalto aura peut-être 3 semaines de retard. » La date de livraison n'est pas encore passée. C'est quoi ?",
    choix: [
      "Un risque : le retard n'est pas encore arrivé",
      "Un problème : le prestataire l'a déjà annoncé",
      "Une hypothèse : on suppose la date tenue",
      "Une contrainte : la date ne dépend pas de toi"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Le retard est possible, pas encore réel. Tu l'écris au registre avec une note et une action, pendant qu'agir coûte peu.",
      "Non. Une annonce de « peut-être » ne rend pas le retard réel. Le traiter en problème, c'est lancer le plan B trop tôt et payer pour rien.",
      "Non. L'hypothèse, c'est « le connecteur arrive à l'heure ». Elle vient d'être mise en doute : elle devient un risque à suivre.",
      "Non. La contrainte est imposée (la date légale). Le retard possible du prestataire est un risque : il se réduit et se surveille."
    ],
    retenir: "Un risque n'est pas encore arrivé ; un problème, si."
  },
  {
    id: "cp07-q02",
    dialecte: "Gestion de projet",
    q: "Le connecteur Divalto devait être livré le 15 mars. On est le 18 mars, rien n'est livré, et le prestataire de la PA ne donne pas de nouvelle date. C'est quoi, et que fais-tu ?",
    choix: [
      "Un risque : tu relèves sa probabilité à 3",
      "Un problème : tu le traites dès maintenant",
      "Un risque : tu en parles à la revue du mois",
      "Une hypothèse fausse : tu corriges la note"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Le retard est réel : changer une note ne sert plus à rien. Pendant ce temps, la marge avant la bascule fond.",
      "Oui. La date est passée : ce n'est plus incertain. Plan B s'il existe, nouvelle date exigée, impact chiffré pour le DAF.",
      "Non. Attendre la revue mensuelle pour un fait déjà arrivé, c'est perdre 2 à 4 semaines de marge sans rien faire.",
      "Non. Corriger un document ne règle rien : le connecteur manque toujours, et la bascule s'approche."
    ],
    retenir: "Quand le risque arrive, on arrête de l'évaluer : on le traite."
  },
  {
    id: "cp07-q03",
    dialecte: "Gestion de projet",
    q: "Ta note de cadrage dit : « Divalto 10.13 accepte le format de facture de la PA sans développement. » Personne ne l'a vérifié. Que fais-tu ?",
    choix: [
      "Tu la laisses : elle est validée dans la note",
      "Tu la notes en risque, probabilité moyenne, à suivre",
      "Tu la fais vérifier cette semaine par l'intégrateur",
      "Tu demandes au COPIL de choisir une autre PA"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Validée ne veut pas dire vraie. Si elle est fausse, tu le découvres en recette, avec un développement imprévu.",
      "Non. La noter en risque ne la vérifie pas, alors qu'une question à l'intégrateur lève le doute en quelques jours.",
      "Oui. Une hypothèse douteuse se vérifie vite. Fausse ou impossible à confirmer ? Alors seulement, tu l'écris en risque.",
      "Non. Tu changes de plateforme sur un doute jamais vérifié : coût, délai, et peut-être le même souci ailleurs."
    ],
    retenir: "Une hypothèse douteuse se vérifie d'abord ; elle devient un risque si le doute reste."
  },
  {
    id: "cp07-q04",
    dialecte: "Gestion de projet",
    q: "Tu écris une ligne du registre des risques DEMAT 2027. Laquelle est la mieux écrite ?",
    choix: [
      "Risque : le projet DEMAT 2027 pourrait prendre du retard",
      "Seule la cheffe comptable sait : absente, cas non testés, erreurs",
      "Problème : la cheffe comptable part en congé pendant la recette",
      "Risque majeur : manque de ressources en compta cet été"
    ],
    bonne: 1,
    pourquoi: [
      "Non. « Du retard » est une conséquence, pas un risque. Sans cause, personne ne sait quelle action lancer.",
      "Oui. Cause (une seule personne sait), risque (elle est absente en recette), conséquence (cas non testés, erreurs). L'action se voit : former une suppléante.",
      "Non. Son congé est connu, c'est un fait. Le risque, c'est ce qu'il entraîne : des cas non testés. Sans conséquence écrite, impossible de noter l'impact.",
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
      "Tu lui demandes de déplacer ses congés après la recette",
      "Tu attends son retour pour faire tester ses cas"
    ],
    bonne: 1,
    pourquoi: [
      "Non. La plus grosse solution pour un risque qu'une action simple réduit. La marge avant la date légale disparaît, sans raison.",
      "Oui. 4 mois, c'est le temps de lui faire écrire ses cas et de former Julie. Le risque baisse, le planning ne bouge pas.",
      "Non. Ses congés sont posés, et c'est le DAF, son manager, qui les accorde. Tu crées un conflit alors que former une suppléante suffit.",
      "Non. Ses cas seraient testés 3 semaines plus tard, sur la marge. Et si elle tombe malade, plus personne ne sait."
    ],
    retenir: "Réponse proportionnée : la plus petite action qui réduit assez le risque."
  },
  {
    id: "cp07-q06",
    dialecte: "Gestion de projet",
    q: "Un seul consultant de l'intégrateur connaît le paramétrage de vos journaux comptables dans Divalto. Rien n'indique qu'il va partir. La bascule est dans 6 mois. Que fais-tu ?",
    choix: [
      "Tu demandes à l'intégrateur de changer de consultant",
      "Tu lances une consultation pour un 2e intégrateur",
      "Tu demandes un 2e consultant formé et une doc écrite",
      "Tu n'écris rien : il est là, et il fait du bon travail"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Tu remplaces le seul qui sait par quelqu'un qui ne sait rien : tu crées le problème que tu voulais éviter.",
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
      "Tu mets une action et un propriétaire sur chacun",
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
      "Tu préviens le DAF aujourd'hui, avant qu'un client le voie",
      "Tu commandes à l'intégrateur une mise en page spécifique"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Bloquer la bascule pour un logo, c'est mettre en jeu la date légale pour un détail.",
      "Oui. Note 2 sur 9 : on accepte. Une ligne courte, et une correction simple si ça arrive.",
      "Non. Alerter le sponsor pour un risque de note 2, c'est le noyer : il écoutera moins le jour d'une vraie alerte.",
      "Non. Tu paies un développement pour un risque mineur, et tu ajoutes un spécifique à maintenir."
    ],
    retenir: "Petit risque (note 1 ou 2) : on l'accepte en le sachant, sans dépenser."
  },
  {
    id: "cp07-q09",
    dialecte: "Gestion de projet",
    q: "Le prestataire de la PA t'annonce par écrit : « L'émission des factures depuis Divalto ne sera pas prête avant octobre 2027. » L'émission est obligatoire au 1er septembre 2027. Le COPIL est dans 3 semaines. Que fais-tu ?",
    choix: [
      "Tu l'ajoutes au registre et le présentes au COPIL",
      "Tu préviens le DAF aujourd'hui, avec des options",
      "Tu relances le prestataire pour qu'il tienne la date",
      "Tu lui demandes un plan de rattrapage écrit"
    ],
    bonne: 1,
    pourquoi: [
      "Non. 3 semaines perdues sur un risque légal. Le DAF découvre en séance un sujet où chaque semaine compte.",
      "Oui. Risque légal, majeur et proche : le sponsor le sait le jour même. Faits, impact, 2 ou 3 options, ta recommandation.",
      "Non. Relancer est utile, mais ne suffit pas : la date légale est en jeu et le sponsor doit le savoir maintenant.",
      "Non. Un plan de rattrapage est utile, mais tu attends une réponse du prestataire pendant que le sponsor ignore un risque légal."
    ],
    retenir: "Risque légal ou majeur et proche : le sponsor le sait le jour même, pas au prochain COPIL."
  },
  {
    id: "cp07-q10",
    dialecte: "Gestion de projet",
    q: "Ton registre prévoit : déclencheur « connecteur pas livré au 15 mars » → plan B « dépôt des factures sur le portail web de la PA ». On est le 16 mars. Rien n'est livré. Que fais-tu ?",
    choix: [
      "Tu laisses une semaine de plus au prestataire",
      "Tu déclenches le plan B et tu préviens le DAF",
      "Tu réunis l'équipe pour réévaluer la probabilité",
      "Tu exiges du prestataire une nouvelle date ferme"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Le déclencheur sert justement à ne pas négocier avec soi-même. Une semaine de plus, puis une autre : la marge disparaît.",
      "Oui. Le déclencheur est atteint : le plan B part, comme prévu. Le DAF est prévenu, car la date peut bouger.",
      "Non. Le retard est arrivé : il n'y a plus de probabilité à évaluer. La réunion retarde le plan B.",
      "Non. Une nouvelle date ne remplace pas le plan B : s'il la rate encore, tu as perdu des semaines de plus."
    ],
    retenir: "Déclencheur atteint = plan B lancé, sans nouvelle discussion."
  },
  {
    id: "cp07-q11",
    dialecte: "Gestion de projet",
    q: "Le planning de l'intégrateur met la bascule de l'émission le 20 août 2027. En août, la compta est à 2 personnes sur 6. Aucune marge avant le 1er septembre. Que fais-tu ?",
    choix: [
      "Tu acceptes, et tu prévois une astreinte tout l'été",
      "Tu ajoutes au contrat des pénalités de retard",
      "Tu le notes en risque et tu le surveilles",
      "Tu fais changer le plan : bascule avancée en juin"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Une astreinte n'ajoute pas de marge. Au moindre souci, la date légale est ratée, avec une compta vide.",
      "Non. Les pénalités paient, mais n'empêchent pas le retard. Le 1er septembre, c'est toi qui es hors la loi.",
      "Non. Surveiller un risque inacceptable, c'est le regarder arriver. Rien ne le réduit.",
      "Oui. Risque inacceptable : on l'évite en changeant le plan. Juin laisse juillet-août comme marge."
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
      "Transférer : le prestataire paie le retard",
      "Accepter : on paiera si ça arrive"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Le risque existe toujours : le connecteur peut être en retard. Éviter, c'est changer le plan pour qu'il n'existe plus.",
      "Non. Une pénalité motive un peu, mais ne change pas vraiment la probabilité. Réduire, c'est agir sur la cause (jalons, tests tôt).",
      "Oui. La conséquence financière passe au prestataire. Le retard, lui, reste chez toi : il faut aussi réduire.",
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
      "« L'argent est couvert, pas la date légale »",
      "« Oui, si le montant couvre nos pertes »"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Le retard peut toujours arriver. Sans suivi ni plan B, la date légale tombe quand même.",
      "Non. Elles compensent le coût et motivent le prestataire. Elles sont utiles, mais pas suffisantes.",
      "Oui. Transférer couvre la conséquence financière. Le retard reste à réduire : jalons, tests tôt, plan B.",
      "Non. Même compensé, tu n'émets pas tes factures à la date : clients, trésorerie et obligation légale restent touchés."
    ],
    retenir: "La pénalité paie le retard, elle ne l'empêche pas : transférer ET réduire."
  },
  {
    id: "cp07-q14",
    dialecte: "Gestion de projet",
    q: "Échelle 1 à 3. Risque A : probabilité 3, impact 1. Risque B : probabilité 2, impact 3. Risque C : probabilité 1, impact 2. Lequel suis-tu en priorité ?",
    choix: [
      "A : c'est le plus probable des trois",
      "B : sa note est la plus haute, 6",
      "C : il est rare, donc facile à traiter",
      "Les trois pareil : ce sont tous des risques"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Note 3 : il arrivera sans doute, mais avec un petit impact. Il passe après B.",
      "Oui. 2 × 3 = 6, contre 3 pour A et 2 pour C. B a la plus forte note : action et suivi en premier.",
      "Non. Note 2 : le plus faible des trois. Commencer par lui, c'est soigner le petit et laisser le gros.",
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
      "Non. Le DAF ne suivra pas 12 actions. Le sponsor décide des gros sujets, il ne pilote pas chaque ligne.",
      "Non. Toi sur toutes les lignes, c'est l'équipe qui se décharge sur toi. Tu ne peux pas agir chez la PA ou en compta."
    ],
    retenir: "Propriétaire = une personne nommée, celle qui peut agir."
  },
  {
    id: "cp07-q16",
    dialecte: "Gestion de projet",
    q: "En mars 2027, tu apprends que le e-reporting (hors du périmètre de ton projet, porté par le DAF) n'a pas démarré. Il est obligatoire au 1er septembre 2027 pour l'entreprise. Que fais-tu ?",
    choix: [
      "Rien : c'est hors périmètre, il n'est pas à toi",
      "Tu l'ajoutes en douce à ton projet, pour aider",
      "Tu le notes au registre, et attends le COPIL",
      "Tu le dis au DAF cette semaine : risque légal"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Hors périmètre ne veut pas dire hors de ta vue. Si personne ne le dit, l'entreprise rate une obligation légale.",
      "Non. Tu élargis ton projet sans décision : ta charge et tes dates en souffrent, et le DAF ne sait toujours pas.",
      "Non. Ce n'est pas un risque de ton projet, c'est un risque légal pour l'entreprise. Le porteur doit le savoir vite.",
      "Oui. Il en est le porteur. Faits, date, ce que ça implique, et ce que ton projet peut ou ne peut pas absorber."
    ],
    retenir: "Un risque légal, même hors de ton périmètre, se dit tout de suite à son porteur."
  },
  {
    id: "cp07-q17",
    dialecte: "Gestion de projet",
    q: "Revue des risques. Le risque « retard du connecteur » est noté probabilité 1. Le prestataire de la PA vient de rater 2 jalons intermédiaires. La date finale n'est pas passée. Que fais-tu ?",
    choix: [
      "Tu gardes 1 : la date finale n'est pas ratée",
      "Tu changes de PA tout de suite",
      "Tu remontes à 3 et prépares le plan B",
      "Tu attends le prochain jalon pour revoir la note"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Deux jalons ratés sont un signal fort. Attendre la date finale, c'est découvrir le problème sans plan B.",
      "Non. Changer de PA est une décision lourde, au sponsor. Le signal justifie d'agir, pas de tout casser.",
      "Oui. Signal faible = la probabilité monte tout de suite. Plan B prêt, déclencheur daté, DAF informé du changement.",
      "Non. Un 3e jalon raté te coûte encore des semaines. La revue sert à réagir aux signaux, pas à attendre."
    ],
    retenir: "Un signal faible fait monter la probabilité tout de suite : on n'attend pas la date finale."
  },
  {
    id: "cp07-q18",
    dialecte: "Gestion de projet",
    q: "L'intégrateur propose un connecteur spécifique, jamais fait ailleurs, livré 3 semaines avant la date légale. Le connecteur standard de la PA couvre 95 % de vos factures. Que recommandes-tu ?",
    choix: [
      "Le standard, et les 5 % restants traités à part",
      "Le spécifique, avec des pénalités de retard",
      "Le spécifique, en le surveillant de près",
      "Le spécifique, avec deux fois plus de tests"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Tu évites le risque en changeant le plan : un connecteur éprouvé, et une solution simple pour les cas rares.",
      "Non. Les pénalités paient le retard, mais 3 semaines de marge sur un développement neuf : la date légale reste en jeu.",
      "Non. Surveiller ne réduit rien. Un développement jamais fait, sans marge, tu le regardes déraper.",
      "Non. Plus de tests réduit les erreurs, pas le risque de retard du développement lui-même. Et 3 semaines n'y suffiront pas."
    ],
    retenir: "Risque inacceptable et alternative simple : on l'évite en changeant le plan."
  },
  {
    id: "cp07-q19",
    dialecte: "Gestion de projet",
    q: "La cheffe comptable vient d'être arrêtée 2 mois. La recette commence dans 1 semaine. Ton registre avait prévu ce cas : plan B « Julie, formée comme suppléante, prend ses cas ». Que fais-tu ?",
    choix: [
      "Tu passes la probabilité à 3 à la prochaine revue",
      "Tu attends une semaine, elle reviendra peut-être",
      "Tu lances le plan B et tu informes le DAF",
      "Tu fais toi-même ses tests, pour tenir la date"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Le risque est arrivé : ce n'est plus une note à revoir, c'est un problème à traiter maintenant.",
      "Non. Un arrêt de 2 mois est un fait : attendre fait perdre la semaine qui servait à lancer Julie avant la recette.",
      "Oui. Le plan B part tout de suite. Le DAF, son manager et sponsor, valide la charge de Julie.",
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
      "Tu le présentes au COPIL, dans un mois",
      "Tu le lui dis maintenant, avec un plan",
      "Tu le passes à 2, puisque tu as déjà agi"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Deux mois de silence sur un risque de note 9, c'est déjà trop. Une 2e tentative cachée aggrave la surprise.",
      "Non. Encore un mois sans qu'il sache : s'il l'apprend par un autre, ta crédibilité tombe.",
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
      "Tu l'appelles aujourd'hui pour faire ajouter une date",
      "Tu le notes pour l'avenant, après la signature",
      "Tu bloques la signature jusqu'au prochain COPIL"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Après la signature, tu n'as plus de levier : un retard du connecteur sera à tes frais.",
      "Oui. Avant la signature, c'est le moment de transférer : date, jalons, pénalités. Le DAF décide, mais il doit le savoir.",
      "Non. Un avenant se négocie quand le prestataire a déjà le contrat : il n'a plus de raison d'accepter.",
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
      "Tu lui demandes d'écrire une doc avant de partir",
      "Tu attends : l'intégrateur trouvera bien quelqu'un",
      "Tu exiges un remplaçant et une passation cette semaine"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Le départ est annoncé : ce n'est plus incertain. Dans 2 semaines, sa connaissance part avec lui.",
      "Non. Une doc écrite seul en 2 semaines, sans personne pour la reprendre : la recette démarre sans quelqu'un qui sait.",
      "Non. Si la passation ne se fait pas avant son départ, personne ne saura. La recette démarre à l'aveugle.",
      "Oui. Tu appelles le responsable de compte : remplaçant nommé, passation avec toi, avant le départ. Tu informes le DAF."
    ],
    retenir: "Un point unique de défaillance qui s'en va : passation tout de suite, pas à la prochaine revue."
  },
  {
    id: "cp07-q23",
    dialecte: "Gestion de projet",
    q: "Le prestataire de la PA livre un document intermédiaire avec 2 jours de retard. Il te reste 3 semaines de marge avant la bascule. Que fais-tu ?",
    choix: [
      "Tu préviens le DG : le prestataire n'est pas fiable",
      "Tu notes le retard et tu suis le prochain jalon",
      "Tu décales la bascule d'un mois, par sécurité",
      "Tu lances la recherche d'une autre PA"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Le DG pour 2 jours de retard : tu sautes le sponsor et tu passes pour quelqu'un qui panique.",
      "Oui. 2 jours sur 3 semaines de marge se prennent sur la marge. Tu restes attentif : si ça se répète, la probabilité monte.",
      "Non. Un mois de décalage pour 2 jours de retard : tu perds plus que le problème ne coûte.",
      "Non. Changer de plateforme pour 2 jours de retard : des semaines de travail pour rien."
    ],
    retenir: "Un petit retard dans la marge se note et se suit, sans tout bouleverser."
  },
  {
    id: "cp07-q24",
    dialecte: "Gestion de projet",
    q: "Risque « Sophie, comptable clients, peu à l'aise avec le nouveau circuit de relance » : probabilité 2, impact 2. La bascule est dans 5 mois. Que prévois-tu ?",
    choix: [
      "Le recrutement d'un comptable en plus avant la bascule",
      "Une alerte au DAF : c'est un risque sur la facturation",
      "Deux séances de formation et un essai en recette",
      "Le report de la bascule, le temps qu'elle progresse"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Un recrutement pour un besoin de formation : coût élevé, délai long, et Sophie reste mal à l'aise.",
      "Non. Une note de 4 se gère à ton niveau. Le DAF le verra au COPIL, avec l'action déjà en cours.",
      "Oui. Réduire, simplement : former, puis vérifier en recette. Si l'essai rate, la probabilité monte et tu adaptes.",
      "Non. Reporter la bascule pour un besoin de formation : tu mets la date légale en jeu pour un risque moyen."
    ],
    retenir: "Risque moyen : une action simple pour le réduire, puis on vérifie."
  },
  {
    id: "cp07-q25",
    dialecte: "Gestion de projet",
    q: "Julie sera absente une semaine pendant la recette (formation prévue de longue date). La recette dure 6 semaines, avec une semaine de marge. Que fais-tu ?",
    choix: [
      "Tu demandes au COPIL un intérimaire pendant 3 mois",
      "Tu replaces ses tests sur la semaine de marge",
      "Tu lui demandes d'annuler sa formation",
      "Tu décales la recette d'un mois entier"
    ],
    bonne: 1,
    pourquoi: [
      "Non. 3 mois d'intérim pour une semaine d'absence : un coût sans rapport avec le risque, et un intérimaire qui ne connaît pas les cas.",
      "Oui. Une semaine se prend sur la marge. Tu le notes, et tu sais que la marge est maintenant consommée.",
      "Non. Sa formation est décidée avec sa cheffe. Tu crées un conflit pour un trou que la marge absorbe.",
      "Non. Un mois de décalage pour une semaine d'absence : tu perds 3 semaines pour rien."
    ],
    retenir: "Une semaine d'absence se prend sur la marge."
  },
  {
    id: "cp07-q26",
    dialecte: "Gestion de projet",
    q: "Tu organises la revue des risques : 2 h chaque semaine, avec 8 personnes, pour relire les 18 risques un par un. Au bout d'un mois, plus personne ne vient. Que changes-tu ?",
    choix: [
      "Tu la rends obligatoire, avec le DAF en copie",
      "Tu passes à 15 minutes, au point projet, sur ce qui bouge",
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
      "« Alerte : l'ADV met tout le projet en danger »",
      "« Rien à signaler sur la partie ADV, tout va bien »",
      "« Risque moyen : tests ADV en retard, plan en cours »",
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
    q: "Au renouvellement du contrat, la PA pourra augmenter ses prix. Impact modéré, et vous ne pouvez pas vous passer de PA. Quelle réponse choisis-tu ?",
    choix: [
      "Éviter : renoncer à la PA",
      "Accepter, avec une réserve au budget",
      "Transférer à l'intégrateur Divalto",
      "Ignorer : c'est dans plus d'un an"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Passer par une plateforme agréée est obligatoire : tu ne peux pas éviter ce risque en y renonçant.",
      "Oui. Rien ne le réduit simplement, l'impact est modéré : on accepte en le sachant, avec une réserve de budget.",
      "Non. L'intégrateur ne fixe pas les prix de la PA : il ne peut pas porter cette conséquence.",
      "Non. Accepter n'est pas ignorer : sans réserve, la hausse tombera sur un budget déjà tendu."
    ],
    retenir: "Accepter un risque, c'est le garder en le sachant, avec une réserve si l'impact compte."
  },
  {
    id: "cp07-q30",
    dialecte: "Gestion de projet",
    q: "Tu écris le déclencheur du plan B pour le risque « retard du connecteur ». Lequel est le bon ?",
    choix: [
      "« Si on sent que ça dérape côté prestataire »",
      "« Si le DAF commence à s'inquiéter du planning »",
      "« Connecteur non livré et recetté au 15 mars »",
      "« Si le prestataire nous annonce un retard »"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Une impression ne déclenche rien : chacun la voit à sa façon, et le plan B part trop tard.",
      "Non. L'inquiétude du DAF n'est pas un fait mesurable. Tu attends un signal qui peut ne jamais venir.",
      "Oui. Un fait observable et une date : le 16 mars, tout le monde sait si le plan B part, sans débat.",
      "Non. Le prestataire annonce souvent ses retards trop tard, ou pas du tout. Tu dépends de sa franchise."
    ],
    retenir: "Un déclencheur = un fait observable, avec une date."
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
      "Tu demandes à l'intégrateur sa liste habituelle",
      "Un atelier d'1 h avec métiers et prestataires",
      "Tu reprends une liste type trouvée sur Internet"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Seul, tu vois surtout la technique. Les risques chez les gens (une seule personne qui sait, la clôture) t'échappent.",
      "Non. Utile comme retour d'expérience, mais l'intégrateur ne voit pas les risques côté compta, ADV ou PA.",
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
      "La PA a deux centres de données en France"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Trois personnes : si l'une manque, les autres prennent le relais.",
      "Non. Deux testeurs, c'est au contraire une protection : aucun n'est seul à savoir.",
      "Oui. Une seule personne sait : s'il est absent, les flux EDI rejetés s'accumulent. Il faut un binôme et une procédure.",
      "Non. Deux centres de données sont un secours : c'est l'inverse d'un point unique."
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
    q: "Pendant la recette, le paramétrage de la TVA rejette 3 factures sur 400. La bascule est dans 4 mois. L'intégrateur peut corriger en 2 jours. Que fais-tu ?",
    choix: [
      "Tu demandes un COPIL extraordinaire sur la qualité",
      "Tu fais corriger, puis retester ces cas",
      "Tu décales la bascule pour tout retester",
      "Tu demandes au DAF de changer d'intégrateur"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Une réunion de crise pour 3 rejets que l'intégrateur corrige en 2 jours : tu alarmes pour rien.",
      "Oui. C'est un petit problème : on le traite simplement. Correction, nouveau test des cas concernés, et on continue.",
      "Non. 4 mois de marge, une correction de 2 jours : décaler n'apporte rien et coûte de la marge.",
      "Non. 3 rejets en recette, c'est le rôle de la recette de les trouver. Changer d'intégrateur coûterait des mois."
    ],
    retenir: "Un petit problème trouvé en recette se corrige et se reteste, sans drame."
  },
  {
    id: "cp07-q36",
    dialecte: "Gestion de projet",
    q: "Le responsable ADV t'apprend qu'AquaBleu, client EDI de la grande distribution (20 % du chiffre d'affaires), impose un nouveau format de facture en juin 2027. Le connecteur prévu ne le gère pas. La bascule est en juin. Que fais-tu ?",
    choix: [
      "Tu préviens le DAF aujourd'hui, avec les options",
      "Tu le notes, et tu verras avec AquaBleu en 2027",
      "Tu attends le COPIL du mois prochain pour l'annoncer",
      "Tu demandes à l'ADV de régler ça avec AquaBleu"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Gros client, mois de la bascule, budget et planning en jeu : le sponsor le sait le jour même, avec des pistes et ta recommandation.",
      "Non. Plus tu attends, moins il y a d'options. 20 % du chiffre d'affaires et la bascule ne se laissent pas dans une ligne de registre.",
      "Non. Un mois perdu sur un sujet légal et commercial majeur : le DAF découvre en séance ce qu'il aurait pu traiter.",
      "Non. L'ADV parlera avec AquaBleu, mais le choix touche la bascule, le budget et le contrat : le sponsor doit le savoir."
    ],
    retenir: "Risque majeur et proche, qui demande une décision : le sponsor le sait tout de suite."
  },
  {
    id: "cp07-q37",
    dialecte: "Gestion de projet",
    q: "Le commercial pressé te dit : « Ton registre de risques, c'est de la paperasse. On verra bien. » Que lui réponds-tu ?",
    choix: [
      "« Tu as raison, je l'arrête pour gagner du temps »",
      "« C'est obligatoire, le DAF l'exige »",
      "« Je te demande un avis sur les 3 risques ventes »",
      "« Je vais en parler au DAF, il tranchera »"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Sans registre, les risques arrivent en surprise : le premier client bloqué sera le sien.",
      "Non. Brandir le sponsor ne convainc pas, et ce n'est pas vrai : tu perds du crédit.",
      "Oui. Tu le rends utile : 3 risques, sur son terrain. Il voit à quoi sert le registre : protéger ses clients.",
      "Non. Le DAF pour une remarque en passant : tu montes un sujet qu'une vraie question au commercial règle."
    ],
    retenir: "Un registre court et concret convainc mieux qu'une règle imposée."
  },
  {
    id: "cp07-q38",
    dialecte: "Gestion de projet",
    q: "Le prestataire de la PA annonce 2 mois de retard. Avec ce retard, la bascule tombe en août, sans marge avant le 1er septembre 2027. Comment présentes-tu le sujet au DAF ?",
    choix: [
      "« C'est une catastrophe, tout le projet est en péril »",
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
