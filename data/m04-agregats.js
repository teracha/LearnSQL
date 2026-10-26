LEARNSQL.questions.m04 = [
  {
    id: "m04-q01", dialecte: "Standard",
    q: "La table a 5 lignes. La colonne couleur vaut : 'bleu', 'bleu', 'rouge', NULL, NULL. Que renvoie cette requête ?",
    code: "SELECT COUNT(*), COUNT(couleur), COUNT(DISTINCT couleur)\nFROM produit;",
    choix: [
      "5, 5, 3",
      "5, 3, 2",
      "3, 3, 2",
      "5, 3, 3"
    ],
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
    choix: [
      "10",
      "15",
      "NULL",
      "Une erreur"
    ],
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
    choix: [
      "1.5",
      "1",
      "2",
      "NULL"
    ],
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
    choix: [
      "Dans WHERE",
      "Dans HAVING",
      "Dans GROUP BY",
      "Dans ORDER BY"
    ],
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
    choix: [
      "0",
      "Aucune ligne",
      "Une ligne avec NULL",
      "Une erreur"
    ],
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
    choix: [
      "Dans WHERE",
      "Dans HAVING",
      "Dans le SELECT avec un CASE",
      "Dans ORDER BY"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. On enlève les lignes avant de les regrouper. C'est clair et efficace.",
      "Non. HAVING agit sur les groupes. statut n'est pas une colonne du groupe.",
      "Non. Possible, mais plus lourd. Utile seulement si tu veux aussi garder les annulées dans une autre colonne.",
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
      "Non. Possible, mais il faut ensuite les assembler. Pas efficace.",
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
    choix: [
      "'Bordeaux'",
      "'Lyon'",
      "'Paris'",
      "Une erreur : MAX ne marche que sur des nombres"
    ],
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
    choix: [
      "CONCAT(code)",
      "STRING_AGG(code, ', ')",
      "GROUP_CONCAT(code)",
      "SUM(code)"
    ],
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
    choix: [
      "0",
      "1",
      "NULL",
      "Il n'apparaît pas"
    ],
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
    choix: [
      "200",
      "100",
      "2",
      "NULL"
    ],
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
    choix: [
      "75 €",
      "60 €",
      "150 €",
      "50 €"
    ],
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
    choix: [
      "region IS NULL",
      "GROUPING(region) = 1",
      "COUNT(region) = 0",
      "On ne peut pas savoir"
    ],
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
    choix: [
      "3",
      "10",
      "7",
      "0"
    ],
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
    choix: [
      "COUNT_IF(statut = 'LIVRE')",
      "COUNTIF(statut, 'LIVRE')",
      "COUNT(statut = 'LIVRE')",
      "SUMIF(statut = 'LIVRE')"
    ],
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
    choix: [
      "Oui",
      "Non, GROUP BY renvoie plus de lignes",
      "Non, DISTINCT trie le résultat",
      "Non, la 2e est une erreur"
    ],
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
    choix: [
      "AVG(montant)",
      "MEDIAN(montant)",
      "MID(montant)",
      "MODE(montant)"
    ],
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
    choix: [
      "NULL",
      "5",
      "3",
      "8"
    ],
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
    choix: [
      "Oui",
      "Non, il faut un alias",
      "Non, ORDER BY n'accepte pas d'agrégat",
      "Seulement avec HAVING"
    ],
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
    choix: [
      "COUNT(DISTINCT client_id)",
      "APPROX_COUNT_DISTINCT(client_id)",
      "COUNT(*)",
      "SUM(DISTINCT client_id)"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Le résultat est exact, mais lent et gourmand en mémoire sur de gros volumes.",
      "Oui. Estimation très proche (environ 2 % d'erreur), beaucoup plus rapide. Disponible sur Snowflake et SQL Server 2019+.",
      "Non. Ça compte les lignes, pas les clients.",
      "Non. Ça n'a pas de sens."
    ],
    retenir: "Gros volumes + valeur approchée acceptable : APPROX_COUNT_DISTINCT."
  },
  {
    id: "m04-q31", dialecte: "Standard",
    q: "La table est vide. Que renvoie SELECT COUNT(*) FROM commande; ?",
    choix: [
      "Aucune ligne",
      "Une ligne avec 0",
      "Une ligne avec NULL",
      "Une erreur"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Sans GROUP BY, un agrégat renvoie toujours une ligne.",
      "Oui. COUNT ne renvoie jamais NULL : 0 s'il n'y a rien.",
      "Non. C'est SUM, MAX, AVG… qui renvoient NULL sur du vide.",
      "Non."
    ],
    retenir: "COUNT sur du vide = 0. Les autres agrégats = NULL."
  },
  {
    id: "m04-q32", dialecte: "Standard",
    q: "Aucune commande en 2030. Que renvoie SELECT MAX(date_cde) FROM commande WHERE annee = 2030; ?",
    choix: [
      "Aucune ligne",
      "Une ligne avec NULL",
      "Une ligne avec 0",
      "La date du jour"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Sans GROUP BY, toujours une ligne.",
      "Oui. Maximum de rien = inconnu = NULL.",
      "Non.",
      "Non."
    ],
    retenir: "MIN / MAX / SUM / AVG sur du vide = NULL."
  },
  {
    id: "m04-q33", dialecte: "Standard",
    q: "Que renvoie SELECT pays, COUNT(*) FROM client WHERE 1 = 0 GROUP BY pays; ?",
    choix: [
      "Une ligne avec 0",
      "Aucune ligne",
      "Une ligne par pays avec 0",
      "Une erreur"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Avec GROUP BY, il faut au moins une ligne pour former un groupe.",
      "Oui. Pas de lignes = pas de groupes = pas de résultat. Différent du cas sans GROUP BY !",
      "Non. Le moteur ne connaît pas les pays sans lignes.",
      "Non."
    ],
    retenir: "Sans GROUP BY : toujours 1 ligne. Avec GROUP BY : 0 ligne si rien."
  },
  {
    id: "m04-q34", dialecte: "Standard",
    q: "SELECT COUNT(*) FROM commande HAVING COUNT(*) > 1000; (sans GROUP BY) est-il valide ?",
    choix: [
      "Non, HAVING exige GROUP BY",
      "Oui : toute la table forme un seul groupe. Une ligne si plus de 1000 commandes, sinon aucune",
      "Oui, mais HAVING est ignoré",
      "Seulement sur Snowflake"
    ],
    bonne: 1,
    pourquoi: [
      "Non. C'est permis.",
      "Oui. Utile pour un contrôle : « renvoie quelque chose seulement si le seuil est dépassé ».",
      "Non. HAVING filtre bien.",
      "Non. Valide partout."
    ],
    retenir: "HAVING sans GROUP BY : la table entière est un seul groupe."
  },
  {
    id: "m04-q35", dialecte: "Standard",
    q: "La colonne contient 'A', 'A', NULL, 'B'. Que renvoie COUNT(DISTINCT col) ?",
    choix: [
      "2",
      "3",
      "4",
      "1"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. A et B. Les NULL ne sont jamais comptés par COUNT(col).",
      "Non. NULL n'est pas compté.",
      "Non.",
      "Non."
    ],
    retenir: "COUNT(DISTINCT col) ignore les NULL."
  },
  {
    id: "m04-q36", dialecte: "Standard",
    q: "Les notes de satisfaction sont 4, 2 et NULL (non répondu). Tu veux compter les non-réponses comme 0. Quelle expression ?",
    choixCode: true,
    choix: [
      "AVG(note)",
      "AVG(COALESCE(note, 0))",
      "SUM(note) / 2",
      "AVG(note) * 3"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Donne 3 : le NULL est ignoré.",
      "Oui. (4 + 2 + 0) / 3 = 2. Choix métier : est-ce vraiment un 0 ?",
      "Non.",
      "Non."
    ],
    retenir: "AVG ignore les NULL. COALESCE si l'absence doit compter."
  },
  {
    id: "m04-q37", dialecte: "Standard",
    q: "Toutes les remises d'un client sont NULL. Que renvoie SUM(remise) pour ce client ?",
    choix: [
      "0",
      "NULL",
      "Une erreur",
      "Le nombre de lignes"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Somme de valeurs toutes inconnues = NULL.",
      "Oui. Dans un rapport, écris COALESCE(SUM(remise), 0).",
      "Non.",
      "Non."
    ],
    retenir: "SUM de NULL uniquement = NULL."
  },
  {
    id: "m04-q38", dialecte: "Standard",
    q: "Ligne 1 : ht = 10, port = NULL. Ligne 2 : ht = 5, port = 5. Que valent SUM(ht + port) et SUM(ht) + SUM(port) ?",
    choix: [
      "20 et 20",
      "10 et 20",
      "NULL et 20",
      "20 et NULL"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Le NULL change le premier calcul.",
      "Oui. Ligne 1 : 10 + NULL = NULL, ignoré par SUM. Il reste 10. Deuxième : 15 + 5 = 20.",
      "Non. SUM ignore la ligne NULL, il ne renvoie pas NULL.",
      "Non."
    ],
    retenir: "Additionner avant ou après SUM change le résultat s'il y a des NULL."
  },
  {
    id: "m04-q39", dialecte: "Standard",
    q: "Comment calculer le taux de marge global d'une famille d'articles ?",
    choixCode: true,
    choix: [
      "AVG(marge / ca)",
      "SUM(marge) / NULLIF(SUM(ca), 0)",
      "SUM(marge / ca)",
      "MAX(marge) / MAX(ca)"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Moyenne des taux : un petit article à 80 % pèse autant qu'un gros à 10 %.",
      "Oui. Total des marges / total du CA. NULLIF évite la division par zéro.",
      "Non. Additionner des taux n'a pas de sens.",
      "Non."
    ],
    retenir: "Un taux global = somme / somme. Jamais la moyenne des taux."
  },
  {
    id: "m04-q40", dialecte: "Standard",
    q: "GROUP BY pays, ville et GROUP BY ville, pays donnent-ils les mêmes groupes ?",
    choix: [
      "Oui",
      "Non",
      "Seulement sans NULL",
      "Seulement sur SQL Server"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Les groupes sont les mêmes. Seul l'ordre d'affichage peut changer (et il n'est pas garanti sans ORDER BY).",
      "Non.",
      "Non.",
      "Non."
    ],
    retenir: "L'ordre des colonnes dans GROUP BY ne change pas les groupes."
  },
  {
    id: "m04-q41", dialecte: "Standard",
    q: "Le résultat d'un GROUP BY client_id est-il trié par client_id ?",
    choix: [
      "Oui, toujours",
      "Non, pas garanti",
      "Oui, sur SQL Server",
      "Oui, si client_id est indexé"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Souvent c'est le cas par hasard, mais rien ne le garantit.",
      "Oui. Le moteur peut grouper par hachage : l'ordre est alors quelconque. Ajoute ORDER BY.",
      "Non.",
      "Non. Pas de garantie non plus."
    ],
    retenir: "GROUP BY ne trie pas. ORDER BY trie."
  },
  {
    id: "m04-q42", dialecte: "SQL Server",
    q: "date_cde est un DATETIME. Comment obtenir le CA par jour ?",
    choixCode: true,
    choix: [
      "GROUP BY date_cde",
      "GROUP BY CAST(date_cde AS date)",
      "GROUP BY DAY(date_cde)",
      "GROUP BY DATEPART(hour, date_cde)"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Chaque heure différente forme un groupe : presque une ligne par commande.",
      "Oui. On enlève l'heure : un groupe par jour. (Pense à mettre la même expression dans le SELECT.)",
      "Non. DAY donne 1 à 31 : tous les « 26 » de tous les mois sont mélangés.",
      "Non. Ça groupe par heure de la journée."
    ],
    retenir: "Grouper par jour un DATETIME : CAST(… AS date)."
  },
  {
    id: "m04-q43", dialecte: "Standard",
    q: "Tu fais GROUP BY MONTH(date_cde) sur 2 ans de données. Quel est le problème ?",
    choix: [
      "Aucun",
      "Les mois de 2025 et 2026 sont mélangés : il faut aussi grouper par année",
      "MONTH n'existe pas",
      "Les dates NULL plantent"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Janvier 2025 et janvier 2026 tombent dans le même groupe « 1 ».",
      "Oui. GROUP BY YEAR(date_cde), MONTH(date_cde). Ou DATETRUNC / DATE_TRUNC.",
      "Non.",
      "Non. Ils forment juste un groupe NULL."
    ],
    retenir: "Par mois = par année ET par mois."
  },
  {
    id: "m04-q44", dialecte: "Snowflake",
    q: "Sur Snowflake, quelle est la façon la plus simple de grouper par mois (année comprise) ?",
    choixCode: true,
    choix: [
      "GROUP BY MONTH(date_cde)",
      "GROUP BY DATE_TRUNC('month', date_cde)",
      "GROUP BY TO_CHAR(date_cde, 'MM')",
      "GROUP BY DAY(date_cde)"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Mélange les années.",
      "Oui. Chaque date devient le 1er de son mois. Une seule colonne, triable, avec l'année.",
      "Non. Mélange les années aussi.",
      "Non."
    ],
    retenir: "DATE_TRUNC('month', d) : le mois, année comprise."
  },
  {
    id: "m04-q45", dialecte: "Standard",
    q: "Comment calculer le pourcentage de commandes livrées, en une seule expression ?",
    choixCode: true,
    choix: [
      "COUNT(statut = 'LIVRE') / COUNT(*)",
      "AVG(CASE WHEN statut = 'LIVRE' THEN 1.0 ELSE 0 END) * 100",
      "SUM(statut) / 100",
      "COUNT(*) * 100"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Syntaxe invalide sur SQL Server.",
      "Oui. La moyenne de 1 et de 0 donne la proportion. Le 1.0 évite la division entière.",
      "Non.",
      "Non."
    ],
    retenir: "Proportion = AVG(CASE WHEN condition THEN 1.0 ELSE 0 END)."
  },
  {
    id: "m04-q46", dialecte: "SQL Server",
    q: "Sur SQL Server, COUNT(DISTINCT client_id, article_id) est-il valide ?",
    choix: [
      "Oui",
      "Non : SQL Server n'accepte qu'une expression. Passe par une sous-requête SELECT DISTINCT",
      "Oui, mais il compte les clients seulement",
      "Oui avec des parenthèses"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Erreur de syntaxe sur SQL Server. (Snowflake, lui, l'accepte.)",
      "Oui. SELECT COUNT(*) FROM (SELECT DISTINCT client_id, article_id FROM …) t.",
      "Non.",
      "Non."
    ],
    retenir: "COUNT(DISTINCT a, b) : non sur SQL Server, oui sur Snowflake."
  },
  {
    id: "m04-q47", dialecte: "Standard",
    q: "Comment obtenir, par client, la date de 1re commande et la date de dernière commande ?",
    choixCode: true,
    choix: [
      "MIN(date_cde), MAX(date_cde) … GROUP BY client_id",
      "FIRST(date_cde), LAST(date_cde)",
      "TOP (1) date_cde",
      "COUNT(date_cde)"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. MIN = la plus ancienne, MAX = la plus récente.",
      "Non. FIRST / LAST ne sont pas des agrégats SQL Server.",
      "Non.",
      "Non."
    ],
    retenir: "Première / dernière date : MIN / MAX."
  },
  {
    id: "m04-q48", dialecte: "Standard",
    q: "Que change le DISTINCT dans SELECT DISTINCT client_id, SUM(montant) FROM commande GROUP BY client_id ?",
    choix: [
      "Il supprime les montants en double",
      "Rien : GROUP BY donne déjà une ligne par client",
      "Il trie",
      "Erreur"
    ],
    bonne: 1,
    pourquoi: [
      "Non. DISTINCT s'applique aux lignes du résultat, pas aux montants additionnés.",
      "Oui. Chaque client n'apparaît déjà qu'une fois. DISTINCT est inutile.",
      "Non.",
      "Non."
    ],
    retenir: "GROUP BY + DISTINCT sur les mêmes colonnes = DISTINCT inutile."
  },
  {
    id: "m04-q49", dialecte: "SQL Server",
    q: "Tu veux le plus gros CA annuel d'un client. Que donne SELECT MAX(SUM(montant)) FROM commande GROUP BY annee; ?",
    choix: [
      "Le CA de la meilleure année",
      "Erreur : on ne met pas un agrégat dans un agrégat",
      "La somme des maximums",
      "Le CA total"
    ],
    bonne: 1,
    pourquoi: [
      "Non sur SQL Server : la requête ne s'exécute pas.",
      "Oui. Fais l'étape en deux temps : SELECT MAX(ca) FROM (SELECT annee, SUM(montant) AS ca … GROUP BY annee) t.",
      "Non.",
      "Non."
    ],
    retenir: "Agrégat d'agrégat : sous-requête ou CTE."
  },
  {
    id: "m04-q50", dialecte: "SQL Server",
    q: "Comment trouver le client qui a le plus gros CA ?",
    choixCode: true,
    choix: [
      "SELECT TOP (1) client_id, SUM(montant) AS ca FROM commande GROUP BY client_id ORDER BY ca DESC",
      "SELECT client_id, MAX(montant) FROM commande",
      "SELECT MAX(client_id) FROM commande",
      "SELECT TOP (1) client_id FROM commande ORDER BY montant DESC"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. On calcule le CA par client, on trie, on garde le 1er. (WITH TIES pour les ex aequo.)",
      "Non. Erreur : client_id n'est pas groupé. Et MAX(montant) n'est pas un CA.",
      "Non. C'est le plus grand identifiant.",
      "Non. C'est le client de la plus grosse COMMANDE, pas du plus gros CA."
    ],
    retenir: "Meilleur X par CA : GROUP BY + ORDER BY SUM DESC + TOP."
  },
  {
    id: "m04-q51", dialecte: "Standard",
    q: "Comment trouver les clients qui ont commandé dans au moins 3 mois différents de 2026 ?",
    choixCode: true,
    choix: [
      "HAVING COUNT(*) >= 3",
      "HAVING COUNT(DISTINCT MONTH(date_cde)) >= 3",
      "WHERE COUNT(MONTH(date_cde)) >= 3",
      "HAVING MAX(MONTH(date_cde)) >= 3"
    ],
    bonne: 1,
    pourquoi: [
      "Non. 3 commandes le même mois passeraient.",
      "Oui. On compte les mois distincts (avec un WHERE sur 2026).",
      "Non. Agrégat dans WHERE : erreur.",
      "Non. Ça vérifie seulement une commande en mars ou après."
    ],
    retenir: "« Dans n périodes différentes » : COUNT(DISTINCT période)."
  },
  {
    id: "m04-q52", dialecte: "Standard",
    q: "Où mettre la condition client_id = 42 dans une requête GROUP BY client_id ?",
    choix: [
      "Dans HAVING, c'est pareil",
      "Dans WHERE : on filtre avant de grouper, c'est plus efficace",
      "Dans GROUP BY",
      "Dans SELECT"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Ça marche, mais tous les clients sont d'abord groupés, puis on en jette la plupart.",
      "Oui. HAVING est réservé aux conditions sur les agrégats.",
      "Non.",
      "Non."
    ],
    retenir: "Condition sans agrégat → WHERE. Avec agrégat → HAVING."
  },
  {
    id: "m04-q53", dialecte: "SQL Server",
    q: "Comment obtenir la liste des articles d'une commande, triés par code, dans un seul texte ?",
    choixCode: true,
    choix: [
      "STRING_AGG(code, ', ') ORDER BY code",
      "STRING_AGG(code, ', ') WITHIN GROUP (ORDER BY code)",
      "STRING_AGG(code ORDER BY code)",
      "CONCAT(code) ORDER BY code"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Ce ORDER BY trierait les lignes du résultat, pas l'intérieur de la liste.",
      "Oui. WITHIN GROUP (ORDER BY …) trie les valeurs dans le texte. (Snowflake : LISTAGG … WITHIN GROUP aussi.)",
      "Non. Syntaxe invalide sur SQL Server.",
      "Non."
    ],
    retenir: "Liste triée : STRING_AGG(…) WITHIN GROUP (ORDER BY …)."
  },
  {
    id: "m04-q54", dialecte: "SQL Server",
    q: "STRING_AGG(code, ',') sur une colonne VARCHAR(20) plante avec « dépassement de 8000 octets ». Que faire ?",
    choixCode: true,
    choix: [
      "Rien, c'est une limite définitive",
      "STRING_AGG(CAST(code AS varchar(max)), ',')",
      "Utiliser CONCAT",
      "Ajouter DISTINCT"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Le résultat suit le type d'entrée. En varchar(max), plus de limite de 8000.",
      "Non.",
      "Non. Ça peut réduire, mais pas régler le problème."
    ],
    retenir: "STRING_AGG long : convertir l'entrée en varchar(max)."
  },
  {
    id: "m04-q55", dialecte: "Snowflake",
    q: "Sur Snowflake, comment lister les familles d'articles d'un client, sans doublon, séparées par des virgules ?",
    choixCode: true,
    choix: [
      "LISTAGG(DISTINCT famille, ', ')",
      "STRING_AGG(DISTINCT famille)",
      "LISTAGG(famille) DISTINCT",
      "GROUP_CONCAT(DISTINCT famille)"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. LISTAGG accepte DISTINCT. (Sur SQL Server, STRING_AGG ne l'accepte pas : dédoublonne avant, dans une sous-requête.)",
      "Non. STRING_AGG n'est pas la fonction Snowflake.",
      "Non.",
      "Non. MySQL."
    ],
    retenir: "Snowflake : LISTAGG(DISTINCT …)."
  },
  {
    id: "m04-q56", dialecte: "SQL Server + Snowflake",
    q: "Que produit GROUP BY CUBE (region, annee) ?",
    choix: [
      "Le détail seulement",
      "Toutes les combinaisons de sous-totaux : par région, par année, région × année, et le total",
      "Seulement le total",
      "Les sous-totaux par région uniquement"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. CUBE = tous les regroupements possibles. ROLLUP suit une hiérarchie (région, puis année).",
      "Non.",
      "Non. C'est plutôt ROLLUP, sans le détail."
    ],
    retenir: "CUBE = toutes les combinaisons. ROLLUP = hiérarchie."
  },
  {
    id: "m04-q57", dialecte: "Standard",
    q: "2 régions, chacune avec 3 pays. Combien de lignes renvoie GROUP BY ROLLUP (region, pays) ?",
    choix: [
      "6",
      "8",
      "9",
      "11"
    ],
    bonne: 2,
    pourquoi: [
      "Non. Ce sont les lignes de détail seulement.",
      "Non. Il manque le total général.",
      "Oui. 6 détails + 2 sous-totaux par région + 1 total général = 9.",
      "Non."
    ],
    retenir: "ROLLUP (a, b) = détail + sous-totaux de a + total."
  },
  {
    id: "m04-q58", dialecte: "SQL Server + Snowflake",
    q: "Après un ROLLUP, comment afficher « Total » au lieu de NULL sur la ligne de total ?",
    choixCode: true,
    choix: [
      "COALESCE(region, 'Total')",
      "CASE WHEN GROUPING(region) = 1 THEN 'Total' ELSE region END",
      "ISNULL(region)",
      "REPLACE(region, NULL, 'Total')"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Presque : mais une vraie région NULL serait aussi affichée « Total ».",
      "Oui. GROUPING distingue la ligne de total d'une vraie valeur NULL.",
      "Non.",
      "Non. REPLACE ne gère pas NULL."
    ],
    retenir: "Libellé de total fiable : GROUPING(col) = 1."
  },
  {
    id: "m04-q59", dialecte: "SQL Server + Snowflake",
    q: "Comment trier un ROLLUP pour avoir chaque sous-total juste après les lignes de sa région, et le total général à la fin ?",
    choixCode: true,
    choix: [
      "ORDER BY region, pays",
      "ORDER BY GROUPING(region), region, GROUPING(pays), pays",
      "ORDER BY 1 DESC",
      "Pas besoin, c'est automatique"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Les NULL des totaux se placeraient en tête (SQL Server).",
      "Oui. GROUPING vaut 0 pour le détail, 1 pour le total : les totaux passent après.",
      "Non.",
      "Non. Sans ORDER BY, aucun ordre garanti."
    ],
    retenir: "Trier un ROLLUP : ORDER BY GROUPING(col), col."
  },
  {
    id: "m04-q60", dialecte: "SQL Server",
    q: "Que faut-il pour utiliser l'opérateur PIVOT de SQL Server ?",
    choix: [
      "Rien de spécial",
      "Un agrégat (SUM, COUNT…) et la liste fixe des valeurs qui deviennent des colonnes",
      "Une procédure stockée",
      "Une table temporaire"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Ex. PIVOT (SUM(ca) FOR mois IN ([1], [2], [3])). Les colonnes doivent être connues à l'avance.",
      "Non.",
      "Non."
    ],
    retenir: "PIVOT : un agrégat + une liste de colonnes écrite en dur."
  },
  {
    id: "m04-q61", dialecte: "SQL Server",
    q: "Tu veux un PIVOT dont les colonnes sont les articles, et la liste change chaque mois. Que faut-il ?",
    choix: [
      "Un PIVOT simple",
      "Du SQL dynamique qui construit la liste des colonnes",
      "Un GROUP BY",
      "C'est impossible"
    ],
    bonne: 1,
    pourquoi: [
      "Non. PIVOT exige une liste écrite en dur.",
      "Oui. On construit la liste avec STRING_AGG, puis on exécute avec sp_executesql. Souvent, il vaut mieux pivoter dans Power BI ou Excel.",
      "Non. GROUP BY donne des lignes, pas des colonnes.",
      "Non."
    ],
    retenir: "Colonnes variables = SQL dynamique, ou pivot dans l'outil de restitution."
  },
  {
    id: "m04-q62", dialecte: "SQL Server",
    q: "Une table a 12 colonnes m01 … m12 (une par mois). Comment la transformer en lignes (mois, montant) ?",
    choixCode: true,
    choix: [
      "GROUP BY m01, m02, …",
      "CROSS APPLY (VALUES (1, m01), (2, m02), …, (12, m12)) AS v(mois, montant)",
      "PIVOT",
      "UNION des 12 colonnes dans un SELECT"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Chaque ligne d'origine produit 12 lignes. UNPIVOT marche aussi, mais il supprime les NULL.",
      "Non. PIVOT fait l'inverse.",
      "Non. Possible avec 12 SELECT et UNION ALL, mais lit 12 fois la table."
    ],
    retenir: "Colonnes → lignes : CROSS APPLY (VALUES …) ou UNPIVOT."
  },
  {
    id: "m04-q63", dialecte: "Snowflake",
    q: "Sur Snowflake, quelle fonction donne la valeur la plus fréquente (ex. le mode de paiement le plus utilisé) ?",
    choixCode: true,
    choix: [
      "MEDIAN(mode_paiement)",
      "MODE(mode_paiement)",
      "MAX(mode_paiement)",
      "TOP(mode_paiement)"
    ],
    bonne: 1,
    pourquoi: [
      "Non. La médiane est la valeur du milieu, pour des nombres.",
      "Oui. MODE renvoie la valeur la plus fréquente. Sur SQL Server : GROUP BY + COUNT + TOP (1).",
      "Non. MAX = dernière valeur dans l'ordre.",
      "Non."
    ],
    retenir: "Snowflake : MODE(col) = valeur la plus fréquente."
  },
  {
    id: "m04-q64", dialecte: "SQL Server + Snowflake",
    q: "Comment s'appelle la fonction d'écart-type ?",
    choix: [
      "STDEV sur SQL Server, STDDEV sur Snowflake",
      "STDDEV partout",
      "ECART_TYPE partout",
      "VAR partout"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Petite différence d'orthographe, piège classique en migration.",
      "Non. SQL Server écrit STDEV (un seul D).",
      "Non.",
      "Non. VAR est la variance (SQL Server)."
    ],
    retenir: "Écart-type : STDEV (SQL Server), STDDEV (Snowflake)."
  },
  {
    id: "m04-q65", dialecte: "SQL Server + Snowflake",
    q: "Valeurs : 10, 20, 30, 40. Différence entre PERCENTILE_CONT(0.5) et PERCENTILE_DISC(0.5) ?",
    choix: [
      "Aucune",
      "CONT donne 25 (calculé entre deux valeurs) ; DISC donne 20 (une valeur existante)",
      "CONT donne 20 ; DISC donne 25",
      "Les deux donnent 30"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. CONT interpole (continu). DISC prend une vraie valeur de la liste (discret).",
      "Non. C'est l'inverse.",
      "Non."
    ],
    retenir: "PERCENTILE_CONT interpole. PERCENTILE_DISC renvoie une valeur réelle."
  },
  {
    id: "m04-q66", dialecte: "SQL Server",
    q: "Sur SQL Server, pourquoi SELECT client_id, PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY montant) FROM commande GROUP BY client_id plante-t-il ?",
    choix: [
      "PERCENTILE_CONT n'existe pas",
      "Sur SQL Server, PERCENTILE_CONT est une fonction de fenêtrage : elle exige OVER (PARTITION BY …)",
      "Il faut un HAVING",
      "Il faut MEDIAN"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Elle existe.",
      "Oui. Écris … OVER (PARTITION BY client_id), avec DISTINCT. Snowflake l'accepte comme agrégat normal.",
      "Non.",
      "Non. MEDIAN n'existe pas sur SQL Server."
    ],
    retenir: "SQL Server : PERCENTILE_CONT … OVER (…). Snowflake : agrégat ou MEDIAN."
  },
  {
    id: "m04-q67", dialecte: "SQL Server",
    q: "Une table de logs a 3 milliards de lignes. COUNT(*) plante en dépassement. Que faire ?",
    choixCode: true,
    choix: [
      "COUNT(1)",
      "COUNT_BIG(*)",
      "SUM(1)",
      "COUNT(DISTINCT *)"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Même type de retour (INT) que COUNT(*).",
      "Oui. COUNT_BIG renvoie un BIGINT.",
      "Non. SUM(1) renvoie aussi un INT.",
      "Non. Syntaxe invalide."
    ],
    retenir: "Plus de 2,1 milliards de lignes : COUNT_BIG."
  },
  {
    id: "m04-q68", dialecte: "Standard",
    q: "Comment calculer le prix moyen d'achat d'un article, pondéré par les quantités achetées ?",
    choixCode: true,
    choix: [
      "AVG(prix)",
      "SUM(prix * qte) / NULLIF(SUM(qte), 0)",
      "SUM(prix) / COUNT(*)",
      "AVG(prix * qte)"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Un achat de 1 pièce pèse autant qu'un achat de 1000.",
      "Oui. Montant total / quantité totale = prix moyen pondéré (PMP).",
      "Non. C'est AVG(prix), non pondéré.",
      "Non. C'est un montant moyen par ligne."
    ],
    retenir: "Prix moyen pondéré = SUM(prix × qte) / SUM(qte)."
  },
  {
    id: "m04-q69", dialecte: "Standard",
    q: "SUM(montant) / SUM(qte) plante quand un article n'a que des quantités à 0. Que faire ?",
    choixCode: true,
    choix: [
      "SUM(montant) / SUM(qte) + 1",
      "SUM(montant) / NULLIF(SUM(qte), 0)",
      "SUM(montant / qte)",
      "COALESCE(SUM(montant) / SUM(qte), 0)"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Ça fausse le résultat.",
      "Oui. Si la somme vaut 0, on divise par NULL : résultat NULL, pas d'erreur.",
      "Non. Même problème ligne par ligne.",
      "Non. L'erreur arrive avant le COALESCE."
    ],
    retenir: "Diviser par un agrégat : NULLIF(SUM(x), 0)."
  },
  {
    id: "m04-q70", dialecte: "Standard",
    q: "Tu veux le nombre d'articles par famille, y compris les familles qui n'ont aucun article (afficher 0). Comment faire ?",
    choix: [
      "SELECT famille_id, COUNT(*) FROM article GROUP BY famille_id",
      "Partir de la table famille, LEFT JOIN article, puis COUNT(a.id)",
      "Ajouter HAVING COUNT(*) >= 0",
      "Utiliser COALESCE(COUNT(*), 0)"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Une famille sans article n'a aucune ligne dans article : elle n'apparaît pas.",
      "Oui. La table de référence garde toutes les familles. COUNT(a.id) donne 0 pour les vides.",
      "Non. Ça ne crée pas de groupe.",
      "Non. Le groupe n'existe pas."
    ],
    retenir: "Afficher les zéros : partir de la table de référence + LEFT JOIN."
  },
  {
    id: "m04-q71", dialecte: "Snowflake",
    q: "Sur Snowflake, que fait GROUP BY ALL ?",
    choix: [
      "Groupe sur toutes les colonnes de la table",
      "Groupe automatiquement sur toutes les colonnes du SELECT qui ne sont pas des agrégats",
      "Supprime le regroupement",
      "Erreur"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Seulement les colonnes du SELECT.",
      "Oui. Pratique : plus besoin de recopier la liste des colonnes.",
      "Non.",
      "Non. Syntaxe Snowflake valide."
    ],
    retenir: "Snowflake : GROUP BY ALL = toutes les colonnes non agrégées du SELECT."
  },
  {
    id: "m04-q72", dialecte: "SQL Server",
    q: "actif est une colonne BIT. Que donne SUM(actif) sur SQL Server ?",
    choix: [
      "Le nombre d'actifs",
      "Erreur : SUM n'accepte pas le type BIT",
      "1",
      "NULL"
    ],
    bonne: 1,
    pourquoi: [
      "Non. SQL Server refuse.",
      "Oui. Écris SUM(CAST(actif AS int)) ou COUNT(CASE WHEN actif = 1 THEN 1 END). MAX(bit) est aussi refusé.",
      "Non.",
      "Non."
    ],
    retenir: "BIT n'est pas un nombre pour les agrégats : CAST en INT."
  },
  {
    id: "m04-q73", dialecte: "Standard",
    q: "Dans un rapport par région, comment afficher « (non renseignée) » au lieu d'un groupe NULL ?",
    choixCode: true,
    choix: [
      "COALESCE(region, '(non renseignée)') dans le SELECT et dans le GROUP BY",
      "WHERE region IS NOT NULL",
      "HAVING region IS NOT NULL",
      "ORDER BY region"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Même expression dans SELECT et GROUP BY (SQL Server). Les clients sans région restent visibles.",
      "Non. Ils disparaîtraient du rapport.",
      "Non. Même problème.",
      "Non."
    ],
    retenir: "Ne cache pas les NULL : donne-leur un libellé."
  },
  {
    id: "m04-q74", dialecte: "Standard",
    q: "Les avoirs sont stockés en négatif. Tu veux les clients dont le CA NET est positif. Que choisis-tu ?",
    choix: [
      "WHERE montant > 0 … GROUP BY client_id",
      "GROUP BY client_id HAVING SUM(montant) > 0",
      "WHERE SUM(montant) > 0",
      "HAVING montant > 0"
    ],
    bonne: 1,
    pourquoi: [
      "Non. On enlève les avoirs avant de sommer : ce n'est plus un CA net.",
      "Oui. On fait la somme nette (factures + avoirs), puis on filtre.",
      "Non. Agrégat dans WHERE : erreur.",
      "Non. montant n'est pas groupé."
    ],
    retenir: "WHERE avant le calcul, HAVING après : le résultat change."
  },
  {
    id: "m04-q75", dialecte: "Standard",
    q: "Les avoirs sont stockés en POSITIF, avec type = 'AVOIR'. Comment calculer le CA net ?",
    choixCode: true,
    choix: [
      "SUM(montant)",
      "SUM(CASE WHEN type = 'AVOIR' THEN -montant ELSE montant END)",
      "SUM(montant) - COUNT(type)",
      "SUM(ABS(montant))"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Les avoirs seraient ajoutés au lieu d'être retirés.",
      "Oui. On applique le signe selon le type de pièce.",
      "Non.",
      "Non."
    ],
    retenir: "Vérifie la convention de signe des avoirs avant de sommer."
  },
  {
    id: "m04-q76", dialecte: "Standard",
    q: "Comment trouver les clients en double, définis comme même nom + même code postal ?",
    choixCode: true,
    choix: [
      "GROUP BY nom HAVING COUNT(*) > 1",
      "GROUP BY nom, code_postal HAVING COUNT(*) > 1",
      "SELECT DISTINCT nom, code_postal",
      "GROUP BY id HAVING COUNT(*) > 1"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Deux homonymes dans deux villes seraient comptés comme doublons.",
      "Oui. On groupe sur toutes les colonnes qui définissent le doublon.",
      "Non. DISTINCT cache les doublons.",
      "Non. L'id est unique."
    ],
    retenir: "Doublon sur plusieurs colonnes : GROUP BY toutes ces colonnes."
  },
  {
    id: "m04-q77", dialecte: "Standard",
    q: "Tu veux garder le plus petit id de chaque groupe de doublons (nom, code_postal). Quelle requête donne ces id ?",
    choixCode: true,
    choix: [
      "SELECT MIN(id) FROM client GROUP BY nom, code_postal",
      "SELECT id FROM client GROUP BY nom",
      "SELECT TOP (1) id FROM client",
      "SELECT DISTINCT id FROM client"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Un id par groupe. Les autres sont les doublons à traiter (fusionner, désactiver…).",
      "Non. Erreur : id n'est pas groupé.",
      "Non. Un seul id pour toute la table.",
      "Non. Tous les id."
    ],
    retenir: "Un représentant par groupe : MIN(id) ou MAX(id)."
  },
  {
    id: "m04-q78", dialecte: "Standard",
    q: "Tu joins commande et ligne_cde, puis tu veux le nombre de commandes par client. Quelle expression ?",
    choixCode: true,
    choix: [
      "COUNT(*)",
      "COUNT(DISTINCT co.id)",
      "COUNT(li.id)",
      "SUM(1)"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Compte les lignes de détail, pas les commandes.",
      "Oui. Après la jointure, chaque commande est répétée par ligne. On compte les commandes distinctes.",
      "Non. Compte aussi les lignes.",
      "Non. Même chose que COUNT(*)."
    ],
    retenir: "Après une jointure 1-N : COUNT(DISTINCT clé du côté 1)."
  },
  {
    id: "m04-q79", dialecte: "Standard",
    q: "Paniers : 50, 60, 55, 45, 5000 €. Quel indicateur décrit le mieux le panier « typique » ?",
    choix: [
      "La moyenne (1042 €)",
      "La médiane (55 €)",
      "Le maximum",
      "La somme"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Une seule grosse commande tire la moyenne vers le haut.",
      "Oui. La médiane résiste aux valeurs extrêmes.",
      "Non.",
      "Non."
    ],
    retenir: "Valeurs extrêmes : préfère la médiane à la moyenne."
  },
  {
    id: "m04-q80", dialecte: "Standard",
    q: "Après GROUP BY region, le groupe NULL a 12 lignes. Que valent COUNT(*) et COUNT(region) pour ce groupe ?",
    choix: [
      "12 et 12",
      "12 et 0",
      "0 et 0",
      "NULL et 12"
    ],
    bonne: 1,
    pourquoi: [
      "Non. COUNT(region) ne compte pas les NULL.",
      "Oui. 12 lignes, mais 0 région renseignée.",
      "Non.",
      "Non. COUNT ne renvoie jamais NULL."
    ],
    retenir: "Groupe NULL : COUNT(*) > 0 mais COUNT(col) = 0."
  },
  {
    id: "m04-q81", dialecte: "Standard",
    q: "SELECT pays FROM client GROUP BY pays ORDER BY COUNT(*) DESC; est-il valide ?",
    choix: [
      "Oui",
      "Non : COUNT(*) doit être dans le SELECT",
      "Non : ORDER BY n'accepte pas d'agrégat",
      "Seulement sur Snowflake"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. On trie les pays du plus fréquent au moins fréquent, sans afficher le nombre.",
      "Non. Ce n'est pas obligatoire.",
      "Non.",
      "Non."
    ],
    retenir: "ORDER BY peut utiliser un agrégat absent du SELECT."
  },
  {
    id: "m04-q82", dialecte: "Standard",
    q: "SELECT 'France' AS pays, SUM(montant) FROM commande WHERE pays = 'FR'; est-il valide ?",
    choix: [
      "Oui",
      "Non : 'France' n'est pas groupé",
      "Non : il faut GROUP BY",
      "Seulement avec DISTINCT"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Une constante n'a pas besoin d'être groupée.",
      "Non. La règle concerne les colonnes, pas les constantes.",
      "Non.",
      "Non."
    ],
    retenir: "Constante + agrégat : permis sans GROUP BY."
  },
  {
    id: "m04-q83", dialecte: "Standard",
    q: "SELECT SUM(montant) FROM commande GROUP BY client_id; (client_id absent du SELECT) est-il valide ?",
    choix: [
      "Oui, mais on ne sait plus à quel client correspond chaque somme",
      "Non : erreur",
      "Oui, et le client est ajouté",
      "Seulement sur Snowflake"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Permis, mais peu utile. (Utile dans une sous-requête : par exemple le MAX des CA clients.)",
      "Non.",
      "Non.",
      "Non."
    ],
    retenir: "On peut grouper sur une colonne sans l'afficher."
  },
  {
    id: "m04-q84", dialecte: "Snowflake",
    q: "Sur Snowflake, tu groupes par client_id et tu veux afficher son nom (identique sur toutes ses lignes). Quelle fonction ?",
    choixCode: true,
    choix: [
      "ANY_VALUE(nom)",
      "FIRST(nom)",
      "nom (sans fonction)",
      "DISTINCT nom"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. ANY_VALUE prend une valeur quelconque du groupe : parfait quand elles sont toutes égales.",
      "Non.",
      "Non. nom n'est ni groupé ni agrégé : erreur.",
      "Non."
    ],
    retenir: "Snowflake : ANY_VALUE(col). SQL Server : MAX(col) ou ajouter col au GROUP BY."
  },
  {
    id: "m04-q85", dialecte: "SQL Server",
    q: "Sur SQL Server, tu groupes par client_id et le nom est le même sur toutes ses lignes. Quelles solutions sont correctes ?",
    choix: [
      "Ajouter nom au GROUP BY, ou utiliser MAX(nom)",
      "Utiliser ANY_VALUE(nom)",
      "Rien, SQL Server comprend",
      "Utiliser DISTINCT"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Les deux marchent. Ajouter au GROUP BY est le plus lisible.",
      "Non. ANY_VALUE n'est pas disponible sur SQL Server (jusqu'à la version 2022 au moins).",
      "Non. Erreur : colonne non groupée.",
      "Non."
    ],
    retenir: "SQL Server : GROUP BY client_id, nom (ou MAX(nom))."
  },
  {
    id: "m04-q86", dialecte: "Standard",
    q: "TVA par ligne : 0,333 ; 0,333 ; 0,333. Que valent SUM(ROUND(tva, 2)) et ROUND(SUM(tva), 2) ?",
    choix: [
      "1,00 et 1,00",
      "0,99 et 1,00",
      "1,00 et 0,99",
      "0,99 et 0,99"
    ],
    bonne: 1,
    pourquoi: [
      "Non. L'arrondi ligne par ligne perd des centimes.",
      "Oui. 0,33 × 3 = 0,99 ; arrondi du total 0,999 = 1,00. Écart classique entre facture et comptabilité.",
      "Non. C'est l'inverse.",
      "Non."
    ],
    retenir: "Arrondir avant ou après la somme change le résultat. Suis la règle de ta compta."
  },
  {
    id: "m04-q87", dialecte: "SQL Server",
    q: "duree est une colonne TIME. Que donne SUM(duree) ?",
    choix: [
      "La durée totale",
      "Erreur : SUM n'accepte pas le type TIME",
      "NULL",
      "Le nombre de lignes"
    ],
    bonne: 1,
    pourquoi: [
      "Non. SQL Server refuse.",
      "Oui. Convertis en secondes : SUM(DATEDIFF(second, '00:00', duree)). Même problème avec AVG sur des dates.",
      "Non.",
      "Non."
    ],
    retenir: "Additionner des durées : les convertir en nombre (secondes, minutes)."
  },
  {
    id: "m04-q88", dialecte: "SQL Server",
    q: "Comment compter les commandes par heure de la journée (0 à 23) ?",
    choixCode: true,
    choix: [
      "GROUP BY DATEPART(hour, date_cde)",
      "GROUP BY CAST(date_cde AS date)",
      "GROUP BY date_cde",
      "GROUP BY HOUR(date_cde)"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Toutes les commandes de 14 h, tous jours confondus, dans le même groupe.",
      "Non. Par jour.",
      "Non. Presque une ligne par commande.",
      "Non. HOUR n'existe pas sur SQL Server (oui sur Snowflake)."
    ],
    retenir: "Profil horaire : GROUP BY DATEPART(hour, d)."
  },
  {
    id: "m04-q89", dialecte: "Standard",
    q: "Comment compter les clients actifs (au moins une commande) sur octobre 2026 ?",
    choixCode: true,
    choix: [
      "COUNT(*) … WHERE date_cde dans octobre",
      "COUNT(DISTINCT client_id) … WHERE date_cde >= '20261001' AND date_cde < '20261101'",
      "COUNT(client_id)",
      "SUM(client_id)"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Compte les commandes, pas les clients.",
      "Oui. Chaque client compté une fois, s'il a commandé dans la période.",
      "Non. Compte les commandes avec un client.",
      "Non."
    ],
    retenir: "Clients actifs = COUNT(DISTINCT client_id) sur la période."
  },
  {
    id: "m04-q90", dialecte: "Standard",
    q: "Comment trouver les clients qui ont commandé en 2025 ET en 2026 ?",
    choixCode: true,
    choix: [
      "WHERE annee = 2025 AND annee = 2026",
      "WHERE annee IN (2025, 2026) GROUP BY client_id HAVING COUNT(DISTINCT annee) = 2",
      "WHERE annee IN (2025, 2026)",
      "GROUP BY annee HAVING COUNT(*) = 2"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Une ligne ne peut pas avoir deux années : 0 ligne.",
      "Oui. On garde les clients présents sur les 2 années. (INTERSECT marche aussi.)",
      "Non. Ceux qui ont commandé l'une OU l'autre.",
      "Non."
    ],
    retenir: "« Présent sur toutes les périodes » : HAVING COUNT(DISTINCT période) = nb de périodes."
  },
  {
    id: "m04-q91", dialecte: "Standard",
    q: "Comment trouver les NOUVEAUX clients de 2026 (1re commande en 2026) ?",
    choixCode: true,
    choix: [
      "WHERE date_cde >= '20260101'",
      "GROUP BY client_id HAVING MIN(date_cde) >= '20260101'",
      "GROUP BY client_id HAVING MAX(date_cde) >= '20260101'",
      "WHERE annee = 2026 GROUP BY client_id"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Donne aussi les anciens clients qui ont recommandé.",
      "Oui. Leur toute première commande date de 2026. Pas de WHERE sur la date, sinon on ne voit plus l'historique !",
      "Non. Ceux qui ont commandé récemment.",
      "Non. Inclut les anciens clients."
    ],
    retenir: "Nouveaux clients : HAVING MIN(date) dans la période, sur tout l'historique."
  },
  {
    id: "m04-q92", dialecte: "Snowflake",
    q: "Sur Snowflake, comment savoir si TOUTES les lignes d'une commande sont livrées (livre est un BOOLEAN) ?",
    choixCode: true,
    choix: [
      "BOOLAND_AGG(livre)",
      "BOOLOR_AGG(livre)",
      "SUM(livre)",
      "MAX(livre)"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. ET logique sur toutes les lignes : vrai seulement si toutes sont vraies.",
      "Non. OU logique : vrai si au moins une est livrée.",
      "Non.",
      "Non. MAX d'un booléen = au moins un vrai."
    ],
    retenir: "Snowflake : BOOLAND_AGG = toutes, BOOLOR_AGG = au moins une."
  },
  {
    id: "m04-q93", dialecte: "SQL Server",
    q: "Sur SQL Server, comment savoir si toutes les lignes d'une commande sont livrées (livre = 1) ?",
    choixCode: true,
    choix: [
      "MIN(CASE WHEN livre = 1 THEN 1 ELSE 0 END) = 1",
      "MAX(livre) = 1",
      "SUM(livre) > 0",
      "COUNT(livre) = 1"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. Si une seule ligne vaut 0, le MIN vaut 0.",
      "Non. MAX(bit) est refusé, et MAX = au moins une.",
      "Non. SUM(bit) est refusé, et > 0 = au moins une.",
      "Non."
    ],
    retenir: "« Toutes » = MIN(indicateur) = 1. « Au moins une » = MAX(indicateur) = 1."
  },
  {
    id: "m04-q94", dialecte: "SQL Server + Snowflake",
    q: "SELECT COUNT(*) FROM grosse_table; (sans WHERE) : quelle différence entre les moteurs ?",
    choix: [
      "Aucune",
      "Snowflake répond presque instantanément grâce à ses métadonnées ; SQL Server doit parcourir un index",
      "SQL Server répond instantanément, Snowflake lit tout",
      "Les deux refusent sans WHERE"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Snowflake connaît le nombre de lignes de chaque micro-partition. Sur SQL Server, sys.partitions donne une estimation rapide.",
      "Non. C'est l'inverse.",
      "Non."
    ],
    retenir: "COUNT(*) sans filtre : instantané sur Snowflake, coûteux sur SQL Server."
  },
  {
    id: "m04-q95", dialecte: "Standard",
    q: "Comment compter les commandes par tranche de 100 € (0-99, 100-199…) ?",
    choixCode: true,
    choix: [
      "GROUP BY FLOOR(montant / 100) * 100",
      "GROUP BY montant",
      "GROUP BY ROUND(montant, 2)",
      "GROUP BY montant % 100"
    ],
    bonne: 0,
    pourquoi: [
      "Oui. 157 → 100, 42 → 0, 230 → 200. Chaque tranche est un groupe.",
      "Non. Un groupe par montant exact.",
      "Non.",
      "Non. Le reste : 157 et 257 seraient ensemble."
    ],
    retenir: "Tranches régulières : FLOOR(x / largeur) * largeur."
  },
  {
    id: "m04-q96", dialecte: "Standard",
    q: "Tu veux les 3 meilleurs clients de CHAQUE région. GROUP BY suffit-il ?",
    choix: [
      "Oui, avec TOP (3)",
      "Non : il faut une fonction de fenêtrage (ROW_NUMBER par région) sur le résultat du GROUP BY",
      "Oui, avec HAVING COUNT(*) <= 3",
      "Oui, avec ORDER BY"
    ],
    bonne: 1,
    pourquoi: [
      "Non. TOP (3) donne 3 lignes au total, pas 3 par région.",
      "Oui. On calcule le CA par client, puis on numérote dans chaque région, et on garde les n° 1 à 3 (module 8).",
      "Non. Ça filtre sur le nombre de lignes du groupe.",
      "Non."
    ],
    retenir: "« Top N par groupe » : GROUP BY + ROW_NUMBER() OVER (PARTITION BY …)."
  },
  {
    id: "m04-q97", dialecte: "Standard",
    q: "Tu importes un fichier Excel de ventes. Le CA calculé est le double du CA réel. Cause probable ?",
    choix: [
      "Un bug de SUM",
      "Le fichier contient des lignes « Total » ou « Sous-total » qui sont additionnées avec le détail",
      "Les NULL",
      "Le format des dates"
    ],
    bonne: 1,
    pourquoi: [
      "Non.",
      "Oui. Les totaux déjà calculés dans Excel sont recomptés. Filtre-les à l'import.",
      "Non. Les NULL diminuent, ils ne doublent pas.",
      "Non."
    ],
    retenir: "Données importées : élimine les lignes de totaux avant d'agréger."
  },
  {
    id: "m04-q98", dialecte: "Standard",
    q: "Une table contient le stock de fin de mois, par article. Que vaut SUM(qte_stock) sur 12 mois ?",
    choix: [
      "Le stock moyen",
      "Rien d'utile : le stock ne s'additionne pas dans le temps",
      "Le stock actuel",
      "Le total vendu"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Ce serait AVG.",
      "Oui. Le stock est une mesure « semi-additive ». On prend le dernier mois, ou la moyenne. Pas la somme.",
      "Non. Le stock actuel = le dernier mois.",
      "Non."
    ],
    retenir: "Stock, solde : pas de SUM dans le temps. Dernière valeur ou moyenne."
  },
  {
    id: "m04-q99", dialecte: "SQL Server",
    q: "Comment calculer le nombre moyen de lignes par commande ?",
    choixCode: true,
    choix: [
      "COUNT(*) / COUNT(DISTINCT cde_id)",
      "COUNT(*) * 1.0 / COUNT(DISTINCT cde_id)",
      "AVG(cde_id)",
      "COUNT(DISTINCT cde_id) / COUNT(*)"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Presque : mais division entière sur SQL Server, 2,6 devient 2.",
      "Oui. Total des lignes / nombre de commandes, en décimal.",
      "Non. Moyenne des identifiants : aucun sens.",
      "Non. C'est l'inverse."
    ],
    retenir: "Moyenne par entité = nb total / nb d'entités distinctes (× 1.0)."
  },
  {
    id: "m04-q100", dialecte: "SQL Server",
    q: "Les rapports d'agrégats sur une table de faits de 500 millions de lignes sont lents. Quelle solution SQL Server est faite pour ça ?",
    choix: [
      "Ajouter NOLOCK",
      "Un index columnstore : stockage par colonnes, compressé, très rapide pour SUM / COUNT sur de gros volumes",
      "Ajouter DISTINCT",
      "Un index sur chaque colonne"
    ],
    bonne: 1,
    pourquoi: [
      "Non. Ça ne rend pas le calcul plus rapide, et ça peut fausser.",
      "Oui. Le columnstore lit seulement les colonnes utiles, par lots. C'est le principe de Snowflake.",
      "Non.",
      "Non. Coûteux, et peu utile pour des agrégats sur toute la table."
    ],
    retenir: "Gros agrégats sur SQL Server : index columnstore."
  }
];
