// Chef de projet SI — Fiche de cours du module cp23 « Conduite du changement ».
// Fond : pratiques reconnues de conduite du changement, adaptées au terrain PME / ETI. PMBOK : parties prenantes et
// communication (le bon message, au bon public, par le bon canal). Prosci : le modèle ADKAR (5 marches : comprendre
// pourquoi, le vouloir, savoir faire, pouvoir le faire, que ça tienne) et le constat que le « pourquoi » s'entend de la
// direction, le « ce qui change pour moi », du manager direct. Kotter : 8 étapes (urgence, coalition, vision, la dire,
// lever les obstacles, victoires rapides, consolider, ancrer). La courbe du changement (refus, résistance, essai,
// adhésion). Tous donnés comme des repères, pas des lois : les cabinets et les écoles divergent sur les étapes et les
// noms ; sur le terrain, on prend ce qui sert. Pratiques de terrain : la carte des impacts par population, l'effort à la
// taille de l'impact, les utilisateurs clés relais et formateurs, former juste avant sur les vrais cas, mesurer
// l'adoption par des faits (ressaisie, fichiers à côté, tickets).
// - Populations et impacts : la carte (ce qui change, quand, à quel point), faite au cadrage, mise à jour après la
//   recette ; ceux qu'on oublie (les commerciaux, le site pilote, le dehors) ; plusieurs projets sur la même équipe
//   (la saturation, module cp25).
// - Le sponsor et les managers portent : le DAF dit pourquoi, les managers le « ce qui change pour vous » ; toi, tu
//   prépares et tu outilles, tu ne portes pas seul ; le manager qui doute, vu seul à seul ; une 1re réussite citée.
// - Les utilisateurs clés : relais dans les deux sens, formateurs avec le consultant, un par équipe, un sceptique
//   respecté peut convenir ; leur temps vient de leur manager (cp16) ; pas le support après la bascule.
// - Communiquer : ce qui change pour moi, quand, qui m'aide, et ce qui ne change pas ; le bon canal ; le pourquoi tôt,
//   le détail juste avant ; répéter ; à double sens ; les mots : cp17.
// - Former : les vrais cas, juste avant, court ; un support de 2 pages ; selon l'impact ; mesurer par nom ; les
//   nouveaux arrivants après ; former ne suffit pas (ADKAR).
// - Les résistances : une cause précise (peur, charge, savoir-faire perdu, mauvaise expérience) ; écouter, répondre
//   avec du concret, sans promesse ; pas d'étiquette ; la résistance montre souvent un vrai problème ; la courbe.
// - L'adoption : des faits ; saisir un papier n'est pas ressaisir ; le contournement se comprend ; accompagner après
//   l'hypercare jusqu'à la mesure du 3e mois.
// Fil rouge : DEMAT 2027 (fiche fil rouge de docs/plan-chef-de-projet.md, qui fait foi), ligne « Conduite du changement
// (module cp23) » : populations (la compta, 6 personnes et la stagiaire ; l'ADV, le responsable, Marc et ses collègues ;
// les 3 responsables de site ; les commerciaux ; le DAF et la direction ; dehors, les clients EDI par le commercial et
// les fournisseurs par la compta) ; utilisateurs clés Julie, Sophie, Marc ; formation de la compta du 3 au 28 mai,
// sessions de 2 h sur les vrais cas, animées par Julie et Sophie avec le consultant, une 3e session en juin ; l'ADV, 2
// ateliers ; fin mai, 90 % de la compta formée ; la cheffe comptable inquiète (la charge pendant la clôture, la peur
// des rejets) ; adoption au 3e mois (septembre 2027) : plus aucune facture reçue par la PA ressaisie à la main, mesurée par
// la cheffe comptable ; gain plein quand les fournisseurs PME émettent (1er septembre 2027). Lignes « Bascule » (hypercare
// du 14 au 25 juin, cp21) et « Passage en run » (cp22).
// Faits ajoutés (cohérents avec la fiche et les modules publiés, à valider) : les 90 % de fin mai se lisent sur les
// feuilles signées, 9 présences sur 10 prévues (Julie et Sophie forment ; 5 personnes à former : la cheffe comptable,
// les 3 comptables, la stagiaire ; 2 sessions chacune, « recevoir » et « émettre ») ; la 3e session de juin sert à qui a
// manqué et aux nouveaux ; sessions placées hors des jours de clôture ; les commerciaux : une page et 10 minutes en
// réunion d'équipe, début juin ; ils ne saisissent rien, mais transmettent le SIREN de leurs nouveaux clients ; les
// fournisseurs reçoivent une lettre de la compta (« vos délais de paiement ne changent pas ») ; Marc montre à l'ADV
// comment reprendre un rejet EDI ; juillet : 1 200 factures fournisseurs reçues par la PA, 0 ressaisie, 800 saisies
// à la main (papier ou PDF : PME, pas tenues d'émettre avant le 1er septembre 2027, et étranger, hors PA) ; Sophie
// garde un Excel des factures émises ; une page de questions-réponses.
// Frontières : le temps des utilisateurs clés et l'escalade = cp16 ; les mots (annonce, mauvaise nouvelle) = cp17 ; le
// go / no-go, son critère « formation faite » et l'hypercare = cp21 ; la sortie d'hypercare, le transfert au support,
// le run, la clôture et la mesure des gains = cp22 ; le gel des changements = cp10 ; les gains du business case = cp11 ;
// le portefeuille (plusieurs projets) = cp25 ; manager son équipe = cp26. Cités en une ligne, pas refaits.
LEARNSQL.cours.cp23 = {
  intro: "Ton projet Snowflake + Power BI : qui a gardé son Excel à côté, et pourquoi ? Ta démat fiscale : sur 15 personnes, combien s'en servaient vraiment 3 mois après ? Ici : l'adoption, une part du résultat (module cp03).",
  sections: [
    {
      titre: "Qui est touché, et à quel point",
      exemple: "Carte des impacts de DEMAT (extrait) :\n– Compta (6 personnes et la stagiaire) : fort. Plus de ressaisie ; rejets et avoirs par la PA (plateforme agréée).\n– ADV (administration des ventes) : moyen. Le SIREN (numéro d'entreprise) de chaque client ; Marc reprend les rejets EDI (échange de données informatisé).\n– Les 3 responsables de site : faible. Mais le site pilote passe en mai.\n– Les commerciaux : rien à saisir ; leurs clients les appelleront.\n– Dehors : les fournisseurs (par la compta), les clients EDI (par le commercial).",
      points: [
        "Population = un groupe touché de la même façon. Pour chacune : ce qui change, quand, à quel point.",
        "L'effort suit l'impact : fort, on forme et on accompagne ; faible, on informe. Le message passe par le manager.",
        "La carte : faite au cadrage, mise à jour après la recette.",
        "Ceux qu'on oublie : qui répond aux questions sans toucher l'outil (les commerciaux), le site pilote, et le dehors, par qui tient la relation.",
        "Plusieurs projets sur la même équipe ? On additionne les impacts : trop, c'est la saturation (module cp25)."
      ],
      retenir: "Une carte des impacts : chaque population, ce qui change, quand, à quel point. Sans oublier ceux qui répondent aux questions."
    },
    {
      titre: "Le sponsor et les managers portent le changement",
      exemple: "Mai, 1re session de formation de la compta.\nLe DAF (directeur administratif et financier, le sponsor) ouvre, 5 minutes : pourquoi on change (la loi, la fin de la ressaisie), ce qu'il attend.\nPuis la cheffe comptable : ce qui change pour son équipe, et la clôture.\nToi, tu as tout préparé.",
      points: [
        "On écoute son chef. Le « pourquoi » vient de la direction ; le « ce qui change pour moi », du manager direct (cheffe comptable, responsable ADV, responsables de site).",
        "Ton rôle : préparer et outiller. Aux managers, les messages clés, les dates, les réponses aux questions. Tu ne portes pas le changement à leur place.",
        "Un manager qui doute, son équipe le sent. Tu le vois avant, seul à seul : ses craintes, puis ce qu'il dira.",
        "Le sponsor se montre : au lancement, au COPIL (comité de pilotage), quand il faut un moyen. Une 1re réussite ? Il la cite.",
        "Repère : les 8 étapes de Kotter, dont « une équipe qui porte » et « des victoires rapides ». Un modèle, pas une loi."
      ],
      retenir: "Le sponsor dit pourquoi ; les managers portent au quotidien ; toi, tu prépares et tu outilles."
    },
    {
      titre: "Les utilisateurs clés : des relais",
      exemple: "Julie (factures fournisseurs), Sophie (factures clients), Marc (EDI). Ils ont fait la recette.\nEn mai, Julie et Sophie animent la formation de la compta, avec le consultant. Marc montre à ses collègues de l'ADV comment reprendre un rejet EDI.\nLeur temps : vu avec leurs managers (cp16).",
      points: [
        "Un utilisateur clé connaît le travail réel et a la confiance de ses collègues. Chaque équipe a le sien : un collègue convainc mieux qu'un prestataire.",
        "Relais dans les deux sens : il explique le nouveau à son équipe ; il te remonte les questions, les craintes, les contournements.",
        "Formateur : il apprend d'abord (la recette), puis anime avec le consultant, sur les vrais cas. Lui pour le métier, le consultant pour le technique.",
        "Un sceptique respecté peut faire un bon relais : ses objections montrent les vrais problèmes ; convaincu, il convainc.",
        "Ne pas l'épuiser : après la bascule, chacun va le voir. Les questions passent par le support (tickets) ; son manager protège son temps."
      ],
      retenir: "L'utilisateur clé est un relais et un formateur, pas le support : du temps accordé, pas tout sur ses épaules."
    },
    {
      titre: "Communiquer : ce qui change pour moi",
      exemple: "Aux commerciaux, début juin : 10 minutes en réunion d'équipe, et une page.\n« Dès le 14 juin, vos clients reçoivent leurs factures par une plateforme agréée.\nPour vous, rien à saisir ; vos prix, vos commandes : rien ne change.\nUn nouveau client ? Son SIREN, sinon ses factures sont rejetées.\nUn client appelle pour une facture rejetée ? L'ADV. »",
      points: [
        "Chacun veut savoir : ce qui change pour moi, quand, qui m'aide. La technique et le contrat ne l'intéressent pas.",
        "Dire aussi ce qui ne change pas : ça rassure, ça coupe les rumeurs. Aux fournisseurs : « Vos délais de paiement ne changent pas. »",
        "Le bon canal : la compta par sa cheffe, en réunion d'équipe ; les commerciaux, une page ; les fournisseurs, une lettre.",
        "Le bon moment : le pourquoi et les grandes dates tôt, le détail juste avant. Et on répète, par plusieurs canaux : un message lu une fois s'oublie.",
        "À double sens : on note les questions, on répond à tous (une page de questions-réponses, à jour). Les mots justes : module cp17."
      ],
      retenir: "Ce qui change pour moi, quand, qui m'aide, et ce qui ne change pas : par le bon canal, au bon moment, plusieurs fois."
    },
    {
      titre: "Former : juste avant, sur les vrais cas, court",
      exemple: "Compta, du 3 au 28 mai : 2 sessions de 2 h (« recevoir », « émettre »), sur les vraies factures, hors des jours de clôture. Julie et Sophie animent, avec le consultant. Chacun garde un support de 2 pages.\nFin mai, feuilles signées : 9 présences sur 10 prévues (5 personnes à former, 2 sessions chacune), 90 %. Qui manque ? La liste le dit.\nJuin : une 3e session, pour qui a manqué et pour les nouveaux.",
      points: [
        "Sur les vrais cas : leurs factures, un avoir, un rejet. Une démo générale s'oublie. Court : 2 h, pas 2 jours.",
        "Juste avant d'en avoir besoin : trop tôt, on oublie ; trop tard, on apprend sur de vraies factures. Les 1ers cas vont à qui sait déjà. La bascule recule ? Un rappel court.",
        "Selon l'impact : la compta, 2 sessions ; l'ADV, 2 ateliers ; les commerciaux, une page. Les 2 pages : les gestes du quotidien, qui appeler.",
        "Mesurer par nom : qui, quelle session, quand. Un pourcentage cache qui manque. Les nouveaux arrivants se forment après, par l'utilisateur clé, avec les 2 pages.",
        "Former ne suffit pas. ADKAR, modèle du cabinet Prosci (5 initiales anglaises) : comprendre pourquoi, le vouloir, savoir faire, pouvoir le faire, que ça tienne. La formation donne surtout le savoir."
      ],
      retenir: "On forme juste avant, sur les vrais cas, court ; on sait qui est formé, par nom ; et former ne suffit pas."
    },
    {
      titre: "Les résistances : chercher la cause",
      exemple: "Début avril. La cheffe comptable : « Former en mai, avec la clôture ? Et en juin, des rejets partout : c'est nous qui ramerons. »\nPas un refus : 2 craintes précises.\nLa charge : les sessions hors des jours de clôture.\nLes rejets : le pilote les mesure en mai ; après la bascule, 2 semaines de support renforcé (l'hypercare).",
      points: [
        "Résister est normal. La cause est souvent précise : la peur, la charge, un savoir-faire perdu, une mauvaise expérience.",
        "Écouter d'abord, reconnaître ce qui marchait : « Qu'est-ce qui t'inquiète le plus ? » Puis répondre à cette cause, avec du concret : ses cas, un chiffre, une date. Pas de promesse ; l'emploi, c'est la direction.",
        "Pas d'étiquette « résistant » : le dialogue se ferme. Souvent, la résistance montre un vrai problème : un cas oublié, un écran lent, un mauvais moment.",
        "Un savoir-faire perdu se remplace par un rôle : l'experte de la saisie devient la référente des contrôles. Son manager le décide.",
        "La courbe du changement : le refus, la résistance, l'essai, puis l'adhésion. Chacun à son rythme ; juste après la bascule, on ralentit souvent. Un repère, pas une loi."
      ],
      retenir: "Derrière une résistance, une cause : on l'écoute, on y répond avec du concret, sans étiquette."
    },
    {
      titre: "L'adoption : la mesurer, accompagner après",
      exemple: "Juillet, dans Divalto :\n– 1 200 factures fournisseurs reçues par la PA : 0 ressaisie ;\n– 800 saisies à la main, papier ou PDF : des PME (petites et moyennes entreprises, pas tenues d'émettre avant le 1er septembre 2027) et de l'étranger (hors PA). Normal.\nMais Sophie tient encore un Excel des factures émises, « pour vérifier ». Pourquoi ?\nSeptembre, 3e mois : la cheffe comptable mesure le critère.",
      points: [
        "Adoption = le métier se sert vraiment de l'outil, sans double circuit. Elle se mesure par des faits : les factures ressaisies, les fichiers à côté, les tickets « comment faire ».",
        "Lire les chiffres : saisir une facture qu'aucune PA n'envoie, c'est normal ; ressaisir une facture reçue par la PA, c'est un contournement.",
        "Un contournement (l'Excel à côté, la ressaisie « par sécurité ») se cherche et se comprend : une peur, un manque, un défaut ? On répond à la cause.",
        "Après l'hypercare (module cp21), les pannes vont au support ; un point court avec les relais suit l'adoption jusqu'à la mesure. Une question revient dans les tickets ? Une réponse ciblée.",
        "Critère de DEMAT : au 3e mois, plus aucune facture reçue par la PA ressaisie à la main. Le gain plein vient quand les PME émettent (module cp11). Le run et les gains : cp22."
      ],
      retenir: "L'adoption se mesure par des faits ; un contournement se comprend avant de se corriger ; on accompagne jusqu'au 3e mois."
    }
  ]
};
