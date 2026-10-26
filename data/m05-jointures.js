LEARNSQL.questions.m05 = [
  {
    id: "m05-q01", dialecte: "Standard",
    q: "Tu fais client INNER JOIN commande ON commande.client_id = client.id. Que deviennent les clients sans commande ?",
    choix: [
      "Ils apparaissent avec des NULL",
      "Ils disparaissent du résultat",
      "Ils apparaissent une fois chacun",
      "Erreur de jointure"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Ça, c'est le LEFT JOIN.",
      "Oui. INNER JOIN garde seulement les lignes qui ont une correspondance des deux côtés.",
      "Non. Sans correspondance, pas de ligne.",
      "Non. C'est un cas normal."
    ],
    retenir: "INNER JOIN = seulement ce qui correspond des deux côtés."
  },
  {
    id: "m05-q02", dialecte: "Standard",
    q: "Tu veux TOUS les clients, avec leurs commandes 2026 s'il y en a. Quel est le problème ici ?",
    code: "SELECT cl.nom, co.montant\nFROM client cl\nLEFT JOIN commande co ON co.client_id = cl.id\nWHERE co.annee = 2026;",
    choix: [
      "Aucun problème",
      "Les clients sans commande 2026 disparaissent",
      "Les commandes sont en double",
      "Erreur de syntaxe"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Il y a un piège.",
      "Oui. Pour ces clients, co.annee est NULL. Le WHERE les élimine. Le LEFT JOIN devient un INNER JOIN. Mets la condition dans le ON : … AND co.annee = 2026.",
      "Non. Pas de doublon créé ici.",
      "Non. C'est valide."
    ],
    retenir: "LEFT JOIN : les filtres sur la table de droite vont dans le ON, pas dans le WHERE."
  },
  {
    id: "m05-q03", dialecte: "Standard",
    q: "Comment trouver les clients qui n'ont aucune commande ?",
    choix: [
      "client INNER JOIN commande … WHERE commande.id IS NULL",
      "client LEFT JOIN commande … WHERE commande.id IS NULL",
      "client LEFT JOIN commande … WHERE commande.id IS NOT NULL",
      "client RIGHT JOIN commande … WHERE client.id IS NULL"
    ],
    bonne: 1,
    pourquoi: [
      "Non. INNER JOIN a déjà retiré les clients sans commande.",
      "Oui. LEFT JOIN garde tous les clients. Ceux sans commande ont commande.id à NULL. (NOT EXISTS marche aussi très bien.)",
      "Non. Ça donne les clients AVEC commande.",
      "Non. Ça donne les commandes sans client (orphelines)."
    ],
    retenir: "Anti-jointure : LEFT JOIN + IS NULL sur la clé de droite, ou NOT EXISTS."
  },
  {
    id: "m05-q04", dialecte: "Standard",
    q: "Une commande a 4 lignes de détail et 20 € de frais de port. Tu calcules SUM(commande.frais_port) après une jointure avec les lignes. Quel résultat ?",
    choix: ["20 €", "80 €", "4 €", "NULL"],
    bonne: 1,
    pourquoi: [
      "Non. La jointure a multiplié la ligne de commande.",
      "Oui. La jointure crée 4 lignes, chacune avec 20 € de port. 4 × 20 = 80 €. Calcule le port avant la jointure, ou dans une sous-requête.",
      "Non. Le montant n'est pas divisé.",
      "Non. Il y a des valeurs."
    ],
    retenir: "Jointure 1-N : les montants du côté « 1 » sont répétés. Attention aux SUM."
  },
  {
    id: "m05-q05", dialecte: "Standard",
    q: "La table A a 3 lignes, la table B a 5 lignes. Combien de lignes donne A CROSS JOIN B ?",
    choix: ["3", "5", "8", "15"],
    bonne: 3,
    pourquoi: [
      "Non.",
      "Non.",
      "Non. On ne les additionne pas.",
      "Oui. CROSS JOIN associe chaque ligne de A à chaque ligne de B : 3 × 5 = 15."
    ],
    retenir: "CROSS JOIN = produit cartésien. Utile pour générer des combinaisons (ex. articles × mois)."
  },
  {
    id: "m05-q06", dialecte: "Standard",
    q: "Tu compares les commandes de l'ERP et celles reçues par EDI. Tu veux voir les manquants des DEUX côtés. Quelle jointure ?",
    choix: ["INNER JOIN", "LEFT JOIN", "FULL OUTER JOIN", "CROSS JOIN"],
    bonne: 2,
    pourquoi: [
      "Non. Ça montre seulement ce qui est présent des deux côtés.",
      "Non. Ça montre les manquants d'un seul côté.",
      "Oui. FULL OUTER JOIN garde tout. Un côté à NULL = manquant de ce côté.",
      "Non. Ça associe tout avec tout."
    ],
    retenir: "Rapprochement entre deux sources : FULL OUTER JOIN + tests IS NULL."
  },
  {
    id: "m05-q07", dialecte: "Standard",
    q: "La table salarie a les colonnes id, nom, manager_id. Comment afficher chaque salarié avec le nom de son manager ?",
    choix: [
      "Impossible avec une seule table",
      "Joindre salarie avec elle-même : salarie s LEFT JOIN salarie m ON m.id = s.manager_id",
      "GROUP BY manager_id",
      "UNION des deux colonnes"
    ],
    bonne: 1,
    pourquoi: [
      "Non. C'est possible avec une auto-jointure.",
      "Oui. C'est une auto-jointure. Deux alias pour la même table. LEFT pour garder le grand patron (sans manager).",
      "Non. Ça regroupe, ça ne récupère pas le nom.",
      "Non. UNION empile des lignes, il ne les relie pas."
    ],
    retenir: "Auto-jointure : même table, deux alias."
  },
  {
    id: "m05-q08", dialecte: "Standard",
    q: "Dans les deux tables, la colonne code_depot vaut NULL. La jointure ON a.code_depot = b.code_depot relie-t-elle ces lignes ?",
    choix: ["Oui", "Non", "Seulement en LEFT JOIN", "Ça dépend du serveur"],
    bonne: 1,
    pourquoi: [
      "Non. NULL = NULL donne « inconnu », pas « vrai ».",
      "Oui, elle ne les relie pas. NULL n'est égal à rien, même pas à NULL.",
      "Non. Le LEFT JOIN garde la ligne de gauche, mais sans correspondance.",
      "Non. C'est la règle standard partout."
    ],
    retenir: "Les clés NULL ne se joignent jamais. Pour forcer : IS NOT DISTINCT FROM (Snowflake, SQL Server 2022+)."
  },
  {
    id: "m05-q09", dialecte: "Standard",
    q: "Que deviennent les clients sans commande ?",
    code: "SELECT cl.nom, li.article\nFROM client cl\nLEFT JOIN commande co ON co.client_id = cl.id\nINNER JOIN ligne_cde li ON li.cde_id = co.id;",
    choix: [
      "Ils restent, avec article à NULL",
      "Ils disparaissent",
      "Ils apparaissent en double",
      "Erreur : on ne mélange pas LEFT et INNER"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Le INNER JOIN suivant les retire.",
      "Oui. Pour eux, co.id est NULL. Le INNER JOIN avec ligne_cde ne trouve rien, donc la ligne est supprimée. Utilise LEFT JOIN pour ligne_cde aussi.",
      "Non. Pas de doublon ici.",
      "Non. Le mélange est permis, mais il faut faire attention."
    ],
    retenir: "Après un LEFT JOIN, un INNER JOIN sur la table de droite peut annuler le LEFT."
  },
  {
    id: "m05-q10", dialecte: "Standard",
    q: "La table tranche a les colonnes min, max, taux. Peut-on faire commande JOIN tranche ON montant BETWEEN tranche.min AND tranche.max ?",
    choix: [
      "Non, une jointure exige un =",
      "Oui, une jointure accepte n'importe quelle condition",
      "Seulement avec CROSS JOIN",
      "Seulement sur Snowflake"
    ],
    bonne: 1,
    pourquoi: [
      "Non. L'égalité est le cas le plus courant, pas une obligation.",
      "Oui. C'est une jointure « non-équi ». Très utile pour les barèmes, tarifs, remises par tranche.",
      "Non. Un JOIN normal suffit.",
      "Non. Ça marche partout."
    ],
    retenir: "Le ON accepte toute condition : BETWEEN, <, >… Vérifie que les tranches ne se chevauchent pas."
  },
  {
    id: "m05-q11", dialecte: "Standard",
    q: "Quel est le risque de l'ancienne syntaxe FROM a, b WHERE a.id = b.a_id ?",
    choix: [
      "Elle ne marche plus sur SQL Server",
      "Si on oublie la condition dans WHERE, on obtient un produit cartésien",
      "Elle fait un LEFT JOIN caché",
      "Elle est plus lente"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Elle marche encore, pour une jointure interne.",
      "Oui. Sans la condition, chaque ligne de a est associée à chaque ligne de b. Avec JOIN … ON, l'oubli se voit tout de suite.",
      "Non. C'est un INNER JOIN.",
      "Non. Même plan d'exécution qu'un INNER JOIN."
    ],
    retenir: "Utilise toujours JOIN … ON. Plus lisible, et moins de risque d'oubli."
  },
  {
    id: "m05-q12", dialecte: "Standard",
    q: "commande RIGHT JOIN client ON … est équivalent à quoi ?",
    choixCode: true,
    choix: [
      "commande LEFT JOIN client ON …",
      "client LEFT JOIN commande ON …",
      "client INNER JOIN commande ON …",
      "commande FULL JOIN client ON …"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Ça garderait toutes les commandes, pas tous les clients.",
      "Oui. RIGHT garde toute la table de droite (client). On inverse l'ordre et on met LEFT.",
      "Non. INNER perd les clients sans commande.",
      "Non. FULL garde les deux côtés."
    ],
    retenir: "A RIGHT JOIN B = B LEFT JOIN A. Écris toujours des LEFT : plus facile à lire."
  },
  {
    id: "m05-q13", dialecte: "SQL Server + Snowflake",
    q: "Que donne JOIN commande USING (client_id) ?",
    choix: [
      "Ça marche partout",
      "Ça marche sur Snowflake, erreur sur SQL Server",
      "Ça marche sur SQL Server, erreur sur Snowflake",
      "Erreur partout"
    ],
    bonne: 1,
    pourquoi: [
      "Non. SQL Server ne connaît pas USING.",
      "Oui. USING (col) joint sur une colonne qui a le même nom des deux côtés. Snowflake l'accepte, SQL Server non.",
      "Non. C'est l'inverse.",
      "Non. Snowflake l'accepte."
    ],
    retenir: "USING : Snowflake oui, SQL Server non. ON marche partout."
  },
  {
    id: "m05-q14", dialecte: "Standard",
    q: "Ton ERP gère plusieurs sociétés (dossiers). La clé d'une commande est (societe, num_cde). Que se passe-t-il si tu joins seulement sur num_cde ?",
    choix: [
      "Rien, num_cde suffit",
      "Des lignes de la société 2 se mélangent avec celles de la société 1 : doublons et montants faux",
      "Erreur : clé incomplète",
      "Le moteur ajoute societe tout seul"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Le même numéro peut exister dans deux sociétés.",
      "Oui. La commande 1001 de la société 1 se relie aussi aux lignes de la 1001 de la société 2. Joins sur toute la clé.",
      "Non. Le moteur ne connaît pas ton intention : aucune erreur.",
      "Non. Le moteur ne devine jamais une condition."
    ],
    retenir: "Clé composée = toutes les colonnes de la clé dans le ON."
  },
  {
    id: "m05-q15", dialecte: "Standard",
    q: "Tu as 100 clients. Après client LEFT JOIN adresse, tu obtiens 130 lignes. Pourquoi ?",
    choix: [
      "Le LEFT JOIN ajoute des lignes vides",
      "Certains clients ont plusieurs adresses",
      "Il y a des clients sans adresse",
      "C'est un bug du moteur"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Un client sans adresse donne 1 ligne, pas plus.",
      "Oui. Un client avec 3 adresses donne 3 lignes. Filtre l'adresse voulue (ex. type = 'FACTURATION') dans le ON.",
      "Non. Ça ne change pas le nombre de lignes : on garde 1 ligne avec des NULL.",
      "Non. C'est le fonctionnement normal."
    ],
    retenir: "Plus de lignes après une jointure = plusieurs correspondances à droite. Vérifie l'unicité de la clé."
  },
  {
    id: "m05-q16", dialecte: "Standard",
    q: "Sans WHERE, un LEFT JOIN peut-il renvoyer MOINS de lignes que la table de gauche ?",
    choix: ["Oui", "Non", "Oui, s'il y a des NULL", "Oui, sur Snowflake"],
    bonne: 1,
    pourquoi: [
      "Non. Le LEFT JOIN garde toujours chaque ligne de gauche.",
      "Oui, il ne peut pas. Il en renvoie autant, ou plus s'il y a des correspondances multiples.",
      "Non. Les NULL ne retirent aucune ligne de gauche.",
      "Non. C'est la même règle partout."
    ],
    retenir: "LEFT JOIN seul : nombre de lignes ≥ table de gauche. Moins de lignes ? Cherche un WHERE ou un INNER JOIN."
  },
  {
    id: "m05-q17", dialecte: "Standard",
    q: "Tu veux la liste des clients qui ont au moins une commande, chacun UNE seule fois. Quelle écriture est la plus adaptée ?",
    choixCode: true,
    choix: [
      "client INNER JOIN commande ON …",
      "client WHERE EXISTS (SELECT 1 FROM commande WHERE commande.client_id = client.id)",
      "client LEFT JOIN commande ON …",
      "client CROSS JOIN commande"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Un client avec 5 commandes apparaît 5 fois.",
      "Oui. EXISTS vérifie juste qu'il y a au moins une commande. Pas de doublon. C'est une « semi-jointure ».",
      "Non. Ça garde aussi les clients sans commande, et ça crée des doublons.",
      "Non. Toutes les combinaisons."
    ],
    retenir: "« Ceux qui ont au moins un… » : EXISTS. Pas de doublons, pas besoin de DISTINCT."
  },
  {
    id: "m05-q18", dialecte: "SQL Server",
    q: "article.code est un VARCHAR, stock.code_article un INT. Que risque la jointure ON article.code = stock.code_article ?",
    choix: [
      "Rien",
      "Une erreur si un code contient une lettre, et un index qui ne sert plus",
      "Des doublons",
      "Le moteur refuse les types différents"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Il y a une conversion implicite.",
      "Oui. SQL Server convertit le VARCHAR en INT : 'A12' plante. Et la conversion empêche l'Index Seek.",
      "Non. Le type ne crée pas de doublon.",
      "Non. Il accepte, en convertissant. C'est plus piégeux."
    ],
    retenir: "Joins des colonnes du même type. Sinon : conversion, erreurs et lenteur."
  },
  {
    id: "m05-q19", dialecte: "SQL Server",
    q: "Tu joins une table de la base ERP avec une table de la base EDI. Erreur : « Cannot resolve the collation conflict ». Que faire ?",
    choixCode: true,
    choix: [
      "Changer de serveur",
      "ON a.code = b.code COLLATE French_CI_AS",
      "Utiliser un LEFT JOIN",
      "Mettre UPPER() des deux côtés"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Le problème vient des collations des deux colonnes.",
      "Oui. COLLATE force une même règle de comparaison des deux côtés. Mieux encore : aligner les collations des bases.",
      "Non. Le type de jointure ne change rien.",
      "Non. La comparaison entre collations différentes reste en conflit."
    ],
    retenir: "Conflit de collation entre bases : ajoute COLLATE dans la comparaison."
  },
  {
    id: "m05-q20", dialecte: "Standard",
    q: "Avec que des INNER JOIN, l'ordre des tables dans le FROM change-t-il le résultat ?",
    choix: [
      "Oui",
      "Non, le résultat est le même, et l'optimiseur choisit l'ordre d'exécution",
      "Oui, la 1re table doit être la plus grande",
      "Oui, sur SQL Server seulement"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Avec des INNER JOIN, l'ordre n'a pas d'effet sur le résultat.",
      "Oui. Écris dans l'ordre le plus lisible. Attention : avec des LEFT JOIN, l'ordre compte.",
      "Non. L'optimiseur réorganise lui-même.",
      "Non. C'est vrai partout."
    ],
    retenir: "INNER JOIN : ordre libre. LEFT JOIN : l'ordre compte."
  },
  {
    id: "m05-q21", dialecte: "Standard",
    q: "Pour un INNER JOIN, mettre une condition dans le ON ou dans le WHERE change-t-il le résultat ?",
    choix: [
      "Non, pour un INNER JOIN c'est équivalent",
      "Oui, toujours",
      "Oui, le WHERE est plus strict",
      "Oui, le ON ignore les filtres"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Même résultat. La différence n'existe que pour les LEFT / RIGHT / FULL JOIN.",
      "Non. Pas pour un INNER JOIN.",
      "Non. Même résultat.",
      "Non. Le ON filtre bien."
    ],
    retenir: "INNER : ON ou WHERE, même résultat. Convention : la liaison dans ON, les filtres dans WHERE."
  },
  {
    id: "m05-q22", dialecte: "SQL Server",
    q: "Sur SQL Server, tu veux pour chaque client ses 3 dernières commandes. Quel opérateur permet une sous-requête liée à chaque client ?",
    choixCode: true,
    choix: ["CROSS JOIN", "CROSS APPLY", "FULL JOIN", "UNION"],
    bonne: 1,
    pourquoi: [
      "Non. CROSS JOIN fait toutes les combinaisons, sans lien entre les tables.",
      "Oui. CROSS APPLY (SELECT TOP (3) … WHERE co.client_id = cl.id ORDER BY date DESC). Sur Snowflake : LATERAL.",
      "Non. Ça garde tout des deux côtés.",
      "Non. UNION empile des résultats."
    ],
    retenir: "CROSS APPLY = « pour chaque ligne, exécute cette sous-requête ». Snowflake : LATERAL."
  },
  {
    id: "m05-q23", dialecte: "SQL Server",
    q: "Quelle est la différence entre CROSS APPLY et OUTER APPLY ?",
    choix: [
      "Aucune",
      "OUTER APPLY garde les lignes de gauche même si la sous-requête ne renvoie rien",
      "OUTER APPLY est plus rapide",
      "CROSS APPLY fait un produit cartésien"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Elles diffèrent comme INNER et LEFT JOIN.",
      "Oui. CROSS APPLY ressemble à un INNER JOIN, OUTER APPLY à un LEFT JOIN.",
      "Non. Ce n'est pas une question de vitesse.",
      "Non. La sous-requête est liée à chaque ligne de gauche."
    ],
    retenir: "CROSS APPLY ≈ INNER. OUTER APPLY ≈ LEFT."
  },
  {
    id: "m05-q24", dialecte: "Standard",
    q: "Tu rapproches l'ERP (e) et l'EDI (d) avec un FULL OUTER JOIN. Comment afficher un numéro de commande jamais vide ?",
    choixCode: true,
    choix: ["e.num", "d.num", "COALESCE(e.num, d.num)", "e.num + d.num"],
    bonne: 2,
    pourquoi: [
      "Non. e.num est NULL pour les commandes présentes seulement dans l'EDI.",
      "Non. d.num est NULL pour les commandes présentes seulement dans l'ERP.",
      "Oui. On prend le numéro du côté où il existe.",
      "Non. Avec un NULL, le résultat est NULL. Et additionner deux numéros n'a pas de sens."
    ],
    retenir: "FULL OUTER JOIN : COALESCE(gauche.clé, droite.clé) pour une clé toujours remplie."
  },
  {
    id: "m05-q25", dialecte: "Standard",
    q: "Tu veux le CA de chaque jour du mois, même les jours sans vente (affichés à 0). Comment faire ?",
    choix: [
      "SELECT … FROM vente GROUP BY jour",
      "Partir d'une table calendrier, puis LEFT JOIN vente",
      "vente INNER JOIN calendrier",
      "C'est impossible en SQL"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Un jour sans vente n'a aucune ligne : il n'apparaît pas.",
      "Oui. Le calendrier contient tous les jours. Le LEFT JOIN les garde tous. COALESCE(SUM(…), 0) affiche 0.",
      "Non. INNER JOIN supprime les jours sans vente.",
      "Non. Une table calendrier règle le problème."
    ],
    retenir: "Montrer ce qui n'existe pas (jours, mois) : pars d'une table de référence + LEFT JOIN."
  },
  {
    id: "m05-q26", dialecte: "Standard",
    q: "Tu cherches les paires de clients en doublon (même SIRET) avec une auto-jointure. Pourquoi écrire a.id < b.id plutôt que a.id <> b.id ?",
    choix: [
      "C'est plus rapide à écrire",
      "Pour voir chaque paire une seule fois, et pas aussi dans l'autre sens",
      "<> n'est pas permis dans un ON",
      "Pour trier le résultat"
    ],
    bonne: 1,
    pourquoi: [
      "Non. La raison est logique.",
      "Oui. Avec <>, on obtient (1, 2) ET (2, 1). Avec <, seulement (1, 2).",
      "Non. <> est permis.",
      "Non. Un ON ne trie rien."
    ],
    retenir: "Doublons par auto-jointure : a.cle = b.cle AND a.id < b.id."
  },
  {
    id: "m05-q27", dialecte: "SQL Server",
    q: "Dans un plan d'exécution SQL Server, quelle jointure physique est faite pour deux grosses tables non triées ?",
    choix: ["Nested Loops", "Hash Match", "Merge Join", "Index Seek"],
    bonne: 1,
    pourquoi: [
      "Non. Nested Loops est efficace quand un côté est petit.",
      "Oui. Hash Match construit une table de hachage. Efficace pour de gros volumes sans tri ni index utile.",
      "Non. Merge Join demande deux entrées déjà triées.",
      "Non. Index Seek est une lecture, pas une jointure."
    ],
    retenir: "Petit + index : Nested Loops. Deux entrées triées : Merge. Gros et non triés : Hash."
  },
  {
    id: "m05-q28", dialecte: "Snowflake",
    q: "Dans le Query Profile de Snowflake, une jointure sort 500 millions de lignes à partir de deux tables d'1 million. Que soupçonner ?",
    choix: [
      "C'est normal",
      "Une condition de jointure manquante ou une clé non unique (jointure qui « explose »)",
      "Le warehouse est trop petit",
      "Un bug d'affichage"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Ce n'est pas normal.",
      "Oui. Snowflake appelle ça une « exploding join ». Vérifie le ON et l'unicité des clés.",
      "Non. La taille du warehouse change la vitesse, pas le nombre de lignes.",
      "Non. Le profil est fiable."
    ],
    retenir: "Plus de lignes en sortie qu'en entrée = jointure qui explose. Vérifie les clés."
  },
  {
    id: "m05-q29", dialecte: "Standard",
    q: "Tu joins client avec commande (1-N) ET avec paiement (1-N) dans la même requête, puis tu fais SUM(montant_cde) et SUM(montant_paye). Que se passe-t-il ?",
    choix: [
      "Les sommes sont justes",
      "Les sommes sont multipliées : chaque commande est répétée par paiement, et l'inverse",
      "Erreur de jointure",
      "Seules les commandes sont fausses"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Piège classique, souvent invisible dans un rapport.",
      "Oui. 3 commandes × 2 paiements = 6 lignes. Fais d'abord un GROUP BY par client dans chaque sous-requête, puis joins.",
      "Non. Pas d'erreur, juste des montants faux.",
      "Non. Les deux sommes sont fausses."
    ],
    retenir: "Deux tables filles 1-N : agrège chacune AVANT de les joindre."
  },
  {
    id: "m05-q30", dialecte: "Standard",
    q: "Une jointure avec OR est-elle permise ?",
    code: "ON a.code = b.code1\nOR a.code = b.code2",
    choix: [
      "Non, erreur de syntaxe",
      "Oui, mais elle est souvent lente",
      "Oui, et toujours aussi rapide qu'une égalité",
      "Seulement en LEFT JOIN"
    ],
    bonne: 1,
    pourquoi: [
      "Non. C'est valide.",
      "Oui. Le OR empêche souvent les jointures efficaces. Alternative : deux jointures, ou deux requêtes avec UNION.",
      "Non. Les index sont mal utilisés avec OR.",
      "Non. C'est permis partout."
    ],
    retenir: "OR dans un ON : valide mais lent. Pense à UNION ou à deux jointures."
  }
];
