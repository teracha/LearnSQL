// Chef de projet SI — Questions du module cp19 « La recette ».
// Fond (ISTQB pour le vocabulaire des tests : niveaux unitaire, intégration, système, acceptation, critères d'entrée,
// gravité, retest et non-régression ; PMBOK et PRINCE2 : critères d'acceptation fixés avant, acceptation par le client ;
// pratiques de terrain en PME / ETI) : les niveaux (les tests du fournisseur vérifient ce qu'il a construit, la recette
// vérifie le besoin ; recette usine = critère d'entrée, avec compte rendu ; toi : organiser, préparer les données,
// vérifier la veille que l'environnement marche) ; la stratégie au cadrage (critères mesurables, environnement à part,
// retests au calendrier, tests imposés par un client EDI, ce qui diffère d'un site à l'autre) ; les cas (situation
// réelle, données, étapes, résultat attendu écrit avant ; rares et coûteux d'abord ; ce qui reste hors projet ; contacts
// masqués ; tableau Power BI comparé à un mois clos) ; les anomalies (ticket clair, gravité fixée par le métier avec toi
// sur des définitions écrites, ordre de correction, fermeture après retest, erreur de saisie ≠ anomalie) ; la
// non-régression (lot de cas clés choisi avant, tenu à jour, rejoué après chaque livraison groupée ; régression liée à
// une livraison) ; le PV (0 bloquante, 0 majeure ; réserves précises, datées après le gel ; ce qu'il engage ; contenu ;
// corrigé ≠ retesté ; levée écrite par le métier) ; les pièges (couper des cas rares pour tenir la date ; le pilote ne
// remplace pas la recette ; préparer les données n'est pas recetter). Les pratiques divergent (dit au cours) : 3 à 5
// niveaux de test selon les écoles (le syllabus ISTQB v4 en compte 5) ; une priorité à part ou une 4e gravité selon les
// équipes ; la non-régression automatisée dans le logiciel, rejouée à la main sur un ERP en PME.
// Fil rouge DEMAT 2027 (fiche fil rouge de docs/plan-chef-de-projet.md, qui fait foi), ligne « Recette (module cp19) » :
// stratégie au cadrage (q05 à q10) ; 120 cas écrits en janvier-février par Julie, Sophie et Marc (q08, q11 à q14) ;
// données de test (q16) ; outil de tickets et gravités (q18 à q24) ; non-régression après chaque correctif (q25 à q28 :
// après chaque livraison groupée de correctifs) ; recette du 16 mars au 30 avril ; PV : 0 bloquante ni majeure, réserves
// mineures datées (q29, q31) ; PV fournisseurs signé par la personne désignée par la cheffe comptable, pas Julie (q34) ;
// 2 réserves mineures (q31, q32) ; gel dès le pilote de mai (cp10 ; q31, q36). Vécu : flux EDI (q09, q13, q16), migration
// Divalto (q39, q40), Snowflake + Power BI (q17).
// Faits ajoutés (cohérents avec la fiche et les modules publiés, à valider) : environnement de recette = une copie de
// Divalto à part de celle de l'intégrateur, reliée à l'espace de test de la PA (q07) ; livraisons de correctifs le mardi
// et le jeudi (q21, q26, q27) ; lot de 20 cas clés choisi en février (q25, q28) ; cas F-17, F-22 (q23, q24) ; guide EDI
// d'AquaBleu : 5 factures de test validées par AquaBleu (q09) ; numéros de facture et adresses propres à chaque dépôt
// (q10) ; fournisseur espagnol hors PA (q15) ; copie de Divalto qui a gardé par erreur les vrais e-mails (q16) ; 2 bloquantes,
// 3 majeures, 9 mineures fin de 4e semaine (q22) ; réserves datées au 9 juillet, après le gel et la bascule (q31).
// Variantes (le temps d'une question, sans changer la fiche) : une majeure encore ouverte le 29 avril, recette clients (q29) ; la dernière
// bloquante retestée le 30 au matin (q34) ; le PV 3 jours plus tard, dans la tolérance (q35).
// Affirmations juridiques hors fiche (générales, à faire vérifier) : un PV ne promet pas zéro défaut, un défaut trouvé
// après se corrige selon le contrat (q30) ; une réserve générale (« sous réserve de bon fonctionnement ») ne protège presque
// rien (q30) ; un fournisseur établi hors de France n'émet pas ses factures par la PA (q15, d'après la fiche : facture
// électronique = B2B en France) ; données personnelles masquées dans les copies de test (q16, comme cp01-q27).
// Déjà publiées ailleurs, pas reprises ici : cp01-q22 et q27, cp02-q03, cp03-q09 et q12, cp05-q23 et q34, cp06-q03,
// q04 et q25, cp08-q36 à q39, cp09-q13, q14, q20, q24 et q42, cp10-q01, q16, q25 et q41, cp12-q15 à q17 et q22,
// cp14-q16, q26 à q28, q32 et q40, cp15-q24 et q27, cp16-q08, q27 et q34, cp17-q38 et q42, cp18-q02, q13, q14 et q25.
// Voisines, avec un autre angle : q02 et cp01-q22 (les tests du fournisseur comme critère d'entrée) ; q16 et cp01-q27
// (un incident d'envoi, pas une copie à donner) ; q21 et cp15-q27 (la règle de fermeture) ; q23 et cp15-q24 (l'attendu
// et l'obtenu d'un cas) ; q26 et cp10-q16 (une régression trouvée) ; q29 et cp14-q26 / q27 (une majeure ouverte) ; q31 et cp14-q26 (les 2 mêmes réserves :
// ici, leur date après le gel) ; q35 et
// cp12-q22 (la date, pas le budget, dans la tolérance) ; q36 et cp18-q13 (le pilote) ; q41 et cp18-q25 (DSI adjoint).
// Frontières : suivre la recette (taux, météo, prévision du PV) = cp08 ; qui signe au RACI = cp09 ; PV, délai de
// validation et recette tacite au contrat = cp14 ; anomalie ou changement = cp10 ; un bon ticket = cp15 ; la qualité
// qui paie = cp18 ; la reprise de données = cp20 ; le go / no-go = cp21 ; la formation = cp23 ; le RGPD = cp24.
// Types : niveaux de test q01 à q04 ; stratégie q05 à q10 ; cas et données q11 à q17 ; anomalies et gravité q18 à q24 ;
// non-régression q25 à q28 ; PV et réserves q29 à q34 ; pièges q35 à q37 ; « Tu es DSI adjoint » q38 à q41.
// Anti-devinette : la bonne réponse est un extrême de force dans 8 questions sur les 33 qui ont un axe d'action (q07,
// q09, q11, q16, q20, q24, q26, q39) ; « Oui », « D'accord », « Non : », « Si : », « rien », « tout », « toujours »,
// « dès », « dans l'heure » sont aussi dans des bonnes réponses ; des chiffres et des dates dans 26 questions aux choix
// faux. Scores sans connaissance du sujet (script de l'expert) : action moyenne 37 % ; plus petite action réelle 46 % ;
// toujours le sponsor 20 % ; jamais au-dessus du manager 25 % ; deux actions 29 % ; la plus longue 20 % ; extrêmes
// écartés + chiffre ou date 34 % ; + mot de méthode 45 % ; écarter absolus, oui, DAF / COPIL 35 % ; écarter « rien » et
// le plus fort, puis deux actions 36 % ; propres à cp19 : faire tester le métier 35 %, ajouter des tests ou des cas
// 21 %, refuser de signer ou bloquer le PV 26 %.
LEARNSQL.questions.cp19 = [
  {
    id: "cp19-q01",
    dialecte: "Gestion de projet",
    q: "Quatre tests sont prévus sur DEMAT. Lequel est un test de recette ?",
    choix: [
      "Le consultant vérifie que le taux de TVA à 20 % est bien saisi",
      "Sophie joue son cas : un avoir AquaBleu doit arriver lié à sa facture",
      "L'intégrateur envoie 10 factures de Divalto à la PA, et voit si elles arrivent",
      "La PA rejoue les tests de son connecteur chez un autre client Divalto"
    ],
    bonne: 1,
    pourquoi: [
      "Non. C'est un test unitaire : un réglage, vérifié par celui qui l'a fait. Utile, mais il ne dit rien de vos vrais cas.",
      "Oui. Le métier joue un de ses vrais cas, avec un résultat attendu écrit : c'est la recette (l'acceptation, pour l'ISTQB).",
      "Non. C'est un test d'intégration : les échanges entre Divalto et la PA (plateforme agréée) marchent. C'est le travail de l'intégrateur, avant la recette.",
      "Non. C'est le test du fournisseur, sur un autre client : il prouve que le connecteur marche en général, pas sur vos cas."
    ],
    retenir: "Unitaire, intégration, système : les tests de ceux qui construisent. La recette : le métier, sur ses vrais cas."
  },
  {
    id: "cp19-q02",
    dialecte: "Gestion de projet",
    q: "Janvier. Le chef de projet de la PA : « Notre connecteur est testé chez 50 clients Divalto. Votre recette peut tenir en 2 jours. » Que réponds-tu ?",
    choix: [
      "« D'accord : 2 jours suffisent, la compta gagne 5 semaines »",
      "« Non. Et nous ajoutons même 2 semaines, pour être sûrs »",
      "« Le DAF choisira entre 2 jours et 6 semaines, à leur prix »",
      "« Nos 120 cas restent. Vos tests : un compte rendu avant le 16 »"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Ses 50 clients n'ont ni vos SIREN, ni AquaBleu, ni vos avoirs. Ses tests prouvent que le connecteur marche en général, pas chez vous.",
      "Non. Trop fort : sa phrase ne change pas vos risques. 2 semaines de plus repoussent le PV et le pilote, sans un cas de plus.",
      "Non. La stratégie de recette est validée : tu n'as pas à la remettre en jeu pour l'idée d'un prestataire. Le DAF (directeur administratif et financier, le sponsor) n'a rien à trancher.",
      "Oui. Ses tests sont un critère d'entrée : utiles, prouvés par un compte rendu avant le 16 mars. Ils ne remplacent pas la recette : la compta et l'ADV jouent leurs cas, comme la stratégie le prévoit."
    ],
    retenir: "Les tests du fournisseur sont un critère d'entrée, pas la recette : ils prouvent que ça marche en général, pas sur tes cas."
  },
  {
    id: "cp19-q03",
    dialecte: "Gestion de projet",
    q: "Vendredi 12 mars. Le consultant : « Mes tests d'intégration ? Pas eu le temps. Vos testeurs trouveront les erreurs en recette, ça ira plus vite. » Que fais-tu ?",
    choix: [
      "Tu acceptes : la recette trouvera ses erreurs en même temps",
      "Tu fais ses tests toi-même ce week-end, compte rendu compris",
      "Tu refuses : ses tests lundi, compte rendu avant mardi",
      "Tu décales la recette de 2 semaines, et le DAF est prévenu"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Julie perdrait ses créneaux sur des erreurs simples, que ses tests auraient trouvées. Le métier n'est pas là pour finir le travail du fournisseur.",
      "Non. Tu ferais son travail, payé en régie, sans en répondre. Et pendant ce temps, personne ne pilote (module cp03).",
      "Oui. Ses tests sont un critère d'entrée de la recette : son travail, prouvé par un compte rendu. Il les fait lundi ; mardi 16, la recette démarre sur ce qui est passé.",
      "Non. Trop fort : rien n'a encore glissé. Il lui reste lundi pour faire ses tests : tu les exiges d'abord."
    ],
    retenir: "Les tests de l'intégrateur passent avant la recette : c'est un critère d'entrée, avec son compte rendu."
  },
  {
    id: "cp19-q04",
    dialecte: "Gestion de projet",
    q: "Lundi 15 mars, veille de la recette. Julie commence demain à 9 h. Tu as 2 heures devant toi. Qu'en fais-tu de plus utile ?",
    choix: [
      "Tu vérifies l'environnement : accès, données, un envoi simple",
      "Tu joues ses cas de la 1re semaine, pour lui éviter les surprises",
      "Rien de plus : l'intégrateur a dit que tout était prêt",
      "L'intégrateur joue cette nuit tous les cas, avant qu'elle arrive"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Vérifier la veille que l'environnement marche, c'est ton rôle : un critère d'entrée, pas une validation. Tu ne juges aucun de ses cas. Demain, Julie teste, au lieu de chercher un mot de passe.",
      "Non. Jouer ses cas, c'est faire la recette à sa place : ton test ne vaut pas validation, et elle n'aura plus qu'à cocher.",
      "Non. « Tout est prêt » n'est pas une preuve. Un accès qui manque, et Julie perd sa 1re matinée.",
      "Non. Il testerait son propre travail, en une nuit, sur les cas du métier : ça ne vaut pas recette, et tu paies ces heures."
    ],
    retenir: "Vérifier la veille que l'environnement est prêt, oui ; jouer les cas du métier à sa place, non."
  },
  {
    id: "cp19-q05",
    dialecte: "Gestion de projet",
    q: "Octobre 2026, cadrage. Le DAF : « La recette ? On verra en mars, à la livraison du connecteur. » Que fais-tu ?",
    choix: [
      "D'accord : en mars, on saura enfin ce qu'il faut tester",
      "Tu écris toi-même dès maintenant les cas de la compta et de l'ADV",
      "Tu demandes à l'intégrateur sa stratégie de recette, à valider",
      "Une page dès maintenant : critères, qui teste, qui signe, quand"
    ],
    bonne: 3,
    pourquoi: [
      "Non. En mars, les créneaux de la compta sont pris, et le contrat de la PA est signé avec son délai de validation. Et des critères fixés devant le résultat se discutent au lieu de se constater.",
      "Non. Les cas viennent du métier, en janvier-février, quand le besoin est écrit. Écrits par toi en octobre, ils testent ce que tu crois.",
      "Non. Le prestataire ne fixe pas comment on accepte son travail : ses critères l'arrangeraient. La stratégie est au client.",
      "Oui. La stratégie s'écrit au cadrage : critères d'acceptation, qui teste, qui signe, calendrier. Elle réserve le temps du métier et nourrit le contrat de la PA. Les cas viendront en janvier-février."
    ],
    retenir: "La stratégie de recette s'écrit au cadrage, avant le contrat et avant les cas : critères, qui teste, qui signe, quand."
  },
  {
    id: "cp19-q06",
    dialecte: "Gestion de projet",
    q: "Ta stratégie de recette dit : « PV signé quand le connecteur fonctionne bien. » Ton DSI relit : « Ce critère ne vaut rien. » Que mets-tu à la place ?",
    choix: [
      "« Quand 100 % des cas sont OK, sans la moindre anomalie »",
      "« Quand 95 % des 120 cas sont OK ; à la fin de la recette »",
      "« 0 bloquante, 0 majeure ; le mineur en réserve datée »",
      "« Quand la cheffe comptable et l'ADV se disent rassurés »"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Trop fort : un libellé mal écrit bloquerait le PV. Les défauts mineurs se traitent par des réserves datées, sans tout arrêter.",
      "Non. Un pourcentage cache les bloquantes : 5 % des cas, ce peut être toutes les factures d'AquaBleu (module cp08).",
      "Oui. Un critère se mesure, et se fixe avant : rien de bloquant ni de majeur ouvert ; les gênes en réserves, chacune avec sa date. Personne ne le déplacera fin avril.",
      "Non. Être rassuré ne se mesure pas : fin avril, chacun aura son avis, et le PV se discutera au lieu de se constater."
    ],
    retenir: "Un critère d'acceptation se mesure et se fixe avant : 0 bloquante, 0 majeure, des réserves datées pour le mineur."
  },
  {
    id: "cp19-q07",
    dialecte: "Gestion de projet",
    q: "Janvier. Le consultant propose que les tests se fassent dans sa copie de Divalto, celle où il paramètre : « Elle est prête, et je corrige en direct. » Que décides-tu ?",
    choix: [
      "Sa copie : prête tout de suite, et ses corrections iront plus vite",
      "Une copie à part pour la recette, où ses correctifs sont livrés",
      "Le Divalto de production, relié à l'espace de test de la PA",
      "Tu le laisses choisir : l'environnement, c'est son métier"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Il y change ses réglages chaque jour : Julie teste un terrain qui bouge, et un cas OK le matin peut échouer le soir. Personne ne sait plus ce qui a été testé.",
      "Oui. La recette teste une version stable : une copie à elle, reliée à l'espace de test de la PA. Les correctifs y arrivent par livraisons annoncées, puis on rejoue les cas.",
      "Non. Jamais la production : une facture émise par erreur est définitive (il faut un avoir), et vos données réelles seraient touchées.",
      "Non. Où et comment on accepte son travail, c'est la stratégie du client. Laissé à lui, il garderait sa copie, qui bouge chaque jour."
    ],
    retenir: "La recette a son environnement : une copie stable, à part, où les correctifs arrivent par livraisons. Jamais la production."
  },
  {
    id: "cp19-q08",
    dialecte: "Gestion de projet",
    q: "Février. Ton calendrier de recette : 120 cas en 6 semaines, 20 par semaine, puis 1 semaine de marge. Rien n'est prévu pour les retests. Que fais-tu ?",
    choix: [
      "Un créneau de retest par semaine, réservé avec leurs managers",
      "Rien de plus : la semaine de marge servira aux retests",
      "Les retests attendront le pilote de mai, sur de vraies factures",
      "Tu étires la recette à 10 semaines : PV fin mai, le DAF le sait"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Une anomalie corrigée se rejoue, et le lot de non-régression aussi : c'est du temps du métier, à réserver comme le reste, avec leurs managers (module cp16).",
      "Non. Presque : la marge aide. Mais les retests et le lot reviennent après chaque livraison, chaque semaine : ils n'attendent pas la 7e semaine. Et la marge reste pour les imprévus.",
      "Non. Le PV ne se signe pas sur des anomalies jamais retestées. Et au pilote, l'erreur part sur de vraies factures.",
      "Non. Trop fort : quelques heures par semaine suffisent. Décaler le PV d'un mois, hors tolérance, c'est casser le pilote de mai et la bascule."
    ],
    retenir: "Une stratégie prévoit le temps des retests et de la non-régression : la marge reste pour les imprévus."
  },
  {
    id: "cp19-q09",
    dialecte: "Gestion de projet",
    q: "Février. Le guide EDI d'AquaBleu l'exige : avant tout nouveau circuit de facturation, AquaBleu valide 5 factures de test. Ta stratégie de recette n'en parle pas. Que fais-tu ?",
    choix: [
      "Rien : la recette suffit, AquaBleu verra ses factures en juin",
      "Ses 5 factures de test notées, pour après le PV",
      "Le commercial négocie une dispense : AquaBleu nous connaît",
      "Tu l'ajoutes : 5 factures de test en avril, dates calées dès maintenant"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Son guide l'exige : sans sa validation, AquaBleu peut refuser vos factures en juin. 20 % du chiffre d'affaires, bloqué à la bascule.",
      "Non. Après le PV, c'est le pilote et le gel : trop tard pour un test qu'AquaBleu doit valider. Et ses dates à lui ne s'improvisent pas.",
      "Non. Le guide est la règle d'AquaBleu pour tous ses fournisseurs : une dispense est peu probable. Et le commercial n'a pas à porter ta recette.",
      "Oui. Un client EDI qui impose ses tests entre dans la stratégie. Ses dates se réservent tôt, avec lui : il a son propre planning. Marc prépare les 5 factures."
    ],
    retenir: "Un client EDI qui impose ses tests entre dans la stratégie de recette, avec des dates réservées tôt."
  },
  {
    id: "cp19-q10",
    dialecte: "Gestion de projet",
    q: "Octobre. Ton brouillon de stratégie prévoit de tout tester sur le dépôt principal. Les 2 autres dépôts ont leurs propres numéros de facture et leurs adresses. Que fais-tu ?",
    choix: [
      "Rien de plus : c'est le même Divalto, un site suffit",
      "Les 120 cas sur chacun des 3 sites, soit 360 cas à jouer",
      "Des cas par site pour ce qui change : numéros, adresses",
      "Leurs numéros et adresses se testeront à la bascule, en juin"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Même logiciel, réglages différents : une série de numéros ou une adresse mal paramétrée, et les factures d'un dépôt sont rejetées.",
      "Non. Trop fort : 3 fois les mêmes cas testent 3 fois le même paramétrage. Tu triples la recette pour rien.",
      "Oui. On teste ce qui diffère : les numéros de facture et les adresses de chaque dépôt, sur quelques cas par site. Le reste est commun : testé une fois.",
      "Non. À la bascule, ce sont de vraies factures : une erreur de numéro part chez le client, et se corrige par un avoir."
    ],
    retenir: "La recette couvre ce qui diffère (un site, un client, un flux), sans répéter ce qui est commun."
  },
  {
    id: "cp19-q11",
    dialecte: "Gestion de projet",
    q: "Février. Un cas de Julie : « Recevoir une facture fournisseur et vérifier que tout va bien. » Tu le relis. Que lui demandes-tu ?",
    choix: [
      "Rien : elle sait ce que « bien » veut dire pour elle",
      "Que l'intégrateur réécrive ses cas : il connaît le système",
      "D'en écrire 10 comme celui-ci, pour couvrir plus de cas",
      "Ses données, ses étapes et le résultat attendu, chiffré"
    ],
    bonne: 3,
    pourquoi: [
      "Non. « Tout va bien » ne se vérifie pas : le jour du test, Julie jugera à l'œil, et une erreur de TVA passera.",
      "Non. Les cas viennent du métier : l'intégrateur testerait ce qu'il a construit. Julie écrit, tu l'aides.",
      "Non. Dix cas flous valent un cas flou : sans résultat attendu, aucun ne prouve rien.",
      "Oui. Un cas utile : une situation réelle, ses données, ses étapes, et ce qu'on doit obtenir, chiffré. Le jour du test, OK ou pas se constate."
    ],
    retenir: "Un cas de test : une situation réelle, ses données, ses étapes et son résultat attendu, chiffré."
  },
  {
    id: "cp19-q12",
    dialecte: "Gestion de projet",
    q: "Julie a écrit ses cas fournisseurs. La moitié portent sur le même gros fournisseur : « C'est 40 % de nos factures. » Que fais-tu ?",
    choix: [
      "Tu valides : ses cas suivent le volume réel des factures",
      "Un cas par situation : avoir, acompte, litige, plusieurs dépôts",
      "Tu lui fais tester toutes les factures d'un mois, une à une",
      "L'intégrateur choisit les cas qui manquent : il voit le système"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Le volume ne dit pas le risque : le gros fournisseur passera, et les avoirs, jamais testés, sortiront à la bascule.",
      "Oui. On couvre les situations, pas le volume : une fois le cas courant prouvé, le risque est dans les cas rares et coûteux. Quelques cas du gros fournisseur suffisent.",
      "Non. Trop fort : 2 000 factures, des semaines de tests, et la plupart testent la même chose. Un cas par situation couvre mieux.",
      "Non. Les situations à risque, c'est Julie qui les vit. L'intégrateur ne sait pas quels litiges reviennent."
    ],
    retenir: "Les cas couvrent les situations du métier, surtout les rares et coûteuses, pas le volume."
  },
  {
    id: "cp19-q13",
    dialecte: "Gestion de projet",
    q: "Marc a écrit ses cas EDI : des factures AquaBleu qui passent bien. Aucun rejet. Or Marc est le seul à savoir reprendre un flux rejeté. Que fais-tu ?",
    choix: [
      "Tu valides : un rejet est rare, on le verra en production",
      "Tu écris toi-même le cas du flux rejeté : tu es le référent EDI",
      "Il ajoute des cas de rejet : un flux rejeté, repris, refacturé",
      "Il teste chacun des codes d'erreur prévus par le guide EDI"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Rare mais coûteux : un flux rejeté en juin, c'est une facture AquaBleu bloquée, et 20 % du chiffre d'affaires en jeu.",
      "Non. Tu sais lire un message EDI, mais la reprise, c'est son métier : écrit par toi, le cas teste ce que tu crois. Tu l'aides, il écrit.",
      "Oui. Les cas rares et coûteux d'abord. Marc écrit le rejet, la reprise et la nouvelle facture, comme il le fait vraiment. Le cas devient aussi une trace de ce qu'il sait.",
      "Non. Trop fort : des dizaines de codes, la plupart jamais vus chez vous. Les rejets que Marc reprend vraiment suffisent."
    ],
    retenir: "Un cas rare mais coûteux, comme un flux EDI rejeté, entre dans les cas de test : écrit par celui qui sait le traiter."
  },
  {
    id: "cp19-q14",
    dialecte: "Gestion de projet",
    q: "En recette, Sophie joue un avoir partiel. Divalto calcule la TVA sur toute la facture. Elle coche OK : « C'est comme ça que Divalto fait. » Son cas ne disait pas ce qu'on devait obtenir. Que fais-tu ?",
    choix: [
      "Le résultat attendu écrit avec sa cheffe, puis elle rejoue",
      "Rien : Sophie connaît ses avoirs mieux que personne d'autre",
      "Une anomalie ouverte, et classée bloquante",
      "L'intégrateur revoit tous les cas qu'elle a déjà cochés"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Sophie écrit, avec sa cheffe, la TVA attendue : celle du montant de l'avoir. Puis elle rejoue. L'écart reste ? C'est une anomalie, avec sa gravité.",
      "Non. Sans attendu écrit avant, on valide ce que le système fait. « C'est comme ça » ne veut pas dire « c'est juste ».",
      "Non. L'écart ressemble à une anomalie, mais l'attendu s'écrit d'abord, par le métier. Et la gravité se fixe avec lui, sur les définitions, pas par toi seul.",
      "Non. Trop fort : un cas sans attendu ne rend pas les autres faux. Et l'intégrateur jugerait son propre travail."
    ],
    retenir: "Sans résultat attendu écrit avant, on valide ce que le système fait : on écrit l'attendu, puis on rejoue."
  },
  {
    id: "cp19-q15",
    dialecte: "Gestion de projet",
    q: "Un fournisseur espagnol envoie ses factures en PDF, par e-mail : il reste hors de la PA. Julie : « Pas besoin de cas pour lui, il n'est pas dans le projet. » Que réponds-tu ?",
    choix: [
      "« D'accord : hors du projet, donc hors de la recette »",
      "« Si : un cas, pour vérifier qu'il passe toujours comme avant »",
      "« Alors on le fait passer par la PA, comme les autres »",
      "« Si : un cas, et son e-reporting avec le contrôleur de gestion »"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Le projet change la réception des factures dans Divalto. Ce qui reste hors PA doit encore marcher : sinon, ses factures se perdent, sans que personne le voie.",
      "Oui. Un flux hors du projet peut être cassé par lui : un cas vérifie qu'il passe toujours comme avant. C'est de la non-régression sur l'existant.",
      "Non. La facture électronique vise les échanges entre entreprises établies en France : lui n'est pas tenu de passer par une PA. Et ce serait changer le périmètre.",
      "Non. Presque : le cas, oui. Mais l'e-reporting est hors du périmètre de DEMAT : le contrôleur de gestion le porte, et le teste dans son projet."
    ],
    retenir: "La recette vérifie aussi que ce qui reste hors du projet passe toujours comme avant."
  },
  {
    id: "cp19-q16",
    dialecte: "Gestion de projet",
    q: "Mardi, en recette. Le comptable d'AquaBleu appelle : il a reçu par e-mail une facture de test. La copie de Divalto a gardé, par erreur, les vrais e-mails des clients. Que fais-tu d'abord ?",
    choix: [
      "Rien : une facture de test n'a aucune valeur pour lui",
      "Le commercial appelle AquaBleu pour s'excuser, tout de suite",
      "L'incident noté, pour le traiter après la recette",
      "Tu coupes les envois dans l'heure, puis Sophie rappelle AquaBleu"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Il l'a reçue, avec un montant : il peut la saisir, ou la payer. Et d'autres clients vont en recevoir, tant que l'envoi tourne.",
      "Non. Presque : AquaBleu doit être rassuré. Mais l'envoi tourne toujours : d'autres factures partent pendant l'appel. D'abord couper, puis expliquer.",
      "Non. Tant que l'envoi tourne, chaque test part chez un vrai client. Attendre la fin de la recette, ce sont des semaines de fuite.",
      "Oui. D'abord arrêter la fuite : les envois de la copie coupés. Puis Sophie, comptable clients, explique au comptable d'AquaBleu que c'est un test ; le commercial, qui gère la relation, est prévenu. Ensuite, les e-mails des contacts sont masqués."
    ],
    retenir: "Dans la copie de recette, les e-mails des contacts se masquent : rien ne doit partir chez un vrai client."
  },
  {
    id: "cp19-q17",
    dialecte: "Gestion de projet",
    q: "Ton projet Snowflake + Power BI. Le tableau des ventes est fini. Le développeur : « Les requêtes tournent, aucun chiffre vide. » Le directeur commercial s'en servira lundi en comité. Que fais-tu cette semaine ?",
    choix: [
      "Tu publies le tableau : le développeur l'a testé, ça suffit",
      "Tu compares toi-même chaque ligne de Snowflake avec Divalto",
      "Le métier compare le tableau au mois de mars clos",
      "Le directeur commercial le parcourt, et dit s'il lui convient"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Les requêtes tournent, mais rien ne dit que le chiffre est juste. Le test du développeur vérifie son travail, pas le besoin.",
      "Non. Trop fort, et pas ton rôle : des millions de lignes, une semaine de travail, et le métier n'a toujours rien validé.",
      "Oui. Pour un tableau, le résultat attendu, c'est un chiffre déjà sûr : le chiffre d'affaires de mars, clos par la compta. Le métier compare, puis valide par écrit.",
      "Non. Presque : le métier regarde, oui. Mais sans chiffre attendu, il juge l'allure, pas la justesse. Un total faux de 3 % passe inaperçu."
    ],
    retenir: "Recetter un tableau de bord : comparer ses chiffres à des chiffres sûrs, comme un mois clos, puis le métier valide."
  },
  {
    id: "cp19-q18",
    dialecte: "Gestion de projet",
    q: "Recette. Quatre anomalies sont ouvertes. D'après les définitions de ta stratégie, laquelle est majeure ?",
    choix: [
      "Les avoirs fournisseurs ne passent plus du tout dans Divalto",
      "Marc ressaisit à la main le n° de commande de chaque facture AquaBleu",
      "Un libellé du PDF des factures est mal orthographié",
      "L'écran des factures en attente trie par date, pas par nom"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Plus d'avoirs du tout : on ne peut plus recevoir une partie des factures. C'est bloquant.",
      "Oui. On peut facturer, mais avec un contournement coûteux : une ressaisie à la main, sur chaque facture, par une seule personne. C'est majeur.",
      "Non. Une gêne, sans effet sur l'envoi ni sur les montants : mineure, à mettre en réserve si elle reste au PV.",
      "Non. Le tri gêne, mais tout est là : c'est mineur."
    ],
    retenir: "Bloquante : on ne peut plus facturer ou recevoir. Majeure : un contournement coûteux. Mineure : une gêne."
  },
  {
    id: "cp19-q19",
    dialecte: "Gestion de projet",
    q: "Les avoirs d'un fournisseur arrivent sans lien avec leur facture : Julie les relie à la main, 30 par semaine. Le consultant classe l'anomalie « mineure ». Julie dit « majeure ». Que fais-tu ?",
    choix: [
      "Mineure : c'est lui qui connaît le système, il sait juger",
      "Bloquante : sinon, il ne la corrigera jamais avant le PV",
      "Le DAF tranche entre mineure et majeure, au COPIL",
      "Majeure, selon la définition : un contournement coûteux"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Celui qui corrige ne fixe pas la gravité : il aurait intérêt à la baisser. Il donne son avis technique, c'est tout.",
      "Non. On reçoit les avoirs : ce n'est pas bloquant. Gonfler la gravité use la confiance, et tout finit en « bloquante ».",
      "Non. Trop fort : les définitions sont écrites, il suffit de les appliquer. Le DAF n'a rien à trancher.",
      "Oui. La gravité se fixe sur les définitions écrites : on reçoit, mais 30 reprises à la main chaque semaine, c'est un contournement coûteux. Le métier la fixe, avec toi."
    ],
    retenir: "La gravité se fixe sur les définitions de la stratégie, par le métier avec toi : pas par celui qui corrige."
  },
  {
    id: "cp19-q20",
    dialecte: "Gestion de projet",
    q: "Le responsable ADV classe « bloquante » une anomalie : le logo du PDF est un peu flou. « Sinon, ils ne la corrigeront jamais. » Que fais-tu ?",
    choix: [
      "Mineure, selon les définitions, et corrigée à une date",
      "Majeure : un compromis entre son avis et les définitions",
      "D'accord : bloquante, puisque c'est lui qui signe le PV",
      "Le DAF fixe la gravité au prochain COPIL, pour trancher"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. On facture, rien n'est faux : c'est une gêne, donc mineure. Elle sera corrigée quand même : en réserve datée au PV, si elle reste. L'appeler « bloquante » ne la fait pas passer plus vite.",
      "Non. Presque : il baisse d'un cran. Mais une gravité ne se négocie pas : elle se lit dans les définitions. Une majeure retiendrait le PV pour un logo.",
      "Non. Signer le PV ne permet pas de changer les définitions : une « bloquante » de confort retiendrait le PV, et le solde de la PA, pour un logo.",
      "Non. Trop fort : les définitions sont écrites, les appliquer ne demande pas le DAF. Tu l'expliques au responsable ADV."
    ],
    retenir: "Une gravité gonflée bloque le PV pour rien : on applique les définitions, et le mineur se corrige quand même, daté."
  },
  {
    id: "cp19-q21",
    dialecte: "Gestion de projet",
    q: "Vendredi soir, le consultant passe 8 anomalies en « corrigée ». Il demande de les fermer : « Je les ai testées chez moi. » Que lui réponds-tu ?",
    choix: [
      "« Oui : tu les as testées, je les ferme et je préviens Julie »",
      "« Je les rejoue moi-même ce week-end, pour aller vite »",
      "« Oui, quand Julie et Marc les auront rejouées OK, mardi »",
      "« On rejoue les 120 cas : 8 correctifs d'un coup, c'est risqué »"
    ],
    bonne: 2,
    pourquoi: [
      "Non. « Corrigé chez moi » n'est pas « OK chez vous » : sa copie n'est pas celle de la recette. Une anomalie se ferme quand le testeur l'a rejouée OK.",
      "Non. Tu n'es pas le testeur : tu ne sais pas ce que Julie attendait exactement. Et ton test ne vaut pas validation.",
      "Oui. Les correctifs arrivent par la livraison de mardi, dans la copie de recette. Ceux qui ont trouvé les anomalies les rejouent, avec le lot de non-régression. Puis on ferme.",
      "Non. Trop fort : on rejoue les 8 cas et le lot de cas clés, pas toute la recette."
    ],
    retenir: "Une anomalie se ferme quand le testeur l'a rejouée OK dans la copie de recette, pas quand le fournisseur dit « corrigé »."
  },
  {
    id: "cp19-q22",
    dialecte: "Gestion de projet",
    q: "Fin de la 4e semaine : 2 bloquantes, 3 majeures, 9 mineures ouvertes. Le consultant a 3 jours cette semaine. Il veut commencer par les 9 mineures : « Vite fait, le compteur baissera. » Que fais-tu ?",
    choix: [
      "D'accord : 9 mineures de moins, le tableau de bord sera plus beau",
      "Les bloquantes, puis les majeures ; les mineures après",
      "Les plus anciennes d'abord, bloquantes ou pas ; chacune son tour",
      "3 jours de plus au DAF, pour les majeures et tout le reste"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Le compteur baisse, mais le PV ne bouge pas : il attend 0 bloquante et 0 majeure. Les mineures peuvent finir en réserves.",
      "Oui. On corrige par gravité : ce qui retient le PV d'abord. Les mineures viennent après, ou partent en réserves datées.",
      "Non. Presque : un ordre clair, oui. Mais l'ancienneté n'est pas l'impact : une bloquante d'hier passe avant une mineure d'il y a 3 semaines.",
      "Non. Trop fort : ses 3 jours, bien rangés, traitent l'essentiel. Une commande de plus se justifie par un reste à faire chiffré, pas par principe."
    ],
    retenir: "On corrige par gravité : les bloquantes, puis les majeures ; le mineur peut attendre, ou partir en réserve."
  },
  {
    id: "cp19-q23",
    dialecte: "Gestion de projet",
    q: "Julie a trouvé une anomalie sur un avoir. Quel ticket ouvre-t-elle ?",
    choix: [
      "« Avoirs KO depuis ce matin, c'est urgent : merci de regarder vite ! »",
      "« Cas F-17 en échec sur un avoir. Voir avec Julie. »",
      "« Le connecteur ne gère pas du tout les avoirs : à corriger avant le PV. »",
      "« F-17 : avoir attendu lié à sa facture, il arrive seul. Preuve jointe »"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Ni le cas, ni l'attendu, ni l'obtenu : le consultant devra appeler Julie pour comprendre. « Urgent » ne remplace pas les faits.",
      "Non. Presque : le n° du cas aide. Mais sans l'attendu ni l'obtenu, il faut appeler Julie : un ticket doit se suffire.",
      "Non. Une conclusion, pas un fait : quel avoir, quel écart ? Et le consultant contestera « ne gère pas ».",
      "Oui. Le cas, l'attendu, l'obtenu, une preuve : le consultant reproduit sans appeler personne. La gravité, Julie la fixe avec toi, sur les définitions."
    ],
    retenir: "Un ticket de recette : le cas, l'attendu, l'obtenu, une preuve. Le consultant reproduit sans appeler personne."
  },
  {
    id: "cp19-q24",
    dialecte: "Gestion de projet",
    q: "Recette. Le cas F-22 a échoué : Julie avait saisi le mauvais fournisseur. Elle a refait sa saisie, et le cas passe. Le consultant demande s'il doit ouvrir un ticket. Que réponds-tu ?",
    choix: [
      "« Non : rien de plus, une erreur de saisie n'est pas une anomalie »",
      "« Oui : tout échec se trace. Ouvre une anomalie mineure »",
      "« Non, mais Julie revoit la saisie en formation, avant de continuer »",
      "« Oui, et le cas entre dans le lot de non-régression »"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Une anomalie, c'est le livrable qui n'est pas conforme. Ici, le système a bien fait ; la saisie était fausse. Rejoué, le cas est OK. Si l'erreur revient souvent, c'est un sujet de formation (module cp23).",
      "Non. Un ticket pour une erreur de saisie fausse le compteur des anomalies, et le consultant cherche un défaut qui n'existe pas.",
      "Non. Trop fort : une erreur de saisie, une fois, arrive à tout le monde. Julie continue ses cas.",
      "Non. Le cas n'a rien révélé du système : il n'a rien à faire dans le lot de cas clés."
    ],
    retenir: "Une erreur de saisie du testeur n'est pas une anomalie : le cas rejoué OK est OK."
  },
  {
    id: "cp19-q25",
    dialecte: "Gestion de projet",
    q: "Février. Avec Julie, Sophie et Marc, tu choisis le lot de non-régression, à rejouer après chaque livraison de correctifs. Quels cas y mets-tu ?",
    choix: [
      "Les 20 premiers cas du cahier de recette, dans l'ordre",
      "Les 20 cas les plus simples : rejoués en une heure",
      "Un cas clé par flux, plus les cas rares et coûteux",
      "Les 120 cas à chaque livraison : rien ne doit échapper"
    ],
    bonne: 2,
    pourquoi: [
      "Non. L'ordre du cahier n'est pas le risque : le lot raterait peut-être AquaBleu ou les avoirs.",
      "Non. Rapides, mais ils ne testent pas ce qui casse : un réglage de TVA ou d'EDI passe inaperçu.",
      "Oui. Le lot doit voir tout de suite si un flux casse : un cas clé par flux (fournisseurs, clients, EDI, chaque site), plus les cas rares qui coûtent cher. 15 à 20 cas.",
      "Non. Trop fort : 6 semaines de tests après chaque livraison, la recette ne finit jamais. On rejoue un lot, pas tout."
    ],
    retenir: "Le lot de non-régression : un cas clé par flux, plus les cas rares et coûteux, choisis avant la recette."
  },
  {
    id: "cp19-q26",
    dialecte: "Gestion de projet",
    q: "Mercredi, après la livraison de mardi, le lot de non-régression échoue : les avoirs fournisseurs ne passent plus. Le consultant : « J'ai touché aux avoirs clients, pas aux fournisseurs. Ce n'est pas moi. » Que fais-tu ?",
    choix: [
      "Tu attends : Julie rejouera ce cas la semaine prochaine",
      "Tu le notes, et tu en reparleras à la livraison de jeudi",
      "Tu rejoues le cas toi-même, pour être sûr de l'échec",
      "Tu ouvres un ticket bloquant : il cherche dans sa livraison"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Plus d'avoirs fournisseurs du tout : c'est bloquant, et ça a cassé avec la livraison. Attendre une semaine, c'est perdre la piste.",
      "Non. Une bloquante attend 2 jours, sans ticket : la piste refroidit, et d'autres correctifs s'empilent par-dessus.",
      "Non. Le lot a déjà montré l'échec : le rejouer toi-même n'apprend rien de plus. Ce qui manque, c'est le ticket.",
      "Oui. Ça marchait avant la livraison : c'est une régression. Un ticket bloquant, avec le cas qui échoue, lié à cette livraison : la cause la plus probable est là. Il cherche d'abord dans ses changements."
    ],
    retenir: "Ce qui marchait et casse après une livraison est une régression : un ticket lié à la livraison, et on cherche là d'abord."
  },
  {
    id: "cp19-q27",
    dialecte: "Gestion de projet",
    q: "Le consultant installe ses correctifs au fil de l'eau, 3 ou 4 par jour, dans la copie de recette. Julie ne sait plus ce qu'elle teste, et rejoue sans arrêt. Que fais-tu ?",
    choix: [
      "Deux livraisons par semaine, annoncées, puis le lot rejoué",
      "Rien : plus il corrige vite, plus la recette avance",
      "Plus aucun correctif dans la copie avant la fin de la recette",
      "Julie rejoue le lot chaque soir, et note la version"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Des livraisons groupées et annoncées (ici, le mardi et le jeudi), avec la liste des correctifs. Julie sait ce qui a changé ; le lot de non-régression se rejoue après chacune.",
      "Non. Un terrain qui bouge chaque heure : un cas OK le matin peut échouer le soir, et personne ne sait quelle version est testée.",
      "Non. Trop fort : sans correctif, les anomalies restent ouvertes, et le PV ne se signe jamais.",
      "Non. Presque : le lot, oui. Mais chaque soir, Julie n'avance plus sur ses cas. Le problème, c'est le rythme des livraisons, pas son effort."
    ],
    retenir: "Les correctifs arrivent par livraisons groupées et annoncées ; le lot de non-régression se rejoue après chacune."
  },
  {
    id: "cp19-q28",
    dialecte: "Gestion de projet",
    q: "Avril. Le cas des acomptes, ajouté en mars au cahier de recette, a révélé une bloquante. Julie propose de le mettre dans le lot de non-régression, qui date de février. Que réponds-tu ?",
    choix: [
      "« Non : le lot est figé depuis février, on n'y touche plus »",
      "« D'accord : ce qui a cassé fort se surveille »",
      "« Oui, et tous les cas en échec avec lui : 25 de plus »",
      "« Seulement si l'intégrateur valide ce nouveau lot »"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Un lot figé vieillit : il ne surveille pas ce qu'on a appris en recette. Le cas des acomptes peut recasser à la prochaine livraison.",
      "Oui. Le lot vit : un cas qui a révélé une bloquante y entre, pour voir tout de suite s'il recasse. Ici, le oui simple est la bonne réponse : un cas de plus, pas dix.",
      "Non. Trop fort : un lot de 45 cas ne se rejoue plus deux fois par semaine. On ajoute ce qui a cassé fort, pas tout.",
      "Non. Le lot sert le métier : c'est lui qui choisit ce qui compte, pas l'intégrateur. Une condition de plus retarde un ajout évident."
    ],
    retenir: "Le lot de non-régression se tient à jour : un cas qui a cassé fort y entre."
  },
  {
    id: "cp19-q29",
    dialecte: "Gestion de projet",
    q: "Jeudi 29 avril, recette clients : 0 bloquante, 1 majeure ouverte (des avoirs à relier à la main, 30 par semaine), 2 mineures. La PA demande le PV. Que fais-tu signer ?",
    choix: [
      "Pas encore de PV : la majeure d'abord, puis 2 réserves datées",
      "Un PV avec 3 réserves datées, et la majeure suivie chaque jour",
      "Aucun PV avant que la majeure et les 2 mineures soient corrigées",
      "Un PV sans réserve : rien n'est bloquant, c'est l'essentiel"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Le critère est écrit : 0 bloquante, 0 majeure. La majeure se corrige et se reteste ; le PV suit, avec les 2 mineures en réserves, chacune datée.",
      "Non. Presque : des réserves, oui, pour le mineur. Mais ta stratégie dit 0 majeure : une réserve sur une majeure, c'est accepter un contournement coûteux sans l'avoir décidé.",
      "Non. Trop fort : les mineures n'empêchent pas le PV. Des réserves datées font le travail, sans bloquer le solde ni le pilote.",
      "Non. La stratégie dit aussi « 0 majeure » : Sophie relierait 30 avoirs à la main chaque semaine, après la bascule. Et sans réserve, les mineures sont acceptées."
    ],
    retenir: "Le PV suit les critères écrits : une majeure ouverte le retient ; les mineures partent en réserves datées."
  },
  {
    id: "cp19-q30",
    dialecte: "Gestion de projet",
    q: "Le responsable ADV hésite à signer le PV clients : « Si un défaut sort en juin, ce sera ma faute ? » Que lui réponds-tu ?",
    choix: [
      "« Oui : signer, c'est garantir qu'il n'y aura aucun défaut »",
      "« Ajoute « sous réserve de bon fonctionnement » : te voilà couvert »",
      "« Non : tu signes que tes cas passent. Après, on corrige »",
      "« Ne signe rien : le PV attendra la fin de la bascule, en juin »"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Personne ne garantit zéro défaut. Le PV dit : sur ces cas et ces critères, c'est accepté. Ce qu'aucun cas n'a vu se corrige après.",
      "Non. Une réserve générale ne vise aucun défaut précis : elle ne protège presque rien, et la PA la contestera. Une réserve, c'est un défaut, un ticket, une date.",
      "Oui. Il signe ce qu'il a vu : ses cas passent, selon les critères écrits. Un défaut trouvé après se corrige, selon le contrat (garantie, support : module cp14). Ce n'est pas sa faute.",
      "Non. Sans PV, ni solde ni pilote ; et les PV signés sont un critère de go de la bascule (module cp21). Attendre juin bloque tout, sans rien rendre plus sûr."
    ],
    retenir: "Le PV engage sur les cas joués et les critères écrits, pas sur zéro défaut. Une réserve vise un défaut précis, daté."
  },
  {
    id: "cp19-q31",
    dialecte: "Gestion de projet",
    q: "PV du 30 avril, 2 réserves mineures : un libellé du PDF, un tri d'écran. La PA propose d'écrire « corrigées dans une prochaine version du connecteur », à installer dans Divalto. Le gel commence avec le pilote, en mai. Qu'écris-tu ?",
    choix: [
      "Tu acceptes : la PA sait mieux quand sortent ses versions",
      "Une date pour chacune : le 14 mai, pendant le pilote",
      "Aucun PV tant que les 2 défauts ne sont pas corrigés",
      "Une date pour chacune : le 9 juillet, après la bascule"
    ],
    bonne: 3,
    pourquoi: [
      "Non. « Une prochaine version » n'a pas de date : la réserve ne se lève jamais, et tu n'as plus de levier.",
      "Non. Presque : une date, oui. Mais le 14 mai, c'est le gel : personne n'installera une version du connecteur pour 2 défauts mineurs, en plein pilote. Ta date serait fausse dès le départ.",
      "Non. Trop fort : 2 défauts mineurs ne retiennent pas le PV. Des réserves datées suffisent (module cp14).",
      "Oui. Une réserve se date. Ici, après la bascule : pendant le gel, du pilote au 25 juin, seules passent les anomalies bloquantes et les obligations légales (module cp10)."
    ],
    retenir: "Chaque réserve a une date réaliste, écrite au PV : ici, après le gel et la bascule."
  },
  {
    id: "cp19-q32",
    dialecte: "Gestion de projet",
    q: "Juillet. La PA livre la version du connecteur qui corrige les 2 réserves. Que fais-tu avant de l'installer en production ?",
    choix: [
      "Rien de plus : des défauts mineurs, que la PA a déjà testés",
      "Les 2 cas et le lot rejoués, puis la levée écrite par le métier",
      "Toute la recette rejouée : les 120 cas, 6 semaines",
      "Tu rejoues toi-même les 2 cas et le lot, puis tu lèves les réserves"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Mineurs, mais une version peut casser ailleurs. Et une réserve ne se lève pas sur la parole du fournisseur.",
      "Oui. Le métier rejoue les 2 cas, puis le lot de non-régression, dans la copie de recette. Puis il lève les réserves par écrit, comme il les a posées.",
      "Non. Trop fort : 6 semaines pour un libellé et un tri. Le lot de cas clés vérifie que rien d'autre n'a cassé.",
      "Non. Presque : les bons tests. Mais tu n'as pas signé le PV : lever une réserve, c'est au métier qui l'a posée. Ton test ne vaut pas validation."
    ],
    retenir: "Une réserve se lève par écrit, par le métier, après le retest et le lot de non-régression."
  },
  {
    id: "cp19-q33",
    dialecte: "Gestion de projet",
    q: "Tu prépares le modèle de PV de recette fournisseurs. Qu'y mets-tu ?",
    choix: [
      "« Recette OK », la date du jour, et la signature de Julie",
      "Les cas joués un à un, chacun signé par celui qui l'a testé",
      "Le périmètre, la version, les réserves datées, qui signe",
      "« Bon pour accord », signé par toi et par le consultant"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Rien ne dit ce qui est accepté, ni avec quelles réserves. Et Julie a fait les tests : elle n'approuve pas son propre travail.",
      "Non. Des signatures par cas, c'est la trace des tests, pas l'acceptation. Il faut une décision, par celui qui répond du métier.",
      "Oui. Le PV dit ce qui est accepté (périmètre, version), les résultats sur les critères, les réserves avec leurs dates, et la signature de l'A, ou de la personne qu'il a désignée.",
      "Non. Ni toi ni le prestataire n'acceptez pour le métier : le PV se signe par le responsable du métier."
    ],
    retenir: "Un PV dit ce qui est accepté, dans quelle version, sur quels résultats, avec quelles réserves datées, signé par le métier."
  },
  {
    id: "cp19-q34",
    dialecte: "Gestion de projet",
    q: "Jeudi 29 avril, 17 h. La dernière bloquante est corrigée, pas encore retestée : Julie la rejoue demain à 9 h. La personne désignée pour signer : « Je signe ce soir, le retest n'est qu'une formalité. » Que fais-tu ?",
    choix: [
      "Tu fais signer demain, après le retest OK, comme prévu",
      "D'accord : on gagne une soirée, et le retest suivra demain",
      "Ce soir, avec une réserve écrite : « sous réserve du retest »",
      "Tu fais rejouer les 120 cas avant de signer le moindre PV"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Corrigée n'est pas retestée : le PV attend le retest OK de demain matin. Le 30 avril tient, et le PV prouve ce qu'il dit.",
      "Non. Signé ce soir, le PV accepte une bloquante que personne n'a vue corrigée. Si le retest échoue, le PV est déjà signé.",
      "Non. Presque : la réserve dit le doute. Mais une bloquante ne se met pas en réserve : si le retest échoue, le PV est signé quand même.",
      "Non. Trop fort : on rejoue la bloquante et le lot de non-régression, pas toute la recette."
    ],
    retenir: "Corrigée n'est pas retestée : le PV attend le retest OK, même quand il ne reste qu'une formalité."
  },
  {
    id: "cp19-q35",
    dialecte: "Gestion de projet",
    q: "Mi-avril. Il manque 3 jours pour tenir le PV du 30 avril. Le consultant propose de sauter les cas de rejets EDI : « Ça n'arrive presque jamais. » Que fais-tu ?",
    choix: [
      "D'accord : 3 jours gagnés, et le PV reste au 30 avril",
      "Tu coupes plutôt les cas propres aux 2 autres dépôts",
      "Non : ces cas restent. PV 3 jours plus tard, dit au COPIL",
      "Tu demandes un intérimaire au DAF, et tu gardes la date"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Rares, mais coûteux : un flux rejeté en juin, c'est une facture AquaBleu bloquée, et Marc seul pour la reprendre. On ne coupe pas le risque pour tenir une date.",
      "Non. Presque : les rejets EDI restent. Mais ce qui change d'un dépôt à l'autre (numéros, adresses) n'est testé nulle part ailleurs. Et 3 jours tiennent dans ta tolérance.",
      "Oui. Les cas qui portent le risque restent : en retirer changerait ce que le PV prouve. 3 jours de plus, c'est dans ta tolérance (± 2 semaines) : tu décales, et tu le dis au COPIL. Au-delà, le DAF choisirait, risque connu (module cp18).",
      "Non. Trop fort : 3 jours dans la tolérance ne demandent pas de dépense. Tu décales, et tu informes."
    ],
    retenir: "Pour tenir une date, on ne coupe pas les cas qui portent le risque : dans ta tolérance, tu décales ; au-delà, le DAF choisit, risque connu."
  },
  {
    id: "cp19-q36",
    dialecte: "Gestion de projet",
    q: "Avril. Un responsable de site : « Arrêtez la recette au 15 avril. Le pilote de mai, en vrai, testera mieux que vos cas. » Que réponds-tu ?",
    choix: [
      "« D'accord : un mois en vrai vaut mieux que des cas écrits »",
      "« Non : le pilote confirme la recette, il ne la remplace pas »",
      "« Je le propose au DAF : 2 semaines de gagnées sur la recette »",
      "« Alors fin au 15 avril, et un pilote de 2 mois »"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Au pilote, ce sont de vraies factures : une erreur part chez le client, et se corrige par un avoir. Et le gel commence : seules les bloquantes passent.",
      "Oui. La recette prouve, sur des cas écrits, avant toute vraie facture. Le pilote confirme, sur 1 site et en vrai volume, ce qu'elle a prouvé. L'un ne remplace pas l'autre.",
      "Non. Rien à faire décider : la stratégie de recette est validée. Tu n'as pas besoin du DAF pour garder une recette contre une idée qui l'abîme.",
      "Non. Un pilote plus long ne rattrape pas une recette coupée : ses erreurs partent sur de vraies factures. Et 2 mois de pilote font glisser la bascule de juin."
    ],
    retenir: "Le pilote confirme en vrai ce que la recette a prouvé : il ne la remplace pas."
  },
  {
    id: "cp19-q37",
    dialecte: "Gestion de projet",
    q: "Pour gagner du temps, tu crées dans la copie de recette les commandes AquaBleu que Marc facturera en test. Le responsable ADV : « Alors c'est toi qui fais la recette ? » Que réponds-tu ?",
    choix: [
      "« Oui, et c'est plus sûr : je suis le référent des flux EDI »",
      "« Tu as raison : Marc saisira lui-même toutes ses commandes »",
      "« Non : c'est l'intégrateur qui les jouera, il est neutre »",
      "« Non : je prépare les données, Marc joue ses cas et juge »"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Référent du run, oui, mais pas utilisateur : si tu joues et valides, la recette ne prouve plus rien pour l'ADV.",
      "Non. Presque : il vérifiera ses commandes. Mais les saisir toutes lui prend des heures, pour une étape qu'on ne teste pas. Les créer pour lui est une aide.",
      "Non. Neutre ? Il testerait son propre paramétrage. Et l'ADV ne validerait toujours rien.",
      "Oui. Préparer les données, c'est aider. Jouer le cas et juger le résultat, c'est la recette : ça reste à Marc. Tu le dis simplement."
    ],
    retenir: "Préparer les données de test, c'est aider ; jouer les cas et juger le résultat, c'est la recette du métier."
  },
  {
    id: "cp19-q38",
    dialecte: "Gestion de projet",
    q: "Tu es DSI adjoint. Sur tes 3 projets, aucune stratégie de recette écrite : les PV arrivent la veille des mises en service, signés « pour ne pas bloquer ». Que fais-tu ?",
    choix: [
      "Tu signes toi-même les PV : tu as la vue sur tous les projets",
      "Une page de stratégie, exigée au cadrage de chaque projet",
      "Tu recrutes une équipe de 3 testeurs, dédiée à tous les projets",
      "Rien : chaque chef de projet fait sa stratégie à sa façon"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Tu n'as fait aucun test, et ce n'est pas ton métier : ta signature ne prouve rien pour les utilisateurs.",
      "Oui. Au cadrage, une page par projet : critères d'acceptation, gravités, qui teste, qui signe, quand. Les PV se signent alors sur des critères connus, pas la veille « pour ne pas bloquer ».",
      "Non. Trop fort pour une PME, et à côté : des testeurs ne remplacent pas le métier, le seul qui puisse dire « ça marche pour nous ».",
      "Non. Sans règle commune, chaque PV se négocie la veille : des mises en service sans critères, et des défauts acceptés sans le savoir."
    ],
    retenir: "Tu es DSI adjoint : chaque projet écrit sa stratégie de recette au cadrage, pour que chaque PV se signe sur des critères connus."
  },
  {
    id: "cp19-q39",
    dialecte: "Gestion de projet",
    q: "Tu es DSI adjoint. Migration Divalto au forfait. L'intégrateur propose une « recette usine » chez lui, sur une copie de vos données, et un PV signé par son chef de projet. Que demandes-tu ?",
    choix: [
      "Oui à sa recette usine, puis à celle de vos utilisateurs clés",
      "Rien de plus : au forfait, la qualité, c'est son affaire",
      "Tu relis son PV, et tu le signes avec lui pour la DSI",
      "Le seul rapport de sa recette usine, joint au dossier"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Sa recette usine est utile : un critère d'entrée, avec son compte rendu. Puis vos utilisateurs clés jouent leurs cas, et le métier signe le PV. Celui qui a construit ne juge pas son travail.",
      "Non. Au forfait, il paie ses erreurs, mais c'est vous qui vivez avec. Son PV dit que ça marche comme il l'a compris, pas pour votre compta.",
      "Non. Ni lui ni toi ne faites le métier : deux signatures qui ne prouvent rien pour la compta. Le PV se signe par le métier.",
      "Non. Presque : son rapport est un bon critère d'entrée. Mais seul, il prouve son travail, pas votre besoin : vos utilisateurs doivent jouer leurs cas."
    ],
    retenir: "La recette usine du fournisseur est un critère d'entrée : l'acceptation reste celle de tes utilisateurs, PV signé par le métier."
  },
  {
    id: "cp19-q40",
    dialecte: "Gestion de projet",
    q: "Tu es DSI adjoint. À chaque montée de version Divalto, la compta réécrit ses tests de zéro : 3 semaines de travail. La prochaine version est prévue en février. Que proposes-tu ?",
    choix: [
      "Les tests du métier supprimés : l'intégrateur teste chaque version",
      "Rejouer à chaque version toutes les recettes des projets",
      "Un lot de cas clés, tenu à jour, rejoué à chaque version",
      "Espacer les montées de version : une tous les 3 ans"
    ],
    bonne: 2,
    pourquoi: [
      "Non. L'intégrateur vérifie son travail, pas vos cas : la compta doit voir ses factures passer. On allège son travail, on ne le supprime pas.",
      "Non. Trop fort : des mois de tests à chaque version. Un lot de cas clés suffit à voir ce qui casse.",
      "Oui. Le lot de non-régression d'un projet resservira : les cas clés, tenus à jour, rejoués à chaque version sur une copie. Quelques jours au lieu de 3 semaines. Une partie peut s'automatiser.",
      "Non. Espacer, c'est prendre du retard sur l'éditeur et rendre la version suivante plus lourde. Le problème, c'est le coût des tests, pas les versions."
    ],
    retenir: "Un lot de non-régression tenu à jour resservira à chaque version : on ne réécrit pas ses tests à chaque fois."
  },
  {
    id: "cp19-q41",
    dialecte: "Gestion de projet",
    q: "Tu es DSI adjoint. Un chef de projet a réduit sa recette de 6 à 3 semaines pour tenir sa date. Le sponsor n'en sait rien : « Il veut sa date, il l'aura. » Que lui demandes-tu ?",
    choix: [
      "Rien : sa date est tenue, et c'est ce que veut le sponsor",
      "Qu'il remette les 6 semaines : la qualité ne se négocie pas",
      "Qu'il te passe le projet, et tu préviens le sponsor",
      "Qu'il montre au sponsor les cas qui sautent, et le risque"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Le sponsor a eu sa date sans savoir ce qu'elle coûte : la qualité paie en silence, jusqu'aux défauts en production.",
      "Non. Le sponsor peut faire payer la qualité, s'il voit le risque (module cp18). Ce n'est ni au chef de projet ni à toi de trancher à sa place.",
      "Non. Trop fort : il a fait un mauvais choix, pas une faute grave. Tu le fais corriger, et il apprend.",
      "Oui. Quels cas sautent, quel risque, quelles autres options (date, périmètre). Puis le sponsor choisit, en connaissant le prix, et c'est écrit."
    ],
    retenir: "Raccourcir une recette pour tenir une date, c'est faire payer la qualité : le sponsor le décide, en voyant le risque."
  }
];
