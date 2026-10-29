// Chef de projet SI — Fiche de cours du module cp10 « Les demandes de changement ».
// Fond : pratiques reconnues, adaptées au terrain PME / ETI.
// - PMBOK (guide américain) : maîtrise intégrée des modifications. Une demande écrite ; son impact sur tout le projet
//   (délai, coût, risque, qualité, autres lots, recette) ; une décision par l'instance prévue (ici le DAF ou le COPIL) ;
//   un journal des changements (ici le « registre des changements ») ; puis la mise à jour des références (planning,
//   budget, périmètre, tests). Le PMBOK met en garde contre la dérive du périmètre (« scope creep ») et l'ajout non
//   demandé (« gold plating »). Nuance : il range aussi la réparation d'un défaut parmi les demandes de modification ;
//   sur le terrain et au contrat, on distingue l'anomalie (corrigée dans le cadre du contrat) du changement (besoin nouveau).
// - PRINCE2 (méthode britannique) : « demande de changement » (besoin nouveau) ≠ « hors spécification » (non conforme à
//   l'écrit : ici, une anomalie). Le comité peut confier les petits changements à une « autorité de changement », avec un
//   « budget de changement » : il paie des changements autorisés, pas un dépassement (tolérance) ni un risque (budget de risque).
// - Agile : le Manifeste agile accueille le changement, même tard ; une idée va au backlog, le PO la classe ; l'itération en
//   cours ne bouge pas. Dans une enveloppe fixe, ajouter, c'est retirer autre chose.
// - Terrain : gel des changements avant une mise en service (seuls passent le bloquant et le légal) ; un changement urgent
//   suit un circuit court, mais tracé ; un correctif urgent est testé avant la production (non-régression).
// Fil rouge : DEMAT 2027 (fiche fil rouge de docs/plan-chef-de-projet.md, qui fait foi). Démarche hybride (cp06) : le cœur
// (flux légaux, connecteur standard de la PA, bascule) est cadré ; les écrans et états de suivi Divalto de la compta se font
// par itérations de 2 semaines, dans une enveloppe de 10 jours d'intégrateur fixée par le DAF ; PO = la cheffe comptable.
// Sur le cœur : périmètre, budget, date validée ou contrat touchés = demande de changement (écrite, chiffrée, décidée par le
// DAF ou le COPIL, tracée au registre des changements). Dans ta délégation (cp18) : tu décides et tu informes.
// Gel dès le début du pilote (mai) : seuls passent les anomalies bloquantes et les obligations légales ; le lever = décision
// du DAF, en connaissant le risque. Intégrateur en régie : des jours en plus = une nouvelle commande signée par le DAF avant
// de commencer ; PA : avenant au contrat (cp14). Plan B : préparé à froid, il part seul au déclencheur (15 mars, date qui
// n'est pas au contrat) : pas de demande de changement. Report de la bascule à mi-juillet = décision du DAF. Aucun montant d'amende.
// Précisions ajoutées (hors fiche) : pas de budget de changement délégué sur le cœur (chaque jour d'intégrateur en plus passe
// par le DAF) ; le gel dure jusqu'après la bascule et vaut aussi pour la partie agile ; environ 750 € le jour d'intégrateur
// (comme cp18 : 12 jours ≈ 9 000 €).
// Frontières :
// - cp06 = CHOISIR la démarche (prédictif, agile, hybride) et la tenir. cp10 = le CIRCUIT d'une demande de changement.
// - cp14 = CONTRACTER (forfait, régie, abonnement, pièces, avenant, signature) : ici, une phrase sur l'avenant, puis renvoi.
// - cp18 = le fond d'une demande (oui, non, « oui, mais », « pas maintenant ») ; cp10 = ce qui se passe ensuite, pas à pas.
// - cp04 = la note de cadrage et la tolérance ; cp07 = risques et plan B ; cp16 = escalade ; cp17 = les mots.
LEARNSQL.cours.cp10 = {
  intro: "Sur ta migration Divalto ou ton projet Snowflake + Power BI, une « petite » demande a-t-elle coûté des semaines, sans que personne l'ait décidée ? Ici, une demande de changement pas à pas : la trier, mesurer son impact, la faire décider, la tracer, puis commencer. Faut-il dire oui ? C'est le module cp18.",
  sections: [
    {
      titre: "Trier : anomalie, changement, ou rien à lancer",
      exemple: "Ta démat fiscale : un « bug » de recette était-il un vrai bug, ou une nouvelle envie ?\nDEMAT 2027, en recette (les tests de validation par le métier) :\n1. Les factures partent avec la date du jour ; la spécification validée dit « date de facture ». → Anomalie.\n2. Le responsable ADV (administration des ventes) veut la référence chantier sur les factures. Rien n'est écrit. → Changement.\n3. Julie, comptable fournisseurs, veut 3 cas de test de plus, dans ses créneaux. → Ta délégation.",
      points: [
        "Anomalie : ce qui est livré n'est pas conforme à l'écrit (contrat, spécification validée, cahier de recette). Pas de demande de changement. Qui paie la correction ? Au forfait (prix fixe), le prestataire ; en régie (au temps passé), en général l'entreprise, en jours, sur une commande signée par le DAF (module cp14).",
        "Changement : un besoin nouveau, une exigence nouvelle, un goût. Retirer quelque chose aussi. PRINCE2 (la méthode britannique) fait la même différence : « hors spécification » ou « demande de changement ».",
        "Un texte qui se lit de deux façons ? Vous le relisez ensemble, avec le prestataire (module cp18).",
        "Le cœur du projet : flux légaux, connecteur, bascule. Là, le circuit démarre dès qu'une demande touche le périmètre, le budget, une date validée ou un contrat.",
        "Pas de circuit dans ta délégation : tu décides, tu informes. Ni pour ce qui est décidé d'avance : le plan B (le portail de la plateforme agréée, la PA) part seul. Illégal ? Non, sans chiffrer."
      ],
      retenir: "Non conforme à l'écrit : une anomalie, corrigée dans le cadre du contrat. Besoin nouveau : un changement."
    },
    {
      titre: "Avant la décision : écrire, mesurer l'impact, poser les options",
      exemple: "2 février. Le responsable ADV : « Il faut la référence chantier sur nos factures. Nos clients pisciniers la réclament. »\nTu l'écris au registre des changements, n° 7 : qui, quoi, pourquoi (des litiges chez 3 clients), pour quand (la bascule de juin, la mise en service).\nImpact, vu avec l'intégrateur et Sophie (comptable clients) : 4 jours d'intégrateur (environ 3 000 €), 15 tests à refaire, un risque sur les flux EDI (échange de données informatisé).\nOptions : A. ne rien changer (les litiges continuent). B. maintenant. C. en juillet. Ta recommandation : B.",
      points: [
        "Écrire : qui demande, quoi, pourquoi, pour quand. Tout le monde peut demander, de l'assistant au DAF (directeur administratif et financier, ton sponsor). Orale ? Tu l'écris, et tu la fais relire.",
        "Mesurer l'impact sur tout le projet : délai, coût, risque, qualité, autres lots, recette, temps des autres services (vu avec leur manager). Le PMBOK (le guide américain) le demande aussi.",
        "Un devis n'est pas une analyse d'impact : il donne les jours du prestataire, pas les tests à refaire, ni le temps des métiers, ni le risque.",
        "Tests à refaire : le nouveau, et la non-régression (vérifier que ce qui marchait marche encore). Pas tout, ni rien.",
        "2 ou 3 options, toujours avec « ne rien changer » et son prix, souvent avec « plus tard ». Puis ta recommandation, et une date limite."
      ],
      retenir: "Avant de décider : une demande écrite, son impact sur tout le projet, et des options, dont « ne rien changer »."
    },
    {
      titre: "Décider, tracer, signer, puis seulement commencer",
      exemple: "9 février, COPIL (comité de pilotage) : le DAF choisit B. Le soir, au registre : « N° 7 : acceptée par le DAF le 9/02. »\nTu mets à jour le planning et le budget ; le cahier de recette, avant les tests. Pas la note de cadrage : le périmètre ne bouge pas.\nLe 10, le DAF signe la commande des 4 jours. L'intégrateur commence le 11, pas avant. Puis tu l'annonces à l'ADV, à la compta, à l'intégrateur.",
      points: [
        "Qui décide ? Toi, dans ta délégation : sans coût, dans ta tolérance de ± 2 semaines par jalon (module cp04). Au-delà : le DAF ou le COPIL. Le temps d'un autre service : son manager.",
        "PRINCE2 : les petits changements peuvent aller à une « autorité de changement », avec un « budget de changement », jamais pour payer un retard. Sur le cœur de DEMAT : aucun. Chaque jour en plus passe par le DAF.",
        "Le sponsor décide en connaissant le prix, même pour sa propre demande. Une fois tranché, on applique. Une échéance, mais rien ne presse ? Les demandes se regroupent pour le COPIL.",
        "Le registre garde tout : qui demande, quoi, impact, décision, qui l'a prise, quand. Un refus aussi, dit au demandeur avec sa raison. Un fait nouveau rouvre la demande.",
        "Prestataire touché : une nouvelle commande pour l'intégrateur (en régie), ou un avenant pour la PA (l'écrit qui modifie son contrat). Le DAF signe AVANT de commencer (module cp14)."
      ],
      retenir: "La bonne autorité décide, en connaissant le prix. On trace, on signe : puis seulement, on commence. Le planning et les tests se mettent à jour, sans bloquer le travail."
    },
    {
      titre: "La dérive par petits pas",
      exemple: "Ton projet Snowflake + Power BI : un indicateur de plus ici, un filtre là. 1 jour chacun.\nAu bout de 3 mois : 15 jours de plus, et la livraison a glissé d'un mois. Qui l'avait décidé ? Personne.\nSur DEMAT, le registre montre ce total dès la 3e demande.",
      points: [
        "Dix petits oui hors de ta délégation font une grosse décision, que personne n'a prise. C'est la dérive du périmètre.",
        "Le registre fait le total. Au COPIL, tu montres les demandes à décider, et le cumul déjà accepté : jours, euros, dates.",
        "Couper une demande en deux pour rester sous un seuil, c'est contourner la règle. Un besoin = une demande, chiffrée en entier.",
        "« Je vous l'offre » : en régie, chaque jour est facturé. Un ajout fait sans décision (offert, ou demandé en direct au prestataire) doit être testé, et passe par le circuit.",
        "« On le prend sur les jours déjà commandés » : ils étaient prévus pour autre chose. Le trou revient plus tard, en commande de plus."
      ],
      retenir: "La dérive, ce sont de petits oui jamais décidés. Le registre en fait le total, avant qu'il soit trop tard."
    },
    {
      titre: "Urgence et gel des changements",
      exemple: "Mardi 6 avril. Un client EDI de la grande distribution exige un nouveau code dans ses factures dès juin : 2 jours d'intégrateur. Le COPIL est dans 3 semaines.\nCircuit court : l'impact le jour même, la décision du DAF au téléphone, une ligne au registre le soir, la commande signée vendredi.\nMai : le pilote démarre, et le gel avec lui. Le commercial veut un tri de plus dans un état : « 2 heures. » Noté, pour après la bascule.",
      points: [
        "Exigé avant une date proche ? Au circuit, vite. Utile, sans échéance ? « Pas maintenant », avec une date (module cp18).",
        "Urgent ne veut pas dire sans circuit : l'impact en quelques heures, la décision le jour même, la trace écrite, la commande signée avant de commencer.",
        "Le gel va du pilote (mai) à l'après-bascule. Seules passent les corrections d'anomalies bloquantes et les obligations légales : testées avant la production, et tracées, même pressées.",
        "Le reste attend, écrit, avec une date : une amélioration, une anomalie non bloquante. L'appeler « bloquante » ne la fait pas passer.",
        "Lever le gel pour autre chose : c'est la décision du DAF, en connaissant le risque. Même quand c'est lui qui demande."
      ],
      retenir: "Urgent : un circuit court, jamais pas de circuit. Pendant le gel : le bloquant et le légal, seulement."
    },
    {
      titre: "La partie agile : le backlog et l'enveloppe",
      exemple: "DEMAT est hybride (module cp06). À côté du cœur, les écrans et états de suivi Divalto de la compta se font par itérations de 2 semaines.\nEnveloppe : 10 jours d'intégrateur, fixée par le DAF.\nSophie a une idée d'état : elle va au backlog (la liste des idées). La cheffe comptable, PO (product owner : celle qui classe le backlog), la place à la prochaine itération.",
      points: [
        "Ici, le changement est attendu : le Manifeste agile l'accueille, même tard. Une idée nouvelle va au backlog, sans demande de changement.",
        "La PO la classe, dans l'enveloppe : ajouter, c'est souvent retirer autre chose. Personne ne classe à sa place.",
        "L'itération en cours ne bouge pas : une idée qui arrive en route attend la suivante. Pas de demande directe au consultant.",
        "Sortir de l'enveloppe (des jours en plus) = une demande de changement au DAF. Toucher au cœur (flux légaux, connecteur, envoi des factures) aussi, même si la PO est d'accord.",
        "Pendant le gel, la partie agile attend aussi : les idées restent au backlog jusqu'après la bascule."
      ],
      retenir: "Partie agile : le backlog, classé par la PO, dans l'enveloppe. En sortir, ou toucher au cœur : demande de changement."
    }
  ]
};
