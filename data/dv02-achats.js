// Divalto 10.13 — Le cycle d'achat (gestion commerciale, achats).
// Source : base documentaire Divalto (dépôt Divalto_10), pages citées dans chaque question.
LEARNSQL.questions.dv02 = [
  {
    "id": "dv02-q01",
    "dialecte": "Divalto 10.13",
    "q": "Une demande d'achat est encore à l'état « provisoire ». Peut-on la transformer en commande ?",
    "choix": [
      "Oui, si un fournisseur est coché",
      "Oui, mais seulement en devis",
      "Non, il faut d'abord l'accepter",
      "Non, il faut un appel d'offre"
    ],
    "bonne": 2,
    "pourquoi": [
      "Non. Le fournisseur coché sert pour la commande directe. Mais la demande doit d'abord être acceptée.",
      "Non. La règle est la même pour un devis : il faut d'abord accepter la demande.",
      "Oui. Avant toute transformation (appel d'offre, devis ou commande), la demande doit être acceptée : elle passe de provisoire à active. Sauf si le dossier crée les demandes directement actives.",
      "Non. Une demande acceptée peut générer directement une commande, sans appel d'offre."
    ],
    "retenir": "Demande d'achat : provisoire → acceptée (active) → transformée (périmée).",
    "source": {
      "titre": "Les demandes d'achat",
      "url": "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704719145/Les+demandes+d+achat"
    }
  },
  {
    "id": "dv02-q02",
    "dialecte": "Divalto 10.13",
    "q": "Une demande d'achat a déjà été transformée en commande. Peux-tu encore en faire un appel d'offre ?",
    "choix": [
      "Oui, la demande reste active",
      "Non, elle est passée « périmée »",
      "Non, seul le responsable le peut",
      "Oui, par « Valider en appel d'offre »"
    ],
    "bonne": 1,
    "pourquoi": [
      "Non. Après transformation, la demande n'est plus active : elle passe « périmée ».",
      "Oui. Une demande transformée (devis, commande ou appel d'offre) est « périmée ». Elle n'est plus modifiable et ne peut plus faire l'objet d'un appel d'offre.",
      "Non. Ce n'est pas une question de droits : une demande transformée n'est plus exploitable, même par son responsable.",
      "Non. Ce bouton ne s'applique pas à une demande déjà périmée."
    ],
    "retenir": "Demande d'achat transformée = « périmée » : plus de modification, plus d'appel d'offre.",
    "source": {
      "titre": "Les demandes d'achat",
      "url": "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704719145/Les+demandes+d+achat"
    }
  },
  {
    "id": "dv02-q03",
    "dialecte": "Divalto 10.13",
    "q": "10 collègues demandent chacun 1 écran : même article, même fournisseur. Le regroupement est coché (valeur par défaut). Que contient l'appel d'offre ?",
    "choix": [
      "Une ligne par service demandeur",
      "10 lignes d'un écran chacune",
      "10 appels d'offre séparés",
      "Une seule ligne de 10 écrans"
    ],
    "bonne": 3,
    "pourquoi": [
      "Non. Le regroupement se fait par article et par fournisseur, pas par service.",
      "Non. C'est ce qui arrive si on décoche le regroupement.",
      "Non. Les demandes vont dans un même appel d'offre : elles ne sont pas éclatées.",
      "Oui. « Regrouper les lignes lors de la transformation en appel d'offre » fait une seule ligne. Les liens vers les 10 demandes sont gardés."
    ],
    "retenir": "Même article + même fournisseur = une seule ligne sur l'appel d'offre (option cochée par défaut).",
    "source": {
      "titre": "Paramétrage demande d'achat et appel d'offre",
      "url": "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704719094/Param+trage+demande+d+achat+et+appel+d+offre"
    }
  },
  {
    "id": "dv02-q04",
    "dialecte": "Divalto 10.13",
    "q": "Tu importes les réponses Excel des fournisseurs à un appel d'offre. Trois fichiers sont ouverts dans Excel. Lequel est importé ?",
    "choix": [
      "Les trois, l'un après l'autre",
      "Le plus récent des trois",
      "Seul le fichier actif",
      "Aucun : il faut tout fermer"
    ],
    "bonne": 2,
    "pourquoi": [
      "Non. L'import ne lit qu'un fichier : celui qui est actif.",
      "Non. La date du fichier ne compte pas : seul le fichier actif est lu.",
      "Oui. La doc prévient : seul le fichier Excel actif est importé. Ouvre un seul fichier à la fois.",
      "Non. Il faut au contraire ouvrir le fichier de réponses dans le tableur avant l'import."
    ],
    "retenir": "Import des réponses aux appels d'offre : un seul fichier Excel ouvert. C'est lui qui est importé.",
    "source": {
      "titre": "Les appels d'offre",
      "url": "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704719256/Les+appels+d+offre"
    }
  },
  {
    "id": "dv02-q05",
    "dialecte": "Divalto 10.13",
    "q": "Appel d'offre sur 3 articles : le fournisseur A est choisi pour 2 articles, B pour le dernier. Que génère la validation en commande ?",
    "choix": [
      "Une commande par fournisseur retenu",
      "Une commande par article de l'appel",
      "Une seule commande pour tout l'appel",
      "Une commande par fournisseur consulté"
    ],
    "bonne": 0,
    "pourquoi": [
      "Oui. La dernière phase de l'appel d'offre génère une pièce par fournisseur retenu : une commande pour A (2 lignes), une pour B.",
      "Non. Les 2 articles retenus chez A vont sur la même commande.",
      "Non. Une seule commande, c'est le cas où un seul fournisseur est retenu pour tout.",
      "Non. Les fournisseurs consultés mais non retenus ne reçoivent pas de commande."
    ],
    "retenir": "Appel d'offre validé = une commande par fournisseur retenu.",
    "source": {
      "titre": "Les appels d'offre",
      "url": "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704719256/Les+appels+d+offre"
    }
  },
  {
    "id": "dv02-q06",
    "dialecte": "Divalto 10.13",
    "q": "Un fournisseur n'a pas de visa administratif. À quel moment Divalto bloque-t-il ?",
    "choix": [
      "À la création de la demande d'achat",
      "À la création de l'appel d'offre",
      "À la validation en commande",
      "Jamais : ce n'est qu'une alerte"
    ],
    "bonne": 2,
    "pourquoi": [
      "Non. À la création d'une demande d'achat, le contrôle n'est pas bloquant : c'est une alerte.",
      "Non. À la création d'un appel d'offre aussi, c'est une simple alerte.",
      "Oui. Depuis la V10.12, le contrôle devient bloquant à la validation en commande (« Fournisseur non visé »).",
      "Non. L'alerte devient un blocage au moment de la validation en commande."
    ],
    "retenir": "Fournisseur sans visa administratif : alerte en demande d'achat et en appel d'offre, blocage à la validation en commande.",
    "source": {
      "titre": "Contrôle du visa administratif des fournisseurs (V10.12)",
      "url": "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704719467/Contr+le+du+visa+administratif+des+fournisseurs+V10.12"
    }
  },
  {
    "id": "dv02-q07",
    "dialecte": "Divalto 10.13",
    "q": "Ton article est référencé chez le fournisseur, avec SA référence à lui. Quelle référence est imprimée sur la commande qu'il reçoit ?",
    "choix": [
      "Ta référence, à la place de la sienne",
      "Le code EAN de l'article",
      "Aucune : juste la désignation",
      "La référence du fournisseur"
    ],
    "bonne": 3,
    "pourquoi": [
      "Non. À l'impression, ce sont les références du fournisseur. Dans l'exemple de la doc, ta référence n'est qu'à côté, en colonne « Référence interne ».",
      "Non. Le référencement imprime la référence du fournisseur, pas le code EAN.",
      "Non. La doc dit qu'à l'impression, ce sont les références du fournisseur qui sont affichées.",
      "Oui. En saisie, tu vois ton libellé interne. Sur la commande imprimée, c'est la référence du fournisseur."
    ],
    "retenir": "Référencement fournisseur : saisie avec tes références, impression avec celles du fournisseur.",
    "source": {
      "titre": "Gérer les achats",
      "url": "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704718965/G+rer+les+achats"
    }
  },
  {
    "id": "dv02-q08",
    "dialecte": "Divalto 10.13",
    "q": "Un fournisseur a un feu orange sur sa fiche. Tu saisis une commande pour lui. Que se passe-t-il ?",
    "choix": [
      "Un blocage : mise à jour interdite",
      "Une alerte, mais tu peux continuer",
      "Rien : le feu sert seulement à l'affichage",
      "La commande passe en attente de visa"
    ],
    "bonne": 1,
    "pourquoi": [
      "Non. Ça, c'est le feu rouge : message bloquant « Mise à jour interdite ».",
      "Oui. Feu orange = message d'alerte non bloquant, en saisie de devis et de commandes, et en validation de devis en commande.",
      "Non. Le feu agit bien en saisie de pièces, pas seulement à l'affichage.",
      "Non. Le feu ne demande pas de visa : il alerte (orange) ou il bloque (rouge)."
    ],
    "retenir": "Feu fournisseur : orange = alerte, rouge = blocage (devis, commandes, validation de devis).",
    "source": {
      "titre": "Le fournisseur",
      "url": "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704703163/Le+fournisseur"
    }
  },
  {
    "id": "dv02-q09",
    "dialecte": "Divalto 10.13",
    "q": "Il manque 886 € pour atteindre le seuil tarifaire du fournisseur sur ta commande. Que fait Divalto ?",
    "choix": [
      "Il bloque l'enregistrement",
      "Il ajoute une ligne de frais de port",
      "Il affiche juste une alerte non bloquante",
      "Il passe la commande en provisoire"
    ],
    "bonne": 2,
    "pourquoi": [
      "Non. Le seuil tarifaire achat ne bloque pas : c'est une alerte.",
      "Non. Divalto n'ajoute rien : il prévient seulement.",
      "Oui. Si le HT n'atteint pas le seuil de la fiche fournisseur (onglet Pièces), un message non bloquant s'affiche : « Il manque … pour atteindre le seuil tarifaire ».",
      "Non. Le statut de la commande ne change pas."
    ],
    "retenir": "Seuil tarifaire achat (option du dossier + montant sur la fiche fournisseur) = simple alerte.",
    "source": {
      "titre": "Gérer les achats",
      "url": "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704718965/G+rer+les+achats"
    }
  },
  {
    "id": "dv02-q10",
    "dialecte": "Divalto 10.13",
    "q": "Une commande dépasse le « plafond commande » de la fiche fournisseur. Que devient-elle ?",
    "choix": [
      "Envoyée, avec une simple alerte",
      "Supprimée à l'enregistrement",
      "Transformée seule en devis fournisseur",
      "Bloquée : on ne peut plus l'imprimer"
    ],
    "bonne": 3,
    "pourquoi": [
      "Non. Ce n'est pas une alerte, c'est un blocage. L'alerte simple, c'est le seuil tarifaire.",
      "Non. Elle reste enregistrée, mais bloquée.",
      "Non. Divalto ne change pas le type de la pièce.",
      "Oui. La commande est bloquée : impossible de l'imprimer. Le blocage se voit sur la pièce, dans l'explorateur de pièces et dans l'état des commandes."
    ],
    "retenir": "Plafond commande dépassé = commande bloquée, plus d'impression. Montant en HT, dans la devise du dossier.",
    "source": {
      "titre": "Le fournisseur",
      "url": "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704703163/Le+fournisseur"
    }
  },
  {
    "id": "dv02-q11",
    "dialecte": "Divalto 10.13",
    "q": "Le fournisseur vend par multiple de 12. Tu saisis 30 sur une commande fournisseur. Que fait Divalto ?",
    "choix": [
      "Il arrondit seul à 36",
      "Il affiche un message d'alerte",
      "Rien : ce réglage sert au CBN seul",
      "Il remplace par la quantité minimale"
    ],
    "bonne": 1,
    "pourquoi": [
      "Non. Divalto ne corrige pas la quantité à ta place : il te prévient.",
      "Oui. La quantité minimale et le « multiple de » (conditions de réappro de l'article chez ce fournisseur) sont contrôlés en saisie de commande : un message d'alerte s'affiche.",
      "Non. Ces quantités servent au CBN ET à la saisie des commandes fournisseur.",
      "Non. Rien n'est remplacé : seul un message s'affiche."
    ],
    "retenir": "Minimum et multiple du fournisseur : alerte en saisie de commande, et pris en compte par le CBN.",
    "source": {
      "titre": "Le fournisseur",
      "url": "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704703163/Le+fournisseur"
    }
  },
  {
    "id": "dv02-q12",
    "dialecte": "Divalto 10.13",
    "q": "Dans le cas général, quelle mécanique porte le prix d'achat d'un article chez un fournisseur ?",
    "choix": [
      "Le prix particulier article/fournisseur",
      "Le prix de vente PU de l'article",
      "Le seuil tarifaire en HT du fournisseur",
      "Le dernier coût de revient de l'article"
    ],
    "bonne": 0,
    "pourquoi": [
      "Oui. Le prix d'achat est lié au couple article/fournisseur : c'est la mécanique des prix particuliers (code tarif 99). Les mécanismes des tarifs de vente s'y appliquent aussi.",
      "Non. PU est le code tarif de vente par défaut, pas un prix d'achat.",
      "Non. Le seuil tarifaire est un montant minimum de commande, pas un prix.",
      "Non. Le coût de revient découle du prix d'achat. Il ne le remplace pas."
    ],
    "retenir": "Tarif d'achat = prix particulier du couple article/fournisseur (code tarif 99).",
    "source": {
      "titre": "Le fournisseur",
      "url": "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704703163/Le+fournisseur"
    }
  },
  {
    "id": "dv02-q13",
    "dialecte": "Divalto 10.13",
    "q": "Article acheté 200 €. Code % CR : 5 %. Montant fixe CR : 3 €. Frais sur la ligne : 2 €. Quel coût de revient ?",
    "choix": [
      "200 €",
      "210 €",
      "213 €",
      "215 €"
    ],
    "bonne": 3,
    "pourquoi": [
      "Non. C'est le prix d'achat seul. Le coût de revient ajoute le %, le montant fixe et les frais.",
      "Non. 200 + 5 % = 210 : il manque le montant fixe et les frais de la ligne.",
      "Non. 210 + 3 = 213 : il manque les 2 € de frais saisis sur la ligne.",
      "Oui. Coût = prix d'achat + % sur le prix d'achat + montant fixe + frais : 200 + 10 + 3 + 2 = 215 €."
    ],
    "retenir": "Coût de revient d'un achat = prix d'achat + % CR + montant fixe CR + frais de la ligne.",
    "source": {
      "titre": "Le fournisseur",
      "url": "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704703163/Le+fournisseur"
    }
  },
  {
    "id": "dv02-q14",
    "dialecte": "Divalto 10.13",
    "q": "Commande fournisseur en dollars. L'option « Maj taux de change lors de la validation des pièces d'achat » n'est pas cochée. Quel taux arrive sur la facture ?",
    "choix": [
      "Le taux du jour de la facture",
      "Le taux du BL, recalculé à la date du BL",
      "Le taux de la commande, modifiable",
      "Le taux moyen du mois en cours"
    ],
    "bonne": 2,
    "pourquoi": [
      "Non. Le taux est recalculé à la date de chaque pièce seulement si l'option est cochée (depuis la V10.11).",
      "Non. Sans l'option, aucune pièce du flux d'achat ne recalcule le taux.",
      "Oui. Sans l'option, le taux de la commande suit dans le BL puis dans la facture. Le champ reste modifiable.",
      "Non. Divalto n'utilise pas de taux moyen ici."
    ],
    "retenir": "Achat en devise : sans l'option (V10.11), le taux de la commande suit jusqu'à la facture. Avec l'option, il est recalculé et grisé.",
    "source": {
      "titre": "Réactualiser le taux de change sur les pièces d'achat (V10.11)",
      "url": "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704721589/R+actualiser+le+taux+de+change+sur+les+pi+ces+d+achat+V10.11"
    }
  },
  {
    "id": "dv02-q15",
    "dialecte": "Divalto 10.13",
    "q": "Dossier avec établissements. L'adresse de réception fournisseur est réglée sur « Dépôt », mais le dépôt n'a pas d'adresse. Quelle adresse va sur la commande ?",
    "choix": [
      "Celle du dossier",
      "Celle de l'établissement",
      "Celle du fournisseur",
      "Aucune : la saisie est bloquée"
    ],
    "bonne": 0,
    "pourquoi": [
      "Oui. Si l'adresse prévue (établissement ou dépôt) n'est pas trouvée, c'est l'adresse du dossier qui remonte dans les pièces fournisseur.",
      "Non. La doc ne prévoit pas de repli sur l'établissement : c'est le dossier.",
      "Non. On cherche ta propre adresse de livraison, pas celle du fournisseur.",
      "Non. Rien n'est bloqué : Divalto prend l'adresse du dossier."
    ],
    "retenir": "Adresse de réception (V10.11, dossier onglet Pièce 3) : dossier, établissement ou dépôt. Introuvable : celle du dossier.",
    "source": {
      "titre": "Choisir l'adresse de réception de la marchandise (V10.11)",
      "url": "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704716422/Choisir+l+adresse+de+r+ception+de+la+marchandise+V10.11"
    }
  },
  {
    "id": "dv02-q16",
    "dialecte": "Divalto 10.13",
    "q": "Une commande fournisseur est arrivée par EDI, une autre vient du CBN. Où voir d'où vient chaque commande ?",
    "choix": [
      "Le code opération de chaque ligne",
      "Le « Statut ARC », onglet Livraison",
      "Le préfixe du numéro de la pièce",
      "Le champ « Origine » de l'en-tête"
    ],
    "bonne": 3,
    "pourquoi": [
      "Non. Le code opération donne le type de mouvement (entrée, sortie…), pas l'origine de la pièce.",
      "Non. Le statut ARC suit l'accusé de réception du fournisseur, pas l'origine.",
      "Non. Le préfixe ne dit pas comment la pièce a été créée.",
      "Oui. Le champ « Origine » de l'en-tête (onglet Identifiant) indique par exemple : Saisie, EDI, CBN, Demande d'achat, Appel d'offre, Contremarque, WMS."
    ],
    "retenir": "Origine d'une pièce d'achat : champ « Origine », onglet Identifiant de l'en-tête.",
    "source": {
      "titre": "Gérer les achats",
      "url": "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704718965/G+rer+les+achats"
    }
  },
  {
    "id": "dv02-q17",
    "dialecte": "Divalto 10.13",
    "q": "Le fournisseur confirme seulement une partie de ta commande. Comment le noter sur la commande d'achat ?",
    "choix": [
      "Cocher « Pièce confirmée » dans l'en-tête",
      "Mettre le Statut ARC à « AR partiel »",
      "Supprimer les lignes qu'il ne confirme pas",
      "Mettre un délai reporté sur les lignes"
    ],
    "bonne": 1,
    "pourquoi": [
      "Non. Une simple case ne dit pas que l'accord est partiel. Le Statut ARC est fait pour ça.",
      "Oui. Onglet Livraison : Statut ARC, Numéro ARC, Date ARC (V10.11). Avec « AR partiel » en en-tête, au moins une ligne doit être en partiel. Ces données suivent jusqu'à la facture.",
      "Non. Supprimer fait perdre la trace de ce qui a été commandé.",
      "Non. Le délai reporté sert aux dates, pas au statut de l'accusé de réception."
    ],
    "retenir": "AR fournisseur (V10.11) : Statut ARC (total ou partiel), numéro et date, en en-tête et par ligne.",
    "source": {
      "titre": "L'accusé de réception pour les commandes d'achat (V10.11)",
      "url": "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704721472/L+accus+de+r+ception+pour+les+commandes+d+achat+V10.11"
    }
  },
  {
    "id": "dv02-q18",
    "dialecte": "Divalto 10.13",
    "q": "Tu lances la relance ARC des commandes fournisseur sans changer les filtres. Côté statut ARC, quelles lignes sont proposées ?",
    "choix": [
      "AR reçu ou non demandé",
      "Toutes, même l'AR reçu",
      "Les AR attendus et les AR partiels",
      "Seulement les AR partiels"
    ],
    "bonne": 2,
    "pourquoi": [
      "Non. Ce statut existe dans les filtres, mais il n'est pas coché par défaut.",
      "Non. Un AR reçu n'a pas besoin de relance : il n'est pas filtré par défaut.",
      "Oui. Par défaut, la relance ARC filtre l'AR attendu et l'AR partiel : les lignes qui attendent encore une réponse du fournisseur.",
      "Non. L'AR attendu est aussi filtré par défaut."
    ],
    "retenir": "Relance ARC : par défaut, AR attendu + AR partiel. Relance par mail (processus) ou par téléphone.",
    "source": {
      "titre": "L'accusé de réception pour les commandes d'achat (V10.11)",
      "url": "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704721472/L+accus+de+r+ception+pour+les+commandes+d+achat+V10.11"
    }
  },
  {
    "id": "dv02-q19",
    "dialecte": "Divalto 10.13",
    "q": "Commande fournisseur : délai demandé le 10, délai reporté le 20. Le 15, la relance « Retard de livraison commande » la voit-elle en retard ?",
    "choix": [
      "Non : le délai reporté fait foi",
      "Oui : le délai demandé est dépassé",
      "Oui : on prend le délai le plus ancien",
      "Non : seul l'ARC fait foi"
    ],
    "bonne": 0,
    "pourquoi": [
      "Oui. Une commande est en retard quand son délai reporté est dépassé, s'il est renseigné. Ici, le 20 n'est pas encore passé.",
      "Non. Le délai demandé ne sert qu'en dernier recours, quand les autres délais sont vides.",
      "Non. Ce n'est pas la date la plus ancienne qui compte : le délai reporté, s'il existe, passe en premier.",
      "Non. La date de l'ARC n'est pas le critère de retard."
    ],
    "retenir": "Retard fournisseur : on regarde d'abord le délai reporté s'il existe, le délai demandé en dernier.",
    "source": {
      "titre": "L'accusé de réception pour les commandes d'achat (V10.11)",
      "url": "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704721472/L+accus+de+r+ception+pour+les+commandes+d+achat+V10.11"
    }
  },
  {
    "id": "dv02-q20",
    "dialecte": "Divalto 10.13",
    "q": "La marchandise de ta commande fournisseur arrive. Quelle action la fait entrer en stock ?",
    "choix": [
      "Activer la commande provisoire",
      "Cocher « AR reçu » sur la commande",
      "Imprimer le bon de commande",
      "La valider en BL fournisseur"
    ],
    "bonne": 3,
    "pourquoi": [
      "Non. Une commande active n'est pas encore une entrée en stock.",
      "Non. L'accusé de réception confirme la commande. Il ne bouge pas le stock.",
      "Non. L'impression envoie la commande. Elle ne touche pas au stock.",
      "Oui. C'est la saisie d'un BL fournisseur, ou la validation de la commande d'achat en BL, qui génère l'entrée en stock."
    ],
    "retenir": "Entrée en stock à l'achat = BL fournisseur (saisi directement ou issu de la commande).",
    "source": {
      "titre": "Gérer les achats",
      "url": "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704718965/G+rer+les+achats"
    }
  },
  {
    "id": "dv02-q21",
    "dialecte": "Divalto 10.13",
    "q": "Ton fournisseur livre souvent en plusieurs fois. Où régler la gestion des reliquats pour ses commandes ?",
    "choix": [
      "Dans la fiche article de chaque produit",
      "Dans le dossier, une seule fois pour tout",
      "Dans le dossier, sa fiche et la commande",
      "Dans le mode de règlement du fournisseur"
    ],
    "bonne": 2,
    "pourquoi": [
      "Non. L'article n'a pas de réglage de reliquat.",
      "Non. Le dossier autorise les reliquats, mais il faut aussi la fiche du fournisseur et la commande.",
      "Oui. Dossier : « Autoriser la gestion des reliquats à la ligne ». Fiche fournisseur : « Gérer les reliquats en commande ». Commande : « Accepte les reliquats » (onglet Livraison).",
      "Non. Le mode de règlement gère les échéances, pas les reliquats."
    ],
    "retenir": "Reliquats : dossier + fiche du fournisseur + case « Accepte les reliquats » de la commande.",
    "source": {
      "titre": "Saisie des préparations/pré-réceptions",
      "url": "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704711219/Saisie+des+pr+parations+pr+-r+ceptions"
    }
  },
  {
    "id": "dv02-q22",
    "dialecte": "Divalto 10.13",
    "q": "Pas de gestion des reliquats. Tu réceptionnes 60 sur 100 d'une commande, par la saisie des réceptions. Que deviennent les 40 ?",
    "choix": [
      "Ils restent en reliquat sur la commande",
      "Perdus : la commande passe périmée",
      "Une commande de 40 est créée seule",
      "La réception partielle est refusée"
    ],
    "bonne": 1,
    "pourquoi": [
      "Non. Ça, c'est quand les reliquats sont gérés : la ligne reste active pour le reste.",
      "Oui. Depuis la V10.6, c'est possible sans reliquats, après confirmation. Mais la commande passe « périmée » et les 40 non reçus sont perdus.",
      "Non. Divalto ne recrée pas de commande pour le reste.",
      "Non. C'était le cas jusqu'à la V10.5. Depuis la V10.6, la réception partielle passe, après confirmation."
    ],
    "retenir": "Sans reliquats, une réception partielle solde la commande : le reste est perdu.",
    "source": {
      "titre": "Saisie des préparations/pré-réceptions",
      "url": "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704711219/Saisie+des+pr+parations+pr+-r+ceptions"
    }
  },
  {
    "id": "dv02-q23",
    "dialecte": "Divalto 10.13",
    "q": "Le fournisseur ne livrera jamais les 5 pièces restantes d'une ligne. Comment fermer ce reliquat en validant la commande en BL ?",
    "choix": [
      "Rien : il se ferme tout seul en fin de mois",
      "Supprimer la commande d'achat entière",
      "Passer le reliquat en ligne « gratuite »",
      "Cocher « solde du reliquat » sur la ligne"
    ],
    "bonne": 3,
    "pourquoi": [
      "Non. Un reliquat reste actif tant qu'on ne le solde pas.",
      "Non. On perdrait toute la commande : on solde seulement la ligne.",
      "Non. La gratuité change le prix. Elle ne ferme pas le reliquat.",
      "Oui. En mode fiche de la ligne du BL (onglet Généralités), la case « solde du reliquat » apparaît si la ligne est en reliquat. La ligne passe « Périmé ». Un motif peut être demandé."
    ],
    "retenir": "Reliquat jamais livré : « solde du reliquat » + motif. La ligne passe Périmé.",
    "source": {
      "titre": "Solder une ligne de commande en reliquat (V10.5)",
      "url": "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704717964/Solder+une+ligne+de+commande+en+reliquat+V10.5"
    }
  },
  {
    "id": "dv02-q24",
    "dialecte": "Divalto 10.13",
    "q": "Dossier réglé par défaut. En validant une commande fournisseur en BL, une ligne ne sera pas livrée. Que faire ?",
    "choix": [
      "Mettre sa quantité livrée à 0",
      "Supprimer la ligne dans le BL",
      "Valider tout, puis annuler le BL après",
      "Passer la ligne en gratuit"
    ],
    "bonne": 0,
    "pourquoi": [
      "Oui. Sans ce paramètre (non coché par défaut), on force la quantité à 0. La trace de la ligne commandée est gardée.",
      "Non. Par défaut, supprimer une ligne en validation est interdit. Il faut cocher « Autoriser la suppression de mouvement en validation de pièce » dans le dossier.",
      "Non. On créerait des mouvements pour rien : la quantité à 0 suffit.",
      "Non. La gratuité concerne le prix, pas la quantité livrée."
    ],
    "retenir": "Par défaut, pas de suppression de ligne en validation : on met la quantité à 0. Ça garde la trace.",
    "source": {
      "titre": "Suppression de ligne en validation de pièce (V10.5)",
      "url": "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704716106/Suppression+de+ligne+en+validation+de+pi+ce+V10.5"
    }
  },
  {
    "id": "dv02-q25",
    "dialecte": "Divalto 10.13",
    "q": "Dans l'interrogation du stock, la colonne « En réception » affiche 40 en police normale (pas en gras). Qu'est-ce que ça veut dire ?",
    "choix": [
      "40 sont arrivés et pré-réceptionnés au quai",
      "40 sont entrés en stock et déjà rangés",
      "40 sont en transit, avis d'expédition saisi",
      "40 sont commandés, sans nouvelle du fournisseur"
    ],
    "bonne": 2,
    "pourquoi": [
      "Non. Une quantité pré-réceptionnée, physiquement là, s'affiche en gras.",
      "Non. Une fois le BL validé, la quantité est en stock, plus « en réception ».",
      "Oui. Avis d'expédition saisi dans la saisie des réceptions : la quantité est « En réception » en police normale (en transit). Après la pré-réception, elle passe en gras.",
      "Non. Une commande seule n'alimente pas cette colonne : elle se remplit par la saisie des réceptions."
    ],
    "retenir": "« En réception » : police normale = en transit (avis d'expédition). En gras = physiquement là (pré-réception faite).",
    "source": {
      "titre": "Saisie des préparations/pré-réceptions",
      "url": "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704711219/Saisie+des+pr+parations+pr+-r+ceptions"
    }
  },
  {
    "id": "dv02-q26",
    "dialecte": "Divalto 10.13",
    "q": "Une grosse pré-réception dure du lundi au mercredi. Quelle date de réception prend le BL fournisseur ?",
    "choix": [
      "Le lundi, 1re ligne saisie",
      "La date de la commande d'achat",
      "La date d'expédition du fournisseur",
      "Le mercredi, dernière opération"
    ],
    "bonne": 3,
    "pourquoi": [
      "Non. Chaque ligne validée en pré-réception remet la date du jour : le lundi est remplacé.",
      "Non. La date de la commande n'a rien à voir avec l'entrée en stock.",
      "Non. La date d'expédition (sortie de chez le fournisseur) est un autre champ. La date de réception ne peut pas être avant elle.",
      "Oui. Depuis la V10.11, chaque ligne validée en pré-réception met à jour la date de réception. C'est la dernière opération qui fixe la date du BL."
    ],
    "retenir": "Pré-réception (V10.11) : date d'expédition et date de réception séparées. Date du BL = dernière opération.",
    "source": {
      "titre": "Saisie des préparations/pré-réceptions",
      "url": "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704711219/Saisie+des+pr+parations+pr+-r+ceptions"
    }
  },
  {
    "id": "dv02-q27",
    "dialecte": "Divalto 10.13",
    "q": "Commande A : remise en pied de 10 €. Commande B : remise en pied de 7 €. Les deux arrivent sur le même BL (pré-réception). Quelle remise en pied sur le BL ?",
    "choix": [
      "7 €",
      "8,50 €",
      "10 €",
      "17 €"
    ],
    "bonne": 3,
    "pourquoi": [
      "Non. La remise de la commande A s'ajoute aussi.",
      "Non. On ne fait pas la moyenne : on additionne.",
      "Non. La remise de la commande B n'est pas perdue : elle s'ajoute.",
      "Oui. Depuis la V10.9, la remise en pied du BL additionne les remises des deux commandes. La répartition par ligne est recalculée."
    ],
    "retenir": "Plusieurs commandes sur un même BL (pré-réception) : leurs remises en pied s'additionnent.",
    "source": {
      "titre": "Gérer les achats",
      "url": "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704718965/G+rer+les+achats"
    }
  },
  {
    "id": "dv02-q28",
    "dialecte": "Divalto 10.13",
    "q": "Tu reçois 10 articles gérés par n° de série. La génération automatique est active. Tu saisis « AAA1 » comme premier numéro. Résultat ?",
    "choix": [
      "Il crée AAA1 à AAA10 sans souci",
      "Il bloque avec un message d'erreur",
      "Il crée AAA1 à AAA9 et s'arrête",
      "Il corrige seul en AAA01"
    ],
    "bonne": 1,
    "pourquoi": [
      "Non. La partie numérique « 1 » n'a qu'un chiffre : elle ne peut pas aller jusqu'à 10.",
      "Oui. Un seul chiffre ne suffit pas pour 10 numéros : message bloquant « l'incrémentation automatique de la quantité demandée n'est pas possible ». Il faut saisir AAA01.",
      "Non. Divalto ne génère pas une partie des numéros : il bloque avant.",
      "Non. Divalto ne corrige pas le format : c'est à toi de saisir AAA01."
    ],
    "retenir": "Premier n° de série : une seule partie numérique, assez longue pour toute la quantité (AAA01 pour 10).",
    "source": {
      "titre": "Accélération de la saisie des numéros de série/lot en BL fournisseur (V10.7)",
      "url": "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704711715/Acc+l+ration+de+la+saisie+des+num+ros+de+s+rie+lot+en+BL+fournisseur+V10.7"
    }
  },
  {
    "id": "dv02-q29",
    "dialecte": "Divalto 10.13",
    "q": "Une réception attend son contrôle qualité. Peux-tu vendre cette marchandise ?",
    "choix": [
      "Non : stock non contrôlé, bloqué",
      "Oui, elle est dans le stock physique",
      "Oui, mais seulement en interne",
      "Non : elle n'est pas encore en stock"
    ],
    "bonne": 0,
    "pourquoi": [
      "Oui. Tant que le contrôle n'est pas fait, la quantité est en « stock non contrôlé » : ni vente, ni sortie interne. Elle apparaît quand même dans les inventaires.",
      "Non. Elle est bien dans le stock physique, mais dans un compteur à part : le stock non contrôlé.",
      "Non. Les sorties internes (consommation…) sont bloquées aussi.",
      "Non. Elle est entrée dans le stock physique. Elle est seulement bloquée."
    ],
    "retenir": "Contrôle qualité en attente = stock physique, mais bloqué (stock non contrôlé).",
    "source": {
      "titre": "Gérer les achats",
      "url": "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704718965/G+rer+les+achats"
    }
  },
  {
    "id": "dv02-q30",
    "dialecte": "Divalto 10.13",
    "q": "Le contrôle qualité à la réception ne se déclenche pas sur un article. Où doit-il être activé ?",
    "choix": [
      "Dossier et dépôt de réception",
      "Seulement sur la fiche du fournisseur",
      "Seulement dans le dossier (onglet Options)",
      "Dossier, fournisseur, référencement"
    ],
    "bonne": 3,
    "pourquoi": [
      "Non. La doc cite trois niveaux : le dossier, la fiche fournisseur et le référencement de l'article. Le dépôt n'en fait pas partie.",
      "Non. La fiche fournisseur ne suffit pas : il faut aussi le dossier et le référencement de l'article.",
      "Non. Le dossier active la fonction, mais le fournisseur et le référencement doivent aussi être cochés.",
      "Oui. Il faut la coche dans le dossier (onglet Options), sur la fiche fournisseur et sur le référencement fournisseur de l'article. Les trois."
    ],
    "retenir": "Contrôle qualité à la réception = dossier + fiche fournisseur + référencement fournisseur de l'article.",
    "source": {
      "titre": "Gérer les achats",
      "url": "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704718965/G+rer+les+achats"
    }
  },
  {
    "id": "dv02-q31",
    "dialecte": "Divalto 10.13",
    "q": "Le contrôle qualité est fait pour toute une réception. Comment libérer toutes les lignes en une fois ?",
    "choix": [
      "Valider le BL fournisseur en facture",
      "Passer chaque ventilation à « Oui », une à une",
      "Coche « Contrôle qualité effectué » du BL",
      "Refaire le BL avec un autre code opération"
    ],
    "bonne": 2,
    "pourquoi": [
      "Non. La facturation ne lève pas le contrôle qualité.",
      "Non. C'est possible, mais ça libère une ventilation à la fois, pas tout en une fois.",
      "Oui. En-tête du BL fournisseur, onglet Complément, groupe Livraison : la coche « Contrôle qualité effectué » libère toutes les lignes.",
      "Non. Inutile : on signale le contrôle sur le BL existant."
    ],
    "retenir": "Libérer le contrôle : en-tête du BL (tout), colonne de la ligne (une position) ou de la ventilation.",
    "source": {
      "titre": "Gérer les achats",
      "url": "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704718965/G+rer+les+achats"
    }
  },
  {
    "id": "dv02-q32",
    "dialecte": "Divalto 10.13",
    "q": "Le rapport de contrôle refuse un lot reçu. Que devient ce lot ?",
    "choix": [
      "Il est retourné seul au fournisseur",
      "Il passe en stock en litige",
      "Il reste en stock non contrôlé",
      "Il est supprimé du stock"
    ],
    "bonne": 1,
    "pourquoi": [
      "Non. Le retour n'est pas automatique : le lot part d'abord en litige.",
      "Oui. Refusé : le lot prend le statut de stock en litige (une nature de stock spéciale) et entre dans le circuit des non-conformes.",
      "Non. Le rapport a tranché : le lot n'est plus « en attente de contrôle ».",
      "Non. Rien n'est supprimé : le lot reste suivi, en litige."
    ],
    "retenir": "Rapport de contrôle : accepté = lot contrôlé. Refusé = stock en litige.",
    "source": {
      "titre": "Cas du contrôle réception",
      "url": "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11705875676/Cas+du+contr+le+r+ception"
    }
  },
  {
    "id": "dv02-q33",
    "dialecte": "Divalto 10.13",
    "q": "La facture du fournisseur arrive. Quel outil compare ce qui est facturé avec ce qui a été vraiment reçu ?",
    "choix": [
      "Le contrôle facture fournisseur",
      "L'état des commandes à réceptionner",
      "La relance de pièce fournisseur",
      "L'analyse des consommations"
    ],
    "bonne": 0,
    "pourquoi": [
      "Oui. Il vérifie les montants et quantités facturés par rapport à la marchandise reçue, et il lie la facture aux BL.",
      "Non. Cet état montre ce qui reste à recevoir, pas ce qui est facturé.",
      "Non. La relance sert à réclamer une réponse ou une livraison au fournisseur.",
      "Non. L'analyse des consommations calcule des niveaux de stock pour le réappro."
    ],
    "retenir": "Facture fournisseur : on la rapproche des BL avec le contrôle facture fournisseur.",
    "source": {
      "titre": "Le contrôle facture fournisseur",
      "url": "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704720571/Le+contr+le+facture+fournisseur"
    }
  },
  {
    "id": "dv02-q34",
    "dialecte": "Divalto 10.13",
    "q": "Dans le contrôle facture, tu veux rapprocher une commande fournisseur pas encore reçue. Est-ce possible ?",
    "choix": [
      "Non : il faut d'abord un BL",
      "Oui, comme un BL normal",
      "Oui, si l'ARC est total",
      "Non : seulement par le Data Hub"
    ],
    "bonne": 0,
    "pourquoi": [
      "Oui. Pour rapprocher des commandes, elles doivent impérativement être validées en BL.",
      "Non. Une commande seule ne peut pas être rapprochée.",
      "Non. L'ARC ne remplace pas la réception.",
      "Non. Le contrôle facture s'ouvre aussi par le menu. La règle reste : commande validée en BL."
    ],
    "retenir": "Rapprochement d'une facture : seulement avec des commandes déjà validées en BL.",
    "source": {
      "titre": "Le contrôle facture fournisseur",
      "url": "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704720571/Le+contr+le+facture+fournisseur"
    }
  },
  {
    "id": "dv02-q35",
    "dialecte": "Divalto 10.13",
    "q": "Une ligne du contrôle facture est déclarée « en rejet » (différence de prix). Que se passe-t-il si tu génères la facture ?",
    "choix": [
      "Elle est créée sans la ligne rejetée",
      "Un avoir est créé automatiquement",
      "Divalto refuse : génération impossible",
      "Elle attend d'abord le visa du manager"
    ],
    "bonne": 2,
    "pourquoi": [
      "Non. La ligne en rejet n'est pas prise en compte, mais elle bloque toute la génération.",
      "Non. Le rejet ne crée pas d'avoir. Pour un avoir, on utilise la colonne « Génération code ».",
      "Oui. Divalto affiche « Génération de facture impossible » tant qu'une ligne est en rejet.",
      "Non. Ce n'est pas une question de visa : tant qu'une ligne est en rejet, la génération est impossible."
    ],
    "retenir": "Ligne en rejet = pas de facture. Traite l'écart d'abord.",
    "source": {
      "titre": "Le contrôle facture fournisseur",
      "url": "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704720571/Le+contr+le+facture+fournisseur"
    }
  },
  {
    "id": "dv02-q36",
    "dialecte": "Divalto 10.13",
    "q": "Commandé à 9 €, facturé 10 €. Tu gardes la marchandise, mais tu veux récupérer l'euro en trop. Que générer dans le contrôle facture ?",
    "choix": [
      "Un avoir avec retour",
      "Un avoir financier",
      "Une facture complémentaire",
      "Un rejet de la ligne, sans demande"
    ],
    "bonne": 1,
    "pourquoi": [
      "Non. Un écart de prix ou de remise ne donne jamais un avoir retour : rien n'est renvoyé.",
      "Oui. Écart de prix (ou de remise) = demande d'avoir financier pour le trop facturé. Elle prend la forme d'un devis ou d'une commande, selon le dossier.",
      "Non. La « facture » sert quand on garde une quantité livrée en trop.",
      "Non. Un rejet bloque la génération de la facture. C'est la demande d'avoir qui traite l'écart."
    ],
    "retenir": "Écart de prix → avoir financier. Trop livré renvoyé → avoir retour. Trop livré gardé → facture.",
    "source": {
      "titre": "Le contrôle facture fournisseur",
      "url": "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704720571/Le+contr+le+facture+fournisseur"
    }
  },
  {
    "id": "dv02-q37",
    "dialecte": "Divalto 10.13",
    "q": "Tu as commandé 100. Le fournisseur livre et facture 110. Tu lui renvoies les 10 en trop. Que générer dans le contrôle facture ?",
    "choix": [
      "Un avoir financier",
      "Rien : tu paies 110",
      "Une facture",
      "Un avoir retour"
    ],
    "bonne": 3,
    "pourquoi": [
      "Non. L'avoir financier sert à une surfacturation, sans marchandise renvoyée.",
      "Non. Tu renvoies 10 pièces : tu ne dois pas les payer.",
      "Non. « Facture » sert quand tu gardes et acceptes les 10 en trop.",
      "Oui. Quantité facturée plus grande à cause d'un trop livré que tu renvoies : demande d'avoir associée à un retour."
    ],
    "retenir": "Trop livré renvoyé = avoir retour. Trop livré gardé = facture.",
    "source": {
      "titre": "Le contrôle facture fournisseur",
      "url": "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704720571/Le+contr+le+facture+fournisseur"
    }
  },
  {
    "id": "dv02-q38",
    "dialecte": "Divalto 10.13",
    "q": "Quel code opération faut-il pour une demande d'avoir AVEC retour de la marchandise au fournisseur ?",
    "choix": [
      "Sortie fournisseur, avec mouvement de stock",
      "Entrée fournisseur, sans mouvement de stock",
      "Sortie fournisseur, sans mouvement de stock",
      "Entrée fournisseur, avec mouvement de stock"
    ],
    "bonne": 0,
    "pourquoi": [
      "Oui. La marchandise repart chez le fournisseur : c'est une sortie, avec mouvement de stock. Le code doit avoir la coche « Demande d'avoir fournisseur ».",
      "Non. C'est le code préconisé pour une demande de facture (trop livré gardé).",
      "Non. C'est le code de l'avoir financier : rien ne sort physiquement du stock.",
      "Non. Un retour au fournisseur fait sortir la marchandise. Il ne la fait pas entrer."
    ],
    "retenir": "Avoir financier = sortie sans stock. Avoir retour = sortie avec stock. Demande de facture = entrée sans stock.",
    "source": {
      "titre": "Le contrôle facture fournisseur",
      "url": "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704720571/Le+contr+le+facture+fournisseur"
    }
  },
  {
    "id": "dv02-q39",
    "dialecte": "Divalto 10.13",
    "q": "La coche « Nécessite une validation manuelle du contrôle facture » était posée quand le contrôle a été créé. Tu la décoches ensuite. Faut-il encore un visa pour ce contrôle ?",
    "choix": [
      "Non, plus aucun visa",
      "Non, sauf au-delà d'un plafond",
      "Oui, pour ce contrôle-là",
      "Oui, mais pour le prochain contrôle"
    ],
    "bonne": 2,
    "pourquoi": [
      "Non. Décocher vaut pour les prochains contrôles. Celui-ci garde son visa obligatoire.",
      "Non. Aucun plafond n'entre en jeu ici : c'est la coche présente à la création du contrôle qui compte.",
      "Oui. La doc le précise : si la coche était posée à la création du contrôle, il faut valider le visa, même si on la décoche ensuite sur le fournisseur.",
      "Non. C'est l'inverse : le contrôle déjà créé garde l'obligation, pas les suivants."
    ],
    "retenir": "Visa du contrôle facture : la règle est fixée à la création du contrôle.",
    "source": {
      "titre": "Le contrôle facture fournisseur",
      "url": "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704720571/Le+contr+le+facture+fournisseur"
    }
  },
  {
    "id": "dv02-q40",
    "dialecte": "Divalto 10.13",
    "q": "Tolérance d'acceptation du contrôle facture : 1 % dans le dossier, 3 % sur la fiche du fournisseur. Laquelle s'applique à ce fournisseur ?",
    "choix": [
      "1 %, celle du dossier",
      "2 %, la moyenne des deux",
      "3 %, celle du fournisseur",
      "4 %, la somme des deux"
    ],
    "bonne": 2,
    "pourquoi": [
      "Non. La tolérance d'acceptation de la fiche fournisseur prime sur celle du dossier.",
      "Non. Divalto ne fait pas de moyenne : il prend celle du fournisseur.",
      "Oui. La tolérance d'acceptation peut être propre au fournisseur. Elle doit être plus grande que celle du dossier, et elle prime.",
      "Non. Les tolérances ne s'additionnent pas."
    ],
    "retenir": "Contrôle facture : la tolérance d'acceptation de la fiche fournisseur prime sur celle du dossier.",
    "source": {
      "titre": "Traitement de Contrôle factures fournisseurs",
      "url": "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704720520/Traitement+de+Contr+le+factures+fournisseurs"
    }
  },
  {
    "id": "dv02-q41",
    "dialecte": "Divalto 10.13",
    "q": "Faut-il imprimer une facture fournisseur avant de l'intégrer en comptabilité ?",
    "choix": [
      "Oui, comme une facture client",
      "Non, sauf si elle est en devise",
      "Oui, en mode brouillon au moins",
      "Non, ce n'est pas nécessaire"
    ],
    "bonne": 3,
    "pourquoi": [
      "Non. C'est la règle des ventes : une facture client doit être imprimée. Pas une facture d'achat.",
      "Non. La devise ne change pas cette règle.",
      "Non. Aucune impression n'est exigée côté achat.",
      "Oui. Seule différence avec le circuit des ventes : les factures d'achat n'ont pas besoin d'être imprimées avant l'intégration."
    ],
    "retenir": "Intégration comptable : facture client imprimée obligatoire. Facture fournisseur : non.",
    "source": {
      "titre": "Intégration des pièces commerciales en comptabilité",
      "url": "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11705860158/Int+gration+des+pi+ces+commerciales+en+comptabilit"
    }
  },
  {
    "id": "dv02-q42",
    "dialecte": "Divalto 10.13",
    "q": "Fin de mois : marchandise reçue (BL fournisseur), mais la facture n'est pas encore arrivée. Quelle régularisation le cut-off génère-t-il ?",
    "choix": [
      "Une facture non parvenue (FNP)",
      "Une facture à établir (FAE)",
      "Un avoir à recevoir",
      "Une provision sur le transport"
    ],
    "bonne": 0,
    "pourquoi": [
      "Oui. Lignes de BR fournisseur sans facture (ou facturées après la date d'arrêté) = factures non parvenues. Une extourne est passée le lendemain de l'arrêté.",
      "Non. La FAE concerne les BL clients pas encore facturés (côté vente).",
      "Non. L'avoir à recevoir concerne des BR fournisseur de type avoir.",
      "Non. La provision transport porte sur des commandes fournisseur sans BR ni facture, avec des codes opération dédiés."
    ],
    "retenir": "Reçu mais pas encore facturé à la clôture = FNP (facture non parvenue), extournée le lendemain.",
    "source": {
      "titre": "Le Cut-off dans l'ERP",
      "url": "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11984371763/Le+Cut-off+dans+l+ERP"
    }
  },
  {
    "id": "dv02-q43",
    "dialecte": "Divalto 10.13",
    "q": "Ton fournisseur te doit une RFA (bonification de fin d'année). Que génère Divalto après le calcul de la RFA ?",
    "choix": [
      "Un avoir fournisseur saisi par toi",
      "Une remise sur ta prochaine commande",
      "Une facture adressée au fournisseur",
      "Une écriture en attente en compta"
    ],
    "bonne": 2,
    "pourquoi": [
      "Non. La doc le dit : on ne s'auto-génère pas un avoir fournisseur.",
      "Non. La RFA est facturée au fournisseur, pas déduite d'une commande.",
      "Oui. Une facture du montant de la RFA est générée et envoyée au fournisseur. Il doit être relié à un compte client (« Client à facturer » du contrat).",
      "Non. Après le calcul, le bouton Facturation crée une pièce commerciale : une facture."
    ],
    "retenir": "RFA (côté fournisseur) = on facture le fournisseur. BFA (côté client) = avoir au client.",
    "source": {
      "titre": "Gérer les BFA-RFA",
      "url": "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704724854/G+rer+les+BFA-RFA"
    }
  },
  {
    "id": "dv02-q44",
    "dialecte": "Divalto 10.13",
    "q": "Une facture d'abonnement téléphonique, sans commande, arrive par la dématérialisation. Où va-t-elle ?",
    "choix": [
      "En contrôle facture, avec les BL",
      "En écriture en attente, avant la compta",
      "Directement au journal des achats, validée",
      "En commande fournisseur provisoire"
    ],
    "bonne": 1,
    "pourquoi": [
      "Non. Le contrôle facture rapproche des factures d'achat avec des BL. Ici, il n'y a pas de commande.",
      "Oui. Les factures sans achat (abonnements…) génèrent une écriture en attente, avant la comptabilité. Elle sera visée, puis intégrée.",
      "Non. L'écriture passe d'abord en attente : elle n'est pas intégrée directement.",
      "Non. La dématérialisation ne crée pas de commande à partir d'une facture."
    ],
    "retenir": "Démat : facture d'achat → rapprochement avec les BL. Facture sans commande → écriture en attente.",
    "source": {
      "titre": "Les factures fournisseurs traitées par la dématérialisation",
      "url": "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704720297/Les+factures+fournisseurs+trait+es+par+la+d+mat+rialisation"
    }
  },
  {
    "id": "dv02-q45",
    "dialecte": "Divalto 10.13",
    "q": "Une écriture en attente vient du Data Hub. Peux-tu l'intégrer en comptabilité sans visa ?",
    "choix": [
      "Non, elle doit d'abord être visée",
      "Oui, comme toute écriture en attente",
      "Oui, si elle est équilibrée",
      "Non, elle doit repasser en saisie"
    ],
    "bonne": 0,
    "pourquoi": [
      "Oui. Il faut « Viser l'écriture » (droit CEv) ou demander le visa. Visée, elle peut être intégrée (en visa de masse, elle s'intègre seule).",
      "Non. Le visa est facultatif seulement pour une écriture saisie directement, sans le Data Hub.",
      "Non. L'équilibre est contrôlé à l'intégration, mais il ne remplace pas le visa.",
      "Non. Elle est déjà dans la saisie des écritures en attente : il manque le visa."
    ],
    "retenir": "Écriture en attente venue du Data Hub : visa obligatoire avant intégration. Saisie directe : pas obligatoire.",
    "source": {
      "titre": "Saisie des écritures en attente",
      "url": "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704721008/Saisie+des+critures+en+attente"
    }
  },
  {
    "id": "dv02-q46",
    "dialecte": "Divalto 10.13",
    "q": "Tu as corrigé une donnée sur un dataset de facture en erreur. Que faire pour que la correction soit traitée ?",
    "choix": [
      "Modifier le fichier pivot d'origine",
      "Périmer le dataset puis le recréer",
      "Le ré-injecter dans l'automate",
      "Attendre : il repart tout seul ensuite"
    ],
    "bonne": 2,
    "pourquoi": [
      "Non. On corrige le dataset dans le superviseur, pas le fichier d'origine.",
      "Non. Périmer sort le dataset du circuit : on perdrait le travail.",
      "Oui. Après une correction ou un ajout, on clique sur « Ré-injecter dans l'automate » pour que les changements soient traités.",
      "Non. Sans ré-injection, la correction n'est pas prise en compte."
    ],
    "retenir": "Dataset corrigé dans le superviseur → « Ré-injecter dans l'automate ».",
    "source": {
      "titre": "Navigation et utilisation de la dématérialisation des factures fournisseurs",
      "url": "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704720369/Navigation+et+utilisation+de+la+d+mat+rialisation+des+factures+fournisseurs"
    }
  },
  {
    "id": "dv02-q47",
    "dialecte": "Divalto 10.13",
    "q": "Tu déposes une facture Factur-X AVEC un fichier pivot .dhub dans le Data Hub. Comment est-elle traitée ?",
    "choix": [
      "Comme un PDF classique, en mode natif",
      "Par lecture du XML embarqué dans le PDF",
      "Elle est rejetée en doublon",
      "Avec le pivot et le XML, fusionnés"
    ],
    "bonne": 0,
    "pourquoi": [
      "Oui. Une Factur-X accompagnée d'un pivot est traitée comme un PDF classique, selon le fonctionnement natif (FACFOU).",
      "Non. Le XML embarqué est lu directement seulement quand la Factur-X est déposée sans pivot.",
      "Non. Le dépôt avec pivot est accepté : il suit le circuit classique.",
      "Non. Divalto ne fusionne pas : avec un pivot, c'est le pivot qui fait foi."
    ],
    "retenir": "Factur-X seule → le Data Hub lit le XML embarqué. Factur-X + pivot → traitement classique par le pivot.",
    "source": {
      "titre": "Intégrer une facture au format Factur-X par le datahub (V10.11)",
      "url": "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704715447/Int+grer+une+facture+au+format+Factur-X+par+le+datahub+V10.11"
    }
  },
  {
    "id": "dv02-q48",
    "dialecte": "Divalto 10.13",
    "q": "Une Factur-X s'arrête avec l'erreur « Fournisseur non identifié ». Que vérifier d'abord ?",
    "choix": [
      "Le code chemin EDI_PIECES du dossier",
      "Le mode de règlement du fournisseur",
      "Le n° de commande du PDF",
      "Les SIRET, GLN et DUNS de sa fiche"
    ],
    "bonne": 3,
    "pourquoi": [
      "Non. EDI_PIECES sert à déposer les fichiers EDI émis, pas à identifier un vendeur.",
      "Non. Le mode de règlement ne sert pas à identifier le vendeur.",
      "Non. L'identification du fournisseur ne passe pas par un numéro de commande.",
      "Oui. Le fournisseur est identifié par les identifiants du fichier (SIRET, GLN, DUNS). La recherche est cumulative : tous ceux du fichier doivent être sur la fiche. Ils s'affichent dans l'onglet Compléments du dataset."
    ],
    "retenir": "Factur-X : acheteur et vendeur sont identifiés par SIRET, GLN, DUNS. Renseigne-les tous sur les fiches.",
    "source": {
      "titre": "Intégration technique des Factures Factur‑X : lecture des métadonnées et identification des entités",
      "url": "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704715472/Int+gration+technique+des+Factures+Factur+X+lecture+des+m+tadonn+es+et+identification+des+entit+s"
    }
  },
  {
    "id": "dv02-q49",
    "dialecte": "Divalto 10.13",
    "q": "Tu veux que les commandes d'un fournisseur partent en fichier EDI, et plus sur papier. Où le régler ?",
    "choix": [
      "Le dossier, onglet Pièces : une coche EDI",
      "Sa fiche, onglet Documents : support EDI",
      "La fiche article : la référence externe",
      "La commande : bouton d'envoi par mail"
    ],
    "bonne": 1,
    "pourquoi": [
      "Non. Le support se choisit par tiers, sur sa fiche, pas par une coche globale du dossier.",
      "Oui. Support « EDI » ou « EDI et papier » sur la fiche fournisseur (onglet Documents). À l'impression, un fichier est généré et déposé dans le chemin EDI_PIECES.",
      "Non. La référence externe sert dans le contenu du fichier, pas à choisir le support.",
      "Non. L'envoi par mail est une autre fonction : il n'active pas l'EDI."
    ],
    "retenir": "EDI sortant : support EDI sur la fiche du tiers + chemin EDI_PIECES. Le fichier naît à l'impression.",
    "source": {
      "titre": "Le fichier pivot et les fichiers compagnons",
      "url": "https://divalto.atlassian.net/wiki/spaces/PAI/pages/10524459213/Le+fichier+pivot+et+les+fichiers+compagnons"
    }
  },
  {
    "id": "dv02-q50",
    "dialecte": "Divalto 10.13",
    "q": "Le fichier EDI d'une commande fournisseur est généré. Quelle référence d'article contient-il par défaut ?",
    "choix": [
      "Ta référence interne de l'article",
      "Le code EAN de l'article",
      "La référence externe du tiers",
      "La désignation de l'article"
    ],
    "bonne": 2,
    "pourquoi": [
      "Non. Le fichier est fait pour le logiciel du partenaire : il porte sa référence à lui.",
      "Non. La doc indique la référence externe du tiers, pas le code EAN.",
      "Oui. Par défaut, c'est la référence externe du tiers (son référencement). Attention : sans référencement, aucune référence article n'est reprise dans le fichier.",
      "Non. La désignation n'est pas la référence reprise par défaut."
    ],
    "retenir": "Fichier EDI émis : référence externe du tiers. Pas de référencement = pas de référence article dans le fichier.",
    "source": {
      "titre": "Impression de pièce en EDI",
      "url": "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704712577/Impression+de+pi+ce+en+EDI"
    }
  },
  {
    "id": "dv02-q51",
    "dialecte": "Divalto 10.13",
    "q": "Ton fournisseur envoie un avis d'expédition sous forme de fichier. Que peut créer ce fichier dans Divalto, via le Data Hub ?",
    "choix": [
      "Un BL validé, avec l'entrée en stock",
      "Une facture fournisseur",
      "Une commande fournisseur provisoire",
      "Une pré-réception fournisseur"
    ],
    "bonne": 3,
    "pourquoi": [
      "Non. Il prépare la réception : l'entrée en stock se fait à la validation du BL.",
      "Non. La facture passe par un autre dataset (FACFOU).",
      "Non. L'avis d'expédition se rattache à une commande qui existe déjà (son numéro est obligatoire).",
      "Oui. Le dataset RECEPFOU (V10.5) part de l'avis d'expédition du fournisseur pour créer une pré-saisie de la réception."
    ],
    "retenir": "Avis d'expédition fournisseur → dataset RECEPFOU → pré-réception, puis réception.",
    "source": {
      "titre": "Pré-réception fournisseur (V10.5)",
      "url": "https://divalto.atlassian.net/wiki/spaces/PAI/pages/10524754518/Pr+-r+ception+fournisseur+V10.5"
    }
  },
  {
    "id": "dv02-q52",
    "dialecte": "Divalto 10.13",
    "q": "Commandes clients : 120. Stock : 70. Commande fournisseur déjà en cours : 30. Quel besoin net le CBN calcule-t-il ?",
    "choix": [
      "20 pièces",
      "50 pièces",
      "90 pièces",
      "120 pièces"
    ],
    "bonne": 0,
    "pourquoi": [
      "Oui. Besoin net = besoin brut – (stock + approvisionnements prévus) : 120 – (70 + 30) = 20.",
      "Non. 120 – 70 oublie la commande fournisseur en cours : elle compte dans l'encours.",
      "Non. 120 – 30 oublie le stock.",
      "Non. 120, c'est le besoin brut. Le CBN déduit le stock et les approvisionnements prévus."
    ],
    "retenir": "Besoin net = besoin brut – (stock + approvisionnements déjà prévus).",
    "source": {
      "titre": "Utiliser le CBN (Calcul des Besoins Nets) - Réapprovisionnement",
      "url": "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11705849126/Utiliser+le+CBN+Calcul+des+Besoins+Nets+-+R+approvisionnement"
    }
  },
  {
    "id": "dv02-q53",
    "dialecte": "Divalto 10.13",
    "q": "Un article est géré en stock à l'unité, mais acheté par carton. En quelle unité le CBN fait-il ses propositions d'achat ?",
    "choix": [
      "En unité de vente du client",
      "En unité de stock (l'unité)",
      "En unité d'achat (ici, le carton)",
      "En unité choisie au lancement"
    ],
    "bonne": 2,
    "pourquoi": [
      "Non. L'unité de vente du client ne sert pas aux propositions d'achat.",
      "Non. C'est un piège courant : la doc précise que les propositions sont en unités d'achat.",
      "Oui. Les propositions CBN sont faites en unités d'achat. Les lignes de commande générées sont aussi en unités d'achat.",
      "Non. Les critères de lancement (horizon, articles, fournisseurs, pièces…) ne portent pas sur l'unité."
    ],
    "retenir": "Propositions CBN = unités d'achat. Les commandes générées aussi.",
    "source": {
      "titre": "Utiliser le CBN (Calcul des Besoins Nets) - Réapprovisionnement",
      "url": "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11705849126/Utiliser+le+CBN+Calcul+des+Besoins+Nets+-+R+approvisionnement"
    }
  },
  {
    "id": "dv02-q54",
    "dialecte": "Divalto 10.13",
    "q": "Tu relances le CBN. Tu veux supprimer les anciennes propositions pas encore traitées. Quel mode de calcul choisir ?",
    "choix": [
      "Le mode complémentaire",
      "Le mode régénératif",
      "Le lancement par processus",
      "Le rejalonnement des commandes"
    ],
    "bonne": 1,
    "pourquoi": [
      "Non. En complémentaire, les anciennes propositions sont gardées et le CBN en ajoute.",
      "Oui. Régénératif : les anciennes propositions non traitées (achat et production) sont supprimées, puis recalculées.",
      "Non. Le processus fait tourner le CBN en arrière-plan. Il ne décide pas du sort des anciennes propositions.",
      "Non. Le rejalonnement avance une commande existante pour couvrir un besoin. Il ne supprime rien."
    ],
    "retenir": "Régénératif = on repart de zéro. Complémentaire = on garde les anciennes propositions et on ajoute.",
    "source": {
      "titre": "Utiliser le CBN (Calcul des Besoins Nets) - Réapprovisionnement",
      "url": "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11705849126/Utiliser+le+CBN+Calcul+des+Besoins+Nets+-+R+approvisionnement"
    }
  },
  {
    "id": "dv02-q55",
    "dialecte": "Divalto 10.13",
    "q": "Article de classe A : cher, très vendu, géré en stock. Ses commandes clients sont connues à l'avance. Quelle méthode de réappro la doc conseille-t-elle ?",
    "choix": [
      "Approvisionnement global",
      "Contremarque directe",
      "Historique des consommations",
      "À date sur portefeuille"
    ],
    "bonne": 3,
    "pourquoi": [
      "Non. La méthode globale convient aux articles peu consommés et peu chers (classe C). Elle n'évite pas les ruptures.",
      "Non. En contremarque directe, le fournisseur livre le client : il n'y a pas de stock.",
      "Non. Elle se base sur les 12 derniers mois. Elle vise les articles vendus sur stock, sans vue sur les commandes clients.",
      "Oui. Elle calcule un stock virtuel jour par jour, avec les commandes clients et fournisseurs. La doc la conseille pour les articles A et B, et ceux de forte valeur."
    ],
    "retenir": "Article A ou cher : « à date sur portefeuille ». Article C peu cher : « global ».",
    "source": {
      "titre": "Utiliser le CBN (Calcul des Besoins Nets) - Réapprovisionnement",
      "url": "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11705849126/Utiliser+le+CBN+Calcul+des+Besoins+Nets+-+R+approvisionnement"
    }
  },
  {
    "id": "dv02-q56",
    "dialecte": "Divalto 10.13",
    "q": "Tu ajoutes 2 jours de délai de sécurité chez un fournisseur. Quel est l'effet sur les propositions du CBN ?",
    "choix": [
      "La commande est proposée 2 jours plus tôt",
      "Le besoin client est avancé de 2 jours",
      "La livraison client recule de 2 jours",
      "Le stock de sécurité monte de 2 unités"
    ],
    "bonne": 0,
    "pourquoi": [
      "Oui. Le délai de sécurité s'ajoute au délai d'appro : la date de passation de la commande est avancée d'autant.",
      "Non. La doc insiste : le besoin reste à sa date de sortie prévue. Seule la date de commande bouge.",
      "Non. Ce réglage ne touche pas aux délais promis au client.",
      "Non. C'est un délai en jours, pas une quantité. Le stock de sécurité est un autre réglage."
    ],
    "retenir": "Délai de sécurité = commander plus tôt. La date du besoin ne change pas.",
    "source": {
      "titre": "Utiliser le CBN (Calcul des Besoins Nets) - Réapprovisionnement",
      "url": "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11705849126/Utiliser+le+CBN+Calcul+des+Besoins+Nets+-+R+approvisionnement"
    }
  },
  {
    "id": "dv02-q57",
    "dialecte": "Divalto 10.13",
    "q": "Aucun « délai entre deux commandes » n'est saisi (ni dans le dossier, ni dans la famille de réappro). Que prend le CBN pour regrouper les besoins ?",
    "choix": [
      "0 jour : aucun regroupement",
      "7 jours par défaut",
      "30 jours par défaut",
      "Le délai du fournisseur"
    ],
    "bonne": 2,
    "pourquoi": [
      "Non. Sans réglage, le CBN ne travaille pas au jour le jour : il applique une valeur par défaut.",
      "Non. La valeur par défaut donnée par la doc est 30 jours.",
      "Oui. Par défaut, le CBN prend 30 jours. Il regroupe les besoins de cette période en une seule proposition.",
      "Non. Le délai du fournisseur sert à dater la commande, pas à regrouper les besoins."
    ],
    "retenir": "Délai entre deux commandes vide = 30 jours par défaut. Règle-le, sinon le CBN regroupe les besoins sur 30 jours.",
    "source": {
      "titre": "Utiliser le CBN (Calcul des Besoins Nets) - Réapprovisionnement",
      "url": "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11705849126/Utiliser+le+CBN+Calcul+des+Besoins+Nets+-+R+approvisionnement"
    }
  },
  {
    "id": "dv02-q58",
    "dialecte": "Divalto 10.13",
    "q": "Dans l'administration des propositions du CBN, le montant d'un fournisseur s'affiche en rouge. Pourquoi ?",
    "choix": [
      "Le fournisseur est en feu rouge",
      "Le seuil tarifaire n'est pas atteint",
      "La proposition est en retard",
      "Le plafond commande du fournisseur est dépassé"
    ],
    "bonne": 1,
    "pourquoi": [
      "Non. Le feu du fournisseur agit en saisie de devis et de commandes, pas sur cet affichage.",
      "Oui. Avec l'option « Gérer un seuil tarifaire en commande achat », le montant s'affiche en rouge si le seuil du fournisseur n'est pas atteint. On peut alors compléter une pièce provisoire.",
      "Non. Une commande qui aurait dû partir avant aujourd'hui est décalée au lendemain. Ce n'est pas le sens du montant rouge.",
      "Non. Le plafond commande bloque une commande trop grosse. Ici, le rouge signale au contraire un montant trop faible."
    ],
    "retenir": "Montant rouge dans les propositions CBN = seuil tarifaire du fournisseur pas atteint.",
    "source": {
      "titre": "Utiliser le CBN (Calcul des Besoins Nets) - Réapprovisionnement",
      "url": "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11705849126/Utiliser+le+CBN+Calcul+des+Besoins+Nets+-+R+approvisionnement"
    }
  },
  {
    "id": "dv02-q59",
    "dialecte": "Divalto 10.13",
    "q": "Tu valides des propositions CBN « au statut provisoire ». Les commandes créées sont « préparées ». Que faut-il faire ensuite ?",
    "choix": [
      "Lancer la relance de pièce fournisseur",
      "Rien : le prochain CBN s'en charge",
      "Imprimer chaque commande",
      "Lancer l'activation des commandes"
    ],
    "bonne": 3,
    "pourquoi": [
      "Non. La relance sert à relancer le fournisseur, pas à activer une commande.",
      "Non. Le CBN n'active pas les pièces : il faut lancer l'activation.",
      "Non. L'impression ne change pas le statut d'une commande préparée.",
      "Oui. Le traitement « Activation des commandes fournisseurs » (Stocks / Réapprovisionnement) les fait passer de préparé à actif. Attention : par défaut, les commandes préparées n'apparaissent pas dans le zoom."
    ],
    "retenir": "Propositions validées en provisoire = commandes « préparées ». On les active avec l'activation des commandes fournisseurs.",
    "source": {
      "titre": "Utiliser le CBN (Calcul des Besoins Nets) - Réapprovisionnement",
      "url": "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11705849126/Utiliser+le+CBN+Calcul+des+Besoins+Nets+-+R+approvisionnement"
    }
  },
  {
    "id": "dv02-q60",
    "dialecte": "Divalto 10.13",
    "q": "En contremarque « directe », qui livre le client final ?",
    "choix": [
      "Le transporteur du client",
      "Toi, après réception chez toi",
      "Le fournisseur, chez ton client",
      "Le dépôt le plus proche"
    ],
    "bonne": 2,
    "pourquoi": [
      "Non. Le transporteur n'entre pas dans la définition de la contremarque.",
      "Non. Ça, c'est la contremarque « réceptionnée » : livraison chez toi, puis tu livres le client.",
      "Oui. Contremarque directe : le fournisseur livre directement ton client. La marchandise ne passe pas par ton stock.",
      "Non. En contremarque directe, la marchandise ne passe par aucun de tes dépôts."
    ],
    "retenir": "Contremarque : directe = fournisseur → client. Réceptionnée = fournisseur → toi → client.",
    "source": {
      "titre": "La contremarque",
      "url": "https://divalto.atlassian.net/wiki/spaces/UDI113/pages/11704719489/La+contremarque"
    }
  }
];
