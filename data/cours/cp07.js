// Chef de projet SI — Fiche de cours du module cp07 « Gérer les risques ».
// Fond : pratiques reconnues (PMBOK : registre des risques, probabilité × impact, réponses éviter / réduire (atténuer) /
// transférer / accepter, et escalader ; PRINCE2 : propriétaire du risque, revue régulière ; terrain : déclencheur et plan B),
// adaptées au terrain PME / ETI. Fil rouge : DEMAT 2027 (fiche fil rouge de docs/plan-chef-de-projet.md, qui fait foi).
// Réglementaire (vérifié fin octobre 2026) : réception des factures électroniques obligatoire depuis
// le 1er septembre 2026 ; émission et e-reporting obligatoires pour les PME au 1er septembre 2027, via une plateforme agréée (PA).
// Calendrier du fil rouge : connecteur livré au 1er mars 2027 (contrat), déclencheur du plan B au 15 mars,
// recette du 16 mars à fin avril (6 semaines + 1 semaine de marge de recette), pilote en mai, bascule en juin.
// Point faible de l'élève (bilan) : il choisit la plus grosse solution (décaler la recette de 4 mois) au lieu
// d'une action proportionnée (écrire le risque, former une suppléante). Le module traite ce cas (section 5),
// sans tomber dans l'excès inverse : un risque majeur ou légal se dit au sponsor le jour même (section 6).
// « Escalader » en section 4 = la 5e réponse du PMBOK (remettre un risque à son porteur), pas l'échelle d'escalade de cp16.
LEARNSQL.cours.cp07 = {
  intro: "Gérer les risques, c'est agir avant que le souci arrive, quand ça coûte encore peu. Ce module te donne un registre simple, 4 réponses possibles, et une règle : la réponse a la taille du risque, ni plus grosse, ni plus petite.",
  sections: [
    {
      titre: "Partir de ton vécu : risque, problème, hypothèse",
      exemple: "Ta migration Divalto ou ton projet Snowflake : un souci t'a-t-il surpris le jour J ?\nAvec le recul, quelqu'un le voyait-il venir ? L'avait-on écrit quelque part ?\nDEMAT 2027 : le chef de projet de la plateforme agréée (PA) dit : « Le connecteur Divalto aura peut-être du retard. » C'est un risque.\nLe connecteur devait être livré le 1er mars. Le 16 mars, il n'est toujours pas là. C'est devenu un problème.",
      points: [
        "Risque = un événement incertain, pas encore arrivé, qui gênerait le projet : délai, coût, qualité. Le PMBOK (le guide américain) compte aussi les opportunités ; ici, on traite les menaces.",
        "Problème = c'est arrivé. On ne l'évalue plus : on le traite, maintenant.",
        "Hypothèse = ce qu'on suppose vrai sans preuve (module cp04). Un doute ? Vérifie-la vite. Impossible à vérifier ? Écris-la comme un risque.",
        "Gérer les risques = agir AVANT, quand une petite action suffit encore.",
        "Ton réflexe à corriger : prendre la plus grosse solution. Ici, la réponse a la taille du risque. Mais un vrai danger ne se minimise pas."
      ],
      retenir: "Un risque se prépare avant ; un problème se traite maintenant."
    },
    {
      titre: "Trouver les risques : à plusieurs, et chez les gens",
      exemple: "Atelier d'1 h, avec :\n– la cheffe comptable ;\n– Julie, comptable fournisseurs ;\n– Sophie, comptable clients ;\n– le responsable ADV (administration des ventes) ;\n– l'intégrateur Divalto ;\n– le chef de projet de la PA.\nQuestion posée : « Qu'est-ce qui peut faire rater la bascule de juin ? » (bascule = mise en service)\nL'intégrateur raconte un autre client : la reprise des codes TVA avait coûté 3 semaines.\nJulie dit : « Les avoirs fournisseurs, seule la cheffe comptable sait les traiter. »",
      points: [
        "Atelier court, avec les métiers ET les prestataires. Seul à ton bureau, tu ne vois que la technique.",
        "Retours d'expérience : tes projets passés, ceux de l'intégrateur, les autres clients de la PA.",
        "Cherche les points uniques de défaillance : une seule personne qui sait, un seul consultant, un seul fichier. S'il manque, tout s'arrête.",
        "Relis les hypothèses et les dépendances de la note de cadrage : prestataires, clients EDI (échange de données informatisé), congés, clôtures.",
        "« On pourrait être en retard » n'est pas un risque : c'est une conséquence. Cherche la cause précise. Ex. : « Seule la cheffe comptable sait traiter les avoirs. »"
      ],
      retenir: "Les risques se trouvent à plusieurs, et souvent chez les gens, pas dans la technique."
    },
    {
      titre: "Le registre : cause, risque, conséquence, et une note",
      exemple: "Cause : seule la cheffe comptable sait traiter les avoirs fournisseurs, et elle est en congé 3 semaines pendant la recette (les tests de validation par le métier).\nRisque : les avoirs ne sont pas testés à temps.\nConséquence : erreurs sur les avoirs après la bascule.\nNote : probabilité 3 (forte) × impact 2 (moyen) = 6. C'est une priorité.\nPropriétaire : le DAF (directeur administratif et financier), son manager. Pas elle : elle sera absente.\nAction : former Julie avant le 15 mars. Revue : au point projet, chaque semaine.",
      points: [
        "Une ligne = cause → risque → conséquence. Phrase type : « Parce que [cause], il peut arriver que [risque], ce qui entraînerait [conséquence]. »",
        "Note = probabilité × impact. Chacun va de 1 (faible) à 3 (fort), en passant par 2 (moyen). La note va donc de 1 à 9.",
        "Lire la note : 6 ou 9 = priorité. 3 ou 4 = une action simple, suivie en revue. 1 ou 2 = on accepte, on surveille de loin. Exception : date légale en jeu, on suit de près, même à 3.",
        "Propriétaire = UNE personne nommée, qui suit l'action. Pas « l'équipe ». Pas toi sur toutes les lignes. Il doit pouvoir agir quand le risque arrive : jamais la personne absente elle-même.",
        "Chaque ligne a une réponse (une action, ou « accepté » écrit), une date et une prochaine revue. Sans réponse ni date, c'est une liste d'inquiétudes."
      ],
      retenir: "Une ligne de registre dit d'où vient le risque, combien il pèse, qui agit et quand."
    },
    {
      titre: "Les 4 réponses : éviter, réduire, transférer, accepter",
      exemple: "Éviter : pas de bascule en août (congés, aucune marge). On la met en juin : ce risque disparaît.\nRéduire : former Julie aux avoirs fournisseurs. Si la cheffe comptable manque, quelqu'un sait : l'impact baisse.\nTransférer : une date et des pénalités de retard dans le contrat de la PA.\nAccepter : la PA peut augmenter ses prix au renouvellement. On garde une réserve dans le budget.\nEscalader : le e-reporting (envoyer au fisc, via la PA, les ventes aux particuliers, les opérations avec l'étranger et des données de paiement) est hors projet. Tu le remets au DAF, son porteur.",
      points: [
        "Éviter = changer le plan pour que le risque n'existe plus. Pour un risque inacceptable. Ex. : bascule en juin, ou le connecteur standard plutôt qu'un développement spécifique jamais testé.",
        "Réduire = baisser la probabilité ou l'impact : former une suppléante, documenter, tester plus tôt, un pilote sur 1 site.",
        "Transférer = faire porter la conséquence par un autre : contrat (pénalités, module cp14), assurance. La pénalité paie, mais le retard reste chez toi : réduis-le aussi.",
        "Accepter = ne rien faire de plus, en le sachant. Pour un petit risque, ou quand rien n'est possible. L'impact compte ? Alors avec une réserve (temps, argent) ou un plan de repli.",
        "5e réponse du PMBOK : « escalader » = remettre le risque à son porteur, hors de ton projet. Ex. : le e-reporting, porté par le DAF. Ce n'est pas l'échelle d'escalade de cp16."
      ],
      retenir: "On évite l'inacceptable, on réduit le reste, on transfère l'argent, on accepte le petit."
    },
    {
      titre: "Proportionner : la réponse a la taille du risque",
      exemple: "La cheffe comptable, seule à connaître les cas, part en congé pendant la recette, dans 4 mois.\nRéponse trop grosse : « Demander au COPIL (comité de pilotage) de décaler la recette de 4 mois. » La bascule passe après le 1er septembre 2027 : date légale ratée.\nRéponse trop petite : « On verra à son retour. »\nRéponse proportionnée : l'écrire en risque, faire écrire ses cas avant son départ, former Julie comme suppléante.",
      points: [
        "Avant de choisir, demande-toi : quelle est l'action la plus simple qui réduit assez ce risque ?",
        "4 mois d'avance = du temps pour agir petit. Une semaine d'absence se prend sur la marge de recette. Décaler tout le projet coûte plus cher que le risque.",
        "Ne mets pas tout au registre : 100 risques = 0 pilotage. Repère de terrain (pas une norme) : 10 à 20 risques actifs, les 5 plus gros montrés au COPIL.",
        "Ne surréagis pas à une rumeur ou à un petit retard dans la marge : tu vérifies, tu notes, tu ajustes.",
        "Mais un risque majeur, sans action simple : là, on change le plan (éviter), et le sponsor le sait le jour même."
      ],
      retenir: "La bonne réponse est la plus petite action qui réduit assez le risque, pas la plus spectaculaire."
    },
    {
      titre: "Quand le risque arrive : déclencheur, plan B, sponsor",
      exemple: "Risque : retard du connecteur de la PA. Livraison prévue au contrat : le 1er mars. Recette à partir du 16 mars.\nDéclencheur : « connecteur pas livré au 15 mars ».\nPlan B, prévu au contrat : bascule de juin via le portail web de la PA, avec dépôt en Factur-X (un PDF qui contient aussi les données).\nLe 16 mars, rien. Tu ne réévalues pas : tu lances le plan B.\nTu préviens le DAF, ton sponsor, le jour même : les faits, le plan B lancé, ce qui change.\nÀ l'inverse, le risque « logo mal placé sur le PDF » attendra le COPIL.",
      points: [
        "Déclencheur = un fait observable, avec une date. Plan B = préparé à froid, pas inventé dans l'urgence. À dire : « Pas livré au 15 mars : on lance le plan B. »",
        "Revue : 15 minutes au point projet, sur ce qui bouge. Un signal d'alerte (2 jalons intermédiaires ratés) ? La probabilité monte tout de suite. Action faite et vérifiée ? On ferme.",
        "Le risque arrive : il devient un problème. Tu déclenches le plan B et tu informes le sponsor. La date ou le budget bougent ? Tu lui demandes une décision, le jour même.",
        "Quand ? Le jour même : risque légal (même hors de ton périmètre), risque majeur proche, décision à lui demander. Au COPIL : les risques suivis. Au point suivant : une info sans décision.",
        "Comment ? Les faits, l'impact (date, coût), ce que tu fais déjà, ce que tu attends de lui. Ni drame (« catastrophe »), ni silence : un risque fort gardé pour toi devient une surprise."
      ],
      retenir: "Un déclencheur daté décide pour toi. Le sponsor sait tôt, avec des faits : ni drame, ni silence."
    }
  ]
};
