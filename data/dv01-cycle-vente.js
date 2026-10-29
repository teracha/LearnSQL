// Divalto 10.13 — Le cycle de vente (gestion commerciale).
// Source : base documentaire Divalto (dépôt Divalto_10), pages citées dans chaque question.
LEARNSQL.questions.dv01 = [
  {
    "id": "dv01-q01",
    "dialecte": "Divalto 10.13",
    "q": "Un devis client est accepté. Dans Divalto, peut-on le transformer directement en facture ?",
    "choix": [
      "Non, il faut d'abord une commande",
      "Oui, en BL ou même en facture",
      "Non, il faut une commande puis un BL",
      "Oui, mais seulement en mode brouillon"
    ],
    "bonne": 1,
    "pourquoi": [
      "Non. La commande n'est pas obligatoire : on peut sauter des étapes.",
      "Oui. Un devis peut être transformé en commande, en BL ou même en facture, sans passer par toutes les étapes.",
      "Non. C'est le chemin classique, mais pas une obligation.",
      "Non. Le mode brouillon concerne l'impression des factures, pas la transformation."
    ],
    "retenir": "Un devis peut aller directement en BL ou en facture, sans passer par la commande.",
    "source": {
      "titre": "Création d'une commande de vente",
      "url": "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704712833/Cr+ation+d+une+commande+de+vente"
    }
  },
  {
    "id": "dv01-q02",
    "dialecte": "Divalto 10.13",
    "q": "Avec les reliquats activés, tu transformes une commande en BL et tu mets 0 en quantité sur une ligne. Que devient cette ligne ?",
    "choix": [
      "Elle est supprimée de la commande",
      "Elle reste sur la commande, en reliquat",
      "Elle part sur le BL avec 0 en quantité",
      "Elle devient une ligne gratuite"
    ],
    "bonne": 1,
    "pourquoi": [
      "Non. Mettre 0 ne supprime rien. La suppression d'une ligne est une autre action.",
      "Oui. Une quantité à 0 veut dire « ne pas transformer » : la ligne reste en reliquat sur la commande.",
      "Non. Une ligne à 0 n'est pas transformée : elle ne part pas sur le BL.",
      "Non. La gratuité, c'est un prix à 0, pas une quantité à 0."
    ],
    "retenir": "En transformation, une quantité à 0 laisse la ligne en reliquat sur la pièce d'origine (si les reliquats sont gérés).",
    "source": {
      "titre": "Création d'une commande de vente",
      "url": "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704712833/Cr+ation+d+une+commande+de+vente"
    }
  },
  {
    "id": "dv01-q03",
    "dialecte": "Divalto 10.13",
    "q": "Pendant la transformation d'une commande en BL, tu supprimes une ligne. Sur quelle(s) pièce(s) est-elle supprimée ?",
    "choix": [
      "Sur la commande et sur le BL",
      "Seulement sur le BL créé",
      "Seulement sur la commande d'origine",
      "Sur aucune : c'est interdit"
    ],
    "bonne": 0,
    "pourquoi": [
      "Oui. En transformation, la suppression d'une ligne vaut pour les deux pièces. Divalto demande une confirmation.",
      "Non. C'est l'ajout d'une ligne qui ne touche que la nouvelle pièce, pas la suppression.",
      "Non. La suppression touche aussi la pièce créée.",
      "Non. C'est possible, après un message de confirmation."
    ],
    "retenir": "En transformation, supprimer une ligne la supprime sur la pièce d'origine ET sur la nouvelle.",
    "source": {
      "titre": "Création d'une commande de vente",
      "url": "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704712833/Cr+ation+d+une+commande+de+vente"
    }
  },
  {
    "id": "dv01-q04",
    "dialecte": "Divalto 10.13",
    "q": "Pendant une transformation de commande en BL, tu ajoutes une nouvelle ligne. Où apparaît-elle ?",
    "choix": [
      "Sur le BL et sur la commande",
      "Seulement sur le BL créé",
      "Seulement sur la commande",
      "Nulle part : c'est interdit"
    ],
    "bonne": 1,
    "pourquoi": [
      "Non. La commande d'origine n'est pas modifiée par un ajout.",
      "Oui. Une ligne ajoutée pendant la transformation n'existe que sur la pièce générée.",
      "Non. C'est l'inverse : elle va sur la nouvelle pièce.",
      "Non. L'ajout de lignes est autorisé pendant une transformation."
    ],
    "retenir": "Une ligne ajoutée pendant une transformation va seulement sur la nouvelle pièce.",
    "source": {
      "titre": "Création d'une commande de vente",
      "url": "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704712833/Cr+ation+d+une+commande+de+vente"
    }
  },
  {
    "id": "dv01-q05",
    "dialecte": "Divalto 10.13",
    "q": "Un client te demande de livrer directement un de SES clients, à une adresse qui n'existe pas dans Divalto. Quel type d'adresse choisir sur la pièce ?",
    "choix": [
      "Codifiée",
      "Manuelle",
      "Identique commande",
      "Identique facture"
    ],
    "bonne": 1,
    "pourquoi": [
      "Non. Une adresse codifiée doit déjà exister dans le fichier des adresses des tiers.",
      "Oui. L'adresse manuelle est saisie librement, pour cette pièce seulement. C'est l'exemple donné par la doc.",
      "Non. « Identique à » reprend une adresse déjà saisie en manuel sur une autre pièce.",
      "Non. Ce serait l'adresse de facturation, pas celle du client final."
    ],
    "retenir": "Adresse ponctuelle, inconnue de Divalto : type « Manuelle ».",
    "source": {
      "titre": "Création d'une commande de vente",
      "url": "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704712833/Cr+ation+d+une+commande+de+vente"
    }
  },
  {
    "id": "dv01-q06",
    "dialecte": "Divalto 10.13",
    "q": "Un client règle en 3 traites : 1/3 à 30 jours, 1/3 à 60 jours, le reste à 90 jours. Quelle ventilation pour la dernière échéance ?",
    "choix": [
      "1/3T90",
      "ST90",
      "100%T90",
      "RT90"
    ],
    "bonne": 1,
    "pourquoi": [
      "Non. Avec trois tiers fixes, un arrondi peut laisser quelques centimes non ventilés.",
      "Oui. « S » affecte le solde : la dernière échéance prend tout ce qui reste. C'est l'exemple de la doc.",
      "Non. 100 % reprendrait le montant total, en plus des deux premiers tiers.",
      "Non. La syntaxe du solde est « S », pas « R »."
    ],
    "retenir": "Dans la ventilation des échéances : montant fixe, fraction, pourcentage, ou S pour le solde.",
    "source": {
      "titre": "Echéancement et délai",
      "url": "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704712865/Ech+ancement+et+d+lai"
    }
  },
  {
    "id": "dv01-q07",
    "dialecte": "Divalto 10.13",
    "q": "Sur une commande, les délais demandé, accepté et reporté sont tous remplis. Lequel est actif ?",
    "choix": [
      "Le délai demandé",
      "Le délai accepté",
      "Le délai reporté",
      "Le plus proche des trois"
    ],
    "bonne": 2,
    "pourquoi": [
      "Non. C'est le moins prioritaire des trois.",
      "Non. Il passe avant le demandé, mais après le reporté.",
      "Oui. L'ordre de priorité croissante est : demandé, accepté, reporté.",
      "Non. Divalto suit un ordre de priorité, pas la date la plus proche."
    ],
    "retenir": "Délai actif : reporté, sinon accepté, sinon demandé.",
    "source": {
      "titre": "Echéancement et délai",
      "url": "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704712865/Ech+ancement+et+d+lai"
    }
  },
  {
    "id": "dv01-q08",
    "dialecte": "Divalto 10.13",
    "q": "Tu changes le délai dans l'en-tête d'une commande de 40 lignes. Quelle fonction l'applique à toutes les lignes en une fois ?",
    "choix": [
      "La propagation par clic droit",
      "La duplication de la commande",
      "La validation partielle en BL",
      "La mise à jour de l'encours"
    ],
    "bonne": 0,
    "pourquoi": [
      "Oui. Un clic droit sur le délai d'en-tête propose de le propager sur toutes les lignes.",
      "Non. Dupliquer crée une autre commande, sans changer les délais de celle-ci.",
      "Non. La validation en BL livre les lignes, elle ne change pas leurs délais.",
      "Non. Cet utilitaire recalcule l'encours client, pas les délais."
    ],
    "retenir": "Délai d'en-tête → clic droit → propager sur les lignes.",
    "source": {
      "titre": "Echéancement et délai",
      "url": "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704712865/Ech+ancement+et+d+lai"
    }
  },
  {
    "id": "dv01-q09",
    "dialecte": "Divalto 10.13",
    "q": "Un client commande avec SES propres références d'articles. Quelle fonction permet de les utiliser en saisie de commande ?",
    "choix": [
      "Le référencement client",
      "La recherche par dernières ventes",
      "La table des emballages",
      "Le code ADV de l'en-tête"
    ],
    "bonne": 0,
    "pourquoi": [
      "Oui. Le référencement fait le lien entre ta référence interne et celle du client. On peut ensuite saisir avec ses références.",
      "Non. Elle retrouve ce que le client a déjà acheté, avec tes références à toi.",
      "Non. Elle sert à calculer les unités d'emballage, pas les références.",
      "Non. Le code ADV désigne la personne de l'administration des ventes."
    ],
    "retenir": "Les références du client se gèrent avec le référencement client (fiche article ou client, bouton Référencement).",
    "source": {
      "titre": "Référencement client",
      "url": "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704713007/R+f+rencement+client"
    }
  },
  {
    "id": "dv01-q10",
    "dialecte": "Divalto 10.13",
    "q": "Tu veux qu'un client ne puisse commander QUE ses articles référencés. Que faut-il cocher ?",
    "choix": [
      "Le contrôle dans le dossier ET la fiche client",
      "Le contrôle dans la fiche client seulement",
      "Le contrôle dans chaque fiche article du client",
      "Le contrôle dans le dossier seulement, une fois"
    ],
    "bonne": 0,
    "pourquoi": [
      "Oui. Il faut cocher « Contrôler le référencement client » dans le dossier (onglet Pièces) ET dans la fiche du client.",
      "Non. Sans la case du dossier, le contrôle n'est pas actif.",
      "Non. Le contrôle se règle au niveau du dossier et du client, pas de l'article.",
      "Non. Le dossier active la fonction, mais il faut aussi la cocher pour le client concerné."
    ],
    "retenir": "Contrôle du référencement : coche dans le dossier + coche dans la fiche client.",
    "source": {
      "titre": "Référencement client",
      "url": "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704713007/R+f+rencement+client"
    }
  },
  {
    "id": "dv01-q11",
    "dialecte": "Divalto 10.13",
    "q": "Un client n'a aucun plafond dans sa fiche. Que fait le contrôle d'encours quand on saisit une commande pour lui ?",
    "choix": [
      "Rien : le contrôle est désactivé",
      "Il bloque toutes ses commandes",
      "Il applique le plafond du dossier",
      "Il prend 0 € comme plafond"
    ],
    "bonne": 0,
    "pourquoi": [
      "Oui. Sans plafond (direction ou assurance), les fonctions d'encours sont inactives pour ce client.",
      "Non. Sans plafond, il n'y a rien à dépasser, donc rien à bloquer.",
      "Non. Les plafonds se saisissent dans la fiche client, pas dans le dossier.",
      "Non. Un plafond vide n'est pas un plafond à 0 : le contrôle est simplement coupé."
    ],
    "retenir": "Pas de plafond dans la fiche client = pas de contrôle d'encours.",
    "source": {
      "titre": "Généralités de fonctionnement",
      "url": "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704713049/G+n+ralit+s+de+fonctionnement"
    }
  },
  {
    "id": "dv01-q12",
    "dialecte": "Divalto 10.13",
    "q": "Qu'est-ce que l'encours livraison d'un client ?",
    "choix": [
      "Ses commandes et BL ouverts",
      "Ses factures non réglées en compta",
      "Ses factures assurées non réglées",
      "Ses avoirs pas encore imprimés"
    ],
    "bonne": 0,
    "pourquoi": [
      "Oui. L'encours livraison, c'est le portefeuille de commandes et de BL ouverts à date.",
      "Non. Ça, c'est l'encours financier (solde comptable + factures pas encore intégrées).",
      "Non. Ça, c'est l'encours assurance.",
      "Non. Les avoirs ne forment pas un encours à part."
    ],
    "retenir": "Encours livraison = commandes + BL ouverts. Encours financier = côté comptable.",
    "source": {
      "titre": "Généralités de fonctionnement",
      "url": "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704713049/G+n+ralit+s+de+fonctionnement"
    }
  },
  {
    "id": "dv01-q13",
    "dialecte": "Divalto 10.13",
    "q": "Qu'est-ce que l'encours financier d'un client ?",
    "choix": [
      "Solde comptable + factures non intégrées",
      "Ses commandes et BL ouverts à date",
      "Ses factures assurées non réglées",
      "Son plafond direction moins ses avoirs"
    ],
    "bonne": 0,
    "pourquoi": [
      "Oui. C'est le solde du compte client en comptabilité, plus les factures en attente d'intégration comptable.",
      "Non. Ça, c'est l'encours livraison.",
      "Non. Ça, c'est l'encours assurance.",
      "Non. Le plafond est une limite, pas un encours."
    ],
    "retenir": "Encours financier = ce qui est déjà facturé et pas encore réglé (comptabilité + factures non intégrées).",
    "source": {
      "titre": "Généralités de fonctionnement",
      "url": "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704713049/G+n+ralit+s+de+fonctionnement"
    }
  },
  {
    "id": "dv01-q14",
    "dialecte": "Divalto 10.13",
    "q": "La direction fixe le risque maximum qu'elle accepte pour un client. Dans quel champ de la fiche client le mettre ?",
    "choix": [
      "Le plafond direction",
      "Le plafond assurance",
      "L'encours financier",
      "L'encours livraison"
    ],
    "bonne": 0,
    "pourquoi": [
      "Oui. Le plafond direction est le risque maximum que l'entreprise veut prendre sur ce client.",
      "Non. Le plafond assurance correspond à la couverture de l'assureur crédit.",
      "Non. Un encours est un montant calculé, pas une limite qu'on saisit.",
      "Non. C'est aussi un montant calculé (commandes et BL ouverts)."
    ],
    "retenir": "Plafond direction = risque accepté par l'entreprise. Plafond assurance = couverture de l'assureur.",
    "source": {
      "titre": "Généralités de fonctionnement",
      "url": "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704713049/G+n+ralit+s+de+fonctionnement"
    }
  },
  {
    "id": "dv01-q15",
    "dialecte": "Divalto 10.13",
    "q": "Pour savoir si un client dépasse son plafond, quel montant Divalto compare-t-il au plafond ?",
    "choix": [
      "Encours comptable + encours livraison",
      "L'encours livraison du client seul",
      "L'encours comptable du client seul",
      "Le montant de la commande seule"
    ],
    "bonne": 0,
    "pourquoi": [
      "Oui. Le montant contrôlé est la somme de l'encours comptable et de l'encours livraison.",
      "Non. Il manque la partie déjà facturée et non réglée.",
      "Non. Il manque les commandes et BL ouverts.",
      "Non. La commande s'ajoute à l'encours existant : on ne la regarde pas seule."
    ],
    "retenir": "Contrôle d'encours = comptable + livraison, comparé au plafond.",
    "source": {
      "titre": "Gestion de l'encours client",
      "url": "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704713064/Gestion+de+l+encours+client"
    }
  },
  {
    "id": "dv01-q16",
    "dialecte": "Divalto 10.13",
    "q": "Une commande est bloquée pour dépassement d'encours. Quelle action est impossible ?",
    "choix": [
      "La voir dans l'explorateur",
      "La transformer en BL",
      "La débloquer, avec le bon droit",
      "La filtrer dans le portefeuille"
    ],
    "bonne": 1,
    "pourquoi": [
      "Non. Elle reste visible, avec un symbole de blocage. L'explorateur peut même n'afficher que les bloquées.",
      "Oui. Une commande bloquée ne peut pas être livrée, préparée, facturée, ni générer d'OF.",
      "Non. On peut la débloquer par Options > Modifier l'état de la pièce > Déblocage, si on a la confidentialité.",
      "Non. Le portefeuille propose justement un filtre « commandes bloquées »."
    ],
    "retenir": "Commande bloquée : ni livraison, ni préparation, ni facture, ni OF tant qu'elle n'est pas débloquée.",
    "source": {
      "titre": "Gestion de l'encours client",
      "url": "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704713064/Gestion+de+l+encours+client"
    }
  },
  {
    "id": "dv01-q17",
    "dialecte": "Divalto 10.13",
    "q": "Qui peut débloquer une commande bloquée pour dépassement d'encours ?",
    "choix": [
      "Un utilisateur avec la bonne confidentialité",
      "Tout utilisateur qui ouvre la commande",
      "Le commercial du client, et lui seul",
      "Personne : il faut recréer la commande"
    ],
    "bonne": 0,
    "pourquoi": [
      "Oui. Le déblocage est soumis à une confidentialité : celle qui autorise la saisie si l'encours est dépassé.",
      "Non. Le déblocage est réservé aux utilisateurs autorisés.",
      "Non. Le droit dépend de la confidentialité de l'utilisateur, pas de son rôle de commercial.",
      "Non. Le déblocage se fait sur la commande elle-même (menu Options)."
    ],
    "retenir": "Débloquer une commande = droit spécial (confidentialité), puis Options > Modifier l'état de la pièce.",
    "source": {
      "titre": "Gestion de l'encours client",
      "url": "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704713064/Gestion+de+l+encours+client"
    }
  },
  {
    "id": "dv01-q18",
    "dialecte": "Divalto 10.13",
    "q": "Tu veux que Divalto bloque les commandes qui dépassent l'encours. Où activer ce blocage ?",
    "choix": [
      "Dans le dossier Commerce & logistique",
      "Dans chaque fiche client",
      "Dans la fiche du commercial",
      "Dans la table des modes de règlement"
    ],
    "bonne": 0,
    "pourquoi": [
      "Oui. Coche « Bloquer la commande si dépassement d'encours client », dans le dossier, onglet Pièces.",
      "Non. La fiche client porte les plafonds, mais le blocage s'active dans le dossier.",
      "Non. Le commercial n'a pas de réglage d'encours.",
      "Non. Le mode de règlement règle les échéances, pas le blocage."
    ],
    "retenir": "Blocage pour encours : une coche dans le dossier, onglet Pièces. Les plafonds, eux, sont dans la fiche client.",
    "source": {
      "titre": "Généralités de fonctionnement",
      "url": "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704713049/G+n+ralit+s+de+fonctionnement"
    }
  },
  {
    "id": "dv01-q19",
    "dialecte": "Divalto 10.13",
    "q": "L'encours livraison d'un client semble faux, alors que ses pièces sont justes. Que lancer ?",
    "choix": [
      "L'utilitaire de mise à jour de l'encours",
      "Une suppression puis recréation du client",
      "Une réimpression de ses factures",
      "Une nouvelle facturation différée"
    ],
    "bonne": 0,
    "pourquoi": [
      "Oui. « Mise à jour de l'encours de livraison » (Utilitaires / Procédures de mise à jour) corrige les déphasages.",
      "Non. On perdrait l'historique du client, pour un simple recalcul.",
      "Non. L'impression ne recalcule pas l'encours livraison.",
      "Non. Facturer change les pièces, sans corriger un compteur faux."
    ],
    "retenir": "Encours livraison déphasé → utilitaire « Mise à jour de l'encours de livraison ».",
    "source": {
      "titre": "Gestion de l'encours client",
      "url": "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704713064/Gestion+de+l+encours+client"
    }
  },
  {
    "id": "dv01-q20",
    "dialecte": "Divalto 10.13",
    "q": "Tu passes une ligne de commande en gratuit. Que devient le prix net d'origine ?",
    "choix": [
      "Il est gardé dans « Prix net origine »",
      "Il est perdu définitivement",
      "Il est reporté sur la ligne suivante",
      "Il passe en remise de pied de pièce"
    ],
    "bonne": 0,
    "pourquoi": [
      "Oui. Il est sauvegardé à titre indicatif, onglet Tarification, champ « Prix net origine ».",
      "Non. Divalto le garde pour information.",
      "Non. Le prix ne passe pas d'une ligne à l'autre.",
      "Non. La gratuité reste sur la ligne : rien n'est ajouté en pied."
    ],
    "retenir": "Ligne gratuite : prix à 0 (ou case gratuit), le prix d'origine reste visible en « Prix net origine ».",
    "source": {
      "titre": "Conformité, gratuité, articles habituels, confirmation de commande, reliquats",
      "url": "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704713116/Conformit+gratuit+articles+habituels+confirmation+de+commande+reliquats"
    }
  },
  {
    "id": "dv01-q21",
    "dialecte": "Divalto 10.13",
    "q": "Tu rends le motif de gratuité obligatoire dans le dossier. Que faut-il aussi définir ?",
    "choix": [
      "Des motifs par défaut (décomposition, cadeau)",
      "Un prix minimum pour chaque article",
      "Un commercial sur chaque ligne gratuite",
      "Un plafond d'encours pour chaque client"
    ],
    "bonne": 0,
    "pourquoi": [
      "Oui. Il faut un motif par défaut pour les décompositions et pour les cadeaux des remises seuil.",
      "Non. Le motif explique la gratuité ; il n'y a pas de prix minimum à saisir.",
      "Non. Le motif est lié à la ligne, pas au commercial.",
      "Non. L'encours n'a pas de lien avec la gratuité."
    ],
    "retenir": "Motif de gratuité obligatoire → prévoir aussi les motifs par défaut (décomposition et cadeau), dossier onglet Pièces2.",
    "source": {
      "titre": "Conformité, gratuité, articles habituels, confirmation de commande, reliquats",
      "url": "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704713116/Conformit+gratuit+articles+habituels+confirmation+de+commande+reliquats"
    }
  },
  {
    "id": "dv01-q22",
    "dialecte": "Divalto 10.13",
    "q": "Pour gérer les reliquats chez un client, où faut-il paramétrer ?",
    "choix": [
      "Dans le dossier, puis la fiche client",
      "Uniquement dans la fiche article",
      "Uniquement dans chaque commande",
      "Dans le mode de règlement du client"
    ],
    "bonne": 0,
    "pourquoi": [
      "Oui. On active les reliquats dans le dossier, puis on affine dans la fiche client (devis, commandes, BL, ligne).",
      "Non. L'article n'a pas de réglage de reliquat.",
      "Non. Le paramétrage est fait une fois, pas à chaque pièce.",
      "Non. Le mode de règlement ne gère que les échéances."
    ],
    "retenir": "Reliquats : activation dans le dossier, puis réglage fin dans la fiche client.",
    "source": {
      "titre": "Conformité, gratuité, articles habituels, confirmation de commande, reliquats",
      "url": "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704713116/Conformit+gratuit+articles+habituels+confirmation+de+commande+reliquats"
    }
  },
  {
    "id": "dv01-q23",
    "dialecte": "Divalto 10.13",
    "q": "Avec les reliquats activés, une ligne de commande de 10 est livrée à 6. Où sont les 4 restants ?",
    "choix": [
      "Sur la commande, en ligne active",
      "Sur le BL, en quantité négative",
      "Sur une nouvelle commande créée seule",
      "Nulle part : la commande est soldée"
    ],
    "bonne": 0,
    "pourquoi": [
      "Oui. La ligne est éclatée : les 6 livrés sont sur le BL, les 4 restent actifs sur la commande d'origine.",
      "Non. Le BL ne porte que les 6 livrés.",
      "Non. Le reliquat reste sur la pièce d'origine, sans nouvelle commande.",
      "Non. Avec les reliquats activés, la ligne reste active tant qu'il reste une quantité."
    ],
    "retenir": "Livraison partielle avec reliquats : la partie restante reste active sur la pièce d'origine.",
    "source": {
      "titre": "Conformité, gratuité, articles habituels, confirmation de commande, reliquats",
      "url": "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704713116/Conformit+gratuit+articles+habituels+confirmation+de+commande+reliquats"
    }
  },
  {
    "id": "dv01-q24",
    "dialecte": "Divalto 10.13",
    "q": "Sur une commande validée en partie, une ligne affiche un petit cadenas. Qu'est-ce que ça veut dire ?",
    "choix": [
      "Ligne validée : plus modifiable",
      "Ligne bloquée pour encours dépassé",
      "Ligne réservée dans le stock",
      "Ligne confidentielle pour l'ADV"
    ],
    "bonne": 0,
    "pourquoi": [
      "Oui. Le cadenas indique que la ligne est validée dans ce document. Elle n'est plus modifiable.",
      "Non. Le blocage pour encours concerne toute la commande, avec un autre symbole.",
      "Non. Les réservations ont leur propre indicateur.",
      "Non. Le cadenas ne parle pas de confidentialité."
    ],
    "retenir": "Cadenas sur une ligne = ligne déjà validée, plus modifiable.",
    "source": {
      "titre": "Conformité, gratuité, articles habituels, confirmation de commande, reliquats",
      "url": "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704713116/Conformit+gratuit+articles+habituels+confirmation+de+commande+reliquats"
    }
  },
  {
    "id": "dv01-q25",
    "dialecte": "Divalto 10.13",
    "q": "Dans le cycle devis → commande → BL, quelle pièce génère les mouvements de stock ?",
    "choix": [
      "Le devis",
      "La commande",
      "Le bon de livraison",
      "La confirmation de commande"
    ],
    "bonne": 2,
    "pourquoi": [
      "Non. Le devis est une proposition : il ne touche pas au stock.",
      "Non. La commande peut réserver, mais elle ne fait pas sortir la marchandise.",
      "Oui. La grande différence du BL avec le devis et la commande : il génère les mouvements de stock.",
      "Non. La confirmation est une simple case sur la commande."
    ],
    "retenir": "C'est le BL qui sort la marchandise du stock.",
    "source": {
      "titre": "Le BL de vente",
      "url": "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704713646/Le+BL+de+vente"
    }
  },
  {
    "id": "dv01-q26",
    "dialecte": "Divalto 10.13",
    "q": "Tu saisis une facture de vente directement (sans BL). À quoi sert la colonne « quantité livrée » ?",
    "choix": [
      "Elle est sortie du stock",
      "Elle fixe le montant facturé",
      "Elle sert seulement à l'encours",
      "Elle est juste informative"
    ],
    "bonne": 0,
    "pourquoi": [
      "Oui. En saisie directe de facture, la quantité livrée est déstockée.",
      "Non. C'est la quantité facturée qui fixe le montant et la comptabilisation.",
      "Non. Elle a un effet réel sur le stock.",
      "Non. Elle mouvemente le stock."
    ],
    "retenir": "Facture saisie directement : quantité livrée = stock ; quantité facturée = montant.",
    "source": {
      "titre": "La facture",
      "url": "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704713774/La+facture"
    }
  },
  {
    "id": "dv01-q27",
    "dialecte": "Divalto 10.13",
    "q": "Un article est suivi par numéro de lot. Que se passe-t-il au BL ?",
    "choix": [
      "Le numéro de lot devient obligatoire",
      "Le lot se saisit seulement en facture",
      "Le lot reste facultatif partout",
      "Le lot est saisi par le transporteur"
    ],
    "bonne": 0,
    "pourquoi": [
      "Oui. Si le mode de suivi de l'article est par lot ou par série, la zone devient obligatoire dans le BL.",
      "Non. La facture n'est pas l'étape où l'on suit les lots.",
      "Non. Il est facultatif en commande, mais obligatoire au BL.",
      "Non. C'est saisi dans Divalto, sur les lignes du BL."
    ],
    "retenir": "Article suivi par lot ou série : saisie obligatoire au BL (possible dès la commande).",
    "source": {
      "titre": "Le BL de vente",
      "url": "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704713646/Le+BL+de+vente"
    }
  },
  {
    "id": "dv01-q28",
    "dialecte": "Divalto 10.13",
    "q": "Un BL ne doit pas être facturé tant qu'il manque une information. Comment faire ?",
    "choix": [
      "Cocher « Attente d'informations »",
      "Supprimer le BL et le refaire",
      "Passer toutes les lignes en gratuit",
      "Mettre le client en encours dépassé"
    ],
    "bonne": 0,
    "pourquoi": [
      "Oui. Dans l'en-tête du BL, onglet Facturation-Impression, la case « Attente d'informations » le bloque pour la facturation.",
      "Non. On perdrait le mouvement de stock déjà fait.",
      "Non. On facturerait à 0 € : c'est une erreur, pas une attente.",
      "Non. Le blocage d'encours concerne les commandes, pas un BL à mettre en attente."
    ],
    "retenir": "BL à ne pas facturer pour l'instant : case « Attente d'informations ». On décoche pour le libérer.",
    "source": {
      "titre": "Le BL de vente",
      "url": "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704713646/Le+BL+de+vente"
    }
  },
  {
    "id": "dv01-q29",
    "dialecte": "Divalto 10.13",
    "q": "Que génère le traitement « Annulation de BL » ?",
    "choix": [
      "Une pièce interne de régularisation",
      "Un avoir client automatique",
      "La suppression pure et simple du BL",
      "Une nouvelle commande au client"
    ],
    "bonne": 0,
    "pourquoi": [
      "Oui. Il régularise le stock en générant une pièce interne, pour tout ou partie des quantités livrées.",
      "Non. Il ne crée pas d'avoir : c'est une régularisation de stock.",
      "Non. Le BL reste ; une pièce interne corrige le stock.",
      "Non. Rien n'est recommandé au client."
    ],
    "retenir": "Annulation de BL = pièce interne de régularisation de stock, pas un avoir.",
    "source": {
      "titre": "Le BL de vente",
      "url": "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704713646/Le+BL+de+vente"
    }
  },
  {
    "id": "dv01-q30",
    "dialecte": "Divalto 10.13",
    "q": "Une commande est livrée en 3 BL. Le client veut UNE facture pour cette commande. Quel mode de facturation dans sa fiche ?",
    "choix": [
      "Un BL par facture",
      "Une commande par facture",
      "Regroupement de BL",
      "Facturation à la demande"
    ],
    "bonne": 1,
    "pourquoi": [
      "Non. On aurait 3 factures.",
      "Oui. Tous les BL d'une même commande donnent une seule facture.",
      "Non. Le regroupement mélange tous les BL du client (facture récapitulative), pas seulement ceux de la commande.",
      "Non. C'est une périodicité de facturation, pas un mode."
    ],
    "retenir": "Modes de facturation : un BL par facture, une commande par facture, ou regroupement de BL.",
    "source": {
      "titre": "La facture",
      "url": "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704713774/La+facture"
    }
  },
  {
    "id": "dv01-q31",
    "dialecte": "Divalto 10.13",
    "q": "Deux BL du même client, en mode regroupement, ne sont pas regroupés sur une seule facture. Quelle cause est possible ?",
    "choix": [
      "Des modes de règlement différents",
      "Des dates de livraison différentes",
      "Des articles différents sur les BL",
      "Deux préparateurs différents"
    ],
    "bonne": 0,
    "pourquoi": [
      "Oui. Le regroupement exige notamment le même mode de règlement, la même devise, le même régime TVA, la même adresse de facturation…",
      "Non. Regrouper des livraisons de dates différentes, c'est justement le but.",
      "Non. Les articles n'entrent pas dans les conditions de regroupement.",
      "Non. Le préparateur n'est pas une condition de regroupement."
    ],
    "retenir": "Regroupement de BL : il faut les mêmes conditions de facture (règlement, devise, TVA, adresse, franco…).",
    "source": {
      "titre": "La facture",
      "url": "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704713774/La+facture"
    }
  },
  {
    "id": "dv01-q32",
    "dialecte": "Divalto 10.13",
    "q": "Le port est un forfait de 10 € par livraison. Une commande part en 2 BL, regroupés sur une facture. Combien de port est facturé ?",
    "choix": [
      "10 € : un seul forfait",
      "20 € : un forfait par BL",
      "0 € : franco en cas de regroupement",
      "5 € : le forfait est partagé"
    ],
    "bonne": 1,
    "pourquoi": [
      "Non. Les frais de port de chaque BL sont repris.",
      "Oui. En facturation différée, les frais de port se cumulent : 10 € pour chaque livraison.",
      "Non. Le regroupement ne rend pas le port gratuit.",
      "Non. Le forfait n'est pas divisé entre les BL."
    ],
    "retenir": "Regrouper des BL cumule leurs frais de port : un forfait par BL.",
    "source": {
      "titre": "La facture",
      "url": "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704713774/La+facture"
    }
  },
  {
    "id": "dv01-q33",
    "dialecte": "Divalto 10.13",
    "q": "Mode de règlement à « 30 jours ». La facture est datée du 30/04. Quelle échéance Divalto calcule-t-il ?",
    "choix": [
      "30/05",
      "31/05",
      "01/06",
      "29/05"
    ],
    "bonne": 1,
    "pourquoi": [
      "Non. C'est le calcul « 30 jours exactement », mais Divalto ne compte pas ainsi.",
      "Oui. 30 jours est converti en 1 mois. Fin avril → fin mai, donc 31/05. La doc le signale comme piège.",
      "Non. Il n'y a pas de report au 1er du mois sans paramétrage spécifique.",
      "Non. Ce serait 29 jours."
    ],
    "retenir": "Dans les modes de règlement, 30, 60, 90 jours sont comptés en mois : attention aux fins de mois.",
    "source": {
      "titre": "La facture",
      "url": "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704713774/La+facture"
    }
  },
  {
    "id": "dv01-q34",
    "dialecte": "Divalto 10.13",
    "q": "Tu veux contrôler une facture avant de la figer, en gardant la possibilité de la modifier. Quelle impression utiliser ?",
    "choix": [
      "L'impression brouillon",
      "L'impression normale",
      "La réimpression avec recalcul",
      "L'impression des traites"
    ],
    "bonne": 0,
    "pourquoi": [
      "Oui. Le mode brouillon n'archive pas, met un filigrane et laisse la facture modifiable. Elle n'est pas comptabilisable.",
      "Non. Après une impression normale, la facture n'est plus modifiable.",
      "Non. Pour une facture déjà imprimée en réel, la réimpression est forcée en « Original ».",
      "Non. Les traites s'impriment après la facture, pas à sa place."
    ],
    "retenir": "Impression brouillon = contrôle, facture encore modifiable. Impression normale = facture figée.",
    "source": {
      "titre": "La facture",
      "url": "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704713774/La+facture"
    }
  },
  {
    "id": "dv01-q35",
    "dialecte": "Divalto 10.13",
    "q": "Une facture client est imprimée, mais pas encore intégrée en comptabilité. Que peut-on encore corriger ?",
    "choix": [
      "Les commerciaux et les axes analytiques",
      "Les quantités et les prix unitaires",
      "Le client facturé et son adresse",
      "La date et l'échéance de la facture"
    ],
    "bonne": 0,
    "pourquoi": [
      "Oui. Avec la confidentialité dédiée, on peut encore modifier les commerciaux et les axes analytiques.",
      "Non. Une facture imprimée est bloquée : les montants ne bougent plus.",
      "Non. Changer de client demande un avoir puis une nouvelle facture.",
      "Non. La date fait partie de ce qui est figé."
    ],
    "retenir": "Facture imprimée non intégrée : seuls commerciaux et axes analytiques restent modifiables (avec droit).",
    "source": {
      "titre": "La facture",
      "url": "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704713774/La+facture"
    }
  },
  {
    "id": "dv01-q36",
    "dialecte": "Divalto 10.13",
    "q": "Le mode de règlement d'un client prévoit une traite séparée. Quand peut-on l'imprimer ?",
    "choix": [
      "Après l'impression de la facture",
      "Après l'intégration en comptabilité",
      "Après la saisie d'un avoir",
      "Avant même la facture, au BL"
    ],
    "bonne": 0,
    "pourquoi": [
      "Oui. Une traite n'est imprimable que si la facture a été imprimée avant.",
      "Non. L'intégration comptable n'est pas la condition.",
      "Non. L'avoir n'a rien à voir avec la traite.",
      "Non. La facture doit être imprimée d'abord."
    ],
    "retenir": "Traite séparée : imprimer la facture d'abord.",
    "source": {
      "titre": "La facture",
      "url": "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704713774/La+facture"
    }
  },
  {
    "id": "dv01-q37",
    "dialecte": "Divalto 10.13",
    "q": "Tu fais un avoir SANS retour de marchandise. Que mettre en quantité livrée ?",
    "choix": [
      "0 : seul un flux financier est créé",
      "La quantité facturée d'origine",
      "Une quantité négative",
      "La quantité encore en stock"
    ],
    "bonne": 0,
    "pourquoi": [
      "Oui. Sans retour, la quantité livrée vaut 0 : l'avoir ne touche pas au stock.",
      "Non. Ce serait un avoir avec retour : le stock remonterait.",
      "Non. On ne saisit pas de quantité négative : c'est le code opération de l'avoir qui donne le sens.",
      "Non. Le stock actuel n'a aucun rapport avec l'avoir."
    ],
    "retenir": "Avoir avec retour : quantité retournée en « livrée ». Sans retour : livrée = 0.",
    "source": {
      "titre": "La facture",
      "url": "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704713774/La+facture"
    }
  },
  {
    "id": "dv01-q38",
    "dialecte": "Divalto 10.13",
    "q": "Quel compteur de numérotation automatique utilisent les avoirs clients ?",
    "choix": [
      "Le même compteur que les factures",
      "Un compteur réservé aux avoirs",
      "Le n° de la facture suivi de « A »",
      "Aucun avant leur impression"
    ],
    "bonne": 0,
    "pourquoi": [
      "Oui. La numérotation automatique des avoirs utilise le même compteur que les factures.",
      "Non. Il n'y a pas de compteur séparé pour les avoirs.",
      "Non. L'avoir a son propre numéro, pris dans le compteur des factures.",
      "Non. Le numéro est donné à la création, comme pour une facture."
    ],
    "retenir": "Factures et avoirs partagent le même compteur.",
    "source": {
      "titre": "La facture",
      "url": "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704713774/La+facture"
    }
  },
  {
    "id": "dv01-q39",
    "dialecte": "Divalto 10.13",
    "q": "Tu crées un avoir en dupliquant la facture d'origine. Que devient le numéro de cette facture ?",
    "choix": [
      "Reporté seul dans « Facture associée »",
      "À saisir à la main dans l'avoir",
      "Jamais mémorisé dans l'avoir",
      "Repris comme numéro de l'avoir"
    ],
    "bonne": 0,
    "pourquoi": [
      "Oui. Depuis la V10.6, il est reporté seul dans le champ « Facture associée » (onglet Complément de l'en-tête).",
      "Non. La saisie à la main sert quand on fait l'avoir directement, sans duplication.",
      "Non. C'était vrai avant la V10.6. La page « La facture » garde encore cette ancienne phrase.",
      "Non. L'avoir a son propre numéro ; la facture est seulement liée."
    ],
    "retenir": "Avoir par duplication (« Créer une pièce d'avoir ») : le lien avec la facture d'origine est gardé automatiquement.",
    "source": {
      "titre": "Lien Avoir - facture d'origine (V10.6)",
      "url": "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704718098/Lien+Avoir+-+facture+d+origine+V10.6"
    }
  },
  {
    "id": "dv01-q40",
    "dialecte": "Divalto 10.13",
    "q": "Depuis un avoir, comment ouvrir la facture d'origine ?",
    "choix": [
      "Menu Interrogation > Facture d'origine",
      "Menu Validation > Valider en facture",
      "Menu Outils > Dupliquer la pièce",
      "Explorateur de commandes clients"
    ],
    "bonne": 0,
    "pourquoi": [
      "Oui. Et dans l'autre sens, depuis la facture : Interrogation > Avoirs.",
      "Non. Ça transforme une pièce, ça ne retrouve pas son origine.",
      "Non. Dupliquer crée une nouvelle pièce.",
      "Non. On cherche une facture, pas une commande."
    ],
    "retenir": "Avoir → Interrogation > Facture d'origine. Facture → Interrogation > Avoirs.",
    "source": {
      "titre": "Lien Avoir - facture d'origine (V10.6)",
      "url": "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704718098/Lien+Avoir+-+facture+d+origine+V10.6"
    }
  },
  {
    "id": "dv01-q41",
    "dialecte": "Divalto 10.13",
    "q": "L'option « Contrôler le montant TTC de la pièce » est cochée. Un avoir dépasse le TTC de sa facture d'origine. Que se passe-t-il ?",
    "choix": [
      "La validation de l'avoir est refusée",
      "L'avoir passe avec un simple avertissement",
      "La facture d'origine est augmentée",
      "L'avoir est réduit automatiquement"
    ],
    "bonne": 0,
    "pourquoi": [
      "Oui. L'utilisateur ne peut pas valider l'avoir et reçoit un message.",
      "Non. Avec ce contrôle, c'est un blocage, pas un simple avertissement.",
      "Non. Une facture imprimée n'est jamais modifiée par un avoir.",
      "Non. Divalto ne corrige pas le montant à ta place."
    ],
    "retenir": "Contrôles d'avoir (dossier, onglet Pièces) : un avoir ne peut pas dépasser sa facture d'origine.",
    "source": {
      "titre": "La facture",
      "url": "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704713774/La+facture"
    }
  },
  {
    "id": "dv01-q42",
    "dialecte": "Divalto 10.13",
    "q": "Un client retourne un article défectueux, à détruire. Comment éviter qu'il revienne dans le stock ?",
    "choix": [
      "Un code opération sans mise à jour du stock",
      "Un avoir sans retour de marchandise",
      "Une annulation du BL d'origine",
      "Une ligne de retour passée en gratuit"
    ],
    "bonne": 0,
    "pourquoi": [
      "Oui. Sur la ligne du retour, on met un code opération prévu pour la mise au rebut : « Mettre à jour le stock » se décoche.",
      "Non. Ça marche pour l'argent, mais on perd la trace du retour physique.",
      "Non. L'annulation remet la quantité en stock : c'est l'inverse du but.",
      "Non. La gratuité change le prix, pas le stock."
    ],
    "retenir": "Retour à détruire : code opération « sans mise à jour du stock » sur la ligne, dans la saisie des retours clients.",
    "source": {
      "titre": "La facture",
      "url": "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704713774/La+facture"
    }
  },
  {
    "id": "dv01-q43",
    "dialecte": "Divalto 10.13",
    "q": "Aucune correspondance n'est trouvée dans la table des classes de commission. Quel taux de commission s'applique ?",
    "choix": [
      "Le taux global du commercial",
      "Aucun : commission à 0",
      "Le taux de la classe de l'article",
      "Le taux moyen du client"
    ],
    "bonne": 0,
    "pourquoi": [
      "Oui. Sans croisement trouvé, c'est le taux de commission de la fiche commercial qui s'applique.",
      "Non. Divalto a un taux de secours : celui du commercial.",
      "Non. La classe de l'article ne sert que croisée avec les autres, dans la table.",
      "Non. Il n'y a pas de taux moyen par client."
    ],
    "retenir": "Commission : croisement commercial × client × article, sinon taux global du commercial.",
    "source": {
      "titre": "La facture",
      "url": "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704713774/La+facture"
    }
  },
  {
    "id": "dv01-q44",
    "dialecte": "Divalto 10.13",
    "q": "Divalto calcule les commissions des commerciaux. Les paie-t-il automatiquement ?",
    "choix": [
      "Non : ni écriture, ni règlement",
      "Oui : écriture et virement",
      "Oui : écriture comptable seule",
      "Oui : avec la paie du commercial"
    ],
    "bonne": 0,
    "pourquoi": [
      "Oui. La doc le dit : pas de comptabilisation des commissions calculées, ni de règlement automatique.",
      "Non. Il n'y a ni écriture ni virement automatique.",
      "Non. Aucune écriture comptable n'est générée.",
      "Non. Le lien avec la paie n'est pas fait par ce calcul."
    ],
    "retenir": "Les commissions sont calculées (liste Commissionnement), pas comptabilisées ni payées automatiquement.",
    "source": {
      "titre": "La facture",
      "url": "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704713774/La+facture"
    }
  }
];
