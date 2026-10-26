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
  },
  {
    id: "m05-q31", dialecte: "Standard",
    q: "Tu écris seulement JOIN, sans préciser le type. De quelle jointure s'agit-il ?",
    choix: ["LEFT JOIN", "INNER JOIN", "FULL JOIN", "CROSS JOIN"],
    bonne: 1,
    pourquoi: [
      "Non. LEFT doit être écrit.",
      "Oui. JOIN seul = INNER JOIN. Écris INNER pour être clair.",
      "Non.",
      "Non."
    ],
    retenir: "JOIN = INNER JOIN."
  },
  {
    id: "m05-q32", dialecte: "Standard",
    q: "LEFT OUTER JOIN et LEFT JOIN sont-ils différents ?",
    choix: ["Oui, OUTER garde plus de lignes", "Non, c'est la même chose", "Oui, OUTER est plus rapide", "Oui, sur Snowflake"],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. OUTER est facultatif. Pareil pour RIGHT et FULL.",
      "Non.",
      "Non."
    ],
    retenir: "LEFT JOIN = LEFT OUTER JOIN."
  },
  {
    id: "m05-q33", dialecte: "Standard",
    q: "Pour chaque ligne de commande, tu veux le nom du client et le libellé de l'article. Quelles jointures ?",
    choix: [
      "ligne_cde → article seulement",
      "ligne_cde → commande → client, et ligne_cde → article",
      "client → article directement",
      "Un CROSS JOIN entre les 4 tables"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Le client est sur la commande, pas sur la ligne.",
      "Oui. On suit les clés : la ligne connaît sa commande et son article ; la commande connaît son client.",
      "Non. Il n'y a pas de lien direct client-article.",
      "Non."
    ],
    retenir: "Pour joindre, suis le chemin des clés étrangères."
  },
  {
    id: "m05-q34", dialecte: "Standard",
    q: "Que donne SELECT id FROM client cl JOIN commande co ON co.client_id = cl.id; ?",
    choix: [
      "Les id des clients",
      "Erreur : nom de colonne ambigu « id »",
      "Les id des commandes",
      "Les deux colonnes id"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Le moteur ne choisit pas pour toi.",
      "Oui. Les deux tables ont une colonne id. Préfixe : cl.id ou co.id.",
      "Non.",
      "Non."
    ],
    retenir: "Avec plusieurs tables, préfixe chaque colonne par son alias."
  },
  {
    id: "m05-q35", dialecte: "Standard",
    q: "Tu écris par erreur ON co.id = cl.id au lieu de ON co.client_id = cl.id. Que se passe-t-il ?",
    choix: [
      "Une erreur",
      "Aucune erreur, mais des associations fausses : la commande n° 5 est reliée au client n° 5",
      "Aucune ligne",
      "Le moteur corrige"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Les deux colonnes existent et ont le même type.",
      "Oui. Bug silencieux et dangereux. Relis toujours tes ON.",
      "Non. Il y aura des correspondances, mais fausses.",
      "Non."
    ],
    retenir: "Un mauvais ON ne fait pas d'erreur : il donne des résultats faux."
  },
  {
    id: "m05-q36", dialecte: "Standard",
    q: "Pour trouver les clients sans commande, tu écris LEFT JOIN … WHERE co.date_livraison IS NULL. Quel est le problème ?",
    choix: [
      "Aucun",
      "date_livraison peut être NULL même quand la commande existe : tu ramènes aussi des clients qui ont des commandes non livrées",
      "Erreur de syntaxe",
      "IS NULL ne marche pas après un LEFT JOIN"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Teste une colonne qui ne peut pas être NULL quand la ligne existe : la clé (co.id).",
      "Non.",
      "Non."
    ],
    retenir: "Anti-jointure : teste IS NULL sur la clé de droite, pas sur une colonne facultative."
  },
  {
    id: "m05-q37", dialecte: "Standard",
    q: "client LEFT JOIN commande LEFT JOIN ligne_cde : que deviennent les clients sans commande ?",
    choix: ["Ils disparaissent", "Ils restent, avec des NULL pour la commande et les lignes", "Ils apparaissent en double", "Erreur"],
    bonne: 1,
    pourquoi: [
      "Non. Que des LEFT : rien ne les retire.",
      "Oui. Une chaîne de LEFT JOIN garde la table de départ.",
      "Non.",
      "Non."
    ],
    retenir: "Chaîne de LEFT JOIN = la 1re table est toujours complète."
  },
  {
    id: "m05-q38", dialecte: "SQL Server",
    q: "Tu veux tous les clients, avec leurs commandes QUI ONT au moins une ligne. Quelle écriture garde bien tous les clients ?",
    choixCode: true,
    choix: [
      "client cl LEFT JOIN commande co ON … INNER JOIN ligne_cde li ON li.cde_id = co.id",
      "client cl LEFT JOIN (commande co INNER JOIN ligne_cde li ON li.cde_id = co.id) ON co.client_id = cl.id",
      "client cl INNER JOIN commande co ON … LEFT JOIN ligne_cde li ON …",
      "client cl CROSS JOIN commande co"
    ],
    bonne: 1,
    pourquoi: [
      "Non. L'INNER JOIN final retire les clients sans commande.",
      "Oui. Les parenthèses font d'abord la jointure interne commande-ligne, puis le LEFT JOIN depuis client. Une CTE fait la même chose, plus lisiblement.",
      "Non. Le 1er INNER JOIN retire les clients sans commande.",
      "Non."
    ],
    retenir: "Jointure interne « à l'intérieur » d'un LEFT : parenthèses ou CTE."
  },
  {
    id: "m05-q39", dialecte: "Standard",
    q: "Tu veux créer une ligne de stock à 0 pour chaque article dans chaque dépôt. Quelle jointure ?",
    choix: ["INNER JOIN", "LEFT JOIN", "CROSS JOIN article × depot", "FULL JOIN"],
    bonne: 2,
    pourquoi: [
      "Non. Il n'y a pas de clé commune.",
      "Non.",
      "Oui. Toutes les combinaisons article × dépôt.",
      "Non."
    ],
    retenir: "Générer toutes les combinaisons : CROSS JOIN."
  },
  {
    id: "m05-q40", dialecte: "Standard",
    q: "Un CROSS JOIN entre deux tables de 10 000 lignes renvoie combien de lignes ?",
    choix: ["20 000", "10 000", "100 millions", "1 million"],
    bonne: 2,
    pourquoi: [
      "Non. On multiplie, on n'additionne pas.",
      "Non.",
      "Oui. 10 000 × 10 000. Un CROSS JOIN oublié peut bloquer un serveur.",
      "Non."
    ],
    retenir: "CROSS JOIN = produit des tailles. Attention aux volumes."
  },
  {
    id: "m05-q41", dialecte: "Standard",
    q: "Tu cherches les paires d'articles achetés dans la même commande. Quelle auto-jointure ?",
    choixCode: true,
    choix: [
      "l1.cde_id = l2.cde_id",
      "l1.cde_id = l2.cde_id AND l1.article < l2.article",
      "l1.article = l2.article",
      "l1.cde_id <> l2.cde_id"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Chaque article serait associé à lui-même, et chaque paire apparaîtrait deux fois.",
      "Oui. Même commande, et article1 < article2 : chaque paire une seule fois.",
      "Non. Ça relie les ventes du même article.",
      "Non."
    ],
    retenir: "Paires uniques : même groupe + a < b."
  },
  {
    id: "m05-q42", dialecte: "Standard",
    q: "Tu joins commande et tarif ON co.date_cde BETWEEN t.debut AND t.fin. Certaines commandes apparaissent deux fois. Pourquoi ?",
    choix: [
      "BETWEEN est buggé",
      "Des périodes de tarif se chevauchent : la date tombe dans deux tarifs",
      "Les dates sont NULL",
      "Il manque DISTINCT"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Contrôle les chevauchements (début1 <= fin2 AND début2 <= fin1) dans la table des tarifs.",
      "Non. Une date NULL ne joindrait rien.",
      "Non. DISTINCT cacherait le problème."
    ],
    retenir: "Jointure sur période : les périodes ne doivent pas se chevaucher."
  },
  {
    id: "m05-q43", dialecte: "SQL Server",
    q: "Que penser de ON a.libelle LIKE '%' + m.mot_cle + '%' ?",
    choix: [
      "Interdit",
      "Permis, mais très lent sur de gros volumes : chaque ligne est comparée à chaque mot-clé",
      "Aussi rapide qu'une égalité",
      "Ça ne marche qu'en LEFT JOIN"
    ],
    bonne: 1,
    pourquoi: [
      "Non. C'est valide.",
      "Oui. Pas d'index possible. Pour du volume : précalculer une table de correspondance.",
      "Non.",
      "Non."
    ],
    retenir: "Jointure LIKE : possible, mais lente."
  },
  {
    id: "m05-q44", dialecte: "Standard",
    q: "Quel est le défaut de ON LEFT(a.code, 6) = b.code ?",
    choix: [
      "Aucun",
      "La fonction sur la colonne empêche l'utilisation de l'index sur a.code",
      "Erreur de syntaxe",
      "Ça fait un CROSS JOIN"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Même règle que dans WHERE. Mieux : stocker le code à 6 caractères dans une colonne (calculée et indexée).",
      "Non.",
      "Non."
    ],
    retenir: "Pas de fonction sur les colonnes de jointure (si possible)."
  },
  {
    id: "m05-q45", dialecte: "SQL Server + Snowflake",
    q: "Des codes ont un espace à la fin dans une table ('A1 ') et pas dans l'autre ('A1'). La jointure marche sur SQL Server. Et après migration sur Snowflake ?",
    choix: ["Elle marche aussi", "Elle ne trouve plus ces correspondances", "Erreur", "Elle double les lignes"],
    bonne: 1,
    pourquoi: [
      "Non. Snowflake compte les espaces de fin.",
      "Oui. 'A1 ' ≠ 'A1' sur Snowflake. Nettoie avec TRIM au chargement.",
      "Non.",
      "Non."
    ],
    retenir: "Migration : TRIM des clés texte, sinon jointures perdues."
  },
  {
    id: "m05-q46", dialecte: "Snowflake",
    q: "Sur Snowflake, la table A a le code 'abc12', la table B 'ABC12'. La jointure ON a.code = b.code les relie-t-elle ?",
    choix: ["Oui", "Non", "Seulement en LEFT JOIN", "Seulement avec USING"],
    bonne: 1,
    pourquoi: [
      "Non. Snowflake est sensible à la casse.",
      "Oui, elle ne les relie pas. Normalise avec UPPER au chargement (ou dans le ON, mais c'est plus lent).",
      "Non.",
      "Non."
    ],
    retenir: "Snowflake : casse différente = pas de jointure."
  },
  {
    id: "m05-q47", dialecte: "Standard",
    q: "Quelle requête donne les id des clients sans commande ?",
    choixCode: true,
    choix: [
      "SELECT id FROM client INTERSECT SELECT client_id FROM commande",
      "SELECT id FROM client EXCEPT SELECT client_id FROM commande",
      "SELECT id FROM client UNION SELECT client_id FROM commande",
      "SELECT client_id FROM commande EXCEPT SELECT id FROM client"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Ceux qui ont des commandes.",
      "Oui. Les id de client, moins ceux qui apparaissent dans commande. Pas de piège NULL.",
      "Non.",
      "Non. Ce sont les commandes orphelines (client inexistant)."
    ],
    retenir: "Anti-jointure sur des clés : EXCEPT marche aussi."
  },
  {
    id: "m05-q48", dialecte: "Standard",
    q: "client LEFT JOIN commande … WHERE co.id IS NOT NULL équivaut à quoi ?",
    choix: ["Un LEFT JOIN", "Un INNER JOIN", "Un CROSS JOIN", "Une anti-jointure"],
    bonne: 1,
    pourquoi: [
      "Non. Les clients sans commande sont retirés.",
      "Oui. On ne garde que les lignes qui ont une correspondance : c'est un INNER JOIN, en plus compliqué.",
      "Non.",
      "Non. Ce serait IS NULL."
    ],
    retenir: "LEFT JOIN + IS NOT NULL à droite = INNER JOIN."
  },
  {
    id: "m05-q49", dialecte: "Standard",
    q: "Que renvoie cette requête ?",
    code: "SELECT cl.nom, co.num_cde\nFROM client cl\nLEFT JOIN commande co\n  ON co.client_id = cl.id\n AND cl.pays = 'FR';",
    choix: [
      "Seulement les clients français",
      "TOUS les clients ; seuls les français ont leurs commandes, les autres ont NULL",
      "Une erreur",
      "Les commandes françaises seulement"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Piège : une condition sur la table de GAUCHE dans le ON ne filtre pas la gauche.",
      "Oui. Le LEFT JOIN garde toutes les lignes de gauche. Pour filtrer les clients : WHERE cl.pays = 'FR'.",
      "Non.",
      "Non."
    ],
    retenir: "LEFT JOIN : filtre de gauche dans WHERE, filtre de droite dans ON."
  },
  {
    id: "m05-q50", dialecte: "Standard",
    q: "erp FULL OUTER JOIN edi … WHERE edi.statut = 'RECU'. Que deviennent les commandes présentes seulement dans l'ERP ?",
    choix: ["Elles restent", "Elles disparaissent", "Elles sont doublées", "Erreur"],
    bonne: 1,
    pourquoi: [
      "Non. Pour elles, edi.statut est NULL : le WHERE les retire.",
      "Oui. Le FULL JOIN perd une partie de son intérêt. Mets la condition dans le ON, ou ajoute OR edi.num IS NULL.",
      "Non.",
      "Non."
    ],
    retenir: "FULL JOIN + WHERE sur un côté = lignes de l'autre côté perdues."
  },
  {
    id: "m05-q51", dialecte: "Standard",
    q: "Rapprochement ERP / EDI : tu veux les manquants ET les montants différents. Quel filtre après le FULL OUTER JOIN ?",
    choixCode: true,
    choix: [
      "WHERE e.montant <> d.montant",
      "WHERE e.num IS NULL OR d.num IS NULL OR e.montant <> d.montant",
      "WHERE e.num = d.num",
      "WHERE e.montant = d.montant"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Les manquants ont un montant NULL : <> les élimine.",
      "Oui. Manquant d'un côté, manquant de l'autre, ou écart de montant.",
      "Non. Ce sont les correspondances.",
      "Non. Ce sont les lignes identiques."
    ],
    retenir: "Rapprochement complet : manquants des deux côtés + écarts."
  },
  {
    id: "m05-q52", dialecte: "Standard",
    q: "La table libelle_article a une ligne par langue (FR, EN, DE). Comment obtenir le libellé français sans dupliquer les articles ?",
    choixCode: true,
    choix: [
      "JOIN libelle_article l ON l.article_id = a.id",
      "LEFT JOIN libelle_article l ON l.article_id = a.id AND l.langue = 'FR'",
      "JOIN libelle_article l ON l.langue = 'FR'",
      "SELECT DISTINCT …"
    ],
    bonne: 1,
    pourquoi: [
      "Non. 3 lignes par article.",
      "Oui. La langue dans le ON : une seule correspondance. LEFT pour garder les articles sans libellé FR.",
      "Non. Il manque le lien avec l'article : quasi CROSS JOIN.",
      "Non. Ça cache le problème."
    ],
    retenir: "Table de référence multi-lignes : complète la clé dans le ON."
  },
  {
    id: "m05-q53", dialecte: "Standard",
    q: "La table prix_achat garde l'historique des prix par article. Tu veux le DERNIER prix de chaque article. Quelle méthode ?",
    choix: [
      "JOIN prix_achat ON article_id",
      "Numéroter avec ROW_NUMBER() OVER (PARTITION BY article_id ORDER BY date_prix DESC) et garder 1",
      "MAX(prix)",
      "DISTINCT article_id"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Tous les prix historiques sont ramenés.",
      "Oui. Ou OUTER APPLY (SELECT TOP (1) … ORDER BY date_prix DESC) sur SQL Server.",
      "Non. Le plus haut prix, pas le dernier.",
      "Non."
    ],
    retenir: "Dernière valeur d'un historique : ROW_NUMBER ou APPLY TOP (1)."
  },
  {
    id: "m05-q54", dialecte: "SQL Server",
    q: "Que fait cette requête ?",
    code: "SELECT a.code, p.prix\nFROM article a\nOUTER APPLY (\n  SELECT TOP (1) prix\n  FROM prix_achat x\n  WHERE x.article_id = a.id\n  ORDER BY x.date_prix DESC\n) p;",
    choix: [
      "Erreur : TOP interdit dans APPLY",
      "Chaque article avec son dernier prix d'achat, ou NULL s'il n'en a pas",
      "Seulement les articles avec un prix",
      "Tous les prix de chaque article"
    ],
    bonne: 1,
    pourquoi: [
      "Non. TOP + ORDER BY dans APPLY : c'est un usage typique.",
      "Oui. OUTER APPLY garde les articles sans prix (comme un LEFT JOIN).",
      "Non. Ce serait CROSS APPLY.",
      "Non. TOP (1) n'en garde qu'un."
    ],
    retenir: "OUTER APPLY + TOP (1) + ORDER BY : la dernière valeur, ligne par ligne."
  },
  {
    id: "m05-q55", dialecte: "Snowflake",
    q: "Sur Snowflake, à quoi sert LATERAL FLATTEN(input => t.doc:lignes) dans un FROM ?",
    choix: [
      "À trier les lignes",
      "À créer une ligne par élément du tableau JSON « lignes », reliée à sa ligne d'origine",
      "À supprimer les doublons",
      "À compresser la table"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. LATERAL veut dire « pour chaque ligne de t ». FLATTEN déplie le tableau.",
      "Non.",
      "Non."
    ],
    retenir: "LATERAL FLATTEN : déplier un tableau JSON en lignes."
  },
  {
    id: "m05-q56", dialecte: "SQL Server",
    q: "Une vue fait LEFT JOIN vers une table par sa clé unique. Ta requête n'utilise aucune colonne de cette table. Que peut faire SQL Server ?",
    choix: [
      "Rien, il fait la jointure",
      "Supprimer la jointure du plan : elle ne change ni le nombre de lignes ni le résultat",
      "Une erreur",
      "Transformer en INNER JOIN"
    ],
    bonne: 1,
    pourquoi: [
      "Non. L'optimiseur est plus malin.",
      "Oui. C'est l'élimination de jointure. Pour ça, la clé de droite doit être déclarée unique (PK ou UNIQUE).",
      "Non.",
      "Non."
    ],
    retenir: "Contraintes déclarées = l'optimiseur peut simplifier."
  },
  {
    id: "m05-q57", dialecte: "Standard",
    q: "Pour joindre sur (societe, num_cde), quelle écriture est la meilleure ?",
    choixCode: true,
    choix: [
      "ON CONCAT(a.societe, '-', a.num_cde) = CONCAT(b.societe, '-', b.num_cde)",
      "ON a.societe = b.societe AND a.num_cde = b.num_cde",
      "ON a.num_cde = b.num_cde",
      "ON a.societe = b.societe"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Ça marche, mais les fonctions empêchent les index.",
      "Oui. Une égalité par colonne de la clé. Clair et rapide.",
      "Non. Mélange les sociétés.",
      "Non. Quasi produit cartésien par société."
    ],
    retenir: "Clé composée : une égalité par colonne, reliées par AND."
  },
  {
    id: "m05-q58", dialecte: "Standard",
    q: "Pourquoi éviter de joindre deux tables sur le nom du client ?",
    choix: [
      "Le texte est interdit dans un ON",
      "Homonymes, fautes de frappe, changements de nom : correspondances fausses ou manquées",
      "C'est plus lent qu'un CROSS JOIN",
      "Aucune raison"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Joins sur un identifiant stable : id, code client, SIRET.",
      "Non.",
      "Non."
    ],
    retenir: "Joins sur des identifiants, pas sur des libellés."
  },
  {
    id: "m05-q59", dialecte: "Standard",
    q: "Avant de joindre une table de référence, comment vérifier que la clé y est bien unique ?",
    choixCode: true,
    choix: [
      "SELECT COUNT(*) FROM ref",
      "SELECT cle, COUNT(*) FROM ref GROUP BY cle HAVING COUNT(*) > 1",
      "SELECT DISTINCT cle FROM ref",
      "SELECT MAX(cle) FROM ref"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Le total ne dit rien sur les doublons.",
      "Oui. Si ça renvoie des lignes, la jointure va multiplier tes données.",
      "Non. Ça cache les doublons.",
      "Non."
    ],
    retenir: "Contrôle avant jointure : GROUP BY clé HAVING COUNT(*) > 1."
  },
  {
    id: "m05-q60", dialecte: "Standard",
    q: "Des ventes ont un code client inconnu de la table client. Avec un INNER JOIN, le CA total baisse. Bonne pratique en entrepôt de données ?",
    choix: [
      "Supprimer ces ventes",
      "LEFT JOIN, et rattacher les ventes orphelines à un client « Inconnu » pour ne pas perdre de CA",
      "Ignorer le problème",
      "Utiliser CROSS JOIN"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Le CA serait faux.",
      "Oui. Le total reste juste, et les orphelins sont visibles pour être corrigés.",
      "Non.",
      "Non."
    ],
    retenir: "Ne perds jamais de faits à cause d'une jointure : membre « Inconnu »."
  },
  {
    id: "m05-q61", dialecte: "SQL Server",
    q: "date_cde est un DATETIME, calendrier.jour une DATE. Comment joindre ?",
    choixCode: true,
    choix: [
      "ON cal.jour = co.date_cde",
      "ON cal.jour = CAST(co.date_cde AS date)",
      "ON cal.jour LIKE co.date_cde",
      "ON DAY(cal.jour) = DAY(co.date_cde)"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Seules les commandes de minuit pile correspondent.",
      "Oui. On retire l'heure. (Encore mieux : stocker une colonne DATE dans la table de faits.)",
      "Non.",
      "Non. Mélange tous les mois."
    ],
    retenir: "Datetime vers calendrier : CAST(… AS date)."
  },
  {
    id: "m05-q62", dialecte: "Standard",
    q: "La dimension client garde l'historique (une ligne par version, avec debut et fin). Comment rattacher une vente à la version du client valable à la date de vente ?",
    choixCode: true,
    choix: [
      "ON d.code = f.client_code",
      "ON d.code = f.client_code AND f.date_vente >= d.debut AND f.date_vente < d.fin",
      "ON d.code = f.client_code AND d.actuel = 1",
      "ON f.date_vente = d.debut"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Une ligne par version : doublons.",
      "Oui. Le code ET la période de validité. C'est la jointure sur une dimension historisée (SCD type 2).",
      "Non. Toutes les ventes prennent la version actuelle : l'historique est perdu.",
      "Non."
    ],
    retenir: "Dimension historisée : clé + période de validité dans le ON."
  },
  {
    id: "m05-q63", dialecte: "Standard",
    q: "Tu veux, par commande, le nombre de lignes et les frais de port, sans doubler les frais. Quelle approche ?",
    choix: [
      "Joindre commande et lignes, puis SUM(frais_port) et COUNT(*)",
      "Compter les lignes dans une sous-requête (GROUP BY cde_id), puis joindre ce résultat à commande",
      "Utiliser SUM(DISTINCT frais_port)",
      "Utiliser CROSS JOIN"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Les frais sont répétés sur chaque ligne.",
      "Oui. Une ligne par commande de chaque côté : relation 1-1, pas de doublon.",
      "Non. Deux commandes avec les mêmes frais seraient comptées une fois.",
      "Non."
    ],
    retenir: "Agrège le côté « N » avant de le joindre au côté « 1 »."
  },
  {
    id: "m05-q64", dialecte: "SQL Server",
    q: "Le plan montre un Nested Loops avec, à l'intérieur, un Scan d'une table de 2 millions de lignes, exécuté 50 000 fois. Que soupçonner ?",
    choix: [
      "Tout est normal",
      "Il manque un index sur la colonne de jointure de la table intérieure",
      "Il faut ajouter DISTINCT",
      "La table est trop petite"
    ],
    bonne: 1,
    pourquoi: [
      "Non. 50 000 lectures complètes : catastrophe.",
      "Oui. Avec un index, chaque boucle ferait un Seek au lieu d'un Scan.",
      "Non.",
      "Non."
    ],
    retenir: "Nested Loops : la table intérieure doit avoir un index sur la clé de jointure."
  },
  {
    id: "m05-q65", dialecte: "SQL Server",
    q: "Sur SQL Server, une clé étrangère crée-t-elle automatiquement un index sur la colonne (ex. commande.client_id) ?",
    choix: ["Oui", "Non : il faut le créer soi-même, et c'est souvent utile pour les jointures", "Oui, un index cluster", "Seulement sur Snowflake"],
    bonne: 1,
    pourquoi: [
      "Non. Seule la clé primaire crée un index automatiquement.",
      "Oui. Index les colonnes de clés étrangères souvent jointes ou filtrées.",
      "Non.",
      "Non. Snowflake n'a pas d'index."
    ],
    retenir: "Clé étrangère ≠ index. Pense à indexer les FK."
  },
  {
    id: "m05-q66", dialecte: "Snowflake",
    q: "Sur Snowflake, une grosse jointure est lente. Quelles pistes sont adaptées ?",
    choix: [
      "Créer des index",
      "Regarder le Query Profile (débordement sur disque, explosion de lignes), filtrer tôt, ou prendre un warehouse plus grand",
      "Ajouter NOLOCK",
      "Changer de collation"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Snowflake n'a pas d'index.",
      "Oui. « Bytes spilled » = mémoire insuffisante : warehouse plus grand. Lignes explosées : vérifier les clés.",
      "Non. N'existe pas sur Snowflake.",
      "Non."
    ],
    retenir: "Snowflake lent : Query Profile d'abord."
  },
  {
    id: "m05-q67", dialecte: "SQL Server",
    q: "dbo.f_cdes_client(@id) est une fonction table. Comment l'appeler pour chaque client ?",
    choixCode: true,
    choix: [
      "client JOIN dbo.f_cdes_client(cl.id)",
      "client cl CROSS APPLY dbo.f_cdes_client(cl.id) f",
      "client cl WHERE dbo.f_cdes_client(cl.id)",
      "Impossible"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Un JOIN ne peut pas passer une colonne de gauche en paramètre.",
      "Oui. APPLY appelle la fonction pour chaque ligne de gauche. OUTER APPLY pour garder les clients sans résultat.",
      "Non.",
      "Non."
    ],
    retenir: "Fonction table avec un paramètre venant d'une ligne : APPLY."
  },
  {
    id: "m05-q68", dialecte: "Standard",
    q: "a INNER JOIN b ON 1 = 1 équivaut à quoi ?",
    choix: ["Un INNER JOIN normal", "Un CROSS JOIN", "Aucune ligne", "Une erreur"],
    bonne: 1,
    pourquoi: [
      "Non. Il n'y a pas de lien entre les tables.",
      "Oui. La condition est toujours vraie : toutes les combinaisons.",
      "Non. Ce serait 1 = 0.",
      "Non."
    ],
    retenir: "ON 1 = 1 = CROSS JOIN déguisé."
  },
  {
    id: "m05-q69", dialecte: "Standard",
    q: "Que renvoie client LEFT JOIN commande ON co.client_id = cl.id AND 1 = 0 ?",
    choix: ["Aucune ligne", "Tous les clients, avec des colonnes de commande toutes NULL", "Une erreur", "Toutes les commandes"],
    bonne: 1,
    pourquoi: [
      "Non. Le LEFT JOIN garde la gauche quoi qu'il arrive.",
      "Oui. La condition n'est jamais vraie : aucune correspondance, mais les clients restent.",
      "Non.",
      "Non."
    ],
    retenir: "LEFT JOIN : même un ON impossible garde la table de gauche."
  },
  {
    id: "m05-q70", dialecte: "SQL Server",
    q: "Une très vieille requête utilise WHERE a.id *= b.id. Que se passe-t-il sur un SQL Server récent ?",
    choix: ["Ça marche comme un LEFT JOIN", "Erreur : cette syntaxe de jointure externe n'est plus supportée", "Ça fait un INNER JOIN", "Ça multiplie"],
    bonne: 1,
    pourquoi: [
      "Non. C'était le cas il y a longtemps.",
      "Oui. *= et =* ont été supprimés. Réécris avec LEFT JOIN … ON.",
      "Non.",
      "Non."
    ],
    retenir: "*= est mort : LEFT JOIN … ON."
  },
  {
    id: "m05-q71", dialecte: "Standard",
    q: "L'ERP stocke le code client '0042', le fichier EDI '42' (texte). La jointure ne trouve rien. Pourquoi ?",
    choix: [
      "Bug",
      "En texte, '0042' ≠ '42'. Il faut normaliser le format (compléter avec des zéros, ou convertir les deux)",
      "Il faut un LEFT JOIN",
      "Il faut DISTINCT"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Choisis un format de référence et applique-le au chargement (ex. RIGHT('0000' + code, 4)).",
      "Non. Toujours aucune correspondance.",
      "Non."
    ],
    retenir: "Clés en texte : même format des deux côtés (zéros, espaces, casse)."
  },
  {
    id: "m05-q72", dialecte: "Standard",
    q: "ERP : 100 commandes. EDI : 98 commandes. 95 sont communes. Combien de lignes donne le FULL OUTER JOIN sur le numéro ?",
    choix: ["95", "98", "100", "103"],
    bonne: 3,
    pourquoi: [
      "Non. C'est l'INNER JOIN.",
      "Non.",
      "Non. C'est le LEFT JOIN depuis l'ERP.",
      "Oui. 95 communes + 5 seulement dans l'ERP + 3 seulement dans l'EDI = 103."
    ],
    retenir: "FULL = communs + uniques à gauche + uniques à droite."
  },
  {
    id: "m05-q73", dialecte: "Standard",
    q: "ERP : 100 commandes. EDI : 98 commandes. 95 sont communes. Combien manque-t-il de commandes dans l'EDI, et dans l'ERP ?",
    choix: ["5 dans l'EDI, 3 dans l'ERP", "3 dans l'EDI, 5 dans l'ERP", "2 et 2", "5 et 5"],
    bonne: 0,
    pourquoi: [
      "Oui. 100 - 95 = 5 absentes de l'EDI. 98 - 95 = 3 absentes de l'ERP.",
      "Non. C'est l'inverse.",
      "Non.",
      "Non."
    ],
    retenir: "Manquants = total d'un côté - communs."
  },
  {
    id: "m05-q74", dialecte: "Snowflake",
    q: "Sur Snowflake, JOIN ligne USING (societe, num_cde) est-il valide ?",
    choix: ["Oui, USING accepte plusieurs colonnes", "Non, une seule colonne", "Non, USING n'existe pas", "Seulement en LEFT JOIN"],
    bonne: 0,
    pourquoi: [
      "Oui. Les colonnes doivent avoir le même nom des deux côtés.",
      "Non.",
      "Non. Il existe sur Snowflake (pas sur SQL Server).",
      "Non."
    ],
    retenir: "USING (col1, col2) : jointure sur des colonnes de même nom."
  },
  {
    id: "m05-q75", dialecte: "Snowflake",
    q: "Sur Snowflake, pourquoi éviter NATURAL JOIN ?",
    choix: [
      "Il n'existe pas",
      "Il joint sur TOUTES les colonnes de même nom : une colonne commune comme date_maj fausse la jointure",
      "Il est lent",
      "Il fait un CROSS JOIN"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Il existe.",
      "Oui. Les colonnes de jointure sont implicites. Une colonne ajoutée plus tard peut tout casser.",
      "Non.",
      "Non."
    ],
    retenir: "NATURAL JOIN : à éviter. Écris toujours la condition."
  },
  {
    id: "m05-q76", dialecte: "Standard",
    q: "Ces deux écritures donnent-elles le même résultat ?",
    code: "-- A\nclient cl LEFT JOIN commande co\n  ON co.client_id = cl.id AND co.statut = 'OK'\n\n-- B\nclient cl LEFT JOIN (SELECT * FROM commande WHERE statut = 'OK') co\n  ON co.client_id = cl.id",
    choix: ["Oui", "Non, B perd les clients sans commande OK", "Non, A est une erreur", "Non, B double les lignes"],
    bonne: 0,
    pourquoi: [
      "Oui. Dans les deux cas, on filtre la table de droite avant la jointure. Tous les clients restent.",
      "Non. Le LEFT JOIN garde tous les clients.",
      "Non.",
      "Non."
    ],
    retenir: "Filtre de droite : dans le ON ou dans une sous-requête. Pas dans le WHERE."
  },
  {
    id: "m05-q77", dialecte: "SQL Server",
    q: "Comment trouver les clients sans commande depuis 6 mois ?",
    choixCode: true,
    choix: [
      "LEFT JOIN commande co ON co.client_id = cl.id WHERE co.date_cde < DATEADD(month, -6, GETDATE())",
      "LEFT JOIN commande co ON co.client_id = cl.id AND co.date_cde >= DATEADD(month, -6, GETDATE()) WHERE co.id IS NULL",
      "INNER JOIN commande … WHERE date_cde < DATEADD(month, -6, GETDATE())",
      "WHERE date_cde IS NULL"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Ça trouve les clients qui ont une VIEILLE commande, même s'ils en ont aussi des récentes.",
      "Oui. On cherche des commandes récentes dans le ON ; aucune trouvée = client inactif. (NOT EXISTS marche aussi.)",
      "Non. Même erreur.",
      "Non."
    ],
    retenir: "« Pas de X récent » : condition de période dans le ON + IS NULL."
  },
  {
    id: "m05-q78", dialecte: "Standard",
    q: "Un article peut avoir plusieurs fournisseurs, et un fournisseur plusieurs articles. Comment les relier ?",
    choix: [
      "Une colonne fournisseur_id dans article",
      "Une table de liaison article_fournisseur (article_id, fournisseur_id), et deux jointures",
      "Une colonne avec la liste des fournisseurs séparés par des virgules",
      "Un CROSS JOIN"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Un seul fournisseur possible par article.",
      "Oui. Relation plusieurs-à-plusieurs = table de liaison. Elle peut porter le prix d'achat, le délai…",
      "Non. Impossible à joindre proprement.",
      "Non. Toutes les combinaisons, même fausses."
    ],
    retenir: "Plusieurs-à-plusieurs : table de liaison."
  },
  {
    id: "m05-q79", dialecte: "Standard",
    q: "Tu veux le détail des commandes des clients dont le CA total dépasse 50 000 €. Quelle structure ?",
    choix: [
      "WHERE SUM(montant) > 50000",
      "Joindre commande à une sous-requête (client_id … GROUP BY client_id HAVING SUM(montant) > 50000)",
      "HAVING montant > 50000",
      "ORDER BY SUM(montant)"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Agrégat dans WHERE : erreur.",
      "Oui. La sous-requête donne la liste des gros clients ; la jointure ramène leurs commandes. (IN ou EXISTS aussi.)",
      "Non. Filtre chaque commande, pas le total.",
      "Non."
    ],
    retenir: "Filtrer le détail selon un total : joindre à une sous-requête agrégée."
  },
  {
    id: "m05-q80", dialecte: "Standard",
    q: "Une auto-jointure salarie → manager donne le N+1. Comment obtenir toute la chaîne (N+1, N+2, … jusqu'au PDG) ?",
    choix: [
      "Une auto-jointure suffit",
      "Une CTE récursive",
      "Un CROSS JOIN",
      "Un GROUP BY"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Une auto-jointure = un seul niveau. Il faudrait en écrire autant que de niveaux.",
      "Oui. La CTE récursive remonte tous les niveaux, quel que soit leur nombre (module 6).",
      "Non.",
      "Non."
    ],
    retenir: "Hiérarchie de profondeur variable : CTE récursive."
  },
  {
    id: "m05-q81", dialecte: "Standard",
    q: "Une commande a adresse_livraison_id et adresse_facturation_id, qui pointent toutes deux vers la table adresse. Comment afficher les deux villes ?",
    choixCode: true,
    choix: [
      "JOIN adresse a ON a.id = co.adresse_livraison_id OR a.id = co.adresse_facturation_id",
      "JOIN adresse al ON al.id = co.adresse_livraison_id JOIN adresse af ON af.id = co.adresse_facturation_id",
      "JOIN adresse a ON a.id = co.id",
      "Impossible en une requête"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Deux lignes par commande, et on ne sait plus laquelle est laquelle.",
      "Oui. Deux alias pour la même table, un par rôle. (LEFT JOIN si une adresse peut manquer.)",
      "Non.",
      "Non."
    ],
    retenir: "Même table, deux rôles : deux jointures, deux alias."
  },
  {
    id: "m05-q82", dialecte: "Standard",
    q: "Tu veux le mois de commande ET le mois de livraison via la table calendrier. Combien de jointures vers calendrier ?",
    choix: ["Une seule", "Deux, avec deux alias", "Aucune", "Une, avec OR"],
    bonne: 1,
    pourquoi: [
      "Non. Une seule ligne de calendrier ne peut pas être les deux dates à la fois.",
      "Oui. cal_cde et cal_liv : c'est une « dimension à plusieurs rôles ».",
      "Non.",
      "Non. Doublons et confusion."
    ],
    retenir: "Plusieurs dates = plusieurs jointures vers le calendrier."
  },
  {
    id: "m05-q83", dialecte: "Standard",
    q: "Certains articles n'ont pas de taux de TVA dans la table tva. Comment appliquer 20 % par défaut ?",
    choixCode: true,
    choix: [
      "INNER JOIN tva t … puis t.taux",
      "LEFT JOIN tva t … puis COALESCE(t.taux, 0.20)",
      "LEFT JOIN tva t … puis t.taux",
      "CROSS JOIN tva"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Les articles sans taux disparaissent.",
      "Oui. LEFT JOIN garde tous les articles ; COALESCE met la valeur par défaut.",
      "Non. Le taux reste NULL : calcul NULL.",
      "Non."
    ],
    retenir: "Valeur par défaut : LEFT JOIN + COALESCE."
  },
  {
    id: "m05-q84", dialecte: "Standard",
    q: "Ces deux requêtes sont-elles équivalentes ?",
    code: "-- A\nLEFT JOIN commande co ON co.client_id = cl.id AND co.statut = 'X'\n\n-- B\nLEFT JOIN commande co ON co.client_id = cl.id\nWHERE co.statut = 'X' OR co.statut IS NULL",
    choix: [
      "Oui",
      "Non : B perd les clients qui ont des commandes, mais aucune au statut X",
      "Non : A est une erreur",
      "Non : B double les lignes"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Piège classique.",
      "Oui. Dans B, ces clients ont des lignes avec un autre statut : le WHERE les retire toutes. Dans A, ils restent avec des NULL.",
      "Non.",
      "Non."
    ],
    retenir: "« OR IS NULL » dans le WHERE ne remplace pas une condition dans le ON."
  },
  {
    id: "m05-q85", dialecte: "Standard",
    q: "Pour comparer chaque relevé de stock au relevé précédent, une auto-jointure sur « la date précédente » est lente. Quelle alternative ?",
    choix: ["Un CROSS JOIN", "La fonction de fenêtrage LAG", "Un DISTINCT", "Un UNION"],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. LAG(qte) OVER (PARTITION BY article ORDER BY date) lit la ligne précédente sans jointure (module 8).",
      "Non.",
      "Non."
    ],
    retenir: "Ligne précédente / suivante : LAG / LEAD plutôt qu'une auto-jointure."
  },
  {
    id: "m05-q86", dialecte: "Standard",
    q: "Un cumul calculé par auto-jointure (a.date >= b.date, puis SUM) devient très lent quand la table grossit. Pourquoi ?",
    choix: [
      "SUM est lent",
      "Chaque ligne est jointe à toutes les précédentes : le travail croît comme n² (« jointure triangulaire »)",
      "Il manque DISTINCT",
      "Les dates sont mal indexées"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. 10 000 lignes ≈ 50 millions de combinaisons. Utilise SUM() OVER (ORDER BY … ROWS …).",
      "Non.",
      "Non. Même avec index, le volume explose."
    ],
    retenir: "Cumul : fonction de fenêtrage, pas auto-jointure triangulaire."
  },
  {
    id: "m05-q87", dialecte: "Snowflake",
    q: "Sur Snowflake, la table t a une colonne VARIANT doc contenant {\"client_id\": 42}. Comment joindre proprement à client.id (NUMBER) ?",
    choixCode: true,
    choix: [
      "ON t.doc = c.id",
      "ON t.doc:client_id::NUMBER = c.id",
      "ON t.doc.client_id = c.id",
      "ON t.client_id = c.id"
    ],
    bonne: 1,
    pourquoi: [
      "Non. doc est tout le document JSON.",
      "Oui. : pour extraire le champ, :: pour le convertir. Comparaison fiable et typée.",
      "Non. Le point sert aux noms d'objets ; pour le JSON, on utilise :.",
      "Non. Cette colonne n'existe pas."
    ],
    retenir: "Jointure sur un champ JSON : col:champ::TYPE."
  },
  {
    id: "m05-q88", dialecte: "SQL Server",
    q: "Que penser d'un indice de jointure comme INNER HASH JOIN dans une requête ?",
    choix: [
      "À mettre partout pour aller plus vite",
      "À éviter sauf cas précis : il force aussi l'ordre des jointures et empêche l'optimiseur de s'adapter",
      "Obligatoire sur les grosses tables",
      "Interdit"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Ce qui est rapide aujourd'hui peut être lent quand les volumes changent.",
      "Oui. Corrige plutôt la cause (index, statistiques, écriture de la requête).",
      "Non.",
      "Non. C'est permis."
    ],
    retenir: "Indices de jointure : dernier recours."
  },
  {
    id: "m05-q89", dialecte: "SQL Server",
    q: "Comment joindre une table de la base Divalto et une de la base Reporting, sur le même serveur SQL Server ?",
    choixCode: true,
    choix: [
      "C'est impossible",
      "Avec des noms en 3 parties : Divalto.dbo.client JOIN Reporting.dbo.ca …",
      "Avec un serveur lié obligatoire",
      "Avec USE dans la requête"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. base.schéma.table. Attention aux collations différentes entre bases.",
      "Non. Serveur lié seulement pour un AUTRE serveur.",
      "Non."
    ],
    retenir: "Même serveur, autre base : base.schéma.table."
  },
  {
    id: "m05-q90", dialecte: "SQL Server",
    q: "Une jointure vers un serveur lié (SRV.base.dbo.grosse_table) est très lente. Quelle piste ?",
    choix: [
      "Ajouter DISTINCT",
      "Filtrer côté distant avec OPENQUERY, pour ne rapatrier que les lignes utiles",
      "Ajouter un ORDER BY",
      "Utiliser CROSS JOIN"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Sinon, SQL Server peut rapatrier toute la table distante avant de joindre. Ou copier d'abord les données utiles dans une table locale.",
      "Non.",
      "Non."
    ],
    retenir: "Serveur lié : faire filtrer le serveur distant (OPENQUERY)."
  },
  {
    id: "m05-q91", dialecte: "Snowflake",
    q: "Sur Snowflake, peut-on joindre des tables de deux bases différentes du même compte ?",
    choix: ["Non", "Oui, avec les noms complets BASE.SCHEMA.TABLE", "Oui, avec un serveur lié", "Seulement par copie"],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Le stockage est partagé : pas besoin de serveur lié ni de copie.",
      "Non. Pas de serveur lié sur Snowflake.",
      "Non."
    ],
    retenir: "Snowflake : jointure entre bases = noms en 3 parties."
  },
  {
    id: "m05-q92", dialecte: "Standard",
    q: "La clé 'A' apparaît 3 fois à gauche et 2 fois à droite. Combien de lignes 'A' donne l'INNER JOIN ?",
    choix: ["2", "3", "5", "6"],
    bonne: 3,
    pourquoi: [
      "Non.",
      "Non.",
      "Non. On ne les additionne pas.",
      "Oui. Chaque ligne de gauche avec chaque ligne de droite : 3 × 2 = 6."
    ],
    retenir: "Doublons des deux côtés = multiplication."
  },
  {
    id: "m05-q93", dialecte: "Standard",
    q: "Une commande a client_id = NULL. Que devient-elle dans commande LEFT JOIN client ON cl.id = co.client_id ?",
    choix: ["Elle disparaît", "Elle reste, avec les colonnes client à NULL", "Elle est reliée à tous les clients", "Erreur"],
    bonne: 1,
    pourquoi: [
      "Non. C'est la table de gauche : elle est gardée.",
      "Oui. Pas de correspondance (NULL ne se joint jamais), mais la ligne reste.",
      "Non.",
      "Non."
    ],
    retenir: "LEFT JOIN : une clé NULL à gauche = ligne gardée, droite NULL."
  },
  {
    id: "m05-q94", dialecte: "Standard",
    q: "Tu veux les articles vendus au moins une fois en 2026, avec leur CA 2026. Quelle structure ?",
    choix: [
      "article LEFT JOIN ligne … sans filtre",
      "article INNER JOIN ligne (filtrée sur 2026) … GROUP BY article",
      "article CROSS JOIN ligne",
      "NOT EXISTS"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Garde aussi les articles jamais vendus, et toutes les années.",
      "Oui. INNER car on veut seulement les articles vendus ; GROUP BY pour le CA.",
      "Non.",
      "Non. Ce serait les articles jamais vendus."
    ],
    retenir: "Choisis le type de jointure selon la question : « au moins un » = INNER."
  },
  {
    id: "m05-q95", dialecte: "Standard",
    q: "Tu compares le stock d'hier et d'aujourd'hui, par article. Un article peut apparaître ou disparaître. Quelle requête ?",
    choixCode: true,
    choix: [
      "hier INNER JOIN auj ON article, puis auj.qte - hier.qte",
      "hier FULL OUTER JOIN auj ON article, puis COALESCE(auj.qte, 0) - COALESCE(hier.qte, 0)",
      "hier LEFT JOIN auj, puis auj.qte - hier.qte",
      "hier UNION auj"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Les nouveaux et les disparus sont perdus.",
      "Oui. FULL garde tous les articles ; COALESCE traite l'absence comme 0.",
      "Non. Les nouveaux articles sont perdus.",
      "Non. Empile sans comparer."
    ],
    retenir: "Comparer deux photos : FULL OUTER JOIN + COALESCE(…, 0)."
  },
  {
    id: "m05-q96", dialecte: "SQL Server",
    q: "Tu veux traduire des codes pays en libellés sans créer de table. Quelle écriture ?",
    choixCode: true,
    choix: [
      "JOIN (VALUES ('FR', 'France'), ('BE', 'Belgique')) AS m(code, libelle) ON m.code = cl.pays",
      "JOIN 'FR=France, BE=Belgique' ON …",
      "CASE seulement, pas de jointure possible",
      "JOIN pays_temp"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Une table en dur, jointe comme une vraie table. (Un CASE marche aussi pour quelques valeurs.)",
      "Non.",
      "Non. VALUES permet la jointure.",
      "Non. Cette table n'existe pas."
    ],
    retenir: "Petite correspondance ponctuelle : JOIN (VALUES …)."
  },
  {
    id: "m05-q97", dialecte: "SQL Server",
    q: "Une colonne contient 'A1;B2;C3' (codes séparés). Comment joindre chaque code à la table article ?",
    choixCode: true,
    choix: [
      "JOIN article a ON a.code = t.codes",
      "CROSS APPLY STRING_SPLIT(t.codes, ';') s JOIN article a ON a.code = s.value",
      "JOIN article a ON t.codes LIKE a.code",
      "Impossible"
    ],
    bonne: 1,
    pourquoi: [
      "Non. 'A1;B2;C3' n'est pas un code.",
      "Oui. On découpe en lignes, puis on joint chaque morceau. (Mieux : ne pas stocker de listes dans une colonne.)",
      "Non. Sans %, ce LIKE est une égalité.",
      "Non."
    ],
    retenir: "Liste dans une colonne : STRING_SPLIT + jointure. Et corrige le modèle si possible."
  },
  {
    id: "m05-q98", dialecte: "SQL Server",
    q: "Le plan d'exécution affiche l'avertissement « No Join Predicate ». Que veut-il dire ?",
    choix: [
      "Tout va bien",
      "Une jointure n'a pas de condition : produit cartésien probable",
      "Il manque un index",
      "La requête est trop longue"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Souvent un ON oublié ou mal écrit. Vérifie chaque jointure.",
      "Non. C'est un autre avertissement.",
      "Non."
    ],
    retenir: "« No Join Predicate » = CROSS JOIN probablement involontaire."
  },
  {
    id: "m05-q99", dialecte: "Standard",
    q: "Barème de remise : 0-999 et 1000-4999. Une commande fait 999,50 €. Elle disparaît avec INNER JOIN tranche ON montant BETWEEN mini AND maxi. Pourquoi ?",
    choix: [
      "Bug",
      "999,50 tombe entre 999 et 1000 : aucune tranche ne le contient (trou dans le barème)",
      "Le montant est NULL",
      "Il faut un FULL JOIN"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Définis les tranches sans trou : mini <= montant AND montant < mini_suivant. Et utilise LEFT JOIN pour voir les oubliés.",
      "Non.",
      "Non."
    ],
    retenir: "Tranches : bornes [mini ; maxi[ sans trou ni chevauchement."
  },
  {
    id: "m05-q100", dialecte: "Standard",
    q: "Quelle méthode est la plus sûre pour écrire une requête avec beaucoup de jointures ?",
    choix: [
      "Tout écrire d'un coup puis exécuter",
      "Partir de la table qui a le grain voulu, ajouter les jointures une par une, et vérifier le nombre de lignes à chaque étape",
      "Mettre DISTINCT dès le début",
      "Utiliser seulement des INNER JOIN"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Impossible de savoir quelle jointure a créé un problème.",
      "Oui. Si le nombre de lignes change sans raison, la dernière jointure ajoutée est fautive.",
      "Non. DISTINCT cache les problèmes.",
      "Non. On perdrait des lignes sans s'en rendre compte."
    ],
    retenir: "Une jointure à la fois, et un COUNT(*) à chaque étape."
  }
];
