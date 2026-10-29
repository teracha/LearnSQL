// Chef de projet SI — Fiche de cours du module cp06 « Choisir sa démarche ».
// Fond : pratiques reconnues, adaptées au terrain PME / ETI.
// - Prédictif : le cycle en V. Chaque niveau de conception a son niveau de test en miroir ; la recette (métier) à la fin.
//   Les écoles comptent 3 à 5 niveaux ; ici 3 : besoin ↔ recette, conception ↔ tests d'intégration, détail ↔ tests unitaires.
// - Agile : Scrum (sprints d'un mois au plus selon le Scrum Guide 2020, PO, backlog, revue appelée ici « démo »,
//   rétrospective) et Kanban (un flux, peu de travail en cours). Le temps et le budget sont fixes, le contenu varie ;
//   la qualité ne bouge pas (« fini » = testé) : déjà dit en cp18. Manifeste agile : « plus que », pas « à la place de ».
// - Hybride : un cœur cadré + des parties en itérations. Les écoles divergent : le PMBOK (7e édition) présente prédictif,
//   adaptatif et hybride comme des choix selon le contexte ; des puristes de l'agile y voient un « faux agile ».
//   Ici : un découpage clair, une démarche par partie. PRINCE2 : gestion par étapes (une décision à la fin de chaque étape).
// - Contrats : des forfaits agiles existent (budget fixe, contenu qui varie). Le piège : le forfait sur un cahier des
//   charges figé, découpé en sprints (un cycle en V déguisé). Le détail des contrats : cp14.
// Fil rouge : DEMAT 2027 (fiche fil rouge de docs/plan-chef-de-projet.md, qui fait foi), ligne « Démarche (module cp06) » :
// hybride ; cœur cadré au départ (flux légaux, connecteur standard de la PA, bascule) ; écrans et états de suivi Divalto de
// la compta en itérations de 2 semaines, dans une enveloppe de 10 jours d'intégrateur fixée par le DAF ; PO = la cheffe
// comptable (prise par la clôture annuelle de janvier, en congé 3 semaines pendant la recette).
// Fait ajouté (hors fiche) : les itérations ont lieu de février à avril (après la clôture annuelle, avant le pilote de mai).
// Frontières :
// - cp06 = CHOISIR la démarche et la TENIR. Comment le changement est reçu selon la démarche : une phrase, puis cp10.
// - cp10 = le circuit d'une demande de changement (registre, gel, backlog de la partie agile). cp14 = contracter.
// - cp04 = cadrer (agile ou pas, on cadre : cp04-q30). cp18 = l'agile fait varier le contenu, pas la qualité.
// Point faible de l'élève (bilan, cp01-q07) : il a raté la démarche hybride. Mais « hybride » n'est pas toujours la réponse :
// le cours montre aussi quand le prédictif pur ou l'agile pur gagnent.
LEARNSQL.cours.cp06 = {
  intro: "Ta migration Divalto : tout était-il écrit avant de commencer ? Et ton projet Snowflake + Power BI : les tableaux ont-ils changé en route ? Deux projets, deux façons de travailler. Ce module t'aide à choisir la démarche (prédictive, agile ou hybride), puis à la tenir.",
  sections: [
    {
      titre: "Le prédictif : le cycle en V",
      exemple: "Ta migration Divalto à l'identique : même périmètre, date fixée, prix fixé. Tout est connu au départ.\nDEMAT 2027 : le cœur aussi. Les flux légaux, le connecteur standard de la plateforme agréée (PA), la bascule (mise en service).\nOn avance par phases. Chaque niveau de conception a son test, en miroir :\n– le besoin de la compta ↔ la recette (tests de validation par le métier) ;\n– la conception des échanges Divalto-PA ↔ les tests d'intégration ;\n– le paramétrage de l'intégrateur ↔ ses tests unitaires.\nLa compta écrit ses cas de recette en janvier-février. Elle les joue à partir du 16 mars.",
      points: [
        "Prédictif = on fixe le contenu au départ, puis on suit un plan, phase par phase. Le cycle en V en est la forme la plus connue.",
        "Le miroir : chaque test vérifie le niveau d'en face. La recette vérifie le besoin écrit, pas ce qu'on découvre en testant.",
        "Les tests se préparent tôt, à gauche du V, dès que le niveau d'en face est écrit. Ils se jouent à droite, à la fin.",
        "Bon quand le besoin est stable, qu'une règle ou une date est fixée (la loi, un guide EDI, échange de données informatisé, imposé par un client), ou que le contrat est au forfait (prix fixe).",
        "Sa faiblesse : le métier voit le résultat tard, à la recette. Sur un besoin flou, c'est le mauvais choix."
      ],
      retenir: "Le cycle en V fixe le contenu au départ ; chaque niveau de conception a son test en miroir, et le métier valide à la fin."
    },
    {
      titre: "L'agile : Scrum et Kanban",
      exemple: "Ton projet Snowflake + Power BI : le directeur commercial savait-il, au départ, quels tableaux il voulait ?\nAvec Scrum, on avance par sprints de 2 semaines :\n– le PO (product owner, une personne du métier) classe le backlog : la liste des besoins, du plus utile au moins utile ;\n– l'équipe prend le haut de la liste, et le finit : « fini » = testé ;\n– à la fin, une démo : un tableau qui marche ; le PO réagit, puis reclasse ;\n– puis une rétrospective : comment mieux travailler au prochain sprint ?",
      points: [
        "Agile = livrer par petits morceaux utiles, et ajuster après chaque morceau. On peut aussi s'arrêter tôt, si l'idée ne marche pas.",
        "Scrum : des sprints (itérations de durée fixe, 1 à 4 semaines), un backlog, un PO qui le classe et accepte ce qui est livré, une démo, une rétrospective.",
        "Kanban : pas de sprint, un flux. Un tableau « à faire, en cours, fait », avec peu de sujets en cours. Bon pour le run (le support au quotidien) et les demandes qui arrivent sans cesse.",
        "Bon quand le besoin est flou, que le métier est disponible, et que la valeur se livre par morceaux. Sans PO disponible, pas d'agile.",
        "Le temps et le budget sont fixes ; le contenu varie. La qualité, elle, ne bouge pas (module cp18)."
      ],
      retenir: "L'agile fixe le temps et le budget, et fait varier le contenu ; il lui faut un PO du métier, disponible."
    },
    {
      titre: "Choisir : les bonnes questions",
      exemple: "Tu es DSI adjoint (DSI : directeur des systèmes d'information). Trois projets arrivent.\nMigration Divalto à l'identique, date fixe, au forfait : prédictif.\nTableaux Power BI des ventes, besoin flou, deux commerciaux disponibles : agile.\nDEMAT 2027 : un cœur légal fixe, des écrans compta flous : hybride (section suivante).\nUn cadre commun pour tous (étapes de décision, reporting), mais une démarche par projet, et parfois par partie.",
      points: [
        "Le besoin est-il stable ? Stable : on le cadre. Flou : on le construit par itérations.",
        "Une date ou une règle fixe ? L'agile tient une date en coupant du contenu. Un flux légal ne se coupe pas : il se cadre.",
        "Le contrat ? Un forfait suppose un besoin défini avant. La régie (payée au temps passé) accepte les itérations, avec une enveloppe : un plafond de jours.",
        "Le métier et les fournisseurs ? Sans PO disponible, pas d'agile. Un produit standard se paramètre à la date du fournisseur : il ne se construit pas en sprints.",
        "La taille : un petit besoin clair se traite simplement, sans Scrum. Un gros projet incertain se découpe en étapes, avec une décision à la fin de chacune (PRINCE2, la méthode britannique)."
      ],
      retenir: "On choisit selon le besoin, la date, le contrat, le métier et les fournisseurs : par projet, et parfois par partie."
    },
    {
      titre: "L'hybride : un cœur cadré, des parties en itérations",
      exemple: "DEMAT 2027. Le DAF (directeur administratif et financier, ton sponsor) a validé :\n– le cœur, cadré au départ : flux légaux, connecteur standard de la PA, bascule. Dates du contrat, tests en miroir, recette ;\n– les écrans et états de suivi Divalto de la compta : par itérations de 2 semaines, de février à avril ;\n– une enveloppe fixée par le DAF : 10 jours d'intégrateur ;\n– un PO pour cette partie : la cheffe comptable. Elle classe le backlog.",
      points: [
        "Hybride = un cœur cadré, plus des parties en itérations. C'est le cas le plus fréquent dans un projet d'ERP (progiciel de gestion) en PME.",
        "D'abord découper : ce qui est fixe (la loi, le contrat, un produit standard, la bascule) se cadre ; ce qui est flou s'itère. Pas l'inverse.",
        "Chaque partie a sa règle, et la partie agile ne touche pas au cœur. À la fin, la recette teste l'ensemble, de bout en bout.",
        "Le changement : dans le cœur, une demande de changement, écrite et chiffrée ; dans la partie agile, une idée nouvelle va au backlog, dans l'enveloppe. Le circuit : module cp10.",
        "Les écoles divergent : le PMBOK (le guide américain) en fait un choix normal, selon le contexte ; des puristes de l'agile y voient un « faux agile ». Ici : un découpage clair, pas un mélange."
      ],
      retenir: "L'hybride cadre ce qui est fixe et itère ce qui est flou ; chaque partie a sa règle, et la recette teste l'ensemble."
    },
    {
      titre: "Faire vivre l'agile : PO, démo, enveloppe",
      exemple: "Janvier : clôture annuelle. La cheffe comptable, PO, n'a pas une heure. Les itérations commencent donc en février.\nPendant la recette, elle part 3 semaines. Avant, elle classe le backlog de ces semaines, et désigne Julie pour la démo.\nFin avril, les 10 jours sont consommés. Deux idées restent en bas du backlog : elles attendent.\nToi, tu n'es pas le PO : tu protèges son créneau et l'enveloppe.",
      points: [
        "Un PO disponible : un créneau fixe, par exemple 1 h pour classer, plus la démo. Pas d'itération sans lui : sinon, l'intégrateur choisit à la place du métier.",
        "PO absent ? Il classe avant de partir et désigne un suppléant par écrit. Ni toi, ni l'intégrateur : l'intégrateur conseille sur le faisable, le PO classe.",
        "« Fini » = testé, accepté par le PO, documenté pour le run. Pas fini à la date ? Il retourne au backlog : l'itération ne s'allonge pas.",
        "La démo montre un écran qui marche, dans l'outil, sur des données de test : pas des diapositives. La rétrospective change 1 ou 2 choses dans la façon de travailler.",
        "Enveloppe consommée : le bas du backlog attend. On ne raccourcit pas les tests. Plus de jours ? Le DAF décide (module cp10)."
      ],
      retenir: "Pas d'agile sans PO disponible ; « fini » veut dire testé ; quand l'enveloppe est vide, c'est le contenu qui attend."
    },
    {
      titre: "Les pièges, et tenir sa démarche",
      exemple: "Un intégrateur propose : « Forfait de 40 k€ sur votre cahier des charges complet, livré en sprints de 2 semaines. »\nPrix fixé, contenu figé : c'est un cycle en V déguisé. Chaque idée née en démo deviendra un avenant (module cp14).\nSur DEMAT, en mars, la partie agile patine. Tu veux passer les derniers écrans en spécifications écrites.\nTu le proposes d'abord au DAF : ce qui change pour lui, pour la compta, et pour les dates. Il valide, puis tu changes.",
      points: [
        "Agile sans PO disponible : l'intégrateur devine, et la compta refuse plus tard. Cycle en V sur un besoin flou : des écrans refusés à la recette.",
        "« Agile = pas de doc ni de planning » : faux. Le manifeste agile préfère le logiciel qui marche « plus qu'une » documentation, pas « à la place de ». Et l'agile a des dates, une enveloppe, un backlog classé.",
        "Faux agile au forfait : un cahier des charges figé, découpé en sprints. Les écoles divergent : des forfaits agiles existent, avec un budget fixe et un contenu qui varie.",
        "Le plan type de l'intégrateur sert son organisation. Pars de son plan, et adapte-le à ton projet : ne le prends pas tel quel.",
        "Tu proposes la démarche ; le sponsor la valide, car elle change ce qu'il reçoit, quand, et le temps de ses équipes. En changer en cours : tu le lui proposes, avant."
      ],
      retenir: "Une démarche se choisit, s'adapte et se tient ; en changer en cours se propose au sponsor, avant."
    }
  ]
};
