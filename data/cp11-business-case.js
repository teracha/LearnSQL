// Chef de projet SI — Questions du module cp11 « Budget et business case ».
// Fond (PRINCE2 : business case revu à chaque étape, bénéfices confiés au métier et revus après le projet ; PMBOK :
// business case, gestion des bénéfices, réserve liée aux risques ; contrôle de gestion : TCO, ROI simple, délai de
// retour, CAPEX / OPEX, actualisation) : le business case (problème ou obligation, options dont « ne rien faire » quand
// c'est possible, coûts, gains, risques, recommandation, hypothèses ; avant d'engager, puis mis à jour) ; le TCO (externe
// ET interne, projet ET run, sortie, réserve tirée du registre, double comptage) ; les gains (calcul, mesure contre
// estimation, temps libéré ≠ argent économisé, qualitatif à part, preuve, montée en charge, responsable métier) ; ROI et
// délai de retour (formules, gain net, ce qui diffère entre options, limites, VAN au contrôleur de gestion, projet
// obligatoire) ; CAPEX / OPEX (le contrôleur de gestion classe, le chef de projet détaille ; abonnement = charge ; charge
// ≠ argent qui sort) ; présenter et défendre (fourchette puis chiffre, tolérance, sponsor qui décide en connaissant le
// prix, mise à jour, mesure des gains, arrêt possible d'un projet non obligatoire).
// Fil rouge DEMAT 2027 (fiche fil rouge de docs/plan-chef-de-projet.md, qui fait foi), ligne « Budget et business case
// (modules cp11, cp12) » : TCO sur 3 ans (durée du contrat de la PA) = dépenses externes + temps interne (en jours, pas
// dans le budget) ; budget de référence 80 k€ validé par le DAF en novembre 2026, après les contrats (abonnement 850 € par
// mois, 30,6 k€ ; mise en service au forfait 7,4 k€ ; intégrateur 40 jours à 750 €, 30 k€, en régie ; formation et tests
// 4 k€ ; réserve 8 k€, liée au registre, chaque dépense par commande ou avenant signé par le DAF) ; abonnement = OPEX,
// le contrôleur de gestion dit le CAPEX ; tolérance : sous 90 k€, sinon le DAF décide, prévenu le jour même ; « ne rien
// faire » impossible. Sophie : environ 400 factures par mois hors connecteur, 2 jours par mois (comme cp15-q35).
// Aucun montant d'amende. Plan B, gel, 15 mars : inchangés.
// q03, q06, q12, q14, q27, q30, q37 : « Tu es DSI adjoint » (sans portefeuille : cp25). q25, q31, q35, q41, q42 : projet
// Snowflake + Power BI. q03, q06, q14, q30 : migration Divalto (q06 : une version majeure tous les 6 ans environ).
// Faits ajoutés (scénarios, cohérents avec la fiche, à valider) : 2 000 factures fournisseurs par mois (8 000 en tout :
// les 400 hors connecteur = 5 %) ; ressaisie de 4 minutes par facture, 1 minute de contrôle après le connecteur (100
// heures gagnées par mois) ; coût horaire chargé d'une comptable : 30 € (210 € la journée de 7 heures) ; temps interne
// du projet : environ 100 jours ; option A (portail seul, ressaisie) : environ 45 k€ sur 3 ans ; gain plein quand les
// fournisseurs PME émettent (1er septembre 2027) ; 20 erreurs de saisie par mois, 30 minutes chacune (q16) ; mesure de
// Julie sur 50 factures (q17) ; 2 400 factures en janvier 2027 (q39) ; chiffres des exemples (q12, q14, q24, q25, q27,
// q37, q41, q42).
// Affirmations comptables hors fiche (générales, à faire vérifier) : un CAPEX est immobilisé et amorti sur sa durée
// d'utilisation, un OPEX est une charge de l'année (cours, q34) ; le classement change la charge de l'année, pas la date
// du paiement (q34) ; des jours en régie peuvent créer un bien immobilisé, une partie d'un projet peut rester en charges
// (q32) ; des crédits de calcul payés d'avance restent une charge (q35) ; pas de seuil de montant pour une consommation
// (q35) ; l'actualisation (VAN) se fait au taux de l'entreprise, par le contrôleur de gestion (q30).
// Déjà publiées ailleurs, pas reprises ici : cp01-q12, q14 et q30, cp04-q11, q35, q38 et q39, cp07-q29, cp13-q23, q24
// et q43, cp15-q35.
// Frontières : suivre le budget pendant le projet (engagé, facturé, reste à faire, atterrissage) = cp12 ; la fourchette
// du cadrage = cp04 ; le prix de chaque offre sur 3 ans = cp13 ; le registre des risques = cp07 ; la régie au jour le
// jour = cp15 ; choisir entre projets = cp25 ; budget SI annuel = cp27.
// Anti-devinette : la bonne réponse est un extrême dans 9 questions sur 42 : la plus douce qui suffit (q08, q17, q19,
// q21, q32, q37, q42), la plus forte quand elle se justifie (q09, q41). « TCO / sur 3 ans / tout compris »,
// « ROI / retour », « prudent », « réserve », « fourchette », « mesure », « qualitatif », « contrôleur », « DAF », des
// chiffres et des dates sont aussi dans des choix faux ; « Rien », « Oui », « tel quel », « toujours », « jamais »,
// « dès aujourd'hui », « le jour même » aussi dans des bonnes réponses. Le chiffre le plus prudent (coût le plus haut,
// gain le plus bas, date la plus tardive) n'est juste que dans q16, q17, q19 et q22.
LEARNSQL.questions.cp11 = [
  {
    id: "cp11-q01",
    dialecte: "Gestion de projet",
    q: "Octobre 2026. Le DAF : « DEMAT est obligatoire. Pas besoin de business case : lance les commandes. » Que lui réponds-tu ?",
    choix: [
      "D'accord : obligatoire veut dire sans dossier ; tu lances",
      "Un business case court : comment se conformer, à quel prix",
      "Un business case complet de 20 pages, ROI sur 5 ans compris",
      "Un business case qui compare DEMAT à « ne rien faire »"
    ],
    bonne: 1,
    pourquoi: [
      "Non. La loi dit qu'il faut le faire, pas comment ni à quel prix. Sans options chiffrées, le DAF signe des commandes sans savoir ce qu'il achète.",
      "Oui. La loi impose le résultat, pas la façon. 2 à 4 pages : le portail seul ou le connecteur, leur coût sur 3 ans, leurs gains, les risques, ta recommandation. Le DAF choisit en connaissant le prix.",
      "Non. Trop lourd, et à côté : un ROI ne décide pas d'un projet obligatoire. Des semaines d'écriture, alors que la réception est déjà en retard.",
      "Non. Presque : comparer est juste, mais « ne rien faire » est interdit par la loi. On compare des façons de s'y conformer."
    ],
    retenir: "Projet obligatoire : le business case compare les façons de se conformer, pas « faire ou ne rien faire »."
  },
  {
    id: "cp11-q02",
    dialecte: "Gestion de projet",
    q: "Ta page de synthèse du business case DEMAT : les 2 options, leur coût sur 3 ans, leurs gains, les risques, ta recommandation. Que manque-t-il ?",
    choix: [
      "Rien : tout y est, et le DAF préfère les pages courtes",
      "Le coût des 40 jours de l'intégrateur, tâche par tâche",
      "Un ROI sur 10 ans, pour montrer que le projet rapporte",
      "Les hypothèses : volumes, minutes, coût horaire, dates du gain"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Sans hypothèses, personne ne peut vérifier tes chiffres. Au 1er doute sur un gain, tout le dossier tombe.",
      "Non. Ce détail va en annexe, ou dans la vérification du devis (module cp13). La page de synthèse se lit en 2 minutes.",
      "Non. Le contrat de la PA dure 3 ans : 10 ans de gains seraient de la fiction. Et un ROI ne décide pas d'un projet obligatoire.",
      "Oui. 2 000 factures par mois, 3 minutes gagnées, 30 € de l'heure, gain plein en septembre 2027 : chaque chiffre se vérifie. Le DAF voit sur quoi repose le calcul."
    ],
    retenir: "Un business case écrit ses hypothèses : sans elles, ses chiffres ne se vérifient pas."
  },
  {
    id: "cp11-q03",
    dialecte: "Gestion de projet",
    q: "Tu es DSI adjoint. Business case de la migration de votre Divalto vers sa prochaine version majeure. Le DG : « Notre Divalto marche. Pourquoi ne pas rester comme on est ? » Que fais-tu ?",
    choix: [
      "Tu lui dis que rester n'est jamais une option en informatique",
      "Tu retires la migration du plan : le DG n'y croit pas",
      "« Rester » devient l'option 0, avec ce qu'elle coûte vraiment",
      "« Rester » devient l'option 0, chiffrée à 0 € : rien ne change"
    ],
    bonne: 2,
    pourquoi: [
      "Non. « Jamais » ne convainc pas un DG, et c'est faux : rester est parfois le bon choix. Montre plutôt ce que ça coûte.",
      "Non. Le DG pose une vraie question, pas un refus. Sans réponse chiffrée, la migration reviendra plus tard, en urgence.",
      "Oui. « Ne rien faire » est l'option de référence : une version qui vieillit, des contournements, des risques, des spécifiques à maintenir. La migration se compare à elle, et le DG voit l'écart.",
      "Non. Presque : la bonne option 0, mais rester n'est pas gratuit. Le temps passé à contourner, les risques, la version qui vieillit : ils se chiffrent."
    ],
    retenir: "Quand c'est possible, « ne rien faire » est l'option 0 du business case, avec ce qu'elle coûte vraiment."
  },
  {
    id: "cp11-q04",
    dialecte: "Gestion de projet",
    q: "Octobre 2026. Le DAF : « Le business case, on le fera en novembre, avec les vrais prix des contrats. » Que proposes-tu ?",
    choix: [
      "Une version courte dès aujourd'hui, puis à jour après les contrats",
      "D'accord : en novembre, les chiffres seront enfin justes",
      "Pas de contrats avant un business case complet, au k€ près",
      "Une version complète maintenant, et plus aucune mise à jour ensuite"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Les contrats engagent 3 ans : le DAF doit savoir avant pourquoi, et pour quelle option. En octobre, une fourchette suffit (60 à 90 k€). En novembre, tu mets à jour avec les prix signés.",
      "Non. Le business case sert à décider, avant d'engager. Fait après les contrats, il ne justifie plus rien : il constate.",
      "Non. Au k€ près, c'est impossible avant les offres. Attendre ce chiffre retarde les contrats, alors que la réception est déjà en retard.",
      "Non. Presque : le faire maintenant est juste, mais les chiffres d'octobre sont des estimations. Sans mise à jour après les contrats, le business case devient faux."
    ],
    retenir: "Le business case se fait avant d'engager, en fourchette, puis se met à jour avec les vrais prix."
  },
  {
    id: "cp11-q05",
    dialecte: "Gestion de projet",
    q: "Le DAF relit ton business case : « 100 jours de temps interne ? On paie déjà ces salaires : ça ne coûte rien au projet. » Que réponds-tu ?",
    choix: [
      "Il a raison : ces 100 jours ne coûtent rien, tu les retires",
      "Tu les convertis en euros, et tu les ajoutes au budget du projet",
      "Tu les gardes, en jours : en recette, Julie ne fait pas ses factures",
      "Tu demandes au DG de trancher : le DAF sous-estime le projet"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Ces salaires sont payés, mais ce temps ne sert plus ailleurs. 100 jours de compta, d'ADV et de DSI pris par le projet, c'est du travail courant qui attend.",
      "Non. Presque : le temps compte, mais ici il se compte en jours dans le business case, pas dans le budget. Le budget suit les dépenses externes.",
      "Oui. Le temps interne n'est pas gratuit : il se prend sur le travail courant. En jours, dans le business case, il montre ce que le projet demande aux équipes, et quand.",
      "Non. Un désaccord de méthode ne monte pas au DG. Tu l'expliques au DAF, avec un exemple : la recette de mars."
    ],
    retenir: "Le temps interne n'est pas gratuit : il se compte, ici en jours, dans le business case."
  },
  {
    id: "cp11-q06",
    dialecte: "Gestion de projet",
    q: "Tu es DSI adjoint. Business case de la migration de votre Divalto vers sa prochaine version majeure. Vous changez de version tous les 6 ans environ. L'intégrateur chiffre le coût total sur 3 ans, « comme pour la PA ». Sur quelle durée comptes-tu le TCO ?",
    choix: [
      "3 ans, comme pour la PA : la durée habituelle d'un TCO",
      "1 an : l'horizon du budget annuel de la DSI",
      "12 ans, deux versions : la migration pèse moins par an",
      "6 ans : sa durée de vie, jusqu'à la migration suivante"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Il n'y a pas de durée habituelle : 3 ans, c'est le contrat de la PA. Votre Divalto vit plus longtemps : sur 3 ans, le run et les gains des années 4 à 6 disparaissent.",
      "Non. 1 an, c'est la vue du budget annuel (module cp27). Sur 1 an, la migration paraît énorme, et tout le run qui suit disparaît.",
      "Non. Deux versions, c'est deux migrations : au-delà de la vie de celle-ci, coûts et gains deviennent de la fiction.",
      "Oui. Le TCO se compte sur la durée du contrat, ou sur la vie de la solution : ici, environ 6 ans, jusqu'à la version suivante. Tu écris cette durée dans tes hypothèses."
    ],
    retenir: "Le TCO se compte sur la durée du contrat ou de la vie de la solution, pas sur une durée toute faite."
  },
  {
    id: "cp11-q07",
    dialecte: "Gestion de projet",
    q: "Novembre 2026, contrats signés. PA : 850 € par mois pendant 3 ans, plus 7,4 k€ de mise en service. Intégrateur : 40 jours à 750 €. Formation et tests : 4 k€. Réserve : 8 k€. Quel budget présentes-tu au DAF ?",
    choix: [
      "80 k€, réserve comprise, et le temps interne à part, en jours",
      "72 k€ : la réserve ne sera peut-être jamais dépensée",
      "59,6 k€ : 1 an d'abonnement, puis tout le reste",
      "101 k€ : les 80 k€, plus 100 jours de temps interne à 210 €"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. 30,6 + 7,4 + 30 + 4 + 8 = 80 k€. La réserve est dans le budget, liée au registre des risques. Le temps interne se compte en jours, dans le business case.",
      "Non. Sans réserve, le 1er risque qui arrive fait sortir du budget. Elle ne se dépense que sur décision du DAF, mais elle se prévoit.",
      "Non. Le budget couvre les 3 ans du contrat : 36 mois d'abonnement, pas 12. Il manque 20,4 k€.",
      "Non. Le temps interne compte, mais en jours, dans le business case, pas en euros dans le budget. Le budget suit les dépenses externes."
    ],
    retenir: "Le budget de DEMAT : 80 k€ de dépenses externes sur 3 ans, réserve comprise ; le temps interne, en jours, à part."
  },
  {
    id: "cp11-q08",
    dialecte: "Gestion de projet",
    q: "Ton budget DEMAT a une réserve de 8 k€, tirée des risques du registre. L'intégrateur conseille d'ajouter 15 % sur chaque ligne, « par sécurité », sans risque précis. Que fais-tu ?",
    choix: [
      "Tu ajoutes 15 % partout : on n'est jamais trop prudent",
      "Tu remplaces la réserve par 15 % sur chaque ligne : plus simple",
      "15 % sur l'intégrateur seulement : la régie est un risque",
      "Tu gardes la réserve seule, chaque euro lié à un risque"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Tu comptes deux fois la même prudence : environ 11 k€ de plus, sans raison écrite, même sur des prix signés. Le budget passerait à près de 91 k€, au-delà de la tolérance.",
      "Non. Une marge partout ne dit plus pour quels risques elle existe. Elle se dépense sans qu'on sache pourquoi.",
      "Non. Presque : la régie est un vrai risque. Mais un risque se nomme au registre, avec son coût, et la réserve le couvre. 15 % à vue, c'est une marge sans raison écrite.",
      "Oui. Une réserve liée à des risques nommés se défend et se suit. Des marges en plus, partout, compteraient deux fois la même prudence."
    ],
    retenir: "Une seule réserve, liée aux risques du registre : une marge en plus sur chaque ligne, c'est compter deux fois."
  },
  {
    id: "cp11-q09",
    dialecte: "Gestion de projet",
    q: "Le DAF relit ton budget : « Ta réserve pour risques de 8 k€, d'où sort ce chiffre ? » Que lui réponds-tu ?",
    choix: [
      "« L'intégrateur conseille 8 k€ : il en prévoit sur tous ses projets »",
      "« Du registre : les risques acceptés, chacun avec son coût »",
      "« C'est l'usage : 10 % du budget, sur tous les projets »",
      "« Des risques et des coûts qu'on a pu oublier de chiffrer »"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Ses autres projets ne sont pas le tien. La réserve vient de TES risques, notés dans TON registre.",
      "Oui. Chaque risque accepté du registre (module cp07) a un coût s'il arrive : un intérimaire pour la recette, quelques jours d'intégrateur. Leur total donne la réserve. Le DAF peut les relire un par un.",
      "Non. Un pourcentage ne dit pas à quoi il sert. Le DAF le coupera au 1er arbitrage, et tu ne sauras pas le défendre.",
      "Non. Un oubli se corrige en chiffrant, pas avec une réserve. Elle couvre des risques nommés, pas des trous dans le budget."
    ],
    retenir: "La réserve pour risques se tire du registre : des risques nommés, chacun avec son coût."
  },
  {
    id: "cp11-q10",
    dialecte: "Gestion de projet",
    q: "Ton DSI te conseille : « Ne montre pas ta réserve de 8 k€ au DAF. Répartis-la dans les lignes, sinon il la coupera. » Que fais-tu ?",
    choix: [
      "Tu la répartis : une réserve visible finit toujours coupée",
      "Tu la retires : sans réserve, pas de tentation de la dépenser",
      "Une ligne visible, et chaque euro lié à un risque du registre",
      "Tu la montres, puis tu la dépenses sans repasser par lui"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Une réserve cachée se dépense sans décision. Le jour où le DAF la découvre, il ne croit plus aucune ligne. Et une réserve qui se défend n'est pas toujours coupée.",
      "Non. Sans réserve, chaque risque qui arrive devient un dépassement, et une décision en urgence.",
      "Oui. Visible et liée aux risques, elle se défend ligne à ligne. Chaque dépense passe ensuite par une commande ou un avenant signé par le DAF.",
      "Non. Presque : la montrer est juste, mais la dépenser reste une décision du DAF. À chaque fois, une commande ou un avenant signé par lui."
    ],
    retenir: "La réserve est une ligne visible, liée aux risques ; chaque euro dépensé passe par une décision du DAF."
  },
  {
    id: "cp11-q11",
    dialecte: "Gestion de projet",
    q: "Ton TCO de l'option B, le connecteur, compte les jours de la compta jusqu'à la bascule de juin 2027, pas après. Ensuite, Sophie déposera environ 400 factures par mois sur le portail de la PA : 2 jours par mois. Que fais-tu ?",
    choix: [
      "Au TCO, en temps interne : 2 jours par mois jusqu'en 2029",
      "Rien : après la bascule, c'est du run, plus du projet",
      "Tu les ajoutes au budget : 2 jours à 210 € chaque mois",
      "Tu fais chiffrer à l'intégrateur un spécifique pour les supprimer"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Le TCO couvre toute la durée, run compris : de juin 2027 à la fin du contrat de la PA, en temps interne. L'option B coûte aussi ces 2 jours par mois.",
      "Non. Le TCO compte le run : sans lui, l'option B paraît moins chère qu'elle ne l'est. Le contrat de la PA court jusqu'en 2029.",
      "Non. Presque : ce temps compte, mais en jours, dans le business case. Le budget suit les dépenses externes.",
      "Non. Trop tôt : la bascule n'a pas eu lieu, et rien ne dit combien de temps ces 400 factures dureront. Un spécifique se décide sur des chiffres réels (module cp15)."
    ],
    retenir: "Le TCO compte le run, temps interne compris, jusqu'à la fin de la durée choisie."
  },
  {
    id: "cp11-q12",
    dialecte: "Gestion de projet",
    q: "Tu es DSI adjoint. Deux GED (gestion électronique des documents), sur 3 ans. X coûte 10 000 € de moins que Y, mais facture 20 000 € l'export de vos documents à la sortie. Chez Y, il est inclus. Que dis-tu au DAF ?",
    choix: [
      "X : il coûte 10 000 € de moins ; la sortie, on verra",
      "X, et tu négocieras l'export le jour où vous partirez",
      "Ni l'un ni l'autre : tu relances, export gratuit exigé",
      "Y : sortie comprise, il coûte en fait 10 000 € de moins que X"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Tu oublies la sortie : 20 000 € le jour où vous partez. Sortie comprise, X coûte 10 000 € de plus.",
      "Non. Le jour du départ, tu n'as plus de levier : tu paieras les 20 000 €. Une sortie se négocie avant de signer, ou se compte.",
      "Non. Y inclut déjà l'export : inutile de tout relancer. Le TCO, sortie comprise, suffit à départager.",
      "Oui. X : 10 000 € de moins, plus 20 000 € de sortie, soit 10 000 € de plus que Y. Le TCO compte la sortie : rester chez X pour éviter les 20 000 €, c'est déjà être enfermé."
    ],
    retenir: "Le TCO compte la sortie : un export payant à la fin peut changer le classement."
  },
  {
    id: "cp11-q13",
    dialecte: "Gestion de projet",
    q: "Octobre 2026. A, le portail seul : environ 45 k€ sur 3 ans, et la ressaisie des factures fournisseurs continue. B, le connecteur : environ 80 k€, et 100 heures de ressaisie en moins par mois. Le DAF : « A coûte moins cher. » Que lui montres-tu ?",
    choix: [
      "Rien de plus : A coûte 35 k€ de moins, c'est clair",
      "B : 35 k€ de plus, et 100 heures de compta rendues par mois",
      "B : 108 k€ gagnés sur 3 ans, 100 heures à 30 € pendant 36 mois",
      "A d'abord, puis le connecteur quand le budget le permettra"
    ],
    bonne: 1,
    pourquoi: [
      "Non. 35 k€ de dépenses en moins, mais la ressaisie reste : 100 heures par mois, pendant 3 ans. Le TCO compte aussi le temps interne.",
      "Oui. L'écart réel : 35 k€ de plus pour B, contre 100 heures de compta par mois. Le DAF choisit en connaissant les deux. Tu recommandes B.",
      "Non. 36 mois de gain, c'est faux : il commence après la bascule. Et c'est du temps libéré, pas de l'argent économisé.",
      "Non. Plus tard, le connecteur coûte la mise en service et une partie du travail de l'intégrateur refait. Et la ressaisie dure jusque-là."
    ],
    retenir: "Comparer des options : les dépenses ET le temps interne, sur la même durée."
  },
  {
    id: "cp11-q14",
    dialecte: "Gestion de projet",
    q: "Tu es DSI adjoint. Migration Divalto : l'intégrateur chiffre 100 jours, 75 k€, « hors adaptation de vos 25 spécifiques : devis séparé ». À la dernière migration, adapter ces mêmes 25 spécifiques avait pris 15 jours. Quel chiffre donnes-tu au DAF pour son budget ?",
    choix: [
      "75 k€ : c'est le chiffre écrit sur le devis de l'intégrateur",
      "Aucun chiffre : la dernière fois ne prouve rien, attends le devis",
      "Environ 86 k€ : 15 jours de plus, comme la dernière fois",
      "Environ 94 k€ : 25 jours de plus, un par spécifique"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Le devis exclut les spécifiques : 75 k€ n'est pas le coût. Le DAF découvrira le reste en cours de route.",
      "Non. La dernière fois ne prouve pas tout, mais c'est une référence mesurée : bien mieux que rien. Le DAF a besoin d'un ordre de grandeur pour son budget.",
      "Oui. 15 × 750 = 11 250 € : environ 86 k€, en attendant le devis séparé. Tu dis d'où vient le chiffre. Le temps interne des tests s'ajoute, en jours.",
      "Non. Presque : tu comptes les spécifiques, mais « un jour chacun » ne repose sur rien. Ta référence de la dernière fois, 15 jours, est plus solide."
    ],
    retenir: "Un poste « sur devis séparé » se chiffre quand même, avec la meilleure référence disponible, et sa source."
  },
  {
    id: "cp11-q15",
    dialecte: "Gestion de projet",
    q: "2 000 factures fournisseurs par mois. Aujourd'hui, la ressaisie prend 4 minutes par facture. Avec le connecteur, il reste 1 minute de contrôle. Combien d'heures par mois la compta gagne-t-elle ?",
    choix: [
      "100 heures : 3 minutes gagnées sur chaque facture",
      "Environ 133 heures : les 4 minutes de chaque facture",
      "Environ 33 heures : la minute de contrôle, 2 000 fois",
      "50 heures : le calcul divisé par 2, pour rester prudent"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. 4 - 1 = 3 minutes gagnées. 3 × 2 000 = 6 000 minutes, soit 100 heures par mois.",
      "Non. Tu oublies la minute de contrôle qui reste : le gain n'est jamais de 100 %.",
      "Non. 33 heures, c'est le temps de contrôle qui reste, pas le temps gagné.",
      "Non. La prudence passe par des hypothèses mesurées, pas par une moitié au hasard. Ici, le calcul est simple et vérifiable."
    ],
    retenir: "Un gain de temps : volume × minutes gagnées (le temps d'avant, moins celui qui reste)."
  },
  {
    id: "cp11-q16",
    dialecte: "Gestion de projet",
    q: "La ressaisie des factures fournisseurs fait environ 20 erreurs par mois. Chacune prend 30 minutes à corriger : appel, avoir, nouvelle saisie. Que mets-tu dans les gains du connecteur ?",
    choix: [
      "Un gain qualitatif : une erreur évitée ne se chiffre pas",
      "600 heures par mois : 20 erreurs × 30 minutes",
      "120 heures par mois : 10 heures sur 12 mois",
      "10 heures par mois de corrections évitées"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Elle se chiffre très bien : 20 × 30 minutes. Une erreur évitée, c'est du temps, et un fournisseur moins agacé.",
      "Non. 20 × 30 = 600 minutes, pas 600 heures : 10 heures. L'unité change tout.",
      "Non. 10 heures × 12 = 120 heures par an, pas par mois. Mélanger le mois et l'année gonfle le gain 12 fois.",
      "Oui. 20 × 30 = 600 minutes, soit 10 heures par mois : un gain en temps, à côté des 100 heures de ressaisie, sans les recompter."
    ],
    retenir: "Une erreur évitée se chiffre : nombre × temps de correction, avec la bonne unité."
  },
  {
    id: "cp11-q17",
    dialecte: "Gestion de projet",
    q: "La cheffe comptable estime la ressaisie à 10 minutes par facture. Julie, chronométrée sur 50 factures, en met 4. Quel chiffre mets-tu dans le business case ?",
    choix: [
      "10 minutes : la cheffe comptable connaît son service",
      "4 minutes, mesurées sur 50 factures, source écrite",
      "7 minutes : la moyenne des deux, pour ne vexer personne",
      "5 minutes : la mesure sur 50 factures, plus une marge"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Une estimation contre une mesure : la mesure gagne. 10 minutes tripleraient le gain (9 minutes gagnées au lieu de 3), et le bilan après la bascule le montrerait.",
      "Oui. Un chiffre mesuré, avec sa source, se défend devant le DAF et le contrôleur de gestion. Tu montres d'abord la mesure à la cheffe comptable : elle peut la compléter (avoirs, factures difficiles).",
      "Non. Une moyenne entre un chiffre faux et un vrai reste fausse. Le business case n'est pas une négociation.",
      "Non. Presque : tu pars de la mesure, mais une marge d'une minute gonfle le gain d'un tiers (4 minutes gagnées au lieu de 3). Garde le chiffre mesuré."
    ],
    retenir: "Dans un business case, une mesure vaut mieux qu'une estimation : un chiffre mesuré, avec sa source."
  },
  {
    id: "cp11-q18",
    dialecte: "Gestion de projet",
    q: "Ton tableau des gains : « Ressaisie évitée : 100 heures par mois. » Plus bas : « Compta : les 2/3 d'un poste libérés. » Le total les additionne. Le contrôleur de gestion tique. Pourquoi ?",
    choix: [
      "Les 2/3 sont faux : 100 heures, c'est un poste entier",
      "Il manque la minute de contrôle dans les 100 heures",
      "Ce sont les mêmes heures, comptées deux fois",
      "Un gain en part de poste ne se chiffre jamais"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Un temps plein fait environ 150 heures par mois : 100 heures, ce sont bien les 2/3. Le calcul est juste ; c'est le total qui est faux.",
      "Non. Les 100 heures sont déjà nettes : 3 minutes gagnées, contrôle déduit.",
      "Oui. Les 2/3 de poste, ce sont les 100 heures de ressaisie, dites autrement. Additionnées, elles doublent le gain. Un gain, une ligne.",
      "Non. Un gain peut se dire en heures ou en part de poste. Le problème est de le compter deux fois, pas de le chiffrer."
    ],
    retenir: "Double comptage : un même gain, dit de deux façons, ne s'additionne pas."
  },
  {
    id: "cp11-q19",
    dialecte: "Gestion de projet",
    q: "Le DAF lit ta ligne : « 100 heures par mois rendues à la compta. » Il demande : « Combien j'économise, en euros ? » Personne ne partira, et aucun usage n'est prévu pour ces heures. Que réponds-tu ?",
    choix: [
      "« Rien, sauf si ce temps remplace une dépense »",
      "« 36 000 € par an : 1 200 heures à 30 € de l'heure »",
      "« Environ 26 000 € par an : 36 000 €, moins l'abonnement »",
      "« Un poste en moins dès la bascule : environ 36 000 € »"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Du temps libéré n'est pas de l'argent économisé. Il le devient si une dépense disparaît (un intérim, une embauche évitée). Le business case l'écrit en gain de temps ; le DAF décide de son usage.",
      "Non. 1 200 × 30 = 36 000 €, mais c'est la valeur du temps, pas une économie : aucune dépense ne baisse. Le contrôleur de gestion le verra.",
      "Non. Le calcul a l'air plus fin, mais l'erreur reste : ces 36 000 € sont des salaires toujours payés. Aucune dépense ne baisse.",
      "Non. Un poste en moins, c'est une décision de la direction, pas une ligne de ton business case. Et 100 heures font 2/3 d'un poste, pas un poste."
    ],
    retenir: "Du temps libéré n'est pas de l'argent économisé : il le devient seulement si une dépense disparaît."
  },
  {
    id: "cp11-q20",
    dialecte: "Gestion de projet",
    q: "La cheffe comptable : « Avec DEMAT, la clôture sera moins stressante. Mets 20 000 € de gain pour ça. » Que fais-tu ?",
    choix: [
      "Tu mets 20 000 € : c'est son métier, elle sait ce que ça vaut",
      "Tu l'oublies : un gain qui ne se chiffre pas ne compte pas",
      "Tu mets 10 000 € seulement, pour rester prudent",
      "Tu l'écris en gain qualitatif, à part, jamais en euros"
    ],
    bonne: 3,
    pourquoi: [
      "Non. 20 000 € sortis de nulle part : au 1er doute du DAF, tout ton business case devient suspect.",
      "Non. Un gain qualitatif compte : il pèse dans la décision. Il ne se convertit juste pas en euros inventés.",
      "Non. Presque : tu baisses le chiffre, mais il reste inventé. La moitié d'un chiffre sans base n'a pas plus de base.",
      "Oui. Clôture plus sereine, conformité, image : des gains réels, écrits à part, sans euros. Le DAF les pèse lui-même."
    ],
    retenir: "Un gain qualitatif s'écrit à part, sans euros inventés."
  },
  {
    id: "cp11-q21",
    dialecte: "Gestion de projet",
    q: "Le commercial veut ajouter au business case : « Avec DEMAT, AquaBleu nous commandera 10 % de plus. » Rien ne l'annonce chez AquaBleu. Que fais-tu ?",
    choix: [
      "Tu l'ajoutes : 10 % d'AquaBleu, c'est 2 % du chiffre d'affaires",
      "Tu lui demandes sa preuve ; sans preuve, gain qualitatif",
      "Tu l'ajoutes à 5 % seulement, pour rester réaliste",
      "Tu refuses, et tu préviens le DAF le jour même"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Le calcul est juste (AquaBleu fait 20 % du chiffre d'affaires), mais l'hypothèse ne repose sur rien. Un gain sans preuve fait douter de tout le dossier.",
      "Oui. Un gain se prouve : une demande écrite d'AquaBleu, un appel d'offres qui l'exige. Sans preuve, il reste un gain possible, écrit à part, sans chiffre.",
      "Non. Moitié moins, mais toujours sans base. Un chiffre réduit n'est pas un chiffre prouvé.",
      "Non. Trop fort : son idée n'est pas une faute. Tu la traites dans le business case, sans alerte."
    ],
    retenir: "Un gain sans preuve reste qualitatif : on ne chiffre que ce qui se prouve ou se mesure."
  },
  {
    id: "cp11-q22",
    dialecte: "Gestion de projet",
    q: "Ton business case compte le gain de ressaisie, 100 heures par mois, dès novembre 2026 et sur 36 mois. Que corriges-tu ?",
    choix: [
      "Rien : le contrat de la PA démarre bien en novembre 2026",
      "Tu le comptes dès mars 2027, à la livraison du connecteur",
      "Il démarre dès la bascule de juin, et il est plein en septembre 2027",
      "Tu le retires : un gain futur n'est jamais certain"
    ],
    bonne: 2,
    pourquoi: [
      "Non. En novembre, les factures reçues passent par le portail : la ressaisie continue. Le gain commence quand le connecteur sert vraiment.",
      "Non. Presque : livré n'est pas utilisé. Il est en recette jusqu'à fin avril, puis en pilote sur 1 site en mai. Toute la compta ne l'utilise qu'à la bascule de juin.",
      "Oui. Il démarre à la bascule et monte en charge : tes fournisseurs PME ne devront émettre en électronique qu'au 1er septembre 2027. Gain plein ensuite.",
      "Non. Trop prudent : un gain se compte, avec sa date et ses hypothèses. Le retirer fausse aussi la comparaison des options."
    ],
    retenir: "Un gain se compte à partir du moment où il arrive vraiment, et il monte en charge."
  },
  {
    id: "cp11-q23",
    dialecte: "Gestion de projet",
    q: "Ton business case promet 100 heures de ressaisie en moins par mois, après la bascule. Qui s'engage sur ce gain, et le mesure ?",
    choix: [
      "La cheffe comptable : c'est son service qui les gagne",
      "Toi : c'est ton calcul, tu le défends jusqu'au bout",
      "L'intégrateur : c'est son paramétrage qui les fait gagner",
      "Le contrôleur de gestion : il suit déjà tous les chiffres"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Le gain se vit dans son service : elle s'engage sur l'hypothèse, et le mesure avec toi après la bascule. PRINCE2 confie les bénéfices au métier.",
      "Non. Tu calcules, et tu aides à mesurer. Mais tu ne diriges pas la compta : tu ne peux pas t'engager sur ce qu'elle fera de son temps.",
      "Non. Il livre un paramétrage. Le gain dépend aussi de l'usage de la compta et des fournisseurs : il ne peut pas s'y engager.",
      "Non. Presque : il aide à mesurer, mais il ne dirige pas la compta. Le gain se prend dans un service : celui qui le dirige s'y engage."
    ],
    retenir: "Un gain a un responsable métier : celui dont le service gagne, qui le mesure après la bascule."
  },
  {
    id: "cp11-q24",
    dialecte: "Gestion de projet",
    q: "Un outil de relance des factures clients coûte 40 k€ sur 3 ans, tout compris. Il remplace un cabinet de recouvrement payé 50 k€ sur 3 ans. Quel est son ROI simple ?",
    choix: [
      "20 % : (50 - 40) ÷ 50",
      "125 % : 50 ÷ 40",
      "10 k€ : 50 - 40, sur 3 ans",
      "25 % : (50 - 40) ÷ 40"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Le ROI divise par ce que tu investis, pas par ce que tu gagnes : (50 - 40) ÷ 40.",
      "Non. 50 ÷ 40 oublie d'enlever le coût : tu comptes l'argent dépensé comme un gain.",
      "Non. 10 k€, c'est le gain net : juste, mais ce n'est pas le ROI, qui est un pourcentage.",
      "Oui. (gains - coûts) ÷ coûts = 10 ÷ 40 = 25 %, sur la même durée de 3 ans. À vérifier ensuite : le temps que l'outil demande à la compta."
    ],
    retenir: "ROI simple = (gains - coûts) ÷ coûts, sur la même durée."
  },
  {
    id: "cp11-q25",
    dialecte: "Gestion de projet",
    q: "Projet Snowflake + Power BI : 20 k€. L'ancien serveur arrêté fait économiser 1 400 € par mois. Snowflake et Power BI coûteront 600 € par mois. Quel délai de retour annonces-tu ?",
    choix: [
      "Environ 14 mois : 20 000 ÷ 1 400",
      "25 mois : 20 000 ÷ 800 de gain net",
      "Environ 33 mois : 20 000 ÷ 600",
      "10 mois : 20 000 ÷ 2 000, tout additionné"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Tu oublies le run : Snowflake et Power BI coûtent 600 € par mois. Ton délai serait trop court d'environ 11 mois.",
      "Oui. Gain net = 1 400 - 600 = 800 € par mois. 20 000 ÷ 800 = 25 mois.",
      "Non. 600 € est un coût, pas un gain : tu divises par le mauvais chiffre.",
      "Non. Les 600 € se paient : ils se retirent du gain, ils ne s'y ajoutent pas."
    ],
    retenir: "Délai de retour = coût ÷ gain net par mois ; le run se retire du gain."
  },
  {
    id: "cp11-q26",
    dialecte: "Gestion de projet",
    q: "Comité de direction. Le DG lit le business case de DEMAT : « Quel est son ROI ? S'il est négatif, on ne le fait pas. » Que réponds-tu ?",
    choix: [
      "« ROI positif : 108 k€ de gains sur 3 ans, pour 80 k€ »",
      "« ROI négatif : on garde donc le portail seul, moins cher »",
      "« Obligatoire, donc à faire. Le ROI aide à choisir la façon »",
      "« Je recalcule, et je vous l'envoie la semaine prochaine »"
    ],
    bonne: 2,
    pourquoi: [
      "Non. 108 k€, c'est 36 mois de temps libéré compté comme de l'argent. Le DG le croira, puis le contrôleur de gestion le démontera.",
      "Non. Le portail seul ne supprime pas l'obligation : il garde la ressaisie, 100 heures par mois. Un ROI ne décide pas d'un projet obligatoire.",
      "Oui. La loi décide de faire ; le business case choisit comment. Le connecteur coûte 35 k€ de plus que le portail seul, et rend 100 heures par mois à la compta.",
      "Non. La réponse est déjà dans ton dossier. Repousser une question simple fait douter de tout le business case."
    ],
    retenir: "Un projet obligatoire ne se décide pas au ROI : le business case compare les façons de le faire."
  },
  {
    id: "cp11-q27",
    dialecte: "Gestion de projet",
    q: "Tu es DSI adjoint. Logiciel de tournées de livraison. X : 12 k€, 1 000 € de gain net par mois, pendant 2 ans (fin de maintenance). Y : 18 k€, 1 000 € par mois, pendant 5 ans. Le DAF : « Prends celui qui se rembourse le plus vite. » Que lui dis-tu ?",
    choix: [
      "X : il se rembourse en 12 mois, Y en 18",
      "Y : sur sa durée, 42 k€ net, contre 12 k€ pour X",
      "Aucun : un retour d'un an ou plus, c'est trop long",
      "X, puis Y dans 2 ans, quand X ne sera plus maintenu"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Le délai de retour ne voit pas la suite : X s'arrête à 2 ans. Sur sa vie, il rapporte 12 k€ net ; Y, 42 k€.",
      "Oui. X : 24 × 1 000 - 12 000 = 12 000 €. Y : 60 × 1 000 - 18 000 = 42 000 €. Le délai de retour ignore ce qui vient après : il ne suffit pas.",
      "Non. Un délai de retour se juge avec la durée de vie : 18 mois sur 5 ans, c'est bon. Il n'existe pas de seuil valable partout.",
      "Non. Deux achats, deux mises en service, deux changements pour les dépôts : la somme coûte plus que Y seul."
    ],
    retenir: "Le délai de retour ignore ce qui vient après : compare aussi le gain net sur toute la durée de vie."
  },
  {
    id: "cp11-q28",
    dialecte: "Gestion de projet",
    q: "Option B, le connecteur, coûte 35 k€ de plus que A, le portail seul. Elle rend 100 heures de compta par mois, valorisées 30 € de l'heure. Gain complet à partir de septembre 2027. Quand ce surcoût est-il couvert, en valeur de temps ?",
    choix: [
      "Après environ 12 mois de plein régime : vers l'été 2028",
      "Environ 12 mois après la signature du contrat : vers la fin 2027",
      "Environ 16 mois : 35 000 ÷ (3 000 - 850 d'abonnement)",
      "Dans 3 ans : à la fin du contrat de la PA, en 2029"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. 100 × 30 = 3 000 € par mois ; 35 000 ÷ 3 000 ≈ 12 mois, comptés à partir du gain plein. En valeur de temps : de l'argent seulement si ce temps remplace une dépense.",
      "Non. Le gain ne commence pas à la signature : il arrive avec la bascule, et il est plein en septembre 2027.",
      "Non. L'abonnement se paie dans A comme dans B : il ne change pas l'écart entre les deux. Ne compte que ce qui diffère.",
      "Non. Le délai de retour n'est pas la durée du contrat : il se calcule, surcoût ÷ gain par mois."
    ],
    retenir: "Délai de retour d'une option : son surcoût ÷ son gain en plus par mois, à partir du moment où le gain arrive."
  },
  {
    id: "cp11-q29",
    dialecte: "Gestion de projet",
    q: "Le commercial de la PA retenue : « Nos clients ont un ROI de 300 %. » Le DAF veut mettre ce chiffre dans le business case. Que fais-tu ?",
    choix: [
      "Tu reprends ce ROI tel quel ; source citée : le commercial",
      "Tu le reprends à 150 % seulement, pour rester raisonnable",
      "Tu exiges de la PA ces 300 % par écrit, dans le contrat",
      "Tu recalcules le ROI sur vos volumes, minutes et coûts"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Presque : citer la source est bien, mais ce ROI vient d'autres clients, d'autres volumes. Ce n'est pas le vôtre.",
      "Non. La moitié d'un chiffre qui n'est pas le vôtre n'est toujours pas le vôtre.",
      "Non. Aucune PA ne garantit un ROI : il dépend de vos volumes et de votre organisation. Le contrat porte sur son service (module cp14).",
      "Oui. Votre ROI se calcule sur vos chiffres : 2 000 factures, 3 minutes gagnées, 30 € de l'heure, 80 k€ sur 3 ans. Le chiffre du vendeur n'est qu'un indice."
    ],
    retenir: "Un ROI de vendeur n'est pas ton ROI : tu le recalcules sur tes volumes et tes coûts."
  },
  {
    id: "cp11-q30",
    dialecte: "Gestion de projet",
    q: "Tu es DSI adjoint. Business case de la migration Divalto : les gains arrivent sur 5 ans. Le DAF : « Un euro gagné dans 5 ans ne vaut pas un euro d'aujourd'hui. Ton ROI en tient compte ? » Que réponds-tu ?",
    choix: [
      "« Non, et c'est inutile : un euro reste un euro »",
      "« Non : je retire donc les gains des années 4 et 5 »",
      "« Non. Le contrôleur de gestion l'actualise : une VAN »",
      "« Oui : je retire moi-même 15 % par an, à vue »"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Le DAF a raison : un euro dans 5 ans vaut moins (inflation, argent qui aurait pu rapporter ailleurs). Sur 5 ans, l'écart compte.",
      "Non. Trop prudent : ces gains existent. Les retirer fausse le calcul dans l'autre sens.",
      "Oui. Le ROI simple ignore le temps. L'actualisation (la VAN, valeur actuelle nette) le corrige : c'est le métier du contrôleur de gestion, avec le taux de l'entreprise.",
      "Non. Presque : le bon geste, mais pas ton taux. Un taux choisi à vue change le résultat ; l'entreprise a le sien."
    ],
    retenir: "Le ROI simple ignore la valeur du temps ; sur plusieurs années, le contrôleur de gestion actualise (VAN)."
  },
  {
    id: "cp11-q31",
    dialecte: "Gestion de projet",
    q: "Projet Snowflake + Power BI. Le calcul Snowflake se paie au mois, selon l'usage. Le DAF veut un chiffre pour ses 3 ans de budget. Que lui donnes-tu ?",
    choix: [
      "Une fourchette prudente par mois, et un plafond surveillé",
      "Le coût du 1er mois de test, multiplié par 36",
      "Rien de fixe : tu attends les factures, puis tu ajustes",
      "Le mois le plus cher possible, doublé, puis multiplié par 36"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. L'usage fait le prix : une fourchette, avec ses hypothèses (utilisateurs, rafraîchissements). Dans Snowflake, un plafond de crédits avec alerte (resource monitor) prévient avant le dépassement.",
      "Non. Un mois de test n'a ni tous les utilisateurs, ni tout l'historique. L'usage monte : ce chiffre sera dépassé.",
      "Non. Attendre les factures, c'est découvrir le coût après l'avoir payé. Il se budgète, en fourchette, avec un plafond.",
      "Non. Tu gonfles le budget pour ne jamais dépasser : de l'argent bloqué pour rien, et un chiffre que personne ne croit."
    ],
    retenir: "Un coût à l'usage se budgète en fourchette, avec ses hypothèses et un plafond surveillé."
  },
  {
    id: "cp11-q32",
    dialecte: "Gestion de projet",
    q: "Le DAF te demande : « Les 40 jours de l'intégrateur, c'est du CAPEX ou de l'OPEX ? » Que réponds-tu ?",
    choix: [
      "« Du CAPEX : c'est un projet, donc un investissement »",
      "« De l'OPEX : en régie, c'est du temps, donc une charge »",
      "« Le contrôleur de gestion le dira, sur mon détail »",
      "« Moitié-moitié : 15 k€ chacun, pour ne pas se tromper »"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Tout projet n'est pas un investissement : une partie de ces jours peut être une charge (formation, paramétrage d'un service par abonnement). Ce n'est pas à toi de classer.",
      "Non. Le type de contrat ne décide pas : des jours en régie peuvent créer un bien immobilisé. C'est une règle comptable, pour le contrôleur de gestion.",
      "Oui. Le contrôleur de gestion classe, selon les règles comptables. Toi, tu donnes le détail : quels jours, pour quoi faire, quand.",
      "Non. Couper en deux n'est pas une règle. Un classement faux se corrige ensuite, avec le résultat de l'année."
    ],
    retenir: "CAPEX ou OPEX : le contrôleur de gestion classe ; le chef de projet donne le détail des coûts."
  },
  {
    id: "cp11-q33",
    dialecte: "Gestion de projet",
    q: "Un collègue de la DSI propose : « Classons l'abonnement de la PA en investissement : 30,6 k€ amortis sur 5 ans, le résultat de l'année sera meilleur. » Que réponds-tu ?",
    choix: [
      "« Bonne idée : on étale l'abonnement, et l'année respire »",
      "« Non : un abonnement est une charge de l'année (OPEX) »",
      "« On demande au DG de choisir entre toi et la règle »",
      "« En CAPEX la 1re année, en OPEX les 2 suivantes »"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Un abonnement paie un service, mois après mois : ce n'est pas un bien que l'entreprise possède. C'est une charge (OPEX), et il est classé ainsi.",
      "Oui. L'abonnement de la PA est une charge de chaque année : de l'OPEX. On ne choisit pas un classement pour embellir le résultat.",
      "Non. Il n'y a rien à arbitrer : c'est une règle comptable, pas un désaccord. Et le DG n'a pas à trancher ça.",
      "Non. Un même abonnement ne change pas de nature en cours de route. Ce découpage n'existe dans aucune règle."
    ],
    retenir: "Un abonnement est une charge de l'année (OPEX) : on ne le classe pas pour embellir le résultat."
  },
  {
    id: "cp11-q34",
    dialecte: "Gestion de projet",
    q: "Ton DSI : « Si la mise en service du connecteur, 7,4 k€, passe en investissement, on dépense moins cette année ? » Que réponds-tu ?",
    choix: [
      "« Oui : l'argent sortira sur plusieurs années »",
      "« Non : investissement ou charge, rien ne change »",
      "« Oui : un investissement se paie à la fin du projet »",
      "« Oui pour la charge de l'année, pas pour l'argent qui sort »"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Tu confonds la charge et le paiement : la facture se paie à sa date. C'est la charge qui s'étale (l'amortissement), pas l'argent.",
      "Non. Presque : l'argent sort pareil, mais la charge de l'année change. Pour le résultat de l'année, ce n'est pas rien.",
      "Non. La date de paiement suit la facture et le contrat, pas le classement comptable.",
      "Oui. Immobilisé, son coût s'étale sur sa durée d'utilisation (l'amortissement) : la charge de l'année baisse. Mais la facture se paie à sa date. Et c'est le contrôleur de gestion qui dira s'il peut l'être."
    ],
    retenir: "CAPEX ou OPEX change la charge de l'année, pas l'argent qui sort."
  },
  {
    id: "cp11-q35",
    dialecte: "Gestion de projet",
    q: "Projet Snowflake + Power BI. Ton DSI veut payer d'avance 3 ans de crédits Snowflake : « Payé d'avance, ça devient un investissement. » Que lui dis-tu ?",
    choix: [
      "« Non : payé d'avance ou pas, ça reste toujours une charge »",
      "« Oui : payé d'avance, c'est un investissement amorti sur 3 ans »",
      "« Oui, si le DAF signe la commande : c'est lui qui classe »",
      "« Ça dépend du montant : sous 10 k€, ce serait une charge »"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Payer d'avance change la date du paiement, pas la nature : c'est une consommation, une charge au fil de l'usage (OPEX). Le contrôleur de gestion le confirmera.",
      "Non. Un amortissement concerne un bien qui sert plusieurs années. Des crédits de calcul se consomment : ils restent une charge.",
      "Non. Signer la commande ne classe rien : le contrôleur de gestion classe, selon les règles comptables. Et ici, c'est une charge.",
      "Non. Un seuil de montant existe pour de petits biens, passés en charges. Il ne fait pas d'une consommation un investissement."
    ],
    retenir: "Payer d'avance ne transforme pas une consommation en investissement : le calcul cloud reste une charge."
  },
  {
    id: "cp11-q36",
    dialecte: "Gestion de projet",
    q: "Le contrôleur de gestion te demande le budget de DEMAT, pour ses comptes. Que lui envoies-tu ?",
    choix: [
      "Le total, 80 k€ : le détail ne regarde que le projet",
      "Tous les coûts, chacun avec sa nature et sa date",
      "Ton classement CAPEX / OPEX, ligne par ligne, à appliquer",
      "Les contrats signés : il fera lui-même son tableau"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Avec un seul total, il ne peut ni classer, ni prévoir les paiements de chaque mois.",
      "Oui. Abonnement au mois, forfait de mise en service, jours en régie, formation et tests, réserve : chacun avec sa date. Il classe, et il prévoit la trésorerie.",
      "Non. Presque : le détail y est, mais tu lui imposes ton classement. Classer, c'est son rôle, selon les règles comptables.",
      "Non. Des dizaines de pages pour retrouver 5 lignes : il te le redemandera. Et les jours en régie dépendent des commandes, pas seulement du contrat."
    ],
    retenir: "Au contrôleur de gestion : chaque coût, sa nature et sa date. Il classe ; tu ne pré-classes pas."
  },
  {
    id: "cp11-q37",
    dialecte: "Gestion de projet",
    q: "Tu es DSI adjoint. Nouveaux serveurs : l'achat coûte 20 k€ de moins sur 5 ans que le cloud. Le DAF choisit le cloud, en connaissant l'écart : « Je préfère des charges au mois qu'un investissement à faire voter. » Que fais-tu ?",
    choix: [
      "Tu appliques, et l'écart de 20 k€ reste écrit dans le dossier",
      "Tu refuses : l'achat est moins cher, le calcul le prouve",
      "Tu montres l'écart de 20 k€ au DG, pour qu'il tranche",
      "Tu appliques ; au prochain comité, tu remets le sujet"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Le sponsor décide en connaissant le prix : c'est une décision. Sa raison (pas d'investissement à faire voter) est légitime. Tu appliques, et l'écart reste tracé.",
      "Non. Le calcul éclaire, il ne décide pas. Le DAF a d'autres critères, comme son enveloppe d'investissement : c'est son rôle.",
      "Non. Il a décidé en connaissant l'écart : il n'y a rien à trancher au-dessus de lui. Ce serait contester sa décision.",
      "Non. Presque : tu appliques, mais rouvrir le débat au comité suivant, c'est ne pas accepter sa décision. Il connaît déjà les chiffres."
    ],
    retenir: "Le sponsor qui choisit en connaissant le prix a décidé : tu appliques, et l'écart reste écrit."
  },
  {
    id: "cp11-q38",
    dialecte: "Gestion de projet",
    q: "Novembre 2026. Contrats signés : 80 k€ de dépenses externes sur 3 ans, réserve comprise. Le DAF : « Au cadrage, tu disais 60 à 90 k€. Je retiens quoi ? »",
    choix: [
      "« La fourchette, 60 à 90 k€ : un budget reste toujours incertain »",
      "« 90 k€ : les 80 k€, et 10 k€ de plus par prudence »",
      "« 72 k€ : sans la réserve, qui ne servira peut-être pas »",
      "« 80 k€ ; au-delà de 90 k€, tu décides, prévenu le jour même »"
    ],
    bonne: 3,
    pourquoi: [
      "Non. La fourchette servait tant que les prix étaient inconnus. Contrats signés, un chiffre de référence permet de suivre les écarts.",
      "Non. 90 k€ cacherait 10 k€ sans raison écrite : ils se dépenseraient sans décision. 90 k€ est la limite de la tolérance, pas le budget.",
      "Non. La réserve fait partie du budget : elle couvre des risques nommés. Sans elle, le 1er risque fait déborder.",
      "Oui. Une fourchette tant que c'est incertain, un chiffre quand les contrats sont signés. 80 k€ devient la référence ; au-delà de 90 k€, le DAF décide, prévenu le jour même. En dessous aussi, chaque dépense en plus est une commande qu'il signe."
    ],
    retenir: "Contrats signés : la fourchette devient un chiffre de référence, avec sa tolérance."
  },
  {
    id: "cp11-q39",
    dialecte: "Gestion de projet",
    q: "Janvier 2027. L'extraction de Divalto sur 2026 donne 2 400 factures fournisseurs par mois, pas 2 000 comme dans ton business case. Que fais-tu ?",
    choix: [
      "Rien : 2 000 est plus prudent, et le dossier est validé",
      "Tu mets l'hypothèse à jour, sans le dire : la nouvelle est bonne",
      "Tu mets l'hypothèse à jour, source citée, et 2 lignes au DAF",
      "Tu annonces au DG 20 % de gains en plus, dès aujourd'hui"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Garder un chiffre que tu sais faux, même plus bas, ce n'est pas de la prudence. Le business case suit les faits.",
      "Non. Presque : la mise à jour est juste, mais le DAF a validé ce business case. Un chiffre qui bouge sans qu'il le sache, c'est un dossier qu'il ne reconnaît plus.",
      "Oui. 2 400 × 3 minutes = 7 200 minutes, soit 120 heures par mois. L'hypothèse suit les faits, avec sa source (l'extraction Divalto). Rien à décider : 2 lignes au DAF suffisent, ou un mot au COPIL du mois.",
      "Non. Le DG n'a rien à décider, et tu passes au-dessus du DAF. Les gains se présentent d'abord au sponsor."
    ],
    retenir: "Une hypothèse change : le business case se met à jour, source citée, et le sponsor le sait."
  },
  {
    id: "cp11-q40",
    dialecte: "Gestion de projet",
    q: "Juin 2027, la bascule est faite. Le DAF : « Le business case a servi à lancer le projet. On peut le ranger. » Que proposes-tu ?",
    choix: [
      "D'accord : le projet est livré ; le dossier a servi",
      "« Oui, après la mesure des gains réels, cet automne »",
      "Une mesure des gains réels dès la 1re semaine après la bascule",
      "Tu réécris les gains avec les vrais chiffres, pour qu'il colle"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Le business case promettait des gains : sans mesure, personne ne saura s'ils sont arrivés. Le prochain projet partira sans retour d'expérience.",
      "Oui. Les gains se mesurent quand ils sont pleins : après septembre 2027, quand tous les fournisseurs émettent. La cheffe comptable, qui s'y est engagée, mesure avec toi. Ensuite seulement, le dossier se range. PRINCE2 parle de revue des bénéfices.",
      "Non. Presque : mesurer est juste, mais trop tôt. La 1re semaine, l'équipe apprend encore, et les fournisseurs PME n'émettent pas encore.",
      "Non. Réécrire les hypothèses pour qu'elles collent efface ce que le projet a appris. On compare la promesse et le réel, sans retoucher la promesse."
    ],
    retenir: "Après la bascule, on mesure les gains réels contre le business case, quand ils sont pleins."
  },
  {
    id: "cp11-q41",
    dialecte: "Gestion de projet",
    q: "Projet Snowflake + Power BI, à mi-chemin. Son gain principal : couper l'ancien serveur de reporting. Tu apprends que sa licence vient d'être renouvelée pour 3 ans, sans remboursement possible. Que fais-tu ?",
    choix: [
      "Rien ne change : le projet est lancé, pas question d'arrêter",
      "Tu l'écris au registre des risques, et le projet continue comme prévu",
      "Tu cherches d'autres gains, pour que le dossier tienne",
      "Business case à jour, puis le sponsor choisit : suivre ou arrêter"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Le dossier qui justifiait le projet ne tient plus : continuer sans le dire, c'est dépenser sur une promesse morte.",
      "Non. Ce n'est plus un risque : c'est arrivé. Le gain qui justifiait le projet disparaît pour 3 ans ; le sponsor doit le savoir.",
      "Non. Chercher des gains pour sauver le projet, c'est partir de la réponse. Les gains se mesurent, ils ne s'inventent pas.",
      "Oui. PRINCE2 revoit le business case à chaque étape, pour ce cas. Tu le mets à jour, puis le sponsor décide en connaissant le nouveau prix : continuer, réduire ou arrêter."
    ],
    retenir: "Un business case qui ne tient plus se met à jour, et le sponsor décide : continuer, réduire ou arrêter."
  },
  {
    id: "cp11-q42",
    dialecte: "Gestion de projet",
    q: "Projet Power BI. Le contrôleur de gestion a classé en charges (OPEX) les 20 jours du prestataire. Le prestataire insiste : « Chez nos autres clients, c'est un investissement ! » Que fais-tu ?",
    choix: [
      "Tu demandes au contrôleur de s'aligner sur ses autres clients",
      "Tu reclasses ces jours en CAPEX : c'est ton budget, après tout",
      "Tu gardes son classement tel quel : c'est son rôle",
      "Tu demandes au DAF d'arbitrer entre le prestataire et lui"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Les autres clients ont leurs règles et leurs projets. Le contrôleur a classé selon les vôtres.",
      "Non. Classer n'est pas ton rôle : ton budget serait faux, et le contrôleur le corrigerait derrière toi.",
      "Oui. Le contrôleur de gestion classe, selon les règles comptables de l'entreprise. Le prestataire n'a pas à décider de vos comptes.",
      "Non. Il n'y a rien à arbitrer : l'avis d'un fournisseur ne fait pas un désaccord. Le classement est fait, selon vos règles comptables."
    ],
    retenir: "Le classement CAPEX / OPEX revient au contrôleur de gestion : ni le prestataire ni toi ne le refaites."
  }
];
