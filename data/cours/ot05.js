// Parcours « Maîtriser les outils du chef de projet » — Fiche de cours du module ot05 « Outils pour livrer ».
// Une section par outil de l'étape « Livrer » (data/outils/sujets.js), dans l'ordre : gp-recette, gp-reprise,
// gp-conduite-changement, gp-bascule, gp-bilan. Pas de nouvelle notion : on apprend à SE SERVIR des outils (quoi faire,
// comment le faire sur le site). Les règles et les mots sont ceux des outils et de leurs cours, mot pour mot : cp19 et cp08
// (cahier de recette), cp20 (reprise), cp23 (conduite du changement), cp21 et cp20 (go / no-go et bascule), cp22 et cp15
// (bilan et REX). Boutons et zones de l'écran : bloc « Outils » de js/app.js (« + Cas », « + Population », « + Présence »,
// « + Critère », « + Étape », « + Point », « + Constat », « + Fait », Alertes, Totaux). Chiffres des exemples : ceux des
// exemples des outils, recalculés avec le moteur (js/outils.js) : au 14 avril 2027, 7 cas joués sur 8, 2 OK, 2 bloquantes
// et 2 majeures ouvertes ; essai 2, 2 000 = 1 980 + 20 et 600 = 594 + 6, écart 0 « Juste » ; 300 fiches × 10 minutes =
// 50 h ; fin mai, 9 présences signées sur 10 ; 6 critères sur 6 ; 4 actions au REX.
// Fil rouge : DEMAT 2027 (fiche fil rouge de docs/plan-chef-de-projet.md, qui fait foi).
LEARNSQL.cours.ot05 = {
  intro: "Livrer, c'est prouver que ça marche pour le métier, le faire adopter, basculer sans casse, puis fermer. Ici, tu apprends à te servir des 5 outils de l'étape « Livrer » du menu Outils, de la recette au bilan de fin. Sur ta migration Divalto, qui a dit « on y va », et sur quels chiffres ?",
  sections: [
    {
      titre: "Cahier de recette",
      exemple: "Mercredi 14 avril 2027, en pleine recette (les tests de validation par le métier) de DEMAT 2027.\nSous le cahier : 7 cas joués sur 8, 2 OK, 2 bloquantes et 2 majeures ouvertes.\nLe cas F-17 (un avoir fournisseur) a cassé après la livraison du mardi 13.\nQuatre alertes : « Pas de PV tant que cette anomalie est ouverte. »",
      points: [
        "À quoi il sert : suivre les cas de test du métier, leurs résultats et les anomalies, jusqu'au PV (procès-verbal de recette). Quand : les cas avant la recette ; puis chaque semaine, les totaux.",
        "Sur le site : le livrable, les critères (déjà proposés : 0 bloquante, 0 majeure), qui signe. `+ Cas` : situation, résultat attendu, testeur. Après le test : « Résultat » ; pour une anomalie, sa gravité et son ticket. « Lot de non-régression » : « Oui » pour 15 à 20 cas clés.",
        "La règle : le métier écrit ses vrais cas, avec le résultat attendu, avant de tester. Chaque anomalie : un ticket, et une gravité fixée par le métier : bloquante (on ne peut plus facturer ou recevoir), majeure (un contournement coûteux), mineure (une gêne).",
        "Le piège : le pourcentage. « 95 % OK » peut cacher un flux entier qui ne passe pas. Les totaux montrent les bloquantes et les majeures à part.",
        "Le bon réflexe : pas de PV tant qu'une bloquante ou une majeure est ouverte : corrige, puis rejoue OK. Après chaque livraison, le cas corrigé et le lot de non-régression : pas tout, jamais rien. Les mineures deviennent des réserves datées."
      ],
      retenir: "Les vrais cas du métier, écrits avant ; un ticket et une gravité par anomalie ; pas de PV avec une bloquante ou une majeure ouverte."
    },
    {
      titre: "Reprise de données",
      exemple: "Dimanche 16 mai 2027, essai 2 de la reprise des tiers vers la PA (plateforme agréée).\nClients : 2 000 extraites = 1 980 chargées + 20 rejetées, toutes expliquées. Fournisseurs : 600 = 594 + 6.\nL'outil affiche « Écart 0 · Juste ».\nLe responsable ADV (administration des ventes) et la cheffe comptable signent, chiffres en main.",
      points: [
        "À quoi il sert : préparer et prouver une reprise : l'inventaire, la qualité mesurée avant, les contrôles de chaque essai. Quand : l'inventaire dès le cadrage ; les contrôles à chaque essai à blanc (au moins deux) et à la reprise définitive.",
        "Sur le site, 3 tableaux. L'inventaire : source, cible, volume, propriétaire, règles. La qualité : le problème, les fiches, les minutes par fiche ; le temps se calcule. Les contrôles : extraites, chargées, rejetées ; l'écart se calcule : « Juste », « Fiches manquantes » ou « Fiches en trop ».",
        "La règle : extraites = chargées + rejetées, et chaque rejet expliqué. Une seule fiche sans explication bloque la signature. Le propriétaire est au métier : il signe, chiffres en main, pas l'intégrateur.",
        "Le piège : « on nettoiera après ». On corrige à la source, dans Divalto, par le métier. Corrigée dans le fichier de transit, l'erreur revient à l'essai suivant.",
        "Le bon réflexe : mesurer avant, en chiffres. 300 fiches sans SIREN (le numéro d'entreprise) × 10 minutes = 50 heures pour l'ADV : ce temps se demande à son manager, tôt."
      ],
      retenir: "Une reprise se prouve : extraites = chargées + rejetées, chaque rejet expliqué, et la signature du propriétaire au métier."
    },
    {
      titre: "Conduite du changement",
      exemple: "Fin mai 2027. Formation de la compta : 9 présences signées sur 10 prévues, 90 %.\nQui manque ? La liste le dit : la cheffe comptable, malade le jour de la session « recevoir ».\nL'alerte : « Absent : prévois sa session de rattrapage, datée, avant la bascule. »\nTu notes son rattrapage : le 9 juin, avant le go du 11.",
      points: [
        "À quoi il sert : préparer l'adoption : qui est touché, à quel point, le message de chacun, la formation par nom. Quand : la carte des impacts au cadrage, revue après la recette ; la formation juste avant.",
        "Sur le site, 3 tableaux : la carte des impacts (`+ Population` : ce qui change, à quel point, qui porte le message, le relais), les messages (ce qui change, ce qui ne change pas, le canal, la date), la formation (`+ Présence` : une ligne par personne et par session).",
        "La règle : l'effort suit l'impact. Fort : on forme et on accompagne ; faible : on informe. Le message passe par le manager direct : ce qui change pour moi, quand, qui m'aide, et ce qui ne change pas.",
        "Le piège : « 90 % de présents ». Un pourcentage cache qui manque : mesure par nom. Autre piège : oublier ceux qui répondent aux questions (les commerciaux), le site pilote, le dehors.",
        "Le bon réflexe : chaque absent a son rattrapage daté, avant la bascule. Toi, tu prépares et tu outilles les managers ; le sponsor dit pourquoi on change."
      ],
      retenir: "Une carte des impacts, un message par population porté par son manager, et la formation suivie par nom : un pourcentage cache qui manque."
    },
    {
      titre: "Go / no-go et plan de bascule",
      exemple: "Vendredi 11 juin 2027, 14 h : le go / no-go (on y va ou pas) de la bascule du lundi 14.\nTa page : 6 critères sur 6 atteints, preuves jointes. Un risque : AquaBleu, absent du pilote ; parade : Marc vérifie ses 1res factures lundi à 8 h.\nTa recommandation : go. Le DAF (directeur administratif et financier, ton sponsor) décide.",
      points: [
        "À quoi il sert : préparer la bascule (la mise en service) : critères de go, recommandation, retour arrière, plan heure par heure. Quand : les critères un mois avant ; le plan joué en répétition ; la page relue la veille.",
        "Sur le site : `+ Critère` : seuil et période, preuve, « Atteint ? » (Oui, Presque, Non). Puis les risques et leurs parades, le retour arrière, ta recommandation. Le plan : `+ Étape` : quand, qui, durée, contrôle, qui contrôle, si ça échoue.",
        "La règle : les critères se fixent avant, par celui qui décidera : un seuil, une période, une preuve. Le jour J, on compare chaque critère à sa preuve, sans le réécrire.",
        "Le piège : réécrire un critère pour qu'il passe. « Presque » : go sous conditions écrites (quoi, qui, pour quand, qui vérifie, et sinon), ou no-go. « Non » : no-go, ou le DAF décide en connaissant le risque.",
        "Le bon réflexe : le retour arrière se teste avant le go : c'est un critère. Son signal d'alerte (plus de 5 % de rejets lundi matin) appelle le DAF ; il ne lance pas seul le retour arrière."
      ],
      retenir: "Go / no-go : des critères fixés avant, comparés à leurs preuves sans les réécrire, un retour arrière testé, et ta recommandation. Le DAF décide."
    },
    {
      titre: "Bilan de fin et REX",
      exemple: "Mardi 13 juillet 2027, COPIL (comité de pilotage) de clôture.\nTon bilan : bascule le 14 juin, comme prévu ; budget sous la référence ; 1,7 % de rejets.\nMais l'intégrateur a fait 2 jours de plus, + 1 500 € : tu écris la cause, des flux EDI (échange de données informatisé) chiffrés en bloc.\nLe REX (retour d'expérience) du 30 juin donne 4 actions, chacune avec un nom.",
      points: [
        "À quoi il sert : clôturer : le bilan comparé au départ, ce qui se ferme, le REX sans coupable, le bilan de chaque fournisseur. Quand : le REX juste après l'hypercare (le support renforcé d'après la bascule) ; le bilan au dernier COPIL.",
        "Sur le site : 4 axes déjà écrits (date, budget, qualité, adoption). Puis « Ce qui se ferme » (`+ Point`), le REX (`+ Constat` : cause, on garde ou on change, action, qui), le bilan des fournisseurs (`+ Fait` : fait daté, sa réponse).",
        "La règle : chaque écart a sa cause, contre la référence à jour, changements acceptés compris. Un total sauvé par la réserve ne cache pas une ligne qui dépasse.",
        "Le piège : un REX qui cherche des coupables, ou que personne ne relit. Des faits et des causes ; 3 à 5 actions nommées, dans le modèle de projet de la DSI (direction des systèmes d'information), lues au prochain cadrage. Plus de 5 : une alerte.",
        "Le bon réflexe : ce qui a marché s'écrit aussi, avec sa raison ; sinon, le prochain projet le supprime. Le bilan de chaque fournisseur se partage avec lui : sa réponse à côté du fait."
      ],
      retenir: "Le bilan compare au départ, chaque écart avec sa cause. Le REX, sans coupable, donne 3 à 5 actions nommées, relues au prochain cadrage."
    }
  ]
};
