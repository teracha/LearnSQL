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
  }
];
