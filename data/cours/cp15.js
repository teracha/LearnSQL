// Chef de projet SI — Fiche de cours du module cp15 « Piloter prestataires et éditeurs ».
// Fond : pratiques de terrain du suivi des fournisseurs en PME / ETI. PMBOK (« contrôler les approvisionnements » :
// suivre le fournisseur contre son contrat). ITIL en une ligne (niveaux de support, incident ou problème).
// Les pratiques divergent sur l'ensemblier (le payer, ou garder la coordination en interne) : on le dit.
// - Les rendez-vous : point hebdo opérationnel ; comité fournisseur mensuel (SLA mesuré, retards, risques, plan
//   d'actions daté, compte rendu le jour même) ; responsable de compte si l'écart dure ; le DAF vient pour décider.
// - La régie : consommé + reste à faire = atterrissage ; alerte au DAF à 80 % (plus tôt si l'atterrissage dépasse) ;
//   relevé validé avant la facture ; le consultant reste sous l'autorité de son employeur (point juridique général).
// - La dépendance : documentation testée, binôme (payé en régie : le DAF décide), support de la DSI à côté du
//   consultant ; un autre consultant avant un autre prestataire. (cp07 = le risque ; ici = les actions avec lui.)
// - Le SLA : tes traces face à son rapport ; disponibilité jour et nuit, délais aux heures de support ; écart →
//   cause, plan daté, crédits décidés par le DAF ; SLA tenu ≠ service correct ; changer de prestataire en dernier.
// - Le support : N1 / N2 = support de la DSI, N3 = la PA ou l'intégrateur, par ticket ; un bon ticket ; un seul
//   canal ; relances aux échéances ; fermeture après confirmation ; incident ou problème (ITIL).
// - L'éditeur : le standard, la feuille de route, le spécifique (en surcharge, à part du standard), la montée de
//   version préparée (effets sur les spécifiques, test sur une copie, hors clôture), la version SaaS testée avant.
// - Plusieurs prestataires : le client coordonne, sauf ensemblier payé ; relation exigeante et juste ; bilan.
// Fil rouge : DEMAT 2027 (fiche fil rouge de docs/plan-chef-de-projet.md, qui fait foi), lignes « Contrats (module
// cp14) » et « Pilotage des prestataires (module cp15) ». Plan B, gel, 15 mars : inchangés. Aucun montant d'amende.
// Pages Divalto utilisées (base documentaire Divalto 10.13, lecture seule) : « Les surcharges multiples »,
// « Surcharge ou modification de vue », « x10 migration », « Avant migration, vérifier les modifications »,
// « Les opérations de maintenance ».
// Faits ajoutés (cohérents avec la fiche, à valider) : commande de l'intégrateur de 40 jours (exemples) ; le support
// de la DSI apporte ses tickets au comité ; les délais du SLA courent aux heures de support, en général dès le ticket ;
// l'annexe SLA numérote les priorités (1 : tout est bloqué ; 2 : une partie).
// Affirmation juridique hors fiche (générale, à faire vérifier) : diriger un consultant en régie comme un salarié
// (horaires, congés) est un risque de prêt de main-d'œuvre illicite.
// Frontières :
// - cp13 = consulter et choisir ; cp14 = contracter (clauses, avenant, pénalités, fiche d'une page) ; cp15 = piloter
//   après la signature. cp16 = l'échelle d'escalade (citée, pas refaite). cp18 = traiter un conflit (renvoi).
// - cp07 = la dépendance comme risque ; cp10 = anomalie ou changement ; cp12 = le budget du projet ;
//   cp22 = passage en run et clôture ; cp26 = manager son équipe.
LEARNSQL.cours.cp15 = {
  intro: "Au support, quand un ticket partait chez l'expert d'un prestataire, qu'est-ce qui le faisait avancer : tes relances, ou les faits écrits dedans ? Sur ta migration Divalto, qui suivait les jours de l'intégrateur ? Ici : piloter après la signature.",
  sections: [
    {
      titre: "Les rendez-vous : point hebdo et comité fournisseur",
      exemple: "DEMAT 2027. Chaque lundi, 30 minutes avec le consultant de l'intégrateur : jours, reste à faire, blocages.\nChaque mois, 1 heure de comité fournisseur avec le chef de projet de la PA (plateforme agréée) : SLA (le niveau de service promis), retards, risques, plan d'actions.\nLe jour même, ton compte rendu : chaque action, un nom et une date.",
      points: [
        "Le point hebdo est court : en régie, il se paie aussi.",
        "Le comité fournisseur suit le service. Le support de la DSI (direction des systèmes d'information) y apporte ses tickets. Le PMBOK (le guide américain) dit « contrôler les approvisionnements ».",
        "Un plan d'actions : des actions précises, chacune avec un nom et une date. « Nous allons renforcer l'équipe » n'en est pas un. Au comité suivant : fait, ou pas ?",
        "Le COPIL (comité de pilotage) en reçoit l'essentiel, et tranche ce qui le demande.",
        "Le responsable de compte de la PA vient quand un écart dure. Le DAF (directeur administratif et financier, ton sponsor) vient pour décider (crédits, avenant), pas pour écouter."
      ],
      retenir: "Chaque semaine, l'opérationnel. Chaque mois, le service et un plan d'actions daté. Le DAF vient pour décider."
    },
    {
      titre: "La régie : suivre les jours, chaque semaine",
      exemple: "Commande de l'intégrateur : 40 jours. Fin mars : 24 consommés.\nReste à faire, tâche par tâche : 19. 24 + 19 = 43 : 3 de trop.\nTu n'attends pas les 80 % : tu alertes le DAF le jour même, avec des options (retirer une tâche, ou une commande de plus, signée avant).",
      points: [
        "Chaque semaine : consommé + reste à faire = l'atterrissage (le total probable).",
        "Le reste à faire se donne tâche par tâche. Il ne baisse pas ? Regarde ce qui est vraiment fini, dans Divalto.",
        "Alerte au DAF à 80 % de la commande, même quand tout tient (2 lignes). Plus tôt si l'atterrissage dépasse.",
        "Chaque mois, le relevé (jour, tâche, durée), validé par toi avant la facture. Le risque est chez toi : un consultant qui attend, c'est un jour payé.",
        "Il reste le salarié de son employeur (horaires, congés). Toi, tu confies des tâches et tu suis le résultat. Le diriger comme ton salarié est, en général, un risque juridique (prêt de main-d'œuvre illicite)."
      ],
      retenir: "En régie : l'atterrissage chaque semaine, le relevé validé avant la facture, le DAF alerté tôt."
    },
    {
      titre: "Ne pas dépendre d'un seul consultant",
      exemple: "Un seul consultant connaît le paramétrage (le risque : module cp07). Sa documentation est un livrable de la commande.\nIl livre un tableau de paramètres, sans explication.\nLe support de la DSI le teste : peut-il changer un paramètre avec ce seul document ? Non. Livrable incomplet : tu l'écris le jour même.",
      points: [
        "Une documentation se teste : quelqu'un d'autre fait un petit changement avec elle seule. Sinon, elle n'est pas livrée.",
        "Un binôme : un 2e consultant qui pratique, pas qui lit les comptes rendus. En régie, ses jours se paient : le DAF décide, risque chiffré en main.",
        "Le transfert de compétences : le support de la DSI travaille à côté du consultant, sur les vraies corrections. Il apprend ; il ne corrige pas à sa place.",
        "Il change ? La passation prévue à la commande s'applique. Ses erreurs reviennent malgré recadrages et escalade ? Un autre consultant, avant un autre intégrateur."
      ],
      retenir: "Contre la dépendance : documentation testée, binôme, support qui apprend. Un autre consultant avant un autre prestataire."
    },
    {
      titre: "Le SLA : tes mesures contre le contrat",
      exemple: "Annexe SLA de la PA : 99,5 % par mois, jour et nuit (environ 3 h 30 de panne permise). Support de 8 h à 18 h, jours ouvrés : prise en charge en 1 h, portail rétabli en 4 h.\nAvril. Rapport de la PA : 99,8 %. Tes tickets : 6 h de panne. Au comité, tes relevés à côté du sien.",
      points: [
        "Qui mesure ? La PA, dans son rapport, et toi : tickets, heures de début et de fin. Sans tes traces, son chiffre fait foi.",
        "Un écart = un chiffre du contrat raté. La disponibilité compte jour et nuit, week-end compris. Les délais (1 h, 4 h) courent aux heures de support, en général dès le ticket.",
        "Chaque écart, même le 1er : la cause, un plan daté, le suivi au comité. Ça recommence après une promesse ? Son responsable de compte, en prévenant son chef de projet (module cp16).",
        "Les pénalités du SLA : des crédits sur l'abonnement, plafonnés. Tu apportes le calcul ; le DAF décide. Il y renonce ? C'est décidé : tu continues à mesurer.",
        "SLA tenu ne veut pas dire service correct : une lenteur se mesure, et va au comité. Changer de prestataire vient en dernier, avant le préavis (module cp14)."
      ],
      retenir: "Tes mesures contre le contrat : écart, plan daté, crédits décidés par le DAF. Changer vient en dernier."
    },
    {
      titre: "Le support : niveaux, tickets, un seul canal",
      exemple: "Lundi 8 h 10, Julie : « Le portail refuse les factures de 3 fournisseurs. »\nLe N1 (1er niveau du support de la DSI) note. Le N2 (2e niveau, plus technique) vérifie : ni le réseau, ni Divalto.\nIl ouvre un ticket au N3 (3e niveau, l'expert : ici, la PA).",
      points: [
        "N3 : la PA ou l'intégrateur, par ticket. Pour Divalto, l'intégrateur, partenaire de l'éditeur, lui remonte les bugs du standard. Date proche ? Demande aussi un contournement (une solution provisoire).",
        "Un bon ticket : quoi, depuis quand, combien ; comment reproduire ; l'impact ; la priorité du contrat (1 : tout bloqué ; 2 : une partie). Tout en priorité 1 ? Plus rien n'est prioritaire.",
        "Un seul canal : le ticket. Un appel direct au consultant ne laisse ni trace, ni délai, ni écart mesurable.",
        "Suivre sans harceler : tu relances aux échéances du contrat. Un ticket se ferme quand l'utilisateur confirme ; sinon, tu le rouvres.",
        "ITIL (les bonnes pratiques des services informatiques) sépare l'incident (rétablir vite) et le problème (la cause d'incidents qui reviennent). Même panne chaque lundi ? Demande la cause."
      ],
      retenir: "Un ticket utile : faits, comment reproduire, impact, priorité du contrat. Un seul canal ; la cause quand ça revient."
    },
    {
      titre: "L'éditeur : versions, standard ou spécifique",
      exemple: "La cheffe comptable veut un état des avoirs en attente. Le consultant propose un spécifique (un développement fait pour vous) : 3 jours.\nAvant : est-ce dans le standard ? Prévu dans une prochaine version ?",
      points: [
        "Le standard d'abord : montre-le au métier, il couvre souvent le besoin, présenté autrement. Puis la feuille de route (les versions annoncées).",
        "Un spécifique se paie à sa création, puis à chaque montée de version : vérifier, adapter, retester. Celui qui ne sert plus se supprime.",
        "Parfois il se justifie : une obligation, un gain chiffré plus grand que son coût, versions comprises. Alors : en surcharge (à part, sans modifier le standard, comme Divalto le recommande), documenté, retiré quand le standard le fera.",
        "Montée de version : Divalto publie ce qui change ; l'intégrateur en tire les effets sur tes spécifiques ; le métier teste sur une copie. Une version n'est maintenue qu'un temps : prépare la suivante avant.",
        "Jamais en clôture, ni pendant le gel (du pilote à la fin de la bascule). Un SaaS (logiciel loué en ligne) change pour tous à sa date : tu testes avant, dans l'espace de test."
      ],
      retenir: "Le standard d'abord. Un spécifique se justifie, se fait à part, se paie à chaque version. Une version se teste avant, hors clôture."
    },
    {
      titre: "Plusieurs prestataires, et la relation",
      exemple: "Le connecteur de la PA s'installe dans Divalto, paramétré par l'intégrateur. Aucun des deux n'est payé pour coordonner l'autre.\nC'est toi : un planning commun (la livraison de l'un est l'entrée de l'autre), une interface écrite (qui envoie quoi, qui reprend un rejet).\nS'ils s'accusent : module cp18.",
      points: [
        "Le client coordonne, sauf s'il paie un ensemblier : un prestataire qui coordonne les autres et répond du tout. Tu le pilotes. Il coûte plus : certaines DSI préfèrent garder la main.",
        "Exigeant et juste : des faits, le contrat, et le bon travail reconnu par écrit, son responsable en copie.",
        "Ni ami (on valide sans lire), ni ennemi (menaces, soupçons). Escalader n'est pas punir : après, tu continues avec ton interlocuteur.",
        "Ne fais pas leur travail : tu perds ton temps, et ils peuvent ne plus répondre du résultat.",
        "Fin de projet : un bilan écrit par fournisseur (délais, qualité, SLA, relation), partagé avec lui ; il nourrit le prochain choix (module cp13). DSI adjoint : comité mensuel pour les fournisseurs critiques, revue annuelle pour les autres."
      ],
      retenir: "Tu coordonnes, sauf ensemblier payé pour ça. Exigeant et juste : des faits, le bon travail reconnu. Un bilan écrit à la fin."
    }
  ]
};
