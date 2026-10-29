// Divalto 10.13 — Fiche de cours du module dv01 « Le cycle de vente ».
// Fond écrit à partir de la base documentaire Divalto (dépôt Divalto_10), lue en lecture seule.
// Chaque section cite sa page. Une info venant d'une autre page le dit en fin de point : (page « … »).
LEARNSQL.cours.dv01 = {
  intro: "Dans Divalto, une vente suit un cycle de pièces : devis, commande, BL, facture, et parfois avoir. Savoir ce que fait chaque pièce (stock, encours, comptabilité) évite les erreurs et les blocages.",
  sections: [
    {
      titre: "Du devis à la commande : la transformation",
      exemple: "Le magasin AquaBleu accepte le devis D-500 : pompe, liner, filtre. Tu fais « Valider en commande ».\n- Pompe à 10 → elle passe sur la commande.\n- Liner à 0 → il reste en reliquat sur le devis.\n- Filtre supprimé → il disparaît du devis ET de la commande.\n- Robot ajouté → il va seulement sur la commande.",
      points: [
        "Menu `Validation` > « Valider en commande », depuis la saisie des devis. Un devis peut aussi aller directement en BL, ou même en facture.",
        "En transformation, on travaille sur les 2 pièces en même temps : celle d'origine et la nouvelle.",
        "Quantité à 0 = la ligne n'est pas transformée. Elle reste en reliquat sur la pièce d'origine (si les reliquats sont gérés pour cette pièce).",
        "Supprimer une ligne = elle est supprimée sur les 2 pièces (avec confirmation). Ajouter une ligne = elle va seulement sur la nouvelle pièce.",
        "Sur une ligne : clic droit sur la quantité = stock et disponible de l'article. `Ctrl+R` = texte de ligne, `Ctrl+N` = note de ligne, `Ctrl+D` = libellé complémentaire.",
        "Adresse « Manuelle » = saisie libre, pour cette pièce seulement (ex. : livrer le client de votre client). Autres types : Codifiée, ou « Identique à » (devis, commande, BL, facture), qui reprend une adresse manuelle déjà saisie sur la pièce."
      ],
      retenir: "En transformation : 0 = reliquat, supprimer = sur les 2 pièces, ajouter = sur la nouvelle seulement.",
      source: { titre: "Création d'une commande de vente", url: "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704712833/Cr+ation+d+une+commande+de+vente" }
    },
    {
      titre: "Délais de livraison et échéances multiples",
      exemple: "AquaBleu paie sa commande de liners en 3 traites :\n- 1/3T30 (un tiers à 30 jours)\n- 1/3T60 (un tiers à 60 jours)\n- ST90 (S = le solde, à 90 jours)",
      points: [
        "Échéances multiples : en-tête de la pièce, onglet « Échéances multiples ».",
        "Ventilation : un montant fixe, une fraction (`2/3`), un pourcentage (`15%`), ou `S` pour le solde.",
        "Calcul à l'impression de la facture (sauf mode de règlement en échéance manuelle). Toutes les échéances prennent la même date de base : livraison ou facturation.",
        "Délais : en-tête de la commande, onglet « Complément », groupe « Livraison ». Il y en a 3 : demandé, accepté, reporté.",
        "Délai actif : le reporté s'il existe, sinon l'accepté, sinon le demandé.",
        "Les délais de l'en-tête sont recopiés sur les lignes. Chaque ligne peut avoir le sien. Clic droit sur un délai de l'en-tête > « Propager sur lignes » = toutes les lignes d'un coup."
      ],
      retenir: "Le délai actif est le reporté, sinon l'accepté, sinon le demandé.",
      source: { titre: "Echéancement et délai", url: "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704712865/Ech+ancement+et+d+lai" }
    },
    {
      titre: "Le référencement client",
      exemple: "Ta pompe POMPE-01 s'appelle « PX-77 » chez le client DURAND. En saisie de commande, tu peux taper PX-77.",
      points: [
        "Le référencement relie notre référence article à la référence du client. En saisie de pièces, on peut alors utiliser les références du client.",
        "On peut y ajouter une quantité minimale et un multiple de commande. Ils informent l'utilisateur à la saisie.",
        "Créer : fiche article, bouton `Référencement`. Voir tous les articles référencés d'un client : fiche client, bouton `Référencement`.",
        "Accepter SEULEMENT les articles référencés : cocher « Contrôler le référencement client » à 2 endroits. 1) Le dossier (`Fichiers / Organisation / Dossiers`, onglet « Pièces »). 2) La fiche client (onglet « Livraison et facturation »).",
        "Client-groupe : avec la case du dossier (onglet « Pièces 2 »), on voit aussi les articles référencés sur la centrale du client. Ils ont un « G ».",
        "En saisie de pièce : `Interrogation` > « Fiche référencement » ouvre ou crée le référencement du couple client-article de la ligne."
      ],
      retenir: "Pour contrôler le référencement, il faut 2 coches : une dans le dossier, une dans la fiche client.",
      source: { titre: "Référencement client", url: "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704713007/R+f+rencement+client" }
    },
    {
      titre: "L'encours client : plafonds, contrôle et blocage",
      exemple: "Le pisciniste MARTIN a un plafond direction de 50 000 €.\n- Encours comptable : 30 000 €\n- Encours livraison : 25 000 €\n- Total : 55 000 € → dépassement → sa commande de liners peut être bloquée.",
      points: [
        "Plafonds : fiche client, onglet « Généralités », groupe « Encours en EUR ». Plafond direction = le risque maximum voulu pour ce client. Plafond assurance = la couverture de l'assurance.",
        "Pas de plafond = pas de contrôle d'encours. Seules les pièces saisies APRÈS la mise en place des plafonds comptent. Elles sont cochées « pièce assurée » par défaut.",
        "Encours financier = solde du compte client en comptabilité + factures en attente d'intégration comptable. Encours livraison = commandes et BL ouverts à date.",
        "Divalto compare encours comptable + encours livraison au plafond (page « Gestion de l'encours client »). Pour bloquer : coche « Bloquer la commande si dépassement d'encours client », dans le dossier, onglet « Pièces ». Un message propose alors de bloquer la commande.",
        "Commande bloquée : plus de livraison, préparation (WMS, BP), facture, OF, pièce interco ni contremarque. Elle sort du CBN. Déblocage : `Options` > « Modifier l'état de la pièce » > « Déblocage », avec le droit de confidentialité adapté (page « Gestion de l'encours client »).",
        "Encours faux ? Livraison : utilitaire `Commerce & Logistique / Utilitaires / Procédures de mise à jour / Mise à jour de l'encours de livraison`. Financier : calculé seul si « lié à Divalto Règlement » est coché dans le dossier comptable ; sinon, lancer souvent l'utilitaire de la Comptabilité « Mise à jour encours Divalto Commerce & logistique »."
      ],
      retenir: "Sans plafond, pas de contrôle ; avec un plafond, Divalto compare encours comptable + encours livraison.",
      source: { titre: "Généralités de fonctionnement", url: "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704713049/G+n+ralit+s+de+fonctionnement" }
    },
    {
      titre: "Gratuité, confirmation et reliquats",
      exemple: "AquaBleu commande 10 pompes (commande C-1001). Le BL n'en prend que 6.\n- 6 pompes : actives sur le BL.\n- 4 pompes : restent actives en reliquat sur la commande.",
      points: [
        "Ligne gratuite : prix à 0 ou case « gratuit ». Le prix net est gardé pour info : onglet « Tarification », champ « Prix net origine ». Réappliquer le tarif standard garde le gratuit.",
        "Motif de gratuité : onglet « Tarification », champ « Code motif ». S'il est obligatoire (dossier, onglet « Pièces2 »), il faut un motif par défaut pour les décompositions ET pour les cadeaux (remises seuil).",
        "Reliquats : on les active dans le dossier (onglet « Pièces »), puis on affine dans la fiche client (devis, commande, BL, gestion à la ligne). Une pièce est en reliquat tant qu'une ligne reste active.",
        "Ligne transformée en partie : la partie transformée est active sur la nouvelle pièce (périmée sur l'initiale). Le reste reste actif sur la pièce initiale.",
        "Petit cadenas = ligne validée dans ce document, plus modifiable. « Masquer les lignes validées » (Oui/Non) : réglé dans le dossier, affiné dans la fiche client.",
        "À savoir : « Pièce confirmée » = case de l'onglet complément de l'en-tête (commandes client seulement, une icône l'affiche). Articles habituels = zoom article `F9`, case « Uniquement les articles facturés » au client sur une période. Attestation de conformité : seule la mention est imprimée, pas le fichier."
      ],
      retenir: "Les reliquats s'activent dans le dossier, puis s'affinent dans la fiche client.",
      source: { titre: "Conformité, gratuité, articles habituels, confirmation de commande, reliquats", url: "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704713116/Conformit+gratuit+articles+habituels+confirmation+de+commande+reliquats" }
    },
    {
      titre: "Le BL de vente",
      exemple: "Commande C-1001 (10 pompes) → « Valider en BL » → BL B-300 : les pompes sortent du stock. La pompe est suivie par lot → le n° de lot est obligatoire sur le BL.",
      points: [
        "Le BL n'est pas obligatoire pour le client : c'est un service, il montre ce qui est livré. Mais c'est LUI qui génère les mouvements de stock.",
        "Créer : depuis un devis ou une commande, `Validation` > « Valider en BL », ou `BL client / Validation de pièces en BL`. Sans numéro saisi : numérotation automatique. Saisie directe : `BL client / Saisie des BL`, comme un devis ou une commande.",
        "Écran de transformation : « quantité initiale » = quantité commandée. « Quantité livrée » = ce qui est en théorie dans le colis.",
        "Coche dossier « les articles doivent être en stock à la sortie » (onglet « Stock ») : sans quantité disponible, la ligne ne peut pas être saisie. Article suivi par lot ou série : la zone est obligatoire au BL (saisissable dès la commande).",
        "Bloquer un BL pour la facturation : en-tête, onglet « Facturation – Impression », case « Attente d'informations ». On décoche pour débloquer.",
        "Annulation (`BL client / Annulation de BL`) : régularise le stock par une pièce interne, pour tout ou partie des quantités. Bouton « Tout » = quantité d'origine. Bouton « RAZ » = remise à zéro."
      ],
      retenir: "Le BL sort le stock, et « Attente d'informations » bloque sa facturation.",
      source: { titre: "Le BL de vente", url: "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704713646/Le+BL+de+vente" }
    },
    {
      titre: "La facture : créer, regrouper, calculer l'échéance",
      exemple: "AquaBleu est en mode « Une commande par facture ». Sa commande de liners part en 3 BL → 1 seule facture.\nPort à 10 € par BL : 2 BL regroupés → 20 € de port.",
      points: [
        "Saisie directe (`Facture Client / Saisie des factures`) : la quantité livrée sort du stock. La quantité facturée fait le montant, donc la comptabilisation.",
        "Validation de pièces en facture : 3 quantités (livrée, facturée, en reliquat). Le reliquat dit si l'écart est un reste à facturer ou un article offert.",
        "Facturation différée : `Facture Client / Facturation différée des BL` (critères : client, n° de BL, période, commercial, code opération, mode de facturation). `Outils` > « Pointer les bons de livraison » pour choisir les BL.",
        "Mode de facturation (fiche client, onglet « Livraison et facturation ») : un BL par facture, une commande par facture, ou regroupement de BL (facture récapitulative). Périodicité : à la demande, semaine, décade, quinzaine, mois.",
        "Regroupement : il faut les mêmes conditions (devise, mode de règlement, escompte, périodicité, code opération, régime TVA et TPF, adresse de facturation, RIB, franco…). Les frais de port se cumulent : un forfait par BL (V10.4).",
        "Échéance : table des modes de règlement, onglet « Échéance ». Piège : 30, 60, 90 jours sont comptés en mois. Facture du 31/03 → 30/04. Facture du 30/04 → 31/05."
      ],
      retenir: "Quantité livrée = stock, quantité facturée = montant, et « 30 jours » = 1 mois.",
      source: { titre: "La facture", url: "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704713774/La+facture" }
    },
    {
      titre: "La facture : impression, brouillon, traites et commissions",
      exemple: "Facture F-800 d'AquaBleu (pompes et liners) :\n1. Impression brouillon : filigrane, encore modifiable.\n2. Tu corriges.\n3. Impression normale : archivée, figée.\n4. Impression de la traite séparée.",
      points: [
        "Impression normale : archivée, comptabilisable. La facture n'est plus modifiable (V10.4).",
        "Impression brouillon : pour contrôler, sans archive ni comptabilisation. Filigrane « brouillon », la facture reste modifiable. Par défaut : réglage du dossier. Depuis l'icône imprimante : cocher « impression immédiate » ET « impression brouillon ».",
        "Exception (V10.10) : tant que la facture client n'est pas intégrée en comptabilité, on peut encore modifier les commerciaux et les axes analytiques, avec une confidentialité dédiée.",
        "Traite en pied de facture si le mode de règlement le prévoit (champ « Traite »). Traite séparée : `Facture Client / Impression des traites`, seulement si la facture est déjà imprimée. Par défaut, pas de réédition (option « Réimpression des traites »).",
        "Commission : calculée à chaque ligne, en croisant les classes commercial × client × article (table « Classe de commission »). Rien trouvé ? Le taux global du commercial s'applique (fiche commercial, champ « Taux de commission »).",
        "Les commissions ne sont ni comptabilisées, ni réglées automatiquement. La liste `Listes / Commissionnement` les calcule sur une période."
      ],
      retenir: "Brouillon = on contrôle et on peut modifier ; normale = la facture est figée.",
      source: { titre: "La facture", url: "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704713774/La+facture" }
    },
    {
      titre: "L'avoir, le lien avec la facture d'origine et le retour client",
      exemple: "AquaBleu renvoie un liner abîmé. Facture F-800 → duplication avec « Créer une pièce d'avoir » → avoir A-801.\n- « Facture associée » = F-800, rempli tout seul.\n- Depuis l'avoir : `Interrogation` > « Facture d'origine ».",
      points: [
        "Créer : `Facture Client / Saisie des avoirs`, ou dupliquer la facture en cochant « Créer une pièce d'avoir ». Saisie comme une facture, seul le code opération change ; même compteur de numéros que les factures (page « La facture »).",
        "Le lien avec la facture d'origine est gardé dans les 2 cas : champ « Facture associée » (en-tête, onglet « Complément »). Saisi à la main en saisie directe, reporté seul en duplication. Le n° est imprimé sur l'avoir.",
        "Depuis l'avoir : `Interrogation` > « Facture d'origine ». Depuis la facture : `Interrogation` > « Avoirs ». En V10.10, ce dernier choix demande l'option `Affichage` > « Afficher les avoirs associés » (page « La facture »).",
        "Contrôles du dossier (V10.8, onglet « Pièces », pavé « Gestion des avoirs ») : même devise, facture d'origine imprimée. « Contrôler le montant TTC de la pièce » : un avoir au TTC plus grand que la facture ne peut pas être validé. Les contrôles de quantité et de montant de ligne demandent aussi « Contrôler l'existence de la Ref » (page « La facture »).",
        "Avec retour : la quantité retournée va en « Quantité livrée ». Sans retour : quantité livrée à 0, seul un flux financier est créé. Retour à détruire : dans `BL client / Saisie retour client`, mettre sur la ligne un code opération qui ne met pas à jour le stock (case « Ne pas mettre à jour le stock », script `gt_11338.sql`) (page « La facture »).",
        "Attention, contradiction : la page « La facture » dit encore « Il n'existe pas de mémorisation automatique d'un numéro de facture dans un avoir ». C'est une ancienne phrase : depuis la V10.6, le lien est gardé."
      ],
      retenir: "Avoir par duplication = lien automatique avec la facture d'origine.",
      source: { titre: "Lien Avoir - facture d'origine (V10.6)", url: "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704718098/Lien+Avoir+-+facture+d+origine+V10.6" }
    }
  ]
};
