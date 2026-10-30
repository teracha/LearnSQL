// Chef de projet SI — Questions du module cp13 « Consulter et choisir un prestataire ».
// Fond (pratiques d'achat informatique en PME / ETI ; PMBOK, gestion des approvisionnements) : consulter, ou un devis
// vérifié (enjeu, montant, durée, partenaire en place) ; le cahier des charges (le besoin et les contraintes, pas la
// solution ; la forme des réponses ; les dates du planning) ; liste longue → liste courte, liste officielle des PA, RFI
// avant RFP ; équité (mêmes informations, même délai, offres confidentielles) ; éthique (remise « si vous signez vite »,
// invitations, lien déclaré, intégrateur partenaire d'une PA) ; grille pondérée (avant les offres, éliminatoires, la loi
// est un filtre, qui note quoi, coût sur 3 ans tout compris) ; vérifier (démo sur tes cas, références, solidité, promesse,
// POC si doute fort) ; négocier (solution de rechange, pas que le prix, jamais la loi) ; décider (une page, le DAF choisit
// et signe) ; répondre aux non-retenus. Les pratiques divergent sur la négociation (2 finalistes en parallèle, ou le 1er
// seul) et sur le moment de prévenir le 2e finaliste (q40 : après la signature, avec une date de réponse avant).
// Fil rouge DEMAT 2027 (fiche fil rouge de docs/plan-chef-de-projet.md, qui fait foi), ligne « Choix de la PA (module
// cp13) ». Octobre 2026 : réception obligatoire depuis septembre, entreprise en retard ; cahier des charges court tiré de
// la note validée ; 3 PA de la liste officielle, 2 semaines pour répondre, grille fixée avant les offres, démo sur les
// cas de la compta, 2 finalistes, le DAF choisit et signe en novembre 2026. Pas de service achats : le DAF achète.
// Intégrateur en place, sans mise en concurrence : devis vérifié (40 jours, 750 € le jour, environ 30 k€). Connecteur
// livré au 1er mars 2027, recette dès le 16 mars ; support de 8 h à 18 h (annexe SLA, cp14) ; renouvellement de la PA :
// préavis de 6 mois, choix du DAF avant fin mai 2029 (cp14-q35, cp15-q22). Aucun montant d'amende.
// q05, q12, q33, q42, q43 : « Tu es DSI adjoint ». q03, q32 : un autre projet de la DSI (Snowflake + Power BI).
// Page Divalto utilisée (base documentaire Divalto 10.13, lecture seule) : « Gérer son WMS 10.13 » (q12 : le module WMS
// est intégré à Divalto Commerce & logistique, sans interface).
// Faits ajoutés (scénarios, cohérents avec la fiche, à valider) : grille d'exemple du cours (éliminatoires : liste
// officielle, connecteur standard pour Divalto, réception dès novembre ; pondérés : tes cas en démo 20, connecteur et
// sécurité 25, prix sur 3 ans 20, SLA 15, références 10, réversibilité 5, solidité 5), validée par le DAF avant les offres
// (q20, q21, q22, q25, q26) ; la compta note ses cas, la DSI le connecteur et la sécurité, le chef de projet le prix
// (q21) ; 8 PA de la liste ont un connecteur standard pour Divalto (q10) ; 6 cas réels en démo (q27) ; finalistes notés
// 78 et 74 (q39) ; la PA de l'expert-comptable (q04) ; une commission de l'intégrateur (q19) ; un ancien collègue chez
// une PA (q18) ; support proposé de 9 h à 17 h, négocié à 8 h-18 h (q34) ; chiffres des exemples (q02, q03, q23, q24,
// q32, q43) ; archivage limité à 2 ans contre une remise (q36) ; hausse de 10 % la veille de la signature (q37).
// Affirmations juridiques hors fiche (générales, à faire vérifier) : une entreprise privée n'a pas les règles de la
// commande publique (cours) ; la loi impose de garder les factures la durée légale, pas que la PA les garde (q36) ;
// une invitation n'est pas en soi une preuve de corruption, mais se refuse pendant la consultation (q17).
// Déjà publiées ailleurs, pas reprises ici : cp01-q12 et q15, cp04-q01, q18, q23, q34 et q39, cp07-q27, cp10-q06,
// cp14-q10, q12, q23, q35 et q36, cp15-q22 et q43, cp18-q32.
// Frontières : cadrer = cp04 (avant de consulter) ; contracter après le choix = cp14 ; piloter = cp15 ; business case =
// cp11 (ici, seulement le coût de chaque offre sur 3 ans) ; critères et MESORE = cp18 (cités, pas refaits) ;
// démarche et type de contrat = cp06.
// Anti-devinette : la bonne réponse est un extrême dans 11 questions sur 43 : l'action la plus douce qui suffit (q26,
// q31, q39), la plus forte quand elle se justifie (q05, q08, q11, q13, q15, q22, q33, q35). « Grille », « critères »,
// « DAF », « consulter », « test », « écarter », les points-virgules et les choix à deux actions sont aussi dans des
// choix faux. Consulter ou vérifier le plus n'est juste que dans q05, q33 et q42 ; envoyer la décision au DAF, seulement
// dans q37 (le DAF, informé le jour même, choisit et signe).
LEARNSQL.questions.cp13 = [
  {
    id: "cp13-q01",
    dialecte: "Gestion de projet",
    q: "Octobre 2026. Le DAF : « Pour l'intégrateur Divalto aussi, consulte 3 sociétés, comme pour la PA. » C'est votre partenaire en place : il connaît votre paramétrage depuis des années. Que lui proposes-tu ?",
    choix: [
      "Tu consultes 3 intégrateurs Divalto, sur le même cahier des charges",
      "Tu gardes celui en place, et le DAF signe son devis tel quel",
      "Tu gardes l'intégrateur en place, et tu vérifies son devis en détail",
      "Tu demandes un 2e devis à un autre intégrateur, pour situer le prix"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Des semaines de consultation, pour un prestataire qui connaît déjà votre paramétrage. Un nouveau venu devrait l'apprendre, à vos frais. Et sur un même Divalto, qui répondrait de quoi ?",
      "Non. Garder le partenaire en place, oui ; signer sans lire, non. Des jours que personne n'a justifiés seront payés.",
      "Oui. Partenaire en place, temps compté, montant moyen : un devis vérifié suffit. Jours par tâche, profil, taux, ce qui est inclus, comparés à vos projets passés. Le DAF décide avec ces faits.",
      "Non. Presque : comparer est sain, mais un intégrateur qui ne connaît pas votre Divalto chiffre à l'aveugle. Son devis ne se compare pas. Vérifie plutôt celui du partenaire en place, tâche par tâche."
    ],
    retenir: "Le partenaire en place sur ton ERP : un devis vérifié (jours, profil, taux) peut remplacer une consultation."
  },
  {
    id: "cp13-q02",
    dialecte: "Gestion de projet",
    q: "Devis de l'intégrateur pour DEMAT, en une ligne : « Paramétrage et connecteur : 40 jours, 750 € le jour. » Le DAF : « C'est notre partenaire, je signe ? » Que vérifies-tu d'abord ?",
    choix: [
      "Les 40 jours tâche par tâche, le profil prévu, le taux habituel",
      "Rien : partenaire en place, sans mise en concurrence ; c'est réglé",
      "Un rabais de 10 % sur son taux, avant la signature du DAF",
      "Deux devis d'autres intégrateurs, pour situer ces 40 jours"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Un devis vérifié : chaque tâche et ses jours, comparés à un projet passé ; le profil (senior ou junior) ; le taux, comparé à votre dernière commande. Le DAF signe avec ces faits.",
      "Non. Pas de mise en concurrence ne veut pas dire pas de contrôle. Une ligne de 40 jours, c'est 30 000 € que personne n'a justifiés.",
      "Non. Presque : négocier se peut, mais d'abord savoir ce que couvrent les 40 jours. 10 % de moins sur des jours de trop, c'est encore trop cher.",
      "Non. Le partenaire en place a été choisi sans mise en concurrence. Deux devis d'inconnus, chiffrés sans connaître votre Divalto, ne disent pas si ces 40 jours sont justes."
    ],
    retenir: "Vérifier un devis : les jours tâche par tâche, le profil, le taux, comparés à ce que tu connais déjà."
  },
  {
    id: "cp13-q03",
    dialecte: "Gestion de projet",
    q: "Autre projet de la DSI : Snowflake + Power BI. Il te faut 3 jours d'un expert Snowflake pour baisser les coûts de calcul, environ 3 000 €. Votre prestataire habituel en a un. Que fais-tu ?",
    choix: [
      "Une consultation de 3 sociétés, grille pondérée, sur 2 semaines",
      "L'expert le moins cher trouvé en ligne, sans autre vérification",
      "Ton prestataire habituel démarre lundi ; le devis suivra",
      "Un devis de ton prestataire habituel, avec le CV de l'expert"
    ],
    bonne: 3,
    pourquoi: [
      "Non. La consultation coûte plus que l'enjeu : 2 semaines de travail pour 3 jours. Elle se garde pour les gros enjeux.",
      "Non. Le prix d'un jour ne dit rien sans le profil. Un expert qui connaît mal Snowflake te coûte 3 jours pour rien.",
      "Non. Pas de travail avant une commande signée (module cp14) : le jour d'un désaccord, rien n'est écrit.",
      "Oui. Petit montant, prestataire connu : un devis vérifié suffit. Tu lis le CV de l'expert et ce que couvrent les 3 jours ; la commande est signée avant le 1er jour."
    ],
    retenir: "Petit montant, prestataire connu : un devis vérifié, CV compris. La consultation se garde pour les gros enjeux."
  },
  {
    id: "cp13-q04",
    dialecte: "Gestion de projet",
    q: "Octobre 2026. La réception est obligatoire depuis septembre : vous êtes en retard. Le DAF : « Pas le temps de consulter. Prends la PA de notre expert-comptable. » Que lui proposes-tu ?",
    choix: [
      "D'accord : sa PA, signée cette semaine, la réception n'attend plus",
      "Une consultation courte : 3 PA, dont la sienne, en 2 semaines",
      "Tu écartes sa PA : le conseil de l'expert-comptable n'est pas neutre",
      "Une RFI à 10 PA, puis un appel d'offres complet aux 4 meilleures"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Tu gagnes 2 semaines, et tu signes 3 ans sans savoir si son connecteur marche avec Divalto. Un expert-comptable ne connaît pas votre Divalto.",
      "Oui. L'urgence raccourcit la consultation, sans la supprimer : 3 PA de la liste officielle, la sienne comprise, réponses en 2 semaines. Un contrat de 3 ans vaut ces 2 semaines. Le DAF choisit ensuite.",
      "Non. Tu l'écartes sans l'avoir comparée. Un conseil n'est pas une faute ; s'il y a un lien, il se déclare. Sa PA passe la même grille que les autres.",
      "Non. Une RFI sert quand le marché est mal connu. Ici, la liste officielle existe, et la réception est déjà en retard : des semaines de procédure en trop."
    ],
    retenir: "Dans l'urgence, on consulte plus court, pas moins bien : 3 offres, 2 semaines, la piste du DAF comprise."
  },
  {
    id: "cp13-q05",
    dialecte: "Gestion de projet",
    q: "Tu es DSI adjoint. Projet : migrer votre Divalto vers sa prochaine version majeure, environ 100 jours d'intégrateur. Le bilan de l'intégrateur en place : retards répétés, erreurs qui reviennent. Que fais-tu ?",
    choix: [
      "Tu lui confies la migration : il connaît vos 25 spécifiques Divalto",
      "Tu fais vérifier son devis de 100 jours, tâche par tâche",
      "Tu lui demandes un plan d'amélioration daté, puis tu lui confies",
      "Tu consultes 2 ou 3 partenaires Divalto, lui compris"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Ses spécifiques sont un atout, pas un droit. Après des retards et des erreurs répétés, 100 jours sans comparer, c'est parier sur un changement que rien ne montre.",
      "Non. Presque : un devis vérifié suffit avec un partenaire qui donne satisfaction. Ici, le montant et le bilan justifient de comparer.",
      "Non. Un plan daté sert à corriger un prestataire en cours de contrat (module cp15). Avant 100 jours de projet, son bilan dit déjà ce que valent ses promesses.",
      "Oui. Gros projet, partenaire qui a déçu : tu consultes. Il répond aussi, car il connaît vos spécifiques. Son bilan écrit (module cp15) pèse dans ses références."
    ],
    retenir: "Le partenaire en place a déçu, sur un gros projet : on consulte, lui compris, son bilan dans la balance."
  },
  {
    id: "cp13-q06",
    dialecte: "Gestion de projet",
    q: "Tu écris le cahier des charges pour les PA. L'intégrateur propose d'y mettre : « Connecteur par fichiers XML, déposés chaque heure sur un serveur FTP. » Que fais-tu ?",
    choix: [
      "Tu écris sa phrase : il connaît Divalto, sa solution marchera",
      "Tu écris le besoin : factures et statuts sans ressaisie",
      "Tu retires toute mention de Divalto : chaque PA proposera sa solution",
      "Tu demandes au DAF de choisir entre sa phrase et la tienne"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Tu écris une solution. Une PA dont le connecteur marche autrement, et mieux, sera mal notée, ou ne répondra pas : tu ne compares plus des réponses à ton besoin.",
      "Oui. Le besoin : les factures de Divalto partent sans ressaisie, les statuts reviennent, dans un délai donné. Plus la contrainte : Divalto 10.13. Chaque PA dit comment elle le fait.",
      "Non. Presque : la solution sort, mais Divalto 10.13 est une contrainte, pas une solution. Sans elle, une PA peut répondre sans connecteur pour Divalto.",
      "Non. Écrire le cahier des charges est ton travail. Le DAF le valide ; il ne choisit pas chaque phrase."
    ],
    retenir: "Le cahier des charges dit le besoin et les contraintes (comme Divalto 10.13), pas la solution technique."
  },
  {
    id: "cp13-q07",
    dialecte: "Gestion de projet",
    q: "Ta note de cadrage DEMAT est validée. Le DAF : « Envoie-la aux PA, ça suffira comme cahier des charges. » Que fais-tu ?",
    choix: [
      "Tu l'envoies telle quelle : elle est validée, et c'est plus rapide",
      "Tu demandes à chaque PA de t'envoyer son propre questionnaire",
      "Un cahier des charges court, tiré d'elle, avec volumes et dates",
      "Un cahier des charges de 40 pages, détaillé écran par écran"
    ],
    bonne: 2,
    pourquoi: [
      "Non. La note dit quoi et pourquoi. Il manque les volumes, les contraintes techniques, la forme des réponses : chaque PA chiffrera ses propres hypothèses.",
      "Non. Chaque PA posera les questions qui la mettent en valeur. Tu compareras des réponses à des questionnaires différents.",
      "Oui. 5 à 10 pages, tirées de la note : le besoin, les volumes, Divalto 10.13, les flux EDI, la sécurité, la forme des réponses et les dates. Quelques jours de travail.",
      "Non. Les écrans de la PA sont son standard : tu les jugeras en démo. 40 pages prennent des semaines, et la réception est déjà en retard."
    ],
    retenir: "La note de cadrage ne suffit pas pour consulter : un cahier des charges court en tire le besoin détaillé, la forme des réponses et les dates."
  },
  {
    id: "cp13-q08",
    dialecte: "Gestion de projet",
    q: "Tu relis ton cahier des charges avant l'envoi aux PA. Il dit : « Connecteur Divalto : au plus vite. » Ta recette commence le 16 mars 2027. Qu'écris-tu à la place ?",
    choix: [
      "« Livré au 1er mars 2027 », 2 semaines avant ta recette",
      "« Au 1er septembre 2027 », la date légale de l'émission",
      "Rien de plus : chaque PA proposera son propre planning",
      "« Au 16 mars 2027 », le jour où ta recette commence"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. La date vient de ton planning, à rebours : recette dès le 16 mars, pilote en mai, bascule en juin. Les 2 semaines avant laissent le temps de l'installer et de le paramétrer. Chaque PA dit si elle tient cette date.",
      "Non. Le 1er septembre est la date légale, pas celle du connecteur. Livré si tard, il ne laisse ni recette, ni pilote, ni bascule en juin.",
      "Non. Des plannings différents ne se comparent pas, et aucune PA ne s'engage sur ta date. « Au plus vite » finit souvent trop tard.",
      "Non. Presque : la bonne période, mais sans aucune avance. Livré le 16, le connecteur n'est ni installé ni paramétré : ta recette commence en retard."
    ],
    retenir: "Le cahier des charges donne les dates du projet, tirées du planning à rebours, pas seulement la date légale."
  },
  {
    id: "cp13-q09",
    dialecte: "Gestion de projet",
    q: "Les 3 PA ont répondu. L'une donne un prix par facture, l'autre un forfait par mois, la 3e « sur devis » pour le connecteur. Impossible de comparer. Que fais-tu ?",
    choix: [
      "Tu compares au mieux, en estimant toi-même les prix qui manquent",
      "Tu écartes la PA « sur devis » : son offre est incomplète",
      "Tu relances toute la consultation, avec un nouveau cahier",
      "Un même tableau de prix aux 3, sur vos volumes, sous 3 jours"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Tes estimations décident à la place de leurs prix : une erreur de ta part, et le classement change. Chacun doit chiffrer son offre.",
      "Non. Ton cahier des charges ne demandait pas de tableau : l'oubli est aussi le tien. L'écarter, c'est perdre une offre peut-être bonne.",
      "Non. Tout reprendre coûte des semaines, alors qu'il manque des prix sous la même forme. La réception, déjà en retard, attendrait encore.",
      "Oui. Le même tableau aux 3 (abonnement, mise en service, options, sur vos volumes), par écrit, avec le même délai court. La prochaine fois, il sera dans le cahier des charges."
    ],
    retenir: "Des offres qui ne se comparent pas : le même tableau de prix aux 3. Le cahier des charges fixe la forme des réponses."
  },
  {
    id: "cp13-q10",
    dialecte: "Gestion de projet",
    q: "8 PA de la liste officielle ont un connecteur standard pour Divalto. Le DAF : « Consulte les 8, on aura plus de choix. » Tu as 2 semaines, et la compta pour les démos. Que proposes-tu ?",
    choix: [
      "Les 8 : plus d'offres, plus de chances de trouver la meilleure PA",
      "Une seule : celle que l'intégrateur connaît le mieux",
      "3 PA, retenues sur tes critères éliminatoires et leurs références",
      "Les 8, et une démo de 30 minutes chacune, sur 2 semaines"
    ],
    bonne: 2,
    pourquoi: [
      "Non. 8 offres à lire, 8 démos, 8 références à appeler, en 2 semaines : tout serait survolé. Et chaque PA, sachant ses chances faibles, répond moins bien.",
      "Non. Une seule offre : pas de comparaison, et pas de solution de rechange pour négocier. L'avis de l'intégrateur est une donnée, pas un choix.",
      "Oui. 3 offres sérieuses valent mieux que 8 survolées. Tu les retiens sur des faits : les critères éliminatoires, puis des références sous Divalto.",
      "Non. Presque : tu gardes les démos, mais 30 minutes ne jouent pas tes cas. La compta y passe des jours, et tu choisis sur du survol."
    ],
    retenir: "Une liste courte de 2 ou 3 prestataires sérieux, choisis sur des faits, vaut mieux qu'une liste longue survolée."
  },
  {
    id: "cp13-q11",
    dialecte: "Gestion de projet",
    q: "Un comparateur en ligne classe 1re la plateforme Z : prix bas, bons avis. Elle n'est pas dans la liste officielle des PA. Son commercial : « Notre immatriculation arrive cette année. » Que fais-tu ?",
    choix: [
      "Tu l'écartes : hors de la liste, ce n'est pas une PA",
      "Tu la consultes : 1re du comparateur, elle mérite sa chance",
      "Tu la consultes, et tu vérifieras la liste avant de signer",
      "Tu demandes au DAF s'il accepte ce risque, pour son prix"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. On choisit dans la liste officielle de la DGFiP, publiée sur impots.gouv.fr. Z pourra répondre à une prochaine consultation, une fois dans la liste.",
      "Non. Un comparateur privé ne remplace pas la liste officielle. Sans immatriculation, Z ne peut pas être votre PA.",
      "Non. Presque : vérifier avant de signer est juste, mais tu lui donnes une des 3 places sur une promesse. Si sa date glisse, tu recommences, réception déjà en retard.",
      "Non. Ce n'est pas un risque à peser : la règle exige une PA de la liste. Le DAF n'a rien à arbitrer."
    ],
    retenir: "Une PA se choisit dans la liste officielle de la DGFiP, au moment de consulter. Un comparateur ou une promesse ne la remplacent pas."
  },
  {
    id: "cp13-q12",
    dialecte: "Gestion de projet",
    q: "Tu es DSI adjoint. Projet de WMS (logiciel de gestion d'entrepôt) pour les 3 dépôts. Personne à la DSI ne connaît ce marché. Que fais-tu d'abord ?",
    choix: [
      "Le WMS d'un confrère du même métier, qui en est content",
      "Une RFI courte à 6 ou 8 éditeurs, puis l'appel d'offres à 3",
      "Le module WMS de Divalto, sans regarder ailleurs",
      "Un appel d'offres complet à 12 éditeurs, puis une démo chacun"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Son entrepôt n'est pas le tien : volumes, sites, lien avec Divalto. Son avis est une référence à appeler, pas un choix.",
      "Oui. La RFI (demande d'information) t'apprend qui fait quoi, et à quel prix environ. Ton cahier des charges sera meilleur, et l'appel d'offres (la RFP) part à une liste courte.",
      "Non. Presque : le module WMS de Divalto doit être dans ta liste (intégré à l'ERP, sans interface). Mais le prendre sans comparer, c'est choisir avant de connaître le marché.",
      "Non. 12 réponses lourdes à lire, 12 démos, et des éditeurs qui répondent vite, faute de chances. Sans connaître le marché, ton cahier des charges sera aussi plus flou."
    ],
    retenir: "Marché mal connu : une RFI d'abord, puis l'appel d'offres à une liste courte."
  },
  {
    id: "cp13-q13",
    dialecte: "Gestion de projet",
    q: "Pendant la consultation, la PA C t'appelle : « Combien de factures EDI de la grande distribution par mois ? » Le cahier des charges ne le dit pas. Que fais-tu ?",
    choix: [
      "Tu lui réponds au téléphone : elle a eu le bon réflexe",
      "Tu réponds « Non : tout est dans le cahier des charges »",
      "Tu réponds aux 3 PA, puis tu dis que la question vient de C",
      "Tu réponds, puis la question et la réponse partent aux 3 PA"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Elle seule chiffre sur le vrai volume ; les 2 autres chiffrent à l'aveugle. Les offres ne se comparent plus, et l'équité est rompue.",
      "Non. Ton cahier des charges a un trou : refuser, c'est laisser chaque PA deviner. Les prix seront faux pour tous.",
      "Non. Presque : la réponse va bien aux 3, mais sans dire qui a demandé. Sa question montre ce qu'elle cherche : c'est son information.",
      "Oui. Une question utile mérite une réponse, pour tous : la question et la réponse partent aux 3, par écrit, sans dire qui a demandé."
    ],
    retenir: "La question d'un candidat : la réponse part à tous, par écrit, sans dire qui l'a posée."
  },
  {
    id: "cp13-q14",
    dialecte: "Gestion de projet",
    q: "2 jours avant la date de réponse, la PA C demande une semaine de plus : « Notre avant-vente est débordée. » A et B répondront à temps. Que fais-tu ?",
    choix: [
      "Tu lui accordes la semaine : son offre sera peut-être la meilleure",
      "Une semaine de plus pour les 3 PA, pour rester équitable",
      "Même délai pour tous : elle répond à la date, avec ce qu'elle a",
      "Tu l'écartes dès aujourd'hui : elle ne sait pas tenir une date"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Elle aurait 3 semaines, les autres 2 : une offre mieux préparée, grâce à un délai que les autres n'ont pas eu.",
      "Non. Presque : prolonger pour tous reste équitable. Mais tu perds une semaine, réception en retard, pour une raison qui ne vient que d'elle. On prolonge quand la consultation l'exige.",
      "Oui. La règle, connue dès le départ, est la même pour tous. Elle peut répondre à la date, même plus court ; une offre en retard sort, comme annoncé.",
      "Non. Elle demande, elle n'a encore rien raté : l'écarter aujourd'hui est disproportionné. Elle peut encore répondre à la date."
    ],
    retenir: "Même délai pour tous. On ne prolonge que pour tous, et pour une raison qui vient de la consultation, pas d'un candidat."
  },
  {
    id: "cp13-q15",
    dialecte: "Gestion de projet",
    q: "Négociation avec les 2 finalistes. Le commercial de la PA B : « Donnez-moi le prix de A, et on s'aligne. » Que réponds-tu ?",
    choix: [
      "Jamais le prix de A : tu dis seulement s'il est bien placé",
      "Tu lui donnes le prix de A : il va sûrement baisser le sien",
      "Une fourchette du prix de A, et tu gardes le chiffre exact pour toi",
      "Tu lui envoies l'offre de A, sans le nom, pour qu'il compare"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Une offre est confidentielle : jamais son prix, même pour faire baisser l'autre. Tu dis seulement à B s'il est bien placé ; à lui de faire sa meilleure offre, sur tout ce qu'il propose.",
      "Non. Tu trahis A, et B saura que ses prix aussi circuleront. Il s'aligne juste en dessous, sans vrai effort.",
      "Non. Presque : moins précis, mais c'est toujours le prix de A. La confidentialité est rompue, juste un peu moins.",
      "Non. Sans le nom, c'est toujours l'offre de A : son prix, ses conditions. Et B devinera vite de qui elle vient."
    ],
    retenir: "En négociation, jamais le prix ni l'offre d'un concurrent : tu dis seulement si le candidat est bien placé, ou non."
  },
  {
    id: "cp13-q16",
    dialecte: "Gestion de projet",
    q: "Avant la date des réponses, la PA C propose : « 15 % de remise si vous signez avant vendredi. » Le DAF est tenté : la réception est en retard. Que proposes-tu ?",
    choix: [
      "Que le DAF signe vendredi : 15 %, et du temps de gagné",
      "Que C mette cette remise dans son offre, jugée avec les autres",
      "Que A et B fassent la même remise, avant vendredi aussi",
      "Que C soit écartée : cette pression est déloyale"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Il signe 3 ans sans comparer, sur une remise peut-être gonflée exprès. Les 2 autres offres arriveront après la signature.",
      "Oui. Une remise sérieuse tient jusqu'à la date prévue. Elle entre dans son prix sur 3 ans, et C est jugée sur la même grille que les autres.",
      "Non. Tu changes les règles pour tous, en cours de route, à la demande d'un candidat. La date des réponses ne veut plus rien dire.",
      "Non. C'est une technique de vente, pas une faute : tu refuses le délai, pas la candidate. Elle reste sur la grille."
    ],
    retenir: "Une remise « si vous signez vite » entre dans l'offre, jugée avec les autres, à la date prévue."
  },
  {
    id: "cp13-q17",
    dialecte: "Gestion de projet",
    q: "Pendant la consultation, le commercial de la PA C t'invite, avec la cheffe comptable, à un match en loge, « pour mieux se connaître ». Que fais-tu ?",
    choix: [
      "Vous y allez : un match n'engage à rien, et ça crée du lien",
      "Vous y allez, et tu le déclares au DAF dès votre retour",
      "Vous déclinez poliment, et tu le dis au DAF le jour même",
      "Tu écartes C de la consultation, pour tentative de corruption"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Pendant une consultation, une invitation fausse ton jugement, ou le fait croire aux autres candidats. Et la cheffe comptable note les démos.",
      "Non. Presque : déclarer est bien, mais ne rend pas l'invitation neutre. Pendant la consultation, on refuse.",
      "Oui. Pendant la consultation, cadeaux et invitations se refusent, poliment. Le DAF, qui achète, le sait : tout reste clair.",
      "Non. Une invitation n'est pas une preuve de corruption : elle se refuse, sans sanction. C garde sa place, sur la même grille."
    ],
    retenir: "Pendant une consultation, les invitations d'un candidat se refusent, poliment, et le DAF le sait."
  },
  {
    id: "cp13-q18",
    dialecte: "Gestion de projet",
    q: "Ton ancien collègue de la migration Divalto est devenu commercial chez la PA B, consultée. Vous déjeunez encore ensemble. Que fais-tu ?",
    choix: [
      "Rien à signaler : tu sais rester neutre, tu l'as toujours été",
      "Tu le dis au DAF, puis tu lui demandes d'écarter B",
      "Tu quittes le choix de la PA : un autre que toi le mènera",
      "Tu le dis au DAF, et tu ne notes pas B tout seul"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Même neutre, tu ne peux pas le prouver. Si B gagne, le DAF et les autres candidats douteront du choix.",
      "Non. B n'a rien fait : l'écarter pour ton lien à toi la punit sans raison, et tu perds peut-être la meilleure offre.",
      "Non. Presque : tu te protèges, mais le projet perd celui qui le connaît le mieux. Déclarer, et noter à plusieurs, suffit.",
      "Oui. Un lien se déclare au DAF. B est notée par plusieurs personnes, sur la même grille : ton lien ne pèse plus sur le résultat."
    ],
    retenir: "Un lien avec un candidat se déclare, et ce candidat est noté à plusieurs : pas besoin de l'écarter."
  },
  {
    id: "cp13-q19",
    dialecte: "Gestion de projet",
    q: "L'intégrateur Divalto pousse la PA C : « Notre partenaire, un connecteur éprouvé. » Tu apprends qu'il touche une commission sur chaque client apporté. Que fais-tu ?",
    choix: [
      "C reste candidate, même grille, et la commission est écrite",
      "Tu prends C : l'intégrateur connaît Divalto mieux que personne",
      "Tu ne lui demandes plus d'avis, et la DSI note seule les PA",
      "Tu écartes C : avec sa commission, l'avis n'est plus neutre"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Son lien est écrit, et connu du DAF. C passe la même grille ; son avis technique compte, à côté de celui de la DSI.",
      "Non. Il connaît Divalto, mais il a un intérêt à ce choix. Son avis est une donnée parmi d'autres, pas une décision.",
      "Non. Presque : tu te méfies à raison, mais tu perds son savoir sur Divalto. Un avis déclaré vaut mieux qu'aucun avis.",
      "Non. C peut être la bonne, et elle n'a rien fait. La commission est un fait à déclarer, pas une faute de C."
    ],
    retenir: "Un intégrateur partenaire d'une PA garde un avis technique utile : son lien est écrit, et la PA passe la même grille."
  },
  {
    id: "cp13-q20",
    dialecte: "Gestion de projet",
    q: "Tu relis le projet de grille. Il donne 20 points sur 100 au critère « dans la liste officielle des PA ». Les 3 PA consultées y sont. Que fais-tu ?",
    choix: [
      "Tu le gardes à 20 points : c'est le critère le plus sûr",
      "Éliminatoire, et ses 20 points vont aux critères qui départagent",
      "Tu le passes à 40 points, et tu enlèves 20 points au prix",
      "Tu demandes au DAF de fixer lui-même ce poids, puisqu'il valide"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Les 3 ont les 20 points : ce critère ne départage personne. Il prend la place d'un critère qui compte, comme le connecteur.",
      "Oui. La loi est un filtre (module cp18) : dans la liste, ou dehors. Ses 20 points vont aux critères qui font la différence : connecteur, cas en démo, prix sur 3 ans.",
      "Non. Encore plus de points qui ne départagent rien, pris au prix. La loi ne se pèse pas : c'est un filtre, avant toute note.",
      "Non. Le DAF valide la grille, mais il n'a pas à régler ce détail : c'est une erreur de construction, à corriger avant de la lui montrer."
    ],
    retenir: "Une obligation légale ne se pèse pas dans la grille : c'est un critère éliminatoire. Les points vont à ce qui départage."
  },
  {
    id: "cp13-q21",
    dialecte: "Gestion de projet",
    q: "Grille DEMAT. La cheffe comptable veut noter seule tous les critères : « C'est ma compta qui s'en servira. » Que fais-tu ?",
    choix: [
      "Elle note tout : c'est son équipe qui vivra avec la PA",
      "Tu notes tout toi-même, puis la compta relit tes notes",
      "Elle note ses cas en démo, et la DSI le connecteur et la sécurité",
      "Le DAF note tout lui-même : c'est lui qui choisira, à la fin"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Elle juge bien ses cas en démo. Le connecteur, la sécurité, la réversibilité ne sont pas son métier : ses notes y seraient au hasard.",
      "Non. Une seule personne qui note tout se trompe plus, et seule ; relire ne remplace pas noter. Toi, tu calcules le prix sur 3 ans, et tu fais la synthèse.",
      "Oui. Chacun note son domaine : la compta ce qu'elle a vu en démo, la DSI le connecteur et la sécurité. Puis une séance commune pour les gros écarts.",
      "Non. Le DAF choisit entre les finalistes ; il ne note pas le détail. S'il note tout, la grille ne l'éclaire plus : elle devient son avis."
    ],
    retenir: "Dans une grille, chacun note son domaine : le métier ses cas, la DSI la technique et la sécurité."
  },
  {
    id: "cp13-q22",
    dialecte: "Gestion de projet",
    q: "Ta grille met en éliminatoire « un connecteur standard pour Divalto ». L'offre de B est la moins chère et la plus complète. Mais son connecteur serait développé pour vous, au forfait. Que fais-tu ?",
    choix: [
      "B est écartée aujourd'hui, quelles que soient ses autres notes",
      "B reste en course : au forfait, le connecteur a un prix fixe",
      "B perd 15 points sur le connecteur, et reste au classement",
      "Tu présentes B au DAF, avec ce risque écrit en rouge"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Un critère éliminatoire, raté, sort l'offre, quelles que soient ses autres notes. Tu l'écris à B le jour même, poliment, avec la raison.",
      "Non. Le prix est fixe, pas le risque : un connecteur fait pour vous seul est un spécifique, à revoir à chaque version (module cp15).",
      "Non. Presque : tu le pénalises, mais un critère éliminatoire ne se compense pas. Sinon, une offre rachète par le prix ce qui la rend inutilisable.",
      "Non. La règle a été fixée et validée avant les offres : le DAF n'a pas à la rejuger pour une offre. Tu lui diras que B est écartée, et pourquoi."
    ],
    retenir: "Un critère éliminatoire ne se compense pas : raté, l'offre sort, même la moins chère."
  },
  {
    id: "cp13-q23",
    dialecte: "Gestion de projet",
    q: "Deux offres de PA, contrat de 3 ans. A : 1 000 € par mois, mise en service comprise. B : 800 € par mois, plus 9 000 € de mise en service. Laquelle coûte le moins ?",
    choix: [
      "B : 200 € de moins chaque mois",
      "B : 7 200 € de moins sur 3 ans",
      "A : 1 800 € de moins sur 3 ans",
      "A : 9 000 € de moins, la mise en service"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Tu compares un mois, pas le contrat. La mise en service de B se paie aussi.",
      "Non. 36 × 200 = 7 200 €, mais tu oublies les 9 000 € de mise en service de B. Tout compris, B coûte plus.",
      "Oui. A : 36 × 1 000 = 36 000 €. B : 36 × 800 = 28 800 €, plus 9 000 € = 37 800 €. Sur 3 ans, A coûte 1 800 € de moins.",
      "Non. La mise en service ne se compare pas seule : B regagne 7 200 € sur l'abonnement. L'écart réel est de 1 800 €."
    ],
    retenir: "Le prix se compare sur la durée du contrat, tout compris : abonnement et mise en service."
  },
  {
    id: "cp13-q24",
    dialecte: "Gestion de projet",
    q: "Sur 3 ans, la PA A coûte 5 000 € de moins que la B. Mais le connecteur de A demande 25 jours d'intégrateur, contre 10 pour B, à 750 € le jour. Que retiens-tu pour le prix ?",
    choix: [
      "A : 5 000 € de moins ; c'est l'écart entre les deux offres",
      "A, car les jours de l'intégrateur sont dans un autre budget",
      "Tu relances la consultation avec un critère de plus",
      "B : 6 250 € de moins, jours de l'intégrateur compris"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Les offres ne disent pas tout ce que la PA vous coûtera : son connecteur demande 15 jours d'intégrateur de plus, payés aussi par l'entreprise.",
      "Non. Presque : un autre budget, peut-être, mais la même entreprise paie. Le coût sur 3 ans compte tout ce que chaque choix entraîne.",
      "Non. Le critère existe déjà : le prix sur 3 ans. Il manquait un coût, pas une consultation : tu l'ajoutes pour les 2.",
      "Oui. 15 jours de plus pour A : 15 × 750 = 11 250 €. 11 250 - 5 000 = 6 250 € : tout compris, B coûte moins. C'est l'idée du TCO."
    ],
    retenir: "Le coût sur 3 ans compte tout ce que le choix entraîne : l'offre, mais aussi les jours d'intégrateur et la bascule."
  },
  {
    id: "cp13-q25",
    dialecte: "Gestion de projet",
    q: "Les 2 finalistes : A, 1re de la grille ; B, 2e, 15 % moins chère sur 3 ans. Le DAF : « Passe le prix de 20 à 40 points, que B passe devant. » Que fais-tu ?",
    choix: [
      "Tu passes le prix à 40 : il a validé la grille, il peut la changer",
      "Grille telle quelle, et tu lui montres ce que B gagne et perd",
      "Tu refuses B : la grille validée a désigné A, c'est réglé",
      "Tu le préviens, puis tu en parles au DG : il fausse la grille"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Changer les poids après avoir lu les offres, c'est choisir le gagnant d'abord. La grille ne sert plus qu'à habiller ce choix.",
      "Oui. La grille ne bouge pas. Tu montres l'écart : 15 % de moins sur 3 ans, contre un connecteur moins bien noté. S'il choisit B en le sachant, c'est son choix, écrit comme tel.",
      "Non. La grille éclaire, le DAF décide. Il peut prendre la 2e finaliste en connaissant l'écart : tu n'as pas à le lui refuser.",
      "Non. Il n'a rien faussé : il propose, tu expliques, et il peut choisir B ouvertement. Le DG n'a rien à trancher."
    ],
    retenir: "La grille ne se change pas après les offres. Le DAF peut choisir la 2e finaliste, ouvertement, en connaissant l'écart."
  },
  {
    id: "cp13-q26",
    dialecte: "Gestion de projet",
    q: "Offres ouvertes. Ton collègue de la DSI, qui note la sécurité : « Connecteur et sécurité : 35 points, pas 25. La PA B est faible là-dessus. » Que fais-tu ?",
    choix: [
      "Rien ne change ; la faiblesse de B va dans les risques",
      "Tu passes ce critère à 35, et tu baisses le prix d'autant",
      "Tu refais toute la grille, à zéro, avec lui et la compta",
      "Tu écartes B, pour sa faiblesse sur la sécurité"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Les poids ont été fixés avant les offres : la faiblesse de B compte déjà dans sa note. Si elle reste grave, elle va dans les risques de ta note au DAF. La remarque servira pour la prochaine grille.",
      "Non. Changer un poids après avoir lu les offres, c'est viser un candidat. La grille ne mesure plus, elle désigne.",
      "Non. Refaire la grille après les offres, c'est la même erreur en plus grand : chacun pousse les poids de son favori.",
      "Non. La sécurité est notée dans un critère pondéré, pas éliminatoire : une note basse ne sort pas B. Tu l'écartes sur une règle qui n'existe pas."
    ],
    retenir: "Une remarque sur les poids, après les offres : la grille ne change pas ; le risque va dans la recommandation."
  },
  {
    id: "cp13-q27",
    dialecte: "Gestion de projet",
    q: "Démo de la PA A demain, 2 heures, devant Julie et Sophie. Son commercial envoie le déroulé : 1 h 30 sur ses nouveautés, puis des questions. Que fais-tu ?",
    choix: [
      "Tu le laisses dérouler devant elles : il connaît son outil",
      "Ses nouveautés d'abord, puis tes cas s'il reste du temps",
      "Tu fais un essai de 3 semaines sur vos données, à la place",
      "Tes 6 cas réels, les mêmes que pour B et C, joués devant elles"
    ],
    bonne: 3,
    pourquoi: [
      "Non. La démo du vendeur montre ce qui marche chez lui. Julie et Sophie ne verront pas leurs cas, et n'auront rien à noter.",
      "Non. Presque : tes cas sont là, mais à la fin, s'il reste du temps. Il n'en restera pas, et les 3 démos ne seront plus comparables.",
      "Non. 3 semaines par PA, en pleine urgence : la réception attendrait. Un essai se garde pour un doute que la démo ne lève pas.",
      "Oui. Tes cas réels (un avoir fournisseur, une facture sans SIREN, une facture EDI d'AquaBleu…), envoyés avant, les mêmes pour les 3. Julie et Sophie notent ce qu'elles voient."
    ],
    retenir: "Une démo de choix joue tes cas réels, les mêmes pour tous, notés par ceux qui s'en serviront."
  },
  {
    id: "cp13-q28",
    dialecte: "Gestion de projet",
    q: "La PA B, finaliste, annonce « 300 clients, dont plusieurs sous Divalto ». Le connecteur est ton critère le plus lourd. Comment vérifies-tu ce point ?",
    choix: [
      "Tu appelles 2 clients sous Divalto, avec tes questions",
      "Tu lui demandes ses références sous Divalto, par écrit",
      "300 clients, c'est une preuve : rien de plus à vérifier",
      "Tu visites 5 de ses clients sur place, avant toute note"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Des clients comparables, appelés par toi : délais de mise en service, support, rejets, connecteur avec Divalto. Le vendeur choisit ses références : tes questions précises font la différence.",
      "Non. Presque : une liste de références dit qui, pas comment ça se passe. Ce sont les appels qui t'apprennent les retards et les rejets.",
      "Non. Un chiffre commercial n'est pas une preuve, et « plusieurs » peut vouloir dire 2. Sur ton critère le plus lourd, tu vérifies.",
      "Non. 5 visites, pour 2 finalistes, en pleine urgence : des semaines. 2 appels bien préparés en disent presque autant."
    ],
    retenir: "Une référence se vérifie : des clients comparables (sous Divalto, ta taille), appelés avec tes questions."
  },
  {
    id: "cp13-q29",
    dialecte: "Gestion de projet",
    q: "Démo de la PA A. Son chef de projet : « Les avoirs fournisseurs seront dans le connecteur en mars. » Aucun client ne les a encore. Comment le notes-tu ?",
    choix: [
      "Comme acquis : il l'a dit en démo, devant toute la compta",
      "Comme une promesse, et tu la fais écrire dans son offre",
      "Comme acquis, et tu le feras écrire au contrat de la PA",
      "Tu écartes A : une promesse faite en démo ne vaut rien"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Ce qui n'existe chez aucun client n'est pas prouvé. Noté comme acquis, il fait gagner A sur une fonction qui n'existe pas encore.",
      "Oui. Tu notes ce qui existe : une promesse vaut moins qu'une fonction en service. Et tu la fais écrire dans l'offre ; si A gagne, elle ira au contrat, avec sa date (module cp14).",
      "Non. Presque : l'écrire au contrat est juste, mais un contrat ne la fait pas exister. Elle se note comme une promesse.",
      "Non. A peut être la meilleure sur le reste : ce point baisse sa note, il ne l'élimine pas."
    ],
    retenir: "En démo, une promesse se note comme une promesse, pas comme un acquis ; elle s'écrit dans l'offre, puis au contrat."
  },
  {
    id: "cp13-q30",
    dialecte: "Gestion de projet",
    q: "La PA C, finaliste, est bien notée et la moins chère. Elle a 3 ans, 40 clients, et ses derniers comptes publiés montrent une perte. Que fais-tu ?",
    choix: [
      "Rien de spécial : le prix et la démo comptent plus que ses comptes",
      "Tu baisses toutes ses notes de moitié ; le DAF le saura",
      "Tu notes sa solidité sur ces faits, risque écrit pour le DAF",
      "Tu l'écartes : une PA fragile est un risque trop grand"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Une PA qui disparaît, c'est une bascule forcée, en urgence. Sa solidité est un critère de ta grille : il se note.",
      "Non. Tu fais peser la solidité sur tous les critères : la grille ne veut plus rien dire. Elle a son poids, à sa place.",
      "Oui. Tu notes ce critère sur des faits (âge, clients, comptes), comme pour les autres. Ta note au DAF dit le risque, et ce qui le réduit : une réversibilité testée.",
      "Non. La solidité est un critère pondéré, pas éliminatoire : une jeune PA peut être sérieuse. Tu l'écartes sur une règle que ta grille n'a pas."
    ],
    retenir: "La solidité se note sur des faits, à sa place dans la grille ; le risque restant va dans la recommandation."
  },
  {
    id: "cp13-q31",
    dialecte: "Gestion de projet",
    q: "La démo sur vos cas et 2 références ont levé tes doutes sur la PA C, finaliste. Elle propose en plus un essai gratuit de 6 semaines sur vos données. Que fais-tu ?",
    choix: [
      "Tu acceptes : c'est gratuit, et ça ne peut pas nuire",
      "Tu acceptes, mais en 2 semaines, pour lever les derniers doutes",
      "Tu demandes le même essai de 6 semaines aux 2 autres PA",
      "Tu déclines : tes doutes sont levés, tout attendrait"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Gratuit pour elle, pas pour vous : 6 semaines de temps de la compta et de la DSI, et un choix repoussé. Et elle seule aurait cet avantage.",
      "Non. Presque : plus court, mais toujours inutile. Tes doutes sont déjà levés : 2 semaines de plus pour ne rien apprendre.",
      "Non. 6 semaines pour 3 PA, sans doute à lever : le choix glisse en janvier, en pleine clôture annuelle.",
      "Oui. Un essai sert quand un doute fort reste. La démo et les références ont répondu, et la réception est déjà en retard : tu gardes ton calendrier."
    ],
    retenir: "Un essai (POC) se fait seulement si un doute fort reste, après la démo et les références."
  },
  {
    id: "cp13-q32",
    dialecte: "Gestion de projet",
    q: "Autre projet de la DSI : Power BI sur Snowflake. 2 prestataires finalistes. Doute fort : vos 50 millions de lignes de ventes, affichées en moins de 5 secondes ? Que fais-tu ?",
    choix: [
      "Tu prends celui qui promet 2 secondes, par écrit dans son offre",
      "Un essai de 5 jours sur vos données, même scénario pour les 2",
      "Tu prends le moins cher : la performance se réglera après",
      "Un essai de 2 mois chez chacun, en production, avant de choisir"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Presque : l'écrire compte, mais une promesse ne lève pas un doute fort. Le jour où c'est lent, le contrat ne rend pas les tableaux rapides.",
      "Oui. Un doute fort se lève par un test court, sur tes données, avec le même scénario pour les 2. Tu compares des faits, pas des promesses.",
      "Non. Le moins cher, sur un doute fort, c'est parier : si c'est lent, tu paies une 2e fois pour corriger, et les utilisateurs décrochent.",
      "Non. 2 mois en production, c'est un projet, pas un essai : coût, risques sur vos vraies données, et un choix repoussé d'un trimestre."
    ],
    retenir: "Doute fort sur un point critique : un test court sur tes données, le même pour les finalistes, avant de signer."
  },
  {
    id: "cp13-q33",
    dialecte: "Gestion de projet",
    q: "Tu es DSI adjoint. Vous changez d'opérateur EDI (le réseau qui achemine vos messages EDIFACT). Le moins cher n'a jamais échangé avec le réseau d'AquaBleu, 20 % du chiffre d'affaires. Que fais-tu ?",
    choix: [
      "Tu le prends : les opérateurs EDI se relient toujours entre eux",
      "Tu demandes à AquaBleu de passer chez ce nouvel opérateur, moins cher",
      "Un échange test avec AquaBleu avant le choix ; sinon, tu l'écartes",
      "Tu le notes un peu moins bien sur la grille, et tu le gardes"
    ],
    bonne: 2,
    pourquoi: [
      "Non. « Toujours » se vérifie : une interconnexion peut manquer, coûter, ou prendre des semaines. Avec 20 % du chiffre d'affaires en jeu, une supposition ne suffit pas.",
      "Non. AquaBleu ne change pas de réseau pour un fournisseur : c'est à ton opérateur de l'atteindre.",
      "Oui. Échanger avec AquaBleu est vital, donc éliminatoire : l'opérateur le prouve par un vrai message de test, avant le choix. Sans preuve, il sort, même le moins cher.",
      "Non. Presque : tu en tiens compte, mais un critère vital ne se compense pas par le prix. Sans AquaBleu, l'offre la moins chère ne sert à rien."
    ],
    retenir: "Un critère vital (le réseau d'un gros client) se prouve par un test avant le choix ; sans preuve, l'offre sort."
  },
  {
    id: "cp13-q34",
    dialecte: "Gestion de projet",
    q: "Négociation avec A, finaliste. Son prix est déjà le plus bas des deux. Son SLA : support de 9 h à 17 h. Ta compta travaille de 8 h à 18 h. Que fais-tu ?",
    choix: [
      "Tu acceptes son prix, et tu négocies le support de 8 h à 18 h",
      "Tu demandes 10 % de remise en plus : un prix se négocie toujours",
      "Rien de plus : le meilleur prix, et tu fais signer au plus vite",
      "Tu exiges un support 24 h sur 24, 7 jours sur 7, et 10 % de remise"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. On négocie ce qui compte pour toi : ici, le SLA, aux heures de ta compta. Le prix n'est qu'un levier parmi d'autres.",
      "Non. Le prix est déjà le plus bas : 10 % de plus ne règle pas ton vrai risque. Une panne à 8 h 30, sans support, bloque la compta jusqu'à 9 h.",
      "Non. Le prix n'est qu'un point. Signer avec un support qui ouvre après ta compta, c'est accepter 2 heures par jour sans aide.",
      "Non. Ta compta ne travaille pas la nuit : tu paierais un service inutile. Et A refusera tout, ou le facturera cher."
    ],
    retenir: "On ne négocie pas que le prix : le SLA, la réversibilité, le planning comptent souvent plus."
  },
  {
    id: "cp13-q35",
    dialecte: "Gestion de projet",
    q: "Négociation avec la PA A. Son responsable de compte : « 15 % de remise si on ouvre votre réception en février, et pas en novembre. » Que réponds-tu ?",
    choix: [
      "« D'accord : 15 %, et février, c'est dans 3 mois à peine »",
      "« Janvier, et 10 % de remise : coupons la poire en deux »",
      "« Non, elle est déjà obligatoire. Tout le reste se discute »",
      "« Je transmets au DAF : la remise, c'est son budget »"
    ],
    bonne: 2,
    pourquoi: [
      "Non. La réception est obligatoire depuis septembre : chaque mois de plus, l'entreprise reste hors la loi. Une remise ne l'achète pas.",
      "Non. Un compromis sur une obligation légale reste hors la loi, juste un mois de moins. On ne négocie jamais la loi.",
      "Oui. La loi ne s'échange pas contre une remise. Tu restes ouvert sur le reste : le prix, le SLA, le planning du connecteur.",
      "Non. Le DAF décide du contrat, pas de la loi : il n'y a rien à arbitrer. Une remise sur autre chose, oui, il la verra."
    ],
    retenir: "En négociation, tout se discute, sauf la loi : une obligation déjà en vigueur ne s'échange pas contre une remise."
  },
  {
    id: "cp13-q36",
    dialecte: "Gestion de projet",
    q: "La PA B propose 8 % de remise si elle ne garde vos factures que 2 ans, au lieu de la durée légale. Que fais-tu ?",
    choix: [
      "Tu acceptes les 8 % ; l'archivage, tu verras dans 2 ans",
      "Tu refuses net : la loi impose de garder les factures",
      "Tu exiges qu'elle garde tout, et même au-delà de la durée légale",
      "Tu chiffres un archivage ailleurs, puis tu compares les coûts"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Dans 2 ans, il sera tard : la durée légale reste à tenir, et sans solution, l'entreprise est hors la loi. Tu ne sais même pas ce que coûtera la suite.",
      "Non. Presque : la loi impose de garder les factures la durée légale, pas que la PA les garde. Une autre solution peut le faire : il faut la chiffrer.",
      "Non. Au-delà de la durée légale, tu paies pour rien. Et tu exiges ce que la loi ne demande pas.",
      "Oui. L'obligation ne se discute pas ; la façon de la tenir, si. Tu ajoutes au coût sur 3 ans de B le prix d'un archivage ailleurs, sur la durée légale, puis tu compares."
    ],
    retenir: "Jamais sur l'obligation légale ; la façon de la tenir se compare, en coût sur 3 ans."
  },
  {
    id: "cp13-q37",
    dialecte: "Gestion de projet",
    q: "Veille de la signature. A, choisie par le DAF, ajoute 10 % : « Nouveau tarif au 1er décembre. » B, l'autre finaliste, maintient son offre. Que fais-tu ?",
    choix: [
      "Tu acceptes les 10 % : il faut signer, la réception attend",
      "Tu dis à A que B reste possible, et le DAF le sait le jour même",
      "Tu proposes 5 % de plus à A, et le DAF signe le jour même",
      "Tu fais signer B dès demain : A a changé les règles du jeu"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Tu cèdes sans jouer ta solution de rechange : B tient son offre. Et A saura qu'une hausse de dernière minute passe.",
      "Oui. B est ta solution de rechange (ta MESORE) : tu le dis à A, sans le prix de B. Le DAF, qui choisit et signe, le sait le jour même.",
      "Non. Presque : négocier, oui, mais tu donnes 5 % sans faire jouer B. Ta meilleure carte reste dans ta poche.",
      "Non. Choisir entre A, plus chère, et B, c'est au DAF, pas à toi. Et A peut revenir à son offre dès qu'elle saura que B est prête."
    ],
    retenir: "Garde l'autre finaliste jusqu'à la signature : c'est ta solution de rechange en négociation."
  },
  {
    id: "cp13-q38",
    dialecte: "Gestion de projet",
    q: "Démos faites, références appelées. Tu prépares la décision du DAF sur la PA. Que lui présentes-tu ?",
    choix: [
      "Le tableau complet des 3 offres, 40 lignes, sans avis de ta part",
      "Les 2 finalistes, sans avis : c'est à lui de choisir, pas à toi",
      "Ta recommandation seule, A : les autres offres l'embrouilleraient",
      "Les 2 finalistes, notes, coût sur 3 ans, ta recommandation"
    ],
    bonne: 3,
    pourquoi: [
      "Non. 40 lignes sans avis : le DAF refait ton travail, ou choisit au prix. Ton rôle est de lui rendre le choix simple.",
      "Non. Presque : il choisit, oui, mais ton avis fait partie du travail. Sans recommandation, il décide seul sur ce que tu connais le mieux.",
      "Non. Sans l'autre finaliste, il n'a plus de choix : il valide le tien. S'il découvre l'écart plus tard, ta crédibilité y passe.",
      "Oui. Une page : les 2 finalistes, les notes par critère, le coût sur 3 ans, les risques, ta recommandation et sa raison. Le DAF choisit en connaissant l'écart."
    ],
    retenir: "Pour faire choisir : une page, les finalistes, leurs notes, le coût sur 3 ans, les risques, et ta recommandation."
  },
  {
    id: "cp13-q39",
    dialecte: "Gestion de projet",
    q: "Tu recommandes A (78 sur 100). Le DAF choisit B (74), 10 % moins chère sur 3 ans. Il connaît l'écart et ses risques. Que fais-tu ?",
    choix: [
      "D'accord : c'est B. Tu écris ses risques, puis le contrat",
      "Tu reprends 15 minutes avec lui, et tu plaides encore pour A",
      "Tu revois les notes de B, pour que la grille suive son choix",
      "Tu demandes au DG de revoir ce choix, risques en main"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Il choisit, il signe : tu appliques. Ses risques (un connecteur moins bien noté) vont au registre des risques, et le contrat les couvre (module cp14).",
      "Non. Tu as déjà donné ton avis, et il l'a entendu. Revenir à la charge, c'est refaire le débat d'une décision prise.",
      "Non. La grille dit ce que vous avez mesuré. La retoucher pour suivre un choix, c'est la rendre fausse. Le choix de B s'écrit tel quel.",
      "Non. Le sponsor a décidé en connaissant l'écart : c'est une décision, pas un blocage. Le DG n'a rien à trancher."
    ],
    retenir: "Le DAF choisit la 2e finaliste en connaissant l'écart : c'est décidé. Tu appliques, et tu écris le risque."
  },
  {
    id: "cp13-q40",
    dialecte: "Gestion de projet",
    q: "Le DAF a choisi A. La signature est dans 10 jours, après la relecture du contrat. B, l'autre finaliste, demande où en est la décision. Que lui dis-tu ?",
    choix: [
      "Tu lui dis tout de suite qu'elle est écartée, et tu la remercies",
      "Rien : tu lui répondras après la signature avec A",
      "Une date de réponse ; tu la préviens dès la signature avec A",
      "Qu'elle a encore toutes ses chances, pour la garder motivée"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Tant que A n'a pas signé, B est ta solution de rechange. La prévenir tout de suite, c'est la perdre si A change ses conditions.",
      "Non. Le silence est impoli, et B peut retirer son offre. Une date de réponse te garde sa confiance.",
      "Oui. Honnête, sans fermer la porte : une date de réponse, puis l'annonce dès la signature. Jusque-là, B reste ta solution de rechange.",
      "Non. C'est faux : le DAF a choisi A. Un mensonge se découvre, et ta parole ne vaudra plus rien pour B."
    ],
    retenir: "L'autre finaliste est prévenue après la signature, avec une date de réponse d'ici là : elle reste ta solution de rechange."
  },
  {
    id: "cp13-q41",
    dialecte: "Gestion de projet",
    q: "Le contrat avec A est signé. B, l'autre finaliste, et C, sortie plus tôt, attendent une réponse. Que leur envoies-tu ?",
    choix: [
      "Rien : ne pas recevoir de commande, c'est déjà une réponse",
      "Un mot poli, et les points faibles de leur offre, rien sur A",
      "Un mot poli ; le prix de A, pour qu'elles comprennent",
      "Le classement complet, avec les notes et prix de chacune"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Elles ont travaillé 2 semaines sur ta consultation. Le silence abîme ta réputation d'acheteur : en 2029, elles répondront moins bien.",
      "Oui. Une réponse écrite et polie, avec ce qui a pesé contre leur offre à elles. Rien sur l'offre de A : elle reste confidentielle.",
      "Non. Presque : poli et motivé, mais le prix de A est confidentiel. Dis-leur ce qui pèse contre leur offre, pas ce que vaut celle de A.",
      "Non. Les notes et les prix des autres sont confidentiels. Tu exposes A, et tu ouvres des débats sans fin sur chaque note."
    ],
    retenir: "Chaque candidat non retenu reçoit une réponse écrite et polie, sur sa propre offre, jamais sur celle des autres."
  },
  {
    id: "cp13-q42",
    dialecte: "Gestion de projet",
    q: "Tu es DSI adjoint. Janvier 2029 : tu prépares la consultation des PA. Le DAF : « Inutile de consulter la PA actuelle, on connaît son prix. » Que proposes-tu ?",
    choix: [
      "Tu ne la consultes pas : le DAF a raison, son prix est connu",
      "Elle répond, avec 10 points d'avance ; on la connaît bien",
      "Tu lui donnes les prix des autres, pour qu'elle s'aligne",
      "Elle répond aussi, sur la même grille que les autres"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Son prix de 2026 n'est pas son offre de 2029. Tu te prives d'une offre, et peut-être du meilleur choix : rester coûte moins qu'une bascule.",
      "Non. Une avance fixée d'avance fausse la grille. Son vrai avantage, l'absence de bascule, entre dans le coût sur 3 ans des autres.",
      "Non. Les offres des autres sont confidentielles. Tu lui dis seulement si elle est bien placée.",
      "Oui. Elle répond comme les autres ; son bilan (module cp15) nourrit son critère de références. Et son offre, comparée aux autres, est ton meilleur levier."
    ],
    retenir: "Au renouvellement, le prestataire en place répond aussi, sur la même grille ; son bilan nourrit sa note."
  },
  {
    id: "cp13-q43",
    dialecte: "Gestion de projet",
    q: "Tu es DSI adjoint. 2029 : la PA X coûte 6 000 € de moins par an que la PA en place. Passer chez X coûte environ 15 000 € (intégrateur, tests, double abonnement). Que dis-tu au DAF ?",
    choix: [
      "X fait gagner 3 000 € sur 3 ans, bascule comprise",
      "X fait gagner 18 000 € sur 3 ans, 6 000 € par an",
      "X coûte 15 000 € de plus : on reste chez la PA en place",
      "X fait perdre 9 000 € la 1re année : on reste en place"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. 3 × 6 000 = 18 000 € gagnés, moins 15 000 € de bascule : 3 000 €. Le prix ne suffit pas à décider : le reste de la grille départage. Le DAF choisit avant fin mai.",
      "Non. 3 × 6 000 = 18 000 €, mais tu oublies la bascule : 15 000 €. Le gain réel est bien plus petit.",
      "Non. Tu comptes la bascule, mais pas les 18 000 € d'abonnement en moins. Sur 3 ans, X coûte un peu moins.",
      "Non. La 1re année ne dit pas tout : le contrat dure 3 ans. Sur sa durée, X fait gagner 3 000 €."
    ],
    retenir: "Changer de prestataire a un coût : la bascule entre dans le coût sur 3 ans de la nouvelle offre."
  }
];
