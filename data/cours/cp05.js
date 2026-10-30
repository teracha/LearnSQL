// Chef de projet SI — Fiche de cours du module cp05 « Planifier ».
// Fond : PMBOK (organigramme des tâches ou WBS, estimation à trois points, réseau de tâches et chemin critique, marge
// d'une tâche, compression des délais : en parallèle ou avec des ressources en plus), méthode de la chaîne critique
// (Goldratt : la marge regroupée en fin de chaîne), loi de Brooks, pratiques de terrain en PME / ETI (planning commun des
// prestataires, rétroplanning depuis une date légale, personnes rares d'abord). Les pratiques divergent : le PMBOK admet
// une réserve par tâche ou pour tout le projet ; la chaîne critique la regroupe à la fin (choix retenu ici). En agile, pas
// de date par écran : des itérations de durée fixe et un backlog (module cp06, expliqué en une ligne ici).
// - Découper : lots, livrables vérifiables, par livrable plutôt que par phase, tâches de quelques jours à 2 semaines,
//   rien d'oublié, un responsable nommé ; le planning du projet est au chef de projet, chaque prestataire y détaille et
//   estime ses tâches.
// - Estimer : charge (jours de travail) ≠ durée (calendrier) ; durée = charge ÷ disponibilité ; quelqu'un à 200 % =
//   planning faux ; l'estimation vient de celui qui fait ; 3 points, (O + 4 × P + Pe) ÷ 6 ; une estimation baisse avec
//   le contenu, pas sous la pression.
// - Dépendances : fin-début ; chemin critique = le plus long, il fixe la fin ; marge d'une tâche, nulle sur le chemin
//   critique ; le chemin critique peut changer (retard au-delà de la marge, tâche critique raccourcie) ; le Gantt.
// - Rétroplanning : depuis le 1er septembre 2027, dates au plus tard ; au plus tôt ; l'écart = la marge du projet ;
//   contraintes (clôture de janvier, congés d'août, congé de la cheffe comptable, gel dès le pilote) ; personnes rares.
// - Jalons et marges : jalon = date + livrable vérifiable, validé par le DAF, ± 2 semaines (module cp04) ; jalons
//   intermédiaires ; marge visible, en bout de chaîne, à la taille des risques, ni d'avance, ni à un prestataire, ni à
//   un ajout ; marge de recette ≠ marge légale.
// - Réaliste, puis accélérer : un planning réaliste plutôt qu'un planning qui plaît ; raccourcir le chemin critique, et
//   lui seul ; en parallèle (risque de reprise) ; moins de périmètre (triangle, module cp18) ; du monde en plus (Brooks ;
//   utile si le travail se coupe en morceaux indépendants) ; hors tolérance, options chiffrées et le DAF choisit ; dans
//   la tolérance, sans coût, l'organisation est à toi ; mise à jour et suivi : module cp08.
// Fil rouge : DEMAT 2027 (fiche fil rouge de docs/plan-chef-de-projet.md, qui fait foi), ligne « Planning (module cp05) » :
// lots (réception par le portail en novembre 2026 ; paramétrage du connecteur de décembre à février, données de
// paramétrage dues le 15 janvier ; écrans de la compta en itérations et flux EDI, de février à avril ; recette du 16 mars
// au 30 avril, 6 semaines + 1 semaine de marge de recette ; formation et tests d'avril à juin ; pilote sur 1 site en mai ;
// bascule des 3 sites en juin ; marge légale juillet-août) ; chemin critique (données de paramétrage, paramétrage,
// connecteur livré le 1er mars, recette, PV le 30 avril, pilote, bascule) ; contraintes (clôture annuelle en janvier, gel
// dès le pilote, pas de bascule en août) ; jalons validés par le DAF, ± 2 semaines. Promesse du bilan (cp01-q06) : un
// retard sur le chemin critique décale la fin d'autant ; seule une marge protège la fin (sections 3 et 5).
// Faits ajoutés (cohérents avec la fiche et les modules publiés, à valider) : congé de la cheffe comptable du 12 au
// 30 avril (cp06 : 3 semaines en avril ; cp18-q14 : la recette finit pendant son congé) ; cas de test de Julie : 6 jours de
// charge, 2 matinées par semaine, du lundi 18 janvier au vendredi 26 février ; jalons : 15 janvier (données envoyées),
// 1er mars (connecteur livré), 30 avril (PV de recette signé), mai (pilote réussi), juin (bascule). Autres exemples :
// le flux EDI des commandes d'AquaBleu (section 3), la migration Divalto (section 6).
// Frontières : cp04 = jalons macro et tolérances au cadrage ; cp05 = le planning détaillé ; cp06 = la démarche et la
// partie agile ; cp07 = les risques et le plan B ; cp08 = suivre l'avancement réel, mettre à jour, reporter ; cp09 = les
// instances ; cp10 = le circuit d'un changement et le gel ; cp12 = le budget ; cp15 = le planning commun des prestataires ;
// cp16 = le temps d'un autre service ; cp18 = le triangle et ta délégation ; cp02 = ton propre temps.
LEARNSQL.cours.cp05 = {
  intro: "Sur ta migration Divalto ou ton projet Snowflake + Power BI, la date promise a-t-elle tenu ? Qui avait estimé les tâches : ceux qui les faisaient ? Ici : planifier. Découper, estimer, enchaîner les tâches, protéger la fin. Suivre le planning ensuite : module cp08.",
  sections: [
    {
      titre: "Découper : des lots, et des livrables qui se vérifient",
      exemple: "DEMAT 2027, décembre 2026. Tes lots :\n1. Réception par le portail de la PA (plateforme agréée), en novembre.\n2. Paramétrage du connecteur, de décembre à février.\n3. Écrans de la compta, en itérations.\n4. Flux EDI (échange de données informatisé) de la grande distribution.\n5. Recette. 6. Formation et tests. 7. Pilote sur 1 site, puis bascule (la mise en service) des 3 sites.\nLot 2. Livrable flou : « paramétrage bien avancé ». Vérifiable : « 20 factures de test passent de Divalto à la PA ».",
      points: [
        "Découper : le projet en lots, chaque lot en tâches. C'est l'organigramme des tâches (en anglais WBS, Work Breakdown Structure, au PMBOK, le guide américain).",
        "On découpe par livrable, pas par phase : « le tableau des ventes, chargé et publié », plutôt que « les données ». Un livrable se vérifie (module cp04).",
        "On descend jusqu'à des tâches de quelques jours à 2 semaines, que quelqu'un sait estimer. Plus gros, on ne voit rien avancer ; plus fin, on suit des heures.",
        "Rien n'est oublié : formation, données à corriger (le SIREN, numéro d'entreprise, de chaque client), tests, documentation. Une tâche hors du découpage n'a ni date, ni responsable nommé.",
        "Le planning du projet est à toi. Chaque prestataire y détaille et estime ses tâches : un planning commun (module cp15)."
      ],
      retenir: "On découpe par livrable, jusqu'à des tâches estimables. Chaque lot livre une chose qu'on vérifie."
    },
    {
      titre: "Estimer : la charge n'est pas la durée",
      exemple: "Julie prépare ses cas de test : 6 jours de travail, d'après elle. C'est la charge.\nSa cheffe lui donne 2 matinées par semaine pour le projet, soit 1 jour par semaine.\nDurée : 6 semaines au calendrier, du lundi 18 janvier au vendredi 26 février.\nAu planning, on met la durée.",
      points: [
        "Charge : le travail, en jours de travail d'une personne. Durée : le temps au calendrier, du début à la fin.",
        "Durée = charge ÷ disponibilité. Personne n'est à 100 % : congés, clôture, run, autres projets. Quelqu'un à 200 % la même semaine ? Le planning est faux : on décale une tâche.",
        "L'estimation vient de celui qui fait : le consultant pour le paramétrage, Julie pour ses cas. Toi, tu la challenges : sur quoi repose-t-elle ? Déjà fait ailleurs ?",
        "Incertain ? Trois chiffres : optimiste (O), probable (P), pessimiste (Pe). Moyenne pondérée du PMBOK : (O + 4 × P + Pe) ÷ 6. Ex. : 4, 6 et 14 jours donnent 7 jours.",
        "Une estimation baisse quand le contenu baisse, pas sous la pression. Moins de temps ? Moins de contenu (section 6)."
      ],
      retenir: "La charge dit combien de travail ; la durée, combien de temps au calendrier. L'estimation vient de celui qui fait."
    },
    {
      titre: "Dépendances et chemin critique",
      exemple: "Ton nouveau flux EDI des commandes d'AquaBleu :\nA. Mapping du message : 5 jours.\nB. Développement : 10 jours, après A.\nC. Raccordement chez l'opérateur EDI : 3 jours, dès le début.\nD. Tests avec AquaBleu : 5 jours, après B et C.\nChemin A-B-D : 20 jours. Chemin C-D : 8 jours.\nLe chemin critique : A-B-D. C peut glisser de 12 jours sans rien décaler : c'est sa marge.",
      points: [
        "Dépendance fin-début : B commence quand A est fini. La plus courante ; les autres (début-début, fin-fin) sont rares.",
        "Chemin critique : la suite de tâches liées la plus longue. Elle fixe la date de fin. La durée du projet, c'est elle, pas la somme des tâches.",
        "Marge d'une tâche : ce qu'elle peut glisser sans décaler la fin. Sur le chemin critique, elle est nulle : un jour de retard, un jour de plus à la fin.",
        "Le chemin critique peut changer. Une tâche glisse plus que sa marge ? Elle devient critique, et la fin recule de l'écart. Une tâche critique raccourcit ? Un autre chemin peut devenir le plus long.",
        "Le Gantt (du nom d'Henry Gantt) : une barre par tâche sur un calendrier, des flèches pour les liens, un losange par jalon. La partie agile y entre en itérations de durée fixe ; leur contenu vient du backlog, la liste classée des demandes (module cp06)."
      ],
      retenir: "Le chemin critique est le plus long chemin : il fixe la fin, et ses tâches n'ont pas de marge."
    },
    {
      titre: "Le rétroplanning : partir de la date légale",
      exemple: "1er septembre 2027 : émission obligatoire. On remonte.\nJuillet-août : la marge légale. Jamais de bascule en août : la compta est à 2 sur 6.\nJuin : bascule des 3 sites. Mai : pilote sur 1 site ; le gel des changements commence.\n16 mars - 30 avril : recette, 6 semaines + 1 semaine de marge de recette.\n1er mars : connecteur livré.\n15 janvier : données de paramétrage dues à la PA, en pleine clôture annuelle.",
      points: [
        "Rétroplanning : on part de la date imposée et on remonte, tâche par tâche. Chaque tâche reçoit sa date de début au plus tard.",
        "Puis on avance depuis aujourd'hui : la date au plus tôt. L'écart entre les deux, c'est la marge du projet. Négatif ? Le planning ne tient pas (section 6).",
        "Les contraintes d'abord : clôture annuelle de janvier, congés d'août, congé de la cheffe comptable du 12 au 30 avril, gel dès le pilote. Une tâche due dans une période chargée se fait avant.",
        "Une personne rare se planifie en premier : la cheffe comptable, seule sur les avoirs fournisseurs ; Marc, seul sur les rejets EDI ; le seul consultant du paramétrage.",
        "Chemin critique de DEMAT : données de paramétrage, paramétrage, connecteur livré (1er mars), recette, PV (procès-verbal) de recette le 30 avril, pilote, bascule."
      ],
      retenir: "On part de la date légale et on remonte, contraintes posées : chaque tâche a sa date au plus tard."
    },
    {
      titre: "Jalons et marges : protéger la fin",
      exemple: "Tes jalons, validés par le DAF (directeur administratif et financier, ton sponsor) :\n– 15 janvier : données de paramétrage envoyées ;\n– 1er mars : connecteur livré ;\n– 30 avril : PV de recette signé ;\n– mai : pilote réussi ; juin : bascule des 3 sites.\nTes 2 marges : la marge de recette (1 semaine, à la fin de la recette) et la marge légale (juillet-août).",
      points: [
        "Un jalon : une date et un livrable vérifiable. « 30 avril : PV signé », pas « recette bien avancée ». Il dure zéro jour : c'est un point de contrôle.",
        "Le DAF valide les jalons et les marges, pas chaque tâche. Tolérance : ± 2 semaines par jalon (module cp04). Dedans, tu ajustes et tu le dis au COPIL (comité de pilotage) ; au-delà, il décide, prévenu le jour même.",
        "Une date lointaine ? Demande des jalons intermédiaires vérifiables : un retard se voit en février, pas le 1er mars.",
        "Une marge se voit, en bout de chaîne, à la taille des risques (module cp07). Cachée dans chaque tâche, elle se perd : le travail s'étale sur le temps donné. Le PMBOK admet les deux ; la chaîne critique (Goldratt) la met à la fin.",
        "Elle sert aux imprévus : ni d'avance, ni à un prestataire, ni à un ajout. Et la marge de recette n'est pas la marge légale."
      ],
      retenir: "Un jalon se vérifie à une date. Une marge est visible, à la fin, et ne se dépense pas d'avance."
    },
    {
      titre: "Réaliste d'abord, puis accélérer",
      exemple: "Ta migration Divalto : le planning réaliste finit 3 semaines après la date voulue.\nSur le chemin critique, tu cherches :\n– en parallèle : tester les états pendant la reprise des données ;\n– moins de périmètre : les 10 états les moins utilisés, après la bascule ;\n– un 2e consultant ? Il doit d'abord apprendre : 3 semaines, c'est trop court.\nLe sponsor choisit, options chiffrées en main.",
      points: [
        "Un planning réaliste vaut mieux qu'un planning qui plaît. Raboté pour tenir une date, il rassure un mois ; puis chaque jalon glisse, et ta parole avec. Une date « pour motiver » se paie pareil.",
        "Pour finir plus tôt, on raccourcit le chemin critique, et lui seul. En parallèle : des tâches qui se suivaient se chevauchent. On gagne du temps, avec un risque de reprise.",
        "Réduire le périmètre : moins de contenu à la date, le reste après. Le triangle : un côté bouge, un autre paie (module cp18). Pas des tests en moins.",
        "Ajouter des personnes ne raccourcit pas toujours : il faut les former, se coordonner. Loi de Brooks : du monde en plus sur un projet en retard le retarde encore. Ça aide si le travail se coupe en morceaux indépendants, avec des gens vite autonomes.",
        "Hors tolérance : des options chiffrées (délai, coût, risque), et le DAF choisit. Dans ta tolérance, sans coût, l'organisation est à toi. Puis le planning vit avec le réel : module cp08."
      ],
      retenir: "Un planning réaliste se défend avec des options. Pour accélérer : le parallèle ou moins de périmètre, plus souvent que du monde en plus."
    }
  ]
};
