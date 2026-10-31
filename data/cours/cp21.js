// Chef de projet SI — Fiche de cours du module cp21 « Bascule et go / no-go ».
// Fond : PMBOK (transfert du livrable à l'exploitation ; décision du sponsor à un jalon), PRINCE2 (le comité décide aux
// points de décision ; gestion par exception), ITIL (transition : plan de déploiement, retour arrière testé, support
// renforcé après la mise en service ; incident ou demande de changement) et pratiques de terrain en PME / ETI (critères
// de go fixés avant, dossier d'une page, plan heure par heure, répétition, point de non-retour, hypercare avec un point
// quotidien). Les pratiques divergent : big bang, progressif (pilote, vagues) ou en parallèle selon le contexte ;
// certains déclenchent le retour arrière sur un seuil, DEMAT le fait décider par le DAF (il défait le go).
// - Critères de go : fixés avant, par le décideur, sur ta proposition ; mesurables (seuil, période, preuve), le résultat
//   et pas l'effort ; distincts des critères de succès ; presque atteints : go sous conditions écrit (quoi, qui, pour
//   quand, qui vérifie, sinon) ou no-go ; jamais réécrits la veille.
// - Préparer la décision : une page (critères et preuves, risques et parades, retour arrière, recommandation) ; R toi,
//   A le DAF (module cp09) ; pièges : le no-go par peur, le go forcé « par la loi » ; décision tracée ; le DAF choisit
//   autrement en connaissant le risque : on applique ; DSI adjoint : go / no-go taillé au risque, recommandation protégée.
// - Plan de bascule : heure, nom vu avec son manager, durée, contrôle nommé, quoi faire s'il échoue ; contacts écrits
//   (support de la PA en heures ouvrées) ; répétition chronométrée, plus une marge ; communiquer avant, pendant (heures
//   fixes), après ; branches no-go et retour arrière ; gel jusqu'à la fin de l'hypercare.
// - Retour arrière : écrit et testé avant (émission comprise) ; signaux, gestes, durée, décideur, heure limite ; le DAF
//   décide, ou celui qu'il a désigné par écrit ; point de non-retour : ensuite, on corrige en avant ; pas un échec.
// - Big bang, progressif, en parallèle : avantages et risques ; parallèle exclu pour des factures (doublons) ; base
//   unique : big bang répété ; partenaires EDI : par vagues ; la recette n'est pas le pilote.
// - Hypercare : tout en ticket, point court chaque jour, tri (bloquant, majeur, mineur ; demande nouvelle après le gel),
//   correction en production testée et tracée, 3 lignes au DAF le soir ; sa fin et le passage au run : module cp22.
// Fil rouge : DEMAT 2027 (fiche fil rouge de docs/plan-chef-de-projet.md, qui fait foi), ligne « Bascule (module cp21) » :
// 6 critères de go fixés au COPIL du mardi 11 mai ; go / no-go le vendredi 11 juin à 14 h (A le DAF, sur ta
// recommandation) ; plan heure par heure du vendredi 11 au lundi 14 ; retour arrière par le portail de la PA (le plan B),
// décidé au plus tard le lundi 14 à 12 h ; hypercare du 14 au 25 juin, point à 9 h 30 ; puis le run (cp22). Lignes
// « Planning » (pilote sur 1 site en mai, 3 sites en juin, marge légale juillet-août, pas d'août, report à mi-juillet sur
// décision du DAF), « Changements » (gel dès le pilote : le bloquant et le légal), « Reprise » (gel des créations de tiers
// le vendredi 11 à 12 h, reprise les 12 et 13 juin), « Contrats » (support de la PA de 8 h à 18 h, les jours ouvrés),
// « Recette » (PV avec 2 réserves mineures ; gravités bloquante, majeure, mineure).
// Faits ajoutés (cohérents avec la fiche et les modules publiés, à valider) : retour arrière testé fin mai (Sophie émet
// quelques factures par le portail, Julie en reçoit ; la compta n'y avait jamais émis) ; signal d'alerte : plus de 5 % de
// rejets le lundi matin ; messages au DAF et à ton DSI le samedi et le dimanche à 18 h ; Marc vérifie lundi les 1res factures EDI d'AquaBleu, absent du pilote (comme
// cp18-q03, qui donne aussi les 3 clients EDI du pilote) ; répétition de la bascule entière sur l'environnement de test ;
// point d'hypercare de 20 minutes (toi, le consultant, Julie, Sophie, Marc, le N2) ; 3 lignes au DAF chaque soir ; le
// gel court jusqu'à la fin de l'hypercare (lu comme « la fin de la bascule » de la fiche ; cp19 date les réserves du
// PV au 9 juillet, après le gel). Le week-end suit l'ordre de cp20 (samedi : sauvegarde et reprise ; dimanche :
// contrôles et signatures).
// Frontières : qui décide (RACI, séance du 11 juin) = cp09 ; la recette et les gravités = cp19 ; la reprise, ses essais à
// blanc et ses contrôles = cp20 ; le gel et le circuit d'un changement = cp10 ; les mots = cp17 ; le plan B et son
// déclencheur = cp07 ; tickets et niveaux de support = cp15 ; le temps des autres services = cp16 ; la fin de
// l'hypercare, le run et le bilan = cp22 ; la formation et l'adoption = cp23. Cités en une ligne, pas refaits.
LEARNSQL.cours.cp21 = {
  intro: "Sur ta migration Divalto, qui a dit « on y va », et sur quoi ? Pouvais-tu revenir en arrière ? Ici : décider la bascule (la mise en service), la préparer, savoir revenir, tenir les 2 semaines d'après. Qui décide : module cp09. La recette : cp19. La reprise : cp20.",
  sections: [
    {
      titre: "Les critères de go : fixés avant, mesurables",
      exemple: "COPIL (comité de pilotage) du mardi 11 mai 2027. Le DAF (directeur administratif et financier, ton sponsor) valide les critères de go de la bascule du lundi 14 juin :\n1. 0 anomalie bloquante ou majeure ouverte.\n2. PV (procès-verbaux) de recette signés.\n3. Pilote : moins de 2 % de factures rejetées par la PA (plateforme agréée), sur ses 2 dernières semaines.\n4. Reprise des tiers validée par le métier.\n5. Formation faite (module cp23).\n6. Retour arrière testé.",
      points: [
        "Go = on y va. Les critères se fixent avant, par celui qui décidera, sur ta proposition. Le jour J, on compare, sans débat.",
        "Mesurable : un seuil, une période, une preuve. « La compta se sent prête » n'en est pas un. On mesure le résultat : des cas « joués » ne disent pas s'ils ont réussi.",
        "Critère de go ≠ critère de succès : le go se juge avant, sur la fin du pilote ; le succès, après (moins de 2 % de rejets le 1er mois).",
        "Presque atteint ? Go sous conditions, écrit : quoi, qui, pour quand, qui vérifie, et sinon. La parade doit être sûre. Sinon, no-go : l'hypercare traite les petits écarts, pas une bloquante ou une majeure connue.",
        "La veille, on ne réécrit pas un critère pour qu'il passe : on montre l'écart, le DAF décide en le connaissant, et c'est écrit."
      ],
      retenir: "Critères fixés avant, mesurables, connus de tous. Le jour J, on compare ; on ne les réécrit pas."
    },
    {
      titre: "Préparer la décision : une page, une recommandation",
      exemple: "Vendredi 11 juin, 14 h, séance courte (module cp09). Le DAF décide, après l'avis de la cheffe comptable, du responsable ADV (administration des ventes) et de ton DSI (directeur des systèmes d'information).\nTa page :\n– Critères : 6 sur 6, preuves jointes.\n– PV : 2 réserves mineures, datées.\n– Risque : AquaBleu, 20 % du chiffre d'affaires, absent du pilote. Parade : Marc vérifie ses 1res factures.\n– Retour arrière : testé fin mai.\n– Recommandation : go.",
      points: [
        "Une page : chaque critère, atteint ou pas, avec sa preuve (un chiffre, un document daté). Puis les risques qui restent, avec leur parade. Puis le retour arrière.",
        "Puis ta recommandation : go, go sous conditions, ou no-go. Tu es R (tu réalises : tu recommandes) ; le DAF est A (il approuve : il décide).",
        "Deux pièges. Le no-go par peur : sur quel fait ? Le go forcé « parce que c'est la loi » : l'émission est obligatoire le 1er septembre 2027 ; un report à mi-juillet la tient (décision du DAF). Jamais en août.",
        "Décision prise : tu la reformules, tu l'écris au registre, tu l'annonces. Le DAF choisit autrement que toi, en connaissant le risque ? Tu appliques.",
        "Tu es DSI adjoint ? Le go / no-go se taille au risque : petit changement, liste courte, l'ancien gardé, le métier dit go. La recommandation d'un chef de projet reste la sienne."
      ],
      retenir: "Une page : critères et preuves, risques, retour arrière, ta recommandation. Le DAF décide ; tu appliques et tu traces."
    },
    {
      titre: "Le plan de bascule : heure par heure",
      exemple: "Extrait, du vendredi 11 au lundi 14 :\nVen. 12 h · gel des créations de tiers. 14 h · go / no-go.\nSam. et dim. · sauvegarde de Divalto, reprise des tiers vers la PA, contrôles, signatures (module cp20).\nSam. et dim. 18 h · ton message au DAF et à ton DSI.\nLun. 8 h · 1res factures par le connecteur. Marc vérifie celles d'AquaBleu, en EDI (échange de données informatisé).",
      points: [
        "Chaque étape : une heure, un nom (vu avec son manager), une durée, un contrôle avec un nom, et quoi faire s'il échoue.",
        "Les contacts : nom, numéro, heures. Le support de la PA répond de 8 h à 18 h, les jours ouvrés : pour le week-end, une présence s'obtient avant, par écrit.",
        "La répétition : on joue le plan avant, sur l'environnement de test, chronomètre en main. Les durées mesurées entrent au plan, plus une marge. La reprise a ses essais à blanc (module cp20).",
        "Communiquer avant (ce qui change, qui appeler), pendant (messages à heures fixes, même sans drame), après (« c'est fait », où signaler). Les mots : module cp17.",
        "Le plan prévoit aussi le no-go (qui prévenir, quoi défaire) et le retour arrière. Le gel tient jusqu'à la fin de l'hypercare (le support renforcé d'après) : le bloquant et le légal, seulement (module cp10)."
      ],
      retenir: "Heure par heure : qui fait quoi, quel contrôle, qui appeler. Joué avant, en répétition, avec ses branches no-go et retour arrière."
    },
    {
      titre: "Le retour arrière et le point de non-retour",
      exemple: "Retour arrière : les factures repassent par le portail de la PA (le plan B, prévu au contrat). Testé fin mai : Sophie y émet quelques factures, Julie en reçoit.\nLundi, plus de 5 % de rejets ? Alerte. 15 % à 10 h, sans cause connue : tu appelles le DAF, avec ta recommandation. Il décide avant midi, le point de non-retour.",
      points: [
        "Écrit et testé avant le go : c'est un critère. « Le portail, on connaît » : en réception, oui ; en émission, la compta ne l'a jamais fait.",
        "Il dit : les signaux d'alerte (un seuil, une heure), qui fait quoi pour revenir, en combien de temps, qui décide, jusqu'à quand.",
        "Il défait le go : le DAF le décide, sur ta recommandation, le jour même. Injoignable ? Il désigne avant, par écrit, qui décide à sa place. Le plan B, lui, part seul à son déclencheur (module cp07).",
        "Le point de non-retour, lundi midi : le matin, on voit les vrais flux ; après, trop de factures sont parties, revenir coûterait plus que corriger. On corrige en avant, avec des contournements.",
        "Revenir en arrière n'est pas un échec : c'est le plan qui marche. Tu le dis sans drame : ce qui change, quand vient la suite. La nouvelle date est au DAF."
      ],
      retenir: "Le retour arrière s'écrit et se teste avant. Jusqu'à lundi midi, le DAF peut décider de revenir ; après, on corrige en avant."
    },
    {
      titre: "Big bang, progressif ou en parallèle",
      exemple: "DEMAT : un pilote sur 1 site en mai, avec 3 clients EDI. Puis les 3 sites le 14 juin.\nTa migration Divalto : une seule base. Tout bascule le même week-end.\nTon projet Snowflake + Power BI : anciens et nouveaux rapports tournent ensemble sur une clôture, on compare, puis on coupe les anciens.",
      points: [
        "Big bang : tout en une fois. Pas de double circuit. Mais si ça casse, tout le monde est touché, et le support croule le 1er jour.",
        "Progressif : un site ou quelques clients d'abord (le pilote). On apprend en petit, on corrige, puis on étend. Mais c'est plus long, et deux façons de faire cohabitent.",
        "En parallèle : l'ancien et le nouveau tournent ensemble, on compare. Bien pour des rapports. Exclu pour des factures : chacune partirait deux fois (un doublon, qui se corrige par un avoir).",
        "Le contexte choisit. Une base unique : big bang, sécurisé par une répétition et une sauvegarde. Des partenaires EDI qui ont chacun leurs règles : par vagues.",
        "La recette vérifie que ça marche ; le pilote, que ça tient dans la vraie vie. Ce qu'il n'a pas vu (un gros client) mérite un contrôle de plus le jour J."
      ],
      retenir: "Big bang, progressif ou en parallèle : le contexte décide. Le pilote réduit le risque, s'il ressemble au réel."
    },
    {
      titre: "L'hypercare : 2 semaines de support renforcé",
      exemple: "Hypercare, du lundi 14 au vendredi 25 juin. Chaque jour à 9 h 30, 20 minutes : toi, le consultant, Julie, Sophie, Marc, le N2 (2e niveau du support de la DSI).\nMardi 15, 12 tickets :\n– bloquant : les avoirs clients ne partent plus. Corrigé le jour même, testé, tracé ;\n– 3 mineurs : une date chacun ;\n– une demande nouvelle (un état par dépôt) : écrite, pour après le gel.",
      points: [
        "Tout passe par un ticket, même ce qui arrive dans ton bureau. Sinon, rien n'est trié, et le grave se noie (module cp15).",
        "Le point de 9 h 30 est court : les tickets nouveaux, leur gravité, qui fait quoi, pour quand.",
        "Trier : bloquant (on ne peut plus facturer ou recevoir), tout de suite. Majeur (contournement coûteux) : le contournement, puis la correction après le gel, sauf décision du DAF. Mineur (une gêne) : une date. Une demande nouvelle n'est pas une anomalie : elle attend la fin du gel.",
        "Corriger en production : testé avant, tracé, dit à l'équipe, même pressé, même la nuit. Une correction sans trace se rattrape tout de suite : ticket, trace, test.",
        "Chaque soir, 3 lignes au DAF : tickets ouverts, rejets du jour, ce qui l'attend. Fin de l'hypercare et passage au run : module cp22."
      ],
      retenir: "En hypercare : tout en ticket, un tri chaque matin, le bloquant tout de suite, les demandes nouvelles après le gel."
    }
  ]
};
