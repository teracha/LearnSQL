// Parcours SQL — Fiche de cours du module m01 « Les bases du SELECT », nouveau format (docs/plan-sql.md, règles 2, 3, 5 :
// une idée par point, 1 ou 2 phrases, 25 mots et 3 accents graves au plus ; 7 sections + « Détails utiles »).
// Fond : SELECT et FROM (colonnes, *, alias de table, schéma), l'ordre d'exécution logique (FROM → WHERE → GROUP BY →
// HAVING → SELECT → DISTINCT → ORDER BY → TOP / LIMIT, portée des alias, plan d'exécution), ORDER BY (ASC par défaut,
// plusieurs critères, NULL selon le moteur, CASE, expression, codes en texte, vue), TOP / LIMIT / OFFSET-FETCH (WITH
// TIES, pagination par clé), DISTINCT (ligne entière, un seul NULL, tri limité aux colonnes affichées, clé unique,
// COUNT), l'écriture des valeurs et des noms (apostrophes, constante, type de la colonne, crochets et guillemets, casse
// Snowflake), les calculs (priorités, %, NULL, concaténation), SELECT sans FROM. « Détails utiles » : noms en 3 ou 4
// parties, virgules, vues, variantes de *, ORDER BY par position, variantes de TOP, forme du script, VALUES. Le tableau
// « differences » porte le reste (OFFSET seul, NULLS FIRST / LAST, collation, ::, espaces de fin, SELECT INTO / CTAS,
// sp_help / DESCRIBE / TOP (0), USE / GO / DB_NAME / @@VERSION, NEWID / RANDOM / SAMPLE / GETDATE).
// Base d'exemple : docs/base-exemple.sql. Chaque résultat a été recalculé avec SQLite (TOP vérifié avec LIMIT ; les ex
// aequo de TOP (4) WITH TIES à la main) : facture (4 lignes) ; totaux par client hors annulées > 1 300 (15 115,00 et
// 2 580,00) ; tri des PRO français par ville, NULL en tête (SQL Server) ; TOP (4) WITH TIES = 5 lignes (deux commandes à
// 1 290,00) ; DISTINCT type + statut des flux (4 couples) ; clients sans SIREN (2) ; SELECT sans FROM (20, 1, NULL,
// CDE-1001). Relu par le testeur (02/11/2026) : 8 corrections intégrées (GROUP BY / SUM / HAVING nommés avec renvoi au
// module m04, JOIN → module m05, « par défaut » pour les NULL Snowflake et le paramètre DEFAULT_NULL_ORDERING, règle
// DISTINCT + ORDER BY attribuée à SQL Server, RAND / GETDATE évalués une fois par instruction, retenir courts).
// Couverture : les 100 « retenir » des questions m01 (data/m01-bases.js) sont chacun dans un point, un exemple, un
// retenir ou une ligne du tableau « differences » (carte de couverture dans le rapport de rédaction).
// Sources vérifiées : learn.microsoft.com (SELECT - ORDER BY clause : NULL = plus petite valeur, OFFSET / FETCH,
// DISTINCT et ORDER BY, vue et ORDER BY, positions à éviter ; TOP : PERCENT arrondi au-dessus, WITH TIES exige ORDER BY,
// parenthèses ; = (String comparison) : 'abc' = 'abc ' ; SELECT clause : DISTINCT et NULL, alias.*, alias de colonne
// seulement dans ORDER BY). docs.snowflake.com (ORDER BY : NULL plus grand par défaut, DEFAULT_NULL_ORDERING, NULLS
// FIRST / LAST ; TOP <n> = LIMIT ; LIMIT / FETCH ; SAMPLE ; Identifier requirements : sans guillemets → MAJUSCULES ;
// comparaison de chaînes : les espaces de fin comptent).
LEARNSQL.cours.m01 = {
  intro: "Une commande EDI d'AquaBleu n'est pas facturée dans Divalto : par quelle requête commences-tu ? Un `SELECT` sur la table des commandes, trié par date, limité aux dernières lignes. Ce module pose cette base : lire, trier, limiter, et surtout l'ordre dans lequel le moteur exécute ta requête. C'est ce qui évite un rapport Power BI faux parce que l'ordre n'était pas garanti, ou un `SELECT *` qui casse une intégration le jour où une colonne s'ajoute.",
  sections: [
    {
      titre: "Lire une table : SELECT et FROM",
      exemple: "SELECT f.num_fact, f.montant_ht, f.statut\nFROM dbo.facture AS f;",
      resultat: [["num_fact", "montant_ht", "statut"], ["FA-2026-0301", "4780.00", "PAYEE"], ["FA-2026-0302", "1290.00", "PAYEE"], ["FA-2026-0303", "2385.00", "RETARD"], ["FA-2026-0401", "79.80", "EMISE"]],
      points: [
        "Le moteur lit `FROM` d'abord : il doit savoir quelle table ouvrir avant de choisir les colonnes à afficher, puis les lignes à garder.",
        "Écris le schéma, `dbo.facture` : une autre table `facture` existe peut-être dans un schéma `stg`, et SQL Server réutilise mieux ses plans.",
        "Les colonnes sortent dans l'ordre du `SELECT`, pas dans celui de la table. Les lignes, elles, n'ont aucun ordre garanti sans `ORDER BY`.",
        "`SELECT *` sert à explorer. En production, une colonne ajoutée casse la vue, le rapport Power BI ou le flux EDI qui le lisent.",
        "`AS f` pose un alias de table (le mot AS est facultatif). Ensuite `facture.statut` n'est plus reconnu : écris `f.statut` partout."
      ],
      retenir: "Liste tes colonnes, préfixe le schéma, pose un alias de table court et utilise-le partout."
    },
    {
      titre: "L'ordre d'exécution : le moteur ne lit pas comme toi",
      exemple: "/* 5 */ SELECT client_id, SUM(montant_ht) AS total\n/* 1 */ FROM dbo.commande\n/* 2 */ WHERE statut <> 'ANNULEE'\n/* 3 */ GROUP BY client_id\n/* 4 */ HAVING SUM(montant_ht) > 1300\n/* 6 */ ORDER BY total DESC;",
      resultat: [["client_id", "total"], [1, "15115.00"], [2, "2580.00"]],
      points: [
        "Tu écris `SELECT` d'abord ; le moteur le traite presque en dernier. C'est l'ordre logique, le sens ; le plan d'exécution montre le travail réel.",
        "Ici `GROUP BY` fait une ligne par client, `SUM` additionne et `HAVING` filtre les groupes : c'est le module m04, pas celui-ci.",
        "L'alias `total` naît au `SELECT`, donc n'existe pas encore pour WHERE, GROUP BY ni HAVING : `HAVING total > 1300` plante sur SQL Server.",
        "Seul `ORDER BY` passe après `SELECT` et voit l'alias. Mais `ORDER BY total * 2` échoue sur SQL Server : l'alias seul, jamais dans un calcul.",
        "Snowflake est plus souple : l'alias marche dans WHERE, GROUP BY, HAVING, et plus loin dans le même `SELECT` (`qte * prix_unit AS montant, montant * 0.2`)."
      ],
      retenir: "Ordre logique FROM (avec ses JOIN, module m05) → WHERE → GROUP BY → HAVING → SELECT → DISTINCT → ORDER BY → TOP / LIMIT : l'alias du SELECT n'existe donc, sur SQL Server, que dans ORDER BY."
    },
    {
      titre: "Trier avec ORDER BY",
      exemple: "SELECT nom, ville\nFROM dbo.client\nWHERE pays = 'FR' AND type = 'PRO'\nORDER BY ville;",
      resultat: [["nom", "ville"], ["Camping Les Flots", null], ["Piscines Dumont", "Grenoble"], ["Piscines Dumont", "Lyon"], ["Hydro Sud", "Montpellier"], ["Bleu Lagon", "Nice"]],
      points: [
        "Sans `ORDER BY`, aucun ordre n'est garanti, même s'il « a l'air » bon : un rapport Power BI change le jour où le plan change.",
        "`ORDER BY pays, montant_ht DESC` trie par pays (croissant, `ASC` par défaut), puis le 2e critère départage seulement les lignes du même pays.",
        "SQL Server met `NULL` en tête en `ASC` et en fin en `DESC` : c'est la plus petite valeur. Snowflake fait l'inverse par défaut.",
        "`ORDER BY` accepte une expression : `CASE WHEN ville IS NULL THEN 1 ELSE 0 END, ville` met les `NULL` en fin, ou « urgentes d'abord ».",
        "Des codes stockés en texte se trient `'1', '10', '2'` : trie sur `CAST(code AS int)`, ou stocke un vrai nombre."
      ],
      retenir: "Un seul ORDER BY, sur des noms de colonnes, dans la requête finale (jamais dans une vue ni dans un chargement) : sans lui, aucun ordre."
    },
    {
      titre: "Limiter : TOP, LIMIT et la pagination",
      exemple: "SELECT TOP (4) WITH TIES num_cde, montant_ht\nFROM dbo.commande\nORDER BY montant_ht DESC;",
      resultat: [["num_cde", "montant_ht"], ["CDE-1007", "7950.00"], ["CDE-1001", "4780.00"], ["CDE-1003", "2385.00"], ["CDE-1002", "1290.00"], ["CDE-1006", "1290.00"]],
      points: [
        "`TOP (4)` s'applique en dernier, après le tri : les 4 plus grosses commandes. Sans `ORDER BY`, 4 lignes quelconques, qui changent d'un jour à l'autre.",
        "Snowflake écrit `LIMIT 4` tout à la fin, après `ORDER BY`, et accepte aussi `TOP 4` ; SQL Server, lui, n'a que TOP.",
        "`WITH TIES` garde les ex aequo de la dernière place : ici 5 lignes, deux à 1 290. `TOP (1)` par date : tout le dernier jour.",
        "Pagination : `ORDER BY id OFFSET 20 ROWS FETCH NEXT 10 ROWS ONLY` donne les lignes 21 à 30 ; Snowflake écrit `LIMIT 10 OFFSET 20`.",
        "À la page 5 000, `OFFSET` relit tout ce qui précède : lent. Pagine par clé, `WHERE id > @dernier_id ORDER BY id`, avec `TOP (10)`."
      ],
      retenir: "TOP ou LIMIT, toujours avec ORDER BY. Les plus récentes : ORDER BY date_cde DESC puis TOP (1), la ligne entière, pas seulement MAX."
    },
    {
      titre: "DISTINCT : des lignes entières uniques",
      exemple: "SELECT DISTINCT type, statut\nFROM dbo.flux_edi\nORDER BY type, statut;",
      resultat: [["type", "statut"], ["DESADV", "REJET"], ["INVOIC", "OK"], ["ORDERS", "OK"], ["ORDERS", "REJET"]],
      points: [
        "`DISTINCT` compare la ligne entière du `SELECT`, pas la première colonne : `ORDERS` sort deux fois, car son statut diffère.",
        "Pour `DISTINCT`, les `NULL` sont égaux entre eux : une ville `NULL` ne sort qu'une seule fois, même si dix clients n'ont pas de ville.",
        "Avec `DISTINCT`, `ORDER BY` n'accepte que des colonnes du `SELECT` : SQL Server refuse un tri par motif. Sans lui, une colonne non affichée convient.",
        "`DISTINCT` sur une clé unique (`id`) ne retire rien : chaque ligne est déjà unique, il coûte juste du temps de tri.",
        "`SELECT DISTINCT COUNT(*)` compte toutes les lignes, pas les valeurs distinctes : le compte sort avant le dédoublonnage. Pour ça, écris `COUNT(DISTINCT statut)`."
      ],
      retenir: "DISTINCT compare des lignes entières, garde un seul NULL, et le tri ne porte que sur les colonnes affichées."
    },
    {
      titre: "Écrire les valeurs et les noms",
      exemple: "-- Fiches à nettoyer : les clients sans SIREN\nSELECT code, nom AS [Nom client], 'À saisir par l''ADV' AS action\nFROM dbo.client\nWHERE siren IS NULL;",
      resultat: [["code", "Nom client", "action"], ["C003", "Bleu Lagon", "À saisir par l'ADV"], ["C005", "Pool & Garden", "À saisir par l'ADV"]],
      points: [
        "Un texte va entre apostrophes simples ; une apostrophe dedans se double, sinon elle ferme le texte trop tôt : `'l''ADV'` affiche l'ADV.",
        "Une constante du `SELECT` se répète sur chaque ligne, comme `action` ci-dessus : pratique pour marquer la source d'une donnée dans un flux.",
        "Compare avec le type de la colonne : `code_postal = 69110` convertit toute la colonne en entier et plante sur `'2A004'`. Écris `'69110'`.",
        "Nom spécial (espace, mot réservé) : `[Nom client]` sur SQL Server, `\"Nom client\"` sur Snowflake. Mieux : `nom_client`, sans espace ni mot réservé.",
        "Snowflake met un nom sans guillemets en MAJUSCULES : Power BI voit `NOM`, sauf `AS \"nom\"`. Avec guillemets, la casse devient obligatoire : ne mélange pas."
      ],
      retenir: "Texte entre apostrophes (doublée dedans ; `'2026-03-02'` reste un texte), nom spécial entre [ ] ou \" \", et une valeur du type de la colonne."
    },
    {
      titre: "Calculer et tester sans table",
      exemple: "SELECT 10 + 5 * 2      AS calcul,\n       10 % 3          AS reste,\n       39.90 * NULL    AS vide,\n       'CDE-' + '1001' AS num_cde;   -- Snowflake : 'CDE-' || '1001'",
      resultat: [["calcul", "reste", "vide", "num_cde"], [20, 1, null, "CDE-1001"]],
      points: [
        "`SELECT` sans `FROM` renvoie une ligne : idéal pour tester une expression ou une fonction avant de l'écrire dans une vraie requête.",
        "La multiplication et la division passent avant l'addition et la soustraction : `10 + 5 * 2` donne 20, pas 30. Mets des parenthèses pour lever le doute.",
        "`%` donne le reste de la division : `10 % 3` vaut 1. Utile pour une ligne sur deux, ou des lots de n.",
        "Tout calcul avec `NULL` donne `NULL` : un montant vide dans Power BI vient souvent d'une quantité manquante (`COALESCE(qte, 0)` si c'est voulu).",
        "Concaténer : `+` sur SQL Server, `||` sur Snowflake (où + tente une addition et plante sur un texte). `CONCAT()` marche sur les deux moteurs."
      ],
      retenir: "Teste sans FROM ; NULL contamine tout calcul. Pour garder un résultat : SELECT INTO (SQL Server) ou CREATE TABLE AS SELECT (Snowflake)."
    },
    {
      titre: "Détails utiles",
      points: [
        "Nom complet `Ventes.dbo.facture` : base, schéma, table. Une 4e partie devant, `SRV_ERP.Divalto.dbo.article`, lit un serveur lié : pratique, mais souvent lent sur de gros volumes.",
        "Une virgule oubliée (`SELECT nom ville`) fait de ville un alias de nom, sans erreur : écris `AS`. Une virgule en trop avant `FROM` plante.",
        "Une vue exige un nom unique par colonne : un alias sur chaque calcul, jamais deux `id`. Encore une raison d'éviter `SELECT *`.",
        "`f.*` donne toutes les colonnes d'une seule table ; `*, montant_ht * 1.2 AS ttc` ajoute un calcul. Snowflake : `* EXCLUDE (siren)` retire une colonne.",
        "`ORDER BY 2` trie sur la 2e colonne du `SELECT` : piège si le SELECT change, erreur si elle manque. Écris le nom.",
        "Variantes : `TOP (@n)` exige les parenthèses ; `TOP (10) PERCENT` arrondit au-dessus (10 % de 15 = 2) ; avec DISTINCT, écris `SELECT DISTINCT TOP (3)`.",
        "Casse des mots-clés et mise en forme : libres. `--` commente jusqu'à la fin de la ligne, `/* … */` plusieurs ; un `;` finit chaque instruction, obligatoire avant WITH.",
        "Une table en dur dans la requête : `FROM (VALUES (1, 'FR'), (2, 'BE')) AS t(id, pays)`, pratique pour une correspondance codes → libellés."
      ]
    }
  ],
  differences: [
    ["Limiter les lignes", "`TOP (n)`", "`LIMIT n` (TOP accepté)"],
    ["Paginer", "`OFFSET … FETCH`", "`LIMIT … OFFSET`"],
    ["Alias du SELECT dans WHERE / GROUP BY", "Interdit", "Accepté"],
    ["NULL dans ORDER BY ASC", "En premier", "En dernier (`NULLS FIRST` / `LAST`)"],
    ["Nom spécial", "`[Mon Nom]`", "`\"Mon Nom\"`"],
    ["Casse des noms", "Selon la collation", "MAJUSCULES sans guillemets"],
    ["Concaténer", "`+`", "`||`"],
    ["Espaces de fin", "Ignorés : `'A'` = `'A '`", "Comptés"],
    ["Toutes les colonnes sauf…", "Impossible", "`SELECT * EXCLUDE (col)`"],
    ["Créer une table depuis une requête", "`SELECT … INTO`", "`CREATE TABLE … AS SELECT`"]
  ]
};
