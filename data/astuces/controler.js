// Astuces SQL, famille « Contrôler les données » (docs/astuces.md). Chaque résultat est vérifié sur docs/base-exemple.sql.
LEARNSQL.astuces = (LEARNSQL.astuces || []).concat([
  {
    id: "trouver-les-doublons",
    titre: "Trouver les doublons",
    famille: "Contrôler les données",
    besoins: ["trouver les lignes en double dans une table", "lister les commandes saisies deux fois", "repérer les doublons sur plusieurs colonnes"],
    essais: ["detecter les doublons", "meme client meme montant en double", "count superieur a 1 avec group by", "verifier qu il n y a pas de doublon"],
    moteurs: {
      sqlserver: "Les groupes : `GROUP BY client_id, montant_ht HAVING COUNT(*) > 1` ; les lignes en détail : `COUNT(*) OVER (PARTITION BY client_id, montant_ht)` dans une CTE, puis `WHERE nb > 1`",
      snowflake: "Même `GROUP BY … HAVING COUNT(*) > 1` ; le détail en une requête : `QUALIFY COUNT(*) OVER (PARTITION BY client_id, montant_ht) > 1`",
      mysql: "Même `GROUP BY … HAVING COUNT(*) > 1` ; le détail : `COUNT(*) OVER (…)` (8.0 et plus) dans une CTE, puis `WHERE nb > 1`"
    },
    exemple: "-- Même client, même montant : commande saisie deux fois ?\nWITH d AS (\n  SELECT num_cde, client_id, date_cde, montant_ht,\n         COUNT(*) OVER (PARTITION BY client_id, montant_ht) AS nb\n  FROM commande\n)\nSELECT num_cde, client_id, date_cde, montant_ht, nb\nFROM d\nWHERE nb > 1\nORDER BY client_id, num_cde;",
    exemples: {
      snowflake: "SELECT num_cde, client_id, date_cde, montant_ht,\n       COUNT(*) OVER (PARTITION BY client_id, montant_ht) AS nb\nFROM commande\nQUALIFY nb > 1\nORDER BY client_id, num_cde;"
    },
    resultat: [["num_cde", "client_id", "date_cde", "montant_ht", "nb"], ["CDE-1002", 2, "2026-03-05", "1290.00", 2], ["CDE-1006", 2, "2026-04-03", "1290.00", 2]],
    piege: "Un doublon dépend des colonnes choisies : ici, un mois sépare CDE-1002 et CDE-1006, un vrai réachat ; avec la date en plus, le contrôle ne sort rien. Et les NULL forment un seul groupe : écarte-les avec `IS NOT NULL`.",
    pratique: "Avant de faire d'une colonne une clé (surtout sur Snowflake, qui ne vérifie pas l'unicité), compare `COUNT(*)` et `COUNT(DISTINCT code)` : s'ils diffèrent, il y a des doublons.",
    motsCles: ["doublon", "doublons", "en double", "deux fois", "duplicate", "saisie en double", "unicité", "détecter", "même", "plusieurs fois"],
    voirAussi: ["having", "group-by", "count", "row-number"]
  },
  {
    id: "trouver-les-orphelins",
    titre: "Trouver les lignes sans parent (orphelins)",
    famille: "Contrôler les données",
    besoins: ["trouver les lignes dont le code n'existe pas dans la table de référence", "les composants qui ne sont pas des articles du catalogue", "contrôler les clés étrangères après un import", "trouver les commandes sans client, dont le client n'existe pas"],
    essais: ["orphelins", "code article inconnu", "lignes sans correspondance dans l autre table", "integrite referentielle"],
    moteurs: {
      sqlserver: "`WHERE NOT EXISTS (SELECT 1 FROM article AS a WHERE a.code = n.composant)` ; ou `LEFT JOIN article AS a … WHERE a.id IS NULL`",
      snowflake: "Même écriture ; Snowflake ne vérifie pas les clés étrangères : ce contrôle est le seul garde-fou",
      mysql: "Même écriture ; une `FOREIGN KEY` InnoDB refuse déjà les orphelins, sauf un chargement fait avec `foreign_key_checks = 0`"
    },
    exemple: "-- Composants de la nomenclature absents du catalogue article\nSELECT n.compose, n.composant\nFROM nomenclature AS n\nWHERE NOT EXISTS (SELECT 1 FROM article AS a WHERE a.code = n.composant)\nORDER BY n.composant;",
    resultat: [["compose", "composant"], ["VANNE-6V", "JOINT-V"], ["BACHE8", "KIT-COUV"], ["FIL-14", "SABLE-25"], ["FIL-14", "VANNE-6V"]],
    piege: "`NOT IN (SELECT code FROM …)` rend 0 ligne dès qu'un code de la liste est NULL, sans erreur. `NOT EXISTS` ou `LEFT JOIN … IS NULL` n'ont pas ce piège.",
    pratique: "Ici, les orphelins sont voulus (kits et pièces hors catalogue) : le contrôle signale, le métier tranche. Lance-le après chaque import EDI ou Excel : un « EAN inconnu » est un orphelin.",
    motsCles: ["orphelin", "sans parent", "sans client", "inconnu", "inexistant", "clé étrangère", "intégrité", "sans correspondance", "référence", "absent", "catalogue", "n'existe pas"],
    voirAussi: ["exists", "left-join", "foreign-key", "except"]
  },
  {
    id: "numeros-manquants",
    titre: "Trouver les numéros manquants dans une suite",
    famille: "Contrôler les données",
    besoins: ["vérifier que les numéros de facture se suivent sans trou", "trouver les trous dans une numérotation", "lister les numéros qui manquent"],
    essais: ["facture manquante dans la sequence", "rupture de numerotation", "numeros sautes", "trou dans les numeros de facture"],
    moteurs: {
      sqlserver: "Combien par série : `MAX(num) - MIN(num) + 1 - COUNT(*)` ; où : `LEAD(num) OVER (ORDER BY num) - num > 1` marque un trou juste après `num`",
      snowflake: "Même écriture ; le trou en une requête : `QUALIFY LEAD(num) OVER (ORDER BY num) - num > 1`",
      mysql: "Même écriture (`LEAD` : 8.0 et plus) ; le nombre extrait avec `CAST(… AS UNSIGNED)`"
    },
    exemple: "WITH f AS (\n  SELECT LEFT(num_fact, 10)              AS serie,  -- FA-2026-03 : une suite par mois\n         CAST(RIGHT(num_fact, 2) AS int) AS num\n  FROM facture\n  WHERE num_fact <> 'FA-2026-0302'   -- test : une facture supprimée\n)\nSELECT serie, MIN(num) AS premier, MAX(num) AS dernier, COUNT(*) AS nb,\n       MAX(num) - MIN(num) + 1 - COUNT(*) AS manquants\nFROM f\nGROUP BY serie\nORDER BY serie;",
    exemples: {
      mysql: "WITH f AS (\n  SELECT LEFT(num_fact, 10)                   AS serie,\n         CAST(RIGHT(num_fact, 2) AS UNSIGNED) AS num\n  FROM facture\n  WHERE num_fact <> 'FA-2026-0302'\n)\nSELECT serie, MIN(num) AS premier, MAX(num) AS dernier, COUNT(*) AS nb,\n       MAX(num) - MIN(num) + 1 - COUNT(*) AS manquants\nFROM f\nGROUP BY serie\nORDER BY serie;"
    },
    resultat: [["serie", "premier", "dernier", "nb", "manquants"], ["FA-2026-03", 1, 3, 2, 1], ["FA-2026-04", 1, 1, 1, 0]],
    piege: "Le calcul ne voit pas un trou au début : si la facture n° 01 manque, la série part de 02, sans alerte ; vérifie aussi `premier = 1`. Et un numéro en double cache un trou : compte avec `COUNT(DISTINCT num)`.",
    pratique: "En France, les numéros de facture se suivent sans trou, sur une ou plusieurs séries. Un IDENTITY ou une séquence peuvent sauter des numéros (transaction annulée) : ne t'en sers pas comme numéro de facture.",
    motsCles: ["trou", "manquant", "numérotation", "suite", "séquence", "continue", "facture", "rupture", "sauté", "chronologique"],
    voirAussi: ["lag-lead", "identity", "with-cte"]
  },
  {
    id: "verifier-un-format",
    titre: "Vérifier un format (SIREN, SIRET, code postal)",
    famille: "Contrôler les données",
    besoins: ["vérifier qu'un SIREN contient bien 9 chiffres", "contrôler le format d'un SIRET à 14 chiffres", "trouver les codes postaux mal saisis"],
    essais: ["siret sur 14 caracteres numeriques", "controle avec une expression reguliere", "code postal a 5 chiffres", "regex"],
    moteurs: {
      sqlserver: "`siren LIKE REPLICATE('[0-9]', 9)` : 9 chiffres, rien d'autre ; SQL Server 2025 (niveau 170) : `REGEXP_LIKE(siren, '^[0-9]{9}$')`",
      snowflake: "`REGEXP_LIKE(siren, '[0-9]{9}')` : le motif doit couvrir tout le texte ; LIKE ne connaît pas `[0-9]`",
      mysql: "`REGEXP_LIKE(siren, '^[0-9]{9}$')` : sans `^` et `$`, 9 chiffres au milieu d'un texte suffisent"
    },
    exemple: "SELECT code, nom, siren,\n       CASE WHEN siren IS NULL                    THEN 'vide'\n            WHEN siren LIKE REPLICATE('[0-9]', 9) THEN 'ok'\n            ELSE 'mauvais format' END AS controle\nFROM client\nWHERE pays = 'FR' AND id <= 4\nORDER BY code;",
    exemples: {
      snowflake: "SELECT code, nom, siren,\n       CASE WHEN siren IS NULL                     THEN 'vide'\n            WHEN REGEXP_LIKE(siren, '[0-9]{9}')    THEN 'ok'\n            ELSE 'mauvais format' END AS controle\nFROM client\nWHERE pays = 'FR' AND id <= 4\nORDER BY code;",
      mysql: "SELECT code, nom, siren,\n       CASE WHEN siren IS NULL                     THEN 'vide'\n            WHEN REGEXP_LIKE(siren, '^[0-9]{9}$')  THEN 'ok'\n            ELSE 'mauvais format' END AS controle\nFROM client\nWHERE pays = 'FR' AND id <= 4\nORDER BY code;"
    },
    resultat: [["code", "nom", "siren", "controle"], ["C001", "AquaBleu", "512345678", "ok"], ["C002", "Piscines Dumont", "423456789", "ok"], ["C003", "Bleu Lagon", null, "vide"], ["C004", "Hydro Sud", "334567890", "ok"]],
    piege: "Pour ne garder que les erreurs, `WHERE siren NOT LIKE …` oublie les cases vides : pour un SIREN NULL, le test n'est ni vrai ni faux, et Bleu Lagon disparaît. Écris `WHERE siren IS NULL OR siren NOT LIKE …`.",
    pratique: "Une facture électronique sans le SIREN du client est rejetée : lance ce contrôle avant l'envoi. Un SIRET, c'est le SIREN suivi de 5 chiffres (14 en tout) ; enlève d'abord les espaces avec `REPLACE`.",
    motsCles: ["format", "siren", "siret", "code postal", "chiffres", "regex", "expression régulière", "motif", "longueur", "valide", "mal saisi"],
    voirAussi: ["like", "check", "len", "replace"]
  },
  {
    id: "valeurs-non-numeriques",
    titre: "Trouver les valeurs non numériques dans une colonne texte",
    famille: "Contrôler les données",
    besoins: ["trouver les valeurs qui ne sont pas des nombres dans une colonne texte", "repérer les quantités mal saisies avant une conversion", "vérifier qu'un texte contient bien un nombre"],
    essais: ["isnumeric", "trouver ce qui fait planter la conversion en nombre", "erreur de conversion varchar en int", "valeur qui n est pas un chiffre dans l import"],
    moteurs: {
      sqlserver: "`WHERE TRY_CAST(x AS decimal(18,2)) IS NULL AND x IS NOT NULL` ; pas `ISNUMERIC`",
      snowflake: "`WHERE TRY_TO_NUMBER(x) IS NULL AND x IS NOT NULL` ; avec 2 décimales : `TRY_TO_NUMBER(x, 18, 2)` ; `TRY_CAST` marche aussi sur un texte",
      mysql: "Pas de TRY_CAST : `WHERE x NOT REGEXP '^-?[0-9]+([.][0-9]+)?$'`"
    },
    exemple: "-- La partie après le tiret du code article est-elle un nombre ?\nSELECT code, SUBSTRING(code, CHARINDEX('-', code) + 1, 10) AS suffixe\nFROM article\nWHERE TRY_CAST(SUBSTRING(code, CHARINDEX('-', code) + 1, 10) AS int) IS NULL\nORDER BY code;",
    exemples: {
      mysql: "SELECT code, SUBSTRING(code, LOCATE('-', code) + 1, 10) AS suffixe\nFROM article\nWHERE SUBSTRING(code, LOCATE('-', code) + 1, 10) NOT REGEXP '^[0-9]+$'\nORDER BY code;"
    },
    resultat: [["code", "suffixe"], ["BACHE8", "BACHE8"], ["EPU-F", "F"], ["ROB-X", "X"]],
    piege: "`ISNUMERIC` dit 1 pour '-', '+' ou '$' : ces valeurs passent le contrôle, puis `CAST` plante. Et une virgule décimale ('12,5') n'est pas un nombre pour SQL : remplace-la par un point avant de tester.",
    pratique: "Sur SQL Server, teste avec le type d'arrivée : `TRY_CAST('12.5' AS int)` rend NULL, car ce n'est pas un entier. Pour des montants, teste `decimal(18,2)` ; pour des quantités entières, `int`.",
    motsCles: ["nombre", "numérique", "non numérique", "texte", "lettres", "conversion", "erreur de conversion", "quantité", "chiffre", "import"],
    voirAussi: ["try-cast", "cast", "substring", "charindex"]
  },
  {
    id: "comparer-deux-tables",
    titre: "Comparer deux tables et lister les écarts",
    famille: "Contrôler les données",
    besoins: ["comparer deux tables pour trouver les différences", "rapprocher les commandes et les factures", "savoir ce qui manque d'un côté ou de l'autre"],
    essais: ["diff entre deux tables", "rapprochement erp et snowflake", "ce qui est dans une table et absent de l autre", "ecarts entre deux extractions"],
    moteurs: {
      sqlserver: "`FULL OUTER JOIN` sur la clé, puis un `CASE` qui nomme l'écart ; ou `EXCEPT` dans les deux sens",
      snowflake: "Même `FULL OUTER JOIN` ; ou `EXCEPT` (ou `MINUS`) dans les deux sens",
      mysql: "Pas de `FULL OUTER JOIN` : `LEFT JOIN`, puis `UNION ALL` des lignes de l'autre table sans partenaire ; `EXCEPT` depuis 8.0.31"
    },
    exemple: "-- Commandes face aux factures (n° de commande, montant)\nSELECT COALESCE(c.id, f.cde_id) AS id_cde,\n       c.montant_ht AS cde, f.montant_ht AS fact,\n       CASE WHEN f.cde_id IS NULL THEN 'sans facture'\n            WHEN c.id IS NULL     THEN 'facture sans commande'\n            ELSE 'montant différent' END AS ecart\nFROM commande AS c\nFULL OUTER JOIN facture AS f ON f.cde_id = c.id\nWHERE c.id IS NULL OR f.cde_id IS NULL OR c.montant_ht <> f.montant_ht\nORDER BY id_cde;",
    exemples: {
      mysql: "SELECT c.id AS id_cde, c.montant_ht AS cde, f.montant_ht AS fact,\n       CASE WHEN f.cde_id IS NULL THEN 'sans facture'\n            ELSE 'montant différent' END AS ecart\nFROM commande AS c\nLEFT JOIN facture AS f ON f.cde_id = c.id\nWHERE f.cde_id IS NULL OR c.montant_ht <> f.montant_ht\nUNION ALL\nSELECT f.cde_id, NULL, f.montant_ht, 'facture sans commande'\nFROM facture AS f\nWHERE NOT EXISTS (SELECT 1 FROM commande AS c WHERE c.id = f.cde_id)\nORDER BY id_cde;"
    },
    resultat: [["id_cde", "cde", "fact", "ecart"], [4, "549.00", null, "sans facture"], [5, "318.00", null, "sans facture"], [6, "1290.00", null, "sans facture"], [7, "7950.00", null, "sans facture"]],
    piege: "`c.montant_ht <> f.montant_ht` ne voit pas un montant NULL d'un seul côté : la comparaison est inconnue, et l'écart sort du contrôle. Si la colonne accepte NULL, compare avec `IS DISTINCT FROM` (SQL Server 2022+ ; MySQL : `NOT (a <=> b)`).",
    pratique: "Pour une reprise (de l'ERP vers Snowflake), compare d'abord les `COUNT(*)` et les sommes de chaque côté : c'est rapide, et ça dit s'il y a un écart. La comparaison ligne à ligne dit ensuite où.",
    motsCles: ["comparer", "différences", "écarts", "rapprochement", "deux tables", "reprise", "réconciliation", "diff", "manque", "côté"],
    voirAussi: ["full-outer-join", "except", "is-distinct-from", "coalesce"]
  },
  {
    id: "compter-les-vides",
    titre: "Compter les cases vides de chaque colonne",
    famille: "Contrôler les données",
    besoins: ["compter les valeurs NULL de chaque colonne", "savoir combien de fiches ont une case vide", "mesurer le taux de remplissage d'une table"],
    essais: ["nombre de null par colonne", "champs vides dans la table client", "taux de completude", "combien de valeurs manquantes"],
    moteurs: {
      sqlserver: "`COUNT(*) - COUNT(ville)` : le nombre de NULL ; avec les textes vides : `SUM(CASE WHEN NULLIF(TRIM(ville), '') IS NULL THEN 1 ELSE 0 END)`",
      snowflake: "Même écriture (`COUNT_IF(ville IS NULL)` rend NULL, pas 0, quand aucune case n'est vide)",
      mysql: "Même écriture ; ou `SUM(ville IS NULL)` : un test vaut 1 ou 0"
    },
    exemple: "-- Le client suisse n'a pas de SIREN : normal, d'où le détail par pays\nSELECT pays, COUNT(*)            AS nb_fiches,\n       COUNT(*) - COUNT(ville)  AS ville_vide,\n       COUNT(*) - COUNT(siren)  AS siren_vide,\n       CAST(100.0 * COUNT(siren) / COUNT(*) AS decimal(5,1)) AS siren_rempli_pct\nFROM client\nGROUP BY pays\nORDER BY pays;",
    resultat: [["pays", "nb_fiches", "ville_vide", "siren_vide", "siren_rempli_pct"], ["CH", 1, 0, 1, "0.0"], ["FR", 6, 1, 1, "83.3"]],
    piege: "`COUNT(ville)` ne saute que les NULL : un texte vide ('') ou des espaces comptent comme remplis. Pour les attraper aussi : `NULLIF(TRIM(ville), '') IS NULL`.",
    pratique: "Avant une reprise, fais ce comptage pour chaque colonne obligatoire de la cible (SIREN, pays, adresse) : tu chiffres les fiches à compléter avant le chargement, pas après les rejets.",
    motsCles: ["vide", "cases vides", "null", "valeurs manquantes", "remplissage", "complétude", "renseigné", "taux", "qualité", "colonne"],
    voirAussi: ["count", "is-null", "nullif", "trim"]
  },
  {
    id: "verifier-un-total",
    titre: "Vérifier un total : l'en-tête contre les lignes",
    famille: "Contrôler les données",
    besoins: ["vérifier que le montant de la commande est égal à la somme de ses lignes", "contrôler le total d'une facture avec son détail", "trouver les en-têtes dont le total ne correspond pas aux lignes"],
    essais: ["somme des lignes differente du total entete", "controle de coherence entete ligne", "ecart entre montant commande et detail", "total facture faux"],
    moteurs: {
      sqlserver: "`LEFT JOIN` des lignes, `GROUP BY` l'en-tête, puis `HAVING co.montant_ht <> COALESCE(SUM(li.qte * li.prix_unit), 0)`",
      snowflake: "Même écriture : `LEFT JOIN`, `GROUP BY`, `HAVING … <> COALESCE(SUM(…), 0)`",
      mysql: "Même écriture : `LEFT JOIN`, `GROUP BY`, `HAVING … <> COALESCE(SUM(…), 0)`"
    },
    exemple: "SELECT co.num_cde, co.montant_ht,\n       SUM(li.qte * li.prix_unit) AS total_lignes,\n       co.montant_ht - COALESCE(SUM(li.qte * li.prix_unit), 0) AS ecart\nFROM commande AS co\nLEFT JOIN ligne_cde AS li ON li.cde_id = co.id\nWHERE co.id IN (1, 3, 7)\nGROUP BY co.num_cde, co.montant_ht\nORDER BY co.num_cde;",
    resultat: [["num_cde", "montant_ht", "total_lignes", "ecart"], ["CDE-1001", "4780.00", "4780.00", "0.00"], ["CDE-1003", "2385.00", "2385.00", "0.00"], ["CDE-1007", "7950.00", "7950.00", "0.00"]],
    piege: "Avec un `JOIN` simple, une commande sans aucune ligne disparaît du contrôle, alors que c'est l'erreur la plus grave. `LEFT JOIN` et `COALESCE(SUM(…), 0)` la font sortir, avec tout son montant en écart.",
    pratique: "Si chaque ligne est arrondie au centime (remise, TVA), l'écart peut valoir 0,01 sans être une erreur : contrôle avec une tolérance, `ABS(ecart) > 0.01`.",
    motsCles: ["total", "contrôle", "cohérence", "en-tête", "entête", "lignes", "somme", "écart", "détail", "montant", "correspond"],
    voirAussi: ["having", "left-join", "sum", "coalesce"]
  },
  {
    id: "valeurs-d-une-colonne",
    titre: "Lister les valeurs d'une colonne et leur nombre",
    famille: "Contrôler les données",
    besoins: ["voir toutes les valeurs différentes d'une colonne, avec leur nombre", "savoir quels statuts existent dans la table", "profiler une colonne avant un import"],
    essais: ["valeurs distinctes et leur nombre", "repartition des statuts", "quelles valeurs dans la colonne canal", "compter par valeur"],
    moteurs: {
      sqlserver: "`SELECT canal, COUNT(*) AS nb FROM commande GROUP BY canal ORDER BY nb DESC`",
      snowflake: "Même écriture : `GROUP BY canal`, `COUNT(*)`, `ORDER BY nb DESC`",
      mysql: "Même écriture : `GROUP BY canal`, `COUNT(*)`, `ORDER BY nb DESC`"
    },
    exemple: "SELECT canal, COUNT(*) AS nb\nFROM commande\nGROUP BY canal\nORDER BY nb DESC, canal;",
    resultat: [["canal", "nb"], ["EDI", 3], ["TEL", 3], ["WEB", 2]],
    piege: "Sur SQL Server, la collation habituelle (insensible à la casse) range 'EDI', 'edi' et 'EDI ' (espace à la fin) dans le même groupe : les fautes de saisie restent cachées. Snowflake compare exactement : le même contrôle y montre plus de valeurs.",
    pratique: "Fais ce comptage sur chaque colonne codée d'un import (statut, canal, pays, unité) : une valeur rare, vue une fois sur 10 000 lignes, est souvent une faute de saisie.",
    motsCles: ["valeurs", "valeurs distinctes", "répartition", "par valeur", "profil", "statuts", "liste des valeurs", "fréquence", "combien de chaque", "codes"],
    voirAussi: ["group-by", "count", "distinct", "order-by"]
  },
  {
    id: "valeurs-anormales",
    titre: "Trouver les valeurs hors limites (prix, quantités)",
    famille: "Contrôler les données",
    besoins: ["trouver les prix trop bas ou trop hauts par rapport au tarif", "repérer les quantités négatives ou anormales", "contrôler les valeurs hors des bornes attendues", "repérer les valeurs aberrantes"],
    essais: ["prix aberrant", "detecter les anomalies de prix dans les commandes", "valeur hors norme", "quantite negative ou nulle"],
    moteurs: {
      sqlserver: "`WHERE prix_unit NOT BETWEEN prix_tarif * 0.8 AND prix_tarif` : des bornes écrites en clair",
      snowflake: "Même écriture : `NOT BETWEEN bas AND haut`",
      mysql: "Même écriture : `NOT BETWEEN bas AND haut`"
    },
    exemple: "-- Prix de vente à plus de 20 % sous le tarif, ou au-dessus du tarif\nSELECT li.cde_id, a.code, a.prix_tarif, li.prix_unit\nFROM ligne_cde AS li\nJOIN article AS a ON a.id = li.article_id\nWHERE li.prix_unit NOT BETWEEN a.prix_tarif * 0.8 AND a.prix_tarif\nORDER BY li.cde_id;",
    resultat: [["cde_id", "code", "prix_tarif", "prix_unit"], [1, "CHL-25", "159.00", "119.00"], [8, "EPU-F", "19.90", "19.95"]],
    piege: "`BETWEEN` veut la petite borne d'abord. Écrit à l'envers (`BETWEEN prix_tarif AND prix_tarif * 0.8`), il n'est jamais vrai : ici, les 11 lignes sortiraient en anomalie.",
    pratique: "Fixe les bornes avec le métier (remise maximale, quantité maximale par ligne) et range-les dans une table de paramètres : le contrôle change sans toucher à la requête.",
    motsCles: ["anomalie", "aberrant", "hors limites", "bornes", "seuil", "prix", "quantité", "négatif", "incohérent", "hors norme", "tolérance"],
    voirAussi: ["between", "where", "and-or-not"]
  }
]);
