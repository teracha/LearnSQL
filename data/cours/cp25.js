// Chef de projet SI — Fiche de cours du module cp25 « Portefeuille et priorisation ».
// Fond : pratiques reconnues de gestion de portefeuille, adaptées au terrain PME / ETI. PMI (The Standard for Portfolio
// Management) : les demandes et les projets forment un portefeuille, classé sur des critères alignés sur la stratégie,
// suivi, revu ; on arrête ce qui ne sert plus. PRINCE2 (et MoP, Management of Portfolios, chez le même éditeur) : un
// comité qui arbitre, des revues régulières, un projet qui ne se justifie plus s'arrête. Kanban : limiter le travail en
// cours, finir avant de commencer. SAFe (WSJF : la valeur et l'urgence rapportées à la taille), donné comme un repère.
// Finance : le coût irrécupérable (« sunk cost ») ne compte pas pour décider de la suite. Les pratiques divergent : notes
// pondérées, comparaison par paires ou simple ordre ; revue au trimestre ou au fil de l'eau. Le cours garde ce que dit
// la fiche : une fiche de demande, des critères écrits, un seul classement, une revue par trimestre.
// - Une seule porte : la fiche de demande d'une page (besoin, sponsor, valeur, obligation, urgence, charge estimée par
//   ceux qui feront) ; moins de 5 jours = petite demande, classée chaque lundi par le DSI, prise sur le run ; 5 jours et
//   plus = un projet, classé au trimestre au comité de direction ; un besoin découpé reste un besoin ; quelques heures
//   dans un créneau run se font sans fiche (cp02-q08) ; une panne = un ticket ; un besoin nouveau ≠ un changement (cp10).
// - Des critères écrits avant, connus de tous, changés seulement pour le classement suivant ; l'obligation légale est un
//   filtre, vérifiée (cp24), seule la partie obligatoire passe d'office ; la valeur vient du business case (cp11) ; le
//   risque de ne pas faire ; le coût (jours de la DSI et des métiers, euros) ; un seul classement ; ni le rang ni le bruit.
// - La capacité d'abord : le run (environ 60 %), puis les projets, dans l'ordre, sans dépasser ; les personnes rares, le
//   temps des métiers, les dépendances ; limiter les projets en cours.
// - Qui décide : le DSI propose (le DSI adjoint prépare), le DG arbitre au comité de direction ; le DG peut choisir
//   autrement en voyant ce que ça décale, c'est écrit ; pas de file cachée ; « pas maintenant » vite, avec la raison et la
//   date de revue ; la petite demande se classe le lundi ; quand tout tient, oui ; le calendrier se règle à la DSI.
// - Reporter, arrêter, revoir : ce qui est dépensé ne compte pas (dans les deux sens) ; un projet commencé n'est pas
//   sacré ; un report se dit au sponsor, tôt ; les projets qui dépendent glissent aussi ; revue chaque trimestre ; la
//   valeur se mesure après, par le métier (cp22).
// - Toi, chef de projet : tu ne choisis pas entre les projets ; tu donnes les faits (charge, dates, conflits de
//   ressources) à ton DSI, qui arbitre ou fait arbitrer (le DAF si un jalon sort de la tolérance, le DG si deux sponsors
//   s'opposent) ; dans ta tolérance, tu replanifies et tu informes ; le temps d'une personne d'un autre service est à son
//   manager (cp16) ; ta ressource prêtée = une commande à part ; des faits, pas un plaidoyer.
// Fil rouge : DEMAT 2027 et le cadre « Tu es DSI adjoint » (fiche fil rouge de docs/plan-chef-de-projet.md, qui fait
// foi), ligne « Portefeuille (module cp25) » : la fiche d'une page, le seuil de 5 jours, le lundi, le trimestre, les
// critères, le DSI propose, le DG arbitre, 60 % de run, le report dit au sponsor avec la raison, le chef de projet donne
// les faits. Lignes « La réglementation » (réception obligatoire depuis le 1er septembre 2026, émission au 1er septembre
// 2027, tout passe par une PA ; NIS2 : concerné ou pas, on le vérifie), « Toi et ton DSI » (tolérance de ± 2 semaines,
// un jalon hors tolérance : le DAF le jour même), « Les personnages » (l'équipe de 8, le comité de direction).
// Faits ajoutés (cohérents avec la fiche et les modules publiés, à valider ; les mêmes en tête de cp25-portefeuille.js) :
// capacité de la DSI en 2028 : 8 personnes, environ 200 jours de travail chacune, 1 600 jours ; run (support,
// exploitation, petites demandes) environ 60 %, 960 jours ; projets 640 jours. Demandes 2028 (jours internes de la DSI ;
// dépenses externes ; gain ; sponsor) : sécurité 60 j, 20 k€, un risque fort évité, le DSI ; migration de Divalto 200 j,
// 75 k€ (environ 86 k€ avec les spécifiques, cp11), gain direct faible, version qui vieillit, le DAF ; WMS 300 j, 150 k€,
// 100 k€ par an, après la migration, le directeur logistique ; tableaux Power BI des ventes 40 j, 0 €, 15 k€ par an, le
// directeur commercial ; CRM 100 j, 40 k€, gain non chiffré, le directeur commercial ; prise de commande 80 j, 60 k€,
// 40 k€ par an, après le CRM, le directeur commercial ; portail fournisseurs 60 j, 30 k€, 10 k€ par an, le DAF ; refonte
// de l'intranet 50 j, 15 k€, gain faible, le DG ; total 890 jours. Comité de direction de janvier 2028 : retenus la
// sécurité, la migration, le WMS, les tableaux Power BI des ventes (600 jours, 40 de marge) ; pas maintenant, revus en
// avril : CRM (business case à faire), prise de commande (après le CRM), portail fournisseurs, intranet. Les critères sont validés
// par le DG et envoyés aux directeurs avant les fiches. Une demande de quelques heures, dans un créneau run, se fait
// sans fiche (comme cp02-q08). Exemple de la section 5 : une application maison de notes de frais (2029).
// Affirmations juridiques hors fiche : aucune. Les « obligations » citées hors de la fiche (portail fournisseurs, BL,
// NIS2) restent « annoncées, à vérifier » (module cp24) ; le portail n'est pas exigé : la loi passe par la PA (fiche).
// Frontières : le business case d'UN projet = cp11 ; prioriser DANS un projet (MoSCoW) et ta délégation = cp18 ; la
// charge d'une personne sur tous les projets = cp05 ; le reporting de plusieurs projets = cp08 ; la gouvernance d'un
// projet = cp09 ; le changement dans un projet = cp10 ; la saturation d'une population = cp23 ; les règles qui
// s'appliquent et leur vérification = cp24 ; monter d'un niveau = cp16 ; ton temps = cp02 ; manager l'équipe = cp26 ; le
// budget SI annuel = cp27. Cités en une ligne, pas refaits.
LEARNSQL.cours.cp25 = {
  intro: "Référent EDI (échange de données informatisé), tu reçois des demandes de partout : un partenaire, un état, un flux. Qui choisit l'ordre ? Celui qui crie le plus fort ? Ici : le portefeuille, classer les demandes de la DSI (direction des systèmes d'information) selon la place réelle de l'équipe. Le business case d'un projet : module cp11 ; prioriser dans un projet : module cp18.",
  sections: [
    {
      titre: "Une seule porte d'entrée : la fiche de demande",
      exemple: "Lundi, 4 demandes arrivent par 4 chemins : un mail du directeur commercial, un appel à ton analyste, un mot du DAF (directeur administratif et financier) en couloir, un ticket.\nUne seule porte, désormais : la fiche de demande, une page.\nUn état de stock, 3 jours : une petite demande, classée lundi.\nLe portail fournisseurs, 60 jours : un projet, classé au trimestre.",
      points: [
        "Toute demande passe par la fiche, dans une seule liste. Un mail, un couloir ? « Fais une fiche », et on aide à l'écrire. Une panne va au support, en ticket.",
        "La fiche : le besoin, le sponsor (le directeur qui la porte), la valeur, l'obligation avec sa source, l'urgence (une date et pourquoi), la charge estimée par ceux qui feront.",
        "Moins de 5 jours de travail : une petite demande, classée chaque lundi par le DSI, prise sur le run (le fonctionnement courant). 5 jours et plus : un projet, classé une fois par trimestre au comité de direction.",
        "Un besoin découpé en 3 demandes de 4 jours reste un besoin de 12 jours : un projet. Quelques heures dans un créneau run, elles, se font sans fiche (module cp02).",
        "Pendant un projet, ajuster ce qu'il livre (un état de plus), c'est un changement (module cp10). Un besoin nouveau, avec sa propre valeur (un portail), c'est une fiche, même s'il vient du sponsor du projet."
      ],
      retenir: "Une seule porte : la fiche de demande. Petite demande (moins de 5 jours) le lundi ; projet au trimestre."
    },
    {
      titre: "Des critères écrits avant, un seul classement",
      exemple: "Décembre 2027. Les critères, validés par le DG (directeur général), envoyés aux directeurs avant leurs fiches :\n1. Obligation légale : vérifiée, avec sa source et sa date.\n2. Valeur : le gain chiffré du business case.\n3. Risque de ne pas faire.\n4. Coût : jours de la DSI et des métiers, euros.\n5. Capacité.\nLa fiche du portail fournisseurs dit « obligatoire ». Vérifié : la loi passe par une PA (plateforme agréée), et DEMAT le fait depuis 2027. Le portail se classe sur sa valeur.",
      points: [
        "Les critères s'écrivent avant de voir les demandes, et tous les sponsors les connaissent. Les changer ? Pour le classement suivant, annoncés à tous.",
        "L'obligation légale est un filtre : vérifiée, elle passe, à sa date. Annoncée, elle se vérifie : sa source, et si elle nous concerne (module cp24). Seule la partie obligatoire passe d'office.",
        "La valeur vient du business case (module cp11) : un gain chiffré, avec ses hypothèses. « Tout le monde en a un » n'est pas une valeur : sans chiffre, la demande attend.",
        "Le risque de ne pas faire compte autant qu'un gain : la sécurité ne rapporte rien, jusqu'au jour où un compte est piraté.",
        "Un seul classement pour toute l'entreprise, pas une liste par direction. Le rang du demandeur et le bruit ne sont pas des critères."
      ],
      retenir: "Des critères écrits et connus d'avance ; une obligation vérifiée ; la valeur, le risque, le coût ; un seul classement."
    },
    {
      titre: "La capacité d'abord : le run, puis les projets",
      exemple: "La DSI en 2028 : 8 personnes, environ 200 jours de travail chacune : 1 600 jours par an.\nLe run (support, exploitation, petites demandes) en prend environ 60 % : 960 jours.\nReste pour les projets : 640 jours.\nDemandes pour 2028 : 890 jours. Il faut en laisser 250.",
      points: [
        "Le run passe d'abord : sinon, il revient en urgences. La capacité des projets, c'est ce qui reste. Le budget de l'année : module cp27.",
        "On remplit dans l'ordre du classement, sans dépasser. Ce qui ne tient pas : « pas maintenant ». On ne démarre pas un projet qu'on ne pourra pas finir.",
        "Compter aussi les personnes rares (un développeur, un analyste : module cp05) et le temps des métiers (module cp23) : la compta à la clôture de janvier, les dépôts pendant la saison, au printemps.",
        "Les dépendances : le WMS (logiciel d'entrepôt) se branche sur Divalto. Construit avant la migration, son interface serait à refaire. Ce qui ne dépend de rien peut commencer avant.",
        "Limiter les projets en cours : finir avant de commencer (méthode Kanban). 4 projets bien servis livrent plus tôt que 8 à moitié."
      ],
      retenir: "La capacité d'abord : le run, puis les projets, dans l'ordre, sans dépasser. Personnes rares, métiers et dépendances comptent."
    },
    {
      titre: "Qui décide, et comment dire « pas maintenant »",
      exemple: "Comité de direction de janvier 2028.\nRetenus : la sécurité, la migration de Divalto, le WMS, les tableaux Power BI des ventes. 600 jours sur 640 : 40 de marge.\nPas maintenant : le CRM (gestion des clients), faute de business case, et la prise de commande, qui en dépend ; le portail fournisseurs ; l'intranet. Revus en avril.\nLe soir même, chaque sponsor a la raison et la date de revue.",
      points: [
        "Le DSI propose (toi, DSI adjoint, tu prépares) ; le DG arbitre, au comité de direction. Les directeurs entendent les mêmes faits, en même temps.",
        "Le sponsor le plus haut placé, ou celui qui crie le plus fort, ne passe pas devant. Ce qui fait monter une demande : un meilleur dossier, à la revue suivante.",
        "Le DG peut choisir autrement : il voit ce que son choix décale, c'est écrit, on applique. Pas de file cachée : un projet glissé « en douce » prend des jours à un autre.",
        "« Pas maintenant » se dit à chaque sponsor, vite : la raison, ce qui lui manque, la date de revue. Ni silence, ni promesse.",
        "Une petite demande ne monte pas au comité : le DSI la classe le lundi. Quand tout tient dans la place, on dit oui. Le calendrier, dans le classement, se règle à la DSI avec le sponsor."
      ],
      retenir: "Le DSI propose un seul classement, le DG arbitre. « Pas maintenant » se dit vite, avec la raison et une date de revue."
    },
    {
      titre: "Reporter, arrêter, revoir chaque trimestre",
      exemple: "2029. L'application maison de notes de frais a coûté 30 k€. Il reste 20 k€ à payer. Depuis, la DSI a validé un service du marché, à 3 k€ par an.\nLe DAF : « On ne va pas jeter 30 k€. »\nLes 30 k€ sont partis, quoi qu'on décide. La question : 20 k€ de plus, pour quoi ? Le service fait déjà le travail. On arrête, raison à l'appui.",
      points: [
        "Ce qui est déjà dépensé ne compte pas pour décider de la suite : on compare ce qui reste à payer avec ce qui reste à gagner. Dans les deux sens : un projet qui a dérapé, mais presque fini, se finit souvent.",
        "Un projet commencé n'est pas sacré. Le reporter ou l'arrêter se dit au sponsor, tôt, avec la raison.",
        "Un projet glisse ? Ceux qui en dépendent glissent aussi : leurs sponsors l'apprennent tout de suite, pas à la revue.",
        "Le classement se revoit chaque trimestre : nouvelles demandes, gains revus, retards. Entre deux revues, il tient : rouvert chaque semaine, il ne protège plus rien.",
        "Après la livraison, la valeur se mesure, par le métier, à une date fixée (comme DEMAT au 3e mois : module cp22). Un gain jamais mesuré n'apprend rien au classement suivant."
      ],
      retenir: "Ce qui est dépensé ne compte pas : seul ce qui reste à payer et à gagner. Le classement se revoit chaque trimestre ; la valeur se mesure après."
    },
    {
      titre: "Toi, chef de projet, dans le portefeuille",
      exemple: "Janvier 2027. L'administrateur réseau doit ouvrir l'accès vers la PA avant fin janvier. Un autre chef de projet le veut la même semaine.\nÀ ton DSI, au point du lundi : « Il me faut 2 jours avant fin janvier. Sinon, une semaine de retard, dans la tolérance. »\nIl arbitre, ou fait arbitrer.",
      points: [
        "Tu ne choisis pas entre les projets : tu es juge et partie. Tu donnes les faits : la charge, les dates, les conflits de ressources, ce que chaque choix décale.",
        "Ton DSI arbitre, ou fait arbitrer : le DAF (ton sponsor) si un jalon sort de la tolérance, le DG si deux sponsors s'opposent. Dans ta tolérance, tu replanifies et tu informes.",
        "Le temps d'une personne d'un autre service (Marc, à l'ADV : l'administration des ventes) est à son manager (module cp16) ; le choix entre deux projets, à ton DSI.",
        "Un autre sponsor veut ton consultant ? Pas d'accord en couloir : l'impact à ton DSI. S'il est prêté, c'est une commande à part, signée.",
        "Pour le classement, tu apportes les faits de ton projet, pas un plaidoyer. Une demande nouvelle arrive chez toi ? Tu aides à écrire la fiche ; tu ne promets ni date, ni jours."
      ],
      retenir: "Chef de projet, tu ne choisis pas entre les projets : tu donnes les faits à ton DSI, qui arbitre ou fait arbitrer."
    }
  ]
};
