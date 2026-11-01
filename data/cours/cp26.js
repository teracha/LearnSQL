// Chef de projet SI — Fiche de cours du module cp26 « Manager une équipe ».
// Fond : pratiques reconnues de management, adaptées au terrain PME / ETI. PMBOK (domaine « ressources ») : acquérir,
// développer et diriger l'équipe. Repères : le point individuel, le temps de la personne (A. Grove, High Output
// Management) ; le leadership situationnel (Hersey et Blanchard : l'autonomie suit la compétence) ; la délégation par
// niveaux (Management 3.0 en compte 7 ; le cours en garde 3) ; les objectifs SMART (Doran, 1981 : spécifique, mesurable,
// atteignable, réaliste, daté), le mot n'est pas cité ; le feedback « situation, comportement, impact » (SBI) et la
// critique du « sandwich » ; le désaccord sur une tâche n'est pas un conflit de personnes (Jehn) ; les entretiens de
// recrutement structurés, plus fiables qu'un entretien libre (Schmidt et Hunter) ; l'intégration planifiée ; le « facteur
// camion » (le savoir d'une seule personne). Les pratiques divergent (point individuel chaque semaine ou toutes les
// 2 semaines ; évaluation annuelle ou continue ; éloge en public ou en privé selon les personnes) : on garde la fiche.
// - Prendre son poste : écouter avant de changer ; le candidat qui n'a pas eu le poste l'apprend en privé, avant les
//   autres, par celui qui a décidé ; anciens collègues : même relation, mêmes règles, confidentialité.
// - Rituels (fiche) : réunion d'équipe le lundi à 9 h, 30 minutes (priorités, blocages, entraide) ; point individuel de
//   30 minutes toutes les 2 semaines avec chacun, son ordre du jour d'abord ; on le décale, on ne le supprime pas.
// - Déléguer : quoi, à qui (compétence et charge, pas l'amitié), 3 niveaux d'autonomie ; au 1er souci on aide, on ne
//   reprend pas ; une erreur répétée sur un risque fort : un niveau de moins, en disant pourquoi ; ce qui ne se délègue
//   pas : entretiens, feedback, recadrage, priorités de l'équipe ; tes 2 chefs de projet : ce que ton DSI te demandait (piloter,
//   faire faire, t'alerter d'abord, pas de surprise).
// - Objectifs et entretiens : un résultat, un chiffre, une date, une source, dans la main de la personne ; un chiffre
//   pousse à faire ce qu'il mesure ; l'entretien annuel en janvier, règle de l'entreprise, critères connus d'avance, sans
//   surprise ; l'entretien de parcours professionnel, la loi, tel que la fiche le donne.
// - Feedback et recadrage : tôt, des faits, l'impact, une demande ; le positif aussi ; ni sandwich, ni réparation à sa
//   place ; recadrer tout de suite, seul à seul ; un écart grave s'arrête sur-le-champ, d'une phrase.
// - Situations difficiles : performance (un plan écrit : faits, attentes, aide, délai ; la RH conseille) ; conflit (ni
//   parti pris, ni laisser durer : chacun, puis les deux ensemble, une règle écrite) ; un avis rapporté se vérifie ; un
//   désaccord franc n'est pas un conflit ; usure (signaux, en parler, alléger vraiment) ; run d'environ 60 % qui déborde :
//   les chiffres et des options à ton DSI.
// - Recruter (le besoin d'abord, la fiche de poste, des entretiens structurés), intégrer (accès, référent, plan), un départ
//   (dit vite, le jour choisi avec la personne ; un binôme sur les vrais cas ; une doc testée), faire grandir (un plan
//   écrit, pas une promesse ; un appui, des points serrés au début).
// Fil rouge : DEMAT 2027 et le cadre « Tu es DSI adjoint » (fiche fil rouge de docs/plan-chef-de-projet.md, qui fait
// foi), lignes « Manager l'équipe (module cp26) » (rituels, entretiens annuels en janvier, entretien de parcours
// professionnel, la RH en cas de doute sur une règle du travail), « Les personnages » (l'équipe de 8 et ses prénoms ;
// Nicolas, candidat au poste ; la responsable RH conseille les managers), « Portefeuille (module cp25) » (run environ
// 60 % ; migration de Divalto en 2028, qui glisse de 3 mois en juin), « Passage en run et clôture » (comité fournisseur
// avec la PA tenu par le support N2 après 2027), « Pilotage des prestataires » (le DAF décide des crédits du SLA).
// Faits ajoutés (cohérents avec la fiche et les modules publiés, à valider ; ceux des questions en tête de cp26-manager.js) :
// la 1re semaine de DSI adjoint (décembre 2027), un tête-à-tête de 30 minutes avec chacun des 8 ; Théo (N2) tient le
// comité fournisseur avec la PA dès janvier 2028 ; Samia (N1) : 45 % des tickets réglés au 1er niveau, objectif 70 %
// d'ici juin ; exemples du cours (section 4 : Samia règle seule 12 tickets Divalto, Yann coupe le réseau du dépôt sud
// 1 heure sans prévenir ; section 5 : juin 2028, Lucas fait des soirées ; section 6 : Yann, seul à connaître le
// pare-feu, part 3 semaines en août, Théo en binôme).
// Affirmations juridiques : seulement la fiche (entretien de parcours professionnel : loi du 24 octobre 2025, dans la
// 1re année après l'embauche, puis tous les 4 ans, état des lieux tous les 8 ans ; avant, « entretien professionnel »
// tous les 2 ans ; parcours, compétences, formation, pas l'évaluation du travail ; un écrit, copie remise ; l'entretien
// annuel est une règle de l'entreprise). Vérifié sur legifrance.gouv.fr le 1er novembre 2026 (loi n° 2025-989,
// article L6315-1 du Code du travail). Générale, non testée comme un fait : la suite d'une performance
// insuffisante a ses règles, que la RH connaît ; la RH conseille. Aucun montant, aucune sanction, aucune durée légale hors de la fiche.
// Frontières : ton temps et l'équipe qui t'interrompt = cp02 ; le rôle attendu (faire faire, rendre compte) = cp03 ; un
// consultant en régie ne se manage pas comme un salarié = cp15 ; diriger sans autorité = cp16 ; les mots = cp17 ; les
// conflits comme chef de projet, dire non = cp18 ; les relais et la résistance au changement = cp23 ; choisir entre les
// projets = cp25 ; le budget SI annuel, masse salariale comprise = cp27. Cités en une ligne, pas refaits.
LEARNSQL.cours.cp26 = {
  intro: "Sur ta démat fiscale, tu as coordonné environ 15 personnes sans être leur manager. Qui faisait leurs entretiens ? Qui leur disait « bravo », ou « ça ne va pas » ? Ici, c'est toi : tu manages l'équipe de la DSI (direction des systèmes d'information), 8 personnes, dont d'anciens collègues. Diriger sans autorité : module cp16 ; les consultants en régie : module cp15 ; le budget de la DSI : module cp27.",
  sections: [
    {
      titre: "Prendre son poste : anciens pairs et rituels",
      exemple: "Décembre 2027. Hier, Lucas et Hugo étaient tes collègues ; Nicolas voulait ton poste.\nTa 1re semaine : 30 minutes avec chacun des 8. « Qu'est-ce qui marche ? Qu'est-ce qui coince ? Qu'attends-tu de moi ? »\nLundi 9 h, ta 1re réunion d'équipe : tes rituels, ce que tu attends d'eux, ce qu'ils peuvent attendre de toi.",
      points: [
        "Les 1res semaines, tu écoutes avant de changer : ni réorganisation le 1er lundi, ni bilan de chacun devant tous.",
        "Le candidat qui n'a pas eu le poste l'apprend en privé, avant les autres, par celui qui a décidé. Puis tu lui parles franchement. Ni l'éviter, ni tout lui céder.",
        "D'anciens collègues : la même relation, les mêmes règles pour tous. Pas de passe-droit : une demande (augmentation, formation) suit le circuit de tous ; c'est toi qui la portes. Ce qui se dit avec chacun reste entre vous.",
        "La réunion d'équipe : le lundi à 9 h, 30 minutes. Les priorités, les blocages, l'entraide. Un sujet de deux personnes se règle après, entre elles.",
        "Le point individuel : 30 minutes toutes les 2 semaines avec chacun. Son ordre du jour d'abord (priorités, blocages, besoins), puis le tien ; l'état des tâches va dans l'outil. Tu le décales, tu ne le supprimes pas."
      ],
      retenir: "Prendre son poste : écouter chacun, mêmes règles pour tous, des rituels tenus (lundi 9 h, un point toutes les 2 semaines)."
    },
    {
      titre: "Déléguer : quoi, à qui, avec quelle autonomie",
      exemple: "Janvier 2028. Théo, au support N2 (2e niveau), tient désormais le comité fournisseur avec la PA (plateforme agréée).\nLe but : le SLA (niveau de service du contrat) tenu, un plan d'actions daté.\nSa limite : les crédits du SLA, le DAF (directeur administratif et financier) les décide.\nSon autonomie : « Tu décides, tu m'informes ; un écart qui dure, tu me préviens. » Un point après chaque comité.",
      points: [
        "Quoi : ce qu'un autre peut faire, et ce qui le fait grandir. Pas ce qui est à toi : entretiens, feedback, recadrage, priorités de l'équipe (module cp25).",
        "À qui : selon la compétence et la charge, pas l'amitié. Celui qui dit toujours oui est souvent déjà plein. Une procédure, celui qui l'applique l'écrit ; l'expert la relit.",
        "L'autonomie, en 3 niveaux : « tu proposes, je décide » ; « tu décides, tu m'informes » ; « tu décides seul ». Selon la compétence et le risque. Tu donnes le résultat, la date, les limites, un point ; pas le « comment ».",
        "Au 1er souci, tu ne reprends pas : « Que proposes-tu ? » (module cp03). Une erreur qui se répète, un risque qui grandit : tu baisses d'un niveau, en disant pourquoi, sans tout reprendre.",
        "Tes 2 chefs de projet : tu leur demandes ce que ton DSI te demandait. Piloter, faire faire, t'alerter tôt, toi d'abord : pas de surprise. Tu ne fais pas leur projet ; tu les aides à le tenir."
      ],
      retenir: "Déléguer : un résultat, des limites, un niveau d'autonomie clair, un point. Au 1er souci, tu aides ; tu ne reprends pas."
    },
    {
      titre: "Objectifs et entretiens",
      exemple: "Samia, au support N1 (1er niveau).\nObjectif flou : « Améliorer le support. »\nObjectif clair : « D'ici juin, 70 % des tickets réglés au 1er niveau, sans être rouverts. Aujourd'hui : 45 %. Source : l'outil de tickets. »\nEn janvier, l'entretien annuel fait le bilan, sans surprise : tout a été dit aux points individuels.",
      points: [
        "Un objectif clair : un résultat, un chiffre, une date, une source. Dans la main de la personne (« zéro panne » ne dépend pas que d'elle). 3 à 5 objectifs, pas 10.",
        "Un chiffre pousse à faire ce qu'il mesure : « 10 états livrés par mois » pousse à livrer vite, pas juste. Mesure le résultat ; revois un objectif qui dérape.",
        "L'entretien annuel, en janvier : le bilan, les objectifs, les besoins de formation. Une règle de l'entreprise, pas la loi. Des critères connus d'avance ; un nouveau vaut pour l'année suivante. Un chef de projet donne son avis ; l'entretien reste à toi.",
        "La loi impose l'entretien de parcours professionnel (loi du 24 octobre 2025). Dans la 1re année après l'embauche, puis tous les 4 ans ; un état des lieux tous les 8 ans. Avant : l'« entretien professionnel », tous les 2 ans.",
        "Il porte sur le parcours, les compétences, la formation, pas sur l'évaluation du travail. Un écrit, dont une copie est remise au salarié. Un doute sur une règle du travail : la RH (ressources humaines)."
      ],
      retenir: "Des objectifs mesurables. L'entretien annuel : la règle de l'entreprise, sans surprise. Le parcours professionnel : la loi, sans évaluation, par écrit."
    },
    {
      titre: "Le feedback et le recadrage",
      exemple: "Lundi, devant l'équipe : « Samia a réglé seule 12 tickets Divalto cette semaine. Avant, ils allaient au N2. Merci. »\nJeudi, seul à seul avec Yann : « Ce matin, le dépôt sud a perdu le réseau 1 heure. Son responsable n'était pas prévenu. Je te demande de prévenir la veille. Qu'est-ce qui t'en a empêché ? »",
      points: [
        "Un feedback se donne tôt, sur des faits (ce qu'une caméra aurait filmé), avec l'impact et ta demande. Ni jugement (« tu manques de rigueur »), ni menace. Les mots : module cp17.",
        "Le positif aussi, précis : ce qu'il a fait, ce que ça a permis. Un succès peut se dire devant l'équipe ; une critique, seul à seul.",
        "Ne noie pas le message : un « mais » entre deux bravos, et seuls les bravos restent. Ne répare pas à sa place : celui qui a fait corrige.",
        "Un comportement qui gêne se recadre tout de suite, seul à seul, pas à l'entretien annuel. D'abord les faits, puis sa raison : il en a peut-être une.",
        "Un écart grave (humilier un collègue, mettre la production en danger) : tu l'arrêtes sur-le-champ, d'une phrase calme, puis seul à seul, le jour même. La RH conseille la suite."
      ],
      retenir: "Un feedback : tôt, des faits, l'impact, une demande. Le positif aussi. Une critique, seul à seul ; un écart grave s'arrête sur-le-champ."
    },
    {
      titre: "Les situations difficiles : performance, conflit, usure",
      exemple: "Juin 2028, la migration de Divalto glisse. Lucas fait des soirées, 2 tableaux sont partis avec des erreurs, il s'agace en réunion.\nAvant de parler performance, seul à seul : « Je te vois tendu, et 2 tableaux sont revenus. Comment ça va ? »\nSa charge d'abord : ce qui peut attendre, tu le décales.",
      points: [
        "Une performance insuffisante, après 2 discussions : un plan écrit, avec la personne (faits, attentes, aide, délai, un point régulier). La RH te conseille avant, et sur la suite : elle en connaît les règles.",
        "Un conflit dans l'équipe : tu ne prends pas parti sans les faits. Tu entends chacun, puis les deux ensemble ; une règle écrite en sort. Un collègue en critique un autre devant toi ? Ses faits d'abord.",
        "Un désaccord franc sur une solution n'est pas un conflit : laisse débattre, sur les faits, et fixe quand trancher.",
        "L'usure a des signaux : mails tard le soir, oublis, irritation, repli. Tu en parles seul à seul, sans diagnostic, puis tu allèges vraiment : ce qui attend est décidé, écrit. La RH ou le médecin du travail peuvent aider.",
        "Le run (le fonctionnement courant) prend environ 60 % du temps de l'équipe (module cp25). S'il en prend plus, des semaines durant : à ton DSI, chiffres en main (un renfort, ou un projet qui glisse). Pas des soirées."
      ],
      retenir: "Performance : un plan écrit, la RH en conseil. Conflit : les faits, les deux ensemble. Usure : les signaux, puis alléger vraiment."
    },
    {
      titre: "Recruter, intégrer, un départ, faire grandir",
      exemple: "Yann, l'administrateur réseau, est le seul à connaître le pare-feu. Il part 3 semaines en août. Tu connais ce risque : référent EDI (échange de données informatisé), tu étais le seul à savoir.\nEn juin, Théo apprend avec lui, sur de vrais changements. En juillet, test : Théo fait seul un changement, avec la doc seule.",
      points: [
        "Recruter : le besoin d'abord (ce que le poste devra faire demain ; quelqu'un de l'équipe le peut-il ?), puis la fiche de poste, avec la RH.",
        "Des entretiens structurés : les mêmes questions et un même cas réel pour tous, notés sur des critères fixés avant. Le « feeling » trompe.",
        "Intégrer : poste et accès prêts le 1er jour, un référent, les 1res semaines planifiées, un point à la fin de chacune.",
        "Un départ se dit vite à l'équipe, le jour choisi avec la personne. Son savoir passe à un binôme, sur les vrais cas, dès l'annonce ; une doc se teste (un autre s'en sert seul). Tu ne le reprends pas toi-même.",
        "Faire grandir : un plan écrit (formation, pratique, date de bilan), pas une promesse. Un projet plus gros, une 1re au comité : un appui, des points serrés au début, et tu ne parles pas à sa place."
      ],
      retenir: "Recruter sur un besoin écrit, intégrer avec un plan, transmettre avant un départ, faire grandir sans promettre."
    }
  ]
};
