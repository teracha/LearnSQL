LEARNSQL.questions.m04 = [
  {
    id: "m04-q01", dialecte: "Standard",
    q: "La table a 5 lignes. La colonne couleur vaut : 'bleu', 'bleu', 'rouge', NULL, NULL. Que renvoie cette requête ?",
    code: "SELECT COUNT(*), COUNT(couleur), COUNT(DISTINCT couleur)\nFROM produit;",
    choix: ["5, 5, 3", "5, 3, 2", "3, 3, 2", "5, 3, 3"],
    bonne: 1,
    pourquoi: [
      "Non. COUNT(colonne) ne compte pas les NULL.",
      "Oui. COUNT(*) compte les lignes (5). COUNT(couleur) ignore les NULL (3). DISTINCT garde bleu et rouge (2).",
      "Non. COUNT(*) compte toutes les lignes, même avec des NULL.",
      "Non. NULL n'est pas compté comme une valeur distincte."
    ],
    retenir: "COUNT(*) = lignes. COUNT(col) = valeurs non NULL."
  },
  {
    id: "m04-q02", dialecte: "Standard",
    q: "La colonne note contient 10, 20 et NULL. Que renvoie AVG(note) ?",
    choix: ["10", "15", "NULL", "Une erreur"],
    bonne: 1,
    pourquoi: [
      "Non. Ce serait (10 + 20 + 0) / 3 : le NULL n'est pas un zéro.",
      "Oui. AVG ignore les NULL : (10 + 20) / 2 = 15.",
      "Non. Un seul NULL ne rend pas toute la moyenne NULL.",
      "Non. C'est valide."
    ],
    retenir: "Les agrégats ignorent les NULL. Pour les compter comme 0 : AVG(COALESCE(note, 0))."
  },
  {
    id: "m04-q03", dialecte: "SQL Server",
    q: "Sur SQL Server, la colonne qte est un INT avec les valeurs 1 et 2. Que renvoie AVG(qte) ?",
    choix: ["1.5", "1", "2", "NULL"],
    bonne: 1,
    pourquoi: [
      "Non sur SQL Server. (Oui sur Snowflake.)",
      "Oui. AVG d'un INT renvoie un INT sur SQL Server. 1.5 devient 1.",
      "Non. Il n'y a pas d'arrondi au-dessus, juste une coupure.",
      "Non. Il y a des valeurs."
    ],
    retenir: "SQL Server : AVG(col * 1.0) ou AVG(CAST(col AS decimal(10,2))) pour garder les décimales."
  },
  {
    id: "m04-q04", dialecte: "SQL Server",
    q: "Que se passe-t-il sur SQL Server ?",
    code: "SELECT client_id, ville, SUM(montant)\nFROM commande\nGROUP BY client_id;",
    choix: [
      "Ça marche, la ville est prise au hasard",
      "Erreur : ville n'est ni dans GROUP BY ni dans un agrégat",
      "Ça marche, une ligne par ville",
      "SUM est ignoré"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Certains moteurs (MySQL) font ça. SQL Server et Snowflake refusent.",
      "Oui. Chaque colonne du SELECT doit être dans GROUP BY ou dans un agrégat (SUM, MAX…).",
      "Non. On groupe par client, pas par ville.",
      "Non. La requête ne s'exécute pas."
    ],
    retenir: "SELECT avec GROUP BY : chaque colonne est soit groupée, soit agrégée."
  },
  {
    id: "m04-q05", dialecte: "Standard",
    q: "Tu veux les clients dont le total des commandes dépasse 10 000 €. Où mets-tu la condition SUM(montant) > 10000 ?",
    choix: ["Dans WHERE", "Dans HAVING", "Dans GROUP BY", "Dans ORDER BY"],
    bonne: 1,
    pourquoi: [
      "Non. WHERE filtre les lignes avant le regroupement. Le SUM n'existe pas encore.",
      "Oui. HAVING filtre les groupes, après le calcul des agrégats.",
      "Non. GROUP BY définit les groupes, il ne filtre pas.",
      "Non. ORDER BY trie, il ne filtre pas."
    ],
    retenir: "WHERE filtre les lignes. HAVING filtre les groupes."
  },
  {
    id: "m04-q06", dialecte: "Standard",
    q: "Aucune commande ne correspond au filtre. Que renvoie SELECT SUM(montant) FROM commande WHERE annee = 1900; ?",
    choix: ["0", "Aucune ligne", "Une ligne avec NULL", "Une erreur"],
    bonne: 2,
    pourquoi: [
      "Non. Piège classique : SUM d'un ensemble vide n'est pas 0.",
      "Non. Sans GROUP BY, un agrégat renvoie toujours 1 ligne.",
      "Oui. Une ligne, avec NULL. Écris COALESCE(SUM(montant), 0) pour avoir 0.",
      "Non. C'est valide."
    ],
    retenir: "SUM sur rien = NULL. Pense à COALESCE(SUM(x), 0) dans les rapports."
  },
  {
    id: "m04-q07", dialecte: "Standard",
    q: "Tu fais GROUP BY region. 3 lignes ont region = NULL. Que se passe-t-il ?",
    choix: [
      "Les lignes NULL sont supprimées",
      "Chaque NULL forme son propre groupe (3 groupes)",
      "Les NULL forment un seul groupe",
      "Erreur : on ne groupe pas sur NULL"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Elles restent dans le résultat.",
      "Non. Pour GROUP BY, les NULL sont considérés comme identiques.",
      "Oui. Tous les NULL vont dans le même groupe.",
      "Non. C'est permis."
    ],
    retenir: "GROUP BY met tous les NULL ensemble dans un seul groupe."
  },
  {
    id: "m04-q08", dialecte: "Standard",
    q: "Tu veux le CA par client, sans les commandes annulées. Où est-il le plus logique de filtrer statut <> 'ANNULEE' ?",
    choix: ["Dans WHERE", "Dans HAVING", "Dans le SELECT avec un CASE", "Dans ORDER BY"],
    bonne: 0,
    pourquoi: [
      "Oui. On enlève les lignes avant de les regrouper. C'est clair et efficace.",
      "Non. HAVING agit sur les groupes. statut n'est pas une colonne du groupe.",
      "Possible, mais plus lourd. Utile seulement si tu veux aussi garder les annulées dans une autre colonne.",
      "Non. ORDER BY ne filtre pas."
    ],
    retenir: "Filtre au plus tôt : dans WHERE, avant GROUP BY."
  },
  {
    id: "m04-q09", dialecte: "Standard",
    q: "Tu veux, sur une ligne par client, le CA 2025 et le CA 2026 côte à côte. Quelle technique ?",
    choix: [
      "Deux requêtes séparées",
      "SUM(CASE WHEN annee = 2025 THEN montant ELSE 0 END), idem pour 2026",
      "GROUP BY client_id, annee",
      "WHERE annee = 2025 AND annee = 2026"
    ],
    bonne: 1,
    pourquoi: [
      "Possible, mais il faut ensuite les assembler. Pas efficace.",
      "Oui. C'est l'agrégation conditionnelle. Une seule lecture de la table, une colonne par année.",
      "Non. Ça donne une ligne par client ET par année, pas côte à côte.",
      "Non. Une ligne ne peut pas avoir 2 années en même temps : 0 ligne."
    ],
    retenir: "SUM(CASE WHEN … THEN … ELSE 0 END) : le pivot simple, portable partout."
  },
  {
    id: "m04-q10", dialecte: "SQL Server + Snowflake",
    q: "Tu veux le CA par région ET par pays, avec les sous-totaux par région et un total général. Quelle syntaxe ?",
    choixCode: true,
    choix: [
      "GROUP BY region, pays",
      "GROUP BY ROLLUP (region, pays)",
      "GROUP BY region UNION pays",
      "GROUP BY DISTINCT region, pays"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Ça donne le détail, sans sous-totaux.",
      "Oui. ROLLUP ajoute les sous-totaux par région et la ligne de total général. Ces lignes ont NULL dans les colonnes « totalisées ».",
      "Non. Ce n'est pas une syntaxe valide.",
      "Non. Ce n'est pas une syntaxe valide sur ces moteurs."
    ],
    retenir: "ROLLUP = sous-totaux + total. GROUPING() aide à les repérer."
  }
];
