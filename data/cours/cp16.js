// Chef de projet SI — Fiche de cours du module cp16 « Diriger sans autorité ».
// Fond : pratiques reconnues (PMBOK : gestion des parties prenantes et des ressources ; PRINCE2 : escalade par niveaux
// de tolérance ; « influence without authority » de terrain), adaptées au terrain PME / ETI.
// Fil rouge : DEMAT 2027 (fiche fil rouge de docs/plan-chef-de-projet.md, qui fait foi).
// Réglementaire (vérifié fin octobre 2026) : réception des factures électroniques obligatoire depuis
// le 1er septembre 2026 ; émission obligatoire pour les PME au 1er septembre 2027, via une plateforme agréée (PA).
// Calendrier : préparation des cas de recette en janvier-février, connecteur livré au 1er mars 2027 (contrat),
// recette du 16 mars à fin avril (6 semaines + 1 semaine de marge de recette), pilote en mai, bascule en juin.
// Règle unique pour monter d'un niveau (section 4) : le niveau actuel refuse ta 2e proposition chiffrée, recommence
// après que tu lui en as parlé, ou ne répond pas malgré une demande claire et une date limite.
// Exception : le sponsor qui dit non en connaissant le coût a décidé (on applique, pas de DG).
// L'enjeu fort (une date légale) n'est exigé que pour le niveau 4 (au-dessus du sponsor).
// Point faible de l'élève (bilan) : il choisit la plus grosse solution (DG, COPIL, tout décaler) au lieu d'agir à son niveau.
LEARNSQL.cours.cp16 = {
  intro: "Sur un projet, presque personne ne dépend de toi, mais tu as besoin de leur temps. Ce module te donne une méthode : la bonne personne, une demande chiffrée, une escalade à petits pas, des phrases prêtes à dire. Et savoir quand monter sans attendre.",
  sections: [
    {
      titre: "Partir de ton vécu : tu n'es le chef de personne",
      exemple: "Ta démat fiscale : environ 15 personnes, et aucune ne dépendait de toi.\nComment obtenais-tu leur temps ? Qui disait oui : elles, ou leur chef ?\nDEMAT 2027 : tu as besoin de Julie (comptable fournisseurs), de Sophie (comptable clients) et de Marc (ADV, l'administration des ventes) pour tester.\nIls ont déjà un plein temps. Leurs chefs : la cheffe comptable et le responsable ADV.\nLe DAF (directeur administratif et financier) est ton sponsor. Il est aussi le chef de la cheffe comptable.",
      points: [
        "Diriger sans autorité = obtenir l'aide de gens qui ne dépendent pas de toi : utilisateurs clés, autres services, prestataires.",
        "Utilisateur clé = une personne du métier qui connaît le travail réel. Elle décrit le besoin, teste (la recette), puis aide ses collègues.",
        "Leur temps appartient à leur manager. C'est lui qui fixe leurs priorités.",
        "Tes leviers : une demande claire, le coût expliqué, la confiance construite.",
        "Ton réflexe à corriger : la plus grosse solution. Le DG (directeur général), le COPIL (comité de pilotage), tout décaler. Commence à ton niveau : une semaine perdue se prend sur la marge de recette."
      ],
      retenir: "Sans autorité, ton pouvoir vient d'une demande claire et chiffrée, faite à la bonne personne."
    },
    {
      titre: "Négocier avec leur manager : ni seul avec eux, ni au-dessus",
      exemple: "Julie te dit : « Pas de souci, je viendrai aux tests. » Tu es content.\nLa semaine de clôture, sa cheffe lui donne d'autres urgences. Julie annule.\nSon « oui » ne protégeait rien : ce n'est pas elle qui décide de son temps.\nLa bonne voie : écouter Julie, puis caler les créneaux avec sa cheffe.",
      points: [
        "Avec la personne : tu comprends sa charge et ses semaines de pointe. Avec son manager : tu réserves le temps. C'est son accord qui protège les créneaux.",
        "Pas avec quelqu'un d'autre : ni le commercial, ni l'intégrateur, ni toi ne décidez du planning de Marc. Les demandes aux équipes passent par toi.",
        "Pas au-dessus en premier : aller au DAF ou au DG avant d'avoir parlé au manager le met contre toi. Tu perds un allié.",
        "Un prestataire, comme l'intégrateur ou la plateforme agréée (PA) ? Son « manager », c'est son chef de projet, puis son responsable de compte. Ton levier : le contrat.",
        "À dire (à Julie) : « Merci ! Je cale les créneaux avec ta cheffe, pour qu'ils soient protégés. »"
      ],
      retenir: "La personne pour comprendre, son manager pour décider, et jamais au-dessus en premier."
    },
    {
      titre: "Venir avec une proposition chiffrée et le coût de chaque option",
      exemple: "La cheffe comptable te dit : « Pas pendant la clôture du mois. »\nTu reviens avec : « Julie, mardi et jeudi de 9 h à 12 h, 4 semaines, à partir du 16 mars, hors semaine de clôture. »\n« Sinon : un intérimaire 2 semaines, environ 4 000 €. Ou la recette glisse de 3 semaines, et la bascule de juin aussi. »\nElle choisit les mardis et jeudis. Elle a vu le prix des autres options.",
      points: [
        "Proposition chiffrée = qui, quels jours, combien d'heures, combien de semaines. Jamais « un peu de temps, quand vous pourrez ».",
        "Donne 2 ou 3 options et leur coût : en délai, en argent, en risque. Le manager choisit en connaissant le prix.",
        "Ne parle jamais au nom du sponsor s'il n'a rien dit. « Le DAF exige… » se vérifie vite, et ton crédit tombe.",
        "Tu demandes du temps en COPIL ? Vois les managers concernés avant. Personne ne doit découvrir ta demande en séance.",
        "À dire : « J'ai besoin de Julie 2 matinées par semaine, 4 semaines. Quels jours t'arrangent ? »"
      ],
      retenir: "Une demande précise, avec le coût de chaque option, se négocie. Une demande vague se refuse."
    },
    {
      titre: "L'échelle d'escalade : un niveau à la fois",
      exemple: "Niveau 1 : Marc (ADV) manque 2 ateliers. Tu lui parles : il est noyé sous les commandes du printemps.\nNiveau 2 : il en manque un 3e. Tu le préviens, puis tu vois le responsable ADV avec une proposition chiffrée.\nNiveau 3 : le responsable ADV refuse 2 propositions. Tu le préviens, puis tu demandes au DAF de trancher.\nLe DAF dit non, en connaissant le coût ? C'est sa décision : tu appliques.\nNiveau 4 : le DAF ne répond pas, date limite dépassée, date légale en jeu. Tu le préviens, puis tu vas au DG.",
      points: [
        "1. La personne. 2. Son manager. 3. Le sponsor (le DAF). 4. Au-dessus du sponsor (le DG). Avant de monter, tu préviens celui que tu dépasses.",
        "Tu montes d'un niveau quand ce niveau refuse ta 2e proposition chiffrée, recommence après que tu lui en as parlé, ou ne répond pas malgré une demande claire et une date limite. Exception : le sponsor qui dit non en connaissant le coût a décidé (point suivant).",
        "Le sponsor dit non ? C'est une info sur ses priorités. Réponds avec 2 ou 3 options chiffrées. Il tranche en connaissant le coût : c'est une décision. Tu appliques, et tu notes le risque.",
        "Niveau 4 seulement si le sponsor ne répond pas : demande courte faite, date limite dépassée, enjeu fort (une date légale). Enjeu faible ? Va le voir 10 minutes.",
        "Avant le DG, tu préviens le sponsor et ton DSI. À dire (au sponsor) : « Sans décision d'ici vendredi, je demanderai au DG d'arbitrer. Je préfère te le dire avant. »"
      ],
      retenir: "On monte d'un niveau à la fois, en prévenant. Le sponsor qui tranche en connaissant le coût a décidé : on applique."
    },
    {
      titre: "Crédit, alliés, et ce qu'on ne fait pas",
      exemple: "Avant d'avoir besoin d'eux, tu rencontres la cheffe comptable et le responsable ADV : leurs contraintes, leurs pics.\nLe responsable ADV galère sur un export Divalto. Tu l'aides en 30 minutes.\nAu COPIL : « Grâce aux tests de Julie, 12 erreurs corrigées avant la bascule. » Sa cheffe est dans la salle.\nJulie, débordée, te demande : « Tu peux faire mes tests ? » Tu refuses : c'est à la compta de valider son métier.",
      points: [
        "Construire du crédit avant d'en avoir besoin : voir les managers tôt, tenir ses promesses (un atelier d'1 h finit à l'heure), rendre de petits services (30 minutes).",
        "Rendre visible : nomme la contribution des utilisateurs clés, devant leur manager. Ex. : « 12 erreurs trouvées par Julie avant la bascule. »",
        "Un souci avec une personne (tests incomplets, absences) ? Parle-lui d'abord, en direct, avec des faits précis, et aide-la.",
        "On recadre, calmement : l'intégrateur qui contourne, le commercial qui coupe la parole à la compta, celui qui décide du planning d'un autre.",
        "On ne fait pas : leurs tests, leurs règles métier, des heures en plus sans leur manager. À dire (à Julie) : « Je ne ferai pas tes tests. Je t'aide à préparer tes cas. »"
      ],
      retenir: "Ton crédit se gagne avant d'en avoir besoin, et se perd en faisant à leur place ou en passant au-dessus."
    },
    {
      titre: "L'excès inverse : tout absorber",
      exemple: "Le contrat fixe au 1er mars la livraison du connecteur Divalto de la PA. Son chef de projet rate cette date.\nTu lui en parles, il promet le 15. Le 16, rien : 2e date ratée.\nTu ne relances pas une 3e fois. Tu le préviens, puis tu appelles son responsable de compte, contrat en main.\nEt tu informes le DAF : c'est lui qui a signé le contrat. Le déclencheur du plan B (pas livré au 15 mars, module cp07) est atteint : tu le lances aussi.",
      points: [
        "Ne jamais monter est aussi une erreur. Relancer, attendre, absorber : le problème grossit en silence, et la date légale approche.",
        "Tu en as parlé, et ça recommence ? Tu montes d'un niveau. Ex. : le prestataire rate 2 fois une date du contrat → son responsable de compte, et tu informes le DAF.",
        "Un risque légal, ou une info qui change le coût d'une décision : le sponsor, le jour même. Pas d'attente du COPIL.",
        "Deux managers en désaccord, options chiffrées déjà posées, et la décision n'est pas à toi : le sponsor tranche (module cp18). Une 3e réunion ne changera rien.",
        "Décision par défaut (module cp04) : seulement pour un détail de ton projet, jamais pour le temps d'un autre service. À dire : « Sans remarque au 10, ce modèle de PV (procès-verbal) est retenu. »"
      ],
      retenir: "Après de vrais essais à ton niveau, monter vite n'est pas une faute : c'est ton travail."
    }
  ]
};
