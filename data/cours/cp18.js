// Chef de projet SI — Fiche de cours du module cp18 « Dire non, arbitrer, gérer un conflit ».
// Fond : pratiques reconnues, adaptées au terrain PME / ETI.
// - Triangle des contraintes (PMBOK : périmètre, délai, coût, avec la qualité au centre ; on dit aussi « triple contrainte »).
// - Délégation : PRINCE2 parle de tolérances (cp04) : dans ta tolérance, tu tranches ; au-delà, le sponsor décide.
// - Arbitrer : des critères écrits avant de comparer ; la loi est un filtre, pas un critère qu'on pèse.
//   MoSCoW (technique de tri popularisée par la méthode agile DSDM) : doit / devrait / pourrait / pas cette fois.
//   Repère DSDM : pas plus d'environ 60 % de l'effort en « doit ». Un arbitrage montre aussi l'option « ne rien changer ».
// - Conflits : les 5 modes du PMBOK, issus du modèle de Thomas et Kilmann (s'effacer / éviter, céder / apaiser, compromis,
//   imposer, collaborer / résoudre). Les écoles divergent sur les noms (Thomas-Kilmann dit « rivaliser » pour imposer,
//   « s'adapter » pour céder) : même idée. Aucun mode n'est toujours bon : collaborer est souvent le meilleur, pas en
//   urgence légale après de vrais essais, ni pour un détail, ni pour un conflit qui n'est pas le tien.
// - Négocier : méthode de Harvard (Fisher et Ury) : séparer les personnes du problème, chercher les intérêts derrière
//   les positions, s'appuyer sur des faits partagés, connaître sa MESORE (meilleure solution de rechange ; BATNA en anglais).
// Fil rouge : DEMAT 2027 (fiche fil rouge de docs/plan-chef-de-projet.md, qui fait foi). Connecteur au contrat le 1er mars 2027 ;
// le plan B (portail de la PA, prévu au contrat) est préparé à froid et part seul si le connecteur n'est pas livré au 15 mars ;
// recette du 16 mars à fin avril, pilote sur 1 site en mai, bascule en juin ; report à mi-juillet = décision du DAF.
// Marge légale juillet-août, émission obligatoire au 1er septembre 2027. Aucun montant d'amende.
// Le sponsor qui dit non en connaissant le coût a décidé : on applique (pas de DG).
// Frontières :
// - cp16 = QUI aller voir et QUAND monter. cp17 = la FORME (les mots d'un non, d'un recadrage, d'une escalade).
//   cp18 = le FOND : faut-il dire oui, non, « oui, mais » ? Qui décide ? Comment préparer un arbitrage ?
//   Comment traiter un conflit entre parties prenantes du projet ?
// - cp10 = le circuit formel d'une demande de changement (analyse d'impact, décision tracée, avenant).
// - cp23 = résistance au changement et adoption ; cp25 = priorisation ENTRE projets ; cp26 = conflits dans SA propre équipe.
// Point faible de l'élève (bilan) : il monte trop haut. Ici, ce qui est dans ta délégation, tu le tranches toi-même.
LEARNSQL.cours.cp18 = {
  intro: "Sur ta migration Divalto ou ta démat fiscale, as-tu déjà dit oui à une « petite » demande, puis payé le retard seul ? Ou monté à ton chef un détail que tu pouvais trancher ? Ici, le fond : faut-il dire oui, non, ou « oui, mais » ? Qui décide ? Comment arbitrer, et traiter un conflit ? Les mots pour le dire : module cp17.",
  sections: [
    {
      titre: "Le triangle : rien n'est gratuit",
      exemple: "Ton projet Snowflake + Power BI : « un tableau de plus, même date, même budget » ? Qui a payé ?\nDEMAT 2027 : le DAF (directeur administratif et financier, ton sponsor) veut ajouter le rapprochement automatique commande-facture fournisseurs.\n« Même date, même budget. » Il faut 12 jours d'intégrateur. Un autre côté doit payer :\n– le délai : la bascule (mise en service) passe de juin à mi-juillet ;\n– le coût : environ 9 000 € de plus ;\n– le périmètre : on retire autre chose ;\n– sinon, la qualité : on teste moins. Personne ne le voit, jusqu'aux rejets.",
      points: [
        "Le triangle : périmètre (ce qu'on livre), délai, coût, avec la qualité au centre. On dit aussi « triple contrainte » (PMBOK, le guide américain).",
        "Un côté bouge ? Un autre paie. « Même projet, même coût, un mois plus tôt » n'existe pas.",
        "Si personne ne choisit, la qualité paie (moins de tests), ou les gens (des heures en plus). En silence.",
        "Ici, la date légale (1er septembre 2027) ne bouge pas. La date de bascule, le coût et le périmètre se négocient.",
        "Ta question réflexe : « Qu'est-ce qu'on lâche en échange ? » Au-delà de ta marge, le sponsor choisit le côté qui paie. Même la qualité, s'il voit le risque. (L'agile, lui, n'y touche pas : il retire du périmètre.)"
      ],
      retenir: "Rien n'est gratuit : quand un côté du triangle bouge, un autre paie, et le sponsor choisit lequel."
    },
    {
      titre: "Trier une demande : oui, oui mais, pas maintenant, non",
      exemple: "Quatre demandes arrivent.\nSophie (comptable clients) : une fiche d'une page sur les codes de rejet. 1 heure de ton temps, utile à la formation. → Oui.\nLe DG (directeur général) : les 3 dépôts au pilote de mai, au lieu d'1. 2 semaines de plus, ou un renfort. → Oui, mais : tu lui donnes le prix, DAF prévenu. Il choisit.\nLe responsable de site : ses factures dans son tableau Power BI. Utile, pas urgent. → Pas maintenant : en juillet.\nMarc (ADV : administration des ventes) : renvoyer une facture émise, avec un autre prix, sous le même numéro. → Non : une facture émise ne se modifie pas. Sophie fait un avoir.",
      points: [
        "Cinq questions, dans l'ordre : légal ? Dans ton rôle ? Utile à l'objectif ? Dans le périmètre ? Dans ta marge ?",
        "Illégal, hors de ton rôle, ou sans lien avec l'objectif : non, sans chiffrer. Une raison, et la bonne voie : un avoir, la bonne personne, un autre projet.",
        "Petit, utile, dans ta marge, et c'est à toi de décider : oui, tout simplement. Ce oui-là est la bonne réponse.",
        "Utile, mais il coûte (délai, argent, temps d'un autre service) : « oui, mais ». Le prix va à celui qui décide.",
        "Bonne demande, mauvais moment : « pas maintenant », avec une date. Son prix ira au décideur à ce moment-là. Exigée avant la bascule, ou demandée par le sponsor ? Alors « oui, mais » (module cp10)."
      ],
      retenir: "Une demande se trie : oui, oui mais, pas maintenant, ou non. La loi et ton rôle d'abord, le prix ensuite."
    },
    {
      titre: "Qui décide : ta délégation, ou l'arbitrage",
      exemple: "Julie (comptable fournisseurs) veut tester les avoirs mardi au lieu de jeudi, avec l'accord de sa cheffe. → Tu décides.\nL'intégrateur livre un lot avec 3 jours de retard. Ta marge de recette les couvre. → Tu replanifies, et tu le dis au point projet.\nLe responsable ADV veut 1 mois de pilote en plus : la bascule passerait en juillet. → Pas à toi : tu prépares l'arbitrage, le DAF tranche.",
      points: [
        "Ta délégation : l'ordre des tests, un créneau déjà accordé, un outil du projet, un écart dans ta tolérance (± 2 semaines par jalon, module cp04). Tu décides, puis tu informes.",
        "Pas à toi : le périmètre, le budget, une date validée, un contrat. Là, le sponsor ou le COPIL (comité de pilotage) tranche. Le temps ou l'organisation d'un autre service : son manager.",
        "Préparer un arbitrage : la question, 2 ou 3 options avec leur prix (délai, coût, risque), dont « ne rien changer », ta recommandation, une date limite.",
        "Monter un détail fait perdre du temps au sponsor, et lui apprend à décider à ta place. Ton point faible : avant de monter, demande-toi « est-ce dans ma délégation ? ».",
        "Le sponsor a tranché en connaissant le prix ? C'est décidé : tu appliques, et tu notes le risque, même si tu préférais l'autre option."
      ],
      retenir: "Dans ta délégation, tu tranches ; au-delà, tu prépares l'arbitrage, et celui qui a l'autorité décide."
    },
    {
      titre: "Deux demandes, une place : des critères, puis MoSCoW",
      exemple: "Avril. Il reste 8 jours d'intégrateur avant le pilote. Deux demandes de 6 jours.\nLe responsable ADV : le numéro de commande dans les factures EDI (échange de données informatisé) d'AquaBleu. Sans lui, AquaBleu (20 % du chiffre d'affaires) les rejette.\nLa cheffe comptable : l'imputation analytique automatique des factures fournisseurs. Un gain de temps, sans échéance.\nAquaBleu : « doit ». L'analytique : « pas cette fois », écrite pour juillet. Contesté ? Le DAF tranche, sur tes critères.",
      points: [
        "Des critères écrits AVANT de comparer : loi, valeur, urgence (une date), risque si on ne fait rien, effort (en jours). Le rang du demandeur n'en est pas un.",
        "La loi n'est pas un critère qu'on pèse : c'est un filtre. Ce qui est obligatoire passe d'abord.",
        "MoSCoW : une technique de tri, popularisée par la méthode agile DSDM. « Doit » : sans lui, la bascule échoue. « Devrait » : important, contournable. « Pourrait » : confort. « Pas cette fois » : écrit, avec une date.",
        "Piège : tout mettre en « doit ». Repère DSDM : pas plus d'environ 60 % de l'effort en « doit ». Sinon, rien ne protège la date.",
        "Tu proposes le classement, avec les métiers. Le sponsor valide les « doit » et tranche en cas de désaccord. Entre deux projets : module cp25."
      ],
      retenir: "Deux demandes, une place : des critères écrits, la loi d'abord, puis MoSCoW. Le « pas cette fois » s'écrit, avec une date."
    },
    {
      titre: "Un conflit : cinq réponses, aucune n'est toujours la bonne",
      exemple: "Trois conflits, trois réponses.\nLe chef de projet de la plateforme agréée (PA) veut le point hebdo le mardi, toi le lundi. Enjeu mineur : tu cèdes.\nLa compta et l'ADV se renvoient les factures clients rejetées. Sujet durable, et 2 mois devant toi : vous cherchez ensemble.\nVeille du paramétrage : deux managers bloqués après 2 réunions, tes options posées. Le DAF tranche : c'est imposer, par celui qui a l'autorité.",
      points: [
        "S'effacer (éviter) : on recule, on reporte. Bon pour un enjeu mineur, un conflit qui n'est pas le tien, ou pour calmer. Mauvais si le problème grossit.",
        "Céder (apaiser) : on donne raison à l'autre. Bon si c'est peu important pour toi et important pour lui.",
        "Compromis : chacun lâche une partie. Bon quand le temps presse, à valeur égale. Chacun n'est content qu'à moitié. Jamais sur la loi.",
        "Imposer : celui qui a l'autorité tranche (toi dans ta délégation, le manager, le sponsor), ou la règle (la loi, le contrat). Bon en urgence, ou quand la règle existe. Il y a un perdant.",
        "Collaborer (résoudre) : chercher ensemble ce qui sert les deux. Souvent le meilleur, si l'enjeu compte et qu'on a le temps. (5 modes du PMBOK, d'après Thomas et Kilmann.)"
      ],
      retenir: "Collaborer est souvent le meilleur, pas toujours : la réponse dépend de l'enjeu, du temps, et de la règle."
    },
    {
      titre: "Traiter un conflit : intérêts, faits, solution de rechange",
      exemple: "La compta et l'ADV se renvoient les factures rejetées. Tu demandes à chacun : « Que veux-tu protéger ? »\nCompta : ne pas modifier les fiches clients. ADV : ne pas toucher aux factures.\nRègle trouvée ensemble : rejet sur une donnée client (SIREN, adresse) → l'ADV ; sur un montant → Sophie, par un avoir.\nLa PA et l'intégrateur s'accusent ? Pas de débat : un test commun, 10 factures, les deux présents, les mêmes logs. Puis le contrat dit qui corrige.",
      points: [
        "Sépare les personnes du problème : vous attaquez le problème ensemble, pas l'autre. C'est la méthode de Harvard (Fisher et Ury).",
        "Derrière une position (« pas nous »), cherche l'intérêt (« ne pas toucher aux fiches clients »). Deux positions s'opposent ; deux intérêts se combinent souvent.",
        "Deux parties s'accusent ? Des faits vus ensemble : un test commun, les logs, le contrat, le cahier de recette. Pas ton avis.",
        "Avant de négocier, connais ta solution si l'accord échoue : ta MESORE (meilleure solution de rechange). Face à la PA en retard, c'est le portail prévu au contrat : tu négocies sans panique.",
        "Donne pour recevoir : un délai contre une date ferme, un service contre du temps. Jamais sur la loi. Toujours bloqués, options posées ? Celui qui a l'autorité tranche."
      ],
      retenir: "Un conflit se traite sur les intérêts et les faits, pas sur les personnes ; on négocie avec une solution de rechange, jamais sur la loi."
    }
  ]
};
