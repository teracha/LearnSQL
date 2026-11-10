// Parcours « Maîtriser les outils du chef de projet » — Questions du module ot01 « Outils pour cadrer ».
// Petit QCM (15 questions) : quel outil prendre, comment s'en servir, lire un résultat (calcul, alerte), la règle clé,
// le piège. Outils : note de cadrage (q01 à q05), business case (q06 à q09), matrice RACI (q10 à q12), calculette
// d'estimation (q13 à q15). Règles et mots : ceux des outils (data/outils/gp-*.js) et de leurs cours (cp04, cp05, cp09,
// cp11), mot pour mot ; chaque notion testée est dans le cours ot01. Fil rouge : DEMAT 2027 (fiche de
// docs/plan-chef-de-projet.md, qui fait foi).
// Calculs vérifiés avec le moteur des outils (js/outils.js) : délai de retour 35 000 ÷ 3 000 = 11,67 mois et l'alerte
// « Gain en temps » (q07) ; charge (4 + 4 × 6 + 14) ÷ 6 = 7 jours, durée 7 ÷ 2 = 3,5 semaines (q13) ; 4 en probable :
// (4 + 16 + 14) ÷ 6 = 5,67 jours (q15) ; alertes « Impossible à vérifier » (q02), « Deux A, c'est aucun » (q10), aucune
// alerte quand Julie seule est A (q11), « Personne n'est à 100 % » dès 5 jours par semaine (q14).
// Variantes propres à une question : l'hypothèse sur les prix de la PA en 2029 (q02, le risque « accepté » du registre
// d'exemple) ; l'intégrateur qui démarre sans commande (q05, cp04 §1) ; le DAF qui veut 4 jours (q15).
// Anti-devinette (règles de .claude/agents/expert-chef-projet.md) : bonne réponse = l'action la plus forte dans q02, q04,
// q05 ; « Rien » faux ici (juste dans ot02-q07) ; « Tu gardes » juste dans q15, faux dans q03, q10, q14 ; le DAF juste
// dans q05 et q10, faux dans q04, q11, q14, q15 ; « le jour même » juste dans q05 (faux dans ot02) ; absolus (« seul »,
// « tout ») aussi dans de bonnes réponses (q05, q09, q10).
// Affirmations juridiques : aucune.
LEARNSQL.questions.ot01 = [
  {
    id: "ot01-q01",
    dialecte: "Gestion de projet",
    q: "Octobre 2026. Le DAF : « On passe à la facture électronique. » La cheffe comptable comprend « factures fournisseurs », le commercial « factures clients ». Rien n'est commandé. Quel outil remplis-tu d'abord ?",
    choix: [
      "La note de cadrage, avec la compta et l'ADV",
      "Le business case, pour chiffrer tout de suite les 2 options",
      "La matrice RACI, pour dire qui tranchera entre eux",
      "La calculette d'estimation, pour dater la fin du projet"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Chacun a son projet en tête. La note de cadrage écrit le périmètre et le hors périmètre, avec les métiers, avant de dépenser.",
      "Non. Le business case chiffre des options. Sans périmètre partagé, tu ne sais pas encore quoi chiffrer : fournisseurs, clients, ou les deux ?",
      "Non. Le RACI dit qui réalise et qui approuve chaque livrable. Le périmètre, lui, s'écrit dans la note de cadrage.",
      "Non. On estime des tâches connues. Ici, on ne sait même pas encore ce que le projet doit livrer."
    ],
    retenir: "Avant de dépenser, la note de cadrage met tout le monde d'accord sur le périmètre."
  },
  {
    id: "ot01-q02",
    dialecte: "Gestion de projet",
    q: "Note de cadrage, rubrique « Hypothèses » : « La PA ne monte pas ses prix au renouvellement, en 2029. » Personne ne peut le vérifier : tu choisis l'état « Impossible à vérifier ». Une alerte s'affiche. Que fais-tu ?",
    choix: [
      "Tu la passes en « À vérifier » : l'alerte disparaît",
      "Rien de plus : l'état est écrit, tu la revois en 2029",
      "Tu l'écris aussi au registre des risques, avec sa réponse",
      "Tu la ranges plutôt dans « Contraintes » : c'est imposé"
    ],
    bonne: 2,
    pourquoi: [
      "Non. L'alerte se tait, mais rien n'a changé : personne ne peut la vérifier. Le doute reste caché.",
      "Non. Une hypothèse qu'on ne peut pas vérifier est un risque caché. En 2029, il sera trop tard pour prévoir une marge.",
      "Oui. L'alerte le dit : « Écris aussi cette hypothèse au registre des risques. » Là, elle reçoit une réponse : ici, accepter, avec une marge au budget du run.",
      "Non. Une contrainte est imposée et certaine, comme une date légale. Ici, on ne sait pas : c'est une hypothèse, donc un risque."
    ],
    retenir: "Une hypothèse impossible à vérifier s'écrit aussi au registre des risques."
  },
  {
    id: "ot01-q03",
    dialecte: "Gestion de projet",
    q: "Le DAF dicte un critère de succès : « Améliorer le traitement des factures. » Dans la note de cadrage, « Seuil » et « Comment on mesure » sont vides, et l'outil alerte. Que fais-tu ?",
    choix: [
      "Tu le gardes tel quel : c'est son critère, le seuil viendra",
      "Tu lui proposes : moins de 2 % de rejets, relevé de la PA",
      "Tu bloques la note tant qu'il ne donne pas lui-même la mesure",
      "Tu le remplaces par « 100 % des factures via la PA »"
    ],
    bonne: 1,
    pourquoi: [
      "Non. « Améliorer » ne se mesure pas : au bilan, chacun dira oui ou non selon son humeur. L'alerte demande un seuil, et comment on le mesure.",
      "Oui. Un critère de succès = un chiffre, un seuil ou une date, et comment on le mesure. Tu traduis son souhait en critère de qualité ; il valide.",
      "Non. Bloquer la note retarde tout, pour un détail que tu règles en 5 minutes avec lui. Proposer un chiffre mesurable, c'est ton travail.",
      "Non. Tu changes son critère sans lui, et « Comment on mesure » reste vide : l'alerte reste. Passer par la PA, c'est la loi : ça ne dit rien du traitement."
    ],
    retenir: "Un critère de succès : un chiffre, un seuil ou une date, et comment on le mesure."
  },
  {
    id: "ot01-q04",
    dialecte: "Gestion de projet",
    q: "Ta note de cadrage est prête. Dernière alerte : « Sans validation écrite du sponsor, pas de mandat. » Le DAF répond aussitôt : « OK, vas-y. » Il n'a pas lu. Que fais-tu ?",
    choix: [
      "Tu écris « Le DAF, à l'oral, le 12 octobre » dans « Validée par »",
      "Tu lui envoies la note en PDF, et tu lances les commandes",
      "Tu demandes l'accord écrit de ton DSI, qui l'a lue, lui",
      "Tu lui demandes 20 minutes sur 3 points, puis son accord écrit"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Un oui sans lecture n'engage rien : au premier désaccord, il dira qu'il n'a jamais validé ce périmètre.",
      "Non. Le PDF est utile, mais sans validation écrite, pas de mandat, donc pas de commande. Et il n'a toujours rien lu.",
      "Non. Ton DSI n'est pas le sponsor : il ne décide ni du périmètre, ni du budget. Son accord, même écrit, ne vaut pas mandat.",
      "Oui. 20 minutes sur 3 points clés (périmètre, budget, tolérances), avec tes options. Puis sa validation écrite : elle te permet de dire non ensuite."
    ],
    retenir: "Sans validation écrite du sponsor, pas de mandat : 20 minutes sur 3 points clés, puis son accord écrit."
  },
  {
    id: "ot01-q05",
    dialecte: "Gestion de projet",
    q: "Ta note de cadrage n'est pas encore validée, et aucune commande n'est signée. Tu apprends que l'intégrateur a commencé le paramétrage « pour gagner du temps ». Que fais-tu ?",
    choix: [
      "Tu fais tout arrêter, et tu préviens le DAF le jour même",
      "Tu le laisses finir la semaine, puis tu régularises",
      "Tu lui demandes un devis, à signer après coup",
      "Tu notes l'écart au registre des risques, sans rien bloquer"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Pas de travaux sans note validée ni commande : tu fais arrêter. Le DAF, sponsor et signataire des commandes, le sait le jour même.",
      "Non. Chaque jour fait sans commande sera facturé, sur un périmètre que personne n'a encore validé.",
      "Non. Une commande se signe avant de commencer. Un devis signé après coup valide un travail que personne n'a décidé.",
      "Non. Ce n'est plus un risque, c'est un fait : un prestataire travaille sans commande. Le noter ne l'arrête pas."
    ],
    retenir: "Un prestataire démarre sans note validée ni commande : tu fais arrêter, et le sponsor le sait le jour même."
  },
  {
    id: "ot01-q06",
    dialecte: "Gestion de projet",
    q: "Le DAF : « Le connecteur coûte 35 k€ de plus que le portail seul, sur 3 ans. Ça vaut le coup ? » Quel outil remplis-tu pour lui répondre ?",
    choix: [
      "Le suivi du budget : engagé, consommé, atterrissage",
      "La note de cadrage : sa rubrique « Budget »",
      "Le business case : les options, leur coût et leurs gains",
      "La calculette d'estimation, pour les jours de l'intégrateur"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Il suit le budget pendant le projet, une fois validé. Ici, il faut d'abord choisir entre 2 options.",
      "Non. Cette rubrique donne une fourchette pour le projet. Elle ne compare pas 2 options, ni leurs gains.",
      "Oui. Le business case compare les options : coût complet sur la durée, gains, délai de retour. Puis ta recommandation.",
      "Non. Elle estime la charge d'une tâche. Elle ne dit ni le coût sur 3 ans, ni ce que ça rapporte."
    ],
    retenir: "Comparer des options, leur coût sur la durée et leurs gains : c'est le business case."
  },
  {
    id: "ot01-q07",
    dialecte: "Gestion de projet",
    q: "Business case, option B : surcoût 35 000 €, gain en plus 3 000 € par mois, « Gain en : Temps ». L'outil affiche 11,67 mois et une alerte. Que dis-tu au DAF ?",
    choix: [
      "« B nous fera économiser 36 000 € par an, dès septembre 2027 »",
      "« 12 mois environ, en valeur du temps de compta libéré »",
      "« Le délai est faux : l'alerte dit de ne pas s'en servir »",
      "« A est meilleur : B ne fait gagner que du temps »"
    ],
    bonne: 1,
    pourquoi: [
      "Non. 3 000 € par mois, c'est la valeur des 100 heures libérées. Aucune dépense ne disparaît : ce n'est pas de l'argent économisé.",
      "Oui. 35 000 ÷ 3 000 = 11,67 mois, à partir du gain plein (septembre 2027). L'alerte dit comment le lire : en valeur de temps.",
      "Non. Le calcul est juste. L'alerte dit comment le lire, en valeur de temps ; elle ne dit pas de le cacher.",
      "Non. Un gain en temps a une valeur : 100 heures de compta par mois. Le DAF dira à quoi elles servent."
    ],
    retenir: "Un délai de retour sur un gain en temps se lit en valeur de temps : aucune dépense ne disparaît."
  },
  {
    id: "ot01-q08",
    dialecte: "Gestion de projet",
    q: "Ton business case alerte encore : « Le temps interne compte : écris-le en jours. » La compta, l'ADV et la DSI passeront environ 100 jours sur DEMAT. Que fais-tu ?",
    choix: [
      "Tu ajoutes 21 000 € aux dépenses externes : 100 jours à 210 €",
      "Tu laisses vide : leur temps est déjà payé par l'entreprise",
      "Tu prends ce temps interne sur la réserve pour risques",
      "Tu notes 100 jours en « Temps interne », hors budget"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Le temps interne se compte en jours, pas en euros. Dans les dépenses externes, il gonflerait le budget avec de l'argent qui ne sort pas.",
      "Non. Il n'est pas gratuit : Julie en recette ne traite pas ses factures. Le DAF doit le voir pour choisir.",
      "Non. La réserve paie les risques du registre, sur décision du DAF. Elle ne finance pas le temps des salariés.",
      "Oui. Le temps interne se compte en jours, dans le business case, pas dans le budget. Il n'est pas gratuit, mais il ne sort pas en argent."
    ],
    retenir: "Le temps interne se compte en jours, dans le business case, pas en euros dans le budget."
  },
  {
    id: "ot01-q09",
    dialecte: "Gestion de projet",
    q: "Business case neuf : le DAF a déjà choisi le connecteur, alors tu ne remplis qu'une option. L'outil affiche une alerte. Que fais-tu ?",
    choix: [
      "Tu ajoutes « Ne rien faire » : c'est toujours la référence",
      "Tu ajoutes A, le portail seul : la moins chère en règle",
      "Rien : une option suffit quand le sponsor a choisi",
      "Tu ajoutes 4 options, pour montrer que tout est vu"
    ],
    bonne: 1,
    pourquoi: [
      "Non. « Ne rien faire » sert de référence quand la loi le permet. Ici, la facture électronique est obligatoire : on compare des façons de s'y conformer.",
      "Oui. 2 ou 3 options. Sans « ne rien faire », la référence est la moins chère qui respecte la loi : son surcoût est 0, et celui de B se compare à elle.",
      "Non. L'alerte le dit : une seule option, ce n'est pas un choix. Le DAF doit voir ce qu'il choisit, et contre quoi.",
      "Non. 2 ou 3 options suffisent. Au-delà, la page se noie, et le DAF ne voit plus le choix."
    ],
    retenir: "Un business case compare 2 ou 3 options ; « ne rien faire » seulement si la loi le permet."
  },
  {
    id: "ot01-q10",
    dialecte: "Gestion de projet",
    q: "Matrice RACI, ligne « Format de facture » : tu as mis A au DAF et A à la cheffe comptable. L'outil affiche « Deux A, c'est aucun ». Que fais-tu ?",
    choix: [
      "Tu gardes les 2 A : ils signeront ensemble, c'est plus sûr",
      "Tu enlèves les 2 A ; le comité de pilotage approuvera",
      "Le DAF reste seul A ; elle passe en C, pour son avis",
      "Tu demandes au DG de choisir l'A de chaque livrable"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Deux A, c'est aucun : chacun attend l'autre, ou ils se contredisent. Un seul A par livrable.",
      "Non. Pas de livrable sans A : l'outil afficherait « Personne n'approuve ce livrable ». Et un A est une personne, pas une réunion.",
      "Oui. Le DAF approuve le format (le RACI de DEMAT). La cheffe comptable donne son avis avant (C) : il décide en le connaissant.",
      "Non. Le RACI se valide avec chaque A, puis par le sponsor. Le DG n'a pas à trancher une case de la matrice."
    ],
    retenir: "Un seul A par livrable : les autres avis passent en C, consultés avant la décision."
  },
  {
    id: "ot01-q11",
    dialecte: "Gestion de projet",
    q: "Ligne « PV de recette fournisseurs » : R Julie, A la cheffe comptable. Julie : « Mets-moi A à sa place : je connais les cas mieux que personne. » L'outil n'afficherait aucune alerte. Que réponds-tu ?",
    choix: [
      "« D'accord : un seul A, l'outil ne dit rien »",
      "« Non : l'A, c'est moi, je prépare le PV »",
      "« Non : l'A, c'est le DAF, il approuve tout »",
      "« Non : qui teste n'approuve pas son travail »"
    ],
    bonne: 3,
    pourquoi: [
      "Non. L'outil ne compte que les A. Il ne voit pas qu'un R approuverait son propre travail.",
      "Non. Le chef de projet prépare le PV et le fait signer. Un PV de recette s'approuve par le métier.",
      "Non. Le DAF approuve le budget et les dates, pas chaque PV. L'A d'un livrable du métier vient du métier.",
      "Oui. Le R n'approuve pas son propre travail : Julie teste, sa cheffe signe le PV. Une matrice sans alerte n'est pas forcément juste."
    ],
    retenir: "Une matrice sans alerte n'est pas forcément juste : le R n'approuve pas son propre travail."
  },
  {
    id: "ot01-q12",
    dialecte: "Gestion de projet",
    q: "Ligne « PV de recette fournisseurs » : A la cheffe comptable. Elle sera en congé du 12 au 30 avril, et le PV est prévu le 30 avril. Que fais-tu dans la matrice ?",
    choix: [
      "Tu mets en A la personne qu'elle désigne avant, par écrit",
      "Rien : le PV attendra son retour, début mai",
      "Tu mets A à Julie : elle a joué tous les cas",
      "Tu décales le PV et le pilote après son retour"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Un A absent quand sa décision tombe désigne avant, par écrit, qui approuve à sa place. Tu mets la matrice à jour ; le DAF est informé.",
      "Non. Le PV ouvre le pilote du 3 mai. Attendre son retour décale tout le chemin critique.",
      "Non. Julie teste : elle est R. Le R n'approuve pas son propre travail.",
      "Non. Décaler le pilote pour un congé connu, c'est trop cher : une désignation écrite suffit."
    ],
    retenir: "Un A absent quand sa décision tombe désigne avant, par écrit, qui approuve à sa place."
  },
  {
    id: "ot01-q13",
    dialecte: "Gestion de projet",
    q: "300 fiches clients sans SIREN à compléter. L'ADV estime : 4 jours au mieux, 6 probablement, 14 au pire. Elle y passe 2 jours par semaine. Que t'affiche la calculette ?",
    choix: [
      "Charge 8 jours ; au planning, 4 semaines",
      "Charge 7 jours ; au planning, 3,5 semaines",
      "Charge 42 jours ; au planning, 21 semaines",
      "Charge 7 jours ; au planning, 1,4 semaine"
    ],
    bonne: 1,
    pourquoi: [
      "Non. 8, c'est la moyenne simple : (4 + 6 + 14) ÷ 3. La calculette pondère le probable : (O + 4 × P + Pe) ÷ 6.",
      "Oui. (4 + 4 × 6 + 14) ÷ 6 = 42 ÷ 6 = 7 jours de charge. Durée = 7 ÷ 2 = 3,5 semaines : au planning, on met la durée.",
      "Non. 42, c'est la somme pondérée, avant de la diviser par 6. La charge est de 7 jours.",
      "Non. La charge est juste, mais la durée divise par 5 jours. L'ADV n'en a que 2 par semaine pour ça."
    ],
    retenir: "Charge = (O + 4 × P + Pe) ÷ 6 ; durée = charge ÷ disponibilité, en semaines."
  },
  {
    id: "ot01-q14",
    dialecte: "Gestion de projet",
    q: "Julie estime ses cas de test à 6 jours, sûre d'elle : 6, 6 et 6. Pour finir vite, tu mets sa disponibilité à 5 jours par semaine. Une alerte s'affiche. Que fais-tu ?",
    choix: [
      "Tu gardes 5 par semaine : l'alerte vise les consultants",
      "Tu baisses ses 3 chiffres à 3 jours, pour qu'elle aille plus vite",
      "Tu demandes au DAF de la libérer à plein temps",
      "Tu prends ses vrais jours avec sa cheffe : 1 par semaine"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Personne n'est à 100 % : Julie a aussi ses factures et la clôture. L'alerte vaut pour tout le monde.",
      "Non. Une estimation baisse quand le contenu baisse, pas sous la pression. Et c'est Julie qui estime, pas toi.",
      "Non. Le temps de Julie, c'est sa cheffe qui le donne. À plein temps sur les tests, ses factures n'auraient plus personne.",
      "Oui. Durée = charge ÷ disponibilité. Sa cheffe lui donne 2 matinées par semaine, soit 1 jour : 6 semaines au planning."
    ],
    retenir: "Durée = charge ÷ disponibilité : on compte les vrais jours de la personne, jamais 5 sur 5."
  },
  {
    id: "ot01-q15",
    dialecte: "Gestion de projet",
    q: "Fiches sans SIREN : la calculette donne 7 jours de charge. Le DAF : « C'est trop. Mets 4, c'est l'optimiste de l'ADV. » Que fais-tu ?",
    choix: [
      "Tu mets 4 dans les 3 colonnes : c'est le sponsor qui décide",
      "Tu mets 4 en probable : la charge tombe à 5,67 jours",
      "Tu gardes 7 ; moins de temps, ce serait moins de contenu",
      "Tu refuses ; tu demandes au DG de trancher"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Le planning serait faux dès le départ. Le sponsor décide du contenu et des dates, pas de la charge d'une tâche.",
      "Non. Le calcul serait juste, mais l'estimation de l'ADV, baissée sous la pression. La tâche ne raccourcit pas pour autant.",
      "Oui. Une estimation baisse quand le contenu baisse, pas sous la pression. Moins de temps ? Moins de contenu à la date, le reste après : le DAF choisit.",
      "Non. Pas besoin du DG : le DAF n'a pas encore vu l'option chiffrée. On ne passe pas au-dessus du sponsor pour une estimation."
    ],
    retenir: "Une estimation baisse quand le contenu baisse, pas sous la pression."
  }
];
