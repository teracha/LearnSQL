// Divalto 10.13 — Achats, partie 2 : contremarque, Aide à l'Achat, frais d'approche et import, relances,
// suivi des fournisseurs, analyse des consommations, codes opération et tarifs, réception WMS et terminaux.
// Source : base documentaire Divalto (dépôt Divalto_10), pages citées dans chaque question.
LEARNSQL.questions.dv03 = [
  {
    "id": "dv03-q01",
    "dialecte": "Divalto 10.13",
    "q": "Un client commande la pose d'un liner : un article de service, paramétré hors stock. Peux-tu le passer en contremarque ?",
    "choix": [
      "Oui, s'il a un fournisseur habituel",
      "Oui, en directe, sans passer par le stock",
      "Non, il doit être géré en stock",
      "Non, seuls les articles de contremarque"
    ],
    "bonne": 2,
    "pourquoi": [
      "Non. Le fournisseur habituel permet de passer en contremarque un article normal géré en stock. Un article hors stock reste exclu.",
      "Non. Même en directe, la contremarque ne fonctionne pas avec un article hors stock.",
      "Oui. La contremarque marche avec un article de contremarque, ou avec un article normal géré en stock. Les articles hors stock ne fonctionnent pas en contremarque.",
      "Non. Un article normal géré en stock peut aussi passer en contremarque, par exemple quand le stock ne suffit pas."
    ],
    "retenir": "Contremarque : article de contremarque ou article géré en stock. Jamais un article hors stock.",
    "source": {
      "titre": "La contremarque",
      "url": "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704719489/La+contremarque"
    }
  },
  {
    "id": "dv03-q02",
    "dialecte": "Divalto 10.13",
    "q": "Commande client : tu saisis 50 unités d'un article de contremarque. Le stock est vide. Que fait Divalto ?",
    "choix": [
      "Il affiche l'alerte de disponible insuffisant",
      "Il bloque la ligne faute de stock",
      "Il propose de réserver sur le stock",
      "Il n'affiche pas d'alerte de disponible"
    ],
    "bonne": 3,
    "pourquoi": [
      "Non. Pour un article contremarqué, le message « Disponible insuffisant. Voulez-vous consulter le disponible ? » n'est pas activé.",
      "Non. La ligne n'est pas bloquée : la contremarque sert justement à acheter ce qui manque.",
      "Non. Rien n'est proposé à la saisie de la quantité : l'alerte sur le disponible n'est pas activée.",
      "Oui. Pour un article de contremarque, l'alerte « Disponible insuffisant » n'est pas activée. Le stock et le disponible restent consultables par clic droit sur la quantité."
    ],
    "retenir": "Article de contremarque : pas d'alerte « Disponible insuffisant » en saisie de commande.",
    "source": {
      "titre": "Saisie de pièce de contremarque",
      "url": "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704720012/Saisie+de+pi+ce+de+contremarque"
    }
  },
  {
    "id": "dv03-q03",
    "dialecte": "Divalto 10.13",
    "q": "Le dossier lance l'assistant de contremarque à la création de la commande client. Tu ajoutes une ligne de contremarque à une commande déjà créée. Comment obtenir la commande fournisseur ?",
    "choix": [
      "L'assistant s'ouvre seul, comme en création",
      "Avec le bouton Générer contremarque",
      "Il faut supprimer puis recréer la commande",
      "Seulement par le CBN en contremarque"
    ],
    "bonne": 1,
    "pourquoi": [
      "Non. L'ouverture automatique se fait seulement à la validation d'une commande en création.",
      "Oui. Hors création, on lance le traitement à la main : bouton « Générer contremarque », ou menu Outils > « Générer la contremarque ».",
      "Non. Inutile de recréer la commande : le traitement se lance à la demande.",
      "Non. Le CBN a sa propre contremarque. La contremarque « pilotée » se lance, elle, depuis la commande client."
    ],
    "retenir": "Assistant de contremarque : automatique en création de commande (si le dossier le prévoit), sinon bouton « Générer contremarque ».",
    "source": {
      "titre": "Assistant de création de commandes de contremarques fournisseur",
      "url": "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704719682/Assistant+de+cr+ation+de+commandes+de+contremarques+fournisseur"
    }
  },
  {
    "id": "dv03-q04",
    "dialecte": "Divalto 10.13",
    "q": "Dans l'explorateur de pièces, une ligne de contremarque a un indicateur rouge. Qu'est-ce que ça veut dire ?",
    "choix": [
      "Aucune commande fournisseur liée",
      "Le fournisseur a un retard de livraison",
      "L'encours de ce client est dépassé",
      "On a commandé plus que le besoin client"
    ],
    "bonne": 0,
    "pourquoi": [
      "Oui. Rouge = lien inexistant : la réservation affectée est à 0, la commande fournisseur n'est pas générée.",
      "Non. Ces couleurs parlent du lien entre commande client et commande fournisseur, pas des délais.",
      "Non. La couleur est calculée sur les réservations affectées, pas sur l'encours.",
      "Non. Ça, c'est l'orange : lien incomplet, la réservation affectée est différente de la quantité du mouvement."
    ],
    "retenir": "Contremarque : rouge = pas de commande fournisseur, orange = lien incomplet, vert = lien complet.",
    "source": {
      "titre": "Les indicateurs de contremarque _ Principes",
      "url": "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704719752/Les+indicateurs+de+contremarque+_+Principes"
    }
  },
  {
    "id": "dv03-q05",
    "dialecte": "Divalto 10.13",
    "q": "Une commande client a une ligne en contremarque directe au vert, et une ligne en contremarque réceptionnée au rouge. Quel indicateur l'explorateur montre-t-il sur la pièce ?",
    "choix": [
      "Directe au vert, la directe passe toujours avant",
      "Directe au rouge, en mélangeant les deux lignes",
      "Réceptionnée en orange, la moyenne des deux",
      "Réceptionnée au rouge, le pire cas passe avant"
    ],
    "bonne": 3,
    "pourquoi": [
      "Non. La page dit que la directe « prend le dessus », mais sa règle détaillée la fait passer avant seulement à couleur égale. Une ligne rouge, même réceptionnée, passe avant une ligne verte.",
      "Non. Divalto ne mélange pas les lignes : il reprend le type et la couleur de la ligne la plus problématique.",
      "Non. Il n'y a pas de couleur moyenne : on montre le pire cas, pour pousser à ouvrir l'arbre.",
      "Oui. Ordre : directe rouge, puis réceptionnée rouge, puis directe orange, réceptionnée orange, directe verte, réceptionnée verte. Ici, pas de directe rouge : la pièce est « réceptionnée rouge »."
    ],
    "retenir": "Indicateur de la pièce : le rouge passe avant l'orange, l'orange avant le vert ; à couleur égale, la directe passe avant.",
    "source": {
      "titre": "Les indicateurs de contremarque : technique",
      "url": "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704719819/Les+indicateurs+de+contremarque+technique"
    }
  },
  {
    "id": "dv03-q06",
    "dialecte": "Divalto 10.13",
    "q": "Article de contremarque : l'assistant ignore le délai d'appro, le minimum et le multiple du fournisseur. Le dossier ne gère pas la fiche de réappro depuis la fiche article. Que manque-t-il sans doute ?",
    "choix": [
      "Une famille de réappro dans le dossier",
      "La règle de gestion CBN de l'article",
      "Les conditions de réappro du fournisseur",
      "Un tarif de contremarque chez ce fournisseur"
    ],
    "bonne": 2,
    "pourquoi": [
      "Non. La famille de réappro sert au calcul des besoins (délai entre deux commandes, taux de service). Elle ne porte pas les contraintes du fournisseur.",
      "Non. La règle de gestion CBN organise les flux entre dépôts. Elle ne donne ni délai, ni minimum, ni multiple.",
      "Oui. Les sous-fiches « conditions de réapprovisionnement » (bouton Fournisseur) ne sont pas créées toutes seules. La contremarque y lit le délai, la quantité minimale et le multiple.",
      "Non. Le tarif de contremarque donne un prix. Il ne porte ni délai, ni minimum, ni multiple."
    ],
    "retenir": "Contremarque : délai, minimum et multiple viennent des « conditions de réapprovisionnement » du fournisseur. Sans l'option du dossier, elles ne sont pas créées toutes seules.",
    "source": {
      "titre": "Contremarque : Conditions de réapprovisionnement",
      "url": "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704719911/Contremarque+Conditions+de+r+approvisionnement"
    }
  },
  {
    "id": "dv03-q07",
    "dialecte": "Divalto 10.13",
    "q": "Option « Compléter par défaut une commande provisoire existante » cochée. Une commande provisoire existe chez le fournisseur habituel, livrée à ton dépôt. Nouvelle ligne en contremarque directe, livrée chez le client. Où va-t-elle ?",
    "choix": [
      "Sur cette provisoire, comme toujours",
      "Pas sur celle-ci, l'adresse diffère",
      "Sur la provisoire, à l'adresse du client",
      "Nulle part, la ligne reste sans commande"
    ],
    "bonne": 1,
    "pourquoi": [
      "Non. La recherche automatique tient compte de l'adresse de livraison : la provisoire livrée au dépôt n'est pas retenue.",
      "Oui. La commande provisoire choisie doit porter la même adresse de livraison que la commande client. Livrée au dépôt, elle ne convient pas à une livraison directe chez le client.",
      "Non. On ne peut pas choisir une commande d'achat dont l'adresse de livraison est différente de celle du client.",
      "Non. La ligne n'est pas bloquée : elle ira sur une commande qui a la bonne adresse de livraison."
    ],
    "retenir": "Compléter une commande provisoire en contremarque : seulement si elle a la même adresse de livraison que la commande client.",
    "source": {
      "titre": "Commandes provisoires en contremarque (V10.5)",
      "url": "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704719860/Commandes+provisoires+en+contremarque+V10.5"
    }
  },
  {
    "id": "dv03-q08",
    "dialecte": "Divalto 10.13",
    "q": "Une commande provisoire de contremarque attend chez ton fournisseur de pompes. Un client a besoin d'une pompe en urgence, livrée chez lui par le fournisseur. Comment lancer une commande active sans toucher à la provisoire ?",
    "choix": [
      "Cocher la case Direct dans l'arbitrage",
      "Activer d'abord la commande provisoire",
      "Supprimer la provisoire puis relancer",
      "Passer par une demande d'achat urgente"
    ],
    "bonne": 0,
    "pourquoi": [
      "Oui. Depuis la V10.9, avec l'option du dossier, la ligne va par défaut sur la provisoire. En urgence, on coche la case D « Direct » : une commande directe active est créée, la provisoire ne bouge pas.",
      "Non. La provisoire sert à grouper les besoins jusqu'au bon volume. L'activer maintenant l'enverrait trop tôt, avec ses autres lignes.",
      "Non. Rien à supprimer : la case D suffit. En indirect, c'est la case A « Actif ».",
      "Non. Une demande d'achat ajoute une étape. La contremarque crée directement la commande."
    ],
    "retenir": "Urgence en contremarque : case D pour une directe, case A pour une indirecte active ; la provisoire reste en attente.",
    "source": {
      "titre": "Commandes provisoires en contremarque (V10.5)",
      "url": "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704719860/Commandes+provisoires+en+contremarque+V10.5"
    }
  },
  {
    "id": "dv03-q09",
    "dialecte": "Divalto 10.13",
    "q": "Le vendeur a négocié un prix spécial de contremarque avec un fournisseur. Ce fournisseur n'est pas dans le référencement de l'article. Qui l'arbitrage propose-t-il par défaut ?",
    "choix": [
      "Le fournisseur principal, prix spécial",
      "Le moins cher parmi les référencés",
      "Celui du prix spécial, même non référencé",
      "Aucun, il faut d'abord le référencer"
    ],
    "bonne": 2,
    "pourquoi": [
      "Non. Le fournisseur principal est proposé en temps normal. Avec un prix spécial négocié, c'est le fournisseur de ce prix qui est proposé.",
      "Non. L'arbitrage ne cherche pas le moins cher : il suit le prix négocié par le vendeur.",
      "Oui. Depuis la V10.4, le fournisseur du prix spécial est proposé et sélectionné par défaut, même hors référencement. On achète chez le bon fournisseur, au prix négocié.",
      "Non. Pas besoin de référencement : le fournisseur du prix spécial est proposé quand même."
    ],
    "retenir": "Prix spécial de contremarque : son fournisseur est proposé par défaut à l'arbitrage, même s'il n'est pas référencé.",
    "source": {
      "titre": "Arbitrage de la contremarque",
      "url": "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704719788/Arbitrage+de+la+contremarque"
    }
  },
  {
    "id": "dv03-q10",
    "dialecte": "Divalto 10.13",
    "q": "L'ADV veut écrire, dans la note de la commande client, une consigne pour le fournisseur (pas pour l'acheteur). Quelle balise utiliser ?",
    "choix": [
      "#F2N#, reprise en note de la ligne",
      "Aucune, la note interne part déjà",
      "Aucune, on l'imprime sur le BL client",
      "#F2T#, reprise en texte de la ligne"
    ],
    "bonne": 3,
    "pourquoi": [
      "Non. #F2N# va dans la note de la ligne de commande fournisseur : ce sont des consignes internes, pour l'acheteur.",
      "Non. La note interne se structure avec des balises : c'est le paragraphe entre #F2T# qui part dans le texte de la ligne fournisseur.",
      "Non. Les balises alimentent la commande fournisseur, pas le BL client.",
      "Oui. #F2T# délimite un paragraphe repris dans le texte de la ligne de commande fournisseur : des consignes externes, pour le fournisseur."
    ],
    "retenir": "Contremarque : #F2N# = note pour l'acheteur, #F2T# = texte pour le fournisseur.",
    "source": {
      "titre": "Arbitrage de la contremarque",
      "url": "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704719788/Arbitrage+de+la+contremarque"
    }
  },
  {
    "id": "dv03-q11",
    "dialecte": "Divalto 10.13",
    "q": "Génération en masse des contremarques : 5 lignes de commande client de 2 unités, même article. Le fournisseur impose un minimum de 15. « Appliquer des contraintes fournisseur » est cochée. Que contient la commande fournisseur ?",
    "choix": [
      "10 unités, le minimum est ignoré",
      "15 unités, toutes réservées aux clients",
      "5 commandes de 3 unités chacune",
      "15 unités, dont 5 sans réservation"
    ],
    "bonne": 3,
    "pourquoi": [
      "Non. Avec la coche, les contraintes du fournisseur s'appliquent : on ne commande pas sous son minimum.",
      "Non. Les clients n'ont commandé que 10 : les 5 en plus ne sont réservés pour personne.",
      "Non. Le programme ne découpe pas ainsi : il garde les ventilations des clients et ajoute ce qui manque.",
      "Oui. La commande a 5 ventilations de 2 en réservation affectée (une par commande client), plus une ventilation de 5 sans réservation. Total : 15, le minimum du fournisseur."
    ],
    "retenir": "Contraintes fournisseur en contremarque : on complète jusqu'au minimum, et le surplus n'est réservé pour personne.",
    "source": {
      "titre": "Générer en masse les commandes fournisseur de contremarque (V10.10)",
      "url": "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704720113/G+n+rer+en+masse+les+commandes+fournisseur+de+contremarque+V10.10"
    }
  },
  {
    "id": "dv03-q12",
    "dialecte": "Divalto 10.13",
    "q": "Post-réception de contremarque : la commande client mélange des lignes en stock et des lignes en contremarque pas encore là. Tu veux expédier tout de suite les lignes en stock. Que fais-tu ?",
    "choix": [
      "Attendre que toute la commande soit là",
      "Forcer la quantité livrable des lignes",
      "Passer à zéro les lignes de contremarque",
      "Supprimer les lignes de contremarque"
    ],
    "bonne": 2,
    "pourquoi": [
      "Non. Un ancien paragraphe de la page exige une « livraison totale ». Depuis la V10.12, on peut modifier les quantités à livrer : pas besoin d'attendre.",
      "Non. On ne peut pas dépasser la quantité livrable.",
      "Oui. Depuis la V10.12, la quantité à livrer se modifie : une ligne à 0 ne figure pas sur le BL client. Il faut au moins une ligne non nulle pour valider.",
      "Non. Inutile de supprimer : une quantité à livrer à 0 suffit, la ligne n'est pas sur ce BL client."
    ],
    "retenir": "Post-réception (V10.12) : quantité à livrer modifiable, sans dépasser le livrable ; 0 = la ligne n'est pas livrée.",
    "source": {
      "titre": "Post réception de contremarque",
      "url": "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704719606/Post+r+ception+de+contremarque"
    }
  },
  {
    "id": "dv03-q13",
    "dialecte": "Divalto 10.13",
    "q": "Contremarque directe : le client a commandé 1 000 litres de chlore liquide. Le fournisseur lui livre 983 litres et solde sa commande. Les reliquats à la ligne sont bien paramétrés. Que livre-t-on au client ?",
    "choix": [
      "983 litres, sans reliquat",
      "1 000 litres, comme commandé",
      "983 litres, plus 17 en reliquat",
      "Rien, l'écart bloque la livraison"
    ],
    "bonne": 0,
    "pourquoi": [
      "Oui. La livraison client prend la quantité réellement livrée par le fournisseur : 983 litres, et pas de reliquat. Il faut « Autoriser la gestion des reliquats à la ligne » sur Toujours (dossier) et « Gérer les reliquats à la ligne » sur le tiers.",
      "Non. On ne livre pas au client plus que ce que le fournisseur lui a livré.",
      "Non. Le fournisseur a soldé : il n'y a pas de reliquat de 17 litres.",
      "Non. L'écart ne bloque rien : la post-réception propose aussi les lignes incomplètes en livraison directe."
    ],
    "retenir": "Contremarque directe soldée à une quantité proche : le client est livré de la quantité réelle, sans reliquat.",
    "source": {
      "titre": "Post réception de contremarque",
      "url": "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704719606/Post+r+ception+de+contremarque"
    }
  },
  {
    "id": "dv03-q14",
    "dialecte": "Divalto 10.13",
    "q": "Contremarque réceptionnée, avec la mise à jour des délais activée dans le dossier. Délai confirmé au client : le 10. Le fournisseur livre le 8. Temps de traitement réception/livraison : 3 jours. Que se passe-t-il à l'enregistrement de la commande fournisseur ?",
    "choix": [
      "Rien, le 8 tombe avant le 10",
      "Le délai client passe seul au 11",
      "Il bloque la commande fournisseur",
      "Il propose de reporter au 11"
    ],
    "bonne": 3,
    "pourquoi": [
      "Non. Divalto ajoute le temps de traitement : 8 + 3 = le 11. Le client attend le 10 : c'est trop juste.",
      "Non. Rien ne change sans ton accord : une boîte de dialogue te demande d'abord.",
      "Non. Le contrôle ne bloque pas : il propose de mettre à jour le délai du client.",
      "Oui. Le délai confirmé (le 10) est plus petit que livraison fournisseur + temps de traitement (8 + 3 = le 11). Une boîte de dialogue propose de mettre le délai reporté du client au 11."
    ],
    "retenir": "Contremarque réceptionnée : si livraison fournisseur + temps de traitement dépasse le délai client, Divalto propose de le reporter.",
    "source": {
      "titre": "Paramétrage Fiche dossier - Onglet Contremarque",
      "url": "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704719513/Param+trage+Fiche+dossier+-+Onglet+Contremarque"
    }
  },
  {
    "id": "dv03-q15",
    "dialecte": "Divalto 10.13",
    "q": "Ton dépôt est géré en WMS. Une commande en contremarque directe vient d'être livrée chez ton client par le fournisseur. Comment enregistres-tu cette livraison ?",
    "choix": [
      "Réception sur le terminal WMS au quai",
      "Valider la commande d'achat en BL",
      "Déclaration d'une réception WMS",
      "Rien, la commande se solde seule"
    ],
    "bonne": 1,
    "pourquoi": [
      "Non. La marchandise n'est jamais passée par ton quai : pas de réception WMS.",
      "Oui. On valide la commande fournisseur en BL sans passer par les programmes WMS : la marchandise est allée chez le client, pas dans ton dépôt. L'écran de post-réception de contremarque s'affiche ensuite.",
      "Non. La déclaration de réception crée du stock WMS : ici, rien n'entre dans le dépôt.",
      "Non. Il faut un BL fournisseur pour constater la livraison et lancer la livraison client."
    ],
    "retenir": "Contremarque directe et WMS : BL fournisseur dans Divalto, sans les programmes de réception WMS.",
    "source": {
      "titre": "Contremarque, réservations affectées sur commande et le WMS",
      "url": "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11705931976/Contremarque+r+servations+affect+es+sur+commande+et+le+WMS"
    }
  },
  {
    "id": "dv03-q16",
    "dialecte": "Divalto 10.13",
    "q": "Le CBN gère un article en méthode contremarque directe. Un client commande 3 pompes. Le fournisseur a un minimum de 10. Que propose le CBN ?",
    "choix": [
      "10 pompes, le minimum du fournisseur",
      "13 pompes, le besoin plus le minimum",
      "3 pompes, sans tenir compte du minimum",
      "Rien, il attend d'autres besoins client"
    ],
    "bonne": 2,
    "pourquoi": [
      "Non. En contremarque directe, la quantité minimale et le multiple ne sont pas utilisés.",
      "Non. On n'ajoute pas le minimum au besoin : il n'est pas utilisé ici.",
      "Oui. En directe, le client commande une quantité précise : inutile d'envoyer et de facturer plus. Le CBN fait aussi une commande par commande client.",
      "Non. Comme en réceptionnée, le CBN propose dès que le disponible à date est négatif : il n'attend pas d'autres besoins."
    ],
    "retenir": "CBN en contremarque directe : la quantité exacte du client, sans minimum ni multiple.",
    "source": {
      "titre": "Utiliser le CBN (Calcul des Besoins Nets) - Réapprovisionnement",
      "url": "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11705849126/Utiliser+le+CBN+Calcul+des+Besoins+Nets+-+R+approvisionnement"
    }
  },
  {
    "id": "dv03-q17",
    "dialecte": "Divalto 10.13",
    "q": "Tu ouvres l'Aide à l'Achat en mode « Collecte des sources ». Est-ce que cette collecte recalcule les besoins, comme un CBN ?",
    "choix": [
      "Oui, elle relance le CBN pour ces articles",
      "Non, elle lit seulement l'existant",
      "Oui, si Proposition CBN est cochée",
      "Non, elle ne lit que les demandes d'achat"
    ],
    "bonne": 1,
    "pourquoi": [
      "Non. La collecte ne lance pas de CBN. Lance le CBN avant, pour avoir des propositions à jour.",
      "Oui. La collecte recherche dans Divalto les informations qui existent déjà : propositions CBN, demandes d'achat, commandes provisoires. Elle ne lance pas de CBN.",
      "Non. Cocher Proposition CBN fait lire les propositions déjà calculées. Ça ne relance pas le calcul.",
      "Non. Elle lit aussi les propositions CBN et les commandes provisoires de contremarque, selon les sources cochées."
    ],
    "retenir": "Aide à l'Achat : elle rassemble l'existant. Elle ne remplace pas le lancement du CBN.",
    "source": {
      "titre": "Ecran de sélection",
      "url": "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704721639/Ecran+de+s+lection"
    }
  },
  {
    "id": "dv03-q18",
    "dialecte": "Divalto 10.13",
    "q": "Pour un fournisseur, tu veux voir ensemble les propositions CBN, les demandes d'achat des services et les commandes provisoires de contremarque. Quel outil ?",
    "choix": [
      "L'administration des propositions CBN",
      "La supervision des demandes d'achat",
      "La relance de pièce fournisseur",
      "L'Aide à l'Achat en vue fournisseur"
    ],
    "bonne": 3,
    "pourquoi": [
      "Non. L'administration des propositions ne montre que les propositions du CBN.",
      "Non. La supervision ne montre que les demandes d'achat.",
      "Non. La relance sert à relancer un fournisseur sur un devis ou une commande.",
      "Oui. L'Aide à l'Achat (V10.9) donne une vue globale des propositions CBN, des demandes d'achat et des commandes provisoires de la contremarque, avec les statistiques des articles."
    ],
    "retenir": "Aide à l'Achat = propositions CBN + demandes d'achat + commandes provisoires, dans un seul écran.",
    "source": {
      "titre": "Aide à l'Achat (V10.9)",
      "url": "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704721611/Aide+l+Achat+V10.9"
    }
  },
  {
    "id": "dv03-q19",
    "dialecte": "Divalto 10.13",
    "q": "Deux acheteurs utilisent l'Aide à l'Achat en même temps. Comment éviter qu'ils traitent le même fournisseur ?",
    "choix": [
      "Réserver le fournisseur puis le libérer",
      "Marquer ses lignes avec la touche F5",
      "Changer le fournisseur des propositions",
      "Lancer chacun sa propre collecte"
    ],
    "bonne": 0,
    "pourquoi": [
      "Oui. « Réserver le fournisseur » bloque son traitement par les autres utilisateurs, un pictogramme le montre. Une fois fini, on fait « Libérer le fournisseur ».",
      "Non. Le marquage sert à lancer un traitement en masse. Il ne bloque pas les autres acheteurs.",
      "Non. Changer de fournisseur déplace les propositions : ça ne protège pas le travail en cours.",
      "Non. Les propositions restent partagées : sans réservation, deux acheteurs peuvent travailler sur les mêmes lignes."
    ],
    "retenir": "Aide à l'Achat : on réserve le fournisseur avant de travailler, on le libère après.",
    "source": {
      "titre": "Ecran d'administration des résultats",
      "url": "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704721667/Ecran+d+administration+des+r+sultats"
    }
  },
  {
    "id": "dv03-q20",
    "dialecte": "Divalto 10.13",
    "q": "Aide à l'Achat : une proposition regroupe 100 venus du CBN et 50 d'une demande d'achat, soit 150. Tu retiens 120 et tu génères la commande. Que deviennent les deux sources ?",
    "choix": [
      "Le CBN est traité, la demande garde 30",
      "Les deux se partagent le reste de 30",
      "Toutes deux traitées et verrouillées",
      "Rien n'est verrouillé avant la réception"
    ],
    "bonne": 2,
    "pourquoi": [
      "Non. La demande d'achat ne garde pas de solde : elle est considérée comme traitée.",
      "Non. Aucun reste n'est gardé : les sources sont verrouillées en totalité.",
      "Oui. 120 ne couvre pas les deux sources en entier : une source est couverte en partie. Dans ce cas, toutes les sources sont traitées en totalité et verrouillées, et la demande d'achat passe périmée, liée à la commande.",
      "Non. Le verrouillage se fait à la génération de la commande, pour éviter les doublons."
    ],
    "retenir": "Aide à l'Achat : si tu retiens moins que calculé et couvres une source en partie, toutes les sources sont quand même verrouillées.",
    "source": {
      "titre": "Ecran d'administration des résultats",
      "url": "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704721667/Ecran+d+administration+des+r+sultats"
    }
  },
  {
    "id": "dv03-q21",
    "dialecte": "Divalto 10.13",
    "q": "Facture de fret : 200 €. Son type de frais d'approche prend 50 % du montant, réparti au poids. Les pompes font 75 % du poids de la commande. Combien de frais vont sur les pompes ?",
    "choix": [
      "50 €",
      "75 €",
      "100 €",
      "150 €"
    ],
    "bonne": 1,
    "pourquoi": [
      "Non. 50 €, c'est appliquer 50 % deux fois (50 % de 100 €). La 2e étape prend la part du poids des pompes : 75 %.",
      "Oui. 50 % de 200 € = 100 € à répartir, puis 75 % de 100 € au poids = 75 € sur les pompes. Attention : l'exemple chiffré de la page contient des erreurs de calcul.",
      "Non. 100 €, c'est la part à répartir (50 % de 200 €). Il faut encore appliquer les 75 % du poids.",
      "Non. 150 €, c'est 75 % de 200 € : le pourcentage du type de frais est oublié."
    ],
    "retenir": "Frais d'approche : montant × % du type de frais, puis répartition selon le mode (quantité, montant, poids ou volume).",
    "source": {
      "titre": "Gérer le module Grand Import (V10.4)",
      "url": "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704724280/G+rer+le+module+Grand+Import+V10.4"
    }
  },
  {
    "id": "dv03-q22",
    "dialecte": "Divalto 10.13",
    "q": "Tu lances le calcul des frais d'approche. L'option « Mettre à jour le coût de revient dans la fiche sous-références » n'est pas cochée. Qu'est-ce qui change ?",
    "choix": [
      "Le CR des entrées et des sorties liées",
      "Le CR de la fiche sous-référence seul",
      "Le prix d'achat des commandes liées",
      "Rien tant que la fiche n'est pas terminée"
    ],
    "bonne": 0,
    "pourquoi": [
      "Oui. Le calcul met à jour le coût des entrées, puis lance l'affectation des coûts de revient : les sorties liées (un BL client, par exemple) suivent.",
      "Non. Sans l'option (V10.8), le CR de la fiche sous-référence est mis à jour seulement à l'entrée de la marchandise.",
      "Non. Les frais majorent le coût de revient. Le prix d'achat des pièces ne change pas.",
      "Non. Le calcul agit tout de suite. Tant que la fiche n'est pas terminée, on peut même le relancer."
    ],
    "retenir": "Calcul des frais d'approche : CR des entrées et des sorties liées. La fiche sous-référence change seulement avec l'option (V10.8).",
    "source": {
      "titre": "Gérer le module Grand Import (V10.4)",
      "url": "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704724280/G+rer+le+module+Grand+Import+V10.4"
    }
  },
  {
    "id": "dv03-q23",
    "dialecte": "Divalto 10.13",
    "q": "Une facture de transitaire arrive après que tu as passé la fiche de frais d'approche à « terminé ». Que faut-il faire pour l'imputer ?",
    "choix": [
      "La lier directement, le calcul suit",
      "Créer une nouvelle fiche pour ce frais",
      "Relancer le calcul, sans rien changer",
      "Remettre la fiche en Actif, puis lier"
    ],
    "bonne": 3,
    "pourquoi": [
      "Non. Sur une fiche terminée, on ne peut plus lier de frais ni de produits, ni lancer de calcul.",
      "Non. On crée une fiche par importation, et celle-ci existe déjà avec ses produits liés. Une fiche terminée se réactive.",
      "Non. Le calcul est impossible sur une fiche terminée, et la nouvelle facture n'est pas encore liée.",
      "Oui. On remet la fiche au statut Actif (liste des fiches de frais d'approche). Puis on lie la facture et on relance le calcul."
    ],
    "retenir": "Fiche de frais d'approche terminée : plus de lien ni de calcul. On la remet en Actif pour la compléter.",
    "source": {
      "titre": "Gérer le module Grand Import (V10.4)",
      "url": "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704724280/G+rer+le+module+Grand+Import+V10.4"
    }
  },
  {
    "id": "dv03-q24",
    "dialecte": "Divalto 10.13",
    "q": "Fiche de frais d'approche : 5 robots achetés 40 € au total, puis un avoir financier de 5 €. Les frais imputés à la ligne valent 35 €. Quel CR unitaire ?",
    "choix": [
      "13 €",
      "14 €",
      "15 €",
      "17,50 €"
    ],
    "bonne": 1,
    "pourquoi": [
      "Non. 13 €, c'est en déduisant l'avoir deux fois. Il ne se déduit qu'une fois, du montant d'achat.",
      "Oui. Montant actualisé = 40 – 5 = 35 € ; avec un avoir financier, la quantité reste 5. CR = (35 + 35) / 5 = 14 €.",
      "Non. 15 €, c'est sans l'avoir. Depuis la V10.10, l'avoir est déduit du montant d'achat.",
      "Non. 17,50 €, c'est en retirant un robot. Un avoir financier ne retire pas de quantité."
    ],
    "retenir": "Frais d'approche avec avoir : CR = (achat – avoir + frais) / quantité actualisée. Avoir financier = quantité inchangée.",
    "source": {
      "titre": "Gérer le module Grand Import (V10.4)",
      "url": "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704724280/G+rer+le+module+Grand+Import+V10.4"
    }
  },
  {
    "id": "dv03-q25",
    "dialecte": "Divalto 10.13",
    "q": "Ta facture fournisseur porte 40 € de port en pied de pièce. Après le calcul des frais d'approche, le CR des liners ne bouge pas. Que vérifier ?",
    "choix": [
      "Le mode de transport de la fiche fournisseur",
      "L'incoterm saisi sur la facture fournisseur",
      "Le pied coché dans le dossier Grand Import",
      "Le franco, qui annule le pied de pièce"
    ],
    "bonne": 2,
    "pourquoi": [
      "Non. Le mode de transport ne décide pas de la prise en compte des frais dans le coût de revient.",
      "Non. L'incoterm peut porter un type de frais pour des lignes de frais. Il ne remplace pas la coche du dossier pour les pieds de pièce.",
      "Oui. Un frais de pied ne compte que si « Prendre en compte pied de pièce fournisseur » 1, 2 ou 3 est coché dans le dossier Grand Import. Son article doit aussi avoir la nature de produit et le type de frais d'approche.",
      "Non. Ici, le port est bien sur la facture : la question est de savoir s'il entre dans le calcul."
    ],
    "retenir": "Frais en pied de pièce : pris dans les frais d'approche seulement si le dossier Grand Import les coche.",
    "source": {
      "titre": "Gérer le module Grand Import (V10.4)",
      "url": "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704724280/G+rer+le+module+Grand+Import+V10.4"
    }
  },
  {
    "id": "dv03-q26",
    "dialecte": "Divalto 10.13",
    "q": "Fiche Grand Import : une étape a généré les écritures de stock en transit. Tu veux y lier une commande d'achat de plus. Est-ce possible ?",
    "choix": [
      "Oui, avec le bouton Lier commandes",
      "Non, plus de nouveau lien",
      "Oui, avec Lier lignes commandes",
      "Non, sauf par un chargement"
    ],
    "bonne": 1,
    "pourquoi": [
      "Non. Dès que des écritures comptables ont été générées, aucune nouvelle liaison n'est possible.",
      "Oui. Après la génération des écritures, plus aucune nouvelle liaison : ni lignes de commandes, ni commandes, ni chargements.",
      "Non. Lier une sélection de lignes est aussi une nouvelle liaison : c'est bloqué.",
      "Non. Lier un chargement de conteneur est bloqué de la même façon."
    ],
    "retenir": "Fiche Grand Import : après les écritures de stock en transit, plus de nouvelle liaison.",
    "source": {
      "titre": "Gérer le module Grand Import (V10.4)",
      "url": "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704724280/G+rer+le+module+Grand+Import+V10.4"
    }
  },
  {
    "id": "dv03-q27",
    "dialecte": "Divalto 10.13",
    "q": "Saisie des déclarations en douane (DED) : un article de la fiche Grand Import n'a pas de nomenclature douanière. Que se passe-t-il ?",
    "choix": [
      "Il est ignoré, les autres sont calculés",
      "Il prend la nomenclature par défaut",
      "Il bloque tout calcul, avec une alerte",
      "Il est calculé au taux le plus élevé"
    ],
    "bonne": 2,
    "pourquoi": [
      "Non. Un seul article orphelin suffit : aucun calcul n'est fait, pour aucun article.",
      "Non. Il n'y a pas de nomenclature par défaut : chaque article importé doit en avoir une (fiche article, onglet Comptabilité).",
      "Oui. S'il existe ne serait-ce qu'un article orphelin, la répartition et la saisie DED ne calculent rien. Un message demande de renseigner le code nomenclature douanière.",
      "Non. Divalto n'invente pas de taux : sans nomenclature, il ne calcule pas."
    ],
    "retenir": "DED : un seul article sans nomenclature douanière bloque tout le calcul.",
    "source": {
      "titre": "Gérer le module Grand Import (V10.4)",
      "url": "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704724280/G+rer+le+module+Grand+Import+V10.4"
    }
  },
  {
    "id": "dv03-q28",
    "dialecte": "Divalto 10.13",
    "q": "Achat hors Union européenne géré en DED (V10.9). Tu veux aussi passer ses frais par l'administration des frais d'approche. Est-ce possible ?",
    "choix": [
      "Non, ils se lient à la fiche Grand Import",
      "Oui, les deux outils se complètent",
      "Oui, si la fiche de frais a le même code",
      "Non, la DED n'accepte aucun frais"
    ],
    "bonne": 0,
    "pourquoi": [
      "Oui. En DED, la fiche frais d'approche n'est pas utilisée. Les pièces de frais sont rattachées à la fiche Grand Import, puis réparties par le calcul DED.",
      "Non. La doc le précise : l'administration des frais d'approche n'est pas compatible avec la DED.",
      "Non. Le même code (V10.8) sert à créer une fiche de frais depuis la fiche Grand Import. Ça ne rend pas la DED compatible.",
      "Non. La DED prend bien des frais, s'ils sont rattachés à la fiche Grand Import."
    ],
    "retenir": "DED : pas d'administration des frais d'approche ; les frais se rattachent à la fiche Grand Import.",
    "source": {
      "titre": "Gérer le module Grand Import (V10.4)",
      "url": "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704724280/G+rer+le+module+Grand+Import+V10.4"
    }
  },
  {
    "id": "dv03-q29",
    "dialecte": "Divalto 10.13",
    "q": "Ton fournisseur de pompes n'a pas répondu à ta demande de prix (devis fournisseur). Quel programme permet de le relancer ?",
    "choix": [
      "La relance ARC du fournisseur",
      "Le retard de livraison commande",
      "La relance de pièce fournisseur",
      "La supervision des demandes d'achat"
    ],
    "bonne": 2,
    "pourquoi": [
      "Non. La relance ARC suit les accusés de réception des commandes, pas les devis.",
      "Non. Ce programme relance les commandes en retard de livraison, pas les devis.",
      "Oui. La relance de pièce fournisseur relance une réponse ou une livraison attendue, sur un devis ou sur une commande. L'écran filtre le type de pièce.",
      "Non. Les demandes d'achat sont des pièces internes : elles ne partent pas chez le fournisseur."
    ],
    "retenir": "Relancer un devis fournisseur : relance de pièce fournisseur (devis ou commande).",
    "source": {
      "titre": "La relance de pièce fournisseur",
      "url": "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704716356/La+relance+de+pi+ce+fournisseur"
    }
  },
  {
    "id": "dv03-q30",
    "dialecte": "Divalto 10.13",
    "q": "Dans la relance de pièce fournisseur, une ligne de commande porte un carré plein. Qu'est-ce que ça t'indique ?",
    "choix": [
      "Un besoin client y est réservé",
      "La ligne a déjà été relancée hier",
      "L'accusé de réception est reçu",
      "La ligne est en retard de livraison"
    ],
    "bonne": 0,
    "pourquoi": [
      "Oui. Depuis la V10.5, un carré plein ou un demi-carré (comme dans le superviseur logistique) montre des réservations affectées : un client attend cette marchandise. On relance ces commandes en priorité.",
      "Non. Cet indicateur ne trace pas les relances : il montre les réservations affectées.",
      "Non. L'accusé de réception se voit dans les statuts de confirmation, pas dans cet indicateur.",
      "Non. Le retard se filtre avec le champ Délai. Le carré parle des réservations."
    ],
    "retenir": "Relance fournisseur : le carré des réservations affectées montre les lignes qu'un client attend. Relance-les d'abord.",
    "source": {
      "titre": "La relance de pièce fournisseur",
      "url": "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704716356/La+relance+de+pi+ce+fournisseur"
    }
  },
  {
    "id": "dv03-q31",
    "dialecte": "Divalto 10.13",
    "q": "Relance de pièce fournisseur par courriel. Le code action RELANCE_DEV_CDE_FOU n'existe pas dans ton ERP. Que se passe-t-il ?",
    "choix": [
      "Pas de relance possible par courriel",
      "Envoi direct, avec un texte de relance",
      "Un processus standard prend le relais",
      "Le courriel part, mais sans aucun texte"
    ],
    "bonne": 1,
    "pourquoi": [
      "Non. Sans code action, le mail part quand même, en envoi direct.",
      "Oui. Sans le code action, on choisit un texte de relance et le mail part en direct : ce texte en est le corps. Avec le code action, c'est l'action, et son processus, qui traite.",
      "Non. C'est l'inverse : le processus ne joue que si le code action existe.",
      "Non. Le corps du mail est le texte de relance choisi."
    ],
    "retenir": "Relance par courriel : code action présent = processus ; absent = mail direct avec un texte de relance.",
    "source": {
      "titre": "La relance de pièce fournisseur",
      "url": "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704716356/La+relance+de+pi+ce+fournisseur"
    }
  },
  {
    "id": "dv03-q32",
    "dialecte": "Divalto 10.13",
    "q": "Relance ARC par mail, avec un processus. À qui les mails partent-ils ?",
    "choix": [
      "À l'adresse e-mail de la fiche fournisseur",
      "À l'acheteur indiqué sur la commande",
      "Au contact principal de la commande",
      "Aux contacts ayant le code fonction prévu"
    ],
    "bonne": 3,
    "pourquoi": [
      "Non. Le mail vise des contacts précis : ceux qui gèrent les commandes chez le fournisseur.",
      "Non. L'acheteur travaille chez toi : les mails partent chez le fournisseur, qu'on relance.",
      "Non. Ce n'est pas un contact par commande : ce sont les contacts qui portent le code fonction choisi.",
      "Oui. Un code est mis dans le dossier (onglet Pièces 2, Contacts de destination, champ Commande) et sur les contacts du fournisseur (groupe Fonctions). Chaque fournisseur reçoit un seul mail avec tout ce qui le concerne."
    ],
    "retenir": "Relance ARC par mail : aux contacts fournisseur qui portent le code fonction du dossier ; un mail par fournisseur.",
    "source": {
      "titre": "L'accusé de réception pour les commandes d'achat (V10.11)",
      "url": "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704721472/L+accus+de+r+ception+pour+les+commandes+d+achat+V10.11"
    }
  },
  {
    "id": "dv03-q33",
    "dialecte": "Divalto 10.13",
    "q": "Tu mets en place le suivi des fournisseurs (évaluations, indicateurs). Faut-il créer une fiche pour chaque fournisseur de Divalto ?",
    "choix": [
      "Oui, sinon on ne peut plus commander",
      "Non, ceux qui comptent pour la qualité",
      "Oui, elle se crée avec la fiche tiers",
      "Non, seulement les étrangers"
    ],
    "bonne": 1,
    "pourquoi": [
      "Non. La fiche qualité ne conditionne pas la saisie des commandes.",
      "Oui. Pas besoin de tous les évaluer : seulement ceux dont les prestations ont un impact important sur la qualité de tes produits. La fiche qualité se crée à la première évaluation système.",
      "Non. Elle s'appuie sur une fiche tiers existante, mais elle se crée à la première évaluation système, pas toute seule.",
      "Non. Le critère est l'impact sur la qualité, pas le pays du fournisseur."
    ],
    "retenir": "Fiche qualité fournisseur : seulement pour les fournisseurs qui comptent pour la qualité, créée à la 1re évaluation système.",
    "source": {
      "titre": "Suivi Fournisseur",
      "url": "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11705868831/Suivi+Fournisseur"
    }
  },
  {
    "id": "dv03-q34",
    "dialecte": "Divalto 10.13",
    "q": "Sur la période, un fournisseur a 10 réceptions qualité. 2 sont en retard. Une autre a un défaut. Les autres sont à l'heure, sans défaut. Quel est son taux sans incident ?",
    "choix": [
      "70 %",
      "80 %",
      "90 %",
      "100 %"
    ],
    "bonne": 0,
    "pourquoi": [
      "Oui. Taux sans incident = réceptions sans incident délai ni incident fournisseur / total. 10 – 2 – 1 = 7, donc 7 / 10 = 70 %.",
      "Non. 80 %, c'est le taux dans délai : il ne compte que les incidents de délai (ici, les 2 retards).",
      "Non. 90 %, c'est en ne comptant que le défaut. Les retards sont aussi des incidents.",
      "Non. Les retards et les défauts sont des incidents : le taux baisse."
    ],
    "retenir": "Taux dans délai = réceptions sans incident de délai (niveau A) / total ; taux sans incident = ni incident de délai ni défaut / total.",
    "source": {
      "titre": "Suivi Fournisseur",
      "url": "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11705868831/Suivi+Fournisseur"
    }
  },
  {
    "id": "dv03-q35",
    "dialecte": "Divalto 10.13",
    "q": "Barème délai du dossier Qualité, avec les valeurs livrées à la création. Ton fournisseur de liners livre avec 10 jours d'avance. Quel niveau délai ?",
    "choix": [
      "A, l'avance n'est jamais pénalisée",
      "B, comme 1 jour de retard",
      "C, entre 7 et 13 jours d'avance",
      "D, plus de 7 jours d'écart"
    ],
    "bonne": 2,
    "pourquoi": [
      "Non. L'avance coûte aussi (stockage) : elle compte dans le niveau délai.",
      "Non. B correspond à 2 à 6 jours d'avance, ou à 1 jour de retard.",
      "Oui. Tranches livrées pour l'avance : A = 0 à 1 jour, B = 2 à 6, C = 7 à 13, D = 14 et plus. 10 jours d'avance = C.",
      "Non. En avance, D commence à 14 jours. C'est en retard que D commence à 7 jours."
    ],
    "retenir": "Niveau délai : l'avance compte aussi. Barème livré : 7 à 13 jours d'avance = C.",
    "source": {
      "titre": "Paramétrage dossier Divalto Qualité",
      "url": "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11705868404/Param+trage+dossier+Divalto+Qualit"
    }
  },
  {
    "id": "dv03-q36",
    "dialecte": "Divalto 10.13",
    "q": "Tu veux que Divalto Qualité calcule seul le niveau délai à chaque réception fournisseur, avec le barème du dossier. Est-ce standard ?",
    "choix": [
      "Oui, dès que le barème est saisi",
      "Oui, avec les réceptions générées",
      "Non, il se saisit sur la commande",
      "Non, une surcharge est à prévoir"
    ],
    "bonne": 3,
    "pourquoi": [
      "Non. Le barème donne les tranches, mais le calcul automatique de l'écart n'est pas fait en standard.",
      "Non. Par défaut, une réception est jugée « A », délai respecté. Le calcul automatique de l'écart demande une surcharge.",
      "Non. Le niveau délai se juge à la réception, pas sur la commande.",
      "Oui. Pour un niveau délai automatique, il faut une surcharge fonctionnelle du programme de saisie réception, qui calcule l'écart en jours. Sinon, on choisit le niveau à la main, avec les libellés du barème."
    ],
    "retenir": "Niveau délai automatique à la réception = surcharge à développer. En standard, on le choisit à la main.",
    "source": {
      "titre": "Paramétrage dossier Divalto Qualité",
      "url": "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11705868404/Param+trage+dossier+Divalto+Qualit"
    }
  },
  {
    "id": "dv03-q37",
    "dialecte": "Divalto 10.13",
    "q": "Indicateur combiné d'un fournisseur, avec les poids livrés à la création du dossier Qualité. Quel critère pèse le plus ?",
    "choix": [
      "La conformité des produits",
      "Le respect des délais annoncés",
      "L'évaluation commerciale",
      "L'organisation du système"
    ],
    "bonne": 0,
    "pourquoi": [
      "Oui. Poids livrés : conformité 5, délai 2, organisation 1, réactivité 1, commercial 1. Total : 10.",
      "Non. Le délai pèse 2 sur 10, derrière la conformité (5).",
      "Non. Le commercial pèse 1 sur 10.",
      "Non. L'organisation (évaluation système) pèse 1 sur 10."
    ],
    "retenir": "Indicateur combiné = moyenne pondérée ; par défaut, la conformité pèse 5 sur 10.",
    "source": {
      "titre": "Paramétrage dossier Divalto Qualité",
      "url": "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11705868404/Param+trage+dossier+Divalto+Qualit"
    }
  },
  {
    "id": "dv03-q38",
    "dialecte": "Divalto 10.13",
    "q": "Sélection/classification : tu filtres les fournisseurs de produits chimiques avec un niveau minimum B. Tu lances le processus de qualification. Que deviennent les fournisseurs absents de la liste ?",
    "choix": [
      "Ils gardent leur qualification",
      "Ils passent au niveau D",
      "Ils deviennent non valides",
      "Ils perdent leur qualification"
    ],
    "bonne": 3,
    "pourquoi": [
      "Non. Le processus qualifie ceux de la liste ET retire la qualification aux autres.",
      "Non. Le processus ne touche pas aux niveaux d'évaluation : il pose ou retire la qualification.",
      "Non. La validité du fournisseur dans Divalto ne change pas : seule la qualification bouge.",
      "Oui. La qualification automatique qualifie le panel obtenu. Les fournisseurs absents de la sélection sont déqualifiés."
    ],
    "retenir": "Qualification automatique : ceux de la liste sont qualifiés, les absents déqualifiés. Vérifie ton filtre avant.",
    "source": {
      "titre": "Suivi Fournisseur",
      "url": "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11705868831/Suivi+Fournisseur"
    }
  },
  {
    "id": "dv03-q39",
    "dialecte": "Divalto 10.13",
    "q": "L'analyse des consommations ignore un article que tu vends pourtant chaque mois. Le code opération des ventes a bien l'option « Consommation pour réapprovisionnement ». Que vérifier encore ?",
    "choix": [
      "La coche de sa fiche réappro",
      "Sa catégorie du classement ABC",
      "Le code opération des achats",
      "Sa famille statistique d'article"
    ],
    "bonne": 0,
    "pourquoi": [
      "Oui. Il faut aussi la coche « A prendre en compte dans l'analyse des consommations » sur la fiche réappro de l'article. Les deux sont nécessaires.",
      "Non. Le classement ABC est un autre traitement : il ne filtre pas l'analyse des consommations.",
      "Non. L'analyse lit les consommations. Le code opération des achats ne fait pas entrer l'article dans le calcul.",
      "Non. La famille statistique ne joue pas. Ce sont le code opération et la fiche réappro qui comptent."
    ],
    "retenir": "Analyse des consommations : code opération coché « Consommation pour réapprovisionnement » ET fiche réappro cochée.",
    "source": {
      "titre": "Analyse des besoins (analyse des consommations)",
      "url": "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704721265/Analyse+des+besoins+analyse+des+consommations"
    }
  },
  {
    "id": "dv03-q40",
    "dialecte": "Divalto 10.13",
    "q": "Tu ajustes tes taux de service. Tu veux lancer l'analyse des consommations plusieurs fois, sans changer tes stocks d'alerte ni tes quantités optimales. Que fais-tu ?",
    "choix": [
      "La lancer en différé, la nuit",
      "Cocher Recalculer les cumuls",
      "Décocher Mettre à jour les fiches",
      "Cocher Tracer le calcul d'historique"
    ],
    "bonne": 2,
    "pourquoi": [
      "Non. Le lancement différé change l'heure, pas la mise à jour des fiches.",
      "Non. Recalculer les cumuls ne protège pas les fiches réappro.",
      "Oui. En phase d'ajustement, on décoche « Mettre à jour les fiches ». On relance et on analyse, avant de mettre à jour stock d'alerte, quantité optimale et stock de sécurité.",
      "Non. La trace aide à lire le calcul. Les fiches sont quand même mises à jour si l'option est cochée."
    ],
    "retenir": "Analyse des consommations en test : décoche « Mettre à jour les fiches ».",
    "source": {
      "titre": "Analyse des besoins (analyse des consommations)",
      "url": "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704721265/Analyse+des+besoins+analyse+des+consommations"
    }
  },
  {
    "id": "dv03-q41",
    "dialecte": "Divalto 10.13",
    "q": "Ton fournisseur livre en commandes cadencées, avec des délais très variables. Comment l'analyse des consommations aura-t-elle le bon délai ?",
    "choix": [
      "Le lissage des délais fournisseur",
      "Un délai plus long entre les commandes",
      "Un taux de service plus élevé",
      "Le délai saisi en Conditions fournisseur"
    ],
    "bonne": 3,
    "pourquoi": [
      "Non. Le lissage exponentiel des délais constatés (coefficient 0,2) ne convient pas aux commandes cadencées ni aux délais variables.",
      "Non. Le délai entre deux commandes est une autre donnée : il ne corrige pas le délai du fournisseur.",
      "Non. Le taux de service joue sur le stock de sécurité, pas sur le délai.",
      "Oui. Un délai de livraison saisi dans la fiche « Conditions fournisseur » est pris en priorité, avant le calcul par lissage."
    ],
    "retenir": "Délais cadencés ou variables : saisis le délai dans « Conditions fournisseur ». Il passe avant le lissage.",
    "source": {
      "titre": "Analyse des besoins (analyse des consommations)",
      "url": "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704721265/Analyse+des+besoins+analyse+des+consommations"
    }
  },
  {
    "id": "dv03-q42",
    "dialecte": "Divalto 10.13",
    "q": "Analyse des consommations (V10.8) : un article n'a de consommations que depuis 8 mois, 140 au total. Quelle moyenne mensuelle est retenue ?",
    "choix": [
      "140 / 12 = 11,7, sur toute l'année",
      "140 / 8 = 17,5, dès le 1er mois utile",
      "Rien avant 12 mois pleins d'historique",
      "Le dernier mois sert de moyenne"
    ],
    "bonne": 1,
    "pourquoi": [
      "Non. Les mois vides du début ne comptent pas : on ne divise pas par 12.",
      "Oui. On compte les mois à partir du premier avec une quantité : 140 / 8 = 17,5. L'exemple de la page (V10.8) porte sur un article indicé, et la page dit que ce calcul vaut aussi pour les autres.",
      "Non. Le calcul se fait avec l'historique disponible, sans attendre 12 mois.",
      "Non. La moyenne = somme des consommations constatées / nombre de mois."
    ],
    "retenir": "Stock de sécurité (V10.8) : la moyenne divise par le nombre de mois depuis la 1re consommation, pas toujours par 12.",
    "source": {
      "titre": "Analyse des besoins (analyse des consommations)",
      "url": "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704721265/Analyse+des+besoins+analyse+des+consommations"
    }
  },
  {
    "id": "dv03-q43",
    "dialecte": "Divalto 10.13",
    "q": "Écart-type des consommations : 20,46. Taux de service 97,5 %, donc coefficient 1,96. Couverture : 21 jours. Quel stock de sécurité ?",
    "choix": [
      "17,12",
      "28,07",
      "33,55",
      "40,10"
    ],
    "bonne": 2,
    "pourquoi": [
      "Non. 17,12 oublie le coefficient du taux de service (1,96).",
      "Non. 28,07 multiplie par 21 / 30 sans prendre la racine carrée.",
      "Oui. Depuis la V10.8 : écart-type × coefficient × √(jours de couverture / 30) = 20,46 × 1,96 × √(21 / 30) ≈ 33,55. L'ancienne formule de la même page divise encore par 360.",
      "Non. 40,10 = 20,46 × 1,96 : il manque le facteur de couverture √(21 / 30)."
    ],
    "retenir": "Stock de sécurité (V10.8) = écart-type × coefficient du taux de service × √(jours de couverture / 30).",
    "source": {
      "titre": "Analyse des besoins (analyse des consommations)",
      "url": "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704721265/Analyse+des+besoins+analyse+des+consommations"
    }
  },
  {
    "id": "dv03-q44",
    "dialecte": "Divalto 10.13",
    "q": "Une grosse vente exceptionnelle fausse l'analyse des consommations. Sa facture est déjà imprimée et intégrée en compta. Peux-tu la retirer de l'analyse ?",
    "choix": [
      "Non, une facture intégrée est figée",
      "Oui, par Outils, Inclure ou Exclure",
      "Oui, en changeant son code opération",
      "Non, il faut un avoir puis refacturer"
    ],
    "bonne": 1,
    "pourquoi": [
      "Non. Depuis la V10.9, la coche Analyse consommation se modifie même sur une facture imprimée ou intégrée, en consultation.",
      "Oui. Menu Outils > « Inclure / Exclure Analyse de consommation », en consultation, sur une ou plusieurs lignes. Pas besoin de toucher au code opération.",
      "Non. C'est justement ce qu'on évite : la coche de la ligne remplace le changement de code opération.",
      "Non. Pas besoin d'avoir : on inverse seulement la coche Analyse consommation de la ligne."
    ],
    "retenir": "Analyse des consommations (V10.9) : une coche par ligne, modifiable après coup par Outils > Inclure / Exclure.",
    "source": {
      "titre": "Analyse des besoins (analyse des consommations)",
      "url": "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704721265/Analyse+des+besoins+analyse+des+consommations"
    }
  },
  {
    "id": "dv03-q45",
    "dialecte": "Divalto 10.13",
    "q": "Un code opération s'appelle F7. Peux-tu être sûr qu'il fait une entrée fournisseur ?",
    "choix": [
      "Oui, le F impose l'entrée fournisseur",
      "Non, seul son paramétrage le dit",
      "Oui, la 1re lettre est contrôlée",
      "Non, F veut dire facture client"
    ],
    "bonne": 1,
    "pourquoi": [
      "Non. Le nom suit une convention de nommage, sans obligation.",
      "Oui. C'est une convention (F = entrée fournisseur, G = sortie fournisseur…), pas une règle. Le paramétrage du code (type de tiers, sens, nature de stock) décide du traitement.",
      "Non. Rien ne contrôle la première lettre : c'est une préconisation.",
      "Non. Dans la convention, F = entrée fournisseur (achat). La sortie client (vente), c'est C."
    ],
    "retenir": "Code opération : le nom (F, G, C…) est une convention ; le paramétrage fait foi.",
    "source": {
      "titre": "Le code opération",
      "url": "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704708985/Le+code+op+ration"
    }
  },
  {
    "id": "dv03-q46",
    "dialecte": "Divalto 10.13",
    "q": "Une facture fournisseur a deux codes opération : un pour la pièce, un autre sur une de ses lignes. Lequel donne le journal à l'intégration comptable ?",
    "choix": [
      "Celui porté par l'en-tête",
      "Celui de chaque ligne",
      "Celui de la 1re ligne saisie",
      "Celui de la fiche fournisseur"
    ],
    "bonne": 0,
    "pourquoi": [
      "Oui. Le programme d'intégration comptable traite le code opération de l'en-tête de pièce : c'est lui qui donne le journal.",
      "Non. Le journal ne change pas ligne par ligne : il vient de l'en-tête.",
      "Non. L'ordre des lignes ne compte pas : seul l'en-tête compte pour le journal.",
      "Non. Le journal est paramétré sur le code opération, et c'est celui de l'en-tête qui est traité."
    ],
    "retenir": "Intégration comptable : le journal vient du code opération de l'en-tête de pièce.",
    "source": {
      "titre": "Le code opération",
      "url": "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704708985/Le+code+op+ration"
    }
  },
  {
    "id": "dv03-q47",
    "dialecte": "Divalto 10.13",
    "q": "Ton fournisseur t'envoie son tarif Excel avec SES références seulement, sans les tiennes. Comment l'importer en tarif d'achat ?",
    "choix": [
      "Créer d'abord les tarifs à la main",
      "Remplacer ses références par l'EAN",
      "Impossible, ta référence est la clé",
      "Avec la coche Compléter la référence"
    ],
    "bonne": 3,
    "pourquoi": [
      "Non. La génération des tarifs d'achat par tableur fait l'import : pas besoin de saisie à la main.",
      "Non. L'import s'appuie sur le référencement fournisseur, pas sur l'EAN.",
      "Non. Depuis la V10.11, la référence fournisseur seule suffit, avec la bonne coche.",
      "Oui. Depuis la V10.11, on peut ne remplir que la référence fournisseur, en cochant « Compléter la référence par le référencement fournisseur ». Divalto retrouve ta référence interne."
    ],
    "retenir": "Import de tarif d'achat (V10.11) : référence fournisseur seule + coche « Compléter la référence par le référencement fournisseur ».",
    "source": {
      "titre": "Les tarifs",
      "url": "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704706182/Les+tarifs"
    }
  },
  {
    "id": "dv03-q48",
    "dialecte": "Divalto 10.13",
    "q": "Import de tarif d'achat par référence fournisseur. La référence « X12 » de ton fournisseur est référencée sur deux de tes articles, dans deux dépôts différents. Quel article reçoit le tarif ?",
    "choix": [
      "Les deux articles, un tarif chacun",
      "Celui du dépôt principal du dossier",
      "La 1re ligne trouvée, dépôt ignoré",
      "Aucun, le doublon est signalé"
    ],
    "bonne": 2,
    "pourquoi": [
      "Non. Une seule référence interne est retenue : la première ligne trouvée.",
      "Non. Le dépôt n'est pas pris en compte dans cette recherche.",
      "Oui. La recherche se fait tous dépôts confondus, sur le code fournisseur et la référence externe. La première ligne trouvée donne la référence interne.",
      "Non. Aucun doublon n'est signalé : Divalto prend la première ligne trouvée. Vérifie ton référencement avant l'import."
    ],
    "retenir": "Import par référence fournisseur : dépôt ignoré, la première ligne trouvée donne ta référence.",
    "source": {
      "titre": "Les tarifs",
      "url": "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704706182/Les+tarifs"
    }
  },
  {
    "id": "dv03-q49",
    "dialecte": "Divalto 10.13",
    "q": "Saisie des réceptions sur terminal mobile : tu scannes un article qui n'est pas sur la commande fournisseur. Que fait Divalto ?",
    "choix": [
      "Il refuse la saisie de l'article",
      "Il demande de confirmer la référence",
      "Il l'ajoute en silence à la commande",
      "Il crée une nouvelle commande d'achat"
    ],
    "bonne": 1,
    "pourquoi": [
      "Non. Ce n'est pas un refus : une alerte demande une confirmation, Oui ou Non.",
      "Oui. Une alerte dit que la référence n'est pas prévue dans la pièce et demande de la confirmer : Oui ou Non. En WMS, une option RF de l'utilisateur peut, elle, interdire ce cas.",
      "Non. Rien ne se fait sans ta confirmation.",
      "Non. On reste sur la réception de la commande saisie : pas de nouvelle commande."
    ],
    "retenir": "Terminal, référence hors commande : Divalto demande une confirmation avant de l'accepter.",
    "source": {
      "titre": "Terminaux mobiles - Traitements achats",
      "url": "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704729486/Terminaux+mobiles+-+Traitements+achats"
    }
  },
  {
    "id": "dv03-q50",
    "dialecte": "Divalto 10.13",
    "q": "Sur le terminal mobile, tu fais une « Saisie réappro par achat » pour du chlore. Où va la ligne ?",
    "choix": [
      "Sur la dernière commande active",
      "Dans une nouvelle demande d'achat",
      "Sur une nouvelle commande provisoire",
      "Dans les propositions du prochain CBN"
    ],
    "bonne": 0,
    "pourquoi": [
      "Oui. La ligne s'ajoute sur la dernière commande en statut actif du fournisseur habituel de l'article.",
      "Non. Ça, c'est la « Saisie réappro par DA » : elle crée une demande d'achat.",
      "Non. Aucune commande n'est créée : la ligne complète une commande active qui existe déjà.",
      "Non. Le CBN n'intervient pas : la saisie rapide agit tout de suite."
    ],
    "retenir": "Terminal : réappro par DA = demande d'achat ; réappro par achat = ligne sur la dernière commande active du fournisseur habituel.",
    "source": {
      "titre": "Terminaux mobiles - Traitements achats",
      "url": "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704729486/Terminaux+mobiles+-+Traitements+achats"
    }
  },
  {
    "id": "dv03-q51",
    "dialecte": "Divalto 10.13",
    "q": "WMS : un cariste a commencé la réception d'une commande, puis part sur une autre tâche. Un collègue scanne la même commande. Que se passe-t-il ?",
    "choix": [
      "Les deux travaillent en même temps dessus",
      "La commande est bloquée jusqu'au retour",
      "Une deuxième réception est créée à part",
      "Un message propose de reprendre les lignes"
    ],
    "bonne": 3,
    "pourquoi": [
      "Non. Une commande n'est réceptionnée que par un seul cariste à la fois.",
      "Non. Rien n'est bloqué : le collègue peut reprendre la réception.",
      "Non. On reprend la réception commencée : on n'en crée pas une autre.",
      "Oui. Une commande ne se réceptionne que par un seul cariste. Le collègue reçoit un message : il peut se réaffecter les lignes en cours de réception."
    ],
    "retenir": "WMS : un seul cariste par réception ; un collègue peut se réaffecter les lignes commencées.",
    "source": {
      "titre": "Réception (fournisseur, client, interne)",
      "url": "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11705932967/R+ception+fournisseur+client+interne"
    }
  },
  {
    "id": "dv03-q52",
    "dialecte": "Divalto 10.13",
    "q": "WMS : la réception est déclarée et les palettes de liners sont déjà rangées. Le cariste n'a pas encore validé la réception. Le stock commercial a-t-il bougé ?",
    "choix": [
      "Oui, dès la déclaration au quai",
      "Non, pas avant la validation",
      "Oui, dès le rangement",
      "Non, pas avant la facture"
    ],
    "bonne": 1,
    "pourquoi": [
      "Non. La déclaration crée le stock WMS, pour pouvoir ranger. Le stock commercial attend.",
      "Oui. Le stock WMS existe dès la déclaration. Le stock commercial ne bouge qu'à la validation de la réception par le cariste, qui valide la commande en BL.",
      "Non. Le rangement est un mouvement WMS. Le stock commercial attend la validation.",
      "Non. C'est le BL, créé à la validation de la réception, qui fait entrer le stock, pas la facture."
    ],
    "retenir": "WMS : déclaration = stock WMS ; validation par le cariste = BL et stock commercial.",
    "source": {
      "titre": "Réception en cours",
      "url": "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11705933690/R+ception+en+cours"
    }
  },
  {
    "id": "dv03-q53",
    "dialecte": "Divalto 10.13",
    "q": "WMS : ton paramétrage RF a la coche « Interdire la ligne de réception si non présente sur la commande ». La commande prévoit 20 rouleaux. Tu en saisis 25 au terminal. Que se passe-t-il ?",
    "choix": [
      "Les 25 entrent, la commande s'ajuste",
      "20 entrent, et 5 passent en litige",
      "Refusé, la quantité en plus bloque",
      "Une alerte, puis tout passe si tu confirmes"
    ],
    "bonne": 2,
    "pourquoi": [
      "Non. Avec cette option, on ne réceptionne pas plus que la commande.",
      "Non. Rien ne passe en litige : la quantité en plus est refusée.",
      "Oui. Message : « Article/Quantité non présent sur la commande fournisseur. Réception impossible, merci d'aviser votre responsable. » Cet utilisateur ne peut pas réceptionner la quantité en plus.",
      "Non. Avec la coche, ce n'est pas une alerte à confirmer : c'est un blocage."
    ],
    "retenir": "WMS, option « Interdire la ligne de réception si non présente sur la commande » : pas de surplus, ni d'article hors commande.",
    "source": {
      "titre": "Blocage réception",
      "url": "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11705933815/Blocage+r+ception"
    }
  },
  {
    "id": "dv03-q54",
    "dialecte": "Divalto 10.13",
    "q": "Réception sur un dépôt WMS, avec contrôle qualité demandé. Le contrôle est fait. Où le valider pour mettre à jour la pièce et le stock WMS ?",
    "choix": [
      "Sur le terminal WMS pour tout le BL",
      "Coche du BL fournisseur dans Divalto",
      "Dans le rapport de contrôle du lot",
      "En rangeant le stock WMS à sa place"
    ],
    "bonne": 0,
    "pourquoi": [
      "Oui. Sur le terminal, menu contrôle qualité, on saisit le numéro de réception et on valide. Attention, c'est global : tout le bon passe de « à contrôler » à « contrôlé », pas article par article.",
      "Non. Sur un dépôt WMS, il faut acter le contrôle depuis le WMS : il met à jour la pièce ET les ventilations WMS.",
      "Non. Le rapport donne la décision. Sur un dépôt WMS, la mise à jour du stock se fait depuis le WMS.",
      "Non. Déplacer le stock ne change pas son statut : il reste non contrôlé, même rangé."
    ],
    "retenir": "Contrôle qualité sur un dépôt WMS : on le valide sur le terminal, pour tout le bon de réception.",
    "source": {
      "titre": "Contrôle qualité",
      "url": "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11780325396/Contr+le+qualit"
    }
  },
  {
    "id": "dv03-q55",
    "dialecte": "Divalto 10.13",
    "q": "Tu saisis un Incoterm sur une commande fournisseur. Quel contrôle Divalto fait-il dessus ?",
    "choix": [
      "Les mêmes contrôles bloquants qu'en vente",
      "Un contrôle de cohérence avec le transport",
      "Aucun, sauf si le lieu Incoterm est vide",
      "Aucun contrôle bloquant en pièce d'achat"
    ],
    "bonne": 3,
    "pourquoi": [
      "Non. Les contrôles bloquants de l'Incoterm sont réservés aux pièces client.",
      "Non. Aucun contrôle n'est fait sur l'Incoterm d'une pièce fournisseur.",
      "Non. Le lieu n'est pas contrôlé non plus : sur une pièce fournisseur, rien n'est bloquant.",
      "Oui. Sur les pièces fournisseur, l'Incoterm (onglet Complément, code et lieu) est une donnée informative. Les contrôles bloquants ne se font que sur les pièces client."
    ],
    "retenir": "Incoterm sur une pièce fournisseur : informatif ; contrôles bloquants seulement côté client.",
    "source": {
      "titre": "Gérer les achats",
      "url": "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704718965/G+rer+les+achats"
    }
  },
  {
    "id": "dv03-q56",
    "dialecte": "Divalto 10.13",
    "q": "Un magasinier n'a pas la confidentialité « Visualiser les coûts et les prix d'achat ». Que voit-il sur une commande fournisseur ?",
    "choix": [
      "Rien de la ligne, accès refusé",
      "Les coûts, mais pas le tarif d'achat",
      "Le tarif d'achat, mais pas les coûts",
      "Tout, la confidentialité est en vente"
    ],
    "bonne": 2,
    "pourquoi": [
      "Non. Il ouvre bien la pièce : seules les données de coût sont masquées.",
      "Non. C'est l'inverse : le tarif d'achat reste visible, les coûts sont masqués.",
      "Oui. Sans cette confidentialité, il ne voit pas les coûts (onglet Décomposition - Coûts, et ventilation). Il voit quand même le tarif d'achat dans l'onglet Généralités.",
      "Non. Cette confidentialité limite bien l'affichage des coûts dans la pièce fournisseur."
    ],
    "retenir": "Confidentialité « Visualiser les coûts et les prix d'achat » : elle masque les coûts, pas le tarif d'achat.",
    "source": {
      "titre": "Gérer les achats",
      "url": "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704718965/G+rer+les+achats"
    }
  },
  {
    "id": "dv03-q57",
    "dialecte": "Divalto 10.13",
    "q": "Sous-traitance de négoce. Tu génères l'ordre de sous-traitance sur une partie seulement de la commande d'achat. Pourras-tu générer un 2e ordre pour le reste ?",
    "choix": [
      "Oui, le reste part en reliquat de commande",
      "Non, un seul ordre par commande",
      "Oui, après réception du 1er ordre",
      "Non, sauf en dupliquant la nomenclature"
    ],
    "bonne": 1,
    "pourquoi": [
      "Non. Les reliquats ne sont pas pris en compte en sous-traitance de négoce, ni à la commande, ni à la ligne.",
      "Oui. Un seul ordre de sous-traitance peut être généré pour une commande fournisseur. Les reliquats ne sont pas gérés : génère l'ordre pour toute la quantité.",
      "Non. Même après la réception, un 2e ordre n'est pas possible sur la même commande.",
      "Non. La nomenclature n'y change rien : la limite est d'un ordre par commande."
    ],
    "retenir": "Sous-traitance de négoce : un seul ordre par commande fournisseur, sans reliquat.",
    "source": {
      "titre": "Gérer la sous-traitance de négoce (V10.5)",
      "url": "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704722799/G+rer+la+sous-traitance+de+n+goce+V10.5"
    }
  },
  {
    "id": "dv03-q58",
    "dialecte": "Divalto 10.13",
    "q": "Sous-traitance de négoce : tu fournis pompes et filtres, le sous-traitant les assemble en kit. Quel article porte le tarif d'achat de sa prestation ?",
    "choix": [
      "Le kit fini, pour sa valeur ajoutée",
      "Chaque composant, pompe et filtre",
      "L'article de service de la prestation",
      "Le kit fini, au prix total du kit"
    ],
    "bonne": 0,
    "pourquoi": [
      "Oui. C'est l'article fini sous-traité qui porte le tarif d'achat de la prestation, pour la seule valeur ajoutée du sous-traitant. Le tarif est lié au sous-traitant.",
      "Non. Les composants t'appartiennent : ils ont leur propre coût de revient, pas le tarif de la prestation.",
      "Non. L'article de service sert à inclure la prestation dans le coût standard, par la nomenclature. Le tarif d'achat est porté par l'article fini.",
      "Non. Le tarif ne couvre que la valeur ajoutée : les composants ne sont pas achetés au sous-traitant."
    ],
    "retenir": "Sous-traitance de négoce : l'article fini porte le tarif d'achat, pour la seule valeur ajoutée du sous-traitant.",
    "source": {
      "titre": "Gérer la sous-traitance de négoce (V10.5)",
      "url": "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704722799/G+rer+la+sous-traitance+de+n+goce+V10.5"
    }
  },
  {
    "id": "dv03-q59",
    "dialecte": "Divalto 10.13",
    "q": "Widget « Fournisseurs actifs » (V10.10). Sur quel critère un fournisseur est-il compté comme actif ?",
    "choix": [
      "Une facture sur l'année civile en cours",
      "Une commande encore ouverte en portefeuille",
      "Un chiffre d'affaires non nul sur 12 mois",
      "Une dernière opération de moins de 12 mois"
    ],
    "bonne": 3,
    "pourquoi": [
      "Non. Le critère n'est pas l'année civile : c'est la date de dernière opération de la fiche, sur 12 mois glissants.",
      "Non. Une commande ouverte n'est pas le critère : c'est la date de dernière opération.",
      "Non. Le chiffre d'affaires sert au widget Top 10 fournisseurs, pas à celui des actifs.",
      "Oui. Actif = date de dernière opération de la fiche ≥ date du jour – 12 mois ; inactif = strictement avant. Cette date bouge à la création, la modification ou la suppression d'une pièce (page « Le fournisseur »)."
    ],
    "retenir": "Fournisseur actif = dernière opération il y a moins de 12 mois.",
    "source": {
      "titre": "Le widget nombre de fournisseurs actifs (V10.10)",
      "url": "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704721765/Le+widget+nombre+de+fournisseurs+actifs+V10.10"
    }
  }
];
