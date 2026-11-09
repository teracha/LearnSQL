// Divalto 10.13 — Fiche de cours du module dv03 « Achats, partie 2 ».
// Fond écrit à partir de la base documentaire Divalto (dépôt Divalto_10), lue en lecture seule.
// Chaque section cite sa page. Une info venant d'une autre page le dit en fin de point : (page « … »).
LEARNSQL.cours.dv03 = {
  intro: "Après le cycle d'achat de base, Divalto offre des outils pour acheter juste ce qu'il faut, au bon prix et au bon coût : contremarque, Aide à l'Achat, frais d'approche, relances. Bien les régler évite les ruptures, les commandes en double et les coûts de revient faux.",
  sections: [
    {
      titre: "La contremarque : acheter pour une commande client",
      exemple: "Le pisciniste MARTIN commande une pompe à chaleur. Tu n'en as pas en stock : tu la passes en contremarque.\n- Directe : le fournisseur livre MARTIN, sans passer par ton dépôt.\n- Réceptionnée : le fournisseur te livre, puis tu livres MARTIN.",
      points: [
        "La contremarque achète juste ce qu'il faut pour une commande client, en directe ou en réceptionnée.",
        "Articles possibles : un article de contremarque, ou un article normal géré en stock. Un article hors stock ne fonctionne pas en contremarque, un article éphémère non plus (page « Saisie de pièce de contremarque »).",
        "L'article a un fournisseur principal, proposé par défaut. Délai, minimum et multiple viennent de la sous-fiche « conditions de réapprovisionnement » (bouton `Fournisseur`), qui n'est pas créée toute seule (page « Contremarque : Conditions de réapprovisionnement »).",
        "En saisie, pas d'alerte « Disponible insuffisant » sur un article de contremarque (page « Saisie de pièce de contremarque »).",
        "L'assistant s'ouvre seul à la validation d'une commande en création, si le dossier coche « Lancer automatiquement à la création de commande client ». Sinon : bouton `Générer contremarque` (pages « Paramétrage Fiche dossier - Onglet Contremarque » et « Assistant de création de commandes de contremarques fournisseur »).",
        "Le CBN a aussi ses méthodes de contremarque : en directe, il commande la quantité exacte du client, sans minimum ni multiple (page « Utiliser le CBN (Calcul des Besoins Nets) - Réapprovisionnement »)."
      ],
      retenir: "Contremarque : jamais un article hors stock ; délai, minimum et multiple viennent des conditions de réapprovisionnement.",
      source: { titre: "La contremarque", url: "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704719489/La+contremarque" }
    },
    {
      titre: "Suivre, arbitrer et grouper les commandes de contremarque",
      exemple: "Commande de PISCINES DURAND : un liner en directe, un robot en réceptionnée.\n- Le liner n'a pas encore de commande fournisseur : rouge.\n- Le robot a la sienne, complète : vert.\nDans l'explorateur, la pièce affiche « directe rouge » : le pire cas d'abord.",
      points: [
        "Couleurs, calculées sur les réservations affectées : rouge = pas de commande fournisseur, orange = lien incomplet, vert = lien complet. Sur la pièce, le pire cas d'abord ; à couleur égale, la directe passe avant (pages « Les indicateurs de contremarque _ Principes » et « Les indicateurs de contremarque : technique »).",
        "L'arbitrage (bouton `Arbitrer contremarque`) : choisir le fournisseur, compléter une commande existante, supprimer le lien.",
        "En directe (V10.6), on ne complète qu'une commande d'achat qui a la même adresse de livraison. Un prix spécial négocié (V10.4) fait proposer son fournisseur, même non référencé.",
        "Note interne de la commande client (V10.4) : #F2N# = note de la ligne fournisseur, pour l'acheteur ; #F2T# = texte de la ligne, pour le fournisseur.",
        "Commande provisoire (V10.5) : on la complète au fil de l'eau, on l'envoie au bon volume. Si le dossier coche « Compléter par défaut une commande provisoire existante », Divalto la propose, à adresse de livraison égale. Urgence (V10.9) : case D ou A pour une commande active, la provisoire ne bouge pas (page « Commandes provisoires en contremarque (V10.5) »).",
        "Génération en masse (V10.10) : cocher directe et/ou réceptionnée, sinon rien ne tourne. Avec les contraintes fournisseur, 4 lignes de 3 et un minimum de 20 donnent 4 ventilations de 3 réservées et 1 de 8 sans réservation (page « Générer en masse les commandes fournisseur de contremarque (V10.10) »)."
      ],
      retenir: "Rouge = pas de commande fournisseur ; #F2N# parle à l'acheteur, #F2T# au fournisseur ; une provisoire se complète à adresse égale.",
      source: { titre: "Arbitrage de la contremarque", url: "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704719788/Arbitrage+de+la+contremarque" }
    },
    {
      titre: "Après la réception : la post-réception de contremarque",
      exemple: "Contremarque directe : le fournisseur livre le chantier de PISCINES DURAND en 3 fois, 20 sacs de sel à chaque fois.\n- Tu fais ensuite le BL client.\n- Il porte une seule ligne de 60 sacs, avec 3 ventilations : une par livraison.",
      points: [
        "La post-réception s'ouvre à la validation du BL fournisseur si le dossier le prévoit (onglet Contremarque) : toujours, seulement en directe, ou seulement en réceptionnée.",
        "Le BL client reprend les réservations, les emplacements, les lots ou séries du BL fournisseur, et les coûts de revient.",
        "V10.12 : la quantité à livrer se modifie, sans dépasser le livrable. Une ligne à 0 n'est pas sur le BL client ; si tout est à 0, la validation est bloquée.",
        "Directe livrée en plusieurs fois : une ligne client, le détail en ventilations. Directe soldée à une quantité proche (1 000 litres commandés, 1 023 livrés) : le client reçoit la quantité réelle, sans reliquat, si les reliquats à la ligne sont gérés (dossier sur Toujours, et tiers).",
        "Réceptionnée, si le dossier active le contrôle des délais (onglet Contremarque) : à l'enregistrement de la commande fournisseur, si livraison fournisseur + temps de traitement dépasse le délai confirmé au client, Divalto propose de reporter ce délai. Rien ne change sans ton Oui.",
        "Dépôt en WMS : la directe se valide en BL dans Divalto, sans les programmes WMS, car rien n'entre dans ton dépôt (page « Contremarque, réservations affectées sur commande et le WMS »)."
      ],
      retenir: "Post-réception : on livre ce qui est arrivé (0 = pas livré) ; directe soldée à une quantité proche = quantité réelle, sans reliquat.",
      source: { titre: "Post réception de contremarque", url: "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704719606/Post+r+ception+de+contremarque" }
    },
    {
      titre: "L'Aide à l'Achat",
      exemple: "Lundi matin, fournisseur de pompes : 6 propositions du CBN, 2 demandes d'achat du SAV, 1 commande provisoire de contremarque. Tu réserves le fournisseur, tu ajustes les quantités, tu génères une seule commande.",
      points: [
        "Menu `Administration achats / Commande fournisseur / Aide à l'Achat` (V10.9) : propositions CBN, demandes d'achat et commandes provisoires de contremarque, avec les statistiques de l'article (page « Aide à l'Achat (V10.9) »).",
        "Elle ne remplace pas le CBN : la collecte lit ce qui existe, sans lancer de CBN. Lance le CBN avant. L'épuration ne vide que les sources collectées pendant cette exécution (page « Ecran de sélection »).",
        "`Réserver le fournisseur` le bloque pour les autres acheteurs ; `Libérer le fournisseur` quand tu as fini.",
        "La quantité retenue se modifie (`F4`). « Annuler proposition » la met à 0 : la ligne reste visible.",
        "« Générer commande » (active, provisoire, ou complément d'une provisoire) verrouille les sources. Si tu retiens moins que calculé et que ça couvre une source en partie, toutes les sources sont traitées en totalité ; la demande d'achat passe périmée."
      ],
      retenir: "Aide à l'Achat : CBN d'abord ; réserve le fournisseur, ajuste, génère ; tout ce qui est généré est verrouillé.",
      source: { titre: "Ecran d'administration des résultats", url: "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704721667/Ecran+d+administration+des+r+sultats" }
    },
    {
      titre: "Frais d'approche et import (Grand Import)",
      exemple: "Conteneur de 200 pompes venu de Chine. Facture du transitaire : fret et douane. Tu lies cette facture et la commande de pompes à une fiche de frais d'approche, tu lances le calcul : le coût de revient des pompes monte.",
      points: [
        "Frais d'approche = tous les frais d'import : fret, douane, stockage, taxes portuaires. On les active dans le dossier, bouton `Grand Import`.",
        "Le type de frais fixe le pourcentage du frais à répartir, et le mode : quantité, montant, poids ou volume. Un type posé sur la fiche de frais (bouton `Types de frais`) est cherché en premier ; sinon, celui de l'article de frais.",
        "Frais en pied de pièce : pris seulement si « Prendre en compte pied de pièce fournisseur » (1, 2 ou 3) est coché dans le dossier Grand Import.",
        "Le calcul met à jour le coût des entrées, puis des sorties liées. La fiche sous-référence ne change qu'à l'entrée de la marchandise, sauf option (V10.8).",
        "Calcul relançable tant que la fiche n'est pas « terminée » ; une fois terminée, on la remet en Actif. Avoir (V10.10) : CR = (achat – avoir + frais) / quantité actualisée ; un avoir financier ne retire pas de quantité.",
        "Fiche Grand Import : on coche les étapes du trajet. Après des écritures de stock en transit, plus de nouvelle liaison.",
        "Déclaration en douane, DED (V10.9, hors Union européenne) : pas d'administration des frais d'approche, les frais se rattachent à la fiche Grand Import. Un seul article sans nomenclature douanière bloque tout le calcul."
      ],
      retenir: "Frais d'approche : % du type de frais puis répartition ; pieds de pièce cochés dans le dossier ; fiche terminée = plus de calcul.",
      source: { titre: "Gérer le module Grand Import (V10.4)", url: "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704724280/G+rer+le+module+Grand+Import+V10.4" }
    },
    {
      titre: "Relancer les fournisseurs",
      exemple: "Ton fournisseur de liners n'a pas répondu à ta demande de prix, et deux commandes sont en retard. L'une porte un carré plein : un client l'attend. Tu la relances en premier, par courriel.",
      points: [
        "Menu `Administration achats / Devis fournisseur / Relance de pièce fournisseur` : relance une réponse ou une livraison attendue, sur un devis ou une commande.",
        "Champ « délai » (V10.5) : il est comparé au délai de livraison de la pièce, pour ne garder que les pièces en retard.",
        "Carré plein ou demi-carré (V10.5) = réservations affectées : un client attend la marchandise. Relance ces lignes d'abord.",
        "Relance par courriel : si le code action RELANCE_DEV_CDE_FOU existe, l'action et son processus traitent ; sinon, envoi direct avec un texte de relance. Un événement est créé.",
        "`Commande fournisseur / Relance avec ARC` (V10.9) : le filtre « Uniquement fournisseur avec accusé réception de la commande » est posé par défaut.",
        "Relance ARC par mail via processus : les mails vont aux contacts du fournisseur qui portent le code fonction du dossier (onglet `Pièces 2`, champ Commande). Un seul mail par fournisseur (page « L'accusé de réception pour les commandes d'achat (V10.11) »)."
      ],
      retenir: "Relance : devis ou commande ; d'abord les lignes qu'un client attend ; processus si le code action existe, sinon mail direct.",
      source: { titre: "La relance de pièce fournisseur", url: "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704716356/La+relance+de+pi+ce+fournisseur" }
    },
    {
      titre: "Évaluer et suivre les fournisseurs",
      exemple: "Ton fournisseur de produits chimiques : 20 réceptions dans l'année.\n- 3 en retard, 1 autre avec un bidon percé, les 16 autres parfaites.\n- Taux dans délai : 17 / 20 = 85 %.\n- Taux sans incident : 16 / 20 = 80 %.",
      points: [
        "Fiche qualité fournisseur : seulement pour les fournisseurs qui comptent pour la qualité de tes produits. Elle s'appuie sur la fiche tiers et se crée à la première évaluation système.",
        "Niveaux de A (très bon) à D (médiocre). On évalue le système, la réactivité, le commercial ; les réceptions qualité donnent la conformité et le délai. Sans compétences déclarées, seulement des indicateurs généraux.",
        "Incident de délai = niveau délai autre que A (retard ou avance). Taux dans délai = réceptions sans incident de délai / total. Taux sans incident = ni incident de délai, ni défaut / total. Par défaut, une réception est jugée à l'heure (A) et conforme.",
        "Barème délai livré : l'avance compte aussi. Avance : 0-1 jour = A, 2-6 = B, 7-13 = C, 14 et plus = D. Retard : 0 = A, 1 = B, 2-6 = C, 7 et plus = D. Calcul automatique = surcharge du programme de saisie réception (page « Paramétrage dossier Divalto Qualité »).",
        "Indicateur combiné = moyenne pondérée. Poids livrés : conformité 5, délai 2, organisation 1, réactivité 1, commercial 1 (page « Paramétrage dossier Divalto Qualité »).",
        "Sélection/classification : panel trié par l'indicateur combiné. Le processus de qualification qualifie la liste et déqualifie les absents. Compétence à incidence qualité = fournisseur qualifié seulement.",
        "Widget « Fournisseurs actifs » (V10.10) : actif = dernière opération de la fiche il y a moins de 12 mois (page « Le widget nombre de fournisseurs actifs (V10.10) »)."
      ],
      retenir: "Fiche qualité pour les fournisseurs qui comptent ; taux sans incident = ni incident de délai (retard ou avance), ni défaut.",
      source: { titre: "Suivi Fournisseur", url: "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11705868831/Suivi+Fournisseur" }
    },
    {
      titre: "L'analyse des consommations",
      exemple: "Le chlore choc se vend surtout de mai à août. L'analyse lit tes 12 derniers mois, retire l'effet de saison, calcule une tendance, puis propose un stock d'alerte, une quantité optimale et un stock de sécurité.",
      points: [
        "Menu `Stocks / Réapprovisionnements / Analyse des consommations`. Elle lit 12 mois de consommations et de livraisons fournisseur. Lance-la au moins chaque début de mois.",
        "Lignes prises : code opération coché « Consommation pour réapprovisionnement » ET fiche réappro cochée « A prendre en compte dans l'analyse des consommations ».",
        "« Mettre à jour les fiches » écrit stock d'alerte, quantité optimale et stock de sécurité. En réglage, décoche-la pour tester plusieurs fois.",
        "Délai fournisseur : celui de la fiche « Conditions fournisseur » d'abord ; sinon un lissage des délais constatés, mauvais pour les livraisons cadencées ou variables. Plus de délai = plus de stock de sécurité.",
        "Stock de sécurité (V10.8) = écart-type × coefficient du taux de service × √(jours de couverture / 30). Coefficients : 99,9 % → 3 ; 99 % → 2,33 ; 97,5 % → 1,96. Dans ce calcul, la moyenne divise par le nombre de mois depuis le premier mois avec une quantité : 140 / 8, pas / 12, dans l'exemple de la doc.",
        "V10.9 : une coche « Analyse consommation » par ligne de pièce, modifiable après coup, même sur une facture imprimée ou intégrée (`Outils` > « Inclure / Exclure Analyse de consommation »).",
        "Classement ABC : la catégorie A s'arrête à la règle des 20/80 (20 % des articles font 80 % du CA) ; rossignols = articles sans mouvement. Seuls les codes opération cochés « Classement ABC » comptent."
      ],
      retenir: "Code opération + fiche réappro cochés ; délai saisi s'il est irrégulier ; « Mettre à jour les fiches » décoché pour tester.",
      source: { titre: "Analyse des besoins (analyse des consommations)", url: "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704721265/Analyse+des+besoins+analyse+des+consommations" }
    },
    {
      titre: "Codes opération, tarifs d'achat et réglages utiles",
      exemple: "Tes achats de pompes passent par le code opération F (Achat). La capture de la doc montre :\n- tiers Fournisseur, sens Entrée, nature de stock N ;\n- valorisation « Saisie du prix, calcul du CR » ;\n- journal d'achat A1 (un réglage du code opération).",
      points: [
        "Le code opération fixe le sens, le tiers, la nature de stock, la valorisation et le journal. Son nom suit une convention (F = entrée fournisseur, G = sortie fournisseur, C = vente) : c'est le paramétrage qui fait foi.",
        "Intégration comptable : le journal vient du code opération de l'en-tête de pièce. Achat d'immobilisation : coche « Achat d'immobilisation » sur le code.",
        "Tarif d'achat par tableur (V10.11) : avec la seule référence fournisseur, coche « Compléter la référence par le référencement fournisseur ». Le dépôt est ignoré : la première ligne trouvée donne ta référence (page « Les tarifs »).",
        "Pièces fournisseur : l'Incoterm est informatif, les contrôles bloquants sont côté client. La confidentialité « Visualiser les coûts et les prix d'achat » masque les coûts, pas le tarif d'achat (page « Gérer les achats »).",
        "Sous-traitance de négoce (V10.5) : tu achètes une prestation sur tes composants, par exemple le remplissage de présentoirs. Un seul ordre de sous-traitance par commande fournisseur, sans reliquat (page « Gérer la sous-traitance de négoce (V10.5) »).",
        "L'article fini porte le tarif d'achat, pour la seule valeur ajoutée. La réception des produits finis ouvre la consommation des composants. Pour le CBN, la durée de la prestation se met sur la nomenclature (même page)."
      ],
      retenir: "Le paramétrage du code opération fait foi, pas son nom ; le journal vient du code de l'en-tête de pièce.",
      source: { titre: "Le code opération", url: "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704708985/Le+code+op+ration" }
    },
    {
      titre: "Réceptionner en WMS et sur terminal",
      exemple: "Un camion livre 3 palettes de liners. Le cariste scanne le quai, puis la commande, puis chaque palette (étiquette GS1-128). Il valide : le BL fournisseur est créé et le stock commercial entre.",
      points: [
        "Terminal WMS : `1- Réception` > `1- Fournisseur` > `1- Enregistrement`. On scanne l'emplacement de réception, puis la commande.",
        "Une commande = un seul cariste. Si un collègue scanne une réception commencée, un message lui propose de se réaffecter les lignes.",
        "Déclaration : le stock WMS est créé tout de suite, pour ranger. Le stock commercial ne bouge qu'à la validation par le cariste, qui crée le BL (page « Réception en cours »).",
        "Option RF de l'utilisateur « Interdire la ligne de réception si non présente sur la commande » : pas de surplus ni d'article hors commande (page « Blocage réception »).",
        "Contrôle qualité sur un dépôt WMS : on le valide sur le terminal, par numéro de réception, pour tout le bon. Le stock reste non contrôlé, même rangé (page « Contrôle qualité »).",
        "« Déclaration d'une réception », dans Divalto : plusieurs commandes d'un coup, mais pas encore d'articles en lot, série ou FIFO (page « Déclaration d'une réception »).",
        "Terminal mobile hors WMS : une référence hors commande demande une confirmation. « Saisie réappro par DA » crée une demande d'achat ; « par achat » ajoute une ligne sur la dernière commande active du fournisseur habituel (page « Terminaux mobiles - Traitements achats »)."
      ],
      retenir: "WMS : un cariste par réception ; stock WMS à la déclaration, stock commercial à la validation.",
      source: { titre: "Réception (fournisseur, client, interne)", url: "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11705932967/R+ception+fournisseur+client+interne" }
    }
  ]
};
