// Finance et dématérialisation — Fiche de cours du module fd01 « Le P2P et la dématérialisation fiscale ».
// Cours seul, sans QCM. Demande de l'élève : « express », mais qui résume tout ; achats ET ventes, plus l'e-reporting.
// Fond :
// - P2P (Procure-to-Pay) et O2C (Order-to-Cash) : pratiques reconnues (pièces, rapprochement à 2 ou 3 voies, tolérance,
//   bon à payer, séparation des tâches, lettrage ; comptes du plan comptable général 401, 408, 411 et 70).
//   Délais de paiement : article L441-10 du Code de commerce. Divalto : cours dv01 et dv02 du site, et la base Divalto.
// - La réforme : sites officiels, vérifiés le 26/11/2026. Ils ne sont pas lisibles directement depuis la session : lus
//   par extraits, avec la recherche web limitée aux sites officiels. Sources :
//   · impots.gouv.fr, « Je découvre la facturation électronique » (objectifs, obligations) :
//     https://www.impots.gouv.fr/professionnel/je-decouvre-la-facturation-electronique
//   · impots.gouv.fr, « Foire aux questions : j'approfondis la facturation électronique » (calendrier, taille, critères) :
//     https://www.impots.gouv.fr/foire-aux-questions-japprofondis-la-facturation-electronique
//   · impots.gouv.fr, fiche 2 « Mon entreprise sera-t-elle obligée de facturer électroniquement ? » (taille par SIREN) :
//     https://www.impots.gouv.fr/sites/default/files/media/1_metier/2_professionnel/EV/2_gestion/290_facturation_electronique/fiche-2_mon-entreprise-sera-t-elle-obligee-de-facturer-electroniquement.pdf
//   · impots.gouv.fr, « Guide pratique de démarrage au 1er septembre 2026 » (refus, rejet, sanctions, tolérance) :
//     https://www.impots.gouv.fr/sites/default/files/media/1_metier/2_professionnel/EV/2_gestion/290_facturation_electronique/guide_pratique_facturation_electronique.pdf
//   · impots.gouv.fr, fiches de la réforme : « L'émission de factures électroniques » (formats, 4 statuts obligatoires),
//     « La transmission des données de transactions », « La transmission des données de paiement », « Les plateformes
//     agréées » (immatriculation pour 3 ans, solution compatible, conversion de format par la PA) :
//     https://www.impots.gouv.fr/sites/default/files/media/1_metier/2_professionnel/EV/2_gestion/290_facturation_electronique/fiches_reforme/fiche-e-invoicing.pdf
//     https://www.impots.gouv.fr/sites/default/files/media/1_metier/2_professionnel/EV/2_gestion/290_facturation_electronique/fiches_reforme/fiche-e-reporting_transactions.pdf
//     https://www.impots.gouv.fr/sites/default/files/media/1_metier/2_professionnel/EV/2_gestion/290_facturation_electronique/fiches_reforme/fiche-e-reporting_paiements.pdf
//     https://www.impots.gouv.fr/sites/default/files/media/1_metier/2_professionnel/EV/2_gestion/290_facturation_electronique/fiches_reforme/fiche-pdp.pdf
//   · impots.gouv.fr, « Je consulte la liste des plateformes agréées » :
//     https://www.impots.gouv.fr/je-consulte-la-liste-des-plateformes-agreees
//   · impots.gouv.fr, « Le régime simplifié d'imposition à la TVA est supprimé à compter du 1er janvier 2027 » :
//     https://www.impots.gouv.fr/actualite/le-regime-simplifie-dimposition-la-tva-est-supprime-compter-du-1er-janvier-2027
//   · impots.gouv.fr, « Chorus Pro restera la plateforme de référence pour la facturation électronique du secteur public » :
//     https://www.impots.gouv.fr/actualite/chorus-pro-restera-la-plateforme-de-reference-pour-la-facturation-electronique-du-secteur
//   · impots.gouv.fr, norme AFNOR XP Z12-012 de mai 2025 (formats et profils ; le profil MINIMUM ne suffit pas) :
//     https://www.impots.gouv.fr/sites/default/files/media/1_metier/2_professionnel/EV/2_gestion/290_facturation_electronique/specification_externes_b2b/afnor/norme-afnor-factures.pdf
//   · BOFiP BOI-TVA-DECLA-20-30-50-30 du 30/09/2026 (rythme et délai de l'e-reporting) :
//     https://bofip.impots.gouv.fr/bofip/13900-PGP.html/identifiant=BOI-TVA-DECLA-20-30-50-30-20260930
//   · BOFiP BOI-TVA-DECLA-20-30-60 du 30/09/2026 (données de paiement, statut « Encaissée », 24 heures conseillées) :
//     https://bofip.impots.gouv.fr/bofip/13901-PGP.html/identifiant=BOI-TVA-DECLA-20-30-60-20260930
//   · BOFiP BOI-CF-COM-10-10-30 du 03/09/2025 (6 ans au format d'origine, article L102 B du LPF ; 10 ans, Code de
//     commerce) : https://bofip.impots.gouv.fr/bofip/645-PGP.html/identifiant=BOI-CF-COM-10-10-30-20250903
//   · economie.gouv.fr, « Mentions obligatoires d'une facture : tout savoir » (les 4 nouvelles mentions ; leur date :
//     2026 pour les grandes entreprises et les ETI, 2027 pour les PME et les micro-entreprises) :
//     https://www.economie.gouv.fr/entreprises/gerer-son-entreprise-au-quotidien/gerer-sa-comptabilite-et-ses-demarches/mentions-obligatoires-dune-facture-tout-savoir
//   · economie.gouv.fr, « Qu'est-ce que l'annuaire de la facturation électronique ? » :
//     https://www.economie.gouv.fr/entreprises/gerer-son-entreprise-au-quotidien/gerer-sa-comptabilite-et-ses-demarches/quest-ce-que-lannuaire-de-la-facturation-electronique
//   · aife.economie.gouv.fr, « Facturation électronique interentreprises » (PPF recentré sur l'annuaire et la
//     concentration des données : annonce d'octobre 2024, loi de finances pour 2025) :
//     https://aife.economie.gouv.fr/nos-applications/facturation-electronique-b2b/
//   · economie.gouv.fr, « Facturation électronique entre entreprises : coup d'envoi de la réforme », et
//     presse.economie.gouv.fr, « Le premier comité dresse le bilan du déploiement et engage la préparation de 2027 »
//     (tolérance annoncée le 11 juillet 2026 : pas de sanction au démarrage pour une entreprise de bonne foi en
//     difficulté ; comité du 8 octobre 2026 : aucune sanction avant la fin de 2026 ; ni report, ni suspension ; rien
//     d'annoncé pour 2027 ; annonce de juillet : https://presse.economie.gouv.fr/?p=181381) :
//     https://www.economie.gouv.fr/actualites/facturation-electronique-entre-entreprises-coup-denvoi-de-la-reforme
//     https://presse.economie.gouv.fr/facturation-electronique-le-premier-comite-dresse-le-bilan-du-deploiement-et-engage-la-preparation-de-2027/
//   · economie.gouv.fr (DGCCRF), « Délais de paiement : les règles à connaître » :
//     https://www.economie.gouv.fr/dgccrf/les-fiches-pratiques/delais-de-paiement-les-regles-connaitre
//   · Légifrance : article 1737 du CGI, section « Infractions aux règles de facturation » (modifié par la loi du
//     19 février 2026) : https://www.legifrance.gouv.fr/codes/id/LEGISCTA000006163056 ; article L441-10 du Code de
//     commerce : https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000038414392 ; décret n° 2022-1299 du
//     7 octobre 2022, article 3 (date des nouvelles mentions selon la taille) :
//     https://www.legifrance.gouv.fr/loda/id/JORFTEXT000046383394
// - Divalto 10.13 (base documentaire du dépôt Divalto_10, lue en lecture seule) :
//   · « Cadre législatif et choix éditoriaux » : https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704714461/Cadre+l+gislatif+et+choix+ditoriaux
//   · « Principes et paramétrages » (Factur-X, support PDF, matrice des supports, schéma commercial, profils) :
//     https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704714513/Principes+et+param+trages
//   · « Factur-X, pourquoi, pour qui et comment ? » : https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11910905867/Factur-X+pourquoi+pour+qui+et+comment
//   · « La gestion du E-reporting (réforme de la Facturation électronique) 10.12 » :
//     https://divalto.atlassian.net/wiki/spaces/UDI113/pages/12077924379/La+gestion+du+E-reporting+r+forme+de+la+Facturation+lectronique+10.12
//     et sa version de l'espace PAI : https://divalto.atlassian.net/wiki/spaces/PAI/pages/11530338339/La+gestion+du+E-reporting+r+forme+de+la+Facturation+Electronique+RFE
//   · « Divalto ERP Gateway » et « Présentation Divalto ERP Gateway » :
//     https://divalto.atlassian.net/wiki/spaces/PAI/pages/12610306049/Divalto+ERP+Gateway
//     https://divalto.atlassian.net/wiki/spaces/PAI/pages/13039173633/Pr+sentation+Divalto+ERP+Gateway
//   · « Facturer les entités publiques » : https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704714334/Facturer+les+entit+s+publiques
//   · « Paramétrer le routage des factures vers la Plateforme agréée (PA) (V10.12) » :
//     https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704715896/Param+trer+le+routage+des+factures+vers+la+Plateforme+agr+e+PA+V10.12
//   · « Contrôle du Siret/Siren (V10.12) » : https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704715990/Contr+le+du+Siret+Siren+V10.12
//   · « Consulter le cycle de vie des factures au format Factur-X (V10.12) » (image : le tableau officiel des statuts) :
//     https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704715933/Consulter+le+cycle+de+vie+des+factures+au+format+Factur-X+V10.12
//   · « Réémettre une pièce rejetée par la PDP (V10.13) » :
//     https://divalto.atlassian.net/wiki/spaces/UDI113/pages/12304154625/R+mettre+une+pi+ce+rejet+e+par+la+PDP+V10.13
//   · « Intégration technique des Factures Factur-X : lecture des métadonnées et identification des entités » :
//     https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704715472/Int+gration+technique+des+Factures+Factur+X+lecture+des+m+tadonn+es+et+identification+des+entit+s
//   · « Gérer les achats » : https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704718965/G+rer+les+achats
//   · « Le contrôle facture fournisseur » : https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704720571/Le+contr+le+facture+fournisseur
//   · « Circuit des Décaissements » (bon à payer) : https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11705863968/Circuit+des+D+caissements
//   · « Relances » : https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11705864144/Relances
//   · « La facture » (vente) : https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704713774/La+facture
// Fil rouge (docs/plan-chef-de-projet.md, « Fiche fil rouge DEMAT 2027 », qui fait foi) : le négociant en équipement de
// piscines (120 salariés, 3 dépôts : une PME) ; réception obligatoire depuis le 1er septembre 2026, émission et
// e-reporting au 1er septembre 2027 ; PA de la liste officielle ; SIREN du client obligatoire, sinon rejet ; facture
// émise non modifiable ; 6 ans et 10 ans ; amendes de l'article 1737 sans montant ; 300 fiches clients sans SIREN en
// décembre 2026, corrigées dans Divalto par l'ADV (cp20) ; AquaBleu : 30 fiches, un seul SIREN ; calendrier du projet
// (cp05, cp21) ; e-reporting hors du projet, porté par le DAF.
// Choix et prudence :
// - Aucun montant d'amende (ils ont changé en 2026). Vocabulaire du site : « plateforme agréée (PA) », jamais « API ».
// - Statuts : les 4 obligatoires (Déposée, Rejetée, Refusée, Encaissée) sont sûrs. Pour les autres, la version actuelle
//   de la norme XP Z12-012 n'a pas pu être lue en entier : le cours dit seulement qu'ils ne sont pas obligatoires pour
//   l'administration (tableau officiel de la page Divalto « Consulter le cycle de vie… » : « recommandé » ou « libre »),
//   et renvoie au contrat de la PA.
// - Mentions : leur date suit celle de l'émission (décret n° 2022-1299, article 3 ; economie.gouv.fr) : 2026 pour les
//   grandes entreprises et les ETI, 2027 pour les PME. La FAQ d'impots.gouv.fr dit seulement « 1er septembre 2026 » :
//   le cours le signale.
// - B2G : Chorus Pro reste la plateforme de référence ; en direct comme avant, ou par une PA raccordée à Chorus Pro
//   (la cible : economie.gouv.fr, « Chorus Pro restera la plateforme de référence… »).
// - Inventé pour les exemples (cohérent avec le fil rouge) : la pompe HP-300, les fournisseurs HydroPompes et LinerSud
//   (cours dv02), le régime de TVA du négociant (réel normal mensuel), un client belge, un fabricant italien.
// Contradictions dans la base Divalto (pages pas à jour de la réforme, certaines écrites en 2025 : « Factur-X, pourquoi… »
// montre une facture du 24/04/2025 ; le cours suit les sources officielles) :
// - « Cadre législatif et choix éditoriaux » : le PPF y est encore une plateforme possible (« la plateforme publique ou
//   une plateforme privée ») et parle de PDP. Depuis octobre 2024 (loi de finances pour 2025), le PPF n'échange plus de
//   factures : PA seulement. Elle impose aussi un « coffre-fort numérique, en un dépôt scellé et horodaté » : non
//   retrouvé dans les sources officielles (6 ans au format d'origine) ; non repris.
// - « Factur-X, pourquoi, pour qui et comment ? » : « toutes les factures doivent être envoyées [...] à l'administration
//   fiscale » : non, la facture va au client par les PA, l'administration reçoit des données ; « entrée en vigueur
//   progressivement à partir de 2024 » : calendrier reporté à 2026-2027.
// - « La gestion du E-reporting » : y range le B2G (le secteur public reste sur Chorus Pro) ; « obligatoire pour toutes
//   les entreprises d'ici 2026 » (PME : 2027) ; période « à déterminer » (fixée depuis par le BOFiP) ; envoi du fichier
//   « indisponible » à la date de la page.
// - « Consulter le cycle de vie… » et « Réémettre une pièce rejetée par la PDP » : ancien vocabulaire (PDP, PPF).
// Frontières : les écrans Divalto des achats et des ventes = dv01 à dv03 ; le pilotage d'un projet = parcours Chef de
// projet SI (cp04, cp13, cp14, cp19 à cp23), cités en une ligne, pas refaits.
LEARNSQL.cours.fd01 = {
  intro: "Ta démat fiscale, tu l'as pilotée de A à Z. Saurais-tu l'expliquer en 10 minutes à un nouveau DAF (directeur administratif et financier), du bon de commande jusqu'au statut « Encaissée » ? Ici, l'essentiel en 14 parties : le cycle achats (P2P, Procure-to-Pay), le cycle ventes (O2C, Order-to-Cash), puis la réforme de la facture électronique en France, et ce qu'elle change dans Divalto et dans un projet. Les écrans Divalto en détail : modules dv01 à dv03. Les règles ont été vérifiées sur les sites officiels en novembre 2026 : elles bougent encore, revérifie avant d'agir.",
  sections: [
    {
      titre: "Le P2P : du besoin au paiement",
      exemple: "Dans un des 3 dépôts, le stock de pompes HP-300 baisse.\n1. Le technicien saisit une demande d'achat : 10 pompes.\n2. Son responsable l'accepte.\n3. L'acheteur commande chez HydroPompes. HydroPompes confirme le prix, la quantité et la date.\n4. Le magasinier reçoit les 10 pompes et valide la réception.\n5. La facture arrive. Julie la compare à la commande et à la réception.\n6. Tout concorde : le bon à payer est donné, la facture est payée à l'échéance.",
      resultat: [
        ["Étape", "La pièce", "Dans Divalto"],
        ["Besoin", "Demande d'achat (DA)", "Demandes d'achat"],
        ["Commande", "Bon de commande", "Commande fournisseur"],
        ["Réception", "Bon de livraison (BL)", "BL fournisseur"],
        ["Facture", "Facture rapprochée", "Contrôle facture"],
        ["Comptabilité", "Écriture d'achat", "Intégration comptable"],
        ["Bon à payer (BAP)", "Accord signé pour payer", "Bons à payer"],
        ["Paiement", "Virement, puis lettrage", "Préparation, émission"]
      ],
      regle: "Le P2P (Procure-to-Pay : de l'achat au paiement) est la chaîne qui va d'un besoin jusqu'au paiement du fournisseur. Chaque étape laisse une pièce. Ces pièces prouvent ce qui a été demandé, commandé, reçu, facturé et payé. Elles se contrôlent entre elles : on ne paie que ce qui a été commandé et reçu. Et les rôles sont séparés : celui qui commande n'est pas celui qui paie.",
      points: [
        "Demande d'achat (DA) : le besoin, écrit et validé (budget, responsable). Elle reste interne : elle n'engage pas encore l'entreprise.",
        "Commande : elle engage l'entreprise auprès du fournisseur. Il répond par un ARC (accusé de réception de commande) : prix, quantités, date. Un écart se règle à l'ARC, pas à la facture.",
        "Réception : on compte, on contrôle, on note les écarts sur le BL (bon de livraison). Dans l'ERP (progiciel de gestion intégré), c'est la réception qui fait entrer le stock.",
        "Facture : elle se rapproche de la commande et de la réception (partie 2). Une facture sans commande (abonnement, frais) suit un circuit de validation par celui qui a engagé la dépense.",
        "Séparer les rôles : demander, commander, recevoir, payer. Une seule personne pour tout, c'est la porte ouverte aux erreurs et à la fraude."
      ],
      retenir: "P2P : besoin, commande, réception, facture, bon à payer, paiement. Chaque étape a sa pièce, et les pièces se contrôlent entre elles.",
      source: { titre: "Gérer les achats (Divalto 10.13)", url: "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704718965/G+rer+les+achats" }
    },
    {
      titre: "Rapprocher, traiter les litiges, payer",
      exemple: "Facture LinerSud : 10 liners à 105 € HT (hors taxes).\nCommande : 10 liners à 100 €. Réception : 8 liners.\nLe rapprochement à 3 voies montre 2 écarts : 2 liners facturés mais pas reçus, et 5 € de trop par liner.\nJulie bloque le paiement et écrit à LinerSud. LinerSud envoie un avoir de 250 € HT : 210 € pour les 2 liners, 40 € pour le prix des 8 autres.\nTout concorde : sa responsable donne le bon à payer.",
      regle: "Rapprocher, c'est vérifier qu'on paie ce qu'on a commandé, au bon prix, et ce qu'on a vraiment reçu. À 2 voies, on compare la commande et la facture. À 3 voies, on ajoute la réception : c'est la règle pour les marchandises. Un écart au-delà de la tolérance bloque le paiement : c'est un litige. Il se règle avec le fournisseur, puis se corrige par un avoir ou une nouvelle facture. On ne retouche jamais la facture reçue.",
      points: [
        "2 voies : commande et facture (services, frais). 3 voies : commande, réception et facture (marchandises). Une tolérance (un pourcentage ou un montant) évite de bloquer pour quelques centimes. Dans Divalto, `Contrôle facture fournisseur` rapproche la facture de ses BL ; un écart de prix donne une demande d'avoir (module dv02).",
        "Litige : le paiement est bloqué. Tu notes le motif, tu préviens le fournisseur, tu suis sa réponse. Avec la réforme, un refus laisse une trace : un statut, avec son motif (partie 9).",
        "Bon à payer (BAP) : l'accord d'une personne habilitée pour payer. Dans Divalto, c'est une étape facultative du module Règlement ; le signataire se règle sur la fiche du fournisseur.",
        "Comptabilité : la facture crée la charge, la TVA (taxe sur la valeur ajoutée) déductible et la dette fournisseur (compte 401). Le paiement solde la dette ; le lettrage relie la facture et son paiement. Reçu mais pas encore facturé à la clôture : une FNP (facture non parvenue, compte 408).",
        "Délais de paiement (Code de commerce, article L441-10) : 60 jours au plus après la date de la facture. Ou 45 jours fin de mois, si le contrat le prévoit. Sans accord : 30 jours après la réception."
      ],
      retenir: "Commande, réception, facture : les 3 doivent dire la même chose. Un écart bloque le paiement et se corrige par un avoir, jamais en retouchant la facture.",
      source: { titre: "Le contrôle facture fournisseur (Divalto 10.13)", url: "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704720571/Le+contr+le+facture+fournisseur" }
    },
    {
      titre: "L'O2C : de la commande du client à l'encaissement",
      exemple: "AquaBleu, une chaîne de magasins, commande 40 pompes en EDI (échange de données informatisé).\n1. L'ADV (administration des ventes) vérifie l'encours d'AquaBleu, puis valide la commande.\n2. Le dépôt prépare et livre. Le BL sort les pompes du stock.\n3. La facture part : 40 pompes, à 45 jours fin de mois.\n4. À l'échéance, le virement n'est pas là : une relance part.\n5. Le paiement arrive. Il est lettré avec la facture.",
      resultat: [
        ["Étape", "La pièce", "Le message EDI"],
        ["Commande", "Commande du client", "ORDERS"],
        ["Livraison", "Bon de livraison (BL)", "DESADV (avis d'expédition)"],
        ["Facture", "Facture, ou avoir", "INVOIC"]
      ],
      regle: "L'O2C (Order-to-Cash : de la commande à l'encaissement) est le miroir du P2P, côté ventes. Il va de la commande du client jusqu'à l'argent sur le compte. Chaque étape a sa pièce : commande, bon de livraison, facture, puis paiement. Le but : livrer juste, facturer juste, encaisser à l'heure. Ton client rapprochera ta facture de sa commande et de sa réception : une facture juste se paie plus vite.",
      points: [
        "Commande : on vérifie le client avant de s'engager (encours, plafond). Dans Divalto, un dépassement d'encours peut bloquer la commande (module dv01).",
        "Livraison : le BL fait sortir le stock et prouve ce qui est livré. En général, on facture ce qui est livré.",
        "Facture : un numéro unique, et elle est figée une fois émise. Dans Divalto, l'impression normale la fige ; le brouillon sert à contrôler avant. Une erreur se corrige par un avoir. En EDI, le message INVOIC porte le code 380 pour une facture, 381 pour un avoir.",
        "Comptabilité : la facture crée la créance client (compte 411), le chiffre d'affaires (comptes 70) et la TVA collectée. Le paiement solde la créance ; le lettrage les relie.",
        "Relance : un scénario selon les jours de retard. Dans Divalto Règlement, jusqu'à 10 délais, avant ou après l'échéance, avec un texte qui change à chaque relance. Les délais de paiement légaux sont ceux de la partie 2."
      ],
      retenir: "O2C : commande, livraison, facture, encaissement. On livre juste, on facture juste, on relance à l'heure.",
      source: { titre: "Relances (Divalto 10.13)", url: "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11705864144/Relances" }
    },
    {
      titre: "La réforme : pourquoi, et pour qui",
      exemple: "Avant : Sophie envoie la facture d'un client en PDF, par mail. Le client la ressaisit.\nAprès : la facture part de Divalto vers la PA (plateforme agréée) du négociant. Elle arrive à la PA du client, puis dans son ERP. Personne ne ressaisit.\nEn même temps, la PA du négociant envoie à l'administration fiscale les données utiles à la TVA.",
      regle: "La réforme oblige les entreprises assujetties à la TVA et établies en France à s'échanger leurs factures sous forme électronique, par des plateformes agréées. Les opérations sans facture électronique (ventes aux particuliers, échanges avec l'étranger) et certains paiements sont déclarés à part : c'est l'e-reporting. L'État voit ainsi la TVA au fil de l'eau. Les entreprises, elles, gagnent du temps : moins de saisie, moins de papier.",
      points: [
        "4 objectifs officiels. 1) La compétitivité : moins de charge administrative, des délais de paiement plus courts. 2) Le préremplissage des déclarations de TVA. 3) La lutte contre la fraude à la TVA. 4) Connaître l'activité en temps réel.",
        "3 obligations : recevoir des factures électroniques ; en émettre (on dit aussi e-invoicing) ; transmettre des données à l'administration (l'e-reporting).",
        "Qui : toute entreprise assujettie à la TVA et établie en France, quelle que soit sa taille, même une micro-entreprise. La facture électronique vise le B2B (entre entreprises) en France.",
        "Hors champ : certaines opérations exonérées et dispensées de facture (santé, enseignement, banque, assurance…), et quelques autres cas. La liste exacte : impots.gouv.fr.",
        "La DGFiP (Direction générale des finances publiques) pilote la réforme. Pour vérifier : impots.gouv.fr (fiches, FAQ ou questions fréquentes, guide de démarrage) et le BOFiP (Bulletin officiel des finances publiques, la doctrine officielle). Pas une plaquette commerciale."
      ],
      retenir: "La réforme : recevoir, émettre, déclarer. Toujours par une plateforme agréée, pour que l'État voie la TVA au fil de l'eau.",
      source: { titre: "Je découvre la facturation électronique (impots.gouv.fr)", url: "https://www.impots.gouv.fr/professionnel/je-decouvre-la-facturation-electronique" }
    },
    {
      titre: "Le calendrier : qui, et quand",
      exemple: "Trois entreprises, en novembre 2026 :\n– une enseigne nationale : plus de 5 000 salariés ;\n– ton négociant en piscines : 120 salariés ;\n– un petit installateur : 4 personnes.\nGrande entreprise, ETI (entreprise de taille intermédiaire), PME (petite ou moyenne entreprise) ou micro-entreprise : qui doit déjà recevoir des factures électroniques ? Qui doit déjà en émettre ?",
      resultat: [
        ["Date", "Qui", "Quoi"],
        ["1er sept. 2026", "Toutes les entreprises", "Recevoir"],
        ["1er sept. 2026", "Grandes entreprises, ETI", "Émettre + e-reporting"],
        ["1er sept. 2027", "PME, micro-entreprises", "Émettre + e-reporting"]
      ],
      regle: "La réception est obligatoire pour toutes les entreprises en même temps. L'émission et l'e-reporting arrivent selon la taille. D'abord les grandes entreprises et les ETI. Puis les PME et les micro-entreprises. La taille ne se choisit pas : elle se calcule une fois, sur des critères officiels. Une entreprise peut émettre plus tôt, si elle le veut.",
      points: [
        "La taille se mesure au 1er janvier 2025, sur le dernier exercice clos avant cette date (à défaut, le premier clos après). Elle se mesure par SIREN (le numéro de l'entreprise, 9 chiffres), pas par groupe.",
        "Micro-entreprise : moins de 10 personnes, et au plus 2 M€ (millions d'euros) de chiffre d'affaires ou de bilan. PME : moins de 250 personnes, et au plus 50 M€ de chiffre d'affaires ou 43 M€ de bilan.",
        "ETI : pas une PME, moins de 5 000 personnes, et au plus 1 500 M€ de chiffre d'affaires ou 2 000 M€ de bilan. Grande entreprise : tout le reste.",
        "Piège : on monte d'une catégorie si l'effectif dépasse le seuil, ou si le chiffre d'affaires ET le bilan le dépassent tous les deux. Ton négociant : 120 salariés, donc PME, sauf si ses 2 montants dépassent.",
        "Réponse : l'enseigne reçoit et émet depuis le 1er septembre 2026. Le négociant et l'installateur reçoivent depuis cette date ; ils émettront au plus tard le 1er septembre 2027."
      ],
      retenir: "Recevoir : tout le monde, depuis le 1er septembre 2026. Émettre et e-reporting : grandes entreprises et ETI en 2026, PME et micro-entreprises en 2027.",
      source: { titre: "Foire aux questions : j'approfondis la facturation électronique (impots.gouv.fr)", url: "https://www.impots.gouv.fr/foire-aux-questions-japprofondis-la-facturation-electronique" }
    },
    {
      titre: "Facture électronique ou e-reporting : quelle opération va où ?",
      exemple: "Une journée de 2028 chez le négociant :\n– il facture AquaBleu, en France ;\n– il reçoit la facture d'HydroPompes, en France ;\n– un particulier achète un robot au comptoir d'un dépôt ;\n– il vend 20 pompes à un client belge ;\n– il achète des liners à un fabricant italien.\nQuel circuit pour chacune ?",
      resultat: [
        ["Opération", "Le circuit"],
        ["Vente à AquaBleu", "Facture électronique (PA à PA)"],
        ["Achat chez HydroPompes", "Facture électronique (ta PA)"],
        ["Vente à un particulier (B2C)", "E-reporting : totaux du jour"],
        ["Vente en Belgique", "E-reporting (par opération)"],
        ["Achat en Italie", "E-reporting (par opération)"],
        ["Service, TVA à l'encaissement", "Données de paiement"],
        ["Vente au secteur public (B2G)", "Chorus Pro (secteur public)"]
      ],
      regle: "Une opération entre deux entreprises assujetties, établies en France, passe en facture électronique, de plateforme agréée à plateforme agréée. Les autres opérations ne passent pas en facture électronique, mais leurs données partent à l'administration : c'est l'e-reporting. Il couvre les ventes aux particuliers, les opérations avec l'étranger, et les paiements de certains services. Le but reste le même : que l'administration voie toute la TVA.",
      points: [
        "B2B en France, entre assujettis : facture électronique obligatoire, dans les deux sens. Tes factures d'achat arrivent par ta PA.",
        "B2C (vers les particuliers) : pas de facture électronique obligatoire. Ta PA transmet un total par jour et par taux de TVA.",
        "International (Union européenne et hors UE), achats comme ventes : la facture ne change pas, ses données partent en e-reporting. Les importations de biens en sont exclues.",
        "Données de paiement : seulement les services dont la TVA est due à l'encaissement. Pas si l'entreprise a opté pour les débits, ni en autoliquidation (le client déclare lui-même la TVA). C'est le fournisseur qui les transmet.",
        "B2G (vers le secteur public) : Chorus Pro reste la plateforme de référence. Deux voies : Chorus Pro en direct, comme avant ; ou ta PA, si elle est raccordée à Chorus Pro. Cette 2e voie est la cible : un seul canal pour tous tes clients."
      ],
      retenir: "B2B en France : facture électronique. Particuliers, étranger, paiements de services : e-reporting.",
      source: { titre: "La transmission des données de transactions, ou e-reporting (fiche impots.gouv.fr)", url: "https://www.impots.gouv.fr/sites/default/files/media/1_metier/2_professionnel/EV/2_gestion/290_facturation_electronique/fiches_reforme/fiche-e-reporting_transactions.pdf" }
    },
    {
      titre: "Les plateformes agréées (PA), le portail public (PPF) et l'annuaire",
      exemple: "Sophie émet une facture pour AquaBleu.\n1. Divalto l'envoie à la PA du négociant.\n2. Cette PA cherche AquaBleu dans l'annuaire, par son SIREN : l'annuaire donne la PA d'AquaBleu.\n3. La facture passe de PA à PA. AquaBleu la reçoit.\n4. La PA du négociant envoie les données fiscales au PPF (portail public de facturation), qui les transmet à l'administration.",
      regle: "Une plateforme agréée (PA) est un opérateur privé, immatriculé par l'administration fiscale. Elle seule peut transmettre les factures électroniques entre entreprises, et leurs données à l'administration. Le PPF (portail public de facturation) ne transporte pas de factures : il tient l'annuaire et concentre les données pour l'administration. L'annuaire dit, pour chaque entreprise, quelle PA reçoit ses factures. Chacun choisit sa PA ; les PA échangent entre elles.",
      points: [
        "PA : l'ancien nom était PDP (plateforme de dématérialisation partenaire). Elle est immatriculée pour 3 ans, renouvelables. La liste officielle est sur impots.gouv.fr, et elle évolue. Un comparateur privé ne la remplace pas.",
        "Une ou plusieurs PA ; la même peut émettre et recevoir. Ton fournisseur peut avoir une autre PA que toi. Une « solution compatible » (un logiciel non immatriculé) doit passer par une PA : elle ne transmet rien seule.",
        "PPF : depuis une annonce d'octobre 2024, confirmée par la loi de finances pour 2025, il fait seulement l'annuaire et la concentration des données. Toute facture entre entreprises passe par une PA.",
        "Annuaire : ouvert depuis septembre 2025, en accès libre. On y cherche par SIREN, par SIRET (14 chiffres : un établissement) ou par nom. L'adresse de facturation peut viser le SIREN, un SIRET, ou un service précis avec un code de routage.",
        "Pour recevoir, tu signes un accord de désignation de ta PA de réception. C'est lui qui met l'annuaire à jour."
      ],
      retenir: "Toute facture B2B en France passe par une PA, choisie dans la liste officielle. Le PPF tient l'annuaire et transmet les données à l'administration.",
      source: { titre: "Je consulte la liste des plateformes agréées (impots.gouv.fr)", url: "https://www.impots.gouv.fr/je-consulte-la-liste-des-plateformes-agreees" }
    },
    {
      titre: "La facture électronique : un format, des mentions",
      exemple: "HydroPompes t'envoie une facture en PDF, par mail. Ce n'est pas une facture électronique : aucun logiciel n'en lit les données à coup sûr.\nLa même en Factur-X : un PDF lisible, avec un fichier de données dedans. Divalto la lit sans ressaisie.\nSur la facture de Sophie à AquaBleu, 3 nouvelles mentions : le SIREN d'AquaBleu, l'adresse du magasin livré, « livraison de biens ».",
      regle: "Une facture électronique est un ensemble de données structurées, qu'un logiciel lit sans ressaisie. Un PDF seul, même envoyé par mail, n'en est pas une. Trois formats sont admis : UBL et CII (des fichiers de données) et Factur-X (un PDF avec ses données dedans). La facture garde toutes ses mentions habituelles (numéro, dates, identités, prix, TVA…). Elle en gagne quatre, qui servent à l'acheminer et à préremplir la TVA.",
      points: [
        "Le socle : UBL et CII, deux formats XML (des fichiers faits pour les machines). Et Factur-X : un PDF/A-3 (un PDF fait pour l'archivage) lisible, avec son fichier XML dedans. Les trois reposent sur la norme européenne EN 16931.",
        "Factur-X a des profils. Le profil MINIMUM ne suffit pas pour la réforme. Divalto produit les profils EN 16931 ou EXTENDED.",
        "Un autre format, comme l'EDIFACT (la norme des messages EDI) ? Ta PA peut le convertir dans un format du socle, si elle offre ce service : fais-le écrire au contrat.",
        "4 nouvelles mentions. Le SIREN du client. L'adresse de livraison, si elle diffère. La catégorie de l'opération : biens, services, ou les deux. L'option pour la TVA sur les débits, si l'entreprise l'a prise.",
        "Quand ? En même temps que l'émission : depuis le 1er septembre 2026 pour les grandes entreprises et les ETI, au 1er septembre 2027 pour les PME et les micro-entreprises (décret du 7 octobre 2022, article 3). La FAQ d'impots.gouv.fr dit seulement « 1er septembre 2026 » : en cas de doute, demande à ton expert-comptable. Sans SIREN du client, la facture ne peut pas être acheminée : elle est rejetée."
      ],
      retenir: "Une facture électronique, ce sont des données (UBL, CII ou Factur-X), pas un simple PDF. Plus 4 mentions, dont le SIREN du client.",
      source: { titre: "Mentions obligatoires d'une facture : tout savoir (economie.gouv.fr)", url: "https://www.economie.gouv.fr/entreprises/gerer-son-entreprise-au-quotidien/gerer-sa-comptabilite-et-ses-demarches/mentions-obligatoires-dune-facture-tout-savoir" }
    },
    {
      titre: "Le cycle de vie : les statuts d'une facture",
      exemple: "La facture de Sophie pour AquaBleu, suivie dans la PA :\n– « Déposée » : la PA du négociant l'accepte. Elle part vers la PA d'AquaBleu.\n– « Refusée » : AquaBleu la conteste, avec un motif : un prix faux sur une ligne.\n– Sophie vérifie : AquaBleu a raison. Elle annule l'effet de cette facture dans ses comptes, puis émet une nouvelle facture, avec un nouveau numéro.\nUne autre facture, sans le SIREN du client : « Rejetée ». Elle n'arrive jamais chez le client.",
      resultat: [
        ["Statut obligatoire", "Qui le pose", "Ce qu'il dit"],
        ["Déposée", "PA de l'émetteur", "Acceptée, horodatée"],
        ["Rejetée", "Une des deux PA", "Non conforme : bloquée"],
        ["Refusée", "Le client", "Contestée, avec un motif"],
        ["Encaissée", "Le fournisseur", "Payée : date et montant"]
      ],
      regle: "Chaque facture électronique a un cycle de vie : une suite de statuts, que les PA s'échangent. Quatre sont obligatoires et remontent à l'administration : Déposée, Rejetée, Refusée, Encaissée. Les autres servent au suivi entre les entreprises. « Rejetée » veut dire non conforme : une machine l'a bloquée. « Refusée » veut dire contestée : le client n'est pas d'accord. Les deux ne se traitent pas pareil.",
      points: [
        "Rejetée : l'erreur vient souvent de l'émetteur (format, SIREN, montants incohérents). Tu corriges et tu renvoies. Dans Divalto (V10.13) : `Outils` > `Dématérialisation` > `Ré-émettre`, tant que la facture n'est pas passée en comptabilité.",
        "Refusée, et le client a raison : tu neutralises la facture chez toi (un avoir interne, selon le cas). Puis tu émets une nouvelle facture, avec un nouveau numéro.",
        "Refusée, et tu contestes : rien d'automatique. Ni nouvelle facture, ni avoir « par réflexe ». Tu instruis le désaccord et tu notes ta décision.",
        "Encaissée : posé par le fournisseur payé, pour les services en TVA sur les encaissements. Il porte les données de paiement : la date, et le montant par taux de TVA. Le BOFiP conseille de le transmettre dans les 24 heures.",
        "Les autres statuts (Mise à disposition, Prise en charge, Approuvée, En litige, Paiement transmis…) ne sont pas obligatoires pour l'administration. Lesquels ta PA gère : à vérifier au contrat. Dans Divalto (V10.12), depuis le menu principal : `F7` > « Statut de la facture électronique »."
      ],
      retenir: "4 statuts obligatoires : Déposée, Rejetée, Refusée, Encaissée. Rejetée : tu corriges et tu renvoies. Refusée : tu instruis, puis tu décides.",
      source: { titre: "L'émission de factures électroniques (fiche impots.gouv.fr)", url: "https://www.impots.gouv.fr/sites/default/files/media/1_metier/2_professionnel/EV/2_gestion/290_facturation_electronique/fiches_reforme/fiche-e-invoicing.pdf" }
    },
    {
      titre: "L'e-reporting : quoi, quand, à quel rythme",
      exemple: "Le négociant déclare sa TVA chaque mois (réel normal mensuel). Nous sommes en mars 2028.\nDu 1er au 10 mars : des ventes au comptoir à des particuliers, et 20 pompes vendues en Belgique.\nAu plus tard le 20 mars, sa PA transmet ces données. Puis celles du 11 au 20, et celles du 21 au 31.\nSes paiements de services, s'il en a : une fois par mois.",
      resultat: [
        ["Régime de TVA", "Transactions", "Paiements"],
        ["Réel normal mensuel", "3 fois par mois", "1 fois par mois"],
        ["Réel normal trimestriel", "1 fois par mois", "1 fois par mois"],
        ["Franchise en base", "Tous les 2 mois", "Tous les 2 mois"]
      ],
      regle: "L'e-reporting, c'est transmettre à l'administration, par sa PA, les données des opérations sans facture électronique. Ce sont les ventes aux particuliers et les opérations avec l'étranger. Plus les données de paiement de certains services. Il suit le calendrier de l'émission. Son rythme dépend du régime de TVA : plus une entreprise déclare souvent sa TVA, plus elle transmet souvent.",
      points: [
        "Ventes aux particuliers : des totaux par jour et par taux de TVA, pas chaque ticket. International : des données proches de celles d'une facture, pour les achats comme pour les ventes.",
        "Au réel normal mensuel, les transactions partent par décade : du 1 au 10, du 11 au 20, du 21 à la fin du mois. Délai, au réel normal : 10 jours après la fin de chaque période. Aucune opération sur une période : rien à transmettre.",
        "Le régime simplifié de TVA (RSI) disparaît au 1er janvier 2027 : ces entreprises passent au réel normal, trimestriel ou mensuel. Dis à ta PA ton régime de TVA, et chaque changement.",
        "Calendrier : celui de l'émission. Grandes entreprises et ETI depuis le 1er septembre 2026 ; PME et micro-entreprises au 1er septembre 2027.",
        "Dans Divalto : `Comptabilité` > `eReporting` (le traitement, puis le superviseur). Le « schéma commercial » de chaque tiers dit quel flux produire (partie 13)."
      ],
      retenir: "E-reporting : particuliers, étranger, paiements de services. Même calendrier que l'émission, et un rythme fixé par ton régime de TVA.",
      source: { titre: "BOFiP, transmission des données de transaction : modalités (BOI-TVA-DECLA-20-30-50-30)", url: "https://bofip.impots.gouv.fr/bofip/13900-PGP.html/identifiant=BOI-TVA-DECLA-20-30-50-30-20260930" }
    },
    {
      titre: "Conserver, corriger, et les sanctions",
      exemple: "Contrôle fiscal en 2030. Le vérificateur demande une facture fournisseur de mars 2027.\nJulie la sort de l'archive, dans son format électronique d'origine : le Factur-X reçu, pas une impression.\nIl demande aussi une facture client de 2028, émise avec une erreur. Elle n'a pas été retouchée : un avoir l'a corrigée, avec son propre numéro.",
      regle: "Une facture émise ne se modifie plus : on la corrige par un avoir ou une facture rectificative. Les factures se gardent 6 ans pour le fisc, dans leur format électronique d'origine, et 10 ans au titre du Code de commerce. C'est l'entreprise qui en répond, même si sa PA les archive. Des amendes existent ; leurs montants ont changé en 2026 : on lit le texte en vigueur, pas un vieux chiffre.",
      points: [
        "6 ans : article L102 B du LPF (Livre des procédures fiscales), dans le format d'origine. 10 ans : article L123-22 du Code de commerce, pour les documents comptables.",
        "L'archive, tu la choisis : ta PA (si elle le propose), ou un service à part. La durée légale reste l'affaire de ton entreprise, pas celle de la PA.",
        "Ne pas émettre en électronique : une amende par facture, avec un plafond par an. C'est l'article 1737 du CGI (Code général des impôts), modifié en février 2026.",
        "Ne pas recevoir par une PA : une mise en demeure, puis des amendes (article 1737 aussi). E-reporting manqué : article 1788 D du CGI. Les montants : sur Légifrance, à la date du jour.",
        "Tolérance annoncée en juillet 2026 : pas de sanction au démarrage pour une entreprise de bonne foi en difficulté, qui fait le nécessaire et le documente. En octobre 2026 : aucune sanction avant la fin de 2026. Ce n'est ni un report, ni une suspension. Pour 2027 : à vérifier."
      ],
      retenir: "Une facture émise ne se retouche pas : un avoir. Elle se garde 6 ans au format d'origine, 10 ans en comptabilité. Des amendes existent : lis le texte en vigueur.",
      source: { titre: "Guide pratique de démarrage au 1er septembre 2026 (impots.gouv.fr)", url: "https://www.impots.gouv.fr/sites/default/files/media/1_metier/2_professionnel/EV/2_gestion/290_facturation_electronique/guide_pratique_facturation_electronique.pdf" }
    },
    {
      titre: "Ce qui change au quotidien : P2P, O2C et EDI",
      exemple: "Juillet 2027, après la bascule.\nJulie : les factures fournisseurs arrivent par la PA, puis dans Divalto. Elle contrôle au lieu de ressaisir. Une facture fausse ? Elle la refuse dans la PA, avec un motif.\nSophie : chaque facture client part par la PA. Le matin, elle traite les rejets de la veille.\nMarc : les factures EDI d'AquaBleu passent, elles aussi, par les PA. Il suit leurs statuts.",
      regle: "La réforme ne change pas le P2P ni l'O2C : on commande, on reçoit, on facture et on paie toujours. Elle change le transport de la facture, ses contrôles, et ce qu'on suit chaque jour. La ressaisie recule ; les rejets et les statuts arrivent. Les flux EDI déjà en place doivent, eux aussi, passer par les plateformes agréées.",
      points: [
        "P2P : moins de ressaisie, mais le rapprochement à 3 voies reste. D'autres statuts suivent ton circuit : « Prise en charge », « Approuvée », « Paiement transmis ». Ils ne sont pas obligatoires pour l'administration. Ton fournisseur les voit, si vos PA les gèrent.",
        "Encore du papier ou du PDF : d'un fournisseur PME jusqu'au 1er septembre 2027, ou d'un fournisseur étranger. Les saisir n'est pas un contournement.",
        "O2C : chaque facture B2B en France part par la PA. Un rejet, c'est une facture qui n'arrive pas, donc qui n'est pas payée : on traite les rejets chaque jour.",
        "EDI : la commande (ORDERS) et la livraison (DESADV) ne changent pas. La facture (INVOIC) doit passer par les PA. Une fois l'émission obligatoire, un envoi direct, hors PA, ne suffit plus en B2B France.",
        "Ta PA peut convertir l'EDIFACT dans un format du socle, si elle offre ce service. Ton prestataire EDI aussi, s'il est lui-même PA. Avec chaque enseigne, cale tôt le format, sa PA et ses tests. Dans Divalto, un client au support « EDI » ne produit pas de Factur-X : sa facture sort en fichier EDI."
      ],
      retenir: "Le cycle ne change pas. Le transport, les contrôles et le suivi, si : rejets et statuts chaque jour, et l'EDI aussi par les PA.",
      source: { titre: "Principes et paramétrages, Factur-X (Divalto 10.13)", url: "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704714513/Principes+et+param+trages" }
    },
    {
      titre: "Dans Divalto : les réglages et le SIREN",
      exemple: "Décembre 2026 : 300 fiches clients sans SIREN.\nL'ADV lance l'utilitaire « Validation conformité Siret-Siren Factur-X ». Il compare chaque numéro à la base Sirene, le répertoire officiel des entreprises.\nL'ADV corrige les fiches dans Divalto, pas dans la PA.\nAquaBleu : 30 fiches, une par magasin. Un seul SIREN, 30 SIRET.",
      regle: "L'ERP doit produire et lire des factures électroniques, et dire à la PA où les envoyer. Pour cela, il lui faut des données de référence justes. Le SIREN et le SIRET de chaque client et fournisseur, ses adresses, son type de relation. Une donnée fausse donne une facture rejetée, à chaque fois. On la corrige à la source, dans l'ERP, par le métier qui en est propriétaire.",
      points: [
        "Émettre : fiche client, onglet Documents. Le support « PDF », et « Générer les factures au format Factur-X » (ou « Implicite » : le dossier décide). Le profil Factur-X se règle dans le dossier Commerce et logistique, onglet Pièces 3.",
        "Schéma commercial (V10.13), dans le dossier et sur la fiche tiers. Il dit quel flux produire : B2B domestique, B2G domestique, B2B non domestique, B2C, B2C quotidienne (le comptoir), ou Non.",
        "Routage (V10.12) : la table `Routage RFE` relie le SIRET du client au code de routage de la PA. RFE veut dire réforme de la facturation électronique. Menu `Commerce et logistique / Fichiers / Tables / Tables liées aux tiers`.",
        "Recevoir : les factures entrent par le Data Hub (le module qui intègre les factures dématérialisées). Divalto trouve le dossier et le fournisseur par SIRET, GLN (le code de lieu de l'EDI) ou DUNS (un numéro d'entreprise international). Renseigne-les tous, sinon la facture s'arrête.",
        "Installation sur vos serveurs : le composant Divalto ERP Gateway est requis pour la réforme. Attention : une partie de la doc Divalto n'est pas à jour de la réforme. Elle parle encore de PDP, et du PPF comme d'une plateforme. La règle actuelle : la PA."
      ],
      retenir: "Dans Divalto : Factur-X sur les clients, schéma commercial, routage vers la PA, identifiants complets. Et des SIREN justes, corrigés dans Divalto.",
      source: { titre: "Paramétrer le routage des factures vers la Plateforme agréée (PA) (V10.12) (Divalto)", url: "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704715896/Param+trer+le+routage+des+factures+vers+la+Plateforme+agr+e+PA+V10.12" }
    },
    {
      titre: "Le projet, en bref",
      exemple: "DEMAT 2027, le fil rouge du parcours Chef de projet SI :\nOctobre 2026 : cadrage. Novembre : PA choisie, réception par son portail.\nDécembre à avril : connecteur Divalto, données, flux EDI, recette.\nMai : pilote sur 1 site. Juin : bascule des 3 sites.\nJuillet-août : la marge. 1er septembre 2027 : émission obligatoire.",
      regle: "Un projet de facture électronique, c'est d'abord une date légale. C'est ensuite un projet de données et de processus, avant d'être un projet technique. On commence par recevoir, obligatoire pour tous. On choisit la PA dans la liste officielle, on nettoie les données, on recette sur les vrais cas. Puis on bascule avant la date, avec une marge. Le métier porte ses données et sa recette.",
      points: [
        "Cadrer : réception, émission, EDI, e-reporting. Chacun dans le projet, ou à part avec un porteur nommé. La date légale, et une marge avant elle (module cp04).",
        "Choisir la PA dans la liste officielle : connecteur pour ton ERP, formats, statuts, e-reporting, archivage, réversibilité, prix sur 3 ans (modules cp13 et cp14).",
        "Les données d'abord : SIREN, adresses, codes TVA, schéma commercial. Le métier en est propriétaire et les corrige dans l'ERP (module cp20).",
        "Recetter les vrais cas : avoirs, refus, rejets, EDI, fournisseur étranger, PDF d'une PME. Puis pilote, bascule, et un retour arrière prévu (modules cp19 et cp21).",
        "Après : former la compta et l'ADV, prévenir clients et fournisseurs, écrire une procédure par type de rejet, suivre les statuts en run (modules cp22 et cp23)."
      ],
      retenir: "Recevoir d'abord. Puis une PA de la liste officielle, des données propres, une recette sur les vrais cas, et la bascule avant la date, avec une marge."
    }
  ]
};
