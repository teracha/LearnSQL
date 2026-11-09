// Divalto 10.13 — Fiche de cours du module dv02 « Le cycle d'achat ».
// Fond écrit à partir de la base documentaire Divalto (dépôt Divalto_10), lue en lecture seule.
// Chaque section cite sa page. Une info venant d'une autre page le dit en fin de point : (page « … »).
LEARNSQL.cours.dv02 = {
  intro: "Un achat suit un cycle : demande, commande, réception, contrôle de la facture, parfois avoir. Chaque étape a ses alertes et ses blocages : les connaître évite ruptures, erreurs de stock et factures payées en trop.",
  sections: [
    {
      titre: "Demande d'achat et appel d'offre",
      exemple: "Trois techniciens demandent la pompe HP-300 : 2, 3 et 5 pièces.\n- L'acheteur accepte : « provisoire » → « active ».\n- Appel d'offre → HydroPompes reçoit une seule ligne : 10 pompes.\n- Les 3 demandes passent « périmées ».",
      points: [
        "États : « provisoire », « active » (acceptée), « périmée » (transformée ou refusée). Périmée = plus modifiable ; passée en devis ou en commande, plus d'appel d'offre possible. Si le dossier le prévoit, la demande naît active.",
        "`Supervision des demandes d'achat` : marquer les lignes (`F5`), `Accepter`, puis `Valider en Appel d'offre`, `Valider en Devis` ou `Valider en Commande`. Pas d'acceptation, pas de transformation.",
        "Regroupement (case du dossier, cochée par défaut) : même article + même fournisseur = une seule ligne sur l'appel d'offre, liens gardés (page « Paramétrage demande d'achat et appel d'offre »).",
        "Appel d'offre, import des réponses : seul le fichier Excel actif est lu, n'en ouvre qu'un. `Valider en commande` = une commande par fournisseur retenu (fond vert) (page « Les appels d'offre »).",
        "Fournisseur sans visa administratif (V10.12) : simple alerte à la création d'une demande ou d'un appel d'offre, blocage à la validation en commande (page « Contrôle du visa administratif des fournisseurs (V10.12) »)."
      ],
      retenir: "Demande : provisoire → acceptée → transformée (périmée) ; appel d'offre validé = une commande par fournisseur retenu.",
      source: { titre: "Les demandes d'achat", url: "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704719145/Les+demandes+d+achat" }
    },
    {
      titre: "Le fournisseur : alertes, blocages et prix d'achat",
      exemple: "LinerSud, commande de liners :\n- Feu orange → un message ; tu continues.\n- 25 liners saisis, il vend par 10 → alerte.\n- 1 500 € HT, plafond commande à 1 200 € → commande bloquée.",
      points: [
        "Feu (V10.4), fiche fournisseur : orange = alerte, tu continues ; rouge = « Mise à jour interdite ». Il joue en saisie de devis, de commandes, et en validation de devis en commande.",
        "Plafond commande (HT, devise principale) dépassé : commande bloquée, impossible à imprimer.",
        "Seuil tarifaire : option du dossier « Gérer un seuil tarifaire en commande achat » + montant HT sur la fiche (onglet Pièces). Non atteint = simple alerte (page « Gérer les achats »).",
        "Quantité minimale et « multiple de » (conditions de réappro de l'article chez ce fournisseur) : alerte en saisie de commande. Le CBN les utilise aussi.",
        "La commande imprimée porte la référence et la désignation du fournisseur. En saisie, tu vois ton libellé interne (page « Gérer les achats »).",
        "Prix d'achat : en général, prix particulier du couple article/fournisseur (code tarif 99).",
        "Coût de revient = prix d'achat + % (code % CR) + montant fixe (code montant CR) + frais de la ligne. Ex. : 400 € + 2 % + 5 € + 7 € = 420 €."
      ],
      retenir: "Feu orange, seuil, minimum : alerte ; feu rouge, plafond commande : blocage.",
      source: { titre: "Le fournisseur", url: "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704703163/Le+fournisseur" }
    },
    {
      titre: "La commande : devise, adresse, ARC et retards",
      exemple: "Commande chez ChloroPlus, délai demandé : le 3.\n- Il ne confirme qu'une partie → « AR partiel ».\n- Il repousse au 12 → délai reporté : le 12.\n- Le 8 : pas en retard. Le 13 : en retard.",
      points: [
        "Champ « Origine » (onglet Identifiant de l'en-tête) : Saisie, EDI, CBN, Demande d'achat, Appel d'offre, Contremarque… (page « Gérer les achats »).",
        "Devise : sans l'option du dossier « Maj taux de change lors de la validation des pièces d'achat », le taux de la commande suit jusqu'à la facture. Avec (V10.11), il est recalculé à chaque pièce, puis grisé (page « Réactualiser le taux de change… (V10.11) »).",
        "Adresse de réception (V10.11, dossier, onglet « Pièce 3 ») : dossier, établissement ou dépôt ; introuvable = celle du dossier (page « Choisir l'adresse de réception de la marchandise (V10.11) »).",
        "ARC, en-tête (onglet « Livraison ») : Statut ARC (AR total ou partiel), numéro, date. Les lignes les reprennent (modifiables). En-tête « AR partiel » : au moins une ligne doit être en partiel (contrôle non bloquant). Tout suit jusqu'à la facture.",
        "`Commande fournisseur / Relance ARC` : par défaut, filtre « AR attendu » + « AR partiel ». Relance par téléphone, ou par mail (processus).",
        "`Commande fournisseur / Retard de livraison commande` : en retard = délai reporté dépassé, s'il est renseigné. Le délai demandé ne sert qu'en dernier recours."
      ],
      retenir: "ARC = statut, numéro, date ; retard = délai reporté dépassé, s'il existe.",
      source: { titre: "L'accusé de réception pour les commandes d'achat (V10.11)", url: "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704721472/L+accus+de+r+ception+pour+les+commandes+d+achat+V10.11" }
    },
    {
      titre: "Pré-réception et réception",
      exemple: "HydroPompes annonce 40 pompes (avis d'expédition).\n- Avis saisi → « En réception » : 40, police normale.\n- Pompes au quai : pré-réception → 40 en gras.\n- BL généré → elles entrent en stock.",
      points: [
        "C'est le BL fournisseur qui fait entrer en stock : saisi en direct, ou issu de la validation de la commande en BL (page « Gérer les achats »).",
        "`BL Fournisseur / Saisie des réceptions`, avec la coche du dossier « Gérer la pré-réception pour le magasinier en saisie des réceptions ». Avis saisi = « En réception » en police normale (en transit). Marchandise pointée au quai = en gras : la réception peut se faire.",
        "Avis d'expédition en fichier : le dataset RECEPFOU du Data Hub (V10.5) crée une pré-saisie de la réception ; n° de commande obligatoire (page « Pré-réception fournisseur (V10.5) »).",
        "Dates (V10.11) : date d'expédition et date de réception, jamais avant l'expédition. Chaque ligne validée en pré-réception remet la date du jour : la dernière opération fixe la date du BL.",
        "Deux commandes avec une remise en pied, sur un même BL (V10.9) : le BL additionne les deux remises ; la répartition par ligne est recalculée (page « Gérer les achats »)."
      ],
      retenir: "« En réception » : police normale = en route, gras = arrivé ; c'est le BL qui fait entrer en stock.",
      source: { titre: "Saisie des préparations/pré-réceptions", url: "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704711219/Saisie+des+pr+parations+pr+-r+ceptions" }
    },
    {
      titre: "Reliquats et lignes non livrées",
      exemple: "12 liners commandés chez LinerSud, 8 livrés.\n- Reliquats gérés → 4 restent actifs.\n- Modèle arrêté → « solde du reliquat », motif « Fin de série » → ligne « Périmé ».",
      points: [
        "Reliquats : 3 réglages. Dossier : « Autoriser la gestion des reliquats à la ligne ». Fiche fournisseur : « Gérer les reliquats en commande ». Commande : « Accepte les reliquats » (page « Saisie des préparations/pré-réceptions »).",
        "En saisie des réceptions, sans reliquats (V10.6) : réception partielle possible, après confirmation, mais la commande passe « périmée » et le reste est perdu (même page).",
        "Solder en validation en BL : mode fiche de la ligne, onglet « Généralités », case « solde du reliquat » (visible seulement si la ligne est en reliquat). La ligne passe « Périmé ».",
        "Motif : table `Motif solde reliquats`, saisi sur la ligne de commande (onglet « Livraison ») ; obligatoire si le dossier le demande.",
        "Ligne à ne pas livrer : par défaut, pas de suppression en validation ; mets sa quantité à 0, la trace reste. Suppression possible si le dossier coche « Autoriser la suppression de mouvement en validation de pièce » (page « Suppression de ligne en validation de pièce (V10.5) »)."
      ],
      retenir: "Reliquat jamais livré : on le solde ; ligne à ne pas livrer : quantité à 0.",
      source: { titre: "Solder une ligne de commande en reliquat (V10.5)", url: "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704717964/Solder+une+ligne+de+commande+en+reliquat+V10.5" }
    },
    {
      titre: "Contrôle qualité et n° de série",
      exemple: "30 bidons de chlore reçus, à contrôler.\n- En stock, mais « non contrôlés » : un client en veut 5 → impossible de les sortir.\n- Contrôle signalé sur le BL → les bidons sont libres.",
      points: [
        "Entrée pas encore contrôlée : stock physique, mais compteur à part (stock non contrôlé). Ni vente, ni sortie interne. Elle figure quand même dans les inventaires.",
        "3 coches, toutes nécessaires : dossier (onglet Options, « Gérer le contrôle qualité ») ; fiche fournisseur (« Effectuer un contrôle qualité de la marchandise ») ; référencement fournisseur de l'article (même coche).",
        "Libérer, sur le BL fournisseur : tout = coche « Contrôle qualité effectué » de l'en-tête (onglet « Complément ») ; une position = même colonne sur la ligne ; une ventilation = colonne « Contrôle » à « oui ».",
        "Rapport de contrôle (V10.5) : `Interrogation / Stock et disponible`, bouton `Rapport de contrôle`. Avec Divalto Contrôle : accepté = lot contrôlé ; refusé = stock en litige, circuit des non-conformes (page « Cas du contrôle réception »).",
        "N° de série en génération auto (V10.7, option utilisateur `F3`) : le premier n° n'a qu'une partie numérique, assez longue pour la quantité. 50 pièces : « P01 », pas « P1 » (page « Accélération de la saisie des numéros de série/lot… (V10.7) »)."
      ],
      retenir: "Contrôle qualité : 3 coches ; pas encore signalé sur le BL = stock bloqué.",
      source: { titre: "Gérer les achats", url: "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704718965/G+rer+les+achats" }
    },
    {
      titre: "Le contrôle facture : rapprocher et traiter les écarts",
      exemple: "Facture LinerSud : 10 liners à 105 €, commandés à 100 €, tous reçus.\n- Écart de prix : 5 € par liner.\n- « Génération code » = « Avoir financier » → demande d'avoir de 50 €.",
      points: [
        "Il compare facturé et reçu, et lie la facture à ses BL. Accès : `Facture fournisseur / Contrôle facture fournisseur`, ou le Data Hub.",
        "En-tête : fournisseur, date de facture, n° de pièce du fournisseur. Une commande ne se rapproche que si elle est déjà validée en BL.",
        "Ligne « en rejet » (ex. : différence de prix) : elle est écartée, et la facture ne peut plus être générée (« Génération de facture impossible »).",
        "Écart (V10.9), colonne « Génération code » : prix ou remise → « Avoir financier » ; trop livré renvoyé → « Avoir retour » ; trop livré gardé → « Facture ». Un écart de prix ne donne jamais un avoir retour.",
        "La demande d'avoir est un devis ou une commande (choix du dossier, champ « Génération DA »), à montant positif : le code opération porte le sens.",
        "Codes opération (coche « Demande d'avoir fournisseur ») : avoir financier = sortie sans stock ; avoir retour = sortie avec stock ; demande de facture = entrée sans stock."
      ],
      retenir: "Prix ou remise → avoir financier ; trop livré renvoyé → avoir retour ; trop livré gardé → facture.",
      source: { titre: "Le contrôle facture fournisseur", url: "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704720571/Le+contr+le+facture+fournisseur" }
    },
    {
      titre: "Visa, comptabilité, cut-off et RFA",
      exemple: "30 juin : chlore reçu, pas de facture → cut-off : FNP, extournée le 1er juillet.\n- 5 juillet : facture reçue. Visa exigé → ta responsable vise, tu génères la facture.\n- Intégration comptable, sans impression.",
      points: [
        "Visa : exigé si la fiche fournisseur coche « Nécessite une validation manuelle du contrôle facture ». La coche compte à la création du contrôle : la décocher ensuite ne dispense pas ce contrôle-là.",
        "Tolérances : l'assistant essaie la tolérance de rapprochement, puis celle d'acceptation. La tolérance d'acceptation de la fiche fournisseur doit dépasser celle du dossier ; elle prime (page « Traitement de Contrôle factures fournisseurs »).",
        "`Facture fournisseur / Intégration comptable` : contrairement aux ventes, une facture d'achat n'a pas besoin d'être imprimée avant (page « Intégration des pièces commerciales en comptabilité »).",
        "Cut-off : BR fournisseur sans facture, ou facturé après la date d'arrêté = facture non parvenue (FNP). L'extourne se fait le lendemain, si la règle de cut-off la génère (page « Le Cut-off dans l'ERP »).",
        "RFA (bonification fournisseur, V10.5) : après le calcul, `Facturation` crée une facture au fournisseur. Il lui faut un compte client (« Client à facturer » du contrat). Pas d'avoir auto-généré (page « Gérer les BFA-RFA »)."
      ],
      retenir: "Visa : figé à la création du contrôle ; facture d'achat : pas d'impression avant la comptabilité.",
      source: { titre: "Le contrôle facture fournisseur", url: "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704720571/Le+contr+le+facture+fournisseur" }
    },
    {
      titre: "Dématérialisation, Factur-X et EDI",
      exemple: "Dans le Data Hub :\n- Facture ChloroPlus en Factur-X, sans pivot → XML lu, rapprochement avec le BL.\n- Abonnement du logiciel de caisse, sans commande → écriture en attente, à viser.",
      points: [
        "Data Hub : chaque facture dématérialisée y devient un dataset. Facture d'achat → rapprochement avec les commandes ; sans achat (abonnement…) → écriture en attente. Le pivot (`.dhub`) n'est jamais mis à jour ; le dataset, si.",
        "Dataset corrigé : `Ré-injecter dans l'automate`, pour que la correction soit traitée (page « Navigation et utilisation de la dématérialisation… »).",
        "Écriture en attente venue du Data Hub : visa obligatoire avant l'intégration (`Viser l'écriture`, droit CEv). Saisie directe : visa facultatif (page « Saisie des écritures en attente »).",
        "Factur-X (V10.11) seule : le Data Hub lit le XML embarqué, sans pivot. Avec un pivot : traitée comme un PDF classique (page « Intégrer une facture au format Factur-X par le datahub (V10.11) »).",
        "Identification du dossier et du fournisseur (V10.13) : SIRET, GLN, DUNS, en recherche cumulative. Bon réflexe : renseigne-les tous sur les fiches, sinon la facture s'arrête (page « Intégration technique des Factures Factur‑X… »).",
        "EDI sortant : support « EDI » ou « EDI et papier » sur la fiche du tiers (onglet Documents). Fichier créé à l'impression, dans `EDI_PIECES`, avec par défaut la référence externe du tiers (sans référencement : aucune) (pages « Impression de pièce en EDI » et « Le fichier pivot et les fichiers compagnons »)."
      ],
      retenir: "Facture d'achat → rapprochement ; facture sans achat → écriture en attente, à viser.",
      source: { titre: "Les factures fournisseurs traitées par la dématérialisation", url: "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704720297/Les+factures+fournisseurs+trait+es+par+la+d+mat+rialisation" }
    },
    {
      titre: "Le CBN et les propositions d'achat",
      exemple: "Pompe HP-300 : commandes clients 90, stock 35, commande fournisseur en cours 25.\n- Besoin net = 90 − (35 + 25) = 30.\n- Le CBN propose un achat chez HydroPompes ; tu le valides en commande.",
      points: [
        "Besoin net = besoin brut − (stock + approvisionnements prévus). Besoin brut = commandes clients, parfois prévisions. Articles gérés en stock seulement.",
        "`Stocks / Réapprovisionnement / Calcul des besoins` : régénératif = anciennes propositions non traitées supprimées ; complémentaire = gardées, le CBN en ajoute.",
        "Méthode, sur la fiche « Réappro ». Global : articles C, peu chers ; n'évite pas les ruptures. À date sur portefeuille : stock virtuel jour par jour ; articles A, B, chers. Historique des consommations : 12 derniers mois. Contremarque : réceptionnée (livrée chez toi) ou directe (livrée chez ton client).",
        "Délai de sécurité : la commande est proposée plus tôt d'autant de jours ; la date du besoin ne bouge pas.",
        "Délai entre deux commandes : le CBN regroupe les besoins de cette période. Piège : vide (dossier et famille de réappro) = 30 jours.",
        "`Administration des propositions` : propositions en unités d'achat (lignes générées aussi), modifiables avant validation. Montant en rouge = seuil tarifaire du fournisseur pas atteint (option du dossier).",
        "Validation « au statut provisoire » = commandes « préparées », cachées par défaut dans le zoom ; `Activation des commandes fournisseurs` les rend actives."
      ],
      retenir: "Besoin net = brut − (stock + appros prévus) ; commandes préparées = à activer.",
      source: { titre: "Utiliser le CBN (Calcul des Besoins Nets) - Réapprovisionnement", url: "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11705849126/Utiliser+le+CBN+Calcul+des+Besoins+Nets+-+R+approvisionnement" }
    }
  ]
};
