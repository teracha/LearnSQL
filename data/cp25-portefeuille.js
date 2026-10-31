// Chef de projet SI — Questions du module cp25 « Portefeuille et priorisation ».
// Fond (PMI, The Standard for Portfolio Management ; PRINCE2 et MoP ; Kanban : limiter le travail en cours ; SAFe, WSJF,
// donné comme repère ; finance : le coût irrécupérable ne compte pas ; pratiques de terrain en PME / ETI) : une seule
// porte, la fiche de demande d'une page (besoin, sponsor, valeur, obligation, urgence prouvée par une date, charge
// estimée par ceux qui feront) ; petite demande (moins de 5 jours) classée chaque lundi par le DSI, projet (5 jours et
// plus) classé au trimestre au comité de direction ; un besoin découpé reste un besoin ; un besoin nouveau n'est pas un
// changement du projet (cp10) ; des critères écrits et connus d'avance, changés seulement pour le classement suivant ;
// un seul classement ; l'obligation légale est un filtre, vérifiée (cp24) ; la valeur vient du business case (cp11) ; le
// risque de ne pas faire ; le coût (jours de la DSI et des métiers, euros) ; la capacité : le run d'abord (environ 60 %),
// les personnes rares, le temps des métiers, les dépendances ; limiter les projets en cours ; le DSI propose, le DG
// arbitre, il peut choisir autrement en voyant ce que ça décale, c'est écrit ; pas de file cachée ; « pas maintenant »
// vite, avec la raison et la date de revue ; quand tout tient, oui ; le calendrier se règle à la DSI ; ce qui est
// dépensé ne compte pas, dans les deux sens ; un report se dit au sponsor, tôt ; revue chaque trimestre ; la valeur se
// mesure après. Chef de projet : il ne choisit pas entre les projets, il donne les faits à son DSI, qui arbitre ou fait
// arbitrer (le DAF si un jalon sort de la tolérance, le DG si deux sponsors s'opposent). Les pratiques divergent (notes
// pondérées ou simple ordre, revue au trimestre ou au fil de l'eau) : on garde ce que dit la fiche.
// Fil rouge DEMAT 2027 et cadre « Tu es DSI adjoint » (fiche fil rouge de docs/plan-chef-de-projet.md, qui fait foi),
// ligne « Portefeuille (module cp25) » : la fiche d'une page (q01 à q07), le seuil de 5 jours (q01, q02, q04, q07, q21),
// le lundi et le trimestre (q01, q07, q21, q30), les critères écrits (q08 à q12), l'obligation vérifiée (q10, q11, q13,
// q14), le DSI propose et le DG arbitre (q09, q17, q22, q24), 60 % de run (q15), le report dit au sponsor avec la raison
// (q23, q26, q29), le chef de projet donne les faits à son DSI (q32 à q36). Lignes « La réglementation » (réception
// obligatoire depuis le 1er septembre 2026, émission au 1er septembre 2027, tout passe par une PA : q06, q10, q14 ; NIS2 :
// concerné ou pas, on le vérifie : q11), « Toi et ton DSI » (± 2 semaines ; un jalon hors tolérance, le DAF le jour
// même : q35, q36), « Changements » (le circuit des changements, le gel de mai, l'enveloppe agile et sa PO : q06, q28,
// q37), « Budget et business case » (environ 100 jours de temps interne : q16 ; 750 € le jour d'intégrateur : q17),
// « Planning » (connecteur au 1er mars, PV du 30 avril : q33, q35), « Les personnages » (l'équipe de 8, le comité de
// direction, le DG qui arbitre).
// Faits ajoutés (cohérents avec la fiche et les modules publiés, à valider ; à reprendre par cp27) :
// - Capacité de la DSI en 2028 : 8 personnes, environ 200 jours de travail chacune, 1 600 jours ; run (support,
//   exploitation, petites demandes) environ 60 %, 960 jours ; projets 640 jours (q15).
// - Demandes 2028 (jours internes de la DSI ; dépenses externes ; gain ; sponsor) : sécurité (double authentification,
//   sauvegardes) 60 j, 20 k€, pas de gain, un risque fort évité, le DSI ; migration de Divalto 200 j, 75 k€ (100 jours
//   d'intégrateur, hors spécifiques ; environ 86 k€ avec eux, cp11-q14), gain direct faible, une version qui vieillit,
//   le DAF ; WMS des 3 dépôts 300 j, 150 k€, 100 k€ de gain par an, après la migration (son interface se branche sur
//   Divalto), le directeur logistique ; tableaux Power BI des ventes 40 j, 0 € externe, 15 k€ par an, le directeur
//   commercial ; CRM 100 j, 40 k€, gain non chiffré (pas de business case en janvier 2028), le directeur commercial ;
//   prise de commande 80 j, 60 k€, 40 k€ par an, après le CRM, le directeur commercial ; portail fournisseurs 60 j,
//   30 k€, 10 k€ par an (« obligatoire » annoncé : faux, la loi passe par la PA), le DAF ; refonte de l'intranet 50 j,
//   15 k€, gain faible, le DG. Total : 890 jours pour 640 ; 390 k€ de dépenses externes.
// - Critères validés par le DG et envoyés aux directeurs en décembre 2027, avant les fiches. Comité de direction de
//   janvier 2028 : retenus, dans l'ordre, la sécurité, la migration de Divalto, le WMS, les tableaux Power BI des ventes
//   (600 jours, 40 de marge ; 245 k€ de dépenses externes, environ 256 k€ avec les spécifiques) ; pas maintenant,
//   revus en avril 2028 : le CRM (business case à faire), la prise de commande (après le CRM), le portail fournisseurs,
//   l'intranet. Le portail est retenu plus tard, puis arrêté en février 2029 (q26). La migration doit finir en juin
//   2028 (q19) ; en juin, elle glisse de 3 mois (q29). Le WMS : la consultation des éditeurs dès janvier 2028, la mise
//   en place après la migration (q19).
// - Une demande de quelques heures, dans un créneau run, se fait sans fiche (comme cp02-q08) ; en 2026-2027, le même
//   circuit existe déjà (fiche, lundi, trimestre) : ton DSI classe.
// - Scénarios : AquaBleu ouvre 2 magasins, 2 jours (q01) ; maquette de CRM, 3 jours, en couloir (q02) ; état des notes de
//   frais en attente, 3 jours (q03 ; hors de DEMAT) ; contrôle automatique d'un rejet EDI, 8 jours (q04) ; état des rejets EDI demandé au
//   consultant, 4 jours (q05) ; le DAF veut le portail (environ 60 jours) dans DEMAT en novembre 2026 (q06) ; 3 fiches de 4 jours (q07) ;
//   critère « image de l'entreprise » proposé la veille (q08) ; BL annoncés « obligatoires » par le commercial (q13) ;
//   développeur Power BI et SQL : 120 jours de projets, 140 demandés, prestataire à 750 € le jour (q17) ; 80 jours des
//   dépôts pour le WMS (q18) ; 8 jours libres une semaine pour les petites demandes (q21) ; ateliers du WMS décalés de
//   2 semaines pour l'inventaire (q22) ; portail : 25 k€ dépensés, 35 k€ à venir, 3 fournisseurs sur 600 intéressés
//   (q26) ; WMS : 210 k€ au lieu de 150, 20 k€ pour finir, mars 2029 (q27) ; écran des rejets à moitié fait, 2 jours sur
//   4, dans l'enveloppe, début avril 2027, doublon du portail de la PA (q28) ; la migration glisse de 3 mois en juin 2028 (q29) ; un ancien projet du
//   directeur logistique promettait 50 k€ par an, jamais mesurés (q31) ; un collègue ouvre les commandes EDI d'un
//   nouveau client en mars 2027 (q32) ; le directeur logistique veut le consultant 3 jours (q33) ; ton DSI veut 2 jours
//   par semaine de ton temps, le PV glisserait de 3 semaines (q35) ; l'administrateur réseau d'abord sur un autre
//   chantier, accès vers la PA une semaine plus tard (q36) ; module de relances clients placé en juillet 2027 (q37,
//   comme le projet de cp14-q03).
// Affirmations juridiques : aucune hors de la fiche. Déduite de la fiche : la loi n'exige pas de portail fournisseurs,
// tout passe par une PA (q06, q10, q23). Les « obligations » citées hors de la fiche (BL, NIS2) restent « annoncées, à
// vérifier » (module cp24) : q11, q13. Générale, non juridique : qui paie un dépassement dépend du contrat (q27, cp14).
// Déjà publiées ailleurs, pas reprises ici : cp01-q28 (trois projets, place pour deux), cp05-q40 (analyste Divalto à
// 200 % sur deux projets), cp23-q40 (trois projets sur l'ADV), cp08-q42 et cp03-q34 (suivre plusieurs projets), cp06-q06
// (Kanban pour les demandes EDI), cp06-q36 et cp09-q41 (petit besoin, petite démarche), cp22-q19 (écran des avoirs
// après la clôture), cp22-q39 (projet gardé ouvert), cp02-q08 (30 minutes dans le run), cp02-q32 (« pas maintenant »
// pour ton temps), cp02-q42 et q44 (run à 60 %, deux pics en juin), cp04-q37 (« tant qu'on y est », sans lien), cp10
// (backlog dans l'enveloppe), cp18 (deux demandes, une place, MoSCoW). Voisines, avec un autre angle : q06 et cp04-q37
// (ici : le sponsor lui-même, besoin lié aux factures, faux circuit du changement) ; q17 et cp05-q40 (ici : au
// classement, le total cache le goulot ; options chiffrées au DG) ; q18 et cp02-q44 (ici : le temps des métiers compté
// dans la capacité) ; q01, q02 et cp02-q08 (ici : des jours, pas des minutes) ; q05 et cp22-q19 (ici : la demande
// contourne la DSI) ; q14 et cp01-q28 (ici : le chef de projet répond à son DSI, dates en main) ; q28 et cp10 (ici : ce
// qui est déjà payé) ; q20 et cp02 (finir avant de commencer, à l'échelle du portefeuille).
// Frontières : le business case d'UN projet = cp11 ; prioriser DANS un projet (MoSCoW) et ta délégation = cp18 ; la
// charge d'une personne sur tous les projets = cp05 ; le reporting de plusieurs projets = cp08 ; la gouvernance d'un
// projet = cp09 ; le changement = cp10 ; la saturation d'une population = cp23 ; les règles qui s'appliquent = cp24 ;
// monter d'un niveau = cp16 ; ton temps = cp02 ; manager l'équipe = cp26 ; le budget SI annuel = cp27.
// Types : porte d'entrée q01 à q07 ; critères et obligation vérifiée q08 à q14 ; capacité, dépendances, projets en cours
// q15 à q20 ; qui décide et « pas maintenant » q21 à q25 ; reporter, arrêter, revoir q26 à q31 ; chef de projet dans le
// portefeuille q32 à q37. Cadres : « Tu es DSI adjoint » 21 questions (q07 à q12, q15, q17 à q27, q29 à q31) ; chef de
// projet DEMAT, 2026-2027, 16 questions.
// Anti-devinette (scores.js, sans connaître le sujet) : la bonne réponse est un extrême dans 8 questions sur 31 avec un
// axe d'action (la plus forte qui se justifie : q23, q24, q26, q35 ; la plus douce : q19, q22, q27, q36). Règles du
// module (sous 50 %) : « toujours l'obligation légale d'abord » 6 % des questions où ce choix existe (juste dans q14),
// « le DG ou le comité décide toujours » 7 %, « le sponsor le plus haut placé » 0 %, « refuser ou arrêter » 14 % (juste
// dans q12, q26, q37), « tout accepter, tout lancer » 10 % (juste dans q21), « le plus de valeur d'abord » 0 % ; en
// texte : « ton DSI » 44 %, « fiche » 33 %, « gain / valeur » 31 %. Règles générales (sous 60 %) : la plus petite action
// réelle 49 %, l'action moyenne 39 %, extrêmes écartés + chiffre ou date 40 %, + mot de méthode 38 %, écarter « rien »
// et le plus fort puis deux actions 37 %, le choix à deux actions 35 % (où il y en a), écarter absolus, oui, DAF / COPIL
// 33 %, jamais au-dessus du manager 25 %, toujours le sponsor 24 %, la plus longue 22 %, la plus courte 20 %, la plus
// forte si urgence 13 %, le seul choix avec un point-virgule 0 % (3 questions, toujours un choix faux). Testeur :
// le seul choix entre guillemets n'existe plus (q08, q22, q33 corrigés : il était bon 3 fois sur 3) ; le seul choix qui
// ne commence pas par « Tu » était bon 6 fois sur 7 : q04, q07, q12, q32 corrigés (reste q11, faux). « Aujourd'hui »,
// « le jour même », « dès », « Oui », « D'accord », « Tu acceptes », « Non : », le DG, le comité, le COPIL, le sponsor,
// « tout », « rien », « seul » : aussi dans des bonnes réponses ; chiffres, dates et points-virgules aussi dans des
// choix faux ; un « presque juste » dans 20 questions.
LEARNSQL.questions.cp25 = [
  {
    id: "cp25-q01",
    dialecte: "Gestion de projet",
    q: "Novembre 2027. AquaBleu ouvre 2 magasins : il faut les ajouter aux flux EDI, 2 jours de travail. Le directeur commercial veut que le comité de direction en décide. Que lui dis-tu ?",
    choix: [
      "« Bonne idée : au comité, le DG verra que c'est AquaBleu »",
      "« Je fais ces 2 jours ce week-end, sans fiche ni attente »",
      "« Une petite demande : mon DSI la classe lundi »",
      "« Elle attendra la revue du trimestre, en janvier »"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Le comité de direction classe les projets, une fois par trimestre. Y monter 2 jours de travail, c'est faire perdre du temps au DG (directeur général), et contourner le classement du lundi.",
      "Non. Ton week-end n'est pas une capacité : 2 jours faits en douce, personne ne les a classés, et tu t'épuises. La demande passe par la porte, comme les autres.",
      "Oui. Moins de 5 jours : une petite demande. Elle passe par la fiche, et ton DSI la classe lundi, sur les mêmes critères. AquaBleu (20 % du chiffre d'affaires) pèsera dans son rang.",
      "Non. La revue du trimestre est pour les projets de 5 jours et plus. Une petite demande n'attend pas 2 mois : elle se classe chaque lundi."
    ],
    retenir: "Une petite demande (moins de 5 jours) se classe chaque lundi à la DSI ; le comité de direction classe les projets."
  },
  {
    id: "cp25-q02",
    dialecte: "Gestion de projet",
    q: "Mars 2027, en pleine recette. Le directeur commercial, en couloir : « Tu connais Divalto. Fais-moi une maquette de CRM : 3 jours, entre deux tests. » Que réponds-tu ?",
    choix: [
      "« Fais une fiche de demande : mon DSI la classe lundi »",
      "« D'accord : je la ferai le soir, la recette n'en saura rien »",
      "« Après la recette : je la mets au calendrier de mai »",
      "« Vois avec le DG : un CRM, c'est forcément un projet »"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Une demande de quelques jours passe par la fiche, même en couloir : ton DSI la classe lundi, avec les autres. Ton temps, c'est lui qui l'arbitre. Toi, tu restes sur la recette.",
      "Non. 3 jours de toi pris en douce, en pleine recette : ta semaine déborde, et personne n'a choisi de donner ce temps au CRM (gestion des clients).",
      "Non. Presque : « pas maintenant », avec une date. Mais 3 jours, c'est du temps de la DSI : tu promets ce que ton DSI n'a pas classé. Quelques heures dans ton créneau run, oui (module cp02) ; des jours, non.",
      "Non. Trop haut : une maquette de 3 jours est une petite demande, classée le lundi par ton DSI. Le DG (directeur général) arbitre les projets, au comité de direction."
    ],
    retenir: "Une demande de quelques jours, même en couloir, passe par la fiche ; ton DSI la classe. Tu ne promets pas le temps de la DSI."
  },
  {
    id: "cp25-q03",
    dialecte: "Gestion de projet",
    q: "Février 2027. Julie remplit une fiche de demande : un état des notes de frais en attente, 3 jours, porté par la cheffe comptable. Case urgence, elle écrit « très urgent ». Que lui conseilles-tu ?",
    choix: [
      "« Parfait : avec ce mot, sa fiche passera devant »",
      "« Ajoute que le DAF la veut : ça comptera lundi »",
      "« Laisse vide : mon DSI jugera bien tout seul »",
      "« Écris une date, et ce qui arrive si on la rate »"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Tout le monde écrit « urgent » : un mot ne se compare pas. Le lundi, ton DSI classe des dates et des conséquences, pas des adjectifs.",
      "Non. Le rang de celui qui veut une demande n'est pas un critère. Et si le DAF (directeur administratif et financier) ne l'a pas demandée, c'est gonfler la fiche.",
      "Non. Sans date, ton DSI la classera comme si rien ne pressait : elle peut attendre, alors qu'elle a peut-être une vraie échéance.",
      "Oui. L'urgence se prouve : une date (la prochaine clôture, par exemple) et ce que coûte le retard. Avec ça, ton DSI peut la comparer aux autres, lundi."
    ],
    retenir: "Sur la fiche, l'urgence est une date et une conséquence, pas un mot : c'est ce qui se compare."
  },
  {
    id: "cp25-q04",
    dialecte: "Gestion de projet",
    q: "Septembre 2027. Référent EDI, tu corriges chaque matin le même rejet chez 3 clients. Un contrôle automatique demanderait 8 jours de travail. Que fais-tu ?",
    choix: [
      "Tu y passes 8 jours de ton run : le risque disparaît vite",
      "Une fiche, comme tout le monde : c'est un projet",
      "Tu continues à corriger chaque matin : c'est ton run",
      "Au DG, pour qu'il le finance en urgence"
    ],
    bonne: 1,
    pourquoi: [
      "Non. 8 jours pris au run, en douce : ton DSI croit ton run plein de tickets, et personne n'a comparé ce contrôle aux autres demandes.",
      "Oui. Même ton idée passe par la porte : 8 jours, c'est un projet. Tu écris la valeur (le temps gagné chaque matin) ; ton DSI le porte au classement du trimestre.",
      "Non. Corriger sans fin un rejet qui revient, c'est payer chaque jour un problème connu. Il faut au moins le proposer.",
      "Non. Trop haut, et trop vite : rien ne brûle, le rejet se corrige chaque matin. Le DG arbitre les projets au comité de direction, sur le classement de la DSI."
    ],
    retenir: "Même l'idée du chef de projet passe par la fiche : 5 jours et plus, c'est un projet, classé au trimestre."
  },
  {
    id: "cp25-q05",
    dialecte: "Gestion de projet",
    q: "Octobre 2027, DEMAT est clos. Le responsable ADV a demandé au consultant un état des rejets EDI : « 4 jours, le DAF signera la commande. » Ton DSI n'en sait rien. Que fais-tu ?",
    choix: [
      "Tu rappelles la règle au responsable ADV, sans plus",
      "Tu fais l'état toi-même cette semaine : aucun risque",
      "Tu préviens ton DSI, et tu fais annuler la commande",
      "Tu le dis à ton DSI, et tu l'aides à faire sa fiche"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Presque : la règle est la bonne. Mais ton DSI ne sait toujours rien, et rien n'est classé : les 4 jours partiront quand même, et l'état arrivera au run sans que le support le sache.",
      "Non. Tu deviens une 2e porte : des jours de toi, pris sur ton run, sans classement. Et l'ADV (administration des ventes) saura qu'il suffit de t'appeler.",
      "Non. Trop fort : le besoin peut être bon, et annuler ne règle rien. Ce qui manque, c'est le circuit, pas un veto.",
      "Oui. Une seule porte, même pour 4 jours payés ailleurs : ton DSI la classe lundi, et le run sait ce qui arrive. Si elle passe, le DAF signe la commande."
    ],
    retenir: "Une demande qui contourne la DSI revient à la fiche : sinon, le run hérite de ce que personne n'a classé."
  },
  {
    id: "cp25-q06",
    dialecte: "Gestion de projet",
    q: "Novembre 2026. Le DAF, ton sponsor : « Au passage, ajoute à DEMAT un portail pour que nos fournisseurs suivent leurs factures. » Un tel portail : environ 60 jours de travail. Que fais-tu ?",
    choix: [
      "Un autre besoin : une demande à la DSI, classée à part",
      "Tu l'ajoutes : le sponsor décide du périmètre de DEMAT",
      "Une demande de changement chiffrée, qu'il tranche au COPIL",
      "Tu refuses : DEMAT ne fait que ce que la loi impose"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Le portail a sa propre valeur, et la facture électronique ne l'exige pas : tout passe par la PA (plateforme agréée). 60 jours, c'est un projet à part : la fiche, puis le classement du trimestre. DEMAT garde son objectif et sa date.",
      "Non. Il décide du périmètre de DEMAT, pas de la place de la DSI. Glisser un autre projet dans un projet légal, c'est le faire passer devant les autres sans classement.",
      "Non. Presque : il tranche les changements de DEMAT, comme un état de plus (module cp10). Mais un changement ajuste ce que DEMAT livre ; un portail de 60 jours est un autre projet, qui se compare aux autres demandes.",
      "Non. Trop sec, et faux : DEMAT fait aussi du confort (les écrans de la compta). Le portail peut être utile ; il se classe ailleurs, pas dans DEMAT."
    ],
    retenir: "Un besoin nouveau ne se glisse pas dans un projet en cours, même par son sponsor : il passe par la fiche et le classement."
  },
  {
    id: "cp25-q07",
    dialecte: "Gestion de projet",
    q: "Tu es DSI adjoint. Février 2028 : le CRM (gestion des clients) n'a pas été retenu. Le directeur commercial envoie 3 fiches de 4 jours : écran clients, écran contacts, export. Que fais-tu ?",
    choix: [
      "Tu classes les 3 fiches lundi : chacune fait moins de 5 jours",
      "Tu en passes une par semaine, sans bruit, pour l'aider",
      "Un seul besoin de 12 jours : un projet, revu au trimestre",
      "Refusées aujourd'hui, et la ruse signalée au DG"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Un seul besoin, coupé en 3 pour passer sous le seuil : 12 jours de ton équipe, sans passer au comité. Les autres directions paieraient ces jours sans le savoir.",
      "Non. Tu l'aides en cachette : 12 jours pris au run, sans que personne l'ait choisi. Et chacun apprend qu'il suffit de découper.",
      "Oui. Un besoin, une demande : 3 × 4 = 12 jours, c'est un projet. Il rejoint le CRM à la revue d'avril, sur les mêmes critères. Tu le dis au directeur commercial, simplement.",
      "Non. Trop fort : le besoin peut être bon, et le DG n'a pas à juger une ruse. Tu rappelles la règle ; la demande suit le bon circuit."
    ],
    retenir: "Un besoin découpé en petites demandes reste un seul besoin : on le classe à sa vraie taille."
  },
  {
    id: "cp25-q08",
    dialecte: "Gestion de projet",
    q: "Tu es DSI adjoint. La veille du comité de janvier, les 8 demandes déjà notées, le DG veut un critère de plus : « l'image de l'entreprise ». Que proposes-tu ?",
    choix: [
      "Tu l'ajoutes ce soir, et tu renotes les 8 demandes",
      "« Oui, au prochain classement, annoncé à tous »",
      "« Non : les critères ne changent jamais »",
      "Tu en fais un critère pour les projets du DG seulement"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Presque : le critère peut être bon. Mais ajouté la veille, après avoir vu les demandes, il paraît fait pour un projet. Les sponsors n'ont pas pu y répondre.",
      "Oui. Le DG peut changer les critères : c'est lui qui arbitre. Mais pour le classement suivant, annoncés à tous avant les fiches. Demain, on classe sur les règles connues.",
      "Non. Les critères peuvent changer, l'entreprise aussi. Ce qui compte : les annoncer avant le classement, pas après.",
      "Non. Un critère pour les seuls projets du DG n'est plus un critère : c'est un passe-droit. Les autres directeurs le verront."
    ],
    retenir: "Les critères changent entre deux classements, annoncés d'avance ; jamais la veille."
  },
  {
    id: "cp25-q09",
    dialecte: "Gestion de projet",
    q: "Tu es DSI adjoint. Avant le comité, le DAF, le directeur commercial et le directeur logistique t'envoient chacun leur liste, avec leur numéro 1. Que présente le DSI ?",
    choix: [
      "Le numéro 1 de chaque liste : un projet par direction",
      "Les 3 listes et leurs raisons : le DG choisira",
      "Un vote du comité, demande par demande",
      "Un seul classement de toutes les demandes, sur les critères"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Un projet par direction paraît juste, mais il ignore la valeur, le risque et la capacité : un numéro 1 peut valoir moins que le numéro 2 d'un autre.",
      "Non. Presque : le DG arbitre, oui. Mais 3 listes sans règle commune ne se comparent pas : il trancherait sur l'éloquence, en séance.",
      "Non. Un vote compte des voix, pas de la valeur : les directeurs s'échangent leurs soutiens. Le DG arbitre, sur un classement fait avec les critères.",
      "Oui. Le DSI propose UN classement : toutes les demandes, les mêmes critères, la capacité. Le DG arbitre sur cette base, devant tous les directeurs."
    ],
    retenir: "Une seule liste pour toute l'entreprise, sur les mêmes critères : le DSI la propose, le DG arbitre."
  },
  {
    id: "cp25-q10",
    dialecte: "Gestion de projet",
    q: "Tu es DSI adjoint. Fiche du portail fournisseurs : le DAF coche « obligation légale ». « Avec la facture électronique, il le faut. » Que fais-tu ?",
    choix: [
      "Tu le classes en tête : une obligation légale passe d'abord",
      "Tu demandes au DG de dire si la loi s'applique ici",
      "Tu vérifies la source, puis tu le classes sur sa valeur",
      "Tu classes sa fiche au milieu, sans rien vérifier"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Une obligation annoncée n'est pas une obligation vérifiée. Ici, la loi demande de recevoir et d'émettre par une PA (plateforme agréée) : DEMAT le fait depuis 2027.",
      "Non. Le DG arbitre entre les projets ; il ne dit pas le droit. Ce qui s'applique se vérifie : la source, et si elle vous concerne (module cp24).",
      "Oui. Tu vérifies la source : la loi passe par la PA, pas par un portail. L'obligation est déjà remplie. Le portail reste utile : il se classe sur sa valeur (10 k€ par an, pour 60 jours), comme les autres.",
      "Non. Presque : ni en tête, ni en dernier. Mais sans vérifier, son rang tient au hasard : l'obligation compte, ou pas, selon ce qui est vrai. Ici, la loi passe par la PA."
    ],
    retenir: "Une « obligation légale » annoncée se vérifie avant de passer en tête. Le reste se classe sur sa valeur."
  },
  {
    id: "cp25-q11",
    dialecte: "Gestion de projet",
    q: "Tu es DSI adjoint. Fiche « sécurité » (double authentification, sauvegardes), portée par le DSI. Case obligation : « NIS2 ». Que fais-tu ?",
    choix: [
      "Tu notes « à vérifier » et tu la classes sur son risque",
      "En tête, au nom de NIS2 : la loi passe d'abord",
      "Tu l'écartes du classement, et tu fais vérifier NIS2",
      "Tu laisses le DG dire au comité si NIS2 vous concerne"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. L'obligation, tu la notes « à vérifier », et tu la fais vérifier (module cp24). La demande se classe sur son risque de ne pas faire : fort, pour 60 jours. Elle peut monter sans NIS2.",
      "Non. NIS2 (directive européenne sur la cybersécurité) : concerné ou pas, ça se vérifie (module cp24). Une obligation supposée n'est pas un critère.",
      "Non. Presque : la faire vérifier, oui. Mais l'écarter d'ici là, c'est oublier le risque : un compte piraté, des sauvegardes qui ne repartent pas, et la facturation s'arrête.",
      "Non. Le DG arbitre le classement ; il ne dit pas le droit. Ça se vérifie : le test de l'ANSSI (l'Agence nationale de la sécurité des systèmes d'information), l'avis d'un juriste (module cp24)."
    ],
    retenir: "Une obligation non vérifiée n'est pas un critère ; le risque de ne pas faire, lui, compte déjà."
  },
  {
    id: "cp25-q12",
    dialecte: "Gestion de projet",
    q: "Tu es DSI adjoint. Fiche du CRM (gestion des clients), ligne valeur : « Tout le monde en a un. » Le directeur commercial : « Pas besoin de chiffres. » Que fais-tu ?",
    choix: [
      "Tu le classes au milieu, faute de mieux",
      "Sans gain chiffré, il attend son business case",
      "Sa fiche complétée par toi, avec un gain estimé",
      "Tu le mets en tête : sans CRM, on perd des clients"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Un rang « au milieu » sans valeur, c'est un rang au hasard. Les sponsors qui ont chiffré leur gain seraient doublés par celui qui ne l'a pas fait.",
      "Oui. La valeur vient du business case (module cp11) : un gain, ses hypothèses, qui le mesure. Sans lui, la demande ne se compare pas : elle revient à la revue suivante, son business case en main.",
      "Non. Le gain est celui du métier : au sponsor de s'y engager, et de le mesurer après. Chiffré par la DSI, personne n'en répond.",
      "Non. « On perd des clients » : combien, lesquels ? Sans chiffre, c'est une peur, pas une valeur. Il faut l'écrire pour la classer."
    ],
    retenir: "Pas de valeur chiffrée, pas de comparaison : le business case d'abord (module cp11)."
  },
  {
    id: "cp25-q13",
    dialecte: "Gestion de projet",
    q: "Novembre 2026. Le commercial : « Les BL (bons de livraison) dématérialisés sont obligatoires aussi. Ajoute-les à DEMAT, il est prioritaire. » Que fais-tu ?",
    choix: [
      "Tu les ajoutes ; légaux comme DEMAT, ils sont prioritaires",
      "Tu lui dis non : il n'a aucune autorité sur DEMAT",
      "Tu les proposes au DAF, et tu les chiffres au cas où",
      "Tu fais vérifier ; d'ici là, rien n'entre dans DEMAT"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Une obligation annoncée n'est pas vérifiée. Et même vraie, elle ne s'ajouterait pas seule à DEMAT : elle aurait sa demande, sa date, son classement.",
      "Non. Presque : il n'a pas d'autorité sur DEMAT. Mais s'il avait raison, ce serait une vraie obligation : on vérifie avant d'écarter.",
      "Non. « Au cas où », c'est chiffrer sans vérifier : DEMAT grossit, et sa date légale recule, pour une obligation peut-être imaginaire.",
      "Oui. Une « obligation » se vérifie : sa source, et si elle vous concerne (module cp24). Les BL (bons de livraison) sont hors du périmètre de DEMAT ; vérifiée, l'obligation aurait sa propre demande, avec sa date."
    ],
    retenir: "Une obligation annoncée se vérifie ; vraie, elle a sa demande et sa date. Elle ne se glisse pas dans un autre projet."
  },
  {
    id: "cp25-q14",
    dialecte: "Gestion de projet",
    q: "Octobre 2026. Ton DSI prépare le classement du trimestre : « DEMAT peut-il attendre le trimestre suivant ? » Que lui réponds-tu ?",
    choix: [
      "« Oui : un trimestre de plus ne changera rien »",
      "« Oui, si le DAF est d'accord : c'est son projet »",
      "« Non : réception déjà due, émission en 2027 »",
      "« Non : DEMAT passe avant tout, même avant le run »"
    ],
    bonne: 2,
    pourquoi: [
      "Non. La réception est obligatoire depuis le 1er septembre 2026 : l'entreprise est déjà en retard. L'émission le sera au 1er septembre 2027 : le planning n'a pas un trimestre à perdre.",
      "Non. Le DAF ne peut pas décaler la loi : son accord ne change pas les dates. Ce qui se discute, c'est la façon de s'y conformer, pas le moment.",
      "Oui. Une obligation vérifiée, avec ses dates : elle passe d'office, et le planning dit qu'elle ne peut pas attendre. Ton DSI place les autres demandes autour.",
      "Non. Trop fort : légal, DEMAT passe devant les autres projets, pas devant le run. Une panne de facturation reste prioritaire."
    ],
    retenir: "Une obligation légale vérifiée passe d'office, à sa date : ici, DEMAT ne peut pas attendre."
  },
  {
    id: "cp25-q15",
    dialecte: "Gestion de projet",
    q: "Tu es DSI adjoint. Le DG : « 8 personnes à 200 jours par an, ça fait 1 600 jours. Les 890 jours de demandes passent tous. » Que réponds-tu ?",
    choix: [
      "« Non : après le run, 640 jours ; 250 de trop »",
      "« Oui : 890 sur 1 600, il reste même de la marge »",
      "« Oui : le run prend 40 % ; il reste 960 jours, tout passe »",
      "« Non : 890, c'est plus de la moitié des 1 600 jours »"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Run : 1 600 × 60 % = 960 jours. Reste 1 600 - 960 = 640 jours pour les projets. 890 - 640 = 250 jours de trop : il faut choisir.",
      "Non. Tu oublies le run : support, exploitation, petites demandes. Il passe d'abord, sinon il revient en urgences. Il prend environ 60 % du temps.",
      "Non. C'est l'inverse : le run prend environ 60 %, les projets 40 %. 960 jours, c'est le run ; il reste 640 jours, et les 890 ne tiennent pas.",
      "Non. Presque : c'est bien non. Mais pas pour cette raison : la place des projets, c'est ce qui reste après le run (60 %), soit 640 jours. Elle se calcule."
    ],
    retenir: "La capacité des projets, c'est ce qui reste après le run : ici, 640 jours sur 1 600."
  },
  {
    id: "cp25-q16",
    dialecte: "Gestion de projet",
    q: "Octobre 2026. Pour la fiche de demande de DEMAT, ton DSI te demande la charge. Que comptes-tu ?",
    choix: [
      "Les 40 jours de l'intégrateur : le gros du travail",
      "Les jours de la DSI, et à part ceux de la compta et de l'ADV",
      "Tes jours seulement : tu es le seul de la DSI sur DEMAT",
      "Rien : DEMAT est légal, sa charge ne change rien"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Ce sont des jours payés : ils vont au budget. La fiche dit aussi qui, chez vous, sera pris, et combien de temps.",
      "Oui. La capacité compte la DSI (toi, le support N2, l'administrateur réseau) et les métiers (Julie, Sophie, Marc en recette) : environ 100 jours en tout (module cp11). Des jours que les autres demandes n'auront pas.",
      "Non. Le support N2, l'administrateur réseau, la compta et l'ADV (administration des ventes) travaillent aussi sur DEMAT. Oublier leurs jours, c'est promettre deux fois le même temps.",
      "Non. Légal, DEMAT passe ; mais ses jours sortent de la même capacité. Sans eux, ton DSI classe les autres demandes sur une place qui n'existe pas."
    ],
    retenir: "La charge d'une demande compte la DSI et les métiers : c'est leur temps que les autres demandes n'auront pas."
  },
  {
    id: "cp25-q17",
    dialecte: "Gestion de projet",
    q: "Tu es DSI adjoint. Décembre 2027. Ton classement tient dans les 640 jours. Mais ton développeur Power BI et SQL n'a que 120 jours de projets : on lui en demande 140. Que fais-tu ?",
    choix: [
      "Tu lui demandes de choisir lui-même l'ordre de ses projets",
      "Il fera les 140 jours, avec des heures en plus",
      "2 options au DG : 20 jours de prestataire, ou un projet décalé",
      "Tu retires un projet du classement, sans le dire"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Tu lui donnes un arbitrage qui n'est pas le sien : le total cache le goulot, et il choisira selon qui crie le plus fort. Le choix entre projets se fait au comité.",
      "Non. 20 jours de plus, sur ta compétence la plus rare : s'il s'épuise ou s'en va, plusieurs projets s'arrêtent d'un coup.",
      "Oui. La capacité se compte aussi par personne rare. 20 jours d'un prestataire (20 × 750 = 15 000 €), ou un projet plus tard : le DG choisit, au comité, en connaissant le prix.",
      "Non. Changer le classement en silence, c'est décider à la place du DG. Le goulot se montre, avec ses options."
    ],
    retenir: "La capacité se compte aussi par personne rare : un total qui tient peut cacher quelqu'un à plus de 100 %."
  },
  {
    id: "cp25-q18",
    dialecte: "Gestion de projet",
    q: "Tu es DSI adjoint. Décembre 2027. Le directeur logistique : « Pour le WMS (logiciel d'entrepôt), mes dépôts ne peuvent pas donner 80 jours au printemps : c'est la saison. » Que fais-tu ?",
    choix: [
      "Rien : ton classement tient dans les jours de la DSI",
      "Des intérimaires en saison : la capacité des dépôts tient",
      "Tu reportes le WMS d'un an, et tu préviens le comité",
      "Tu places leurs travaux hors saison, et le calendrier suit"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Le WMS ne se fait pas sans les dépôts : ateliers, tests, formation. Une capacité qui ne compte que la DSI promet un calendrier faux.",
      "Non. Des intérimaires ne savent pas ce que le WMS doit faire : ce sont les magasiniers qui le savent. Et leur temps se décide avec leur directeur, pas à sa place.",
      "Non. Trop fort : il suffit de placer leurs travaux hors de la saison. Un gain de 100 k€ par an ne mérite pas un an d'attente.",
      "Oui. Le temps des métiers est une capacité aussi. Leurs travaux se placent avant ou après la saison ; le calendrier du WMS suit, et son sponsor le valide."
    ],
    retenir: "La capacité, c'est aussi le temps des métiers : on place leurs travaux quand ils peuvent les faire."
  },
  {
    id: "cp25-q19",
    dialecte: "Gestion de projet",
    q: "Tu es DSI adjoint. Le directeur logistique, sponsor du WMS (logiciel d'entrepôt) : « Il rapporte 100 k€ par an, le plus gros gain. Lançons-le en janvier, avant la migration de Divalto. » La migration finira en juin. Aucun éditeur n'a encore été consulté. Que proposes-tu ?",
    choix: [
      "Son choix dès janvier, sa mise en place après la migration",
      "Le WMS en janvier : le plus gros gain passe d'abord",
      "Le WMS en janvier ; son interface refaite après la migration",
      "Pas de WMS avant 2030 : trop gros pour la DSI"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. La dépendance décide de l'ordre : la consultation des éditeurs (module cp13) ne dépend pas de Divalto, elle part en janvier et prend le printemps, la saison des dépôts. En juillet, l'interface se construit une fois, sur la nouvelle version.",
      "Non. Le gain ne suffit pas : le WMS se branche sur Divalto. Construit avant la migration, son interface serait à refaire juste après : des jours payés deux fois.",
      "Non. Presque : partir tôt semble faire gagner des mois. Mais l'éditeur ne sera pas choisi avant le printemps, la saison des dépôts : on gagnerait quelques semaines, pour une interface payée deux fois, alors que la place manque déjà.",
      "Non. Trop fort : c'est le plus gros gain, et la migration lui ouvre la voie. Rien ne justifie de l'écarter des années."
    ],
    retenir: "Un projet qui dépend d'un autre vient après lui ; ce qui ne dépend de rien peut commencer avant."
  },
  {
    id: "cp25-q20",
    dialecte: "Gestion de projet",
    q: "Tu es DSI adjoint. Le DG : « Pourquoi choisir ? Lance les 8 demandes en janvier, chacune un peu. Tout le monde sera content. » Que réponds-tu ?",
    choix: [
      "« D'accord : on lance les 8, et on verra en avril »",
      "« Un seul projet à la fois : le plus gros gain d'abord »",
      "« 4 projets bien servis, et les autres revus en avril »",
      "« D'accord, si on embauche 2 personnes dès janvier »"
    ],
    bonne: 2,
    pourquoi: [
      "Non. 8 projets à la fois sur 640 jours : chacun avance lentement, les équipes passent d'un sujet à l'autre, et aucun ne livre son gain avant longtemps. En avril, rien ne sera fini.",
      "Non. Trop serré : un seul projet laisse des compétences sans travail (le développeur Power BI a peu à faire sur le WMS). Et le gain seul ne fait pas le classement : le risque, le coût, les dépendances comptent.",
      "Oui. Limiter les projets en cours : finir avant de commencer. 4 projets servis à plein livrent leur gain plus tôt ; les autres sont revus en avril, sur les critères.",
      "Non. 2 recrues en janvier ne seront pas efficaces avant des mois, et ce budget n'est pas voté (module cp27). Le problème reste : trop de projets ouverts."
    ],
    retenir: "Moins de projets en cours, c'est plus de projets finis : on finit avant de commencer."
  },
  {
    id: "cp25-q21",
    dialecte: "Gestion de projet",
    q: "Tu es DSI adjoint. Lundi : 3 petites demandes sans lien, de 1, 2 et 3 jours, chacune utile. Cette semaine, 8 jours sont libres pour elles. Que fais-tu ?",
    choix: [
      "Tu en prends une ; les 2 autres attendront lundi prochain",
      "Tu acceptes les trois : elles tiennent, tout simplement",
      "Tu les passes au comité : 6 jours en tout, c'est un projet",
      "Tu demandes d'abord une fiche plus détaillée pour chacune"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Retenir ce qui tient dans la place, c'est faire attendre pour rien. Classer sert quand la place manque.",
      "Oui. 6 jours sur 8 : elles tiennent. Utiles, petites, dans la place : oui, tout simplement. L'ordre dit seulement laquelle commence.",
      "Non. Trois demandes sans lien ne font pas un projet. Chacune fait moins de 5 jours : elles se classent lundi, à la DSI.",
      "Non. Une fiche d'une page suffit pour une petite demande. Demander plus, c'est ralentir sans rien apprendre."
    ],
    retenir: "Quand tout tient dans la place, on dit oui, tout simplement : classer sert quand la place manque."
  },
  {
    id: "cp25-q22",
    dialecte: "Gestion de projet",
    q: "Tu es DSI adjoint. Le WMS (logiciel d'entrepôt) est retenu. Pour l'inventaire des dépôts, son chef de projet veut décaler ses ateliers de 2 semaines. Le directeur logistique approuve ; rien d'autre ne bouge. Que fais-tu ?",
    choix: [
      "Tu le portes au comité de direction du mois",
      "« Non : un planning validé ne bouge plus »",
      "Tu demandes d'abord l'accord écrit du DG",
      "« D'accord : c'est du calendrier »"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Le comité de direction arbitre les priorités, pas 2 semaines d'ateliers qui ne gênent personne. Il y perdrait son temps.",
      "Non. Trop rigide : le sponsor est d'accord, l'inventaire est une vraie contrainte, et rien d'autre ne bouge.",
      "Non. Un détail de calendrier n'a pas besoin du DG : il a arbitré l'ordre, pas les dates des ateliers.",
      "Oui. Le classement (quoi, dans quel ordre) est au DG ; le calendrier, dans ce classement, se règle à la DSI avec le sponsor. Rien d'autre ne bouge : tu valides, et tu le notes."
    ],
    retenir: "Le DG arbitre le classement ; le calendrier, dans ce classement, se règle à la DSI avec le sponsor."
  },
  {
    id: "cp25-q23",
    dialecte: "Gestion de projet",
    q: "Tu es DSI adjoint. Comité de janvier 2028 : le portail fournisseurs n'est pas retenu. Le DAF, son sponsor, est parti avant la fin. Que fais-tu ?",
    choix: [
      "Tu l'appelles le jour même : la raison, la revue d'avril",
      "Tu lui écris le lendemain : « Non retenu, désolé »",
      "Tu lui promets le portail pour l'été, pour le rassurer",
      "Tu lui dis que le DG l'a refusé, sans lui donner de détail"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. « Pas maintenant » se dit vite, au sponsor : la raison (10 k€ par an pour 60 jours ; l'obligation, déjà remplie par la PA) et la date de revue. Il sait quoi faire d'ici là.",
      "Non. Presque : il est prévenu. Mais sans la raison ni la date de revue, il vit le report comme un rejet, et ne sait pas quoi améliorer.",
      "Non. Une promesse que le classement n'a pas faite : en avril, si d'autres demandes passent devant, tu ne la tiendras pas.",
      "Non. Le DG a arbitré sur la proposition de la DSI : te cacher derrière lui, c'est taire la raison. Le DAF reviendra, sans savoir quoi changer."
    ],
    retenir: "Un projet non retenu se dit à son sponsor, vite : la raison, et la date de revue."
  },
  {
    id: "cp25-q24",
    dialecte: "Gestion de projet",
    q: "Tu es DSI adjoint. Après le comité, le DG te glisse : « Mon intranet n'est pas retenu, je sais. Fais-le quand même, discrètement : 50 jours. » Que fais-tu ?",
    choix: [
      "Tu fais ses 50 jours : c'est le DG, il a le dernier mot",
      "Tu refuses, et tu le redis au comité suivant",
      "Tu lui montres ce que ça décale ; son choix sera écrit",
      "Tu le fais sur les 40 jours de marge ; 10 viendront du run"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Il a le dernier mot, mais pas en cachette : 50 jours pris quelque part, sans que le sponsor qui les perd le sache.",
      "Non. Le DG peut revenir sur un arbitrage : c'est lui qui arbitre. Ce que tu refuses, c'est la file cachée, pas sa décision.",
      "Oui. Il arbitre, il peut changer d'avis : la marge de 40 jours, plus 10 jours pris à un projet retenu. S'il maintient en le sachant, la décision est écrite, le sponsor touché prévenu. On applique.",
      "Non. Presque : les jours existent. Mais la marge sert aux imprévus des projets retenus, et 10 jours de run, ce sont des tickets en retard. Le tout, sans que personne le sache."
    ],
    retenir: "Même le DG passe par le classement : il peut décider autrement, en voyant ce que ça décale, et c'est écrit."
  },
  {
    id: "cp25-q25",
    dialecte: "Gestion de projet",
    q: "Tu es DSI adjoint. Février 2028. Le directeur commercial t'appelle chaque semaine pour son CRM, et en parle au DG à chaque couloir. Que fais-tu ?",
    choix: [
      "Tu remontes son CRM au classement : il l'aura de toute façon",
      "Tu l'aides sur son business case, pour la revue d'avril",
      "Tu lui réponds une fois pour toutes : « Non, c'est tranché »",
      "Tu demandes au DG de le recadrer au prochain comité"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Céder au plus bruyant, c'est apprendre à tous que crier marche. Les sponsors qui ont joué le jeu paient la différence.",
      "Oui. Ce qui fait monter une demande, ce n'est pas le bruit : c'est un gain chiffré (module cp11). Son CRM et sa prise de commande reviennent en avril, sur les mêmes critères.",
      "Non. Tu fermes la porte au lieu de lui montrer la voie. Il criera plus fort, et ailleurs.",
      "Non. Trop fort : il défend son projet, c'est son rôle. Le DG lui répondra au comité, sur des faits. Lui montrer comment faire monter son projet suffit."
    ],
    retenir: "Le bruit ne fait pas monter un projet : un business case, oui, à la revue suivante."
  },
  {
    id: "cp25-q26",
    dialecte: "Gestion de projet",
    q: "Tu es DSI adjoint. Février 2029. Le portail fournisseurs a coûté 25 k€ ; il en faut encore 35. Une enquête : 3 fournisseurs sur 600 s'en serviraient. Le DAF : « On ne va pas jeter 25 k€. » Que proposes-tu ?",
    choix: [
      "Le finir : sinon, les 25 k€ déjà payés seront perdus",
      "Le finir à moitié prix : la moitié des écrans seulement",
      "Le geler 6 mois, puis on verra bien ce qu'il en reste",
      "L'arrêter : les 25 k€ sont partis de toute façon"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Les 25 k€ sont dépensés dans tous les cas. La seule question : 35 k€ de plus, pour quoi ? Pour un portail dont presque personne ne se servira.",
      "Non. Presque : tu réduis la dépense. Mais la moitié d'un portail sans utilisateurs reste sans utilisateurs.",
      "Non. Geler, c'est garder un projet mort au classement, et ses jours réservés. L'enquête a déjà répondu.",
      "Oui. Ce qui est déjà dépensé ne compte pas pour décider de la suite. 35 k€ à payer, presque rien à gagner : tu proposes l'arrêt, avec la raison. Le DG décide au comité ; le DAF est prévenu avant."
    ],
    retenir: "Ce qui est déjà dépensé ne compte pas : on compare ce qui reste à payer à ce qui reste à gagner."
  },
  {
    id: "cp25-q27",
    dialecte: "Gestion de projet",
    q: "Tu es DSI adjoint. Mars 2029. Le WMS (logiciel d'entrepôt) a coûté 210 k€ au lieu de 150. Pour le terminer : 20 k€ de plus ; le gain de 100 k€ par an tient. Le DAF, au comité : « On a trop dépensé : arrêtons. » Que réponds-tu ?",
    choix: [
      "« Il reste 20 k€ pour 100 k€ par an : je propose de finir »",
      "« D'accord : 60 k€ de dépassement, il faut arrêter »",
      "« On finit les 20 k€ ; l'intégrateur paiera le dépassement »",
      "« On arrête : 100 k€ de gain ne valent plus ce coût »"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. On décide sur ce qui reste : 20 k€ à payer, 100 k€ par an à gagner. Le DG tranche, au comité. Le dépassement, lui, a ses causes à comprendre, à part.",
      "Non. Les 60 k€ de dépassement sont payés, qu'on arrête ou pas. Arrêter maintenant, c'est perdre 100 k€ par an pour économiser 20 k€.",
      "Non. Presque : finir, oui. Mais qui paie un dépassement dépend du contrat (régie ou forfait, module cp14), pas d'une phrase en séance.",
      "Non. Tu compares le gain au coût total, déjà payé en grande partie. Pour décider de la suite, seul compte ce qui reste : 20 k€ pour 100 k€ par an."
    ],
    retenir: "Un dépassement passé ne décide pas de la suite : on compare ce qui reste à payer à ce qui reste à gagner."
  },
  {
    id: "cp25-q28",
    dialecte: "Gestion de projet",
    q: "Début avril 2027. Dans l'enveloppe des écrans de la compta, l'écran de suivi des rejets est à moitié fait : 2 jours d'intégrateur sur 4. En recette, on voit que le portail de la PA affiche déjà les rejets et leur motif. La cheffe comptable : « On a payé 2 jours, finissons-le. » Que fais-tu ?",
    choix: [
      "Tu le finis : 2 jours déjà payés, l'arrêter serait du gâchis",
      "Tu lui montres le doublon, 2 jours de plus : elle choisit",
      "Tu l'arrêtes toi-même, et tu le dis au DAF au COPIL",
      "Tu le gardes au backlog, sans rien décider, au cas où"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Les 2 jours sont payés dans tous les cas. La question : 2 jours de plus, pour quoi ? Pour un écran que le portail de la PA fait déjà.",
      "Oui. Ce qui est dépensé ne compte pas : 2 jours de plus pour un doublon, ce sont 2 jours de moins pour une autre idée du backlog. Elle est la PO (celle qui classe le backlog) : elle décide.",
      "Non. Classer le backlog, c'est le rôle de la PO, pas le tien. Et ce détail, dans l'enveloppe, ne monte pas au DAF.",
      "Non. Un écran inutile qui reste au backlog garde sa place pour rien. Le fait est connu : il faut le dire, et qu'elle décide."
    ],
    retenir: "Ce qui est déjà payé ne justifie pas de continuer : on compare ce qui reste à faire à ce qu'il apporte encore."
  },
  {
    id: "cp25-q29",
    dialecte: "Gestion de projet",
    q: "Tu es DSI adjoint. Juin 2028 : la migration de Divalto glisse de 3 mois. Le WMS (logiciel d'entrepôt), qui en dépend, glissera aussi. La revue du trimestre est en juillet. Que fais-tu ?",
    choix: [
      "Tu le dis aujourd'hui au chef de projet du WMS, qui transmettra",
      "Tu lances le WMS sur l'ancienne version : le calendrier tient",
      "Tu préviens son sponsor dès aujourd'hui, avec la raison",
      "Tu proposes d'arrêter le WMS : trop de risques"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Presque : c'est dit tôt. Mais un report se dit au sponsor, avec la raison, par celui qui porte le classement. De seconde main, il arrive déformé, ou pas du tout.",
      "Non. Tu tiens sa date, mais son interface sera à refaire après la migration : des jours payés deux fois.",
      "Oui. Un report se dit tôt à son sponsor, avec la raison : la migration glisse, et le WMS en dépend. En juillet, la revue recale le calendrier et les jours libérés.",
      "Non. Trop fort : le WMS garde son gain de 100 k€ par an. 3 mois de retard ne le changent pas."
    ],
    retenir: "Un projet reporté se dit à son sponsor, tôt, avec la raison ; la revue suivante recale le reste."
  },
  {
    id: "cp25-q30",
    dialecte: "Gestion de projet",
    q: "Tu es DSI adjoint. Le DG : « Le classement de janvier vaut pour l'année. Plus de discussion jusqu'en décembre. » Que proposes-tu ?",
    choix: [
      "« D'accord : un an sans changement, c'est plus calme »",
      "« Une revue à chaque comité, tous les mois »",
      "« Chaque directeur le rouvre quand il le juge utile »",
      "« Une revue par trimestre : les faits changent »"
    ],
    bonne: 3,
    pourquoi: [
      "Non. En un an, tout bouge : des projets glissent, des gains se confirment ou tombent, des demandes arrivent. Un classement figé fait attendre le bon projet 11 mois.",
      "Non. Trop souvent : les priorités changent chaque mois, et les équipes ne finissent rien. Le trimestre laisse le temps d'avancer.",
      "Non. Rouvert à la demande, il n'y a plus de classement : celui qui insiste le plus le refait à son goût.",
      "Oui. Chaque trimestre, le comité revoit le classement : les nouvelles demandes, les projets en retard, les gains revus. Entre deux revues, le classement tient."
    ],
    retenir: "Le classement se revoit chaque trimestre : assez souvent pour les faits nouveaux, assez peu pour finir."
  },
  {
    id: "cp25-q31",
    dialecte: "Gestion de projet",
    q: "Tu es DSI adjoint. Fiche du WMS (logiciel d'entrepôt) : « 100 k€ de gain par an ». Le dernier projet du même sponsor promettait 50 k€ par an : personne ne les a mesurés. Que fais-tu ?",
    choix: [
      "Tu crois le chiffre : le sponsor connaît ses dépôts",
      "Tu fais mesurer l'ancien gain, et tu dates la mesure du nouveau",
      "Tu divises son gain par deux, et tu le classes ainsi",
      "Tu écartes le WMS tant que l'ancien gain n'est pas prouvé"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Un gain jamais mesuré n'apprend rien : ni au sponsor, ni au classement. Les fiches gonflées passent devant les fiches honnêtes.",
      "Oui. La valeur se suit après la livraison, par le métier (comme DEMAT, module cp22). L'ancien gain mesuré dit si les chiffres de ce sponsor tiennent ; le nouveau a sa date de mesure.",
      "Non. Un rabais au jugé est aussi arbitraire que le chiffre ; et le sponsor le saura : il gonflera la prochaine fois.",
      "Non. Trop fort : le WMS peut valoir beaucoup. On ne punit pas un projet pour l'oubli d'un autre ; on mesure."
    ],
    retenir: "Les gains se mesurent après la livraison : c'est ce qui rend les fiches suivantes crédibles."
  },
  {
    id: "cp25-q32",
    dialecte: "Gestion de projet",
    q: "Mars 2027. Un collègue chef de projet ouvre les commandes EDI d'un nouveau client. Il compte sur Marc les 2 mêmes semaines que ta recette EDI. Que fais-tu ?",
    choix: [
      "Tu fixes l'ordre avec ton collègue, puis tu le dis à ton DSI",
      "Tu laisses Marc choisir : il sait que DEMAT est légal",
      "Les faits à ton DSI : besoins, dates, ce qui glisse",
      "Au DG de trancher entre les deux projets"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Presque : ton DSI le saura. Mais fixer l'ordre entre vous, c'est choisir entre deux projets : ni toi ni ton collègue n'en avez le droit. Informer après, ce n'est pas faire arbitrer.",
      "Non. Tu mets Marc entre deux chefs de projet, et son temps est à son manager, le responsable ADV (module cp16). La loi pèsera dans l'arbitrage, mais ni toi ni Marc ne tranchez.",
      "Oui. Tu ne tranches pas entre les projets. Tu donnes les faits à ton DSI : les jours de Marc pour chacun, les dates, ce que chaque choix décale. Il arbitre, ou fait arbitrer.",
      "Non. Trop haut, et trop tôt : ton DSI peut arbitrer entre deux projets de la DSI. Le DG, c'est si deux sponsors s'opposent."
    ],
    retenir: "Une ressource partagée entre deux projets : tu donnes les faits à ton DSI, qui arbitre ou fait arbitrer."
  },
  {
    id: "cp25-q33",
    dialecte: "Gestion de projet",
    q: "Février 2027, paramétrage du connecteur. Le directeur logistique veut ton consultant pour un état des stocks : « Même intégrateur, et seulement 3 jours. » Que fais-tu ?",
    choix: [
      "L'impact à ton DSI : 3 jours sur ton chemin critique",
      "« D'accord : 3 jours, DEMAT ne le verra même pas »",
      "« D'accord, s'il passe une commande à part, chiffrée »",
      "Un refus : DEMAT est légal, il passe avant tout le reste"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Pas d'accord en couloir : tu donnes l'impact à ton DSI (3 jours sur le chemin critique, le 1er mars à risque). Il arbitre, ou fait arbitrer. Prêté, ce serait une commande à part.",
      "Non. Le consultant est le seul à connaître le paramétrage, et il est sur ton chemin critique : 3 jours de moins en février, c'est le connecteur du 1er mars en danger.",
      "Non. Presque : des jours pour un autre projet se commandent à part, signés par le DAF. Mais l'argent ne règle pas le temps : le paramétrage perd 3 jours, et ce choix entre deux projets n'est pas le tien.",
      "Non. Le légal pèse dans l'arbitrage, mais ce n'est pas toi qui arbitres. Un « non » sec à un directeur, sans ton DSI, crée un conflit pour rien."
    ],
    retenir: "Un autre projet veut ta ressource : pas d'accord en couloir, l'impact à ton DSI."
  },
  {
    id: "cp25-q34",
    dialecte: "Gestion de projet",
    q: "Janvier 2027. Ton DSI prépare le classement du trimestre pour le comité de direction. Que lui donnes-tu sur DEMAT ?",
    choix: [
      "Rien : DEMAT est légal, il passe de toute façon",
      "Ton avis sur les autres projets, pour l'aider à classer",
      "Tes 180 tâches, pour qu'il voie tout le détail",
      "Le reste à faire, les dates, les personnes partagées"
    ],
    bonne: 3,
    pourquoi: [
      "Non. Légal, DEMAT passe ; mais sa charge compte dans la capacité. Sans tes chiffres, ton DSI place les autres demandes sur des jours qu'il ne connaît pas.",
      "Non. Tu es juge et partie : ton avis sur les projets concurrents ne vaut pas plus que le leur sur DEMAT. Tu donnes les faits du tien.",
      "Non. Le détail sert à ton équipe, pas au classement : il lui faut des totaux et des dates, lisibles en 2 minutes.",
      "Oui. Les faits : le reste à faire en jours (la DSI, la compta, l'ADV), les dates, et les conflits sur les personnes partagées (Marc, le consultant). Ton DSI en a besoin pour placer les autres."
    ],
    retenir: "Pour le classement, le chef de projet donne les faits de son projet : charge, dates, conflits de ressources."
  },
  {
    id: "cp25-q35",
    dialecte: "Gestion de projet",
    q: "Mars 2027, recette. Ton DSI veut te prendre 2 jours par semaine pour un autre projet, jusqu'à fin avril. D'après toi, le PV du 30 avril glisserait de 3 semaines. Que fais-tu ?",
    choix: [
      "Tu acceptes, et tu rattrapes le soir et le week-end",
      "Tu lui dis : 3 semaines, hors tolérance, le DAF tranche",
      "Tu refuses à ton DSI : la recette passe avant tout",
      "Tu acceptes, et tu annonces 3 semaines au COPIL d'avril"
    ],
    bonne: 1,
    pourquoi: [
      "Non. 2 jours par semaine ne se rattrapent pas le soir, en pleine recette. Et ton DSI décide sur une fausse image : il croit que DEMAT ne perd rien.",
      "Oui. Tu donnes l'impact chiffré : le PV glisse de 3 semaines, au-delà de la tolérance de ± 2 semaines. Un jalon hors tolérance, c'est le DAF qui tranche : ton DSI le fait arbitrer, le jour même.",
      "Non. Ton temps, c'est ton DSI qui l'arbitre : refuser n'est pas à toi. Ton rôle : lui montrer ce que ça coûte.",
      "Non. Presque : le DAF doit savoir. Mais au COPIL du 13 avril, plus de la moitié de la recette est passée, et le jalon déjà perdu. Hors tolérance, le DAF tranche avant, le jour même."
    ],
    retenir: "Ton DSI arbitre ton temps ; si son choix fait sortir un jalon de la tolérance, le sponsor tranche, prévenu le jour même."
  },
  {
    id: "cp25-q36",
    dialecte: "Gestion de projet",
    q: "Janvier 2027. Ton DSI a tranché : l'administrateur réseau finit d'abord un autre chantier. Ton accès vers la PA arrivera une semaine plus tard, dans ta tolérance. Que fais-tu ?",
    choix: [
      "Tu demandes à ton DSI de revenir sur son choix",
      "Tu replanifies, et tu alertes le DAF le jour même",
      "Tu replanifies, et ton rapport au COPIL le dira",
      "Tu ouvres l'accès toi-même, pour ne rien perdre"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Il a arbitré sur tes faits, et rien de nouveau n'est arrivé. Revenir à la charge, c'est lui reposer la même question.",
      "Non. Presque : replanifier, oui. Mais le jalon reste dans la tolérance : le DAF n'a rien à décider. Le jour même, c'est quand on en sort.",
      "Oui. Dans ta tolérance, c'est ta délégation : tu replanifies, tu le dis au point projet, et le rapport du COPIL le montre. Le DAF le voit, sans décision à prendre.",
      "Non. Ce n'est ni ton métier, ni tes droits : un accès réseau mal ouvert est un risque de sécurité."
    ],
    retenir: "Un arbitrage qui reste dans ta tolérance : tu replanifies et tu informes, sans remonter."
  },
  {
    id: "cp25-q37",
    dialecte: "Gestion de projet",
    q: "Mai 2027. Le comité de direction a placé en juillet le module de relances clients. Le commercial : « Glisse-le dans DEMAT, le consultant est déjà là. » Que réponds-tu ?",
    choix: [
      "« Non : ce n'est pas DEMAT, et le comité l'a placé en juillet »",
      "« D'accord, s'il reste au consultant des jours avant juillet »",
      "« Vois avec mon DSI : le comité l'a placé, il peut l'avancer »",
      "« Je le propose au DAF en changement de DEMAT »"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Ici, le non est la bonne réponse : ce n'est pas le périmètre de DEMAT, et le classement est décidé. Le glisser en douce, c'est prendre des jours à d'autres. Il sera revu en juillet.",
      "Non. Presque : des jours peuvent rester. Mais ils sont à DEMAT, commandés par le DAF pour DEMAT. Et en mai, c'est le gel des changements.",
      "Non. Le DG a arbitré, sur la proposition de ton DSI : le renvoyer vers lui, c'est rouvrir le débat sans fait nouveau.",
      "Non. Le DAF décide de DEMAT, pas des autres projets : un projet classé ailleurs ne devient pas un changement de DEMAT."
    ],
    retenir: "Un projet reporté ne se glisse pas dans un autre en douce : il attend sa revue."
  }
];
