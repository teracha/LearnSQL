// Chef de projet SI — Fiche de cours du module cp07 « Gérer les risques ».
// Fond : pratiques reconnues (PMBOK : registre des risques, probabilité × impact, réponses éviter / réduire (atténuer) /
// transférer / accepter ; PRINCE2 : propriétaire du risque, revue régulière ; terrain : déclencheur et plan B),
// adaptées au terrain PME / ETI. Fil rouge : DEMAT 2027 (docs/plan-chef-de-projet.md).
// Réglementaire (repris de cp04, vérifié fin octobre 2026) : réception des factures électroniques obligatoire depuis
// le 1er septembre 2026 ; émission et e-reporting obligatoires pour les PME au 1er septembre 2027, via une plateforme agréée (PA).
// Point faible de l'élève (bilan) : il choisit la plus grosse solution (décaler la recette de 4 mois) au lieu
// d'une action proportionnée (écrire le risque, former une suppléante). Le module traite ce cas (section 5),
// sans tomber dans l'excès inverse : un risque majeur ou légal se dit au sponsor tout de suite (sections 6 et 7).
LEARNSQL.cours.cp07 = {
  intro: "Gérer les risques, c'est agir avant que le souci arrive, quand ça coûte encore peu. Ce module te donne un registre simple, 4 réponses possibles, et une règle : la réponse a la taille du risque, ni plus grosse, ni plus petite.",
  sections: [
    {
      titre: "Partir de ton vécu : risque, problème, hypothèse",
      exemple: "Ta migration Divalto ou ton projet Snowflake : un souci t'a-t-il surpris le jour J ?\nAvec le recul, quelqu'un le voyait-il venir ? L'avait-on écrit quelque part ?\nDEMAT 2027 : le prestataire de la PA (plateforme agréée) dit : « Le connecteur Divalto aura peut-être du retard. » C'est un risque.\nLe 16 mars, le connecteur promis pour le 15 n'est pas là. C'est devenu un problème.",
      points: [
        "Risque = un événement incertain, pas encore arrivé, qui gênerait le projet : délai, coût, qualité.",
        "Problème = c'est arrivé. On ne l'évalue plus : on le traite, tout de suite.",
        "Hypothèse = ce qu'on suppose vrai sans preuve (module cp04). Un doute ? Vérifie-la vite. Impossible à vérifier ? Écris-la comme un risque.",
        "Gérer les risques = agir AVANT, quand une petite action suffit encore.",
        "Ton réflexe à corriger : prendre la plus grosse solution. Ici, la réponse a la taille du risque. Mais un vrai danger ne se minimise pas."
      ],
      retenir: "Un risque se prépare avant ; un problème se traite maintenant."
    },
    {
      titre: "Trouver les risques : à plusieurs, et chez les gens",
      exemple: "Atelier d'1 h : cheffe comptable, Julie (comptable fournisseurs), Sophie (comptable clients), responsable ADV (administration des ventes), intégrateur Divalto, prestataire de la PA.\nQuestion posée : « Qu'est-ce qui peut nous empêcher d'émettre nos factures le 1er septembre 2027 ? »\nL'intégrateur raconte un autre client : la reprise des codes TVA avait coûté 3 semaines.\nJulie dit : « Les avoirs fournisseurs, seule la cheffe comptable sait les traiter. »",
      points: [
        "Atelier court, avec les métiers ET les prestataires. Seul à ton bureau, tu ne vois que la technique.",
        "Retours d'expérience : tes projets passés, ceux de l'intégrateur, les autres clients de la PA.",
        "Cherche les points uniques de défaillance : une seule personne qui sait, un seul consultant, un seul fichier. S'il manque, tout s'arrête.",
        "Relis les hypothèses et les dépendances de la note de cadrage : prestataire, clients EDI (échange de données informatisé), congés, clôtures.",
        "« On pourrait être en retard » n'est pas un risque : c'est une conséquence. Cherche la cause précise. Ex. : « Seule la cheffe comptable sait traiter les avoirs. »"
      ],
      retenir: "Les risques se trouvent à plusieurs, et souvent chez les gens, pas dans la technique."
    },
    {
      titre: "Le registre : cause, risque, conséquence, et une note",
      exemple: "Cause : seule la cheffe comptable connaît les cas d'avoirs fournisseurs, et elle est en congé 3 semaines pendant la recette.\nRisque : les avoirs ne sont pas testés à temps.\nConséquence : erreurs sur les avoirs après la bascule.\nNote : probabilité 3 (forte) × impact 2 (moyen) = 6. C'est une priorité.\nPropriétaire : la cheffe comptable. Action : former Julie avant le 15 mai. Revue : au point projet, tous les 15 jours.",
      points: [
        "Une ligne = cause → risque → conséquence. Phrase type : « Parce que [cause], il peut arriver que [risque], ce qui entraînerait [conséquence]. »",
        "Note = probabilité × impact. Chacun va de 1 (faible) à 3 (fort), en passant par 2 (moyen). La note va donc de 1 à 9.",
        "Lire la note : 3 (forte) × 3 (fort) = 9, priorité. 3 × 2 = 6, priorité aussi. 1 (faible) × 2 (moyen) = 2 : on accepte et on surveille de loin. Exception : un impact fort sur une date légale se suit de près, même à 1 × 3 = 3.",
        "Propriétaire = UNE personne nommée, qui suit l'action. Pas « l'équipe ». Pas toi sur toutes les lignes.",
        "Chaque ligne a une action, une date et une prochaine revue. Sans action ni date, c'est une liste d'inquiétudes."
      ],
      retenir: "Une ligne de registre dit d'où vient le risque, combien il pèse, qui agit et quand."
    },
    {
      titre: "Les 4 réponses : éviter, réduire, transférer, accepter",
      exemple: "Éviter : pas de bascule en août (congés, aucune marge). On la met en juin : ce risque disparaît.\nRéduire : former Julie aux avoirs. Le trou en recette devient peu probable.\nTransférer : une date et des pénalités de retard dans le contrat de la PA.\nAccepter : la PA peut augmenter ses prix au renouvellement. On garde une réserve dans le budget.",
      points: [
        "Éviter = changer le plan pour que le risque n'existe plus. Pour un risque inacceptable. Ex. : bascule en juin, ou le connecteur standard plutôt qu'un développement spécifique jamais testé.",
        "Réduire = baisser la probabilité ou l'impact : former une suppléante, documenter, tester plus tôt, un pilote sur 1 site.",
        "Transférer = faire porter la conséquence par un autre : contrat (pénalités), assurance. Attention : la pénalité paie, mais le retard reste chez toi.",
        "Accepter = ne rien faire de plus, en le sachant. Pour un petit risque, ou quand rien n'est possible. L'impact compte ? Alors avec une réserve (temps, argent) ou un plan de repli.",
        "On combine souvent : transférer l'argent ET réduire le délai."
      ],
      retenir: "On évite l'inacceptable, on réduit le reste, on transfère l'argent, on accepte le petit."
    },
    {
      titre: "Proportionner : la réponse a la taille du risque",
      exemple: "La cheffe comptable, seule à connaître les cas, part en congé pendant la recette, dans 4 mois.\nRéponse trop grosse : « Demander au COPIL (comité de pilotage) de décaler la recette de 4 mois. » La marge avant la date légale disparaît.\nRéponse trop petite : « On verra à son retour. »\nRéponse proportionnée : l'écrire en risque, faire écrire ses cas avant son départ, former Julie comme suppléante.",
      points: [
        "Avant de choisir, demande-toi : quelle est l'action la plus simple qui réduit assez ce risque ?",
        "4 mois d'avance = du temps pour agir petit. Une semaine d'absence se prend sur la marge. Décaler tout le projet coûte plus cher que le risque.",
        "Ne mets pas tout au registre : 100 risques = 0 pilotage. Garde 10 à 20 risques actifs, et montre les 5 plus gros au COPIL.",
        "Ne surréagis pas à une rumeur ou à un petit retard dans la marge : tu vérifies, tu notes, tu ajustes.",
        "Mais un risque majeur, sans action simple : là, on change le plan (éviter), et on le dit au sponsor."
      ],
      retenir: "La bonne réponse est la plus petite action qui réduit assez le risque, pas la plus spectaculaire."
    },
    {
      titre: "Déclencheur, plan B, revue : quand le risque devient un problème",
      exemple: "Risque : retard du connecteur Divalto de la PA.\nDéclencheur : « connecteur pas livré et recetté au 15 mars ».\nPlan B : déposer les factures clients sur le portail web de la PA (prévu au contrat), en attendant le connecteur.\nLe 16 mars, rien. Tu ne réévalues pas : tu déclenches le plan B, et tu préviens le DAF (directeur administratif et financier, ton sponsor).",
      points: [
        "Déclencheur = un signal observable, avec une date. « Pas livré au 15 mars », pas « si ça sent mauvais ».",
        "Plan B = ce qu'on fait si le risque arrive. Préparé à froid, pas inventé dans l'urgence.",
        "Revue courte et régulière, au point projet. La note a changé ? L'action est faite ? Le risque est écarté ? Alors on le ferme.",
        "Un signal faible (2 jalons intermédiaires ratés) : remonte la probabilité tout de suite. N'attends pas la date finale.",
        "Le risque arrive : il sort du registre et devient un problème à traiter. Tu déclenches le plan B. La date ou le budget bougent ? Tu préviens le sponsor."
      ],
      retenir: "Un déclencheur clair décide pour toi : la date passe, le plan B part."
    },
    {
      titre: "Parler d'un risque au sponsor : ni drame, ni silence",
      exemple: "Lundi, la PA annonce 2 mois de retard. Le COPIL est dans 3 semaines.\nAvec ce retard, la bascule tombe en août, sans marge avant le 1er septembre 2027.\nTu appelles le DAF le jour même : les faits, l'impact, 2 options, ta recommandation.\nÀ l'inverse, le risque « logo mal placé sur le PDF » attendra le compte rendu du COPIL.",
      points: [
        "Quand ? Au COPIL pour les risques suivis. Le jour même pour : un risque légal, un risque majeur proche, une décision à lui demander. Risque légal = même hors de ton périmètre. Ex. : le e-reporting (envoi au fisc des données de ventes hors facture électronique), porté par le DAF.",
        "Comment ? Les faits, la probabilité, l'impact (date, coût), ce que tu fais déjà, ce que tu attends de lui.",
        "À dire : « Risque sur la date légale : la PA annonce 2 mois de retard. Je propose l'option B. J'ai besoin de ta décision d'ici vendredi. »",
        "Sans dramatiser : pas de « catastrophe », pas de COPIL extraordinaire pour un risque moyen.",
        "Sans cacher : un risque fort gardé pour toi « le temps de le régler » devient une surprise pour le sponsor. Sa confiance tombe."
      ],
      retenir: "Un risque se dit tôt, avec des faits et une proposition : ni drame, ni silence."
    }
  ]
};
