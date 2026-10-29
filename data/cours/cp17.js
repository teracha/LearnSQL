// Chef de projet SI — Fiche de cours du module cp17 « Communiquer : le bon message, les mots justes ».
// Ancien titre : « Communiquer selon le public ». Élargi à la demande de l'élève : les mots justes, à l'oral et à l'écrit
// (mail, compte rendu, Teams), pour annoncer une mauvaise nouvelle, prévenir et escalader, dire non, recadrer.
// Fond : pratiques reconnues, adaptées au terrain PME / ETI. PMBOK : gestion des communications et des parties prenantes
// (le bon message, au bon public, par le bon canal). PRINCE2 : rapport d'exception au niveau supérieur (faits, impact,
// options, recommandation). Structure « l'essentiel d'abord » (pyramide de Minto). Recadrer : « faits, impact, demande »
// (proche de la méthode DESC et du feedback SBI). La CNV (communication non violente) ajoute le ressenti
// (« je suis inquiet ») : ici, on garde surtout faits et impact, plus sûrs face à un prestataire ou un collègue.
// Les deux approches se défendent.
// Fil rouge : DEMAT 2027 (fiche fil rouge de docs/plan-chef-de-projet.md, qui fait foi). Connecteur au contrat le 1er mars 2027,
// déclencheur du plan B (portail web de la PA, dépôt en Factur-X) le 15 mars, recette du 16 mars à fin avril, pilote en mai,
// bascule en juin, marge légale juillet-août, émission obligatoire au 1er septembre 2027. Aucun montant d'amende.
// Frontières :
// - cp16 = QUI aller voir et QUAND monter. cp17 reprend ses phrases « À dire » sans les changer
//   (« Sans décision d'ici vendredi, je demanderai au DG d'arbitrer. Je préfère te le dire avant. »).
// - cp18 = le FOND : faut-il dire non, arbitrer entre deux demandes, gérer un conflit entre personnes. cp17 = la FORME.
// - cp26 = manager SON équipe (entretiens, feedback de manager). cp17 recadre des partenaires sans lien hiérarchique
//   (prestataire, utilisateur clé, collègue, commercial).
// Exemple réel de l'élève (section 4) : « je serais dans le regret d'escalader » (ton de menace) devient
// « Sans décision lundi 12 h, je demanderai au DG d'arbitrer. Je préfère te le dire avant. »
LEARNSQL.cours.cp17 = {
  intro: "Pendant ta démat fiscale ou ta migration Divalto, as-tu déjà envoyé un long mail qui n'a rien déclenché ? Ou écrit une phrase qui a braqué quelqu'un ? Ce module te donne les mots justes : un message par public, la décision d'abord, et des phrases prêtes pour les moments durs (mauvaise nouvelle, escalade, refus, recadrage).",
  sections: [
    {
      titre: "Un fait, trois messages : direction, métier, technique",
      exemple: "Ton projet Snowflake + Power BI : as-tu expliqué un retard de la même façon au directeur et aux développeurs ?\nDEMAT 2027, 16 mars : le connecteur de la plateforme agréée (PA) n'est pas livré. Tu lances le plan B : en juin, on bascule avec le portail de la PA, le temps que le connecteur arrive.\nAu DAF (direction) : « Juin tient, grâce au plan B. Coût : 20 minutes de plus par jour pour la compta, 6 semaines après la bascule. Rien à décider aujourd'hui. »\nÀ Sophie (métier) : « Dès juin, pendant 6 semaines, tu déposes les factures clients sur le portail. On te forme en mai, 1 h. »\nÀ l'intégrateur (technique) : « Il me faut l'export des factures au format Factur-X (un PDF qui contient aussi les données), testé sur 10 cas, pour le 22. »",
      points: [
        "Direction (DG, DAF, COPIL : comité de pilotage) : des euros, des dates, des risques, et la décision attendue. Pas de technique.",
        "Métier (compta, ADV : administration des ventes) : ce qui change pour eux, quand, combien de temps, et qui les aide. Leur manager le sait avant eux.",
        "Technique (intégrateur, PA) : précis et vérifiable. Quoi, combien, depuis quand, pour quand. Jamais « ça ne marche pas ».",
        "Mêmes faits, mêmes chiffres pour tous. On change l'angle, jamais la vérité.",
        "Avant de parler ou d'écrire, deux questions : qui m'écoute ? Que doit-il faire après ?"
      ],
      retenir: "Un même fait se dit en euros à la direction, en tâches au métier, en détails précis au technique."
    },
    {
      titre: "La structure : la décision d'abord",
      exemple: "Avant (mail au DAF) : « Pour faire suite à nos échanges de janvier… » 20 lignes d'historique. En bas : « Qu'en penses-tu ? »\nLe DAF lit la 1re ligne, puis passe au mail suivant.\nAprès :\n« Décision attendue d'ici vendredi : appliquer ou non les pénalités de retard de la PA.\nFaits : connecteur prévu au 1er mars, pas livré le 15. Plan B lancé.\nImpact : juin tient ; 20 minutes de plus par jour pour la compta.\nOptions : A. pénalités maintenant ; B. pénalités suspendues si livraison au 1er avril.\nJe recommande B : la PA a intérêt à livrer vite. »",
      points: [
        "L'ordre : la décision attendue et sa date, puis les faits, l'impact, les options, ta recommandation. On l'appelle « l'essentiel d'abord ».",
        "La 1re ligne doit suffire : un lecteur pressé ne lit qu'elle. Rien à décider ? Dis-le : « Pour info, rien à décider. »",
        "Faits = ce qui se vérifie : dates, chiffres. Pas d'adjectifs comme « petit » ou « catastrophique ».",
        "2 ou 3 options, chacune avec son coût. Puis ta recommandation, en une ligne, avec sa raison. C'est lui qui décide.",
        "À l'oral, même ordre. À dire : « J'ai besoin de ta décision sur les pénalités d'ici vendredi. En 2 minutes : … »"
      ],
      retenir: "La décision attendue et sa date en 1re ligne ; le reste sert à décider."
    },
    {
      titre: "Annoncer une mauvaise nouvelle",
      exemple: "Mardi, tu découvres que la recette a 2 semaines de retard, à cause des rejets EDI d'AquaBleu. La marge de recette ne suffit plus.\nTrop mou : « Petit retard, rien de grave, je gère. »\nTrop dur : « La recette est un échec, juin est perdu. »\nJuste (au DAF, le jour même, au téléphone) : « Mauvaise nouvelle : la recette a 2 semaines de retard, à cause des rejets AquaBleu. Juin est menacé, pas perdu. L'intégrateur corrige d'ici jeudi. Je te dis jeudi soir si juin tient. »\nPuis 5 lignes par mail, pour la trace.",
      points: [
        "Tôt : le jour même pour un risque légal ou un coût qui change. Le sponsor l'apprend de toi, jamais en séance ni dans un couloir. Déjà réglé, rien à décider ? Le prochain jour ouvré suffit.",
        "Nomme-la : « Mauvaise nouvelle : … ». Ni « petit souci » (tu minimises), ni « catastrophe » (tu affoles).",
        "Faits, impact, ce que tu fais déjà, ce que tu attends. Tu ne sais pas encore ? « Je ne sais pas. Je te réponds jeudi. »",
        "Pas de coupable : « le connecteur n'est pas livré », pas « la PA nous a lâchés ». Les responsabilités se traitent après, contrat en main.",
        "Ton erreur ? Dis-la une fois, puis la suite : « Mon erreur : j'ai oublié les avoirs clients. Je rattrape sur la marge de recette. » Celle d'un autre, qu'il t'apporte ? Merci d'abord, puis la solution."
      ],
      retenir: "Une mauvaise nouvelle se dit tôt, en faits, avec un plan : ni minimisée, ni dramatisée."
    },
    {
      titre: "Prévenir et escalader sans menacer",
      exemple: "Le DAF n'a pas tranché le renfort de la recette (un intérimaire, ou la bascule à mi-juillet) : demande courte le 5, date limite le 12, relance le 13. Sans décision, la bascule glisse vers août : la date légale est en jeu (module cp16).\nTu voulais lui écrire : « Je serais dans le regret d'escalader. » Ça sonne comme une menace, et ça ne dit pas quand.\nÀ dire : « Sans décision lundi 12 h, je demanderai au DG d'arbitrer. Je préfère te le dire avant. »\nChez le DG, pas « Le DAF ne répond pas » : c'est un reproche.\nÀ dire : « J'ai besoin d'une décision d'ici mercredi sur le renfort de la recette. Enjeu : l'émission obligatoire du 1er septembre 2027. Le DAF est prévenu. Deux options… Je recommande A. »",
      points: [
        "Escalader, ce n'est pas punir : tu demandes une décision que ton niveau ne peut pas prendre. Un désaccord ? Proposez d'aller voir l'arbitre ensemble.",
        "Prévenir = un fait daté : quand, et ce que tu feras. Pas de formule floue (« je serais dans le regret »), pas de reproche.",
        "Chez le DG : la décision attendue et sa date, l'enjeu, « le DAF est prévenu », les options, ta recommandation. Rien sur la personne.",
        "Par écrit : le DAF en copie, jamais en copie cachée. Ton DSI est informé avant.",
        "Avec un prestataire, même ton : le contrat parle, pas toi. À dire : « Il me faut une date ferme. Sans livraison le 15, je lance le plan B prévu au contrat. »"
      ],
      retenir: "On prévient avec une date et une action, sans menace ; on escalade avec une décision à prendre, sans accuser."
    },
    {
      titre: "Dire non avec les mots",
      exemple: "Le commercial : « Tu peux me faire un état des factures rejetées, par client ? » C'est du confort. L'équipe est pleine jusqu'à la bascule.\nTrop mou : « Je vais voir ce que je peux faire. » Il entend oui.\nTrop dur : « Non, hors périmètre. » Il entend : « Ton besoin ne compte pas. »\nJuste : « Pas avant la bascule : l'équipe est pleine. Je le note pour juillet. »",
      points: [
        "« Je vais voir » = un oui pour celui qui l'entend. Dis clairement : oui, non, ou pas maintenant.",
        "« Oui, et voici ce que ça coûte » : face à celui qui décide (le sponsor). À dire : « Possible : environ 10 jours, et la bascule à mi-juillet. Tu valides ? » Pas encore chiffré ? Le prix connu tout de suite, puis : « Je te chiffre les options d'ici jeudi. »",
        "« Pas maintenant : voici quand » : la demande est bonne, le moment non. Donne une date ou une autre voie (le support).",
        "« Non, parce que… » : contre la loi ou hors de ton rôle. Une raison, une solution. À dire : « Non : une facture émise ne se modifie pas. Sophie fait un avoir. »",
        "Faut-il dire non, et à qui donner la priorité ? C'est le fond : module cp18. Ici, la forme : non à la demande, jamais à la personne."
      ],
      retenir: "Un non clair, avec une raison et une suite, passe mieux qu'un « je vais voir »."
    },
    {
      titre: "Recadrer sans braquer",
      exemple: "Mardi et jeudi, le consultant de l'intégrateur a changé le paramétrage en recette sans prévenir. Julie a perdu une matinée de tests.\nTrop dur, en réponse à tous : « Encore une fois, c'est n'importe quoi. »\nTrop mou : « Pas de souci, mais si tu pouvais éventuellement prévenir… »\nJuste, en privé, au téléphone : « Mardi et jeudi, le paramétrage a changé sans annonce. Julie a perdu une matinée de tests. Peux-tu annoncer chaque changement la veille ? »\nPuis 2 lignes écrites, à lui seul : « Comme convenu : chaque changement annoncé la veille. »",
      points: [
        "Ici, tu recadres sans être le chef : prestataire, utilisateur clé, commercial. (Ton équipe à toi : module cp26.) En privé, à l'oral d'abord.",
        "Faits, impact, demande. Un fait = ce qu'une caméra aurait filmé (« mardi, 3 changements »). Pas un jugement (« tu es négligent »).",
        "Parle de l'acte, pas de la personne. Évite « toujours », « jamais », « encore ». Finis par une question : il a peut-être une raison.",
        "Puis une trace courte, sans reproche : « Comme convenu… ». Ça recommence ? Tu montes d'un niveau, en le prévenant (module cp16).",
        "En réunion, recadre le sujet, pas la personne, en une phrase. À dire : « Restons sur les faits : la cause, ce sont les rejets EDI. »"
      ],
      retenir: "On recadre en privé, avec des faits, un impact et une demande ; puis on l'écrit en deux lignes."
    },
    {
      titre: "Mail, compte rendu, Teams : le bon canal",
      exemple: "Avant : objet « Point DEMAT ». 30 lignes. 3 demandes mélangées. Le DAF en copie « pour info ».\nAprès (PV = procès-verbal) :\nObjet : « Pour signature avant jeudi 12 h : PV de recette fournisseurs »\n« Bonjour,\nIl me faut ton PV signé jeudi 12 h, pour lancer le pilote lundi.\nLe PV est joint ; tes 3 réserves sont en page 2.\nUn souci ? Appelle-moi. »\nÀ : la cheffe comptable. Copie : personne.",
      points: [
        "Objet = la demande + la date. Une demande par mail, 5 lignes, le détail en pièce jointe.",
        "« À » : ceux qui doivent agir. « Copie » : ceux qui doivent savoir. Pas de copie au chef pour mettre la pression : elle se lit comme une dénonciation.",
        "Compte rendu, sous 24 h : décisions, actions (qui, quoi, pour quand), points ouverts. Pas le récit de la réunion.",
        "Teams : questions rapides, infos courtes. Une décision, une mauvaise nouvelle, un recadrage : jamais sur Teams seulement.",
        "Le ton monte par écrit ? Tu appelles. Un accord pris à l'oral ou sur Teams ? Tu l'écris le jour même : « Comme convenu ce matin : … »"
      ],
      retenir: "L'écrit trace, l'oral apaise : on écrit les décisions, on parle des tensions."
    }
  ]
};
