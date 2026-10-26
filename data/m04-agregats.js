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
  },
  {
    id: "m04-q11", dialecte: "Standard",
    q: "La colonne ville contient 'Lyon', 'Bordeaux' et 'Paris'. Que renvoie MAX(ville) ?",
    choix: ["'Bordeaux'", "'Lyon'", "'Paris'", "Une erreur : MAX ne marche que sur des nombres"],
    bonne: 2,
    pourquoi: [
      "Non. 'Bordeaux' est le MIN (premier dans l'ordre alphabétique).",
      "Non. 'Lyon' est au milieu.",
      "Oui. Sur du texte, MAX prend la dernière valeur dans l'ordre alphabétique.",
      "Non. MIN et MAX marchent aussi sur le texte et les dates."
    ],
    retenir: "MIN / MAX marchent sur nombres, textes (ordre alphabétique) et dates."
  },
  {
    id: "m04-q12", dialecte: "SQL Server",
    q: "Sur SQL Server, tu veux la liste des codes articles de chaque commande, séparés par des virgules. Quelle fonction ?",
    choixCode: true,
    choix: ["CONCAT(code)", "STRING_AGG(code, ', ')", "GROUP_CONCAT(code)", "SUM(code)"],
    bonne: 1,
    pourquoi: [
      "Non. CONCAT colle des valeurs d'une même ligne, pas de plusieurs lignes.",
      "Oui. STRING_AGG est un agrégat de texte (SQL Server 2017+). Sur Snowflake : LISTAGG.",
      "Non. C'est la syntaxe de MySQL.",
      "Non. On ne fait pas la somme d'un texte."
    ],
    retenir: "Concaténer des lignes : STRING_AGG (SQL Server) / LISTAGG (Snowflake)."
  },
  {
    id: "m04-q13", dialecte: "SQL Server + Snowflake",
    q: "Que se passe-t-il ?",
    code: "SELECT YEAR(date_cde) AS annee, SUM(montant)\nFROM commande\nGROUP BY annee;",
    choix: [
      "Ça marche partout",
      "Erreur sur SQL Server (alias inconnu dans GROUP BY), mais ça marche sur Snowflake",
      "Erreur partout",
      "Ça marche sur SQL Server, erreur sur Snowflake"
    ],
    bonne: 1,
    pourquoi: [
      "Non. SQL Server traite GROUP BY avant SELECT.",
      "Oui. Sur SQL Server, répète l'expression : GROUP BY YEAR(date_cde). Snowflake accepte l'alias.",
      "Non. Snowflake l'accepte.",
      "Non. C'est l'inverse."
    ],
    retenir: "SQL Server : GROUP BY avec l'expression complète, pas l'alias."
  },
  {
    id: "m04-q14", dialecte: "Standard",
    q: "Tu comptes les commandes par client, y compris ceux qui n'en ont aucune. Un client sans commande obtient quel nombre ?",
    code: "SELECT cl.nom, COUNT(*)\nFROM client cl\nLEFT JOIN commande co ON co.client_id = cl.id\nGROUP BY cl.nom;",
    choix: ["0", "1", "NULL", "Il n'apparaît pas"],
    bonne: 1,
    pourquoi: [
      "Non. C'est ce qu'on voudrait. Il faut alors écrire COUNT(co.id).",
      "Oui. Le LEFT JOIN crée 1 ligne (avec des NULL à droite). COUNT(*) compte cette ligne. Écris COUNT(co.id).",
      "Non. COUNT ne renvoie jamais NULL.",
      "Non. Le LEFT JOIN le garde."
    ],
    retenir: "Après un LEFT JOIN, compte une colonne de droite : COUNT(co.id), pas COUNT(*)."
  },
  {
    id: "m04-q15", dialecte: "Standard",
    q: "Deux commandes valent 100 € chacune. Que renvoie SUM(DISTINCT montant) ?",
    choix: ["200", "100", "2", "NULL"],
    bonne: 1,
    pourquoi: [
      "Non. DISTINCT supprime les montants en double avant la somme.",
      "Oui. Il ne reste qu'une valeur 100. Ce résultat est presque toujours faux en gestion.",
      "Non. On fait une somme, pas un comptage.",
      "Non. Il y a des valeurs."
    ],
    retenir: "SUM(DISTINCT …) est rarement correct. Pour corriger des doublons, cherche d'où ils viennent."
  },
  {
    id: "m04-q16", dialecte: "Standard",
    q: "Région A : 2 commandes, moyenne 100 €. Région B : 8 commandes, moyenne 50 €. Quel est le panier moyen global ?",
    choix: ["75 €", "60 €", "150 €", "50 €"],
    bonne: 1,
    pourquoi: [
      "Non. (100 + 50) / 2 = 75 : c'est la moyenne des moyennes. Elle ne tient pas compte du nombre de commandes.",
      "Oui. Total : 2 × 100 + 8 × 50 = 600 €, pour 10 commandes. 600 / 10 = 60 €.",
      "Non. 150 est la somme des deux moyennes.",
      "Non. La région A tire la moyenne vers le haut."
    ],
    retenir: "Ne fais pas la moyenne de moyennes. Recalcule : somme totale / nombre total."
  },
  {
    id: "m04-q17", dialecte: "SQL Server + Snowflake",
    q: "Tu veux, dans une seule requête, le CA par région ET, séparément, le CA par année. Sans les combinaisons région × année. Quelle syntaxe ?",
    choixCode: true,
    choix: [
      "GROUP BY region, annee",
      "GROUP BY GROUPING SETS ((region), (annee))",
      "GROUP BY ROLLUP (region, annee)",
      "GROUP BY region OR annee"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Ça donne les combinaisons région × année.",
      "Oui. GROUPING SETS calcule chaque regroupement demandé, et seulement ceux-là.",
      "Non. ROLLUP donne région × année, puis les sous-totaux par région, puis le total.",
      "Non. Ce n'est pas une syntaxe valide."
    ],
    retenir: "GROUPING SETS = plusieurs GROUP BY en une seule requête. ROLLUP et CUBE en sont des raccourcis."
  },
  {
    id: "m04-q18", dialecte: "SQL Server + Snowflake",
    q: "Après un ROLLUP, une ligne a region = NULL. Comment savoir si c'est le total général, ou une vraie région NULL ?",
    choixCode: true,
    choix: ["region IS NULL", "GROUPING(region) = 1", "COUNT(region) = 0", "On ne peut pas savoir"],
    bonne: 1,
    pourquoi: [
      "Non. Les deux cas ont region à NULL.",
      "Oui. GROUPING renvoie 1 si la ligne est un sous-total ou un total sur cette colonne.",
      "Non. Ça ne distingue pas les deux cas.",
      "Non. GROUPING est fait pour ça."
    ],
    retenir: "GROUPING(col) = 1 : ligne de total. Pratique pour afficher « Total »."
  },
  {
    id: "m04-q19", dialecte: "Standard",
    q: "Tu veux garder chaque ligne de commande, avec le total de sa commande à côté. Quelle technique ?",
    choixCode: true,
    choix: [
      "GROUP BY cde_id",
      "SUM(montant) OVER (PARTITION BY cde_id)",
      "SUM(montant) avec HAVING",
      "DISTINCT cde_id"
    ],
    bonne: 1,
    pourquoi: [
      "Non. GROUP BY fusionne les lignes : tu perds le détail.",
      "Oui. Fonction de fenêtrage : le total est calculé, mais chaque ligne est gardée. On la verra au module 8.",
      "Non. HAVING filtre les groupes, il ne garde pas le détail.",
      "Non. Ça supprime les doublons, sans calculer de total."
    ],
    retenir: "GROUP BY réduit les lignes. OVER (PARTITION BY …) garde les lignes."
  },
  {
    id: "m04-q20", dialecte: "Standard",
    q: "Tu soupçonnes des factures reçues en double par EDI. Comment trouver les numéros en double ?",
    choixCode: true,
    choix: [
      "SELECT DISTINCT num_facture FROM facture",
      "SELECT num_facture FROM facture GROUP BY num_facture HAVING COUNT(*) > 1",
      "SELECT num_facture FROM facture WHERE COUNT(*) > 1",
      "SELECT COUNT(DISTINCT num_facture) FROM facture"
    ],
    bonne: 1,
    pourquoi: [
      "Non. DISTINCT cache les doublons au lieu de les montrer.",
      "Oui. On groupe par numéro et on garde ceux qui apparaissent plus d'une fois.",
      "Non. On ne peut pas mettre d'agrégat dans WHERE : erreur.",
      "Non. Ça donne juste un nombre total."
    ],
    retenir: "Trouver des doublons : GROUP BY clé HAVING COUNT(*) > 1."
  },
  {
    id: "m04-q21", dialecte: "Standard",
    q: "Tu veux la ligne complète de la DERNIÈRE commande de chaque client (date, montant, statut). Quelle approche ?",
    choix: [
      "GROUP BY client_id avec MAX(date_cde) et MAX(montant)",
      "ROW_NUMBER() OVER (PARTITION BY client_id ORDER BY date_cde DESC), puis garder le n° 1",
      "SELECT TOP (1) … ORDER BY date_cde DESC",
      "DISTINCT client_id"
    ],
    bonne: 1,
    pourquoi: [
      "Non. MAX(montant) donne le plus gros montant du client, pas celui de sa dernière commande. Les valeurs sont mélangées.",
      "Oui. On numérote les commandes de chaque client, de la plus récente à la plus ancienne. On garde la n° 1.",
      "Non. Ça donne la dernière commande de toute la table, pas une par client.",
      "Non. Tu perds toutes les autres colonnes."
    ],
    retenir: "« La dernière X de chaque Y » : ROW_NUMBER() OVER (PARTITION BY Y ORDER BY … DESC) = 1."
  },
  {
    id: "m04-q22", dialecte: "Standard",
    q: "Sur 10 lignes, 3 ont le statut 'LIVRE'. Que renvoie cette expression ?",
    code: "COUNT(CASE WHEN statut = 'LIVRE' THEN 1 ELSE 0 END)",
    choix: ["3", "10", "7", "0"],
    bonne: 1,
    pourquoi: [
      "Non. Piège : COUNT compte aussi les 0, car 0 n'est pas NULL.",
      "Oui. COUNT compte toutes les valeurs non NULL : les 1 et les 0. Enlève le ELSE 0, ou utilise SUM.",
      "Non. On ne compte pas les « non livrés » ici.",
      "Non."
    ],
    retenir: "Compter selon une condition : COUNT(CASE … THEN 1 END) sans ELSE, ou SUM(CASE … THEN 1 ELSE 0 END)."
  },
  {
    id: "m04-q23", dialecte: "Snowflake",
    q: "Sur Snowflake, quelle fonction compte directement les lignes qui vérifient une condition ?",
    choixCode: true,
    choix: ["COUNT_IF(statut = 'LIVRE')", "COUNTIF(statut, 'LIVRE')", "COUNT(statut = 'LIVRE')", "SUMIF(statut = 'LIVRE')"],
    bonne: 0,
    pourquoi: [
      "Oui. COUNT_IF existe sur Snowflake. Pas sur SQL Server.",
      "Non. C'est la syntaxe d'Excel.",
      "Non. COUNT compterait toutes les lignes où le test n'est pas NULL, vrai ou faux.",
      "Non. SUMIF n'existe pas."
    ],
    retenir: "Snowflake : COUNT_IF(condition). SQL Server : SUM(CASE WHEN … THEN 1 ELSE 0 END)."
  },
  {
    id: "m04-q24", dialecte: "SQL Server",
    q: "Sur SQL Server, SUM sur une colonne INT de plusieurs milliards au total renvoie une erreur. Pourquoi ?",
    choix: [
      "SUM est limité à 1 million de lignes",
      "SUM d'un INT renvoie un INT : dépassement au-delà d'environ 2,1 milliards",
      "Il y a des NULL",
      "Il faut un GROUP BY"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Il n'y a pas de limite de lignes.",
      "Oui. Erreur « Arithmetic overflow ». Solution : SUM(CAST(col AS bigint)).",
      "Non. SUM ignore les NULL.",
      "Non. SUM marche sans GROUP BY."
    ],
    retenir: "Grosses sommes sur un INT : SUM(CAST(col AS bigint))."
  },
  {
    id: "m04-q25", dialecte: "Standard",
    q: "Ces deux requêtes donnent-elles le même résultat ?",
    code: "SELECT DISTINCT pays FROM client;\n\nSELECT pays FROM client GROUP BY pays;",
    choix: ["Oui", "Non, GROUP BY renvoie plus de lignes", "Non, DISTINCT trie le résultat", "Non, la 2e est une erreur"],
    bonne: 0,
    pourquoi: [
      "Oui. Même liste de pays sans doublon. Utilise DISTINCT pour dédoublonner, GROUP BY pour calculer.",
      "Non. Une ligne par pays dans les deux cas.",
      "Non. Aucun des deux ne garantit un ordre sans ORDER BY.",
      "Non. Un GROUP BY sans agrégat est valide."
    ],
    retenir: "DISTINCT = GROUP BY sans calcul. Choisis selon l'intention, pour la lisibilité."
  },
  {
    id: "m04-q26", dialecte: "Snowflake",
    q: "Sur Snowflake, quelle fonction donne la médiane des montants ?",
    choixCode: true,
    choix: ["AVG(montant)", "MEDIAN(montant)", "MID(montant)", "MODE(montant)"],
    bonne: 1,
    pourquoi: [
      "Non. AVG est la moyenne, pas la médiane. Les très grosses commandes la tirent vers le haut.",
      "Oui. MEDIAN existe sur Snowflake. Sur SQL Server : PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY montant) OVER ().",
      "Non. MID découpe du texte (dans d'autres outils).",
      "Non. MODE donne la valeur la plus fréquente."
    ],
    retenir: "Médiane : MEDIAN (Snowflake), PERCENTILE_CONT(0.5) (SQL Server). Plus robuste que la moyenne."
  },
  {
    id: "m04-q27", dialecte: "Standard",
    q: "COUNT(1) est-il plus rapide que COUNT(*) ?",
    choix: [
      "Oui, toujours",
      "Non, les moteurs les traitent de la même façon",
      "Oui, sur SQL Server seulement",
      "Non, COUNT(1) est plus lent"
    ],
    bonne: 1,
    pourquoi: [
      "Non. C'est un mythe très répandu.",
      "Oui, c'est un mythe. Les deux comptent les lignes, avec le même plan d'exécution.",
      "Non. Même plan d'exécution.",
      "Non. Aucune différence."
    ],
    retenir: "COUNT(*) = COUNT(1). COUNT(*) est le plus clair."
  },
  {
    id: "m04-q28", dialecte: "Standard",
    q: "La colonne contient NULL, 5 et 3. Que renvoie MAX(col) ?",
    choix: ["NULL", "5", "3", "8"],
    bonne: 1,
    pourquoi: [
      "Non. Les agrégats ignorent les NULL.",
      "Oui. On ignore NULL, puis on prend la plus grande valeur.",
      "Non. 3 est le MIN.",
      "Non. 8, c'est la somme."
    ],
    retenir: "MIN, MAX, SUM et AVG ignorent les NULL."
  },
  {
    id: "m04-q29", dialecte: "Standard",
    q: "Peut-on trier par un agrégat, sans alias ?",
    code: "SELECT client_id, SUM(montant)\nFROM commande\nGROUP BY client_id\nORDER BY SUM(montant) DESC;",
    choix: ["Oui", "Non, il faut un alias", "Non, ORDER BY n'accepte pas d'agrégat", "Seulement avec HAVING"],
    bonne: 0,
    pourquoi: [
      "Oui. ORDER BY passe après le calcul des agrégats. Un alias rendrait la requête plus lisible.",
      "Non. L'alias est conseillé, pas obligatoire.",
      "Non. C'est permis.",
      "Non. HAVING n'a rien à voir avec le tri."
    ],
    retenir: "ORDER BY peut trier sur un agrégat ou sur son alias."
  },
  {
    id: "m04-q30", dialecte: "SQL Server + Snowflake",
    q: "Tu veux estimer le nombre de clients distincts sur 2 milliards de lignes. Une valeur approchée suffit. Quelle fonction est la plus rapide ?",
    choixCode: true,
    choix: ["COUNT(DISTINCT client_id)", "APPROX_COUNT_DISTINCT(client_id)", "COUNT(*)", "SUM(DISTINCT client_id)"],
    bonne: 1,
    pourquoi: [
      "Non. Le résultat est exact, mais lent et gourmand en mémoire sur de gros volumes.",
      "Oui. Estimation très proche (environ 2 % d'erreur), beaucoup plus rapide. Disponible sur Snowflake et SQL Server 2019+.",
      "Non. Ça compte les lignes, pas les clients.",
      "Non. Ça n'a pas de sens."
    ],
    retenir: "Gros volumes + valeur approchée acceptable : APPROX_COUNT_DISTINCT."
  }
];
