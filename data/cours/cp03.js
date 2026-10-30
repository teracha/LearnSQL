// Chef de projet SI — Fiche de cours du module cp03 « Le rôle attendu par un DSI ».
// Fond : pratiques reconnues, adaptées au terrain PME / ETI. PMBOK (le guide américain) : le chef de projet répond de
// l'atteinte des objectifs du projet, pas de chaque tâche. PRINCE2 : « gérer par exception » (il gère au quotidien dans
// ses marges, et remonte tôt, avec des options, ce qui en sort). Pratique de terrain des DSI de PME / ETI : pas de
// surprise, des décisions préparées, faire faire plutôt que faire, protéger le run, rendre compte court et régulier.
// Les méthodes divergent sur la part de « faire » : Scrum n'a pas de chef de projet (l'équipe s'organise) ; en PME, le
// chef de projet est souvent aussi l'expert. Ici : il fait rarement, en urgence, en le disant.
// - Ce que le DSI attend : le résultat (date, budget, qualité, adoption) ; pas de surprise ; des décisions préparées
//   (options chiffrées, recommandation) ; la relation avec le métier ; protéger le run ; rendre compte.
// - Responsable du résultat, pas des tâches : à toi (cadrer, planifier, piloter, communiquer, risques, décisions) ; tu
//   fais faire (paramétrage, documentation, corrections, tests et travail du métier) ; confier = quoi, pour quand, à
//   quoi on voit que c'est fini, point d'étape ; suivre les résultats, pas chaque ligne ; ni excuse, ni faute endossée.
// - L'expert devenu chef de projet : le prix de faire (personne ne pilote, ni test ni trace, le prestataire n'en répond
//   plus, seul à savoir, pas une économie) ; l'expertise sert à diagnostiquer ; une petite tâche de ton rôle (ta requête
//   de reporting), tu la fais ; mettre les mains : urgence réelle, personne d'autre à temps, ton DSI d'accord, testé,
//   tracé, écrit au prestataire, puis rendre la main ; pas d'habitude ; le DSI qui te demande de faire décide en
//   connaissant le prix.
// - Rendre compte : la fiche du lundi (ce qui avance, ce qui coince, ce dont tu as besoin) ; 2 minutes si tout va bien ;
//   la mauvaise nouvelle le jour même, par toi ; ton erreur aussi ; trier, pas tout en copie ; demander de l'aide tôt
//   (ses leviers) ; ta délégation (cp18).
// - Anticiper : voir venir (risques, charges, décisions), préparer le terrain, proposer plutôt que subir, penser au run
//   avant la bascule (former le N2, une version bientôt plus maintenue).
// - Vers DSI adjoint : une ligne par projet, confier un projet, « que proposes-tu ? », une mauvaise nouvelle facile à
//   apporter, transmettre son expertise ; renvois cp24 à cp27.
// Fil rouge : DEMAT 2027 (fiche fil rouge de docs/plan-chef-de-projet.md, qui fait foi), ligne « Toi et ton DSI
// (modules cp02, cp03) » : environ 70 % de ton temps sur DEMAT, 30 % sur le run (référent des flux EDI, en appui du
// support N2) ; point de 30 minutes avec ton DSI chaque lundi ; il attend : pas de surprise, des décisions préparées,
// faire faire plutôt que faire. Un seul consultant de l'intégrateur connaît le paramétrage ; sa documentation est un
// livrable de la commande. Connecteur de la PA : version 2 au printemps 2027, version 1 maintenue jusqu'en décembre
// 2027 (cp15). COPIL le 2e mardi du mois ; clôture annuelle en janvier ; recette du 16 mars à fin avril.
// Faits ajoutés (cohérents avec la fiche et les modules publiés, à valider) : la fiche du lundi a 3 rubriques ; ton DSI
// dispose du support N1-N2 et d'un administrateur réseau ; exemples : lundi 11 janvier (cas de test de la compta en
// retard d'1 semaine, clôture annuelle ; la PA a raté un petit jalon) ; lundi 8 février (2 petits jalons ratés par la
// PA ; clôture de mars en pleine recette ; décision possible du DAF fin mars : renfort ou report, comme cp18-q22).
// Frontières : cp02 = ton temps et tes priorités (le 70 / 30, le run contre le projet, les interruptions) ; cp03 = le
// rôle et la posture ; cp09 = les instances (le point DSI comme instance, le RACI) ; cp08 = le rapport du COPIL ;
// cp16 = l'échelle d'escalade ; cp17 = les mots ; cp18 = ta délégation, arbitrer ; cp15 = le prestataire (ne pas
// corriger à sa place, binôme, documentation testée) ; cp07 = les risques ; cp22 = le passage en run ; cp23 = l'adoption ;
// cp24 à cp27 = vers DSI adjoint (cité, pas traité).
LEARNSQL.cours.cp03 = {
  intro: "Sur ta migration Divalto ou ta démat fiscale, qu'attendait vraiment ton DSI (directeur des systèmes d'information) ? Te voir corriger un flux EDI (échange de données informatisé) à 22 h, ou ne jamais être surpris ? Ici : le rôle et la posture d'un chef de projet. Ton temps et tes priorités : module cp02.",
  sections: [
    {
      titre: "Ce que ton DSI attend : un résultat, sans surprise",
      exemple: "Octobre 2026. Ton DSI te confie DEMAT 2027 : environ 70 % de ton temps. Le reste va au run, le support au quotidien, où tu es le référent des flux EDI.\nIl te dit : « Comment on paramètre le connecteur, ça ne m'intéresse pas. Je veux la date, le budget, la qualité, et une compta qui s'en sert. Et je ne veux rien apprendre par le DAF (directeur administratif et financier, ton sponsor) avant toi. »",
      points: [
        "Le résultat : la date, le budget, la qualité et l'adoption (le métier s'en sert vraiment, module cp23). Un projet à l'heure que la compta contourne n'est pas fini.",
        "Pas de surprise : une mauvaise nouvelle, il l'apprend par toi, avant les autres, avec ton plan.",
        "Des décisions préparées : 2 ou 3 options, chacune avec son prix (délai, coût, risque), et ta recommandation. Pas « tu ferais quoi ? » tout seul.",
        "La relation avec le métier, c'est toi qui la tiens : le DAF, la compta, l'ADV (administration des ventes). Une plainte arrive chez ton DSI ? Tu la règles, puis tu le lui dis.",
        "Protéger le run : le projet ne casse pas ce qui tourne. Une intervention en production se cale avec le support (N1 et N2 : 1er et 2e niveaux), hors des heures chargées. Un accès à la production se demande à ton DSI, options en main."
      ],
      retenir: "Ton DSI juge un résultat (date, budget, qualité, adoption), sans surprise, avec des décisions préparées."
    },
    {
      titre: "Responsable du résultat, pas des tâches",
      exemple: "Février. Ta liste de la semaine :\n– corriger 2 règles du connecteur ;\n– écrire les cas de test des avoirs ;\n– mettre à jour le registre des risques ;\n– préparer une décision pour le DAF ;\n– écrire le rapport du COPIL (comité de pilotage).\nLes 2 premières, tu les fais faire : le consultant de l'intégrateur corrige, Sophie écrit ses cas. Les 3 autres sont à toi.",
      points: [
        "À toi : cadrer, planifier, piloter, communiquer, suivre les risques, préparer les décisions et les faire prendre. Ça ne se délègue pas. Le consultant t'apporte ses risques au point projet du lundi. Le registre (la liste des risques suivis) et le rapport restent à toi.",
        "Tu fais faire : le paramétrage, sa documentation, les corrections (l'intégrateur, la PA : plateforme agréée). Et les tests et le travail du métier (Julie et Sophie à la compta, Marc à l'ADV). Il manque quelqu'un au métier ? Son manager organise ; toi, tu aides.",
        "Confier, c'est dire quoi, pour quand, et à quoi on voit que c'est fini. Puis un point d'étape avant l'échéance. Confier, puis ne plus regarder, c'est lâcher.",
        "Tu suis les résultats (livrables, tests), pas chaque ligne. Corriger chaque soir le travail du consultant, c'est lui retirer sa responsabilité.",
        "Le résultat reste à toi. « C'est la faute de la PA » ne suffit pas, « c'est ma faute » non plus. On attend la suite : l'impact, le plan, la décision à prendre."
      ],
      retenir: "Tu réponds du résultat. Les tâches, tu les confies clairement, et tu suis."
    },
    {
      titre: "L'expert devenu chef de projet : la tentation de faire",
      exemple: "Recette (les tests du métier). 40 factures fournisseurs rejetées. En 5 minutes, tu trouves la cause : une règle de TVA du connecteur. Tu sais la corriger en 10 minutes.\nLe consultant est là demain matin, et Julie a d'autres cas à tester d'ici là.\nTu lui donnes ton diagnostic. Il corrige, reteste, et met sa documentation à jour.",
      points: [
        "La tentation : paramétrer, corriger un flux, écrire une requête. C'est rapide, rassurant, et tu sais faire. Ce n'est pas une économie : pendant ce temps, personne ne pilote.",
        "Le prix : ta correction n'a ni test, ni trace. Le prestataire n'en répond plus. Et tu deviens le seul à savoir. Ton expertise sert autrement : trouver la cause, poser la bonne question, relire, tester.",
        "Une petite tâche de ton propre rôle (une requête pour ton rapport) ? Tu la fais toi-même : faire faire vaut pour le travail des autres.",
        "Mettre les mains, rarement : une urgence réelle (un blocage, pas un confort), et personne d'autre à temps. Alors ton DSI est d'accord, tu testes, tu traces, tu l'écris au prestataire, et tu rends la main.",
        "Pas d'habitude : si ça revient, c'est un besoin à confier, avec ton DSI (documentation, un 2e qui sait, un prestataire). Il te demande de faire ? Il arbitre ton temps : montre-lui le prix, puis il décide."
      ],
      retenir: "Tu diagnostiques, tu fais faire. Toi-même : rarement, en urgence, quand personne d'autre ne peut, en le disant."
    },
    {
      titre: "Rendre compte à ton DSI : le point du lundi",
      exemple: "Lundi 11 janvier, 30 minutes avec ton DSI. Ta fiche :\n« Avance : paramétrage du connecteur au planning ; budget tenu.\nCoince : les cas de test de la compta, 1 semaine de retard (clôture annuelle). Dans 4 semaines : la PA livre, et elle vient de rater un petit jalon (une date clé).\nBesoin : ton avis sur ma note au DAF (2 options), avant jeudi. »",
      points: [
        "Ta fiche : ce qui avance, ce qui coince (et ce qui va coincer), ce dont tu as besoin de lui. Pas la liste de tes tâches. Tout va bien ? Dis-le en 2 minutes, et rends-lui son temps.",
        "Entre deux lundis, une mauvaise nouvelle : il l'apprend par toi, le jour même, avant les autres. En réunion ? Un message court, sans retarder le DAF. Ton erreur aussi : tu la dis toi-même, vite.",
        "Trier, pas tout envoyer : 40 mails en copie ne l'informent pas, il ne les lit plus. Le courant le lundi, le grave le jour même.",
        "Demander de l'aide tôt n'est pas un aveu de faiblesse : c'est lui laisser le temps d'agir. Ses leviers : arbitrer entre ses projets, prêter ses équipes (le réseau, le support), parler au DAF.",
        "Ce que tu décides seul (ta délégation, module cp18), tu le décides, puis tu l'informes. Le reste, tu viens avec ta recommandation."
      ],
      retenir: "Chaque lundi : ce qui avance, ce qui coince, ce dont tu as besoin. Une mauvaise nouvelle, il l'apprend par toi, le jour même."
    },
    {
      titre: "Anticiper : voir venir, préparer, proposer",
      exemple: "Lundi 8 février. Tu regardes les 6 semaines à venir.\nUn risque : la PA doit livrer le connecteur le 1er mars, et elle a raté 2 petits jalons.\nUne charge : la clôture de mars, début avril, tombera en pleine recette.\nUne décision : si la recette glisse, le DAF devra choisir, fin mars, entre un renfort et un report.\nTu prépares ces options dès maintenant, et tu vois le DAF et ton DSI avant le COPIL.",
      points: [
        "Voir venir, chaque semaine : les risques (module cp07), les charges (qui sera pris, quand, toi compris), les décisions (laquelle, qui décide, pour quand).",
        "Préparer le terrain : personne ne découvre en séance une demande qui le touche. Une demande sur les équipes de la DSI ? Ton DSI la voit avant le COPIL.",
        "Proposer plutôt que subir : un problème arrive avec 2 options chiffrées et ta recommandation. « Débrouille-toi » ne veut pas dire « décide seul » : le budget et le périmètre restent au sponsor.",
        "Penser au run avant la bascule (la mise en service) : qui traitera les incidents, formé quand ? Une version bientôt plus maintenue : quand la remplacer ? Tu le proposes tôt, chiffré, à ton DSI."
      ],
      retenir: "Voir venir les risques, les charges et les décisions ; préparer le terrain ; arriver avec des propositions."
    },
    {
      titre: "Grandir : vers DSI adjoint",
      exemple: "Tu es DSI adjoint : 4 projets, 4 chefs de projet, le support N1 et N2, un budget annuel.\nTu ne lis plus tout. Chaque lundi, une fiche par projet : tu creuses là où ça bouge.\nCe que ton DSI attendait de toi, tu l'attends d'eux.",
      points: [
        "D'un projet à plusieurs : une ligne par projet, toujours la même. Les écarts, les gros risques, les décisions à venir (choisir entre projets : module cp25).",
        "Du technique au budget et aux personnes : la conformité (cp24), manager une équipe (cp26), le budget annuel de la DSI (cp27).",
        "Confier un projet : le résultat attendu, ses marges (délai, budget), ce que le chef de projet décide seul, un point chaque semaine. Puis « que proposes-tu ? » plutôt que ta réponse. Tu ne reprends pas son projet en main.",
        "Une mauvaise nouvelle doit être facile à t'apporter : d'abord merci, puis les faits et le plan. Le reproche d'abord fait cacher la suivante.",
        "Tu ne restes pas le seul expert (l'EDI, par exemple) : tu nommes un référent, tu le formes, puis tu te retires."
      ],
      retenir: "DSI adjoint : plusieurs projets, le budget, les personnes. Tu attends de tes chefs de projet ce que ton DSI attendait de toi."
    }
  ]
};
