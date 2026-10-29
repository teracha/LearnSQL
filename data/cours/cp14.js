// Chef de projet SI — Fiche de cours du module cp14 « Contracter ».
// Fond : pratiques de terrain des achats informatiques en PME / ETI. Niveau praticien, pas juriste.
// - Trois types de contrats : forfait (prix fixe pour un résultat défini ; le dérapage est pour le prestataire ;
//   un ajout ou un changement = avenant), régie (temps passé, au taux journalier, dans un plafond de jours ; le risque
//   est chez le client, qui pilote les jours), abonnement / SaaS (un service qui évolue pour tous : SLA, données, sortie).
// - Les pièces : devis, bon de commande, contrat, annexes, conditions générales (CG). Laquelle prime : la clause
//   d'ordre de priorité du contrat (à lire, pas à supposer).
// - Les clauses que le chef de projet relit et écrit (opérationnelles) : livrables, planning et obligations du client,
//   recette et PV (réserves ou refus), délai de validation (piège de la recette tacite), paiement lié au PV, pénalités
//   plafonnées, SLA mesurables et leurs exclusions, garantie, réversibilité, données, spécifique, durée et préavis.
//   Les clauses juridiques (responsabilité, droit applicable) : le DAF, avec un avocat si besoin. Le DAF signe.
// - RGPD : un prestataire qui traite des données personnelles pour l'entreprise est un sous-traitant ; le contrat
//   doit le prévoir. On reste général : faire vérifier par le DPO ou le référent RGPD.
// Fil rouge : DEMAT 2027 (fiche fil rouge de docs/plan-chef-de-projet.md, qui fait foi), ligne « Contrats (module cp14) ».
// PA = abonnement signé en novembre 2026 par le DAF : connecteur standard au 1er mars, pénalités de retard plafonnées,
// SLA, plan B par le portail (prévu au contrat), réversibilité des données. Intégrateur Divalto = régie : bon de commande
// en jours, au taux journalier, signé par le DAF ; des jours en plus = une nouvelle commande, signée avant de commencer.
// Le plan B part seul au déclencheur (connecteur pas livré au 15 mars) ; le 15 mars n'est pas une date du contrat.
// Aucun montant d'amende, ni de pénalité chiffrée.
// Taux journalier de l'intégrateur : environ 750 € (fiche).
// Faits ajoutés à la fiche (cohérents avec elle, à valider) : mise en service du connecteur à prix fixe (forfait) en plus
// de l'abonnement ; annexe SLA de la PA : 99,5 % par mois, prise en charge en 1 h, portail rétabli en 4 h (comme cp01-q13),
// de 8 h à 18 h les jours ouvrés ; clause d'ordre de priorité : le contrat et ses annexes avant les CG de la PA.
// Frontières :
// - cp13 = choisir le prestataire (consultation, grille). cp15 = le piloter après la signature (comités, suivi des SLA).
// - cp06 = choisir la démarche (ici, une phrase sur le lien démarche ↔ type de contrat).
// - cp10 = le circuit d'une demande de changement (ici, seulement l'avenant : comment le contrat change).
//   cp10 renvoie ici pour « qui paie une anomalie » : section 4 (forfait sans frais, régie en jours en général).
// - cp07 = transférer un risque par le contrat (la pénalité paie une partie, le retard reste). cp12 = suivre le budget.
// - cp24 = la conformité (RGPD en détail). cp19 = la recette (ici, seulement le PV et ses effets sur le contrat).
LEARNSQL.cours.cp14 = {
  intro: "Sur ta démat fiscale ou ta migration Divalto, qui avait lu le contrat du prestataire avant de signer ? Le jour d'un retard, que pouvais-tu exiger ? Ici : le type de contrat, les pièces, les clauses que tu relis, et l'avenant. Choisir le prestataire : module cp13. Le piloter : module cp15.",
  sections: [
    {
      titre: "Forfait, régie, abonnement : qui paie quand ça dérape ?",
      exemple: "Ta migration Divalto : forfait ou régie ? Qui a payé les jours en trop ?\nDEMAT 2027. La PA (plateforme agréée) : un abonnement, payé chaque mois. La mise en service de son connecteur : un prix fixe, un forfait.\nL'intégrateur Divalto : en régie. Une commande en jours, au taux journalier (le prix d'une journée, environ 750 €).\n3 jours de plus ? En régie, l'entreprise paie. Au forfait, ce serait pour lui.",
      points: [
        "Forfait : un prix fixe pour un résultat défini (livrables, date). Plus de jours ? C'est pour lui : le risque de dérapage est chez le prestataire.",
        "Mais il couvre ce qui est écrit, pas « tout ». Un ajout = un avenant (un écrit qui modifie le contrat), souvent payant.",
        "Régie : tu paies le temps passé. La commande fixe la mission et un plafond de jours. Le risque est chez toi : tu suis les jours (module cp12) et le détail facturé.",
        "Abonnement, ou SaaS (Software as a Service : un logiciel loué en ligne) : un service qui évolue pour tous. Demande un préavis et un espace de test, pas un gel. Tes leviers : le SLA (service level agreement : le niveau de service promis), tes données, la sortie.",
        "Besoin clair et stable : forfait. Besoin découvert par itérations (les écrans de suivi de la compta) : régie, dans une enveloppe de jours. Un forfait sur un besoin flou finit en avenants (démarche : module cp06)."
      ],
      retenir: "Forfait : le dérapage est pour le prestataire, l'ajout est un avenant. Régie : il est pour toi, tu pilotes les jours. Abonnement : tu achètes un service."
    },
    {
      titre: "Les pièces : qui signe, et laquelle prime",
      exemple: "Novembre 2026. Sur le bureau du DAF (directeur administratif et financier, ton sponsor) : le devis de la PA, le contrat, ses conditions générales (CG), ses annexes (périmètre, planning, SLA…).\nLe contrat : « connecteur livré le 1er mars ». Les CG : « délais indicatifs ».\nQui gagne ? La clause d'ordre de priorité du contrat : ici, le contrat et ses annexes passent avant les CG. Le 1er mars engage la PA.",
      points: [
        "Devis = l'offre du prestataire. Bon de commande = l'accord écrit de l'entreprise. Contrat = les règles. Annexes = le détail. CG = son texte standard.",
        "Les pièces se contredisent souvent. La clause d'ordre de priorité dit laquelle prime : lis-la, ne la suppose pas. Elle manque ? Fais-la écrire avant la signature.",
        "Ce qui n'est dans aucune pièce signée ne s'exige pas. Une promesse orale ? Fais-la écrire en annexe : un compte rendu ne suffit pas.",
        "Qui signe : le DAF. Pas toi, même pressé, même s'il est absent : il peut signer à distance.",
        "Pas de démarrage sans commande signée : elle fixe le périmètre, le prix et les responsabilités. Régie : des jours en plus = une nouvelle commande, signée avant. Déjà faits sans commande ? Tu recadres, le DAF décide."
      ],
      retenir: "Toutes les pièces signées font le contrat ; la clause d'ordre de priorité les départage. Le DAF signe, avant le premier jour de travail."
    },
    {
      titre: "Ce qui est livré, quand, et comment tu l'acceptes",
      exemple: "Projet de contrat de la PA.\nPérimètre : « connecteur standard ». Avec les avoirs ? Les 3 sites ? Tu fais écrire la liste.\nPlanning : « 3 mois après la signature ». La signature glisse, la date aussi : tu fais écrire « 1er mars ».\nRecette (tests de validation par le métier) : « sans réserve 5 jours après la livraison, accepté ». Ta recette dure 6 semaines. Piège.\nPaiement : solde à la livraison. Tu proposes : au PV (procès-verbal) de recette.",
      points: [
        "Livrables : vérifiables, documentation comprise. Un seul consultant connaît ton paramétrage ? Une passation écrite s'il change. Un livrable incomplet n'est pas livré : écris-le le jour même.",
        "Planning : des dates fixes, pas « indicatives ». Lis aussi tes obligations (données à fournir) : sont-elles tenables ? Si ton retard décale sa date, ses pénalités ne jouent pas, en général : une nouvelle date s'écrit.",
        "PV de recette : le livrable est accepté. Avec réserves : accepté, défauts mineurs corrigés à une date écrite. Anomalie bloquante : pas de PV, un refus écrit.",
        "Délai de validation : le temps pour signer ou refuser. Piège : la recette tacite (« sans réponse, accepté »). Le délai court après ta recette. Il expire ? Tes réserves écrites partent avant.",
        "Paiement : lie le solde au PV (le travail accepté), pas à la livraison (le travail remis). Tout payé, ton levier a disparu."
      ],
      retenir: "Tu relis ce qui est livré, quand, comment tu l'acceptes et quand tu paies : le solde suit le PV."
    },
    {
      titre: "Pénalités, SLA, garantie : ce que tu peux exiger",
      exemple: "Contrat signé de la PA : pénalités par jour de retard après le 1er mars, plafonnées (un maximum écrit). Le 15 mars n'est pas dans le contrat : c'est ton déclencheur du plan B (module cp07).\nAnnexe SLA : disponibilité 99,5 % par mois (environ 3 h 30 de panne permise), prise en charge en 1 h, portail rétabli en 4 h, de 8 h à 18 h les jours ouvrés.",
      points: [
        "Pénalités de retard : elles comptent depuis la date du contrat, jusqu'au plafond (c'est courant). Elles paient une partie du coût, pas ta date (module cp07).",
        "Ce qui protège ta date : le plan B, écrit au contrat avec son prix, pour qu'il parte seul au déclencheur.",
        "Appliquer, réduire ou échanger des pénalités : le DAF décide, il a signé. Toi, tu apportes les faits : date du contrat, date réelle, calcul, plafond.",
        "Un SLA s'exige s'il se mesure : chiffre, période, heures, qui mesure. « Meilleurs efforts » ne s'exige pas. Lis les exclusions : pas de maintenance pendant ta clôture.",
        "Anomalie (non conforme à l'écrit) : au forfait, corrigée sans frais, avant le PV et pendant la garantie (durée écrite). En régie, en général, pas de garantie : elle se paie en jours, sauf clause dans la commande."
      ],
      retenir: "Une pénalité compte depuis la date du contrat ; le DAF décide de l'appliquer. Un SLA s'exige s'il se mesure. Ta date, le plan B la protège."
    },
    {
      titre: "Tes données, ton spécifique, et la sortie",
      exemple: "Des années de factures seront chez la PA. Si tu en changes, que récupères-tu ?\nProjet de clause : « export au format de la PA ». Illisible ailleurs.\nTu fais écrire : les factures et leurs statuts (reçue, rejetée, payée…), en format standard (comme Factur-X, un PDF qui contient aussi les données), sous 30 jours, prix connu, avec une aide.\nPuis tu la testes en recette : un export d'un mois, ouvert ailleurs.",
      points: [
        "Tes données t'appartiennent : le contrat le dit, et limite leur usage au service. Les reprendre : la réversibilité (quoi, format, délai, coût, aide), testée avant d'en avoir besoin.",
        "RGPD (règlement général sur la protection des données) : un prestataire qui traite des données personnelles pour toi (noms, e-mails, entrepreneurs individuels) est un sous-traitant. Le contrat doit le prévoir : fais vérifier par le DPO (délégué à la protection des données) ou le référent RGPD.",
        "Développement spécifique (un écran Divalto fait pour toi) : en général, payer ne suffit pas, les droits restent au prestataire. Fais écrire que tu peux l'utiliser, le modifier, le faire maintenir par un autre, sources livrées.",
        "Durée : souvent reconduite seule, sauf résiliation avant un préavis. Note la date, avec une alerte. Avant, le DAF choisit (rester, renégocier, changer), coût de sortie compris.",
        "Changer de prestataire est un projet : le nouveau signé, connecté et testé avant la fin de l'ancien. Jamais de trou : la facture électronique est obligatoire."
      ],
      retenir: "Avant de signer, tu sais comment tu sors, avec tes données. Et tu le testes avant d'en avoir besoin."
    },
    {
      titre: "Ta part, celle du DAF, et l'avenant",
      exemple: "Le DAF t'envoie le contrat de la PA : « Relis ce qui te concerne. »\nToi : livrables, planning, recette, SLA, réversibilité, avec un texte proposé par point. La cheffe comptable et le responsable ADV (administration des ventes), qui signeront le PV, relisent l'annexe recette.\nLe DAF, avec un avocat si besoin : la responsabilité (qui paie un dommage, jusqu'à combien) et le droit applicable (quelle loi, quel tribunal).",
      points: [
        "Toi : les clauses opérationnelles, relues AVANT la signature. Après, il faut un avenant, et le prestataire a moins de raisons d'accepter.",
        "Le DAF : le prix, la signature, et les clauses juridiques (responsabilité, droit applicable), avec un avocat si besoin. Un problème là ? Tu le lui signales, tu ne réécris pas.",
        "Avenant = un écrit signé des deux côtés, qui change le contrat (périmètre, prix, date, SLA). Un mail du prestataire, un accord oral, une décision du COPIL (comité de pilotage) ne le remplacent pas.",
        "L'avenant, avec son prix, est signé avant le travail. Son circuit (chiffrer, faire décider, tracer) : module cp10.",
        "Après la signature : une fiche d'une page pour l'équipe (dates, livrables, recette, SLA, pénalités, préavis, contacts). Piloter le prestataire : module cp15."
      ],
      retenir: "Tu écris les clauses opérationnelles ; le DAF signe et porte le juridique. Un contrat ne change que par un avenant signé."
    }
  ]
};
